# I. Giới thiệu
Augmented reality (AR) là một công nghệ không hề mới, đã được nhiều Công Ty phát triển từ lâu. Tuy nhiên, chỉ sau khi được Apple giới thiệu và tích hợp ARKit trên iOS 11, AR mới trở thành một công nghệ mà đi đến đâu cũng thấy nhắc đến. 

Sang đến iOS 12, ARKit đã được Apple hoàn thiện hơn, tích hợp nhiều tính năng hơn cho lập trình viên viết ứng dụng. Hơn nữa, việc tích hợp công nghệ AR vào ứng dụng bằng ARKit cực kỳ dễ dàng, vì vậy chẳng có lý do gì mà chúng ta không tìm hiểu về công nghệ này, áp dụng ARKit vào ứng dụng của mình.

Trong bài viết này, tôi xin giới thiệu với các bạn cách sử dụng ARKit để phát hiện các mặt phẳng ngang trong thế giới thực, thông qua một ứng dụng demo cụ thể.

# II. Nội dung

Để viết demo cho bài viết này, các bạn phải có Xcode version 10.0 trở lên, và một device iOS hỗ trợ ARKit (iPhone 6s trở lên, iOS 11.0 trở lên)

## 1. Tạo project

Các bạn mở Xcode, tạo project bình thường: New -> Project -> Single View App -> tên “ARKitWorldMapTutorial”, ngôn ngữ Swift.

Tiếp theo, các bạn vào ViewController trong Main.Storyboard, thêm các view như sau:

* 1 ARSCNView
* 1 UILabel với text “Move camera around to detect planes”
* 1 UIToolbar với các UIBarButtonItem có tên lần lượt: Load, Refresh, Save

Các bạn sắp xếp các view trong ViewController, thêm constraints cho các UIView như trong hình dưới đây:

