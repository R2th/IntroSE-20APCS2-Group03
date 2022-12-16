## Giới thiệu về SSH key
Một lập trình viên sử dụng github gitlab với mỗi lần thao tác với repository như clone code, pull, push thì sẽ phải nhập tài khoản và mật khẩu để github xác thực, việc này lặp đi lặp lại rất mất thời gian, thật may là có giao thức SSH giúp chúng ta mỗi lần thao tác với kho lưu trữ chẳng cần cung cấp tên người dùng và mật khẩu nữa mà vẫn đảm bảo an toàn.

#### 1 SSH key là gì
SSH là một giao thức mạng dùng để thiết lập kết nối mạng được mã hoá đủ mạnh nhằm ngăn chặn các hiện tượng nghe trộm, đánh cắp thông tin trên đường truyền để tạo một kênh kết nối riêng tư giữa các máy khách máy chủ một cách bảo mật

#### 2 Cơ chế làm việc của SSH key
SSH làm việc thông qua 3 bước đơn giản:

* Định danh host – xác định định danh của hệ thống tham gia phiên làm việc SSH.
* Mã hoá – thiết lập kênh làm việc mã hoá.
* Chứng thực – xác thực người sử dụng có quyền đăng nhập hệ thống.

#### 3 Các kĩ thuật mã hóa SSH
SSH sử dụng 3 kĩ thuật mã hóa là: 

* SSH Symmetrical Encryption
* SSH Asymmetrical Encrytion
* SSH Hashing

#### 4 Tạo khóa ssh với Email tài khoản GitHub
1. Mở Git Bash
2. Tạo một key pair trên máy client
```
ssh-keygen -t rsa
```
3. Lưu trữ key và passphrase
```
Output
Generating public/private rsa key pair.
Enter file in which to save the key (/home/demo/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/demo/.ssh/id_rsa.
Your public key has been saved in /home/demo/.ssh/id_rsa.pub.
The key fingerprint is:
4a:dd:0a:c6:35:4e:3f:ed:27:38:8c:74:44:4d:93:67 @a
The key's randomart image is:
+--[ RSA 2048]----+
|          .oo.   |
|         .  o.E  |
|        + .  o   |
|     . = = .     |
|      = S = .    |
|     o + = +     |
|      . o + o .  |
|           . o   |
|                 |
+-----------------+
```
4. Sao chép public key
```
ssh-copy-id demo@198.51.100.0
```
5. Gán public key vào GitHub trên remote