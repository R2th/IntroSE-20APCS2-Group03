Animation - một phần quan trọng trong quá trình thiết kế và phát triển ứng dụng. Nó tạo sự chú ý của người dùng tới một điểm nào đó hay đơn giản hơn là làm cho ứng dụng funny hơn.
Có 1 số cách để chúng ta có thể implement animation và thông dụng nhất đó là sử dụng `UIView.animate(withDuration:animations:)`. Chúng ta có thể animate cho layer với CABasicAnimation. Và hơn thế nữa thì UIKit giúp custom lại present animation với `UIViewControllerTransitioningDelegate`.

Trong tutorial này thì chúng ta sẽ nói về 1 hướng khác để tạo ra animation cho các view  đó chính là UIViewPropertyAnimator- class này cho phép nhiều quyển kiếm soát hơn so với người tiền nhiệm UIView.animater. Với nó chúng ta có thể tuỳ chỉnh thời gian, tương tác và hoạt ảnh và hơn thế nữa bạn có thể làm những animation có thể bay..=))))

### Khởi đầu với UIViewPropertyAnimator
Được đưa ra từ IOS 10, UIViewPropertyAnimator cho phép bạn khởi tạo các animation theo hướng đối tượng. Chúng ta thử làm 1 ví dụ đơn giản với UIViewPropertyAnimator:
![](https://images.viblo.asia/43860d1a-b143-42e9-8d80-2ff3046b13b8.gif)
Và đây là cách thao tác với UIView:
```Swift
UIView.animate(withDuration: 0.3) {
    view.frame = view.frame.offsetBy(dx: 100, dy: 0)
}
```
Và đây là cách chúng ta sử dụng với UIViewPropertyAnimator
```Swift
 let animator = UIViewPropertyAnimator(duration:0.3, curve: .linear) {
     view.frame = view.frame.offsetBy(dx:100, dy:0)
 }
 animator.startAnimation()
```
### Tương tác và trì hoãn animation
Bạn có nhớ những thao tác cổ điển như Slide để mở khóa không? Hoặc Vuốt từ phía dưới để mở Trung tâm điều khiển? Đây là những ví dụ hoàn hảo của hình ảnh động tương tác và gián đoạn. Bạn có thể bắt đầu di chuyển chế độ xem bằng ngón tay, sau đó nhả nó và chế độ xem sẽ trở về vị trí ban đầu. Ngoài ra, bạn có thể bắt được chế độ xem trong hình ảnh động và tiếp tục kéo nó bằng ngón tay.
Tuy nhiên, uiview animation không cung cấp một cách dễ dàng để kiểm soát phần trăm hoàn thành của animation. Bạn có thể tạm dừng một animation ở giữa một chu kỳ và tiếp tục thực hiện nó sau khi bị gián đoạn.
Đây là sức mạnh của UIViewPropertyAnimator. Bạn có thể thấy cách chúng tôi có thể xây dựng một animation tương tác đầy đủ, có thể ngắt, có thể quét và có thể đảo ngược trong một vài bước.
### Chuẩn bị bắt đầu dự án
Đầu tiên bạn hãy tải project sau về [ProjectDemo](https://github.com/appcoda/Interactive-Animation/raw/master/CityGuide-starter.zip) unzip và chạy thử nó bạn sẽ thấy như sau:

![](https://images.viblo.asia/274bbea6-c49b-4062-902d-ab1b8e54d0f0.png)

Trong project này bạn sẽ thấy các thành phần cơ bản như
1. ViewController.swift
2. CityCollectionViewCell.swift
3. CityCollectionViewFlowLayout.swift
4. City.swift
5. Main.storyboard

### Triển khai animation mở rộng và thu gọn
Sau khi khởi chạy ứng dụng, app hiển thị một danh sách các thành phố. Nhưng người dùng có thể tương tác với các item. Bây giờ chúng ta muốn hiển thị thông tin cho từng thành phố khi người dùng chạm vào một trong các ô. Hãy xem giao diện cuối cùng. Đây là những gì chúng tôi muốn xây dựng:
[link ảnh](https://www.appcoda.com/wp-content/uploads/2019/05/2_animation_on_tap.gif)

Hãy cùng xem cách thực hiện loại hoạt hình này. Tạo phương thức `CollectionView (_: didSelectItemAt)` bằng cách chèn đoạn mã sau vào cuối tệp `ViewController`:
```Swift
func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    let selectedCell = collectionView.cellForItem(at: indexPath)! as! CityCollectionViewCell
    selectedCell.toggle()
}
```
Trong đó toggle() được viết trong `CityCollectionViewCell` .  Trước tiên ta cần tạo enum định nghĩa expand và collapse như sau
```Swift
private enum State {
    case expanded
    case collapsed
    
    var change: State {
        switch self {
        case .expanded: return .collapsed
        case .collapsed: return .expanded
        }
    }
}
```
tiếp theo chúng ta khai báo thêm các thuộc tính cho việc control animation
```Swift
private var initialFrame: CGRect?
private var state: State = .collapsed
private lazy var animator: UIViewPropertyAnimator = {
    return UIViewPropertyAnimator(duration: 0.3, curve: .easeInOut)
}()
```

Biến initFrame được sử dụng để lưu trữ khung của ô trước khi animation. state được sử dụng để theo dõi nếu ô được mở rộng hoặc thu gọn và biến animation được sử dụng để control animation. 
tiếp theo chúng ta tiến hành add func `toggle()` và các func `collapse()` , `expand()`.
```Swift
@IBAction func close(_ sender: Any) {
    toggle()
}
 
func toggle() {
    switch state {
    case .expanded:
        collapse()
    case .collapsed:
        expand()
    }
}

private func expand() {
    guard let collectionView = self.collectionView, let index = self.index else { return }
    
    animator.addAnimations {
        self.initialFrame = self.frame
        
        self.descriptionLabel.alpha = 1
        self.closeButton.alpha = 1
        
        self.layer.cornerRadius = 0
        self.frame = CGRect(x: collectionView.contentOffset.x, y:0 , width: collectionView.frame.width, height: collectionView.frame.height)
        
        if let leftCell = collectionView.cellForItem(at: IndexPath(row: index - 1, section: 0)) {
            leftCell.center.x -= 50
        }
        
        if let rightCell = collectionView.cellForItem(at: IndexPath(row: index + 1, section: 0)) {
            rightCell.center.x += 50
        }
        
        self.layoutIfNeeded()
    }
    
    animator.addCompletion { position in
        switch position {
        case .end:
            self.state = self.state.change
            collectionView.isScrollEnabled = false
            collectionView.allowsSelection = false
        default:
            ()
        }
    }
    
    animator.startAnimation()
}

private func collapse() {
    guard let collectionView = self.collectionView, let index = self.index else { return }
    
    animator.addAnimations {
        self.descriptionLabel.alpha = 0
        self.closeButton.alpha = 0
        
        self.layer.cornerRadius = self.cornerRadius
        self.frame = self.initialFrame!
        
        if let leftCell = collectionView.cellForItem(at: IndexPath(row: index - 1, section: 0)) {
            leftCell.center.x += 50
        }
        
        if let rightCell = collectionView.cellForItem(at: IndexPath(row: index + 1, section: 0)) {
            rightCell.center.x -= 50
        }
        
        self.layoutIfNeeded()
    }
    
    animator.addCompletion { position in
        switch position {
        case .end:
            self.state = self.state.change
            collectionView.isScrollEnabled = true
            collectionView.allowsSelection = true
        default:
            ()
        }
    }
    
    animator.startAnimation()
}
```

sau đó hãy chạy và cảm nhận xem animation thể hiện như thế nào và nếu muốn đóng hãy click `X` trên góc của màn hình.

### Thêm pan gesture
Sẽ nhiều người bảo ràng có thể có được những kết quả tưởng tự với Uiview.animate nhưng điểm khác biệt chúng ta sẽ thấy ngay sau đây với `UIViewPropertyAnimator`.
đã đến lúc để làm cho animation tương tác. Chúng tôi sẽ thêm một `UIPanGestureRecognizer` và một thuộc tính mới có tên `popupPackset` để theo dõi xoay ô. Khai báo các biến này trong lớp `CityCollectionViewCell`:
```Swift
private let popupOffset: CGFloat = (UIScreen.main.bounds.height - cellSize.height)/2.0
private lazy var panRecognizer: UIPanGestureRecognizer = {
    let recognizer = UIPanGestureRecognizer()
    recognizer.addTarget(self, action: #selector(popupViewPanned(recognizer:)))
    
    return recognizer
    
}()
```
Và đăng kí nó trong cell
```Swift
override func awakeFromNib() {
    self.addGestureRecognizer(panRecognizer)
}
```
Bây giờ, chúng ta cần thêm phương thức `popupViewPanned` để theo dõi pan gesture. Chèn đoạn mã sau vào `CityCollectionViewCell`:
```Swift
@objc func popupViewPanned(recognizer: UIPanGestureRecognizer) {
    switch recognizer.state {
    case .began:
        toggle()
        animator.pauseAnimation()
        
    case .changed:
        let translation = recognizer.translation(in: collectionView)
        var fraction = -translation.y / popupOffset
        if state == .expanded { fraction *= -1 }
        animator.fractionComplete = fraction
        
    case .ended:
        animator.continueAnimation(withTimingParameters: nil, durationFactor: 0)
        
    default:
        ()
    }
}
```

Chúng tôi có ba trạng thái ở đây. Khi bắt đầu cử chỉ, chúng tôi khởi tạo animation bằng phương thức () và ngay lập tức tạm dừng nó. Trong khi người dùng đang kéo ô, chúng tôi cập nhật animation bằng cách đặt thuộc tính binaryComplete của animation. Đây là cốt lõi của animation cho phép chúng ta điều khiển nó. Cuối cùng, khi người dùng nhả ngón tay ra, chúng tôi gọi phương thức continueAnimation của animation để tiếp tục thực hiện. Các phần tử sau đó sẽ đi đến đúng vị trí đã định.

Nếu bạn chạy ứng dụng, bạn có thể kéo ô lên để mở rộng. Và sau đó kéo ô mở rộng xuống để thu gọn nó.

Bây giờ animation trông khá tốt, nhưng bạn không thể phá vỡ animation ở giữa. Do đó, để làm cho hình ảnh động tương tác đầy đủ, chúng ta phải thêm một tính năng nữa - gián đoạn. Người dùng có thể khởi tạo animation mở rộng / thu gọn như bình thường, nhưng animation phải được tạm dừng ngay lập tức sau khi người dùng chạm vào ô trong chu kỳ animation.

Để đạt được nó, chúng ta phải lưu trữ tiến trình của animation và sau đó tính đến giá trị này để tính tỉ lệ phần trăm hoàn thành của nó.

tiến hành thêm trong cell biến sau
```Swift
private var animationProgress: CGFloat = 0
```

Tiếp theo, cập nhật trường hợp `.began` của phương thức popupViewPanned với đoạn code sau đây để ghi nhớ tiến trình:
```Swift
animationProgress = animator.fractionComplete
```
 và với trường hợp `.changed` ta sẽ update như sau:
```Swift
animator.fractionComplete = fraction + animationProgress
```
Bây giờ bạn đã sẵn sàng để thử nghiệm ứng dụng. Chạy project và xem những gì bạn nhận được. Nếu bạn làm chính xác, animation sẽ trông như thế này:
 [link anh](https://www.appcoda.com/wp-content/uploads/2019/05/4_reverse_animation.gif)
 
 
 Tham khảo: https://www.appcoda.com/interactive-animation/