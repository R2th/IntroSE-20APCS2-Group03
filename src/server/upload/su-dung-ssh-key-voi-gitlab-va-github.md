Bài viết này mình sẽ hướng dẫn các bạn tạo ssh key cho Gitlab và Github

SSH là gì?
Secure Socket Shell là một giao thức mạng dùng để thiết lập kết nối mạng một cách bảo mật, mục đích sử dụng ssh key:
* Bảo mật kết nối của client đến hệ thống gitlab/github
* Không phải nhập mật khẩu github hoặc gitlab mỗi lần pull hoặc push code

Cơ chế làm việc:
* Bạn sẽ có 2 key: public key và private key, bạn sẽ cung cấp public key của mình cho git server
* Xong ssh-agent sẽ làm tất cả những việc còn lại cho bạn. Mỗi lần bạn pull, push ssh-agent sẽ tự gửi kèm các thông tin chứng thực đi.

Sinh SSH Key
Bước 1: Kiểm tra xem máy bạn có ssh key nào chưa
Mở terminal và chạy lệnh
Windows/Linux
```
 ls -al ~/.ssh
```

Lệnh trên sẽ kiểm tra trong thư mục .ssh có ssh key nào chưa
```
id_ed25519
id_ed25519.pub
id_rsa
id_rsa.pub
```

Public key sẽ có đuôi .pud (id_rsa.pub), private key thì không có đuôi (id_rsa), nếu đã có cặp ssh key bạn có thể bỏ qua bước 2 chuyển sang bước 3.

Bước 2: Sinh ra một SSH Key mới
Chạy lệnh sau trên terminal:
```
ssh-keygen -t rsa -b 4096 -C "email_cua_ban@example.com" 
```

Để ngắn gọn hơn bạn có thể sử dụng lệnh này:
```
ssh-keygen -t rsa

Enter file in which to save the key (/root/.ssh/id_rsa): [Press enter]
Bash
Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter same passphrase again: [Type passphrase again]
Your identification has been saved in /root/.ssh/id_rsa.
# Your public key has been saved in /root/.ssh/id_rsa.pub.
```

Bước 3: Thêm key của bạn vào ssh-agent
Đảm bảo rằng ssh-agent đã được kích hoạt bằng lệnh:
```
$ eval "$(ssh-agent -s)"
Agent pid 1023
```

Add ssh key của bạn vào ssh-agent
```
$ ssh-add.exe /c/Users/Admin/.ssh/id_rsa
Identity added: /c/Users/Admin/.ssh/id_rsa (anhln12)
```

Bước 4: Thêm ssh public key vào tài khoản trên server của bạn (gitlab, github ....)
* Đối với Gitlab
Truy cập vào địa chỉ: https://gitlab.com/-/profile/keys
Chọn SSH Keys, phần Title chỉ là đặt tên thôi nên bạn muốn để tên gì cũng được, phần key nhập nội dung file id_rsa.pub

![image.png](https://images.viblo.asia/f7fb1822-88b9-4d26-bf58-3e412e9c920b.png)

Sau đó click nut Add Key là xong

Đối với Github
Truy cập vào địa chỉ: https://github.com/settings/profile
Và làm tương tự

Bước 5: Kiểm tra kết nối
```
$ ssh -T git@gitlab.com
Welcome to GitLab, @anhle0412!
```

Ok đến đây bạn đã có thể sử dụng link ssh rồi.