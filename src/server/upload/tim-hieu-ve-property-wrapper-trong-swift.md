# I. Giới thiệu
Trong sự kiện WWDC 2019, có 2 framework mà chúng ta cần quan tâm nhiều nhất: SwiftUI framework và Combine framework. Cả 2 framework này đều cực kỳ quan trọng, tương lai của lập trình iOS sẽ sử dụng rất nhiều 2 framework này.
* SwiftUI: Đây là framework sẽ thay đổi cách chúng ta xây dựng UI, và bởi vì UI có tác động tương đối lớn đến cách chúng ta sắp xếp code logic, code iOS sẽ thay đổi rất nhiều trong tương lai. Nếu theo dõi các bài viết gần đây của tôi liên quan đến SwiftUI, các bạn có thể thấy sự thay đổi này.
* Combine: Đây là framework giúp chúng ta xử lý dữ liệu theo thời gian. Tư tưởng của nó cũng khá giống với RxSwift, cũng có những thứ tương tự như Observable ,subscribe,.. của RxSwift.

Vậy thì 2 framework này liên quan gì đến property wrapper? và property wrapper là cái gì mà chúng ta cần phải tìm hiểu? Câu trả lời là property wrapper rất quan trọng với cả 2 framework này, cả 2 đều sử dụng property wrapper rất nhiều. Và bởi vì SwiftUI và Combine đều sẽ được sử dụng nhiều trong tương lai, thế nên là property wrapper cũng sẽ là thứ rất quan trọng cần phải biết.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về property wrapper, cách sử dụng property wrapper trong code thực tiễn.

# II. Nội dung
## 1. Property wrapper là gì

Cái tên của property wrapper cũng đã mang nhiều ý nghĩa, property wrapper là vỏ bọc của property. Về cơ bản, property wrapper là một cấu trúc dữ liệu, nó sẽ đóng gói property, và bổ xung thêm một vài chức năng cho property đó. 
Property wrapper có thể là dạng struct, class hoặc enum. Trước Swift 5.1, Swift đã có nhiều builtin wrappers như lazy, @NSCopying, và SwiftUI cũng có nhiều builtin wrappers như @State, @Binding,… Từ Swift 5.1 trở đi, chúng ta có thể viết thêm các custom property wrapper để phục vụ mục đích của mình

Lý thuyết thì khá là khó hiểu, dưới đây chúng ta sẽ cùng thực hành, tìm hiểu cách viết property wrapper.

## 2. tạo Property wrapper

Đầu tiên, các bạn mở Xcode, tạo 1 Playground project mới để chúng ta bắt đầu viết code: Xcode -> File -> New -> Playground… -> Blank -> Create project.

Bây giờ, giả định chúng ta cần viết code để biến đoạn string từ chữ viết thường sang viết hoa. Tất nhiên là String đã hỗ trợ hàm uppercased() nên chúng ta hoàn toàn có thể viết đơn giản như sau:
```Swift
 var str = "Hello, playground"
str.uppercased()
```
Trong trường hợp không muốn phải gọi hàm uppercased() mà vẫn muốn str biến thành chữ hoa thì sao? Câu trả lời là chúng ta sẽ tạo wrapper cho String, trong wrapper này sẽ xử lý gọi uppercased() mỗi khi get/set cho String

Đầu tiên, tạo Struct wrapper cho String như sau:
```Swift

@propertyWrapper // 1
struct Uppercased {
    var value: String // 2
    
    var wrappedValue: String {	// 3
        get {
            value.uppercased()
        }
        set {
            value = newValue
        }
    }
    	// 4
    init(wrappedValue: String)  {
        self.value = wrappedValue
    }
}
```

Trong đoạn code trên, chúng ta lần lượt làm các việc:
* 1. Khai báo keyword @propertyWrapper để compiler biết được struct Uppercased là một dạng property wrapper
* 2. Khai báo property value để giữ data của String
* 3. Khai báo computed property wrappedValue để thực hiện code mỗi khi get/set cho String
* 4. Tạo hàm khởi tạo cho property wrapper struct

Trong các phần trên, các bạn cần lưu ý wrappedValue. Đây là property bắt buộc phải có của @propertyWrapper, và cũng chính là String của chúng ta. wrappedValue có thể là computed property hoặc stored property, vì thế nên thay vì viết như trên chúng ta hoàn toàn có thể viết struct Uppercased như sau:
```Swift
@propertyWrapper
struct Uppercased2 {
    var wrappedValue: String {
        didSet {
            self.wrappedValue = self.wrappedValue.uppercased()
        }
    }
}
```

Bên trên, chúng ta khai báo wrappedValue dạng stored property. Nhưng các bạn cần lưu ý khi gán giá trị khởi tạo, didSet sẽ chưa được gọi trong lần đầu tiên, bên dưới tôi sẽ nói về vấn đề này.

## 3. Sử dụng property wrapper
Ok, chúng ta đã tạo được property wrapper Uppercased và Uppercased2 rồi, bây giờ chúng ta sẽ tìm hiểu cách sử dụng nó. Cách sử dụng property wrapper rất đơn giản, các bạn chỉ cần sử dụng keyword ‘@‘ + tên struct trước khai báo property

```Swift
// 1
struct Sample {
    @Uppercased var str = "Hello, playground"		// 2
    @Uppercased2 var str2 = "Hello, playground"	// 3
}

// 4
var sample = Sample()
print(sample.str)
print(sample.str2)
```

Trong code trên, chúng ta lần lượt làm:
* 1. Define struct Sample để sử dụng property wrapper. 
* 2. Khai báo property str với kiểu String, và wrapped trong Uppercased
* 3. Khai báo property str2 với kiểu String, và wrapped trong Uppercased2
* 4. In 2 string str, str2 ra console log

