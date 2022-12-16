# 1.NodeJs và đặc điểm của NodeJs.
## a, Nodejs là gì.
- NodeJS là một mã nguồn được xây dựng dựa trên nền tảng Javascript V8 Engine, nó được sử dụng để xây dựng các ứng dụng web như các trang video clip, các forum và đặc biệt là trang mạng xã hội phạm vi hẹp. NodeJS là một mã nguồn mở được sử dụng rộng bởi hàng ngàn lập trình viên trên toàn thế giới. NodeJS có thể chạy trên nhiều nền tảng hệ điều hành khác nhau từ WIndow cho tới Linux, OS X nên đó cũng là một lợi thế. NodeJS cung cấp các thư viện phong phú ở dạng Javascript Module khác nhau giúp đơn giản hóa việc lập trình và giảm thời gian ở mức thấp nhất.
- Khi nói đến NodeJS thì phải nghĩ tới vấn đề Realtime. Realtime ở đây chính là xử lý giao tiếp từ client tới máy chủ theo thời gian thực. Giống như khi bạn lướt Facebook thì mỗi khi bạn comment hay like một topic nào đó thì ngay lập tức chủ topic và những người đã comment trên đó sẽ nhận được thông báo là bạn đã comment.
## b, Đặc điểm của Nodejs.
Qua phần tìm hiểu NodeJS là gì mình có giới thiệu một đặc tính rất quan trọng đó là Realtime, tuy nhiên vẫn còn khá nhiều đặc tính mà bạn cần phải biết trước khi học NodeJS.
* Không đồng bộ: Tất cả các API của NodeJS đều không đồng bộ (none-blocking), nó chủ yếu dựa trên nền của NodeJS Server và chờ đợi Server trả dữ liệu về. Việc di chuyển máy chủ đến các API tiếp theo sau khi gọi và cơ chế thông báo các sự kiện của Node.js giúp máy chủ để có được một phản ứng từ các cuộc gọi API trước (Realtime).
* Chạy rất nhanh: NodeJ được xây dựng dựa vào nền tảng V8 Javascript Engine nên việc thực thi chương trình rất nhanh.
* Đơn luồng nhưng khả năng mở rộng cao: Node.js sử dụng một mô hình luồng duy nhất với sự kiện lặp. cơ chế tổ chức sự.
* Đơn luồng nhưng khả năng mở rộng cao: Node.js sử dụng một mô hình luồng duy nhất với sự kiện lặp. cơ chế tổ chức sự kiện giúp các máy chủ để đáp ứng một cách không ngăn chặn và làm cho máy chủ cao khả năng mở rộng như trái ngược với các máy chủ truyền thống mà tạo đề hạn chế để xử lý yêu cầu. Node.js sử dụng một chương trình đơn luồng và các chương trình tương tự có thể cung cấp dịch vụ cho một số lượng lớn hơn nhiều so với yêu cầu máy chủ truyền thống như Apache HTTP Server.
* Không đệm: NodeJS không đệm bất kì một dữ liệu nào và các ứng dụng này chủ yếu là đầu ra dữ liệu.
## 2, Socket.io.
### a, Socket.io là gì.
- Để xây dựng một ứng dụng realtime cần sử dụng socketio. Socketio sẽ giúp các bên ở những địa điểm khác nhau kết nối với nhau, truyền dữ liệu ngay lập tức thông qua server trung gian. Socketio có thể được sử dụng trong nhiều ứng dụng như chat, game online, cập nhật kết quả của một trận đấu đang xảy ra.
- Socketio không phải là một ngôn ngữ, mà chỉ là 1 công cụ giúp thực hiện những ứng dụng realtime. Vì thế, không thể sử dụng socketio để thay thế hoàn toàn cho một ngôn ngữ, mà phải sử dụng kết hợp với một ngôn ngữ khác. Ngôn ngữ thường dùng để kết hợp là Nodejs.
### b, sử dụng socket.io như thế nào.
Cấu trúc một ứng dụng realtime sử dụng socket bao gồm 2 phần: phía server, phía client.
1. Phía server Đây là nơi sẽ cài đặt socket io. Ngôn ngữ để dựng server có thể là php, asp.net, nodejs,... Tuy nhiên, tùy vào ngôn ngữ lựa chọn mà cách cấu trúc server khác nhau. Ở đây, nếu được thì khuyến khích sử dụng nodejs để dựng server, vì như vậy có thể cài trực tiếp socketio vào cùng một server. Nếu sử dụng php thì phải cài thêm những package khác, hoặc phải chuẩn bị riêng server để chạy socketio.
2. Phía client: Ở phía client sẽ xây dựng giao diện người dùng. Ở đây có thể sử dụng js, hoặc các thư viện của js như jquery.
3. Cài đặt socketio trên server nodejs Tạo thư mục Demo (Có thể đặt tên bất kỳ) Mở màn hình terminal (Mac)/ cmd (Win), cd đến thư mục Demo. Tại màn hình cmd, gõ câu lệnh: npm init; rồi nhấn enter. Khi đó hệ thống sẽ chạy và yêu cầu nhập tên dự án, nhập tên dự án bất kỳ. Ở các setting khác thì enter bỏ qua, khi hệ thống hiển thị Yes or No? thì gõ Yes để cài đặt.
Sau khi hoàn thành bước cài đặt ở trên, hệ thống sẽ tạo ra file package.json. Đây là file dùng để cài đặt cấu hình server. Tiếp theo, cần đặt những package cần thiết trên server để có thể làm web và ứng dụng realtime. Để cài những package này mở màn hình cmd > cd đến thư mục Demo > gõ dòng lệnh npm install express ejs socketio Khi cài đặt thành công, hệ thống sẽ tự tạo thư mục nodemodules.
#### c, Cách hoạt động của socket.io.
Cơ chế hoạt động của một ứng dụng realtime đó là thông qua server để lắng nghe (listen) data và truyền data về các máy client. Vì vậy cần cài khai báo sử dụng socketio ở cả phía server và client.
1. Code phía server.
```javascript

// build server, khai báo sử dụng socket io
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
```
2. code phía client.
```html
<html>
	<head>
		<title>Demo Socketio - Homepage</title>
		<script src="jquery.js"></script>
		<script src="socket.io/socket.io.js"></script>

		<script>
			var socket = io("http://localhost:3000");
		</script>
	</head>

	<body>
	</body>	
</html>
```
3. Cơ chế lắng nghe (on) và truyền tải thông điệp (emit) của socket.io.
Ví dụ, client gửi 1 đoạn chat đi, thì khi đó ở phía server cần viết code để nhận dữ liệu đoạn code đó và truyền dữ liệu chat đó đi đến các server khác. Đồng thời ở ở phía client cũng cần viết code để gửi và nhận dữ liệu từ server.
* Code phía serve.
```javascript
// build server
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

// tạo kết nối giữa client và server
io.on("connection", function(socket)
	{
		socket.on("disconnect", function()
			{
			});
         //server lắng nghe dữ liệu từ client
		socket.on("Client-sent-data", function(data)
			{
				//sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
                socket.emit("Server-sent-data", data);
			});
	});

// create route, display view

app.get("/", function(req, res)
	{
		res.render("homepage");
	});
```
* code phía client.
```html
<html>
	<head>
		<title>Demo Socketio - Homepage</title>
		<script src="jquery.js"></script>
		<script src="socket.io/socket.io.js"></script>

		<script>
			var socket = io("http://localhost:3000");

            //client nhận dữ liệu từ server
			socket.on("Server-sent-data", function(data)
			{
				$("#chat-content").append(data);
			});
            
            //client gửi dữ liệu lên server
			$(document).ready(function()
			{
				$("#send").click(function()
				{
					socket.emit("Client-sent-data", "Hello world");
				});
			});
		</script>
	</head>

	<body>
		<h1>Demo Socketio</h1>

		<div>
			<button id="send">Send</button>
		</div>
	</body>	
</html>
```
* Client gửi sự kiện lên phía server.
```javascript
$(document).ready(function()
{
	$("#send").click(function()
	{
		socket.emit("Client-sent-data", "Hello world");
	});
});
```
* Server lắng nghe sự kiện.
```javascript
socket.on("Client-sent-data", function(data)
{
});
```
## 3. Ứng dụng NodeJs, ExpressJs và socket.io xây dựng ứng dụng chia sẻ hình ảnh.
### a, Mô hình của ứng dụng.
![](https://images.viblo.asia/bd81f48a-3141-40eb-a4bd-2bc1ace2a199.png).
Ứng dụng gồm 3 phần.
* Nodejs server: Ứng dụng vài trò trung gian điều phối.
* Sender: trang web cho người gởi ảnh.
* Receiver: Trang web cho người nhận ảnh.

### b, Cấu trúc thư mục Project.
Tạo thư mục photoshare, nạp các thư viện cần thiết cho dự án như Socket.io, Expressjs… Chạy các lệnh sau với cmd.
```cmd
mkdir photoshare
npm install express socket.io
```
### c, Dùng Express để tạo web server.
file server.js.
```javascript
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
```
Chúng ta dùng Expressjs để có thể tạo server web (đúng hơn là 1 ứng dụng) có khả năng phục vụ các file tĩnh như ảnh, css stylesheet, javascript. Expressjs có thể tự mình khởi chạy ứng dụng, không cần đến gói http, nhưng do chúng ta cũng dùng web socket trên cùng ứng dụng nên cần gói http để kết nối hai thành phần.

Tiếp theo cần cấu hình một chút cho Expressjs.
```javascript
app.use(express.static(__dirname + '/public'));
```
Thư mục public sẽ là nơi chứa toàn bộ các file tĩnh. Bạn có thể đặt bất kì file nào ở đây và mở thông qua trình duyệt đều được cả. Đây cũng là 1 cách bảo mật ứng dụng, dấu code xử lý ở bên ngoài thư mục public có thể truy cập thông qua http request. Như vậy để tạo 2 trang cho sender/receiver, chỉ cần viết 2 trang html tĩnh đặt vào public là đã truy cập được vào. Mình chọn cách tạo file html tĩnh để đơn giản cho các bạn mới bắt đầu, nếu dùng template engine – jade chẳng hạn – sẽ gây khó khăn cho các bạn mới bắt đầu. Đến khi nào viết ứng dụng cần tạo ra giao diện động, tùy theo từng user thì bạn mới cần template engine.  Bây giờ thì gọi lệnh khởi động server.

file server.js.
```javascript
server.listen(3000);
console.log("Server - Waiting connection at port: 3000");
````
Mình dùng port 3000 cho ứng dụng, có thể chọn bất kì port nào khác, nhưng nhớ là nhỏ hơn 65536 (port lớn nhất có thể mở) và và lớn hơn 1000 (dưới 1000 là các port dùng cho các ứng dụng phổ biến khác). Dòng console.log để xuất thông báo lên cửa sổ console chạy ứng dụng, báo cho ta biết ứng dụng đã chạy thành công.
Trước khi chạy thử ứng dụng, nhớ tạo thư mục “photoshare/public“, sau đó thử tạo file public/sender.html.
```html
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
Để chạy ứng dụng, mở cmd chạy lệnh.
```
node server.js
```
Bây giờ mở Chrome và gõ vào địa chỉ: http://localhost:3000/sender.html. Nếu cả cmd và chrome không báo lỗi gì thì ta đã thành công một nữa rồi đấy.
### d, HTML template cho sender và receiver.
Ta sẽ cần 2 trang khác nhau cho 2 người dùng, tạo tempalate đơn giản như sau.
* Trang gởi: Gồm có nút chọn file để gởi, 1 thẻ img để review xem ảnh được gởi là ảnh nào.
* Trang nhận: Một thẻ img để sẵn, khi nào có ảnh sẽ chèn vào.
public/sender.html.
```html

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
public/receiver.html.
```html
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
### e, Socket.io – code gởi nhận ảnh phía client.
Như trên ta vừa tạo được html template bên ngoài rất đơn giản. Bây giờ cần code thêm 1 tẹo cho phía client để kết nối với server và gởi nhận ảnh.
public/sender.script.js.
```javascript
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
Để mở kết nối đến server, gọi hàm io.connect(), hàm này nhận tham số đầu vào là URL đến server, nếu không có, mặc định nó sẽ connect đến địa chỉ server phục vụ trang hiện tại. Ngay sau khi connect thì client sẽ gởi sự kiện “setRole”  socket.emit("setRole","sender") Xác nhận vai trò của client là sender. Cần handle thêm sự kiện khi người dùng chọn file, thì thực hiện gởi ảnh lên. Trong hàm submitImg(), có 1 đoạn hơi khó hiểu là đoạn tạo FileReader. Do browser không thể truy cập trực tiếp đến file trên ổ cứng, nên cần dùng object này để đọc file và chuyển thành dạng dữ liệu ảnh encode base64. Dữ liệu ảnh base64 này cũng dùng để truyền lên server qua socket.
public/receiver.script.js.
```javascript
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
### f, Socket.io – Server code : trung gian điều phối.
Server sẽ xử lý tất cả 4 sự kiện socket chính, trong đó 2 sự kiện connection , disconnect  là sự kiện built-in của Socket.io, 2 sự kiện sendPhoto  vả receivePhoto  là custom của chính chúng ta. Về ý tưởng của Socket.io, nó sẽ tập trung việc 1 đầu kết nối raise lên sự kiện có tên gì đó, gởi dữ liệu; đầu kết nối còn lại khai báo lắng nghe sự kiện, khi có sự kiện xảy ra thì gọi hàm callback thực hiện. Như vậy luồng xử lý của ứng dụng photoshare chúng ta đang làm như sau.

* Sender gởi ảnh qua sự kiện sendPhoto.
* Server thấy có sender báo “sendPhoto”, liền la lên – “Ê receiver, có người gởi ảnh, mày nhận ảnh nèk!”, server la làng bằng cách gởi sự kiện receiverPhoto cùng dữ liệu (link ảnh).
* Receiver đợi sự kiện nhận ảnh nãy giờ, receiver nhận data từ sự kiện receivePhoto, và hiển thị ảnh lên màn hình.
Bạn sẽ cần 1 đoạn code thêm như bên dưới, chèn vào cuối file server.js ta đã có ở trên.
```javascript
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
## TỔNG KẾT.
Qua bài chia sẻ này mình hy vọng các bạn sẽ có được những khái niệm cơ bản về Nodejs và socketio và tự tay xây dựng cho mình một app thời gian thực.
NODEJS SỰ LỰA CHỌN HOÀN HẢO CHO BÀI TOÁN THỜI GIAN THỰC.