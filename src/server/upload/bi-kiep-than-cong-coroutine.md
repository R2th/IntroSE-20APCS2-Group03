![](https://images.viblo.asia/5ad26c78-d7c3-4253-9912-c537f41b0ea5.png)

### Nội dung

* Làm sao để chạy một coroutine 
* Làm sao để chạy coroutine với timeout 
* Làm sao để cancel một coroutine
* Cách sử lý exception với coroutines
* Cách test coroutines
* Log coroutines thread 

###
### Dependencies

```kotlin 
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.0.0'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.0.0'
```

###
### How to launch a coroutine
Trong thư viện `kotlinx.coroutines`, bạn có thể bắt đầu coroutine mới bằng cách sử dụng  `launch` hoặc `async`

Về mặt khái niệm, `async` giống như `launch`. Nó bắt đầu một coroutine riêng biệt, đó là một light-weight thread , chạy  song song với tất cả các coroutine khác. Sự khác biệt là `launch` trả về một `Job` và không mang bất kỳ giá trị kết quả nào, trong khi async trả về `Deferred` - một light-weight non-blocking thể hiện lời hứa sẽ trả về kết quả sau này. Bạn có thể sử dụng `.await ()` trên giá trị deferred để có kết quả cuối cùng, nhưng `Deferred` cũng là một `Job`, vì vậy bạn có thể hủy nó nếu cần.
 
 
>  Nếu đoạn code bên trong `launch` bị chết với `exception`, thì nó bị coi như là exception đó chưa được xử lý trong thread và sẽ làm crash ứng dụng . Một exception trong khối async sẽ được lưu trong kết quả của Deferred và nó sẽ ko trả về kết quả, và nó sẽ bị hủy bỏ âm thầm trừ khi được xử lý.
>  


###
### Coroutine dispatcher

Trong Android, chúng tôi thường sử dụng hai người điều phối:

* *uiDispatcher* để gửi thực thi lên luồng UI chính của Android (cho coroutine gốc).
* *bgDispatcher* để gửi thực thi trong luồng IO, Background (cho các coroutines con)

```kotlin
// dispatches execution into Android main thread
val uiDispatcher: CoroutineDispatcher = Dispatchers.Main

// represent a pool of shared threads as coroutine dispatcher
val bgDispatcher: CoroutineDispatcher = Dispatchers.I0
```
###
Trong ví dụ sau, chúng ta sẽ sử dụng CommonPool cho bgContext, giới hạn số lượng luồng chạy song song với giá trị 64 luồng hoặc số lõi (tùy theo số nào lớn hơn).

Bạn có thể muốn xem xét sử dụng newFixedThreadPoolContext hoặc bạn có thể sử dụng  cached thread pool.

###
### Coroutine scope
Để khởi chạy coroutine, bạn cần cung cấp CoroutineScope hoặc sử dụng GlobalScope.

Xem thêm: [Tránh sử dụng GlobalScope.](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e)

```kotlin
// GlobalScope example
class MainFragment : Fragment() {
    fun loadData() = GlobalScope.launch {  ...  }
}

// CoroutineScope example
class MainFragment : Fragment() {

    val uiScope = CoroutineScope(Dispatchers.Main)

    fun loadData() = uiScope.launch {  ...  }
}

// Fragment implements CoroutineScope example
class MainFragment : Fragment(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main

    fun loadData() = launch {  ...  }
}
```

###
### launch + async (execute task)

Coroutine cha được chạy qua hàm `launch` với `Main` dispatcher.

Các coroutine con được chạy qua hàm `async` với `IO` dispatcher.

> Chú ý: Một coroutine cha luôn luôn chờ đợi tất cả các coroutine con hoàn thành

> Chú ý: Nếu exception không được kiểm tra, ứng dụng sẽ bị crash 
> 
####
Xem thêm : [Tránh sử dụng async/ await không cần thiết ](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e#d8a2)

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val task = async(bgDispatcher) { // background thread
        // your blocking call
    }
    val result = task.await()
    view.showData(result) // ui thread
}
```

###
### launch + withContext (execute task)
Ví dụ trước hoạt động ngon lành, chúng tôi đang lãng phí tài nguyên bằng cách khởi chạy coroutine thứ hai để làm công việc nền. Chúng ta có thể tối ưu hóa code của mình nếu chúng ta chỉ khởi chạy một coroutine và sử dụng `withContext` để chuyển ngữ cảnh coroutine.

Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.

Background job sẽ được thực thi thông qua `withContext` với `IO` dispatcher.

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    view.showData(result) // ui thread
}
```

###
### launch + withContext (chạy 2 task tuần tự)

Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.

Background job sẽ được thực thi thông qua `withContext` với `IO` dispatcher.

Chú ý: `result1` và `result2` thực hiện tuần tự
Chú ý: Nếu exception ko được kiểm tra, ứng dụng sẽ bị crash 

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val result1 = withContext(bgDispatcher) { // background thread
        // your blocking call
    }

    val result2 = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    
    val result = result1 + result2
    
    view.showData(result) // ui thread
}
```

###
### launch + async + async (chạy 2 task song song)

Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.

Các coroutine con chạy thông qua `async` với `IO` dispatcher 

Chú ý: `result1` và `result2` thực hiện song song

Chú ý: Nếu exception ko được kiểm tra, ứng dụng sẽ bị crash

Xem thêm: [Wrap async với coroutineScrope hoặc sử dụng SupervisorJob để handle exceptions](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e#69e0)

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val task1 = async(bgDispatcher) { // background thread
        // your blocking call
    }

    val task2 = async(bgDispatcher) { // background thread
        // your blocking call
    }

    val result = task1.await() + task2.await()

    view.showData(result) // ui thread
}
```

