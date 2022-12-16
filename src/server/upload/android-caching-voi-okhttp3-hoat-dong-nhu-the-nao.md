Trong bài viết này mình sẽ nói về cách caching dữ liệu trong Okhttp. Trước khi implement Okhttp cache ta cần hiểu cơ chế cache của nó trước đã 
## Http caching mechanism
- Việc fetching dữ liệu từ mạng vừa chậm vừa tốn kém. Với các response lớn đòi hỏi nhiều roundtrips giữa client và server, nó sẽ bị delay và khi browers có thể xử lý chúng nó sẽ phát sinh nhiều chi phí về network cho khách truy cập. Vì vậy khả năng về lưu trữ và việc sử dụng lại tài nguyên khi fetch về là việc hoàn toàn cần thiết và quan trọng cho việc tối ưu hóa hiệu năng 
- Mọi client thực chất đều cung cấp việc impemention bộ nhớ cache. Tất cả điều chúng ta cần là mỗi response của server cung cấp HTTP header chính xác để cung cấp brower về thời gian và thời gian brower có thể cache response
-![](https://images.viblo.asia/388a5224-60a7-47af-a5a3-98b9f0559e37.png)
- Khi server trả về response, nó cũng phát ra 1 tập hợp các HTTP headers, miêu tả về chúng như content-type, length, caching directives, validation token,.. . Ví dụ ở trên hình trên, server trả về 1024 byte, hướng dẫn client lưu trữ cache tối đa trong 120s và cung cấp validation token là (""x234dff) có thể được sử dụng sau khi hết response để kiểm tra resource được sửa đổi
### Validating cached responses with ETags
- Server sử dụng ETag trong header của response trả về để kết hợp với validation token
- Validation token cho phép kiểm tra cập nhật dữ liệu hiệu quả, sẽ không có dữ liệu nào được chuyển đi nếu dữ liệu không thay đổi
- Giả sử trong 120s đã qua kể từ lần fetch data và brower đã khởi tạo một request mới cho cùng 1 dữ liệu. Đầu tiên, nó sẽ kiểm ta local cache và response trước đó. Đen là nó sẽ không sử dụng response trước đó vì nó đã hết hạn. Tại thời điểm này, nó sẽ gửi request mới và lấy toàn bộ response mới. Tuy nhiên điều đó không cần thiết nếu dữ liệu đó không thay đổi so với cũ -> vì vậy không có lí do gì để tải xuống cùng một thông tin đã có trong cache
- Vì vậy validation token được sinh ra, nó sẽ ra để xử lý vấn đề này. Server sẽ tạo và trả về một token tùy ý,thường là hàm băm hay dấu vân tay của nội dung file. Client không cần phải biết nó được gen ra như thế nào , nó chỉ cần thiết cho  khi client gửi đến server ở request tiếp theo, nếu token hay dấu vân tay vẫn như cũ thì response không thay đổi và ta có thể bỏ qua phần download dữ liệu
![](https://images.viblo.asia/4c7b10ca-3c42-403e-a5b0-d87eddf5bd57.png)
- Trong ví dụ trên, client sẽ tự động cung cấp mã thông báo ETag trong header request HTTP 'If-None_Match'. Server kiểm tra token dựa trên dữ liệu hiện tại. Nếu token không thay đổi, server sẽ trả lời phản hồi "304 Not Modified", thông báo cho client biết rằng response mà nó có trong bộ đệm đã không thay đổi và có thể được gia hạn thêm 120 giây nữa. Lưu ý rằng bạn không phải tải response một lần nữa, giúp tiết kiệm thời gian và băng thông.
### Cache-Control
- Mỗi dữ liệu có thể xác định chính sách lưu trữ của nó thông qua header Cache-Control
- Cache - Control chỉ thị kiểm soát ai có thể lưu trữ response, trong điều kiện nào và trong bao lâu.
- Từ góc độ tối ưu hóa hiệu năng, một request tốt nhất là một request không cần kết nối với server, một local copy response  (response được lấy từ cache) cho phép ta loại bỏ tất cả độ trễ của mạng và tránh tốn băng thông cho việc truyền dữ liệu. Để đạt được điều này, HTTP cho phép server trả về Cache-Control để control chúng, client và bộ nhớ cache có thể lưu trữ response riêng lẻ

![](https://images.viblo.asia/e7b8871c-963d-447b-8c39-5909596152b9.png)

#### No-cache and no-store
- "no-cache"  chỉ ra rằng response được trả về không thể được sử dụng để đáp ứng yêu cầu tiếp theo cho cùng một URL mà không cần kiểm tra trước với server nếu response đã thay đổi. Kết quả là, nếu có mã xác thực hợp lệ (ETag), không có bộ đệm sẽ phát sinh một vòng để xác thực phản hồi được lưu trong bộ nhớ cache, nhưng có thể loại bỏ tải xuống nếu tài nguyên không thay đổi.
- Ngược lại, 'no store' đơn giản hơn nhiều. Nó chỉ đơn giản là không cho phép trình duyệt và tất cả các bộ đệm trung gian lưu trữ bất kỳ phiên bản nào của responst được trả về, ví dụ, một bộ chứa dữ liệu cá nhân hoặc ngân hàng riêng tư. Mỗi khi người dùng yêu cầu dữ liệu này, một request được gửi đến server và response được tải về
#### public vs private
- Nếu response được đánh dấu là 'public', thì nó có thể được lưu vào bộ đệm, ngay cả khi nó có xác thực HTTP được liên kết với nó và ngay cả khi mã trạng thái phản hồi thường không được lưu trong bộ nhớ cache. Hầu hết thời gian, 'public' là không cần thiết, bởi vì thông tin bộ nhớ cache rõ ràng (như 'max-age') chỉ ra rằng response có thể được lưu trong bộ nhớ cache. 

- Ngược lại, client có thể lưu trữ các response 'private'. Tuy nhiên, những response này thường dành cho một người dùng, do đó, bộ nhớ cache trung gian không được phép lưu trữ chúng. Ví dụ: trình duyệt của người dùng có thể lưu trữ trang HTML với thông tin người dùng riêng tư, nhưng CDN không thể lưu trữ trang.
#### max-age
-Thuộc tính này chỉ định thời gian tối đa tính bằng giây mà phản hồi tìm nạp được phép sử dụng lại từ thời điểm request. Ví dụ: "max-age = 60" chỉ ra rằng response có thể được lưu trữ và sử dụng lại trong 60 giây tiếp theo.
![](https://images.viblo.asia/e4e77ff7-18f4-4d54-95fc-0c17c49c5e82.png)
- Thực hiện theo cây quyết định ở trên để xác định chính sách bộ nhớ cache tối ưu cho một dữ liệu cụ thể hoặc một bộ dữ liệu mà ứng dụng của bạn sử dụng. Tốt nhất, ta nên đặt mục tiêu lưu trữ càng nhiều response càng tốt trên client trong thời gian dài nhất có thể và cung cấp mã thông báo xác thực cho mỗi response để cho phép xác nhận lại hiệu quả.
## Implement

- Vậy implement cache response với Okhttp3 như thế nào? Theo như mô hình trên thì ta chả phải làm gì ngoài việc tạo vùng nhớ cache để lưu thôi =)) , bởi trong Okhttp3 đã hỗ trợ tất cả các  header support cache ở chế độ default là nó sẽ tự add 'max-age' với 'Etags' vào header các request :)) 
```java
int cacheSize = 10 * 1024 * 1024; // 10MB
OkHttpClient.Builder builder = new OkHttpClient.Builder()
        .cache(new Cache(context.getCacheDir(), cacheSize) 
        ....
```
![](https://images.viblo.asia/437090d8-3b73-4c9a-a4d1-27a5e9dbfaf3.png)
- Nó tự động phân tích cú pháp header từ server và vùng cache lưu trữ response. Lần tới, khi ta gửi request, nó sẽ tự động kết nối header tương ứng cho ta
- Ví dụ một request server trả về cho ta header thế này
```xml
 Content-Type: application/json
 Content-Length: 523
 Server: nginx
 Date: Fri, 05 Apr 2019 06:28:09 GMT
 ETag: W/"b2628d13f042cbdfg7c1b784078dfgvc83"
 X-Request-Id: 3ff6cc1b-bbfa-dfbe-sdr25-8d0sgd8a4ff6
 X-Runtime: 0.010486
 Vary: Origin
 Cache-Control: max-age=30
```
- Lần request sau OKHttp sẽ set header cho request
```
If-Modified-Since:Fri, 05 Apr 2019 06:28:09 GMT
If-None-Match:"b2628d13f042cbdfg7c1b784078dfgvc83"
```
### How to make it works offline?
- Nếu server  trả về max-age nó sẽ nói với OKhttp rằng nó có thể lưu trữ response và sử dụng offline sau đó nó sẽ hoạt động
- Nếu thuộc tính max-age không tồn tại hay hết hạn nhưng chúng ta vẫn muốn dùng response ở local data thì ta sẽ set CacheControl là FORCE_CACHE  -> Lúc này flow nó sẽ như thế này 
![](https://images.viblo.asia/f78392d1-5087-4501-9796-805220db447d.png)
- Tổng quát hơn nếu ta luôn muốn lấy dữ liệu từ local cache nếu không có mạng: 
```java
public class ForceCacheInterceptor implements Interceptor {
    @Override
    public Response intercept(Chain chain) throws IOException {
        Request.Builder builder = chain.request().newBuilder();
        if (!NetworkUtils.internetAvailable()) {
            builder.cacheControl(CacheControl.FORCE_CACHE);
        }
        
        return chain.proceed(builder.build());
    }
}
okHttpClient.addInterceptor(new ForceCacheInterceptor());
```
- Việc sử dụng FORCE_CACHE không phải là tốt bởi dữ liệu luôn phải có sẵn trong khi có thể trong cache không có
### References
> * https://medium.com/@I_Love_Coding/how-does-okhttp-cache-works-851d37dd29cd
> * https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching