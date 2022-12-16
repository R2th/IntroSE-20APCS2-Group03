# Sequences

Giao thức Sequences là giao thức cơ bản của hệ thống phân cấp. 1 Sequence là 1 chuỗi các giá trị cùng loại cho phép bạn lặp lại giá trị. Cách dễ hiểu nhất 1 sequence là 1 vòng lặp:

```swift
for element in someSequence { 
    doSomething(with: element)
}
```

Khả năng đơn giản hoá việc truy cập phần tử trong tập hợp lớn của Sequence đem lại hữu ích cho người dùng và họ chấp nhận nó. 
Yêu cầu của loại thoả mãn Sequence là cung cấp 1 phương thức makeIterator() và trả về an *iterator*:


```swift
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    func makeIterator() -> Iterator
    // ...
}
```

Điều chúng ta học được ở phần này là cách định nghĩa Sequence là nó là kiểu có thể tạo nên vòng lặp. Vì vậy, trước tiên chúng ta hãy tìm hiểu về iterator

## Iterator

Sequence cung cấp cách truy cập các phần tử của nó bởi cách tạo nên 1 vòng lặp. Vòng lặp cung cấp các giá trị của sequence theo thời gian từng cái 1 và theo dõi vị trí của chúng giống như nó duyệt sequence vậy. Phương thức định nghĩa duy nhất trong IteratorProtocol là next(), nó phải trả về phần tử tiếp theo trong sequence trong lần gọi tiếp theo, hoặc nil nếu sequence đã đến điểm kết thúc

```swift
protocol IteratorProtocol { 
    associatedtype Element 
    mutating func next() -> Element?
}
```

Đặc biệt kiểu phần tử liên kết phần tử của giá trị được vòng lặp cung cấp. Ví dụ, kiểu phần tử của vòng lặp với String là Character. Mở rộng thêm, vòng lặp cũng định nghĩa kiểu phần tử của sequence. 

```swift
public protocol Sequence { 
    associatedtype Element 
    associatedtype Iterator: IteratorProtocol 
        where Iterator.Element == Element 

    // ... 
}
```

Bạn thường chỉ quan tâm đến Iterator khi bạn khai báo 1 loại tuỳ chọn cho sequence. Ngoài ra, hiếm khi bạn sử dụng Iterator trực tiếp, bởi vì vòng lặp for là cách đơn giản để duyệt một chuỗi. Thực tế, khi sử dụng vòng lặp for, trình biên dịch sẽ sao chép sequence thành sequence mới và duyệt nó, cho tới khi phần tử tiếp theo là nil.

```swift
var iterator = someSequence.makeIterator() 
while let element = iterator.next() { 
    doSomething(with: element)
}
```

Iterator là cấu trúc chỉ truyền, tức là giá trị tiếp theo được thay đổi chứ không thể tái khởi động hoặc đảo ngược. Trong khi hầu hết các iterator sẽ cung cấp số lượng có hạn các phần tử và trả về nil khi next() phần tử cuối cùng, 

Vấn đề thực tế, vòng lặp đơn giản nhất - khi không có giá trị trả về nil - lặp lại cùng 1 phần tử mãi mãi. 

```swift
struct ConstantIterator: IteratorProtocol { 
        typealias Element = Int
        mutating func next() -> Int? {
            return 1
     } 
 }
```

Kiểu giá trị cho phần tử là optional ( nhưng thường hữu dụng cho các văn bản tài liệu hoặc các giao thức lớn). Nếu chúng ta bỏ xót nó, trình biên dịch sẽ khái báo kiểu phần tử dựa vào phương thức next() 

```swift
struct ConstantIterator: IteratorProtocol { 
        mutating func next() -> Int? {
            return 1
     } 
 }
```

Nhớ rắng hàm next() được định nghĩa với mutating. Nó rất quan trọng lắm với ví dụ đơn giản này vì vòng lặp của chúng ta không đột biến. Thực tế, cũng vậy, vòng lặp được thiết lập trạng thái biến đổi. Tức là phần lớn các vòng lặp yêu cầu trạng thái có thể thay đổi để theo dõi vị trí phần tử tiếp theo trong chuỗi.

Chúng ta có thể tạo 1 đối tượng ConstantIterator và duyệt sequence mà nó tạo ra trong vòng lặp while, in ra luồng vô tận

```swift 
var iterator = ConstantIterator() 
while let x = iterator.next() {
        print(x) 
}
```

Cùng xem qua 1 ví dụ phức tap hơn. FibsIterator tạo ra chuỗi Fibonacci. Nó lưu trữ vị trí hiện tại của sequence bằng lữu trữ 2 số tiếp theo. Phương thức next() trả về số đầu tiên và cập nhật cho lần gọi hàm sau. Giống như ví dụ trước, trình lặp này tạo ra luồng vô hạn, nó tiếp tục tạo số cho đến khi đạt đến số nguyên giới hạn, và chương trình sẽ bị huỷ:

```swift
struct FibsIterator: IteratorProtocol {
    var state = (0, 1)
    mutating func next() -> Int? {
        let upcomingNumber = state.0 
        state = (state.1, state.0 + state.1) 
        return upcomingNumber
    } 
}

```