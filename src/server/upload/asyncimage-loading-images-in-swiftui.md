iOS 15 beta mang đến cho chúng ta thêm một số swiftUI views mới, trong đó có AsyncImage. Nó chịu trách nhiệm tải và hiển thị hình ảnh bằng url truyền vào.
Cùng bắt đầu với một ví dụ đơn giản

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
​
   var body: some View {
       AsyncImage(url: url)
   }
}
```

![](https://images.viblo.asia/ae3d44b0-a6b4-490b-9c84-88c3111b97da.png)

Mặc định, nó sẽ hiển thị nền màu xám, sau đó khi đã load xong, background xám sẽ được thay thế bằng hình ảnh đã load.
Ngoài ra, AsyncImage cũng hỗ trợ thêm thuộc tính **scale** để thay đổi kích thước hiển thị của hình ảnh. Ở ví dụ dưới đây, kích thước của hình ảnh được giảm đi một nửa.

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
​
   var body: some View {
       AsyncImage(url: url, scale: 2)
   }
}
```

Để thay đổi giao diện của AsyncImage, chúng ta có thể khởi tạo content và placeholder cho nó.

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
​
   var body: some View {
       AsyncImage(url: url) { image in
           image
               .resizable()
               .aspectRatio(contentMode: .fit)
       } placeholder: {
           Image(systemName: "photo")
               .imageScale(.large)
               .foregroundColor(.gray)
       }
       .ignoresSafeArea()
   }
}
```

![](https://images.viblo.asia/b9eb8006-301a-43a7-afd2-66412cb21530.png)

Nếu ta muốn handle khi không thể load ảnh thì sao, chúng ta có thể khởi tạo với **AsyncImagePhase**, nó đơn giản là 1 enum với 3 trường hợp: **empty**, **success**, **error**, tương đương với ba trạng thái khi load hình ảnh,

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
​
   var body: some View {
       AsyncImage(url: url, content: view)
   }
​
   @ViewBuilder
   private func view(for phase: AsyncImagePhase) -> some View {
       switch phase {
       case .empty:
           ProgressView()
       case .success(let image):
           image
               .resizable()
               .aspectRatio(contentMode: .fit)
       case .failure(let error):
           VStack(spacing: 16) {
               Image(systemName: "xmark.octagon.fill")
                   .foregroundColor(.red)
               Text(error.localizedDescription)
                   .multilineTextAlignment(.center)
           }
       @unknown default:
           Text("Unknown")
               .foregroundColor(.gray)
       }
   }
}
```

Ở đây, chúng ta cho hiển thị icon loading khi hình ảnh đang được tải, hiển thị hình ảnh đã được resize khi đã tải xong và hiển thị lỗi nếu gặp vấn đề khiến không thể tải được hình ảnh.

![](https://images.viblo.asia/1f407cda-89b5-43a0-848e-6c9d6ed92d33.png)

Mở rộng thêm, chúng ta cũng có thể thay đổi hiệu ứng khi thay đổi các trạng thái sử dụng **transaction**

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
   private let transaction: Transaction = .init(animation: .linear)
​
   var body: some View {
       AsyncImage(url: url,
                  transaction: transaction,
                  content: view)
   }
   ...
}
```

Và tất nhiên, AsyncImage cũng có thế sử dụng trong 1 list như với Image bình thường.

```
import SwiftUI
​
struct ContentView: View {
​
   private let url = URL(string: "https://picsum.photos/200")
​
   var body: some View {
       List {
           ForEach(0..<10) { _ in
               AsyncImage(url: url,
                          content: view)
                   .listRowInsets(.init(.zero))
           }
       }
       .listStyle(.plain)
   }
   ...
}
```