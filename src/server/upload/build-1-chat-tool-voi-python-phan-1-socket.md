* Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình đa năng, do Guido van Rossum tạo ra và lần đầu ra mắt vào năm 1991. 
* Hiện tại, Python đã trở thành 1 trong các ngôn ngữ phổ biến nhất trên thế giới hiện nay nhờ những ưu điểm mạnh mẽ:
    * Dễ đọc, dễ học và dễ nhớ.
    * Có hình thức rất sáng sủa, cấu trúc rõ ràng, thuận tiện cho người mới học lập trình
    * Cấu trúc của Python còn cho phép người sử dụng viết mã lệnh với số lần gõ phím tối thiểu
    * Có thể ứng dụng trong nhiều lĩnh vực như: Web Development, Data Science, Scripting, .....
* Với những ưu điểm trên, thì tội gì chúng ta không thử tìm hiểu Python nhỉ? Thời gian vừa qua mình cũng đã mày mò tìm hiểu Python, và hôm nay quyết định chia sẻ lên đây 1 chút kiến thức mình học được để mọi người cùng tham khảo.
* Về cú pháp Python cơ bản, mình xin phép không nhắc lại trên đây. Mọi người có thể tìm hiểu trên [W3Schools](https://www.w3schools.com/python/default.asp), rất đầy đủ, có ví dụ minh họa  và bài tập cho các bạn thực hành trực tiếp cho từng phần cho các bạn.
* Để các bạn hiểu được cặn kẽ, mình xin phép chia bài này làm 3 phần.
    * Phần 1 - (Tức là bài viết này): Giới thiệu về Socket, lập trình Socket trong Python.
    * Phần 2: Tìm hiểu về đa luồng trong Python
    * Phần 3: Xây dựng chat tool cơ bản với python sử dụng Socket, đa luồng.
* Trong phạm vi bài viết này, mình sẽ giới thiệu tới các bạn về Socket, sử dụng Socket để kết nối Client - Server trong Python
# Giới thiệu về Socket
* Socket là điểm cuối end-point trong liên kết truyền thông hai chiều (two-way communication) biểu diễn kết nối giữa Client – Server.
- Socket được sử dụng để gửi dữ liệu qua lại giữa Client và Server thông qua mạng (network)
* Mạng (network) có thể là logical, mạng cục bộ tới máy tính hoặc 1 kết nối vật lí tới mạng bên ngoài, với kết nối riêng của chúng tới các mạng khác. Ví dụ điển hình là Internet, cái mà bạn kết nối thông qua [ISP (Internet Service Provider)](https://thuthuat.taimienphi.vn/isp-la-gi-phan-loai-isp-23684n.aspx)
# Phân loại Socket
* Socket được chia làm 2 loại chính :
    * Stream Socket
    * Datagram Socket
  ## Stream Socket
* Stream Socket dựa trên giao thức TCP việc truyền dữ liệu chỉ thực hiện giữa 2 quá trình đã thiết lập kết nối. Giao thức này đảm bảo dữ liệu được truyền đến nơi nhận một cách đáng tin cậy, đúng thứ tự nhờ vào cơ chế quản lý luồng lưu thông trên mạng và cơ chế chống tắc nghẽn.
 * Ưu điểm của Stream Socket là gì?
    * Dữ liệu truyền đi được đảm bảo truyền đến đúng nơi nhận, đúng thứ tự.
    * Mỗi thông điệp gửi đi đều có xác nhận trả về để thông báo cho người dùng thông tin về quá trình truyền tải.
* Nhược điểm:
    * Giữa máy chủ và máy nhận chỉ có 1 IP, nên khi kết nối, 1 máy phải chờ máy còn lại chấp nhận kết nối.
    * Tốc độ không nhanh
* Nó phù hợp ứng dụng trong các ứng dụng yêu cầu độ chính xác cao, không yêu cầu cao về tốc độ. Ta có thể kể đến 1 vài ứng dụng như: Mail, thanh toán ngân hàng , ...
  
  ![](https://images.viblo.asia/e6fec7de-abc3-4810-8c49-10ebaf26d854.jpg)

  ## Datagram Socket
* Dựa trên giao thức UDP việc truyền dữ liệu không yêu cầu có sự thiết lập kết nối giữa 2 quá trình. 
* Ưu điểm của Datagram Socket là gì?
    * Quá trình kết nối và truyền tải thông tin đơn giản, không cần thực hiện nhiều thao tác.
    * Thời gian truyền tải dữ liệu cực nhanh.
* Nhược điểm
    * Quá trình truyền thông tin không đảm bảo tin cậy, thông tin có thể truyền sai thứ tự hoặc bị lặp.
* Phù hợp với các ứng dụng như live stream, video call, ... vì những ứng dụng này yêu cầu tốc độ nhanh, nếu mất mát 1 vài gói tin trong lúc truyền thì vẫn không ảnh hưởng quá nhiều.
  
![](https://images.viblo.asia/a980bbe7-304f-4484-80ee-4ee6224471b5.jpg)



# Dựng 1 kết nối TCP Socket với Python
* Ở phần này, mình sẽ hướng dẫn các bạn thiết lập 1 kết nối TCP Socket giữa 1 Client và Server. 
* Server sẽ có nhiệm vụ gửi lại dữ liệu mà Client gửi tới.
## Thiết lập Server
* Dưới đây mình có file `server.py` chứa code Server  :
```
import socket

HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print('Start listening...')
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)
```
* Đừng lo nếu bạn đọc và chưa hiểu gì. Vì mình sẽ giải thích từng phần ngay dưới đây.
### Mở 1 Server để lắng nghe
```
import socket
```
* Python cung cấp cho bạn module `socket` để thao tác với Socket, vì thế bạn cần import chúng vào để sử dụng.
```
HOST = '127.0.0.1'
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print('Start listening...')
```
* `Host`là biến lưu địa chỉ máy chủ, còn `PORT` là địa chỉ cổng kết nối. Ở bên Client cũng sẽ phải có 2 thông số này để có thể kết nối tới Server
* Hàm `socket.socket()` khởi tạo 1 socket object để thực thi.
* Khi bạn sử dụng nó bên trong 1 hàm `with`, nếu có bất kỳ lỗi gì xảy ra sẽ tự động đóng kết nối. Để hiểu sâu hơn về hàm with bạn có thể đọc [tại đây](https://viblo.asia/p/python-context-manager-ban-da-thuc-su-hieu-63vKjJmRK2R)
* Đoạn code trên sẽ tương đương với :
```
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((HOST, PORT))
    s.listen()
finally:
    s.close()
```
* Thử chạy đoạn code trên và bạn sẽ nhận được như sau:
![](https://images.viblo.asia/6e726505-af45-44a2-adcb-9203e714824a.png)
* Nếu được kết quả như trên, tức là bạn đã khởi tạo được 1 server để lắng nghe rồi đó.
* Hàm `listen()` có 1 tham số backlock. Nó cho phép bạn chỉ định số lượng kết nối được phép cho server của bạn. Nếu không truyền vào, nó sẽ lấy giá trị backlock mặc định.
### Giao tiếp với Client
```
 conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)
```
* Khi có 1 client gửi yêu cầu kết nối đến, hàm accept() chấp thuận kết nối từ Client, cho phép Client gửi dữ liệu đến và xử lí.
* Hàm `while True` để Server liên tục xử lí dữ liệu Client gửi tới cho đến khi Client ngắt kết nối.
* Code trong hàm while là phần xử lí của Server đối với dữ liệu từ Client. Như ở trên, Server sẽ gửi lại bất cứ dữ liệu nào Client gửi tới.
## Thiết lập Client
* Tạo 1 file `client.py` như sau:
```
import socket

HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 65432        # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b'Hello, world')
    data = s.recv(1024)

print('Received', repr(data))
```
* `HOST` và `PORT` ở đây chính là địa chỉ và cổng kết nối với server. Client và Server phải đồng nhất 2 thông số này mới có thể kết nối.
* Hàm `connect` gửi yêu cầu kết nối tới Server. Nếu Server chấp thuận, Client sẽ có thể giao tiếp với Server.
* Ở đây mình gửi đoạn text `Hello, world`, Server sẽ nhận và gửi lại, Client in ra màn hình.
## Chạy thử
- OK giờ là lúc thử nghiệm thành quả.
* B1:  Đầu tiên bạn mở terminal, và chạy file `server.py`
![](https://images.viblo.asia/6e726505-af45-44a2-adcb-9203e714824a.png)
- B2: mở thêm 1 tab terminal, chạy file `client.py`
- B3: Xem kết quả
    * Phía Server:
    
   ![](https://images.viblo.asia/c59cdf5e-9b43-4972-9682-9ab815f90067.png)
    * Phía Client:
   
   ![](https://images.viblo.asia/27ad5516-e424-47ce-b811-0e7d55fb6739.png)
 * Nếu được kết quả như trên tức là bạn đã thành công rồi đó.
 # Kết luận
 * Vậy là mình đã chia sẻ xong với mọi người kiến thức cơ bản về Socket, và cách để build 1 kết nối TCP Client - Server.
 * Ở phần tiếp theo mình sẽ giới thiệu với các bạn thêm 1 kiến thức khá trừ tượng nhưng là tất yếu để xây dựng 1 tool chat : Đa luồng (Multiple Threads).
 * Link phần tiếp theo [tại đây](https://viblo.asia/p/build-1-chat-tool-voi-python-phan-2-da-luong-jvEla0bAZkw).
 # Tài liệu tham khảo
* https://realpython.com/python-sockets/
* https://toidicode.com/lap-trinh-mang-voi-module-socket-trong-python-364.html
* https://code.tutsplus.com/vi/tutorials/introduction-to-network-programming-in-python--cms-30459