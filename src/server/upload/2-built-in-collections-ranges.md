# Ranges
1 range là 1 khoảng các giá trị, được xác định bởi giới hạn trên và giới hạn dưới của nó. Bạn có thể tạo range với toán tử: ..< cho range phạm vi mở 1 nửa nghĩa là không cần bao gồm giới hạn trên, và ... cho range kín nghĩa là yêu cầu cả 2 giới hạn:

```swift 
// 0 to 9, 10 is not included
let singleDigitNumbers = 0..<10 
Array(singleDigitNumbers) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 
// "z" is included
let lowercaseLetters = Character("a")...Character("z")
```

Ngoài ra còn có biến thể tiền tố và hậu tố cho những toán tử này, được biểu hiện phạm vi 1 phía:

```swift 
let fromZero = 0...
let upToZ = ..<Character("z")
```

Có 8 loại khởi tạo riêng biệt cho range, và mỗi loại sẽ phù hợp với những giá trị hạn chế xác định riêng. 2 loại thiết yếu là Range (mở 1 nửa, sử dụng ..<) và Closed Range( sử dụng ...). Cả 2 đều có những tham số giới hạn: có yêu cầu duy nhất là giới hạn phải là Comparable. Ví dụ, giới hạn giới được miêu tả là kiểu ClosedRange< Character>. Đặc biệt là chúng ta không thể vòng lặp với Range và ClosedRange, nhưng có thể kiểm tra phần tử nào được chứa bên trong range:
    
`singleDigitNumbers.contains(9) // true lowercaseLetters.overlaps("c"..<"f") // true`

(Câu trả lời sẽ được nói rõ hơn trong chương về Chuỗi)

Half-open và closed ranges có những điểm sau:
* Chỉ half-open range có thể biểu thị khoảng trống( khi giới hạn trên và giới hạn dưới bằng nhau, như trong 5..<5)
* Chỉ closed range có thể chứa giá trị tối đa - có thể biểu thị (ví dụ 0...Int.max). Half-open range luôn yêu cầu có ít nhất 1 giá trị lớn hơn giá trị lớn nhất trong khoảng.

## Countable Ranges
Khoảng được coi như chuỗi hoặc 1 nhóm, vì thế nó có thể làm bạn bất ngờ khi Range và ClosedRange thì không phải. 1 số ranges là chuỗi. nếu không việc lặp trong vòng số nguyên sẽ không hoạt động:

```
for i in 0..<10 {
    print("\(i)", terminator: " ")
} // 0 1 2 3 4 5 6 7 8 9
```

Điều này có nghĩa là gì? Nếu bạn kiểm tra loại của 0..<10 bạn sẽ nhận ra là kiểu CountableRange< Int>. CountableRange đơn giản chỉ là Range, cùng với ràng buộc bổ sung, phần tử của nó thoả mãn Strideable (với các bước số nguyên). Swift gọi chúng là bằng *countable* bởi vì chúng có thể lặp. Giá trị giới hạn cho countable range chứa số nguyên và loại pointer - nhưng không với loại floating-point, vì số nguyên được ràng buộc trên loại Stride. Nếu bạn cần lặp lại trên loại floating-point, bạn có thể sử dụng (from:to:by) và phương thức stride(from:through:by) để tạo ra chuỗi tương ứng. Ràng buộc strideable cho phép CountableRange và CountableClosedRange phù hợp RandomAccesCollection, vì vậy chúng ta có thể lặp chúng.

Có 4 kiểu range cơ bản chúng ta đã tìm hiểu, có thể phân loại theo bảng 2x2 như sau:

![](https://images.viblo.asia/0d2054b0-580d-487d-9c16-6f691657483a.png)

Cột của bảng trên ứng với 2 range operater mà chúng ta đã nói, chúng tạo nên 1 [Countable]Range (half-open) hoặc [Countable]ClosedRange (closed) tương ứng. 

## Partial Ranges
Partial Ranges được xây dựng bằng cách sử dụng ... hoặc .. <làm tiền tố hoặc toán tử hậu tố. Ví dụ, 0... nghĩa là bắt đầu từ 0. Có những phạm vi được gọi là partial vì chúng thiếu 1 giới hạn. Có 4 kiểu:

```swift 
let fromA: PartialRangeFrom<Character> = Character("a")...
let throughZ: PartialRangeThrough<Character> = ...Character("z") 
let upto10: PartialRangeUpTo<Int> = ..<10
let fromFive: CountablePartialRangeFrom<Int> = 5...
```

Chỉ có 1 biến đếm được: CountablePartialRangeFrom. Nó là partical range chúng ta có thể lặp lại mãi. Việc lặp lại bắt đầu bởi lowerBound và sẽ được tăng dần bởi đơn vị ( 1). Nếu bạn sử dụng range cho 1 vòng lặp bạn cần quan âm tới điều kiện thoát khỏi vòng lặp vô tận ( hoặc crash khi tràn bộ nhớ). PartialRangeFrom không thể lặp lại mãi mãi vì giới hạn của nó không thể phân nhỏ được nữa và cả PartialRangeThrough và PartialRangeUpTo điều thiếu dưới hạn dưới

## Range Expressions
Cả 8 kiểu range điều phù hợp giao thức Range Expressions. Giao thức đủ nhỏ để in trong cuốn sách này. Điều tiên, nó cho phép bạn biết được phần tử có nằm trong phạm vi hay không. Thứ 2, cung cấp 1 bộ sưu tập, tính toán Range được chỉ định bởi cho bạn.

```swift 
public protocol RangeExpression {
    associatedtype Bound: Comparable
        func contains(_ element: Bound) -> Bool
        func relative<C: _Indexable>(to collection: C) -> Range<Bound>
            where C.Index == Bound }
```

Với phạm vi 1 phần thiếu mất giới hạn dưới, the relative(to:) thêm chỉ số bắt đầu như là giới hạn dưới. Với giới hạn 1 phần bị thiếu giới hạn trên, nó sẽ dùng chỉ số kết thúc của bộ sưu tập. Giới hạn 1 phần cho phép biểu thức đơn giản để chia nhỏ bộ sưu tập:

```swift
    let arr = [1,2,3,4] 
    arr[2...] // [3, 4] 
    arr[..<1] // [1]
    arr[1...2] // [2, 3]
```

Điều này hoạt động được bởi khai báo đăng ký tương ứng trong giao thức Collection lấy RangeExpression thay vì một trong tám loại phạm vi cụ thể. Bạn thậm chí có thể bỏ qua cả hai giới hạn để lấy kiểu của toàn bộ bộ sưu tập:

```swift
arr[...] // [1, 2, 3, 4] 
type(of: arr) // Array<Int>
```

## Ranges và Conditional Conformance
Thư viện tiêu chuẩn hiewenj tại có những kiểu riêng biệt dành cho phạm vi đếm được: CountableRange, CountableClosedRange, và CountablePartialRangeFrom. Tốt nhất là là các kiểu khác nhau, nhưng lại là phần mở rộng dựa trên Range, ClosedRange, và PartialRangeFrom chúng có những khai báo chung phù hợp với điều kiện chung, Chúng ta sẽ nói về điều đó vào những chương tiếp theo, nhưng code được miêu tả như sau:

```swift 
// Invalid in Swift 4
extension Range: RandomAccessCollection
    where Bound: Strideable, Bound.Stride: SignedInteger
    {
    // Implement RandomAccessCollection
    }
```

Thật tiếc, cả 4 loại hệ thống đều không thể thực hiện điều này, vì kiểu riêng biệt là cần thiết. Hỗ trợ cho điều kiện phù hợp