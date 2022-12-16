Chào các bạn, trong bài viết này, chúng ta sẽ cùng đi qua danh sách top 25 dự án trong năm 2020 đã được tổng hợp ở bên dưới, chúng là những dự án thực sự xứng đáng để kiểm tra, thử nghiệm và thậm chí áp dụng cho các dự án của bạn. Hãy bắt đầu nào.
### 1. Pokedex
[Pokedex](https://github.com/skydoves/Pokedex)  là một dự án demo, giới thiệu một stack công nghệ hiện đại với kiến trúc MVVM và repository pattern.

![](https://images.viblo.asia/1e8b5e31-47ff-44e1-89a8-9fcb32fa8e8d.png)

Project được viết bằng Koltin, sử dụng [Coroutines](https://github.com/Kotlin/kotlinx.coroutines) cộng với [Flow](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/) cho các asynchronous tasks (tác vụ không đồng bộ) và các libs networking  tiêu chuẩn, OkHttp và Retrofit.

Trên thực tế, có thể nói rằng không có sự khác biệt giữa dự án này và các dự án tương tự khác. Tuy nhiên, có một điểm khác biệt lớn. Nó sử dụng Dagger [Hilt](https://dagger.dev/hilt/) được giới thiệu gần đây như một DI framework. Vì vậy, nếu bạn muốn tìm hiểu Hilt trong một tình huống thực tế, thì dự án này rất tốt. Nó có tài liệu khá tốt và được cấp phép theo Apache license 2.0 

Github: https://github.com/skydoves/Pokedex 
### 2. Kotlin Coroutines — Use Cases on Android
Nếu bạn chưa từng sử dụng [Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) và bạn muốn nắm bắt nó một cách nhanh chóng, thì dự án này là dành cho bạn. Theo tài liệu, nó giống như một “playground project”, nơi bạn có thể “nhanh chóng tra cứu và làm quen với các triển khai Android Coroutine khác nhau. Trong package *playground* , bạn có thể tìm hiểu các ví dụ run trực tiếp trên JVM của Coroutines .
![](https://images.viblo.asia/cc07495f-a754-48e0-a9a7-6987654b1b7e.png)

File README chứa rất nhiều ví dụ, từ một single network request được thực hiện khá đơn giản đến các phép tính phức tạp hơn, tốn kém hơn. Nó thực sự được viết tốt và có giải thích rõ ràng. Nó được cấp phép theo Apache License 2.0.

Github: https://github.com/LukasLechnerDev/Kotlin-Coroutine-Use-Cases-on-Android 
### 3. AnimatedBottomBar
AnimatedBottomBar là bottom bar view có thể tùy chỉnh và dễ sử dụng với các animation khá đẹp mắt.

![](https://images.viblo.asia/46a8f66c-5de6-49a0-8ed4-f4e0d74ad1ff.gif)
![](https://images.viblo.asia/67f61e26-f946-497c-9af5-a18a13106008.gif)

Library là đáng chú ý. Nó có tài liệu thực sự toàn diện với nhiều mẫu sử dụng. 
Nó ở phiên bản 1.0. + Và hỗ trợ API 16+. Nó được release theo MIT license, vì vậy đừng quên đề cập đến tác giả trong code của bạn.

Github: https://github.com/Droppers/AnimatedBottomBar 
### 4. Motion Toast
Motion Toast là một thư viện toast chuyển động đa năng đẹp mắt trong Android và sử dụng Kotlin.

![](https://images.viblo.asia/2c99cc15-cf01-4719-853a-83cebd32038b.gif)

Thư viện cung cấp năm loại toast, với khả năng tùy chỉnh:
* duration time,
* theme (light/dark),
* styles (motion hoặc color motion toasts)

Tài liệu tốt và có đầy đủ các ví dụ. Cách sử dụng rất dễ dàng. Nó hỗ trợ API 21 + và được released theo MIT license.

Github: https://github.com/Spikeysanju/MotionToast 
### 5. Cycler
Cycler là một thư viện thú vị khác đến từ Square Engineering. Tài liệu nói rằng nó “cho phép bạn dễ dàng cấu hình Android RecyclerView theo một cách khai báo ngắn gọn.”

Nó được triển khai theo các quy tắc, nơi bạn khai báo code với các strong types và mọi thứ phải dễ dàng (inflating rows, tạo các common custom items, v.v.).
Thư viện đang ở phiên bản 0.1.4, vì vậy chúng ta sẽ không đề xuất nó cho production code. Tuy nhiên, nó đại diện cho một cách tiếp cận thực sự tốt để implement adaptersvà quản lý RecyclerViews. 

Điều thú vị là tài liệu nói rằng “Bạn có thể yêu cầu API tạo đối tượng RecyclerView cho bạn - bằng cách sử dụng create method - hoặc cấu hình một instance hiện có - thông qua adopt method. Cái sau rất hữu ích nếu bạn đã có layout  mà recycler view là một phần của nó. "

Tài liệu thì toàn diện. Dự án chứa một ứng dụng giới thiệu và được release theo Apache license 2.0.

Github: https://github.com/square/cycler  
### 6. Zoom Recycler Layout
Hãy tiếp tục với RecyclerView. Zoom Recycler Layout là một thư viện thu phóng tuyệt đẹp dành cho các mục RecyclerView và được viết bằng Kotlin.

Trên thực tế, đây là một class extends LinearLayoutManager và overrides hai hàm: scrollVerticallyBy() và scrollHorizontallyBy(). Tuy nhiên, bạn có thể coi nó như một nguồn cảm hứng gợi ý cho việc hiển thị các danh sách dọc hoặc ngang một cách bắt mắt.

Dự án được release theo License Apache 2.0 và hỗ trợ API 11+.

Github: https://github.com/Spikeysanju/ZoomRecylerLayout 
### 7. Accompanist
Accompanist là một nhóm các thư viện chứa một số tiện ích mà Chris Banes đã tạo ra và sao chép xung quanh các dự án sử dụng Jetpack Compose.

![](https://images.viblo.asia/20cf4615-cfe6-4d7c-ace0-e14beb8f31fb.png)

Hiện tại, nó tích hợp:
* Material design components theme
* Coil image-loading composables
Nếu bạn định sử dụng Jetpack Compose và muốn có một material design theme hoặc tải hình ảnh bắt mắt với Coil, thì dự án này là dành cho bạn.
Nó có tài liệu toàn diện và được  release theo License Apache 2.0.

Github: https://github.com/chrisbanes/accompanist 
### 8. JetpackComposeCalculator
Jetpack Compose Calculator là một ví dụ thú vị về nơi có thể sử dụng Accompanist . Ahmed Rizwan đã clone UI máy tính trên Android 10 bằng Jetpack Compose.

![](https://images.viblo.asia/e92043fc-9435-4682-b937-adfe4b7280a7.png)

README thực sự rất ngắn, nhưng tác giả đã giải thích ý tưởng chính và cách tiếp cận trong bài viết của mình, vì vậy đây là một khởi đầu tốt. Bạn có thể coi dự án này như một cách học Jetpack Compose, dựa trên những ví dụ đáng yêu. Không có thông tin về phiên bản. Nó được release theo MIT license và nó đáng để kiểm tra.

Github: https://github.com/ahmedrizwan/JetpackComposeCalculator 
### 9. ComposeClock
Bạn có nhớ [ Flutter clock challenge](https://flutter.dev/clock) này không? Nếu vậy, bạn cũng nhớ ai và dự án nào đã thắng. Dựa trên thiết kế đó, một tác giả của ComposeClock đã chuẩn bị một phiên bản Jetpack Compose.

![](https://images.viblo.asia/14499b45-2433-4a8e-b733-f08295f4ba86.PNG)

Không có README nào, chỉ có code và license Apache 2.0. 

Github: https://github.com/adibfara/ComposeClock  
### 10. Compose Academy
Dưới dạng tóm tắt về các dự án được tạo bằng cách sử dụng Jetpack Compose, bạn cần phải xem Compose Academy Playground của Joe Birch.

![](https://images.viblo.asia/8a5a4009-13aa-4692-b77e-6141167cb106.png)

Đây là tài nguyên miễn phí cung cấp các đoạn trích và mẫu thực tế về cách sử dụng Jetpack Compose cho nền tảng Android.
Theo tài liệu, “dự án được phân chia theo API, với mục đích giúp bạn loại bỏ các khó khăn khi bạn đang cố gắng tìm mẫu mà bạn muốn khám phá.”
Joe chia tài liệu thành tám phần chính:
* [Animation](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/animation)
* [Core](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/core)
* [Foundation](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/foundation)
* [Graphics](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/graphics)
* [Layout](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/layout)
* [Material](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/material)
* [Resource](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/main/java/co/joebirch/composeplayground/resource)
* [Test](https://github.com/hitherejoe/ComposeAcademy-Playground/blob/master/app/src/androidTest/java/co/joebirch/composeplayground)

Repo này tồn tại và thay đổi theo thời gian. Nó chắc chắn đáng để theo dõi nếu bạn muốn đi đúng hướng với những điều mới lạ từ Jetpack Compose. Recommended!

Github: https://github.com/hitherejoe/ComposeAcademy-Playground
### 11. ProtonMail
Hãy quay trở lại với Java cũ tốt (chiếm 49,2%). Vài tháng trước, ProtonMail đã open-source  ứng dụng Android của nó.

![](https://images.viblo.asia/620df559-2481-4610-96ef-d6d0aa56c9ad.png)

Đây là một nguồn tốt để kiểm tra cách tiếp cận design của một ứng dụng Android thực sự an toàn. Dự án có tài liệu khá toàn diện với hướng dẫn và cách thiết lập ứng dụng. Tất cả đều được release theo License GPL-3.0.

Github: https://github.com/ProtonMail/proton-mail-android
### 12. kotlin-android-template
kotlin-android-template là một template Github đơn giản cho phép bạn tạo một dự án Android / Kotlin có thể bắt đầu và chạy trong vài giây. Tài liệu nói rằng “template này tập trung vào việc cung cấp một dự án với phân tích tĩnh và tích hợp liên tục đã có sẵn 100% trong Kotlin.”

Nó hỗ trợ / bao gồm:

* ba sample modules (Android app, Android library, Kotlin library)
* Sample Espresso, Instrumentation, và JUnit tests
* 100% cài đặt Gradle Kotlin DSL 
* Dependency versions được quản lý thông qua buildSrc
* CI setup với GitHub Actions
* Kotlin static analysis thông qua ktlint và detekt
* Publishing ready
* Issues template (bug report cộng với tính năng request)
* Pull request template

Nếu bạn đang vội hoặc đang chuẩn bị một recruitment task, có lẽ repo này rất đáng để thử. Tuy nhiên, nó đượcreleased theo license của MIT

Github: https://github.com/cortinico/kotlin-android-template 
### 13. ThemedToggleButtonGroup
ThemedToggleButtonGroup là các nút chuyển đổi có thể tùy chỉnh bên trong FlexboxLayout.

![](https://images.viblo.asia/dd8ae735-aa30-4d95-9998-9452bee96434.gif)
![](https://images.viblo.asia/599a6681-eb33-4f71-9689-6918e80817e9.gif)

Tài liệu đã mô tả nó như thế này:
“ThemedToggleButtonGroup là một thư viện toggle button theo mô-đun cao dành cho Android. Nó có thể được cấu hình để lựa chọn một hoặc nhiều selection. Đối với nhiều selection, có thể chỉ định số lượng nút tối thiểu / tối đa được yêu cầu / bật. Các biểu tượng có thể được thêm vào. Lựa chọn bao gồm một press vui nhộn và animation hiển thị vòng tròn. "

README thực sự tốt và đầy đ các ví dụ. Dự án hỗ trợ API 14+, hiện có phiên bản 1.3.1 và được released theo license MIT.

Github: https://github.com/Bryanx/themed-toggle-button-group 
### 14. CleanRxArchitecture
CleanRXArchitecture là một dự án dựa trên các nguyên tắc của clean architecture and MVI (model view intent) cho presentation layer.

![](https://images.viblo.asia/ccd2403f-9687-4aff-b458-54f2b51a83a9.png)

Ứng dụng demo là một dự án nhiều module được kết nối với GitHub API cho phép tác giả liệt kê tất cả các repository công khai của họ. Nó có thể được sử dụng khi bị ngắt kết nối, với một bản sao lưu của tất cả dữ liệu được lưu trữ trong database (Room). Dark mode cũng có sẵn. Toàn bộ ứng dụng được bao phủ với các unit, UI và functional/integration (= use case). Nó sử dụng các lib như Dagger 2, RxJava 3, Room và AndroidX.

Trong repository này, bạn cũng sẽ xem các tools khác nhau và các phương pháp hay (với Git và hơn thế nữa).

Github: https://github.com/lopspower/CleanRxArchitecture 
### 15. LightProgress
LightProgress là một triển khai animation Light trên Android của Oleg Frolov.

![](https://images.viblo.asia/f39e058b-93e0-4e8e-b773-33e1d856a76c.gif)

Dự án này cũng được giải thích rõ ràng trên [Medium](https://android.jlelse.eu/the-power-of-android-porter-duff-mode-28b99ade45ec). Bạn có thể coi nó như một màn giới thiệu, cách tạo ra loại animation này. Nó có bốn loại thuộc tính:

* android:text (string) -> default "Loading"
* android:textSize (dimension) -> default 56sp
* android:textColor (color) -> default #484848
* app:light_color (color) -> default #FFFFFF

Hơn nữa, nó hỗ trợ API 16+, ở phiên bản 1.0.1 và được release theo license Apache 2.0.

Github: https://github.com/bitvale/LightProgress
### 16. Corona Warn App
Chúng ta đang sống trong thời đại COVID, vì vậy không thể bỏ lỡ ứng dụng Corona Warn ở đây.

“Mục tiêu của dự án này là phát triển Corona-Warn-App chính thức cho Đức dựa trên API thông báo phơi nhiễm từ Apple và Google. Các ứng dụng (cho cả iOS và Android) sử dụng công nghệ Bluetooth để trao đổi dữ liệu được mã hóa ẩn danh với điện thoại di động khác (trên đó ứng dụng cũng được cài đặt) ở gần điện thoại của người dùng ứng dụng. Dữ liệu được lưu trữ cục bộ trên thiết bị của mỗi người dùng, ngăn cơ quan chức năng hoặc các bên khác truy cập hoặc kiểm soát dữ liệu. Kho lưu trữ này chứa triển khai Android gốc của Corona-Warn-App. Truy cập FAQ page của chúng tôi để biết thêm thông tin và các vấn đề thường gặp. ” -  Corona Warn App documentation

Ứng dụng được tạo bởi các nhà phát triển SAP và Deutsche Telekom. Ngoài ra còn có tài liệu tuyệt vời giải thích nhiều khía cạnh của dự án này, được released theo license Apache 2.0.

Github: https://github.com/corona-warn-app/cwa-app-android
### 17. KaMP Kit
KaMP Kit là mộtcollection code và tools được thiết kế để giúp bạn hoặc mobile team của bạn bắt đầu nhanh chóng với Kotlin Multiplatform.

![](https://images.viblo.asia/a97904dc-adc8-4f5f-b03e-ede39814d1e3.png)

Bạn có thể coi nó như một nguồn tài liệu tuyệt vời để học. KaMP Kit được thiết kế để giúp bạn vượt qua trở ngại đầu tiên đó. Từ tài liệu:

“Bao gồm những gì?
1. The Starter App — A native mobile KMP app với một bộ tính năng chức năng nhỏ.
2. Educational Resources — Thông tin giới thiệu về KMP và Kotlin/Native.
3. Integration Information — Nếu bạn đang tích hợp code được chia sẻ vào một ứng dụng hiện có, hãy hướng dẫn để hỗ trợ nỗ lực đó”

Github:https://github.com/touchlab/KaMPKit
### 18. Kissme
Kissme là tên viết tắt của Kotlin Secure Storage Multiplatform. Kissme có thể được tích hợp liền mạch trong các dự án Kotlin được xây dựng với các plugin Kotlin Multiplatform, Kotlin / Native và Kotlin Android. Nó cho phép lưu trữ dữ liệu key-value trong các modules code chung mà không cần thêm bất kỳ code soạn sẵn nào.

Hiện tại, thư viện hỗ trợ các nền tảng sau:
Android (API 23+)
iOS (iOS_arm64 and iOS_x64 targets)

Tài liệu thực sự toàn diện, nhưng vẫn còn, dự án đang ở phiên bản 0.2.5. Nó được released theo license Apache 2.0.

Github: https://github.com/netguru/Kissme
### 19. DeterminateProgressView
DeterminateProgressView là một tùy biến cao và easy-to-style circular progress view

![](https://images.viblo.asia/a6c38590-a689-4126-8cb4-8311083b9c0c.png)

![](https//images.viblo.asia/3f96a963-1d97-4b34-9cd9-503d8842a411.png)

Tài liệu nói rằng "nó được xây dựng bằng Kotlin và hỗ trợ các tùy chọn tùy chỉnh nặng và thuận tiện để tạo animate progress  tự động."

Bạn có thể sử dụng các hàm XML và Kotlin / Java để điều chỉnh nó. Ngoài ra, có một ứng dụng demo rất mạnh mẽ. README bao gồm tất cả các cách tạo style cho widget, cũng như mô tả tuyệt vời về tất cả các thuộc tính văn bản và XML. Bạn cần phải kiểm tra nó một cách chắc chắn. Dự án đượcreleased theo license  MIT và ở phiên bản 1.4.0.

Github: https://github.com/owl-93/Determinate-Progress-View 
### 20. Venom
Venom là một tool giúp đơn giản hóa việc kiểm tra process death cho ứng dụng Android của bạn.

![](https://images.viblo.asia/b506d959-1e40-43d3-85bf-29470fdbdcda.png)

Dự án được tạo ra để testing  các ứng dụng chống lại các runtime behaviours tích cực của Android. Đôi khi, Android chấm dứt các ứng dụng nền trong khi người dùng  tương tác với các ứng dụng khác. Trong trường hợp này, tất cả activities bị destroy cùng với các scope objects của ứng dụng và các background task. Sau đó, chúng ta phải luôn đảm bảo rằng các ứng dụng của chúng ta có giao diện nhất quán và được kiểm tra theo kịch bản process death.

Venom khá dễ sử dụng và có tài liệu hướng dẫn khá tốt. Nó được released theo license MIT. Nó hiện đang ở phiên bản 0.3.1.

Github: https://github.com/YarikSOffice/venom
### 21. RateBottomSheet
RateBottomSheet là một thư viện giúp bạn quảng cáo ứng dụng Android của mình bằng cách nhắc người dùng xếp hạng ứng dụng của bạn trong trang dưới cùng.
![](https://images.viblo.asia/aace517d-721a-4884-879a-d6a8f9322812.png)

Như bạn có thể biết, Google đã phát hành một API mới để đánh giá trong ứng dụng. Nó thực sự tuyệt vời nhưng chỉ hoạt động từ API 21. Nếu vì một số lý do, bạn không thể sử dụng API này, bạn có thể thử thư viện RateBottomSheet. Nó hỗ trợ API 16+ và được thiết kế tốt. Dự án chứa một ứng dụng mẫu, có tài liệu được viết tốt và được release theo license Apache 2.0.

Github:https://github.com/lopspower/RateBottomSheet
### 22. Decorator
Decorator là một thư viện giúp margins và dividers trong RecyclerView.

![](https://images.viblo.asia/055bb5a1-3d1c-49c6-8f78-637ce96fa34d.png)

Ý tưởng của dự án này cũng là tạo ra nhiều decorations và áp dụng nó cho RecyclerView. Nó khá hữu ích. Hơn nữa, nó có tài liệu thực sự toàn diện và có một dự án template giới thiệu cách sử dụng.
Nó ở phiên bản 1.2.0 và được release theo license Apache 2.0.

Github:https://github.com/cabriole/Decorator
### 23. CornerCutLinearLayout
CornerCutLinearLayout là một lib tuyệt vời cho phép cắt các góc LinearLayout (parent và children), các shadows phức tạp và các dividers.

![](https://images.viblo.asia/f3babac0-0a3a-4e4e-bb11-ba82ef980122.png)

Phần extension  LinearLayout này thực sự được ghi chép đầy đủ. Thành thật mà nói thì đã lâu không nhìn thấy loại doc Java này. Ngoài ra, README thật tuyệt vời.

Ngoài ra, bằng cách sử dụng các thuộc tính có sẵn và các cung cấp tùy chỉnh, những vết cắt bạn thực hiện với CornerCutLinearLayout có thể được chuyển thành các bản cắt có hình dạng, kích thước khác nhau, v.v.

Tài liệu cho biết rằng “mục đích duy nhất của widget là sử dụn cho children không có transformations (như rotation, scale, matrix transformations).”
Dự án đượcreleased  theo license  Apache 2.0 và ở phiên bản 1.0.1.

Github:https://github.com/Devlight/CornerCutLinearLayout 
### 24. Recycling Center
Theo tài liệu,
“Recycling Center là một thư viện được thiết kế để hỗ trợ một mô hình:  reactive, unidirectional data flow (luồng dữ liệu một chiều) bằng cách sử dụng immutable ViewModels. Nó kết hợp reactive data flow của RxJava với UI hiệu quả của RecyclerView và hỗ trợ UI composition(thành phần giao diện người dùng) thông qua Sections của Views và ViewModels ”.

![](https://images.viblo.asia/ef8a5811-04c8-4414-b118-a6f4dd414032.png)

Cách tốt nhất để kiểm tra cách thức hoạt động của thư viện này là đi đến template  và hiểu cách thức hoạt động của nó. Ngoài ra, README là khá tốt. Dự án được released theo License BSD-3-Clause.

Github:https://github.com/Snapchat/recycling-center 
### 25. TickTock
TickTock là một thư viện quản lý dữ liệu múi giờ cho JVM và Android nhắm mục tiêu vào   các API java.time trong Java 8+. Tài liệu cho biết
“Sử dụng thư viện này nếu bạn muốn nhóm dữ liệu múi giờ trực tiếp với ứng dụng của mình thay vì dựa vào múi giờ hiện tại của thiết bị (Android) hoặc phiên bản <java.home> / lib mặc định (JVM only).”

Thư viện cũng được lấy cảm hứng từ LazyThreeTenBp. Tài liệu tốt và bản thân dự án rất dễ sử dụng. Tác giả, Zac Sweers, cũng đã viết một bài báo về lib. Nó được phát hành theo giấy phép Apache 2.0.

Github: https://github.com/ZacSweers/ticktock
### Conclusion 
- Trên đây là 25 dự án đã được lựa chọn và tổng hợp được cho là tốt nhất trong năm 2020, để mọi người có thể tham khảo và áp dụng, thậm chí tùy chỉnh thành một Project riêng cho mình. 
-  Ngoài những dự án trên cũng có thể còn nhiều dự án khác nữa mà bạn có thể bổ sung.
- Cảm ơn vì đã đọc, hy vọng bài viết này sẽ hữu ích với các bạn, xin chào và hẹn gặp lại trong các bài viết tiếp theo.

 [Nguồn](https://medium.com/better-programming/25-best-android-libraries-projects-of-2020-summer-edition-dfb030a7fb0a)