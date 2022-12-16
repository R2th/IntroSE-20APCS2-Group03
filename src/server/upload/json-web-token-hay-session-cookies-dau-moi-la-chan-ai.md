Chắc hẳn trong mỗi chúng ta, ai đã từng lập trình Web hay App dù là level Beginner thì đều biết đến chức năng vô cùng cơ bản, đó là xác thực người dùng,  phải không nào :grinning: Bất kì một trang Web hay một App nào đều cần phải có một phương thức xác thực hiệu quả và an toàn nhất. Để mà nói sâu về xác thực người dùng thì sẽ tốn rất nhiều giấy mực, nếu chúng ta muốn tìm hiểu sâu về nó. Nhưng trong khuôn khổ bài viết này, mình sẽ trình bày về 2 phương pháp phổ biến nhất trong Authentication, đó là JWT (JSON Web Token) và Session Cookies, qua đó so sánh từng điểm mạnh, điểm yếu của mỗi phương pháp. Bắt đầu thôi :laughing:

# Một chút về giao thức HTTP
Khoan vội nhắc đến mấy cái JWT hay Session Cookies này nọ kia, mình sẽ nói về giao thức HTTP trước nhé. 


Đại khái thì HTTP là giao thức cho phép client (Front end) và server (Back end) có thể giao tiếp với nhau và nó là một dạng giao thức không trạng thái (stateless).
Thế không trạng thái nghĩa là thế nào? Hãy thử tưởng tượng chúng ta đăng nhập vào trang Facebook bằng tài khoản của mình, sau đó, chúng ta muốn vào trang Settings để cài đặt thiết lập. Tuy nhiên khi chuyển hướng sang trang Settings, chúng ta sẽ phải đăng nhập lại một lần nữa :slightly_frowning_face:. Nguyên nhân là do HTTP là giao thức không trạng thái nên khi tạo request truy cập vào trang Settings, server sẽ không biết rằng chúng ta đã đăng nhập trước đó, tức là đã từng tạo 1 request đăng nhập gửi lên server rồi, do 2 request này hoàn toàn độc lập với nhau. Thật là bất tiện phải không! (Tất nhiên là trang Facebook thật thì chúng ta không gặp hiện tượng này rồi :sweat_smile: vì họ có áp dụng các phương pháp xác thực mà mình sẽ trình bày ở phần tiếp theo.)

Tuy nhiên, bằng Session Cookies hay Token gửi theo mỗi request, chúng ta có thể cho server biết rằng chúng ta đã đăng nhập trước đó rồi và có thể truy cập vào trang Settings mà không cần đăng nhập lại. Do đó 2 phương pháp này có thể khắc phục đặc điểm không trạng thái (stateless) của giao thức HTTP.  Chúng ta hãy cùng tìm hiểu kĩ hơn về 2 phương pháp này nhé !

# Xác thực dựa trên Session
Session được hiểu là một phiên làm việc giữa client và server. Session sẽ tồn tại từ khi bạn mở trình duyệt, truy cập vào trang bạn cần cho tới khi bạn tắt trình duyện đi.

Sau khi đăng nhập xong (mình sẽ tạm gọi đây là request đầu tiên), server sẽ tạo một session và dữ liệu của session sẽ được lưu ở trên bộ nhớ của server. Mỗi session thì có một ID riêng, và ID này sẽ được lưu ở cookie trên trình duyệt của người dùng. Từ request thứ 2 trở đi, cookie sẽ được gửi kèm theo mỗi request. Server có thể so khớp session ID trong cookies được gửi kèm kia với session data lưu ở trong bộ nhớ, qua đó xác thực danh tính của người dùng vào trả về response. Đến khi đăng xuất, toàn bộ session data này sẽ bị xóa khỏi bộ nhớ.

# Vậy chính xác thì cookies nó là cái gì ?
Cơ bản thì bạn có thể coi cookies là phần dữ liệu được lưu ở trên máy của bạn, websites có thể truy cập vào dữ liệu này và thực hiện các chức năng khác nhau (có thể là xác thực hoặc có thể là lưu lại lịch sử giỏ hàng của bạn - rất phổ biến đối với những trang thương mại điện tử )

Cookie là một kĩ thuật đáng tin cậy cho website trong việc lưu lại những thông tin hoặc ghi lại những hoạt động của trình duyệt người  dùng.


