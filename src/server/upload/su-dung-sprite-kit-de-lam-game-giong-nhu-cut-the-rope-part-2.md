Dịch từ: https://www.raywenderlich.com/5347797-how-to-make-a-game-like-cut-the-rope-with-spritekit

Trong bài hướng dẫn này, chúng ta sẽ học cách để build một game tương tự như Cut the Rope sử dụng SpriteKit trong Swift, game sẽ có các animation, âm thanh, hiệu ứng, và cả vật lý!
Xem phần 1 ở đây: https://viblo.asia/p/su-dung-sprite-kit-de-lam-game-giong-nhu-cut-the-rope-part-1-naQZRxYX5vx

# Adding Joints to the Vines
Vấn đề là bạn vẫn chưa join các thành phần của dây thừng lại với nhau. Để fix nó, bạn cần add thêm đoạn code sau vào cuối hàm `addToScene(_:):`
```
// set up joint for vine holder
let joint = SKPhysicsJointPin.joint(
  withBodyA: vineHolder.physicsBody!,
  bodyB: vineSegments[0].physicsBody!,
  anchor: CGPoint(
    x: vineHolder.frame.midX,
    y: vineHolder.frame.midY))

scene.physicsWorld.add(joint)

// set up joints between vine parts
for i in 1..<length {
  let nodeA = vineSegments[i - 1]
  let nodeB = vineSegments[i]
  let joint = SKPhysicsJointPin.joint(
    withBodyA: nodeA.physicsBody!,
    bodyB: nodeB.physicsBody!,
    anchor: CGPoint(
      x: nodeA.frame.midX,
      y: nodeA.frame.minY))
  
  scene.physicsWorld.add(joint)
}
```
Đoạn code này sẽ set up việc nối vật lý giữa các thành phần, kết nối chúng với nhau. Sử dụng `SKPhysicsJointPin` để join vác thành phần. Kiểu xử lý join này sẽ cho phép khi bạn tác động vào điểm nối giữa 2 node, thì cho phép chúng dao động quanh điểm nối mà không di chuyển quá gần hoặc quá xa .

