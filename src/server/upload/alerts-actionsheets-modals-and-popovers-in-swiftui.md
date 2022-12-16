Tuần này chúng ta sẽ  tiếp tục tìm hiểu chủ đề với Modals, Alerts, ActionSheets và Popovers. SwiftUI có một sửa đổi chuyên dụng để show lên những thuộc tính này. Chúng ta hãy xem cách chúng ta có thể sử dụng các công cụ sửa đổi để hiển thị Modals, Alerts, ActionSheets và Popovers.

### Alerts and ActionSheets
Cả Alerts và ActionSheets đều sử dụng hai cách tương tự để trình bày nó cho người dùng. Hãy bắt đầu với một cách đơn giản hơn. Chúng ta mô tả một ràng buộc Boolean có thể được observed bởi SwiftUI và ngay khi Bool là true, SwiftUI sẽ present ActionSheet hoặc Alert.

```
struct MasterView: View {
    @State private var showActionSheet = false

    var body: some View {
        VStack {
            Button("Show action sheet") {
                self.showActionSheet = true
            }
        }.actionSheet(isPresented: $showActionSheet) {
            ActionSheet(
                title: Text("Actions"),
                message: Text("Available actions"),
                buttons: [
                    .cancel { print(self.showActionSheet) },
                    .default(Text("Action")),
                    .destructive(Text("Delete"))
                ]
            )
        }
    }
}
```

<br>


Như bạn có thể thấy trong ví dụ trên để trình bày một action sheet, chúng ta sử dụng công cụ actionSheet được liên kết với một giá trị Bool và một closure tạo ra một action sheet. Ngoài ra, để hiển thị alert, chúng ta cần sử dụng công cụ alert modifier thay thế.

Sự thật thú vị ở đây là SwiftUI đặt lại ràng buộc về giá trị ban đầu sau khi loại bỏ Alert hoặc ActionSheet. Để tìm hiểu thêm về Property Wrappers có sẵn trong SwiftUI, hãy xem qua Tìm hiểu về [“Understanding Property Wrappers in SwiftUI” ](https://mecid.github.io/2019/06/12/understanding-property-wrappers-in-swiftui/).

<br>

Đó là một cách tiếp cận đơn giản để present Alerts hoặc ActionSheets. Nhưng đôi khi điều đó là không đủ, bởi vì chúng tôi cần một số dữ liệu để hiển thị trong Alert hoặc ActionSheet. Trong trường hợp này, chúng tôi có một overload khác của alert và actionSheet, sử dụng Optional Identifiable binding thay vì ràng buộc Boolean.

```
struct Message: Identifiable {
    let id = UUID()
    let text: String
}

struct MasterView: View {
    @State private var message: Message? = nil

    var body: some View {
        VStack {
            Button("Show alert") {
                self.message = Message(text: "Hi!")
            }
        }.alert(item: $message) { message in
            Alert(
                title: Text(message.text),
                dismissButton: .cancel()
            )
        }
    }
}
```

Ngay khi message  không phải là nil, SwiftUI gọi closure với messagen làm tham số. Bạn có thể tạo Alert của mình dựa trên dữ liệu được chuyển vào closure.
<br>

### Modals

Để present modals, SwiftUI cung cấp công cụ sửa đổi view đặc biệt được gọi là sheet. Sheet modifier rất giống với Alert và actionSheet, nó sử dụng ràng buộc Boolean hoặc Optional Identifiable để hiểu khi nào nên trình bày một phương thức. Nó cũng cần một closure trả về một view nội dung cho một phương thức. Bên cạnh đó, sheet modifier có tham số optional onDismiss tùy chọn, SwiftUI gọi closure này sau khi loại bỏ phương thức. Giống như với alert, SwiftUI sẽ đặt lại ràng buộc về giá trị ban đầu sau khi loại bỏ phương thức.

```
import SwiftUI
import Combine

struct MasterView: View {
    @State private var showModal = false

    var body: some View {
        VStack {
            Button("Show modal") {
                self.showModal = true
            }
        }.sheet(isPresented: $showModal, onDismiss: {
            print(self.showModal)
        }) {
            ModalView(message: "This is Modal view")
        }
    }
}

struct ModalView: View {
    @Environment(\.presentationMode) var presentation
    let message: String

    var body: some View {
        VStack {
            Text(message)
            Button("Dismiss") {
                self.presentation.value.dismiss()
            }
        }
    }
}
```

<br>
PresentMode là một Môi trường ràng buộc với PresentationMode của view. Chúng ta có thể sử dụng nó để dismiss Modal.

### Popovers

Sử dụng Popovers trong SwiftUI rất giống với Alers và ActionSheets. Popover modifier cũng có hai tình trạng overloads cho Boolean  và Optional Identifiable binding. Một tham số bổ sung khác trong công cụ sửa đổi popover là arrowEdge, bằng cách cung cấp giá trị Edge, bạn có thể vẽ một mũi tên theo hướng được chỉ định. Dưới đây là ví dụ về việc sử dụng công cụ sửa đổi Popover.


```
struct MasterView: View {
    @State private var showPopover: Bool = false

    var body: some View {
        VStack {
            Button("Show popover") {
                self.showPopover = true
            }.popover(
                isPresented: self.$showPopover,
                arrowEdge: .bottom
            ) { Text("Popover") }
        }
    }
}
```

### Conclusion

Như bạn có thể thấy, SwiftUI cung cấp một cách khá dễ dàng để trình bày các chế độ view liên quan đến ngữ cảnh như Alerts, ActionSheets, Modals và Popovers bằng cách sử dụng các liên kết.

Bài viết được dịch theo [bài viết cùng tên của tác giả Majid](https://mecid.github.io/2019/07/24/alerts-actionsheets-modals-and-popovers-in-swiftui/)