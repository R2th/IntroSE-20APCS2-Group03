Trong bài này, bạn sẽ được tìm hiểu về việc tạo ra giao diện bằng việc khai báo và tuỳ chỉnh views, cách sử dụng các biến trạng thái để cập nhật giao diện thay vì dùng code. Tập sử dụng tính năng new preview và live preview, những trải nghiệm thú vị khi làm việc cùng với code và WYSIWYG layout
Bản thân tôi phải công nhận rằng SwiftUI là điều thú vị nhất mà tôi được biết kể từ khi Apple tuyên bố về swift từ năm 2014, Đây là bước nhảy lớn hướng đến việc mục tiêu mọi người đều có thể code  của Apple, Bằng việc đơn giản hoá kiến thức nền, dành nhiều thời gian hơn cho những feature bạn muốn phán triển.

SwiftUi cho phép bạn bỏ qua IB và storyboards mà không cần có những bài hướng dẫn chi tiết đến từng step cho việc bố trí giao diện. IB và Xcode là các ứng dụng riêng rẽ từ Xcode 4 đổ lại, và vẫn chung đường kết nối ở các phiên bản sau, bất kì thay đổi nào về tên hoặc kết nối bất kì, thậm chí là xoá cũng có thể gây crash app bởi vì IB ko thể thấy được các thay đổi của code. Và trong khi có thể dễ dàng để thiết kế 1 giao diện mới trong WYSIWYG editor, sẽ hiệu quả hơn trong việc copy và chỉnh sửa giao diện khi n được viết dưới dạng code

SwiftUi chính là cứu cánh. Bạn có thể preview 1 SwiftUIView song song ngay cạnh code - 1 thay đổi bên cửa sổ này cũng sẽ được update sang cho bên cửa sổ kia, chúng luôn đồng bộ. Và lượng code cũng ít hơn bạn phải viết cho UIKit, n cũng dễ dàng hơn để hiểu, edit và thậm chí là debug. Còn gì đáng yêu hơn thế nữa ? Chúng ta cùng tìm hiểu nhé

# Mở đầu 
SwiftUi không thể thay thế UIKit như Swift thay thế Objective-C, bạn có thể sử dụng cả 2 trong cùng 1 app. Các SwiftUI APIs là đồng nhất trên các nền tảng, nên ban có thể dễ dàng phát triển các  ứng dụng tương tự sử dụng cùng 1 source code
Chúng ta cùng bắt đầu serie này bằng 1 game đơn giản này nhé , N sẽ gồm 3 slider, đại diện cho các giá trị màu red, green hay blue trong hệ màu RGB để khớp với các màu target
Cùng bắt đầu bằng việc tạo 1 project mới  (Shift-Command-N), select iOS ▸ Single View App, name the project RGBullsEye và sau đó chọn SwiftUi trong menu User Interface

## Entering the New World of SwiftUI
Trong project navigator, mở group RGBullsEye để xem cái mà bạn có, file AppDelegate.swift  được chia thành 2 file AppDelegate.swift và  SceneDelegate.swift. File SceneDelegate có 1 cửa sổ đi kèm

