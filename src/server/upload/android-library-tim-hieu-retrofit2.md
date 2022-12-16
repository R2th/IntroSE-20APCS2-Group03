![](https://images.viblo.asia/72c80ce5-0fd5-4edd-990e-2a69e73d0599.jpg)
## I. Mở đầu
Việc phát triển thư viện HTTP type-safe để giao tiếp với Rest API có thể thực sự là một điều khó khăn vì bạn phải xử lí rất nhiều các chức năng chẳng hạn như : tạo kết nối, lưu trữ cache, thử lại các yêu cầu thất bại, phân tích luồng phản hồi, xử lí lỗi và nhiều hơn nữa. Nhưng mặt khác Retrofit được sinh ra để giải quyết một cách dễ dàng những công việc này và từ đó sẽ giúp bạn tiết kiệm thời gian hơn rất nhiều  
[Retrofit](http://square.github.io/retrofit/) là một thư viện vô cùng hữu ích cho việc kết nối internet và nhận dữ liệu từ server một cách dễ dàng và viết code theo mô hình chuẩn RESTFul Webservices   
Trước khi tìm hiểu về Retrofit mình sẽ nói qua về Restful trước nhé 
## II. RESTFUL
### 1. Web và Web service
Trước khi trả lời câu hỏi RESTful là gì mình muốn bạn phân biệt giữa web và web service.  
Khi bạn gõ vào một URL vào trình duyệt và bạn nhận được một trang web. Đây là một nội dung mà thông thường bạn có thể đọc được, nó là nội dung dành cho người dùng ở đầu cuối.  
![](https://images.viblo.asia/4ef6d2ae-9aa1-4f0a-943e-d2991ccca352.PNG)  
Trong khi đó Web Service là một dịch vụ web, nó là một khái niệm rộng hơn so với khái niệm web thông thường, nó cung cấp các thông tin thô, và khó hiểu với đa số người dùng, chính vì vậy nó được sử dụng bởi các ứng dụng. Các ứng dụng này sẽ chế biến các dữ liệu thô trước khi trả về cho người dùng cuối cùng.  
![](https://images.viblo.asia/594dc7e3-adad-456d-a8d2-86bb7145a7aa.PNG)  
Ví dụ bạn vào một trang web ABC nào đó để xem thông tin về thời tiết và chứng khoán. Trang web đó sẽ hiển thị cho bạn các thông tin bạn muốn. 

Để có được các dữ liệu về thời tiết ứng dụng ABC cần phải lấy thông tin từ một nguồn nào đó, nó có thể là một dịch vụ web chuyên cung cấp các số liệu thời tiết ứng với các vùng miền khác nhau. 
Tương tự như vậy để có các số liệu về chứng khoán ứng dụng ABC cũng cần phải liên hệ với dịch vụ cung cấp các số liệu này. Các dữ liệu sẽ được chế biến trước khi trả về cho bạn là một trang web hoàn chỉnh.
Các Web Service thường cung cấp các dữ liệu thô mà nó khó hiểu đối với đa số người dùng thông thường, chúng thường được trả về dưới dạng XML hoặc JSON.
![](https://images.viblo.asia/5d9cdff3-48c1-41ab-9f63-fa594830ce5b.PNG)  
### 2. Resfull Service là gì ?
*RESTful Web Service* là các Web Service được viết dựa trên kiến trúc REST. REST đã được sử dụng rộng rãi thay thế cho các Web Service dựa trên SOAP và WSDL. RESTful Web Service nhẹ (lightweigh), dễ dàng mở rộng và bảo trì.  
REST định nghĩa các quy tắc kiến trúc để bạn thiết kế Web services, chú trọng vào tài nguyên hệ thống, bao gồm các trạng thái tài nguyên được định dạng như thế nào và được truyền tải qua HTTP, và được viết bởi nhiều ngôn ngữ khác nhau. Nếu tính theo số dịch vụ mạng sử dụng, REST đã nổi lên trong vài năm qua như là một mô hình thiết kế dịch vụ chiếm ưu thế. Trong thực tế, REST đã có những ảnh hưởng lớn và gần như thay thế SOAP và WSDL vì nó đơn giản và dễ sử dụng hơn rất nhiều.
REST là một bộ quy tắc để tạo ra một ứng dụng Web Service, mà nó tuân thủ 4 nguyên tắc thiết kế cơ bản sau:
Sử dụng các phương thức HTTP một cách rõ ràng
Phi trạng thái
Hiển thị cấu trúc thư mục như các URls
Truyền tải JavaScript Object Notation (JSON), XML hoặc cả hai.
> *Trong từ RESTful, thì từ ful chính là hậu tố (suffix) trong tiếng Anh, giống như từ help có nghĩa là giúp đỡ thì từ helpful là rất hữu ích.*

## III. Retrofit 
### 1. Retrofit là gì ?
Retrofit là một HTTP client type-safe cho Android, Java và kotlin được phát triển bởi Square. Retrofit giúp dễ dàng kết nối đến một dịch vụ REST trên web bằng cách chyển đổi API thành Java Interface. 
### 2. Các thư viện hỗ trợ 
Giống như hầu hết các phần mềm mã nguồn mở khác, Retrofit được xây dựng dựa trên một số thư viện mạnh mẽ và công cụ khác.  
Retrofit không tích hợp bất kỳ một bộ chuyển đổi JSON nào để phân tích từ JSON thành các đối tượng Java. Thay vào đó nó đi kèm với các thư viện chuyển đổi JSON để xử lý điều đó  
Một số thư viện hỗ trợ  
    •	 Gson: com.squareup.retrofit:converter-gson
    •	Jackson: com.squareup.retrofit:converter-jackson  
    •	Moshi: com.squareup.retrofit:converter-moshi  
    •	Protobuf: com.squareup.retrofit2:converter-protobuf  
    •	Wire: com.squareup.retrofit2:converter-wire  
Và đối với XML retrofit hỗ trợ  
•	Simple Framework:  com.squareup.retrofit2:converter-simpleframework
### 3. Using Retrofit 
  Để làm việc với Retrofit, bạn cần ba lớp cơ bản.
* Lớp thứ nhất : Lớp Model được sử dụng để ánh xạ dữ liệu JSON
* Lớp thứ hai : Interface xác định các hoạt động HTTP có thể
* Lớp thứ ba : Lớp Retrofit.Builder - Instance sử dụng interface và API Builder cho phép xác định URL Endpoint cho hoạt động HTTP.  
 Mỗi phương thức trong một interface đại diện cho một lời gọi call API. Nó phải có chú thích HTTP ( như GET, POST, v.v.) để chỉ định loại yêu cầu và URL cơ bản (base url). Giá trị trả về được gói trong đối tượng là Call object với loại kết quả mong đợi.  
    ```javascript
    @GET("users")
    Call<List<User>> getUsers()
    ```
- Bạn có thể sử dụng các khối thay thế và tham số truy vấn để điều chỉnh URL. Một khối thay thế được thêm vào url với cú pháp {}. Với sự trợ giúp của annotation @Path trên tham số phương thức, giá trị của tham số đó được ràng buộc với khối thay thế cụ thể.
    ```javascript
    @GET("users/{name}/commits")
    Call<List<Commit>> getCommitsByName(@Path("name") String name)
    ```
- Tham số truy vấn được thêm bằng chú thích @Query. Chúng được tự động thêm vào cuối URL.
    ```javascript
    @GET("users")
    Call<User> getUserById(@Query("id") Integer id)
    ```
- Chú thích @Body cho phép Retrofit sử dụng đối tượng làm cơ quan yêu cầu cho cuộc gọi.
    ```javascript
    @POST("users")
    Call<User> postUser(@Body User user)
    ```
### 4. Setup Retrofit
   Để sử dụng Retrofit các bạn thực hiện theo những bước sau
- Chắc chắn rằng trong AndroidManifest.xml của bạn đã được cấp quyền truy cập internet
    ```javascript
    <manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    </manifest>
    ```
- Tiếp thep bạn add các thư viện hỗ trợ retrofit trong file app/build.gradel. Các phụ thuộc bao gồm một thư viện Retrofit và một thư viện Gson của Google để chuyển đổi JSON sang POJO (Plain Old Java Objects) cũng như các thư viện Gson được tích hợp sẵn của Retrofit.
    ```javascript
    dependencies {
        implementation 'com.google.code.gson:gson:2.8.5'
        implementation 'com.squareup.retrofit2:retrofit:2.4.0'
        implementation 'com.squareup.retrofit2:converter-gson:2.4.0'  
    }
    ```
- Nếu bạn dự định sử dụng RxJava với Retrofit 2, thì thêm các file sau vào dependenies
     ```javascript
    dependencies {
       implementation 'io.reactivex:rxjava:1.1.6'
       implementation 'io.reactivex:rxandroid:1.2.1'
       implementation 'com.squareup.retrofit2:adapter-rxjava:2.1.0'
    }
    ```
###  5. Retrofit Converter và Adapter
*  **Retrofit converter**   
Nếu như trước đây Retrofit dựa vào thư viện GSON để phân tích JSON thành các đối tượng. Thì hiện tại Retrofit2 hỗ trợ nhiều trình phân tích cú pháp khác nhau để xử lí dữ liệu phản hồi mạng, bao gồm Moshi một thư việc xây dựng bởi Square. Tuy nhiên nó vẫn còn một vài hạn chế.
Và nếu bạn đang phân vân không chắc chắn nên chọn thư viện nào thì tham khảo các thư viện chuyển đối bên dưới đây nhé 

    | Converter | Library 
    | -------- | -------- | -------- |
    | Gson     | com.squareup.retrofit2:converter-gson:2.4.0
    | Jackson    | com.squareup.retrofit2:converter-jackson:2.4.0
    | Moshi     | com.squareup.retrofit2:converter-moshi:2.4.0
    | Protobuf     | com.squareup.retrofit2:converter-protobuf:2.4.0
    | Wire    | com.squareup.retrofit2:converter-wire:2.4.0
    |Simple XML    | com.squareup.retrofit2:converter-simplexml:2.4.0
* **Retrofit Adapter**  
Retrofit cũng có thể được mở rộng bởi các adapter để tham gia với các thư viện khác như RxJava 2.x, Java 8
RxJava 2.x Adapter có thể thu được bằng cách sử dụng Gradle:
    ```javascript
    implementation 'com.squareup.retrofit2:adapter-rxjava2:latest.version'
    ```
### 3. Khởi tạo một retrofit instance
- Để gởi các yêu cầu trên mạng đến một API REST với Retrofit, chúng ta cần tạo ra một đối tượng Retrofit bằng cách sử dụng lớp [Retrofit.Builder](http://square.github.io/retrofit/2.x/retrofit/retrofit2/Retrofit.Builder.html) và cấu hình nó với một URL cơ sở. 
    ```javascript
    public static final String BASE_URL = "http://api.myservice.com/";
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build();
    ```
- Hoặc nếu muốn truyền một đối tượng phân tích cú pháp GSON 
    ```javascript
    Gson gson = new GsonBuilder()
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ssZ")
        .create();
    Retrofit retrofit = new Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create(gson))
        .build();
    ```
### 4. Định nghĩa một số Endpoint quan trọng
- Với Retrofit 2, các Endpoint  được xác định bên trong một interface bằng việc sử dụng các annotations đặc biệt  
Ví dụ interface định nghĩa mỗi Endpoint theo cách sau
    ```javascript
    public interface MyApiEndpointInterface {
        // Request method and URL specified in the annotation


        @GET("users/{username}")
        Call<User> getUser(@Path("username") String username);

        @GET("group/{id}/users")
        Call<List<User>> groupList(@Path("id") int groupId, @Query("sort") String sort);

        @POST("users/new")
        Call<User> createUser(@Body User user);
    }
    ```
 

     Đối tượng này chứa các phương thức mà chúng ta sẽ sử dụng để thực thi các yêu cầu HTTP như GET, POST, PUT,  PATCH VÀ DELETE.   
    Trong ví dụ trên các bạn có thể thấy chúng ta sẽ thực thì một yêu cầu GET và POST. 
    Hia annotation này sẽ định nghĩa rõ ràng rằng yêu cầu GET và POST sẽ được thực thi khi phương thức được gọi.
- Mỗi một method trong interface phải có một chú thích HTTP cung cấp phương thức yêu cầu và một đường dẫn Base URL. Có 5 chú thích được tích hợp sẵn gồm @GET, @POST, @PUT, @DELETE và @HEAD.

    | Annotaion | Mô tả | 
    | -------- | -------- | -------- |
    | @GET     | Yêu cầu lấy data tự một nguồn tài nguyên xác định
    | @POST    | Gửi dữ liệu đã được xử lí đến một tài nguyên được chỉ định
    | @PUT     | Upload một đại diện của URI được chỉ định
    |@DELETE     | Xóa một nguồn tài nguyên được chỉ định
    |@HEAD    | Tương tự như GET nhưng chỉ trả về HTTP headers và không có thân tài liệu

* Các tham số của phương thức trong interface cso thể có các chú thích sau đây

    | Annotaion | Mô tả | 
    | -------- | -------- | -------- |
    | @Path     | Biến thay thế cho API endpoint
    | @Query    | Xác định tên khoá truy vấn với giá trị của tham số được chú thích
    | @Body     | Payload cho việc gọi POST
    |@Header     | Thiết lập header với giá trị của tham số được chú thích
## IV. Tổng kết 
Sử dụng Retrofit thực sự chuyên nghiệp khi bạn thực hiện các request một cách dễ dàng, việc theo chuẩn mô hình RESTFul cho các API Service khiến code rất clear và dễ maintain. Việc thực hiện các kết nối Http Retrofit sử dụng mặc định OkHttp một Lib cũng của Square và được triển khai trong các SDK rất nổi tiếng như: Facebook SDK, Fabric (Twitter) ....
## V. Tài liệu tham khảo
http://www.vogella.com/tutorials/Retrofit/article.html#prerequisitions  
https://guides.codepath.com/android/consuming-apis-with-retrofit#creating-the-retrofit-instance  
http://square.github.io/retrofit/2.x/retrofit/retrofit2/Retrofit.Builder.html