# Retrofit là gì?
Được phát triển bởi **Square**

**Retrofit** là một **HTTP client type-safe** cho Android và Java. Retrofit giúp dễ dàng kết nối đến một dịch vụ REST trên web bằng cách chyển đổi API thành Java Interface.

**Retrofit** rất mạnh mẽ giúp bạn dễ dàng xử lý dữ liệu JSON hoặc XML sau đó phân tích cú pháp thành Plain Old Java Objects (POJOs). Tất cả các yêu cầu GET, POST, PUT, PATCH, và DELETE đều có thể được thực thi.

Giống như hầu hết các phần mềm mã nguồn mở khác, Retrofit được xây dựng dựa trên một số thư viện mạnh mẽ và công cụ khác. Đằng sau nó, Retrofit làm cho việc sử dụng OkHttp (từ cùng một nhà phát triển) để xử lý các yêu cầu trên mạng. Ngoài ra, Retrofit không tích hợp bất kỳ một bộ chuyển đổi JSON nào để phân tích từ JSON thành các đối tượng Java. Thay vào đó nó đi kèm với các thư viện chuyển đổi JSON sau đây để xử lý điều đó
# Cách dùng Retrofit
Để làm việc với Retrofit bạn cần triển khai cơ bản 3 lớp:
* Model class để ánh xạ với JSON data.
* Một interface dùng để định nghĩa các hàm và phương thức HTTP
* Retrofit.Builder Lớp để định nghĩa URL Endpoint cho các hoạt động liên quan tới HTTP

## APIDeclaration
Annotations trong interface và các tham số của chúng chỉ ra cách mà request được thực hiện

### Request Method
Mỗi method phải có một HTTP annotation. Có 5 annotations **GET**, **POST**, **PUT**, **DELETE**, and **HEAD**
Bên trong mỗi annotation là một đoạn của URL.
```java
@GET("users/list")
```

Bạn cũng có thể chỉ định tham số truy vấn trong URL

```java
@GET("users/list?sort=desc")
```

### URL MANIPULATION

Dưới đây là ví dụ của interface dùng để định nghĩa các http request
```java
public interface GitHubService {
  @GET("users/{user}/repos")
  Call<List<Repo>> listRepos(@Path("user") String user);
}
```

Khối **{user]** trong đoạn trên được thay thế bới tham số user trong hàm listRepos. Bằng việc sử dụng anotation **@Path** và truyền vào cùng chuỗi string trong khối {}

Tham số query cũng có thể add thêm được như sau:
```java
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @Query("sort") String sort);
```

Nếu mà tham số query phức tạp có thể sự dụng Map:
```java
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @QueryMap Map<String, String> options);
```

### Request Body
Một đối tượng có thể được chỉ định cho mục đích sử dụng làm phần body cho truy vấn với @Body annotation
```java
@POST("users/new")
Call<User> createUser(@Body User user);
```

Đối tượng cũng sẽ được chuyển đổi bằng cách sử dụng trình chuyển đổi được chỉ định trong Retrofit instance. Nếu không có trình chuyển đổi nào được thêm vào, chỉ có thể sử dụng **RequestBody**.

### Form Encoded and multipart
Các phương thức cũng có thể được khai báo để gửi dữ liệu được mã hóa theo mẫu và nhiều phần. 
Dữ liệu được mã hóa biểu mẫu được gửi khi có annotation @FormUrlEncoding . Mỗi cặp key-value được chú thích bằng @Field chứa tên và đối tượng cung cấp giá trị.
```java
@FormUrlEncoded
@POST("user/edit")
Call<User> updateUser(@Field("first_name") String first, @Field("last_name") String last);
```
Yêu cầu nhiều phần được sử dụng với @Multipart .Mỗi phần được khai báo bằng cách sử dụng chú thích @Part.
```java
@Multipart
@PUT("user/photo")
Call<User> updateUser(@Part("photo") RequestBody photo, @Part("description") RequestBody description);
```

### Header manipulation
Bạn có thể Header tĩnh cho phương thức sử dụng @Headers annotation.
```java
@Headers("Cache-Control: max-age=640000")
@GET("widget/list")
Call<List<Widget>> widgetList();
```
```java
@Headers({
    "Accept: application/vnd.github.v3.full+json",
    "User-Agent: Retrofit-Sample-App"
})
@GET("users/{username}")
Call<User> getUser(@Path("username") String username);
```

