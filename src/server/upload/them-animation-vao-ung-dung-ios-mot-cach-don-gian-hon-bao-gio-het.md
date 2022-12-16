Animation như một điều không thể thiếu của ứng dụng di động. Kết hợp hoạt ảnh với giao diện người dùng (UI) và thiết kế trải nghiệm người dùng (UX) là điều rất cần thiết, vì nó đóng vai trò quan trọng trong việc nâng cao cách mọi người phản hồi ứng dụng hoặc trang web.

Chúng ta có thể tạo các animation đơn giản bằng cách thay đổi vị trí hay kích thước các frame. Nhưng để tạo ra các animation phức tạp và bắt mắt thì không hề đơn giản. 
Trong bài viết này sẽ chia sẻ tới mọi người về một thư viện hữu ích cho animation là [`Lottie`](https://cocoapods.org/pods/lottie-ios)
## 1. Giới thiệu về Lottie
Đây là một thư viện hỗ trợ cho cả Android và iOS,  nó dùng để render các vector animations và art một cách đơn giản. 
Lottie load và render animations và vectors từ file  bodymovin JSON, loại file này có thể được tạo bởi After Effects, Sketch, ...
Đây sẽ thành cầu nối giữa developer và designer rất hữu ích. 
![](https://images.viblo.asia/1a7d0645-d7aa-466f-b503-6c1e728690f7.gif)

## 2. Tạo ứng dụng demo
### Chuẩn bị file json:
Nếu không thể tự tạo được file Json bạn có thể lên trang chủ của [Lottie](https://lottiefiles.com/) để tải về các animation mong muốn.

Chọn animation mong muốn -> copy mã -> lưu lại dưới dạng .json

### Tạo project :

Khởi tạo single app với Xcode
![](https://images.viblo.asia/6468862f-dc7c-4c21-90c4-87774da111cf.png)

Sau đó bạn hãy add file json vừa tạo ở trên vào project của mình.

### Thêm thư viện vào project:
Tiếp theo bạn cần khởi tạo Podfile và thêm lottie. Trong project tôi đã thêm thư viện SnapKit hỗ trợ việc constraint các view
![](https://images.viblo.asia/76c6b84a-5dfa-40d8-b3da-dcaf67beaa51.png)

### Khởi tạo Lottie View:
Khời tạo 1 file swift để khởi tạo lottie view, tại đây sẽ load file json và thêm một số config cho view
```swift
import Lottie

final class LottieNinjaView: UIView {
    
    fileprivate let animationView = AnimationView()
    
    func configView() {
        let loadingAnimation = Animation.named("ninja")
        animationView.animation = loadingAnimation
        animationView.contentMode = .scaleAspectFit
        animationView.backgroundColor = .clear
        self.backgroundColor = .clear
        self.addSubview(animationView)
        self.bringSubviewToFront(animationView)
        animationView.frame = CGRect(x: 0, y: 0, width: 200, height: 200)
        animationView.play()
        animationView.loopMode = .loop
    }
    
    func startAnimating() {
        DispatchQueue.main.async {
            self.animationView.pause()
            self.animationView.play()
        }
    }
    
    func stopAnimating() {
        DispatchQueue.main.async {
            self.animationView.pause()
        }
    }
}

```

### Thêm view vào Viewcontroller:
Tiếp theo chúng ta quay lại file Viewcontroller để khởi tạo đối tượng và add vào supperView:
```swift
import UIKit
import Lottie
import SnapKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let ninjaView = LottieNinjaView()
        ninjaView.configView()
        
        view.addSubview(ninjaView)
        
        ninjaView.snp.makeConstraints { (make) in
            make.centerY.centerX.equalTo(view)
            make.width.width.equalTo(200)
            make.width.height.equalTo(200)
        }
    }


}
```
### Kết quả:
Kết quả thu được như sau : 
![](https://images.viblo.asia/6e998429-9fc4-45e0-9b94-d644794bfa71.gif)

## 3. Kết luận
Đây chỉ là một ví dụ đơn giản của Lottie, ngoài ra còn rất nhiều điều tuyệt vời khác.

Các bạn hãy tìm hiểu thêm tại: https://github.com/airbnb/lottie-ios