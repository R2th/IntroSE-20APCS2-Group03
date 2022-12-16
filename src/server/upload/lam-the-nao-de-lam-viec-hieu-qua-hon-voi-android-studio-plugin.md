Android studio là một công cụ rất mạnh mẽ. Nó có giao diện đơn giản và linh hoạt nhất để thiết kế giao diện người dùng cho tất cả các loại thiết bị. Chúng ta có thể kéo và thả các chế độ xem và tiện ích trong trình chỉnh sửa layout của mình và tùy chỉnh nó thành các chi tiết nhỏ với một vài dòng xml. Nó có các công cụ tốt  để chỉnh sửa mã, gỡ lỗi và cấu hình hiệu năng tất cả với chi phí bằng không. Nhưng chúng ta vẫn muốn nhiều hơn để có năng suất cao hơn trong công việc.
### Điều gì tạo lên hiệu suất
* Viết được nhiều code hơn chỉ với ít thao tác và công sức
* Có thể debug và duyệt code nhanh hơn.
Theo quan điểm của tôi thì để hiểu được IDE tốt hơn thì nó sẽ giúp bạn làm việc hiệu quả hơn. Android Studio có rất nhiều plugin hỗ trợ công việc của lập trình viên.
Để cài đặt thêm plugin thì bạn vào theo đường dẫn ***Preferences -> Plugins***

