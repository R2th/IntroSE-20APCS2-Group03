# Tổng hợp kiến thức học được tháng 11/2019

Những gì học được, lượm được để chia sẻ lại. Có gì các bạn góp ý để đầy đủ hơn nhé 😀

Bài viết cũng đồng thời được đăng tại blog cá nhân, ngó qua để học thêm nhiều điều nữa nhé mn :D

[Note tháng 11 - Ra khơi
](https://codecungtrung.com/note/note-thang-11/)

## 1.Custom cái response của retrofit trước khi nó parse từ json sang object.
Có hai cách:

- Tự code dk

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question1-768x216.jpg">


- Tự custom lại

Dùng interceptor, những phải cẩn thận, dễ lỗi. Bạn có thế xem tại bài viết [Retrofit và Ok Http trong Android – Có thể bạn đã biết ?](https://codecungtrung.com/android/advanced-android/retrofit-va-ok-http-trong-android/)

## 2. Thư viện emoji
Các bạn có thể xem tại: https://github.com/vanniktech/Emoji .

Android cũng đã cung cấp sẵn lib cho phần này, các bạn có thể xem tại: https://developer.android.com/guide/topics/ui/look-and-feel/emoji-compat

## 3. Tích hợp thanh toán vào app
Momo cung cấp giải pháp thanh toán các dịch vụ trên nhiều nền tảng khác nhau: Desktop Website, Mobile Website, Mobile Application, POS, Pay In Bill, Web In App MoMo

Bạn có thể xem hướng dẫn, thông tin chi tiết tại trang chủ: https://developers.momo.vn/#/

Code demo: https://github.com/momo-wallet/payment

## 4. toString() trong class View
Khi log 1 view lên nó ra như này 
ConstraintLayout{6f5453 V.E…… ……I. 0,0-0,0 #7F0A0226 app:id/toolbar}
thì từng giá trị nó là gì ?

Xem hàm toString() của class View là hiểu mấy số đó là gì. Nó … cộng chuỗi lại

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question6.jpg">

Hàm toString() trong class View
Ví dụ

`7b14550` - hash code xác định view
`I` - view đang invisible  
`F` - view đang focusable  
`E` - view đang được enabled  
`C` - view đang clickable  
`0,0-1440,315` thông số  mLeft, mTop, mRight và mBottom. Bạn có thể xem như ở hình dưới

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/qwe.jpg">

Các thông số là căn theo view cha chứa nó

## 5. Làm bottomdialog như Tiki
Bottom dialog của Tiki

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question7-473x1024.jpeg" width="100"/>


Trong code ta gọi nó là “Bottom sheet”. 

Bạn search Bottom sheet trên Google là bạn sẽ thấy có rất nhiều ví dụ.


## 6. Lỗi khi nâng cấp Android Studio lên v3.5.2
- Package tồn tại nhưng build cứ báo lỗi không thấy

  Cách fix: build lại + restart mấy lần + init cache and restart

- Lỗi không có suggest code

  Cái này mình chưa biết cách fix. Bạn nào biết chỉ mình với nhé, tks 😀

## 7. Khi màn hình có nhiều list, xử lý thế nào ??

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question7-576x1024.jpg" width="100"/>

Nhiều list kiểu như app Tiki

C1: Nhiều recycler view + nested scroll view: vấn đề có thể xảy ra là performance, vấn đề khi vuốt các view

C2: Một recycler view cha, bên trong các item là các recycler view con: sử dụng getItemViewType. Như trong hình là sách là một type, danh mục sản phẩm là một type khác chẳng hạn. 

Cách này đơn giản, giúp đỡ phải tạo nhiều recycler view, adapter, .. nhưng nếu nhiều type lại phải tạo nhiều

==> Khá mất công

C3: Sử dụng sealed class – chỉ trong Kotllin thôi :( . Mình cũng chưa dùng bao giờ, nhưng nghe bảo là sẽ rất hay, tiện nên share lại cho các bạn thử ^.^. Ai dùng rồi comment phát nhé !

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question9.jpg"/>

Sealed class, lưu ý đây là trong Kotlin :3

## 8. Dùng android 9, mấy app như Zing mp3 hay Nhaccuatui đang chạy mà tắt màn hình tầm vài phút là nó dừng luôn.
Gián đoạn thế này

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/question12-576x1024.jpg"/>

Fix:
zing mp3 nó có hướng dẫn để khắc phục [tại đây](https://zingmp3.vn/faq/app.html?os=android&osVersion=28&manufacturer=Xiaomi&model=MI%206)

## 9. Hướng dẫn khi lần đầu vào app

Kiểu này

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/spot2-576x1024.png"/>

Bạn search từ khóa “Spotlight Android” là ra nhé 😀
Mình thấy có 2 lib ngay trên cùng của Google search, các bạn có thể xem

[Taku Semba](https://github.com/TakuSemba/Spotlight)

[29jitender](https://github.com/29jitender/Spotlight)

## 10. Tooltip
Là cái popup màu xanh như hình dưới

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/JG8j3-768x445.png"/>

Cách làm

Sử dụng: Popupwindow (có sẵn trong Android)

Hoặc bạn có thể dùng [lib](https://github.com/douglasjunior/android-simple-tooltip)

Ngoài ra các bạn có thể Search thêm trên Google nhé 😀

## 11. Hiệu ứng ảnh động các thứ
Bạn muốn làm các hiệu ứng ảo diệu như dưới ? Đừng bỏ qua [lottie](https://github.com/airbnb/lottie-android)

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/Example2.gif"/>

Ảo diệu nhờ lottie

Giới thiệu chút về lottie:

Lottie là thư viện cho Android, IOS, Web và Window mà phân tích hiệu ứng tạo bởi Adobe After Effects – ở định dạng json, sử dụng [Bodymovin – một plugin trên Adobe After Effects](https://medium.com/spemer/using-airbnb-lottie-with-after-effects-plug-in-bodymovin-c3608c9aa82) để tạo và render chúng trên các nền tảng.

Có một câu rất hay mà trên [trang chủ của lottie](http://airbnb.io/lottie/#/) có nói là: “They say a picture is worth 1,000 words so here are 13,000” (Họ nói một bức ảnh đáng giá 1000 từ nhưng ở đây là 13.000). Thực sự mình thấy các hiệu ứng của lottie rất … chất, xịn xò 😀

Hướng dẫn Code cho Android bạn có thể xem tại đây: http://airbnb.io/lottie/#/android.

Trên này còn có code cho iOS, Web, …

Hiệu ứng trái tim, like xịn xò như facebook:

https://github.com/jd-alexander/LikeButton

## 12. Cho bạn nào thích vọc code, decode
- Jadx: https://github.com/skylot/jadx – đã cũ
- Virtuous Ten Studio – cho mỗi window – hay – tiện – nhiều hỗ trợ:

    http://web.archive.org/web/20161027122831/

   http://virtuous-ten-studio.com/downloads/

## Tạm kết

Vậy là hết rồi. Có gì các bạn để lại ý kiến nhé

Bài viết cũng đồng thời được đăng tại blog cá nhân, ngó qua để học thêm nhiều điều nữa nhé mn :D

[Note tháng 11 - Ra khơi
](https://codecungtrung.com/note/note-thang-11/)