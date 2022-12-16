Ở [phần 1](https://viblo.asia/p/ios-xay-dung-ung-dung-realtime-voi-nodejs-va-socketio-phan-1-tao-ket-noi-client-server-1VgZvNDMZAw), mình đã hướng dẫn các bạn về cách cài đặt môi trường và tạo kết nối,
phần này chúng ta sẽ  viết 1 ứng dụng nhỏ áp dụng nodeJs và SocketIO
### **1. Thiêt lập phía Server**
  Tạo kết nối ban đầu phía server
```
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
```
- Đăng ký các kết nối qua cơ chế emit (phát tín hiệu) và on (Lắng nghe)
- Ở đây mình đăng ký lắng nghe qua cổng 8080 
```
server.listen( 8080, function() {
  io.on('connection', function (socket) {
    console.log("Connected");
    socket.on('viewPoint', function(data) {
      io.sockets.emit('viewPointReceive', data)
    })
  })
})
```
- Qua cổng 8080, server sẽ lắng nghe (*on*)toạ độ của của hình tròn qua hàm "**viewPoint**" với bộ dữ liệu là "**data**"
- Sau đó phát (*emit*) đến tất cả các client đã cài đặt app qua hàm "**viewPointReceive**" với bộ dữ liệu là "**data**"

***Chú ý***   
> -  io.sockets.emit: phát tín hiệu đến tất cả các client 
> -  socket.emit: chỉ phát đến 1 client nào đó nhất định

### **2. Thiết lập phía client**

Tạo 1 view đơn giản với 1 hình màu đỏ bên trong

![](https://images.viblo.asia/c3bc0757-9350-455d-9703-348d8dabbabb.png)

Khai báo Socket:
```
 let socketManager = SocketManager(socketURL: URL.init(string: "http://localhost:2018")!,
                                config: [.log(true), .compress])
 var socket: SocketIOClient?
```

Mỗi lần di chuyển hình vuông, ta gửi (*emit*) toạ độ của hình vuông lên server qua Socket.emit
```
@IBAction func panRedView(_ sender: UIPanGestureRecognizer) {
        let point = sender.translation(in: redView)
        socket?.emit("viewPoint", with: [[point.x,point.y]])
    }
```

Trong viewDidLoad, client sẽ lắng nghe (*on*) toạ độ của hình vuông rồi di chuyển theo toạ độ phía server gửi về trong hàm "viewPointRecieve"

```
socket = socketManager.defaultSocket
socket?.connect() 
socket?.on("viewPointReceive", callback: { (data, ack) in
      if let points = data[0] as? NSArray,
           let x = points[0] as? CGFloat,
           let y = points[1] as? CGFloat {
           self.redView.layer.transform = CATransform3DTranslate(CATransform3DIdentity, x, y, 0)
      }
 })
```
### **4 Kết quả**
- Khi 1 client di chuyển vị trí hình vuông, hình vuông ở tất cả các client khác cũng sẽ di chuyển theo

![](https://images.viblo.asia/eebf1463-e440-424b-8193-493dcf8bcf1f.gif)

- HI vọng với NodeJs và SocketIo chúng ta có thể làm được nhiều ứng dụng realtime khác hay ho hơn ví dụ như appChat, liveStream, game online ....