Trong suốt quá trình làm việc chắc chắn nhiều bạn sẽ có nhu cầu chuyển đổi giữa nhiều tài khoản github khác nhau hay đơn giản là hai tài khoản một tài khoản cá nhân và một tài khoản dành cho công việc. Mình cũng vừa mới gặp tình trạng đó và khi google search thì có rất nhiều những bài hướng dẫn khác nhau làm hoang mang không biết làm theo cái nào. Cuối cùng cũng kiếm được một bài viết và thực hiện thành công. Nên mình xin chia sẻ lại cho ai có nhu cầu.

Bây giờ thử bắt tay vào thực hiện.
# Tạo SSH keys
Việc đầu tiên là tạo SSH keys để kết nối với hai tài khoản github đó. Thực ra khi sử dụng một tài khoản git thì bạn cũng nên sử dụng SSH key sẽ tiện hơn rất nhiều.

Mình tạm gọi một tài khoản đăng ký với email `your_personal_email@domain.com` dùng để sử dụng trong cá nhân và một tài khoản còn lại sử dụng email `your_work_email@domain.com` dùng trong công việc.

Truy cập vào thư mục .ssh với câu lệnh:
> cd ~/.ssh
> 
Tạo SSH key cho tài khoản cá nhân `your_personal_email@domain.com`và lưu với tên là `id_rsa_personal`
> ssh-keygen -t rsa -b 4096 -C "your_personal_email@domain.com"
> 
Tạo SSH key cho tài khoản git dùng trong công việc `your_work_email@domain.com`, lưu với tên là `id_rsa_work`
> ssh-keygen -t rsa -b 4096 -C "your_work_email@domain.com"
> 
Sau khi chạy xong những câu lệnh trên sẽ tạo ra bốn file trong thư mục .ssh
```
id_rsa_personal
id_rsa_personal.pub
id_rsa_work
id_rsa_work.pub
```
*Lưu ý: Những tệp có đuổi .pub là các tệp public dùng để thêm vào tài khoản github của bạn*

Trên đây mình chỉ nói những bước chính, để tìm hiểu rõ hơn bạn truy cập vào link này https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent để xem chi tiết các bước nhé.

# Thêm SSH key vào trong tài khoản GitHub
Ví dụ với tài khoản git cá nhân và làm tương tự với tài khoản còn lại.

Sử dụng câu lệnh để copy file key public
> clip < ~/.ssh/id_rsa_personal.pub
> 
Truy cập GitHub đăng nhập và làm theo các bước bên dưới:
* Vào trang `Settings`
* Chọn `SSH and GPG keys` ở thanh menu bên trái. 
* Nhấn vào nút `New SSH key` 
* Thêm title cho key và paste nội dung vừa copy vào ô keys.
* Hoàn thiện bằng cách nhấn `New SSH key` và xác nhận mật khẩu của mình

Chi tiết xem tại: https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account
# Tạo file config để quản lý các keys
Tiếp tục quay lại thư mục .ssh sử dụng câu lệnh command để tạo một file config
> touch config
> 
Sử dụng một trình edit nào đó ̣̣̣̣(vim, nano, gedit, ...) để chỉnh sửa file đó với nội dung sau:
```
# Personal account - default config
Host github.com-personal
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal
# Work account
Host github.com-work
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work
```
Để giúp cho việc quản lý tài khoản git trở nên dễ dàng hơn chúng ta sẽ đi sử dụng hai tệp config khác nhau cho từng tài khoản. Tệp đầu tiên cấu hình cho tài khoản git cá nhân (sử dụng file global config).

Tiếp tục sử dụng một trình edit nào đó để chỉnh sửa lại file .gitconfig nằm trong thư mục gốc, Ví dụ sử dụng với nano
> cd ~
> 

> nano ~/.gitconfig
> 
```~/.gitconfig
[user]
    name = git personal
    email = your_personal_email@domain.com
[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig

```

Lưu lại sử dụng `ctr+o` và thoát khỏi trình edit `ctrl+x`

Tiếp theo, tạo file config riêng để cấu hình cho git dùng trong công việc
> nano ~/work/.gitconfig
> 
Chỉnh sửa với nội dung:
```~/work/.gitconfig
[user]
    email = your_work_email@domain.com
```
*Cấu hình trên sử dụng [coditional includes](https://git-scm.com/docs/git-config#_conditional_includes) trong git 2.13 để x ử lý nhiều cấu hình khác nhau. Trong trường hợp cấu hình work hoạt động chính xác, giả sử có một thư mục work chứa tất cả các project trong công việc. Nếu không phải bạn có thể thoải mái thay đổi cấu hình này tương tự với cách làm trên*

# Lưu key identities ở local
Sử dụng câu lệnh dưới đây để xóa tất cả các key identities đã có trước đó.
> cd ~
> 

> ssh-add -D
> 

Thêm những identities key tạo ở các bước trên
> ssh-add id_rsa_personal
> 

> ssh-add id_rsa_work
> 
Kiểm tra nếu chúng ta đã thực hiện lưu các key thành công hay chưa bằng câu lệnh
> ssh-add -l
> 
Tiến hành xác thực các key với GitHub sử dụng câu lệnh dưới đây
> ssh -T github.com-personal
> 

> ssh -T github.com-work
> 
Expect là nội dung như sau: 
```
# Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```
# Thử nghiệm
Vậy là các bước config đã thực hiên xong bây giờ mình thử xem đã thực hiện được chưa nhé.
Tạo thử một repository với tên `test-ssh`. Thực hiện các bước dưới để clone repo, tạo commit đầu tiên và push chúng lên GitHub
```
$ git clone git@github.com-personal:USERNAME/test-ssh.git 
$ cd test-ssh
$ touch index.html
$ echo "Hello World" >> index.html
$ git add .
$ git commit -m 'Add index file'
$ git push origin master
```
Trong trường hợp này bạn đã clone một project dùng git cá nhân, bằng cách tương tự bạn có thể làm với tài khoản git dành cho công việc. Nhưng lưu ý rằng tất cả các project dùng trong công việc phải đặt trong thư mục `work` để git config work có thể hoạt động chính xác.

Chúc bạn thực hiện thành công!
# Tài liệu tham khảo
> https://medium.com/the-andela-way/a-practical-guide-to-managing-multiple-github-accounts-8e7970c8fd46