Sau gần sáu tháng phát triển thì **Android Studio 3.4** đã được **Google** phát hành và có thể được [tải](https://developer.android.com/studio/) cũng như sử dụng một cách ổn định từ 17/04/2019. Đây là một cột mốc quan trọng cho **Project Marble** từ phía nhóm phát triển Android Studio. Ngoài nhiều cải tiến về hiệu năng và sửa các lỗi trong Android Studio 3.4, Google còn cung cấp cho các lập trình viên một số tính năng mới tập trung chủ yếu vào quy trình làm việc để xây dựng ứng dụng và quản lý tài nguyên.
<br><br>
Một phần nhiệm vụ của **Project Marble** là giải quyết các vấn đề mà người dùng phải đối mặt khi làm việc với các tính năng chính của Android Studio. Đứng đầu trong danh sách các vấn đề cho Android Studio 3.4 là tính năng **Project Structure Dialog (PSD)**, cụ thể đây là một giao diện người dùng sử dụng cho mục đích quản lý các `dependencies` trong tập tin `Gradle`. Ngoài ra, **R8** sẽ được sử dụng một cách mặc định để thay thế cho **Proguard** trong việc `shrink` (quá trình loại bỏ các đoạn mã dư thừa, không được sử dụng) và `obfuscate` (quá trình làm mờ mã nguồn, khiến cho việc đọc mã khó khăn cho người thường) mã nguồn. Để hỗ trợ cho việc thiết kế ứng dụng, Google đã tạo ra một công cụ quản lý tài nguyên cho phép chúng ta có thể xem trước và quản lý tài nguyên (như `drawable`) trong dự án. Cuối cùng, Google cung cấp một phiên bản **Android Emulator** sử dụng ít tài nguyên hệ thống hơn và hỗ trợ cả [Android Q Beta](https://android-developers.googleblog.com/2019/04/android-q-beta-2-update.html). Tổng quan chung, các tính năng mới được tạo ra sẽ giúp chúng ta làm việc dễ dàng và hiệu quả hơn khi phát triển ứng dụng.
<br><br>
Cùng với phiên bản `stable release` Android Studio 3.4, nhóm phát triển từ Google còn phát hành các blog về việc họ đã điều tra và sửa một loạt các vấn đề của Project Marble như thế nào. Bạn có thể xem chúng ở đây:
* [Project Marble: Áp dụng các thay đổi](https://medium.com/androiddevelopers/android-studio-project-marble-apply-changes-e3048662e8cd)
* [Cải thiện thời gian build ứng dụng trong Android Studio ](https://medium.com/androiddevelopers/improving-build-speed-in-android-studio-3e1425274837)
* [Android Emulator: Các cải thiện của Project Marble](https://medium.com/androiddevelopers/android-emulator-project-marble-improvements-1175a934941e)
* [Android Studio Project Marble: Hiệu năng của Lint](https://medium.com/androiddevelopers/android-studio-project-marble-lint-performance-8baedbff2521)

Quá trình phát triển Project Marble vẫn đang tiếp diễn, nhưng phiên bản cập nhật lần này tích hợp các tính năng mới và sửa hơn 300 lỗi cũng như các cải tiến về sự ổn định mà bạn không muốn bỏ lỡ. Sau đây chúng ta cùng đi vào chi tiết các cập nhật lần này của Android Studio 3.4 nhé.

# Develop
### Resource Manager
Nếu các bạn đã làm việc quen với Android Studio thì hẳn sẽ nhận thấy rằng việc quản lý các tài nguyên (như `drawble` chẳng hạn) khá là rườm rà và tạo trải nghiệm không tốt, đặc biệt là độ phức tạp của ứng dụng ngày càng tăng nữa. **Resource Manager** là một công cụ mới có thể hình tượng hóa các tài nguyên `drawble`, `color` hay các `layout` trong dự án của bạn. Ngoài khả năng này, giao diện điều khiển của RM còn hỗ trợ kéo thả để `import` một số lượng lớn tài nguyên, và đặc biệt là khả năng chuyển đổi **SVG** thành **VectorDrawable**. Từ nay bạn có thể dễ dàng `import` các tài nguyên nhận được từ nhóm thiết kế và có cái nhìn tổng quan hơn về cái tài nguyên hiện có trong dự án với công cụ Resource Manager này. 

![](https://images.viblo.asia/c2f889b4-7832-4ee5-902f-304e17a2643f.gif)

### Import Intentions
Khi bạn làm việc với các thư viện **Jetpack** và **Firebase** mới, Android Studio 3.4 sẽ nhận biết các `class` thông dụng trong các thư viện này và gợi cho bạn thông qua `code intentions`, thêm vào các `import` hay `dependency` cần thiết trong `Gradle`. Cải tiến này có thể tiết kiệm cho bạn rất nhiều thời gian vì nó giúp bạn không cần phải "ngắt mạch cảm xúc" của mình khi code và đi tìm `gradle` cần thiết để import.

![](https://images.viblo.asia/1a25cbec-541e-49fa-adaf-4262be2d04ee.png)

### Layout Editor Properties Panel
Để cải thiện việc tinh chỉnh sản phẩm, nhóm phát triển đã làm mới lại **Layout Editor Properties Panel** (trình chỉnh sửa thuộc tính layout). Giờ nó sẽ chỉ còn đúng một khung duy nhất, với các thành phần có thể thu gọn cho các thuộc tính. Ngoài ra, các lỗi và cảnh báo sẽ có màu nổi bật riêng của chúng; bộ chọn màu cũng đã được cập nhật.

![](https://images.viblo.asia/7b6f7353-7279-4408-97ef-409c3c003dcd.gif)

### IntelliJ
Android Studio 3.4 đi kèm theo với bản cập nhật **Intellij 2018.3.4**. Bản cập nhật này có một lượng cải thiện lớn từ việc hỗ trợ **multi-line TODOs** tới tính năng tìm kiếm tại bất cứ đâu. Bạn có thể xem chi tiết hơn [tại đây](https://blog.jetbrains.com/idea/2019/01/intellij-idea-2018-3-4-is-released/).

# Build
### Project Structure Dialog
Có rất nhiều lập trình viên đã yêu cầu nên có một giao diện người dùng để quản lý các tập tin **Gradle** của dự án. Và để thỏa lòng mọi người, Google đã tạo ra giao diện **Project Structure Dialog** (PSD) mới. PSD mới này cho phép bạn xem và thêm vào các `dependencies` ở cấp module. Ngoài ra, PSD mới hiển thị cả các `build variables` cũng như các gợi ý để cải thiện các thiết lập của bạn. Mặc dù phiên bản mới nhất cho `Gradle plugin` là v3.4 cũng có những cải thiện khác, nhưng bạn không cần phải cập nhật phiên bản `Gradle plugin` của mình để dùng giao diện PSD mới này. Xem thêm [tại đây](https://developer.android.com/studio/releases#psd).

![](https://images.viblo.asia/e073d030-626b-450e-a649-0927522f41d2.png)

### R8
Đã được hai năm kể từ khi Google xem xét việc thay thế [R8](https://r8.googlesource.com/r8) cho **Proguard**. **R8** giúp bạn giảm thiểu kích thước của **APK** bằng việc thoải bỏ các đoạn mã, tài nguyên không được sử dụng cũng như làm cho mã của bạn chiếm ít dung lượng hơn. Ngoài ra, so với Proguard thì R8 kết hợp các bước `shrinking`, `desugaring` và `dexing` thành một bước, mang lại một cách tiếp cận hiệu quả hơn cho các ứng dụng Android. R8 hiện nay đã trở thành `code shrinker` mặc định khi bạn tạo dự án mới bằng Android Studio 3.4 và cho những dự án sử dụng plugin Android Gradle từ 3.4 trở lên. Xem thêm [tại đây](https://developer.android.com/studio/releases#r8-default).

# Test
### Android Emulator Skin updates & Android Q Beta Emulator System Image
Với phiên bản Android Studio 3.4 lần này, Google cung cấp thêm hai thiết bị emulator đó là **Google Pixel 3 & Google Pixel 3 XL**. Cùng với đó là system image cho **Android Q Beta**. 

![](https://images.viblo.asia/aaae1a33-f4cf-49d5-a165-bc054f8b9ca8.png)

*<div align="center">Android Emulator - Pixel 3 XL Emulator Skin</div>*

<br>

Để tóm lại, Android Studio 3.4 gồm các cải thiện và tính năng mới sau:

**Develop**
* Resource Manager
* Import Intentions
* Layout Editor Properties Panel
* IntelliJ 2018.3.4 Platform Update

<br>

**Build**
* Kotlin annotation processing (Kotlin 1.3.30 Update)
* Project Structure DialogR8

<br>

**Test**
* Emulator Device Skins
* Android Q Beta Emulator System Image Support

<br>
Credit: Android Developer Blog.