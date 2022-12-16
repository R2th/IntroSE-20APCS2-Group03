Các thành phần nhận biết vòng đời (Lifecycle-aware components) thực hiện các hành động để đáp ứng với sự thay đổi trạng thái vòng đời của thành phần khác, chằng hạn như Activity hay Fragment.
Những thành phần này giúp bạn tổ chức code tốt hơn, đơn giản hơn và dễ dàng maintain.

Một mô hình phổ biến là thực hiện hành động của các thành phần phụ thuộc vào các lifecycle methods của activities hay fragments. Tùy nhiên mô hình này dẫn đến việc tổ chức các đoạn mã kém và tỉ lệ gia tăng lỗi cao.

Bằng cách sử dụng lifecycle-aware components, bạn có thể đưa các thành phần phụ thuộc ra khỏi các lifecycle methods và đẩy chúng vào các thành phần của lifecycle-aware.

Gói android.arch.lifecycle cung cấp các class và interface cho phép bạn xây dựng lifecycle-aware components - là các thành phần có thể tự động điều chỉnh hành vi của chúng dựa trên trạng thái vòng đời hiện tại của Activity hay Fragment.

Giả sử bạn có một Activity có nhiệm vụ hiển thị vị trí thiết bị trên màn hình. Thông thường việc triển khai thường như sau :
~~~java
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
~~~

Mặc dù nhìn có vẻ ổn nhưng trên thực tế khi xây dựng ứng dụng, bạn có rất nhiều lời gọi để quản lý UI và các component khác sao cho đáp ứng được trạng thái vòng đời hiện tại. Điều này dẫn đến 1 lượng lớn mã code được đặt trong các lifecycle methods chẳng hạn như onStart() hay onStop(), gây khó khăn khi bảo trì.

Hơn nữa, không có gì để đảm bảo rằng component được bắt đầu trước khi activity hay fragment dừng lại. Điều này đặc biệt đúng khi ta cần thực hiện tác vụ dài hạn, chẳng hạn check cấu hình trong onStart().
~~~java
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
            // Điều gì xảy ra nếu callback này được gọi sau onStop() được gọi ?
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
~~~
Gói android.arch.lifecycle cung cấp các class và interface giúp bạn giải quyết những vấn đề này một cách linh hoạt và tách biệt.

## Lifecycle

Lifecycle là một class giữ thông tin về trạng thái vòng đời của component (actvity,fragment) và cho phép các đối tượng khác quan sát trạng thái này.
Lifecycle sử dụng 2 enum chính để theo dõi trạng thái vòng đời cho các thành phần liên quan của nó :
* Event
    - Các event được gửi đi từ framework và lớp lifecycle. Những event này tương đương với các callback trong activity,fragment.
* State
    - Trạng thái hiện tại của component được theo dõi bỏi đối tượng Lifecycle

