Để nâng cao trải nghiệm người dùng, từ các dòng iPhone 7 và iOS 10 trở về sau Apple đã tích hợp thêm **"Taptic Engine**" cung cấp các phản hồi xúc giác khi người dùng thực hiện các hành động (tap button, segment...) hoặc phản hồi lại các thông báo (ví dụ như thông báo thanh toán thành công trên Apple Pay...). Các bạn có thể xem các haptic feedback tại đây: https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/feedback/
![](https://images.viblo.asia/921f0cf2-9720-449e-8cfd-e779a98cf0ef.jpeg)

Đối với các nhà phát triển thì Apple cũng đã cung cấp các API cụ thể để việc tích hợp Haptic Feedback vào ứng dụng trở nên đơn giản. Có 3 loại haptic feedback sau:



##### UINotificationFeedbackGenerator
Dùng để thông báo cho người dùng biến các trạng thái (.success, .warning và .error.) của một tác vụ hoặc hành động (như gửi tin nhắn thành công, tải về thất bại...).

```swift
import UIKit

let generator = UINotificationFeedbackGenerator()

generator.prepare()

generator.notificationOccurred(.success)
generator.notificationOccurred(.warning)
generator.notificationOccurred(.error)
```

##### UIImpactFeedbackGenerator
Được sử dụng để nâng cao trải nghiệm người dùng. Ví dụ nó được sử dụng trong các trò chơi khi xảy ra va chạm...
```swift
import UIKit

let impactFeedbackGenerator: (
    light: UIImpactFeedbackGenerator,
    medium: UIImpactFeedbackGenerator,
    heavy: UIImpactFeedbackGenerator) = (
        UIImpactFeedbackGenerator(style: .light),
        UIImpactFeedbackGenerator(style: .medium),
        UIImpactFeedbackGenerator(style: .heavy)
)

impactFeedbackGenerator.light.prepare()
impactFeedbackGenerator.medium.prepare()
impactFeedbackGenerator.heavy.prepare()

impactFeedbackGenerator.heavy.impactOccurred()
```

##### UISelectionFeedbackGenerator
Thường được sử dụng trong các hành động có nhiều lựa chọn cho người dùng, ví dụ như được sử dụng trong UIPickerView...feedback khi người dùng thay đổi lựa chon..

```swift
import UIKit

let selectionFeedbackGenerator = UISelectionFeedbackGenerator()

selectionFeedbackGenerator.prepare()

selectionFeedbackGenerator.selectionChanged()
```

##### Kết
Việc tích hợp Haptic feedback là rất dễ dàng tuy nhiên để đem đến trải nghiệm tốt nhất cho người dùng, phần phức tạp nhất là biết khi nào và sử dụng nó và sử dụng ở đâu.  Để sử dụng hiệu quả nhất Haptic Feedback các bạn nên tìm hiểu kĩ hơn trong documents về Haptic Feedback ở docs "Human Interface Guidelines" của Apple.
Hi vọng bài viết có ích với mọi người.