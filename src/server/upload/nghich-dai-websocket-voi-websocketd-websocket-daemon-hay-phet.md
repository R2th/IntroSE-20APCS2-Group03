Thoạt nhìn cái tiêu đề mà chả muốn đọc nữa nhỉ. Gì mà lắm websocket thế?

À ừ... thì mình tìm thấy cái app **websocketd** nên vọc thử, trên website của bọn đó thì bảo đây là **WebSocket daemon**, và rồi mình tìm hiểu sâu hơn tý thì biết cái này dùng cho **websocket** :D

![](https://images.viblo.asia/41619dbd-c5af-4240-886e-04be152dc51d.jpg)

## 1. websocketd là cái quái gì thế này?
Cơ duyên trời định google đã đẩy đưa em tới đây: http://websocketd.com/

Sau khi dạo qua một vòng, ngang dọc đủ các kiểu, rồi lại google xem thử, đây là cái giống gì? Nó hoạt động ra sao? Có ai đã dùng nó chưa?

Sau một hồi, em đã tự trả lời được những câu hỏi của mình: (nhưng mà không chắc lắm :D)
* Đây là một ứng dụng đa nền tảng (thực ra một công cụ nhỏ thì đúng hơn), hoạt động ở cả mớ môi trường: Linux, MacOS, Windows, FreeBSD, OpenBSD, Solaris (Vào trang chủ của nó, kéo xuống dưới cùng là thấy nhé)
* Được viết bằng Golang
* Có vẻ đã được viết khá lâu, từ 5 năm về trước. Nhưng có một điều làm mình rất hài lòng, buộc phải thốt lên: Ồ! Nó vẫn được update! (Các chú thím vào github của nó mà xem: https://github.com/joewalnes/websocketd)
* Thử search "websocketd example", chả ra nhiều kết quả cho lắm, toàn link đến wiki của nó: https://github.com/joewalnes/websocketd/wiki/
* Thử search tiếp "websocketd",...kết quả dường như bị lu mờ bởi từ khóa cực nổi tiếng khác "websocket". Mình chẳng rõ có ai sử dụng vào môi trường production không nữa. Hay chỉ đơn thuần là một sản phẩm để vọc chơi cho vui :D
* Còn về phần công năng của nó thì chao ôi, tuyệt vời (với mình, còn với bạn có thể là không mấy bổ ích :D). Chương trình này tạo ra một Web static server, Websocket, giúp bạn có thể gửi tin nhắn giữa server và browser. Đặc biệt, websocketd giúp bạn truy cập các chương trình command-line thông qua WebSocket (Chi tiết tham khảo ở README của nó nhé: https://github.com/joewalnes/websocketd/blob/master/README.md)
* Nói thêm chút nữa, chương trình này sẽ bọc chương trình được viết dưới giao diện command-line của bạn, thực hiện các tác vụ như đọc từ **STDIN** và ghi vào **STDOUT** (Bạn có thể viết chương trình bằng Python, Ruby, Perl, Bash, .NET, C, Go, PHP, Java, Clojure, Scala, Groovy, Expect, Awk, VBScript, Haskell, Lua, R,...như họ đã giới thiệu)

Nói chung, http://websocketd.com/ và https://github.com/joewalnes/websocketd/ là địa chỉ chính chủ của nó, bạn có thể tìm hiểu chi tiết hơn nhé.

## 2. Nghịch nó với websocket
Trước khi nghịch cùng mình, bạn bỏ chút thời gian đọc bài hướng dẫn ngắn của nó nhé: https://github.com/joewalnes/websocketd/wiki/Ten-minute-tutorial

Ngắn thôi, chỉ là một chương trình đếm từ 1 tới tận 10 :D

.

.

.

Trở lại, trong phần nghịch này, mình sẽ mần một trang chat chit đơn giản (Nhớ là đơn giản thôi nhé)
### > Chuẩn bị websocketd tool
Các bạn download phiên bản websocketd thích hợp với hệ điều hành về. Bạn nào dùng [Windows 64bit](https://github.com/joewalnes/websocketd/releases/download/v0.3.0/websocketd-0.3.0-windows_amd64.zip) thì link đó nhé :v Khỏi phải vào trang chủ nữa.

Download về rồi thì giải nén và đặt file tại thư mục nào đó. Ví dụ: Mình có file **E:\nghichcode\websocketd.exe**
### > Viết chương trình chạy trên server
Mình đang dùng windows, nên sẽ dùng **Windows JScript + CMD** để viết chương trình nhé.

Chương trình này chỉ có chức năng đơn giản là đọc message từ **STDIN** và ghi ra **STDOUT** (hay gọi là in ra console ấy)

File đầu tiên:
> chat.js
```
while (true) {
  var input= WScript.stdIn.readLine();
  WScript.echo('<3 ' + input);
}
```
File thứ hai:
> chat.cmd
```
@echo off
cscript /nologo %0\..\chat.js
```
**Cả hai file này các bạn đặt tại thư mục chứa websocketd.exe nhé.*

Như vậy đã chuẩn bị xong phần server, bạn có thể chạy trực tiếp file **chat.cmd** như một ứng dụng console thông thường nhé.
### > Chuẩn bị file cho client (html)
Chúng ta sẽ thực hiện kết nối đến websocket, thực hiện gửi và nhận tin nhắn trên web với Javascript.
> chat.html
```
<html>
   <header>
      <title>Chat Chit</title>
      <style>
*,:before,:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}html{font-family:Helvetica,Arial,sans-serif;font-size:100%;background:#333}#page-wrapper{width:650px;background:#FFF;padding:1em;margin:1em auto;border-top:5px solid #69c773;box-shadow:0 2px 10px rgba(0,0,0,0.8)}h1{margin-top:0}#status{font-size:.9rem;margin-bottom:1rem}.open{color:green}.closed{color:red}ul{list-style:none;margin:0;padding:0;font-size:.95rem}ul li{padding:.5rem .75rem;border-bottom:1px solid #EEE}ul li:first-child{border-top:1px solid #EEE}ul li span{display:inline-block;width:90px;font-weight:700;color:#999;font-size:.7rem;text-transform:uppercase;letter-spacing:1px}.sent{background-color:#F7F7F7}#message-form{margin-top:1.5rem}textarea{width:100%;padding:.5rem;font-size:1rem;border:1px solid #D9D9D9;border-radius:3px;box-shadow:inset 0 1px 1px rgba(0,0,0,0.1);min-height:100px;margin-bottom:1rem}button{display:inline-block;border-radius:3px;border:none;font-size:.9rem;padding:.6rem 1em;color:#fff;margin:0 .25rem;text-align:center;background:#BABABA;border-bottom:1px solid #999}button[type="submit"]{background:#86b32d;border-bottom:1px solid #5d7d1f}button:hover{opacity:.75;cursor:pointer}
      </style>
   </header>
   <body>
      <div id="page-wrapper">
         <h1>WebSockets Demo - Use websocketd</h1>
         <div id="status">Connecting...</div>
         <ul id="messages"></ul>
         <form id="message-form" action="#" method="post">
            <textarea id="message" placeholder="Write your message here..." required></textarea>
            <button type="submit">Send Message</button>
            <button type="button" id="close">Close Connection</button>
         </form>
      </div>
      <script>
         window.onload = function() {
         
           // Tham chiếu đến các phần tử trên trang.
           var form = document.getElementById('message-form');
           var messageField = document.getElementById('message');
           var messagesList = document.getElementById('messages');
           var socketStatus = document.getElementById('status');
           var closeBtn = document.getElementById('close');
         
         
           // Tạo và kết nối đến WebSocket.
           var socket = new WebSocket('ws://localhost:6969/');
         
         
           // Xử lý khi có lỗi xảy ra.
           socket.onerror = function(error) {
         	console.log('WebSocket Error: ' + error);
           };
         
         
           // Hiện thông báo đã kết nối khi WebSocket được mở.
           socket.onopen = function(event) {
         	socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
         	socketStatus.className = 'open';
           };
         
         
           // Xử lý tin nhắn nhận từ server
           socket.onmessage = function(event) {
         	var message = event.data;
         	messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
           };
         
         
           // Hiện thông báo đã đóng kết nối khi WebSocket đóng.
           socket.onclose = function(event) {
         	socketStatus.innerHTML = 'Disconnected from WebSocket.';
         	socketStatus.className = 'closed';
           };
         
         
           // Gửi tin nhắn khi nhấn nút submit.
           form.onsubmit = function(e) {
         	e.preventDefault();
         
         	// Get message từ textarea.
         	var message = messageField.value;
         
         	// Gửi tin nhắn thông qua WebSocket.
         	socket.send(message);
         
         	// Add tin nhắn vào messages list.
         	messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';
         
         	// Xóa nội dung khi đã gửi.
         	messageField.value = '';
         
         	return false;
           };
         
         
           // Đóng kết nối đến WebSocket khi click button.
           closeBtn.onclick = function(e) {
         	e.preventDefault();
         
         	// Đóng WebSocket.
         	socket.close();
         
         	return false;
           };
         
         };
      </script>
   </body>
</html>
```
### > Chạy chương trình
1. Mở chương trình Command Prompt hoặc Windows PowerShell, cd đến thư mục chứa các file đó (Cách dễ nhất là đứng tại thư mục kia, nhấn giữ phím shift, click phải chuột vào cửa sổ explorer, chọn Command Prompt hoặc Windows PowerShell thôi :D)
2. Gõ lệnh:
```
.\websocketd.exe --port=6969 --staticdir=. .\chat.cmd
```
+ --port=6969: Khai báo chương trình sẽ mở và lắng nghe ở cổng 6969 thần thánh, để có thể truy cập websocket (ws://localhost:6969), hoặc web static server
+ --staticdir: Khởi động web static server, giúp bạn có thể chạy web dưới địa chỉ http://localhost:6969, truy cập trực tiếp vào thư mục hiện tại thông qua browser.
+ Ngoài ra, bạn có thể dùng flag --devconsole để chạy chế độ test với console trên web ([Xem thêm ở đây](https://github.com/joewalnes/websocketd/wiki/Ten-minute-tutorial#testing-with-the-dev-console))

Như vậy, ban đầu chương trình chat.cmd chỉ có chức năng đọc và ghi message trên console. Nhưng giờ, nhờ có websocketd.exe bọc hậu, chúng ta đã có thể gửi và nhận message thông qua websocket rồi.

3. Truy cập http://localhost:6969/chat.html trên trình duyệt và thưởng thức thôi :D

![](https://images.viblo.asia/f6fb04a4-5bf9-4df9-bd7f-d50d6e8700a8.png)

Còn rất nhiều thứ bạn có thể nghịch với websocketd. Hãy thong thả với nó nhé!
![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

Thân ái! Chào quyết thắng! Hẹn gặp lại bạn vào một ngày không xa! :clap: