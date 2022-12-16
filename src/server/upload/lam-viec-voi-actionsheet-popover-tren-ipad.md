# Làm việc ActionSheet Popover trên iPad
Gần đây khi làm việc với một số app trên iPad, mình gặp một vài vấn đề với việc present một ActionSheet, nên tiện đây ghi ra hi vọng sẽ giúp được các bạn phần nào.
Nếu các bạn đã quen làm việc với các app trên iPhone, khi muốn tạo một ActionSheet thì hẳn là các bạn không còn lạ lẫm với đoạn code sau:

```swift
@IBAction func showDeleteActionSheet(_ sender: AnyObject) {
  let alertController = UIAlertController(title: nil, message: "Alert message.", preferredStyle: .actionSheet)

  let defaultAction = UIAlertAction(title: "Default", style: .default, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some action here.
  })

  let deleteAction = UIAlertAction(title: "Delete", style: .destructive, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some destructive action here.
  })

  let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: { (alert: UIAlertAction!) -> Void in
    //  Do something here upon cancellation.
  })

  alertController.addAction(defaultAction)
  alertController.addAction(deleteAction)
  alertController.addAction(cancelAction)

  self.present(alertController, animated: true, completion: nil)
}
```

Ở đoạn code trên tôi giả định rằng mỗi khi user nhấn vào button, tôi sẽ present một ActionSheet lên màn hình. Trên iPhone nó hoạt động khá hoàn hảo, kết quả tôi thu được về như sau:

![](https://images.viblo.asia/cd4760e7-17b9-49b4-aeba-4a1cb07aa2a4.png)

Tuy nhiên khi build và chạy ứng dụng trên iPad, tôi nhận được một lỗi như sau:

> Terminating app due to uncaught exception ‘NSGenericException’, reason: ‘Your application has presented a UIAlertController (<UIAlertController: 0x7f9d0ad52ca0>) of style UIAlertControllerStyleActionSheet. The modalPresentationStyle of a UIAlertController with this style is UIModalPresentationPopover. You must provide location information for this popover through the alert controller’s popoverPresentationController. You must provide either a sourceView and sourceRect or a barButtonItem. If this information is not known when you present the alert controller, you may provide it in the UIPopoverPresentationControllerDelegate method -prepareForPopoverPresentation.’

Hóa ra có một số khác biệt khi hiển thị một ActionSheet trên iPhone và iPad. Để xử lý lỗi này, chúng ta cần phải thực hiện một số cài đặt trước khi present ActionSheet trên iPad. 
Có hai cách để cài đặt vị trí hiển thị của Actionsheet:
* Thông qua sender là một UIButton, UIBarButtonItem, ...
* Thông qua một CGRect

### Cách 1: Thông qua sender

Có hai cách tiếp cận phương pháp này, một là thay đổi tham số của button action method thành UIBarButtonItem hoặc hai là casting kiểu AnyObject thành kiểu UIBarButtonItem  khi set giá trị cho popoverController.barButtonItem.
Với cách 1, button action method sẽ như thế này:

```swift
@IBAction func showDeleteActionSheet(_ sender: UIBarButtonItem) {
  let alertController = UIAlertController(title: nil, message: "Alert message.", preferredStyle: .actionSheet)

  let defaultAction = UIAlertAction(title: "Default", style: .default, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some action here.
  })

  let deleteAction = UIAlertAction(title: "Delete", style: .destructive, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some destructive action here.
  })

  let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: { (alert: UIAlertAction!) -> Void in
    //  Do something here upon cancellation.
  })

  alertController.addAction(defaultAction)
  alertController.addAction(deleteAction)
  alertController.addAction(cancelAction)
  
  if let popoverController = alertController.popoverPresentationController {
    popoverController.barButtonItem = sender
  }

  self.present(alertController, animated: true, completion: nil)
}
```

Với cách 2, đoạn code sẽ như thế này:

```swift
@IBAction func showDeleteActionSheet(_ sender: AnyObject) {
  let alertController = UIAlertController(title: nil, message: "Alert message.", preferredStyle: .actionSheet)

  let defaultAction = UIAlertAction(title: "Default", style: .default, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some action here.
  })

  let deleteAction = UIAlertAction(title: "Delete", style: .destructive, handler: { (alert: UIAlertAction!) -> Void in
    //  Do some destructive action here.
  })

  let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: { (alert: UIAlertAction!) -> Void in
    //  Do something here upon cancellation.
  })

  alertController.addAction(defaultAction)
  alertController.addAction(deleteAction)
  alertController.addAction(cancelAction)
  
  if let popoverController = alertController.popoverPresentationController {
    popoverController.barButtonItem = sender as? UIBarButtonItem
  }

  self.present(alertController, animated: true, completion: nil)
}
```

Cả hai cách trên đầu sẽ cho chúng ta kết quả như sau:

![](https://i.imgur.com/kQC6MyNr.jpg)

Hmm,... Nhưng đây vẫn chưa phải kết quả mong muốn của tôi, nếu tôi muốn ActionSheet sẽ được hiện lên ở giữa màn hình thì sao? Đây là lúc chúng ta cũng xem cách thứ 2.

### Cách 2: Sửa dụng sourceRect:

Hãy cùng xem đoạn code sau:

```swift
if let popoverController = alertController.popoverPresentationController {
  popoverController.sourceView = self.view
  popoverController.sourceRect = CGRect(x: self.view.bounds.midX, y: self.view.bounds.midY, width: 0, height: 0) 
}
```

Với cách này chúng ta không cần thay đổi thuộc tính barButtonItem của popOverController nữa, mà thay vào đố truyền vào một CGRect cho thuộc tính sourceView. Kết quả thu được sẽ như sau:

![](https://i.imgur.com/2GVD3dPr.jpg)

Không tệ, tuy nhiên thay vì pop over nằm ở giữa màn hình, chúng ta lại thấy một popover với mũi tên chỉ vào điểm chính giữa màn hình. Chúng ta cần làm như sau để bỏ cái mũi tên đáng ghét ấy đi:

```swift
if let popoverController = alertController.popoverPresentationController {
  popoverController.sourceView = self.view
  popoverController.sourceRect = CGRect(x: self.view.bounds.midX, y: self.view.bounds.midY, width: 0, height: 0)
  popoverController.permittedArrowDirections = []
}
```

Bravo, kết quả thu được sẽ hoàn hảo như sau:

![](https://i.imgur.com/yrA6OWO.jpg)

Trên đây là tất cả những gì tôi đã làm để có được một popover dạng ActionSheet trên iPad sử dụng UIAlertViewController.
Nếu bạn có bất kì thắc mắc/góp ý/ ý kiến nào, đừng ngại chia sẻ bằng cách để lại comment/câu hỏi/ý kiến/lời khuyên bên dưới bài viết. Cảm ơn đã dành thời gian theo dõi. Peace