Xin chào các bạn, trong bài viết hôm nay chúng ta sẽ cùng tìm hiểu về cách tạo 1 ứng dụng chat đơn giản viết bằng framework nodejs tích hợp thư viện socket.io nhé.
# 1. Ý tưởng ứng dụng
Ý tưởng là tạo một ứng dụng chat cho nhiều người. Tin nhắn được hiển thị luôn chứ không phải load lại trang mới hiển thị ra được. Để đơn giản thì chúng ta sẽ không xây dựng phần xác thực, cũng như chú trọng đến giao diện, mà thay vào đó chúng ta sẽ xoay quanh các sử dụng thư viện socket.io cũng như tạp ra 1 ứng dụng chat gọi là chạy đc thôi nhé :v 
# 2. Khởi tạo project
## 2.1 Tạo thư mục và cài đặt Express
Tạo thư mục bằng terminal và di chuyển tới đó:
```
 mkdir app_chat && cd app_chat
 npm init
```
Chúng ta cần 1 server cho ứng dụng chat và framework cho `nodejs` được chọn đó là `Express`. các bạn chạy lệnh sau để cài `Express` vào project nhé.
```
npm install -s express
```
Để kiểm tra đã cài đặt thành công hay chưa thì chúng ta vào file `package.json` nhé. Nếu có thông tin của `Express` trong file thì nó đã được cài thành công rồi.
```
  "dependencies": {
    "express": "^4.16.4"
  }
```
Bước tiếp theo là khởi tại file `server.js` để tiến hành phát triển ứng dụng của chúng ta. File chính là bộ não của app chat, bao gồm các xử lý resquest, response, lưu vào database,...
```
var express = require(‘express’);
var app = express();

var server = app.listen(3000, () => {
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
```
## 2.2 Tạo view index.html
Sau đó tạo 1 file view là `index.html` cho app chat, trong file view mình có dùng các CDN Bootstraps. 
```
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"crossorigin="anonymous"></script>

</head>
<body>
  <div class="container">
    <br>
    <div class="jumbotron">
      <h1 class="display-4">Message App</h1>
      <br>
      <input id="name" class="form-control" placeholder="Họ tên">
      <br>
      <textarea id="message" class="form-control" placeholder="Nhập tin nhắn tại đây"></textarea>
      <br>
      <button id="send" class="btn btn-success">Gửi</button>
    </div>
    <div id="messages"></div>
  </div>
</body>
</html>
```
## 2.3 Nodemon
Chúng ta nên sử dụng gói `nodemon` để không phải reset lại server mỗi khi thay đổi code.
```npm install -g nodemon```
để start nodemon trong terminal ta chỉ cần: 
```nodemon ./server.js```
nếu chạy trên `localhost:3000` mà ra view như hình dưới thì chúng ta đã start server và tạo view thành công cho app chat rồi đó :vulcan_salute: .
![](https://images.viblo.asia/f8a45bcd-4bf2-4bca-beb4-73f9cb764a3a.png)
## 2.4 Mongoose
Sau khi tạo view thành công, bước tiếp theo đó là tạo connect tới `mongodb` và gói mà tôi hướng tới đó là `mongoose`.
```
npm install -s mongoose
```
Khai báo thư viện vào file `server.js`
```
var mongoose = require('mongoose');
```
mình sẽ dùng mongo trên máy local luôn, thay vì bài hướng nhiều hướng dẫn khác hay dùng mlab.com. đầu tiên chúng ta tiến hành tạp 1 database mongo đã nhé. Đăng nhập vào Mongo bằng cách
```
mongo
```
tạo project:
```use app_chat``` 
nếu như project có sẵn rồi thì nó sẽ connect tới db là app_chat còn không thì nó sẽ tạo 1 database và connect.
Trở lại với project thì ta sẽ tiến hành tạo connect từ app.
```
mongoose.connect('mongodb://localhost:27017/app_chat123', (err) => {
    console.log("Kết nối thành công", err);
})
``` 
và định nghĩa 1 model để ánh xạ từ collection messages ở mongodb ra.
## 2.5Body-Parser
```
npm install -s body-parser
```
Thêm đoạn sau vào để cài đặt thư viện body-parser. 
```
var bodyParser = require(‘body-parser’)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
```
==> ok vậy là bước chuẩn bị đã xong, bước tiếp theo là chúng ta sẽ tiến hành xây dựng logic cho app.
# 3. Xây dựng logic cho web chat
## 3.1 Xây dựng router 
chúng ta sẽ định nghĩa 3 router trong app này. đó là get và post:
Đường dẫn mặc định(cái này đã có ở trên rồi):
```
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
```

get: tức là khi có request tới `locahost:3000/messages` có method là `GET` thì sẽ load hết tất cả tin nhắn từ mongoDB ra(mình làm đơn giản vậy thôi nhá :v )
```
app.get('/messages', (req, res) => {
    messages.find({}, (err, messages) => {
        res.send(messages); // trước mắt cứ show trước dạng json đã nhé
    })
})
```
post:  Tương tự thì chúng ta có `POST` tạo 1 bản ghi và ghi mới vào database.
```
app.post('/messages', (req, res) => {
    var  message = new Messages(req.body);  // khởi tạo 1 đối tượng Messages 
    // Tiến hành lưu dữ liệu vào mongo
    message.save((err) => {
        if(err) res.sendStatus(500);
        res.sendStatus(200);
    });
});
```
ở ngoài file view index.html chúng ta cần thêm 1 số xử lý javascript để gửi dữ liệu và request về server.
```
<script>
    $(() => {
      $("#send").click(()=>{
         sendMessage({
            name: $("#name").val(), 
            message:$("#message").val()});
          })
        getMessages()
      })
  function addMessages(message){
     $("#messages").append(`
        <h4> ${message.name} </h4>
        <p>  ${message.message} </p>`)
     }
  function getMessages(){
    $.get('http://localhost:3000/messages', (data) => {
     data.forEach(addMessages);
     })
   }
  function sendMessage(message){
     $.post('http://localhost:3000/messages', message)
   }
</script>
```
Mình xin gải thích 1 chút về đoạn js, thực ra nó cũng dễ hiểu thôi:
    + khi có sự kiện click vào button submit với id là send thì tiến hành gửi request kiểu post thông qua sendMessage() để tới server lưu lại bản ghi.
    + hàm getMessages() chỉ là hàm request yêu cầu server trả về dữ liệu của bảng thôi.
==> ok bây giờ các bạn trở lại và reset lại trang thì đã có thể thấy hiển thị dữ liệu chat rồi đó, bạn có thể gửi tin nhắn được rồi, tuy nhiên nó chưa hiện real time như mong muốn được, vì vậy chúng ta tiếp tục xử lý ở bước sau nhé.
## 3.2 Socket.io
### 3.2.1 Socket.io là gì
`Socket.io` là 1 thư viện javascript dành cho ứng dựng web realtime. nó cho phép giao tiếp realtime giữa `client` và `server`. Nó bao gồm 2 phần đó là thư viện phía client và thư viện phía server. Hay nói cách khác đó là để sử dụng được socket.io cho app web ta cần phải có socket.io ở cả view và server.
### 3.2.2 Cài đặt và sử dụng
```
npm install -s socket.io
```
Phía view:
```
npm install -s http
```
Import thư viện vào app:
tại server:
```
var http = require('http').Server(app);
var io = require('socket.io')(http);
```
tại view:
```
  <script src="/socket.io/socket.io.js"></script>
```
tạo connect:
```
io.on('connection', () =>{ 
    console.log('connecting');
});
```
thêm dòng sau vào file `server.js` vào middlewave `app.post`
``` io.emit('message', req.body);```
Hiện tại khi click submit thì tin nhắn mới chưa hiển thị lên luôn được, vì vậy ta cần thêm đoạn sau vào phần script của file index.html
```
var socket = io();
socket.on(‘message’, addMessages);
```
![](https://images.viblo.asia/3af62cc9-f4be-4d48-83e0-88eee0aa3e1b.png)
# 4. Github
Các bạn có thể tại source code về tham khảo tại đây [tại đây](https://github.com/longnguyen28596/app_chat) nhé
# 5. Kết luận
ok như vậy là mình và các bạn đã xây dựng xong 1 app chat đơn giản nhất, giờ các bạn có thể sử dụng và phát triển tiếp ứng dụng thêm nhé. Cảm ơn các bạn đã đọc bài viết của mình.