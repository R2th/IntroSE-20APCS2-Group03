# Tổng quan về vấn đề bảo mật
Vấn đề đảm bảo an toàn cho các website để tránh khỏi các cuộc tấn công từ kẻ xấu luôn là bài toán đau đầu cho các quản trị viên của website và những lập trình viên tạo ra các website đó. Số lượng các lỗ hổng ngày càng lớn, trình độ hacker cũng ngày một tăng đặt ra bài toán cho việc bảo vệ website khỏi các cuộc tấn công từ các hacker trở nên quan trọng hơn bao giờ hết. Phần lớn các vấn đề bảo mật đều liên quan đến các lỗi lập trình. Mặc dù không một lập trình viên nào khi viết ứng dụng lại mong muốn ứng dụng của mình sẽ có lỗi bảo mật, nhưng trên thực tế, do tính phức tạp của các hệ thống kỹ thuật, do tập trung quan tâm đến chức năng hấp dẫn của ứng dụng, đến tiến độ… việc đảm bảo ứng dụng không có lỗi bảo mật là cực kỳ khó khăn, ngay cả với những lập trình viên cao cấp.  Nói chung, việc xây dựng phần mềm an toàn sẽ ít tốn kém hơn nhiều so với việc sửa chữa các vấn đề bảo mật sau khi phần mềm đã hoàn thành, chưa kể các chi phí có thể liên quan đến vi phạm bảo mật

Nhận thấy vấn đề đó, OWASP (OWASP là một tổ chức phi lợi nhuận trên toàn cầu tập trung vào việc nâng cao tính bảo mật cho phần mềm, ứng dụng web) đã đưa ra tài liệu hướng dẫn cho lập trình viên để có thể thực hiện lập trình một cách an toàn, tránh gặp phải các lỗ hổng bảo mật nghiêm trọng: [**OWASP Secure Coding Practices
Quick Reference Guide**](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf). Tài liệu được công bố năm 2010 nhưng đến nay nó vẫn còn nguyên giá trị và tính ứng dụng cao.

