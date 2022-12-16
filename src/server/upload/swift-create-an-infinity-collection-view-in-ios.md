## Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 11.3.1
- **Deployment Target:** 12.0

## Bước 1:  Khởi tạo đối tượng và thuộc tính
Đầu tiên, ta sẽ khởi tạo **CollectionView** và một số thuộc tính cần thiết:

```
@IBOutlet private weak var dishesCollectionView: UICollectionView!
private var bannerItems: [String] = []
private let kCollectionViewNumberOfSets: Int = 4
private let kCollectionViewLineSpacing: CGFloat = 4.0
private let kNumberOfBanners: Int = 6
```

- **dishesCollectionView**: Đối tượng collection view với kiểu custom **InfinityCollectionView**.
- **bannerItems**: array kiểu string bao gồm tên các banners.
- **kCollectionViewNumberOfSets**: Thuộc tính kiểu Int biểu thị số lượng set các banners.
- **kCollectionViewLineSpacing**: Thuộc tính kiểu CGFloat biểu thị khoảng cách giữa các child view trong collection view.
- **kNumberOfBanners**: Thuộc tính kiểu Int biểu thị số lượng banners.

Tiếp theo, ta khởi tạo dữ liệu cho **bannerItems** và setting các thuộc tính và custom collection view's layout
```
private func config() {
    for n in 1...kNumberOfBanners {
        bannerItems.append("login_scroller_\(n)_Normal")
    }

    let layout = UICollectionViewFlowLayout()
    layout.minimumLineSpacing = kCollectionViewLineSpacing
    layout.scrollDirection = .horizontal
    let widthContent = UIScreen.main.bounds.width
    layout.itemSize = CGSize(width: widthContent, height: widthContent)
    dishesCollectionView.collectionViewLayout = layout

    dishesCollectionView.dataSource = self
    dishesCollectionView.showsVerticalScrollIndicator = false
    dishesCollectionView.showsHorizontalScrollIndicator = false
    dishesCollectionView.scrollsToTop = false
}
```


