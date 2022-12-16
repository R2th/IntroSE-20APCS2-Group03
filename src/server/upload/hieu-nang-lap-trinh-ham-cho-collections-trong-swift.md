Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/swift-programming/performance-functional-programming-and-collections-in-swift-359d14e59325

Functional programming (lập trình hàm) rất dễ dàng và thường xuyên được sử dụng trong Swift. Với các *collection* có lượng lớn các item và thực hiện các hành vi như *filter* hoặc *map* là rất phổ biến và nên được sử dụng một cách khéo léo.
Hiệu suất thường giảm khi các phương thức này được kết hợp thực hiện cùng nhau, như một *filter* theo sau một *first*. Dưới đây là một danh sách các cách thực hiện hay nhất.
### Ưu tiên *contains* hơn *first(where:) != nil*
Việc kiểm tra một đối tượng có tồn tại trong một collection hay không có thể được thực hiện bằng nhiều cách khác nhau. Nhưng dùng *contains* sẽ cho hiệu suất cao nhất. 

**Cách thực hiện tốt nhất**
```
let numbers = [0, 1, 2, 3]
numbers.contains(1)
```
**Cách thực hiện không tốt**
```
let numbers = [0, 1, 2, 3]
numbers.filter { number in number == 1 }.isEmpty == false
numbers.first(where: { number in number == 1 }) != nil
```
### Ưu tiên việc kiểm tra *isEmpty* hơn là số lượng phần tử bằng 0
Nguyên nhân vì sao lại nên kiểm tra *isEmpty*, các bạn có thể tham khảo câu lưu ý sau trong [isEmpty documentation](https://developer.apple.com/documentation/swift/string/1539462-isempty)
> Khi bạn cần kiểm tra xem *collection* của bạn có rỗng hay không, hãy sử dụng thuộc tính *isEmpty* thay vì kiểm tra xem thuộc tính *count* có bằng *0* hay không. Đối với các *collection* không phù hợp với protocol **RandomAccessCollection**, việc truy cập thuộc tính *count* sẽ lặp lại thông qua các phần tử của *collection*.

**Cách thực hiện tốt nhất**
```
let numbers = []
numbers.isEmpty
```
**Cách thực hiện không tốt**
```
let numbers = []
numbers.count == 0
```
### Kiểm tra một *String* rỗng bằng *isEmpty*
Một **String** trong Swift có thể được coi như là một *colleciton* của các character. Điều này cũng có nghĩa là chúng ta nên sử dụng **isEmpty** để kiểm tra xem một **String** có rỗng hay không sẽ đem lại hiệu suất tốt hơn.

**Cách thực hiện tốt nhất**
```
myString.isEmpty
```
**Cách thực hiện không tốt**
```
myString == ""
myString.count == 0
```
### Lấy ra đối tượng đầu tiên thoả mãn một điều kiện
Việc lấy ra đối tượng đầu tiên thoả mãn một điều kiện cho trước nào đó, có thể được thực hiện bằng *filter* và *first*. Nhưng cách thực hiện tốt nhất là sử dụng *first(where:)*
Cách sử dụng *first(where:)* sẽ dừng việc quét các phần tử của collection ngay khi tìm được đối tượng phù hợp với điều kiện. Còn cách sử dụng *filter* sẽ quét toàn bộ *collection*, dù đã tìm được đối tượng phù hợp với điều kiện.
*last(where:)* cũng tương tự.

**Cách thực hiện tốt nhất**
```
let numbers = [3, 7, 4, -2, 9, -6, 10, 1]
let firstNegative = numbers.first(where: { $0 < 0 })
```
**Cách thực hiện không tốt**
```
let numbers = [3, 7, 4, -2, 9, -6, 10, 1]
let firstNegative = numbers.filter { $0 < 0 }.first
```
### Lấy ra phần tử bé nhất và lớn nhất của một collection
Có thể tìm phần tử bé nhất của collection bằng cách sắp xếp nó từ bé tới lớn, sau đó lấy ra phần tử đầu tiên. Tìm phần tử lớn nhất cũng tương tự như vậy. Việc này yêu cầu phải sắp xếp toàn bộ mảng trước tiên. Thay vào đó hãy sử dụng *min()* và *max()* để có hiệu suất tốt hơn trong trường hợp này.

**Cách thực hiện tốt nhất**
```
let numbers = [0, 4, 2, 8]
let minNumber = numbers.min()
let maxNumber = numbers.max()
```
**Cách thực hiện không tốt**
```
let numbers = [0, 4, 2, 8]
let minNumber = numbers.sorted().first
let maxNumber = numbers.sorted().last
```
### Kiểm tra xem toàn bộ phần tử có thoả mãn điều kiện cho trước
Rất dễ dàng sử dụng việc kết hợp *filter* và *isEmpty* để kiểm tra toàn bộ các phần tử của một collection có thoả mãn một điều kiện cho trước hay không. Nhưng với [SE-0207](https://github.com/apple/swift-evolution/blob/master/proposals/0207-containsOnly.md) được giới thiệu trong Swift 4.2, chúng ta có thể sử dụng *allSatisfy* để kiểm tra điều này.

**Cách thực hiện tốt nhất**
```
let numbers = [0, 2, 4, 6]
let allEven = numbers.allSatisfy { $0 % 2 == 0 }
```
**Cách thực hiện không tốt**
```
let numbers = [0, 2, 4, 6]
let allEven = numbers.filter { $0 % 2 != 0 }.isEmpty
```
### Hãy sử dụng SwiftLint để chắc chắn rằng chúng ta đã sử dụng cách tốt nhất
Hầu hết các ví dụ này được thực hiện trong [SwiftLint](https://github.com/realm/SwiftLint) và nó sẽ giúp bạn đảm bảo rằng các phương pháp hay nhất trên được sử dụng.