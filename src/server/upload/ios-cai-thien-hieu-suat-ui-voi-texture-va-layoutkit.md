Đối với một lập trình viên iOS, UIKit luôn là sự lựa chọn hiển nhiên khi tạo giao diện, bố cục cho ứng dụng iOS. Nó được cung cấp bởi chính Apple nên chúng ta không cần phải nghi ngờ về tính ổn định và mượt mà của nó. Tuy nhiên, khi giao diện của bạn trở nên phức tạp, khi bạn cần tạo tableView hoặc collectionView với nhiều hình ảnh và hiệu ứng. Thật khó để đạt được 60 FPS, ngay cả trên các thiết bị mới nhất với cấu hình khủng, khi người dùng cuộn rất nhanh. Bài viết này sẽ giới thiệu cho bạn một giải pháp cho vấn đề trên!

Texture (trước đây là AsyncDisplayKit) và LayoutKit là hai thư viện được cung cấp bởi bên thứ ba, chúng giúp cho việc tạo giao diện trở nên gọn nhẹ và mượt mà. Cả hai đều cho phép bạn xử lý giải mã hình ảnh, tăng giảm kích cỡ và render văn bản, hình ảnh, bố cục và các tác vụ giao diện nặng nề khác không nằm trên Main thread, để giữ cho Main thread luôn sẵn sàng phản hồi tương tác của người dùng. Mặt khác, chúng cho phép loại bỏ Auto Layout bên trong nghĩa là: trong hệ thống views phức tạp của scrollView, vì chúng không đủ hiệu suất trong hầu hết các trường hợp và đạt được hiệu suất layout tốt như khi sử dụng bố cục thủ công.

Nhìn chung, cả 2 thư viện trên đều tuyệt vời như nhau và giúp bạn tạo ra giao diện phức tạp với hiệu suất cao. Chúng ta cùng thử xem chúng hoạt động như nào nhé:

## Đặt vấn đề

Chúng ta sẽ khởi tạo một collectionView với 200 ô vuông để hiển thị cùng một hình ảnh. Để làm cho nó một chút khó khăn hơn, đó là ImageDelayer sẽ trả về một UIImage sau khi Main thread delay trong khoảng 0,0 và 0,01 giây.

```
final class ImageDelayer {
    
    private let group = DispatchGroup()
    private let queue = DispatchQueue(label: "delayer", attributes: .concurrent)
    
    func getDelayedImage() -> UIImage {
        let timeout: TimeInterval = Double(arc4random_uniform(11)) / 1000
        
        group.enter()
        
        queue.asyncAfter(deadline: .now() + timeout) {
            self.group.leave()
        }
        
        _ = group.wait(timeout: .distantFuture)
        
        return UIImage(named: "apple")!
    }
}
```

Lưu ý: Đoạn code trên không hiệu quả, nhưng nó không phải là mục đích của nó. Đó là đoạn code ngắn nhất có thể mô phỏng các tính toán phức tạp đòi hỏi Main thread phải được thực thi.

## UIKit

Đoạn code đơn giản như sau:

```
final class UIKitViewController: UICollectionViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let layout = collectionView!.collectionViewLayout as! UICollectionViewFlowLayout
        let size = floor(collectionView!.frame.width / 4)
        layout.itemSize = CGSize(width: size, height: size)
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 0
    }
    
    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 200
    }
    
    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath) as! UIKitCollectionViewCell
        cell.imageView.image = ImageDelayer().getDelayedImage()
        return cell
    }
}

final class UIKitCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var imageView: UIImageView!
}
```

Thực sự rất dễ phải không nào! Tuy nhiên hiệu suất của nó mới là vấn đề đáng nói. Khi chúng ta scroll nhanh thì chúng chỉ đạt trung bình 40 FPS (trên iPhone 8, iOS 12), còn khá xa so với mức hoàn hảo 60 FPS.

## Texture

Trước đây AsyncDisplayKit được phát triển bởi Facebook, hiện nay nó được đổi tên thành Texture và được tiếp tục phát triển bởi TextureGroup/Pinterest. Chúng ta có thể dễ dàng nhận ra ứng dụng Facebook và Pinterest, hai trong số những mạng xã hội lớn nhất thế giới, luôn cung cấp cho người dùng sự trải nghiệm tốt đến thế nào. Đó là do Texture đã chuyển tất cả các hoạt động xử lý giao diện người dùng nặng nề sang background threads, nhưng theo một cách thông minh - vì vậy bạn sẽ không thấy các cảnh báo từ Xcode khi Runtime. Thêm vào đó, Texture sử dụng layout bằng frame thay vì Auto Layout, vì nó nhanh hơn đáng kể.

Nó sử dụng generic ASViewController và nhiều đối tượng tiền tố AS để thực hiện quá trình chuyển đổi. Đoạn code bằng Texture sẽ như sau:

