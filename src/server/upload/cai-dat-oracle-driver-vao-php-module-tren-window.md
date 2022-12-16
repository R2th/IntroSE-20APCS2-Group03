Chào các bạn, hôm nay mình muốn hướng dẫn các bạn cách thêm Oracle driver vào PHP module, với mục đích là PHP có thể kết nối đến cơ sở dữ liệu của Oracle.

Nào mình cũng bắt đầu nhé.
## 1. Download Oracle driver PHP - oci8
Đầu tiên các bạn cần downoad Oracle driver PHP đó là oci8 tại page https://pecl.php.net/package/oci8/2.2.0/windows

Ở đây có 3 phiên bản của PHP đó là 7.1, 7.2 và 7.3. Trong ví dụ của mình dùng 7.1 mình sẽ download 7.1 Thread Safe (TS) x86 .

![](https://images.viblo.asia/21f75f28-45c5-406c-a8a9-74ee828a7919.jpg)
## 1.2 Extract zip file:	
Tiếp đến, sau khi download thành công oracle driver oci8, các bạn extract file zip sẽ nhận được các files như trong hình

![](https://images.viblo.asia/efd91423-4ca6-4727-a523-ecd1a15dd31e.jpg)
## 1.3. Add .ddl file to ext folder
Trong folder download về, vì mình dùng Oracle 11g nên mình sẽ copy file `php_oci8_11g.dll` vào thư mục `C:\xampp\php\ext\`

![](https://images.viblo.asia/752c6a34-7363-4b0b-b34c-6b8ca78a270c.jpg)

Lưu ý: Thay đổi path đến xampp của các bạn nhé.
## 1.4 Add extention to php.ini
Kế đến các bạn tìm đến file php.ini của XAMPP  `C:\xampp\php\php.ini` và thêm dòng `extension=php_oci8_11g.dll` vào

![](https://images.viblo.asia/975610bf-fbe9-4e2a-8170-e90a0e4b1a21.jpg)
Bạn cần chắc chắn là extention_dir được trỏ chính xác đến thư mục extention của PHP để hạn chế lỗi nhé.

![](https://images.viblo.asia/ebcc8141-39c3-4c78-ad00-44f26730259e.jpg)

Như vậy các bạn đã thêm được oracle driver php vào php module. Kế đến để chạy được oracle driver bạn cần cài đặt instantclient-basic-nt của Oracle nữa.
## 1.5 Download the Oracle Instant Client Basic package from OTN.	
Bạn truy cập vào page:	https://www.oracle.com/technetwork/topics/winsoft-085727.html để dowload.

Click vào checkbox Accept License Agreement để được hiển thị link download

![](https://images.viblo.asia/89f59927-271b-4689-baa0-915733eb2ff4.jpg)
Kế đến bạn scroll xuống dưới và download file instantclient-basic-nt-11.2.0.3.0.zip

![](https://images.viblo.asia/f65628c8-4690-40d9-8482-009ae15c705a.jpg)
Sau khi download, extract file zip và copy vào thư mục C:\instantclient_11_2

![](https://images.viblo.asia/365eb82a-a076-4d9d-bf1e-61ee26cb7b1f.jpg)
## 1.6 Add this subdirectory to the PATH environment variable. 	
Kế đến bạn cần thêm C:\instantclient_11_2 vào biến môi trường PATH của window để chạy oracle driver.

Click vào start và tìm `View Advanced system setttings`

![](https://images.viblo.asia/3361fbf9-9e58-46fb-b0b3-d54d44e6c51a.jpg)

Tiếp đến, bạn click vào `Advanced system settings` trên menu bên trái

![](https://images.viblo.asia/077ceffd-9fac-4864-96ad-778293232169.jpg)

Tiếp đến, bạn click vào nút `Environment Variables`

![](https://images.viblo.asia/de764814-68cf-41d0-8792-83182a883cca.jpg)

Edit Path ở `System Avariables`, thêm `C:\instantclient_11_2` và lưu lại

![](https://images.viblo.asia/8df36a26-62a9-4209-ac2e-7a2ec27e06f6.jpg)

** Sau khi thêm biến môi trường, bạn cần khởi động lại máy tính để appy PATH đó.
## 1.7 Check Oracle driver installed?	
Để kiểm tra Oracle driver PHP đã được cài đặt hay chưa, các bạn mở file `C:\xampp\htdocs\info.php` và thêm dòng sau vào:

```
<?php
        phpinfo();
?>
```
Khởi động XAMPP, mở trình duyệt của bạn và vào page: http://localhost/info.php

![](https://images.viblo.asia/bb67a78c-ed05-4bd3-a25c-6e81de00b53b.jpg)

** Nếu bạn nhìn thấy thông tin của `oci8` như hình trên thì chúc mừng bạn đã cài đặt thành công Oracle driver. :D
### Kết luận
Như vậy mình đã hướng dẫn xong cho các bạn cách thêm oracle driver oci8  vào PHP module. Giờ bạn có thể kết nối project của mình đến cơ sở dữ liệu Oracle rồi nhé. 

Cảm ơn các bạn đã đọc bài viết của mình :)