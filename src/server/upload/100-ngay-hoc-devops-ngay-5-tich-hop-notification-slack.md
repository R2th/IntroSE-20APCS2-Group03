Chúng ta đã đi được tới buổi thứ 5 rồi , hy vọng các bạn dành thời gian cùng mình tham gia hết khóa này nha =)) .

gọi vui là trong thế giới giang hồ Devops thì không ai phủ nhận tầm quan trọng của việc Notification especially trong các trường xảy ra các sự cố liên quan đến hạ tầng như (Server Down/CPU Utilization high…) , Trong bài này mình sẽ hướng dẫn các bạn tích hợp CloudWatch với Slack .
![](https://images.viblo.asia/b4830f0f-d3e2-403a-b41e-c1debc63e085.jpeg)

Để thực hiện điều này thì chúng ta cần thực hiện theo những bước bên dưới .

   + Create an AWS Access key and Secret Key
   + Create an IAM Role
   + Deploy the lambda function
   + Create an SNS topic
   + Create a Cloudwatch Alarm


**Bước 1 : Create an AWS Access key and Secret Key**

 + Go to IAM console https://console.aws.amazon.com/iam/home?region=us-west-2#/home
 + Click on Users → Particular user → Security Credentials
 + Click on Create Access Key**

![](https://images.viblo.asia/577de6d3-191a-4d88-b680-a05f52a24c86.png)

Sau khi tạo xong thì bạn nên lưu lại Access Key vs Secret Key để cho lần sau sử dụng .

**Bước 2 : Create an IAM Role**

 + Go to IAM console https://console.aws.amazon.com/iam/home?region=us-west-2#/home
 +  Roles → Create role → AWS service → Lambda**
 +  

các bạn đọc full bài theo link nguồn bên dưới nha (Viblo bắt phải Download và upload hình host nên hơi phiền =))

Nguồn : https://techzones.me/devops/100-ngay-hoc-devops-ngay-5/