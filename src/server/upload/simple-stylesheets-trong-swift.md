Bạn đã bao giờ thấy đoạn code này chưa? 

```
public class ProductView: UIView {

    public let titleLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)
        label.textColor = .red
        label.numberOfLines = 2
        return label
    }()

    public let imageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .center
        imageView.backgroundColor = .darkGray
        return imageView
    }()
    
     public let imageABCView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .center
        imageView.backgroundColor = .darkGray
        return imageView
    }()
    ...
}
```
Nếu câu trả lời bạn là có, thì bạn cũng giống tôi cho đến khi tôi đọc được một bài trên hackernoon.com. Bạn thấy đấy những đoạn code trên để khởi tạo các subview, nhưng trong các class view sẽ bị phình to và trở lên hỗn độn, nó tạo cảm giác phân chia code thành 2 phần: 1 phần tạo các subview và phần implementation. Ngoài ra các đoạn code giống nhau thường xuyên được copy paste và có thể thường bạn tạo các snippet là công cụ hỗ trợ đắc lực cho việc copy paste đó. Và có lẽ bạn là fan của Custom Code và có thể bạn đang sử dụng snapkit, Texture,.... 
<br><br>Như trong mấy [số trước](https://viblo.asia/p/5-ly-do-de-ban-nghien-su-don-gianphan-2-oOVlYNGB58W), bài viết 5 lý do bạn nghiện sự đơn giản, tôi có để cập đến 5 lý do để bạn nghiện sự đơn giản này bao gồm:
1.  Modularity
2.  Reusability
3.  Maintainability
4.  Consistency
5.  Readability
<br><br> Điều đi ngược lại những gì tôi đã đề cập trong những yếu tố trên. Có cách đơn giản để giải quyết vấn đề này và tuân thủ các lý do trên. như bài viết số trước tôi đã đề cập rất nhiều lợi ích của việc tuân theo những lý do đó.
Chúng ta chỉ cần wrap clousre subview trong 1 struct về style, điều đó giups chúng tôi làm việc với nó dễ dàng hơn
```
public struct Style<View: UIView> {
    
    public let style: (View) -> Void
    
    public init(_ style: @escaping (View) -> Void) {
        self.style = style
    }
    
    public func apply(to view: View) {
        style(view)
    }
}
```
<br>Sau đó để tạo view và apply struct Style chúng ta ở trên để dùng ở mọi nơi,  chúng ta cần tạo extension cho UIView và sử dụng convenience initializer<br>
```
extension UIView {

    public convenience init<V>(style: Style<V>) {
        self.init(frame: .zero)
        apply(style)
    }
    
    public func apply<V>(_ style: Style<V>) {
        guard let view = self as? V else {
            print("💥 Could not apply style for \(V.self) to \(type(of: self))")
            return
        }
        style.apply(to: view)
    }
}
```

Cách sử dụng nó cũng rất đơn giản: 
```
enum Stylesheet {

    enum Product {

        static let title = Style<UILabel> {
            $0.font = .systemFont(ofSize: 12)
            $0.textColor = .red
            $0.numberOfLines = 2
        }

        static let image = Style<UIImageView> {
            $0.contentMode = .center
            $0.backgroundColor = .darkGray
        }
    }
}
```
<br>Bạn thấy đấy, nó sử dụng không hề khó. Nó có thể sử dụng mọi nơi, việc maintaince dễ dàng hơn, tính modul hoá được đảm bảo, có khả năng tái sử dụng và hạn chế duplicate code, tính thống nhất được  xuyên suốt trong project.
Bạn có thể tham khảo cấu trúc sau để áp dụng vào project của mình:
```
enum Stylesheet {

    // emnum dùng chung cho toàn bộ project
    enum Default { 

        static let title = Style<UILabel> {
            $0.font = .systemFont(ofSize: 12)
            $0.textColor = .red
            $0.numberOfLines = 2
        }
    }
    
    // emnum dùng chung cho view or viewcontroller or function nào đó
    enum Product { 

        static let title = Style<UILabel> {
            $0.font = .systemFont(ofSize: 15)
            $0.textColor = .blue
            $0.numberOfLines = 2
        }
    }
    
    enum UserVC { 

        static let image = Style<UIImageView> {
            $0.contentMode = .center
            $0.backgroundColor = .darkGray
        }
    }
}

public class ProductView: UIView {

    public let titleNameLabel = UILabel(style: Stylesheet.Default.title)
    public let titleLabel = UILabel(style: Stylesheet.Product.title)
    public let imageView1 = UIImageView(style: Stylesheet.UserVC.image)
    public let imageView2 = UIImageView(style: Stylesheet.UserVC.image) // khởi tạo UIImageView mới giống imageView1 mà ko cần duplicate code
}
```

<br>Ngoài ra, bạn có thể tham khảo một số lợi ích của việc code UI: https://www.youtube.com/watch?v=g6yz5oX5iWc
<br>p/s: Các bài viết của tôi có thể là tôi tự viết và có dịch kèm thêm bình luận theo phạm vi kiến thức hạn hẹp của mình hoặc chia sẻ dựa trên một bài viết hay tôi từng đọc, nhưng muốn chia sẻ những hiểu biết bé nhỏ của mình hi vọng hữu ích các bạn trong công việc. Đây là bài viết cuối cùng của tôi trên viblo, cảm ơn các bạn đã đọc các bài viết của tôi!
<br><br>Tham khảo
<br>Bài viết này được dựa trên ý tưởng của bài viết: https://hackernoon.com/simple-stylesheets-in-swift-6dda57b5b00d