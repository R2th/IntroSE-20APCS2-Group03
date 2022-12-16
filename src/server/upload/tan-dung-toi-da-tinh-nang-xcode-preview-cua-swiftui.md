- Dựa theo yêu cầu của đa số developer mà  chức năng `Preview` của `SwiftUI`  đã được giới thiệu trong `Xcode 11` , cung cấp một cách mới để xây dựng UI  dễ sử dụng, hiệu quả hơn.

- Trong bài viết này này chúng ta hãy cùng nghiên cứu một vài kỹ thuật, mô hình và cách triển khai UI dựa trên tính năng này.

## 1/ Screens, components, and interactivity:
- Khi xây dựng một UI cụ thể để tiện lợi cho việc  phân tách các chế độ view khác nhau của chúng ta có  hai thành phần chính - `screen` và các `compenent`. Mỗi loại đểu có thể chứa nhiều thành phần con và có thể tái sử dụng.

- Chúng ta sử dụng `SwiftUI` để build `component` có thể tái sử dụng như sau:

```swift
struct ReminderRow: View {
    var title: String
    var description: String

    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
            Text(description)
                .foregroundColor(.secondary)
                .font(.footnote)
        }
    }
}
```

- Để khởi động `Preview mode` chúng ta phải xác định loại thành phần  phù hợp với protocol `PreviewProvider`:

```swift
#if DEBUG
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews"
        )
    }
}
#endif
```

Điều thú vị là hệ thống xem trước Xcode, sử dụng cùng một API giống như DSL mà SwiftUI sử dụng, nó mang lại cho chúng tôi rất nhiều sức mạnh và tính linh hoạt khi nói đến cách chúng tôi thiết lập các bản xem trước khác nhau trong cơ sở mã của mình.

Tuy nhiên, việc triển khai ReminderRow ở trên hiện tại khá đơn giản và chỉ dựa vào dữ liệu chỉ đọc có thể dễ dàng chuyển vào trình khởi tạo của nó - nhưng nếu nó cần tương tác nhiều hơn một chút thì sao? Ví dụ: hãy để Lừa nói rằng chúng tôi muốn thêm Chuyển đổi vào hàng của mình, để cho phép người dùng của chúng tôi dễ dàng đánh dấu một lời nhắc đã cho là đã hoàn thành:

```swift
struct ReminderRow: View {
    var title: String
    var description: String
    @Binding var isCompleted: Bool

    var body: some View {
        Toggle(isOn: $isCompleted) {
            VStack(alignment: .leading) {
                Text(title)
                Text(description)
                    .foregroundColor(.secondary)
                    .font(.footnote)
            }
        }.padding()
    }
}
```

-  Chúng ta  sử dụng  `Binding` để thiết lập kết nối 2 chiều giữa `ReminderRow` và bất kỳ thành phần chứa nó. Sử dụng API .constant  cho phép chúng ta pass qua một giá trị không đổi :

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .constant(false)
        )
    }
}
```

- Các `binding` có những quy chuẩn khá nghiêm ngặt và  thường ngăn chúng ta tương tác với UI người dùng  khi chúng ta `Preview`. 

- Cách để khắc phục vấn đề đó là thay vào  `API Binding`  để tạo các `Preview`:

```swift
extension Binding {
    static func mock(_ value: Value) -> Self {
        var value = value
        return Binding(get: { value }, set: { value = $0 })
    }
}
```
- Với  điều trên chúng ta có thể quay lại triển khai `ReminderRowPreview` làm cho nó tương tác hoàn toàn  bằng cách thay thế `.constant` bằng `.mock`:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
    }
}
```

## 2/Specific environments:
- Tiếp theo chúng ta hãy xem cách sửa đổi một `component`  cho phép chúng ta `preview` cách thức hoạt động của nó trong các điều kiện mô phỏng khác nhau.

- Hãy để sử dụng ` .colorScheme` tích hợp để xem trước `ReminderRow` sẽ trông như thế nào khi được hiển thị trên một `device` mà chạy ở chế độ `darkmode` :

 ```swift
 struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
        .colorScheme(.dark)
    }
}
```

