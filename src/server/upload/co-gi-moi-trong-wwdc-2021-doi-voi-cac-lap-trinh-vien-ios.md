![image.png](https://images.viblo.asia/a2bc090a-b059-49dd-bf04-9e256565dae1.png)

Hãy nhìn vào những bản cập nhật framework IOS 15 từ sự kiện Platforms State of the Union

Tuần lễ WWDC 2021 của Apple cuối cùng cũng diễn ra. Đối với những người mới sử dụng, bài thuyết trình Keynote (tóm lược) đặc biệt tập trung vào các bản cập nhật phần mềm lấy user làm trung tâm. Vì vậy, tôi sẽ không đề cập đến các tính năng công nghệ của iOS 15, iPadOS, macOS 12, watchOS 8, v.v., trong bài viết này.

Thay vào đó, tôi sẽ tổng hợp nhanh sự kiện Platforms State of the Union. Phiên SOTU theo sau keynote và hướng đến lập trình viên hơn.

Các kỹ sư iOS muốn nắm bắt những thay đổi mới nhất của API cũng như những tiến bộ của framework và muốn tìm hiểu sâu hơn về các công cụ, luôn mong đợi sự kiện State of the Union hơn là keynote.

## 1. WWDC: Xcode 13 đã có CI / CD và quy trình review code

Việc phát triển IDE, Xcode 13 của Apple có thể có bản cập nhật lớn nhất trong năm nay.

Hiện chúng ta có Xcode Cloud, một dịch vụ tích hợp và triển khai liên tục (CI) tập trung vào quyền riêng tư do Apple phát triển và được lưu trữ trên cơ sở hạ tầng đám mây (cloud infrastructure) của họ.

Vì vậy, bạn không cần phải dựa vào dịch vụ của bên thứ ba để thiết lập quy trình công việc và kết nối App Store Connect. Xcode Cloud trừu tượng hoá toàn bộ quá trình triển khai và code-signing cho bạn trong chính IDE.

Thêm vào đó, Xcode Cloud làm cho việc unit test trở nên thú vị hơn bằng cách tạo ảnh chụp màn hình giả lập của tất cả các quy trình công việc XCTests trong chế độ xem thư viện. Ngoài ra, với sự ra đời của TestFlight trên Mac, bạn có thể nhanh chóng biết được sự cố app thông qua việc truy tìm nơi xảy ra vấn đề.

Cuối cùng, Xcode cũng mang đến review code trực tiếp trong trình chỉnh sửa cho phép user thêm comment và tạo các pull request, do đó cải thiện sự hợp tác và giao tiếp của team.

![image.png](https://images.viblo.asia/6ca2d77e-189a-4201-a730-3aafe0d2e370.png)

## 2. WWDC: Tính đồng thời (Concurrency) trong Swift

Kể từ ngày async / await được thêm vào Swift 5.5, tính năng này đã được các lập trình viên iOS rất mong đợi.

Mặc dù chúng ta không nhận bản cập nhật mới cho framework Combine của Apple trong năm nay (có thể trong tương lai?). Tin vui là Apple đã cho chúng ta một cái nhìn tổng quan về async / await, và concurrency giúp nhiều tác vụ chạy một cách dễ dàng.

Cụ thể, SOTU session giới thiệu cách thay thế các handler lồng nhau bằng các cấu trúc async / await và việc sử dụng các `Actors` để loại bỏ các mối nguy hiểm của `DispatchQueue`. Nó cũng cung cấp một cái nhìn sơ lược về `@MainActor` để chạy các hoạt động UI trên main thread.

Sẽ rất thú vị khi xem async / await hoạt động như thế nào với SwiftUI và CoreData. Chúng ta đã có một session (buổi chia sẻ) về nó.

## 3. WWDC: Các tính năng mới trong SwiftUI 3.0

SwiftUI, framework khai báo của Apple, cung cấp cách nhanh nhất và dễ dàng nhất để xây dựng giao diện user trong các ứng dụng của chúng ta hiện nay.

Với iOS 15, SwiftUI hiện bổ sung những công cụ thiếu xót (missing control) và thêm nhiều tùy chỉnh hơn. Dưới đây là những điểm nổi bật:

* `refreshable` – một callback để xử lý các sự kiện pull-to-refresh trong Danh sách Swift
* `swipeAction` – công cụ sửa đổi để thêm các hành động custom button vào SwiftUI List rows
* `searchable` – một công cụ sửa đổi để thêm trường tìm kiếm (search field) vào danh sách. Trường tìm kiếm này cũng hỗ trợ suggestion.
* `AccessibilityRepresentation` – để thêm các điều khiển có thể tiếp cận tiêu chuẩn trong các SwiftUI Controls tùy chỉnh
* `materials` – một loại cấu trúc để thêm các phần tử nền vào chế độ xem SwiftUI của bạn và tùy chỉnh chúng
* Hỗ trợ Markdown trong `AttributeString`
* Enum-power `ListStyle`
* API tiêu điểm mới cho responders `TextField`
* `AsyncImage` để tải không đồng bộ hình ảnh SwiftUI từ URL.

Với các widget xuất hiện trên màn hình chính cho iPadOS 15, WidgetKit, được viết bằng SwiftUI, mang đến một kích thước lớn hơn nhiều cho WidgetFamilycủa nó.

## 4. WWDC: Swift Playgrounds trên iPad cho phép bạn viết, xây dựng và gửi các ứng dụng SwiftUI

Swift Playgrounds đã xuất hiện được một thời gian và cung cấp cách thức tuyệt vời để bắt đầu học code Swift.

Swift Playgrounds 4 hiện giới thiệu khả năng viết ứng dụng SwiftUI, có thể xem được kết quả ngay và gửi ứng dụng đến các user thử nghiệm hoặc gửi trực tiếp lên App Store.

Ngoài ra còn có một định dạng gói mới để dễ dàng chuyển dự án Xcode của bạn sang Swift Playgrounds trên iPadOS.

![image.png](https://images.viblo.asia/8df8464a-6e52-4014-b61e-08daf61acbf7.png)

## 5. WWDC: Machine Learning và Augmented Reality

RealityKit đã được giới thiệu trong iOS 13 để đơn giản hóa các hiệu ứng AR phức tạp.

Với iOS 15, RealityKit 2 mang đến những nâng cấp lớn với những shader tùy chỉnh, điều khiển nhân vật và API playback animation mới. Nhưng tính năng nổi bật là Object Capture API. Về cơ bản, nó cho phép bạn nhanh chóng chuyển đổi các cảnh trong thế giới thực thành các mô hình AR bằng cách xây dựng các đối tượng ảo 3D từ một loạt các hình ảnh 2D với `PhotogrammetrySession`.

Mặt khác, framework Vision đưa ra hai tính năng mới:

* Một tính năng nhận dạng người dựa trên theo dõi tư thế đầu.
* Nhận dạng văn bản trong hình ảnh.

Tạo ML, công cụ train model kéo thả không cần code của Apple, mang đến cho chúng ta hai loại trình phân loại mới để training model. Chúng có thể phân loại cử chỉ hay là hành động tay.

![image.png](https://images.viblo.asia/5dd855e0-70a6-49fe-83c0-527b7a9a9de5.png)

## 6. WWDC: API thông báo cho user về việc nâng cao chế độ lấy nét (Focus Mode)

iOS 15 giới thiệu một chế độ lấy nét mới. Điều này có nghĩa là user sẽ nhận được thông báo dựa trên thời gian nhất định  họ chọn hoặc hoạt động hiện tại của họ (ngủ, làm việc, tiệc tùng).

Để đảm bảo trải nghiệm user không bị cản trở và thông báo được gửi chính xác, bạn có thể xem các thay đổi trong thông báo của user.

Về cơ bản, chúng ta có một enum `UNNotificationInterruptLevel` cho phép bạn phân loại thông báo: `chủ động, bị động, quan trọng, nhạy cảm về thời gian`.

Các thông báo quan trọng sẽ bỏ qua cả chế độ im lặng. Tuy nhiên, bạn cần phải xác định rõ điều này trong quyền cài đặt.

## 7. WWDC: API riêng tư (privacy): Thời gian sử dụng, Vị trí và SharePlay

Quyền riêng tư luôn là yếu tố quan trọng nhất trong các sự kiện của Apple và năm nay cũng vậy. iOS 15 cũng giới thiệu nhiều cải tiến và các framework Swift mới.

Ví dụ: user có thể xác thực quyền truy cập vị trí thủ công mỗi khi ứng dụng cần. Apple đã giới thiệu một LocationButton độc quyền của SwiftUI để làm việc này và bạn cũng có thể tùy chỉnh nó. Nút tìm nhập vị trí hiện tại mỗi khi user chạm vào:

`LocationButton (.currentLocation) {....}`

Đối với những người yêu thích UIKit, `CLLocationButton` thực hiện nhiệm vụ tương tự.

API Screen Time sẽ có trong ba framework Swift:

* `ManagedSettings` – cấp hoặc hạn chế quyền truy cập vào các tính năng ứng dụng nhất định. Điều này hoạt động cùng với `ManagedSettingsUI` để tùy chỉnh các chế độ xem được bảo vệ.
* `FamilyControls` – cung cấp cho user lựa chọn để cấp quyền các ứng dụng / trang web và ngăn trẻ em trong nhà dùng chung thiết bị dẫn đến việc vô tình xóa hay mua thứ gì đó.
* `DeviceActivity` giúp bảo vệ quyền riêng tư để theo dõi các sự kiện của ứng dụng web

Với iOS 15, FaceTime cũng giới thiệu tính năng SharePlay để nghe, xem và chia sẻ màn hình trên các cuộc gọi điện video, như Zoom. Tin vui cho chúng ta, Apple đã giới thiệu SharePlay thông qua framework Group Activities.

Group Activities giúp trừu tượng hóa (abstract) tiến trình đồng bộ hóa peer-to-peer session cho bạn, do đó giảm code không cần thiết.

Sự kiện SOTU giới thiệu một cuộc trình diễn thú vị nơi user có thể tham gia và tương tác trên các ứng dụng dựa trên AVPlayer hoặc PencilKit tùy chỉnh. Tất cả những gì nó yêu cầu là cấu hình API `GroupSessionMessenger`.

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/co-gi-moi-trong-wwdc-2021/)