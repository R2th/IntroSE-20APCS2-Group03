### Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 12.4
- **Deployment Target:** 12.0

Trong bài viết này, ta sẽ làm quen với cách sử dụng **CABasicAnimation** để tạo ra ***rotation animation***  cho vòng quay thông qua một game có tên là **Vòng Quay May Mắn**. Trước tiên ta sẽ xây dựng giao diện tương tự như hình dưới đây:

![](https://images.viblo.asia/2c87d83e-719f-4093-8927-a4cc2e6b95c5.png)


### 1. Xác định các thuộc tính của Rotation animation:
Sau khi tạo xong UI cho game **Vòng Quay May Mắn**, ta tạo 1 class **Spinner** và xác định các thuộc tính cho ***Rotation animation***. 
```
class Spinner: UIImageView {
    // Default angle
    var angle: CGFloat = CGFloat.pi * 2
    
    // Duration of one rotation
    var duration: CFTimeInterval = 0.8
    
    // Number of loop rotation
    var numOfLoop: CGFloat = 5.0
    
    private var isRotating: Bool = false
    private var beforeAngle: CGFloat = 0
    private var currentAngle: CGFloat = 0
}
```
Trong đó:
- **angle:** là giá trị góc quay của view khi animation kết thúc, với giá trị mặc định là CGFloat.pi * 2 (tương đương với 1 vòng quay).
- **duration:** là thời gian thực hiện 1 vòng quay, với giá trị mặc định là 0.8 giây.
- **numOfLoop:** là số vòng quay, với giá trị mặc định là 5 vòng.
- **isRotating:** là thuộc tính xác định animation có đang thực hiện hay không, với giá trị ban đầu là false.
- **beforeAngle:** là giá trị góc quay của view ở lượt quay trước, với giá trị ban đầu là 0.
- **currentAngle** là giá trị góc quay sẽ thực hiện ở lần quay tiếp theo.

### 2. Xây dựng hàm rotate():
Tiếp theo ta sẽ xây dựng hàm **rotate()** để thực hiện Rotation animation gồm các bước sau:
##### Bước 1:  Xác định giá trị góc quay hiện tại của view:
```
let rotationAtStart: CGFloat = self.layer.value(forKeyPath: "transform.rotation") as! CGFloat
```
##### Bước 2: Xác định giá trị góc quay sẽ thực hiện ở lần quay tiếp theo:
```
let currentAngle = angle - beforeAngle
```
##### Bước 3: Khởi tạo Rotation animation
```
// Create animation
let rotation = CABasicAnimation(keyPath: "transform.rotation.z")
rotation.fromValue = rotationAtStart
rotation.toValue = rotationAtStart + currentAngle + (numOfLoop * 2 * CGFloat.pi)
rotation.duration = Double(currentAngle / (CGFloat.pi * 2)) * duration + (duration * Double(numOfLoop))
rotation.delegate = self
rotation.isRemovedOnCompletion = true
rotation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeOut)

self.layer.add(rotation, forKey: nil)
```
Trong đó: 
- **fromValue:** là giá trị góc quay của view tại thời điểm animation bắt đầu.
- **toValue:** là giá trị góc quay của view tại thời điểm animation kết thúc.
- **duration:** là khoảng thời gian animation thực hiện và được tính bằng giây,

> **Double(currentAngle / (CGFloat.pi * 2)) * duration**  là khoảng thời gian animation thực hiện góc quay ***currentAngle***.

> **duration * Double(numOfLoop)** là khoảng thời gian animation thực hiện số vòng lặp.
- **isRemovedOnCompletion:** xác định xem animation có bị xoá khỏi layer's animation khi animation hoàn thành hay không.
- **timingFunction:** xác định tốc độ của animation, với giá trị hiện tại là ***easeOut*** nghĩa là animation sẽ chậm dần cho đến khi kết thúc.

Cuối cùng ta sẽ có đoạn code hàm **rotate()** như sau:
```
extension Spinner {
    private func rotate() {
        // Get the current rotation value
        let rotationAtStart: CGFloat = self.layer.value(forKeyPath: "transform.rotation") as! CGFloat
        
        currentAngle = angle - beforeAngle
        
        // Create animation
        let rotation = CABasicAnimation(keyPath: "transform.rotation.z")
        rotation.fromValue = rotationAtStart
        rotation.toValue = rotationAtStart + currentAngle + (numOfLoop * 2 * CGFloat.pi)
        rotation.duration = Double(currentAngle / (CGFloat.pi * 2)) * duration + (duration * Double(numOfLoop))
        rotation.delegate = self
        rotation.isRemovedOnCompletion = true
        rotation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeOut)
        
        self.layer.add(rotation, forKey: nil)
    }
}
```
### 3. Xây dựng hàm startRotating(), setRotationTransform() và reset():
Trong protocol **CAAnimationDelegate** có định nghĩa 1 hàm **animationDidStop()** sẽ được gọi khi animation kết thúc.
Class **Spinner**  tuân theo protocol **CAAnimationDelegate** và thực hiện hàm **animationDidStop()**.  Khi animation kết thúc, ta sẽ set góc cho view trong hàm **setRotationTransform()** và set lại giá trị cho 2 thuộc tính **beforeAngle** và **isRotating** trong hàm **reset()**.
```
extension Spinner {
    func startRotating() {
        if self.isRotating == false {
            rotate()
            self.isRotating = true
        }
    }
    
     private func setRotationTransform() {
        // Create rotation transform with given degree
        let myRotationTransform = CATransform3DRotate(self.layer.transform, currentAngle, 0.0, 0.0, 1.0)
        // Set layer's transform value to target value
        self.layer.transform = myRotationTransform
    }
    
    private func reset() {
        beforeAngle = angle
        self.isRotating = false
    }
}
```
```
extension Spinner: CAAnimationDelegate {
    func animationDidStop(_ anim: CAAnimation, finished flag: Bool) {
        setRotationTransform()
        reset()
    }
}
```

### 4. Sử dụng Rotation animation:
Cuối cùng, ta sẽ gán giá trị **angle** cho wheelView bằng 1 giá trị random và gọi hàm **startRotating()** để vòng quay bắt đầu thực hiện.
```
final class ViewController: UIViewController {
    @IBOutlet private var wheelView: Spinner!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction private func spinButtonTapped(_ sender: Any) {
        let randomAngle = CGFloat.pi * CGFloat.random(in: 0...2)
        wheelView.angle = randomAngle
        wheelView.startRotating()
    }
}
```
### Kết quả:
![](https://media.giphy.com/media/FR4Snjo4BVD3OiSK1b/giphy.gif)

### Github:
- https://github.com/ndhuy96/SwiftTips/tree/rotation