# Mở đầu
"Một người quản trị server Linux (Linux administrator) cần những kĩ năng gì?", câu hỏi này quá rộng để có thể trả lời hết trong một bài viết. Nhưng trong hàng đống skills đó, chắc chắn không thể thiếu: user, group management.

Ngày đầu tiên đi làm sau kì nghỉ lễ 2/9, ngớ người vì không nhớ rõ một vài câu lệnh thao tác với user đơn giản, tự cảm thấy bản thân chưa xứng đáng với cái danh hiệu Administrator xịn sò này, mình đã nghiên cứu và tóm lược lại đôi chút kiến thức cần thiết để quản trị user, group trên Linux, theo cái cách đơn giản mà những người ngáo như mình cũng có thể dễ dàng tiếp nhận.

Làm chủ được mớ kiến thức này sẽ giúp bạn tự tin, luôn sẵn sàng cho những công việc quản trị server hàng ngày. So, let's go!
# Quản trị user
Bạn cần biết gì để có thể quản trị user trên Linux?
### Hiểu về file /etc/passwd
Linux OS lưu trữ thông tin người dùng trên file /etc/passwd, với các trường được phân tách nhau bởi dấu ":", theo định dạng
```
username:password:UID:GID:comment:home:shell
```
Ví dụ:
```
dgarn:x:1001:1001:Damon Garn:/home/dgarn:/bin/bash
```
Trường nào không có giá trị sẽ được để trống, ví dụ
```
# ở đây, trường comment empty
dgarn:x:1001:1001::/home/dgarn:/bin/bash
```
### File /etc/shadow

Bạn có thắc mắc tại sao password ở trên lại là **x**?

Ngày trước, password sau khi băm (hash) sẽ được lưu vào file **/etc/passwd** được đề cập phía trên. File này public, bà con làng xóm ai cũng xem được nên không tránh khỏi việc có người rảnh rỗi vác đống hash này đi crack trên mấy web crack password online. Do đó, các Linux Contributors đã quyết định lưu hashed password vào một file mà chỉ root user mới có quyền truy cập: **/etc/shadow.** Password trong file **/etc/passwd** được thay thế bằng kí tự "x".

Định dạng của các bản ghi trong file /etc/shadow
```
username:password:last password change:min:max:warning:inactive:expired
```

với **change:min:max:'warning':inactive:expired** là các thông tin liên quan đến việc thay đổi password
 
### Thêm, xóa, sửa user

**Thêm user**

Đây là task đơn giản nhất có thể có của người quản trị hệ thống. Cú pháp để tạo mới user
```
$ sudo useradd [options] <username>
```
Trong đó, các options có thể là:
* --create-home(-m): chỉ định home directory, mặc định là /home/<username>
* --shell(-s): chỉ định shell, mặc định là /bin/bash , ví dụ /bin/sh, hoặc nếu không cho user quyền sử dụng shell thì để giá trị /sbin/nologin
* --uid(-u): chỉ định user id
* --comment: phần này là ghi chú để gợi nhớ user, thường người ta hay để họ tên đầy đủ
    
Nếu bạn muốn thay đổi giá trị mặc định của các option, có thể cập nhật file /etc/defaults/useradd 
    
Để cập nhật password cho user
```
$ passwd <username>
```
**Cập nhật user**

Cú pháp để cập nhật user
```
$ sudo usermod [options] <username>
```
    
Trong đó, các option có thể là:
* --comment (-c): chỉnh sửa trường comment
* --home (-d): chỉnh sửa home directory
* --expiredate (-d): thay đổi thời gian hết hạn
* --login (-l): chỉnh sửa tên đăng nhập
* --lock (-L): khóa user
* --unlock (-U): bỏ khóa
    
Trong phần cập nhật user, có một mục nhỏ khá quan trọng đó là thêm user vào group.
    
Để thêm user vào group mới, đồng thời out hết các group khác, sử dụng cú pháp
```
$ sudo usermod -G <group-name> <user-name>
```
Thêm user vào group mới, vẫn là thành viên của group cũ
```
$ sudo usermod -aG <group-name> <user-name>
```
    
**Xóa user**
```
$ sudo userdel [options] <username>
```
Trong đó, các options bao gồm:
* --force (-f): xóa user (và home directory) kể cả có người đang đăng nhập
* --remove (-r): xóa user (và home directory) nhưng user phải log out ra từ trước
    
### Password policies - các yêu cầu đối với mật khẩu
Hai cách thiết lập password policies phổ biến nhất là cấu hình file /etc/login.defs và sử dụng [PAM](https://en.wikipedia.org/wiki/Linux_PAM) (Pluggable Authentication Module)
    
Với file /etc/login.defs, ta cập nhật giá trị cho các biến định nghĩa sẵn để thiết lập cấu hình cho mật khẩu, ví dụ:
* PASS_MAX_DAYS	số ngày tối đa mật khẩu có thể sử dụng, sau đấy là phải đổi.
* PASS_MIN_DAYS	số ngày tối thiểu trước khi đổi sang mật khẩu mới.
* PASS_MIN_LEN	độ dài nhỏ nhất của mật khẩu.
* PASS_WARN_AGE	số ngày cảnh báo trước khi mật khẩu hết hạn.

# Quản trị group
### Hiểu về file /etc/group
Linux lưu trữ thông tin group trên file /etc/group với định dạng:
```
groupname:password:GID:group members
```
Ví dụ:
```
editors:x:2002:damon,tyler
```
### Thêm, xóa, sửa group
**Thêm mới group**
```
$ sudo groupadd [options] <group-name>
```

Trong đó option phổ biến nhất là:
* 	--gid: group id

**Cập nhật group**
```
$ sudo groupmod [options] <group-name>
```
Trong đó, các option có thể là:

* 	--gid (-g): cập nhật group id
* 	--new-name (-n): cập nhật group name
    
**Xóa group**
```
$ sudo groupdel <group-name>
```
# Lời kết
Trong bài viết này, mình đã chia sẻ quick note mà mình sử dụng để quản trị user, group trên Linux OS, hy vọng nó sẽ có ích!
    
Cảm ơn mọi người đã dành thời gian theo dõi.

# Nguồn tham khảo
https://www.redhat.com/sysadmin/linux-user-group-management