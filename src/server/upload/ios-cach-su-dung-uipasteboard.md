> Class **UIPasteboard** thêm cơ hội để ứng dụng của bạn có thể chia sẻ dữ liệu trong ứng dụng với một ứng dụng khác thông qua *clipboard*. Như tên gọi của nó đó chính là "Copy Paste".




Class **UIPasteboard** hỗ trợ các loại **NSString**, **UImage**, **NSURL** và **UIColor**. Ví dụ, đối với  **String** thì nó sẽ là:

```
let string = "Eval2412!"
let pasteboard = UIPasteboard.generalPasteboard()
pasteboard.string = string
```

Và để truy xuất giá trị ta dùng :

```
let pasteboard = UIPasteboard.generalPasteboard()
let string = pasteboard.string
print(string)
```

Đối với các loại khác cũng vậy. Ngoài ra, bạn có thể làm việc với nhiều items , ví dụ như sau:

```
let strings = [“Phantom”, “Lancer”]
let pasteboard = UIPasteboard.generalPasteboard()
pasteboard.strings = strings
```

Và Apple cũng cung cấp cho việc tạo bảng của riêng bạn:
```
let pasteboard = UIPasteboard(name: "Board", create: true)
```

Bên trong method, chúng ta truyền hai đối số: *name* và *create*.
Sử dụng câu lệnh trên, chúng ta có thể truy xuất cùng một Pasteboard có tên đã được đặt.
Đối số *create* yêu cầu giá trị Bool. Nếu nó được đặt là true, thì Pasteboard sẽ được tạo nếu nó chưa tồn tại.

Để sao chép URL / UIColor / UIImage vào Pasteboard, chúng ta chỉ cần thực hiện:

```
UIPasteboard.general.url = URL(string: "https://www.google.com")
UIPasteboard.general.color = UIColor.red
UIPasteboard.general.image = UIImage(named : "sample.png")
```

Để nó hoạt động giữa các ứng dụng, đừng quên sử dụng:

```
pasteboard?.persistent = true
```

Trong phần tiếp theo, chúng ta sẽ tạo 1 ứng dụng iOS cơ bản với các phương thức và thuộc tính đã nêu ở trên:

- Ở trong UI ViewController của chúng ta sẽ bao gồm : 2 TextField và 2 button như sau:

![](https://images.viblo.asia/9804c2d4-2c45-4b6d-b6da-fcd232e11927.png)

Tại textField đầu vào chúng ta sẽ thực hiện việc copy text có trong textField cho action button "Copy String" như sau:

```
    @IBAction func btnCopyStringAction(_ sender: Any) {
        UIPasteboard.general.string = textFieldCopy.text
    }
```

thuộc tính **general** được sử dụng để truy xuất UIPasteboard trên toàn hệ thống, "textFieldCopy" là outlet ta thiết lập cho textField đầu tiên.

Tiếp theo chúng ta sẽ thiết lập action cho button "Paste String" để truy xuất dữ liệu mà chúng ta đã copy từ "textFieldCopy" :

```
    @IBAction func btnPasteStringAction(_ sender: Any) {
        textFieldPaste.text = textFieldPaste.text! + UIPasteboard.general.string!
    }
```

"textFieldPaste" là outlet ta thiết lập cho textField đầu ra thứ 2.

Vậy là đã xong, chúng ta run app và xem kết quả :

![](https://images.viblo.asia/31efce08-9ac3-438d-8409-b2ef100f19a3.png)

Code cho class ViewController.swift được tổng hợp lại như sau:

```

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textFieldCopy: UITextField!
    @IBOutlet weak var textFieldPaste: UITextField!


    @IBAction func btnCopyStringAction(_ sender: Any) {
        UIPasteboard.general.string = textFieldCopy.text
    }
    
    
    @IBAction func btnPasteStringAction(_ sender: Any) {
        textFieldPaste.text = textFieldPaste.text! + UIPasteboard.general.string!
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
}

```










Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