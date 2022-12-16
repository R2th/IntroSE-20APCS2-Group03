- Xin chào các bạn, bài viết này mình sẽ giới thiệu tới các bạn  về cách mà OkHttp Cache làm việc như thế nào?.
- Để hiểu về cách nó hoạt động, trước tiên chúng ta cần biết Http Cache là gì?

## HTTP Cache
- Quá trình fetching dữ liệu qua mạng gây chậm và tốn kém, với các response kích thước lớn đòi hỏi nhiều roundtrips giữa client và server, nó sẽ gây ra delay và khi
browser có thể xử lý chúng cũng phát sinh chi phí dữ liệu khi truy cập. Do đó, khả năng lưu trữ và sử dụng lại các tài nguyên được tải trước đó là một vấn đề quan trọng
trong việc tối ưu hóa hiệu năng.
- Một điều tuyệt vời là mọi browser hiện nay đều có HTTP cache. Việc cần làm là đảm bảo rằng một response từ server cung cấp các HTTP header chính xác để chỉ cho 
browser về thời gian có thể lưu response.

![](https://images.viblo.asia/e64c3393-e9fd-4443-9e1d-0616206c0c3a.png)

- Khi server trả về response, nó cũng trả về một tập hợp các HTTP header, miêu tả nó như là content-type, length, caching directives, validate token,...
Ví dụ như hình trên, server trả về response bao gồm kích thước 1024-byte, chỉ cho client có thể lưu trữ trong 120s, validate token là "x234dff".

## Xác thực cached response với ETags.
- Giả sử sau 120s kể từ lần fetch ban đầu và Browser chuẩn bị một request mới cho cùng một resource. Đầu tiên Browser sẽ kiểm tra local cache để tìm response trước đó,
nhưng do response trước đó đã hết hạn nên Browser không thể sử dụng nó. Do đó, Browser có thể gửi request mới để fetch response mới. Tuy nhiên, điều này không hiệu quả vì
nếu dữ liệu không có sự thay đổi thì không có lý do gì để tải xuống cùng một thong tin đã có trong cache.
- Để giải quyết vấn đề trên, validate token (Etags) được sử dụng. Server sẽ generates và trả về một token tùy ý, thường là một hàm băm hoặc fingerprint của nội dung file. Client
không cần biết mã đó được tạo như thế nào, nó chỉ cần gửi mã đó đến server trong request. Nếu mã không thay đổi thì client không cần phải tải xuống gì cả.

	![](https://images.viblo.asia/d11b42a1-3237-4b19-bdbf-fc7ef0c21ab3.png)

- Trong ví dụ trên, client tự động cung cấp Etag token trong HTTP request header "If-None-Match". Server sẽ kiểm tra token dựa trên resource hiện tại. Nếu token không
có sự thay đổi, server sẽ trả về một response "304 Not Modified" để thông báo cho Browser biết response đã có trong cache không có sự thay đổi và có thể sử dụng nó trong 120s
nữa.
- Câu hỏi đặt ra là làm thế nào để nó hoạt động? Câu trả lời là chúng ta không phải làm gì cả, Browser sẽ thực hiện hết công việc đó. Điều cuối cùng cần làm là đảm bảo rằng server
đang cung cấp Etag token cần thiết. Cấu hình cờ cần thiết:  [file config](https://github.com/h5bp/server-configs)

## Cache-control
- Mỗi resource có thể định nghĩa cách cache của nó thông qua Cache-Control HTTP header.
- Cache-Control kiểm soát ai có thể cache response, trong điều kiện nào và trong thời gian bao lâu.
- Với vấn đề tối ưu hóa hiệu năng, request tốt nhất là một request không cần liên lạc với server, một local copy của response cho phép loại bỏ tất cả các độ trễ của mạng,
tránh phí dữ liệu cho việc truyền dữ liệu. Để đạt được điều này, HTTP cho phép server trả về Cache-Control để control như thế nào, trong bao lâu và Browser và các bộ
đệm trung gian khác có thể lưu trữ phản hồi riêng lẻ.

	![](https://images.viblo.asia/72a06fa0-4316-456c-9e84-0e1b517cb3f6.png)

### no-cache và no-store
- "no-cache": chỉ ra rằng response trả về không thể được sử dụng để đáp ứng request tiếp theo cho cùng một URL mà không cần kiểm tra trước với server nếu response đã
thay đổi. Kết quả lả nếu có validation token (Etag) hợp lệ, không có cache phát sinh để xác thực response được lưu trong cache, nhưng có thể loại bỏ tải xuống
nếu tài nguyên không thay đổi.
- "no-store": Không cho phép các Browser và tất cả các bộ nhớ cache trung gian lưu trữ bất kỳ version nào của response. Ví dụ, một bộ dữ liệu cá nhân hoặc ngân hàng riêng tư, mỗi
khi user request tài sản này, một request được gửi đến server và response đầy đủ được tải xuống.

### public và private
- pubic: Response có thể được lưu vào cache ngay cả khi nó có HTTP authentication được liên kết và khi response status code không được lưu trong cache. Hầu hết thời gian "public" là
không cần thiết, bởi vì thông tin cache rõ ràng chỉ ra rằng response có thể được lưu trong cache.
- private: Browser có thể lưu trữ các response "private". Tuy nhiên, những response này thường dành cho một user, do đó cache trung gian không được phép lưu. Ví dụ:
Browser của người dùng có thể lưu trữ trang HTML với thông tin người dùng riêng tư, nhưng CDN không thể lưu trữ trang.

### max-age
- Chỉ định thời gian tối đa tính bằng giây mà response được phép sử dụng lại từ thời điểm request. Ví dụ max-age = 60 chỉ ra rằng response có thể được lưu trữ và sử dụng lại trong
60s tiếp theo.

## Invalidating và updating cached response
- Tất cả các request HTTP mà Browser thực hiện trước tiên được chuyển đến cache của Browser để kiểm tra xem có response được lưu trong cache hợp lệ có thể được sử dụng để đáp ứng request
hay không. Nếu có sự trùng khớp, response được đọc từ cache.
- Điều gì sẽ xảy ra nếu bạn muốn cập nhật hoặc làm mất hiệu lực của response được lưu trong cache? Ví dụ bạn đã cung cấp cho khách hàng lưu trữ kiểu CSS trong cache tối đa
24h, nhưng designer vừa commit một version cập nhật mới mà bạn muốn cung cấp cho tất cả người dùng. Làm thế nào để bạn thông báo cho tất cả khách hàng truy cập có bản sao
được lưu trong bộ nhớ cache của CSS để cập nhật bộ nhớ cache của họ? Bạn không thể, ít nhất là không thay đổi URL của resource.
- Sau khi Browser lưu response,version được lưu trong cache được sử dụng cho đến khi nó không còn mới như được xác định bởi max-age hoặc khi bị xóa khỏi cache.
- Làm thế nào để bạn có thể có được thứ tốt nhất từ cache của Browser và cập nhập nhanh? Bạn thay đổi URL của tài nguyên và buộc người dùng tải xuống response mới bất cứ
khi nào nội dung có sự thay đổi. Thông thường làm điều này bằng cách nhúng fingerprint hoặc version trong tên tệp của nó. Ví dụ như: style.x234dff.css

	![](https://images.viblo.asia/fc668125-c9e1-4857-b4c9-eee13ecf30f6.png)

- Khả năng xác định các chính sách lưu trữ trên mỗi resource cho phép bạn xác định "cache hierarchies" giúp kiểm soát không chỉ mỗi bộ nhớ cache trong bao lâu, mà còn cả
client truy cập xem các version mới nhanh như thế nào. Như ví dụ trên:
	+ HTML: Được đánh dấu là "no-cache", có nghĩa là Browser luôn xác nhận lại tài liệu theo từng request và fetch version mới nhất nếu nội dung thay đổi. Ngoài ra
trong HTML còn có fingerprint vào URL cho các tài sản CSS và JavaScript: nếu nội dung của các tệp thay đổi thì HTML cũng thay đổi và bản sao của HTML response được tải
xuống.
	+ CSS: được phép lưu vào cache của Browser và cache trung gian (Ví dụ CDN) và được đặt hết hạn sau 1 năm. Nếu CSS thay đổi thì URL cũng sẽ thay đổi.
	+ JavaScript: Cũng được thiết lập hết hạn sau 1 năm, nhưng được control là private.
	+ Photo: Được lưu vào cache mà không có version hoặc fingerprint và hết hạn sau 1 ngày.

## Android OkHttp cache work
- Trong phần trên chúng ta đã hiểu về HTTP cache, tiếp theo chúng ta xem cách nó hoạt động như thế nào?
- Đây là sơ đồ cách hoạt động của OkHttp Cache.

	![](https://images.viblo.asia/bc8b7783-7483-4ad9-bdbb-9412c34b0970.png)

- Việc thực hiện Cache response với OkHttp3 chúng ta chỉ cần tạo vùng nhớ cache để lưu, bởi vì trong OkHttp3 đã hỗ trợ tất cả rồi.
- Enable cache:
 
	![](https://images.viblo.asia/bb2bc0f3-0d5f-427c-9b73-a9e3514560f2.png)

- Nó sẽ làm việc thế nào? Chúng ta không phải làm gì cả, nó sẽ tự động phân tích header liên quan đến cache từ server và lưu response vào cache.

### How to make it works offline?
- Server trả về max-age để nói cho OkHttp biết rằng có thể lưu trữ response và sử dụng offline.
- Nếu max-age không có sẵn hoặc hết hạn nhưng bạn vẫn muốn sử dụng local data, bạn có thể sử dụng CacheControl.FORCE_CACHE. Lúc này flow hoạt động trở thành:

	![](https://images.viblo.asia/5fa21d60-3e93-4bb4-9fbf-3e17de822360.png)

- Nếu bạn luôn muốn sử dụng local cache khi không có Internet:

	![](https://images.viblo.asia/ba8c753d-7fe2-4494-be83-6a458cd971f7.png)
### Có nên sử dụng OkHttp để lưu data?
- Đó là một ý tưởng tồi, bởi vì data luôn phải có sẵn trong khi đó cache có thể có hoặc không.

## Nguồn tham khảo.
- [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- [How does Android OkHttp cache work?](https://medium.com/@I_Love_Coding/how-does-okhttp-cache-works-851d37dd29cd)