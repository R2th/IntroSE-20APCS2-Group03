## Tổng hợp kiến thức Android tháng 12/2019

Những kiến thức mình học được, lượm được trong tháng 12/2019. Let’s go !!!

Bài viết cũng đồng thời được đăng tại blog cá nhân, ngó qua để học thêm nhiều điều nữa nhé mn 😄

[Tổng hợp kiến thức tháng 12/2019](https://codecungtrung.com/note/note-thang-12-2019/)

### 1. Làm một cái recycler view xịn xò
Các bạn có thể làm một cái recycler view với hiệu ứng như trong video

{@embed: https://www.youtube.com/watch?v=aI9wX91m3Qs&feature=youtu.be}

Link thư viện: https://github.com/saket/InboxRecyclerView

### 2. Nhận diện chữ viết
Thuật ngữ cho phần này là: [OCR (Optical character recognition)](https://vi.wikipedia.org/wiki/Nh%E1%BA%ADn_d%E1%BA%A1ng_k%C3%BD_t%E1%BB%B1_quang_h%E1%BB%8Dc). Hiểu đơn giản là chuyển các chữ viết, in ấn trên bìa, … thành các văn bản tài liệu.

<img src="https://miro.medium.com/max/1280/1*eALRKRSb1aGmDf89Xd741w.gif"/>

Google đã cung cấp sẵn cho chúng ta API để xử lý vấn đề này, đó là [Google Mobile Vision](https://developers.google.com/vision/). Ngoài nhận diện chữ viết, nó còn có nhận diện khuôn mặt, barcode.

Các bạn có thể xem hướng dẫn [trên medium tại đây](https://medium.com/teachmind/detect-text-from-image-in-android-with-google-mobile-vision-api-112a527e556d)

### 3. Sử dụng String
#### a.
Hiển Thị Dấu (‘), Dấu gạch chéo và thấy báo lỗi ??? Dấu (“) thì sẽ không hiện lên trên màn hình
string format error

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image.png"/>

Cách fix, chỉ cần thêm dấu gạch chéo trước mỗi kí tự là ok 

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image-1.png"/>

#### b.

Hiển Thị Các Ký Tự (&), (<), (>), (…) và cũng thấy lỗi ??? Báo lỗi đỏ ??? Bị bôi đậm ???

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image-2.png"/>

Cách fix:

Thay thế mỗi kí tự trên như sau (cụ thể ở trong hình nhé các bạn)

– **&** thay bằng **& amp;**

– **<** thay bằng **& lt;**

– **>** thay bằng **& gt;**

– **…** thay bằng **& #8230;**

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image-3.png"/>

### 4. Vị trí đặt các resource như color, string, dimen, …

Thư mục res/values như sau

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image-5.png"/>

Bạn hay để màu sắc trong file colors.xml, string trong file strings.xml phải không nào 😀

Tuy nhiên bạn … hoàn toàn có thể để như sau và … hoàn toàn có thể chạy ok :v

Lý do là ” các resource bên trong thư mục này đều có thẻ gốc là thẻ resources ” (folder res đó). Nhưng không nên nha !!! All in one :3 luôn

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/image-4.png"/>

### 5. Kotlin để code iOS – bạn đã thử ?

**Kotlin** sinh ra để … thay thế cho **Java**. Những gì Java có thể làm thì Kotlin **cũng có thể** làm được.

Tuy nhiên bạn có thể dùng …Kotlin code iOS thay vì Swift – hay chưa 😀

<img src="https://codecungtrung.com/wp-content/uploads/2019/12/ios-android-768x345.png"/>


Các bạn có thể xem tại đây: https://www.jetbrains.com/lp/mobilecrossplatform/

Mình nghe dk là: ” Dùng kotlin code IOS mệt bỏ sử phải dùng run script để compile”.

Thực sự mình …chưa thử code nên chưa hiểu lắm, ai code rồi share lại mình vs nhé, tks !!!

### 6. MvRx của Airbnb
Bạn đã biết tới các mô hình **MVC, MVP, MVVM ?**

Ngoài ra Airbnb cũng đã tự phát triển một mô hình phần mềm riêng, gọi là **MvRx**. Được giới thiệu là ” **make building products easier, faster, and more fun** “.

Mình xem qua cũng khá hay, các bạn có thể xem tại link dưới

https://github.com/airbnb/MvRx/

### 7. Đẩy vùng text cần nhập lên trên bàn phím
Bạn muốn nhấn vào EditText mà sau đó nó sẽ được đẩy lên cao so với bàn phím như hình dưới ??

Ví dụ app messager
<img src="https://cnet3.cbsistatic.com/img/8jPrZ-u5kAXEyC4uTRcidBMc4PA=/2013/11/08/d4f31cb0-6dea-11e3-913e-14feb5ca9861/fb-chat-sample.jpg"/>


Hãy thử sử dụng thuộc tính **android:windowSoftInputMode** trong tag <activity> của file Android manifest. Có 2 lựa chọn là “**adjustPan**” và “**adjustResize**”

Chi tiết hơn các bạn có thể xem [tại đây](https://code.luasoftware.com/tutorials/android/move-layout-when-keyboard-shown/)

### 8. Bạn muốn cách khác để code giao diện Android
Bạn vẫn hay … code giao diện Android bằng cách nào ? Chúng có phải là:

**Cách 1**: code bằng file .xml – easy game 😀

**Cách 2**: code trong file .java, .kt, sử dụng các đối tượng có sẵn của Android kiểu như: linearLayout.add(new Button())

Các bạn vẫn hay dùng …** một trong hai cách** trên phải không nào 😀

Nhưng đó chưa hẳn đã hết, còn cách nữa, đó là:[ Litho: A declarative UI framework for Android
](https://fblitho.com/)

<img src="https://fblitho.com/static/logo.png"/>
    
Litho – phát triển bởi facebook – thử xem sao
    
Một số cái hay mình thấy là:

- **Asynchronous layout**: có thể tính toán kích thước, tính cho view con ở background hết (bình thường là mainthread), chỉ draw là vẽ ở main thread.
    
- **Flatter view hierarchies**: giảm số lượng ViewGroup => tăng hiệu suất, cải thiện bộ nhớ, …
    
Link trang chủ: https://fblitho.com/

Link git: https://github.com/facebook/litho

### 9. Bạn có hay đọc medium ?
    
Các bạn có biết tới [medium](https://medium.com/) ?? Cho bạn nào chưa biết thì đó là một … **mạng xã hội** (kiểu facebook, twitter đó :)) ) dưới dạng blog.

Trên đó bạn có thể đọc được .. **rất nhiều điều hay**, những chia sẻ, kinh nghiệm, câu chuyện các thứ – kiểu như blog của mình này :D. Bạn nào hay đọc** share **mình một số bài hay nào !!!

Mình cũng rất hay vào đọc, về Android, Kotlin, kiến thức lập trình, kinh nghiệm sống các thứ, … Nói chung là hay, chất, đỉnh.

Nhưng cái bạn sau một thời gian dùng sẽ gặp là như sau

<img src="https://codecungtrung.com/wp-content/uploads/2020/01/medium-768x310.png"/>
    
Sau một thời gian dùng và …
Hiểu đơn giản là bạn đang … đọc miễn phí, dạng** free member**. Bạn phải nâng cấp lên trả phí (5$/month) đó thì mới dk đọc .. ko giới hạn.

Và bạn không muốn trả phí ? Dễ là điều dễ hiểu mà :3

Đơn giản nhất là bạn bật **“Cửa sổ ẩn danh”** là sẽ ko bị như hình.

### 10. Set background theo màu ảnh nền
    
Bạn muốn set background – phần màu tím trên hình đó theo màu nền của bức ảnh ?
    
<img src="https://codecungtrung.com/wp-content/uploads/2020/01/c11-576x1024.jpeg"/>

Bạn hãy search google từ khóa sau: “**dominant color từ image android**” là ok

Chính là bạn sẽ sử dụng Palette API, có thể xem tại: 
    https://developer.android.com/training/material/palette-colors

### 11. AsyncTask trong Android
AsyncTask sẽ bị …deprecated trong Android 11, các bạn có thể xem[ tại đây](https://www.xda-developers.com/asynctask-deprecate-android-11/) và [đây](https://www.techyourchance.com/asynctask-deprecated/)
    
 Good bye ‘n’ tks AsyncTask 🙁

<img src="https://www.techyourchance.com/wp-content/uploads/2019/11/async_task_deprecated.jpg"/>

Thay thế các bạn có thể sử dụng Rx, coroutine (trong kotlin)

### 12. Sequence trong Kotlin – nên thử ?
Bạn chưa học Kotlin, nên … học ngay đi nha. Chưa biết đến sequence, có thể xem tại: https://kotlinlang.org/docs/reference/sequences.html

Xử lý sequence thường nhanh hơn xử lý collection trực tiếp khi chúng ta có nhiều bước xử lý

Ta có đoạn code như sau: Code list thường vs code dùng sequence
    
 <img src="https://codecungtrung.com/wp-content/uploads/2020/01/sequenc.png"/>

Và thời gian chạy trung bình như sau

SequencesBenchmark.productsListProcessing **712 434 ns/op** 
    
SequencesBenchmark.productsSequenceProcessing **572 012 ns/op**

Tính ra nhanh hơn **20% lận**. Để chi tiết hơn, các bạn có thể [xem tại đây](https://blog.kotlin-academy.com/effective-kotlin-use-sequence-for-bigger-collections-with-more-than-one-processing-step-649a15bb4bf)
    
### Tạm kết
    
Vậy là hết rồi. Có gì các bạn để lại ý kiến nhé 😀
    
Bài viết cũng đồng thời được đăng tại blog cá nhân, ngó qua để học thêm nhiều điều nữa nhé mn 😄

[Tổng hợp kiến thức tháng 12/2019](https://codecungtrung.com/note/note-thang-12-2019/)