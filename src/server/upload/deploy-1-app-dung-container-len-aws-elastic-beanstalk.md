AWS Elastic Beanstalk là dịch vụ của AWS cho phép bạn deploy ứng dụng của bạn lên cloud mà không phải tốn quá nhiều công setup. Đã từng có 1 thời nó được so sánh với Heroku. Bản thân mình thì phải nói thật về trải nghiệm cá nhân là mình thích deploy ứng dụng lên Heroku hơn vì tính nhanh gọn, còn với AWS Beanstalk thì tại thời điểm mình thử(cuối 2021 tới năm 2022), có 1 số lỗi liên quan tới việc khác version của ngôn ngữ, công nghệ mình sử dụng nên dẫn tới chưa deploy được lên Elastic Beanstalk lần nào. Dù vậy, mình vẫn quyết tâm phải thử bằng được và sẽ bắt đầu từ bước đơn giản nhất: Deploy 1 app container lên Elastic Beanstalk.

Và sau bước này thì mình sẽ deploy app Rails của mình

# Chuẩn bị
Cài sẵn những công cụ sau trên máy
- Docker
- Elastic Beanstalk CLI
- AWS access keys
# Lấy 1 ứng dụng container về máy
Lần này chúng ta chú trọng vào việc deploy nên tuỳ các bạn có thể tự làm 1 ứng dụng single-container hay là kéo nhanh 1 image về cũng được.

