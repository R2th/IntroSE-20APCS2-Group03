## Cài đặt EB CLI

Bạn có thể cài đặt EB CLI với 1 câu lệnh:

Linux, macOS, or Unix
```
~$ sudo pip install awsebcli
```

Windows
```
> pip install awsebcli
```

## Thiết lập EB CLI

Với Git repository được cấu hình và tất cả các công cụ cần thiết được cài đặt, cấu hình dự án EB CLI đơn giản như việc chạy init eb từ trong thư mục dự án và làm theo hướng dẫn hiện ra.

```
~/rails-beanstalk$ eb init
Select a default region
1) us-east-1 : US East (N. Virginia)
2) us-west-1 : US West (N. California)
3) us-west-2 : US West (Oregon)
...
```

Các giá trị sau đây hoạt động tốt trong tutorial này, nhưng bạn có thể tuỳ chỉnh nó theo đúng yêu cầu của bạn. Nếu không có access key, bạn hãy xem phần [How Do I Get Security](http://docs.aws.amazon.com/general/latest/gr/getting-aws-sec-creds.html) để tìm cách gen ra

Value


|Region	| Enter (keep default) |
|AWS Access Key ID | Your access key |
| AWS Secret Access Key |	Your secret key |
| Application Name | Enter (keep default) |
|Using Ruby?	| y (yes) |
| Platform Version |	Ruby 2.1 (Puma)|
|Set up SSH?	| n (no)|

Trong thiết lập bổ sung cho môi trường deploy, `eb inits` set up một số Git extensions và thêm một mục vào trong file .gitignore trong project directory. Hãy commit sự thay đổi này của .gitignore trước khi tiếp tục.

```
~/rails-beanstalk$ git commit -am "updated .gitignore"
```

## Tạo service role và Instance profile

Phiên bản platform mới hơn yêu cầu service role và instance profile. Những role này cho phép Elastic Beanstalk theo dõi các tài nguyên trong môi trường của bạn và các instance trong môi trường của bạn để upload file Log lên Amazon S3. Để biết thêm thông tin, hãy xem [Service Roles, Instance Profiles, and User Policies](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-roles.html).

Nếu bạn không có sẵn một service role và một instance profile, hãy sử dụng Elastic Beanstalk management Console để tạo ra chúng.

### Để tạo ra một service role và instance profile

1. Mở [Elastic Beanstalk console](https://console.aws.amazon.com/elasticbeanstalk)
2. Chọn `Create New Application`
3. Đi tiếp theo wizard cho đến khi bạn mở đến trang Permission
4. Chọn Next để mở IAM console
5. Chọn Allow để tạo ra các roles

## Update Gemfile

Để deploy application của bạn lên Elastic Beanstalk, chúng ta cần một số thay đổi nhỏ trong file Gem default của Rails. hãy thêm `Puma` vào danh sách Gem để chắc rằng nó được cài đặt chính xác.

`~/rails-beanstalk/Gemfile`

```
source 'https://rubygems.org'
gem 'puma'
gem 'rails', '4.1.8'
gem 'sqlite3'
...
```

Commit thay đổi này lại `git commit`

```
~/rails-beanstalk$ git commit -am "Add Puma to Gemfile"
```

## Deploy project

Tiếp theo, hãy tạo ra một môi trường Elastic Beanstalk với lệnh `eb create` và deploy application của bạn vào đó .

```
~/rails-beanstalk$ **eb create rails-beanstalk-env**
Creating application version archive "app-150219_215138".
Uploading rails-beanstalk/app-150219_215138.zip to S3. This may take a while.
Upload Complete.
Environment details for: rails-beanstalk-env
  Application name: rails-beanstalk
  Region: us-west-2
  Deployed Version: app-150219_215138
  Environment ID: e-pi3immkys7
  Platform: 64bit Amazon Linux 2015.09 v2.0.6 running Ruby 2.1 (Puma)
  Tier: WebServer-Standard
  CNAME: UNKNOWN
  Updated: 2015-02-19 21:51:40.686000+00:00
Printing Status:
INFO: createEnvironment is starting.
...
```

Chú ý: Nếu bạn thấy message lỗi "service role required", hãy chạy `eb create` mà không cần chỉ định một môi trường nào, EB CLI sẽ tạo role cho bạn.

Với chỉ một câu lệnh, EB CLI set up tất cả các tài nguyên mà ứng dụng của chúng ta cần để chạy trên AWS, bao gồm cả những phần sau đây:
- Một Amazon S3 bucket để lưu thông tin môi trường
- Một Load balancer để phân tải cho các web server
- Một security group để giới hạn/cho phép các traffic
- Một Auto Scaling group để điều chỉnh số lượng server tuỳ theo độ chịu tải cần thiết
- Một Amazon CloudWatch alarms để thông báo cho Auto Scaling group khi tải quá thấp hoặc quá cao
- Một Amazon EC2 instance để chạy ứng dụng của chúng ta.

Khi thủ tục đã hoàn thành, EB CLI sẽ output ra một public DNS name cho application server. Sử dụng `eb open` để mở trang web trên browser mặc định của máy tính.