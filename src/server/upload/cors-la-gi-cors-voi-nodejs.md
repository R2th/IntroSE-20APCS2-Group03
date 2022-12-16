# CORS (hay Cross-origin resource sharing) là gì ?
- Đúng như tên của nó thì cors nghĩa là chia sẻ tài nguyên chéo nhau, hơi khó hiểu 1 tí nhưng dễ hiểu hơn thì nó là việc bạn chia sẻ tài nguyên của các domain khác nhau cho nhau, hay đơn giản hơn là khi việc client gọi 1 api từ 1 nguồn khác có domain khác với trang hiện tại (nguồn gốc) chính là cors.
# Lỗi cors trên trình duyệt: 
![](https://images.viblo.asia/54f1a574-a380-4f58-ac5c-f15c20f07159.png)
- Một số bạn viết api hay làm front end ở phía client thì chắc cũng sẽ có vài lần gặp phải trường hợp như trên, vậy thì lỗi này do đâu và cách xử lý như thế nào ?
- Lỗi cors là một chính sách của trình duyệt nhằm ngăn chặn việc truy cập tài nguyên của các domain khác khi không được phép. Giả sử mình có api viết ra nhưng bất kì đâu, bất kì trang web nào cũng có thể sử dụng, muốn ngắn chặn điều đó bạn chỉ việc không cho phép cors để giảm không cho các domain, máy chủ khác sử dụng api của mình, ngoài ra nó cũng giúp bảo vệ cho người dùng tránh các trang web độc hại truy cập các resource khác trái phép.
- Fix lỗi cors: Để cho phép một ứng dụng web chạy ở origin này (thường là domain này) có thể truy cập được các tài nguyên ở origin khác (domain khác) ta cần cho phép cors thông qua các trường trong HTTP header để trình duyệt biết rằng ta cho phép truy cập cors.
- Để thực hiện cors thì bắt buộc phải khai báo Access-Control-Allow-Origin trong Header để khai báo các nguồn được phép truy câp, có thể là * để cho phép tất cả các nguồn truy cập đến.
** Như vậy thôi thì vẫn là chưa đủ vì có thể có nhiều nguyên nhân khác như methods hay content-type không được chấp nhận,  ở đây mình chỉ hướng dẫn và giới thiệu sơ để enable cors cho api của bạn nhé, nếu mọi thứ không hoạt động bạn có thể tham khảo thêm để xem mình gặp lỗi gì tại
https://developer.mozilla.org/vi/docs/Web/HTTP/Access_control_CORS
# CORS với nodejs (express)
- Sử dụng middleware gắn Access-Control-Allow-Origin vào response.
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
# Sử dụng pakage CORS cho express.
ref:  https://www.npmjs.com/package/cors
- Cors là 1 pakage hết sức tiện lợi, cung cấp các middleware cho phép ta enable cors với nhiều option để tùy chỉnh và ngắn gọn cho express.
- Cài đặt và cấu hình
+ Cài đặt
```
$ npm install cors
```
+ Để cho phép cors với toàn bộ route: 
```
var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
+ Hoặc chỉ với 1 route chỉ định, bạn chỉ việc thêm middleware cors cho route đó.
```
var express = require('express')
var cors = require('cors')
var app = express()
 
app.get('/allow_cors', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
```
+ Bạn cũng hoàn toàn chỉ định cụ thể 1 hay nhiều nguồn giới hạn được phép truy cập...
+ Ngoài ra còn có rất nhiều option khác tùy thuộc vào tình huống bạn găp phải mà có thể xem thêm tại: https://www.npmjs.com/package/cors
# Tổng kết
- Có thể sẽ có nhiều bạn cảm thấy cors thật sự phiền toái và vô dụng, nhưng thật sự thì cors nó giúp cho cả máy chủ của bạn lẫn người dùng web giải quyết rất nhiều vấn đề cũng như giảm thiểu các rủi ro.
- Nội dung bài viết có thể chưa hoàn chỉnh hoặc có sai xót, mọi thăc mắc hay góp ý các bạn có thể reply trực tiếp bên dưới mình sẽ cố hết sức để trả lời. cảm ơn các bạn đã đọc đến đây. :heart_eyes: