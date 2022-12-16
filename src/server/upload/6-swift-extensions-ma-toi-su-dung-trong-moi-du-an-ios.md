Đây là bài dịch từ trang [medium.com](https://medium.com). Mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/the-6-swift-extensions-i-use-in-every-ios-project-51f5cdac9b61

![](https://images.viblo.asia/22f84769-1f98-4a49-9a60-aae9d7cefc92.jpeg)

Bất cứ khi nào tôi bắt đầu một dự án iOS mới, điều đầu tiên tôi làm là nhập các tệp `Utilities` và `Extension` của mình vào dự án. Chúng giúp tôi lập trình hiệu quả hơn. Hãy xem 6 extensions yêu thích và cần thiết nhất của tôi.
### 1. Đổ bóng cho UIView
Khi thực hiện các thiết kế hiện đại, thường phải đổ bóng cho `UIView`. Thay vì phải viết nhiều dòng mã cho mỗi chế độ xem, tôi sử dụng extension sau:
```
extension UIView {
    func dropShadow() {
        self.layer.shadowColor = UIColor.gray.cgColor 
        self.layer.shadowOpacity = 0.3
        self.layer.shadowOffset = CGSize(width: 2, height: 4)
        self.layer.shadowRadius = 5
    }
}
```
Tất nhiên, mỗi dự án có thể yêu cầu một số thay đổi nhỏ đối với việc đổ bóng, nhưng điều đó có thể được thay đổi ở vị trí trung tâm.

![](https://images.viblo.asia/8f40c840-cd13-4a5c-8b15-12217fddc385.jpeg)

### 2. Trình bày một ViewController từ mọi nơi
Khi làm việc với các ứng dụng, thường chúng ta được yêu cầu thay đổi luồng `ViewController` linh hoạt. Thay vì viết hàm và chọn kiểu trình bày theo phương thức, bạn có thể sử dụng extension cho `UIViewController`.
```
extension UIViewController {
    func openMain() {
        if let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(identifier: "MainViewController") as? MainViewController {
          viewController.modalPresentationStyle = .fullScreen
          self.present(viewController, animated: true, completion: nil)
     }
}
//Use like this:
someViewController.openMain()
```

![](https://images.viblo.asia/f55df24b-50a3-4ffc-b6df-930c1a25ca14.png)

### 3. Làm cho việc bản địa hóa dễ dàng hơn
Việc bản địa hóa có thể được thực hiện trong Swift hơi bất tiện - đặc biệt nếu bạn đang cố gắng kết nối nhiều từ thành một câu:
```
let string = NSLocalizedString("Hello", comment: "") + " " + NSLocalizedString("World", comment: "")
```
Đó là lý do tại sao tôi sử dụng extension của mình cho `String` để đơn giản hóa quá trình này:
```
let string = "Hello".localized + " " + "World".localized
```
Extension này siêu đơn giản như sau:
```
extension String {
    var localized: String {
        return NSLocalizedString(self, comment: "")
    }
}
```
### 4. Viết khối mã không đồng bộ với độ trễ chỉ với 3 dòng mã
Việc viết các hàm và hàng đợi không đồng bộ có thể tạo ra các đoạn mã xấu và khó đọc. Hãy để tôi chia sẻ một extension để đơn giản hóa việc chạy tác vụ nền không đồng bộ trong ít hơn 3 dòng mã:
```
extension DispatchQueue {
    static func background(delay: Double = 0.0, background: (()->Void)? = nil, completion: (() -> Void)? = nil) {
        DispatchQueue.main.async {
            background?()
            if let completion = completion {
                DispatchQueue.main.asyncAfter(deadline: .now() + delay, execute: {
                    completion()
                })
            }
        }
    }
}
```
Điều này làm cho việc viết một khối mã không đồng bộ hai phần với độ trễ dễ dàng như sau:
```
DispatchQueue.background(delay: 1.0, background: {
    print("First")
}, completion: {
    print("Run async after 1 second")
})
```
### 5. Xử lý việc hiệu ứng lắc View
Khi làm việc với việc xác thực đầu vào của người dùng, bạn thường muốn cung cấp phản hồi nhập không chính xác của người dùng bằng cách lắc `View` qua lại. Hãy tạo một extension cho hành vi lắc này để chúng ta sẽ không bao giờ phải viết một khối mã lắc khác:
```
func shake() {
    let shake = CABasicAnimation(keyPath: "position")
    shake.duration = 0.05
    shake.repeatCount = 2
    shake.autoreverses = true
    let fromPoint = CGPoint(x: center.x - 5, y: center.y)
    let fromValue = NSValue(cgPoint: fromPoint)
    let toPoint = CGPoint(x: center.x + 5, y: center.y)
    let toValue = NSValue(cgPoint: toPoint)
    shake.fromValue = fromValue
    shake.toValue = toValue
    layer.add(shake, forKey: "position")
}
//Use like this: 
someView.shake()
```
Nó thật đơn giản phải không!
### 6. Làm tròn số Double đến một số vị trí nhất định dưới dạng một String
Một extension thường xuyên được yêu cầu khác là để làm tròn số `Double` hoặc số `Float` đến một số vị trí cụ thể.
Thông thường, chúng ta phải tính toán và trình bày một giá trị, vì vậy chúng ta sẽ cần nó ở dạng `String` (ví dụ: 1.42432 được làm tròn thành hai vị trí tạo thành 1.42).
```
extension Double {
    func rounded(toPlaces places:Int) -> String {
        let divisor = pow(10.0, Double(places))
        var returnValue = "\((self * divisor).rounded() / divisor)"
        if(returnValue.split(separator: ".")[1].count == 1 && places > 1) {
            returnValue += "0"
        }
        return returnValue
    }
}
//Use like this: 
1.403843.rounded(toPlaces: 2) >> "1.40"
```
### Kết luận
Tôi hy vọng bạn sẽ tận dụng được sức mạnh của các extension trong trong tương lai.
Nếu bạn có bất kỳ extension tuyệt vời nào mà bạn sử dụng và muốn chia sẻ, hãy chia sẻ chúng dưới dạng nhận xét bên dưới!