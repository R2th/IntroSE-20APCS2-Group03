Ở phần 4, chúng ta đã tìm hiểu guildline về Setting S3 trên AWS. Lần này mình xin tiếp tục được giới thiệu về settings RDS (Relational Database Service) trên AWS

# 1. RDS và Dynamo Basics 
Database:
Trong thế giới Database thì có 2 nhóm category chính:
* Relational Databases hay còn được biết đến là "SQL"
* Non-Relational Database hay còn được gọi là "No-SQL"

Amazon cung cấp cho người dùng cả 2 database type này:
RDS dành cho SQL database và DynamoDB dành cho No-SQL database

![](https://images.viblo.asia/d1f3d9ff-ee89-48a1-8fd7-76a94080b3d2.png)

### 1.1 RDS là gì?
Amazon RDS là một web service làm đơn giản hoá việc set up, vận hành, và scale relational database trên cloud. 
Là một service có chi phí phải chăng, khả năng resize dành cho cơ sở dữ liệu quan hệ cho các doanh nghiệp và quản lý các data common đối với các task vận hành hệ thống

Amazon cung cấp cho chúng ta các options sau:
1. Amazon Aurora
1. MySQL
1. MariaDB
1. Postgre SQL
1. Oracle (Có một vài option của Oracle khả dụng)
1. Microsoft SQL Server (Có một vài option của Microsoft khả dụng)

### 1.2 DynamoDB là gì?
DynamoDB là một service No-SQL có tốc độ cao và linh hoạt cho các application cần sự nhất quán, có độ trễ chỉ tính bằng single-digit millisecond trên bất kì quy mô service nào.
Chính bởi mô hình data linh hoạt và performance cao mà DynamoDB thích hợp cho mobile, web, gaming, ad-tech, iOT application.

![](https://images.viblo.asia/c36b4288-e409-4cc6-9744-112e6f984de7.png)


DynamoDB có thể dùng để thay thế cho (hoặc tương đồng với)
1. MongoDB
1. Cassandra DB
1. Oracle No-SQL

### 1.3 Điểm khác nhau giữa SQL và NoSQL
RDS (SQL):
- Lưu lại toàn bộ data trong các bảng (sử dụng hàng và cột)
- Thường sử dụng cho các data có cấu trúc
DynamoDB (NoSQL)
- Lưu data dưới định dạng file JSON, name-value documents
- Được sử dụng cho các data không có cấu trúc 

![](https://images.viblo.asia/734e9ac5-96da-4f7e-a729-afcd904a7999.png)

1.4 RDS Pricing/Cost Overview:
Free Tier apply cho toàn bộ RDS options ngoại trừ Aurora
Amazon charge phí sử dụng RDS như thế nào?
1. Dựa vào Engine RDS người dùng sử dụng
* Amazon Aurora
* MySQL
* MariaDB
* Postgre SQL
* Oracle (Có một vài option của Oracle khả dụng)
* Microsoft SQL Server (Có một vài option của Microsoft khả dụng)

2. RDS Instance Class:
- Khá tương đồng với EC2 instance type

![](https://images.viblo.asia/1e34df08-38c1-4662-8b3f-92258b42449c.png)
![](https://images.viblo.asia/43898057-fdee-4815-bed9-a01e5dbce1f0.png)


3. Purchasing Terms:
On Demand
Reserve

4. Database Storage:
5. Data Transfer: dựa vào số request IN/OUT từ RDS

Cụ thể về pricing cho từng mục, chúng ta có thể tham khảo tại: 
https://aws.amazon.com/rds/pricing/?nc1=h_ls

# 2. RDS Provisioning
### 2.1 Provisioning Chart 

![](https://images.viblo.asia/5d919bd7-f37f-4724-aeeb-35b684e7dd72.png)

**Lưu ý quan trọng về RDS Database đó là khía cạnh về security:**
- Phải luôn chắc chắn rằng RDS của dự án sẽ không có khả năng kết nối Internet.
- Tất cả các dữ liệu được store trong RDS là vô cùng quan trọng, và cần thiết phải setting để chặn cũng như cấp quyền access data cho các đối tượng nhất định.
- Vậy nên, tốt nhất là nên cung cấp cho RDS một private sub-net có round table và round table này không có kết nối trực tiếp tới Internet Gateway, và resource duy nhất có quyền access vào RDS đó là các instances trong VPC.
- Thêm vào đó, chúng ta cũng cần config Security Group của VPC một các chính xác. Bởi nếu không, thì các instance của VPC sẽ không thể communicate với RDS 
Ví dụ: MySQL hay Aurora sử dụng port 3306 thì trên Security Group cũng sẽ cần config allow port 3306 để EC2 instance có thể communicate với RDS.
Lưu ý rằng các EC2 Instance có route connect tới Internet Gateway và bởi EC2 Instance đang tận dụng route này để connect tới Internet. 

Mục tiêu chính là để cho dev team connect tới EC2 Instance, và chỉ trên EC2 Instance có quyền truy cập vào RDS trong private sub-net còn EC2 instance thì nằm trong public subnet và dev team chỉ có thể connect vào RDS thông qua các lệnh SSH như sau: 

![](https://images.viblo.asia/ef4abbe3-ab2b-4b29-81a2-cbc07de66a89.png)

### 2.2 Config Private Subnet Group: 
Trong RDS, chúng ta cần tạo subnet group chưa 2 private subnet. 

Các step để config RDS database vào trong private subnet:
1. Navigate (Điều hướng) Subnet Group
Chọn Subnet Group trong màn hình setting RDS

![](https://images.viblo.asia/cbf6fff6-7399-4c47-b1ea-dc3efee14785.png)

3. Tạo DB Subnet Group

![](https://images.viblo.asia/a7e0c41d-de8d-41b3-b2f8-d093b491fd4d.png)

5. Complete form và tạo 2 private subnet

![](https://images.viblo.asia/81dccf70-7030-4062-81a8-20fc0817267f.png)


### 2.3 Launch RDS database theo các step sau:
**1. Chọn engine: **
- Đối với Free Tier Engine, tiến hành chọn **MySQL → Dev/Test Option **

![](https://images.viblo.asia/81162d2f-ab55-4af4-941a-d0fe9e16345e.png)


**2. Config DB Details**
- Config Instance
- Settings

![](https://images.viblo.asia/93fd67cc-47d2-4d94-856a-c6b79b17dd23.png)

![](https://images.viblo.asia/799ca92f-fa3c-4834-a387-8d37d9d505e8.png)


**3. Config Advance Settings**
- Network và Security: Chọn private subnet group, không sử dụng **default**, set Public Accessible về **No**
- Database Options 
- Backup
- Monitoring
- Maintenance

**4. Launch DB Instance**

2.4 Connect tới MySQL RDS Database:
Download và install MySQL Workbench ([tại đây](https://dev.mysql.com/downloads/workbench/))
Open MySQL Workbench
Set up new connection trên MySQL WorkBench:
- Đặt tên cho connection
- Chọn **Standard TCP/IP Over SSH** làm connection method
- **SSH Hostname** = public IP address của EC2 Instance
- **SSH UserName** = **ec2-user** (default usernawm sử dụng để ssh vào EC2)
- **SSSH Key File** = key .pem sử dugnj để SSH vào EC2 
- Copy **Writter Endpoind** từ RDS Console và paste vào MySQL Hostname
- Set Port **3306**
- Input **Username** và **Password** đã sử dụng khi tạo DB.
- Click **Test Connection**, nếu successful thì click **OK** để connect

Mình xin kết thúc topic setting RDS ở đây, hẹn gặp mọi người ở topic sau về SNS và ELB