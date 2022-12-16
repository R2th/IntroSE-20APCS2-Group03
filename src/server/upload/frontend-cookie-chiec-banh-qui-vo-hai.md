Chào các bạn hôm nay mình lại quay trở lại đây, sau 1 thời gian vắng bóng trên giang hồ thì đợt này mình sẽ mang đến cho mn 1 series bảo mật mà mình mới châm cứu được nhé :v: 
đầu tiên bài hôm nay sẽ nói đến Cookie 1 khá niệm hết sức cơ bản trong thế giới web đúng không, Tuy nhiên nến bạn sử dụng nó không đúng cách thì nó lại là một miếng mồi ngon cho vô số hacker đấy nhé =))  :+1:

# Bản chất của cookie
Server và Client giao tiếp với nhau thông qua giap thức HTTP, Đặc điểm của giao thức này là stateless. Server không thể biết được 2 request có tới từ cùng 1 client hay không.

Vì đặt điểm này, cookie ra đời. Về bản chất, cookie là một file text nhỏ được server gửi về client, sau đó browser lưu vào máy người dùng. Khi client gửi request tới server, nó sẽ gửi kèm cookie. Server dựa vào cookie này để nhận ra người dùng.

Cookie thường có name, value, domain và expiration:

* Name, đi kèm với value: Tên cookie và giá trị của cookie đó
* Domain: Domain mà cookie được gửi lên. 
* Expiration: Thời gian cookie tồn tại ở máy client. Quá thời gian này, cookie sẽ bị xoá.
# Cần thiết nhưng đầy lỗi lầm 
Sau khi tìm hiểu cơ bản về cookie, ta sẽ tìm hiểu những lỗi bảo mật mà cookie có thể gây ra nhé. 

Như mình đã nói, cookie được gửi kèm theo mỗi request lên server. Server dựa theo cookie để nhận dạng người dùng. Do đó, nếu có thể “chôm cookie” của người khác, ta có thể mạo danh người đó.

Cookie có thể bị chôm theo các con đường sau:
* Sniff cookie qua mạng: Sử dụng 1 số tool đơn giản để sniff như Fiddler, Wireshark, ta có thể chôm cookie của người dùng ở cùng mạng. Sau đó, sử dụng EditThisCookie để dump cookie này vào trình duyệt để mạo danh người dùng. 
* Chôm cookie (Cookie thief) bằng XSS: Với lỗ hỗng XSS, hacker có thể chạy mã độc (JavaScript) ở phía người dùng. JS có thể đọc giá trị từ cookie với hàm document.cookie. Hacker có thể gửi cookie này tới server của mình. Cookie này sẽ được dùng để mạo danh người dùng.
* Thực hiện tấn công kiểu CSRF (Cross-site request forgery). Hacker có thể post một link ảnh như sau:
```js
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```
> Trình duyệt sẽ tự động load link trong ảnh, dĩ nhiên là có kèm theo cookie. Đường link trong ảnh sẽ đọc cookie từ request, xác nhận người dùng, rút sạch tiền mà người dùng không hề hay biết. Cách tấn công này có rất nhiều biến thể, mình sẽ nói rõ ở bài viết sau.
> 
# Phòng chống những lỗi bảo mật từ cookie
Như nói ở trên chỉ mới cookie thôi hacker đã có thể phá hỏng toàn bộ trang web của mn rồi đúng không, giờ đang số những framework hiện tại nó đã có những biện pháp để xử lý những vấn đề trên nhưng mình chắc chắn là vẫn có lỗ hổng, nên mọi người chỉ cần biết để bảo mật trang web của mình nhé 

* Nhớ set **Expired** và **Max-Age** để giảm thiểu thiệt hại khi cookie bị trộm, ta không nên để cookie sống quá lâu. Nên set thời gian sống của cookie trong khoảng 1 ngày tới 3 tháng, tuỳ theo yêu cầu của application
* Sử dụng Flag HTTP Only: Cookie có flag này sẽ không thể truy cập thông qua hàm document.cookie. Do đó, dù web có bị lỗi XSS thì hacker không thể đánh cắp được nó.
* Sử dụng Flag Secure: Cookie có flag này chỉ được gửi qua giao thức HTTPS, hacker sẽ không thể sniff được.
* Vì cookie dễ bị tấn công, tuyệt đối không chứa những thông tin quan trọng trong cookie (Mật khẩu, số tài khoản, …). Nếu bắt buộc phải lưu thì cần mã hoá cẩn thận.
* : Nếu website của bạn sử dụng RESTful API, đừng sử dụng cookie để authorize người dùng mà hãy dùng OAuth hoặc WebToken. Token này được vào Header của mỗi request nên sẽ không bị dính lỗi CRSF nhé.
> Nếu website của bạn sử dụng RESTful API, đừng sử dụng cookie để authorize người dùng mà hãy dùng OAuth hoặc WebToken. Token này được vào Header của mỗi request nên sẽ không bị dính lỗi CRSF nhé.
> 
# Lời kết
Tạm thời bài hôm nay đến đây thôi, mn đọc và hiểu rõ hơn bản chất của thằng cookie này nhé,