![](https://images.viblo.asia/23292951-9e30-4539-9f82-e7b8103a3347.png)

Bài dịch từ nguồn: [medium](https://medium.com/swift-programming/implementing-siri-support-using-nsuseractivity-2c72fe1912ba) của tác giả [Antoine van der lee](https://medium.com/@ajvanderlee)

Ứng dụng Siri có thể được thêm bằng việc sử dụng Intent và Intent mở rộng. Việc này tăng độ nặng của ứng dụng lớn và không dễ sử dụng, bởi bạn cần chia sẻ logic giữa ứng dụng chính và phần mở rộng

1 cách đơn giản hơn là ứng dụng Siri bằng cách sử dụng `NSUserActivity` .

### Yêu cầu Siri mở tới 1 trang trong ứng dụng của bạn
Trong ví dụ này, chúng ta sẽ thông qua Siri để mở tới 1 màn hình trong ứng dụng mà bạn đã setup.

Thêm `Open_board` vào `info.plist` với key là `NSUserActivityTypes`.

![](https://images.viblo.asia/50278a4d-2bbc-4e52-915f-61cca8e3c46d.png)


Sau đó, tạo phần mở rộng cho `BoardDetailViewController` nơi chúng ta sẽ mở nó bằng Siri,

```
extension BoardDetailViewController {
    func activateActivity(using board: Board) {
        userActivity = NSUserActivity(activityType: "Open_board")
        let title = "Open board \(board.title)"
        userActivity?.title = title
        userActivity?.userInfo = ["id": board.identifier]
        userActivity?.suggestedInvocationPhrase = title
        userActivity?.isEligibleForPrediction = true
        userActivity?.persistentIdentifier = board.identifier
    }
}
```

Phương thức này cần được gọi ở `viewDidAppear`:

```
override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)

    activateActivity(using: board)
}
```

Ở đây chúng ta có những thuộc tính 

* `userActivity`
Đây là thuộc tính có sữan trong ` UIViewController` và cho biết rằng ứng dụng đang được sử dụng bởi tương tác người dùng
* `userActivity.userInfo`
Chúng ta tinh chỉnh những thông tin cần thiết bằng deeplink tới bảng xử lý tương tác Siri. Phần này chúng ta sẽ tìm hiểu sau.
* `userActivity.suggestedInvocationPhrase`
Đây là phần đưa ra câu gợi ý ví dụ như hiển thị: "Bạn có thể nói những điều như..."
* `userActivity?.persistentIdentifier`
Đây là mã định danh duy nhất để có thể xoá hoạt động này sau khi kết thúc

### Hiển thị và thêm giọng nói ViewController
Để làm điều đó bạn cần ghi âm 1 đoạn ngắn, chúng ta sẽ chỉ định `INUIAddVoiceShortcutViewController`. Trong ví dụ này, hãy tạo 1 nút trong giao diện với phần mở rộng phương thức `presentAddOpenBoardToSiriViewController`.

```
extension BoardDetailViewController {
    func presentAddOpenBoardToSiriViewController() {
        guard let userActivity = self.userActivity else { return }
        let shortcut = INShortcut(userActivity: userActivity)
        let viewController = INUIAddVoiceShortcutViewController(shortcut: shortcut)
        viewController.modalPresentationStyle = .formSheet
        viewController.delegate = self
        present(viewController, animated: true, completion: nil)
    }
}

extension BoardDetailViewController: INUIAddVoiceShortcutViewControllerDelegate {
    func addVoiceShortcutViewController(_ controller: INUIAddVoiceShortcutViewController, didFinishWith voiceShortcut: INVoiceShortcut?, error: Error?) {
        controller.dismiss(animated: true)
    }

    func addVoiceShortcutViewControllerDidCancel(_ controller: INUIAddVoiceShortcutViewController) {
        controller.dismiss(animated: true)
    }
}
```

Nó sẽ hiển thị giao diện cơ bản iOS với 1 nút ghi âm cho người dùng ở dưới

![](https://images.viblo.asia/9bb841c6-c013-4aca-887a-c25a0ab16596.png)

Thêm hỗ trợ Siri với nút ghi âm

### Xử lý lối tắt
Bất cứ khi nào phím tắt Open Board được  kích hoạt, nó sẽ mở ứng dụng của bạn bằng phương thức AppDelegate và tiếp tục hoạt động của người dùng. Đây là nơi bạn phải khớp hoạt động với hoạt động Siri và mở trang cụ thể. Trong ví dụ này, chúng ta đang sử dụng deeplink để có thể yêu cầu mở trang 

```
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {

    if userActivity.activityType == "Open_board", let parameters = userActivity.userInfo as? [String: String] {
        try? BoardDeeplinkAction(parameters: parameters, context: persistentContainer.viewContext).execute()
        return true
    }
    return false
}
```

Và chỉ như thế, chúng ta đã hoàn thành.

### Bổ sung
Với phần cài đặt như trên đã đủ điều kiện để gợi ý mở ứng dụng. Và ngoài ra hoạt động được sử dụng trên hệ thống dự đóng trên 1 luồng nhất định nên nếu người dùng thường mở bảng Amsterdam trong ví dụ này, thì nó có thể xuất hiện ở phần gợi ý của Siri

![](https://images.viblo.asia/4bc80443-4836-4ad4-820f-c6e7de53eb33.png)