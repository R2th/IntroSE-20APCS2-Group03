Bài viết này sẽ giới thiệu với các bạn bước đầu tiên nhưng cũng không kém phần quan trọng, đó là tạo mới dự án sử dụng SwiftUI, ta sẽ hiểu được điểm bắt đầu của ứng dụng, cách kết nối các view với nhau và cách SwiftUI hoạt động.

Từ Xcode 11, iOS 13, ta mới có thể sử dụng SwiftUI để tạo ứng dụng, vì vậy những dự án hiện tại nếu vẫn hỗ trợ iOS phiên bản thấp hơn 13 thì không thể chạy bằng SwiftUI được.

### Trải nghiệm đầu tiên với SwiftUI
Với cách viết cũ, để có được một tableView ta phải làm khá nhiều việc. Nhưng đối với SwiftUI thì chỉ cần một nốt nhạc là xong:
```
import SwiftUI
struct User: Identifiable {
  let id: Int
  let name: String
}
struct ContentView: View {
  let users = [
    User(id: 1, name: "Coro Zoku"),
    User(id: 2, name: "Henry Park"),
    User(id: 3, name: "Mirror Nancy")
  ]
  var body: some View {
    List(users) { user in
      Text(user.name)
    }
  }
}
```

### Tạo mới dự án sử dụng SwiftUI
Ta vẫn tạo mới dự án như bình thường và nhớ chọn vào option Use SwiftUI để tích hợp nó vào Project. 
![](https://images.viblo.asia/4c8cd15d-a62b-4ab2-8636-472abbe14f3c.png)

### Tìm hiểu các thành phần trong base project
Dự án được tạo mới với rất ít các file có sẵn: 
![](https://images.viblo.asia/f6a3b42e-5472-4ea5-aaad-c4a39d343d30.png)

Không còn file storyboard như trước đây nữa mà thay vào đó là một file ContentView, đây chính là màn hình đầu tiên mà app chạy vào (do được setup từ file SceneDelegate:
```
        // Create the SwiftUI view that provides the window contents.
        let contentView = ContentView()

        // Use a UIHostingController as window root view controller.
        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()
        }
```

Bây giờ ta sẽ chỉnh sửa lại cấu trúc project để nó tinh gọn hơn, và bắt đầu lại từ đầu để hiểu hết các thành phần của nó nhé. Hãy xoá file AppDelegate.swift và ContentView.swift. Sau đó thêm keyword @UIApplicationMain vào trên cùng của class SceneDelegate và cho class này conform UIApplicationDelegate, từ đây, nó chính là điểm bắt đầu của ứng dụng. Cuối cùng, hãy xoá tất cả các functions trong đó và chỉ chừa lại function sau:
```
import UIKit
import SwiftUI

@UIApplicationMain
class SceneDelegate: UIResponder, UIWindowSceneDelegate, UIApplicationDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    }
}
```

Bây giờ ta đã có thể chạy app với một màn hình đen, nhưng không sao, ta sẽ sửa ngay sau đó, ít nhất là bây giờ nó đã chạy được.

### Tìm hiểu về canvas (preview simulator)
Hãy tạo mới một file SwiftUI mới. Thêm vào đoạn code sau:
```
import SwiftUI
struct MyView: View {
  var body: some View {
    Text("Hey! Do you see me?")
  }
}
```

Đoạn code trên định nghĩa một struct View, nó chỉ cần implement một property bắt buộc là 'body'. Trong Swift 5.1, keyword 'some' mang ý nghĩa một computed property có thể trả về bất cứ thứ gì miễn nó thoả mãn được View protocol, và Text cũng vậy. Ngoài ra, ta cũng không cần sử dụng keyword 'return' nữa, dòng cuối cùng của funtion hoặc closure sẽ được trả về một cách tự động.

Để kích hoạt canvas hiển thị live preview cho đoạn code ta đã viết, hãy thêm vào những dòng sau:

```
import SwiftUI
struct MyView: View {
  var body: some View {
      Text("Hey! Do you see me?")
  }
}
#if DEBUG
struct MyView_Previews: PreviewProvider {
  static var previews: some View {
    MyView()
  }
}
#endif
```

Để xem chế độ canvas, hãy click vào biểu tượng hambuger ở góc phải trên cùng, và chọn Editor và Canvas menu. Sau đó chọn vào Resum hoặc Try again phụ thuộc vào tình hình hiện tại của canvas. Ngoài ra ta còn có thể bấm tổ hợp phím 'cmd+option+enter' để nó hiện ra hoặc ẩn đi bằng 'cmd+enter'. Nó cho phép ta xem trực tiếp kết quả sẽ hiện thị ra trên device như thế nào mà không cần run app.

### Định nghĩa SwiftUI view là View đầu tiên khi lauch App
Tại thời điểm này, nếu chạy app lên, ta vẫn sẽ nhận được một màn hình đen. Vì vậy, ta sẽ chỉnh lại để hiển thị view mà ta đã tạo ở trên lên màn hình. Cách định nghĩa view đầu tiên của app cũng khá tương tự với cách làm trước đây. Trong SceneDelegate.swift, thêm vào:
```

import UIKit
import SwiftUI
@UIApplicationMain
class SceneDelegate: UIResponder, UIWindowSceneDelegate, UIApplicationDelegate {
  var window: UIWindow?
  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    if let windowScene = scene as? UIWindowScene {
      // (1)
      let window = UIWindow(windowScene: windowScene)
      self.window = window
      // (2)
      let vc = UIHostingController(rootView: MyView())
      window.rootViewController = vc
      // (3)
      window.makeKeyAndVisible()
    }
  }
}
```

- Trong mục số (1), ta sẽ khởi tạo một UIWindow mới với kích thước màn hình của device và gán cho windown property.
- Ở mục (2), khởi tạo một UIHostingController, đây là một viewcontroller với nhiệm vụ lưu giữ SwiftUI View mới, trong đó ta truyền vào MyView để hiển thị nó là view đầu tiên.
- Cuối cùng ở mục (3), ta gọi make window key và cho nó visible lên. Thông báo với app rằng đây chính là active window mà ta muốn hiển thị.

Bây giờ, chạy lại app, ta sẽ có được kết quả như mong đợi:
![](https://images.viblo.asia/7f1a0104-c18e-4a40-b8ca-860f0a22b233.png)

Chắc hẳn các bạn sẽ thắc mắc tại sao Xcode lại biết được class SceneDelegate chính là class mà nó cần gọi đến để khởi tạo root view cho app? Câu trả lời nằm trong Info.plist:
![](https://images.viblo.asia/433981f6-cdc2-443b-b0ff-ed16264f5d87.png)

Lúc bạn chọn SwiftUI ở bước đầu tiên khi tạo mới dự án, $(PRODUCT_MODULE_NAME).SceneDelegate sẽ được thêm vào Info.plist để báo cho app biết cần tìm root view ở đâu.

###  Kết luận
SwiftUI khi ra đời, nó đã tạo ra một xu hướng lập trình UI mới hoàn toàn cho các developer, tinh gọn hơn, nhanh hơn, nhưng, vì chỉ áp dụng được từ iOS 13, nên nó vẫn chưa phổ biến lắm đối với chúng ta. Tuy nhiên ta vẫn hoàn toàn có thể trải nghiệm và quen dần với nó, vì có thể sau này storyboard sẽ không còn được sử dụng nữa.