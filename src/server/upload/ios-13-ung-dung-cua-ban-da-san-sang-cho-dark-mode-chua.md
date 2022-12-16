Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/better-programming/ios-13-is-your-app-ready-for-the-dark-6aa73adec14b

### Về bài hướng dẫn này
*Dark Theme* rất tốt cho mắt của bạn vào ban đêm, tiết kiệm pin trên màn hình OLED và trên hết, nó thực sự trông rất tuyệt trên hầu hết các ứng dụng.
Sử dụng *Dark Mode* cho ứng dụng của bạn không khó, mặc dù có thể mất vài ngày tùy thuộc vào số lượng thành phần UI bạn có và số lượng màn hình.
Để làm điều này một cách hiệu quả, bạn cần hiểu cách thức hoạt động của tính năng này và cách xử lý các vấn đề khó với nó.
Trong hướng dẫn này, tôi sẽ giải thích cách *trait collection* liên quan đến giao diện, màu sắc và hình ảnh động (*dynamic color và dynamic image*) là gì và cách xử lý khả năng tương thích ngược (*backward compatibility*).
### Trait Collection
Apple đã giới thiệu thuộc tính *traitCollection* trong iOS 8 để giải quyết các ứng dụng universal với các thiết bị iPad và iPhone.
*traitCollection* là một thuộc tính của protocol [UITraitCollection](https://developer.apple.com/documentation/uikit/uitraitcollection). Một số lớp kế thừa protocol này là *UIScreen*, *UIWindow*, *UIViewController*, *UIPresentationController*, và *UIView*.
*traitCollection* chứa định nghĩa về môi trường giao diện mà đối tượng đang sống: như loại thiết bị (iPad / iPhone), *size class* của thiết bị (*compact/regular*) và tỷ lệ màn hình.
Trên iOS 13, Apple thêm một thuộc tính mới *userInterfaceStyle*, dùng để xác định ứng dụng nên xuất hiện ở chế độ sáng hay tối.
```
if self.traitCollection.userInterfaceStyle == .dark {
     // you are in the dark!
 } else {
     // your are in the light!
 }
```
Cấu hình *traitCollection* được truyền theo thứ tự phân cấp giao diện, bắt đầu từ *UIScreen* đến *UIWindow* và sau đó là *UIViewControllers* và *UIViews*.
![](https://images.viblo.asia/fae093ce-1c34-4c6e-89c0-66ee901cd391.png)
Như bạn có thể thấy, định nghĩa của chủ đề tối / sáng cho mọi thành phần UI luôn được kế thừa từ cha của nó, nhưng bạn luôn có thể tự ghi đè lên nó trong trường hợp bạn muốn một cái gì đó khác cho một tình huống nhất định.
Ví dụ: bạn có thể định nghĩa một chủ đề tối/sáng  khác cho một *UIViewController* nhất định và chủ đề tối/sáng này sẽ tiếp tục được truyền đến tất cả các *UIViewController* con của nó và các *UIView* của nó.
### Màu sắc động (Dynamic Colors)
Hiện tại, *UIColor* chỉ chứa một màu. Nhưng bắt đầu từ iOS 13, *UIColor* có thể linh động hơn - nghĩa là nó có thể chứa một tập hợp các giá trị RGB cho chế độ sáng và chế độ tối.
Khi người dùng chuyển sang chế độ tối trong cài đặt của thiết bị, thì *traitCollection* của *UIScreen* sẽ thay đổi, và các đối tượng UI liên quan tới nó cũng thay đổi theo. Nếu các đối tượng UI này chứa các thành phần có màu như UILabel hay màu nền, và màu của chúng là động (bao gồm màu cho cả chế độ tối và chế độ sáng), nó sẽ tự động thay đổi theo màu tương ứng. 
Nếu bạn giữ mọi thứ động, thì sự thay đổi màu sắc tương ứng cho từng chế độ sẽ được diễn ra một cách tự động. Nghe thật tuyệt, phải không?
### Cách tạo dynamic colors
Chúng ta có một vài cách để tạo *dynamic color* như sau
#### Storyboard/interface builder
Cách này khá dễ dàng. Apple đã cung cấp một tập hợp các định nghĩ cho *dynamic color* như *System Black Color*, *System Orange Color*... Chúng đều có 2 phiên bản màu, một cho chế độ tối, một cho chế độ sáng. Sau khi bạn thiết lập màu cho một *view* trên *storyboard*, bạn không phải chạy ứng dụng để kiểm tra nó trông như thế nào, có một tuỳ chọn trong *XCode* để chuyển *Interface Builder* sang chế độ tối. 
![](https://images.viblo.asia/d1411641-76fa-4745-8c24-4484ddb7124b.png)
![](https://images.viblo.asia/20f94526-4a3f-457c-a714-3322ab88130e.png)
#### Asset catalog
Trong trường hợp nếu bạn chưa biết thì có một tuỳ chọn để tạo tập hợp màu sắc trên *asset catalog*, và bạn có thể dùng chúng trong cả viết code và *storyboard*. Khi bạn tạo một tập hợp màu sắc, chọn tab *attributes inspector*, chọn *Appearance* và chắc chắn tuỳ chọn *Any, Light, Dark* được chọn. Tại đây, bạn có thể chọn các màu khác nhau cho các chế độ khác nhau.

![](https://images.viblo.asia/8e2de997-3ceb-48b0-a15a-a3fc1af16720.png)
![](https://images.viblo.asia/de77263c-1fff-4365-be1e-9891596f47be.png)
#### Code
Bạn cũng có thể tạo *dynamic color* bằng code. Bạn chỉ cần khởi tạo UIColor với một hàm khởi tạo mới:
```
init(dynamicProvider: @escaping (UITraitCollection) -> UIColor)
```
Để trả về các giá trị tương ứng cho từng chế độ.
```
let myDynamicColor = UIColor { (traitCollection: UITraitCollection) -> UIColor in 
    if traitCollection.userInterfaceStyle == .dark {
        return UIColor(red: 0, green: 0, blue: 0, alpha: 1.0)
    } else {
        return UIColor(red: 220, green: 220, blue: 220, alpha: 1.0)
    }                             
}
```
### Xử lý khi chế độ sáng/tối thay đổi
Khi người dùng thay đổi chế độ hiển thị sáng/tối, tất cả hàm *viewWillLayoutSubviews* và *containerWillLayoutSubviews* của *UIViewController* sẽ được gọi.
Còn với *UIView* là hàm *layoutSubviews* và hàm *draw*.
Do đó, bạn có thể đặt các thay đổi nào bạn muốn khi chế độ hiển thị sáng/tối thay đổi vào các hàm trên để đảm bảo an toàn.
Ngoài ra, thì tất cả những đối tượng phù hợp với giao thức *UITraitEnviroment*, hàm *traitCollectionDidChange* cũng được gọi.
Trong *UIView*, hàm *tintColorDidChange* cũng sẽ được gọi đến.
### Dynamic Images
Hình ảnh, cũng giống như màu sắc, có thể thiết lập động. Bạn có thể thiết lập các asset khác nhau cho chế độ sáng/tối, và sử dụng chúng từ *asset catalog* như với màu sắc.
Khi bạn chọn *attributes inspector* trong khung bên phải, bạn sẽ thấy *Appearance* xuất hiện, chọn *Any, Light, Dark* là bạn sẽ yêu cầu để được thiết lập các ảnh khác nhau cho chế độ sáng/tối và với thiết bị với độ phân giải khác nhau.
Ví dụ, bạn có thể thiết lập ảnh bình minh cho chế độ sáng, và ảnh hoàng hôn cho chế độ tối. 
*UIImageView* sẽ tự động xử lý lấy hình ảnh thích hợp cho từng chế độ hiển thị.
### Một số lưu ý
Có một số lưu ý có thể giúp bạn trong việc làm giao diện cho chế độ tối.

Nếu bạn khởi tạo các màu sắc và hình ảnh tuỳ chỉnh trong hàm *init* hoặc *viewDidLoad*, thì bạn nên đưa chúng vào hàm *layoutSubviews* và *viewDidLayoutSubiews*, nó sẽ giúp bạn xử lý khi chế độ sáng/tối thay đổi. 

Kể từ khi *CALayer* không còn là một phần của *UIKit*, nó sẽ không biết khi chế độ hiển thị sáng/tối thay đổi, đây là một điều bạn cần chú ý.

Trong một số trường hợp bạn muốn tách màu thực tế mà bạn lấy được từ *dynamic color*. Điều này dễ dàng thực hiện được bằng hàm *resolvedColor* của *UIColor*.
```
let dynamicColor = UIColor.systemBackground
let traitCollection = view.traitCollection
let resolvedColor = dynamicColor.resolvedColor(with: traitCollection)
```

*Activity Indicator* cũng được thay đổi, giờ nó bao gồm 2 kiểu: medium và large. Tuy nhiên, phong cách giao diện sẽ quyết định màu sắc.

Trong *attributed text*, bạn phải chắc chắn bạn đã định nghĩa một *dynamic color* cho văn bản, nếu không màu mặc định của hệ thống sẽ được thiết lập cho label và sẽ là màu đen.
### Nếu bạn không muốn chế độ tối
Rất đơn giản để vô hiệu hoá nó trong toàn bộ ứng dụng bằng cách thiết lập *UIUserInterfaceStyle* với giá trị là *Light* trong tệp *info.plist*.
Bạn cũng có thể vô hiệu hoá nó trong từng *UIViewController/UIView* cụ thể bằng cách ghi đè thuộc tính *overrideUserInterfaceStylevariable*. 
```
self.overrideUserInterfaceStyle = .dark // always dark
```
### Nếu bạn đã có sẵn một ứng dụng
Với một ứng dụng mới, được thiết lập để chạy từ iOS 13 trở lên, thì mọi việc sẽ rất đơn giản và trơn tru.
Nhưng nếu bạn đã có sẵn một ứng dụng rồi, việc này sẽ là một thử thách nhẹ. Đặc biệt, nếu ứng dụng lại đã có một vài kiểu hiển thị khác nữa. 
Việc hỗ trợ các phiên bản cũ sẽ dễ dàng nếu bạn sử dụng *interface builder* và *assets catalog* để đặt màu sắc và hình ảnh. Chỉ cần sử dụng màu động và đối với các phiên bản cũ hơn, iOS sẽ chọn phiên bản màu sáng. 
Còn nếu bạn có ý định tạo màu sắc bằng code, đề xuất của tôi là bạn nên tạo ra một hàm và truyền 2 phiên bản của màu sắc (sáng/tối) vào hàm đó. Bên trong hàm này, dựa vào phiên bản nó sẽ khởi tạo màu tương ứng.
```
func createTitleColor(lightVersion : UIColor, darkVersion : UIColor)->UIColor {
    if #available(iOS 13.0, *) {
      let myDynamicColor = UIColor { (traitCollection: UITraitCollection) -> UIColor in if traitCollection.userInterfaceStyle == .dark {
                return darkVersion
            } else {
                return lightVersion
                }
            }
            return myDynamicColor
        } else {
            return lightVersion
        }
 }
```
Ngoài ra, trong trường hợp bạn có một tính năng chế độ tối trong ứng dụng của mình, bạn nên xem xét lại việc bảo trì tính năng này.