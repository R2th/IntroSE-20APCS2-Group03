## Mục tiêu:
Trong phần này, sẽ nói về việc thay đổi kích thước các cell bằng cách sử dụng Custom View Layout và giải thích việc thay đổi kích thước chiều cao của các cell trong UICollectionView ví dụng như chiều cao của văn bản hay hình ảnh trong cell. Đối với ảnh thì đơn giản chúng ta có thể nhận biết chiều cao của ảnh nhưng ngược lại với văn bản còn phụ thuộc vào font, số lượng khoảng trắng trong một dòng, căn lề .. vì vậy cần đến customLayout để làm việc này. 
## Creating Custom Collection View Layouts
Tạo một lớp AdaptiveCollectionLayout UICollectionViewLayout Type trong ViewController của bạn, khai báo protocol AdaptiveCollectionLayoutDelegate một phương thức để yêu cầu chiều cao của cell.
Tạo thêm một phần Config  các thuộc tính 
```import UIKit
struct AdaptiveCollectionConfig {
    static let bannerHeight: CGFloat = 120
    static let placeholderHeight: CGFloat = 210
    static var cellBaseHeight: CGFloat {
        //detect padding/height thiết bị dưới iphone6
        return UIDevice.isPhoneSE ? 190 : 210
    }
    static let numberOfColumns = 2
    static var cellPadding: CGFloat {
        return UIDevice.isPhoneSE ? 4 : 8
    }
}

extension UIDevice {
    
    static var isPhoneSE: Bool {
        let screenWidth = UIScreen.main.bounds.width
        return screenWidth == 320
    }
}
```

