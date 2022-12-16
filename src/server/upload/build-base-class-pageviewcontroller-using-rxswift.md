> Trong quá trình đọc code của các tiền bối thì tôi thấy có 1 class rất hay đó là base pageviewcontroller để sử dụng scroll ngang hay click vô tab. Vừa đọc vừa ứng dụng vào 1 project tương tự và để sau này có thể dùng lại nên tôi viết bài này có thể giúp ích cho bạn nào đó. 

Giải quyết vấn đề:
![](https://images.viblo.asia/68a40a6b-a296-4a7a-8f61-fa862dd7c46c.gif)

# Kiến thức cơ bản cần nắm
> Custom UIView

> RxSwift.

> Kế thừa class.

> UIPageViewController.
# Base class
> Class để mình có thể kế thừa nếu như muốn sử dụng lại.

> Class là 1 UIViewController. Bên trong là 2 UIView. 1 là segmentController là các tab hoa quả, thịt cá như ảnh gif. 2 là pageContainerView là view mình sẽ hiển thị nội dụng. Cụ thể 2 sẽ là một ViewController riêng biệt mình sẽ xử lý data hiện thị tuỳ thích trên đó.
> Bên trong còn 1 pageViewController nữa nhé. Và thêm 1 currentIndex để mình xác định được mình đang ở controller pageContainerView nào. Khai báo bằng rxSwift nhé.

## Khai báo ban đầu nào.
```swift

protocol ChildPageProtocol {
    func pageDidAppear()
    var pageIndex: Int { get set }
}

class BasePageViewController: UIViewController {
    @IBOutlet weak var segmentControl: UIView!
    @IBOutlet weak var pageContainerView: UIView!

    var pageViewController: UIPageViewController!
    var currentIndex = BehaviorRelay<Int>(value: 0)

    override func viewDidLoad() {
        super.viewDidLoad()
        setupPageViewController()
    }
}
```
## Setup pageViewController chứ nhỉ.
```swift
private func setupPageViewController() {
    pageViewController = UIPageViewController(transitionStyle: .scroll, navigationOrientation: .horizontal, options: nil)
    pageViewController.view.backgroundColor = .clear
    pageViewController.delegate = self
    pageViewController.dataSource = self

    addChildViewController(pageViewController)
    pageContainerView.addSubview(pageViewController.view)
    pageViewController.didMove(toParentViewController: self)
    view.setNeedsLayout()
}
```
> Khởi tạo 1 UIPageView và nhét nó là subView của class Base thôi.
## Setup delegate và dataSource khi mình vuốt trái phải thì chuyển pageView.
```swift
extension BasePageViewController: UIPageViewControllerDelegate, UIPageViewControllerDataSource {
    func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
        if finished, completed {
            if let firstVC = pageViewController.viewControllers?.first as? ChildPageProtocol {
                let newIndex = firstVC.pageIndex
                if currentIndex.value != newIndex {
                    didScrollToPage(newIndex)
                }
            }
        }
    }
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        let preIndex = currentIndex.value - 1
        return getPageOfIndex(preIndex)
    }

    public func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        let nextIndex = currentIndex.value + 1
        return getPageOfIndex(nextIndex)
    }
}
```swift

Chúng ta để ý bên trong kia ta gọi thêm 2 hàm mới là **getPageOfIndex** và **didScrollToPage** 
```swift
func getPageOfIndex(_ index: Int) -> UIViewController? {
    return nil
}

func didScrollToPage(_ index: Int) {
    currentIndex.accept(index)
}

// Thằng này tác dụng tít dưới kia cơ nhé. 
func setSelected(_ pageIndex: Int, direction: UIPageViewControllerNavigationDirection = .forward, animate: Bool = true) {
    if let page = getPageOfIndex(pageIndex) {
        self.pageViewController.setViewControllers([page], direction: direction, animated: animate, completion: nil)
        currentIndex.accept(pageIndex)
    }
}
```

> Hàm getPageOfIndex chúng ta sẽ override ở child class để có thể trả về UIViewController tương ứng phục vụ nhu cầu của app
> didScrollToPage Hàm này chúng ta cần khi chúng ta muốn biết currentPage là bao nhiêu để sử lý lên segment.

> Tạm thời code base đơn giản như thế đã. Chúng ta xuống children controller xem chúng kế thừa những gì để có thể hoạt động nhé.

# Children viewController.
## Lại init Class cái nhỉ :v
```swift
class HomeViewController: BasePageViewController {
    @IBOutlet weak var segmentControlView: SegmentControlView!
    private var bag = DisposeBag()
    private var viewModel: HomeViewModel!
}
```

> Child class bao gồm 1 segmentControlView là một viewCustom là 3 cái tab hoa quả, rau củ đó. Chúng ta sẽ xem ở dưới nhé.
> Nếu bạn sử dụng RxSwift thì 2 dòng dưới chắc quen thuộc nhỉ. 
bag = DisposeBag() là khai bái 1 DisposeBag để phục vụ cho việc giải phóng bộ nhớ trong cơ chế rxSwift.
viewModel là 1 class ViewModel trong mô hình design Pattern MVVM. Cái này để cung cấp data tĩnh hay động (request API) để phục vụ cho view. Nếu demo các bạn có thể sử dụng biến rx bình thường bên ngoài controller như khai báo 1 mảng hay 1 đối tương đơn thuần.

## Override lại hàm getPageController như ở baseClass mình nói.
```swift
override func getPageOfIndex(_ index: Int) -> UIViewController? {
    switch index {
    case 0:
        if let vegetablesVC = UIStoryboard.instantiate(VegetablesViewController.self, storyboardType: .home) as? VegetablesViewController {
            vegetablesVC.backgroundColor = .red
            vegetablesVC.pageIndex = 0
            return vegetablesVC
        }
        return super.getPageOfIndex(index)
    case 1:
        if let vegetablesVC = UIStoryboard.instantiate(VegetablesViewController.self, storyboardType: .home) as? VegetablesViewController {
            vegetablesVC.backgroundColor = .blue
            vegetablesVC.pageIndex = 1
            return vegetablesVC
        }
        return super.getPageOfIndex(index)
    case 2:
        if let vegetablesVC = UIStoryboard.instantiate(VegetablesViewController.self, storyboardType: .home) as? VegetablesViewController {
            vegetablesVC.backgroundColor = .green
            vegetablesVC.pageIndex = 2
            return vegetablesVC
        }
        return super.getPageOfIndex(index)
    default:
        return super.getPageOfIndex(index)
    }
    return nil
}
```

> Các bạn nhớ thằng tham số index, và xử lý bởi thằng currentIndex chứ. xem lại viewControllerBefore và viewControllerAfter ở baseClass nhé.
> Ở đây mình có 3 tab tương ứng với index 0, 1, 2. Ở đây mình khai báo 3 controllers. Hoặc có thể là 3 controller khác nhau tuỳ bạn. Đây sẽ là viewcontroller bình thường bạn vẫn dùng.
> Các bạn thấy lạ ở cái **pageIndex = 0, 1, 2** không. Đừng để ý đến nó. Mình sẽ nói phía dưới nhé.

Lúc này nếu bạn runcode thì có thể vuốt sang trái phải được r đó.

## Segment View Custom.

> Các bạn hình dung như sau: Bên trong thằng **HomeViewController** chứa 1 UIView nó là thằng **SegmentControlView.swift**. Và bên trong thằng này lại chứ 3 view nữa là 3 thằng **SegmentItemView.swift**
> Hơi lằng nhằng nhưng có hình dung ý tưởng nhé.

> Cái này nếu bạn demo đơn giản thì chỉ cần kéo 3 thằng button vào và kéo 3 action click vào để có thể xử lý rồi. Nhưng mình muốn build custom bằng UIView để code ngon hơn :v 
> Nếu bạn nào đã custom UIView thì sẽ dễ theo dõi đoạn này hơn. 

### SegmentViewItemCustom.
> Bên trong có 1 itemButton để click. 1 titleLabel để setTitle : hoa quả, rau củ, ... và 1 deviderSelectedView là cái màu đen khi mình click đó.
```swift
import UIKit
import RxCocoa
import RxSwift

class SegmentItemView: UIView {
    @IBOutlet weak private var itemButton: UIButton!
    @IBOutlet weak private var titleLabel: UILabel!
    @IBOutlet weak private var dividerSelectedView: UIView!

    var didSelectedItem = PublishSubject<Int>()
    var index = BehaviorRelay<Int>(value: 0)

    @IBInspectable var indexIB: Int = 0 {
        didSet {
            self.index.accept(self.indexIB)
        }
    }

    private var bag = DisposeBag()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }

    private func setupView() {
        loadNib()
        setupRx()
        self.titleLabel.text = ""
    }

    private func loadNib() {
        guard let nibContent = Bundle.main.loadNibNamed(SegmentItemView.className, owner: self, options: nil)?.first as? UIView else { return }
        nibContent.frame = self.bounds
        self.addSubview(nibContent)
        self.backgroundColor = UIColor.clear
    }

    private func setupRx() {
        itemButton.rx
            .tap
            .asObservable()
            .flatMapLatest { _ -> Observable<Int> in
                return Observable.just(self.index.value)
            }
            .bind(to: self.didSelectedItem)
            .disposed(by: bag)
    }

    // MARK: - public function
    func updateItemView(selected: Bool = false, text: String = "") {
        dividerSelectedView.isHidden = !selected
        if let textEmpty = titleLabel.text, !textEmpty.isEmpty {
            titleLabel.text = textEmpty
        } else {
            titleLabel.text = text
        }
    }
}
```
> Class này tương ứng với 1 cục Hoa qủa hay cục tab Thịt đó =)).

