### Lời mở đầu:

AWS cung cấp cho ta những tính năng có thể xác thực nâng cáo như IAM, Organization, STS, Cognito, DS (Directory Service), SSO (Single Sign-On). <br/>
Nào chúng ta cùng tìm hiểu chi tiết các tính năng xác thực đã được liệt kê xem nào 🤣🤣🤣

Thuật ngữ


|  Viết tắc | Nghĩa | 
| -------- | -------- | 
| DTDM     | Điện toán đám mây     |



### I. IAM
![](https://d1.awsstatic.com/howitworks_IAM_110321.8b2290727bb2022d54416e099c87ad9dc64be5d5.jpg)

- **Quản lý việc truy cập các tài nguyên của user hoặc compute** (áp dụng IAM roles)
- Xác thực việc truy cập ngay trong tài khoản AWS của bạn
- Cho những thành viên đã xác thực và thuộc về công ty (hoặc tổ chức) của bạn 
- IAM có thể áp dụng cho:
    - Groups
    - Users có thể thuộc nhiều group.
    - Roles chỗ các compute ví dự như EC2, ECS, RDS,...
### II. AWS Organization
- **Quản lý tập trung chi phí, truy cập, tuân thủ và bảo mật, chia sẻ tài nguyên cho các user (quản lý nhiều tài khoản)**
- Có tạo các OU (Organization Unit) và phân bổ các user vào OU
- Giới hạn quyền của user hoặc OU bằng SCPs (Service Control Policies)
- Bậc Cloud Trail cho tất cả account và cho hoạt động log vào Amazon S3
- Gửi CloundWatch Logs đến account quản lý.

### III. AWS STS (Security Token Service)

![](https://images.viblo.asia/f65a8af0-f31c-4e67-bb2b-de7b372d24b1.png)

  - Là một dịch vụ web cung cấp chứng nhận riêng biệt **tạm thời** cho user IAM mà bạn muốn xác thực.

### IV. AWS Cognito
**Simple and Secure User Sign-Up, Sign-In, and Access Control** <br/>
Dễ dàng và bảo mật khi user đăng ký, đăng nhấp và quản lý truy cập:
- Tạo một danh sách users cho web và applications.
- Cho phép bạn bổ sung tính năng đăng ký, đăng nhập và kiểm soát truy cập người dùng vào trang web và ứng dụng di động một cách nhanh chóng và dễ dàng. Amazon Cognito có quy mô lên tới hàng triệu người dùng và hỗ trợ đăng nhập thông qua các nhà cung cấp danh tính mạng xã hội như Apple, Facebook, Google và Amazon, cũng như các nhà cung cấp danh tính doanh nghiệp thông qua SAML 2.0 và OpenID Connect.  

### V. Directory Service

[DS services](https://aws.amazon.com/directoryservice/?nc1=h_ls)

![](https://d1.awsstatic.com/Products/product-name/diagrams/directory_service_howitworks.80bfccbf2f5d1d63558ec3c086aff247147258f1.png)
- AW DS giúp chúng ta dễ dàng thiết lập và triển khai các thư mục trong DTDM AWS hoặc giúp kết nối những tài nguyên của AWS với Microsoft Active Directory máy trạm của bạn.



### VI. SSO (Single Sign-On)
![](https://d1.awsstatic.com/diagrams/SSO-diagram.7b77570150a19ea35cfe4b923e1aee9f52b3dd06.png)
- Một lần login cho nhiều tài khoản AWS và nhiều app.

### Lời kết:
OK, vậy ở bài này chúng ta đã tìm hiểu về việc xác thực nâng cao của AWS .<br/>
Chúng các bạn thành công 🏁🏁🏁🥇