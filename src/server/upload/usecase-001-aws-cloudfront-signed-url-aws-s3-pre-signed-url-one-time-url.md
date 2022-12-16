Chào mọi người, dạo gần đây tôi đang ôn thi `AWS Solution Architect Professional`. Trong quá trình ôn thi, có một số `use case` khá hay, nó bao gồm cả `Solution` và `Security Best Practice` vì vậy tôi sẽ viết một series về các `Use Case` này.

AWS Cloud nói riêng và các nền tảng Cloud khác là tập hợp rất nhiều `services/components` (thường gọi là `native services/components` để phân biệt với các giải pháp `third-party`), do đó việc thiết kế cho một `workflow` hay một `system` trên Cloud sẽ phải nhúng `Security` vào từng `Services/Components`.

Do vậy, dù tôi đang là một `Security Engineer` nhưng tôi chọn `AWS Solution Architect` để theo đuổi. Hiểu sâu về kiến trúc `services/components` sẽ dễ dàng đánh giá được nó cần những tiêu chỉ bảo mật gì và nếu cần thiết thì chuyển ngành sang Cloud luôn (biết đâu chừng nếu mảng này thú vị) =)))

Loạt bài viết này tôi hướng tới 2 mục tiêu:
- Note lại các `Use Case` hay và có ích để có thể tham khảo về sau (nếu trí nhớ ngày càng dở tệ) =))
- Chia sẻ nho nhỏ những thứ hay ho đến các bạn trẻ có mục tiêu theo đuổi `AWS Solution Architect`.

Với những mục tiêu như trên thì bài viết sẽ **KHÔNG** tập trung quá nhiều vào những khái niệm cơ bản mà sẽ đi thẳng vào nội dung chính và nó sẽ dành cho những người đã có hiểu biết về AWS Cloud.

