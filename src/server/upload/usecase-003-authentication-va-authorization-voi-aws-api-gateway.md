Tiếp tục với series `AWS UseCase`, chủ đề lần này sẽ là các phương pháp triển khai `Authentication/Authorization` với AWS API Gateway.

Nội dung `UseCase` sẽ bao gồm 2 phần:
1. Tìm hiểu sơ lược về SSO
2. Mô hình hoạt động và cách thức triển khai tích hợp 3rd IdP với `AWS API Gateway`.

# SSO là gì?
Single Sign-on (SSO) là phương thức xác thực, ủy quyền tập trung cho phép người dùng sử dụng thông tin đăng nhập duy nhất 1 lần và truy cập vào nhiều tài nguyên/dịch vụ.
Điều này sẽ đem lại sự tiện lợi cho cả khách hàng và người quản trị, theo đó cũng có thể cải thiện trải nghiệm người dùng.

Một ví dụ đơn giản nhất là chúng ta có thể sử dụng tài khoản Gmail, Facebook để đăng nhập vào rất nhiều website/service. Tuy nhiên, sự tiện lợi sẽ gây ra nhiều rủi ro về bảo mật.
Các vụ tấn công gây lộ lọt thông tin tài khoản Facebook/Gmail thường do người dùng sử dụng tính năng SSO này mà ra. Attacker thường sẽ khai thác thông tin này trên các website/service đã SSO với Facebook/Gmail.

Vấn đề bảo mật của SSO tôi sẽ không đề cập trong bài viết này.

Có 2 phương thức SSO phổ biến nhất hiện nay bao gồm:
- Security Assertion Markup Language (SAML): cung cấp Authentication + Authorization và thường sử dụng cho Web Identity.
- OpenID + OAuth2: OpenID cung cấp tính năng Authentication; OAuth2 cung cấp tính năng Authorization và thường sử dụng cho API Identity.

### Workflow
Về cơ bản, workflow của SSO sẽ như ảnh dưới. Tuy nhiên, còn thiếu phần Authorization trong đó:
- Với SAML, Authen + Author sẽ được thực hiện trong 1 lần request từ phía User.
- Với OpenID/OAuth2, thường sẽ yêu cầu User thực hiện 2 bước Authentication và Authorization.

