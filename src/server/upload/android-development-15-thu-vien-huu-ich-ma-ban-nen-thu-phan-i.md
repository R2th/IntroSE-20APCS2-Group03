Trong bài viết này, chúng ta sẽ tìm hiểu sơ lược về 15 thư viện có thể giúp chúng ta trong quá trình phát triển các ứng dụng Android hằng ngày. Với chúng, ta có thể tạo ra các ứng dụng hoạt động tốt hơn và cung cấp trải nghiệm người dùng tốt hơn.

## Các thư viện Android phổ biến
Thư viện là những yếu tố mang tính thay đổi lớn trong việc phát triển phần mềm bất kể nền tảng nào. Với các thư viện, chúng ta tận dụng những nỗ lực của các nhà phát triển khác để thực hiện các `action` hoặc `function`  nhanh hơn, hiệu quả hơn và với số lượng dòng code ít hơn. Trong bài viết này, chúng ta sẽ xem xét các danh mục khác nhau trong phát triển các ứng dụng Android và các thư viện phổ biến được sử dụng trong chúng.

## Android Libraries - Image Loading
`Image Loading` là các thư viện rất tiện dụng để tránh tiêu tốn nhiều bộ nhớ do load nhiều hình ảnh cùng một lúc hoặc tải những hình ảnh có kích thước lớn. Việc load nhiều ảnh cùng một lúc là nguyên nhân lớn nhất gây ra lỗi `Out of Memory` trong quá trình phát triển các ứng dụng Android. Do đó, các thư viện này giảm bớt sự phức tạp khi load và lưu vào bộ nhớ cache các hình ảnh, cùng với việc giảm thiểu việc sử dụng bộ nhớ để mang lại trải nghiệm người dùng liền mạch. Chúng ta hãy xem xét đến 2 trong số các thư viện load ảnh thường được sử dụng nhất là `Glide` và `Picasso`.

### Glide
`Glide` là một thư viện load  ảnh tập trung vào việc xử lý cuộn mượt mà. `Glide` đảm bảo việc load ảnh nhanh và mượt nhất có thể bằng cachs áp dụng tính năng `smart automatic down-sampling` và lưu vào bộ nhớ đệm để giảm thiểu thời gian lưu trữ và giải mã hình ảnh. Nó cũng sử dụng lại các tài nguyên như mảng byte và tự động giải phóng tài nguyên ứng dụng khi cần thiết.

#### Sử dụng Glide
Trước tiên, ta cần đảm bảo rằng đã có Maven và Google repositories trong file `build.gradle` của project.

```php
repositories {
  mavenCentral()
  google()
}
```

Sau đó, ta thêm dependency của thư viện và `build.gradle` của app và tiến hành sync để thư viện được sẵn sàng sử dụng:

```php
implementation 'com.github.bumptech.glide:glide:4.11.0'
annotationProcessor 'com.github.bumptech.glide:compiler:4.11.0'
```

Chúng ta có thể load ảnh từ URL với một dòng code đơn giản như dưới đây:
```php
Glide.with(this)
  .load("https://res.cloudinary.com/demo/video/upload/dog.png")
  .into(imageView);
```

Phương thức `with` có thể gắn với một đối tượng `Context`, `Activity`, `Fragment` hoặc `View`. Phương thức `load` có thể nhận vào 1 URL hoặc 1 drawable (ví dụ `R.drawable.image`). Instance `imageView` được truyền dưới dạng đối số cho phương thức `into` phải có type là `ImageView`

### Picasso

`Picasso` là một thư viện hình ảnh tuyệt vời khác dành cho Android. Nó được tạo ra và duy trì bởi Square, một công ty phụ thuộc và đóng góp rất nhiều vào thế giới open-source, phục vụ cho việc load và xử lý hình ảnh. Bằng cách sử dụng `Picasso`, quá trình hiển thị hình ảnh từ các vị trí bên ngoài được đơn giản hóa. `Picasso` hỗ trợ các phép chuyển đổi hình ảnh phức tạp, tự động lưu vào bộ nhớ đệm, tái sử dụng `ImageView` và hủy tải xuống trong `adapter`.

Thư viện xử lý mọi giai đoạn của quy trình. Nó bắt đầu bằng cách xử lý các yêu cầu HTTP và cũng xử lý bộ nhớ đệm của hình ảnh giống như `Glide`.

