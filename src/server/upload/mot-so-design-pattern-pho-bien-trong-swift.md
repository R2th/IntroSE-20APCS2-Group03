###         **Giới thiệu**
Design Pattern (mẫu thiết kế) là một kỹ thuật quan trọng mà mỗi lập trình viên giỏi cần phải biết và áp dụng. Nó giúp bạn giải quyết vấn đề một cách tối ưu nhất, cung cấp cho bạn các giải pháp trong lập trình hướng đối tượng. Design patterns có thể áp dụng được ở phần lớn các ngôn ngữ lập trình. 

Có 3 nhóm Design pattern chính:  

- **Creational Pattern** (nhóm khởi tạo) gồm: Abstract Factory, Factory Method, Singleton, Builder, Prototype. Nhóm này sẽ giúp bạn trong việc khởi tạo đối tượng thông qua một số thủ thuật 
- **Structural Pattern** (nhóm cấu trúc) gồm: Adapter, Bridge, Composite, Decorator, Facade, Proxy và Flyweight. Nó dùng để thiết lập, định nghĩa quan hệ giữa các đối tượng.
-  **Behavioral Pattern** (nhóm hành vi) gồm: Interpreter, Template Method, Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy và Visitor. Nhóm này dùng trong thực hiện các hành vi của đối tượng.

Trong bài ngày hôm nay, chúng ta sẽ tìm hiểu một số Design Pattern phổ biến thường được áp dụng trong Swift mà một số ví dụ minh họa cho chúng như:

- Nhóm khởi tạo: Singleton
- Nhóm cấu trúc: Decorator
- Nhóm hành vi: Strategy

# **Singleton**
Singleton thuộc nhóm Creational Design Pattern. 

Singleton đảm bảo rằng chỉ duy nhất một instance được tạo ra, nó sẽ cung cấp một method duy nhất để bạn có thể khởi tạo instance này. Tức là chỉ có duy nhất một thể hiện trong suốt vòng đời của ứng dụng. 

