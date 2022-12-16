Nếu bạn làm nhiều project sử dụng các phiên bản MySQL khác nhau, có thể bạn sẽ nghĩ đến cách chuyển đổi giữa các phiên bản MySQL mỗi khi làm việc với project sử dụng phiên bản MySQL khác. Tuy nhiên, điều này khá bất tiện. Bài viết này sẽ giúp bạn giải quyết vấn đề đó.

Các bạn có thể xem thêm [Hướng dẫn cài đặt nhiều phiên bản PHP chạy đồng thời với Apache trên Ubuntu](https://viblo.asia/p/huong-dan-cai-dat-nhieu-phien-ban-php-chay-dong-thoi-voi-apache-tren-ubuntu-bWrZnwpYlxw).

Trong bài viết này, giả định chúng ta cần sử dụng MySQL 5.6 và MySQL 5.7 trên cùng server, và phiên bản MySQL 5.7 được sử dụng nhiều hơn sẽ được chọn làm phiên bản chính. Chúng ta sẽ cài đặt MySQL 5.7 trước. Sau đó, sử dụng Docker để cài đặt phiên bản MySQL 5.6.

## Cài đặt MySQL 5.7
Chạy các lệnh sau để cài đặt mysql 5.7:
```bash
sudo apt-get update
sudo apt-get install mysql-server-5.7 mysql-server-core-5.7 mysql-client-5.7 mysql-client-core-5.7
```
Lúc này, MySQL 5.7 được cài đặt và chạy ở port 3306 (port mặc định).

## Cài đặt Docker
Chạy lệnh sau để cài đặt docker:
```bash
curl -sSL https://get.docker.com/ | sh
```

## Cài đặt MySQL 5.6
Chạy lệnh sau để cài đặt MySQL 5.6 trong docker container.
```bash
sudo docker run --name mysql-56-container -p 127.0.0.1:3310:3306 -e MYSQL_ROOT_PASSWORD=rootpassword -d mysql:5.6
```
Lưu ý: rootpassword là password của user root, có thể thay đổi tuỳ ý.

Container này chứa MySQL 5.6 được cài đặt với port 3306. Nhưng máy chủ sẽ sử dụng port 3310 để chuyển tiếp.

## Kết nối đến MySQL 5.6
```bash
mysql -u root -p --host=127.0.0.1 --port=3310
```

## Kết nối đến MySQL 5.7
```bash
mysql -u root -p
```

Vậy là xong. Bây giờ bạn đã có MySQL 5.6 và MySQL 5.7 chạy trên cùng máy chủ.

**Lưu ý**: Khi khởi động lại máy chủ, bạn cần chạy lệnh sau để khởi động lại MySQL 5.6 container:
```bash
sudo docker start mysql-56-container
```