Ở WWDC 2018, Apple đã đưa ra phiên bản ARKit 2.0 với một tá các API và đặc tính mới việc phát triển AR(Augmented Reality). Một trong những đặc tính đó là một sự bổ sung cho API của Quick Look. Nếu bạn chưa biết Quick Look là gì, thì nó là một framework cho phép người sử dụng xem được rất nhiều định dạng file như PDF, ảnh, và nhiều thứ nữa. Ứng dụng Mail của iOS sử dụng Quick Look để xem các file đính kèm.

Đặc điểm có lợi của Quick Look khi sử dụng trong ứng dung đó là bạn chỉ phải quản lý xem file nào bạn cần "quick look!". Framework đã quản lý hết việc hiển thị liên quan đến UI và UX nên việc đưa vào ứng dụng rất dễ. Bạn có xem qua hướng dẫn sau nếu bạn muốn tìm hiểu thêm về [Quick Look](https://www.appcoda.com/quick-look-framework/).

Năm nay, với việc ra mắt iOS 12, Apple đã giới thiệu việc đưa Quick Look vào trong đối tượng AR. Điều này có nghĩa rằng bạn có thể chia sẻ file ".usdz" trong Mail, Messages hoặc bất kì ứng dụng nào hỗ trợ Quick Look. Người nhận có thể mở và xem đối tượng mà không cần phải tải một ứng dụng khác về.

![](https://images.viblo.asia/d749f95a-4b92-4839-9b29-d536ae5ff334.png)

# USDZ là gì ?

Trước khi bắt đầu vào quá trình code, chúng ta cần tìm hiểu USDZ là gì. Nó viết tắt của từ "Universal Scene Description Zip". Nếu bạn đã từng làm việc với các model 3D, bạn sẽ thấy quen thuộc với với các loại sau ".OBJ", ".DAE" hoặc ".sketchup". USDZ được kết hợp tạo ra giữa Pixar và Apple.

USDZ không khác gì một file ".zip" chứa những model và các texture vào trong cùng một file. Nó là lý do vì sao USDZ lại được sử dụng cho Quick Look mà không phải dạng 3D model nào khác.

Bây giờ bạn sẽ thắc mắc "làm sao để tạo được file USDZ ?". Cách làm của nó đơn thuần chỉ là bạn hãy tạo các 3D model theo đúng cách như xưa các bạn từng làm với (AutoCAD, Blender, Maya, ...) sau đó dùng Xcode để chuyển nó thành định dạng ".usdz".

# Chuyển đổi 3D model sang USDZ

Chuyển đổi sang USDZ khá đơn giản, trước tiên bạn cần phải có 3D model trước, bạn có thể lấy ở [đây](https://raw.githubusercontent.com/appcoda/AR-Quick-Look-Demo/master/egg.obj) nếu như không có.

Khi đã download xong bạn hãy dùng lệnh sau đây : 
```
xcrun usdz_converter /Users/You/PATH/TO/egg.obj /Users/You/CHOOSE/A/PATH/TO/SAVE/egg.usdz
```

và ở terminal thì như sau 

![](https://images.viblo.asia/b1bff351-56a1-40ff-b94e-14ddd1febb33.png)

Ấn enter, trong vài giây, bạn sẽ thấy file ".usdz" được lưu ở trong đường dẫn mà bạn đã chọn. Ấn space để xem file

![](https://images.viblo.asia/b1bff351-56a1-40ff-b94e-14ddd1febb33.png)

# Thêm AR Quick Look vào trong ứng dụng

Bắt đầu với việc tải project sau về ở [đây](https://github.com/appcoda/AR-Quick-Look-Demo/raw/master/ARQuickLookStarter.zip). Hãy nhìn vào trong project, bạn sẽ thấy có một collection view được dựng sẵn bên trong.

![](https://images.viblo.asia/4a97bc63-7902-4ded-8d7e-cddfb5ab674d.png)
Chạy project, bạn sẽ lấy một danh sách các model nhưng khi bạn ấn vào nó thì không có hiện tượng gì xảy ra cả.

![](https://images.viblo.asia/c5837c2d-0052-41a4-8b77-24c4c232d2d5.png)

Đầu tiên, hãy thêm "Egg" vào trong thư mục "Models". Kéo "egg.usdz" vào tong đó. Đảm bảo rằng khi bạn kéo nó vào trong thư mục, bạn đã check vào ô target như bên dưới.

![](https://images.viblo.asia/6ca9307d-9d4a-47e0-bc14-fb059fbdbc1a.png)

Tiếp đến, hãy ấn vào "ViewController.swift" và thêm "egg" vào trong "models". Với cách này, khi ta chạy ứng dụng, model sẽ hiển thị lên trong danh sách.

![](https://images.viblo.asia/b5891fd8-98b6-494a-9625-ea485046dde0.png)

Việc còn lại đó là thêm code cho phần Quick Look cho mỗi model này. Đầu tiên, bắt đầu với việc import "QuickLook" vào trong ứng dụng. Khi ta tạo "UICollectionView", chúng ta đã thêm phần "Data Source" và "Delegate" để cho chúng ta có quyền truy cập vào những hàm cần thiết để thêm dữ liệu vào collection view. Đơn giản, chúng ta làm tương tự đối với Quick Look.

```swift
import UIKit
import Foundation
import QuickLook
 
class ViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, QLPreview
```

Có hai hàm mà chúng ta cần phải thêm để có thể điều chỉnh: "numberOfPreviewItems()" và "previewController(previewItemAt)". Nó sẽ trông gần giống với "UITableView" hoặc "UICollectionView". Thêm đoạn code sau vào trong "collectionView(didSelectItemAt)".

```swift
func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
    return 1
}
    
func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
    let url = Bundle.main.url(forResource: models[thumbnailIndex], withExtension: "usdz")!
    return url as QLPreviewItem
}
```

1. Trong hàm đầu tiên, chúng ta được yêu cầu số lượng item được cho phép xem trong một lần. Vì chúng ta muốn xem một 3D model trong một lần, nên chúng ta sẽ để 1 ở đó.
2. Trong hàm thứ hai, hàm này yêu cầu file nào sẽ được xem khi item được bấm vào với một "index" cụ thể. Chúng ta định nghĩa một constant là  "url" chính là đường dẫn tới file ".usdz". Sau đó, chúng ta trả một đối tượng "QLPreviewItem."

![](https://images.viblo.asia/c67770aa-fd65-4002-8c91-2d10dcc87dea.png)

Nếu như chúng ta chạy code bây giờ, sẽ không có hiện tượng gì xảy ra, vì sao ? Vì chúng ta chưa thêm logic cho việc hiển thị "QLPreviewController". Hãy vào "collectionView(didSelectItemAt)" và sửa như sau 

```swift
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    thumbnailIndex = indexPath.item
 
    let previewController = QLPreviewController()
    previewController.dataSource = self
    previewController.delegate = self
    present(previewController, animated: true)
}
```

Giống như tôi đã đề cập phía trên, chúng ta đặt "thumbnailIndex" bằng "index" mà người dùng ấn vào. Điều này giúp cho Quick Look biêt được model nào sẽ được sử dụng. Nếu bạn sử dụng Quick Look trong ứng dụng với mọi định dạng file, thì bạn sẽ luôn biểu diễn nó trên "QLPreviewController". Cho dù nó có là một văn bản, ảnh hay ở trong trường hợp này là một 3D model, "QuickLook" framework yêu cầu chúng ta biểu diễn những file này trên "QLPreviewController". Chúng ta đặt "previewController" cho phần dataSource và delegate cho "self" để hiển thị nó.

![](https://images.viblo.asia/e7127cc0-9bb9-4d14-a6f7-1d540499ec82.png)

Hãy chạy ứng dụng, Đảm bảo rằng bạn đang chạy trên thiết bị iOS 12. Chạy ứng dụng trên simulator sẽ không hiển thị lên "QuickLook".

![](https://images.viblo.asia/695b2c49-8bb1-4fa5-b926-8ccc098b8201.png)

Nó hoạt động theo đúng như mong đợi, bây giờ bạn đã biết được làm thế nào để đưa AR QuickLook vào trong ứng dụng. Nhưng nó chưa phải là tất cả, AR QuickLook còn hỗ trợ cả web nữa, ở phần tiếp theo chúng ta sẽ dùng HTML và AR QuickLook để xây dựng website giống như trên ứng dụng này.

REF: https://www.appcoda.com/arkit-quick-look/