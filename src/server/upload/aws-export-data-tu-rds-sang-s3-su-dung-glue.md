## AWS Glue
AWS Glue là dịch vụ tích hợp dữ liệu server-less, giúp người dùng dễ dàng tìm kiếm, chuẩn bị và tổng hợp dữ liệu cho hoạt động phân tích, máy học và phát triển ứng dụng. AWS Glue cung cấp tất cả các chức năng cần thiết cho quá trình tích hợp dữ liệu để bạn có thể bắt đầu phân tích và đưa dữ liệu chỉ trong ít phút. Ở đây chúng ra có một database sử dụng dịch vụ RDS của AWS (hoặc Aurora), và sử dụng AWS Glue để đọc, tổng hợp dữ liệu, từ đó có thể gửi các dữ liệu này đến các nơi lưu trữ khác như S3, Redshift,...

## 1 Xây dựng môi trường chứa RDS database
### 1.1 Tạo VPC, subnet, internet gateway và route table
![image.png](https://images.viblo.asia/27168010-190e-4d50-b7bb-5178601c3743.png)

![image.png](https://images.viblo.asia/eb1efe51-5563-4fcf-8f53-167b237866d4.png)

![image.png](https://images.viblo.asia/44de6e47-3442-461e-aee4-680d94386313.png)

![image.png](https://images.viblo.asia/7d9e446a-f382-4a14-96ee-a6788c1c9784.png)

![image.png](https://images.viblo.asia/b3452af0-9362-4361-a71a-05368a18a031.png)

![image.png](https://images.viblo.asia/9b363513-1113-4ad7-8828-011a819fe6c0.png)

![image.png](https://images.viblo.asia/84fe5b11-3b5a-499b-ba4f-144a15ec957a.png)


![image.png](https://images.viblo.asia/0996e1f9-d302-486e-b8a6-9abc34c26694.png)

![image.png](https://images.viblo.asia/81cf80ce-688d-4c49-93b0-7b9fa1c9f9ad.png)

### 1.2 Tạo Security group để gắn vào database RDS
![image.png](https://images.viblo.asia/ba5255db-f053-44a2-8476-3ff7c5254328.png)

Sau khi tạo sercurity group, thêm một self reference để glue có thể truy cập RDS
![image.png](https://images.viblo.asia/7ff5fbb4-2b6e-4712-93ff-a5887589eed5.png)

## 2 Tạo database RDS
- Chọn MySql 5.x . Hiện tại Glue chưa hỗ trợ MySQL 8, có thể tham khảo cách config ở topic này https://stackoverflow.com/questions/56240778/aws-glue-unable-to-connect-to-mysql 

![image.png](https://images.viblo.asia/43c87335-247c-4142-bbe3-62bc085d8320.png)

- Chọn VPC và Security Group đã tạo ở mục 1, set public access để phục vụ việc fake data

![image.png](https://images.viblo.asia/bf107bac-9b9b-4b36-9129-c25ea1a33b74.png)

- Tạo dữ liệu mẫu

![image.png](https://images.viblo.asia/2447d14c-9dae-43a7-88b6-9fa83388846c.png)

- Tạo một VPC Endpoint với service type là S3 gateway
![image.png](https://images.viblo.asia/055e74b3-99ce-4e40-a026-a9f2eab8ecd4.png)

## 3 Tạo các service ở AWS Glue

### 3.1 Tạo Glue database
- Vào Glue > Databases > Create. Đây sẽ là nơi chứa dữ liệu được craw từ RDS trước khi export sang các service khác như S3, Redshift

![image.png](https://images.viblo.asia/6e7af6b4-94df-4047-8997-2e46baeea4e8.png)

### 3.2 Tạo Glue connection
- Tạo connection đến database RDS để Glue có thể truy cập vào và đọc dữ liệu 

![image.png](https://images.viblo.asia/28584c51-20f1-40c7-87cf-314f10503cdb.png)

- Data store là RDS instance đã tạo trước đó

![image.png](https://images.viblo.asia/b18d67eb-3d47-45ab-90b5-a1cac1efbd01.png)

![image.png](https://images.viblo.asia/805d7ef4-be41-4eb5-bd6a-1806bd5d04e6.png)


### 3.3 Tạo Glue table để lưu dữ liệu bằng Glue crawler 
- Vào Glue > Databases > Tables > Add tables using a arawler

![image.png](https://images.viblo.asia/68a8e5c9-4434-41f0-8052-b53e2312b776.png)

![image.png](https://images.viblo.asia/d733dfb6-dc92-4d3a-a2f7-78e0e7f3b47d.png)

![image.png](https://images.viblo.asia/4c2d26ba-78e6-42be-b097-96788431cfcb.png)

- Chọn connection là connection đã tạo ở 3.2, include path là <Tên database trong RDS>/< Tên table muốn lấy dữ liệu>

![image.png](https://images.viblo.asia/edc56c40-08f2-44d1-a68e-6a3c49da5802.png)

- Tạo một IAM role với policy là AmazonS3FullAccess và AWSGlueServiceRole

![image.png](https://images.viblo.asia/dd94601b-7c2a-4891-8f9e-97177845fad8.png)

- Đặt lịch chạy cho crawler, có thể đặt Run on demand (khi nào bấm nút thì chạy), custom (cron syntax), hằng ngày, hằng tuần, hằng tháng ... 
![image.png](https://images.viblo.asia/bed0ad5f-fc37-4ae7-8c74-6608e5c25693.png)

- Chọn Glue database

![image.png](https://images.viblo.asia/d7eeffa9-4f03-45b6-bef9-86eee9c68133.png)

![image.png](https://images.viblo.asia/bf549260-ade2-4a8c-9fa9-3f523c1d44b7.png)

- Nhấn finish và bạn sẽ được chuyển hướng đến trang list crawler, tại đây, nhấn nút Run crawler để chạy crawler

![image.png](https://images.viblo.asia/13e5f65b-ca88-47e2-b076-1839e00c50b5.png)

- Thông báo chạy thành công

![image.png](https://images.viblo.asia/e67f06d2-d56f-4393-a412-344524b1e872.png)

- Vào Glue > Databases > Tables sẽ thấy một table đã được tạo với tên là <Tên database RDS> _ <Tên bảng được crawl ở RDS>

![image.png](https://images.viblo.asia/a9d6d8fd-d27d-478e-86e2-aeefa1cd587a.png)

### 3.4 Tạo S3 Bucket để lưu trữ file export

![image.png](https://images.viblo.asia/34d3fcb1-cccb-4ace-af1f-6ac2b96dd110.png)

### 3.5 Tạo Glue Job để export dữ liệu từ Glue Database lên S3
- Vào Glue > Jobs > Add 

![image.png](https://images.viblo.asia/bda12e98-7f32-4f20-bbcf-6886e98fee45.png)

- Chọn data source là Glue table đã tạo bằng crawler trước đó

![image.png](https://images.viblo.asia/1f019bb0-fb2c-4984-83ba-bbdd45d41034.png)

![image.png](https://images.viblo.asia/41eb60bd-2ef5-4b16-97e3-afd5e4d83a53.png)

![image.png](https://images.viblo.asia/bb928a5b-0b82-4cf4-9897-eff92651c64e.png)

![image.png](https://images.viblo.asia/18cbdc9b-aa78-4a84-86e9-a568d7df4578.png)

- Chọn các cột cần export

![image.png](https://images.viblo.asia/80935ee1-c157-4305-98df-b0cfb4543205.png)

- Một script sẽ được sinh ra, nhấn nút Run job để chạy job
![image.png](https://images.viblo.asia/5dc1a558-0bdb-4906-97fd-09daf2984cf2.png)

- Trở về màn hình list job để kiểm tra, khi Job chạy thành công thì History sẽ có một record với Status là succeeded
![image.png](https://images.viblo.asia/411d572c-a239-4ffe-96e7-6b7b713397ba.png)

- Sau khi chạy thành công, kiểm tra trên S3 Bucket sẽ có file dữ liệu
![image.png](https://images.viblo.asia/aa3ce9d9-d012-4c07-b7b0-f70ba1af4fa1.png)

**Có thể đặt lịch để chạy Job export bằng Glue Trigger https://docs.aws.amazon.com/glue/latest/dg/about-triggers.html**

Nguồn:

- https://docs.aws.amazon.com/glue/latest