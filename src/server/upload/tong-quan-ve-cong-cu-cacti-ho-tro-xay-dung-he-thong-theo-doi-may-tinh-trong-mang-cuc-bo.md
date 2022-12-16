# Tổng quan

## 1. Sự ra đời của Cacti

Ian Berry bắt đầu phát triển Cacti vào tháng 6 năm 2001, khi ông đang làm việc với nhà cung cấp dịch vụ mạng địa phương ở Mỹ. Ông nhận thấy RRDTool rất linh động trong việc thể hiện các mô hình phức tạp và các báo cáo về mạng lưới cơ sở hạ tầng, nhưng nó thiếu một giao diện thân thiện. Vì vậy, ông bắt đầu phát triển giao diện với PHP/MySQL và phát hành bản đầu tiên . (phiên bản 0.6 ) vào 21/11/2001. Sau đó, ứng dụng trở nên phổ biến trong cộng đồng mã nguồn mở.

## 2. Khái niệm

Cacti là phần mềm mã nguồn mở, giám sát mạng và công cụ đồ họa viết trên PHP/ MySQL. Cacti sử dụng RRDTool (Round-robin database tool) mục đích lưu trữ dữ liệu và tạo đồ họa. Cacti thu thập dữ liệu định kì thông qua Net-SNMP (một bộ phần mềm dùng để thực hiện SNMP-Simple Network Management Protocol).

# Giới thiệu SNMP (Simple Network Management Protocol)

