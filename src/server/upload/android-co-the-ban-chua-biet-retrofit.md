# **Mở đầu**

Trong quá trình phát triển ứng dụng android, có thể sẽ có lúc bạn cần xử lý những công việc liên quan đến  Network như là gửi Request đến Webservice, nhận Response và xử lý những dữ liệu trả về. Những công việc này thường phức tạp và khiến code của bạn trở nên rắc rối khó đọc, vì vậy một số thư viện ra đời giúp cho cuộc sống của bạn dễ dàng hơn. Hôm nay mình sẽ giới thiệu các bạn một trong những thư viện hiệu quả dễ dùng nhất - Retrofit2.

****
# REST API
Đối với một trang web thông thường việc tạo ra (creat), sửa (edit), cập nhật (update) và xóa (delete) taì nguyên (resource) là việc thường xuyên và phổ biến với hầu hết các trang Web nên người ta đã chế ra một một quy luật thống nhất để tất cả các  lập trình viên cứ thế mà làm theo mỗi lần phải lập trình một trang có 4 chức năng trên:

* Khi tạo ra mộtresource thì sử dụng phương thức **POST** để gửi dữ liệu lên
máy chủ
*  Khi tạo cập nhật mộtresource thì sử dụng phương thức **PUT**
*  Khi xoá mộtresource thì sử dụng phương thức **DELETE** .
* Và cuối cùng là khi hiển thị một bài viết cho độc giả họ đọc thì sử dụng
phương thức **GET**.

Và như vậy REST API ra đời, một tiêu chuẩn dùng trong việc thết kế các thiết kế API cho các
ứng dụng web để quản lý các resource. REST là một trong những kiểu thiết kế
API được sử dụng phổ biến nhất ngày nay.

Trọng tâm của REST quy định cách sử dụng các HTTP method
(như GET,POST,PUT,DELETE...) và cách định dạng các URL cho ứng dụng
web để quản các resource


