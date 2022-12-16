# Tạo Virtual Objects Visually trong ARKIT
Thông thường một ứng dụng sẽ có 2 cách để tạo dựng. Thứ nhất là có thể xây dựng mọi thứ bằng code của bạn. Hai là có thể xử dụng ngay trên giao diện trực quan của Xcode, nơi bạn chỉ cần kéo thả mọi thứ.

 Thông thường khi tạo một đối tượng ảo và hiển thị trong AR View chúng ta xử dụng code swift thông thường sau: 
```swift
     let boxNode = SCNNode()
     boxNode.geometry = SCNBox(width: 0.08, height: 0.08, length: 0.08, chamferRadius: 0)
     boxNode.geometry?.firstMaterial?.diffuse.contents =
     UIColor.green
     boxNode.position = SCNVector3(x, y, z)
     sceneView.scene.rootNode.addChildNode(boxNode)
```

Mặc dù viết mã Swift để tạo các đối tượng ảo là tốt,
Nhưng vấn đề xuất hiện khi có nhiều đối tượng ảo. Và một giải pháp thay thế cho việc viết quá nhiều mã Swift để tạo các đối tượng ảo, Xcode cung cấp cho chúng ta thêm các đối tượng ảo và lưu trữ chúng trong tệp SceneKit (.scn). Sau đó, tất cả những gì bạn cần làm là thêm và sắp xếp những đối tượng bạn muốn và lưu trữ chúng dưới dạng tệp SceneKit (.scn). Khi bạn tải tệp SceneKit (.scn) này trong AR View, tất cả các đối tượng ảo sẽ xuất hiện mà bạn không cần phải xác định từng đối tượng riêng lẻ.

### Tạo một SceneKit Assets Folder

Bước đầu tiên để sử dụng tệp SceneKit (.scn) là tạo một thư mục nội dung bằng cách làm theo các bước sau:

1. Chọn File ➤ New ➤ File. 
2. Chọn SceneKit Catalog icon

