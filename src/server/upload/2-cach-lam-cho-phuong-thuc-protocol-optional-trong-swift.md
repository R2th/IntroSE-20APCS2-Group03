Hôm nay thì trong bài viết này mình sẽ chia sẻ đến mọi người 2 cách dùng để làm cho `protocol optional`, theo đó là những lợi thế và bất lợi của nó.<br>

## Default Implement
Cách đầu tiên là tạo một `extension` của `protocol` rồi khởi tạo một phương thức rỗng của `protocol` đó.<br>
```
import Foundation

protocol PickerViewDelegate {
    func didChooseItem(at index: Int) // Required
    func didDismiss() // Optional
}

extension PickerViewDelegate {
    func didDismiss() {
        // Do nothing.
    }
}
```

Với cách tiếp cận này `didDismiss()` sẽ là một kiểu `optional`. Giờ thì ta hãy thử conform `PickerViewDelegate` vào một class xem sao nhé:<br>

```
class Controller: PickerViewDelegate {
    func didChooseItem(at index: Int) {
        
    }
}
```

Đấy, complier không yêu cầu chúng ta phải cài đặt phương thức `didDismiss()`<br>

### Advantages:
- Chúng ta có thể conform các cấu trúc vào một `protocol`
- Cài đặt mặc định bên trong `extension` sẽ tự động được sử dụng khi chúng ta không cài đặt phương thức đó trong kiểu `conforming`

### Disadvantages:
- Trong trường hợp khi một phương thức `optional` trả về giá trị `non-void`, chúng ta sẽ cần bắt kịp và trả về giá trị bên trong cài đặt mặc định.

## Objective-C ‘optional’ Keyword
Đánh dấu protocol với` @objc `và phương thức `optional` với `@objc optional/ optional`:
```
@objc protocol PickerViewDelegate {
    func didChooseItem(at index: Int) // Required
    @objc optional func didDismiss() // Optional
}
```

Với cách tiếp cận này thì chúng ta không cần phải tạo thêm một extension, chỉ cần conform một class với protocol đó:
```
class Controller: PickerViewDelegate {
    func didChooseItem(at index: Int) {
        
    }
}
```

Với cách tiếp cận này thì mình tin mọi ngừoi cũng bắt gặp thường ngày nhưng có thể không để ý, đó chính là khi chúng ta `conform protocol` `UICollectionViewDatasource`. Khi nhìn vào codebase của `UICollectionViewDatasource` thì ta thấy ngoại trừ `numberOfItemsInSection` và `cellForItemAt` thì các phương thức khác đều có `key word optional `ở đầu, chính vì thế nên khi conform UICollectionViewDatasource thì ta phải bắt buộc khởi tạo hai phương thức trên:
```
public protocol UICollectionViewDataSource : NSObjectProtocol {

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell

    optional func numberOfSections(in collectionView: UICollectionView) -> Int

    optional func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView
    ...
}
```
### Advantages:
- Không cần tạo extension

### Disadvantages:
- Chỉ các `subclass` `NSObject` có thể kế thừa từ một protocol `@objc`. Có nghĩa là chúng ta không thể `conform` `structs` hay `enums` với `protocol`.<br>
- Nếu đột nhiên chúng ta cần phải gọi một phương thức optional thì ta bắt buộc phải thêm `?` hoặc `!` sau mỗi tên của phương thức (trường hợp chúng ta `force` `unwrap` và phương thức không được cài đặt thì app sẽ bị crash):<br>

```
class PickerView {
    weak var delegate: PickerViewDelegate?
    
    deinit {
        delegate?.didDismiss?()
    }
}
```


## Kết luận:
Mặc dù cách thứ 2 có vẻ gọn gàng hơn nhưng mình recommend mọi người sử dụng cách đầu tiên bởi vì tính linh hoạt.
Bài viết hôm nay đã kết thúc, hi vọng mọi người có thể biết từ đây một chút gì đó nhé.<br>
Thank you for reading!

**Reference**: https://medium.com/better-programming/2-ways-to-make-protocol-methods-optional-in-swift-f032836a343b