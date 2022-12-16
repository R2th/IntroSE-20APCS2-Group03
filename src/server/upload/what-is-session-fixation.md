Session Fixation là một kỹ thuật tấn công web. Kẻ tấn công lừa người dùng sử dụng session ID đặc biệt. Sau khi người dùng đăng nhập vào ứng dụng web bằng session ID được cung cấp, kẻ tấn công sử dụng session ID hợp lệ này để giành quyền truy cập vào tài khoản của người dùng.
## 1. Session Identifiers: Ưu, nhược điểm
Session identifiers (session ID) được sử dụng để xác thực người dùng trong các ứng dụng web. Công nghệ này có cả ưu và nhược điểm nhất định.

Ưu điểm: Nếu không có session ID, người dùng sẽ phải đăng nhập vào các ứng dụng web thường xuyên hơn thay vì một lần trong một phiên làm việc.

![](https://images.viblo.asia/772d5bde-b90c-4444-bdfd-9f0d2896e576.png)

Nhược điểm:
- Session ID có điểm yếu giống như mật khẩu: Nếu có được nó thì có thể truy cập vào tài khoản, là nền tảng để tiến hành các cuộc tấn công tiếp theo, thuận lợi cho [privilege escalation](https://www.acunetix.com/blog/web-security-zone/what-is-privilege-escalation/).
- Những kẻ tấn công cố gắng tấn công người dùng theo bất cứ hình thức nào mà họ có thể thực thi, có thể sử dụng social engineering, phishing và các biện pháp khác. Có một vài hình thức liên quan đến sessions. Với session hijacking là lấy session ID từ người dùng đã đăng nhập (Ví dụ: sử dụng [man-in-the-middle](https://www.acunetix.com/blog/articles/man-in-the-middle-attacks/)). Nhưng với session fixation, mọi thứ sẽ đảo ngược: Nạn nhân nhận được session ID và bị lừa đăng nhập bằng với session ID này, điều này cho phép kẻ tấn công chiếm phiên của người dùng.
## 2. Cách thức hoạt động của cuộc tấn công Session Fixation
![](https://images.viblo.asia/8edbf2b6-9e01-4f3c-a8ef-331c8f087114.png)

Một cuộc tấn công session fixation điển hình được thực hiện như sau:
1. Kẻ tấn công truy cập trang đăng nhập và nhận session ID do ứng dụng web tạo ra. Bước này có thể bỏ quá nếu ứng dụng chấp nhận session ID bất kì.
2. Kẻ tấn công sử dụng một kỹ thuật như [CRLF Injection](https://www.acunetix.com/websitesecurity/crlf-injection/), [man-in-the-middle attack](https://www.acunetix.com/blog/articles/man-in-the-middle-attacks/), social engineering... và khiến nạn nhân sử dụng session ID được cung cấp. Điều này phụ thuộc vào cách ứng dụng web xử lý các session ID. Có thể đơn giản như gửi một URL độc hại hay phức tạp hơn là tạo một website giả mạo.
3. Nạn nhân truy cập trang đăng nhập và đăng nhập vào ứng dụng. Sau khi xác thực, ứng dụng web nhận dạng người dùng qua session ID.
4. Kẻ tấn công sử dụng mã session ID để truy cập ứng dụng web, chiếm phiên và mạo danh nạn nhân. Các hành động tiếp theo phụ thuộc vào kẻ tấn công và tính năng ứng dụng web.

Các giai đoạn chính xác của cuộc tấn công và độ khó của nó phụ thuộc vào một vài yếu tố. Phần lớn là cách nhà phát triển xử lý các session ID. Nếu chấp nhận session ID từ URL (Thông qua một GET request) thì cuộc tấn công rất đơn giản. Nếu chấp nhận session ID từ POST request, kẻ tấn công có thể phải tạo một website giả mạo. Sẽ phức tạp hơn (Nhưng không phải là bất khả thi) nếu các session ID chỉ được chấp nhận từ cookie. Khi đó, kẻ tấn công phải sử dụng thêm vài kỹ thuật trung gian (Ví dụ: [Cross-site Scripting (XSS)](https://www.acunetix.com/websitesecurity/cross-site-scripting/)).
## 3. Biện pháp chống lại Session Fixation
Nguyên nhân chủ yếu của session fixation là ứng dụng web thiếu bảo mật và các phương pháp lập trình khômg tốt liên quan đến phần quản lý session:
- Trường hợp tệ nhất, nhà phát triển không kiểm tra tính hợp lệ của session ID. Do đó, bất kỳ chuỗi nào (Hoặc chỉ cần thỏa mãn format nào đó) có thể được cung cấp làm session ID. Điều này làm cho các cuộc tấn công session fixation trở nên quá dễ dàng.
- Thông thường, các nhà phát triển chỉ tạo ra session ID trước khi người dùng đăng nhập và không bao giờ thay đổi nó. Đây là nguyên nhân điển hình của các cuộc tấn công session fixation.
- Nếu nhà phát triển chấp nhận ID phiên từ GET hoặc POST request, chúng sẽ khiến kẻ tấn công dễ dàng hơn trong việc cưỡng chế một session ID cho người dùng.

Có một số biện pháp để tránh session fixation:
- Phương pháp hiệu quả nhất là thay đổi session ID ngay sau khi người dùng đăng nhập. Điều này giúp loại bỏ hầu hết các lỗ hổng session fixation.
- Một biện pháp đối phó bổ sung là thay đổi session ID nếu có nghi ngờ về hành vi sai trái tiềm ẩn. Ví dụ: Có thể kiểm tra xem địa chỉ IP hoặc `user-agent` của client có thay đổi hay không và nếu có thì cung cấp session ID mới.
- Nên vô hiệu hóa session ID sau khi hết thời gian chờ. Điều này làm cho kẻ tấn công không có cơ hội lợi dụng session ID cố định. Ví dụ: Sau 10 phút không có hoạt động nào sẽ tự động đăng xuất. 
- Có thể thay đổi session ID với mọi hành động của người dùng. Đây là một biện pháp mạnh, tuy nhiên, không cần thiết và có khả năng ảnh hưởng đến trải nghiệm người dùng và hiệu suất của website (Có thể không thực hiện được khi sử dụng applet). Để giảm thiểu tác động, có thể thay đổi session ID trước mỗi hành động quan trọng của người dùng trên website.
- Hãy nhớ sử dụng session cookie để quản lý session và không chấp nhận session ID từ HTTP request và HTTP header.
- HTTPS ([HSTS](https://www.acunetix.com/blog/articles/what-is-hsts-why-use-it/)), [anti-CSRF tokens](https://www.acunetix.com/blog/articles/cross-site-request-forgery/) và cookie flags phù hợp (`Secure, SameSite`) cũng có thể hữu ích trong việc tránh session fixation.
- Một biện pháp đối phó khác là lưu các thuộc tính dành riêng cho người dùng trong session, xác minh chúng mỗi khi có request và từ chối quyền truy cập nếu thông tin không khớp. Các thuộc tính đó có thể là địa chỉ IP hoặc user agent (Tên trình duyệt web).

Có thể sử dụng [web vulnerability scanner](https://www.acunetix.com/vulnerability-scanner/) để kiểm tra xem website hoặc ứng dụng web của bạn có bất kỳ lỗ hổng session fixation nào không, nhưng session fixation tương tự như các lỗ hổng logic và rất khó để phát hiện tự động.

*Nguồn:*

[What Is Session Fixation](https://www.acunetix.com/blog/web-security-zone/what-is-session-fixation/)

[Ruby On Rails Security Guide](https://guides.rubyonrails.org/v2.3.11/security.html#session-fixation)