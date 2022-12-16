**Ở hướng dẫn này bạn sẽ học được:**

* Cách sử dụng ProgressView
* Cách sử dụng Link
* Cách sử dụng TextEditor

## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 12 trở lên.
* Chỉ support iOS 14 trở lên

# ProgressView
### Indeterminate Progress

Indeterminate Progress hiểu đơn giản như là đang loading mặc định, animation loading quay liên tục.

```
ProgressView("Loading…")
```

![](https://images.viblo.asia/a5a59316-c416-4893-b548-3be02aeb7b62.gif)

### Linear Progress

Để tạo Linear Progress, bạn phải chỉ định giá trị hiện tại và tổng giá trị. Hiện tại giá trị đang được đặt ở mức 50, tức là một nửa tổng số.

```
ProgressView("Downloading…", value: 50, total: 100)
    .padding()
```

![](https://images.viblo.asia/6d9c0b65-a61c-47e9-91f9-385dccb489c4.png)

Bạn có thể làm cho nó thay đổi tiến trình hiện tại. 
Đầu tiên, bạn sẽ tạo một biến State để theo dõi tiến trình hiện tại.

```
@State private var currentProgress = 0.0
```
Sau đó, bạn sẽ tạo một bộ đếm thời gian.

```
let timer = Timer.publish(every: 0.1, on: .main, in: .common).autoconnect()
```

Tiếp theo, sử dụng `currentProgress` trong `ProgressView`

```
ProgressView("Downloading…", value: currentProgress, total: 100)
```

Thêm một action vào `ProgressView`, nó sẽ liên tục thêm 1 cho đến khi đạt 100.

```
.onReceive(timer) { _ in
    if currentProgress < 100 {
        currentProgress += 1
    }
}
```

Chúng ta sẽ có kết quả như sau:

![](https://images.viblo.asia/edb881ff-edf7-45c2-90fd-71c2e1cbc34c.gif)

### Custom Progress
Chúng ta cũng có thể custom màu sắc cho progress.

`markColor` cho phép bạn chỉnh sửa màu sắc của thanh.

```
.accentColor(.green)
```

`foregroundColor` cho phép bạn chỉnh sửa màu sắc của tiêu đề.

```
.foregroundColor(.yellow)
```

![](https://images.viblo.asia/c1f020f3-c87b-4f52-b91b-cdcd2df5471b.png)

Vậy là chúng ta đã có thể tạo được một progress cho mình, tiếp theo đến phần Link nhé mọi người.
# Link
Cách sử dụng cơ bản của `Link` là khai báo tiêu đề và url của nó.

```
Link("Facebook", destination: URL(string: "https://www.facebook.com")!)
```

Nó sẽ mở url bằng Safari.

![](https://images.viblo.asia/834a0380-9b02-4b34-9bcd-a0b668e12799.gif)

### Link Customisation

Khá dễ dàng để tùy chỉnh `Link`, bạn có thể chỉnh sửa với một số màu sắc và phông chữ của nó.

```
Link("Facebook", destination: URL(string: "https://www.facebook.com")!)
    .font(.largeTitle)
    .foregroundColor(.blue)
```

![](https://images.viblo.asia/08113622-4492-4a18-b6e2-cc0a18067b27.png)

Cũng khá đơn giản nếu bạn muốn thêm cả ảnh.

```
Link(destination: URL(string: "https://www.facebook.com")!, label: {
    Text("Facebook")
    Image("facebook")
        .resizable()
        .frame(width: 30, height: 30)
})
```

![](https://images.viblo.asia/6668a9cb-ff0e-4f3f-8312-f66706ca30c3.png)

Nếu bạn muốn chỉ hiển thị hình ảnh, chỉ cần xóa văn bản. Nhấp vào hình ảnh, bạn sẽ được chuyển hướng đến liên kết.

![](https://images.viblo.asia/6f19fb06-f7bb-49ee-92e4-6d1bf00e0f76.png)

Khá đơn giản đúng không mọi người.
# TextEditor

Khuyến khích anh em sử dụng `TextEditor` khi có ý định sử dụng các lợi thế về đa dòng của `TextEditor`. Còn nếu bạn chỉ định sử dụng một dòng thì nên sử dụng `TextField`.

Để bắt đầu thì bạn sẽ phải tạo một biến State chứa văn bản muốn hiển thị. Ở đây tôi sử dụng một văn bản dài dài chút.

```
@State private var textEditorValue: String = "Lorem ipsum..."
```

Sau đó, nhúng cái này vào `VStack`

```
TextEditor(text: $textEditorValue)
   .foregroundColor(.black)
   .lineSpacing(20)
   .padding()
```

![](https://images.viblo.asia/b1d17b09-e4fd-459a-9aee-2a59a726583e.gif)

Đơn giản vậy là chúng ta đã có thể sử dụng `TextEditor`, mong nó có ích với mọi người.