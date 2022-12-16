### 1. Giới thiệu về SocketIO

### 2.Cài đặt môi trường

- X- code 9.x, switf 4
- Cài nodeJs
[Tải nodeJs bản mới nhất](https://nodejs.org/en/)
- Thêm thư viện SocketIO
    - Carthage: 
        - github "socketio/socket.io-client-swift" ~> 13.1.0        
        - Run carthage update --platform ios,macosx.     
    - CocoaPods 1.0.0 or later: 
        - pod 'Socket.IO-Client-Swift', '~> 13.1.0' 
        -  pod install
- Cài đặt module SocketIO
    -  npm init
    -  npm install socket.io
- Import module
    - import SocketIO (Swift)
    - @import SocketIO (Objectype-C)

### 3. Cài đặt server phía NodeJs
- Trong file index.js
Cấu hình server và lắng nghe port số 8080
```
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
server.listen(8080, function() {
  io.on('connection', function(socket) {
    console.log('Co ket noi');
  })
})
```
### 4. Cài đặt trên X-code

Kết nối với server
```
import SocketIO

class ViewController: UIViewController {
    let socket = SocketIOClient (socketURl: URL(string: "http://localhost:8080", 
                                   config: [.log(true),.forcePolling(true)])
    overide func viewDidLoad() {
        super.viewDidLoad()
        socket.connect()
}
```

### 5. Chạy server

- Bật terminal, trỏ đến folder chứa file index,js đã tạo trên bước 3 chạy lệnh
`node index.js`
- Kết quả hiển thị trên terminal: ` Có kết nối`

========================================
- Phần tiếp theo chúng ta sẽ xây dựng ứng dụng tương tác realtime giữa các người dùng khác nhau