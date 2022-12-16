Như mình viết ở tiêu đề, bài viết này sẽ hướng dẫn các bạn cách khắc phục lỗi GRUB không chạy sau khi các bạn cài lại Windows.
## Cách sửa:
Trường hợp 1: Windows cài ở ổ đĩa 1, Linux cài ở ổ đĩa 2
+ Bước 1: Khi khởi động máy, vào boot options (tùy từng máy, Asus thì ``Esc`` còn Dell thì ``F12``)
+ Bước 2: Chọn boot vào ổ đĩa cài Windows
+ Bước 3: Tắt tính năng __Fast Startup__ (fastboot) trên windows. Cần thiết tắt cả *hibernate*.
+ Bước 4: Khởi động lại máy, chọn boot vào ổ đĩa cài Linux
+ Bước 5: Mở Nautilus (File Explorer) của linux rồi ấn vào phần Other Partitions, mở partition chứa windows để mount.
+ Bước 6: Chạy lệnh sau để hệ thống detect, kiểm tra phân vùng boot của windows
```
$ sudo os-prober
```
+ Bước 7: Cập nhật GRUB
```
$ sudo update-grub
```
+ Bước 8: Restart lại máy


Trường hợp 2: Windows và Linux cài trên cùng ổ đĩa.

Các bạn thử dùng một usb boot để chạy live linux. Rồi thực hiện từ bước 5.

#### Chúc các bạn thành công.