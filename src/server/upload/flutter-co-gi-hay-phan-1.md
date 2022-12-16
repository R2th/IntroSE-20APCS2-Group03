Dạo gần đây mấy đồng nghiệp của mình học cả được làm thêm dự án về Flutter. Code thấy lạ lạ, **không dùng xml** code giao diện mà dùng **Dart** gì đấy. Thấy bảo có cái **Hot reload** hay lắm, code giao diện cũng đẹp nữa. Nên thử đọc về Flutter rồi nay viết một bài tìm hiểu xem thế nào – Newbie thôi ; ))

Nào giờ chúng ta bắt đầu thôi !!!

# I. Lịch sử
**Flutter** là bộ công cụ giao diện của Google để xây dựng ứng dụng đẹp, phù hợp với các nền tảng **web, điện thoại và máy tính** từ một codebase duy nhất – kiểu **“Write once and run anywhere”.**

Chi tiết các bạn có thể xem video sau của Google

[Flutter](https://youtu.be/5VbAwhBBHsg)

Lịch sử phát triển:

* **Vào năm 2015**, Google tiết lộ **Flutter** – SDK mới dựa trên ngôn ngữ **Dart**, như là nền tảng mới để phát triển Android.
* **Năm 2017**, **bản alpha (0.0.6)** được public lần đầu tiên.
* **Vào 04/12/2018**, **Flutter 1.0** được công bố tại sự kiện Flutter Live, đánh dấu phiên **bản “stable” đầu tiên.**
* **Vào 11/12/2019**, sự kiện Flutter Interact diễn ra và công bố rất nhiều sự nâng cấp cùng với sự ra đời của **Flutter 1.12**
* Tính tới **30/04/2021**, phiên bản mới nhất là **2.0.6**

# II. Đặc điểm

À thấy có ghi

> Phù hợp với các nền tảng web, điện thoại và máy tính

Bạn không đọc nhầm đâu, code build ra sẽ chạy được trên web, điện thoại và máy tính đó.

<img src="https://i0.wp.com/codecungtrung.com/wp-content/uploads/2021/05/image.png?resize=688%2C392&ssl=1"/>

## 1. Fast Development

Tốc độ phát triển sẽ rất nhanh. Với **“Stateful Hot Reload”** (hay gọi tắt là **Hot Reload**), bạn sẽ thay đổi code và thấy nó luôn trên màn hình chỉ trong vòng vài giây mà không mất trạng thái của app.

Các bạn có thể thấy nó giống … **“Apply Code Change”** trong Android Studio vậy. Về cơ chế thì đơn giản là kiểu nó lấy những phần code nào thay đổi, mang đi compile và update vào source hiện tại thôi. Nghe đơn giản vậy mà Android Studio tới tận version 3.5 (Release tháng 8/2019) mới có tính năng này ; ))

Ngoài ra, **Flutter** còn cung cấp rất nhiều **widget** tiện lợi, phát triển nhanh gọn hơn (mình có nghe làm listview trong flutter code mấy dòng là xong – nghe thôi chưa thử – chứ bên Android code cả lô).

<img src="https://codecungtrung.com/wp-content/uploads/2022/02/image.png"/>

## 2. Expressive and Flexible UI
**Flutter** tập trung vào trải nghiệm người dùng cuối, phù hợp với nền tảng, sở hữu nhiều thiết kế đem lại sự thoải mái và linh hoạt trong phát triển, sử dụng. Cùng với đó là … các bộ widget phong phú và rất nhiều thư viện animation. (**Widget** là gì thì mình sẽ giải thích ở mục dưới nhé, cơ bản bạn hiểu nó giống **view** trong Android.)