Lưu ý rằng các headers không ghi đè lên nhau. Tất cả các tiêu đề có cùng tên sẽ được bao gồm trong yêu cầu. Một tiêu đề yêu cầu có thể được cập nhật động bằng cách sử dụng chú thích @Header. Một tham số tương ứng phải được cung cấp cho @Header. Nếu giá trị là null, header sẽ bị bỏ qua. Nếu không, toString sẽ được gọi trên giá trị và kết quả được sử dụng.
```java
@GET("user")
Call<User> getUser(@Header("Authorization") String authorization)
```
Tương tự như các tham số truy vấn, đối với hearder phức tạp, có thể sự dụng **Map**

```java
@GET("user")
Call<User> getUser(@HeaderMap Map<String, String> headers)
```

Header cần thêm vào mỗi request tuy nhiên có thể sử dụng [OkHttp Interceptor](https://github.com/square/okhttp/wiki/Interceptors) để thay thế

### Converters
Theo mặc định, Retrofit chỉ có thể giải tuần tự hóa (**deserialize**) các HTTPbodies thành **ResponseBody** của OkHttp và nó chỉ có thể chấp nhận loại **RequestBody** của nó cho @Body. 
Bộ chuyển đổi có thể được thêm vào để hỗ trợ các loại khác. 
Dưới đây là 6 thư viện phổ biến sử dụng.
* Gson: com.squareup.retrofit:converter-gson
* Jackson: com.squareup.retrofit:converter-jackson
* Moshi: com.squareup.retrofit:converter-moshi
* Protobuf: com.squareup.retrofit2:converter-protobuf
* Wire: com.squareup.retrofit2:converter-wire
Và đối với XML, Retrofit hỗ trợ:
* Simple Framework: com.squareup.retrofit2:converter-simpleframework

# Caching là gì?
**Caching** là cách lưu trữ tạm thời dữ liệu được tìm nạp từ mạng trên bộ lưu trữ của thiết bị, để chúng ta có thể truy cập vào lần sau khi thiết bị ngoại tuyến hoặc nếu chúng ta muốn truy cập lại cùng một dữ liệu.

Nhưng trước đó, **tại sao** phải dùng caching trong ứng dụng của mình?

![](https://images.viblo.asia/18caa177-5483-47cd-a3f3-b64491377741.png)

# Lợi ích của việc Caching
* Giảm tiêu thụ băng thông.
* Tiết kiệm cho bạn thời gian bạn dành thời gian chờ đợi máy chủ cung cấp cho bạn phản hồi mạng.
* Tiết kiệm cho máy chủ gánh nặng của lưu lượng bổ sung.
* Nếu bạn cần truy cập lại cùng một tài nguyên mạng sau khi đã truy cập gần đây, thiết bị của bạn đã giành được Yêu cầu phải gửi yêu cầu đến máy chủ; Thay vào đó, nó sẽ nhận được phản hồi lưu trữ.
Vì vậy, chuyển sang phần thực hành nào :D

# Tạo instance Retrofit 
Khi sử dụng Retrofit, cùng vs GSON, thì Retrofit instance sẽ có dạng thế này:
```java
    public static Retrofit getInstance(Context context) {
        if (sRetrofit == null) {
            sRetrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return sRetrofit;
    }
```

Với instance ở trên có nghĩa là ta đã dùng **OkHttpClient** mặc định để thực thi requests. Điều đó không được **"thân thiện"** với bộ nhớ cho lắm :D.
Chúng ta sẽ tạo ra instance của OkHttpClient để cache dữ liệu & xử lí dữ việc lấy dữ liệu một cách thuận tiện khi:
* Thiết bị đang **offline**.
* Thiết bị cần **truy cập cùng một dữ liệu** từ internet trong một khoảng thời gian ngắn.
# Tạo OkHttpClient
## Tạo phương thức kiểm tra kết nối internet
Trước hết cần tạo một phương thức để kiểm tra kết nối internet trên thiết bị:
```java
public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
```
## Định nghĩa một số tham số có sử dụng
Dưới đây là một số tham số có sử dụng trong quá trình tạo **OkHttpClient**.
Ta chủ yếu quan tâm đến **CACHE_SIZE**, **TIME_CACHE_ONLINE**, **TIME_CACHE_OFFLINE**:
* **CACHE_SIZE**: chỉ ra lượng cache sẽ lưu là 10MB. Chú ý rằng CACHE_SIZE phải là kiểu long.
* **TIME_CACHE_ONLINE**: nếu có internet sẽ lấy cache lưu 1 phút trước, nếu quá 1 phút sẽ không lấy, 'max-age' là thuộc tính phụ trách việc này. 
* **TIME_CACHE_OFFLINE**: nếu không có internet sẽ lấy cache lưu 1 ngày trước đây, nếu quá thì không lấy, "max-stale" là thuộc tính phụ trách việc này, 'only-if-cached' là để không request mà chỉ lấy cache.
```java
    private static final long CACHE_SIZE = 10 * 1024 * 1024;
    private static final int READ_TIMEOUT = 5000;
    private static final int WRITE_TIMEOUT = 5000;
    private static final int CONNECT_TIMEOUT = 5000;
    private static String CACHE_CONTROL = "Cache-Control";
    private static final String TIME_CACHE_ONLINE = "public, max-age = 60";// 1 minute
    private static final String TIME_CACHE_OFFLINE = "public, only-if-cached, max-stale = 86400";//1 day
```

Nếu các bạn muốn đọc thêm về max-age, max-stale và only-if-cached thì bấm vào [đây](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

## Tạo OkHttpClient
Tạo instance của OkHttpClient với các thông số đã khai báo bên trên

```java
private static OkHttpClient initClient(final Context context) {
        OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .readTimeout(READ_TIMEOUT, TimeUnit.MILLISECONDS)
                .writeTimeout(WRITE_TIMEOUT, TimeUnit.MILLISECONDS)
                .connectTimeout(CONNECT_TIMEOUT, TimeUnit.MILLISECONDS)
                .retryOnConnectionFailure(true)
                .cache(new Cache(context.getCacheDir(), CACHE_SIZE))
                .addInterceptor(chain -> {
                    Request request = chain.request();
                    if (isNetworkAvailable(context)) {
                        request = request
                                .newBuilder()
                                .header(CACHE_CONTROL, TIME_CACHE_ONLINE)
                                .build();
                    } else {
                        request = request
                                .newBuilder()
                                .header(CACHE_CONTROL, TIME_CACHE_OFFLINE)
                                .build();
                    }
                    HttpUrl httpUrl = request.url()
                            .newBuilder()
                            .addQueryParameter(QUERRY_PARAMETER_API_KEY, API_KEY)
                            .build();
                    Request.Builder requestBuilder = request
                            .newBuilder()
                            .url(httpUrl);
                    return chain.proceed(requestBuilder.build());
                });
        return builder.build();
    }
```

## Thêm instance OkHttpClient vừa tạo vào Retrofit
Thêm 1 dòng vào phương thức getInstance của Retrofit để thêm **OkHttpClient**
```java
 public static Retrofit getInstance(Context context) {
        if (sRetrofit == null) {
            sRetrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    //Add OkHttpClient
                    .client(initClient(context))
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return sRetrofit;
    }
```

# Tổng kết
Tóm cái váy lại bài viết mình đã trình bày cho các bạn thấy được Retrofit là gì và các sử dụng như thế nào. Bên cạnh đó là việc caching vs Retrofit ra làm sao.
Nếu API mà bạn đang sử dụng cho ứng dụng của mình có giới hạn về số lượng request bạn có thể thực hiện, thì không chỉ lưu vào bộ đệm với Retrofit một chiến lược hữu ích để áp dụng mà còn là thứ cần thiết để bạn làm việc với API . Vì vậy, mình hy vọng bài viết có thể giúp bạn tận dụng lợi thế của bộ nhớ đệm với Retrofit và làm cho ứng dụng của bạn **awesome** hơn :D

Tư liệu sử dụng:

https://medium.com/mindorks/caching-with-retrofit-store-responses-offline-71439ed32fda

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

https://square.github.io/okhttp/

https://square.github.io/retrofit/