# Giới thiệu
HTTP (HyperText Transfer Protocol) cung cấp một số phương thức có thể được sử dụng để thực hiện các hành động trên Web Server (Tiêu chuẩn HTTP 1.1 đề cập đến chúng như các `Methods` nhưng chúng cũng thường được mô tả dưới dạng `Verbs`). Mặc dù `GET` và `POST` cho đến nay là các phương thức phổ biến nhất được sử dụng để truy cập thông tin do Web Server cung cấp, HTTP cho phép một số phương thức khác (ít được biết đến hơn). Một số trong số này có thể được sử dụng cho các mục đích xấu nếu Web Server được cấu hình sai.

**RFC 7231 – Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content** xác định các `Methods` hoặc `Verbs` yêu cầu HTTP hợp lệ sau:
* GET
* HEAD
* POST
* PUT
* DELETE
* CONNECT
* OPTIONS
* TRACE

Trên đây, hầu hết các ứng dụng web chỉ cần phản hồi các yêu cầu `GET` và `POST`, nhận dữ liệu người dùng trong chuỗi truy vấn URL hoặc được nối vào yêu cầu tương ứng. Các liên kết kiểu `<a href="">...</a>` cũng như các biểu mẫu được xác định mà không có phương thức kích hoạt yêu cầu `GET`, dữ liệu biểu mẫu được gửi qua `<form method="POST">...</form>` kích hoạt yêu cầu `POST`. 
Sử dụng JavaScript và Ajax có thể gửi các phương thức khác với `GET` và `POST` nhưng thường không cần thực hiện điều đó. Vì các phương pháp khác rất hiếm khi được sử dụng, nhiều developer không biết hoặc không cân nhắc việc Web Server hoặc Frameworks triển khai các phương pháp này ảnh hưởng như thế nào đến các tính năng bảo mật của ứng dụng.

# Đối tượng cần kiểm tra
* Liệt kê các phương thức HTTP được hỗ trợ.
* Kiểm tra bỏ qua kiểm soát truy cập.
* Kiểm tra lỗ hổng XST.
* Kiểm tra kỹ thuật ghi đè HTTP Methods.

# Làm thế nào để kiểm thử?
### Khám phá các phương thức hỗ trợ
Để thực điều này này, bạn cần một số cách để tìm ra phương thức HTTP được hỗ trợ bởi Web Server. Ở đây, phương thức `OPTIONS` HTTP cung cấp một cách trực tiếp để thực hiện điều đó, bạn chỉ cần xác minh phản hồi của Server bằng cách đưa ra các Request bằng các phương thức khác nhau. Giúp bạn kiểm tra một cách thủ công hoặc bằng tập lệnh `http-method` Nmap.

Để sử dụng tập lệnh `http-method` Nmap để kiểm tra `/index.php` trên máy chủ `localhost` bằng HTTPS, bạn sử dụng câu lệnh:
```
nmap -p 443 --script http-methods --script-args http-methods.url-path='/index.php' localhost
```
Khi kiểm tra một ứng dụng bạn phải chấp nhận sử dụng các phương pháp khác nhau.
**Ví dụ:** Một dịch vụ Web RESTful, bạn cần kiểm tra kỹ lưỡng để đảm bảo rằng tất cả các index chỉ chấp nhận các `Methods` mà chúng yêu cầu.

### Kiểm thử với PUT Methods
1. Nắm bắt yêu cầu cơ sở của victim bằng Web Proxy.
2. Thay đổi phương thức thành `PUT` và thêm file `test.html`, cuối cùng gửi yêu cầu đến Server.
```
PUT /test.html HTTP/1.1
Host: testing-website

<html>
HTTP PUT Method is Enabled
</html>
```
3. Nếu Server phản hồi với mã thành công **2XX** hoặc **3XX** và sau đó xác nhận phương thức `GET` yêu cầu cho file `test.html`.
Nếu phương thức HTTP `PUT` không được phép trên URL hoặc Request, bạn hãy thử các URL khác.
> **LƯU Ý:** *Nếu bạn tải lên Web Shell thành công, bạn nên ghi đè lên nó hoặc đảm bảo rằng nhóm bảo mật của victim đã biết và loại bỏ thành phần ngay sau khi proof-of-concept.*