![](https://images.viblo.asia/cb60ea81-4e26-40ef-9e90-5339da350f7b.png)

# Thế còn xác thực dựa trên Token thì sao?
Khi nhắc đến xác thực dựa trên Token thì người ta thường nhắc đến JWT (JSON Web Token) vì nó được sử dụng rất rộng rãi và gần như đã trở thành một trong những phương pháp tiêu chuẩn trong việc xác thực (Authentication).

Cũng giống như Session-based Authentication, đối với Token-Based Authentication, sau khi người dùng đăng nhập thì server sẽ sinh ra một đoạn mã token và gửi lại đoạn token này cho phía client. Đoạn Token này, hay nói các khác là mã JWT, được lưu ở phía client, thường là ở trong local storage, và sẽ được gửi kèm vào phần header của mỗi request tiếp theo.

Đối với mỗi request, server sẽ decode JWT được gửi kèm, và nếu token hợp lệ, server sẽ tiếp tục xử lý request và trả về response, còn nếu không thì server sẽ coi rằng người dùng không hợp lệ. Khi người dùng đăng xuất, token sẽ bị xóa ở phía client mà không có bất kì tác động nào đến server.
![](https://images.viblo.asia/831c7e22-6c41-4cf1-80a7-c680fbec2e50.png)

# Vậy JWT nó là cái gì vậy ?
JSON Web Token (JWT) là một tiêu chuẩn (RFC 7519) để truyền thông tin giữa các điểm dưới dạng object JSON. Nó được sử dụng để xác định rằng dữ liệu được truyền đi luôn bởi 1 nguồn xác thực đáng tin cậy.

JWT bao gồm ba phần, được ngăn cách bởi dấu chấm (.), đó là :

1.  Header
2.  Payload
3.  SIgnature

Một chuỗi JWT sẽ có dạng như sau:

```
xxxxxx.yyyyyy.zzzzzz
```

## Phần Header
Phần đầu tiên là phần Header, nó sẽ bao gồm 2 phần : Đó là kiểu của token này, tức là JWT, và phần thứ 2 là loại thuật toán mã hóa được dùng, đó có thể là HMAC, SHA256 hay RSA. Mặc định thì thuật toán được dùng là HS256

Ví dụ :
```
{
“alg”: “HS256”,
“typ”: “JWT”
}
```

## Phần Payload
Phần thứ 2 là Payload, bao gồm tập các trường lưu lại thông tin như danh tính hay các quyền mà người dùng được cho phép. Lưu ý là không nên để những phần dữ liệu nhạy cảm vào trong phần payload này vì nó rất dễ để có thể decode. Ví dụ mà bạn để password của mình vào trong phần payload này là toang đấy, bị lộ mật khẩu ngay :sweat_smile:

Mình sẽ lấy ví dụ, phần payload có thể trông như thế này 
```
{
“school”: “HUST”,
“name”: “Le Viet Hoang”,
“admin”: true
}
```

## Phần Signature
Phần cuối cùng và cũng là phần quan trọng nhất của một token, đó là phần signature. Phần signature sẽ được xác định bằng cách tính tổng các chuỗi mã hóa của phần header, phần payload, với một khóa bí mật, và cuối cùng là thuật toán đã được xác định ở phần header.

Ví dụ nếu bạn muốn mã hóa sử dụng thuật toán HS256, phần signature sẽ được tính bằng cách :
```
HS256(
base64UrlEncode(header) + “.” +
base64UrlEncode(payload),
secret)
```

Phần signature đúng như tên gọi của nó, được sử dụng để xác nhận rằng chuỗi token không bị thay đổi trong lúc gửi đi. Đây cũng là phần quan trọng nhất trong cấu trúc của JWT, bởi vì phần header và phần payload có thể dễ dàng decode, nhưng signature thì không vì nó yêu cầu cần phải có khóa bí mật. Trừ khi ai đó có được khóa bí mật này thì họ mới có thể giải mã.

Ví dụ mình có chuỗi JWT sau : 
```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hvb2wiOiJIVVNUIiwibmFtZSI6IkxlIFZpZXQgSG9hbmciLCJhZG1pbiI6dHJ1ZX0.QM7C7vuOyklOegqP2TrhH1wAvHJLSjF-UFfNItqJkQA```

Sau khi decode, mình sẽ có kết quả là: 
![](https://images.viblo.asia/6de93ad9-2638-4bd3-9670-5231abec3b0d.png)

Các bạn có thể truy cập [jwt.io](https://jwt.io/#debugger-io) để có thể nhập chuỗi JWT và decode chúng.

# Vậy nên sử dụng phương pháp nào? Tại sao?
Theo mình, phương pháp Token-Based authentication có một chút ưu điểm hơn so với phương pháp Session-Based. Phương pháp này sẽ cho phép hệ thống dễ dàng mở rộng hơn vì tokens được lưu ở phía client còn session được lưu ở phía server - tức là sẽ tốn bộ nhớ của server - điều này có thể gây ra vấn đề khi mà có rất nhiều người dùng cùng truy cập hệ thống một lúc. 

Hơn nữa, phương pháp Session-based sẽ gây ra khó khăn khi chúng ta scale hệ thống theo chiều ngang, tức là đặt thêm một hay nhiều server hoạt đồng cùng lúc. Vì khi đó session ID được gửi kèm request có thể được tìm thấy ở server này nhưng lại không được tìm thấy ở server khác.

Tuy nhiên thì phương pháp Token-based cũng có một số hạn chế nhất định. JWT luôn có kích thước lớn hơn rất nhiều nếu so sánh với Session ID được lưu ở cookies vì JWT chứa nhiều thông tin của người dùng hơn. Hãy cẩn trọng trong việc lưu dữ liệu người dùng vào JWT, tránh lưu những phần dữ liệu nhạy cảm ví dụ như mật khẩu.

Mình hi vọng với những kiến thức mình tìm hiểu được, bài viết này sẽ mang lại cho bạn những hiểu biết cơ bản về Session Cookies và JWT. Cảm ơn các bạn đã đọc bài của mình :laughing:

Tài liệu tham khảo:

https://medium.com/swlh/why-do-we-need-the-json-web-token-jwt-in-the-modern-web-

https://medium.com/better-programming/json-web-tokens-vs-session-cookies-for-authentication-55a5ddafb435