###
### Chạy coroutine với timeout 

Nếu bạn muốn set Timeout cho một coroutine job, bọc đoạn code vào trong withTimeoutOrNull, nó sẽ trả về null trong trường hợp timeout.

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val task = async(bgDispatcher) { // background thread
        // your blocking call
    }
    // suspend until task is finished or return null in 2 sec
    val result = withTimeoutOrNull(2000) { task.await() }
    view.showData(result) // ui thread
}
```


###
### Làm sao để cancel một coroutine

##### job

Hàm `loadData` trả ra một đối tượng `Job`, đối tượng `Job` này có thể cancel được. Khi coroutine cha bị cancel, thì tất cả các coroutine con sẽ bị cancel đệ qui theo.

Nếu hàm `stopPresenting` được gọi trong khi `dataProvider.loadData` vẫn đang chạy, thì hàm `view.showData` sẽ không bao giờ được gọi.

```kotlin
val uiScope = CoroutineScope(Dispatchers.Main)
var job: Job? = null

fun startPresenting() {
    job = loadData()
}

fun stopPresenting() {
    job?.cancel()
}

fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    view.showData(result) // ui thread
}
```
###
##### parent job

Một cách khác để hủy coroutine là tạo đối tượng  `SupervisorJob`  và chỉ định nó trong hàm `scrope contructor` thông qua toán tử `+`

Đọc thêm về combinding coroutine context tại [đây](https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md#combining-context-elements) 

> Lưu ý: nếu bạn hủy parent Job , bạn cần tạo đối tượng Job mới để bắt đầu các coroutines mới, đó là lý do tại sao chúng tôi sử dụng cancelChildren.
> 

Xem thêm:[ Avoid cancelling scope job.](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e#6bf8)

```kotlin
var job = SupervisorJob()
val uiScope = CoroutineScope(Dispatchers.Main + job)
fun startPresenting() {
    loadData()
}
fun stopPresenting() {
    scope.coroutineContext.cancelChildren()
}
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    view.showData(result) // ui thread
}
```

###
### Nhận biết vòng đời coroutine scope

Với việc phát hành ra android architecture components. chúng ta có thể tạo phạm vi coroutine nhận biết vòng đời sẽ tự hủy khi sự kiện Activity # onDestroy xảy ra.

Ví dụ về phạm vi coroutine nhận biết vòng đời cho LifecyclObserver.

```kotlin
class MainScope : CoroutineScope, LifecycleObserver {

    private val job = SupervisorJob()
    override val coroutineContext: CoroutineContext
        get() = job + Dispatchers.Main

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    fun destroy() = coroutineContext.cancelChildren()
}

