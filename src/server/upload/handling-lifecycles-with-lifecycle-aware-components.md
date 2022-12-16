Lifecycle-aware components thực hiện các action để đáp ứng với sự thay đổi của các trạng thái vòng đời trong các component khác, như acivity và fragment. Những component này giúp chúng ta có thể tổ chức tốt hơn, code nhẹ hơn và dễ dàng maintain hơn.

Thường thì chúng ta thực hiện các action của component phụ thuộc trong các phương thức vòng đời của activity và fragment. Tuy nhiên điều này dẫn đến việc tổ chức code quá phức tạp và là nơi phát sinh lỗi. Bằng việc sử dụng lifecycle-aware component, chúng ta có thể di chuyển code của các component phụ thuộc ra khỏi các phương thức vòng đời  và đưa vào trong chính nó. 

`android.arch.lifecycle` package cung cấp các class và interface để chúng ta xây dựng *lifecycle-aware* components - chính là các component có thể tự động điều chỉnh hành vi dựa trên trạng thái vòng đời của activity hay fragment. 

Hầu hết các app components được định nghĩa trong  Android Framework có các lifecycles đính kèm theo chúng. Lifecycles được quản lý bởi OS hoặc framework code chạy trong process của chúng ta. Đây là thành phần cốt lõi để android hoạt động và các ứng dụng của chúng ta phải phụ thuộc vào chúng. Nếu không nó có thể là nguyên nhân gây ra memory leak hoặc thậm chí là crash app. 

Giả sử rằng chúng ta có một activity hiển thị location của thiết bị trên màn hình. Chúng ta có thể thực hiện như sau:

```java
internal class MyLocationListener(
        private val context: Context,
        private val callback: (Location) -> Unit
) {

    fun start() {
        // connect to system location service
    }

    fun stop() {
        // disconnect from system location service
    }
}

class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this) { location ->
            // update UI
        }
    }

    public override fun onStart() {
        super.onStart()
        myLocationListener.start()
        // manage other components that need to respond
        // to the activity lifecycle
    }

    public override fun onStop() {
        super.onStop()
        myLocationListener.stop()
        // manage other components that need to respond
        // to the activity lifecycle
    }
}
```

Mặc dù code trên nhìn có vẻ ổn, nhưng trong app thực tế, chúng ta có quá nhiều phương thức được được call để quản lý UI và đáp ứng các phản hồi của các component khác trong current state của lifecycle.  Việc phải quản lý nhiều component tạo ra lượng lớn code trong các phương thức vòng đời, như trong `onStart()` và `onStop()` của activity, điều này gây ra khó khăn trong việc maintain ứng dụng. 

Hơn nữa, không có sự đảm bảo rằng các component sẽ bắt đầu trước khi activity hoặc fragment bị stop. Điều này đúng nếu chúng ta thực hiện một long-running operation, có thể là một vài kiểm tra config trong `onStart()`. Đây có thể là nguyên nhân cho race condintion khi `onStop()` kết thúc trước `onStart()`. Việc giữ cho component tồn tại lâu hơn là cần thiết. 

```java
class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this) { location ->
            // update UI
        }
    }

    public override fun onStart() {
        super.onStart()
        Util.checkUserStatus { result ->
            // what if this callback is invoked AFTER activity is stopped?
            if (result) {
                myLocationListener.start()
            }
        }
    }

    public override fun onStop() {
        super.onStop()
        myLocationListener.stop()
    }

}
```

`android.arch.lifecycle` package cung cấp các class và interface giúp chúng ta giải quyết vấn đề này theo một cách linh hoạt và độc lập.

### Lifecycle

`Lifecycle` là class giữ thông tin về trạng thái vòng đời của component (như activity hoặc fragment) và cho phép các object khác quan sát state này. 

`Lifecycle` dùng 2 enum chính để theo dõi lifecycle status cho các thành phần liên kết với nó. 

**Event**
Lifecycle events được gửi từ framework và `Lifecycle` class, những event này sẽ được map với callback event trong activity và fragment.

**State** 
Current state của component theo dõi bởi `Lifecycle` object. 

