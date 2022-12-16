Như chúng ta đã biết, Amazone IAM (Identity and Access Management) dùng để kiểm soát quyền truy cập của các cá nhân (Users) và các nhóm (Groups) đến tài nguyên của AWS. 

Policy là các điều khoản được tạo hoặc chỉ định để kiểm soát quyền truy cập vào tài nguyên của AWS. Mỗi một policy có những tính năng và quyền hạn nhất định gắn với User, Group, Roles trong IAM.

### 1. Cấu trúc của policy
Chúng ta sẽ đi tìm hiểu cấu trúc của một policy thông qua ví dụ dưới đây:
```ruby
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "Stmt1571666184581",
          "Action": [
            "elasticbeanstalk:CreateApplication"
          ],
          "Effect": "Allow",
          "Resource": "arn:aws:elasticbeanstalk:ap-southeast-1:1234567:application/staging",
          "Condition": {
            "DateGreaterThan": {
              "aws:CurrentTime": "2019/10/18"
            }
          }
        }
      ]
    }
```
   * **Version**: Phiên bản của ngôn ngữ policy, tốt nhất là cứ chọn phiên bản mới nhất để đảm bảo mọi tính năng bạn sử dụng đều được hỗ trợ. Nếu như không khai báo version, thì mặc định version cũ nhất được đem ra sử dụng. 
    * **Statement**: Mỗi một policy đều có ít nhất một statement, statement dùng để chỉ định action nào được thực thi và tài nguyên nào được truy cập. Statement gồm các thành phần
        * ***Sid***: Là một chuỗi uniq dùng để nhận dạng statement
        * ***Effect***: Chỉ định các actions được liệt kê là Alllow/Deny
        * ***Action***: Liệt kê các hành động bạn muốn thực thi (`ec2:CreateImage`, `ec2:CreateNetworkAcl`...)
        * ***Principal***: Là tài khoản/người dùng/role được cho phép hoặc bị từ chối truy cập vào tài nguyên AWS
        * ***Resource***: Chính là tài nguyên AWS mà bạn muốn áp dụng những actions bên trên
        * ***Condition***: Chỉ định các điều kiện bắt buộc phải tuân theo khi áp dụng policy này (vd: DateGreaterThan > 2019/10/18)
        
### 2. Phân loại
  ##### 2.1. Identity based Policy
Những policies này được đính kèm theo User/Group/Role trong IAM, chúng quy định những hành động nào được phép hoặc không được phép truy cập. Ví dụ như chúng ta có thể chỉ định User A được phép truy cập vào EC2 để tạo instances chẳng hạn. Indentity based policy được phân làm 3 loại:
* **Managed Policy  (tạo bởi AWS)**
 ![](https://images.viblo.asia/32a05b95-e0bd-4ed1-94c7-76ce190413dc.png)
Các policies này thường có thuộc tính read-only, chúng ta chỉ có thể chọn và đính kèm chúng vào một hoặc một nhóm người dùng. Không giống như custom policy, managed policies không thể bị xoá, chỉ có thể đính kèm hoặc huỷ bỏ chúng khỏi user/group/role mong muốn, tuy nhiên sau khi apply policy này, chúng ta có thể tuỳ chỉnh và lưu lại giống như một custom policy. Mỗi policy loại này có thể được đính vào nhiều users hoặc groups

 * **Job function Policy (tạo bởi AWS)**
 ![](https://images.viblo.asia/ec4ad509-9c0a-412c-8aab-ce4a91c63191.png)
   Những policies này được tạo cho các tác vụ đặc thù như: Administrator, Billing, Database Administrator, System administrator .... Tuy nhiên việc sử dụng các policy này cần rất thận trọng khi mà chúng chứa rất nhiều các đặc quyền, ví dụ như System Administrator cho phép tạo và quản lý một loạt các tài nguyên như EC2, IAM, Lamda, RDS, Route53, Cloudwatch, Cloudtrail, VPC và nhiều dịch vụ khác nữa. Job function policy phù hợp với việc tạo ra các template mẫu, sau đó chúng ta cân chỉnh sửa lại cho phù hợp với nhu cầu cũng như account/groups. 
  * **Custom Policy (Là những policy tự định nghĩa)**
  
    Chúng ta có thể chọn 1 policy trong danh sách mà AWS cung cấp, sau đó chỉnh sửa để phù hợp với mục đích sử dụng và lưu lại để tái sử dụng. Hoặc chúng ta cũng có thể tạo mới một policy và thiết lập các thông số liên quan như action, effect, resources...
     ```ruby
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "Stmt1571671788500",
              "Action": [
                "ec2:CreateImage",
                "ec2:CreateNetworkAcl",
                "ec2:CreateNetworkAclEntry",
                "ec2:CreateVpc"
              ],
              "Effect": "Allow",
              "Resource": "*"
            },
            {
              "Sid": "Stmt1571717009297",
              "Action": [
                "s3:CreateBucket",
                "s3:CreateJob",
                "s3:DeleteBucket",
                "s3:DeleteBucketPolicy",
                "s3:DeleteBucketWebsite",
                "s3:DeleteObject"
              ],
              "Effect": "Allow",
              "Resource": "*"
            }
          ]
        }
     ```
  ##### 2.2. Resource Base Policy
   Nếu như Identity based policy gắn liền với User/Group/Role, thì resource base policy gắn liền với các tài nguyên của AWS. Ví dụ chúng ta đính kèm resource base policy với các tài nguyên như S3 buket, SQS queue ... Với resource base policy, chúng ta có thể chỉ định xem ai là người có quyền truy cập, hành động nào có thể thực hiện trên tài nguyên đó
 
 ![](https://images.viblo.asia/8d96938f-76ff-4441-a9ba-d3eada777ce1.png)
    Trên đây là ảnh phân biệt giữa 2 loại policy
    
  ##### 2.3. Inline Policy
  Là các policies mà chúng ta tự tạo, tự quản lý và tự apply cho một đối tượng user/group/role. Điều này có nghĩa là chúng ta có thể chỉnh sửa bất cứ user/group/role và tạo ra các policy trực tiếp cho IAM object. Do đặc thù của inline policy nên các policy được tạo này không xuất hiện trong list cac policy được quản lý (managed policies)
  
### 3. Tạo policy
Chúng ta có thể dễ dàng tạo policy thông qua bảng điều khiển IAM trên màn hình aws console, hoặc cũng có thể sử dụng aws-cli, hoặc cũng có thể sử dụng third-party tool để tạo policy dưới định dạng file JSON.
![](https://images.viblo.asia/63ca71cf-4d74-4b6d-ba19-fc0a6b06fa80.png)
Việc tạo  policy tuân theo cú pháp nhất định, ví dụ như: 

* Text và String value phải được đặt trong dấu " "
* Nội dung policy được xác định bởi các cặp giá trị name: value (vd: `"s3:CreateBucket"`)
* Các đối tượng(obj) được khai báo trong `{}`