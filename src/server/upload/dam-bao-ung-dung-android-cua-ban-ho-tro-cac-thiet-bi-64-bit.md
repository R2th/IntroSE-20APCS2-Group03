# 1. Mở đầu
- Từ ngày 01 tháng 08 năm 2019. Các ứng dụng khi published trên Google Play sẽ cần phải support nền tảng 64-bit. 64-bit CPUs xử lý các tác vụ nhanh hơn nhằm tăng khả năng tương tác giữa user và thiết bị. Vậy việc thêm các phiên bản support cho nền tảng 64-bit sẽ cung cấp khả năng tối ưu, mở rộng khi có các tính năng mới.
- Vậy nền tảng 64-bit là gì? Nền tảng 64-bit là một bộ vi xử lý có size là 64 bits, như là một điều kiện cho các bộ nhớ và dữ liệu  ứng dụng vào các phần mềm có chiều sâu như xử lý đồ hoạ, hệ thống quản lý dữ liệu, các máy chủ v.vv..
- Lợi ích của vi xử lý 64-bit như là có thể tính toán phép tính toán nhanh hơn, truy cập vào các ô nhớ trên RAM nhiều hơn như là bạn dùng windows 32-bit thì chỉ hỗ trợ tối đa **3.5Gb** Ram, còn 64-bit thì lên tới **2^64 bytes**.

![](http://www.androidguys.com/wp-content/uploads/2015/07/pasted_image_at_2015_07_02_06_24_pm.png)

# 2. Đánh giá ứng dụng
- Nếu app của bạn chỉ viết bằng Java hoặc Kotlin, bao gồm các thư viện và SDKs, app của bạn đã sẵn sàng cho các thiết bị 64-bit. Nếu ứng dụng của bạn sử dụng native code, hoặc bạn không chắc chắn, bạn cần đánh giá lại app của bạn để sẵn sàng cho việc chỉnh sửa nhằm hỗ trợ các thiết bị 64-bit.

1. App của bạn chứa các native code?
- Sử dụng C/C++ (native) code trong app.
- Liên kết tới các thư viện từ bên thứ 3.
- Đc built bởi các phần mềm builder sử dụng thư viện native.

2. Tìm các thư viện native sử dụng APK Analyzer trong Android Studio
- [APK Analyzer](https://developer.android.com/studio/build/apk-analyzer) là công cụ cho phép đánh giá các khía cạnh khác nhau của bản built APK. Trong trường hợp này, chúng ta sẽ tìm tất cả các thư viện native và chắc chắn các thư viện 64-bit có mặt.
- Chọn như hình dưới đây

![](https://developer.android.com/distribute/best-practices/images/develop/64bit/image1.png)

- Tiếp theo chọn file APK bạn muốn phân tích.
- Nhìn vào folder **lib**, bạn sẽ tìm các '.so' file. Nếu không thấy chúng thì có nghĩa là app của bạn đã sẵn sàng hỗ trợ nền tàng 64-bit và không cần bận tâm gì nữa. Nếu bạn thấy **armeabi-v7a** hoặc **x86**, đó là các thư viện 32-bit.
- Nếu bạn không có thư viện **arm64-v8a** hoặc **x86_64**, bạn sẽ cần update quá trình build để bắt đầu build và đóng gói các thành phần trong APK.
- Nếu bạn thấy tất cả các thư viện đc đóng gói, bạn có thể bỏ qua bước này.

![](https://developer.android.com/distribute/best-practices/images/develop/64bit/image2.png)

- Ngoài ra có thể đổi file apk thành **.zip** rồi giải nén ra để kiểm tra. VD:

```
:: Command Line
> zipinfo -1 YOUR_APK_FILE.apk | grep \.so$
lib/armeabi-v7a/libmain.so
lib/armeabi-v7a/libmono.so
lib/armeabi-v7a/libunity.so
lib/arm64-v8a/libmain.so
lib/arm64-v8a/libmono.so
lib/arm64-v8a/libunity.so
```

# 3. Build app với các thư viện 64-bit
- Chỉnh sửa build.gradle như sau

```
apply plugin: 'com.android.app'

android {
   compileSdkVersion 27
   defaultConfig {
       appId "com.google.example.64bit"
       minSdkVersion 15
       targetSdkVersion 28
       versionCode 1
       versionName "1.0"
       ndk.abiFilters = 'armeabi-v7a' 'arm64-v8a' 'x86' 'x86_64'
// ...
```


# 4. Test ứng dụng trên các thiết bị 64-bit
- Phiên bản 64-bit của ứng dụng nên có chất lượng và tính năng giống như 32-bit. Test ứng dụng của bạn để đảm bảo những người dùng sở hữu các thiết bị 64-bit sẽ có một trải nhiệm tốt nhất.
- Hãy chắc chắn bạn sở hữu thiết bị 64-bit như Google's Pixel. Và cách tốt nhất là sử dụng adb, và sử dụng **--abi** như một param để chỉ ra thư viện nào được cài đặt tới thiết bị.

```
:: Command Line
# A successful install:
> adb install --abi armeabi-v7a YOUR_APK_FILE.apk
Success

# If your APK does not have the 64-bit libraries:
> adb install --abi arm64-v8a YOUR_APK_FILE.apk
adb: failed to install YOUR_APK_FILE.apk: Failure [INSTALL_FAILED_NO_MATCHING_ABIS: Failed to extract native libraries, res=-113]

# If your device does not support 64-bit, an emulator, for example:
> adb install --abi arm64-v8a YOUR_APK_FILE.apk
ABI arm64-v8a not supported on this device

```

# 5. Sẵn sàng 
- Khi bạn thấy ứng dụng đã sẵn sàng, bạn có thể đẩy ứng dụng lên Google Play.
- Ngoài ra có thể tìm hiểu thêm về cấu trúc vi xử lý 32-bit và 64-bit.

https://developer.android.com/distribute/best-practices/develop/64-bit#assess-your-app

https://android-developers.googleblog.com/2019/01/get-your-apps-ready-for-64-bit.html