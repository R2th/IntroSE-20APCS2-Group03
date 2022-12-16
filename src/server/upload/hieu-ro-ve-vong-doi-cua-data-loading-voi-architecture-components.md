Trong bài post [này](https://medium.com/google-developers/making-loading-data-on-android-lifecycle-aware-897e12760832), chúng ta đã nói về việc làm thế nào để bạn có thể sử dụng [Loaders](https://developer.android.com/guide/components/loaders.html) để load data bằng cách điều khiển tự động khi có sự thay đổi về cấu hình.

Với việc giới thiệu [Architecture Components](https://developer.android.com/topic/libraries/architecture/index.html), có một sự thay thế đó là cung cấp giải pháp mới, linh động, và có thể kiểm chứng.

## Chia nhỏ các vấn đề 

Hai lợi ích lớn nhất của Loaders đó là:
- Đóng gói quá trình load data
- Chúng được giữ lại khi có sự thay đổi về cấu, ngăn chặn việc tài lại những dữ liệu không cần thiết.

Với **Architecture Components**, hai điểm lợi này được điều khiển bởi hai class riêng việt
- `LiveData` cung cấp một lớp cơ sở nhận biết vòng đời, đóng gói việc tải dữ liệu.
- `ViewModels` tự động được giữ lại khi có sự thay đổi về cấu hình

Một lợi thế hữu dụng của việc phân chia các thành phần này là bạn có thể sử dụng lại cùng một `LiveData` trong nhiều `ViewModels`. Sử dụng cùng lúc nhiều nguồn `LiveData` thông qua một `MediatorLiveData`, hoặc sử dụng chúng trong một `Service`, tránh việc mất công cố gắng để xử lý `Loader` trong một kịch bản, nơi mà bạn không sử dụng một `LoaderManager`.

Trong khi `Loaders` hỗ trợ cho việc tách biệt giữa UI của bạn và việc tải dữ liệu (bước đầu tiên để có thể tạo ra một ứng dụng có khả năng test được), model này mở rộng hơn nữa khả năng này, `ViewModel` của bạn hoàn toàn có thể test được bằng cách sử dụng mocking với dữ liệu nguồn của bạn và `LiveData` có thể được kiểm thử một cách hoàn toàn độc lập.

## Luôn làm vấn đề đơn giản

Về lý thuyết, tất cả những điều trên là rất tốt. Một ví dụ minh họa sau sẽ sử dụng [AsyncTaskLoader](https://medium.com/google-developers/making-loading-data-on-android-lifecycle-aware-897e12760832#5aa5) để giúp tạo ý tưởng có nền tảng vững chắc hơn.

```java
public class JsonViewModel extends AndroidViewModel {
  // You probably have something more complicated
  // than just a String. Roll with me
  private final MutableLiveData<List<String>> data =
      new MutableLiveData<List<String>>();
  public JsonViewModel(Application application) {
    super(application);
    loadData();
  }
  public LiveData<List<String>> getData() {
    return data;
  }
  private void loadData() {
    new AsyncTask<Void,Void,List<String>>() {
      @Override
      protected List<String> doInBackground(Void... voids) {
        File jsonFile = new File(getApplication().getFilesDir(),
            "downloaded.json");
        List<String> data = new ArrayList<>();
        // Parse the JSON using the library of your choice
        return data;
      }
      @Override
      protected void onPostExecute(List<String> data) {
        this.data.setValue(data);
      }
    }.execute();
  }
}
```

Khoan đã, một `AsyncTask`? Như thế có ổn không? Có hai tính chất ổn khi chạy chương trình dưới đây:

- [AndroidViewModel](https://developer.android.com/reference/android/arch/lifecycle/AndroidViewModel.html)(một lớp con của `ViewModel`) chỉ có một tham chiếu đến ứng dụng đó là sử dụng `Context`, và điều quan trọng chúng ta muốn là không tham chiếu đến `Context` của `Activity`, vân vân..., vì điều đó có thể tạo ra mội lỗi về leak. Có cả một sự kiện của Lint để chỉ check về vấn đề này.
- `LiveData` chỉ cung cấp kết quả nếu như ở đâu đó có đối tượng lắng nghe nó.

Nhưng chúng ta không nắm bắt được cốt lõi vấn đề của Architecture Components: `ViewModel` của chúng ta sẽ trực tiếp quản lý `LiveData`.

```Java
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

Như vậy, `ViewModel` của chúng tôi trở nên đơn giản hơn đáng kể như cách mà chúng ta đã mong muốn. `LiveData` của chúng tôi hiện hoàn toàn đóng gói quá trình tải dữ liệu, chỉ tải dữ liệu một lần.

## Sự thay đổi dữ liệu trong LiveData

Tương tư như cách mà [Loader tác động đến sự thay đổi ở nhiều nơi khác nhau](https://medium.com/google-developers/making-loading-data-on-android-lifecycle-aware-897e12760832#1e8c), chức năng tương tự chính là chìa khóa khi làm việc với `LiveData` tương tự như cái tên mà nó đã thể hiện, dữ liệu kỳ vọng sẽ được thay đổi. Chúng ta có thể làm hoạt động lại một cách đơn giản các class để tiếp tục tới load data trong khi có ít nhất 1 đối tượng đang lắng nghe.

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

Bây giờ, nó quan tâm đến việc lắng nghe sự thay đổi. Chúng ta có thể sử dụng các phương thức của LiveData là `onActive()` và `onInactive()` chỉ để lắng nghe khi có có sự thay đổi trên dữ liệu của bạn, chỉ cần có đối tượng lắng nghe thì chúng luôn đảm bảo sẽ có được dữ liệu mới nhất.

## Lắng nghe dữ liệu

Trong việc sử dụng `Loader`, để lấy dữ liệu của bạn và hiển thị lên UI bạn cần phải tham gia vào một `LoaderManager`, và gọi `initLoader()` ở đúng nơi, và xây dựng một `LoaderCallbacks`. Điều này được làm đơn giản hơn với Architecture Components.

Có hai việc mà chúng ta cần phải làm:
- Nhận dữ liệu từ ViewModel của chúng ta
- Bắt đầu lắng nghe LiveData

Có thể giải thích hai việc đó bằng đoạn code dưới đây

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

Bạn cần lưu ý rằng bạn không cần phải clear mọi thứ sau khi : `ViewModels` tự động cập nhật dữ liệu khi cần thiết. và `LiveData` sẽ tự động chuyển dữ liệu của bạn khi nó được gọi., khi `Activity`/`Fragment`/`LifecycleOwner` được started hoặc resumed

## Tải mọi thứ

Bây giờ, nếu như bạn vẫn kịch liệt phản đối việc sử dụng `AsyncTask`, thì bạn sẽ thấy ổn hơn rất nhiều với `LiveData`, nó linh hoạt hơn rất nhiều

Để ví dụ, [Room](https://developer.android.com/topic/libraries/architecture/room.html) để bạn có thể [observerable queries](https://developer.android.com/topic/libraries/architecture/room.html#daos-query-observable), các truy vấn cơ sở dữ liệu có thể trả về một LiveData thế nên  khi cơ sở dữ liệu thay đổi nó sẽ tự động được truyền tới ViewModel và truyền tới UI của bạn. Nó tượng tự như sử dụng `CursorLoader` mà không cân phải động chạm tới `Cursors` hoặc `Loaders`.

Chúng ta có thể viết lại ví dụ [FusedLocationApi](https://medium.com/google-developers/making-loading-data-on-android-lifecycle-aware-897e12760832#85b1)với một LiveData:

```Java
public class LocationLiveData extends LiveData<Location> implements
    GoogleApiClient.ConnectionCallbacks,
    GoogleApiClient.OnConnectionFailedListener,
    LocationListener {

  private GoogleApiClient googleApiClient;
  public LocationLiveData(Context context) {
    googleApiClient =
      new GoogleApiClient.Builder(context, this, this)
      .addApi(LocationServices.API)
      .build();
  }

  @Override
  protected void onActive() {
    // Wait for the GoogleApiClient to be connected
    googleApiClient.connect();
  }

  @Override
  protected void onInactive() {
    if (googleApiClient.isConnected()) {
      LocationServices.FusedLocationApi.removeLocationUpdates(
          googleApiClient, this);
    }
    googleApiClient.disconnect();
  }

  @Override
  public void onConnected(Bundle connectionHint) {
    // Try to immediately find a location
    Location lastLocation = LocationServices.FusedLocationApi
        .getLastLocation(googleApiClient);
    if (lastLocation != null) {
      setValue(lastLocation);
    }
    // Request updates if there’s someone observing
    if (hasActiveObservers()) {
      LocationServices.FusedLocationApi.requestLocationUpdates(
          googleApiClient, new LocationRequest(), this);
    }
  }

  @Override
  public void onLocationChanged(Location location) {
    // Deliver the location changes
    setValue(location);
  }

  @Override
  public void onConnectionSuspended(int cause) {
    // Cry softly, hope it comes back on its own
  }

  @Override
  public void onConnectionFailed(
      @NonNull ConnectionResult connectionResult) {
    // Consider exposing this state as described here:
    // https://d.android.com/topic/libraries/architecture/guide.html#addendum
  }
}
```

## Đó mới chỉ là một phần của Architecture Components

Còn rất nhiều điều mới trong Android Architecture Components, hãy đọc tất cả về chúng trong [tài liệu này](https://developer.android.com/topic/libraries/architecture/index.html)

Ca nhân tôi khuyên các bạn nên đọc thêm về [Guide to App Architecture](https://developer.android.com/topic/libraries/architecture/guide.html) để cung cấp cho bạn ý tưởng làm thế nào để tất các các thành phần hoạt động cùng nhau để tạo thành một kiến trúc vững chắc cho ứng dụng của bạn.

Nguồn tham khảo: [Lifecycle Aware Data Loading with Architecture Components](https://medium.com/androiddevelopers/lifecycle-aware-data-loading-with-android-architecture-components-f95484159de4)