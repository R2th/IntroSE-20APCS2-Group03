Tiếp tục với chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, sau bài viết hướng dẫn setting Management Tools (CloudWatch & CloudTrail) trên AWS thì tiếp đến mình sẽ giới thiệu Auto Scaling trên AWS

# 1. Auto Scaling
### Auto Scaling là gì?
Trước tiên chúng ta sẽ cùng tìm hiểu Auto Scaling là gì:
- Khái niệm cơ bản: Auto Scaling là quy trình tự động add mới (scaling out) hoặc remove (scaling out) EC2 instance dựa trên yêu cầu traffic của application hoặc của hệ thống.
- AWS định nghĩa về Auto Scaling như sau: Auto Scaling cho phép người dùng có một con số chính xác về số lượng EC2 instance khả dụng để xử lý **tải của application**. Chúng ta có thể tạo ra một tập collections của các EC2 instance, được gọi là **Auto Scaling Group**. Người dùng cũng có thể chỉ định được số lượng EC2 instance min của từng Auto Scaling Group, và Auto Scaling sẽ điều chỉnh nhằm đảm bảo số lượng EC2 instace cung cấp cho hệ thống không bao giờ dưới con số này. Ngược lại, người dùng cũng có thể chỉ định số lượng EC2 instance max của từng Auto Scaling Group để đảm bảo số lượng EC2 instance cung cấp cho hệ thống không bao giờ vượt quá con số max. Nếu người dùng muốn chỉ định sức chứa mong muốn, người dùng có thể tạo group ngay tại thời điểm đó hoặc bất kì thời điểm nào sau này, Auto Scale sẽ luôn đảm bảo người dùng có đủ số lượng EC2 instance như mong muốn. Và nếu chúng ta chỉ định các scaling policy, Auto Scale có thể thực hiện launch hoặc terminate các instance dựa trên nhu cầu tăng hay giảm của Application.

# 2. Auto Scaling Basics:
### 2.1 Mô hình cơ bản của Auto Scaling

![](https://images.viblo.asia/f7c92b7b-cc4a-46ef-943d-a310cde37bc5.png)

![](https://images.viblo.asia/2d4fc751-70e8-431f-a256-38dd968728fa.png)

![](https://images.viblo.asia/b917d663-5904-40e6-9c50-d383f594fa01.png)

- Dựa vào traffic demand, ELB sẽ thực hiện cân bằng tải cho hệ thống, nếu tải traffic vượt quá khả năng xử lý của số lượng EC2 instace hiện có, Auto Scaling sẽ thực hiện launch thêm EC2 instance mới. 
VD: Nếu hệ thống có số lượng EC2 Instance min là 2. Mỗi EC2 instance có thể chịu tải tối đa khi có lượng truy cập là 3 user. Khi hệ thống có 6 user muốn truy cập cùng lúc vào hệ thống, ELB sẽ tự động cân bằng tải bằng cách cho group 3 user truy cập vào 2 EC2 Instane khác nhau
Note: Với trường hợp số lượng user truy cập đồng thời là 4 user. ELB cũng sẽ tự động cân bằng tải bằng cách cho group 2 user truy cập vào 2 EC2 Instance cùng lúc. Điều này nhằm đảm bảo server không bị overload và bị crash.

- Đồng thời cùng sẽ phát sinh case số lượng user muốn truy cập vào hệ thống vượt quá tải EC2 instance có thể chịu được. Khi ấy nếu ELB tiếp tục cho phép các user hiện tại truy cập vào các EC2 Instance hiện có thì sẽ dẫn tới việc bị overload, ảnh hưởng tới performance của toàn bộ hệ thống và nếu tiếp diễn trong một khoảng thời gian nhất định thì toàn bộ hệ thống sẽ bị crash. Impact range sẽ ảnh hưởng tới toàn bộ người dùng truy cập tại thời điểm đó.

![](https://images.viblo.asia/75859b93-d35a-4c82-8a52-e36c6326db1e.png)

![](https://images.viblo.asia/75859b93-d35a-4c82-8a52-e36c6326db1e.png)

- Khi ấy, Auto Scale sẽ tự động launch thêm một EC2 mới để chịu tải cho các lượt truy cập tăng bất thường.

![](https://images.viblo.asia/72351af8-c5e4-4191-a5e0-cfafed699ca6.png)

![](https://images.viblo.asia/72351af8-c5e4-4191-a5e0-cfafed699ca6.png)

- Sau đó, nếu lượng người dùng truy cập vào hệ thống giảm. Auto Scale sẽ tự động terminate các EC2 instance đang không sử dụng để tránh phát sinh chi phí

![](https://images.viblo.asia/6c13419a-9039-4b3d-8191-9e733082b677.png)

2.2 Pricing/Cost overview
Auto Scale có thể sử dụng FREE, tuy nhiên người dùng sẽ bị charge phí cho Auto Scale Provision (VD bất kì EC2 Instance nào vượt quá Free Tier thì sẽ tính phí Auto Scale Provision)

# 3. Setting Auto Scale
 Basic steps setting Auto Scale:
 - Chọn AMIs

![](https://images.viblo.asia/f3f684e7-fc67-4009-8a6d-e5082dae9c02.png)

- Chọn một Instance Type

![](https://images.viblo.asia/030c98df-5fdb-4f3a-aa22-a64fc99f2159.png)

- Tiến hành setting cho Launch template và khởi tạo launch template 

![](https://images.viblo.asia/95062964-c1fe-41af-a913-5edab2328a69.png)

![](https://images.viblo.asia/023cba87-a1ec-4496-bb09-82fe7f9fbac7.png)

![](https://images.viblo.asia/7d0beeb0-390c-47cd-a18e-0cc7fa25fd48.png)

![](https://images.viblo.asia/9fd19524-31d4-425c-80a8-621cd1c89398.png)

Optional: **bash script** để install Apache web server software
```
#!bin/bash
yum update -y
yum install -y httpd
service httpd start
```