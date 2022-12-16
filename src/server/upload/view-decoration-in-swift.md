**I. Giới thiệu**

Việc clean code là điều mà bất kỳ lập trình viên nào cũng phải làm. Nhưng việc để code được sạch sẽ và dễ đọc thì phải cần đến rất nhiều yếu tố. 
Mỗi lần rảnh tôi lại lục lọi đọc lại code các project tôi đã làm. Tâm lý ai cũng vậy lúc mở ra xem lại thành quả của mình thì đều khó có thể "ngửi" được :)). 
Một project mới lại rút được một chút kinh nghiệm và lại tự hào. Nhưng cứ làm xong và xem lại thì lại thấy có gì đó chưa ổn.
Tôi ví dụ một trường hợp khá phổ biến mà tôi và hầu hết các bạn đều đã gặp phải đó là: 

Trong một project có các View hiển thị khá giống nhau và mỗi lần như vậy tôi lại viết ra những dòng code tương tự. Cảm giác đọc lại code khá khó chịu :)) 
Nhưng sau đó tôi đã nghĩ một cách là viết vào Constant. Điều này đã giúp tôi không còn bị dulicate code nữa nhưng việc biến đổi theo cách mà mình muốn 
thật khó khăn. Vậy còn cách nào không nhỉ ? 

**II. Cách giải quyết**

Bạn muốn custom lại một UIVIew như giao diện. Có bo góc 4 cạnh và có shadow ? 
Trước tiên bạn tạo một protocol có tên là ViewDecorator. 

```
protocol ViewDecorator {
    func decorate(view: UIView)
}
```

Trong đó có một method. Gọi method với đầu vào là một UIView. 
Để việc custom UI đơn giản hơn. Tôi tạo thêm một extension cho UIView. Với extension thì việc set các thuộc tính cho UIView sẽ không cần phải gọi nhiều lần nữa. 

extension UIView {
    
```
func decorate(with decorator: ViewDecorator) {
    decorator.decorate(view: self)
}

func decorate(with decorators: [ViewDecorator]) {
    decorators.forEach { $0.decorate(view: self) }
}
}
```

Và giờ chúng ta tạo thêm struct để implement những gì mình muốn và xem cách hoạt động cho vấn đề này thế nào
Trước tiên tôi tạo một struct để set bo góc cho UIView như sau 

```
struct CornerRadiusViewDecorator: ViewDecorator {
    let cornerRadius: CGFloat
  
        func decorate(view: UIView)  {
            view.clipsToBounds = true
            view.layer.cornerRadius = cornerRadius
        }
}
```

Thêm một struct để set shadow cho UIView 

```
struct ShadowViewDecorator: ViewDecorator {
    let radius: CGFloat
    
    func decorate(view: UIView) {
        view.layer.shadowRadius = radius
        view.layer.shadowOpacity = 0.3
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOffset = CGSize(width: 0, height: radius / 2)
        view.layer.masksToBounds = false
    }
}
```

Giờ là công đoạn implement những gì mình đã làm được. Chúng ta có thể gọi cả 2 decorate cùng 1 lúc như sau: 

```
struct CardViewDecorator: ViewDecorator {
    private let decorators: [ViewDecorator] = [
        CornerRadiusViewDecorator(cornerRadius: 4),
        ShadowViewDecorator(radius: 2)
    ]
    
    func decorate(view: UIView) {
        view.decorate(decorators)
    }
}
```

Đây chỉ là một trong hàng trăm các trường hợp mà chúng ta có thể rút ngắn được code của mình. Các bạn tham khảo và chúng ta cùng nhau 
"vạch mặt" các trường hợp mình đã gặp phải và hướng giải quyết để cùng nhau tiến bộ nhé. 

**III. Kết luận** 

Có câu nói: Một lập trình viên giỏi phải code để người khác hiểu được chứ không chỉ là code để chạy được. 
Theo tôi việc này không chỉ làm trong ngày một ngày hai, nhưng đó là mục tiêu tôi đặt lên trên hết mỗi khi làm việc 

Link tham khảo : https://medium.com/halcyon-mobile/view-decoration-in-swift-4023a68be5d3