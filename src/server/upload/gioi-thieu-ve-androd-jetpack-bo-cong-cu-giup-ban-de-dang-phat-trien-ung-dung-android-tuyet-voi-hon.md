# Android Jetpack là gì ?
Jetpack là một tập hợp các software components Android giúp bạn phát triển các ứng dụng Android tuyệt vời dễ dàng hơn. Các thành phần này giúp bạn thực hiện theo các phương pháp hay nhất, giải phóng bạn khỏi viết mã soạn sẵn và đơn giản hóa các tác vụ phức tạp, vì vậy bạn có thể tập trung vào mã mà bạn quan tâm.

Jetpack bao gồm các thư viện gói androidx. *, Không được gộp vào các API platforms. Điều này có nghĩa là nó cung cấp khả năng tương thích ngược và được cập nhật thường xuyên hơn nền tảng Android, đảm bảo bạn luôn có quyền truy cập vào các phiên bản mới nhất và tuyệt vời nhất của các thành phần Jetpack.

*Mời xem video intro của Android Jetpack*
{@youtube:https://www.youtube.com/watch?v=LmkKFCfmnhQ&feature=youtu.be}


Android Jetpack ra đời với 3 tiêu chí sau
| Tăng tốc độ phát triển| Loại bỏ boilerplate code| Mạnh mẽ, chất lượng|
| -------- | -------- | -------- |
| Các components được chấp nhận riêng lẻ nhưng được xây dựng để làm việc cùng nhau trong khi tận dụng các tính năng ngôn ngữ Kotlin giúp bạn làm việc hiệu quả hơn.     | Android Jetpack quản lý các hoạt động nhàm chán như các tác vụ nền, điều hướng và quản lý vòng đời, vì vậy bạn có thể tập trung vào những gì làm cho ứng dụng của bạn trở nên tuyệt vời.| Được xây dựng xung quanh các phương pháp thiết kế hiện đại, các thành phần Android Jetpack cho phép ít sự cố hơn và ít bộ nhớ bị rò rỉ hơn với khả năng tương thích ngược.|

# Android Jetpack Components
Các components trong Adroid Jetpack là tập hợp các thư viện được chấp nhận và sử dụng để làm việc cùng nhau.
## Foundation
Foundation components cung cấp core system capabilities, các extensions của Kotlin cùng với việc hỗ trợ multidex và automated testing.

### [AppCompat](https://developer.android.com/topic/libraries/support-library/packages.html#v7-appcompat)
Tương thích ngược với các phiên bản cũ của android

### [Android KTX](https://developer.android.com/kotlin/ktx.html)
Viết code Kotlin ngắn gọn, dễ hiểu hơn

### [Multidex](https://developer.android.com/studio/build/multidex.html)
Cung cấp khả năng hỗ trợ cho apps apps với multiple DEX files

### [Test](https://developer.android.com/topic/libraries/testing-support-library/index.html)
Framwork cho Android testing bao gồm unit và runtime UI tests
## Architecture
Architecture components have classes that help manage your UI component lifecycle, handle data persistence, and more.
### [Data Binding](https://developer.android.com/topic/libraries/data-binding/)
Declaratively bind observable data UI elements


### [Lifecycles](https://developer.android.com/topic/libraries/architecture/lifecycle)
Quản lý vòng đời Activity và fragment

### [LiveData](https://developer.android.com/topic/libraries/architecture/livedata)
Notify views khi dữ liệu bên dưới thay đổi

### [Navigation](https://developer.android.com/topic/libraries/architecture/navigation.html)
Handle tất cả các chức năng liên quan tới Navigation

### [Paging](https://developer.android.com/topic/libraries/architecture/paging/)
Phân trang theo yêu cầu từ data source

### [Room](https://developer.android.com/topic/libraries/architecture/room)
Hỗ trợ truy cập và điều khiển dễ dàng hơn trong SQLite database 

### [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)
Quản lý dữ liệu liên quan đến giao diện người dùng theo vòng đời

### [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager)
Quản lý các công việc trong Android background
## III. Behavior
### [Download manager](https://developer.android.com/reference/android/app/DownloadManager)
Đặt lịch & quản lý các tác vụ tải xuống
### [Media & playback](https://developer.android.com/guide/topics/media-apps/media-apps-overview.html)
Hỗ trợ tương thích ngược cho việc phát media và routing (bao gồm cả Google Cast)
### [Notifications](https://developer.android.com/guide/topics/ui/notifiers/notifications.html)
Cung cấp các API tương thích ngược cho việc hiển thị thông báo, hỗ trợ cả Wear và Auto

### [Permissions](https://developer.android.com/guide/topics/permissions/index.html)
Cung cấp các API cho việc kiểm tra và yêu cầu các quyền trong android
### [Sharing](https://developer.android.com/training/sharing/shareaction)
Cung cấp các hành động chia sẻ phù hợp với action bar của ứng dụng
### [Slices](https://developer.android.com/guide/slices)
Tạo các UI linh hoạt có thể hiển thị dữ liệu ứng dụng bên ngoài ứng dụng.
## IV. UI
### [Animation & transitions](https://developer.android.com/training/animation/)
Di chuyển widgets và các transition giữa các màn hình

### [Auto](https://developer.android.com/auto)
Thành phần giúp phát triển ứng dụng cho Android Auto.

### [Emoji](https://developer.android.com/guide/topics/ui/look-and-feel/emoji-compat)
Kích hoạt và cập nhật các emoji cho các nền tảng cũ

### [Fragment](https://developer.android.com/guide/components/fragments)
Một thành phần cơ bản trong UI

### [Layout](https://developer.android.com/guide/topics/ui/declaring-layout)
Bố trí các widgets bằng cách sử dụng thuật toán khác nhau

### [Palette](https://developer.android.com/training/material/palette-colors)
Trình chọn màu
### [TV](https://developer.android.com/tv)
Thành phần giúp phát triển ứng dụng cho Android TV.

### [Wear OS by Google](https://developer.android.com/wear)
Thành phần giúp phát triển ứng dụng cho Wear.
# Lời chia sẻ
Trên đây là bài giới thiệu về Android Jetpack, tuần tới mình sẽ hướng dẫn các bạn xây dựng một ứng dụng sử dụng bộ android jetpack này ngay trên Android Studio phiên bản 3.2 beta sắp tới sẽ ra mắt. Những thư viện này đã có từ lâu trên Android nhưng từ trước tới nay chúng ta, những nhà phát triển android chưa có một chuẩn chung để áp dụng những thư viện này vào trong project thực tế, giờ đây chính Google đã phát triển, xây dựng nên một chuẩn chung giúp anh em chúng ta phần nào giảm bớt khó khăn khi lập trình với Android. Bài dịch này gíup các bạn hiểu hơn về Android Jetpack, chuẩn bị cho cuộc nâng cấp lớn của Android, mình hy vọng sau này tất cả chúng ta sẽ có thể sử dụng thành thạo các thành phần trong Android Jetkpack <3

Nguồn bài viết:https://developer.android.com/jetpack/