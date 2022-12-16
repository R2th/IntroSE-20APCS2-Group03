Bài viết này trình bày một số cách sử dụng animaiton trong **SwiftUI** framework được giới thiệu trong WWDC 2019.
## Animation cơ bản
**SwiftUI** đã hỗ trợ **animation** bằng cách thay đổi phương thức **animation()**, khi bạn muốn thêm một animation nào đó, chỉ cần modify ngay sau hàm **animation()**.
Ví dụ dưới đây, tạo ra một một button, mà mỗi lần tap vào nó sẽ  có hiệu ứng  scale tăng thêm 1
```
struct ContentView: View {
    @State var scale: Length = 1

    var body: some View {
        Button(action: {
            self.scale += 1
        }) {
            Text("Tap here")
                .scaleEffect(scale)
                .animation(.basic())
        }
    }
}
```

Bạn cũng có thể đặt khoảng thời gian hiệu ứng chính xác hơn, ví dụ hiệu ứng sẽ phản ánh trong khoảng thời gian 3s
```
Text("Tap here")
    .scaleEffect(scale)
    .animation(.basic(duration: 3))
```

Hoặc là bạn cũng có thể đặt một đường cong, bằng cách lựa chọn giữa **.easeIn**, **.easeOut**, **.easeInOut** và **.custom**, trong đó đường cong sau cho phép bạn kiểm soát chính xác điểm dừng hiệu ứng. 

Ví dụ sau mô tả hiệu ứng scale  bắt đầu chậm và nhanh dần lên:
```
Text("Tap here")
    .scaleEffect(scale)
    .animation(.basic(curve: .easeIn))
```

Bạn có thể xử lý nhiều hiệu ứng khác nhau, như là dạng quay với hiệu ứng 2D, 3D, xử lý độ mờ, thay đổi biên độ v.v...
Ví dụ, tạo một button, quay xung quanh và tăng dần đường biên  mỗi lần tap vào button
```
struct ContentView: View {
    @State var angle: Double = 0
    @State var borderThickness: Length = 1

    var body: some View {
        Button(action: {
            self.angle += 45
            self.borderThickness += 1
        }) {
            Text("Tap here")
                .padding()
                .border(Color.red, width: borderThickness)
                .rotationEffect(.degrees(angle))
                .animation(.basic())
        }
    }
}
```
## Animation dạng spring
SwiftUI  tích hợp sẵn  animation kiểu spring, là hiệu ứng di chuyển đến điểm mục tiêu, sau đó bật lại ( hiệu ứng kiểu lò xo).
Nếu bạn chỉ sử dụng .spring (), không có tham số, bạn sẽ có một hiệu ứng mặc định . Vì vậy, điều này tạo ra một animation động  kiểu sprint xoay 45 độ mỗi khi nó tap vào button:
```
struct ContentView: View {
    @State var angle: Double = 0

    var body: some View {
        Button(action: {
            self.angle += 45
        }) {
            Text("Tap here")
                .padding()
                .rotationEffect(.degrees(angle))
                .animation(.spring())
        }
    }
}
```

Nếu bạn muốn kiểm soát chi tiết đối với animation kiểu sprint, truyền bất  kỳ tham số nào mà bạn quan tâm: khối lượng của vật thể, độ cứng, độ chậm, tốc độ di chuyển của nó khi khởi động .

Ví dụ, tạo ra một button có độ giảm thấp, có nghĩa là nó sẽ nảy xung quanh trong một thời gian dài trước khi đạt đến góc mục tiêu của nó:
```
Button(action: {
    self.angle += 45
}) {
    Text("Tap here")
        .padding()
        .rotationEffect(.degrees(angle))
        .animation(.spring(mass: 1, stiffness: 1, damping: 0.1, initialVelocity: 10))
}
```

## Animation thay đổi binding values
Các ràng buộc (binding) hai chiều của SwiftUI, cho phép chúng ta điều chỉnh trạng thái của chương trình và chúng ta có thể đáp ứng điều đó bằng cách điều chỉnh phân cấp chế độ view. Ví dụ: chúng ta có thể làm cho text xuất hiện hoặc biến mất hoặc điều chỉnh độ mờ của view.

Thay vì có một thay đổi trạng thái xảy ra ngay lập tức,  ta có thể làm tạo hiệu ứng thay đổi gây ra bởi một ràng buộc (binding) bằng cách thêm animation() vào binding. Ví dụ, view này có một toggle mà nó hiển thị hoặc ẩn một text view phụ thuộc vào stage của toggle:
```
struct ContentView : View {
    @State var showingWelcome = false

    var body: some View {
        VStack {
            Toggle(isOn: $showingWelcome) {
                Text("Toggle label")
            }

            if showingWelcome {
                Text("Hello World")
            }
        }
    }
}
```

Nếu không có xử lý **animation**, text view  sẽ chỉ xuất hiện hoặc biến mất ngay lập tức. Thay đổi để nó bị ràng buộc thành $showsWelcome.animatio () thì text view sẽ có hiệu ứng trượt một cách trơn tru hơn:
```
struct ContentView : View {
    @State var showingWelcome = false

    var body: some View {
        VStack {
            Toggle(isOn: $showingWelcome.animation()) {
                Text("Toggle label")
            }

            if showingWelcome {
                Text("Hello World")
            }
        }
    }
}

```
Nếu bạn muốn control nhiều hơn đối với animation, bạn có thể chuyển các tham số cho animation( ), nó sẽ phản ánh quá trình chuyển đổi xảy ra.

Ví dụ, bổ sung thêm **animnation** dạng **spring** vào text.
```
Toggle(isOn: $showingWelcome.animation(.spring())) {
    Text("Toggle label")
}
```