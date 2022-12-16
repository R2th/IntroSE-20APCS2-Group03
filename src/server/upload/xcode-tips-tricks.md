Xcode là một công cụ tuyệt vời để tạo các ứng dụng iOS, nhưng đôi khi nó có thể hơi rắc rối và làm chậm tiến trình công việc của bạn. Dưới đây là một số mẹo để cải thiện quy trình làm việc của bạn, hy vọng  sẽ giúp bạn tiết kiệm thời gian trong khi code.
###  1.Track Build times
Build times là điều khá rắc rối trong Xcode. Để cải thiện bất cứ điều gì trước tiên bạn cần một số cách đo lường nó. Để đo thời gian xây dựng trong Xcode, hãy mở terminal và gõ lệnh này:
```
defaults write com.apple.dt.Xcode ShowBuildOperationDuration -bool YES
```
Sau đó, bạn có thể cần phải khởi động lại Xcode để thấy sự thay đổi. Bạn sẽ thấy build times xuất hiện trong top tool bar sau mỗi lần build.
### 2. Track app start time
Tốc độ khởi chạy ứng dụng là một trong những yếu tố quan trọng nhất khi tạo ứng dụng. Người dùng mong đợi các ứng dụng sẽ khởi chạy ngay lập tức. Tìm kiếm mã nguồn khởi động chậm có thể khó khăn.
Một cách bạn có thể cải thiện thời gian khởi chạy bằng cách theo dõi mọi thứ trước khi applicationDidFinishLaunching được gọi. Đây là khi ứng dụng đang khởi tạo thư viện, thiết lập ObjC và tải dylibs. Sử dụng phương pháp này Xcode sẽ hiển thị thời gian tải và điều gì khiến chúng bị chậm trong terminal mỗi khi bạn chạy ứng dụng của mình.
Từ Xcode chọn Product -> Scheme -> Edit Scheme và thêm biến môi trường sau đây là **DYLD_PRINT_STATISTICS** và đặt giá trị của nó thành **1**.

![Track app start time](https://images.viblo.asia/5b22854b-7ff0-4ab6-87c8-f0cf907a3a2d.png)

Bây giờ sau mỗi lần build, bạn sẽ thấy một bản in giống như thế này:

![](https://images.viblo.asia/438435a4-0377-43e7-9bee-c26afe7eac48.png)

### 3. Quick rename
Tìm và thay thế tên biến luôn luôn là một rắc rối. Không còn nữa! Nhấn giữ **CMD**  trong khi nhấp vào biến hoặc chức năng bạn muốn đổi tên. Sau đó từ cửa sổ bật lên chọn **rename**. Nó sẽ tìm và đổi tên mọi bản sao của nó trong dự án, ngay cả trong storyboards.

![rename](https://images.viblo.asia/200317cc-f3e2-4bf4-a6ec-c3d254a31ce5.png)

### 4. Use break points
Để đặt break points, hãy nhấn số dòng ở bên cạnh mã bạn muốn dừng và chạy dự án của bạn. Khi mã đã tạm dừng thực thi trên dòng đó, bạn có thể xem tất cả các giá trị biến xung quanh bằng cách di chuột qua chúng.

![break points](https://images.viblo.asia/bebaeeef-2b51-4f17-beeb-443de2907608.png)

Ngoài ra, bạn có thể sử dụng **lldb** để in chúng trong bảng điều khiển bằng lệnh in đối tượng, ví dụ: po yourVariable.

![po object](https://images.viblo.asia/5156b4fe-ae52-42c4-9d9f-8021f4790bf6.png)

Break points có vẻ phức tạp, nhưng một khi bạn hiểu một số lệnh **lldb** và các công cụ gỡ lỗi Xcode khác, nó thực sự giúp bạn tiết kiệm rất nhiều thời gian vì bạn có thể dừng ở điểm dừng mà không phải chạy lại ứng dụng hoàn toàn.
Khi bạn đã hoàn thành việc đánh giá các giá trị, bạn có thể nhấn nút tiếp tục và vô hiệu hóa break points để ngăn nó dừng thực thi lại.

![resume break points](https://images.viblo.asia/05cb0b9c-8c6d-4dd1-98b1-c759b136dd54.png)

Xem video [WWDC Apple Apple 2018](https://developer.apple.com/videos/play/wwdc2018/412/) về debug để tìm hiểu thêm về cách sử dụng break points để tăng tốc quy trình làm việc của bạn. (Bao gồm cách chạy các chức năng mới và đặt giá trị biến mà không chạy lại ứng dụng.)

Bài viết tham khảo từ [đây](https://medium.com/@gabriel_lewis/tips-to-improve-your-xcode-workflow-9c2bdda1b26f). Bài viết xin được kết thúc, cảm ơn các bạn đã theo dõi.