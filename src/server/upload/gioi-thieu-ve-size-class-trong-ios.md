Đây là bài dịch từ trang [medium.com](https://medium.com). Mời các bạn xem bài gốc tại đây: https://medium.com/@benjamin.font/introduction-to-ios-size-classes-732862ffb45e

**Size Classes** là một công cụ giúp việc xây dựng giao diện người dùng cho các thiết bị iOS dễ dàng hơn. Không phải tất cả mọi người đều biết về sự tồn tại của chúng, vì vậy, dưới đây là một số giới thiệu nhỏ về **Size Classes** trong iOS.

### Size Classes là gì?
Định nghĩa **Size Classes** trong tài liệu của Apple là: "Size Classes là các đặc điểm tự động được gán cho các vùng nội dung dựa vào kích thước của chúng.
Trong thực tế, **Size Classes** là các thuộc tính bạn có thể tìm thấy trong **Interface Builder** hoặc trong **UITraitCollection** của View, chúng cho phép thêm biến thể cho một số thành phần đồ họa của bạn tùy thuộc vào kích thước chiều dọc và chiều ngang của thành phần.
Hiện tại, mỗi thuộc tính kích thước có 2 biến thể: **compact** hoặc **regular**
Điều này cung cấp cho chúng ta nhiều trạng thái có thể có cho một chế độ xem nhất định:
* Regular width và height
* Compact width và height
* Regular width và compact height
* Compact width và regular height
Có một điều quan trọng cần lưu ý là **UIUserInterfaceSizeClass** bao gồm giá trị thứ ba: **unspecified** (không xác định).
Khái niệm **Size Classes** và giá trị màn hình tương ứng của chúng có thể được tìm thấy trên [Tài liệu của Apple](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/).

### Cách sử dụng size classes
Để hiểu rõ hơn, hãy xem ví dụ sau: Tôi có một ứng dụng đơn giản cần hiển thị nút “Hello” cho người dùng. Hãy xây dựng màn hình này:

![](https://images.viblo.asia/5473f49c-b8c0-496f-8b85-8a3a42188dbd.png "Ảnh chụp màn hình iPhoneSE và iPad Pro" )

Như chúng ta có thể thấy, trên điện thoại, mọi thứ trông sẽ ổn, nhưng nếu chúng ta khởi chạy ứng dụng của mình trên một màn hình lớn hơn, chẳng hạn như iPad, văn bản hiển thị rất nhỏ, vì kích thước văn bản của chúng ta giống nhau trên mọi thiết bị.
Một cách để giải quyết vấn đề này là bằng cách thêm một biến thể cho kích thước của Label, sử dụng các **size classes**:

![](https://images.viblo.asia/07cf9ac0-1a6e-44b0-9081-970b0c99c406.png)

Thêm một biến thể cho **Regular width/height** cho phép chúng ta đặt kích thước văn bản lớn hơn cho nút của mình khi hiển thị trên mọi iPad, cả chế độ dọc và ngang. Hãy xem kết quả:

![](https://images.viblo.asia/035fbe90-7b91-44b8-be67-776e26b4f3c1.png)

Như chúng ta có thể thấy, hệ thống đã chọn đúng biến thể của thuộc tính nút dựa trên thiết bị chạy ứng dụng. Bằng cách biết kích thước màn hình ẩn phía sau các lớp này, chúng ta có thể tùy chỉnh các phần tử đồ họa của mình để phù hợp hơn với nhu cầu của người dùng và xây dựng các đáp ứng hiển thị tốt hơn.

### Một ví dụ thực tế
Trong khi thực hiện dự án công ty của mình, tôi cần thay đổi một số màn hình đăng ký / đăng ký để thêm nhãn và yếu tố đồ họa mới. Thách thức chính liên quan đến nhiệm vụ này là giữ cho khả năng sử dụng của màn hình của tôi, bất kỳ thiết bị hoặc hướng nào.
Cùng tạo màn hình đăng nhập cho ứng dụng “Xin chào” của chúng tôi bằng **UIStackView**:

![](https://images.viblo.asia/3a06e382-f01d-4aea-8d4e-5a214675a77b.png)

Như chúng ta có thể thấy, khi sử dụng ứng dụng ở chế độ ngang, người dùng không thể đăng nhập vì nút xuất hiện bên ngoài màn hình, đây là một trải nghiệm người dùng không tốt. Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng các size classes của view.
Vì **UITextFields** và **UIButton** là những tác nhân tương tác cần thiết trên màn hình của tôi, tôi chọn ẩn **UILabels** khi chiều cao của màn hình ở chế độ **"compact"**:

![](https://images.viblo.asia/93e11950-4cd1-4f31-89ad-12ef90c873da.png)

Nhờ khả năng thích ứng tuyệt vời của **UIStackViews**, view của tôi tự động điều chỉnh khi tôi chuyển sang chế độ ngang. Người dùng hiện có thể nhập thông tin đăng nhập của họ và không còn bị kẹt trên màn hình đăng nhập, điều này thật tuyệt!

### Xa hơn chút nữa
Tất nhiên, **Size Classes** cũng có thể được sử dụng trong mã của bạn, cả Objective-C và Swift. Các thuộc tính **verticalSizeClass** và **verticalSizeClass** là những thuộc tính bạn cần quan tâm và chúng nằm trong **traitCollection**.

Khai thác các thuộc tính này, cho phép chúng ta sử dụng **Size Classes** để điều chỉnh chính xác hơn so với trong **Interface Builder**. Ví dụ: bạn có thể xử lý sự thay đổi từ lớp kích thước này sang lớp kích thước khác bằng cách ghi đè **traitCollectionDidChange()** và so sánh lớp kích thước trước đó của bạn với lớp hiện tại cho các hoạt động cụ thể:

![Swift](https://images.viblo.asia/9f303c5d-6dc4-46fa-9876-cc826a882d8b.png)

![Objective-C](https://images.viblo.asia/a4be70e5-f1c5-43ce-8bd2-fe2803ba37af.png)

Đây chỉ là những ví dụ đơn giản trong nhiều thứ bạn có thể làm với **Size Classes**, bạn chọn sử dụng **Interface Builder** hoặc trực tiếp mã của mình. Sử dụng với các trạng thái này có thể cho phép bạn có trải nghiệm người dùng tốt hơn trên các màn hình lớn như iPad hoặc đơn giản là để cải thiện khả năng sử dụng của ứng dụng, xử lý các thao tác xoay thiết bị và hơn thế nữa.

Việc khám phá các lớp học về quy mô đã giúp tôi rất nhiều trong công việc và với tư cách là một nhà phát triển Junior vẫn đang học hàng ngày, tôi ước mình phát hiện ra sự tồn tại của chúng sớm hơn trong sự nghiệp iOS của mình.

Tôi hy vọng bạn thấy phần giới thiệu nhỏ này hữu ích, cảm ơn vì đã đọc!