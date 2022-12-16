Trong ứng dụng Android, các Kotlin Flows thường được collect từ UI layer để hiển thị cập nhật dữ liệu trên màn hình. Tuy nhiên, bạn muốn collect các flows này để đảm bảo rằng bạn không làm nhiều việc hơn mức cần thiết, gây lãng phí tài nguyên (cả CPU và bộ nhớ) hoặc leak dữ liệu khi view chuyển sang background.

Trong bài viết này, bạn sẽ tìm hiểu cách API `Lifecycle.repeatOnLifecycle `và `Flow.flowWithLifecycle` bảo vệ bạn khỏi lãng phí tài nguyên và tại sao chúng là một mặc định tốt để sử dụng cho flow collect trong UI layer.

## Lãng phí tài nguyên
Bạn nên để lộ API `Flow<T>` từ các layer thấp hơn trong hệ thống phân cấp ứng dụng của mình bất kể chi tiết implementation của flow producer như thế nào. Tuy nhiên, bạn cũng nên collect chúng một cách an toàn.

Cold flow được hỗ trợ bởi một [channal](https://kotlinlang.org/docs/channels.html) hoặc sử dụng các toán tử có bộ đệm như `buffer`, `conflate`, `flowOn` hoặc `shareIn` là **không an toàn để collect** với một số API hiện có như `CoroutineScope.launch`, `Flow<T>.launchIn` hoặc `LifecycleCoroutineScope.launchWhenX` , trừ khi bạn tự cancel `Job` đã bắt đầu coroutine khi Activity về background. Các API này sẽ giữ cho flow producer bên dưới active trong khi phát các items vào buffer ở background, và do đó lãng phí tài nguyên.

> Lưu ý: Cold flow là một loại flow thực thi block of code của producer theo yêu cầu khi một subscriber mới collect.

Ví dụ: hãy xem xét flow này emit ra các bản cập nhật location bằng cách sử dụng `callbackFlow`:

```Kotlin
// Implementation of a cold flow backed by a Channel that sends Location updates
fun FusedLocationProviderClient.locationFlow() = callbackFlow<Location> {
    val callback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult?) {
            result ?: return
            try { offer(result.lastLocation) } catch(e: Exception) {}
        }
    }
    requestLocationUpdates(createLocationRequest(), callback, Looper.getMainLooper())
        .addOnFailureListener { e ->
            close(e) // in case of exception, close the Flow
        }
    // clean up when Flow collection ends
    awaitClose {
        removeLocationUpdates(callback)
    }
}
```

> Lưu ý: Về mặt nội bộ, callbackFlow sử dụng một channel, về mặt khái niệm rất giống với blocking queue và có default capacity là 64 elements.

Việc thu thập flow này từ UI layer bằng cách sử dụng bất kỳ API nào đã nói ở trên giữ các flow phát location ngay cả khi view không hiển thị chúng trong UI! Xem ví dụ bên dưới:

```Kotlin
class LocationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Collects from the flow when the View is at least STARTED and
        // SUSPENDS the collection when the lifecycle is STOPPED.
        // Collecting the flow cancels when the View is DESTROYED.
        lifecycleScope.launchWhenStarted {
            locationProvider.locationFlow().collect {
                // New location! Update the map
            } 
        }
        // Same issue with:
        // - lifecycleScope.launch { /* Collect from locationFlow() here */ }
        // - locationProvider.locationFlow().onEach { /* ... */ }.launchIn(lifecycleScope)
    }
}
```


`lifecycleScope.launchWhenStarted` suspend việc thực thi coroutine. Các location mới không được xử lý, nhưng dù sao thì producer `callbackFlow` vẫn gửi các location. Việc sử dụng các API `lifecycleScope.launch` hoặc `launcherIn` thậm chí còn nguy hiểm hơn vì view tiếp tục sử dụng các location ngay cả khi nó ở trong background! Điều này có thể khiến ứng dụng của bạn crash.

Để giải quyết vấn đề này với các API này, bạn cần phải hủy thu thập theo cách thủ công khi view chuyển sang background để hủy callbackFlow và tránh việc location provider phát ra các items và lãng phí tài nguyên. Ví dụ, bạn có thể làm một số việc như sau:

```Kotlin
class LocationActivity : AppCompatActivity() {

    // Coroutine listening for Locations
    private var locationUpdatesJob: Job? = null

    override fun onStart() {
        super.onStart()
        locationUpdatesJob = lifecycleScope.launch {
            locationProvider.locationFlow().collect {
                // New location! Update the map
            } 
        }
    }

    override fun onStop() {
        // Stop collecting when the View goes to the background
        locationUpdatesJob?.cancel()
        super.onStop()
    }
}
```

Đó là một giải pháp tốt, nhưng đó là bản phác thảo, các bạn! Và nếu có một sự thật chung về các nhà phát triển Android, thì đó là điều chúng ta thực sự ghét việc viết code sẵn. Một trong những lợi ích lớn nhất của việc không phải viết code sẵn là với ít code hơn, sẽ có ít khả năng mắc lỗi hơn!

## Lifecycle.repeatOnLifecycle
Bây giờ tất cả chúng ta đều ở trên cùng một trang và biết vấn đề nằm ở đâu, đã đến lúc đưa ra giải pháp. Giải pháp cần phải là 
1. đơn giản, 
2. thân thiện hoặc dễ nhớ / dễ hiểu, và quan trọng hơn là 
3. an toàn! 

Nó sẽ hoạt động cho tất cả các trường hợp sử dụng bất kể chi tiết triển khai flow như thế nào.
Nếu không có thêm bất kỳ điều gì, API bạn nên sử dụng là `Lifecycle.repeatOnLifecycle` có sẵn trong thư viện [lifecycle-runtime-ktx.](https://developer.android.com/jetpack/androidx/releases/lifecycle)

> Lưu ý: Các API này có sẵn trong thư viện lifecycle-runtime-ktx:2.4.0-alpha01 trở lên.

Hãy xem đoạn code sau:

```Kotlin
lass LocationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Create a new coroutine since repeatOnLifecycle is a suspend function
        lifecycleScope.launch {
            // The block passed to repeatOnLifecycle is executed when the lifecycle
            // is at least STARTED and is cancelled when the lifecycle is STOPPED.
            // It automatically restarts the block when the lifecycle is STARTED again.
            lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
                // Safely collect from locationFlow when the lifecycle is STARTED
                // and stops collection when the lifecycle is STOPPED
                locationProvider.locationFlow().collect {
                    // New location! Update the map
                }
            }
        }
    }
}
```

`repeatOnLifecycle` là một suspend function sử dụng `Lifecycle.State` làm tham số được sử dụng **để tự động tạo và khởi chạy một coroutine mới** với block được truyền cho nó khi vòng đời đạt đến `state` đó và **cancel coroutine** đang thực hiện block khi vòng đời giảm xuống dưới `state`.

Điều này tránh bất kỳ mã viết sẵn nào vì mã được liên kết để hủy coroutine khi không còn cần thiết nữa sẽ được thực hiện tự động bởi `repeatOnLifecycle`. Như bạn có thể đoán, chúng tôi khuyên bạn nên gọi API này trong các phương thức `onCreate` của Activity hoặc `onViewCreate` của Fragment để tránh các hành vi không mong muốn. Xem ví dụ bên dưới bằng cách sử dụng các đoạn:

```Kotlin
class LocationFragment: Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        // ...
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                locationProvider.locationFlow().collect {
                    // New location! Update the map
                }
            }
        }
    }
}
```


Quan trọng: Các Fragment phải luôn sử dụng `viewLifecycleOwner` để kích hoạt cập nhật UI. Tuy nhiên, đó không phải là trường hợp của `DialogFragment` đôi khi có thể không có `View`. Đối với `DialogFragment`, bạn có thể sử dụng `lifecycleOwner`.

> Lưu ý: Các API này có sẵn trong thư viện lifecycle-runtime-ktx: 2.4.0-alpha01 trở lên.

### Under the hood!
`repeatOnLifecycle` tạm dừng coroutine đang gọi, khởi chạy lại block khi vòng đời di chuyển vào và ra khỏi `state` đích trong một coroutine mới và tiếp tục coroutine đang gọi khi Vòng đời bị destroyed. Điểm cuối cùng này rất quan trọng: chương trình điều tra gọi repeatOnLifecycle sẽ không tiếp tục thực thi cho đến khi vòng đời bị phá hủy.

```Kotlin
class LocationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Create a coroutine
        lifecycleScope.launch {
            
            lifecycle.repeatOnLifecycle(Lifecycle.State.RESUMED) {
                // Repeat when the lifecycle is RESUMED, cancel when PAUSED
            }

            // `lifecycle` is DESTROYED when the coroutine resumes. repeatOnLifecycle
            // suspends the execution of the coroutine until the lifecycle is DESTROYED.
        }
    }
}
```

### Visual diagram
Quay trở lại ban đầu, thu thập locationFlow trực tiếp từ một coroutine bắt đầu với `lifecycleScope.launch` rất nguy hiểm vì quá trình thu thập tiếp tục diễn ra ngay cả khi View ở background.

`repeatOnLifecycle` ngăn bạn lãng phí tài nguyên và ứng dụng bị treo vì nó dừng và khởi động lại thu thập flow khi vòng đời di chuyển vào và ra khỏi state đích.

![](https://images.viblo.asia/59a2f18b-6cde-47c8-bfb0-d03d83be9d7e.png)


## Flow.flowWithLifecycle
Bạn cũng có thể sử dụng toán tử `Flow.flowWithLifecycle` khi bạn chỉ có một flow để collect. API này sử dụng API `repeatOnLifecycle` bên dưới và emit các items và cancel producer bên dưới khi Vòng đời di chuyển vào và ra khỏi state đích.

```Kotlin
class LocationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Listen to one flow in a lifecycle-aware manner using flowWithLifecycle
        lifecycleScope.launch {
            locationProvider.locationFlow()
                .flowWithLifecycle(this, Lifecycle.State.STARTED)
                .collect {
                    // New location! Update the map
                }
        }
        
        // Listen to multiple flows
        lifecycleScope.launch {
            lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
                // As collect is a suspend function, if you want to collect
                // multiple flows in parallel, you need to do so in 
                // different coroutines
                launch {
                    flow1.collect { /* Do something */ }   
                }
                
                launch {
                    flow2.collect { /* Do something */ }
                }
            }
        }
    }
}
```

> Lưu ý: Tên API này lấy toán tử `Flow.flowOn(CoroutineContext) `làm tiền lệ vì `Flow.flowWithLifecycle `thay đổi `CoroutineContext` được sử dụng để collect upstream flow  trong khi vẫn để downstream không bị ảnh hưởng. Ngoài ra, tương tự như `flowOn`, `Flow.flowWithLifecycle` thêm một bộ đệm trong trường hợp comsumer không theo kịp producer. Điều này là do việc triển khai nó sử dụng `callbackFlow`.

## Định cấu hình producer cơ bản
Ngay cả khi bạn sử dụng các API này, hãy cẩn thận với các *hot flow* có thể lãng phí tài nguyên ngay cả khi chúng không được ai collect! Có một số trường hợp sử dụng hợp lệ cho chúng, nhưng hãy ghi nhớ điều đó và ghi lại nếu cần. Việc để flow producer cơ bản hoạt động trong background, ngay cả khi lãng phí tài nguyên, có thể có lợi cho một số trường hợp sử dụng: bạn có ngay dữ liệu mới thay vì bắt kịp và tạm thời hiển thị dữ liệu cũ. **Tùy thuộc vào trường hợp sử dụng, quyết định xem producer có cần phải luôn hoạt động hay không.**

Các API `MutableStateFlow` và `MutableSharedFlow` hiển thị trường `subscriptionCount` mà bạn có thể sử dụng để ngăn producer bên dưới khi `subscriptionCount` là 0. Theo mặc định, chúng sẽ giữ cho producer hoạt động miễn là đối tượng chứa instance flow nằm trong bộ nhớ. Tuy nhiên, có một số trường hợp sử dụng hợp lệ cho việc này, ví dụ, một `UiState` được hiển thị từ `ViewModel` với UI bằng `StateFlow`. Vậy là được rồi! Trường hợp sử dụng này yêu cầu `ViewModel` luôn cung cấp UI state dùng mới nhất cho View.

Tương tự, các toán tử `Flow.stateIn` và `Flow.shareIn` có thể được định [cấu hình với chính sách bắt đầu chia sẻ](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-sharing-started/index.html) cho việc này. `WhileSubscribe()` sẽ dừng producer cơ bản khi không có observers tích cực! Ngược lại, [Eagerly](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-sharing-started/-eagerly.html) hoặc [Lazily](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-sharing-started/-lazily.html) sẽ giữ cho producer cơ bản hoạt động miễn là `CoroutineScope` mà họ sử dụng còn hoạt động.

> Lưu ý: Các API được hiển thị trong bài viết này là một mặc định tốt để collect các flow từ UI và nên được sử dụng bất kể chi tiết triển khai flow như thế nào. Các API này thực hiện những gì chúng cần làm: ngừng collect nếu UI không hiển thị trên màn hình. Việc triển khai flow có phải luôn hoạt động hay không tùy thuộc vào việc triển khai quy trình.

## Safe Flow collection trong Jetpack Compose

Function [Flow.collectAsState](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#collectasstate) được sử dụng trong Compose để collect các flow từ các Composables và biểu diễn các giá trị dưới dạng `[State<T>](https://developer.android.com/reference/kotlin/androidx/compose/runtime/State)` để có thể cập nhật Compose UI. Ngay cả khi Compose không recompose UI khi Activity hoặc Fragment trong background, flow producer vẫn hoạt động và có thể lãng phí tài nguyên. Compose có thể gặp phải vấn đề tương tự như hệ thống View.

Khi thu thập các flow trong Compose, hãy sử dụng toán tử `Flow.flowWithLifecycle` như sau:

```Kotlin
@Composable
fun LocationScreen(locationFlow: Flow<Flow>) {

    val lifecycleOwner = LocalLifecycleOwner.current
    val locationFlowLifecycleAware = remember(locationFlow, lifecycleOwner) {
        locationFlow.flowWithLifecycle(lifecycleOwner.lifecycle, Lifecycle.State.STARTED)
    }

    val location by locationFlowLifecycleAware.collectAsState()

    // Current location, do something with it
}
```

Lưu ý rằng bạn cần phải nhớ *[remember](https://developer.android.com/jetpack/compose/state)* flow rằng vòng đời với `locationFlow` và `lifecycleOwner` làm các khóa để luôn sử dụng cùng một flow trừ khi một trong các khóa thay đổi.

Trong Compose, các tác dụng phụ phải được thực hiện trong một [môi trường được kiểm soát](https://developer.android.com/jetpack/compose/lifecycle#state-effect-use-cases). Đối với điều đó, hãy sử dụng [LaunchedEffect](https://developer.android.com/reference/kotlin/androidx/compose/runtime/package-summary#launchedeffect_1) để tạo một coroutine tuân theo vòng đời của compose. Trong block của nó, bạn có thể gọi `Lifecycle.repeatOnLifecycle` suspend nếu bạn cần nó re-launch một block of code khi host lifecycle ở một `State` nhất định.

## So sánh với LiveData
Bạn có thể nhận thấy rằng API này hoạt động tương tự như `LiveData` và điều đó đúng! `LiveData` biết về Lifecycle và hành vi khởi động lại của nó khiến nó trở nên lý tưởng để quan sát các luồng dữ liệu từ UI. Và đó cũng là trường hợp của các API `Lifecycle.repeatOnLifecycle `và `Flow.flowWithLifecycle!`

Thu thập các flow bằng cách sử dụng các API này là một sự thay thế tự nhiên cho `LiveData` trong các ứng dụng chỉ dành cho Kotlin. Nếu bạn sử dụng các API này để thu thập flow, thì LiveData không mang lại bất kỳ lợi ích nào đối với coroutines và flow. Hơn nữa, các flows còn linh hoạt hơn vì chúng có thể được collect từ bất kỳ `Dispatcher` nào và chúng có thể được cung cấp bởi tất cả các nhà khai thác của nó. Trái ngược với `LiveData`, có sẵn các toán tử giới hạn và các giá trị của chúng luôn được quan sát từ UI thread.

### Hỗ trợ StateFlow trong data binding
Một lưu ý khác, một trong những lý do bạn có thể sử dụng `LiveData` là vì nó được hỗ trợ bởi tính năng data binding. Chà, `StateFlow` cũng vậy! Để biết thêm thông tin về hỗ trợ `StateFlow` trong việc hỗ trợ data binding, hãy xem [tài liệu chính thức.](https://developer.android.com/topic/libraries/data-binding/observability#stateflow)
Sử dụng API Lifecycle.repeatOnLifecycle hoặc Flow.flowWithLifecycle để thu thập các luồng từ lớp giao diện người dùng trong Android một cách an toàn.

Sử dụng API `Lifecycle.repeatOnLifecycle` hoặc `Flow.flowWithLifecycle` để collect các flows từ UI layer trong Android một cách an toàn.