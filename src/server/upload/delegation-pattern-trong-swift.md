Khi mà bắt đầu làm quen với ```Swift``` và``` iOS```, chúng ta sẽ thấy một từ rất quen thuộc là ```Delegate```, điều này có thể thấy rõ ràng trong những framework của Apple. ```UITableView``` và ```UICollectionView``` là những ví dụ cụ thể nhất của delegation trong Swift. Trong bài này, chúng ta sẽ tìm hiểu ```delegate pattern``` là gì  và làm thế nào implement  nó trong Swift.

Delegation pattern là một *messaging design pattern* trong Swift, được sử dụng trong việc giao tiếp 1-1 giữa những object, tận dụng ```protocol``` trong Swift để ủy thác cho một object.

Hãy xem một ví dụ đơn giản bằng cách tạo một view đơn giản
```Swift
class BubbleView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
    private func setup() {
        self.isUserInteractionEnabled = true
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(BubbleView.didTapIntoButton))
        self.addGestureRecognizer(tapGestureRecognizer)
    }

    @objc func didTapIntoButton(_ sender: UITapGestureRecognizer) {
    }
}
```

Chúng ta có một class tên là ```BubbleView```. Giờ define một delegate bằng cách viết một ```protocol```
```Swift
protocol BubbleViewDelegate {
    func userDidTap(into bubbleView: BubbleView)
}
```
Hãy chú ý cả cách đặt tên theo Apple là Delegate ở cuối và những method theo format "didDo"

Trở lại với class view, giờ ta thêm ```property``` mới
```Swift
class BubbleView: UIView {
    { ... }
    weak var delegate: BubbleViewDelegate?

    @objc func didTapIntoButton(_ sender: UITapGestureRecognizer) {
        delegate?.userDidTap(into: self)
    }
}
```
Hãy chú ý ở đây chúng ta sử dụng ```weak``` cho ```property``` mới. Điều này tránh khả năng có ```retain cycle``` mà có thể thấy dưới đây

Tại đây chúng ta muốn ```view controller``` có ```bubble view``` có thể xử lý tất cả những tương tác UI, ví dụ như chạm vào ```bubble view```. Có thể thấy đây là một MVC với việc chia ra view riêng và controller riêng
```Swift
class ContainerViewController: UIViewController {

    lazy var bubbleView: BubbleView = {
        let bubbleView = BubbleView(frame: CGRect(x: 90, y: 10, width: 200, height: 200))
        bubbleView.backgroundColor = .black
        bubbleView.layer.cornerRadius = 100
        bubbleView.delegate = self
        return bubbleView
    }()
    override func loadView() {
        super.loadView()
        view.addSubview(bubbleView)
    }
}
extension ContainerViewController: BubbleViewDelegate {
    func userDidTap(into bubbleView: BubbleView) {
        let currentBounds = view.bounds
        UIView.animate(withDuration: 1.5) {
            var frame = bubbleView.frame
            frame.origin.y = currentBounds.height
            bubbleView.frame = frame
        }
    }
}
```
That's it, phía trên là một ví dụ của delegation - xử lý sự kiện chạm vào view của user, bằng việc *ủy quyền* logic cho controller

Với những điều trên hi vọng bạn sẽ hiểu và cảm thấy thoải mái khi dùng ```Delegate Pattern```. Bài viết đầu có nhiều thiếu sót, mong mọi người giúp đỡ.

Nguồn: https://dev.to/mrcflorian/delegation-pattern-in-swift-by-example-30g3