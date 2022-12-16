#  Giới thiệu
Trên iOS, có thể đưa người dùng từ ứng dụng này sang ứng dụng khác hoặc gửi họ từ trang web vào ứng dụng. Liên kết được sử dụng để đưa người dùng đến một ứng dụng thường được gọi là Deeplink. Thông thường, có nhiều cách để một deep link được chuyển đến ứng dụng của bạn. Bởi vì điều này, không phải lúc nào việc xử lý các deep link cũng trở nên tầm thường. Trong bài viết hôm nay, tôi sẽ xem xét hai loại deep link mà bạn có thể hỗ trợ trong ứng dụng của mình và tôi sẽ chỉ cho bạn cách bạn có thể tạo một trình xử lý deep link có thể xử lý hầu như bất kỳ deep link nào bạn ném vào nó. Bài viết này được chia thành các chủ đề sau:
 - Sử dụng lược đồ custom URL Schemes
 - Sử dụng universal link

     
#  Sử dụng URL Scheme

-Một cách phổ biến để ứng dụng Deeplink là thông qua URL Schemes. URL Schemes là một tiền tố được đặt trước url của bạn. Ví dụ: nếu bạn yêu cầu một máy chủ web, lược đồ thường là https: // hoặc nếu bạn tạo người dùng websockets trong ứng dụng của mình, bạn có thể sử dụng lược đồ wss: //. Bạn cũng có thể xác định URL Schemes tùy chỉnh của riêng mình. Ví dụ: deeplink-example: // hoặc myapplication: //. Các kế hoạch này sẽ không có ý nghĩa gì trên các thiết bị chưa cài đặt ứng dụng của bạn. Sử dụng lược đồ tùy chỉnh trong trình duyệt web như Safari sẽ không hoạt động. Chỉ ứng dụng của bạn mới biết cách xử lý URL Schemes tùy chỉnh và iOS biết cách chuyển tiếp các URL sử dụng lược đồ tới ứng dụng của bạn.

Trước khi có thể xử lý cácURL Schemes trong ứng dụng của mình, bạn phải đăng ký URL Scheme mà bạn muốn hỗ trợ trong tệp Info.plist của mình. Đăng ký URL Scheme của bạn giúp iOS xác định ứng dụng nào nó sẽ yêu cầu để mở một deep link, nhưng nó cũng được sử dụng để bảo vệ quyền riêng tư của người dùng. Các ứng dụng không thể kiểm tra xem iOS có thể xử lý các URL Scheme mà chúng chưa đăng ký trong Info.plist của mình hay không. Nếu bạn có thể kiểm tra bất kỳ URL Scheme nào, bất kỳ lúc nào, các ứng dụng sẽ có thể phát hiện ra các ứng dụng đã cài đặt khác bằng cách hỏi iOS xem nó có thể mở nhiều URL Scheme nhất có thể hay không. May mắn cho người dùng của bạn, iOS giới hạn số lần thử các ứng dụng phải kiểm tra xem một lược đồ nhất định có được hỗ trợ hay không và họ phải chỉ định các lược đồ mà họ muốn hỗ trợ trả trước.

Để đăng ký URL Schemes tùy chỉnh cho ứng dụng của bạn, bạn có thể thêm các mục nhập vào Info.plist của mình bằng tay hoặc bạn có thể chuyển qua tab Thông tin trong cài đặt dự án của mình. Tôi thích cái sau hơn. Tab Thông tin có một phần gọi là Loại URL. Đây là nơi bạn đăng ký các URL tùy chỉnh của mình. Ví dụ về một lược đồ tùy chỉnh trông như được hiển thị trong ảnh chụp màn hình sau:
    ![](https://images.viblo.asia/9fd5bedc-dff9-4330-9bae-2021d0bb0773.png)

Trường số nhận dạng bằng với số nhận dạng gói của ứng dụng của chúng tôi, trường URLSchemes chứa lược đồ tùy chỉnh, trong trường hợp này là deeplink-example và các trường khác trống. Thêm một lược đồ ở đây sẽ tự động cập nhật Info.plist như được hiển thị trong ảnh chụp màn hình sau:

![](https://images.viblo.asia/6e3aa441-f1b6-40f7-a204-763afd19d489.png)

Khi ứng dụng của bạn được yêu cầu xử lý deep link này, phương thức scene (_: openURLContexts :) được gọi trên đại diện cảnh của bạn. Nếu bạn đang sử dụng đại biểu ứng dụng cũ hơn là đại biểu cảnh, phương thức ứng dụng (_: open: options :) sẽ được gọi trên đối tượng đại biểu ứng dụng của bạn.

Bạn có thể xác nhận xem lược đồ của mình đã được thêm vào và hoạt động chính xác hay chưa bằng cách tạo một bộ điều khiển chế độ xem đơn giản, thêm một nút vào nó và làm cho nó gọi một phương thức thực hiện như sau:

```
let url = URL(string: "deeplink-example://donnywals.com/")!
UIApplication.shared.open(url, options: [:], completionHandler: nil)
```

Và trong phương thức URL mở của bạn (cảnh (_: openURLContexts :) nếu bạn đang sử dụng đại biểu cảnh và ứng dụng (_: mở: tùy chọn :) nếu bạn chỉ sử dụng đại biểu ứng dụng), bạn có thể in như sau:

```
func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
  for context in URLContexts {
    print("url: \(context.url.absoluteURL)")
    print("scheme: \(context.url.scheme)")
    print("host: \(context.url.host)")
    print("path: \(context.url.path)")
    print("components: \(context.url.pathComponents)")
  }
}
```

Đoạn mã trước lấy URL cần được mở và in ra một số thành phần của nó, tôi sẽ giải thích thêm về các thành phần này ở phần sau khi diễn giải một deep link và điều hướng đến phần xem chính xác.

Hiện tại, bạn biết tất cả những gì bạn cần biết về URL Schemes tùy chỉnh. Hãy cùng tìm hiểu sơ qua về Universal Links trước khi chuyển sang xử lý các deep link.`