Python cung cấp 2 mức truy cập tới network service. Ở mức thấp, ta có thể truy cập vào basic socket support trong hệ điều hành ở mức cơ bản, cho phép implement các máy khách và máy chủ cho 2 giao thức hướng kết nối và kết nối.
Python cũng cung cấp các thư viện truy cập ở mức cao cho giao thức mạng ở tầng ứng dụng trong mô hình TCP/IP như là FTP, HTTP. Và bài viết này sẽ giúp ta có cái nhìn từ tổng quan đến chi tiết về phần phổ biến nhất trong Networking, đó là Lập trình Socket
## Socket là gì?
Socket là điểm đầu cuối của kênh truyền thông 2 chiều. Socket có thể giao tiếp trong một tiến trình, giữa các tiến trình trên cùng một máy, hoặc giữa các tiến trình ở 2 nơi khác nhau.
Socket có thể được implement trên một số loại kênh truyền khác nhau như là: Unix domain socket, TCP, UDP... Các thư viện của socket cung cấp các lớp cụ thể để xử lý các đường truyền chung như  là một giao diện chung để xử lý các phần còn lại.
Socket có một số keyword được mô tả như sau


| No | Term & Description| 
| -------- | -------- |
| 1     |   **Domain**: Các giao thức sử dụng làm cơ chế truyền tải. Giá trị này có giá trị là các hằng số như là: AF_INET, PF_INET, PF_UNIX, PF_X25...   | 
|2|**type**:  Kiểu giao tiếp giữa 2 điểm đầu cuối, thường là SOCK_STREAM cho hướng kết nối và SOCK_DGRAM cho giao thức không hướng kết nối|
|3|**protocol**: Có thể được sử dụng để xác định một biến thể trong Domain và Type|
|4|**hostname**: Id của network interface|
|5|**port**: Mỗi server lắng nghe một hoặc nhiều port. Mỗi port có thể là số cổng Fixnum, một chuỗi chứa số cổng hoặc tên service|
## Module socket
Để create một socket, sử dụng function socket.socket() có sẵn trong module có cú pháp như dưới đây
```Python
s = socket.socket (socket_family, socket_type, protocol=0)
```
- `socket_family`: là **AF_UNIX** hoặc **AF_INET**
- `socket_type`: là SOCK_STREAM hoặc SOCK_DGRAM
- `protocol`: option, default là 0
## Server Socket Methods
| No |  Method và Description | 
| -------- | -------- |
| 1     | s.bind(): Phương thức này liên kết địa chỉ (hostname, cặp số hiệu cổng)  với socket   |
|2|s.listen(): Phương thức này cài đặt và bắt đầu lắng nghe với TCP |
|3|s.accept(): Chấp nhận TCP client, chờ khi kết nối đến|
## Client Socket Methods
Với `s.connect()` nó sẽ chủ động kết nối với máy chủ TCP
## Ví dụ về Server
Để khởi tạo một server, ta sử dụng function **socket** trong module để tạo một object socket. Một đối tượng socket sau đó được sử dụng để gọi các chức năng khác để thiết lập một máy chủ socket
Sau đó ta gọi `bind(hostname, port)` để chỉ định cổng kết nối với server.
Tiếp đến ta gọi phương thức `accept` để trả về đối tượng. Phương thức này đợi cho đến khi một máy khách kết nối với cổng mà bạn đã chỉ định, và sau đó trả về một đối tượng kết nối đại diện cho kết nối đến máy khách đó
```Python
#!/usr/bin/python 

import socket   

s = socket.socket()         #Tạo một socket object
host = socket.gethostname() # Tạo tên máy chủ
port = 12345                # Cài port cho kết nối
s.bind((host, port))        # Bind to the port vừa khởi tạo

s.listen(5)                 # Chờ client kết nối
while True:
   c, addr = s.accept()     # Thiết lập kết nối với client.
   print 'Got connection from', addr
   c.send('Thank you for connecting')
   c.close()                # Đóng kết nối
```
## Ví dụ về client
Chương trình dưới đây tạo một client socket để kết nối tới cổng 12345
`socket.connect(hosname, port)` mở một TCP connection tới host name và port ở trên. Mỗi khi một socket được mở, ta có thể đọc bất kỳ một đối tượng IO nào. Khi hoàn tất hãy đóng kết nối lại.
```Python
#!/usr/bin/python  

import socket            

s = socket.socket()         # Khởi tạo một socket object
host = socket.gethostname() # Lấy tên của máy local
port = 12345                # Đặt cổng cho service

s.connect((host, port))
print s.recv(1024)
s.close                     # Đóng kết nối
```
Chạy server.py và chạy client.py ở trên để thấy kết quả
```Python
# Chạy server dưới background
$ python server.py & 

# Khi máy chủ được chạy và client như sau
$ python client.py
```
RESULT
```
Got connection from ('127.0.0.1', 48437)
Thank you for connecting
```
## Module khác trong lập trình Network với Python
Dưới đây là danh sách một số module quan trọng trong lập trình mạng  với Python cũng như một số ngôn ngữ lập trình khác

