# Giới thiệu
   [MongoDB](https://www.mongodb.com/) là một [cơ sở dữ liệu NoSQL](https://viblo.asia/p/gioi-thieu-ve-nosql-database-djeZ1a9jZWz) được sử dụng nhiều trong các web app hiện đại. 
    Nó lưu trữ dữ liệu dưới dạng JSON với lược đồ(schema) động, nghĩa là, không giống như cơ sở dữ liệu có quan hệ, MongoDB không bắt buộc định nghĩa schema trước khi thêm dữ liệu vào database. Chúng ta có thể thay đổi schema bất cứ lúc nào cần mà không cần tạo database mới.
    Bài này sẽ hướng dẫn cách cài đặt MongoDB và sử dụng trên máy Ubuntu dùng command line.
    
## Bước 1 - Cài đặt MongoDB
Trong package repositories chính thức của Ubuntu chỉ chứa phiên bản ổn định của MongoDB. 
Để cài được version mới nhất hoặc một version nào đó không có trong đó cần đưa gói Mongo package repository tương ứng vào APT (Advanced Package Tool - là một công cụ được sử dụng để quản lý các gói phần mềm trên các bản phân phối Linux thuộc dòng Ubuntu/Debian.) của máy mình. 
Sau đó thì mình có thể cài `monggo-db`, cái này là một gói meta, có thể trỏ đến tất cả version từ đây, mặc định là version mới nhất.

Xong màn dạo đầu, mình bắt tay vào cài. Những command sau icon 😱 là những command mình cần bấm.

* Đầu tiên cần add public key [GPG](https://vi.wikipedia.org/wiki/GNU_Privacy_Guard) vào key chains của máy mình. 

😱
```
 curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

Ở đây tui cài version 4.4, bạn có thể thay đổi version bạn thích bằng cách thay đổi đường dẫn tới version đó. 
 [cURL](https://vi.wikipedia.org/wiki/CURL) là một công cụ dòng lệnh có sẵn trên nhiều hệ điều hành được sử dụng để truyền dữ liệu. Nó đọc bất kỳ dữ liệu nào được lưu trữ tại URL được chuyển đến nó và in nội dung ra đầu ra của hệ thống.
Trong command này, cURL sẽ mở kết nối đến https://www.mongodb.org/static/pgp/server-4.4.asc và nhận về GPG key file (bạn có thể thử bấm `curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc` để xem hình hài cái key nó ra sao nha) và truyền vào lệnh sau `sudo apt-key add -`. 
Giả sử nhận về GPG key ABC thì kết quả sẽ tương ứng command `sudo apt-key add - ABC`. Thêm option `fsSL` (fail silently) của cURL để khi kết nối tới https://www.mongodb.org/static/pgp/server-4.4.asc bị lỗi gì đó thì sẽ k in gì ra system output, tránh add bậy bạ lum la vào key list.

Command này ra out put OK là add key thành công:
```
Output
OK
```

Muốn kiểm tra lại cho chắc thì mở key list ra coi:
```
apt-key list
```
Kiếm trong danh sách sẽ thấy key của Mongo
```
Output
/etc/apt/trusted.gpg
--------------------
pub   rsa4096 2019-05-28 [SC] [expires: 2024-05-26]
      2069 1EEC 3521 6C63 CAF6  6CE1 6564 08E3 90CF B1F5
uid           [ unknown] MongoDB 4.4 Release Signing Key <packaging@mongodb.com>
. . .
```

Tại thời điểm này, cài đặt APT của bạn vẫn chưa biết tìm `mongodb-org` gói bạn cần để cài đặt phiên bản MongoDB đó ở đâu.

Có hai nơi trên máy chủ của bạn nơi APT tìm kiếm các gói online để tải xuống và cài đặt: file `sources.list` và thư mục `sources.list.d` . `sources.list` là một file liệt kê các nguồn dữ liệu APT đang hoạt động, với một nguồn trên mỗi dòng và các nguồn ưu tiên nhất được liệt kê đầu tiên. Thư mục `sources.list.d` cho phép bạn thêm các file `sources.list` riêng biệt vào.

Chạy lệnh sau, lệnh này sẽ tạo một file trong `sources.list.d` có tên `mongodb-org-4.4.list`. Nội dung duy nhất trong file này là một dòng `deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse`
😱
```
 echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

Dòng này cho APT biết mọi thứ nó cần biết về nguồn của gói là gì và tìm gói đó ở đâu:
`deb`: Ê mày máy tao kiến trúc Debian thông thường. Hoặc nếu kiến trúc Debian phân tán mã nguồn thì sửa thành `deb-src`.
`[ arch=amd64,arm64 ]`: Kiến trúc mà dữ liệu APT sẽ được tải xuống.
`https://repo.mongodb.org/apt/ubuntu`: Vị trí có thể tìm thấy dữ liệu APT - nơi đặt kho lưu trữ MongoDB chính thức.
`focal/mongodb-org/4.4`: Kho Ubuntu có thể chứa một số bản phát hành khác nhau. Điều này chỉ rõ rằng bạn chỉ muốn phiên bản 4.4 của `mongodb-org` gói có sẵn cho phiên bản Ubuntu `focal` (“Focal Fossa” là tên mã của Ubuntu 20.04). Muốn biết máy bạn mã nào thì bấm `lsb_release -dc` và update command theo.
`multiverse`: Phần này trỏ APT đến một trong bốn kho lưu trữ chính của Ubuntu. Trong trường hợp này, nó trỏ đến kho `multiverse`.

Sau khi chạy lệnh này, hãy cập nhật chỉ mục gói:
😱
```
 sudo apt update
```
Sau đó có thể tải về:
😱
```
 sudo apt install mongodb-org
```
Note: Phàm mọi câu hỏi trên đời liên quan tới license cứ Yes(Y) là được.
## Bước 2 - Khởi động Mongo service

Mông cô bê đê vừa cài hoạt động như một Daemon (Disk And Execution MONitor là một chương trình chạy như một tiến trình nền chứ không phải là một tiến trình tương tác), nên ta dùng systemd để điều khiển.

### Khởi động
😱
```
 sudo systemctl start mongod.service
```
### Xem trạng thái
😱
```
 sudo systemctl status mongod
```
![hiện active(running) là đang chạy ok)](https://images.viblo.asia/9336491e-638a-4823-98db-2d797f523cdd.png)

### Khởi động lại
```
sudo systemctl restart mongod
```
### Tự khởi động cùng hệ thống
```
sudo systemctl enable mongod
```
### Tắt tự khởi động cùng hệ thống
```
sudo systemctl disable mongod
```

## Bước 3 - Sờ thử môngcô db (nhớ bật)
Xem trạng thái kết nối của db: 
```
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
```

!["ok": 1 là đang kết nối](https://images.viblo.asia/770352cf-2aa9-4f23-908a-d684a500ed2f.png)

### Ngoài ra, lưu ý rằng cơ sở dữ liệu đang chạy trên cổng 27017 ở 127.0.0.1, địa chỉ loopback local đại diện cho localhost . Đây là số cổng mặc định của MongoDB.

# Kết luận

Cảm ơn các bạn đã đọc đến phần kết luận. Chúc các bạn cài đặt thành công MongoDB trên máy Ubuntu của mình.
Kudo! 😘😍