#### Sử dụng Picasso
Trước tiên, ta cần thêm `Picasso dependency` vào `build.gradle`
```php
implementation 'com.squareup.picasso:picasso:2.71828'
```

Sau đó, chúng ta sync tệp gradle của mình và load hình ảnh bằng 1 dòng code:
```php
Picasso
  .with(this)
  .load("https://res.cloudinary.com/demo/video/upload/dog.png")
  .into(imageView);
```

Như chúng ta có thể thấy, API do `Picasso` cung cấp rất giống với API do Glide cung cấp.

## Android Libraries - Videos

Hiển thị video là một nhiệm vụ khó khăn khác trong quá trình phát triển. Quá trình và chi tiết cần xử lý có thể có quá nhiều thứ để xử lý. Trong danh mục này, có một số tùy chọn có sẵn. Tuy nhiên, vì phần mềm phổ biến và mạnh mẽ nhất là `ExoPlayer`, chúng ta sẽ tập trung vào phần này.

### ExoPlayer

`ExoPlayer` là một thư viện trình phát đa phương tiện của Android do Google phát triển. Nó cung cấp một giải pháp thay thế cho `API MediaPlayer` của Android để phát âm thanh và video (cả local và qua internet) với một số ưu điểm bổ sung. `ExoPlayer` hỗ trợ các tính năng hiện không được `API MediaPlayer` của Android hỗ trợ, như `DASH` và `SmoothStreaming`. Một trong những lợi thế lớn nhất của `ExoPlayer` là dễ dàng tùy chỉnh.

#### Sử dụng ExoPlayer

Bước đầu tiên là đảm bảo rằng chúng ta có JCenter và Google repositories trong tệp cấu hình `build.gradle` của project:
```php
repositories {
    jcenter()
    google()
}
```

Thêm compile dependency vào chính tệp đó:

```php
implementation 'com.google.android.exoplayer:exoplayer:2.X.X'
```

Tiếp theo ta cần kích hoạt support cho Java 8:

```php
compileOptions {
  targetCompatibility JavaVersion.VERSION_1_8
}
```

Sau đó, trong file layout, ta thêm `SimpleExoPlayerView`:

```php
<com.google.android.exoplayer2.ui.SimpleExoPlayerView
   android:id="@+id/simple_exoplayer_view"
   android:layout_width="match_parent"
   android:layout_height="wrap_content"/>
```

Sau đó, trong class `Activity` tương ứng, chúng ta khai báo các đối tượng cần thiết của ExoPlayer:

```php
SimpleExoPlayerView simpleExoPlayerView;
SimpleExoPlayer player;
```

Ta khởi tạo đối tượng `simpleExoPlayerView` trong hàm `onCreate` của Activity:

```php
simpleExoPlayerView = findViewById(R.id.simple_exoplayer_view);
```

Và trong hàm `onStart`, ta gọi đến hàm `setupPlayer`:

```php
@Override
protected void onStart() {
    super.onStart();
    setupPlayer();
}

void setupPlayer(){
    BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
    TrackSelection.Factory videoTrackSelectionFactory =
            new AdaptiveTrackSelection.Factory(bandwidthMeter);
    TrackSelector trackSelector =
            new DefaultTrackSelector(videoTrackSelectionFactory);

    //initialize the player with default configurations
    player = ExoPlayerFactory.newSimpleInstance(this, trackSelector);

    //Assign simpleExoPlayerView
    simpleExoPlayerView.setPlayer(player);

    // Produces DataSource instances through which media data is loaded.
    DataSource.Factory dataSourceFactory =
            new DefaultDataSourceFactory(this, Util.getUserAgent(this, "CloudinaryExoplayer"));

    // Produces Extractor instances for parsing the media data.
    ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();

    // This is the MediaSource representing the media to be played.
    MediaSource videoSource = new ExtractorMediaSource(videoUri,
            dataSourceFactory, extractorsFactory, null, null);

    // Prepare the player with the source.
    player.prepare(videoSource);
}
```

Ở đây, chúng ta đã khởi tạo trình phát player với một số cấu hình mặc định và sau đó gán nó cho instance `SimpleExoPlayerView`. Nếu ta cần hiển thị video từ một URL, ta phải chuyển nó thành Uri để `ExoPlayer` có thể làm việc với nó:

