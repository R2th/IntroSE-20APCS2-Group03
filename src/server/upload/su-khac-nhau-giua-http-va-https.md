# HTTP vs HTTPS
Nhiều trang web sử dụng HTTP. Tuy nhiên, vào năm 2014,[ Google khuyên các trang web chuyển sang HTTPS](https://searchengineland.com/google-starts-giving-ranking-boost-secure-httpsssl-sites-199446) . Cho đến lúc đó, chỉ các trang web thương mại điện tử mới thực sự thấy phiền khi sử dụng HTTPS. Để khuyến khích chuyển đổi, Google đã thông báo rằng họ sẽ cung cấp các trang web HTTPS với một số thứ hạng nhỏ (**providing HTTPS sites with a minor rankings bump**) , có hiệu lực trừng phạt các trang web không chuyển đổi, bằng cách tạo lợi thế cho các đối thủ cạnh tranh.

Bây giờ bạn có thể tự hỏi - tại sao nó lại quan trọng đến mức bạn chuyển sang HTTPS? Có thực sự cần phải dùng không? **Sự khác nhau giữa HTTP và HTTPS là gì?**
## Các khái niệm cơ bản
Điều đầu tiên chúng ta nên hiểu **HTTP và HTTPS thực sự là gì**. Sẽ rất khó để hiểu tác động của việc chuyển đổi từ cái này sang cái khác hoặc cách chọn giữa HTTP và HTTPS mà không có sự hiểu biết chung về cả hai.
### HTTP là gì?
![](https://images.viblo.asia/2f11a9f7-96d4-4cc7-8bf5-aa5042eda309.png)

**HTTP** là tên viết tắt của **HyperText Transfer Protocol** (*giao thức truyền tải siêu văn bản*), là một giao thức cơ bản dùng cho **World Wide Web** (*www*) để truyền tải dữ liệu dưới dạng văn bản, hình ảnh, video, âm thanh và các tập tin khác từ Web server đến các trình duyệt web và ngược lại.
### HTTPS là gì?
![](https://images.viblo.asia/4aa8124d-9b44-4db6-b1b6-81c758627b0b.png)

**HTTPS** là viết tắt của **Hypertext Transfer Protocol Secure**. Vấn đề với giao thức HTTP thông thường là thông tin từ máy chủ đến trình duyệt không được mã hóa, có nghĩa là nó có thể dễ dàng bị đánh cắp . Giao thức HTTPS khắc phục điều này bằng cách sử dụng chứng chỉ **SSL (lớp cổng bảo mật)** , giúp ***tạo kết nối được mã hóa an toàn*** giữa máy chủ và trình duyệt, từ đó bảo vệ thông tin nhạy cảm bị đánh cắp khi thông tin được chuyển giữa máy chủ và trình duyệt.
### HTTP và HTTPS hoạt động như thế nào ?
![](https://images.viblo.asia/7793529c-7485-4147-a44a-6b3ea9ebb2f4.jpg)
HTTP hoạt động trên mô hình Client (máy khách) –Server (máy chủ). Các máy khách sẽ gửi yêu cầu đến máy chủ và chờ sự hồi đáp của máy chủ. Để có thể trao đổi thông tin được với nhau, các mảy chủ và máy khách phải thực hiện trên một giao thức thống nhất, đó chính là HTTP.

Nói dễ hiểu hơn khi bạn nhập một địa chỉ web và ấn Enter, một lệnh HTTP sẽ được gửi lên máy chủ để yêu cầu tìm website bạn đã nhập. Sau khi máy chủ nhận được yêu cầu , nó sẽ trả lại tìm đến website được yêu cầu đó, và trả lại kết quả cho bạn bằng việc hiển thị website đó lên trình duyệt web của bạn. Quá trình này diễn ra nhanh hay chậm tùy thuộc vào tốc độ Internet của bạn.

HTTPS hoạt động tương tự như HTTP nhưng được bổ sung thêm SSL và giao thức TSL. Các giao thức này đảm bảo rằng không ai khác ngoài các máy khách và máy chủ có thể hack thông tin, dữ liệu ra ngoài. Cho dù bạn sử dụng máy tính cá nhân hay công cộng đi chăng nữa, các chứng chỉ SSL vẫn đảm bảo thông tin liên lạc của máy khách với máy chủ luôn được an toàn và chống bị dòm ngó.
### Sự khác nhau giữa HTTP và HTTPS
![](https://images.viblo.asia/af4f37a2-aa59-4e2d-b623-fa49809986f4.png)

Sự khác biệt quan trọng nhất giữa hai giao thức là **chứng chỉ SSL** . Trong thực tế, HTTPS về cơ bản là một giao thức HTTP với bảo mật bổ sung. Tuy nhiên, bảo mật bổ sung này có thể cực kỳ quan trọng, đặc biệt là đối với các trang web có dữ liệu nhạy cảm từ người dùng, chẳng hạn như thông tin thẻ tín dụng và mật khẩu .

**Ngoài ra**
* **HTTP** sử dụng số **cổng 80** để giao tiếp và sử dụng **HTTPS 443**
* HTTP được coi là không an toàn và HTTPS an toàn
* HTTP hoạt động ở tầng ứng dụng và HTTPS hoạt động ở tầng giao vận
* HTTP không yêu cầu bất kỳ chứng chỉ nào và HTTPS cần chứng chỉ SSL

### Các chuyển đổi sang HTTPS
1. Mua chứng chỉ SSL và địa chỉ IP chuyên dụng từ các công ty cung cấp host cho bạn
2. Cài đặt và định cấu hình chứng chỉ SSL.
3. Thực hiện sao lưu toàn bộ trang web của bạn trong trường hợp bạn cần trở lại trạng thái ban đầu
4. Cấu hình bất kỳ liên kết hard internal nào trong trang web của bạn, từ HTTP sang HTTPS.
5. Cập nhật các thư viện code của bạn, chẳng hạn như JavaScript, Ajax và bất kỳ plugin của bên thứ ba nào.
6. Chuyển hướng mọi liên kết bên ngoài mà bạn kiểm soát sang HTTPS, chẳng hạn như danh sách thư mục.
7. Cập nhật các [htaccess](https://httpd.apache.org/docs/current/howto/htaccess.html), như Apache Web Server, [LiteSpeed](https://www.litespeedtech.com/), [NGinx Config](http://nginx.org/en/docs/beginners_guide.html) và chức năng quản lý dịch vụ internet của bạn (chẳng hạn như Windows Web Server), để redirect từ HTTP sang HTTPS.
8. Nếu bạn đang sử dụng [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), hãy cập nhật cài đặt SSL của CDN.
9. Triển khai [301 redirects](https://moz.com/learn/seo/redirection) trên từng trang.
10. Cập nhật mọi liên kết bạn sử dụng trong các tool tự động hóa marketing, chẳng hạn như liên kết email.
11. Cập nhật bất kỳ trang đích và liên kết tìm kiếm nào có trả tiền.
12. Thiết lập trang web HTTPS trong [Google Search Console ](https://search.google.com/search-console/about?hl=en&utm_source=wmx&utm_medium=wmx-welcome)và [Google Analytics](https://marketingplatform.google.com/about/analytics/).
## Lời kết
HTTPS hiển nhiên là an toàn hơn so với HTTP rất nhiều trong việc mã hóa dữ liệu, bảo mật thông tin cá nhân. Tuy nhiên ưu điểm của HTTP là tốc độ phản hồi của website truy cập nhanh hơn HTTPS rất nhiều và được sử dụng cho các trang tin tức cần thông tin nhanh, còn phải nhập dữ liệu như tài khỏa ngân hàng, email cá nhân thì nên sử dụng HTTPS. Ngoài ra chúng ta cũng dễ dàng nhận biết với biểu tượng khóa ở thanh địa chỉ để phân biệt website đó có sử dụng HTTPs hay không.

**Nguồn tham khảo:**

https://viettelidc.com.vn/tin-tuc/su-khac-nhau-giua-http-va-https

https://www.entrepreneur.com/article/281633

https://seopressor.com/blog/http-vs-https/