![](https://images.viblo.asia/90ca2de6-34db-4201-b67d-2a3c3cb58387.png)

Tiếp Theo, chúng ta mở Assistant Editor, lần lượt kéo các IBOutlet và IBAction cho các view vào ViewController.swift như sau:

```Swift
	@IBOutlet weak var sceneView: ARSCNView!
    @IBOutlet weak var label: UILabel!

    @IBAction func resetBarButtonItemDidTouch(_ sender: UIBarButtonItem) {

    }
    
    @IBAction func saveBarButtonItemDidTouch(_ sender: UIBarButtonItem) {
        
    }
    
    @IBAction func loadBarButtonItemDidTouch(_ sender: UIBarButtonItem) {
        
    }
```

Vậy là bước tạo project đã xong, chúng ta chuyển sang bước tiếp Theo.

## 2. Setup ARWorld

Trong bước này, chúng ta sẽ thêm code để dựng lên thế giới AR. Nếu các bạn để ý, bên trên chúng ta đã thêm sceneView, một instance của class ARSCNView. Chúng ta sẽ thêm code để configure AR world cho sceneView trong ViewController.swift như sau:

```Swift
	override func viewDidLoad() {
        super.viewDidLoad()
        
        sceneView.delegate = self // 0
        configureLighting() // 1
    }

	override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        resetTrackingConfiguration() // 2
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        sceneView.session.pause() // 3
    }

	func configureLighting() {
		// 4
        sceneView.autoenablesDefaultLighting = true
        sceneView.automaticallyUpdatesLighting = true
    }

	func resetTrackingConfiguration(with worldMap: ARWorldMap? = nil) {
        let configuration = ARWorldTrackingConfiguration()	// 5
        configuration.planeDetection = [.horizontal]	// 6
        
        let options: ARSession.RunOptions = [.resetTracking, .removeExistingAnchors]	// 7
        
        sceneView.debugOptions = [.showFeaturePoints]	 // 8
        sceneView.session.run(configuration, options: options) // 9
    }
```

Trong đoạn code bên trên, chúng ta lần lượt làm các bước sau:
* 0. gán delegate của sceneView cho ViewController
* 1. gọi function configureLighting(). Function này được để trong viewDidLoad() vì chúng ta chỉ cần configure light một lần
* 2. gọi function resetTrackingConfiguration(). Function này chính là nơi chúng ta configure cho sceneView
* 3. Pause sceneView session. Chúng ta để code này trong viewWillDisappear(_ animated:) để chắc chắn rằng chức năng AR sẽ không chạy nữa mỗi khi ứng dụng không còn ở màn này nữa
* 4. đây là nơi chúng ta thực hiện configure light. autoenablesDefaultLighting tự động làm sáng cho scene khi không có nguồn sáng, còn automaticallyUpdatesLighting để tự động update nguồn sáng.
* 5: Khởi tạo một ARWorldTrackingConfiguration
* 6: thêm configure cho planeDetection. Trên iOS 11.0, chúng ta chỉ có 1 lựa chọn detect horizontal. Từ iOS 11.3 trở lên, chúng ta đã có thêm lựa chọn detect vertical plane. Chúng ta sử dụng horizontal để xác định các mặt phẳng ngang, và vertical để xác định các mặt phẳng dọc như bức tường chẳng hạn
* 7: thêm option cho session của sceneView. ở đây chúng ta thêm 2 option resetTracking và removeExistingAnchors để đảm bảo các dữ liệu cũ của session sẽ được reset.
* 8: chạy session của sceneView với configuration và option đã tạo ở trên. Sau khi gọi bước này, sceneView sẽ bắt đầu chạy để tracking AR world.


Sau khi thêm code như bên trên, chạy thử project chúng ta sẽ gặp bug, bởi vì ARSCNViewDelegate chưa được conform trong ViewController. Chúng ta conform cho ARSCNViewDelegate như sau:

```Swift
extension ViewController: ARSCNViewDelegate {

}
```

tất cả các function trong ARSCNViewDelegate đều là optional, chúng ta sẽ thêm các function của ARSCNViewDelegate trong phần dưới đây.
Build chạy thử project trên device (iPhone 6s trở lên, với iOS 11.0 trở lên), chúng ta được một ứng dụng với camera như hình sau:

![](https://images.viblo.asia/49d7713c-4f3b-43b0-aa97-51610ef01bdf.PNG)

Lia camera xung quanh để tìm các mặt phẳng ngang, các bạn có thể thấy là chẳng có hiện tượng gì sảy ra cả. Thật ra, sau khi thêm code bên trên thì ứng dụng đã có thể detect các mặt phẳng ngang, chẳng qua chúng ta chưa thêm code xử lý mỗi khi mặt phẳng ngang được phát hiện ra mà thôi. Bước tiếp theo chúng ta sẽ thực hiện công việc này.

## 3. Hiển thị Horizontal plane
Để hiển thị plane đã được detect, chúng ta cần tạo một instance của SCNNode và thêm nó vào node đã được detect. Chúng ta thêm code sau:

```Swift
extension ViewController: ARSCNViewDelegate {
    func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        // 1
        guard let planeAnchor = anchor as? ARPlaneAnchor else {
            return
        }
        
        // 2
        let width = CGFloat(planeAnchor.extent.x)
        let height = CGFloat(planeAnchor.extent.z)
        let plane = SCNPlane(width: width, height: height)
        
        // 3
        plane.materials.first?.diffuse.contents = UIColor.lightGray
        
        // 4
        let planeNode = SCNNode(geometry: plane)
        
        // 5
        let x = CGFloat(planeAnchor.center.x)
        let y = CGFloat(planeAnchor.center.y)
        let z = CGFloat(planeAnchor.center.z)
        planeNode.position = SCNVector3(x,y,z)
        planeNode.eulerAngles.x = -.pi / 2
        
        // 6
        node.addChildNode(planeNode)
    }
}
```

Trong đoạn code trên, hàm renderer(_ renderer:, didAdd node:, for anchor:) là hàm của ARSCNViewDelegate. Trong trường hợp cụ thể của mình (detect Horizontal plane), mỗi khi phát hiện ra một mặt phẳng ngang, ARKit sẽ gán cho chỗ đó một ARAnchor, sau đó là một SCNNode. Sau khi instance của SCNNode được thêm vào thì hàm này được gọi. Bên trong hàm này:

* 1.  Kiểm tra để đảm bảo rằng chúng ta chỉ thêm plane mỗi khi phát hiện ra Horizontal plane. Mỗi khi phát hiện ra Horizontal/vertical plane, ARKit sẽ thêm một ARPlaneAnchor
* 2. tạo một instance SCNPlane với chiều rộng/dài dựa vào anchor 
* 3. Thêm màu cho instance plane
* 4. Tạo planeNode là một instance của SCNNode với geometry là plane
* 5. Set positon và góc của planeNode. Sau bước set vị trí này thì plane của chúng ta sẽ được hiển thị ở chính điểm planeAnchor
* 6. Thêm planeNode vào node để hiển thị.

Như vậy, mỗi khi phát hiện ra 1 mặt phẳng ngang, đoạn code trên sẽ giúp chúng ta tạo 1 plane và thêm vào màn hình. 

Build app, di chuyển camera tìm một mặt phẳng ngang, chúng ta sẽ được kết quả như hình sau:

![](https://images.viblo.asia/443effe8-815c-49bc-bf18-03cc580655fb.PNG)

Cuối cùng, chúng ta implement hàm resetBarButtonItemDidTouch(_ sender:) để reset các plane đã thêm:

```Swift
    @IBAction func resetBarButtonItemDidTouch(_ sender: UIBarButtonItem) {
        resetTrackingConfiguration()
    }
```

# III. Tổng kết

Trên đây, chúng ta đã cùng nhau tìm hiểu cách sử dụng ARKit để phát hiện các mặt phẳng ngang và thêm các plane hiển thị cho các plane đó. Trong thực tế viết ứng dụng, chúng ta có thể hiển thị rất nhiều thứ hay ho trên các mặt phẳng detect được, ví dụ như hiển thị cả một thế giới game như trong video demo về ARKit của Apple. 
Các nút save và load chúng ta đã tạo trong lúc dựng project vẫn còn chưa được sử dụng, tôi xin được sử dụng các nút này trong bài viết tới.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!