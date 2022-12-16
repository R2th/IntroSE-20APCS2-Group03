UICollectionView  được kế thừa từ UIScrollView, liệu nó cũng có việc phân trang như ScrollView? 

Việc phân trang này phụ thuộc vào kích thước của các cell, nếu nó bằng kích thước màn hình thì sẽ có. Tuy nhiên nhiều trường hợp kích thước Cell không như vậy nó thường nhỏ hơn. 

Chính vì thế bài viết này sẽ hướng dẫn các bạn xử lý khi cell nhỏ hơn kích thước của CollectionView. 
Chúng ta có thể xem ví dụ tương tự như AppStore :
![](https://images.viblo.asia/f144bd17-3951-45ef-a82e-1b28738225c7.png)

Giờ hãy bắt đầu xây dựng project demo
## 1. Khởi tạo
Tạo 1 Single Project
![](https://images.viblo.asia/21e1c2a0-1a23-41da-bd7a-c96cefa2dbee.png)

Tiếp theo khởi tạo giao diện cùng với 1 CollectionView 

![](https://images.viblo.asia/40720b53-370e-4ab1-810e-1259d7e0ecf0.png)

## 2. Tạo file Snapping
Tiếp theo chúng ta sẽ tạo một file Custom UICollectionViewFlowLayout với tên `SnappingCollectionViewLayout`.
Sau đó thay đổi layout cho CollectionView đã khởi tạo ở trên 

![](https://images.viblo.asia/dde0f7a2-bdfd-403f-a99d-7b33c8911687.png)

Nhiệm vụ của file này là sẽ tùy chỉnh việc hiển thị của CollectionView bằng cách override lại phương thức 
```swift 
func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint, 
                                                          withScrollingVelocity velocity: CGPoint) -> CGPoint
```

Trong phương thức này có 2 tham số là `proposedContentOffset` chỉ vị trí của collectionView đang hiển thị cùng với `velocity` là vận tốc trượt. 
Kết quả trả về sẽ là vị trí hiển thị mong muốn. 
## 3. Xử lý với hàm `targetContentOffset`
Dựa vào `velocity` chúng ta có thể xác định ra được việc nguời dùng đã trượt collectionview như thế nào. 
Chúng ta sẽ đặt ra một vận tốc giới hạn nhỏ nhất là `snapToMostVisibleColumnVelocityThreshold` để giới hạn khi trượt. 
Sẽ có các TH sau: 

   * |velocity.x| <= snapToMostVisibleColumnVelocityThreshold : Tìm vị trí Cell gần nhất để làm mốc hiển thị 
  
   * velocity.x > 0: Tìm vị trí của cell gần nhất bên phải để chọn làm mốc hiển thị
   
   * velocity.x <0 : Tìm vị trí của cell gần nhất bên trái để chọn làm mốc hiển thị

Dựa vào các TH đó chúng ta tính toán và trả về vị trí tương ứng. Code xử lý: 

``` swift
import UIKit

final class SnappingCollectionViewLayout: UICollectionViewFlowLayout {
    
    override func targetContentOffset(forProposedContentOffset proposedContentOffset: CGPoint,
                                      withScrollingVelocity velocity: CGPoint) -> CGPoint {
        guard let collectionView = collectionView else {
            return super.targetContentOffset(forProposedContentOffset: proposedContentOffset,
                                             withScrollingVelocity: velocity)
        }
        if abs(velocity.x) <= snapToMostVisibleColumnVelocityThreshold {
            let targetRect = CGRect(x: proposedContentOffset.x,
                                    y: 0,
                                    width: collectionView.bounds.size.width,
                                    height: collectionView.bounds.size.height)
            let layoutAttributesArray = super.layoutAttributesForElements(in: targetRect) ?? []
            if collectionView.bounds.origin.x + collectionView.bounds.size.width + Constants.collectionLeftPadding
                > collectionView.contentSize.width {
                let offsetAdjustment = layoutAttributesArray
                    .max(by: { $0.center.x < $1.center.x })?
                    .frame.origin.x ?? collectionView.contentSize.width
                return CGPoint(x: offsetAdjustment - Constants.collectionLeftPadding, y: proposedContentOffset.y)
            } else {
                var offsetAdjustment = CGFloat.greatestFiniteMagnitude
                layoutAttributesArray.forEach {
                    if abs($0.frame.origin.x - proposedContentOffset.x) < abs(offsetAdjustment) {
                        offsetAdjustment = $0.frame.origin.x - proposedContentOffset.x
                    }
                }
                return CGPoint(x: proposedContentOffset.x + offsetAdjustment - Constants.collectionLeftPadding,
                               y: proposedContentOffset.y)
            }
        } else if velocity.x > 0 {
            let targetRect = CGRect(x: proposedContentOffset.x,
                                    y: 0,
                                    width: collectionView.bounds.size.width,
                                    height: collectionView.bounds.size.height)
            let layoutAttributesArray = super.layoutAttributesForElements(in: targetRect) ?? []
            let offsetAdjustment = layoutAttributesArray
                .filter { $0.frame.origin.x > proposedContentOffset.x }
                .min(by: { $0.center.x < $1.center.x })?
                .frame.origin.x ?? 0.0
            return CGPoint(x: offsetAdjustment - Constants.collectionLeftPadding,
                           y: proposedContentOffset.y)
        } else {
            let targetRect = CGRect(x: proposedContentOffset.x - collectionView.bounds.size.width,
                                    y: 0,
                                    width: collectionView.bounds.size.width,
                                    height: collectionView.bounds.size.height)
            let layoutAttributesArray = super.layoutAttributesForElements(in: targetRect) ?? []
            let offsetAdjustment = layoutAttributesArray
                .max(by: { $0.center.x < $1.center.x })?
                .frame.origin.x ?? 0.0
            return CGPoint(x: offsetAdjustment - Constants.collectionLeftPadding, y: proposedContentOffset.y)
        }
    }
    
    private var snapToMostVisibleColumnVelocityThreshold: CGFloat { return 0.3 }
}

struct Constants {
    static let collectionLeftPadding: CGFloat = 16.0
}
```
## 4.  Kết quả
![](https://images.viblo.asia/8f244abb-1b7c-4404-b457-76cf24b037e3.gif)

Bài viết mong giúp bạn giải quyết được vấn đề nêu ở đầu. Tuy nó không mượt như AppStore nhưng cũng là 1 cách để bạn xử lý Snapping với UICollectionVierw