```php
Uri videoUri = Uri.parse("any_remote_url");
```

## Android Libraries - Networking

Ngày nay, hầu như mọi ứng dụng di động đều cần một số loại giao tiếp mạng để thực hiện chức năng này hay chức năng khác. Trước đây, nếu chúng ta muốn thực hiện `network request`, chúng ta sẽ phải thực thi một lớp tác vụ `Async` và sử dụng `HttpsUrlConnection` để tìm nạp dữ liệu. Tuy nhiên, điều này không hiệu quả lắm, đặc biệt là khi chúng ta đang xử lý các API trả về dữ liệu lớn.

May mắn cho chúng ta, có các thư viện network tuyệt vời có sẵn để giúp ta tối ưu hóa quy trình này trong khi quản lý các luồng và tài nguyên của thiết bị đúng cách. Trong số các lựa chọn thay thế, có hai lựa chọn nổi bật: `Retrofit` và `Volley`. Vì `Retrofit` là phổ biến nhất giữa hai loại nên chúng ta hãy xem xét nó.

### Retrofit

`Retrofit` là một ứng dụng HTTP an toàn cho Android và Java được phát triển và duy trì bởi Square (cùng một công ty hỗ trợ `Picasso`). `Retrofit` là thư viện networking được sử dụng nhiều nhất trong quá trình phát triển Android. Trong `Retrofit`, chỉ với `annotations`, bạn có thể dễ dàng thêm `request body`, thao tác với `endpoints`, thao tác với `headers`, thêm `query parameters` và chọn các `request methods`. `Retrofit` cũng xử lý phân tích cú pháp thành POJOs rất tốt bằng cách sử dụng các bộ chuyển đổi.

#### Sử dụng Retrofit

Đầu tiên, ta cần thêm dependency vào file `build.gradle`:

```php
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
```

Thêm dependency cho các bộ chuyển đổi mà ta định sử dụng. Các bộ chuyển đổi xử lý việc ánh xạ các đối tượng Java với `response body`:

```php
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation 'com.squareup.retrofit2:converter-scalars:2.9.0'
```

Bộ chuyển đổi đầu tiên (`converter-gson`)  dưới dạng tên trạng thái, ánh xạ đến và đi từ định dạng JSON. Bộ chuyển đổi thứ hai (`converter-scalars`) được sử dụng khi ta muốn xử lý các kiểu dữ liệu nguyên thủy như `String`, ...

Sau đó, ta tạo `interface` để định danh cấu hình các `endpoints` sẽ được truy cập:

```php
public interface ApiService {
    @GET("/data")
    Call<ResponseClass> fetchData(@Body JsonObject jsonObject);
}
```

Sau khi xác định các `endpoints`, ta tạo một client `Retrofit`:

```php
public class RetrofitClient {
    static ApiService getService(){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl("http://127.0.0.1:5000/")
                .addConverterFactory(GsonConverterFactory.create());

        Retrofit retrofit = builder
                .client(httpClient.build())
                .build();

        return retrofit.create(ApiService.class);
    }
}
```

Khi xây dựng đối tượng `Retrofit` của mình, chúng ta có thể thêm bao nhiêu trình chuyển đổi tùy thích. Điều này cung cấp cho ta nhiều tùy chọn để phân tích dữ liệu của mình. Sau đó, ta có thể thực hiện các `network request` bằng cách gọi:

```php
RetrofitClient.getService().fetchData(jsonObject).enqueue(new Callback<ResponseClass>() {
    @Override
    public void onResponse(Call<ResponseClass> call, Response<ResponseClass> response) {

    }

    @Override
    public void onFailure(Call<ResponseClass> call, Throwable t) {

    }
});
```

Như ta có thể thấy, `Retrofit` cung cấp cho ta các phương thức `callback` để ta có thể lấy được các trạng thái (`status`) của `request`.

## Tổng kết

Phía trên tôi đã để xuất một số thư viện mà ta nên dùng khi thao tác với các dữ liệu đa phương tiện và dữ liệu mạng. Phần sau tôi sẽ giới thiệu một số thư viện khác để giúp chúng ta nắm bắt và xử lý các tác vụ một cách đơn giản hơn, giúp giảm thiểu số lượng dòng code trong mỗi dự án và dễ dàng để maintaint sau này. Cảm ơn các bạn đã theo dõi.

Happy coding!