# Tại sao chúng ta nên tái sử dụng lại UIView
Trong lập trình, chúng ta nên tái sử dụng lại nhiều nhất có thể, điều này sẽ giúp chúng ta có thể dễ dàng hơn trong việc maintenance sau này đồng thời giúp source code chúng ta ít hơn. Và trong swift cũng vậy, với những view thường xuyên được sử dụng trong dự án, nếu chúng ta copy past view để sử dụng như vậy thì về sau khi view đó cần có một sự thay đổi nhỏ về giao diện thì chúng ra sẽ phải điều chỉnh lại từng view. Vì thế ta nên tạo một view rồi tái sử dụng nó, khi có sự thay đổi, ta chỉ cần điều chỉnh một view.
# Ví dụ về tái sử dụng View trong Swift
# Bước 1: Chúng ta tạo một class được kế thừa từ UIView để quản lý view
Tạo một file mới → Cocoa Touch Class → đặt tên cho class view. Kế thừa từ UIView. Language: Swift → Next. Select target desired → Create

![](https://images.viblo.asia/06b7c47a-f75d-4d51-a81e-5d13515f0f9c.png)

Ta có thể điều chỉnh lại size của file xib này để có thể dễ dàng design UI cho view này.

![](https://images.viblo.asia/ae460d90-94e0-4959-834f-a8e9cad0f4ee.png)

# Bước 3: Liên kết file class cho file xib:
file class sẽ quản lý các config của view này, nếu muốn chúng ta cũng có thể design giao diện cho view này bằng code trong file class vừa được liên kết với file xib

![](https://images.viblo.asia/1f260ec6-db7a-4f21-baa9-1b10745cf473.png)

# Bước 4: Viết code cho file class để sử dụng view
Ta cần viết phương thức khởi tạo cho view trong class UIView, điều này sẽ giúp ta khởi tạo được view và set đúng kích thước
```
import UIKit

class ReusableFooter: UIView {

    @IBOutlet weak var containerView: UIView!
    @IBOutlet weak var footerText: UILabel!
  
    let nibName = "ReusableFooter"
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    func commonInit() {
        guard let view = loadViewFromNib() else { return }
        view.frame = self.bounds
        self.addSubview(view)
    }
    
    func loadViewFromNib() -> UIView? {
        let nib = UINib(nibName: nibName, bundle: nil)
        return nib.instantiate(withOwner: self, options: nil).first as? UIView
    }
}
```
# Bước 5: Sử dụng view vừa được tạo
Ta thêm một view vào ViewController, sau đó gắn class UIView vừa được tạo ở phía trên cho view tại Custom class

![](https://images.viblo.asia/ad936eea-9180-4e13-a3b9-a9eefce43381.png)

# Bước 6: Kết quả
Khi run app, view trắng ta vừa khởi tạo được liên kết với class UIView sẽ được hiển thị với các design ở file xib, sau này nếu có cần thay đổi, ta chỉ cần thay đổi ở file xib, và các view được liên kết sẽ được thay đổi theo.

![](https://images.viblo.asia/cb61173a-a7e8-48b8-aa55-8ef9703a5648.png)

Reference: https://medium.com/flawless-app-stories/reusable-uiviews-in-swift-3f9dca63eaf4