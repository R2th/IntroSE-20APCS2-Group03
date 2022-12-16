Chào mừng bạn quay trở lại trong chuỗi series Devops ngày 2 trong 100 ngày của mình, mình muốn bắt đầu hành trình này với một trong những khái niệm quan trọng nhất trong Simple Notification Service(SNS).
**Các bạn có thể theo dõi 100 ngày Devops tại đây**  [Link](https://techzones.me/devops/100-ngay-hoc-devops-ngay-4/)

**Problem Statement :**

Để gửi thông báo qua Email, SMS .. khi có sự kiện xảy ra.

**Solution :**

Điều này bạn có thể thực hiện được thông qua một trong 3 cách dưới đây :

**AWS Console**

**AWS CLI**

**Terraform**

**LƯU Ý**: Mình nhắc lại đây không phải là các danh sách đầy đủ thực hiện và có nhiều cách hơn để đạt được điều tương tự .

**SNS là gì?**

AWS SNS là một dịch vụ web dùng để điều phối và quản lý việc chuyển hoặc gửi tin nhắn đến các điểm cuối hoặc khách hàng đăng ký.
![](https://images.viblo.asia/d118a5d8-bc28-4d75-8fc1-dfba4652d29f.png)

mình đã thấy điều này hoạt động tốt đối với CloudWatch (Monitor CPU cao hoặc Kiểm tra trạng thái hệ thống), khi có 1 sự kiện nào đó xảy ra và SNS được sử dụng để gửi thông báo, CloudWatch kết hợp với SNS tạo ra một giải pháp giám sát đầy đủ và thông báo cho quản trị viên kịp thời trong các trường hợp có bất kỳ vấn nào xảy ra (vd CPU cao, Dftimeime, instance restart … ).

SNS có 3 thành phần chính :

**Publisher :**

+ kích hoạt việc gửi tin nhắn (ví dụ: CloudWatch Alarm ,Bất kỳ ứng dụng nào hoặc sự kiện S3 nào xảy ra )

**Topic :**

+ Đối tượng mà bạn muốn publish tin nhắn của mình (≤256KB)
+ Thuê bao đăng ký Topic để nhận tin nhắn
+ Chỉ giới hạn được 10tr subscribers

**Subscriber :**

+ Một điểm cuối cho một tin nhắn được gửi. Tin nhắn được đẩy đồng thời đến subscriber
![](https://images.viblo.asia/a93dd649-8336-4628-93da-bf72479d1c5a.png)

+ Như bạn có thể thấy nó tuân theo mô hình nhắn tin publish-subscribe (pub-sub) với thông báo được gửi đến khách hàng bằng một cú push, cơ chế này loại bỏ sự không cần thiết phải kiểm tra định kỳ hoặc nó tạo ra những poll để tìm hiểu thông tin và cập nhật lại .

+ Để tránh tin nhắn bị mất, tất cả các tin nhắn được push lên Amazon SNS đều được lưu trữ dự phòng trên nhiều Zone sẵn có.

Chúng ta hãy xem SNS hoạt động :

**1 – Using the AWS Console**
**Step1: Create a topic**

1 – In the Amazon SNS console, choose Create topic.

![](https://images.viblo.asia/424f662d-8b9e-43cb-ae0d-9bbcf3faa743.png)

**Step2: Subscribe to a Topic**

Choose to Create a subscription.
The Create Subscription dialog box appears.
![](https://images.viblo.asia/757ad9d4-55db-4e31-972d-5f57c00105bf.png)

Truy cập email của bạn và xác nhận đăng ký

![](https://images.viblo.asia/424f662d-8b9e-43cb-ae0d-9bbcf3faa743.png)

**Step3: Publish to the topic**

Choose the Publish to the topic button.
The Publish a Message page appears.
![](https://images.viblo.asia/13e3f867-ce04-4211-9e73-decbe79e602e.png)

**2 – Using AWS CLI
Step 1: Create a topic**

```
aws sns create-topic --name "my-demo-sns-topic"{"TopicArn": "arn:aws:sns:us-west-2:1234556667:my-demo-sns-topic"}
```

**Step2: Subscribe to a Topic**

```
aws sns subscribe --topic-arn arn:aws:sns:us-west-2:123456667:my-demo-sns-topic --protocol email --notification-endpoint test@gmail.com{"SubscriptionArn": "pending confirmation"}
```

**Step3: Publish to the topic**

```
aws sns publish --topic-arn arn:aws:sns:us-west-2:1234567:my-demo-sns-topic --message "hello from sns"{"MessageId": "d651b7d5-2d66-58c8-abe4-e30822a3aa3e"}
```

**To list all the subscriptions**

```
aws sns list-subscriptions{"Subscriptions": [{"Owner": "1234567889","Endpoint": "test@gmail.com","Protocol": "email","TopicArn": "arn:aws:sns:us-west-2:1234567788:HighCPUUtilization","SubscriptionArn": "arn:aws:sns:us-west-2:1234567788:HighCPUUtilization:a28e2be8-40cd-4f8b-83d9-33b2c858749d"},
```

**Unsubscribe from a Topic**

```
aws sns unsubscribe --subscription-arn arn:aws:sns:us-west-2:1234567899:my-demo-sns-topic:f28124be-850b-4a2e-8d3e-a3dc4f7cca1a
```

**Delete a topic**

```
aws sns delete-topic --topic-arn arn:aws:sns:us-west-2:1234567788:my-demo-sns-topic
```

**List a topic**

```
aws sns list-topics{"Topics": [{"TopicArn": "arn:aws:sns:us-west-2:123333345555:mydemosnstopic"}]}
```

**3 – Using Terraform**

**main.tf**

```
resource "aws_sns_topic" "alarm" {
  name = "alarms-topic"
  delivery_policy = <<EOF
{
  "http": {
    "defaultHealthyRetryPolicy": {
      "minDelayTarget": 20,
      "maxDelayTarget": 20,
      "numRetries": 3,
      "numMaxDelayRetries": 0,
      "numNoDelayRetries": 0,
      "numMinDelayRetries": 0,
      "backoffFunction": "linear"
    },
    "disableSubscriptionOverrides": false,
    "defaultThrottlePolicy": {
      "maxReceivesPerSecond": 1
    }
  }
}
EOF

  provisioner "local-exec" {
    command = "aws sns subscribe --topic-arn ${self.arn} --protocol email --notification-endpoint ${var.alarms_email}"
  }
}
```


**variables.tf**

```
variable "alarms_email" {
  default = "laprashant@gmail.com"
}
```

**outputs.tf**

```output "sns_topic" {
  value = "${aws_sns_topic.alarm.arn}"
}
```

Mình hy vọng các bạn tham gia hành trình này và dành tối thiểu một giờ mỗi ngày trong 100 ngày tiếp theo cho công việc DevOps .
Chúc các bạn thành công 🙂

Nguồn tham khảo : https://techzones.me/2019/09/26/100-ngay-hoc-devops-ngay-2/