#  Scene Kit Tutorial trong Swift - Part 1
SenceKit là một frameWork của Apple giúp xây dựng và mô phỏng 3D. Đây là frameWork rất mạnh để làm các game hay ứng dụng 3D
Trong phần 1 này chúng ta cùng nhau đi bắt đầu xây dựng project đơn giản để hiểu phần nào về sence kit.

## Bắt đầu
Đầu tiên chúng ta cần khởi tạo project cụ thể có thể theo 2 hướng như sau:
+ File/New/Project
+ nhấn tổ hợp ⇧⌘N
Sau đó chọn  IOS/Application/Game templaet và click Next để tiếp tục:

![](https://images.viblo.asia/8ae52cdd-f6ba-45ec-bc2a-3f2d5610d78f.png)

Sau đó ta cần cung cấp một số thông tin cơ bản như **Product Name** cụ thể ở đây mình chọn là **GeometryFighter**, ngôn ngữ **Swift** và quan trọng nhất đó là chọn game technology **SceneKit**, devices là **Universal**, bỏ chọn test và ấn next:

![](https://images.viblo.asia/3acd1dd1-8877-44d8-92f4-7d8414da46cc.png)

## Xây dựng SenceKit project
Sau khi khởi tạo ứng dụng xong chúng ta cần chạy thử xem kết quả như thế nào.
đầu tiên chọn simulator muốn chạy sau đó nhấn **⌘R**

![](https://images.viblo.asia/fd854109-e8fb-474b-b9ee-32f3e62d72a5.png)

Sau khi máy ảo chạy thì kết quả sẽ được như sau:

![](https://images.viblo.asia/3a62ea7b-7720-4043-b00b-40e56ad1f0ba.png)

Chúng ta có thể xoay hình ảnh 3D trong ứng dụng hay kéo thả đơn giản trên màn hình đến những vị trí khác nhau. Rất hứng thú phải không nào..!!!!

## Dọn các thành phần không cần thiết trong project
Cụ thể chúng ta sẽ loại bỏ các thư mục không cần thiết  như xoá thư mục **art.scnassets** đây là thư mục được tự động tạo ra khi khởi tạo project đây à thư mục tạo ra để tránh xảy ra một số quá trình không cần thiết và chúng ta có thử xoá được.

![](https://images.viblo.asia/a4eab9eb-8b3f-4f09-a4dc-32db7ba1a4f8.png)
Tiếp theo sẽ clean lại các file chính trong projcect
Tệp GameViewControll.swift là thành phần chính trong project. Nó là nơi mà tất cả logic và mã tồn tại. Trước khi có thể code, ta cần lọc tất cả mã  Xcode Scene Kit được tạo ra.
tiến hành bỏ code cũ và thay thành code sau:

```swift
import UIKit
import SceneKit

class GameViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()
  }

  override func shouldAutorotate() -> Bool {
    return true
  }

  override func prefersStatusBarHidden() -> Bool {
    return true
  }
}

```
Bởi code cũ được lập trình để hiển thị space ship. Chúng ta cần xoá và sửa lại để tạo theo mong muốn của mình.

## Thiết lập sence kit
Chúng ta khai báo một thuộc tính cho SCNView hiển thị nội dung của SCNScene trên màn hình bằng cách thêm **scnView** và func ** setupView()** phía trên viewDidLoad.
```swift
var scnView: SCNView!

func setupView() {
  scnView = self.view as! SCNView
}
```

Truyền self.view vào SCNView và lưu trữ nó trong thuộc tính scnView để không phải truyền lại nó bất cứ khi nào bạn cần tham chiếu.

Tiếp theo thêm func **setupScene**
```swift
func setupScene() {
  scnScene = SCNScene()
  scnView.scene = scnScene
}
```
Gọi 2 func trong **viewDidload()** sau Đó chạy ứng dụng bạn sẽ được kết quả.

![](https://images.viblo.asia/eeb474ea-60f8-4e86-9fc1-9626f1ed4db4.png)
Trên đây là những khởi đầu để chúng ta có thể thiết lập và làm một project 3d với sence kit. Tuy không ấn tượng lắm nhưng là công việc không thể thiếu. Hi vọng sẽ giúp ích các bạn. Có gi thiếu xót hay không đầy đủ, khó hiểu xin các bạn lượng thứ. Hẹn các bạn trong phần 2. 
# 
**tài liệu tham khảo**

https://www.raywenderlich.com/1261-scene-kit-tutorial-with-swift-part-1-getting-started