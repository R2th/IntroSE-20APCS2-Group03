# Giới thiệu vấn đề
Gần đây bạn mình có gặp 1 vấn đề liên quan đến việc sử dụng Okhttp, bạn ấy và mình cùng tìm hiểu và đã tìm ra nguyên nhân. 
Mình viết bài này để tổng hợp lại và chia sẻ mọi người để tránh gặp phải vấn đề này.
## OkHttp là gì
Nó là một http client rất dễ để sử dụng và được sử dụng rộng rãi. Tất cả các thông tin có thể xem trên [trang chủ](https://square.github.io/okhttp/) 
Code mẫu rất dễ sử dụng 
```
OkHttpClient client = new OkHttpClient();

String run(String url) throws IOException {
  Request request = new Request.Builder()
      .url(url)
      .build();

  try (Response response = client.newCall(request).execute()) {
    return response.body().string();
  }
}
```

Trong project lúc đầu đang sử dụng version 3.9.0, mình dang dùng maven 
```
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>3.9.0</version>
        </dependency>
```
## Vấn đề gặp phải
Mình có 1 đoạn code như bên dưới 
```
String url = "https://example.com";
        for (int i = 0; i < 100; i++) {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(url)
                    .build();
            try (Response response = client.newCall(request).execute()) {
                System.out.println(response.body().string());
            }
        }
```

Nó gọi 1 Http Get bất kỳ, trong ví dụ này mình để gọi đến trang example.com
Nhìn có vẻ ổn nhưng vấn đề liên quan đến performance, mình dùng tool VisualVM để quan sát, xem bài giới thiệu về tool VisualVM ở [đây](https://viblo.asia/p/java-performance-tool-part-1-visualvm-bJzKmV0YZ9N).

![](https://images.viblo.asia/bf4bc7fe-b7cf-49b7-b17b-7e3990011eb2.png)

Mình gọi đoạn code trên 3 lần 
Chúng ta có thể thấy số lượng thread tăng lên trên 300 và chưa thấy dấu hiệu giảm, mỗi lần gọi nó sẽ tạo thread mới trong vòng for. Trong ví dụ này mình để loop 100 lần.
mỗi lần gọi nó tăng thêm 100 threads 

# Nguyên nhân và Giải pháp
## Nguyên nhân 
Mỗi khi code được chạy, nó sẽ tạo mới 1 OkhttpClient, sau khi thoát hàm nó chưa kill thread đó ngay lập tức, nó sẽ hold lại 1 khoảng thời gian. 
```
OkHttpClient client = new OkHttpClient();
```

Bản chất trong tài liệu của trang chủ 
```
OkHttpClient client = new OkHttpClient();

String run(String url) throws IOException {
  Request request = new Request.Builder()
      .url(url)
      .build();

  try (Response response = client.newCall(request).execute()) {
    return response.body().string();
  }
}
```

Nó cũng tách cái **OkHttpClient** ra ngoài hàm, nhưng chúng ta đôi khi không để ý, ***thấy viết ngoài hàm để làm gì, vướng code, nên hay copy vào trong hàm luôn*** (sai lầm của dev bên mình, cái này không phải ai cũng biết, chỉ copy vào, thấy chạy được là chạy thôi).

## Giải pháp
### Di chuyển phần init ra bên ngoài, không để trong hàm nữa.
client chỉ cần init 1 lần
```
OkHttpClient client = new OkHttpClient();
```

![](https://images.viblo.asia/c41ba339-8cd7-42c8-bf69-9dac8d89a2b3.png)

Quan sát ta thấy lượng thread hầu như tăng không đáng kể.

### Thay đổi version mới nhất (4.0.9)
![](https://images.viblo.asia/31f764b6-e1c4-4f67-942d-d4c5e4f364d9.png)

Dường như bên phía OkHttp nhận ra điều này, họ đã update và sửa lỗi này. 
Nhưng không phải lúc nào cũng có thể thay đổi version của library, nhất là với những hệ thống đang hoạt động ổn định, có thể gây những lỗi (side-effect)  mà thời điểm sửa chúng ta không phát hiện ra

### Lời khuyên 
Tùy vào tình huống, chúng ta có thể lựa chọn những phương pháp khác nhau để xử lý bài toán.
Theo mình cái nào có thể handle được thì chúng ta handle, nếu tự tin và project đang trong quá trình phát triển thì có thể upgrade cả thư viện.
Có thể tạo OkHttpClient dạng Singleton để giảm việc tạo nhiều object khi sử lý đa luồng. 
```
public class OkhttpSingleton {
    private static volatile OkHttpClient instance;
    public static OkHttpClient getInstance() {
        // Do something before get instance ...
        if (instance == null) {
            // Do the task too long before create instance ...
            // Block so other threads cannot come into while initialize
            synchronized (OkhttpSingleton.class) {
                // Re-check again. Maybe another thread has initialized before
                if (instance == null) {
                    instance = new OkHttpClient.Builder().build();
                }
            }
        }
        // Do something after get instance ...
        return instance;
    }
}
```
# Kết luận
Trong quá trình phát triển sản phẩm, ngoài yếu tố quan chạy được, chạy đúng, performance rất quan trọng. 
Khi project càng ngày càng lớn, lúc gặp vấn đề, chúng ta không biết xử lý từ đâu, chỗ nào gây lỗi. 
Việc cẩn thận khi code là rất quan trọng, chúng ta cẩn thận từ những cái nhỏ, chúng ta sẽ xây dựng được một project chạy ổn định lâu dài. 

Nếu cần trao đổi thêm, hãy comment bên dưới.