```
final class TextureViewController: ASViewController, ASCollectionDataSource, ASCollectionDelegate {
    
    let flowLayout: UICollectionViewFlowLayout
    let collectionNode: ASCollectionNode
    
    init() {
        flowLayout = UICollectionViewFlowLayout()
        collectionNode = ASCollectionNode(collectionViewLayout: flowLayout)
        
        super.init(node: collectionNode)
        
        collectionNode.delegate = self
        collectionNode.dataSource = self
    }
    
    @available(*, unavailable)
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let size = floor(collectionNode.frame.width / 4)
        flowLayout.itemSize = CGSize(width: size, height: size)
        flowLayout.minimumInteritemSpacing = 0
        flowLayout.minimumLineSpacing = 0
    }
    
    func numberOfSections(in collectionNode: ASCollectionNode) -> Int {
        return 1
    }
    
    func collectionNode(_ collectionNode: ASCollectionNode, numberOfItemsInSection section: Int) -> Int {
        return 200
    }
    
    func collectionNode(_ collectionNode: ASCollectionNode, nodeBlockForItemAt indexPath: IndexPath) -> ASCellNodeBlock {
        return { () -> ASCellNode in
            let cellNode = TextureCollectionViewCell()
            cellNode.imageView.image = ImageDelayer().getDelayedImage()
            return cellNode
        }
    }
}

final class TextureCollectionViewCell: ASCellNode {
    
    let imageView = ASImageNode()
    
    override init() {
        super.init()
        imageView.contentMode = .scaleAspectFill
        addSubnode(imageView)
    }
    
    override func layoutSpecThatFits(_ constrainedSize: ASSizeRange) -> ASLayoutSpec {
        return ASWrapperLayoutSpec(layoutElement: imageView)
    }
}
```

Nó cũng khá là dễ đọc, cho dù đây là lần đầu tiên bạn biết đến Texture phải không nào. Phần thú vị nhất ở trên chính là collectionNode (_: nodeBlockForItemAt:), nó trả về một closure thực thi bất đồng bộ và điều này làm cho Texture trở nên mượt mà.

## LayoutKit

Cú pháp LayoutKit cũng không quá khó hiểu. Như đoạn code dưới đây:

```
final class LayoutKitViewController: UICollectionViewController {
    
    private var reloadableViewLayoutAdapter: ReloadableViewLayoutAdapter!
    private var cachedItems: [Layout]?
    
    convenience init() {
        self.init(collectionViewLayout: UICollectionViewFlowLayout())
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView?.backgroundColor = .white
        let layout = collectionView!.collectionViewLayout as! UICollectionViewFlowLayout
        layout.minimumInteritemSpacing = 0
        layout.minimumLineSpacing = 0
        
        reloadableViewLayoutAdapter = ReloadableViewLayoutAdapter(reloadableView: collectionView!)
        collectionView?.delegate = reloadableViewLayoutAdapter
        collectionView?.dataSource = reloadableViewLayoutAdapter
        
        layoutFeed(width: collectionView!.frame.width, synchronous: false)
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        layoutFeed(width: size.width, synchronous: true)
    }
    
    private func layoutFeed(width: CGFloat, synchronous: Bool) {
        let size = floor(collectionView!.frame.width / 4)
        reloadableViewLayoutAdapter.reload(synchronous: synchronous) { [weak self] in
            return [Section(header: nil, items: self?.getItems(size: size) ?? [], footer: nil)]
        }
    }
    
    private func getItems(size: CGFloat) -> [Layout] {
        if let cachedItems = cachedItems {
            return cachedItems
        }
        
        let cell = LayoutKitCollectionViewCellLayout(image: ImageDelayer().getDelayedImage(),
                                                     size: CGSize(width: size, height: size))
        let items = [Layout](repeating: cell, count: 200)
        cachedItems = items
        return items
    }
}

final class LayoutKitCollectionViewCellLayout: SizeLayout {
    init(image: UIImage, size: CGSize) {
        let imageView = SizeLayout(size: size, viewReuseId: "imageView") {
            $0.image = image
            $0.contentMode = .scaleAspectFill
            $0.clipsToBounds = true
        }
        super.init(alignment: .fill,
                   viewReuseId: "cell",
                   sublayout: imageView)
    }
}
```

LayoutKit, cũng giống như Texture, không chỉ tính toán layout trên background threads. Nó cũng loại bỏ Auto Layout và sử dụng hệ thống frame, tương tự như tạo nó theo cách riêng của bạn, khi nói đến hiệu suất, nhưng dễ bảo trì hơn, đặc biệt là với các thiết bị khác nhau.

## Kết quả

Bạn có thể xem video kết quả: [tại đây](https://play.vidyard.com/BJiVcLVcP1tcqBpLFE4fD3)

Như bạn có thể thấy ở video trên, cả Texture và LayoutKit đều nhanh hơn đáng kể so với UIKit. Ứng dụng demo sử dụng WatchdogInspector để hiển thị FPS hiện tại ở trên cùng. iPhone 8 với iOS 12 được khoảng 30-40 FPS với UIKit khi cuộn, nhưng luôn dễ dàng đạt được 60 FPS với Texture và LayoutKit.
Cũng phải nói rằng, Texture và LayoutKit không phải là hai lựa chọn duy nhất để thay thế UIKit tạo tạo giao diện. Ngoài ra còn có các giải pháp như Yoga của Facebook, FlexLayout, PinLayout và một chút khác biệt - Schibsted's Layout, phụ thuộc vào các tệp XML và cho phép tải lại trực tiếp.
Hy vọng bài viết trên sẽ giúp các bạn có thêm một cách tiếp cận khác cho việc tạo UI, và cải thiện đáng kể trải nghiệm cho người dùng.

Bài viết được dịch từ nguồn: https://www.netguru.co/codestories/layout-libraries-for-ios-uikit-is-not-the-only-one