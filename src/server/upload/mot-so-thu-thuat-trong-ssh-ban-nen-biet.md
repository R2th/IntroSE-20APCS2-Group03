Xin chào mọi người, hôm nay mình sẽ giới thiệu một số thủ thuật đơn giản giúp bạn nâng cao skill quản lý remote SSH và tính năng bảo mật cho dịch vụ Secure Shell (SSH). 
File cấu hình server SSH được đặt trong thư mục /etc/ssh/sshd_conf. Bạn cần khởi động lại dịch vụ SSH sau mỗi lần thay đổi để các thay đổi đó được thực thi nhé. 
## 1. Mã khóa công khai
Trước tiên, để sử dụng các thủ thuật ssh bên dưới, bạn cần phải thực hiện các bước sau:

Tạo cặp public/private key. 
- Private key dùng để chứng thực quyền sở hữu của public key.
- Thêm public key vào bất cứ server nào bạn muốn remote.
Lệnh sau dùng để tạo ra một cặp public/private key:

```
ssh-keygen -t rsa 
```

Lệnh này sẽ tạo ra 1 căp key mới tại thư mục ~/.ssh với 2 file: id_rsa - private key và id_rsa.pub tên của public key.
Với 2 file này bạn sẽ thường sử dụng file id_rsa.pub để thêm public key của bạn vào server mà bạn muốn remote.

**ssh-copy-id** Bạn có thể sử dụng lệnh ssh-copy-id để thực hiện sao chép public key từ máy bạn đến các server. 
Ví dụ, bạn vừa tạo ra một cặp public/private key với tên là new_key ở thư mục ~/.ssh và muốn cài đặt cho user test trên server có tên là remote, thực hiện như sau:

```
ssh-copy-id -i ~/.ssh/new_key test@remote 
```

Để remote tới server bạn sử dụng lệnh:
```
ssh user@host 
```

Lưu ý: 
1. Bạn chỉ có thể sao chép public key đến các server mà bạn có quyền ssh vào.
2. Ngoài rsa, OpenSSH còn hỗ trợ một kiểu mã khóa công khai khác là dsa. Tuy nhiên, nó không được khuyến khích dùng vì tính bảo mật của nó so với rsa.
## 2. SSH config
Bạn có thể cấu hình cho các kết nối ssh sử dụng các tên thay thế ngắn hơn cho hostname sử dụng file ~/.ssh/config hoặc file /etc/ssh/ssh_config. 

Ví dụ, bạn muốn ssh đến một server với lệnh sau (chưa sử dụng ssh_config):

```
ssh -p12345 foo@bar.baz.edu -i ~/.ssh/custom_key 
```
Bạn có thể thêm vào file ~/.ssh/config như sau:

```
Host bar       
User foo     
Port 12345     
IdentityFile ~/.ssh/custom_key     
HostName bar.baz.edu 
```

Sau đó bạn có thể sử dụng lệnh bên dưới để thực hiện ssh với ý nghĩa tương đương với lệnh ssh ở trên (Sau khi config):
```
ssh bar 
```
## 3. Tunnelling
Để truy cập đến các server được bảo vệ bởi tường lửa, bạn cần phải tạo một tunnel từ máy bạn đến server xuyên qua một port mà tường lửa cho phép. ssh cung cấp cho bạn một tùy chọn để thực hiện công việc này.

Ví dụ, bạn muốn tạo một tunnel cho web server no-public-access từ máy bạn thông qua user test trên máy ssh-host mà bạn có quyền ssh vào, thực hiện như sau:
```
ssh -L 8080:no-public-access:80 test@ssh-host
```

Sau khi thực hiện lệnh trên, các request đến http://localhost:8080 sẽ được trỏ đến no-public-access:80 và các response từ no-public-access sẽ được định hướng lại về máy của bạn thông qua ssh-host:80.
## 4. Mounting filesystems
sshfs là một công cụ rất hữu ích dùng để chia sẻ dữ liệu trên các máy Linux một cách an toàn. Nó thực hiện mount một thư mục của máy remote vào một thư mục trên máy local.

Ví dụ, để mount thư mục home của user test trên máy ssh-host vào thư mục /mnt/test, sử dụng lệnh sau:

```
sshfs test@ssh-host: /mnt/test 
```
## 5. Remote and edit file
Để soạn thảo một văn bản trên máy remote với vim bạn có thể thực hiện như sau:

