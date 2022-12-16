# GIỚI THIỆU
* [Mod Security](https://en.wikipedia.org/wiki/ModSecurity) là một module tường lửa có thể tích hợp với các [Web Application Server](https://en.wikipedia.org/wiki/Application_server) (máy chủ ứng dụng web) như Apache, IIS, Nginx cho phép phân tích và ghi nhật ký các luồng dữ liệu HTTP/S.Với sự đóng góp từ dự án [ModSecurity Core Rule Set](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project) của tổ chức OWASP đã giúp ModSecurity trở nên mạnh mẽ và linh động hơn trong việc phân tích các hành vi có nguy cơ xâm hại an ninh ứng dụng web.
* Mod Security đứng trước Web Server, làm nhiệm vụ như một firewall để kiểm soát truy cập vào ra Web Server. Các thông tin đi từ bên ngoài vào và bên trong ra sẽ được kiểm soát chặt chẽ để tránh những thông tin có thể gây hại cho Web Server hay là việc rò rỉ các thông tin đặc biệt từ Web Server đến Client.

![](https://images.viblo.asia/e5f7886a-8fdd-486b-a2a2-7ed86660645b.png)

* Mod Security có thể :
1. Request filtering: tất cả các request gửi đến web server đều được phân tích và càn lọc (filter) trước khi chúng được đưa đến các modules khác để xử lý.
1. Anti-evasion techniques: paths và parameters được chuẩn hóa trước khi phân tích để chống evasion techniques.
1. Understanding of the HTTP protocol: ModSecurity là web application firewall nên nó có khả năng hiểu được HTTP protocol. ModSecurity có khả năng càn lọc dựa trên các thông tin ở HTTP header hay có thể xem xét đến từng parameters hay cookies của các requests…
1. POST payload analysis: ngoài việc càn lọc dựa trên HTTP header, ModSecurity có thể dựa trên nội dung (payload) của POST request.
1. Audit logging: mọi request đều có thể được ghi lại (bao gồm cả POST) để người quản trị có thể theo dõi nếu cần.
1. HTTPS filtering: ModSecurity có thể phân tích HTTPS.
1. Compressed content filtering: ModSecurity sẽ phân tích sau khi đã decompress các request data.
* Và trong bài viết này chúng ta sẽ tiến hành tích hợp Mod Security cho Apache Web Server để chống lại SQL Injection và tấn công XSS.

# 1. SQL Injection và tấn công XSS khi chưa tích hợp Mod Security
Để thử nghiệm SQL Injection và tấn công XSS thì mình sử dụng [Damn Vulnerable Web Application (DVWA)](https://github.com/ethicalhack3r/DVWA) một ứng dụng mã nguồn PHP tập hợp sẵn các lỗi logic về bảo mật trong đó có SQL Injection và XSS.
Sau khi tải mã nguồn từ : https://github.com/ethicalhack3r/DVWA, giải nén vào thư mục C:\xampp\htdocs, khởi chạy và đăng nhập bằng tài khoản username/password: admin/password thì giao diện trang web như sau:

![](https://images.viblo.asia/d0c04ae4-15e6-4285-b5db-91ebf9bdc466.PNG)

## 1.1 Thử nghiệm SQL Injection
Vào SQL Injection nhập vào `%' or '0'='0` và submit

![](https://images.viblo.asia/81ef4196-8ae0-46c2-babf-98a588be71fa.PNG)

Kết quả sẽ nhận được thông tin của tất cả các users có trong cơ sở dữ liệu. Bởi vì câu truy vấn lúc này được hiểu là : `SELECT * FROM users WHERE user_id = '%' or '0'='0'`

## 1.2 Thử nghiệm XSS
Vào XSS stored và submit đoạn script sau: `<script>alert("Hacked! – KMA")</script>`:

![](https://images.viblo.asia/48963635-c553-4709-a729-2384159d592c.PNG)

Sau khi submit đoạn script trên thì mỗi lần truy cập vào, trang web sẽ hiện một thông báo cho người dùng như sau:

![](https://images.viblo.asia/fd53ef7f-1b77-44f9-8650-8d72b3c4e9fe.PNG)

Qua một vài thao tác đơn giản có thể thấy được lỗi SQL Injection và XSS rất dễ dàng bị khai thác. Vì vậy cần có phương pháp để chống lại các dạng tấn công này. 
Có rất nhiều phương pháp để chống lại tấn công SQL Injection và XSS nhưng trong bài viết này mình chỉ đề cập đến phương pháp tích hợp tường lửa và cụ thể là Mod Security trên Apache.

# 2 Cài đặt và cấu hình Mod Security
## 2.1 Cài đặt
**Truy cập vào  https://www.apachelounge.com/download/ và tải về mod_security tương ứng.**

![](https://images.viblo.asia/a1dcd589-50b0-4628-8769-d12d91c0fd37.PNG)

**Giải nén và tìm 2 file `mod_security2.so` và `yajl.dll` trong thư mục vừa giải nén.**

* copy `mod_security2.so` vào `...\apache\modules`
* copy `yajl.dll` vao `...\apache\bin`


**Mở file `httpd.conf` của Xampp và thêm vào các dòng sau:**

`LoadModule security2_module modules/mod_security2.so`

`SecRuleEngine DetectionOnly`

`<IfModule security2_module>`

`SecRuleEngine On`

`SecDefaultAction "phase:2,deny,log,status:403"`

`Include conf/sqlinjection.conf`

`Include conf/xss.conf`

`</IfModule>`

![](https://images.viblo.asia/500f34af-ef20-4d00-9ba5-165ea0595da6.jpg)

## 2.2 Tạo file conf để thiết lập rules

**Tiến hành tạo 2 file `sqlinjection.conf` và `xss.conf` trong thư mục `apache\conf` của Xampp.**

**Clone toàn bộ [rules SQL Injection](https://raw.githubusercontent.com/SEC642/modsec/master/rules/base_rules/modsecurity_crs_41_sql_injection_attacks.conf) vào file `sqlinjection.conf` và [rules XSS Injection](https://github.com/SEC642/modsec/blob/master/rules/base_rules/modsecurity_crs_41_xss_attacks.conf) vào file `xss.conf`.**

Tiến hành restart lại Xampp Apache. Thử nghiệm lại tấn công SQL Injection và XSS như ở phần 1. Kết quả như hình:


![](https://images.viblo.asia/571490c9-7c33-4e9d-89ea-8b5a6d64f179.PNG)

Và đồng thời file nhật ký ghi nhận được request xấu từ người dùng đã bị chặn lại:

![](https://images.viblo.asia/3e272a12-b924-48d5-9e2f-f1201ce55c7f.PNG)


Video demo:

{@embed: https://www.youtube.com/watch?v=WRb69P-Oe8Y}


# Kết luận

Chỉ một vài bước đơn giản, chúng ta đã có thể chống lại tấn công SQL Injection và XSS mà không cần phải chỉnh sửa lại mã nguồn của trang web. Bằng việc kết hợp Mod Security và các bộ rules do tổ chức OWASP để chống lại nhiều loại tấn công phổ biến vào ứng dụng web. Cũng như có thể viết ra các rules phù hợp với mục đích sử dụng của riêng từng cá nhân và công ty. Chi phí đầu tư thấp, được hỗ trợ rộng rãi bởi cộng đồng bảo mật vì vậy giải pháp sử dụng Mod Security là một lựa chọn rất tốt trong việc bảo mật cho ứng dụng web.


### Cuối cùng
Bài viết được viết trên sự hiểu biết có hạn của cá nhân mình, có gì sai sót mong được mọi người góp ý! **Thank all!**
# Tham Khảo
https://en.wikipedia.org/wiki/ModSecurity

https://keirstenbrager.tech/sql-vs-xxs-injection-attacks-explained/