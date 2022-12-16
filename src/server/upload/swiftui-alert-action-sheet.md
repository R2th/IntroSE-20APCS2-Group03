> A container for an alert presentation.
> 
> Apple Documentation.

Trong hướng dẫn này, bạn sẽ tìm hiểu về alert trong SwiftUI:
* Cách tạo cảnh báo

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên

## Alert

Sử dụng cờ để xác định xem alert có được hiển thị hay không.

```
@State private var alertShown = false
```

Tại đây, bạn sẽ sử dụng một button để kích hoạt alert.

```
Button("Show Alert") {
    self.alertShown = true
}.alert(isPresented: $alertShown) { () -> Alert in
    Alert(title: Text("Alert Title"), message: Text("Alert Message"), dismissButton: .default(Text("Ok")))
}
```

Với đoạn mã trên, khi nhấp vào nút, một cảnh báo sẽ bật lên. Bạn có thể tuỳ chỉnh tiêu đề, tin nhắn và nút. Hiện tại, chỉ có 1 nút được cấu hình.

![](https://images.viblo.asia/7ab03ed1-ce6a-4864-88af-c1ab0cc93cd7.png)

Nếu bạn cần nhiều hơn một nút, bạn hoàn toàn có thể.

```
Alert(title: Text("Alert Title"), message: Text("Alert Message"), primaryButton: .default(Text("Ok")), secondaryButton: .default(Text("Cancel")))
```

![](https://images.viblo.asia/c14aac2e-b70a-4754-a1d9-cfd6add1cdb6.png)

## Action Sheet

Bạn sẽ sử dụng một cờ để xác định xem action sheet có được hiển thị hay không. Bạn tạo một biến bool để giữ trạng thái.

```
@State private var actionSheetShown = false
```

Tiếp theo, tạo một nút bên dưới. Và khi action sheet được kích hoạt, bạn thay đổi trạng thái của cờ thành true.

```
Button("Action Sheet") {
    self.actionSheetShown = true
}
```

Tiếp, bạn khởi tạo action sheet như sau:
```
.actionSheet(isPresented: $actionSheetShown) { () -> ActionSheet in
  ActionSheet(title: Text("Menu"), message: Text("Select your options"),
 buttons: [
    .default(Text("Ok"), action: {
        print("Ok selected")
    }),
    .destructive(Text("Cancel"), action: {
        print("Cancel selected")
    })
  ])
}
```

Thành quả sẽ như này:

![](https://images.viblo.asia/fcf1c04f-22c4-4059-910c-3f81e467c30f.gif)

Cảm ơn mọi người đã theo dõi bài viết tới đây. Thanks!!