Flutter hỗ trợ cả [Material Design](https://flutter.dev/docs/development/ui/widgets/material) – cho Android và [Cupertino](https://flutter.dev/docs/development/ui/widgets/cupertino) – cho IOS, đem lại sự native nhất có thể.

<img src="https://i0.wp.com/codecungtrung.com/wp-content/uploads/2021/05/image-1.png?resize=688%2C322&ssl=1"/>

## 3. Native Performance
Flutter đáp ứng tốt, cung cấp hiệu năng ổn định với đầy đủ các view – thao tác của native như vuốt, chuyển màn, icon, font, …

<img src="https://code.market/wp-content/uploads/2021/05/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-05-20-%D0%B2-20.48.20.png"/>

Tại sao lại cung cấp được hiệu năng ổn định, chạy tốt trên các nền tảng được nhỉ ??

Không giống các framework khác, Flutter … không phụ thuộc vào bất kì trung gian nào để build code ra các nền tảng. Nó có bộ build riêng và code được build trực tiếp sang mã máy, sẽ giúp giảm thiểu bug trong quá trình trung gian.

Thêm cái này nữa
<img src="https://i0.wp.com/relevant.software/wp-content/webp-express/webp-images/uploads/2019/07/Basic-set-of-UI-elements-on-Mobile-app.png.webp?resize=615%2C292&ssl=1"/>

Một điều ta đang nghĩ là muốn **Flutter** … chạy được trên các nền tảng thì các thành phần của flutter sẽ phải **map tương ứng với từng nền tảng** – ví dụ trong hình trên. Build code ra nền tảng nào thì phải map ra nền tảng đó, sẽ phải **“phụ thuộc vào nền tảng”**. Không thì làm sao mà chạy được nhỉ ??

Nhưng không, Google không làm vậy, sẽ rất tốn thời gian mapping, render, tối ưu trên các nền tảng ===> Rất phức tạp

Và không cần biết nền tảng là gì luôn, Flutter sử dụng **canvas** để vẽ giao diện trực tiếp.

<img src="https://i0.wp.com/relevant.software/wp-content/webp-express/webp-images/uploads/2019/07/The-Flutter%E2%80%99s-way-of-UI-rendering.png.webp?resize=650%2C208&ssl=1"/>

Mình thấy đây là một hướng đi rất hay. Kiểu thay vì đi đường người ta xây sẵn cho, phụ thuộc vào người xây (đường một chiều, hai chiều, đường to, đường nhỏ, chất lượng đường, …) thì mình tự làm một con đường để đi (tự xây, tự làm hoặc đi bằng trực thăng chẳng hạn – đường hàng không ). Các bạn nghĩ sao về điều này, để lại comment nhé !!!

Chi tiết về cách Flutter dùng canvas các bạn có thể xem [tại đây](https://flutter.dev/docs/resources/architectural-overview#flutters-rendering-model) – đau đầu phết.

## 4. Ngôn ngữ sử dụng là Dart

**Dart** là ngôn ngữ lập trình hướng đối tượng, mang lại hiệu quả trong quá trình phát triển ứng dụng.

Nói sơ qua về Dart. Dart được giới thiệu là **“a client-optimized language for fast apps on any platform”** (ngôn ngữ được tối ưu hóa phía client cho tốc độ phát triển app nhanh trên bất kì nền tảng nào):

* **Optimized for UI:** nó được tạo ra là để phát triển giao diện người dùng, một cách tối ưu nhất.
* **Productive development:** hot reload giúp thấy sự thay đổi của code nhanh hơn, hỗ trợ log, debug hiệu quả, …
* **Fast on all platforms:** biên dịch được ra nhiều nền tảng, tốc độ chạy nhanh, ổn định

[Video giới thiệu về Dart](https://dart.dev/assets/dash/video/hotreload.webm)

Để tìm hiểu rõ hơn các bạn có thể đọc tại [trang chủ của Dart](https://dart.dev/)

Vậy bạn có thể hỏi tại sao Flutter lại sử dụng Dart, mà không sử dụng ngôn ngữ lập trình hướng đối tượng khác (như **Java** chẳng hạn), hay **Kotlin** – một ngôn ngữ đang nổi lên mạnh mẽ, hay là **python, Javascript**, … ?? Chúng cũng có những điểm hay mà ??

Chi tiết đã được giải thích tại trang chủ của Flutter, [link tại đây](https://dart.dev/assets/dash/video/hotreload.webm)

## 5. Các widget đều có thể custom lại được

Mọi thành phần trong Flutter được gọi là **Widget**. Bạn có thể liên tưởng tới **view** trong Android vậy (kiểu như button, text, list, …). Nhưng widget trong flutter mang nghĩa rộng hơn view, nó còn để gọi … các đối tượng tham gia tạo layout, xử lý tương tác người dùng, …

Ví dụ như **Padding, Margin, Center** – cái này chắc các bạn có thể tự suy ra ý nghĩa của nó. Còn có **GestureDetector** , **Dismissible**, **Form** – mấy cái này cũng là widget :v, nghe dị. Mà bạn có thể coi các **Widget** dị dị của Flutter là … Custom view trong Android đấy, khá chuẩn 😀

Một trong những lợi thế lớn nhất của Flutter là khả năng tùy chỉnh bất kỳ thứ gì bạn thấy trên màn hình, bất kể nó có thể phức tạp đến mức nào. So với native thì tốc độ phát triển sẽ nhanh hơn kha khá.

Thêm nữa là lượng widget mới được update liên tục. Có cái **IgnorePointer** này mình thấy hay, tiện. Mà còn nhiều cái hay nữa lắm, chi tiết mn có thể xem tại đây.

[Video về IgnorePointer](https://youtu.be/qV9pqHWxYgI)

# Tóm lại
Ngoài [Kotlin](https://codecungtrung.com/kotlin/series-kotlin-vi-dieu/) ra thì theo mình Flutter là một công nghệ rất hay, là hướng tiếp cận rất tốt cho bạn nào muốn code đa nền tảng.

Bài viết đã cung cấp cho chúng ta về lịch sử của flutter và một số đặc điểm cơ bản của nó. Ở phần 2 chúng ta sẽ đi so sánh giữa Flutter và native Android !!!

Bạn nào đã code Flutter chưa, thấy có gì hay, gì thích, không thích ? Share lại với mình nhé !!!

Bài viết gốc tại blog [Code cùng Trung](https://codecungtrung.com/) của mình

- https://codecungtrung.com/android/flutter/flutter-co-gi-hay-phan-1

Các bạn có thể đọc thêm nhiều bài nữa tại blog nhé !!!

Một blog khác của mình về sách. Các bạn có thể tìm được nhiều đầu sách hay, với các chủ đề phong phú.

Xem ngay tại **Trạm đọc sách**: https://tramdocsach.com/