# Retrofit
![](https://images.viblo.asia/3d33d1c2-2dfb-4d40-a7bc-1c9da4f4d472.png)

Nói một cách dễ hiểu  Retrofit là một thư viện giúp phân tích cú pháp phản hồi API dễ dàng và được xử lý tốt hơn để sử dụng trong ứng dụng.

Theo định nghĩa của Square( nhà phát triển Retrofit): 
> 
> A type-safe HTTP client for Android and Java
> 
Retrofit là một type-safe HTTP client cho Java và Android được phát triển bởi Square. Retrofit
giúp dễ dàng kết nối đến một dịch vụ REST trên web bằng cách chyển đổi API
thành Java Interface.

**Type-safe** một ví dụ đơn giản là trình biên dịch sẽ xác nhận hợp lệ các kiểu dữ liệu trong khi biên dịch và ném một lỗi nếu bạn cố gán kiểu sai cho một biến.

Thư viện mạnh mẽ này giúp bạn dễ dàng xử lý dữ liệu JSON hoặc XML sau đó
phân tích cú pháp thành Plain Old Java Objects (POJOs). Tất cả các yêu
cầu **GET**, **POST**, **PUT**, **PATCH**, và **DELETE** đều có thể được thực thi.

Giống như hầu hết các phần mềm mã nguồn mở khác, Retrofit được xây dựng dựa
trên một số thư viện mạnh mẽ và công cụ khác. Đằng sau nó, Retrofit làm cho việc
sử dụng **OkHttp** để xử lý các yêu cầu trên mạng. Ngoài ra, từ Retrofit2 không tích
hợp bất kỳ một bộ chuyển đổi JSON nào để phân tích từ JSON thành các đối tượng
Java. Thay vào đó nó đi kèm với các thư viện chuyển đổi JSON sau đây để xử lý
điều đó:
* Gson: com.squareup.retrofit:converter-gson
* Jackson: com.squareup.retrofit:converter-jackson
* Moshi: com.squareup.retrofit:converter-moshi

Dưới đây là bảng so sánh thời gian thực hiện Task của Retrofit so với Volley và AsyncTask (hình ảnh chỉ mang tính tham khảo):![](https://images.viblo.asia/42fdd74c-8b86-420a-8f59-a594fbe7cf21.png)

Để sử dụng Retrofit2 ta thêm dependency vào  trong file build.gradle : 
```
implementation 'com.squareup.retrofit2:retrofit:2.4.0'
implementation 'com.squareup.retrofit2:converter-gson:2.3.0'
```
# **Retrofit Annotations**
Sử dụng Annotations để mô tả yêu cầu HTTP:
* Hỗ trợ tham số URL và tham số truy vấn 
* Chuyển đổi đối tượng để yêu cầu nội dung 
* Multipart request body và file upload
```
public interface StackOverflowApi {

@GET("/2.2/questions?order=desc&sort=creation&site=stackoverflow&tagged={tag}")
Observable<StackOverflowQuestion> loadQuestion(@Path("tag") String tag);
}
```
Annotation trên các phương thức của interface và các tham số của nó cho biết cách xử lý yêu cầu


-----


**REQUEST METHOD**


Mỗi phương thức phải có Annotation HTTP cung cấp request method và URL.
Có năm Annotation được tích hợp sẵn: [@GET](http://square.github.io/retrofit/), [@POST](http://square.github.io/retrofit/), [@PUT](http://square.github.io/retrofit/), [@DELETE](http://square.github.io/retrofit/) và [@HEAD](http://square.github.io/retrofit/)
URL tương đối của tài nguyên được chỉ định trong Annotation.

`@GET("users/list")`

Bạn cũng có thể chỉ định tham số truy vấn trong URL.

`@GET("users/list?sort=desc")`



-----
**URL MANIPULATION**

URL request có thể được cập nhật tự động bằng cách sử dụng các khối thay thế và tham số trên phương thức.

Chúng ta có thể sử dụng URL 1 cách động dựa vào biến truyền vào, bằng cách sử dụng anotation [@Path](http://square.github.io/retrofit/)

```
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId);
```
Chúng ta có thể nối thêm paramater vào sau URL bằng cách sử dụng [@Query](http://square.github.io/retrofit/)
```
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @Query("sort") String sort);
```

Đối với các kết hợp tham số truy vấn phức tạp, có thể sử dụng [@QueryMap](http://square.github.io/retrofit/).
```
@GET("group/{id}/users")
Call<List<User>> groupList(@Path("id") int groupId, @QueryMap Map<String, String> options);
```



-----
**REQUEST BODY**

Một đối tượng có thể được chỉ định để sử dụng làm phần thân yêu cầu HTTP với Annotation [@Body.](http://square.github.io/retrofit/)
```
@POST("users/new")
Call<User> createUser(@Body User user);
```

Đối tượng cũng sẽ được chuyển đổi bằng cách sử dụng **Converter** được chỉ định trên instance của Retrofit. Nếu không có Converter nào được thêm vào, chỉ có thể sử dụng **RequestBody**.


-----


**FORM ENCODED AND MULTIPART**

Các phương thức cũng có thể được khai báo để gửi dữ liệu được mã hóa và  dữ liệu multipart(nhiều phần).
Dữ liệu được mã hóa theo form được gửi khi [@FormUrlEncoded](http://square.github.io/retrofit/) được chỉ định trên phương thức. Mỗi cặp key-value được chú thích bằng [@Field](http://square.github.io/retrofit/) chứa tên và đối tượng cung cấp giá trị.
```
@FormUrlEncoded
@POST("user/edit")
Call<User> updateUser(@Field("first_name") String first, @Field("last_name") String last);
```
Các yêu cầu multipart được sử dụng khi @Multipart xuất hiện trên phương thức. Các phần được khai báo bằng cách sử dụng  [@Part](http://square.github.io/retrofit/)

```
@Multipart
@PUT("user/photo")
Call<User> updateUser(@Part("photo") RequestBody photo, @Part("description") RequestBody description);
```

Các phần của multiparts sử dụng một trong các bộ chuyển đổi của Retrofit hoặc chúng có thể implement RequestBody để xử lý serialization của riêng chúng.

**Chú thích:**

Serialization là một khái niệm giúp chúng ta có thể chuyển đổi trạng thái của một Java object thành một định dạng nào đó để Java object này có thể được lưu trữ ở đâu đó và sau đó, nó sẽ được sử dụng bởi một tiến trình khác.

Thông thường, khi sử dụng Serialization, Java object  sẽ được chuyển đổi qua một dãy byte liên tục và chúng ta có thể lưu  trong bộ nhớ, trên ổ đĩa, truyền qua mạng đến một server nào đó hoặc cũng có thể lưu chúng vào database.

Và khi một tiến trình khác sử dụng một Java object đã được Serialization, nó sẽ chuyển đổi định dạng đã Serialization về trạng thái của Java object ban đầu. Nhờ vậy, tiến trình đó có thể sử dụng lại Java object đã Serialization.



-----
**CONVERTERS**

Mặc định Retrofit chỉ có thể deserialize  phần thân bản tin HTTP thành  kiểu OkHttp's  ResponseBody  
Và nó chỉ chấp nhận kiểu RequetsBody cho Annotation @Body.

Converter có thể được thêm vào để hỗ trợ các loại khác:

**GSON**: com.squareup.retrofit2:converter-gson

Gson là một thư viện Java có thể được sử dụng để chuyển đổi các đối tượng Java thành biểu diễn JSON của chúng. Nó cũng có thể được sử dụng để chuyển đổi một chuỗi JSON thành một đối tượng Java tương đương.
```
public class Question {
    @SerializedName("title")
    @Expose
    private String mTitle;
    @SerializedName("link")
    @Expose
    private String mLink;

    public String toString() {
        return mTitle;
    }
}
```

@SerializedName cần thiết cho Gson để ánh xạ các khoá JSON với các trường dữ liệu. Để phù hợp với quy ước đặt tên kiểu camelCase của Java cho các thuộc tính thành viên của lớp, bạn không nên sử dụng dấu gạch dưới để tách các từ ngữ trong một biến. 

@Expose chỉ ra rằng trường này nên được định nghĩa với JSON serialization hoặc deserialization.


-----
# Tạo instance Retrofit
Ví dụ:
Tạo interface cho API từ stackoverflow.com lấy danh sách bài đăng thuộc tag "Android" :
```
public interface StackOverflowApi {
    @GET("/2.2/questions?order=desc&sort=creation&site=stackoverflow&tagged={tag}")
    Call<StackOverflowQuestion> loadQuestion(@Path("tag") String tag);
}
```
Tạo instance của Retrofit2 :
```
Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.stackexchange.com")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
```
Thực hiện Request đến API và xử lý kết quả trả về :
```
StackOverflowApi stackOverflowApi = retrofit.create(StackOverflowApi.class);
        stackOverflowApi.loadQuestion("android")
                .enqueue(new Callback<StackOverflowQuestion>() {
                    @Override
                    public void onResponse(Call<StackOverflowQuestion> call, Response<StackOverflowQuestion> response) {
                        //TODO Xử ký dữ liệu trả về
                    }

                    @Override
                    public void onFailure(Call<StackOverflowQuestion> call, Throwable t) {
                        //TODO Xử lý lỗi
                    }
                });
```
# Kết bài

Trên đây là bài giới thiệu về Retrofit2 của mình, cảm ơn các bạn đã theo dõi. Nếu bạn có góp ý gì thì comment ở dưới nha, :">.

Tài liệu tham khảo:

http://square.github.io/retrofit/
https://medium.com/