## SwiftUI

SwiftUI là thứ thú vị nhất kể từ khi Apple công bố Swift vào năm 2014. Đây là một bước tiến lớn hướng tới mục tiêu của Apple giúp mọi người viết code đơn giản để bạn có thể dành nhiều thời gian hơn cho các tính năng tùy chỉnh khác. 

SwiftUI có thể giúp bạn! Bạn có thể xem trước ở chế độ preview SwiftUI song song với code của nó - thay đổi sang một bên thì sẽ cập nhật phía bên kia, do đó, nó luôn luôn đồng bộ hóa. Không có bất kỳ string định danh để nhận sai. Và nó có code nhưng ít hơn rất nhiều so với bạn viết bằng UIKit, vì vậy nó đơn giản hơn, dễ chỉnh sửa và dễ gỡ lỗi hơn. SwiftUI không thay thế UIKit - như Swift và Objective-C, bạn có thể sử dụng cả hai trong cùng một ứng dụng. 

Trong hướng dẫn này, bạn sẽ sử dụng SwiftUI để xây dựng một biến thể của trò chơi BullsEye. Bạn sẽ học cách bố trí UI bằng cách khai báo và sửa đổi các view và cách sử dụng các biến trạng thái để cập nhật UI của bạn. Bạn sẽ sử dụng một số công cụ mới của Xcode, đặc biệt là preview. 

## Getting Started

