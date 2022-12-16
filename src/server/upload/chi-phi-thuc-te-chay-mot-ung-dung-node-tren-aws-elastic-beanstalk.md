Bài học rút ra từ 2 năm chạy một ứng dụng Node trên nền tảng ELB(Elastic Load Balancing) của AWS (Amazon Web Services).

![](https://images.viblo.asia/4833d6b2-4f31-4ade-bba8-afac9c59ab7d.jpeg)
Photo by [Shane Rounce](https://unsplash.com/photos/1ZZ96uESRJQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/technology?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

### Front-Matter

Thật thà mà nói, cách tính giá của AWS ([AWS pricing calculator](https://calculator.s3.amazonaws.com/index.html)) là rất khó hiểu.
Một phần trong số đó là do phương thức thanh toán *a la carte* mà AWS cung cấp. Điều này làm cho việc cố gắng đưa ra một trích dẫn tốt cho khách hàng là khó khăn. Hy vọng bài viết này có thể cung cấp một số gợi ý về chi phí để chạy một ứng dụng, cũng như một số cách để giảm chi phí.

### Chi phí thực sự của việc chạy một ứng dụng

Tôi đã quản lý một node web-app trên ELB khoảng 2 năm nay. Năm đầu tiên thật tuyệt vời, họ đã cho bạn mọi thứ miễn phí(gần hết)! Sau đó, bạn bắt đầu phải trả tiền cho các công cụ, cũng như EC2(Amazon Elastic Compute Cloud (Amazon EC2)) instances.

Bài viết này sẽ tập trung vào các yêu cầu cụ thể của tôi, đó là một ứng dụng cơ bản được lưu trữ trên Elastic Beanstalk.

Để biết chi tiết việc build này, hãy xem bài viết [tại đây](https://medium.freecodecamp.org/how-to-deploy-a-node-js-app-to-the-aws-elastic-beanstalk-f150899ed977).

### Breakdown
Đây là những gì tôi hiện đang chạy trên AWS:

Single EBS Environment (U.S. West Region):

- 1 Classic Load Balancer
- 1 t2.micro EC2 instance
- S3 Bucket that holds images (7 GB at time of writing)
- 1 Route 53 Hosted Zone


**18$** (Load Balancer) + **5$** (EC2 with an RI) + **0,5$** (Route 53) + **0,17$** (S3) + **0,21$** (Data Transfer) = Khoảng **$25** một tháng.

Ngoài ra, tôi lưu MongoDB ở nơi khác, vì vậy nếu bạn có kế hoạch lưu DB trên AWS sẽ phải chịu thêm chi phí. Hãy chia nhỏ các chi phí khác nhau.

### Load Balancer

Đây là phần đắt nhất. Nó có giá:

- 0,025$ mỗi giờ cho  Classic Load Balancer (hoặc từng phần của giờ)
- 0,008$ cho mỗi GB data xử lý bời Classic Load Balancer

Điều đó có nghĩa là, nếu bạn chạy ứng dụng của mình 24 giờ một ngày, nó sẽ tốn khoảng  18$ + phí dữ liệu mỗi tháng.

### EC2 Instance

Các EC2 instance theo yêu cầu đắt hơn mức cần thiết. Để tiết kiệm một số tiền ở đây, hãy tham khảo phần bên dưới về Reserved EC2 Instances. Trong trường hợp bạn đang tự hỏi, sẽ tốn 8,40$ để chạy cùng loại EC2 instance như đã đề cập ở trên, theo yêu cầu.

### S3

Tôi có một S3 buckets. Một cho trang chủ tĩnh của tôi, một cho giữ hình ảnh và một cho giữ phiên bản ứng dụng. Theo tôi biết, ELB tự động tạo một cái để quản lý các phiên bản ứng dụng.

S3 khá rẻ, vì vậy tôi không quá lo lắng về việc cố gắng tiết kiệm từng xu một, nhưng có nhiều cách để tiết kiệm tiền thông qua hệ thống Glacier của họ .

### Database

Tôi lữu cơ sở dữ liệu MongDB tại mLab, nó cũng sắp hết free. Vì vậy tôi sẽ cập nhật thông tin này khi tôi biết chi phí thực sự là bao nhiêu, khi phải buộc phải chuyển sang Atlas của Mongo.

### Reserved EC2 Instances

Hãy nói về Reserved Instances (RI). Hệ thống thanh toán phức tạp của Amazon là phần khó hiểu nhất về việc quản lý mọi thứ trên AWS. Reserved Instances có thể giảm bớt một số chi phí, nhưng lại quá khó hiểu.

Sau rất nhiều lần đọc và nói chuyện với dịch vụ khách hàng của AWS, đây là những gì tôi tìm ra.

Đầu tiên, có hai cách khác nhau bạn có thể làm trước đó là RI: Regional và Availability Zone. Regional nghĩa là, nó cụ thể cho một trong những khu vực(region) chính, ví dụ: us-west-2 (Oregon) hay ap-southeast-1(Singapore). Vung khả dụng (AZ) dành riêng cho một vùng(zone) trong khu vực(region) đó, ví dụ: us-west-2 **a** (Oregon).

Tôi đã mua một RI trong us-west-2 và nó được tự động áp dụng cho instance của tôi đang chạy trong khu vực đó. Nếu bạn mua một cái trong AZ, nó sẽ chỉ áp dụng cho cái AZ cụ thể, ví dụ: us-west-2a, vì vậy nếu ELB tạo ra một EC2 instance trong us-west2b, bạn không gặp may.

Ngoài ra, còn có các loại RIs "tiêu chuẩn" và "chuyển đổi". Tôi không chắc 100% ý nghĩa của nó, nhưng từ những gì tôi hiểu về chuyển đổi là linh hoạt hơn về những gì bạn swap nó, những đắt hơn.

Cuối cùng, có 3 loại hình thanh toán: không trả trước, trả một phần trước, trả tất cả trước. Điều này khá đơn giản, bạn không phải bất cứ gì, một số hoặc tất cả khi bạn tạo instance. Không có lợi ích chi phí, mà tôi có thể thấy. Tuy nhiên, với một tài khoản mới, rất có thể bạn không cần trả trước.


Trên AWS hỗ trợ:

> No Upfront Reserved Instances (RIs) can pose a significant billing risk to new accounts, as they’re a contractual obligation to pay monthly for the entire term of the RI. For this reason, new accounts and lightly used accounts are unable to sign up for No Upfront RIs until a successful billing history is built with us.

Tạm dịch:
> Với tài khoản mới không có rủi ro thanh toán nào cho việc tạo Reserved Instances (RIs) , vì hợp đồng là thanh toán phải trả theo tháng cho toàn bộ thời hạn của RI. Vì lý do này, các tài khoản mới và tài khoản sử dụng ít không thể đăng ký RIs trả trước cho đế nkhi lịch sử thanh toán được lập.

Bạn có thể gặp lỗi này nếu bạn cố thử và mua không trả trước.

>` Error : Your current quota does not allow you to purchase the required number of reserved instances (Service: AmazonEC2; Status Code: 400; Error Code: ReservedInstancesLimitExceeded;)`

Hãy cẩn thận: Với bất kỳ lý do gì, phải mất một chút cho trường hợp instance "kick-in", điều này có nghĩa là ngày đầu tiên của tháng luôn có chi phí cao hơn. Tôi không chắc tại sao lại như vậy, nhưng tôi hiểu ra, tôi sẽ cập nhật nó. Xem biểu đồ dưới đây:

![](https://images.viblo.asia/5d01f848-4ed0-414b-adec-1067ae0fed3c.png)

### Pain Points

Đây chỉ là một kiếu lại nhỏ về tổng thể EBS, mà tôi cho rằng tôi sẽ đưa vào như một phụ lục cho bài viết của mình, trong trường hợp bạn tò mò.

#### Automatic updates aren’t really that automatic
(Cập nhật tự động lại không thực sự tự động)

Version Node không theo từ phiên bản này đến phiên bản khác.

Tham khảo step bên dưới về cách tôi quản lý thay đổi của phiên bản Linux khi Node không hoạt động.

### Running more than one environment
(Chạy hơn một môi trường)

Có một môi trường phát triển(dev) và môi trường thật(production) chạy cùng một lúc là dễ dàng, nhưng nó tốn kém. Chúng nhân đôi trên thực tế. Do đó, tôi thường destroy môi trường dev khi tôi hoàn thành nó.

### Documentation is horrendous
(Tài liều là vô bờ bến)

Tài liệu của AWS nó quá lớn so với việc mình cần. Đó là lý do tại sao tôi viết bài này. Thực sự rất khó để tìm câu trả lời cho nhu cầu riêng của tôi.

### How I manage Updates
(Cách tôi quản lý việc cập nhât)

Tôi có hai instances Git repo được cài đặt trên laptop của mình. Một cho dev và một cho production.

Tôi sử dụng môi trường dev để phát triển. Khá đơn giản. Tôi chỉ sử dụng thư mục production cho mục đính lấy bản cập nhật từ nhánh master của Git, chạy config webpack và triển khai(deploying) lên máy chủ thật (production server).

Lý do chúng tách biệt là bởi vì có thể bảo trì(maintain) cấu hình Elastic Beanstalk riêng biệt và không phải lo lắng về việc deploy sai môi trường.

#### Updates not requiring a Linux Environment change
(Cập nhật không yêu cầu thay đổi môi trường Linux)

Đối với bản cập nhật không yêu cầu thay đổi môi trường Linux, nó đơn giản như chạy `eb deploy` trên terminal. Thật tuyệt vời và mất khoảng 10 phút để hoàn thành.

#### Updates requiring a Linux Environment change
(Cập nhật yêu cầu thanh đổi môi trường Linux)

Occasionally, you will want to update the Linux environment but will be unable too because AWS is freaking dumb (I’m sure there’s a reason) and only allows certain versions of Node on each Linux build. For this, it’s a bit more complicated, but manageable.

Thỉnh thoảng, bạn sẽ muốn cập nhật môi trường Linux nhưng không thể được bởi vì AWS rất ngu(tôi chắc có lý do) và chỉ cho phép một số phiên bản Node nhất định trên mỗi bản build Linux. Đối với điều này, nó phức tạp hơn một chút, nhưng có thể quản lý được.

- Push lên cấu hình production dưới env mới. Lần cuối cùng tôi làm điều này, tôi chỉ tạo một instance thông qua `eb create prod-1`. Nó sẽ làm những gì nó cần và triển khai ứng dụng của bạn đến một môi trường mới.
- Hãy chắc chắn tất cả những cập nhật của bạn hoạt động. Có vẻ khá rõ ràng, nhưng đây là thời điểm tốt để đảm bảo không có bất kỳ trục trặc nào với bản build mới.
- Hãy chắc chắn các biến env được thiết lập chính xác. Đây là một phần của phiên bản trước, nhưng chắc chắn bạn bạn đang lấy DB hoặc bất cứ điều gì đều đúng.
- Đảm bảo cân bằng tải (load balancer) của bạn có chứng chỉ SSL (nếu có). Thực tế, nếu bạn truy cập một ELB instance với https mà không có chứng chỉ, thì nó sẽ thất bại.
- Swap các instances. Cuối cùng, sau khi mọi thứ có vẻ ổn, có một button trong console để hoán đổi url của các instances. Thât dễ dàng. Bạn không phải thay đổi bất cứ điều gì trong Route 53, tất cả sẽ giúp bạn.


Vì vậy, bạn đã có nó. Việc quản lý cập nhật của bạn khá dễ dàng.

### Final Thoughts
(Cảm nghĩ sau cùng)

Nếu bạn có bất kỳ đề xuất nào để làm cho nó rẻ hơn/dễ hơn, tôi rất thích nghe chúng. Tôi thích các cuộc thảo luận về các công cụ và tùy chọn của các nhà phát triển thiếp theo.

Với điều đó, tôi sẽ dừng tại đây. Happy coding!

Tham khảo: https://medium.freecodecamp.org/the-reality-of-running-a-production-node-app-on-aws-elastic-beanstalk-55c78b5dad0b