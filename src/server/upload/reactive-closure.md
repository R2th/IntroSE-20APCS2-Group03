Bài viết này nói về cách để adapt một `closure based API`  để có 1 `reactive layer` phía trên cùng mà không làm thay đổi logic của API đó.
### Closure based API
Giả sử chúng ta đang sử dụng 1 framework `DataProvider` - với nhiệm vụ xử lý các UITableView & UICollectionView. Nếu loại bỏ đi những phần details của nó thì class đó có thể xem như sau:
``` swift
class DataProvider {
    ...	
    var sections: ([Section] -> Void)
    ...
}
```
Như các bạn thấy chúng ta có một `closure` với tên "sections" mà chúng ta sẽ invoke hoặc observe để thực hiện các cập nhật có liên quan đến table/section. Mục tiêu ở đây là để thêm một `reactive layer` cùng với API này. Gỉa sử framework này không được maintain bởi chúng ta, nên chúng ta không muốn thay đổi các logic cơ bản của nó vì vậy hãy cùng nghĩ xem ta có thể thực hiện việc đó như thế nào.

### ReactiveSwift
#### 1. ReactiveExtensionsProvider
Nếu bạn đã quen thuộc với ReactiveSwift, thì có một protocol là `ReactiveExtensionsProvider` để đánh dấu việc thêm một layer riêng biệt của reactive API. Layer này được cung cấp bởi property `.reactive`. Bạn có thể checkout extension đó như sau:
``` swift
public struct Reactive<Base> { ... }
extension ReactiveExtensionsProvider {
    public var reactive: Reactive<Self>
    ...
}
```
Bởi vì [ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa) (UIKit + ReactiveSwift) khiến `NSObject` conform tới `ReactiveExtensionsProvider` nên bất kỳ subclass nào của `NSObject` (Mà trên thực tế là toàn bộ UIKit) đều có một property là `.reactive`. Vì vậy các UIKit đều sẽ có 2 kiểu property: reactive & non-reactive
``` swift
...
view.alpha // non-reactive
view.reactive.alpha //reactive
view.isHidden
view.reactive.isHidden
...
```
Tương tự như vậy, nếu chúng ta muốn thêm một `reactive layer` lên phía trên của `DataProvider`, chúng ta chỉ cần làm `DataProvider` conform tới ReactiveExtensionsProvider.
```swift
extension DataProvider: ReactiveExtensionsProvider {}
```
Bởi vì `ReactiveExtensionsProvider` là một protocol trống nên chúng ta không cần phải cung cấp thêm gì nữa cả. Nhưng chúng ta muốn nhận được return là một property `.reactive` trong 1 instance của `DataProvider`. Bây giờ chúng ta đã có 1 lớp riêng biệt cho `reactive APIs`, và vì nó là reactive nên ta ko thể thêm thẳng properties vào `DataProvider` mà cần các bước liên quan như sau:

#### 2. Binding Target
`UIView` có những thuộc tính như `view.isHidden` và `view.alpha`, chúng ta biết rằng `isHidden` là kiểu `Bool` và `alpha` là kiểu `CGFloat`, và nếu check kiểu của reactive tương ứng thì ta sẽ thấy `view.reactive.isHidden` là kiểu `BindingTarget<Bool>` và `view.reactive.alpha` là kiểu `BindingTarget<CGFloat>`. Vì vậy nêú chúng ta muốn 1 property mà chúng ta sẽ truyền dữ liệu vào, chúng ta phải cần 1 instance `BindingTarget` của property đó. Hãy thử add 1 reactive property tương ứng cho `sections` trong `DataProvider`:
``` swift
extension Reactive where Base: DataProvider {
	
    var sections: BindingTarget<[Section]> {
	return makeBindingTarget { (dataProvider, newSections) in 
	    dataProvider.sections(newSections) 
		}
    }
}
```
Cùng phân tích những dòng code trên:
* `extension Reactive where Base: DataProvider`: `Base` là 1 custom class trong đó chúng ta muốn add thêm reactive layer (dĩ nhiên ở đây là `DataProvider`)
* `var sections: BindingTarget<[Section]>`: CHúng ta đã thảo luận ở trên: nếu chúng ta muốn có 1 closure api phụ thuộc vào `[Section]` thì chúng ta muốn phần reactive tương ứng của nó là `BindingTarget<[Section]>`
* `makeBindingTarget { (dataProvider, newSections) in }`: Nó là 1 function kiểu `in-built` bên trong ReactiveSwift framework mà trả về 1 instance của `BindingTarget`. Nó có 1 closure dựa trên việc init với 2 arguments: 1 instance của base class và input (ở đây là `[Section]`)
* `dataProvider.sections(newSections)`: Đây là logic bên trong mà chúng ta sẽ sử dụng khi nhận được giá trị của `sections` để chúng ta có thể trigger table/collection update.

