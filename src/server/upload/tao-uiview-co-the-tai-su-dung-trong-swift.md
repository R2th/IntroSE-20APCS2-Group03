> Hướng dẫn được thực hiện với Xcode 10.3 và Swift 5.0

![](https://images.viblo.asia/d32acaff-8dbb-4715-b6ee-dbeac7f12e10.png)

### Tại sao chúng ta nên tái sử dụng UIViews?
Một trong những phương pháp hay nhất trong lập trình là sử dụng lại càng nhiều càng tốt, 

Nếu bạn có nhiều màn hình (UIViewController, xib…) với cùng một phần tử hình ảnh (UIView, UIButton…), bạn nên xem xét tạo một phần tử chung thay vì đi copy-paste lại ở nhiều nơi...

Giải pháp này giúp bạn tiết kiệm thời gian triển khai trong tương lai. Và nếu bạn cần thay đổi, bạn phải thay đổi nó chỉ một lần.

### Ví dụ về view có thể tái sử dụng

##### Bước 1: Tạo lớp chế độ xem có thể sử dụng lại
Tạo tệp mới → Cocoa Touch Class → Đặt tên bạn muốn cho chế view class của mình. Subclass UIView. Language: Swift → Next. Chọn Target
 → Tạo
 ![](https://images.viblo.asia/02e361f3-835b-4cba-a5f9-4043f4168fc3.png)
 
##### Bước 2: Tạo UIView
Tạo File mới → View → Đặt tên → Next. Chọn target → Create
![](https://images.viblo.asia/bbe92a93-2b21-4e47-a086-e68562da34d9.png)

Trước hết, chúng ta phải set view size thành freeform trong XIB và đặt kích thước chúng ta muốn để đặt tất cả các phần tử cần thiết trong View.

![](https://images.viblo.asia/ab9eaf21-27b2-40fa-829d-195dad071a48.png)

##### Bước 3: Set Class cho View và các Outlets
Chúng ta sẽ đặt File's Owner của View thành file Swift custom view mà chúng ta vừa tạo ở trên trong XIB.

![](https://images.viblo.asia/e5037a27-3220-4504-83a3-e549db122147.png)

##### Bước 4: Code
Chúng ta cần tạo phương thức inits thích hợp và phương thức commonInit() sẽ khởi tạo view và đặt kích thước chính xác.

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
Bây giờ, điều duy nhất chúng ta phải làm để sử dụng reuseable uiview của chúng ta là thiết lập class trong tệp xib thành view mà chúng ta muốn.
##### Bước 5: Sử dụng custom reuseable View
![](https://images.viblo.asia/5096f478-f116-4f2a-ab31-dc1c54b0b83c.png)
##### Step 6: Chạy thử
Kết quả của việc Implement này cho phép chúng ta sử dụng custom view của mình nhiều lần tùy thích chỉ bằng cách đặt lớp trong tệp xib của chúng ta thành view mà chúng ta muốn.

Nếu view thay đổi những thứ nhỏ như văn bản hoặc màu trong các màn hình khác nhau, chúng ta có thể đặt cấu hình của nó theo các tham số . Nếu chúng ta muốn thay đổi bất kỳ thứ gì của reuseable view của mình, thì khá dễ dàng đặt các tham số sau phương thức viewDidLoad của viewController.

Việc implement này giúp chúng ta tiết kiệm thời gian nếu một phần tử xuất hiện trong nhiều màn hình. Chúng ta tránh copy-paste và nếu view thay đổi chúng ta chỉ phải thay đổi nó một lần .
> Ví dụ này không chỉ hữu ích với UIViews, nó có thể được sử dụng với tất cả các loại phần tử như UITextfields, UIButtons, v.v.

Demo projects: https://github.com/PabloBlanco10/ReusablesElementsSwift 

Nguồn tham khảo: https://medium.com/flawless-app-stories/reusable-uiviews-in-swift-3f9dca63eaf4