## SegmentControlView - Thằng này chưa 3 thằng segmentItem đây
```swift
import Foundation
import UIKit
import RxCocoa
import RxSwift

class SegmentControlView: UIView {
    // @IBOutlet weak private var vegetableItem: SegmentItemView!
    // @IBOutlet weak private var mealItem: SegmentItemView!
    // @IBOutlet weak private var fruitItem: SegmentItemView!

    @IBOutlet weak var itemsStackView: UIStackView!
    var items = PublishSubject<[SegmentItemView]>()
    var didSelectSegmentCallback = PublishSubject<Int>()
    private var bag = DisposeBag()
    var indexSelected = BehaviorSubject<Int>(value: 0)

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }

    private func setupView() {
        loadNib()
        setupRx()

    }

    private func loadNib() {
        guard let nibContent = Bundle.main.loadNibNamed(SegmentControlView.className, owner: self, options: nil)?.first as? UIView else { return }
        nibContent.frame = self.bounds
        self.addSubview(nibContent)
        self.backgroundColor = UIColor.clear
    }

    private func commonInit(items: [SegmentItemView]) {
        guard items.count > 0 else { return }
        let widthItem = self.itemsStackView.bounds.width / CGFloat(items.count)
        for (index, item) in items.enumerated() {
            let frame = CGRect(x: CGFloat(index) * widthItem, y: 0, width: widthItem, height: self.itemsStackView.bounds.height)
            item.frame = frame
            item.index.accept(index)
            if index == self.indexSelected.getValue() ?? 0 {
                item.updateItemView(selected: true)
            }
            self.itemsStackView.addSubview(item)

            item
                .didSelectedItem
                .subscribe(onNext: { index in
                    self.didSelectSegmentCallback.onNext(index)
                    self.indexSelected.onNext(index)
                })
                .disposed(by: bag)
        }
    }

    private func setupRx() {
        items
            .subscribe(onNext: { arrSegment in
                self.commonInit(items: arrSegment)
            })
            .disposed(by: bag)

        indexSelected
            .subscribe(onNext: { index in
                self.updateSelected(index: index)
            })
            .disposed(by: bag)
    }

    private func updateSelected(index: Int) {
        for (i, item) in self.itemsStackView.subviews.enumerated() {
            let subView = item as! SegmentItemView
            subView.updateItemView(selected: i == index)
        }
    }
}
```

