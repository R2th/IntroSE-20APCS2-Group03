Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây: https://stevenpcurtis.medium.com/use-swiftui-in-a-playground-4f8a74181593

![](https://images.viblo.asia/42f7234c-57b9-480b-a1ae-b1d4e42ab634.jpeg)

**Playground** là một cách tuyệt vời để viết mã và bạn thậm chí không cần thiết bị kiểm tra mã mà mình vừa viết.
Nhưng làm thế nào bạn có thể kết hợp **SwiftUI** với **Playgrounds**? Hãy đọc tiếp nào.
### Điều kiện tiên quyết:
* Cài đặt **Xcode** trên máy Mac hoặc **Playground**  trên [iPhone hoặc iPad](https://apps.apple.com/sg/app/swift-playgrounds/id908519492).
### Các thuật ngữ
* **Playgrounds**: Một môi trường phát triển có thể được sử dụng để viết mã **Swift**
* **Swift**: Một ngôn ngữ lập trình mã nguồn mở cho macOS, iOS, watchOS và tvOS
### Tạo Playgrounds: trên máy Mac
Bạn cần phải tải xuống và cài đặt Xcode trên máy Mac của mình.
Sau đó bạn có thể chuyển qua menu **File > New Playground**
Sau đó, bạn chọn **iOS > New Playground** trong màn hình dưới. Bằng cách chọn iOS, chúng ta sẽ có sẵn `UIKit` trong **Playground** sẽ được tạo  (điều đó thật tuyệt, vì chúng ta cần điều đó).

![](https://images.viblo.asia/b9e48117-a5a6-413e-ad92-12b85d768882.png)

Bạn sẽ cần chọn nơi bạn muốn lưu trữ cho Playground của mình. Đây là hướng dẫn trực quan:

![](https://images.viblo.asia/b4bd2463-1fa5-4f30-ab58-d13abf4b06f9.gif)

Như bạn thấy trong hướng dẫn trên, khi tôi chạy đoạn lệnh sau đây:
```
var str = "Hello, playground") 
print("Hello, playground")
```
 thì bảng điều khiển / bảng gỡ lỗi sẽ xuất hiện ở cuối màn hình. 
Đây là một cơ hội tốt để tôi giới giới thiệu các khu vực chính của màn hình, các bạn xem ảnh minh họa dưới:

![](https://images.viblo.asia/1e06d6d0-155a-4c65-9939-a6c172074575.png)

### SwiftUI
Chìa khóa ở đây là dùng `UIHostingController` để hiển thị chế độ nội dung của bạn.
Bạn muốn một ví dụ về mã? Không vấn đề gì:

![](https://images.viblo.asia/ebdd474f-76ef-40a2-8e43-476010420df5.png)

Đoạn mã trên hiển thị chuỗi *Hello, world!* ngay giữa màn hình bên phải **Playground** - theo phong cách SwiftUI!

![](https://images.viblo.asia/cb5127d3-8a53-4fc0-809d-0ce56db60cde.png)

Bạn có thể sử dụng phím tắt để bật tắt chế độ xem trực tiếp bằng cách bấm cùng lúc các phím **option-command-enter** trên bàn phím. Điều đó sẽ thật tuyệt vời phải không?
### Phần kết luận
Vâng chúng ta đã có **SwiftUI** trên **Playground**.

Hi vọng bài viết sẽ giúp ích được nhiều cho bạn!