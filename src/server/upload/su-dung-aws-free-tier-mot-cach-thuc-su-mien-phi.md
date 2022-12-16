# Hướng dẫn sử dụng AWS Free Tier một cách free!
## Free Tier là gì
**Người ta nói con gái phức tạp, tôi nói họ chưa biết đến cách tính bill của AWS FreeTier!**

Không có gì khuyến học tốt hơn việc được miễn học phí. AWS hiểu rõ mong ước đó của anh em lập trình viên hơn ai hết, nên cho phép mọi tài khoản AWS được miễn phí sử dụng AWS 12 tháng đầu tiên trong **phạm vi cho phép**. Vì không nắm rõ thuật ngữ “trong phạm vi cho phép” này mà tiền của nhiều anh em đã ra đi, mà đi là dứt khoát là không trở lại nữa. Để ngăn tình trạng thất thoát học phí tiếp diễn. Tôi sẽ hướng dẫn anh em cách sử dụng FT một cách miễn phí thực sự.

## Một Alarm được set đúng lúc sẽ cứu rỗi tài khoản của bạn
Việc đầu tiên các bạn cần làm sau khi tạo xong tài khoản AWS dứt khoát không phải là chạy đi tạo ngay instance EC2 mới hay đi mua sách về AWS cho người mới bắt đầu, mà là set ngay một Billing Alarm cho tài khoản của bạn. Phòng bệnh luôn tốt hơn chữa bệnh, và set một Billing Alarm thì đỡ mất thời gian hơn nhiều là đi khóc lóc với đội support của AWS để đòi lại tiền. Tôi là một đứa đãng trí và Billing Alarm đã cứu tôi không ít lần thoát khỏi cảnh túng bấn do lơ đãng quên tắt tài nguyên AWS.

## Những dịch vụ nằm trong Free Tier
Ở đây mình chỉ nhắc đến các dịch vụ chính mà các bạn mới đăng ký hay dùng để tránh sai sót thôi.
### EC2
* Điều thứ nhất cần ghi nhớ là AWS cho bạn 750 giờ - tương ứng với 1 tháng chạy liên tục 1 instance **t2.micro** (lưu ý là chỉ size t2.micro, nếu các bạn dùng bất cứ size hay family nào khác, AWS sẽ thò tay vào credit card của bạn).
![](https://images.viblo.asia/c138a37e-0e98-4a69-8609-3406a79121ec.png)

* EC2 tính thời gian chạy instace EC2 của bạn theo đơn vị 1 giờ. Bạn chạy 15 phút hay 60 phút thì đều được tính giá như nhau. nên nhiều khi cách tiết kiệm tốt nhất là cứ để instance chạy suốt thay vì bạn cứ thủ công stop/start instance liên tùng tục.

* Điều thứ 2 là AWS EC2 không chỉ tính phí chạy instance mà còn tính phí cả những phần mềm cài sẵn trên đó theo dạng trả theo giờ. Vì vậy trước khi chọn AMI cho instance của bạn hãy để ý xem có chữ “**Free tier eligible**” nằm đâu đó xung quanh không. Đặc biệt là với các instance chạy Windows Server.
![](https://images.viblo.asia/508275f2-96f3-4941-a268-87d506333175.png)

* AWS cho bạn 30GB để làm bộ nhớ cho các instance EC2 của bạn. Và bạn sẽ bị giới hạn ở 2 loại bộ nhớ đó là General Purpose và Magetic. Lưu ý 30GB nói trên sẽ được tính tổng trên tất cả các ổ đĩa của toàn bộ các volume EBS của bạn. 

Ví dụ:
Bạn có 5 Instance EC2 trong đó chỉ có 1 instance đang chạy, mỗi instance gắn với 1 volume 10GB Ebs vị chi là 50GB cho cả 5 instance. 

Nếu để như vậy đến cuối tháng thì bạn sẽ không bị tính tiền EC2, nhưng bạn sẽ bị tính tiền cho phần lưu lượng 20GB vượt quá của ebs. Vì thế nên kinh nghiệm của mình cho thấy là nếu không chạy instance nữa thì tốt nhất là nên terminate nó luôn, nếu bạn chỉ stop thôi thì volume của instance vẫn còn đó và có thể bạn sẽ vẫn bị mất tiền do không để ý.

**Nên**
![](https://images.viblo.asia/9524d446-d6d4-4b30-bd8c-2f6c83ce9512.png)
**Không nên**
![](https://images.viblo.asia/1a6e6651-b70e-4868-8633-676376718714.png)

* Elastic IP (EIP)
Elastic IP có một đặc điểm khá bựa đó là nếu bạn dùng thì bạn sẽ KHÔNG phải trả tiền cho nó, và ngược lại.  
Ví dụ đơn giản: 
Khi cấp phát  (allocate) và associate một EIP với 1 instance EC2 hoặc với một NAT gateway nào đó, bạn sẽ được free phí sử dụng, còn nếu cấp phát (allocate) một địa chỉ EIP mà không sử dụng nó thì amazon sẽ tính tiền cho sự lãng phí này của bạn. Vì thế nên bạn nếu thấy bị tính tiền mặc dù đã tắt tết EC2 instance thì tốt nhất là nên kiểm tra ở mục EIP xem có cái nào đang bòn rút tài khoản của bạn hay không nhé.
![](https://images.viblo.asia/6cc6ceb3-cff8-49e6-b141-4411580e9105.png)

### S3
Free tier cho phép bạn dùng đến 5GB S3 storage và 2000 put request và 20000 get request, kèm với đó là dung lượng transfer không quá 15GB mỗi tháng. Put request bao gồm các request update và tạo mới các object, get sẽ là request để download object.  Một điều nữa bạn nên lưu tâm là nếu bạn bật tính năng cross region trên S3 lên thì bạn sẽ bị tính gấp đôi dung lượng của bucket. Đơn giản chỉ vậy thôi, S3 không có quá nhiều điểm lắt léo như EC2 để mà chúng ta phải quá lo lắng.

### RDS
RDS khá tương tự với EC2 khi free tier sẽ giới hạn bạn về performance của instance và hệ cơ sở dữ liệu nằm trên đó. Với free tier chúng ta có những thứ sau
* 750h chạy **t2.micro**  instance 
* Các hệ cơ sở dữ liệu: MySQL, PostgreSQL, MariaDB Community Edition và một số phiên bản của Oracle và SQL Server. Nhớ để ý chữ “Free Tier Eligible” là bạn sẽ ổn thôi.
* 2 loại bộ nhớ lưu trữ là General SSD và Magnetic
![](https://images.viblo.asia/2f97c0eb-6fab-4547-89fc-0ef3b2427f62.png)

## Chúc các bạn may mắn.
Chúc các bạn học tập tốt và tiết kiệm với AWS.