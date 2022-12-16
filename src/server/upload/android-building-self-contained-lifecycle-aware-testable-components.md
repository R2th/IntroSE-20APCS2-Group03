<div align="center"><img src="https://images.viblo.asia/c9a37fcc-3214-4d2d-9d59-c5f37efc7780.png" /></div><br />

Trong các ứng dụng Android, rất nhiều hoạt động được điều hướng bởi vòng đời, và bởi vì một ứng dụng lớn lên một cách mạnh mẽ, do đó các hoạt động của một lifecycle owner(nói cách khác là một activity hoặc fragment) phải được quản lý trong các phương thức lifecycle callback methods của nó, làm cho mã nguồn khó bảo trì và kiểm thử nếu không được triển khai đúng cách.

Trong bài viết này, bạn sẽ thấy hai cách thức nhằm giải quyết vấn đề tương tự(lấy cảm hứng từ [Android Documents](https://developer.android.com/topic/libraries/architecture/lifecycle)), một cái sử dụng cách thức truyền thông thông thường, cái khác sử dụng một giải pháp tốt hơn cái sử dụng android architecture lifecycle classes nhằm xây dựng một thành phần lifecycle aware.

## Prerequisites
Một vài kiến thức về Android Architecture [Lifecycle components](https://developer.android.com/reference/android/arch/lifecycle/package-summary) sẽ là rất tốt để đi theo và hiểu về phần còn lại của bài viết này.

## Problem
Bạn cần hiển thị vị trí của người dùng trong ứng dụng của mình chỉ khi họ đã đăng nhập. Đối với mục đích của cả hai giải pháp bên dưới, bạn phải theo sát 3 lớp:

***MainActivity***: Màn hình nơi vị trí của người dùng được hiển thị.
***MainViewModel***: Chứa logic cái kiểm tra **bất đồng bộ** trạng thái của một người dùng. Để bắt tay vào bài viết này, nó đơn giản trả về một giá trị **true** được gói trong LiveData (Nhưng trong ngữ cảnh của thế giới thực, hoạt động này có thể mất một khoảng thời gian để hoàn thành).

```
class MainViewModel : ViewModel() {

    fun checkUserStatus() = MutableLiveData<Boolean>().apply {
        value = true
    }
}
```

***LocationListener***: Lớp được xử lý để lấy và giữ việc theo dõi vị trí của thiết bị. Nó làm sự tập trung chính của hai cách thức bên dưới. Nó bao gồm hai phương thức: ***start()*** và ***stop()*** cái bắt đầu và kết thúc việc giữ quá trình theo dõi vị trí của thiết bị. Với mục đích đơn giản, hai phương thức này chỉ cập nhật giá trị của một biến ***status***.

## Solution 1: The "common" way
Một cách thức thông thường nhằm giải quyết vấn đề này sẽ bao gồm một quá trình triển khai của **LocationListener** cái sẽ trông như thế này:

```
class LocationListener(private val callback: (String) -> Unit) {

    private var status = ""

    fun start() {
        status = CONNECTED
        callback.invoke("Somewhere in Los Angeles")
    }

    fun stop() {
        status = DISCONNECTED
    }

    companion object {
        const val CONNECTED = "Connected"
        const val DISCONNECTED = "Disconnected"
    }
}
```

Hàm khởi tạo của **LocationListener** được truyền vào một callback, cái là một hành động nhằm thực hiện ngay lập tức khi vị trí của người dùng đã sẵn sàng. Các phương thức **start()** và **stop()** được gọi như bên dưới:

```
class MainActivity : AppCompatActivity() {

    private lateinit var viewModel: MainViewModel
    private lateinit var locationListener: LocationListener
    private var enabled = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupLocationListener()
        setupViewModel()
    }

    private fun setupLocationListener() {
        locationListener = LocationListener { location ->
            Log.d("MainActivity", "Location is $location")
        }
    }

    private fun setupViewModel() {
        viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        viewModel.checkUserStatus().observe(this, Observer { isUserSignedIn ->
            if (isUserSignedIn == true) {
                enabled = true
                locationListener.start()
            }
        })
    }

    override fun onStart() {
        super.onStart()
        if (enabled) {
            locationListener.start()
        }
    }

    override fun onStop() {
        super.onStop()
        if (enabled) {
            locationListener.stop()
        }
    }
}
```

Như bạn có thể thấy, một biến **enable** là cần thiết để gọi các phương thức của **LocationListener**. Với hơn một thành phần để quản lý và rất nhiều hành động nhằm xử lý trong lifecycle callback methods(**onStart()**, **onPause()**,....) activity sẽ chắc chắn trở nên phức tạp và chứa đựng mã nguồn cái khó cho việc bảo trì, và kiểm thử độc lập. Một cách thức nhằm giải quyết vấn đề này đó là trích xuất các thành phần vòng đời của **LocationListener** phụ thuộc vào logic bên trong chính lớp của nó cái là những gì trong giải pháp thứ hai chúng ta sẽ thử.

## Solution 2: The better way
Một cách thức tốt hơn nhằm giải quyết vấn đề như đã gợi ý bên trên là xây dựng một thành phần như sau:

*  **Self-contained**: Tất cả các vị trí liên quan tới logic được đặt vào cùng một chỗ, tạo cho nó dễ dàng được debug nếu cần bảo trì và xây dựng thêm.
* **Lifecycle aware**: Thành phần này lắng nghe một **LifecycleOwner**(Giống như một Activity hoặc Fragment) và tương tác lại theo các thay đổi trạng thái vòng đời của nó, tách bạch nó với UI.
* **Testable**: Thanh phần có thể bị cô lập và unit test bằng cách cung cấp cho nó một Lifecycle giả.

Với cách thức này, **MainActivity** trong sẽ sáng sủa hơn:

```
class MainActivity : AppCompatActivity() {

    private lateinit var viewModel: MainViewModel
    private lateinit var locationListener: LocationListener

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupLocationListener()
        setupViewModel()
    }

    private fun setupLocationListener() {
        locationListener = LocationListener(lifecycle) { location ->
            Log.d("MainActivity", "Location is $location")
        }
    }

    private fun setupViewModel() {
        viewModel = ViewModelProviders.of(this).get(MainViewModel::class.java)
        viewModel.checkUserStatus().observe(this, Observer { isUserSignedIn ->
            if (isUserSignedIn == true) {
                locationListener.enable()
            }
        })
    }
}
```

Không có gì điên dồ xảy ra bên trong nó, nó khởi tạo một **LocationListener**, lắng nghe phương thức **checkUserStatus** của viewModel, và chỉ gọi **locationListener.enable()** nếu người dùng đã logged. Hãy xem lớp **LocationListner** bây giờ trông như thế nào:

```
class LocationListener(
        @get:VisibleForTesting(otherwise = VisibleForTesting.PRIVATE) val lifecycle: Lifecycle,
        private val callback: (String) -> Unit) : LifecycleObserver {

    private var enabled = false

    @get:VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
    var status = ""

    init {
        lifecycle.addObserver(this)
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    fun start() {
        if (enabled) {
            status = CONNECTED
            callback.invoke("Somewhere in Los Angeles")
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    fun stop() {
        if (enabled) {
            status = DISCONNECTED
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
    fun destroy() {
        lifecycle.removeObserver(this)
    }

    fun enable() {
        enabled = true
        if (lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) {
            start()
        }
    }

    companion object {
        const val CONNECTED = "Connected"
        const val DISCONNECTED = "Disconnected"
    }
}
```

Bên dưới là những thứ chính được chú thích về lớp **LocationListener**.

1. **LocationListener** được khởi tạo bằng cách truyền vào cho nó một **Lifecycle** và một **Callback**(một hành động nhằm chạy ngay lập tức khi vị trí của người dùng sẵn sàng).
2. Một thể hiện của **LocationListener** bắt đầu quá trình lắng nghe **lifecycle** của nó ngay lập tức khi nó được khởi tạo, và dừng quá trình lắng nghe đó ngay lập tức khi lifecycle owner của nó bị hủy.
3. **LocationListener** chỉ cập nhật trạng thái của nó nếu **enabled** được thiết lập thành **true**. **enabled** được thiết lập thành **true** sau khi phương thức **checkUserStatus()** trả về một kết quả, và do tính chất bất đồng bộ của nó nên không có cách thức này để nói rằng điều này xảy ra trường hoặc sau phương thức **onStart()** của activity, cái giải thích tại sao phương thức **enable()** được thêm vào với điều kiện bên dưới **lifecycle.curentState.isAtLeast(STARTED)**.

Giờ đây **LoactionListener** đang là một self-contained lifecycle aware component, nó trở nên dễ dàng nhằm cô lập và unit test nó. Bởi vì nó đòi hỏi một thể hiện của **Lifecycle**, bạn có thể giả lập một **LifecycleOwner** và sử dụng nó cho các kiểm thử của mình.

```
class TestLifecycleOwner : LifecycleOwner {

    private val lifecycle = LifecycleRegistry(this)

    fun onCreate() {
        lifecycle.handleLifecycleEvent(Lifecycle.Event.ON_CREATE)
    }

    fun onStart() {
        lifecycle.handleLifecycleEvent(Lifecycle.Event.ON_START)
    }
    
    // Other lifecycle callback methods

    override fun getLifecycle() = lifecycle
}
```

Giờ đây, bạn có thể sử dụng lifecycle của **TestLifecycleOwner** bên trên nhằm khởi tạo một **LocationListener** trong kiểm thử của mình.

```
class LocationListenerShould {

    private val lifecycleOwner = TestLifecycleOwner()
    private lateinit var locationListener: LocationListener

    @Before
    fun setUp() {
        locationListener = LocationListener(lifecycleOwner.lifecycle, {})
    }

    @Test
    fun observeLifecycleOnInitialisation() {
        assertEquals(1, lifecycleOwner.lifecycle.observerCount)
    }

    @Test
    fun stopObservingLifecycle_whenLifecycleOwnerIsDestroyed() {
        lifecycleOwner.onCreate()
        lifecycleOwner.onDestroy()

        assertEquals(0, lifecycleOwner.lifecycle.observerCount)
    }

    @Test
    fun disconnect_whenEnabledIsTrue() {
        lifecycleOwner.onCreate()
        lifecycleOwner.onStart()
        locationListener.enable()

        lifecycleOwner.onStop()

        assertEquals(LocationListener.DISCONNECTED, locationListener.status)
    }
    
    // ...
}
```

Như vậy cái gì sẽ được kiểm thử ở đây?

* **LocationListener** đó bắt đầu lắng nghe lifecycle của nó khi nó được khởi tạo, và dừng quá trình lắng nghe khi owner của nó bị hủy.
* **LocationListener** kết nối, không kết nối và ngắt kết nói một cách chính xác trong các ngữ cảnh khác nhau phụ thuộc vào các lifecycle callbacks và giá trị của **enabled**.

Mã nguồn demo cho bài viết có thể tìm thấy [ở đây](https://github.com/husaynhakeem/LifecycleAwareComponentSample?source=post_page-----63f25474646f----------------------).

## Conclusion
Bởi vì có rất nhiều hành động trong các ứng dụng Android được điều hướng bởi lifecycle, quá trình sử dụng lifecycle aware components cái phản ứng lại với các thay đổi trạng thái của vòng đời nhằm thực hiện các hành động giúp các components được tổ chức tốt hơn, tách bạch và nhẹ hơn, cái hướng tới một con đường dài hơn nhằm xây dựng một codebase có khả năng bảo trì và kiểm thử tốt hơn.

## Source
https://proandroiddev.com/android-building-self-contained-lifecycle-aware-testable-components-63f25474646f

## Reference
1. [Exploring the new Android Architecture Components library](https://medium.com/exploring-android/exploring-the-new-android-architecture-components-c33b15d89c23). <br />
2. [Lifecycle-Aware Components | Architecture Components](https://androidwave.com/lifecycle-aware-components-architecture-components/). <br />
3. [Working with Android Jetpack Lifecycle-Aware Components](https://www.techotopia.com/index.php/Working_with_Android_Jetpack_Lifecycle-Aware_Components). <br />
4. [Android life cycle aware components](https://www.talentica.com/blogs/android-life-cycle-aware-components/).
5. [Android lifecycle-aware components codelab](https://codelabs.developers.google.com/codelabs/android-lifecycles).

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))