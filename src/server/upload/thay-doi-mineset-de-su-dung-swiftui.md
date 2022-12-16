Trong bài này mình sẽ chỉ ra các điểm khác nhau giữa UIKit và SwiftUI, và để học SwiftUI thì cách tốt nhất là bạn phải thay đổi Mindset về phát triển UI và UIKit. 

### Sự khác biệt

UIKit là một imperative event-driven framwork để xây dựng UI cho iOS. Điều đó có nghĩa là bạn phải xử lý tất cả các thay đổi trạng thái trong các sự kiện như view được tải, nhấn nút, v.v ... Nhược điểm lớn của phương pháp này là sự phức tạp của việc giữ đồng bộ giữa UI với trạng thái của nó. Ngay khi trạng thái thay đổi, bạn cần thêm / xóa / hiển thị / ẩn thủ công các views và giữ nó đồng bộ với trạng thái hiện tại.
SwiftUI là một declarative framework  để xây dựng UI trên nền tảng của Apple. Từ khóa ở đây là *declarative*. *Declarative* có nghĩa là bạn cần khai báo những gì bạn muốn đạt được, và framework sẽ thực hiện nó. Framework sẽ biết cách tốt nhất để render UI sao cho tối ưu nhất.

```
UI = f(state)
```

UI trong SwiftUI là một chức năng của trạng thái của nó. Điều đó có nghĩa là bất cứ khi nào trạng thái của view thay đổi, nó sẽ tính toán lại thuộc tính của nó và tạo ra một view mới. Hãy cùng xem ví dụ dưới:

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

Như bạn có thể thấy trong ví dụ trên, chúng ta có view hiển thị text khi đang tải dữ liệu và hiển thị hình ảnh khi quá trình tải kết thúc. ObserverObject ở đây là trạng thái của view này và ngay khi thay đổi, SwiftUI sẽ tính toán lại thuộc tính của view đó và gán một view mới. Với UIKit thì chúng ta cần ẩn / hiển thị các thành phần của  view hierarchy xem theo cách thủ công, nhưng trong SwiftUI, chúng ta không cần phải thêm / xóa các loading indicator. 
Hãy đi sâu hơn về những gì xảy ra khi trạng thái của view thay đổi. SwiftUI sẽ snapshot view hierarchy hiện tại và ngay khi trạng thái thay đổi, nó sẽ tính toán một view. Cuối cùng, SwiftUI áp dụng các thuật toán khác nhau để hiểu sự khác biệt và tự động thêm / xóa / cập nhật các view cần thay đổi. Mặc định thì SwiftUI sử dụng animation  fade in/out để hiển thị / ẩn view, nhưng bạn có thể  tự thay đổi thủ công chuyển đổi sang bất kỳ animation nào bạn muốn. 

### View hierarchy

Bây giờ hãy nói về view hierarchy và cách SwiftUI thực sự render view của bạn. Điều đầu tiên mà mình muốn đề cập đến là SwiftUI không thể render view của bạn bằng cách thực hiện ánh xạ một-một. Bạn có thể sử dụng nhiều view container như bạn muốn, nhưng cuối cùng, SwiftUI chỉ hiển thị các view có ý nghĩa. Điều đó có nghĩa là bạn có thể tách các view logic thành các view nhỏ, sau đó sử dụng lại chúng trên toàn project. Hiệu suất trong trường hợp này sẽ không bị ảnh hưởng.
Cách tốt nhất để hiểu môt view hierarchies phức tạp trong SwiftUI là print ra loại của nó. SwiftUI sử dụng hệ thống loại tĩnh của Swift để tạo ra sự khác biệt rất nhanh. Trước hết, nó kiểm tra kiểu của view và sau đó kiểm tra giá trị của các thành phần trong view. 

```
print(Mirror(reflecting: ContentView(store: .init()).body))
// Group<_ConditionalContent<Text, ModifiedContent<Image, _EnvironmentKeyWritingModifier<Optional<Font>>>>>
```

Bằng cách sử dụng Mirror struct, chúng ta có thể in kiểu của phần thân trong ContentView và tìm hiểu cách SwiftUI hoạt động.

### Kết luận
Trong bài này, chúng ta đã tìm hiểu sự khác biệt chính giữa UIKit và SwiftUI và đã xem xét về sự khác biệt trong thuật toán của SwiftUI. Mình hy vọng bạn thích bài viết này Cảm ơn đã đọc, và hẹn gặp lại vào lần sau!

Tham khảo: https://swiftwithmajid.com/2019/11/19/you-have-to-change-mindset-to-use-swiftui/?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter