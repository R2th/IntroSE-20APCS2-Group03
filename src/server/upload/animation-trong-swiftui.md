# 1. Basic animation
SwiftUI tích hợp cho các animation với công cụ animation() có sẵn. Để sử dụng, hãy đặt nó sau bất kỳ công cụ sửa đổi nào khác cho chế độ xem của bạn và đưa vào loại animation mà bạn muốn.<br>
Ví dụ: Tạo nút bấm làm scale tỉ lệ của nó lên 1 khi bấm: <br>
```
struct ContentView: View {
    @State private var scale: CGFloat = 1

    var body: some View {
        Button("Press here") {
            scale += 1
        }
        .scaleEffect(scale)
        .animation(.linear(duration: 1))
    }
}
```
Nếu bạn không muốn chỉ định thời gian chính xác cho animation của mình, bạn có thể sử dụng .linear.<br>
Ngoài các linear animation đơn giản, bạn có thể chỉ định một curve từ .easeIn, .easeOut, .easeInOut hoặc sử dụng .timingCurve để chỉ định các điểm kiểm soát của riêng bạn.<br>
Ví dụ: Tạo animation khi bấm nút thì tỷ lệ để nó bắt đầu nhanh dần:<br>
```
struct ContentView: View {
    @State private var scale: CGFloat = 1

    var body: some View {
        Button("Press here") {
            scale += 1
        }
        .scaleEffect(scale)
        .animation(.easeIn)
    }
}
```
Bạn có thể tạo animation cho nhiều modifier, chẳng hạn như xoay 2D và 3D, độ mờ, đường viền, v.v. <br>
Ví dụ: Tạo một nút quay xung quanh và tăng đường viền của nó mỗi khi nó được chạm:<br>
```
struct ContentView: View {
    @State private var angle: Double = 0
    @State private var borderThickness: CGFloat = 1

    var body: some View {
        Button("Press here") {
            angle += 45
            borderThickness += 1
        }
        .padding()
        .border(Color.red, width: borderThickness)
        .rotationEffect(.degrees(angle))
        .animation(.easeIn)
    }
}
```
# 2. Spring animation
SwiftUI có hỗ trợ tích hợp cho Spring animation, là những animation di chuyển đến điểm mục tiêu của chúng, vượt quá một chút, sau đó bật trở lại.<br>
Khi bạn gọi .spring() thì nó sẽ sử dụng animation mặc định.<br>
Ví dụ xoay 45 độ khi bấm vào Button: <br>
```
struct ContentView: View {
    @State private var angle: Double = 0

    var body: some View {
        Button("Press here") {
            angle += 45
        }
        .padding()
        .rotationEffect(.degrees(angle))
        .animation(.spring())
    }
}
```
Nếu bạn muốn kiểm soát chi tiết spring animation thì đưa vào các thuộc tính tương ứng.<br>
Ví dụ:  Tạo animation bật qua bật lại trước khi tới điểm mục tiêu:<br>
```
struct ContentView: View {
    @State private var angle: Double = 0

    var body: some View {
        Button("Press here") {
            angle += 45
        }
        .padding()
        .rotationEffect(.degrees(angle))
        .animation(.interpolatingSpring(mass: 1, stiffness: 1, damping: 0.5, initialVelocity: 10))
    }
}
```
# 3. Explicit animation
Nếu bạn đính kèm animation vào một view, bạn có thể dùng explicit animation - việc thay đổi một số trạng thái ở nơi khác trong view của bạn có thể sử dụng animation, ngay cả khi bạn chỉ tăng một số nguyên hoặc chuyển đổi Boolean.<br>
Hãy gói các thay đổi của bạn trong một lệnh gọi tới withAnimation ().<br>

Ví dụ: Tạo animation khi bấm vào một nút thì làm mờ nó đi: <br>
```
struct ContentView: View {
    @State private var opacity = 1.0

    var body: some View {
        Button("Press here") {
            withAnimation {
                opacity -= 0.2
            }
        }
        .padding()
        .opacity(opacity)
    }
}
```
withAnimation () nhận một tham số chỉ định loại animation bạn muốn, ví dụ tạo simple animation với duration 2 giây: withAnimation (.linear (duration: 2))<br>
# 4. Cách delay animation
Khi bạn tạo bất kỳ animation nào(explicit, implicitly hoặc bindings), bạn có thể đính kèm các modifier vào animation đó để điều chỉnh cách hoạt động. <br>
Nếu bạn muốn animation bắt đầu sau một số giây nhất định, bạn nên sử dụng delay ().<br>

Ví dụ: Tạo ra một hình chữ nhật màu đỏ, khi chạm vào, sẽ xoay 360 độ bằng cách sử dụng animation hai giây với độ trễ một giây:<br>

```
struct ContentView: View {
    @State var rotation = 0.0

    var body: some View {
        Rectangle()
            .fill(Color.red)
            .frame(width: 200, height: 200)
            .rotationEffect(.degrees(rotation))
            .animation(Animation.easeInOut(duration: 3).delay(1))
            .onTapGesture {
                rotation += 360
            }
    }
}
```
Trên đây là một số các triển khai animation cơ bản trong SwiftUI. Hy vọng sẽ hữu ích với mọi người.<br>