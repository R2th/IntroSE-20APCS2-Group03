## A Flattening Map (33)

Thường khi bạn muốn truy vấn 1 mảng đồng thời hàm biến đổi trả về mảng khác và không chỉ 1 thành phần.
Ví dụ, chúng ta có 1 phương thức, `links`, nó có thể đọc file Markdown và trả về 1 mảng chứa URL của tất cả đường dẫn trong file. Phương thức đó trông như sau:

```
func extractLinks(markdownFile: String) -> [URL]
```

Nếu chúng ta có đống file Markdown và muốn triết xuất đường dẫn từ tất cả file thành 1 mảng đơn, chúng ta có thể cố viết vài thử như `markdownFiles.map(extractLinks)` . Nhưng nó sẽ trả về 1 mảng của 1 mảng chứa các URLs: mỗi file 1 mảng. Giờ bạn mới thực hành map, lấy lại 1 mảng của mảng và sau đó làm phẳng chúng lại để có kết quả là 1 mảng đơn:

```
let markdownFiles: [String] = // ...
let nestedLinks = markdownFiles.map(extractLinks)
let links = nestedLinks.joined()
```

Hàm `flatMap` là sự kết hợp giữa 2 toán tử trong 1 bước.  Vì vậy `markdownFiles.flatMap(extractLinks)` trả về tất cả URLs trong mảng của từng file Markdown như 1 mảng đơn.

Về cơ bản **flatMap** giống với **map**, ngoại trừ việc i phươnng thức thành của nó biến đổi thành 1 mảng. Để làm nên sự đầy đủ của nó, nó sử dụng thêm **append(contentsOf:)** thay thế **append(:)** trong việc làm phẳng mảng kết quả:

```
extension Array {
func flatMap<T>(_ transform: (Element) -> [T]) -> [T] {
var result: [T] = [] 
for x in self{
result.append(contentsOf: transform(x)) }
return result }
}
```

Một cách dùng khác tốt hơn với **flatMap** là kết hợp những thành phần từ những mảng khác nhau. Để việc kết hợp mảng thuận lợi, flatMap trên 1 mảng và map lên mảng còn lại:

```
let suits = ["♠", "♥", "♣", "♦"]
let ranks = ["J","Q","K","A"]
let result = suits.flatMap { suit in
ranks.map { rank in
(suit, rank) }
}
/*
[("♠", "J"), ("♠", "Q"), ("♠", "K"), ("♠", "A"), ("♥", "J"), ("♥",
"Q"), ("♥", "K"), ("♥", "A"), ("♣", "J"), ("♣", "Q"), ("♣", "K"),
("♣", "A"), ("♦", "J"), ("♦", "Q"), ("♦", "K"), ("♦", "A")]
*/

```

## Iteration using forEach
Toán tử cuối cùng chúng tôi muốn thảo luận là forEach. Nó hoạt động gần như 1 vòng lặp: Phương thức truyền vào được thực thi mỗi lần cho 1 đối tượng trong chuỗi. Và không giống như map, forEach không trả về cái gì. Hãy cùng bắt đầu với việc thay thế vòng lặp với forEach:

```
for element in [1,2,3] { 
print(element)
}

[1,2,3].forEach { element in 
print(element)
}
```

Không có thay đổi lớn, nhưng nó có thể hữu ích nếu bạn thực hiện hàm gọi cho mỗi phần tử trong chuỗi. Sử dụng hàm tên **forEach** thay thế cho closure exoresion có thể ngắn gọn và dễ hiểu hơn. Ví dụ, nếu bạn ở trong 1 view controller và muốn thêm 1 mảng subview vào view chính, bạn chỉ việc viết theViews.forEach(view.addSubview).

Tuy nhiên, có 1 số điều khác biệt nhỏ bé giữa vòng lặp và forEach. Điển hình, nếu 1 vòng lặp có câu lệnh trả về trong nó, việc viết lại nó với forEach có thể chẳng phải thay đổi đáng kể code. Xem xét ví dụ bên dưới, nó được viết bằng cách dùng vòng lặp với điều kiện **where**

