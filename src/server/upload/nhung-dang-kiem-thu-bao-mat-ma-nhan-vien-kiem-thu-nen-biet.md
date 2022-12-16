## Kiểm thử bảo mật là gì ?

  Kiểm thử bảo mật là một loại kiểm thử phần mềm và các phần ứng dụng phần mềm không có bất kỳ lỗi hổng, mối đe dọa, rủi ro nào có thể gây ra tổn thất lớn. Kiểm tra bảo mật của bất kỳ hệ thống nào là tìm ra tất cả các sơ hở và điểm yếu có thể có của hệ thống dẫn đến việc mất thông tin, doanh thu, danh tiếng dưới tay của nhân viện hoặc người ngoài tổ chức.

### Các loại kiểm thử bảo mật 
1. SQL injection 

2. Cross-site Scripting 
3. Command Execution
4. Clickjacking
5. Cross-site request forgery
6. Reflected XSS
7. FILE upload vulnerabilities 
8. Open redirects 
9. Unencrypted communication
10.  User enumeration 
11.  Password mismanagement
12.  Email spoofing 
13.  Malvertising 
##  Cách thức hoạt động của các loại bảo mật
### SQL injection 
SQL injection là một kỹ thuật mà các hacker lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web đến DBMS để khai thác các thông tin nhạy cảm. SQL injection có thể cho phép hacker thực hiện các thao tác như insert, delete, update… trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy. Các lỗi này chỉ xảy ra trên các ứng dụng web có liên kết với các DBMS như SQL server, mysql, oracle, DB2, Sysbase… và bất kì ngôn ngữ lập trình web động nào như: php, ass, asp.net, jsp

Demo:
Trang login ngân hàng.
![](https://images.viblo.asia/606ac8fe-4ef0-498d-804e-989a2b47f62a.PNG)
Bước 1: 
Nhập giá trị: 
Email: user@gmail.com
Password: password 

Bước 2: 

Nhập Email: user@email.com

Password: password’
![](https://images.viblo.asia/2adc513b-1ffb-495c-9eee-11e1fb2a108e.PNG)

Ý nghĩa: Check ví dụ khi có thêm dấu nháy xem khả năng đọc lỗi và phát hiện với ký tự là ‘ có trả về đúng mã lỗi và nội dung lỗi không.

Nội dung lỗi thay đổi là [An unexpected error occurred] => ứng dụng bị lỗi với một số lỗi không mong muốn.

Check log

Rendering login page.

Checking supplied authentication details for user@email.com.

### Finding user in database.

An error occurred: PG::SyntaxError: ERROR: unterminated quoted string at or near "'password'' limit 1" LINE 1: ...ers where email = 'user@email.com' and password = 'password'... ^ : select * from users where email = 'user@email.com' and password = 'password'' 

###  Check code 
 
**SELECT *

  **FROM users
  
 **WHERE email = 'user@email.com'**
 
**   AND pass  = 'password'' LIMIT 1**

           ⇒ Nhìn giá trị code thay của đoạn login khi check password như trên khi password đã có thêm dấu ‘ thì dấu nháy gốc của code không có giá trị.
           Hãy so sánh với giá trị nếu ta không nhập ‘ thì code có giá trị 
**SELECT *
**
  FROM users**
  
** WHERE email = 'user@email.com'**
 
   **AND pass  = 'password' LIMIT 1**
   
    Từ hành động trên đã chỉ ra rằng hệ thống đã bị nhiễm sql injection 
        
Bước 3: Sau khi xác định được hệ thống có nguy cơ nhiễm sql injection chúng ta sẽ nhập điều kiện where cho password là luôn đúng

*Nhập giá trị ‘or 1=1--*

Code : 
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = ''or 1=1--' LIMIT 1
   
Kết quả sau khi click Login 

Hệ thống luôn đăng nhập thành công 

Dấu gạch ngang kép đã nhập khiến cơ sở dữ liệu bỏ qua các phần còn lại của câu lệnh SQL, cho phép xác thực mà không phải cung cấp mật khẩu thực.

2. Cross-site scripting (XSS) 
 
 Là một trong những kĩ thuật tấn công phổ biến nhất hiện nay. Được mệnh danh là Godfather of Attack và trong nhiều năm liền được liệt vào danh sách những kỹ thuật tấn công nguy hiểm nhất với các ứng dụng web
 
Demo 

Thực hiên trên trang bình luận bởi vì mục đích của trang web có thể tạo điều kiện thảo luận người dùng có thể thêm ý kiến, được lưu vào cơ sở dữ liệu và hiển thị cho người dùng khác.

![](https://images.viblo.asia/24664cd6-3d7a-47c8-a31b-1971aafcf59a.PNG)

Thật không may, sự phổ biến của trang web đã gây sự chú ý của tin tặc, những người truy cập trang web của bạn cho mục đích bất chính.

Trừ khi bạn cẩn thận khi xây dựng HTML, tin tặc có thể lạm dụng chức năng bình luận bằng cách tiêm JavaScript
Bắt đầu thực hiện tiêp mã độc vào từ đoạn bình luận 
*<script>alert("ERROR");</script>*

Click enter và sau đó đoạn alert đã được chèn vào code và nó đã hiểu theo là chèn alert khi đang mở trang bình luận.

![](https://images.viblo.asia/c50ae61d-dc53-4560-a9db-5f8e809946e4.PNG)
Tương tự như vậy có thể làm với các đoạn mã độc khác.