Tận dụng phương thức `PUT`, bạn có thể đặt nội dung độc hại tùy ý và tiềm ẩn vào hệ thống, điều này có thể dẫn đến thực thi mã từ xa, làm mất chức năng trang web hoặc từ chối dịch vụ.

### Kiểm tra bỏ qua kiểm soát truy cập
Tìm một trang để truy cập có ràng buộc bảo mật sao cho yêu cầu `GET` buộc chuyển hướng 302 đến trang đăng nhập hoặc buộc đăng nhập trực tiếp. Sử dụng phương thức `HEAD`, `POST`, `PUT`, ... cũng như các phương thức được tạo tùy ý như `BILBAO`, `FOOBAR`, `CATS`, ... 

Nếu ứng dụng web phản hồi bằng `HTTP / 1.1 200 OK` thì đó không phải là trang đăng nhập , có thể bỏ qua xác thực hoặc ủy quyền. Bạn có thể sử dụng [Nmap’s ncat](https://nmap.org/ncat/).
```
$ ncat www.example.com 80
HEAD /admin HTTP/1.1
Host: www.example.com

HTTP/1.1 200 OK
Date: Mon, 30 May 2021 22:44:11 GMT
Server: Apache
Set-Cookie: PHPSESSID=pKi...; path=/; HttpOnly
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Set-Cookie: adminOnlyCookie1=...; expires=Tue, 18-Aug-2009 22:44:31 GMT; domain=www.example.com
Set-Cookie: adminOnlyCookie2=...; expires=Mon, 18-Aug-2008 22:54:31 GMT; domain=www.example.com
Set-Cookie: adminOnlyCookie3=...; expires=Sun, 19-Aug-2007 22:44:30 GMT; domain=www.example.com
Content-Language: EN
Connection: close
Content-Type: text/html; charset=ISO-8859-1
```
Nếu hệ thống có vẻ dễ bị tấn công, bạn sử dụng CSRF như sau để khai thác vấn đề một cách đầy đủ hơn:
* HEAD /admin/createUser.php?member=myAdmin
* PUT /admin/changePw.php?member=myAdmin&passwd=foo123&confirm=foo123
* CATS /admin/groupEdit.php?group=Admins&member=myAdmin&action=add

Bạn sử dụng ba lệnh trên, câu lệnh tạo ra người dùng mới và gán mật khẩu và người dùng đó, khi ấy một người dùng được tạo với quyền quản trị.

## Kiểm tra Cross-Site trên nhiều trang web
> **LƯU Ý:** *Để hiểu logic hơn của một cuộc tấn công theo dõi chéo trang web (XST), bạn phải thành thạo kỹ năng tấn công cross-site.*

Phương thức `TRACE`, nhằm mục đích kiểm tra và gỡ lỗi, hướng dẫn máy chủ web phản ánh thông báo đã nhận và trả lại máy khách. Phương pháp này, mặc dù dường như vô hại, nhưng có thể được tận dụng thành công trong một số trường hợp để lấy cắp thông tin đăng nhập của người dùng. Kỹ thuật tấn công này được phát hiện bởi **Jeremiah Grossman** vào năm 2003, trong một nỗ lực để vượt qua thuộc tính **HttpOnly** nhằm mục đích bảo vệ cookie khỏi bị truy cập bởi JavaScript. Tuy nhiên, phương thức `TRACE` có thể được sử dụng để bỏ qua bảo vệ này và truy cập cookie ngay cả khi thuộc tính này được đặt.
Kiểm tra cross-site trên nhiều địa điểm bằng cách đưa ra một yêu cầu như sau:
```
$ ncat www.victim.com 80
TRACE / HTTP/1.1
Host: www.victim.com
Random: Header

HTTP/1.1 200 OK
Random: Header
...
```
Web Server trả về 200 và phản ánh tiêu đề ngẫu nhiên. Để khai thác thêm vấn đề này, bạn sử dụng câu lệnh:
```
$ ncat www.victim.com 80
TRACE / HTTP/1.1
Host: www.victim.com
Attack: <script>prompt()</script>
```
Ví dụ trên hoạt động nếu phản hồi đang được phản ánh trong HTML.

Trong các trình duyệt cũ hơn, các cuộc tấn công đã được thực hiện bằng cách sử dụng công nghệ [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), công nghệ này đã làm rò rỉ tiêu đề khi máy chủ phản ánh chúng (Ví dụ: Cookie, Authorization tokens, ...) và bỏ qua các biện pháp bảo mật như thuộc tính **HttpOnly**. Cuộc tấn công này chỉ có thể được thực hiện trong các trình duyệt gần đây nếu ứng dụng tích hợp với các công nghệ tương tự như **Flash**.

### Kiểm tra ghi đè phương thức HTTP
Một số Web Frameworks cung cấp một cách để ghi đè phương thức HTTP, yêu cầu bằng cách mô phỏng các HTTP Verbs bị thiếu chuyển một số tiêu đề tùy chỉnh trong các yêu cầu. Mục đích chính của việc này là để vượt qua giới hạn của một số phần mềm trung gian (Ví dụ: Proxy, Firewall) trong đó các phương thức được phép thường không bao gồm `PUT` hoặc `DELETE`. Các headers sau có thể được sử dụng để thực hiện việc ghi đè phương thức như vậy:
* X-HTTP-Method
* X-HTTP-Method-Override
* X-Method-Override

Để kiểm tra điều này, trong các tình huống mà các verbs bị hạn chế như `PUT` hoặc `DELETE` trả về "**405 Method not allowed**", hãy chạy lại yêu cầu tương tự với việc bổ sung các headers thay thế cho ghi đè phương thức HTTP và quan sát cách hệ thống phản hồi. Ứng dụng phải phản hồi bằng mã trạng thái khác (Ví dụ: 200) trong các trường hợp hỗ trợ ghi đè phương thức.

Web Server trong ví dụ sau không cho phép phương thức `DELETE` và chặn nó:
```
$ ncat www.example.com 80
DELETE /resource.html HTTP/1.1
Host: www.example.com

HTTP/1.1 405 Method Not Allowed
Date: Mon, 30 May 2021 18:26:53 GMT
Server: Apache
Allow: GET,HEAD,POST,OPTIONS
Content-Length: 320
Content-Type: text/html; charset=iso-8859-1
Vary: Accept-Encoding
```
Sau khi thêm `X-HTTP-Header`, Server phản hồi yêu cầu với 200:
```
$ ncat www.example.com 80
DELETE /resource.html HTTP/1.1
Host: www.example.com
X-HTTP-Method: DELETE

HTTP/1.1 200 OK
Date: Mon, 30 May 2021 19:26:01 GMT
Server: Apache
```
# Biện pháp khắc phục
* Chỉ cho phép các headers bắt buộc và các headers được phép được định cấu hình đúng.
* Không có giải pháp thay thế nào được thực hiện để bỏ qua các biện pháp bảo mật được thực hiện bởi tác động người dùng, Frameworks hoặc Web Server.
# Công cụ
* [NCat](https://nmap.org/ncat/)
* [Curl](https://curl.haxx.se/)
* [Nmap http-methods NSE Script](https://nmap.org/nsedoc/scripts/http-methods.html)
* [W3af plugin htaccess_methods](http://w3af.org/plugins/audit/htaccess_methods)