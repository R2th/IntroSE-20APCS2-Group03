# I> Mở đầu

Hôm nay mình xin giới thiệu Fast Android Networking ([FAN](https://github.com/amitshekhariitbhu/Fast-Android-Networking)) - một thư viện mới chuyên về network cho Android. Trước nay khi nói về xử lý network cho Android chúng ta thường lựa chọn những cái tên quen thuộc như Volley, Retrofit, hoặc các bạn pro có thể tự tay code. Tuy nhiên, với FAN, chúng ta có thêm một thư viện mạnh mẽ xử lý về network. FAN làm tất cả mọi thứ từ xử lý API, xử lý respone, up/download file ... Công việc của chúng ta chỉ đơn giản là tạo ra request và xử lý response trả về!

# II> Tại sao lại lựa chọn FAN

* Cấu trúc của FAN hoàn toàn dựa trên OkHttp nên luôn đảm bảo khả năng tương thích với các phiên bản Android. Việc Android M (Marshmallow) lược bỏ HttpClient, khiến cho các thư viện cũ trở nên lỗi thời và thiếu tính tương thích.
* FAN có thể làm tất cả mọi việc như tạo request, up/download các định dạng file bất kỳ, hiện thị image từ network.... 
* FAN cung cấp nhiều interface giúp đơn giản hóa các công việc xử lý phức tạp về network như thiết lập độ ưu tiên, hủy bỏ các request....
* FAN sử dụng [Okio](https://github.com/square/okio), không tạo ra GC overhead trong ứng dụng. Okio được tạo ra để xử lý GC overhead khi phân phát bộ nhớ góp phần giải phóng CPU và bộ nhớ.
* FAN hoàn toàn hỗ trợ [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2).
* Các kiến trúc sử dụng FAN vô cùng đa dạng: [RxJava2](https://amitshekhariitbhu.github.io/Fast-Android-Networking/rxjava2_support.html), [RxJava2 + Fast Android Networking + Dagger2 with MVP](https://github.com/MindorksOpenSource/android-mvp-architecture), [RxJava2 + Fast Android Networking + Dagger2 with MVVM](https://github.com/MindorksOpenSource/android-mvvm-architecture).

# III> Cách sử dụng FAN

* Đưa FAN vào build.gradle:
`compile 'com.amitshekhar.android:android-networking:1.0.1'`

* Cấp quyền truy cập network cho ứng dụng:
`<uses-permission android:name="android.permission.INTERNET" />`

* Khởi tạo trong method onCreate() của application:
`AndroidNetworking.initialize(getApplicationContext());`

* Sử dụng FAN với custom okHttpClient:
// Adding an Network Interceptor for Debugging purpose :
```
OkHttpClient okHttpClient = new OkHttpClient() .newBuilder()
                        .addNetworkInterceptor(new StethoInterceptor())
                        .build();
AndroidNetworking.initialize(getApplicationContext(),okHttpClient);
```

* Sử dụng FAN với Jackson Parser:
```
compile 'com.amitshekhar.android:jackson-android-networking:1.0.1'
// Then set the JacksonParserFactory like below
AndroidNetworking.setParserFactory(new JacksonParserFactory());
```

### 1> GET Request

```
AndroidNetworking.get("https://fierce-cove-29863.herokuapp.com/getAllUsers/{pageNumber}")
                 .addPathParameter("pageNumber", "0")
                 .addQueryParameter("limit", "3")
                 .addHeaders("token", "1234")
                 .setTag("test")
                 .setPriority(Priority.LOW)
                 .build()
                 .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                }); 
```

### 2> POST Request

```
AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/createAnUser")
                 .addBodyParameter("firstname", "Amit")
                 .addBodyParameter("lastname", "Shekhar")
                 .setTag("test")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });
```

* Chúng ta có thể đưa object, json, file ... và POST request như sau:
```
User user = new User();
user.firstname = "Amit";
user.lastname = "Shekhar";

AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/createUser")
                 .addBodyParameter(user) // posting java object
                 .setTag("test")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });


JSONObject jsonObject = new JSONObject();
try {
    jsonObject.put("firstname", "Amit");
    jsonObject.put("lastname", "Shekhar");
} catch (JSONException e) {
  e.printStackTrace();
}
       
AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/createUser")
                 .addJSONObjectBody(jsonObject) // posting json
                 .setTag("test")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });
                
AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/postFile")
                 .addFileBody(file) // posting any type of file
                 .setTag("test")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });    
```

### 3> Download file từ server

```
AndroidNetworking.download(url,dirPath,fileName)
                 .setTag("downloadTest")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .setDownloadProgressListener(new DownloadProgressListener() {
                    @Override
                    public void onProgress(long bytesDownloaded, long totalBytes) {
                      // do anything with progress  
                    }
                 })
                 .startDownload(new DownloadListener() {
                    @Override
                    public void onDownloadComplete() {
                      // do anything after completion
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error    
                    }
                });
```

### 4> Upload file lên server

```
AndroidNetworking.upload(url)
                 .addMultipartFile("image",file)    
                 .addMultipartParameter("key","value")
                 .setTag("uploadTest")
                 .setPriority(Priority.HIGH)
                 .build()
                 .setUploadProgressListener(new UploadProgressListener() {
                    @Override
                    public void onProgress(long bytesUploaded, long totalBytes) {
                      // do anything with progress 
                    }
                 })
                 .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                      // do anything with response                
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error 
                    }
                 });
```

* Còn rất nhiều cái ví dụ mà các bạn có thể tham khảo tại [đây](https://github.com/amitshekhariitbhu/Fast-Android-Networking)

# III> Kết
> Hy vọng với thông tin từ bài viết này, các bạn sẽ có thêm sự lựa chọn mới khi tiếp cận với với networking trong ứng dụng Android! Chúc các bạn sẽ có những ứng dụng hay, tốc độ xử lý nhanh và mạnh mẽ!