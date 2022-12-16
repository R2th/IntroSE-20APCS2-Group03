Việc vẽ view trên storyboard bao giờ cũng trực quan hơn, nhanh hơn so với việc code frame bằng tay. Hôm nay mình sẽ hướng dẫn các bạn cách tạo một view có thể tái sử dụng từ file xib theo cách đơn giản và chính xác nhất. 
Hãy follow theo các bước sau
# Bước 1
Tạo một "Persion View" là UIView
![](https://images.viblo.asia/93118b28-50b5-45a3-950f-ce30f109ef51.png)
# Bước 2
Tạo file xib đặt tên giống class đã tạo ở bước 1
![](https://images.viblo.asia/0085f377-b386-4d14-b002-dd5d7a296da7.png)

Hãy vẽ thêm 2 label lastname, first name để test

![](https://images.viblo.asia/9f28046d-9031-4aef-b265-62ba6932d525.png)

# Bước 3
Mở PersonView.xib và chọn File Owner, mở tab Custom Class và nhập PersonView. Bây giờ file quản lý PersonView.xib là class PersonView.

![](https://images.viblo.asia/87a2b1f0-2ee7-46b0-a4ca-a610ed8f886a.png)

# Bước 4

Kéo outlet view từ file xib vào file quản lý, đặt tên tuỳ ý
Ở đây, bạn cũng sẽ kéo toàn bộ ui muốn chỉnh sửa vào file quản lý để sử dụng trong đó, tuy nhiên view cha là bắt buộc phải kéo outlet
![](https://images.viblo.asia/4a929ded-6b55-4ea5-8178-bd3bbd974f46.png)

# Bước 5

Sử dụng đoạn code sau để init view

```
import UIKit

class PersonView: UIView {
    let kCONTENT_XIB_NAME = "PersonView"
    @IBOutlet var contentView: UIView!
    @IBOutlet var lblFirstName: UILabel!
    @IBOutlet var lblLastName: UILabel!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    func commonInit() {
        Bundle.main.loadNibNamed(kCONTENT_XIB_NAME, owner: self, options: nil)
        contentView.fixInView(self)
    }
}

extension UIView
{
    func fixInView(_ container: UIView!) -> Void{
        self.translatesAutoresizingMaskIntoConstraints = false;
        self.frame = container.frame;
        container.addSubview(self);
        NSLayoutConstraint(item: self, attribute: .leading, relatedBy: .equal, toItem: container, attribute: .leading, multiplier: 1.0, constant: 0).isActive = true
        NSLayoutConstraint(item: self, attribute: .trailing, relatedBy: .equal, toItem: container, attribute: .trailing, multiplier: 1.0, constant: 0).isActive = true
        NSLayoutConstraint(item: self, attribute: .top, relatedBy: .equal, toItem: container, attribute: .top, multiplier: 1.0, constant: 0).isActive = true
        NSLayoutConstraint(item: self, attribute: .bottom, relatedBy: .equal, toItem: container, attribute: .bottom, multiplier: 1.0, constant: 0).isActive = true
    }
}
```

# Bước 6
Đến đây thì là bước sử dụng bình thường ở những view khác, chúng ta có thể khởi tạo bằng tay hoặc trong storyboard đều được

![](https://images.viblo.asia/76955901-03be-4469-a475-bbd3c52e360b.png)

# Bước 7
 Done, kết quả là chúng ta có một view custom có thể tái sử dụng từ file xib. Cám ơn các bạn đã follow bài viết. Hi vọng sẽ tiết kiệm được thời gian cho các bạn.  Chúc các bạn thành công!