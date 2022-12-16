Bài viết này đề cập đến 10 lỗ hổng bảo mật web phổ biến mà các lập trình viên nên biết:
# 1. Cross Site Request Forgery (CSRF)
Chắc hẳn khi lập trình web các bạn sẽ gặp từ khoá CSRF khá là nhiều nhưng chưa hiểu rõ về lỗ hổng bảo mật này.
CSRF ( Cross Site Request Forgery) là kĩ thuật tấn công bằng cách sử dụng quyền chứng thực của người sử dụng đối với 1 website khác. Các ứng dụng web hoạt động theo cơ chế nhận các câu lệnh HTTP từ người sử dụng, sau đó thực thi các câu lệnh này.

Hacker sử dụng phương pháp CSRF để lừa trình duyệt của người dùng gửi đi các câu lệnh http đến các ứng dụng web. Trong trường hợp phiên làm việc của người dùng chưa hết hiệu lực thì các câu lệnh trên sẽ dc thực hiện với quyền chứng thực của người sử dụng.

Ví Dụ: 

* Kẻ tấn công là Alice chọn mục tiêu là chiếc ví của Todd bằng cách chuyển một phần tiền của Todd cho cô ta. Ngân hàng của Todd đã gặp phải lỗ hổng CSRF. Để gửi tiền, Todd phải truy cập vào URL sau:

```http://example.com/app/transferFunds?amount=1500&destinationAccount=4673243243```

* Sau khi URL này được mở ra, một trang thành công được trình bày cho Todd, và việc chuyển đổi đã hoàn tất. Alice cũng biết rằng Todd thường ghé thăm một trang web dưới quyền kiểm soát của cô tại blog.aliceisawesome.com, nơi cô đặt đoạn mã sau đây:

```<img src = "http://example.com/app/transferFunds?amount=1500&destinationAccount=4673243243" width = "0" height = "0" />```

* Khi truy cập trang web của Alice, trình duyệt của Todd nghĩ rằng Alice liên kết đến một hình ảnh và tự động đưa ra yêu cầu HTTP GET để lấy “hình ảnh”, nhưng điều này thực sự hướng dẫn ngân hàng của Todd chuyển $ 1500 đến Alice.


### Cách ngăn chặn
Lưu trữ một mã thông báo bí mật trong một trường mẫu ẩn mà không thể truy cập được từ trang web của bên thứ ba. Tất nhiên bạn phải xác minh trường ẩn này. Một số trang web yêu cầu mật khẩu của bạn cũng như khi sửa đổi các cài đặt nhạy cảm (ví dụ như email nhắc nhở mật khẩu của bạn).


# 2. Cross Site Scripting (XSS)
Cross Site Scripting là một lỗi bảo mật cho phép người tấn công (Attacker, Hacker,…) chèn các đoạn script nguy hiểm vào trong source code ứng dụng web. Nhằm thực thi các đoạn mã độc Javascript để chiếm phiên đăng nhập của người dùng.

