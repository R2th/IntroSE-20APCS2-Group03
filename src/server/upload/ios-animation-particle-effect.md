# I. Giới thiệu Particle Effect:
- **Particle Effect** là một loại **Animation** trong iOS cho phép tạo ra các hiệu ứng hình ảnh từ tổ hợp các hạt. Các hạt này được tạo ra liên tục trong một khoảng thời gian nhất định. iOS cho phép chúng ta điều chỉnh các thuộc tính như màu sắc, hình ảnh, tốc độ,... của các hạt để có thể tự tạo ra các animation riêng.

# II. Khởi tạo Emitter Layer:
- Để thao tác với **Particle Effect**, iOS cung cấp cho ta một class kế thừa từ **CALayer** là **CAEmitterLayer**.
- **CAEmitterLayer** gồm có các thuộc tính sau:
- **.emitterShape:** Hình dạng của khu vực mà các hạt sẽ được tạo ra random trong frame, nó có thể là một điểm, hình chữ nhật, hình tròn... 

    ![](https://images.viblo.asia/436b8be6-e451-438f-b7ac-534403b44472.png)
-  **.emitterPosition:** Điểm trung tâm của vùng tạo ra các hạt animation

    ![](https://images.viblo.asia/913449e3-4df8-4a66-8c33-9f3799b8940c.png)
    
- Chúng ta sẽ thêm đoạn code này vào `viewDidLoad()`:
```swift
//config emitter frame
let rect = CGRect(x: 0.0, y: 200.0, width: view.bounds.width, height: 50.0)
let emitter = CAEmitterLayer()
emitter.frame = rect
emitter.emitterShape = CAEmitterLayerEmitterShape.rectangle
emitter.emitterPosition = CGPoint(x: rect.width/2, y: rect.height/2)
emitter.emitterSize = rect.size
view.layer.addSublayer(emitter)
```

# III. Tạo các Emitter Cell:
- Để tạo các hạt hiệu ứng trong **Particle Effect**, chúng ta sẽ sử dụng **CAEmitterCell**.
- Mỗi **CAEmitterLayer** có thể chứa một hoặc nhiều loại **CAEmitterCell** khác nhau.
- Hình dạng của **CAEmitterCell** sẽ phụ thuộc vào **UIImage** mà chúng ta gán cho chúng.
- Đoạn code dưới đây khởi tạo một **CAEmitterCell** với một ảnh, lưu ý ở đây chúng ta sẽ sử dụng ảnh **.png** màu trắng và chuyển **backGround** của **view** thành màu xám trước nhé:
```swift
view.backgroundColor = UIColor(red: 0.5, green: 0.5, blue: 0.5, alpha: 1)
        
let emitterCell = CAEmitterCell()
emitterCell.contents = UIImage(named: "ic_star.png")?.cgImage

//số lượng cell tạo ra mỗi giây
emitterCell.birthRate = 10 

// thời gian tối đa cell tồn tại trên màn hình
emitterCell.lifetime = 3.5 

// random thời gian tồn tại của cell trong phạm vi lifetime +/- 1 (2.5 -> 4.5)
emitterCell.lifetimeRange = 1.0 

emitter.emitterCells = [emitterCell]
```
- Thuộc tính **.emitterCells** của **CAEmitterLayer** cho phép chúng ta gán một mảng các **CAEmitterCell**, từ đó có thể sử dụng nhiều loại **CAEmitterCell** khác nhau cùng một lúc trong **Particle Effect**.
- Sau khi chạy chương trình, màn hình sẽ được tạo ra với hiệu ứng các ngôi sao:
![](https://images.viblo.asia/d4c93e38-dc0f-43a0-b4ff-8be1a178fcf6.png)

- Tiếp theo, để các ngôi sao có thể di chuyển được, chúng ta sẽ set các thuộc tính **.xAcceleration** (khoảng cách di chuyển theo trục x) và **.yAcceleration** (khoảng cách di chuyển theo trục y). Nếu **.yAcceleration** nhận **giá trị âm** thì các ngôi sao sẽ bay ngược lên phía trên của màn hình.
```swift
//di chuyển cell theo trục y
emitterCell.yAcceleration = 120.0 

//di chuyển cell theo trục x
emitterCell.xAcceleration = 10.0 
```
![](https://images.viblo.asia/23200b31-79d7-40f8-ac61-907065061d46.png)

- Tiếp theo, chúng ta sẽ tạo cho các hạt vận tốc và hướng xuất phát của nó:
```swift
// Vận tốc khởi đầu của cell
emitterCell.velocity = 50.0 

// Hướng di chuyển khởi đầu của cell (hiện đang là hướng lên trên)
emitterCell.emissionLongitude = .pi * -0.5 

// random velocity trong phạm vi velocity +/- 200 (50 + 200 hoặc 50 - 200)
emitterCell.velocityRange = 200.0

// random hướng di chuyển khởi đầu của cell trong phạm vi emissionLongitude +/- π/2
emitterCell.emissionRange = .pi * 0.5 
```
- **.velocity:** Vận tốc khởi đầu của cell.
- **.emissionLongitude:** hướng di chuyển khởi đầu của cell.
- **.velocityRange:** random **velocity** trong phạm vi **velocity +/- velocityRange**. Trong đoạn code trên thì velocityRange bằng 200 và velocity bằng 50 nên khoảng giá trị random của velocity sẽ là từ 50 - 200 tới 50 + 200 là [-150, 250].
- **.emissionRange:** random **emissionLongitude** trong phạm vi **emissionLongitude +/- emissionRange**. Trong đoạn code trên thì emissionRange bằng π/2 và emissionLongitude bằng -π/2 nên khoảng giá trị random của emissionLongitude sẽ là từ -π tới 0.

- Random màu cho các **CAEmitterCell**:
```swift
// đổi màu cho CAEmitterCell
emitterCell.color = UIColor(red: 0.9, green: 1.0, blue: 1.0, alpha: 1.0).cgColor 

// random màu trong khoảng red +/- 0.3 (0.6 -> 1.2)
emitterCell.redRange = 0.3 

// random màu trong khoảng green +/- 0.3 (0.7 -> 1.3)
emitterCell.greenRange = 0.3 

// random màu trong khoảng blue +/- 0.3 (0.7 -> 1.3)
emitterCell.blueRange  = 0.3 
```
![](https://images.viblo.asia/a50eac71-e184-43b6-b942-e2227cdca792.png)

- **Scale** và **Alpha** của **CAEmitterCell**:
```swift
// scale cell lại với tỷ lệ 0.8
emitterCell.scale = 0.8 

// random scale với tỷ lệ trong khoảng scale +/- 0.8 (0 -> 1.6)
emitterCell.scaleRange = 0.8 

// tốc độ scale của cell mỗi giây (giảm 15% mỗi giây)
emitterCell.scaleSpeed = -0.15 

// random alpha trong giới hạn 0.75 (0.25 -> 1.0)
emitterCell.alphaRange = 0.75 

// tốc độ thay đổi alpha mỗi giây (giảm 15% mỗi giây)
emitterCell.alphaSpeed = -0.15 

 // random thời gian tồn tại của cell trong phạm vi lifetime +/- 1 (2.5 -> 4.5)
emitterCell.lifetimeRange = 1.0
```
![](https://images.viblo.asia/29fc196a-c1db-44c4-8611-a2c92f9f3b2f.png)

- Và cuối cùng, chúng ta có thể chỉnh `emitterCell.birthRate = 150` để thấy hiệu ứng đẹp hơn nhé:

![](https://images.viblo.asia/49c13d9d-d2c2-4577-a82d-f9ca546c3f24.png)

# IV. Tài liệu tham khảo:
- iOSAnimations by tutorial - Third Edition