Tại Google I/O, có rất nhiều tin tức mới về phiên bản Android mới nhất, Android P. 

Một trong những tính năng mới của Android P là chức năng Magnifier mới - ta có thể gọi nôm na là kính lúp - giúp bạn có thể dễ dàng xem và chọn nội dung mà kính lúp hiện thị cho bạn. 

Trong bài viết này, chúng ta sẽ đi sâu vào cái kính này là gì và nó sẽ có những tính năng gì giúp ích cho chúng ta, tất nhiên là cách sử dụng nó trên các ứng dụng của chúng ta.

Đầu tiên, nó sẽ trông như sau:

![](https://images.viblo.asia/cb475b6a-7f48-48dc-a60e-955de27695fa.gif)

Thao tác này khá đơn giản nhưng sẽ tạo nên các tính năng rất quan trọng. 

Khi các bạn so sánh với iOs, việc chọn một đoạn text trong Android chưa bao giờ là một cái gì đó đơn giản. 

Công cụ mới này sẽ giúp mọi việc trở nên dễ dàng hơn, ngoài ra khi nói đến khả năng truy cập thì tính năng mới này cũng làm cho các tác vụ liên quan đến văn bản trở nên đơn giản và dễ dàng hơn, thậm chí có những người dùng công cụ này để đọc nội dung văn bản một cách rõ ràng hơn.

Về phía phát triển, Magnifier tự động có sẵn cho tất cả các view được extend từ TextView, vì vậy bạn sẽ không phải thay đổi bất cứ thứ gì trong code có sẵn.

Khi bạn muốn tạo một Magnifier, đơn giản bạn chỉ cần gọi lớp constructor truyền view vào Magnifier.

```
val magnifier = Magnifier(someView)
```

và chúng ta sẽ tạo các hàm để lắng nghe hành động

```
someView.setOnTouchListener { view, motionEvent ->
    when (motionEvent.action) {
        MotionEvent.ACTION_DOWN -> {
            magnifier.show(motionEvent.x, motionEvent.y)
        }
        MotionEvent.ACTION_MOVE -> {
            magnifier.show(motionEvent.x, motionEvent.y)
        }
        MotionEvent.ACTION_UP -> {
            magnifier.dismiss()
        }
    }
    true
}
```


Bây giờ, khi có hành động `ACTION_DOWN`, chúng ta gọi hàm magnifier show() - hiển thị kính lúp trên màn hình, nó bao gồm 2 tham số truyền vào:

> xPosInView - tọa độ ngang
> 
> yPosInView - tọa độ dọc

Khi chúng ta gọi nó, kính lúp sẽ dựa vào các tọa độ đã cho để hiện thị nội dung view. 

Tương tự ta cũng gọi khi có `ACTION_MOVE` - người dùng di chuyển ngón tay.

Lưu ý: Kính lúp cũng có 1 hàm update() để buộc cập nhật nội dung của nó, tuy nhiên điều này ko có bất kỳ tham số nào truyền vào, chỉ sử dụng tọa độ ban đầu được truyền vào hàm show().

Cuối cùng, khi có sự kiện `ACTION_UP` chúng ta chỉ cần gọi đến hàm dismiss() để ẩn kính lúp ra. 

Có những trường hợp bạn có thể tận dụng kính lúp, đơn giản là chỉ cần truyền view của bạn vào là ta đã có một tính năng rất thú vị.

![](https://images.viblo.asia/3ce132dc-6689-4043-92b9-56c53b939a46.gif)

![](https://images.viblo.asia/89000794-0086-4cc8-b12c-8c1604bc2c23.png)

Hy vọng bài viết ngắn này đã chia sẻ một số thông tin hữu ích về lớp Magnifier mới trong Android P. Chúc các bạn code vui!

[Nguồn](https://medium.com)