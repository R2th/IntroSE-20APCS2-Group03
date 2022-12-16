Thông thường khi ta xử lý các tương tác với các SwiftUI view, chúng ta thường sử dụng các closure để xác định các actions mà chúng ta muốn thực hiện khi các sự kiện khác nhau xảy ra. Ví dụ: `AddItemView` sau có hai thành phần tương tác là TextField và Button, cả hai đều cho phép người dùng thêm `Item` mới vào ứng dụng:
```
struct AddItemView: View {
    var handler: (Item) -> Void
    @State private var title = ""

    var body: some View {
        HStack {
            TextField("Add item",
                text: $title,
                onCommit: {
                    guard !title.isEmpty else {
    return
}

let item = Item(title: title)
handler(item)
title = ""
                }
            )
            Button("Add") {
                let item = Item(title: title)
handler(item)
title = ""
            }
            .disabled(title.isEmpty)
        }
    }
}
```
Ngoài leading `guard` statement trong `onCommit` action của text field (việc này sẽ không cần thiết nếu chúng ta đang disable button khi text rỗng), hai closure của chúng ta hoàn toàn giống nhau, vì vậy sẽ khá tốt để loại bỏ nguồn trùng lặp code đó bằng cách di chuyển những action đó ra khỏi phần `body` trong view.
Một cách để làm điều đó là tạo các closures bằng cách sử dụng một computed property. Điều đó sẽ cho phép chúng ta xác định logic của mình một lần, và nếu chúng ta cũng bao gồm guard statement mà TextField của chúng ta cần, thì chúng ta có thể sử dụng triển khai closure giống hệt nhau cho cả hai UI controls cuar chúng ta:
```
private extension AddItemView {
    var addAction: () -> Void {
        return {
            guard !title.isEmpty else {
                return
            }

            let item = Item(title: title)
            handler(item)
            title = ""
        }
    }
}
```
Với những điều trên, giờ đây chúng ta có thể chỉ cần chuyển property `addAction` mới của mình cho cả hai subviews và chúng ta đã loại bỏ thành công việc trùng lặp code của mình và việc implement body của view giờ đây cũng nhỏ gọn hơn nhiều:
```
struct AddItemView: View {
    var handler: (Item) -> Void
    @State private var title = ""

    var body: some View {
        HStack {
            TextField("Add item",
                text: $title,
                onCommit: addAction
            )
            Button("Add", action: addAction)
                .disabled(title.isEmpty)
        }
    }
}
```
Mặc dù ở trên là một giải pháp hoàn toàn tốt, nhưng cũng có một tùy chọn khác, ban đầu có thể không rõ ràng trong context của SwiftUI, và đó là sử dụng kỹ thuật tương tự như khi sử dụng UIKit’s target/action pattern - bằng cách xác định action handler của chúng ta như một method, chứ không phải là một closure.
Để làm điều đó, trước tiên chúng ta hãy cấu trúc lại property `addAction` của chúng ta từ trước đó thành một method `addItem` giống như sau:
```
private extension AddItemView {
    func addItem() {
        guard !title.isEmpty else {
            return
        }

        let item = Item(title: title)
        handler(item)
        title = ""
    }
}
```
Sau đó, giống như cách trước đây chúng ta đã chuyển property `addAction` của mình cho cả `TextField` và `Button` của chúng ta, giờ đây chúng ta có thể thực hiện điều tương tự với method `addItem` của mình - phương thức này cung cấp cho chúng ta cách triển khai sau:
```
struct AddItemView: View {
    var handler: (Item) -> Void
    @State private var title = ""

    var body: some View {
        HStack {
            TextField("Add item",
                text: $title,
                onCommit: addItem
            )
            Button("Add", action: addItem)
                .disabled(title.isEmpty)
        }
    }
}
```
Khi làm việc với SwiftUI, chúng ta rất hay rơi vào bẫy khi nghĩ rằng view's layout, các subviews và actions của một view nhất định đều cần được xác định trong `body` của nó, mà - nếu chúng ta nghĩ về nó - chính xác là kiểu tiếp cận thường thấy. dẫn đến view controllerlớn khi làm việc với UIKit.
Tuy nhiên, nhờ thiết kế có khả năng tổng hợp cao của SwiftUI, việc chia body của view thành các phần riêng biệt thường khá dễ dàng, thậm chí có thể không yêu cầu tạo bất kỳ loại `View` mới nào. Đôi khi tất cả những gì chúng ta phải làm là trích xuất một số logic của chúng ta thành một method riêng biệt và chúng ta sẽ tạo ra một đoạn mã thanh lịch hơn nhiều, dễ đọc và dễ bảo trì hơn.

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/tips/passing-methods-as-swiftui-view-actions/