Swift 5.0 là phiên bản chính thức tiếp theo của Swift và mang lại sự ổn định cho ABI. Tuy nhiên, đó không phải là tất cả: một số tính năng mới quan trọng đã được triển khai, bao gồm các raw string,  enum, kiểu Result, kiểm tra bội số nguyên và hơn thế nữa.
<br>
## Kiểu Result
<br>
SE-0235 giới thiệu kiểu Result vào thư viện chuẩn, cung cấp cách xử lý lỗi đơn giản hơn, rõ ràng hơn trong các trường hợp phức tạp, chẳng hạn như API không đồng bộ.

Result được triển khai như một enum có hai case: success và failure. Cả hai đều được triển khai bằng cách sử dụng generic để chúng có thể thuận lợi sử dụng các giá trị của bạn, nhưng thất bại phải là kiểu Error.
<br>
Để chứng minh Result, chúng ta có thể viết một hàm kết nối với máy chủ để tìm ra có bao nhiêu tin nhắn chưa đọc đang chờ. Trong ví dụ này, sẽ có một lỗi có thể xảy ra, đó là chuỗi URL được yêu cầu là một URL không hợp lệ:
```
enum NetworkError: Error {
    case badURL
}
```

Hàm fetch sẽ có urlString làm tham số đầu tiên và completionHandler làm tham số thứ hai. completionHandler đó sẽ tự chấp nhận một Result, trong đó trường hợp thành công sẽ trả về một số nguyên và trường hợp thất bại sẽ là một loại NetworkError. Chúng tôi thực sự sẽ không kết nối với máy chủ ở đây, nhưng sử dụng completionHandler để mô phỏng mã không đồng bộ.
<br>
```
import Foundation

func fetchUnreadCount1(from urlString: String, completionHandler: @escaping (Result<Int, NetworkError>) -> Void)  {
    guard let url = URL(string: urlString) else {
        completionHandler(.failure(.badURL))
        return
    }

    // complicated networking code here
    print("Fetching \(url.absoluteString)...")
    completionHandler(.success(5))
}
```
<br>
Để sử dụng mã đó, cần kiểm tra giá trị bên trong Result để xem liệu thành công hay thất bại, như thế này:
```
fetchUnreadCount1(from: "https://www.hackingwithswift.com") { result in
    switch result {
    case .success(let count):
        print("\(count) unread messages.")
    case .failure(let error):
        print(error.localizedDescription)
    }
}
```

Có ba điều nữa bạn nên biết trước khi bắt đầu sử dụng Result.
<br>
Đầu tiên, Result có một phương thức get() trả về giá trị thành công nếu nó tồn tại hoặc ném lỗi của nó theo cách khác. Điều này cho phép bạn chuyển đổi Result thành một throw thông thường, như thế này:
```
fetchUnreadCount1(from: "https://www.hackingwithswift.com") { result in
    if let count = try? result.get() {
        print("\(count) unread messages.")
    }
}
```

Thứ hai, Result có một trình khởi tạo cho phép throw closure: nếu closure trả về giá trị sẽ là trường hợp thành công, nếu không sẽ là trường hợp thất bại và trả về lỗi.
<br>
Ví dụ:
```
let result = Result { try String(contentsOfFile: someFile) }
```
<br>
Thứ ba, thay vì sử dụng một enum lỗi cụ thể mà bạn đã tạo, bạn cũng có thể sử dụng giao thức Error chung. Trên thực tế, đề xuất Swift Evolution cho biết, đó là điều mà người ta mong đợi rằng hầu hết việc Result sẽ sử dụng Swift.Error làm đối số Error.

Vì vậy, thay vì sử dụng Result<Int, NetworkError> bạn có thể sử dụng Result<Int, Error>. Mặc dù điều này có nghĩa là bạn mất đi sự an toàn khi throw, nhưng bạn có khả năng throw nhiều loại lỗi khác nhau - điều bạn thích thực sự phụ thuộc vào phong cách code của bạn.

