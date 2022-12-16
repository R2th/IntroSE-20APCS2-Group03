### 1. allSatisfy - kiểm tra xem collection có thoả mãn điều kiện không
Từ Swift 4.2 chúng ta có hàm **allSatisfy()** cho các collection (array, set, …). Hàm này nhận vào một điều kiện, và trả về **true** nếu tất cả các phần tử trong collection đó thoả mãn điều kiện này.

Ví dụ, chúng ta có array sau để chứa điểm thi của một lớp học:
```swift
let scores = [5, 8, 7, 9, 10]
```

Giả sử 5 điểm là đủ để qua môn, chúng ta có thể kiểm tra liệu tất cả học sinh trong lớp có qua môn không bằng cách:
```swift
let passed = scores.allSatisfy { $0 >= 5 } // true
```

### 2. Public getter, private setter

**Access control** là một tính năng rất tuyệt vời của swift. Chắc bạn cũng hay sử dụng các access control như **public, private** cho các property của class để kiểm soát việc code ở nơi khác access các property này, và làm mục đích dòng code của chúng ta rõ ràng hơn. Nhưng liệu bạn có biết chúng ta có thể sử dụng 2 loại access control cùng lúc. Hãy xem ví dụ sau:

Chúng ta có một struct tên Bank:
```swift
struct Bank {
    var address: String
}
```
Sau đó chúng ta khởi tạo một instance của struct này:
```swift
let richBank = Bank()
```

Chúng ta không sử dụng access control nào với property **address**, nghĩa là code ở đâu cũng có thể đọc và thay đổi giá trị **address** của **richBank**. Còn nếu chúng ta sử dụng **private** cho address, code ở nơi khác không thể thay đổi hay đọc giá trị của nó.

Tuy nhiên, sẽ có những lúc bạn muốn code ở chỗ khác có thể đọc giá trị address, nhưng chỉ có nội bộ **richBank** mới có thể thay đổi giá trị của property này. Swift cung cấp một cách rất dễ dàng để làm việc này: **public private(set)**.

Khi sử dụng cú pháp này, một property có thể được đọc ở bất cứ đâu, nhưng chỉ có thể được thay đổi nội bộ. Cụ thể trong ví dụ của chúng ta, ai cũng có thể đọc địa chỉ của **richBank**, nhưng chỉ có bản thân **richBank** mới có thể thay đổi địa chỉ của nó.

```swift
struct Bank {
    public private(set) var address: String
    
    public mutating func setAddress(newAddress: String) {
        self.address = newAddress
    }
}

let richBank = Bank(adress: "Rich Street")
print(richBank.address) // Rich Street

richBank.address = "Poor Street" // Error
richBank.setAddress("Poor Street") // OK

```

### 3. Static vs class properties
**Class properties** trong Swift có thể được tạo lập bằng cách sử dụng một trong hai keyword: **static** và **class**.

Cả 2 đều khiến cho property trở thành property chung ở mọi instance của class, tuy nhiên keyword **static** có tính **final**, tức là property được tạo lập với keyword static sẽ không thể override ở các subclass.

Ví dụ, chúng ta có thể tạo một class **Building** có một class property dùng để chứa địa chỉ, và một static property dùng để chứa tên những người đồng sở hữu Building này:
```swift
class Building {
    class var address: String {
        return "Awesome Street"
    }
    
    static var owners: [String] {
        return ["Good leader", "Evil boss"]
    }
}
```
Bởi vì address là một class property, nó có thể được thay đổi bởi các subsclass của Building. Ngược lại, owners là một static property không thể thay đổi được trong các subclass.
```swift
class Villa: Building {
    // Có thể override được class var
    override class var address: String {
        return “Not-that-awesome Street 
    }

    // Nhưng không được phép override static var
    override static var owners: [String] { 
        return [“Grandma”, “Grandpa”]
    } // Error
}
```

### 4. == vs. === 
Trong Swift có một protocol tên **Equatable**. Khi một type áp dụng protocol này, chúng ta có thể sử dụng operator “==” để kiểm tra xem 2 giá trị thuộc type đó có giống nhau không. Ví dụ:
```swift
1 == 1 // true
“kayak” == String(“kayak”.reversed()) // true
[2, 4, 6] == [1, 2, 3].map { $0 * 2 } // true
```

Khi bạn tạo mới một type, bạn chỉ cần cho type đó áp dụng protocol Equatable là có thể sử dụng **==.** Tuy nhiên, nếu bạn sử dụng class và muốn so sánh 2 instance của class với nhau thì bạn còn có một lựa chọn nữa. 

Bởi vì một instance của class chỉ là một **reference** đến **địa chỉ** của class đó trong memory, bạn có thể dùng operator **===** để kiểm tra xem liệu 2 instance của một class có cùng trỏ đến một địa chỉ hay không.

```swift
class Lightsaber {
    var color: String!
    
    init(color: String) {
        self.color = color
    }
}

let firstSaber = Lightsaber(color: “Blue”)
let secondSaber = firstSaber
print(firstSaber === secondSaber) // true
```

Bạn có thể thấy class trên không cần áp dụng protocol **Equatable** nhưng vẫn có thể so sánh các instance với nhau. **===** còn được gọi là **identity** operator.

### 5. Tạo giá trị default cho property của protocol bằng cách sử dụng extension

Chúng ta hẳn đều biết có thể tạo **default implementation** cho 1 method của protocol bằng cách sử dụng **extension**. Tuy nhiên, chúng ta cũng có thể sử dụng extension để gán giá trị default cho các **property** của protocol.

Ví dụ, chúng ta có thể tạo protocol tên **Fadeable** dùng để làm mờ view trong vài giây nhất định:
```swift
protocol Fadeable {
    var fadeSpeed: TimeInterval { get }
    func fadeOut() 
}
```
Thay vì để mỗi type áp dụng protocol này tự thêm giá trị cho **fadeSpeed** và implement method **fadeOut()**, chúng ta có thể tạo giá trị default cho cả hai trong extension:
```swift
extension Fadeable where Self: UIView {
    var fadeSpeed: TimeInterval {
        return 1.0
    }

    func fadeOut() {
        UIView.animate(withDuration: fadeSpeed) {
        self.apha = 0
    }
}
```
Sau đó, chúng ta có thể cho các subclass áp dụng protocol này mà không cần phải viết đi viết lại các giá trị default kể trên:
```swift
class MyViewClass: UIView, Fadeable {}
```

Trên đây là 5 thủ thuật ngắn gọn những hữu ích trong Swift. Hi vọng bài viết của mình có thể giúp các bạn code hiệu quả hơn :D.