Nếu ứng dụng của bạn có nhiều User Interfaces (UI), bạn sẽ muốn di chuyển dữ liệu từ một User Interfaces sang User Interfaces tiếp theo. Làm thế nào để bạn truyền dữ liệu giữa các ViewController trong Swift?

Truyền dữ liệu giữa các ViewController là một phần quan trọng trong phát triển iOS. Bạn có thể sử dụng một số cách để làm như sau, và tất cả chúng đều có những ưu điểm và nhược điểm nhất định.

Khả năng truyền dữ liệu giữa các ViewController dễ bị ảnh hưởng bởi kiến trúc ứng dụng của bạn. Kiến trúc ứng dụng ảnh hưởng đến cách bạn làm việc với các ViewController và ngược lại.

Trong seri này, bạn sẽ tìm hiểu 6 phương pháp truyền dữ liệu khác nhau giữa các ViewController, bao gồm làm việc với các properties, segues và NSNotificationCenter. Bạn sẽ bắt đầu với cách tiếp cận dễ nhất, sau đó chuyển sang các thực tiễn phức tạp hơn.
# Truyền Data giữa các View Controllers với Properties (A → B)
Cách dễ nhất để lấy dữ liệu từ `ViewController A` đến `ViewController B` (chuyển tiếp) là sử dụng một `property`.

Một `property` là một biến thuộc một phần của class. Tất cả instance của class đó đều có sẽ có `property` đó, và bạn có thể gán giá trị cho `property` đó. `ViewController` có kiểu` UIViewController` có thể có các thuộc tính giống như bất kỳ class nào khác.

Ở đây, một ViewController `MainViewController` với một property được gọi là `text`
```Swift
class MainViewController: UIViewController
{
    var text:String = ""

    override func viewDidLoad()
    {
        super.viewDidLoad()
    }
}
```
Bất cứ khi nào bạn tạo instance của `MainViewController`, bạn có thể gán giá trị cho property `text` giống như thế này
```Swift
let vc = MainViewController()
vc.text = "Hammock lomo literally microdosing street art pour-over"
```

ViewController là một phần của `navigation controller` và chúng ta muốn truyền dữ liệu tới ViewController thứ 2.

Đầu tiên, nếu bạn dùng Storyboards bạn sẽ muốn wrap MainViewController trong `navigation controller`. Nếu bạn không dùng Storyboards, bạn có thể tạo `navigation controller` mới và set `MainViewController` là root view controller. 

Sau đó bạn tạo mới một view controller subclass và một view controller `.xib` file. Bằng cách `File -> New File...`. Và nhớ tick vào `Also create XIB file`
Bên dưới là code cho view controller thứ 2 này.
```Swift
class SecondaryViewController: UIViewController
{
    var text:String = ""

    @IBOutlet weak var textLabel:UILabel?

    override func viewDidLoad()
    {
        super.viewDidLoad()

        textLabel?.text = text
    }
}
```
Trong file `.xib` thêm một `UILabel` và kết nối nó tới `textLabel` Outlet. Bây giờ bạn có một view controller với property `text` và label kết nối với property.

Như bạn thấy ví dụ code phía trên, trong method `viewDidLoad`, property `text` của `textLabel` được gán giá trị từ property `text` của `SecondaryViewController`

Và để truyền dữ liệu
```Swift
@IBAction func onButtonTap()
{
    let vc = SecondaryViewController(nibName: "SecondaryViewController", bundle: nil)
    vc.text = "Next level blog photo booth, tousled authentic tote bag kogi"

    navigationController?.pushViewController(vc, animated: true)
}
```
Nếu bạn thêm một button vào `MainViewController`, và kết nối nó như trên thì đoạn code sẽ thực thi khi nhấn vào button.

Đây là những gì xảy ra trong đoạn code:
* Bạn tạo một constant được gọi là `vc` và gán nó bằng instance của `SecondaryViewController`
* Sau đó, bạn gán một chuỗi cho property `text` cho `vc`. Đây thực tế là việc truyền dữ liệu giữa các ViewController.
* Cuối cùng bạn push ViewController vào navigation stack với hàm `pushViewController(_:animated:)`.

Tóm tắt: 
* Đầu tiên, tạo property cho dữ liệu trên ViewController B (ViewController nhận dữ liệu). Trong ví dụ trên là `text`.
* Thứ hai, xác định những gì xảy ra với dữ liệu trong ViewController B. Trong ví dụ, bạn gán `text` cho `Label`.
* Thứ ba, trong ViewController A, tạo ViewController B, gán giá trị cho property và đẩy nó vào navigation stack.
# Passing Data giữa View Controllers sử dụng Segues (A → B)
Nếu bạn sử dụng Storyboards, bạn có thể truyền dữ liệu giữa các view controller với `segues` bằng hàm `prepare(for:sender:)`.

Truyền dữ liệu giữa các ViewController bằng cách sử dụng Storyboards, khác với việc sử dụng XIB. Hãy cùng tìm hiểu cách truyền dữ liệu về phía trước bằng cách sử dụng segues.

