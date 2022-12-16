Chào các bạn, lần này mình sẽ hướng dẫn cách setup RDS và kết nối với EC2 trên AWS. Ở trong hướng dẫn này, chúng ta sẽ học cách tạo RDS (Relational Database Service) và cách cấu hình cho phép kết nối từ AWS EC2 Instance.
![WordPress-with-EC2-and-Amazon-RDS (1).png](https://images.viblo.asia/0bc3f3df-2922-49ad-bf48-9268e9917591.png)

### Đầu tiên cần chuẩn bị:
* Một tài khoản AWS đã được active.
* Một EC2 Instance đang chạy.

*Chú ý: Chúng ta nên setup RDS và EC2 trên cùng vùng (region) để hạn chế các vấn đề liên quan đến độ trễ của việc truy xuất dữ liệu.*

### Tạo RDS
Đầu tiên tại bảng điều khiển của AWS, gõ RDS vào thanh tìm kiếm và chọn RDS.

Tại Dashboard, chọn **Create Database.**

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.47.33.png](https://images.viblo.asia/de98e16c-2bbc-42e1-90cd-1954d0c6bdaf.png)

Bây giờ, chúng ta có thể định nghĩa những thông tin cần thiết.

Đầu tiên chọn cơ sở dữ liệu, ở đây mình sẽ chọn MySQL.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.49.08.png](https://images.viblo.asia/484f637f-4343-4dd3-aa9d-10c5b30ae8c7.png)
 
Tiếp theo đối với template, ở đây mình chọn **Free Tier** để được sử dụng miễn phí dịch vụ đến hạn mức tối đa sử dụng mỗi tháng.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.50.56.png](https://images.viblo.asia/47380c54-0445-44c2-835a-56db1aba020d.png)
 
Tiếp theo chúng ta sẽ đặt tên cho RDS Instance.

![Ảnh chụp Màn hình 2022-08-19 lúc 11.53.06.png](https://images.viblo.asia/271fa1e9-e5af-4d82-847f-5984f5a540de.png)

Ở mục **Configuration settings**, bạn sẽ phải nhập username và password. Bạn sẽ sử dụng nó để đăng nhập và quản lý instance này.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.54.27.png](https://images.viblo.asia/2c0af09b-aac9-4cf3-8678-c3c1e26dd7c3.png)
 
Chọn mặc định cho tất cả các cài đặt tiếp theo và lướt xuống mục **Additional configuration** and mở tab. Ở đây bạn sẽ có thể tạo database đầu tiên bằng cách nhập tên database ở mục **Initial database name**.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.56.28.png](https://images.viblo.asia/97c12fc0-df17-46eb-a3db-58325bd18129.png)
 
Tiếp tục cấu hình automatic backups và thời gian lưu trữ (optional).

Cuối cùng chọn **Create database** để tạo RDS Instance. 

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.57.08.png](https://images.viblo.asia/e6a0e9d1-63b2-4fe7-8928-3751cc7dbbf9.png)
 
Bây giờ RDS Instance sẽ được tạo.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 11.58.08.png](https://images.viblo.asia/b19e8f14-dfee-403b-952e-1a1c817e278d.png)
 
### Cấu hình RDS để cho phép sự kết nối từ EC2 Instance

Chọn RDS instance vừa tạo và chọn vào security group trong tab **Connectity & Security**. Chúng ta có thể cấu hình security group cho RDS Instance vừa tạo.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 13.04.53.png](https://images.viblo.asia/0f68ba6e-1a71-44f1-a43d-c6f01a5a1665.png)
 
Chọn tab **Inbound** và bấm nút **Edit** để thay đổi các rules cho security group. Chúng ta thay đổi thuộc tính **Type** thành **MYSQL/Aurora**.

 ![Ảnh chụp Màn hình 2022-08-19 lúc 13.26.51.png](https://images.viblo.asia/3273644b-8408-47dd-be78-8b80492ebe07.png)
 
Ở mục value group hãy nhập security group của EC2 Instance và bấm Save.

Quy tắc trên sẽ cho phép MYSQL kết nối với EC2 Instance.

### Kết luận:
Bây giờ bạn đã học cách setup RDS database and kết nối với EC2 Instance trên AWS.

Cảm ơn đã đọc hết bài viết, nếu gặp phải vấn đề gì hay có những feedback cho bài viết này, hãy để lại comment phía dưới nhé.