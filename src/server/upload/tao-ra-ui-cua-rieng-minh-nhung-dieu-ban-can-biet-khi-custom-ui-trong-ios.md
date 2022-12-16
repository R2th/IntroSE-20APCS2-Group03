Chào các bạn, cảm ơn mọi người đã ghé thăm bài viết này. Tôi là Huy, một lập trình viên iOS.

Bài viết này được viết với mục đích chia sẻ những kinh nghiệm và quan điểm của tôi về một chủ đề hết sức quen thuộc mà có lẽ là lập trình viên iOS nào cũng đã, đang và sẽ phải làm đến, đó là custom UI. 

Các lập trình viên chúng ta thường coi đây là vấn đề cơ bản và ai cũng làm được. Nhưng trong thực tế công việc, tôi thấy rằng mọi người gặp phải rất nhiều vấn đề liên quan đến custom UI. Bản thân tôi cũng đã nhiều lần ăn không ngon ngủ không yên vì nó.

Bài viết dưới đây đưa ra cách nhìn và một số lời khuyên của tôi về vấn đề này, để giúp các bạn có hướng đi khi gặp phải những UI phức tạp.


-----

# Custom UI là làm gì?
Trước tiên, tôi cần phải cắt nghĩa rõ ràng với các bạn việc custom UI là làm gì.

Custom UI mà tôi đề cập trong bài viết này là việc ta đi kế thừa lại các lớp UI có sẵn của Apple để có thể tinh chỉnh và thêm vào những khả năng mà chúng ta mong muốn. Từ đó tạo ra một UI class mới mà ta có thể tái sử dụng ở những nơi khác.

Tôi muốn rõ ràng chuyện này bởi vì chữ "custom UI" thực tế thì nghe dễ bị hiểu nhầm, sẽ có người cho rằng việc chúng ta dựng các màn hình cũng là đang đi custom UI. Mặc dù cũng đúng phần nào nhưng ý tôi không phải vậy. Trước tiên là thế nhé!

# Khi nào cần đến custom UI?
Rõ ràng mà nói, nếu bài toán của chúng ta chỉ cần sử dụng các UI mặc định của UIKit là có thể giải quyết được toàn bộ, thì ta chẳng cần phải đi custom UI làm gì cho nó mệt. Thực tế thì các UI class của UIKit vốn đã cho chúng ta khả năng tùy chỉnh rất nhiều thứ rồi. Vậy thì khi nào chúng ta cần phải đi custom UI?

## Tái sử dụng
Đây là lý do phổ biến nhất khi chúng ta lựa chọn việc custom UI. Vì hầu như app nào cũng sẽ có những phần tử UI tương tự nhau.

Bạn có thể nói rằng: "Tôi cần custom UI vì tôi muốn thêm tính năng này tính năng nọ, build một UI phức tạp này kia", nhưng chung quy lại, tất cả chúng ta làm thế là vì muốn tái sử dụng. 

Nếu tạo ra mà không hoặc không thể tái sử dụng thì việc bạn custom UI là vô nghĩa. Bởi vì thực tế thì toàn bộ logic bạn tạo ra cho custom UI đó đều có thể xử lý trong ViewController. Ngoại trừ lý do thứ hai tôi nhắc đến dưới đây.

## Bắt các event của View's Life Cycle
Nếu sử dụng Auto Layout, tôi nghĩ trong chúng ta ai cũng đã ít nhất một lần tự hỏi rằng thời điểm nào layout hoàn tất? Bởi vì chúng ta cần xử lý đa màn hình, chúng ta cần bo góc dựa theo chiều cao cuối cùng của view, chúng ta cần tính toán độ dài của các cell với dynamic height,...

Có người chờ đến `viewDidAppear()` rồi mới bắt đầu xử lý logic, có người lại gọi `view.layoutIfNeed()` ngay trong `viewDidLoad()`... Tất cả đều là những quan điểm sai lầm, thiếu triệt để và dễ gây ra các side effect không mong muốn.

Thực tế thì, không có thời điểm nào trong UIViewController's Life Cycle mà toàn bộ View đã được layout hết. Nếu bạn sử dụng UITableView với dynamic cell height, tableview cuộn đến đâu, mọi thứ được layout đến đó. 

