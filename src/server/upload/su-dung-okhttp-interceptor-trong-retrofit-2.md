# 	GIỚI THIỆU : 
* Trước khi đọc bài viết này bạn phải biết sử dụng Retrofit cơ bản đã nhé. Bạn có thể tham khảo ở [đây](https://androidclarified.com/retrofit-android-example-http-get-request/) .
* Trong khi Retrofit thực hiện gửi những HTTP request một cách khá đơn giản, nó cũng cho phép một cơ chế kỹ thuận để quản lý và rewrite những requests. Điều này được thực hiện với sự trợ giúp của **OkHttp Interceptor**. *Interceptor* có nghĩa là “làm can thiệp một cái gì đó trong việc đến được đích đến của nó”, tương tự như nghĩa của nó Interceptor can thiệp vào một request, thay đổi request đó và sau đó gửi lại đến điêm đến của nó (server).
*  Ví dụ như là khi bạn gửi những request từ ứng dụng của bạn mà cần thêm Autorization token như là Header. Thay vì tự động thêm cùng Header vào tất cả các điểm cuối như ở đây, bạn có thể chỉ cần thêm một Interceptor sẽ được gọi mỗi lần bạn gửi một request.

## 1.	Tổng quan về OkHttp Interceptor
* Một định nghĩa chính thức cho những Interceptor là : Các Interceptor là để quan sát, điều chỉnh và có khả năng chặn các request và những phản hồi. Thông thường các Interceptor thực hiện thêm, xóa , chuyển đổi các Headers trên request hoặc trên các phản hồi được trả về (từ server). 
## 2. Các kiểu Interceptor : 
Interceptor về căn bản được chia làm 2 loại :
*  **Application Interceptor:** Đây là là những interceptor có cấp độ cao được sử dụng để chặn các các request lên hoặc response phản hồi về. Chúng thường được sử dụng để viết lại các header/query ở cả request và response. Những interceptor chắc chắn được gọi một lần ngay cả khi phản hồi được nạp từ bộ lưu trữ (cache).
*   **Network Interceptor :** Đây là những interceptor có cấp độ thấp hơn được sử dụng để theo dõi các request và response được truyền quan mạng. Nó thì rất hữu ích để theo dõi việc redirect, retry và tạo ra truy cập đến những chi tiết của request. Chúng không được gọi nếu response đã được lưu trữ.

Để thấy rõ hơn sự khác nhau giữa Network Interceptor và Application Interceptor, chúng ta cùng quan sát mô hình dưới đây nhé :
![](https://images.viblo.asia/1c818e46-9817-4c7f-b2d2-77505e9cd685.png) 

## 3.	Implement Interceptor:
* Việc khởi tạo hoặc khai báo một Interceptor thì khá dễ dàng. Chúng ta chủ cần phải implement interface Interceptor và override lại method interceptor() như được triển khai dưới đây. Cả 2 loại Interceptor là Application vs Network Interceptor thì được implement bởi cùng một interface : 

```
private static class CustomInterceptor implements Interceptor {

    @Override
    public Response intercept(Chain chain) throws IOException {
    /*
    chain.request() returns original request that you can work with(modify, rewrite)
    */
    Request request = chain.request();

    // Here you can rewrite the request

        /*
    chain.proceed(request) is the call which will initiate the HTTP work. This call invokes the request and returns the response as per the request.
        */
        Response response = chain.proceed(request);
	
        //Here you can rewrite/modify the response

    return response;
    }
}
```

* Một cuộc gọi đến  *chain.proceed(request)* là một phần quan trọng của mỗi implement của interceptor. Cái method trông có vẻ đơn gian này là nơi tất cả các công việc của HTTP xảy ra, đây là nơi request được khởi tạo và một response sẽ được nạp về để đáp ứng request đó.

* Một khi bạn đã định nghĩa interface interceptor như trên, bạn đã có thể triển khai nói với OkHttp Client như ở dưới đây. Và bây giờ bạn nên đăng ký với Retrofit.Buider, bằng cách này cho tất cả các request OkHttp Client sẽ dược sử dụng và Interceptor của bạn sẽ được gọi đến và có hiệu lực.

```
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new CustomInterceptor()) // This is used to add ApplicationInterceptor.
	.addNetworkInterceptor(new CustomInterceptor()) //This is used to add NetworkInterceptor.
	.build();

	//Defining the Retrofit using Builder
Retrofit retrofit = new Retrofit.Builder()
	.baseUrl(BASE_URL) // Bắt buộc phải thêm base_url
	.client(okHttpClient) //The Htttp client to be used for requests
	.addConverterFactory(GsonConverterFactory.create()) // Thư viện để convert từ resonse sang POJO
	.build();
```

## 4. Ghi lại các log của Request và Response
* Như là những developers thì chúng ta cần log ra các lịch sử và tình trạng của các request/response. Điều này rất quan trọng vì chúng ta cần biết những gì đang xảy ra với những request/response được gửi đi. Những logs này sẽ cho chúng ta biết về headers, request/response body và chi tiết quan trọng cho việc debug và sửa các lỗi. Và rất may mắn là không khó để editor có thể hiển thị ra những log này với Retrofit :D 

* Retrofit cung cấp cho chúng ta với một Custom Interceptor – HttpLoggingInterceptor có thể đăng register với OkHttp Client. Với object này chúng ta có thể in ra tất cả các log cho các hoạt động của HTTP thông qua client như sau :

```
HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();

Retrofit retrofit = new Retrofit.Builder()
	.baseUrl("https://backend.example.com")
	.client(client)
	.addConverterFactory(GsonConverterFactory.create())
	.build();

```
* Trong HttpLoggingInterceptor.Level có các param : 
     * Level.BASIC : log ra những dòng request/response
     * Level.BODY: log ra những dòng, và header và body tươn ứng (nếu có)
     * Level.HEADERS: logs ra những dòng vào header tương ứng với nó
     * Level.NONE : không log ra gì cả
## 5.	Rewriting Request – Adding/ Removing Header :
* Đến đây chúng ta đẽ biết làm thế nào để tạo ra một Custom Interceptor. Trong phần này chúng ta sẽ tìm hiểu cách sử dụng Custom Interceptor để modify headers gửi với một network request nhé.

* Trong ví dụ dưới đây, chúng ta cùng đọc một response code và build một new response mới dựa trên reponse code:

```
private static class RequestInterceptor implements Interceptor {

    @Override
    public Response intercept(Chain chain) throws IOException {

        chain.request() returns original request that you can work with(modify, rewrite) */
        Request originalRequest = chain.request();

        Headers headers = new Headers.Builder()
            .add("Authorization", "auth-value")
            .add("User-Agent", "you-app-name")
            .build();

        Request newRequest = originalRequest.newBuilder()
            .addHeader("Authorization", "auth-value") //thêm một header với name và value.
            .addHeader("User-Agent", "you-app-name")
            .cacheControl(CacheControl.FORCE_CACHE) //  Đặt kiểm soát header là của request này, replace lên mọi header đã có.
            .headers(headers) //Removes all headers on this builder and adds headers.
            .method(originalRequest.method(), null) // Adds request method and request body
            .removeHeader("Authorization") // Removes all the headers with this name
            .build();

            /*
            chain.proceed(request) là một lời gọi sẽ khởi tạo HTTP work. Lời gọi này sẽ thực hiện request và rả về response tương ứng.
        */
        Response response = chain.proceed(newRequest);
        return response;
	}
```

## 6. Rewriting Response với OkHttp Interceptor
* Tương tự, OkHttp Interceptor có thể được sử dụng để rewite/ modify các response trả về từ server. Với trường hợp này bạn không thể rewrite header của response nhưng bạn có thể thay đổi body của response như đoạn code dưới đây.

```
private static class ResponseInterceptor implements Interceptor {
	
	@Override
	public Response intercept(Chain chain) throws IOException {
	// We obtain the response using chain.proceed() API. This invokes the request and return the response
	Response response = chain.proceed(chain.request());
	try {

        JSONObject jsonObject = new JSONObject();
	
        if (response.code() == 200) {
            jsonObject.put("code", 200);
            jsonObject.put("status", "OK");
            jsonObject.put("message", new JSONObject(response.body().string()));
        } else {
            jsonObject.put("code", 404);
            jsonObject.put("status", "ERROR");
            jsonObject.put("message", new JSONObject(response.body().string()));
        }
        MediaType contentType = response.body().contentType();
        ResponseBody body = ResponseBody.create(contentType, jsonObject.toString());
        return response.newBuilder().body(body).build();
	} catch (JSONException e) {
        e.printStackTrace();
	}

	return response;
	}
}
```

# TỔNG KẾT .
Như vậy, trong bài viết này mình đã giới thiệu về Interceptor và vài cách sử dụng mà chúng ta thường hay gặp. Hi vọng bài viết có thể giúp ích cho bạn.

-----

Have a nice day!

## Tham khảo : 
https://square.github.io/okhttp/3.x/logging-interceptor/okhttp3/logging/HttpLoggingInterceptor.Level.html

https://androidclarified.com/okhttp-interceptor-retrofit2-example/?fbclid=IwAR0xkUxt6frm6R9UsfDJR-pkND02FtM4zVa0u0fmD1o9ANeQ0Deg-0Ka6L0

https://androidclarified.com/retrofit-android-example-http-get-request/