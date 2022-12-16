RDS là viết tắt của Amazon Relational Database Service là một web service cho phép bạn dễ dàng setup thao tác, scale cơ sở dữ liệu quan hệ trên AWS Cloud. 

Amazon RDS sẽ đảm nhận các tác vụ khó hay các tác vụ quản lý: 

* Bạn có thể phân bổ CPU, IOPS hay storage một cách tuỳ biến
* RDS sử dụng AWS backup service cho việc backup data, tự động phát hiện lỗi và recovery
* Không support việc access RDS instance thông qua shell
* Bạn có thể backup tự động hay thủ công Snapshot
* Khả năng tự đồng bộ cao giữa primary và secondary
* Kiểm soát được việc access vào RDS thông qua IAM, bảo vệ database bằng cách đẩy lên virtual private cloud

# DB Instances
DB instance là một kiểu môi trường cơ sở dữ liệu riêng biệt bên trong AWS cloud. 

Bạn có thể tạo hay chỉnh sửa DB instance thông qua AWS CLI, RDS API và AWS management console

Mỗi một DB instance sẽ chạy một DB engine

RDS support các engine sau:

* MySQL
* MariaDB
* PostgreSQL
* Oraccle
* Microsoft SQL server 
 
 DB instance storage có 3 kiểu 
 
* Magnetic 
* General Purpose (SSD)
* Provisioned (PIOS)
Mỗi một DB instace có giới hạn lưu trữ phụ thuộc vào kiểu và cơ sở dữ liệu mà nó support. 
# DB Instance Billing for Amazon RDS
Việc tính toán tiền dựa vào các thành phần được sử dụng sau:

* DB instance hours (per hour): Dựa vào DB instance class của DB instance, Giá tiền sẽ được list ra theo giờ, Nhưng hoá đơn của bạn sẽ được tính toán theo giây và tối thiểu cho RDS billing  là 10 phút
* Storage (GiB/tháng): Nếu bạn scale provisioned storage capacity trong tháng. Thì bill sẽ là pro-rated
* I/O request (1 triệu request mỗi tháng) :  Áp dụng cho kiểu RDS magetic 
* Provisioned IOPS (per IOPS per month)
* Backup storage (per GiB per month):  Backup storage là việc lưu trữ được tự động liên kết với database backups 
* Data transfer (per GB) : Là việc chuyển chuyển dữ liệu dữ instance với bên ngoài hoặc các service khác của AWS

# Prerequirement 

Bạn sẽ tạo cơ sở dữ liệu bên trong DB instance. 

DB instance sẽ cung cấp network address (endpoint). Ứng dụng sẽ sử dụng endpoint này để kết nối tới DB instance. 

Bạn sẽ cần phải details setting storage, memory, engine / version, network, security, maintenance period khi tạo DB instance. 

Kiểm soát việc truy cập DB instance thông qua security group

Trước khi tạo DB instance và security group bạn phải xác định được những thứ mà DB instance và security group cần
Những điều quan trọng sau cần chú ý:

## Resource requirements

Memory và processor cần thiết cho ứng dụng

## VPC, subnet và security group

DB instance giống như VPC (Virtual Private Cloud). Để kêt nối được tới DB instance bạn cần cài đặt security goup rules. Những rules này là khác nhau đối với từng VPC mà bạn sử dụng

### Default VPC

Nếu AWS account của bạn có default VPC trên AWS region hiện tại, Thì VPC này đã được cấu hình để hỗ trợ cho DB instance.
Nếu bạn chọn default VPC khi tạo DB instance thì thao tác theo bước sau:
* Tạo VPC security group để chứng thực kết từ ứng dùng tới Amazon RDS DB instance với database.
* Chọn default DB subnet group. Amazon RDS sẽ tạo default DB subnet group khi tạo DB instance nếu đây là lần đâu bạn tạo DB instance. 

### User-defined VPC

Một số điều quan trọng cần chú ý 

1. Hãy chắc chắn rằng VPC security group đã chứng thực việc kết nối giữa ứng dụng với từ Amazon RDS tới database. 

2. VPC phải thoả mãn một số điều kiện để host DB instance như có ít nhất 2 subnets cho mỗi AZ

3. Sử dụng một DB subnet group để định nghĩa các subnets trong VPC 
 
### No VPC

Nếu AWS account của bạn không có default VPC và bạn không chọn user-defined VPC

##  High availability

Amazon RDS, Multi-AZ deployment sẽ tạo ra một primary DB instance và một secondary standby DB instance ở một AZ khác hỗ trợ cho việc chuyển đổi dự phòng khi có lỗi xảy ra. 

##  IAM policies

IAM account của bạn phải được phân quyền mà Amazon RDS yêu cầu. 

##  Open ports

Hãy đảm bảo firewall không block default port cho database engine. Bạn có thể sửa port bằng cách sửa DB instance

##  AWS Region

Database và ứng dụng của bạn nên chọn region gần nhau để giảm độ trễ mạng

##  DB disk subsystem

Tuỳ vào mục đích sử dụng mà bạn chọn 1 trong 3 loại Magnetic (Standard Storage), General Purpose (SSD), Provisioned IOPS (PIOPS)

# Tham khảo
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html