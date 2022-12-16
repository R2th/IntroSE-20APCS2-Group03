# Mở đầu
Từ khi Apple ra mắt Storyboard và áp dụng nó ngay khi khởi tạo một project, chúng ta thường sử dụng nó trong các dự án và luôn phải pass các giá trị giữa các ViewController. Hôm nay mình sẽ giới thiệu với các bạn một tip giúp cho việc khởi tạo các giá trị của ViewController được an toàn và nhìn khoa học hơn.
Như chúng ta đã làm, giả sử cần push đến màn hình DetailViewController từ ViewController (root) chúng ta sẽ tạo 1 segue để navigate giữa chúng, kèm vào đó là pass các properties cần thiết cho việc khởi tạo các thành phần bên DetailViewController.
![](https://images.viblo.asia/39865960-5e43-4a40-94b7-f4e2b43d893f.png)
Đoạn code như sau:
### 1. Với DetailViewController.swift:
```
import UIKit
class DetailViewController: UIViewController {
    var isEdit: Bool?
    var myDetail: MyDetail?
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}
```

### 2. Với ViewController.swift
```
import UIKit
struct GlobalConstants {
    static let gotoDetailSegue = "gotoDetail"
}

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func showAppButtonClicked(_ sender: Any) {

        self.performSegue(withIdentifier: GlobalConstants.gotoDetailSegue, sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == GlobalConstants.gotoDetailSegue,
            let detailVC = segue.destination as? DetailViewController {
            detailVC.isEdit = true
            detailVC.myDetail = nil
        }
    }
}
```
Hai đoạn code trên là những gì chúng ta thường làm, tuy nhiên có 2 vấn đề đặt ra:
1. Nếu nhiều property hơn được sử dụng trong DetailViewController thì trong hàm `prepare(for segue: UIStoryboardSegue, sender: Any?)` chúng ta sẽ cần phải nhớ xem cái nào cần gán, cái nào không. Việc này rất dễ dẫn đến bị miss các property cần thiết, khiến việc code mất nhiều thời gian và có thể gây ra bug.
2. Về OOP, đoạn code trên vi phạm [Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))

Vậy để giải quyết 2 vấn đề trên, ta sẽ làm như sau:
### 1. Thay đổi Access Levels của các properties trong DetailViewController:
```
fileprivate var isEdit: Bool?
fileprivate var myDetail: MyDetail?
```
### 2. Tạo 1 extension:
```
extension DetailViewController {
    func configure(isEdit: Bool?, detail: MyDetail?) {
        self.isEdit = isEdit
        self.myDetail = detail
    }
}
```
### 3. Tại ViewController, chúng ra refactor lại code:
```
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == GlobalConstants.gotoDetailSegue,
            let detailVC = segue.destination as? DetailViewController {
          //            detailVC.isEdit = true
         //            detailVC.myDetail = nil
            detailVC.configure(isEdit: true, detail: nil)
        }
    }
```

# Kết
Solution thì vô cùng đơn giản nhưng đôi khi trong quá trình phát triển dự án, các bạn coder thường không hay để ý đến. Vậy với cách làm như trên, chúng ta đã có một source code **safety** và **robust**, dễ dàng trong việc mở rộng và refactoring code khi dự án scale. 
Các bạn cũng có thể đọc thêm những cách refactor code trong việc sử dụng Storyboard:
1. https://medium.com/swift-programming/uistoryboard-safer-with-enums-protocol-extensions-and-generics-7aad3883b44d
2. https://medium.com/@gurdeep060289/clean-code-for-multiple-storyboards-c64eb679dbf6