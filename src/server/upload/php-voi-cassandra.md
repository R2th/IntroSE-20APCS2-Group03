Ngày nay sự phát triển mạnh mẽ về công nghệ, những trang web giờ không còn đơn thuần chỉ là những trang bán hàng nữa mà ngày càng nhiều tác vụ được tích hợp sẵn luôn trên web. Chính vì những điều như vậy đã kéo theo những yêu cầu mới như trong cơ sở dữ liệu ngày càng nhiều lại đòi hỏi hơn nữa về mặt tốc độ. Chính vì thế những  các hệ quản trị cơ sở dữ liệu quan hệ đã dần dần bộc lộ những yếu điểm của nó. Do vậy sự ra đời của NoSQL nó trở nên cấp thiết. Trong bài này tôi sẽ cùng các bạn tìm hiểu về 1 hệ quản trị cơ sở dữ liệu có tên là Cassanra.

#### Ưu điểm của Cassandra ####
* Chấp nhận sai sót (Fault Tolerant): dữ liệu của bạn đẽ được sao chép thành nhiều bản trên các server. Nếu chẳng may 1 server nào đó bị hỏng, bạn vẫn có thể truy xuất dữ liệu của bạn trên các server khác.
* Tính co giãn (Elastic): khả năng đọc/ghi tăng tuyến tính theo số lượng máy được thêm vào cụm máy của bạn mà không có thời gian chết (downtime) hay sự gián đoạn ứng dụng đang chạy của bạn.
* Hướng cột (Column-Oriented) : các RDBMS hướng dòng (row-oriented) phải định nghĩa trước các cột (column) trong các bảng (table). Đối với Cassandra các bạn không phải làm điều đó, đơn giản là thêm vào bao nhiêu  cột cũng được tùy theo nhu cầu của bạn.
* Tính sẵn sàng cao (Highly Availability): khi thực hiện tác vụ đọc/ghi, Cassandra có thể thực hiện trên bản sao gần nhất hoặc trên tất cả các bản sao. Điều này phụ thuộc vào thông số ConsitencyLevel do bạn thiết lập.

Với những ưu điểm trên ta có thể thấy việc sử dụng hệ quản trị cơ sở dữ liệu Cassandra đem lại nhiều lợi ích cũng như hiệu quả trong việc cải thiện tốc độ truy vấn cơ sở dữ liệu. Vậy để làm việc với cassandra ta cần cài đặt như dưới đây.

#### Cài đặt hệ quản trị Cassandra ####
Việc cài đặt trên Ubuntu ta làm như sau:
1. Ta cần cài môi trương java
```Install java
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-set-default
```
Sau khi cài xong ta có thể kiểm tra bằng lệnh sau `java -version` nếu cài thành công sẽ ra kiểu như sau:
```
java version "1.8.0_60"
Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)
```
2. Cài đặt Cassandra
Để cài Cassandra ta thực hiện lệnh như sau:
```
echo "deb http://www.apache.org/dist/cassandra/debian 22x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
echo "deb-src http://www.apache.org/dist/cassandra/debian 22x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
gpg --keyserver pgp.mit.edu --recv-keys F758CE318D77295D
gpg --export --armor F758CE318D77295D | sudo apt-key add -
gpg --keyserver pgp.mit.edu --recv-keys 2B5C1B00
gpg --export --armor 2B5C1B00 | sudo apt-key add -
gpg --keyserver pgp.mit.edu --recv-keys 0353B12C
gpg --export --armor 0353B12C | sudo apt-key add -
sudo apt-get update
sudo apt-get install cassandra
```

Sau khi cài đặt xong ta có thể kiểm tra xem hệ cơ sở dữ liệu đã cài xong chưa bằng lệnh `sudo service cassandra status`
Kinh nghiệm bản thân của người viết bài thì khi cài xong cassandra và khi chạy server cũng như chạy vào cassandra chiếm rất nhiều tài nguyên ram. Vì thế hay khiến máy bị chậm.

#### Cài phần mở rộng cassandra cho Php ####
Để có thể làm việc với Cassandra trong Php thì việc quan trọng ta cần cài phần mở rộng Cassandra cho Php.
Trước khi cài phần mở rộng thì ta cần cài 3 thư viện sau:
* C/C++ Driver
* GNU library
* libuv
Để cài đặt các thư viện này ta chạy lệnh sau:
```
sudo apt-get install g++ make cmake libuv-dev libssl-dev libgmp-dev php* php*-dev openssl libpcre3-dev git
```
với php* là version các bạn dùng, ví dụ 5 là php5 php5-dev hoặc 7: php7 php7-dev

Giờ ta cài phần mở rộng cassandra thông qua pecl. Việc tiếp đến ta cần cài thư viện, các ban có thể kiểm tra version mới nhất tại đây: http://downloads.datastax.com/cpp-driver/ubuntu/16.04/
Đầu tiên down các thư viện về bằng lệnh sau:
```
wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/cassandra/v2.9.0/cassandra-cpp-driver_2.9.0-1_amd64.deb
wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/cassandra/v2.9.0/cassandra-cpp-driver-dev_2.9.0-1_amd64.deb
wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/dependencies/libuv/v1.20.0/libuv_1.20.0-1_amd64.deb
wget http://downloads.datastax.com/cpp-driver/ubuntu/16.04/dependencies/libuv/v1.20.0/libuv-dev_1.20.0-1_amd64.deb
```

Sau đó ta tiến hành cài đặt
```
sudo dpkg -i libuv_1.20.0-1_amd64.deb
sudo dpkg -i libuv-dev_1.20.0-1_amd64.deb
sudo dpkg -i cassandra-cpp-driver_2.9.0-1_amd64.deb
sudo dpkg -i cassandra-cpp-driver-dev_2.9.0-1_amd64.deb
```

Cuối cùng ta chạy lệnh `pect install cassandra` để cài phần mở rộng này cho Php.

#### Thư viện dùng cassandra cho Php ####
Trong bài này mình giới thiệu các bạn thư viện cassandra dùng cho Php là https://github.com/datastax/php-driver
Để sử dụng nó ta cần các thông tin kết nối và chạy như sau
```
function connect($ip, $port, $keyspace, $username, $password)
{
    $cluster = Cassandra::cluster()
        ->withContactPoints($ip)
        ->withPort($port)
        ->withCredentials($username, $password)
        ->build();

   return $cluster->connect($keyspace);
}
```

Trong hệ cơ sở dữ liệu Cassandra này thì có các vấn đề sau liên quan đến việc tìm kiếm như: Không hỗ trợ tìm kiếm kiểu like như trong mysql, không có kiểu join các bảng cũng như sắp xếp. 
Vậy làm sao để thực hiện các công việc này thì theo ý kiến cá nhân của người viết thì ta nên kết hợp cassandra với elastic search. Điều này giúp cải thiện nhiều hiệu suất cũng như nhược điểm của cassandra.