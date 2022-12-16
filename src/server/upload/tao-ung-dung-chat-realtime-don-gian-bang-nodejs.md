Xin chào các bạn, một trong những chủ đề khá được quan tâm đối với những newbie khi học về NodeJS cũng như những người muốn tìm hiểu công nghệ NodeJS đó là ứng dụng chat realtime. Hôm nay mình sẽ hướng dẫn các bạn tạo một ứng dụng chat realtime đơn giản bằng NodeJS. 

Trước tiên mình cùng tìm hiểu Socket là gì nhé!
# 1. Socket là gì?
Theo wiki:
> A network socket is an internal endpoint for sending or receiving data within a node on a computer network. Concretely, it is a representation of this endpoint in networking software (protocol stack), such as an entry in a table (listing communication protocol, destination, status, etc.), and is a form of system resource.

Các bạn có thể hiểu Socket đơn thuần là một giao diện lập trình ứng dụng mạng, thông qua giao diện này, chúng ta có thể lập trình điều khiển, truyền thông giữa 2 máy sử dụng giao thức TCPIP và UDP.

Ở đây mình ứng dụng trực tiếp vào việc gửi message giữa client và server để tạo thành ứng dụng chat realtime :))
# 2. Cài đặt
Cài đặt các package cần thiết:

`express` để tạo server và khởi tạo app mới
```
npm install express
```
`socket.io` cho phép giao tiếp realtime giữa front-end và back-end
```
npm install socket.io
```
Hoàn chỉnh file package.json sẽ như sau:
```
{
    "name": "node_chat_realtime",
    "version": "1.0.0",
    "description": "Demo chat realtime NodeJS",
    "dependencies": {
        "socket.io": "^2.1.1",
        "express": "^4.16.3"
    },
    "author": "Tien Phat"
}
```
Bạn có thể copy hoặc chạy lệnh `npm init` để tạo file package.json nhé.

Sau khi có file package.json các bạn chạy lệnh `npm install` để install các package nhé.

Cuối cùng bạn tạo các file theo cấu trúc của mình nhé:
![](https://images.viblo.asia/7b74c784-7d45-443c-a187-66a97b8f9cc3.png)

OK như vậy mình đã cài đặt xong những thứ cần thiết, giờ mình cùng đi vào chi tiết các file nhé.
# 3. File điều khiển chính
File điều khiển chính ở đây là app.js, file này sẽ là file chạy khi chạy node:

```
var path = require("path");
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname, 'public')));

//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/chat.html'));
});

//Tạo socket 
io.on('connection', function (socket) {
    console.log('Welcome to server chat');

    socket.on('send', function (data) {
        io.sockets.emit('send', data);
    });
});

//Khởi tạo 1 server listen tại 1 port
server.listen(3000);
```
Nội dung file này gồm có 4 phần chính tương ứng như mình đã notes.

Tại phần tạo socket mình sử dụng function `connection` của socket để  bắt sự kiện khi có 1 client kết nối đến server và thực hiện log ra console và 1 sự kiện send là sự kiện khi client gửi message thì server sẽ nhận được và gửi data sang các kết nối khác đến server (đây chính là phần realtime cuả socket).

**Chú ý: 2 package `path` và `http` là 2 package mặc định khi chạy npm install đã cài đặt sẵn nên các bạn không cần thêm vào package.json nữa**

# 4. Tạo giao diện chat
File `chat.html`

```
<!DOCTYPE html>
<html>
<head>
    <title>Chat realtime NodeJS demo</title>

    <link rel="stylesheet" href="/css/styles.css">

    <script src="/js/socket.io.js"></script>
    <script src="/js/jquery.min.js"></script>
    <script src="/js/chat.js"></script>
</head>

<body>

<fieldset>
    <legend>Demo chat realtime NodeJS</legend>
    <input type="text" id="username" name="username" placeholder="Enter name">
    <br>
    <div id="content"></div>

    <input id="message" placeholder="Write something..">
    <br>
    <button id="sendMessage">SEND</button>
</fieldset>

</body>
</html>
```

File `chat.js`
```
$(function () {
    //Kết nối tới server socket đang lắng nghe
    var socket = io.connect('http://localhost:3003');

    //Socket nhận data và append vào giao diện
    socket.on("send", function (data) {
        console.log(data);
        $("#content").append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Bắt sự kiện click gửi message
    $("#sendMessage").on('click', function () {
        var username = $('#username').val();
        var message = $('#message').val();

        if (username == '' || message == '') {
            alert('Please enter name and message!!');
        } else {
            //Gửi dữ liệu cho socket
            socket.emit('send', {username: username, message: message});
            $('#message').val('');
        }
    })
})
```

File `styles.css`
```
#content {
    border: 1px solid darkgrey;
    width: 400px;
    height: 300px;
    padding: 10px;
    overflow-y: scroll;
}

#content p {
    margin: 5px;
}

#username, #content, #message, #sendMessage {
    margin-bottom: 5px;
}
```

Ngoài ra còn 2 thư viện sau: 
- [Jquery 3.3.1](https://code.jquery.com/jquery-3.3.1.min.js) dùng để viết code javascript cho ngắn gọn hơn.
- [SocketIO 2.2.1](https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js) dùng để lập trình socket.

# 5. Chạy ứng dụng
Để chạy ứng dụng các bạn chạy `node app.js` và sẽ ra kết quả.
Khi có một kết nối mới tới server đang lắng nghe, sẽ log:
![Server welcome client connected](https://images.viblo.asia/f2c94352-d49e-4b38-93aa-7404845398a0.png)

Giao diện chat realtime:
![Giao diện chat realtime giữa 2 kết nối khác nhau](https://images.viblo.asia/dab67ecc-1853-4985-b3fb-3483b5eef4c0.png)

# 6. Tổng kết
Như vậy mình đã hướng dẫn xong cách tạo 1 app chat realtime bằng NodeJS với công cụ SocketIO. Bây giờ các bạn có thể tạo riêng cho mình một app chat nhé :)

Thanks for reading!

### Nguồn tham khảo:
1. https://en.wikipedia.org/wiki/Network_socket
2. http://it.die.vn/s/socket/
3. https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088