# Lời nói đầu
Ở đâu đó có thể các bạn đã nghe thấy khái niệm **serverless** hay chạy ứng dụng không mà không cần sử dụng một server nào. Hiện nay với sự phát triển mạnh mẽ của các nền tảng public cloud như AWS, Azure, Alibaba.., khái niệm serverless đang dần trở nên thân thuộc hơn với những lập trình viên. Tuy nhiên bạn đã bao giờ tự tay xây dựng một hệ thống API mà không phải sử dụng server bao giờ chưa? Theo mình thấy thì hiện tại sự trải nghiệm của các dev với serverless  thực sự chưa nhiều, một phần có lẽ do người ta vẫn tin tưởng ở server truyền thống hơn(Cái gì sờ thấy được cũng chắc chắn hơn). Ở loạt bài này, mình sẽ trình bày về một dự án team mình xây dựng  99% sử dụng serverless (Tại sao lại chỉ có 99% thì lát mình sẽ nói sau nhé).
Trong phần 1, mình sẽ tập trung vào kiến trúc hệ thống, giải thích các thành phần và tác dụng của nó!
# Nội dung
## Bối cảnh
Khách hàng của mình đã xây dựng hệ thống trên môi trường  AWS, sử dụng EC2 làm server, ngôn ngữ là Java và sử dụng framework cổ lỗ sĩ là Struts . Hệ thống hiện tại chi phí đang quá lớn (Bao gồm cả chi phí AWS cũng như các chi phí liên quan khác), thời gian sử dụng và chạy job trong ngày là không cố định(do nghiệp vụ), nhiều khi không có người sử dụng cũng như không có job nào chạy nhưng cũng phải trả tiền cho 1 server API và 1 server Job. Khách hàng đã yêu cầu chuyển hệ thống cũ sang serverless và phát triển thêm tính năng  dựa trên kiến trúc mới này. 
Hệ thống này mình xây dựng hoàn toàn trên Amazon Web Service, nên các dịch vụ cứ mặc định là của AWS nhé!
##  Mô hình hệ thống Serverless
Có lẽ nhiều người cũng đã nhìn qua kiến trúc serverless như thế này: 
![](https://images.viblo.asia/cdedd97e-2678-430b-addd-94a5cd2dcabb.png)


Đúng, nó là 1 kiến trúc thường thấy của 1 serverless system triển khai trên AWS. Flow sẽ là:
* App call API qua API Gateway
* API Gateway trigger lambda
* Lambda query data từ DB, trả về kết quả
* API Gateway response data cho client

Bla...Bla..

Chung chung quá =)) EZ thế này làm phát là xong :stuck_out_tongue_winking_eye:

##  Hệ thống Serverless trong thực tế
Tất nhiên rồi, mỗi hệ thống sẽ có những điểm giống và khác nhau tuỳ thuộc vào bài toán cần giải quyết. Không loằng ngoằng mình sẽ đưa ra kiến trúc mình đã xây dựng luôn (Đã lược bỏ một số chi tiết không liên quan đến serverless)
![](https://images.viblo.asia/2205dc21-ab6a-4ae9-9209-f3976d88a612.png)

**Overview hệ thống này nhé:**
* Phần màu đỏ là hosting cho Frontend(được viết bằng Angular xxx). Phần FrontEnd sẽ bao gồm một S3 Bucket được setting làm static web, 1 Cloudfront Distribution để cache lại các resource tĩnh GLOBAL.
* Phần màu xanh là hệ thống API serverless. Chúng ta sẽ quan tâm đến phần này nhiều hơn vì nó là trọng tâm của bài viết này. Nó bao gồm những dịch vụ gì, đi lần lượt nhé:
    * **WAF: Web Application Firewall** - Đây được coi là bức tường lửa đầu tiên để bảo vệ web. Nhiêm vụ của nó là bảo vệ app qua rule do người dùng thiết lập, ví dụ Whitelist IP, Blacklist IP... Quan trọng hơn là nó có thể phát hiện và chặn những request có dấu hiệu tấn công như XSS, SQL Injection....
    * **API Gateway**: Điểm nhận tất cả các request từ phía client. AWS cho phép route từng path của request đến những handler tương ứng.
    * **Cognito**: Dịch vụ này cung cấp phương thức xác thực, phân quyền và quản lý người dùng.
    * **Lambda (Authenticate)**: Vì app của mình có tính năng authen hơi đặc biệt, do vậy mình phải dùng lambda function này để add thêm 1 số feature mà Cognito không đáp ứng đủ. Lambda function này sẽ được đính trực tiếp vào API Gateway, đóng vai trò tương tự như 1 middleware, cũng đặt trong private subnet nhé, nhưng vẽ như thế để tránh rối
    * **VPC, Public subnet và private subnet**: Cái này nếu ai đã làm qua với AWS và network của nó thì có thể nắm được rồi. Public subnet thì có thể internet facing, private subet là nơi đặt các server EC2, RDS, Lambda là private. Không thể truy cập trực tiếp từ internet vào các dịch vụ được đặt trong private subnet. 
    * **InternetGateway** cho phép VPC có thể truy cập Internet, **VPC Endpoint** cho phép kết nối đến các dịch vụ khác của AWS mà ko qua đường truyền internet.
    * **Squid Proxy Server**: Đóng vai trò là proxy cho phép các resource từ private subet kết nối ra ngoài Internet(Nhiều người sẽ dùng NAT Gateway hoặc NAT Instance).
    * **Bastion host**: Là 1 EC2 có quyền remote vào các instance bên trong private subnet. Người dùng muốn remote vào các instance trong private subnet thì phải đi qua con bastion host này. Ơ khoan đã, mình dùng Lambda có dùng EC2 đâu mà lại có bastion host nhỉ. Đây chính là vấn đề ở trên(99% serverless), API của mình thì  hoàn toàn là serverless, tuy nhiên hệ thống cũ bao gồm 1 EC2 cố định sử dụng Deeplearning để xử lý ảnh,  yêu cầu GPU do vậy EC2 này ko thể thay thế bằng lambda được(không support mấy cái task hardcore này được). Những phần liên quan đến thằng này mình đã lược bỏ bớt đi rồi nhé.
    * **Lambda (Đặt trong private subnet)**: Đây chính là linh hồn của Serverless, đóng vai trò tương tự 1 server. Mỗi path của API Gateway sẽ được xử lý bởi 1 lambda function. Lambda sẽ nhận request từ API Gateway, xử lý, trả response về API Gateway -> Response về Client.
    * **S3**: Ồ, nếu ko có server thì file được lưu trữ ở đâu nhỉ, up/down thế nào? Thông thường nếu hệ thống sử dụng autoscale thì cũng  cần 1 nơi lưu trữ file chung (EFS hoặc S3 ....). Với Lambda cũng vậy, mình chọn S3 để lưu trữ file. Nhưng làm thế nào để upload và download file qua lambda nhỉ. Câu trả lời là sẽ không up/download file qua lambda, lambda chỉ là trung gian, generate Pre-signed URL để client thực hiện upload và download trực tiếp với S3.
    * **DynamoDB**: Đây là 1 database dạng NoSQL do AWS phát triển. Lưu data dạng Key-Value.
    * **CloudWatch**: Phần này có 1 số dịch vụ nhỏ hơn. Tuy nhiên có 2 service chính là Logs và Rules. Logs là nơi xem, truy vấn log mà Lambda function đã ghi ra trong quá trình chạy, Rules được sử dụng để lập lịch cho 1 số job chạy cố định hàng ngày, khi đến thời gian nó sẽ gọi lambda function tương ứng.
    * **SQS**: Queue được dùng cho sử dụng cho những job muốn chạy ngay lập tức. SQS trigger đến Lambda function(Job) mỗi khi có message mới được đẩy vào queue.
    * **X-Ray**: Service này khá hay, nó giúp monitor ứng dụng một cách chi tiết hơn, visualize nó lên trên dashboard AWS, giúp gỡ lỗi ứng dụng, phán đoán lỗi cũng như cải tiến ứng dụng tốt hơn. Ví dụ: Thời gian query data từ DynamoDb, thời gian upload file S3.......
    * **SNS**: Gửi notification.

# Lời kết
Túm lại, để nói về 1 serverless system thì 1 bài viết là không đủ. Ở phần này mình chỉ overview hệ thống, các dịch vụ và vai trò của nó. Ở phần tiếp theo mình sẽ trình bày chi tiết về quá trình sử dụng Framework, deploy nhiều môi trường cũng như những lưu ý quan trọng để API không ngã ngửa ra nhé . Mong rằng qua bài viết này các bạn có thể nắm được cơ bản về kiến trúc 1 hệ thống không sử dụng server truyền thống nó như thế nào. Lần đầu viết bài Mong nhận được phản hồi và góp ý của các bạn. Nếu quan tâm thì hãy chờ part 2 nhé, nhiều thứ hay ho hơn nữa.