```
vim scp://admin@server/test 
```
Lệnh trên sử dụng vim để mở file test ở thư mục home của user admin trên máy server để soạn thảo.

`vim` sử dụng scp để thực hiện sao chép file từ máy remote về máy local và thực hiện soạn thảo trên file ở máy local. Khi thực hiện lệnh write, `vim` sẽ đồng bộ file local với file remote.

## 6. Limit user remote to server
Nếu muốn tạo danh sách một số đối tượng người dùng được phép đăng nhập vào SSH, bạn có thể mô tả chúng trong file `/etc/ssh/sshd_config`. 
Ví dụ, nếu muốn cho phép người dùng admin, thor, thane đăng nhập qua SSH, ở cuối file sshd_config, thêm vào một dòng như sau:

```
AllowUsers admin thor thane
```
## 7. Truy cập trực tiếp đến các máy NAT
Thêm vào file `~/.ssh/config` đoạn config sau:

```
Host behind.bar       
ProxyCommand ssh -q -W %h:%p bar 
```

ProxyCommand định hướng cho ssh cách để kết nối đến behind.bar: ssh vào bar (với config đã định nghĩa trước đó) sau đó ssh vào behind.bar. Để ssh vào behind.bar với config như trên bạn thực hiện lệnh sau:
```
ssh behind.bar 
```
## 8. Chia sẻ kết nối
Khi bạn phải làm việc với nhiều phiên kết nối ssh khác nhau trên cùng một máy, bạn có thể sử dụng tính năng chia sẻ kết nối mà ssh cung cấp thay vì tạo các kết nối mới. Đoạn cấu hình sau sẽ thực hiện chia sẻ các kết nối đến busyserver:
```
Host busyserver       
Controlmaster auto     
Controlpath ~/.ssh/ssh-%r@%h:%p.sock 
```

Controlmaster với giá trị là auto sẽ tự động chia sẻ các kết nối trên busyserver.

Controlpath tạo ra một file socket trong thư mục ~/.ssh khi bạn thực hiện kết nối đầu tiên đến busyserver, socket này sẽ được sử dụng bởi các kết nối sau đó đến busyserver.

## 9. Agent Forwarding
Khi bạn ssh đến một server sau đó muốn ssh sang một server khác với key đang dùng thì có thể sử dụng tính năng Agent Forwarding mà ssh cung cấp.

Agent Forwarding được bật với tùy chọn -A khi thực hiện ssh. 

Ví dụ, bạn muốn thực hiện ssh sang foo rồi tiếp đến sang bar, bạn có thể thực hiện ssh đến foo với tùy chọn -A:
```
ssh -A foo 
```

Sau đó ssh đến bar:
```
ssh bar
``` 
Chú ý: 
- Để cho phép Agent Forwarding bạn cần phải thực hiện lệnh ssh-add để add key của bạn trước khi thực hiện ssh với tùy chọn Agent Forwarding.
- Bạn cũng có thể thực hiện Agent Forwarding bằng cách thêm vào các kết nối ssh trong file ssh_config tùy chọn như sau: 

```
ForwardAgent yes 
```
## 10. Thay đổi cổng SSH

Mặc định, SSH tuân theo các kết nối đến trên cổng 22. Kẻ tấn công thường sử dụng phần mềm quét cổng xem liệu các host (máy trạm) có sử dụng dịch vụ SSH không. Thay đổi cổng SSH lên cao hơn 1024 là một lựa chọn khôn ngoan, vì hầu hết mọi chương trình quét cổng (gồm cả nmap) mặc định đều rà soát được các cổng cao.

Để thay đổi port ssh, các bạn mở file `/etc/ssh/sshd_config` và tìm dòng có ghi:

```
Port 22
```

Thay đổi số cổng thành port bạn muốn và khởi động lại dịch vụ SSH:
```
/etc/init.d/ssh restart
```
Từ giờ các bạn có thể remote đến server với port vừa thiết lập.

**Kết luận**

Như vậy mình đã giới thiệu qua 1 số thủ thuật trong SSH, các cấu hình này không khó mà rất hữu ích cho việc quản lý remote qua SSH, nên các bạn hãy note lại để dùng cho server của mình nhé.
Cảm ơn các bạn đã theo dõi bài viết của mình :))

**Tài liệu tham khảo**

https://blog.tjll.net/ssh-kung-fu/