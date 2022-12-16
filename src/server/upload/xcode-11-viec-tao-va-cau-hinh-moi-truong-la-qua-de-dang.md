Cách đây khoảng 2 tháng mình đã có một bài viết liên quan đến việc [Tạo và quản lý Scheme trong một project IOS](https://viblo.asia/p/tao-va-quan-ly-scheme-trong-mot-project-ios-Az45br6g5xY) . Tình cờ ngày hôm nay mình download Xcode 11 về và mở project cũ lên thì thấy Xcode 11 support việc cấu hình cho các scheme rất đơn giản. Vì vậy mình viết luôn bài này để chia sẻ những gì mà mình thấy được trên Xcode 11.
### Tạo Config
Giống như các phiên bản Xcode trước, chúng ta vẫn sẽ cần phải tạo ra **Configurations** ^^ . Mình ở đây sẽ tạo ra 2 scheme nữa là Develop và Staging. Cách tạo thì vẫn giống như bài viết trước của mình ^^ (Cái này thì chắc bạn nào cũng biết tạo rồi)
### Cấu hình bundle ID & Provisioning Profiles & Certificates
Sau khi tạo "Configurations" xong thì lúc này, tại tab **Signin & Capabilities** chúng ta sẽ thấy rằng có các tab con tương ứng với các mục Configurations đã tạo. 
![](https://images.viblo.asia/1cc15f8e-0435-4080-bb9f-a5e6e2499fdc.png)
Chắc đọc đến đây thì các bạn đã nhìn thấy sự khác biệt so với các phiên bản Xcode trước rồi đúng không?
#### Bundle ID
Trước đây, để thiết lập bundle id cho từng môi trường, chúng ta sẽ có các cách khác nhau như tạo file plist hoặc cài đặt trong Build Settings như trong bài viết trước của mình. Nhưng với Xcode 11 thì đã được "giao diện" hoá việc thiết lập. Trên Xcode 11 thì tương ứng với mỗi môi trường, chúng ta có thể dễ dàng thiết lập Bundle ID. 
![](https://images.viblo.asia/c5505d80-4147-4dc2-8f8d-ada3ec2dd78d.gif)
#### Provisioning profiles & Certificates
Việc thiết lập provisioning profiles và certificates trên Xcode 11 cũng được "giao diện" hoá,  cá nhân mình thấy việc đưa các môi trường ra từng tab riêng biệt như thế này rất hay. Các bạn dev mới cũng có thể dễ dàng cấu hình được. Trước đây, chúng ta cần phải vào **Build Settings**, sau đó search hoặc kéo xuống tìm mục Signing để tiến hành thiết lập ^^ . Còn hiện giờ chỉ cần chọn từng tab, sau đó chọn đúng provisioning profiles và certificate cho bundle id.
![](https://images.viblo.asia/2fc1f462-8faf-4f07-9b6a-d157c1b06ea7.gif)
### Thiết lập các quyền mở rộng
Ví dụ việc thiết lập universal link cho app. Thông thường, với mỗi môi trường chúng ta sẽ có một domain riêng. Vậy việc xử lý universal link cho app của chúng ta sẽ thực hiện như thế nào? Trước đây mình đã từng thiết lập 1 lần bằng cách tạo ra "User Defined Setting" sau đó gán domain cho từng môi trường. 
Tuy nhiên, với Xcode 11 thì không cần như vậy nữa, bởi hiện tại việc tạo và thiết lập rất đơn giản. Với mỗi môi trường hiện giờ chỉ cần  tạo ra 1 file Associated Domains.
![](https://images.viblo.asia/96383fa1-730e-4108-8303-8c215ac361da.gif)
Thật đơn giản đúng không? 
### KẾT
Trên đây là những cảm nhận của mình về Xcode 11. Cảm ơn các bạn đã đọc qua bài viết.