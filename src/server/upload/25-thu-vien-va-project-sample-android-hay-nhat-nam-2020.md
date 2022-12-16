Trong nửa năm đầu tiên 2020 là khoảng thời gian tuyệt vời để chúng ta tổng kết những gì đã xảy ra trong thế giới Android về các thư viện (Library) và dự án nguồn mở (open source).
Dưới đây, bạn sẽ tìm thấy danh sách các dự án (project) thực sự đáng để xem, thử nghiệm và thậm chí áp dụng cho các dự án của bạn. Hãy cùng xem nhé.

# 1. Pokedex
[Pokedex](https://github.com/skydoves/Pokedex) là một dự án demo giới thiệu một công nghệ hiện đại với kiến trúc MVVM và repository pattern.

![](https://images.viblo.asia/710b11f3-7cd7-43fb-8135-82f8ebc6a3a9.gif)

Dự án được viết bằng Kotlin, sử dụng [Coroutines](https://github.com/Kotlin/kotlinx.coroutines) cộng với Flow cho các tác vụ không đồng bộ (asynchronous) và standard networking (mạng tiêu chuẩn), OkHttp và Retrofit.
Trên thực tế, bạn có thể nói rằng không có sự khác biệt giữa dự án này và các dự án tương tự khác. Tuy nhiên, có một điểm khác biệt lớn. Nó sử dụng Dagger Hilt được giới thiệu gần đây như là DI framework. Vì vậy, nếu bạn muốn tìm hiểu Hilt trong một tình huống thực tế, thì dự án là tốt để thực hiện. Nó có tài liệu khá tốt và được phát hành theo giấy phép Apache 2.0.

# 2. Kotlin Coroutines — Use Cases on Android
Nếu bạn chưa bắt đầu sử dụng [Coroutines](https://github.com/LukasLechnerDev/Kotlin-Coroutine-Use-Cases-on-Android) và bạn muốn nắm bắt nó một cách nhanh chóng, thì dự án này là dành cho bạn. Theo tài liệu, nó giống như một “playground project” nơi bạn có thể nhanh chóng tra cứu và chinh chiến với các triển khai Android Coroutine khác nhau. Trong project này , bạn có thể tìm hiểu các ví dụ về Coroutines chạy trực tiếp trên JVM. ”

![](https://images.viblo.asia/6367c78b-4b0c-427c-b07d-86b9110fdb07.png)

README chứa rất nhiều ví dụ, từ một yêu cầu mạng đơn lẻ (single network) thực hiện khá đơn giản đến các phép tính phức tạp hơn, tốn kém hơn đến một số Coroutines. Nó được viết rất tốt và được giải thích rõ ràng. Nó được cấp phép theo Giấy phép Apache 2.0.

# 3. AnimatedBottomBar
[Animated Bottom Bar](https://github.com/Droppers/AnimatedBottomBar) là custome view sử dụng bottom bar viewvới các animations đẹp mắt.

![](https://images.viblo.asia/97ab45f6-8e4b-4f3c-9bd9-744eea10883e.gif)

![](https://images.viblo.asia/7d7ffad9-7241-482c-b988-797d490d48ae.gif)

![](https://images.viblo.asia/e8a74118-0205-4f36-85a4-5ee09b976341.gif)


Thư viện này có tài liệu thực sự rất bao quát với nhiều samples sử dụng. Nó ở phiên bản 1.0. + Và hỗ trợ API 16+. Nó được phát hành theo giấy phép MIT, vì vậy đừng quên đề cập đến tác giả trong code của bạn nhé.

# 4. Motion Toast
[Motion Toast](https://github.com/Spikeysanju/MotionToast) là một thư viện Toast với hiệu ứng chuyển động đa năng đẹp mắt trong Android sử dụng Kotlin.

![](https://images.viblo.asia/99f83fd6-9a80-40da-ab86-af6088d3d7f6.gif)

Thư viện cung cấp năm loại Toast, với khả năng tùy chỉnh:
- duration time (Thời gian),
- theme (light/dark) - Chủ đề (Sáng/Tối),
- styles

Tài liệu bao gồm đầy đủ các ví dụ. Cách sử dụng rất dễ dàng. Nó hỗ trợ API 21 + và được phát hành theo giấy phép MIT.


# 5. Cycler
[Cycler](https://github.com/square/cycler)  là một thư viện thú vị khác từ Square Engineering. Tài liệu nói rằng nó "cho phép bạn configure cấu hình Android RecyclerView một cách dễ dàng, khai báo theo cách ngắn gọn."
Nó được triển khai theo các quy tắc (rules), trong đó bạn sẽ viết code khai báo với strong types và mọi thứ phải dễ dàng (inflating rows, tạo các mục tùy chỉnh chung, v.v.).
Thư viện ở phiên bản 0.1.4, vì vậy tôi không khuyên bạn nên dùng nó cho product. Tuy nhiên, nó thực sự tốt để triển khai adapter và quản lý RecyclerViews. Điều thú vị là tài liệu nói rằng:
> Bạn có thể yêu cầu API tạo đối tượng RecyclerView cho bạn - bằng cách sử dụng phương thức *create* - hoặc cấu hình một instance hiện có - thông qua phương thức *adopt*. Cái sau hữu ích nếu bạn đã có layout mà RecycleView là một phần của nó.

Tài liệu rất bao quát. Trong project có chứa một ứng dụng giới thiệu (showcase app) và được phát hành theo giấy phép Apache 2.0.

# 6. Zoom Recycler Layout
[Zoom Recycler Layout](https://github.com/Spikeysanju/ZoomRecylerLayout) là một thư viện thu phóng ảnh tuyệt vời cho các item của RecyclerView được viết bằng Kotlin.

![](https://images.viblo.asia/df72ea1d-a80b-4a10-b2ae-06c269763d2a.gif)

Trên thực tế, đây là một lớp extened từ lớp LinearLayoutManager và ghi đè hai hàm: *scrollVerticallyBy ()* và *scrollHorizontallyBy()*. Tuy nhiên, bạn có thể coi nó như một sự thu hút, mới mẻ, bắt mắt của các item trong  vertical hoặc horizontal lists. Dự án được phát hành theo giấy phép Apache 2.0 và hỗ trợ API 11+.

# 7. Accompanist
[Accompanist](https://github.com/chrisbanes/accompanist) là một nhóm các thư viện có chứa một số tiện ích (utilities) mà Chris Banes đã tạo ra và tự mình sao chép lại, xung quanh các dự án sử dụng [Jetpack Compose](https://developer.android.com/jetpack/compose).

![](https://images.viblo.asia/a482633f-fad3-45fb-a560-b1f8c145eea4.png)

Hiện tại, nó tích hợp:
- Material design components [theme](https://github.com/chrisbanes/accompanist/blob/main/mdc-theme/README.md) 
- [Coil image-loading](https://github.com/chrisbanes/accompanist/blob/main/coil/README.md)

Nếu bạn định sử dụng Jetpack Compose và muốn có một chủ đề thiết kế material design hoặc tải hình ảnh bắt mắt với Coil, thì dự án này là dành cho bạn. Nó có tài liệu rất bao quát và được phát hành theo giấy phép Apache 2.0.

# 8. JetpackComposeCalculator
[JetpackComposeCalculator](https://github.com/ahmedrizwan/JetpackComposeCalculator) là một ví dụ thú vị về nơi có thể sử dụng Accompanist. Ahmed Rizwan (tác giả) đã clone giao diện máy tính (calculator) trên Android 10 bằng Jetpack Compose.

![](https://images.viblo.asia/ec681ebb-e49a-4a8e-88bd-776dcad40b1f.png)

Trong README thực sự rất ngắn, nhưng tác giả đã giải thích ý tưởng chính và cách tiếp cận trong bài viết của mình, vì vậy đây là một khởi đầu tốt. Bạn có thể coi dự án này như một cách học Jetpack Compose, dựa trên những ví dụ. Không có thông tin về phiên bản. Nó được phát hành theo giấy phép MIT. 

# 9. ComposeClock
Bạn có nhớ thử thách đồng hồ Flutter này không? Nếu vậy, bạn cũng nhớ ai và dự án nào đã thắng. Dựa trên thiết kế đó, một tác giả của [ComposeClock](https://github.com/adibfara/ComposeClock) đã chuẩn bị một phiên bản Jetpack Compose.

![](https://images.viblo.asia/46b2f548-1600-49da-b107-d43e139ce944.gif)

Không có README nào, chỉ có code và giấy phép Apache 2.0. Hãy Enjoy nó nhé.

# 10. Compose Academy
Như một bản tóm tắt về các dự án được tạo bằng cách sử dụng Jetpack Compose, bạn cần phải xem Compose Academy Playground của [Joe Birch](https://medium.com/@hitherejoe).

![](https://images.viblo.asia/ec4024a5-4ff9-48c0-9197-65d042eadc1c.png)

Đây là tài nguyên miễn phí cung cấp các snippets và sample thực tế về cách sử dụng Jetpack Compose cho nền tảng Android.
Theo tài liệu, "dự án được chia tách theo API, với mục đích loại bỏ sự khó khăn khi cố gắng tìm sample mà bạn muốn khám phá."

Tài liệu được chia làm 8 phần chính: 
- Animation
- Core
- Foundation
- Graphics
- Layout
- Material
- Resource
- Test

Repo này tồn tại và thay đổi theo thời gian. Nó chắc chắn đáng để theo dõi nếu bạn muốn đi đúng hướng với những điều mới lạ từ Jetpack Compose. Rất khuyến khích các bạn nhé!

Link repo [Compose Academy](https://github.com/hitherejoe/ComposeAcademy-Playground)

# 11. ProtonMail
Chúng ta sẽ quay trở lại với ngôn ngữ java (khoảng 49.2%). Chỉ vài tháng trước, [ProtonMail](https://github.com/ProtonMail/proton-mail-android) đã được open source trên Android app.

![](https://images.viblo.asia/28045a7c-5d1e-4e59-acb7-9fa0438c8eed.png)

Đây là một resource tốt để kiểm tra cách tiếp cận thiết kế của một ứng dụng Android thực sự an toàn. Dự án có tài liệu khá chi tiết với hướng dẫn sử dụng và cách thiết lập ứng dụng. Tất cả đều được phát hành theo Giấy phép GPL-3.0.

# 12. kotlin-android-template
[kotlin-android-template](https://github.com/cortinico/kotlin-android-template) là một sample Github đơn giản cho phép bạn tạo một dự án Android / Kotlin có thể khởi động và chạy trong vài giây. Tài liệu nói rằng "sample này tập trung vào việc cung cấp một dự án với static analysis and CI (continuous integration) đã có sẵn 100% trong Kotlin."

Nó hỗ trợ/bao gồm các phần sau:
- 3 sample modules (Android app, Android library, Kotlin library)
- Sample Espresso, Instrumentation, and JUnit tests
- 100% Gradle Kotlin DSL setup
- Dependency versions managed via buildSrc
- CI setup with GitHub Actions
- Kotlin static analysis via ktlint and detekt
- Publishing ready
- Issues template (bug report plus feature request)
- Pull request template

Nếu bạn đang vội hoặc đang chuẩn bị một nhiệm vụ tuyển dụng, có lẽ repo này rất đáng để thử. Tuy nhiên, nó được phát hành theo giấy phép của MIT.

# 13. ThemedToggleButtonGroup
[ThemedToggleButtonGroup](https://github.com/Bryanx/themed-toggle-button-group) là các nút chuyển đổi có thể tùy chỉnh bên trong [FlexboxLayout](https://github.com/google/flexbox-layout).

![](https://images.viblo.asia/4078fb67-b214-4c62-ae08-343ad89e3a72.gif)

![](https://images.viblo.asia/adf31321-43b2-4884-b574-6cc97b0239b6.gif)

Tài liệu mô tả như sau:
> “ThemedToggleButtonGroup là một thư viện mô-đun nút on/off dành cho Android. Nó có thể được cấu hình để lựa chọn một hoặc nhiều lựa chọn. Đối với nhiều lựa chọn, có thể chỉ định số lượng nút tối thiểu/tối đa được yêu cầu tắt/bật. Các icon có thể được thêm vào. Selection bao gồm một fun press và circular reveal animation. "

README thực sự tốt và đầy đủ các ví dụ. Dự án hỗ trợ API 14+, hiện có phiên bản 1.3.1 và được phát hành theo giấy phép MIT.

# 14. CleanRxArchitecture
[CleanRXArchitecture](https://github.com/lopspower/CleanRxArchitecture) là một dự án dựa trên các nguyên tắc của clean architecture  và MVI (model view intent) cho lớp presentation.

![](https://images.viblo.asia/fa712d6b-5eb4-4de1-bbb3-a42514d89fb4.png)

Ứng dụng demo là một dự án multi module được kết nối với API GitHub cho phép tác giả liệt kê tất cả các kho lưu trữ  (repositories) công khai của họ. Nó vẫn có thể được sử dụng khi bị ngắt kết nối, với một bản sao lưu của tất cả dữ liệu được lưu trữ trong cơ sở dữ liệu (Room). Dark mode cũng có sẵn. Toàn bộ ứng dụng được coverd, với các bài test unit, UI, and functional/integration (= use case). Nó sử dụng các lib như Dagger 2, RxJava 3, Room và AndroidX.

Trong repository, bạn cũng sẽ xem các công cụ khác nhau và các bài thực hành hay (với Git và hơn thế nữa).

Tài liệu rất chi tiết. Nó được phát hành theo giấy phép Apache 2.0.

# 15. LightProgress
[LightProgress](https://github.com/bitvale/LightProgress) là một Android Light animation trên Android của [Oleg Frolov](https://dribbble.com/shots/5649494-Light-Loading-Progress).

![](https://images.viblo.asia/a1b85c2a-f438-45e7-979b-5dc47bbcede8.gif)

Cách tạo ra loại animation này. Nó có bốn loại thuộc tính:
- android:text (string) -> default "Loading"
- android:textSize (dimension) -> default 56sp
- android:textColor (color) -> default #484848
- app:light_color (color) -> default #FFFFFF

Hơn nữa, nó hỗ trợ API 16+, ở phiên bản 1.0.1 và được phát hành theo giấy phép Apache 2.0.

# 16. Corona Warn App
Từ cuối năm 2019 đến năm 2020, chúng ta đang sống trong thời đại COVID, vì vậy không thể bỏ lỡ ứng dụng Corona Warn ở đây.

> “Mục tiêu của dự án này là phát triển Corona-Warn-App chính thức cho Đức dựa trên API thông báo phơi nhiễm của Apple và Google. Các ứng dụng (cho cả iOS và Android) sử dụng công nghệ Bluetooth để trao đổi dữ liệu được mã hóa ẩn danh với điện thoại di động khác (trên đó ứng dụng cũng được cài đặt) ở gần điện thoại của người dùng ứng dụng. Dữ liệu được lưu trữ cục bộ trên thiết bị của mỗi người dùng, ngăn cơ quan chức năng hoặc các bên khác truy cập hoặc kiểm soát dữ liệu. Repository này chứa Android native của Corona-Warn-App. Hãy truy cập trang Câu hỏi thường gặp của chúng tôi để biết thêm thông tin và các vấn đề thường gặp. ” - Corona Warn App documentation

Ứng dụng được tạo bởi các nhà phát triển SAP và Deutsche Telekom. Ngoài ra còn có tài liệu tuyệt vời giải thích nhiều khía cạnh của dự án này, được phát hành theo giấy phép Apache 2.0.

Link repo [Corona Warn App](https://github.com/corona-warn-app/cwa-app-android)

# 17. KaMP Kit
[KaMP Kit](https://github.com/touchlab/KaMPKit) là một bộ sưu tập code và công cụ được thiết kế để giúp bạn hoặc mobile team của bạn bắt đầu nhanh chóng với Kotlin Multiplatform.

![](https://images.viblo.asia/19d6997f-bd13-440e-bbfa-103303d100d4.png)

Bạn có thể coi nó như một nguồn tài liệu tuyệt vời để học hỏi. KaMP Kit được thiết kế để giúp bạn vượt qua trở ngại đầu tiên khi tiếp cận với Kotlin Multiplatform. Từ nguồn tài liệu:
> “What’s Included? 1. The Starter App — A native mobile KMP app with a small functional feature set. <br>2. Educational Resources — Introductory information on KMP and Kotlin/Native.<br> 3. Integration Information — If you’re integrating shared code into an existing application, guides to assist with that effort.”

# 18. Kissme
[Kissme](https://github.com/netguru/Kissme) là tên viết tắt của Kotlin Secure Storage Multiplatform. Kissme có thể được tích hợp liền mạch trong các dự án Kotlin được xây dựng với các plugin Kotlin Multiplatform, Kotlin / Native và Kotlin Android. Nó cho phép lưu trữ dữ liệu dưới dạng key-value trong các common code modules mà không cần phải thêm bất kỳ đoạn code nào.

Hiện tại, thư viện hỗ trợ các nền tảng sau:
- Android (API 23+)
- iOS (iOS_arm64 and iOS_x64 targets)

Project đang ở phiên bản 0.2.5. Nó được phát hành theo giấy phép Apache 2.0.

# 19. DeterminateProgressView
[DeterminateProgressView](https://github.com/owl-93/Determinate-Progress-View) là một circle progress view có thể tùy chỉnh cao và dễ tạo kiểu.

![](https://images.viblo.asia/f4facaa9-b635-49e6-be14-2f322d750161.gif)

Tài liệu nói rằng "nó được xây dựng bằng Kotlin và hỗ trợ các tùy chọn tùy chỉnh, một cách thuận tiện để tạo ra những animate progress automatically."

Bạn có thể sử dụng các hàm XML và Kotlin / Java để điều chỉnh nó. Ngoài ra, có một ứng dụng demo rất mạnh mẽ. README bao gồm tất cả các cách tạo kiểu cho tiện ích con, cũng như mô tả rất chi tiết về tất cả các thuộc tính và XML. Bạn cần phải kiểm tra nó cho chắc chắn. Dự án được phát hành theo giấy phép MIT và ở phiên bản 1.4.0.

# 20. Venom
[Venom](https://github.com/YarikSOffice/venom) là một công cụ nhẹ giúp đơn giản hóa việc kiểm tra (testing) những kịch bản của những process có thể gây ra chết ứng dụng Android của bạn (testing of the process death scenario).

![](https://images.viblo.asia/d946df90-a190-4b61-bc19-2bef892dd560.png)

Dự án được tạo ra để thử nghiệm các ứng dụng có những hành vi xâm phạm, trái ngược với Android runtime. Đôi khi, Android sẽ chấm dứt các ứng dụng nền (background application) trong khi người dùng không tương tác với các ứng dụng khác. Trong trường hợp này, tất cả các actvity bị phá hủy cùng với các object và các task cụ nền trong phạm vi ứng dụng đó. Sau đó, chúng ta phải luôn đảm bảo rằng các ứng dụng của chúng ta có giao diện nhất quán và được kiểm tra theo kịch bản quá trình gây chết ứng dụng (testing of the process death scenario).

Venom khá dễ sử dụng và có tài liệu hướng dẫn khá tốt. Nó được phát hành theo giấy phép MIT. Nó hiện đang ở phiên bản 0.3.1.

# 21. RateBottomSheet
[RateBottomSheet](https://github.com/lopspower/RateBottomSheet) là một thư viện giúp bạn quảng cáo ứng dụng Android của mình bằng cách nhắc người dùng xếp hạng ứng dụng của bạn.

![](https://images.viblo.asia/791550a5-be41-48df-905f-a88b0dc982de.gif)

Như bạn có thể biết, Google đã phát hành một [API](https://android-developers.googleblog.com/2020/08/in-app-review-api.html) mới cho các bài đánh giá trong chính ứng dụng. Nó thực sự tuyệt vời nhưng chỉ hoạt động từ API 21. Nếu vì một số lý do, bạn không thể sử dụng API này, bạn có thể thử thư viện RateBottomSheet. Nó hỗ trợ API 16+ và được thiết kế rất tốt. Dự án chứa một sample application, có tài liệu được viết chi tiết và được phát hành theo giấy phép Apache 2.0.

# 22. Decorator
[Decorator](https://github.com/cabriole/Decorator) là một thư viện giúp tạo lề và ngăn chia (margins and dividers) trong RecyclerView.

![](https://images.viblo.asia/48482473-34c5-45a5-b790-4e8961c3063f.png)

Ý tưởng của dự án này cũng là tạo ra nhiều decorations và áp dụng nó cho RecyclerView. Nó khá hữu ích. Hơn nữa, nó có tài liệu thực sự toàn diện, chi tiết và có một sample project giới thiệu cách sử dụng.
Nó ở phiên bản 1.2.0 và được phát hành theo giấy phép Apache 2.0.

# 23. CornerCutLinearLayout
[CornerCutLinearLayout](https://github.com/Devlight/CornerCutLinearLayout) là một lib tuyệt vời cho phép cắt các góc LinearLayout (parent and children), các shadows phức tạp và các đường phân chia (dividers).

![](https://images.viblo.asia/95edc1fb-eed3-4d8d-8342-36953be13e44.png)

Phần extension của LinearLayout này thực sự được ghi chép rất đầy đủ. mình cũng đã không nhìn thấy loại java doc này trong một thời gian dài. Ngoài ra, README thật tuyệt vời.

Ngoài ra, bằng cách sử dụng các thuộc tính có sẵn và  custome providers, những vết cắt bạn thực hiện với CornerCutLinearLayout có thể được chuyển thành các bản cắt có hình dạng, kích thước khác nhau, v.v.

Tài liệu nói rằng “mục đích duy nhất của widget là để sử dụng với children mà không có sự biến đổi (như là biến đổi khi rotation, scale, matrix).”

Dự án được phát hành theo giấy phép Apache 2.0 và ở phiên bản 1.0.1.

# 24. Recycling Center
Theo tài liệu thì,
> “[Recycling Center](https://github.com/Snapchat/recycling-center) là một thư viện được thiết kế để hỗ trợ một pattern đó là: reactive, unidirectional data flow bằng cách sử dụng immutable ViewModels. Nó kết hợp reactive data flow của RxJava với UI hiệu quả của RecyclerView và hỗ trợ UI composition thông qua Sections of Views và ViewModels ”.

![](https://images.viblo.asia/d7421512-e712-40ba-b598-ea26c45e23b9.png)

Cách tốt nhất để kiểm tra cách thức hoạt động của thư viện này là đi đến sample của nó và hiểu cách thức hoạt động của nó. Ngoài ra, README khá tốt. Dự án được phát hành theo Giấy phép BSD-3-Clause.

# 25. TickTock
[TickTock](https://github.com/ZacSweers/ticktock) là một thư viện quản lý dữ liệu timezone dành cho JVM và Android với yêu cầu API `java.time` từ  Java 8+ trở lên. Trong tài liệu có nói:
> “Sử dụng thư viện này nếu bạn muốn nhóm dữ liệu múi giờ trực tiếp với ứng dụng của mình thay vì dựa vào múi giờ hiện tại của thiết bị (Android) hoặc phiên bản <java.home> / lib mặc định (JVM only).”

Thư viện cũng được lấy cảm hứng từ [ LazyThreeTenBp](https://github.com/gabrielittner/lazythreetenbp). Tài liệu rất tốt và dự án rất dễ sử dụng. Tác giả, [Zac Sweers](https://medium.com/@ZacSweers), cũng đã viết một bài báo về lib. Nó được phát hành theo giấy phép Apache 2.0.


Cám ơn các bạn đã theo dõi, hy vọng sẽ giúp ích cho các bạn trong quá trình phát triển Android app.

Link tham khảo:
https://medium.com/better-programming