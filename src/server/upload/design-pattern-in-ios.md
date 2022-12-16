Bài viết này chúng ta sẽ cùng tìm hiểu về 1 số design pattern hữu ích trong iOS.
### Strategy
*Strategy pattern cho phép chọn một thuật toán trong thời gian chạy. Thay vì thực hiện các thuật toán đơn lẻ một cách trực tiếp, code sẽ nhận biết được từng loại thông qua hàm khởi tạo và sau đó thực hiện hành động tương ứng.*

Chúng ta thường sử dụng các thuật tonas khác nhau chỉ quan tâm đến thời gian chạy mà không quan tâm đến làm sao để thực hiện chúng.

Ví dụ đơn giản, thuật toán cần đối tượng biết làm sao để `fly`. Class Duck biết làm sao để  "fly" và class Rocket cũng vậy. Thuật toán của chúng ta không quan tâm nếu thực hiện thì sẽ cần  một đôi cánh hay gas mà chỉ cần biết chúng có thể bay được hay không.

```
protocol Fly {
  func fly()
}

class Duck: Fly {
  func fly() {
    print("spread wings")
  }
}

class Rocket: Fly {
  func fly() {
    print("vrooommm!!")
  }
}

let flyableObject: Fly = Rocket()
flyableObject.fly()
```
#### Vấn đề được giải quyết khi sử dụng strategy
Trong project này chúng ta cần nhận viewController nhưng chúng ta cũng cần chúng có một số hành vi được xác định trước. Điều này thì Strategy pattern có thể thực hiện rất tốt. Một ViewController chung trong mobile app là để Login. Do đó chỉ cần tạo protocol để xác định LoginViewController có những action gì. Có nghĩa là LoginViewController nằm trong project nhưng chúng ta không cần quang tâm về UI nếu nó có một tableView hay animation hoặc một phương thức validation nào đó. Nhưng chúng ta cần nó biết thực hiện login. 
```
protocol LoginViewControllerActions {
    func loginBtnPressed(user: User)
}

//swift 3
protocol LoginViewController: UIViewController {
    let user: User
    var delegate: LoginViewControllerActions?
}
```
### Factory
*Factory Method Pattern giải quyết vấn đề khởi tạo đối tượng mà không cần phải biết cụ thể đối tượng sẽ được tạo ra như thế nào.*

Factory Pattern rất hữu ích  khi bạn tạo đối tượng tại thời điểm runtime. Do vậy nếu người dùng muốn một cheese pizza bạn sẽ tạo CheesePizza(), nếu muốn peperoni thì tương tự sẽ tạo PeperoniPizza()

```
enum PizzaType {
  case cheese
  case pepperoni
  case greek
}

class PizzaFactory {

  func build(type: PizzaType) -> Pizza {
    switch type {
    case cheese:
      return CheesePizza()
    case pepperoni:
      return PepperoniPizza()
    case greek:
      return GreekPizza()
    }
  }
  
}
```
#### Vấn đề được giải quyết khi sử dụng factory
Trong một dự án tương tự, bạn sử dụng factory pattern để có thể tạo ra đối tượng tại thời điểm runtime bằng cách truyền cho chúng những gì chúng cần.

Chúng ta cần truyền một LoginViewController cái mà có thể được tạo ra sử dụng các cách tiếp cận khác nhau như Storyboards, xib hoặc coded. Chúng ta có factory instance, bằng một tham số truyền vào có thể làm thay đổi cách tạo ra đói tượng đó.
```
protocol LoginViewControllerActions {
    func loginBtnPressed(user: User)
}

//swift 3
protocol LoginViewController: UIViewController {
    let user: User
    var delegate: LoginViewControllerActions?
}

protocol LoginViewControllerFactory {
    func build(delegate: LoginViewControllerActions) -> LoginViewController
}

class ViewCodedLoginViewControllerFactory: LoginViewControllerFactory {
  func build(delegate: LoginViewControllerActions) -> LoginViewController {
    return ViewCodedLoginViewController(delegate: delegate) 
  }
}

class StoryboardLoginViewControllerFactory: LoginViewControllerFactory {
  func build(delegate: LoginViewControllerActions) -> LoginViewController {
     let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("LoginViewController") as LoginViewController
     viewController.delegate = delegate
     return viewController
  }
}
```
Với instance của Factory, chúng ta chỉ cần gọi method `build`. Factory này có thể được instance của ViewCodedLoginViewControllerFactory hoặc StoryboardLoginViewControllerFactory chúng ta không thực sự quan tâm, mà chỉ cần nó thực hiện `build` method và trả về một đối tượng LoginViewController là được.
```
let viewController = factory.build(delegate: self) //LoginViewControllerFactory
self.presentViewController(viewController, animated: false, completion: nil)
```
### Decorator
*Decorator pattern cho phép hành vi được thêm vào một đối tượng riêng lẻ, tĩnh hoặc động, mà không ảnh hưởng đến hành vi của các đối tượng khác trong cùng một lớp.*

Một ví dụ đơn giản, Coffee shop muốn thêm whip cream vào coffee và tính toán giá mới và mô tả dựa trên đồ uống.
```
protocol Beverage {
    func cost() -> Double
    func description() -> String
}

class Coffee: Beverage {
    func cost() -> Double {
        return 0.95
    }
    
    func description() -> String {
        return "Coffe"
    }
}

class Whip: Beverage {
    let beverage: Beverage
    
    init(beverage: Beverage) {
        self.beverage = beverage
    }
    
    func cost() -> Double {
        return 0.45 + self.beverage.cost()
    }
    
    func description() -> String {
        return self.beverage.description() + ", Whip"
    }
}

var darkRoast: Beverage = Coffee()
darkRoast = Whip(beverage: darkRoast)

darkRoast.description()
darkRoast.cost()
// Như vậy darkRoast đã được tính thêm giá của cà phê thêm whip
```
#### Vấn đề được giải quyết khi sử dụng decorator
Chúng ta cần API version khác nhau cho mỗi lần gọi service, điều này có thể có nhiều cách khác nhau để xử lý nhưng chúng ta sử dụng pattern này để hteme một Header custom cho Request. Với cách tiếp cận này, chúng ta vừa có thể hoàn thành xong công việc hiện tại, mà trong tương lại, một lần gọi API lại thêm tham số khác vào header thì ok.

