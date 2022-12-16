Từ [WWDC 2012](https://developer.apple.com/videos/play/wwdc2012/208/) apple đã giới thiệu một tính năng khá đặc biệt mà thường chúng ta hay bỏ qua. Đó là việc phép người dùng quay lại ứng dụng của họ ở trạng thái chính xác mà họ đã rời khỏi ứng dụng. Đây là một tính năng mà mình thấy tương đối là hay. 

Như ta đã biết khi ứng dụng của bạn chuyển về trạng thái background và không được sử dụng trong thời gian dài. Hệ điều hành có thể sẽ terminate ứng dụng của bạn để giải phóng bộ nhớ. Điều này có thể làm gián đoạn trải nghiệm nguời dùng, cũng như công việc đang làm dở của bạn. Trong bài này mình sẽ hướng dẫn các bạn các bạn xử lý khôi phục trạng thái ứng dụng sau khi ứng dụng của bạn bị gián đoạn trong quá trình sử dụng.

## Getting start
Để tiện cho việc theo dõi chúng ta xây dựng một ứng dụng đơn giản như sau. Ứng dụng có RootViewController là một TabbarController. Gồm 2 tab như sau.

![](https://images.viblo.asia/d66e9372-60cb-4381-a92d-cb02ba063430.png)

## Testing
Để thực hiện test bạn thực hiện như sau. 
- Build ứng dụng sau đó cho ứng dụng xuống background, trở lại xcode stop application. 
- Duoble click home button trên simulator để kill ứng dụng của bạn. sau đó build lại ứng dụng và check lại state của ứng dụng xem việc khôi phục trạng thai đã hoạt động hay chưa.

Bạn sẽ không thấy bất ứng dụng của bạn phản ứng gì, đơn giản để thực hiện nó bạn cần phải thực hiện thêm một số bước nữa.
## Enabling State Restoration
Để enable state restoration. Trong Appdelegate bạn cần implement thêm 2 method.
```
func application(application: UIApplication, shouldSaveApplicationState coder: NSCoder) -> Bool {
  return true
}

func application(application: UIApplication, shouldRestoreApplicationState coder: NSCoder) -> Bool {
  return true
}
```

Chỉ implement 2 method trong App delegate là chưa đủ. Bạn cần phải cung cấp các chuỗi định danh cho từng màn hình để iOS có thể nhận dạng và restore đúng vị trí mà trước đó ứng dụng của bạn đã bị tạm dừng. Mỗi màn hình sẽ có một restoration identifier.

## Setting Restoration Identifiers
Mở Main.storyboard bạn select tab bar controller và open Identity Inspector. Sau đó bạn enable Storyboard 

![](https://images.viblo.asia/c1549189-b78d-4607-b5b2-a176c4b3af04.png)


Note that all the controllers already have a Storyboard ID and the checkbox simply uses the same string that you already have as Storyboard ID. If you are not using Storyboard IDs, you need to manually enter a unique Restoration ID.

Chú ý rằng tất cả các controller đều có storyboard ID và việc enable use storyboard ID trong phần Restoration ID nó sẽ lấy mặc định giống với storyboard ID. TH bạn không muốn lấy giống với storyboard id thì bạn có thể tự nhập vào text box ngay trên đó.

TH bạn không sử dụng main.storyboard thì bạn cần cung cấp cho iOS biết về Restoration ID thông qua protocol UIViewControllerRestoration xem ví dụ sau.
```
extension HomeViewController: UIViewControllerRestoration {
    
    static func viewController(withRestorationIdentifierPath identifierComponents: [Any],
                               coder: NSCoder) -> UIViewController? {
        let vc = HomeViewController(nibName: self.nibName(), bundle: nil)
        vc.restorationIdentifier = self.nibName()
        vc.restorationClass = HomeViewController.self
        return vc
    }
}
```
Về cơ bản thì tới đây vị trí tại thời điểm kết thúc app của bạn đã được lưu lại. Nhưng bạn cần phải store những thông tin đang thực hiện trước đó. 

## The UIStateRestoring Protocol
Để thực hiện chức năng restore này, về cơ bản iOS đã support cho bạn khá nhiều rồi. Nhưng để tái tạo lại toàn bộ dữ liệu trước đó ứng dụng của bạn đang thực hiện thì bạn cần phải lưu lại những thông tin này.

Thông qua việc mã hoá và giải mã thông tin. Nó sẽ được gọi thông qua các UIStateRestoring protocol.

Tất cả các View Controller đều có một restoration identifier  và nó sẽ gọi đến encodeRestorableStateWithCoder(:)  nếu app của bạn bị tạm dừng. Tại đây bạn sẽ lưu lại các thông tin cần thiết để có thể restore lại viewController của bạn khi bạn mở app lên sau đó.

Việc mở app lên các ViewController sẽ nắng nghe protocol encodeRestorableStateWithCoder(:) . Tại đây bạn sẽ thực hiện restore lại viewController đó với các thông tin đã lưu lại trước đó.
VD như bạn đang xem một cuốn sách. Khi kết thúc app bạn lưu lại id của cuốn sách đó và khi restore bạn thực hiện việc get ID của cuốn sách đã lưu trước đó thực hiện API get thông tin chi tiết cuốn sách đó và hiển thị lên trên view controller của bạn.

## Kết luân
Đây là một tính năng đã được giới thiệu từ khá lâu rồi nhưng minh thấy khá ít người chú ý đến nó khi phát triển ứng dụng. Tuy nhiên một mài tính năng nhỏ như thấy này có thể mang lại chải nghiệm rất tốt cho người dùng.