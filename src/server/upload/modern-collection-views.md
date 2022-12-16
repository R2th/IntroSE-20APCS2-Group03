- Trong thời quan 2 năm từ iOS13-iOS14 chúng ta đã thấy một số thay đổi đến từ Apple về `UICollectionView` và các `type` liên quan đến nó. Không những `API` mới được giới thiệu mà một số các `concept`, khái niệm đã từng được sử dụng để `build` `collectionview` đã được thay đổi và cập nhập theo các mô hình `programming` mới. Ở bài viết này chúng ta sẽ cumgf tìm hiểu các mô hình mới để hiểu thêm các `collection` này hoạt động ra sao.

## 1: Diffable data sources:

- Một trong những vấn đề chúng ta thường gặp lúc làm việc với `collection view` trên hệ thống từ trước `iOS13` đến từ các trường hợp trong thực tế  khi tất cả các cập nhật cần phải được triển khai thủ công bởi các `developer`( như cách sử dụng `performBatchUpdates`). Cách triển khai thủ công trên thường gây ra `crash` app khi mà các `update` kết thức không đông thời với các `data model` đang được sử dụng.

- Sử dụng `UICollectionViewDiffableDataSource` đồng nghĩa với việc chúng ta sẽ cho `class` đó tính toán sự thay đổi trạng thái của `collection view` và tự động thay đổi `update` các thay đổi cần thiết cho việc hiển thị `data`.

- Chúng ta lấy ví dụ về `ProductListViewController` hiển thị các `product`. Để `viewcontroller` sử dụng `DiffableDataSource` thì đầu tiên chúng ta phải khởi tạo một `cellProvider` `closure` để chuyển các `indexPath` cho `UICollectionViewCell` như sau:


```swift
private extension ProductListViewController {
    func makeDataSource() -> UICollectionViewDiffableDataSource<Section, Product> {
        UICollectionViewDiffableDataSource(
            collectionView: collectionView,
            cellProvider: { collectionView, indexPath, product in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: Self.cellReuseID,
                    for: indexPath
                ) as! ListCollectionViewCell

                cell.textLabel.text = product.name
                ...

                return cell
            }
        )
    }
}
```

- Sử dụng `Swift strong type` như cách trên vừa đảm bảo `type safe` cho các `model data` cũng như cho phép chúng ta có thể `custom` các type `Hashable` định nghĩa cho các `Section` thay vì luôn sử dụng `Int`:

```swift
private extension ProductListViewController {
    enum Section: Int, CaseIterable {
        case featured
        case onSale
        case all
    }
}
```

- Điều cần làm bây giờ là chúng ta cần `assign` `data` cho `collection view` như cách chúng ta đã sử dụng trước đó:

```swift
class ProductListViewController: UIViewController {
    private static let cellReuseID = "product-cell"

    private lazy var collectionView = makeCollectionView()
    private lazy var dataSource = makeDataSource()
    
    ...

    override func viewDidLoad() {
        super.viewDidLoad()

        // Registering our cell class with the collection view
        // and assigning our diffable data source to it:
        collectionView.register(ListCollectionViewCell.self,
            forCellWithReuseIdentifier: Self.cellReuseID
        )
        collectionView.dataSource = dataSource
        ...
    }
    
    ...
}
```

- Khi các `data model` đã được `update` chúng ta cần thêm `describe` các state của `current view` cho `dataSource` để các `cell` có thể tự động theo dõi và `update` khi cần.

- Chúng ta sẽ sử dụng khái niệm `snapshop` cho các `section` đã được định nghĩa và update cho từng `section` từ `data model`. Cuối cùng chúng ta sử dụng `snapshot` cho `dataSource` bằng cách cập nhật `collection view` sau khi so sánh sự thay đổi trước đó:

``` swift
private extension ProductListViewController {
    func productListDidLoad(_ list: ProductList) {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Product>()
        snapshot.appendSections(Section.allCases)

        snapshot.appendItems(list.featured, toSection: .featured)
        snapshot.appendItems(list.onSale, toSection: .onSale)
        snapshot.appendItems(list.all, toSection: .all)

        dataSource.apply(snapshot)
    }
}
```

