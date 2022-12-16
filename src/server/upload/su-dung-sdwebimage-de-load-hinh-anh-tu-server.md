# **Giới thiệu**
Ngày nay các ứng dụng điện thoại và các trang web thì đa phần đều có xuất hiện những hình ảnh để hiển thị các sản phẩm như quần áo, còn những trang báo thì sẽ hiển thị hình ảnh chính để bắt mắt người xem. Thì chỉ nói qua như vậy thì bạn cũng đã biết việc có hình ảnh trên các ứng dụng hay website đa phần đều xuất hiện ( không muốn nói là bắt buộc ). 

Vậy chính vì lý do đó việc chúng ta tối ưu cho app hay web nói chung hay những tài nguyên của hình ảnh của chúng ta nói riêng là cực kì quan trọng và nó sẽ ảnh hưởng ít nhiều đến trải nghiệm của người dùng.

### Xử lý hiển thị hình ảnh theo cách thủ công

![](https://images.viblo.asia/d2f51dd6-177d-4863-bd8f-5e1766d13675.png)

Đây là cách thủ công để chúng ta có thể lấy ra image và update lên image lên ứng dụng của chúng ta, ở đây mình chưa sử dụng cache để lưu nhưng các bạn cũng thấy nó cũng rất là dài dòng. Vậy có cách nào giúp chúng ta giải quyết vấn đề load ảnh từ trên server về và lưu vào cache mà nhìn gọn hơn không? Thì câu trả lời là có, đó chính là **SDWebImage**

### SDWebImage

Là 1 framework bên thứ ba được viết bằng ngôn ngữ Objective-C, nó giúp chúng ta trong việc load image từ trên server và lưu vào cache 1 cách bất đồng bộ. Khi mà load ảnh xong thì nó sẽ lưu vào cache đồng thời sẽ lưu vào disk cho chúng ta để giúp nâng trải nghiệm của người dùng. 

Cài đặt cũng khá là đơn giản bạn có thể làm theo các bước ở trong bài viết của chính chủ ở đường link sau:
[SDWebImage Github](https://github.com/SDWebImage/SDWebImage)

Những dòng code dài dòng như trên sẽ được rút gọn chỉ bằng chừng này để có thể load ảnh và lưu vào cache lẫn disk:
```
imageLoad.sd_setImage(with: URL(string: photos[0]), completed: nil)
```

### So sánh SDWebImage và Kingfisher
Khi 2 framework được sinh ra với cùng 1 mục đích thì không tránh việc sẽ bị so sánh, ở đây có 1 framework cũng được sử dụng nhiều trong việc load hình ảnh đó là [Kingfisher](https://github.com/onevcat/Kingfisher)( bạn có thể click vào đây để tìm hiểu ).

- SDWebImage là pure Objective-C còn Kingfisher là pure Swift
- SDWebImage hỗ trợ load ảnh liên tục trong thời gian load ảnh đó từ trên server, tính năng này tới version 5.5 thì Kingfisher mới có
- SDWebImage hỗ trợ load ảnh có định dạng là WebP ( từ version 5.0 được chuyển sang thư viện độc lập có tên  SDWebImageWebPCoder ), Kingfisher phải sài thư viện bên ngoài có tên là KingfisherWebP
- SDWebImage không hỗ trợ SwiftUI ( install thư viện SDWebImageSwiftUI để sử dụng ), Kingfisher hỗ trợ SwiftUI

### Tổng kết
Thì đó là những gì mình muốn giới thiệu về những gì mà khi các bạn sử dụng Framework bên thứ 3 để làm nâng cao hiệu suất làm việc của bạn thay vì ngồi viết lại những tính năng mà đã có sẵn ở trên mạng và được các lập trình viên khác tin tưởng nó sẽ làm tiết kiệm thời gian và cũng như công sức của bạn hơn. 

Còn nhiều tính năng hay ho mà bạn cũng có thể khám phá ở trên link github chính chủ mình đã post ở trên để các bạn có thể khám phá. Trời cũng tối rồi thì mình cũng xin phép dừng tại đây, chúc các bạn có 1 ngày tốt lành!!