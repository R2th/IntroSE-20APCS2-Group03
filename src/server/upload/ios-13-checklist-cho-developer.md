# iOS 13
iOS 13 cuối cùng đã được ra mắt. Tôi chắc chắn rằng bạn quan tâm tới bản cập nhật này và sự ảnh hưởng của nó tới việc phát triển ứng dụng của các developer. 
Trước tiên, hãy lướt qua checklist cho iOS 13:
* **SwiftUI** đã phát hành cùng với iOS 13. Giúp xây dựng UI cho người dùng bằng một cách hoàn toàn mới, một framework được Apple thiết kế để giúp các nhà phát triển xây dựng nên các ứng dụng tốt hơn với ít mã hơn.
* **Combine** là Reactive Programming Framework.
* **RealityKit** framework được sử dụng để mô phỏng và hiển thị nội dung 3D một cách dễ dàng. Xây dựng các ứng dụng AR tốt hơn!
* **Project Catalyst**. Bạn có thể dễ dàng chuyển các ứng dụng iOS sang macOS.
Ngoài các framework tuyệt vời phía trên, hãy cùng đi sâu vào các update quan trọng khác

# View Controller Default Presentation Style
Với iOS 13, Apple đã thay đổi kiểu presentation mặc định của View Controllers thành kiểu modal sheet từ toàn màn hình trong iOS 12. Một modal sheet là kiểu giao diện dạng thẻ có thể loại bỏ bằng cách kéo xuống. 

