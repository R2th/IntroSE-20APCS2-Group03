Dịch từ: https://www.raywenderlich.com/5347797-how-to-make-a-game-like-cut-the-rope-with-spritekit

Trong bài hướng dẫn này, chúng ta sẽ học cách để build một game tương tự như Cut the Rope sử dụng SpriteKit trong Swift, game sẽ có các animation, âm thanh, hiệu ứng, và cả vật lý!

Cut The Rope là một game rất phổ biến về điều khiển vật lý, nơi mà người chơi sẽ cho 1 chú quỷ nhỏ tên là Om Nom ăn bằng cách cắt dây thừng đang giữ kẹo. Cắt đúng lúc đúng chỗ và Om Nom sẽ được một bữa ngon.

Điểm chú ý của game này là giả lập vật lý: Dây thừng lắc, trọng lực kéo, kẹo rơi theo đúng như những gì xảy ra trong đời thực.

Bạn có thể build một trải nghiệm tương tự sử dụng engine vật lý của SpriteKei, framework game 2D của Apple. Trong bài hướng dẫn này, bạn sẽ làm điều đó với game được gọi là Snip The Vine.

# Getting Started
Trong Snip The Vine này, bạn sẽ cho một chú cá sấu (crocodile) ăn dứa (pineapple). Để bắt đầu hãy download file của project (trong link nguồn ở đầu bài). Mở project bằng Xcode để xem nhanh cấu trúc.

Bạn sẽ tìm thấy các file của project trong một vài thư mục. Trong bài hướng dẫn này, bạn sẽ làm việc với Classes, nơi chứa những file code chính. Các bạn có thể khám phá thoải mái các thư mục khác, xem bên dưới:
![](https://images.viblo.asia/d1cd54d4-ba72-4153-aac9-7d406fadf38f.png)https://images.viblo.asia/d1cd54d4-ba72-4153-aac9-7d406fadf38f.png
Bạn sẽ sử dụng giá trị từ **Constants.swift** xuyên suốt bài hướng dẫn, nên hãy dành một chút thời gian để làm quen với file này trước khi đi sâu hơn.

# Adding the Crocodile to the Scene
Cảnh báo trước với các bạn là chú cá sấu này khá là nhanh nhẹn, nên hãy giữ ngón tay ở khoảng cách an toàn mọi lúc! :sweat_smile:

Chú cá sấu được thể hiện bằng một `SKSpriteNode`. Bạn sẽ cần giữ lại tham chiếu tới nó để phục vụ cho logic của game. Bạn cũng sẽ cần set up physics body cho chú cá sấu, để có thể detect được va chạm với các phần tử khác.

Trong file **GameScene.swift**, thêm những propertie sau vào phần đầu của class:
```
private var crocodile: SKSpriteNode!
private var prize: SKSpriteNode!
```
Những propertie này sẽ lưu lại tham chiếu với chú cá sấu và giải thưởng (quả dứa).

Tìm đến `setUpCrocodile()` trong **GameScene.swift** và thêm đoạn code sau:
```
crocodile = SKSpriteNode(imageNamed: ImageName.crocMouthClosed)
crocodile.position = CGPoint(x: size.width * 0.75, y: size.height * 0.312)
crocodile.zPosition = Layer.crocodile
crocodile.physicsBody = SKPhysicsBody(
  texture: SKTexture(imageNamed: ImageName.crocMask),
  size: crocodile.size)
crocodile.physicsBody?.categoryBitMask = PhysicsCategory.crocodile
crocodile.physicsBody?.collisionBitMask = 0
crocodile.physicsBody?.contactTestBitMask = PhysicsCategory.prize
crocodile.physicsBody?.isDynamic = false
    
addChild(crocodile)
    
animateCrocodile()
```
Với đoạn code này, bạn sẽ tạo ra crocodile node, và set `position` và `zPosition`.

Chú cá sấu sẽ có một `SKPhysicsBody`, điều đó có nghĩa là nó có thể tương tác với các objects khác. Việc này sẽ rất hữu ích về sau, khi bạn muốn detect xem quả dứa đã chạm vào miệng cá sấu chưa.

Bạn không muốn chú cá sấu bị rơi ra khỏi màn hình! Để tránh điều đó, set `isDynamic` thành `false`, điều này sẽ tránh trọng lực ảnh hưởng đến nó.

Thuộc tính `categoryBitMask` sẽ define xem body của nó thuộc về physic category nào — trong trường hợp này là `PhysicsCategory.crocodile`. Bạn set `collisionBitMask` thành 0 bởi vì bạn không muốn chú cá sấu làm những thành phần chạm vào nó bị nảy ra. Tất cả những gì bạn cần biết là khi body của một "prize" chạm vào chú cá sấu, vì vậy nên bạn set `collisionBitMask`như vậy.

Bạn có thể để ý thấy là physic body của chú cá sấu được khởi tạo sử dụng `SKTexture` object. Bạn có thể đơn giản là re-use `.crocMouthOpen` cho body texture,  nhưng ảnh đó chỉ bao gồm phần thân chú cá sấu, trong khi mask texture chỉ gồm phần đầu và miệng của chú cá sấu. Một chú cá sấu không thể ăn dứa bằng đuôi được!

Giờ bạn sẽ thêm hiệu ứng “waiting” cho chú cá sấu. Tìm `animateCrocodile()` và thêm đoạn code sau:
```
let duration = Double.random(in: 2...4)
let open = SKAction.setTexture(SKTexture(imageNamed: ImageName.crocMouthOpen))
let wait = SKAction.wait(forDuration: duration)
let close = SKAction.setTexture(SKTexture(imageNamed: ImageName.crocMouthClosed))
let sequence = SKAction.sequence([wait, open, wait, close])
    
crocodile.run(.repeatForever(sequence))
```
Bên cạnh việc làm cho chú cá sấu nhỏ có vẽ lo lắng một chút, đoạn code này cũng tạo nên một chuỗi những hành động của chú cá sấu để nó chuyển đổi giữa việc mở và đóng miệng.

Cấu trúc `SKAction.sequence(:)`tạo nên một chuỗi các hành động từ một mảng. Trong trường hợp này, các hành động sẽ nối tiếp nhau với một khoảng thời gian được chọn ngẫu nhiên trong trong khoảng từ 2 đến 4 giây.

Các hành động nối tiếp được bọc trong `repeatForever(_:)` nên nó sẽ lặp lại liên tục. Và cuối cùng crocodile node sẽ run hành động này.

Vậy đó! Build và run xem loài bò sát hung dữ này đóng bộ hàm tử thần của nó xem nào!
![](https://images.viblo.asia/0476f2ca-89bd-4b34-b99f-a5a410f42a05.png)
Bạn đã có phông nền, cá sấu và giờ bạn cần 1 quả dứa.

# Adding the Prize
Mở **GameScene.swift** và tìm đến `setUpPrize()`. Thêm đoạn code sau:

```
prize = SKSpriteNode(imageNamed: ImageName.prize)
prize.position = CGPoint(x: size.width * 0.5, y: size.height * 0.7)
prize.zPosition = Layer.prize
prize.physicsBody = SKPhysicsBody(circleOfRadius: prize.size.height / 2)
prize.physicsBody?.categoryBitMask = PhysicsCategory.prize
prize.physicsBody?.collisionBitMask = 0
prize.physicsBody?.density = 0.5

addChild(prize)
```

Tương tự như chú cá sấu, pineapple node cũng sử dụng một physics body. Điều khác lớn nhất là quả dứa nên rơi và nảy xung quanh, trong khi chú cá sấu chỉ ngồi và kiên nhẫn đợi. Vì vậy bạn để `isDynamic` về giá trị mặc định của nó là `true`. Bạn cũng giảm `density` (tỉ trọng) để quả dứa có thể lắc được tự do hơn.

# Working With Physics
Trước khi bạn thả rơi quả dứa, nó là ý tưởng tốt để cài đặt physics world. Tìm đến `setUpPhysics()` bên trong **GameScene.swift**và thêm những dòng sau:
```
physicsWorld.contactDelegate = self
physicsWorld.gravity = CGVector(dx: 0.0, dy: -9.8)
physicsWorld.speed = 1.0
```
Đoạn code này sẽ set up physics world của `contactDelegate`, `gravity` (trọng lực) và `speed` (tốc độ). Trọng lực sẽ quyết định gia tốc trọng trường áp dụng lên các physics body. trong khi speed sẽ quy định tốc độ giả lập. Bạn sẽ set cả 2 theo giá trị default ở đây.

Bạn sẽ để ý rằng bạn không cần tuân thủ theo `SKPhysicsContactDelegate` bởi vì nó đã được triển khai ở phần cuối của **GameScene**. Tạm thời để nó ở đó, bạn sẽ sử dụng đến sau.

Build và run lại. Bạn sẽ thấy quả dứa rơi qua chú cá sấu và rơi xuống nước.
![](https://images.viblo.asia/e4d54c12-8718-44db-986c-53915ed3e337.png)
Giờ là lúc để thêm vào đoạn dây leo.

# Adding Vines
Physics body của SpriteKit là dạng đối tượng rắn... nhưng dây leo lại cong. Để xử lý nó, bạn sẽ triển khai mỗi đoạn dây leo là một mảng các đoạn có thể nối với nhau một cách linh hoạt, tương tự như là dây xích.

Mỗi đoạn dây leo sẽ có 3 thuộc tính quan trọng:
▪︎ anchorPoint: Là một CGPoint chỉ ra nơi điểm kết thúc của dây keo được nối với cây.
▪︎ length: Một số Int thể hiện cho số đoạn của dây.
▪︎ name: Một String dùng để định danh xem các đoạn thuộc về dây leo nào.

Trong bài hướng dẫn này, game chỉ có 1 level. Nhưng trong một game thật, bạn sẽ muốn có thể dễ dàng tạo ra nhiều giao diện level mà không cần viết nhiều code. Một cách tốt để làm điều đó là quy định data của level độc lập với logic của game, có thể là bằng cách lưu trữ file data với một list hoặc JSON.

Kể từ khi bản sẽ load dữ liệu về dây leo từ một file, cấu trúc tự nhiên nhất để chứa nó là một mảng các `Codable`, cái mà có thể dễ dàng đọc từ một list các property sử dụng `PlistDecoder`. Mỗi cặp trong property list trả đại diện cho một `VineData` instance, một cấu trúc đã được định nghĩa sẵn trong project.

Trong **GameScene.swift**, tìm `setUpVines()` và thêm đoạn code sau:
```
let decoder = PropertyListDecoder()
guard
  let dataFile = Bundle.main.url(
    forResource: GameConfiguration.vineDataFile,
    withExtension: nil),
  let data = try? Data(contentsOf: dataFile),
  let vines = try? decoder.decode([VineData].self, from: data)
  else {
    return
}
```
Đọc dữ liệu dây leo từ file property list. Tìm ở **VineData.plist** trong **Resources/Data**. Bạn sẽ thấy là file này chứa một mảng các cặp dictionary, mỗi cặp chứa một **relAnchorPoint** và **length**:
![](https://images.viblo.asia/fc4a5b4e-b95c-4de1-9f34-c90376238ce0.png)
Tiếp theo, thêm đoạn code sau:
```
// 1 add vines
for (i, vineData) in vines.enumerated() {
  let anchorPoint = CGPoint(
    x: vineData.relAnchorPoint.x * size.width,
    y: vineData.relAnchorPoint.y * size.height)
  let vine = VineNode(
    length: vineData.length, 
    anchorPoint: anchorPoint, 
    name: "\(i)")

  // 2 add to scene
  vine.addToScene(self)

  // 3 connect the other end of the vine to the prize
  vine.attachToPrize(prize)
}
```
Với đoạn code này, bạn sẽ:

1. Với mỗi đoạn dây, khởi tạo một `VineNode.length` mới, quy định số đoạn của dây  và `vine.relAnchorPoint` để quy định vị trí neo của dây tuỳ thuộc vào kích thước của màn hình
2. Cuối cùng,  gắn `VineNode` vào màn hình bằng `addToScene(_:)`.
3. Sau đó, gắn nó với quả dứa sử dụng `attachToPrize(_:)`.
Tiếp theo, bạn sẽ triển khai những method đó trong `VineNode`.

# Defining the Vine Class
Mở **VineNode.swift**. `VineNode`là một custom class được kế thừa từ `SKNode`. Nó ko có thay đổi gì về mặt hiển thị, và thay vào đó nó hoạt động như một kho chứa của các `SKSpriteNodes`đại diện cho các đoạn của dây.

Thêm những thuốc tính sau vào file định nghĩa class:
```
private let length: Int
private let anchorPoint: CGPoint
private var vineSegments: [SKNode] = []
```
Một vài lỗi sẽ xảy ra vì bạn có giá trị khởi tạo cho thuộc tính `length` và `anchorPoint`. Bạn đã khai báo chúng ở dạng non-optional, nhưng vẫn chưa chỉ định giá trị. Sửa bằng cách thay thế `init(length:anchorPoint:name:)`bằng đoạn dưới đây:
```
self.length = length
self.anchorPoint = anchorPoint

super.init()

self.name = name
```
Khá đơn giản... nhưng vì một vài lý do, vẫn có lỗi xảy ra. Bạn có thể để ý thấy có một hàm khởi tạo thứ 2, `init(coder:)`. Bạn ko dùng nó ở đâu cả, vậy thì nó để làm gì?

Because SKNode implements NSCoding, it inherits the required initializer init(coder:). That means you have to initialize your non-optional properties there as well, even though you aren’t using it.
Bới vì `SKNode` triển khai `NSCoding`, nó kế thừa hàm khởi tạo bắt buộc `init(coder:)`. Điều đó nghĩa là bạn sẽ phải khởi tạo giá trị non-optional ở đây nữa, cho dù bạn không sử dụng nó.

Làm việc đó thôi. Thay nội dung của `init(coder:)`bằng:
```
length = aDecoder.decodeInteger(forKey: "length")
anchorPoint = aDecoder.decodeCGPoint(forKey: "anchorPoint")

super.init(coder: aDecoder)
```
Tiếp theo, bạn sẽ cần triển khai `addToScene(_:)`. Đây là một method khá phức tạp, nên bạn sẽ viết nó từng bước. Đầu tiên, tìm `addToScene(_:)` và thêm đoạn sau:
```
// add vine to scene
zPosition = Layer.vine
scene.addChild(self)
```
Bạn thêm dây vào màn hình, và set zPosition cho nó. Tiếp theo, thêm đoạn code sau vào cùng method đó:
```
// create vine holder
let vineHolder = SKSpriteNode(imageNamed: ImageName.vineHolder)
vineHolder.position = anchorPoint
vineHolder.zPosition = 1
    
addChild(vineHolder)
    
vineHolder.physicsBody = SKPhysicsBody(circleOfRadius: vineHolder.size.width / 2)
vineHolder.physicsBody?.isDynamic = false
vineHolder.physicsBody?.categoryBitMask = PhysicsCategory.vineHolder
vineHolder.physicsBody?.collisionBitMask = 0
```
Nó sẽ tạo ra một điểm giữ dây, giống như là một chiếc đinh để treo dây lên. Giống như chú cá sấu, body của đinh cũng tĩn, và ko va chạm với các đối tượng khác.

Điểm giữ dây là hình tròn, vậy nên sử dụng hàm khởi tạo `SKPhysicsBody(circleOfRadius:)`. Vị trí của điểm giữ dây khới với `anchorPoint`đã được quy định khi tạo `VineNode`

Tiếp đến,  bạn sẽ tạo ra đoạn dây, Thêm đoạn code sau vào cuối của moethod trên:
```
// add each of the vine parts
for i in 0..<length {
  let vineSegment = SKSpriteNode(imageNamed: ImageName.vineTexture)
  let offset = vineSegment.size.height * CGFloat(i + 1)
  vineSegment.position = CGPoint(x: anchorPoint.x, y: anchorPoint.y - offset)
  vineSegment.name = name
  
  vineSegments.append(vineSegment)
  addChild(vineSegment)
  
  vineSegment.physicsBody = SKPhysicsBody(rectangleOf: vineSegment.size)
  vineSegment.physicsBody?.categoryBitMask = PhysicsCategory.vine
  vineSegment.physicsBody?.collisionBitMask = PhysicsCategory.vineHolder
}
```
Vòng lặp vày tạo ra một mảng các đoạn dây, bằng với số length đã quy định khi bạn tạo ra `VineNode`. Mỗi đoạn là một sprite với các thuộc tính vật lý riêng. Các đoạn này là hình chữ nhật, vì thế nên sử dụng `SKPhysicsBody(rectangleOf:) ` để quy định độ vuông của physics body.

Không như điểm giữ dây, vine node sẽ động -  chúng có thể di chuyển xung quanh và bị ảnh hưởng bởi trọng lực.

Build và chạy để xem thành quả.
![](https://images.viblo.asia/af8257c8-6887-49f1-8723-670e87462d67.png)
Ơ! Các đoạn của dây rơi xuống dưới màn hình như những khúc mì spaghetti bị cắt vậy!

Đón xem tiếp phần 2 nhé