Do đó, điều hợp lý và triệt để duy nhất mà bạn có thể làm đó là tạo một class kế thừa lại UITableView, UIView,... sau đó override hàm `layoutSubViews()` của nó. Hàm này sẽ được gọi nhiều lần, và sau mỗi lần gọi là mọi thứ đã được layout lại.

Hoặc các bạn có nhu cầu bắt các event liên quan tới `init`, `deinit`, `didMoveToSuperview`,... khác của view. Thì đây là thời điểm bạn cần custom UI.

# Custom UI như thế nào?

## Code chay

Nếu bạn cần custom UI với rất nhiều subview, layout phức tạp thì đây là một sự lựa chọn mà tôi không recommend.

```
class MyView: UIView {

    private var labelA: UILabel?
    private var buttonB: UIButton?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        // Thêm thắt UI gì thì thêm
        // Mình code tay mà
        // Thiết lập frame hoặc layout constraint, addSubView, bắt delegate, event cho labelA, buttonB
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        // Hàm này được gọi khi UI được khởi tạo từ XIB
        // Cần chú ý nếu như ta thiết lập class này làm custom class cho một UIView trong IB
        // Thế nên bạn vẫn sẽ phải implement cả ở đây
    }
}
```

Nhưng nếu ta chỉ cần can thiệp để tinh chỉnh UI thì đây là cách làm chuẩn bài, chúng ta không cần tạo thêm XIB làm gì cho đau đầu. Hãy thử xem xét các ví dụ sau:

Một ImageView với khả năng tự bo tròn ở mọi kích cỡ, ta buộc phải custom UI vì cần phải can thiệp vào thời điểm view này được layout xong.

```
class RoundImageView: UIImageView {

    override func awakeFromNib() {
        super.awakeFromNib()
        layer.masksToBounds = true
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        layer.cornerRadius = bounds.height / 2
    }
}
```

Một UITextView không thể sử dụng một cách bình thường mà phải điều chỉnh lại chiều cao của con trỏ soạn thảo. Ta cần can thiệp vào View's Life Cycle và không thể thực hiện điều này chỉ nằm trong ViewController.

```
private let estimatedMultipleHeightRate: CGFloat = 1.1

class CommentTextView: UITextView {
    
    /*
    * Because UITextView has the text cursor which its height include line spacing,
    * So we cannot use the default cursor size and need to adjust the height.
    */
    override func caretRect(for position: UITextPosition) -> CGRect {
        var originalRect = super.caretRect(for: position)
        if let font = self.font {
            originalRect.size.height = estimatedMultipleHeightRate * font.pointSize + abs(font.descender)
        }
        return originalRect
    }
}
```

## Sử dụng XIB

Đây là một sự lựa chọn tuyệt vời khi bạn có rất nhiều subview với layout phức tạp. Không giống như việc subclass lại các lớp trong UIKit để tinh chỉnh UI, đây là phương pháp để chúng ta có thể dựng và kết hợp subview, từ đó tạo ra một view mới theo nhu cầu.

Cách thực hiện cũng khá đơn giản. Tôi có một ví dụ về một MiniPlayerView như sau để các bạn dễ hình dung.

Chúng ta tạo ra 2 file tương ứng, file swift là class kế thừa UIView và file xib cũng là dạng view xib nhé.

