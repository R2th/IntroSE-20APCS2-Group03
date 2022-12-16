# 1. Coil 
Coil là một thư viện với một cách tiếp cận thực sự mới mẻ để tải hình ảnh trên Android. Coil là viết tắt của  coroutine image loader . Đây là một thư viện nhanh, nhẹ (~ 1500 phương thức), dễ sử dụng và vô cùng hiện đại hiện đại (áp dụng coroutine cơ mà ) , đặc biệt là so với các thư viện như Glide, Picasso hoặc Fresco. Nó hỗ trợ GIF và SVG và có thể thực hiện bốn phép biến đổi mặc định: [blur](https://coil-kt.github.io/coil/api/coil-base/coil.transform/-blur-transformation/), [circle crop](https://coil-kt.github.io/coil/api/coil-base/coil.transform/-circle-crop-transformation/), [grayscale](https://coil-kt.github.io/coil/api/coil-base/coil.transform/-grayscale-transformation/), và [rounded corners](https://coil-kt.github.io/coil/api/coil-base/coil.transform/-rounded-corners-transformation/).
Ví dụ như dưới đây :
```kotlin 
imageView.load(“https://www.example.com/image.jpg") {
 crossfade(true)
 placeholder(R.drawable.image)
 transformations(CircleCropTransformation())
}
```
Do dự gì nữa khi không sử dụng ngay Coil khi nó có đủ tài liệu  và code mẫu rồi. Vào [doc](https://coil-kt.github.io/coil/) để xem thêm nhé 

Link git : https://github.com/coil-kt/coil

# 2. MultiSearchView
Thư viện này cho phép ta  tạo ra thanh searh view vô cùng ấn tượng 
![](https://images.viblo.asia/2d781c08-160e-4eaa-93a5-e9fafaf7ab02.gif)

Bạn dễ dàng có thể cài đặt và tuỳ chỉnh theo phong cách của mình  khi custom lại file ` style.xml`

Link git : https://github.com/iammert/MultiSearchView

# 3. CalendarView

Đây là một thư viện về lịch có khả năng tuỳ biến cao , tạo bởi `RecyclerView` 
![](https://miro.medium.com/max/2600/0*0dFW-9G4mjqrfAHP.png)

Nó có rất nhiều tính năng như :
* Lựa chọn đơn hoặc lựa chọn theo khoảng 
* Chế độ tuần hoặc tháng
* Ngày giới hạn 
* Chế độ xem lịch tùy chỉnh
* Chế độ cuộn ngang hoặc dọc
* Chế độ xem hoàn toàn tùy biến
* Và nhiều hơn nữa

Các tài liệu của thư viện này  thực sự toàn diện và đầy đủ các ví dụ. Hơn nữa , có một ứng dụng mẫu thể hiện  mọi tính năng của thư viện.

Thư viện viết 100% bằng Kotlin và được phát hành theo giấy phép MIT. Nếu bạn cần một chế độ xem lịch trong ứng dụng của mình, mình tin rằng ứng dụng này rất tốt, mặc dù thực tế nó vẫn còn trong phiên bản 0.3.2 (tại thời điểm của bài viết này)

https://github.com/kizitonwose/CalendarView

# 4. Bubble Navigation

Thư viện này cung cấp cho bạn một cách tiếp cận mới  mẻ  cho thanh điều hướng. Một thư viện nhẹ  khiến cho thanh điều hướng của bạn trở nên sống động và nhiều màu sắc với vô vàn lựa chọn custom
![](https://miro.medium.com/max/582/1*CNOKe1iKh-7_anC_NLwLsg.gif)
Nó có các tính năng đặc trưng sau :
* Có hai dạng `NavigationViews` cho những trường hợp sử dụng khác nhau . `BubbleNavigationConstraintView`( hỗ trợ các chế độ `spread`, `inside`, và `packed` ) và `BubbleNavigationLinearView` ( cho phép phân phối bằng nhau, chế độ  `weight` và  `packed`)
* Khả năng tuỳ biến cao
* Thêm huy hiệu, `BubbleToggleView` để tạo  ra UI mới , không chỉ đơn giản là điều hướng 

File README khá chi tiết và giải thích tất cả các component  để có thể có được giao diện tuỵệt vời như ở trên . Có cả sample app nên bạn có thể tham khảo bất cứ lúc nào . 

Link github: https://github.com/gauravk95/bubble-navigation

# 5. FabFilter
Đây không phải là một thư viện nhưng nó là một ứng dụng  giới thiệu  các  aniamation UI nâng cao  mà không  hề sử dụng `Motion Layout` - anh em nào tìm hiểu kỹ `constraint layout` chắc sẽ không xa lạ, mặc dù ở  Android 4.0 có editor nhưng mình thấy sử dụng nó cũng không phải là dễ, nếu code tay thuần thì đúng là cực hình mà :skull_and_crossbones:

![](https://miro.medium.com/max/640/0*eWsByIZPHwYuj9En.gif)

Có 2 bài viết trên Medium miêu tả khá chi tiết về nó:
* [“Complex UI/Animations on Android”](https://medium.com/@nikhilpanju22/complex-ui-animation-on-android-8f7a46f4aec4?sk=f1fab1861a655b042ff5e9c305a0e012)
* [“Complex UI/Animations on Android — featuring MotionLayout”](https://proandroiddev.com/complex-ui-animations-on-android-featuring-motionlayout-aa82d83b8660?source=friends_link&sk=5b924ea26bc2ae4735483760f3c62409)

Link git: https://github.com/nikhilpanju/FabFilter

# 6. SmoothBottomBar
![](https://miro.medium.com/max/1400/0*nzgdIGvgPcdNhcwW)

SmoothBottomBar  tự miêu tả chính nó là :
> “a lightweight Android material bottom navigation bar library.”
> 
một thư viện nhẹ theo chuẩn material dành cho thanh bottom navigation  andoird. (dịch hơi sida tý ,hihi)

Thư viện được thực hiện theo dự án của [Alejandro Ausejo](https://dribbble.com/shots/6251784-Navigation-Menu-Animation)  trên Dribble. Hiện tại, nó là phiên bản 1.7, được viết bằng Kotlin theo giấy phép MIT. Tài liệu này khá ngắn nhưng đủ để sử dụng nó nhanh chóng trong dự án của bạn

Link git: https://github.com/ibrahimsn98/SmoothBottomBar

# 7. android-showcase

Đây thực sự là một dự án xuất sắc. [Igor Wojda](https://medium.com/@igorwojda) đã tạo ra một ứng dụng giới thiệu giới thiệu cách tiếp cận hiện đại trong năm 2019 để phát triển ứng dụng Android bằng cách sử dụng Kotlin và kỹ thuật ngăn xếp mới nhất

![](https://miro.medium.com/max/336/0*81duMXhNOLwYgeQs.gif)

Dự án này mang đến cho ta  tập hợp các tập hợp, công cụ và giải pháp tốt nhất: (nghe đáng sợ chưa )
* 100% Kotlin
* Architecture hiện đại (feature modules, clean architecture, `Model-View-ViewMode`, `Model-View-Intent`)
* Single activity , sử dụng [navigation](https://developer.android.com/guide/navigation/navigation-getting-started) component để quản lý hoạt động của fragment
* Reactive UI
* CI pipeline
* Testing
* Công cụ Static-analysis 
* Dependency injection
* Material design

Theo quan điểm cá nhân của mình thì đây là một project tuyệt vời. File README rất rõ ràng và toàn diện - với các biểu đồ bổ sung trình bày kiến trúc, luồng dữ liệu và CI. Dù bạn làm việc trên mô đun hóa, clean architecture, tests, hoặc thiết lập các công cụ CI / CD, nhờ vào dự án này, bạn sẽ luôn được truyền cảm hứng đấy . 

Link git : https://github.com/igorwojda/android-showcase

# 8. Balloon

Đây là một thư viện cung cấp một cửa sổ bật lên  với các tool tips (gợi ý ) , hoàn toàn tùy biến với các mũi tên và hình động. Bạn có thể thấy nó hoạt động như thế nào dưới đây.
![](https://miro.medium.com/max/588/1*yCHKsHMMzf_DQ3DhrNnfew.gif)

Nó hỗ trợ minSdk là  16 và được phát hành theo giấy phép Apache 2.0 với phiên bản 1.1.0. Tài liệu có đầy đủ các ví dụ và cũng được hỗ trợ bởi một sample app.

Link git : https://github.com/skydoves/Balloon

# 9. LiquidSwipe

LiquidSwipe là một thư viện dựa trên `ViewPager` và có thể được sử dụng để tạo ra các thiết kế đẹp mắt.
![](https://miro.medium.com/max/858/1*edGePj38Kla0JGwekbRxWw.gif)

File  README khá là đầy đủ . Việc sử dụng thư viện cũng khá dễ dàng và sử dụng `LiquidSwipeViewPager` thay vì `ViewPager` thông thường.
Hiện tại, nó đang ở  phiên bản 1.3 và được phát hành theo giấy phép MIT, hỗ trợ minSdk 21 trở lên.

Link git : https://github.com/Chrisvin/LiquidSwipe

# 10. Croppy

Đây là một cách tiếp cận khác để cắt sửa hình ảnh cho Android

![](https://miro.medium.com/max/360/0*tza9GWvOxCTPqDCl)

Thư viện này có các tính năng nổi trội sau :
* Nhấp đúp để focus
* Vuốt để zoom
* Free mode (cắt ở mọi kích thước )
* Aspect-ratio mode (Cắt xén với tỷ lệ khung hình được xác định trước, như 16: 9, 4: 3, v.v.)
* Hiển thị kích thước của bitmap đã cắt
* Autocentering bitmap khi cắt
* Trải nghiệm sử dụng đầy đủ animation

Link git : https://github.com/lyrebirdstudio/Croppy

# 11. Glimpse

Thêm một công cụ cắt ảnh nữa . Glimpse là một thư viện cắt xén có nhận thức nội dung cho Android ( nghe như AI ý nhỉ )  và thật tuyệt vời khi các loại thư viện này là  mở nguồn mở

![](https://miro.medium.com/max/1024/0*PTQYZgqgulhXSAph)

Như bạn có thể thấy ở trên, thay vì hình ảnh cắt xén trung tâm một cách mù quáng, Glimpse đã bắt đúng điểm.
Nhưng bằng cách nào? Nó sử dụng[ TensorFlow Lite ](https://www.tensorflow.org/lite)ở bên dưới với một mô hình thích hợp. Một điều tuyệt vời là nó hỗ trợ Coil và Glide . Bạn nên xem qua file README vì nó thực sự rộng  và bạn sẽ học được rất nhiều. 

Nó được phát hành theo giấy phép Apache 2.0. Có thể nó chưa sẵn sàng để phát hành, nhưng mình vẫn khuyên bạn nên tìm hiểu nó 

Link github : https://github.com/the-super-toys/glimpse-android

# 12. RubberPicker

Đây là một cách tiếp cận thú vị cho `SeekBars` với những animation đẹp mắt
![](https://miro.medium.com/max/514/0*eTlcCAW01oXX7x9A.gif)

Thư viện RubberPicker chứa `RubberSeekBar` và `RubberRangePicker`, lấy cảm hứng từ [Cuberto's rubber-range-picker](https://github.com/Cuberto/rubber-range-picker)  cho iOS.

Các tài liệu sẽ cho bạn biết làm thế nào để bắt đầu và cũng là những gì trong danh sách việc cần làm. Hiện tại, nó có phiên bản 1.4, và nó được phát hành theo giấy phép MIT.

Link github: https://github.com/Chrisvin/RubberPicker

# 13. AndroidFastScroll

Thư viện này thêm mộtthanh  cuộn nhanh cho `RecyclerView` của bạn và hơn thế nữa.

![](https://miro.medium.com/max/1746/1*0j-S8T_4FWx_Gn5wTEqMJw.png)

Các tính năng chính, theo file  README, là:
* Hoàn toàn tùy chỉnh: Ghi đè track, thumb, popup, animation và scrolling.
* Mặc định dễ dàng sử dụng: Kiểu mặc định được xác định trước, kiểu dáng và hoạt hình theo chuẩn của Material Design 2.
* Hỗ trợ chế độ xem mở rộng: Hỗ trợ ngoài luồng cho `RecyclerView`, `ScrollView`, `NestedScrollView` và `WebView`, cùng với bất kỳ chế độ xem nào khi triển khai `ViewHelper`.
* Cửa sổ chèn thân thiện: Hỗ trợ cài đặt phần đệm riêng cho thanh cuộn.
* Clean implementation : Xử lý cảm ứng tách rời, hoạt ảnh và logic cuộn.

Có một [sample app có sẵn trên Google Play](https://play.google.com/store/apps/details?id=me.zhanghai.android.fastscroll.sample). Dự án có tài liệu tốt và được phát hành theo giấy phép Apache 2.0, vì vậy nếu bạn muốn có một thanh cuộn nhanh - ví dụ: vào danh bạ, list nhạc,..- thư viện này là một lựa chọn tốt:
https://github.com/zhanghai/AndroidFastScroll

# 14. Switcher

Đây là một thư viện cung cấp tiện ích `Switch` tùy chỉnh, hoạt hình.
![](https://miro.medium.com/max/400/0*UiUi6zYXfzRuF43G.gif)

Nó dựa trên thiết kế Dribble của  [Oleg Frolov ](https://dribbble.com/Volorf)và được phát hành theo giấy phép Apache 2.0. Nó hỗ trợ Android KitKat (minSdk 19) và khá đơn giản để sử dụng.

Link github : https://github.com/bitvale/Switcher

# 15. StfalconImageViewer

Mặc dù thực tế nó đã được phát hành vào tháng 12 năm 2018, nhưng mình vẫn muốn đưa lib này vào danh sách vì nó xứng đáng được như vậy. Thư viện này  đơn giản và  tùy biến. Nó chứa trình xem hình ảnh toàn màn hình với hỗ trợ chuyển đổi hình ảnh được chia sẻ, chức năng pinch-to-zoom và cử chỉ vuốt để loại bỏ.
![](https://miro.medium.com/max/270/0*J-j7-g6yVWRoYIoo.gif)

Các tài liệu của nõ cũng đã giải thích làm thế nào để sử dụng mọi tính năng. Đáng chú ý: Thư viện tương thích với tất cả các thư viện xử lý hình ảnh phổ biến nhất, chẳng hạn như Picasso, Glide, v.v. Nó trong phiên bản 1.0.0. 

Link git : https://github.com/stfalcon-studio/StfalconImageViewer

# 16. Store 4

Đây là một thư viện mình rất thích .Hiện tại, nó đang trong vòng lặp thứ tư và  thư viện tuyệt vời này dùng  để tải và lưu trữ dữ liệu không đồng bộ. Theo tệp README:
> “A Store is a class that simplifies fetching, sharing, storage, and retrieval of data in your application. A Store is similar to the Repository pattern while exposing an API built with Coroutines that adheres to a unidirectional data flow.
Store provides a level of abstraction between UI elements and data operations.”

Hiểu đơn giản là là một thư viện xử lý cho ở tầng  Repository trong project của bạn. Thực tế thì bạn có thể thấy không hề có một thư viện nào  , kể cả Google cũng không hề hỗ trợ cho repository với các lib có sẵn (như ViewModel chả hạn, Google cung cấp sẵn cho ta một lib ) . Bạn sẽ tự chọn cho mình cách xử lý riêng, dùng Room lưu trữ  local và Rx để load dữ liệu từ server. Nhưng ở Store bạn không quan tâm việc đó nữa, Store đã xử lý hết cho bạn. ( Mình sẽ viết một bài riêng về Store trong thời gian tới ) 

Các bạm tìm hiểu thêm ở link github : https://github.com/dropbox/store

# 17. Broccoli

Đây là một thư viện khác để hiển thị `View`  khi nội dung vẫn đang được  tải. Bạn có thể hình dùng như là commet của facebook vậy. Khi bạn nhấp vào phần comment, trong quá trình load dữ liệu có nhũng hình động thay thế cho nội dung  của các bình luận đang được tải 

![](https://miro.medium.com/max/270/0*Jqu8QJFSqJTYsOdh.gif)

Nhìn xem có đẹp mắt không kìa . Bạn cũng có thể sử dụng nó với `RecyclerView`. Các tài liệu hỗ trợ tuy ngắn ngắn, nhưng được hiển thị  nội dung sử dụng cơ bản của nó. Có một ứng dụng mẫu. Nó dang ở  phiên bản 1.0.0 và được phát hành theo giấy phép Apache

Link git : https://github.com/samlss/Broccoli

# 18. ProgressButton

Thư viện này cung cấp các `Button`  có thanh tiến trình tích hợp bên trong. Ý tưởng không mới, nhưng đây là một cách tiếp cận mới.

![](https://miro.medium.com/max/468/0*AWeK2ekEKImLCb67.gif)

Các tính năng  chính:
* Không cần thay đổi bố cục
* Chỉ cần vài dòng lệnh để thêm
* Cấu hình dễ dàng,
* Tùy chỉnh
* Hoạt hình mờ dần tích hợp
Quá trình, bao gồm cả cách lib được thực hiện, có sẵn ở[ bài viết ](https://proandroiddev.com/replace-progressdialog-with-a-progress-button-in-your-app-14ed1d50b44)này . Hiện tại, phiên bản là 2.0.0 và nó được phát hành theo giấy phép Apache 2.0.

Link git : https://github.com/razir/ProgressButton

# 19. GradientView

Đây là một dự án Android cho phép bạn thêm gradient view theo cách đơn giản nhất có thể.

![](https://miro.medium.com/max/480/0*NVumQEc5E6Q_JLBk.gif)

Thư viện hỗ trợ API 14 trở lên và được phát hành theo giấy phép Apache 2.0. Tệp README ngắn, nhưng nó chứa một số mẹo hay, như cách sử dụng nó trong Java và Kotlin. Cũng có một ứng dụng mẫu hữu ích.

Link git : https://github.com/lopspower/GradientView

# 20. Contour

Contour là một API an toàn, đầu tiên của Kotlin cho các bố cục phức tạp trên Android từ [Square Engineering](https://medium.com/@SquareEng).

![](https://miro.medium.com/max/644/0*PQ2nxX_WrVXVOMHd.gif)

Theo như trang Github của họ nói :
> “Contour aims to be the thinnest possible wrapper around Android’s layout APIs. It allows you to build compound views in pure Kotlin without using opaque layout rules — but instead by hooking into the layout phase yourself. The best comparison for Contour would be to ConstraintLayout — but instead of defining constraints in XML you actually provide them as executable lambdas.”

Mục tiêu của Contour nhằm mục đích trở thành trình bao bọc mỏng nhất có thể xung quanh các API layout  của Android. Nó cho phép bạn xây dựng các chế độ xem ghép trong Kotlin thuần túy mà không cần sử dụng các quy tắc bố cục mờ - mà thay vào đó bằng cách tự móc vào giai đoạn bố trí. Sự so sánh tốt nhất cho Contour sẽ là ConstraintLayout - nhưng thay vì xác định các ràng buộc trong XML, bạn cung cấp chúng dưới dạng thực thi  lambdas 

Nghe có vẻ loằng ngoằng nhỉ . Hiểu đơn giản bạn sẽ không xây dựng layout theo XML theo cách thông thường nữa ( bạn sẽ biết được lý do tại sao khi đọc tệp README ) . Giường như Google cũng đang tiến tới xây dựng layout không xml, khi họ cho ra đời bọ Jetpack Compose.  Các tài liệu của thư viện này thực sự tốt, nhưng hãy nhớ rằng: 
> “This project is currently experimental and the API subject to breaking changes without notice.
> 
Dự án này hiện đang thử nghiệm và API có thể phá vỡ các thay đổi mà không cần thông báo trước.

Tuy nhiên rất đáng để thử và tìm hiểu nhé : https://github.com/cashapp/contour

# 21. Orbit MVI

Đây một framework Model-View-Intent (MVI) dành cho Kotlin và Android do [Babylon Health](https://www.babylonhealth.com) phát triển và sử dụng. Nó được lấy cảm hứng từ  “[Managing State with RxJava](https://www.youtube.com/watch?v=0IKHxjkgop4)” của Jake Wharton, [RxFeedback](https://github.com/NoTests/RxFeedback.kt) và [Mosby](https://github.com/sockeqwe/mosby).

![](https://miro.medium.com/max/752/0*iyIlraRRLgcAcr-c)

Theo như file README thì :
> “Orbit provides the minimum structure possible around your redux implementation to make it easy to use, yet leave you open to use RxJava’s power.”
> 
Orbit cung cấp cấu trúc tối thiểu có thể baoquanh việc triển khai redux của bạn để giúp sử dụng dàng , nhưng vẫn mở để bạn để sử dụng sức mạnh RxJava.

Framework này thực sự được hướng dẫn  tốt, với một lời giải thích kỹ lưỡng về cách thức hoạt động và cách sử dụng nó. Hiện tại, nó có phiên bản 3.3.0 và được phát hành theo giấy phép Apache 2.0. Nếu bạn có kế hoạch bắt đầu một dự án mới và suy nghĩ về mô hình MVI, thì đáng để thử đến nó .

Link git : https://github.com/babylonhealth/orbit-mvi

# 22. CircularProgressBar

Đây không phải là một thư viện mới, nhưng nó đã được làm mới vào năm 2019. Nó giúp bạn tạo một `ProgressBar` tròn theo cách đơn giản nhất có thể.

![](https://miro.medium.com/max/480/0*UmzMAWC996dojf7S.gif)

Các tài liệu  toàn diện và giải thích cách để sử dụng thư viện. Nó cũng chứa các đoạn mã và một ứng dụng mẫu. Dự án được phát triển ở Kotlin theo giấy phép Apache 2.0. Hiện tại, nó có phiên bản 3.0.3.

https://github.com/lopspower/CircularProgressBar

# 23. Waterfall Toolbar

Đây là view cố gắng bắt trước[  Top App Bar from Material Components for the Web](https://material-components.github.io/material-components-web-catalog/#/component/top-app-bar/fixed). Về cơ bản, nó kích hoạt một thanh công cụ thông thường, tăng và giảm bóng của nó khi cuộn thanh scroll.

![](https://miro.medium.com/max/253/0*-SfprixkzXNqTyAa.gif)

Trên thực tế, khung nhìn này mở rộng `CardView` và thêm độ cao cho nó. Dự án được phát hành theo giấy phép MIT và được mở để mọi người đóng góp. Nó có tài liệu thích hợp và một ứng dụng mẫu.

https://github.com/hugocbpassos/waterfall-toolbar

# 24. Press

Đây không phải là một thư viện nhưng là một ứng dụng mã nguồn mở đáng yêu từ [Saket Narayan](https://medium.com/@Saketme), theo tệp README của nó, là:
> “A WYSIWYG writer for crafting notes inspired by [Bear](https://bear.app). It uses markdown for styling and formatting text with a beautiful inline preview.”
> 
Nó lấy cảm hứng từ Bear , sử dụng markdown để styling và format chữ với bản xem trước đẹp đẽ.

![](https://miro.medium.com/max/1760/1*9oDXSjzoSWyz2qbfZ5YFxw.png)

Press  được tạo ra như một bằng chứng về khái niệm để khám phá các dự án đa nền tảng trong Kotlin, vì vậy đây là nơi tuyệt vời để nắm bắt cách viết các ứng dụng cho Android, iOS và macOS cùng một lúc. Tuy nhiên, hiện tại chỉ có một phiên bản Android ( các nền tảng khác vâng đang phát triển chờ ngày ra mắt )

Dự án có một tài liệu thực sự tốt bao gồm giải thích về[ UI architecture](https://github.com/saket/press/blob/master/documentation/architecture.md), [custom view](https://github.com/saket/press/blob/master/documentation/screens_as_custom_views.md), [DI](https://github.com/saket/press/blob/master/documentation/dependency_injection.md)  và [ testing/debugging shared code](https://github.com/saket/press/blob/master/documentation/testing.md) . Nó được phát hành theo giấy phép Apache 2.0.

Link git : https://github.com/saket/press

# 25. AndroidColorX

> “AndroidColorX (i.e: Android Color Extensions) is an Android library written in Kotlin that provides color utilities as [Kotlin extension functions](https://kotlinlang.org/docs/tutorials/kotlin-for-py/extension-functionsproperties.html). The library relies on AndroidX [ColorUtils](https://kotlinlang.org/docs/tutorials/kotlin-for-py/extension-functionsproperties.html) for some of its calculations.” — via the [AndroidColorX GitHub page ](https://github.com/JorgeCastilloPrz/AndroidColorX)
> 
AndroidColorX là một thư viện android viết bằng Kotlin  cung cấp các tiện ích màu như các extension functions của Kotlin. Thư viện dựa trên AndroidX ColorUtils dựa trên một số tính toán riêng của nó 

![](https://miro.medium.com/max/322/1*jhOTSMBCT6MOUmXpcwKIow.gif) 

Thư viện này cung cấp các tiện ích mở rộng cho:
* Chuyển đổi giữa nhiều loại màu (ví dụ:` android.graphics.Color (ColorInt)`, `RGBColor`, `HEXColor`, `CMYKColor`, v.v.
* Tính bảng màu và sắc độ,
* Tính toán các màu bổ sung, triadic (bộ ba) , tetradic (tứ bội)  và tương tự
* Làm tối hoặc làm sáng màu bằng một lượng
* Và hơn thế nữa

Cách tốt nhất để biết thư viện này là kiểm tra tài liệu thực sự toàn diện của nó. Hiện tại, nó có phiên bản 0.2.0 và được phát hành theo giấy phép Apache 2.0.

Link github : https://github.com/JorgeCastilloPrz/AndroidColorX

# 26. IndicatorScrollView

Thư viện này thêm logic vào `NestedScrollView`, cho phép nó phản ứng linh hoạt khi thanh cuộn được thay đổi.

![](https://miro.medium.com/max/588/1*tfOXE9M_u6ITYzGyYVjq6w.gif)

Tệp README chứa tất cả thông tin cần thiết để bắt đầu  với dự án - như cách sử dụng `IndicatorScrollView`, `IndicatorView` và `IndicatorItem`. Hiện tại, nó có phiên bản 1.0.2 và được phát hành theo giấy phép Apache 2.0. Nó hỗ trợ API 16 trở lên.

Link github : https://github.com/skydoves/IndicatorScrollView

# 27. Cyanea

Đây là một công cụ chủ đề cho Android.

![](https://miro.medium.com/max/300/0*yz1foQa17IKoPBvP)

Nó cho phép bạn thay đổi chủ đề một cách linh hoạt. Nó cũng định nghĩa một số chủ đề cốt lõi: `Theme.Cyanea.Dark`, `Theme.Cyanea.Dark.LightActionBar`, `Theme.Cyanea.Dark.NoActionBar`, `Theme.Cyanea.Light`, `Theme.Cyanea.Light.DarkActionBar`, `Theme.Cyanea.Light.NoActionBar` . Các tập tin README có đầy đủ các ví dụ và bản thân dự án được phát hành theo giấy phép Apache 2.0.

Link github : https://github.com/jaredrummler/Cyanea

# 28. Material Dialogs for Android

Đây là một thư viện cung cấp các dialog với hoạt hình,  đẹp và phong cách nữa .
![](https://miro.medium.com/max/898/1*GCOw9mxiTbvT6D2lPMcpGQ.gif)

Thư viện hỗ trợ 2 loại dialog:
* Material dialog
* Bottom-sheet material dialog

Ở bên  dưới, nó triển khai thư viện[ Lottie của Airbnb ](https://github.com/airbnb/lottie-android) để rendert hoạt hình After Effect
Dự án này thực sự được hướng dẫn tốt và được phát hành theo giấy phép Apache 2.0.
Link git : https://github.com/PatilShreyas/MaterialDialog-Android

# 29. Uniflow

Nó đơn giản là một luồng dữ liệu một chiều cho Android  và Kotlin . Nó sử dụng các coroutines Kotlin và functional programming. Xem thêm bài viết miêu tả ở [Medium](https://medium.com/@giuliani.arnaud/making-android-unidirectional-data-flow-with-kotlin-coroutines-d69966717b6e) và [document](https://github.com/uniflow-kt/uniflow-kt/blob/master/Documentation.md) ở đây nhé !!!

Uniflow cung cấp:
* Một cách thông minh để viết một luồng  trong Kotlin thuần 
* Tiện ích mở rộng Android cho phép bạn chỉ tập trung vào các trạng thái và sự kiện
* Sẵn sàng cho các coroutines Kotlin
* Dễ test 
* Functional programming với [Arrow](https://arrow-kt.io) 

Hiện tại, nó có phiên bản 0.9.5 và được phát hành theo giấy phép Apache 2.0.

Link git : https://github.com/uniflow-kt/uniflow-kt

# 30. Android MotionLayout Carousel

Đây là một dự án mẫu mà bạn có thể sử dụng để xem cách xây dựng một băng chuyền đơn giản với MotionLayout.. Anh em giờ này chắc không còn lạ gì` Motion Layout `rồi nhỉ :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

![](https://miro.medium.com/max/270/0*8GXTn-EDo8MwnueB.gif)

Dự án không có bất kỳ tài liệu nào. Tuy nhiên, bạn vẫn có thể kiểm tra code, điều này khá đơn giản và sử dụng nó cho mục đích học tập. Nó được phát hành theo giấy phép MIT.
Thú thật mình dùng cả editor mà vẫn ngu `Motion Layout` , khổ thế chứ lị :cool::cool::cool:

Tham khảo đây nhé mọi người : https://github.com/faob-dev/MotionLayoutCarousel

# Tổng kết 
Trên đây là 30 dự án và thư viện được đánh giá là tốt nhất của năm 2019, hy vọng nó sẽ truyền cảm hứng cho mọi người. Ứng dụng một hai phần nào đó vào project của mình . Hay thậm chí tự mình làm theo ý tưởng của nó cũng được :rofl::rofl:.. 

Bài viết được dịch từ trang [Medium](https://medium.com/better-programming/30-best-android-libraries-and-projects-of-2019-a1e35124f110)  và có thêm chút xàm xí của mình nữa.
Có gì sai xót mong mọi người góp ý  :heart_eyes::heart_eyes::heart_eyes:.