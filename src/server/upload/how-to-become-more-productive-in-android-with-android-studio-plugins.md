Android Studio là một công cụ rất mạnh mẽ. Nó có giao diện đơn giản nhưng linh hoạt để thiết kế giao diện người dùng cho tất cả các loại thiết bị. Chúng ta có thể kéo và thả các View và Widget trong trình chỉnh sửa layout của chúng ta và tùy chỉnh nó cho các chi tiết nhỏ với vài dòng xml. Nó rất tốt trong số các IDE để chỉnh sửa mã, gỡ lỗi với hiệu suất cao, và chỉ tốn ít effort. Nhưng chúng ta vẫn muốn nhiều hơn để làm việc hiệu quả hơn trong công việc hàng ngày của chúng ta.

**Điều gì khiến chúng ta năng suất ?**
* Để có thể viết nhiều dòng code hơn bằng vài phím.
* Để có thể gỡ lỗi và cấu hình mã của bạn nhanh hơn.

*Theo tác giả, hiểu sâu hơn về IDE của bạn có thể khiến bạn làm việc hiệu quả hơn. Nó có quá nhiều thứ để chúng ta có thể chưa khám phá.*

Để xem những gì Android Studio có thể làm được, hãy đi sâu vào các plugin. Plugin mở rộng khả năng của dự án và làm phong phú thêm trải nghiệm phát triển. Phần tốt nhất về plugin là dễ dàng để cài đặt. Chuyển đến Preferences -> Plugin trong Mac hoặc File -> Settings -> Plugin trên Ubuntu và Windows và hãy cùng khám phá những Plugin thú vị.

## Plugin mới
### Flutter
Một plugin mới thú vị để xây dựng và triển khai các ứng dụng di động đa nền tảng, hiệu suất cao trên cả Android và iOS trong danh sách Plugin Android của tác giả. Thật tuyệt vời khi mọi nhà phát triển Android nên thử nó.
Github: https://github.com/flutter/flutter-intellij

## Trình tạo mã
### MVP generator
Cài đặt plugin này và tạo mã Android MVP của bạn. Có một số MVP-plugins có sẵn tốt hơn để thử nghiệm với chúng, hãy chọn nhu cầu của bạn. Hãy nhớ một số mã được tạo tự động này có thể thêm mã cho các thư viện như Dagger hoặc RxJava để thêm dependencies tương ứng vào tệp gradle.
Link https://plugins.jetbrains.com/plugin/9784-generate-m-v-p-code

### Parcelable generator
Parcelable là implement Android của serializable java. Nó được sử dụng để truyền dữ liệu giữa các thành phần Android với thời gian xử lý nhanh hơn java Serializable. Bạn có thể cài đặt plugin này để tạo mã, nơi bạn có thể chọn Parcelable . Nó cũng cho phép bạn chọn các trường được chuyển thành Parcelable.
Github https://github.com/mcharmas/android-parcelable-intellij-plugin

### DTOnator
Tất cả các ứng dụng Android đều sử dụng JSON để giao tiếp. JSON là định dạng trao đổi dữ liệu ưu tiên và trọng lượng nhẹ trên thiết bị di động. Chúng ta tạo POJO từ JSON. Plugin này nhúng tạo POJO trong IDE android.
Github https://github.com/nvinayshetty/DTOnator

### ButterKnifeZelezny
Plugin Android Studio để tạo các injection ButterKnife từ file XML layout đã chọn. Giờ mình hay dùng databinding của Android rồi nên chắc chả còn dùng ButterKnife nữa.

### Android Selectors Generate
Plugin Android Studio này tự động tạo selector có thể kéo từ các resource Android được đặt tên phù hợp.
Github https://github.com/inmite/android-selector-chapek

## UI Plugins
### Material Theme UI EAP
Android studio có hai theme có sẵn Mặc định và Dracula. Nếu bạn muốn sử dụng theme Material, hãy cài plugin này.
Link https://plugins.jetbrains.com/plugin/9377-material-theme-ui-eap

### CodeGlance
Nhúng một mã minimap tương tự như trong Sublime vào trong code editor. Làm việc với cả theme sáng và tối bằng cách sử dụng các màu tùy chỉnh của bạn để highlight cú pháp.
Link https://github.com/Vektah/CodeGlance