![](https://images.viblo.asia/da8b5aaf-503a-459a-b9f9-c74faa3188fc.png)

Nguyên tắc áp dụng singleton:

- Viết method private constructor để hạn chế truy cập class từ bên ngoài
- Tạo một biến private static var để đảm bảo rằng biến chỉ có thể được khởi tạo ở trong class
- Tạo một public method để trả về instance được khởi tạo ở trên

### **Áp dụng Singleton Pattern**


Ta tạo 1 class tên là SingletonObject, và tạo 1 instance private static của chính lớp đó:

```
class SingletonObject: NSObject {
    private static var sharedInstance: SingletonObject? = nil
}
```

Private method init() của class để hạn chế truy cập class từ bên ngoài: 

```
class SingletonObject: NSObject {
    private static var sharedInstance: SingletonObject? = nil
    private override init() { }
}
```

Viết public method trả về instance ở trên: 

```
class SingletonObject: NSObject {
    private static var sharedInstance: SingletonObject? = nil
    private override init() { }
    static func getInstance() -> SingletonObject {
        if sharedInstance == nil {
            sharedInstance = SingletonObject.init()
        }
        return sharedInstance!
    }
}
```

Như vậy ta đã áp dụng thành công singleton cho class SingletonObject. Đây là cách áp dụng được với đa số các ngôn ngữ lập trình, tuy nhiên trong Swift, việc áp dụng nó giờ rút gọn chỉ với 1 dòng code duy nhất như sau: 

```
class SingletonObject: NSObject {
    static let sharedInstance = SingletonObject()
}
```

# **Decorator**

Decorator thuộc nhóm Structural Design Pattern. 

Decorator sẽ linh động thay đổi tính chất đã có trong một đối tượng khi chương trình đang chạy mà không ảnh hưởng đến các tình chất đã tồn tại của các đối tượng khác. Bằng cách này thì chúng ta vừa bảo lưu được các thành phần đã xây dựng không bị chỉnh sửa, vừa thêm được chức năng mới. Với Decorator pattern, ta có thể tạo ra những chức năng cốt lõi, và trang trí (decorate) cho nó các chức năng khác tùy nhu cầu.

Thông thường để mở rộng phương thức của đối tượng bằng cách kế thừa, ta cần phải triển khai code để mở rộng lớp có sẵn và viết lại (overide) các thương thức của lớp đó. Những mở rộng đó sẽ được cài đặt ngay khi biên dịch chương trình. Với Decorator Pattern, chúng ta sẽ tạo ra một lớp mới đồng thời chúng ta sẽ áp dụng sự thay đổi trên tất các đối tượng thuộc lớp này. Nó cho phép chúng ta thay đổi một đối tượng đã tồn tại nhưng không làm ảnh hưởng đến các đối tượng khác của cùng lớp đó. Mặt khác, Decorator sẽ giúp ta giảm đi một lượng lớn các lớp được mở rộng.

![](https://images.viblo.asia/88cd3081-5791-46c3-aca7-78af263c7336.jpg)

4 thành phần chính của Decorator pattern: 

- Component: Base class hoặc protocol mà đối tượng của chúng ta sẽ kế thừa hoặc adopt. 
- ConcreteComponent: Đối tượng kế thừa hoặc adopt Component
- Decorator: Cũng là đối tượng kế thừa hoặc adopt Component, 
- ConcreteDecorator: Các đối tượng kế thừa Decorator, ta sẽ cài đặt các thuộc tính/phương thức mở rộng ở các đối tượng này

### **Áp dụng Decorator Pattern**

Ta xét ví dụ sau: 

Giả sử bạn được giao cho xây dựng trang web bán hàng của Apple. Mặt hàng cụ thể ở đây là Macbook. Mặc dù hiện tại chỉ có 3 dòng Macbook cơ bản cho đến thời điểm hiện tại (The new Macbook, Macbook Air, Macbook Pro), tuy nhiên với mỗi dòng Macbook lại có những tùy chọn cấu hình khác nhau, số lượng những chiếc Macbook lớn hơn thế rất nhiều. 

Nếu làm theo lập trình hướng đối tượng thông thường, ta sẽ thiết kế 1 lớp cơ bản – gọi là Macbook, và lớp Macbook con sẽ kế thừa lớp này, chẳng hạn: 

![](https://images.viblo.asia/5863a633-22c4-421f-92c7-73ae54040452.png)

Tuy nhiên, nếu tiếp tục làm như trên với tất cả các loại Macbook, ta sẽ được thiết kế lộn xộn và rất khó kiểm soát như sau: 

![](https://images.viblo.asia/6296f7ec-1f29-4e99-a590-5147ebde24ab.png)

Decorator pattern sẽ giúp ta giải quyết điều này. Ta sẽ thêm các đặc điểm bổ sung vào base class Macbook khi người mua hàng lựa chọn cấu hình của họ. 

Đầu tiên, ta tạo 1 base protocol – gọi là Macbook. Đây là thành phần Component trong Decorator pattern.

```
protocol Macbook {
    var cost: Double { get }
    var description: String { get }
}
```

Tạo các ConcreteComponent adopt protocol này: 

```
class MacbookAir: Macbook {
    var cost: Double {
        return 1199
    }
    
    var description: String {
        return "Macbook Air"
    }
}

class MacBookPro: Macbook {
    var cost: Double {
        get {
            return 2399
        }
    }
    
    var description: String {
        get {
            return "Macbook Pro"
        }
    }
}

class TheNewMacBook : Macbook {
    var cost: Double {
        get {
            return 1299
        }
    }
    var description: String {
        get {
            return "The New Macbook"
        }
    }
}
```

Tiếp theo ta xây dựng class MacbookDecorator. Class này sẽ adopt Macbook protocol ở trên, nghĩa là ta có thể hoàn toàn lấy được các giá trị “cost” và “description” của đối tượng “Macbook”. Nó sẽ là class mà các ConcreteDecorator sẽ kế thừa.

```
class MacBookDecorator : Macbook{
    let instance : Macbook
    var cost: Double {
        get {
            return instance.cost
        }
    }
    var description: String {
        get {
            return instance.description
        }
    }
    
    required init(macbook: Macbook) {
        self.instance = macbook
    }
}
```

Các ConcreteDecorator kế thừa class này, nghĩa là chúng có thể thêm thay đổi các giá trị “cost” và thêm “description” của đối tượng mà nó đại diện, ví dụ: 

```
final class ProcessorUpgrade : MacBookDecorator {
    override var cost: Double {
        get {
            return instance.cost + 499
        }
    }
    
    override var description: String {
        get {
            return instance.description + ", i7 Processor"
        }
    }
    
    required init(macbook: Macbook) {
        super.init(macbook: macbook)
    }
}

final class SSDUpgrade : MacBookDecorator {
    override var cost: Double {
        get {
            return instance.cost + 299
        }
    }
    
    override var description: String {
        get {
            return instance.description + ", 1TB SSD"
        }
    }
    
    required init(macbook: Macbook) {
        super.init(macbook: macbook)
    }
}
```

Ta đã áp dụng xong Decorator pattern. Chạy thử đoạn code sau:

```
var macbookPro: Macbook = MacBookPro()
print("Cost: $\(macbookPro.cost), Description: \(macbookPro.description)")

macbookPro = ProcessorUpgrade(macbook: macbookPro)
print("Cost: $\(macbookPro.cost), Description: \(macbookPro.description)")

macbookPro = SSDUpgrade(macbook: macbookPro)
print("Cost: $\(macbookPro.cost), Description: \(macbookPro.description)")
```

Kết quả: 

```
Cost: $2399.0, Description: Macbook Pro
Cost: $2898.0, Description: Macbook Pro, i7 Processor
Cost: $3197.0, Description: Macbook Pro, i7 Processor, 1TB SSD
```

# **Strategy**

Strategy thuộc nhóm Behavior Design Pattern.

Strategy pattern giúp bạn trừu tượng hóa những hành vi (behavior, method, function) của một đối tượng bằng cách đưa ra những cài đặt vào những lớp khác nhau. Strategy pattern  tách rời phần xử lý một chức năng cụ thể ra khỏi đối tượng của bạn. Sau đó tạo ra một tập hợp các thuật toán để xử lý chức năng đó và lựa chọn thuật toán nào mà bạn thấy đúng đắn nhất khi thực thi chương trình. Nó thường dùng để thay thế cho sự kế thừa, khi bạn muốn chấm dứt việc theo dõi và chỉnh sửa một chức năng qua nhiều lớp con.

![](https://images.viblo.asia/05d248b9-6e41-49ba-b648-c9b1d974fe0f.png)

Strategy pattern thường được sử dụng trong những trường hợp sau:

- Bạn có một đoạn code dễ thay đổi, và bạn tách chúng ra khỏi chương trình chính để dễ dàng bảo trì
- Bạn muốn tránh sự rắc rối, khi phải hiện thực một chức năng nào đó qua quá nhiều lớp con.
- Bạn muốn thay đổi thuật toán sử dụng khi chạy chương trình

### **Áp dụng Strategy Pattern**

Xét ví dụ sau: 

Bạn xây dựng 1 phần mềm dịch vụ vận tải. Có nhiều hình thứaa vận tải trong hệ thống này

Đầu tiên, ta có 1 model EstimaseModel: 

```
struct EstimateModel {
    var vehicleType: String?
    var vehicleFare: String?
    var estimateDuration: String?
}
```

Tạo 1 protocol EstimateStrategy, chứa 1 method tính toán CalculateEstimate với kiểu trả về là EstimateModel ở trên: 

```
protocol EstimateStrategy {
    func calculateEstimates() -> EstimateModel
}
```

Cài đặt hàm tính toán này vào từng lớp cụ thể tương ứng với từng dịch vụ vận tải, mỗi lớp này adopt protocol mà ta vừa tạo: 

```
class BusEstimateStrategy: EstimateStrategy {
    static let sharedInstance: BusEstimateStrategy = BusEstimateStrategy()
    func calculateEstimates() -> EstimateModel {
        return EstimateModel(vehicleType: "Bus", vehicleFare: "$2.0", estimateDuration: "3hr 15min")
    }
}

class TaxiEstimateStrategy: EstimateStrategy {
    static let sharedInstance: TaxiEstimateStrategy = TaxiEstimateStrategy()
    func calculateEstimates() -> EstimateModel {
        return EstimateModel(vehicleType: "Taxi", vehicleFare: "$15.0", estimateDuration: "45min")
    }
}

class TrainEstimateStrategy: EstimateStrategy {
    static let sharedInstance: TrainEstimateStrategy = TrainEstimateStrategy()
    func calculateEstimates() -> EstimateModel {
        return EstimateModel(vehicleType: "Train", vehicleFare: "$6", estimateDuration: "1hr 30min")
    }
}

class BoatEstimateStrategy: EstimateStrategy {
    static let sharedInstance: BoatEstimateStrategy = BoatEstimateStrategy()
    func calculateEstimates() -> EstimateModel {
        return EstimateModel(vehicleType: "Boat", vehicleFare: "$8", estimateDuration: "2hr 30min")
    }
}
```

Như trên ta đã tách các phương thức xử lý ra khỏi từng lớp model cụ thể. Việc xử lý do EstimateStrategy đảm nhiệm. Khi người dùng lựa chọn 1 hình thức vận tải, nó sẽ lựa chọn lớp ConcreteStrategy tương ứng để xử lý. 

```
func onBusSelected() {
        print("Taxi Selected")
        estimateViewModel.estimateStrategy = BusEstimateStrategy.sharedInstance
        updateEstimate(estimateStrategy: estimateViewModel.estimateStrategy!)
    }
    
    func onTaxiSelected() {
        print("Bus Selected")
        estimateViewModel.estimateStrategy = TaxiEstimateStrategy.sharedInstance
        updateEstimate(estimateStrategy: estimateViewModel.estimateStrategy!)
    }
    
    func onBoatSelected() {
        print("Boat Selected")
        estimateViewModel.estimateStrategy = BoatEstimateStrategy.sharedInstance
        updateEstimate(estimateStrategy: estimateViewModel.estimateStrategy!)
    }
    
    func onTrainSelected() {
        print("Train Selected")
        estimateViewModel.estimateStrategy = TrainEstimateStrategy.sharedInstance
        updateEstimate(estimateStrategy: estimateViewModel.estimateStrategy!)
    }
    
    func updateEstimate(estimateStrategy: EstimateStrategy) {
        let estimateModel = estimateStrategy.calculateEstimates()
        estimateViewModel.vehicleTypeValue = estimateModel.vehicleType
        estimateViewModel.vehicleFareValue = estimateModel.vehicleFare
        estimateViewModel.estimateTimeValue = estimateModel.estimateDuration
        estimateFareView.configure(withViewModel: estimateViewModel)
    }
```

# **Tổng kết**

Trong bài này chúng ta đã được trang bị những kiến thức cơ bản về 1 số Design Pattern – 1 công cụ mạnh mẽ trong lập trình iOS. Ta đã điểm qua được những Design Pattern tiêu biểu cho từng nhóm:  Singleton, Decorator, Strategy. Chúng ta không cần thiết áp dụng Design pattern vào từng dòng code mà ta viết, thay vào đó, hãy cân nhắc lựa chọn Design Pattern phù hợp để giải quyết từng bài toán cụ thể, nhất là khi ta mởi chỉ đang ở giai đoạn thiết kế phần mềm. Chúng sẽ giúp ta code dễ dàng hơn và code cũng trở nên gọn gàng, đẹp đẽ hơn.