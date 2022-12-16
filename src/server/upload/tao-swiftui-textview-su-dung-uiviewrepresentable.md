# Giới thiệu
Trong bài viết này ta sẽ sử dụng UIViewRepresentable để tích hợp các view của UIKit với SwiftUI.

# Sử dụng UIViewRepresentable
Để sử dụng UIKit view trong SwiftUI có thể thực hiện qua protocol của UIViewRepresentable, bằng cách tạo một struct trong SwiftUI thực thi protocol để tạo và quản lý đối tượng UIView.

```
struct CustomView: UIViewRepresentable {
 
    func makeUIView(context: Context) -> some UIView {
        // Return the UIView object
    }
 
    func updateUIView(_ uiView: some UIView, context: Context) {
        // Update the view
    }
}
```

Khi thực thi thực tế, ta sẽ thay UIView bằng các View UIKit mà ta cần dùng.
Ví dụ ta muốn sử dụng UITextView:
struct TextView: UIViewRepresentable {
 
```
func makeUIView(context: Context) -> UITextView {
 
        return UITextView()
    }
 
    func updateUIView(_ uiView: UITextView, context: Context) {
 
        // Update the view
    }
}
```

Phương thức makeUIView sẽ trả về một đối tượng của UITextView, bằng cách này UIKit view có thể được sử dụng ở SwiftUI.
```
struct ContentView: View {
    var body: some View {
        TextView()
    }
}
```

# Tạo một TextView cho SwiftUI
Trước hết ta cần có một chút cơ bản về UIViewRepresentation thông qua việc tùy biến một Text View trong SwiftUI.

Để tùy biến UITextView trong SwiftUI, ta có thể sử dụng đoạn code dưới đây:

import SwiftUI
 
```
struct TextView: UIViewRepresentable {
 
    @Binding var text: String
    @Binding var textStyle: UIFont.TextStyle
 
    func makeUIView(context: Context) -> UITextView {
        let textView = UITextView()
 
        textView.font = UIFont.preferredFont(forTextStyle: textStyle)
        textView.autocapitalizationType = .sentences
        textView.isSelectable = true
        textView.isUserInteractionEnabled = true
 
        return textView
    }
 
    func updateUIView(_ uiView: UITextView, context: Context) {
        uiView.text = text
        uiView.font = UIFont.preferredFont(forTextStyle: textStyle)
    }
}
```
Đoạn code trên gồm những bước xử lý sau:
1. Ta có 2 thuộc tính liên kết dành cho **Text Input** và **Font style**
2. Ở trong phương thức **makeUIView**, ta sẽ trả về một UITextView với style mong muốn
3. Các thuộc tính liên kết có tác dụng sẽ gọi hàm updateUIView khi các biến trạng thái của UIView bị thay đổi.

Chuyển sang file ContentView.swift. Định nghĩa 2 biến trạng thái cho **Text Input** và **Text Style**:


```
@State private var message = ""
@State private var textStyle = UIFont.TextStyle.body
```

Để hiển thị Text View, ta cần thêm đoạn code dưới đây vào phần **body**:

```
TextView(text: $message, textStyle: $textStyle)
    .padding(.horizontal)
```


TextView lúc này sẽ được sử dụng giống như các view của SwiftUI, như ta có thay đổi các thuộc tính như padding để tùy chỉnh bố cục của View như hình dưới đây.
![](https://images.viblo.asia/f23b7c89-ef54-45c1-b293-960def32be3c.png)

# Lưu trữ Text Input
Ở bước trên ta đã hoàn thành viện hiển thị UIKit view trong dự án SwiftUI.
Tuy nhiên ta cần phải bổ sung các đoạn code xử lý sự kiện các View.
Ví dụ như ta cần phải lưu lại nội dung text người dùng đã nhập vào Text View, cụ thể ở đây ta cần lưu trữ vào biến **messge** đã định nghĩa ở trên.

Để làm việc này ta cần phải thực thi các phương thức của protocol **UITextViewDelegate** của **UITextView**.

`optional func textViewDidChange(_ textView: UITextView)`

Để tạo cầu nối giữa UIKit delegate với SwiftUI, ta cần sử dụng và thực thi đối tượng Coordinator. 
Đối tượng này sẽ được dùng để lưu trữ và truyền dữ liệu qua lại giữa UIKit và SwiftUI như đoạn code dưới đây.

```
func makeCoordinator() -> Coordinator {
    Coordinator($text)
}
 
class Coordinator: NSObject, UITextViewDelegate {
    var text: Binding<String>
 
    init(_ text: Binding<String>) {
        self.text = text
    }
 
    func textViewDidChange(_ textView: UITextView) {
        self.text.wrappedValue = textView.text
    }
}
```


# Xử lý khi Text Style thay đổi
Ta sẽ đặt thêm một Button vào giao diện để phát sinh sự kiện thay đổi Text Style của text view. Khi đó text view sẽ được thay đổi giống như đoạn chương trình dưới đây
```
var body: some View {
    ZStack(alignment: .topTrailing) {
        TextView(text: $message, textStyle: $textStyle)
            .padding(.horizontal)
 
        Button(action: {
            self.textStyle = (self.textStyle == .body) ? .title1 : .body
        }) {
            Image(systemName: "textformat")
                .imageScale(.large)
                .frame(width: 40, height: 40)
                .foregroundColor(.white)
                .background(Color.purple)
                .clipShape(Circle())
 
        }
        .padding()    
    }
}
```

Khi đó chương trình sẽ hoạt động như sau:
![](https://images.viblo.asia/f52aa68c-f541-4f06-998d-9d906f89ad80.gif)

# Nguồn tham khảo
https://www.appcoda.com/swiftui-textview-uiviewrepresentable/