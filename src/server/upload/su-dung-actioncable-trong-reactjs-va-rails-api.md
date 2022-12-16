Xin chào mọi người. Hôm nay mình xin mang đến cho mọi người một bài giới thiệu cũng như demo nho nhỏ về ActionCable trong Rails.
Cụ thể ở đấy mình sẽ viết Rails API để trả về các Notification cho client (viết bằng ReactJS) theo dạng Real-time. Let's rockkk.
# ActionCable là gì ấy nhỉ?
Theo như mình tìm hiểu thì ActionCable cung cấp giải pháp tích hợp Websocket, một phươc thức giao tiếp 2 chiều cho client và server cho phép lập trình viên triển khai các tính năng Real-time (thời gian thực) cũng như cung cấp các tính năng hỗ trợ cho JS framework và Rail framework.
Đi sâu hơn tí, mình sẽ nói sơ về phương thức hoạt động của nó nhé. Một Action Cable server có thể quản lý nhiều connection instances (mình đọc theo tài liệu của RailsGuides nên không biết dịch cái này sao cho hợp lí cả), mỗi connection instance sẽ thuộc một WebSocket connection. Một người dùng đơn lẽ sẽ có thể có nhiều WebSockets kết nối tới ứng dụng nếu người dùng mở nhiều tab trên browser hoặc sử dụng nhiều thiết bị cùng lúc. Client của một WebSocket connection sẽ được gọi là consumer.

Mỗi consumer nói trên lại có thể subscribe đến nhiều cable channels. Đến đây nhiều bạn sẽ thắc mắc subscribe là như nào? Hay cable channel là cái gì?

Minh xin được giải thích là subscribe có nghĩa là người dùng sẽ đăng ký lắng nghe một channel nào đó, channel ở đây sẽ là nơi phản ánh các thay đổi đến cho consumer. Ví dụ như người dùng subscribe NotificationChannel, thì khi chúng ta tạo và đẩy một notification mới vào channel thì những người dùng đã subscribe NotificationChannel đó sẽ không cần phải gọi lại API get notifications để lấy lại list noti kèm cái mới vừa tạo nữa, mà nó sẽ tự động báo cho phía client là có cập nhật mới và load lại luôn. Real-time là đây chứ đâu.

![](https://images.viblo.asia/2ac69200-96be-4f76-984f-061fb74b0dcd.png)


Như ở trên mình đã nói 1 consumer có thể subscribe nhiều channel và nhận đồng thời các thay đổi mới được phản ánh về các channel đó, kiểu như bạn có thể join nhiều chat box trong Chatwork, đang chém gió ở box này mà vẫn nhận được các tin nhắn mới ở các chat box khác.
Mình thấy đến đây hơi dông dài rồi, lý thuyết thì chắc mọi người có thể tìm hiểu thêm ở các bài viết khác hoặc các trang mạng khác để có thể hiểu rõ hơn theo góc nhìn của mình nhé. Còn giờ ta sẽ bước vào phần demo thôi.

# Let's rock with the demo

Mình có làm một demo nhỏ, thử xem ActionCable sẽ được dùng như thế nào để gửi Real-time noti từ Rails server về React JS client nhé.

## I. Setup server Rails đã nào

### 1) Initialize project mới nào

Mình sẽ rails new một project mới. Kèm với đó là tạo db cũng như generate model cho Notification, những cái này thì chắc cơ bản rồi nên mình sẽ không cover ở đây nữa. Ngoài ra cũng cần có gem **rack-cors** để có thể cho phép client gọi các API bên server Rails mà không bị chặn bởi CORS policy.

* Thêm gem **rack-cors** vào Gemfile sau đó chạy bundle install nha.
* Thêm đoạn code dưới đây vào app/config/application.rb nhé ạ.

![](https://images.viblo.asia/0c0651a9-939f-4e85-8876-11f4dbd503d0.png)


### 2) Setup Action Cable

**1. Setup routes nào**

![](https://images.viblo.asia/c7694316-bc8f-4a32-8e4b-c9a0fc8c4153.png)


**2. Generate NotificationChannel**

Tiếp theo, ta sẽ tạo channel Notification để client có thể subscribe vào và nhận các thay đổi. Ta cần chạy lệnh dưới đây để generate channel nhé.

> rails g channel notification

Ở đường đẫn *app/channels/* ta có thể tìm thấy file *notification_channel.rb*

![](https://images.viblo.asia/d79c378e-ea3c-4ef6-94b3-9a64eec8ff1d.png)


Ở đây, trong hàm subscribed sẽ định nghĩa là khi subscribe các thông tin sẽ được stream từ kênh nào.  Hoặc khi unsubscribed thí sẽ có hạnh động gì. Cái này mình cũng chưa tìm hiểu sâu nên mong moị người chỉ giáo thêm ở phần bình luận.

**3. Tạo controllers thôi nào**

Ở demo này mình sẽ tạo 2 controller chính là NotificationController để tạo các notification mới từ server và Api::NotificationController để phía client có thể gọi để lấy về list notifications ạ.

***NotificationController.rb***

![](https://images.viblo.asia/b6f31d09-2b68-46ef-9550-e50a57a6360f.png)


Như các bạn thấy ở đây sau khi tạo notification mới, mình gọi thêm 

> *ActionCable.server.broadcast "notificationchannel", {data: @notification}*  

để có thể gửi notification mới tạo đến ***notification_channel***. Channel mà ta đã tạo ở trên đó.

***Api::NotificationController***

![](https://images.viblo.asia/5ceaa43b-5762-4489-b189-12e8204b442a.png)

Vậy là đã xong các phần của Rails Server rồi, giờ ta sẽ đến với phần setup Client để test xem dưới client có thể nhận Notification mới theo thời gian thực không nhé.

## II. Setup ReactJS client để làm việc với ActionCable

**1)  Tạo một app ReactJS mới nhé**

> create-react-app demo-app

**2) Tiến hành cài đặt  gói "react-actioncable-provider" bằng câu lệnh dưới**

> npm install -S react-actioncable-provider

**3) Trong file index.js chúng ta sẽ implement như dưới.**

![](https://images.viblo.asia/063349ad-7efe-4e36-aede-af24bc5b3e26.png)


Và ***BOOM***, test thử xem nhé.

![](https://images.viblo.asia/f0f728e7-98ff-44ec-88ba-a13d5bb1c6df.gif)

# Kết bài
Cảm ơn mọi người đã theo dõi bài viết. Vì mới tìm hiểu về phần này nên còn nhiều thiếu sót hoặc sai sót nên mong mọi người có thể đóng góp vào sửa chữa bài viết bằng cách comment bên dưới nhé.