[Download Material](https://koenig-media.raywenderlich.com/uploads/2019/06/SwiftUI-Materials-3.zip)

Bắt đầu bằng cách download các tài liệu của hướng dẫn này - bạn có thể tìm thấy liên kết ở đầu của hướng dẫn này. Build và Run app UIKit trong thư mục **RGBullsEye-Starter**. Trò chơi này sẽ tạo ra một màu ngẫu nhiên, sau đó người chơi sẽ sử dụng ba thanh slider - cho các giá trị red, green và blue trong không gian màu RGB - để khớp với màu của được tạo ra.

Hình minh hoạ sau khi hoàn thành app:

![](https://images.viblo.asia/a00e5380-b69c-4a21-95b3-29d8666c9ff5.png)

Đã có bài viết ứng dụng này cho RWDevCon 2016 và update code lên Swift 5 cho hướng dẫn này. Nó chạy trong Xcode 10 và Xcode 11 beta. Trong hướng dẫn này, bạn sẽ sử dụng SwiftUI để tạo phiên bản cơ bản của trò chơi này.

Trong Xcode 11 beta, tạo Xcode  project mới (Shift-Command-N), chọn **iOS ▸ Single View App**, đặt tên dự án **RGBullsEye**, sau đó chọn **Use SwiftUI**:
![](https://images.viblo.asia/de8e46d5-e4fa-427f-9538-6ee54fb05014.png)

Lưu dự án của bạn ở đâu đó bên ngoài thư mục **RGBullsEye-Starter**.

## Entering the New World of SwiftUI

Trong project navigator, hãy mở thư mục **RGBullsEye** để xem những gì bạn nhận được: **AppDelegate.swift** cũ hiện tại được chia thành **AppDelegate.swift**, SceneDelegate.swift và SceneDelegate:

![](https://images.viblo.asia/d13b0434-c199-41b1-90d7-845f920440c6.png)

SceneDelegate không phải là đặc trưng của SwiftUI, chú ý dòng này là:

```
window.rootViewController = UIHostingController(rootView: ContentView())
```

UIhostingControll tạo một view controller cho SwiftUI view ContentView.

**Lưu ý**: *UIhostingController* cho phép bạn tích hợp các SwiftUI view vào app. Bạn thêm **Hosting View Controller** vào storyboard của mình và tạo một segue cho nó từ *UIViewController*. Sau đó, **Control-drag** từ segue vào viewController code để tạo *IBSegueAction*, trong đó bạn chỉ định giá trị rootView của hostingController.

Khi ứng dụng khởi động, *window* sẽ hiển thị một instance của *ContentView*, được định nghĩa trong **ContentView.swift**. Nó là một *struct* phù hợp với protocol của *View*:

```
struct ContentView: View {
  var body: some View {
    Text("Hello World")
  }
}
```

Đây là SwiftUI khai báo rằng phần *body* của *ContentView* chứa *Text* view hiển thị **Hello World**.

Xuống  trong khối *DEBUG*, *ContentViewPreview* tạo ra view chứa instance của *ContentView*.

```
#if DEBUG
struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
#endif
```

Đây là nơi bạn có thể gán dữ liệu mẫu cho bản preview. 

Có một không gian trống lớn bên cạnh code, với phần này ở phía trên top:

![](https://images.viblo.asia/db67f388-b69d-467c-830c-d68c617ccd80.png)

Nhấp vào **Resume** và đợi một lúc để xem bản preview:

![](https://images.viblo.asia/9228acc2-80b3-4bb6-ae9d-619d3641927e.png)

**Lưu ý**: Nếu bạn không thấy nút **Resume**, hãy nhấp vào nút **editor options** và chọn **Editor and Canvas**:

![](https://images.viblo.asia/1350fc0e-523b-4fea-894c-91c44b744e92.png)

Nếu bạn vẫn không thấy nút **Resume** lại, hãy chắc chắn rằng bạn đang chạy **macOS 10.15 beta**.

## Outlining Your UI

Một file mà bạn không tìm thấy được trong list là **Main.storyboard** - bạn sẽ phải tạo UI của mình bằng code SwiftUI, xem bản preview để xem nó nhìn như thế nào. Nhưng đừng lo lắng - bạn sẽ không viết hàng trăm dòng code để tạo view!

SwiftUI cần chỉ dẫn: Bạn chỉ rõ cách bạn muốn tạo UI và SwiftUI chuyển đổi các chỉ dẫn của bạn thành code để hoàn thành công việc. Apple khuyến khích bạn tạo ra nhiều view, để giữ cho code của bạn dễ đọc và bảo trì.

RGBullsEye UI có rất nhiều subView, do đó, trước tiên bạn sẽ tạo ra một bản "phát thảo". Bây giờ, sử dụng Text view placeholders.

Bắt đầu bằng cách thay thế *Text ("Hello World")* thành:

```
Text("Target Color Block")
```

Nếu bạn muốn coi nó như thế nào thì nhấp vào **Resume** để refresh bản preview.

Bây giờ **Command-Click** vào Text view trong preview và chọn **Embed in HStack**:

![](https://images.viblo.asia/c97dacf5-7f8a-4712-8843-cd77a4cfd596.png)

Lưu ý update code của bạn để phù hợp:

```
HStack {
  Text("Target Color Block")
}
```

Bạn có thể sử dụng *horizontal stack* ở đây vì bạn muốn hiển thị các khối màu dự đoán và màu ngẫu nhiên ở gần nhau.

Copy và paste câu lệnh *Text*, sau đó chỉnh sửa nó để *HStack* của bạn trông giống như sau. Lưu ý rằng bạn không tách biệt hai câu lệnh bằng dấu phẩy - chỉ cần viết từng câu trên dòng riêng của nó:

```
HStack {
  Text("Target Color Block")
  Text("Guess Color Block")
}

```

Và nó xuất hiện ở trong bản preview:

![](https://images.viblo.asia/951c7244-388e-4386-a549-3ca163fff5e9.png)

Bây giờ hãy chuẩn bị để thêm các chỗ cho các thanh slider bằng cách nhúng *HStack* vào *VStack* - lần này, Nhấp chuột vào *HStack* trong code của bạn:

![](https://images.viblo.asia/eaba3c8d-793a-4a0b-b955-6f52114be5d7.png)

Chọn **Embed in VStack**; code mới xuất hiện, nhưng phần preview không thay đổi - bạn cần thêm các view vào bên dưới.

Mở một dòng mới bên dưới closure *HStack* của bạn, nhấp vào nút + trên thanh công cụ để mở **Library**, sau đó kéo **Vertical Stack** vào dòng mới:

![](https://images.viblo.asia/592d12bd-c056-412d-bb85-ed42bbe4a75a.png)

Như bạn kỳ vọng, cả code và preview đã update:

![](https://images.viblo.asia/a1e5668f-025b-42b4-b031-783a3b9238ba.png)

Lưu ý: minimap không xuất hiện trong ảnh chụp màn hình của tôi vì tôi đã ẩn nó đi: **Editor ▸ Hide Minimap.**

Bây giờ kết thúc phác thảo của bạn, nó trông như thế này:

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

## Filling in Your Outline

Bây giờ, hãy thực hành các kỹ năng SwiftUI mới của bạn để bắt đầu điền vào các khối màu HStack, nó kiểu kiểu như thế này:

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

Mỗi khối màu có một hình chữ nhật. Khối màu mục tiêu có một Text View bên dưới hình chữ nhật của nó, trong khi khối màu dự đoán có ba text View - phần sau trong hướng dẫn này, bạn sẽ thay thế từng xxx để hiển thị các giá trị thanh slider hiện tại.

Đừng lo lắng về các hình chữ nhật màu đen trên scene - chúng sẽ sớm bị thay cho các thanh slider và bạn sẽ thiết lập background color của chúng ở phần tới.

Ở phần tiếp theo mình sẽ viết nốt các nội dung còn lại của bài hướng dẫn này.

Các bạn có thể đọc full link tutorial của tác giả tại [đây](https://www.raywenderlich.com/3715234-swiftui-getting-started)