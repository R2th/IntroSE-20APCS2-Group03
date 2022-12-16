### Giới thiệu

![](https://viblo.asia/uploads/6cb842a2-1b78-4c36-9e4a-030d3f0fdbaa.png)

Ở phần 1, chúng ta đã tìm hiểu về khái niệm cũng như so sánh sự khác nhau giữa **Value types** và **Reference types**. 

Ở phần 2 này, chúng ta tiếp tục tìm hiểu sâu hơn, làm thế nào để linh hoạt sử dụng chúng trong project thực tế. 

Chúng ta cùng tìm hiểu nhé!

### Mixing Value and Reference Types

Bạn thường gặp phải các trường hợp là **Reference types** chứa  **Value types** và ngược lại. Điều này có thể khiến các đối tượng trở nên tương đối phức tạp. 
Chúng ta hãy cùng nghiên cứu các trường hợp sau:

#### Reference Types Containing Value Type Properties

Ví dụ: Chúng ta có class **Person** lưu thông tin của người  và structure **Address** lưu thông tin địa điểm của người đó.

```Swift
struct Address {
  var streetAddress: String
  var city: String
  var state: String
  var postalCode: String
}
```

```Swift
class Person {          // Reference type
  var name: String      // Value type
  var address: Address  // Value type

  init(name: String, address: Address) {
    self.name = name
    self.address = address
  }
}
```

Mỗi instance của class Person có property instance kiểu value type và không được chia sẻ.  Vì vậy sẽ không có nguy cơ hai người khác nhau chia sẻ và bất ngờ thay đổi địa chỉ của người kia.
Để xác nhận tính năng này, chúng ta cùng theo dõi đoạn code dưới đây:

```Swift
// 1
let kingsLanding = Address(streetAddress: "1 King Way", city: "Kings Landing", state: "Westeros", postalCode: "12345")
let madKing = Person(name: "Aerys", address: kingsLanding)
let kingSlayer = Person(name: "Jaime", address: kingsLanding)

// 2
kingSlayer.address.streetAddress = "1 King Way Apt. 1"

// 3
madKing.address.streetAddress  // 1 King Way
kingSlayer.address.streetAddress // 1 King Way Apt. 1
```

Chúng ta tạo hai Person object giống nhau Address Instance. Sau đó bạn thay đổi address của một person. Cuối cùng bạn xác nhận lại rằng hai address khác nhau. Thậm chí là mỗi object được tạo sử dụng chung address, thay đổi một trong hai cũng không ảnh hưởng tới cái còn lại.

#### Value Types Containing Reference Type Properties

Chúng ta đến với ví dụ trong đó **value type** chứa **reference type**

```Swift
struct Bill {
  let amount: Float
  let billedTo: Person
}
```

Mỗi bản copy của **Bill** là duy nhất, tuy nhiên **billedTo** object sẽ được chia sẻ bởi một vài **Bill** instance.
Điều này khá là phức tạp nếu bạn muốn so sánh hai **Bill** object. Chúng ta cùng thử đoạn code sau:

```Swift
// Do not add this to your playground!

extension Bill: Equatable { }
func ==(lhs: Bill, rhs: Bill) -> Bool {
  return lhs.amount == rhs.amount && lhs.billedTo === rhs.billedTo
}
```

Sử dụng operator "===" để kiểm tra hai object có reference giống nhau hay không.

### Getting Value Semantics From Mixed Types

Chúng ta tạo một **Person** dựa trên **Address**  và name

```Swift
// 1
let billPayer = Person(name: "Robert", address: kingsLanding)

// 2
let bill = Bill(amount: 42.99, billedTo: billPayer)
let bill2 = bill

// 3
billPayer.name = "Bob"

// Inspect values
bill.billedTo.name    // "Bob"
bill2.billedTo.name   // "Bob"
```

Sau đó bạn tạo một instance của **Bill** sử dụng cài đặt mặc định và tạo một bản copy của instance đó.
Cuối cùng, bạn thay đổi **name** trong Person object và nó đã ảnh hưởng tới các instance của **Bill**.

### Copying References During Initialization

Thay thế việc implement **Bill** bởi đoạn dưới đây:

```Swift
struct Bill {
  let amount: Float
  let billedTo: Person

  init(amount: Float, billedTo: Person) {
    self.amount = amount
    // Create a new Person reference from the parameter
    self.billedTo = Person(name: billedTo.name, address: billedTo.address)
  }
}
```

Tất cả bạn thêm ở đây đều được cài đặt rõ ràng. Thay vì đơn giản assign **billedTo**, bạn tạo mới instance **Person** giống data (tên và address)

```Swift
bill.billedTo.name    // "Robert"
bill2.billedTo.name   // "Robert"

bill.billedTo.name = "Bob"

// Inspect values
bill.billedTo.name    // "Bob"
bill2.billedTo.name   // "Bob"
```

Issue lớn ở đây chính là bạn có thể truy cập **billedTo** từ bên ngoài struct, điều đó nghĩa rằng nó có thể bị thay đổi ngoài mong muốn.
Vậy làm thế nào để giải quyết vấn đề này?

### Using Copy-on-Write Computed Properties

Navite Swift value types đã implement một tính năng rất tuyệt vời đó là **copy-on-write**.
Chúng ta cùng theo dõi đoạn code implement **Bill** dưới đây:

```Swift
struct Bill {
  let amount: Float
  private var _billedTo: Person // 1

  // 2
  var billedToForRead: Person {
    return _billedTo
  }
  // 3
  var billedToForWrite: Person {
    mutating get {
      _billedTo = Person(name: _billedTo.name, address: _billedTo.address)
      return _billedTo
    }
  }

  init(amount: Float, billedTo: Person) {
    self.amount = amount
    _billedTo = Person(name: billedTo.name, address: billedTo.address)
  }
  
    mutating func updateBilledToAddress(address: Address) {
    billedToForWrite.address = address
  }

  mutating func updateBilledToName(name: String) {
    billedToForWrite.name = name
  }
}
```

Bạn có thể thấy rằng vấn đề trên đã được giải quyết. Bạn có thể lấy data từ **billedToForRead** và thay đổi bằng việc sử dụng **billedToForWrite**

### Kết Luận

Qua bài biết  chúng ta đã tìm hiểu rõ khái niệm, sự khác nhau và sử dụng Reference vs Value Types như thế nào.
Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_

[https://www.raywenderlich.com/112029/reference-value-types-in-swift-part-2](https://www.raywenderlich.com/112029/reference-value-types-in-swift-part-2)
[https://developer.apple.com/swift/blog/?id=10](https://developer.apple.com/swift/blog/?id=10)