Firebase là một service được Google xây dựng, hỗ trợ chúng ta rất nhiều thứ trong quá trình xây dựng app: Từ authentication, realtime database, cloud storage cho đến Analytic và User tracking.
Hãy cùng thử ngâm cứu công cụ hữu ích này, và cách để thêm Firebase SDK vào app của mình nhé 

Trước tiên để sử dụng được công cụ này, bạn cần phải tạo một tài khoản firebase -> tạo mới một project . 
Sau đó bạn cần add firebase vào project của mình theo các bước như sau: 
1. Đến bảng điều khiển Firebase. 
2. Ở giữa trang tổng quan về dự án, nhấp vào biểu tượng iOS (plat_ios) để khởi chạy quy trình thiết lập. Nếu bạn đã thêm một ứng dụng vào dự án Firebase của mình, hãy nhấp vào Thêm ứng dụng để hiển thị các tùy chọn nền tảng. 
3. Nhập bundle id của  app bạn vào trường  iOS bundle .
4. Nhập các thông tin khác của app: App nick name và App store id
5. Chọn Register app.

Thêm file Firebase Configuration:
1. Ở mục trên bạn chọn Download GoogleService-Info.plist để tải file config
2. Kéo file vừa tải ở trên vào project 

Sau đó bạn cần install Firebase SDK vào app của mình bằng pod: 
Thêm những dòng sau vào pod file của bạn :
```
# Add the Firebase pod for Google Analytics
pod 'Firebase/Analytics'

# Add the pods for any other Firebase products you want to use in your app
# For example, to use Firebase Authentication and Cloud Firestore
pod 'Firebase/Auth'
pod 'Firebase/Firestore'
```

Sau đó chạy `pod install`

Trong App Delegate bạn hãy import thư viện Firebase
```
import Firebase
```

rồi thêm dòng code sau vào hàm application:didFinishLaunchingWithOptions:
```
FirebaseApp.configure()
```

Như vậy là bạn đã hoàn thành việc thêm Firebase SDK vào app của mình.