- Có hai cách chính để giải quyết vấn đề trên, một cách là nhúng `component ReminderRow`  vào một `container` chẳng hạn như `NavigationView` trước khi `preview`. Đồng thời ẩn thanh điều hướng  `container` thì `component` của chúng ta vẫn sẽ được hiển thị bằng cách sử dụng cùng `layout` như trước:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ReminderRow(
                title: "Write weekly article",
                description: "Think it'll be about Xcode Previews",
                isCompleted: .mock(false)
            )
            .navigationBarTitle("")
            .navigationBarHidden(true)
        }
        .colorScheme(.dark)
    }
}
```

- Một cách khác không liên quan đến việc thêm vào `navigation stack` sẽ là cung cấp cho `compenent` của chúng ta một `background color` rõ ràng .Nếu chúng ta sử dụng API `systemBackground` trên `UIColor` thì chúng ta có thể mô phỏng `compennet`:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
        .background(Color(UIColor.systemBackground))
        .colorScheme(.dark)
    }
}
```

- Tuy nhiên với bảng màu mà bản `preview` của chúng ta  được hiển thị bằng cách sử dụng một trong nhiều `enviroment paramater` khác nhau mà chúng ta có thể sử dụng:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
        .previewDevice("iPhone 11")
        .environment(\.sizeCategory, .accessibilityExtraExtraExtraLarge)
    }
}
```

## 3/Group, iterations, and convenience APIs:
- Giống như các chế độ xem `SwiftUI`  nhiều chế độ `preview` có thể được nhóm vào một vùng  `API group`. Trong tính năng `preview Xcode`, các group như vậy được xử lý theo cách đặc biệt vì hệ thống sẽ tạo một bản `preview` riêng cho từng thành phần trong group  cho phép chúng ta dễ dàng `preview` nhiều màn hình cùng lúc.

- Cách thức chúng ta có thể nhanh chóng preview `ReminderRow`  sẽ như thế nào khi được hiển thị ở cả chế độ `light` và `dark` bằng cách sử dụng một `PreviewProvider` duy nhất:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        let row = ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
        .previewLayout(.sizeThatFits)

        return Group {
            row

            row.background(Color(UIColor.systemBackground))
               .colorScheme(.dark)
        }
    }
}
```

- Chúng ta sẽ cần một vài `extension` giúp chúng ta gắn nhãn cho mỗi bản `preview` mà chúng ta sẽ tạo ra. Trong trường hợp này, chúng ta sẽ kết hợp từng `ColorScheme` c với các giá trị `ContentSizeC Category` nhỏ nhất và lớn nhất:

```swift
extension ColorScheme {
    var previewName: String {
        String(describing: self).capitalized
    }
}

extension ContentSizeCategory {
    static let smallestAndLargest = [allCases.first!, allCases.last!]

    var previewName: String {
        self == Self.smallestAndLargest.first ? "Small" : "Large"
    }
}
```

- Tiếp theo hãy cho `extension` `ForEach`bằng cách sử dụng `SwiftUI, ForEach` với các raw value.

```swift
extension ForEach where Data.Element: Hashable, ID == Data.Element, Content: View {
    init(values: Data, content: @escaping (Data.Element) -> Content) {
        self.init(values, id: \.self, content: content)
    }
}
```

- Chúng ta có thể bắt đầu xây dựng các bản`custom` để tạo nhiều bản `preview`. Tạo một `component` để `preivew` các thành phần riêng lẻ bằng cách bật chế độ xem`ColorScheme` `ContentSizeC Category` chúng ta đã xác định ở trên và thiết lập từng bản`preview` tương ứng:

```swift
struct ComponentPreview<Component: View>: View {
    var component: Component

    var body: some View {
        ForEach(values: ColorScheme.allCases) { scheme in
            ForEach(values: ContentSizeCategory.smallestAndLargest) { category in
                self.component
                    .previewLayout(.sizeThatFits)
                    .background(Color(UIColor.systemBackground))
                    .colorScheme(scheme)
                    .environment(\.sizeCategory, category)
                    .previewDisplayName(
                        "\(scheme.previewName) + \(category.previewName)"
                    )
            }
        }
    }
}
```

