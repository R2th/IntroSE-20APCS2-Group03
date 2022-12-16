Theo thông tin trên trang https://swift.org/, ngày 16/11/2018, Swift 5.0 đã có những thay đổi cuối cùng để chuẩn bị release. Có rất nhiều tính năng mới, thú vị và hữu ích sẽ xuất hiện trong phiên bản này. Vậy chúng ta hãy cùng nhau khám phá những tính năng đó là gì nhé!
## 1. Raw string
Thông thường, ở trong một String, những kí tự như `\ " ` ... được trình biên dịch hiểu là các kí tự thoát (escapes characters) và kí tự chấm dứt chuỗi (string terminators). Tuy nhiên, với Raw String thì những kí tự này sẽ được coi là các kí tự bình thường. Để tạo Raw String, chúng ta chỉ cần đặt String đó vào trước và sau 1 hoặc nhiều dấu `#`. Ví dụ:

```
let sentence1 = #"He said: "I'm hungry"."#
let sentence2 = ###"He said: "I'm thirsty"."###
```

Khi đó, dấu `"` đứng trước từ `I'm` không còn được coi là kết thúc String nữa mà được trình biên dịch coi như 1 kí tự thông thường. Tương tự đối với dấu `\`:

`let temp = #"iOS\Swift\5.0"#`

Tuy nhiên điều này dẫn đến sự thay đổi khi bạn sử dụng chuỗi nội suy (string interpolation). Ví dụ:

```
let age = 22
let sentence = #"She is \#(age) years old."#
```

Khi đó bạn phải thêm dấu `#` nếu muốn dùng chuỗi nội suy.
Như mình đã nói ở trên, có thể dùng nhiều kí tự `#` để tạo Raw String. Có thể bạn đang nghĩ rằng dùng 1 dấu `#` là được rồi cần gì phải nhiều. Tuy nhiên có 1 vài trường hợp khá đặt biệt bạn sẽ phải dùng tới nó. Ví dụ với chuỗi 

`"He said: "I'm hungry"#hesaid"`

nếu dùng 1 dấu `#` thì sẽ là: 

`let sentence = #"He said: "I'm hungry"#hesaid"#`

Bạn có thể thấy có kí tự `"#` trong chuỗi nên trình biên dịch sẽ hiểu đó là kí tự kết thúc của Raw String. Vậy nên ta phải dùng nhiều dấu `#` để tạo Raw String trong trường hợp này:

`let sentence = ##"He said: "I'm hungry"#hesaid"##`

Thêm 1 tính năng thú vị nữa của Raw String là đối với chuỗi nhiều dòng chỉ cần dùng `#"""` và `"""#`

```
let introduce = #"""
My name is Hung,
I'm 22 years old,
Nice to meet you.
"""#
```

## 2. Quản lý các enum cases trong tương lai
Trong Swift, khi sử dụng switch thì các case phải cover hết các trường hợp. Ví dụ:
```
enum State {
    case success
    case fail
    case timeout
}

func showMessage(state: State) {
    switch state {
    case .success:
        print("Success")
    case .fail:
        print("Failure")
    default:
        print("Something went wrong")
    }
}
```
Và sau này sinh ra thêm  `case pending` trong `State`, khi đó function của chúng ta vẫn sẽ chỉ thông báo `Something went wrong`. Swift tất nhiên sẽ không thể thông báo lỗi cho chúng ta. Tuy nhiên với Swift 5.0 chúng ta hoàn toàn có thể quản lý được điều này. Chỉ cần thêm `@unknown` vào trước `default`, ta sẽ nhận được warning mỗi khi thêm 1 case mới:
```
func showMessage(state: State) {
    switch state {
    case .success:
        print("Success")
    case .fail:
        print("Failure")
    @unknown default:
        print("Something went wrong")
    }
}
```
## 3. Nested optionals resulting from try?
Kể từ Swift 5.0, cách mà try? hoạt động sẽ giống như cơ chế của optional chaining. Hãy xem thử ví dụ:
```
struct User {
    var id: Int
    
    init?(id: Int) {
        if id < 1 {
            return nil
        }
        self.id = id
    }
    
    func getMessages() throws -> String {
        // complicated code here
        return "No messages"
    }
}

let user = User(id: 1)
let messages = try? user?.getMessages()
```
Ta có thể thấy struct `User` có 1 hàm khởi tạo optional nên đối tượng `user` được khởi tạo ở trên là kiểu optional. Ta sử dụng optional chaining để gọi phương thức `getMessages()`. Tuy nhiên phương thức này có thể `throws` nên ta dùng `try?` để tiếp tục chuyển nó sang kiểu optional. Kết quả đối tượng `messages` là kiểu `String??` - optional optional String. Tuy nhiên từ Swift 5.0, `try?` sẽ không wrap giá trị đã là optional nên `messages` sẽ chỉ là kiểu `String?`. Có thể thấy cách hoạt động này giống với optional chaining khi cho dù chúng ta có lồng bao nhiêu tầng optional đi nữa thì kết quả cuối cùng vẫn chỉ có 1 tầng optional.
## 4. Kiểm tra bội số
Swift 5.0 sẽ cung cấp thêm phương thức `isMultiple(of:)` của integer để kiểm tra bội số thay vì sử dụng `%` như trước
```
if number.isMultiple(of: 2) {
    print("Even")
} else {
    print("Odd")
}
```
## 5. Phương thức count với Sequence
Tiếp tục là một phương thức mới nữa là `count(where:)` , nó có thể áp dụng cho các kiểu conform giao thức `Sequence`. Cách hoạt động giống với `filter()`
```
let numbers = [1, 2, 3, 4, 5]
let count = numbers.count { $0.isMultiple(of: 2) }
```
Kết quả là nó sẽ đếm những phần tử thỏa mãn điều kiện trong closure.
## 6. Biến đổi các giá trị của Dictionary với compactMapValues()
Đối với mảng, phương thức `compactMap()` sẽ biến đổi giá trị, unwrap các kết quả, loại bỏ nil thì phương thức `compactMapValues()` trong `Dictionary` sẽ giữ nguyên các `key` và biến đổi các `values`.
```
let ages = [
    "Hung": "22",
    "Long": "23",
    "Dong": nil,
    "Son": "Not determine"
]
```
Chúng ta có thể dùng để lọc lấy các value là số nguyên như sau:

`let age1 = ages.compactMapValues { Int($0) }`

hoặc

`let age2 = ages.compactMapValues (Int.init)`

Còn nếu muốn lấy các value không nil thì cũng chỉ cần

`let age3 = ages.compactMapValues { $0 }`

Nguồn: https://www.hackingwithswift.com/articles/126/whats-new-in-swift-5-0