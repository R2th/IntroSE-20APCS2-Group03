![](https://media.giphy.com/media/10nbkHA3gwrCes/giphy.gif)
> Bài viết được dịch tại: https://developer.android.com/topic/libraries/architecture/lifecycle
# Introduction
- Lifecycle-aware nhận các phản hồi về sự thay đổi trong trạng thái của vòng đời của các thành phần như activities hay fragments và thực hiện các hành động thích hợp. Component này giúp chúng ta tổ chức các thành phần trong ứng dụng tốt hơn, code nhẹ hơn, và dễ dàng bảo trì.

- Một mô hình chung là thực hiện các hành động phụ thuộc vào các phương thức vòng đời của activities hoặc fragments. Tuy nhiên, mô hình này dẫn tới việc tổ chức code khá tệ cũng như khiến khả năng xảy ra lỗi cao hơn. Còn với các thành phần lifecycle-aware, bạn có thể chuyển code phụ thuộc vào các components ra ngoài các phương thức vòng đời của chúng và chuyển vào các components của lifecycle-aware.

- Gói **android.arch.lifecycle** cung cấp các classes và interfaces cho phép bạn dễ dàng xây dựng các lifecycle-aware components - là các thành phần tự động điều chỉnh các hành động của nó dựa trên trạng thái vòng đời hiện tại của một activity hoặc fragment

> - Chú ý để **import android.arch.lifecycle** vào project: https://developer.android.com/topic/libraries/architecture/adding-components.html#lifecycle

- Hầu hết các thành phần của ứng dụng được định nghĩa trong Android Framework có các vòng đời gắn liền với chúng. Lifecycles được quản lý bởi hệ thống hoặc framework đang chạy trong tiến trình của bạn. Chúng là cốt lõi để giúp Android hoạt động và ứng dụng của bạn nên quan tâm đến chúng. Nếu không làm như vậy, một ứng dụng có thể gặp rất nhiều rủi ro như memory leaks hay thậm chí khiến app bị dừng đột ngột.

- Giả sử chúng ta có một activity với nhiệm vụ hiển thị vị trí của thiết bị lên màn hình. Một cách triển khai thông thường sẽ như này: 
```java
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

- Nhìn qua đoạn code trên có vẻ khá ổn nhưng trong một ứng dụng thực tế thì bạn sẽ có quá nhiều lời gọi hàm để quản lý UI và các thành phần khác để phản hồi trạng thái của vòng đời. Việc quản lý quá nhiều vòng đời làm phình to số lượng code trong các phương thức vòng đời ví dụ như **onStart()** hoặc **onStop()** => khó khăn trong bảo trì

- Hơn nữa, chúng không đảm bảo được sẽ bắt đầu trước khi activity hoặc fragment bị dừng. Điều này đặc biệt đúng nếu chúng ta cần xử lý một tiến trình dài điển hình như một vài cấu hình được thực hiện trong **onStart()** . Một vài trường hợp có thể sẽ xảy ra sau khi **onStop()** được gọi như ví dụ dưới đây:
```java
class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, location -> {
            // update UI
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        Util.checkUserStatus(result -> {
            // Điều gì xảy ra nếu đoạn code này được chạy sau khi onStop() đã được gọi ? 
            if (result) {
                myLocationListener.start();
            }
        });
    }

    @Override
    public void onStop() {
        super.onStop();
        myLocationListener.stop();
    }
}
```
- Package sẽ cung cấp các classes và interfaces giúp bạn giải quyết các vấn đề này một cách riêng biệt.
# Lifecycle
- **Lifecycle** là một class giữ các thông tin về trạng thái vòng đời của một component và cho phép và cho phép các đối tượng khác observe (quan sát hoặc lắng nghe) các trạng thái này.

- **Lifecycle** sử dụng 2 thành phần chính của nó để theo dõi trạng thái vòng đời cho các thành phần liên quan đến nó:
+ **Event:** Các sự kiện vòng đời được gửi đi từ framework và lớp Lifecycle. Các sự kiện này tương đương với các sự kiện gọi lại (callback) trong activities và fragment  
+ **State:** Trạng thái hiện tại của component đã được theo dõi bởi đối tượng Lifecycle
![alt](https://developer.android.com/images/topic/libraries/architecture/lifecycle-states.png)
- Nghĩ một cách đơn giản thì states như các nodes của một đồ thị, các events như các đường đi giữa các nodes.

- Một lớp có thể quan sát trạng thái vòng đời của một component bằng cách thêm các thêm các annotations vào các methods của nó. Sau đó bạn có thể add một Observer bằng lời gọi hàm **addObserver()** của lớp **Lifecycle** và truyền vào đó một instance của observer của bạn như ví dụ dưới đây:
```java
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
 - Trong ví dụ trên, đối tượng **myLifecycleOwner** implements **LifecycleOwner** interface, điều này sẽ được giải thích ngay sau đây.

