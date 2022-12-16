Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây:
https://medium.com/codex/xcodes-built-in-refactoring-tool-is-awesome-21492b236ab6

Các công cụ giúp tái cấu trúc mã có sẵn của Xcode có thể là một công cụ tiết kiệm thời gian tuyệt vời. Hơn nữa là các tính năng tái cấu trúc này cực kỳ đơn giản để học và làm thực hiện.

![](https://images.viblo.asia/649a9c10-10a5-4f06-ad76-d2796889a15c.jpeg)

Công cụ tái cấu trúc mã trong Xcode đã có được một thời gian, nhưng tôi chắc chắn rằng nhiều người trong chúng ta vẫn chưa tìm thấy nó hoặc không có thời gian để khám phá các tính năng hữu ích của nó.

Các tiện ích này có thể được sử dụng để chuyển đổi mã cả trong một tệp và trên nhiều tệp. Ví dụ: bạn có thể dễ dàng đổi tên một phương thức được sử dụng trong nhiều tệp cùng một lúc. Hãy bắt đầu cấu trúc lại!

### Đổi tên
Để tránh các việc thủ công, lặp đi lặp lại, khi đổi tên các biến, phương thức, v.v. bằng cách sử dụng các tính năng đổi tên trong công cụ tái cấu trúc Xcode.
#### Đổi tên bằng tính năng “Rename”
Tính năng này tìm tất cả những nơi mà đoạn mã được sử dụng và đổi tên nó theo ý bạn:

![](https://images.viblo.asia/4dc0187a-3f42-49d9-9a0a-5f51956e5f04.gif)

#### Đổi tên sử dụng “Edit All in Scope”
Bạn có thể đổi tên một đoạn mã trong một tệp cụ thể bằng bấm phím `command` + nhấp chuột và đổi tên đoạn mã như sau:

![](https://images.viblo.asia/354d7861-1644-4e2a-bc94-9204d6696f27.gif)

### Chỉnh sửa với nhiều con trỏ

![](https://images.viblo.asia/52b3792a-5c06-4a83-9415-8c3af6d049bd.gif)

Bạn có thể dễ dàng chỉnh sửa mã nhiều con trỏ theo 4 cách sau đây:
* `shift`+`control`+`left mouse click`: tạo một con trỏ mới trên mỗi lần nhấp (như ảnh gif ở trên)
* `shift`+`control`+`arrow up`: tạo một con trỏ mới tại một dòng phía trên
* `shift`+`control`+`arrow down`: tạo một con trỏ mới tại một dòng bên dưới
* `option`+`drag`: tạo con trỏ mới trên mỗi dòng mà bạn kéo qua

### Trích xuất mã đã chọn thành 1 phương thức mới
Bạn có thể làm cho mã của mình dễ đọc và ngắn gọn bằng cách trích xuất các đoạn mã thành các phương thức riêng biệt. Bạn có thể tiết kiệm thời gian bằng cách thực hiện việc này với công cụ tái cấu trúc có sẵn trong XCode như sau:

![](https://images.viblo.asia/29fdc095-2dea-41bd-a9a8-2c048a80e319.gif)

### Trích xuất các biến
Tương tự như việc trích xuất một đoạn mã thành một phương thức riêng biệt, bạn có thể dễ dàng trích xuất một biểu thức thành một biến:

![](https://images.viblo.asia/91fd4df7-555a-4bc8-90dd-68bf422de153.gif)

### Trích xuất tất cả các trường hợp xuất
Rất giống với 2 cái trên trên, bạn cũng có thể trích xuất tất cả các lần xuất hiện của một biểu thức giống hệt nhau thành một biến:

![](https://images.viblo.asia/4fbeb734-8a23-42f7-9622-35ef2d6bbeba.gif)

### Thêm các trường hợp `switch-case` bị thiếu
Nếu bạn đang sử dụng `default` trong câu lệnh `switch`, trình biên dịch sẽ không hiển thị bất kỳ lỗi nào về các trường hợp thiếu mà bạn chưa đề cập.

Trong trường hợp này, bạn có thể sử dụng công cụ tái cấu trúc của Xcode để mở rộng câu lệnh `switch` nhằm bao gồm tất cả các trường hợp:

![](https://images.viblo.asia/b8ecdb57-0d43-473c-82b3-060081050239.gif)

### Lời kết
Tôi hy vọng bạn thấy những lời khuyên này hữu ích.