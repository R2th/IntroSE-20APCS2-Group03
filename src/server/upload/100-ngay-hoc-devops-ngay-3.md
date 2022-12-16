Chào mừng bạn đến với ngày 3 trong 100 ngày của DevOps, hãy kéo dài chuỗi hành trình theo dõi
chúng ta hãy bắt đầu với Alerting for CloudTrail.

**Các bạn có thể theo dõi 100 ngày Devops tại đây**  [Link](https://techzones.me/devops/100-ngay-hoc-devops-ngay-4/)


**Problem :**
Tất cả logs trong phần API của tài khoản AWS (bao gồm AWS Console, CLI và API / SDK)

**Solution :**

Bạn có thể thực hiện thông qua 3 cách dưới đây .

+ AWS Console
+ AWS CLI
+ Terraform

**AWS CloudTrail là gì?**


AWS CloudTrail là một dịch vụ cho phép thực hiện việc quản lý, tuân thủ, kiểm tra vận hành và đánh giá rủi ro cho tài khoản AWS của bạn. Với CloudTrail, bạn có thể ghi nhật ký, giám sát liên tục và duy trì hoạt động của tài khoản có liên quan đến các hoạt động diễn ra trên cơ sở hạ tầng AWS của bạn. CloudTrail cung cấp lịch sử sự kiện cho hoạt động tài khoản AWS của bạn, bao gồm cả những hoạt động được thực hiện qua Bảng điều khiển quản lý AWS, AWS SDK, công cụ dòng lệnh và dịch vụ AWS khác. Lịch sử sự kiện này đơn giản hóa phân tích bảo mật, theo dõi thay đổi tài nguyên và xử lý lỗi.
![](https://images.viblo.asia/acac725b-e973-43e1-93e1-98b0fb308e42.jpeg)

+ Nó được kích hoạt khi tài khoản được tạo thành công (trong 7 ngày)
+ Khi có activity xảy ra trong tài khoản AWS của bạn, hoạt động đó được ghi lại trong sự kiện CloudTrail.
+ Bạn có thể xem lại trong Event history (trong 90 ngày)
+ Event logs có thể được tổng hợp trên các tài khoản và khu vực.

NOTE :

+ CloudTrail không được bật theo mặc định
![](https://images.viblo.asia/8850a23c-de9d-4ff3-b8bc-2181e5030aa5.png)

Để có activity và event trong tài khoản AWS của bạn, bạn hãy tạo 1 trail. và cầu hình nó cho phép gửi logs đến nhóm S3 và có thể là single region hoặc multi-region.

**Create a trail :**

`
Go to AWS Console --> Management & Governance --> CloudTrail --> Trails --> Create trail 
`
![](https://images.viblo.asia/18c80c96-856d-474d-83a1-39e7d67fd34e.png)
![](https://images.viblo.asia/654cee40-8132-4235-b5c1-1e2f6d72e45f.png)

**Chú thích :**

**Trail name** : Tên Trail bạn muốn đặt .

**Apply trail to all regions** : Một tùy chọn để bạn chọn tất cả các khu vực hoặc khu vực cụ thể nào đó .

**Read/Write events** : Lọc các Event

**S3** : Bạn có thể ghi lại hoạt động API cấp đối tượng S3 (ví dụ: GetObject và PutObject) cho các nhóm riêng lẻ hoặc cho tất cả các nhóm hiện tại và tương lai trong tài khoản AWS của bạn

**Storage Locations** : Nơi lưu trữ Logs, bạn có thể tạo nhóm mới hoặc sử dụng nhóm hiện có

**Encrypt log file with SSE-KMS** : Mã hóa phía máy chủ SSE-S3 mặc định (AES-256) hoặc chúng ta có thể sử dụng KMS


NOTE :

+ Luôn có độ trễ giữa sự kiện (events) xảy ra so với hiển thị trên bảng điều khiển CloudTrail
+ Được gửi cứ sau 5 phút (hoạt động) vs với độ trễ tối đa 15 phút
+ Tất cả CloudEvents đều là cấu trúc JSON

![](https://images.viblo.asia/18b98813-ccdd-42e6-a761-73b4cba7ca30.png)
![](https://images.viblo.asia/e52b3119-e8f4-43ef-b044-a5cec8a17be5.png)
Validating CloudTrail Log File Integrity

+ Để xác định xem file logs nào đã được sửa đổi, xóa hoặc không thay đổi sau khi CloudTrail phân phối, bạn có thể sử dụng tính xác thực, tính toàn vẹn của file logs trên CloudTrail.
+ Tính năng này được xây dựng bằng các thuật toán tiêu chuẩn như: SHA-256 hashing và SHA-256 và dùng RSA để digital signing.
+ Điều này làm cho nó không thể để sửa đổi, xóa hoặc giả mạo các file logs trên CloudTrail mà không bị phát hiện.
+ Bạn có thể sử dụng AWS CLI để xác thực các file ở vị trí nơi CloudTrail phân phối 
+ 
![](https://images.viblo.asia/c03b75e2-f4a0-4191-8f6d-a337dd2fcd98.png)
Nếu bạn muốn xác thực các bản ghi thì thực hiện trên Command line

`aws cloudtrail validate-logs --trail-arn arn:aws:cloudtrail:us-east-1:XXXXXXX:trail/mytestcloudtrail --start-time  2018-12-27T00:09:00Z  --end-time 2018-12-27T00:10:00Z  --verbose`

Tiếp theo hãy quay trợ lại Trail để cấu hình .
![](https://images.viblo.asia/cad02c5e-eccd-4d6a-b875-649f249f8fcd.png)
![](https://images.viblo.asia/05737cd0-5fef-4512-a1bb-a97a7f560c4b.png)
![](https://images.viblo.asia/638f7b11-95e7-4866-99f7-6fead734681e.png)
Trong CloudWatch logs, bạn sẽ thấy logs group mới được tạo
![](https://images.viblo.asia/25852b31-d423-4892-b20a-d7daf4ac2218.png)

Giờ mình sẽ quay lại sử dụng AWS CLI để tạo .
AWS CLI :

**Create Trail ( Single Region )**

`aws cloudtrail create-trail --name my-test-cloudtrail --s3-bucket-name mytests3bucketforcloudtrail{"IncludeGlobalServiceEvents": true,"IsOrganizationTrail": false,"Name": "my-test-cloudtrail","TrailARN": "arn:aws:cloudtrail:us-west-2:XXXXXXXXX:trail/my-test-cloudtrail","LogFileValidationEnabled": false,"IsMultiRegionTrail": false,"S3BucketName": "mytests3bucketforcloudtrail"}`

**Create Trail ( multi-region)**

`aws cloudtrail create-trail --name my-test-cloudtrail-multiregion --s3-bucket-name mytests3bucketforcloudtrail --is-multi-region-trail{"IncludeGlobalServiceEvents": true,"IsOrganizationTrail": false,"Name": "my-test-cloudtrail-multiregion","TrailARN": "arn:aws:cloudtrail:us-west-2:XXXXXXXXX:trail/my-test-cloudtrail-multiregion","LogFileValidationEnabled": false,"IsMultiRegionTrail": true,"S3BucketName": "mytests3bucketforcloudtrail"}`

**Kiểm tra trạng thái và list all .**

`aws cloudtrail describe-trails{"trailList": [{"IncludeGlobalServiceEvents": true,"IsOrganizationTrail": false,"Name": "my-test-cloudtrail","TrailARN": "arn:aws:cloudtrail:us-west-2:XXXXXXXXXX:trail/my-test-cloudtrail","LogFileValidationEnabled": false,"IsMultiRegionTrail": false,"HasCustomEventSelectors": false,"S3BucketName": "mytests3bucketforcloudtrail","HomeRegion": "us-west-2"},{"IncludeGlobalServiceEvents": true,"IsOrganizationTrail": false,"Name": "my-test-cloudtrail-multiregion","TrailARN": "arn:aws:cloudtrail:us-west-2:XXXXXXXXXX:trail/my-test-cloudtrail-multiregion","LogFileValidationEnabled": false,"IsMultiRegionTrail": true,"HasCustomEventSelectors": false,"S3BucketName": "mytests3bucketforcloudtrail","HomeRegion": "us-west-2"}`

**Start logging for the trail**


`aws cloudtrail start-logging --name my-test-cloudtrail`

**To verify if logging is enable**


`aws cloudtrail get-trail-status --name my-test-cloudtrail{"LatestDeliveryTime": 1550014519.927,"LatestDeliveryAttemptTime": "2019-02-12T23:35:19Z","LatestNotificationAttemptSucceeded": "","LatestDeliveryAttemptSucceeded": "2019-02-12T23:35:19Z","IsLogging": true,"TimeLoggingStarted": "2019-02-12T23:34:58Z","StartLoggingTime": 1550014498.331,"LatestNotificationAttemptTime": "","TimeLoggingStopped": ""}`

**To enable log file validation**

`aws cloudtrail create-trail --name my-test-cloudtrail-multiregion-logging --s3-bucket-name mytests3bucketforcloudtrail --is-multi-region-trail --enable-log-file-validation{"IncludeGlobalServiceEvents": true,"IsOrganizationTrail": false,"Name": "my-test-cloudtrail-multiregion-logging","TrailARN": "arn:aws:cloudtrail:us-west-2:349934551430:trail/my-test-cloudtrail-multiregion-logging","LogFileValidationEnabled": true,"IsMultiRegionTrail": true,"S3BucketName": "mytests3bucketforcloudtrail"}`

**To delete a particular trail**

`aws cloudtrail delete-trail --name my-test-cloudtrail-multiregion-logging`

**List all Command :**

**Create Trail(Single Region)**

`aws cloudtrail create-trail --name my-test-cloudtrail --s3-bucket-name mytests3bucketforcloudtrail`

**Create Trail(That applies to multi-region)**

`aws cloudtrail create-trail --name my-test-cloudtrail-multiregion --s3-bucket-name mytests3bucketforcloudtrail --is-multi-region-trail `

**To get the status/list all the trails**

`aws cloudtrail describe-trails`

**Start logging for the trail**

`aws cloudtrail start-logging --name my-test-cloudtrail`

**To verify if logging is enabled**

`aws cloudtrail get-trail-status --name my-test-cloudtrail`

**To enable log file validation**

`aws cloudtrail create-trail --name my-test-cloudtrail-multiregion-logging --s3-bucket-name mytests3bucketforcloudtrail --is-multi-region-trail --enable-log-file-validation`

**To delete a particular trail**

`aws cloudtrail delete-trail --name my-test-cloudtrail-multiregion-logging`

**Sử dụng Terraform để tạo :**

`
provider "aws" {
   region = "us-west-2"
 }
 resource "aws_cloudtrail" "my-demo-cloudtrail" {
   name                          = "my-demo-cloudtrail-terraform"
   s3_bucket_name                = "${aws_s3_bucket.s3_bucket_name.id}"
   include_global_service_events = true
   is_multi_region_trail         = true
   enable_log_file_validation    = true
 }
 resource "aws_s3_bucket" "s3_bucket_name" {
   bucket = "s3-cloudtrail-bucket-with-terraform-code"
   policy = <<POLICY
 {
   "Version": "2012-10-17",
   "Statement": [
 {
    "Sid": "AWSCloudTrailAclCheck",
    "Effect": "Allow",
    "Principal": {
       "Service": "cloudtrail.amazonaws.com"
 },
  "Action": "s3:GetBucketAcl",
  "Resource": "arn:aws:s3:::s3-cloudtrail-bucket-with-terraform-code"
 },
 {
 "Sid": "AWSCloudTrailWrite",
 "Effect": "Allow",
 "Principal": {
   "Service": "cloudtrail.amazonaws.com"
 },
 "Action": "s3:PutObject",
 "Resource": "arn:aws:s3:::s3-cloudtrail-bucket-with-terraform-code/*",
 "Condition": {
   "StringEquals": {
      "s3:x-amz-acl": "bucket-owner-full-control"
   }
 }
   }
   ]
   }
   POLICY
 }
 `

Mình hy vọng các bạn tham gia hành trình này và dành tối thiểu một giờ mỗi ngày trong 100 ngày tiếp theo cho công việc DevOps .
Chúc các bạn thành công

Nguồn : https://techzones.me/2019/09/30/100-ngay-hoc-devops-ngay-3/