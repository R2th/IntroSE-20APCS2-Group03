Trên iOS, UIActivityViewController cung cấp giao diện thống nhất để người dùng chia sẻ và thực hiện các hành động trên văn bản, hình ảnh, URL và các mục khác trong ứng dụng.

Bạn tạo một UIActivityViewController bằng cách chuyển các mục bạn muốn chia sẻ và bất kỳ hoạt động tùy chỉnh nào bạn muốn hỗ trợ (chúng tôi sẽ hướng dẫn cách thực hiện điều đó sau). Sau đó, bạn present UIActivityViewController đó.

```
let string = "Hello, world!"
let url = URL(string: "https://nshipster.com")!
let image = UIImage(named: "mustache.jpg")
let pdf = Bundle.main.url(forResource: "Q4 Projections",
                            withExtension: "pdf")

let activityViewController =
    UIActivityViewController(activityItems: [string, url, image, pdf],
                             applicationActivities: nil)

present(activityViewController, animated: true) {
    …
}
```

Khi bạn chạy mã này, màn hình hiển thị thông tin sau:

![](https://images.viblo.asia/281e8adb-e166-4e56-bcc0-5d729dafc8d3.png)

Theo mặc định, UIActivityViewController hiển thị tất cả các hoạt động có sẵn cho các mục được cung cấp, nhưng bạn có thể loại trừ một số loại hoạt động nhất định thông qua thuộc tính `excludedActivityTypes`.

```
activityViewController.excludedActivityTypes = [.postToFacebook]
```

Các loại hoạt động được chia thành loại "hành động" và "chia sẻ":

* Hành động (UIActivityCategoryAction) các mục hoạt động thực hiện một hành động trên nội dung đã chọn, chẳng hạn như sao chép văn bản vào bảng dán hoặc in hình ảnh.
* Chia sẻ (UIActivityCategoryShare) các mục hoạt động chia sẻ nội dung đã chọn, chẳng hạn như soạn tin nhắn chứa URL hoặc đăng hình ảnh lên Twitter.

Mỗi loại hoạt động hỗ trợ một số loại vật phẩm nhất định. Ví dụ: bạn có thể đăng chuỗi ký tự, URL và / hoặc hình ảnh lên Twitter, nhưng bạn không thể chỉ định một chuỗi ký tự làm ảnh cho một liên hệ.

Các bảng sau đây hiển thị các loại hoạt động có sẵn cho từng danh mục và các mục được hỗ trợ của chúng:

### UIActivityCategoryAction

![](https://images.viblo.asia/5c838d67-630d-4418-abb0-e6c2c1731adc.png)

### UIActivityCategoryShare

![](https://images.viblo.asia/2b64eff5-dab1-4d9f-9423-278ff8b03cb0.png)

UIActivityViewController cho phép người dùng chọn cách họ chia sẻ nội dung. Tuy nhiên, với tư cách là nhà phát triển, bạn có thể truy cập trực tiếp vào chức năng này. Dưới đây là các API tương ứng cho từng loại hoạt động do hệ thống cung cấp:

| Activity Type | Corresponding API |
| -------- | -------- |
| addToReadingList     | SSReadingList     |
| assignToContact     | CNContact     |
| print     | UIPrintInteractionController     |
| saveToCameraRoll     | UIImageWriteToSavedPhotosAlbum     |
| mail     | MFMailComposeViewController     |
| message     | MFMailComposeViewController     |
| addToReadingList     | MFMessageComposeViewController     |
| postToFacebook, postToFlickr,  postToTencentWeibo,  postToTwitter, postToVimeo,  postToWeibo | SLComposeViewController     |

### Tạo UIActivity tùy chỉnh

Ngoài các hoạt động do hệ thống cung cấp, bạn có thể tạo các hoạt động của riêng mình.

Ví dụ: hãy tạo một hoạt động tùy chỉnh lấy một hình ảnh và áp dụng một bộ ria mép cho nó thông qua một ứng dụng web.

#### Xác định loại hoạt động tùy chỉnh

Đầu tiên, xác định một hằng số loại hoạt động mới trong phần mở rộng cho UIActivity.ActivityType, được khởi tạo bằng mã định danh DNS ngược.

```
extension UIActivity.ActivityType {
    static let mustachify =
        UIActivity.ActivityType("com.nshipster.mustachify")
}
```

#### Tạo một lớp con UIActivity

Tiếp theo, tạo một lớp con của UIActivity và ghi đè các triển khai mặc định của thuộc tính kiểu `activityCategory` và các thuộc tính ` activityType`, `activityTitle` và` activityImage`.

```
class MustachifyActivity: UIActivity {
    override class var activityCategory: UIActivity.Category {
        return .action
    }

    override var activityType: UIActivity.ActivityType? {
        return .mustachify
    }

    override var activityTitle: String? {
        return NSLocalizedString("Mustachify", comment: "activity title")
    }

    override var activityImage: UIImage? {
        return UIImage(named: "mustachify-icon")
    }

    …
}
```

#### Xác định item nào có thể hành động

Các hoạt động chịu trách nhiệm xác định xem chúng có thể hoạt động trên một mảng mục nhất định hay không bằng cách ghi đè phương thức `canPerform(withActivityItems:)`.

Hoạt động tùy chỉnh của chúng tôi có thể hoạt động nếu bất kỳ mục nào là hình ảnh mà chúng tôi xác định bằng một số đối sánh mẫu lạ mắt trên vòng lặp for-in:

```
override func canPerform(withActivityItems activityItems: [Any]) -> Bool {
    for case is UIImage in activityItems {
        return true
    }

    return false
}
```

#### Chuẩn bị cho Hành động

Khi một hoạt động đã xác định rằng nó có thể hoạt động với các mục được chỉ định, nó sẽ sử dụng chuẩn bị (withActivityItems:) để sẵn sàng thực hiện hoạt động.

Trong trường hợp hoạt động tùy chỉnh của chúng tôi, chúng tôi lấy hình ảnh đầu tiên:
```
var sourceImageData: Data?

override func prepare(withActivityItems activityItems: [Any]) {
    for case let image as UIImage in activityItems {
        self.sourceImageData = image.pngData()
        return
    }
}
```

#### Thực hiện Hoạt động

Phương thức performance() là phần quan trọng nhất trong hoạt động của bạn. Bởi vì quá trình xử lý có thể mất một chút thời gian, đây là một phương pháp không đồng bộ. Tuy nhiên, do thiếu trình xử lý hoàn thành, bạn báo hiệu rằng công việc đã được thực hiện bằng cách gọi phương thức activityDidFinish(_ :).

Hoạt động tùy chỉnh của chúng tôi ủy quyền quy trình phân loại cho một ứng dụng web bằng cách sử dụng tác vụ dữ liệu được gửi từ URLSession được chia sẻ. Nếu mọi việc suôn sẻ, thuộc tính mustachioedImage được đặt và activityDidFinish(_ :) được gọi với true để cho biết rằng hoạt động đã kết thúc thành công. Nếu xảy ra lỗi trong yêu cầu hoặc chúng tôi không thể tạo hình ảnh từ dữ liệu được cung cấp, chúng tôi gọi là activityDidFinish(_ :) với false để chỉ ra lỗi.

```
var mustachioedImage: UIImage?

override func perform() {
    let url = URL(string: "https://mustachify.app/")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.httpBody = self.sourceImageData

    URLSession.shared.dataTask(with: request) { (data, _, error) in
        guard error == nil else {
            self.activityDidFinish(false)
            return
        }

        if let data = data,
            let image = UIImage(data: data)
        {
            self.mustachioedImage = image
            self.activityDidFinish(true)
        } else {
            self.activityDidFinish(false)
        }
    }
}
```

#### Hiển thị kết quả

Bước cuối cùng là cung cấp bộ điều khiển chế độ xem để hiển thị kết quả hoạt động của chúng tôi.

QuickLook framework cung cấp một cách đơn giản, được tích hợp sẵn để hiển thị hình ảnh. Chúng tôi sẽ mở rộng hoạt động của mình để áp dụng QLPreviewControllerDataSource và trả về một phiên bản của QLPreviewController, với tự đặt làm dataSource để ghi đè phương thức theactivityViewController.

```
import QuickLook

extension MustachifyActivity: QLPreviewControllerDataSource {
    override var activityViewController: UIViewController? {
        guard let image = self.mustachioedImage else {
            return nil
        }

        let viewController = QLPreviewController()
        viewController.dataSource = self
        return viewController
    }

    // MARK: QLPreviewControllerDataSource

    func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
        return self.mustachioedImage != nil ? 1 : 0
    }

    func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
        return self.mustachioedImage!
    }
}
```

#### Cung cấp Hoạt động tùy chỉnh cho người dùng

Chúng ta có thể sử dụng hoạt động `mustache` hoàn toàn mới của mình bằng cách chuyển nó tới tham số applicationActictivity trong bộ khởi tạo UIActivityViewController:

```
let activityViewController =
    UIActivityViewController(activityItems: [image],
                             applicationActivities: [Mustachify()])

present(activityViewController, animated: true) {
    …
}
```

![](https://images.viblo.asia/6560a23e-b916-482a-9a7f-c94528432cdd.png)

Link: https://nshipster.com/uiactivityviewcontroller/#defining-a-custom-activity-type