### CaseIterable 
Swift 4.2 đã giới thiệu một protocol mới CaseIterable tự động tạo ra một thuộc tính mảng của tất cả các case trong một enum. Một enum tuân thủ thức CaseIterable, tại thời gian biên dịch Swift sẽ tự động tạo thuộc tính allCases là một mảng của tất cả các trường hợp enum đó theo thứ tự khai báo. 

![](https://images.viblo.asia/d3004105-e4ed-4ec0-93b5-8cacc6b78151.png)

Swift không thể tổng hợp thuộc tính allCases nếu bất kỳ trường hợp enum nào được đánh dấu là @available   "case all"  không khả dụng .

![](https://images.viblo.asia/42f5b26a-afce-47c8-90bc-b9eb17a63e9b.png)

 Vì vậy, nếu bạn cần allCases thì bạn sẽ cần phải thêm nó, như thế này:
```
    static var allCases: [Direction] {
        return [.north, .south, .east, .west]
    }
```
Lưu ý: Bạn phải thêm protocol CaseIterable vào khai báo ban đầu của enum chứ không phải là extension để mảng allCases được tổng hợp - bạn không thể sử dụng tiện ích mở rộng để thực hiện lại các enum hiện có tuân theo giao thức.
### # arning và #error
Thêm cảnh báo và  lỗi cho mã của bạn. Ví dụ: bạn có thể muốn đánh dấu đoạn code là cần được sửa ..
Swift 4.2 đã giới thiệu các chỉ thị trình biên dịch mới giúp chúng tôi đánh dấu các vấn đề như vậy trong các đoạn code. Chúng sẽ quen thuộc với bất kỳ  ai đã từng sử dụng Objective-C trước đó, ở Swift 4.2 chúng ta cũng có thể sử dụng được chúng .
 #warning và #error: 
Cả hai đều hoạt động theo cùng một cách: #warning("Some message") và #error("Some message") Ví dụ:
```
func encrypt(_ string: String, with password: String) -> String {
    #warning("This is bad method of encryption")
    return password + String(string.reversed()) + password
}

struct Configuration {
    var apiKey: String {
        // if you uncomment the below it will stop your code from building
        // #error("Please add your API key below then delete this line.")
        return "Enter your API key here"
    }
}    
```

```
#if os(macOS)
#error("MyLibrary is not supported on macOS.")
#endif
```
#warning và #error đều làm việc cùng với chỉ thị #if trình biên dịch hiện tại, chỉ được kích hoạt nếu điều kiện được đánh giá là true.

Cả #warning và #error đều hữu ích vì các lý do khác nhau:

#warning hữu ích như một lời nhắc nhở cho bản thân hoặc người khác rằng một số công việc chưa hoàn thành. Các Xcode templates thường sử dụng #warning để đánh dấu các phương thức mà bạn nên thay thế bằng mã của riêng bạn. 
#error  hữu ích nếu bạn gửi thư viện yêu cầu các nhà phát triển khác cung cấp một số dữ liệu. Ví dụ: khóa xác thực cho API web - bạn muốn người dùng bao gồm khóa riêng của họ, do đó, việc sử dụng #error sẽ buộc họ thay đổi mã đó trước khi tiếp tục.
##  @dynamicMemberLookup
Cách xử lý các thuộc tính và phương thức không xác định bằng cách sử dụng  @dynamicMemberLookup
Swift luôn tập trung mạnh vào tính an toàn , nhưng đôi khi bạn cần có khả năng làm việc với dữ liệu mà trước đó cấu trúc không được biết đến.
Để xử lý tình huống này, Swift 4.2 đã giới thiệu một thuộc tính có tên @dynamicMemberLookup, hướng dẫn Swift gọi phương thức subscript khi truy cập các thuộc tính. Phương thức  subscript (dynamicMember : ), được yêu cầu khi sử dụng thuộc tính @dynamicMemberLookup - bạn sẽ nhận được thông qua tên chuỗi của thuộc tính được yêu cầu và có thể trả về bất kỳ giá trị nào bạn muốn.

![](https://images.viblo.asia/9cb70f92-fecd-45c7-ad4b-f56dd1415815.png)

Thuộc tính  name, city và nameOfPet không tồn tại  trong struct Person nhưng vẫn được hiển thị ?
Phương thức subscript (dynamicMember : ) phải trả về một chuỗi, đó là thực thi theo kiểu an toàn của Swift - mặc dù bạn vẫn đang xử lý dữ liệu động, Swift sẽ đảm bảo bạn lấy lại những gì bạn mong đợi.
Nếu bạn muốn nhiều loại khác nhau, chỉ cần triển khai các phương thức subscript (dynamicMember : )  khác nhau :v

```
struct Employee {
    subscript(dynamicMember member: String) -> String {
        let properties =  ["name": "Tayslor Swift", "city": "Nashville"]
        return properties[member, default: ""]
    }

    subscript(dynamicMember member: String) -> Int {
        let properties = ["age": 26, "height": 178]
        return properties[member, default: 0]
    }
}

```

Bất kỳ thuộc tính nào đều có thể được truy cập theo nhiều cách, điều quan trọng là bạn phải rõ ràng thuộc tính nào nên được sử dụng. ví dụ nếu bạn gửi giá trị trả về vào một hàm chỉ chấp nhận các chuỗi hoặc nó có thể rõ ràng, như sau:

let employee = Employee ()

let  age: Int = employee.age

Dù bằng cách nào, Swift phải biết chắc chắn rằng subscript sẽ được gọi.
Bạn cũng có thể overload subscript để trả về closures:

```
@dynamicMemberLookup
struct User {
    subscript(dynamicMember member: String) -> (_ input: String) -> Void {
        return {
            print("Hello! I live at the address \($0).")
        }
    }
}

let user = User()
user.printAddress("123 Swift Street")

```
 kết quả : Hello! I live at the address 123 Swift Street
### randomElement()
lấy random phần tử trong mảng `let array = ["Frodo", "sam", "wise", "gamgee"]`
Thay vì dùng Int(arc4random_uniform(UInt32(array.count)))
```
let array = ["Frodo", "sam", "wise", "gamgee"]
let randomIndex = Int(arc4random_uniform(UInt32(array.count)))
print(array[randomIndex])
```

```
let array = ["Frodo", "Sam", "Wise", "Gamgee"]
print(array.randomElement()!) // Using ! knowing I have array.count > 0
```

###  Hasher

Giá trị băm là một cách để xác định dữ liệu duy nhất và bất kỳ loại nào phù hợp với giao thức Hashable có thể được sử dụng để tạo tất cả hoặc một phần giá trị băm bằng cách sử dụng cấu trúc Hasher.
Để sử dụng điều này, hãy tạo một cá thể của Hasher, cung cấp nó với bất kỳ đối tượng nào bạn muốn băm, sau đó gọi finalize () để tạo ra giá trị cuối cùng dưới dạng một số nguyên. Ví dụ:

```
struct iPad: Hashable {
    var serialNumber: String
    var capacity: Int
}

let first = iPad(serialNumber: "12345", capacity: 128)
let second = iPad(serialNumber: "abcde", capacity: 512)

var hasher = Hasher()
hasher.combine(first)
hasher.combine(second)
let hash = hasher.finalize()
```

###  allSatisfy()
Kiểm tra tất cả các phần tử mảng khớp với điều kiện: 
```
let sWords = ["Swift", "Seahorse", "Solar"]
let allMatch = sWords.allSatisfy { $0.hasPrefix("S") }
let scores = [85, 88, 95, 92]
let passed = scores.allSatisfy { $0 >= 85 }
```

### removeAll(where:)
removeAll các item trong mảng  với điều kiện
```
var pythons = ["John", "Michael", "Graham", "Terry", "Eric", "Terry"]
pythons.removeAll { $0 == "Terry" }
print(pythons)
```
### toggle()
dảo ngược giá trị kiểu bool
```
var loggedIn = false
loggedIn.toggle()
```