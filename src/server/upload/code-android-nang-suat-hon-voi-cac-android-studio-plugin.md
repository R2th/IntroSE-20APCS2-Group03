# 1. Mở đầu
- Android Studio là một IDE vô cùng mạnh mẽ, nó bao gồm một giao diện đơn giản và linh hoạt cho việc thiết kế UI cho các loại thiết bị. Ta có thể kéo thả các view và widgets trong layout editor và customise chúng với một vài dòng xml. Nhưng ta vẫn luôn muốn nhiều hơn thế, để có thể làm việc hàng ngày năng suất và có hiệu quả hơn.
 Vậy cái gì làm chúng ta năng suất hơn?
* Viết các dòng code dài hoặc lặp lại với chỉ một vài phím.
* Debug và thống kê code của bạn nhanh hơn.

# 2. Một số plugin phổ biến
**Code generator**

1. **[MVP Generator](https://plugins.jetbrains.com/plugin/9784-generate-m-v-p-code)**:
Cài đặt plugin này và generate Android MVP của bạn. Nhấn phím (⌘ + N) và chọn GenerateMVP. Có một số MVP-plugins có sẵn tốt hơn để thử nghiệm với chúng để chọn sao cho phù hợp với nhu cầu của bạn. Hãy nhớ một số mã được tạo tự động này có thể thêm mã cho các thư viện như Dagger hoặc RxJava để thêm tương ứng vào gradle.

2. **[DTOnator](https://github.com/nvinayshetty/DTOnator)**:
Tất cả các ứng dụng android sử dụng JSON để giao tiếp với server. Chúng ra có thể tạo POJO từ JSONs, plugin này có thể triển khai POJO trong android IDE.

3. **[GsonFormat](https://plugins.jetbrains.com/plugin/7654-gsonformat)**:
Convert JSON thành class InnerClassEntity
![](https://plugins.jetbrains.com/files/7654/screenshot_15729.png)

**UI plugins**
1. **[Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui)**: 
Android studio có hai chủ đề có sẵn Default và Dracula. Nếu bạn muốn sử dụng material theme bạn nên dùng plugin này.
![](https://plugins.jetbrains.com/files/8006/screenshot_17529.png)
2.  **[CodeGlance](https://github.com/Vektah/CodeGlance)**: Cái này dùng để customise colors các syntax highlighting.
![](https://camo.githubusercontent.com/d25bcf62d90bfee3308428a4836afe32d347934d/68747470733a2f2f7261772e6769746875622e636f6d2f56656b7461682f436f6465476c616e63652f6d61737465722f7075622f6578616d706c652e706e67)
3. **[Android DPI Calculator](https://plugins.jetbrains.com/plugin/7832-android-dpi-calculator)**: 
Cho phép bạn tính toán các kích thước khác nhau trong tất cả các densities mặc định có sẵn trên nền tảng Android, VD: xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi và tvdpi.
![](https://plugins.jetbrains.com/files/7832/screenshot_15115.png)

**Debugging**
1. **[JVM Debugger Memory View](https://plugins.jetbrains.com/plugin/8537-jvm-debugger-memory-view)**: 
Plugin này mở rộng trình debug JVM được tích hợp sẵn với các khả năng khám phá các đối tượng trong vùng heap JVM trong một phiên debug. The Memory View cho bạn thấy tổng số đối tượng trong heap được nhóm theo tên lớp của họ.
![](https://plugins.jetbrains.com/files/8537/screenshot_16351.png)

**Utilities**
1. **[Folding PLugin](https://github.com/dmytrodanylyk/folding-plugin)**: Plugin này sẽ hiển thị dạng group file vào các folder theo category trong project strucutre mà không di chuyển hay khởi tạo folder.
![](https://github.com/dmytrodanylyk/folding-plugin/raw/master/screenshots/Preview.png)
2. **[Android Wifi ADB](https://github.com/pedrovgs/AndroidWiFiADB)**: Android wifi ADB giúp bạn cài đặt, chạy và debug APK android qua wifi. Khỏi lo phải mang theo cáp USB.
![](https://github.com/pedrovgs/AndroidWiFiADB/raw/master/art/android_devices_window.png)
3. **[.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)**:
Plugin đơn giản giúp chúng ta ignore các file cần một cách đơn giản nhất
![](https://plugins.jetbrains.com/files/7495/screenshot_14959.png)

# 3. Tham khảo
- Ngoài ra các bạn có thể tham khảo thêm plugin phục vụ cho nhu cầu của bạn tại trang chủ của Jetbrain
[Jetbrain Plugin](https://plugins.jetbrains.com/androidstudio)
- Mục đích cuối cùng của chúng ta là tăng hiệu suất cho công việc, chúc các bạn tìm được các plugin phù hợp hoặc các cách khác có thể tăng hiệu suất cho công việc. Thanks for reading ^^