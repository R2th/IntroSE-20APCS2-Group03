# I. Tổng quát
JWT hay JSON Web Token là một khái niệm không còn xa lạ với các lập trình viên mỗi khi làm việc với API. Thay vì việc tạo ra một chuỗi kí tự duy nhất cho mỗi client và lưu lại trong database, mỗi khi có request thì chuỗi này sẽ được client gửi lên (có thể là trong cookie, header hoặc body của request) và server query vào trong database để xác thực chuỗi này ứng với user nào. Việc này làm tăng thời gian xử lí của hệ thống, và không tốt với trải nghiệm của người dùng. Với JWT, cơ chế hoạt động của nó cũng tương tự như vậy ngoại trừ việc phải tạo query vào database. JWT không cần phải lưu trữ vào trong database, thay vào đó, nó chỉ cần lưu ở phía client mà thôi. Điều khác biệt này là do cách mà JWT được tạo ra.

JWT được tạo ở phía server với cùng một secret key. Khi nhận một JWT từ client, server dùng key này để xác thực JWT. Vì vậy key này cần phải được bảo mật, không thể publish ra ngoài, và mỗi thay đổi một cách cố tình tới JWT đều sẽ bị trả ra kết quả là failure.

JWT chỉ là một chuỗi kí tự đơn giản nhưng được chia thành 3 phần khác nhau encode bởi base64 và ngăn cách bởi dấu chấm (.)

```
var HEADER_HASH = base64(header);
var PAYLOAD_HASH = base64(payload);
var SIGNATURE_HASH = base64(signature);
var JTW = HEADER_HASH + '.' + PAYLOAD_HASH + '.' + SIGNATURE_HASH;
//JTW ~ xxxx.yyyy.zzzz
```

## 1. header

`header` chỉ là một chuỗi JSON đơn giản, được encode bởi base64, nhưng nó chứa thông tin về cách mà signature của JWT được mã hóa.
JSON object này gồm 2 trường quan trọng là `typ` và `alg`. `typ` luôn là `JWT`, còn `alg` là thuật toán mã hóa, có thể là `HS256`, `RS256`, ...

Ví dụ, với header là
`var header = '{"typ":"JWT", "alg":"HS256"}';`
thì sau khi encode sẽ có phần đầu tiên của JWT là `J3sidHlwIjoiSldUIiwgImFsZyI6IkhTMjU2In0n`

## 2. payload

`payload` là bất cứ thông tin gì mà bạn muốn gộp vào JWT, và nó cũng là một chuỗi JSON. Thông tin này cũng được encode bởi base64 (như ví dụ đầu bài), do đó, bạn cần phải chắc chắn rằng không có thông tin quan trọng, nhạy cảm nào được lưu trong payload (như thể email hoặc password), bởi vì bất cứ ai cũng có thể decode và lấy chúng.

