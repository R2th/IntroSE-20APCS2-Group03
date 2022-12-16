# I. Giới thiệu
Các framework, library đã trở thành một phần không thể thiếu trong quá trình viết code của giới lập trình viên. Càng ngày, chúng ta lại có thêm càng nhiều thư viện mới tốt hơn, giúp ích cho chúng ta nhiều hơn trong công việc.

Dưới đây, tôi xin giới thiệu các thư viện tốt nhất cho iOS, mỗi thư viện phục vụ một mục đích khác nhau, để các bạn có thể tham khảo và sử dụng trong project.

# II. Nội dung
## 1. Các thư viện về network
### a. Alamofire
![](https://images.viblo.asia/7f0f2286-f864-44bc-9449-baa01b7e4508.png)

Alamofire là thư viện giúp chúng ta làm việc với các request http. Chắc hẳn mọi người đều sử dụng thư viện này. Nó là thư viện quốc dân, gần như tất cả project iOS có sử dụng request network đều sử dụng Alamofire cả (project Objective-C thì sử dụng AFNetworking).

Các bạn có thể tìm hiểu thêm về Alamofire [tại đây](https://github.com/Alamofire/Alamofire)

### b. Kingfisher
![](https://images.viblo.asia/d1b07b2e-7de9-4e91-a078-6995b03be307.png)

Kingfisher là thư viện rất mạnh mẽ giúp chúng ta các tác vụ liên quan đến download, hiển thị trên view và cache image. Về cơ bản thì các chức năng của Kingfisher cũng tương tự thư viện SDWebImage, tuy nhiên SDWebImage lại được viết bằng Objective-C. Nếu trước đây các bạn chưa sử dụng Kingfisher thì các bạn nên dùng thử, sẽ rất tiện lợi đấy

Các bạn có thể tìm hiểu thêm về Kingfisher [tại đây](https://github.com/onevcat/Kingfisher)
### c. Starscream
![](https://images.viblo.asia/64e21652-0cd6-4663-a616-4678463b9c38.jpg)
Starscream là thư viện về WebSocket, giúp chúng ta làm việc với WebSocket trở nên đơn giản và nhẹ nhàng hơn. 

Các bạn có thể tìm hiểu thêm về Starscream [tại đây](https://github.com/daltoniam/Starscream)

## 2. Reactive programming
### a. RxSwift
![](https://images.viblo.asia/b63df93c-0815-4447-bb99-425bae5cb01b.png)

RxSwift là một thư viện rất tuyệt vời để chúng ta code functional reactive programming trên iOS. Nó là một version của Rx. Rx đã có rất nhiều version trên các ngôn ngữ khác nhau: RxJava, Rx.NET, RxJS,… Hiện tại sun-asterisk cũng là một công ty sử dụng RxSwift rất nhiều. Nếu chưa biết về RxSwift, các bạn nên tìm hiểu về nó, nó mang lại rất nhiều lợi ích khi viết code.

Các bạn có thể tìm hiểu thêm về RxSwift [tại đây](https://github.com/ReactiveX/RxSwift)

### b. ReactiveCocoa
![](https://images.viblo.asia/4f486332-afc5-4c35-8eb8-c4efac111d1c.png)

ReactiveCocoa là một thư viện reactive khác của iOS. Về cơ bản thì mục đích của nó cũng giống với RxSwift, giúp chúng ta code functional reactive programming. Tuy nhiên, cách sử dụng RxSwift và ReactiveCocoa rất khác nhau, và cả 2 đều là những thư viện tuyệt vời. 

Các bạn có thể tìm hiểu thêm về ReactiveCocoa [tại đây](https://github.com/ReactiveCocoa/ReactiveCocoa)
Ngoài ra, để tìm hiểu sự khác nhau giữa RxSwift và ReactiveCocoa, các bạn có thể tham khảo thêm [tại đây](https://www.raywenderlich.com/1190-reactivecocoa-vs-rxswift)
## 3. Animation
### a. Hero
![](https://images.viblo.asia/cc084c73-d0b4-4603-87af-20604a9ff38e.png)

Hero là thư viện giúp chúng ta tạo animation cho view controller transition. Nếu các bạn đang tìm kiếm một thư viện giúp custom cách present view controller, thì Hero chính là thư viện các bạn cần

Các bạn có thể tìm hiểu thêm về Hero [tại đây](https://github.com/HeroTransitions/Hero)
### b. Spring

Spring là thư viện animation cho các UIView trong iOS. Nếu các bạn đang cần tạo animation cho view, mà lại không muốn tốn quá nhiều thời gian để tự viết animation, thì Spring có thể chính là thư viện mà các bạn đang cần.

Các bạn có thể tìm hiểu thêm về Spring [tại đây](https://github.com/MengTo/Spring)
## 4. Auto layout

Chúng ta đều biết là việc thêm auto layout trong code là tương đối lằng nhằng và phức tạp. Có nhiều khi chúng ta phải thêm 1 đống code, chỉ để thêm một vài constraint đơn giản. Dưới đây là các thư viện giúp việc thêm các constraint đơn giản, dễ dàng hơn.

### a. SnapKit
![](https://images.viblo.asia/3f9eb88c-d925-43b6-b4c8-64a5ae5dc7a4.jpeg)

SnapKit là một dạng DSL để viết auto layout trong iOS. DSL là viết tắt cho domain specific language, để tìm hiểu thêm về DSL, các bạn có thể tham khảo tại đây (https://vi.wikipedia.org/wiki/Ngôn_ngữ_miền_chuyên_biệt). Sử dụng SnapKit sẽ giúp chúng ta code auto layout đơn giản hơn, ngắn gọn và dễ đọc hơn. 

Các bạn có thể tìm hiểu thêm về SnapKit [tại đây](https://github.com/SnapKit/SnapKit)

### b. TinyConstraint
![](https://images.viblo.asia/f79510fd-08a6-4874-9e8c-31b376f90f63.png)

TinyConstraint là thư viện giúp chúng ta giảm thiểu tối đa code với các dạng auto layout thông thường. Ví dụ, để thêm auto layout cho View với 4 cạnh của SuperView, thông thường chúng ta phải viết:
``` Swift
NSLayoutConstraint.activate([
    view.topAnchor.constraint(equalTo: superview.topAnchor, constant: 0),
    view.leadingAnchor.constraint(equalTo: superview.leadingAnchor, constant: 0),
    view.bottomAnchor.constraint(equalTo: superview.bottomAnchor, constant: 0),
    view.trailingAnchor.constraint(equalTo: superview.trailingAnchor, constant: 0)
])
```

TinyConstraint cung cấp cho chúng ta method đơn giản như sau:
``` Swift
view.edgesToSuperView()
```

Các bạn có thể tìm hiểu thêm về TinyConstraint [tại đây](https://github.com/roberthein/TinyConstraints)

## 5. Utilities

### a. PromiseKit
![](https://images.viblo.asia/d6d68c2f-9507-4a0d-9880-5dceee9f3d03.png)

PromiseKit là một thư viện giúp chúng ta đơn giản hoá các asynchronous task, giúp chúng ta không phải mất nhiều thời gian lo lắng cho các đoạn code asynchronous. PromiseKit dễ học, dễ nắm vững và hiệu quả nó mang lại thì rất lớn. Nó giúp code của chúng ta đơn giản hơn, dễ đọc hơn, dễ kiểm soát asynchronous task hơn.

Ví dụ đoạn code sau:
```Swift
let fetchImage = URLSession.shared.dataTask(.promise, with: url).compactMap{ UIImage(data: $0.data) }
let fetchLocation = CLLocationManager.requestLocation().lastValue

firstly {
    when(fulfilled: fetchImage, fetchLocation)
}.done { image, location in
    self.imageView.image = image
    self.label.text = "\(location)"
}.ensure {
    UIApplication.shared.isNetworkActivityIndicatorVisible = false
}.catch { error in
    self.show(UIAlertController(for: error), sender: self)
}
```

Nhìn vào ví dụ trên, Các task download ảnh và request location được quản lý rất tốt bởi PromiseKit, với các closure done, ensure, catch.

Các bạn có thể tìm hiểu thêm về PromiseKit [tại đây](https://github.com/mxcl/PromiseKit)

### b. CryptoSwift

Nếu ứng dụng của các bạn cần sử dụng các method mã hoá thì CryptoSwift là một thư viện các bạn nên nghĩ đến đầu tiên. Nó cung cấp cho chúng ta rất nhiều method với nhiều dạng mã hoá khác nhau (MD5, SHA1, SHA256,…)

Các bạn có thể tìm hiểu thêm về CryptoSwift [tại đây](https://github.com/krzyzanowskim/CryptoSwift)

### c. SwiftDate
![](https://images.viblo.asia/19f709fc-97da-4f6e-97dc-8e5fec1d2513.png)

SwiftDate là một helper tuyệt vời cho chúng ta khi làm việc với Date trong iOS. SwiftDate có rất nhiều feature hay như date parsing, date formatting, date caculating, … Giúp chúng ta thao tác với Date một cách đơn giản, dễ dàng

Các bạn có thể tìm hiểu thêm về SwiftDate [tại đây](https://github.com/malcommac/SwiftDate)

### d. SwiftyBeaver

Nếu các bạn đang tìm kiếm 1 thư viện logging cả trong quá trình development và production, thì SwiftyBeaver là một sự lựa chọn rất tốt. SwiftyBeaver cung cấp cho chúng ta khả năng log rất đa dạng:

- Trong quá trình phát triển:
* Colored logging to Xcode Console: log ra console với màu mè hoa lá, để chúng ta dễ nhìn log hơn
* Colored logging to File: log ra file để chúng ta có thể xem lại log

- Trong thời kỳ sản phẩm đã release:
 * Encrypted Logging to SwiftyBeaver Platform: SwiftyBeaver cung cấp service crypto cloud để chúng ta mã hoá và upload log của App lên cloud của SwiftyBeaver


Các bạn có thể tìm hiểu thêm về SwiftyBeaver [tại đây](https://github.com/SwiftyBeaver/SwiftyBeaver)

### e. SwiftyJSON

Swift là ngôn ngữ rất tuyệt vời, nó có yêu cầu rất nghiêm ngặt đối với các loại type. Điều này là rất tốt để giúp chúng ta tránh khỏi những sai lầm, tuy vậy nó lại thành trở ngại rất lớn khi làm việc với JSON, bởi JSON không hề rõ ràng về các kiểu dữ liệu bên trong nó. Chính vì vậy, làm việc với JSON chưa bao giờ là dễ dàng trong Swift. SwiftyJSON là thư viện giúp chúng ta làm việc với JSON một cách dễ dàng hơn, tránh được các khâu unwrap optional rắc rối.

Các bạn có thể tìm hiểu thêm về SwiftyJSON [tại đây](https://github.com/SwiftyJSON/SwiftyJSON)

# III. Kết luận
Trên đây tôi đã giới thiệu đến các bạn các thư viện tốt nhất được viết bằng Swift cho iOS. Mỗi thư viện bên trên phục vụ một mục đích khác nhau, tuỳ vào trường hợp cụ thể mà chúng ta sẽ quyết định xem sử dụng thư viện nào hợp với mình. Hi vọng bài viết này mang lại một chút thông tin hữu ích cho các bạn trong quá trình viết code.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!