## Bước 2: Khởi tạo InfinityCollectionView
**Ý tưởng**: Ta sẽ tính lại giá trị **contentOffset** của collectionView sau mỗi lần scroll qua một set banners. 
```
class InfinityCollectionView: UICollectionView {
    var numberOfSets: Int!

    override func layoutSubviews() {
        super.layoutSubviews()
        let centerOffsetX = self.contentSize.width / 2.0
        let distanceX = abs(self.contentOffset.x - centerOffsetX) // convert absolute value
        if let flowLayout = self.collectionViewLayout as? UICollectionViewFlowLayout {
            let oneSetWidth = (self.contentSize.width + flowLayout.minimumLineSpacing) / CGFloat(numberOfSets)
            if (distanceX > oneSetWidth) {
                // When one set has been scrolled, it returns to original position
                // fmodf = num1 - integerValue * num2
                let offset = fmodf(Float(self.contentOffset.x - centerOffsetX), Float(oneSetWidth))
                self.contentOffset = CGPoint(x: centerOffsetX + CGFloat(offset), y: self.contentOffset.y)
            }
        }
        self.layoutIfNeeded()
    }
}
```
Một số thuộc tính và hàm cần lưu ý:
- **numberOfSets**: Thuộc tính kiểu Int biểu thị số lượng set các banners.
- **centerOffsetX**: Vị trí trung tâm trên trục X của **contentOffset** thuộc collectionView. Bạn có thể tìm hiểu thêm về thuộc tính **contentOffset** của collectionView trong bài viết này  ([Link](https://viblo.asia/p/swift-contentoffset-contentinset-and-contentsize-in-ui-scrollview-Qbq5Q0nElD8)).
- **oneSetWidth**: Độ rộng của một set các banners = độ rộng của items trong một set + khoảng cách giữa các item. 
- **contentSize.width**: Độ rộng của content collection view, bao gồm độ rộng của **n** item trong collection view + **(n-1)** khoảng cách giữa các item.
 - Hàm [fmodf](https://vietjack.com/thu-vien-c/ham-fmod-trong-c.jsp)

Ở đây mình sẽ giải thích về logic của phần code tương ứng.
Ta sẽ có 4 set banners với mỗi set gồm 6 banners.

![](https://images.viblo.asia/435563d0-c862-4337-9d11-f6661dfccdf5.png) 

**Lần 1:** Ngay sau khi khởi tạo collection view, hàm layoutSubviews() sẽ thực thi. Khi đó, ta sẽ có các giá trị tương ứng:
- contentOffset.x = 0 do lúc này phần nội dung hiển thị (visible area) của collection view đang ở vị trí ban đầu.
- **distanceX** = |contentOffsetX - centerOffsetX| = centerOffsetX
- **offset** = -centerOffsetX - (-1) * oneSetWidth  = oneSetWidth - centerOffsetX
- => **contentOffsetX mới** =  centerOffsetX + offset = centerOffsetX + oneSetWidth - centerOffset = oneSetWidth

Như vậy, vị trí hiển thị hiện tại là vị trí set thứ 2.
![](https://images.viblo.asia/ef10c080-988f-46b4-8323-a0190717fb37.png)


**Lần 2:** Kết thúc lần 1, sau khi giá trị **contentOffsetX** thay đổi, hàm **layoutIfNeeded()** sẽ cập nhật lại layout của collection view.
Khi đó, các giá trị tương ứng sẽ thay đổi theo:
- **distanceX** = |contentOffsetX - centerOffsetX| = centerOffsetX - oneSetWidth
- Vì **distanceX** < **oneSetWidth** => **contentOffset** không thay đổi

**Lần 3:** Giả sử người dùng vuốt từ trái sang phải đến vị trí **contentOffsetX** như hình dưới, khi đó ta sẽ có các giá trị tương ứng thay đổi như sau:

![](https://images.viblo.asia/60d4a568-9afa-4785-b29d-4c80a5bb91c7.png)

- **distanceX** = |contentOffsetX - centerOffsetX| = oneSetWidth + Δx
- Khi đó **distanceX** > **oneSetWidth** => giá trị offset = (contentOffsetX - centerOffsetX) - (1) * oneSetWidth = Δx
- => **contentOffsetX mới** = centerOffsetX + offset = centerOffsetX + Δx 

Như vậy, vị trí hiển thị mới hiện tại là vị trí bắt đầu set thứ 3. Và bất kỳ khi nào người dùng vuốt qua vị trí **(a)** một khoảng  **Δx**  thì vùng hiển thị của collection view sẽ quay trở lại vị trí **(b)**. Điều này cũng tương tự với trường hợp người dùng vuốt từ phải sang trái.

![](https://images.viblo.asia/b51a0e63-ca4b-48c5-8b12-9b412441bcf5.png)


Tiếp theo, ta setting kiểu cho **dishesCollectionView** và giá trị của **numberOfSets**.
```
@IBOutlet private weak var dishesCollectionView: InfinityCollectionView!
```

```
private func config() {
    ...
    dishesCollectionView.numberOfSets = kCollectionViewNumberOfSets
}
```

## Bước 3: Setting dataSource và collection view cell
```
final class DishesCell: UICollectionViewCell {
    @IBOutlet weak var dishImageView: UIImageView!
    
    func configCell(_ imageString: String) {
        dishImageView.image = UIImage(named: imageString)
    }
}
```

```
extension ViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.bannerItems.count * self.dishesCollectionView.numberOfSets
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "DishesCell", for: indexPath) as! DishesCell
        let correctIndexRow = indexPath.row % self.bannerItems.count
        if (self.bannerItems.count >= correctIndexRow + 1) {
            let item = self.bannerItems[correctIndexRow]
            cell.configCell(item)
        }
        return cell
    }
}
```
- **correctIndexRow**: Giá trị thể hiện vị trí của banner trong cell đối chiếu với vị trí của banner trong bannerItems.
Ví dụ: **indexRow** của cell là 7 => **correctIndexRow** = 1 (7 % 6 dư 1) => vị trí của banner trong bannerItems là vị trí số 2 (bannerItems[1]).

## Kết quả:

![alt](https://media.giphy.com/media/Kbew9KpMz1FkGPXSL8/giphy.gif)


## Link github: 
https://github.com/oNguyenDucHuyB/AutoscrollCollectionView/tree/infinity_collectionview