- Nên lưu ý ở đây là chúng ta đang chuyển model `Product` trực tiếp cho `dataSource` bằng cách `confirm` `Hashable`. Cách làm trên có vấn đề nếu chúng ta có  `data model` không thể `confirm` các `protocol` trên nên chúng ta có thể chuyển một số định dạng cho `dataSource` và sau đó sẽ tiến hành cho các `model` hoàn chỉnh trong `cellProvider` closure.

## 2: Cell registrations:

- `Cell registrations` là một `concept` mới trong `iOS14` cho pháp chúng ta có thể định danh việc sử dụng subclass `UICollectionViewCell` cũng như hỗ trợ cách chúng ta tùy chỉnh `collectionview cell` với các object phức tạp. Chúng ta sẽ không cần nhớ tới việc phải khai báo chính các các loại `cell` cho công việc `reuse identifier` và các cell sẽ không cần `type casting`.

- Chúng ta sẽ sử dụng `API` mới để `implement` việc `registration` và `configuration` cho `collectionview cell` với `ProductListViewController` như sau:

```swift
private extension ProductListViewController {
    typealias Cell = ListCollectionViewCell
    typealias CellRegistration = UICollectionView.CellRegistration<Cell, Product>

    func makeCellRegistration() -> CellRegistration {
        CellRegistration { cell, indexPath, product in
            cell.textLabel.text = product.name
            ...
        }
    }
}
```

- Chúng ta có thể xem lại method `makeDataSource`  và thay đổi `cellProvider` như sau:

```swift
private extension ProductListViewController {
    func makeDataSource() -> UICollectionViewDiffableDataSource<Section, Product> {
        let cellRegistration = makeCellRegistration()

        return UICollectionViewDiffableDataSource(
            collectionView: collectionView,
            cellProvider: { collectionView, indexPath, product in
                collectionView.dequeueConfiguredReusableCell(
                    using: cellRegistration,
                    for: indexPath,
                    item: product
                )
            }
        )
    }
}
```

- Chúng ta vừa cải thiện đáng kể đoạn `code` trước đó với `cellProvider` closure đảm nhận trực tiếp việc cell `registration`. Chúng ta sẽ cần thêm một `extension` ở đây:

```swift
extension UICollectionView.CellRegistration {
    var cellProvider: (UICollectionView, IndexPath, Item) -> Cell {
        return { collectionView, indexPath, product in
            collectionView.dequeueConfiguredReusableCell(
                using: self,
                for: indexPath,
                item: product
            )
        }
    }
}
```

- Với `extension` trên chúng ta đã giảm số dòng code trên như sau:

```swift
private extension ProductListViewController {
    func makeDataSource() -> UICollectionViewDiffableDataSource<Section, Product> {
        UICollectionViewDiffableDataSource(
            collectionView: collectionView,
            cellProvider: makeCellRegistration().cellProvider
        )
    }
}
```

## 3: Compositional layouts:

- Trước `iOS13` chúng ta có 2 cách lựa chọn để tùy chỉnh layout cho `UICollectionView`. Cách đầu tiên là sử dụng `UICollectionViewFlowLayout` và chúng ta sẽ cùng thực hiện từ những bước đầu tiên cho lựa chọn này:

- Chúng ta cần định nghĩa rõ cho các `compositional layout` bao gồm: items, groups, sections. Item cho việc `layout` các `cell`, group cho việc layout các cell với nhau và các sectionsex bao gồm các section cho `collectionview`.

- Chúng ta muốn `layout` cho các product list view với các `featured` và `onSale` section đang sử sựng 2 `column grid` trong khi các section đang sử dụng `full-width`:

``` swift
private extension ProductListViewController {
    func makeGridLayoutSection() -> NSCollectionLayoutSection {
        // Each item will take up half of the width of the group
        // that contains it, as well as the entire available height:
        let item = NSCollectionLayoutItem(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(0.5),
            heightDimension: .fractionalHeight(1)
        ))

        // Each group will then take up the entire available
        // width, and set its height to half of that width, to
        // make each item square-shaped:
        let group = NSCollectionLayoutGroup.horizontal(
            layoutSize: NSCollectionLayoutSize(
                widthDimension: .fractionalWidth(1),
                heightDimension: .fractionalWidth(0.5)
            ),
            subitem: item,
            count: 2
        )

        return NSCollectionLayoutSection(group: group)
    }
}
```