![](https://images.viblo.asia/78545684-ef21-4190-ae04-08d1633c68e8.png)

Tiếp theo, chúng ta thiết lập File's Owner cho file xib là file swift tương ứng.

![](https://images.viblo.asia/5bc106c8-4ced-404e-b61e-e74d539e08a0.png)

Trong file `MiniPlayerView.swift` ta implement một số đoạn code cần thiết sau:

```
class MiniPlayerView: UIView {

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        addViewFromNib()
        setup()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        addViewFromNib()
        setup()
    }
    
    /*
     * Hàm này lấy view ra từ file xib và gắn vào subview của view hiện tại. Cách này giúp chúng ta có thể
     * sử dụng class MiniPlayerView từ cả việc khởi tạo tay hay trên Interface Builder một cách dễ dàng.
     */
    private func addViewFromNib() {
        let bundle = Bundle(for: type(of: self))
        let nib = UINib(nibName: String(describing: type(of: self)), bundle: bundle)
        guard let nibView = nib.instantiate(withOwner: self, options: nil).first as? UIView else {
            return
        }
        nibView.frame = bounds
        nibView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        translatesAutoresizingMaskIntoConstraints = true
        addSubview(nibView)
    }
    
    private func setup() {
        // Khởi tạo gì đó ban đầu nếu cần
    }
```

Việc tiếp theo là kéo UI, constraint trên file XIB và gắn các event vào File's Owner của nó mà thôi hehe :relieved:

```
class MiniPlayerView: UIView {
    
    @IBOutlet private weak var likeButton: UIButton!
    @IBOutlet private weak var playButton: UIButton!
    @IBOutlet private weak var slider: UISlider!
    
    // Init các thứ như trên
    // ...
    
    @IBAction private func onLikePressed(_ sender: Any) {
        // Làm cái gì đó lúc bấm like
    }

    @IBAction private func onPlayPressed(_ sender: Any) {
        // Làm cái gì đó lúc bấm Play
    }
}
```

Tiếp theo là việc đưa các event ra ngoài ViewController, cũng có nhiều cách tuy nhiên tôi thường sử dụng cơ chế delegate
```
protocol MiniPlayerViewDelegate: class {

    func miniPlayerViewLikeDidPress()
    func miniPlayerViewPlayDidPress()
}

class MiniPlayerView: UIView {

    // IBOulet các thứ như trên
    // ...
    
    weak var delegate: MiniPlayerViewDelegate?
    
    // Code kiếc các kiểu như trên
    // ...
    
    @IBAction private func onLikePressed(_ sender: Any) {
        // Làm cái gì đó lúc bấm like
        delegate?.miniPlayerViewLikeDidPress()
    }

    @IBAction private func onPlayPressed(_ sender: Any) {
        // Làm cái gì đó lúc bấm Play
        delegate?.miniPlayerViewPlayDidPress()
    }
```
# Bạn cần lưu ý những điều gì?

Đọc là một chuyện, làm lại là một chuyện khác. Trước khi bạn thực hiện custom UI, nên nắm được hai điều dưới đây

## Hiểu cách hoạt động của class cha

Khi bạn định tinh chỉnh một class cha nào đó như UIButton, UITableView,... Bạn cần hiểu cách các class này hoạt động.
Bởi vì không giống như một UIView thuần túy, đây là các lớp đã được đưa vào nhiều logic phức tạp và việc chúng ta đi override hay thiết lập các trạng thái có thể gây ảnh hưởng đến hoạt động gốc của class cha.

Tuy nhiên thực tế thì UIKit là một nền tảng đóng, docs thì cũng có nhưng không thể cover hết trường hợp. Do đó, việc nghiên cứu hoạt động của class cha hoàn toàn phụ thuộc và sự thử nghiệm, ứng biến và kinh nghiệm cá nhân. Thế nên cái vấn đề này ông nào làm nhiều thì khôn, ít bug, ít side effect, ít crash.

Làm nhiều và thử nhiều vào nhé các bạn.

## Hiểu cách hoạt động của View's life cycle

Phần này thì Apple có hẳn một trang cũng khá dài cho chúng ta đọc và nghiên cứu: [UIView](https://developer.apple.com/documentation/uikit/uiview)

Cũng giống như việc hiểu hoạt động của class cha. Việc nắm rõ cách hoạt động của View's life cycle thực chất chính là nắm được cách hoạt động cơ bản của UIView, việc override các hàm và thuộc tính cơ bản sẽ tác động như thế nào đến UIView,...

Nhớ đọc thật kỹ tài liệu trên bởi vì một điều rất thực tế rằng làm iOS thì công việc lớn nhất là lắp ghép các logic gắn với View thật mượt mà trơn tru.

# Kết
Hy vọng bài viết đã đem lại cho bạn những kiến thức bổ ích, nếu thấy hay thì upvote và follow kênh của mình để không bỏ lỡ những bài viết hay ho nhé!