![](https://images.viblo.asia/71dc6403-f882-473e-a15b-8de31b26dc87.gif)

### Cách ngăn chặn

Có một cách bảo mật web đơn giản đó là không trả lại thẻ HTML cho người dùng. Điều này còn giúp bảo vệ chống lại cả HTML Injection, một cuộc tấn công tương tự mà hacker tấn công vào nội dung HTML (chẳng hạn như hình ảnh hoặc splash player vô hình) – không gây ảnh hưởng nghiêm trọng nhưng khá rắc rối. Thông thường cách giải quyết đơn giản chỉ là chuyển đổi tất cả các thực thể HTML, do đó <script> được trả về dưới dạng &lt;script&gt.
    

# 3. Injection flaws (Lỗi nhúng mã)

Injection flaws là một lớp bảo mật dễ bị tổn thương cho phép người dùng “phá vỡ” ngữ cảnh ứng dụng web. Nếu ứng dụng web của bạn nhận đầu vào của người dùng và chèn người dùng nhập vào cơ sở dữ liệu phía sau, lệnh shell hoặc call hệ điều hành, ứng dụng của bạn có thể dễ bị tấn công.
Lỗ hổng Injection là kết quả của sự thiếu sót trong việc lọc các đầu vào không đáng tin cậy. Kẻ tấn công có thể chèn các đoạn mã độc dẫn đến lộ dữ liệu và chiếm quyền kiểm soát trình duyệt của khách hàng.

### Cách ngăn chặn

Chống lại lỗ hổng này là vấn đề bạn đã lọc đầu vào đúng cách chưa hay việc bạn cân nhắc liệu một đầu vào có thể được tin cậy hay không. Về căn bản, tất cả các đầu vào đều cần được lọc trừ trường hợp đầu vào đó chắc chắn đáng tin cậy.

# 4. Broken authentication

Nhóm lỗ hỏng này gồm nhiều khuyết điểm khác nhau trong cơ chế đăng nhập của ứng dụng có thể cho phép “kẻ phá hoại” đoán biết những mật khẩu kém, thực hiện tấn công brute-force hoặc vượt qua phần đăng nhập.

### Cách ngăn chặn

Sử dụng framework đáng tin cậy vì các framework sẽ hỗ trợ các bộ mã để ngăn chặn lỗ hổng này.

# 5. INSECURE DIRECT OBJECT REFERENCES – Giấu đầu lòi đuôi

Lỗi này “lạ” ở chỗ nó nằm trong top 4 OWASP nhưng lại có rất ít tài liệu về nó. Nó cũng không nổi tiếng như XSS hay CSRF hay SQL Injection (Dù rank OWASP của nó cao hơn XSS hay CSRF nhiều).
Lỗ hổng này xảy ra khi chương trình cho phép người dùng truy cập tài nguyên (dữ liệu, file, thư mục, database) một cách bất hợp pháp, thông qua dữ liệu do người dùng cung cấp. Nguyên nhân chính gây ra lỗ hổng này là sự bất cẩn của developer hoặc sysadmin.

### Cách ngăn chặn

* Kiểm tra chặt chẽ quyền truy cập của user
* Tránh để lộ key của đối tượng –  Trong các trường hợp đã nêu, id của đối tượng là số int, do đó hacker có thể đoán ra id của các đối tượng khác. Nhằm phòng tránh việt này, ta có thể mã hoá id, dùng GUID để làm id. Hacker không thể nào dò ra ID của đối tượng khác được.
* Bảo vệ dữ liệu “nhảy cảm” – Với những dữ liệu “nhạy cảm” như source code, config, database key, cần hạn chế truy cập.


# 6. Missing Function Level Access Control (Sai sót trong hạn chế truy cập)

Đây chỉ là sai sót trong vấn đề ủy quyền. Nó có nghĩa là khi một hàm được gọi trên máy chủ, quá trình ủy quyền thích hợp đã không được thực hiện. Các nhà phát triển dựa vào thực tế là phía máy chủ tạo ra giao diện người dùng và họ nghĩ rằng khách hàng không thể truy cập các chức năng nếu không được cung cấp bởi máy chủ.

Tuy nhiên, kẻ tấn công luôn có thể yêu cầu các chức năng “ẩn” và sẽ không bị cản trở bởi việc giao diện người dùng không cho phép thực hiện các chức năng này. Hãy tưởng tượng trong giao diện người dùng chỉ có bảng điều khiển /admin và nút nếu người dùng thực sự là quản trị viên. Không có gì ngăn cản kẻ tấn công phát hiện ra những tính năng này và lạm dụng nó nếu không ủy quyền.

### Cách ngăn chặn

Ở phía máy chủ, phải luôn được phân quyền một cách triệt để từ khâu thiết kế. 

# 7. Security Misconfiguration (Sai sót cấu hình an ninh)

Do cấu hình an ninh lỏng lẻo tại các tầng kiến trúc của web như nền tảng, framework, máy chủ, cơ sở dữ liệu và mã tùy chỉnh nên tin tặc có thể khai thác tấn công và có quyền truy cập dữ liệu. Vì thế, tất cả các tầng kiến trúc của web phải được cập nhật thường xuyên.

### Cách ngăn chặn

Có một quá trình “xây dựng và triển khai” tốt (tốt nhất là tự động), có thể triển khai chạy thử nghiệm. Giải pháp để tạo cấu hình an toàn là các móc nối sau cam kết, để ngăn không cho mã chứa mật khẩu mặc định và/hoặc các công cụ phát triển được tích hợp sẵn.


# 8. Sensitive data exposure (Rò rỉ dữ liệu nhạy cảm)

“Những kẻ tấn công có thể ngửi hoặc sửa đổi dữ liệu nhạy cảm nếu không được ứng dụng xử lý an toàn. Một vài ví dụ bao gồm sử dụng nếu các khóa mã hóa yếu, sử dụng TLS yếu. ”

Mục đích là để xác định các bit dữ liệu nhạy cảm và khai thác chúng.

### Cách ngăn chặn

Mã hóa tất cả dữ liệu khi chuyển tiếp và ở chế độ nghỉ.

Sử dụng các giao thức và thuật toán an toàn.

Tắt bộ nhớ đệm của các phản hồi với dữ liệu nhạy cảm. Tin tặc có thể nhận được các bản sao được lưu trong bộ nhớ cache và lấy cắp thông tin từ chúng.



#### Nguồn tham khảo 
https://www.greycampus.com/blog/information-security/owasp-top-vulnerabilities-in-web-applications