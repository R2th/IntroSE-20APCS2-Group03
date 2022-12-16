- `Function buidler` là tính năng được ưa thích nhất kể từ khi ra mắt cùng `SwiftUI` trong version `Swift 5.1`.
Nó ngay lập tức là một phần quan trọng trong việc triển khai `SwiftUI` trong khi chưa được `Apple` phát triển hoàn chỉnh.

- Ở bài viết này chúng ta sẽ cùng tìm hiểu kỹ hơn về tính năng `function buidler` này để xem nó mang lại cho cho chúng ta những lợi ích thế nào trong việc triển khai `code` trong `SwiftUI`.

- Lưu ý: Chúng ta cần nói rõ với nhau là `function buidler` được giới thiệu ở phiển bản `Swift 5.1`. Việc sử dụng `Function buidler` trong môi trường production tùy thuộc lớn vào project bạn đang phát triển đang hỗ trợ sử dụng version `Swift` nào. Hãy chắc chắn version `Swift` của `project` bạn đang phát triển trước khi áp dụng `function buidler`.

## 1: Setting:

- Cách tốt nhất với bản thân tôi khi tìm hiểu cách thức mà tính năng `Swift` hoạt động là thực hành `code` ví dụ nào đó do đó chúng ta sẽ cùng cần một ví dụ với đầy đủ các `setting`, chúng ta sẽ dùng `Setting` như sau:

```swift
struct Setting {
    var name: String
    var value: Value
}

extension Setting {
    enum Value {
        case bool(Bool)
        case int(Int)
        case string(String)
        case group([Setting])
    }
}
```

- Chúng ta sử dụng `associated type` cho các giá trị của `enum` để đảm bảo việc cho việc các `instance setting` sẽ có đầy đủ các `type` khác nhau.

- Thông qua việc tạo `group` chúng ta có thể tạo ra các `nested setting` như sau:

```swift
let settings = [
    Setting(name: "Offline mode", value: .bool(false)),
    Setting(name: "Search page size", value: .int(25)),
    Setting(name: "Experimental", value: .group([
        Setting(name: "Default name", value: .string("Untitled")),
        Setting(name: "Fluid animations", value: .bool(true))
    ]))
]
```

## 2: Sử dụng builder cho function:

- Điều cốt lõi của `Function builder` trong `Swift` là giúp cho việc `build` các `content` trong `function` thành các `single value`. Trong `SwiftUI` chúng ta sử dụng tính năng trên cho việc `transform` các `content` của một hoặc nhiều `container` (`HStack` hoặc `VStack`) trong một `view` bằng cách sử dụng `type(of:)`:

```swift
import SwiftUI

let stack = VStack {
    Text("Hello")
    Text("World")
    Button("I'm a button") {}
}

// Prints 'VStack<TupleView<(Text, Text, Button<Text>)>>'
print(type(of: stack))
```

- `SwiftUI` sử dụng các `function` khác nhau trong việc `implementations` như `ViewBuilder` và `SceneBuilder`. Nhưng việc chúng ta không thể tham khảo `source code` cho các `type` này nên chúng ta sẽ `build` các `Function buidler` cho các setting trong `API` này:

- Như tính năng [property-wrappers-in-swift](https://www.swiftbysundell.com/articles/property-wrappers-in-swift/) , một `function buidler` sẽ đảm nhiệm việc `implement` các loại type bình thường trong `Swift` được giới thiệu với cú pháp `@_functionBuilder`. Các `method` đặc biệt đã từng được dùng để `implement` các `case` làm việc của `Function Builder`. Chúng ta tham khảo cách dùng `buildBlock` sau:

```swift
@_functionBuilder
struct SettingsBuilder {
    static func buildBlock() -> [Setting] { [] }
}
```

- Cách `return type` trên trong `function ([Setting])` phải chỉ định thêm `type` mà `builder` có thể sử dụng. Chúng ta sẽ chọn cách `implement API` như `global function` để sử dụng các `SettingsBuilder` cho bất kỳ `closure` nào được truyền đến:

```swift
func makeSettings(@SettingsBuilder _ content: () -> [Setting]) -> [Setting] {
    content()
}
```

- Với cách `code` trên chúng ta có thể gọi `makeSettings` với một `trailing closure` trống và nhận về một `array` trống:

```swift
let settings = makeSettings {}
```

- `API` mới của chúng ta vẫn chưa thực sự hữu dụng, nó mới chỉ cho chúng ta thấy một ít khả năng cũng như cách làm việc của nó `Function Builder`. Chúng ta sẽ tìm hiều kỹ hơn ở đầu mục tiếp theo:

## 3: Build các values:

- Để kích hoạt `SettingsBuilder` của chúng ta để `accept` các `input` thì việc của chúng ta cần làm là khai báo bổ sung `buildBlock` với các `argument` phù hợp với `input` cho kết quà mà chúng ta muốn nhận về. Chúng ta sẽ `implement` một `method` với list các value `Setting` và `return` về một `array`:

```swift
extension SettingsBuilder {
    static func buildBlock(_ settings: Setting...) -> [Setting] {
        settings
    }
}
```

- Với `buildBlock` mới vừa được khai báo, chúng ta sẽ cho phép fill `makeSettings` gọi đến các `Setting` value và các `function builder` sẽ tích hợp cho các value trong `array` và `return`:

```swift
let settings = makeSettings {
    Setting(name: "Offline mode", value: .bool(false))
    Setting(name: "Search page size", value: .int(25))

    Setting(name: "Experimental", value: .group([
        Setting(name: "Default name", value: .string("Untitled")),
        Setting(name: "Fluid animations", value: .bool(true))
    ]))
}
```

- Chúng ta đã đạt được một sự cải tiến nhè nhẹ ở đây, bây giờ thì hãy quay về với `SwiftUI` và thêm vào các `function builder` với khả năng mạnh mẽ trong công việc định nghĩa `group`. Chúng ta sẽ cần thêm một type `SettingGroup` có `annotates` là `@SettingsBuilder` để kết nối với `function buidler`:

```swift
struct SettingsGroup {
    var name: String
    var settings: [Setting]

    init(name: String,
         @SettingsBuilder builder: () -> [Setting]) {
        self.name = name
        self.settings = builder()
    }
}
```

- Cách triển khai trên cho phép chúng ta định nghĩa `group` giống cách chúng ta định nghĩa các `setting` bằng cách kết nối mỗi `Setting` với `closure` như sau:

```swift
SettingsGroup(name: "Experimental") {
    Setting(name: "Default name", value: .string("Untitled"))
    Setting(name: "Fluid animations", value: .bool(true))
}
```

- Nếu chúng ta cứ khăng khăng sử dụng `makeSettings closure` thì chúng ta sẽ bị báo lỗi vì các `method function builder` sẽ đang đợi rất nhiều giá trị `Setting` và `SettingGroup` mới của chúng ta là một `type` hoàn toàn khác.

- Để xử lý `error` trên chúng ta cần thêm các `prototol` để có thể chia sẻ giữa `Setting` và `SettingGroup`:

```swift
protocol SettingsConvertible {
    func asSettings() -> [Setting]
}

extension Setting: SettingsConvertible {
    func asSettings() -> [Setting] { [self] }
}

extension SettingsGroup: SettingsConvertible {
    func asSettings() -> [Setting] {
        [Setting(name: name, value: .group(settings))]
    }
}
```

- Công việc tiếp theo cần làm là `modify` các `function buidler` của `buildBlock` để `accept` các `SettingsConvertible` được khởi tạo hơn là sử dụng giá trị mà `Setting` được trả về thông qua [map](https://www.swiftbysundell.com/basics/map-flatmap-and-compactmap/):

```swift
extension SettingsBuilder {
    static func buildBlock(_ values: SettingsConvertible...) -> [Setting] {
        values.flatMap { $0.asSettings() }
    }
}
```

- Bây giờ chúng ta đã có đầy đủ phương tiện để sử dụng đầy đủ tính năng của `SwiftUI` hỗ trợ bằng cách thiết laapk các `group` như sau:

```swift
let settings = makeSettings {
    Setting(name: "Offline mode", value: .bool(false))
    Setting(name: "Search page size", value: .int(25))

    SettingsGroup(name: "Experimental") {
        Setting(name: "Default name", value: .string("Untitled"))
        Setting(name: "Fluid animations", value: .bool(true))
    }
}
```

## 4: Các điều kiện sử dụng Function Builder:

- Chúng ta có thể thêm vào các `conditional` để hỗ trợ việc sử dụng `Function Builder`. Bản thân `Swift` đã hỗ trợ tất cả các loại `conditional` chúng ta cần sử dụng, tuy nhiên trong trường hợp với `SettingsBuilder` hiện tại đang `implement` chúng ta sẽ gặp phải error nếu chúng ta cố gắng làm như sau:

```swift
let shouldShowExperimental: Bool = ...

let settings = makeSettings {
    Setting(name: "Offline mode", value: .bool(false))
    Setting(name: "Search page size", value: .int(25))

    // Compiler error: Closure containing control flow statement
    // cannot be used with function builder 'SettingsBuilder'.
    if shouldShowExperimental {
        SettingsGroup(name: "Experimental") {
            Setting(name: "Default name", value: .string("Untitled"))
            Setting(name: "Fluid animations", value: .bool(true))
        }
    }
}
```

- Đoạn `code` trên cho chúng ta thấy cách `executed` của các `function builder` với `annotated` không được thực hiện giống với cách thông dụng mà chúng ta thường sử dụng vì các tiến trình xử lý cần được định nghĩa rõ ràng bỏi `builder` bao gồm cả `conditional` như `if statement`:

- Chúng ta cần thêm các `statement` để `sort` và xử lý vấn đề trên. Chúng ta có thêm một `method` được giới thiệu trong API là `buidlIf`. Tác dụng của nó là `map` mỗi `if statement`:

```swift
// Here we extend Array to make it conform to our SettingsConvertible
// protocol, in order to be able to return an empty array from our
// 'buildIf' implementation in case a nil value was passed:
extension Array: SettingsConvertible where Element == Setting {
    func asSettings() -> [Setting] { self }
}

extension SettingsBuilder {
    static func buildIf(_ value: SettingsConvertible?) -> SettingsConvertible {
        value ?? []
    }
}
```

- `if statement` ở trên bây giờ đã có thể hoạt động chính xác với mong đợi của chúng ta nhưng chúng ta vẫn cần thêm các `if/else` để có thể bổ sung `method buildEither` với các các `argument` phù hợp với các `if/else statement`:

```swift
extension SettingsBuilder {
    static func buildEither(first: SettingsConvertible) -> SettingsConvertible {
        first
    }

    static func buildEither(second: SettingsConvertible) -> SettingsConvertible {
        second
    }
}
```

- Chúng ta thêm vào `else` cho `if statement` đầu tiên của chúng ta từ trước nên chúng ta có ví dụ cho việc các `user` sẽ `request` các `setting` mà trước đó chưa được hiển thị:

```swift
let settings = makeSettings {
    Setting(name: "Offline mode", value: .bool(false))
    Setting(name: "Search page size", value: .int(25))

    if shouldShowExperimental {
        SettingsGroup(name: "Experimental") {
            Setting(name: "Default name", value: .string("Untitled"))
            Setting(name: "Fluid animations", value: .bool(true))
        }
    } else {
        Setting(name: "Request experimental access", value: .bool(false))
    }
}
```

- Cho đến tận `Swift 5.3` , các `method buildEither` mới được hỗ trợ `swift statement` để sử dụng cho việc `build context` mà không cần thêm các `build method`.

- Chúng ta sẽ cố cải tiến đoạn code trên thêm một chút cho biến `shouldShowExperimental` trong `enum` bằng cách hỗ trợ việc `access` nhiều level khác nhau. Đơn giản là chúng ta có thể chuyển đổi qua lại trong `enum` với `makeSettings closure` và trình biên dịch sẽ tự động chuyển đến `method buildEither`:

```swift
enum UserAccessLevel {
    case restricted
    case normal
    case experimental
}

let accesssLevel: UserAccessLevel = ...

let settings = makeSettings {
    Setting(name: "Offline mode", value: .bool(false))
    Setting(name: "Search page size", value: .int(25))

    switch accesssLevel {
    case .restricted:
        Setting.Empty()
    case .normal:
        Setting(name: "Request experimental access", value: .bool(false))
    case .experimental:
        SettingsGroup(name: "Experimental") {
            Setting(name: "Default name", value: .string("Untitled"))
            Setting(name: "Fluid animations", value: .bool(true))
        }
    }
}
```

- Bổ sung thêm một chú ý là `type Setting.Empty` với mỗi `switch statement` trong `case``.restricted` có thể sẽ cần sử dụng thêm `break keywork` với các `function builder`sử dụng `switch statement`. Như cách sử dụng `EmptyView` trong `SwiftUI`, các `Setting API` mới đã có thêm `Setting.Empty`cho trường hợp này:

```swift
extension Setting {
    struct Empty: SettingsConvertible {
        func asSettings() -> [Setting] { [] }
    }
}
```