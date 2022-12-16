### Nội dung

- Giới thiệu
- How Blurs Work?
- How to apply Blur Effects to images and views in iOS 8?
- Kết Luận

### Giới thiệu

![blurs.png](/uploads/475c0dd5-ccac-4395-ab1f-b0aa02b4db9b.png)

Như chúng ta đã biết, iOS7 được coi là một cuộc lột xác hoàn toàn về thiết kế của iOS. Từ giao diện 3D trên iOS 6 trở về trước, Apple đã thực hiện cuộc cách mạng với xu hướng thiết kế phẳng, đơn giản từ iOS7. Và Blur effect - hiệu ứng làm mờ được coi là một bổ sung tuyệt vời trong việc thiết kế giao diện người dùng.

Apple sử dụng hiệu ứng làm mờ ở cấp độ hệ thống: trong Notification Center sử dụng hiệu ứng này nhưng thay vì làm mờ toàn bộ, mỗi thông báo của Notification Center có nền mờ riêng. Điều này trông đẹp mắt  mà lại giúp nổi bật một cách vừa đủ.

![](https://images.viblo.asia/ac7ade7b-8b66-4302-a565-5d3541d05fbf.png)

Vậy **Blur effect** là gì? Apply nó vào ứng dụng như thế nào?

**Chúng ta cùng tìm hiểu nhé!**

### How Blurs Work?

Chúng ta bắt đầu với việc làm mờ một bức ảnh. Để làm mờ, chúng ta áp dụng một thuật toán mờ cho mỗi điểm ảnh trong hình ảnh, hình ảnh kết quả sau đó là một phiên bản mờ đều từ ảnh gốc. Các thuật toán toán mờ khác nhau theo style và độ phức tạp. Gaussian blur là một thuật toán phổ biến làm mờ phổ biến.
Thuật toán mờ thường kiểm tra từng điểm ảnh của một hình ảnh và sử dụng các điểm ảnh xung quanh để tính toán các giá trị màu sắc mới cho pixel đó.

Nghe có vẻ vẫn khá khó hiểu? Tiếp tục với hình minh họa dưới bạn sẽ hiểu :D

![blur-how1.png](/uploads/ecbe6483-1f4a-44b9-b781-9c74d94498da.png)

Mỗi cell ở grid đại diện cho một điểm ảnh riêng biệt, chúng có giá trị từ 1 đến 10. Xem xét trường hợp thuật toán đánh giá điểm ảnh trung tâm. Xác định giá trị trung bình của các điểm ảnh xung quanh, sau đó gán giá trị này cho điểm ảnh trung tâm. Chúng ta có kết quả như hình dưới đây:

![blur-how2.png](/uploads/ccd1b32b-b2ce-4962-bb51-19b6731c6777.png)

Bạn lặp lại thao tác này với toàn bộ các điểm ảnh từ ảnh gốc.

Các thuật toán ví dụ trên chỉ kiểm tra một điểm ảnh theo mỗi hướng để tạo ra giá trị trung bình mới. Bạn có thể mở rộng bán kính mờ này hơn nữa để tăng lượng mờ trong hình ảnh của bạn, như thể hiện trong hình dưới đây:

![blur-how3.png](/uploads/22ff8ba2-f089-427f-8dfd-9524b0b3567a.png)

Nói chung là nếu bán kính mờ (Radius) càng lớn, thì độ mờ của bức ảnh sẽ càng cao và tất nhiên sẽ yêu cầu GPU xử lý nhiều hơn.

### How to apply Blur Effects to images and views in iOS 8?

![](https://images.viblo.asia/d55ec9e4-4352-4e14-b89a-98e7ebc60411.png)

Nếu như trên iOS7 để tạo hiệu ứng mờ, chúng ta sẽ cần tạo image từ nội dung content bằng việc sử dụng UIGraphic rồi sau đó apply hiệu ứng mờ trên image này.

Từ iOS8 trở đi Apple đã support việc apply hiệu ứng mờ đơn giản hơn rất nhiều, chỉ cần gọi class **UIVisualEffect** là bạn có thể apple hiệu ứng mờ cho bất kì vùng nội dung nào bạn muốn.

Chúng ta cùng xem đoạn code apple blur cho một ImageView:

```Swift
// 1
view.backgroundColor = .clear
// 2
let blurEffect = UIBlurEffect(style: .light)
// 3
let blurView = UIVisualEffectView(effect: blurEffect)
// 4
blurView.translatesAutoresizingMaskIntoConstraints = false
view.insertSubview(blurView, at: 0)

```

Tưởng tượng đơn giản là chúng ta sẽ tạo một blur view với blur efect. Sau đó add blur view này vào trong view chúng ta muốn blur.

UIBlurEffect có 3 options là:
- UIBlurEffectStyleLight
- UIBlurEffectStyleExtraLight
- UIBlurEffectStyleDark

 Hiệu ứng Blur rất tuyệt vời và như thường lệ Apple đưa ra tùy chọn nâng cao hơn với **UIVibrancyEffect** sử dụng kết hợp với UIVisualEffectView điều chỉnh màu sắc của nội dung để làm cho nó cảm thấy sống động hơn.

![vibrancy.png](/uploads/2ea5178c-3e3c-4278-973e-d43185172338.png)

 Để sử dụng hiệu ứng Vibrancy, trước tiên chúng ta cần tạo một Blur sau đó tạo mới hiệu ứng vibrancy với blur đó.

 Chú ý là cả 2 hiệu ứng này chúng ta tạo 2 view riêng biệt và add cả 2 vào view bạn muốn làm mờ.

Chúng ta cùng xem đoạn code dưới đây:

```Swift
// show image
// 1
let vibrancyEffect = UIVibrancyEffect(blurEffect: blurEffect)
// 2
let vibrancyView = UIVisualEffectView(effect: vibrancyEffect)
vibrancyView.translatesAutoresizingMaskIntoConstraints = false
// 3
vibrancyView.contentView.addSubview(optionsView)
// 4
blurView.contentView.addSubview(vibrancyView)
```

### Kết Luận

Quả thật hiệu ứng Blur đã mang lại rất nhiều trải nghiệm tuyệt vời cho người dùng. Tuy nhiên việc lạm dụng nó quá mức sẽ dẫn tới việc gây mất tập trung cho người dùng nếu sử dụng nó không đúng hoặc quá nhiều.

**Cám ơn các bạn đã đọc bài viết này!**

##### _Nguồn:_

[https://www.raywenderlich.com/167-uivisualeffectview-tutorial-getting-started](https://www.raywenderlich.com/167-uivisualeffectview-tutorial-getting-started)