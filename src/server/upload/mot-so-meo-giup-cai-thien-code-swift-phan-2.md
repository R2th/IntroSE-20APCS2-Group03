[Phần 1](https://viblo.asia/p/mot-so-meo-giup-cai-thien-code-cua-ban-swift-QpmlerwN5rd) mình đã giới thiệu 1 số mẹo giúp cải thiện các dòng code của bạn, giúp chúng dễ đọc và an toàn hơn.

![](https://images.viblo.asia/099f792e-8cbb-4fe5-9812-1fff7abb5590.jpeg)

Phần trước mình đã liệt kê một số Tips, hôm nay mình sẽ review tiếp những Tips còn lại.

# 8. Loops (Vòng Lặp)
{@embed: https://gist.github.com/gavinShr/7557bc70dfe2dc5c6e2ddd032cf2f787#file-loops-swift}

Nó đã được giải thích khá rõ phải không nào, cú pháp tạo vòng lặp và kết quả đã được liệt kê bên cạnh.
# 9. Sử dụng [Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)
{@embed: https://gist.github.com/gavinShr/c7e3403c037cb4b22d739d2947fb75f2#file-enumerations-swift}

Việc sử dụng 1 chuổi string không xác định sẽ làm chúng ta bối rối trong việc code, cũng như mainternance. Với option 2, việc code sẽ trở nên dễ dàng và tường mình hơn phải không nào!

# 10. Sử dụng Callback để xét một [Completion Handler](https://medium.com/good-morning-swift/completion-handler-swift-199a5a08d8e6)
{@embed: https://gist.github.com/gavinShr/80abbeb9f715e62714f6fa0b01b70ca5#file-callbacks-swift}

Như chúng ta có thể dễ dàng nhận thấy, cả 2 ví dụ trên chúng ta đều có thể tương tác trực tiếp khi có dữ liệu trả về.

# 11. Cung cấp giá trị mặc định cho biến
{@embed: https://gist.github.com/gavinShr/c65aea95506723757ad7551315260feb#file-defaultvalue-swift}

Trong ví dụ này, chúng ta thấy cả 2 phương án đều dùng để xét giá trị mặc định khi giá trị textInput là nil, nhưng rõ ràng cách 2 giúp code ngọn hơn và dễ tiếp cận hơn.
# 12. Lưu trữ các hằng số chung trong một tệp để dễ dàng truy cập
Việc lưu giá trị static constants vào 1 tiệp giúp chúng ta dễ dàng quản lý hơn.

{@embed: https://gist.github.com/gavinShr/d239dad790e8e4e45ba35bd4dd950c9f#file-constants-swift}

Để lấy giá trị:
```
let myColorPick = Constants.Colors.green
let sistersName = Constants.Names.mySistersName
```

# 13. [Automatic Reference Counting](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html)
Mình nghĩ mọi lập trình viên nên đọc qua tài liệu về [ARC (Automatic Reference Counting)](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.htm).

ARC được Swift dùng để theo dõi và quan lý bộ nhớ. Vì một vài trường hợp tham chiếu vẫn bị giữ.

Xét ví dụ sau để rõ hơn. Ví dụ chúng ta có 1 class Person:

```
class Person {
init() { print("initialized!") }
deinit { print("deinitialized!") }
}
```

Chúng ta tạo 3 biến số. Mỗi biến số là 1 optional, và giá trị khởi tạo là nil:

```
var ref1: Person? // nil
var ref2: Person? // nil
var ref3: Person? // nil
```

Tiếp theo, chúng ta gán ref1 là một Person:

```
ref1 = Person() // console output: "initialized!"
```

Tiếp theo, chúng ta gán ref2 và ref3 bằng ref1 => ref2 và ref3 với ref1 trỏ về cùng 1 tham chiếu: 

```
ref2 = ref1 // Person
ref3 = ref1 // Person
```

Bây giờ, ta có thể thấy 3 biến số ref1, ref2 và ref3 đều trỏ về 1 Person object, Chúng ta có thể xét 2 biến số đầu tiên là nil, vì ref3 vẫn giữ tham chiếu tới Person trong memory:

```
ref1 = nil
ref2 = nil
```

Cuối cùng, để de-initialize Persion object, chúng ta xét ref3 về nil và reference cuối cùng bị huỷ:

```
ref3 = nil // console output: "deinitialized!"
```

# 14. Cung cấp một giá trị mặc định cho function parameters.
{@embed: https://gist.github.com/gavinShr/b71ef5110c811cec570361ae8fd0f819#file-defaultarguments-swift}

Khá rõ ràng phải không, chúng ta chỉ cần cung cấp một giá trị mặc định cho input parameters.
# 15. Encode/decode Struct từ memory thông qua UserDefaults.
{@embed: https://gist.github.com/gavinShr/fb1aad3a0b9142927678ecf2f43141d1#file-memorymanager-swift}

File trên chứng minh sự hữu dụng của cách này.

Đầu tiên, chúng ta cần tạo một Struct TaskItem kế thừa Codable, điều này cho phép chúng ta encode/decode thông qua một [Serialized Format](https://medium.com/nsistanbul/data-serialization-formats-available-in-swift-d0dc2971dbda) (ví dụ: JSON format).

Sâu hơn nữa, bạn có thể thấy rằng, bên trong hàm retrieveData (), chúng ta đang sử dụng các câu lệnh guard và câu lệnh if let để kiểm tra xem UserDefaults có chứa một mảng TaskItems đã có từ trước hay không.

Nếu không có mảng nào như vậy tồn tại, chúng ta tạo một mảng mới có đầy đủ các mục đã nói ở trên.

Ở cuối tệp này, bạn có thể thấy phần minh họa về cách bạn sẽ mã hóa một mảng hiện có gồm các mục Có thể Codable vào bộ nhớ thông qua PropertyListEncoder, dictionary key và optional try block.

Trường hợp sử dụng chính của tệp này sẽ là chạy ở giai đoạn khởi tạo ứng dụng.

Trong giai đoạn này, chúng tôi sẽ kiểm tra một loạt các mục đã có từ trước mà chúng tôi muốn lưu trữ. Nếu mảng này không tồn tại, chúng ta có thể điền trước một mảng các mục của chúng ta và sau đó lưu nó vào bộ nhớ để gọi lại sau.

Đến đây là kết thúc, hi vọng hữu ích với các bạn. Cảm ơn các bạn đã theo dõi.

Tham khảo: [15 Quick Tips to Improve Your Swift Code](https://medium.com/better-programming/15-quick-tips-to-improve-your-swift-code-ed390c99afcd)