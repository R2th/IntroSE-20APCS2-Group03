## Retrofit là gì?
Theo như tài liệu gốc:

`A type-safe REST client for Android and Java.`

Trong Retrofit bạn sẽ sử dụng chú  thích để biểu diễn cho HTTP request. Việc nối ghép các đối số truy vấn cho 1 request được tích hợp. Thêm vào đó Retrofit cung cấp các phương thức hỗ trợ cho việc thêm header, nhiều yêu cầu truy vấn, upload file, downloads, ... <br>
Trong bài viết này mình sẽ chia sẻ cách làm việc với Retrofit cơ bản nhất.
## 1. Các bước chuẩn bị để tạo 1 retrofit project
### Add Dependencies: Gradle or Maven
Thêm đoạn code sau để tích hợp retrofit và Gson vào project của bạn trong `build.gradle`.
Nếu bạn sử dụng Retrofit 1.9 bạn cần thêm okhttp dependency: 

```
compile 'com.squareup.retrofit:retrofit:1.9.0'
compile 'com.squareup.okhttp:okhttp:2.7.2'
```

do đến retrofit 2. thì Okhttp mới được tích hợp vào retrofit. Còn với 2.0 trở lên thì bạn không cần.
```
dependencies {  
    // Retrofit & OkHttp
    implementation 'com.squareup.retrofit2:retrofit:2.3.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.3.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:3.4.1'
}
```

### Network Permission
Retrofit sẽ làm việc với HTTP request dựa và API trên 1 server nào đó nên  bạn cần add permission Internet cho Project trong file `AndroidManifest.xml`: 

`<uses-permission android:name="android.permission.INTERNET" /> `

Bây giờ chúng ta đã hoàn thành các bước setup! Cùng bắt tay vào coding!
### Mô tả API Endpoint
Api endpoint là API của server mà bạn cần sử dụng để yêu cầu dữ liệu từ server.
Trược khi bắt đầu với request đầu tiên bạn cầu lưu ý một vài điểm để tạo ra 1 request đúng.
Chúng ta có 1 ví dụ ở đây để sử dụng:

```
public interface GitHubClient {  
    @GET("/users/{user}/repos")
    Call<List<GitHubRepo>> reposForUser(
        @Path("user") String user
    );
}
```

1. Phương thức yêu cầu:
* Đầu tiên chúng ta cần xác định loại HTTP request mà chúng ta cần dùng: GET, POST, PUT, DELETE... Với mỗi loại yêu cầu đó Retrofit đều cung cấp cho chúng ta cách chú thích tương ứng: @GET, @POST, @PUT, @DELETE, @PATCH or @HEAD. Đây là điều bạn luôn luôn phải thực hiện.
* Đi kèm với các phương thức chúng ta cần chỉ ra đường link truy vấn server. Trong hầu hết các trường hợp chúng ta không dẫn cả link url như thế này: `http://futurestud.io/api/user/info` mà chỉ tách riêng đường link chung ra để tiện cho việc maintain và mở rộng sau này. 
* Tên function & Loại dữ liệu trả về cho các phương thức truy vấn của Retrofit:
Chúng ta có ví dụ sau: 
`Call<UserInfo> getUserInfo();`
Trong phương thức trên chúng ta sẽ cùng phân tích 3 thành phần:
 
**a. Tên phương thức:**<br>
    Đây là tành phần tùy ý, bạn có thể đặt tên sao cho phù hợp với mục đích của function.<br>
**b. Loại dữ liệu trả về**<br>
    Trong phần này bạn phải chỉ ra loại dữ liệu mà server sẽ trả về trong request của bạn.
    Trong ví dụ trên server sẽ trả về cho bạn 1 đối tượng UserInfo. Ở đây Call là 1 interface cho phép gửi dữ liệu và nhận data trả về đồng bộ.<br>
