Swift 5.0 là bản sẽ được phát hành tiếp theo của Swift, và dự kiến sẽ mang lại sự ổn định của ABI trong thời gian dài. 
Đó không phải là tất cả, mặc dù: một số tính năng chính đã được triển khai, bao gồm các raw string, các trường hợp của enum, kiểm tra bội số integer và nhiều hơn nữa.

## Raw string
SE-0200 đã thêm khả năng tạo raw string, trong đó dấu gạch chéo ngược và dấu ngoặc kép được hiểu là những ký hiệu chữ chứ không phải ký tự thoát hoặc ký tự chuỗi. 
Điều này làm cho một số trường hợp sử dụng dễ dàng hơn, nhưng các biểu thức thông thường nói riêng sẽ có lợi.
Để sử dụng raw string, hãy đặt một hoặc nhiều ký tự # trước chuỗi của bạn, như sau:

```
let rain = #"The "rain" in "Spain" falls mainly on the Spaniards."#
```

Các ký hiệu # ở đầu và cuối của chuỗi trở thành một phần của chuỗi, vì vậy Swift hiểu rằng dấu ngoặc đơn độc lập xung quanh "rain" và "Spain" được coi là dấu ngoặc kép chứ không phải là từ cuối cùng của chuỗi.

Raw string cho phép bạn sử dụng dấu gạch chéo ngược:
```
let keypaths = #"Swift keypaths such as \Person.name hold uninvoked references to properties."#
```

Điều đó xử lý dấu gạch chéo ngược như là một ký tự chữ trong chuỗi, chứ không phải là ký tự thoát. 
Điều này có nghĩa là nội bên trong chuỗi hoạt động khác nhau:
```
let answer = 42
let dontpanic = #"The answer to life, the universe, and everything is \#(answer)."#
```

Lưu ý cách tôi đã sử dụng  #(answer) để sử dụng nội suy chuỗi - một \(answer) thông thường sẽ được hiểu là các ký tự trong chuỗi, vì vậy khi bạn muốn nội suy chuỗi xảy ra trong raw string, bạn phải thêm #.

Một trong những tính năng thú vị của các raw string trong Swift là việc sử dụng các ký hiệu hash ở đầu và cuối, bởi vì bạn có thể sử dụng nhiều ký tự trong trường hợp không chắc bạn cần tới. Thật khó để cung cấp một ví dụ điển hình ở đây vì nó thực sự phải rất hiếm, nhưng hãy xem xét chuỗi này: My dog said "woof"#gooddog. Vì không có dấu cách trước mã hash, Swift sẽ thấy "# và ngay lập tức diễn giải nó như là trình kết thúc của chuỗi. Trong trường hợp này, chúng ta cần phải thay đổi dấu phân tách của chúng ta từ #" thành ##", như sau:

```
let str = ##"My dog said "woof"#gooddog"##
```

Lưu ý số lượng hash ở cuối phải khớp với số ở đầu.

Raw string hoàn toàn tương thích với hệ thống chuỗi nhiều dòng của Swift - chỉ cần sử dụng #""" để bắt đầu, sau đó """# để kết thúc, như sau:
```
let multiline = #"""
The answer to life,
the universe,
and everything is \#(answer).
"""#
```

Viết một regex đơn giản để tìm các keypath chẳng hạn như \Person.name như sau:
```
let regex1 = "\\\\[A-Z]+[A-Za-z]+\\.[a-z]+"
```

Nhờ raw string, chúng tôi có thể viết cùng một điều như trên với một nửa số lượng dấu gạch chéo ngược:
```
let regex2 = #"\\[A-Z]+[A-Za-z]+\.[a-z]+"#
```

## Xử lý các trường hợp enum trong tương lai

SE-0192 bổ sung khả năng phân biệt giữa các enums được cố định và enums có thể thay đổi trong tương lai.

Một trong những tính năng bảo mật của Swift là nó đòi hỏi tất cả các câu lệnh switch phải đầy đủ - rằng chúng phải bao gồm tất cả các trường hợp. 
Trong khi điều này làm việc tốt từ quan điểm an toàn, nó gây ra các vấn đề tương thích khi các trường hợp mới được thêm vào trong tương lai: có thể thêm trường hợp mới và gây ra lỗi khi biên dịch vì trong switch của bạn không còn đầy đủ nữa.

Với thuộc tính @unknown, bây giờ chúng ta có thể phân biệt giữa hai kịch bản khác nhau: "trường hợp mặc định này sẽ được chạy cho tất cả các trường hợp khác vì tôi không muốn xử lý riêng lẻ" và "Tôi muốn xử lý tất cả các trường hợp riêng lẻ, nhưng nếu bất cứ điều gì xảy ra trong tương lai đều mặc định sử dụng điều này thay vì gây ra lỗi. ”

Dưới đây là ví dụ về enum:

```
enum PasswordError: Error {
    case short
    case obvious
    case simple
}
```

Chúng tôi có thể viết mã để xử lý từng trường hợp đó bằng cách sử dụng switch:
```
func showOld(error: PasswordError) {
    switch error {
    case .short:
        print("Your password was too short.")
    case .obvious:
        print("Your password was too obvious.")
    default:
        print("Your password was too simple.")
    }
}
```

Việc trên định nghĩa hai trường hợp rõ ràng cho các mật khẩu short và obvious, nhưng gộp gói thứ ba vào default.

Bây giờ, nếu trong tương lai, chúng tôi đã thêm một trường hợp mới vào enum gọi là old, cho mật khẩu đã được sử dụng trước đó, trường hợp default sẽ tự động được gọi mặc dù message của nó không thực sự hợp lý - Your password was too simple..

Swift không thể cảnh báo chúng tôi về mã này vì nó chính xác về mặt kỹ thuật, vì vậy lỗi này dễ bị bỏ qua. May mắn thay, thuộc tính @unknown sửa chữa nó hoàn hảo - nó chỉ có thể được sử dụng trên trường hợp default và được thiết kế để chạy khi các trường hợp mới xuất hiện trong tương lai.

Ví dụ:
```
func showNew(error: PasswordError) {
    switch error {
    case .short:
        print("Your password was too short.")
    case .obvious:
        print("Your password was too obvious.")
    @unknown default:
        print("Your password wasn't suitable.")
    }
}
```

Mã đó bây giờ sẽ đưa ra cảnh báo vì khối switch không còn đầy đủ nữa - Swift muốn chúng ta xử lý từng trường hợp một cách rõ ràng. Đây chỉ là cảnh báo, điều này làm cho thuộc tính này trở nên hữu ích: nếu thêm trường hợp mới trong tương lai, bạn sẽ được cảnh báo về nó, nhưng nó sẽ không phá vỡ mã nguồn của bạn.

## Kiểm tra bội số nguyên

SE-0225 thêm phương thức isMultiple(of:) vào integer, cho phép chúng ta kiểm tra xem một số có phải là bội số của một số khác theo cách rõ ràng hơn nhiều so với sử dụng phép chia phần còn lại %.

Ví dụ:
```
let rowNumber = 4

if rowNumber.isMultiple(of: 2) {
    print("Even")
} else {
    print("Odd")
}
```

Có, chúng tôi có thể viết cùng một kiểm tra bằng cách sử dụng if rowNumber % 2 == 0 nhưng bạn phải thừa nhận rằng ít rõ ràng hơn - có isMultiple(of:) như một phương thức hỗ trợ khả năng phát hiện.

## Đếm các item phù hợp theo trình tự
SE-0220 giới thiệu một phương thức mới count(where:) thực hiện tương đương với một filter() và đếm trong một lần truyền. Điều này tiết kiệm việc tạo ra một mảng mới và được loại bỏ ngay lập tức, và cung cấp một giải pháp rõ ràng và súc tích cho một vấn đề.

Ví dụ này tạo ra một loạt các kết quả kiểm tra và đếm số lượng lớn hơn hoặc bằng 85:
```
let scores = [100, 80, 85]
let passCount = scores.count { $0 >= 85 }
```

Và đếm số lượng tên trong một mảng bắt đầu bằng “Terry”:
```
let pythons = ["Eric Idle", "Graham Chapman", "John Cleese", "Michael Palin", "Terry Gilliam", "Terry Jones"]
let terryCount = pythons.count { $0.hasPrefix("Terry") }
```

## Chuyển đổi và unwrap các giá trị của Dictionary bằng compactMapValues()
SE-0218 thêm một phương thức compactMapValues() mới vào Dictionary, tập hợp các hàm compactMap() từ các mảng ("transform my values, unwrap the results, then discard anything that’s nil") với phương thức mapValues() từ các Dictionary ("leave my keys intact but transform my values”).

Ví dụ: đây là Dictionary của những người trong cuộc đua, cùng với thời gian họ đã hoàn thành trong vài giây. 
Một người không hoàn thành, được đánh dấu là "DNF":
```
let times = [
    "Hudson": "38",
    "Clarke": "42",
    "Robinson": "35",
    "Hartis": "DNF"
]
```

Chúng ta có thể sử dụng compactMapValues() để tạo một Dictionary mới với tên và thời gian như một số nguyên, 
với một DNF đã loại bỏ:
```
let finishers1 = times.compactMapValues { Int($0) }
```

Ngoài ra, bạn chỉ có thể bỏ qua bộ khởi tạo Int trực tiếp với compactMapValues(), như sau:
```
let finishers2 = times.compactMapValues(Int.init)
```

Bạn cũng có thể sử dụng compactMapValues() để tùy chọn unwrap và loại bỏ giá trị nil mà không cần thực hiện bất kỳ loại chuyển đổi nào, như sau:
```
let people = [
    "Paul": 38,
    "Sophie": 8,
    "Charlotte": 5,
    "William": nil
]

let knownAges = people.compactMapValues { $0 }
```

Vẫn còn nhiều điều nữa!
Đó là những tính năng đã được triển khai trong Swift 5.0, chắc chắn sẽ đến trong bản phát hành Swift 5.0.

Và đừng quên sự ổn định của ABI vẫn là tính năng lớn nhất cho 5.0: nhiều công ty lớn (bao gồm gần như chắc chắn Apple) đang chờ đợi điều này xảy ra.

Nguồn: @twostraws.