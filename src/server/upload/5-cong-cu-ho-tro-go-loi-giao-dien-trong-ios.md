Bài viết được dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại https://medium.com/better-programming/top-5-tools-for-debugging-your-ios-app-views-ac53cba4cf3b.

Các công cụ dưới đây sẽ giúp gỡ lỗi tốt hơn cho các ứng dụng trên iOS của bạn.
![](https://images.viblo.asia/b2065e47-65cd-44fa-8080-b79f49137081.jpg)

## 1. Sherlock
Sherlock cung cấp một siêu năng lực cho trình giả lập của iOS.

Link cài đặt: [sherlock.inspiredcode.io](https://sherlock.inspiredcode.io/?source=post_page-----ac53cba4cf3b----------------------)

Bạn có thể chỉnh sửa chế độ xem và ràng buộc (constraints) bố cục trong thời gian thực, chạy mô phỏng trên các thiết bị khác và chỉ định thẳng đến mã nguồn, tất cả từ trình giả lập của bạn - mà không cần cấu hình. 

**Yêu cầu**:
Bạn không cần thực hiện bất kì thiết lập nào cả, chỉ cần bạn khởi động Sherlock và sau đó chạy ứng dụng của bạn bằng XCode hoặc trình giả lập trên màn hình chính và Sherlock sẽ tự động kết nối.
Yêu cầu cấu hình:
* macOS 10.11+
* iOS 10.3+

**Giá**:
Từ US$49

-----
## 2. Hyperion
Link cài đặt: [github.com](https://github.com/willowtreeapps/Hyperion-iOS?source=post_page-----ac53cba4cf3b------------------)

Hyperion là một plug-in kiểu ngăn kéo ẩn, có thể dễ dàng được cài đặt vào bất kì ứng dụng nào.
Plug-in ngăn kéo do Hyperion tạo ra được nằm kín đáo trong ứng dụng, khi bạn cần bạn sẽ kéo nó ra, và bạn đẩy nó vào khi bạn không cần đến nó. Các plug-in hyperion được thiết kế giúp bạn kiểm tra ứng dụng một cách nhanh chóng và đơn giản.

**Yêu cầu**:
Vì đây là một công cụ để gỡ lỗi, nên nó sẽ không được đưa vào ứng dụng ở chế độ chạy thực tế, bạn cần loại bỏ nó khi built ứng dụng chạy thật.
Hyperion không yêu cầu bất kì viết mã khi tích hợp.
* iOS 9+
* XCode 10.1+

**Giá**:  Miễn phí

----
## 3. Reveal App
Link cài đặt: [revealapp.com](https://revealapp.com)

Nó giúp bạn chỉnh sửa view mà ứng dụng của bạn đang chạy trong một màn hình rất trực quan, mà không cần phải biên dịch lại ứng dụng.
Kiểm tra các thành phần và cấu trúc view của ứng dụng iOS trong thời gian thực, trực quan 2D và 3D, và nhanh chóng gỡ lỗi các vấn đề về bố cục và hiển thị.

**Yêu cầu**:
Để tích hợp ứng dụng iOS, tvOS, hoặc extension với Reveal, bạn phải kết nối với máy chủ của Reveal.
* macOS 10.11+
* iOS 8+
* tvOS 9+
* XCode 7+

**Giá**:  Từ US$59

-----
## 4. LayoutInspector
Link cài đặt: [github.com](https://github.com/isavynskyi/LayoutInspector?source=post_page-----ac53cba4cf3b----------------------)
Kiểm tra bố cục trực tiếp trên thiết bị iOS. Việc kiểm tra chỉ có thể được kích hoạt nếu ứng dụng đang chạy trong cấu hình ở chế độ *DEBUG*, do đó, nó sẽ không ảnh hưởng đến bất kỳ loại bản dựng ứng dụng nào khác (ví dụ: *RELEASE*). Tương thích với Objective-C.

**Yêu cầu**:
LayoutInspector có sẵn trên [CocoaPods](https://cocoapods.org/pods/LayoutInspector)
* iOS 11.0+
* XCode 10.3+
* Swift 5.0+

**Giá**:  Miễn phí

-----
## 5. FLEX
Link cài đặt: [github.com](https://github.com/Flipboard/FLEX?source=post_page-----ac53cba4cf3b----------------------)
FLEX (Flipboard Explorer) là một bộ công cụ gỡ lỗi được tích hợp vào trong ứng dụng khi phát triển ứng dụng trên iOS.
Khi được hiển thị, FLEX sẽ hiển thị thanh công cụ nằm trong cửa sổ phía trên ứng dụng của bạn. Từ thanh công cụ này, bạn có thể xem và sửa đổi gần như mọi phần trạng thái trong ứng dụng đang chạy của mình.

**Yêu cầu**:
LayoutInspector có sẵn trên [CocoaPods](https://cocoapods.org/pods/LayoutInspector)
* iOS 9+

**Giá**:  Miễn phí