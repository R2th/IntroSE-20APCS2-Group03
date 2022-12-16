## Giải thích về Ranges trong Swift với các ví dụ code đơn giản 

> **Ranges** trong Swift cho phép chúng ta chọn các phần của **Strings**, **collections** và các loại khác. Chúng là một biến thể Swift của **NSRange** mà chúng ta biết từ *Objective-C* mặc dù chúng không hoàn toàn giống nhau về cách sử dụng.
> 
> **Ranges** cho phép chúng ta viết code Swift bằng cách sử dụng toán tử phạm vi. Lần đầu tiên bạn làm việc với chúng có thể là vì bạn cần phải chọn một phạm vi các ký tự từ một **String** và có nhiều điều bạn có thể làm với nó! 

### 1. Các loại phạm vi

Có nhiều loại phạm vi trong Swift để bạn có thể sử dụng. Cách dễ nhất để làm việc với chúng là sử dụng toán tử phạm vi. Nào hãy cùng tìm hiểu qua các loại toán tử khác nhau của chúng đã có sẵn trong Swift  :smiley:

### 1.1 Toán tử phạm vi khép kín đi từ a...b 

```
let range: ClosedRange = 0...10
print(range.first!) // 0
print(range.last!) // 10
```

Một toán tử phạm vi khép kín đi từ a...b xác định một phạm vi bao gồm cả a và b trong đó a không được lớn hơn b.

Toán tử khép kín rất hữu ích nếu bạn muốn sử dụng tất cả các giá trị. Ví dụ: nếu bạn thích lặp đi lặp lại tất cả các yếu tố của một collection:

```
let names = ["Antoine", "Maaike", "Jaap"]
for index in 0...2 {
    print("Name \(index) is \(names[index])")
}
// Name 0 is Antoine
// Name 1 is Maaike
// Name 2 is Jaap
```

Các loại toán tử khác cũng có thể được sử dụng để chọn các thành phần từ bộ sưu tập. Tuy nhiên, đối với điều này, chúng ta cần sử dụng loại `CountableClosedRange`:

```
let names = ["Antoine", "Maaike", "Jaap"]
let range: CountableClosedRange = 0...2
print(names[range]) // ["Antoine", "Maaike", "Jaap"]
```

Rõ ràng, Swift đủ thông minh để tự mình phát hiện biến thể đếm được. Do đó, bạn có thể viết đoạn code trên như sau:

```
let names = ["Antoine", "Maaike", "Jaap"]
print(names[0...2]) // ["Antoine", "Maaike", "Jaap"]
```

### 1.2 Toán tử phạm vi Half-open đi từ a ..<b

```
let range: Range = 0..<10
print(range.first!) // 0
print(range.last!) // 9
```

Phạm vi half-open xác định một phạm vi đi từ a đến b nhưng không bao gồm b. Nó có tên là half-open vì nó có chứa giá trị đầu tiên nhưng không phải là giá trị cuối cùng. Cũng giống như với phạm vi khép kín, giá trị của a không được lớn hơn b.

Toán tử half-open có thể được sử dụng để lặp lại các danh sách dựa trên zero, chẳng hạn như mảng và bộ sưu tập trong Swift mà bạn muốn lặp lại nhưng không bao gồm độ dài của danh sách. Về cơ bản, nó giống như ví dụ code trước đây nhưng bây giờ chúng ta có thể sử dụng thuộc tính **count**:

```
let names = ["Antoine", "Maaike", "Jaap"]
print(names[0..<names.count]) // ["Antoine", "Maaike", "Jaap"]
```

Nếu chúng ta thực hiện tương tự với một toán tử khép kín, chúng ta sẽ gặp phải lỗi sau:

```
Fatal error: Array index is out of range
```

### 1.3 Toán tử một phía đi từ a...

Toán tử phạm vi một phía chỉ xác định một mặt của giới hạn, ví dụ: a... hoặc ... b. Chẳng hạn, phạm vi một phía càng xa càng tốt theo một hướng, ví dụ, lấy tất cả các phần tử của một mảng từ đầu mảng đến index là 2:

```
let names = ["Antoine", "Maaike", "Jaap"]
print(names[...2]) // ["Antoine", "Maaike", "Jaap"]
```

