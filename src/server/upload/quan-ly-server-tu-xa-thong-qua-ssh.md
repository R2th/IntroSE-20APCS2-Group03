# Mở đầu
Như bạn đã biết, Telnet cho phép cấu hình thiết bị từ xa với thao tác đơn giản, dễ dàng sử dụng. Tuy nhiên, nhược điểm của Telnet là dữ liệu được trao đổi giữa client và server được để ở dạng clear text, dẫn đến các thông tin trao đổi qua Telnet rất dễ bị đọc trộm. Nếu bạn nào chưa biết đến Telnet thì có thể tìm hiểu tại [đây](https://tech.vccloud.vn/telnet-la-gi-20181026153058379.htm)

Một giải pháp truy nhập từ xa có tính bảo mật cao thường được dùng để thay thế Telnet là sử dụng giao thức SSH. SSh cung cấp một phương thức truy nhập từ xa để cấu hình thiết bị tương tự như Telnet nhưng thực hiện mã hóa toàn bộ dữ liệu trao đổi giữa SSH client và Server.
![](https://images.viblo.asia/9b53d354-ad1f-447f-b598-ade1545a9f1c.jpg)

# SSH là gì
SSH, hoặc được gọi là Secure Shell, là một giao thức điều khiển từ xa cho phép người dùng kiểm soát và chỉnh sửa server từ xa qua Internet. Dịch vụ được tạo ra nhằm thay thế cho trình Telnet vốn không có mã hóa và sử dụng kỹ thuật cryptographic để đảm bảo tất cả giao tiếp gửi tới và gửi từ server từ xa diễn ra trong tình trạng mã hóa. Nó cung cấp thuật toán để chứng thực người dùng từ xa, chuyển input từ client tới host, và relay kết quả trả về tới khách hàng.

# Tạo người dùng Sudo trên Ubuntu
Các sudo lệnh cung cấp một cơ chế để cấp đặc quyền quản trị viên, thông thường chỉ có sẵn cho người dùng root, cho người dùng bình thường. Hướng dẫn này sẽ cho bạn thấy cách dễ nhất để tạo người dùng mới có quyền truy cập sudo trên Ubuntu, mà không phải sửa đổi máy chủ của bạn sudoers tập tin. Nếu bạn muốn định cấu hình sudo cho người dùng hiện tại, chỉ cần chuyển sang bước 3.
### 1. Đăng nhập vào máy chủ của bạn với tư cách là root người dùng.
```
sudo su
```

### 2. Sử dụng adduser lệnh để thêm người dùng mới vào hệ thống của bạn.
Hãy chắc chắn để thay thế tên người dùng với người dùng mà bạn muốn tạo.
```
adduser username
```

* Đặt và xác nhận mật khẩu của người dùng mới tại dấu nhắc. Bạn nên sử dụng mật khẩu mạnh!

```
Set password prompts:Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
```

* Làm theo lời nhắc để đặt thông tin của người dùng mới. Bạn có thể chấp nhận các giá trị mặc định để trống tất cả thông tin này.

```
User information prompts:Changing the user information for username
Enter the new value, or press ENTER for the default
    Full Name []:
    Room Number []:
    Work Phone []:
    Home Phone []:
    Other []:
Is the information correct? [Y/n]
```

![](https://images.viblo.asia/363ed82e-e30d-4455-b110-ebf3fd0f2d97.png)

### 3. Sử dụng usermod lệnh để thêm người dùng vào sudo nhóm.
```
usermod -aG sudo username
```
Theo mặc định, trên Ubuntu, các thành viên của sudo nhóm có đặc quyền sudo.

### 4. Kiểm tra quyền truy cập sudo trên tài khoản người dùng mới
* Sử dụng su lệnh để chuyển sang tài khoản người dùng mới.

```
su - username
```

### 5. Cài đặt OpenSSh
Đầu tiên các bạn cần cập nhật hệ thống sử dụng apt command hoặc apt-get command:
```
$ sudo apt update
$ sudo apt upgrade
```
Để cài đặt OpenSSH các bạn chạy lệnh: `$ sudo apt install openssh-server`

### 6. Tạo SSH Key ở máy Client bằng OpenSSH
Ở máy client các bạn chạy lệnh `ssh-keygen`
![](https://images.viblo.asia/64b42096-37da-440a-bd8d-45c2a845a0be.jpg)

Sau khi chạy xong sẽ tạo ra 1 private key nằm trong file /home/username/.ssh/id_rsa và 1 public key ở file /home/username/.ssh/id_rsa.pub.
Và chạy lệnh `cat ~/.ssh/id_rsa.pub` để copy public key và sau đó gửi cho client. Nó sẽ có dạng
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCqql6MzstZYh1TmWWv11q5O3pISj2ZFl9HgH1JLknLLx44+tXfJ7mIrKNxOOwxIxvcBF8PXSYvobFYEZjGIVCEAjrUzLiIxbyCoxVyle7Q+bqgZ8SeeM8wzytsY+dVGcBxF6N4JS+zVk5eMcV385gG3Y6ON3EG112n6d+SMXY0OEBIcO6x+PnUSGHrSgpBgX7Ks1r7xqFa7heJLLt2wWwkARptX7udSq05paBhcpB0pHtA1Rfz3K2B+ZVIpSDfki9UVKzT8JUmwW6NNzSgxUfQHGwnW7kj4jp4AT0VZk3ADw497M2G/12N0PPB5CnhHf7ovgy6nL1ikrygTKRFmNZISvAcywB9GVqNAVE+ZHDSCuURNsAInVzgYo9xgJDW8wUw2o8U77+xiFxgI5QSZX3Iq7YLMgeksaO4rBJEa54k8m5wEiEE1nUhLuJ0X/vh2xPff6SQ1BL/zkOhvJCACK6Vb15mDOeCSq54Cr7kvS46itMosi/uS66+PujOO+xt/2FWYepz6ZlN70bRly57Q06J+ZJoc9FfBCbCyYH7U/ASsmY095ywPsBo1XQ9PqhnN1/YOorJ068foQDNVpm146mUpILVxmq41Cj55YKHEazXGsdBIbXWhcrRf4G2fJLRcGUr9q8/lERo9oxRm5JFX6TCmj6kmiFqv+Ow9gI0x8GvaQ== demo@test
```

### 7. Thêm SSH key vào máy chủ
Để sử dụng SSH key thì bạn cần phải thêm khóa công khai (public key) vào máy chủ và dùng khóa riêng tư để xác thực việc kết nối.
1. Đầu tiên bạn cần tạo thư mục .ssh tại thư mục home của user:
```
mkdir ~/.ssh
```

2. Tạo file authorized_keys trong thư mục .ssh vừa tạo ở trên:
```
mkdir ~/.ssh
```
Bây giờ bạn cần copy nội dung của khóa công khai (public key) vào đây và lưu lại.

3. Thiết lập quyền cho thư mục và file ở trên:
```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```
Vậy là bạn đã thiết lập xong ở phía máy chủ.

# Kết nối SSH trên Linux và MacOS
Mở Terminal và sử dụng lệnh sau:
```
$ ssh -p 22 -i ~/.ssh/id_rsa user@ip-cua-ban
```
* ssh: đây là lệnh sử dụng để kết nối SSH
* -p: (port)sử dụng tùy chọn này nếu bạn muốn chỉ định một cổng SSH khác.
            * 22: mặc định thì SSH sử dụng port 22. Nếu bạn đã thay đổi port mặc định thì bạn cần phải chỉ định một cổng rõ ràng.
* -i: gán thêm tùy chọn này nếu như bạn muốn sử dụng SSH key.
            * ~/.ssh/id_rsa: đây là đường dẫn của khóa riêng tư (private key).
* user@ip-cua-ban: đây là user và IP mà bạn muốn kết nối đến. Bạn có thể sử dụng domain

Kết quả tương tự như sau:
```
xuannam@xuan-nam:~$ ssh -p 22 -i ~/.ssh/id_rsa xuannam@127.0.0.1
The authenticity of host '127.0.0.1 (127.0.0.1)' can't be established.
ECDSA key fingerprint is 16:fc:ce:ee:0a:f2:52:1a:26:35:01:3a:ce:12:87:81.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '127.0.0.1' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.19.0-39-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

66 packages can be updated.
0 updates are security updates.

Last login: Sat May 18 22:54:37 2019 from localhost
```

Nếu đây là lần đầu tiên bạn kết nối tới máy chủ SSH này, bạn sẽ nhìn thấy dòng Are you sure you want to continue connecting (yes/no)?. Gõ yes và enter để tiếp tục.

Sử dụng Terminal để kết nối SSH cũng rất tiện lợi, nhưng nếu bạn đang dùng Windows, bạn nên sử dụng PuTTY SSH client.
Bạn có thể tìm hiểu cách kết nối SSH trên window thông qua PuTTY SSH client tại [đây](https://www.ssh.com/ssh/putty/windows/)

Chúc bạn thành công!

**Nguồn tham khảo:** [https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)