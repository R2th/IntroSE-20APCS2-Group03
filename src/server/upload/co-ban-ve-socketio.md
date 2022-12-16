# Socketio là gì
Để xây dựng một ứng dụng realtime cần sử dụng socketio. Socketio sẽ giúp các bên ở những địa điểm khác nhau kết nối với nhau, truyền dữ liệu ngay lập tức thông qua server trung gian.
Socketio có thể được sử dụng trong nhiều ứng dụng như chat, game online, cập nhật kết quả của một trận đấu đang xảy ra,...

Socketio không phải là một ngôn ngữ, mà chỉ là 1 công cụ giúp thực hiện những ứng dụng realtime. Vì thế, không thể sử dụng socketio để thay thế hoàn toàn cho một ngôn ngữ, mà phải sử dụng kết hợp với một ngôn ngữ khác. Ngôn ngữ đó có thể là php, asp.net, nodejs,...

# Làm thế nào để sử dụng Socketio
Cấu trúc một ứng dụng realtime sử dụng socket bao gồm 2 phần: phía server, phía client. 

1. Phía server
Đây là nơi sẽ cài đặt socket io. Ngôn ngữ để dựng server có thể là php, asp.net, nodejs,... Tuy nhiên, tùy vào ngôn ngữ lựa chọn mà cách cấu trúc server khác nhau.
Ở đây, nếu được thì khuyến khích sử dụng nodejs để dựng server, vì như vậy có thể cài trực tiếp socketio vào cùng một server.
Nếu sử dụng php thì phải cài thêm những package khác, hoặc phải chuẩn bị riêng server để chạy socketio.

2. Phía client: 
Ở phía client sẽ xây dựng giao diện người dùng. Ở đây có thể sử dụng js, hoặc các thư viện của js như  jquery,... Nói chung là ngôn ngữ gì cũng được.

3. Những thứ cần chuẩn bị để sử dụng socketio
* PC: Mac hoặc Win đều được
* Download phần mềm socketio

4. Cài đặt socketio trên server nodejs
Tạo thư mục Demo (Có thể đặt tên bất kỳ)
Mở màn hình terminal (Mac)/ cmd (Win), cd đến thư mục Demo.
Tại màn hình cmd, gõ câu lệnh: npm init; rồi nhấn enter.
Khi đó hệ thống sẽ chạy và yêu cầu nhập tên dự án, nhập tên dự án bất kỳ. 
Ở các setting khác thì enter bỏ qua, khi hệ thống hiển thị Yes or No? thì gõ Yes để cài đặt.

Sau khi hoàn thành bước cài đặt ở trên, hệ thống sẽ tạo ra file package.json. Đây là file dùng để cài đặt cấu hình server.
Tiếp theo, cần đặt những package cần thiết trên server để có thể làm web và ứng dụng realtime.
Để cài những package này mở màn hình cmd > cd đến thư mục Demo > gõ dòng lệnh *npm install express ejs socketio*
Khi cài đặt thành công, hệ thống sẽ tự tạo thư mục *nodemodules*

# Cơ chế hoạt động của socketio
## Khai báo sử dụng socketio
Cơ chế hoạt động của một ứng dụng realtime đó là thông qua server để lắng nghe (listen) data và truyền data về các máy client.
Vì vậy cần cài khai báo sử dụng socketio ở cả phía server và client.

Code khai báo sử dụng socketio ở server:
```
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

Code khai báo sử dụng socketio ở phía client
```
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

## Cơ chế lắng nghe, truyền dữ liệu của socketio
Để lắng nghe data, ta sử dụng câu lệnh socket.on(), để phát dữ liệu thì sử dụng lệnh socket.emit() .

Ví dụ, client gửi 1 đoạn chat đi, thì khi đó ở phía server cần viết code để nhận dữ liệu đoạn code đó và truyền dữ liệu chat đó đi đến các server khác.
Đồng thời ở ở phía client cũng cần viết code để gửi và nhận dữ liệu từ server.

Code phía server
```
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

Code phía client
```
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

Lưu ý: socket.on và socket.emit có parameter thứ 1 là tên đường truyền. Tên đường truyền có thể là tên bất ký, tuy nhiên đễ truyền và nhận dữ liệu của chung 1 đường truyền thì tên đường truyền phải giống nhau.

Ví du: client gửi data bằng đường truyền có tên là Client-Sent-data, thì để nhận được data của đường truyền này thì server của phải khai báo tên đường truyền là Client-Sent-data trong lệnh socket.on.

Client send
```
$(document).ready(function()
{
	$("#send").click(function()
	{
		socket.emit("Client-sent-data", "Hello world");
	});
```

Server listen
```
socket.on("Client-sent-data", function(data)
{
});
```