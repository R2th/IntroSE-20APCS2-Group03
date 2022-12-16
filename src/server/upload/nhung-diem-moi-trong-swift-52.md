Swift 5.2 đã được cập nhật trong phiên bản Xcode 11.4 và bao gồm một số thay đổi ngôn ngữ bên cạnh việc giảm kích thước mã và sử dụng bộ nhớ, cộng với kiến trúc chẩn đoán mới sẽ giúp bạn hiểu và giải quyết lỗi nhanh hơn.

Trong bài viết này, tôi sẽ cùng bạn tìm hiểu những gì đã thay đổi với một số ví dụ thực hành để bạn có thể tự mình nhìn thấy mọi thứ đã phát triển như thế nào.

**Key Path Expressions như là Function**
SE-0249 đã giới thiệu một short cut tuyệt vời cho phép chúng ta sử dụng các key path trong một số trường hợp cụ thể.

Điều này được hiểu rõ nhất là một ví dụ, ở đây, ta có một class User xác định bốn thuộc tính:
```
struct User {
    let name: String
    let age: Int
    let bestFriend: String?

    var canVote: Bool {
        age >= 18
    }
}
```

Tạo một vài instance của class này vào cho vào một mảng:

```
let eric = User(name: "Eric Effiong", age: 18, bestFriend: "Otis Milburn")
let maeve = User(name: "Maeve Wiley", age: 19, bestFriend: nil)
let otis = User(name: "Otis Milburn", age: 17, bestFriend: "Eric Effiong")
let users = [eric, maeve, otis]
```

Bây giờ để lấy danh sách trường name của key path ta có thể sử dụng như sau:

```
let userNames = users.map(\.name)
print(userNames)
```

Trong khi trước kia chúng ta sẽ phải viết đoạn code mapping:

```
let oldUserNames = users.map { $0.name }
```

Một số ví dụ sử dụng khác:
```
let voters = users.filter(\.canVote)
let bestFriends = users.compactMap(\.bestFriend)
```

**Giá trị có thể gọi của các user-difined types:**
SE-0253 giới thiệu các giá trị có thể gọi tĩnh cho Swift, đây là một cách thú vị để nói rằng bây giờ bạn có thể gọi một giá trị trực tiếp nếu loại của nó thực hiện một phương thức có tên callAsFunction (). Bạn không cần phải tuân thủ bất kỳ giao thức đặc biệt nào để thực hiện hành vi này; bạn chỉ cần thêm phương thức đó vào kiểu của bạn.

Ví dụ: chúng ta có thể tạo cấu trúc Dice có các thuộc tính cho lowBound và UpperBound, sau đó thêm callAsFactor để mỗi khi bạn gọi một giá trị Dice, bạn sẽ nhận được một  giá trị ngẫu nhiên

```
struct Dice {
    var lowerBound: Int
    var upperBound: Int

    func callAsFunction() -> Int {
        (lowerBound...upperBound).randomElement()!
    }
}

let d6 = Dice(lowerBound: 1, upperBound: 6)
let roll1 = d6()
print(roll1)
```

Chúng ta cũng có thể sử dụng như sau:

```
let d12 = Dice(lowerBound: 1, upperBound: 12)
let roll2 = d12.callAsFunction()
print(roll2)
```

Swift tự động điều chỉnh các call site của bạn dựa trên cách xác định callAsFunction (). Ví dụ: bạn có thể thêm bao nhiêu tham số tùy ý, bạn có thể kiểm soát giá trị trả về và thậm chí bạn có thể đánh dấu các phương thức là đột biến nếu cần.

Ví dụ: điều này tạo ra cấu trúc StepCorer theo dõi khoảng cách ai đó đã đi và báo cáo lại xem họ có đạt được mục tiêu 10.000 bước hay không:

```
struct StepCounter {
    var steps = 0

    mutating func callAsFunction(count: Int) -> Bool {
        steps += count
        print(steps)
        return steps > 10_000
    }
}

var steps = StepCounter()
let targetReached = steps(count: 10)
```


**Diagnostics mới và cải tiến**
Swift 5.2 đã giới thiệu một kiến trúc chẩn đoán mới nhằm cải thiện chất lượng và độ chính xác của các thông báo lỗi do Xcode phát hành khi bạn mắc lỗi mã hóa. Điều này đặc biệt rõ ràng khi làm việc với mã SwiftUI, nơi Swift thường tạo ra các thông báo lỗi giả.

Ví dụ, xem xét mã như thế này:
```
struct ContentView: View {
    @State private var name = 0

    var body: some View {
        VStack {
            Text("What is your name?")
            TextField("Name", text: $name)
                .frame(maxWidth: 300)
        }
    }
}
```
Điều đó cố gắng liên kết một TextField với một thuộc tính @State số nguyên, không hợp lệ. Trong Swift 5.1, điều này gây ra lỗi  nói rằng 'Int' không thể chuyển đổi thành 'CGFloat?', Nhưng trong Swift 5.2 và sau đó, điều này xác định chính xác lỗi là ràng buộc $ name: Không thể chuyển đổi giá trị của loại Binding < Int> đến loại đối số dự kiến Binding<String>.