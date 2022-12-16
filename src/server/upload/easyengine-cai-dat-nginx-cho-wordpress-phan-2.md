Qua bài viết trước mình đã giới thiệu với các bạn về EasyEngine - 1 script cài đặt Webserver cho WordPress.
https://viblo.asia/p/easyengine-cai-dat-nginx-cho-wordpress-phan-1-maGK74NMZj2
Trong bài viết này chúng ta sẽ đi vào chi tiết hơn về cài đặt EasyEngine trên máy chủ ảo.
## Tạo bộ nhớ ảo SWAP
Như ở bài viết trước, nếu bộ nhớ RAM của máy chủ của bạn quá nhỏ (<1GB) thì các bạn nên sử dụng Swap để tạo bộ nhớ ảo cho server. Dưới đây là các bước để tạo bộ nhớ ảo SWAP:
![](https://images.viblo.asia/6baf6595-1ba3-46f3-9dc6-9f9867325022.png)

**Bước 1:** Kiểm tra xem máy chủ của bạn đã có swap hay chưa, bằng cách chạy lệnh **swapon -s**, nếu nó không hiển thị gì cả mà chỉ hiển thị các cột thông tin như ở dưới là bạn chưa có swap.

`Filename Type Size Used Priority`

**Bước 2:** Tạo một thư mục swap với dung lượng là 2GB, bạn có thể tăng hoặc giảm tùy theo nhu cầu sử dụng.

`fallocate -l 2G /swapfile`

**Bước 3:** chmod 600 cho thư mục này.

`chmod 600 /swapfile`

**Bước 4:** Tạo swap từ thư mục vừa tạo

`mkswap /swapfile`

**Bước 5:** Kiểm tra lại xem đã có swap hay chưa bằng lệnh

`swapon -s`

**Bước 6:**  Lưu lại để swap không bị mất khi khởi động lại máy chủ

`nano /etc/fstab`

và chèn vào cuối file:

`/swapfile none swap sw 0 0`
## Cài đặt EasyEngine
Để cài đặt EasyEngine lên máy chủ của bạn các bạn chạy lệnh:

`wget -qO ee https://rt.cx/ee4 && sudo bash ee`

Chi tiết hướng dẫn cài đặt cho từng hệ điều hành tại đây: https://easyengine.io/handbook/install/

Các bạn sẽ cần chờ vài phút để EasyEngine tự động cài đặt Webserver lên máy chủ

![](https://images.viblo.asia/70e1a331-24e0-465a-b17a-fc230652f3e9.png)

Như hình trên là bạn đã cài đặt EasyEngine thành công. Các thông số về server như phiên bản PHP, các modules được cài đặt... được hiển thị trên kết quả cài đặt.

## Các lệnh thường sử dụng trong EasyEngine

| Command | Description |
| -------- | -------- |
| ee log | Thực hiện các thao tác trên các file log |
| ee service | Quản lý các global services của EasyEngine |
|ee site | Thực hiện các thao tác với site. Để biết thêm chi tiết Có thể sử dụng lệnh ee help site  |
| ee shell | Có thể sử dụng để chạy wp-cli, composer,.. |
| ee mailhog | Quản lý mailhog trên site |
| ee help | Các lệnh về trợ giúp, các lệnh đặc biệt |
| ee cron | Quản lý cron trên các site EasyEngine và máy chủ |
| ee config | Quản lý các Global Config |
| ee cli | Đánh giá các thông tin hiện tại của EE như check các cập nhập,... |
| ee auth | Cấu hình xác thực HTTP và whitelisting cho site EasyEngine |
| ee admin-tools | Quản lý các công cụ Admin của site |

Chi tiết hơn về từng lệnh các bạn có thể xem tại đây: https://easyengine.io/commands/

##  Kết luận
Như vậy trong bài viết phần 2 của Series hướng dẫn  cài đặt và sử dụng EasyEngine đã giúp các bạn cài đặt được Webserver lên máy chủ của bạn, các lệnh tương tác cơ bản với máy chủ. Trong bài viết sau mình sẽ hướng dẫn các bạn cài đặt 1 website WordPress lên máy chủ cũng như cách upload code lên máy chủ và sử dụng.