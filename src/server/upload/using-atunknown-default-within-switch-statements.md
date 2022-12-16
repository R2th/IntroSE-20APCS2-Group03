Khi switch trong một enum, chúng ta bắt buộc phải xử lý rõ ràng tất cả các trường hợp của nó hoặc cung cấp một trường hợp `default` sẽ hoạt động như một dự phòng cho các trường hợp không khớp với bất kỳ `case` statement nào trước đó. Ví dụ như thế này:
```
struct Article {
    enum State {
        case draft
        case published
        case removed
    }

    var state: State
    ...
}

// Explicitly handling all possible cases:

func articleIconColor(forState state: Article.State) -> Color {
    switch state {
    case .draft:
        return .yellow
    case .published:
        return .green
    case .removed:
        return .red
    }
}

// Using a default case:

extension Article {
    var isDraft: Bool {
        switch state {
        case .draft:
            return true
        default:
            return false
        }
    }
}
```
Khi có thể, mình luôn khuyên bạn nên viết các `switch` statement đầy đủ để xử lý từng trường hợp có thể một cách rõ ràng, ngay cả khi điều đó sẽ làm cho code của chúng ta nhiều hơn một chút. Lý do là làm như vậy sẽ gây ra compiler error nếu chúng ta thêm một trường hợp mới trong tương lai, điều này “buộc chúng ta” phải đưa ra quyết định phù hợp về cách xử lý trường hợp mới đó trên cơ sở code của chúng ta. Default cases có thể thuận tiện, nhưng chúng có thể nhanh chóng trở thành nguồn lỗi phổ biến khi một đoạn cpde cũ kết thúc với một trường hợp lỗi mà nó không được thiết kế để xử lý, đơn giản vì nó được gọi từ trong một `default` statement.
Vì vậy, đây là cách cá nhân tôi triển khai thuộc tính `isDraft` ở trên:
```
extension Article {
    var isDraft: Bool {
        switch state {
        case .draft:
            return true
        case .published, .removed:
        return false
        }
    }
}
```
Tuy nhiên, khi làm việc với một số trường hợp do hệ thống cung cấp, đôi khi chúng ta cần sử dụng một `default` case, vì các trường hợp này có thể được cập nhật bằng các trường hợp mới bất kỳ lúc nào. Ví dụ: nếu chúng ta cố gắng switch một cách triệt để thứ gì đó như `UIUserInterfaceStyle` enum của UIKit, thì trình biên dịch sẽ đưa ra một warning:
```
extension UITraitEnvironment {
    var isUsingDarkMode: Bool {
        // ⚠️ Warning: Switch covers known cases, but
        // 'UIUserInterfaceStyle' may have additional unknown
        // values, possibly added in future versions.
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return true
        case .light, .unspecified:
            return false
        }
    }
}
```
Tất nhiên, một cách để giải quyết warning trên là sử dụng standard default statement  (vì điều đó sẽ phát hiện ra bất kỳ trường hợp bổ sung nào có thể được thêm vào trong tương lai), nhưng sau đó chúng ta cần quay lại tình huống mà code của chúng ta có thể kết thúc sai khi xử lý những trường hợp mới đó.
Rất may, Swift có một giải pháp tích hợp cho vấn đề này và đó là thuộc tính `@unknown`, có thể được đính kèm với `default` hoặc `case _` statement để xử lý bất kỳ trường hợp nào không xác định tại thời điểm chúng ta viết mã, trong khi vẫn tạo ra các warning nếu chúng ta quên xử lý một trường hợp hiện có. Dưới đây là cách chúng ta có thể áp dụng thuộc tính đó cho việc triển khai `isUsingDarkMode` ở trên:
```
extension UITraitEnvironment {
    var isUsingDarkMode: Bool {
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return true
        case .light, .unspecified:
            return false
        @unknown default:
            return false
        }
    }
}
```
Lưu ý cách chúng ta cần viết `@unknown default` case dưới dạng một câu lệnh riêng biệt, thay vì kết hợp nó với một trường hợp khác dẫn đến cùng một kết quả. Một cách để khắc phục hạn chế đó là sử dụng `fallthrough` keyword, điều này sẽ khiến Swift tự động chuyển sang trường hợp tiếp theo trong `switch` statement - như sau:
```
extension UITraitEnvironment {
    var isUsingDarkMode: Bool {
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return true
        case .light, .unspecified:
            fallthrough
        @unknown default:
            return false
        }
    }
}
```
Vì vậy, làm thế nào mà các `@unknown default` statement chỉ được required (hoặc ít nhất là được recommended) khi sử dụng switch trên một số enum cụ thể? Đây là nơi xuất hiện khái niệm frozen enums. Khi một enum được đánh dấu là frozen, điều đó cho compiler biết rằng nó sẽ không bao giờ (hoặc ít nhất là không nên) nhận được bất kỳ trường hợp mới nào, điều đó có nghĩa là chúng ta an toàn khi chuyển đổi hoàn toàn trên các trường hợp của nó mà không cần phải xử lý bất kỳ cái trường hợp unknown nào.
Ví dụ: Ta thử nghiệm với Foundation’s `ComparisonResult` enum’s Swift interface thì chúng ta có thể thấy rằng nó được đánh dấu bằng thuộc tính @frozen:
```
@frozen public enum ComparisonResult: Int {
    case orderedAscending = -1
    case orderedSame = 0
    case orderedDescending = 1
}
```
Điều đó có nghĩa là chúng ta có thể tự do switch các giá trị `ComparisonResult` (và những giá trị khác như nó) mà không bị warning rằng chúng ta nên thêm trường hợp `@unknown default`.
Liệu điều đó có nghĩa là chúng ta cũng nên thêm cùng một thuộc tính `@frozen` đó vào enums của riêng chúng ta? Không thực sự như vậy, vì compiler sẽ tự động coi tất cả các enums Swift do người dùng định nghĩa là frozen theo mặc định. Tuy nhiên, nếu chúng ta đang làm việc với các enums mà chúng ta đã xác định trong Objective-C, thì chúng ta sẽ phải đánh dấu rõ ràng chúng là "closed for extensibility" nếu chúng tôi muốn chúng trở thành frozen khi imported vào Swift:
```
typedef NS_ENUM(NSInteger, SXSArticleState) {
    SXSArticleStateDraft,
    SXSArticleStatePublished,
    SXSArticleStateRemoved
} __attribute__((enum_extensibility(closed))) NS_SWIFT_NAME(ArticleState);
```
Với những điều trên, kiểu `SXSArticleState` của chúng ta bây giờ sẽ được import vào Swift dưới dạng một frozen enum được gọi là `ArticleState` và nó sẽ hoạt động giống như enum `Article.State` trước đó của chúng ta.

Reference: https://www.swiftbysundell.com/articles/using-an-unknown-default-case-within-a-switch-statement/

Mình hy vọng rằng bài viết này đã cung cấp cho bạn một vài thông tin chi tiết về cách hoạt động của các `@unknown default` statements và tại sao đôi khi chúng lại cần thiết.