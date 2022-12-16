Trong bài này mình sẽ tìm hiểu về một công cụ quản lý các cấu hình mạng của các thiết bị, backup chúng một cách tự động thay vì phải vào từng thiết bị và backup manual. Đó là công cụ rConfig ( https://www.rconfig.com )

Đầu tiên, rConfig bao gồm các đặc điểm/tính năng sau:  
( Phần này có thể xem trên trang chủ chi tiết hơn )

* Miễn phí vì là phần mềm Open Source
* Khả năng thay đổi các câu lệnh quản lý linh hoạt
* Tính năng tải file cấu hình trực tiếp
* Viết năng ngôn ngữ PHP khá quen thuộc
* Hệ thống lịch chạy dựa trên CRON
* Hệ thống báo cáo 
* Tính năng backup hệ thống
* Hỗ trợ telnet và sshv2

Cấu hình yêu cầu để cài đặt và sử dụng phần mềm:
* Centos 6.3 trở lên
* PHP 5.6 trở lên
* MySQL 5.1.61 trở lên
* Apache 2.2.15 trở lên
* Trình duyệt IE7+, Firefox3.5+, Chrome11+, Safari3+, Opera 9.4+

Giờ bắt đầu vào cài đặt và cấu hình rConfig:

I. Cài đặt:
Với các phiên bản cũ, mình phải cài đặt thủ công nhưng từ phiên bản 3.7 trở đi thì bộ phận phát triển rConfig đã cung cấp cho chúng ta file script cài đặt, như vậy mình chỉ cần chạy file script là nó sẽ tự động cài đặt toàn bộ cho mình, mình chỉ phải đợi.

```
$ cd /home

$ curl -O http://www.rconfig.com/downloads/scripts/install_rConfig.sh -A "Mozilla"

$ chmod +x install_rConfig.sh

$ ./install_rConfig.sh
```

Quá trình cài đặt tương đối lâu ( khoảng 20-30' ) vì nó phải cài các phần mềm đi kèm: LAMP, mysql ... Trong quá trình cài đặt, nó sẽ hỏi một số thông tin, chúng ta cứ theo hướng dẫn của nó mà khai báo là được

![](https://images.viblo.asia/4e9a9ec5-deca-4f90-becb-e7398dd237a4.PNG)
![](https://images.viblo.asia/097f9782-7cca-477f-b61b-08bfc23f9ce8.PNG)
![](https://images.viblo.asia/91ab9ac8-9055-4b52-aac6-09c3d01c1efa.PNG)

Sau khi chạy xong file script install_rConfig.sh, nó sẽ bắt reboot server và khi khởi động xong thì chạy tiếp script centos7_postReboot.sh

![](https://images.viblo.asia/4b795977-c967-4421-870d-dc1a3afeddc8.PNG)

Như vậy quá trình cài đặt rConfig đã xong, giờ là cấu hình.
Để vào trang quản lý của rConfig, ta sử dụng trình duyệt vào đường dẫn: http://IP-server/install

Lần đầu đăng nhập này sẽ ra trang cài đặt, chọn Check 

![](https://images.viblo.asia/f6c23121-960d-4323-b900-e363647c7426.PNG)

![](https://images.viblo.asia/1490202d-35f8-471a-ab5f-6610a36cb777.PNG)

![](https://images.viblo.asia/0d502530-a4d4-4bf9-b1cb-64b1c6ffbadb.PNG)

![](https://images.viblo.asia/ce92baa6-cc4c-4bae-bfc8-f98dc1331c1f.PNG)

![](https://images.viblo.asia/179bc985-4199-4190-bdc6-04eb11dfad6d.PNG)

Sau khi cấu hình xong, chúng ta đăng nhập sử dụng tài khoản mặc định ban đầu là **admin/admin**.

![](https://images.viblo.asia/1b7b85e6-5964-416f-98ca-ca114b715ead.PNG)

Tiếp vào tab **Devices** để khai báo các thiết bị mạng cần backup file config, chọn **Add Device**

![](https://images.viblo.asia/a056a494-9902-4478-9ebf-a065a95e0560.PNG)

Khai báo các thông số thiết bị, những chỗ đánh dấu * là bắt buộc điền, ở phần Template nó có 4 lựa chọn thì có 2 phần ( ssh, no enabled và telnet, no enable ) thì mình thấy dùng có vẻ chưa được ổn nên chúng ta hãy enable tính năng telnet hoặc ssh trên các thiết bị mạng rồi chọn 2 lựa chọn còn lại của rconfig.

Tiếp đến cần cấu hình lịch backup, vào tab **Schedule Tasks**

![](https://images.viblo.asia/99680923-2363-4866-86a9-4285d3a7400a.PNG)

![](https://images.viblo.asia/a49dce3d-fd60-4b74-8061-42adddc05aeb.PNG)

Ở đây mình chọn lịch 5' backup 1 lần.

Như vậy là đã xong phần cấu hình cho rConfig, nếu cần thêm thiết bị nào cứ thực hiện tương tự như các bước trên là được.