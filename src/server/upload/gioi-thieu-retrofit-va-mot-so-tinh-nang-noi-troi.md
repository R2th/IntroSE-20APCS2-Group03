## 1. Giới Thiệu
Retrofit là HTTP client được phát triển bởi Square (Dagger, Okhttp) cho Android và Java.

Trong bài viết này, mình sẽ giải thích cách sử dụng Retrofit, tập trung vào một số tính năng thú vị của nó.

## 2. Thiết Lập
Thêm thư viện Retrofit và Gson Converter (xử lý chuyển đổi giữa Java Object và Json Object)
```
<dependency>
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>retrofit</artifactId>
    <version>${retrofit.version}</version>
</dependency>  
<dependency>  
    <groupId>com.squareup.retrofit2</groupId>
    <artifactId>converter-gson</artifactId>
    <version>${retrofit.version}</version>
</dependency>
```

## 3. Mô Hình Hóa API
Retrofit mô hình hóa REST endpoint giống như một Java Interface, làm cho chúng trở nên đơn giản hơn, dễ hiểu cũng như dễ sử dụng.
Mình sẽ mô hình hóa model User thông qua API [User API](https://api.github.com/users) trên GitHub.

Retrofit hoạt động bằng cách mô hình hóa thông qua một base URL và bằng cách tạo giao diện trả về các thực thể (*entity*) từ các REST endpoint.

Để cho đơn giản, mình sẽ lấy một phần nhỏ của JSON bằng cách mô hình hóa lớp User từ đó sẽ lấy các giá trị khi nhận được thông qua API được gọi:

```
public class User {
    private String login;
    private long id;
    private String url; 
    
    // getters and setters
}
```

Retrofit sẽ không sinh ra lỗi dù cho có thuộc tính bị thiếu - vì nó chỉ map đến những dữ liệu mình cần, đồng thời Retrofit vẫn hoạt động tốt ngay cả khi mình thêm một thuộc tính không có trong JSON.

Bây giờ mình có thể chuyển sang mô hình giao diện và giải thích một số notation được hỗ trợ sẵn trong Retrofit:

```
public interface UserService {
 
    @GET("/users")
    public Call<List<User>> getUsers(
      @Query("per_page") int per_page, 
      @Query("page") int page);
 
    @GET("/users/{username}")
    public Call<User> getUser(@Path("username") String username);
}
```

* @GET: khai báo phương thức HTTP được sử dụng (trong trường hợp này là GET method) cho resource nào. Ví dụ ở đây mình có một base URL là https://api.github.com thì Retrofit sẽ gửi request đến https://api.github.com/users.
* @Query: không bắt buộc, dùng để xử lý các tham số được truyền vào request.
* @Path: chỉ định đến tham số đường dẫn.

## 4. Đồng Bộ, Bất Đồng Bộ
Để có thể tạo và gửi một HTTP request thì trước hết mình cần phải có một Retrofit object.

```
OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
Retrofit retrofit = new Retrofit.Builder()
  .baseUrl("https://api.github.com/")
  .addConverterFactory(GsonConverterFactory.create())
  .client(httpClient.build())
  .build();
```

Thay vì mỗi lần request mình phải tạo mới một Retrofit.Builder object, thì mình có thể tạo 1 lớp cho phép tái sử dụng lại object này trong suốt vòng đời của ứng dụng

```
public class GitHubServiceGenerator {
 
    private static final String BASE_URL = "https://api.github.com/";
 
    private static Retrofit.Builder builder
      = new Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create());
 
    private static Retrofit retrofit = builder.build();
 
    private static OkHttpClient.Builder httpClient
      = new OkHttpClient.Builder();
 
    public static <S> S createService(Class<S> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
```

Và để gọi object này ra thì chỉ cần 

```
UserService service 
  = GitHubServiceGenerator.createService(UserService.class);
```

Sau khi đã có được Retrofit object, mình đã có thể tạo một request. Đầu tiên sẽ là một synchronous request:

```
UserService service = GitHubServiceGenerator.createService(UserService.class);
Call<User> callSync = service.getUser("Creat10n");
 
try {
    Response<User> response = callSync.execute();
    User user = response.body();
} catch (Exception ex) { 
    ...
}
```

Retrofit sẽ tự xử lý việc xây dựng giao diện dịch vụ của chúng ta bằng cách nhúng những thông tin cần thiết để gửi request, dựa trên các notation khai báo trước đó.

Object Call<User> được sử dụng để thực hiện gửi request lên GitHub API. Với việc gửi request đồng bộ sẽ chặn luồng hiện tại trong khi dữ liệu được truyền lên.

Sau khi việc gửi request lên thành công, mình có thể truy xuất nội dung của response thông qua đối tượng User nhờ vào GsonConverterFactory.

Kế đến là gửi request không đồng bộ:

```
UserService service = GitHubServiceGenerator.createService(UserService.class);
Call<User> callSync = service.getUser("Creat10n");
 
callAsync.enqueue(new Callback<User>() {
    @Override
    public void onResponse(Call<User> call, Response<User> response) {
        User user = response.body();
    }
 
    @Override
    public void onFailure(Call<User> call, Throwable throwable) {
        System.out.println(throwable);
    }
});
```

Thay vì thực thi phương thức trực tiếp, mình sử dụng phương thức enqueue - sẽ lấy giao diện Callback <User> làm tham số để xử lý trạng thái thành công hay thất bại của request. Lưu ý rằng điều này sẽ thực hiện trong một luồng riêng biệt.
    
Sau khi gọi request thành công, mình có thể lấy lại body của response giống như trước đó.

## 5. Xác Thực
Do hầu hết các API có thêm phần xác thực để đảm bảo tính truy cập được an toàn nên mình sẽ thêm một phương thức lấy JWT token với header là Authorization:
```
public static <S> S createService(Class<S> serviceClass, final String token ) {
   if ( token != null ) {
       httpClient.interceptors().clear();
       httpClient.addInterceptor( chain -> {
           Request original = chain.request();
           Request request = original.newBuilder()
             .header("Authorization", token)
             .build();
           return chain.proceed(request);
       });
       builder.client(httpClient.build());
       retrofit = builder.build();
   }
   return retrofit.create(serviceClass);
}
```
Để thêm header vào request, mình chỉ cần sử dụng OkHttp; sử dụng lại builder trước đó của hoặc tạo mới đối tượng Retrofit.

## 6. Tổng Kết
Như vậy là chúng ta đã có thể hiểu và sử dụng sơ lược Retrofit để request lên 1 API và nhận về response một cách đơn giản. Ở phần kế mình sẽ hướng dẫn tiếp việc sử dụng kết hợp RxJava vào Retrofit để tăng tính phức tạp trong các request API.