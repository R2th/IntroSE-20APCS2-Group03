Hello anh em, các bài viết gần đây của mình thường về [Docker](https://viblo.asia/s/kham-pha-docker-JzKmgDnBl9N), mình vốn định làm bài tiếp theo cx về thực hành 1 project với docker nhưng nghĩ lại có vẻ hơi thiếu xót nếu chúng ta đi quá vội mà bỏ qua 1 vài thứ căn bản. Ubuntu hay nền tảng Linux là cực kỳ quan trong khi chúng ta phải làm việc với server hoặc các hệ thống tương tự (docker cũng thường build trên image có nền tảng linux). 

Do đó hôm nay mình sẽ giới thiệu qua chút về những gì mình biết về Ubuntu cũng như quyền hạn của người dùng trong đó. Bài viết được mình tổng hợp từ hồi mới học Linux nên không nhớ rõ nguồn của kiến thức lắm, nếu ai thấy trùng với bài viết nào thì comment ở dưới mình sẽ thêm vào.

# 1. Cấu trúc thư mục 
Sơ lược thì hệ thống thư mục của ubuntu sẽ như sau: 
![Cấu trúc thư mục Linux](https://images.viblo.asia/00898935-d72c-4019-b584-4cfc6af8593d.png)

Chức năng của các thư mục trong hệ thống của ubuntu:

- **/** (hay **computer**) - **Root** - Thư mục gốc (khác với thư mục **/root**):
Mọi file trong hệ thống của ubuntu đều bắt đầu từ nguồn này. Chứa file hệ thống, các tệp tin cá nhân cũng như link tới các ổ đĩa cứng, mềm. Đại khái là chứa tất cả những thằng ở dưới đây.
- **/bin** (**binaries**) - Các tập tin thực thi của người dùng.
Chứa các file là những lệnh của Linux cho cá nhân người sử dụng hoặc cho allusers. 
Các lệnh có thể lưu ở dạng mã nhị phân hoặc là .sh. (Các bạn chạy được những lệnh như bash hay mkdir ... đều là do chúng được nhét ở trong thư mục này).
- **/sbin**  - Các tập tin thực thi của hệ thống. 
Các lệnh trong file này là các lệnh dùng cho quản trị viên và thường dùng trong config hệ thống. 
Các lệnh trong file này thường chỉ được chạy bởi root hoặc superuser. 
- **/etc** - Các tập tin cấu hình. 
Cấu hình trong file này thường sẽ ảnh hưởng đến tất cả người dùng trên hệ thống. Thường là config của các chương trình được cài đặt toàn cục.
- **/dev** - Các tập tin thiết bị :
Chứa tệp tin  thiết bị được cho phép kết nối như usb hay các ổ đĩa cứng khác. Ngoài ra còn có 1 tệp tin đặc biệt là dev/null. Tệp tin này có ý nghĩa là không có gì. Khi ta nói chuyển 1 thư mục vào dev/null ta có thể hiểu là thư mục hay tệp tin sẽ bị xóa đi. Dev/null loại bỏ toàn bộ các dữ liệu ghi vào nó mà vẫn báo cáo là đã ghi thành công. (hay được thấy trong crontab)
- **/proc** - thông tin về tiến trình:
Các thông tin về hệ thống được biểu diễn dưới dạng file. Nó cung cấp cách thức cho nhân Linux để gửi và nhận thông tin từ các tiến trình đang chạy trên môi trường Linux.
- **/var** - các tệp tin thay đổi: 
Chứa các tập tin mà dung lượng lớn dần theo thời gian sử dụng.
Bao gồm – Các tập tin ghi chú về hệ thống (**/var/log**); các gói và các tập tin cơ sở dữ liệu (**/var/lib**); thư điện tử (**/var/mail**);  hàng đợi in queues (**/var/spool**); các tập tin khóa (**/var/lock**); các tập tin tạm được dùng khi khởi động lại (**/var/tmp**).
- **/tmp** - Chứa các tập tin tạm:
Các tập tin tạm của hệ thống và người dùng để tăng tốc cho máy tính. Thường được xóa khi reboot.
- **/home** - Thư mục của người dùng.
- **/boot** -  Các tập tin của chương trình khởi động máy.
- **/lib** - Chứa các thư việ của hệ thống.
Thông thường khi cài đặt các gói tin sẽ bao gồm các thư viện cài đặt thêm để hỗ trợ. Khi đó hệ thống sẽ sắp xếp các thư viện này vào cùng 1 chỗ để dễ dàng hơn khi gọi ra.
- **/mnt** - Chứa các thư mục của các ổ cứng hay trong cùng 1 mạng.
- **/media** - Các thiết bị tháo lắp.

#  2. Phân quyền trong Ubuntu
## 2.1. Quản lý người dùng, group
### 2.1.1. User

Ta có thể tạo 1 user trong ubuntu bằng terminal bằng lệnh : `useradd [option] <username>` với :

*-c <Thông tin người dùng>*

*-d <Thư mục cá nhân>*

*-m : Tạo thư mục cá nhân nếu chưa tồn tại*

*-g <nhóm của người dùng>*


Nếu muốn thay đổi thông tin cá nhân dùng lệnh: `usermod [option] <username>`

Xóa 1 user dùng lệnh:  `userdel [option] <username>`

Đặt mật khẩu cho user : `sudo passwd <username>`

Các quy định cho password trong file  `/etc/login.defs`.

### 2.1.2. Group: 
Ta cũng có thể tạo 1 group trong ubuntu :  `groupadd <ten_group>`

Thông thường khi tạo 1 user, 1 group cũng được tạo ra và gán cho cùng tên với user đó.
Để tạo mới 1 user và thêm luôn vào group ta sử dụng lệnh: 
`sudo useradd -G <tên_group> <tên_user>`

Còn nếu muốn thêm 1 user có sẵn vào group sử dụng lệnh: `sudo usermod -a -G <tên_group> <tên_user>`

Để xóa 1 group ta sử dụng lệnh: `groupdel <tên_group>`

## 2.2. Phân quyền thư mục:

Có 3 nhóm yêu cầu quyền hạn truy cập thư mục là: **Owner** , **Group owner** và **Other**.

Có 3 loại quyền hạn chính trên 1 thư mục là : ***read***, ***write*** và  ***excute***.

Khi nói đến phân quyền câu lệnh hay được sử dụng nhất là `chmod`, cú pháp câu lệnh này là:  `chmod <option> <opcode> <path_to_file>`

với option bao gồm: 

*-v: hiển thị báo cáo sau khi chạy lệnh. Nếu bạn chmod nhiều file/folder cùng lúc thì cứ mỗi lần nó đổi quyền của 1 file/folder xong là sẽ hiện báo cáo.*

*-c: giống như trên, nhưng chỉ hiện khi nó đã làm xong tất cả.*

*-f: Hiểu ngắn gọn là kiểu “kemeno”, nếu có lỗi xảy ra nó cũng không thông báo.*

*-R: nếu bạn CHMOD một folder thì kèm theo -R nghĩa là áp dụng luôn vào các file/folder nằm bên trong nó.*

*--help: hiển thị thông báo trợ giúp.*

`opcode` có thể là 3->4 chữ số hoặc chữ cái biểu diễn như hình bên dưới:

![Phần quyền trong Linux](https://images.viblo.asia/a80fd800-6495-4bbf-ae59-5ac49224344a.png)

- Với trường hợp 3 chữ số: 

Biễu diễn lần lượt của nó là Owner, group, other. Các số biểu diễn cho ta quyền như hình vẽ cung cấp. (Hình vẽ trên mô tả khá chi tiết cũng như cách tính số tương ứng với quyền.

- Giả sử với lệnh: `chmod -R 765 laravel/storage` có nghĩa là:

    * Owner tương ứng với số 7 (như hình vẽ sẽ có đủ 3 quyền đọc, ghi, thực thi) như vậy owner hiện tại có thể làm bất cứ điều gì với thư mục này.

    * Group owner tương ứng với số 6 ( như hình vẽ sẽ có 2 quyền là đọc và ghi) tức là các user thuộc group (group này thường là group hiện tại mà user thực thi câu lệnh đang ở trong, thông thường hay ghi tên user vì khi tạo 1 user thì cũng có 1 group có tên như vậy được tạo ra) có quyền đọc và ghi với thư mục này. (Bạn có thể thay đổi group owner cho thư mục)

    * Cuối cùng là số 5 tương ứng với other (ở đây là tất cả các thằng user hay group khác trong hệ thống) như hình vẽ sẽ có quyền đọc và thực thi.

- Với trường hợp chữ cái: `tên của loại hình sở hữu + loại quyền truy cập`:

Ví dụ: `chmod u+x laravel/storage` thức là thêm quyền excute cho thằng owner của thư mục.

- Với TH 4 chữ số: 
Bạn có thể sẽ gặp câu lệnh `chmod -R 7765 laravel/storage` có nghĩa là:

Special, User/Owner, Group, và Others
thằng đầu tiên nó là một dạng change mod đặc biệt:

3 kiểu set của nó: 

Set UID, set GID, set Sticky Bit : **x1.x2.x3**

Nếu x1 =1 set UID : tức là +4 thì tất cả các user sẽ đều chạy quyền trên file đó như chủ sở hữu nó.

Nếu x2 =1 set GID: tức là +2 thì tất cả các group sẽ chạy quyền trên file đó như chủ sở hữu nó.

Nếu x3 =1 set Sticky Bit: tức là chỉ chủ sở hữu hoặc root ms có thể xóa thư mục hoặc các file bên trong nó.

Ngoài ra 1 kiểu thay quyền nữa là thay quyền chủ sở hữu của thư mục (Owner). Thông thường người tạo ra thư mục sẽ có quyền owner thư mục đó, tuy nhiên vì mình có quyền super admin nên mình sẽ lấy quyền chủ thư mục về mình. Ta sẽ sử dụng cú pháp chown: 

`chown -R [tên user]:[tên group] [file/folder]`

Tất nhiên khi thực hiện những câu lệnh trên bạn cần có hiểu biết về thư mục mà bạn thực hiện thay đổi quyền hay sở hữu. Nên nhớ rằng các file hệ thống rất dễ không hoạt động nếu thay đổi quyền (vì cái này mà 1 đống ông phải cài lại ubuntu này, láo với hệ thống là không được :v)

Bonus: Edited 07/11/2019
Đi vòng vòng 1 hồi mình có thấy là bài viết này mình đề cập đến đổi user, group mà ko chỉ cho các bạn cách liệt kê, tình cờ thấy có bài viết cũng có chút đúng mình sẽ chỉ cho mọi người cách:
Command liệt kê ra danh sách các group có sẵn:

```bash
getent group | awk -F : '{print $1}'
```
Command show tất cả các account có trong group: (cái này bạn phải cài package members mới dùng được)
```bash
members group_name
```
---
## Kết luận
Ở trên là vài hiểu biết nhỏ của mình về ubuntu (hay linux). Thực ra cũng chẳng nhớ mấy đâu nên toàn phải note lại lần sau lôi ra đọc, thôi thì lần này note lại trên viblo cho các anh em khác hay quên hoặc chưa biết xem cùng. Nếu có gì không đúng hay thắc mắc trong thực hiện các câu lệnh các bạn comment phía dưới nhé. Cảm ơn vì đã đọc bài viết, bài viết tiếp theo rất có thể mình sẽ quay lại với docker (như đã hứa ở bài trước). Súc. Hy vọng được anh em ủng hộ.