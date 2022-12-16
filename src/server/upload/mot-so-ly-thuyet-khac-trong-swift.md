### Mở đầu:
- Hôm nay mình xin giới thiệu với các bạn một số thứ mà những người mới học lập trình **Swift** thường hay không biết, ví dụ như là **Inout** hay là cách tạo ra các **Operator**. Trong bài viết ngày hôm nay mình sẽ hướng dẫn các bạn cách tạo cũng như sử dụng 2 thứ ở trên. 

### Inout
- Như các bạn đã biết về cách sử dụng return function, ví dụ: cho 2 tham số, trả về tổng của chúng. 
Thông thường, mình không muốn 1 hàm thay đổi các tham số của nó, bởi vì nếu làm vậy, bạn có thể không nắm chắc được giá trị của **parameters** và sẽ làm sai lệch các logic code của bạn trong hàm, dẫn đến data output bị sai. Tuy nhiên, đôi khi bạn cũng muốn 1 function thay đổi các **parameter** trực tiếp, đó là phần **Inout** (hay copy-in copy-out).

- Chúng ta sẽ vào một ví dụ cụ thể nhé. Các bạn hãy tạo ra một func như sau:
```
func incrementAndPrint(_ value: inout Int) {
  value += 1
  print(value)
}
```

func code như bình thường nhưng thêm Inout trước phần mà các bạn khai báo Type. Và khi gọi ra thì nó cũng có 1 chút khác biệt khi truyền vào argument:

```
var value = 5
incrementAndPrint(&value)
print(value)
```

Yeah, đó là thêm & trước **arguments**, cái này sẽ làm rõ việc gọi lúc đó là các bạn đang dùng **copy-in copy-outout**. Kết quả là 6 như expected. 

Sử dụng **Inout** sẽ giữ lại giá trị đã thay đổi sau khi func kết thúc. Trong nhiều điều kiện nhất định, compliler có thể đơn giản hoá việc sao chép này thông qua tham chiếu (pass-by-reference).

> Argument sẽ không được copied vào parameter. Thay vào đó, parameter sẽ chỉ giữ tham chiếu đến ô nhớ của giá trị gốc. Việc tối ưu hoá này sẽ đáp ứng những yêu cầu của việc sao chép trong khi việc xoá bỏ giá trị cũ cần phải tạo những bản sao.

**It's cool :D**

Việc hiểu về **Inout** sẽ giúp chúng ta viết ra các **operators** dễ dàng hơn. Tiếp tục nào các bạn! 

### Custom operators
- Trong phần này, các bạn sẽ được tự chế tạo **operator** cho riêng mình. Nó sẽ biểu diễn cho 1 loạt **function** phức tạp lặp đi lặp lại nhiều lần. Ví dụ nếu bạn có phép tính 2 nhân 2 nhân 2 v..v thì tại sao không có phép tính luỹ thừa cho gọn. Trước tiên, mình nên làm 1 type cố định rồi khi nào quen rồi mình mở rộng bằng cách dùng **generic**.

 **1. Lý thuyết về các loại toán tử:**
 
 **a. Toán tử một ngôi (unary)**: được dùng với duy nhất 1 toán hạng hay một tiền tố. Chỗ này mình phân tích thêm chút, nó bao gồm:

**Postfix**: Những toán tử đứng sau, hay gặp nhất là a!, b?

**Prefix**: Những toán tử đứng trước ví dụ như !true, ++a

**b. Toán tử hai ngôi (binary)**: được dùng với 2 toán hạng. Các toán tử +, -, x , % , hay toán tử so sánh ==, !== hay logic &&, || đều thuộc về phần này.

**Infix** là một tên gọi khác của toán tử 2 ngôi này, vì nó nằm giữa.

**c. Toán tử ba ngôi (ternary)**: được dùng với 3 toán hạng. Chắc các bạn còn nhớ đến toán tử điều kiện ? chứ. ví dụ: (a == b ? true : false).

Ví dụ: Toán tử luỹ thừa
Đặt toán tử luỹ thừa là dạng toán từ mà mình tự custom, nên ta chọn đặt tên thoải mái. Cách đặt thường là sẽ kết hợp các ký tự đặt biết mà phải có ý nghĩa 1 chút. Ví dụ, luỹ thừa là nhiều phép nhân, nên ta đặt: ** hoặc các bạn đặt là ^ cũng được.

> Swift không cho phép ta custom ternary operator

Cái ta có thể custom là các phần còn lại như **prefix, postfix, infix**. Phép luỹ thừa là cần đến 2 toán hạng nên ta dùng **infix**. Code như sau:

```
infix operator **

func **(lhs: Int, rhs: Int) -> Int {
  var result = lhs
  for _ in 2...rhs {
    result *= lhs
  }
  return result
}
```

