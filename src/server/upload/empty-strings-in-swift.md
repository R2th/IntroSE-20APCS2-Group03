Bạn coi một string như nào là empty strong Swift? Điều đó phụ thuộc vào việc bạn định nghĩa thế nào là "empty". Có thể bạn định nghĩa string empty có độ dài bằng 0, hoặc cũng có thể là khi 1 optional string là nil. Vậy một blank string chỉ bao gồm khoảng trắng thì sao. Hãy cùng xem trong Swift chúng được định nghĩa như nào thông qua việc test các giá trị dưới đây.

## Sử dụng isEmpty

Một string trong Swift là một bộ các ký tự và Collection protocol đã định nghĩa sẵn phương thức để kiểm tra một empty collection:

`var isEmpty: Bool { get }`

Chúng ta có thể truy cập vào source code về Collection.swift trong thư viện tiêu chuẩn và chúng ta có thể thấy nó thực hiện như thế nào:

```
public var isEmpty: Bool {
  return startIndex == endIndex
}
```

Nếu như startIndex và endIndex của collection là giống nhau thì collection đó là empty. Thử kiểm tra lại với string:

```
"Hello".isEmpty  // false
"".isEmpty       // true
```

**Chú ý: Nên sử dụng isEmpty thay vì đếm số ký tự và so sánh với 0, vì nó sẽ phải chạy hàm đếm bằng vòng lặp trên toàn bộ ký tự chuỗi.**

```
// Don't do this to test for empty
myString.count == 0
```

## Khoảng trống trong chuỗi thì sao?

Thi thoảng chúng ta không chỉ muốn kiểm tra empty string mà còn blank string. Ví dụ, chúng ta sẽ kiểm tra các chuỗi sau:

```
" "        // space
"\t\r\n"   // tab, return, newline
"\u{00a0}" // Unicode non-breaking space
"\u{2002}" // Unicode en space
"\u{2003}" // Unicode em space
```

Có thể cách làm của 1 số người sẽ là trimming whitespace từ string đó sau đó mới kiểm tra isEmpty. Với Swift 5, chúng ta có thể sử dụng các thuộc tính của character để kiểm tra whitespace. Chúng ta có thể viết test như sau:

```
func isBlank(_ string: String) -> Bool {
  for character in string {
    if !character.isWhitespace {
        return false
    }
  }
  return true
}
```

Nó hoạt động tốt, nhưng có 1 cách đơn giản hơn để kiểm tra tất cả phần tử trong 1 sequence bằng cách sử dụng allSatisfy. Chúng ta có thể viết lại hàm trên như sau:

```
extension String {
  var isBlank: Bool {
    return allSatisfy({ $0.isWhitespace })
  }
}
```

Và đây là kết quả:

```
"Hello".isBlank        // false
"   Hello   ".isBlank  // false
"".isBlank             // true
" ".isBlank            // true
"\t\r\n".isBlank       // true
"\u{00a0}".isBlank     // true
"\u{2002}".isBlank     // true
"\u{2003}".isBlank     // true
```

## Optional string thì sao?

Chúng ta có thể mở rộng với optional strings. Dưới đây là extension cho Optional nơi mà wrapped element là một String:

```
extension Optional where Wrapped == String {
  var isBlank: Bool {
    return self?.isBlank ?? true
  }
}
```

Sử dụng optional chaining với giá trị mặc định là true nếu mà optional string là nil. Chúng ta cùng kiểm tra kết quả:

```
var title: String? = nil
title.isBlank            // true
title = ""               
title.isBlank            // true
title = "  \t  "               
title.isBlank            // true
title = "Hello"
title.isBlank            // false
```

Trên đây là các cách kiểm tra một chuỗi String là empty hay blank. Tùy vào các trường hợp sử dụng thực tế, chúng ta hãy chọn cách sử dụng sao cho phù hợp với yêu cầu đặt ra.

Bài viết được dịch từ: https://useyourloaf.com/blog/empty-strings-in-swift/