> Ở đây mình custom bằng thằng **items** nó là data được truyền vào từ thằng HomeClassController. Nếu không bạn có thể kéo trực tiếp số UIView cố định mà k cần custom như mình.
Như này này:

```swift
// @IBOutlet weak private var vegetableItem: SegmentItemView!
// @IBOutlet weak private var mealItem: SegmentItemView!
// @IBOutlet weak private var fruitItem: SegmentItemView!
```

> Chú ý thằng này

```swift
didSelectSegmentCallback
```
Thằng này là khi bạn click vào 1 thăng segmentItem thì nó trả về cho bạn **index**. Và thằng này nó lại trả cái **index** đó cho thằng HomeClass để xử lý. Giống như callback ý. Bạn phải truyền từ thằng cháu cho thằng cha và đến thằng ông nội quyết định xử lý gì ấy.

> Còn thằng này
```swift
indexSelected
```
Là xác định bạn click vào thằng nào đó để hiện thị divider màu đen tương ứng với từng item.

### Quay lại thằng HomeViewController xem nó làm gì với thằng segmentControlView nhé.
```swift
private func setupRx() {
    viewModel = HomeViewModel()
    viewModel.segmentData
        .bind(to: self.segmentControlView.items)
        .disposed(by: bag)

    segmentControlView
        .didSelectSegmentCallback
        .subscribe(onNext: { [weak self] index in
            if let currentIndex = self?.currentIndex.value, index != currentIndex {
                let animation = (index > currentIndex) ? UIPageViewControllerNavigationDirection.forward : UIPageViewControllerNavigationDirection.reverse
                self?.setSelected(index, direction: animation, animate: true)
            }

        })
        .disposed(by: bag)
}
```

