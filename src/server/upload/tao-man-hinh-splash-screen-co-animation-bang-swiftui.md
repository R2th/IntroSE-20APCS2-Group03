[**Download Materials** ](https://koenig-media.raywenderlich.com/uploads/2019/09/Fuber.zip)

Hãy làm một màn splash thật tuyệt - đây cũng là nơi để các developer làm các animation thú vị khi ứng dụng loading data cần thiết để hoạt động. 

Trong hướng dẫn này màn hình splash sẽ không phải là màn tĩnh, chỉ show 1 bức ảnh nhàm chán khi loading và không có animation mà chúng ta sẽ làm một màn hình loading có animation hấp dẫn thú vị.

Nó đóng một vai trò quan trọng trong app: Giữ user trong khi họ đợi ứng dụng khởi động. =))

Hướng dẫn này sẽ hướng dẫn bạn từng bước từ một app không có màn hình splash thành một app có màn hình splash thú vị.

## Getting Started

Trong hướng dẫn này, bạn sẽ cải tiến một app có tên là **Fuber**. Fuber là một dịch vụ chia sẻ đi xe theo yêu cầu, cho phép hành khách yêu cầu tài xế Segway vận chuyển họ đến các địa điểm khác nhau trong thành phố.

![](https://images.viblo.asia/df5362b5-587a-413a-a555-b73e8e718e23.png)

Sử dụng nút **Download Materials** ở đầu trang này để tải xuống project để bắt đầu hướng dẫn này.

Sau đó, mở dự án khởi động và nhìn xem qua.

Như bạn có thể thấy trong **ContentView.swift**: tất cả các ứng dụng hiện đang làm là hiển thị *SplashScreen* trong 2 giây và sau đó làm mờ nó đi để hiển thị *MapView*.

Màn hình splash nằm trong file riêng của nó: SplashScreen.swift. Bạn có thể thấy rằng nó có nền màu xanh lam Fuber với label "F ber". Bạn sẽ làm thêm animation cho chữ "U" ở phần tiếp theo của hướng dẫn này.

Build and run để khởi động project.

![](https://images.viblo.asia/c975bce7-30b0-4482-a899-c5856670bbb2.gif)

Bạn sẽ thấy một màn hình static splash khá nhàm chán và nó chuyển tiếp vào Map (màn hình chính Fuber của) sau một vài giây. :((

Chúng ta sẽ dành thời gian còn lại của hướng dẫn này chuyển nhàm chán static splash screen này thành một màn hình có animation.Nó sẽ làm cho user của bạn muốn màn hình chính sẽ không bao giờ được tải :]]. 

Hãy xem những gì chúng ta sẽ làm:

![](https://images.viblo.asia/0781bde7-00f7-4614-ac14-eb2a289bf468.gif)

Lưu ý: Nếu bạn đang chạy bản beta macOS Catalina, bạn có thể sử dụng "live preview" thay cho việc build and run trên simulator.

## Understanding the Composition of Views and Layers

SplashScreen mới sẽ được cải tiến sẽ bao gồm một số cuộc *subView*, tất cả đều được đặt trong ZStack:

+ Grid background bao gồm các ô ảnh. nó sẽ tự lặp lại hình ảnh khi màn hình vượt qua kich thước ảnh, cái này chỉ để làm nền trang trí hoa văn lá hẹ cho đẹp đội hình thôi :v .
+ Text "F ber".
+ Hình tròn background trắng cho chữ "U".
+ Một hình vuông giữa FuberU.
+ Một đường thẳng giữ FuberU hướng lên trên.
+ Một Spacer view để đảm bảo ZStack phủ toàn bộ màn hình.

Kết hợp các view trên lại để tạo tra Fuber có animation chữ "U".

![](https://images.viblo.asia/25088e74-e1fb-4340-b564-9885e72900fb.gif)

khởi động dự án được cung cấp các Text và Spacer view. Bạn sẽ thêm phần còn lại của các view trong các phần sau.

Bây giờ chúng ta bắt đầu tạo và tạo animation cho FuberU.

## Animating the Circle

Mở **ContentView.swift** và comment vài dòng code trong *.onAppear*. Nó sẽ giống như thế này:

```
.onAppear {
//DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
//  withAnimation() {
//    self.showSplash = false
//  }
//}
}
```

Bằng cách này, bạn đã không phân tâm bởi màn hình splash mờ dần rồi hiển thị MapView sau X giây.

Đừng lo lắng, chúng ta sẽ chỉnh lại khi animation đã hoàn thành.

Bây giờ bạn có thể tập trung vào animation. 

Mở file **SplashScreen.swift**, ngay bên tại dưới closure của *SplashScreen*, thêm một **struct** mới gọi là *FuberU*:

```
struct FuberU: Shape {
  var percent: Double
  
  // 1
  func path(in rect: CGRect) -> Path {
    let end = percent * 360
    var p = Path()

    // 2
    p.addArc(center: CGPoint(x: rect.size.width/2, y: rect.size.width/2),
             radius: rect.size.width/2,
             startAngle: Angle(degrees: 0),
             endAngle: Angle(degrees: end),
             clockwise: false)
    
    return p
  }  
  // 3
  var animatableData: Double {
    get { return percent }
    set { percent = newValue }
  }
}
```

Đây là những gì bạn đã làm ở trên:
1. Implement hàm path(in: ) được yêu cầu từ protocol *Shape*.
2. Sử dụng path để vẽ một vòng cung bắt đầu từ 0 và kết thúc ở 360, tức là một vòng tròn đầy đủ.
3. Thêm một property để giúp SwiftUI biết tiến độ của animation.

Thêm các biến này ngay trước phần body trong struct *SplashScreen*:
```
@State var percent = 0.0
let uLineWidth: CGFloat = 5
```

Bạn sẽ sử dụng các biến này khi tinh chỉnh và sửa đổi *FuberU* animation về sau. 

Thêm code sau vào bên dưới struct *SplashScreen*:

```
extension SplashScreen {
  var uAnimationDuration: Double { return 1.0 }
    
  func handleAnimations() {
    runAnimationPart1()
  }

  func runAnimationPart1() {
    withAnimation(.easeIn(duration: uAnimationDuration)) {
      percent = 1
    }
  }
}
```

handleAnimations () sẽ là nơi cho thực hiện trình tự các phần khác nhau của animation phức tạp của màn hình splash. 

Sau đó, thêm code sau vào bên trong phần *body*, giữa các phần *Text* và *Spacer*.

```
FuberU(percent: percent)
 .stroke(Color.white, lineWidth: uLineWidth)
 .onAppear() {
   self.handleAnimations()
 }
 .frame(width: 45, height: 45, alignment: .center)
```

Ở đây, bạn vừa thêm vòng tròn mới và nó sẽ đại diện cho một phần của chữ "U" trong Fuber, vào stack tại một nơi cụ thể. Ngoài ra, bạn sẽ gọi *handleAnimations ()* khi view appear được kích hoạt.

Build and run:

![](https://images.viblo.asia/1e93b22f-5c0a-49cd-b38e-fc5585a0ad96.gif)

Bạn có thể thấy điều gì chưa chính xác như những gì mình có thể mong đợi.

Code của bạn thực sự đang vẽ một vòng tròn, nhưng chỉ một lần duy nhất và đường viền của vòng tròn quá mỏng.

Bạn muốn nó lấp đầy toàn bộ vòng tròn. 

## Improving the Circle Animation

Thêm code này ngay sau *runAnimationPart1()* :

```
func restartAnimation() {
  let deadline: DispatchTime = .now() + uAnimationDuration
  DispatchQueue.main.asyncAfter(deadline: deadline) {
    self.percent = 0
    self.handleAnimations()
  }
}
```

Và để gọi method trên, hãy thêm dòng này vào cuối của *handleAnimations()*:

```
restartAnimation()
```

Code này giúp lặp lại animation bằng cách đợi thời lượng của nó để thiết lập lại *percent* và sau đó gọi lại animation.

Bây giờ animation vòng tròn đã lặp lại.

Bạn có thể thêm một vài biến giúp cho việc tinh chỉnh các tham số animation để làm cho nó ngon hơn.

Thêm các biến mới này trước body:

```
@State var uScale: CGFloat = 1
let uZoomFactor: CGFloat = 1.4
```

Bây giờ, giữa stroke(:lineWidth:) và onAppear() trên FuberU, hãy thêm vài dòng code này:

```
.rotationEffect(.degrees(-90))
.aspectRatio(1, contentMode: .fit)
.padding(20)
```

Cuối cùng, thêm scaleEffect(:anchor:) tại ngay trên frame(width:height:alignment:):

```
.scaleEffect(uScale * uZoomFactor)
```

*FuberU* của bạn bây giờ trông như thế này:

```
FuberU(percent: percent)
  .stroke(Color.white, lineWidth: uLineWidth)
  .rotationEffect(.degrees(-90))
  .aspectRatio(1, contentMode: .fit)
  .padding(20)
  .onAppear() {
    self.handleAnimations()
  }
  .scaleEffect(uScale * uZoomFactor)
  .frame(width: 45, height: 45, alignment: .center)
```

Code này đã làm cho đường kẻ rộng hơn, thêm một vòng xoay để bản vẽ bắt đầu từ trên cùng và thêm hiệu ứng tỷ lệ để vòng tròn phát triển trong khi animation.

Thêm dòng sau vào runAnimationPart1() tại ngay trong block animation, phía sau dòng percent = 1, thêm:

```
uScale = 5
```

Build and run:

![](https://images.viblo.asia/fbd826f3-1c99-4b0a-a121-cb730e99acb4.gif)

Bây giờ vòng tròn đã hoạt động như ta mong đợi - App của bạn vẽ một vòng tròn trắng từ 0 đến 360 độ.

Bạn có thể nhận thấy rằng vòng tròn chỉ tăng kích thước trong chu kỳ vẽ đầu tiên. 

Điều đó bởi vì bạn không chỉnh lại uScale.

Đừng lo, bạn sẽ làm trong bước tiếp theo của hướng dẫn.

## Adding the Square

Hãy thêm các trạng thái và property mới này trước phần body, nó phụ vụ cho việc tinh chỉnh sau khi hướng dẫn hoàn thành, giúp các bạn điều chỉnh param để tạo ra aimation tốt hơn, hay để nghịch phá để hiểu rõ hơn cách code chạy :)) :

```
@State var squareColor = Color.white
@State var squareScale: CGFloat = 1

let uSquareLength: CGFloat = 12
```

Thêm hình vuông tại trung tâm, ngay sau FuberU trong ZStack:

```
Rectangle()
  .fill(squareColor)
  .scaleEffect(squareScale * uZoomFactor)
  .frame(width: uSquareLength, height: uSquareLength, alignment: .center)
  .onAppear() {
      self.squareColor = self.fuberBlue
  }
```

Build and run

![](https://images.viblo.asia/63530e98-4842-467d-b44f-6c5ae170a7f3.gif)

Như bạn có thể thấy, vòng tròn xuất hiện phía sau hình vuông, nhưng không có animation.

Chúng sẽ thêm tất cả các layer cho đủ trước và sau đó sẽ xử lý các animation theo đúng thứ tự.

## Adding the Line

Bây giờ, bạn sẽ cần thêm đường thằng để làm cho hình vuông thành chữ "U".

Thêm các property sau vào ngày tại nơi đặt các property cũ:

```
@State var lineScale: CGFloat = 1

let lineWidth:  CGFloat = 4
let lineHeight: CGFloat = 28
```

Sau đó thêm Rectangle view ở cuối *ZStack*  ngay trước *Spacer*.

```
Rectangle()
  .fill(fuberBlue)
  .scaleEffect(lineScale, anchor: .bottom)
  .frame(width: lineWidth, height: lineHeight, alignment: .center)
  .offset(x: 0, y: -22)
```

Build and run:

![](https://images.viblo.asia/7dcd5595-7a06-454d-8cef-6fbf85268ea0.gif)

Bây giờ bạn đã có tất cả các thành phần cho Fuber "U". 

## Completing the U Animation

Animation "U", bạn muốn thực hiện có ba giai đoạn:
1) Vòng tròn phóng to khi nó vẽ.
2) Vòng tròn nhanh chóng thu nhỏ thành một hình vuông.
3) Nó sẽ mờ dần.

Bạn sẽ sử dụng ba giai đoạn này khi bạn mở rộng handleAnimations().

Thêm các property này ngay sau *uAnimationDuration*:

```
var uAnimationDelay: Double { return  0.2 }
var uExitAnimationDuration: Double{ return 0.3 }
var finalAnimationDuration: Double { return 0.4 }
var minAnimationInterval: Double { return 0.1 }
var fadeAnimationDuration: Double { return 0.4 }
```

 Hãy thay đổi các param để xem bạn có cảm thấy họ cải tiến animation hay chỉ để giúp bạn dễ hiểu hơn về cách nó hoạt động.

Thêm một dòng nữa vào cuối runAnimationPart1(), ngay sau uScale = 5:

```
lineScale = 1
```

Thêm đoạn code sau vào cuối runAnimationPart1(), ngay sau khi block animation kết thúc với dấu "}":

```
//TODO: Add code #1 for text here

let deadline: DispatchTime = .now() + uAnimationDuration + uAnimationDelay
DispatchQueue.main.asyncAfter(deadline: deadline) {
  withAnimation(.easeOut(duration: self.uExitAnimationDuration)) {
    self.uScale = 0
    self.lineScale = 0
  }
  withAnimation(.easeOut(duration: self.minAnimationInterval)) {
    self.squareScale = 0
  }
    
  //TODO: Add code #2 for text here
}   
```

 Thêm phần này sau dấu "}" của runAnimationPart1():

```
func runAnimationPart2() {
  let deadline: DispatchTime = .now() + uAnimationDuration + 
    uAnimationDelay + minAnimationInterval
  DispatchQueue.main.asyncAfter(deadline: deadline) {
    self.squareColor = Color.white
    self.squareScale = 1
  }
}   
```

Chắc chắn rằng chúng ta gọi runAnimationPart2 ngay sau khi gọi runAnimationPart1 () trong handleAnimations():

```
runAnimationPart2()
```

Bây giờ, thêm phần thứ ba của animation sau runAnimationPart2():
```
func runAnimationPart3() {
  DispatchQueue.main.asyncAfter(deadline: .now() + 2 * uAnimationDuration) {
  withAnimation(.easeIn(duration: self.finalAnimationDuration)) {
    //TODO: Add code #3 for text here
    self.squareColor = self.fuberBlue
  }
  }
}
```

Bây giờ, hãy thêm animation mới vào handleAnimations(), ngay sau khi runAnimationPart2 ():

```
runAnimationPart3()
```

Thay thế restartAnimation () bằng code mới này:

```
func restartAnimation() {
    let deadline: DispatchTime = .now() + 2 * uAnimationDuration + 
      finalAnimationDuration
    DispatchQueue.main.asyncAfter(deadline: deadline) {
      self.percent = 0
      //TODO: Add code #4 for text here
      self.handleAnimations()
    }
}
```

Build and run:

![](https://images.viblo.asia/7a406d0b-0981-4f43-b5bd-6ede382e629a.gif)

Nếu bạn nhìn animation hoàn thành, bạn sẽ thấy rằng text bắt đầu trong suốt và nhỏ, sau đó mờ dần, phóng to với theo hiệu ứng lò xo và cuối cùng là biến mất.

## Animating the Background

Bạn sẽ bắt đầu bằng cách thêm background cho ZStack. Vì nó là blackground, nên nó nằm ở mặt sau của stack, vì vậy nó phải xuất hiện đầu tiên trong code. Để thực hiện việc này, hãy thêm Image view làm thành phần đầu tiên của *ZStack* của *SplashScreen*:

```
Image("Chimes")
  .resizable(resizingMode: .tile)
  .opacity(textAlpha)
  .scaleEffect(textScale)
```

Điều này sử dụng asset *Chimes* để tạo các ô ảnh lấp đầy toàn bộ màn hình. 

Lưu ý rằng bạn sử dụng *textAlpha* và *textScale* làm biến lưu trữ trạng thái, vì vậy view sẽ thay đổi opacity và scale của nó bất cứ khi nào các biến trạng thái này thay đổi. 

Vì nó đã thay đổi để tạo hiệu ứng cho text "F ber", bạn không cần phải làm gì khác để kích hoạt chúng.

Build and run:

![](https://images.viblo.asia/1c9a0ba7-60b9-460d-be40-5573ed38c169.gif)

Bây giờ bạn cần thêm hiệu ứng gợn làm mờ nền khi Fuber "U" co lại thành một hình vuông.

Bạn sẽ làm điều đó bằng cách thêm một vòng tròn bán trong suốt ngay phía trên background view, bên dưới tất cả các view khác.

Vòng tròn đó sẽ animation theo cách của nó từ giữa Fuber ‘U, để che toàn bộ màn hình và ẩn background. Nghe có vẻ dễ dàng phải không?

Thêm hai biến trạng thái mới này mà hình ảnh động vòng tròn cần:

```
@State var coverCircleScale: CGFloat = 1
@State var coverCircleAlpha = 0.0
```

Sau đó thêm view này trong ZStack, ngay sau background image view:

```
Circle()
  .fill(fuberBlue) 
  .frame(width: 1, height: 1, alignment: .center)
  .scaleEffect(coverCircleScale)
  .opacity(coverCircleAlpha)
```

Bây giờ, bạn cần thay đổi giá trị của các biến trạng thái này vào đúng thời điểm chính xác để bắt đầu animation.

Thêm code này vào runAnimationPart2(), ngay bên dưới self.sapesScale = 1:

```
withAnimation(.easeOut(duration: self.fadeAnimationDuration)) {
  self.coverCircleAlpha = 1
  self.coverCircleScale = 1000
}
```

Cuối cùng, đừng quên khởi tạo kích thước vòng tròn và độ mờ của vòng tròn khi animation hoàn tất và sẵn sàng khởi động lại.

Thêm phần này vào restartAnimation(), ngay trước dòng gọi lại handAnimations ():

```
self.coverCircleAlpha = 0
self.coverCircleScale = 1
```

Build and run

![](https://images.viblo.asia/f26f62e9-87db-4c6e-9eef-efaec567cf13.gif)

Bây giờ ngồi lại, thư giãn thưởng thức.

## Finishing Touches

Animation mà bạn đã tạo ra khá thú vị, nhưng theo cách mà chúng ta đang làm, animation sẽ tiếp tục lặp lại khi màn hình splash biến mất.

Bạn cần ngăn animation khởi động lại sau khi màn hình splash mờ dần vì nó không có ý nghĩa để nó tiếp tục hoạt động.

Để ngăn animation hiển thị lâu hơn mức cần thiết, hãy thêm một biến tĩnh mới vào SplashScreen:

```
static var shouldAnimate = true
```

Trong handleAnimations (), hãy bọc restartAnimation () bằng một câu lệnh if, điều này ngăn nó bắt đầu lại sau khi biến Boolean mới này **false**.

Nó sẽ giống như thế này:

```
if SplashScreen.shouldAnimate {
  restartAnimation()
}
```

Bây giờ, hãy quay lại **ContentView.swift**, bỏ comment .onAppear mà bạn đã nhận xét ngay từ đầu và đặt *shouldAnimate* thành **false**.

Sau đó, chỉ để cho **vui** thì cũng thay đổi hằng số thứ hai thành 10 để bạn có cơ hội thưởng thức animation màn hình splash mà bạn đã tạo.

Bây giờ nó sẽ trông như thế này:

```
.onAppear {
    DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
      SplashScreen.shouldAnimate = false
      withAnimation() {
        self.showSplash = false
      }
    }
}
```

Build and run

![](https://images.viblo.asia/60a687ee-0c07-4cb4-852c-943b42bb631d.gif)

Bạn sẽ thấy màn hình hiển thị splash thú vị của mình trong 10 giây và sau đó chuyển vào màn hình chính của app.
Và điều tuyệt nhất ở đây là một khi màn hình splash biến mất, nó không còn thực hiện animation ở chế độ background nữa, vì vậy user có thể trải nghiệm ứng dụng một cách tốt nhất, không gặp lỗi lag ứng dụng. Ngon!

[link bài viết gốc ](https://www.raywenderlich.com/4503153-how-to-create-a-splash-screen-with-swiftui)