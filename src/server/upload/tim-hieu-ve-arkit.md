### 1. ARKit ?
Được ra đợi cùng *iOS 11* **ARKit** : (Augmented Reality Kit) là một platform hỗ trợ AR trên các thiết bị di động của iOS (để sử dụng được hầu hết các tính năng, thiết bị cần có chip >= **A9**).
**ARKit** giải quyết các vấn đề liên quan đến thực tại thông qua hình ảnh từ camera. Quen thuộc nhất với chúng ra có lẽ chính là ứng dụng "*Pokemon Go*" từng làm mưa làm gió một thời:

![](https://images.viblo.asia/c459767d-a055-4447-84fe-887c8ea70441.jpeg)
 
 Có thể chia **ARKit** thành 3 Layer có chức năng riêng biệt:
*    1.  **Tracking**: Cho phép theo dõi vị trí của thiết bị so thay đổi so với thế giới thực.
*    2. **Scene understanding**: Giúp phân tích hình ảnh của thế giới thực qua đó có thể đặt các đối tượng ảo vào vị trí phù hợp với hỉnh ảnh của thế giới thực.
*    3. **Render**: Tạo các đối tượng ảo.

Thuộc tính cơ bản nhất trong **ARKit** là **ARSCNView**. Đây là một lớp giúp hiển thị AR trên hình ảnh thu được từ camera, gồm có hai thuộc tính quan trọng:
       *session*: ARSCN session : là đối tượng quản lý toàn bộ các phần liên quan đến camera và xử lý sự di chuyển của camera
       *scene*: SCNScene : Một đồ thị gồm một hệ thống phân cấp các Node có hình dạng( các vật thể 3D), ánh sáng, Camera và các thuộc tính khác cùng nhau tạo thành một cảnh 3D có thể hiển thị.
    
###   2. Xây dựng ứng dụng
Để xây dựng ứng dụng AR chúng ta chọn: File -> New -> Project -> Augment Reality App, sau đó *Xcode* sẽ tự động tạo ra một project đã được tạo sẵn **ARSCNView** và setting cơ bản cho nó.

![](https://images.viblo.asia/05b667b7-3d31-4e7e-be1b-f9331bbcaaca.png)

Tiếp theo chúng ta sẽ tạo một scene cơ bản để thêm vào view trên.
Để tạo **SCNScene**, chúng ta chọn NewFile -> SceneKit Scene File
Chúng ta có thể kéo một số đối tượng có sẵn vào và thiết kế khá giống với việc dựng UI thông thường ( Ở đây 1 đơn vị độ dài tương đương với 1m ngoài thực tế).
Vị trí của các object có thể được thay đổi thông qua toạ độ x,y,z trên thanh *Attributes spector* hoặc thay đổi trực tiếp bằng cách click vào trục toạ độ của chiều chúng ta muốn di chuyển và di chuyển. Ngoài ra còn có thể chỉnh sửa nhiều yếu tố khác như màu sắc, các thuộc tính vật lý ...
Và đây là kết quả:
![](https://images.viblo.asia/90f2b07e-8f82-4008-a0fb-7d05fe1c1bfa.png)

Khi khởi tạo, project đã chứa sẵn những dòng code khởi tạo, config session và load scene có sẵn tại địa chỉ "*art.scnassets/ship.scn*", để load scene vừa tạo, chỉ cần thay địa chỉ này bằng địa chỉ của scene vừa tạo:
```swift
        // Load scene with name: Tower.scn
        let scene = SCNScene(named: "House.scn")!
        // Set the scene to the view
        sceneView.scene = scene
```
Hãy thử run app và xem thành quả:
![](https://images.viblo.asia/bb9c49b6-5a0a-428d-a1f9-d9ed127c4d73.jpeg)

Tiếp tục hãy thêm một tính năng đơn giản: tap vào màn hình để thêm một vật thể:
Trước tiên chúng ta thêm extensiton sau để chuyển từ ma trân 4x4 sang 3x3:
```swift
extension float4x4 {
    var translation: float3 {
        let translation = self.columns.3
        return float3(translation.x, translation.y, translation.z)
    }
}
```
Tiếp theo hãy thêm hai hàm sau:
```swift
func addBox(x: Float = 0, y: Float = 0, z: Float = -0.2) {
        let box = SCNBox(width: 0.1, height: 0.1, length: 0.1, chamferRadius: 0)

        let boxNode = SCNNode()
        boxNode.geometry = box
        boxNode.position = SCNVector3(x, y, z)

        sceneView.scene.rootNode.addChildNode(boxNode)
    }
    @objc func didTap(withGestureRecognizer recognizer: UIGestureRecognizer) {
        let tapLocation = recognizer.location(in: sceneView)
        let hitTestResultsWithFeaturePoints = sceneView.hitTest(tapLocation, types: .featurePoint)
        if let hitTestResultWithFeaturePoints = hitTestResultsWithFeaturePoints.first {
            let translation = hitTestResultWithFeaturePoints.worldTransform.translation
            addBox(x: translation.x, y: translation.y, z: translation.z)
        }
        return
    }
```
Hàm *didTap* sẽ thêm một hộp vuông vào vị trí tap trên màn hình, và khi ta.Hình ảnh hiển thị trên màn hình là 2 chiều, chính vì vậy một điểm trên màn hình có thể tương ứng với một đường thẳng trong không gian 3 chiều, hàm *hitTest* ở đây sẽ giúp ta lấy được tập hợp các điểm thuộc đường thẳng đó, để cho đơn giản, trong demo này sẽ lấy luôn điểm đầu tiên.
Tiếp theo hãy thêm một hàm để bắt sự kiện người dùng tap và *scene* và gọi hàm *didTap*
```swift
    func addTapGesture() {
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(ViewController.didTap(withGestureRecognizer:)))
        sceneView.addGestureRecognizer(tapGestureRecognizer)
    }
```
Goi hàm này ở *viewDidLoad()* và đây là kết quả khi chạy thực tế:

![](https://images.viblo.asia/57c95041-c546-4429-866c-d68f415ce042.jpeg)

Bài viết tìm hiểu về **ARKit** của mình xin kết thúc tại đây, cảm ơn mọi người đã theo dõi!