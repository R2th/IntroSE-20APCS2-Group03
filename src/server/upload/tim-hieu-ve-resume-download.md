Vấn đề này mình đã gặp phải khá lâu. Nhưng hôm nay mới rảnh rỗi nhớ ra để viết về nó. Cũng đơn giản chỉ là chia sẻ với mọi người về những gì mình hiểu biết về vấn đề **Resume download**. Chả là từ khá lâu trước đây, một bạn đã từng là đồng nghiệp cũ ở công ty có PM hỏi mình đại loại rằng team của họ làm về mảng mobile application. Họ trả về cho client một file có dung lượng khá lớn (~500MB). Và khách hàng của họ mong muốn là trong quá trình tải file xuống mà muốn tạm dừng hoặc không may mất kết nối mạng thì có thể tiếp tục tải lại file đó khi có kết nối mạng trở lại. Có thể làm được không? Và làm như thế nào? Với yêu cầu gì về phía client hoặc server? Thứ đầu tiên mình nghĩ khi được hỏi là thằng **Internet Download Manager** (**IDM**). Và đại loại là mình bảo với hắn rằng thằng IDM nó làm được. Nhưng tôi không biết nó làm như thế nào cả.

Sau đó, mình thấy vấn đề đó khá hay ho. Nên đã thử tìm hiểu với một vài từ khóa thì mình nhận ra rằng, việc resume download không phải là thằng IDM làm được mà chỉ đơn giản là thằng IDM hỗ trợ việc đó. Còn vấn đề có thể resume hay không lại là từ phía server. Vậy mà mình lại nghĩ do thằng IDM. Và mình cũng chợt nhớ ra là thi thoảng với một vài server IDM không hỗ trợ (hay không thể thì đúng hơn) resume download với status **Resume capability: No**. Đó là do server đó được cài đặt vô hiệu hóa việc resume.

Lan man thế cũng đủ rồi nhỉ? Mình sẽ nói sơ qua flow làm việc của IDM khi bắt đầu tải một file nhé (ý kiến và hiểu biết của cá nhân mình, nên có thể không chính xác lắm):

1. IDM sẽ request lên server đó với đường dẫn của file cần tải.
2. Sau khi nhận được response từ server. Nó kiểm tra xem có header **Accept-Ranges: bytes** hay không.
3. Nếu có, thì server đó hỗ trợ resume. Và lần sau (nếu bạn đã tạm dừng và tải tiếp) nó sẽ gửi kèm một header **Range: bytes=<Số lượng bytes đã tải được>-** lên. Server sẽ trả về một status code là **206 Partial Content** kèm header **Content-Range: bytes <Số bytes bạn gửi lên>-<Số bytes của file - 1>/<Số bytes của file>**

Để có thể dễ tưởng tượng hơn. Bây giờ chúng ta cùng đi thực nghiệm nhé. Mình dùng Ubuntu, nên chúng ta có thể sử dụng luôn package **Wget** với tùy chọn `-c (--continue)` để thử (không cần phải IDM). Phần chuẩn bị, chúng ta sẽ cài đặt NginX hoặc Apache2. Sau đó cho một file nặng nặng vào thư mục public của NginX (hoặc Apache - thường là `/var/www/html`). Do tốc độ truyền dữ liệu trong mạng local là rất nhanh nên chúng ta khó có thể xem chính xác được. Rất may là Wget có hỗ trợ limit rate (chúng ta sẽ sử dụng nó để giả lập tốc độ mạng).

Đầu tiên, chúng ta tải file với lệnh:

```
$ wget http://localhost/file.mp3 -c --limit-rate 500K
```

Rồi trong quá trình nó download, bạn bấm tổ hợp phím Ctrl+C để dừng. Rồi tiếp tục chạy lại lệnh trên để xem kết quả :smile:

```
$ wget http://localhost/file.mp3 -c --limit-rate 500K
--2018-09-16 11:03:19--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

13% [=====>                                             ] 1,386,970    500KB/s             ^C
$ wget http://localhost/file.mp3 -c --limit-rate 500K
--2018-09-16 11:03:24--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
HTTP request sent, awaiting response... 206 Partial Content
Length: 10266423 (9.8M), 8772957 (8.4M) remaining [audio/mpeg]
Saving to: ‘file.mp3’

29% [+++++++======>                                     ] 2,984,410    500KB/s             ^C
```

Để có thể xem chi tiết thằng Wget này nó làm việc như thế nào. Bạn có thể sử dụng thêm tùy chọn `-d (--debug)`:

```
$ wget http://localhost/file.mp3 -c -d --limit-rate 500K
Setting --limit-rate (limitrate) to 500K
DEBUG output created by Wget 1.15 on linux-gnu.

URI encoding = ‘UTF-8’
--2018-09-16 11:16:03--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Caching localhost => 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
Created socket 3.
Releasing 0x000000000174c820 (new refcount 1).

---request begin---
GET /file.mp3 HTTP/1.1
User-Agent: Wget/1.15 (linux-gnu)
Accept: */*
Host: localhost
Connection: Keep-Alive

---request end---
HTTP request sent, awaiting response... 
---response begin---
HTTP/1.1 200 OK
Server: nginx/1.12.1
Date: Sun, 16 Sep 2018 04:16:03 GMT
Content-Type: audio/mpeg
Content-Length: 10266423
Last-Modified: Sun, 24 Jul 2016 08:34:00 GMT
Connection: keep-alive
ETag: "57947d78-9ca737"
Accept-Ranges: bytes

---response end---
200 OK
Registered socket 3 for persistent reuse.
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

 0% [                                                                                                                                                ] 0           --.-K/s
 
$ wget http://localhost/file.mp3 -c -d --limit-rate 500K
Setting --limit-rate (limitrate) to 500K
DEBUG output created by Wget 1.15 on linux-gnu.

URI encoding = ‘UTF-8’
--2018-09-16 11:17:08--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Caching localhost => 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
Created socket 3.
Releasing 0x00000000023b8670 (new refcount 1).

---request begin---
GET /file.mp3 HTTP/1.1
Range: bytes=212992-
User-Agent: Wget/1.15 (linux-gnu)
Accept: */*
Host: localhost
Connection: Keep-Alive

---request end---
HTTP request sent, awaiting response... 
---response begin---
HTTP/1.1 206 Partial Content
Server: nginx/1.12.1
Date: Sun, 16 Sep 2018 04:17:08 GMT
Content-Type: audio/mpeg
Content-Length: 10053431
Last-Modified: Sun, 24 Jul 2016 08:34:00 GMT
Connection: keep-alive
ETag: "57947d78-9ca737"
Content-Range: bytes 212992-10266422/10266423

---response end---
206 Partial Content
Registered socket 3 for persistent reuse.
Length: 10266423 (9.8M), 10053431 (9.6M) remaining [audio/mpeg]
Saving to: ‘file.mp3’

 2% [++                                                                                                                                              ] 212,992     --.-K/s
```

Giờ chúng ta muốn vô hiệu hóa việc resume thì làm như thế nào? Vâng, từ NginX v1.1.2 thì chúng ta có directive `max_ranges`. Bạn hãy set nó về 0 rồi restart lại NginX để vô hiệu hóa việc resume và thử lại:

```
server {
  listen 80;
  listen [::]:80;
  server_name localhost;
  
  location / {
    # ...
    max_ranges 0;
    # ...
  }
}
```

Kết quả:

```
$ wget http://localhost/file.mp3 -c --limit-rate 500K
--2018-09-16 11:23:21--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

 6% [=======>                                                                                                                                        ] 638,976      500KB/s             ^C
$ wget http://localhost/file.mp3 -c --limit-rate 500K
--2018-09-16 11:23:23--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

 5% [======>                                                                                                                                         ] 532,480      500KB/s             ^C
```

Với tùy chọn `-d (--debug)`:

