## I. Khái niệm:
- Key Value Observing hay còn được gọi là KVO là một cơ chế cho phép một Object có thể  nghe sự thay đổi của thuộc tính nằm trong đối tượng khác.
- KVO đặc biệt hữu dụng trong việc kết nối giữa model layer và controller layer (ví dụ như trong mô hình MVC). Controller object sẽ lắng nghe sự thay đổi của Model layer và View layer sẽ lắng nghe sự thay đổi của Controller layer.
- Một object có thể có một hoặc nhiều object khác cùng lắng nghe sự thay đổi của nó; và ngược lại thì một object cũng có thể lắng nghe sự thay đổi của một hoặc nhiều object khác.
## II. KVO trong iOS:
Để hiểu rõ hơn về KVO trong iOS thì chúng ta sẽ cùng xem ví dụ sau:

Khởi tạo Object Player với một property là **point**. 
```swift
class Player: NSObject {
    @objc dynamic var point = 0
    
    func increasePoint() {
        point = point + 1
    }
}
```
Để có thể sử dụng KVO với **class Player** thì **Player** bắt buộc phải là **subclass** của **NSObject**. Để các Object khác có thể lắng nghe sự thay đổi của property **point** thì property này cần phải được gắn **anotation** là **@objc dynamic**.

Khởi tạo một object player, khi đó object player này sẽ đóng vai trò là **Observable**.
```swift
class ViewController: UIViewController {
    let player = Player()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
```

Thực hiện subscribe để lắng nghe sự thay đổi value của property **point** bên trong object **player**.
```swift
class ViewController: UIViewController {
    let player = Player()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        player.observe(\Player.point, options: [.old, .new], changeHandler: { object, change in
            print("LOG + object: \(object)")
            print("LOG + newValue: \(change.newValue), oldValue: \(change.oldValue)")
        })
    }
}
```
function **observe()** nhận vào các parameters với ý nghĩa như sau:
- **\Player.point**: path dẫn tới observable property, hiểu một cách đơn giản là đường dẫn tới property có thể lắng nghe sự thay đổi bên trong Observable class.
- **options**: option nhận dữ liệu khi value của property thay đổi, như trong example là có nghĩa là sẽ lấy cả giá trị cũ và giá trị mới mỗi khi property **point** được cập nhật giá trị.
- **changeHandler**: callback được gọi tới khi property **point** cập nhật giá trị, callback này sẽ trả về 2 params là **object** tương ứng với đối tượng đang được lắng nghe property (trong ví dụ là object **player**) và **change** là object mang theo value của property **point** khi nó được thay đổi giá trị.

Tạo button và thực hiện việc update giá trị của property **point** mỗi khi click.
```swift
@IBAction func handleButton(_ sender: UIButton) {
    player.increasePoint()
}
```

Chúng ta có thể quan sát console log và thấy được kết quả được in ra mỗi lần click button
```swift
LOG + object: <DemoKVO.Player: 0x600001818290>
LOG + newValue: Optional(1), oldValue: Optional(0)
LOG + object: <DemoKVO.Player: 0x600001818290>
LOG + newValue: Optional(2), oldValue: Optional(1)
LOG + object: <DemoKVO.Player: 0x600001818290>
LOG + newValue: Optional(3), oldValue: Optional(2)
```
## III. KVO với RxSwift:
Với RxSwift, chúng ta có thể thực hiện KVO với cú pháp ngắn gọn và dễ dàng hơn, cụ thể như sau:
```swift
var disposeBag = DisposeBag()

// Solution 1
player.rx.observe(\Player.point)
        .subscribe(onNext: { point in
            print("LOG + point: \(point)")
        })
        .disposed(by: disposeBag)
        
 // Solution 2
 player.rx.observe(Int.self, #keyPath(Player.point))
        .subscribe(onNext: { point in
            guard let point = point else { return }
            print("LOG + point with value type: \(point)")
        })
        .disposed(by: disposeBag)
```

- Với **Solution 1** thì chúng ta chỉ cần truyền đường dẫn tới property là có thể nhận được value mỗi khi giá trị của property thay đổi.
- Với **Solution 2** thì chúng sẽ truyền thêm kiểu dữ liệu của property mà chúng ta muốn lắng nghe sự thay đổi của nó. Value nhận được là sẽ một optional chứa dữ liệu.

## IV. Ứng dụng:
Chúng ta có thể ứng dụng KVO với cái UI Component của UIKit, WebKit,.... trong iOS
```swift
let webView = WKWebView()
webView.rx.observe(URL.self, #keyPath(WKWebView.url))
        .subscribe(onNext: { url in
            print("LOG + url: \(url)")
        })
        .disposed(by: disponseBag)
```

```swift
let tableView = UITableView()
tableView.rx.observe(CGSize.self, #keyPath(UITableView.contentSize))
        .subscribe(onNext: { contentSize in
            print("LOG + contentSize: \(contentSize)")
        })
        .disposed(by: disponseBag)
```