// usage
class MainFragment : Fragment() {
    private val uiScope = MainScope()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(mainScope)
    }

    private fun loadData() = uiScope.launch {
        val result = withContext(bgDispatcher) {
            // your blocking call
        }
    }
}
```

###
Ví dụ về phạm vi coroutine nhận biết vòng đời cho ViewModel

```kotlin
open class ScopedViewModel : ViewModel() {
    private val job = SupervisorJob()
    protected val uiScope = CoroutineScope(Dispatchers.Main + job)
     override fun onCleared() {
        super.onCleared()
        uiScope.coroutineContext.cancelChildren()
    }
}
// usage
class MyViewModel : ScopedViewModel() {

    private fun loadData() = uiScope.launch {
        val result = withContext(bgDispatcher) {
            // your blocking call
        }
    }
}
```
###
### Làm thế nào để xử lý các trường hợp exception với coroutines
##### try-catch block

Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.

Các coroutine con chạy thông qua `async` với `IO` dispatcher 

Lưu ý: Bạn có thể sử dụng khối `try-catch` để bắt ngoại lệ và xử lý chúng.

![](https://images.viblo.asia/bf22db26-f8f3-42b8-a57e-9608cbd35155.png)

Để tránh sử dung `try-catch` trong presenter class, tốt hơn hết là tạo ra một generic classs `Result` và để exception trả ra class đó. 

![](https://images.viblo.asia/b266d854-2516-4396-b676-5b0f4625df59.png)

###
##### async parent

Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.

Lưu ý: Để bỏ qua mọi trường hợp ngoại lệ, hãy khởi chạy coroutine cha với `async`.

![](https://images.viblo.asia/78bc1541-e21c-4e53-8a33-8edeff68eaa6.png)

Trong trường hợp này, ngoại lệ sẽ được lưu trữ trong đối tượng Job. Để lấy nó, bạn có thể sử dụng hàm invokeOnCompletion.

![](https://images.viblo.asia/233e2f4f-1ffb-47ad-8523-f9d1de999c6a.png)
###
### launch + coroutine exception handler
Coroutine cha được khởi chạy thông qua `launch` với `Main` dispatcher.
Các coroutine con chạy thông qua `withContext` với `IO` dispatcher 

Lưu ý: Bạn có thể thêm CoroutineExceptionHandler vào coroutineContext cha để bắt ngoại lệ và xử lý chúng.
![](https://images.viblo.asia/d5ca11e5-a747-4fe7-af0f-2dd572c32b69.png)

###
### Test coroutines 
Để chạy coroutines bạn cần chỉ định một `CoroutineDispatcher`.
![](https://images.viblo.asia/560df340-a749-4e65-9bbb-6696f9ebdafa.png)

Nếu bạn muốn viết UnitTest cho lớp MainPresenter của mình, bạn cần phải xác định coroutineContext để thực hiện trên UIThread  và BackgroundThread

Có lẽ cách dễ nhất là thêm hai tham số vào hàm contructor `MainPresenter`: `uiDispatcher` với giá trị mặc định là `Main` và `ioContext` với giá trị `IO` mặc định.

Bây giờ bạn có thể dễ dàng kiểm tra lớp MainPresenter của mình bằng cách cung cấp một Unconfined sẽ chỉ thực thi mã trên luồng hiện tại.

![](https://images.viblo.asia/b0dd02d2-609e-4d2d-8e68-79b788201ef0.png)

###
### Cách log coroutine thread

Để hiểu coroutine nào thực hiện công việc hiện tại của bạn, bạn có thể bật các tiện ích gỡ lỗi thông qua `System.setProperty` và đăng nhập tên luồng thông qua tên Thread.currentThread().name.
![](https://cdn-images-1.medium.com/max/1400/1*4ay9tdWRoPClg10ejYD8Lg.png)

### Kết 

Related articles and special thanks: [Guide to coroutines by example, Roman Elizarov, Jake Wharton, Andrey Mischenko.](https://stackoverflow.com/questions/46226518/what-is-the-difference-between-launch-join-and-async-await-in-kotlin-coroutines)

Bài viết được dịch từ : https://proandroiddev.com/android-coroutine-recipes-33467a4302e9

Xin cám ơn đã theo dõi !!