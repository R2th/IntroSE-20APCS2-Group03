Trong một số trường hợp bạn cần quản lý nhiều Github khác nhau trên cùng 1 thiết bị. Như là làm trên repo của khách hàng, khách hàng yêu cầu bạn sử dụng tài khoản Github của họ. Hoặc đơn giản hơn là bạn sẽ chia tài khoản Github sử dụng cho mục đích cá nhân, tài khoản thì sử dụng cho công ty v.v.. Sau đây mình sẽ hướng dẫn các bạn cách cài đặt và quản lý nhiều tài khoản Github với SSH key.

# 1. Tạo SSH keys
- Trước khi tạo SSH key, chúng ta có thể kiểm tra xem trên thiết bị đang tồn tại những SSH key nào với command: 
- `ls -al ~/.ssh`. Với command này sẽ hiển thị danh sách các public và private key đang tồn tại.
- Nếu` ~/.ssh/id_rsa` đã tồn tại, chúng ta có thể tái sử dụng nó còn không thì tạo mới một `~/.ssh/id_rsa` với đoạn mã sau sau:
`ssh-keygen -t rsa`

> - Khi command line hỏi bạn vị trí để lưu trữ keys, ấn Enter để chấp nhận lưu tại vị trí mặc định trong folder `~/.ssh`. Một cặp private key và public key `~/.ssh/id_rsa.pub` sẽ được tạo tại ví trí thư mục mặc định là `~/.ssh/`.

- Chúng ta hãy để cặp key trên để sử dụng dành cho tài khoản cá nhân.

- Đối với tài khoản làm việc khác, chúng ta sẽ tạo SSH keys khác. Đoạn mã dưới đây sẽ tạo SSH keys, và lưu public key với tag "email@work_mail.com" tới vị trí `~/.ssh/id_rsa_work_user1.pub`

- `ssh-keygen -t rsa -C "email@work_mail.com" -f "id_rsa_work_user1"`

Vậy chúng ta đã có 2 key khác nhau được tạo là:
```
~/.ssh/id_rsa
~/.ssh/id_rsa_work_user1
```


# 2. Thêm SSH key với từng tài khoản Github
- Đối với tài khoản cá nhân, chúng ta copy key sử dụng đoạn mã dưới đây:
 ```
MacOS: pbcopy < ~/.ssh/id_rsa.pub
 Linux: xclip -sel clip < ~/.ssh/id_rsa.pub 
 (Nếu chưa cài xclip thì chạy đoạn mã này để cài xclip: sudo apt-get install xclip)
```

- Chúng ta vào trang **Github.com** và tiến hành đăng nhập.
- Đi tới Setting
- Chọn **SSH** and **GPG keys** tại menu bên trái.
- Nhấn chọn **New SSH key**, nhập tittle và paste key chúng ta đã copy ở phía trên vào.
- CHọn **Add key.**

Vậy là bạn đã hoàn thành việc theme SSH key vào tài khoản cá nhân. Đối với tài khoản công việc cũng vậy, bạn copy key `~/.ssh/id_rsa_work_user1.pub` và làm lại các bước như trên.

# 3. Đăng ký mới SSH key với ssh-agent
- Để sử dụng được SSH key, chúng ta cần phải đăng ký với ssh-agent trên thiết bị chúng ta đang sử dụng. Để chắc chắn rằng ssh-agent được chạy chúng ta sẽ chạy đoạn mã eval "$(ssh-agent -s). Thêm mới key với ssh-agent như sau: 

ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa_work_user1

# 4. Tạo SSH config file
- Để phân biệt SSH key với các host khác nhau. chúng ta phải tạo file config để xác định SSH key nào dùng cho tài khoản, host nào.
- SSH config tồn tại tại vị trí ~/.ssh/config. Edit file này hoặc chúng ta có thể tạo mới với đoạn mã dưới:

```
$ cd ~/.ssh/
$ touch config           
$ code config   
```

- Chỉnh sửa file **config** như sau
```
#### Tài khoản cá nhân, config mặc định
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa

#### Tài khoản công việc
Host github.com-work_user1    
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_work_user1
```

• Host: tương tự như ID để định danh các key.

• HostName: Domain để truy cập đến, mình dùng Github nên sẽ để địa chỉ domain của Github.

• IdentityFile: Định nghĩa các thuộc tính trên dành cho SSH key nào.

- Vậy config trên sẽ chỉ định ssh-agent để chọn SSH key nào cho tài khoản nào
- Sử dụng id_rsa cho mọi Git có url dạng @github.com
- Sử dụng id_rsa_work_user1 cho mọi Git có url dạng @github.com-work-user

# 5. Setting git remote Url cho local repositories
- Khi bạn đã có sẵn repositories được clone hoặc tạo sẵn trước đó. Bạn cần phải config lại user name và email Url sử dụng đoạn mã sau:

```
git config user.name "User 1"   // Updates git config user name
git config user.email "user1@workMail.com"
```

- Thay đổi remote url tương ứng với config bạn đã định nghĩa ở trên, giả sử tại repository bạn clone từ tài khoản công việc về đang có remote origin với url là `git@github.com/repo_work.git` thì bạn cần chuyển thành 
`git@github.com-work-user1/repo_work.git` sử dụng mã sau:

`git remote set-url origin git@github.com-work-user1/repo_work.git`

- Tương tự như các repositories khác bạn cũng làm như vậy.

# 6. Clone Repositories
- Khi bạn clone repositories, bạn lưu ý là cần thay đổi Url clone về tương ứng với Host config trong SSH config của bạn.
VD như bạn cần clone repositories công việc với url như sau:

```
git clone git@github.com/repo_name.git

Bạn sẽ thay đổi thành 

git clone git@github.com-work_user1:work_user1/repo_name.git
```

# 7. Tổng kết
- Qua bài viết trên mình đã hướng dẫn cho các bạn cách quản lý nhiều tài khoản Github với SSH key khá là đơn giản.
- Chúc các bạn làm việc hiệu quả. Happy Reading
- Bài viết được dịch từ [Medium](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)