### Advanced Java Folding
Các tùy chọn folding code làm tăng khả năng đọc mã bằng cách ẩn các cấu trúc mã ít quan trọng hơn. Java đã giới thiệu các biểu thức lambda trong Java 8 cũng làm cho mã ngắn gọn và rõ ràng.
Link https://plugins.jetbrains.com/plugin/9320-advanced-java-folding

### Android DPI Calculator
Máy tính DPI cho phép bạn tính toán các kích cỡ khác nhau trong tất cả các mật độ mặc định có sẵn trên nền tảng Android, ví dụ: xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi, ldpi và tvdpi.
Link https://plugins.jetbrains.com/plugin/7832-android-dpi-calculator

## Gỡ lỗi
### JVM Debugger Memory view
Gần đây tác giả đã học về plugin này nó rất tiện dụng và hữu ích cho mọi ứng dụng. Nếu bạn có những lo ngại về bộ nhớ trong ứng dụng của mình hoặc muốn kiểm tra việc phân bổ đối tượng tại các break point, hãy cài đặt nó. Đã có một bài viết hay về chủ đề này đáng để tìm hiểu ở [đây](https://hackernoon.com/a-useful-memory-debugger-plugin-for-android-studio-2d9d95bddc24).
Link https://plugins.jetbrains.com/plugin/8537-jvm-debugger-memory-view

### JRebel for Android
Plugin này hoạt động tương tự như tính năng Instant run của Google trong Android Studio. Về cơ bản chỉ áp dụng các bản vá cho các thay đổi mới thay vì cài đặt lại APK hoàn chỉnh.
Link https://plugins.jetbrains.com/plugin/7936-jrebel-for-android

### Android Resource Usage Count
Plugin này tự động tính mức sử dụng tài nguyên và hiển thị nó ở dải bên trái của mỗi dòng trong studio android của bạn. Rất tiện dụng nếu bạn muốn loại bỏ các tài nguyên không được sử dụng trong dự án của bạn nữa.
Github https://github.com/niorgai/Android-Resource-Usage-Count

## Tiện ích
### BIU
BIU là một plugin thuận tiện để nén PNG của bạn từng cái một hoặc tất cả các tệp đã chọn. Nó được hỗ trợ bởi thư viện pngquant nổi tiếng và API từ tinypng.
Lưu ý: Nếu bạn có android **minsdkversion ≥ 18**, bạn cũng có thể chuyển đổi hình ảnh sang định dạng WebP bằng cách nhấp chuột phải vào một hoặc tất cả hình ảnh được chọn cùng nhau để đạt được nén tối đa và giảm kích thước APK.
Link https://plugins.jetbrains.com/plugin/9788-biu

### Folding Plugin
Plugin này rất hữu ích trong việc phát triển Android. Nó có thể hiển thị các tệp của bạn dưới dạng một nhóm các thư mục khác nhau trong dạng xem cấu trúc dự án. Điều tốt nhất về plugin này là nó không tạo thư mục hoặc di chuyển tệp.
Github https://github.com/dmytrodanylyk/folding-plugin

### GitIgnore
Bạn không thể bỏ qua plugin này. Bởi vì nó bỏ qua tất cả các tập tin build, được tạo ra tự động, bộ nhớ cache IDE v..v.. cho bạn.
Github https://github.com/hsz/idea-gitignore

### AndroidLocalizationer
Plugin này giúp bạn dịch string resouce của mình sang các ngôn ngữ khác. Cài đặt và sau đó nhấp chuột phải vào tệp string resource và chọn 'Convert to other languages' và chọn ngôn ngữ bạn muốn.
Github https://github.com/westlinkin/AndroidLocalizationer

### Android Wifi ADB
Android wifi ADB giúp bạn cài đặt, chạy và gỡ lỗi APK qua wifi. Đã đến lúc để thoát khỏi việc mang theo cáp USB.

## Kết
Để khám phá thêm các plugin hay ho khác, hãy check qua project này https://github.com/balsikandar/Android-Studio-Plugins

Nguồn https://medium.com/mindorks/how-to-become-more-productive-in-android-with-android-studio-plugins-3beb3861fa7