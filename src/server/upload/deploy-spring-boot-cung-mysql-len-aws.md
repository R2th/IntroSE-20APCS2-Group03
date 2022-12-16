![](https://images.viblo.asia/697f5c53-c20a-45f5-9dba-d162316b5e33.png)

# 1. Tổng quan 
AWS (Amazon Web Services) là một trong những dịch vụ đám mây phổ biến, cung cấp nhiều gói dịch vụ đám mây. Trong tutorial này, mình sẽ hướng dẫn các bạn deploy Spring Boot app cùng MySQL miễn phí lên AWS sử dụng Elastic Beanstalk. 

Yêu cầu trước: 
* Python
* Pip 
* Git 
* Java
* MySQL
* Maven 

# 2. Lưu ý khi đăng ký tài khoản Amazon AWS
AWS cung cấp cho bạn một tài khoản có bậc miễn phí các dịch vụ trong vòng 12 tháng trong phạm vi cho phép. Mình khuyên là nên deploy những dự án demo nhỏ nhỏ ở hạng mục này thôi, chứ về lâu về dài nên đầu tư một gói lớn hơn. 

Ngoài ra, AWS cũng đòi hỏi một thẻ ngân hàng quốc tế để xác nhận danh tính như Visa, Mastercard... và cũng sẽ trừ thử 1 USD (1 USD này sẽ được hoàn trả lại nhưng phí quy đổi ngoại tệ thì không :v). Ở đây, thì mình dùng thẻ MasterCard ảo của Viettel Pay vì mỗi tháng không phải đóng phí. 

# 3. Có sẵn một Spring Boot app để deploy
Mình sẽ sử dụng một app Spring Boot cung cấp Restful API đi cùng với MySQL database mình đã tạo trước đó. Các bạn có thể download source code tại [Github](https://github.com/npthao1312/springdoc-book-service). 

```
$ git clone https://github.com/npthao1312/springdoc-book-service
```

Đây là một app Rest CRUD đơn giản, gồm những API sau:
| Methods | Urls           | Actions                |
|---------|----------------|------------------------|
| POST    | /api/books     | tạo Book mới        |
| GET     | /api/books     | gọi tất cả các Book     |
| GET     | /api/books/:id | tạo một Book bằng :id |
| PUT     | /api/books/:id | chỉnh sửa một Book bằng :id   |
| DELETE  | /api/books/:id | xóa một Book bằng :id   |

Bạn có thể xem chi tiết và test thử qua giao diện Swagger UI. Tutorial cách xây dựng app này có thể tìm thấy ở đây: [Tự động hóa tạo tài liệu API sử dụng Java Springdoc và Swagger UI](https://viblo.asia/p/tu-dong-hoa-tao-tai-lieu-api-su-dung-java-springdoc-va-swagger-ui-63vKjdaRl2R)

# 4. Install Elastic Beanstalk CLI (EB CLI)
Ở phần trên bài, có yêu cầu bạn phải cài đặt Python và Pip trước, nếu không bạn có thể bắt đầu tải và cài đặt tại trang chính thức của Python: https://www.python.org/downloads/

EB CLI là giao diện dòng lệnh cho AWS Elastic Beanstalk giúp chúng ta quản lý môi trường từ local của chính mình. Có rất nhiều cách để làm việc với hạ tầng của AWS, như AWS Console hay CloudFormation, mỗi cái đều có lợi hại riêng nhưng ở bài này mình sẽ sử dụng CLI.  

Chạy câu lệnh sau:
```
$ pip install awsebcli --upgrade --user
```

Phần --upgrade sẽ bảo pip upgrade tất cả các module cần dùng. Phần --user sẽ bảo pip install EB CLI chỉ install cho user đang sử dụng thôi để không phải chỉnh sửa các thư viện mà OS đang sử dụng.

Xác nhận là EB CLI đã được install đúng cách: 
```
$ eb --version
EB CLI 3.20.0 (Python 3.9.6)
```

# 5. Khởi tạo dự án Beanstalk
Để khởi tạo một dự án Beanstalk, mở CMD ở root folder của Spring Boot App, rồi chạy câu lệnh: 
```
$ eb init
```
Chúng ta sẽ chọn vùng, ở đây mình chọn Singapore
```
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
(default is 3): 7
```

Cung cấp token AWS của bạn. Nếu chưa có thì hãy truy cấp tới, [AWS Security Credentials](https://console.aws.amazon.com/iam/home?#/security_credentials): 

Nhấn vào mục **Access keys (access key ID and secret access key)**. Nhấn nút **Create New Access Key**. Hãy tải xuống file đó và nhập các key vào CMD của bạn.

![Tạo access key](https://images.viblo.asia/67b29ce0-5775-4900-b4e8-aa375e76c122.PNG)

Tiếp theo là đặt tên app, phần này mình lựa chọn mặc địch, bạn có thể đặt tên app dễ nhớ hơn:
```
Enter Application Name (default is "springdoc-book-service"):
```

Tiếp đến, chúng ta sẽ chọn platform để deploy, 

```
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
(make a selection): 6
```

Có thể deploy app bằng Tomcat nhưng mình sẽ chọn Java cho đơn giản. Nhấn số 6. Tiếp theo là version Java, trong Spring Boot app này mình sử dụng Java 8, chọn 2: 

```
Select a platform branch.
1) Corretto 11 running on 64bit Amazon Linux 2
2) Corretto 8 running on 64bit Amazon Linux 2
3) Java 8 running on 64bit Amazon Linux (Deprecated)
4) Java 7 running on 64bit Amazon Linux (Deprecated)
(default is 1): 2
```

Có thể thấy là hiện tại dịch vụ AWS chưa cung cấp tới Java 16. Đây là một điều các bạn có thể cân nhắc trước khi deploy lên AWS. 

Ở đây mình cũng sẽ không sử dụng CodeCommit (một dạng VCS của AWS) vì mình không có nhu cầu. 

```
Do you wish to continue with CodeCommit? (Y/n): n
```

Mình nghĩ là nên set up SSH khi cần kết nối với EC2, bạn sẽ tạo một keypair. 

```
Do you want to set up SSH for your instances? (Y/n): Y
```

# 6. Cấu hình môi trường cho Spring Boot với MySQL trên AWS
Chúng ta sẽ tạo một môi trường Elastic Beanstalk với câu lệnh sau: 

```
$ eb create --single --database --database.username {master username của bạn} --database.password {mật khẩu của bạn}
```

Nên tạo tài khoản và mật khẩu trùng với thông tin đã được set up trong cấu hình Spring Boot app để không gây xung đột. Phần --single là để tạo duy nhất một instance và không đi kèm với load balancer. Vì đây mới chỉ là một dự án để test thử, sẽ không cần load balance như production. 

Bạn có thể tùy chọn giữa nhiều RDS khác nhau như mysql, oracle-se1, postgres, sqlserver-ex, sqlserver-web, sqlserver-se với phần tùy chọn --database.engine. Thông tin rõ hơn có thể tìm kiếm ở [đây](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html).

```
Enter Environment Name
(default is springdoc-book-service-dev):
Enter DNS CNAME prefix
(default is springdoc-book-service-dev): book-dev

Would you like to enable Spot Fleet requests for this environment? (y/N): N
```

Phần DNS CNAME sẽ là tên subdomain dẫn tới website của bạn, nên viết cho ngắn một tí. Chờ một lúc đợi khởi tạo xong, nhanh tầm 1 bài nhạc, lâu thì 2-3 bài nhạc :v 

```
Uploading: [##################################################] 100% Done...
Environment details for: springdoc-book-service-dev
  Application name: springdoc-book-service
  Region: ap-southeast-1
  Deployed Version: app-end-210730_211742
  Environment ID: e-pwkry3cy69
  Platform: arn:aws:elasticbeanstalk:ap-southeast-1::platform/Corretto 8 running on 64bit Amazon Linux 2/3.2.3
  Tier: WebServer-Standard-1.0
  CNAME: book-dev.ap-southeast-1.elasticbeanstalk.com
  Updated: 2021-07-30 14:18:17.737000+00:00
Printing Status:
2021-07-30 14:18:16    INFO    createEnvironment is starting.
2021-07-30 14:18:17    INFO    Using elasticbeanstalk-ap-southeast-1-495580400293 as Amazon S3 storage bucket for environment data.
2021-07-30 14:18:40    INFO    Created security group named: awseb-e-pwkry3cy69-stack-AWSEBSecurityGroup-CYQJE550PXKO
2021-07-30 14:18:55    INFO    Creating RDS database named: aaaogu14v5vhq4. This may take a few minutes.
2021-07-30 14:18:55    INFO    Created EIP: 13.213.126.54
```

Dùng câu lệnh `eb console` để mở cửa sổ console của Enviroment này, như thế này là ổn: 
![](https://images.viblo.asia/c046a544-bddf-4a92-a611-17980a266c81.PNG)

Click vào phần `Configuration`:

![Capture.PNG](https://images.viblo.asia/6b2f779b-3791-4715-9a6b-995c129eb218.PNG)

Copy endpoint của RB:
![image.png](https://images.viblo.asia/c2279093-57c1-49ce-8903-5412d0a382be.png)

Chúng ta cần chỉnh sửa lại một tí biến môi trường để tương thích với AWS. Spring Boot App sẽ tự động chạy trên cổng 8080, nhưng AWS sẽ bắt cổng 5000, truy cập vào file `src/main/resources/application.properties`: 

```
server.port=5000
spring.datasource.url=jdbc:mysql://aaaogu14v5vhq4.ccmcaualowje.ap-southeast-1.rds.amazonaws.com:3306/ebdb
spring.datasource.username= 
spring.datasource.password= 
spring.datasource.platform=mysql
spring.datasource.initialization-mode=always

spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.hibernate.ddl-auto= update
```

Chúng ta sẽ tạo một file jar cho Spring Boot app, sử dụng Maven hoặc những tool có sẵn trong IDE: 
```
$ mvn clean package spring-boot:repackage
```
Câu lệnh này sẽ tạo ra một phiên bản ứng dụng standalone có tên `springdoc-book-service-0.0.1-SNAPSHOT.jar` ở trong thư mục target. 

# 7. Cấu hình Deploy trong file yaml
Sau khi hoàn thành các bước ở trên, Elastic Beanstalk sẽ tự động tạo một file cấu hình deploy trong thư mục `.elasticbeanstalk/config.yml`. Chúng ta sẽ cho thêm hai dòng để trỏ deploy file jar trên: 

```
deploy:
  artifact: target/springdoc-book-service-0.0.1-SNAPSHOT.jar
```

File `config.yml` đầy đủ sẽ giống như thế này: 
```
branch-defaults:
  main:
    environment: null
    group_suffix: null
deploy:
  artifact: target/springdoc-book-service-0.0.1-SNAPSHOT.jar
global:
  application_name: springdoc-book-service
  branch: null
  default_ec2_keyname: aws-eb
  default_platform: Corretto 8 running on 64bit Amazon Linux 2
  default_region: ap-southeast-1
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: eb-cli
  repository: null
  sc: git
  workspace_type: Application
```

# 8. Deploy 
Bây giờ, chúng ta sẽ deploy. 
```
$  eb deploy
Uploading: [##################################################] 100% Done...
2021-07-30 14:54:53    INFO    Environment update is starting.
```

Check lại console và copy đường link tới website: 
![image.png](https://images.viblo.asia/a5f665d7-518f-42d8-9107-b6e1d321c490.png)

Và nó đã lên: 
![image.png](https://images.viblo.asia/824d74ce-a1f9-44d2-b8d3-06ce5dee3007.png)

# 9. Test
Chúng ta sẽ test bằng chính Swagger UI: 
![image.png](https://images.viblo.asia/bc834fed-6de6-45b3-bafc-3c456b4277c4.png)

# 10. Terminate AWS Elastic Beanstalk Enviroment
Vì mình cũng chỉ deploy cái app này để biết bài này thôi nên không cần phải nó chạy mãi tốt giờ sử dụng, nên đây là cách Terminate một Enviroment trên Elastic Beanstalk, thường thì nếu chỉ stop thôi có khi vẫn còn tài nguyên đang sử dụng. Tốt nhất là nên Terminate, sử dụng câu lệnh: 

```
$ eb terminate springdoc-book-service-dev
```

# Phụ lục: Kiểm tra RDS
Đôi khi chúng ta cần phải có một số thao tác với database, để kết nối với RDS, chúng ta cần phải cài đặt luật lệ cho cổng inbound TCP. Chọn DB instance ở phần Configuration ở trên, kéo xuống tới Security group và chọn và loạt EC2 - Inbound: 
![image.png](https://images.viblo.asia/5a84d388-aaa3-460d-95cd-23f8dcacc654.png)

Chọn Edit Inbound Rules:
![image.png](https://images.viblo.asia/7e6a9e13-f15d-4113-b8bf-81eeb5c71078.png)

Chọn Add new rule, nhấn chọn loại MySQL/Aurora, và source đến từ My IP, IP của bạn sẽ tự hiện ra: 
![Capture.PNG](https://images.viblo.asia/53559dcb-d1b2-4516-be5e-148102e1ef7e.PNG)

Từ đây, các bạn có thể thoải mái connect với database MySQL RDS bằng username và mật khẩu bạn đã tạo: 
```
$ mysql -h aaaogu14v5vhq4.ccmcaualowje.ap-southeast-1.rds.amazonaws.com -P 3306 -u root -p
```

![image.png](https://images.viblo.asia/a84814fe-3df0-4fb2-bea1-ec9eb1e171ac.png)