## HTTP Basic authentication
HTTP Basic authentication yêu cầu client cung cấp username và password mỗi lần gọi request.

Đây là cách xác thực đơn giản nhất, không yêu cầu cookies, sessions… Client cần thêm header Authorization vào tất cả các request. Username và password không được encrypt mà được cấu trúc như sau:

* nối username và password theo dạng username:password
* encode chuỗi trên với Base64
* thêm từ khoá Basic
* Ví dụ với username john với password secret :

Ví dụ với username john với password secret :
```
curl --header "Authorization: Basic am9objpzZWNyZXQ=" my-website.com
```
Chúng ta có thể dùng Chrome để quan sát:
![](https://images.viblo.asia/4ef2eba2-9959-4d4e-b7ae-8f6de37a1fa6.png)

Cài đặt HTTP Basic Authentication trong Java cũng khá dễ dàng như ví dụ sau đây:

{@embed: https://gist.github.com/tungpv-0974/47ed0a137ec8e159ecc786cf60efb6f1}

Khá là đơn giản phải không? Vậy nhược điểm của HTTP Basic Authentication là gì?

* username và password được gửi trong mọi request, nên có nguy cơ bị lộ tài khoản, kể cả khi sử dụng kết nối bảo mật.
* Liên kết với SSL/TLS, nếu mà website sử dụng mã hoá yếu thì sẽ bị lộ tài khoản ngay lập tức.
* Không có cách nào để đăng xuất tài khoản cả.
* Phiên đăng nhập sẽ không bao giờ bị hết hạn, trừ khi người dùng đổi password.

## Cookies
Xác thực bằng Cookies sử dụng HTTP cookies để xác thực request của client và duy trì phiên đăng nhập. Luồng hoạt động:

* Client gửi request đăng nhập lên server.
* Khi server nhận được HTTP request, gửi thêm Set-Cookie header vào response.
* Trình duyệt thêm cookie đó vào tất cá các request có cùng origin với origin trong Cookie HTTP header.
* Khi đăng xuất, server sẽ gửi lại Set-Cookie để khiến cho cookie cũ hết hạn.


Nếu muốn sử dụng Cookies để xác thực thì phải tuân thủ một số nguyên tắc sau:

## Luôn luôn sử dụng HttpOnly cookies
Để giảm thiểu khả năng bị tấn công XSS thì luôn sử dụng HttpOnly flack khi thiết lập cookie. Bằng cách đó cookie sẽ không hiện lên ở document.cookies.

## Luôn luôn sử dụng signed cookies
Với signed cookies, server có thể biết được là cookie có bị client sửa đổi hay không.

Ta cũng có thể quan sát được việc sử dụng Cookies để xác thực trên Chrome. Đầu tiên server sẽ thiết lập cookie:
![](https://images.viblo.asia/61ead7c9-996d-4810-ad5b-904664e12141.png)

Sau đó các request sẽ sử dụng cookie trên với domain www.linkedin.com:

![](https://images.viblo.asia/d6892068-3877-4146-96e1-a2f059d9dbb4.png)

Nhược điểm của xác thực sử dụng Cookies:

* Dễ bị tấn công CSRF, cần phải làm thêm một số việc để giảm thiểu rủi ro.
* Không tương thích với REST (vì REST là stateless)

## Tokens

Khái niệm chung nằm sau các phương pháp xác thực dựa trên Tokens khá đơn giản. Khi mà người dùng nhập username và password, họ sẽ nhận được một token. Token đó sẽ cho phép người dùng có thể gọi request lên server để thực hiện thao tác mong muốn, mà không cần phải nhập username và password.

Hiện tại thì JWT (JSON Web Token) có mặt hầu hết khắp mọi nơi nhưng nó vẫn có chứa những nguy cơ an ninh tiềm ẩn.

Đầu tiên hãy cùng tìm hiểu xem JWT là gì nhé. JWT bao gồm 3 phần:

* Header: Chứa kiểu dữ liệu và tên thuật toán hashing – tạm gọi là thuật toán A, được mã hoá bằng A
* Payload: Chứa các thông tin cần gửi như username, title… được mã hoá bằng A
* Signature: Là mã hoá của header, payload và 1 khoá bí mật, được tính theo công thức sau:

```
       A(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```
Chuỗi JWT cuối cùng sẽ có dạng: A(header).A(payload).signature

```
curl --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ" my-website.com
```

 jwt.io có cung cấp debugger để kiểm tra tính đúng đắn của token. Ta có thể quan sát được jwt trên Chrome:
 ![](https://images.viblo.asia/afe13ce1-dffa-40a5-a0e6-77426d751322.png)
JWT  phù hợp với API cho native mobile app hoặc single page application. Có một điều cần lưu ý khi sử dụng JWT là browser sẽ lưu JWT trong LocalStorage hoặc SessionStorage, do đó có nguy cơ bị XSS attack.

Nhược điểm:

* Có thể bị XSS attack.

## Signatures
Dù sử dụng cookies hay là tokens, nếu mà transport layer vì 1 lý do nào đó mà để lộ thông tin, thì attacker hoàn toàn có thể dùng token và cookie để truy cập như người dùng thật.

Một cách để giải quyết vấn đề trên là chúng ta sẽ ký (sign) vào tất cả các request (ở đây chỉ đề cập đến các request qua APIs, không bao gồm các request từ browser).

Sign vào request có nghĩa là phải hash toàn bộ request sử dụng private key. Việc hashing cần sử dụng:
* HTTP method
* Đường dẫn của request
* HTTP headers
* Checksum của HTTP payload
* private key để tạo hash


Người gọi và người cung cấp API phải có chung 1 private key. Một khi mà đã có signature, người dùng cần thêm signature vào query string hoặc HTTP header của request. Người dùng cũng nên thêm date vào để có thể chỉ rõ được thời gian hết hạn của signature.
![](https://images.viblo.asia/b8fd9412-c33c-49b4-96ee-17c5df7fca23.png)
Bằng cách trên, nếu mà transport layer có bị hack thì attacker cũng chỉ có thể đọc được nội dung của request, chứ không thể nào mà giả vờ là user để gửi request được vì không có private key. Hầu hết các dịch vụ của AWS đều sử dụng loại xác thực này.

Nhược điểm:

* Không thể sử dụng với browser/client, chỉ sử dụng với APIs.

## One-Time passwords
Thuật toán One-Time passwords tạo ra 1 password dùng 1 lần (one-time password) dựa vào khoá bí mật được dùng chung và thời gian hiện tại hoặc 1 bộ đếm:

* Time-based One-time Password Algorithm, dựa vào thời gian hiện tại
* HMAC-based One-time Password Algorithm, dựa vào bộ đếm


One-Time passwords thường được áp dụng trong các ứng dụng cần bảo mật hai lớp: người dùng nhập username, password sau đó cả server và client sẽ cùng tạo ra một one-time password.

Nhược điểm:

* Nếu khoá bí mật bị lộ thì attacker sẽ nắm được one-time password.
* Client (thường là điện thoại) có thể bị trộm nên hệ thống cần có cách để skip one-time password, ví dụ như là rest qua email.

## KẾT LUẬN
> Vậy qua bài viết này tác giả đã trình bày tổng quan về các phương thức xác thực web. Có được tổng quan về các loại xác thực web, chúng ta có thể đưa ra lựa chọn sử dụng phương pháp nào tùy vào từng trường hợp và nghiệp vụ phù hợp.
>
>  Thanks!!!

>  Bài viết mình tham khảo tài liệu sau : https://blog.risingstack.com/web-authentication-methods-explained/