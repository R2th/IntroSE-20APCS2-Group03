# Mutation và Stateful closures (28)
Khi chúng ta truy cập toàn mảng, bạn có thể sử dụng "map" để thực hiện 1 side effect ( ví dụ như thêm 1 phần tử vào mảng đang tra cứu). Chúng tôi không khuyến nghị làm điều đó. Hãy nhìn qua đoạn sau: 
```
array.map { item in
table.insert(item)
}
```

Đoạn side effect đã được dấu đi ( đoạn làm thay đôỉ bảng tra cứu) trong 1 cấu trúc mà nhìn giống như biến đổi của mảng. Nếu bạn thấy những điều như trên, nó dùng để diễn tả rõ ràng cho vòng lặp bên trong phương thức như map. Với hàm forEach cũng phù hợp hơn cả "map" trong trường hợp này, tuy nhiên nó có vấn đề riêng của nó. Chúng ta sẽ tìm hiểu về forEach lát nữa.

Hiệu năng của side effect là khác nhau với việc tự tạo nên trạng thái closure cục bộ, đây là kĩ năng hữu ích cho việc mốn tạo nên các closure - phương thức có thể capture và biến đổi các giá trị bên ngoài phạm vi - công cụ mạnh mẽ khi kết hợp với những phương thức higher-order. Ví dụ, phương thức tích trữ được mô tả bên dưới có thể thực hiện cùng với map và stateful closures: 
```
extension Array {
func accumulate<Result>(_ initialResult: Result, 
_ nextPartialResult: (Result, Element) -> Result) -> [Result]
{ 
var running = initialResult
return map { next in 
running = nextPartialResult(running, next)
 return running 
 } 
 } 
 }
```

Nó sẽ tạo nên biến tạm thời để lưu giá trị đang dùng và sau đó dùng map để tạo nên mảng từ các giá trị đang dùng giống như tiến trình tính toán:
```
[1,2,3,4].accumulate(0, +) // [1, 3, 6, 10]
```

Lưu ý rằng mã này giả định rằng "map" thực hiện chuyển đổi theo thứ tự trên chuỗi. Trong trường hợp "map" của chúng tôi ở trên. Nhưng có những triển khai có thể có thể biến đổi trình tự theo thứ tự - ví dụ, một trong đó thực hiện chuyển đổi các phần tử đồng thời. Phiên bản thư viện tiêu chuẩn chính thức của "map" không chỉ định liệu nó có biến đổi trình tự theo thứ tự hay không, mặc dù có vẻ nó an toàn.

## Filter 
1 operator rất phổ biến để lấy 1 mảng, tạo ra 1 mảng mới với các phần tử mới kèm theo 1 số điều kiện nhất định. Mô hình lặp trên 1 mảng và lựa chọn các giá trị phù hợp và ghi lại trong hàm "filter":

```
let nums = [1,2,3,4,5,6,7,8,9,10]
nums.filter { num in num % 2 == 0 } // [2, 4, 6, 8, 10]
```

Chúng ta có thể dùng cách viết tắt đối số của 1 closure expression để khiến chúng giản lược hơn. Thay thế cho tên của đối số "num", chúng ta có thể viết code thay thế như sau:
```
nums.filter { $0 % 2 == 0 } // [2, 4, 6, 8, 10]
```

Với closure ngắn như thế nhưng vẫn có thể đọc hiểu được. Nếu closure trở nên phức tạp hơn, sẽ là tốt hơn nếu đặt tên các đối số rõ ràng, giống như chúng ta đã làm khi trước. Đây là vấn đề thuộc về cá nhân, chjonj style mà bạn yêu thích. 1 điều cần thiết cho việc này: Nếu closure phù hợp cho việc trình bày trên 1 dòng, viết tắt đối số là 1 ý tưởng không tồi.

Với việc kết hợp "map" và "filter", chúng ta có thể dễ dàng viết rất nhiều biểu thức tính toán trên mảng mà không cần sử dụng biến trung gian, và kết quả của code sẽ trở nên ngắn và dễ để đọc hiểu hơn. Ví dụ, để tìm tất cả hình vuông diện tích dưới 100, chúng ta có thể "map" trong khoảng 0..<10, tính thể tính diện tích nó,  và sau đó lọc ra tất cả số lẻ:
```
(1..<10).map { $0 * $0 }.filter { $0 % 2 == 0 } // [4, 16, 36, 64]
```

