### Socket là gì?
Socket là giao diện lập trình ứng dụng mạng được dùng để truyền và nhận dữ liệu trên internet. Giữa hai chương trình chạy trên mạng cần có một liên kết giao tiếp hai chiều (two-way communication) để kết nối 2 process trò chuyện với nhau. Điểm cuối (endpoint) của liên kết này được gọi là socket.

Một chức năng khác của socket là giúp các tầng TCP hoặc TCP Layer định danh ứng dụng mà dữ liệu sẽ được gửi tới thông qua sự ràng buộc với một cổng port (thể hiện là một con số cụ thể), từ đó tiến hành kết nối giữa client và server.

![](https://images.viblo.asia/84423207-c33d-40cc-bcef-5953e8414de7.jpg)

Mô tả mô hình 
1. Trước tiên chúng ta sẽ tạo ra một máy chủ bằng cách mở một socket - Socket()
2. Sau đó chúng ta sẽ liên kết nó với một host hoặc một máy và một port - Bind()
3. Tiếp theo server sẽ bắt đầu lắng nghe trên port đó - Listen()
4. Yêu cầu kết nối từ client được gửi tới server  - Connect()
5. Server sẽ accept yêu cầu từ client và sau đó kết nối được thiết lập - Accept() 
6. Bây giờ cả hai đều có thể gửi và nhận tin tại thời điểm đó - Read() / Write()
7. Và cuối cùng khi hoàn thành chúng có thể  đóng kết nối - Close()

Bây giờ chúng ta thực hành lập trình socket bằng module socket trong python.<br>

### Tạo server 
Chúng ta sẽ tạo một DCP IP server nhằm nhiệm vụ lắng nghe trên một cổng cho client gửi request đến.<br>

**Các bước để tạo lên 1 chương trình phía server:**

1. Tạo socket với hàm `socket ()` chúng ta có thể truyền vào tham số hoặc để trống, ở đây mình truyền vào 2 tham số là hằng `socket.AF_INET` (tham số truyền vào phiên bản IP chúng ta sẽ sử dụng ở đây là phiên bản 4), tiếp theo là hằng số `socket.SOCK_STREAM`  chỉ loại kết nối TCP IP hoặc UDP,.. (ở đây mình dùng TCP)
2. Gán địa chỉ cho socket `bind(host, port)` với các tham số là máy chủ và cổng 
3. Chỉ định socket lắng nghe kết nối `listen ()` có thể điền số lượng tối đa các kết nối đang chờ
4. Chờ/chấp nhận kết nối` accept ()`. Hàm này trả về hai giá tri` c`: kết nối; `addr`: địa chỉ của request hoặc địa chỉ của client
5. Sau đó server có thể gửi dữ liệu qua hàm `send()`.
6. Sau khi thực hiện xong thì đóng kết nối lại `close()`.


```
#server.py 

import socket 

# Định nghĩa host và port mà server sẽ chạy và lắng nghe
host = 'localhost'
port = 4000
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))

s.listen(1) # 1 ở đây có nghĩa chỉ chấp nhận 1 kết nối
print("Server listening on port", port)

c, addr = s.accept()
print("Connect from ", str(addr))

#server sử dụng kết nối gửi dữ liệu tới client dưới dạng binary
c.send(b"Hello, how are you")
c.send("Bye", encode())
c.close()
```
### Tạo client  

Chúng ta sẽ tạo một DCP IP client để kết nối với server ở cổng 4000. 

1. Tạo socket với hàm `socket()`
2. Taọ kết nối với server với hàm `connect(("localhost", 4000))`
3. Đọc sữ liệu được server gửi tới `recv()`
4. Đóng socket `close()`
```
#client .py

import socket 

# Như mình đã nói ở trên thì chúng ta không truyền tham số vào vẫn ok
s = socket.socket()
s.connect(("localhost", 4000)) 

# 1024 là số bytes mà client có thể nhận được trong 1 lần
# Phần tin nhắn đầu tiên
msg = s.recv(1024)

# Phần tin nhắn tiếp theo 
while msg:
  print("Recvied ", msg.decode())
  msg = s.recv(1024)

s.close()
```

Sau khi chỉ chạy server.py rồi chạy client.py thì ta thấy client đã nhận được dữ liệu do server gửi tới.

![](https://images.viblo.asia/1526c881-5c0e-423d-bc77-15b323f24153.png)

### Gửi file 

Chỉnh sửa nội dùng 2 file trên một chút thì chúng ta có thể thực hiện chức năng server gửi nội dung file mà client yêu cầu tới.

**Phía server**

Server sẽ gửi nội dung một file mà client yêu cầu.<br>

```
# fileserver.py

import socket 

host = 'localhost'
port = 6767

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))
s.listen(1)
print("Server listening on port", port)

c, addr = s.accept()

#Nhận tên file do client gửi tới
filename = c.recv(1024)
try:
  f =  open(filename, 'rb')
  content = f.read()
  
  # Gửi dữ liệu trong file cho client
  c.send(content)
  f.close()
  
except FileExistsError:
  c.send("File not found") #nếu file không tồn tại bảo với client rằng "File not found"
  
c.close()
```

**Phía client**

Nhập vào tên file muốn lấy dữ liệu

```
# fileclient.py

import socket 
s = socket.socket()
s.connect(("localhost", 6767)) #lắng nghe ở cổng 6767

#Nhập vào tên file 
filename = input("Enter a filename ")

#Gửi tên file cho server
s.send(filename.encode())

#Nhận được dữ liệu từ server gửi tới
content = s.recv(1024)

print(content.decode())
s.close()
```

Đây là kết quả nhận được từ server.

![](https://images.viblo.asia/40b89352-7b0b-4e12-ac70-c1c0a3799698.png)

 Trên đây là những ví dụ đơn giản về lập trình socket trong python mà mình tìm hiểu được ^.^