![](https://cdn-images-1.medium.com/max/800/1*mscq1EfAvoLwdUXNLotCUA.png)

> Design Patterns là một phần quan trọng trong Software design, nó cung cấp giải pháp cho hàng loạt các vấn đề xảy ra. 
> 
>
> Apple sử dụng những Design Pattern này trên tất cả các iOS framework. Trong bài viết này, chúng ta sẽ thảo luận về cách các Design Patterns được sử dụng trong Apple API và làm thế nào các bạn có thể hưởng lợi từ việc cài đặt này.
>

#  
 
Chúng ta sử dụng các iOS framework như UIKit, CoreLocation, CoreBluetooth và nhiều frameworks khác hàng ngày. Các thành phần như UITableView, UIStackView ... Tất cả chúng được viết bằng cách sử dụng một thiết kế tái sử dụng( **reusable**) tuyệt vời từ Apple.
Có rất nhiều Design Pattern mà Apple sử dụng trong suốt quá trình phát triện những bộ kits của họ. Hãy thử khám phá một vài pattern và xem làm thế nào chúng ta có thể cài đặt được chúng.


# Object Pool

Object Pool là một pattern sử dụng lại một tập hợp các objects đã được khởi tạo.

Khi một client của pool yêu cầu một object, một pool sẽ trả về một item thực sự sẵn sàng sử dụng lại hơn là khởi tạo mới. Khi một client hoàn tất việc sử dụng object, nó sẽ được trả lại pool để có thể được sử dụng lần sau.

Object Pool được sử dụng để thực hiện việc một object từ lấy ra và trả lại pool không thực sự được tạo mới và huỷ bỏ. Do đó tiết kiệm rất nhiều hiệu suất
UITableView là một ví dụ tuyệt vời về cách sử dụng và thực hiện của Object pool pattern.

Cách mà UITableView hoạt động là nó lấy đi các cells bị đẩy ra ngoài màn hình, và tái sử dụng cho các cells sắp tới.

# Swift cài đặt Object Pool thế nào?

Hãy thử cung cấp một cài đặt Object pool cho iOS.

Đầu tiên chúng ta cần tạo một protocol để sư dụng hạn chế các generic pool items. Vì chúng ta sẽ cung cấp các reusable cells cho UITableView, hãy gọi nó là Reusable.

```
class UITableViewCell: UIView, Reusable {
  func prepareForReuse() { }
}
```

Bạn có thể thêm prepareForReuse vào protocol và gọi nó khi phần tử được tái sử dụng từ pool để làm sạch object trước khi nó xuất hiện trở lại màn hình.
Một UITableViewCell sau đó chỉ đơn giản là một UIView tuân thủ Reusable

```

class UITableViewCell: UIView, Reusable {
  func prepareForReuse() { }
}
```

Chúng ta cài đặt Object response như sau:

```
class ObjectPool<T: Reusable> {
  private let maxElementCount: Int
  private let factory: () -> T
  
  public init(maxElementCount: Int, factory: @escaping () -> T) {
    self.factory = factory
    self.maxElementCount = maxElementCount
  }
}
```

Object Pool Class cần một hàm tạo để tạo generic items. 

Bạn cần biết giá trị maxElementCount TableView sẽ sử dụng để cung cấp số cell tối đa được hiển thị đồng thời trên màn hình. Từ đó iOS có một delegate về số lượng items trên một section với **heightForRowInSection** sẽ cung cấp giá trị này dễ dàng.

Trong Object pool, bạn cần hai phương thứ, một là vẽ một item, hai là giải phóng đối tượng sẽ được sử dụng lại. Trong ví dụ về TableView, chúng ta sẽ giải phóng Object khi cell đi ra ngoài màn hình.

```
class ObjectPool<T: Reusable> {
    private let maxElementCount: Int
    private let factory: () -> T
    var elements = [T]()
    
    public init(maxElementCount: Int, factory: @escaping () -> T) {
        self.factory = factory
        self.maxElementCount = maxElementCount
    }
    
    
    public func draw() -> T {
        guard self.elements.isEmpty, self.elements.count < self.maxElementCount else {
            return self.elements.removeFirst()
        }
        let element = self.factory()
        return element
    }
    
    
    public func release(_ element: T) {
        element.prepareForReuse()
        self.elements.append(element)
    }
}
```

Khi hàm **dequeueReusableCell** được gọi, UITableView sẽ vẽ một object từ pool

```
func dequeueReusableCell(withIdentifier identifier: String) -> UITableViewCell {
    return pool.draw()
}
```

Vì UITableView chỉ đơn giản là subclass của UIScrollView, bạn có thẻ dễ dàng biết khi nào một Cell rời khỏi màn hình, do đó bạn có thể đơn giản giải phóng một object vào nhóm đối tượng dùng lại (reusable pool)

Phía dưới là hàm được gọi khi Cell ra khỏi màn hình

```
func handleDidEndDisplayingCell(_ cell: UITableViewCell, forRowAt indexPath: IndexPath) {
    delegate.tableView(_ tableView: self, didEndDisplaying cell: cell, forRowAt indexPath: indexPath)
    pool.release(cell)
}
```

# Singleton Pattern

Singleton pattern là pattern được sử dụng để chỉ tạo một khởi tạo của một đối tượng cụ thể( object). Tất cả tham chiếu trên  object reference đều trên cùng một instance. Singleton được sử dụng khi nó có ý nghĩa với một object duy nhất cung cấp quyền truyên cập trên phạm vi global resource.

Một Singleton có thể được tạo ra như sau

# Swift Implementation of Singleton

```
class AppDefaults {
    static let shared = AppDefaults()
    private init() {
        //Private initialization to be sure that only one instance is created.
    }
}
```

Apple sử dụng singleton trong rất nhiều trường hợp của họ là **NSFileManager**, **NSApplication**, và trong **UIApplication**.

Khi một client yêu cầu một object cho một instance, nó sẽ nhận được share instance

Bạn có thể sử dụng Singleton trong code để tránh re-allocating nhiều instance cho một instance, do đó tiêt kiệm được hiệu năng. Tuy nhiên chúng ta cần phải nhìn nhận được singleton có những vấn đề và không nên lạm dụng nó.

* Sử dụng singleton cho các tình huống nó có ý nghĩa duy nhất cung cấp quyền truy cập vào một global resouce.
* Đừng quên, singleton không thể subclass
* Singleton có thể ẩn dependencies, cần phải nắm vững cấu kiến trúc sự phụ thuộc giữa các classes.


# Observer pattern

Observer pattern được sử dụng để công khai các trạng thái đối tượng bị thay đổi. Các object khác có thể đăng ký để nhận thông báo về sự thay đổi.

Tương tác có thể xảy ra giữa các object mà không biết về nhau. Điều này làm cho chủ thể, và đối tượng quan sát kết nối một cách lỏng lẻo.

Apple sử dụng Observer pattern thể nào?

## Notifications

Apple sử dung Observer pattern trên NSNotificationCenter Objects đăng thông báo lên NSNotificationCenter bằng cách xác định global string. Observer object lắng nghe các thông báo này và nhận được sự thay đổi. Việc gửi thông báo này được thực hiện đồng bộ.

Bạn có thể sử dụng NSNotificationCenter trong code để đăng ký nhận thông báo từ hệ thống, hoặc công bố và và nhận các custom notification.

NSNotificationCenter rất tuyệt vời, chúng ta có thể viết một cài đặt tuỳ chỉnh để hiểu rõ hơn.

# Swift Implementation Of Observer Pattern

```
enum NotificationName {
    case emailChangeNotification
}


protocol StateChangeObserver : class {
    func didChange(_ notification: NotificationName, value: String)
}


class LoginData {
    weak var observer:StateChangeObserver?
    
    var email: String = "" {
        didSet {
            observer?.didChange(.emailChangeNotification, value: email)
        }
    }
}
```


# Usage

```
class Observer: UIViewController, StateChangeObserver {
    let loginData = LoginData()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loginData.observer = self
    }
    
    func didChange(_ notification: NotificationName, value: String) {
        if notification == .emailChangeNotification {
            print(value)
        }
    }
}
```


# Tổng kết

Trong bài này, tôi đã giới thiệu về **Object Pool**, **Singleton**, và **Observer Patterns**.
Hiểu về Design pattern luôn là điều rất quan trọng với mỗi developer để mà lại chất lượng code tốt hơn với kiến trúc rõ ràng hơn.

Enjoy,

[Refer](https://medium.com/swift2go/exploring-design-patterns-used-by-apple-on-ios-23328873ecd3)