SNMP là một tập hợp các giao thức không chỉ cho phép kiểm tra nhằm đảm bảo các thiết bị mạng như router, switch hay server đang vận hành mà còn vận hành một cách tối ưu, ngoài ra SNMP còn cho phép quản lý các thiết bị mạng từ xa. 
Ví dụ: Dùng SNMP để tắt một interface nào đó trên router, theo dõi hoạt động của Card Ethernet hoặc kiểm soát nhiệt độ trên switch. 
Tóm lại, tất cả các thiết bị có thể chạy các phần mềm cho phép lấy được thông tin SNMP đều có thể quản lý được. Không chỉ các thiết bị vật lý mà cả những phần mềm như web server, database.
![](https://images.viblo.asia/e2ad072c-3723-4089-92fb-57f1922f3f1a.png)
+ Network management station: thường là một máy tính chạy phần mềm quản lý SNMP dùng để giám sát và điều khiển tập trung các Network element
+ Network element (device, host, application): là các thiết bị, máy tính hoặc phần mềm tương thích SNMP và được quản lý bởi Network management 
+ Một management station có thể quản lý nhiều element và một element cũng có thể được quản lý bởi nhiều management.

# Giới thiệu RRDTool (Round-Robin Database Tool)

RRDTool là một hệ thống ghi và vẽ dữ liệu hiệu năng cao, được thiết kế để xử lý dữ liệu theo chuỗi thời gian như là băng thông, nhiệt độ phòng, CPU load, server load và để giám sát các thiết bị như router, UPS,... Nó cho phép người quản trị ghi và phân tích dữ liệu thu thập được từ tất cả các nguồn dữ liệu. Việc phân tích dữ liệu của RRDTool phụ thuộc vào khả năng tạo ra các đồ thị hiển thị các giá trị thu thập được trong một khoảng thời gian định kỳ.
RRDTool được viết bởi ngôn ngữ C và lưu trữ dữ liệu của nó trong file .rrd . Số lượng bản ghi trong một file .rrd đơn không bao giờ tăng vì các bản ghi cũ sẽ thường xuyên được loại bỏ.
Các bước trong quá trình hoạt động của RRDTool:
+ Thu thập dữ liệu: Dữ liệu được thu thập trong khoảng thời gian cố định sẽ được lưu trong một cơ sở dữ liệu vòng
+ Hợp nhất dữ liệu: Việc quản lý dữ liệu của nhiều thiết bị trong một khoảng thời gian lớn sẽ gây khó khăn cho người quản trị. RRDTool cung cấp cho người quản trị một số hàm chức năng: max, min, average của dữ liệu và lưu trữ vòng dữ liệu hợp nhất
+ Dữ liệu chưa biết: khi dữ liệu không tồn tại do thiết bị bị hỏng hoặc nguyên nhân khác RRDTool sẽ lưu trữ file rrd với giá trị dữ liệu *UNKNOWN*
+ Vẽ đồ thị: Cho phép người quản trị tạo ra các báo cáo ở dạng đồ thị dựa trên dữ liệu được lưu trữ trong cơ sở dữ liệu

# Cơ chế hoạt động

![](https://images.viblo.asia/a8072afc-73b6-4ff2-8c28-dc2f7edcecfa.png)
Cacti lấy dữ liệu thông qua poller. Nó được lập lịch trong hệ điều hành. Hiện nay, cơ sở hạ tầng mạng chứa rất nhiều thiết bị như routers, switches, servers, UPS, các máy tính và thiết bị mạng khác nhau. Để lấy dữ liệu từ dịch vụ kết nối từ xa, Cacti sử dụng SNMP. Các thiết bị có sử dụng SNMP có thể được theo dõi bởi CacTi. 
Cacti sử dụng RRDTool để lưu trữ dữ liệu. RRD là hệ thống để lưu trữ và cho biết chuỗi thời gian dữ liệu được thu gom từ các thiết bị chứa SNMP. Nó hợp nhất dữ liệu trước đó bằng các hàm như AVERAGE, MINIMUM, MAXIMUM. Đó là lý do tại sao nó lại nhanh, tạo đồ họa dễ dàng .
Biểu diễn dữ liệu: Chức năng quan trọng nhất của RRDTool là tích hợp chức năng đồ họa. Cacti sử dụng chức năng này để triển khai tùy chỉnh các báo cáo đồ họa dựa vào thời gian thu thập từ các thiết bị chứa SNMP khác. Có thể có 1 hoặc nhiều thông tin trong biểu đồ, cũng có thể thêm các đặc điểm tiêu biểu khác như maximum, average, minimum.

# Tính năng 

+ Nguồn dữ liệu:
Để xử lý việc thu thập dữ liệu, cần cung cấp các đường dẫn tới dữ liệu mà người dùng muốn thêm vào , sao đó Cacti sẽ thu thập dữ liệu này và thêm vào cơ sở dữ liệu MySql / kho lưu trữ vòng robin.
Nguồn dữ liệu cũng có thể được tạo, tương ứng với dữ liệu thực tế trên biểu đồ. 
Ví dụ: Nếu người dùng muốn lập biểu đồ thời gian ping cho máy chủ lưu trữ, có thể tạo nguồn dữ liệu bằng cách sử dụng tập lệnh ping một máy chủ  và trả về giá trị theo mili giây. Sau khi xác định các tùy chọn cho RRDTool như cách lưu trữ dữ liệu, cũng có thể định nghĩa bất kỳ thông tin bổ sung nào mà nguồn đầu vào dữ liệu yêu cầu, chẳng hạn như một máy chủ lưu trữ để ping trong trường hợp này. Khi nguồn dữ liệu được tạo, nó sẽ tự động được duy trì trong khoảng thời gian 5 phút
Các nguồn dữ liệu có thể được tạo ra, sử dụng các hàm "create" và "update" của RRDTool. Mỗi nguồn dữ liệu có thể được sử dụng để thu thập dữ liệu cục bộ hoặc từ xa và được đặt trên một biểu đồ.
Hỗ trợ các tệp RRD với nhiều nguồn dữ liệu và có thể sử dụng tệp RRD được lưu trữ ở bất kỳ đâu trên hệ thống tệp cục bộ.
Cài đặt kho lưu trữ vòng robin, có thể được tùy chỉnh cho người dùng khả năng thu thập khác nhau.
+ Thu thập dữ liệu:
Chứa cơ chế "đầu vào dữ liệu" cho phép người dùng xác định các tập lệnh tùy chỉnh có thể được sử dụng để thu thập dữ liệu. Mỗi tập lệnh có thể chứa đối số phải được nhập cho từng nguồn dữ liệu được tạo bằng cách sử dụng tập lệnh (chẳng hạn như địa chỉ IP).
Khả năng truy xuất dữ liệu bằng SNMP hoặc tập lệnh có đường dẫn. 
Một poller dựa trên PHP được cung cấp để thực thi các lệnh có sẵn, truy xuất dữ liệu SNMP và cập nhật các tệp RRD của bạn.
+ Đồ thị:
Khi một hoặc nhiều nguồn dữ liệu được xác định, một đồ thị RRDTool có thể được tạo bằng cách sử dụng dữ liệu. Cacti cho phép bạn tạo hầu như bất kỳ đồ thị RRDTool nào bạn có thể tưởng tượng bằng cách sử dụng tất cả các loại biểu đồ RRDTool chuẩn và các hàm tổng hợp. Lựa chọn màu sắc và văn bản tự động cũng được hỗ trợ trong việc tạo ra các đồ thị để làm cho quá trình dễ dàng hơn.
Không chỉ có thể tạo các đồ thị dựa trên RRDTool trong Cacti, mà có rất nhiều cách để hiển thị chúng. Cùng với “Chế độ xem dạng danh sách” ,  “chế độ xem dạng cây” cho phép đặt đồ thị lên cây phân cấp tùy thuộc vào mục đích sử dụng
Số lượng đồ thị không giới hạn, có thể chọn cho mỗi đồ thị sử dụng CDEF hoặc nguồn dữ liệu từ bên trong Cacti.
Tự động nhóm các mục biểu đồ GPRINT thành AREA, STACK và LINE [1-3] để cho phép sắp xếp lại nhanh chóng các mục biểu đồ.
Hỗ trợ tự động đếm để đảm bảo dòng văn bản chú giải trên đồ thị .
Dữ liệu đồ thị có thể được điều khiển bằng cách sử dụng các hàm toán học CDEF được xây dựng trong RRDTool. Các hàm CDEF này có thể được định nghĩa trong Cacti và có thể được sử dụng trên mỗi đồ thị.
Hỗ trợ tất cả các loại mục đồ thị của RRDTool bao gồm AREA, STACK, LINE [1-3], GPRINT, COMMENT, VRULE và HRULE.
+ Quản lý người dùng:
Do nhiều chức năng của Cacti, một công cụ quản lý dựa trên người dùng được xây dựng để có thể thêm người dùng và cung cấp cho họ quyền đối với 1 số chức năng nhất định trên Cacti. Điều này sẽ cho phép người quản lý tạo ra một số người dùng có thể thay đổi thông số của đồ thị, trong khi những người khác chỉ có thể xem đồ thị. Mỗi người dùng cũng duy trì cài đặt của riêng họ khi xem biểu đồ.

# Cài đặt hệ thống

## 1. Phân tích hệ thống

Hệ thống gồm 2 máy:
1 máy chủ có cài đặt Cacti là một Network Graphing Tool tương tự như MRTG. thu thập dữ liệu SNMP và các dữ liệu khác nhau (chẳng hạn như tải của hệ thống, tình trạng liên kết mạng, không gian đĩa cứng, đăng nhập người dùng vv) thành một RRD. RRD là viết tắt của Round Robin Database, là một hệ thống để lưu trữ và hiển thị thời gian, dữ liệu, băng thông mạng, nhiệt độ, và trung bình tải máy chủ.
1 máy trạm khác có sử dụng phương thức mạng SNMP. 
Máy chủ sẽ thu thập dữ liệu của máy trạm cần được giám sát. Những dữ liệu thông số của thiết bị đc giám sát này được biểu diễn trên các Graph trên Cacti.

## 2. Các bước cài đặt

### Bước 1: Install php and required modules

```
apt-get -y install php php-mysql php-curl php-net-socket \
php-gd php-intl php-pear php-imap php-memcache libapache2-mod-php \
php-pspell php-recode php-tidy php-xmlrpc php-snmp \
php-mbstring php-gettext php-gmp php-json php-xml php-common
gedit /etc/php/7.2/apache2/php.ini 
939 date.timezone = "Asia/Ho_Chi_Minh"
```

### Bước 2: Install Apache Web server
```
apt-get -y install apache2
gedit /etc/apache2/conf-enabled/security.conf
25 ServerTokens Prod
```
![](https://images.viblo.asia/078d6ba1-9d4b-43da-a390-d6c3c29e78bf.png)

![](https://images.viblo.asia/993300ea-9cb8-4360-94f1-c4ba837934a2.png)

### Bước 3: Install MariaDB server

[https://computingforgeeks.com/install-mariadb-10-on-ubuntu-18-04-and-centos-7/ ]
Tune MariaDB database for Cacti
```
Gedit /etc/mysql/mariadb.cnf
    max_heap_table_size=128M
    tmp_table_size=128M
    join_buffer_size=64M
    innodb_buffer_pool_size=512M
    innodb_doublewrite=OFF
    innodb_flush_log_at_timeout=3
    innodb_read_io_threads=32
    innodb_write_io_threads=16
    systemctl restart mysql
```
Tạo và cấp quyền cho user cacti trên database cacti với password là 123456

![](https://images.viblo.asia/c43a952c-3191-4a88-9088-07544fc11423.png)

![](https://images.viblo.asia/125ee76c-7dc3-476d-8c5f-ce725b4885b4.png)

### Bước 4: Install SNMP and Cacti

```
apt-get install snmp snmpd snmp-mibs-downloader rrdtool cacti cacti-spine
```
chọn apache2

![](https://images.viblo.asia/411a5dbf-04db-47d3-a4d5-6e8b8bcd018b.png)

Chọn no 

![](https://images.viblo.asia/90d08008-f437-465e-a66b-0816c3b03c59.png)

### Bước 5: Configure SNMP

```
Gedit  /etc/snmp/snmp.conf
```

![](https://images.viblo.asia/91d899b0-292f-47d6-831e-29557e21245d.png)

![](https://images.viblo.asia/34a8ab76-83d1-4963-8cb5-41792dedcbb4.png)

![](https://images.viblo.asia/7be4c522-eda6-48ed-9690-0d5f287c951e.png)

```
systemctl restart snmpd
```

### Bước 6: Configure Cacti Server

```
gedit /usr/share/cacti/site/include/config.php
```

![](https://images.viblo.asia/48081db0-1166-4de7-a4fb-f7f955894f47.png)

```
mysql -u cacti -p cacti < /usr/share/doc/cacti/cacti.sql
mysql -u root –p
gedit  /etc/apache2/conf-available/cacti.conf
```

![](https://images.viblo.asia/e07a5585-9f99-4d2d-807d-24cefe6792a1.png)

```
systemctl restart apache2
```

### Bước 7: Start Initial Cacti Setup

Http://localhost/cacti/

![](https://images.viblo.asia/633c32a6-4f26-477d-ad4d-ae052f71c3f0.png)

![](https://images.viblo.asia/cc2ae06d-3f28-4c18-a1db-6a8cbbed1f7e.png)

![](https://images.viblo.asia/c7fb98eb-bbcc-4838-ba82-a2f1015e1364.png)

![](https://images.viblo.asia/29a9ba8e-31d6-4a2a-8d0e-3cf47521bec6.png)

### Bước 8: Monitor Local Cacti Server

> Cùng đón chờ bản demo trong bài viết sau của mình nhé.
> Hihi Upvote để mình có động lực viết bài nha nha <3 <3 <3
# Tài liệu tham khảo:
- Tên tác giả : Ian Berry; Tài liệu: Cacti ; Đường dẫn: https://www.cacti.net/index.php
- Tên tác giả: Đinh Hoàng Long ; Tài liệu: Sử dụng phần mềm Cacti để giám sát, quản trị một hệ thống mạng; Đường dẫn: https://text.123doc.org/document/3495543-su-dung-phan-mem-cacti-de-giam-sat-quan-tri-mot-he-thong-mang.htm
- Tài liệu: Hướng dẫn cài đặt và cấu hình quản lý giám sát hệ thống mạng bằng Cacti Linux; Đường dẫn: http://asterisk.vn/labs/linux/cacti/Huong.dan.cai.dat.va.cau.hinh.giam.sat.mang.bang.Cacti.Linux_asterisk.vn.pdf