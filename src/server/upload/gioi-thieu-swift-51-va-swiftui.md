- Trong dịp **WWDC2019** vừa diễn ra đầu tháng 6, **Apple** đã giới thiệu một UI framework mới - **SWiftUI**. Đây được coi là sự kiện quan trọng nhất được chờ đợi trong **WWDC2019**. Một con đường hoàn toàn mới trong việc xây dựng UI cho các hệ điều hành của Apple, sử dụng coding-style rất khác biệt so với cách UIKit hoạt động. **SWiftUI** không chỉ là một **framework** mới, nó là một dạng chuyển đổi mô hình code, build app.
- Như cách xây dụng UI hiện đại của Apple, **SWiftUI** cũng góp phần đẩy Swift lên một tầm cao mới bằng cách sử dụng rất nhiều cú pháp mới được giới thiệt trong **Swift 5.1**.
- Trong bài viết này, hãy cùng nghiên cứu những tính năng mới này và cách để từ những thay đổi này chúng ta có thể thu được kiến thức nhiều nhất.(Trước khi bắt đầu, xin lưu ý rằng **SwiftUI** và swift 5.1 vẫn đang trong giai đoạn beta do đó sẽ có những thay đổi liên tục cho đến kì ra mắt vào mùa thu tới.)

### 1/ Cách trả về giá trị chung chung(Opaque return types)?
- Một tính năng nồi bật khi chúng ta nhìn thấy vào các sample code đã được chia sẻ nó là keyword **some** - được giới thiệu từ **Swift Evolution** [SE-0244](https://github.com/apple/swift-evolution/blob/master/proposals/0244-opaque-result-types.md). Keyword này cho phép function, **subcript**, và **computed properties** khai báo **opaque return types**.
- Điều đó mang lại điều gì cho developer chúng ta? Khi sử dụng SwiftUI, **some** thường được sử dụng để khai váo view body như sau
```swift
struct ContentView: View {
    var body: some View {
        Text("Hello, world!")
    }
}
```
- View **protocol** được sử dụng để định danh mô tả của view trong **SwiftUI** và để cho phép xác định loại type nào sẽ được sử dụng trong propertie body - thuộc tính được yêu cầu định nghĩa đang sử dụng type Body.
- Trước Swift 5.1, nếu chúng ta cố sử dụng các protocol(không có keyword some) sẽ  dẫn đến lỗi là "View can only used as a generic constain". Để giải quyết vấn đề này chúng ta sẽ phải chỉ định type cụ thể phù hợp với View như là:
```swift
struct ContentView: View {
    var body: Text {
        Text("Hello, world!")
    }
}
```
- Một lựa chọn khác sẽ là sử dụng [type erasure](https://www.swiftbysundell.com/posts/different-flavors-of-type-erasure-in-swift). Điều này yêu cầu **View** được implement đóng gói trong **type-erased** AnyView trước khi được return:
```swift
struct ContentView: View {
    var body: AnyView {
        AnyView(Text("Hello, world!"))
    }
}
```
- Từ phiên bản **swift 5.1** bằng cách sử dụng keyword **some**, chúng ta có thể thoải mái trả về bất kì giá trị nào phù hợp với protocol chỉ định(**như** View trong sample SwiftUI) và bất kì đoạn code nào trong implementation của chúng ta có thể sử dụng tất cả thuộc tính và method từ protocol đó khi làm việc với value được return mà không yêu cầu chúng ta đóng gói **wrapper-type** như là **AnyView**.

### 2 / Bỏ qua keyword return:
- Đặc điểm này có lẽ không được chú ý như keyword **some** nhưng nó đem lại một sự cải thiện tốt về sự nhất quán khi keyword return được bỏ qua cho các function trả về đơn giản.
- Swift Evolution [SE-0225] cho phép function và computed properties hoạt động chung cách thức với closure trong trường hợp chi có một hoạt động với chúng. Sử dụng using keyword không còn được yêu cầu nữa làm cho 2 implement dưới đây hoạt động giống nhau:
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
- Sẽ mất chút ít thời gian để chúng ta có thể làm quan nhưng nó giúp chúng ta tạo ta các single-expression với function và computed properties gọn nhẹ hơn:
```swift
func makeProfileViewController(for user: User) -> UIViewController {
    ProfileViewController(
        logicController: ProfileLogicController(
            user: user,
            networking: networking
        )
    )
}
```

### 3/ Xây dựng các function:
- Với cả keyword **some** và bỏ qua keyword **return**, chúng ta bây giờ đã có câu trả lời về cách API khai báo SwiftUI(View), nhưng chúng ta vẫn chưa nắm rõ cách các view được nhóm lại với nhau mà không có các keyword sort hay syntax thêm vào như sau:
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
- Thiếu Function builder, chúng ta phải làm thủ công tạo tác builder để khởi tạo các instance trong container như VSStack:
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
- Vậy function builder hoạt động thế nào? Với cách thêm thuộc tính @functionBuilder trong phiên bản Xcode11 beta hiện tại. Để ví dụ chúng ta cùng xem cách diễn giải của ViewBuilder trong SwiftUI:
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

- Lưu ý là mốt block cần được xử lý rõ ràng bởi builder trên. Nếu như nó không phải chỉ là một vài case, **ViewBuilder** có thể sử dụng variadic parameter để xử lý closure như sau:
```swift
@functionBuilder
struct ViewBuilder {
    func buildBlock(_ views: View...) -> CombinedView {
        return CombinedView(views: views)
    }
}
```
- Với **ViewBuilder** bên trên thì trình biên dịch sẽ tổng hợp thuộc tính khớp với **@ViewBuilder** để chúng ta có thể sử dụng để đánh dấu các tham số trong closure mà chúng ta muốn sử dụng trong builder mới như:
```swift
struct VStack<Content: View>: View {
    init(@ViewBuilder builder: () -> Content) {
        // A function builder closure can be called just like
        // any other, and the resulting expression can then be
        // used to, for instance, construct a container view.
        let content = builder()
        ...
    }
}
```
- Function builder type + closure được đánh dấu để developer có thể sử dụng nhẹ nhàng, đây cũng là điều Apple hướng tới cho việc phát triển SwiftUI:
```swift
VStack {
    Image(uiImage: image)
    Text(title)
    Text(subtitle)
}
```
### 4/ Property wrapper:
- Điều cuối cùng trong những tính năng mới trong SwiftUI 5.1 là **property wrapper**. Nó cho phép các value của property được tự động wrapper bởi các type cụ thể. SwiftUI sử cụng property wrapper để dễ dãng hơn trong việc định danh các loại bindable properties. Như trường hợp để định danh các thuộc tính được quản lý bởi view state, @State- thuộc tính này có thể được sử dụng để wrap tự động các giá trị của property trong các instance của bindable State:
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