## Core Layout Process
![](https://images.viblo.asia/c374949a-e001-4b28-a8d2-e94bd00cbc1d.png)

CollectionViewContentSize: Phương thức này trả về chiều rộng và chiều cao của đối tượng trong colectionView.

Bạn phải override, sau đó trả về chiều cao và chiều rộng của toàn bộ đối tượng trong colectionView. 
Collection view sử dụng thông tin này để set kích thước nội dung khi scrollView.

prepare(): Phương thức này được gọi bất cứ khi layout lúc này tích toán kích thước.

layoutAttributesForElements(in:): Trong phương thức này, bạn cần trả về các thuộc tính layout cho tất cả các đối tượng trong hình chữ nhật đã cho. Bạn trả lại các thuộc tính cho colectionView dưới dạng một mảng UICollectionViewLayoutAttributes.

layoutAttributesForItem(at:): Phương pháp này cung cấp thông tin sắp xếp theo yêu cầu cho collectiview. Bạn cần override nó và trả về các layout attributes theo indexPath.

![](https://images.viblo.asia/0219e8e8-d19f-4931-8bd7-bd25a8e9f61f.png)

Ở khúc này tính toán frame của các đối tượng dựa vào column chứa nó (được theo dõi bởi xOffset) và vị trí của  đối tượng trước đó trong cùng một column (được theo dõi bởi yOffset).
Để tính toán vị trí nằm ngang, sử dụng tọa độ X bắt đầu của column mà thuộc về đối tượng  sau đó thêm phần padding . Vị trí chiều dọc là vị trí bắt đầu của đối tượng trước trong column đó, cộng với chiều cao của đối tượng trước đó. Chiều cao tổng thể của đối tượng là tổng chiều cao của hình ảnh và phần padding của nội dung.
Làm trong đó hàm prepare(), nơi tính toán một ví dụ UICollectionViewLayoutAttributes:

```
import UIKit

protocol AdaptiveCollectionLayoutDelegate: class {
    // Khai báo một protocol để cung cấp chiều cao ô
    func collectionView(_ collectionView: UICollectionView, heightForTextAtIndexPath indexPath: IndexPath) -> CGFloat
}

class AdaptiveCollectionLayout: UICollectionViewLayout {

    weak var delegate: AdaptiveCollectionLayoutDelegate!
// Cache là mảng ma trận với ô tọa độ trong X, Y
     // Nó sẽ cung cấp tọa độ cho ô hiển thị cho UIKit
     // Chúng ta có thể thay đổi nó, như cách chúng ta muốn
    fileprivate var cache = [UICollectionViewLayoutAttributes]()
// Xác định chiều cao của nội dung sau vòng lặp đầu tiên
     // Tăng khi cell nội dung được thêm vào
    fileprivate var contentHeight: CGFloat = 0

    fileprivate var contentWidth: CGFloat {
        guard let collectionView = collectionView else {
            return 0
        }
        let insets = collectionView.contentInset
        return collectionView.bounds.width - (insets.left + insets.right)
    }
    // Method to return trả về kích thước của collectionView
    override var collectionViewContentSize: CGSize {
        return CGSize(width: contentWidth, height: contentHeight)
    }

    override func prepare() {
        super.prepare()
        // cần clear cache khi layout ko hợp lệ
        self.cache.removeAll()

        guard cache.isEmpty, let collectionView = collectionView else {
            return
        }
        // nếu có 2 section tạo các phần tử đầu tiên và lấy phần bù đó và gọi lại
        // ví dụ section đầu tiên là "onboarding"
        if collectionView.numberOfSections > 1 {
            let lastSection = collectionView.numberOfSections - 1
            let yOffset = prepareForMain(collectionView: collectionView, section: 0, numberOfColumns: 1)
            let _ = prepareForMain(collectionView: collectionView, section: lastSection, numberOfColumns: AdaptiveCollectionConfig.numberOfColumns, inYOffset: yOffset)
        } else {
            let _ = prepareForMain(collectionView: collectionView, section: 0, numberOfColumns: AdaptiveCollectionConfig.numberOfColumns)
        }
    }

    func prepareForMain(collectionView: UICollectionView, section: Int, numberOfColumns: Int, inYOffset: CGFloat? = nil) -> CGFloat? {

        let columnWidth = contentWidth / CGFloat(numberOfColumns)
        var xOffset = [CGFloat]()
        for column in 0..<numberOfColumns {
            xOffset.append(CGFloat(column) * columnWidth)
        }
        var column = 0
        var yOffset = [CGFloat](repeating: 0, count: numberOfColumns)

        if let inYOff = inYOffset {
            for index in 0..<numberOfColumns {
                yOffset[index] = inYOff
            }
        }

        for item in 0..<collectionView.numberOfItems(inSection: section) {

            let indexPath = IndexPath(item: item, section: section)

            let descriptionHeight = delegate.collectionView(collectionView, heightForTextAtIndexPath: indexPath)
            let height = AdaptiveCollectionConfig.cellPadding * 2 + descriptionHeight
            let frame = CGRect(x: xOffset[column], y: yOffset[column], width: columnWidth, height: height)
            let insetFrame = frame.insetBy(
                dx: AdaptiveCollectionConfig.cellPadding,
                dy: AdaptiveCollectionConfig.cellPadding)

            let attributes = UICollectionViewLayoutAttributes(forCellWith: indexPath)
            attributes.frame = insetFrame
            cache.append(attributes)

            contentHeight = max(contentHeight, frame.maxY)
            yOffset[column] = yOffset[column] + height

            column = column < (numberOfColumns - 1) ? (column + 1) : 0
        }
        return yOffset.last
    }
    // Here you simply retrieve and return from cache the layout attributes which correspond to the requested indexPath
    override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
        return cache[indexPath.item]
    }

    // Determine which items are visible in the given rect.
    override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {

        var visibleLayoutAttributes = [UICollectionViewLayoutAttributes]()

        // Loop through the cache and look for items in the rect
        for attributes in cache {
            if attributes.frame.intersects(rect) {
                visibleLayoutAttributes.append(attributes)
            }
        }
        return visibleLayoutAttributes
    }
}
```

```
extension MyCollectionAdapter: AdaptiveCollectionLayoutDelegate {
    
    func collectionView(_ collectionView: UICollectionView,
                        heightForTextAtIndexPath indexPath: IndexPath) -> CGFloat {
        if (indexPath.section == 0 && provider.isNeedToShowInfo) {
            // Trong trường hợp này sử dụng bannerHeight thay cho bannerHeight phần đầu tiên
            return AdaptiveCollectionConfig.bannerHeight
        } else if let _ = provider.items[indexPath.row] as? Bool {
                 // Trong trường hợp này tôi sử dụng placeholderHeight
            return AdaptiveCollectionConfig.placeholderHeight
        }
        
        let item = provider.items[indexPath.row] as! MyViewModel
        let textHeight = item.title.count
         // nhận được chiều cao văn bản và phông chữ bằng ~ 1pt,nhân lên và hơn thế nữa, bạn cần phải  sửa đổi giá trị đó để tính toán chiều cao ổn định lớn hơn.
        /// bạn có thể lấy chiều cao hình ảnh để thêm nó vào
        let extensionHeight = Double(textHeight) * 0.70
        // Ví dụ, khi bạn cần xóa chiều cao
        //let dateHeight: CGFloat = item.expiring == nil ? -12.5 : 0
        return AdaptiveCollectionConfig.cellBaseHeight + CGFloat(textHeight) + CGFloat(extensionHeight)
        //+ dateHeight
    }
}
```
![](https://images.viblo.asia/86b96a44-5206-4870-a4f7-5d6ad0fb7461.png)