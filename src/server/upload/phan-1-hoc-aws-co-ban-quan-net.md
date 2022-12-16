Chắc chắn trong đời của các bạn thì đã một lần trốn học đi chơi Net. Và mình cũng thế, mình cũng có một tuổi thơ ăn dầm nằm dề ở quán các quán net cỏ ngày xưa. ...
Chính vì thế, mình sẽ mượn hình ảnh của quán Net để nói một cách tổng quát các khái niệm của Amazon Web Services (AWS), giúp các bạn có một cái nhìn tổng quát hơn về AWS.

![2game-quan-net-co-thanh-ly-1-](https://htknguyen.com/content/images/2020/01/2game-quan-net-co-thanh-ly-1-.jpg)

# Quán Net Amazon

Tưởng tượng rằng **công ty A** muốn mở một chuỗi các cửa hàng kinh doanh **quán Net** với cấu hình khủng. Vì công ty A giàu vcl nên công ty A muốn mở chuỗi cửa hàng Net trên toàn bộ thế giới. Cứ một **quốc gia** sẽ có một quán Net ở mỗi **thành phố** lớn ở quốc gia đó. 
Quán Net của ông ty A thì to vcl, mỗi quán lại có vài nghìn **máy cấu hình khủng**, đủ cho các Skys cày view cho sếp hay là đua rank LOL. 
Cũng như bao quán Net khác, quán Net của công ty A cũng **đánh số** lên mỗi máy: Máy 1, Máy 2, Máy 3, để nhân viên dễ dàng quản lý và khách hàng cũng dễ dàng tìm được máy mà mình thích hơn.
Tuy nhiên, quán Net này lại không có nhân viên kỹ thuật, chính vì thế, khách hàng tới chơi Net phải tự chuẩn bị sẵn **bộ cài** Window (hoặc bất cứ hệ điều hành nào) để cài lên máy, sau đó thì mới làm gì thì làm. 
Trước khi đi vào quán Net thì khách hàng phải đi qua **bộ phận bảo vệ** của quán, để dảm bảo là các bạn không mang hung khí vào quán hay giúp các bạn trẻ né những pha gank thần thánh đến từ phụ huynh. 

# Vậy thì nó liên quan gì đến AWS?

Thật ra thì nó có liên quan cả đấy. Nếu như các bạn thay:

* Công ty A = Amazon
* Quán Net = Amazon Web Services
* Mỗi quốc gia = Region
* Mỗi thành phố = Availability Zones
* Máy tính = EC2
* USB chứa hệ điều hành = AMI
* Máy số 1 = Elasctic IP
* Bảo vệ = ASG

Thì các bạn đã nắm được sơ sơ cách hoạt động và các khái niệm cơ bản của AWS rồi đấy

# Quay lại với AWS
Thông qua ví dụ ở trên thì mình sẽ nói rõ hơn về các khái niệm cơ bản nhất của AWS nhé. 

## Region
Region của AWS ở đây thì nó giống hệt như các quốc gia ở ví dụ về quán Net của mình ở trên. Amazon sẽ đặt máy chủ của họ ở rất nhiều quốc gia và khu vưc khác nhau trên toàn thế giới. Ở thời điểm hiện tại thì sẽ có tổng cộng là 22 quốc gia mà Amazon chọn mặt gửi vàng để đặt máy chủ. 
Điều này có nghĩa là khi mua dịch vụ của AWS thì nên chọn khu vực nào đó phù hợp với nhu cầu của mình. Ví dụ ở Việt Nam thì nên chọn khu vực là Singapore vì máy chủ ở đây gần với Đông Lào nhất, nên tốc độ sẽ nhanh hơn nhiều.

![Global-Infrastructure](https://htknguyen.com/content/images/2020/01/Global-Infrastructure.png)

## Availability Zones (AZ)
Cũng như ở trên, cứ một một quốc gia thì Amazon sẽ tiếp tục đặt máy chủ của mình ở mỗi khu vực khác nhau. Ví dụ như ở Amazon chọn Singapore làm chỗ đặt máy chủ thì Amazon sẽ đặt vài cái server khác nhau ở mỗi một chỗ khác nhau để đảm bảo an toàn. Lỡ khủng bố nó bắn bể server ở một chỗ thì còn vài chỗ khác backup. Mỗi một cái máy chủ sẽ gọi là một Availability Zones (AZ).

![Screen-Shot-2019-04-26-at-3.44.52-PM](https://htknguyen.com/content/images/2020/01/Screen-Shot-2019-04-26-at-3.44.52-PM.png)

## EC2
Ở một một cái máy chủ, thì Amazon cho phép mình thuê các Instance trên các máy chủ đó. Nó giống hệt như mình thuê một cái máy tính như ví dụ ở trên của mình. Không khác gì cả. Cái máy tính mình thuê này có tên là EC2, là một máy tính ảo mà Amazon cho mình.
Vì là máy tính nên mỗi cái máy tính sẽ có cấu hình khác nhau, tùy vào nhu cầu lựa chọn của mình. Các bạn cứ lên thẳng [trang chủ của AWS](https://aws.amazon.com/ec2/instance-types/) mà xem cấu hình của từng con rồi chọn con nào phù hợp với nhu cầu của mình.
Thường thì nếu là nhu cầu học hành thì dùng con t2.micro là ok rồi. Con này nó cho xài free luôn. 

![Amazon-EC2-T2-Instances---Amazon-Web-Services--AWS-](https://htknguyen.com/content/images/2020/01/Amazon-EC2-T2-Instances---Amazon-Web-Services--AWS-.png)

## Amazon Machine Image (AMI)
Sau khi có máy tính rồi, thì việc tiếp theo là phải cài đặt hệ điều hành cho nó. Cái này thì anh em cài Win dạo chắc biết hết. Kiểu gì cũng phải tải bộ cài về rồi dùng USB tạo boot rồi đem đi cài Win dạo được chứ. 
Giống y vậy, thì bộ cài ở đây gọi là AMI. Amazon cho mình chọn là mình muốn cài cái gì luôn, tùy vào nhu cầu thì chọn cái để cài thôi. Ví dụ như mình có thể cài Windows, Ubuntu, Redhat, hay Fedora. Cái gì cũng được. Lúc mình thuê EC2 là nó cho mình chọn cả. Mình cũng có thể build riêng hệ điều hành của mình rồi cài lên cũng được nốt. 
Amazon có cung cấp một AMI mà mình nghĩ là hay xài nhất là Amazon Linux. Đó về cơ bản là một hệ điều hành Linux với một số tool được Amazon cài sẵng. Mình dùng thằng này để học. Mấy thằng khác thì mình không có nhiều kinh nghiệp lắm.

## Elasctic IP
Khi vào một quán Net thì mỗi một máy có một địa chỉ nhất định. Ví dụ như máy 1, máy 2, máy 2. Thì tương tự, khi bạn thuê một cái EC2 thì Amazon sẽ cung cấp cho bạn một cái địa chỉ, gọi là IPv4. 
Tuy nhiên, cái địa chỉ này nó sẽ thay đổi mỗi lần bạn tắt EC2 hay khởi động lại EC2. Chính vì thế, Amazon cung cấp cho bạn một cái địa chỉ cố định và không bao giờ thay đổi, gọi là Elasctic IP. Cơ mà cái này phải tốn tiền để có được, nên thường thì các trang Web vừa và nhỏ không cần dùng thằng này làm gì cả. Thường thì người ta sẽ dùng DNS để trỏ qua IPv4 một cách tự động mà không cần dùng đến Elasctic IP.

## Amazon Security Group (ASG)

Amazon Security Group giống hệt như bảo vệ của quán Net vậy. Bảo vệ sẽ kiểm soát toàn bộ các khách hàng đi ra đi vào quán Net. Cũng như Amazon Security Group sẽ kiểm soát toàn bộ các kết nối đi vào và đi ra instance. Mặc định, khi các bạn tạo một instance thì một ASG được tạo và block tất cả các kết nối ngoài vào và chấp nhận các kết nối từ trong đi ra. 
Ví dụ như khi mình tạo một Instance và trong SG mình cấu hình chỉ cho port 22 (SSH) đi từ ngoài vào, thì chỉ có các kết nối bằng port 22 mới có thể đi vào EC2, còn lại sẽ bị block sạch.

![security-group-config.17423baeced21997af7a131760196cfed6f39bb9](https://htknguyen.com/content/images/2020/01/security-group-config.17423baeced21997af7a131760196cfed6f39bb9.png)

# Kết luận

Trên đây là các khái niệm cực kỳ cơ bản và đơn giản AWS. Mình không đi sâu vào tính năng của mỗi phần (Mình chưa học kỹ) nhưng cũng đủ để cho các bạn hình dung sơ sơ được AWS nó tròn méo ra sao. Phần sau mình sẽ nói tiếp đến các khái niệm khác như Load Balancer hay Auto Scaling Group nhé. 

Hiện tại mình đang tập tọe viết Blog ở địa chỉ https://htknguyen.com/. Nếu bạn nào có hứng thú thì ghé vào blog của mình nghe mình chém gió nhé. Mình chỉ viết các bài viết đơn giản, mấy cái hay ho giành cho các bạn sinh viên thôi à. *Bắn Tim*