Bên trên, Uppercased và Uppercased2 được sử dụng bằng cách thêm chữ ‘@’ vào trước, và lúc này 2 String str và str2 đã được wrap trong property wrapper. Nhìn lại trong 2 property wrapper struct, wrappedValue đề là dạng string, nên 2 struct này chỉ dùng cho các String. Nếu chúng ta viết:

```Swift
struct Sample {
    @Uppercased var str = 1
    @Uppercased2 var str2 = "Hello, playground"
}
```

Lỗi trả về:
```
Cannot convert value of type 'Int' to expected argument type 'String'
```
Bởi vì str được gán giá trị bằng 1, tức là nó được ngầm định là dạng Int, mà struct Uppercased lại có wrappedValue là dạng String, nên nó chỉ chấp nhận dạng String, compiler sẽ báo lỗi.

Chúng ta hoàn toàn có thể viết class/struct property wrapper dạng generic để đa dạng hoá các kiểu dữ liệu mà property wrapper có thể dùng. Chúng ta sẽ thực hiện việc này trong phía dưới của bài viết này.

Lưu ý, khi str và str2 được in ra trên console log, kết quả:
```Swift
HELLO, PLAYGROUND	// str
Hello, playground	// str2
```

chỉ str ra kết quả mong muốn, còn str2 thì không. Bởi vì khi khởi tạo giá trị ban đầu cho str2, didSet của wrappedValue chưa được gọi vào. Để didSet được gọi, chúng ta cần thay đổi giá trị của str2:
```Swift
sample.str2.append("2")
print(sample.str2)	// HELLO, PLAYGROUND2
```

Trong bản Swift 5.1 hiện tại, property wrapper chỉ có thể sử dụng với property của class/struct, chứ chưa thể khai báo dạng top-level hoặc biến của function.

Trường hợp khai báo bên ngoài struct Sample:
```Swift
@Uppercased var str = "Hello, playground"
```

Lỗi trả về:
```
Property wrappers are not yet supported in top-level code
```

Trường hợp khai báo bên trong function:
```Swift
struct Sample {
    @Uppercased var str = "Hello, playground"
    @Uppercased2 var str2 = "Hello, playground"
    
    func testFunction () {
        @Uppercased var testString = "Hello, playground"
        print(testString)
    }
}
```

Lỗi trả về:
```
Property wrappers are not yet supported on local properties
```

## 4. Tạo generic property wrapper với initial value

Bây giờ chúng ta sẽ tạo một property wrapper struct để sử dụng cho các optional property, khai báo giá trị mặc định và gán cho property mỗi khi nó nil
```Swift
@propertyWrapper
// 1
struct DefaultValue<Value> {
    private let defaultValue: Value

    var wrappedValue: Value? {
        didSet {
            if self.wrappedValue == nil {
                self.wrappedValue = defaultValue
            }
        }
    }
    // 2
    init(defaultValue: Value) {
        self.defaultValue = defaultValue
        self.wrappedValue = defaultValue
    }
}


struct Sample {
	// 3
    @DefaultValue(defaultValue: 0) var number: Int?
    @DefaultValue(defaultValue: "Hello") var helloString: String?
}
// 4
print(sample.number)				Optional(0)
print(sample.helloString)		Optional("Hello")
sample.helloString = "hi Viblo"
print(sample.helloString)		Optional("hi Viblo")

```

Code bên trên lần lượt làm:
* 1. Tạo generic struct property Wrapper để sử dụng được nhiều kiểu dữ liệu
* 2.  Viết hàm khởi tạo để gán giá trị mặc định cho wrapper
* 3. Tạo property với wrapper là DefaultValue. ở đây chúng ta khởi tạo luôn giá trị mặc định của mỗi wrapper
* 4. Khi in ra console log, cả 2 property number và helloString đều chưa được gán giá trị, và đều được nhận giá trị mặc định của wrapper. Khi gán giá trị cho helloString, nó sẽ có giá trị của riêng nó, như logic viết trong DefaultValue wrapper

## 5. sử dụng với UserDefaults
sử dụng property wrapper với UserDefaults là ví dụ thực tế nhất mà chúng ta có thể áp dụng ngay trong project. Thông thường, để get/set giá trị cho UserDefaults, chúng ta làm như sau:
```Swift
UserDefaults.standard.set(true, forKey: "isPaymentEnabled")
UserDefaults.standard.bool(forKey: "isPaymentEnabled")
```

Code trên không dài, chỉ 1, 2 dòng code. Tuy nhiên khi phải làm việc nhiều với UserDefaults, sẽ là tuyệt vời hơn khi có thể rút ngắn đoạn code bên trên. Property wrapper sẽ giúp chúng ta làm việc này.
```Swift
@propertyWrapper
struct UserDefault<Value> {
    var key: String
    var initialValue: Value
    var wrappedValue: Value {
        set {
            UserDefaults.standard.set(newValue, forKey: key)
        }
        get {
            UserDefaults.standard.object(forKey: key) as? Value ?? initialValue
        }
    }
}

struct Sample {
    @UserDefault(key: "isPaymentEnabled", initialValue: false) var paymentEnabled: Bool
}


var sample = Sample()
print(sample.paymentEnabled)		// false
sample.paymentEnabled = true
print(sample.paymentEnabled)		// true
```

Cuối cùng, với sự trợ giúp của property wrapper, chúng ta có thể dùng Userdefaults như dùng một property bình thường

# III. Kết luận

Trên đây, tôi đã giới thiệu về property wrapper, ý nghĩa của nó đối với iOS trong tương lai, và cách tạo custom wrapper để sử dụng trong project. Xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day.