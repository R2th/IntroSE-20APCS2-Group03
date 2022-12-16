Đây là bài viết của tác giả Morishita tại https://tech.actindi.net/2019/07/29/085835

AWS cung cấp rất nhiều dịch vụ hỗ trợ cho việc phát triển ứng dụng web, nhưng cũng gây ra khó khăn nhất định trong khi sử dụng.

Đó là việc **thông báo tin nhắn trên Slack**.

(Giải thích thêm, công ty mình sử dụng các dịch vụ của AWS cho các sản phẩm ứng dụng web và dùng Slack để liên lạc. Vì vậy khi có pull request hay các thay đổi cho sản phẩm được đưa lên, cần phải có thông báo ở trên kênh chat để check và comment yêu cầu sửa hoặc merge/deploy)

Thực ra, gửi tin nhắn trên Slack  sử dụng Lambda không khó và có thể được thực hiện nhanh chóng. Trên thực tế, điều quan trọng của Cloud Watch Alert là thông báo cho Slack thông qua SNS (Simple Notification Service) + Lambda.

Trước đây, Amplify Console được dùng để thông báo qua mail các tính năng được xây dựng, deploy. Thực sự việc thông báo này là 1 điều rất quan trọng trong quá trình phát triển và triển khai ứng dụng. Tuy nhiên, điểm trừ lớn là nó lại thông báo qua email là chính(1 chút bản thân: đến mấy cái thông báo và mail từ github cảnh báo dependancies của source code đã outdate mình không bao giờ đọc cả. Nên điểm này mình cũng đồng ý rằng cứ mail với noti nội bộ sẽ mang khả năng cảnh báo thấp hơn). Đến ngay cả chính Amplify Console cũng thông báo mọi thứ qua email, vì thế có những lúc AWS cũng khiến các nhà phát triển làm qua loa cho nhanh. Chẳng hạn như với tác giả, lắm lúc chỉ cần thiết lập cái URL của Incoming Webhook là deploy xong, không cần quan tâm thêm gì nữa.

Và nhận ra những điều chưa hợp lý đấy, 29/07/2019, AWS đã cho ra dịch vụ mới: AWS Chatbot(https://aws.amazon.com/about-aws/whats-new/2019/07/introducing-aws-chatbot-chatops-for-aws/)
# Liếc tài liệu nhanh và lựa chọn dịch vụ
Tác giả bài gốc đã liếc tài liệu rất nhanh và nhận xét nó không khó để triển khai. Tuy nhiên, do mới ở bản Beta nên AWS Chatbot mới chỉ hỗ trợ cho Amazon Chime và Slack. Ở giao diện [Chatbot Console](https://us-east-2.console.aws.amazon.com/chatbot/home?region=us-east-2#/home) chúng ta sẽ lựa chọn 1 trong 2 dịch vụ nêu trên. Và ở đây chúng ta sẽ chọn Slack.

![](https://images.viblo.asia/c8163cee-f3be-4f18-bfc6-a8cc56b62131.png)
# Cài đặt trong ứng dụng Slack
Sau khi chọn Slack, ta sẽ bấm vào Configure client và điều hướng sang Slack với cái dialog sau:

![](https://images.viblo.asia/9905e5fb-02b1-4624-b364-89b6166e4cd2.png)

Hãy để ý ở góc phải trên cùng, tài khoản Slack của bạn sẽ hiện ra nếu bạn đăng nhập Slack bằng browser. Bạn có thể chọn tài khoản khác bằng cách click vào đó và dropdown hiện ra. Nhấn install để cài đặt và bạn sẽ được chuyển sang trang quản lý ứng dụng trên Slack. 

![](https://images.viblo.asia/46a66976-6030-4b96-9c1b-27526646f585.png)

Chúng ta sẽ chuyển đến việc thiết lập cho Chatbot sau khi cài đặt xong. Ở đây chúng ta sẽ chia làm 3 bước.
# Thiết lập kênh
![](https://images.viblo.asia/6844678e-ebc3-4024-aac8-18dd54490f05.png)

Ở đây, chọn Private và nhập vào `Private channel ID`. Nếu bạn chọn Public, bạn có thể chọn kênh đích từ danh sách các kênh trong Slack được kết nối.

Sau đó sẽ là thiết lập vai trò IAM

![](https://images.viblo.asia/5da984d6-99c9-4364-a645-e1f55b9bfbe1.png)

Bạn có thể chọn một cái hiện có, `Create an IAM role using a template`. Khi đó, một vai trò với các đặc quyền cần thiết sẽ tạo ra.

Cuối cùng là chọn SNS Topics.

![](https://images.viblo.asia/7284da4e-239a-4325-97eb-e7117b17edb3.png)

Vì Chatbot là 1 subclient của SNS, chúng ta sẽ phải chọn topic cho SNS. Ở đây việc thiết lập đã mặc định cho bạn khá nhiều nên bạn hãy cẩn trọng thiết lập và loại bỏ những mục không cần thiết. Bạn cũng có thể thêm topic cho 1 khu vực nào đó. Sau khi xong bấm "Configure".

Sau khi xác nhận về SNS Topic trên console, kết quả cuối cùng sẽ rưa rứa thế này

![](https://images.viblo.asia/acb411b9-302f-4e86-995d-9e3106b12e99.png)
# Gửi tin nhắn để kiểm tra
Tác giả đã thử thí nghiệm rất nhiều tin nhắn từ dịch vụ khác nhau nhưng có vẻ như vẫn miss mất 1 số dịch vụ. Cũng dễ hiểu vì hiện đây là bản beta, tức mới còn thử nghiệm. Danh sách các dịch vụ được chatbot giám sát bao gồm: 
- Amazon CloudWatch
- AWS Health
- AWS Budgets
- AWS Security Hub
- Amazon GuardDuty
- AWS CloudFormation
# Đẩy thử luôn EC2
Sau khi thử nghiệm và hiểu, tác giả quyết định đẩy luôn lên EC2 để thử.

Trước tiên, tác giả tạo instance với các alarm như sau:

![](https://images.viblo.asia/a312024d-48a3-4a9c-baa1-6f2057f33738.png)

Sau đó gõ lệnh `stress`

Và chúng ta đã có thông báo trên Slack

![](https://images.viblo.asia/71c6d187-e8dc-4a27-8580-71d17524ffb9.png)

Như chúng ta có thể thấy, đây là thông báo có lỗi. Và khi sửa lỗi xong thông báo được nhận về sẽ là

![](https://images.viblo.asia/fee90dae-9029-4a71-9ae1-7b78bc3cde75.png)
# Tổng kết
* Chatbot có thể gửi thông báo về các dịch vụ khác nhau tới Slack thông qua SNS
* Đặc biệt là CloudWatch Alert. Với dịch vụ này thì tin nhắn trên Slack sẽ nhanh và đơn giản
* Tuy nhiên, hiện các dịch vụ được chatbot hỗ trợ vẫn còn ít
Lúc đầu, tác giả tưởng có thể gửi bất kỳ tin nhắn nào của SNS, vì vậy nó không như mong đợi, nhưng đây sẽ là một dịch vụ tiện lợi hơn nếu được mở rộng trong tương lai.
# Nguồn
https://tech.actindi.net/2019/07/29/085835