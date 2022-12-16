Khi Swift được giới thiệu lần đầu tiên vào năm 2014, một trong những công cụ dành cho nhà phát triển thú vị nhất được ra mắt cùng với đó là "Playground". Được thiết kế để trở thành một công cụ để nhanh chóng tạo prototype cho một đoạn code Swift, để học ngôn ngữ hoặc khám phá thư viện tiêu chuẩn và SDK Apple - Swift playgrounds từ đó trở thành một phần không thể thiếu trong nhiều quy trình làm việc hàng ngày của developers.

Tuy nhiên, cả việc implement playgrounds của Xcode - và ứng dụng dành riêng cho iPad - thường bị chỉ trích khá nặng nề vì không ổn định, chậm và khó làm việc. Vì vậy, trong tuần này, chúng ta hãy cùng xem một số mẹo và thủ thuật có thể giúp làm việc với playgrounds Swift dễ dàng hơn, ít bị lỗi hơn và hiệu quả hơn.
## Asynchronous execution
Cũng giống như các command line tools và scripts, các sân chơi theo mặc định luôn hoạt động đồng bộ. Mỗi dòng mã được đánh giá theo cách bắt buộc và một khi dòng cuối cùng được thực thi, chương trình sẽ thoát. Mặc dù mô hình này giúp cho việc viết code cho playgrounds trở nên rất đơn giản - chúng ta chỉ có thể bắt đầu viết trong global scope mà không cần phải tạo appdelegate hoặc runloops hoặc event hanlders - nó có thể làm cho việc  thực hiện code không đồng bộ khó hơn nhiều.
Nhưng tin tốt là chúng ta thực sự có thể dễ dàng tạo một playground không đồng bộ, bằng cách làm cho nó hiển thị live view, hoặc nếu chúng ta đang làm việc trên một đoạn code không có bất kỳ UI nào được liên kết với nó - bằng cách sử dụng needsIndefiniteExecution API, như thế này:
```
import PlaygroundSupport

let page = PlaygroundPage.current
page.needsIndefiniteExecution = true

let loader = ImageLoader()
let url = URL(staticString: "https://source.unsplash.com/random")

// Perform our asynchronous operation
loader.loadImage(from: url) { image in
    // Assign the image to a non-variable to have it show up
    // in the playground’s timeline.
    _ = image

    page.finishExecution()
}
```
Như bạn có thể thấy ở trên, sử dụng  PlaygroundSupport framework - và cụ thể hơn là API PlaygroundPage - chúng ta có thể kiểm soát một số hoạt động của playground.
Bằng cách set needsIndefiniteExecution là true trên trang hiện tại, về cơ bản chúng ta sẽ set cho playground tiếp tục chạy cho đến khi chúng ta muốn nó dừng - khi chúng ta sử dụng lệnh gọi để kết thúc finishExecution()
## Handling exceptions
Một hạn chế của cả hai phiên bản Xcode và iPad của playground Swift là thiếu hỗ trợ debugger. Mặc dù điều này thường không phải là một vấn đề lớn - vì thay vì sử dụng các break point để kiểm tra trạng thái thực thi, chúng ta có thể nhận được hầu hết thông tin chúng ta cần từ dòng thời gian của playground - nó có thể dẫn đến một số tình huống bực bội mỗi khi mã của chúng ta kích hoạt một số dạng ngoại lệ.
Khi làm việc với một ứng dụng, việc bắt NSException khá đơn giản, vì trong Xcode chúng ta có thể thiết lập “Exception breakpoint” để tạm dừng chương trình của chúng ta tại vị trí chính xác của exception bị throw -  nhưng khi làm việc trong một playground, chúng ta có để có được một chút sáng tạo, vì tất cả những gì chúng ta nhận được theo mặc định là một SIGABRT crash.
Một cách để làm như vậy là sử dụng hàm NSSetUncaughtExceptionHandler global để thiết lập một closure được chạy mỗi khi gặp exception. Bằng cách đó, chúng tôi có thể in exception để giúp chúng ga tìm hiểu điều gì đã xảy ra, như thế này:
```
NSSetUncaughtExceptionHandler { exception in
    print("💥 Exception thrown: \(exception)")
}
```
Mặc dù không hoàn hảo, nhưng việc làm ở trên thường cung cấp cho chúng ta đủ thông tin debug, vì hầu hết các exception do hệ thống ném có xu hướng chứa các mô tả rõ ràng về các lỗi gây ra chúng.
## Decoding bundled files
Khi prototyping hoặc working trên một tính năng mới bằng cách sử dụng một playground, nó khá phổ biến khi muốn tải một số dạng resourse files. Ví dụ: chúng ta có thể muốn render giao diện người dùng dựa trên file JSON chứa dữ liệu giả định hoặc tải file cơ sở dữ liệu đã chứa các bản ghi mà chúng ta cần.
Giống như trong một ứng dụng, chúng ta có thể sử dụng API Bundle để truy cập vào bất kỳ resourse file nào mà chúng tôi đã thêm vào playground của mình, điều này cho phép chúng ta làm những việc như mở rộng Decodable để có thể dễ dàng tạo một model instance từ bundled JSON file:
```
extension Decodable {
    static func decodeFromFile(
        named fileName: String,
        in bundle: Bundle = .main
    ) throws -> Self {
        // Just like in an app, we can use our playground’s
        // bundle to retrieve a URL for a local resource file.
        guard let url = bundle.url(forResource: fileName,
                                   withExtension: "json") else {
            throw MissingFileError()
        }

        let data = try Data(contentsOf: url)
        let decoder = JSONDecoder()

        return try decoder.decode(self, from: data)
    }
}
```
Thêm một convenience APIs nhỏ, như ở trên, ban đầu có thể không phải là một vấn đề lớn - Nhưng thực sự có thể giúp tăng năng suất của chúng ta khi prototyping hoặc điều chỉnh một số code hiện có. Với những điều đã nêu ở trên, tất cả những gì chúng ta phải làm để sử dụng một decodable model được trong playground của chúng ta là thêm một file JSON chứa dữ liệu của nó và gọi API mới:
```
let user = try User.decodeFromFile(named: "User")
```
Do playground code được thực hiện trong global scope, chúng ta chỉ cần sử dụng *try* mà không cần gọi do and catch clauses - giống như chúng ta có thể trong Swift script hoặc trong a command line tool của *main.swift* file.
## Live rendering
Mỗi playground page được trang bị một LiveView slot có thể được sử dụng để cập nhật trực tiếp một phần UI khi code của chúng ta thay đổi. Khi một view được gán cho nó, Xcode hoặc Swift Playgrounds app sẽ liên tục render view trong Trình Assistant Editor của nó (và sẽ tự động bật flag *needsIndefiniteExecution*).
Nhưng điều thú vị là chúng ta thực sự có thể render hầu hết mọi thứ chúng ta muốn bằng cách sử dụng live view slot đó - vì loại của property đó không phải là UIView.  Mọi thứ tuân theo giao thức PlaygroundLiveViewable đều có thể được gán cho nó.
Ví dụ, bên cạnh UIView, PlaygroundSupport cũng có thể làm cho UIViewController tuân thủ giao thức đó - cho phép gán trực tiếp bất kỳ view controller nào dưới dạng playground page’s live view:
```
let product = try Product.decodeFromFile(named: "Product")
let vc = ProductViewController(product: product)
PlaygroundPage.current.liveView = vc
```
Nhưng có lẽ còn tuyệt vời hơn, là chúng ta có thể  tạo ra bất cứ loại nào mà chúng ta muốn render phù hợp với PlaygroundLiveViewable.  Tất cả những gì chúng ta phải làm là chuyển đổi loại của mình thành một PlaygroundLiveViewRepresentation value khi được yêu cầu làm như vậy bởi playground - thường bao gồm việc bọc wrap custom UI của chúng ta trong UIView hoặc UIViewController. Ví dụ: ở đây, cách chúng tôi có thể mở rộng *CALayer* thành playground live viewable:
```
extension CALayer: PlaygroundLiveViewable {
    // We create a wrapper view controller that we can
    // assign the layer that we wish to live view to.
    private class LiveViewController: UIViewController {
        var liveLayer: CALayer? {
            didSet {
                oldValue?.removeFromSuperlayer()
                liveLayer.map(view.layer.addSublayer)
            }
        }

        override func viewDidLayoutSubviews() {
            super.viewDidLayoutSubviews()

            liveLayer?.position = CGPoint(
                x: view.bounds.midX,
                y: view.bounds.midY
            )
        }
    }

    public var playgroundLiveViewRepresentation: PlaygroundLiveViewRepresentation {
        let vc = LiveViewController()
        vc.liveLayer = self
        return .viewController(vc)
    }
}
```
Với code ở trên, giờ đây chúng ta có thể dễ dàng xem trước bất kỳ layer hoặc Core Animation code nào khác mà chúng ta đang làm việc, chỉ bằng cách chỉ định CALayer của chúng ta trong chế độ playground’s live view của chúng ta:
```
let shape = CAShapeLayer()
shape.frame.size = CGSize(width: 250, height: 250)
shape.path = CGPath(ellipseIn: shape.bounds, transform: nil)
shape.lineWidth = 10
shape.strokeColor = UIColor.red.cgColor
shape.fillColor = UIColor.white.cgColor

PlaygroundPage.current.liveView = shape
```
Một điều thú vị cần lưu ý về live view API ở trên là một PlaygroundLiveViewRepresentation được triển khai như một enum với các giá trị liên quan. Đó là một điều đáng chú ý vì tính năng này chỉ có ở swift, nó không phải là thứ có thể được bridged đến hoặc từ Objective-C. 

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/posts/swift-playgrounds-tips-tricks