![](https://images.viblo.asia/76851548-4c09-4636-bcef-446c3444688c.png)
## Latest plugin
### 1. [Flutter](https://github.com/flutter/flutter-intellij)
Là một plugin cho việc phát triển cross-platform cho thiết bị Android và iOS. Nếu bạn đang là người làm flutter thì chắc hẳn k còn lạ lẫm nữa phải không
![](https://user-images.githubusercontent.com/919717/28131204-0f8c3cda-66ee-11e7-9428-6a0513eac75d.gif)
## Code generators
### 1. [MVP generator](https://plugins.jetbrains.com/plugin/9784-generate-m-v-p-code)
Cài đặt plugin này và tạo mã android MVP của bạn. Nhấn phím (⌘ + N) và chọn GenerateMVP. Có một số plugin MVP có sẵn tốt hơn để thử nghiệm chúng để chọn nhu cầu của bạn. Hãy ghi nhớ một số mã được tạo tự động này có thể thêm mã cho các thư viện như Dagger hoặc RxJava để thêm phụ thuộc tương ứng vào các file lớp.
### 2. [Parcelable generator](https://github.com/mcharmas/android-parcelable-intellij-plugin)
Parcelable là kiểu implement của Android từ java Serializable dùng để đóng gói đối tượng truyền gửi trong ứng dụng Android có tốc độ cao hơn Serializable. Bạn có thể cài đặt plugin này, sau đó nhấn ((⌘ + N) để mở cửa sổ bật lên để tạo mã, nơi bạn có thể chọn Parcelable. Nó cũng cho phép bạn chọn các field sẽ được phân chia.
### 3. [DTOnator](https://github.com/nvinayshetty/DTOnator)
Tất cả các ứng dụng Android đều sử dụng JSON để liên lạc. JSON là định dạng trao đổi dữ liệu nhẹ và ưa thích trên thiết bị di động.  Plugin có tác dụng sinh ra đối tượng POJO từ một định dạng file JSON
### 4. [ButterKnifeZelezny](https://github.com/avast/android-butterknife-zelezny)
Plug-in dùng để sinh ra ButterKnife injections từ những file layout xml được lựa chọn
### 5.[ Android Selectors Generate](https://github.com/inmite/android-selector-chapek)
Tự động sinh ra drawble selector từ các Android resource
## UI Plugins
### 1. [Material Theme UI EAP](https://plugins.jetbrains.com/plugin/9377-material-theme-ui-eap)
Android Studio có sẵn theme Default và Dracula, nếu bạn muốn material theme  thì vào dùng nó.
![](https://images.viblo.asia/10bd2e03-b399-4670-b2b1-9b263859e692.gif)
### 2. [CodeGlance](https://github.com/Vektah/CodeGlance)
Nhúng mini map vào trong code như Sublime text để dễ nhìn tổng thể file code của bạn
![](https://images.viblo.asia/af5ee0ad-1803-4b3d-81b7-fec606bcb1e9.png)
### 3. [Advanced Java Folding](https://plugins.jetbrains.com/plugin/9320-advanced-java-folding)
Tùy chọn việc hiển thị folder để tăng khả năng đọc bằng cách ẩn bớt những thứ không quan trọng trong dự án. Java 8 cũng đã giới thiệu lamda cũng giúp cho code trở nên ngắn gọn và sạch sẽ hơn.
### 4. [Android DPI Calculator](https://plugins.jetbrains.com/plugin/7832-android-dpi-calculator)
DPI calculator cho phép tính toán các size khác nhau trong Android platform xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi and tvdpi.
## Debugging
### 1. [JVM Debugger Memory view](https://plugins.jetbrains.com/plugin/8537-jvm-debugger-memory-view)
Một plugin hữu dụng và tiện ích cho việc quản lí bộ nhớ ứng dụng. 
### 2. [JRebel for Android](https://plugins.jetbrains.com/plugin/7936-jrebel-for-android)
Plugin này hoạt động tương tự như tính năng chạy Google Instant Instant trong  android studio. Để tiết kiệm thời gian cài đặt và xây dựng, họ sử dụng trao đổi mã và tài nguyên nóng, lạnh và lạnh, về cơ bản chỉ áp dụng các bản vá cho các thay đổi mới thay vì cài đặt lại APK hoàn chỉnh.
### 3. [Android Resource Usage Count](https://github.com/niorgai/Android-Resource-Usage-Count)
Plugin này tự động đếm việc sử dụng tài nguyên và hiển thị nó ở dải bên trái của mỗi dòng trong studio android của bạn. Rất tiện dụng nếu bạn muốn loại bỏ các tài nguyên không được sử dụng trong dự án của bạn nữa.
## Utilities
### 1. [BIU](https://plugins.jetbrains.com/plugin/9788-biu)
BIU là một công cụ nén ảnh PNG từng cái một hoặc một số lượng lớn. Nó được cung cấp bởi thư viện pngquant nổi tiếng và API từ tinypng.
> Nếu bạn làm việc với ứng dụng có minsdkversion ≥ 18 thì bạn có thể convert ảnh thành WebP để dung lượng APK có thể giảm đi đáng kể
![](https://images.viblo.asia/f69e9ddb-0c43-4424-9b38-0c4f9aa7596b.png)
### 2. [Folding Plugin](https://github.com/dmytrodanylyk/folding-plugin)
Một Plugin cũng vô cùng hữu dựng cho Android Development. Có thể hiển thị file của bạn như 1 nhóm các folder khác nhau view cấu trúc dự án. Điểm lợi thế của plugin này là không tạo ra folder và move file.
![](https://images.viblo.asia/35c787cd-3f14-4232-94eb-c7d57c1ad16e.png)
### 3. [GitIgnore](https://github.com/hsz/idea-gitignore)
Bạn không thể bỏ quả plugin này vì nó sẽ giúp bạn tự động ignore những build file, những file tự sinh ra và IDE cache file...
### 4. [AndroidLocalizationer](https://github.com/westlinkin/AndroidLocalizationer)
Tool giúp bạn dễ dàng convert string resource sang các ngôn ngữ khác. Cài đặt nó và click right vào file string và chọn "Convert to other language" và chọn ngôn ngữ mà bạn muốn.

![](https://images.viblo.asia/ef677343-b42d-4f3d-bade-f710880f1849.png)
![](https://images.viblo.asia/4cce5f4b-1c28-48b5-ab8e-4e3ae7b2bb4e.png)
### 5. [Android Wifi ADB](https://github.com/pedrovgs/AndroidWiFiADB)
Công cụ giúp ta có thể debug ứng dụng qua Wifi, rất tiện lợi khi không phải dùng cable, tuy nhiên hãy đảm bảo kết nối wifi của bạn phải thật tốt thì việc debug mới hiệu quả được

Trên đây là một số plugin khá cơ bản nhưng lại mang lại rất nhiều lợi ích cho lập trình viên, bản thân tôi khi làm việc cũng cài khá nhiều plugin để thuận tiện cho công việc, không mất quá nhiều thời gian vào những thứ tưởng chừng như đơn giản nhưng lại lấy đi của chúng ta khá nhiều thời gian.
![](https://images.viblo.asia/00ec2e78-f3cb-4da2-88d5-6224fb08fed7.gif)
![](https://images.viblo.asia/0323ea8e-8b0d-4bf1-a521-0eca349ee0fb.png)

Tham khảo [How to become more productive in android with android studio plugins](https://medium.com/mindorks/how-to-become-more-productive-in-android-with-android-studio-plugins-3beb3861fa7)