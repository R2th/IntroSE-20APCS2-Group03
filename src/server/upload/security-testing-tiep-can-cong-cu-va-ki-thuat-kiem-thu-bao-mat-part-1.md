### 1.	Giới thiệu về kiểm thử bảo mật 
![](https://images.viblo.asia/198ab12b-b978-4264-ad38-ef52e31ce2c2.PNG) <br>
Kiểm thử bảo mật là một quá trình được thực hiện với mục đích tiết lộ lỗ hổng trong các cơ chế bảo mật và tìm ra các lỗ hổng hoặc điểm yếu của các ứng dụng phần mềm.  <br>

Gần đây, liên tiếp xảy ra các vi phạm về bảo mật như: hacker tấn công vào hệ thống của ngân hàng để lấy trộm thông tin khách hàng và rút tiền của khách hàng. => Điều này dẫn đến kiểm thử bảo mật là hết sức quan trọng.
<br>

 Mục tiêu chính của kiểm thử bảo mật là tìm ra các mức độ dễ bị tấn công của một hệ thống,  xác định dữ liệu và tài nguyên của nó có được bảo vệ khỏi những kẻ xâm nhập hay không. Các giao dịch trực tuyến đã tăng nhanh khi thực hiện kiểm tra bảo mật muộn là một trong những lĩnh vực kiểm tra quan trọng nhất đối với các ứng dụng web như vậy. Kiểm tra bảo mật thường xuyên sẽ có hiệu quả hơn trong việc xác định các lỗ hổng. <br>
 
Thông thường kiểm tra bảo mật gồm các thuộc tính sau: <br>
 - Authentication (Xác thực) <br>
 - Authorization (Uỷ quyền) <br>
 - Confidentiality (Bảo mật)  <br>
-  Availability (Khả dụng) <br>
-  Integrity (Chính trực) <br>
-  Non-repudiation (Không bác bỏ) <br>
-  Resilience (Khả năng phục hồi) <br>
### 2.	Tại sao phải kiểm thử bảo mật 
Kiểm thử hệ thống, trong kịch bản hiện tại là phải xác định và xử lí các lỗ hổng bảo mật ứng dụng web để tránh bất kì trường hợp nào sau đây:
+ Mất niềm tin của khách hàng. 
+ Làm phiền đến phương tiện tạo/thu tiền trực tuyến
+ Thời gian ngừng hoạt động của trang web, mất thời gian và chi phí trong việc phục hổi từ hư hỏng (cài đặt lại dịch vụ, khôi phục bản sao lưu,…)
+ Chi phí liên quan đến việc bảo mật các ứng dụng web chống lại các cuộc tấn công trong tương lai.
+ Ý nghĩa pháp lí liên quan và lệ phí để có các biện pháp an ninh lỏng lẻo tại chỗ.
### 3.	Các mối đe dọa
Dưới đây là các mối đe dọa khác nhau có thể sử dụng để tận dụng lỗ hổng của bảo mật: <br>
**3.1. Privilege Elevation** <br>
- Nâng cao đặc quyền là một lớp tấn công trong đó tin tặc có tài khoản trên hệ thống và sử dụng nó để tăng đặc quyền hệ thống của mình lên cấp cao hơn mức mà anh ta không có. Nếu thành công, kiểu tấn công này có thể dẫn đến việc hacker có được các đặc quyền cao như root trên hệ thống UNIX. Khi một hacker có được các đặc quyền cao, anh ta có thể chạy mã với mức đặc quyền này và toàn bộ hệ thống bị xâm phạm một cách hiệu quả. <br>

**3.2. SQL Injection** <br>
- SQL injection là kỹ thuật tấn công lớp ứng dụng phổ biến nhất được sử dụng bởi tin tặc, trong đó các câu lệnh SQL độc hại được chèn vào trường nhập để thực thi. Các cuộc tấn công SQL injection rất quan trọng vì kẻ tấn công có thể lấy thông tin quan trọng từ cơ sở dữ liệu máy chủ. Đây là một kiểu tấn công lợi dụng sơ hở trong việc triển khai các ứng dụng web cho phép tin tặc hack hệ thống. Để kiểm tra SQL injection, chúng ta phải chú ý các trường đầu vào như textbox, comment, v.v. Để ngăn ngừa việc tiêm, các ký tự đặc biệt phải được xử lý đúng hoặc bỏ qua từ đầu vào.
<br>

**3.3. Unauthorized Data Access**
<br>
- Một trong những kiểu tấn công phổ biến hơn là giành quyền truy cập trái phép vào dữ liệu trong một ứng dụng. Dữ liệu có thể được truy cập trên các máy chủ hoặc trên mạng.
- Truy cập trái phép bao gồm: <br>
+Truy cập trái phép dữ liệu thông qua các hoạt động tìm nạp dữ liệu <br>
+Truy cập trái phép thông tin xác thực khách hàng có thể sử dụng lại bằng cách giám sát quyền truy cập của người khác <br>
+Truy cập trái phép dữ liệu bằng cách giám sát quyền truy cập của người khác <br>

**3.4. URL Manipulation** <br>
- Thao tác URL là quá trình thao túng chuỗi truy vấn URL của trang web & nắm bắt thông tin quan trọng của tin tặc. Điều này xảy ra khi ứng dụng sử dụng phương thức HTTP GET để truyền thông tin giữa máy khách và máy chủ. Thông tin được truyền trong các tham số trong chuỗi truy vấn. Người kiểm tra có thể sửa đổi một giá trị tham số trong chuỗi truy vấn để kiểm tra xem máy chủ có chấp nhận nó không.
<br>

**3.5. Denial of Service** <br>
- Một cuộc tấn công từ chối dịch vụ (DoS) là một nỗ lực rõ ràng để làm cho tài nguyên mạng hoặc máy không có sẵn cho người dùng hợp pháp của nó. Các ứng dụng cũng có thể bị tấn công theo cách khiến ứng dụng và đôi khi toàn bộ máy không thể sử dụng được.
<br>

**3.6. Data Manipulation** <br>
- Trong thao tác dữ liệu, một hacker thay đổi dữ liệu được sử dụng bởi một trang web để đạt được một số lợi thế hoặc gây bối rối cho các chủ sở hữu trang web. Tin tặc thường sẽ có quyền truy cập vào các trang HTML và thay đổi chúng thành trò đùa hoặc gây khó chịu.
<br>

**3.7. Identity Spoofing** <br>
- Giả mạo danh tính là một kỹ thuật trong đó tin tặc sử dụng thông tin đăng nhập của người dùng hoặc thiết bị hợp pháp để khởi động các cuộc tấn công chống lại máy chủ mạng, đánh cắp dữ liệu hoặc bỏ qua các kiểm soát truy cập. Để ngăn chặn cuộc tấn công này đòi hỏi cơ sở hạ tầng CNTT và giảm thiểu cấp độ mạng.
<br>

**3.8. Cross-Site Scripting (XSS)** <br>
- Cross-site scripting là một lỗ hổng bảo mật máy tính được tìm thấy trong các ứng dụng web. XSS cho phép kẻ tấn công đưa tập lệnh phía máy khách vào các trang Web được người dùng khác xem và lừa người dùng nhấp vào URL đó. Sau khi được thực hiện bởi trình duyệt khác của người dùng, mã này có thể thực hiện các hành động như thay đổi hoàn toàn hành vi của trang web, đánh cắp dữ liệu cá nhân hoặc thực hiện các hành động thay mặt cho người dùng. <br>

=> Tất cả các cuộc tấn công được liệt kê ở trên là hầu hết các lớp mối đe dọa quan trọng nhưng đây không phải là tất cả.

### 4. Các kĩ thuật kiểm thử bảo mật

Để ngăn chặn tất cả các mối đe dọa / lỗi kiểm tra bảo mật ở trên và thực hiện kiểm tra bảo mật trên ứng dụng web, cần có kiến thức tốt về giao thức HTTP và hiểu biết về client-máy khách (trình duyệt) - giao tiếp máy chủ thông qua HTTP. Ngoài ra, cần có kiến thức cơ bản về SQL injection và XSS. Các kỹ thuật sau đây sẽ giúp thực hiện kiểm tra bảo mật chất lượng: <br>
**Cross Site Scripting (XSS):** <br>
- Tester nên kiểm tra ứng dụng web để tìm XSS. Bất kì thẻ html nào, ví dụ <html> hoặc bất kì srcipt nào, ví dụ <script> không được chấp nhận bởi ứng dụng. Nếu đúng như vậy, ứng dụng có thể dễ bị tấn công bởi Cross Site Scripting.
- Kẻ tấn công có thể sử dụng phương pháp này để thực thi các tập lệnh hoặc URL độc hại trên trình duyệt nạn nhân.  Sử dụng  tấn công XSS có thể sử dụng các tập lệnh như JavaScript để đánh cắp cookie của người dùng và thông tin được lưu trữ trong cookie.
- Kiểm tra XSS có thể được thực hiện cho: dấu nháy đơn, dấu >, dấu <
<br>
    
**Ethical hacking** <br>
- Ethical hacking có nghĩa là hack được thực hiện bởi một công ty hoặc cá nhân để giúp xác định các mối đe dọa tiềm ẩn trên máy tính hoặc mạng. Một hacker đạo đức cố gắng bỏ qua bảo mật hệ thống và tìm kiếm bất kỳ lỗ hổng nào có thể bị khai thác bởi các tin tặc độc hại hay còn gọi là mũ đen. Mũ trắng có thể gợi ý những thay đổi đối với các hệ thống khiến chúng ít bị xâm nhập bởi mũ đen.
<br>
    
**Password Cracking** <br>
- Bẻ khóa mật khẩu là phần quan trọng nhất trong khi thực hiện kiểm tra hệ thống. Để truy cập các khu vực riêng tư của ứng dụng, tin tặc có thể sử dụng công cụ bẻ khóa mật khẩu hoặc có thể đoán tên người dùng / mật khẩu phổ biến. Tên người dùng và mật khẩu phổ biến có sẵn dễ dàng trực tuyến cùng với các ứng dụng bẻ khóa mật khẩu nguồn mở. Cho đến khi một ứng dụng web thực thi một mật khẩu phức tạp (ví dụ: một mật khẩu dài với sự kết hợp của các số, chữ cái và ký tự đặc biệt), bạn sẽ dễ dàng bẻ khóa tên người dùng và mật khẩu. Một cách khác để bẻ khóa mật khẩu là nếu tên người dùng / mật khẩu nhắm mục tiêu cookie nếu cookie được lưu trữ mà không được mã hóa. <br>

**Penetration Testing**
- Kiểm tra thâm nhập là một cuộc tấn công vào hệ thống máy tính với mục đích tìm ra các lỗ hổng bảo mật, có khả năng truy cập vào nó, chức năng và dữ liệu của nó.
 <br>
    
**Risk Assessment** <br>
  - Đây là một quá trình đánh giá và quyết định rủi ro liên quan đến loại mất mát và khả năng xảy ra lỗ hổng. Điều này được xác định trong tổ chức bằng các cuộc phỏng vấn, thảo luận và phân tích khác nhau.
  <br>
    
**Security Auditing:** <br>
- Kiểm toán bảo mật là một đánh giá có hệ thống về tính bảo mật của hệ thống thông tin của công ty bằng cách đo lường mức độ phù hợp của nó với một bộ tiêu chí đã thiết lập.
<br>
    
=> Trên đây là một số kĩ thuật kiểm thử bảo mật, còn một số kĩ thuật khác và các công cụ kiểm thử bảo mật chúng ta cùng xem ở part 2
    <br>
    
 ###     5. Tài liệu tham khảo
    https://www.3pillarglobal.com/insights/approaches-tools-techniques-for-security-testing