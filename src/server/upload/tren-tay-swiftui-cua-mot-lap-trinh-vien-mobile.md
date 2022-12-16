### SwiftUI là gì?
![](https://images.viblo.asia/494aee8a-2fe9-40c1-bea2-5b8db3523ab2.png)
Như chúng ta đã biết thì Apple đã cho ra mắt SwiftUI được một thời gian rồi, và hiện tại đã có các dự án bắt đầu sử dụng SwiftUI để phát triển ứng dụng (IOS 13+). Vậy SwiftUI là gì?
SwiftUI là framework được Apple giới thiệu, nó cho phép chúng ta phát triển app nhanh hơn với các View (component) đã được cung cấp sẵn. Chắc hẳn trước đây chúng ta đã quen với việc sử dụng Interface Builder để tạo UI, việc chuyển sang code UI ít nhiều sẽ gây bất tiện. Tuy nhiên, nếu như chúng ta đã từng code một ngôn ngữ khác dạng declerative (react native, flutter) thì chắc hẳn việc chuyển sang code UI với SwiftUI sẽ đơn giản hơn rất nhiều.

### SwiftUI và Interface Builder
Chúng ta hầu như đều đã rất quen thuộc với việc sử dụng xib, storyboard để dựng UI. Khi custom View thì thường chúng ta sẽ tạo ra 1 file xib sau đó tạo UI mong muốn, hay button, cell...mình nghĩ chắc các bạn cũng sẽ nhận ra được vấn đề mình sắp nói tới dưới đây:
![](https://images.viblo.asia/d211565f-5e78-4c07-b26e-110d23193b3e.jpg)
- **Conflict source code** trong các dự án với nhiều dev. Khi sử dụng xib, storyboard thì chắc hẳn ít nhiều chúng ta đều đã gặp phải việc cần phải sửa conflict trong file xib/storyboard? Liệu việc sửa conflict này có dễ hay không? UI được dựng bằng xibs/ storyboard bản chất bên dưới nó là XML. Vì vậy khi sửa conflict chúng ta rất khó đọc và sửa sao cho đúng để tránh gây mất/lỗi UI.
=> Với SwiftUI, chúng ta sẽ dễ dang hơn trong việc giải quyết các conflict. Lý do ở đây đó là SwiftUI khai báo các View rất tường minh, đọc rất dễ hiểu, khác xa hoàn toàn so với việc kiểm tra từng dòng XML như trước đây. 

![](https://images.viblo.asia/1e130e27-08ca-4ffb-8e0c-480a4890ac71.png)

- Ví dụ trước đây chúng ta có một TableView bên trong ViewController, sau khi đã layout xong, nếu như chúng ta không kéo outlet vào ViewController(delegate/datasource) thì chúng ta sẽ không thể gán dữ liệu/thao tác với tableview đó được. Hoặc đơn giản việc thiếu outlet từ xib/storyboard dến ViewController sẽ gây ra lỗi crash do Missing Referencing Outlets
=> SwiftUI chúng ta sẽ không cần phải kéo outlet vào ViewController để có thể thao tác nữa. Với SwiftUI chúng ta sẽ không còn ViewController, Outlet. UI sẽ được check lại trong quá trình complie source của Xcode. 
- Trước đây khi khởi tạo TableViewCell chúng ta sẽ cần phải gán identifier cho TableViewCell đó, để xác định cell cho việc reuse trên tableView. Còn với SwiftUI, chúng ta sẽ không cần quan tâm tới nó nữa. Ko cần dài dòng gán identifier, đăng ký cell với tableview....
Ngoài ra, SwiftUI trên Xcode 11 còn cung cấp thêm chức năng preview UI. Chắc hẳn bạn nào đã từng làm việc với react native chắc hẳn sẽ rất thích "Hot Reloading" or "Live Reloading" của RN. Giờ đây, Xcode cũng có chức năng preview tương tự như vậy. (Tuy nhiên còn hơi lag ^^)
### Làm quen với SwiftUI
Việc chuyển từ UIKit sang SwiftUI chắc hẳn sẽ mất chút thời gian để chúng ta làm quen lại với các class. Chúng ta đã rất quen thuộc với UITableView. Tuy nhiên, với SwiftUI chúng ta sẽ không còn **UITableView** nữa, mà thay vào đó là **List**.

![](https://images.viblo.asia/10b25ea1-b9fd-4ba7-b8aa-b5371ee0dc2b.jpg)

Dưới đây là danh sách các class UIKit được thay thế bằng các SwiftUI class mà mình đã dùng qua:
* UITableView => List
* UICollectionView  => Cái này mình chưa thấy có, hiện giờ hướng xử lý của mình là dùng List.
* UILabel  => Text
* UITextField  => TextField (nếu muốn sử dụng chức năng secure text thì sẽ dùng thằng SecureField)
* UITextView => chưa có
* UISwitch => Toggle
* UISlider => Slider
* UIButton => Button (Support sẵn đổ bóng, bo góc....)
* UINavigationController => NavigationView
* UIAlertController  .alert: =>  Alert
* UIAlertController  .actionSheet => ActionSheet
* UIStackView horizontal axis => HStack
* UIStackView vertical axis => VStack
* UIImageView => Image (Custom giờ rất đơn giản ^^, support sẵn bo tròn, đổ bóng...)
* UISegmentedControl => SegmentedControl
* UIDatePicker => DatePicker
* NSAttributedString => cũng sẽ chuyển sang sử dụng Text, bởi vì SwiftUI hỗ trợ chúng ta custom rất tốt ^^ 
* UITabBar => TabView (Tuy nhiên vẫn đang có vấn đề, chưa thực sự tốt như UITabBar.

### ObservedObject, State, và EnvironmentObject
Chắc hẳn bạn nào đã từng code React Native, Flutter sẽ rất quen thuộc với State.  Trong SwiftUI, chúng ta cũng sẽ sử dụng State để quản lý trạng thái của các View. Nguyên tắc ở đây là: khi state thay đổi -> view cũng sẽ đc render lại. Chúng ta sẽ không cần phải thao tác trực tiếp với View như trước đây, mà giờ đây chúng ta chỉ cần thay đổi state. 
SwiftUI cung cấp rất nhiều cách để chứa (storing) state, như tiêu đề của mục này mình đã có đề cập tới : **ObservedObject, State, và EnvironmentObject**. Chúng ta sẽ cùng tìm hiểu xem liệu chúng khác nhau như thế nào?

![](https://images.viblo.asia/6047d8ad-9ce9-4017-ac16-91c184db7fd4.png)

Đầu tiên chúng ta sẽ cùng tìm hiểu về **State**. Dưới đây mình có một ví dụ đơn giản về việc sử dụng @State
```
struct ContentView: View {
    @State private var age = 18
}
```
Trong ví dụ trên, chúng ta khai báo một thuộc tính có tên "age" và gán cho nó giá trị là 18. Khi chúng ta khởi tạo một thuộc tính được wrap bởi @State, SwiftUI sẽ tự động quản lý bộ nhớ và đảm bảo rằng thuộc tính này luôn tồn tại cho tới khi View (ContentView) còn tồn tại. 
Trong SwiftUI thì tất cả các View đều là struct, vì vậy chúng ta không thể trực tiếp thay đổi  chúng. Ví vậy khi sử dụng State, khi dữ liệu được thay đổi thì tự động SwiftUI sẽ tự động render lại View với dữ liệu thay đổi mới nhất.
**Vậy @State là một thuộc tính cơ bản, nó được sử dụng dành riêng cho một View cụ thể, và không được sử dụng bên ngoài View đó  (convention khai báo private)**
Chắc các bạn cũng thắc mắc rằng nều có nhiều thuộc tính, methods mà cần sử dụng ở các View khác nhau thì sẽ sử dụng cái gì đúng ko? Với vấn đề này, chúng ta sẽ sử dụng **ObservedObject**
Dưới đây mình có một ví dụ:
```
class Settings: ObservableObject {
    @Published var age = 0
}
```
Đối với ObservableObject thì chúng ta sẽ cần phải quan tâm tới protocol **ObservableObject**. Chúng ta cần phải đảm bảo class mà chúng ta khởi tạo phải conform với protocol này để có thể store và sử dụng được dữ liệu. Tiếp theo, chúng ta cần phải đảm bảo các thuộc tính bên trong class phải được wrap bởi keyword  @Published.  @Published nó dùng để chỉ ra cho SwiftUI biết rằng khi giá trị của thuộc tính thay đổi thì sẽ tiến hành update lại view.
```
struct ContentView: View {
    @ObservedObject var settings = Settings()
    
    var body: some View {
        VStack {
            Text("Age is \(settings.age)")
            Button(action: {
                self.settings.age = 20
            }) {
                Text("Change Age")
            }
        }
    }
    
}
```
Ngoài ra, để sử dụng ObservedObject bên trong một view khác, thì chúng ta sẽ cần phải khai báo class đó và wrap lại với keyword @ObservedObject bên trong View giống như ví dụ phía trên. Ở ví dụ phía trên, khi thuộc tính age bên trong Settings thay đổi thì Text cũng sẽ được render lại với dữ liệu mới nhất.
Ngoài ra, khi khai bảo thuộc tính trong ObservedObject thì chúng ta sẽ không cần khai báo private, điều này khác so với State bởi vì các thuộc tính của ObservedObject có thể được sử dụng ở nhiều hơn một View.
Chắc hẳn khi đọc tới đây các bạn đang nghĩ rằng khi sử dụng @State và @ObservedObject thì đã có thể hoàn thành được dự án rồi đúng không? Vậy còn thằng EnvironmentObject để làm gì? 
Như vừa rồi mình có chia sẻ thì State được dùng trong một View nhất định, còn ObservedObject được sử dụng cho nhiều hơn một View. Còn thằng EnvironmentObject nó cũng giống với  2 thằng State và ObservedObject về mặt quan lý dữ liệu và render, Tuy nhiên, có một điểm khác biệt đó là nó sẽ có thể dùng để chia sẽ dữ liệu xuyên suốt toàn bộ app. Và object này sẽ tồn tại cho tới khi app dừng hoạt động. 
Sau khi chúng ta khởi tạo object này thì bất cứ View nào trong luồng app đều có thể truy xuất đến các thuộc tính của nó. Dưới đây là ví dụ về việc khởi tạo và sử dụng EnvironmentObject
```
final class AppState: ObservableObject {
    @Published var selection = 3
}
```
Ở đây mình có một ví dụ khởi tạo ObservableObject, mình đặt tên là AppState, thì object này được hiểu là sẽ lưu trữ dữ liệu chung cho toàn bộ app.
Tiếp theo, sau khi bấm vào một button mình sẽ tiến hành change root view như sau:
```
    let appState = AppState()
    let window = UIWindow(windowScene: scene!)
    window.rootViewController = UIHostingController(rootView:MainContentView().environmentObject(appState))
    windowScenedelegate.window = window
    window.makeKeyAndVisible()
```
Ở ví dụ trên, mình khởi tạo appState và gán nó vào thuộc tính environmentObject của UIHostingController. Điều này đảm bảo rằng các sub View của UIHostingController đều có thể sử dụng được thuộc tính bên trong của AppState.
Tiếp theo, để sử dụng appState thì trong View con, mình sẽ khai báo nó như một thuộc tính như sau:
```
struct JokeDetailContentView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        Button(action: {
            //todo
            self.appState.selection = 2
        }) {
            Text("Get Started Now").foregroundColor(.white).font(.system(size: 22)).frame( maxWidth: .infinity, maxHeight: 64, alignment: .center)
        }
        .frame( maxWidth: .infinity, maxHeight: 64, alignment: .center)
        .background(Color.brightTurquoise)
        .cornerRadius(8)
        .padding(EdgeInsets(top: 60, leading: 40, bottom: 0, trailing: 40))
    }
}
```
Ở ví dụ trên, mình khai báo một thuộc tính tên appState bên trong JokeDetailContentView. Lúc này, nếu như mình thay đổi thuộc tính selection bên trong AppState, thì các View đang sử dụng thuộc tính selection trong toàn bộ app đều sẽ đc reload lại với giá trị mình vưa thay đổi.
### Ví dụ đơn giản khi tạo UI sử dụng SwiftUI so với UIKit trước đây
![](https://images.viblo.asia/34af41ad-d19c-4cc9-8964-0817fdb5e7d5.png)

Trước đây, để có thể bo tròn một Image,View sau đó đổ bóng chúng ta sẽ cẩn phải thực hiện khá nhiều bước như set layer...
Còn với SwiftUI thì những cái này đều đã được support tối ưu nhất, đơn giản và dễ sử dụng nhất như ví dụ dưới đây:
![](https://images.viblo.asia/f91c7259-eebf-4780-8c61-c3dd808058e5.png)

Trước đây, việc set một button vừa có border, vừa round, vừa đổ bóng chúng ta sẽ gặp vấn đề với việc đổ bóng, để làm được thì như trước kia chúng ta sẽ cần phải add bezel cho button đó, hoặc sẽ custom 1 view tương tự với button. 

![](https://images.viblo.asia/d2da8daf-a033-408c-9650-7c49bf698e47.png)

Còn với SwiftUI chúng ta cũng đc được support việc này.

![](https://images.viblo.asia/0de41687-3067-44db-abbe-c09799384dd6.png)

Ngoài ra còn việc sử dụng List thay vì TableView cũng đơn giản và tiết kiệm thời gian hơn so với trươc đây:

![](https://images.viblo.asia/540f6d7a-8fc7-4ad5-adf2-a5becee7bb89.png)

Code

![](https://images.viblo.asia/3a9f924a-73fa-4eef-871b-af3f91da8815.png)

### Kết
Bài viết này mình chỉ tập trung vào việc so sánh SwiftUI với sử dụng Xib,Storyboard như trước đây. Thông qua ví dụ đơn giản mình vừa trình bày ở trên thì chắc hẳn các bạn cũng đã có thể hiểu và mường tượng được cách sử dụng SwiftUI để khởi tạo các View trong dự án. Trong SwiftUI thì chúng ta có 3 keyword quan trọng đó là @State, @ObservedObject, @EnvironmentObject thì mình cũng đã chia sẻ ở trên. Nếu nắm được cách sử dụng của 3 keyword này thì chúng ta có thể dễ dàng áp dụng nó vào các dự án sao cho phù hợp với bài toán.
Mình xin phép dừng bài viết này tại đây, trong bài viết tiếp theo, mình sẽ đi sâu vào việc kết hợp SwiftUI với Combine để hoàn thành một project đơn giản.

### Nguồn tham khảo
https://www.hackingwithswift.com/quick-start/swiftui

“**SwiftUI by Tutorials** By **Antonio Bello, Phil Łaszkowicz, Bill Morefield & Audrey Tam** Copyright ©2019 Razeware LLC.” - **Chapter 3, Chapter 7**