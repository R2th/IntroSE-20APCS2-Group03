# I. Giới thiệu

ARKit đã được Apple giới thiệu trong sự kiện ra mắt của iOS 11 cùng loạt iPhone mới: iPhone 8, 8 plus, iPhone X. Tuy nhiên, tại những phiên bản iOS 11.x trước đây, Apple đã không tích hợp tính năng nhận diện ảnh 2D vào ARKit. ARKit lúc này chỉ có thể nhận diện các mặt phẳng ngang, mặt thẳng đứng, mà không thể nhận diện chính xác trên hình ảnh mà chúng ta muốn. Không thể control thứ chúng ta muốn detect làm ảnh hưởng rất nhiều đến khả năng dùng thư viện ARKit, thử tưởng tượng các bạn muốn hiển thị một object 3D khi App phát hiện ra ảnh của bạn, nhưng khi sử dụng ARKit object 3D đó lại được hiển thị ở mọi nơi có mặt phẳng, điều này sẽ khiến bạn phải từ bỏ ARKit và tìm kiếm một thư viện AR khác giải quyết được vấn đề của bạn.

Nhưng chúng ta không phải chờ quá lâu cho tính năng này. Trên iOS 11.3, Apple đã đưa tính năng nhận diện ảnh 2D vào thư viện ARKit. Đây là một nâng cấp nhỏ nhưng cực kỳ đáng giá của ARKit, giờ đây chúng ta hoàn toàn có thể control được chúng ta cần detect cái gì, lúc nào thì nội dung AR sẽ được hiển thị. Không còn nữa nỗi lo nội dung AR hiển thị linh tinh trên bất kỳ mặt phẳng nào nữa.

Dưới đây, tôi xin giới thiệu đến các bạn cách tích hợp tính năng nhận diện ảnh 2D của ARKit vào ứng dụng iOS.

# II. Nội dung

