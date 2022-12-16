## Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 10.3
- **Deployment Target:** 12.0

## Bước 1:  Tạo màn hình ViewController
Ta sẽ tạo màn hình ViewController như hình dưới đây:

![](https://images.viblo.asia/da04ced6-4692-4cc6-a504-0275def49498.png)

Gồm các thành phần sau:
- **ScrollView:** Thêm top, leading, trailing và bottom constraint, riêng top thì set constraint với Superview (constant = 0).
- **View1:** Thêm top, leading, trailing và bottom constraint với scrollView (constant = 0), với height = 1000 và width = View.width
- **Image1:** Thêm top, leading, trailing constraint với View1 và height = 300; ContentMode = Aspect Fill. 

![](https://images.viblo.asia/703f148e-41cf-460f-a116-c0573b3436d1.png)

## Bước 2:  Tạo hiệu ứng stretchy  header
Ta khai báo các outlets, biến và set giá trị ban đầu:
```
@IBOutlet private weak var scrollView: UIScrollView!
@IBOutlet private weak var imageView: UIImageView!
@IBOutlet private weak var imageHeightConstraint: NSLayoutConstraint!
@IBOutlet private weak var imageTopConstraint: NSLayoutConstraint!
private var originalHeight: CGFloat!

override func viewDidLoad() {
    super.viewDidLoad()
    scrollView.contentInsetAdjustmentBehavior = .never
    scrollView.delegate = self
    originalHeight = 300
}
```
Giá trị của **imageHeightConstraint** thay đổi dựa trên giá trị **offset**.
```
extension ViewController: UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let offset = scrollView.contentOffset.y
        let defaultTop = CGFloat(0)
        var currentTop = defaultTop
        
        if scrollView == self.scrollView {
            if offset < 0 { // User scroll down
                currentTop = offset
                imageHeightConstraint.constant = originalHeight - offset
            } else {
                imageHeightConstraint.constant = originalHeight
            }
            imageTopConstraint.constant = currentTop
        }
    }
}
```

Trong đó:
- **originalHeight** là giá trị ban đầu của image height constraint.
- **offset** là giá trị toạ độ y tương đối giữa điểm đầu của khung xem (contentView) và điểm đầu của scrollView.
- **defaultTop** là giá trị ban đầu của image top constraint.
- **currentTop** là giá trị hiện tại của image top constraint.

## Bước 3: Tạo hiệu ứng Blur Effect
```
private var blurEffectView: UIVisualEffectView!
private var animator: UIViewPropertyAnimator!

override func viewDidLoad() {
    super.viewDidLoad()
    ...
    setupVisualEffectBlur()
}
```
Ta tạo subview **blurEffectView** và set constraint với **imageView**. 

```
private func setupVisualEffectBlur() {
    animator = UIViewPropertyAnimator(duration: 3.0, curve: .linear, animations: { [weak self] in
        guard let self = self else { return }

        let blurEffect = UIBlurEffect(style: .regular)
        self.blurEffectView = UIVisualEffectView(effect: blurEffect)
        self.imageView.addSubview(self.blurEffectView)
        self.setupConstraints()
    })
}

// Setup blurEffectView's constraint to imageView
private func setupConstraints() {
    blurEffectView.translatesAutoresizingMaskIntoConstraints = false
    blurEffectView.leadingAnchor.constraint(equalTo: imageView.leadingAnchor).isActive = true
    blurEffectView.trailingAnchor.constraint(equalTo: imageView.trailingAnchor).isActive = true
    blurEffectView.topAnchor.constraint(equalTo: imageView.topAnchor).isActive = true
    blurEffectView.bottomAnchor.constraint(equalTo: imageView.bottomAnchor).isActive = true
}
```

```
func scrollViewDidScroll(_ scrollView: UIScrollView) {
    let offset = scrollView.contentOffset.y
    let defaultTop = CGFloat(0)
    var currentTop = defaultTop

    if scrollView == self.scrollView {
        if offset < 0 {
            currentTop = offset
            imageHeightConstraint.constant = originalHeight - offset
            animator.fractionComplete = abs(offset) / 100
        } else {
            imageHeightConstraint.constant = originalHeight
            animator.fractionComplete = 0
        }
        imageTopConstraint.constant = currentTop
    }
}
```
Trong đó:
- **UIVisualEffectView:** object thực thi một số hiệu ứng phức tạp.
- **UIViewPropertyAnimator:** object cho phép tạo hiệu ứng đối với sự thay đổi của views.
- **fractionComplete:** phần trăm hoàn thành của animation sẽ thay đổi dựa trên giá trị **offset**.

Và đây là kết quả: 
![](https://images.viblo.asia/9da626a5-21d5-4af2-bc06-1eff3f8066ff.gif)

## Tài liệu tham khảo:
https://www.youtube.com/watch?v=R5CC1_QhrvY&list=PL0dzCUj1L5JGr7DuK-FxyIoabvP2ge5uY
## Link github: 
https://github.com/ndhuy96/SwiftTips/tree/stretchyHeader