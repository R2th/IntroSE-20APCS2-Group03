- Một trong những mục tiêu của Swift là trở thành một ngôn ngữ lập trình có tính ứng dụng cao từ các `task high-level`, xây dựng UI, `scripting`, đến lập trình `low-level system`. Đó là một mục tiêu đầy tham vọng và chưa hoàn thành, nhưng có một số đặc điểm của Swift khiến nó dễ dàng mở rộng.

- Một yêu cầu là làm thế nào `standard library`  làm việc với các `built-in collections` của nó hiệu quả nhất  bằng cách giảm số lượng trường hợp các `element` của chúng được sao chép, di chuyển.

## 1/ A slice of a binary: 
- Trong Swift, một `slice`  là một loại `collection` đặc biệt không thực sự lưu trữ bất kỳ `element` nào của riêng nó mà hoạt động như một proxy (hoặc `view`) để cho phép chúng ta truy cập và làm việc với một tập hợp con của một bộ sưu tập khác  riêng biệt.

- VD,  chúng ta có một mảng chứa 10 số và chúng ta muốn lấy ra 5 số đầu  để làm việc. Điều đó được thực hiện bằng cách sử dụng `Range-based` [subscripting](https://www.swiftbysundell.com/articles/the-power-of-subscripts-in-swift/), như sau:

```swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let firstFive = numbers[..<5]
```

- Mới nhìn thì `firstFive` sẽ có cùng loại với `numbers` là `Array<Int>`. Trong thực tế, những gì chúng ta đã làm  trên là tạo ra một `slice` loại `ArraySlice<Int>`

- Thay vì sao chép 5 phần tử đầu  vào 1 `instance` `Array` mới, thay vào đó, `standard library` chỉ  cung cấp cho chúng ta 1 cái nhìn vào `range` các `element` giúp tăng hiệu suất đáng kể, đặc biệt là khi làm việc với các `collection` lớn hơn.

- Bằng cách không thực hiện bất kỳ sao chép hoặc cấp phát bộ nhớ bổ sung nào cho `collection`, một `slice` có thể được khởi tạo trong thời gian không đổi (O(1). Điều đó giúp tạo ra một `slice` nhanh hơn + tạo ra các `slice` như thể chúng ta thực hiện nó trên `collection` ban đầu. 

## 2/ Prefixes and suffixes: 

- Hãy bắt đầu bằng cách xem cách chúng ta có thể sử dụng `slicing` để lấy ra các `prefixes` và `suffixes` từ `collection`. Ví dụ, chúng ta làm việc trên `TodoApp`:

```swift
struct TodoList {
    var name: String
    var items = [Item]()
    ...
}
```
- Bây giờ, chúng ta  đang xây dựng một `feature`cho phép `user` của chúng ta  xem nhanh ba mục  đầu trong danh sách cụ thể  - ví dụ như trong tiện ích mở rộng của `TodayApp` trên `iOS` hoặc `macOS`. Chúng tacó thể sử dụng API đăng ký tương tự như chúng ta đã sử dụng khi `slicing array`  số trên của chúng ta:

```swift
extension TodoList {
    var topItems: ArraySlice<Item> {
        items[..<3]
    }
}
```

- Mặc dù ở trên có cú pháp rất gọn gàng nhưng nó lại là một `implementation` khá nguy hiểm. Vì chúng ta có thể biết bao nhiêu `item` `TodoList` sẽ thực sự được sử dụng, app của chúng tacó thể bị `crash` khi truy cập vào `property` trên vì cũng giống như khi lấy một phần tử từ một mảng, việc đăng ký theo `range` cũng gây ra sự cố khi được sử dụng với các phần từ ngoài `range`.

- Trong khi chúng ta có thể  kiểm tra giới hạn của riêng mình vào việc `implementation`:

```swift
extension TodoList {
    var topItems: ArraySlice<Item> {
        items.prefix(3)
    }
}
```

- Bây giờ `API` mới của chúng ta sẽ hoạt động như mong đợi, ngay cả khi `TodoList` chứa ít hơn 3 `item` và việc `implementation` của chúng ta vẫn có độ phức tạp O(1) nghĩa là chúng ta có thể thoải mái để nó  `computed property` mà không có nguy cơ gây ra việc giảm hiệu năng.

- Tuy nhiên có một điều mà chúng ta phải ghi nhớ khi làm việc với các `slice` là chúng thực sự là một loại riêng biệt so với các `collection` ban đầu- nghĩa là chúng ta có thể chuyển qua một cá thể `ArraySlice` cho bất kỳ `API` nào chấp nhận `Array` và ngược lại. Nó cho chúng ta toàn quyền kiểm soát khi một `slice` được tách ra (và các `element`của nó được sao chép) khỏi `collection` ban đầu của nó.

- Ví dụ , chúng ta sử dụng một cách khác của `standard-ibrary` `API` `prefix`(cùng với `suffix` của nó) để phân chia một package thành hai package riêng biệt dựa trên các `index`. Vì chúng ta không muốn model `Shipment` của mình chứa `ArraySlice`nên chúng ta phải chuyển đổi hai `slice` của chúng ta thành  `Array<Package>`:

```swift
struct Shipment {
    var destination: Address
    var packages = [Package]()
    ...
}

extension Shipment {
    func split() -> (first: Shipment, second: Shipment) {
        guard packages.count > 1 else {
            return (self, Shipment(destination: destination))
        }

        let splitIndex = packages.count / 2

        return (
            Shipment(
                destination: destination,
                packages: Array(packages.prefix(upTo: splitIndex))
            ),
            Shipment(
                destination: destination,
                packages: Array(packages.suffix(from: splitIndex))
            )
        )
    }
}
```

- Chúng ta đã tính toán các `prefix` và `suffix` của chúng tadựa trên số lượng phần tử và index, nhưng chúng ta cũng có thể sử dụng logic tùy biến. Ví dụ: chúng ta  gọi `prefix` bằng cách:

```swift
let qualifiedPlayers = topPlayers.prefix { $0.score > 100_000 }
```

## 3/ Dropping elements: 

- Ví dụ, chúng ta muốn `remove` bất kỳ số nào xuất hiện ở đầu `string`, để chuẩn bị một `string` được sử dụng dưới dạng  được định danh theo tiêu chuẩn. Chúng ta có thể yêu cầu `string`  bỏ tất cả các `element` trong khi `element` hiện tại là một `number` :

```swift
extension StringProtocol {
    func trimmingLeadingNumbers() -> SubSequence {
        drop(while: { $0.isNumber })
    }
}
```

- Một trong những lợi ích chính của API `collection` dựa trên `slicing` trong  Swift là chúng có thể được khởi tạo mà không cần  sao chép. Đó là lợi ích mà chúng ta có trong các tình huống như bên dưới:

```swift
func normalizeUsername(_ username: String) -> String {
    username.trimmingLeadingNumbers().filter {
        $0.isLetter || $0.isNumber
    }
}
```
- Chúng ta hãy xem cách  kết hợp  khác  `dopFirst` với `prefix` để dễ dàng thêm hỗ trợ phân trang cho bất kỳ BidirectionalCollection nào (bao gồm các loại như Array, Range, v.v.). Bằng cách gọi dropFirst đầu tiên để xóa tất cả các thành phần trước khi trang hiện tại bắt đầu và sau đó sử dụng tiền tố để trích xuất một lát có cùng kích thước với kích thước trang của chúng tôi, chúng tôi có thể triển khai tiện ích mở rộng phân trang như thế này:

```swift
extension BidirectionalCollection {
    func page(withIndex pageIndex: Int, size: Int) -> SubSequence {
        dropFirst(pageIndex * size).prefix(size)
    }
}
```

- Quay trở lại loại TodoList của chúng tôi từ trước đó, sau đó chúng tôi có thể bọc API ở trên một mức độ trừu tượng cao hơn một chút, cho chúng tôi một phương pháp phân trang thực sự đẹp có thể được sử dụng để hiển thị bất kỳ danh sách các mục việc cần làm nào trong một trang cách thức:

```swift
extension TodoList {
    func page(at index: Int) -> ArraySlice<Item> {
        items.page(withIndex: index, size: 25)
    }
}
```

- Lúc đầu, có vẻ hơi lạ khi trả lại `ArraySlice` từ `API` trên, thay vì chuyển đổi kết quả thành một `Array` thích hợp. Tuy nhiên chúng ta đã tuân theo các quy tắc  giống như `standard library`  cho phép trang web   quyết định cách thức và thời điểm chuyển đổi từng `slice` cho phép chúng ta thực hiện thêm `string` mà không bị ảnh hưởng hiệu suất.