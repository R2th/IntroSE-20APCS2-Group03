- Phản hồi giúp mọi người biết ứng dụng đang làm gì, khám phá những gì họ có thể làm tiếp theo và hiểu kết quả của các hành động.
Hôm nay tôi sẽ nói về công cụ phản hồi Haptic do Apple cung cấp trong hầu hết các thiết bị.

> On supported devices, haptics provide a way to physically engage users with tactile feedback that gets attention and reinforces actions. Some system-provided interface elements, such as pickers, switches, and sliders, automatically provide haptic feedback as users interact with them. Your app can also ask the system to generate different types of haptic feedback. iOS manages the strength and behavior of this feedback.

- Các bạn có thể tạm hiểu rằng:

> Trên các thiết bị được hỗ trợ, haptics cung cấp một cách để thu hút người dùng bằng phản hồi xúc giác để thu hút sự chú ý và củng cố các hành động. Một số thành phần giao diện do hệ thống cung cấp, chẳng hạn như pickers, switches và sliders tự động cung cấp phản hồi xúc giác khi người dùng tương tác với chúng. Ứng dụng của bạn cũng có thể yêu cầu hệ thống tạo ra các loại phản hồi xúc giác khác nhau. iOS quản lý sức mạnh và hành vi của phản hồi này.

- Một lợi ích khác của công cụ phản hồi này là Khả năng truy cập. Nó giúp hiểu được kết quả của bất kỳ hành động nào mà không thực sự xem màn hình.

### UIFeedbackGenerator

- Apple cung cấp cho chúng tôi class UIFeedbackGenerator abstract cho tất cả các phản hồi xúc giác loại. Chúng tôi không cần phải phân lớp nó trong các ứng dụng của mình. Thay vào đó, chúng tôi phải sử dụng Apple cung cấp sẵn sàng để sử dụng các lớp con. Có ba lớp:
    - [UIImpactFeedbackGenerator](https://developer.apple.com/documentation/uikit/uiimpactfeedbackgenerator)
    - [UISelectionFeedbackGenerator](https://developer.apple.com/documentation/uikit/uiselectionfeedbackgenerator)
    - [UINotificationFeedbackGenerator](https://developer.apple.com/documentation/uikit/uinotificationfeedbackgenerator)

- Tất cả chúng đều có các mẫu phản hồi xúc giác được xác định trước bởi hệ thống, vì vậy thay vì sử dụng các mẫu rung tùy chỉnh, hãy để sử dụng các haptics nổi tiếng. Tất cả các lớp con này có chung logic. 
- Đầu tiên, bạn cần chuẩn bị haptic engine trước khi sử dụng nó. Thứ hai là  gọi đến phương pháp thích hợp để chạy haptic này. Chúng ta hãy xem cách sử dụng đơn giản của lớp **UINotificationFeedbackGenerator**.

```
class EpisodeViewController: UIViewController {
    private let episodeModelController: EpisodeModelController
    private let feedback = UINotificationFeedbackGenerator()

    init(episodeModelController: EpisodeModelController) {
        self.episodeModelController = episodeModelController
        super.init(nibName: nil, bundle: nil)
    }

    @IBAction func markAsWatched() {
        feedback.prepare()
        episodeModelController.markAsWatched { [weak self] outcome in
            switch outcome {
            case .success:
                self?.feedback.notificationOccurred(.success)
            case .failure:
                self?.feedback.notificationOccurred(.error)
            }
        }
    }
}
```

- Ở đây  tôi có một màn hình ứng dụng theo dõi chương trình TV duy trì một tập phim. Chúng tôi có một nút sẽ đánh dấu tập như đã xem khi nhấp.
- Như bạn có thể thấy trước yêu cầu dịch vụ API của tôi, tôi chuẩn bị trình tạo phản hồi và khi kết quả đến, tôi sẽ chạy loại phản hồi phù hợp.
- Một lớp con thú vị khác là **UISelectionFeedbackGenerator**. Chúng ta có thể sử dụng trên cùng một màn hình do kết quả của các thay đổi lựa chọn. Ví dụ: chúng ta có thể có các nút sẽ tìm nạp các tập tiếp theo hoặc trước đó sau một lần nhấp.

```
@IBAction func fetchNext() {
        selectionFeedback.prepare()
        episodeModelController.fetchNext { [weak self] outcome in
            switch outcome {
            case .success:
                self?.selectionFeedback.selectionChanged()
            case .failure:
                self?.feedback.notificationOccurred(.error)
            }
        }
    }
```

- Như bạn có thể thấy code ở trên cách sử dụng **UISelectionFeedbackGenerator** rất giống với **UINotificationFeedbackGenerator**. Tôi chuẩn bị và chạy động cơ haptic.
- Tôi muốn đề cập rằng các lớp này có tiền tố UI và chúng ta nên chạy chúng trên hàng đợi chính. Để giữ cho nó không bị crash, tôi đã chuẩn bị một phần mở rộng đơn giản chạy các phương thức trên main queue.

###  Kết luận
- Hôm nay tôi đã thảo luận về một tính năng đơn giản và dễ tiếp cận của SDK iOS. Phản hồi xúc giác có thể rất hữu ích cho cả phần có thể truy cập của cơ sở người dùng của bạn và cho bất kỳ ai tham gia vào ứng dụng của bạn

Cám ơn các bạn đã đọc. Các bạn có thể tham khảo thêm [Haptic feedback in iOS apps](https://swiftwithmajid.com/2019/05/09/haptic-feedback-in-ios-apps/)