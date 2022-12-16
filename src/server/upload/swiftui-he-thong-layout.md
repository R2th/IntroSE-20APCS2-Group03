SwiftUI không còn sử dụng Auto layout nữa. SwiftUI có một layout system được thiết kế hoàn toàn mới 
# Layout Basics
Hãy bắt đầu với ví dụ cơ bản nhất về “Hello World”.
Đây là code được tạo khi bạn chọn File / New File... / SwiftUI View in Xcode.

Nhấn vào chọn Preview, để xem layout mà swiftUI gen ra từ code. Khung màu xanh dương cho biết ContentView của text "Hello World".

**Safe Area**

Safe area giúp bạn đặt chế độ xem của mình trong phần hiển thị của giao diện tổng thể. ContentView trong swiftUI mặc định luôn nằm trong Safe area. Bạn có thể bỏ Safe area bằng cách:

```
Text("Hello World")
    .edgesIgnoringSafeArea(.all)
```

![](https://images.viblo.asia/d9aa62b3-8257-4219-8f8e-8a67d0d0507a.png)

**Antialiasing** (Khử răng cưa)

Một điều khác cũng đã được đề cập trên WWDC, SwiftUI tự động làm tròn các cạnh của chế độ xem của bạn đến các pixel gần nhất.

Bây giờ chúng ta đã xem xét ví dụ cơ bản nhất và có ý tưởng về cách hoạt động của quy trình bố cục SwiftUI, hãy xem nó cung cấp những công cụ nào. Trong Auto Layout, tất cả các API đều được xây dựng dựa trên cùng một công nghệ - constraints.
SwiftUI thì: Ngăn xếp, Khung, Đệm, v.v. - đều là của riêng nó. Trước hết, hãy bắt đầu với - frames.

**Frame**

Đầu tiên, hãy quên mọi thứ bạn biết về Frame trong UIKit hoặc AppKit. Những thứ đó không liên quan gì đến frame (width: height: alignment :) và các phương thức liên quan khác trong SwiftUI.

Hãy lấy hình ảnh 60x60 và hiển thị nó bằng SwiftUI’s Image. Hãy xem điều gì sẽ xảy ra nếu tôi đặt Frame thành 80x80.

```
struct Frame: View {
    var body: some View {
        Image("swiftui")
            .border(Color.red)
            .frame(width: 80, height: 80)
            .border(Color.blue)
    }
}
```

![](https://images.viblo.asia/3191cf4e-62d3-49e4-9c1e-dc7e3619b031.png)
Hình ảnh không thay đổi kích thước. Tại sao vậy? Frame trong SwiftUI không phải là constraints. Nó không phải là bound of view. Frame trong SwiftUI chỉ là một dạng xem khác mà bạn có thể coi như một khung ảnh.

Khi gọi `Image("swiftui").frame(width: 80, height: 80)`

SwiftUI tạo một chế độ xem vùng chứa vô hình mới với kích thước được chỉ định và định vị chế độ xem ảnh bên trong nó. Hình ảnh, kích thước 80x80. Chế độ xem hình ảnh phản hồi rằng nó chỉ lớn 60x60, và đặt hình ảnh ở trung tâm - nó sử dụng căn chỉnh .center theo mặc định.
Tham số căn chỉnh `.alignment` chỉ định căn chỉnh của chế độ xem này trong khung. Cái mặc định là `.cente`r, nhưng bạn có thể chọn bất kỳ cái nào khác có sẵn:
```
struct Frame: View {
    var body: some View {
        Image("swiftui")
            .border(Color.red)
            .frame(width: 80, height: 80,
                   alignment: .topLeading)
            .border(Color.blue)
    }
}
```

![](https://images.viblo.asia/de6d6ffc-2065-40d4-a62a-4e10ddaa5ba1.png)
Để thay đổi kích thước hình ảnh, bạn có thể dùng `.resizable()`
```
struct Frame: View {
    var body: some View {
        Image("swiftui")
            .resizable()
            .border(Color.red)
            .frame(width: 80, height: 80)
            .border(Color.blue)
    }
}
```
![](https://images.viblo.asia/37e21f10-c631-4a62-8a1f-f778ce5d00bf.png)
    
Tất cả các tham số của phương thức frame (width: height: alignment :) là tùy chọn. Nếu bạn chỉ chỉ định một trong các kích thước, thì chế độ xem kết quả sẽ giả định hành vi định kích thước của chế độ xem này trong kích thước kia.

Cuối cùng, hãy xem điều gì sẽ xảy ra khi khung hình nhỏ hơn kích thước của nội dung.
```
struct Frame: View {
    var body: some View {
        Image("swiftui")
            .border(Color.red)
            .frame(width: 40, height: 80)
            .border(Color.blue)
    }
}
```
![](https://images.viblo.asia/5b9d3d95-7a3d-4bb8-a1d0-082a7aa2b526.png)
Hình ảnh vẫn giữ nguyên kích thước của mình mà không bị ảnh hưởng của ContentView (Image).

**Stacks**

Có 3 loại Stack cơ bản:

`HStack` nhóm xem cùng nhau theo chiều ngang

`VStack` - xem theo chiều dọc

`ZStack` - xem từ sau ra trước

![Building-Layouts-with-Stack-Views-1@2x.png](https://images.viblo.asia/131aeb7d-9ec7-4901-a6c8-ab5ab0e09fd6.png)

Stack là công cụ bố trí chính trong SwiftUI. Phần lớn các bố cục có thể được thực hiện bằng cách sử dụng Stack. 
Bạn cũng có thể lồng nhiều stack vào nhau để xây dựng bố cục.
```

NavigationView {
            VStack {
                HStack {
                    Text("Hello, \(landmark.name)!")
                        .font(.title2)
                        .foregroundColor(.orange)
                        .padding()
                    Spacer()
                    
                    FavoriteButton(isSet: $modelData.landmarks[landmarkIndex].isFavorite)
                        .padding()
                }
                
                Text(landmark.description)
                    .padding()
                
                Text("Thanks so much")
                    .foregroundColor(.orange)
                    .padding()
                
            }
            .navigationTitle("Detail")
            .navigationBarTitleDisplayMode(.inline)
        }
```

![](https://images.viblo.asia/bc9ccb67-af0f-479e-b8df-7d0c93b5c58e.png)

Mình vừa giới thiện về những layout cơ bản trong swiftUI. Hy vọng vài viết hữu ích. 

Cảm ơn bạn đã đọc bài viết nhé !

*Nguồn: https://kean.blog/post/swiftui-layout-system*