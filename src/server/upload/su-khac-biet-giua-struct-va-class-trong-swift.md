Đây là câu hỏi mà bạn rất dễ gặp phải trong các cuộc phỏng vấn lập trình viên iOS. Vậy Struct và Class có điểm gì khác gì nhau ? Chúng ta sẽ phân tích trong bài viết hôm nay\
Trước khi đi vào phân biệt 2 khái niệm trên, hãy nhìn vào những điểm tương đồng giữa chúng.
## Điểm giống nhau 
Với người mới tiếp cận Swift, nhìn cách sử dụng Struct và Class thấy chúng tương đối giống nhau. Về cơ bản, Struct và Class đều thực hiện chung một nhiệm vụ là xây dựng một đối tượng.
  - Đều có thể khai báo các Stored Properties (thuộc tính lưu trữ) và các Functions (phương thức)
  - Hỗ trợ các Subscript Syntax để truy vấn giá trị theo các Subscript 
  ```Swift
 class Count {
     subscript (index: Int) -> String {
         switch index: 
         case 0: return "Zero"
         case 1: return "One"
         case 2: return "True"
         default: return "Many"
 }
 
 let count = Count()
 print (count[0]) // -> In ra "Zero"
 print (count[57]) // -> In ra "Many"
 }
  ```
 
 - Cho phép tạo ra các hàm khởi tạo tuỳ theo mục đích và logic của lập trình viên 
 ```Swift
 struct Employee {
     var code: Int?
     var name: String?
     var address: String?
     
     init(code: Int, name: String, address: String) {
        self.code = code
        self.name = name
        self.address = address
     }
    
     init(name: String, address: String) {
        self.name = name
        self.address = address
     }
 }
 ```


 - Có thể mở rộng với việc sử dụng Extension. Extension là một khái niệm mới trong Swift, cho phép chúng ta mở rộng các Class, Struct đã được xây dựng từ trước (kể cả các đối tượng của hệ thống như Int, Double, String, UIViewcontroller, ...)
 ```Swift
 extension Int {
    func double() -> Int {
        return self * 2
    }
}
var a = 5
print(a.double()) // -> 10
```
 - Có thể implement các Protocol để mở rộng chức năng, hỗ trợ cho lập trình POP (Protocol Oriented Programming)
Chúng ta đã nói về những điểm chung, vậy Struct và Class khác nhau ở điểm gì ???
## Điểm khác nhau
- Điểm khác nhau cơ bản và quan trọng nhất giữa Struct và Class mà bạn luôn phải nhớ đó là Struct là kiểu **Value Type (tham trị)** còn Class là **Reference Type (tham chiếu).**  

 **Value Type**: Mỗi instance giữ một bản sao duy nhất dữ liệu của nó. Nó sẽ tạo một instance mới (bản sao) khi được gán cho một biến, hoặc hằng, hoặc khi được truyền cho một hàm. Do đó, khi thay đổi giá trị của 1 instance, những instance khác không bị thay đổi theo. Xem ví dụ để hiểu hơn về khái niệm này 
```Swift
struct Employee {
    var code: Int
    var name: String
    var address: String
}

var a = Employee(code: 5, name: "BXH", address: "Sun*")
var b = a
b.name = "MH"
print(a.name) //  In ra "BXH"
print(b.name) // In ra "MH"

// Nhận thấy instance a khi được gắn cho b, nó sẽ copy giá
// trị và tạo ra một instance mới có giá trị giống với a nhưng
// độc lập với a. Do đó khi thay đổi name của b, name của a
// không bị thay đổi theo 
```

 **Reference Type**:  Mỗi instance chia sẻ một bản sao dữ liệu. Một kiểu mà khi được khởi tạo, khi được gán cho một biến hoặc hằng hoặc khi được truyền cho một hàm, sẽ trả về một tham chiếu đến cùng instance hiện có. Khái niệm thật khó hiểu đúng không. Đọc ví dụ để dễ hiểu hơn nhé
```Swift
class Employee {
    var code: Int
    var name: String
    var address: String
    
    init(code: Int, name: String, address: String) {
        self.code = code
        self.name = name
        self.address = address
    }
}

var a = Employee(code: 5, name: "BXH", address: "Sun*")
var b = a
b.name = "MH"
print(a.name) // In ra  "MH"
print(b.name) // In ra "MH"
// Khi b được gắn bằng a, cả 2 sẽ cùng tham chiếu tới một
// instance. Do đó khi ta thay đổi name của b, name 
// của a cũng bị thay đổi theo
```

