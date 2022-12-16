Hello mọi người! Long time no see Quang Nguyễn Blog - Chia sẻ kinh nghiệm thi chứng chỉ AWS Solutions Architect Associate(SAA-03 update mới nhất 2022) Quang Nguyễn Blog - Chia sẻ kinh nghiệm thi chứng chỉ AWS Solutions Architect Associate(SAA-03 update mới nhất 2022)
Sau một thời gian vắng bóng do tập trung tham gia vào các dự án blockchain của công ty nay mình đã quay trở lại tiếp tục chia sẻ về những kinh nghiệm do mình đã đúc kết được trong quá trình học tập và làm việc.

Và hôm nay sau khi đã đạt được chứng chỉ AWS Solutions Architect Associate phiển bản update mới nhất năm 2022 có mã là SAA-03 thì mình sẽ chia sẻ lại quá trình mình thực hành trên aws sau đó là ôn luyện và thi.

Về lí do mình chọn thi chứng chỉ này thì thật ra mình đã định thi từ cách đây khoảng 1 năm khi đã tiếp xúc với AWS được khoảng gần 1 năm trước đó(có nghĩa mình đã có kinh nghiệm làm việc với AWS khoảng 2 năm tới điểm hiện tại) và SAA cũng vẫn đang là chứng chỉ hot ở ngành hiện tại do thị phần cloud của AWS vẫn đang là rất lớn và do ở Việt Nam AWS có thể xuất hóa đơn đỏ cho doanh nghiệp Việt Nam nên đây cũng là hạ tầng cloud được sử dụng nhiều ở Việt Nam. Ngoài ra công ty mình cũng có chính sách hỗ trợ với mỗi chứng chỉ nằm trong danh sách sẽ có thêm khoảng 2-3tr/1 tháng với một người nghèo cả tiền bạc và tình cảm như mình thì đây là con số khá lớn 😎 và trong tương lai với nền tảng là chứng chỉ này mình có thể nâng cao hoặc mở rộng ra các chứng chỉ khác theo AWS career hehe.