Build và chạy lại app. Bạn sẽ thấy đoạn dây thừng được treo như thật trên cây.
![](https://images.viblo.asia/fcd24e9b-d423-4663-8744-d3e485845ca4.png)

Bước cuối cùng là gắn đoạn dây với quả dứa. Vẫn ở trong **VineNode.swift**, tìm đến `attachToPrize(_:)`. Thêm đoạn code sau:
```
// align last segment of vine with prize
let lastNode = vineSegments.last!
lastNode.position = CGPoint(x: prize.position.x,
                            y: prize.position.y + prize.size.height * 0.1)
    
// set up connecting joint
let joint = SKPhysicsJointPin.joint(withBodyA: lastNode.physicsBody!,
                                    bodyB: prize.physicsBody!,
                                    anchor: lastNode.position)
    
prize.scene?.physicsWorld.add(joint)
```
Đoạn code này sẽ lấy đoạn cuối cùng của dây thừng, đặt vị trí cho nó ở trên trung tâm của giải thưởng (quả dứa) một chút. Bạn sẽ cần để nó ở vị trí này để có thể theo giải thưởng giống như thực tế. Nếu nó là điểm chính giữa của giải thưởng, vì sức nặng của quả dứa, nó có thể xoay tròn quanh điểm nối. Nó cũng sẽ tạo một điểm nối khác để joint đoạn dây và quả dứa.

Build và run. Nếu những đoạn code joint và các node của bạn được set up đúng, bạn sẽ thấy kết quả như hình dưới đây:
![](https://images.viblo.asia/6c2106e2-f3c9-4fe6-9a3d-e4d0a11249cf.png)

# Snipping the Vines
Chắc chắn là bạn đã để ý thấy là vẫn chưa thể cắt được đoạn dây thừng! Bạn sẽ giải quyết vấn đề đó ngay bây giờ.

Trong phần tiếtp theo, bạn sẽ làm việc với phương thức chạm, thứ sẽ cho phép người chơi cắt những đoạn dây đang được treo lên đó. Quay trở lại với **GameScene.swift**, tìm đến `touchesMoved(_:with:)` thêm đoạn code sau:
```
for touch in touches {
  let startPoint = touch.location(in: self)
  let endPoint = touch.previousLocation(in: self)
  
  // check if vine cut
  scene?.physicsWorld.enumerateBodies(
    alongRayStart: startPoint, 
    end: endPoint, 
    using: { body, _, _, _ in
      self.checkIfVineCut(withBody: body)
  })
  
  // produce some nice particles
  showMoveParticles(touchPosition: startPoint)
}
```
Đoạn code này làm việc như sau: Đầu tiên, nó lấy vị trí hiện tại và trước đó của mỗi lần chạm (touch). Tiếp theo, lặp qua tất cả các body có trong scene đang nằm giữa điểm chạm đó, 
sử dụng method rất tiện dụng của `SKScene` là `enumerateBodies(alongRayStart:end:using:)`. Với mỗi body tìm được, gọi đến `checkIfVineCut(withBody:)` là hàm mà bạn sẽ viết sau một vài phút tiếp đây.

Cuối cùng, đoạn code sẽ gọi đến method để tạo một `SKEmitterNode` bằng cách load nó từ **Particle.sks**, và thêm nó vào scene ở vị trí người dùng chạm vào. Kết quả này sẽ tạo ra một đường khói xanh đẹp mắt ở những nơi ngón tay bạn chạm vào.

Bây giờ, tìm đến `checkIfVineCut(withBody:)` và thêm đoạn code sau:
```
let node = body.node!

// if it has a name it must be a vine node
if let name = node.name {
  // snip the vine
  node.removeFromParent()

  // fade out all nodes matching name
  enumerateChildNodes(withName: name, using: { node, _ in
    let fadeAway = SKAction.fadeOut(withDuration: 0.25)
    let removeNode = SKAction.removeFromParent()
    let sequence = SKAction.sequence([fadeAway, removeNode])
    node.run(sequence)
  })
}
```
Đoạn code trên, đầu tiên sẽ check nếu node mà đã kết nối đến physics body có tên chưa. Nhớ là, có nhiều node khách bên cạnh các phần của dây thừng, và bạn chắc chắn không muốn cắt nhầm vào quả dứa hay chú cá sấu! Nhưng bạn chỉ đặt tên cho các node của dây thừng, nên nếu node có tên, bạn có thể chắc rằng nó là một phần của dây.

Tiếp đến, bạn xoá node khỏi scene. Xoá một code cũng xoá physicsBody của nó, và huỹ bất kì đoạn joint nào đang kết nối đến nó. Bạn bây giờ sẽ chính thức cắt đoạn dây!

Cuối cùng, bạn liệt kê lại tất cả các node trong scene mà có tên khớp với tên của node mà bạn vừa cắt, sử dụng `enumerateChildNodes(withName:using:)` của scene. Những node sẽ match chỉ gồm những node là các đoạn khác của cùng một sợi dây, nên bạn chỉ cần lặp qua các đoạn của sợi dây mà bạn đã cắt.

với mỗi node, bạn tạo một `SKAction`, đàu tiên sẽ làm mờ node và sau đó xoá nó khỏi scene. Hiệu ứng sẽ chạy sau khi bị cắt, mỗi đoạn dây sẽ bị mờ đi.

Buid và run app. Thử cắt đoạn dây -  bạn giờ có thể cắt cả 3 đoạn dây và nhìn thấy giải thưởng rơi xuống.
![](https://images.viblo.asia/5d4bc27f-0db8-4d62-8b7b-b6192e18f66d.png)

# Handling Contact Between Bodies
Khi bạn viết `setUpPhysics()`, bạn quy định rằng `GameScene` sẽ hoạt động như là `contactDelegate` cho `physicsWorld`. Bạn cũng sẽ cấu hình `contactTestBitMask` của chú cá sấu để **SpriteKit** sẽ thông báo khi nó chạm vào giải thưởng. Nó là tầm nhìn xa xuất sắc!

Giờ, trong `GameScene.swift` bạn cầ phải triển khai `didBegin(_:) `của `SKPhysicsContactDelegate`, thứ sẽ kích hoạt mỗi khi xác nhận có sự tương tác giữa hai *masked bodies*.
Có một vài thứ cần cho hàm này - tìm đến nó và thêm đoạn code sau:
```
if (contact.bodyA.node == crocodile && contact.bodyB.node == prize)
  || (contact.bodyA.node == prize && contact.bodyB.node == crocodile) {
  
  // shrink the pineapple away
  let shrink = SKAction.scale(to: 0, duration: 0.08)
  let removeNode = SKAction.removeFromParent()
  let sequence = SKAction.sequence([shrink, removeNode])
  prize.run(sequence)
}
```
Đoạn code này sẽ kiểm tra nếu 2 vật thể tương tác là cá sấu và giải thưởng. Bạn ko biết thứ tự của các node, vì vậy bạn sẽ kiểm tra cả hai chiều. Nếu qua bước kiểm tra, bạn sẽ kích hoạt một đoạn animation đơn giản để co giải thưởng lại và làm nó biết mất.

# Animate the Crocodile's Chomp
Bạn cũng sẽ muốn làm cho chú cá sấu nhai khi bắt được quả dứa. Trong câu lệnh if nới mà bạn thực hiện việc co quả dứa lại, thêm dòng sau:
```
runNomNomAnimation(withDelay: 0.15)
```
Giờ tìm đến `runNomNomAnimation(withDelay:)` và thêm đoạn code sau:
```
crocodile.removeAllActions()

let closeMouth = SKAction.setTexture(SKTexture(imageNamed: ImageName.crocMouthClosed))
let wait = SKAction.wait(forDuration: delay)
let openMouth = SKAction.setTexture(SKTexture(imageNamed: ImageName.crocMouthOpen))
let sequence = SKAction.sequence([closeMouth, wait, openMouth, wait, closeMouth])

crocodile.run(sequence)
```
Đoạn code thêm xoá bỏ bất kỳ animation đang chạy nào với chú cá sấu sử dụng `removeAllActions()`. Sau đó tạo ra một chuỗi animation với, thực hiện viêc đóng mở miệng và chạy tuần tự.

Animation mới này sẽ được kích hoạt khi giải thưởng rơi vào miệng chú cá sấu, tạo cảm giác như đang nhai.

Thêm đoạn code sau xuống dưới `enumerateChildNodes` ở `checkIfVineCut(withBody:)`:
```
crocodile.removeAllActions()
crocodile.texture = SKTexture(imageNamed: ImageName.crocMouthOpen)
animateCrocodile()
```
Nó sẽ chắc chắn rằng miệng cá sấu mở khi bạn cắt dây, như vậy sẽ có khả năng là giải thưởng rơi vào trong miệng chú cá sấu.

Build và run.
![](https://images.viblo.asia/12f114bf-e864-4827-9be8-624543fcf7c9.png)
Chú cá sấu vui vẻ giờ sẽ nhai quả dứa khi rơi vào miệng nó. Nhưng lại một lần nữa xảy ra, trò chơi chỉ dừng lại ở đó. Bạn sẽ giải quyết vấn đề đó tiếp theo đây.

# Resetting the Game
Tiếp theo, bạn sẽ reset trò chơikhi quả dứa rơi xuống, hoặc chú cá sấu ăn nó.

Trong **GameScene.swift**, tìm đến `switchToNewGame(withTransition:)`, và thêm đoạn code sau:
```
let delay = SKAction.wait(forDuration: 1)
let sceneChange = SKAction.run {
  let scene = GameScene(size: self.size)
  self.view?.presentScene(scene, transition: transition)
}

run(.sequence([delay, sceneChange]))
```
Đoạn code trên sử dụng `SKView’s presentScene(_:transition:) ` để hiển thị scene tiếp theo.

Trong trường hợp này, scene mà bạn di chuyển tới sẽ là một thể hiện mới của `GameScene`. Bạn cũng sẽ di chuyển sử dụng hiệu ứng của class `SKTransition`. Bạn quy định việc transition như là một biến của method, vì thế bạn có thể sử dụng các hiệu ứng di chuyển khác nhau tuỳ thuộc vào điều xảy ra trong game.

Trở lại `didBegin(_:)`, và bên trong câu lệnh if, sau Prize Shrink và NomNom animations, thêm đoạn sau:
```
// transition to next level
switchToNewGame(withTransition: .doorway(withDuration: 1.0))
```
Đoạn này gọi tới `switchToNewGame(withTransition:)` sử dụng `.doorway(withDuration:)` để tạo hiệu ứng mở cửa. Nó sẽ hiện level tiếp theo với hiệu ứng mở cửa.
Build và run để xem hiệu ứng.
![](https://images.viblo.asia/dcd0e8d3-410a-4d95-9205-884cea0cdbac.png)
Khá là ổn rồi nhỉ, huh?

# Ending the Game
Bạn có thể nghĩ rằng bạn cần thêm một vài physics body khác vào vùng nước để có thể xác nhận được khi nào giải thưởng chạm vào nó, nhưng điều đó sẽ không giúp nhận biết được việc quả dứa rơi ra khỏi màn hình.

Đơn giản hơn, hướng tiếp cần tốt hơn là chỉ cần nhận biết quả dứa đã di chuyển ra khỏi viền dưới của màn hình chưa, và kết thúc trò chơi.

`SKScene` cung cấp `update(_:)` hàm này được gọi mỗi frame. Tìm method đó trong  GameScene.swift và thêm đoạn logic sau:
```
if prize.position.y <= 0 {
  switchToNewGame(withTransition: .fade(withDuration: 1.0))
}
```
Đoạn if sẽ check nếu toạ độ y của quả dứa nhỏ hơn 0 (giá trị âm) - thì chính là nó, bottom của màn hình. Nếu là như vậy, gọi `switchToNewGame(withTransition:) ` để bắt đầu lại level, lúc này sử dụng `.fade(withDuration:)`.


Build và run.
![](https://images.viblo.asia/482308bc-1b6a-4a14-87f8-3ee60222aa23.png)
Bạn sẽ thấy màn hình mờ dần và chuyển đến một màn hình mới dù người chơi thắng hay thua. 

`Adding Sound and Music`
Giờ bạn sẽ thêm một bài nhạc về rừng xanh khá hay từ incompetech.com và một vài hiệu ứng âm thanh từ freesound.org.

**SpriteKit** sẽ xử lý âm hiệu ứng âm thanh cho bạn. Nhưng bạn sẽ sử dụng `AVAudioPlayer` để phát nhạc nền mỗi khi chuyển level.

## Adding the Background Music
Để thêm nhạc, thêm thuộc tính sau vào **GameScene.swift**:
```
private static var backgroundMusicPlayer: AVAudioPlayer!
```
Lệnh này khởi tạo một thuộc tính, để tất cả các thể hiện của `GameScene` sẽ có thể truy cập vào cùng một `backgroundMusicPlayer`. Tìm đến setUpAudio() và thêm đoạn code sau:
```
if GameScene.backgroundMusicPlayer == nil {
  let backgroundMusicURL = Bundle.main.url(
    forResource: SoundFile.backgroundMusic,
    withExtension: nil)
  
  do {
    let theme = try AVAudioPlayer(contentsOf: backgroundMusicURL!)
    GameScene.backgroundMusicPlayer = theme
  } catch {
    // couldn't load file :[
  }
  
  GameScene.backgroundMusicPlayer.numberOfLoops = -1
}
```
Đoạn code trên check nếu `backgroundMusicPlayer` đã tồn tại. Nếu không, khởi tạo một `AVAudioPlayer` mới với `BackgroundMusic` mà bạn đã thêm vào **Constants.swift** trước đó. Nó sau đó sẽ convert nó vào URL và chỉ định nó vào thuộc tính. Số lần lặp numberOfLoops để là -1, điều nãy sẽ làm bài hát lặp vĩnh viễn.

Tiếp theo thêm đoạn code sau vào cuối hàm `setUpAudio()`:
```
if !GameScene.backgroundMusicPlayer.isPlaying {
  GameScene.backgroundMusicPlayer.play()
}
```
Đầu tiên nó sẽ khởi động nhạc nên khi scene được load lần đầu. Sau đó lặp vô hạn cho đến khi thoát app hoặc một mehtod khác gọi `stop()`.

Bạn có thể gọi `play()` mà không cần kiểm tra xem player có đan play không, nhưng cách này nhạc sẽ không tua hoặc khởi động lại nếu nó đã play khi bắt đầu level.
## Adding the Sound Effects
Khi bạn ở đây, bạn có thể set up tất cả các hiệu ứng âm thanh mà bạn muốn sử dụng vê sau. Không như nhạc, bạn sẽ không muốn phát hiệu ứng âm thanh ngay lập tức. Thay vào đó bạn sẽ tạo một vào `SKActions` có thể sử dụng lại khi play âm thanh sau này.

Trở lại phần đầu của GameScene class, và thêm thuộc tính sau:
```
private var sliceSoundAction: SKAction!
private var splashSoundAction: SKAction!
private var nomNomSoundAction: SKAction!
```
Trở về `setUpAudio()`và thêm đoạn code sau xuống cuối method:
```
sliceSoundAction = .playSoundFileNamed(
  SoundFile.slice,
  waitForCompletion: false)
splashSoundAction = .playSoundFileNamed(
  SoundFile.splash,
  waitForCompletion: false)
nomNomSoundAction = .playSoundFileNamed(
  SoundFile.nomNom,
  waitForCompletion: false)
```
Đoạn code này khởi tạo âm thanh sử dụng `playSoundFileNamed(_:waitForCompletion:)` của `SKAction`. Giờ là lúc để phát âm thanh hiệu ứng:

Tìm đến `update(_:)` av thêm đoạn code dưới đây trong lệnh if bên trên đoạn gọi đến `switchToNewGame(withTransition:)`:
```
run(splashSoundAction)
```
Nó sẽ phát âm thanh của splash khi quả dứa chạm vào nước. Tiếp đến, tìm `didBegin(_:)` và thêm đoạn code dưới đây ở bên dưới dòng `runNomNomAnimation(withDelay:)`:
```
run(nomNomSoundAction)
```
Nó sẽ thêm âm thanh nhai khi cá sấu bắt được giải thưởng. Cuối cùng, tìm đến `checkIfVineCut(withBody:) ` và thêm đoạn code sau xuống cuối lệnh if: 
```
run(sliceSoundAction)
```
Đoạn này sẽ phát âm thanh khi người chơi cắt dây.

Build và run để tận hưởng âm thanh khi cá sấu ăn quả dứa!

# Getting Rid of an Awkward Sound Effect
Bạn có thấy bug nào không? Nếu giải thưởng rơi không trúng chú cá sấu, tiếng nước sẽ play nhiều lần. Đó là bởi vì đoạn xử lý "level complete" bị lặp lại cho đến khi game chuyển màn. Để sửa nó thêm một thuộc tính mới vào đầu class:
```
private var isLevelOver = false
```
Giờ sửa lại  `update(_:)` và `didBegin(_:)` bằng cách thêm đoạn code sau vào đầu của mỗi hàm:
```
if isLevelOver {
  return
}
```
Cuối cùng, bên trong đoạn if của method tương tự, thêm dòng code để set trạng thái isLevelOver thành true:
```
isLevelOver = true
```
Giờ mỗi khi game nhận thấy isLevelOver được set, dù vì quả dứa chạm vào đất, hay chạm vào chú cá sấu, nó sẽ dừng việc check xem game thằng/thua. Nó sẽ không lặp lại hiệu ứng âm thanh nữa.

Build và run. Sẽ không còn những hiệu ứng âm thanh kì lạ nữa!
![](https://images.viblo.asia/b34b65bc-7874-4330-be11-5c9c6f63148a.png)

# Adding Some Difficulty

Sau khi chơi vài vòng, trì chơi sẽ trở nên khá dễ. Bạn sẽ dễ dàng cho chú cá sấu ăn chỉ với 1 lần qua cả 3 sợi dây.

Làm nó phức tạp hơn bằng cách sử dụng giá trị trong **Constants.swift**, `CanCutMultipleVinesAtOnce`.

Trong **GameScene.swift**, thêm thuộc tính lên đầu của GameScene class:
```
private var didCutVine = false
```
Tìm đến `checkIfVineCut(withBody:)` và thêm đoạn if lên đầu hàm:
```
if didCutVine && !GameConfiguration.canCutMultipleVinesAtOnce {
  return
}
```
Thêm code vào cuối hàm trên, bên trong lệnh if:
```
didCutVine = true
```
Chỉ để giữ mọi thứ cùng nhau, tìm đến `touchesBegan(_:with:)` và thêm dòng sau:
```
didCutVine = false
```
Bằng cách này, bạn sẽ reset `didCutVine` mỗi khi user chạm vào màn hình:

Build và run lại.
![](https://images.viblo.asia/656d9517-1f08-48e4-bb14-998086daaf8f.png)
Bạn sẽ thấy giờ bạn chỉ có thể cắt 1 sợi dây mỗi lần trượt. Để cắt sợi dây khác, bạn cần nhấc tay lên và trượt lại.