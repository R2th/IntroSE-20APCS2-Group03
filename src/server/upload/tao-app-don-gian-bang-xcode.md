Cùng tạo một App nhỏ vui vui bằng Xcode với giao diện đơn giản gồm click button và thay đổi text hiển thị tương ứng.

Giao diện App sẽ như sau

![](https://images.viblo.asia/19e9b9c4-6727-4201-abdc-6cf4cd4e6020.gif)

Có sẵn button và text, nếu click button thì text cũng sẽ thay đổi theo, đây là một App vô cùng đơn giản dành cho những người mới bắt đầu học code.

### Chuẩn bị project

![](https://images.viblo.asia/9fd7e73f-e76f-4a8b-a50f-79180506c797.jpg)

Open Xcode.
Mở theo hình như sau và chọn "Create a new Xcode project".

![](https://images.viblo.asia/d60ff924-aa37-4e81-b4f5-0bc80a87d5bf.png)

Ở template chọn "Single View App" và click "Next".

![](https://images.viblo.asia/837bc182-03ef-49f6-9d54-9409eb44ed82.png)

Setting cho project như sau:

* Product Name: Nhập tên App phù hợp với nội dung mà mình muốn truyền tải.
* Organization Name: Nhập tên của bạn.
* Organization Identifier: Nhập ngược với domain (Ví dụ nếu nhập "liginc.co.jp" thì sẽ thành jp.co.liginc).
* Language: Chọn "Swift".

Click "Next", chọn nơi lưu data của project.

![](https://images.viblo.asia/e9ca4e55-68c5-4197-9e4a-41428b1be7d9.png)

Nếu mở màn hình editor thì công việc chuẩn bị cho project đã được hoàn tất.


### Chuẩn bị giao diện

![](https://images.viblo.asia/f6680f97-ef7b-4b8f-aae7-713e95e498a5.png)

Từ Navigator chọn file ở bên trái, chọn "Main.storyboard" sẽ hiển thị ra màn hình App ở chính giữa.

Sau đây là luồng công việc tạo App.

**Đặt Label**

Trước tiên, đặt object cho Label hiển thị text.

![](https://images.viblo.asia/b3c13cbd-4c85-4f30-ae78-d37a20610a5e.png)


Khi click vào button bên phải tool bar, sẽ hiển thị list object. Tìm object label và đặt vị trí phù hợp bằng cách kéo thả.

![](https://images.viblo.asia/55310f57-8b0b-4922-ae22-4918a8492e29.png)

Sau khi đặt vào vị trí, setting để xác định vị trí một cách chính xác.

![](https://images.viblo.asia/6748c183-a64a-4a97-953a-82b6a554f102.png)

Để ở trạng thái chọn Label đã add, click vào button "Align" ở phía dưới của editor sẽ xuất hiện "Add New Alignment Constraints".

![](https://images.viblo.asia/415bed6f-6a87-4933-aabf-66ff95759b96.png)

Check vào "Horizontally in Container" và set là 0.

Như vậy sẽ chỉnh được trục hoành về trung tâm.

![](https://images.viblo.asia/8fe2b2ce-b4ce-4782-a5bc-b7b8db4f2d60.png)

Tiếp theo tương tự ở dưới button, chọn "Add New Constraint".

![](https://images.viblo.asia/0517c11b-4f0a-4687-b15a-4b2f2d43ab7d.png)

Set giống như hình và click "Add 1 Constraint".

Như vậy đã đặt được Label với vị trí căn giữa và cách phía trên 1 khoảng là 64.

**Đặt button**

![](https://images.viblo.asia/47baba7c-2c1c-4c57-8308-0c96f0bb9eee.png)

Đặt 2 button.

Cũng tương tự như "Label", từ phía bên phải tìm "Button".

![](https://images.viblo.asia/b78e28c2-63c2-4bc4-a073-acad5432f432.png)


Trước tiên, đặt 2 button vào vị trí bất kỳ bằng cách kéo thả.

Làm tương tự như trước đối với "Add New Constraint"

![](https://images.viblo.asia/1664cbfd-cf63-4014-b5dd-79bd6785aa1d.png)


Vị trí của button thứ nhất sẽ ở phía dưới cùng bên trái nên sẽ setting trái là "32", dưới là "64". Và click "Add 2 Constraints".

![](https://images.viblo.asia/bf4c28f4-bae6-4731-91a8-7c3d44172b85.png)


Vị trí của button thứ hai sẽ ở phía dưới cùng bên phải nên sẽ setting phải là "32", dưới là "64". Và click "Add 2 Constraints".

![](https://images.viblo.asia/68a63f81-8fea-432a-a99e-a72772226b2f.png)

Việc đặt vị trí tới đây là Kết thúc!!

Tiếp theo, sử dụng swift để thay đổi text, mô tả xử lý cho Label và Button.

### Trang trí Label và Button

**Switch màn hình**

![](https://images.viblo.asia/94646fce-1817-4bc5-ba32-37e085808031.png)

Click vào button có hình ○ như phía bên phải "Show the Assignment editor", thì khu vực editor sẽ chia làm 2 phần.

![](https://images.viblo.asia/efe3651b-3073-46a4-a6a4-9add2f7272b3.png)

Phía bên trái "Main.storyboard" và phía bên phải là "ViewController.swift"

![](https://images.viblo.asia/36b7407d-620c-4276-8e7d-eff26944db57.png)

Nếu phía bên phải không phải là "ViewController.swift" thì chọn vào khu vực editor phía bên phải rồi nhấn tổ hợp command + option + o thì có thể chỉ định được file để mở.

Tìm kiếm "ViewController.swift" và open.

**Thay đổi text hiển thị cho Label**

Tìm trong "ViewController.swift" sẽ có "viewDidLoad() {}".

Mô trả xử lý khi load màn hình.

```
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}
```

**Kết nối outlet của Label**

![](https://images.viblo.asia/4c3727da-e83e-421d-80cb-b11c0b18134c.gif)

Giữ "Label" của "Main.storyboard" và vừa nhấn key control,  vừa kéo thả vào phía trước của hàng "override func viewDidLoad()"

Nhập tên vào phần "Name:", ở đây nhập là "label".

Add được @IBOutlet weak var label: UILabel!.

```
@IBOutlet weak var label: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
```

**Thay đổi text của Label**

Tiếp theo, thay đổi text của Label bằng source code sau:

Ở viewDidLoad() {}, > super.viewDidLoad() ở phía dưới mô tả label.text = "どっち?".

```
@IBOutlet weak var label: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        label.text = "どっち?"
    }
```

Tới đây có thể thay đổi text thành chữ "どっち?".

**Confirm bản thử**

Đến phần này, sẽ check thử xem App trông như thế nào.

![](https://images.viblo.asia/e1d66a80-3dc9-43a2-8850-3ef98be7b7f9.png)

Click vào button hình play ở phía bên trên.

![](https://images.viblo.asia/e8ca7222-f53d-40d3-9377-79323cb64385.png)

Phần "Label", sẽ chuyển thành chữ "どっち?".


**Thay đổi text của Button**

Kết nối outlet với 2 button của "Main.storyboard".

Setting tên "buttonCat" cho phần bên trái, và "buttonDog" cho phần bên phải.

```
@IBOutlet weak var label: UILabel!
    @IBOutlet weak var buttonCat: UIButton!
    @IBOutlet weak var buttonDog: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        // Change text label
        label.text = "どっち?"
    }
```

**Thay đổi title button**

Thay đổi như sau
* Button bên trái thay bằng ảnh Nya-chan
* Button bên phải thay bằng ảnh Wan-chan
* Phóng to kích thước của 2 bên

```
@IBOutlet weak var label: UILabel!
    @IBOutlet weak var buttonCat: UIButton!
    @IBOutlet weak var buttonDog: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Skip over
        
        // Change button title
        buttonCat.setTitle("🐱", for: .normal)
        buttonDog.setTitle("🐶", for: .normal)

        // Change button size
        let buttonSize = UIFont.systemFont(ofSize: 60)
        buttonCat.titleLabel?.font = buttonSize
        buttonDog.titleLabel?.font = buttonSize
    }
```

**Click button sẽ change text của label**

Thực hiện kết nối theo action như sau:

![](https://images.viblo.asia/f6ec73d9-816c-43f6-b334-bb830ac6f91a.gif)

Từ button của "Main.storyboard", vừa nhấn key control vừa kéo thả vào dưới "viewDidLoad(){}".

Tương tự như vậy, chỉ định "Name:".

Button bên trái gắn tên là "tapCat".

Tương tự bên phải gắn tên là "tapDog".

```
override func viewDidLoad() {
        // Skip over
    }

    @IBAction func tapCat(_ sender: Any) {
    }
    
    @IBAction func tabDog(_ sender: Any) {
    }
```

Nếu click button có hình ảnh Nya-chan sẽ chạy xử lý mô tả trong "tapCat(){}".

**Thay đổi label khi tap vào button**

Chỉ mô tả mình xử lý trong "tapCat(){}" và "tapDog(){}", thay đổi text của label bằng "label.text".

```
@IBAction func tapCat(_ sender: Any) {
        label.text = "にゃーにゃー!"
    }
    
    @IBAction func tabDog(_ sender: Any) {
        label.text = "わんわん!"
    }
```

### COMPLETED!!!!!!!!!

**Source code sau khi hoàn thiện**

Source code của "ViewController.swift" sau khi hoàn thiện sẽ như sau:

```
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var label: UILabel!
    @IBOutlet weak var buttonCat: UIButton!
    @IBOutlet weak var buttonDog: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        // Change text label
        label.text = "どっち?"
        
        // Change button title
        buttonCat.setTitle("🐱", for: .normal)
        buttonDog.setTitle("🐶", for: .normal)
        
        // Change button size
        let buttonSize = UIFont.systemFont(ofSize: 60)
        buttonCat.titleLabel?.font = buttonSize
        buttonDog.titleLabel?.font = buttonSize
    }

    @IBAction func tapCat(_ sender: Any) {
        label.text = "にゃーにゃー!"
    }
    
    @IBAction func tabDog(_ sender: Any) {
        label.text = "わんわん!"
    }
}
```

**Confirm bằng simulator**

Cuối cùng, confirm bằng simulator

Click lại replay mark button ở phía bên phải tool bar để build.

![](https://images.viblo.asia/48f42cb2-5d95-4bf4-9158-6bddd8fd550c.gif)


Nếu tap vào button hình Nya-chan hoặc Wan-chan, thì text hiển thị sẽ thay đổi tương ứng.

Đây là 1 bản thử đơn giản, có thể giúp ích cho các bạn triển khai 1 dự án vui nào đó.