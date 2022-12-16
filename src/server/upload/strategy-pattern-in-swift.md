### What is it?

Trong phát triển phần mềm nếu bạn biết cách áp dụng các mẫu thiết kế (design pattern) bạn sẽ nhanh chóng có được ứng dụng với thiết kế đơn giản nhưng hiệu quả khi bảo trì, nâng cấp hoặc mở rộng chúng. Một trong những mẫu thiết kế đơn giản và rất dễ triển khai mà tôi trình bài trong bài viết này đó là Strategy

### Phân loại
Các mẫu design patterns được phân thành 3 loại theo mục tiêu của chúng:

**Creational**\
**Structural**\
**Behavioural**

Vâng,  Strategy pattern là một mẫu hành vi vì nó có liên quan đến hành vi của các đối tượng. Dễ thôi phải không?

### Khi nào chúng ta nên sử dụng nó?
Có nhiều trường hợp khi chúng ta có thể sử dụng nó. Hãy nói về ba kịch bản rất cụ thể trong đó chúng ta có thể thấy một giá trị rõ ràng của Strategy pattern.

**Different ways to do the same**\
Khi bạn cần thực hiện điều tương tự trong code của mình bằng nhiều cách khác nhau, thì đó là một ví dụ rõ ràng rằng bạn có thể sử dụng nó.\
**Instead of inheritance**\
Nếu bạn cần mở rộng chức năng của một lớp và để thực hiện điều này, bạn cần tạo một lớp mới kế thừa từ nó.\
**Alternative to if/else blocks**\
Đôi khi, nếu bạn nhìn vào một lớp, bạn có thể thấy rằng nó có quá nhiều if / else hoặc switch, ý tôi là, các khối có điều kiện. Đây là một dấu hiệu cho thấy lớp này có nhiều responsibilities hơn mức cần thiết. Sử dụng một mẫu Strategy pattern sẽ giúp bạn phân tán  chúng.

### Real Example
Hãy tưởng tượng chúng ta cần tạo một lớp Logger, người sẽ in một message trong console. Ngoài ra, lớp này cho phép bạn in các messages cách điệu: chữ thường, chữ hoa và viết hoa. Vì vậy, một triển khai có thể là một cái gì đó như thế này

```swift  
struct Logger {

    enum LogStyle {
        case lowercase
        case uppercase
        case capitalized
    }

    let style: LogStyle

    func log(_ message: String) {
        switch style {
        case .lowercase:
            print(message.lowercased())
        case .uppercase:
            print(message.uppercased())
        case .capitalized:
            print(message.capitalized)
        }
    }
}
 ```
 
 Sau đó, chúng ta sẽ có một enum để chỉ định kiểu nào có sẵn và function lo với khối switch bên trong để in thông báo trong bảng điều khiển theo các kiểu khác nhau\
 Chúng ta nên sửa đổi lớp này bằng cách thêm các kiểu mới bên trong enum và hàm log
 
 Theo các kịch bản mà chúng ta đã thấy trước đây, đây có thể là một ví dụ điển hình trong đó mô hình Strategy pattern có thể giúp chúng ta.
 
 Để giải thích cách thực hiện, chúng tôi sẽ trả lời ba câu hỏi và sử dụng sơ đồ mà tôi đã trích xuất từ cuốn sách Design Patterns by Tutorials , có sẵn trong cửa hàng Ray Wenderlich.
![](https://images.viblo.asia/e9ce5035-e687-40d4-87cf-38bb01c184db.png)

**What**:  Một giao thức xác định hành động mà chúng ta muốn gói gọn. Trong ví dụ của chúng tôi, hành động sẽ là một log a message\
**Who:**    Một object  chứa đối tượng phù hợp với strategy . Trong ví dụ của chúng tôi, nó có thể là một đối tượng sử dụng strategy  log the message\
**How :**    Cụ thể của chiến lược. Mỗi cách thực hiện là khác nhau. Trong ví dụ của chúng tôi, chúng tôi sẽ có ba chiến lược, một chiến lược cho mỗi phong cách.\
Vì vậy, ví dụ trước sử dụng chiến lược sẽ như thế này:

```swift  
// What
protocol LoggerStrategy {
    func log(_ message: String)
}

// Who
struct Logger {
    let strategy: LoggerStrategy

    func log(_ message: String) {
        strategy.log(message)
    }
}

// How
struct LowercaseStrategy: LoggerStrategy {
    func log(_ message: String) {
        print(message.lowercased())
    }
}

struct UppercaseStratgy: LoggerStrategy {
    func log(_ message: String) {
        print(message.uppercased())
    }
}

struct CapitalizedStrategy: LoggerStrategy {
    func log(_ message: String) {
        print(message.capitalized)
    }
}

```


Và đây là cách chúng ta có thể sử dụng nó:
```swift  
var logger = Logger(strategy: CapitalizedStrategy())
logger.log("my first strategy")  // My First Strategy
logger = Logger(strategy: UppercaseStrategy())
logger.log("my first strategy")  // MY FIRST STRATEGY
logger = Logger(strategy: LowercaseStrategy())
logger.log("my first strategy")  // my first strategy

```

### Tại sao chúng ta nên sử dụng Strategy
 
Strategy là một trong những mẫu thiết kế đơn giản và hữu ích nhất. Ngoài ra, nếu chúng tôi sử dụng mô hình này, bạn đang làm rất nhiều thứ tốt và có thể bạn không biết:

Single responsibility: Khi chúng ta tạo ra các Strategy để làm những việc khác nhau, chúng tôi nhận thấy rằng lớp ban đầu của chúng tôi có ít responsibilities hơn.


Open / Close.  : Nếu chúng ta sử dụng các Strategy để mở rộng chức năng của các đối tượng mà chúng ta không cần phải cập nhật đối tượng ban đầu. Như trong ví dụ đầu tiên của chúng tôi, nếu muốn thêm một style mới, chúng tôi chỉ cần tạo một Strategy mới. Nếu không, chúng ta sẽ cần thêm một trường hợp mới trong enum Styles của chúng ta.