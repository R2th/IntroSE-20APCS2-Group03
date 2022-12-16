## Getting Started

Hãy xem xét hai màn hình sau:

![](https://images.viblo.asia/856e7463-4759-4f44-9282-f7640d8a0733.jpeg)

Trên màn hình đầu tiên, hiển thị một danh sách các mục. Khi nhấn vào nút “Thêm mục”, màn hình thứ hai sẽ hiển thị, cho phép thêm các mục mới.
Cách tiếp cận truyền thống để thực hiện như sau:

### ItemsViewController

```
import UIKit

class ItemsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func addButtonTapped(_ sender: UIButton) {
        let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let addItemViewController = storyBoard.instantiateViewController(withIdentifier: "addItemViewController") as! AddItemViewController
        addItemViewController.delegate = self
        
        self.present(addItemViewController, animated: true, completion: nil)
    }

    var items: [String] = []
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var addButton: UIButton!
}

extension ItemsViewController: AddItemViewControllerDelegate {
    func didAddItem(_ item: String) {
        self.items.append(item)
        self.tableView.beginUpdates()
        self.tableView.insertRows(
            at: [
                .init(row: items.count - 1,
                      section: 0)
            ],
            with: .automatic
        )
        self.tableView.endUpdates()
    }
}

extension ItemsViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        items.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")!
        cell.textLabel?.text = items[indexPath.row]
        return cell
    }
}
```

Như ta đã thấy, bên trong hàm **addButtonTapped(sender:)**, chúng ta tạo **AddItemViewController** và gán **self** cho thuộc tính **delegate** của nó

Thông qua **AddItemViewControllerDelegate** để lấy thông tin của item mới thêm vào và cập nhật vào **tableView**.

### AddItemViewController

```
import UIKit

protocol AddItemViewControllerDelegate: class {
    func didAddItem(_ item: String)
}

class AddItemViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    weak var delegate: AddItemViewControllerDelegate?
    
    @IBAction func doneButtonTapped(_ sender: UIButton) {
        delegate?.didAddItem(textField.text!)
        self.dismiss(animated: true, completion: nil)
    }
    
    
    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var doneButton: UIButton!
    
}
```

Ở đây, trong hàm **doneButtonTapped(sender:)**, chúng ta sẽ chạy delegate **didAddItem(item:)** và dismiss viewController.

Làm cách nào để nó có thể đơn giản hơn? Điều gì sẽ xảy ra nếu chúng ta không cần bất cứ delegate protocol nào mà vẫn có thể theo dõi sự cập nhật thêm item mới bên trong **ItemsViewController**

**Combine’s publishers and observers** sẽ giúp chúng ta làm điều này

## Using Combine

Đầu tiên hãy xóa bỏ **AddItemViewControllerDelegate** và tạo ra **PassthroughSubject** có kiểu String:

```
import UIKit
import Combine

class AddItemViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func doneButtonTapped(_ sender: UIButton) {
        newItem.send(textField.text!)
        self.dismiss(animated: true, completion: nil)
    }
    
    let newItem = PassthroughSubject<String, Never>()
    
    @IBOutlet weak var textField: UITextField!
    @IBOutlet weak var doneButton: UIButton!
    
}
```

Có thể thấy ở đây, chúng ta đã gửi 1 giá trị mới vào **newItem** bên trong hàm **doneButtonTapped(sender:)**.

Bây giờ **AddItemViewController** đã có 1 publisher hợp lệ, chúng ta có thể subcribe nó bên trong **ItemViewController**

```
import UIKit
import Combine

class ItemsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func addButtonTapped(_ sender: UIButton) {
        let storyBoard: UIStoryboard = UIStoryboard(name: "Main", bundle: nil)
        let addItemViewController = storyBoard.instantiateViewController(withIdentifier: "addItemViewController") as! AddItemViewController
        
        addItemViewController.newItem
            .handleEvents(receiveOutput: { [unowned self] newItem in
                self.updateTableView(withItem: newItem)
            })
            .sink { _ in }
            .store(in: &subscriptions)
        
        self.present(addItemViewController, animated: true, completion: nil)
    }
    
    func updateTableView(withItem item: String) {
        self.items.append(item)
        self.tableView.beginUpdates()
        self.tableView.insertRows(
            at: [
                .init(row: self.items.count - 1,
                      section: 0)
            ],
            with: .automatic
        )
        self.tableView.endUpdates()
    }

    var subscriptions = Set<AnyCancellable>()
    var items: [String] = []
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var addButton: UIButton!
}

extension ItemsViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        items.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell")!
        cell.textLabel?.text = items[indexPath.row]
        return cell
    }
}
```

Khi một giá trị mới được gửi vào chủ thể **newItem** bên trong **AddItemViewController**, chúng ta cập nhật **tableView** bên trong toán tử **.handleEvents**. 

Lưu ý rằng để ngăn subcription bị giải phóng ngay lập tức, hãy tạo thuộc tính **subcription** để lưu trữ đăng ký của chúng ta.

Cuối cùng chúng ta đã có thể thay thế cách tiếp cận delegate truyền thống bằng Combine.

Xem thêm về Combine: [https://developer.apple.com/documentation/combine](https://developer.apple.com/documentation/combine)