## LifecycleOwner
- **LifecycleOwner** là một interface với một phương thức thể hiện class này có một **Lifecycle**. Đó là phương thức **getLifecycle()**. Nếu bạn muốn thử quản lý vòng đời của toàn bộ tiến trình ứng dụng của bạn, hãy xem qua về [ProcessLifecycleOwner(https://developer.android.com/reference/android/arch/lifecycle/ProcessLifecycleOwner.html).

- Interface này trừu tượng hóa việc sở hữu một **Lifecycle** từ các classes riêng biệt, ví dụ như **Fragment** hay **AppCompatActivity**, và cho phép bạn thêm các thành phần làm việc cùng với chúng. Bất kì application class nào đều có thể triển khai **LifecycleOwner** interface. 

- Các components triển khai **LifecycleObserver** làm việc một cách liền mạch và thống nhất với các components implement **LifecycleOwner** bởi vì mỗi đối tượng này có thể cung cấp một lifecycle, và một observer có thể đăng ký để theo dõi.

- Quay trở lại với ví dụ theo dõi location, chúng ta sẽ tạo ra một class **MyLocationListener** implement **LifecycleObserver** và sau đó khởi tạo với **Lifecycle** của activity trong phương thức **onCreate()**. Điều này cho phép lớp **MyLocationListener** thực hiện các công việc phụ thuộc vào sự thay đổi trạng thái vòng đời thay vì thực hiện hay code chúng trong activity. Có một thành phần riêng biệt chứa các logic giúp các activities hay fragments dễ dàng quản lý hơn phải không ?
```java
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
- Một trong các trường hợp phổ biến là để tránh các callbacks nếu **Lifecycle** đang không ở đúng trạng thái mong muốn. Ví dụ, nếu một callback chạy một fragment transaction sau khi trạng thái của activity đã được lưu (sau **onDestroy** chẳng hạn) thì điều này sẽ khiến crash app, và dĩ nhiên không ai muốn điều đó xảy ra.

- Và vấn đề được giải quyết đơn giản với **Lifecycle**
```java
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
- Với cách triển khai này, **LocationListener** class đã hoàn toàn nhận biết được lifecycle. Nếu cần sử dụng **LocationListener** cho activity hoặc fragment khác, bạn chỉ cần khởi tạo nó. 

- Nếu một thư viện cung cấp các class cần làm việc với Android lifecycle, bạn nên sử dụng **lifecycle-aware** components. Thư viện của bạn sẽ dễ dàng tích hợp các components này mà không cần phải quản lý vòng đời tại phía client (tại activity hoặc fragment).

## Implement  a custom LifecycleOwner
- Nếu có một custom class bạn muốn sử dụng **LifecycleOwner**, hãy sử dụng **LifecycleRegistry** như đoạn code dưới đây:
```java
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
## Best practices for lifecycle-aware components
- Giữ cho phần điều khiển UI(activity hoặc fragment) càng gọn càng tốt. Chúng không nên lưu trữ dữ liệu của riêng nó, thay vào đó  sử dụng **ViewModel** để làm điều này, và sử dụng **LiveData** để theo dõi sự thay đổi của đối tượng và cập nhật lên màn hình

- Try to write data-driven UIs where your UI controller’s responsibility is to update the views as data changes, or notify user actions back to the [ViewModel](https://developer.android.com/reference/android/arch/lifecycle/ViewModel.html).
 
- Đặt các đoạn code xử lý data trong class **ViewModel**. **ViewModel** nên hoạt động như một người giúp kết nối giữa trình điều khiển UI và phần còn lại của ứng dụng. Chú ý, không có nghĩa là **ViewModel** sẽ có trách nhiệm lấy data(ví dụ từ network). Thay vào đó, ViewModel nên gọi các thành phần thích hợp để lấy dữ liệu, sau đó trả lại kết quả cho UI controller.

- Sử dụng **Data Binding** để có một giao diện gọn gàng giữa views và UI controller. Điều này cho phép bạn tạo views rõ ràng hơn và tối thiểu được code bạn viết trong activity hoặc fragment. 

- Nếu UI của bạn quá phức tạp, hãy xem qua về **presenter** để điều khiển những thay đổi phía UI. Nó sẽ khiến việc test UI trở nên dễ dàng hơn.

- Tránh khai báo **View** hay **Activity** context trong **ViewModel**. Nếu **ViewModel** nằm ngoài activity, activity sẽ bị leak .