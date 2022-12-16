Bài gốc: https://www.hackingwithswift.com/quick-start/swiftui

# 1.Tạo static labels bằng 1 Text

Text hiển thị static text trên màn hình và nó tương tự như UILabel của UIKit.Chúng đều nhìn cơ bản như sau:

``` swift
Text("Hello World")
```

Bên trong cửa sổ xem trước cho chế độ xem nội dung của bạn, bạn có thể thấy “Đã tạm dừng cập nhật bản xem trước tự động” - hãy tiếp tục và nhấn Resume  để Swift bắt đầu xây dựng mã của bạn và hiển thị cho bạn bản xem trước trực tiếp về giao diện của nó.

**Mẹo**: Bạn có thể nhấn Opt + Cmd + P để tiếp tục các bản xem trước này bất kỳ lúc nào.

Theo mặc định, Text bao gồm nhiều dòng tùy thích, nhưng nếu bạn muốn giới hạn số dòng mà chúng có thể sử dụng, bạn nên thêm công cụ sửa đổi **lineLimit**, như sau:
``` swift
Text("Hello World")
    .lineLimit(3)
```

Lưu ý lineLimit (3) được đặt bên dưới và bên phải của Text ("Hello World"). Điều này không bắt buộc, nhưng nó giúp mã của bạn dễ đọc hơn về lâu dài.

Nếu bạn đặt giới hạn dòng cho một số văn bản sau đó cung cấp cho nó một chuỗi quá dài để vừa với không gian có sẵn, SwiftUI sẽ cắt bớt văn bản để nó kết thúc bằng “...”.

Bạn có thể điều chỉnh cách SwiftUI cắt ngắn văn bản của mình: mặc định là xóa văn bản ở cuối và thay vào đó hiển thị dấu chấm lửng ở đó, nhưng bạn cũng có thể đặt dấu chấm lửng ở giữa hoặc đầu tùy thuộc vào mức độ quan trọng của các phần khác nhau trong chuỗi của bạn.

Ví dụ: Cắt ngắn văn bản của bạn ở giữa:

```swift
var body: some View {
    Text("This is an extremely long text string that will never fit even the widest of phones.")
        .lineLimit(1)
        .truncationMode(.middle)
}
```

Bất kể bạn cắt ngắn văn bản như thế nào, những gì bạn sẽ thấy là Text view văn bản của bạn nằm gọn gàng chính giữa trong Text view chính. Đây là hành vi mặc định của SwiftUI: trừ khi nó được yêu cầu định vị các khung nhìn ở một nơi khác, nó sẽ định vị chúng so với tâm màn hình.

# 2. Chỉnh sửa font, colors, line spacing và nhiều tùy chỉnh với style text

Text views văn bản không chỉ cung cấp cho chúng ta phạm vi kiểm soát rộng có thể dự đoán được về giao diện của chúng, chúng còn được thiết kế để hoạt động trơn tru cùng với các công nghệ cốt lõi của Apple như Dynamic Type.

Theo mặc định, Text view có kiểu "Body" Dynamic, nhưng bạn có thể chọn từ các kích thước và trọng lượng khác bằng cách gọi **.font ()** trên đó như sau:

```swift
Text("This is an extremely long text string that will never fit even the widest of phones")
    .font(.largeTitle)
```

Đặc biệt, bây giờ chúng ta có nhiều dòng, bạn sẽ muốn điều chỉnh căn chỉnh văn bản của chúng để các dòng được căn giữa, như sau:
```swift
Text("This is an extremely long text string that will never fit even the widest of Phones")
    .font(.largeTitle)
    .multilineTextAlignment(.center)
```
Chúng ta có thể chỉnh màu của chữ bằng định danh **.foregroundColor()**, như sau:
```swift
Text("The best laid plans")
    .foregroundColor(Color.red)
```

Bạn có thể cài màu nền, nhưng dùng **.background()** bởi vì có thể sử dụng nhiều nền nâng cao hơn là chỉ một màu phẳng. Dù sao, để cung cấp cho bố cục của chúng tôi màu nền vàng, chúng tôi sẽ thêm điều này:

```swift
Text("The best laid plans")
    .background(Color.yellow)
    .foregroundColor(.red)
```
Mẹo: Bạn có thể thắc mắc tại sao chúng tôi sử dụng **foregroundColor()** có màu trong tên, trong khi **background()** thì không. Điều này là do SwiftUI cho phép chúng ta tô màu lại văn bản theo cách chúng ta muốn, nhưng nó phải luôn là một màu đơn giản, trong khi bạn có thể đặt bất kỳ loại chế độ xem nào trong nền - một màu, vâng, nhưng cũng có thể là một hình dạng, một số văn bản khác, và hơn thế nữa.

Thậm chí còn có nhiều lựa chọn hơn. Ví dụ, chúng ta có thể điều chỉnh khoảng cách dòng trong văn bản của mình. Giá trị mặc định là 0, có nghĩa là không áp dụng thêm khoảng cách dòng, nhưng bạn cũng có thể chỉ định các giá trị vị trí để thêm khoảng cách giữa các dòng:
```swift
Text("This is an extremely long string that will never fit even the widest of phones")
    .font(.largeTitle)
    .lineSpacing(50)
```

# 3. Định dạng văn bản bên trong Text views
Text views của SwiftUI có tham số **formatter** tùy chọn cho phép chúng tôi tùy chỉnh cách dữ liệu được trình bày bên trong nhãn. Điều này rất quan trọng vì các giá trị thường được cập nhật cho chúng tôi khi có điều gì đó xảy ra trong chương trình của chúng tôi, vì vậy bằng cách đính kèm SwiftUI định dạng có thể đảm bảo dữ liệu của chúng tôi trông đúng thay mặt chúng tôi.

Ví dụ: điều này xác định một định dạng ngày tháng và sử dụng nó để đảm bảo ngày công việc được trình bày ở dạng con người có thể đọc được:
```swift
struct ContentView: View {
    static let taskDateFormat: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .long
        return formatter
    }()

    let dueDate = Date()

    var body: some View {
        Text("Task due date: \(dueDate, formatter: Self.taskDateFormat)")
    }
}
```

Điều đó sẽ hiển thị một cái gì đó như "Ngày hoàn thành nhiệm vụ: ngày 4 tháng 2 năm 2021".