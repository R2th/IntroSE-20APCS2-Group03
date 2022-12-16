Ở phần trước, chúng ta đã có sự tiếp cận cơ bản về GIT. Phần này mình sẽ chia sẻ về những kinh nghiệm của mình trong quá trình làm việc với GIT.
Ở bài trước chúng ta tiếp cận đến cách **push** 1 nhánh lên môi trường **remote repository**

Thực hiện push lên remote repository: Chức năng login
```
$ git push origin login
```
```
$ git push origin login -f
``` 
nếu đã tồn tại nhánh login trước đó ở remote.

### Remote

Chạy lệnh:

```
$ git pull origin master
```
Lệnh này khi được thực thi sẽ pull code từ nhánh master của remote origin (remote tên mặc định) ở remote repo về nhánh mà mình đang đứng. Hiểu nôm na là pull = fetch + merger.

Chúng ta có thể thêm remote với tên là framgia bằng lệnh:

```
$ git remote add framgia https://github.com/loxtx-0896/remote-repository.git
```

Kiểm tra remote hiện tại của dự án đang làm việc:
```
$ git remote -v
```
Kết quả: 
![](https://images.viblo.asia/aa2755f1-132c-4a63-b8b6-4272a691024f.png)
Chúng ta có thể thấy có 2 remote là framgia và origin.

### Branch
Chúng ta có thể tạo nhánh đơn thuần, giả sử nhánh mới có tên CRUD_users:
```
$ git branch CRUD_users
```
hoặc
```
$ git checkout -b CRUD_users
```
sẽ checkout đế nhánh vừa tạo. Như vậy branch vừa tạo sẽ chứa hoàn toàn code của nhánh lúc ta đứng thực thi 1 trong 2 lệnh trên.
Giả sử trong trường hợp chúng ta muốn tạo nhánh mới chưa code của 1 commit bất kì, chúng ta phải làm như sau:
Chúng ta dùng lệnh `$ git reflog `để kiểm tra mã commit, giả sử commit chúng ta muốn có mã là 45t6er4:
```
$ git checkout -b CRUD_users 45t6er4
```
Nhánh mới có tên CRUD_users sẽ chứa tất cả code của commit tại mã 45t6er4.

**Xóa nhánh CRUD_users** 

Ta dùng lệnh
```
git branch -d CRUD_users
```
hoặc
```
git branch -D CRUD_users
```
Sự khác biệt giữa -d thường và -D hoa là, khi ta dùng -d thường sẽ xóa nếu nhánh chúng ta muốn xóa đã được merger thì nó sẽ thực thi, còn -D hoa thì nhánh được chỉ định xóa sẽ xóa ngay lập tức thay vì kiếm tra xem nhánh đó có cần thiết nữa hay không. Chúng ta nên thận trọng khi dùng -D hoa.

Giả sử tỏng trường hợp chúng ta vô tình xóa nhầm 1 nhánh nào đó, chúng ta sẽ phải kiếm tra reflog để lấy mã commit mà chúng ta bị xóa nhầm rồi khôi phục bằng cách checkout đến nhánh qua mã commit lệnh:
```
$ git checkout -b CRUD_users 45t6er4
```
Như khôi phục nhánh, chúng ta có thể reset toàn bộ hoăc 1 phần dựa vào mã commit trong reflog. Dùng lệnh:
```
$ git reset 3382h7u
```
sẽ khôi phục về trạng thái commit có mã là 3382h7u.
### Commit
Khi chúng ta có 2 hoặc nhiều commit trong 1 nhánh, chúng ta sẽ thực hiện gộp commit.

Dùng rebase -i
```
$ git rebase -i HEAD~~
```
Terminal trả:
```
GNU nano 2.9.3
pick 98e4vd4 init_project
pick 00ki354 static_pages

# Rebase 7b6fch9..0l0d80p onto 12gh45a
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#
```
Chúng ta thực hiệnthay thế `pick 00ki354 static_pages` thành `s 00ki354 static_pages` và tiếp tục. Kiểm tra lại lịch sử `git log --oneline` sẽ thấy được commit static_pages được giữ lại, và có luôn code của commit trước đó.
### CONFLICT khi rebase code
Thông thường khi làm xong 1 task, giả sử tớ làm xong task login_logout với tên nhánh login_logout, sau khi hoàn thành tớ sẽ thực hiện rebase code từ nhánh này với master, trong quá trình này sẽ không thể tránh khỏi CONFLICT(khi có sự khác biệt giữa 1 file trong nhánh login_logout và nhánh master). Thực hiện rebase code, khi đang đứng ở nhánh login_logout:
```
$ git rebase master
```
tất nhiên ở đây master đã được pull code mới nhất về rồi, tức là master là phiên bản mới nhất để hợp nhất code với nhánh login_logout.
![](https://images.viblo.asia/3cb049e9-c5d3-4acf-9bce-44555eb960fc.png)
Giả sử có thay đổi code như hình, 
Accept Curent Change: Chấp thuận code hiện tại của nhánh.

Accept Incoming Change: Lấy code mới, là thêm vào thay vì thay đổi.

Accept Both Change: Lấy cả 2 code của cả 2 nhánh.

Cứ thực hiện cho đến khi hết CONFLICT, trong quá trình làm chúng ta có thể CTRL + Z nếu thực hiện sai để thực hiện lại :D, sau đó dùng lệnh `$ git add .` và thực hiện `$ git rebase --continue` để hoàn thành quá trình rebase, trường hợp chưa xử lí hết CONFLICT thì git sẽ thông báo. Sau khi rebase mà chúng ta thấy có lỗi sai, thực hiện `$ git rebase --abort` để trở lại trạng thái khi chưa rebase.
### Lời kết
Trên đây mình chia sẻ những gì mình đã học được trong quá trình làm việc với GIT. Có lẽ trong tương lai mình sẽ bổ sung thêm 1 vài thứ hay ho nữa trong quá trình mình làm việc, phải có sai rồi mới thấm đúng không nào :D. Cám ơn bạn đã đọc bài chia sẻ của mình.