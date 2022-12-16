Sau khi nhận được chứng chỉ [AWS Solutions Architect - Associate](https://dev.vntechies.com/blog/aws-certs/kinh-nghiem-thi-chung-chi-aws-certified-solutions-architect-associate) mình có lên kế hoạch ôn luyện cho kỳ thi thứ 2 là Developer - Associate.

Title hiện tại của mình là developer chứ chưa phải là một SA nên kiến thức có được trong kỳ thi này sẽ liên quan trực tiếp đến công việc mình đang làm hàng ngày.

Sau khi có được kiến thức cơ bản trong kỳ thi đầu tiên, việc học để có chứng chỉ thứ 2 trong 2 tuần là điều hoàn toàn có thể. 

Dù vậy kỳ thi dành cho Developer có kiến thức đi sâu và rất khó tổng hợp, ngoài ra bắt buộc phải thực hành để có thể hiểu rõ nội dung → cần một kế hoạch cụ thể và nghiêm túc thực hiện.

Hi vọng bài chia sẻ của mình sẽ giúp ích cho những bạn đang có cùng mục đích với mình.

# AWSDV-A?

![](https://d1.awsstatic.com/Train%20&%20Cert/Certification%20Page%20Images/AWS-Certification-Current-Roadmap-May2019.36b629c3b9be6da400a13e6cf1a4f9f4ef680f70.png)

**Amazon AWS Certified Developer - Associate** là một trong 3 kỳ thi tương ứng với 3 career path của AWS cho các nhân sự làm việc với hệ thống của mình.
2 chứng chỉ còn lại dành cho **kiến trúc sư giải pháp (Solutions Architect)** và **vận hành hệ thống (SysOps)**. Mỗi kỳ thi có 2 level: **Associate và Professional**.

Kỳ thi với 7 domains chính bao gồm:
- Domain 1: **Deployment** 22%
- Domain 2: **Security** 26%
- Domain 3: **Development with AWS Services** 30%
- Domain 4: **Refactoring** 10%
- Domain 5: **Monitoring and Troubleshooting** 12%

Trong quá trình phát triển dự án trên AWS, kiến thức học được từ AWSDV-A sẽ đem lại cho các lập trình viên những best practices về các quy trình triển khai, vận hành cũng như việc sử dụng, tương tác với các dịch vụ thông qua AWS CLI hoặc các bộ SDKs. Ngoài ra còn cung cấp hiểu biết về việc monitoring, debugging những cloud-based applications (ứng dụng trên mây? ).

Lượng kiến thức kỳ thi cover không rộng bằng kỳ thi Solutions Architect, tập trung vào các dịch vụ liên quan đến các tác vụ của lập trình viên.
Tuy không rộng nhưng rất sâu và cụ thể nên đòi hỏi bạn phải thực hành thông qua các lab để có thể hiểu tường tận tất cả những kiến thức mình được học.

Để ôn được trong 2 tuần bạn cần phải lấy (hoặc học qua) chứng chỉ SA trước, nếu không mình nghĩ quá trình học sẽ kéo dài khoảng 2 tháng.

# Tại sao nên có chứng chỉ AWSDV-A?

- Kiến thức về các kiến trúc hệ thống cơ bản của các cloud-based apps (web app, serverless app,...)
- Có thể sử dụng các service để xây dựng các best practices liên quan đến quy trình CI/CD
- Sử dụng CLI, SDKs để phát triển ứng dụng
- Best pratices về security trong quy trình phát triển
- Giúp CV đẹp hơn, <small>tăng lương</small>,...
- Giúp công ty của bạn join APN (Amazon Partners Network), logo AWS-certified được in lên danh thiếp, khá xịn xò.

![](https://pics.me.me/github-gitlab-and-bitbucket-users-me-using-aws-codepipeline-im-55774407.png)

Cụ thể hơn một ngày đẹp trời, bạn sẽ thấy nó có ích lúc:

- Auto deployment to AWS cloud, less time - less mistake
- Tối ưu hoá hệ thống, monitoring, debugging bottleneck process.
- Quản trị rủi ro về security trong quá trình phát triển dự án sử dụng AWS.
- Triển khai hệ thống trên AWS theo thiết kế.

Với kỳ thi SAA - kiến thức tập trung chủ yếu vào phase thiết kế thì trong kỳ thi DVA, các kiến thức liên quan sẽ tập trung vào những tác vụ thường ngày của lập trình viên, nếu trong môi trường chưa áp dụng những kiến thức này thì việc thực hành là điều cần thiết.
Nếu có thể, hãy lên kế hoạch ôn tập càng sớm càng tốt.

Dù sao thì chứng chỉ cũng chỉ là một phần, quan trọng là có sử dụng được, làm được việc hay không thôi nên cũng đừng quá đặt nặng vấn đề đỗ/trượt nhé ;)

# Cấu trúc kỳ thi

Mình sẽ cung cấp thông tin của kỳ thi mới nhất - **AWSDV-A Released June 2018 (English version)**

- Đề thi sẽ gồm **65 câu hỏi trắc nghiệm** (bao gồm cả cả multiple answers)
- Thời gian: **130 phút**
→ trung bình **2 phút/câu**

Điểm để pass là **720/1000 (72%)** → để đủ điểm đỗ, trong quá trình ôn luyện bạn nên target tầm **75% trở lên**.

# Chuẩn bị cho kì thi

![](https://ilovethedangerindistance.files.wordpress.com/2013/03/studying.png)

Khác với SA, các services liên quan tới kỳ thi hầu hết không được công ty mình sử dụng → tốn rất nhiều thời gian thực hành để mình quen và hiểu rõ hơn các service. Thời gian học cũng mất nhiều hơn, mỗi ngày tầm 1-2 tiếng. Ngoài ra, do không có text book nên mình phải tự tổng hợp và take note theo các course, tài liệu.

## ① AWS Certified Developer - Associate 2019 by acloudguru trên Udemy

- Link: https://www.udemy.com/aws-certified-developer-associate
- Note:
  - Khoá học mất phí (12$ ~ 1 bữa nhậu)
  - Cover toàn bộ kiến thức trong kỳ thi AWSDV-A, phần đầu khá nhiều kiến thức trùng với SA-A
  - Có đầy đủ lab để thực hành các service ít được sử dụng
  - Giảng viên nói hơi chậm, mình phải tăng speed lên: với Ryan Kroonenburg để speed 1.5, Faye Ellis là 1.75.
  - Do không có text book → take note cẩn thận, nhất là các exam tips

## ② AWS Fundamentals: Building Serverless Applications trên courera

- Link: https://www.coursera.org/learn/aws-fundamentals-building-serverless-applications
- Note:
  - Khoá học miễn phí
  - Có khả năng tự thiết kế, build một ứng dụng serverless đơn giản
  - Trong kỳ thi phiên bản mới, các câu hỏi về serverless khá nhiều

## ③ Examination Guide &amp; Sample questions

- Link: 
  - exam guide: https://d1.awsstatic.com/training-and-certification/docs-dev-associate/AWS_Certified_Developer_Associate-Exam_Guide_EN_1.4.pdf
  - sample questions: https://d1.awsstatic.com/training-and-certification/docs-dev-associate/AWS_certified_developer_associate_examsample.pdf
- Note:
  - Sample questions, các nội dung cơ bản của kỳ thi
  - Nên đọc đầu tiên

## ④ AWS Certified Developer Associate 2019 [4 Practice Tests] by Stephane Maarek

- Link: https://www.udemy.com/aws-certified-developer-associate-practice-tests-dva-c01
- Note:
  - Mất phí (~12$)
  - Gồm 4 đề thi thật + 1 đề thi 33 câu mới được update trong tháng 7
  - Nội dung khó hơn đề thi thật, nội dung không giống lắm nhưng sẽ giúp lộ ra những phần chưa chắc chắn của người học
  - Mình pass 1 test và fail 4 test còn lại :))

## ⑤ [Optional] Practicing Continuous Integration and Continuous Delivery on AWS

- Link: https://d1.awsstatic.com/whitepapers/DevOps/practicing-continuous-integration-continuous-delivery-on-AWS.pdf
- Note:
  - Miễn phí
  - Cung cấp các scenarios, best practices cho quy trình CI/CD cho các ứng dụng sử dụng AWS

## ⑥ AWS Fundamentals: Addressing Security Risk

- Link: https://www.coursera.org/learn/aws-fundamentals-addressing-security-risk
- Note:
  - Miễn phí
  - Khoá học mới của AWS về security của hệ thống cloud
  - Khá bổ ích cho kỳ thi, có thể vừa học vừa đọc whitepaper số ⑦

## ⑦ AWS Security Best Practices
- Link: https://d0.awsstatic.com/whitepapers/Security/AWS_Security_Best_Practices.pdf
- Note:
  - Hàng miễn phí của AWS
  - Cực kỳ đầu đủ nhưng hơi dài, có thể đọc lướt

## ⑧ Exam readiness test
- Link: https://www.aws.training/Details/Curriculum?id=19185
- Note:
  - Hàng miễn phí của AWS
  - Chỉ có tác dụng tinh thần, làm đúng hết để lấy tự tin (sau khi fail hết các test ở course ④  =)) )

