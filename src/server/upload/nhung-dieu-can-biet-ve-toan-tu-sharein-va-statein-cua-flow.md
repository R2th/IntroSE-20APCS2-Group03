Các toán tử `Flow.shareIn` và `Flow.stateIn` chuyển đổi *cold* flows thành *hot* flows: chúng có thể phát đa hướng thông tin đến từ upsteam flow tới nhiều bộ thu (collector). Chúng thường được sử dụng để cải thiện hiệu suất, thêm bộ đệm(buffer) khi collectors không có mặt hoặc thậm chí là cơ chế lưu vào bộ nhớ đệm.

> Lưu ý: Cold flows được tạo theo yêu cầu và phát ra dữ liệu khi chúng được collect. Các hot flows luôn hoạt động và có thể phát ra dữ liệu bất kể chúng có đang được collect hay không.

Trong bài đăng blog này, bạn sẽ làm quen với các toán tử `shareIn` và `stateIn` . Bạn sẽ học cách định cấu hình chúng để thực hiện một số trường hợp sử dụng nhất định và tránh những cạm bẫy phổ biến mà bạn có thể gặp phải.

# The underlying flow producer
Tiếp tục với ví dụ từ bài đăng trên [blog trước đây ](https://viblo.asia/p/cach-an-toan-de-collect-flows-tu-android-uis-Eb85orP4l2G)của tôi, underlying flow producer mà chúng ta đang sử dụng phát ra các bản cập nhật location Đó là một *cold flow*, vì nó được triển khai bằng `callbackFlow`. Mỗi collector mới sẽ kích hoạt flow producer block và một callback mới sẽ được thêm vào `FusedLocationProviderClient`.

```Kotlin
class LocationDataSource(
    private val locationClient: FusedLocationProviderClient
) {
    val locationsSource: Flow<Location> = callbackFlow<Location> {
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
}
```

Hãy xem cách chúng ta có thể sử dụng toán tử `shareIn` và `stateIn` để tối ưu hóa flow `LocationSource` cho các trường hợp sử dụng khác nhau.

# shareIn hay stateIn?
Chủ đề đầu tiên chúng ta sẽ đề cập là sự khác biệt giữa `shareIn` và `stateIn`. Toán tử `shareIn` trả về một cá thể `SharedFlow` trong khi `stateIn` trả về một `StateFlow`.

> Lưu ý: Để tìm hiểu thêm về StateFlow và SharedFlow, [hãy xem tài liệu](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow).

`StateFlow` là một cấu hình chuyên biệt của `SharedFlow` được tối ưu hóa cho sharing state: item được phát cuối cùng được phát lại cho collector mới và các item được *conflated* bằng `Any.equals`. Bạn có thể đọc thêm về điều này trong [tài liệu StateFlow](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/index.html).

Sự khác biệt chính giữa các API này là interface `StateFlow` cho phép bạn truy cập đồng bộ giá trị được phát ra cuối cùng bằng cách đọc thuộc tính `value` của nó. Đó không phải là trường hợp của `SharedFlow`.

# Cải thiện hiệu suất
Các API này có thể cải thiện hiệu suất bằng cách chia sẻ cùng một instance của flow để tất cả collecter observed thay vì tạo các instance mới của cùng flow theo yêu cầu.

Trong ví dụ sau, `LocationRepository` consume flow `LocationSource` do `LocationDataSource` exposed và áp dụng toán tử `shareIn` để làm cho mọi người quan tâm đến location của user collect từ cùng một instance của flow. Chỉ một instance của flow `LocationSource` được tạo và chia sẻ cho tất cả các collector:

```Kotlin
class LocationRepository(
    private val locationDataSource: LocationDataSource,
    private val externalScope: CoroutineScope
) {
    val locations: Flow<Location> = 
        locationDataSource.locationsSource.shareIn(externalScope, WhileSubscribed())
}
```

Chính sách chia sẻ `WhileSubscribe` được sử dụng để cancel upstream khi không có collectors. Bằng cách này, chúng ta tránh lãng phí tài nguyên khi không ai quan tâm đến cập nhật location.

> Mẹo cho các ứng dụng Android! Bạn có thể sử dụng WhileSubscribe (5000) hầu hết thời gian để giữ cho upstream hoạt động thêm 5 giây sau khi collectors cuối cùng biến mất. Điều đó tránh khởi động lại upstream trong các tình huống nhất định chẳng hạn như change configuration. Mẹo này đặc biệt hữu ích khi việc tạo upstream flow tốn kém và khi các toán tử này được sử dụng trong ViewModels.
# Bufftering events
Đối với ví dụ này, các yêu cầu của chúng ta đã thay đổi và bây giờ chúng ta được yêu cầu *luôn luôn* lắng nghe cập nhật location và hiển thị 10 location cuối cùng trên màn hình khi ứng dụng trở lại từ background:

```Kotlin
class LocationRepository(
    private val locationDataSource: LocationDataSource,
    private val externalScope: CoroutineScope
) {
    val locations: Flow<Location> = 
        locationDataSource.locationsSource
            .shareIn(externalScope, SharingStarted.Eagerly, replay = 10)
} 
```

Chúng ta sử dụng giá `replay` là 10 để giữ 10 item đã phát cuối cùng trong bộ nhớ và phát lại các items đó mỗi khi collector observes flow. Để giữ cho flow bên dưới luôn hoạt động và cập nhật location, hãy sử dụng chính sách `SharingStarted.Eagerly` để lắng nghe các bản cập nhật ngay cả khi không có collector.

# Caching data
Các yêu cầu của chúng ta đã thay đổi một lần nữa và trong trường hợp này, chúng ta không cần phải luôn lắng nghe các bản cập nhật location nếu ứng dụng đang ở background. Tuy nhiên, chúng ta cần lưu vào bộ nhớ cache của item được phát cuối cùng để người dùng luôn nhìn thấy một số dữ liệu trên màn hình, ngay cả khi đã cũ, trong khi nhận được location hiện tại. Đối với trường hợp này, chúng ta có thể sử dụng toán tử `stateIn`.

```Kotlin
class LocationRepository(
    private val locationDataSource: LocationDataSource,
    private val externalScope: CoroutineScope
) {
    val locations: Flow<Location> = 
        locationDataSource.locationsSource.stateIn(externalScope, WhileSubscribed(), EmptyLocation)
}
```

`Flow.stateIn` lưu vào bộ nhớ cache và phát lại item đã phát cuối cùng cho một collector mới.

# COI CHỪNG! Không tạo instance mới trên mỗi lệnh gọi hàm

**KHÔNG BAO GIỜ** sử dụng `shareIn` hoặc `stateIn` để tạo flow mới được trả về khi gọi một hàm. Điều đó sẽ tạo một `SharedFlow` hoặc `StateFlow` mới trên mỗi lệnh gọi hàm sẽ vẫn còn trong bộ nhớ cho đến khi scope bị canceled hoặc được bị garbage collected khi không có tham chiếu đến nó.

```Kotlin
class UserRepository(
    private val userLocalDataSource: UserLocalDataSource,
    private val externalScope: CoroutineScope
) {
    // DO NOT USE shareIn or stateIn in a function like this.
    // It creates a new SharedFlow/StateFlow per invocation which is not reused!
    fun getUser(): Flow<User> =
        userLocalDataSource.getUser()
            .shareIn(externalScope, WhileSubscribed())    

    // DO USE shareIn or stateIn in a property
    val user: Flow<User> = 
        userLocalDataSource.getUser().shareIn(externalScope, WhileSubscribed())
}
```

# Flow yêu cầu đầu vào
Các flows yêu cầu đầu vào, như `userId`, không thể được chia sẻ dễ dàng bằng `shareIn` hoặc `stateIn`. Lấy ví dụ về dự án nguồn mở [iosched](https://github.com/google/iosched) - ứng dụng Google I/O của Android - quy trình nhận các sự kiện của người dùng từ Firestore được triển khai bằng `callbackFlow`, như bạn có thể thấy trong mã nguồn. Vì nó lấy `userId` làm tham số, flow này không thể được sử dụng lại dễ dàng bằng cách sử dụng toán tử `shareIn` hoặc `stateIn`.

```Kotlin
class UserRepository(
    private val userEventsDataSource: FirestoreUserEventDataSource
) {
    // New collectors will register as a new callback in Firestore.
    // As this function depends on a `userId`, the flow cannot be
    // reused by calling shareIn or stateIn in this function.
    // That will cause a new Shared/StateFlow to be created
    // every time the function is called.
    fun getUserEvents(userId: String): Flow<UserEventsResult> =
        userLocalDataSource.getObservableUserEvents(userId)
}
```

Việc tối ưu hóa trường hợp sử dụng này tùy thuộc vào yêu cầu của ứng dụng của bạn:
* Bạn có cho phép nhận sự kiện từ nhiều users cùng một lúc không? Bạn có thể cần tạo một map của các instance `SharedFlow / StateFlow`, đồng thời xóa tham chiếu và cancel upstream flow khi `subscriptionCount` bằng 0.
* Nếu bạn chỉ cho phép một user và tất cả collectors cần cập nhật cho user mới, bạn có thể gửi cập nhật sự kiện cho một `SharedFlow / StateFlow` chung cho tất cả collectors và sử dụng flow chung làm biến trong lớp.


Các toán tử `shareIn` và `stateIn` có thể được sử dụng với các cold flow để cải thiện hiệu suất, thêm bộ đệm khi không có collector hoặc thậm chí là cơ chế lưu vào bộ nhớ đệm! Sử dụng chúng một cách khôn ngoan và không tạo các instance mới trên mỗi lệnh gọi hàm - nó sẽ không hoạt động như bạn mong đợi!