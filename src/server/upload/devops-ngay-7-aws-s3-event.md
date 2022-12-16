Chào mừng bạn quay trở lại đến với Ngày 7 của 100 ngày DevOps, Hãy kéo dài hành trình theo dõi và Alerting DevOps với các sự kiện S3.

Day 1 : https://techzones.me/devops/day-1-cloudwatch-metrics/

Day 2 : https://techzones.me/devops/100-ngay-hoc-devops-ngay-2/

Day 3 : https://techzones.me/devops/100-ngay-hoc-devops-ngay-3/

Day 4 : https://techzones.me/devops/100-ngay-hoc-devops-ngay-4/

Day 5 : https://techzones.me/devops/100-ngay-hoc-devops-ngay-5/

Day 6 : https://techzones.me/devops/100-ngay-hoc-devops-ngay-6-metric-filters/


**Problem Statement :**

   + Trong trường hợp thì bất cứ ai xóa đối tượng nào trong nhóm S3, bạn sẽ nhận được thông báo

**Solution :**

Bạn có thể thực hiện theo 2 cách bên dưới .

   + AWS Console
   + Terraform

**What is S3 Event?**

Tính năng thông báo của Amazon S3 cho phép bạn nhận thông báo (SNS / SQS / Lambda) khi một số sự kiện (được đề cập dưới đây) xảy ra trong bucket của bạn.
![](https://images.viblo.asia/9a3da428-bf1b-40f2-8a23-1e7110164882.png)
![](https://images.viblo.asia/45681a64-e38e-429f-97a0-95e7d9ade7bf.png)

Trong trường hợp này thì những thay đổi trên S3 như PUT, POST, COPY or DELETE , thì những sự kiện (events) đó sẽ được gửi đến (SNS, SQS or LAMBDA)

Bây giờ chúng ta sẽ cấu hình S3 Event .

   + First, go to the SNS topic https://us-west-2.console.aws.amazon.com/sns/v2/home?region=us-west-2#/home
   + Click on Topics → Actions → Edit topic policy

![](https://images.viblo.asia/c71ff759-5400-432d-a9b4-c316d70c519a.png)

+ sau đó paste đoạn Json này vào .

```
{

“Effect”: “Allow”,

“Principal”: {

“AWS”: “*”

},

“Action”: “SNS:Publish”,

“Resource”: “arn:aws:sns:us-west-2:XXXXXX:alarms-topic”, <–SNS Arn

“Condition”: {

“ArnLike”: {

“aws:SourceArn”: “arn:aws:s3:::s3-cloudtrail-bucket-with-terraform-code” <—Bucket name

}

}

}
```

   + Go to S3 console https://s3.console.aws.amazon.com/s3/home?region=us-east-1
   + Your bucket → Properties → Events

![](https://images.viblo.asia/7cfc8e37-8662-449e-bf95-da8e055f0615.png)

![](https://images.viblo.asia/b1abb886-cb3f-4bd3-a70c-4dc4f09e87b6.png)

Sau khi config xong thì chúng ta sẽ test thử là xóa 1 đối tượng trong nhóm S3 .

![](https://images.viblo.asia/00814504-9736-4308-aac3-2fb54ada9d91.png)

Như vậy là chúng ta đã config thành công sử dụng AWS CLI .

Tiếp theo sẽ sử dụng 1 phương pháp khác 

**Terraform Code**

```
provider “aws” {

region = “us-west-2”

}

resource “aws_sns_topic” “topic” {

name = “s3-event-notification-topic”

policy = <<POLICY

{

“Version”:”2012-10-17″,

“Statement”:[{

“Effect”: “Allow”,

“Principal”: {“AWS”:”“}, “Action”: “SNS:Publish”, “Resource”: “arn:aws:sns::*:s3-event-notification-topic”,

“Condition”:{

“ArnLike”:{“aws:SourceArn”:”${aws_s3_bucket.bucket.arn}”}

}

}]

}

POLICY

}

resource “aws_s3_bucket” “bucket” {

bucket = “s3-event-notification-topic-mydemo-bucket”

}

resource “aws_s3_bucket_notification” “bucket_notification” {

bucket = “${aws_s3_bucket.bucket.id}”

topic {

topic_arn = “${aws_sns_topic.topic.arn}”

events = [“s3:ObjectRemoved:*”]

}

}
```

Như vậy là đã hoàn thành 1 bài liên quan đến S3 Event Alert rồi .

Chúc các bạn thành công .

Nguồn : https://techzones.me/devops/devops-ngay-7-aws-s3-event/