**c. Các đối số của phương thức:**<br>
Retrofit có rất nhiều các loại đối số cho bạn lựa chọn nhưng ở đây minh chỉ giới thiệu các loại hay được sử dụng:<br>
@Body: gửi đối tượng java vào phần thân của request như trong ví dụ bên dưới:
```
public interface TaskService {  
    @POST("/tasks")
    Call<Task> createTask(@Body Task task);
}
```
@Url: sử dụng dynamic Url: <br>
Chúng ta thường sử dụng loại này khi không biết dõ trước url mà chúng ta sẽ sử dụng, nó thay đổi tùy vào quá trình running time: <br>
Chúng ta chỉ cần truyền url yêu cầu vào và để @GET trống như trong ví dụ: 
   ```
 public interface UserService {  
        @GET
        public Call<ResponseBody> profilePicture(@Url String url);
    }
```

Bạn có thể tham khảo thêm thông tin chi tiết tại [đây](https://futurestud.io/tutorials/retrofit-2-how-to-use-dynamic-urls-for-requests): 

@Field: gửi dữ liệu dùng form-urlencode:
<br>
Chúng ta sẽ cùng quan sát ví dụ:
```
public interface TaskService {  
    @FormUrlEncoded
    @POST("tasks")
    Call<Task> createTask(@Field("title") String title);
}
```
Ở đây chúng ta sử dụng chú thích @FormUrlEncoded. Bạn cần lưu ý @FormUrlEncoded không 
thể sư dụng cho GET request. Yêu cầu form encoded chỉ sử dụng khi chúng ta muốn gửi dữ liệu lên server. Bên cạnh đó bạn cần sử dụng chú thích @Field cho đối số truyền vào cái mà sẽ được chuyển nên server. Thay thế "title" trong @Field để phù hợp với tên của đối số.<br> 
@Path: 

```
public interface GitHubClient {  
    @GET("/users/{user}/repos")
    Call<List<GitHubRepo>> reposForUser(
        @Path("user") String user
    );
}
```
e. Chú thích Query trong đối số:
Khi 1 đối số được sử dụng @Query thì giá trị của đối số đó sẽ được append vào đuôi của request. Trong ví dụ dưới đây chúng ta sẽ được request:
.../tutorials?page=x 
với x là giá trị của page

```
public interface FutureStudioClient {  
    @GET("/tutorials")
    Call<List<Tutorial>> getTutorials(
        @Query("page") Integer page
    );

    @GET("/tutorials")
    Call<List<Tutorial>> getTutorials(
            @Query("page") Integer page,
            @Query("order") String order,
            @Query("author") String author,
            @Query("published_at") Date date
    );
}
```  

# 2.  Tạo các phương thức cho truy vấn dữ liệu
Bên trên là cách chúng ta tạo ra các phương thức để tạo url request dữ liệu trên server.
Từ đó chúng ta sẽ tạo ra 1 interface định nghĩa các phương thức sẽ được sử dụng trong project. Tùy theo nhu cầu sử dụng mà chúng ta sẽ thêm các phương thức khác nhau ở đây mình trình bày 1 phương thức ví dụ.

```
public interface GitHubClientApi {  
    @GET("/users/{user}/repos")
    Call<List<GitHubRepo>> reposForUser(
        @Path("user") String user
    );
}
```

# 3. Cách tạo Retrofit client
Bước tiếp theo chúng ta sẽ tạo 1 retrofit client cơ bản. Ở đây chúng ta sử dụng **HttpLoggingInterceptor** để kiểm tra truy vấn mà Retrofit tạo dữa vào Mô tả API Endpoint mà chúng ta đã xem bên trên. Các câu lệnh truy vấn này sẽ được hiển thị trong mục debug của Logcat. OkHttpClient sẽ giúp chúng ta tạo request to server. Còn GsonConverterFactory sẽ chuyển đổi dữ liệu sang dạng object. Với BaseClient class bên dưới chúng ta có thể tạo Retrofit cho các baseUrl khác nhau bằng cách truyền vào trong hàm createService().
```
public class BaseClient {

    private static HttpLoggingInterceptor sLogging =
            new HttpLoggingInterceptor()
                    .setLevel(HttpLoggingInterceptor.Level.BODY);

    private static OkHttpClient.Builder sHttpClient =
            new OkHttpClient.Builder();

    static <S> S createService(Class<S> serviceClass, String baseUrl) {
        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        if (!sHttpClient.interceptors().contains(sLogging)) {
            sHttpClient.addInterceptor(sLogging);
            builder.client(sHttpClient.build());
            retrofit = builder.build();
        }
        return retrofit.create(serviceClass);
    }
```
Giờ chúng ta tạo GithubClient cụ thể để sử dụng: 
```
public class GithubClient extends BaseClient {

    private static final String BASE_URL = "https://api.github.com/";
    private static GitHubClientApi sGithubApi;

    public static GitHubClientApi getInstance() {
        if (sGithubApi == null) {
            return createService(GitHubClientApi.class, BASE_URL);
        }
        return sGithubApi;
    }
}
```

# 4. Cách sử dụng retrofit
Sau đây chúng ta sẽ dử dụng retrofit để lấy dữ liệu:
```
private GitHubClientApi githubClientApi = GithubClient.getInstance();

Call<List<GitHubRepo>> call =  
    githubClientApi.reposForUser("fs-opensource");

// Execute the call asynchronously. Get a positive or negative callback.
call.enqueue(new Callback<List<GitHubRepo>>() {  
    @Override
    public void onResponse(Call<List<GitHubRepo>> call, Response<List<GitHubRepo>> response) {
        // The network call was a success and we got a response
        Log.e("TAG", "success" + response.body().size());
    }

    @Override
    public void onFailure(Call<List<GitHubRepo>> call, Throwable t) {
        // the network call was a failure
        Log.e("TAG", "failure");
    }
});
```

# 5. Luồn thực hiện Request:
### Synchronous Requests
Với Retrofit 2, tất cả các request đều được bọc trong `Call` object. Đây là Interface được sử dụng cho cả quá trình request đồng bộ và không đồng bộ trong Retrofit 2.<br>
Qúa trình lấy dữ liệu là đồng bộ hay không phụ thuộc vào phương thức được gọi để thực thi request. <br>
Chú ý: với Android 4 trở nên khi thực hiện các request đồng bộ sẽ xảy ra lỗi `NetworkOnMainThreadException`. Để tránh lỗi này chúng ta cần thực hiện các request với Internet trên 1 luồng riêng.
```
TaskService taskService = ServiceGenerator.createService(TaskService.class);  
Call<List<Task>> call = taskService.getTasks();  
List<Task>> tasks = call.execute().body(); 
```

Trong ví dụ trên đây chúng ta sử dụng phương thức .execute()  trên object call nên request này sẽ được thực hiện một cách đồng bộ. Dữ liêu được trả về qua method .body() 

### Asynchronous Requests
Bên cạnh việc xử lý các request đồng bộ, Retrofit cũng support các phương thức load dữ liệu bất đồng bộ. Trong Retrofit phiên bản 1.9 các phương thức load dữ liệu trở về không return dữ liệu mà chúng ta cần sử dụng callback. Trong đó chúng ta sẽ định nghĩa 2 phương thực success() và failure() tương tứng với các phản hồi của request. Với Retrofit 2 chúng ta sẽ để như trên (bao bọc dữ liệu trả về trong Call object) nhưng chúng ta sẽ thực hiện request bằng phương thức `.enqueue()`. 

Retrofit 2:
```
TaskService taskService = ServiceGenerator.createService(TaskService.class);  
Call<List<Task>> call = taskService.getTasks();  
call.enqueue(new Callback<List<Task>>() {  
    @Override
    public void onResponse(Call<List<Task>> call, Response<List<Task>> response) {
        if (response.isSuccessful()) {
            // tasks available
        } else {
            // error response, no access to resource?
        }
    }

    @Override
    public void onFailure(Call<List<Task>> call, Throwable t) {
        // something went completely south (like no internet connection)
        Log.d("Error", t.getMessage());
    }
}
```

Retrofit 1.9:
```
TaskService taskService = ServiceGenerator.createService(TaskService.class);  
taskService.getTasks(new Callback<List<Task>>() {  
    @Override
    public void success(List<Task> tasks, Response response) {
        // here you do stuff with returned tasks
    }

    @Override
    public void failure(RetrofitError error) {
        // you should handle errors, too
    }
});
```

# 6. Cơ chể Cache:
Trong phần này chúng ta sẽ tìm hiểu về các khái niệm cơ bản về bộ nhớ đệm và cách bạn có thể bật tính năng này cho các yêu cầu Retrofit của ứng dụng Android.
Có 2 lý do chính làm cho 1 client (app hoặc browser) có thể bỏ qua việc truy vấn cùng 1 khối dữ liệu qua mạng:
* Đầu tiên do version cache được khai báo là còn tác dụng cho đến 1 thời điểm trong tương lai. Chúng ta sử dụng 2 biến: Expires và Cache-Control: max-age header. Khi ứng dụng Client kết lối tới resource mà vần chưa vượt qua Expires và max-age thì nó sẽ bỏ qua việc truy vấn trên mạng và lấy dữ liệu trong trong cache.
* Tùy chọn thứ hai được gọi là yêu cầu có điều kiện. Ở đây, tùy chọn đầu tiên không cần phải xác thực lại tài nguyên là không thể, nghĩa là tài nguyên đã vượt quá độ tuổi tối đa. Máy khách sẽ gửi cho máy chủ một yêu cầu với ngày tài nguyên được truy cập trước đó. Nếu tài nguyên không thay đổi kể từ lần truy cập cuối cùng của máy khách, máy chủ có thể phản hồi với trạng thái 304 - Not Modified. Phản hồi chỉ là mã trạng thái và thông tin tiêu đề. Do đó, phản hồi từ máy chủ sẽ nhỏ hơn nhiều so với yêu cầu mới mà không có bất kỳ tiêu đề bộ nhớ cache nào. Nếu phiên bản máy chủ hiện tại đã được cập nhật và bây giờ khác với phiên bản được lưu trong bộ nhớ cache, máy chủ phản hồi với mã 200  và tài nguyên.<br>
OkHttp, lớp mạng của Retrofit, mặc định hỗ trợ tất cả các cache header. Điều duy nhất bạn cần làm là cung cấp một bộ nhớ đệm (một nơi để lưu trữ các phản hồi).
Sau đây là ví dụ sử dụng cache trong retrofit.
```
int cacheSize = 10 * 1024 * 1024; // 10 MB  
Cache cache = new Cache(getCacheDir(), cacheSize);

OkHttpClient okHttpClient = new OkHttpClient.Builder()  
        .cache(cache)
        .build();

Retrofit.Builder builder = new Retrofit.Builder()  
        .baseUrl("http://10.0.2.2:3000/")
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create());

Retrofit retrofit = builder.build(); 
```
Ví dụ Retrofit ở trên sẽ lưu tất cả các dữ liệu trả về cho đến khi đạt đến mức tối đa 10 MB. Sau khi vượt quá giới hạn đĩa bộ nhớ cache, nó sẽ dọn sạch các mục cũ nhất. OkHttp sẽ tự động áp dụng logic Etag, Cache-Control, vv trên mọi yêu cầu cho bạn. Nếu tài nguyên vẫn giữ nguyên, nó sẽ không được tải lại.<br>
Link tham khảo: https://futurestud.io/tutorials/retrofit-getting-started-and-android-client<br>
Bài viết của mình đến đây là hết. Mọi ý kiến đóng góp xin hãy để ở phần comment bên dưới :)