## Raw strings
SE-0200 đã thêm khả năng tạo các Raw strings, trong đó dấu gạch chéo ngược và dấu ngoặc kép được hiểu là các ký hiệu theo nghĩa đen thay vì thoát các ký tự hoặc dấu kết thúc chuỗi. Điều này làm cho một số trường hợp sử dụng dễ dàng hơn, nhưng đặc biệt là các biểu thức chính quy sẽ có lợi.
<br><br>
Để sử dụng Raw strings, đặt một hoặc nhiều ký hiệu # trước chuỗi của bạn, như thế này:

```
let rain = #"The "rain" in "Spain" falls mainly on the Spaniards."#
```

Các ký hiệu # ở đầu và cuối của chuỗi trở thành một phần của dấu phân cách chuỗi, vì vậy Swift hiểu rằng các dấu ngoặc kép độc lập xung quanh “rain” và “Spain” nên được coi là dấu ngoặc kép thay vì là dấu kết thúc chuỗi.
<br><br>
Raw strings cũng cho phép bạn sử dụng dấu gạch chéo ngược:

```
let keypaths = #"Swift keypaths such as \Person.name hold uninvoked references to properties."#
```

Điều đó coi dấu gạch chéo ngược là một ký tự trong chuỗi, chứ không phải là một ký tự kết thúc. Đến lượt điều này có nghĩa là phép nội trong chuỗi hoạt động khác nhau:
```
let answer = 42
let dontpanic = #"The answer to life, the universe, and everything is \#(answer)."#
```
Lưu ý cách tôi đã sử dụng \#(answer) để sử dụng phép nội suy chuỗi - một \(answer) thông thường sẽ được hiểu là các ký tự trong chuỗi, vì vậy khi bạn muốn nội suy chuỗi xảy ra trong chuỗi thô, bạn phải thêm #.

Một trong những tính năng thú vị của Raw string là việc sử dụng các ký hiệu ở đầu và cuối, bởi vì bạn có thể sử dụng nhiều hơn một trong các sự kiện không mong muốn mà bạn sẽ cần. Nó khó có thể đưa ra một ví dụ hay ở đây vì nó thực sự rất hiếm, nhưng hãy xem xét chuỗi này: My dog said "woof"#gooddog. Vì không có khoảng trống trước hàm hash, Swift sẽ thấy "# và ngay lập tức hiểu nó là dấu kết thúc chuỗi. Trong tình huống này, chúng ta cần thay đổi dấu phân cách từ #" thành ##", như thế này:
```
let str = ##"My dog said "woof"#gooddog"##
```

Lưu ý cách số lượng hash ở cuối phải khớp với số ở đầu.
<br><br>
Raw string hoàn toàn tương thích với hệ thống chuỗi nhiều dòng trong Swift  - chỉ cần sử dụng #""" để bắt đầu, sau đó """# để kết thúc, như thế này:
```
let multiline = #"""
The answer to life,
the universe,
and everything is \#(answer).
"""#
```

Có thể làm mà không có nhiều dấu gạch chéo ngược sẽ chứng minh đặc biệt hữu ích trong các biểu thức thông thường. 
<br>
Ví dụ: viết một biểu thức chính quy đơn giản để tìm các keypath, chẳng hạn như \Person.name được sử dụng trông như thế này:
```
let regex1 = "\\\\[A-Z]+[A-Za-z]+\\.[a-z]+"
```
Nhờ các raw string, chúng ta có thể viết điều tương tự với chỉ một nửa số dấu gạch chéo ngược:
```
let regex2 = #"\\[A-Z]+[A-Za-z]+\.[a-z]+"#
```

## Tùy chỉnh nội suy chuỗi

SE-0228 đã cải tiến đáng kể hệ thống nội suy chuỗi của Swift để nó hiệu quả hơn và linh hoạt hơn và nó tạo ra một loạt các tính năng mới mà trước đây không thể.
<br><br>
Ở dạng cơ bản nhất, hệ thống nội suy chuỗi mới cho phép chúng ta kiểm soát cách các đối tượng xuất hiện trong chuỗi. Swift có hành vi mặc định cho các cấu trúc hữu ích ở việc gỡ lỗi. Nhưng nếu bạn đang làm việc với các class (không có hành vi này) hoặc muốn định dạng đầu ra đó để nó có thể hướng tới người dùng, thì bạn có thể sử dụng hệ thống nội suy chuỗi mới.
<br><br>
Ví dụ: nếu chúng ta có một cấu trúc như thế này:
```
struct User {
    var name: String
    var age: Int
}
```

