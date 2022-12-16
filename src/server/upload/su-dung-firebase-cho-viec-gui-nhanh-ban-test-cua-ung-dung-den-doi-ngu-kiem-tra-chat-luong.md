Chủ đề này chúng ta sẽ tìm hiểu về một tính năng của Firebase là gửi bản test của ứng dụng đến một nhóm người được chỉ định để kiểm tra chất lượng của sản phẩm trước khi phát hành bản chính thức đến cửa hàng Google Play. Tính năng này có tên gọi là Firebase App Distribution.

# Giới thiệu về Firebase App Distribution
Firebase App Distribution là một tính năng mới của Firebase được bắt đầu thử nghiệm bản Beta từ tháng 9/2019. Về cơ bản tính năng này được Firebase giới thiệu là sẽ cung cấp bản build của ứng dụng đến đội ngũ kiểm tra chất lượng ứng dụng với ít nỗ lực nhất. Tính năng này sẽ giúp cho người phát triển ứng dụng nhận được các phản hồi sớm và thường xuyên. 

Khi mà chúng ta kết hợp thêm với tính năng Crashlytics trong ứng dụng của mình, chúng ta sẽ có thể nhận được các thống kê đo lường về sự ổn định của ứng dụng, giúp chúng ta có thể nhanh chóng đưa ra quyết định về thời điểm sẵn sàng cho việc phát hành ứng dụng.

Hiện tại Firebase hổ trợ 4 phương pháp để có thể phân phối bản test của ứng dụng đến đội ngũ kiểm tra chất lượng sản phẩm:
1. Sử dụng Firebase Console
2. Sử dụng Firebase CLI
3. Sử dụng fastlane
4. Sử dụng tích hợp với việc build Gradle trong Android Studio

Bài viết này xin giới thiệu về cách phân phối bản test qua Firebase Console, đây là các đơn giản nhất và không cần bất kì sự hiểu chỉnh nào trong mã nguồn của ứng dụng hiện tại cũng như có thể chủ động chọn bản build nào để gửi test.

# Sử dụng Firebase Console cho việc gửi test ứng dụng
Quá trình thực hiện sẽ gồm 2 bước chính:
## Bước 1: tạo ra bản build mới gửi đi kiểm thử
Khi chúng ta đã sẵn sàng cho việc kiểm thử, chúng ta cần tạo ra bản build để gửi đi. Việc này sẽ được thực hiện như bình thường lúc chúng ta phát triển sản phẩm. Điều cần chú ý là bản build của chúng ta phải được sign với 1 keystore có thể là debug keystore hoặc là release keystore.
## Bước 2: phân phối bản build đến đội ngũ kiểm thử 
### Bước 2.1
Truy cập vào trang https://console.firebase.google.com thông qua địa chỉ gmail của các bạn, và tiến hành tạo 1 project cho việc gửi tin nhắn bằng cách nhấn vào nút “Add project” và đặt tên cho project của các bạn, ở đây mình tạo thử một dự án có tên là “Firebase Notification Sample”

![](https://images.viblo.asia/85b9e3d2-f4a1-407a-860a-10954327192f.png)

Sau khi tạo xong hệ thống sẽ báo như hình bên dưới, chúng ta nhấn nút “Continue” để vào giao diện quản lý chính của Firebase cho ứng dụng mới tạo.

![](https://images.viblo.asia/db24c51d-d92a-4fae-bd21-17b97709d082.png)

### Bước 2.2
Tại thanh menu phía bên trái chúng ta chọn “App Distribution” và chấp nhận các điều khoản cho việc sử dụng tính năng này và nhấn nút "Get started"
![](https://images.viblo.asia/8c3c87a9-6368-43ee-926d-1a1dcfe751d2.PNG)

### Bước 2.3
Tại trang giao diện chính cho việc upload bản build ta chọn bản build cần upload từ nút "Browser"

![](https://images.viblo.asia/db18ef0f-bd51-4014-90a9-c6eb73e4c795.PNG)

Sau khi upload build thành công ta sẽ thấy giao diện bên dưới, tiến hành chọn nhóm tester cần thực test cho build của chúng ta, hoặc ta điền email của những người sẽ nhận được bản test.

![](https://images.viblo.asia/04e3b6f7-9604-4f5d-bf7b-0c654e255467.PNG)

Tiếp theo ta nhấn "Next" để đi đến màn hình điền các ghi chú hoặc thông tin liên quan đến bản build cần kiểm thử . Các thông tin này khi đội ngũ kiểm thử nhận được thông báo có app mới họ sẽ có thể nắm được thông tin bản build này thay đổi những ra sao có thêm chức năng mới hoặc sữa lỗi gì... 

![](https://images.viblo.asia/37a0cbf3-127d-4486-bcf5-5bd1b8ac0422.PNG)
 
Sau khi thực hiện xong ta nhấn nút "Distribute to..." để hệ thống tiến hành gửi thông báo đến những tester có thông tin với địa chỉ email đã chỉ định. Hệ thống sẽ thống kê cho biết số lượng người được mời, số người chấp nhận và số người tải bản thử nghiệm của chúng ta.

![](https://images.viblo.asia/5171d845-af6d-433e-abe8-6b3c8a610eef.PNG)

### Bước 2.4
Với những user có địa chỉ email được mời sẽ nhận được một email mời thử nghiệm sản phẩm và các bước hướng dẫn để tiến hành cài đặt bản thử nghiệm

![](https://images.viblo.asia/fb1f4672-143c-4200-8dfc-acbf05d7d1a7.PNG)

![](https://images.viblo.asia/98d3b954-7161-49a1-a409-65fc65710ac4.PNG)

Tiến hành như các bước như chỉ định chúng ta sẽ được chuyển tới trang để tiến hành các bước đăng nhập để  xác thực tài khoản và tiến hành cài đặt bản build, chúng ta cũng sẽ được khuyến khích cài đặt ứng dụng "Firebase App Tester" đã có thể quản lý các build cần test sau này và nhận được thông báo về các build mới

![](https://images.viblo.asia/110a2da1-aaf9-4269-92a9-f5342819d403.jpg)

Bài viết đến đây là hết, cảm ơn mọi người đã đọc :bow::bow::bow:

# Tham khảo
1. https://firebase.google.com/docs/app-distribution
2. https://firebase.google.com/docs/app-distribution/android/distribute-console