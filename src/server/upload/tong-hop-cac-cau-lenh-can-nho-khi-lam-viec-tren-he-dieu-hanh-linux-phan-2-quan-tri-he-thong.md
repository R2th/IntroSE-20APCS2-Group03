## Mở đầu
Chào các bạn ở phần trước mình đã giới thiệu cho các bạn các câu lệnh về **Quản lý các tập tin**, trong phần này mình sẽ tiếp tục giới thiệu thêm cho các bạn các câu lệnh về **Quản trị hệ thống**. Nó thực sự rất hữu ích nếu bạn là một Backend Developer. Chúng ta cùng bắt đầu nhé!

## 1. Các câu lệnh cơ bản
Thực hiện lệnh command với tư cách là siêu người dùng (root)
```go
$ sudo [command]
```

Giống với **sudo** nhưng dùng cho các ứng dụng đồ hoạ
```perl
$ gksudo [command]
```

Chấm dứt chế độ dùng lệnh có chức năng của người siêu dùng (root)
```shell
$ sudo -k
```

Cho biết phiên bản của nhân Linux
```shell
$ uname -r
```

Khởi động lại máy tính ngay lập tức
```shell
$ shutdown -h now
```

Liệt kê các thiết bị USB hoặc PCI có mặt trong máy tính
```php
$ lsusb
$ lspci
```

Cho biết thời gian cần thiết để thực hiện xong lệnh ***command***
```css
$ time [command]
```

Chuyển kết quả của lệnh ***command1*** làm đầu vào của lệnh ***command2***
```markdown
$ command1 | command2
```

Xoá màn hình của cửa sổ terminal
```php
$ clear
```

## 2. Tiến trình (Processus)
Hiển thị tất cả các tiến trình đã được thực hiện ***(pid et ppid)***
```shell
$ ps -ef
```

Hiển thị chi tiết các tiến trình
```shell
$ ps aux
```

Hiển thị các tiến trình liên quan đến chương khởi động ***soft***
```shell
$ ps aux | grep soft
```

Báo chấm dứt tiến trình mang số ***pid***
```shell
$ kill pid
```

Yêu cầu hệ thống chấm dứt tiến trình ***pid***
```c
$ kill -9 pid
```

Chấm dứt một ứng dụng theo dạng đồ hoạ (ấn chuột vào cửa sổ của ứng dụng)
```perl
$ xkill
```

## 3. Mạng máy tính
Tra thông tin cấu hình của các bộ phần giao diện (interfaces)
```shell
$ /etc/network/interfaces
```

Hiển thị tên của máy tính trong mạng (hostname)
```shell
$ uname -a
```

Thử nối mạng đến máy có địa chỉ IP
```markdown
$ ping [IP Address]
```

Hiển thị thông tin về tất cả các giao diện mạng đang có
```markdown
$ ifconfig -a
```

Xác định địa chỉ IP cho giao diện cạc mạng ***eth0***
```markdown
$ ifconfig eth0 [IP Address]
```

Ngưng hoạt động giao diện cạc mạng ***eth0***
```php
$ ifdown eth0
$ ifconfig eth0 down
```

Kích hoạt giao diện cạc mạng ***eth0***
```php
$ ifup eth0
$ ifconfig eth0 up
```

Ngưng hoạt động tất cả các nối mạng
```shell
$ poweroff -i
```

Xác định địa chỉ IP của máy làm cổng dẫn đến bên ngoài mạng cục bộ
```shell
$ route add default gw [IP Address]
```

Bỏ địa chỉ IP mặc định để ra khỏi mạng cục bộ
```php
$ route del default
```

## 4. Phân vùng ổ cứng
Chứa các thông tin về các ổ cứng và hệ thống tập tin được gắn tự động
```shell
$ /etc/fstab
```

Hiển thị các phân vùng tích cực
```shell
$ fdisk -l
```

Tạo thư mục để gắn hệ thống tập tin của thiết bị ***diskusb***
```shell
$ mkdir /media/diskusb
```

Gắn hệ thống tập tin ***diskusb***
```shell
$ mount /media/cleusb
```

Tách ra hệ thống tập tin ***diskusb***
```shell
$ umount /media/cleusb
```

Gắn, tách ra hoặc gắn lại tất cả các ổ/thiết bị có trong tập tin ***/etc/fstab***
```shell
$ mount -a
$ mount -a -o remount
```

Tạo mới và bỏ phân vùng trên ổ cứng IDE thứ nhất
```php
$ fdisk /dev/hda1
```

Tạo một hệ thống tập tin ***ext3*** trên phân vùng ***/dev/hda1***
```shell
$ mkfs.ext3 /dev/hda1
```

tạo một hệ thống tập tin ***fat32*** trên phân vùng ***/dev/hda1***
```shell
$ mkfs.vfat /dev/hda1
```

## Kết luận
Trên đây là các câu lệnh về **quản trị hệ thống** trên hệ điều hành Linux. Cám ơn các bạn đã đọc bài viết của mình! :wink: