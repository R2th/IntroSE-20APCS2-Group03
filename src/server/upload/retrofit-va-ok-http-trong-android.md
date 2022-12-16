# Retrofit

Bài viết cũng được mình up tại blog cá nhân: [Code cùng Trung](https://codecungtrung.com/). Các bạn ghé qua để học thêm kiến thức hay nhé :D

- [Retrofit và Ok Http trong Android – Có thể bạn đã biết ?](https://codecungtrung.com/android/advanced-android/retrofit-va-ok-http-trong-android)

## I. Các khái niệm

### 1. Retrofit là gì ?

**Retrofit** là một type-safe HTTP client cho Android và Java. Retrofit giúp dễ dàng kết nối tới một dịch vụ REST ở trên web bằng cách dịch API thành các Interface của Java

Thư viện mạnh mẽ này giúp bạn lấy dữ liệu trả về dạng JSON hoặc XML, sau đó phần tích cú pháp thành Plain Old Java Objects (POJOs). Các request **GET, POST, PUT, PATCH, DELETE** đều có thể được thực thi 

Retrofit được xây dựng trên nền một số thư viện mạnh mẽ và công cụ khác, đằng sau nó có sử dụng OkHttp.
Ngoài ra Retrofit không tích hợp sẵn bộ chuyển đổi JSON -> Java, thay vào đó ta có thể sử dụng các thư viện sau:

Gson: com.squareup.retrofit:converter-gson

Jackson: com.squareup.retrofit:converter-jackson

Moshi: com.squareup.retrofit:converter-moshi

Vs Protocol buffers, Retrofit hỗ trợ

Protobuf: com.squareup.retrofit2:converter-protobuf

Wire: com.squareup.retrofit2:converter-wire

Và đối với XML, Retrofit hỗ trợ:

Simple Framework: com.squareup.retrofit2:converter-simpleframework

### 2. Tại sao lại dùng Retrofit ?

- Retrofit đơn giản trong việc setup và sử dụng : phát triển thư viện type-safe HTTP của riêng của bạn để giao tiếp với một REST API có thể thật sự rất khó: bạn phải xử lý nhiều khía cạnh, chẳng hạn như kết nối, bộ nhớ đệm, thử lại yêu cầu sai, luồng, phân tích phản hồi, xử lý lỗi và nhiều thứ khác. Mặt khác, Retrofit là một thư viện được tổ chức tốt, tài liệu hướng đầy đủ và đã thử nghiệm sẽ giúp bạn tiết kiệm rất nhiều thời gian quý báu và những đau đầu không cần thiết.

- Retrofit là một type-safe HTTP client: trình biên dịch sẽ xác nhận hợp lệ các kiểu dữ liệu trong khi biên dịch và ném một lỗi nếu bạn cố gán kiểu sai cho một biến.

- Retrofit nhanh hơn rất nhiều so với việc sử dụng Volley, AysncTask

![](https://images.viblo.asia/37903105-29a3-473d-a39d-a61e7c649af1.png)

### 3. OkHttp Interceptor

### a. Khái niệm

Một trong những việc rất nhàn chán khi phát triển ứng dụng trên nền tảng Android đó là xử lý kết nối mạng, bắt lỗi và exception, kiểm soát kích thước file download và thời gian download file đó...vv.

Tuy nhiên có một thư viện giúp chúng ta giải quyết các vấn đề đó một cách nhanh gọn, đó là OkHttp.

**OkHttp** sẽ giúp ta

-Kiểm soát kết nối tới server

-Kiểm soát các kết nối không tốt và thử kết nối lại khi có thể

-Nó sẽ thử thay thế server IP address nếu kết nối tới một IP nào đó bị thất bại vào IP thay thế được chuẩn bị sẵn

-Giảm độ trễ của request, giảm size của file cần download

-Tránh lặp lại các request đã được hoàn thành

Interceptor có nghĩa là “làm can thiệp một cái gì đó trong việc đến được đích đến của nó”, tương tự như nghĩa của nó Interceptor can thiệp vào một request, thay đổi request đó và sau đó gửi lại đến điêm đến của nó (server).

Các Interceptor là để quan sát, điều chỉnh và có khả năng chặn các request và những phản hồi. Thông thường các Interceptor thực hiện thêm, xóa , chuyển đổi các Headers trên request hoặc trên các phản hồi được trả về (từ server).

### b. Các kiểu Interceptor :
Interceptor về căn bản được chia làm 2 loại :

Application Interceptor: Đây là là những interceptor có cấp độ cao được sử dụng để chặn các các request lên hoặc response phản hồi về. Chúng thường được sử dụng để viết lại các header/query ở cả request và response. Những interceptor chắc chắn được gọi một lần ngay cả khi phản hồi được nạp từ bộ lưu trữ (cache).

Network Interceptor : Đây là những interceptor có cấp độ thấp hơn được sử dụng để theo dõi các request và response được truyền quan mạng. Nó thì rất hữu ích để theo dõi việc redirect, retry và tạo ra truy cập đến những chi tiết của request. Chúng không được gọi nếu response đã được lưu trữ.
###.c.Tác dụng

- Ghi lại các log của Request và Response

-	Sửa lại Request – Adding/ Removing Header/Body

- Rewriting Body của Response

### c. Tác dụng

- **Logging Interceptor**: log ra các lịch sử và tình trạng của các request/response. Những logs này sẽ cho chúng ta biết về headers, request/response body và chi tiết quan trọng cho việc debug và sửa các lỗi

Trong HttpLoggingInterceptor.Level có các param :

+ Level.BASIC : log ra những dòng request/response

+ Level.BODY: log ra những dòng, và header và body tương ứng (nếu có)

+ Level.HEADERS: logs ra những dòng và header tương ứng với nó

+ Level.NONE : không log ra gì cả

- **Authorization Header**: add thông tin cho API request, ví dụ như add authen token

- **Authen cơ bản**: xác thực một cách cơ bản, vẫn request vs Authorization Header chứa từ "Basic" và đằng sau là khoảng trắng, sau đó là username:password được đưa về dạng string base 64

- SSL Configuration: mặc định thì Retrofit không kết nối được tới API mà được bảo vệ vs SSL, vậy nên ta cần phải cấu hình cho nó.

### 4. Hiểu về enqueue() và execute()


enqueue() gửi yêu cầu và thông báo cho ứng dụng của bạn một cách không đồng bộ với một hàm callback khi có một phản hồi. Vì yêu cầu này là không đồng bộ, nên Retrofit xử lý việc thực thi trên một tác vụ chạy nền vì thế mà Giao diện Người dùng không bị ảnh hưởng.

Để sử dụng phương thức enqueue(), bạn phải cài đặt hai phương thức callback: onResponse() và onFailure(). Chỉ có một trong hai phương thức này sẽ được gọi để đáp ứng một yêu cầu nhất định.

**onResponse()**: được gọi khi nhận được một phản hồi HTTP. Phương thức này được gọi khi có một phản hồi mà có thể được xử lý một cách chính xác ngay cả khi máy chủ trả về một thông báo lỗi. Vì vậy nếu bạn nhận được một code trạng thái là 404 hoặc 500, phương thức này sẽ vẫn được gọi. Để có được code trạng thái để bạn xử lý các tình huống dựa trên chúng, bạn có thể sử dụng phương thức response.code(). Bạn cũng có thể sử dụng phương thức isSuccessful() để tìm ra code trạng thái trong khoảng 200-300, xác định một yêu cầu thành công.

**onFailure()**: được gọi khi một ngoại lệ kết nối mạng xảy ra trong quá trình giao tiếp đến máy chủ, hoặc khi một ngoại lệ bất ngờ xảy ra trong quá trình xử lý yêu cầu hoặc xử lý phản hồi.

Các yêu cầu đồng bộ

Để thực hiện một yêu cầu đồng bộ, bạn có thể sử dụng phương thức **execute()** trong một đối tượng Call. Nhưng lưu ý rằng các phương thức đồng bộ trên tác vụ chính/UI sẽ chặn bất kỳ hành động nào của người dùng. Vì vậy, đừng thực hiện các phương thức đồng bộ trên tác vụ chính/UI của Android! Thay vào đó, hãy chạy chúng trên một tác vụ nền.

### 5. Xử lý lỗi với LiveData và Retrofit


Vấn đề hay xảy ra là phải kiểm tra lại nhiều lần mỗi khi nhận response từ server như


- response.body() khác null


- Check nếu có exception được thown thì phải xử lý, nếu ko thì cho hiển thị lên view


==> Cần có code base để xử lý các vấn đề này

### 6.Repository pattern

Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.

Thông thường thì các phần truy xuất, giao tiếp với database năm rải rác ở trong code, khi bạn muốn thực hiện một thao tác lên database thì phải tìm trong code cũng như tìm các thuộc tính trong bảng để xử lý. Điều này gây lãng phí thời gian và công sức rất nhiều.

Với Repository design pattern, thì việc thay đổi ở code sẽ không ảnh hưởng quá nhiều công sức chúng ra chỉnh sửa.

 Một số lý do chung ta nên sử dụng Repository Pattern:

- Một nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.

- Một nơi duy nhất chịu trách nhiệm cho việc mapping các bảng vào object.

- Tăng tính bảo mật và rõ ràng cho code.

- Rất dễ dàng để thay thế một Repository với một implementation giả cho việc testing, vì vậy bạn không cần chuẩn bị một cơ sở dữ liệu có sẵn.

Ứng dụng trong Android là dữ liệu sẽ được load lên cho view mà chỉ cần gọi đến repository, repo sẽ tự xác định nguồn dữ liệu nào có để load lên.

![](https://images.viblo.asia/b56e7461-8b2a-4fe4-a165-c7035472ef7c.png)

## II. Code

### 1. Logging Interceptor


-  Add compile 'com.squareup.okhttp3:logging-interceptor:3.8.0' vào file build.gradle của app.


- Thêm đoạn code add logging

![](https://images.viblo.asia/62d9681c-e5d4-46eb-9969-5fe1ccf1a37e.png)

- Kết quả

![](https://images.viblo.asia/222f61fc-77c5-4353-9839-4a73f9d6f5df.png)


### 2. Authorization Header

-  Tạo đối tượng Interceptor bằng request header

- Add đối tượng đó tới OkHttpClient.Builder 

![](https://images.viblo.asia/6909cb7c-b91f-4c4c-868f-cc7da850e4b8.png)

- Kết quả

![](https://images.viblo.asia/562dfb56-b32f-4df0-901d-6e249a17e333.png)

### 3. Basic Authentication

-  Tạo authen key bằng hàm của class Credential

```
authToken = Credentials.basic("trung", "@@1122")
```

- Add đối tượng đó tới OkHttpClient.Builder 


![](https://images.viblo.asia/6909cb7c-b91f-4c4c-868f-cc7da850e4b8.png)


- Kết quả


![](https://images.viblo.asia/562dfb56-b32f-4df0-901d-6e249a17e333.png)


### 4. Xử lý lỗi với LiveData và Retrofit


- Extend lại lớp CallBack để có những xử lý riêng


![](https://images.viblo.asia/e7d290f1-0130-475b-a33a-7c2b74b95106.png)

- Extend lại lớp Observer để có những xử lý khi dữ liệu thay đổi, khi thành công, khi có lỗi, ...


![](https://images.viblo.asia/c8c72162-99e7-4e4a-a685-5c5eafc5a520.png)


- Liệt kê danh sách các lỗi cần xử lý 

![](https://images.viblo.asia/da99b3ed-bbc2-465d-8795-366ba567b511.png)

- Xử lý các lỗi 

![](https://images.viblo.asia/4e909fd6-3c18-45f6-ba50-108c6c68689b.png)

-Observe tới custom observer ở trên

![](https://images.viblo.asia/bee71aca-394c-46cd-9042-80aff021a25e.png)

-------------------------------------------------------

Call factory dùng LiveData

Khi máy khách OkHttp nhận được phản hồi từ máy chủ, nó sẽ chuyển phản hồi trở lại Retrofit. 

Retrofit sau đó thực hiện phép thuật của nó: nó đẩy các byte phản hồi vô nghĩa thông qua các bộ chuyển đổi (adapter) và kết thúc nó thành một phản hồi có thể sử dụng được với các đối tượng Java có ý nghĩa. Quá trình sử dụng nhiều tài nguyên này vẫn được thực hiện trên một luồng nền. Cuối cùng, khi mọi thứ đã sẵn sàng, Retrofit cần trả kết quả về luồng UI của ứng dụng Android của bạn.

Theo mặc định, gói trả lại này được thực hiện dưới dạng Call <TypedResponseClass>. Hành động trả về từ background, nhận và chuẩn bị kết quả, cho luồng giao diện người dùng Android là một bộ call adapter

Chuyển được sang nhiều dạng

```
dependencies {  
    // Retrofit
    compile 'com.squareup.retrofit2:retrofit:2.5.0'

    // For example, add call adapter for RxJava 2
    implementation 'com.squareup.retrofit2:adapter-rxjava2:2.5.0'

    // or alternatively:
    implementation 'com.squareup.retrofit2:adapter-rxjava:2.5.0'
    implementation 'com.squareup.retrofit2:adapter-guava:2.5.0'
    implementation 'com.squareup.retrofit2:adapter-java8:2.5.0'
    
    // For LiveData
     implementation "com.github.leonardoxh:retrofit2-livedata-adapter:1.1.2"
}
```

Được add vào qua hàm: addCallAdapterFactory()

LiveData: .addCallAdapterFactory(LiveDataCallAdapterFactory.create())

Api sẽ có dạng như sau
```
 public interface SuperService {
    @GET("/pimba") LiveData<Resource<Pimba>> getPimba();
    @GET("/pimba") LiveData<Response<Resource<Pimba>>> getPimbas();
}
```

----------------------------------------------------------

Cache data with OkHttp

- Đơn giản chỉ cần code:

```
int cacheSize = 10 * 1024 * 1024; // 10MB
OkHttpClient.Builder builder = new OkHttpClient.Builder()
        .cache(new Cache(context.getCacheDir(), cacheSize) 
        ....
```        
Sau đó ta không cần làm gì thêm, nó sẽ tự cache
    
 -------------------------------------------------------------------------
    
###   Retrofit là một thư viện giao tiếp với API rất hay được sử dụng hiện nay. OkHttp Interceptor sẽ giúp chúng ta có những xử lý sâu hơn vào kết nối. Còn chần chừ gì mà ko thử ngay nào :metal: :v: :swimming_man:
    
-------------------------------------------------------------------------
    
 Xem thêm các bài viết khác của mình tại Viblo

- [Service trong Android - Những khái niệm cơ bản - Phần 1](https://viblo.asia/p/service-trong-android-nhung-khai-niem-co-ban-phan-1-Az45boyoKxY)
 - [Deeplink đến Dynamic link trong Android - Những điều cần biết](https://viblo.asia/p/deeplink-den-dynamic-link-trong-android-nhung-dieu-can-biet-Do754GGelM6)  
- [Location trong Android](https://viblo.asia/p/location-trong-android-vyDZOp8klwj)
- [App bundle và Dynamic delivery trong Android](https://viblo.asia/p/app-bundle-va-dynamic-delivery-trong-android-bJzKmwOYl9N)
    
Tại kipalog: 
    
  -  [Code cùng Trung - kipalog](https://kipalog.com/users/Code%20c%C3%B9ng%20Trung/mypage)
    
 Blog cá nhân , các bạn hãy theo dõi để tiếp tục cập nhật những kiến thức mới nhé. Cảm ơn các bạn :D
    
 Code cùng Trung - Chia sẻ để tiến bước: https://codecungtrung.com/
   
    
Ngoài ra, nếu bạn muốn viết một blog, chạy một trang web thì **host** là một phần không thể thiếu, bên cạnh **domain**. [**Hawkhost**](https://my.hawkhost.com/aff.php?aff=13584) là một host rất tốt, được nhiều người sử dụng, server ổn định, support nhiệt tình, nhiều **khuyến mại** nữa. Mình cũng đang sử dụng cho blog của mình - đang trong giai đoạn phát triển :grinning: .

 Các bạn có thể xem thêm và đăng kí tại link:
   
   - [Hawkhost - một host rất đáng để sử dụng]( https://my.hawkhost.com/aff.php?aff=13584)