![](https://images.viblo.asia/df09f2a4-40ad-4e13-afa4-8826486602e5.png)

Coi State như các nút của của đồ thị và Event như các cạnh giữa các nút này.

Một class có thể giám sát trạng thái vòng đời của các thành phần bằng cách thêm các annotation vào method của nó. Sau đó bạn có thể thêm bộ quan sát bằng cách gọi phương thức addObserver() của lớp Lifecycle và truyền vào instance của bộ quan sát đó. Như trong ví dụ sau :
~~~java
class MyObserver : LifecycleObserver {

    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    fun connectListener() {
        ...
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    fun disconnectListener() {
        ...
    }
    myLifecycleOwner.getLifecycle().addObserver(MyObserver());

}
~~~
Trong ví dụ bên trên, đối tượng myLifecycleOwner implement LifecycleOwner interface, vậy LifecycleOwner là gì và nó nhiệm vụ gì ?

## LifecycleOwner

LifecycleOwner là một interface đánh dấu rằng lớp đó có Lifecycle. Nó có một method duy nhất và bắt buộc phải implement là getLifecycle(). Nếu bạn muộn quản lý vòng đời của toàn bộ quá trình ứng dụng, hãy xem ProcessLifecycleOwner.

Interface này trừu tượng hóa việc quyền sở hưu của Lifecycle từ các class riêng lẻ chẳng hạn như Fragment hay AppCompatActivity và cho phép viết các thành phần hoạt động với chúng. Bất cứ lớp ứng dụng tùy chỉnh nào cũng có thể implement LifecycleOwner interface.

Những thành phần implement LifecycleObserver hoạt động cùng với các thành phần implement LifecycleOwner bởi vì một chủ có thể cung cấp lifecycle, cái mà observer có thể đăng kí xem. 

Đối với ví dụ theo dõi vị trí, ta có thể cho class MyLocationListener implement LifecycleObserver sau đó khởi tạo nó trong onCreate() của Activity. Điều này cho phép lớp MyLocationListener độc lập. Có nghĩa các logic phản ứng với sự thay đổi trong trạng thái vòng đời được định nghĩa trong MyLocationListener thay vì trong Activity. Việc các thành phần riêng biệt lưu trữ logic riêng của chúng làm cho activity và fragment dễ quản lý hơn.

~~~java
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
~~~

Tránh gọi 1 số callback nhất định nếu Lifecycle không ở trong trạng thái tốt. Ví dụ, nếu callback chạy một fragment transaction sau khi trạng thái activity được lưu sẽ gây ra crash. Để tránh điều này, lớp Lifecycle cho phép các đối tượng khác truy vấn trạng thái hiện tại. 


~~~java
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
        if (lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) {
            // connect if not connected
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    fun stop() {
        // disconnect if connected
    }
}
~~~

Với cách implement này, lớp LocationListener đã hoàn toàn nhận biết được vòng đời (lifecycle-aware). Nếu ta cần sử dụng nó từ một activity hay fragment, chỉ cần khởi tạo nó. Tất cả các hoạt động được chính nó quản lý.

## Triển khai LifecycleOwner tùy chỉnh

Bắt đầu từ Support Library 26.1.0, các Fragment và Activity đã được implement Lifecycle interface.

Nếu bạn có một class tùy chỉnh và muốn tạo LifecycleOwner, bạn có thể sử dụng lớp LifecycleRegistry, nhưng bạn cần chuyển tiếp các sự kiện vào lớp đó như trong ví dụ sau :

~~~java

class MyActivity : AppCompatActivity(), LifecycleOwner {

    private lateinit var mLifecycleRegistry: LifecycleRegistry

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        mLifecycleRegistry = LifecycleRegistry(this)
        mLifecycleRegistry.markState(Lifecycle.State.CREATED)
    }

    public override fun onStart() {
        super.onStart()
        mLifecycleRegistry.markState(Lifecycle.State.STARTED)
    }

    override fun getLifecycle(): Lifecycle {
        return mLifecycleRegistry
    }
}
~~~

## Một số trường hợp sử dụng Lifecycle-aware components

* Chuyển đổi giữa fine location (vị trí chính xác) và coarse location (vị trí tương đối). Sử dụng Lifecycle-aware component để cập nhật ví trí chính xác của bạn khi ứng dụng đang ở foreground và chuyển sang tương đối khi ứng dụng ẩn. LiveData, một lifecycle-aware component, cho phép ứng dụng của bạn tự động update UI khi người dùng thay đổi vị trí. 
* Dừng và bắt đầu đệm video. Sử dụng lifecycle-aware component để bắt đầu đệm video sớm nhất có thể nhưng hoãn playback đến khi ứng dụng hoàn toàn được bắt đầu. Bạn cũng có thể sử dụng lifecycle-aware component để chấm dứt bộ đệm khi ứng dụng bị hủy.
* Dừng và bắt đầu kết nối mạng. Sử dụng lifecycle-aware component để enable streaming dữ liệu mạng khi ứng dụng ở foreground và tự động dừng khi ứng dụng ở background.
* Tạm dừng và tiếp tục các hoạt ảnh. Sử dụng lifecycle-aware component để xử lý việc tạm dừng hoạt ảnh khi ứng dụng đang ở background và tiếp tục khi ứng dụng ở foreground.