Ở đây, một bản giới thiệu nhanh về Storyboards và segues. Storyboard về cơ bản là một loại UI cho các ứng dụng của bạn. Bạn có thể xây dựng chúng bằng Interface Builder, trong Xcode và tạo chuyển tiếp giữa các viewcontroller mà không cần code.

Khi bạn chuyển từ một viewcontroller sang viewcontroller tiếp theo, ví dụ với bộ điều khiển điều hướng, bạn tạo một segue. Trong viewcontroller của bạn, bạn có thể nối vào segue này và tùy chỉnh nó. Truyền dữ liệu giữa các viewcontroller xảy ra trong một segue.

![](https://images.viblo.asia/186093fe-43d9-491c-bd7d-e7aebf7fb0fc.jpg)

Bạn có thể thấy segue từ `MainViewController` tới `TertiaryViewController`. Điều này đơn giản như việc thêm một action từ button vào ViewController thứ 3 và chọn loại Hiển thị. Một mũi tên từ `MainViewControll` đến `TerteratorViewControll` sẽ xuất hiện. Sau đó, bạn custom class trên ViewController, trong Identity Inspector, thành TerteratorViewContoder để điều khiển ViewController bằng code.

Đây là code từ class `TertiaryViewController`:
```Swift
class TertiaryViewController: UIViewController
{
    var username:String = ""

    @IBOutlet weak var usernameLabel:UILabel?

    override func viewDidLoad()
    {
        super.viewDidLoad()

        usernameLabel?.text = username
    }
}
```
Nó không có gì đặc biệt - giống như ví dụ trước, bạn có thể đặt một label `usernameLabel`.

Sau đó, để truyền data từ `MainViewController` tới `TertiaryViewController` bằng cách sử dụng hàm `prepare(for:sender:)`
```Swift
override func prepare(for segue: UIStoryboardSegue, sender: Any?)
{
    if segue.destination is TertiaryViewController
    {
        let vc = segue.destination as? TertiaryViewController
        vc?.username = "Arthur Dent"
    }
}
```
Đây là những gì sẽ xảy ra:
* Đầu tiên câu lệnh if để kiểm tra xem đích đến có phải là `TertiaryViewController` không. Bạn cần xác định xem đây có phải là segue bạn muốn tùy chỉnh không, bởi vì tất cả các segue đều đi qua hàm `prepare(for:sender:)`
* Sau đó đơn giản là cast đích đến thành `TertiaryViewController`, sau đó bạn có thể dùng property `username`. Property `destination` trên segue có kiểu `UIViewController` nên bạn cần cast nó để có thể sử dụng property `username`.
* Cuối cùng, bạn có thể set property `username`, giống như ví dụ trước.

Điều thú vị của segue là bạn không cần phải làm thêm gì. Hàm chỉ đơn giản là nối vào segue nhưng bạn không cần phải nói nó để tiếp tục quá trình. Bạn cũng không nên return ViewController mà bạn đã tùy chỉnh.

Bạn cũng có thể cải thiện mẫu mã ở trên như thế này:
```Swift
if let vc = segue.destination as? TertiaryViewController
{
    vc.username = "Ford Prefect"
}
```
Thay vì sử dụng `is` để kiểm tra kiểu của `destination`, và casting nó, bạn có thể sử dụng option casting. Khi `segue.destination` không phải là kiểu `TertiaryViewController` thì `as?` sẽ trả về `nil` và thế là điều kiện không được thực thi.

Nếu bạn không muốn sử dụng casting, bạn có thể sử dụng property `segue.identifier`. Set nó thành `tertiaryVC` trong Storyboard, và sử dụng nó:
```Swift
if segue.identifier == "tertiaryVC" {
    // Do stuff...
}
```
Vì vậy, đó là tất cả những gì có thể truyền dữ liệu giữa các ViewController bằng cách sử dụng segues và Storyboards!

Đối với nhiều ứng dụng, Storyboards giới hạn các transitions khác nhau giữa các ViewController mà bạn có thể sử dụng. Storyboards thường quá phức tạp trong việc xây dưng interfaces với ít lợi ích. Trên hết, Interface Builder sẽ bị chậm và lag nếu bạn có Storyboards hoặc XIB phức tạp.

Mọi thứ làm trên Storyboards đều có thể làm bằng tay với sự kiểm soát lớn hơn và ít công sức. Tuy nhiên tôi không nói rằng bạn nên viết mã giao diện người dùng bằng tay! Sử dụng một XIB cho một ViewController, giống như ví dụ ở trên và các subclass view như UITableViewCell.

Cuối cùng, với tư cách là một lập trình viên, bạn sẽ muốn tự mình tìm ra thứ bạn thích nhất - các tab hoặc space, Storyboards hoặc XIB, Core Data hoặc Realm - tùy thuộc vào bạn!

Phần tiếp theo mình sẽ nói về truyền trở lại dữ liệu (Passing Data Back)

Phần 2: https://viblo.asia/p/truyen-du-lieu-pass-data-giua-cac-viewcontroller-trong-swift-phan-2-vyDZOb09Kwj

Nguồn: https://learnappmaking.com/pass-data-between-view-controllers-swift-how-to/