> Bạn thấy thằng **segmentControlView.didSelectSegmentCallback** nó trả về index và và ở đây mình xử lý là **setSelected** ở thằng containerView đó. Tức bạn click và thằng nào thì ở dưới nó phải setView tương ứng với tab đó.

### Quay lại 1 chút thằng HomeViewController
> Nếu đến đây mà bạn chạy được code thì có 1 vấn đề là khi bạn vuốt view ngang thì thằng segment chả thay đổi gì cả.
> Hãy sử lý bên dưới

```swift
override func didScrollToPage(_ index: Int) {
    super.didScrollToPage(index)
    segmentControlView.indexSelected.onNext(index)
}
```
Bạn override lại thằng **didScrollToPage** thằng này ở BaseClass để nó set lại currentIndex cho thằng segmentControl. 
## ChildViewController.
> CÁc bạn còn nhớ ở đoạn override lại thằng getPage không nó có đoạn code **vegetablesVC.pageIndex = 0 1 2**
> Hãy nhớ lại thăng **ChildPageProtocol**. Mỗi thằng children ContainerPageView sẽ phải implement thăngf protocol này để định danh index cho từng viewController để baseClass có thể lấy index của viewcontroller ra để set currentIndex.
```swift
func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
    if finished, completed {
        if let firstVC = pageViewController.viewControllers?.first as? ChildPageProtocol {
            let newIndex = firstVC.pageIndex
            if currentIndex.value != newIndex {
                didScrollToPage(newIndex)
            }
        }
    }
}
```
> Bạn thấy **firstVC.pageIndex** chứ. Nó phục vụ cho thằng này. 

# Tổng kết. 
> Do code nhiều cái liên quan đến nhau nên demo code trên còn thiếu nhiều. nên các bạn có thể khó theo dõi. nhưng hãy cố gắng hiểu ý tưởng để có thể tự code.