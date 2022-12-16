> Nội dung bài viết này cho kỳ thi năm 2020, bản update cho kỳ thi [AWS Certified Solutions Architect - Associate SAA-C03 năm 2022 có tại VNTechies Dev Blog](https://dev.vntechies.com/blog/aws-certs/kinh-nghiem-thi-chung-chi-aws-certified-solutions-architect-associate-saa-c03). 


Bài viết chia sẻ quá trình ôn tập cho kỳ thi AWSSA-A (Amazon AWS Certified Solutions Architect - Associate).
Hi vọng việc chia sẻ lộ trình học tập sẽ giúp ích cho các bạn ~~có quỹ thời gian hạn chế như mình~~ lười như mình tiết kiệm được thời gian và đạt được kết quả tốt nhất.

# AWSSA-A là gì?

![](https://www.trendmicro.com/closethegap/wp-content/uploads/2018/11/aws-certification-roadmap.png)

**Amazon AWS Certified Solutions Architect - Associate** là một trong 3 kỳ thi tương ứng với 3 career path của AWS cho các ~~kỹ sư~~ nhân sự làm việc với hệ thống của mình.
2 chứng chỉ còn lại dành cho **lập trình viên (Developer)** và **vận hành hệ thống (SysOps)**. Mỗi kỳ thi có 2 level: **Associate và Professional**.

Trong quá trình thiết kế và triển khai dự án trên AWS, kiến thức học được từ AWSSA-A sẽ đem lại cho các kỹ sư những cái nhìn tổng quan về các dịch vụ, những điều nên làm (và không nên làm) để xây dựng một hệ thống tốt trên cloud.

Lượng kiến thức mà kỳ thi cover khá rộng (gần như toàn bộ các services), nếu bạn chưa có kinh nghiệm sử dụng các dịch vụ của AWS sẽ là một bất lợi (mất nhiều thời gian để học hơn). Bù lại, do khối lượng kiến thức rộng nên sẽ không quá tập trung đi sâu vào phần core của từng service nên đây cũng là một chứng chỉ **khá dễ học cho những người mới bắt đầu**.

# Tại sao nên có chứng chỉ AWSSA-A?
![](https://cdn-images-1.medium.com/max/1200/1*p-HtCPF_O9VlBoKPkrLRRg.jpeg)

- Kiến thức tổng quát về AWS, các best practices (worst practices) trong thiết kế hệ thống (không chỉ cho AWS)
- Giúp CV đẹp hơn, ~~*tăng lương*~~,...
- Giúp công ty của bạn join APN (Amazon Partners Network), nghe nói được in lên cả danh thiếp, khá xịn xò.

Cụ thể hơn một ngày đẹp trời, bạn sẽ thấy nó có ích lúc:

- Đặt máy chủ NAT rồi mà EC2 vẫn không kết nối được internet
- Đặt load balancer mà connect đến EC2 lúc được lúc không
- Sử dụng life cycle cho S3 để giảm chi phí cho công ty (sếp khoái)
- Đề xuất các công nghệ, giải pháp mới để giải quyết (một cách tốt hơn) bài toán được đặt ra (Lambda để giảm chi phí, DynamoDB để có thể scale tốt hơn,...)

Chung quy lại là **chỉ có được, không có mất** (đùa đấy, mất thời gian), nếu bạn thấy nó có ích thì nên bắt đầu lên kế hoạch ngay từ hôm nay.

# Cấu trúc kỳ thi

Các kỳ thi của AWS sẽ renew liên tục để có thể phù hợp với các thay đổi và bổ sung diễn ra hằng ngày, chính vì thế các thông tin về kỳ thi trên mạng có thể sẽ khác nhau.

Mình sẽ cung cấp thông tin của kỳ thi mới nhất - **AWSSA-A Released February 2018 (English version)**

- Đề thi sẽ gồm **65 câu hỏi trắc nghiệm** (bao gồm cả cả multiple answers)
- Thời gian: **130 phút**
→ trung bình **2 phút/câu**

Vì cấu trúc đề thi có rất nhiều câu hỏi multiple answers nên việc ôn tủ hay đánh bừa cũng không giúp ích được quá nhiều (kể cả bạn có người thân làm to ở Sơn La hay Hoà Bình).

Trong các kỳ thi trước, điểm để pass rơi vào khoảng 65% tuỳ độ khó. Tuy nhiên ở phiên bản mới nhất, điểm pass cố định ở mức **720/1000 (72%)** → để đủ điểm đỗ bạn nên target tầm **75% trở lên**.

# Chuẩn bị cho kì thi:

![](https://i.imgur.com/b9Ya8oH.png)

Mình chủ động nhận nhiều task liên quan đến phần infra với mục đích tiếp xúc với AWS hằng ngày, việc có thể quen với các core services đã giúp mình chỉ cần **khoảng 1 tháng** để ôn thi (30p mỗi tối và cuối tuần).

## ① AWS fundementals by AWS trên coursera

- Link: https://www.coursera.org/learn/aws-fundamentals-going-cloud-native
- Note:
  - Khoá học free
  - Cung cấp kiến thức, khái niệm cơ bản của các core services cho người mới bắt đầu
  - ~~Giảng viên xinh, nói chuyện dễ thương~~

## ② AWS Certified Solutions Architect - Associate 2019 by Ryan Kroonenburg trên Udemy

- Link: https://www.udemy.com/aws-certified-solutions-architect-associate/
- Note:
  - Khoá học mất phí (12$ ~ 1 bữa nhậu)
  - Cover toàn bộ kiến thức trong kỳ thi AWSCSA-A
  - Cung cấp khá nhiều tips, tricks, kinh nghiệm với dự án thực tế nên sẽ dễ hiểu hơn việc đọc sách
  - Một số chương khá nặng lý thuyết, nghe liên tục quá 30 phút có tác dụng thay thuốc ngủ.
  - **Highly recommend** đọc sách ↓ song song với việc học khoá này

## ③ Giáo trình AWS Certified Solutions Architect – Associate by AWS Associate Team

- Link sách _lậu cho các thanh niên nhân phẩm kém (như mình)_: https://github.com/qmau-me/books/blob/master/.gitbook/assets/aws-certified-solutions-architect-official-study-guide.pdf
- Note:
  - Sách khá dày (**500+ trang**) nhưng trình bày dễ hiểu, dễ đọc, đừng quá lo lắng nếu tiếng Anh của bạn chưa được tốt
  - Nên vừa đọc vừa highlight để có thể nhớ được luôn những ý quan trọng, tránh lan man
  - Đọc hết sách, làm hết test (**&gt;75%**) trong này thì kê cao gối ngủ rồi đi thi được rồi
  - Đến trước hôm thi vẫn còn 1,2 chương gì đó chưa đọc được nên chuyển qua học online ↑ để được giảng viên tổng hợp nội dung.

## ④ FAQs của các service chính: VPC, RDS, EC2, S3 and IAM.

- Note:
  - Miễn phí
  - AWS có hệ thống document rất tử tế, tử tế đến mức đọc khổ như đọc sách vì quá dài.
  - Đâu đó khoảng **10% câu hỏi** trong kỳ thi sẽ xuất hiện trong phần này.

## ⑤ Khoá AWS Certified Solutions Architect - Associate Practice Tests cũng của acloud guru trên udemy

- Link: https://www.udemy.com/aws-certified-solutions-architect-associate-practice-tests
- Note:
  - Mất thêm một bữa nhậu
  - Có thể biết được cấu trúc đề thi, dạng câu hỏi trong bài thi
  - Mình có làm 3 mock test vào đêm trước hôm đi thi (_fail cả 3 test_), tuy nhiên hôm sau thi gặp khoảng **3-4 câu hỏi** khá giống những câu đã làm.

## ⑥ [Optional] Thay cho khoá học số ②
- Khoá học AWS Certified Solutions Architect - Associate trên [pluralsight](https://www.pluralsight.com/courses/aws-certified-solutions-architect-associate) miễn phí bằng cách đăng ký tại [đây](https://visualstudio.microsoft.com/dev-essentials/)

## ⑦ [Optional] AWS Fundamentals: Building Serverless Applications trên courera

- Link: https://www.coursera.org/learn/aws-fundamentals-building-serverless-applications
- Note:
  - Khoá học miễn phí
  - Google cloud có hệ thống khoá học trên coursera khá đầy đủ, AWS mới chỉ tập trung bán khoá học của mình (cậy là provider cho nhà giàu), tuy nhiên gần đây AWS bắt đầu có những khoá học miễn phí khá hay trên coursera
  - Lambda, serverless đang là một keyword rất hot, việc tìm hiểu về nó cũng giúp ích cho kỳ thi (khoảng **5 câu hỏi liên quan tới Lambda**)

## ⑧ Pre-exam

- Review lại bằng [study note](http://mistwire.com/2016/05/aws-certified-solutions-architect-associate-study-notes/)
- Review bằng [mind-map](https://github.com/gitvani/aws-mindmap)
- Review 3 chương đầu tại [đây](https://books.qmau.me/acsa/index) (quá ~~bận~~ lười để tổng kết 9 chương còn lại)

## ⑨ Đăng ký thi

- Đăng ký tại [certmetrics](https://www.certmetrics.com/amazon/) (mình thi tại Nhật)
- Mang theo 2 loại giấy tờ tuỳ thân (thẻ ngoại kiều, passport hoặc chứng mình thư + thẻ ngân hàng)
- Đến lúc nào là có thể thi ngay lúc đó, làm bài **100% trên máy tính**

# Tips

- Nên đăng ký một tài khoản free-tier để làm bài tập thực hành(trong sách) và labs (trong khoá học). Có thể bỏ qua nếu bạn có kinh nghiệm làm việc với AWS
- Nếu chưa yên tâm, đăng ký thêm tài khoản tại qwiklabs.com để làm nhiều bài thực hành hơn
- Nên học khoảng **20-30% khoá học ① và ② rồi bắt đầu đọc sách** để dễ hiểu hơn

![ec2types](https://i.imgflip.com/2cw59g.jpg)

- Nên chú ý phần sử dụng [EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/), [](), [Instance Store vs EBS](https://aws.amazon.com/premiumsupport/knowledge-center/instance-store-vs-ebs/), [OLAP vs OLTP solutions](https://docs.aws.amazon.com/en_us/redshift/latest/dg/c_redshift-and-postgres-sql.html)
- Hiểu kỹ các encryption scenario của [S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingEncryption.html), [RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html), [EBS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) và các snapshots
- Dành thời gian học phần AWS Well-Architecture Framework, vừa có ích trong kỳ thi, vừa có ích cho việc thiết kế hệ thống thực tế
- Thời gian thi là 130 phút, khoảng 50 phút là mình hoàn thành, tuy nhiên nên check lại đáp án thật kỹ, **đừng ngại đặt flag với những câu mình chưa chắc chắn**

# Kết quả

- Kết quả **PASS/FAIL** sẽ được báo **ngay sau khi hoàn thành bài thi và survey**, điểm số cụ thể sẽ được gửi sau tối đa 5 ngày làm việc.
- **Nếu có thể hãy share kết quả và quá trình chuẩn bị của bản thân, nó có thể giúp ích cho những người cũng có ý định đăng ký kỳ thi này**
- Điểm của mình **852/1000**, may là không module nào bị kém quá =)

![result](https://i.imgur.com/Z3TLP9M.png)

# Ref
- https://notcuder.com/toi-da-lay-chung-chi-aws-solutions-architect-associate-nhu-the-nao/
- http://mistwire.com/2016/05/aws-certified-solutions-architect-associate-study-notes/
- https://www.awslagi.com/
- https://quizlet.com/194513754/aws-certified-solutions-architect-associate-practice-questions-flash-cards/
- https://medium.com/@franktran/how-to-succeed-in-aws-certified-solutions-architect-associate-exam-8a30344347f

# Bài viết gốc trên VNTechies Dev Blog
https://dev.vntechies.com/blog/aws-certs/kinh-nghiem-thi-chung-chi-aws-certified-solutions-architect-associate