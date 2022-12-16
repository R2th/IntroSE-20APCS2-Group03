Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com/), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@adinugroho/when-to-use-cocoapods-when-to-use-carthage-a8757ff93b51

Mọi lập trình viên trên thế giới đều phải sử dụng tới **Package Manager**. Trong khi trên Android, chúng ta có một **Package Manager** chính thức dùng Gradle, thì trên iOS đã không có một **Package Manager** chính thức cho tới khi Apple giới thiệu **Switf Package Manager** . Nhưng đa số các lập trình viên iOS vẫn sử dụng **Cocoapods** và một số sử dụng ít hơn sử dụng **Carthage**. Theo quan điểm của tôi: **Package Manager** cần phải nhỏ gọn, giống như các **script**, viết nhanh và dễ đọc. Nó không cần quá rờm rà, phức tạp và nhiều chức năng như ngôn ngữ lập trình. Đây là lý do tại sao **Swift Package Manager** có tỷ lệ chọn vẫn rất thấp.

Một số lập trình viên có thể bối rối khi phải lựa chọn sử dụng **Cocoapods** hay **Carthage**. Nhưng thực tế, chúng ta có thể dùng và tận dụng lợi thế của cả 2.

Đầu tiên, chúng ta cùng xem **Cocoapods**. Sau khi bạn clean project, chạy lệnh *pod install/ pod update*, mỗi khi bạn tiến hành built project, **Cocoapod** sẽ built và compile file **pods** (thư viện) của bạn. Các lần built project tiếp theo, Cocoapod sẽ không tiến hành built lại pods.

![](https://images.viblo.asia/f11c84eb-08b5-4fcd-a1ef-9679a887fc80.png)

**Carthage** lại có một tiến trình khác. Khi bạn tiến hành lấy lại thư viện bằng lệnh *carthage update*  nó sẽ lấy ra các phiên bản *framework (binary)*  hoặc kéo source code và tiến hành biên dịch nó thành *framework* trên máy của bạn và tiến trình này chỉ xảy ra một lần. Vì vậy **XCode** sẽ không tiến hành built lại bất kỳ thứ gì nếu bạn sử dụng **Carthage**.

![](https://images.viblo.asia/4ff7622e-1e88-4066-971a-51ec19ba1a36.png)

Vì vậy, nếu bạn muốn sử dụng thư viện với codebase lớn, thì nên sử dụng **Carthage** để tích hợp vào project. Nhưng làm sao tôi biết được là nếu một thư viện có codebase lớn? Nếu bạn thêm một thư viện thông qua **Cocoapods** và khi bạn built project bạn sẽ nhìn thấy như ảnh dưới và mất một thời gian khá lâu để kết thúc.

![](https://images.viblo.asia/ccdc441f-9c2e-4274-b444-6aa00d17990b.png)

Đây là một dấu hiệu bạn nên sử dụng **Carthage** để tích hợp thư viện đó. Còn nếu bạn chỉ muốn thử sử dụng một thư viện hoặc thư viện nhỏ hoặc thư viện chỉ được hỗ trợ trên **Cocoapods**, thì hãy sử dụng **Cocoapods**. Còn nếu bạn đang sử dụng nhiều thư viện trên Cocoapods và một số thư viện không cần thiết phải cập nhật chúng, bạn có thể cân nhắc tới việc tích hợp chúng thông qua **Carthage** thay vì **Cocoapods** như hiện tại. 
Một số các thư viện có **subspec**, đây là một tính năng phụ và không bắt buộc phải sử dụng. Theo như tôi biết, chức năng này chỉ có trên **Cocoapods**. Còn với **Carthage**, bạn phải tự thêm toàn bộ các tính năng phụ nếu cần sử dụng. 

Vậy nên, bạn đừng sợ sử dụng cả 2 (ps: nó sẽ không gây tổn hại gì cho project của bạn), mà lại tận dụng được lợi thế của chúng. Cảm ơn vì đã đọc bài viết.