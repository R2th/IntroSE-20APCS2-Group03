# Giới thiệu
Nếu bạn là 1 developer, đúng rồi đó, người mà luôn được mọi người nhờ sửa tủ lạnh, ti vi, quạt máy, ống nước, đủ thứ loại trên đời, khi bạn xây dựng một ứng dụng, bạn sẽ muốn được nhiều người sử dụng, trải nghiệm và đánh giá tốt. Để có thể hoạt động, ứng dụng của bạn cần một hệ thống backend hoạt động đằng sau và xử lý sự kiện, dữ liệu từ phía Client. 

Oh, tôi chỉ biết code html css react thôi, chẳng biết server là gì, không rõ cách dùng rồi thì câu lệnh của Linux CentOS đâu, deploy các thứ lằng nhằng lắm, chẳng lẽ lại phải tìm hiểu rồi học hay sao, thế bao giờ mới xong? Tất nhiên là phải học rồi, còn nếu không học thì... dùng Lambda đi. 

Lambda??? Là cái gì thế?

Việc quản lý server đòi hỏi chúng ta phải có một chút kiến thức về Infrastructure, Deploy, Moniter, ... Đôi khi xây dựng một ứng dụng đơn giản hoặc đối với người mới bắt đầu, họ chỉ muốn tập trung xây dựng về ứng dụng tương tác với người dùng ngoài việc quan tâm đến kiến trúc, Server. Đó là lí do Lambda xuất hiện. 

# Lambda là gì
Theo tiếng Anh thì Lambda được gọi là "Serverless Compute Service", dịch sang tiếng Việt từ-by-từ thì nó là dịch vụ tính toán không máy chủ, cho phép chúng ta chạy những dòng lệnh mà không cần quan tâm đến việc quản lý Server. Với Lambda, việc bạn cần làm là tải code của bạn lên đó, nó sẽ chạy và đảm bảo luôn cả việc đáp ứng nhiều Requests đồng thời, cũng như tính khả dụng High Availability. 

Code bạn chạy trên Lambda được gọi là Lambda Function. Hiện tại, Lambda hỗ trợ những ngôn ngữ lập trình sau:
- Java
- Python
- C#
- NodeJS
- Go
- PowerShell
- Ruby

Để có thể dùng Lambda, bạn cần có tài khoản trên AWS nơi bạn có thể truy cập và quản lý AWS Console.

Lambda có thể gọi là Function-as-a-Service FaaS.

# Tính năng
Một số điểm nổi bật của Lambda:
- Dễ dàng mở rộng Infrastructure ngoài việc thiết kế, cài đặt, Lambda hỗ trợ tối đa trong việc quản lý vận hành
- Có thể liên kết với nhiều dịch vụ khác của AWS S3, CloudWatch, DynamoDB, API Gateway để xử lý sự kiện qua lại lẫn nhau (Hàng của nhà thì hỗ trợ lẫn nhau)
- Dùng bao nhiêu trả tiền bấy nhiêu, không dùng thì cũng không tính tiền :grinning:
- Bảo mật tốt
- Khả năng chịu lỗi cao, không cần phải lo lắng về việc ứng dụng "tèo"
- Hiệu năng nhất quán đối với mọi yêu cầu
# Giá tiền
Giá thành phụ thuộc vào số lượng Requests và Duration (thời gian xử lý)

![](https://images.viblo.asia/428f5742-ca06-4767-b704-e2dfb36c21a5.png)

Đối với tài khoản sử dụng gói Free Tier, Lambda không tính phí cho 1 triệu Requests mỗi tháng và 400.000 GB-seconds thời gian tính toán mỗi tháng
# Tạo Lambda Function
Chúng ta sẽ tạo Lambda đối với NodeJS

Đầu tiên, tìm Service Lambda

![](https://images.viblo.asia/4d143bce-163d-4957-8c3f-d7a79b839be7.png)


Nhấn vào `Create function` để tạo 1 Function

![](https://images.viblo.asia/bd3f86f1-52f9-4fef-a6f4-b976101712ba.png)

Có rất nhiều tuỳ chọn để tạo 1 Function, để thử nghiệm chúng ta để mặc định là `Author from scratch`

![](https://images.viblo.asia/eeb48247-5b19-47f0-9527-366b10cad0f9.png)

Điền các thông tin cơ bản và phiên bản bạn muốn sử dụng để chạy Function, để đơn giản thì bỏ qua các phần khác

![](https://images.viblo.asia/b8685d9c-58e9-4523-8f3c-feb836683367.png)

Sau khi tạo xong, bạn sẽ nhận được tin nhắn thông báo đã tạo thành công

![](https://images.viblo.asia/38c6420e-1bda-41c5-a8ab-e01bb987c15a.png)

Kéo xuống dưới sẽ thấy phần hiển thị Code

![](https://images.viblo.asia/d10e310f-0fae-481a-a090-b2df606268ed.png)

Để chạy thử Function, nhấn vào nút `Test` ở phía trên bên phải sẽ hiện ra màn hình cài đặt Test

![](https://images.viblo.asia/e16a2ef4-a9e6-4f37-a1fa-b8655f1e6759.png)

Sau khi tạo xong, nhấn Test

![](https://images.viblo.asia/50ca8c0b-3eda-47aa-a157-f38af94556e5.png)

Kéo lên trên cùng sẽ có chi tiết kết quả vừa chạy

![](https://images.viblo.asia/a7036816-7f10-44b0-99f0-26efe51b606d.png)

Chúng ta có thể xem chi tiết Logs được chạy ở Cloudwatch Logs

![](https://images.viblo.asia/9f455b25-ff3e-4a35-b400-2f4f73d2219d.png)

# Kết luận
Trên đây mới chỉ là làm quen cơ bản với Lambda, ở phần sau, mình sẽ hướng dẫn dùng Lambda tương tác với các dịch vụ khác của AWS, tạo thành một liên kết liền mạch và hoạt động tương tác lẫn nhau. 

---

Nếu mọi người quan tâm tới AWS thì đọc một số bài hướng dẫn cơ bản khác của mình liên quan đến AWS nhé

[Tìm hiểu hệ thống chứng chỉ AWS](https://viblo.asia/p/tim-hieu-he-thong-chung-chi-aws-63vKjbq6K2R)

[Tìm hiểu về cơ chế Load Balancing](https://viblo.asia/p/tim-hieu-ve-co-che-load-balancing-GrLZD0X2Zk0)

[Tìm hiểu về VPC](https://viblo.asia/p/tim-hieu-ve-vpc-virtual-private-cloud-aws-3P0lPPpGlox)