![](https://images.viblo.asia/572adcba-126f-4aa3-9a89-b140a0d010a1.png)

Trong hình, state sẽ được đại diện bởi các node, còn event sẽ là các cạnh giữa những node này.

Một class có thể quan sát trạng thái vòng đời của các component bằng việc thêm các annotation vào các method của nó. Sau đó chúng ta có thể add một observer bằng cách gọi `addObserver()` của `Lifecycle` class và truyền observer instance của chúng ta, như dưới đây:

```java
class MyObserver : LifecycleObserver {

    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    fun connectListener() {
        ...
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    fun disconnectListener() {
        ...
    }
}

myLifecycleOwner.getLifecycle().addObserver(MyObserver())
```

Trong ví dụ trên, `myLifecycleOwner` implements `LifecycleOwner` interface - cái này sẽ được giải thích trong phần sau.

### LifecycleOwner

LifecycleOwner là một  single method interface thể hiện cho class có `Lifecycle`. Nó có một phương thước `getLifecycle()` - Cái này phải được implement bới class. Thay vào đó, nếu bạn đang cố gắng quản lý vòng đời của tòan bộ application process, xem thêm `ProcessLifecycleOwner`.

Interface này abstract quyền sở hữu của `Lifecycle` từ các class riêng lẻ, như `Fragment` và `AppCompactActivity`, cho phép viết các component làm việc với chúng. Bất kì custom application class nào đều có thể implement `LifecycleOwner` interface. 

Các components implement LifecyclObserver hoạt động trơn tru với các components implement LifecyclOwner vì owner có thể cung cấp vòng đời mà observer có thể đăng ký để xem.

Quay lại ví dụ theo dõi vị trí, chúng ta có thể tạo class `MyLocationListener` implement `LifecycleObserver` và sau đó khởi tạo nó trong `Lifecycle` của activity trong method `onCreate()`. Điều này cho phép class `MyLocationListener` trở thành độc lập, nghĩa là locgic để phản ứng lại với thay đổi trạng thái của vòng đời được khai báo trong `MyLocationListener` thay vì trong activity. Cá nhân components lưu trữ logic của chính nó làm cho logic trong activity và fragment dễ dàng quản lý hơn. 

```java
class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this, lifecycle) { location ->
            // update UI
        }
        Util.checkUserStatus { result ->
            if (result) {
                myLocationListener.enable()
            }
        }
    }
}
```

Một trường hợp phổ biến để tránh gọi các callback nếu hiện tại `Lifecycle` không ở trạng thái đúng. Ví dụ, nếu callback chạy một fragment transaction sau khi activity state được saved, nó sẽ gây ra crash. Vì vậy chúng ta sẽ không bao giờ muốn nó gọi callback này. 

Để làm điều này, class `Lifecycle` cho phép một object khác query current state. 

```java
internal class MyLocationListener(
        private val context: Context,
        private val lifecycle: Lifecycle,
        private val callback: (Location) -> Unit
) {

    private var enabled = false

    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    fun start() {
        if (enabled) {
            // connect
        }
    }

    fun enable() {
        enabled = true
        // If the current state greater or equal STARTED state then connecting
        if (lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) {
            // connect if not connected
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    fun stop() {
        // disconnect if connected
    }
}
```

Với implement này thì class `LocationListener` của chúng ta hoàn toàn nhận biết được lifecycle. Nếu muốn dùng `LocationListener` cho một activity hoặc fragment khác, chúng ta chỉ cần khởi tạo nó. Toàn bộ việc setup và hủy bỏ điều được quản lý bởi chính nó. 

### Implementing a custom LifecycleOwner
Fragments và Activities trong Support Library 26.1.0 và sau đó đã được implement `LifecycleOwner` interface.

Nếu chúng ta có một custom class và muốn nó là một `LifecycleOwner`, chúng ta có thể dùng `LifecycleRegistry` class, nhưng chúng ta cần chuyển các sự kiện vào class đó, như ví dụ dưới đây.

```java
class MyActivity : Activity(), LifecycleOwner {

    private lateinit var lifecycleRegistry: LifecycleRegistry

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleRegistry = LifecycleRegistry(this)
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }

    public override fun onStart() {
        super.onStart()
        lifecycleRegistry.markState(Lifecycle.State.STARTED)
    }

    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```

### Tham khảo
1. https://developer.android.com/topic/libraries/architecture/lifecycle#samples

### Samples
1. [Android Architecture Components Basic Sample](https://github.com/googlesamples/android-architecture-components/tree/master/BasicSample)
2. [Sunflower](https://github.com/googlesamples/android-architecture-components)