Việc thực hiện với "filter" giống với "map":
```
extension Array 
{ func filter(_ isIncluded: (Element) -> Bool) -> [Element]
{ var result: [Element] = [] 
for x in self where isIncluded(x)
{ 
result.append(x)
 } return result 
 }
 }
```

Ngoài ra ở mệnh đề "where" hãy tìm hiểu thêm về Optionals.
1 tip hiểu quả nhanh chóng: nếu bạn đang thấy bạn đang viết những thứ kiểu như sau thì hãy dừng lại ngay lập tức!
```
bigArray.filter { someCondition }.count > 0
```

"filter" tạo 1 mảng phù hợp mới và truy cập mỗi phần tử trong mảng. Nhưng điều trên là không cần thiết. Với code trên chỉ việc check nếu 1 phần tử phù hợp - trong trường hợp này contains(where:) sẽ làm điều đó:
```
bigArray.contains { someCondition }
```

Điều này sẽ nhanh hơn nhiều với 2 lý do: nó không tạo nên 1 mảng mới chứa các giá trị đã được lọc chỉ để đếm chúng và nó giải phóng nhanh chóng như việc nó tìm thấy giá trị đầu tiên. Nói chung, chỉ sử dụng "filter" nếu như bạn muốn tất cả kết quả.

Thường bạn muốn làm điều tương tự và nó có thể hoàn thành với "contain" nhưng trông nó thật xấu xí. Ví dụ, bạn muốn check mỗi giá trị của trình tự khớp với vị ngữ sử dụng 
```
!sequence.contains { !condition }
```
nhưng nó có thể dễ đọc hơn với việc đóng góp nó lại trong 1 phương thức mới với việc viết mô tả tên đối số:
```
extension Sequence {
public func all(matching predicate: (Element) -> Bool) -> Bool { 
// Every element matches a predicate if no element doesn't match it:
return !contains { !predicate($0) }
} 
}

let evenNums = nums.filter { $0 % 2 == 0 } // [2, 4, 6, 8, 10]
evenNums.all { $0 % 2 == 0 } // true
```

## Reduce 
Cả "map" và "filter" đều lấy 1 mảng và tạo nên 1 mảng mới được định nghĩa. Thỉnh thoảng, bạn muốn kết hợp tất cả phần tử thành 1 phần tử mới. Ví dụ tính tổng các phần tử, bạn có thể viết như sau:
```
let fbs = [0, 1, 1, 2, 3, 5]
var total = 0
for num in fbs { total = total + num }
total // 12
```
Hàm "reduce" mẫu chia làm 2 phần: khởi tạo giá trị( ở trường hợp này, 0), và phương thức kết hợp việc giá trị trung gian( total) và phần tử( "num"). Sử dụng "reduce", bạn có thể viết ví dụ trên như dưới:
```
let sum = fbs.reduce(0) { total, num in total + num } // 12
```

Toán tử cũng là phương thức,. vì vậy chúng ta có thể viết lại ví dụ trên thành:
```
fbs.reduce(0, +) 
```

Kết quả của "reduce" không nhất thiết phải giống với kiểu của phần tử. Ví dụ, bạn muốn chuyển đổi 1 mảng số nguyên thành chữ, với các số theo sau là khoảng trắng, ta có thể viết như sau:
```
fbs.reduce("") { str, num in str + "\(num), " } // 0, 1, 1, 2, 3, 5, 
```

Đây là phần sử dụng cho "reduce"
```
extension Array {
func reduce<Result>(_ initialResult: Result,
_ nextPartialResult: (Result, Element) -> Result) -> Result
{ 
var result = initialResult
for x in self {
result = nextPartialResult(result, x)
 } 
 return result
 } 
 }
```

1 típ quan trọng khác: "reduce" rất linh hoạt, và nó phổ biến để dùng cho việc xây dựng mảng và thực hiện các toán tử khác. Ví dụ, bạn có thể thực hiện "map" và "filter" sử dụng mỗi "reduce":
```
extension Array { 
func map2<T>(_ transform: (Element) -> T) -> [T] {
return reduce([]) {
$0 + [transform($1)] 
}
}

func flter2(_ isIncluded: (Element) -> Bool) -> [Element] { 
return reduce([]){ 
isIncluded($1) ? $0 + [$1] : $0 } 
}
}
```

Đến đây hãy dừng lại 1 chút, và ngẫm nghĩ những nội dung cũng như những code bên trên. Cám ơn bạn đã đọc