![](https://images.viblo.asia/858a664b-6682-443c-9b9d-42340c995df4.png)

Thôi lâu chưa viết gì nên hơi lan man hehe 🙂 tập trung vào việc chính nào.

Đầu tiên mình sẽ chia sẻ về trước khi mình có ý định thi chứng chỉ này thì bối cảnh lúc đó là đầu năm 2021 thì mình cùng team đã hoàn thành giai đoạn đầu của một em GameFi. Nói về em GameFi này thì được triển khai 100% trên hạ tầng cloud của AWS. Với cả frontend và backend được triển khai ở dạng container sử dụng gitlab CI, AWS CLI, EKS và ECR. Rồi sau đó thì mình nhận thêm 1 task triển khai landing page của dự án trên một service aws đảm bảo được cả perfomance, cost saving(đúng kiểu tiền ít đòi hít abc xyz) thì lúc đó mình cũng đã được tiếp cận CloudFront, S3, Egde location, Caching,…. Do là người được sếp cử ra nghiên cứu để tối ưu khi sử dụng AWS Service nên tiếp theo đó sau khi ứng dụng đã gọi là golive thì mình tiếp tục nghiên cứu về EC2, VPC đây là 2 dịch vụ mà theo mình đánh giá là nên học đầu tiên khi nghiên cứu AWS(vì có thể nói 2 service này backbone khủng làm nên tên tuổi của AWS Cloud) nhưng mình lại phải học sau khi đã sử dụng các dịch vụ khác. May là vẫn nằm trong tầm có thể nghiên cứu hehe 😆

Sau dự án GameFi đó thì mình lại tiếp tục được tham gia 1 dự án GameFi tiếp theo của công ty hợp tác với đối tác. Dự án này do đã có kinh nghiệm triển khai trên hạ tầng AWS nên hướng đi cũng khá nhanh và mượtttttt 😯 . Tuy nhiên với tính cách của mình thì thời điểm đó mình đã quyết định là deep dive vào AWS Cloud một cách nghiêm túc và muốn verify lại những gì đã học được qua một kỳ thi và mình đã chọn AWS Solutions Architect Associate làm chứng chỉ đầu tiên để tiếp cận. Và vừa nghiên cứu vừa triển khai thì trong dự án GameFi mới mình đã sử dụng các service serverless của AWS vào hệ thống như Lambda, Aurora, SQS, SNS, Kinesis,… nên thời gian đầu cũng hơi ngợp thậm chí là phải OT để tìm ra bug trên infra. Tất nhiên hơi mất thời gian và công sức một chút nhưng mình đã nắm được khá nhiều service quan trọng của AWS(cái này có thể gọi là khổ nhục kế Quang Nguyễn Blog - Chia sẻ kinh nghiệm thi chứng chỉ AWS Solutions Architect Associate(SAA-03 update mới nhất 2022) ). Tuy nhiên sau đó thì mình lại chưa sắp xếp để ôn luyện đề thi nên mãi tới năm 2022 mình mới đăng ký để thi.

Như vậy các bạn có thể thấy rằng mình đã có kinh nghiệm thực chiến với AWS trong thời gian khoảng 1-2 năm trước khi tham gia kỳ thi(cái này khá giống với recommend của AWS trước khi join exam). Vậy nên nếu bạn mới sử dụng AWS hoặc mới sử dụng cloud thì mình nghĩ nên chọn chứng chỉ AWS Cloud Practitioner và hands on các dịch vụ cơ bản trước.

Các dịch vụ mà mình thấy xuất hiện nhiều trong kỳ thi SAA-03:

* VPC cái này xuất hiện khá nhiều trong các câu hỏi liên quan Security(Subnet, private ip, public ip, security group, NACL, Nat gateway, Internet gateway, VPC endpoint,…).
* EC2 cũng có tần suất khá lớn hình như mình có khoảng 15 câu gì đó(Instance types, cost saving, auto scaling group, elastic load balancer, sticky session,…).
* IAM là dịch vụ core cũng được lên sóng trong đề thi khoang 10 câu.
* S3 gần như nửa câu hỏi có liên quan tới dịch vụ lưu trữ này và cá nhân mình thì thấy nó thực sự quan trọng nếu muốn tối ưu chi phí và có perfomance tốt(S3 storage class, S3 policy, S3 lifecycle, S3 version, S3 Transfer acclerator,…) và thi thoảng có vài câu liên quan với bigdata, athena, intergration from on-premises store.
* Các dịch vụ database cơ bản như RDS, Aurora, DynamoDB.
* Các services serverless như Lambda, DynamoDB,….
* Một vài dịch vụ liên quan BigData hay xuất hiện là RedShift, Athena, Glue.
* Vì AWS khuyến khích sử dụng 100% on cloud nên họ cung cấp khá nhiều dịch vụ liên quan tới việc chuyển data from on-premises lên cloud như Direct Connect, Snow Family, VPN, Transit gateway, Store gateway,… những em service này thì các bạn nên nắm bắt được tính năng cơ bản là đủ để vượt qua kỳ thi còn sau này nếu cần sử dụng tới thì hoàn toàn có thể deep dive sau.
* Liên quan tới monitor hệ thống thì CloudWatch, CloudTrail, AWS Config,….
* Ngoài ra các câu liên quan tới decouple service sử dụng SQS, SNS, Lambda, Kinesis cũng có khoảng 5 câu.
* Có một số câu hỏi bảo mật liên quan việc tăng security cho hệ thống như WAF, Shield, Inspector,… đâu đó 5 câu.
* Nhóm các dịch vụ dễ ăn điểm nhưng chỉ có 2-3 câu là nhóm AI/Machine learning là Polly, Transcribe, Texact, Translate, Rekognite,…. chỉ cần biết qua là được.
* Ngoài ra còn có các dịch vụ hỗ trợ triển khai hệ thống như Beantalk, Formation, CodeDeploy,… mà các bạn cần nắm được cơ bản để khi cần có thể đọc sâu về tài liệu chi tiết.

![](https://images.viblo.asia/5e499ed8-94a0-4af6-9a6e-659d7c132c94.png)

Tới đây thì mọi người chắc ngộp với đống trên rồi nhở 😀 . Thực ra câu chuyện còn nhiều hơn thế do trong bài viết mình muốn giúp các bạn tập trung vào các phần core service và xuất hiện nhiều nhất trong bài thi nên chỉ vậy thôi. Đương nhiên khi nghiên cứu thực tế sẽ còn nhiều service chưa nằm trong danh sách kể trên thì các bạn vẫn cần phải ít nhất biết cơ bản về nó. Và sau này nên chọn 1 trong các nhóm dịch vụ để đi sâu vào nghiên cứu nó ví dụ các bạn thích BigData thì theo nhóm các dịch vụ hỗ trợ BigData.

Về phần ôn thi thì như thế nào thì quá trình mình nghiên cứu thì có đọc docs trên AWS kết hợp stackoverflow. Sau khi có basic thì mình có tham gia khóa học của Stephane Mareek trên Udemy vì anh này có cả bộ đề thi thử để làm quen luôn và đơn giản nhất vì được rate cao nhất trên Udemy 😆 .

Docs AWS: https://docs.aws.amazon.com/

Link khóa học: https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/

Sau khi đọc docs cơ bản và hoàn thành khóa học thì có một bộ well architecture của AWS share rất hay và có tỷ lệ xuất hiện trong kỳ thi khá cao link: https://aws.amazon.com/vi/architecture/well-architected/

Link đề thi thử: https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate/

Sau khi đã tiếp thu lượng kiến thức khổng lồ trên thì các bạn nên vẽ ra mindmap trên giấy hoặc pc để sắp xếp lại kiến thức.

À quên đề thi thử ở trên thực tế là khó hơn và nhiều câu nằm trong mức độ professional nên các bạn thuờng là làm được khoảng 50% trong lần đầu và lần 2 được 80% là tự tin vác cặp đi thi được rồi 😉 . Lưu ý mỗi câu sau sẽ có giải thích rất chi tiết tại sao đúng tại sao sai nên đọc từng câu kể cả câu đã trả lời đúng để hiểu bản chất hơn nếu mình có lỡ quên đấy.

Và tada mọi thứ đã có vẻ ok giờ đăng ký thi thôi. Theo mình tốt nhất là các bạn đăng ký thi tại trung tâm PSI hoặc Person Vue chứ thi online khả năng toang hơi cao(các bô lão chia sẻ lại như vậy) và mình thấy ra trung tâm tự tin hơn tránh trường hợp máy móc hỏng hay vấn đề ngoài ý muốn làm mình bị loại.

Vào link: https://www.aws.training/ => sang tab Certification => chọn login to account => chọn aws xong đăng ký tài khoản AWS(ko phải tài khoản AWS cloud nhé). Nhớ phần name phải điền thật chuẩn trên căn cước công dân tránh tới thi sai sót ko được vào thi ok.

Tiếp theo thì trang đăng ký thi hiện ra vào các bạn chọn PSI hoặc Person Vue tùy thôi, cái này không quan trọng. Tiếp theo sẽ có màn hình bản đồ để chọn trung tâm thi thì chọn cái nào gần thi cho nhanh hehe.

Tới thi thì mọi người lưu ý;

* Được phép ra ngoài 2 lần hay sao ý để đi vệ sinh khi đi vệ sinh hoặc ra ngoài có lí do thì thời gian vẫn trừ.
* Nên ăn vừa phải trước khi thi tránh no quá mất tập trung
* Nếu các bạn thi lâu hơn 90p thì nên xin ra ngoài để hít thở rồi quay lại thi tiếp tránh để bản thân vào trạng thái quá mệt mỏi.
* Có thể đăng ký bổ sung 30p nếu thích mà mình thấy là không cần thiết lắm cho kỳ thi này.
* Gặp câu khó thì đánh cờ rồi bỏ qua câu tiếp theo luôn.
* Đề thi có khoảng 10 câu multi choice cần để ý tránh hiểu nhầm và chọn 1 đáp án duy nhất như những câu khác.
* Làm xong hết 1 lượt thì đi ra ngoài 2-3p rồi vào thi tiếp(xem lại những câu đánh cờ và những câu nghi vấn) ngồi lâu quá sẽ bị run tay, run chân, mắt nháy do tập trung màn hình quá lâu.
* Thi xong trước giờ là có thể endtest và lượn thôi Quang Nguyễn Blog - Chia sẻ kinh nghiệm thi chứng chỉ AWS Solutions Architect Associate(SAA-03 update mới nhất 2022)
* Và đây là kết quả thi của mình: AWS Certified Solutions Architect – Associate (832/1000) cũng khá ổn 😀 tại vì nghe nhiều người bảo rằng AWS không bao giờ cho bạn điểm 9 hehee.

Sau thi thì kết quả gửi sau khoảng 1 ngày tùy chênh lệch múi giờ và quá trình thẩm định thi(xem lại video quá trình thi của bạn thôi chứ điểm thì máy chấm xong ngay rồi nhưng kết quả sẽ không hiển thị ngay như ngày xưa các bô lão thi nữa) khá căng thẳng. Mình được Credly gửi badge trước khi AWS gửi kết quả cái này thì cũng không rõ vì sao.

https://www.credly.com/users/quangnv1311

Kết lại thì các bạn hãy nghiên cứu từ từ mỗi ngày chỉ nên bỏ ra khoảng 30-60p vì nếu quá số này thì mình học sẽ không còn hiệu quả và học trước quên sau. Vì lượng kiến thức cover rất rộng lên nếu học dồn thì kết quả sẽ không được tốt chưa kể các câu multichoice. Chúc mọi người sớm thi được chứng chỉ này 😀 và share lại cho mình biết nếu mình giúp được gì tại bài viết này. Trong thời gian tới mình sẽ thi chứng chỉ Devops của AWS và nâng lên professional và tất nhiên sẽ lại có bài chia sẻ kinh nghiệm giúp mọi người hình dung và tự thiết kế quá trình tối ưu nhất cho riêng bản thân trong quá trình nghiên cứu để thi các chứng chỉ của AWS. Mãi chất’s 🙄 😎 😎