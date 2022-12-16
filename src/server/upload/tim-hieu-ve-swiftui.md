##  Mở đầu: 
* Nếu các bạn theo dõi **WWDC 2019 - "Hội nghị dành cho những nhà phát triển toàn cầu"** thì các bạn đã biết Apple đã thông báo rằng có một loạt các bản cập nhật trong đó có **SwiftUI**. Đây chính là tin tức thú vị nhất đối với những nhà phát triển, là bước tiến lớn của Apple khi họ đang hướng tới mục tiêu là giúp tất cả mọi người có thể viết code, đơn giản hoá mọi thứ và có thể có nhiều thời gian hơn cho những tính năng tuỳ chỉnh.
*  **SwiftUI** là một UI framework mới được phát triển bởi **Apple**. Nó cung cấp một API mới cho phép người dùng có thể viết code mà nó có thể làm việc được trên tất cả các **Apple platforms**: **iOS, iPadOS, watchOS and tvOS!**. 
*  Thật thú vị đúng không! :D 

## Yêu cầu: 
* macOS Catalina và Xcode 11 Beta trở lên để **SwiftUI** render **Canvas** (simulator).
* Link: [How To Install Catalina + Xcode 11 Beta](https://medium.com/@martinlasek/install-macos-catalina-xcode-11-beta-4701b6e3a296)

Sau khi cài đặt xong thì chúng ta có thể bắt đầu rồi, hãy xem ví dụ bên dưới nhé! 

## Tạo những dòng code SwiftUI đầu tiên:
Ví dụ với **TableView** được tạo bằng **SwiftUI**:
```
import SwiftUI

struct Hero: Identifiable {
  let id: UUID = UUID()
  let name: String
}

struct ContentView: View {
  let heros = [
    Hero(name: "Iron Man"),
    Hero(name: "Thor")
    Hero(name: "Spider-Man")
  ]
  var body: some View {
    List(heros) { hero in
      Text(hero.name)
    }
  }
}
```

Đã xong :D , rất ít những dòng code đúng không ạ? nhưng đây là tất cả những gì chúng ta cần để tạo ra **TableView**. Để trực quan hơn thì hãy quan sát hình dưới đây: 

![](https://images.viblo.asia/71287da6-6bec-4284-a81e-600671b071b2.png)

Các bạn có thấy kích thích không ạ? :heart_eyes: Bây giờ chúng ta sẽ đi tìm hiểu từng bước cách thức hoạt động của **SwiftUI** nhé! 

## Phụ lục:
1. Tạo project có sử dụng SwiftUI
2. Hiểu được the entry point của ứng dụng
3. Hiểu được Canvas (simulator)
4. Khai báo SwiftUIView làm LaunchScreen của ứng dụng

### 1. Tạo project có sử dụng SwiftUI
Trong Xcode-Beta chúng ta tạo một project mới và chọn Single View App:

![](https://images.viblo.asia/e80df14b-b22a-47e1-bdcf-f50ae793f26f.png)

Tiếp theo hãy đảm bảo rằng **Use SwiftUI** đã được chọn trước khi đến bước cuối để hoàn thành việc tạo project:

![](https://images.viblo.asia/4cd7657a-1dcc-41fe-ab8b-876b5747dd95.png)

### 2. Hiểu được the entry point của ứng dụng
Thứ mà ta muốn làm ở đây là loại bỏ đi càng nhiều **code** và **file** trong project đi càng tốt, để xem rằng giới hạn dòng code là bao nhiêu thì project có thể chạy được. Chúng ta sẽ từng bước viết lại những thứ đã xoá để hiểu rõ mối quan hệ giữa chúng.

Sau khi tạo xong project thì các bạn sẽ thấy:
![](https://images.viblo.asia/916f5eb0-b0fd-4a06-8683-fe119333d497.png)

Ở góc trên bên phải, ta bắt đầu xoá đi 2 files là **AppDelegate.swift** và **ContentView.swift**, giờ thì vào bên trong file **SceneDelegate.swift** và thêm @UIApplicationMain ở trên đầu tên class, sau đó cho class này chiếu theo **UIApplicationDelegate** - với nó các bạn có thể dễ dàng chỉ ra đây là **entry point (điểm vào)**  của ứng dụng để bắt đầu chạy code. Cuối cùng ta xoá tất cả các hàm bên trong class này ngoại trừ một hàm: 
![](https://images.viblo.asia/d2c9e0e5-a193-4dee-bda1-8f36ba06d036.png)

Đừng lo lắng, hãy thử chọn **Simulator iPhone** bất kỳ rồi chạy thử xem sao! ...
Ngon, project đã được khởi động rồi :P Các bạn có thể thấy trên màn hinh simulator đang hiển thị một màu đen xì xì thì đúng rồi đó, chúng ta còn chưa viết code gì mà :P 

### 3. Hiểu được Canvas
Giờ chúng ta sẽ tạo 1 file swift và đặt tên là **"AwesomeView"** nhé!
![](https://images.viblo.asia/1d1a1d12-f515-4b58-8a1a-45b38348c35d.png)

Các bạn đừng tích chọn SwiftUI bởi vì mục đích của ta là build lại code từ đầu mà :D 
Bắt đầu nhé, các bạn hãy thêm vào file vừa tạo đoạn code dưới đây:
```
import SwiftUI
struct AwesomeView: View {
  var body: some View {
    Text("Hey! This is aawweesomee!")
  }
}
```

 * Ở đây các bạn khai báo một **struct** và nó được tuân thủ theo protocol **View**, bên trong các bạn khai báo một biến đặt tên là **body**, kiểu là **some View**. 
* Từ **some** ở đây có nghĩa là trả về một thứ gì đó phù hợp với giao thức mà ví dụ như trên là giao thức **View**, nó đúng với kiểu **Text**.
* Và một điều nữa là ở Swift 5.1 thì chúng ta không cần phải thêm từ khoá **"return"** thêm nữa. Dòng cuối cùng của một function hoặc 1 closure sẽ tự động được trả về.
* Ấu kề, vậy đây chính là SwiftUI View của chúng ta :joy: giờ chỉ cần thêm một chút nữa để khởi động **canvas** giúp ta có thể **Preview** xem trước hiện thị của những dòng code mà các bạn đang viết: 
```
import SwiftUI

struct AwesomeView: View {
  var body: some View {
    Text("Hey! This is aawweesomee!")
  }
}

#if DEBUG
struct AwesomeView_Previews: PreviewProvider {
  static var previews: some View {
    AwesomeView()
  }
}
#endif
```

Để bật được **Preview** lên các bạn sẽ click vào nút giống hình Hambuger menu icon ở góc trên bên phải và tiếp tục click vào **Editor and Canvas**:
![](https://images.viblo.asia/fd45a623-7aa0-46ba-a922-6a4625492609.png)
Bạn cũng có thể sử dụng phím nhanh để mở lên: **cmd+option+enter** hoặc ẩn đi:  **cmd+enter**.

Tiếp tục click vào **Resume** hoặc **Try again** tuỳ thuộc vào trạng thái **canvas** của các bạn:

![](https://images.viblo.asia/5f378c14-2f73-48c1-89c2-47652d69e6d6.png)

Sau khi load xong, chúng sẽ hiển thị tất cả các Views mà chúng ta trả về trong closure bên trong **AwesomeView_Previews** struct. Ở đây chỉ có duy nhất 1 View chúng ta return lại và đây chính là màn hình **Preview**:

![](https://images.viblo.asia/c37c41fb-efe3-4653-9269-5b40d8e43c30.png)

**Struct** hoạt động như thế nào? và việc kết nối tới **Canvas** hoạt động ra sao?
```
Xcode sẽ tự động phát hiện những types phù hợp với PreviewProvider protocol trong ứng dụng và tạo ra các bản xem trước cho mỗi Provider mà nó tìm thấy.
```

Cuối cùng, bạn có thể tạo ra bao nhiêu **struct** mà bạn muốn, format đặt tên Preview là: **Whatever_Previews** là quy ước được cung cấp bởi Apple giúp nhanh chóng nhận biết struct này là gì, có phù hợp với **PreviewProvider** để xem **Canvas** :D 

Các bạn hãy thử sửa lại code và xem **Canvas** reloads trực tiếp như thế nào nhé!  :heart_eyes:

## 4. Khai báo SwiftUIView làm LaunchScreen của ứng dụng
Nếu hiện tại các bạn chạy ứng dụng trên simulator thì sẽ vẫn thấy một màu đen kịt hiện lên :P Để khắc phục điều đó bạn cần phải khởi tạo **window** ở bên trong file **"SceneDelegate.swift"**. Hãy thêm những dòng code dưới đây vào bên trong: 
```
import UIKit
import SwiftUI

@UIApplicationMain
class SceneDelegate: UIResponder, UIWindowSceneDelegate, UIApplicationDelegate {

  var window: UIWindow?
  
  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
  
    // (1)
    window = UIWindow(frame: UIScreen.main.bounds)
    
    // (2)
    let vc = UIHostingController(rootView: AwesomeView())
    window?.rootViewController = vc
    
    // (3)
    window?.makeKeyAndVisible()
  }
}
```

(1) Là khởi tạo một **UIWindow** mới với size của màn hình iPhone và truyền nó tới biến window. (2) chúng ta khởi tạo một **UIHostingController**, nó là một ViewController nhưng có khả năng giữ SwiftUI View. Ở đây chúng ta truyền qua một instance của AwesomeView mà chúng ta muốn nó hiển thị trên View đầu tiên. Cuối cùng chúng ta sẽ **"make the window key and visible"** có nghĩa là đây là cửa sổ hoạt động của ứng dụng.

Giờ thử chạy ứng dụng xem nào! :hugs:

![](https://images.viblo.asia/91ef3234-50b7-49fb-9bf8-9447085c5910.png)

**Awesome!!!!!**

Question: Làm sao để xcode biết class **SceneDelegate** bên trong file **SceneDelegate.swift** là class yêu cầu chế độ xem ban đầu (root) mà ứng dụng của bạn sẽ hiển thị khi chạy?

Thật ra nó đã được định nghĩa trong file **info.plist**:
![](https://images.viblo.asia/eb1d548e-3b97-4b14-99e3-f2262814f081.png)


## Lời kết:
Bài viết này được dịch lại từ bài [SwiftUI - How to setup a project](https://medium.com/@martinlasek/swiftui-getting-started-372389fff423?fbclid=IwAR1XYtYvK638NgtnRKkJ63B_DicMQHMez880fn7Cqbau6YkmKQXwi1VfPbg) của anh [Martin Lasek](https://medium.com/@martinlasek), anh này viết nhiều bài rất chi tiết và khá hay, mình sẽ cố gắng dịch lại nhiều hơn những bài viết của anh ấy để chia sẻ đến các bạn! 

**Xin cảm ơn**!