![](https://images.viblo.asia/4f78e748-0fc2-4660-9425-3fd5bf38e257.png)

# Secure Coding Practices Checklist
## Input Validation
![](https://images.viblo.asia/9d3139ff-1b8a-4ff2-9761-e269c09e69fd.jpg)

Yêu cầu này liên quan đến việc kiểm tra dữ liệu đầu vào, các lập trình viên cần đảm bảo kiểm tra toàn bộ dữ liệu đầu vào từ phía người dùng và xử lý hay kiểm tra chúng ở phía server (không xử lý ở phía client). 

**1. Tất cả dữ liệu đầu vào cần được xử lý ở một hệ thống an toàn, đáng tin cậy.**
    
   - Hệ thống đáng tin cậy có thể là server do chúng ta quản lý, server của các bên thứ 3 đủ độ tin cậy và an toàn.
 
**2. Xác định rõ ràng nguồn dữ liệu nào là tin cậy và không đáng tin cậy. Đối với các nguồn dữ liệu không tin cậy, cần thực hiện kiểm tra trên server trước khi thực hiện các tác vụ khác.**

- Các nguồn dữ liệu tin cậy: Dữ liệu đã được xử lý, dữ liệu từ các nguồn tin tưởng đã biết trước đó (google, facebook..)
- Các nguồn dữ liệu không tin cậy: User input, databases, file streams, ...
    
**3. Nên thực hiện kiểm tra dữ liệu tập trung cho ứng dụng**

- Việc thực hiện kiểm tra dữ liệu tập trung giúp giảm thiểu tài nguyên cũng như giúp kiểm soát dễ dàng các vấn đề về bảo mật có thể xảy ra.  Ví dụ: Tất cả dữ liệu người dùng nhập vào từ form sẽ được xử lý tập trung để làm sạch dữ liệu qua một hàm hoặc thư viện nào đó để đảm bảo tất cả dữ liệu sẽ được xử lý trước khi đến bước tiếp theo. 

**4. Chỉ định các bộ ký tự chuẩn cho dữ liệu đầu vào (UTF-8) và thực hiện encode dữ liệu về một bộ encode chuẩn trước khi thực hiện việc kiểm tra.**

- Việc này đảm bảo dữ liệu được chuẩn hóa trước khi xử lý và giúp loại bỏ các ký tự nguy hiểm khỏi dữ liệu đầu vào

**5. Xác thực dữ liệu thất bại nên được xử lý để từ chối luôn đầu vào đó**

- Nếu người dùng nhập đầu vào không hợp lệ thì cần loại bỏ luôn chứ không thực hiện xử lý hay lưu trữ tiếp và có thông báo về việc nhập dữ liệu không hợp lệ để người dùng biết

**6. Xác thực tất cả dữ liệu do khách hàng cung cấp trước khi xử lý, bao gồm tất cả các tham số, URL và nội dung tiêu đề HTTP (ví dụ: tên và giá trị cookie).**

- Việc kiểm tra này giúp trán được các lỗ hổng liên quan như: path traversal, open url redirection, server-side injection 

**7. Xác minh rằng các giá trị tiêu đề trong cả yêu cầu và phản hồi chỉ chứa các ký tự ASCII**

- Việc này giúp đảm bảo dữ liệu đầu vào chỉ gồm các ký tự hợp lệ tránh được các lỗ hổng liên quan đến các lỗ hổng về: host-header injection

**8. Xác thực dữ liệu từ chuyển hướng (Kẻ tấn công có thể gửi nội dung độc hại trực tiếp đến mục tiêu, do đó hacker có thể phá vỡ logic ứng dụng và bất kỳ xác thực nào được thực hiện trước chuyển hướng)**

- Thông thường website có các chức năng cho phép người dùng chuyển hướng sang các website khác, việc này nếu không được kiểm tra cẩn thận có thể bị hacker lợi dụng để chuyển hướng người dùng tới các website độc hại. Cách xử lý an toàn là whitelist các giá trị được phép chuyển hướng trong ứng dụng

**9. Thực hiện kiểm tra kiểu dữ liệu (data-type, content-type), miền dữ liệu (data range), độ lớn của dữ liệu (data length, data volume) trên phía server một cách an toàn**

- Việc này giúp đảm bảo dữ liệu đầu vào được kiểm soát chặt chẽ ở phía server để tránh các lỗ hổng liên quan đến: Unrestricted file upload, dos, Cross-site Scripting...

**10. Luôn luôn thực hiện validate dữ liệu bằng cách sử dụng "white list" khi có thể, tránh việc sử dụng "black list"**

- Ví dụ đối với việc validate dữ liệu với chức năng upload avtar: Thay vì thực hiện chặn các extension không được phép như (.php, .php3, .svg..) thì chúng ta thực hiện "white list" các extension được phép upload trên server (png, jpg). Việc đảm vừa đảm bảo an toàn mà tiết kiệm được công sức khi lập trình

**11. Nếu bất kỳ ký tự nguy hiểm tiềm ẩn nào được cho phép trong ứng dụng, hãy đảm bảo rằng bạn triển khai tốt các biện pháp đảm bảo an toàn như mã hóa đầu ra, bảo mật các API  và tính toán việc sử dụng dữ liệu đó trong toàn bộ ứng dụng.**

- Ví dụ về các ký tự nguy hiểm phổ biến bao gồm: <> "'% () & + \ \' \"

**12. Nếu quy trình xác thực dữ liệu của bạn không thể giải quyết các đầu vào sau, thì chúng nên được kiểm tra một cách riêng biệt**

- Kiểm tra các byte trống (% 00) : Chống các lỗi liên quan đến upload file, LFI (Local file inclusion)
- Kiểm tra các ký tự dòng mới (% 0d,% 0a, \ r, \ n): Chống các lỗi về code injection, LFI, RFI (remote file inclusion)
- Kiểm tra các ký tự ../ hoặc .. Trong trường hợp thực hiện encode UTF-8 thì cần kiểm tra các ký tự: %c0%ae%c0%ae/: Chống các lỗ hổng LFI, RFI, Path traversal

## Output Encoding
![](https://images.viblo.asia/9310dda7-b636-429d-accb-0903a348352f.png)

Yêu cầu này liên quan đến việc xử lý dữ liệu đầu ra trước khi cho dữ liệu hiển thị trên website. Việc này giúp đảm bảo dữ liệu khi hiển thị sẽ không bị sai về định dạng hay bị dính các lỗ hổng phía client-side 

**1. Tất cả dữ liệu đầu ra cần được encode ở một hệ thống an toàn, đáng tin cậy.**
    
   - Hệ thống đáng tin cậy có thể là server do chúng ta quản lý, server của các bên thứ 3 đủ độ tin cậy và an toàn.
 
**2. Sử dụng các encode chuẩn đã được kiểm tra an toàn.**

- Việc sử dụng các chuẩn có sẵn sẽ mang lại một số lợi ích: Thuật toán đã được kiểm tra an toàn, không tốn công sức implement từ đầu, có tài liệu hướng dẫn cụ thể, dễ maintain và có thể được hỗ trợ từ cộng đồng
    
**3. Thực hiện encode dữ liệu đầu ra đối với các dữ liệu từ các nguồn không tin cậy sẽ được hiển thị ở phía người dùng**

- Việc encode này để chống lại lỗ hổng Cross-site Scripting (XSS). Chúng ta có thể sử dụng [HTML entity encoding ](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf#page=16&zoom=100,82,298) để thực hiện việc encode dữ liệu

**4. Encode toàn bộ dữ liệu trừ khi biết chắc chắn dữ liệu đó là từ nguồn tin tưởng.**

-  Việc encode này để chống lại lỗ hổng Cross-site Scripting (XSS). Các nguồn dữ liệu tin cậy là dữ liệu đã được xử lý làm sạch (có thể sử dụng [HTMl purifier](http://htmlpurifier.org/)) hoặc từ các nguồn tin tưởng khác (facebook, google, github...)

**5. Làm sạch theo ngữ cảnh tất cả đầu ra của dữ liệu không đáng tin cậy cho các truy vấn cho SQL, XML và LDAP**

- Loại bỏ các dữ liệu khi hiển thị đối với dữ liệu là các truy vấn SQL, XML, LDAP. Việc nay giúp chống lại các lỗ hổng liên quan đến SQL Ijection, XML injection

**6. Làm sạch tất cả đầu ra của dữ liệu không đáng tin cậy liên quan đến lệnh của hệ điều hành**

- Chúng ta cần làm sạch loại bỏ các dữ liệu liên quan đến cách lệnh của hệ điều hành (operating system commands) để tránh các lỗi liên quan đến Command injection, Code injection.
# Một số lỗ hổng thường gặp với Input validation và Output Encoding
## Input Validation
Nếu chúng ta không xử lý tốt dữ liệu ở phần này, thì có thể phải đối mặt với các lỗ hổng bảo mật sau:
* SQL Injection
* OS Command Injection
* Code injection
* LDAP Injection
* Unrestricted file upload
* Buffer overflow
* ...
## Output Encoding
* Cross-site Scripting (Reflected XSS, Stored XSS, DOM XSS)


Xem thêm các lỗ hổng khác tại: [OWASP Top Ten
](https://owasp.org/www-project-top-ten/)
# Tổng kết
Đây là 2 nội dung quan trọng hàng đầu trong các yêu cầu về lập trình an toàn, nếu xử lý tốt 2 phần này, các website về cơ bản sẽ trở nên an toàn và tránh được các lỗ hổng nghiêm trọng cũng như  tránh được các lỗ hổng được phát hiện bằng các công cụ scan tự động.

Hẹn gặp lại các bạn tại phần 2!