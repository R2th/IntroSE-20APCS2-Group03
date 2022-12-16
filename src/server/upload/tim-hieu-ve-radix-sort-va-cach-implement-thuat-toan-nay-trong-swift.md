# I. Giới thiệu

Thông thường, khi sắp xếp các phần tử trong mảng, chúng ta thường sử dụng các thuật toán để so sánh các phần tử, lấy kết quả so sánh để sắp xếp các phần tử vào đúng vị trí của mình. Tuy nhiên, Radix sort lại đi theo một cách tiếp cận khác, nó là một thuật toán sắp xếp không so sánh. Cơ sở để Radix sort sắp xếp các phần tử dựa vào nguyên tắc phân loại thư. Vì vậy, Radix sort còn có tên là Postmans sort.

# II. Nội dung

## 1. Tìm hiểu thuật toán

Để thực hiện sắp xếp, radix sort phân loại các phần tử theo lần lượt từng chữ số: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn, …

Giả sử, chúng ta có một mảng gồm các số như sau:
```
[43, 613, 831, 987, 17, 210, 1990, 1234]
```
Đầu tiên, mảng sẽ được chia thành các nhóm dựa vào giá trị của chữ số hàng đơn vị. chúng ta sẽ chia được các nhóm sau:
```
[210, 1990] // nhóm 0
[831] // nhóm 1
[43, 613] // nhóm 3
[1234] // nhóm 4
[987, 17] // nhóm 7
```
Sau khi chia nhóm theo hàng đơn vị, thứ tự các phần tử trong mảng sẽ như sau:
```
[210, 1990, 831, 43, 613, 1234, 987, 17]
```
Tiếp theo, mảng sẽ được chia thành các nhóm dựa vào hàng chục. Kết quả chúng ta được các nhóm:
```
[210, 613, 17] // nhóm 1
[831, 1234] // nhóm 3
[43] // nhóm 4
[987] // nhóm 8
[1990] // nhóm 9
```
Sau khi chia nhóm theo hàng chục, thứ tự các phần tử trong mảng sẽ như sau:
```
[210, 613, 17, 831, 1234, 43, 987, 1990]
```
Thuật toán tiếp tục thực hiện với chữ số hàng trăm, chúng ta được các nhóm sau:
```
[17, 43] // nhóm 0
[210, 1234] // nhóm 2
[613] // nhóm 6
[831] // nhóm 8
[987, 1990] // nhóm 9
```
Sau khi chia nhóm theo hàng trăm, thứ tự các phần tử trong mảng sẽ như sau:
```
[17, 43, 210, 1234, 613, 831, 987, 1990]
```
Tiếp tục thực hiện với chữ số hàng nghìn, chúng ta được các nhóm sau:
```
[17, 43, 210, 613, 831, 987] // nhóm 0
[1234, 1990] // nhóm 1
```
Sau khi chia nhóm theo hàng nghìn, thứ tự các phần tử trong mảng sẽ như sau:
```
[17, 43, 210, 613, 831, 987, 1234, 1990]
```
Đến đây, toàn bộ các số trong mảng đều không có giá trị hàng chục nghìn, nên thuật toán dừng lại, chúng ta có mảng cuối cùng như kết quả bên trên.

## 2. Độ phức tạp

Xét một mảng gồm n phần tử, các phần tử trong mảng có tối đa m chữ số thì:
* Số lần chia nhóm các phần tử: m lần
* Trong mỗi lần chia nhóm và gộp lại thành mảng, các phần tử chỉ được xét đúng 1 lần
Vì vậy, độ phức tạp của thuật toán Radix sort là O(2mn) = O(n)

## 3. Implement swift code

Chúng ta thực hiện implement code cho Radix sort bằng code sau:

``` Swift
import UIKit

// 0
extension Array where Element == Int {
    
    public mutating func radixSort() {
        // 1
        let base = 10
        // 2
        var done = false
        var digits = 1
        
        // 3
        while !done {
            // 4
            done = true
            // 5
            var buckets: [[Int]] = .init(repeating: [], count: base)
            // 6
            forEach {
                number in
                let remainingPart = number / digits
                let digit = remainingPart % base
                buckets[digit].append(number)
                // 7
                if remainingPart > 0 {
                    done = false
                }
            }
            // 8
            digits *= base
            self = buckets.flatMap { $0 }
        }
    }
}

// 9
var array = [43, 613, 831, 987, 17, 210, 1990, 1234]
print("Original array: \(array)")
array.radixSort()
print(“Sorted array: \(array)")
// [17, 43, 210, 613, 831, 987, 1234, 1990]
```

Trong đoạn code trên, chúng ta lần lượt làm những công việc sau:
* 0: Tạo extension của Array, hàm radixSort() sẽ được implement trên các Array có dạng Int
* 1: khai báo hằng base của thuật toán, số thập phân có 10 chữ số từ 0 đến 9, nên chúng ta khai báo base là 10
* 2: biết done để theo dõi trạng thái kết thúc của thuật toán, và biến digits thể hiện cho chữ số hiện tại đang được xem xét (1 cho hàng đơn vị, 10 cho hàng chục,…)
* 3: Toàn bộ thuật toán radix sort sẽ được thực hiện trong vòng while này, vòng while kết thúc khi thuật toán kết thúc, giá trị của biến done là true
* 4: Gán giá trị cho done = true
* 5: tạo 1 mảng 2 chiều để lưu trữ các nhóm từ 0 đến 9
* 6: thực hiện việc chia nhóm mỗi một số trong array
* 7: đặt điều kiện để kết thúc vòng lặp của thuật toán. Thuật toán sẽ kết thúc nếu remainingPart bằng 0
* 8: tăng chữ số hiện tại lên hàng tiếp theo để tiếp tục sắp xếp (từ đơn vị lên chục, lên trăm, lên nghìn,…)
* 9: code demo thực tế việc gọi hàm radixSort() để sắp xếp mảng

Vậy là việc implement thuật toán radix sort đã được hoàn thành.

# III. Kết luận

Trên đây, tôi đã giới thiệu đến các bạn thuật toán radix sort, ý tưởng chung của thuật toán, ví dụ từng bước sắp xếp, và implement code trong Swift.

Cuối cùng, xin cảm ơn các bạn đã theo dõi vài viết này, have a nice day :)