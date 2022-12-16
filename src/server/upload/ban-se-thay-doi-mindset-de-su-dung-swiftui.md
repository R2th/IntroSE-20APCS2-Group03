Thời gian vừa rồi có lẽ chúng ta đều thấy cộng đồng các thành viên lập trình iOS đang chuyển dần sang sử dụng SwiftUI. Nhưng có lẽ tôi chắc chắn rằng cách tốt nhất để viết SwiftUI một cách hiệu quả đó là bạn hãy quên mọi thứ về UIKit đi và thay đổi hoàn toàn suy nghĩ của bạn về phát triển giao diện người dùng.

Vậy điều đó có nghĩa là chúng ta buộc phải hiểu sự khác biệt giữa UIKit và SwiftUI để quyết định nên hay không nên tiếp tục.

### 1. Sự khác biệt 

- **UIKit** là một framework hướng sự kiện để xây dựng giao diện người dùng cho nền tảng iOS. Điều đó có nghĩa là bạn phải xử lý tất cả các thay đổi trạng thái trong các sự kiện như view được load, nhấn vào button, ... Nhược điểm lớn của phương pháp này là sự phức tạp của việc giữ đồng bộ giao diện người dùng với trạng thái của nó. Ngay khi trạng thái thay đổi, bạn cần **thêm / xóa / hiển thị / ẩn** thủ công các view và giữ nó đồng bộ với trạng thái hiện tại.

- **SwiftUI** là một framework dạng khai báo để xây dựng giao diện người dùng trên nền tảng của Apple. Từ khóa ở đây là khai báo (declare). Declare ở đây có nghĩa là bạn cần khai báo những gì bạn muốn có được và khuôn khổ sẽ tự quản lý nó. Framework biết cách tốt nhất để hiển thị giao diện người dùng.

>  **UI = f(state)**

- Giao diện người dùng trong **SwiftUI** là một chức năng của trạng thái của nó. Nó có nghĩa là bất cứ khi nào trạng thái xem thay đổi, nó sẽ tính toán lại thuộc tính trong view của nó và tạo ra một view mới. Hãy cùng xem một đoạn code nhanh dưới đây:

```
struct ContentView: View {
    @ObservedObject var store: Store

    var body: some View {
        Group {
            if store.isLoading {
                Text("Loading...")
                    .font(.subheadline)
            } else {
                Image("photo")
                    .font(.largeTitle)
            }
        }
    }
}
```
- Như bạn có thể thấy trong ví dụ trên, chúng ta có view hiển thị loading text và hình ảnh khi quá trình loading kết thúc. ObserverObject ở đây là trạng thái của chế độ xem này và ngay khi thay đổi, SwiftUI sẽ tính toán lại thuộc tính cơ thể và gán một chế độ xem mới. 
- Trong quá trình phát triển UIKit điển hình, chúng ta cần ẩn / hiển thị các thành phần của hệ thống phân cấp chế độ xem theo cách thủ công, nhưng trong SwiftUI, chúng ta không cần phải thêm / xóa như cách thủ công đã làm. Chúng ta có một vài cách để mô tả trạng thái của view trong SwiftUI, để tìm hiểu thêm về chúng bạn hãy tham khảo [Understanding Property Wrappers in SwiftUI](https://swiftwithmajid.com/2019/06/12/understanding-property-wrappers-in-swiftui/)

- Bạn hãy có cái nhìn sâu sắc hơn về những gì xảy ra khi view thay đổi. SwiftUI có snapshot về hệ thống phân cấp các view hiện tại và ngay khi trạng thái thay đổi, nó sẽ tính toán một view mới.
- Cuối cùng, SwiftUI áp dụng các thuật toán khác nhau để hiểu sự khác biệt và tự động thêm / xóa / cập nhật các view cần thiết. Theo mặc định, SwiftUI sử dụng chuyển đổi fade in/out chuẩn để hiển thị / ẩn view, nhưng bạn có thể thay đổi thủ công chuyển đổi sang bất kỳ animation nào bạn muốn. Để tìm hiểu thêm về các hiệu ứng chuyển scenes và animation trong SwiftUI hãy tham khảo [Animations in SwiftUI](https://swiftwithmajid.com/2019/06/26/animations-in-swiftui/)

### 2. View hierarchy

- Bây giờ hãy nói về hệ thống phân cấp của view và cách **SwiftUI** thực sự hiển thị cấu trúc view của bạn. Điều đầu tiên mà tôi muốn đề cập đến là SwiftUI không thể hiển thị cấu trúc view của bạn bằng cách thực hiện ánh xạ một-một. Bạn có thể sử dụng nhiều view như bạn muốn, nhưng cuối cùng, SwiftUI chỉ hiển thị các khung nhìn có ý nghĩa. 
- Điều đó có nghĩa là bạn có thể trích xuất các view logic thành các view nhỏ, sau đó sử dụng lại chúng trên ứng dụng. Đừng lo lắng về hiệu suất, trong trường hợp này, không hề bị ảnh hưởng. Để tìm hiểu thêm về view thành phần trong SwiftUI  [View](https://swiftwithmajid.com/2019/10/30/view-composition-in-swiftui/)

- Cách tốt nhất để hiểu hệ thống phân cấp view phức tạp trong SwiftUI là in loại của nó. SwiftUI sử dụng hệ thống loại tĩnh của Swift để tạo ra sự khác biệt rất nhanh. Trước hết, nó kiểm tra kiểu của view, và sau đó kiểm tra giá trị của các thành phần của view. Nó rất hữu ích trong quá trình tìm hiểu.

```
print(Mirror(reflecting: ContentView(store: .init()).body))
// Group<_ConditionalContent<Text, ModifiedContent<Image, _EnvironmentKeyWritingModifier<Optional<Font>>>>>
```

### Lời bình
Bằng cách sử dụng Mirror struct, chúng ta có thể print kiểu thực tế của phần thân ContentView và tìm hiểu cách SwiftUI hoạt động như thế nào.

Bài viết được tham khảo từ [You have to change mindset to use SwiftUI](https://swiftwithmajid.com/2019/11/19/you-have-to-change-mindset-to-use-swiftui/)