# 1. Giới thiệu
Trong Android cung cấp cho lập trình viên thư viện [ Loaders](https://developer.android.com/guide/components/loaders) để thực hiện việc tải các dữ liệu cần thiết để hiển thị lên màn hình và tự động xử lý các dữ liệu không cần thiết khi thay đổi chuyển qua chuyển lại giữa các màn hình.

Nhưng từ `Google I/O 2017` thì google giới thiệu các lập trình viên [ Architecture Components](https://developer.android.com/topic/libraries/architecture/) 1 kiến trúc cung cấp giải pháp hiện đại, linh hoạt hơn cho quá trình tải dữ liệu và quản lý dữ liệu theo vòng đời của `Activity` hay `Fragment` tốt hơn.

Có 2 vấn đề lớn mà [ Loaders](https://developer.android.com/guide/components/loaders) gặp phải là:

- Chúng đóng gói quá trình tải dữ liệu và gần như bạn không thể can thiệp vào trong quá trình đó.
- Trong quá trình tải dữ liệu thì [ Loaders](https://developer.android.com/guide/components/loaders) mang theo cả các sự kiện khi thay đổi cấu hình, cũng như khó khăn trong việc `reloading data`

Với `Architecture Components` thì 2 khó khăn trên sẽ được tách riêng ra và xử lý bởi 2 lớp riêng biệt.

- [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) cung cấp các sự kiện để nhận biết vòng đời của `Activity` hay `Fragment` để bạn có thể quản lý quá trình tải và và đóng gói dữ liệu hay hủy quá trình tải khi dữ liệu không cần thiết nữa.
- [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) nơi lưu trữ dữ liệu khi bạn thay đổi các màn hình, để tái sử dụng dữ liệu khi cần thiết.

Lợi thế của sự tách biệt này là bạn có thể sử dụng nhiều `LiveData` trong 1 `ViewModel` để lấy dữ liệu từ nhiều nguồn khác nhau. Bạn có thể kết nối nhiều `LiveData` để chúng làm việc cùng nhau thông qua [MediatorLiveData](https://developer.android.com/reference/android/arch/lifecycle/MediatorLiveData), hoặc sử dụng chúng dưới `Service`.

Trong khi `Loaders` có thể tách rời giữa giao diện và quá trình tả dữ liệu thì kiến trúc mới là 1 lại nâng cao sự tách biệt đấy lên thêm 1 tầng nữa khi `ViewModel` có thể được khởi tạo hoàn toàn bằng cách `mocking` các nguồn dữ liệu khác nhau và `LiveData` có thể hoàn toàn độc lập giúp quá trình viết `Unitt Test` thuận tiện hơn.


# 2. Cấu trúc
Bây giờ mình sẽ viết 1 ví dụ đơn giản hơn để bạn dễ hiểu về `ViewModel` và `LiveData`

**ViewModel**
```java
public class JsonViewModel extends AndroidViewModel {
  private final JsonLiveData data;
  public JsonViewModel(Application application) {
    super(application);
    data = new JsonLiveData(application);
  }
  public LiveData<List<String>> getData() {
    return data;
  }
}
```

**LiveData**

```Java
public class JsonLiveData extends LiveData<List<String>> {
  private final Context context;
  public JsonLiveData(Context context) {
    this.context = context;
    loadData();
  }
  private void loadData() {
    new AsyncTask<Void,Void,List<String>>() {
      @Override
      protected List<String> doInBackground(Void… voids) {
        File jsonFile = new File(getApplication().getFilesDir(),
            "downloaded.json");
        List<String> data = new ArrayList<>();
        // Parse the JSON using the library of your choice
        return data;
      }
      @Override
      protected void onPostExecute(List<String> data) {
        setValue(data);
      }
    }.execute();
  }
}
```

Các bạn nhìn ở trên thì `AndroidViewModel` chỉ có một liên kết đến **application Context** như vậy thì `ViewModel` hoạt động độc lập với Activity hay Fragment vvv và nó tránh được nhiều lỗi khi người dùng chuyển từ màn hình này qua màn hình khác.

Còn `LiveData` được tách riêng biệt hoàn toàn và chỉ tải dữ liệu 1 lần.


# 3. Thay đổi dữ liệu trong LiveData

Đúng như cái tên `LiveData` khi dữ liệu mang trong nó thay đổi lập trình viên cũng có thể lắng nghe và thay đổi dữ liệu trả ra sao cho phù hợp nhất với dữ liệu đầu vào mới. Để làm được điều này thì lập trình viên cần gắn dữ liệu có thể thay đổi vào 1 `observer` để lắng nghe sự thay đổi đó.

```Java
public class JsonLiveData extends LiveData<List<String>> {
  private final Context context;
  private final FileObserver fileObserver;
  
  public JsonLiveData(Context context) {
    this.context = context;
    String path = new File(context.getFilesDir(),
        "downloaded.json").getPath();
    fileObserver = new FileObserver(path) {
      @Override
      public void onEvent(int event, String path) {
        // The file has changed, so let’s reload the data
        loadData();
      }
    };
    loadData();
  }
  @Override
  protected void onActive() {
    fileObserver.startWatching();
  }
  @Override
  protected void onInactive() {
    fileObserver.stopWatching();
  }
  private void loadData() {
    new AsyncTask<Void,Void,List<String>>() {
      @Override
      protected List<String> doInBackground(Void… voids) {
        File jsonFile = new File(getApplication().getFilesDir(),
            "downloaded.json");
        List<String> data = new ArrayList<>();
        // Parse the JSON using the library of your choice
        return data;
      }
      @Override
      protected void onPostExecute(List<String> data) {
        setValue(data);
      }
    }.execute();
  }
}
```

Nhờ 2 callback `onActive() and onInactive()` trong `LiveData` để giúp lập trình viên biết được là có hoạt động nào cần dữ liệu của `LiveData` hay không để đăng ký sự kiện lắng nghe sự thay đổi của dữ liệu.

```Java
  @Override
  protected void onActive() {
    fileObserver.startWatching();
  }
  @Override
  protected void onInactive() {
    fileObserver.stopWatching();
  }
```

Khi dữ liệu trong `LiveData` thì nó trả về 1 sự kiện để hoạt động nào sử dụng nó cũng có thể lắng nghe và cập nhật để có dữ liệu mới nhất.

```Java
public class MyActivity extends AppCompatActivity {
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    JsonViewModel model =
        ViewModelProviders.of(this).get(JsonViewModel.class);
    model.getData().observe(this, data -> {
      // update UI
    });
  }
}
```

Bạn nên lưu ý rằng không nên phải xóa hết dữ liệu trong `LiveData` khi một hoạt động (Activity/Fragment/LifecycleOwner) kết thúc, mà chỉ nên đăng ký lắng nghe sự thay đổi của dữ liệu `LiveData` trong `started or resumed`


# 4. Kết luận
Trên đây mình vừa giới thiệu cho các bạn về 2 class `ViewModel` và `LiveData` trong `Architecture Components`. Sử dụng và kết hợp tốt 2 class này với nhau để có thể kiểm soát quá trình tải, làm mới dữ liệu và quản lý lưu trữ dữ liệu được tốt hơn trên (Activity/Fragment/LifecycleOwner) giúp tránh được sự lãng phí bộ nhớ sử ứng dụng được khởi chạy.

Trong bài sau mình sẽ hướng dẫn các bạn kết hợp 2 class trên với cơ sở dữ liệu [Room](https://developer.android.com/topic/libraries/architecture/room) để lắng nghe sự thay đổi và cập nhật sự thay đổi lên UI.