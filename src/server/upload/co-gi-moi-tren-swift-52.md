Bản beta đầu tiên của Swift 5.2 vừa được cập nhật trên Xcode 11.4 beta và nó bao gồm một số thay đổi về ngôn ngữ bên cạnh việc giảm kích thước mã và sử dụng bộ nhớ, cộng với kiến trúc kiến trúc chẩn đoán mới sẽ giúp bạn chẩn đoán lỗi nhanh hơn.

Trong bài viết này, mình sẽ tìm hiểu những gì đã thay đổi với một số ví dụ thực tế để bạn có thể tự mình xem mọi thứ đã phát triển như thế nào. 

**Keypath Expression như một function**

Bạn có thể dùng "\Root.value" như là một shortcut để truy cập vào biến của root. Hãy xem ví dụ dưới đây: 

Giả sử mình có struct User như sau: 

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

Tiếp theo mình tạo 1 mảng chứa một số users:

```
let eric = User(name: "Eric Effiong", age: 18, bestFriend: "Otis Milburn")
let maeve = User(name: "Maeve Wiley", age: 19, bestFriend: nil)
let otis = User(name: "Otis Milburn", age: 17, bestFriend: "Eric Effiong")
let users = [eric, maeve, otis]
```

Như trước bạn sẽ truy cập vào biến của user bằng cách:

```
let oldUserNames = users.map { $0.name }
```

Thì bây giờ bạn có thể viết như sau:

```
let userNames = users.map(\.name)
print(userNames)
```

Tương tự với 2 ví dụ sau:

Lọc danh sách user có thể vote:
```
let voters = users.filter(\.canVote)
```

Lọc user có trường bestFriend khác nil:
```
let bestFriends = users.compactMap(\.bestFriend)
```

**Gọi trực tiếp giá trị từ kiểu dữ liệu do người dùng tự định nghĩa**

Bạn có thể gọi trực tiếp giá trị nếu kiểu dữ liệu đó implement method tên "callAsFunction()". Bạn không cần thoả mãn bất cứ protocol nào, chỉ đơn giản là thêm nó vào trong kiểu giá trị của bạn.
Hãy xem xét ví dụ sau:

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

Hàm print ở trên sẽ in ngẫu nhiên ra số từ 1 tới 6. Việc gọi d6() tương đương với việc bạn dùng callAsFunction trực tiếp:

```
let d12 = Dice(lowerBound: 1, upperBound: 12)
let roll2 = d12.callAsFunction()
print(roll2)
```

Bạn có thể thêm param nếu bạn muốn và Swift sẽ tự hiểu, bạn cũng có thể kiểm soát giá trị return, cũng như đánh dấu hàm là mutating nếu cần thiết.
Như ví dụ dưới mình muốn tạo StepCounter struct để theo dõi người dùng đi được bao xa và báo cáo nếu số bước lớn hơn 10000.

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

Với những cách sử dụng nâng cao thì callAsFunction() cũng hỗ trợ throws và rethrows. Bạn cũng có thể tạo nhiều callAsFunction và Swift sẽ tự chọn hàm phù hợp nhất, giống với overloading bình thường của hàm.

**Subscripts có thể định nghĩa giá trị mặc định**

Khi bạn tự tạo subscript thì bạn cũng có thể sử dụng giá trị mặc định. Ví dụ dưới đây sẽ tạo param default trong trường hợp index out of bounds:

```
struct PoliceForce {
    var officers: [String]

    subscript(index: Int, default default: String = "Unknown") -> String {
        if index >= 0 && index < officers.count {
            return officers[index]
        } else {
            return `default`
        }
    }
}

let force = PoliceForce(officers: ["Amy", "Jake", "Rosa", "Terry"])
print(force[0])
print(force[5])
```

Hàm print ở trên sẽ in ra "Amy" và ở dưới sẽ là giá trị mặc định "Unknown" vì 5 là index out of bounds của mảng force.

Ta cũng có thể sử dụng như dưới:

```
print(force[-1, default: "The Vulture"])
```

**Chẩn đoán mới và được cải thiện**
Swift 5.2 đã giới thiệu một kiến trúc chẩn đoán mới nhằm cải thiện chất lượng và độ chính xác của các thông báo lỗi do Xcode thông báo khi bạn mắc lỗi cú pháp. Điều này đặc biệt rõ ràng khi làm việc với mã SwiftUI, nơi Swift thường tạo ra các thông báo lỗi giả.

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

Việc cố gắng bind TextField với thuộc tính số nguyên @State là không hợp lệ. Trong Swift 5.1, điều này gây ra lỗi cho frame() nói rằng 'Int' is not convertible to 'CGFloat?', Nhưng trong Swift 5.2 và về sau, điều này xác định chính xác lỗi là ràng buộc $ name: Cannot convert value of type 'Binding' to expected argument type 'Binding’.

Nguồn: https://www.hackingwithswift.com/articles/212/whats-new-in-swift-5-2