## Tại sao chúng ta cần reuse (tái sử dụng)
Một trong những best practices trong lập trình đó là tái sử dụng nhiều nhất bạn có thể.

Nếu như bạn có nhiều hơn 1 màn hình (UIViewController, xib) sử dụng cùng một view nhất định (UIView, UIButton,...) thì bạn nên tạo một generic element để dùng chung thay vì copy code tới nhiều nơi khác nhau trong dự án.

Áp dụng việc này sẽ giúp ích cho các bạn rất nhiều trong quá trình phát triển dự án và cho dù bạn muốn thay đổi vài thứ cho nó cũng có thể dễ dàng viết thêm extension hoặc kế thừa từ chính thứ mình đã viết.


## Ví dụ về việc tái sử dụng

### Step 1: Tạo class cho view mà bạn muốn
( :v cha này viết kĩ quá nên thôi mình để y chang tác giả viết để mọi người tiện sử dụng trong xcode)

Create a New file → Cocoa Touch Class → Điền tên mà bạn muốn đặt vào. Subclass of UIView. Language: Swift → Next. Select target desired → Create.

![](https://images.viblo.asia/22c77d12-7809-4874-b324-cd43a9e17579.png)

### Step 2: Tạo UIView

Create a New file → View → Đặt tên cho UIView(thường sẽ dùng trùng tên với class) → Next. Select target desired → Create.

![](https://images.viblo.asia/831041c7-1179-49fb-9418-60035601baf9.png)

Đầu tiên, chúng ta phải chỉnh lại sai là freeform cho file xib để tinh chỉnh lại form của view trùng nhất với UI chúng ta muốn tạo ra để thuận lợi cho việc setup constraints các view.

![](https://images.viblo.asia/221a300c-cc9c-4dbe-8c87-2610157fa0f0.png)

### Step 3: Set class cho view và setup các ánh xạ
Việc quan trọng kế tiếp đó là bạn phải set class vào file's owner của xib vừa tạo. Sau đó thì chúng ta có thể ánh xạ tuỳ ý mà chúng ta muốn vài class 
![](https://images.viblo.asia/64f8ce1c-4e07-417f-afd5-596e556d1c67.png)

### Step 4: Làm những gì bạn muốn trong class của View đó
Chúng ta sẽ tạo các hàm init trước và 1 function là commonInit() để thực thi các tác vụ setup cho các view bên trong (các bạn có thể đặt tên tuỳ ý nhé không nhất thiết phải là commonInit)

```
class MyView: UIView {
    @IBOutlet weak var myLabel: UILabel!
    
    let nibName = "MyView"
    
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
Bây giờ đều chúng ta cần làm là sử dụng reusable view này bằng cách điền loại class trong file xib mà chúng ta muốn dùng là xong

### Step 5: Sử dụng view mà ta đã tạo
![](https://images.viblo.asia/ef9e102a-7037-46fa-9d26-59eddcd27013.png)
Chúng ta không cần thiết phải ánh xạ outlet vào trong viewController nếu bạn không thích. Nếu bạn chỉ muốn nó hiển thị lên thì chỉ cần gõ tên class vào view là đủ.

### Step 6: Kết quả

Kết quả màn cả quá trình chúng ta làm sẽ được như thế này. Và đương nhiên bạn có thể thoải mái dùng nó bất cứ lúc nào bạn muốn vào view trong file xib là được.

![](https://images.viblo.asia/4fb6a309-29c0-4edf-ad3f-9842e88e1477.png)
(ở đây mình set background color trong xib cho các bạn dễ thấy về 2 uiview mà mình set MyView cho nó. Khi build lên thì bạn thấy đó. Nó y chang như những gì mà mình setup ở trên)

Nếu như các view bạn muốn dùng chỉ sửa đổi những thứ nhỏ như text, color ở những màn hình khác nhau thì bạn có thể chỉnh sửa chúng thông qua parameters của các view. Đơn giản nhất thì bạn cứ kéo outlet vào và config những params ấy trong viewDidLoad method của viewController là xong

Thực thi việc này giúp chúng ta tiết kiệm khá nhiều thời gian nếu có nhiều thứ bạn muốn dùng lại trong nhiều màn hình khác nhau. Chúng ta có thể tránh được việc copy-paste và nếu chúng có thay đổi thì chúng ta chỉ việc thay đổi 1 lần là áp dụng cho các views còn lại rồi. Quá tiện.

> Ví dụ này không chỉ dừng lại ở UIViews, chúng ta còn có thể dùng nó với các element khác nhau như: UITextField, UIButton, etc
> 

ĐỪNG COPY - PASTE, HÃY TÁI SỬ DỤNG CÁC VIEW NẾU CÓ THỂ :D 

-----

Do đây là bài mình dịch nên mình xin phép không public source code mà dùng của chính tác giả. 
Các bạn có thể check toàn bộ code bài mình dịch ở đây: 
[Source code](https://github.com/PabloBlanco10/ReusablesElementsSwift)

Bài viết mình dịch ở đây:
[How to create reusable UIViews in Swift](https://medium.com/flawless-app-stories/reusable-uiviews-in-swift-3f9dca63eaf4)