```
$ wget http://localhost/file.mp3 -c -d --limit-rate 500K
Setting --debug (debug) to 1
Setting --limit-rate (limitrate) to 500K
DEBUG output created by Wget 1.15 on linux-gnu.

URI encoding = ‘UTF-8’
--2018-09-16 11:24:41--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Caching localhost => 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
Created socket 3.
Releasing 0x00000000006bf820 (new refcount 1).

---request begin---
GET /file.mp3 HTTP/1.1
User-Agent: Wget/1.15 (linux-gnu)
Accept: */*
Host: localhost
Connection: Keep-Alive

---request end---
HTTP request sent, awaiting response... 
---response begin---
HTTP/1.1 200 OK
Server: nginx/1.12.1
Date: Sun, 16 Sep 2018 04:24:41 GMT
Content-Type: audio/mpeg
Content-Length: 10266423
Last-Modified: Sun, 24 Jul 2016 08:34:00 GMT
Connection: keep-alive
ETag: "57947d78-9ca737"

---response end---
200 OK
Registered socket 3 for persistent reuse.
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

 0% [                                                                                                                                                ] 0           --.-K/s
 
$ wget http://localhost/file.mp3 -c -d --limit-rate 500K
Setting --debug (debug) to 1
Setting --limit-rate (limitrate) to 500K
DEBUG output created by Wget 1.15 on linux-gnu.

URI encoding = ‘UTF-8’
--2018-09-16 11:25:26--  http://localhost/file.mp3
Resolving localhost (localhost)... 127.0.0.1
Caching localhost => 127.0.0.1
Connecting to localhost (localhost)|127.0.0.1|:80... connected.
Created socket 3.
Releasing 0x0000000002114670 (new refcount 1).

---request begin---
GET /file.mp3 HTTP/1.1
Range: bytes=212992-
User-Agent: Wget/1.15 (linux-gnu)
Accept: */*
Host: localhost
Connection: Keep-Alive

---request end---
HTTP request sent, awaiting response... 
---response begin---
HTTP/1.1 200 OK
Server: nginx/1.12.1
Date: Sun, 16 Sep 2018 04:25:26 GMT
Content-Type: audio/mpeg
Content-Length: 10266423
Last-Modified: Sun, 24 Jul 2016 08:34:00 GMT
Connection: keep-alive
ETag: "57947d78-9ca737"

---response end---
200 OK
Registered socket 3 for persistent reuse.
Length: 10266423 (9.8M) [audio/mpeg]
Saving to: ‘file.mp3’

 0% [                                                                                                                                                ] 0           --.-K/s
```

Vâng, bạn sẽ để ý thấy rằng client chúng ta gửi header **Range:** nhưng server vẫn lạnh lùng trả về status code là 200 và không kèm theo header **Content-Range**. Vậy là phải tải lại từ đầu thôi :rofl:.

Đối với Apache (từ version 2.2.21) thì bạn có thể thêm tùy chọn **MaxRanges none**.

```
<VirtualHost *:80>
    DocumentRoot /var/www
    # ...
    MaxRanges none
    # ...
</VirtualHost>
```

Mình có thử cài NginX trên Windows và thử nghiệm với IDM và chụp ảnh lại. Các bạn có thể xem kết quả:

![](https://images.viblo.asia/e83ac81a-192c-44e3-8c13-2fcdfa25009e.PNG)

![](https://images.viblo.asia/651aa146-8e81-4b49-ae1c-5f976daba46f.PNG)

Đây là chúng ta đang nói về server riêng, do chúng ta cài đặt. Còn trong trường hợp bạn sử dụng shared hosting, và nhà cung cấp lại vô hiệu hóa việc resume download. Vậy chúng ta có thể làm được không? Câu trả lời là có thể. Chúng ta sẽ xử lý bằng code theo flow như sau:

1. Trả file về kèm với header **Accept-Ranges: bytes**
2. Kiểm tra xem trong header request có **HTTP_RANGE** không? Nếu có, lấy thông tin rồi đọc và trả lại cho client status code 206 kèm các bytes kế tiếp cùng header **Content-Range: bytes**

Đấy là lý thuyết. Còn thực tế, bạn có thể Google với ngôn ngữ tương ứng bạn đang sử dụng, sẽ có khá nhiều mẫu code giúp chúng ta thực hiện việc này trong trường hợp server vô hiệu hóa việc resume. Với PHP thì bạn có thể tham khảo tại https://github.com/pomle/php-serveFilePartial

# Lời kết

Khi server đã hỗ trợ việc resume, công việc của client sẽ thực hiện giống với flow của IDM mình đã viết ở trên. Và mình chia sẻ một phần nhỏ nữa, là việc download đa luồng giống IDM (với điều kiện server hỗ trợ resume, các bạn có thể xem ảnh dưới mình chụp IDM với cài đặt 8 luồng và download file không hỗ trợ resume rồi so sánh với ảnh hỗ trợ resume ở trên) đơn giản chỉ là tạo nhiều process. Mỗi process một phần với header gửi lên là **Range: bytes=<Byte bắt đầu>-<Byte kết thúc>**, sau khi hoàn thành các phần khác nhau sẽ thực hiện ghép lại thành một file cuối cùng. Đó cũng là lý do vì sao chúng ta nên kiểm tra mã checksum MD5 (hoặc SHA1) của file sau khi đã tải so với trang chủ của file cung cấp tránh trường hợp file tải về bị lỗi ở một luồng nào đó dẫn đến file làm việc không đúng.

![](https://images.viblo.asia/5e02db75-e605-47ba-9c9c-c91bcc24e3c4.PNG)

Bài viết của mình đến đây là kết thúc. Hy vọng với bài viết đơn giản này sẽ giúp bạn trong một tương lai không xa. See you :wave:!

> Original post: https://namnv609.cf/posts/tim-hieu-ve-resume-download.html