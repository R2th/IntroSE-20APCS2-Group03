Năm 2020 đã qua, chúng ta hãy cùng ngồi điểm lại một số repo hay về Android trong năm vừa qua nhé . Và cùng đón 2021 nhiều niềm vui, may mắn hơn nha :heart_eyes:

# 1. Pokedex
[Pokedex](https://github.com/skydoves/Pokedex) là một dự án demo giới thiệu kỹ thuật stack vs mô hình MVVM và repository pattern.

![](https://miro.medium.com/max/359/0*LPI49y2qQyUB4HcA.gif)

Dự án này được viết bằng Kotlin, sử dụng `Coroutines` cộng với `Flow` cho các tác vụ bất đồng bộ và sử dụng `OkHttp` và `Retrofit`.
Trên thực tế, có thể nói rằng không có sự khác biệt giữa dự án này và các dự án tương tự khác. Tuy nhiên, có một điểm khác biệt lớn. Nó sử dụng `Dagger Hilt` được giới thiệu gần đây làm DI framework. Vì vậy, nếu bạn muốn tìm hiểu Hilt trong một tình huống thực tế, thì dự án là tốt để thực hiện. Giao diện bắt mắt, hiệu ứng đẹp cũng là một điểm cộng của Pokedex. Nó có tài liệu khá đầy đủ  và được phát hành theo giấy phép Apache 2.0\

https://github.com/skydoves/Pokedex

Ngoài ra thì bên skydove còn có 1 ứng dụng pokedex khác là Pokedex AR . Nghe oai chưa, sử dụng công nghệ thực tại tăng cường AR luôn nha . Các bạn có thể tham khảo tại đây : https://github.com/skydoves/Pokedex-AR

# 2. Kotlin Coroutines — Use Cases on Android
Nếu bạn chưa bắt đầu sử dụng Coroutines và bạn muốn nắm bắt nó một cách nhanh chóng, thì dự án này là dành cho bạn. Theo tài liệu, nó giống như mộ "sân chơi” nơi bạn có thể “nhanh chóng tra cứu và trải nghiệm với các phiên bản Android Coroutine khác nhau. Trong `playground` package, bạn có thể tìm hiểu các ví dụ về Coroutines chạy trực tiếp trên JVM. ”
![](https://miro.medium.com/max/700/0*TMhvUbwMx5nJt9_0)

File README chứa rất nhiều ví dụ, từ một request mạng đơn lẻ thực hiện khá đơn giản đến các phép tính phức tạp hơn, tốn kém hơn đến một số Coroutines. Nó thực sự được viết tốt và được giải thích rõ ràng và được cấp phép theo Giấy phép Apache 2.0.

https://github.com/LukasLechnerDev/Kotlin-Coroutine-Use-Cases-on-Android

# 3. AnimatedBottomBar

[AnimatedBottomBar](https://github.com/Droppers/AnimatedBottomBar) cũng cấp một view của bottom bar có thể tùy chỉnh và dễ sử dụng với các hình ảnh động đẹp mắt.
![](https://miro.medium.com/max/700/0*OhzfWwh2CRRtjSz2.gif)


Thư viện này rất đặc biệt. Nó có tài liệu thực sự toàn diện với nhiều mẫu sử dụng. Nó ở phiên bản 1.0. + Và hỗ trợ API 16+. Nó được phát hành theo giấy phép MIT, vì vậy đừng quên đề cập đến tác giả trong code của bạn.

https://github.com/Droppers/AnimatedBottomBar
# 4. Motion Toast
Motion Toast là một thư viện sử dụng Kotlin cung cấp cái chế độ toast vô cùng đẹp mắt. Không còn những dùng thông báo đơn điệu, Bạn sẽ có những dòng thông báo nhiều màu sắc và hiệu ứng bắt mắt . 
![](https://miro.medium.com/max/690/0*2KiRo2A52kRZ5HdG.gif)

Thư viện cung cấp năm loại `toast` , với khả năng tùy chỉnh:
* Thời gian,
* Chủ đề (sáng / tối),
* Phong cách (motion hoặc là color motion toast)
Tài liệu là tốt và đầy đủ các ví dụ. Cách sử dụng rất dễ dàng. Nó hỗ trợ API 21 + và được phát hành theo giấy phép MIT.

https://github.com/Spikeysanju/MotionToast

# 5. Cycler
Cycler là một thư viện thú vị khác từ [Square Engineering](https://medium.com/@SquareEng). Tài liệu nói rằng nó "cho phép bạn dễ dàng định cấu hình Android RecyclerView theo một cách khai báo theo cách ngắn gọn."

Thư viện đang ở phiên bản 0.1.4, vì vậy tôi không đề xuất nó cho code production . Tuy nhiên, nó đại diện cho một cách tiếp cận thực sự tốt để triển khai adapter và quản lý RecyclerViews. Điều thú vị là tài liệu nói rằng
> “You can ask the API to create the RecyclerView object for you — using the `create` method – or configure an existing instance – through the `adopt` method. The latter is useful if you already have a layout which the recycler view is part of.”
> 
> Bạn có thể yêu cầu API để tạo ra một đối tượng RecyeclerView cho mình - sử dụng phương thức `create` hoặc là config lại thông qua `adopt`. Phương thức sau thì nghe vẻ "phê" hơn vì bạn có thể tinh chỉnh ngay trên cái sẵn có của mình.

Tài liệu là toàn diện. Dự án chứa một ứng dụng giới thiệu và được phát hành theo giấy phép Apache 2.0.

https://github.com/square/cycler

# 6. Zoom Recycler Layout
Tiếp tục với RecyclerView. `Zoom Recycler Layout` là một thư viện hoạt ảnh thu phóng tuyệt đẹp dành cho các mục RecyclerView được viết bằng Kotlin.

![](https://miro.medium.com/max/600/0*9p0J0X-Qzy1tf41_.gif)

Trên thực tế, đây là một lớp mở rộng `LinearLayoutManager` và ghi đè hai hàm: `scrollVerentlyBy()` và `scrollHorizontallyBy()`. Tuy nhiên, bạn có thể coi nó như một nguồn cảm hứng cho các danh sách dọc hoặc ngang bắt mắt. Dự án được phát hành theo giấy phép Apache 2.0 và hỗ trợ API 11+.

https://github.com/Spikeysanju/ZoomRecylerLayout
# 7. Accompanist
Accompanist là một nhóm các thư viện chứa một số tiện ích mà[ Chris Banes](https://medium.com/@chrisbanes) đã tạo ra và sao chép một số các dự án sử dụng [Jetpack Compose](https://developer.android.com/jetpack/compose).
![](https://miro.medium.com/max/700/0*GfO-F4gbdyBr3gwR.png)
Hiện tại, nó tích hợp:
* Material design components theme
* Coil 

Nếu bạn định sử dụng Jetpack Compose và muốn có một chủ đề thiết kế material design hoặc tải hình ảnh bắt mắt với Coil, thì dự án này là dành cho bạn. Nó có tài liệu toàn diện và được phát hành theo giấy phép Apache 2.0.
https://github.com/chrisbanes/accompanist

# 8. JetpackComposeCalculator
[JetpackComposeCalculator](https://github.com/ahmedrizwan/JetpackComposeCalculator) là một ví dụ thú vị về nơi có thể sử dụng Accompanist. [Ahmed Rizwan](https://medium.com/@ahmedrizwan) đã clone app máy tính Android 10 bằng [Jetpack Compose](https://developer.android.com/jetpack/compose).
![](https://miro.medium.com/max/700/1*KD7Riybg14Ts5R3WWk3oew.png)

README thực sự rất ngắn, nhưng tác giả đã giải thích ý tưởng chính và cách tiếp cận trong[ bài viết](https://proandroiddev.com/jetpack-compose-calculator-ui-4dfa2ab9048e) của mình. Bạn có thể coi dự án này như một cách học Jetpack Compose, dựa trên các ví dụ trông đáng yêu. Không có thông tin về phiên bản. Nó được phát hành theo giấy phép MIT. Nó đáng để ta ngó qua.
https://github.com/ahmedrizwan/JetpackComposeCalculator
# 9. ComposeClock
Lại là compose nhưng lần này là với `Clock` chứ không phải `Calculator` nữa. Project này dựa trên phiên bản đã của tác giả đã chiến thắng ở cuộc thi  [Flutter clock challenge](https://flutter.dev/clock). Nhưng lần này là ở jecpack compose version.

![](https://miro.medium.com/max/600/0*IeN5kBCwZ-jmenVR.gif)

https://github.com/adibfara/ComposeClock\
# 10. Compose Academy
![](https://miro.medium.com/max/700/0*-lZ6dkOel-B-hOBf.png)
Đây là một tài nguyên miễn phí cung cấp các đoạn trích và sample code về cách sử dụng Jetpack Compose cho nền tảng Android.
Theo tài liệu, "dự án được phân chia theo API, với mục đích loại bỏ sự khó khăn khi cố gắng tìm mẫu mà bạn muốn khám phá."
Joe  Birch chia tài liệu thành tám phần chính:
* Animation
* Core
* Foundation
* Graphics
* Layout
* Material
* Resource
* Test

Repo thay đổi theo thời gian. Nó chắc chắn đáng để theo dõi nếu bạn muốn đi đúng hướng với những điều mới lạ từ Jetpack Compose. Rất khuyến khích nha !
https://github.com/hitherejoe/ComposeAcademy-Playground
# 11. ProtonMail
Hãy quay lại với  Jaode nha với 49,2% trong code. Vài tháng trước, ProtonMail đã tạo nguồn mở ứng dụng Android của mình.

 ![](https://miro.medium.com/max/512/0*aHt50-AwIWgfxytr)
 
Đây là một nguồn tốt để kiểm tra cách tiếp cận thiết kế của một ứng dụng Android thực sự an toàn. Dự án có tài liệu khá toàn diện với hướng dẫn sử dụng và cách thiết lập ứng dụng. Tất cả đều được phát hành theo Giấy phép GPL-3.0.

https://github.com/ProtonMail/proton-mail-android

# 12. kotlin-android-template
**kotlin-android-template** là một template  Github đơn giản cho phép bạn tạo một dự án Android / Kotlin có thể được thiết lập và chạy trong vài giây. Tài liệu nói rằng “Template này tập trung vào việc cung cấp một dự án với phân tích tĩnh và CI đã có sẵn 100% với  Kotlin.”
Nó hỗ trợ / bao gồm:
* 3 mô-đun mẫu (Android app , thư viện Android, thư viện Kotlin)
* Thử nghiệm Espresso, Instrumentation và JUnit test 
* 100%  Gradle Kotlin DSL
* Dependency versions được quản lý qua `buildSrc`
* Thiết lập CI với GitHub Actions
* Phân tích  Kotlin qua `ktlint` và `detekt`
* Đã sẵn sàng xuất bản
* Issues template (báo cáo lỗi cộng với tính năng request)
* Pull request template


Nếu bạn đang vội hoặc đang chuẩn bị một nhiệm vụ tuyển dụng, có lẽ repo này rất đáng để thử. Tuy nhiên, nó được phát hành theo giấy phép của MIT.

https://github.com/cortinico/kotlin-android-template

# 13. ThemedToggleButtonGroup

ThemedToggleButtonGroup là `toggle buttons` có thể tùy chỉnh bên trong FlexboxLayout.

![](https://miro.medium.com/max/600/0*TVkUWGCNaH9fHnYZ.gif)

Document của nó miêu tả là : 
> “ThemedToggleButtonGroup is a highly modular lightweight toggle button library for Android. It can be configured for single selection or multi selection. For multi-selection the minimum/maximum amount of buttons that are required/enabled can be specified. Icons can be added. Selection includes a fun press and circular reveal animation.”
> 
> ThemedToggleButtonGroup là một thư viện nhẹ theo về toggle button được mô-đun hóa cao dành cho Android. Nó có thể được cấu hình để lựa chọn một hoặc nhiều lựa chọn. Đối với nhiều lựa chọn, có thể chỉ định số lượng nút tối thiểu / tối đa được yêu cầu / bật. Các icon có thể được thêm vào. Lựa chọn bao gồm fun press  và  circular reveal animation.

README thực sự tốt và đầy đủ các ví dụ. Dự án hỗ trợ API 14+, hiện có phiên bản 1.3.1 và được phát hành theo giấy phép MIT.
https://github.com/Bryanx/themed-toggle-button-group

# 14. CleanRxArchitecture
CleanRXArchitecture là một dự án dựa trên các nguyên tắc clean architecture và MVI (model view intent) cho presentation layer.
![](https://miro.medium.com/max/700/0*22CsRLVlEET0POhN.png)

Ứng dụng showcase này là một dự án multimodule được kết nối với API GitHub cho phép tác giả liệt kê tất cả các kho lưu trữ công khai của họ. Nó có thể được sử dụng khi bị ngắt kết nối, với một bản sao lưu của tất cả dữ liệu được lưu trữ trong cơ sở dữ liệu (Room). Dark mode cũng có sẵn. Toàn bộ ứng dụng được bao phủ bởi unit test, UI test  and functional/integration (= use case) tests.. Nó sử dụng các lib như Dagger 2, RxJava 3, Room và AndroidX.

Trong lib này, bạn cũng sẽ kiểm tra các công cụ khác nhau và các phương pháp hay (với Git và hơn thế nữa).
Tài liệu là toàn diện. Nó được phát hành theo giấy phép Apache 2.0.

https://github.com/lopspower/CleanRxArchitecture

# 15. LightProgress
`LightProgress` là bản triển khai Light animation trên Android của [Oleg Frolov](https://dribbble.com/shots/5649494-Light-Loading-Progress).

![](https://miro.medium.com/max/320/0*L8YEfmZ4ru_ztSys.gif)

Dự án cũng được giải thích rõ ràng trên Medium. Bạn có thể coi nó như một màn trình diễn, cách tạo ra loại hoạt ảnh này. Nó có bốn loại thuộc tính:
* `android:text `(string) -> default "Loading"
* `android:textSize` (dimension) -> default 56sp
* `android:textColor` (color) -> default #484848
* `app:light_color` (color) -> default #FFFFFF


 Hơn nữa, nó hỗ trợ API 16+, ở phiên bản 1.0.1 và được phát hành theo giấy phép Apache 2.0.
https://github.com/bitvale/LightProgress

# 16. Corona Warn App
Chúng ta đang sống trong thời đại COVID, vì vậy không thể bỏ lỡ ứng dụng Corona Warn ở đây rồi.
> “The goal of this project is to develop the official Corona-Warn-App for Germany based on the exposure notification API from Apple and Google. The apps (for both iOS and Android) use Bluetooth technology to exchange anonymous encrypted data with other mobile phones (on which the app is also installed) in the vicinity of an app user’s phone. The data is stored locally on each user’s device, preventing authorities or other parties from accessing or controlling the data. This repository contains the native Android implementation of the Corona-Warn-App. Visit our FAQ page for more information and common issues.” — Corona Warn App documentation
> 
> Mục tiêu của dự án này là phát triển Corona-Warn-App chính thức cho Đức dựa trên API thông báo phơi nhiễm từ Apple và Google. Các ứng dụng (cho cả iOS và Android) sử dụng công nghệ Bluetooth để trao đổi dữ liệu được mã hóa ẩn danh với điện thoại di động khác (trên đó ứng dụng cũng được cài đặt) ở gần điện thoại của người dùng ứng dụng. Dữ liệu được lưu trữ cục bộ trên thiết bị của mỗi người dùng, ngăn cơ quan chức năng hoặc các bên khác truy cập hoặc kiểm soát dữ liệu. Kho lưu trữ này chứa triển khai Android gốc của Corona-Warn-App.....

Bạn thử xem code base của con này với BlueZone xem sao nhé =))

![](https://github.com/corona-warn-app/cwa-app-android/raw/main/docs/images/Architecture_Overview_v1.svg)
Ứng dụng được tạo bởi các nhà phát triển SAP và Deutsche Telekom. Ngoài ra còn có tài liệu tuyệt vời giải thích nhiều khía cạnh của dự án này, được phát hành theo giấy phép Apache 2.0.
https://github.com/corona-warn-app/cwa-app-android

# 17. KaMP Kit
KaMP Kit là một bộ sưu tập code và tools được thiết kế để giúp bạn hoặc nhóm di động của bạn bắt đầu nhanh chóng với Kotlin Multiplatform.
![](https://miro.medium.com/max/700/0*OLaxSxNYWYk3Kl0m.png)

Bạn có thể coi nó như một nguồn tài liệu tuyệt vời để học hỏi. KaMP Kit được thiết kế để giúp bạn vượt qua trở ngại đầu tiên đó. Từ tài liệu:
> “What’s Included?
> 1. The Starter App — A native mobile KMP app with a small functional feature set.
> 2. Educational Resources — Introductory information on KMP and Kotlin/Native.
> 3. Integration Information — If you’re integrating shared code into an existing application, guides to assist with that effort.”

> 1. Ứng dụng Starter - Một ứng dụng KMP dành cho android native  với một bộ tính năng chức năng nhỏ.
> 2. Tài nguyên Giáo dục - Thông tin giới thiệu về KMP và Kotlin / Native.
> 3. Thông tin tích hợp - Nếu bạn đang tích hợp code được chia sẻ vào một ứng dụng hiện có, huóng dẫn này giúp bạn giảm effort đó. ”

https://github.com/touchlab/KaMPKit

# 18. Kissme
`Kissme` là tên viết tắt của `Kotlin Secure Storage Multiplatform`. `Kissme` có thể được tích hợp liền mạch trong các dự án Kotlin được xây dựng với các plugin Kotlin Multiplatform, Kotlin / Native và Kotlin Android. Nó cho phép lưu trữ dữ liệu khóa-giá trị trong các mô-đun mã chung mà không cần thêm bất kỳ mã soạn sẵn nào.
Hiện tại, thư viện hỗ trợ các nền tảng sau:
* Android (API 23+)
* iOS (mục tiêu iOS_arm64 và iOS_x64)

Tài liệu thực sự toàn diện, nhưng vẫn còn đang phát triển , dự án đang ở phiên bản 0.2.5. Nó được phát hành theo giấy phép Apache 2.0.

https://github.com/netguru/Kissme

# 19. DeterminateProgressView
DeterminateProgressView là một circular progress view  có thể tùy chỉnh cao và dễ tạo kiểu.

![](https://miro.medium.com/max/341/0*TuXroUHMECqId6F3)

Tài liệu nói rằng "nó được xây dựng bằng Kotlin và hỗ trợ các tùy chọn tùy chỉnh nặng và thuận tiện để tạo animation tiến trình một cách tự động."
Bạn có thể sử dụng các hàm XML và Kotlin / Java để điều chỉnh nó. Ngoài ra, có một ứng dụng [demo](https://github.com/owl-93/Determinate-Progress-View-Demo) rất mạnh mẽ. README bao gồm tất cả các cách tạo kiểu cho tiện ích con, cũng như mô tả tuyệt vời về tất cả các thuộc tính văn bản và XML. Bạn cần phải kiểm tra nó cho chắc chắn. Dự án được phát hành theo giấy phép MIT và ở phiên bản 1.4.0.

https://github.com/owl-93/Determinate-Progress-View-Demo
# 20. Venom
`Venom` là một công cụ nhẹ giúp đơn giản hóa việc kiểm tra kịch bản quá trình chết cho ứng dụng Android.
![](https://miro.medium.com/max/700/0*eJvaUFHJFNSj3DHn)

Dự án được tạo ra để kiểm tra các ứng dụng chống lại các hành vi thời gian chạy tích cực của Android. Đôi khi, Android chấm dứt các ứng dụng nền trong khi người dùng không tương tác với các ứng dụng khác. Trong trường hợp này, tất cả các hoạt động sẽ bị phá hủy cùng với các đối tượng phạm vi ứng dụng và các tác vụ nền. Do đó, chúng ta phải luôn đảm bảo rằng các ứng dụng của chúng tôi có giao diện nhất quán và được kiểm tra theo kịch bản quá trình chết.
Venom khá dễ sử dụng và có tài liệu hướng dẫn khá tốt. Nó được phát hành theo giấy phép MIT. Nó hiện đang ở phiên bản 0.3.1.
https://github.com/YarikSOffice/venom

# 21. RateBottomSheet
`RateBottomSheet` là một thư viện giúp bạn quảng cáo ứng dụng Android của mình bằng cách nhắc người dùng xếp hạng ứng dụng của bạn trong trang dưới cùng.
![](https://miro.medium.com/max/480/0*8mWWCuzYjRwNtSZ-.gif)

Như bạn có thể biết, Google đã phát hành một API mới cho các [bài đánh giá](https://android-developers.googleblog.com/2020/08/in-app-review-api.html) trong ứng dụng. Nó thực sự tuyệt vời nhưng chỉ hoạt động từ API 21. Nếu vì một số lý do, bạn không thể sử dụng API này, bạn có thể thử thư viện `RateBottomSheet`. Nó hỗ trợ API 16+ và được thiết kế tốt. Dự án chứa một ứng dụng mẫu, có tài liệu được viết tốt và được phát hành theo giấy phép Apache 2.0.

https://github.com/lopspower/RateBottomSheet
# 22. Decorator
Decorator là một thư viện giúp tạo lề và ngăn chia trong RecyclerView.
![](https://miro.medium.com/max/700/1*c1pbq1UIjqVS5QNOvVwSIQ.png)

Ý tưởng của dự án này cũng là sắp xếp nhiều đồ trang trí và áp dụng nó cho RecyclerView. Nó khá hữu ích. Hơn nữa, nó có tài liệu thực sự toàn diện và có một dự án mẫu giới thiệu cách sử dụng.
Nó ở phiên bản 1.2.0 và được phát hành theo giấy phép Apache 2.0.

https://github.com/rubensousa/Decorator
# 23. CornerCutLinearLayout
`CornerCutLinearLayout` là một lib tuyệt vời cho phép cắt các góc LinearLayout (parent and children), các đổ bóng phức tạp và các đường phân chia độc đáo.
![](https://miro.medium.com/max/700/1*AKCQ72U4op0sxgy9ZSsMOw.png)

`LinearLayout` extension này thực sự được ghi chép đầy đủ.  Ngoài ra, README thật tuyệt vời.
Ngoài ra, bằng cách sử dụng các thuộc tính có sẵn và các nhà cung cấp tùy chỉnh, những vết cắt bạn thực hiện với CornerCutLinearLayout có thể được chuyển thành các bản cắt có hình dạng, kích thước khác nhau, v.v.

Dự án được phát hành theo giấy phép Apache 2.0 và ở phiên bản 1.0.1.
https://github.com/Devlight/CornerCutLinearLayout


# 24. Recycling Center
Theo như tài liệu mô tả thì : 
> “Recycling Center is a library designed to support a pattern: reactive, unidirectional data flow using immutable ViewModels. It combines the reactive data flow of RxJava with the efficient UI of a RecyclerView, and supports UI composition via Sections of Views and ViewModels.”
> 
> Recycling Center là một thư viện được thiết kế để support pattern: reactive, unidirectional data flow  bằng cách sử dụng các ViewModels bất biến. Nó kết hợp  reactive data flow của RxJava với UI hiệu quả của RecyclerView và hỗ trợ thành phần UI thông qua Sections of Views và ViewModels.

![](https://miro.medium.com/max/698/0*Blw6b5PDVsRNz-VH.png)

Cách tốt nhất để kiểm tra cách thức hoạt động của thư viện này là đi đến code mẫu và hiểu cách hoạt động của nó. Ngoài ra, README khá tốt. Dự án được phát hành theo Giấy phép BSD-3-Khoản.
https://github.com/Snapchat/recycling-center

# 25. TickTock
TickTock là một thư viện quản lý dữ liệu múi giờ cho các API `java.time` của JVM và Android trong Java 8+. Tài liệu cho biết
> “Use this library if you want to bundle timezone data directly with your application rather than rely on the current device timezones (Android) or the default <java.home>/lib version (JVM only).”
> 
> Sử dụng thư viện này nếu bạn muốn nhóm dữ liệu múi giờ trực tiếp với ứng dụng của mình thay vì dựa vào múi giờ hiện tại của thiết bị (Android) hoặc phiên bản <java.home>/ lib mặc định ( JVM)

Thư viện cũng được lấy cảm hứng từ [LazyThreeTenBp](https://github.com/gabrielittner/lazythreetenbp). Tài liệu tốt và bản thân dự án rất dễ sử dụng. Tác giả, [Zac Sweers](https://medium.com/@ZacSweers), cũng đã viết một bài viết về lib. Nó được phát hành theo giấy phép Apache 2.0.
https://github.com/ZacSweers/ticktock
# Tổng kết
Trên đây là 25 dự án và thư viện được đánh giá là tốt  của nửan đầu năm 2020 , hy vọng nó sẽ truyền cảm hứng cho mọi người. Ứng dụng một hai phần nào đó vào project của mình . Hay thậm chí tự mình làm theo ý tưởng của nó cũng được 🤣🤣..
Đồng thời hãy chờ tiếp phần sau của nửa sau năm 2020 nhé . Cũng có thế tham khảo các repo hay  của năm 2019 tại [link](https://viblo.asia/p/30-thu-vien-va-du-an-android-tot-nhat-nam-2019-LzD5d1doKjY) này nha 

Bài viết được dịch từ trang [Medium](https://medium.com/better-programming/25-best-android-libraries-projects-of-2020-summer-edition-dfb030a7fb0a) và có thêm chút xàm xí của mình nữa. Có gì sai xót mong mọi người góp ý 😍😍😍.