![](https://images.viblo.asia/eb442d99-7dee-4caf-9b3b-3a0cce36ac5e.png)

3. Next và Xcode sẽ hiển thị popup lưu file
4. Chọn Create một SceneKit Asset Catalog.scnassets  sẽ được tạo.!

### Tạo một file SceneKit (.scn)
Khi bạn đã tạo thư mục SceneKit Assets, bạn cần tạo một tệp SceneKit (.scn) trong thư mục SceneKit Assets. Và để tạo tệp SceneKit (.scn), chỉ cần một vài bước sau:
1. Chọn File ➤ New ➤ File. 
2.  Kéo xuống vào chọn SceneKit Scene File.

![](https://images.viblo.asia/323a5ca0-b639-4225-862e-54cd4e4285a9.png)

3. Nhấp vào nút Next.
4. Chọn Create. Xcode sẽ tạo SceneKit Scene.scn.
5. Kéo và thả tệp SceneKit Scene.scn này vào thư mục SceneKit Assets.

![](https://images.viblo.asia/a18a2413-a6c1-45ed-8406-fa98310b945a.png)
### Thêm Virtual Objects vào file SceneKit(.scn)

Sau khi bạn đã tạo tệp SceneKit (.scn) và lưu trữ nó vào thư mục SceneKit Assets, bước tiếp theo là thêm các đối tượng ảo vào tệp SceneKit (.scn) đó thông qua Object Library bằng cách làm theo các bước sau:
1. Lựa chọn file SceneKit (.scn) của bạn.
2.  Chọn Object Library
3.  Cuộn xuống để tìm các hình dạng hình có sẵn như Box, Cylinder hoặc Pyramid

  ![](https://images.viblo.asia/1a7e0131-1684-4765-828b-c6dcd85a9699.png)
  
4. Kéo và thả một hoặc nhiều hình dạng hình học, chẳng hạn như Box, Cylinder hoặc Pyramid từ e Object Library vào SceneKit.

![](https://images.viblo.asia/e0642e18-d0cc-4a96-be9a-e1dba81e7b76.png)

### Customizing Virtual Objects

Khi bạn đã đặt một hoặc nhiều đối tượng ảo trong tệp SceneKit (.scn), bạn có thể tùy chỉnh đối tượng ảo đó thông qua một trong các công cụ hỗ trợ sau:
- Node inspector: Xác định vị trí, tỷ lệ và góc Euler
- Attributes inspector: Xác định các kích thước
- Materials inspector: Xác định hình dáng bên ngoài
- Physics inspector: Xác định cách đối tượng ảo với tác động vật lý.
- Scene inspector: Xác định độ sáng nền

Để xem inspector pane cho một đối tượng ảo, hãy làm theo các bước sau:
1. Bấm vào đối tượng ảo mà bạn muốn sửa đổi.
2. Chọn View ➤ Inspectors và sau đó chọn inspector pane bạn muốn xem, chẳng hạn như Materials hoặc Node, hoặc nhấp vào biểu tượng thích hợp ở đầu inspector pane.

![](https://images.viblo.asia/029e0605-43fd-48ca-bc6e-e4ecb17d2e1f.png)

### Linking Virtual Objects

Mỗi khi bạn kéo và thả một đối tượng ảo vào tệp SceneKit (.scn), nó sẽ hoạt động độc lập với bất kỳ đối tượng ảo nào khác trong cùng tệp SceneKit đó. Tuy nhiên, bạn có thể muốn giữ hai hoặc nhiều đối tượng ảo được liên kết với nhau. Bằng cách đó nếu bạn sửa đổi vị trí của một đối tượng ảo, tất cả các đối tượng ảo được liên kết sẽ di chuyển để duy trì vị trí tương đối của chúng với các đối tượng ảo khác.
Để liên kết một đối tượng ảo này với một đối tượng ảo khác, hãy làm theo các bước sau:

1. Nhấp vào biểu tượng Show / Hide Scene Graph View để mở Scene Graph View. Chế độ xem đồ thị cảnh liệt kê tất cả tên của các đối tượng ảo được hiển thị trong tệp SceneKit (.scn)

![](https://images.viblo.asia/aee83ad3-5a58-47d5-a417-92f7c10f41d1.png)

2. Chọn vào tên đối tượng ảo trong Scene Graph View mà bạn muốn liên kết với một đối tượng ảo khác.
3. Kéo đối tượng ảo cho đến khi nó xuất hiện bên dưới tên đối tượng ảo khác.
4. Kéo đối tượng ảo sang bên phải bên dưới tên của đối tượng ảo khác.

![](https://images.viblo.asia/d9d56014-cee2-4e90-a62f-726d8525483b.png)

5. Thả nút chuột trái. Xcode hiện hiển thị tên đối tượng ảo được thụt lề bên dưới tên đối tượng ảo khác.

![](https://images.viblo.asia/7accdf62-8dc0-4695-bf8e-55c0e783545b.png)

### Hiển thị một SceneKit (.scn) file trong Augmented Reality

Sau khi bạn đã sửa đổi bất kỳ đối tượng ảo nào bằng cách xác định vị trí, kích thước, tỷ lệ hoặc góc quay Euler của chúng, cuối cùng bạn có thể hiển thị toàn bộ tệp SceneKit (.scn) của mình trong ARView. Đầu tiên, bạn phải để ý đến tên thư mục (chẳng hạn như scene.scnassets) và tên tệp SceneKit (chẳng hạn như myScene.scn). 

Sau đó, bạn có thể tạo một biến scene, chẳng hạn như:
```swift
let item = SCNScene(named: "scene.scnassets/myScene.scn")!
```
Đoạn code này giả định rằng thư mục SceneKit  là scene.scnassets và tệp SceneKit (.scn) là myScene.scn. Bây giờ bạn có thể thêm mục này vào ARView của mình như sau:
```swift
sceneView.scene = item
```

Giả sử giao diện người dùng của bạn có chứa ARKit SceneKit View và IBOutlet của nó được định nghĩa là sceneView, thì việc hiển thị tệp SceneKit (.scn) có thể đơn giản như sau:

```swift
import UIKit
import SceneKit
import ARKit

class ViewController: UIViewController, ARSCNViewDelegate {
     @IBOutlet var sceneView: ARSCNView!
     let configuration = ARWorldTrackingConfiguration()
     
     override func viewDidLoad() {
         super.viewDidLoad()
         // Do any additional setup after loading the view, typically from a nib.
         sceneView.debugOptions = [ARSCNDebugOptions.
         showWorldOrigin, ARSCNDebugOptions.showFeaturePoints]
         sceneView.delegate = self
         let item = SCNScene(named: "scene.scnassets/myScene.scn")!
         sceneView.scene = item
         sceneView.session.run(configuration)
     }
}
```