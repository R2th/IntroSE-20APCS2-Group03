## **1.  JSON Web Token là gì?**<br>
JSON Web Token (JWT) là một chuẩn mở (RFC 7519) để truyền thông tin an toàn giữa các bên như một đối tượng JSON. Thông tin này được xác minh và đáng tin cậy bởi chữ ký số. JWT được gán với một khoá bí mật (sử dụng thuật toán HMAC) hoặc một cặp khóa công khai/ khóa riêng sử dụng RSA hoặc ECDSA. Các thông tin trong chuỗi JWT được định dạng bằng Json. <br>
## **2. Khi nào nên sử dụng JSON Web Token?**<br>
●	Xác thực (Authentication): Tình huống thường gặp nhất, khi người dùng đăng nhập, mỗi yêu cầu tiếp theo đều kèm theo chuỗi token JWT, cho phép người dùng có thể truy cập đường dẫn, dịch vụ và tài nguyên được phép ứng với token đó. Đăng nhập một lần cũng là một chức năng có sử dụng JWT một cách rộng rãi, bởi vì chuỗi JWT có kích thước đủ nhỏ để đính kèm trong yêu cầu và sử dụng ở nhiều hệ thống khác nhau.<br>
●	Trao đổi thông tin (Information Exchange): JSON Web Token cũng là một cách hữu hiệu và bảo mật để trao đổi thông tin giữa nhiều ứng dụng, bởi vì JWT phải được ký (bằng cặp khóa công khai và khóa riêng). Ngoài ra, chữ ký cũng được tính toán dựa trên nội dung của header và nội dung payload, nhờ đó, bạn có thể xác thực được nội dung là nguyên bản, chưa được chỉnh sửa hoặc can thiệp. Tuy nhiên, một lưu ý hết sức quan trọng là do cấu trúc của JWT đơn giản nên JWT có thể dễ dàng bị giải mã, do vậy, không nên dùng JWT để truyền các thông tin nhạy cảm. <br>
## **3. Cấu trúc của Json Web Token**<br>
JSON Web Token bao gồm 3 phần, được ngăn cách nhau bởi dấu chấm (.):<br>
●	Header<br>
●	Payload<br>
●	Signature<br>
Vì vậy, 1 JWT sẽ có dạng: xxxxx.yyyyy.zzzzz<br>
### ***3.1.	Header*** <br>
Phần header sẽ chứa kiểu token (mặc định là JWT - Thông tin này cho biết đây là một Token JWT), và thuật toán sử dụng để mã hóa ra chuỗi JWT (HMAC, SHA256 hoặc RSA).<br>
Ví dụ:<br>
```javascript
{
    "typ": "JWT",
    "alg": "HS256"
}
```
●	“typ” (type) chỉ ra rằng đối tượng là một JWT<br>
●	“alg” (algorithm) xác định thuật toán mã hóa cho chuỗi là HS256<br>
### ***3.2.	Payload*** <br>
Phần Payload chứa các thông tin mà ta muốn lữu trữ trong JWT.<br>
Ví dụ:<br>
```
{<br>
  	"userId": "abcd12345ghijk",
  	"username": "bezkoder",
 	 "email": "contact@bezkoder.com",
 	 // standard fields
  	"iss": "zKoder, author of bezkoder.com",
  	"iat": 1570238918,
  	"exp": 1570238992
}
```
Trong đối tượng JSON ở trên, ta lưu trữ 3 trường thông tin của người dùng: userId, username, email.Ngoài ra còn có một số trường standard fields.<br>
Payload chứa các claims. Claims là một biểu thức về một thực thể (chẳng hạn user) và một số metadata phụ trợ. Có 3 loại claims thường gặp trong Payload: reserved, public và private claims. <br>
−	Reserved claims: Đây là một số metadata được định nghĩa trước, trong đó một số metadata là bắt buộc, số còn lại nên tuân theo để JWT hợp lệ và đầy đủ thông tin.<br>
Ví dụ: iss (issuer - người phát hành JWT), iat (issued at - thời gian JWT được phát hành) exp (expiration time - thời gian hết hạn JWT), sub (subject), aud (audience…<br>
−	Public Claims: Claims được cộng đồng công nhận và sử dụng rộng rãi.<br>
−	Private Claims - Claims tự định nghĩa (không được trùng với Reserved Claims và Public Claims), được tạo ra để chia sẻ thông tin giữa 2 bên đã thỏa thuận và thống nhất trước đó. <br>
Lưu ý mặc dù các thông tin được bảo vệ để chống giả mạo, nhưng bất kỳ ai cũng có thể đọc được. Vì vậy, không đặt thông tin bí mật trong phần header hoặc payload của JWT trừ khi nó được mã hóa.<br>
### ***3.3.	Signature***<br>
Phần Signature sẽ được tạo ra bằng cách mã hóa phần header, payload kèm theo một chuỗi khoá bí mật (secret key).<br>
Ví dụ nếu sử dụng thuật toán HMAC SHA256 để mã hoá header và payload, chữ ký sẽ được tạo theo cách sau:<br>
```c
HMACSHA256(
        base64UrlEncode(header) + "." +
        base64UrlEncode(payload),
        secret)
```
Do bản thân Signature đã bao gồm cả header và payload nên Signature có thể dùng để kiểm tra tính toàn vẹn của dữ liệu khi truyền tải. <br>
### **3.4. Kết hợp 3 phần lại với nhau**<br>
JWT là sự kết hợp bởi dấu (.) một đối tượng Header dưới định dạng JSON được mã hóa base64, một đối tượng payload dưới định dạng JSON được mã hóa base64 và một Signature cho URI cũng được mã hóa base64:<br>
<base64-encoded header>.<base64-encoded payload>.<base64-encoded signature> <br>
Ví dụ: <br>
```
“eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJleHAiOjEzODY4OTkxMzEsImlzcyI 6ImppcmE6MTU0ODk1OTUiLCJxc2giOiI4MDYzZmY0Y2ExZTQxZGY3YmM5M GM4YWI2ZDBmNjIwN2Q0OTFjZjZkYWQ3YzY2ZWE3OTdiNDYxNGI3MTkyMmU5IiwiaWF0IjoxMzg2ODk4OTUxfQ.
uKqU9dTB6gKwG6jQCuXYAiMNdfNRw98 Hw_IWuA5MaMo” 
```
## **4. Cách thức làm việc của JWT**<br>
Về cơ bản, các nhà cung cấp danh tính (identity provider - IdP) tạo JWT xác nhận danh tính người dùng và máy chủ tài nguyên (Resource server) sẽ giải mã và xác minh tính xác thực của token bằng cách sử dụng chuỗi bí mật hoặc khóa công khai:<br>
(1)	Người dùng đăng nhập bằng tên người dùng và mật khẩu hoặc bằng google / facebook, và gửi thông tin đăng nhập lên máy chủ.<br>
(2)	Máy chủ xác thực (Authentication server) sẽ xác minh thông tin mà người dùng gửi lên. Nếu thông tin xác thực là chính xác, máy chủ sẽ tạo token được mã hóa với thuật toán HMACSHA256 (sử dụng chuỗi bí mật / khoá riêng tư) và gửi token đó cho client.<br>
(3)	Ứng dụng phía người dùng sẽ lưu trữ và đính kèm token này với các yêu cầu tiếp theo tới máy chủ bằng cách thêm JWT trong tiêu đề xác thực HTTP.<br>
(4)	Sau đó, máy chủ tài nguyên (Resource server) sẽ xác minh tính xác thực của token bằng cách lấy JWT được gửi từ máy khách để giải mã nó (sử dụng chuỗi bí mật / khóa công khai) và so sánh với mã trong cơ sở dữ liệu.<br>
![](https://images.viblo.asia/30a116c0-214a-4905-990b-f10a397547b2.png)<br>
JWT hoàn toàn không ẩn, che khuất, bảo mật dữ liệu. Mục đích của JWT là chứng minh rằng dữ liệu được tạo ra bởi một nguồn xác thực. Sẽ có khả năng xảy ra một cuộc tấn công Man-in-the-middle có thể lấy được JWT, sau đó giải mã thông tin người dùng. vì vậy hãy luôn đảm bảo rằng ứng dụng của bạn có mã hóa HTTPS.<br>
Ta sử dụng chuỗi bí mật để tạo chữ ký. Chuỗi bí mật này là duy nhất cho mọi ứng dụng và phải được lưu trữ an toàn ở phía server. Khi nhận JWT từ client, server lấy chữ ký, xác minh rằng signature được băm chính xác với cùng một thuật toán và chuỗi bí mật như trên. Nếu nó khớp với signature của server, JWT được coi là hợp lệ.<br>
Trong vấn đề xác thực, khi người dùng đăng nhập thành công bằng thông tin đăng nhập của họ, 1 JWT sẽ được trả lại. Vì token là thông tin xác thực nên phải hết sức cẩn thận để ngăn chặn các vấn đề bảo mật. Không nên lưu trữ các dữ liệu phiên nhạy cảm trong bộ nhớ của trình duyệt do thiếu bảo mật.<br>
Bất cứ khi nào người dùng muốn truy cập vào một url được bảo vệ, nó sẽ gửi JWT, thường là trong phần header xác thực bằng cách sử dụng lược đồ Bearer. Do đó, nội dung của header sẽ giống như sau:<br>
Authentication: Bearer <token><br>
Đây là cơ chế xác thực không trạng thái vì trạng thái người dùng không bao giờ được lưu trong bộ nhớ của máy chủ. Các url được bảo vệ của máy chủ sẽ kiểm tra JWT hợp lệ trong phần header xác thực và nếu có, người dùng sẽ được phép truy cập. Vì JWT là khép kín, tất cả các thông tin cần thiết đều có ở đó, giảm nhu cầu quay lại và chuyển tiếp đến cơ sở dữ liệu<br>
## **5. Tài liệu tham khảo:**<br>
- https://jwt.io/<br>
- https://en.wikipedia.org/wiki/JSON_Web_Token