![](https://images.viblo.asia/3628ad7e-ba7d-4bf7-8e92-09715dcf5826.gif)
<br><br>
Việc đính kèm gesture để xử lý trong SwiftUI khác một chút so với UIKit.
<br><br>
Trong phần này, chúng ta sẽ nói tới DragGesture, LongPressGesture, TapGesture và RotationGesture.
<br><br>
Chúng tôi sẽ thực hiện tất cả các gesture này trong ứng dụng mẫu và chúng tôi cũng sẽ xem xét cách các gesture này hoạt động.
<br><br>
.  .  .
<br><br>
## Bắt Đầu
Mở Xcode và tạo mới một Project.
<br><br>
Chọn Single View App và click Next.
<br><br>
![](https://images.viblo.asia/de10c744-dbaa-4cd9-a019-69ced7ff3bc9.png)
<br><br>
Nhập tên Project và chọn SwiftUI ở phần User Interface -> Click Next.
<br>
![](https://images.viblo.asia/53091705-e793-4bc4-a430-0f4087ffc37d.png)
![](https://images.viblo.asia/b9e575d1-5e9b-48f8-ab7f-d1c2d506c453.jpeg)
<br><br>
Theo mặc định, SwiftUI khai báo hai cấu trúc. Cấu trúc đầu tiên conform View protocol mô tả nội dung và layout của các view. Cấu trúc thứ hai tạo ra một bản xem trước cho view đó.

## Thực hiện
Chúng tôi bắt đầu bằng cách tạo ra một TapGesture. TapGesture được gọi khi người dùng chạm vào View.

Đầu tiên nhấn Command + N để tạo file SwiftUI View mới. Vào file TapGestureView và dán đoạn mã sau vào TapGestureView.

```
var body: some View {
let tapGesture = TapGesture()
.onEnded { _ in
if self.changeColor == Color.purple {
     self.changeColor = Color.blue
} else if self.changeColor == .blue {
     self.changeColor = Color.red
} else if self.changeColor == .red {
     self.changeColor = .orange
} else {
     self.changeColor = .purple
  }
}
return Circle()
    .foregroundColor(changeColor)
    .shadow(radius: 10)
    .gesture(tapGesture)
    .frame(width: 200, height: 200, alignment: .center)
    .animation(.default)
   }
}
```

Trong đoạn mã trên, chúng ta có một biến @State changeColor để thay đổi màu của Circle() sau mỗi lần tap.

Sau đó, chúng tôi đã tạo một Circle(), đặt foregroundColor thành biến @State changeColor và cuối cùng, chúng tôi thêm gesture và animation mặc định.

## Build và Run

![](https://images.viblo.asia/eb68ec54-ccad-4fcc-bbc4-2121bb866c06.gif)

Nó sẽ trông như thế này.

Vì vậy, sau TapGesture, gesture tiếp theo của chúng tôi là LongPressGesture. LongPressGesture được gọi khi chúng ta nhấn và giữ vào View.

Đầu tiên nhấn Command + N để tạo file SwiftUI View mới. 
Gọi file LongPressGestureView và dán đoạn mã sau vào LongPressGestureView.

```
struct LongPressGestureView: View {
@State private var didLongPress: Bool = false
@State private var scale: CGFloat = 1
@State private var color = Color.red
var body: some View {
Circle()
.scaleEffect(scale)
.frame(width: 210, height: 210, alignment: .center)
.animation(.default)
.foregroundColor(color)
.shadow(radius: 10)
.gesture(
LongPressGesture()
.onEnded({ _ in
if self.didLongPress == false {
     self.scale = 100
     self.color = .blue
} else if self.didLongPress == true {
    self.scale = 1
    self.color = .red
}
     self.didLongPress.toggle()
     }))
   }
}
```

Trong đoạn mã trên, trước tiên chúng ta có ba biến @State didLongPress, scale và color. Sau đó, tạo Circle() và trong scaleEffect truyền vào scale để phóng to Circle().

Sau đó, chúng tôi set frame và trong foregroundColor chuyển biến color để thay đổi màu sau mỗi LongPress, sau đó đặt một số animation mặc định.

## Build và Run

![](https://images.viblo.asia/d8e19454-c3b1-4427-baa5-918734b85456.gif)

Nó sẽ trông như trên.

Bây giờ chúng tôi sẽ thực hiện DragGesture. DragGesture được gọi khi chúng ta kéo một cái gì đó như hình tròn, hình chữ nhật, hình ảnh, v.v..

Bây giờ hãy nhấn Command + N để tạo tệp SwiftUI View mới. Gọi tệp DragGestureView và dán đoạn mã sau vào DragGestureView.

```
struct DragGestureView: View { 
@State private var drag: CGSize = .zero
@State private var color = Color.blue
var body: some View {
Circle()
     .frame(width: 120, height: 120, alignment: .center)
     .foregroundColor(color)
     .shadow(radius: 10)
     .animation(.default)
     .offset(drag)
.gesture(
DragGesture()
   .onChanged { value in
    self.drag = value.translation
    self.color = .red
 }
   .onEnded({ _ in
     self.drag = .zero
     self.color = .orange
    }))
  }
}
```

Trong đoạn mã trên, chúng ta có hai biến drag và color. Sau đó, tạo Circle() và trong foregroundColor truyền vào color, Circle() sẽ chuyển sang màu ở thuộc tính color sau khi kéo Circle().

Sau đó gán drag vào thuộc tính offset để kéo Circle() và thêm một số animation mặc định và cuối cùng chúng tôi set DragGesture.

## Build và Run

![](https://images.viblo.asia/ef70cdd2-f628-4739-b4b8-9912d32d5fd5.gif)

Trông nó sẽ như này.

Cử chỉ cuối cùng là RoatationGesture. RoatationGesture được gọi khi chúng ta xoay thứ gì đó như hình tròn, hình chữ nhật, hình ảnh, v.v..

Bây giờ hãy nhấn Command + N để tạo tệp SwiftUI View mới. Gọi tệp RoatationGestureView và dán đoạn mã sau vào RoatationGestureView.

```
struct RotationGestureView: View {
@State var rotation: Angle = .zero
@State var color = Color.red
var body: some View {
let rotationGesture = RotationGesture()
.onChanged { value in
    self.rotation = value
    self.color = .orange
}
return Rectangle()
    .foregroundColor(color)
    .cornerRadius(40)
    .shadow(radius: 10)
    .animation(.default)
    .rotationEffect(rotation)
    .frame(width: 200, height: 200, alignment: .center)
    .gesture(rotationGesture)
   }
}
```

Trong đoạn mã trên trước tiên, chúng ta có hai biến rotation và color, sau đó tạo RoatationGesture, set Rectangle() và truyền color vào foregroundColor để thay đổi màu Rectangle() và trong rotationEffect truyền vào rotation và cuối cùng, chúng tôi đã thêm một số animation mặc định.

## Build và Run

![](https://images.viblo.asia/9cdae732-2419-43f1-834f-5197d00cd00b.gif)
Thành quả sẽ như này.
Cảm ơn các bạn đã xem hết.

Nguồn: Medium.com