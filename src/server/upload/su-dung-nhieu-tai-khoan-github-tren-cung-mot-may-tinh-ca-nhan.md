## Sử dụng nhiều tài khoản github trên cùng một máy tính cá nhân. 

### Step 1: Tạo ssh key mới cho tài khoản công việc
>ssh-keygen -t rsa -C "github-email-address"

Khi màn hình hiện `Enter file in which to save the key (/home/<user>/.ssh/id_rsa):`  Nhập user cho công việc của bạn, ví dụ mình sẽ nhập là `id_rsa_sun`

Kiểm tra xem id_rsa_sun đã được sinh ra chưa. 
>cd cd ~/.ssh 

>ls
>
Danh sách các file đã được sinh ra:

```
id_rsa_sun  id_rsa_sun.pub  id_rsa  id_rsa.pub
```

### Step 2: Cài đặt ssh key trên github

Lấy id_rsa của email mới bạn vừa tạo.

>cat id_rsa_sun.pub 

Sau đó nhập vào ssh-key cuả tài khoản git công việc tại https://github.com/settings/keys

### Bước 3: Cài đặt Github Host

>touch ~/.ssh/config

>nano ~/.ssh/config

Sửa file config của bạn thành dạng:

```
# Tài khoản git cá nhân vẫn dùng của bạn
Host github.com-username
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
# Tài khoản công việc
Host github.com-sun # config này sẽ dùng để xử lý xác định khi cấu hình remote
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_sun  # id_rsa_sun mà chúng ta vừa tạo
```

Sau đó chạy lệnh sau để áp dụng config mới:
```
ssh-keygen -R github.com
```

Sau khi tạo 1 project trên github với tài khoản khác. Khi bạn `add remote` nên chú ý user khi add.
Ví dụ khi clone repo mới:

>git clone git@github.com-sun:<**user**>/sample_ruby.git
 
> git config user.email "<**emai dùng để sinh id_rsa_sun ở trên**>"

Sau đó bạn có thể add và commit bình thường.

Add remote với repo mới:
>  git remote add origin git@github.com-sun:<**user**>/sample_ruby.git

Note: `sun` ở đây là user của mình đặt ra, các bạn có thể thay đổi theo user công việc hoặc nick name bạn muốn cho phù hợp.

### Nguồn: [Git Push & Pull with Two different accounts and Two different users on the same machine](https://medium.com/@therajanmaurya/git-push-pull-with-two-different-account-and-two-different-user-on-same-machine-a85f9ee7ec61)