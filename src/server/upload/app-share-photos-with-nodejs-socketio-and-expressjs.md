### Ở bài trước mình đã hưỡng dẫn làm app chat bằng nodejs và Socket.io. Bài này tiếp tục mình hướng dẫn upload ảnh với Socket.io và ExpressJs. Các bạn có thể apply 2 cái này thành một ứng dụng vừa chát vừa có thể share ảnh cho nhau.
OK nói nhiều làm gì. Quất => 

Các yêu cầu chưa bao giờ là điểu thừa và luôn "CẦN" thiết.
## Yêu cầu:
* Bạn đã hiểu về Nodejs
* Chọn 1 IDE code bất kì bạn thích. Có thể là Notepad++, Sublime hay gì gì đó tùy bạn
* Hiểu và lập trình được Javascript căn bản
## Mô hình:
![](https://images.viblo.asia/a77412d6-4195-44fd-a0ad-47ad30b89ef1.png)

Ứng dụng gồm có 3 thành phần:
* Nodejs server: Server đóng vài trò trung gian điều phối.
* Sender: Client để user send ảnh
* Receiver: Client để user nhận ảnh
Ở đây mình làm ra thành 2 trang riêng biệt để dễ phân biệt. Thật ra có thể thiết kế 1 trang vừa gởi vừa nhận cũng được, tùy cách bạn tùy biến.
## Chuẩn bị thư mục project của bạn.
Tạo thư mục photoshare, nạp các thư viện cần thiết cho dự án như Socket.io, Expressjs… Chạy các lệnh sau với terminal:
```
mkdir photoshare
npm install express socket.io
```
Nếu đường truyền nhà bạn yếu thì có lẽ bạn nên mở nhạc, đứng dậy pha cà phê, sẽ tốn kha khá thời gian đấy. Sau khi tải xong, sẽ có 1 thư mục `node_modules`  được tạo ra, và cũng chỉ có vậy, không cần để ý đến nó nữa, bắt đầu code thôi!
    **Lưu ý**: Nếu tên thư mục và file ko được nói cụ thể, chỉ có tên thì có nghĩa là nằm trực tiếp trong thư mục gốc của project photoshare/
## Dùng Expressjs để tạo web server:
Đầu tiên cần khai báo các gói thư viện cần sử dụng, tạo file server.js và code như dưới:
```
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
```
Ở đây ta dùng Expressjs để có thể tạo server web (đúng hơn là 1 ứng dụng) có khả năng phục vụ các file tĩnh như ảnh, css stylesheet, javascript. Expressjs có thể tự mình khởi chạy ứng dụng, không cần đến gói http, nhưng do chúng ta cũng dùng web socket trên cùng ứng dụng nên cần gói http để kết nối hai thành phần.

Tiếp theo cần cấu hình một chút cho Expressjs.
```
app.use(express.static(__dirname + '/public'));
```
Thư mục public sẽ là nơi chứa toàn bộ các file tĩnh. Bạn có thể đặt bất kì file nào ở đây và mở thông qua trình duyệt đều được cả. Đây cũng là 1 cách bảo mật ứng dụng, dấu code xử lý ở bên ngoài thư mục public có thể truy cập thông qua http request. Như vậy để tạo 2 trang cho sender/receiver, chỉ cần viết 2 trang html tĩnh đặt vào public là đã truy cập được vào. Mình chọn cách tạo file html tĩnh để đơn giản cho các bạn mới bắt đầu, nếu dùng template engine – jade chẳng hạn – sẽ gây khó khăn cho các bạn mới bắt đầu. Đến khi nào viết ứng dụng cần tạo ra giao diện động, tùy theo từng user thì bạn mới cần template engine.  Bây giờ thì gọi lệnh khởi động server:
```
server.listen(3000);
console.log("Server - Waiting connection at port: 3000");
```
Mình dùng port 3000 cho ứng dụng, có thể chọn bất kì port nào khác, nhưng nhớ là nhỏ hơn 65536 (port lớn nhất có thể mở) và và lớn hơn 1000 (dưới 1000 là các port dùng cho các ứng dụng phổ biến khác). Dòng console.log để xuất thông báo lên cửa sổ console chạy ứng dụng, báo cho ta biết ứng dụng đã chạy thành công.

Trước khi chạy thử ứng dụng, nhớ tạo thư mục “photoshare/**public**“, sau đó thử tạo file **public/sender.html**:
```
<!DOCTYPE html>
<html>
<head>
	<title>Photosharing in real-time with NodeJS</title>
</head>
<body>
<h1>Hello Sender!</h1>
</body>
</html>
```
Để chạy ứng dụng, mở cmd chạy lệnh:
```
node server.js
```
Bây giờ mở Chrome và gõ vào địa chỉ: *http://localhost:3000/sender.html*. Nếu cả cmd và chrome không báo lỗi gì thì ta đã thành công một nữa rồi đấy.
## HTML template cho sender và receiver
Ta sẽ cần 2 trang khác nhau cho 2 người dùng, tạo tempalate đơn giản như sau:
* Trang gởi: Gồm có nút chọn file để gởi, 1 thẻ img để review xem ảnh được gởi là ảnh nào
* Trang nhận: Một thẻ img để sẵn, khi nào có ảnh sẽ chèn vào.
### public/sender.html
```
<!DOCTYPE html>
<html>
<head>
	<title>Sender</title>
	<script src="/socket.io/socket.io.js"></script>
	<script src="sender.script.js"></script>
</head>
<body>
	<img id="review" width="600"></img>
	<input id="fileSelector" type="file">
</body>
</html>
```
### public/receiver.html
```
<!DOCTYPE html>
<html>
	<head>
	  <title>Receiver</title>
	  <script src="/socket.io/socket.io.js"></script>
	  <script src="receiver.script.js"></script>
	</head>
 
	<body>
	<div id="wrapper">
	  <h1>Receiver</h1>      
	  <img id="showPhoto" src="">
	</div>
	</body>
</html>
```
### Socket.io – code gởi nhận ảnh phía client
Như trên ta vừa tạo được html template bên ngoài rất đơn giản. Bây giờ cần code thêm 1 xíu cho phía client để kết nối với server và gởi nhận ảnh:
### public/sender.script.js
```
var socket;
window.onload = function() {
	
	socket = io.connect();
	
	socket.emit("setRole","sender");
 
	document.getElementById("fileSelector").addEventListener("change", function(){	
	submitImg();
	});
 
};
 
function submitImg(){
	var selector = document.getElementById("fileSelector");
	var img = document.getElementById("review");
 
	var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            socket.emit("sendImage", {base64:e.target.result});
        }
 reader.readAsDataURL(selector.files[0]);
}
```
Để mở kết nối đến server, gọi hàm io.connect(), hàm này nhận tham số đầu vào là URL đến server, nếu không có, mặc định nó sẽ connect đến địa chỉ server phục vụ trang hiện tại. Ngay sau khi connect thì client sẽ gởi sự kiện “setRole”  ``` socket.emit("setRole","sender") ``` Xác nhận vai trò của client là **sender**. Cần handle thêm sự kiện khi người dùng chọn file, thì thực hiện gởi ảnh lên. Trong hàm submitImg(), có 1 đoạn hơi khó hiểu là đoạn tạo FileReader. Do browser không thể truy cập trực tiếp đến file trên ổ cứng, nên cần dùng object này để đọc file và chuyển thành dạng dữ liệu ảnh encode base64. Dữ liệu ảnh base64 này cũng dùng để truyền lên server qua socket.
### public/receiver.script.js
```
var socket;
 
window.onload = function(){
	socket = io.connect();
	socket.emit('setRole', 'receiver');
	socket.on('receivePhoto', function(data){
	document.getElementById("showPhoto").src = data.path
	});
}
```
Code nhận ảnh chỉ đơn giản là khai báo handle sự kiện nhận ảnh – receivePhoto – khi nào có dữ liệu thì chèn ảnh vào thẻ img có id showPhoto.
## Socket.io – Server code : trung gian điều phối
Server sẽ xử lý tất cả 4 sự kiện socket chính, trong đó 2 sự kiện connection , disconnect  là sự kiện built-in của Socket.io, 2 sự kiện sendPhoto  vả receivePhoto  là custom của chính chúng ta. Về ý tưởng của Socket.io, nó sẽ tập trung việc 1 đầu kết nối raise lên sự kiện có tên gì đó, gởi dữ liệu; đầu kết nối còn lại khai báo lắng nghe sự kiện, khi có sự kiện xảy ra thì gọi hàm callback thực hiện. Như vậy luồng xử lý của ứng dụng photoshare chúng ta đang làm như sau:

1. Sender gởi ảnh qua sự kiện sendPhoto
2. Server thấy có sender báo “sendPhoto”, liền la lên – “Ê receiver, có người gởi ảnh, mày nhận ảnh nèk!”, server la làng bằng cách gởi sự kiện receiverPhoto cùng dữ liệu (link ảnh)
3. Receiver đợi sự kiện nhận ảnh nãy giờ, receiver nhận data từ sự kiện receivePhoto, và hiển thị ảnh lên màn hình.
Bạn sẽ cần 1 đoạn code thêm như bên dưới, chèn vào cuối file server.js ta đã có ở trên:
```
var roles = {
  sender  : "",
  receiver    : ""  
};
io.sockets.on('connection', function (socket) { 
  socket.on('setRole', function (data) {
    socket.role = data.trim();
    roles[socket.role] = socket.id;
    console.log("Role "+ socket.role + " is connected.");    
  }); 
 
  socket.on("sendPhoto", function(data){
    var guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
    var ext = "";
    switch(guess) {
      case "png"  : ext = ".png"; break;
      case "jpeg" : ext = ".jpg"; break;
      default     : ext = ".bin"; break;
    }
    var savedFilename = "/upload/"+randomString(10)+ext;
    fs.writeFile(__dirname+"/public"+savedFilename, getBase64Image(data.base64), 'base64', function(err) {
      if (err !== null)
        console.log(err);
      else 
        io.to(roles.receiver).emit("receivePhoto", {
          path: savedFilename,
        });
        console.log("Send photo success!");
    });
  });
 
  socket.on('disconnect', function() {
    console.log("Role " + socket.role + " is disconnect.");
  }); 
});
 
function randomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
 
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
 
    return text;
}
function getBase64Image(imgData) {
    return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}
```
Một điều đặc biệc là hầu hết các sự kiện custom đều phải khai báo và gọi trong hàm callback của sự kiện `connection` Điều này đảm bảo các hàm xử lý chính xác chỉ chạy khi đã có kết nối. Hãy làm đúng qui định, còn các qui trình kết nối, tái kết nối, xác thực… đã có Socket.io lo cho bạn. Trong sự kiện `sendPhoto`ở trên, mình xử lý lưu ảnh vào thư mục `public/upload/` như vậy dữ liệu ảnh sẽ không phải truyền 2 lần trên đường truyền mạng, do lần gởi đến receiver thực chất chỉ là gởi link ảnh. Nếu bạn không muốn lưu, có thể gởi trực tiếp dữ liệu ảnh data.base64 đến receiver luôn. Socket.io hỗ trợ gởi rất nhiều kiểu dữ liệu: string, object, array, binary,… Bonus thêm 1 tí là hai hàm `randomString()`để tạo tên ngẫu nhiên cho file ảnh, đảm bảo ứng dụng của bạn không bị hack bằng chiêu Path Traversal.

Nào, cùng trải nghiệm ma thuật nodejs. Khởi động lại server với lệnh node server.js Kết nối đến 2 trang http://localhost:3000/sender.html và http://localhost:3000/receiver.html trên 2 cửa sổ khác nhau. Cái hay là trang của chúng ta chạy trên mọi thiết bị (dù chả có giao diện gì cả, xấu quắc!) Thử truy cập trên Android, iPhone, Windows Phone … và gởi ảnh tới PC, Mac hay là điện thoại khác, tất cả đều ổn!!! Thật không thể tin được! Chỉ vài dòng code ngắn ngủi đã làm được kha khá chuyện hay ho rồi.

Source code: [here](https://github.com/thanhmancity/photoshare-nodejs)