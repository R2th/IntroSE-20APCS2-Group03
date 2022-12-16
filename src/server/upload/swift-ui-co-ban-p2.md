Các bạn có thể xem phần 1 ở [đây](https://viblo.asia/p/swift-ui-co-banp1-3P0lPEwo5ox): 

## Using "@State" Variables

Bạn có thể sử dụng các hằng số và biến bình thường trong SwiftUI, nhưng bạn chỉ định một biến là biến "@State" nếu UI sẽ update bất cứ khi nào giá trị của nó thay đổi. 

Game này là chỉ nói về màu sắc, vì vậy tất cả các biến ảnh hưởng đến màu sắc của phần guess sẽ là các biến *@State*.

Thêm các dòng này ở đầu *struct ContentView*, phía trên phần thân của closure:

```
let rTarget = Double.random(in: 0..<1)
let gTarget = Double.random(in: 0..<1)
let bTarget = Double.random(in: 0..<1)
@State var rGuess: Double
@State var gGuess: Double
@State var bGuess: Double

```

Các giá trị R, G và B nằm trong khoảng từ 0 đến 1. Bạn khởi tạo các target value là các giá trị random. 

Bạn cũng có thể khởi tạo giá trị guess là 0,5, nhưng tôi đã để chúng chưa được khởi tạo để cho bạn thấy những gì bạn phải làm nếu bạn chưa khởi tạo một vài biến.

Kéo xuống struct *ContentViewPreview*, khởi tạo *ContentView* để hiển thị trong preview. Trình khởi tạo bây giờ cần các giá trị tham số cho  các giá trị guess. Thay đổi *ContentView ()* thành như sau:

```
ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5)

```

Khi bạn tạo slider thì chúng sẽ xuất hiện trong preview với thanh kéo nằm ngay chính giữa.

Bạn cũng phải sửa đổi hàm khởi tạo trong *SceneDelegate*, trong *scene(:willConnectTo:options:)*- thay thế *ContentView () *trong dòng này:

```
window.rootViewController = UIHostingController(rootView:
  ContentView(rGuess: 0.5, gGuess: 0.5, bGuess: 0.5))

```

Khi app load root scene,  thanh kéo của slider sẽ được canh giữa.

Bây giờ thêm một thành phần chỉnh đổi màu nền trước cho **target** *Rectangle*:
```
Rectangle()
  .foregroundColor(Color(red: rTarget, green: gTarget, blue: bTarget, opacity: 1.0))

```

function *.forgroundColor* tạo *Rectangle* view mới, giờ đây với màu nền được xác định bởi các giá trị RGB được tạo random.

Tương tự, sửa đổi guess Rectangle:

```
Rectangle()
  .foregroundColor(Color(red: rGuess, green: gGuess, blue: bGuess, opacity: 1.0))

```

Vd như khi các giá trị R, G và B đều bằng 0,5 thì bạn sẽ có màu xám.

Nhấp vào **Resume** và đợi một lúc để bản preview cập nhập.

![](https://images.viblo.asia/a9509229-ac4a-4456-b362-91bb78a0381f.png)

## Making Reusable Views

Tôi đã giới thiệu trò chơi này cho một số người và họ thấy nó rất gây nghiện - đặc biệt là các nhà thiết kế đồ họa. Và sau đó họ sẽ yêu cầu tôi thực hiện một trong những không gian màu khác, như YUV. 

Nhưng RGB là một lựa chọn tốt cho hướng dẫn này, vì các thanh trượt về cơ bản là giống hệt nhau, vì vậy bạn sẽ xác định slider view, sau đó sử dụng lại cho hai thanh slider kia.

Đầu tiên, cữ nghĩ rằng là bạn không nghĩ về việc tái sử dụng và chỉ tạo thanh red slider. 

Trong các slider *VStack*, thay thế *Text("Red slider")* bằng *HStack* này:

```
HStack {
  Text("0")
    .foregroundColor(.red)
  Slider(value: $rGuess)
  Text("255")
    .foregroundColor(.red)
}

```

Bạn sửa *Text* view để thay đổi màu text thành màu đỏ. Và bạn khởi tạo *Slider* với một giá trị - vị trí thanh kéo của nó. Phạm vi mặc định là 0 đến 1.

Các bạn có thể để ý thấy $, vậy $ nghĩa là gì? Bạn đã cảm thấy quen thuộc và tiện dụng với với "?" và "!" cho các optional, và bây giờ là "$"?

Nó thực sự khá tuyệt và cực kỳ mạnh mẽ cho một biểu tượng nhỏ như vậy. 

*rGuess* tự nó chỉ là giá trị - read-only. 

*$rGuess* là một read-write binding - bạn cần nó để cập nhật foreground color của guess rectangle trong khi user thay đổi giá trị của slider.

Để thấy sự khác biệt, hãy đặt các giá trị trong ba Text view bên dưới guess rectangle:

```
HStack {
  Text("R: \(Int(rGuess * 255.0))")
  Text("G: \(Int(gGuess * 255.0))")
  Text("B: \(Int(bGuess * 255.0))")
}

```

Ở đây, bạn chỉ sử dụng các value chứ không thay đổi chúng, vì vậy bạn không cần tiền tố "$".

Đợi cho preview được refresh để xem slider của bạn:
![](https://images.viblo.asia/98688b01-527c-4de5-848e-36d7f017d031.png)

Các khối màu đã bị thu hẹp một chút, để tạo khoảng trống, nhưng slider vẫn trông hơi chật chội - label ở cuối cuối quá gần với các cạnh của window - vì vậy hãy thêm một số phần **padding** vào *HStack*:

```
HStack {
  Text("0")
    .foregroundColor(.red)
  Slider(value: $rGuess)
  Text("255")
    .foregroundColor(.red)
}
  .padding()

```

Trông nó dễ nhìn hơn rồi. :]]

![](https://images.viblo.asia/343f650e-053c-49fc-9e35-4fea64e3aec1.png)

Bây giờ, nếu bạn đã copy-paste-edit *HStack* này để tạo green slider, bạn sẽ đổi *.red* thành *.green* và *$rGuess* thành *$gGuess*.

**Command-Click** vào red slider *HStack* và chọn **Extract Subview**:

![](https://images.viblo.asia/4fa53747-e396-4316-940f-006c0938024b.png)

Cái này hoạt động tương tự như **Refactor ▸ Extract to Function**, nhưng cái này là dành cho SwiftUI view.


Đừng lo lắng về tất cả các thông báo lỗi xuất hiện - chúng sẽ biến mất khi bạn chỉnh sửa xong các subview.


Đặt tên cho *ExtractedView* **ColorSlider**, sau đó thêm các dòng này ở trên cùng, trước phần thân của closure:

```
@Binding var value: Double
var textColor: Color

```

Sau đó thay thế *$rGuess* bằng *$value* và *.red* bằng *textColor*:

```
Text("0")
  .foregroundColor(textColor)
Slider(value: $value)
Text("255")
  .foregroundColor(textColor)

```

Sau đó quay trở lại *ColorSlider ()* trong *VStack* và thêm các tham số:

```
ColorSlider(value: $rGuess, textColor: .red)

```

Kiểm tra xem bản preview hiển thị red slider như thế nào, sau đó sao copy-paste-edit dòng này để thay thế chỗ dành cho *Text* bằng hai thanh slider khác:

```
ColorSlider(value: $gGuess, textColor: .green)
ColorSlider(value: $bGuess, textColor: .blue)

```

Click **Resume** to update the preview:

![](https://images.viblo.asia/8b81e15a-d3c1-487b-8730-b42f26d43409.png)

Và đó là gần như toàn bộ ứng dụng được thực hiện! 

Bây giờ chúng ta sẽ thử 1 tính năng thú vị của swift UI: Xuống dưới góc dưới bên phải của thiết bị xem trước, nhấp vào button **live preview**:

![](https://images.viblo.asia/d1519c08-bb7f-4ba3-84bd-a250817dec46.png)

Live preview cho phép user tương tác với bản preview giống như khi app của bạn đang chạy trong trình giả lập - tuyệt vời!

Đợi **Preview spinner** dừng lại; nếu cần, nhấp **Try Again**.

Bây giờ di chuyển những thanh slider để phù hợp với màu sắc!

![](https://images.viblo.asia/f760b05e-9740-4456-838c-1313e9574675.png)

## Presenting an Alert

Sau khi sử dụng các thanh slider để có được màu sắc phù hợp, user ấn nút Hit Me, giống như trong trò chơi BullsEye ban đầu. 

Và cũng giống như trong BullsEye, một *Alert* sẽ xuất hiện để hiển thị điểm số.

Đầu tiên, thêm một phương thức vào *ContentView* để tính điểm. Giữa các biến @State và phần thân hãy thêm method này:

```
func computeScore() -> Int {
  let rDiff = rGuess - rTarget
  let gDiff = gGuess - gTarget
  let bDiff = bGuess - bTarget
  let diff = sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff)
  return Int((1.0 - diff) * 100.0 + 0.5)
}

```

Giá trị *diff* chỉ là khoảng cách giữa hai điểm trong không gian ba chiều - lỗi đoán sai của user. 

Tiếp theo, thay thế *Text("Hit me button")* bằng *Button* view:

```
Button(action: {

}) {
  Text("Hit Me!")
}

```

một *Button* có action và text giống như UIButton. Action bạn muốn xảy khi present Alert. 

Nhưng nếu bạn chỉ tạo Alert trong phần action của Button thì nó sẽ không làm gì cả.

Thay vào đó, bạn tạo Alert dưới dạng như một subview của ContentView và thêm biến @State loại Bool. 

Sau đó, bạn đặt giá trị của biến này thành *true* khi bạn muốn *Alert* xuất hiện - trong phần Action của button, trong trường hợp này. 

Giá trị đặt lại thành *false* - để ngừng hiển thị alert - khi user dismiss Alert.

Vì vậy, thêm biến @State này, khởi tạo thành false:

```
@State var showAlert = false

```

Sau đó thêm dòng này vào phần action của button:

```
self.showAlert = true

```

Bạn cần *self* vì *showAlert* đang ở trong một closure.

Cuối cùng hãy add alert vào Button. Button view của bạn trông như thế này:

```
Button(action: {
  self.showAlert = true
}) {
  Text("Hit Me!")
}
.alert(isPresented: $showAlert) {
  Alert(title: Text("Your Score"), message: Text("\(computeScore())"))
}

```

Bạn vượt qua ràng buộc *$showAlert* vì giá trị của nó sẽ thay đổi khi user dismiss alert và thay đổi này sẽ làm view cập nhật.

SwiftUI có các trình khởi tạo đơn giản cho alert view, giống như các phần extension mà developer hay làm cho UIAlertViewController.

Nó có 1 nút OK mặc định, do đó bạn thậm chí không cần đưa nó làm tham số.

Tắt **live preview**, nhấp vào **Resume** làm refresh preview, sau đó bật l**ive preview** và thử đoán màu mục tiêu:

![](https://images.viblo.asia/18e96935-779c-4877-b18a-aa928aab505b.png)

Khi bạn có live preview thì ai cần iOS Simulator? Mặc dù nếu bạn chạy ứng dụng của mình trong trình giả lập, bạn có thể xoay nó sang ngang:

![](https://images.viblo.asia/c95117e4-35ad-42f2-9152-e9fccafbb18b.png)

link bài gốc: [link](https://www.raywenderlich.com/3715234-swiftui-getting-started)