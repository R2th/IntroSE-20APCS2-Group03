# MVC là viết tắt của 3 từ Model, View và Controller
**Models**: Là dối tượng có vai trò định nghĩa, tổ chức lưu trữ và thao tác trực tiếp với dữ liệu
**Views**: Là đối tượng chịu trách nhiệm về hiển thị giao diện hay nói cách khác đó là tầng mà người dùng quan sát và tương tác trực tiếp.
**Controller**: Là bộ điều kiển trung gian có vai trò quản lý, điều phối tất cả công việc. Nó truy cập dữ liệu từ Model và quyết định hiển thị nó trên View. Khi có một sự kiện được truyền xuống từ View, Controller quyết định cách thức xử lý: có thể là tương tác với dữ liệu, thay đổi giao diện trên View

![](https://images.viblo.asia/1a25c6ce-8733-45f4-b45e-b138e23a2e9f.png)

Cocoa MVC khuyến khích bạn viết Massive View Controllers, bởi vì họ cho là liên quan đến vòng đời của View (View’s life cycle) thật khó mà tách riêng được. Mặc dù bạn vẫn có khả năng giảm tải một số business logic và chuyển dữ liệu đến Model, bạn không có nhiều sự lựa chọn khi nói đến giảm tải cho View, tại hầu hết thời gian trách nhiệm của View là gửi thao tác của người dùng đến Controller. ViewController sẽ xử lý thông qua delegate và datasource và nó thường chịu trách nhiệm cho việc gửi đi (dispatching) và hủy bỏ (cancelling) các network request.

Bao nhiêu lần bạn đã thấy code như này:
```
var userCell = tableView.dequeueReusableCellWithIdentifier("identifier") as UserCell
userCell.configureWithUser(user)
```
Cell được View cấu hình trực tiếp trong Model, vì vậy MVC guidelines bị vi phạm, nhưng điều này xảy ra mọi lúc, và thường thì mọi người không cảm thấy đó là sai. Nếu bạn nghiêm túc thực hiện các MVC, thì bạn phải cấu hình các cell từ Controller, và không vượt qua Model vào View, và điều này sẽ làm tăng kích thước của Controller nhiều hơn.
> Cocoa MVC không phải viết tắt của Massive View Controller.

Vấn đề có thể không rõ ràng cho đến khi nói đến Unit Testing (hy vọng, nó có trong dự án của bạn). Kể từ khi ViewController được liên kết chặt chẽ với View, nó trở nên rất khó để kiểm thử bởi vì bạn phải rất sáng tạo trong View và vòng đời của nó, trong khi cách viết code của ViewController như vậy, làm cho business logic được tách ra càng nhiều càng tốt so với View.
Nhìn 1 ví dụ trong file playground:
```
import UIKit

struct Person { // Model
    let firstName: String
    let lastName: String
}

class GreetingViewController : UIViewController { // View + Controller
    var person: Person!
    let showGreetingButton = UIButton()
    let greetingLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.showGreetingButton.addTarget(self, action: "didTapButton:", forControlEvents: .TouchUpInside)
    }

    func didTapButton(button: UIButton) {
        let greeting = "Hello" + " " + self.person.firstName + " " + self.person.lastName
        self.greetingLabel.text = greeting

    }
    // layout code goes here
}
// Assembling of MVC
let model = Person(firstName: "David", lastName: "Blaine")
let view = GreetingViewController()
view.person = model
```
> MVC assembling có thể được thực hiện trong view controller

Việc này làm khó khả năng kiểm thử đúng không? Chúng ta có thể di chuyển dữ liệu sang class GreetingModel và kiểm thử nó riêng lẻ, nhưng chúng ta không thể kiểm thử bất kỳ presentation logic nào bên trong GreetingViewController mà không gọi method liên quan trực tiếp đến UIView (viewDidLoad, didTapButton), mà có thể cần load tất cả View, điều này không tốt cho Unit Testing.

Thực tế, loading và testing UIView trên một simulator (như: iPhone 4S) không đảm bảo nó có thể hoạt động tốt trên các thiết bị khác (như: iPad). Do đó, tôi khuyến khích bạn nên loại bỏ “Host Application” ở phần cấu hình Unit Test và kiểm thử mà không cần chạy ứng dụng trên simulator.

Với những gì đã nói ở trên, Cocoa MVC có vẻ là một bad pattern để được chọn. Nhưng chúng ta hãy đánh giá về những tính năng của nó được xác định trong phần đầu của bài viết:
* Sự phân chia - View và Model đã được tách riêng, nhưng View và Controller lại được gắn chặt vào nhau.
* Khả năng kiểm thử — do sự phân chia không được tốt nên bạn chỉ kiểm thử được phần Model.
* Dễ sử dụng - với ít code hơn so với những mô hình khác. Ngoài ra, mọi người đã quen thuộc với nó, do đó, các developer ít kinh nghiệm cũng có thể dễ dàng bảo trì.
* Cocoa MVC là pattern được chọn khi bạn không sẵn sàng đầu tư nhiều thời gian vào kiến trúc, và chi phí bảo trì là quá cao cho một project nhỏ.