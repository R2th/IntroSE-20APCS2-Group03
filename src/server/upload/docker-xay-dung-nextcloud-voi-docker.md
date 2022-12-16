Chào các bạn, tiếp tục **TIP** chia sẻ về **Docker** hôm nay là một góc chia sẻ khác  **xây dựng hệ thống lưu trữ NextCloud với Docker**.

![](https://images.viblo.asia/cceb52bd-997a-433d-88f9-e21186f100a8.jpeg)

## 1. Tổng quan
### NextCloud là gì?
[Nextcloud](https://nextcloud.com/) là một mã nguồn mở và là chương trình hỗ trợ lưu trữ và đồng bộ dữ liệu trên nền tảng điện toán đám mây. Với Nextcloud bạn có thể xây dựng cho tổ chức, doanh nghiệp hay cá nhân một nền tảng lưu trữ và đồng bộ dữ liệu tương tự như **Google Drive, Dropbox, Onedrive…**

**Nextcloud** cung cấp nhiều tính năng để tạo ra một đám mây riêng, cụ thể như:

* Tự động lưu trữ: Bạn có thể truy cập Nextcloud gần như mọi lúc mọi nơi và bạn có toàn quyền việc kiểm soát lưu trữ dữ liệu.
* Chia sẻ dễ dàng: Nextcloud cho phép chia sẻ File rất an toàn, với bất kỳ ai hoặc ngoài đám mây khi sử dụng đường dẫn được bảo vệ bằng mật khẩu và các thành viên trong mạng có thể chia File lên Nextcloud.
* Ưu tiên bảo mật: Nextcloud tích hợp các phương pháp bảo mật tiêu chuẩn bao gồm tính năng mã hóa đầu cuối. Nó hỗ trợ các chương trình xác thực, kiểm soát và sơ đồ cấp phép phổ biến.
* Rất nhiều tích hợp: Nextcloud đi kèm với hỗ trợ tích hợp – ứng dụng và dịch vụ để mở rộng chức năng của Cloud. Ví dụ, bạn có thể quản lý công việc, chỉnh sửa dữ liệu trong Markdown và nhiều tác vụ khác.
## 2.Cài đặt NextCloud
Trong bài chia sẻ này mình sử dụng **Ubuntu 20.04 LTS** và các bản phân phối khác tương tự.

**Server NextCloud:**

> OS: Ubuntu 20.04 LTS
> 
> Cấu hình: 2 CPU / 2 GB RAM / 20 GB Disk
> 
> IP: 123.123.123.123 (IP Public – eth0)

### 2.1 Cài đặt Docker và Docker-Compose
```
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo usermod -aG docker $USER
newgrp docker
```
### 2.2.Tạo một docker-compose file
Đầu tiên, các bạn tạo một thư mục **/opt/NextCloud** và file **docker-compose.yaml** mới trong thư mục này.
```
mkdir /opt/nextcloud
```
```
nano /opt/nextcloud/docker-compose.yaml
```
```
version: '2'

volumes:
  nextcloud:
  db:

services:
  db:
    image: mariadb
    restart: always
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW --innodb-file-per-table=1 --skip-innodb-read-only-compressed

    volumes:
      - db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=Bund7zXeVz7YnFknLGcnUjHtk #change this
      - MYSQL_PASSWORD=HFdMe9rn5kf7A8Pqc8v86Pre5 #change this
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  app:
    image: nextcloud
    restart: always
    ports:
      - 8888:80
    links:
      - db
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_PASSWORD=HFdMe9rn5kf7A8Pqc8v86Pre5  #change this to match the mysql_password above
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=db
```
### 2.3.Thiết lập NextCloud
Chúng ta khởi động bằng command sau:
```
cd /opt/nextcloud
docker-compose up -d
```
Vào trình duyệt và tiến hành thiết lập **Nextcloud** http://ip:8888

![](https://images.viblo.asia/9cd21470-7fdb-4fb6-b3ae-ffcf9ad6a549.png)
 Bạn đăng chờ trong giây lát sẽ được cài đặt xong và tiến hành khám phá NextCloud
## Lời kết
Như vậy, qua bài viết này mình chia sẻ các bạn cách xây dựng một hệ thống tự lưu trữ riêng dùng NextCloud trên Docker. Giờ bạn thử cài đặt ngay để trải nghiệm nó nhé. Chúc các bạn thành công.!
{@embed: https://www.youtube.com/watch?v=s10p3cJiM4o}
Tham khảo:

[NextCloud](https://bit.ly/3GUeOKc)

[NextCloud_hub](https://dockr.ly/3okHmEr)