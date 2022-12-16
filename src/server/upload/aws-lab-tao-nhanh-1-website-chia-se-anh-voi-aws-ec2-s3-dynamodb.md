Chào các bạn.

Trên tinh thần vừa học vừa chơi. Hôm nay mình sẽ tiến hành tạo nhanh 1 ứng dụng chia sẻ hình ảnh sử dụng 3 service rất phổ biến của AWS.
Mục tiêu của bài lab đơn thuần chỉ là tiếp cận 1 use case đơn giản của AWS S3 mà không đi sâu vào chi tiết các service. 

### Overview kiến trúc của ứng dụng

Ứng dụng sẽ có kiến trúc đơn giản như bên dưới

![](https://images.viblo.asia/26470edb-0ace-49c2-8ee6-707934eec986.gif)

Trong đó
* AWS EC2: Đóng vai trò là web server
* AWS S3: Sử dụng để lưu trữ file ảnh
* AWS DyamoDB: Lưu trữ database (các field liên quan tới 1 object hình ảnh)

### Task 1. Tạo Amazon S3 Bucket

#### Tạo mới 1 Bucket

Tại màn hình AWS Management Console, click vào S3 ở menu service

![](https://images.viblo.asia/3b961ada-80ad-4dff-a2fd-bcf8697fd20e.png)


Click vào "Create Bucket" để tạo 1 S3 Bucket

![](https://images.viblo.asia/c3778bb0-be5a-4845-bccc-2ee43b93f85f.png)

> Một Bucket là một đơn vị lưu trữ logical trên S3. Một Bucket sẽ chứa các object, trong đó Object sẽ chứa dữ liệu (data) và metadata miêu tả về dữ liệu đó. Bạn có thể chỉ định vị trí địa lý khu vực mà Bucket của bạn tạo ra sẽ được lưu trữ ở Amazon S3 khu vực đó. Mỗi bucket sẽ có một cái tên toàn cục (global) độc nhất.

Với hiểu biết ở trên thì khi đặt "Bucket name:" chúng ta phải đặt 1 uniq name chưa từng được sử dụng ở phạm vi global.
Điền vào bucket name, chọn region, nhấn button Create Bucket là tạo xong 1 bucket. 

![](https://images.viblo.asia/e802db6f-2cf4-417a-af0d-77627e58b14c.png)

#### Assign Bucket Policy

Mặc định thì khi tạo 1 Bucket, aws sẽ đặt bucket đó ở trạng thái **không thể public access được**.
Do đó cần thay đổi policy để cho phép bucket của chúng ta **có thể access public từ internet**.
(Vì mình đang cần làm 1 ứng dụng chia sẻ hình ảnh công khai mà)

Tại Tab Permission của Bucket, bên dưới phần "Public access setting for this bucket", click vào Edit và bỏ chọn checkbox trên cùng
Click save để lưu lại

![](https://images.viblo.asia/7497b808-369b-4b53-80ab-71e2a65b6c6f.png)

=> Action này đã **un-block** các access từ public vào bucket của mình. Hay nói cách khác là cho phép người dùng từ internet có thể xem được hình ảnh mà ứng dụng chia sẻ.

Tuy nhiên, việc setting bucket cần 1 bước nữa, đó là thêm **Bucket Policy** để cho các **AWS account hay là các IAM user** có thể  access vào bucket và các object trong bucket. Việc này nhằm để cho EC2 đại diện cho WebServer của mình có thể read/write vào bucket.
Việc Assign Bucket Policy được thực hiện bằng việc thêm đoạn Json bên dưới vào tab Bucket Policy.

Chú ý phần Resource phải điền đúng trên của bucket đã tạo ở trên
```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::mediaupload13/*"
        }
    ]
}
```

Click Save để lưu lại. Việc lưu thành công sẽ được thông báo như bên dưới.

![](https://images.viblo.asia/44193ebc-f234-4730-8519-43d8015d7080.png)

### Task 2. Tạo Amazon DynamoDB

> Amazon DynamoDB là cơ sở dữ liệu về key-value và document, với hiệu năng hoạt động chỉ trong vài mili giây ở mọi quy mô. 

Tham khảo thêm [tại đây](https://viblo.asia/p/gioi-thieu-ve-dynamodb-phan-1-jamoG87nMz8P)

Tại màn hình AWS Management Console, click vào DynamoDB ở menu service

![](https://images.viblo.asia/abe650c0-8f61-47c0-8269-d546ba40628c.png)

Click Create Table để tạo 1 tabel mới
- Table name: tableName
- Primary key: eib
> DynamoDB sử dụng primary keys để định danh tính duy nhất cho mỗi Item trong tabale.

![](https://images.viblo.asia/9797f557-d393-47d1-ac7b-71b194fe9d5d.png)

Click Create để tạo

Table được create thành công

![](https://images.viblo.asia/0cd8617b-7a82-4518-ac5b-fa960819cdec.png)

### Task 3. Tạo EC2 đóng vai trò là Web Server

Ở task này mình sẽ tạo 1 EC2 được cài sẵn Ruby On Rails và Web Front-End sử dụng các packaged có sẵn của AMI

Tại màn hình AWS Management Console, click vào EC2 ở menu service

![](https://images.viblo.asia/7277792e-fd28-4f8d-9cec-df39f14267bb.png)

Nhấn vào Launch instance để khởi chạy 1 Ec2 mới

![](https://images.viblo.asia/6ef34c87-abd3-4b5a-b8b9-527b425f9197.png)

Các step tiếp theo đơn giản là lựa chọn cấu hình cho con EC2. Có thể tham khảo thêm [tại đây](https://viblo.asia/p/aws-ec2-thu-tao-1-aws-ec2-va-deploy-1-ung-dung-rails-Ljy5VYrVlra)

Điểm quan trọng nhất khi tạo EC2 cho ứng dụng này là ở step **Configure Instance Details**

Ở ô IAM role: chỗ này nên tạo 1 IAM role với mục đích cấp quyền cho EC2 này được phép sử dụng các service liên quan là DynamoDB cũng như là S3. 
(Vì EC2 là web server nên nó phải có quyền access tới DynamoDB cũng như S3 để đọc và ghi dữ liệu)

Click vào "Create New IAM role"

![](https://images.viblo.asia/045922fa-cecb-40a9-a33a-ff12313ca97a.png)

Click Create role để tạo role mới

![](https://images.viblo.asia/f3393d56-c049-4aa0-b642-96dd679770ef.png)

Bên dưới phần Chose a use case, lực chọn common user cases EC2 và nhấn Next

![](https://images.viblo.asia/1b85c0fe-a1ef-4f81-8699-452884a53159.png)

Tiếp theo ở phần Attach permissions polices, click vào check box AdministratorAccess để cho phép role này có quyền admin access với các service của AWS -> Lưu lại là xong.

![](https://images.viblo.asia/2902216f-e07d-4d62-b173-ca683c7ff29c.png)

Quay trở lại màn hình config EC2 thì ở ô IAM role, click lựa chọn role vừa mới tạo.

Điểm quan trọng thứ 2 ở step **Configure Instance Details** là ở phần **Advanced Details** ô User Data, cần nhập vào 1 đoạn mã dùng để khởi tạo EC2 bao gồm cài đặt các phần mềm cần thiết, cài đặt các packaged có sẵn để dùng làm Web Font-End, chỉ định cụ thể việc EC2 này được access vào bucket_name nào và table DynamoDB nào.

![](https://images.viblo.asia/71f0c509-21f6-4985-a425-4ac78580434c.png)

```
#!/bin/bash -ex
export HOME=/home/ec2-user
yum update -y
yum install -y gcc libxml2 libxml2-devel libxslt libxslt-devel
yum install -y ruby-devel sqlite-devel
yum install -y gcc-c++
yum install -y ImageMagick-devel ImageMagick-c++-devel
yum install -y patch
gem install bundler -v 1.16.0
curl -o /tmp/spl11.tar.gz https://s3-us-west-2.amazonaws.com/us-west-2-aws-training/awsu-spl/spl-11/scripts/spl11v2.tar.gz
tar xfz /tmp/spl11.tar.gz -C /home/ec2-user/
cd /home/ec2-user/spl11/
gem install io-console -v 0.4.6
/usr/local/bin/bundle update rdoc
/usr/local/bin/bundle install
/usr/local/bin/bundle exec bin/rake db:migrate
cat > /home/ec2-user/spl11/tmp/creds.yml << EOF
region: us-east-2
bucket_name: mediaupload13
table_name: media_upload_13
EOF
/usr/local/bin/bundle exec bin/rails s -b 0.0.0.0 -p 80
```

Lưu ý nhập đúng region, bucket_name và table_name

Điểm quan trọng thứ 3 ở task này là tại step 6: Configure Security Group thì cần tạo mới Security Group sao cho cho phép EC2 có thể được truy cập vào từ Internet thông qua HTTP. (Vì ứng dụng của mình dùng con EC2 này ở cả vai trò là Web Front-End)

![](https://images.viblo.asia/a39712a7-8f42-4736-a82d-38c78d9d5bde.png)

Đến bước này thì có thể nhấn Review And Launch con EC2 này luôn

Sau khi Launch thành công EC2 thì instance của mình sẽ được list như bên dưới

![](https://images.viblo.asia/91ec4103-91c0-440f-90b1-107d3fbe9d5a.png)

### Task 4. Test ứng dụng

Để thử truy cập website từ browser thì copy Public DNS của EC2 và truy cập bằng trình duyệt.

![](https://images.viblo.asia/2dd840ce-c5d8-4c08-bd7c-2ef8a770a790.png)

Truy cập thành công

![](https://images.viblo.asia/e83293f7-cc36-4d8d-a704-c1a57732444b.png)

Thử upload 1 hình ảnh để test

![](https://images.viblo.asia/bb2d3ea3-53a3-4176-abf3-9b78242f3c42.png)

Upload hình ảnh thành công

![](https://images.viblo.asia/e1d153e9-a7d7-4e86-9890-505067c11773.png)

Check thử ở  Table DynamoDB, tab Item để xem Data được tạo

![](https://images.viblo.asia/e3e23aff-f9fc-4b19-85b3-4eb8e7f99543.png)

Check thử ở Bucket S3 để xem file hình ảnh đã được upload 

![](https://images.viblo.asia/497a7585-e372-409b-8e35-dc4d9b3b7d85.png)

=> All task has done!

### Summary

Trên đây là 1 mini lab rất nhỏ, giúp chúng ta nhanh chóng tiếp cận được 1 mô hình ứng dụng sử dụng S3 của AWS.
Bên cạnh đó cũng phần nào giúp ta hiểu được cách cấu hình để EC2 có thể làm việc được với các service khác của AWS.
Cảm ơn các bạn đã theo dõi.