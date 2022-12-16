![](https://images.viblo.asia/fa1294e1-5077-49a9-a788-1877773ce1d7.jpeg)

Nếu bạn cần sử dụng một Floating Label TextField thì nó không thể dễ dàng hơn với SwiftUI

Đầu tiên, chúng ta bắt đầu với cách tiếp cận đơn giản nhất có thể: 

Sử dụng VStack, bên trong có một Text hiển thị title ở bên trên và một TextField bên dưới.

```swift
struct FloatingTextField: View {
    let title: String
    let text: Binding<String>

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(.caption)
                .foregroundColor(Color(.placeholderText))                
            TextField(title, text: text)
        }
    }
}
```

Hiển thị FloatingTextField với đoạn mã ví dụ này:

```swift

struct ContentView: View {
    let labels = ["First Name", "Last Name", "Street", "City", "Post Code"]
    @State private var values = Array(repeating: "", count: 5)

    var body: some View {
        List(0..<5) { index in
            FloatingTextField(title: self.labels[index], text: self.$values[index])
        }.listStyle(GroupedListStyle())
    }
}
```

![](https://images.viblo.asia/13291b9b-e18d-4a90-9cae-d90872126eca.png)

Trông có vẻ ổn ổn, nhưng chúng ta đều thấy placeholder text bị lặp. 

Chúng ta cũng đều biết rằng placeholder của TextField sẽ ẩn đi khi có text được nhập, cho nên, thử tạo animate khi quá trình nhập text xảy ra. 

Ban đầu, chúng ta sẽ cung cấp cho nó một vertical offset để nó tăng lên khi xuất hiện và đặt độ mờ ban đầu của nó bằng 0. 

Chúng ta cũng sẽ thêm một animation default giữa hai trạng thái (văn bản trống và không trống).

```swift
struct FloatingTextField: View {
    let title: String
    let text: Binding<String>

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(.caption)
                .foregroundColor(Color(.placeholderText))
                .opacity(text.wrappedValue.isEmpty ? 0 : 1)
                .offset(y: text.wrappedValue.isEmpty ? 20 : 0)
            TextField(title, text: text)
        }.animation(.default)
    }
}
```

Xem kết quả:

![](https://images.viblo.asia/ef2884ab-f115-410d-a8b0-4f6d386b047e.gif)

Không quá tệ cho một đoạn mã nhỏ như vậy! 

Nhưng nếu bạn nhìn kỹ, bạn sẽ nhận thấy rằng placeholder cứ đơ đơ, không sinh động. 

Nếu muốn hoàn hảo hơn một chút, chúng ta sẽ thay thế placeholder mặc định. 

Chúng ta sẽ thay một placeholder trống cho TextView và được phủ lên bằng cách sử dụng ZStack. 

Sau đó, chúng ta sẽ scale nhỏ nó. Thử đoạn mã bên dưới và nhìn ảnh để thấy rõ hơn:

```swift
struct FloatingTextField: View {
    let title: String
    let text: Binding<String>

    var body: some View {
        ZStack(alignment: .leading) {
            Text(title)
                .foregroundColor(Color(.placeholderText))
                .offset(y: text.wrappedValue.isEmpty ? 0 : -25)
                .scaleEffect(text.wrappedValue.isEmpty ? 1 : 0.8, anchor: .leading)
            TextField("", text: text) // give TextField an empty placeholder
        }
        .padding(.top, 15)
        .animation(.spring(response: 0.2, dampingFraction: 0.5))
    }
}
```

Kết quả: 

![](https://images.viblo.asia/4350bdf9-522e-4f25-b9f4-870bc9ced836.gif)

Bạn thậm chí có thể làm động màu của placeholder, như vậy:

![](https://images.viblo.asia/f9baaeba-218b-4f6e-9122-27e609d78a09.gif)

```swift
struct FloatingTextField: View {
    let title: String
    let text: Binding<String>

    var body: some View {
        ZStack(alignment: .leading) {
            Text(title)
                .foregroundColor(text.wrappedValue.isEmpty ? Color(.placeholderText) : .accentColor)
                .offset(y: text.wrappedValue.isEmpty ? 0 : -25)
                .scaleEffect(text.wrappedValue.isEmpty ? 1 : 0.75, anchor: .leading)
            TextField("", text: text)
        }
        .padding(.top, 15)
        .animation(.spring(response: 0.4, dampingFraction: 0.3))
    }
}
```

Hãy làm thử một TextField theo sở thích và cho các trường hợp cần sử dụng của bạn với SwiftUI. 

Mong nó có ích với các bạn!

Nguồn: Medium.com