## Giới thiệu tổng quan
Trước khi đi vào trường hợp cụ thể như tiêu đề tôi đã viết, tôi sẽ lướt qua khái niệm một chút để gợi nhớ:
- **AWS Cloudfront** - ngắn gọn và dễ hiểu nó là dạng `CDN-as-a-service` cung cấp dịch vụ CDN cho nền tảng Web. CDN là gì thì bạn có thể đọc thêm ở bài viết [Tản mạn CDN và một số công nghệ xoay quanh CDN](https://viblo.asia/p/tan-man-cdn-va-mot-so-cong-nghe-xoay-quanh-cdn-V3m5WWq75O7) trước đó của tôi.
- **AWS S3** - ngắn gọn và đơn giản nó là dạng `Storage-as-a-service` cung cấp dịch vụ lưu trữ `Object Storage`.
- **AWS API Gateway** - thành phần API Gateway quản lý tập trung các API theo kiến trúc [`service-oriented architecture (SOA)`](https://en.wikipedia.org/wiki/Service-oriented_architecture). Chúng ta có thể làm rất nhiều thứ với nó bao gồm cả **Security API**, **Management API**, **Authentication & Authorization with SSO (SAML/OpenID&OAuth2)**.
- **AWS SNS/SES** - **AWS Simple Notification Service** và **AWS Simple Email Service**, đây là các dịch vụ cung cấp khả năng Notification và Email dựa theo trigger từ một event nào đó

## Use Case
Nào bây giờ chúng ta sẽ đi vào `Use case` mà tôi đã đề cập ở trên.

### Context
Trang thương mại điện tử cho phép khách hàng login bằng account của họ sau đó sử dụng chức năng **Tạo hóa đơn** để lấy hóa đơn của món hàng họ đã mua. Một số giải pháp đơn giản có thể có:
- **Case 1**: Sau khi khách hàng click tạo hóa đơn và chọn món hàng cần tạo hóa đơn --> Hệ thống sẽ tự động `generate` và lưu xuống máy khách hàng. Với trường hợp này sẽ có một số bất cập như sau:
    - Nếu khách hàng bị đánh cắp tài khoản thì dữ liệu này sẽ được lấy trực tiếp từ website --> Ảnh hưởng tính bảo mật dữ liệu.
- **Case 2**: Sau khi khách hàng click tạo hóa đơn và chọn món hàng cần tạo hóa đơn --> Hệ thống sẽ tạo ra một đường link và nhúng vào Button `Tải về`, khách hàng Click vào đó để tải hóa đơn về. Theo đó:
    - Link này sẽ phải thiết lập `Expire Time`, sau khi hết khoảng thời gian này đường link sẽ không còn tồn tại nữa --> Đảm bảo tính bảo mật dữ liệu. 
- **Case 3**: Sau khi khách hàng click tạo hóa đơn và chọn món hàng cần tạo hóa đơn --> Hệ thống sẽ tạo ra một `One-time URL` và gửi về email liên kết với tài khoản của khách hàng. Theo đó:
    - Đường link hóa đơn của khách hàng sẽ được bảo mật, khách hàng phải đăng nhập vào email để tải nó về.
    - Đường link chỉ được truy cập 1 lần do dó tăng cường thêm tính bảo mật cho dữ liệu.

### Notion
- **Case 1**: Case này hoàn toàn xử lý ở phía ứng dụng --> Tôi sẽ không đề cập trong bài viết này.
- **Case 2**: Case này chúng ta sẽ có một số hướng như sau:
    - Sử dụng `AWS Cloudfront Signed URL` và thiết lập policy `Expire Time` cho URL bằng cách sử dụng `Canned Policy` hoặc `Custom Policy`
    - Sử dụng `AWS S3 pre-signed URL` với thông số `Expiration Time` và `IAM Policy` cho phép thiết lập thêm một số điều kiện bổ sung (Eg: SourceIP, Read/Write Permission...)
    - Sử dụng kết hợp `AWS Cloudfront Signed URL` và `AWS S3 pre-signed URL`
- **Case 3**: Đối với `One-time URL`, một điều khá đáng tiếc là tính năng này AWS chưa hỗ trợ do đó ta sẽ phải xây dựng `workflow` để đạt được tính năng này:
    - **Step 1**: Sử dụng AWS S3 pre-signed URL để tạo ra `Temporary Link`.
    - **Step 2**: Lưu lại AWS S3 pre-signed URL trong AWS DynamoDB phục vụ theo dõi lượt truy cập của URL này.
    - **Step 3**: Expose `AWS S3 pre-signed URL` by AWS Cloudfront và sử dụng `Lambda@Edge` để `tracking/terminate` truy cập đến URL.

### How to work?
Về cơ bản, cơ chế hoạt động của cả `AWS Cloudfront Signed URL` và `AWS S3 pre-signed URL` đều sử dụng `Digital Signature` để đảm bảo tính `Non-repudiation` và để đảm bảo URL không bị chỉnh sửa.
Tuy nhiên, có một chút khác biệt nhỏ:
- `AWS Cloudfront Signed URL`: Cần chọn signer và phải tạo Key Pair phục vụ `Digital Signature`, có thể xem tại [Specifying signers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html).
- `AWS S3 pre-signed URL`: Key pair cho `Digital Signature` được tạo tự động trong quá trình tạo `presigned URL`.

Template `Signed URL` bà `presigned URL` trong mục `Appendix` bên dưới, các bạn có thể xem thêm.

### Design
#### Mô hình triển khai: `AWS Cloudfront Signed URL` + `AWS S3 pre-signed URL`

![image.png](https://images.viblo.asia/51529000-fc6f-4a27-bf79-00d38cab68e6.png)

Mô hình trên đã khá rõ ràng về flow hoạt động, tuy nhiên có một số lưu ý:
- Trong mô hình chưa có thành phần backend thực hiện các nghiệp vụ:
    - `Generate data file` và đẩy dữ liệu vào S3 Bucket.
    - Middle-ware phục vụ truyền tải dữ liệu giữa các thành phần, cụ thể là `Lambda Function` hoặc các thành phần `AWS Simple Queue Service`.
- Ở Step 4 trong mô hình có thể có 2 cách trả kết quả về cho User:
    - Trả về trực tiếp qua giao diện web như đã nói trong mục `Notion` ở trên.
    - Tích hợp với `AWS SNS (Simple Notification Service)` và gửi email chứa link cho khách hàng.

##### Hmm, vậy tại sao phải kết hợp cả 2 mà không phải là sử dụng từng giải pháp riêng rẽ? Lý do như sau:
- Dữ liệu lưu trữ trong S3 cho phép khách hàng truy cập do đó phải public S3 bucket.
- Đa phần Web Application sẽ sử dụng `AWS Cloudfront` phục vụ cải thiện hiệu năng của hệ thống --> Lúc này S3 Bucket là `Origin` của `Cloudfront` .
- Dữ liệu được tạo ra theo nhu cầu khách hàng --> Dữ liệu tạm thời.
- Nếu chỉ sử dụng 1 trong 2 phương án sẽ không đảm bảo tính nhất quán và tính bảo mật: người dùng có thể truy cập file được tạo ra thông qua Cloudfront URL hoặc trực tiếp truy cập S3 URL của file đó (nếu có thông tin).
    - Thiết lập Workflow Access Point duy nhất là Cloudfront (tất cả các request đều phải đi qua Cloudfront)
    - Access logs không nhất quán, khó khăn trong việc truy vết cũng như quản lý ứng dụng.
    - Phân tán về `Security Policy` & `Configuration Template` gây khó khăn trong việc triển khai, vận hành.
    - Nó sẽ có ích trong trường hợp cần sử dụng tính năng `One-time URL` sẽ trình bày bên dưới.

#### Security Policy
- **Đầu tiên**, chúng ta thiết lập IAM Policy chỉ cho phép Cloudfront OAI (Origin Access Identity) - một loại user đặc biệt của Cloudfront, có quyền Read trên S3 Bucket
```
{
    "Version": "2012-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/<Cloudfront_OAI_ID>"
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::<S3_BUCKET_NAME>/*"
        }
    ]
}
```
- **Thứ 2**, thiết lập `Expiration Time` trong khi tạo `AWS S3 pre-signed URL`
- **Thứ 3**, thiết lập `Canned Policy` hoặc `Custom Policy` cho `AWS Cloudfront Signed URL`
```
{
  "Statement": [
      {
          "Resource": "http://d111111abcdef8.cloudfront.net/game_download.zip",
          ("Resource": "http://d111111abcdef8.cloudfront.net/training/*",)
          "Condition": {
              "IpAddress": {
                  "AWS:SourceIp": "x.x.x.x/24"
              },
              "DateLessThan": {
                  "AWS:EpochTime": 1357034400
              },
              "DateGreaterThan": {
                  "AWS:EpochTime": 1357032200
              }
          }
      }
  ]
}
```

Phần tiếp theo sẽ là thiết kế cho chức năng `One-time URL` .

#### Mô hình triển khai `One-time URL`

![image.png](https://images.viblo.asia/9bd831e2-ed85-406e-898a-8b81ef119589.png)

Về cơ bản, luồng hoạt động của `One-time URL` vẫn dựa trên 2 tính năng cơ bản đã trình bày ở mục 1 (Cloudfront Signed URl và S3 Presigned URL), tuy nhiên sẽ có thêm 2 thành phần phục vụ `tracking` số lần truy cập của `Cloudfront signed URL` và `terminate` truy cập khi số lần truy cập = 1 (đảm bảo tính năng của `One-time URL`):
- Lambda@Edge: deploy dạng inline component phục vụ `tracking/terminate` URL
- DynamoDB: lưu trữ thông tin `Cloudfront Signed URL` đã tạo ra và gửi cho khách hàng.

Luồng hoạt động theo mô hình đã cũng đã quá clear rồi, `security` cho các thành phần cũng tương tự như mục 1. Điểm chú ý duy nhất ở đây là `Lambda@Edge` đây là 1 tính năng của `AWS Cloudfront` hoạt động ở ngay lớp Edge (nghĩa là ở gần với User nhất - ở ngay access point của application). Về chức năng thì cũng tương tự như `AWS Lambda function`.

Tuy nhiên, chúng ta không dùng `AWS Lamdba Function` vì cơ bản chúng ta cần theo dõi, xử lý các requests của khách hàng ở ngay lớp Edge do đó, nếu dùng `Lambda` các requests đã đi qua Cloudfront có thể gây ra một số hệ lụy về `Security` cũng như `Performance` của `application.`

### Appendix
- Template S3 presigned URL
```
https://<bucket_name>.s3-eu-west-1.amazonaws.com/test.txt
?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Credential=AKIAINGQCJMAROJWPJ3A%2F20180930%2Feu-west-1%2Fs3%2Faws4_request
&X-Amz-Date=20180930T145820Z
&X-Amz-Expires=900
&X-Amz-Signature=ebb4245bcd774a678c0685419ab5b4012845f61cea6aa2092661f89f3948cf8b
&X-Amz-SignedHeaders=host
```

- Template Cloudfront Signed URL
```
https://d2tphqjsvmbzmt.cloudfront.net/test.txt
?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Credential=AKIAINGQCJMAROJWPJ3A%2F20180930%2Feu-west-1%2Fs3%2Faws4_request
&X-Amz-Date=20180930T145820Z
&X-Amz-Expires=900
&X-Amz-Signature=ebb4245bcd774a678c0685419ab5b4012845f61cea6aa2092661f89f3948cf8b
&X-Amz-SignedHeaders=host
```

OK, kết thúc `Use Case - 001`, hi vọng chúng ta sẽ gặp nhau sớm tại `Use Case - 002`.
Bài viết sẽ có những vấn đề chưa được rõ ràng hoặc sai sót, hi vọng tôi sẽ nhận được những đóng góp từ bạn đọc.

Xin cảm ơn!