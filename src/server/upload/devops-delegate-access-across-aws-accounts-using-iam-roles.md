Chào mừng bạn đến Ngày 9 của 100 Ngày DevOps, Ngày 9 này tiếp tục cuộc hành trình khi nói về Quyền truy cập qua các tài khoản AWS bằng cách sử dụng các vai trò IAM

**Problem** :

Làm thế nào để quản lý và chia sẻ tài nguyên trong các tài khoản AWS khác nhau, tức là Người dùng trong Tài khoản B (Developer) có quyền truy Read-only vào Nhóm S3 trong Tài khoản A (Prodution).

**Solution** :

IAM sẽ giúp chúng ta làm việc này , bằng cách thiết lập quyền truy cập nhiều tài khoản với các vai trò IAM khác nhau .

**Advantage** :

   + Bạn không cần thiết lập người dùng IAM riêng lẻ trong mỗi tài khoản AWS
   + Tiếp đến người dùng không cần phải đăng xuất khỏi một tài khoản này và đăng nhập vào 1 tài khoản khác để truy cập tài nguyên của mình .

**Pre-requisites** :

   + Bạn cần có hai tài khoản AWS (1 Tài khoản A (Prodution) và 1 Tài khoản B (Developer))
   + 1 AWS S3 Bucket được tạo trong Tài khoản A (Prodution)

Chúng ta thực hiện cấu hình cho việc này .

**Bước 1** : Tạo Vai trò IAM trong Tài khoản A (Điều này nhằm thiết lập sự tin cậy giữa hai tài khoản)

   + Go to IAM console https://console.aws.amazon.com/iam/home?region=us-west-2#/home
   + Click on Roles, Create role
   + Tiếp đến chúng ta hãy chọn Another AWS account và Account ID của tài khoản B 

![](https://images.viblo.asia/16b4b17a-b624-47db-8d5a-a0998ad4fb0e.png)

   + Để lấy ID tài khoản (Nhấp vào người dùng IAM trên bảng điều khiển và nhấp vào My Account )

![](https://images.viblo.asia/e7ff9f3f-e308-4c18-83f1-d6e768e1ef9b.png)

   + Tiếp theo click Create policy và paste đoạn Json bên dưới vào 

Lưu ý : Hãy thay đổi Bucket name thành Bucket name mà bạn muốn chia sẻ với Development Account or bạn có thể chọn S3ReadOnlyPolicy 

```
{
   "Version": "2012-10-17",
   "Statement": [
     {
       "Effect": "Allow",
       "Action": "s3:ListAllMyBuckets",
       "Resource": "*"
     },
     {
       "Effect": "Allow",
       "Action": [
         "s3:ListBucket",
         "s3:GetBucketLocation"
        ],
       "Resource": "arn:aws:s3:::bucket name"
     },
     {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::bucket name/*"
    }
  ]
}
```

+ Click Next và đặt Role name 

![](https://images.viblo.asia/1538291e-daa5-4512-8c6a-166028046a0e.png)

**Bước 2** : Grant Access cho role

   + Di chuyển đến Role vừa mới tao
   + Sau đó click vào Trust relationships vào chỉnh sửa nó 

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::XXXXX:root" <----
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

**Bước 3** : Test lại bằng cách thực hiện chuyển đổi role 

+ hãy quay lại Tab Account nhưng lần này bạn chọn vào Switch Role

![](https://images.viblo.asia/2f20a231-3989-4183-bb7a-0eb78b0c2684.png)

+ Điền đầy đủ các chi tiết vào như bên dưới .

![](https://images.viblo.asia/5f0d00b3-b3a6-4bd0-8d22-da64940557ca.png)


* Account:  Production / Account A ID
* Role : Role mà chúng ta đã tạo trong Bước 1: S3ReadOnlyAccesstoDevAccount
* Display Name : Tên gì mà bạn muốn (Any display name)
* Switch Role

+ sau khi cấu hình xong bạn sẽ thấy như thế này 

![](https://images.viblo.asia/7b5a2111-6ea6-44e4-8143-8acb889d25c0.png)

NOTE : không thể chuyển role khi bạn đang signed với tư cách là người dùng root tài khoản AWS.

   + Bây giờ, bạn hãy mở S3 Console và thử truy cập S3 Bucket có trong Tài khoản A

Cám ơn các bạn đã quan tâm theo dõi , Chúc các bạn Thành công .

Nguồn : https://techzones.me/devops/devops-ngay-9-delegate-access-across-aws-accounts-using-iam-roles/