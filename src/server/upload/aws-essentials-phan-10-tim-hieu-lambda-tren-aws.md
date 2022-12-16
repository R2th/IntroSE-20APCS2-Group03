Tiếp tục với chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, bài viết sau sẽ tiếp tục giới thiệu về Serverless Lambda trên AWS

# 1. Lambda Basics
**1.1 Khái niệm Lambda:**
- Định nghĩa cơ bản: Lambda là một máy tính không có máy chủ. Đây là thế hệ máy tính cloud tiếp theo sẽ thay thế các EC2 Instances (thay thế phần lớn)
- Định nghĩa của AWS: AWS Lambda là một service máy tính cho phép **người dùng run code mà không cần provisioning hay quản lý các servers**. AWS Lambda sẽ chỉ thực hiện chạy code khi cần thiết và sẽ sacle tự động, từ một vài request hàng ngày cho đến vài ngàn request mỗi giây. Người dùng chỉ phải trả phí Lambda khi khoảng thời gian chạy code - và sẽ không có chi phí phát sinh nào khi code không được chạy. Với AWS Lambda, người dùng có thể run code cho service ảo hay bất kì application cũng như backend service nào - Toàn bộ đều không cần effort quản lý. AWS Lambda chạy code của chúng ta với hệ cơ sở infra hiệu năng cao, luôn available và thực hiện toàn bộ các task quản lý của admin với các resource máy tính, bao gồm cả server và vận hành maintenance hệ thống cũng như ghi lại log. Tất cả những gì chúng ta cần làm đó là apply code của một trong những ngôn ngữ mà AWS support (Hiện tại có Node.js, Java, Go, C# và Python)

![](https://images.viblo.asia/77c7e464-8880-43bf-a1e9-0ac604a7a481.png)

Mô hình AWS cơ bản: Bao gồm rất nhiều thành phần như EC2, ELB, Internet Gateway, Route53,....

![](https://images.viblo.asia/e27e4b5f-dbe8-4423-82af-216d7d57eb5f.png)

Tuy nhiên đối với Lambda: Mô hình trở nên đơn giản hơn rất nhiều, user có thể connect trực tiếp với Lambda thông qua internet

![](https://images.viblo.asia/8b0fd143-30d4-49a1-b50f-2d4049b7dd2e.png)

**1.2 Pricing/Cost Overview:**
Lưu ý: Free Tier có áp dụng cho Lambda
Lambda sẽ được charge phí dựa trên:
- Các request (dùng để chạy code)
- Khoảng thời gian để tiến hành chạy code
- Access data từ các AWS service và resource khác

# 2. Create&Execute một Lambda function

### 2.1 Create Lambda function
![](https://images.viblo.asia/ecd1385f-e87b-4471-923d-d124a5b0576d.png)

2.1.1 Chúng ta có thể tiến hành lựa chọn một Lambda "blueprint" phù hợp hoặc tự config từ mục "Author from scratch"

![](https://images.viblo.asia/aafbd384-299f-4f92-9329-4fe9db29f2cd.png)

![](https://images.viblo.asia/2abbc5f1-8c8d-4a40-ab78-36d990e72893.png)

2.1.2 Config chức năng Lambda
- Config Lambda name

![](https://images.viblo.asia/fd9b0404-9c79-4d17-b8f2-3c8dd1d27efe.png)

- Edit runtime (nếu cần thiết)
Lưu ý, runtime tối đa của Lambda chỉ trong vòng 15 phút
- Tạo mới hoặc select một role (Việc chia role là rất cần thiết, vì mỗi Lambda chỉ nên đảm nhận một function nhất định, không nên chạy nhiều fucntion trên một Lambda)

![](https://images.viblo.asia/61885488-e2b7-436c-8d14-f7bb05a01cdc.png)

2.1.3 Lambda function code
- Enter hoặc edit code cần được execute ở phần này (Phải đảm bảo thời gian chạy code matchs với runtime)

![](https://images.viblo.asia/8d5cb6c6-4182-49e6-8759-9cf3542762ed.png)

2.1.4 Lambda execution role
- Chọn hoặc chỉnh sửa execution role (nếu cần thiết)

2.1.5 Advance settings
- Setting memory phù hợp (Thông thường memory cho function Lambda khoảng 512Mb)
- Chạy Lambda trong một VPC (settings này là optional)
- Encrypt các biến sử dụng AWS KMS (Key Management Service)
- Tags
- Debugging và handle error
- Auditing với CloudTrail


2.2 Executing Lambda function:
Có thể lựa chọn Lambdafunction từ list và click button Test để thực hiện test Lambda function

![](https://images.viblo.asia/15e095f3-b3ef-4a1c-aaff-3711d3b74b2f.png)

# 3. Ứng dụng của Lambda Function
Các ứng dụng cơ bản của Lambda function trong các dự án có thể kể đến những function sau:
- Chạy batch import data master thông quaLambda (Cơ chế trigger dựa trên việc upload file csv, gz lên S3)
- Liên kết dữ liệu giữa các hệ thống định kì (VD: 1 lần/ngày sẽ tự động  tạo file csv data như doanh số và up file lên S3, file này tiếp tục sẽ được upload lên S3 của hệ thống khác để tiến hành import vào hệ thống khác)

Còn rất nhiều ứng dụng khác của Lambda function để execute các function mang tính chu kỳ, hoàn toàn dựa vào thiết kế của các hệ thống.
Tuy còn một số hạn chế, nhưng không thể phủ nhận được tiềm năng của Lambda function đối với các hệ thống hiện tại. Dù chưa thể thay thế hoàn toàn được EC2, nhưng dần dần Lambda đang chứng minh được cơ chế tự động hoá dần đi đến hoàn toàn của mình.

Nguồn: linux arcademy