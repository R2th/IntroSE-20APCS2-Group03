# Giới thiệu
Trong bài này, tôi sẽ đề cập đến việc phát triển ứng dụng nhỏ cho iOS và Android bằng cách sử dụng Kotlin Multiplatform dựa trên [moko-template](https://github.com/icerockdev/moko-template) .

**Công cụ**
Chúng ta sẽ cần:

-Android Studio 3.4.0+ (không sử dụng phiên bản 3.5.1, vì có lỗi đang phá vỡ dự án MPP);

-Xcode 10,3+;

-Công cụ dòng lệnh Xcode (xcode-select --install);

-CocoaPods (sudo gem cài đặt cocoapods);

-JDK

**Kết quả**

Theo kết quả của các bài học về GiphyApp, bạn sẽ nhận được một ứng dụng để xem các tệp gif bằng API GIPHY.
Giao diện người dùng của ứng dụng này sẽ hoàn toàn tự nhiên, trình phát tệp gif sẽ giúp sử dụng các thư viện gốc lướt qua Android và SwiftyGif cho iOS.
# Tạo project  dựa trên mẫu moko
Để tạo, chúng ta sẽ sử dụng template dự án từ moko.
Mẫu dự án đã có sẵn các bản dựng sẵn của ứng dụng iOS và Andoroid với thư viện dùng chung và bạn sẽ tiết kiệm thời gian để tích hợp thư viện chia sẻ vào dự án iOS trên nền tảng iOS, để định cấu hình các mô-đun và phụ thuộc đa nền tảng của Kotlin (sử dụng [mobile-multiplatform-gradle-plugin](https://github.com/icerockdev/mobile-multiplatform-gradle-plugin), bạn có thể làm cho cấu hình đơn giản hơn).

Để sử dụng template này, bạn phải truy cập [moko-template](https://github.com/icerockdev/moko-template) và nhấn nút màu xanh lục **Sử dụng template này**. Kết quả là, bạn tạo một kho lưu trữ mới theo commit  cuối cùng của branch master của dự án moko-template.

Sau khi tạo thành công, bạn nên clone rep này: git clone <git url của repo>.

# Test build
Để chắc chắn rằng trạng thái bắt đầu là chính xác,ta sẽ chạy cả hai ứng dụng. Để làm điều này:

trên Android: mở thư mục kho lưu trữ gốc trong Android Studio, đợi trong khi Gradle Sync sẽ kết thúc và chạy ứng dụng Android như ứng dụng thông thường.

trên iOS: cài đặt dự án CacaoPPPs (trong thư mục ios-app chạy lệnh cài đặt pod và sau khi mở ios-app / ios-app.xcworkspace này trong Xcode và nhấn Run để chạy ứng dụng.
Việc build Kotlin / Native có thể mất một thời gian (nó sẽ tự động bắt đầu khi thực hiện *pod install* cũng như build dự án iOS).

# Thiết lập Appliсation Id
Bạn có thể đặt application id giống như bạn làm trong ứng dụng Android và iOS thông thường:

**Thay đổi Appliсation Id**

Android - trong file android-app / build.gradle.kts cần thay đổi:

```
android {
    ...

    defaultConfig {
        ...
        
        applicationId = "dev.icerock.codelab.giphy"
        ...
    }
}
```

iOS - bạn phải đặt Bundle Id trong cài đặt của dự án Xcode như trên ảnh chụp màn hình bên dưới:
![](https://miro.medium.com/max/1922/1*ulYPNc7ryGswrVOAXePkXA.png)

**Thay đổi Appliсation Name**

Android - trong file android-app/src/main/res/values/strings.xml thay đổi:
```
<resources>
    <string name="app_name">Giphy App</string>
    ...
</resources>
```

iOS - bạn phải đặt Tên hiển thị trong cài đặt của dự án trong Xcode như trên ảnh chụp màn hình bên dưới:
![](https://miro.medium.com/max/1906/1*1Ualyl7IPXysNU78vZoQ9Q.png)

**Thay đổi icon ứng dụng**

Bạn có thể tải tài nguyên của biểu tượng [ở đây](https://codelabs.kmp.icerock.dev/codelabs/giphy-app-1/assets/giphy-1-icons.zip).

Để thay đổi biểu tượng Android, bạn phải di chuyển nội dung thư mục android của kho lưu trữ này trong thư mục android-app/src/main/res. Sau đó, bạn cần đặt icon này trong android-app/src/main/AndroidManifest.xml:
```
<manifest>
    <application
        ...
        android:icon="@mipmap/ic_launcher">
        ...
    </application>
</manifest>
```
Để thay đổi biểu tượng trên iOS, bạn phải thay thế thư mục ios-app/src /Assets.xcassets/AppIcon.appiconset bằng phiên bản của kho lưu trữ.

**Thay đổi màn hình khởi chạy**

Có một màn hình launch trên iOS và để thay thế nó, bạn phải sửa đổi tệp *ios-app/src/Resources/LaunchScreen.storyboard*. 

Ví dụ: thay đổi text như trên ảnh chụp màn hình:
![](https://miro.medium.com/max/3024/1*uMtkzzr_m5Ub9aKRmlUUHw.png)

# Các bước tiếp theo
Trong bài học tiếp theo [GiphyApp # 2](https://medium.com/@icerock/creating-a-simple-kotlin-multiplatform-project-based-on-moko-template-part-2-4444ca710709), chúng tôi sẽ tạo một Gif list.

Nguồn : https://medium.com/@icerock/creating-a-simple-kotlin-multiplatform-project-based-on-moko-template-2dd87d020bbd