- Hãy tạo một API `extension` cho phép chúng ta dễ dàng tạo bản `preview` `component` cho bất kỳ chế độ nào:

```swift
extension View {
    func previewAsComponent() -> some View {
        ComponentPreview(component: self)
    }
}
```

- Bây giờ chúng ta có thể quay lại `ReminderRowPreview` và tạo ra 4 bản`preiview` khác nhau  bằng cách gọi `API previewAsComponent` mới:

```swift
struct ReminderRowPreview: PreviewProvider {
    static var previews: some View {
        ReminderRow(
            title: "Write weekly article",
            description: "Think it'll be about Xcode Previews",
            isCompleted: .mock(false)
        )
        .previewAsComponent()
    }
}
```

- Chúng ta  có được cái nhìn toàn diện hơn về `UI` của mình, đặc biệt nếu chúng tacũng kết hợp danh sách các thiết bị đó với tất cả các  `olorScheme`:

```swift
struct ScreenPreview<Screen: View>: View {
    var screen: Screen

    var body: some View {
        ForEach(values: deviceNames) { device in
            ForEach(values: ColorScheme.allCases) { scheme in
                NavigationView {
                    self.screen
                        .navigationBarTitle("")
                        .navigationBarHidden(true)
                }
                .previewDevice(PreviewDevice(rawValue: device))
                .colorScheme(scheme)
                .previewDisplayName("\(scheme.previewName): \(device)")
                .navigationViewStyle(StackNavigationViewStyle())
            }
        }
    }

    private var deviceNames: [String] {
        [
            "iPhone 8",
            "iPhone 11",
            "iPhone 11 Pro Max",
            "iPad (7th generation)",
            "iPad Pro (12.9-inch) (4th generation)"
        ]
    }
}

extension View {
    func previewAsScreen() -> some View {
        ScreenPreview(screen: self)
    }
}
```

## 4/Previews are not just for SwiftUI views
- Cuối cùng chúng ta hãy xem cách  có thể sử dụng tính năng `Xcode preview` miễn phí để lặp lại các chế độ xem không được xây dựng bằng `SwiftUI` mà sử dụng `UIKit, Core Animation hoặc AppKit`.

- Tạo các loại cầu nối cụ thể cho các chế độ xem riêng  hoặc các `controller` :

```swift
@available(iOS 13, *)
struct SchedulingView: UIViewControllerRepresentable {
    var schedule: Schedule

    func makeUIViewController(context: Context) -> SchedulingViewController {
        SchedulingViewController(schedule: schedule)
    }

    func updateUIViewController(_ uiViewController: SchedulingViewController,
                                context: Context) {
        // We don’t need to write any update code in this case.
    }
}

@available(iOS 13, *)
struct SchedulingViewPreview: PreviewProvider {
    static var previews: some View {
        SchedulingView(schedule: Schedule())
    }
}
```

- Hãy tạo ra một bản `extension` nữa  cho phép bất kỳ `UIViewController` nào cũng dễ dàng được chuyển thành bản `preview` `SwiftUI` như sau:

```swift
extension UIViewController {
    @available(iOS 13, *)
    private struct Preview: UIViewControllerRepresentable {
        var viewController: UIViewController

        func makeUIViewController(context: Context) -> UIViewController {
            viewController
        }

        func updateUIViewController(_ uiViewController: UIViewController,
                                    context: Context) {
            // No-op
        }
    }

    @available(iOS 13, *)
    func asPreview() -> some View {
        Preview(viewController: self)
    }
}
```

- Giờ đây chúng ta có thể dễ dàng làm cho bất kỳ `controller` xem nào tương thích với `Xcode preview`. Tất cả những gì chúng ta phải làm là tạo một `PreviewProvider` gọi phương thức `asPreview` mới của chúng ta trên trình điều khiển xem mà chúng ta muốn xem trước:

```swift
@available(iOS 13, *)
struct SchedulingViewPreview: PreviewProvider {
    static var previews: some View {
        SchedulingViewController(schedule: Schedule()).asPreview()
    }
}
```