-  Class có tính kế thừa (Inheritance), còn Struct thì không . Tính kế thừa cho phép lớp con (Subclass) mang đầy đủ thuộc tính, phương thức của lớp cha (Superclass). Ví dụ: Chúng ta có thể tạo ra những custom View sau khi kế thừa class UIView.
-  Khi tạo Struct, sẽ mặc định sinh ra một hàm khởi tạo với đầy đủ tham số tương ứng với tất cả Stored Properties (gọi là Memberwise Initializer). Còn Class thì không có. Do đó khi tạo một class, ta sẽ phải khai báo Optional cho các thuộc tính hoặc phải tự định nghĩa một hàm khởi tạo.
-  Class có hàm Denit (khi instance chuẩn bị được giải phóng khỏi bộ nhớ). Chúng ta có thể gọi hàm này để kiểm tra khi cần thiết (đảm bảo instance đã bị huỷ để kiểm tra Retain Cycle)
-  Class là kiểu Reference Type, do đó có thể thay đổi trực tiếp giá trị của các thuộc tính qua phương thức của nó. Còn với Struct ta phải khai báo từ khoá **mutating** trước phương thức để làm việc đó.
```Swift
class Employee {
    var code: Int?
    
    func changeCode(newCode: Int) {
        self.code = newCode
}

struct OtherEmployee {
    var code: Int
    
    mutating func changeCode(newCode: Int) {
        self.code = newCode
    }
}
```
- Ngoài ra, Class hỗ trợ Type Casting, cho phép sử dụng toán tử is và as để kiểm tra hoặc ép kiểu thể hiện của một Class. Struct thì không.
- Class là kiểu tham chiếu, do đó hỗ trợ các toán tử === và !== để kiểm tra các đối tượng có đang trỏ tới cùng một instance hay không.

## Vậy khi nào sử dụng Class, khi nào sử dụng Struct 
Apple định nghĩa Swift là ngôn ngữ theo hướng POP (Protocol Oriental Programming). POP xây dựng dựa trên tính linh hoạt của Struct và Protocol, do đó nhiều thư viện chuẩn của Swift sử dụng Struct (như Int, String, ...). Struct trong nhiều trường hợp cũng an toàn hơn Class trong việc quản lý bộ nhớ. Tuy nhiên không phải lúc nào chúng ta cũng sử dụng Struct.

### Sử dụng Struct khi nào
- Sử dụng Struct khi tạo đối tượng với nhiều thuộc tính có kiểu dữ liệu đơn giản, thường ở kiểu giá trị (như Int, Float, String, ...)
- Khi làm việc đa luồng. Ví dụ kết nối database được thực hiện trên một luồng  song với luồng Main, việc sử dụng Struct an toàn hơn do nó có thể copy giá trị từ luồng này sang luồng khác.
- Sử dụng Struct sẽ đảm bảo không có phần nào trong code có được tham chiếu tới đối tượng của chúng ta trừ khi ta truy xuất thẳng tới chúng. Do đó, dễ quản lý, việc kiểm soát giá trị đối tượng khi bị thay đổi cũng trở nên đơn giản hơn.

### Sử dụng Class khi nào
- Class được sử dụng trong trường hợp chúng ta cần những tính chất đặc biệt của nó mà Struct không có (như đã nêu ở trên)
- Khi muốn làm việc với cả trình biên dịch của Swift và Objective - C, bạn bắt buộc phải sử dụng Class. Ví dụ khi xây dựng Realm Model, phải khai báo từ khoá @objc hay và dynamic, do đó, bắt buộc phải sử dụng Class.
- Việc copy các instance là không hợp lý hoặc không cần thiết.\
Ví dụ window hay UIViewController chỉ có 1 đối tượng active tại một thời điểm. Chúng ta sẽ luôn tạo mới một đối tượng controller để sử dụng thay vì copy giá trị chúng.\
Hoặc với những đối tượng như DatabaseConnection. Việc copy tạo ra nhiều instance cùng trỏ tới 1 file là không cần thiết, bởi chúng luôn kết nối tới cùng một dữ liệu như nhau.\
Trường hợp chỉ cần 1 wrapper để chứa các phương thức kết nối API trả về dữ liệu, chúng ta không cần sử dụng Struct. Việc copy instance là không cần thiết, hơn nữa lợi dụng tính kế thừa của Class trong trường hợp này sẽ giúp code chúng ta ngắn gọn và clean hơn.\
\
\
Nguồn tham khảo:\
https://medium.com/@abhimuralidharan/difference-between-a-struct-and-a-class-in-swift-53e08df73714\
https://learnappmaking.com/struct-vs-class-swift-how-to/\
https://viblo.asia/p/su-khac-nhau-giua-value-type-va-reference-type-trong-swift-naQZRYQdKvx