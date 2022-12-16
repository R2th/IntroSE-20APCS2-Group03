Chào mừng bạn đến với Ngày 13 của 100 Ngày DevOps, Hãy tiếp tục hành trình này nhé .

Mục tiêu đơn giản chính là : **save cost**

**Problem** : Shutdown tất cả phiên bản EC2 trong tài khoản AWS Devlúc 6 giờ tối và open nó trở lại vào ngày hôm sau lúc 9 giờ sáng (Thứ Hai đến Thứ Sáu) . thật ra yêu cầu này vẫn có nhé mấy bạn .

**Solution** : Bạn có thể sử dụng Lambda function kết hợp các CloudWatch Event để làm việc này .

Một trong những thách thức lớn trong việc thực hiện điều này là đối với những Dev cần làm việc muộn và anh ta muốn run instance của mình quá 6h tối và những bản vá lỗi gấp , làm việc lúc cuối tuần ?
Một giải pháp phổ biến tôi đưa ra là chỉ định manual các danh sách trong Python Code (Lamda function)

**Step 1** : Chúng ta tạo IAM Role để Lambda có thể tương tác với Sự kiện CloudWatch

Go to IAM Console https://console.aws.amazon.com/iam/home?region=us-west-2#/home --> Roles --> Create role

![](https://images.viblo.asia/61bc4137-5692-42ec-9cc5-d63ad814c1f0.png)

Tiếp theo, chọn Create policy ,IAM Policy sẽ như thế này

```
{
“Version”: “2012-10-17”,
“Statement”: [
{
“Effect”: “Allow”,
“Action”: [
“logs:CreateLogGroup”,
“logs:CreateLogStream”,
“logs:PutLogEvents”
],
“Resource”: “arn:aws:logs:*:*:*”
},
{
“Effect”: “Allow”,
“Action”: [
“ec2:Start*”,
“ec2:Stop*”
],
“Resource”: “*”
}
]
}
```

**Step 2** : Create Lambda function

* Go to Lambda https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/home
* sau đó chọn Create Function

![](https://images.viblo.asia/2c2b1b8d-63ba-42fa-96e7-fb780ac7cc4e.png)


* Select Author from scratch
* Name: Give your Lambda function any name
* Runtime: Select Python2.7 as runtime
* Role: Choose the role we create in first step
* Click on Create function

Trong kịch bản tiếp chúng ta sẽ tạo 1 hàm để stop/start instance

![](https://images.viblo.asia/5091a205-536b-4979-9cb4-c166185d21e6.png)

**Stop instance code :**

```
import boto3
region = 'XX-XXXXX-X'
instances = ['X-XXXXXXXX']
def lambda_handler(event, context):
ec2 = boto3.client('ec2', region_name=region)
ec2.stop_instances(InstanceIds=instances)
print 'stopped your instances: ' + str(instances)
```

Note :

* Change the Value of region
* In the instance field specify instance id

**Start instance code :**

```
import boto3
region = 'XX-XXXXX-X'
instances = ['X-XXXXXXXX']
def lambda_handler(event, context):
ec2 = boto3.client('ec2', region_name=region)
ec2.start_instances(InstanceIds=instances)
print 'started your instances: ' + str(instances)
```

**Step 3** : Create CloudWatch event để kích hoạt chức năng Lambda này

* Open the Amazon CloudWatch console.
* Choose Events, and then choose Create rule.
* Choose Schedule under Event Source.

![](https://images.viblo.asia/c750898e-0c8f-4d54-b251-9566a3ed879b.png)


Tương tự cho việc Start instance

![](https://images.viblo.asia/1f300366-6c90-4636-9db2-44226a4c5397.png)

Note : chỗ này bạn chỉnh lại cấu trúc crontab theo ý muốn nhé (default theo UTC TimeZone)

Lambda function --> Monitoring --> View logs in CloudWatch

![](https://images.viblo.asia/038a01e9-f30e-462b-8d42-f80382a4d3d3.png)

khi stop instance nó tương tự thế này là đúng .

![](https://images.viblo.asia/8b4c89a8-64c1-467a-a18f-b4fcd701a72d.png)

khi start thì cũng tương tự .
![](https://images.viblo.asia/a25ac929-d333-494f-8c25-be0773ac48a2.png)

Như vậy là bạn đã tiết kiệm được khá nhiều chi phí cho cty bạn rồi , rồi đề xuất lấy tiền đó thưởng tết cho em =))

Chúc các bạn thành công .

Tham khảo : https://techzones.me/devops/stop-start-ec2-instance-on-schedule-basis-to-save-cost/