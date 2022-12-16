Đôi khi chúng ta cần phải ghi lại trạng thái bên trong của một đối tượng. Điều này là bắt buộc khi thực hiện tại các điểm kiểm tra và cung cấp cơ chế hoàn tác cho phép người dùng có thể khôi phục từ các lỗi. Chúng ta phải lưu thông tin trạng thái ở đâu đó để có thể khôi phục các đối tượng về trạng thái trước đó của chúng. Nhưng các đối tượng thường đóng gói một phần hoặc tất cả trạng thái của chúng, khiến nó không thể truy cập được vào các đối tượng khác và không thể lưu ở bên ngoài. Public các trạng thái này sẽ vi phạm nguyên tắc đóng gói, có thể làm giảm độ tin cậy và khả năng mở rộng của ứng dụng. Trong những trường hợp như vậy chúng ta có thể nghĩ đến Memento Pattern, nó sẽ giúp chúng ta giải quyết vấn đề này.
![](https://images.viblo.asia/d78b5114-b9d3-4a3f-83cc-8a6b76e2ee5b.png)
### What is Memento Pattern ?

Memento là một trong những Pattern thuộc nhóm hành vi (Behavior Pattern). Memento là mẫu thiết kế có thể lưu lại trạng thái của một đối tượng để khôi phục lại sau này mà không vi phạm nguyên tắc đóng gói.

Dữ liệu trạng thái đã lưu trong đối tượng memento không thể truy cập bên ngoài đối tượng được lưu và khôi phục. Điều này bảo vệ tính toàn vẹn của dữ liệu trạng thái đã lưu.

Hoàn tác (Undo) hoặc ctrl + z là một trong những thao tác được sử dụng nhiều nhất trong trình soạn thảo văn bản (editor). Mẫu thiết kế Memento được sử dụng để thực hiện thao tác Undo. Điều này được thực hiện bằng cách lưu trạng thái hiện tại của đối tượng mỗi khi nó thay đổi trạng thái, từ đó chúng ta có thể khôi phục nó trong mọi trường hợp có lỗi.

### How to setup Memento Pattern?
![](https://images.viblo.asia/b2f9229f-ab97-42e7-8448-01b902519665.png)
Các thành phần tham gia mẫu Memento:

Originator : đại diện cho đối tượng mà chúng ta muốn lưu. Nó sử dụng memento để lưu và khôi phục trạng thái bên trong của nó.
Caretaker : Nó không bao giờ thực hiện các thao tác trên nội dung của memento và thậm chí nó không kiểm tra nội dung. Nó giữ đối tượng memento và chịu trách nhiệm bảo vệ an toàn cho các đối tượng. Để khôi phục trạng thái trước đó, nó trả về đối tượng memento cho Originator.
Memento : đại diện cho một đối tượng để lưu trữ trạng thái của Originator. Nó bảo vệ chống lại sự truy cập của các đối tượng khác ngoài Originator.
Lớp Memento cung cấp 2 interfaces: 1 interface cho Caretaker và 1 cho Originator. Interface Caretaker không được cho phép bất kỳ hoạt động hoặc bất kỳ quyền truy cập vào trạng thái nội bộ được lưu trữ bởi memento và do đó đảm bảo nguyên tắc đóng gói. Interface Originator cho phép nó truy cập bất kỳ biến trạng thái nào cần thiết để có thể khôi phục trạng thái trước đó.
Lớp Memento thường là một lớp bên trong của Originator. Vì vậy, originator có quyền truy cập vào các trường của memento, nhưng các lớp bên ngoài không có quyền truy cập vào các trường này.
### Benefit of Memento Pattern

- Lợi ích:

Bảo đảm nguyên tắc đóng gói: sử dụng trực tiếp trạng thái của đối tượng có thể làm lộ thông tin chi tiết bên trong đối tượng và vi phạm nguyên tắc đóng gói.
Đơn giản code của Originator bằng cách để Memento lưu giữ trạng thái của Originator và Caretaker quản lý lịch sử thay đổi của Originator.

- Một số vấn đề cần xem xét khi sử dụng Memento Pattern:

Khi có một số lượng lớn Memento được tạo ra có thể gặp vấn đề về bộ nhớ, performance của ứng dụng.
Khó đảm bảo trạng thái bên trong của Memento không bị thay đổi.

### How to USE Memento Patter

- Các ứng dụng cần chức năng cần Undo/ Redo: lưu trạng thái của một đối tượng bên ngoài và có thể restore/ rollback sau này.
- Thích hợp với các ứng dụng cần quản lý transaction.

### iOS Case Study

ở đây chúng ta sẽ thử tìm hiểu và thay thế các method theo Memento Pattern trong IOS, các phương thức persist() và recover() được thêm vào Memento protocol nó cung cấp cho developer nơi để lưu trữ và huỷ lưu trữ các thuộc tính.
Mỗi tên thuộc tính tương ứng với một khóa phần tử từ điển và mỗi giá trị thuộc tính tương ứng với giá trị phần tử từ điển phù hợp với khóa.
  ```swift 
  import Foundation
 
protocol Memento : class {
    
    var stateName: String { get }
    var state: Dictionary<String, String> { get set }
    
    func save()
    
    func restore()
    
    func persist()
    
    func recover()
    
    func show()
    
}
 
extension Memento {
    
    func save() {
        UserDefaults.standard.set(state, forKey: stateName)
    }
    
    func restore() {
        
        if let dictionary = UserDefaults.standard.object(forKey: stateName) as! Dictionary<String, String>? {
            state = dictionary
        }
        else {
            state.removeAll()
        }
        
    } 
    
    func show() {
        
        var line = ""
        
        if state.count > 0 {
            
            for (key, value) in state {
                line += key + ": " + value + "\n"
            }
            
            print(line)
            
        }
        
        else {
            print("Empty entity.\n")
        }
            
    }
    
} 
 
class User: Memento {

    let stateName: String
    var state: Dictionary<String, String>
    
    var firstName: String
    var lastName: String
    var age: String
    
    init(firstName: String, lastName: String, age: String, stateName: String) {
        
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        
        self.stateName = stateName
        self.state = Dictionary<String, String>()
        
        persist()
        
    } 
    
    init(stateName: String) {
        
        self.stateName = stateName
        self.state = Dictionary<String, String>()
        
        self.firstName = ""
        self.lastName = ""
        self.age = ""
        
        recover()
        
    } 
 
    func persist() {
        
        state["firstName"] = firstName
        state["lastName"] = lastName
        state["age"] = age
        
        save() 
        
    }
    func recover() {
        
        restore() 
            
        if state.count > 0 {
            firstName = state["firstName"]!
            lastName = state["lastName"]!
            age = state["age"]!
        }
        else {
            self.firstName = ""
            self.lastName = ""
            self.age = ""
        }
        
    } 
    
}     
    
   ```
   
   
   
Code implementing trong class ViewController.swift:

```swift 
import UIKit
 
class ViewController: UIViewController {
    
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var ageTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
     
    }

    @IBAction func saveUserTapped(_ sender: Any) {
        
        if firstNameTextField.text != "" &&
            lastNameTextField.text != "" &&
            ageTextField.text != "" {
            
            let user = User(firstName: firstNameTextField.text!,
                            lastName: lastNameTextField.text!,
                            age: ageTextField.text!,
                            stateName: "userKey")
            user.show()
            
        }
        
    } 
    @IBAction func restoreUserTapped(_ sender: Any) {
        
        let user = User(stateName: "userKey")
        firstNameTextField.text = user.firstName
        lastNameTextField.text = user.lastName
        ageTextField.text = user.age
        user.show()
 
    }
    
} 
  ```