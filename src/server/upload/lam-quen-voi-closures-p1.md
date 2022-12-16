# Bài hôm nay mình sẽ nói về cách tiếp cận với Closures và cùng nhau tìm hiểu về nó.

## 1, Định nghĩa
```
Closures are self-contained blocks of functionality that can be passed around and used in your code
```
Nói nôm na thì nó 1 khối code độc lập được sử dụng trong code của bạn cho 1 mục đích nào đó, ví dụ để tính tổng 2 số chẳng hạn. Đừng lo lắng nó sẽ được diễn giải chi tiết ở dưới :D
Một điều nữa, function mà bạn đã làm quen ở các ngôn ngữ như c,c++, java thì ở Swift nó cũng chỉ là 1 dạng đặc biệt của Closure. 
### Và Closure có 3 phương thức thể hiện:
* Global functions là closure, có tên và không thể "capture value"
* Nested functions là closure, có tên và có thể "capture value"
* Closure expressions là closure không tên, và có thể "capture value" từ bối cảnh xung quanh

"Capture value" Ở đây là lưu trữ bối cảnh xung quanh nó, có thể là class, biến, v...v

Đặc biệt là closure expressions có một phong cách rõ ràng, với các tối ưu hóa khuyến khích cú pháp ngắn gọn,đơn giản trong các tình huống phổ biến.

### Tiện ích của closure expressions:
* Tự suy luận ra kiểu của tham số và kiểu trả về
* Ngầm trả về single-expression closures
* Tên đối số viết tắt
* Cấu trúc trailing closure

Nào giờ chúng ta sẽ tìm hiểu về Closure Expressions


-----

## 2, Closure Expressions
### The Sorted Method
Thư viện cơ bản của swift cung cấp 1 phương thức gọi là **sorted(by: )** nó sẽ sắp xếp 1 mảng các giá trị của 1 loại đã biết, dựa trên đầu ra của 1 sorting closure mà bạn cung cấp. Ngay khi quá trình sắp xếp hoàn thành, phương thức **sorted(by: )** sẽ trả về 1 mảng mới với cùng kiểu và kích thước cũ, với những phân từ đã được sắp xếp. 
Closure expression exmaples phía dưới sử dụng phương thức **sorted(by: )** để sắp xếp 1 mảng String theo thứ tự alphabetical.
```
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```
Phương thức **sorted(by: )** sẽ yêu cầu 1 closure mà lấy 2 đối số cùng kiểu với nội dung của mảng và trả về giá trị **Bool** để xác định giá trị đầu tiên xuất hiện trước hoặc sau giá trị thứ 2. Sorting closure cần trả về true nếu giá trị đầu tiên nên xuất hiện giá trị thứ 2 và **false** ngược lại.
Sorting closure cần là 1 function của kiểu **(String, String ) -> Bool**
Cách viết function bình thường với kiểu trên, phù hợp:
```
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

Nếu chuỗi đầu tiên ( s1 ) lớn hơn chuỗi thứ 2 ( s2), hàm **backward(: : )** sẽ trả về về true, điều ấy có nghĩa là s1 nên xuất hiện trước s2 trong mảng. Đối với chữ trong chuỗi, "greater than" nghĩa là xuất hiện sau trong bảng chữ cái.
### Cấu trúc Closure Expression 
```
{ (parameters) -> return type in
    statements
}
```

Parameters trong closure expression có thể là in-out parameters, nhưng chúng không thể có giá trị mặc định. Variadic parameters có thể dùng nếu bạn đặt tên cho variadic paramteters. Tuples có thể được sử dụng như kiểu parameter và kiểu trả về.
Ví dụ bên dưới thể hiện 1 phiên bản của hàm **backward(_: _: )** 

```
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

Bạn sẽ nhận thấy rằng, ở cả 2 phiên bản đều được viết như **(s1: String, s2: String) -> Bool**. Tuy nhiên với closure expression, tham số và kiểu trả về được viết trong dấu ngoặc nhọn, không phải bên ngoài chúng.

Bắt đầu với thân của closure với từ khóa **in**. Nó phân cách giữa parameters và  kiểu trả về.

Vì thân của closure khá ngắn, nên có thể được viết thành 1 dòng
```
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

### Suy luận kiểu từ bối cảnh
Hãy cùng nhìn cách viết phía dưới
Phương thức **sorted(by: )** là hàm gọi trên 1 mảng String, vì vậy đối sô của nó phải là kiểu hàm (String, String) -> Bool. Đều ấy nghĩa là (String, String) và kiểu Bool không cần phải veiest ở phần định nghĩa closure expressions. Bởi vì kiểu có thể được ngầm suy luận,(->) và dấu ngược đơn xung quanh nó là không cần thiết.  

```
reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
```

Bạn vẫn có thể viết rõ ràng nếu bạn muốn, tuy nhiên điều ấy sẽ khiến code có thể bị lập lại, phòng trường hợp bạn muốn so sánh cả kiểu khác như Int

### Ngầm trả về single-expression closures
Single-expression closures có thể ngầm trả về kết quả của single expression nhờ việc bỏ keyword **return** từ bên trong khai báo của nó, đây là 1 phiên bản như thế: 

```
reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
```

Ở đây kiểu đối số của phương thức **sorted(by: )** được viết gọn lại, điều ấy có nghĩa giá trị **Bool** phải được trả về bởi closure. Vì vậy, thân của closure chỉ còn được ghi là **(s1 > s2)**, nó trả về giá trị **Bool**, ở đây không có mơ hồ và keyword **return** có thể bị bỏ qua

### Tên đối số viết tắt
Swift tự động cung cấp tên đối số viết tắt với nội tuyến closure, nó có thể được sử dụng để tham chiếu tới giá trị đối số của closure bởi tên $0, $1, $2 và nhiều hơn nữa.

Nếu bạn sử dụng tên đối số viết tắt bên trong closure expression, bạn có thể bỏ qua danh sách đối số trong phần định nghĩa, và số và kiểu của đối số viết tắt được ngầm hiểu bởi kiểu mà hàm số mong muốn. Từ khóa  **in** có thể bị bỏ qua, bởi vì closure expression đã tạo nên toàn bộ thân của nó

```
eversedNames = names.sorted(by: { $0 > $1 } )
```

Ở đây, $0 và $1 đã tham chiếu tới đối số String đầu tiên và thứ 2


**Phương thức Operator**
Ngoài ra còn có phương thức Operator ngắn hơn để viết closure expression ở trên. Kiểu chuỗi của Swift xác định việc thực hiện chuỗi cụ thể của toán tử lớn hơn (>) như là một phương thức có hai tham số kiểu String và trả về một giá trị kiểu Bool. Điều này khớp chính xác với kiểu phương thức cần thiết bởi phương thức được sắp xếp (by :). Do đó, bạn có thể chỉ cần chuyển vào toán tử lớn hơn, và Swift sẽ phỏng đoán rằng bạn muốn sử dụng việc triển khai chuỗi cụ thể của nó:

```
reversedNames = names.sorted(by: >)
```

Để rõ hơn bạn có thể tìm hiểu ở [Operator Methods](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID42)


**Tạm dừng phần 1 ở đây, chúng ta sẽ tiếp tục phần 2 về Trailing Closures, nguồn tham khảo [Closures](https://docs.swift.org/swift-book/LanguageGuide/Closures.html)**