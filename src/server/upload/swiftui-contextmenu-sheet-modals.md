ContextMenu cho bạn một cửa sổ bật lên bằng cách nhấn và giữ.
Đó là giống y với việc bạn nhấp vào ứng dụng của mình bằng 3D Touch. ContextMenu không yêu cầu bật 3D Touch, nó kích hoạt đơn giản bằng cách nhấn và giữ.

![](https://images.viblo.asia/3ed06c09-f63f-4753-91ee-f93a8ae32778.jpeg)

> A container for views that you present as a menu items in a contextual menu in response to the standard system gesture.
> <br>Apple Documentation.

Trong hướng dẫn này, bạn sẽ tìm hiểu những gì cần thiết để sử dụng ContextMenu trong SwiftUI

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên

## ContextMenu

Bắt đầu, bạn sẽ tạo một HStack chứa `Text` và `Image` trong đó hình ảnh của bạn sẽ chứa một `ContextMenu`.

```
HStack {
    Text("Contact Me")
    Spacer()
    Image(systemName: "phone.fill")
        .contextMenu {
            Button(action: {}) {
                Text("Email")
                Image(systemName: "envelope.fill")
            }
 
            Button(action: {}) {
                Text("Linkedin")
            }
    }
}
.padding()
```

Với ContextMenu, bạn sẽ có thể thêm Văn bản hoặc Văn bản kèm theo Hình ảnh.

![](https://images.viblo.asia/7cbc2321-d113-4b3a-8549-715f324a2006.gif)

Tuy nhiên, ContextMenu là một sự thay đổi cách thức trong việc sử dụng điện thoại. Người dùng iPhone trước giờ mặc định chỉ biết nhấn hoặc không nhấn. Cử chỉ nhấn và giữ lâu có thể sẽ mất một thời gian để người dùng có thể quen với khái niệm mới này.

## Sheet (Modals)

`Sheet` có thể được hiển thị với nhiều điều kiện khác nhau hoặc thông qua biến `Bool` hoặc `Identifiable`. Bạn thử sử dụng `Identifiable`.

Đầu tiên, bạn sẽ tạo một `struct` `Identifiable` để lưu giữ dữ liệu.

```
struct DetailInfo: Identifiable {
    var id = UUID()
    let text: String
}
```

Tạo xong chúng ta tiếp tục tạo một biến State var để lưu data.

```
@State private var details: DetailInfo? = nil
```

Sau đó, bạn tạo View mới trong ContentView mặc định. 
DetailSheet là một View mới. Tại đây DetailSheet hiển thị một Văn bản và một Nút xử lý việc `dismiss`.

```
struct ContentView: View {
 
    @State private var details: DetailInfo? = nil
 
    var body: some View {
        ...
        ...
        ...
    }
}
 
struct DetailSheet: View {
    @Environment(\.presentationMode) var presentation
    let details: DetailInfo
 
    var body: some View {
        VStack {
            Text(details.text)
                .font(.largeTitle)
            Spacer()
            Button("Dismiss") { self.presentation.wrappedValue.dismiss() }
 
        }
    .padding()
    }
}
```

Bên trong Viewmặc định của ContentView, bạn sẽ cấu hình để hiển thị `Sheet` bằng một Button. Và đây cũng là nơi bạn có thể cấu hình loại văn bản mà bạn muốn hiển thị.

```
VStack {
    Button("Show Sheet") {
        self.details = DetailInfo(text: "Hello, this is the sheet screen")
    }
    .sheet(item: $details) { detail in
        DetailSheet(details: detail)
    }
}
.padding()
```

Kết quả, bạn sẽ có thể thấy một `Sheet` làm việc với `Identifiable`.

![](https://images.viblo.asia/803be1ca-57b3-4a5d-b8ca-25502be8af6a.gif)