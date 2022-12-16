Hôm nay, mình sẽ giới thiệu cho mọi người về Tài khoản người sử dụng (NSD) và phân quyền truy cập trên Ubuntu. Bài viết này được chia thành hai phần: phần một nói về tài khoản người sử dụng và phần hai nói về quyền truy cập trên Ubuntu.

Tại bài viết phần 1 này mình xin phép giới thiệu về khái niệm người sử dụng và quản lý tài khoản người sử dụng trên Ubuntu.

# Người sử dụng và nhóm Người sử dụng.
Ubuntu là hệ điều hành đa người dùng, cũng có nghĩa là nhiều người có thể sử dụng cùng một máy tính cài đặt hệ điều hành Ubuntu. Vì vậy, phục vụ mục đích dễ dàng quản lý, trong Ubuntu có hai khái niệm là User và Group. User dùng để định danh cho một người dùng trong hệ thống. Và Group là tên định danh cho một nhóm người dùng có cùng một đặc điểm nào đó.
Một group có thể có nhiều user và một user có thể là thành viên trong nhiều group. 
## Người sử dụng
* Có hai loại người dùng là: *super user* và *regular user*.
* Mỗi người sử dụng có một định danh riêng được biểu diễn bằng UID (User Identification). Nếu con người sử dụng Username để phân biệt các người sử dụng với nhau thì hệ thống sẽ sử dụng UID để phân biệt các người sử dụng.
* File chứa thông tin của tất cả các tài khoản người dùng chính là file `/etc/passwd`. File này lưu trữ tất cả các thông tin về user bao gồm các trường: Username:password:UID:GID:Info:Home:Shell trên cùng một dòng.
* Có 3 tài khoản người dùng đặc biệt : root, nobody và bin. 
**Tài khoản root**: là tài khoản quản trị, có toàn quyền truy cập vào hệ thống. Đây chính là tài khoản super user mà được nhắc tới ở trên. Chính vì tài khoản root này có toàn quyền truy cập trên hệ thống nên phải rất cẩn thận vì mọi thao sẽ ảnh hưởng trực tiếp đến hệ thống.
* Mỗi người dùng sẽ được cấp một thư mục riêng (home directory). Thư mục này được lưu theo cấu trúc là một thư mục con của /home. Có dạng `/home/username`. Riêng đối với tài khoản root thì home directory là /root.
* Trong Ubuntu, mật khẩu của người dùng không được đặt trong file `/etc/passwd` mà được đặt trong file `/etc/shadow`. Chỉ có người quản trị mới có thể xem được file `/etc/shadow` này.

## Nhóm người sử dụng
Ubuntu sử dụng nhóm để quản lý người dùng. Mỗi người dùng có thể được tham gia nhiều nhóm và mỗi nhóm cũng chứa nhiều người dùng. Khi tài khoản của một người sử dụng được tạo ra thì một GID (Group Identification) mặc định tương ứng với người dùng đó được tạo ra. Những người trong nhóm được chia sẻ những quyền nhất định, giống nhau. Tệp `/etc/group` chứa và kiểm soát danh sách các thành viên trong nhóm.

# Thao tác quản lý Người sử dụng và nhóm Người sử dụng.
## Thêm và xóa một người sử dụng bằng dòng lệnh
* Để thêm một người sử dụng mới, chúng ta sử dụng lệnh useradd

Cú pháp: `adduser <tên người dùng>`

Sau đó, ta sẽ nhập thêm các thông tin cần thiết như password, và một số thông tin khác. 
* Để xóa một người sử dụng, ta sử dụng lệnh userdel

Cú pháp: `userdel <tên người dùng>`

* Nếu muốn xóa cả thư mục người dùng trong /home thì có thể dùng lệnh: 
 
 `userdel -r <tên người dùng>` 

## Thêm và xóa một nhóm Người sử dụng bằng dòng lệnh
Thông thường, sau khi ta tạo một user mới thì sẽ có một nhóm mới tương ứng được tạo ra. Tuy nhiên, nếu cần thêm một nhóm khác thì ta sử dụng lệnh groupadd

Cú pháp: `groupadd <tên nhóm>`

* Để tạo mới một user mới đồng thời thêm nó vào group mới thì chúng ta sử dụng lệnh useradd

Cú pháp: `useradd -a -G <tên nhóm> <tên người dùng>`

* Để thêm một user đã có sẵn trong hệ thống vào group thì chúng ta sử dụng lệnh usermod

Cú pháp: `usermod -a -G <tên nhóm> <tên người dùng>`

* Để xóa một group chúng ta sử dụng lệnh groupdel

Cú pháp: `groupdel <tên group>`

* Để kiểm tra lại các nhóm người dùng vừa tạo, ta sử dụng lệnh `tail /etc/group`

Như vậy, mình đã giới thiệu sơ qua các kiến thức cơ bản về tài khoản người sử dụng trong Ubuntu. Hẹn gặp lại các bạn ở bài viết tới, phần 2 về phân quyền truy cập.