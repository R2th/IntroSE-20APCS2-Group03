![](https://images.viblo.asia/af0afb21-9177-484c-80ce-30e94d14b1f8.jpg)

Ở bài trước mình đả giới thiệu rất kỹ về các bước đưa ứng dụng lên công cụ test của apple , một công cụ rất hữu ích cho các lập trình cũng như tiện lợi cho tester . Sau bài viết đó thì đôi phần các bạn đả làm quen được với cách build một ứng dụng và cách thiết lập đến apple account .  Nó giúp bạn thiết lập tài khoản nhà phát triển, tạo chứng chỉ và hồ sơ, v.v. 

Bạn có thể xem lại để biết cách gửi một ứng dụng gốc đến cửa hàng ứng dụng như thế nào . Đó là những phạm vi của bài hôm trước, còn bây giờ mình sẽ giới thiệu đến bạn một số bước cần thực hiện để xuất bản ứng dụng React Native build release lên App Store của iOS.

# IV. Deploy AppStore

## 1. Xóa localhost khỏi info.plist

Đầu tiên chúng ta cần loại bỏ ngoại lệ localhost khỏi info.plist. Theo mặc định, tất cả lưu lượng truy cập qua HTTP bị từ chối kể từ iOS 9 với App Transport Security. React Native đã thêm một ngoại lệ vào localhost để giúp phát triển dễ dàng hơn.

Mở thông tin của file **info.plist** và mở rộng  **App Transport Security settings**  đến phần **Exception Domains** . Dưới đó bạn sẽ tìm thấy mục localhost . Xóa nó.

![](https://images.viblo.asia/14f40bdd-48ac-470b-b96d-f43f03f8d4fb.png)
## 2. Tạo release scheme

Khi xây dựng một ứng dụng để phát hành Menu React Native Developer sẽ phải tắt.

![](https://images.viblo.asia/679d8b94-6972-4061-9863-694e1c960e66.png)

Các tệp Javascript chúng ta đã tạo cho ứng dụng của mình sẽ được đóng gói và đặt cục bộ trong ứng dụng để chúng ta có thể kiểm tra mà không cần kết nối với máy tính.

Chuyển đến **Product -> Scheme -> Edit Scheme** lược đồ trong XCode. Chọn tab **Run** và đặt menu thả xuống Cấu hình xây dựng thành Phát hành.

![](https://images.viblo.asia/53d620fb-03f8-4f60-8652-72c81277ecdc.png)

Sao đó chọn mục release 

![](https://images.viblo.asia/406d4406-681f-47da-952e-5bb0cb552c91.png)
## 3.Mẹo chuyên nghiệp
Khi Gói ứng dụng của bạn tăng kích thước, bạn có thể bắt đầu thấy màn hình trắng giữa các màn hình bị giật lắc và màn hình hiển thị ứng dụng gốc của bạn cũng vậy . Nếu đây là trường hợp mà bạn gặp phải, bạn có thể thêm mã sau vào đây **AppDelegate.m** để giữ cho màn hình giật lắc của bạn được hiển thị tốt trong quá trình chuyển đổi.
> ```JS
>   // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
>   UIView* launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
>   launchScreenView.frame = self.window.bounds;
>   rootView.loadingView = launchScreenView;
> ```

Gói tĩnh được xây dựng mỗi khi bạn nhắm mục tiêu một thiết bị vật lý, ngay cả trong Debug. Nếu bạn muốn tiết kiệm thời gian, hãy tắt việc tạo gói trong Gỡ lỗi bằng cách thêm đoạn mã sau vào tập lệnh shell của bạn trong Giai đoạn xây dựng Xcode Bundle React Native code and images:

> ```JS
>  if [ "${CONFIGURATION}" == "Debug" ]; then
>   export SKIP_BUNDLING=true
>  fi
> ```
## 4. Xây dựng ứng dụng với sơ đồ phát hành
Chọn **Product → Build** từ XCode hoặc xây dựng ứng dụng từ dòng lệnh bằng lệnh này:


> `react-native run-ios --configuration Release`

Cuối cùng việc còn lại là bạn cung cấp thông tin ở trên apple account của bạn để có thể submit app lên store. 
Việc apple review như thế nào, các vấn đề kiểm duyệt ra làm sao thì mình hẹn các bạn ở một bài sau nhé. Nếu hay và cảm thấy bài viết hữu dụng thì upvote cho mình để có động lực viết bài tiếp theo hữu ích hơn. 

## 5. Tài liệu

Để hiểu thêm về điều này, bạn có thể xem Tài liệu gốc React

Cảm ơn bạn đón đọc tất cả các bài viết của mình về cách deploy ứng dụng react native. 

Chờ đón mình trong các tut chia sẽ sau ạ. Thank :heart_eyes::heart_eyes::heart_eyes: