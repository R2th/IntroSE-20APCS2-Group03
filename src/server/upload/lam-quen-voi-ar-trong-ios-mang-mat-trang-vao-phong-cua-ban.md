Gần đây mình đang tìm hiểu về AR và 3d rendering trong iOS, và thật sự mình thấy hứng thú với lĩnh vực (gần như) hoàn toàn mới đối với mình này.

Mục đích bài viết của mình hôm nay là để giúp các bạn chưa từng làm việc với AR trong iOS có thể làm quen với nó, bằng cách code một ứng dụng giúp mang **MẶT TRĂNG** vào trong chính căn phòng của bạn. Và không chỉ mặt trăng, mà mặt trời, sao hoả, sao thổ gì cũng được hết.

Thành phẩm của chúng ta sẽ tương tự như sau:
![](https://images.viblo.asia/7f17430f-8d8f-4bb0-a8d8-5101e2ea1f0e.jpg)

Nghe rất thú vị đúng không? Ok chúng ta cùng bắt đầu nào.

Đầu tiên, vẫn là khởi tạo project. Khi khởi tạo, các bạn lưu ý chọn template là ***Augmented Reality App*** nhé.

![](https://images.viblo.asia/ec48903a-312b-4ab3-87fd-7d2620ede95e.png)

Sau đó chúng ta điền tên project. Mình sẽ để tên là ***MoonInside***.

**Quan trọng:** Ở phần Content Technology, bạn chọn SceneKit nhé.

Bạn sẽ thấy có các option khác như ***RealityKit***, ***SpriteKit*** và ***Metal***. Mỗi option này sẽ có một công dụng khác nhau, nhưng với project hiện tại của chúng ta thì ***SceneKit*** là phù hợp nhất.
![](https://images.viblo.asia/03425804-07e7-4f00-b3fb-a1d9152fa709.png)

Sau đó các bạn bấm next và chọn thư mục để lưu project.

Sau khi mở project lên. Chúng ta thấy cấu trúc khá giống một project thông thường. Điểm khác biệt là chúng ta có thêm một folder ***art.scnassets***, Mờ folder này ra chúng ta thấy có 2 file ***ship.scn*** và ***texture.png***.

![](https://images.viblo.asia/c197ac6c-a58f-4bfa-bc08-3db594143a80.png)


Khi bấm vào file ***ship.scn*** chúng ta thấy có một chiếc tàu vũ trụ khá đẹp. 
***ship.scn*** là file chứa 3d model của chiếc tàu vũ trụ này, còn ***texture.png*** thể hiện màu sắc của tàu vũ trụ.

Để hiểu rõ hơn, bạn chọn *Scene graph -> ship -> shipMesh* và nhìn sang thanh công cụ bên tay phải.
Bạn chọn tab như hình dưới đây trong thanh công cụ này nhé:

![](https://images.viblo.asia/9d683e4c-96e1-4f4f-8cfa-277b51023a8c.jpg)


Bạn để ý ở phần ***Properties***, mục Diffuse đang chọn ***texture.png***. Bạn hãy bấm vào mục này và đổi thành màu ***Black***. 

![](https://images.viblo.asia/1eedf2ee-446d-4da0-adb0-5b2860a8249a.png)


Chúng ta thấy màu của tàu vũ trụ đã thay đổi.

![](https://images.viblo.asia/04fe5518-1cbd-49c0-883a-cd14808a1c63.jpg)

Có thể hiểu file ***texture.png*** kia được dùng để "gói" chiếc tàu vũ trụ này lại, và trong quá trình gói thì những màu trên file ***texture.png*** sẽ khớp với từng bộ phận của chiếc tàu vũ trụ.

Bước tiếp theo, hãy ***Run app*** để thấy app của chúng ta làm được gì nhé:

![](https://images.viblo.asia/88d55966-ee1a-4e01-9e68-5caa97806eab.jpg)

Một chiếc tàu vũ trụ đang lơ lửng ở giữa phòng!

Bây giờ, chúng ta sẽ thay chiếc tàu vũ trụ này bằng một mặt trăng.

Đầu tiên, các bạn mở file ***ViewController.swift***. 

Chúng ta thấy ViewController có 1 outlet đến ***sceneView***. ***sceneView*** có type là ***ARSCNView***. ***ARSCNView*** sẽ chịu trách nhiệm trộn lẫn các vật thể 3d mà bạn tạo ra với thế giới thực một cách chính xác nhất. 

Đoạn code có nhiệm vụ render chiếc tàu vũ trụ mà chúng ta vừa thấy chính là:
```swift
// Create a new scene
let scene = SCNScene(named: "art.scnassets/ship.scn")!

// Set the scene to the view
sceneView.scene = scene
```

Đoạn code này "đặt" chiếc tàu vũ trụ ở file ***ship.scn*** vào ***sceneView***, dó đó chúng ta có thể thấy chiếc tàu vũ trụ này khi chạy app.

Giờ chúng ta sẽ bỏ chiếc tàu vũ trụ này đi, và thay bằng một thứ "thô sơ" hơn. Chúng ta sẽ render một ***khối cầu***.

Thay đoạn code trên bằng đoạn code dưới đây:
```swift
// 1
let sphere = SCNSphere(radius: 0.2)

// 2
let material = SCNMaterial()
material.diffuse.contents = UIColor.red

// 3
sphere.materials = [material]

// 4
let node = SCNNode()

// 5
node.position = SCNVector3(x: 0, y: 0, z: -1.0)

// 6
node.geometry = sphere
 
// 7
sceneView.autoenablesDefaultLighting = true

// 8
sceneView.scene.rootNode.addChildNode(node)
```

Mình sẽ đi từng bước nhé:
1. Chúng ta tạo ra một khối cầu 3d bằng cách sử dụng class ***SCNSphere***. ***radius*** chính là bán kính của khối cầu này, đơn vị ***mét*** nha. Vậy chỗ này chúng ta tạo ra một khối cầu có bán kính 20 cm.

2. Chúng ta tạo "chất liệu" (material) cho khối cầu này. 
Bạn có nhớ ở phần trước chúng ta thay đổi ***diffuse*** làm màu của tàu vũ trụ thay đổi không? Đây chính là cách chúng ta thay đổi ***diffuse*** trong code. Đoạn code này sẽ giúp chất liệu chúng ta vừa tạo ra có màu đỏ.

3. Chúng ta sử dụng material này cho khối cầu. Một vật thể 3d có thể cấu thành từ nhiều material khác nhau, do đó chúng ta sẽ phải truyền vào 1 array.

4. Chúng ta tạo ra 1 ***node***. Bạn có thể hiểu node là một điểm trong không gian. Chúng ta cần tạo node để xác định sẽ đặt khối cầu này ở điểm nào trong không gian.

5. Chúng ta xác định vị trí cho node. Vị trí sẽ có type là ***SCNVector***. Hẳn các bạn đã học hình học không gian rồi. Chúng ta có thể tưởng tượng không gian quanh chúng ta nằm trên một trục toạ độ 3 chiều Ox, Oy, Oz. Điểm (0, 0, 0) của trục toạ độ này chính là ở giữa màn hình điện thoại. Vị trí node của chúng ta là (0, 0.1, -1.0), đơn vị mét, vậy khối cầu này sẽ được đặt ở chính giữa màn hình điện thoại, cách điện thoại 1 mét.

6. Sau khi có vị trí rồi, chúng ta đặt khối cầu vào vị trí đó.

7. Dòng này chỉnh ánh sáng tự động để giúp khối cầu của chúng ta trông chân thực hơn

7. Cuối cùng, đặt khối cầu vào sceneView.

Chạy ứng dụng, chúng ta thấy một khối cầu lơ lửng ở giữa căn phòng thay vì chiếc tàu vũ trụ.

![](https://images.viblo.asia/36051367-eb57-4bc9-9c56-928de7cc1857.jpg)

Giờ, làm sao để biến khối cầu này thành mặt trăng? 

Có thể nhiều bạn đã đoán ra, chúng ta cần thay đổi ***diffuse*** của khối cầu này, sao cho nó giống mặt trăng là được.

Để làm được điều này, chúng ta sẽ cần một file ***texture map*** cho mặt trăng, giống như file ***texture.png*** của tàu vũ trụ vậy. Rất may trên google không thiếu những file như này.

Bạn có thể download texture map cho mặt trăng ở đây:
https://www.solarsystemscope.com/textures/download/8k_moon.jpg

Sau khi tải về, bạn đặt file này vào thư mục ***art.scnassets***, và đặt tên là ***moon.jpeg*** nhé:

![](https://images.viblo.asia/a85eaa5d-e796-4ed5-8bbf-e1408b4fa6ed.png)

Cuối cùng, bạn thay dòng code:
```swift
material.diffuse.contents = UIColor.red
```
Bằng
```swift
material.diffuse.contents = UIImage(named: "art.scnassets/moon.jpeg")
```

Chạy lại ứng dụng, chúng ta thấy có một mặt trăng lơ lửng ở giữa phòng! 

Bạn có thể thoải mái di chuyển điện thoại, mặt trăng vẫn sẽ ở cố định một chỗ trong phòng của bạn!

![](https://images.viblo.asia/7f17430f-8d8f-4bb0-a8d8-5101e2ea1f0e.jpg)

Nếu bạn không thích mặt trăng, mà muốn tạo mặt trời, sao thổ, sao hoả... thì có thể vào đây để lấy texture map của các hành tinh này nhé:
https://www.solarsystemscope.com/textures/

Hi vọng bài viết này giúp bạn làm quen được với AR trong iOS. AR là một lĩnh vực rất rộng, rất khó nhưng cũng rất thú vị. Hiện tại mình vẫn đang nghiên cứu thêm về lĩnh vực này. Có thể trong tương lai, khi mình đúc rút được thêm nhiều thứ hay ho hơn, thì mình sẽ lại chia sẻ tiếp ha.