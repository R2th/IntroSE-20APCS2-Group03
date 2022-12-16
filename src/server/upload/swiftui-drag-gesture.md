> A dragging motion that invokes an action as the drag-event sequence changes.

Apple Documentation

Trong hướng dẫn này, chúng ta sẽ tìm hiểu Drag Gesture trong SwiftUI là gì:
* .onChanged.
* .updating.
* .onEnded.
* limit scrolling.

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên

## .onChanged

`onChanged` thay đổi giá trị của vị trí khi bạn kéo.

Đầu tiên, tạo một biến để lưu kích thước. Với biến bên dưới, đối tượng được đặt ở tọa độ với x, y là 50

```
@State private var rectPosition = CGPoint(x: 50, y: 50)
```

Khi hình chữ nhật di chuyển, bạn sẽ thay đổi `rectPosition`

```
VStack {
    RoundedRectangle(cornerRadius: 4.0)
        .fill(Color.green)
        .frame(width: 100, height: 100)
        .position(rectPosition)
        .gesture(DragGesture().onChanged({ value in
            self.rectPosition = value.location
        }))
}
```

Kết quả là bạn có một hình chữ nhật chuyển động như dưới.

![](https://images.viblo.asia/2b17f6a7-1a63-4e92-90c6-bf504703dd6e.gif)

## .updating

Bạn có thể biết người dùng có đang kéo hay không bằng cách lấy `state`. Đầu tiên, tạo `GestureState` để giữ trạng thái drag.
```
@GestureState private var isDragging = false
```

Tại đây, bạn không thể cập nhật `isDragging` vì nó ở chế độ chỉ đọc. 
Tuy nhiên, bạn có thể cập nhật `state` sau đó nó sẽ cập nhật `isDragging`.

```
.gesture(DragGesture().onChanged({ value in
    self.rectPosition = value.location
}).updating($isDragging, body: { (value, state, trans) in
    state = true
}))
```

![](https://images.viblo.asia/a0e13c76-cff3-489f-9472-0cdc3c37b020.gif)

## .onEnded
Nhiều trường hợp bạn chỉ muốn lấy hành động sau khi người dùng kéo xong đối tượng. 
Đầu tiên, tạo một biến để biết người dùng kết thúc kéo hay chưa.

```
@State private var isEnded = false
```

Sử dụng cùng mã như trên và chỉnh sửa một chút, cho màu thay đổi nếu x nhỏ hơn 120.

```
VStack {
    RoundedRectangle(cornerRadius: 4.0)
        .fill(isEnded ? Color.red : Color.green)
        .frame(width: 100, height: 100)
        .position(rectPosition)
        .gesture(DragGesture().onChanged({ value in
            self.rectPosition = value.location
        }).onEnded({ value in
            self.isEnded = value.location.x < 120
        }))
}
```

Kết quả:

![](https://images.viblo.asia/c9397862-fb27-4287-9386-d49d9bd2acd0.gif)

##  Hạn chế cuộn ngang

```
.gesture(DragGesture().onChanged({ value in
    self.rectPosition = CGPoint(x: value.location.x, y: 50)
}))
```
![](https://images.viblo.asia/4c714849-0ef2-420c-8ee5-ace25ed8875d.gif)

Còn nếu bạn chỉ muốn nó cuộn theo chiều dọc, thì bạn chỉ việc thay đổi giá trị y.