## ⑨ Pre-exam

- Review lại bằng notes ghi lại trong khoá học 
- Tham khảo các last-minute note của những người thi trước tại [đây](https://acloud.guru/forums/aws-certified-developer-associate/discussion/-KUdI5f2LNbi4wvK7v4I/how_to_pass_aws_certified_deve), [đây](https://acloud.guru/forums/aws-certified-developer-associate/discussion/-KBkBPMHpN2ITSH1oDTO/passed-with-90-my-exam-tips) hoặc [đây](http://clusterfrak.com/notes/certs/aws_deva_notes)
- Ăn no, ngủ kỹ, cầu trời đừng bão hoặc có người nhảy tàu vào hôm thi

## ⑩ Đăng ký thi

- Đăng ký tại [certmetrics](https://www.certmetrics.com/amazon/) (mình thi tại Nhật)
- Mang theo 2 loại giấy tờ tuỳ thân (thẻ ngoại kiều, passport hoặc chứng mình thư + thẻ ngân hàng)
- Đến lúc nào là có thể thi ngay lúc đó, làm bài **100% trên máy tính**
- Lần này mình thi tại một test site khác so với lần trước, sử dụng PSI Kiosk.
Toàn bộ quá trình thi được giám sát bởi online proctor thông qua 2 webcams: 1 quay thẳng mặt, 1 quay thẳng bàn phím.
Chỉ cần rời tay khỏi bàn, chống cằm hoặc gãi mũi là sẽ được một warning không che miệng hoặc phải để 2 tay trên bàn. 2 tiếng thi thôi mà khổ vô cùng =))
[![](http://img.youtube.com/vi/WQ0kWepHXLo/0.jpg)](http://www.youtube.com/watch?v=WQ0kWepHXLo)

# Tips

![](https://i.redd.it/gkee3xdcfdz11.png)

- Nên đăng ký một **tài khoản free-tier** để thực hành (theo course).
- Nếu chưa yên tâm, đăng ký thêm tài khoản tại qwiklabs.com để làm nhiều bài thực hành hơn
- Nên chuẩn bị **kiến thức base về AWS thật tốt** rồi mới bắt đầu
- Deployment
  - deploy sử dụng **Elastic Beanstack**, **Cloud Formation**, **CodeDeploy**, **CodePipeline**
  - các deployment strategies: **all-at-once**, **rolling**, **blue-green**,...
  - CD/CI workflow với **CodeCommit**, **CodeBuild**, **CodeDeploy**, **CodePipeline**
  - Container services với **ECS**
- Security: **in-rest, on-transit encryption**, **AWS KMS** sử dụng **master key, envelope key**.
- Development with AWS Services
  - Học kỹ về **APIGateway, Lambda** (serverless architect)
  - DynamoDB (thiết kế, index của noSQL DB), **query vs scan**, cách tính **Read/Write Provisioned Throughput**
  - DAX, Elastic Cache, các caching strategies: **lazy loading, write-through**
  - SQS, SNS, Kinesis: **pull, push, poll**
  - S3 (Access management, CORS)
  - Cognito (**Federated Identities, User pool, Identity pool**, [STS](https://docs.aws.amazon.com/STS/latest/APIReference/Welcome.html))
  - **Exponential Backoff**, một số interface đơn giản của SNS, DynamoDB API,...
- Refactoring: các scenario migrate to AWS
- Monitoring &amp; Troubleshooting
  - **X-Ray** monitoring serverless services
  - **CloudWatch vs CloudTrail vs Config**
- Thời gian thi là 130 phút, khoảng 70 phút là mình hoàn thành, tuy nhiên nên check lại đáp án thật kỹ, **đừng ngại đặt flag với những câu mình chưa chắc chắn**

# Kết quả

- Kết quả **PASS/FAIL** sẽ được báo **ngay sau khi hoàn thành bài thi và survey**, điểm số cụ thể sẽ được gửi sau tối đa 5 ngày làm việc.
- **Nếu có thể hãy share kết quả và quá trình chuẩn bị của bản thân, nó có thể giúp ích cho những người cũng có ý định đăng ký kỳ thi này**
- Điểm của mình **932/1000** (thanks to PSI Kiosk with 2 full HD webcams)

![](https://i.imgur.com/GWQO3og.png)

# Ref
https://www.notion.so/qmau/Amazon-Developer-Associate-7b19f36e1e384060baeedb7a5219383b

# Bài viết gốc trên VNTechies Dev Blog 
https://dev.vntechies.com/blog/aws-certs/kinh-nghiem-thi-chung-chi-aws-certified-developer-associate