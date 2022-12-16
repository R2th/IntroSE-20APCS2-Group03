## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên.

## Exclusive Gesture

Nó bao gồm cả Tap và Rotate gesture ở đây nhưng ưu tiên xoay hơn. Sẽ tạo ra hai gesture nhưng chỉ xoay mới hoạt động. 
Để làm như vậy, chúng ta sẽ tạo một số biến.

```
@State var degree = 0.0
@State var isDay = false
```

Với mã bên dưới, Exclusive gesture được đặt trên tap gesture. Ở đây, bạn sẽ ưu tiên cử chỉ xoay bằng cách đặt nó ở chế độ Exclusive. Và bạn sẽ có thể chọn Tap hoặc Xoay. Tuy nhiên, nếu bạn thực hiện cả hai cử chỉ cùng một lúc, nó sẽ ưu tiên Xoay hơn Tap vì Xoay được đặt trong Exclusive gesture.

```
Image(systemName: isDay ? "sun.min" : "moon")
    .resizable()
    .scaledToFill()
    .frame(width: 100, height: 100)
    .rotationEffect(Angle.degrees(degree))
    .gesture(TapGesture(count: 1)
        .onEnded({ _ in
            self.isDay.toggle()
        })
 
        .exclusively(before: RotationGesture()
            .onChanged({ angle in
                self.degree = angle.degrees
            })
        )
)
```

Do đó, chỉ xoay mới hoạt động:

![](https://images.viblo.asia/0eb79c35-2efc-4cb4-9b37-54f1b72a11ed.gif)

### Sequence Gesture

Trước tiên, bạn sẽ cần một số biến để biết liệu nó có đang được kéo hay không, vị trí hiện tại của view và vị trí nó sẽ di chuyển.

```
@State var state = CGSize.zero
@State var isDraggable = false
@State var translation = CGSize.zero
 
let minimumLongPressDuration = 1.0
```

Với tất cả biến trên, giờ bạn có thể thiết lập gesture bằng cử chỉ nhấn và kéo. Với Long Press, để người dùng có thể kéo view.

Tiếp theo, cử chỉ kéo cung cấp cho chúng ta tất cả giá trị chúng ta cần như tọa độ x và y, v.v.

```
// Long Tap Gesture
let longTap = LongPressGesture(minimumDuration: minimumLongPressDuration).onEnded { value in
    self.isDraggable = true
}
 
// Drag Gesture
let drag = DragGesture().onChanged { value in
    self.translation = value.translation
    self.isDraggable = true
}.onEnded { value in
    self.state.width += value.translation.width
    self.state.height += value.translation.height
    self.translation = .zero
    self.isDraggable = false
}
 
// Sequence Gesture
let sequenceGesture = longTap.sequenced(before: drag)
```

Bạn có thể chèn mã này bên dưới. Đoạn mã này trả về một hình tròn, sau đó sẽ cho phép bạn di chuyển xung quanh.

```
return Circle()
    .fill(Color.blue)
    .overlay(isDraggable ? Circle().stroke().stroke(Color.white, lineWidth: 2) : nil)
    .frame(width: 100, height: 100, alignment: .center)
    .offset(x: state.width + translation.width, y: state.height + translation.height)
    .shadow(radius: isDraggable ? 8 : 0)
    .animation(.linear(duration: minimumLongPressDuration))
    .gesture(sequenceGesture)
```

Kết quả:


Do không đính kèm được ảnh nên mọi người xem tạm ở link này nhé:
[Image](https://daddycoding.com/wp-content/uploads/2020/04/Long.gif)