Nếu chúng tôi muốn thêm một phép nội suy chuỗi đặc biệt để in người dùng một cách gọn gàng hơn, chúng tôi sẽ thêm một extension cho String.StringInterpolation bằng một phương thức appendInterpolation() mới. Swift đã có sẵn một vài trong số này và người dùng thuộc loại nội suy - trong trường hợp này User sẽ tìm ra phương thức nào để gọi.

Trong trường hợp này, chúng tôi sẽ bổ sung tên và tuổi của người dùng vào một chuỗi, sau đó gọi một trong các phương thức appendInterpolation() tích hợp thêm chuỗi đó vào chuỗi của chúng tôi, như sau:
```
extension String.StringInterpolation {
    mutating func appendInterpolation(_ value: User) {
        appendInterpolation("My name is \(value.name) and I'm \(value.age)")
    }
}
```

Bây giờ chúng tôi có thể tạo User và in ra dữ liệu:
```
let user = User(name: "Guybrush Threepwood", age: 33)
print("User details: \(user)")
```

Điều đó sẽ in "User details: My name is Guybrush Threepwood and I'm 33", trong khi với phép nội suy chuỗi tùy chỉnh, nó sẽ in "User details: User(name: "Guybrush Threepwood", age: 33)". Tất nhiên, chức năng đó không khác gì so với việc chỉ thực hiện giao thức CustomStringConvertible, vì vậy hãy chuyển sang sử dụng nâng cao hơn.
<br><br>
Tùy chỉnh phương pháp nội suy của bạn có thể lấy bao nhiêu tham số bạn cần, được gắn nhãn hoặc không nhãn. Ví dụ: chúng ta có thể thêm một phép nội suy để in các số bằng nhiều kiểu khác nhau, như thế này:
```
extension String.StringInterpolation {
    mutating func appendInterpolation(_ number: Int, style: NumberFormatter.Style) {
        let formatter = NumberFormatter()
        formatter.numberStyle = style

        if let result = formatter.string(from: number as NSNumber) {
            appendLiteral(result)
        }
    }
}
```
Lớp NumberFormatter có một số kiểu, bao gồm tiền tệ ($72.83), thứ tự (1st, 12th) và đánh vần (five, forty-three). Vì vậy, chúng ta có thể tạo một số ngẫu nhiên và đánh vần thành một chuỗi như thế này:
```
let number = Int.random(in: 0...100)
let lucky = "The lucky number this week is \(number, style: .spellOut)."
print(lucky)
```

Bạn có thể gọi appendLiteral() nhiều lần bạn cần hoặc thậm chí không cần nếu cần thiết. Ví dụ: chúng ta có thể thêm phép nội suy chuỗi để lặp lại chuỗi nhiều lần, như sau:
```
extension String.StringInterpolation {
    mutating func appendInterpolation(repeat str: String, _ count: Int) {
        for _ in 0 ..< count {
            appendLiteral(str)
        }
    }
}

print("Baby shark \(repeat: "doo ", 6)")
```

Và, vì đây chỉ là các phương thức thông thường, bạn có thể sử dụng đầy đủ các chức năng của Swift. Ví dụ: chúng ta có thể thêm một phép nội suy nối một mảng các chuỗi lại với nhau, nhưng nếu mảng đó trống thì thực hiện một closure trả về một chuỗi thay thế:
```
extension String.StringInterpolation {
    mutating func appendInterpolation(_ values: [String], empty defaultValue: @autoclosure () -> String) {
        if values.count == 0 {
            appendLiteral(defaultValue())
        } else {
            appendLiteral(values.joined(separator: ", "))
        }
    }
}

let names = ["Harry", "Ron", "Hermione"]
print("List of students: \(names, empty: "No one").")
```

