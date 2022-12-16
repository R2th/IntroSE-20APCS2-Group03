## Giới Thiệu Về Các Cloud Computing Model
### 3 Cloud Computing Model cơ bản là:
* IaaS: Infrastructure as a Service
* PaaS: Platform as a Service
* SaaS: Software as a Service

![](https://images.viblo.asia/1ef94cf2-be5a-4a43-b31c-785a1fda33f0.jpg)

Vậy “As A Service” là gì? Dịch nôm na thì nó là … cung cấp dịch vụ. Dịch vụ ở đây có thể hiểu là dịch vụ có sẵn, khi nào cần dùng thì mới phải trả tiền.

### Sự khác nhau giữa 3 model:
* **IaaS:** Công ty khác sẽ cho bạn thuê cơ sở hạ tầng (infrastucture) bao gồm server, ổ cứng, mạng. Bạn muốn cài gì cũng được, bỏ code gì lên cũng được.
* **PaaS:** Nhà cung cấp sẽ lo cho bạn từ OS (Windows hoặc  Linux) cho tới Runtime (Docker, NodeJS, C#, Java), chỉ cần bỏ code vào mà chạy là được.
* **SaaS:** Phần mềm được cung cấp dưới dạng dịch vụ, người sử dụng sẽ trả tiền thuê hàng tháng như Gmail, Dropbox, Salesforce …

## Giới Thiệu Elastic Beanstalk
### Elastic Beanstalk là gì?
Elastic Beanstalk là một dịch vụ theo model **PaaS** của AWS giúp chúng ta dễ dàng triển khai và mở rộng các ứng dụng web và dịch vụ được phát triển bằng Java, . NET, PHP, Node. js, Python, Ruby, Go và Docker trên những máy chủ quen thuộc như Apache, Nginx, Passenger và IIS.
### Các thành phần cơ bản của Elastic Beanstalk
Sau khi khởi tạo một ứng dụng Elastic Beanstalk sẽ tạo ra các resource cơ bản như sau:
* **EC2 instance** - Được cấu hình để chạy các ứng dụng web trên nền tảng bạn chọn. Bao gồm application với version mà bạn đã lựa chọn và Apache hoặc NGINX như một reverse proxy để nhận request
* **Instance security group** - Giúp quản lý inbound outbound của các instance
* **Load balancer** - Bộ cân bằng tải Elastic Load Balancing được định cấu hình để phân phối request đến ứng dụng.
* **Load balancer security group** - Giúp quản lý inbound outbound của ELB
* **Auto Scaling group** - Được định cấu hình để thay thế một phiên bản nếu nó bị terminated hoặc không khả dụng.
* **Amazon S3 bucket** - Nơi lưu trữ mã nguồn, log và các artifacts được tạo ra khi sử dụng Elastic Beanstalk.
* **Amazon CloudWatch alarms** - Hai CloudWatch alarms giám sát tải trên các instance trong môi trường. Được kích hoạt nếu tải quá cao hoặc quá thấp. Khi một alarms được kích hoạt, Auto Scaling group sẽ scale up hoặc scale down.
* **AWS CloudFormation stack** - Sử dụng để khởi chạy các tài nguyên trong môi trường và apply các thay đổi cấu hình.
* **Domain name** - Một domain name route đến ứng dụng, ví dụ: subdomain.region.elasticbeanstalk.com.

## Triển khai một ứng dụng ruby on rails lên Elastic Beanstalk
### User, Phân quyền và tạo Credential
Để deploy được ứng dụng ta cần phải có một credential có quyền manage Elastic Beanstalk
![](https://images.viblo.asia/7d9ec1f9-9aac-4efb-ac42-f4ea9204b36a.PNG)

Sau khi tạo user bạn sẽ nhận được **Access key ID** và **Secret access key**

### Cài đặt EB CLI
Tiếp theo ta cần cài đặt EB CLI, bạn hãy làm theo hướng dẫn trong link sau để cài đặt: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-advanced.html

### Tạo Ứng Dụng
Tạo thư mục cho app:
```
$ mkdir test_app
$ cd test_app/
```

Khởi tạo EB:
```
eb init
```

Chọn region cho app:
```
$ eb init

Select a default region
1) us-east-1 : US East (N. Virginia)
2) us-west-1 : US West (N. California)
3) us-west-2 : US West (Oregon)
4) eu-west-1 : EU (Ireland)
5) eu-central-1 : EU (Frankfurt)
6) ap-south-1 : Asia Pacific (Mumbai)
7) ap-southeast-1 : Asia Pacific (Singapore)
8) ap-southeast-2 : Asia Pacific (Sydney)
9) ap-northeast-1 : Asia Pacific (Tokyo)
10) ap-northeast-2 : Asia Pacific (Seoul)
11) sa-east-1 : South America (Sao Paulo)
12) cn-north-1 : China (Beijing)
13) cn-northwest-1 : China (Ningxia)
14) us-east-2 : US East (Ohio)
15) ca-central-1 : Canada (Central)
16) eu-west-2 : EU (London)
17) eu-west-3 : EU (Paris)
18) eu-north-1 : EU (Stockholm)
19) eu-south-1 : EU (Milano)
20) ap-east-1 : Asia Pacific (Hong Kong)
21) me-south-1 : Middle East (Bahrain)
22) af-south-1 : Africa (Cape Town)
(default is 3): 1
```

Nhập **Access key ID** và **Secret access key** mà bạn đã tạo ở trên:
```
You have not yet set up your credentials or your credentials are incorrect
You must provide your credentials.
(aws-access-id):
(aws-secret-key):
```

Chọn platform cho app, ở đây mình sẽ chọn ruby:
```
Application test_app has been created.
Select a platform.
1) .NET Core on Linux
2) .NET on Windows Server
3) Docker
4) GlassFish
5) Go
6) Java
7) Node.js
8) PHP
9) Packer
10) Python
11) Ruby
12) Tomcat
(make a selection): 
```

Lựa chọn version của platform:
```
Select a platform branch.
1) Ruby 2.7 running on 64bit Amazon Linux 2
2) Ruby 2.6 running on 64bit Amazon Linux 2
3) Ruby 2.5 running on 64bit Amazon Linux 2 (Deprecated)
4) Puma with Ruby 2.6 running on 64bit Amazon Linux (Deprecated)
5) Puma with Ruby 2.5 running on 64bit Amazon Linux (Deprecated)
6) Puma with Ruby 2.4 running on 64bit Amazon Linux (Deprecated)
7) Passenger with Ruby 2.6 running on 64bit Amazon Linux (Deprecated)
8) Passenger with Ruby 2.5 running on 64bit Amazon Linux (Deprecated)
9) Passenger with Ruby 2.4 running on 64bit Amazon Linux (Deprecated)

```

Lựa chọn setup SSH đên instance, ở đây mình chọn không:
```
Cannot setup CodeCommit because there is no Source Control setup, continuing with initialization
Do you want to set up SSH for your instances?
(Y/n): 
```

Bắt đầu triển khai ứng dụng:
```
$ eb create
```

Nhập tên môi trường:
```
Enter Environment Name
(default is test-app-dev):
```

Nhập DNS prefix CNAME:
```
Enter DNS CNAME prefix
(default is test-app-dev):
```

Chọn loadbalancer type:
```
Select a load balancer type
1) classic
2) application
3) network
(default is 2): 
```

Lựa chọn Spot Feet request và continue:
```
Would you like to enable Spot Fleet requests for this environment? (y/N): N

2.0+ Platforms require a service role. We will attempt to create one for you. You can specify your own role using the --service-role option.
Type "view" to see the policy, or just press ENTER to continue:
```

Sau khi bạn ENTER nếu như trong folder hiện tại không có source Elastic Beanstalk sẽ tải và deploy 1 sample app cho ứng dụng.
```
NOTE: The current directory does not contain any source code. Elastic Beanstalk is launching the sample application instead.
Do you want to download the sample application into the current directory? (Y/n): Y
INFO: Downloading sample application to the current directory.
```

## Tham khảo
https://toidicodedao.com/2018/10/23/so-sanh-iaas-paas-saas-la-gi/
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ruby-rails-tutorial.html
https://aws.amazon.com/vi/getting-started/hands-on/deploy-app-command-line-elastic-beanstalk/