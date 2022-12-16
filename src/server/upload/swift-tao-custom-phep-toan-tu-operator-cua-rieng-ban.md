Swift cho phép bạn tạo các toán tử có thể tùy chỉnh của riêng bạn. Điều này đặc biệt hữu ích khi bạn xử lý các loại dữ liệu của riêng mình. 

Trong bài viết này, tôi sẽ chỉ cho bạn cách bạn có thể dễ dàng tạo toán tử tùy chỉnh của riêng mình trong Swift.

### Operator Types in Swift

Có năm loại toán tử chính trong Swift. Tất cả các toán tử thuộc một trong các danh mục sau:

* Toán tử Infix - Sử dụng giữa hai biến, ví dụ: 1 + 2
* Toán tử Prefix - Sử dụng trước một giá trị, ví dụ: !true
* Toán tử Postfix - Sử dụng sau một giá trị, ví dụ: 4! (! nghĩa là giai thừa. Ví dụ: giai thừa của 4 là 4! = 4 * 3 * 2 * 1 = 24)
* Toán tử Assignment - Cập nhật giá trị ban đầu bằng cách thực hiện một thao tác trên đó. Ví dụ. num += 1 num tăng từngđơn vị một.
* Toán tử Ternary (bậc ba) - Một toán tử của hai ký hiệu giữa ba biểu thức. Swift chỉ có một toán tử bậc ba được gọi là toán tử điều kiện bậc ba (condition ? True_expression: false_expression). Đây là kiểu toán tử không thể tùy chỉnh duy nhất trong danh sách này!

Mọi loại toán tử ở trên (ngoại trừ toán tử bậc ba) đều có thể tùy chỉnh. Điều này có nghĩa là bạn có thể tạo một toán tử hoàn toàn mới cho nhu cầu của mình.

Hãy xem các ví dụ về triển khai toán tử tùy chỉnh cho từng loại toán tử tùy chỉnh.


### Custom Prefix Operator

Hãy triển khai một Emoji căn bậc hai, mà bạn có thể thay thế squrt(25.0) thành ✔️25.0.

Vì dấu ✔️ ở phía trước số mà nó đang tính toán, toán tử này là một toán tử tiền tố. Với ý nghĩ này, hãy triển khai toán tử căn bậc hai tùy chỉnh và kiểm code: 
```
prefix operator ✔️
prefix func ✔️(num: Double) -> Double {
    return sqrt(num)
}
print(✔️25.0) // prints 5.0
```
* Trong dòng đầu tiên, bạn cho chương trình biết rằng có một toán tử tiền tố mới, ✔️. 
* Sau đó, bạn chỉ cần tạo một func tiền tố xác định hành vi của toán tử ✔️, trong trường hợp này là: trả về căn bậc hai của một đối số.

### Custom Infix Operator

Mặc dù bạn đã có một toán tử + trong Swift, hãy tạo một toán tử mới bằng cách sử dụng emoji ➕. 

Như bạn đã biết, một dấu cộng được đặt ở giữa hai số. Do đó, loại toán tử bổ sung cần là infix:

```
infix operator ➕
func ➕(lhs: Int, rhs: Int) -> Int {
    return lhs + rhs // regular + operator
}
print(3 ➕ 6) // prints 9
```
* Một lần nữa, bạn khai báo một toán tử mới, được biểu thị bằng một emoji. 
* Toán tử này nhận hai đối số, lhs và rhs (bên trái và bên phải tương ứng), tính tổng chúng và trả về kết quả.

### Toán tử Postfix mới
Một ví dụ tuyệt vời về toán tử hậu tố (postfix) là toán tử giai thừa (!). Ví dụ, giai thừa của năm là: 5! = 5 * 4 * 3 * 2 * 1 = 120.
Hãy tạo toán tử giai thừa tùy chỉnh bằng cách sử dụng emoji❗, tính giai thừa của một số nguyên để bạn có thể gọi nó cho bất kỳ số nguyên nào, chẳng hạn như sau: 5❗. 

Sử dụng hàm giai thừa đơn giản này để tính giai thừa:
```
func factorial(_ n: Int) -> Double {
  return (1...n).map(Double.init).reduce(1.0, *)
}
factorial(5) // prints 120.0
```
Bây giờ, bạn có thể triển khai toán tử giai thừa theo cách tương tự như các ví dụ khác, bằng cách sử dụng từ khóa postfix lần này:
```
postfix operator ❗
postfix func ❗(num: Int) -> Double {
    return factorial(num)
}
print(5❗) // prints 120.0
```
### Toán tử Assignment mới
Cuối cùng, hãy tạo một toán tử gán mới, chia một số cho một số khác và cập nhật số gốc bằng cách sử dụng emoji ➗  kết hợp với toán tử gán của Swift (=)

Ví dụ:
```
var num = 14.0
num ➗= 2.0
print(num) // prints 7.0
```
Tại thời điểm này, không có từ khóa nào cho toán tử gán tùy chỉnh. Thay vào đó, bạn phải khai báo một toán tử infix mới ➗ = (có nghĩa là nó sẽ được đặt giữa hai số). 
```
infix operator ➗=
func ➗=(lhs: inout Double, rhs: Double) {
    lhs = lhs / rhs
}
var num = 14.0
num ➗= 2.0
print(num) // prints 7.0
```


Nguồn tham khảo: [Swift: Create Your Own Custom Operator](https://medium.com/codex/swift-create-your-own-custom-operator-a6fe4d71f606)