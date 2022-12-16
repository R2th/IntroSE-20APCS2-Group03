Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@vialyx/swift-course-advanced-operators-1c86f4ae7d67

Làm thế nào để viết toán tử của riêng bạn?
Bạn có thể đọc tài liệu chính thức trên [Swift.org](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html).
Bài viết này sẽ hướng dẫn một cách ngắn gọn để thực hiện điều này.

### Toán tử nâng cao
Bạn không bị giới hạn các toán tử đã được **Swift** định nghĩa. **Swift** cung cấp cho bạn sự tự do để tự định nghĩa các toán tử **infix**, **prefix**, **postfix** và **assignment**, cùng với các giá trị ưu tiên và kết hợp tùy chỉnh. Các toán tử này có thể được sử dụng và chấp nhận trong mã của bạn giống như bất kỳ toán tử nào đã được định nghĩa và thậm chí bạn có thể mở rộng các loại hiện có để hỗ trợ các toán tử tùy chỉnh mà bạn tự định nghĩa.
### Operator Methods
Các **Class** và **Struct** có thể cung cấp việc triển khai riêng của các toán tử đã tồn tại. Điều này được gọi là **overloading** toán tử đã tồn tại.
Ví dụ dưới đây cho thấy cách triển khai toán tử cộng số học **(+)** cho **Struct**. Toán tử cộng số học là toán tử nhị phân vì nó hoạt động trên hai tham số và được gọi là **infix** vì nó xuất hiện ở giữa hai tham số đó.
```
struct Vector2D {
    var x = 0.0, y = 0.0
}

extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}

let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector is a Vector2D instance with values of (5.0, 5.0)
```
#### Toán tử Prefix và Postfix
Ví dụ hiển thị ở trên cho thấy việc triển khai tùy chỉnh cho toán tử nhị phân. Các Class và Struct cũng có thể cung cấp việc triển khai các toán tử đơn nguyên tiêu chuẩn. Toán tử đơn nguyên hoạt động trên một tham số duy nhất. Chúng là tiền tố nếu chúng đứng trước các toán tử đích của chúng (chẳng hạn như -a) và các toán tử hậu tố nếu chúng tuân theo mục tiêu của chúng (chẳng hạn như b!).
```
postfix operator ~~~

struct Engine {
    var tank: Float
    var consumption: Float
    var distance: Float
    var consumptionTarget: Float?
    
    static prefix func ~ (engine: Engine) -> Engine {
        return Engine(tank: engine.tank,
                      consumption: engine.consumption,
                      distance: engine.distance,
                      consumptionTarget: engine.distance / engine.tank)
    }
    
    static postfix func ~~~ (engine: Engine) -> Engine {
        return Engine(tank: engine.tank,
                      consumption: engine.consumption,
                      distance: engine.tank / engine.consumption * 100,
                      consumptionTarget: engine.consumptionTarget)
    }
    
}

let truck = Engine(tank: 400.0, consumption: 20.0, distance: 1300.0, consumptionTarget: nil)
let calculatedTruck = ~truck

print("target: \(String(describing: calculatedTruck.consumptionTarget))")
/*
 target: Optional(3.25)
 */

let maxDistanceTruck = truck~~~

print("max distance: \(String(describing: maxDistanceTruck.distance))")
/*
 max distance: 2000.0
 */
```
### Mức độ ưu tiên cho tuỳ chỉnh các toán tử Infix
Các toán tử **infix** tùy chỉnh thuộc về một nhóm ưu tiên. Một nhóm ưu tiên chỉ định một ưu tiên của toán tử điều khiển liên quan đến các toán tử **infix** khác, cũng như tính kết hợp của toán tử. Xem [Ưu tiên và Kết hợp](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID41) để biết thêm về cách các đặc điểm này ảnh hưởng đến tương tác toán tử **infix** với các toán tử **infix** khác.
Một toán tử **infix** tùy chỉnh không được đặt vào một nhóm ưu tiên rõ ràng sẽ được đưa ra một nhóm ưu tiên mặc định với mức độ ưu tiên ngay lập tức cao hơn mức ưu tiên của toán tử điều kiện phía trước.
Chúng ta hãy tạo ra một toán tử kết hợp hai engine thành một engines tốt nhất.
```
infix operator +++: AdditionPrecedence

extension Engine {
    
    static func +++ (left: Engine, right: Engine) -> Engine {
        let tank = max(left.tank, right.tank)
        let consumption = min(left.consumption, right.consumption)
        return Engine(tank: tank,
                      consumption: consumption,
                      distance: tank / consumption * 100,
                      consumptionTarget: nil)
    }
    
}

let badTruck = Engine(tank: 100, consumption: 8, distance: 250, consumptionTarget: nil)
let goodTruck = Engine(tank: 500, consumption: 20, distance: 250, consumptionTarget: nil)
let bestTruck = badTruck+++goodTruck

print("The best truck is \(bestTruck)")
/*
 The best truck is Engine(tank: 500.0, consumption: 8.0, distance: 6250.0, consumptionTarget: nil)
```
Bạn đã làm được! Vỗ tay! Vỗ tay!