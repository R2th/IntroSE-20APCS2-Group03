Tiếp tục với chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, sau bài viết hướng dẫn setting SNS thì tiếp đến mình sẽ giới thiệu về về các Management Tools (CloudWatch & CloudTrail) trên AWS

# 1. CloudWatch
### 1.1 CloudWatch là gì?

**Định nghĩa cơ bản**
- CloudWatch là một service cho phép người dùng giám sát hàng loạt các thuộc tính của AWS Account

**Định nghĩa của AWS** 
- Amazon CloudWatch giám sát toàn bộ các resource AWS mà người dùng đang sử dụng dựa theo thời gian thực. Chúng ta có thể sử dụng CloudWatch để **thu thập và tracking metrics**, đây là các biến số có thể thực hiện đo đạc để giám sát resource và application.
- CloudWatch còn có **setting Alarms gửi notifications hoặc tự động setting các thay đổi trên resource** người dùng đang giám sát **dựa trên các rules người dùng định nghĩa từ trước.**

1.2 CloudWatch Basics:

![](https://images.viblo.asia/55fba9c4-b39e-409d-ba8b-0a8ab1f951ef.png)

Chúng ta có thể sử dụng Cloudwatch để monitor các resource như sau:
- EC2: Tiêu thụ CPU, Status Checks, Disk Read/Write
- S3: Số lượng Objects, Size của buckets
- Billing: Tracking trên thời gian thực số tiền phải trả trong tháng tính tới thời điểm hiện tại
- Logs: Ghi lại log dựa trên prefix setting, nếu có các lỗi critical sẽ báo **Alarm** đồng thời gửi notification đến cho person in charge

![](https://images.viblo.asia/af9f1ef8-7a52-46c9-8eea-4139aaf7435b.png)

**Pricing/Cost Overview**
Detail Cloudwatch pricing info
https://aws.amazon.com/cloudwatch/pricing/

Free Tier Use cũng đang khả dụng trên CloudWatch

**Người dùng bị charged phí khi sử dụng CloudWatch như thế nào?**
- Theo từng Dashboard
- Detail Monitoring dựa trên các Amazon EC2 Instances
- Amazon CloudWatch Custom Metrics
- CloudWatch API Request
- CloudWatch Logs
- CloudWatch Events/Custom Events

# 2. CloudWatch Metrics và Alarms
**CloudWatch Metrics - Tạo một Daskboard**

- Chọn **Dashboards** trên thanh navigations và click **Create dashboard** và add name

![](https://images.viblo.asia/f1d2a506-412b-41d9-9738-f9c645bb1864.png)

![](https://images.viblo.asia/f8bcf39c-4385-4864-8000-0d077a5ea07f.png)


- Chọn **Add Widget**

![](https://images.viblo.asia/c7f508c3-20ab-4319-bbd8-55300429fe80.png)

- Chọn available metrics và chọn metrics cần add vào dashboard

![](https://images.viblo.asia/7a293d13-6d1f-4532-86ba-76154ae8976c.png)

- Tạo widget

![](https://images.viblo.asia/7acc183b-e24b-401e-a8ee-a269e50962b1.png)

**Ví dụ các bước tạo một Cloudwatch Alarm cho EC2 CPU Ultilization**

- Chọn Alarms trên thanh navigation, và chọn Create Alarm

![](https://images.viblo.asia/cbcbbb34-b701-4fca-ab81-03584e431867.png)

- Chọn category

![](https://images.viblo.asia/f43febbe-373e-4c28-aa83-6c595ec895a0.png)

- Chọn một metrics cần giám sát (VD: EC2 và CPU Ultilization)

![](https://images.viblo.asia/35d7b8a0-abac-45cd-877c-9562bb2e4217.png)

- Next page

![](https://images.viblo.asia/505863fb-dc4d-453a-a72b-7cb5abd02eed.png)

- Add thêm name và descriptions

![](https://images.viblo.asia/78ade2db-c71d-4973-ba4b-f2beae8779e0.png)

![](https://images.viblo.asia/f9c81086-5f79-4617-8b01-828dd8c029dc.png)

- Tạo Alarm thành công

![](https://images.viblo.asia/8822f407-b35c-47de-ae30-6d2ba63483d4.png)


# 3. CloudTrails Basics
3.1 CloudTrail là gì?
**Định nghĩa cơ bản**
- CloudTrail là service cho phép người dùng track một chuỗi các hoạt động khi sử dụng AWS Account

**Định nghĩa AWS**
- Amazon CloudTrails là một AWS Service giúp cho người dùng quản trị tuân thủ, hoạt động, và quản lý rủi ro cho AWS Account. 
- Tất cả các actions của từng người dùng, role, hoặc AWS service sẽ được lưu lại thành nhiều events trên CloudTrails.
- Các events này bao gồm các actions trong **AWS Management Console**, **AWS Command Line Interfaces** và **AWS SDKs** cũng như các **API**.


CloudTrails có thể tracking được hoạt động của toàn bộ user sử dụng AWS, toàn bộ log được lưu trữ dưới định dạng file **.gz** trên **S3**

![](https://images.viblo.asia/e431b5c2-611b-4af3-a9da-590e5556852f.png)

**Price/Cost Overviews**
Free tier không áp dụng cho CloudTrails, chúng ta chỉ có thể setup một bản trial và copy một version quản lý các event trên các region miễn phí.
AWS sẽ charge phí sử dụng S3 dựa trên usage

Chi tiết pricing info tham khảo:
https://aws.amazon.com/cloudwatch/pricing/