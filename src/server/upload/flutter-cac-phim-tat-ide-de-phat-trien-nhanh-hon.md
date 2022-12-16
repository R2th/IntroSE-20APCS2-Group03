Nếu bạn chưa quen với việc phát triển Flutter thì bạn phải tìm hiểu kỹ về các cấu trúc lồng vào nhau, mức độ khó khăn để thêm hoặc xóa các widget con ở giữa mã hay mức độ khó tìm nơi một widget con kết thúc và một widget con khác bắt đầu. Sau đó, bạn dành cả ngày để khớp các dấu ngoặc mở với dấu đóng của chúng. Chúng tôi đã mất thời gian để tìm ra các phím tắt, nhưng có thể bạn sẽ không phải mất thời gian để tìm hiểu điều đó vì tôi sẽ cung cấp cho bạn; và tôi đã sắp xếp tất cả các phím tắt cho phép phát triển nhanh hơn và mượt mà hơn trong Flutter.

### Tạo Stateless hoặc Stateful widget

Đoán xem nào? Bạn không phải viết thủ công các class widget của mình và ghi đè các function có sẵn. IDE có thể làm điều đó cho bạn!

Chỉ cần gõ `stless` để tạo một Stateless Widget như sau:

![](https://images.viblo.asia/03f8e58f-935a-4e35-b4d6-6111164769a3.gif)

Hoặc stful để tạo Stateful Widget:

![](https://images.viblo.asia/67995637-fafc-4a1f-8ed6-414db47b948a.gif)

Điều gì sẽ xảy ra nếu bạn đã tạo một Stateless Widget và thêm nhiều lớp con, nhưng sau đó nhận ra rằng sau cùng thì bạn sẽ cần một State? Bạn có nên tạo một `StatefulWidget` mới và sau đó chuyển tất cả mã của bạn sang nó theo cách thủ công? Bạn không cần phải làm như vậy!

Bạn chỉ cần đặt con trỏ vào `StatelessWidget`, nhấn `Alt + Enter` và nhấp vào `Convert to StatefulWidget`. Tất cả mã bảng soạn sẵn sẽ được tạo tự động cho bạn.

![](https://images.viblo.asia/d2cfe9bf-ac02-403b-a2b7-499d8731cda4.gif)

### Những điều kỳ diệu hơn bạn có thể làm với Alt + Enter

Alt + Enter là cây đũa thần bạn sử dụng để phát triển nhanh hơn trong Flutter. Bạn có thể nhấp vào bất kỳ tiện ích nào, nhấn Alt + Enter và xem bạn có những tùy chọn nào cho tiện ích cụ thể đó. Ví dụ:

#### Thêm padding xung quanh widget con

Giả sử bạn có một widget con không phải là Container, vì vậy nó không có thuộc tính padding. Bạn muốn cung cấp một số phần padding nhưng lại sợ làm rối cấu trúc widget con của mình. Với cây đũa thần của chúng tôi, bạn có thể thêm padding của mình mà không làm rối tung bất cứ thứ gì:

![](https://images.viblo.asia/03fae0b4-a545-43c9-9b7a-6f1c0b5d209b.gif)

Chỉ cần nhấn `Alt + Enter` trên widget cần padding xung quanh nó và nhấp vào `Add Padding`. Và bây giờ bạn có thể sửa đổi padding mặc định thành bất kỳ thứ gì bạn muốn.

#### Tạo widget

Đây không phải là điều gì quá phi thường. Nó chỉ tập trung widget của bạn trong không gian có sẵn. Điều này không hoạt động bên trong Column hoặc Row.

![](https://images.viblo.asia/5916c6dd-3216-4a85-81a0-19fa878885e9.gif)

#### Bọc bằng Container, Column, Rown hoặc bất kỳ Widget con nào khác

Bạn có thể sử dụng cách tiếp cận tương tự để bọc widget con của mình bằng Container. Vì vậy, container mới trở thành cha của Widget.

![](https://images.viblo.asia/3880491e-148b-4e06-aeed-a064b9f04f25.gif)

Hoặc, bạn thậm chí có thể kết hợp nhiều tiện ích con với một Column hoặc Row chỉ trong một cú nhấp chuột!

![](https://images.viblo.asia/0f67d6e5-3661-4950-85bd-534b71d734df.gif)

#### Bạn không thích một widget? Loại bỏ nó bằng Magic Wand.

Việc xóa một tiện ích cũng dễ dàng như thêm một tiện ích mới.

![](https://images.viblo.asia/9b8e31a5-de54-4156-a28b-7cacf01490dc.gif)

### Kiểm tra thuộc tính widget con của bạn mà không cần rời khỏi tệp hoặc tab

Nếu bạn muốn kiểm tra xem widget của bạn có thể làm được những điều tuyệt vời nào mà không cần rời khỏi tệp của bạn và tìm hiểu tài liệu, chỉ cần nhấn Ctrl + Shift + I để xem nhanh hàm tạo của Widget.

![](https://images.viblo.asia/36c33518-8cea-4706-bedb-343d5806e228.gif)

### Chọn nhanh toàn bộ widget con

Rất nhiều lần chúng tôi cần tách/xóa toàn bộ widget con và chúng tôi cố gắng chọn chúng theo cách thủ công:

![](https://images.viblo.asia/f17e0a41-5f5a-4f9f-b517-1970c6afca8a.gif)

Nếu đó là một widget thực sự lớn, thì việc tìm ra dấu ngoặc đóng thuộc về Widget nào có thể khá khó hiểu và chúng tôi không muốn làm rối toàn bộ cấu trúc của mình.

Những lúc như thế này, tôi thích sử dụng phím tắt siêu hữu ích này.

Chỉ cần nhấp vào tiện ích bạn muốn tách và nhấn `Ctrl + W`. Toàn bộ Widget được chọn cho bạn mà không cần di chuyển con trỏ của bạn một inch.

![](https://images.viblo.asia/b5a5b274-8bbc-4c9e-9a66-37c941b31364.gif)

### Sửa cấu trúc mã

Đôi khi mã của bạn sẽ chỉ là một mớ hỗn độn. Kiểu như thế này:

![](https://images.viblo.asia/77999e84-46c5-4738-9b80-5a05b8be02d2.png)

Bây giờ, hầu hết các IDE đều có tính năng này, (mặc dù có thể không phải là tổ hợp phím giống nhau). Chỉ cần nhấn Ctrl + Alt + L để sửa lỗi thụt lề và định dạng lại mã của bạn.

![](https://images.viblo.asia/dee94ddd-a174-452e-8b57-263fcd6bebad.gif)

Đó là tất cả các phím tắt mà tôi biết bây giờ. Hãy nhớ kiểm tra lại thường xuyên để biết thêm các mẹo, thủ thuật và những thứ tuyệt vời khác!