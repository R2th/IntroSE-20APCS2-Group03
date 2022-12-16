Trong hướng dẫn này, bạn sẽ tìm hiểu những gì cần thiết để tạo ScrollView trong SwiftUI. Bạn sẽ học được:

- Cách tạo ScrollView.

- Cách tạo ScrollView cuộn ngang.

- Cách tạo ScrollView cuộn dọc.

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

- Cơ bản với Swift.

- Xcode 11 trở lên.

## Scroll View

Bước đầu tiên để tạo ScrollView là cực kỳ dễ dàng, và bạn có thể cho biết bạn muốn nó cuộn theo chiều ngang hay chiều dọc. 
Bằng cách sử dụng biến bool, thậm chí có thể ẩn indicator.

```
ScrollView(axes: Axis.Set, showsIndicators: Bool, content: () -> _)
```

## Horizontal Scroll View

Bây giờ, sẽ tạo Horizontal ScrollView bao gồm một số hình chữ nhật chứa các màu khác nhau.

Đầu tiên, bạn sẽ tạo một mảng màu.

```
var colors = [Color.green, Color.yellow, Color.orange, Color.blue]
```

Sau đó, bạn sẽ chỉ ra ScrollView của mình trong trường hợp này là nằm ngang và không có indicator. 

```
ScrollView(.horizontal, showsIndicators: false) {
 
}
.padding(.horizontal)
```

Sau đó, bạn chạy `ForEach` của mảng bên trong ScrollView đã tạo ở trên. 
Việc này sẽ thêm màu vào mỗi Hình chữ nhật được tạo.

```
HStack {
  ForEach(self.colors, id: \.self) { color in
    RoundedRectangle(cornerRadius: 4)
      .fill(color)
      .frame(width: 250, height: 200)
  }
}
```

![](https://images.viblo.asia/5fab1d31-9810-40fd-9beb-3a67cb553002.gif)

## Vertical Scroll View

Bây giờ, để nó cuộn theo chiều dọc. Sử dụng lại mã trên, và thực hiện các thay đổi sau:

Thay đổi .horizontal thành .vertical để thay đổi hướng cuộn

Thay đổi HStack thành VStack (HStack cũng hoạt động nhưng để có kết quả rõ ràng hơn, tốt nhất là VStack)

![](https://images.viblo.asia/c9a40b43-c786-4220-ab29-07e8e2b2f1ae.gif)

Đơn giản đúng không anh em.

## Navigation View

Hãy nhớ rằng NavigationView hoàn toàn khác với Navigation Bar trong UIKit. NavigationView trong SwiftUI đại diện cho toàn bộ view.

Bằng cách thêm mã sau, bạn sẽ thấy tác dụng của nó.

```
NavigationView {
    Text("Navigation View")
}
```

![](https://images.viblo.asia/109f85ad-ee09-4b91-a6a4-4135bbb4841f.png)

Tuy nhiên, bạn sẽ không nhìn thấy tiêu đề vì sẽ phải thêm .navigationBarTitle. 
Chỉ cần chèn mã sau vào trong NavigationView. (để thêm 1 list như bên dưới, anh em vui lòng chờ bài viết sau nhé)

```
.navigationBarTitle(Text("Navigation View Title"))
```

Nếu bạn không thích cỡ chữ lớn, bạn có thể tuỳ chỉnh .displayMode theo ý thích.

```
.navigationBarTitle(Text("Navigation View Title"), displayMode: .inline)
```

## Ẩn Navigation Bar

Nếu bạn không muốn thanh trên cùng hiển thị, có thể ẩn bằng cách sử dụng .navigationBarHidden.

![](https://images.viblo.asia/a94646ec-840d-43ed-93b4-58ce9b7b64d0.png)

## Navigation Bar Items

Bạn thậm chí có thể thêm hình ảnh hoặc văn bản dưới dạng Navigation Bar Item. 
Bạn có thể bao gồm các Navigation Bar Item bên trái hoặc bên phải hoặc cả hai. Đoạn mã sau đây hiển thị Navigation Bar Item ở dạng văn bản và hình ảnh.

```
.navigationBarItems(
    leading: Button(action: { }) { Image(systemName: "plus.circle")}.accentColor(.red),
    trailing: Button("Settings",action: { }).accentColor(.red))
```

![](https://images.viblo.asia/88e69f05-82c3-40c6-ba9a-3790329bd585.png)

## Back Button

Trong trường hợp bạn muốn ẩn nút back khi di chuyển từ màn hình này sang màn hình khác. 
Bạn có thể chọn `.navigationBarBackButtonHidden (bool)`.

Bạn thậm chí có thể tùy chỉnh nút back theo thiết kế của riêng bạn. Bạn có thể dùng cả văn bản và hình ảnh.

```
.navigationBarItems(leading: Button(action: { }) {
    HStack {
        Image(systemName: "arrow.left")
        Text("Back")
    }
})
```

![](https://images.viblo.asia/2f35fa89-2630-49d4-94a2-8f4ff9ce999e.png)


Cảm ơn các bạn đã theo dõi.