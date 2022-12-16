Theo như thông báo của Android 

Bắt đầu từ ngày 1 tháng 8 năm 2019, các ứng dụng  được public trên Google Play sẽ cần hỗ trợ  kiến trúc 64 bit. Do CPU 64 bit mang lại trải nghiệm nhanh hơn, phong phú hơn cho người dùng . Việc thêm phiên bản 64 bit của ứng dụng sẽ cung cấp các cải tiến về hiệu suất và

Bài viết này sẽ giải thích các bước bạn có thể thực hiện  để đảm bảo rằng ứng dụng 32 bit của bạn đã sẵn sàng hỗ trợ các thiết bị 64 bit.
### 1. Đánh giá ứng dụng của bạn 
Nếu ứng dụng của bạn chỉ sử dụng mã được viết bằng  Java hoặc Kotlin thì  ứng dụng của bạn đã sẵn sàng cho các thiết bị 64 bit. 

Ngược lại nếu bạn không chắc ứng dụng của mình có support  kiến trúc 64 bit bạn có thể kiểm tra theo các bước dưới đây 

Điều đầu tiên cần làm là kiểm tra xem ứng dụng của bạn có sử dụng bất kỳ code native nào không. 

  + Sử dụng bất code C / C ++  nào trong ứng dụng của bạn.
  + Liên kết với bất kỳ thư viện riêng của bên thứ ba.
  + Được build bởi third-party app dùng native libraries.
  
  
  Đối với kiến trúc ARM, các thư viện 32 bit được đặt trong `armeabi-v7a`. 
  
  Tương đương 64 bit là `arm64-v8a.`

Đối với kiến trúc x86, x86 cho 32 bit và x86_64 cho 64 bit ( kiến trúc này hiện chỉ có trên các device simulator , device thật chỉ chiếm tỉ lệ rất ít nên các bạn cũng không cần quan tâm nhiều đến kiến trúc này ) 

Tiếp theo bạn có thể check trực tiếp bằng [APK Analyzer](https://developer.android.com/studio/build/apk-analyzer) trong Android Studio

1 ) Mở Android Studio, 

2 ) chọn  Build > Analyze APK…


![](https://images.viblo.asia/251ae47d-4500-4b4c-a1da-6d012cc3ceea.png)
3 ) Chọn  APK you muốn đánh giá

4 ) Trong thư mục `lib`, nơi bạn sẽ tìm thấy bất kỳ tệp `'.so' `nào. 

Nếu bạn không thể tìm thấy bất kỳ tệp '.so' nào thì chúc mừng ứng dụng của bạn đã sẵn sàng và không cần đọc tiếp bài này. 

Ngược lại nếu bạn thấy `armeabi-v7a` hoặc `x86`, thì ứng dụng của bạn chỉ có thư viện 32bit. Bạn cẩn update để ứng dụng của bạn support device 64bit ( Xem bên dưới )

Nếu bạn thấy có cả `arm64-v8a` trong thư mục `lib` thì điều đó chứng tỏ ứng dụng của bạn đã support device 64bit .Và bạn không cần phải update thêm gì cả .

![](https://images.viblo.asia/84ab0290-9648-4b6c-96ad-4c252a575729.png)

Ví dụ như ảnh trên không có `arm64-v8a` trong thư mục `lib`  vì thế ứng dụng của bạn chưa support device 64bit 

### 2. Update APK support device 64bit

Hầu hết các dự án Android Studio đều sử dụng Gradle làm hệ thống build cơ bản. 
Việc kích hoạt các bản dựng cho code của bạn cũng đơn giản như thêm arm64-v8a và / hoặc x86_64, tùy thuộc vào (các) kiến trúc bạn muốn hỗ trợ, vào cài đặt `ndk.abiFilters` trong tệp `'build.gradle'` của ứng dụng của bạn:
thêm đoạn code sau : 
```
 ndk.abiFilters 'armeabi-v7a','arm64-v8a','x86','x86_64'
```
Cụ thể sẽ như thế này 
```
 // app.build.gradle
apply plugin: 'com.android.app'

android {
   compileSdkVersion 27
   defaultConfig {
       appId "com.google.example.64bit"
       minSdkVersion 15
       targetSdkVersion 28
       versionCode 1
       versionName "1.0"
       ndk.abiFilters 'armeabi-v7a','arm64-v8a','x86','x86_64'
// ...
```
Tiếp theo , vẫn trong file build.gradle đó 
thêm đoạn code 
```
splits {
        abi {
            enable false
            reset()
            include 'armeabi-v7a', 'arm64-v8a'
        }
    }
```
Bạn có thế `include` thêm` 'x86','x86_64'` nếu muốn build app trên device simulator

Cuối cùng syn lại` build.gradle ` , rebuild lại project sẽ generate file APK support device 64bit 

Để đảm bảo các bước trên của bạn đã đúng bạn có thể kiểm tra lại theo như hướng dẫn dưới đây 
## 3 . Kiếm tra 

1 ) File APK sau khi generate ra sẽ có dung lượng lớn hơn file APK ban đầu chưa support device 64 bit

2 ) Thực hiện lại các bước  APK Analyzer ở phần 1 , bạn sẽ thấy có thêm `arm64-v8a` trong thư mục lib

3 ) Dùng câu lênh command line để kiếm tra  
  Bạn build file APK vừa generate trên vào device 64 bit

  NOTE: Để kiểm tra xem device của bạn có phải 64 bit k bạn có thể check [tại đây](https://diarium.usal.es/pmgallardo/2018/10/31/how-to-check-if-your-android-phone-or-tablet-is-32-bit-or-64-bit/)
  
  Run command : 
  
  `adb install --abi arm64-v8a YOUR_APK_FILE.apk`
   
  kết quả `Success` thì ứng dụng của bạn đã được support device 64bit 
  
  
  Bài viết của mình đến đây là hết cảm ơn các bạn đã theo dõi !
  
  Ref : https://developer.android.com/distribute/best-practices/develop/64-bit