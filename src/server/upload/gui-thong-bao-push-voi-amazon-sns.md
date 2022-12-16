# 1. Cơ chế push notification
Trước tiên đi vào giải thích về Amazon SNS mình sẽ giới thiệu qua về mô hình push notification ở phía smartphone. Đầu tiên, thông báo đẩy (push notification) là các tin nhắn xuất hiện trên màn hình khóa của điện thoại thông minh hoặc ở phía trên của màn hình trong khi đang sử dụng điện thoại.
Các thiết bị iOS sử dụng Apple Push Notification Service (APNs) 
Các thiết bị Android sử dụng dịch vụ Google Cloud Messaging  (GCM)
để gửi thông báo đến các thiết bị. Tuy nhiên về mặt cơ chế của chúng là giống nhau!
Ban đầu, app sẽ hỏi xem người dùng có cho phép thông báo khi app khởi động không. Tại thời điểm này, nếu người dùng cho phép thông báo, dịch vụ push notification ở trên sẽ được kết nối với từng thiết bị thông qua token có sẵn trên điện thoại. Dựa trên token này, các thông báo sẽ được gửi đến đúng thiết bị đích.
![](https://images.viblo.asia/09622daa-d556-4144-8c2d-9bdf1ca59fd5.png)

# 2. Amazon SNS
Bây giờ chúng ta sẽ vào vấn đề chính!
Amazon SNS là một dịch vụ thông báo di động trong AWS có thể gửi thông báo đến các thiết bị như iOS, Android và Windows Phone.
Nó có thể gửi thông báo cho một số lượng lớn người dùng chỉ với một request với tốc độ thực hiện khá nhanh. Thủ tục sử dụng dịch vụ rất đơn giản. Chỉ cần tạo một topic, subscribe endpoint (điểm cuối)  và publish một thông báo đến topic đó để push notification!
Khi publish 1 thông báo thì thông báo đó sẽ được gửi tới topic - nơi lưu trữ thông tin những thiết bị (subscriber) đã đăng kí topic đó. Dựa vào đó, topic sẽ gửi thông báo đó cho tất cả những thiết bị đã subsribe.
![](https://images.viblo.asia/c6ef8da1-a6e7-4de7-9a10-ab0061448a26.png)

Nếu đọc Tài liệu AWS (https://aws.amazon.com/jp/documentation/sns/) và làm theo quy trình, bạn có thể tự gửi thông báo, nhưng vì có nhiều thuật ngữ kỹ thuật, rất khó để nắm bắt toàn bộ cơ chế và để áp dụng nó bằng cách sử dụng nó từ API máy chủ bên ngoài. Thành thật mà nói, tôi nghĩ không quá lời khi nói rằng trở ngại lớn nhất của Amazon SNS là những thuật ngữ này. Do đó, trong bài viết này, tôi sẽ viết về cơ chế phân phối push notify bằng SNS sau khi giải thích các thuật ngữ của Amazon SNS một cách dễ hiểu.

# 3. Thuật ngữ trong Amazon SNS
* Amazon Resource Name（ARN）
ARN là ID dùng để phân biệt các tài nguyên trong AWS, nó được dùng cho toàn bộ các service trong AWS, không chỉ riêng SNS. Dưới đây là 1 ví dụ về ARN:
` arn:aws:sns:us-east-1:123456789012:push_topicname`

* Endpoint
Endpoint được sử dụng để xác định thiết bị sẽ phân phối noti tới. Nó là một ARN để xác định thiết bị đầu cuối được tạo ra từ device token mình đã giải thích trong mục [1] của bài viết này. Endpoint này được tạo khi device token được đăng ký. Khi tiến hành gửi push noti, noti sẽ được gửi tới thiết bị được định nghĩa bởi endpoint. Nếu bạn không hiểu nó, bạn có thể coi nó như một địa chỉ email.

* Application
Nó là 1 platform sử dụng để push thông báo đối với mỗi ứng dụng. Chúng ta có thể lựa chọn 「Apple Production」hoặc「Apple Development」đối với IOS hoặc 「Google Cloud Messaging（GCM）」cho các ứng dụng Android. Các endpoint được nói ở trên được đăng kí và quản lí tại application này.

* Topic
Topic sẽ sử dụng để gửi nhóm các endpoint thành 1 group để gửi noti 1 lần cho tất cả endpoint trong group đó. Ở phía trên chúng ta đã có Application với chức năng đăng kí, quản lí endpoint, gửi push noti tới từng endpoint riêng lẻ. Nhưng khi số lượng endpoint nhiều lên thì nảy sinh ra vấn đề cần nhóm nhiều endpoint thành 1 cụm để tiến hành push noti 1 lần cho tất cả các thiết bị. Việc nhóm các endpoint thành cụm này được định nghĩa ở topic!

* Subscribe
Subscribe là hành động liên kết endpoint với topic, khi người dùng đồng ý nhận push notification thì subcribe sẽ được thực hiện để kết nối endpoint của thiết bị với topic (vào trạng thái sẵn sàng nhận thông báo). Khi đó, các thông báo tới topic sẽ được chuyển tiếp tới các endpoint là các thiết bị người dùng.

* Publish
Là việc gửi push notification. Cụ thể ở SNS, đó là việc push tin tới topic. Việc publish message này cũng có thể được thực hiện ở màn hình Topic hay màn hình Application

# 4. Cơ chế thông báo đẩy bằng Amazon SNS
![](https://images.viblo.asia/831e9aad-bbbc-475f-976e-d76f575c497d.png)

Về cơ bản, nó gần giống như [1. Cơ chế push notification], nhưng Amazon SNS làm trung gian giữa server ở phía ứng dụng và dịch vụ phân phối thông báo đẩy của mỗi thiết bị. Server nhận device token từ smartphone,  chuyển cho Amazon SNS đăng kí và tạo endpoint. Khi endpoint được tạo, subscribe topic có thể thực hiện từ server ứng dụng thông qua API hoặc trực tiếp từ Amazon SNS, khi gửi push notification, thống báo sẽ được gửi qua topic và gửi đến các device đã subcribe.
API để sử dụng Amazon SNS từ bên ngoài được AWS cung cấp và có thể được sử dụng dễ dàng. Tất cả những việc như đăng ký endpoint, tạo và đăng ký topic có thể được thực hiện bằng API. Vui lòng tham khảo URL sau để biết chi tiết về API. [https://docs.aws.amazon.com/sns/latest/dg/mobile-push-api.html]

* Đặc biệt, việc SNS được tích hợp với Amazon CloudWatch rất thuận tiện vì nó có thể theo dõi số lượng tin nhắn được phát hành trên SNS, tỷ lệ thành công và tỷ lệ thất bại của các thông báo.