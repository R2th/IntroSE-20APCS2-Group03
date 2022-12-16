![](https://images.viblo.asia/9db75ba4-120d-4a79-9cee-2276cc1ea1c0.jpg)

Apple đã thông báo về một tính năng mới của iOS14 được gọi là "App Clips" để hiển thị thông tin từ ứng dụng mà không cần thiết tải xuống toàn bộ ứng dụng. 
Họ cũng mô tả App Clips là một phần nhỏ của ứng dụng thiết kế để người dùng xem trước khi tải xuống. 

Một App Clips sẽ khởi chạy ngay lập tức và cung cấp một số chức năng được liên kết của nó cho những người dùng chưa cài đặt đầy đủ. 
Đây là phiên bản nhẹ của ứng dụng, có thể sử dụng cho nhiều dịch vụ.

![](https://images.viblo.asia/257a5fd7-071b-46f3-a3a8-74abba069c15.jpg)

Về cơ bản, nó cung cấp một giao diện chung để chuyển đổi nhanh chóng các ứng dụng thành các tiện ích. 
Thông qua một vài đoạn code App clips, NFC hay QR Code thì App Clips được hình thành.  Theo như ví dụ trong buổi WWDC nói rằng khi bạn đỗ xe, bạn sẽ sử dụng 
NFC để thay toán phí đỗ xe sẽ xuất hiện phía dưới màn hình iphone. Đây là sự hỗ trợ cho Apple Pay để thay toán mà không cần nhập số tài khoản.
![](https://images.viblo.asia/e04990ca-aa35-41c5-b198-9877a9de475d.jpg)

## Khởi tạo App Clips.
Cùng với Xcode bạn tạo thêm 1 target cho App clips và chia sẽ code giữa app chính và app clips. Tiếp đó bạn có thể run, debug app clips vừa tạo trên máy ảo hoặc device thật.

Ngoài ra bạn còn cần cấu hình với web server của mình để cho phép hệ thống xác thực app clips của mình.

Kích thước của App Clips:

![](https://images.viblo.asia/1a3b3ab8-dc29-4543-8778-89ce88445de0.jpg)

### Add App Clips Target.
App Clips yêu cầu một ứng dụng tương ứng cung cấp ít nhất chức năng giống với App clips và bạn cần sử dụng chung 1 project đối với App clips và app tương ứng đó.

Nếu bắt đầu với project mới, bạn hãy tạo 1 ựng dụng iOS bình thường và sau đó tạo 1 target đối với App Clips.

![](https://images.viblo.asia/a062d3e2-da21-41c5-95fa-1fef7bf78651.png)

### Add Associated Domains Entitlement.
Người dùng chạy App Clips từ các url điều hướng tới app clips hoặc nếu người dùng đã cài đặt full app. Tuy nhiên dù như thế nào bạn vẫn cần thêm `Associated Domains Entitlement`
vào cả app và app clips:
* Mở project trong Xcode và trong project Settings kích hoạt `Associated Domains capability` để thêm Associated Domains Entitlement.
*  Với môi URL để chạy App hay App clips hãy thêm domain vào Associated Domains capability theo cú pháp: `appclips:<fully qualified domain>`.Ví dụ: appclips:example.com.

Tuy nhiên bạn cũng cần config với server của mình, hãy [xem thêm](https://developer.apple.com/documentation/app_clips/configuring_your_app_clip_s_launch_experience) tại đây!

### Add Code and Assets.
App Clips có cấu trúc giống các app bình thường khác có thêm code và assets.  Để đảm bảo việc duy trì hãy cố gắng chia sẻ code giữa app chính và app clips càng nhiều càng tốt.
* Nếu khởi tạo ứng dụng mới, hãy xây dựng nó hãy thực hiện code theo dạng cách module. Ví dụ tạo các thành phần chung thành các module và chỉ cần import chúng.
* Nếu bạn thêm App Clips vào một ứng dụng hiện đã có, hãy xem xét việc chia sẻ code giữa ứng dụng chính và App Clips để tránh việc tái lặp code.
* Thêm chia sẻ asset giữa 2 target với nhau.

### Use Active Compilation Conditions.
Khi bạn chia sẻ code giữa app chính và app clips, bạn  có thể thường gặp trường hợp bạn không thể sử dụng một số code của app vào app clips.

Trong những trường hợp này, hãy  config Active Compilation Conditions trong build settings để khai báo điều kiện loại trừ code.

![](https://images.viblo.asia/c96ea15f-bf64-4785-87aa-24a3727a0791.png)

giờ hãy build và run thử nào!.

### Thay đổi phía server và project trong XCode.
Trước khi hệ thống hiển thị hay cho phép gọi App clips, nó sẽ xác minh App clips và gọi URL. Nếu không được xác minh nó sẽ không thực hiện được  việc đó. 
Để có thể chúng ta cần thay đổi phía server và project XCode.

Trước hết hãy thêm file ` Apple App Site Association` vào server của bạn. Tiếp theo, bạn sẽ có được key của appclips. 
Nếu trươc đó bạn đã thêm vào server thì hãy thêm appclips key vào file đã có. Với format như sau:
`{ "appclips": { "apps": ["ABCED12345.com.example.MyApp.Clip"] } ...}`

Giá trị 1 mảng là các bundle id của app
Cuối cùng trong project bạn add domain vào `Associated Domains Entitlemen` trong cả 2 target.

### Configure and Respond.
Hệ thống sử dụng các URL đã config trong Appstore Connect để khởi chạy App clips của bạn. Chính vì thế việc cấu hình trên AppStore Connect là điều cần thiết.
Bạn có thể xem thêm [tại đây! ](https://developer.apple.com/documentation/app_clips/configuring_your_app_clip_s_launch_experience)

### Publish Your App Clip.
App clips yêu cầu có một App tương ứng với nó,  và bạn sẽ gửi nó như app’s archive của bạn. Và chú ý rằng app clips cũng cần qua kiểm duyệt của Apple nhé.

Project tham khảo: [Simle app clips](https://developer.apple.com/documentation/swiftui/fruta_building_a_feature-rich_app_with_swiftui)

### Nguồn tham khảo: 
medium: https://medium.com/swlh/ios-14-app-clips-95bfaf2b159c