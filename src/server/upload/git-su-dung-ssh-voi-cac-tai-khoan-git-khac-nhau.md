Trong quá trình làm dự án đôi lúc chúng ta phải sử dụng các tài khoản Git khác nhau cho từng dự án. Github quy định mỗi ssh key chỉ được gắn cho một tài khoản. Bài viết nhỏ sẽ note lại chi tiết các bước để sử dụng ssh với các tài khoản git khác nhau. 
##### 1. Tạo folder để chứa source code
#####  2. Từ folder này, bật terminal.
##### 3. Khởi tạo ssh-key
```
ssh-keygen -t rsa -b 4096 -C "your_email@gmail.com"
```
Giải thích ngắn gọn chút, ssh-key hiểu đơn giản là một phương thức chứng thực người dùng truy cập bằng cách đối chiếu giữa một key cá nhân (Private Key) và key công khai(Public Key).
Ở bài này nói rõ thêm về [ssh-key](https://thachpham.com/linux-webserver/huong-dan-ssh-key.html)
##### 4. Nhập chính xác đường dẫn chưa file rsa mới được tạo ra trong thư mục .ssh

Tốt nhất tạo thêm file rsa khác, không trùng lặp với file rsa có sẵn chúng ta đã tạo ra từ trước đó

![](https://images.viblo.asia/e5ca6a37-950c-4905-8714-1f8fad59f1fe.png)

Nhập pass cho file rsa mới này, bạn phải nhớ pass để khi pull code sau này, terminal sẽ hỏi đến.
#####  5. Khởi động ssh-agent :
```
eval "$(ssh-agent -s)"
```

#####  6. Thêm cái ssh private key vào ssh-agent và lưu giữ trong keychain:

```
ssh-add -K ~/.ssh/id_rsa_your_project_name
```

##### 7. Thực hiện copy đoạn mã rsa trong file .pub để đẩy lên phần seting SSH ở tài khoản Git của bạn.

```
pbcopy < ~/.ssh/id_rsa_your_project_name.pub 
```

#####  8. Mở tài khoản Git của bạn, vào phần Setting/SSH and GPG key, sau đó tạo SSH key mới vào paste cái đoạn mã ở phần 7 vào.

![](https://images.viblo.asia/0a2f0901-c0a0-48d9-b5d7-02cc5bd9f4ae.png)

#####  9. Tiếp theo, sửa file config ở thư mục .ssh

Ví dụ:

```
Host github.com-acount_git_name
      HostName github.com
      User git
      IdentityFile "~/.ssh/id_rsa_your_project_name"
```

Trong trường hợp bạn thêm account git nữa thì làm tuần tự các bước như trên, cuối cùng làm thêm thông tin y hệt bước 9:

```
Host github.com-acount_git_name
      HostName github.com
      User git
      IdentityFile "~/.ssh/id_rsa_your_project_name"

Host github.com-acount_git_name_other
      HostName github.com
      User git
      IdentityFile "~/.ssh/id_rsa_your_project_name_other"
```

#####  10. Thực hiện clone source code thông qua SSH URLs

```
git clone git@github.com:zmeyc/UITestUtils.git
```

#####  11. Sau khi lấy source về, thay đổi  nội dung trong file .config trong thư mục git
Chú ý nhớ thêm account git name vào
Ví dụ:
```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
    url = git@github.com-acount_git_name:zmeyc/UITestUtils.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "develop"]
	remote = origin
	merge = refs/heads/develop
[user]
	name = acount_git_name
	email = "your_email@gmail.com"
```

OK, tương tự cho các account git khác.