infix: dạng type của operator cần custom

operator: keyword

\**: cái mình muốn tạo ra

tiếp theo là func mà mình muốn định nghĩa cho phép nhân đó. Một lưu ý các bạn để ý đến đoạn result \*= lhs, cũng là một phép nhân rồi gắn, kiểu kiểu như custom operator nhưng được Swift tạo ra trước đó.

Bây giờ, hãy test thử code nhé:
```
let base = 3
let exponent = 2
let result = base ** exponent
```
 => Chắc chắn kết quả sẽ ra là 9 rồi :D 
 
 **2. Toán tử kết hợp với phép gắn:**
 
 Như mình đã lưu ý ở phần trên, thì mọi operator mình làm thì thường phải có thêm phần compound assignment (kết hợp luôn phép gắn). Xem phần code sau:

```
infix operator **=
func **=(lhs: inout Int, rhs: Int) {
  lhs = lhs ** rhs
}
```

Một trong những phần hay mình sẽ phân tích ở đây. Nếu như mình làm bình thường sẽ như ở trên, tức là var result -> xử lý code -> gán lại cho result. Nhưng ở đây mình sẽ dùng **Inout** keyword. 

Như vậy, bằng việc dùng **Inout**, ta lấy được giá trị sau cùng. Func sẽ thay đổi **Inout parameter** trực tiếp bởi vì nó được truyền thông qua reference.

Đây là thành quả:

```
var number = 3
number **= exponent
```

=> kết quả vẫn ra là 9 nhé :P

**3. Generic Operators**

Bây giờ mình muốn phép luỹ thừa apply cho toàn bộ các loại Integer. Code như sau, cũng khá dễ hiểu:

```
func **<T: Integer>(lhs: T, rhs: Int) -> T {
  var result = lhs
  for _ in 2...rhs {
    result *= lhs
  }
  return result
}
func **=<T: Integer>(lhs: inout T, rhs: Int) {
  lhs = lhs ** rhs
}
```

Chú ý đến Integer type constrain. Cái ràng buộc cần có bởi vì dòng code: có operator \*= không phải loại nào cũng dùng được, phải **conform Integer Type** mới dùng được. Bây giờ ta test thử với các loại Integer khác nhau:
```
let unsignedBase: UInt = 2
let unsignedResult = unsignedBase ** exponent

let base8: Int8 = 2
let result8 = base8 ** exponent

let unsignedBase8: UInt8 = 2
let unsignedResult8 = unsignedBase8 ** exponent

let base16: Int16 = 2
let result16 = base16 ** exponent

let unsignedBase16: UInt16 = 2
let unsignedResult16 = unsignedBase16 ** exponent

let base32: Int32 = 2
let result32 = base32 ** exponent

let unsignedBase32: UInt32 = 2
let unsignedResult32 = unsignedBase32 ** exponent

let base64: Int64 = 2
let result64 = base64 ** exponent
```

Như vậy, nó đúng cho tất cả các loại integer: Int, UInt, Int8, UInt8, Int16, UInt16, Int32, UInt32, Int64 and UInt64. Int/ UInt/ Int8 là gì các bạn tự tìm hiểu thêm nha.

**4. Precedence and associativity**

Nếu chỉ có 2 giá trị thì khá đơn giản nhưng nếu là đoạn code sau thì sao:

```
2 * 2 ** 3 ** 3 // không thể compile
```

**Swift** không thể compile được nếu thiếu các thông tin sau đây:

* Độ ưu tiên (precedence): Phép nào trước phép nào, nhân trước hay luỹ thừa trước.
* Độ kết hợp (associativity): Từ trái qua phải trước hay từ phải qua trái trước.

Nếu không có 2 thông tin trên thì có 1 cách duy nhất để Swift hiểu và compile, đó là quăng vào dấu ngoặc đơn:

```
2 * (2 ** (3 ** 2))
```

Để tránh khỏi sự phiền hà, ta chỉ cần define ra precedence group như sau: 
```
precedencegroup ExponentiationPrecedence {
  associativity: right
  higherThan: MultiplicationPrecedence
}
infix operator **: ExponentiationPrecedence
```

Cái mà mình define ở trên là ưu tiên phép luỹ thừa trên phép nhân **(MultiplicationPrecedence)**, và phép tính sẽ là từ phải sang trái **(associativity: right)**. Bây giờ thì **Swift** có thể compile mà không cần thêm gì nữa.

### Lời Kết:
Như vậy, mình đã giới thiệu thêm cho các bạn cụ thể về **Inout** và **Custom Operators**. Hi vọng các bạn có thêm được phần kiến thức bổ ích cho mình.

* Bài viết được tham khảo tại: https://kipalog.com/users/BuiKhanhDuy/mypage 
* Dựa trên cuốn: Ebook Swift_Apprentice_v2.0