Tiếp tục hành trình 100 ngày Devops nhé các bạn , ngày 4 này mình sẽ giới thiệu cấu hình cài đặt CloudWatch log agent Installation trên Centos7

Vấn đề cảnh cáo khi hệ thống có sự cố là vô cùng quan trong, chúng ta hãy đi tìm hiểu giải pháp bên dưới .

**Problem Statement :**
Việc chúng ta cần làm là Collect System log (/var/log/messages and /var/log/secure) và đẩy nó vào CloudWatch Logs
Tiếp đến là collect những metrics từ Memory, Disk Space, Swap Utilization

**Solution :**
+ AWS Console
+ AWS System Manager

**CloudWatch Logs là gì.**
Amazon CloudWatch được sử dụng để theo dõi, lưu trữ và truy cập các file logs từ Amazon Elastic Compute Cloud (Amazon EC2),  AWS CloudTrail, Route 53, DNS Logs hoặc từ những nguồn khác , và sau đó bạn có thể truy xuất dữ liệu logs được liên kết từ CloudWatch Logs
![](https://images.viblo.asia/d92cd387-46ff-41b2-8fb5-8158940d9be8.jpeg)

Continue reading ... [Link](https://techzones.me/devops/100-ngay-hoc-devops-ngay-4/)

(Viết bài trên Viblo phải down rồi upload hình lên mệt quá :D , nên tạm thời mình direct link sang bên dưới nha . có thời gian nhiều mình sẽ viết lên Viblo )

Nguồn : https://techzones.me/devops/100-ngay-hoc-devops-ngay-4/