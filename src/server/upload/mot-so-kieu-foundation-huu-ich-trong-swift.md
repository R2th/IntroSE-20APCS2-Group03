<br>Nếu ai đã từng lập trình iOS thì ắt hẳn đã từng thấy qua import Foundation và thường thì chúng ta chỉ sử dụng các class quen thuộc như Data, URLSession, NSString...Tuy nhiên vẫn còn một số class ẩn danh, ít nổi tiếng hơn nhưng cũng rất hữu ích trong một số bài toán cụ thể mà chúng ta không cần phải "Reinvent The Wheel" mình sẽ chia sẻ sau đây :heart_eyes::
<br><h1>NSScanner </h1>
NSScanner sẽ truy xuất những số và chuỗi từ một chuỗi gốc ( tương tự như hàm scanf trong C ):<br>
```
func extractIntsFrom(string: String) -> [Int] {
    var result: [Int] = []
    let scanner = Scanner(string: string)
    scanner.charactersToBeSkipped = CharacterSet.decimalDigits.inverted
    var pointer: Int = 0
    while scanner.isAtEnd == false {
        if scanner.scanInt(&pointer) {
            result.append(pointer)
        }
    }
    return result
}
let string = "S1M cool M735 777"
let ints = extractIntsFrom(string: string)
// [1, 735, 777]
```
Có nhiều biến thể khác của Scanner như là scanString, scanDouble và scanHexInt mà ta có thể áp dụng vào từng kiểu dữ liệu nhất định.
<br><h1>NSCountedSet</h1>
Nhiều lúc chúng ta có thể đối mặt với các vấn đề yêu cầu phải bạn phải theo dõi số lượng của một phần tử nào đó như bài toán đảo chữ:
```
func isAnagram(_ first: String, _ second: String) -> Bool {
    guard first.count == second.count else {
        return false
    }
    let countedSet = NSCountedSet(array: Array(first))
    for character in second {
        countedSet.remove(character)
    }
    return countedSet.count == 0
}
```
Các phần tử có thể được thêm vào nhiều lần với countedSet.add(element) và bộ đếm có thể được kiểm tra bằng hàm countedSet.count(element). Nếu bộ đếm bằng 0 thì phần tử bị bỏ khỏi Set.
<h1>NSOrderSet</h1>
Ta thường dùng Set để lưu cac phần tử không bị trùng lặp, NSOrderSet hoạt động tương tự Set nhưng theo một chiều nhất định.

```
let set = NSMutableOrderedSet()
set.add(1)
set.add(4)
set.add(1)
set.add(1)
set.add(1)
set.add(6)
set.add(4)
set.add(6)
for a in set {
    print(a)
    // 1, 4, 6
}
```

<br><h1>CFBinaryHeap</h1>
Heaps là cách hiệu quả cài đặt những cấu trúc hàng đợi ưu tiên, sẽ tốn nhiều thời gian để cài đặt BinaryHeap vì thế CFBinaryHeap ở đây để cứu bồ.<br>
Mặc dù cool như vậy nhưng để cài đặt CFBinaryHeap thì chúng ta sẽ phải quản lý rất nhiều pointers. Vì thế ta có thể dùng MCBinaryHeap (wrapper) để việc cài đặt và sử dụng dễ dàng hơn:
```
let array = [8,3,5,4,1]
let heap = MCBinaryHeap(array: array)
heap?.popMinimumObject() // 1
heap?.popMinimumObject() // 3
heap?.popMinimumObject() // 4
heap?.popMinimumObject() // 5
heap?.popMinimumObject() // 8
```
<br> Qua bài viết này thì mình hi vọng mình và mọi người biết đến sự tồn tại của chúng. :joy:
<h3>Reference:</h3> 
- https://swiftrocks.com/useful-obscure-foundation-types-in-swift.html <br>
- https://www.developer.apple.com/documentation/foundation/nsscanner<br>
- https://developer.apple.com/documentation/foundation/nscountedset <br>
- https://developer.apple.com/documentation/foundation/nsorderedset<br>
- https://github.com/matthewcheok/MCBinaryHeap<br>