```
public typealias JsonObject = [String : Any]

public protocol Request {
    func request(method: HTTPMethod, data: JsonObject, header: JsonObject?, completion: @escaping (Result) -> Void)
}

public class MyRequest: Request {
    
    public init() {
        
    }
    
    public func request(method: HTTPMethod, data: JsonObject, header: JsonObject?, completion: @escaping (Result) -> Void) {
        //do request
    }
}

public class MyHeader: Request {
    
    let request: Request
    let header: [String: String]
    
    public init(request: Request, apiVersion: APIVersion = .standard){
        self.request = request
        self.header = ["myapikey": "apiKey",
                       "key" : "key",
                       "version" :  "\(apiVersion.rawValue)"]

    }
    
    public func request(method: HTTPMethod, data: JsonObject, header: JsonObject?, completion: @escaping (Result) -> Void) {
        
        let mutableHeader = self.header + (header ?? [:])
        
        self.request.request(method: method, data: data, header: mutableHeader, completion: completion)
    }
}

let v1Request: Request = MyHeader(request: MyRequest(), apiVersion: .v1)
let standardRequest: Request = MyHeader(request: MyRequest())
```
Chúng ta cũng cần để filter kết quả của request. Cái mà có thể được thực hiện khi tạo một method mới, hoặc thay đổi request của bạn. Chúng tôi quyết định sử dụng Decorator để thêm vào hành vi này bởi vì service của chúng ta đã được sử udngj trong một class khác và chúng ta muốn thay đối ít nhất một số dòng ít nhất có thể.
```
protocol Service {
  func fetch(completion: @escaping (Result<[String]>) -> Void) -> Void 
}

class ViewControllerLoader<D> {
    func load(completion: @escaping (Result<D>) -> Void) {
      fatalError("load method need to be override on subclasses")
    }
}

class ServiceViewControllerLoader: ViewControllerLoader<[String]> {
  
  let service: Service
  
  init(service: Service) {
        self.service = service
  }
    
    override func load(completion: @escaping (Result<[String]>) -> Void) {
        self.service.fetch() { (result) in
            switch result {
            case .success(let strings):
                completion(.success(strings))
            case .error(let error):
                completion(.error(error))
                
            }
        }
    }
}

class ServiceViewControllerLoaderDecorator: ViewControllerLoader<[String]> {
  
  let loader: ViewControllerLoader<[String]>
  
  init(loader: ViewControllerLoader<[String]>) {
        self.loader = loader
  }
  
  func filter(data: [String]) {
    //do filtering 
  }
  
  override func load(completion: @escaping (Result<[String]>) -> Void) {
        
        self.loader.service.fetch { (result) in
            switch result {
            case .success(let strings):
                let filteredStrings = self.filter(data: strings)
                completion(.success(filteredStrings))
            case .error(let error):
                completion(.error(error))
            }
        }
    }
}
```
### Adapter
*Adapter pattern là một software design pattern cho phép giao diện của class đã có được sử dụng như giao diện khác. Nó thường được sử dụng để tạo class có sẵn làm việc với class khác mà không phải sửa source code*

Chúng ta hãy tưởng tượn adapter giống như một bộ chuyển đổi trên thực tế. Giả dụ bạ cần Nintendo 64 có video tổng hợp để làm đầu ra cho TV 4k của bạn. Do đó bạn cần một bộ chuyển đổi Composite-HDMI.
#### Vấn đề được giải quyết khi sử dụng adapter
Bạn cần 4 số cuối của một Card và cũng tương thích với PKPaymentPass. Nói cách khác, tạo một adapter để trả về một PKPaymentPass làm một thể hiện của Card.
```
public struct Card {
    var lastNumber: String = ""
}

public struct PassKitCard {
    
    let passKitCard: PKPaymentPass?
    
    public func toCard() -> Card {
        return Card(lastNumber: paymentPass.primaryAccountNumberSuffix)
    }
}
```
Nhưng chúng ta cũng cần mix các pattern để tạo ra code có tính dùng lại và tính duy trì. Ví dụ, mix adapter với strategy pattern. Chúng ta không thực sự cần Card object mà chúng ta chỉ cần lastNumbers vậy tại sao chúng ta không tạo protocol để thực hiện chngs và tích hợp PKPaymentPass, Card và bất kì Object khác mà bạn có thể cần.
```
public protocol LastNumber {
    var lastNumber: String { get }
}

public struct PassKitLastNumber: LastNumber {
    
    let passKitCard: PKPaymentPass?
    
    public var lastNumber: String {
        
        if let paymentPass = self.passKitCard {
            return paymentPass.primaryAccountNumberSuffix
        }
        
        return ""
    }
}

class Card: LastNumber {
    
    let card: Card
    
    init(card: Card) {
        self.card = card
    }
    
    var lastNumber: String {
        return self.card.lastNumbers
    }
}
```
### Tổng kết
Design pattern giúp chúng ta rất nhiều trong việc sử dụng lại code, tiết kiệm thời gian khi cần thay đổi một số tính năng trong code và một số tác vụ cũng dễ dàng sử dụng.

Link tham khảo: https://medium.com/cocoaacademymag/real-world-ios-design-patterns-3e5aad172094