Sử dụng @autoclenses có nghĩa là chúng ta có thể sử dụng các giá trị đơn giản hoặc gọi các hàm phức tạp cho giá trị mặc định, nhưng sẽ không có công việc nào được thực hiện trừ khi value.count bằng 0.
<br><br>
Với sự kết hợp của các giao thức ExpressibleByStringLiteral và ExpressibleByStringInterpolation, giờ đây, nó có thể tạo ra toàn bộ các loại bằng cách sử dụng phép nội suy chuỗi và nếu chúng ta thêm CustomStringConvertible, chúng ta thậm chí có thể in các loại đó thành chuỗi theo cách chúng ta muốn.
Để thực hiện công việc này, chúng tôi cần phải đáp ứng một số tiêu chí cụ thể:
* Bất kỳ loại nào chúng tôi tạo nên tuân thủ ExpressibleByStringLiteral, ExpressibleByStringInterpolation và CustomStringConvertible. Cái sau chỉ cần thiết nếu bạn muốn tùy chỉnh cách in.
* Bên trong kiểu của bạn cần phải là một struct lồng nhau được gọi là StringInterpolation phù hợp với StringInterpolationProtocol.
* Struct lồng nhau cần phải có bộ khởi tạo chấp nhận hai số nguyên cho chúng ta biết khoảng bao nhiêu dữ liệu có thể đoán trước.
* Nó cũng cần phải thực hiện một phương thức appendLiteral(), cũng như một hoặc nhiều phương thức appendInterpolation().
* Loại chính của bạn cần phải có hai bộ khởi tạo cho phép nó được tạo từ chuỗi ký tự và nội suy chuỗi.

Chúng ta có thể kết hợp tất cả những thứ đó lại thành một loại ví dụ có thể xây dựng HTML từ các yếu tố phổ biến khác nhau. Trong một struct StringInterpolation lồng nhau sẽ là một chuỗi: mỗi lần thêm một chữ hoặc nội suy mới, chúng tôi sẽ nối nó vào chuỗi. Để giúp bạn biết chính xác những gì đang diễn ra, tôi đã thêm một số lệnh print() bên trong các phương thức thêm khác nhau.
```
struct HTMLComponent: ExpressibleByStringLiteral, ExpressibleByStringInterpolation, CustomStringConvertible {
    struct StringInterpolation: StringInterpolationProtocol {
        // start with an empty string
        var output = ""

        // allocate enough space to hold twice the amount of literal text
        init(literalCapacity: Int, interpolationCount: Int) {
            output.reserveCapacity(literalCapacity * 2)
        }

        // a hard-coded piece of text – just add it
        mutating func appendLiteral(_ literal: String) {
            print("Appending \(literal)")
            output.append(literal)
        }

        // a Twitter username – add it as a link
        mutating func appendInterpolation(twitter: String) {
            print("Appending \(twitter)")
            output.append("<a href=\"https://twitter/\(twitter)\">@\(twitter)</a>")
        }

        // an email address – add it using mailto
        mutating func appendInterpolation(email: String) {
            print("Appending \(email)")
            output.append("<a href=\"mailto:\(email)\">\(email)</a>")
        }
    }

    // the finished text for this whole component
    let description: String

    // create an instance from a literal string
    init(stringLiteral value: String) {
        description = value
    }

    // create an instance from an interpolated string
    init(stringInterpolation: StringInterpolation) {
        description = stringInterpolation.output
    }
}
```

Bây giờ chúng ta có thể tạo và sử dụng một thể hiện của HTMLComponent bằng cách sử dụng phép nội suy chuỗi như thế này:

```
let text: HTMLComponent = "You should follow me on Twitter \(twitter: "twostraws"), or you can email me at \(email: "paul@hackingwithswift.com")."
 print(text)
```

Nhờ các lệnh print() nằm rải rác bên trong, bạn sẽ thấy chính xác chức năng nội suy chuỗi hoạt động như thế nào.
<br>
Còn tiếp...
Nguồn: www.hackingwithswift.com