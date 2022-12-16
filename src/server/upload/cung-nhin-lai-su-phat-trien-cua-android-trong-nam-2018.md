# 1. Happy 10th Birthday, Android!
![](https://images.viblo.asia/caf43995-cea1-4d27-b78d-740868be9e53.png)

Với điện thoại Android thương mại đầu tiên ra mắt vào tháng 9 năm 2008, Android của chúng ta đã bước sang tuổi 10 trong năm nay!

Rất nhiều điều đã xảy ra trong năm kỷ niệm 10 năm của Android: rất nhiều bản phát hành và thay đổi mới trong hệ sinh thái phát triển có ảnh hưởng đến cả các developer và người dùng cuối. 

Bài đăng này sẽ liệt kê ra danh sách tất cả các sự kiện lớn trong Android năm 2018.

# 2. Kotlin
Phát triển mạnh mẽ với hơn 60% các developer sử dụng nó cho các dự án Android, Kotlin là ngôn ngữ đã được áp dụng theo cấp số nhân trong một năm rưỡi qua. 

Tham khảo thêm về Kotlin: https://kotlinlang.org/

# 3. Android KTX
Dựa trên việc áp dụng Kotlin, Google cũng đã phát hành Android KTX vào đầu năm nay, cung cấp một bộ tiện ích mở rộng được thiết kế để giúp viết mã Kotlin ngắn gọn hơn. Kotlin vốn đã ngắn gọn nay còn ngắn gọn hơn rất nhiều với Android KTX.

Tham khảo thêm về Android KTX: https://developer.android.com/kotlin/ktx

# 4. Android Wear => Wear OS
Android Wear được đổi tên thành Wear OS, cùng với một bản phát hành mới cải tiến toàn bộ UI dựa trên Android Pie.
Tham khảo: https://www.youtube.com/watch?v=penkgJBJdv4

# 5. Các bản cập nhật lớn cho Android Studio
Tháng 1/2019, Google chính thức phát hành Android Studio 3.3 với các sự thay đổi đáng chú ý như: 
## Navigation Editor
Giờ đây ta đã có một Editor cho phép chúng ta nhanh chóng trực quan hóa và xây dựng điều hướng các màn hình trong ứng dụng của mình bằng cách sử dụng [Navigation Architecture Component](https://developer.android.com/topic/libraries/architecture/navigation/).

Tham khảo: [Implement navigation with the Navigation Architecture Component](https://developer.android.com/topic/libraries/architecture/navigation/navigation-implementing)

## Lint improvements
Lint, khi được gọi từ Gradle, nhanh hơn đáng kể các dự án lớn hơn có thể mong đợi lint chạy nhanh hơn gấp bốn lần

Tham khảo: [Improve your code with lint checks](https://developer.android.com/studio/write/lint)

## Tự động download và cập nhật SDK, NDK bị thiếu
Khi dự án của chúng ta cần một thành phần SDK từ nền tảng SDK, NDK hoặc CMake, Gradle sẽ cố gắng tự động tải xuống các gói cần thiết miễn là trước đó chúng ta đã chấp nhận bất kỳ thỏa thuận cấp phép liên quan nào bằng Trình quản lý SDK.

Tham khảo: [Auto-download missing packages with Gradle](https://developer.android.com/studio/intro/update#download-with-gradle)

# 6. Google Play Protect
Play Protect đã được công bố tại hội nghị Google I/O năm 2018. Nó có mục đích giảm nguy cơ tấn công bị nhiễm phần mềm độc hại trên thiết bị người dùng bằng cách quét tất cả các ứng dụng đã cài đặt của họ và thông báo cho người dùng về bất kỳ ứng dụng nào có thể có mã độc trong đó.

Tham khảo: https://www.android.com/play-protect/

# 7. AndroidX
AndroidX là phiên bản thế hệ tiếp theo của các thư viện hỗ trợ mà tất cả chúng ta đều sử dụng và yêu thích! Tất cả các gói trong AndroidX hiện đang được đặt tên một cách nhất quán, bắt đầu bằng chuỗi androidx và không giống như Support Library trước đây, các gói AndroidX được duy trì và cập nhật riêng.

Tham khảo: https://developer.android.com/jetpack/androidx/

# 8. Goodbye GCM (Google Cloud Messaging)
API GCM (Google Cloud Messaging) không được chấp nhận và sẽ bị xóa hoàn toàn vào tháng 4 và được thay thế hoàn toàn bằng FCM.

Tham khảo: [Time to Upgrade from GCM to FCM](https://firebase.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html)

# 9. Android Jetpack
 Android Jetpack cung cấp các thư viện quản lý các hoạt động như tác vụ nền, xử lý cơ sở dữ liệu, điều hướng và quản lý vòng đời các Activity, Fragment,..., để chúng ta có thể loại bỏ mã soạn sẵn (boilerplate code) và tập trung vào việc làm cho ứng dụng của chúng ta tốt hơn.
 Đây là một sự thay đổi lớn giúp các developer rất nhiều trong các dự án.
 
 Tham khảo: https://developer.android.com/jetpack/
 
 # 10. Android Architecture components
 Android Architecture components là một phần của Jetpack giúp chúng ta thiết kế các ứng dụng mạnh mẽ, dễ dàng viết test và dễ dàng maintain.
 
 ## [Data Binding](https://developer.android.com/topic/libraries/data-binding/)
 Giúp liên kết dữ liệu quan sát được với các thành phần UI
 
 ## [Lifecycles](https://developer.android.com/topic/libraries/architecture/lifecycle)
 Quản lý vòng đời của các Activity và Fragment
 
 ## [LiveData](https://developer.android.com/topic/libraries/architecture/livedata)
 Thông báo UI thay đổi khi cơ sở dữ liệu thay đổi
 
 ## [Navigation](https://developer.android.com/topic/libraries/architecture/navigation/)
 Xử lý mọi thứ cần thiết trong việc điều hướng trong ứng dụng
 
 ## [Paging](https://developer.android.com/topic/libraries/architecture/paging/)
 Thư viện giúp xử lý Load More
 
 ## [Room](https://developer.android.com/topic/libraries/architecture/room)
 Truy vấn cơ sở dữ liệu SQLite dễ dàng hơn
 
 ## [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel)
 Quản lý dữ liệu liên quan đến UI theo cách tuân thủ về vòng đời của Activity, Fragment
 
 ## [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager/)
 Quản lý các task chạy trên background thread
 
 # 11. App Actions
 Với App Actions, ứng dụng của chúng ta có thể được đề xuất cho người dùng như một cách để đáp ứng nhu cầu của họ - tại thời điểm họ cần nó nhất. Các hành động ứng dụng của chúng ta cũng có thể được đề xuất cho người dùng trên màn hình khởi chạy, trang Google Assistant và trang tìm kiếm Google
 
 Tham khảo: https://developer.android.com/guide/actions/
 
 # 12. Android App Bundle
 Android Studio hiện cho phép chúng ta xây dựng Android App Bundle thay vì tệp .apk, chứa mọi thứ mà ứng dụng của chúng ta cần cho mọi thiết bị - tất cả ngôn ngữ, mọi kích thước màn hình thiết bị, mọi kiến trúc phần cứng. 

Khi người dùng tải xuống ứng dụng của chúng ta, Dynamic Delivery mới của Google Play, sẽ chỉ phân phối mã và tài nguyên phù hợp với thiết bị của người dùng, do đó dẫn đến kích thước của ứng dụng giảm đáng kể.

Tham khảo: https://developer.android.com/studio/projects/dynamic-delivery

# 13. Instant app được hỗ trợ cho Game
Google Play Instant hiện cho phép các nhà phát triển trò chơi xây dựng các ứng dụng Instant có chứa một số cấp độ trò chơi cụ thể mà người dùng có thể chơi thử mà không cần tải ứng dụng.

Tham khảo: https://developer.android.com/topic/google-play-instant/

# 14. Android Things 1.0
Android Things cho phép chúng ta lập trình và định cấu hình các dự án bằng cảm biến phần cứng, giống như khi chúng ta xây dựng các ứng dụng Android. Bản phát hành 1.0 đánh dấu bản phát hành ổn định đầu tiên của nền tảng này. 

Tham khảo: https://www.youtube.com/watch?v=kPeB04kHpUw

# 15. ML Kit trong Firebase
Được công bố tại Google I/O, ML Kit là giải pháp hàng đầu của Google, giúp các nhà phát triển di động dễ dàng triển khai các mô hình Machine Learning khá phức tạp trong ứng dụng. 

Cái hay của các API này là không yêu cầu kiến thức trước về Machine Learning!

Tham khảo: https://firebase.google.com/docs/ml-kit/

# 16. Goodbye Fabric, Hello Firebase
"Google chỉ hỗ trợ Fabric đến giữa năm 2019 và Google đề nghị rằng các nhà phát triển sử dụng Fabric SDK nên chuyển sang Firebase console càng sớm càng tốt. Dưới đây hướng dẫn di chuyển chi tiết: https://get.fabric.io/roadmap

# 17. Hỗ trợ điện thoại "có thể gập" (Foldable Smartphone)
Vâng rất có thể đây là tương lai mới của smart phone mà các dev nhà Android nên chuẩn bị các kiến thức cần thiết về nó.

Tham khảo: https://www.bignerdranch.com/blog/the-future-of-android-unfolds/

# 18. In-App Updates API
Sử dụng API này, các nhà phát triển hiện có thể nhắc người dùng cập nhật ứng dụng trước khi có thể sử dụng chúng. 

API cung cấp cho chúng ta 2 tùy chọn. Đầu tiên là trải nghiệm toàn màn hình cho các bản cập nhật quan trọng khi chúng ta mong đợi người dùng cập nhật ứng dụng ngay lập tức. 

Tùy chọn thứ hai là một bản cập nhật linh hoạt, có nghĩa là người dùng có thể tiếp tục sử dụng ứng dụng trong khi bản cập nhật đang tải xuống.

Tham khảo: https://thehackernews.com/2018/11/android-in-app-updates-api.html

# 19. Hello R8
R8 là phiên bản ProGuard thế hệ tiếp theo và được phát hành trong Android Studio 3.3. Với R8, chúng ta có thể mong đợi obfuscation nhanh hơn và kích thước apk nhỏ hơn.

Tham khảo: https://android-developers.googleblog.com/2018/11/r8-new-code-shrinker-from-google-is.html

# 20. Play Services bây giờ chỉ còn hỗ trợ minSDK là 16
Play Services đã không còn hỗ trợ cho API 14 và 15 :(

Tham khảo: https://android-developers.googleblog.com/2018/12/google-play-services-discontinuing.html

# 21. Flutter 1.0
Flutter đã phát hành phiên bản ổn định đầu tiên vào đầu tháng 12/2018!

Tham khảo: https://flutter.io/docs

# 22. ARCore và Sceneform
SDK Sceneform đã được phát hành tại hội nghị I / O năm nay. Nó cho phép các nhà phát triển xây dựng tài sản cho các ứng dụng hỗ trợ AR với Java và Kotlin đơn giản mà không cần phải học OpenGL. 

Xem hướng dẫn tiện dụng này về cách tạo ứng dụng Android với ARCore và Sceneform

Tham khảo: https://heartbeat.fritz.ai/build-you-first-android-ar-app-with-arcore-and-sceneform-in-5-minutes-af02dc56efd6

# Lời kết
Trên đây là danh sách liệt kê những điểm đáng chú ý cho các Android Developer trong năm 2018. Nếu thiếu sót hoặc xảy ra sai sót, xin các anh em để lại lời bình. Xin cảm ơn. Chúc anh em một năm 2019 đại thành công!

Nguồn tham khảo: https://heartbeat.fritz.ai/2018-year-in-review-an-android-developers-ultimate-guide-9e303d54f1a8