```
extension Array where Element: Equatable {
func index(of element: Element) -> Int? {
for idx in self.indices where self[idx] == element {
return idx
}
return nil
} 
}
```

Chúng ta không thể sao chép trực tiếp câu lệnh where trong cấu trúc forEach, nên chúng ta có thể viết lại (không giống hệt) bằng việc dùng filter:

```
extension Array where Element: Equatable {
func index_foreach(of element: Element) -> Int? {
self.indices.filter { idx in self[idx] == element
}.forEach { idx in
return idx
}
return nil
} }
```

Giá trị return trong closure forEach không trả về ra ngoài function, nó chỉ trả về bên trong closure của nó. Trong trường hợp thực tế, chúng ta có thể phát hiện bug vì trình biên dịch sẽ tạo cảnh báo về việc đối số sẽ được trả về không được sử dụng, nhưng bạn không nên dựa vào nó để đưa ra giải pháp.

Ngoài ra, xem xét ví dụ đơn giản dưới:
```
(1..<10).forEach { 
number in print(number) 
if number > 2 {return }
}
```

Một điều không thật sự rõ ràng đó là việc in ra tất cả số trong phạm vi đầu vào. Câu lệnh return không phá vỡ vòng lặp, thay vì đó nó chỉ quay trở lại bao đóng.
Trong một số tình huống, giống như ví dụ addSubview bên trên, forEach có thể tốt hơn vòng lặp. Tuy nhiên, vì không bị phá vỡ bởi return, chúng tôi chỉ khuyên bạn nên chỉ dùng với chức năng chính của nó, ngoài ra thì dùng vòng lặp thông thường để thay thế
## Các kiểu mảng
### Slices
Thông thường để truy cập 1 phần tử đơn trong 1 mảng với vị trí ( ví dụ fibs[0] ) chúng ta cũng có thể truy cập nhiều vị trí của phần tử qua subscript. Ví dụ, để lấy tất cả trừ đối tượng đầu tiên của mảng, chúng ta sử dụng:
```
let slice = fibs[1...]
slice // [1, 1, 2, 3, 5]
type(of: slice) // ArraySlice<Int>
```

Với việc slice mảng bắt đầu từ phần tử thứ 2. Kiểu của kết quả trả về là ArraySlice, không phải Array, ArraySlice là 1 view về mảng. Nó được hỗ trở bởi mảng gốc, tuy nhiên nó cung cấp cái nhiều dựa trên slice. Điều này chắc chắn rằng mảng không cần sao chép. Kiểu ArraySlice  có cùng những hàm định danh như Array, nên bạn có thể sử dụng 1 slice như mảng nếu trước đó nó là mảng. Nếu bạn muốn chuỷen 1 slice thành 1 mảng, bạn cần cấu trúc 1 mảng mới từ slice:

```
let newArray = Array(slice)
type(of: newArray) // Array<Int>
```

![](https://images.viblo.asia/f71eeb91-d060-4c28-971e-ccaeb1a9fff3.png)

### Bridging
Mảng Swift có thể cầu nối với OBjective-C. Nó cũng có thể được sử dụng với C, nhưng chúng ta có thể convert trong những chapter tiếp theo. Vì NSArray chỉ có thể  giữ các đội tượng, trình biên dịch và runtime sẽ tự động bọc các giá trị không tương thích ( ví dụ như enum) trong đối tượng không xác định. Một số kiểu giá trị ( như là Int, Bool, và String, nhưng kể cả Dictionary và Set) được cầu nối mặc định với kiểu đối tượng của nó trong Objective - C

```
Cơ chế cầu nối giữa tất cả loại của Swift với Objective-C không chỉ giúp cho việc sử dụng với mảng dễ dàng hơn. Nó cũng cho phép điều đó với những kiểu nhóm khác, như dictionary và set, nó cũng mở ra những chức năng trong tưuong lai tiềm năng giữa Swift và Objective-C. Ví dụ, phiên bản tương lai của Swift cho phép kiểu giá trị Swift cũng phù hợp với @objc protocol
```