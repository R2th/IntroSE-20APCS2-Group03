Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây: https://betterprogramming.pub/5-useful-swift-one-liners-to-write-concise-code-e63f75337a53

Chúng ta cùng tìm hiểu một số các kỹ thuật một dòng để mã dễ đọc hơn.

![](https://images.viblo.asia/613073fc-8a96-4db6-9ee6-2d89402fcebf.jpeg)

### 1. Toán tử `If-Else`
Bạn có biết rằng bạn có thể thay thế câu lệnh` if-else` đơn giản này:
```
let money = 100
if money > 0 {
    print("Some money")
} else {
    print("No money")
}
```
Với biểu thức một dòng chữ nhỏ gọn gàng này?
```
money > 0 ? print("Some money") : print("No money")
```
Cái này được gọi là toán tử điều kiện bậc ba trong Swift (nó cũng là một tính năng phổ biến trong các ngôn ngữ lập trình khác).
Đây là cấu trúc chung của một điều kiện bậc ba:
```
condition ? true_expression : false_expression
```
Tuy nhiên, hãy lưu ý khi sử dụng toán tử này. Nó là một cách hữu ích để thay thế các câu lệnh `if-else` đơn giản. Tuy nhiên, không nên làm cho mã khó đọc hơn bằng cách lạm dụng nó.
### 2. Hoán đổi hai biến
Để hoán đổi hai biến mà không cần đến biến trợ giúp, bạn có thể dùng đến cơ cấu hủy `Tuple`:
```
var a = 1
var b = 2
(a, b) = (b, a)
print(a, b)
```
Kết quả:
```
2 1
```
### 3. Kiểm tra giá trị `Nils` trong các giá trị tùy chọn
Bạn không cần phải viết câu lệnh `if-else` để kiểm tra xem giá trị tùy chọn có phải là `nil` hay không. Thay vào đó, bạn có thể sử dụng toán tử liên kết nil, `??`, để đạt được điều tương tự chỉ với một dòng mã:
```
var name: String?
print(name ?? "N/A")
```
Kết quả:
```
N/A
```
Toán tử hợp nhất `Nil` là một tính năng thường được sử dụng trong Swift. Nó hoạt động bằng cách kiểm tra xem phía bên trái của `??` là `nil` hay không? Nếu đúng, thì nó trả về giá trị ở phía bên tay phải. Nếu không, nó trả về giá trị ở bên trái.
Nói cách khác, `print(name ?? "N/A")` là cách viết tắt của:
```
var name: String?
if name != nil {
    print(name)
} else {
    print("N/A")
}
```
### 4. Kiểm tra xem một từ có tồn tại trong một câu hay không
Bạn có thể kiểm tra xem một từ cụ thể có tồn tại trong chuỗi hay không bằng một dòng mã đơn giản như sau:
```
let favorites = ["Banana", "Orange", "Apple"] 
let bag = "I packed some Beef, Potatoes, and a Banana"
let hasFavorite = !favorites.filter({bag.contains($0)}).isEmpty
print(hasFavorite)
```
Kết quả:
```
true
```
### 5. Tính tổng của một dãy số
Ví dụ: tính tổng tất cả các số trong phạm vi từ 1 đến 10 với:
```
let sum = (1...10).reduce(0,+)
print(sum)
```
Kết quả:
```
55
```
### Thêm: Kiểm tra xem tất cả các phần tử mảng có đáp ứng điều kiện không
Sử dụng phương thức `allSatisfy` để kiểm tra xem tất cả các giá trị trong một `Collection` có đáp ứng điều kiện cho trước hay không:
```
let numbers = [1, 0, 0, 3, 6]
let allPositive = numbers.allSatisfy { $0 >= 0 }
print(allPositive)
```
Kết quả:
```
false
```

Cảm ơn vì đã đọc! Tôi hy vọng bạn thấy điều này hữu ích.