**SwiftUI** cung cấp một cách khai báo để thực hiện điều hướng (navigation) trong ứng dụng của bạn. Hôm nay chúng ta sẽ đề cập đến các navigation flows khác nhau có sẵn trong SwiftUI như **Master-Detail** và **Presenting Modals**.
<br>

### Master-Detail flow
Giả sử rằng bạn đang làm việc trên ứng dụng hiển thị danh sách một số mặt hàng và bạn muốn chuyển sang màn hình chi tiết ngay khi người dùng chọn bất kỳ item nào. Đối với loại navigation này, SwiftUI cung cấp các components  **NavigationView** và **NavigationLink**. Hãy để kiểm tra cách chúng ta có thể sử dụng chúng.

```
struct MasterView: View {
    private let messages = [
        "Hello", "How are you?"
    ]

    var body: some View {
        NavigationView {
            List(messages, id: \.self) { message in
                NavigationLink(destination: DetailsView(message: message)) {
                    Text(message)
                }
            }.navigationBarTitle("Messages")
        }
    }
}

struct DetailsView: View {
    let message: String

    var body: some View {
        VStack {
            Text(message)
                .font(.largeTitle)
        }
    }
}
```

Ở đây chúng ta có một danh sách các thông báo, để có thể điều hướng, chúng tôi đã nhúng Danh sách vào *NavigationView*, nó bổ sung *NavigationBar* tiêu chuẩn ở đầu Danh sách . Chúng ta cũng có thể đặt văn bản làm tiêu đề của *NavigationBar* bằng cách thêm công cụ sửa đổi *navigationBarTitle* vào danh sách. Đảm bảo rằng bạn thêm công cụ sửa đổi *navigationBarTitle* vào thành phần danh sách chứ không phải cho *NavigationView* vì nhiều views có thể chia sẻ cùng một *NavigationView* và mỗi chế độ xem có thể có một tiêu đề khác nhau.

**Hidden gem: Bạn có thể nhúng hai views vào *NavigationView* để đạt được Split trên iPadOS và MacOS**

Tiếp theo, chúng ta nhúng các hàng danh sách vào *NavigationLink*, trong khi tạo *NavigationLink*, chúng ta phải cung cấp view nhận. SwiftUI presents destination view khi người dùng nhấn vào hàng danh sách. Bằng cách gói hàng danh sách vào *NavigationLink*, SwiftUI thêm trailing arrow vào view cho biết có màn hình chi tiết bên cạnh view. Và đây là nơi sức mạnh thực sự của declarative programming xuất hiện. List row bắt đầu xuất hiện theo một cách khác chỉ bằng cách nhúng nó vào *NavigationLink*. Để tìm hiểu thêm về giao diện dựa trên môi trường trong SwiftUI, bạn có tham khảo bài viết [ **“Building forms with SwiftUI”**](https://mecid.github.io/2019/06/19/building-forms-with-swiftui/).

### Modals

Thay đổi navigation một chút. Thay vì hiển thị view khi còn là một nhánh trong hệ thống navigation hierarchy, tôi muốn trình bày nó như một modal sử dụng iOS 13 cart interface mới. Để thực hiện điều đó, tất cả những gì chúng ta cần làm là nhúng hàng Danh sách vào *PresentationLink* thay vì *NavigationLink*.

```
struct MasterView: View {
    private let messages = [
        "Hello", "How are you?"
    ]

    var body: some View {
        NavigationView {
            List(messages, id: \.self) { message in
                PresentationLink(destination: DetailsView(message: message)) {
                    Text(message)
                }
            }.navigationBarTitle("Messages")
        }
    }
}
```

<br>

Giờ đây, người dùng có được giao diện card tuyệt vời mà chúng tôi có trong iOS 13. Bạn có thể loại bỏ nó bằng cách vuốt xuống. Nhưng nếu bạn muốn thêm một nút loại bỏ phương thức thì sao? Để làm điều đó, chúng ta phải sử dụng *Environment Property Wrapper.*

```
struct DetailsView: View {
    @Environment(\.isPresented) var isPresented
    let message: String

    var body: some View {
        VStack {
            Text(message)
                .font(.largeTitle)
            Button("Close") {
                self.isPresented?.value = false
            }
        }
    }
}
```

<br>

**isPresented** là một Môi trường ràng buộc cho dù *self* là một phần của hierarchy phân cấp hiện đang được presented. Nói cách khác, SwiftUI sử dụng ràng buộc này để show/hide các views được trình bày. Bằng cách đặt giá trị của ràng buộc này thành false, SwiftUI loại bỏ modal. Để tìm hiểu thêm về *Property Wrappers* được cung cấp bởi các giá trị SwiftUI và Environment values, bạn có thể tìm hiểu thêm tại  [**“Understanding Property Wrappers in SwiftUI”**](https://mecid.github.io/2019/06/12/understanding-property-wrappers-in-swiftui/).

### Conclusion

Như bạn có thể thấy, không có manual calls để push present bất kỳ view nào. Tất cả những gì bạn cần làm là bao bọc view của bạn vào *NavigationLink* hoặc *PresentationLink* và ngay khi người dùng nhấn nó, SwiftUI sẽ chuyển nó đến đích tiếp theo.

Bài viết được dịch theo [bài viết cùng tên của tác giả Majid](https://mecid.github.io/2019/07/17/navigation-in-swiftui/)