Giả mạo là một loại tấn công mạng, kẻ tấn công cố gắng mạo danh người dùng, thiết bị hợp pháp, nhằm khởi động một số cuộc tấn công mạng.

Các hình thức giả mạo phổ biến:
* Giả mạo DNS server: Sửa đổi DNS server để chuyển hướng domain đến một IP khác, thường dùng để phát tán virus.
* Giả mạo ARP - Xảy ra ở cấp liên kết dữ liệu, liên kết địa chỉ MAC của kẻ tấn công với một IP hợp pháp thông qua ARP message, thường dùng trong cuộc tấn công DoS (Denial-of-Service) và MITM (Man-in-the-Middle).

![MAC spoofing](https://images.viblo.asia/d7912d0c-2c10-4632-bdf8-06b4f9bc1ef6.png)

* Giả mạo IP - Xảy ra ở câp độ mạng, kẻ tấn công ngụy trang Source IP của họ, thường dùng trong cuộc tấn công DoS và DDoS (Distributed Denial-of-Service).
* Giả mạo email: Nếu nhấp vào một liên bất thường trong email, bạn có thể bị giả mạo.

Giả mạo IP là phổ biến nhất, bài viết này nhằm tìm hiểu chi tiết về hình thức này.
## 1. Giả mạo IP là gì?
![IPv4 Packet Headers](https://images.viblo.asia/b06c0c39-5f8d-419c-af4b-d094b09d156e.png)

Mạng máy tính giao tiếp thông qua các gói dữ liệu. Mỗi gói này chứa nhiều header, một trong số đó được gọi là "Source IP Address", chứa thông tin IP của đối tượng gửi.

Giả mạo IP là hành vi sửa đổi nội dung Source IP header với các số ngẫu nhiên, nhằm che dấu danh tính, mạo danh hệ thống khác, hoặc khởi tạo một cuộc tấn công. 

Thông qua giả mạo IP, kẻ tấn công có thể chuyển hướng phản hồi, dễ dàng đánh cắp và sử dụng dữ liệu người dùng, làm quá tải hoặc gián đoạn server, ngoài ra còn có thể lây nhiễm các phần mềm độc hại.

Kẻ tấn công thường giả mạo nhiều Source IP ngẫu nhiên để gây khó khăn khó khăn cho việc ngăn chặn các cuộc tấn công vì gây hiểu lầm rằng chúng xuất phát từ nhiều nguồn.

Giả mạo IP hầu hết là tiêu cực, có một số ít hợp pháp.
## 2. Các hình thức giả mạo IP
![IP Spoofing](https://images.viblo.asia/f13b5a24-848f-4942-be59-e61fdc53fe67.png)

Kẻ tấn công có thể dễ dàng phát hiện ra việc hệ thống chỉ dùng IP để xác thực và vượt qua chúng một cách đơn giản với giả mạo IP, việc sử dụng xác thực đơn giản như vậy cần được thay thế bằng các phương pháp mạnh mẽ hơn, như xác thực nhiều bước.

Các thiết bị và mạng bị tấn công rất khó để biết rằng chúng đã bị xâm nhập. Giả mạo IP là làm cho hệ thống tin rằng gói tin là từ nguồn đáng tin cậy và chấp nhận nó.

Mọi thiết bị có khả năng kết nối với Internet đều có IP là một định danh duy nhất. Truyền dữ liệu trên Internet được tạo thành từ nhiều gói dữ liệu và mỗi gói chứa nhiều IP header, header chia sẻ thông tin định tuyến về gói tin, bao gồm Source IP và Destination IP. Source IP có thể được thay bằng IP giả mạo. Kẻ tấn công thực hiện hành vi này bằng cách chặn một gói tin và sửa đổi trước khi gửi đi. Điều này làm cho IP có vẻ như từ một nguồn đáng tin cậy nhưng thực tế đang che dấu IP của một bên thứ ba không xác định.

Giả mạo IP cho phép kẻ tấn công che giấu danh tính thực và lừa hệ thống rằng chúng đang tương tác với một nguồn đáng tin cậy, trong khi đó lại đang tương tác với tội phạm mạng.

**Hai cuộc tấn công tiêu biểu có thể được khởi tạo thông qua giả mạo IP:**
* Tấn công DDoS là hành vi nhằm làm chậm hoặc sập server. Khả năng giả mạo IP của các gói tin là một lỗ hổng bị nhiều cuộc tấn công DDoS khai thác. Để giữ cho cuộc tấn DoS hoặc DDoS không bị phát hiện, giả mạo IP thường được sử dụng để ngụy trang nguồn gốc của các cuộc tấn công và gây khó khăn cho việc truy tìm nguồn gốc và ngăn chặn chúng.
* Tấn công MITM chặn các gói tin được gửi giữa các các hệ thống, thay đổi các gói và sau đó gửi chúng đến đích đã định, hệ thống gửi và nhận không biết rằng liên lạc của chúng đã bị giả mạo mà vẫn tiếp tục, trong khi quá trình truyền bị nghe trộm toàn bộ. Theo thời gian, kẻ tấn công thu thập vô số thông tin nhạy cảm mà họ có thể sử dụng để đánh cắp danh tính hoặc bán.
## 3. Ngăn chặn giả mạo IP
Rất khó để phát hiện giả mạo IP, do đó nên thực hiện các biện pháp để ngăn các gói giả mạo xâm nhập vào mạng.

**Nhà phát triển:**
* Các nhà phát triển web được khuyến khích chuyển các trang web sang IPv6. Nó giúp việc giả mạo IP khó hơn bằng cách bao gồm các bước mã hóa và xác thực. Hầu hết lưu lượng truy cập Internet trên thế giới vẫn sử dụng giao thức IPv4.
* Một biện pháp bảo vệ rất phổ biến chống lại sự giả mạo là lọc xâm nhập. Đây là một kỹ thuật mạng máy tính giúp đảm bảo các gói đến là từ các nguồn đáng tin cậy, không phải là kẻ tấn công. Điều này được thực hiện bằng cách xem Source IP header của gói tin. Theo cách tương tự, lọc đầu ra có thể được sử dụng để giám sát và hạn chế lưu lượng gửi đi hoặc các gói không có Source IP header hợp pháp và không đáp ứng các chính sách bảo mật.
* Sử dụng danh sách kiểm soát truy cập để từ chối các IP riêng tư. Giám sát mạng cho hoạt động không bất thường.
* Sử dụng các phương pháp xác thực mạnh mẽ cho tất cả các truy cập để ngăn chặn việc chấp nhận các gói giả mạo. Sử dụng xác thực dựa trên trao đổi khóa giữa các máy trong mạng sẽ cắt giảm đáng kể nguy cơ giả mạo.

**Người dùng cuối:**
* Việc phát hiện giả mạo IP là gần như không thể. Tuy nhiên, có thể giảm thiểu nguy cơ bị các loại giả mạo bằng cách sử dụng các giao thức mã hóa an toàn như HTTPS và đảm bảo rằng biểu tượng ổ khóa luôn xuất hiện trước URL truy cập.
* Tránh lướt web trên WiFi công cộng, không có mật khẩu. Bảo mật mạng WiFi gia đình bằng cách cập nhật tên người dùng và mật khẩu mặc định trên bộ định tuyến bằng một mật khẩu mạnh.
## 4. Tổng kết
Giả mạo IP là một công cụ được tội phạm mạng sử dụng để mạo danh mạng hoặc thiết bị hợp pháp, khởi tạo các cuộc tấn công DDoS và Man-in-the-Middle nhằm làm gián đoạn server hoặc đánh cắp dữ liệu nhạy cảm. Mặc dù rất khó phát hiện giả mạo IP, nhưng có nhiều giải pháp có thể giúp ngăn chặn các gói tin giả mạo xâm nhập vào hệ thống. Sự kết hợp giữa giám sát mạng, lọc gói tin và các phương pháp xác thực mạnh sẽ giảm tối đa nguy cơ giả mạo IP.

Giả mạo IP hợp pháp hay không được xác định phụ thuộc vào mục đích sử dụng của chúng.

**Tham khảo:**
* [IP Spoofing](https://www.imperva.com/learn/ddos/ip-spoofing/)
* [What is IP Spoofing?](https://www.cloudflare.com/learning/ddos/glossary/ip-spoofing/)
* [IP spoofing: What is it and how does it work?](https://us.norton.com/internetsecurity-malware-ip-spoofing-what-is-it-and-how-does-it-work.html)
* [What Is IP Spoofing and How to Prevent It?](https://www.venafi.com/blog/what-ip-spoofing-and-how-prevent-it)
* [ What is IP spoofing? And 5 ways to prevent it](https://www.csoonline.com/article/2115848/data-protection-ip-spoofing.html)