Hoặc lấy tất cả các phần tử bắt đầu từ index là 1 cho đến hết mảng:

```
let names = ["Antoine", "Maaike", "Jaap"]
print(names[1...]) // ["Maaike", "Jaap"]
```

Phạm vi một phía có thể được sử dụng cho lần lặp nhưng chỉ khi được sử dụng với giá trị bắt đầu a .... Mặt khác, nó không rõ nơi lặp lại nên bắt đầu từ đâu. Lặp lại trong phạm vi một phía yêu cầu bạn kiểm tra nơi vòng lặp sẽ kết thúc vì nếu không nó sẽ tiếp tục vô thời hạn.

```
let neededNames = 2
var collectedNames: [String] = []
for index in 0... {
    guard collectedNames.count != neededNames else { break }
    collectedNames.append(names[index])
}
print(collectedNames) // ["Antoine", "Maaike"]
```


### 2. Chuyển đổi phạm vi thành NSRange trong Swift

Sớm hay muộn bạn có thể gặp phải một vấn đề khi bạn muốn chuyển đổi phạm vi thành loại **NSRange**. Ví dụ: nếu bạn làm việc với **NSAttributedString** mà bạn muốn áp dụng các thuộc tính cho một phạm vi cụ thể. Trong ví dụ sau, chúng ta muốn áp dụng màu cam cho "Swift" trong title:

```
let title = "A Swift Blog"
let range = title.range(of: "Swift")
let attributedString = NSMutableAttributedString(string: title)
attributedString.setAttributes([NSAttributedString.Key.foregroundColor: UIColor.orange], range: range) // Cannot convert value of type 'Range<String.Index>?' to expected argument type 'NSRange' (aka '_NSRange')
```

Khi **Range** có thể được chuyển đổi thành **NSRange**, chúng ta đã gặp phải lỗi sau:

```
Cannot convert value of type ‘Range?’ to expected argument type ‘NSRange’ (aka ‘_NSRange’)
```

Chúng ta có thể khắc phục điều này bằng cách sử dụng trình khởi tạo tiện lợi có sẵn của NSRange là Range:

```
let convertedRange = NSRange(range, in: title)
```

Code cuối cùng sẽ trông như sau:

```
let title = "A Swift Blog"
let range = title.range(of: "Swift")!
let convertedRange = NSRange(range, in: title)
let attributedString = NSMutableAttributedString(string: title)
attributedString.setAttributes([NSAttributedString.Key.foregroundColor: UIColor.orange], range: convertedRange)
print(attributedString)
// A {
// }Swift{
//     NSColor = "UIExtendedSRGBColorSpace 1 0.5 0 1";
// } Blog{
// }
```

### 3. Ranges và Strings

Chuỗi và phạm vi là một chút đặc biệt hơn. Như bạn có thể biết, String thực sự là một tập hợp các ký tự. Tuy nhiên, không phải mọi ký tự đều có cùng kích thước. Chúng ta có thể chứng minh điều này bằng cách làm việc với **NSRange** và **NSString** có chứa biểu tượng cảm xúc:

```
let emojiText: NSString = "🚀launcher"
print(emojiText.substring(with: NSRange(location: 0, length: 2)))
// Expected: 🚀l
// Actually returns: 🚀
```

Như bạn có thể thấy, biểu tượng cảm xúc tên lửa dài hơn 1 ký tự. Do đó, chuỗi con của chúng ta không trả về kết quả mong đợi.

### 4. Làm việc với các String indexes

Giải pháp cho vấn đề này là sử dụng **Range<String.Index>** thay vì **Range<Int>**. **String.Index** tính đến kích thước thực tế của một ký tự. Chúng ta chỉ có thể sử dụng **Range** half-open.

```
let emojiText = "🚀launcher"
let endIndex = emojiText.index(emojiText.startIndex, offsetBy: 2)
let range: Range<String.Index> = emojiText.startIndex..<endIndex
print(emojiText[range]) // 🚀l
```

### 5. Kết luận 

Hy vọng rằng, bạn đã hiểu thêm một chút về các khả năng mà Swift mang lại cho chúng ta  khi làm việc với các phạm vi và bộ sưu tập. Chúng ta đã sử dụng các toán tử khép kín, half-open và một phía mà tất cả đều có ưu và nhược điểm của chúng.

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