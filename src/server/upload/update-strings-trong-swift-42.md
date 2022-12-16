Việc phát hành Swift 4.2 với Xcode 10 đang đến gần,  vì vậy đã đến lúc chúng ta cần xem xét các thay đổi của nó 
Trước hết , Ở bài viết này mình sẽ nói về các thay đổi của String khi update lên Xcode 10 và Swift4.2

Có rất ít thay đổi về String khi bạn update lên Swift 4.2 . Hầu hết các thay đổi là các tính năng mới trong Collection và Sequence protocols mà bạn có thể chọn để tận dụng khi bạn đã sẵn sàng.

**Swift 4.2 Deprecations**

Deprecations duy nhất mà mình thấy trong String playground của mình với bản beta hiện tại là dành cho việc sử dụng characters :

```
// Swift 3
var sentence = "Never odd or even"
for character in sentence.characters {
  print(character)
}
```

Trong Swift 4, String đã trở thành một tập hợp các ký tự để character không còn cần thiết nữa. Swift 4.2 đã được lược bỏ hẳn. Nếu bạn chưa làm như vậy, bạn nên chuyển sang sử dụng String hoặc Substring trực tiếp:

```
// Swift 4 and Swift 4.2
let sentence = "Never odd or even"
for character in sentence {
  print(character)
}
```

**Finding Last Elements**

Hầu hết các cải tiến đối với String trong Swift 4.2 đến từ các cải tiến đối với các protocol Sequence và Collection cũng áp dụng cho các kiểu khác như Array.

Ví dụ, bây giờ bạn có thể tìm thấy phần tử cuối cùng khớp với điều kiện :

```
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let lastItem = alphabet.last { $0 > "j" } // "z"

if let matchedIndex = alphabet.lastIndex(of: "x") {
  alphabet[matchedIndex]  // "x"
}

if let nextIndex = alphabet.lastIndex(where: { $0 > "j" }) {
  alphabet[nextIndex]  // "z"
}
```

Các phương thức tìm phần tử phù hợp đầu tiên vẫn tồn tại nhưng đã được đổi tên để phù hợp với các phương thức cuối cùng bên trên :

```
// Swift 4 - soon to be deprecated?
alphabet.index(of: "x") {
alphabet.index(where: { $0 > "j" })

// Swift 4.2
alphabet.first { $0 > "j" }
alphabet.firstIndex(of: "x") {
alphabet.firstIndex(where: { $0 > "j" })
```

**Random Element And Shuffled**

[SE-0202 Random Unification](https://github.com/apple/swift-evolution/blob/master/proposals/0202-random-unification.md) mang đến một API random mới cho Swift 4.2. Điều này thêm một phương thức randomElement vào Collection mà chúng ta có thể sử dụng để lấy một ký tự ngẫu nhiên từ một String:

```
let suits = "♠︎♣︎♥︎♦︎"
suits.randomElement()
```

Bạn cũng có thể lặp qua bản xáo trộn của collection ký tự trong một String:

```
for suit in suits.shuffled() {
  print(suit)
}
```

**Other Minor Changes**

Khi bạn muốn convert một giá trị sang String bằng cách sử dụng một số cách mà hơi khác hơn so với bản trước :

```
let hex = String(254, radix: 16, uppercase: true)
// "FE"

let octal = String(18, radix: 8)
// "22"
```

Bài viết được dịch từ :
https://useyourloaf.com/blog/updating-strings-for-swift-4.2/