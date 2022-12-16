Trong bài viết này, mình sẽ hướng dẫn lưu ý khi tạo custom UIView sử dụng autolayout mà không cần Nib/Storyboard.
## Why custom UIView?
Chúng ta tạo custom view khi mà những control trong UIKit không đủ để ta thực hiện công việc của mình.
Custom view là tập hợp của nhiều view khác cùng với custom behavior. Thường thì bạn sẽ xây dựng storyboard hoặc khởi tạo view controller của bạn với nhiều view, nhưng có thể ta sẽ làm theo một cách khác - Thực hiện với custom view.
## About Initializers
Điều quan trọng là bạn phải tìm hiểu cơ bản về [Swift initialization](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html). Nó là một chủ đề phức tạp và dài dòng nhưng sẽ rất hữu ích trong việc xây dựng custom view.
## Designated initializer
Subclass phải gọi superclass designated initializer của nó – Nếu không gọi thì  superclass sẽ không được khởi tạo hoàn toàn.
## Convenience initializer
**convenience** là secondary/optional, nó chỉ đơn giản là shortcut để gọi designated initializer.
## Required init
**required** xác định rằng các subclass phải implement việc khởi tạo. UIView có một khởi tạo như vậy vì nó conform với NSCoding, một protocol để encoded and decoded view.
Custom view của ta phải được implement và decoded để khởi tạo view.
```
public required init?(coder aDecoder: NSCoder) {
  super.init(coder: aDecoder)
  // Custom decoding..
}
```
## Our custom view initializers
Với những điều cơ bản của initializers được trình bày ở trên, Một custom view thường sẽ cần một vài hàm init như sau:
```
public class AppIconView: UIView {
    
    // #1
    public required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }

    // #2
    public override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }    
    
    // #3
    public convenience init(image: UIImage, title: String) {
        self.init(frame: .zero)
        self.image = image
        self.title = title
        setupView()
    }

    private func setupView() {
        translatesAutoresizingMaskIntoConstraints = false
        
        // Create, add and layout the children views ..
    }
    
}
```
Có 3 hàm inits và đây là lý do:
1. Vì UIView **required** nó
2. Vì #3 will cần gọi một designated initializer
3. initializer của chúng ta cùng với dữ liệu cho view
Trong mỗi hàm init, chúng ta sẽ gọi setupView() để update layout cho view
## translatesAutoresizingMaskIntoConstraints
Mọi view sử dụng autolayout cần set translatesAutoresizingMaskIntoConstraints là false. Đó là điều đầu tiên cần làm trong setupView(). Đó là vì thời điểm chưa có Auto Layout thì có khái niệm về auto resizing. Qua autoresizingMask, view sẽ auto resize tương tự như auto layout. Nhưng ta không cần sử dụng auto resize vì đã có auto layout.
## Intrinsic Content Size
Là kích thước tự nhiên cho nội dung của nó, ví dụ:  Intrinsic size của là độ dài của nó.
Apple’s [auto layout guide](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/AnatomyofaConstraint.html#//apple_ref/doc/uid/TP40010853-CH9-SW21) có một phần nói về nó và một số [note](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/AutolayoutPG/ViewswithIntrinsicContentSize.html) về các trường hợp phổ biến
Nó hoạt động như thế nào?
Nó tạo ra một cặp constraint cho mỗi chiều (chiều rộng và chiều cao). Các cặp compression resistance (priority 750) và content hugging (priority 250).
Intrinsic content size đơn giản hoá auto layout, giảm số lượng constraint cần thiết, bởi vì các constraint được bạn thêm vào. Bạn chỉ cần quản lý mức độ ưu tiên của nó.
Nó là một người trợ giúp, và bạn phải hiểu rằng nó bổ sung những constraint cho bạn. Giả sử chúng ta muốn custom view của ta có chiều cao cố định nhưng chiều rộng thay đổi, chúng ta có thể override intrinsicContentSize như thế này
```
public override var intrinsicContentSize: CGSize {
    let height = ... // Your calculated or fixed height
    return CGSize(width: UIViewNoIntrinsicMetric, height: height)
}
```
Theo quy tắc chung: custom view sẽ không bao giờ tạo constraint cho chiều rộng và chiều cao của chính nó nhưng đôi khi bạn muốn thuận tiện hạn chế kích thước của bạn. Đó là lúc sử dụng Intrinsic Content Size
## Fitting Size
Intrinsic size là input cho Auto Layout engine. Fitting size is là output từ Auto Layout engine. Fitting size là kích thước được tính để fit với nội dung của nó.
Sử dụng *systemLayoutSizeFitting(:)*.  parameter *targetSize* là kích thước nhỏ nhất hoặc lớn nhất để phù hợp với constraint.
Ví dụ: Để biết được kích thước nhỏ nhất có thể của content view, gọi *appView.systemLayoutSizeFitting(UILayoutFittingCompressedSize) *
## The thing with UIStackView
Có thể dễ dàng bị nhầm lẫn khi nghĩ rằng  stack view có intrinsic size. Sử dụng stack view có vẻ như width và height constraints là không cần thiết. Nhưng không phải như vậy, stack view intrinsic size luôn luôn là UIViewNoIntrinsicMetric
Điều gì thực sự xảy ra khi Auto Layout engine tính toán kích thước phù hợp cho stack.
Vậy làm thế nào để bạn có được kích thước phù hợp? Đơn giản chỉ cần gọi  stack.systemLayoutSizeFitting(UILayoutFittingCompressedSize).
Hy vọng bài viết sẽ có ích đối với các bạn.