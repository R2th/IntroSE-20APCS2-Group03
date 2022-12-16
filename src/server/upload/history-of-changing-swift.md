![](https://images.viblo.asia/a725cc2d-ad75-4d81-9157-861109e4c811.png)

Có thể nói với mỗi lập trình viên iOS thì ngôn ngữ Swift ra đời đánh dấu bước cách mạng khi thay thế ngôn ngữ Objective C đã quá lâu rồi. Trải qua những thay đổi từ 1.2 lên 2.0 đã “dễ sợ” lắm rồi, thì bạn sẽ ngạc nhiên với phiên bản 3.0 và sau đó là những nâng cấp lên version Swift4, Swift5.
Tuy nhiên Swift 3.0 vẫn thực sự là mốc đáng nhớ, mới mục đích của bài viết là để bạn đọc nắm được những sự thay đổi với ngôn ngữ Swift qua các phiên bản. Ở Phần 1 này chúng ta sẽ cùng tìm hiểu sự thay đổi từ version Swift cũ lên Swift 3 được coi như một cuộc cách mạng.
Vậy những thay đổi đó là gì? Swift 3 có gì mới?
Chúng ta cùng tìm hiểu nhé!

### Tất cả tham số hàm đều có nhãn (tên)

Ở Swift 2.0, ta đã chứng kiến sự thay đổi trong cách gọi hàm (function) và phương thức (method). Và với phiên bản 3.0 này, ta sẽ lại lần nữa thấy sự thay đổi này, ở một mức độ cao hơn nữa. Từ Swift 2.x trở về trước, tên phương thức không yêu cầu nhãn ở tham số đầu tiên, nên tên của tham số đầu thường dính luôn vào tên phương thức. Ví dụ:

```Swift
names.indexOf("Taylor")
"Taylor".writeToFile("filename", atomically: true, encoding: NSUTF8StringEncoding)
SKAction.rotateByAngle(CGFloat(M_PI_2), duration: 10)
 
UIFont.preferredFontForTextStyle(UIFontTextStyleSubheadline)
 
override func numberOfSectionsInTableView(tableView: UITableView) -> Int
 
func viewForZoomingInScrollView(scrollView: UIScrollView) -> UIView?
 
NSTimer.scheduledTimerWithTimeInterval(0.35, target: self, selector: #selector(createEnemy), userInfo: nil, repeats: true)
```

Swift 3 sẽ mặc định yêu cầu nhãn cho tham số (bạn có thể điều chỉnh để thay đổi), đồng nghĩa với việc tên phương thức sẽ không còn nêu chi tiết các tham số nữa. Trong thực tế, phần cuối của tên hàm thường sẽ chuyển thành tên của tham số đầu.

Để minh họa rõ hơn, dưới đây là một đoạn code trong Swift 2.2 kèm theo ví dụ tương ứng trong Swift 3:

```Swift
names.indexOf("Taylor")
names.index(of: "Taylor")
 
"Taylor".writeToFile("filename", atomically: true, encoding: NSUTF8StringEncoding)
"Taylor".write(toFile: "somefile", atomically: true, encoding: NSUTF8StringEncoding)
 
SKAction.rotateByAngle(CGFloat(M_PI_2), duration: 10)
SKAction.rotate(byAngle: CGFloat(M_PI_2), duration: 10)
 
UIFont.preferredFontForTextStyle(UIFontTextStyleSubheadline)
UIFont.preferredFont(forTextStyle: UIFontTextStyleSubheadline)
 
override func numberOfSectionsInTableView(tableView: UITableView) -> Int
override func numberOfSections(in tableView: UITableView) -> Int
 
func viewForZoomingInScrollView(scrollView: UIScrollView) -> UIView?
func viewForZooming(in scrollView: UIScrollView) -> UIView?
 
NSTimer.scheduledTimerWithTimeInterval(0.35, target: self, selector: #selector(createEnemy), userInfo: nil, repeats: true)
NSTimer.scheduledTimer(timeInterval: 0.35, target: self, selector: #selector(createEnemy), userInfo: nil, repeats: true)
```

Đấy là các phương thức bạn đã call, đồng thời cũng gây hiệu ứng domino cho các phương thức called: Khi bạn kết nói đến một số framework như UIKit, các phương thức sẽ tuân theo quy luật “không có tên tham số đầu” giống các phiên bản trước (điều này áp dụng cả với Swift 3).

Dưới đây là một số ví dụ điển hình ở Swift 2.2:
```Swift
override func viewWillAppear(animated: Bool)
override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
override func didMoveToView(view: SKView)
override func traitCollectionDidChange(previousTraitCollection: UITraitCollection?)
func textFieldShouldReturn(textField: UITextField) -> Bool
```
Với Swift 3, tất cả đều cần underscore (_) trước tham số đầu tiên, để báo hiệu rằng caller (Objective-C code) sẽ không dùng nhãn tham số:
```Swift
override func viewWillAppear(_ animated: Bool)
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
override func didMoveToView(_ view: SKView)
override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?)
func textFieldShouldReturn(_ textField: UITextField) -> Bool
```

### Loại bỏ từ không cần thiết

Khi Swift chuyển thành mã nguồn mở hồi tháng 12 năm ngoái, API guildlines của Swift đã tiên đoán trước cả thay đổi của phiên bản 3 với ba từ: “omit needless words” (loại bỏ từ không cần thiết). Và giờ đây ta đã thấy sự thay đổi này trong Swift 3, tên phương thức sẽ loại bỏ các từ hiển nhiên.

```Swift
let blue = UIColor.blue()
let min = numbers.min()
attributedString.append(anotherString)
names.insert("Jane", at: 0)
UIDevice.current()
```

### lowerCamelCase thay cho UpperCamelCase với enum và property

Dù không liên quan (về mặt cú pháp) cho lắm, nhưng cách dùng chữ in hoa trong tên class, struct, property, enum,… của chúng ta vẫn thường theo một quy ước: class, struct và enum dùng UpperCamelCase (MyStruct, WeatherType.Cloudy), property và tên tham số dùng lowerCamelCase (emailAddress, requestString).

Tuy vậy, vẫn có một số ngoại lệ, và các ngoại lệ này sẽ không còn trong Swift 3 nữa: các property và tham số bắt đầu bằng chữ viết tắt giờ đây sẽ dùng lowerCamelCase.

```Swift
let red = UIColor.red().cgColor
```

Thay đổi này sẽ tăng tính nhất quán hơn: tất cả property và thông số sẽ bắt đầu bằng chữ thường, và sẽ không có ngoại lệ.

Đồng thời, enum case cũng có sự thay đổi, từ UpperCamelCase thành lowerCamelCase. Theo tôi, thay đổi này khá đúng: enum là kiểu dữ liệu (như struct), nhưng enum value lại gần với property hơn. Nói cách khác, tất cả Apple enum bạn sử dụng giờ đây sẽ là chữ thường:


```Swift
UIInterfaceOrientationMask.Portrait // old
UIInterfaceOrientationMask.portrait // new
 
NSTextAlignment.Left // old
NSTextAlignment.left // new
 
SKBlendMode.Replace // old
SKBlendMode.replace // new
```

### Swifty importing of C functions

Swift 3 còn giới thiệu attribute cho hàm trong ngôn ngữ C, cho phép người tạo thư viện chỉ định nhiều cách thức mới để nhập code vào Swift thật nhanh chóng và chuẩn xác. Ví dụ như, tất cả các hàm bắt đầu bằng “CGContext”  sẽ được map đến các property và method trên một CGContext object

Để thấy rõ hơn, sau đây là ví dụ trong Swift 2.2:

```Swift
let ctx = UIGraphicsGetCurrentContext()
 
let rectangle = CGRect(x: 0, y: 0, width: 512, height: 512)
CGContextSetFillColorWithColor(ctx, UIColor.redColor().CGColor)
CGContextSetStrokeColorWithColor(ctx, UIColor.blackColor().CGColor)
CGContextSetLineWidth(ctx, 10)
CGContextAddRect(ctx, rectangle)
CGContextDrawPath(ctx, .FillStroke)
 
UIGraphicsEndImageContext()
```

Trong Swift 3 CGContext có thể xem là object mà bạn có thể call method được, không cần phải lặp lại CGContext liên tục. Vậy, ta có thể viết lại đoạn code trên như sau:

```Swift
if let ctx = UIGraphicsGetCurrentContext() {
    let rectangle = CGRect(x: 0, y: 0, width: 512, height: 512)
    ctx.setFillColor(UIColor.red().cgColor)
    ctx.setStrokeColor(UIColor.black().cgColor)
    ctx.setLineWidth(10)
    ctx.addRect(rectangle)
    ctx.drawPath(using: .fillStroke)
 
    UIGraphicsEndImageContext()
}
```

### Kết luận

Swift vẫn đang được Apple phát triển và cải tiến hơn nữa. Ở bài viết phần 1 này chúng ta đã nắm được sự thay đổi của Swift3 so với các verison trước. Trong phần 2 tiếp theo chúng ta sẽ cùng tìm hiểu những điểm mới trên Swift4 và Swift5

Cám ơn bạn đã dành thời gian cho bài viết! :)

##### _Nguồn:_

[https://www.hackingwithswift.com/swift3](https://www.hackingwithswift.com/swift3)