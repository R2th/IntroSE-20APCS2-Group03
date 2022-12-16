Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@hassanahmedkhan/a-noobs-guide-to-creating-a-fat-library-for-ios-bafe8452b84b

Gần đây tôi đã phải đối mặt với một tình huống trong đó tôi phải sử dụng thư viện của bên thứ ba trong dự án của mình nhưng thư viện đó không có sẵn trên Cocoa Pods.
[Swifter](https://github.com/mattdonnelly/Swifter) là một framework Twitter rất tốt viết bằng Swift. Nó có một số lượng lớn các star (thích) và fork (lượt tải về github cá nhân). Nhưng thật không may, framework này không có sẵn trên Cocoa Pods (ít nhất là đến ngày 22/12/2017).

Cách duy nhất để sử dụng nó là kéo toàn bộ project Xcode vào dự án của riêng bạn. Vì dự án này có các framework riêng cho Mac, iOS và các ứng dụng demo cho iOS và Mac, điều này làm cho nó trở thành một dự án rườm rà khi được thêm vào trong dự án của riêng bạn.

Sau khi sử dụng Cocoa Pods để quản lý thư viện trong một thời gian rất dài, tôi đã không muốn nhúng toàn bộ project của các framework vào dự án của riêng mình. Nó không có vẻ đúng. Vì vậy, tôi bắt tay vào hành trình tìm ra những cách khác.

### Việc nhúng một static framework (cách làm sai)
Giải pháp đơn giản nhất là nhúng framework iOS do thư viện built ra trong dự án của bạn. Nó có thể được thực hiện trong 4 bước như sau.
1. Chọn framework và platform của bạn
![](https://images.viblo.asia/e2261bf5-c012-4644-a9af-6937fbd1553e.png) 

2. Xây dựng và lấy framework từ thư mục sản phẩm.
![](https://images.viblo.asia/59787e9c-6921-435a-ae45-86cbaef0d199.png)

3. Nhúng khung trích xuất trong ‘Embedded Binaries’
![](https://images.viblo.asia/41d3bd87-80c3-4933-b600-6eaefd6bc095.png)

4. Bây giờ import mô-đun và sử dụng nó.
### Vấn đề của việc nhúng một static framework
Các kỹ thuật trên hoạt động. Nhưng vấn đề ở đây là chúng tôi đã tạo ra framework cho simulator. Vì vậy, binary được tạo ra chỉ dành cho kiến trúc của simulator (x86).
Nếu bạn cố gắng built dự án của mình cho thiết bị, nó sẽ lỗi. Lý do ở đây là kiến trúc cụ thể của thiết bị bị thiếu trong framework mà chúng tôi đã thêm ở bước cuối cùng.
Bạn có thể làm lại các bước trên để built một framework cho thiết bị thay vì cho simulator. Nhưng nó sẽ không hoạt động với simulator.
Vì vậy, để giải quyết vấn đề này triệt để, chúng ta cần tìm cách nhúng cả kiến trúc (x86 và arm) vào một framework duy nhất. Giải pháp là một fat library.
### Fat Library
Một fat library chỉ đơn giản là một thư viện với nhiều kiến trúc. Trong trường hợp của chúng ta, nó sẽ chứa x86 và kiến trúc arm. Tên thích hợp cho nó là ‘Universal Static Library’. Nhưng chúng tôi sẽ vẫn sử dụng tên fat library vì nó ngắn gọn để viết và nó mô tả chính xác kết quả thư viện của chúng ta: Fat!!! với nhiều kiến trúc trong đó.
### Tạo một Fat Library
Có rất nhiều bài viết có sẵn trên internet hướng dẫn cách tạo ra một fat library. Tất cả đều rất kỹ thuật, khó theo dõi và có khả năng thất bại cao.
Tôi đã tìm thấy một cách mới và rất dễ dàng để tạo ra một fat library. Điều này không liên quan đến bất  script phức tạp nào. Các bước rất đơn giản và dễ làm theo.
Chúng tôi sẽ sử dụng dự án Swifter để tạo ra một fat library.
1. Tải về dự án từ [đây](https://github.com/mattdonnelly/Swifter) và mở nó trong Xcode.
2. Xây dựng 'SwifteriOS' cho iOS simulator và lấy framework từ thư mục sản phẩm trên máy tính để bàn của bạn.
3. Đổi tên framework thành SwifteriOS-sim.framework để sau này có thể phân biệt được.
4. Lặp lại các bước 2 và 3 cho thiết bị iOS. Bạn có thể chọn "Generic iOS Device". Đừng quên đổi tên framework thành Swifter-dev.framework.
5. Sử dụng lệnh sau để kết hợp cả hai file nhị phân thành một file nhị phân duy nhất (Đảm bảo bạn đang ở trên máy tính để bàn trong khi chạy lệnh này).
```
$lipo -create ./SwifteriOS-sim.framework/SwifteriOS ./SwifteriOS-dev.framework/SwifteriOS -output ./SwifteriOS
```
6. Sao chép tệp nhị phân SwifteriOS được tạo ở bước trên và thay thế tệp nhị phân trong thư mục SwifteriOS-dev.framework.
7. Mở  tập tin ‘Info.plist’ có trong cùng một thư mục.
8. Add ‘iPhoneSimulator’ string in ‘CFBundleSupportedPlatforms’ array.
9. Các tập tin plist cuối cùng sẽ trông như thế này
![](https://images.viblo.asia/7305c002-b5de-4877-83ab-46e80f7aff24.png)
10. Từ thư mục
```
SwifteriOS-sim.framework/Modules/SwifteriOS.swiftmodule/
```
sao chép ‘x86_64.swiftdoc‘ và ‘x86_64.swiftmodule’ và dán chúng vào
```
SwifteriOS-dev.framework/Modules/SwifteriOS.swiftmodule/
```
11. Bằng cách làm theo các bước trên, bạn đã chuyển đổi SwifteriOS-dev.framework từ thiết bị sang fat library. Đổi tên nó thành SwifteriOS.framework.
12. Nhúng framework này thông qua tuỳ chọn ‘Embeded Binaries’ trong Xcode. Nhập mô-đun trong tệp của bạn và bạn sẽ có thể biên dịch thành công.

Tôi đã thử nghiệm kỹ thuật này trong Xcode 10 và 11 với cả hai ngôn ngữ Swift và Objective-C.

Nếu bạn thích bài này thì đừng quên vỗ tay :)