![](https://images.viblo.asia/4571f279-29e3-469b-bc14-199684b8c2d3.png)

Thông qua dòng code: 
```
window.rootViewController = UIHostingController(rootView: ContentView())

```
UIHostingController tạo ra 1 view controller cho view ContentView của SwiftUI
Khi app khởi động, windows sẽ display 1 thể hiện của ContentView ( được định nghĩa trong file ContentView.swift). N được cấu trúc để conform View protocol
```
struct ContentView: View {
  var body: some View {
    Text("Hello World")
  }
}
```
Trong đoạn code này, SwiftUi khái báo body của ContentView chứa text view và sẽ hiển thị Hello World. Còn struct bên dưới ContentView_Previews sẽ tạo ta view chứa thể hiện của ContentView
```
struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
```
Bấm vào nút resume, chờ 1 chút và bạn có thể xem được preview nhé: 
![](https://images.viblo.asia/75486388-bb2a-4990-8c85-61c2b88f5737.png)
Kết qủa là đây: 
![](https://images.viblo.asia/ee656ab5-6f77-4980-a009-80c14a182f2d.png)

## Outlining Your UI
Có 1 file bạn không thấy được liệt kê đó chính là Main storyboard, bạn sẽ phải tạo ra UI của mình sử dụng SwiftUi code, hãy theo dõi Preview nhé, nhưng đừng lo lắng bởi vì bạn sẽ không phải viết nhiều code đâu
SwiftUi đồng nghĩa với khai báo, bạn nói lên điều bạn muốn trông ntn và SwiftUi sẽ convert khai báo của bạn sang code để đạt được điều bạn muốn. Apple khuyến khích bạn tạo ra bao nhiêu views như bạn muốn để giữ cho code của bạn dễ đọc và maintain. Tái sử dụng,  tham số hoá các view là những điều đặc biệt bạn được khuyên làm
Giao diện của app sẽ có khá nhiêù subviews. do đó trước hết bạn nên tạo ra 1 outline, sử dụng textview như 1 placeholders. Giao diện app sẽ trông ntn nhé: 
![](https://images.viblo.asia/8075f285-6492-471d-b57e-f3ff5b2950d3.png)
Thay thế dòng Text("Hello World") bằng dòng 
```
Text("Target Color Block")

```
Chọn Command Click và select Embed in HStack. Code sẽ được update thành như này
```
HStack {
  Text("Target Color Block")
}
```
You’re using a horizontal stack here because you want to display the target and guess color blocks side by side
Chúng ta đang sử dụng stack theo chiều ngang vì bạn muốn đặt các color block cạnh nhau
```
HStack {
  Text("Target Color Block")
  Text("Guess Color Block")
}
```
Và kết quả bên preview sẽ là
![](https://images.viblo.asia/22d0edaf-1830-45d2-a37a-c8d848392bbd.png)

Tiếp tục update code như sau: 
```
VStack {
  HStack {
    Text("Target Color Block")
    Text("Guess Color Block")
  }

  Text("Hit me button")

  VStack {
    Text("Red slider")
    Text("Green slider")
    Text("Blue slider")
  }
}
```
Kết quả sẽ thành như thế này
![](https://images.viblo.asia/f36a2190-e5d1-4163-99f3-fdfa4655df17.png)
## Filling in Your Outline
Bây giờ chúng ra sẽ luyện tập kĩ năng SwiftUI mới học để tô màu cho các blocks HStack nhé
```
HStack {
  // Target color block
  VStack {
    Rectangle()
    Text("Match this color")
  }
  // Guess color block
  VStack {
    Rectangle()
    HStack {
      Text("R: xxx")
      Text("G: xxx")
      Text("B: xxx")
    }
  }
}
```
Mỗi block color sẽ có 1 hình chữ nhật, target color block sẽ có 1 textview bên dưới trong khi guess color block sẽ có 3 text views. Phần sau trong bài này, ta sẽ thay thế xxx thành giá trị hiện tại của các slider
## Using @State Variables
Bạn có thể sử dụng các hằng số và biến (như trước nay bạn vẫn sử dụng) trong SwiftUI nhưng bạn nên sử dụng  biến @State, UI thay đổi ngay khi giá trị của nó thay đổi. Tựa game màu sắc này cần tất cả các biến ảnh hưởng đến màu sắc của hình chữ nhật guess đều là biến dạng @State 
Thêm các dòng code sau đây ở phía trên struct ContentView, bên trên body closure: 
```
let rTarget = Double.random(in: 0..<1)
let gTarget = Double.random(in: 0..<1)
let bTarget = Double.random(in: 0..<1)
@State var rGuess: Double
@State var gGuess: Double
@State var bGuess: Double
```
R, G, B là các giá trị nằm giữa khoảng 0 và 1. Bạn sẽ khởi tạo target values các giá trị ngẫu nhiên.  Kéo xuống struct ContentView_Previews. Ta sẽ thay đổi ContentView() bằng cách khởi tạo các tham số cần thiết cho guess values:
```
ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5)
```
Khi bạn tạo ra các sliders, chúng sẽ xuất hiện trong preview vs phần thumbs nằm chính giữa.
Trong SceneDelegate, scene (_:willConnectTo:options:)  Chúng ta sẽ thay thế ContentView() bằng dòng sau đây: 
```
window.rootViewController = UIHostingController(rootView:
  ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5))
```
Khi app load root scene lên, thumbs của slider sẽ nằm ở chính giữa. Bây giờ thêm foreground color để hiệu chỉnh hình chữ nhật target nhé:
```
Rectangle()
  .foregroundColor(Color(red: rTarget, green: gTarget, blue: bTarget, opacity: 1.0))
```
Sự thay đổi màu foregroundColor sẽ tạo ra 1 hình chữ nhật mới, tương tự ra sẽ thay đổi màu sắc của hình chữ nhật guess như sau:
```
Rectangle()
  .foregroundColor(Color(red: rGuess, green: gGuess, blue: bGuess, opacity: 1.0))
```
Cùng xem kết quả nhé : 
![](https://images.viblo.asia/35c40a32-916b-4eef-8b9a-9ff1b7ed9609.png)