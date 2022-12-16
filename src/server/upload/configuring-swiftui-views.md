Một trong những key ways mà SwiftUI khác biệt so với các UI frameworks trước đó của Apple là cách tạo và cấu hình các views của nó. Trên thực tế, có thể lập luận rằng khi sử dụng SwiftUI, chúng ta thực sự không bao giờ tạo ra bất kỳ views nào - thay vào đó chúng ta chỉ mô tả đơn giản những gì chúng ta muốn, và sau đó hệ thống sẽ xử lý rendering thực tế.
Trong bài viết này, chúng ta hãy xem xét một vài kỹ thuật khác nhau để cấu trúc view description và ưu và nhược điểm của mỗi cách tiếp cận đó mang lại cho chúng ta về cấu trúc code và tính linh hoạt.
## Initializers, modifiers and inheritance
Nhìn chung, có ba cách khác nhau để configure view SwiftUI - bằng cách truyền các đối số cho trình khởi tạo của nó, sử dụng các modifier và thông qua môi trường xung quanh. Ví dụ: ở đây, chúng tôi định cấu hình `Text` view hoạt động như `body` của `TitleView` - sử dụng cả trình khởi tạo của nó và áp dụng modifiers cho nó để thay đổi font chữ và màu text của nó:
```
struct TitleView: View {
    var title: String

    var body: some View {
        Text(title)
            .font(.headline)
            .italic()
            .foregroundColor(.blue)
    }
}
```
Trên đây là một ví dụ về cấu hình trực tiếp, vì chúng tôi thiết lập và sửa đổi Text view của chúng tôi bằng cách gọi trực tiếp các phương thức trên nó. Tuy nhiên, SwiftUI cũng hỗ trợ cấu hình gián tiếp, vì nhiều thuộc tính và modifier khác nhau được tự động truyền xuống qua từng view hierarchy đã cho. 
Loại cấu hình được kế thừa trong cách gián tiếp có thể cực kỳ hữu ích trong các tình huống khi chúng ta muốn nhiều sibling views sử dụng cùng một loại cấu hình hoặc style - như trong trường hợp sau, trong đó chúng ta cấu hình cả `Text` và `List` để hiển thị tất cả văn bản sử dụng monospaced font, đơn giản bằng cách gán font chữ đó cho parent VStack của nó:
```
struct ListView: View {
    var title: String
    var items: [Item]
    @Binding var selectedItem: Item?

    var body: some View {
        VStack {
            Text(title).bold()
            List(items, selection: $selectedItem) { item in
                Text(item.title)
            }
        }.font(.system(.body, design: .monospaced))
    }
```
Chúng ta hãy xem một ví dụ khác, trong đó chúng ta thay đổi accentColor của navigation stack chỉ bằng cách gán nó cho `NavigationView` gốc của chúng ta - điều này sẽ khiến màu đó được áp dụng cho tất cả các views con, bao gồm cả các views được quản lý bởi hệ thống, như navigation bar items mà chúng ta đã xác định:
```
struct ContactListView: View {
    @ObservedObject var contacts: ContactList

    var body: some View {
        NavigationView {
            List(contacts) { contact in
                ...
            }
            .navigationBarItems(
                trailing: Button(
                    action: { ... },
                    label: {
                        // This image will be colored purple
                        Image(systemName: "person.badge.plus")
                    }
                )
            )
        }.accentColor(.purple)
    }
}
```
Tuy nhiên, đôi khi chúng ta có thể muốn áp dụng một tập hợp các style cho một nhóm các views mà không phải thay đổi mối quan hệ của chúng với parent view. Ví dụ: Giả sử chúng ta đang xây dựng view  để hiển thị địa chỉ trong một ứng dụng, bao gồm một loạt các stacked `Text` views:
```
struct AddressView: View {
    var address: Address

    var body: some View {
        VStack(alignment: .leading) {
            Text(address.recipient)
                .font(.headline)
                .padding(3)
                .background(Color.secondary)
            Text(address.street)
                .font(.headline)
                .padding(3)
                .background(Color.secondary)
            HStack {
                Text(address.postCode)
                Text(address.city)
            }
            Text(address.country)
        }
    }
}
```
Ở trên, chúng ta chỉ định style giống với 2 label đầu tiên, vì vậy, chúng ta phải refactor code đó để tránh phải lặp lại. Trong trường hợp này, chúng ta không thể áp dụng các modifiers cho label của parent view, vì chúng ta chỉ có thể áp dụng các style đã cho cho một tập hợp con của nó.
Rất may, SwiftUI cũng cung cấp loại group, cho phép chúng ta coi một tập hợp các views là một group - mà không ảnh hưởng đến layout, drawing hoặc vị trí của chúng trong view hierarchy tổng thể của chúng ta. Sử dụng loại này, chúng ta có thể nhóm hai label của chúng ta lại với nhau và sau đó áp dụng modifier của chúng ta cho cả hai label cùng một lúc:
```
struct AddressView: View {
    var address: Address

    var body: some View {
        VStack(alignment: .leading) {
            Group {
                Text(address.recipient)
                Text(address.street)
            }
            .font(.headline)
            .padding(3)
            .background(Color.secondary)
            ...
        }
    }
}
```
Sức mạnh của `Group` là nó áp dụng các modifier trực tiếp cho con của nó, chứ không phải cho chính nó. So sánh điều đó với việc nếu chúng ta sẽ nhóm các label của chúng ta bằng cách sử dụng một `VStack` khác, điều này sẽ giúp cho padding và background color được áp dụng cho stack đó, thay vì riêng lẻ cho các label của chúng ta.
## Views versus extensions
Khi các views dựa trên SwiftUI của chúng ta phát triển phức tạp, chúng ta có thể cần phải bắt đầu sử dụng nhiều cách để nhóm và chia sẻ các cấu hình và style khác nhau, để giữ cho code chúng ta dễ dàng hoạt động. Cho đến nay, chúng ta chủ yếu xử lý style thông qua các modifier, nhưng một phần chính trong cấu hình UI của chúng ta cũng liên quan đến cách chúng ta tự cấu trúc các views của mình.
Giả sử rằng chúng ta làm việc trên một form cho phép user đăng ký tài khoản trong một ứng dụng. Để làm cho form của chúng ta trông đẹp hơn một chút, chúng ta đã thêm tiền tố vào từng textfield bằng các icon từ Apple’s SF Symbols library - cho chúng ta cách triển khai như sau:
```
struct SignUpForm: View {
    ...
    @State private var username = ""
    @State private var email = ""

    var body: some View {
        Form {
            Text("Sign up").font(.headline)
            HStack {
                Image(systemName: "person.circle.fill")
                TextField("Username", text: $username)
            }
            HStack {
                Image(systemName: "envelope.circle.fill")
                TextField("Email", text: $email)
            }
            Button(
                action: { ... },
                label: { Text("Continue") }
            )
        }
    }
}
```
Ở trên chúng tôi đang sử dụng cùng một kết hợp `HStack` + `Image` + `TextField` hai lần và trong khi đó không nhất thiết là vấn đề do chúng ta định cấu hình hai text fields hoàn toàn khác nhau - giả sử rằng chúng ta cũng muốn biến sự kết hợp đó thành một thành phần độc lập mà chúng ta có thể sử dụng lại ở những nơi khác trong ứng dụng của mình.
Một ý tưởng ban đầu về cách thực hiện điều đó có thể là tạo một kiểu `View` mới với icon name và title để hiển thị, cũng như `@Binding` reference đến text property mà chúng ta muốn cập nhật bất cứ khi nào text field được chỉnh sửa - như sau:
```
struct IconPrefixedTextField: View {
    var iconName: String
    var title: String
    @Binding var text: String

    var body: some View {
        HStack {
            Image(systemName: iconName)
            TextField(title, text: $text)
        }
    }
}
```
Với những điều đã có ở trên, giờ đây chúng ta có thể quay lại `SignUpForm` và thay thế các cấu hình `HStack` được sao chép trước đó bằng các instances của component `IconPrefixedTextField` mới của chúng ta:
```
struct SignUpForm: View {
    ...

    var body: some View {
        Form {
            ...
            IconPrefixedTextField(
                iconName: "person.circle.fill",
                title: "Username",
                text: $username
            )
            IconPrefixedTextField(
                iconName: "envelope.circle.fill",
                title: "Email",
                text: $email
            )
            ...
        }
    }
}
```
Tuy nhiên, trong khi thay đổi ở trên sẽ cho phép chúng ta sử dụng lại loại `IconPrefixedTextField` mới của mình bên ngoài `SignUpForm`, thì liệu nó có thực sự cải thiện code của chúng ta hay không. Rốt cuộc, chúng ta không thực sự làm cho việc implement sign up form của chúng tôi ta trở nên đơn giản hơn - thực tế, call site ở trên của chúng ta có vẻ phức tạp hơn những gì nó đã làm trước đây.
Thay vào đó, lấy một số cảm hứng từ API design của SwiftUI, và xem mọi thứ sẽ như thế nào nếu chúng ta triển khai code text view configuration dưới dạng `View` extension. Theo cách đó, bất kỳ view nào cũng có thể được thêm tiền tố vào một icon, chỉ cần gọi phương thức sau:
```
extension View {
    func prefixedWithIcon(named name: String) -> some View {
        HStack {
            Image(systemName: name)
            self
        }
    }
}
```
Với code ở trên, giờ đây chúng ta có thể trực tiếp thêm bất kỳ SF Symbols icon nào vào `TextField` view của SwiftUI - hoặc vào bất kỳ view nào khác - như thế này:
```
struct SignUpForm: View {
    ...

    var body: some View {
        Form {
            ...
            TextField("Username", text: $username)
                .prefixedWithIcon(named: "person.circle.fill")
            TextField("Email", text: $email)
                .prefixedWithIcon(named: "envelope.circle.fill")
            ...
        }
    }
}
```
## Modifier types
Ngoài việc viết các view extension, SwiftUI còn cho phép chúng ta xác định các custom view modifier là các loại tuân theo `ViewModifier` protocol. Làm như vậy cho phép chúng ta viết các modifier có thuộc tính, trạng thái và vòng đời riêng - có thể được sử dụng để mở rộng SwiftUI với tất cả các loại chức năng mới.
Ví dụ: Giả sử chúng ta muốn thêm inline validation vào sign up form của mình từ trước đó, bằng cách chuyển từng text field’s border thành màu xanh lá cây khi người dùng nhập một chuỗi hợp lệ. Chúng ta có thể trực tiếp implement trong `SignUpForm` view, nhưng thay vào đó, hãy xây dựng tính năng đó như một `ViewModifier` hoàn toàn có thể sử dụng lại:
```
struct Validation<Value>: ViewModifier {
    var value: Value
    var validator: (Value) -> Bool

    func body(content: Content) -> some View {
        // Here we use Group to perform type erasure, to give our
        // method a single return type, as applying the 'border'
        // modifier causes a different type to be returned:
        Group {
            if validator(value) {
                content.border(Color.green)
            } else {
                content
            }
        }
    }
}
```
Nhìn vào cách thực hiện ở trên, chúng ta có thể thấy rằng `ViewModifier` trông rất giống với một view, trong đó nó có phần `body` trả về một số `View`. Sự khác biệt là modifier hoạt động trên view hiện có (được truyền dưới dạng `content`), thay vì hoàn toàn độc lập. Lợi ích là bây giờ chúng ta có thể thêm chức năng xác thực mới của mình vào bất kỳ text field nào (hoặc bất kỳ view nào), giống như khi sử dụng `view` extension, mà không yêu cầu chúng tôi xây dựng bất kỳ dạng wrapper nào:
```
TextField("Username", text: $username)
    .modifier(Validation(value: username) { name in
        name.count > 4
    })
    .prefixedWithIcon(named: "person.circle.fill")
```
## Conclusion
SwiftUI cung cấp một số cách để chúng ta cấu trúc mã UI và cách để chúng ta configure cho các view khác nhau. Mặc dù nhiều thành phần custom của chúng ta có thể sẽ được triển khai dưới dạng các kiểu `View` độc lập, việc xây dựng các extension và 
modifier của riêng chúng ta có thể cho phép chúng ta chia sẻ các style và cấu hình trên code base theo cách nhẹ hơn nhiều - và có thể cho phép chúng ta áp dụng các kiểu đó cấu hình cho nhiều loại view khác. 

Hy vọng bài viết sẽ có ích với các bạn.

Preference: https://www.swiftbysundell.com/articles/configuring-swiftui-views/