|Protocol|	Common function|	Port No|	Python module|
| -------- | -------- | -------- | -------- |
|HTTP	|Web pages	|80	|httplib, urllib, xmlrpclib|
|NNTP	|Usenet news|	119|	nntplib|
|FTP	|File transfers	|20	|ftplib, urllib|
|SMTP|	Sending email|	25|	smtplib|
|POP3	|Fetching email|	110|	poplib|
|IMAP4	|Fetching email|	143|	imaplib|
|Telnet	|Command lines	|23	|telnetlib|
|Gopher|	Document transfers|	70|	gopherlib, urllib|
Hãy kiểm tra các thư viện ở trên để làm việc với các giao thức như FTP, SMTP, POP, và IMAP.

## Gửi Email sử dụng SMTP
Simple Mail Transfer Protocol (SMTP)  là một giao thức xử lý việc gửi email và điều hướng email giữa các mail server
Python cung cấp module **smtplib** , nó xác định một phiên làm việc của client SMTP có thể được sử dụng để gửi thư đến bất kỳ máy Internet nào bằng SMTP hoặc ESMTP
Dưới đây là cấu trúc để tạo
```Python
import smtplib

smtpObj = smtplib.SMTP( [host [, port [, local_hostname]]] )
```
- host: Đây là host chạy SMTP server, ta có thể (Optional argument)
- port: Đã có host thì phải có port chỉ định để lắng nghe. Ở đây thường là cổng 25
- local_hostname − Nếu host đang chạy tại local thì có thể chỉ định argument này, nó là optional
Một đối tượng SMTP có một instance được gọi là `sendmail`, thường sử dụng để gửi thư. Và nó có 3 tham số
 - The sender − Chuỗi với địa chỉ của người gửi
- The receivers − Danh sách chuỗi, mỗi chuỗi là một địa chỉ người nhận
- The message − Thông điệp

### Ví dụ
```Python
#!/usr/bin/python

import smtplib

sender = 'from@fromdomain.com'
receivers = ['to@todomain.com']

message = """From: From Person <from@fromdomain.com>
To: To Person <to@todomain.com>
Subject: SMTP e-mail test

This is a test e-mail message.
"""
try:
   smtpObj = smtplib.SMTP('localhost')
   smtpObj.sendmail(sender, receivers, message)         
   print "Successfully sent email"
except SMTPException:
   print "Error: unable to send email"
```

Nếu máy chủ SMTP không chạy trên local thì ta có thể remote chúng với **smtplib** để giao tiếp với remote server như sau
```Python
smtplib.SMTP('mail.your-domain.com', 25)
```


Cảm ơn bạn đã theo dõi bài viết !
> Refs: Python Advanced
>