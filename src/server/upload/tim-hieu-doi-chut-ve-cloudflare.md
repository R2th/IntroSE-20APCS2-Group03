![](https://images.viblo.asia/55067432-ccf2-4b6f-84a2-f4265ec90091.png)


Cloudflare là một dịch vụ bảo mật Internet và các dịch vụ phân phối máy chủ tên miền, đứng giữa khách truy cập và nhà cung cấp dịch vụ lưu trữ của người dùng, hoạt động như một reverse proxy cho các trang web.
### 1. CloudFlare là gì?

>CloudFlare là dịch vụ DNS trung gian, giúp điều phối lượng truy cập giữa máy chủ và các client qua lớp bảo vệ CloudFlare. 

Với cloudflare thay vì bạn truy cập trực tiếp vào Website thông qua máy chủ phân giải tên miền DNS (Domain Name Server) thì bạn sẽ sử dụng máy chủ phân giải tên miền của CloudFlare. Các truy cập sẽ phải đi qua máy chủ của CloudFlare để xem dữ liệu website thay vì truy cập trực tiếp.

**Về tính năng:**
- CloudFlare  cung cấp certificate SSL miễn phí và tuỳ chỉnh với tất cả các gói của họ. Các gói miễn phí và chuyên nghiệp chỉ cho phép bạn sử dụng certificate đã được cấp bởi CloudFlare. Đối với certificate tùy chỉnh, bạn sẽ cần phải nâng cấp lên gói Business hoặc Enterprise.
- Mặc dù CloudFlare cung cấp một lựa chọn miễn phí là CDN. 
- CloudFlare không cung cấp dịch vụ quét máy chủ để phát hiện malware. Nó cũng không bảo đảm loại bỏ malware nếu bạn bị tấn công trước sự theo dõi của họ.

**Về giá cả:**

- Đối với Cloudflare, bạn có thể sử dụng gói Pro với chi phí 20$/tháng.
- Đối với những tính năng: các biện pháp chống DDoS tiên tiến và custom SSL, bạn sẽ cần gói business của họ với chi phí 200$/tháng.

### 2. Ưu và nhược điểm của Cloudflare
![](https://images.viblo.asia/ed449865-6a20-456b-a8dd-1810e91e3ff4.jpg)
Theo như hình ảnh phần network thì Viblo cũng đang sử dụng cloudflare, phần địa chỉ IP của máy chủ đã bị ẩn đi.

**Ưu điểm:**
- Bảo vệ và chống lại những truy cập độc hại: CloudFlare còn có nhiều dịch vụ khác nữa về CDN, SPDY, tường lửa chống Ddos, Spam, Chứng chỉ số SSL, Forward Domain,… Tất cả các truy cập độc hại hay nói cách khác là các địa chỉ IP độc hại dựa sẽ được Cloudflare xét xem có được truy cập hay không, hoặc chặn hoàn toàn truy cập dựa trên cập độ bảo mật mà ta đã thiết lập trên trang web. Bạn cũng có thể cải thiện bảo mật website bằng cách sử dụng CloudFlare như sử dụng SSL miễn phí để thêm giao thức HTTPS cho website;
- Vì dữ liệu trang web của bạn được lưu trong bộ nhớ cache trên mạng Cloudflare, khi truy cập trang web sẽ tải trang web của bạn từ trung tâm dữ liệu Cloudflare gần nhất, điều này sẽ giảm độ trễ, thay vì phải tải trực tiếp từ máy chủ của bạn.
- Ngoài ra, CloudFlare còn giúp tiết kiệm băng thông cho máy chủ vì hạn chế truy trực trực tiếp vào máy chủ.

**Nhược điểm:**
- Nếu cài đặt Cloudflare tại máy chủ có hosting tại Việt Nam thì tốc độ tải trang sẽ bị chậm đi. Bởi vì truy cập sẽ đi vòng từ Việt Nam đến DNS Server của CloudFare rồi mới trả kết quả về Việt Nam.
- Cloudflare có ưu điểm là sẽ không ai biết được IP của máy chủ của bạn, tuy nhiên điều này cũng tạo nên lỗ hổng. Nếu như website của bạn không được bảo mật cao, thì sẽ bị tấn công bởi nhiều cách khác nhau. Và hiển nhiên là bạn cũng sẽ không bao giờ biết được IP của máy đã tấn công website của bạn.
- Đôi lúc Firewall của hosting mà website bạn đang đặt hiểu lầm dải IP của CloudFlare là địa chỉ tấn công. Rất có thể website của bạn bị offline.

.....

### 3. Đăng ký sử dụng Cloudflare
Cài đặt CloudFlare qua các bước như sau:
Đầu tiên các bạn truy cập vào trang chủ của CloudFlare:  [Trang chủ cloudflare](https://cloudflare.com/)

- Các bạn đăng ký tài khoản cloudflare:
![](https://images.viblo.asia/dece1833-f4f6-4b0f-8699-eb63848b68d2.png)
- Sau đó chúng ta cần thêm website của mình:
![](https://images.viblo.asia/8e24d9de-1c63-469e-b624-873a4fddb577.png)
- Chọn gói dịch vụ, ở đây mình test nên chọn gói miễn phí:
![](https://images.viblo.asia/31aef27f-9b24-47ee-9a1b-2f901d39acd7.png)
- Sau đó sẽ kiểm tra lại DNS mà cloudflare quét từ tên miền của mình.
![](https://images.viblo.asia/cf60120f-3def-428f-8232-69bff10f1bc3.png)
- Trỏ cặp nameservers về CloudFlare
![](https://images.viblo.asia/6f8ea988-be21-4c8a-8b3a-2905a46c2a24.png)
- Done, và đây là màn hình dashboard quản lý tên miền của bạn với CloudFlare
![](https://images.viblo.asia/56cf64e4-0a4c-4bce-99f0-28f72b5a938f.png)

### 4. Tạm kết
Ở bài viết này, chúng ta có thể biết được cơ bản về CloudFlare. Ở các bài viết sau mình sẽ chia sẻ chi tiết về việc triển khai và sử dụng nó cho website của mình. Các bạn hãy theo dõi phần sau nhé :relaxed::wink:

![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)