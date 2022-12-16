Làm việc với giá trị ngẫu nhiên trong Swift thường khiến chúng ta gặp 1 chút khó khăn bởi vì Swift chưa cung cấp API native cho việc lấy ra giá trị ngẫu nhiên. Do đó, chúng ta đành phải sử dụng các API của C do hệ điều hành cung cấp, và việc đọc chúng cũng không được tự nhiên cho lắm (vd: arc4random).

Tuy nhiên, phiên bản Swift 4.2 sẽ giúp chúng ta thực hiện việc này dễ dàng hơn, bằng việc cung cấp một native random number API với khá là đầy đủ tính năng trong thư viện chuẩn.

## Tạo số ngẫu nhiên

Bắt đầu từ phiên bản Swift 4.2 chúng ta sẽ có riêng 1 static method random(in:) để chọn ra 1 số ngẫu nhiên trong 1 dãy chỉ định. Tham số đầu vào của hàm là 1 dãy số (đóng hoặc mở) và hàm sẽ trả ra 1 giá trị ngẫu nhiên trong dãy số đó:

```
Int.random(in: 1...1000) // → 691
Double.random(in: 0..<1) // → 0.8741555749903935
UInt32.random(in: 0xD800...0xDFFF) // → 55666
```

## Giá trị boolean ngẫu nhiên

Đối với giá trị kiểu Bool, chúng ta cũng sẽ có 1 hàm riêng random() để lấy ra 1 giá trị ngẫu nhiên cho nó. Bởi vì kiểu Bool chỉ có 2 giá trị true và false do đó hàm random() không cần tham số đầu vào và tất nhiên giá trị trả ra sẽ là true hoặc false. Chúng ta có thể thấy cách sử dụng hàm random() rất đơn giản như sau:

```
func coinToss(count tossCount: Int) -> (heads: Int, tails: Int) {
    var tally = (heads: 0, tails: 0)
    for _ in 0..<tossCount {
        let isHeads = Bool.random()
        if isHeads {
            tally.heads += 1
        } else {
            tally.tails += 1
        }
    }
    return tally
}

let (heads, tails) = coinToss(count: 100)
// → (heads 54, tails 46)
```

## Phần tử ngẫu nhiên trong 1 nhóm các phần tử

Các Collections (tuân theo protocol Collection) cũng sẽ có 1 hàm lấy ra 1 phần tử ngẫu nhiên trong nó randomElement(). Giá trị trả ra của hàm này là 1 giá trị Optional do Collection có thể là 1 tập rỗng.
Giá trị random của 1 tập rỗng là nil:

```
let emptyRange = 10..<10
emptyRange.isEmpty // → true
emptyRange.randomElement() // → nil
```

Dưới đây ta sẽ lấy giá trị 1 character ngẫu nhiên từ 1 string:

```
let emotions = "😀😂😊😍🤪😎😩😭😡"
let randomEmotion = emotions.randomElement()! // → "🤪"
```

## Xáo trộn các phần tử 1 cách ngẫu nhiên

Bên cạnh việc lấy 1 phần tử ngẫu nhiên trong 1 tập hợp, Swift 4.2 cũng cung cấp cho chúng ta 1 hàm sh để chúng ta có thể dễ dàng xáo trộn thứ tự của 1 sequence cho trước:

`(1...10).shuffled() // → [10, 3, 8, 1, 4, 6, 2, 7, 9, 5]`

Ngoài ra còn có 1 biến thể shuffle() dùng để xáo trộn thứ tự của 1 collection (phải đồng thời conform MutableCollection và RandomAccessCollection):

```
var numbers = Array(1...10)
numbers.shuffle()
// → numbers is now [3, 10, 7, 4, 6, 9, 2, 5, 8, 1]
```

Trên đây tôi đã giới thiệu tới các bạn 1 số API mới mà Swift 4.2 cung cấp để giúp chúng ta làm việc dễ dàng hơn với việc xử lý ngẫu nhiên. Hy vọng bài viết sẽ bổ ích và giúp ích cho công việc của bạn!
Bài viết được lược dịch từ bài viết sau, các bạn có thể tham khảo đầy đủ tại: https://oleb.net/blog/2018/06/random-numbers-in-swift/