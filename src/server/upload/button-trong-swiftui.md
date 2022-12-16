# Cách sử dụng Button đơn giản
Button trong SwiftUI tương tự như UIButton, ngoại trừ nó linh hoạt hơn về nội dung mà nó hiển thị và nó sử dụng một closure cho hành động của nó thay vì action cũ.<br>
Để tạo một Button:<br>

```
Button("Title") {
    print("OnPress")
}
```

Ví dụ: bạn có thể tạo một Button hiển thị hoặc ẩn một số văn bản khi nó được chạm vào:<br>

```
struct ContentView: View {
    @State private var showDetails = false

    var body: some View {
        VStack(alignment: .leading) {
            Button("Show details") {
                showDetails.toggle()
            }

            if showDetails {
                Text("Hello World")
                    .font(.largeTitle)
            }
        }
    }
}
```

Tiêu đề bên trong Button có thể là bất kỳ dạng view nào, vì vậy bạn có thể tạo một Button hình ảnh như sau:

```
struct ContentView: View {
    @State private var showDetails = false

    var body: some View {
        Button {
            print("Image tapped!")
        } label: {
            Image("sunset")
        }
    }
}
```

Sử dụng custom label thực sự hữu ích cho những lần bạn muốn tăng diện tích có thể chạm vào của một Button, vì bạn có thể áp dụng padding cho label sau đó sử dụng  contentShape(Rectangle()) hoặc tương tự để làm cho toàn bộ khu vực có thể được chạm vào.<br>

Ví dụ:  Đoạn code dưới đây sẽ thêm padding 20 điểm vào label của Button, để đảm bảo nút đó có thể được chạm vào trong một không gian lớn hơn nhiều so với mức có thể:<br>

```
Button {
    print("Button pressed")
} label: {
    Text("Press Me")
        .padding(20)
}
.contentShape(Rectangle())
```

Trên iOS 15, bạn cũng có thể đính kèm một vai trò vào Button của mình để giúp SwiftUI biết loại kiểu dáng nào nên được gắn vào Button.<br>
Ví dụ: nếu chúng ta có nút Delete, chúng ta có thể đánh dấu nó bằng vai trò .destructive để SwiftUI có thể đánh dấu nó bằng màu đỏ khi nó có ý nghĩa:<br>

```
Button("Delete", role: .destructive) {
    print("Perform delete")
}
```

Ngoài ra còn có một vai trò .cancel và một lần nữa nó cung cấp cho SwiftUI thêm một chút ngữ cảnh để trình bày nó một cách thích hợp.<br>

# 2. Custom Button sử dụng ButtonStyle
SwiftUI có một số protocol tạo kiểu cho phép chúng ta xác định kiểu chung cho các dạng xem như Button, ProgressView, Toggle, v.v. <br>
Ví dụ: đây là một Button có kiểu được khai báo bình thường:<br>

```
Button("Press Me") {
    print("Button pressed!")
}
.padding()
.background(Color(red: 0, green: 0, blue: 0.5))
.clipShape(Capsule())
```

Điều đó hoạt động tốt đối với một Button duy nhất, nhưng nếu trên toàn bộ ứng dụng của bạn, Button tuân theo kiểu thiết kế này, thì hãy tạo một cấu trúc mới tuân theo ButtonStyle protocol, giao thức này sẽ cho chúng ta cấu hình lại Button như ý muốn.<br>

Ví dụ: <br>
```
struct BlueButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color(red: 0, green: 0, blue: 0.5))
            .foregroundColor(.white)
            .clipShape(Capsule())
    }
}

struct ContentView: View {
    var body: some View {
        Button("Press Me") {
            print("Button pressed!")
        }
        .buttonStyle(BlueButton())
    }
}
```

Ví dụ: Tạo Button có thể scale khi người dùng chạm vào: <br>

```
struct GrowingButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .clipShape(Capsule())
            .scaleEffect(configuration.isPressed ? 1.2 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct ContentView: View {
    var body: some View {
        Button("Press Me") {
            print("Button pressed!")
        }
        .buttonStyle(GrowingButton())
    }
}
```
Chúc các bạn thành công!!!