Với những sự thay đổi trên, reactive api của chúng ta sẽ nhìn như sau:
``` swift
let dataProvider = DataProvider()
// reactive
dataProvider.reactive.sections <~ ... // acts like a target
// non reactive
dataProvider.sections(...)
```
#### 3.BindingSource (Signal)
Đến bây giờ chúng ta đã biết được chúng ta có thể nhận được sections một cách reactive và cho phép chúng ta bind nó bằng những functions khác. Bây giờ điều chúng ta sẽ làm tiếp là observe `sections` theo kiểu reactive nữa. Để đạt được điều đó, có 1 protocol khác - `BindingSource` mà đơn giản nó hoạt động như một nguồn các giá trị mà chúng ta có thể lắng nghe hoặc liên kết (bind forward). Chúng ta đã có 1 class `Signal` mà comform protocol `BindingSource`, như 1 phần của Reactive. Bạn có thể tháy 1 số ví dụ từ UIKit như sau:
``` swift
textField.reactive.continuousTextValues // Signal<String?>
button.reactive.controlEvents // Signal<UIControlEvents>
```
Chúng ta có thể thấy 1 pattern khá quen thuộc: làm sao để chuyển 1 kiểu sang reactive - đơn giản là sử dụng `Signal` của kiểu đó. Trong trường hợp của chúng ta là 1 mảng các section: `Signal<Section>`. Chúng ta sẽ extend `Reactive` một lần nữa để add thêm property `sectionSignal`:
```swift
extension Reactive where Base: DataProvider {
	
    var sectionsSignal: Signal<[Section]> {
	return Signal { observer, _ in
		base.sections = { sections in 
			observer.send(value: sections) 
		}
	}
    }
}
```
Chúng ta tiếp tục phân tích những dòng code trên:
* `return Signal { observer, _ in }` - Bộ khởi tạo `Signal` với 2 argument: `observer` & `lifetime` trong đó `observer` là instance của class mà lắng nghe tới giá trị được phát ra bởi `Signal` này.
* `observer.send(value: sections)`: Mỗi khi ai đó gọi `base.sections()`, `sectionSignal` sẽ phát ra 1 giá trị mới của sections bằng cách gọi method `observer.send()`.

Do đóm sau khi thực hiện các thay đổi trên, reactive api sẽ trông như sau:
```swift
// acts like a source of values
... <~ dataProvider.reactive.sectionsSignal
```
### Conclusion
Như vậy, với việc không cần thay đổi bất kỳ logic nền tảng nào của `DataProvider` hoặc tạo thêm 1 class mới, chúng ta vẫn có thể mở rộng nó để khiến nó `plugeable` với những reactive apis. 
```swift
extension DataProvider: ReactiveExtensionsProvider {}
extension Reactive where Base: DataProvider {
 
    var sections: BindingTarget<[Section]> {
       return makeBindingTarget { (dataProvider, newSections) in 
         dataProvider.sections(newSections) 
       }
    }
 
    var sectionsSignal: Signal<[Section]> {
      return Signal { observer, _ in
          base.sections = { sections in 
            observer.send(value: sections) 
          }
      }
    }
}
let dataProvider = DataProvider()
// reactive
dataProvider.reactive.sections <~ ... // used as a target
... <~ dataProvider.reactive.sectionsSignal // used as a source
// non-reactive
dataProvider.sections(...)
dataProvider.sections = { sections in ... }
```

### Reference
[Medium](https://medium.com/swift-sundae/reactive-closure-530eba812768)