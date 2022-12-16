### 1. IAM là gì?
![](https://images.viblo.asia/8e4ff104-e210-4953-a1a1-e3715b64ea23.png)

AWS **Identity** and **Access** Management (IAM) cho phép bạn **quản lý truy cập** vào các **dịch vụ** và **tài nguyên** AWS một cách **bảo mật** mà không cần chia sẻ thông tin user, password. Đây là Global Service.
 

* **Identity = Authentication**
* **Access = Authorization**

![](https://images.viblo.asia/ca2107d6-6498-41af-b3f9-aecdc364fc62.png)

### 2. IAM features
**Share access permission**

* IAM cho phép admin có thể chia sẻ và gán quyền cho các users là thành viên của projects hoặc các thành viên liên quan sử dụng tài nguyên của AWS.  

**Granular permission**
* IAM cho phép gán quyền cụ thể và chi tiết đối với từng user, từng service và từng action cụ thể.

**Using role to access AWS resource**
* IAM cho phép các ứng dụng chạy trên dịch vụ compute EC2, có quyền truy cập vào các tài nguyên khác của AWS, nhờ việc cung cấp các Credentials một cách bảo mật, bằng cách sử dụng IAM role.
![](https://images.viblo.asia/cb7527d6-1eba-48d9-80e7-ee0a1e104000.png)

**Multi-Factor-Authenticator (MFA)**
* IAM cho phép thêm các lớp bảo mật, bảo mật 2 lớp. Việc này nhằm nâng cao mức độ bảo mật của tài khoản, tránh rủi ro không đáng có khi bị lộ thông tin.
![](https://images.viblo.asia/98bcc650-17d9-4abc-be5d-18fcee0ec755.png)

**Identity Federation**

IAM cho phép các users sử dụng các tài nguyên AWS thông qua việc xác thực từ các Identity Provider như Google, Facebook, Microsoft Active Directory (IdP) 

**Identity Information for assurance**

* IAM cho phép cung cấp thông tin các thực thể đã thao tác, hành động, truy cập trên tài nguyên của AWS cho các dịch vụ lưu lược sử như CloudTrail nhằm mục đích kiểm tra - truy vết.

### 3. Thuật ngữ liên quan đến IAM
**a. Users & Groups**
* **Root account** được tạo ra mặc định, không nên được sử dụng hay được chia sẻ.
* **User** là thành viên trong 1 project, và có thể được thêm vào group để dễ dàng quản lý và cấp quyền.
* **Group** chỉ gồm users, không bao gồm groups.
* Users không nhất thiết phải thuộc về group, 1 user có thể thuộc 1 hoặc nhiều group khác nhau. 
![](https://images.viblo.asia/f193a126-795b-477a-9af8-c224ad24a951.png)

**b. Permission**

--> **Users hoặc Groups hoặc Role** sẽ được gán permissions trong Policy.

--> **Policy** là một văn bản được viết dưới dạng JSON, định nghĩa quyền hạn cho các thực thể User, Group, Role.

--> Tham khảo mẫu policy [ở đây](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html)
![](https://images.viblo.asia/21894ef8-dd1e-4889-a091-e92e38863702.png)

### 4. User truy cập vào AWS bằng cách nào?
- User có thể thông qua 3 cách:

  1. **AWS Management Console** (authen với password + MFA)
  2. **AWS Command Line Interface** (authen với access_keys)
  3. **AWS Software Developer Kit** - cho phần code (authen với access keys)

- Access Keys được tạo ra từ AWS Console.
- User tự quản lý access_key của mình.
- Access keys chính là password, không được chia sẻ chúng.
- Access Key ID ~= username
- Secret Key ID ~= password

Ví dụ về 1 Acccess Key được tạo trên AWS
![](https://images.viblo.asia/fe8ab989-a4cf-449d-9017-25058b8bd50d.png)

### 5. IAM Roles cho Services:
- Một vài AWS service sẽ cần phải hành động thay bạn.
- Để làm được như vậy, ta gán permissions tới AWS Services thông qua IAM Roles.
- Role phổ biến:
  1. EC2 Instance Roles
  2. Lambda Function Roles
  3. Roles for CloudFormation

### 6. IAM Security Tools
- **IAM Credentials Report (account-level)**

Là loại báo cáo liệt kê tất cả người dùng tài khoản của bạn và trạng thái của các thông tin đăng nhập (credential) của họ.

- **IAM Access Advisor (user-level)**

--> Là 1 cố vấn truy cập, có nhiệm vụ show ra các quyền dịch vụ được cấp cho user và thời điểm các dịch vụ đó được truy cập lần cuối (last-accessed).

--> Những thông tin này là căn cứ để bạn có chính sách thay đổi policy phù hợp.

### 7. Trách nhiệm của từng vai trò khi sử dụng IAM
![](https://images.viblo.asia/aade8b5d-b30b-4f7e-85d6-a4b30b91269c.png)

- Đối tượng: Infrastructure (Global Network Security)
- Nhiệm vụ: 
  1. Cấu hình và phân tích lỗ hổng
  2. Tuân thủ các quy chuẩn

![](https://images.viblo.asia/bbef9e49-1d04-4e8d-864d-8854da8faf54.png)

- Đối tượng: Là bạn (Admin)
- Nhiệm vụ: 
  1. Theo dõi và quản lý Users, Groups, Roles, Policies
  2. Bật MFA cho tất cả các users
  3. Thường xuyên xoay vòng thông tin xác thực bảo mật.
  4. Sử dụng IAM tools để áp dụng các quyền thích hợp
  5. Phân tích các kiểu truy cập (access patterns) và review permissions.

### 8. Nguyên tắc khi sử dụng IAM
- Không được sử dụng root account trừ khi dùng cho việc setup account đó
- 1 Người dùng vật lý = 1 AWS user
- Gán user vào groups và gán permissions vào groups.
- Tạo 1 chính sách mật khẩu mạnh
- Bắt buộc sử dụng MFA
- Tạo và sử dụng **Roles** khi cấp các quyền cho các dịch vụ AWS
- Sử dụng Access Keys khi truy cập IAM (CLI/SDK)
- Kiểm tra permissions cho account thông qua IAM Credential Report
- Không được phép share IAM users & Access Keys

### 9. Tổng kết
- **Users** map với người dùng vật lý, có password khi dùng AWS Console
- **Groups** chỉ chứa users.
- **Policies** là văn bản JSON định nghĩa permissions cho users hoặc groups hoặc roles
- **Roles** dùng cho EC2 instances hoặc AWS services
- **Security**: Thiết lập Password policy + MFA
- **Access Keys**: dùng cho truy cập AWS bằng CLI/SDK
- **Audit:** công cụ kiểm tra như  IAM Credential Reports & IAM Access Advisor

<br>

Trên đây mình đã giới thiệu tổng quan về IAM. Khi áp dụng thực hành trên AWS sẽ vô cùng đơn giản khi các bạn đã hiểu rõ từng thành phần. Mình xin phép không hướng dẫn chi tiết. Khi thực hành xong IAM trên AWS, các bạn nhớ xóa Access Key để không mất phí. 

IAM features reference: https://aws.amazon.com/vi/iam/