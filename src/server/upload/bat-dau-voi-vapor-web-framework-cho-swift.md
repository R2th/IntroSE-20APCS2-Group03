# Giới thiệu
Chắc hẳn các swift developer đã đều từng nghe về các Web Framework như [Perfect](https://github.com/PerfectlySoft/Perfect), [Kitura](https://github.com/IBM-Swift/Kitura) và [Vapor](https://github.com/vapor/vapor), mỗi framework đều có đặc điểm khác nhau. Và hôm nay tôi sẽ giới thiệu với các bạn cách install, build và deploy một ứng dụng Web bằng Vapor, lí do tại sao tôi lại chọn Vapor:
*  Vapor có một document cực kỳ dễ đọc và dễ hiểu
*  Vapor có cộng đồng phát triển cực khủng, tôi nhớ không nhầm thì trước kia  [Perfect](https://github.com/PerfectlySoft/Perfect) luôn có lượng star vượt trội so với Vapor, tuy nhiên giờ thì tình thế đã ngược lại.
*  Vapor cung cấp một service cloud tiện lợi, giúp deploy server rất dễ dàng.


Và bây giờ chúng ta cùng nhau bắt đầu setup, build và deploy ứng dụng Web đầu tiên bằng Vapor (Swift).

# Install
Trong bài viết này tôi sẽ giới thiệu các bạn install Vapor trên macOS, còn bạn nào dùng Ubuntu thì có thể tham khảo [link](https://docs.vapor.codes/3.0/install/ubuntu/) này để thực hiện việc setup.

Trước tiên bạn phải install Homebrew:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Install Vapor:
```
brew install vapor/tap/vapor
```
Kiểm tra lại chắc chắn đã install vapor thành công
```
vapor --help
```
![Done!](https://images.viblo.asia/56278cb3-5463-4a22-b9e7-b72c1c27a7e1.png)

# Tạo project đầu tiên với Vapor
Bây giờ bạn đã cài đặt Vapor thành công, và hãy cùng nhau tạo project web đầu tiên sử dụng Vapor thôi nào.

### New Project
Project này tôi gọi là VaporDemo, để tạo một project mới, bạn mở terminal:
```
vapor new VaporDemo
```
![](https://images.viblo.asia/c9860dc3-c60c-4514-b50f-4a2ea30cb167.png)
### Generate Xcode Project
```
vapor xcode
```
### Build & Run
Mở xcode và chọn *run scheme* từ scheme menu and *My Mac*  ở deployment target (màu đỏ), sau đó click  play button. 
![](https://images.viblo.asia/aae8df3b-8386-4a0f-90d8-20a21b398bde.png)

và khi build thành công thì các bạn check http://localhost:8080/hello sẽ hiển thị ra page với nội dung *Hello Vapor*.

Như vậy là các bạn đã có thể tạo ra một webpage đầu tiên bằng Vapor rồi đó, thật dễ dàng phải không nào. 

# Deploy Vapor Project lên Vapor Cloud
Đầu tiên bạn cần phải tạo một tài khoản Vapor Cloud tại [đây](https://dashboard.vapor.cloud/).
Sau khi tạo tài khoản thành công, thì bạn tạo một project trên phần **dashboard**.
Để deploy vapor project trên vapor cloud, các bạn thực hiện câu lệnh sau trên terminal:
```
vapor cloud deploy
```
Trong quá trình deploy, chúng ta cần confirm các thông số như dưới đây: git, appname, app env, database ...
![](https://images.viblo.asia/ce4351f0-4add-45e6-b0cb-5b2371ab4cb1.png)

các thông số này chúng ta cần phải config đúng, nếu bạn config sai quá trình deploy sẽ fail :]].
sau khi deploy thành công thì chúng ta có được webpage tại link [VaporDemo](https://vapordemo-dev-vapordemo.vapor.cloud/hello).

*Vapor cloud* cũng cung cấp các dịch vụ cloud mình nghĩ có giá rất tốt, các bạn cũng có thể dùng gói free để phát triển :v
# Tổng kết
Trên đây tôi đã giới thiệu với các bạn cách install, build project và deploy một web project sử dụng framwork Vapor được viết bằng ngôn ngữ swift thuần. Hi vọng các bạn iOS dev như tôi muốn tự làm API hay muốn làm một website cho riêng mình bằng ngôn ngữ mà mình đã quen thuộc có thể tiếp cận Framwork này, không cần phải học một ngôn ngữ khác, tiết kiệm được thời gian phải trong nào. Trong các bài tiếp theo tôi sẽ cố gắng giới thiệu các bạn về các API của Vapor, cách nhúng Front end vào project và cách tạo ra một API đơn giản bằng Vapor. 
Cám ơn các bạn đã đọc bài. 

[Project Demo](https://github.com/anhnc55/vapordemo)

Tham khảo: https://docs.vapor.codes/3.0/
https://docs.vapor.cloud/