IOS 13 đã release từ tháng 9 với nhiều tính năng hấp dẫn mà các dev mong chờ như :

**PencilKit** là framework được release ở ios 13. Nó cho phép  các nhà phát triển dễ dàng tích hợp môi trường vẽ bằng cách dùng  Apple Pencil hoặc tay người dùng.

**On Device Speech Recognition** dùng  SFSpeechRecognizer  cho phép các nhà phát triển thực hiện các công việc như dịch khi off mạng hay phân tích giọng nói cùng nhiều thứ khác.Việc này sẽ thúc đẩy sử dụng các app AI sử dụng giọng nói .

The **SwiftUI** framework  thu hút nhiều sự chú ý trong năm nay.Nó xây dựng giao diện  1 cách mới mẻ  và hoàn toàn khác.

**Combine** is a Reactive Programming Framework.

**RealityKit** **framework** được dùng để mô phỏng và render 3D rất tốt.Xây dựng các app AR tốt hơn.

**Project Catalyst**  cho phép  chúng ta chuyển IOS app sang macOS một cách dễ dàng. Chỉ cần tick vào checkbox để thêm targe MacOS. Nó hoạt động từ Mac OS 10.15 trở lên.

Ngoài những thứ trên IOS 13 còn cập nhật những thứ mà chúng cần quan tâm khi bạn muốn đưa app của mình lên IOS 13.

## View Controller mặc định là kiểu Presentation Style
Apple đã thay đổi kiểu present mặc định của View Controllers  thành kiểu modal sheet mà có thể dismis bằng cách vuốt xuống. Điều này có thể phá vỡ luồng navigation của app.
Ví dụ như bạn đang ở màn hình Login, bạn login xong và bạn present đến màn hình hiển thị data. Nếu bạn vuốt xuống thì nó lại quay về màn hình Login điều này không đúng với follow của app.
![](https://images.viblo.asia/deed07c2-89e5-41fd-9c05-caa3319a7caf.png)

Nếu bạn muốn full screen:
```
vc.modalPresentationStyle = .fullScreen 
let navigationController = UINavigationController(rootViewController: vc) navigationController.modalPresentationStyle = .fullScreen present(vc, animated: true)
```

Để loại bỏ cử chỉ kéo, em có thể thêm dòng code sau:
```
vc.isModalInPresentation = true
```
Bạn có thể kiểm soát nhiều hơn các thao tác vuốt bằng cách adopt protocol IAdaptivePresentationControllerDelegate:

**presentationControllerDidAttemptToDismiss**: được gọi khi isModalInPresentation là true

**presentationControllerWillDismiss**: được kích hoạch khi người dùng kích hoạch vuốt lên hoặc vuốt xuống viewcontroller.

## UINavigationBar  Title Style sẽ lớn hơn
Từ IOS 13, UINavigationBar cho kiểu tiêu đề lớn , không còn mờ. Chúng ta có thể thay đổi style thành kiểu mờ :
```
let appearance = UINavigationBarAppearance()
appearance.configureWithDefaultBackground() 
UINavigationBar.appearance().scrollEdgeAppearance = appearance
```

**UINavigationBarAppearance**: là một class mới  có thể customize.

**UINavigationBar**: bao gồm 3 chế độ appearance types:
```
standardAppearance
compactAppearance
scrollEdgeAppearance for a large title navigation bar.
........
```

##  UISegmentedControl đã thay đổi
New UISegmentedControl có hiệu ứng 3d. Nhưng quan trọng thuộc tính tinColor không còn hoạt động trên ios 13. Thay vào đó chúng ta có thể dùng **selectedSegmentTintColor** để thay đổi màu nền màu nền của segment đã chọn.

![](https://images.viblo.asia/8c2c9820-9831-4479-a2e4-c217a6e8cb96.png)

## SF Symbols
UIImage có func init mới.
```
UIImage(systemName: trash.fill)
```
Bạn có thể truyền system name  dưới dạng chuỗi bằng cách tra cứu ứng dụng SF Symbols.Ứng dụng này chưa hơn 1000 system icons. Bạn có thể download ứng dụng [ở đây ](https://developer.apple.com/design/resources/)

![](https://images.viblo.asia/da7b58e1-1706-4e6f-b1d9-185d897d8b4b.png)

## SceneDelegate hỗ trợ Multi Window
IpadOS  mang đến sự hỗ trợ  đa cửa sổ trong một ứng dụng. Bây giờ khi bạn sử dụng Xcode 11 bạn sẽ thấy có 1 file SceneDelegate.swift được tạo.Dùng để quản lý các cửa sổ (windows) một cách riêng biệt. Vì vậy các trách nhiệm liên quan đến UI của AppDelegated đều do SceneDelegate đảm nhiệm.

Phương thức  **applicationDidBecomeActive** trong AppDelegate sẽ không hoạt động. Thay vào đó trong SceneDelegate.swift , phương thức **sceneDidBecomeActive** sẽ hoạt động.
Để sử dụng lại các phương thức cũ trong AppDelegate hãy xoá **Application Scene Manifest** trong file Info.plist

![](https://images.viblo.asia/1a105964-71ec-428f-ac44-530247a0717a.png)

## New Context Menus
Context Menus là sự thay thế  3d touch mà chỉ 1 số device mới có. Nó làm việc trên mọi device hổ trợ IOS13. Chúng ta có thể set menu, submenu cũng như xem trước View Controller.
Menu có thể hiển thị phía trên hoặc phía dưới của  Preview
![](https://images.viblo.asia/8ec31688-be09-478b-8a84-bad411827b8c.png)

Để implement context menu trên collection view hoặc tableview bạn cần thêm fucntion sau:
```
func collectionView(_ collectionView: UICollectionView, 
contextMenuConfigurationForItemAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration?
```

Chúng ta có định nghĩa riêng **UIMenu**  và assign action cho chúng.Để có thể mở được view controller đích từ preview bạn cần implement method sau: 

```
func collectionView(_ collectionView: UICollectionView, 
willPerformPreviewActionForMenuWith configuration: UIContextMenuConfiguration, 
animator: UIContextMenuInteractionCommitAnimating)
```

## Dark Mode And Dynamic Colors
Chúng ta có thể tuỳ chỉnh giao diện người dùng sang chế độ tối trong ios 13 bằng cách thuộc tính **userInterfaceStyle**.Để setting  duy nhất chế độ  sáng hoặc tối cho app , bạn cần set UIUserInterfaceStyle thành Light/Dark trong file info.plist.
Dynamic Colors những màu này sẽ tự động tương thích với chế độ sáng hoặc tối.

## Sign In With Apple
Bắt đầu từ IOS 13 , chúng ta có thể bắt đầu tích hợp nút **Sign In With Apple** vào trong ứng dụng. Nó là một cách an toàn và dễ dàng để đăng nhập và chỉ yêu câu tên người dùng và địa chỉ email. Hơn thế nữa, người dùng có lựa chọn ẩn địa chỉ mail của họ trong ứng dụng.

Để thêm  nút **Sign In With Apple** , chỉ cần import **AuthenticationServices** và thêm đoạn mã sau :
```
let button = ASAuthorizationAppleIDButton()        button.addTarget(self, action: #selector(handleAuthorization), for: .touchUpInside)        
self.view.addSubview(button)
```
Sau đó bạn có thể handle authorization và verification trên nút bấm click.Điều này chỉ có trên Xcode 11.
![](https://images.viblo.asia/9df7c036-2477-40db-9c61-51af29fe497f.jpeg)

## Tài liệu tham khảo: 
https://medium.com/better-programming/ios-13-checklist-for-developers-ef47e413aad2