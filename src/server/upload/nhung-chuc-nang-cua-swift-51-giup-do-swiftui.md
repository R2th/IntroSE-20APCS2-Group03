Với sự xuất hiện của SwiftUI mà Apple đã giới thiệu  là một framework cho UI mới, mở ra một con đường cho việc xây dựng UI cho tất cả các platform của Apple, sử dụng phong cách code khắc hẳn so với UIKit.

Trước khi chúng ta bắt đầu, hãy chú ý rằng SwiftUI và Swift5.1 vẫn đang trong beta phase, vì vậy một số thông tin trong bài viết này có thể sẽ thay đổi trong tương lai.

## Kiểu "Opaque Return"

Một chức năng đặc biệt khi nhìn vào code ví dụ của SwiftUI đã được chia sẻ, đó là keyword `some`. Được giới thiệu thông qua quá trình phát triển của Swift [SE-0244](https://github.com/apple/swift-evolution/blob/master/proposals/0244-opaque-result-types.md), keyword mới này cho phép hàm, script và tạo ra property để tạo ra kiểu "opaque return".

Điều này có nghĩa là gì, liệu rằng nó có phải là protocol thông thường( ví dụ như là những protocal có cả kiểu associated hoặc reference tới `Self`)  bây giờ có thể được sử dụng như là những kiểu trả về. Khi sử dụng SwiftUI, `some` được sử dụng khi khao báo phần `body` của view giống như sau : 

```swift
struct ContentView: View {
    var body: some View {
        Text("Hello, world!")
    }
}
```

Phần view protocol được sử dụng để định nghĩa những đặc điểm view của SwiftUI, và để cho phép mỗi view quyết định xem sẽ sử dụng kiểu nào cho phần `body`. Trong Swift 5.1, cố gắng tham chiếu protocol như vậy mà lại không dùng `some` sẽ gây ra compiler error nói rằng `view` chỉ có sử dụng là `generic constraint`. Để có thể thoát lỗi này, ta chỉ có thể dùng một kiểu được xây dựng từ lên từ View như sau 

```swift
struct ContentView: View {
    var body: Text {
        Text("Hello, world!")
    }
}
```

Một cách khác để sử dụng đó là dùng [type erasure](https://www.swiftbysundell.com/posts/different-flavors-of-type-erasure-in-swift), đòi hỏi mỗi phần xử lý `view` phải được đặt vào trong một `AnyView` trước khi trả về.

```swift
struct ContentView: View {
    var body: AnyView {
        AnyView(Text("Hello, world!"))
    }
}
```

Nhưng bây giờ, bằng cách sử dụng keyword `some`, chúng ta tuỳ ý trả về bất kỳ kiểu nào thoả mãn protocol được đặc tả ví dụ nhu `View` ở trong SwiftUI.

Một đặc điểm có lợi cho việc sử dụng keyword mới này đó là chúng ta không cần phải tuỳ chỉnh lại các API được public để phục vụ mục đích thay đổi các biến trả về được sử dụng ở trong. 

## Bỏ qua từ khoá return
Cho dù nó không quan trọng bằng từ khoá `some` nhưng nó cũng là một cải thiện để tăng tính nhất quán, và là một cải thiện lớn để làm nhẹ bớt trải nghiệm về code SwiftUI.

```swift
struct ContentView: View {
    var body: some View {
        // Using an explicit return keyword
        return Text("Hello, world!")
    }
}

struct ContentView: View {
    var body: some View {
        // Omitting the return keyword, just like within a closure  
        Text("Hello, world!")
    }
}
```

## Function builder
Với keyword `some` và lược bỏ return, giờ chúng ta đã biết tầng cao nhất là View của SwiftUI hoạt động như thế nào. Nhưng để tạo ra nhiều view xếp với nhau thì chúng ta chưa có cách gì, táy máy một chút thì có thể tạm viết code như sau.

```swift
struct HeaderView: View {
    let image: UIImage
    let title: String
    let subtitle: String

    var body: some View {
        VStack {
            // Here three seperate expressions are evaluated,
            // without any return keyword or additional syntax.
            Image(uiImage: image)
            Text(title)
            Text(subtitle)
        }
    }
}
```

Cách dạng xếp view ở trong SwiftUI như là `VStack`,`HStack` và `Group` cho phép nhiều view xếp với nhau bằng cách tạo ra các instance ở trong ngoặc nhọn. Nhưng nếu viết như thế nào thì việc lược bỏ return gặp vấn đề. Vậy phải dùng cách nào ?

Câu trả lời đó là dùng `function builders`, là một chức năng mới tuy nhiên chưa được công bố chính thức. Nếu như không sử dụng function chính thức thì chúng ta phải tự tạo ra một builder riêng giống như sau

```swift
struct HeaderView: View {
    let image: UIImage
    let title: String
    let subtitle: String

    var body: some View {
        var builder = VStackBuilder()
        builder.add(Image(uiImage: image))
        builder.add(Text(title))
        builder.add(Text(subtitle))
        return builder.build()
    }
}
```
Vậy `function builder` làm việc như thế nào ? Nó bắt đầu bằng việc sử dụng atrribute `@functionBuilder`(hoặc là @functionBuilder) ở phiên bản hiện tại (chức năng này hiện vẫn đang là private ở trong Xcode).

```swift
@functionBuilder
struct ViewBuilder {
    // Build a value from an empty closure, resulting in an
    // empty view in this case:
    func buildBlock() -> EmptyView {
        return EmptyView()
    }

    // Build a single view from a closure that contains a single
    // view expression:
    func buildBlock<V: View>(_ view: V) -> some View {
        return view
    }

    // Build a combining TupleView from a closure that contains
    // two view expressions:
    func buildBlock<A: View, B: View>(_ viewA: A, viewB: B) -> some View {
        return TupleView((viewA, viewB))
    }

    // And so on, and so forth.
    ...
}
```

Hãy để ý với mỗi ngoặc nhọn được biến thể khác nhau được xây dựng như trên, Chúng ta có thể phải đối phó với nhiều loại `View` được định nghĩa bên trong ngoặc nhọn. 

## Property wrapper

Phần thay đổi lớn trong Swift 5.1 được đưa ra đó là `property wrapper`. Chức năng mới này cho phép giá trị của property được tự động wrap bằng cách dùng một loại đặc thù. 
```swift
struct SettingsView: View {
    @State var saveHistory: Bool
    @State var enableAutofill: Bool

    var body: some View {
        return VStack {
            // We can now access bindable versions of our state
            // properties by prefixing their name with '$':
            Toggle(isOn: $saveHistory) {
                Text("Save browsing history")
            }
            Toggle(isOn: $enableAutofill) {
                Text("Autofill my information")
            }
        }
    }
}
```
`Property wrapper` được sử dụng như là một interface nằm giữa giá trị của property và phần lưu bên dưới. Dưới đây là cách code thứ hai tương đương với đoạn code bên trên nhưng có khac sbieejt là sử dụng `State`

```swift
struct SettingsView: View {
    var saveHistory: State<Bool>
    var enableAutofill: State<Bool>

    var body: some View {
        return VStack {
            Toggle(isOn: saveHistory.binding) {
                Text("Save browsing history")
            }
            Toggle(isOn: enableAutofill.binding) {
                Text("Autofill my information")
            }
        }
    }
}
```

## Kết luận

SwiftUI không chỉ đem đến một khía cạnh mới cho việc xây dựng UI mà nó còn như là một yếu tố để thể hiện những thay đổi ở trong Swift 5.1.  Mặc dù bài viết này mới chỉ nói qua một chút phần nổi của SwiftUI nhưng mong sao nó cũng giúp ích được cho các bạn phần nào hiểu được khái niệm mới này.