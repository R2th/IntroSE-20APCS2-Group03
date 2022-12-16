* Chào mọi người lại là mình đây. Trong 2 phần trước mình đã lần lượt giới thiệu tới các bạn về socket và multiple threads. Trong phần này, mình sẽ đi vào áp dụng hai phần trên để xây dựng 1 chat tool đơn giản với python.
* Đây là link 2 phần trước của mình :
    * [Phần 1](https://viblo.asia/p/build-1-chat-tool-voi-python-phan-1-socket-Qbq5QyGJ5D8)
    * [Phần 2](https://viblo.asia/p/build-1-chat-tool-voi-python-phan-2-multiple-threads-jvEla0bAZkw)
# Chức năng
* Tool này sẽ có 1 room chung. Khi client kết nối thành công tới server sẽ được join room và có thể chat gửi tin nhắn đến tất cả các client đang kết nối trong room và nhận tin nhắn từ các client này.
# Server
* Vì đặc tính là 1 chat tool nên ta sẽ sử dụng giao thức TCP để gửi nhận dữ liệu.
* Đầu tiên ta cần tạo 1 server để lắng nghe. Mình đặt tên file này là `server.py` 
```
import socket

HOST = '127.0.0.1'
PORT = 65432
client = []

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print('Server is listening...')
```
* Chạy thử file trên, nếu được kết quả như trên thì tức là bạn đã bước đầu thành công rồi
```
Server is listening...
```

* Tiếp theo là viết code xử lý của server khi có kết nối tới. Do chúng ta đang xây dựng 1 chat tool, nghĩa là sẽ có nhiều client có thể kết nối đến server, gửi  và nhận dữ liệu từ server. Vì thế mỗi client kết nối đến cần phân riêng ra 1 luồng để xử lý. 
* Tạo 1 file `clientThread.py` chứa code xử lý cho mỗi luồng client như sau:
```
from threading import Thread


class ClientThread(Thread):
    def __init__(self, conn, addr, client):
        super().__init__()
        self.conn = conn
        self.addr = addr
        self.client = client
        self.name = ''

    def run(self):
```
* Import class ClientThread vào file `server.py`, tạo 1 list client chứa các ClientThread để quản lý. Mỗi khi có client kết nối tới, ta tạo 1 luồng ClientThread mới để xử lý dữ liệu gửi nhận cho client đó. :
```
import socket
from clientThread import ClientThread

HOST = '127.0.0.2'
PORT = 65432
client = []

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen(4)
    print('Server is listening...')
    while True:
        conn, addr = s.accept()
        with conn:
            try:
                print('Connected by', addr)
                client.append(ClientThread(conn, addr, client))
                client[-1].start()
            except Exception as e:
                print(e)
```
* Hàm `run()` ở file `clientThread.py` chứa code xử lý gửi nhận dữ liệu với client. Ở ứng dụng này, Khi client kết nối thành công tới server sẽ gửi tên người dùng đến server. Server nhận được sẽ gửi thông báo tới tất cả user khác việc có client mới join room. Khi client gửi tin nhắn tới, server sẽ gửi lại tin nhắn đó tới tất cả các client còn lại.
* Bạn sửa lại file `clientThread.py` như sau:
```
from threading import Thread


class ClientThread(Thread):
    def __init__(self, conn, addr, client):
        super().__init__()
        self.conn = conn
        self.addr = addr
        self.client = client
        self.name = ''

    def run(self):
        try:
            name = self.conn.recv(1024).decode()
            self.name = name
            self.sendMessageJoinRoom(name)
            while True:
                message = self.conn.recv(1024).decode()
                if message:
                    self.sendMessage(message)
        except Exception as e:
            print(e)


    def sendMessageJoinRoom(self, name):
        self.conn.send(bytes('welcome to room!', 'utf-8'))
        for client in self.client:
            if client.is_alive() and client.conn != self.conn:
                client.conn.send(bytes(name + ' has join room', 'utf-8'))


    def sendMessage(self, message):
        for client in self.client:
            if client.is_alive() and client.conn != self.conn:
                client.conn.send(bytes(message, 'utf-8'))
```
# Client
* Đối với client, đầu tiên bạn cũng cần mở 1 socket có nhiệm vụ kết nối tới server. Ở đây mình tạo 1 file `client.py`
```
import socket
import select
import sys

HOST = '127.0.0.18'
PORT = 65432
name = input('enter your name: ')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    try:
        s.connect((HOST, PORT))
        print('Connect successfully!!')
    except Exception as e:
        print(e)
```
* Tiếp theo là viết code xử lý gửi nhận dữ liệu với server. Lưu ý là code xử lý ở Server và Client phải đồng bộ với nhau.
* File `client.py` hoàn chỉnh như sau:
```
import socket
import select
import sys

HOST = '127.0.0.18'
PORT = 65432
name = input('enter your name: ')

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    try:
        s.connect((HOST, PORT))
        print('Connect successfully!!')
        s.send(bytes(name, 'utf-8'))
        while True:
            sockets_list = [sys.stdin, s]
            read_sockets, write_socket, error_socket = select.select(sockets_list, [], [])
            for socks in read_sockets:
                if socks == s:
                    message = socks.recv(1024).decode()
                    print(message)
                else:
                    message = input()
                    s.send(bytes(name + ': ' + message, 'utf8'))
    except Exception as e:
        print(e)
```
* Giải thích 1 chút đoạn này :
```
sockets_list = [sys.stdin, s]
            read_sockets, write_socket, error_socket = select.select(sockets_list, [], [])
            for socks in read_sockets:
                if socks == s:
                    message = socks.recv(1024).decode()
                    print(message)
                else:
                    message = input()
                    s.send(bytes(name + ': ' + message, 'utf8'))
```
* Việc mình sử dụng vòng lặp for nhằm mục đích kiểm tra. Nếu Client nhận được dữ liệu gửi từ phía server thì sẽ in ra màn hình. Còn nếu Client nhập dữ liệu input thì sẽ gửi tới Server để server gửi tin nhắn đến các client khác. Việc kiểm tra như này giúp Client có thể liên tục cập nhật các tin nhắn từ Client khác và gửi tin nhắn bất cứ khi nào muốn mà không phải làm theo cách tuần tự : Gửi xong nhận rồi mới được gửi tiếp.
# Chạy thử
* Đầu tiên bạn run file `server.py` lên
* Tiếp theo mở 2 tab terminal và run file `client.py`. Dùng thử và cảm nhận thành quả nhé. Dưới đây là kết quả mình chạy test với 2 tab terminal

![](https://images.viblo.asia/5eee1ea6-e0d6-4830-af27-5f90cbe3b6f8.png)

![](https://images.viblo.asia/8642ab02-9501-45a8-ac72-8005ebdaec4c.png)

# Kết luận
- Bài viết lần này đến đây là hết rồi. Mong là qua 3 phần này mọi người có thể hiểu hơn  về Socket, Multiple Threads và có thể tự tạo thành công 1 chat tool. Có thể tìm hiểu, nâng cấp thêm chức năng hay ho hơn cho tool.
- Nếu có ý kiến đóng góp xin hãy để lại dưới phần bình luận để mình có thể sửa đổi và cải thiện bài viết hơn.