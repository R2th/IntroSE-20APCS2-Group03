## Giới thiệu
### Web Server là gì?
#### Tổng quan

+ Web server là một máy tính lưu trữ những nội dung web.

+ Một máy chủ web dùng để phục vụ các trang web trên mạng internet hoặc mạng nội bộ.

+ Nó lưu trữ các `pages, scripts, progarms` hay các `files multimedia` và sử dụng giao thức `HTTP` để gửi các tệp đến trình duyệt web.

+ Một số máy chủ web nổi tiếng như : **Nginx web server**, **Apache web server**, **IIS web server**, **Light Speed web server**.

#### Cách thức máy chủ web hoặc động.

![](https://images.viblo.asia/4a51594b-8de6-45d5-a160-188caedbfad1.png)

+ Ví dụ người dùng muốn xem một trang web như `www.google.com`, người dụng nhập url vào trình duyệt web với điều kiện người dùng cần kết nối Internet. Khi đó bộ giao thức `TCP/IP` được sử dụng để thiết lập kết nối.

+ Khi kết nối được thiết lập, máy khách sẽ gửi một yêu cầu thông qua `HTTP` và chờ phản hồi từ máy chủ. Phía bên kia máy chủ nhận được yêu cầu, xử lý yêu cầu, gửi lại phản hồi cho máy khách.

#### Giao thức HTTP

+ Giao thức `HTTP` là viết tắt của `Hyper Text Transfer Protocol`.

+ Nó là một giao thức ở tầng ứng dụng cho phép các ứng dụng web giao tiếp và trao đổi dữ liệu.

+ Nó là một giao thức dựa trên `TCP/IP`.

+ Nó được sử dụng để cung cấp nội dung: `hình ảnh, âm thanh, video, tài liệu`...

+ Sử dụng `HTTP` là cách thuận tiện nhất để di chuyển dữ liệu nhanh chóng và đáng tin cậy trên web.

#### Ví dụ về HTTP message

![](https://images.viblo.asia/aeab35e6-0417-47c3-a2b7-43bfb4fd84ce.png)

### Cách tạo HTTP Server bằng python

Python có một số thư viện được tích hợp để tạo một `web server` dễ dàng hơn.
Ví dụ bạn có thể tạo một `SimpleHTTPServer` với một câu lệnh đơn giản:
+ Với python2
```bash
python -m SimpleHTTPServer + port(nếu không viết gì mặc định là 8000)
```
+ Với python3
```
python3 -m http.server + port(nếu không viết gì mặc định là 8000)
```

Nhưng bạn không thể custom server của bạn.

#### Tạo một Project HTTPServer

![](https://images.viblo.asia/3649fba1-27ac-4aab-a6b3-96ddd7c75ab2.png)

#### Tạo file HTML and CSS

```index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/main.css">
</head>
<body>
    <h1>Sun* Cyber Security Research</h1>
</body>
</html>
```
```main.css
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:100,200,300,400');

body{
    background-color: #222;
}

h1{
    color: white;
    padding: 20px 40px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, .7);
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    border-radius: 4px;
    border-bottom: 5px solid rgba(150, 150, 150, 1);
    font-weight: 200;
    font-family: 'IBM Plex Sans Condensed', sans-serif;
}
```
### Thiết lập project

`server.py`

```python
from http.server import BaseHTTPRequestHandler
import os
class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        try:
            split_path = os.path.splitext(self.path)
            request_extension = split_path[1]
            if request_extension != ".py":
                f = open(self.path[1:]).read()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes(f, 'utf-8'))
            else:
                f = "File not found"
                self.send_error(404,f)
        except:
            f = "File not found"
            self.send_error(404,f)
```

```python
from http.server import BaseHTTPRequestHandler
import os
```

+ **BaseHTTPRequestHandler** được sử dụng để xử lý các yêu cầu HTTP đến máy chủ.

+ Ngoài ra `BaseHTTPRequestHandler` còn hỗ trợ một số thuộc tính và phương thức sau:

    - `do_GET()`: Phương thức này xử lý khi có yêu cầu GET gửi lên.
    - `do_POST()`: Phương thức này xử lý khi có yêu cầu POST gửi lên.
    - `path`: Thuộc tính này trả về path của request.
    - `send_error()`: Phương thức này trả về lỗi HTTP cho client.

Đầu tiên định nghĩa một phương thứ `do_GET()`. Phương thức này chạy khi có một yêu cầu GET gửi lên.

+ **self.path =='/'** kiểm tra xem yêu cầu gửi lên có phải trang index hay không và nếu là trang `index` thì gán đường dẫn cho index **self.path == '/index.html`**.

+ Tiếp theo cố gắng đọc các tệp mà người dùng đang cố truy cập ngoại trừ những `file python` tránh làm lộ `source code`.

+ Nếu tập tin yêu cầu được tìm thấy thì server gửi phản hồi `200`. `200` là phản hồi mà bất cứ khi nào bạn truy cập thành công một trang web.

+ Nếu tập tin yêu cầu không được tìm thấy thì `server` gửi một mã lỗi tập tin yêu cầu không hợp lệ.

+ Sử dụng phương thức `bytes()` encode `utf-8` để chuyển đổi dạng văn bản sang bytes.

`main.py`

```python
import time
from http.server import HTTPServer
from server import Server

HOST_NAME = 'localhost'
PORT = 8000

if __name__ == "__main__":
    httpd = HTTPServer((HOST_NAME,PORT),Server)
    print(time.asctime(), "Start Server - %s:%s"%(HOST_NAME,PORT))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(),'Stop Server - %s:%s' %(HOST_NAME,PORT))
```

```python
import time
from http.server import HTTPServer
from server import Server
```

- **time** sử dụng để kiếm soát thời gian `start` và `stop` server.

- **HTTPServer** là một lớp con socketserver.TCPServer nó tạo và lắng nghe HTTP socket, gửi yêu cầu đến bộ xử lý.

Cấu hình máy chủ với 2 hằng số `HOST_NAME = 'localhost',PORT = 8000` với `HOST_NAME = 'localhost'` dùng để chạy máy chủ trên localhost và `PORT = 8000` là cổng mà để chạy ứng dụng.

`httpd = HTTPServer((HOST_NAME,PORT),Server)`

- Gọi **HTTPServer** mà python cung cấp với đối số thứ nhất là một cặp `(HOST_NAME,PORT)` và đối số thứ 2 là một class `Server` để xử lý đã được thiết lập trước đó.

```python
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass
httpd.server_close()
print(time.asctime(),'Stop Server - %s:%s' %(HOST_NAME,PORT))
```
- Khối tiếp theo để `start` và `stop` server, khi nhận được tín hiệu ngắt từ bàn phím server sẽ đóng kết nối với `httpd.server_close()`.

Bây giờ chúng ta start server bằng cách chạy lệnh: 
```bash
python3 main.py
```
- Mở trình duyệt nhập url **http://localhost:8000**
![](https://images.viblo.asia/9884d983-eb09-4d71-abd8-20037f8ffa9c.png)

- Và đây là phản hồi từ phía máy chủ:
![](https://images.viblo.asia/a2dff3b0-0545-49f9-8385-eca878448b23.png)


Vậy là chúng ta đã tạo thành công được một **HTTP Server** đơn giản với python, ngoài ra chúng ta còn có thể viết thêm các phương thức như `HEAD, POST ...` để cho Server có thể xử lý nhiều phương thức hơn.

## Tài liệu

https://docs.python.org/3/library/http.server.html