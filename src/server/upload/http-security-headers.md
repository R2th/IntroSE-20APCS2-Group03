# What are HTTP Security Headers?
![](https://images.viblo.asia/ea8dfce1-7451-4d85-9191-0b431f6d7de7.png)

HTTP headers được web client và web server sử dụng để chia sẻ thông tin như một phần của giao thức HTTP. Khi người dùng truy cập một website thông qua trình duyệt, trình duyệt sẽ gửi một HTTP request chứa client headers, server sẽ phản hồi với HTTP response chứa các server headers. Các headers này cung cấp cho trình duyệt cách giao tiếp với website. Headers chủ yếu bao gồm metadata. Metadata được xử lý độc quyền bởi trình duyệt web và đã được đưa vào giao thức HTTP kể từ phiên bản 1.0.

HTTP Security Headers là các HTTP response headers xác định các biện pháp bảo mật nên được kích hoạt hay vô hiệu hóa trên trình duyệt web. HTTP Security Headers là một phần cơ bản của bảo mật website, giúp chống lại các cuộc tấn công mà website có nguy cơ gặp phải cao như:  **MIME types, clickjacking, code injection, XSS**...

Trong bài viết này, đưa ra các HTTP headers quan trọng nhất nên cấu hình trên web server để nâng cao bảo mật cho website. Chúng ta sẽ tìm hiểu vai trò của từng header là gì và những cuộc tấn công nào có thể được thực hiện khi cấu hình sai header đó.  Dưới đây là **5 Security Headers** sẽ cung cấp cho website một số bảo vệ rất cần thiết.
### 1. HTTP Strict Transport Security (HSTS)

![](https://images.viblo.asia/6e16a3f8-479e-4f79-8757-b1de7081b7d4.png)
Như tên cho thấy, HSTS là một cơ chế buộc các trình duyệt sử dụng kết nối web an toàn.

Nếu một trang web được trang bị HSTS, sever sẽ buộc trình duyệt giao tiếp qua HTTPS (HTTP Secure), đảm bảo tất cả thông tin từ trình duyệt được gửi qua HTTPS. Điều này ngăn chặn chuyển hướng request từ HTTP đến HTTPS.

Trước khi cấu hình header này, cần đảm bảo tất cả website có thể truy cập được qua HTTPS nếu không chúng sẽ bị chặn.

HSTS header được hỗ trợ trên tất cả các phiên bản mới nhất của trình duyệt như IE, Firefox, Opera, Safari và Chrome.

Có ba tham số cấu hình như sau:

- Max-age: Thời lượng (Tính bằng giây) để xác định thời gian được truy cập server chỉ thông qua HTTPS. Giá trị mặc định là 31536000 giây (1 năm). Đây là độ tuổi tối đa mà HSTS hợp lệ. Server cập nhật chúng với mọi response mới, do đó ngăn không cho nó hết hạn.

- IncludeSubDomains: Cấu hình subdomains, kiểm soát các subdomains của  website.

- Preload: Sử dụng nếu muốn đưa website vào danh sách preload. Đây là danh sách các trang web được mã hóa cứng vào Chrome. Sử dụng form [này](https://hstspreload.org/) để thêm. Danh sách này được duy trì bởi Google nhưng các trình duyệt khác cũng sử dụng nó. Danh sách preload có thể được tìm thấy ở [đây](https://chromium.googlesource.com/chromium/src/+/master/net/http/transport_security_state_static.json).

Nguy cơ tấn công: Nếu không kích hoạt HSTS, khi nạn nhân kết nối với Wi-Fi mở nằm trong sự kiểm soát của kẻ tấn công, sau đó truy cập một website qua HTTP sẽ cho phép kẻ tấn công chặn request và đọc thông tin gửi lên server. Nếu người dùng đã truy cập website trước đó, các HSTS headers được lưu trong trình duyệt tự động kết nối server qua HTTPS.

**Cú pháp:**
```
Strict-Transport-Security: max-age=max-age=
Strict-Transport-Security: max-age=; includeSubDomains
Strict-Transport-Security: max-age=; preload
```
**Ví dụ:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
### 2. Content Security Policy (CSP)
![](https://images.viblo.asia/103e997f-b4e6-41b1-83a9-b51245dafe91.png)

CSP cung cấp cho quản trị viên kiểm soát website bằng cách hạn chế tài nguyên mà người dùng được phép tải trong website. Có thể đưa whitelist vào nội dung của website. Nếu được triển khai đúng cách, header này sẽ ngăn chặn việc khai thác Cross-Site Scripting (XSS) , ClickJacking và HTML... Mặc dù không loại bỏ hoàn toàn các khả năng tấn công này, nhưng chắc chắn giảm thiểu thiệt hại. Hầu hết các trình duyệt chính đều hỗ trợ CSP.

Được giới thiệu vào tháng 11 năm 2012, CSP thêm một lớp bảo mật chống lại nhiều lỗ hổng bảo mật website. CSP sẽ trở thành công cụ quan trọng nhất cho bảo mật phía máy khách trong tương lai gần, vì nó có thể thay thế cho các tiêu đề bảo mật như: X-Frame-Options, X-XSS-Protection, là 2 cấu hình không được bật theo mặc định.

Tất cả các trình duyệt không hỗ trợ CSP, vì vậy cần xác minh trước khi triển khai.

Có nhiều tham số có thể thực hiện CSP. Tuy nhiên, chúng ta hãy xem 2 tham số được sử dụng nhiều nhất: 

- default-src: Tải mọi thứ từ một nguồn xác định.

- script-src: Chỉ tải các tập lệnh từ nguồn được xác định.

**Cú pháp:**
```
Content-Security-Policy: <policy-directive>; <policy-directive>
```
**Ví dụ:**
```
Content-Security-Policy: script-src 'self' https://viblo.asia
```
CSP này chỉ cho phép tải mọi thứ qua domain hiện tại hoặc qua https://viblo.asia.
### 3. Cross Site Scripting Protection (X-XSS)
![](https://images.viblo.asia/fed865f9-0db4-43d5-8cd4-a693f2bc4867.png)

X-XSS header bảo vệ chống lại các cuộc tấn công Cross-Site Scripting (XSS). Bộ lọc này nhằm phát hiện đầu vào HTML nguy hiểm và ngăn website tải hoặc xóa các tập lệnh độc hại.

X-XSS được bật trong Chrome, IE và Safari theo mặc định, nó có 4 chế độ:
 
- 0: Bộ lọc XSS bị vô hiệu hóa.

- 1: Bộ lọc XSS được kích hoạt và bảo vệ trang nếu phát hiện tấn công.

- 1;mode=block: Bộ lọc XSS được kích hoạt và ngăn chặn hiển thị trang nếu phát hiện tấn công.

- 1;report=https://viblo.asia: Bộ lọc XSS được kích hoạt và báo cáo vi phạm nếu phát hiện cuộc tấn công.

**Cú pháp:**
```
X-XSS-Protection: 0
X-XSS-Protection: 1
X-XSS-Protection: 1; mode=block
X-XSS-Protection: 1; report=<reporting-uri>
```
**Ví dụ:**
```
X-XSS-Protection: 1; mode=block; report=https://viblo.asia
```
### 4. X-Frame-Options
![](https://images.viblo.asia/b5b84a15-b48c-4f2a-b249-648bb5ba4816.png)

Một kỹ thuật giả mạo có tên là "Clickjacking" khá phổ biến. Trong kỹ thuật này, kẻ tấn công đánh lừa người dùng nhấp vào thứ gì đó không có ở website. Khi người dùng đang ở trên trang web chính thức, nhưng một luôn có một hành động đang chạy trong nền. Trong quá trình này, có thể những thông tin của người dùng đang bị đánh cắp. X-Frame-Options giúp bảo vệ chống lại hình thức tấn công kiểu này bằng cách vô hiệu hóa các iframe có trên website. Nói cách khác, nó không cho phép người khác nhúng nội dung của website.

Có 3 tùy chọn cho X-FrameOptions:

- SAMEORIGIN: Iframe trong website chỉ được phép từ cùng một nguồn gốc.

- DENY:	Ngăn chặn bất kỳ tên miền nào nhúng nội dung vào website bằng cách sử dụng iframe.

- ALLOW-FROM: Chỉ cho phép iframe trên URI cụ thể.

Nguy cơ tấn công: Kẻ tấn công thể lừa người dùng truy cập một website độc hại, một iframe vô hình được cài sẵn. Khi người dùng nhấp vào iframe, các các thông tin bị đánh cắp và được gửi đến server khác. Do đó, người dùng sẽ nhấp vào các tùy chọn trái phép, dẫn đến việc thực hiện một số hành động không mong muốn như: Xóa tài khoản...

**Cú pháp:**
```
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
X-Frame-Options: ALLOW-FROM https://viblo.asia
```
### 5. X-Content-Type-Options
![](https://images.viblo.asia/1e72cd37-af61-4170-a546-638c9d7b9bd6.png)

X-Content-Type header cung cấp biện pháp ngăn chặn rủi ro bảo mật loại MIME. Nó hướng dẫn trình duyệt theo các loại MIME được chỉ định trong tiêu đề. Nếu Nếu header này trống hoặc bị thiếu, trình duyệt phân tích nội dung và hiển thị theo cách phù hợp nhất.

X-Content-Type hoạt động như sau:

(1) Trình duyệt web request một tập tin. Server sẽ response một tệp với X-Content-Type header.

(2) Trình duyệt phân tích tệp này xác định định dạng tệp.

(3) Sau khi thực hiện phân tích, trình duyệt sẽ so sánh kết quả với kết quả được gửi bởi máy chủ. Nếu có sự không phù hợp, trình duyệt sẽ sử dụng định dạng đã xác định.

=> Điều này có thể dẫn đến một lỗ hổng bảo mật. Để ngăn trình duyệt phân tích nội dung của trang và quyết định sử dụng loại MIME nào, hãy sử dụng tiêu đề X-Content-Type-Options với chỉ thị nosniff 

Nguy cơ tấn công:  Website cho phép người dùng tải lên một tệp hình ảnh và xác nhận phần mở rộng của nó. Người dùng tải lên một tệp hình ảnh với phần mở rộng jpg hoặc png nhưng tệp này có chứa mã HTML độc hại. Trình duyệt sẽ xác định tệp là HTML và thực thi trong trình duyệt.

Header này dành riêng cho trình duyệt IE và Chrome.

**Cú pháp:**
```
X-Content-Type-Options: nosniff
```
*Thank you for reading!*

**Tham khảo:**

[HTTP Security Headers: 5 Headers You Must Implement on Your Site](https://www.thesslstore.com/blog/http-security-headers/)

[Essential HTTP Headers for Securing Your Web Server](https://pentest-tools.com/blog/essential-http-security-headers/)

[Whitepaper: HTTP Security Headers and How They Work](https://www.netsparker.com/whitepaper-http-security-headers/)

[How to Implement Security HTTP Headers to Prevent Vulnerabilities?](https://geekflare.com/http-header-implementation/)