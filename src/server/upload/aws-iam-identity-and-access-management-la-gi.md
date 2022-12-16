Chào mọi người, hôm nay mình sẽ giới thiệu cho mọi người về IAM. Chắc hẳn moi người đang thắc mắc xem nó là cái gì đúng không. Chúng ta sẽ cùng đi tìm hiểu nhé.
![](https://images.viblo.asia/9e126f5f-fa1c-4334-8e5e-45ba379b207a.png)

## I- IAM là gì?
IAM (Identity and Access Management) cho phép bạn quản lý truy cập vào các dịch vụ và tài nguyên AWS một cách bảo mật. Khi sử dụng IAM, bạn có thể tạo, quản lý người dùng và nhóm AWS, sử dụng các quyền để cho phép và từ chối quyền truy cập vào tài nguyên AWS của họ. 

IAM là một tính năng được cung cấp miễn phí của tài khoản AWS. Bạn chỉ phải trả phí cho việc sử dụng các dịch vụ AWS khác bởi người dùng của bạn.

Để bắt đầu sử dụng IAM hoặc nếu bạn đã đăng ký AWS, vui lòng truy cập Bảng điều khiển quản lý AWS và bắt đầu với Những biện pháp thực hành tốt nhất với IAM.
## II- Tác dụng của IAM
+ Bạn có thể tạo, quản lý người dùng và nhóm AWS, sử dụng các quyền để cho phép và từ chối quyền truy cập vào tài nguyên AWS. 
 + Cấp cho người khác quyền quản trị tài nguyên AWS.
 + Cấp các quyền khác nhau cho  các tài nguyên khác nhau (Amazon S3, Amazon EC2,and other AWS services)...
 
##  III- Truy Cập IAM
Bạn có thể làm việc với AWS Nhận dạng và Quản lý truy cập theo bất kỳ cách nào sau đây.

+ Bảng điều khiển quản lý AWS: Bảng điều khiển là giao diện dựa trên trình duyệt để quản lý tài nguyên IAM và AWS.                                                                                                                                                                                                                                                                                                                 
+ Công cụ dòng lệnh AWS: Bạn có thể sử dụng các công cụ dòng lệnh AWS để phát lệnh tại dòng lệnh của hệ thống để thực hiện các tác vụ IAM và AWS. Sử dụng dòng lệnh có thể nhanh hơn và thuận tiện hơn so với bàn điều khiển. Các công cụ dòng lệnh cũng hữu ích nếu bạn muốn xây dựng các tập lệnh thực hiện các tác vụ AWS.

+ AWS cung cấp hai bộ công cụ dòng lệnh: Giao diện dòng lệnh AWS (AWS CLI) và Công cụ AWS cho Windows PowerShell.

## VI- Tạo IAM
1- Truy cập vào tài khoản AWS chon IAM

![](https://images.viblo.asia/d173dc31-6639-485f-9289-d278a9460ac5.PNG)

2- Chọn User cần add policy

![](https://images.viblo.asia/aa289d49-67ea-4eb9-9390-898dbb8c7986.PNG)

3- Chon user cần cấp quyền

![](https://images.viblo.asia/daa1ab17-7ec5-486d-829b-29260708a01c.PNG)

4- Chọn add inline policy

![](https://images.viblo.asia/978cc64b-dfa4-41ce-8671-0118e156a477.PNG)

5- Chọn service cần cấp quyền

![](https://images.viblo.asia/6c62fe3d-6bbf-4a9b-a3ca-7e456771064d.PNG)

6- Thiết lâp access policy

![](https://images.viblo.asia/7e5b4f3d-36cb-4e7c-84f0-2bfc6f3e26db.PNG)

7- Đặt tên Policy và Thiết lâp

![](https://images.viblo.asia/9cbb92a1-ef70-41e3-9ea9-ed2c80782b3c.PNG)

V- Tài liệu tham khảo

[https://medium.com/@leeprovoost/aws-iam-and-s3-policies-marked-as-changed-by-terraform-50669585816d](https://medium.com/@leeprovoost/aws-iam-and-s3-policies-marked-as-changed-by-terraform-50669585816d)

[https://viblo.asia/p/aws-huong-dan-tao-va-quan-ly-tai-khoan-iam-RnB5pXxY5PG](https://viblo.asia/p/aws-huong-dan-tao-va-quan-ly-tai-khoan-iam-RnB5pXxY5PG)