Nếu các bạn lựa chọn kéo image có sẵn về thì có 2 nguồn:
- [Docker Hub](https://hub.docker.com/search?q=&type=image)
- [AWS ECR Public Library](https://gallery.ecr.aws/docker)

Với mình thì mình chọn nguồn lần này từ ECR Public Library. Và cụ thể hơn mình chọn container của trò chơi 2048. Các bạn thích dùng container nào cứ tự nhiên tải nhé.

Sau khi chọn được container thì mình tạo thư mục có cấu trúc thư mục
```
2048-container/
  └── docker-compose.yml
```
Trong `docker-compose.yml`, mình sẽ định nghĩa như sau
```yaml
version: '2.4'
services:
  app:
    image: public.ecr.aws/awsandy/docker-2048:latest
    ports:
      - "80:80"
```
Sau đó là chạy `docker-compose up` để thử nghiệm. Và chúng ta có app như trong ảnh ở đường dẫn `localhost`

![](https://images.viblo.asia/2b91b8a9-57f4-48e4-95b1-91af0bfd900d.png)

Chạy được rồi! Đóng bài và đi ch.... Ủa mà khoan, tiêu đề gì mà lạ vậy :v 

Thế là mình lại ngồi vào viết tiếp bước tiếp theo.
# Deploy lên AWS Beanstalk
## Các cách để deploy lên AWS Beanstalk
Elastic Beantstalk cho chúng ta 2 cách để deploy lên đó.

Cách 1 là bạn nén `.zip` toàn bộ source code của bạn sau đó chọn deploy via Upload.

Cách 2 là bạn sẽ deploy bằng CLI. Đó là lý do bạn cần chuẩn bị AWS Elastic Beanstalk CLI và Access Keys.

Còn trong thực tế, ai cũng mong muốn high tech theo cách 2, nhưng tuỳ vào 1 số quy chuẩn của tổ chức nào đó mà sẽ deploy với cách 1. Đây là cái không chỉ nằm riêng với deploy trên Elastic Beanstalk mà còn các hệ thống to hơn phải setup Fargate + RDS + 1 số dịch vụ khác.

Mình chỉ định nêu cách 2 nhưng có lẽ để demo tử tế, mình sẽ làm cả 2 cách cho các bạn xem
## Cách 1: Deploy bằng upload
Trước tiên bạn sẽ tạo 1 môi trường EB mới. Khi tạo hãy chọn Web server environment. Worker server environment sẽ dành cho các tác vụ chạy background. Còn đây là case chúng ta chạy ứng dụng web nên chọn Web environment.

![](https://images.viblo.asia/0d15289f-aa0f-489d-809a-3dcd4b68d290.png)

Sau khi tới bước tiếp theo chúng ta sẽ điền form như bình thường

![](https://images.viblo.asia/bb6c2e56-95e0-4964-9dec-2576195d22a8.png)

Tại bước này, chúng ta có thể chọn giữa Docker và ECS. Theo đúng như tôn chỉ deploy lười của dịch vụ thì mình chọn Docker :v ECS sẽ là 1 nghiên cứu lúc khác nếu có :v 

![](https://images.viblo.asia/b27d0cf0-af17-4e23-9fc2-bc36ff3833d6.png)

Tới phần Application Code, chúng ta sẽ chọn "Upload your code" và tải folder zip source code ứng dụng ta vừa chạy thử ở local

![](https://images.viblo.asia/993c5480-3cce-4cc9-ba77-0600f0690a6a.png)

Vẫn chú ý ở ảnh trên giúp mình. Ngày xưa AWS cho phép tạo EC2 không cần nằm trong VPC. Hiện tại thì nó đã có tên là Legacy EC2 và không hay sử dụng nữa. Vì vậy, bạn phải config VPC cho ứng dụng trước khi tạo môi trường, nếu không chắc chắn sẽ xảy ra lỗi. Hãy bấm hộp khoanh đỏ "Configure more options"

Form mở ra như ảnh dưới. Cuộn tới phần network và click vào config VPC.

![](https://images.viblo.asia/fc4b9b33-986b-4627-aa54-607eff6604d6.png)

Vào config VPC, bạn sẽ tạo 1 VPC mới hoặc có VPC nào có thể để mặc định thì dùng luôn. Sau khi có VPC thì bước tiếp theo bạn chỉ cần chọn instance subnets và database instance và lưu lại.

![](https://images.viblo.asia/74d0d20c-93cf-42a4-8ef1-c8161e51818d.png)

Cuối cùng là tạo và đợi

![](https://images.viblo.asia/4b11e54b-6888-4e36-b641-6e9cc5f1d744.png)

Ôi không lỗi rồi :v 

![](https://images.viblo.asia/cae8ad52-7aff-4df0-a792-68c7b13030d9.png)

Điều tra lỗi thì hoá ra mình đã nén nhầm. Nhưng tin tốt là chúng ta có thể upload để cập nhật ứng dụng.

Chạy vào trong folder và nén như này

![](https://images.viblo.asia/e8bbaca7-ca1f-4112-ab2f-a05bc7fd507a.png)

Sau đó bấm upload and deploy và up lại file zip lên

Và cuối cùng là chạy được

![](https://images.viblo.asia/0018a0a6-2eb8-46a6-be07-0783b77ae3b3.png)

Click vào URL thì chúng ta sẽ có ngay web được deploy. Hãy chú ý đường dẫn nữa để thấy rằng mình không bật localhost lên để lấp liếm với các bạn :v 

![](https://images.viblo.asia/6f2021c7-0227-49fe-befd-abbb2abfce2b.png)

Trước khi sang cách 2 thì làm ván game đã các bạn ơi.
## Cách 2: CLI và 1 chút setup kiểu coding
Quay lại thư mục, chúng ta sẽ chạy lệnh `eb init` và chọn như dưới
```shell
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
(default is 3): 9


Select an application to use
1) 2048-game-upload
2) Gryqhon lyrics site
3) [ Create new Application ]
(default is 3): 


Enter Application Name
(default is "2048-container"): 2048-game-cli
Application 2048-game-cli has been created.
Select a platform.
1) .NET Core on Linux
2) .NET on Windows Server
3) Docker
4) Go
5) Java
6) Node.js
7) PHP
8) Packer
9) Python
10) Ruby
11) Tomcat
(make a selection): 3

Select a platform branch.
1) Docker running on 64bit Amazon Linux 2
2) ECS running on 64bit Amazon Linux 2
(default is 1): 1

Cannot setup CodeCommit because there is no Source Control setup, continuing with initialization
Do you want to set up SSH for your instances?
(Y/n): n
```
Sau đó thì game đã lên rồi mọi người nhé. Mình đặt là 2048-game-cli

![](https://images.viblo.asia/a3edd73c-d997-4cd3-91f9-9756ba55a3bf.png)

Phía source code cũng có sự thay đổi về cấu trúc thư mục
```
2048-container/
├── .elasticbeanstalk/
│   └── config.yml
├── .gitignore
└── docker-compose.yml
```
Và `config.yml` của mình hiện tại
```yaml
branch-defaults:
  default:
    environment: null
    group_suffix: null
global:
  application_name: 2048-game-cli
  branch: null
  default_ec2_keyname: null
  default_platform: Docker running on 64bit Amazon Linux 2
  default_region: ap-northeast-1
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: null
  repository: null
  sc: null
  workspace_type: Application
```
Đang chọn cách deploy lười nên mình sẽ không giải thích chi tiết các trường trên nghĩa là gì mà giải thích qua loa.
- `branch-defaults`: Đây là nơi bạn sẽ setup các môi trường bạn muốn deploy
- Sau đó là môi trường tên `default`. Sau `default` thì bạn có thể định nghĩa thêm 1 số cái như `develop` hay `staging` tuỳ thích. Chúng ta sẽ nghịch option này ở phần sau.
- `environment`: Tên môi trường. Hiện đang là `null`
- `application_name`, `default_platform`, `default_region` là lúc chạy `eb create` đã được đưa thông tin vào

Sửa và lưu lại thì tới bước tiếp theo: deploy. Đây là lần deploy mới nên mình sẽ dùng `eb create`
```shell
$ eb create
Enter Environment Name
(default is 2048-game-cli-dev): 
Enter DNS CNAME prefix
(default is 2048-game-cli-dev): 

Select a load balancer type
1) classic
2) application
3) network
(default is 2): 2


Would you like to enable Spot Fleet requests for this environment? (y/N): N
Creating application version archive "app-221104_000725360971".
Uploading 2048-game-cli/app-221104_000725360971.zip to S3. This may take a while.
Upload Complete.
Environment details for: 2048-game-cli-dev
  Application name: 2048-game-cli
  Region: ap-northeast-1
  Deployed Version: app-221104_000725360971
  Environment ID: e-9kmsjd6dmy
  Platform: arn:aws:elasticbeanstalk:ap-northeast-1::platform/Docker running on 64bit Amazon Linux 2/3.5.0
  Tier: WebServer-Standard-1.0
  CNAME: 2048-game-cli-dev.ap-northeast-1.elasticbeanstalk.com
  Updated: 2022-11-03 15:07:28.390000+00:00
Printing Status:
2022-11-03 15:07:26    INFO    createEnvironment is starting.
2022-11-03 15:07:28    INFO    Using elasticbeanstalk-ap-northeast-1-068450627380 as Amazon S3 storage bucket for environment data.
2022-11-03 15:07:50    INFO    Created target group named: arn:aws:elasticloadbalancing:ap-northeast-1:068450627380:targetgroup/awseb-AWSEB-FHV1U31AV15V/a612bbe50fa43fc9
2022-11-03 15:07:50    INFO    Created security group named: sg-0ebefd86262401bf7
2022-11-03 15:08:06    INFO    Created security group named: awseb-e-9kmsjd6dmy-stack-AWSEBSecurityGroup-1UHGPZBDMAA9T
2022-11-03 15:08:06    INFO    Created Auto Scaling launch configuration named: awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingLaunchConfiguration-8p5WgymZ3i3K
2022-11-03 15:09:08    INFO    Created Auto Scaling group named: awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingGroup-1L1OLTCBCC5T6
2022-11-03 15:09:08    INFO    Waiting for EC2 instances to launch. This may take a few minutes.
2022-11-03 15:09:08    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:ap-northeast-1:068450627380:scalingPolicy:64c17e07-35cc-4020-a33e-d4607b7261d6:autoScalingGroupName/awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingGroup-1L1OLTCBCC5T6:policyName/awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingScaleDownPolicy-1jRJwqp6AnxD
2022-11-03 15:09:23    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:ap-northeast-1:068450627380:scalingPolicy:ee2595ac-9904-41ff-bb26-c4ff09db7ba0:autoScalingGroupName/awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingGroup-1L1OLTCBCC5T6:policyName/awseb-e-9kmsjd6dmy-stack-AWSEBAutoScalingScaleUpPolicy-jyL5yL67tnEy
2022-11-03 15:09:23    INFO    Created CloudWatch alarm named: awseb-e-9kmsjd6dmy-stack-AWSEBCloudwatchAlarmLow-K8BNS9GYUQZ1
2022-11-03 15:09:23    INFO    Created CloudWatch alarm named: awseb-e-9kmsjd6dmy-stack-AWSEBCloudwatchAlarmHigh-S4AOPXOEV9OE
2022-11-03 15:09:58    INFO    Created load balancer named: arn:aws:elasticloadbalancing:ap-northeast-1:068450627380:loadbalancer/app/awseb-AWSEB-MVH2KVZYQKSV/836f20b80840fe60
2022-11-03 15:09:58    INFO    Created Load Balancer listener named: arn:aws:elasticloadbalancing:ap-northeast-1:068450627380:listener/app/awseb-AWSEB-MVH2KVZYQKSV/836f20b80840fe60/69d2cc05017dd6e1
2022-11-03 15:10:17    INFO    Instance deployment completed successfully.
2022-11-03 15:10:24    INFO    Application available at 2048-game-cli-dev.ap-northeast-1.elasticbeanstalk.com.
2022-11-03 15:10:25    INFO    Successfully launched environment: 2048-game-cli-dev
```
Và môi trường của mình đã deploy xong

![](https://images.viblo.asia/c9e1898b-02bb-4e53-b266-950ba8930bc1.png)

Link cũng có luôn

![](https://images.viblo.asia/8e34269d-4738-4982-a313-f6f659257f23.png)
## DLC cho cách 2 
Và mình sẽ tạo ra môi trường thứ 2 ở trong config.yml
```yaml
branch-defaults:
  default:
    environment: 2048-game-cli-prod
    group_suffix: null
  development:
    environment: 2048-game-cli-dev
    group_suffix: null
global:
  application_name: 2048-game-cli
  branch: null
  default_ec2_keyname: null
  default_platform: Docker running on 64bit Amazon Linux 2
  default_region: ap-northeast-1
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: null
  repository: null
  sc: null
  workspace_type: Application
```
Do `2048-game-cli-prod` là môi trường mới nên mình vẫn phải chạy `eb create`. Lúc này ta có 2 môi trường.

Tiếp đó, giả sử có 1 chỉnh sửa code và deploy lại, chúng ta sẽ chạy `eb deploy`. Và khi kiểm tra, chúng ta sẽ thấy chỉ có môi trường default được modify

![](https://images.viblo.asia/510098e7-89eb-4681-adb5-e6dea1635b54.png)
Vậy là muốn chạy môi trường dev phải chạy thêm `eb deploy 2048-game-cli-dev`
```shell
$ eb deploy
Creating application version archive "app-221104_002840882829".
Uploading 2048-game-cli/app-221104_002840882829.zip to S3. This may take a while.
Upload Complete.
2022-11-03 15:28:42    INFO    Environment update is starting.      
2022-11-03 15:28:46    INFO    Deploying new version to instance(s).
2022-11-03 15:29:15    INFO    Instance deployment completed successfully.
2022-11-03 15:29:24    INFO    New application version was deployed to running EC2 instances.
2022-11-03 15:29:24    INFO    Environment update completed successfully.
$ eb deploy 2048-game-cli-dev
Creating application version archive "app-221104_003158965629".
Uploading 2048-game-cli/app-221104_003158965629.zip to S3. This may take a while.
Upload Complete.
2022-11-03 15:32:00    INFO    Environment update is starting.      
2022-11-03 15:32:04    INFO    Deploying new version to instance(s).
2022-11-03 15:32:33    INFO    Instance deployment completed successfully.
2022-11-03 15:32:41    INFO    New application version was deployed to running EC2 instances.
2022-11-03 15:32:41    INFO    Environment update completed successfully.
```
Thế nên nếu các bạn muốn deploy 2 môi trường trở lên, nếu ít thì có thể viết câu command liền `eb deploy default & eb deploy 2048-game-cli-dev` hoặc là với nhiều file hơn hãy làm 1 file script
# Kết
Như vậy mình đã giới thiệu cho các bạn sơ sơ về deploy ứng dụng lên AWS Elastic Beanstalk. Cảm ơn các bạn đã đọc bài