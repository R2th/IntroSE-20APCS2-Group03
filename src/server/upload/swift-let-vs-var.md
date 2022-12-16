Bạn đã thực sự hiểu sự khác nhau giữa **let** và **var** chưa? Ban đầu, nó trông giống như một câu hỏi tầm thường về ngôn ngữ Swift. Nhưng điều này có thể dẫn đến các cuộc thảo luận xung quanh ngữ nghĩa ngôn ngữ và khả năng thay đổi / bất biến của nó nói chung. Hãy cùng mình tìm hiểu thông qua blog này nhé.

# Let và var là gì? Sự khác biệt giữa chúng là gì ?
Cả hai **let** và **var** đều để tạo biến trong Swift. **let** giúp bạn tạo ra các biến bất biến (hằng số), trong khi **var** tạo ra các biến có thể thay đổi. Các biến được tạo bởi cả hai đều giữ một tham chiếu hoặc một giá trị.

Sự khác biệt giữa chúng là khi bạn tạo một hằng số bằng cách sử dụng **let** bạn phải gán một cái gì đó cho nó trước lần sử dụng đầu tiên và không thể gán lại nó. Và khi bạn khai báo một biến với **var** nó có thể được gán ngay lập tức hoặc sau đó hoặc hoàn toàn không và có thể được gán lại bất cứ lúc nào.

# Chúng ta có thể thay đổi các tham số của hàm không?

```
func hackInterview(for value: String) {
    value = "android"
}

hackInterview(for: "ios")
```

Các tham số hàm là hằng số theo mặc định. Việc cố gắng thay đổi giá trị của chúng trong phần thân hàm dẫn đến lỗi thời gian biên dịch.

 **Dòng 2 -** Cannot assign to value: ‘value’ is ‘let’ constant.
 
#  Đoạn code này có chạy được không? Hãy giải thích nguyên nhân của lỗi (nếu có)

```
struct Hack {
    var platform: String
    let claps: Int
}

let constantBlog = Hack(platform: "ios", claps: 140)
constantBlog.platform = "android"
constantBlog.claps = 150

var variableBlog = Hack(platform: "ios", claps: 140)
variableBlog.platform = "android"
variableBlog.claps = 150
```

> Struct là kiểu giá trị trong Swift. Kiểu giá trị là một kiểu mà giá trị của nó được copy khi nó được gán tới một biến hay một hằng

Các biến **let** giữ struct không thể thay đổi nó vì điều đó có nghĩa là bạn đang thay đổi giá trị của biến bất biến, điều không thể xảy ra trong Swift. Mặt khác, struct **var** biến giữ có thể tự thay đổi. Tương tự, quy tắc **let & var** sẽ áp dụng cho các thuộc tính riêng lẻ của struct.

**Dòng 7 —** Cannot assign to property: ‘constantBlog’ is a ‘let’ constant.

**Dòng 8 & 12 —** Cannot assign to property: ‘claps’ is a ‘let’ constant.

# Bạn thử tìm xem lỗi biên dịch sẽ xuất hiện ở đâu trong đoạn code này?

```
class Hack {
    var platform: String
    let claps: Int
    
    init(platform: String, claps: Int) {
        self.platform = platform
        self.claps = claps
    }
}

let constantblog = Hack(platform: "ios", claps: 140)
constantblog.platform = "android"
constantblog.claps = 150

var variableBlog = Hack(platform: "ios", claps: 140)
variableBlog.platform = "android"
variableBlog.claps = 150
```

> Các class là kiểu tham chiếu trong Swift. Bất cứ khi nào bạn cố gắng thay đổi chúng, đối tượng được lưu trữ ở nơi khác trong bộ nhớ sẽ bị biến đổi trong khi tham chiếu đến nó vẫn giữ nguyên.

Bạn có thể sửa đổi các thuộc tính của một class cho dù biến tham chiếu đến nó có thể thay đổi được hay không.

**Line 13 & 17 —** Cannot assign to property: ‘claps’ is a ‘let’ constant.


Mục đích chính của người phỏng vấn bạn là muốn tìm hiểu sâu hơn, để bạn hiểu về cách thức hoạt động của sự biến đổi một cách nhanh chóng. Cái gì có thể biến đổi và cái gì không.
Tôi hy vọng bạn những ví dụ và sự giải thích này hữu ích. Nếu bạn thích nó, hãy chia sẻ nó với cộng đồng của bạn và vui lòng up vote  để giúp những người khác tìm thấy nó! Cảm ơn vì đã đọc.

Link tham khảo tại [đây](https://medium.com/hash-coding/swift-let-vs-var-b2a74e098c2a)