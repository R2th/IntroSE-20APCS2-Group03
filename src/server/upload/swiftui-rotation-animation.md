## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.

* Xcode 11 trở lên.

## Setup View
Chúng ta sẽ tạo một Button và khi bấm sẽ tạo ra các animation. 
Điều đầu tiên cần làm là tạo một biến để biết nút có đang được nhấp hay không.

```
@State private var isRotated = false
```

Sau đó, bạn sẽ tạo một biến khác đại diện cho Animation để có thể dễ dàng tinh chỉnh.

```
var animation: Animation {
    Animation.easeOut
}
```

Giờ sẽ tạo một Button và animation.

```
VStack(spacing: 20) {
    // 1
    Button("Rotate") {
        self.isRotated.toggle()
    }
    // 2
    Rectangle()
        .foregroundColor(.green)
        .frame(width: 200, height: 200)
        .rotationEffect(Angle.degrees(isRotated ? 300 : 0))
        .animation(animation)
}
```

1. Khi bạn nhấp vào nút, bạn sẽ chuyển đổi giá trị bool.
2. Tạo hình chữ nhật với các thuộc tính trên.

## Rotation Effect

Chúng ta bắt đầu có thể thay đổi animation từ đây.

```
var animation: Animation {
    Animation.easeOut
}
```

Hãy thử các animation khác nhau. Đầu tiên là `easeOut` :

![](https://images.viblo.asia/9bbcd224-ed36-4cfe-ae48-7b778b7546b3.gif)

Tiếp theo là `easeIn` :

![](https://images.viblo.asia/94c43aa7-3b56-4d17-8e59-de0febfc5c98.gif)

Và animation tiếp là `linear`:

![](https://images.viblo.asia/a08c4edb-40b4-421b-88cf-51d772784b8f.gif)

Cuối cùng là `easeInOut`:

![](https://images.viblo.asia/f591e43c-78c7-4d1a-ade0-af2ca76b68ca.gif)

## Non Stop Animation

Nếu cần phải animation không ngừng, chúng ta sẽ phải chỉnh sửa một chút.
Bạn sẽ cần điều chỉnh 2 dòng code để nó hoạt động. Với `repeatForever`, nó sẽ hoạt động không ngừng khi set autoreverses là `false`

```
    Animation.linear
    .repeatForever(autoreverses: false)
}
```

Dòng mã tiếp theo là thay đổi độ thành 360.

```
.rotationEffect(Angle.degrees(isRotated ? 360 : 0))
```

Kết quả như hình:

![](https://images.viblo.asia/e45d7c25-f053-42c4-9145-406e69f8313a.gif)

## 3D Rotation Animation

Còn về Xoay 3D? Ở đây, bạn sẽ lấy ra RotationEffect và thay thế nó bằng Rotation3DEffect.

```
.rotation3DEffect(Angle.degrees(isRotated ? 180 : 0), axis: (x: 1, y: 0, z: 0))
```

Hiệu ứng xoay 180 độ thì sao?

![](https://images.viblo.asia/0ea0caaf-6e57-4bdc-b9a8-22f525763fb4.gif)

Còn đây là rotate 3D không giới hạn.

![](https://images.viblo.asia/2a6523f3-3a18-4fb8-a376-6956aba3a85e.gif)

SwiftUI chắc chắn đã đưa animation lên một cấp độ hoàn toàn mới!