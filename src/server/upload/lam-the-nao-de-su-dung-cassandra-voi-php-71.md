# Mở đầu
> Nếu là một developer back-end chắc hẳn các bạn đã từng làm rất nhiều loại hệ quản trị cơ sở dữ liệu như SQL và NoSQL. Nếu bạn chưa phân biệt được SQL và Nosql là gì thì bạn nên thể tìm hiểu tại [Phân biệt SQL và NoSql](https://viblo.asia/p/nhung-diem-khac-biet-giua-sql-va-nosql-gDVK2WPjZLj). Hôm nay mình xin giới thiệu các bạn cách sử dụng Nosql với PHP đặc biệt là **Cassandra** mà mình đang dùng trong dự án hiện tại. Để có thể hiểu được bài này bạn nên có đôi chút kiến thức Cassandra trước khi đọc bài này. 
# 1. Cài đặt DataStax PHP (v1.3).
Nếu muốn sử dụng được Appache Cassandra trong PHP thì bạn bắt buộc cài đặt driver này.

> **DataStax PHP**  hoạt động độc quyền với ngôn ngữ truy vấn **Cassandra v3 (CQL3)** và giao thức gốc của Cassandra. Phiên bản hiện tại hoạt động với:
> 
 > * PHP 5.6, PHP 7.0, and PHP 7.1
 >  * Apache Cassandra versions 2.1, 2.2 and 3.0+

### Mình sẽ hướng dẫn các bạn install  **Linux 16.04**
*  Bắt đầu với Ubuntu 16.04 LTS (Debian 9) PHP v5.5.x đã được xóa nếu là version mặc định để thay thế với version mới như PHP v7.0.x hoặc PHP v7.1.x:
    ```
    add-apt-repository ppa:ondrej/php
    apt-get update
    apt-get install build-essential cmake git libpcre3-dev php7.1-dev
    
    apt-get install libgmp-dev
   apt-get install libssl-dev
    ```
*  Chúng ta phải download và cài đặt **libuv** và **Cassandra C++** . Chúng ta có thể download tại [đây đối với Ubuntu 16.04](http://downloads.datastax.com/cpp-driver/ubuntu/16.04/)

![](https://images.viblo.asia/c0cef204-7fb5-4473-a81a-45f68f642807.PNG)

Nhưng chúng ta hoàn toàn có thể install bằng commands:
```
 wget http://downloads.datastax.com/cpp-driver/ubuntu/16.0 /dependencies/libuv/v1.16.1/libuv_1.16.1-1_amd64.deb

 wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/dependencies/libuv/v1.16.1/libuv-dev_1.16.1-1_amd64.deb

 wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/cassandra/v2.8.0/cassandra-cpp-driver_2.8.0-1_amd64.deb

 wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/cassandra/v2.8.0/cassandra-cpp-driver-dev_2.8.0-1_amd64.deb
```
Chúng ta tiến hành cài đặt nào:

```
 sudo dpkg -i libuv_1.16.1–1_amd64.deb
 sudo dpkg -i libuv-dev_1.16.1–1_amd64.deb
 sudo dpkg -i cassandra-cpp-driver_2.8.0–1_amd64.deb
 sudo dpkg -i cassandra-cpp-driver-dev_2.8.0–1_amd64.deb
```
*  Cài đặt PHP-Cassandra extension sử dụng PECL
```
pecl install cassandra

```
*  Enabling the PHP extension
 ```
 php -r "echo php_ini_loaded_file();"
 ```
 sửa ở file php.ini như sau 
 ````
 ; DataStax PHP Driver for Apache Cassandra
extension=cassandra.so
 ````
* Để kiếm  tra mình đã install thành công chưa bạn có thể check
```
php -i | grep -A 10 "^cassandra$" hoặc php -m 
```
![](https://images.viblo.asia/01352758-d622-4efe-a855-81b9e280a81a.PNG)

# 2. Công cụ hỗ trợ làm việc với cassandra
> Có rất nhiều công cụ làm việc với NoSql nhưng đa phần có tính phí. Nếu có tiền thì bạn có thể dùng nhưng mình có 1 phần mền miễn phí https://github.com/Kindrat/cassandra-client Nó có thể giúp mình xem cấu trúc và dữ liệu một cách trực quan nhưng mà thực hiện câu lệnh truy vẫn thì mình khuyên bạn nên dùng commands để trực quan hơn.
> 

Các bước để cài đặt  **cassandra-client**
* Chúng có thể download code bằng cách sử dụng git hoặc download
```
git clone https://github.com/Kindrat/cassandra-client.git
cd cassandra-client
```
* Chúng ta build như sau:

  + Đối với Window:  `./gradlew.bat build`
  + Đối với Unix:  `./gradlew build`
 
 * Mỗi lần khởi động chúng ta chỉ cần: `./gradlew bootRun `
#  3. Connect Cassandra bằng PHP
```
public function connectCassandra($config = [])
{
	$cluster  = Cassandra::cluster()->build();
	
	return $cluster->connect($config['keyspace']);
}

```
# 4. Kết luận
> Vì thời gian có hạn nên mình chỉ giới thiệu các bạn những kiến thức cơ bản. Trong bài tiếp theo mình sẽ hướng dẫn các bạn insert, update, delete bằng cassandra.
> 
> Hẹn gặp lại các bạn :D :rolling_on_the_floor_laughing: :rolling_on_the_floor_laughing: :rolling_on_the_floor_laughing: