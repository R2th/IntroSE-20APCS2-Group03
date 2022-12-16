Tiếp theo của [part 1](https://viblo.asia/p/aws-vpc-building-your-first-amazon-virtual-private-cloud-vpc-part-1-gAm5yXVAldb), bài viết này sẽ tiếp tục thực hiện các phần còn lại của bài lab bên dưới

[Building Your First Amazon Virtual Private Cloud (VPC)](https://www.qwiklabs.com/focuses/3629?catalog_rank=%7B%22rank%22%3A5%2C%22num_filters%22%3A1%2C%22has_search%22%3Atrue%7D&locale=en&parent=catalog&search_id=2607562#)

### Review lại Part 1

Ở part 1, từ task 1 tới task 4 thì mình đã xây dựng được mô hình như bên dưới

![](https://images.viblo.asia/bc5191a3-c0af-40f1-83be-ec075e817b8a.png)

Trong đó chỉ có 2 Public Subnet Group được route tới Internet Getway và thực tế thì chưa hề có instance nào cả.

### Mục tiêu

Mục tiêu của part 2 này sẽ bao gồm

- Tạo Security Group sử dụng cho Web Server (Task 5)
- Tạo 1 EC2 đóng vai trò là 1 Web Server đặt ở Public Subnet (Task 6)
- Tạo Private Subnet sử dụng cho việc thiết lập instance Database (Task 7)
- Tạo Security Group sử dụng cho Database Server (Task 8)
- Tạo Database Subnet Group (Task 9)
- Tạo 1 instance AWS RDS (Task 10)
- Kết nối application ở EC2 tới RDS (Task 11)

### Task 5. Tạo Security Group sử dụng cho Web Server

* Trước hết, đọc qua xem thử cái Security Group (SG) là cái gì.
>  A security group acts as a virtual firewall for your instance to control inbound and outbound traffic. When you launch an instance in a VPC, you can assign up to five security groups to the instance. Security groups act at the instance level, not the subnet level. Therefore, each instance in a subnet in your VPC could be assigned to a different set of security groups. If you do not specify a particular group at launch time, the instance is automatically assigned to the default security group for the VPC.
> 
* Cơ bản thì SG được xem như một "tường lửa ảo" nhằm lọc các truy cập vào các Instance hoặc đi ra từ các Instance. SG sẽ hoạt động dựa vào các rule do admin cài đặt. 

* Chọn Security Groups ở thanh điều hướng, click Create security group để bắt đầu tạo SG

![](https://images.viblo.asia/d7534c16-6cbb-4385-b6b3-f777fe59b75a.png)

* Cấu hình thông tin SG như sau. Chú ý lựa chọn VPC là VPC đã tạo ở task 1

![](https://images.viblo.asia/96ce34c9-b55b-42f4-99d4-9aaa6d99c1c8.png)

* Click Create sau đó Close. 

![](https://images.viblo.asia/009bd22d-d190-40ee-990a-bd7cff817afd.png)

* Sau đó tiến hành tạo Rule cho SG vừa tạo. Click vào Inbound Rules để tạo rule cho các traffic đi vào. Config như bên dưới nhằm cho phép các traffic từ bên ngoài có thể đi vào SG này qua type HTTP 

![](https://images.viblo.asia/254471bb-d22e-4128-930d-ca644fc93f51.png)

* Click Save rule -> Close để kết thúc việc Edit rule cho SG

![](https://images.viblo.asia/12a0f4c8-37bb-42db-bb3e-f21337429a6a.png)

=> Đến đây, task tạo Security Group về cơ bản đã hoàn thành. Mình đã tạo được 1 SG control các traffic từ Internet đi vào các Instance nằm trong SG này. Và thông thường thì Instance nằm trong SG này sẽ là 1 con EC2 chạy WebServer để người dùng có thể truy cập vào từ internet.

### Task 6. Tạo 1 EC2 đóng vai trò là 1 Web Server đặt ở Public Subnet

* Ở task này sẽ thực hiện tạo 1 EC2 đảm nhiệm vai trò là 1 Web Server. Web Server cần được truy cập từ Internet nên sẽ đặt tại Public Subnet
* Chi tiết việc tạo 1 EC2 đã được mình thực hiện ở [đây](https://viblo.asia/p/aws-ec2-thu-tao-1-aws-ec2-va-deploy-1-ung-dung-rails-Ljy5VYrVlra). Tuy nhiên ở task này, mình sẽ sử dụng 1 script có sẵn và được chạy khi EC2 được khởi tạo nhằm cài đặt 1 WebServer lên con EC2 này, đồng thời chạy 1 app có thể được config để trỏ tới mySQL RDS Instance.
* Ở Step 3 khi tạo EC2 thì cấu hình như bên dưới. Chú ý chọn  Network là VPC Subnet đã tạo ở Task 1. Subnet là Subnet Public 1.

![](https://images.viblo.asia/bbdd529b-15f5-4505-9582-873530e169cd.png)

* Ở phần Advanced Details cần copy và paste đoạn script bên dưới vào User data text box
```
#!/bin/bash -ex
yum -y update
yum -y install httpd php mysql php-mysql
chkconfig httpd on
service httpd start
cd /var/www/html
wget https://s3-us-west-2.amazonaws.com/us-west-2-aws-training/awsu-spl/spl-13/scripts/app.tgz
tar xvfz app.tgz
chown apache:root /var/www/html/rds.conf.php
```

![](https://images.viblo.asia/34ec5b7e-ddac-4b24-975a-bcd7ea39cb94.png)

* Bỏ qua Step 4, ở Step 5 Add Tag như bên dưới

![](https://images.viblo.asia/71592ff1-831c-49f6-8ba1-45d8478a36a2.png)

* Ở Step 6, Config SG như bên dưới. Chú ý chọn SG là SG đã create ở task 5. Sau đó click Review and Launch

![](https://images.viblo.asia/2ea69512-e39a-417a-bb41-cbd39bbedfac.png)

* Ở window Select an existing key pair or create a new key pair thực hiện config như bên dưới. Click Launch Instances

![](https://images.viblo.asia/8ebfc18c-9581-4a33-b790-e56abbb93d6e.png)

* Đợi 1 khoảng thời gian sau đó trạng thái của EC2 vừa mới tạo sẽ chuyển sang "running". Lúc này script được past vào ở step trên sẽ thực hiện cài đặt 1 WebServer lên con EC2 này, đồng thời chạy 1 app có thể được config để trỏ tới mySQL RDS Instance.

![](https://images.viblo.asia/fb5736c4-be62-4619-b842-b33bdafd1ba8.png)

* Thử access vào WebServer vừa tạo bằng cách copy và paste IP Pulic con EC2 này vào trình duyệt, kết quả sẽ như bên dưới

![](https://images.viblo.asia/5a5a49ce-91a3-4faf-bf06-fe7fa161694e.png)

=> Đến đây Task 6 đã được hoàn thành. 1 EC2 chạy WebServer đã được đặt trong Public Subnet và nằm trong SG tạo ở task 5.

### Task 7.Tạo Private Subnet sử dụng cho việc thiết lập instance Database

* Để đảm bảo tính bảo mật cao, các ứng dụng thông thường sẽ đặt tầng cơ sở dữ liệu nằm riêng biệt cũng như hạn chế các luồng truy cập vào. Ở task này, mình sẽ thực hiện tạo 1 Private Subnet nằm đặt Instance Database cho ứng dụng. Subnet này sẽ không có quyền đi ra ngoài Internet, cũng như ngược lại, không cho phép các traffic từ ngoài Internet có thể access vào.

* Việc tạo Private Subnet thực tế không khác gì so với việc tạo Public Subnet. Với Private Subnet 1 sẽ được config như bên dưới

![](https://images.viblo.asia/ec1619ac-25ca-4e8a-955b-4b16bda467cf.png)

* Sau đó tiếp tục tạo 1 Private Subnet 2. Chú ý cần phải tạo 1 Private Subnet 2 có Availability Zone để có thể đủ điều kiện tạo Database Subnet Group ở bước sau

![](https://images.viblo.asia/a66801bb-9d40-4597-8684-e41f52a41ac7.png)

* Sau khi tạo xong 2 Private Subnet thì mình có tổng cộng 4 subnet như bên dưới

![](https://images.viblo.asia/e822f66e-74b9-441d-ae63-fb918284fb07.png)

=> Kết thúc Task 7

### Task 8.Tạo Security Group sử dụng cho Database Server

* Tương tự như task 5 tạo SG cho WebServer thì task 8 thực hiện tạo 1 SG nhằm sử dụng cho Database Server.
* SG này được config như bên dưới

![](https://images.viblo.asia/2c7d5f29-ec10-4c39-bea9-de0c870c7ffe.png)

* Sau khi create xong Database Security Group thì thực hiện set Rule cho SG này. Click vào Add Rule vào config như bên dưới. Chú ý là SG này sẽ chỉ set Rule cho phép WebServer Security Group được đi vào Database Security Group.
Để config được như vậy thì ở phần Source, cần chọn Custom và paste vào Group ID của WebServer Security Group

![](https://images.viblo.asia/1222295c-c56b-4c21-929d-60da2ca0b657.png)

=> Save rules và Close để kết thúc Task 8.

![](https://images.viblo.asia/0aebc668-beb3-4acb-b90d-7027e84be831.png)

### Task 9.Tạo Database Subnet Group

* Trước hết ngó qua xem Database Subnet Group là gì

> Amazon RDS instances require a database subnet group. 
>  A DB subnet group is a collection of subnets (typically private) that you create in a VPC and that you then designate for your DB instances. Each DB subnet group should have subnets in at least two Availability Zones in a given region. When creating a DB instance in a VPC, you must select a DB subnet group.
>  

=> Trước hết biết được là muốn tạo 1 Instance RDS thì bắt buộc phải có 1 database subnet group. Ngoài ra điều kiện cần để tạo database subnet group là phải có ít nhất 2 Availability Zones khác nhau. (Đã được chuẩn bị ở task 7)

* Click vào Services, click RDS để bắt đầu tạo DB subnet group

![](https://images.viblo.asia/524041c3-7332-4113-b1b1-cd10e380d2e7.png)

* Click Create DB Subnet Group và config như bên dưới. Chú ý lựa chọn VPC là VPC đã create ở task 1

![](https://images.viblo.asia/78d27c22-08f7-420a-b01b-90d30f70a40b.png)

* Thực hiện add 2 Subnet Private đã tạo ở task 7. Click Create

![](https://images.viblo.asia/3965b76c-1336-4b93-9264-ffd7dbfd1a1a.png)

=> Task 9 đến đây đã hoàn thành.

### Task 10.Tạo 1 instance AWS RDS

* Click vào Databases ở thanh điều hướng, click vào Create databases để bắt đầu tạo RDS Instance

![](https://images.viblo.asia/4abd8a79-3bbb-42ee-be5d-405529a8c4cd.png)

* Config như bên dưới

![](https://images.viblo.asia/6d01eb49-1c67-4f1c-aa8a-5525cf3b6e2d.png)
![](https://images.viblo.asia/bc4747b7-c4ed-462e-bc14-bc40463fba27.png)
![](https://images.viblo.asia/710b8b54-f580-4780-a1db-f086189c1ab2.png)
![](https://images.viblo.asia/39a11dca-d804-4fb9-a173-21eee15bdf55.png)
![](https://images.viblo.asia/2dc8aaf3-2756-40b5-9191-73b266bbef92.png)
![](https://images.viblo.asia/3810187f-0eee-4436-9fa2-eb56cbcdce46.png)
![](https://images.viblo.asia/25132973-db6d-4d15-bda1-04aa108df580.png)
![](https://images.viblo.asia/ea503ec8-07c5-4abd-b798-58b1bf3fe306.png)
![](https://images.viblo.asia/f244c794-b108-46b4-a54a-155142c0a156.png)

* Sau khi Create RDS, đợi 1 lúc status của RDS sẽ chuyển qua available

![](https://images.viblo.asia/41a6d369-8c19-4b51-9d68-f04aedc1e6cb.png)

=> Task 10 đã hoàn thành. Mình đã deploy thành công MySQL database.

### Task 11.Kết nối application ở EC2 tới RDS

* Ở task này sẽ thực hiện connect app nằm ở WebServer (đặt ở Public Subnet) vào MySQL DB được đặt ở Private Subnet.
* Để thực hiện được, cần phải biết được "endpoint" của Instance RDS đã tạo ở Task 10. Để copy endpoint của RDS thì click vào tab Connect&Security.
Enpoint sẽ có dạng
> hoangngodb.ca7yw90sgomi.us-east-1.rds.amazonaws.com
> 
![](https://images.viblo.asia/6953c2d8-fe24-4ab4-90e7-c81cb83af279.png)

* Quay trở lại browser với địa chỉ IP Public của WebServer để thực hiện connect vào DB theo như bên dưới

![](https://images.viblo.asia/c8597b81-abcd-4e04-92ae-9efb8889e3d3.png)

* Nhấn submit là coi như việc kết nối thành công. Có thể thử Edit, Update 1 vài record để test

![](https://images.viblo.asia/7a1a81fc-ebf3-4266-b6f0-cd8782e1faeb.png)

=> Task 11 đến đây coi như hoàn thành và cũng hoàn thành bài Lab về VPC

### Tổng kết

Qua 2 phần part 1 và part 2 thì có thể tổng kết lại những gì đã tạo được qua sơ đồ như bên dưới

![](https://images.viblo.asia/3fbbfbb8-d2a3-4d78-9f9c-d8cd067167c5.png)

Sơ đồ này cũng là 1 kiến trúc khá Basic khi tìm hiểu về AWS. Qua bài lab mình cũng đã học thêm được khá nhiều kiến thức mới thú vị vầ có thể áp dụng trong công việc hiện tại.

Cảm ơn các bạn đã theo dõi.