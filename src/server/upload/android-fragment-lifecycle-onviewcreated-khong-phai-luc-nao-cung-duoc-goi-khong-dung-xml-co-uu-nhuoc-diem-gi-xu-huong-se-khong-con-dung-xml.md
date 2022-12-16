Hầu hết mọi người sử dụng Fragment đều quen với việc tạo UI bằng cách inflate file XML trong `onCreateView(…)`. Với cách này thì Lifecycle của Fragment chạy đúng như những gì chúng ta biết. Nhưng nếu chúng ta không làm theo "kiểu truyền thống" thì sao? Hãy xem bài viết của mình nhé :hugs: !

### 1. onViewCreated(…) không được được gọi khi nào?
Bạn xem qua đoạn code dưới, mình không dùng XML:
![](https://images.viblo.asia/c3185b57-caf0-438d-8865-3bea341dd36d.png)
Mọi người thấy mình đang code wrapper camera chứ, và mình không cần dùng XML trong `onCreateView(…) `như thường lệ. Mình tạo view bằng code. Mọi thứ vẫn chạy bình thường, camera của mình vẫn hoạt động bình thường. Nhưng mà ở trong `onCreaView(..)` mình đang `return super.onCreateView(…)` do vậy `onViewCreated(..)` sẽ không được gọi đâu nha. Bạn `return null` thì `onViewCreated(..)`  cũng không được gọi.


Còn nếu không dùng XML mà vẫn muốn `onViewCreated(..) `được gọi thì sao?
Thì bạn sẽ làm như thế này:
![](https://images.viblo.asia/e296c9ef-0d46-4783-937a-3d584f44ebd0.png)
Thấy đó, mình khởi tạo `viewGroup` bằng code, rồi add các view children vào. Sau đó return `viewGroup`. Như thế này thì `onViewCreated(..)` vẫn được gọi bình thường nha :grinning: .

### 2. Không dùng XML có ưu, nhược điểm gì?
Các bạn biết đấy, file `.apk` gồm tập hợp file `.dex`, `AndroidManifest.xml`, folder `res` và 1 số thành phần khác được nén lại. Bạn làm cách không dùng XML cho Fragment như thế này thì sẽ tiết kiệm được vài KB ở trong folder `res` :sweat_smile: -> giảm được size `.apk`.

Và về bản chất khi bạn dùng file XML truyền vào cho thằng inflater ý, thì thằng inflater nó sẽ phân tích file XML này từ các markup(ImageView, ListView,..), các attribute(android:layout_width, android:layout_height,..) rồi nó tạo view cho bạn vẫn bằng java mà thôi, xong nó sẽ return cho bạn cái view, để rồi bạn lại return cho thằng `onCreateView(..): View? `. Nghĩa là bạn tạo view bằng code thì tốc độ sẽ nhanh hơn bạn dùng XML. Nhưng trong thực tế thì chúng ta cứ dùng XML thôi, vì sự chênh lệch đó là không đáng kể, chứ những layout/viewgroup phức tạp mà tạo view bằng code thì sẽ phức tạp và mất thời gian lắm, dễ nhầm nữa :sweat_smile: . Trừ khi bạn dùng Jetpack Compose thì sẽ không phức tạp nữa :v

### 3. Xu hướng sẽ không còn dùng XML?
Mình nghĩ rằng dùng XML là bất tiện hơn khi 1 màn hình cần được cấu hình từ 2 file là file code và file xml. Vậy nên xu hướng người ta sẽ không còn muốn tồn tại file xml để làm giao diện nữa. Bạn có thể thấy Framework Flutter họ code trực tiếp giao diện bằng những mã Dark luôn rồi. iOS thì họ cũng có SwiftUI, Android cũng đang có và tiếp tục phát triển Jetpack Compose để làm điều này rồi .
Cách code kiểu không dùng XML này nó có 1 thuật ngữ để nhắc đến mà mình quên mất rồi :v
Vậy nên cá nhân mình cho răng xu hướng làm Android nói riêng sẽ không tạo giao diện bằng XML nữa đâu :D

Bài viết của mình xin được kết thúc tại đây, hẹn gặp lại các bạn trong những bài viết sắp tới :beer: :beers: !