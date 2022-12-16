# 1. Giới thiệu
Bạn muốn thêm một tableview với static content vào trong 1 *ViewController*, tuy nhiên *Static TableView* chỉ hợp lệ khi bạn embedded (nhúng) nó vào class *UITableViewController*. Nếu bạn add nó vào một *ViewController* bình thường thì sẽ báo lỗi ngay. Vậy làm thế nào ta có thể add *Static TableView* vào trong một *ViewController*, trong bài viết này tôi sẽ cùng các bạn tìm hiểu nó 🤔.

![](https://images.viblo.asia/811fd451-11f0-4492-8da5-eaf2142949a2.png)

# 2. Add TableView Static vào ViewController như thế nào?
Lỗi ở phía trên  có vẻ như là một hạn chế  do Apple tạo ra, có lẽ Apple muốn chúng ta sử dụng TableView Static làm nó trông gọn gàng hơn.

Vì lỗi này '**only valid when embedded in** (chỉ hợp lệ khi được nhúng vào)', vậy chúng ta có thể sử dụng chế độ  **1 container** để giải quyết vấn đề này.

Trước tiên chúng ta add một container view vào ViewController, xoá bỏ phần Static TableView mà Xcode đã báo lỗi

![](https://images.viblo.asia/dd93cfa3-2b7a-4d4e-981d-ea2832e0af6c.png)

Sau khi add thêm container thì một ViewController mới sẽ được tạo và liên kết tự động, nó được gọi là **embed view** (được định nghĩa bên trên). Vì chúng ta muốn sử dụng Static tableView nên chúng ta sẽ thay thế ViewController được tạo tự động này bằng 1 một UITableViewController có Static TableView, khi đó UITableViewController sẽ được **embed** vào container mà chúng ta đã add trước đó.


![](https://images.viblo.asia/745a9407-d531-415e-bb63-5f65d62bfd99.png)

![](https://images.viblo.asia/964d4df7-6897-4c28-b3fa-10d064818203.png)

![](https://images.viblo.asia/a40d318c-c4fb-46d3-a3f4-958cdc4677bf.png)

Và như vậy chúng ta đã nhúng được Static TableView vào ViewController trước đó rồi, giờ là công việc đưa dữ liệu cần thiết vào Static TableView thôi.

# Passing table view row tap to view controller
Chúng ta sử dụng Delegate để thông báo cho *ViewController* cha biết việc tap vào Cell ở *UITableViewController*, ở UITableViewController tạo một delegate *TableViewControllDelegate* chứa một số chức năng bạn muốn sử dụng để thông báo cho *ViewController* cha.

```
class ProfileTableViewController: UITableViewController {
 
    // this would be the parent view controller
    weak var delegate : ProfileTableViewControllerDelegate?
  
  //....
  override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
      tableView.deselectRow(at: indexPath, animated: true)

      if(indexPath.row == 1){
          // tell the delegate (view controller) to perform logoutTapped() function
          if let delegate = delegate {
              delegate.logoutTapped()
          }
      }
  }
  //...
}

protocol ProfileTableViewControllerDelegate {
  func logoutTapped()
}
```

Và trong ViewController cha, chúng ta có thể access vào UITableViewController bằng cách sử dụng thuộc tính **self.children**, **self.children** sẽ trả về một mảng các *container*/*embedded view controllers* từ ViewController cha. Trong trường hợp này chúng ta sẽ sử dụng **self.children[0]** đễ access vào UITableViewController

```
// ViewController.swift
class ViewController: UIViewController {
    
    var tableViewController : ProfileTableViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // .children is a list of container view controller of the parent view controller
        // since you only have one container view,
        // safe to grab the first one ([0]), and cast it to table VC class
        tableViewController = self.children[0] as? ProfileTableViewController
        tableViewController?.delegate = self
    }
}

extension ViewController : ProfileTableViewControllerDelegate {
    // do stuff here
    func logoutTapped() {
        print("logout tapped")
    }
}

```
Done. Như vậy chúng ta có thể thực hiện việc truyền action từ UITableViewController sang ViewController thông qua giao thức Delegate.

# 3. Kết luận
Trên đây tôi đã giới thiệu đến các bạn một các có thể add 1 Static TableView vào một ViewController sẵn có mà Apple đang không support. Hi vọng bài viết hữu ích đến các bạn, cám ơn đã đọc bài viết.

[Nguồn](https://fluffy.es/static-table-view/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=email&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B381)