![image.png](https://images.viblo.asia/ea194d0a-b329-4ea1-8019-3c51fcb5bc23.png)

# Tích hợp Identity Provider với AWS API Gateway 
Nào chúng ta đi vào nội dung chính, việc triển khai API thông tin `API Gateway` là tính năng rất phổ biến khi triển khai dịch vụ trên hạ tầng AWS.
Với khả năng `scaling` mạnh mẽ và việc tích hợp với `native service` trên AWS, `API Gateway` cung cấp tính sẵn sàng và tính linh hoạt rất cao.

Cùng điểm qua cách xác thực người dùng khi sử dụng `API Gateway`:
- Sử dụng `native Identity Provider` Amazon Cognito: identity pool + user pool
- Sử dụng Custom Authorizer với `Lambda Authorizer`
- `Application` tự quản lý user/pass bằng cách lưu trữ thông tin trong `DynamoDB` hoặc `AWS RDS`, lúc này `application` sẽ phải tự làm từ A-->Z. **Tôi sẽ không đề cập đến phương pháp này trong bài viết.**

### Amazon Cognito
`Amazon Cognito` là `native Identity Provider` của Amazon cho phép Authentication/Authorization cho Web Application và Mobile Application. `Cognito` gồm 2 thành phần chính:
- `User pool` cung cấp tính năng Authentication cho phép:
    - Lưu trữ thông tin xác thực của ứng dụng và hoạt động như một `Authentication Provider`.
    - Có thể `federate` với 3rd IdP cho phép xác thực người dùng thông qua Public Identity Provider.
- `Identity Pool` cung cấp tính năng Authorization
    - Có khả năng tích hợp với `User Pool` hoặc `External Authentication Provider`
    - Hỗ trợ `Guest User` (Unauthenticated User)

Bản thân `Amazon Cognito` đã cung cấp đầy đủ tính năng của `Identity Provider`, tuy nhiên điểm yếu của `Cognito` là `native AWS Service`, do đó việc triển khai `Multi-Cloud` là không khả thi. Do đó, việc tích hợp với 3rd IdP sẽ được ưu tiên hơn. Có thể có 2 dạng 3rd IdP:
- Public Identity Provider: Facebook, Google, Apple...
    - Đối với dạng IdP này, trong `Cognito Console` có option cho phép enable trực tiếp với App ID đã được tạo sẵn ở phía Facebook, Google, Apple...
- Customer-managed Identity Provider: AzureAD, ADFS...
    - Đối với dạng IdP này, chúng ta sẽ phải lựa chọn SAML hoặc OpenID/OAuth2 và phải thực hiện khai báo [`SAML Provider`](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_saml.html)/[`OpenID Provider`](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) trong `AWS IAM`. Có thể tham khảo link đã nhúng...

#### AWS Cognito Workflow
`Cognito` có thể có 2 workflow: [Basic (Classic) Flow; Enhanced (Simplified) Flow](https://aws.amazon.com/blogs/mobile/understanding-amazon-cognito-authentication-part-4-enhanced-flow/). Với các ứng dụng hiện nay, `Enhanced Flow` sẽ mặc định được sử dụng khi tạo `Identity Pool`. Chúng ta có `workflow model` khi tích hợp với `3rd Identity Provider` như sau:

![image.png](https://images.viblo.asia/378b49ac-4b3b-4da4-ba8d-b4f22351b161.png)

Với AWS chúng ta luôn luôn sử dụng `AWS Service Token Service` để cấp quyền truy cập tạm thời vào `AWS Service` và `AWS Cognito` sẽ cần cung cấp quyền invoke API `sts:AssumeRoleWithWebIdentity` để tương tác với `AWS STS`.

Chúng ta có Workflow hoàn chỉnh khi tích hợp với `AWS API Gateway` như sau:

![image.png](https://images.viblo.asia/fb894b48-22c3-46d5-a149-8da3fcb2fda6.png)

### Lambda Authorizer
`AWS Cognito` không hỗ trợ dạng `custom authorization scheme`:
- KHÔNG hỗ trợ `Bearer Token` with OAuth/SAML.
- KHÔNG hỗ trợ nhận diện người dùng bằng HTTP Parameter/Header.

Trong trường hợp này sẽ sử dụng một thành phần trung gian là `Lambda Authorizer` được xây dựng bằng `AWS Lambda` cho phép xây dựng `Authorization scheme` theo ý muốn.
Với `Lambda Authorizer` chúng ta có thể thực hiện 2 hành động:
- Verify Token từ `Authorization Header` trong HTTP Request của người dùng.
- Tạo `Dynamic IAM Polices` dựa vào thông tin người dùng trong HTTP Request (Parameter, Header)

Chúng ta có flow đơn giản như sau:

![image.png](https://images.viblo.asia/ca0ef364-eeed-4525-ba70-20d66de4adea.png)

**Vậy câu hỏi đặt ra là tại sao phải sử dụng `Dynamic IAM Polices`?**

Vâng, vấn đề ở đây là khi các ứng dụng được xây dựng nhằm cung cấp cho nhiều/rất nhiều người dùng hoặc trong môi trường `multi-tenant` thì việc `isolation multi-tenant` rất quan trọng.
Theo đó, nếu việc lưu trữ tài nguyên của mỗi `user` hoặc mỗi `tenant` tại `S3 bucket` đại diện bởi `Username` hoặc `TenantID` thì với mỗi HTTP Request, `application` phải nhận diện được `User/tenant` phục vụ gán quyền truy cập chính xác vào `bucket` hoặc `resource` liên kết với `User/tenant` đó.

Cùng xem một `IAM Policy Template` với `dynamic attribute` như bên dưới:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::myBucket"],
      "Condition": {"StringLike": {"s3:prefix": ["Amazon/mynumbersgame/${www.amazon.com:user_id}/*"]}}
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::myBucket/amazon/mynumbersgame/${www.amazon.com:user_id}",
        "arn:aws:s3:::myBucket/amazon/mynumbersgame/${www.amazon.com:user_id}/*"
      ]
    }
  ]
}
```
Với template này có thể lưu trữ tại S3 bucket, với mỗi request của User sẽ được `grant permission` vào đúng S3 bucket của User đó. Và đây chính là quá trình `Authorization` cho phép User truy cập vào dữ liệu của họ.

Đối với `Lambda Authorizer` cũng có [language-based template](https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints) được build sẵn, bạn đọc có thể tham khảo tại link đã nhúng.

#### Nâng tầm Lambda Authorizer
Để đơn giản hóa việc quản lý cũng như tạo `dynamically IAM policies`, AWS đã giới thiệu `Token vending machine` với ý tưởng là đút cái JWT (JSON web token) vào là nó nhả ra `IAM Policies` =))

Chúng ta có thể deploy một cách đơn giản sử dụng `AWS Cloudformation` theo hướng dẫn [Link ở đây](https://aws.amazon.com/blogs/mobile/simplifying-token-vending-machine-deployment-with-aws-cloudformation/).

Cơ chế hoạt động của `Token vending machine` trong [Link ở đây](https://aws.amazon.com/blogs/apn/isolating-saas-tenants-with-dynamically-generated-iam-policies/).

Viết đến đây tui mệt lắm rồi! Bài viết xin kết thúc ở đây!

Chúng ta sẽ gặp lại ở chủ để tiếp theo, cơ mà để tui nghĩ tiếp đã =)) Tạm biệt!