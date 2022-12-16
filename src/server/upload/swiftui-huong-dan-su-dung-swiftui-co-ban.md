Trong chương này, bạn sẽ:
• Tìm hiểu cách sử dụng canvas Xcode để tạo giao diện người dùng song song với mã của nó và xem cách chúng duy trì đồng bộ, khi thay đổi một bên luôn cập nhật bên còn lại.
• Tạo Reusable View cho các slider.
• Tìm hiểu về các biến @State và sử dụng chúng để cập nhật giao diện người dùng bất cứ khi nào giá trị trạng thái thay đổi.

# Bắt đầu
![](https://images.viblo.asia/2c4f5023-7483-4b93-83ab-626a7a5e0c84.png)

Ứng dụng này hiển thị màu target là màu đỏ, lục và lam được tạo ngẫu nhiên. Người dùng di chuyển các slider để làm cho khối màu bên trái khớp với bên phải. 
Chúng ta sắp tạo một ứng dụng SwiftUI thực hiện chính xác điều tương tự, nhưng nhanh chóng hơn

# Tạo mới SwiftUI Project
Tạo dự án Xcode mới (**Shift-Command-N**), chọn iOS ▸ **Single View App**, đặt tên cho dự án là **RGBullsEye**, sau đó chọn **Use SwiftUI**:

![](https://images.viblo.asia/f73a5d0e-c9b1-48da-8061-a86e34ce95ce.png)

Lưu dự án của bạn ở đâu đó bên ngoài thư mục RGBullsEye-Starter.
Trong trình điều hướng dự án, mở nhóm RGBullsEye để xem những gì bạn có: AppDelegate.swift, hiện được chia thành AppDelegate.swift và SceneDelegate.swift. 

![](https://images.viblo.asia/d3e46fea-ca53-4047-88af-03ad6da66fbb.png)

Bản thân SceneDelegate không dành riêng cho SwiftUI, nhưng dòng này là:

```
 window.rootViewController = UIHostingController(rootView:
ContentView())
```

UIhostingControll tạo một viewController cho ContentView xem SwiftUI.

> Lưu ý: UIhostingControll cho phép bạn tích hợp các chế độ xem SwiftUI vào một ứng dụng hiện có.

Khi ứng dụng khởi động, window sẽ hiển thị một phiên bản của ContentView, được xác định trong ContentView.swift. Đây là một struct kế thừa từ View:
```
struct ContentView: View {
  var body: some View {
    Text("Hello World")
  }
}
```

Đây là SwiftUI tuyên bố rằng phần thân của ContentView chứa một **Text view** hiển thị **Hello World**.

# Preview ContentView của bạn
Trong DEBUG, ContentView_Preview chứa ContentView:

```
#if DEBUG
struct ContentView_Previews : PreviewProvider {
  static var previews: some View {
    ContentView()
  }
} #endif
```

Đây là nơi bạn có thể chỉ định dữ liệu mẫu cho bản xem trước và bạn có thể so sánh các kích thước font chữ và bảng màu khác nhau. Nhưng xem trước ở đâu?
Có một khoảng trống lớn bên cạnh mã, ở trên cùng:
![](https://images.viblo.asia/b1fbb9e6-eeae-402d-a7a2-cd42069ec6d3.png)

Nhấp vào **Resume** và đợi một lúc, để xem preview:

![](https://images.viblo.asia/e39cff6d-2462-4135-ad73-b2436187e523.png)

> Lưu ý: Nếu bạn không thấy nút **Resume**, hãy nhấp vào nút **Editor Options** và chọn **Canvas**:
> 
![](https://images.viblo.asia/bc10b51f-6c47-40bf-b220-904b5e9ac6ed.png)

Nếu bạn vẫn không thấy nút **Resume**, hãy đảm bảo bạn đang chạy macOS Catalina (10.15).

> Lưu ý: Thay vì nhấp vào nút **Resume**, bạn có thể sử dụng phím tắt rất hữu ích **Option-Command-P**. Nó hoạt động ngay cả khi nút **Resume** không hiển thị.
> 
# Preview ở landscape

RGBullsEye trông tốt nhất ở hướng landscape. Tuy nhiên, tại thời điểm viết bài, Xcode 11 beta không cung cấp một cách dễ dàng để preview theo hướng ngang. Hiện tại, bạn phải chỉ định các giá trị chiều rộng và chiều cao cố định trong bên trong thuộc tính static previews, thêm công cụ sửa đổi `previewLayout` vào `ContentView()`:

```
ContentView().previewLayout(.fixed(width: 568, height: 320))
```

Các giá trị này hiển thị window cỡ iPhone SE theo hướng ngang.
Để xem danh sách kích thước cho các mẫu iPhone khác, hãy truy cập, xem bài viết này, "Hướng dẫn cơ bản về độ phân giải iPhone" mà bạn có thể truy cập tại đây: bit.ly/29Ce3Ip.

> Lưu ý: Để tiết kiệm một số không gian hiển thị ở đây, tôi đặt bố cục trình chỉnh sửa thành Canvas on Bottom.
> 

![](https://images.viblo.asia/28774bca-58bb-400b-a0fd-9878024a1c9e.png)

# Tạo UI của bạn
1. **Embed** Text view trong VStack và chỉnh sửa text.
2. Thêm Color view vào stack.

**Bước 1**: Nhấp chuột vào **Hello World** trong canvas—notice Xcode và chọn **Embed in VStack**:

![](https://images.viblo.asia/ee807745-e7f0-44d4-a871-d442fe01cf73.png)

Khung vẽ trông giống nhau, nhưng giờ đây đã có VStack trong mã của bạn.
Thay đổi "Hello World" thành "Match this color": Bạn có thể thực hiện điều này trực tiếp trong mã, nhưng, để bạn biết bạn có thể làm điều này, hãy chuột phải vào Text view và chọn **Inspect...**:

![](https://images.viblo.asia/cda4798d-96be-48db-8292-4c08288555d1.png)

Sau đó chỉnh sửa văn bản trong inspector:

![](https://images.viblo.asia/0b88db1e-3722-43eb-9956-950455662e62.png)

**Bước 2**: Nhấp vào nút + trên thanh công cụ để mở **Library**. Tìm kiếm **Color**. Sau đó kéo đối tượng này vào Text view trong khung vẽ; trong khi kéo, di chuyển con trỏ xuống cho đến khi bạn thấy gợi ý **Insert Color Into Vertical Stack** - Không phải **Add Color to a new Vertical Stack along with existing Vertical Stack** nhưng giữ con trỏ ở gần đầu của text view, sau đó thả ra.

![](https://images.viblo.asia/fec741d2-f6c3-49b1-9d57-91dcad0bc1a6.png)

Và nó sẽ tự động có Color view của bạn bên trong VStack, trong cả khung canvas và mã của bạn!

![](https://images.viblo.asia/b554f316-76cf-4955-b3a4-6015ca81bd8c.png)

> Lưu ý: Trong IB, bạn có thể kéo một số đối tượng vào view, sau đó chọn tất cả và nhúng vào stack view. Nhưng lệnh SwiftUI Embed chỉ hoạt động trên một đối tượng.
> 

# Tạo một Color block

Trong SwiftUI, việc chọn các đối tượng lồng nhau trong mã dễ dàng hơn trong canvas. Trong mã của bạn, **Command-click** vào VStack và chọn **Embed in HStack**.

![](https://images.viblo.asia/458bfd4a-ecbe-4d6a-b56b-04edaaf1ebbf.png)

Sau đó copy closure VStack, dán nó vào HStack và thay đổi Văn bản trong VStack thứ hai thành "R: 127 G: 127 B: 127". HStack của bạn bây giờ trông như thế này:

```
HStack {
  VStack {
    Color(red: 0.5, green: 0.5, blue: 0.5)
    Text("Match this color")
  }
  VStack {
    Color(red: 0.5, green: 0.5, blue: 0.5)
    Text("R: 127  G: 127  B: 127")
  }
}
```

# Tạo Button và Slider

Trong ứng dụng gốc, nút **Hit me!** và Slider màu đi bên dưới các khối màu; một lần nữa container view là cần thiết. Để đạt được kết quả mong muốn, bạn cần đặt HStack với các khối màu ở bên trong VStack.
> Lưu ý: Để giữ **Library** mở, **Option-click** vào nút **+**.

Đầu tiên, trong mã của bạn, nhúng HStack vào VStack, sau đó kéo Nút từ **Library** vào mã của bạn: Di chuyển bên dưới dấu ngoặc đóng của HStack cho đến khi một dòng mới mở ra để bạn thả đối tượng.![](https://images.viblo.asia/f1a6fb16-9d51-4cfc-90df-f8f5d87209a7.png)
Nhấn **Option-Command-P** hoặc nhấp vào **Resume** để xem nút của bạn:

![](https://images.viblo.asia/6da94350-ec0f-49e6-a2c3-a111003ffde4.png)

Bây giờ, nút này cho biết rõ cạnh dưới của VStack ở đâu, bạn có thể kéo Slider từ Thư viện lên khung vẽ của mình, ngay bên dưới Button:

![](https://images.viblo.asia/f1a6fb16-9d51-4cfc-90df-f8f5d87209a7.png)

Thay đổi Văn bản Button thành "**Hit Me!**" Và đặt giá trị Slider thành **.constant (0,5)**. 

![](https://images.viblo.asia/9de0fecd-fcbc-4b80-ac38-f089ec9729ef.png)

> Lưu ý: Nếu thumb của Slider không ở giữa, nhấn **Option-Command-P**.
> 

Bạn cần 3 slider, nhưng các giá trị của slider sẽ cập nhật trên giao diện người dùng, vì vậy trước tiên bạn sẽ thiết lập thanh trượt màu đỏ, sau đó sao chép nó cho hai thanh trượt khác.

# Cập nhật trên UI
Bạn có thể sử dụng các hằng và biến "normal" trong SwiftUI, nhưng nếu UI cập nhật khi giá trị của nó thay đổi, bạn chỉ định một biến là biến @State. 

Trong SwiftUI, khi biến @State thay đổi, chế độ xem sẽ vô hiệu hóa giao diện của nó và tính toán lại phần thân. Để thấy điều này trong thực tế, bạn sẽ phải đảm bảo các biến ảnh hưởng đến màu là các biến @State

# Sử dụng biến @State
Thêm các thuộc tính này ở đầu struct ContentView, phía trên thuộc tính body:
```
let rTarget = Double.random(in: 0..<1)
let gTarget = Double.random(in: 0..<1)
let bTarget = Double.random(in: 0..<1)
@State var rGuess: Double
@State var gGuess: Double
@State var bGuess: Double
```

Cuộn xuống khối DEBUG, khởi tạo ContentView để hiển thị trong preview. Bây giờ cần các giá trị tham số cho các giá trị. Thay đổi ContentView() thành:

```
ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5)
```

Điều này đảm bảo thumb của thanh trượt được căn giữa khi xem ở preview.
Bạn cũng phải sửa đổi trình khởi tạo trong SceneDelegate, trong `scene(_:willConnectTo:options:) — replace ContentView()`:

```
 window.rootViewController = UIHostingController(rootView:
  ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5))
```

Khi ứng dụng load root scene, thumb của slider sẽ được căn giữa.

# Cập nhật Color views

Trong VStack chứa Text("Match this color"), chỉnh sửa Color view để sử dụng các target value:
```
Color(red: rTarget, green: gTarget, blue: bTarget)
```

Nhấn **Option-Command-P** để xem màu ngẫu nhiên.

![](https://images.viblo.asia/b3040790-e545-4a33-9410-22a6fbec213d.png)

Tương tự, sửa đổi guess color:

```
Color(red: rGuess, green: gGuess, blue: bGuess)
```

Khi các giá trị R, G và B đều bằng 0,5, bạn sẽ có màu xám. Để kiểm tra các giá trị guess này có hoạt động hay không, hãy thay đổi chúng trong phần preview ví dụ:

```
static var previews: some View {
  ContentView(rGuess: 0.7, gGuess: 0.3, bGuess: 0.6)
    .previewLayout(.fixed(width: 568, height: 320))
}
```

Và xem preview nó cho một cái gì đó như thế này:

![](https://images.viblo.asia/245045d6-494b-4e0f-ba37-489a90c43c5a.png)

# Tạo View tái sử dụng
Vì các thanh trượt về cơ bản là giống hệt nhau, bạn sẽ xác định một slider sau đó sử dụng lại cho hai slider kia chính xác như Apple khuyến nghị.

# Làm silder màu đỏ
Nhúng Slider trong HStack, sau đó chèn Text view ở trên và bên dưới (bằng mã) hoặc sang trái và phải (trong khung vẽ). Thay đổi Placeholder thành 0 và 255, sau đó cập nhật preview để xem nó trông như thế nào:

![](https://images.viblo.asia/ee4343a5-e013-4efd-ab5e-70f4c5b29b3e.png)

Chỉnh sửa mã HStack trông như thế này:

```
HStack {
  Text("0").foregroundColor(.red)
  Slider(value: $rGuess)
  Text("255").foregroundColor(.red)
}.padding(.horizontal)
```

Bạn đã sửa đổi các text view thành màu đỏ, đặt giá trị slider thành $rGuess, vị trí của thumb và sửa đổi HStack với padding horizontal. Nhưng những gì với $? Bạn sẽ sớm tìm ra thực tế, nhưng trước tiên, hãy kiểm tra xem nó có hoạt động không.

Thay đổi rGuess thành một cái gì đó khác 0,5, sau đó nhấn **Option-Command-P**:

![](https://images.viblo.asia/8612927d-b1bd-44f7-93fa-989d3bb47863.png)

Tuyệt, tôi đã đặt rGuess thành 0,8 và thumb của slider đã đúng nơi tôi mong đợi! Và các con số có màu đỏ, và không bị đè lên các cạnh.

# Bindings
Để thấy sự khác biệt, hãy đặt các giá trị trong Text View bên dưới Color View: Thay đổi Text("R: 127 G: 127 B: 127") thành như sau:

```
Text("R: \(Int(rGuess * 255.0))"
  + "  G: \(Int(gGuess * 255.0))"
  + "  B: \(Int(bGuess * 255.0))")
```
Ở đây, bạn chỉ sử dụng (read-only) cho các giá trị, không thay đổi chúng, vì vậy bạn không cần tiền tố $.
Nhấn **Option-Command-P**:

![](https://images.viblo.asia/7e37eaa1-0085-4a74-9567-5c2fc2516aa7.png)

Và bây giờ, giá trị R là 204, tức là 255 * 0,8.

# Trích xuất các subview
Bây giờ, mục đích của phần này là tạo ra một reusable view có thể sử dụng lại từ slider màu đỏ HStack. Để có thể tái sử dụng, reusable view sẽ cần một số tham số. Nếu bạn đã Copy- Paste-Edit HStack này để tạo thanh trượt màu xanh lá cây, bạn sẽ đổi .red thành .green và $rGuess thành $gGuess. Đó là những thông số của bạn.
Nhấp chuột vào slider màu đỏ HStack và chọn **Extract Subview**:

![](https://images.viblo.asia/1d55c088-891c-4f39-a63b-c6a2cfac460b.png)

Điều này hoạt động tương tự như **Refactor** ▸ **Extract to Function**, nhưng đối với các SwiftUI view. Đừng lo lắng về tất cả các thông báo lỗi xuất hiện; nó sẽ biến mất khi bạn hoàn thành chỉnh sửa subview mới của bạn.
Đặt tên cho view được trích xuất ColorSlider, sau đó thêm các thuộc tính này ở trên cùng, trước các thuộc tính body:
```
 @Binding var value: Double
var textColor: Color
```

Đối với biến giá trị, bạn sử dụng @Binding thay vì @State, vì ColorSlider view không sở hữu dữ liệu này. Nó nhận được giá trị ban đầu từ parent view và thay đổi nó.
Bây giờ, thay thế $rGuess bằng $value và .red bằng textColor:

```
 Text("0").foregroundColor(textColor)
Slider(value: $value)
Text("255").foregroundColor(textColor)
```

Sau đó quay trở lại ColorSlider() trong VStack và thêm các tham số của bạn:

```
ColorSlider(value: $rGuess, textColor: .red)
```

Kiểm tra xem preview vẫn hiển thị chính xác slider màu đỏ, sau đó Copy-Paste-Edit dòng này để thay thế text placeholders bằng hai slider khác:

```
 ColorSlider(value: $gGuess, textColor: .green)
ColorSlider(value: $bGuess, textColor: .blue)
```

Thay đổi giá trị trong mã, sau đó cập nhật preview:

![](https://images.viblo.asia/9088ec28-b745-4a57-9df6-a206bf769992.png)

Mọi thứ đều hoạt động! 
Cảm ơn tất các bạn đã theo dõi tới đây bài viết!
Nguồn: SwiftUI by Tutorial