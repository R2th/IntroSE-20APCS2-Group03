Đã có rất nhiều các hướng dẫn và tài liệu hay nói về Core Animation như: `CALayer` để thực hiện các thao  tác với cấp thấp hơn của UIView hoặc sử dụng `CAKeyframeAnimation`...
Ngoài ra còn nhiều API khác thực sự hữu ích nhưng không được biết đến một cách rộng rãi, trong số đó có thể nói đến là `CAReplicatorLayer`
## 1. Mở đầu
Kiến trúc của các lớp trong Core Animation tập trung vào ý tưởng chuyên môn hoá. Chúng ta có một lớp cha là `CALayer` - cơ bản để vẽ ra mọi thứ, sau đó có một loạt các lớp con mà mỗi lớp đều tập trung vào một loại nhất định.
Đối với `CAReplicatorLayer` tập trung vào việc vẽ nhiều bản sao của một layer gốc. 
## 2. UIColor có thể làm được ?
Một cách rất phổ biến để thực hiện thay đổi background bằng các hình ảnh đó là sử dụng UIColor. Nó cho phép bạn coi một chuối hình ảnh lặp đi lặp lại như một màu và sử dụng nó cho background, như sau:
```swift
view.backgroundColor = UIColor(patternImage: image)
```
Có thể việc sử dụng trên đáp ứng được mong muốn của bạn, tuy nhiên để làm những điều phức tạp hơn với việc lặp các layer thì chúng ta nên sử  dụng `CAReplicatorLayer`.
Giả sử chúng ta muốn vẽ một loạt các hình lặp nhau và có hiệu ứng gradient cho nó như sau: 
![](https://images.viblo.asia/84f99140-9a46-4140-b79b-5a844132d483.png)
Điều này có thể dễ dàng được thực hiện mà không cần custom Core Graphics thay vào đó sẽ là replicator.
## 3. Thiết lập
Chúng ta sẽ bắt đầu bằng cách toạ một lớp replicator nằm trong View để hiển thị lên màn hình:
```swift
let replicatorLayer = CAReplicatorLayer()
replicatorLayer.frame.size = view.frame.size
replicatorLayer.masksToBounds = true
view.layer.addSublayer(replicatorLayer)
```

Chúng ta cũng phải cung cấp cho lớp replicator một lớp con để có thể lặp. Vì thế, chúng ta thiết lập một lớp đơn giản cho ảnh thành nội dung của nó:
```swift
let imageLayer = CALayer()
imageLayer.contents = image.cgImage
imageLayer.frame.size = image.size
replicatorLayer.addSublayer(imageLayer)
```
Nếu hiện taị chúng ta chạy code, thì sẽ có 1 hình ảnh được hiển thị. Bởi vì chúng ta cũng cần cho lớp replicator biết sẽ có bao nhiêu bản sao mà chúng ta muốn nó hiển thị:
```swift
let instanceCount = view.frame.width / image.size.width
replicatorLayer.instanceCount = Int(ceil(instanceCount))
```
Bây giờ chúng ta đã có nhiều bản sao, tuy nhiên trên màn hình vẫn sẽ chỉ có một bản, bởi vì các bản sao theo mặc định được xếp chồng lên nhau. Để khắc phục điều đó, chúng ta cần đến việc chỉnh sửa instance offsets và transforms
## 4. Sử dụng instance offsets và transforms
Mỗi instance của một lớp replicator có thể chuyển đổi theo nhiều cách khác nhau, thế nên bạn sẽ tạo ra được nhiều animation thú vị.
Để tạo được hiệu ứng gradient như mong muốn, chúng ta sẽ áp dụng `CATransform3D` cho từng instance như sau :
```swift
replicatorLayer.instanceTransform = CATransform3DMakeTranslation(
    image.size.width, 0, 0
)

let colorOffset = -1 / Float(replicatorLayer.instanceCount)
replicatorLayer.instanceRedOffset = colorOffset
replicatorLayer.instanceGreenOffset = colorOffset
```

## 5. Tái lặp
Bởi vì CAReplicator là lớp con của CALayer, bạn có thể lồng chúng với nhau. Điều này cho phép bạn tạo các mẫu thậm chí phức tạp hơn nhiều.
Ví dụ chúng ta muốn mở rộng mẫu ban đầu của mình để lặp lại theo chiều dọc bằng cách sử dụng một dải gradient khác như sau:
![](https://images.viblo.asia/871faec6-2975-4270-9e0f-530ee52b43f3.png)
Tất cả những điều cần làm là chỉ cần cho lớp replicator ở trên vào mọt lớp khác..
```swift
let verticalReplicatorLayer = CAReplicatorLayer()
verticalReplicatorLayer.frame.size = view.frame.size
verticalReplicatorLayer.masksToBounds = true
verticalReplicatorLayer.instanceBlueOffset = colorOffset
view.layer.addSublayer(verticalReplicatorLayer)

let verticalInstanceCount = view.frame.height / image.size.height
verticalReplicatorLayer.instanceCount = Int(ceil(verticalInstanceCount))

verticalReplicatorLayer.instanceTransform = CATransform3DMakeTranslation(
    0, image.size.height, 0
)

verticalReplicatorLayer.addSublayer(replicatorLayer)
```
Bây giờ chúng ta đã có một danh sách lưới các viên đá quý. Chỉ cần sử dụng một vài dòng mã, chúng ta đã đạt được hiệu ứng thú vị. 
Trước tiên hãy cho 1 chút delay vào lớp replicator của chúng ta:
```swift
let delay = TimeInterval(0.1)
replicatorLayer.instanceDelay = delay
verticalReplicatorLayer.instanceDelay = delay
```

Sau đó, hãy thêm CABasicAnimation làm cho hình ảnh thay đổi kích thước liên tục:
```swift
let animation = CABasicAnimation(keyPath: "transform.scale")
animation.duration = 2
animation.fromValue = 1
animation.toValue = 0.1
animation.autoreverses = true
animation.repeatCount = .infinity
imageLayer.add(animation, forKey: "hypnoscale")
```
Và chúng ta thu được một kết quả rất crazy:
![](https://images.viblo.asia/2fe08b99-35b6-4456-b5ec-d52d00d0f047.gif)

### Nguồn tham khảo :
https://www.swiftbysundell.com/posts/ca-gems-using-replicator-layers-in-swift