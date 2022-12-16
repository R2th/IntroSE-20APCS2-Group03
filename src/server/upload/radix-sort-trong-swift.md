# Giới thiệu
Trong bài viết này, bạn sẽ tìm hiểu một thuật toán sắp xếp hoàn toàn khác với các thuật toán sắp xếp khác. Nếu như trong các thuật toán khác, cơ sở để sắp xếp luôn là việc so sánh giá trị của 2 phần tử thì **Radix sort** (Sắp Xếp Theo Cơ Số) lại dựa trên cơ sở phân loại để sắp xếp.

![](https://images.viblo.asia/0dcbec7d-53b4-4d0d-b717-7c19f5fe8351.png)
# Ví dụ
Để tìm hiểu làm sao Radix Sort hoạt động, bạn hãy cùng sắp xếp mảng array sau:
```swift
var array = [88, 410, 1772, 20]
```
**Radix sort** dựa trên việc phân loại các phần tử lần lượt theo các chữ số hàng đơn vị, hàng chục, hàng trăm,..., như dưới đây:

![](https://koenig-media.raywenderlich.com/uploads/2018/04/radix1-480x157.png)

Đầu tiên, mảng array được chia cắt vào các thùng (**bucket**) dựa vào giá trị nhỏ nhất của chúng: **hàng đơn vị**.

![](https://koenig-media.raywenderlich.com/uploads/2018/04/radix2-480x210.png)

Các thùng này sau đó được lấy ra theo thứ tự, dẫn đến mảng được thành:

```swift
array = [410, 20, 1772, 88]
```

Tiếp tới lặp lại quy trình này ở **hàng chục**:

![](https://koenig-media.raywenderlich.com/uploads/2018/04/radix3-480x274.png)

Thứ tự của mảng array không thay đổi lần này.

Tiếp tới đến **hàng trăm**:

![](https://koenig-media.raywenderlich.com/uploads/2018/04/radix4-480x210.png)

Đối với các giá trị không có giá trị ở hàng trăm (hoặc bất kỳ vị trí nào khác), chữ số sẽ được coi bằng **0**.

Gắn lại mảng ta được:

```swift
array = [20, 88, 410, 1772]
```

Cuối cùng, ta kiểm tra giá trị **hàng nghìn**:

![](https://koenig-media.raywenderlich.com/uploads/2018/04/radix4-480x210.png)

Gắn lại mảng này dẫn ta tới mảng array cuối cùng được sắp xếp:

```swift
array = [20, 88, 410, 1772]
```

# Thực hành

Tạo file **playground** trong Xcode và thêm dòng code dưới đây:
```swift
extension Array where Element == Int {

  public mutating func radixSort() {

  }
}
```
Tại đây, bạn đã thêm một phương thức ```radixSort``` vào các mảng Int thông qua phần mở rộng (extension). Bắt đầu thực hiện phương thức ```radixSort``` bằng cách sử dụng như sau:

```swift
public mutating func radixSort() {
  // 1
  let base = 10
  // 2
  var done = false
  var digits = 1
  while !done {
  
  }
}
```

Trong đó:
1. Bạn sẽ sắp xếp số base 10 (decimal numbers) trong trường hợp này. Vì bạn sẽ sử dụng giá trị này nhiều lần trong thuật toán, nên bạn lưu trữ nó trong biến ```base```.
1. Bạn khai báo hai biến để theo dõi tiến trình của bạn. Radix sort hoạt động theo nhiều lượt, do đó, biến ```done``` được khai báo để xác định xem việc sắp xếp đã hoàn thành hay chưa? Và biến ```digits``` theo dõi chữ số hiện tại mà bạn đang sử dụng.

Tiếp theo, bạn sẽ viết code sắp xếp từng phần tử vào các thùng (còn được gọi là **Bucket sort**).

# Bucket Sort

Viết đoạn code dưới đây vào **trong** vòng lặp ```while```
```swift
// 1
var buckets: [[Int]] = .init(repeating: [], count: base)
// 2
forEach {
  number in
  let remainingPart = number / digits
  let digit = remainingPart % base
  buckets[digit].append(number)
}
// 3
digits *= base
self = buckets.flatMap { $0 }
```

Trong đó:

1. Bạn khởi tạo các thùng bằng cách sử dụng một mảng hai chiều. Bởi vì bạn sử dụng base 10, bạn cần 10 thùng.
1. Bạn đặt từng số vào đúng thùng tương ứng.
1. Bạn cập nhật ```digit``` thành chữ số tiếp theo mà bạn muốn kiểm tra và cập nhật mảng sử dụng ```buckets```. Sử dụng flatMap sẽ chuyển mảng hai chiều thành mảng một chiều, như vậy bạn có thể làm trống các thùng vào mảng.

# Khi nào thì dừng lại?
Vòng lặp while của bạn hiện đang chạy mãi mãi, vì vậy bạn sẽ cần một điều kiện kết thúc. Bạn sẽ làm điều đó như sau:

Ở đầu vòng lặp ```while```, thêm:
```swift
done = true
```
Trong phần cuối của ```forEach```, thêm:
```swift
if remainingPart > 0 {
  done = false
}
```
Vì ```forEach``` lặp lại trên tất cả các số nguyên, miễn là một trong các số nguyên vẫn có các chữ số chưa được sắp xếp, bạn sẽ cần tiếp tục sắp xếp.

# Hoàn thành
Đây là phiên bản cuối cùng của thuật toán Radix Sort:
```swift
extension Array where Element == Int {

    public mutating func radixSort() {
        let base = 10
        var done = false
        var digits = 1
        while !done {
            done = true
            var buckets: [[Int]] = .init(repeating: [], count: base)
            forEach {
                number in
                let remainingPart = number / digits
                let digit = remainingPart % base
                buckets[digit].append(number)
                if remainingPart > 0 {
                    done = false
                }
            }
            digits *= base
            self = buckets.flatMap { $0 }
        }
    }
}
```

Bạn có thể chạy thử trên playground bằng cách:
```swift
var array = [88, 410, 1772, 20]
print("Original array: \(array)")
array.radixSort()
print("Radix sorted: \(array)")
```

Bạn sẽ thấy được output như sau:
```swift
Original array: [88, 410, 1772, 20]
Radix sorted: [20, 88, 410, 1772]
```

# Tài liệu tham khảo
Raywenderlich. 2018. Data Structures and Algorithms in Swift: Radix Sort | raywenderlich.com. [ONLINE] Truy cập tại: https://www.raywenderlich.com/51-data-structures-and-algorithms-in-swift-radix-sort. [14 December 2018].