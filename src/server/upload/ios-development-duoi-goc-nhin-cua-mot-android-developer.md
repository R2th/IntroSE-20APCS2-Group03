# Tổng quan
Ở bài viết này, mình muốn đề cập đến những ưu điểm và nhược điểm của `iOS Development` với góc nhìn là một `Android Developer`. Tất nhiên bài viết chỉ có thể ở mức tương đối, khách quan chứ chưa đi vào cụ thể được.

# Ưu điểm
### The Storyboard
Có thể nói `Storyboard` là một điểm cộng khá lớn trong việc thiết kế giao diện mà không cần phải tự tay gõ code. So với `Layout Editor` trên `Android Studio`, `Storyboard` có vẻ trội hơn nhiều.

Đơn giản là việc tạo một list các items, bạn có thể dễ dạng tạo ra một simple view mà chỉ cần sử dụng đến `GUI builder`.
### Xcode’s integration
Yup, lại thêm một điểm cộng nữa đó chính là việc chúng ta có thể tạo nhiều màn hình và sau đó liên kết chúng với nhau bằng việc sử dụng các button trong khi xử lý các ngăn xếp một cách chính xác mà không cần phải tự tay gõ code.

Điều mà làm mình thật sự ấn tượng đó chính là việc chúng ta có thể hoàn thành việc tạo ra một simple view cho một list các items và liên kết mỗi item tương ứng đến một view nào đó mà chỉ với việc sử dụng `GUI builder`. Nhưng bằng cách nào nhỉ?

Chúng ta cũng không cần phải cung cấp `id` cho các `Views` để sử dụng trong `ViewController` (tương ứng với `Activities` hay là `Fragments`), việc chúng ta cần làm là kéo thả các `Views` vào các `ViewController` khi sử dụng `Assistant Editor`.

### Swift
> Swift is a powerful and intuitive programming language for macOS, iOS, watchOS and tvOS ([nguồn](https://developer.apple.com/swift/)).


So với `Objective-C`, `Swift` có vẻ ngắn gọn, thân thiện hơn trong việc viết và đọc code. Và hơn thế, nếu đi sâu hơn, có lẻ `Swift` còn được cải tiến nhiều hơn.

Cùng xem một ví dụ đơn giản sau nhé.

![](https://images.viblo.asia/f1b856af-72f6-47e7-9ff2-1647ab689b53.png)

Trên đây, là một vài ưu điểm mà chúng ta có thể dễ dàng thấy được, vậy còn nhược điểm thì sao?

![](https://images.viblo.asia/d1cac56a-991c-4f5a-aa84-963c765309c7.png)

# Nhược điểm
### Expensive to start anything
Chỉ cần một dàn PC hay một chiếc laptop tầm giá 12-13m, là chúng ta có thể trở thành một `Android developer` rồi đúng không nào? Ở đây mình chỉ nói về vấn đề vật chất thôi nhé :laughing:.

Còn để code iOS App, chúng ta phải cần đến MacBook, và tất nhiên MacBook thì không rẻ chút nào. Đến Iphone còn phải bán thận để mà mua cơ mà :thinking:.

![](https://images.viblo.asia/eb258b71-a5b6-42ce-93bb-57dbdf5afd8d.jpg)
### Xcode’s Sluggishness
Tồn tại vấn đề chậm trễ về thời gian giữa quá trình raise lên một `syntax error` và việc `Xcode` phát hiện ra lỗi. Và đôi lúc, lỗi chỉ hiển thị khi chúng ta build app.

Vấn đề tiếp theo, việc load `Storyboard` như thể chúng ta đang load lại `IDE` một lần nữa.

Cuối cùng, chức năng `autocomplete` còn quá tệ so với cách mà `Android Studio (IntelliJ)` thực hiện.

Ngoài ra, đôi lúc khi kết nối `IBOutlet` từ `Storyboard` đến `ViewController` tương ứng sẽ gặp phải lỗi và chúng ta cần phải restart lại `Xcode`.
### Swift Inconsistencies
Một vài functions ở **Swift 2** bị *renamed* khi update lên **Swift 3**. Điều này dẫn đến các rủi ro khi update version. Đương nhiên, việc update version ở bất kì dự án nào không chỉ riêng mỗi iOS application đều sẽ có nhiều vấn đề phát sinh và không được khuyến khích thực hiện. Nhưng hãy xem ví dụ cụ thể về một sự thay đổi nhé.

Theo như tài liệu mô tả thì hàm `flatMap(...)` bị renamed thành thành `compactMap(...)`.

![](https://images.viblo.asia/70a7ad60-a200-4def-864c-0f9da49d8210.png)

Vậy cùng thử test xem nhé.

![](https://images.viblo.asia/5ee392ef-c79b-444c-972a-764c911dc316.png)

Chỉ là thay tên đổi họ thôi, sao kết quả lại khác nhau nhỉ :thinking:.

# Kết luận
Tuy là một `Android developer`, nhưng đôi lúc mình cũng bỏ một ít thời gian để tìm hiểu thêm, sau này có thể sẽ thuận tiện hơn trong việc chuyển đổi ngôn ngữ nếu như thiếu *resources* đúng không nào?

Dưới góc nhìn của một `Android developer`, các quan điểm ở trên có thể sẽ không được chính xác hay không đúng bởi vì mình chưa có cái nhìn chuyên sâu cũng như thời gian tiếp xúc với **iOS development** chưa đủ lâu để có thể đưa ra một cách nhìn nhận cũng như quan điểm chính xác và đúng đắn.

### Tham khảo
Android Pub