- Điểm mạnh của `compositional layout` là chúng ta có thể sử dụng nhiều layout cho trong một `viewcontroller` cũng như có thể `describe` `layout` mong muốn của chúng ta sử dụng `fractional values`:

```swift
private extension ProductListViewController {
    func makeListLayoutSection() -> NSCollectionLayoutSection {
        // Here, each item completely fills its parent group:
        let item = NSCollectionLayoutItem(layoutSize: NSCollectionLayoutSize(
            widthDimension: .fractionalWidth(1),
            heightDimension: .fractionalHeight(1)
        ))
    
        // Each group then contains just a single item, and fills
        // the entire available width, while defining a fixed
        // height of 50 points:
        let group = NSCollectionLayoutGroup.vertical(
            layoutSize: NSCollectionLayoutSize(
                widthDimension: .fractionalWidth(1),
                heightDimension: .absolute(50)
            ),
            subitems: [item]
        )

        return NSCollectionLayoutSection(group: group)
    }
}
```

- Để tối ưu đoạn code trên chúng ta sẽ sử dụng `NSCollectionLayoutSection` để lấy section index theo dạng `Int`:

```swift
private extension ProductListViewController {
    func makeCollectionViewLayout() -> UICollectionViewLayout {
        UICollectionViewCompositionalLayout {
            [weak self] sectionIndex, _ in
            
            switch Section(rawValue: sectionIndex) {
            case .featured, .onSale:
                return self?.makeGridLayoutSection()
            case .all:
                return self?.makeListLayoutSection()
            case nil:
                return nil
            }
        }
    }
}
```

- Điều cuối cùng chúng ta cần làm là `inject` đoạn code trên mỗi khi `collectionView` được khởi tao:

```swift
private extension ProductListViewController {
    func makeCollectionView() -> UICollectionView {
        UICollectionView(
            frame: .zero,
            collectionViewLayout: makeCollectionViewLayout()
        )
    }
}
```

## 4: List views and content configurations:

- Ở `iOS14` chúng ta hoàn toàn có thể build `table view` bằng cách sử dụng `UICollectionView`. Để render các section chúng ta đơn giản có thể sử dụng các định nghĩa `list` trước đó thay vì tự tạo riêng:

```swift
private extension ProductListViewController {
    func makeCollectionViewLayout() -> UICollectionViewLayout {
        UICollectionViewCompositionalLayout {
            [weak self] sectionIndex, environment in

            switch Section(rawValue: sectionIndex) {
            case .featured, .onSale:
                return self?.makeGridLayoutSection()
            case .all:
                // Creating our table view-like list layout using
                // a given appearence. Here we simply use 'plain':
                return .list(
                    using: UICollectionLayoutListConfiguration(
                        appearance: .plain
                    ),
                    layoutEnvironment: environment
                )
            case nil:
                return nil
            }
        }
    }
}
```

- Đoạn code trên đã khá tối ưu, chúng ta không cần phải viết các `custom layout` code nữa mà chỉ cần sử dụng lại `insetGroup` để có các `layout` mong muốn:

```swift
private extension ProductListViewController {
    func makeCollectionView() -> UICollectionView {
        let layout = UICollectionViewCompositionalLayout.list(
            using: UICollectionLayoutListConfiguration(
                appearance: .insetGrouped
            )
        )
        
        return UICollectionView(
            frame: .zero,
            collectionViewLayout: layout
        )
    }
}
```

- Chúng ta cũng có thể tạo và sử dụng `type``UICollectionViewListCell` như một cách `copy` theo `UITableViewCell` để có thể render các `text`, `image` cũng như các `accesories` như `indicator`. `makeCellRegistration` method có thể được tùy chình để chúng ta sử dụng như sau:

```swift
private extension ProductListViewController {
    typealias Cell = UICollectionViewListCell
    typealias CellRegistration = UICollectionView.CellRegistration<Cell, Product>

    func makeCellRegistration() -> CellRegistration {
        CellRegistration { cell, indexPath, product in
            var config = cell.defaultContentConfiguration()
            config.text = product.name
            ...
            cell.contentConfiguration = config

            cell.accessories = [.disclosureIndicator()]
        }
    }
}
```