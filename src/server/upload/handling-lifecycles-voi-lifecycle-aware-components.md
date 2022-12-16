# Lifecycle event in Android
![](https://cdn-images-1.medium.com/max/2000/1*qxRl-_HLbUMnMjgJJuNXRQ.png)

> Lifecycle trong android chắc hẳn vẫn còn đau đầu đối với một bộ phận không nhỏ các lập trình viên Android trên thế giới. Đa số các lần bị rò rỉ bộ nhớ trong codebase bởi vì việc không đồng bộ giữa các trạng thái và vòng đời của activity hoặc fragment trong ứng dụng. Nó có nghĩa là các lập trình viên phải nhiều lần kiểm tra tại chỗ và chắc chắn rằng trạng thái của code phải được đồng bộ với vòng đời của Activity hay Fragment.
- Một ví dụ thực tế khi chúng ta muốn lắng nghe vị trí của mình, thông thường chúng ta sẽ tạo 1 class để triển khai service như sau:
```
class MyLocationListener {
    public MyLocationListener(Context context, Callback callback) {
        // ...
    }

    void start() {
        // connect to system location service
    }

    void stop() {
        // disconnect from system location service
    }
}
```

- Và sau đó, việc triển khai sẽ tương tự như này
```
class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    @Override
    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, (location) -> {
            // update UI
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        myLocationListener.start();
        Util.checkUserStatus(result -> {
            // what if this callback is invoked AFTER activity is stopped?
            if (result) {
                myLocationListener.start();
            }
        });
        // manage other components that need to respond
        // to the activity lifecycle
    }

    @Override
    public void onStop() {
        super.onStop();
        myLocationListener.stop();
        // manage other components that need to respond
        // to the activity lifecycle
    }
}
```

- Vấn đề ở đây nếu như việc kiểm tra thông tin của người dùng trong hàm onStart() đang thực hiện chưa xong nhưng activity lại chuyển qua trạng thái stop. Việc đồng bộ giữa các trạng thái này sẽ tốn rất nhiều công sức và gây ra một số lỗi nhất định. Trong trường hợp này sẽ dẫn đến trạng thái rò rỉ bộ nhớ.

# Lifecycle-Aware
> Được ra mắt trong sự kiện **Google I/O 2018** nằm trong gói [Android Jetpack](https://developer.android.com/jetpack/), đã giới thiệu thư viện để quản lý vòng đời trong ứng dụng Android có tên **Lifecycle-Aware**. Nó giúp cho việc theo dõi vòng đời của một activity hoặc fragment và điều chỉnh các hành vi của chúng cho phù hợp.
-----

Lifecycle-Aware có trong package [android.arch.lifecycle](https://developer.android.com/reference/android/arch/lifecycle/package-summary), trong đó thêm một số thư viện nữa như LiveData, ViewModel, ... Bạn có thể tìm hiểu thêm ở [đây](https://developer.android.com/topic/libraries/architecture/) 
## Lifecycle
> Về cơ bản Lifecycle là một lớp chưa thông tin về trạng thái vòng đời của một thành phần (như là activity hoặc fragment) và cho phép các đối tượng khác quan sát những trạng thái này.


-----


Nó sử dụng 2 bảng liệt kê chính để theo dõi trạng thái vòng đời cho thành phần mà nó quan sát:

- **Event**: Các sự kiện của vòng đời được gửi đi từ framework và **Lifecycle** class. Những event này sẽ ánh xạ tới các sự kiện callback trong các activity và fragment.
- **State**: Là trạng thái hiện tại của thành phần được theo dõi bởi đối tượng **Lifecycle**.

Dưới đây là hình minh họa về các trạng thái và event của nó:
![](https://developer.android.com/images/topic/libraries/architecture/lifecycle-states.png)
> Như vậy hãy nghĩ về các trạng thái như các node của các biều đồ và các sự kiện là cách cạnh liên kết giữa các nút này.

Một class có thể theo dõi trạng thái vòng đời của thành phần nào đó bằng cách thêm annotation vào các phương thức của nó. Sau đó bạn có thể thêm observer bằng cách gọi phương thức **addObserver()** của Lifecycle.
```
public class MyObserver implements LifecycleObserver {
    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    public void connectListener() {
        ...
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    public void disconnectListener() {
        ...
    }
}

myLifecycleOwner.getLifecycle().addObserver(new MyObserver());
```

## LifecycleOwner
> LifecycleOwner là một phương thức interface duy nhất biểu thì rằng lớp đó có vòng đời. Nó chỉ có một phương thức, **getLifecycle()** mà phải được triển khai bởi class. Còn nếu bạn muốn quản lý cả vòng đời của toàn bộ ứng dụng, hãy xem [ProcessLifecycleOwner](https://developer.android.com/reference/android/arch/lifecycle/ProcessLifecycleOwner). Bất kì lớp ứng dụng tùy chỉnh nào kế thừa từ Fragment hoặc là AppCompatActivity đều có thể sử dụng được interface này.

- Ví dụ như trong trường hợp bạn muốn kiểm tra vị trí, chúng ta có thể tạo class **MylocationListener** mà implement LifecycleObserver và sau đó đăng ký vào hàm **onCreate()** của activity. Việc này cho phép việc lắng nghe vị trí của ứng dụng sẽ phụ thuộc vào trạng thái của lớp MylocationListener thay vì của activity.
```
class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, getLifecycle(), location -> {
            // update UI
        });
        Util.checkUserStatus(result -> {
            if (result) {
                myLocationListener.enable();
            }
        });
  }
}
```

- Và đây là class MyLocationListener có thể dùng để lắng nghe vị trí theo các trạng thái của vòng đời activity hoặc fragment.
```
class MyLocationListener implements LifecycleObserver {
    private boolean enabled = false;
    public MyLocationListener(Context context, Lifecycle lifecycle, Callback callback) {
       ...
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_START)
    void start() {
        if (enabled) {
           // connect
        }
    }

    public void enable() {
        enabled = true;
        if (lifecycle.getCurrentState().isAtLeast(STARTED)) {
            // connect if not connected
        }
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    void stop() {
        // disconnect if connected
    }
}
```
> Sử dụng các anotation **OnLifecycleEvent** tương ứng với các event được theo dõi bên activity hoặc fragment để có thể thực hiện những hoạt động tương ứng.  Việc này sẽ giúp cho lớp MyLocationListener này hoàn toàn nhận biết vòng đời của thành phần khởi tạo nó, và khi cần dùng ở một chỗ khác thì chỉ cần khởi tạo nó là được. Còn các logic thì được quản lý bởi chính lớp đó.

## Custom LifecycleOwner
> Các fragment và activity từ thư viện support 26.0.1 trở lên có thể implement LifecycleOwner.

- Nếu bạn muốn tự custom một class tương tự như LifecycleOwner thì bạn sẽ cần sử dụng đến class [LifecycleRegistry](https://developer.android.com/reference/android/arch/lifecycle/LifecycleRegistry)  như ví dụ dưới đây:
```
public class MyActivity extends Activity implements LifecycleOwner {
    private LifecycleRegistry mLifecycleRegistry;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mLifecycleRegistry = new LifecycleRegistry(this);
        mLifecycleRegistry.markState(Lifecycle.State.CREATED);
    }

    @Override
    public void onStart() {
        super.onStart();
        mLifecycleRegistry.markState(Lifecycle.State.STARTED);
    }

    @NonNull
    @Override
    public Lifecycle getLifecycle() {
        return mLifecycleRegistry;
    }
}
```
-----
# Kết luận
- Trên đây là một chút tìm hiểu về thư viện **lifecycle-aware** nằm trong gói lifecycle của **Architecture Component** mới ra của Google.
- Bạn nên tìm hiểu thêm về **ViewModel** và **LiveData** để quản lý các UI controller cho activity hoặc fragment càng gọn càng tốt. Sử dụng ViewModel như là class custom của LifecycleOwner và gửi dữ liệu qua LiveData về activity hoặc fragment để xử lý.
- Bài viết được tham khảo tại [Android Develop](https://developer.android.com/topic/libraries/architecture/lifecycle#java)