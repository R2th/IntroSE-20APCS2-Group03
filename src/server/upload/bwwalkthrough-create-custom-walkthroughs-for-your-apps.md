### Giới thiệu:
**BWWalkthrough** là 1 library đơn giản hoá việc tạo ra các walkthrough mà không có bất kỳ ràng buộc về thiết kế giao diện người dùng. Bạn có thể tạo các walkthrough nhanh chóng với những hiệu ứng transition đẹp mắt.

Đây là ví dụ demo đơn giản:
{@youtube: https://www.youtube.com/watch?v=DBYLaDTMRVk}

### Cách cài đặt library:
Sử dụng Cocoapods:
- add Podfile trong project:
        `pod "BWWalkthrough"`
- run  `Pod install`

P/s: Nếu không muốn cài đặt tự động thì bạn có thể add 2 file **BWWalkthroughPageViewController.swift** và **BWWalkthroughViewController.swift** vào trong project của bạn. :)
### Cách lib hoạt động:
Các thành phần chính của một walkthrough:
- Previous/Next page buttons: Để chuyển đổi giữa các walkthrough pages với nhau. (Bên cạnh đó người dùng có thể vuốt sáng trái/phải để chuyển đổi).
- Skip/Close button: Đổ đóng walkthrough
- Page Control: Thể hiện page hiện tại và tổng số lượng walkthrough pages.
- Một list Pages/Steps để hiển thị.

**BWWalkthrough**  cung cấp đầy đủ các thành phần trên, bạn chỉ cần connect các IBOutlet và IBAction của các components trong viewcontroller của bạn tương ứng với các thành phần mà BWWalkthrough đã định nghĩa sẵn là được.

Một walkthrough gồm 2 phần: Container và walkthrough pages
- Contrainer: Chứa các buttons và page control.
- Walkthrough pages: chứa nội dung cần hiển thị.
### Container setup:
1. Tạo một ViewController trong storyboard có:
- class: BWWalkthroughViewController
- storyBoardID: container

![](https://images.viblo.asia/2debff8e-9300-41c2-bc33-48f9db76aa41.png)

2. Tạo các components: 
- add: Next button, Previous button, Close button và Page control

![](https://images.viblo.asia/0012df9b-edf9-4480-af6f-6d64299da1d9.png)

- connect IBOutlet và IBAction tương ứng

![](https://images.viblo.asia/08fcbbf2-25da-4e32-b3f1-fb88ab7bfd38.png)
### Pages setup:
Trong ví dụ này mình sẽ tạo ra 4 pages
1. Tạo 4 ViewControllers có:
- class: BWWalkthroughPageViewController
- storyBoardID: Page1, Page2, Page3, Page4
- add images cho mỗi page

![](https://images.viblo.asia/ee76dfbd-f48c-4aeb-a9a9-e6521978ff93.png)

2. Setup animation cho mỗi page:
BWWalkthrough cung cấp các property sau:

![](https://images.viblo.asia/136b0756-38d0-41a8-bdd4-80541fa859ac.png)

- Speed: Xác định tốc độ của animation với mỗi trục.
- Speed variance: tốc độ của mỗi phần tử tăng dần theo giá trị này, nếu bạn giữ nó ở mức không thì tất cả các phần tử sẽ có cùng tốc độ, thay đổi nó để dễ dàng có được một hiệu ứng song song.
- Animation Type: gồm có 4 loại “Linear”, “Curve”, “Zoom” và “InOut”. 
- Animate Alpha: set "On" để xem hiệu ứng FadeIn / FadeOut trong quá trình chuyển trang.
- Static Tags: Liệt kê các element không cần animate khi chuyển page.

Trong ví dụ này set:
- page 1: Linear, speed = 1, speed variance = 0.5, Animate Alpha = Default
- page 2: Curve, Animate Alpha = On
- page 3: Zoom, Animate Alpha = Off
- page 4: custom style. (sẽ trình bày sau)
### Initialize the Walkthrough:
Tạo ViewController trong đó có button "Show walkthrough" để present Walkthrough
```
import UIKit
import BWWalkthrough

class ViewController: UIViewController {

    var walkthrough: BWWalkthroughViewController!

    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func presentWalkthrough(){
        let stb = UIStoryboard(name: "Main", bundle: nil)
        walkthrough = stb.instantiateViewController(withIdentifier: "container") as! BWWalkthroughViewController
        let page_one = stb.instantiateViewController(withIdentifier: "Page1")
        let page_two = stb.instantiateViewController(withIdentifier: "Page2")
        let page_three = stb.instantiateViewController(withIdentifier: "Page3")
        let page_four = stb.instantiateViewController(withIdentifier: "Page4")
        
        // Attach the pages
        walkthrough.delegate = self
        walkthrough.add(viewController: page_one)
        walkthrough.add(viewController: page_two)
        walkthrough.add(viewController: page_three)
        walkthrough.add(viewController: page_four)
        
        self.present(walkthrough, animated: true, completion: nil)
    }
}
```
### Walkthrough Delegate:
> walkthroughCloseButtonPressed()
> 
> walkthroughNextButtonPressed()
> 
> walkthroughPrevButtonPressed()
> 
> walkthroughPageDidChange(pageNumber:Int)
Trong ví dụ này ta chỉ sử dụng 1 delegate để dismiss walkthrough khi cần.
```
func walkthroughCloseButtonPressed() {
        self.dismiss(animated: true, completion: nil)
}
```
### Custom animations:
Để tạo được animation như trên ví dụ, ta cần tạo 1 subclass của BWWalkthroughPageViewController và override lại method walkthroughDidScroll(position:, offset:)
```
import UIKit
import BWWalkthrough

class MyCustomTransitionViewController: BWWalkthroughPageViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        super.viewDidLoad()
        view.layer.zPosition = -1000
        view.layer.isDoubleSided = false
        self.view.backgroundColor = UIColor.white
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func walkthroughDidScroll(to position: CGFloat, offset: CGFloat) {
        var tr = CATransform3DIdentity
        tr.m34 = -1/1000.0
        view.layer.transform = CATransform3DRotate(tr, CGFloat(M_PI)  * (1.0 - offset), 0.5,1, 0.2)
    }
}
```
### Tổng kết:
Trên đây mình đã giới thiệu sơ qua về Lib BWWalkthrough, hy vọng nó giúp được các bạn trong việc tạo ra walkthrough sinh động một cách nhanh chóng và tiện lợi. Thanks!