Lưu ý: bài viết này không dành cho beginner, và yêu cầu các bạn đã biết một chút kiến thức về SceneKit và ARKit. Đối với các bạn chưa biết gì về Scenekit và ARKit, các bạn có thể tìm hiểu về SceneKit [tại đây](https://developer.apple.com/documentation/scenekit) và ARKit [tại đây](https://developer.apple.com/documentation/arkit). Về cơ bản thì đây là 2 framework của iOS, SceneKit giúp chúng ta xây dựng các model 3D và tương tác, thực hiện các công việc liên quan đến 3D, còn ARKit là thư viện về thực tế tăng cường.

## 1. Tạo project

OK, chúng ta bắt đầu công việc thôi. Đầu tiên, chúng ta cần tạo project với ngôn ngữ Swift, đặt tên là ImageRecognition và tạo project.

Tiếp theo, chúng ta tạo 1 group mới và đặt tên 3D Models. Trong group này, chúng ta tạo 1 file .scn bằng cách chọn File -> New -> File SceneKit Scene File -> đặt tên là Orange và tạo file.

Sau khi tạo file Orange.scn, các bạn [vào đây](https://www.turbosquid.com/3d-models/free-3ds-model-orange-resolution-photorealistic/756550) để download file 3D hình quả cam về máy. Để download được, các bạn cần tạo tài khoản trên trang web turbosquid. Các bạn lưu ý rằng chúng ta cần file 3D định dạng .dae, vì vậy các bạn hãy download file với định dạng này nhé.

Sau khi download thành công, chúng ta sẽ có được file Orange.dae trong thư mục Downloads, các bạn mở Orange.scn trong Xcode, kéo và thả Orange.dae vào Orange.scn. Sau đó kéo ảnh orange.jpg trong mục download vào trong group 3D Models của project. Trong file Orange.scn, các bạn vào Show the Scene Graph View để mở rộng các element con của scene, kéo node Orange ra ngoài Orange reference, xoá node camera và Orange reference. Cuối cùng, các bạn kéo ảnh orange.jpg từ group 3D Model vào node Orange trong Orange.scn.

Hoàn thành hết các bước bên trên, các bạn sẽ có được file Orange.scn như hình sau:

![](https://images.viblo.asia/0752d57b-8b19-437e-acdb-3dde4d812a99.png)

Sau khi tạo được file 3D, bước tiếp theo các bạn [vào đây](http://rbemis.com/orange/index.html) download ảnh quả cam về máy. Sau khi download xong, chúng ta được file orange.jpg. Đây chính là file chúng ta dưới đây sẽ dùng để nhận diện ảnh.

Tiếp theo, các bạn vào Assets.xcassets, tạo một AR Resources group: New AR Resources Group. Sau đó kéo ảnh orange.jpg chúng ta đã download vào group này. Sau khi thêm ảnh vào group, chúng ta thấy xuất hiện một cảnh báo với dấu chấm than màu vàng trong ảnh với nội dung như ảnh sau:

![](https://images.viblo.asia/e64d7e9f-8f52-415b-9aaf-a61b57985a72.png)

Cảnh báo này xuất hiện do chúng ta vẫn chưa khai báo size của ảnh. Các bạn vào Attributes inspector và khai báo width và height của ảnh như hình sau:

![](https://images.viblo.asia/fe897f0f-5cf3-4879-b5e9-2b29976c3328.png)

Sau khi điền thông tin width, height, chúng ta vẫn nhận được cảnh báo. Cảnh báo này liên quan đến việc hình ảnh của chúng ta sẽ khó nhận dạng bằng ARKit, tuy nhiên không sao, khó nhận ra chứ không phải không nhận ra được, chúng ta cứ dùng thôi :D

## 2. Implement base code

Sau khi hoàn thành các bước bên trên, chúng ta đã có được model 3D và image để detect. Bây giờ chúng ta sẽ bắt đầu dựng các code cơ bản. Đầu tiên, mở file Main.storyboard, kéo thả lần lượt 3 view sau: ARKit SceneKit View, UILabel và UIButton. sắp xếp các view cho hợp lý, tinh chỉnh tuỳ thích cho đẹp và thêm các constraints cho các view như hình sau:

![](https://images.viblo.asia/d08e901c-8fb8-470a-849a-1678ad2a9130.png)

Tiếp theo, chúng ta kéo thả các IBOutlet và IBAction cho các view mới tạo bên trên vào ViewController.swift như sau:

```swift
@IBOutlet weak var sceneView: ARSCNView!
    
@IBOutlet weak var label: UILabel!
    
@IBAction func onButtonTouched(_ sender: Any) {
        
}
```

import framework ARKit vào đầu file ViewController.swift

```swift
import ARKit
```

## 3. Implement Image recognition

Đầu tiên, trong ViewController, chúng ta thêm property sau:

```swift
lazy var orangeNode: SCNNode = {
        guard let scene = SCNScene(named: "Orange.scn"),
            let node = scene.rootNode.childNode(withName: "orange", recursively: false) else { return SCNNode() }
        let scaleFactor = 0.05
        node.scale = SCNVector3(scaleFactor, scaleFactor, scaleFactor)
        node.eulerAngles.x = -.pi / 2
        return node
    }()
```

Trong đoạn code bên trên, chúng ta load object orange trong Orange.scn và gán cho node orangeNode. Sau đó chúng ta scale và xoay orangeNode để sau này khi hiển thị ra sẽ dễ nhìn hơn. Các bạn có thể scale và xoay orangeNode theo giá trị tuỳ thích. orangeNode của chúng ta được khai báo theo dạng lazy để object chỉ thật sự được load khi chúng ta cần dùng đến nó.

Bây giờ, trong hàm viewDidLoad() chúng ta thêm code như sau:
```swift
	override func viewDidLoad() {
        super.viewDidLoad()
        
        sceneView.delegate = self
        sceneView.autoenablesDefaultLighting = true
        sceneView.automaticallyUpdatesLighting = true
    }
```

Bên trên, chúng ta gán delegate và chỉnh ánh sáng cho sceneView. Tiếp theo, chúng ta viết các hàm của ARSCNViewDelegate cho ViewController như sau:

```swift
extension ViewController: ARSCNViewDelegate {
    
    func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        
    }
    
    func getNode(withImageName name: String) -> SCNNode {
        var node = SCNNode()
        switch name {
        case "orange":
            node = orangeNode
        default:
            break
        }
        
        return node
    }
}

```


Bên trên, chúng ta thêm hàm renderer(_ renderer:, didAdd node:, for anchor:), đây là hàm của ARSCNViewDelegate, được gọi khi một node mới được ánh xạ tới một anchor cho trước. Còn lại hàm getNode(withImageName name:) để lấy node tương ứng với tên ảnh. Trong hàm getNode(withImageName name:) chúng ta kiểm tra nếu ảnh có tên là orange, chúng ta sẽ trả về node orangeNode.

Tiếp theo, chúng ta thêm hàm để thiết lập configuration cho ảnh như sau:

```swift
func resetTrackingConfiguration() {
		// 1
        guard let referenceImages = ARReferenceImage.referenceImages(inGroupNamed: "AR Resources", bundle: nil) else { return }
		// 2
        let configuration = ARWorldTrackingConfiguration()
        configuration.detectionImages = referenceImages
		// 3
        let options: ARSession.RunOptions = [.resetTracking, .removeExistingAnchors]
		// 4
        sceneView.session.run(configuration, options: options)
		// 5
        label.text = "Move camera to track images"
    }

```

Trong đoạn code bên trên, chúng ta lần lượt làm các công việc sau:
* 1: lấy các ảnh trong AR Resources group của Assets.xcassets mà chúng ta tạo ở bên trên. Ở đây referenceImages chỉ có 1 ảnh là ảnh orange bên trên
* 2: tạo instance của ARWorldTrackingConfiguration với các ảnh cần detect là ảnh trong referenceImages
* 3: tạo instance options cho sceneView
* 4: gọi hàm run(_, options:) để bắt đầu chạy AR
* 5: đổi text cho label để thông báo cho người dùng


Tiếp theo, thêm code vào các hàm viewWillAppear(_:) và onButtonTouched(_ sender:) như sau:

```swift
override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        resetTrackingConfiguration()
    }
    
    @IBAction func onButtonTouched(_ sender: Any) {
        resetTrackingConfiguration()
    }
```

Cuối cùng, chúng ta implement hàm renderer(_ renderer:, didAdd node:, for anchor:) để thực hiện việc hiển thị model 3D khi detect được ảnh:
```swift
func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        DispatchQueue.main.async {
            guard let imageAnchor = anchor as? ARImageAnchor,
                let imageName = imageAnchor.referenceImage.name else { return }
            
            let overlayNode = self.getNode(withImageName: imageName)
            overlayNode.opacity = 1
            overlayNode.position.y = 0.2
            node.addChildNode(overlayNode)
            
            self.label.text = "Image detected: \"\(imageName)\""
        }
    }
```

OK, vậy là code của chúng ta đã hoàn thành. Chúng ta còn 1 bước cuối cùng nữa, đó là cung cấp quyền sử dụng camera cho ứng dụng. Các bạn vào Info.plist, thêm "Privacy - Camera Usage Description" là xong. Sau khi thêm quyền sử dụng camera vào Info.plist, các bạn build chạy thử App. Để sử dụng App, các bạn soi camera của máy vào hình quả cam của chúng ta, kết quả thu được sẽ kiểu như hình sau:

![](https://images.viblo.asia/f0ec1417-a03c-4513-9bca-0670847c2451.png)

# III. Tổng kết

Trên đây tôi đã giới thiệu đến các bạn cách sử dụng tính năng Image Recognition trong ARKit. Hi vọng bài viết này sẽ mang lại một chút thông tin cho các bạn trong quá trình tìm hiểu thư viện ARKit. Khi sử dụng demo App chúng ta có thể thấy là tính năng Image recognition của ARKit thực sự vẫn chưa được ổn định lắm, khi chúng ta đã detect được ảnh, chúng ta dấu ảnh đi thì ARKit vẫn nhận diện vị trí và vẫn hiển thị model 3D ở vị trí ảnh đã bị giấu, có lẽ Apple cần cải thiện hơn tính năng này trong phiên bản iOS sau này. Mặc dù có một vài chỗ cần cải thiện, nhưng tựu chung thì ARKit vẫn là một framework tuyệt vời cho chúng ta. 

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!