![](https://miro.medium.com/max/294/0*E57pzpuyu8j1ruH5.png)

**Nếu bạn muốn full-screen view controllers**

Bắt đầu từ iOS 13, bạn sẽ cần chỉ định rõ ràng kiểu presentation nếu bạn muốn hiển thị toàn màn hình như đoạn code dưới đây:

```swift
vc.modalPresentationStyle = .fullScreen 
let navigationController = UINavigationController(rootViewController: vc) 
navigationController.modalPresentationStyle = .fullScreen present(vc, animated: true)
```

Để loại bỏ sự kiện kéo xuống để dismiss, bạn hãy sửa code như sau:

```swift
vc.isModalInPresentation = true
```

Bạn thậm chí có thể kiểm soát nhiều hơn các thao tác vuốt để loại bỏ trên bằng cách sử dụng các chức năng được thêm vào trong **IAdaptivePresentationControllerDelegate** protocol:
* presentationControllerDidAttemptToDismiss
* presentationControllerWillDismiss
* presentationControllerDidDismiss
* presentationControllerShouldDismiss

# NavigationBar Large Title Style
Bắt đầu từ iOS 13, UINavestionBar có kiểu tiêu đề lớn không còn translucent nữa.
Chúng ta phải thay đổi translucent bằng cách:

```swift
let appearance = UINavigationBarAppearance() 
appearance.configureWithDefaultBackground() 
UINavigationBar.appearance().scrollEdgeAppearance = appearance
```

UINavigationBarAppearance là class mới để tuỳ biến giao diện.
UINavigationBar sẽ gồm ba kiểu:
* standardAppearance
* compactAppearance
* scrollEdgeAppearance cho navigation bar kèm title lớn.

#  UISegmentedControl mới
**UISegmentedControl** mới có hiệu ứng 3D. Nhưng quan trọng hơn, thuộc tính tintColor không còn hoạt động trong iOS 13.
Thay vào đó, chúng ta cần sử dụngSegmentTintColor được chọn để thay đổi màu background của các segment được chọn.

![](https://miro.medium.com/max/374/1*BW7cJztkYmKm9IJfvZeYSw.png)

# SF Symbols
Bắt đầu từ iOS 13, UIImage đã có một trình khởi tạo mới, **systemName**. 
Bạn có thể chuyển tên hệ thống dưới dạng chuỗi bằng cách tra cứu trong ứng dụng **SF Symbols** Mac, chứa hơn 1000 biểu tượng hệ thống. Bạn có thể tải nó ở [đây](https://developer.apple.com/design/resources/).

```swift
UIImage(systemName: trash.fill)
```

![](https://miro.medium.com/max/665/0*fE8xWI1z7VXUPBWq.png)

# SceneDelegate cho Multi-Window
iPadOS mang đến sự hỗ trợ đa cửa sổ trong cùng một ứng dụng. Bây giờ khi bạn tạo một XCode mới, bạn sẽ thấy một tập tin SceneDelegate. Điều này là để quản lý các cảnh riêng lẻ (cửa sổ). Vì vậy, các trách nhiệm liên quan đến UI của AppDelegate hiện đang được đảm nhận bởi SceneDelegate.

# New Context Menus
Context Menus là một sự thay thế cho Peek và Pop chỉ hoạt động trên các thiết bị chỉ có 3D Touch.
Menu hiển thị ngay phía trên hoặc bên dưới phần preview:

![](https://miro.medium.com/max/392/0*YfR44VC0ZwtH5Vrk.png)

Để tạo một context menu trên collection/table, có một chức năng mới được thêm vào delegate mà bạn cần ghi đè.
Đối với collection view nó là:

```swift
func collectionView(_ collectionView: UICollectionView, 
contextMenuConfigurationForItemAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration?
```

Chúng ta có thể định nghĩa UIMenu của riêng mình và gán hành động cho chúng.
Để mở view controller từ preview, chúng ta cần thêm phương thức:

```swift
func collectionView(_ collectionView: UICollectionView, 
willPerformPreviewActionForMenuWith configuration: UIContextMenuConfiguration, 
animator: UIContextMenuInteractionCommitAnimating)
```

# Dark Mode và Dynamic Colors

Chúng tôi có thể tùy chỉnh giao diện người dùng sang chế độ tối trong iOS 13 bằng cách sử dụng thuộc tính ```userInterfaceStyle```, một phần của ```traitCollection```.
Màu sắc hiện có sẵn và chúng có thể được sử dụng cho chế độ tối hoặc sáng. Chúng ta thậm chí có thể chỉ định bộ màu sắc hoặc hình ảnh động của riêng mình cho ```lightAppurdy``` và ```darkAppurdy```.

Để cài đặt chế độ, chúng ta hatx đặt ```UIUserInterfaceStyle``` thành Light/Dark trong tệp info.plist.

# Đăng nhập với Apple

![](https://miro.medium.com/max/682/1*sf2v52ZojwHLw-XVM4LDfQ.png)

Bắt đầu từ iOS 13, chúng tôi có thể tích hợp nút Đăng nhập với Apple trong các ứng dụng của mình. Nó là một cách an toàn và dễ dàng để đăng nhập và chỉ yêu cầu tên người dùng và địa chỉ email.
Hơn nữa, người dùng có thể lựa chọn ẩn địa chỉ email của họ trong ứng dụng.
Để thêm nút Đăng nhập bằng Apple trong ứng dụng của bạn, chỉ cần nhập Xác thực Dịch vụ và thêm mã sau vào ViewContoder của bạn:

```swift
let button = ASAuthorizationAppleIDButton()        
button.addTarget(self, action: #selector(handleAuthorization), for: .touchUpInside)        
self.view.addSubview(button)
```

![](https://miro.medium.com/max/281/1*jLiiBU2A96DcxYfvjYUPOA.jpeg)

# Vision API Gets a Core ML Boost

The Vision API được tăng cường bằng cách bao gồm **Document Camera View Controller**. Nhận dạng ký tự bây giờ dễ dàng hơn nhiều nhờ cơ chế machine learning model được cải tiến. Hơn nữa, Vision API hiện có một **Pet Animal Classifier** (Phân loại động vật). Đúng vậy, bạn không cần một mô hình Core ML để phát hiện một con mèo hay một con chó! Chỉ cần sử dụng VNRecognizeAnimalRequest là một phần của VNImageRequest là đủ.
# Core ML 3 On Device Personalisation
![](https://miro.medium.com/max/500/1*2YZbW3tMvuGvFHBuZEN9jA.jpeg)

**On Device Training Of Models** là một sự phát triển chính trong Core ML năm nay. Bây giờ bạn có thể đào tạo Mô hình ML trên chính thiết bị của mình.

Đó là  tổng hợp hầu hết các điểm quan trọng của iOS 13. Hi vọng bài viết này sẽ hữu ích đối với các bạn.

# Tài liệu tham khảo
Anupam Chugh. 2019. iOS 13 Checklist for Developers - Better Programming - Medium. [ONLINE] Available at: https://medium.com/better-programming/ios-13-checklist-for-developers-ef47e413aad2. [Accessed 21 October 2019].