Các thông tin được lưu trong payload của JWT là vô kể, nhưng bạn không nên lưu quá 5-6 trường để giữ cho kích thước của JWT luôn nhỏ. Một vài trường được khuyến khích (không phải bắt buộc) là `iss` cho issuer, `sub` cho subject, `exp` cho expiration time (thời gian hết hạn token), ....(bạn có thể nghiên cứu thêm trong [wiki](https://en.wikipedia.org/wiki/JSON_Web_Token) )

Một payload thông thường sẽ trông như thế này:

`
var payload = '{"userId":"1101001", "name":"John Doe", "exp":1300819380}';
`
sẽ cho ra phần thứ hai của JWT là:
`eyJ1c2VySWQiOiIxMTAxMDAxIiwgIm5hbWUiOiJKb2huIERvZSIsICJleHAiOjEzMDA4MTkzODB9`

## 3. signature

Phần thứ ba và cũng là phần cuối cùng của JWT là signature, nó được tạo thành bởi:
- header
- payload
- secretKey

theo cấu trúc:
```
var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);

HMACSHA256(encodedString, secretKey);
```
với header và payload như trên, thì signature nhận được sẽ là:
`03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773`

(HMACSHA256 là một ví dụ, còn tùy thuộc vào header[:alg] mà thuật toán được sử dụng lại khác nhau, chi tiết ở bảng bên dưới)

|  "alg" Param Value |  Digital Signature or MAC Algorithm | Implementation Requirements |
| -------- | -------- | -------- |
   | HS256        | HMAC using SHA-256            | Required           |
   | HS384        | HMAC using SHA-384            | Optional           |
   | HS512        | HMAC using SHA-512            | Optional           |
   | RS256        | RSASSA-PKCS1-v1_5 using SHA-256      | Recommended        |
   | RS384        | RSASSA-PKCS1-v1_5 using SHA-384      | Optional           |
   | RS512        | RSASSA-PKCS1-v1_5 using SHA-512      | Optional           |
   | ES256        | ECDSA using P-256 and SHA-256 | Recommended+       |
   | ES384        | ECDSA using P-384 and SHA-384 | Optional           |
   | ES512        | ECDSA using P-521 and SHA-512 | Optional           |
   | PS256        | RSASSA-PSS using SHA-256 and MGF1 with SHA-256 | Optional           |
   | PS384        | RSASSA-PSS using SHA-384 and MGF1 with SHA-384 | Optional           |
   | PS512        | RSASSA-PSS using SHA-512 and MGF1 with SHA-512 | Optional           |
   | none         | No digital signature or MAC performed  | Optional           |
   
   Cụ thể về sự khác nhau giữa chúng thì có chi tiết tại [link](https://tools.ietf.org/html/rfc7518#section-3.1) này
   
Do đó, mặc dù header và payload có thể được giải mã và đọc một cách dễ dàng bởi việc decode base64, còn signature thì không, trừ phi secret key lúc này không còn là secret nữa.

   3 phần của JWT được kết hợp một cách chặt chẽ với nhau. Mỗi thay đổi một cách cố tính đến bất cứ phần nào thì đều làm cho JWT bị đánh dấu là invalid. Ví dụ như việc hacker cố tình đổi userID lưu trong payload từ 3 thành 5, sau đó encode base64. Thì khi server nhận JWT này, dùng secretkey để giải mã signature, sẽ thấy userID trong payload và userID trong payload của signature không giống nhau :thumbsup: 
   
 # II. Một vài câu hỏi xoay quanh JWT
 Dưới đây là một vài câu hỏi mà mình sưu tầm được liên quan đến JWT
 ## 1. Câu hỏi 1
  Vì JWT được server tạo ra dựa vào thông tin cố định của user (kiểu như userID) và theo thuật toán. Vậy thì cùng một user, login theo các phiên khác nhau, thì chữ kí trả ra có giống nhau hay không? 
 Ví dụ, thời điểm t1, user A login, server trả ra JWT là chuỗi s1; thời điểm t2, user A login, server trả ra JWT là chuỗi s2. Vậy s1 và s2 sẽ giống nhau?
 
 => Trả lời: Ví dụ trong bài đưa chỉ là đơn giản về cách mà JWT được tạo ra. Trên thực tế, tùy vào yêu cầu từng bài toán mà thông tin lưu trong payload sẽ khác nhau. Với việc người dùng có thể đăng nhập vào bởi nhiều device hoặc có nhiều phiên làm việc, thì trong payload nên lưu thêm giá trị gọi là thời gian băm, khi đó, JWT tạo ra tại các thời điểm khác nhau sẽ khác nhau.
## 2. Câu hỏi 2 
Làm sao để client lấy lại token khi hết hạn?

=> Trả lời: Một cách mà mình thấy khá hay và thường được dùng, đó là sử dụng refresh token.

Thông thường, refresh token được gửi kèm access token sau khi server xác thực xong user. Refresh token thường có thời gian sống lâu hơn access token. Khi access token hết hạn, user sẽ gửi refresh token lên để yêu cầu server cấp lại access token. Chi tiết quá trình này có thể xem tại [link](https://www.tutorialspoint.com/oauth2.0/refresh_token.htm)

Điều đặc biệt ở đây mình muốn nhấn mạnh, đó là cách mà refesh token được tạo ra. Refresh token thường là một chuỗi ngẫu nhiên được random, và nội dung của nó không mang ý nghĩa nào cả.

## 3. Câu hỏi 3
Khi user logout, JWT sẽ được xử lí như thế nào?

=> Trả lời: google search 'revoke jwt token on logout' và bạn sẽ nhận được rất nhiều câu trả lời. Đa số sẽ là xóa bỏ token lưu ở bên phía client đi, khi đấy, client sẽ không có token để gửi lên server cùng các request nữa. Điều này hợp lí, nhưng chưa đủ. Bởi vì token vẫn sẽ tồn tại, và là hợp lệ. Lúc này, nếu như ai đó lưu lại token thì họ vẫn sẽ thao tác được bình thường.
Vì vậy, bên phía server vẫn nên có xử lí gì đấy đối với token này để đánh dấu nó là invalid, xét expiration time chăng? Câu trả lời là không, vì expiration time được cho vào payload lúc tạo ra JWT, việc chỉnh sửa giá trị này là không thể.
Cơ mà JWT không được lưu lại trong database, vậy thì xóa cũng không được? Vậy nên xử lí chung thì sẽ là lưu JWT của user logout vào blacklist, thường là các bộ nhớ tạm thời, kiểu như redis. Với mỗi query gửi lên, đầu tiên, phía server sẽ check token xem có nằm trong blacklist hay không.
# III. Reference
https://medium.com/jspoint/so-what-the-heck-is-jwt-or-json-web-token-dca8bcb719a6