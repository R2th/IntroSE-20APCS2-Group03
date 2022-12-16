> Bên cạnh các file interface như xib, nib, storyboard, thì chúng ta cũng có thể thiết kế các view bằng code thuần. Việc khởi tạo bằng code cũng cho chúng ta nhiều điểm hay như có thể reuse code, tạo các lớp abstraction...Tuy nhiên, việc này cũng có cái hại là dễ dàng làm cho code trở nên rối rắm và khó đọc. Do đó chúng ta cần phải tuân theo một vài qui tắc nhất định để tránh cho việc biến nó thành một đống rối tinh mù lên.
> 
> Ở bài viết này, tôi sẽ chia sẻ một vài kinh nghiệm của riêng mình khi tạo view bằng code. Hy vọng là nó sẽ giúp ích cho các bạn.

## **Example**
## 
Ở đây chúng ta sẽ tạo một playground ví dụ , hiển thị một view chứa thông tin của user. (full source ở đây: [playground](http://kean.github.io/playgrounds/creating_views.playground.zip))

![](https://images.viblo.asia/ba8a5129-a163-462e-b64a-3bcfad0ca836.png)

tôi sẽ đi chi tiết vào hai thành phần chính, đó là style và layout.

## **Style**
## 
Style ở đây được xác định bằng cách sử dụng một hàm convenience initializer với argument có thể chứa các function bên trong, ở đây tôi ví dụ bằng việc "inline" các thành phần:

```
UILabel(style: {
    $0.textColor = UIColor.white
    $0.font = UIFont.preferredFont(forTextStyle: .body)
})

// In a single line and with a trailing closure for compactness:
UILabel { $0.textColor = .white; $0.font = .preferredFont(forTextStyle: .body) }
```

Tuy nhiên thì chúng ta nên tạo một kiểu style chung để có thể reuse ở trong toàn bộ project:

```
UILabel(style: Style.Label.body)

// MARK: - Style

public enum Style {
    public enum Label {
        public static func body(_ label: UILabel) {
            label.font = UIFont.preferredFont(forTextStyle: .body)
            label.textColor = Color.darkGray
        }
    }
}

public enum Color {
    public static let darkGray = rgb(22, 34, 48)

    private static func rgb(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat = 1.0) -> UIColor {
        return UIColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: a)
    }
}
```

Những function định nghĩa style được apply và trình bày theo đúng thứ tự và kiểu 'cascade' như là CSS:

```
UILabel(style: Style.Label.body, { $0.textColor = .white })
```

Nhằm giữ các class ngắn gọn và rõ ràng, bạn có thể khai báo nhiều kiểu style tại cùng một chỗ:

```
final class UserView: UIView {
    private let avatarView = UIImageView(style: Style.avatarView)
    private let nameLabel = UILabel(style: Style.Label.head, Style.nameLabel)
}

private extension Style {
    static func avatarView(_ view: UIImageView) {
        view.contentMode = .scaleAspectFill
    }

    static func nameLabel(_ label: UILabel) {
        label.textColor = Color.mango
        label.numberOfLines = 2
    }
}
```

## **Layout**
## 
Ở ví dụ này tôi sử dụng stack view và Yalta để định nghĩa layout. Trước đó thì bạn có thể tìm hiểu qua thư viện Yalta, đây là một thư viện hỗ trợ auto layout rất hay. Ở đây thì tôi sẽ chỉ tập trung vào việc tối ưu code của UIStackView. Chỉ với hai dòng code, bạn có thể dễ dàng tạo các cây stack view như sau:

```
let stack = UIStackView(
    style: { $0.spacing = 15; $0.alignment = .center },
    views: [
        avatarView,
        UIStackView(style: { $0.spacing = 3; $0.axis = .vertical },
                    views: [nameLabel, detailsLabel])
    ]
)
```

Ở đây chúng ta có thể thấy là style luôn được khai báo lên phía trên. Nếu danh sách các view có dài hơn thì style vẫn khong bị ảnh hưởng. Vì layout của view này cũng khá đơn giản nên phần đất cho Yalta cũng không nhiều, bạn cũng có thể sử dụng code thuần của iOS cho phần layout cũng được.

```
avatarView.al.size.set(CGSize(width: 40, height: 40))
addSubview(stack) { $0.edges.pinToSuperview(insets: Insets(all: 15)) }
```

Bên cạnh đó thì việc sử dụng thêm UIEdgeInsets: cũng khá là hữu dụng.

```
public typealias Insets = UIEdgeInsets

extension UIEdgeInsets {
    public init(all: CGFloat) {
        self = UIEdgeInsets(top: all, left: all, bottom: all, right: all)
    }

    public init(ver: CGFloat = 0, hor: CGFloat = 0) {
        self = UIEdgeInsets(top: ver, left: hor, bottom: ver, right: hor)
    }
}
```

Như vậy là qua ví dụ trên thì các bạn đã hình dung được phần nào cách tối ưu code khi thiết kế view bằng code thuần. Bên cạnh đó thì việc sử dụng playground làm mockup cũng rất là hữu hiệu với khả năng thay đổi ngay lập tức khi bạn thay đổi style hay layout.

Nguồn bài viết: http://kean.github.io/post/creating_views