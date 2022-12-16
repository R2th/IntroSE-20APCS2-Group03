- Trong năm nay  ở hội nghị WWDC của Apple đã giới thiệu các frameworks và các tính năng mới (Swift UI, Combine, RealityKit). Bên cạnh đó còn nhiều tính năng nhỏ mà hay mà bạn có thể áp dụng vào dự án hiện tại. Hôm nay mình xin giới thiệu về UICollectionViewCompositionalLayout.

- Khi mới bắt đầu học IOS, các bạn chắc chắn đã học những UI cơ bản như tableview, collecitonview. Nhưng khi làm dự án thực tế, khách hàng đòi hỏi UI  về tableview hay collectionview nâng cao và phức tạp hơn khi đấy các bạn lại đi tìm lib thư viện bên ngoài, hay các bạn làm một cái collection view cuộn ngang trong 1 cái collection cuộn dọc thì các bạn phải setup collectionview in trong collectionview khá là phức tạp  ? Đó là lý do năm nay Apple giới thiệu UICollectionViewCompositionalLayout.

**UICollectionViewCompositionalLayout** là một layout mới giúp chúng ta setup cách hiển thị trên mỗi item của UICollectionView.OK! Hãy bắt đầu vào code để hiểu rõ hơn nhé.
Đoạn code dưới sẽ tạo list các rows có cùng độ cạo :
```
private func createLayout() -> UICollectionViewLayout {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                             heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8)
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .absolute(50))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                         subitems: [item])

        let section = NSCollectionLayoutSection(group: group)

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
```
![](https://images.viblo.asia/e4449d46-f6d4-4857-9fef-0dd245f4d572.png)

## NSCollectionLayoutSize
Chúng ta dùng  **NSCollectionLayoutSize** để setup chiều rộng và chiều cao của Item in Layout.Nó dùng 2 biến **widthDimension** và **heightDimension** để setup trong quá trình init.
![](https://images.viblo.asia/7d6bc7e6-6743-44d0-8e59-6a03628b9823.png)

NSCollectionLayoutDimension có 4 thuộc tính.
![](https://images.viblo.asia/5eccaab8-0fb8-4f63-8ded-46642a4a3706.png)
Bạn có thể set giá trị cho các property **NSCollectionLayoutSize.widthDimension , NSCollectionLayoutDimension.fractionalHeight**. Ví dụ : NSCollectionLayoutSize.heightDimension = .fractionalWidth(0.5) nghĩa là độ cao của 1 item = 1 nửa độ rộng của group items.

**Estimated** nó tự động tính cell.Bạn chỉ làm 1 điều là set item và group với *heightDimension* là type *estimated*.Một hạn chế là bạn không thể set contentInsets cho từng phần tử.Nếu làm vậy thì xảy ra 1 warning.

Ở ví dụ dưới các layout item được tính toán tự động :
```
private func createLayout() -> UICollectionViewLayout {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                             heightDimension: .estimated(50))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.edgeSpacing = NSCollectionLayoutEdgeSpacing(leading: nil, top: .fixed(8), trailing: nil, bottom: .fixed(8))
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .estimated(50))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                         subitems: [item])

        let section = NSCollectionLayoutSection(group: group)

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
```

![](https://images.viblo.asia/2cf69326-1ef3-4327-9378-28f30042c66b.png)

## NSCollectionLayoutItem
NSCollectionLayoutItem nó làm nhiệm vụ setting item trong collection group, nó khởi tạo cùng với NSCollectionLayoutSize.Trong class NSCollectionLayoutItem có 2 biến giúp bạn setup contentInset và spacing.
```
open var contentInsets: NSDirectionalEdgeInsets
open var edgeSpacing: NSCollectionLayoutEdgeSpacing?
```
contentInsets sẽ làm việc theo cách sau: Đầu tiên nó sẽ tính vị trí và size cho từng element sau đó sẽ điều chỉnh lại size cho mỗi item.Chính vì vậy contentInsets sẽ bị bỏ qua khi dùng với thuộc tính **.estimated** dimension.

edgeSpacing: khoảng cách xung quanh item so  với thằng collection view và item khác.

Ngoài ra biến edgeSpacing có kiểu NSCollectionLayoutEdgeSpacing. Trong class NSCollectionLayoutEdgeSpacing có có 2 property:

**flexible**: Nó sẽ lấp đầy khoảng trống  trong 1 group.

**fixed**: sẽ set khoảng cách  với giá trị cụ thể so với item hoặc thằng collection cha.
![](https://images.viblo.asia/60eb1ac0-834b-43a2-9dcd-51b211253ea0.png)

Dưới đây là ví dụ  mình sẽ tạo layout cùng với *edgeSpacing*:
```
private func createLayout() -> UICollectionViewLayout {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.4),
                                              heightDimension: .fractionalHeight(1))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.edgeSpacing = NSCollectionLayoutEdgeSpacing(leading: .flexible(0), top: nil,
                                                         trailing: .flexible(16), bottom: nil)
        let itemSize2 = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.4),
                                              heightDimension: .fractionalHeight(1))
        let item2 = NSCollectionLayoutItem(layoutSize: itemSize2)
        item2.edgeSpacing = NSCollectionLayoutEdgeSpacing(leading: nil, top: nil,
                                                          trailing: .flexible(0), bottom: nil)

        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .absolute(60))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                         subitems: [item, item2])

        let section = NSCollectionLayoutSection(group: group)
        section.interGroupSpacing = 10

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
```

![](https://images.viblo.asia/0ad58c1b-9f31-49db-9dcc-9a87c68643f3.png)
## NSCollectionLayoutGroup
NSCollectionLayoutGroup extending NSCollectionLayoutItem. Nó thêm 1 tính năng rất quan trọng đó là bạn có thể thêm rất nhiều item nếu bạn muốn.Một Section phải có 1 group thì trong lúc rendering Layout thì draw group phụ thuộc số item chúng ta có trong datasource.Ví dụ chúng ta có 1 group và nó có 1 element, datasource sẽ "say": chúng ta có 10 item thì sẽ có 10 group được draw.Nếu chúng ta có 2 item trong 1 group thì sẽ có 5 group được draw. Các group có thể được hình dung như ngăn xếp, nó có thể dọc hoặc ngang, bạn có thể thêm 1 hoặc nhiều item.Nếu bạn muốn đặt các khoảng cách giữa các item bạn có thể dùng biến interItemSpacing.

![](https://images.viblo.asia/8cdcfdc9-fdcc-4cc8-85a8-90bf50f5685b.png)
```
open class func horizontal(layoutSize: NSCollectionLayoutSize, subitem: NSCollectionLayoutItem, count: Int) -> Self

    open class func horizontal(layoutSize: NSCollectionLayoutSize, subitems: [NSCollectionLayoutItem]) -> Self

    open class func vertical(layoutSize: NSCollectionLayoutSize, subitem: NSCollectionLayoutItem, count: Int) -> Self

    open class func vertical(layoutSize: NSCollectionLayoutSize, subitems: [NSCollectionLayoutItem]) -> Self

    open var interItemSpacing: NSCollectionLayoutSpacing?
```

**Điều quan trọng nữa** là bạn có thể đặt một group in group , giống như stack. Sử dụng tính năng thú vị này bạn có thể tạo ra layout khá phức tạp:
```

    private func createLayout() -> UICollectionViewLayout {
        let verticalItemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1),
                                                      heightDimension: .fractionalHeight(0.3))
        let verticalItem = NSCollectionLayoutItem(layoutSize: verticalItemSize)

        let verticalGroupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.25),
                                                       heightDimension: .fractionalHeight(1))
        let verticalGroup = NSCollectionLayoutGroup.vertical(layoutSize: verticalGroupSize,
                                                             subitem: verticalItem, count: 3)
        verticalGroup.interItemSpacing = .fixed(8)
        // ---------------------------------------------------------------------------------
        let horizontalItemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.25),
                                                      heightDimension: .fractionalHeight(1))
        let horizontalItem = NSCollectionLayoutItem(layoutSize: horizontalItemSize)
        let horizontalItemSize2 = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.4),
                                                      heightDimension: .fractionalHeight(1))
        let horizontalItem2 = NSCollectionLayoutItem(layoutSize: horizontalItemSize2)

        let horizontalGroupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1),
                                                    heightDimension: .fractionalHeight(0.3))
        let horizontalGroup = NSCollectionLayoutGroup.horizontal(layoutSize: horizontalGroupSize,
                                                             subitems: [horizontalItem, horizontalItem2, horizontalItem])
        let horizontalGroup2 = NSCollectionLayoutGroup.horizontal(layoutSize: horizontalGroupSize,
                                                                  subitems: [horizontalItem2, horizontalItem, horizontalItem])
        let horizontalGroup3 = NSCollectionLayoutGroup.horizontal(layoutSize: horizontalGroupSize,
                                                                  subitems: [horizontalItem, horizontalItem, horizontalItem2])
        horizontalGroup.interItemSpacing = .fixed(8)
        horizontalGroup2.interItemSpacing = .fixed(8)
        horizontalGroup3.interItemSpacing = .fixed(8)
        // ---------------------------------------------------------------------------------
        let horizontalsGroupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.75),
                                                       heightDimension: .fractionalHeight(1))
        let horizontalsGroup = NSCollectionLayoutGroup.vertical(layoutSize: horizontalsGroupSize,
                                                             subitems: [horizontalGroup, horizontalGroup2, horizontalGroup3])
        horizontalsGroup.interItemSpacing = .flexible(0)
        // ---------------------------------------------------------------------------------
        let finalGroupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                                    heightDimension: .fractionalHeight(0.5))
        let finalGroup = NSCollectionLayoutGroup.horizontal(layoutSize: finalGroupSize,
                                                            subitems: [horizontalsGroup, verticalGroup])

        let section = NSCollectionLayoutSection(group: finalGroup)
        section.interGroupSpacing = 8

        let layout = UICollectionViewCompositionalLayout(section: section)
        return layout
    }
```

![](https://images.viblo.asia/46f40a41-649b-4958-9a87-906ee658ee3f.png)

**NSCollectionLayoutSection**
Sau khi các bạn xem các ví dụ ở trên , chắc các bạn cũng hiểu Section là nới chứa 1  hoặc nhiều group. Một group là nơi chứa 1 hoặc nhiều item.Chúng ta có thêm spacing giữa các group và tất cả  content bằng các thuộc tính sau:
```
open var contentInsets: NSDirectionalEdgeInsets
 open var interGroupSpacing: CGFloat
```

Thêm vào đó chúng ta có 2 biến rất thú vị : 
```
open var orthogonalScrollingBehavior: UICollectionLayoutSectionOrthogonalScrollingBehavior
open var visibleItemsInvalidationHandler: NSCollectionLayoutSectionVisibleItemsInvalidationHandler?
public typealias NSCollectionLayoutSectionVisibleItemsInvalidationHandler = ([NSCollectionLayoutVisibleItem], CGPoint, NSCollectionLayoutEnvironment) -> Void

```
visibleItemsInvalidationHandler - đây là 1 closure  trước mỗi rendering cycle, bạn có thể dùng nó nếu bạn muốn biết những item đang được hiển thị trên màn hình và thay đổi layout của item đó.

orthogonalScrollingBehavior  - Với biến này bạn có đặt chế độ cuộn vào phần secsion cụ thể. Trước đây để 1 item  chứa list item trong collection view đang ở chế độ cuộn dọc có thể cuộn ngang thì các bạn hay custom collection view trong collection view, điều này khá là phức tạp và mất thời gian.Chúng ta có 5 hành vi  scroll khác nhau ở dưới đây :
```
// Standard scroll view behavior: UIScrollViewDecelerationRateNormal
    case continuous

    // Scrolling will come to rest on the leading edge of a group boundary
    case continuousGroupLeadingBoundary

    // Standard scroll view paging behavior (UIScrollViewDecelerationRateFast) with page size == extent of the collection view's bounds
    case paging

    // Fractional size paging behavior determined by the sections layout group's dimension
    case groupPaging

    // Same of group paging with additional leading and trailing content insets to center each group's contents along the orthogonal axis
    case groupPagingCentered
```
Đây là 1 tính năng rất tuyệt vời : 
```
private func listSection() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                             heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8)
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                              heightDimension: .absolute(50))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                         subitems: [item])

        return NSCollectionLayoutSection(group: group)
    }

    private func gridSection() -> NSCollectionLayoutSection {
        let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(0.3),
                                             heightDimension: .fractionalHeight(1.0))
        let item = NSCollectionLayoutItem(layoutSize: itemSize)
        item.contentInsets = NSDirectionalEdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8)
        let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                               heightDimension: .fractionalHeight(0.3))
        let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize,
                                                         subitem: item, count: 3)
        let section = NSCollectionLayoutSection(group: group)
        section.orthogonalScrollingBehavior = .continuous
        return section
    }

    private func createLayout() -> UICollectionViewLayout {
        return UICollectionViewCompositionalLayout { sectionNumber, env -> NSCollectionLayoutSection? in
            switch Section(rawValue: sectionNumber) {
            case .main:
                return self.listSection()
            case .second:
                return self.gridSection()
            default:
                return nil
            }
        }
    }
```

![](https://images.viblo.asia/a96a1e32-032f-4f5a-a929-f96deab7ed0c.gif)

## UICollectionViewCompositionalLayout
UICollectionViewCompositionalLayout là main class , chúng ta có thể khởi tạo nó cùng với NSCollectionLayoutSection hoặc closure , closure này sẽ được goi khi mà layout cần thông tin của section , ở đây các bạn có thể setup các hành vi khác nhau cho các section  khác nhau  tuỳ thuộc vào container size  và trait collection, portrait và  landscape type.
Dùng UICollectionViewCompositionalLayoutConfiguration bạn có thể đặt hướng scroll và khoảng cách giữa các secsion.
```
// UICollectionViewCompositionalLayout.swift 

 public init(section: NSCollectionLayoutSection)

    public init(section: NSCollectionLayoutSection, configuration: UICollectionViewCompositionalLayoutConfiguration)


    public typealias UICollectionViewCompositionalLayoutSectionProvider = (Int, NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection?  
  
    public init(sectionProvider: @escaping UICollectionViewCompositionalLayoutSectionProvider)

    public init(sectionProvider: @escaping UICollectionViewCompositionalLayoutSectionProvider, configuration: UICollectionViewCompositionalLayoutConfiguration)

```

OK phần UICollectionViewCompositionalLayout còn rất dài các bạn có thể tìm hiểu tiếp nhé, mình sẽ để source code ở bên dưới cho các bạn tham khảo. 

## Tài liệu tham khảo:
[Sourcode](https://github.com/IceFloe/UICollectionViewCompositionalLayout)

https://medium.com/flawless-app-stories/all-what-you-need-to-know-about-uicollectionviewcompositionallayout-f3b2f590bdbe