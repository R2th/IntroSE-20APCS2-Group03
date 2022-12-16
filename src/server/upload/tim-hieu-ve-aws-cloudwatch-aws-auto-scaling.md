### 1. AWS CloudWatch
Amazon CloudWatch giám sát tài nguyên Dịch vụ web Amazon (AWS) của bạn và các ứng dụng bạn chạy trên AWS trong thời gian thực. Bạn có thể sử dụng CloudWatch để thu thập và theo dõi các số liệu, đây là các biến bạn có thể đo lường cho các tài nguyên và ứng dụng của mình.

Trang chủ CloudWatch tự động hiển thị số liệu về mọi dịch vụ AWS bạn sử dụng. Bạn cũng có thể tạo bảng điều khiển tùy chỉnh để hiển thị số liệu về các ứng dụng tùy chỉnh của mình và hiển thị các bộ sưu tập số liệu tùy chỉnh mà bạn chọn.

Bạn có thể tạo báo thức theo dõi số liệu và gửi thông báo hoặc tự động thực hiện thay đổi đối với tài nguyên bạn đang theo dõi khi ngưỡng bị vi phạm. 

Với CloudWatch, bạn có được khả năng hiển thị trên toàn hệ thống về việc sử dụng tài nguyên, hiệu suất ứng dụng và tình trạng hoạt động.

### Cloudwatch có thể giám sát Amazon EC2 instances, Amazon DynamoDB tables, and Amazon RDS DB instances. 

### 1.1. CloundWatch metrics.
Ở đây mình sử dụng để theo dõi máy chủ ec2. Sau khi enable và mở tab monitoring thì sẽ thấy được tình trạng sử dụng tài nguyên của máy chủ.
![](https://images.viblo.asia/c12f1b91-6091-4e2d-a5bc-e6f03ace7b1e.png)

Trang chủ aws hiển thị một số biểu đồ cho biết tình trạng tài nguyên của ec2.
– Sử dụng CPU (%)

– Sử dụng bộ nhớ (%)

– Sử dụng mạng ngoài (MB)

– Bộ nhớ được sử dụng (MB)

– Bộ nhớ khả dụng (MB)

– Hoán đổi sử dụng (%)

– Hoán đổi sử dụng (MB)

– Sử dụng không gian đĩa (%)

– Dung lượng đĩa được sử dụng (GB)

– Dung lượng đĩa trống (GB)
...

![](https://images.viblo.asia/12a37e58-1e21-4956-8321-f0cb0408bcb1.png)
![](https://images.viblo.asia/6a167ce1-261e-4c5a-8c12-97c209c32c79.png)
Ngoài ra thì có thể create alarm để cảnh báo khi CPU Ram vượt quá mức mà chúng ta cài đặt alarm.

![](https://images.viblo.asia/83264723-2065-4975-97d3-d758e88e6437.png)

### 2. Auto Scaling
Với hạ tầng công nghệ truyền thống, sẽ có một lượng máy chủ vật lý nhất định để xử lý các công việc. Khi số lượng truy cập tăng lên, sẽ gây ra sự chậm trễ, sự cố khi xử lý hay thậm chí là không đủ tài nguyên để xử lý. Và gây ra treo instance. Không thể truy cập vào được.

Amazon cung cấp dịch vụ AWS Auto Scaling (tự động mở rộng) cho Amazon EC2 để khắc phục lỗi này. AWS Auto Scaling tự động nhân rộng để đảm bảo rằng các phiên bản Amazon EC2 đủ để chạy các ứng dụng của bạn. Bạn có thể tạo một nhóm AWS Auto Scaling trong các phiên bản EC2. Bạn có thể chỉ định số lượng phiên bản EC2 tối thiểu trong nhóm đó và tự động mở rộng sẽ duy trì và đảm bảo số lượng phiên bản EC2 tối thiểu. 

Sử dụng AWS Auto Scaling, bạn có thể tự động tăng hoặc giảm số lượng phiên bản EC2 đang chạy trong nhóm để đáp ứng các điều kiện thay đổi về nhu cầu lượng truy cập của khách hàng.
Mô hình auto scaling
![](https://images.viblo.asia/1898ecb4-4476-4351-8993-d3d36b88a427.png)

### 3. Auto Scaling hoạt động như thế nào?
– Xác định một phiên bản AMI và tạo Nhóm tự động mở rộng để khởi chạy các phiên bản.

– Bạn sử dụng CloudWatch để giám sát các cá thể máy chủ của mình và khi xảy ra một số sự kiện có thể định cấu hình nhất định, bạn có thể khởi chạy nhiều phiên bản khác dựa trên mẫu AMI mà bạn xác định.

– Các phiên bản EC2 khởi chạy phía sau Bộ cân bằng tải đàn hồi (ELB) mà bạn xác định.

– ELB sẽ gửi lưu lượng truy cập theo mô hình vòng tròn giữa tất cả các phiên bản được gán cho nó và bạn có thể kiểm soát trong thời gian thực bao nhiêu phiên bản bạn muốn khởi chạy để bao trùm các đợt lưu lượng truy cập lớn và giữ ít nhất một hoặc hai phiên bản đang chạy trong thời gian lưu lượng tạm ít hơn. Nếu bất kỳ phiên bản EC2 nào của bạn không phản hồi, ELB sẽ phát hiện nó và khởi chạy thay thế. Khi lưu lượng truy cập web ngừng hoạt động, bạn cũng có thể tự động chấm dứt các EC2.

– CloudWatch cho phép bạn định cấu hình các báo động kích hoạt các chính sách mở rộng tự động để khởi chạy các phiên bản EC2 bổ sung vào nhóm tự động mở rộng khi lưu lượng mạng, tải máy chủ hoặc các công cụ thống kê đo lường khác có mức độ sử dụng quá cao, trên 80%. Số lượng máy chủ mà bạn thêm dựa theo chính sách mở rộng mà bạn đã đặt ra. Mỗi máy chủ là một phiên bản trùng lặp của AMI mà bạn xác định trong cấu hình AWS Auto Scaling.

– ELB của bạn sẽ tự động phân tán khách truy cập đến giữa tất cả các máy chủ trong Nhóm tự động mở rộng của bạn. Bạn có thể đặt số lượng phiên bản tối thiểu và tối đa trong nhóm của mình, giúp bạn yên tâm rằng trang web của bạn sẽ không bị sập do lượng khách truy cập và cũng để hạn chế ảnh hưởng đến bảng sao kê thanh toán của bạn.

– Bạn cũng có thể yêu cầu AWS giảm số lượng phiên bản khi lưu lượng truy cập mạng đã giảm xuống, giả sử là dưới mức sử dụng 20% ​​trong một khoảng thời gian có thể đo lường được để thu nhỏ lại số lượng máy chủ trong cụm máy chủ web của bạn.