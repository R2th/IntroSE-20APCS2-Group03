Ngày 22.5.2018 thì cocos2dx phiên bản 3.17 chính thức được phát hành. Phiên bản này tập trung vào tính ổn định và hiệu suất tăng lên với một số cải tiến nâng cao, giúp cho việc phát triển đa nền tảng trở nên dễ dàng hơn.
Sau đây là những điểm mới trong phiên bản cocos2dx 3.17

## Yêu cầu Android
v3.17 đã được thử nghiệm bằng cách sử dụng Android Studio (3.0, 3.1, 3.1.1) với NDK r16

## Hỗ trợ thêm cho iPhone X
3.17  hỗ trợ cho iPhone X bao gồm hỗ trợ chế độ toàn màn hình, sử dụng UIStoryboards để khởi chạy hình ảnh,safe area API  và hỗ trợ tự động ẩn Home indicator:
![](https://images.viblo.asia/8da40bbc-3e3d-4949-8438-27718e5c546b.png)
 Lập trình viên có thể nhận được **safe area** một cách dễ dàng bằng cách gọi: Director::getSafeAreaRect().
##  Hỗ trợ thêm Android Studio 3.0+
Android Studio là IDE chính thức duy nhất cho hệ điều hành Android của Google. 
Cocos2d-x hỗ trợ Android Studio sử dụng phiên bản NDK r16. Cấu hình Gradle đã được cập nhật, bao gồm đơn giản hóa các giá trị Gradle PROP_*
## CMake hiện được hỗ trợ trên tất cả các nền tảng
CMake hiện được hỗ trợ trên tất cả các nền tảng, bao gồm Android (NDK), iOS, macOS, Windows (trình biên dịch VC ++), Linux. Hỗ trợ các thư viện biên dịch trước cho engine và tái sử dụng các thư viện biên dịch sẵn trong quá trình xây dựng mới. Dự án của bạn xây dựng thời gian sẽ được giảm đáng kể.
## Nâng cấp thư viện của bên thứ ba
Spine skeleton animation được sử dụng rộng rãi trong các trò chơi được phát triển bởi Cocos2d-x. Spine đã được nâng cấp nên phiên bản 3.6.39;
GLFW đã được nâng cấp lên 3.2.1 để giúp sửa chữa các vấn đề cần điều khiển. Bạn cũng có thể sử dụng GLFW như một thư viện biên dịch trước.

Box2D cũng đã được cập nhật theo bản mới nhất trên github trong phiên bản mới này.
## Loại bỏ những thành phần lỗi thời
Google chính thức ngừng hỗ trợ  Android SDK Tools 25.3.0 14 . Kiến trúc mặc định được thay đổi từ armeabi thành armeabi-v7a.

Visual Studio 2013 đã ngừng hỗ trợ. Visual Studio 2015/2017 hiện vẫn được hỗ trợ. Các tệp dự án win32 hiện phù hợp cho năm 2015. Để sử dụng năm 2017, bạn có thể mở tệp dự án năm 2015, sửa đổi cấu hình cho phù hợp với nhu cầu của bạn hoặc sử dụng CMake (Xem ở trên).