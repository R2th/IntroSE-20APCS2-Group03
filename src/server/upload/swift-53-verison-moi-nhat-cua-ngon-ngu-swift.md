![](https://images.viblo.asia/ccb82dbc-80b0-4e8a-a7e3-49fef0d79a68.jpeg)


Với các bạn làm iOS thì chắc đã quá quen thuộc với việc update các phiên bản mới nhất của iOS, swift, xcode. Trong bài viết này chúng ta sẽ cùng tìm hiểu về những điểm mới trên Swift 5.3 -  verison mới nhất của ngôn ngữ Swift.

**Nào chúng ta cùng tìm hiểu nhé!**

```Swift

```

### Multi-pattern catch clauses
 Ở version swift này chúng ta đã có thể thực hiện bắt được nhiều trường hợp lỗi bên trong quá trình xử lý lỗi giúp chúng ta hạn chế được rất nhiều trùng lặp.
  Ví dụ: Khi xử lý việc bắt lỗi về nhiệt độ trong đoạn code dưới đây: 
 ```Swift
 enum TemperatureError: Error {
    case tooCold, tooHot
}
```

```Swift
func getReactorTemperature() -> Int {
    90
}

func checkReactorOperational() throws -> String {
    let temp = getReactorTemperature()

    if temp < 10 {
        throw TemperatureError.tooCold
    } else if temp > 90 {
        throw TemperatureError.tooHot
    } else {
        return "OK"
    }
}
```


```Swift
do {
    let result = try checkReactorOperational()
    print("Result: \(result)")
} catch TemperatureError.tooHot, TemperatureError.tooCold {
    print("Shut down the reactor!")
} catch {
    print("An unknown error occurred.")
}
```

#### Multiple trailing closures

 Chúng ta cùng quan sát hai cách viết dưới đây để thấy rõ trên swift 5.3 mọi thứ trở lên đơn giản và rõ ràng hơn

```Swift
struct OldContentView: View {
    @State private var showOptions = false

    var body: some View {
        Button(action: {
            self.showOptions.toggle()
        }) {
            Image(systemName: "gear")
        }
    }
}
```

```Swift
struct NewContentView: View {
    @State private var showOptions = false

    var body: some View {
        Button {
            self.showOptions.toggle()
        } label: {
            Image(systemName: "gear")
        }
    }
}
```

### Synthesized Comparable conformance for enums

 Với **Comparable** chúng ta có thể sử dụng các phép so sánh <, > và =  để so sánh các instance của enum: 

```Swift
enum Size: Comparable {
    case small
    case medium
    case large
    case extraLarge
}
```

```Swift
let shirtSize = Size.small
let personSize = Size.large

if shirtSize < personSize {
    print("That shirt is too small")
}
```

### self is no longer required in many places
Version swift này cho phép chúng ta ở một số trường hợp không cần viết **seft** nếu trước đây sẽ bị báo error, chúng ta cùng xem ví dụ sau:

```Swift
struct OldContentView: View {
    var body: some View {
        List(1..<5) { number in
            self.cell(for: number)
        }
    }

    func cell(for number: Int) -> some View {
        Text("Cell \(number)")
    }
}
```

 chúng ta không cần viết **self.cell** nữa mà thay vì đó **cell** là đủ:

```Swift
struct NewContentView: View {
    var body: some View {
        List(1..<5) { number in
            cell(for: number)
        }
    }

    func cell(for number: Int) -> some View {
        Text("Cell \(number)")
    }
}
```

### Type-Based Program Entry Points

Chúng ta có thuộc tính **@main** và chúng ta sẽ không cần tạo instant sau đó mới call method mà call trực tiếp như dưới đây:


```Swift
struct OldApp {
    func run() {
        print("Running!")
    }
}

let app = OldApp()
app.run()
```

thay vào đó sẽ là

```Swift
@main
struct NewApp {
    static func main() {
        print("Running!")
    }
}
```



### Kết luận

Swift 5.3  đã bổ sung một số thuộc tính khá thú vị, ngôn ngữ Swift ngày càng hoàn thiện hơn, dễ dàng và gọn hơn.

Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_

[https://www.hackingwithswift.com/articles/218/whats-new-in-swift-5-3](https://www.hackingwithswift.com/articles/218/whats-new-in-swift-5-3)