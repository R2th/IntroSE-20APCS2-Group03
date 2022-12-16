## Introduce
###### Khi bắt đầu tiếp cận với lập trình iOS có lẽ chúng ta đều tiếp xúc với mô hình **MVC** (Model - View - Controller) đầu tiên , một phần vì nó giúp chúng ta học nhanh hơn một phần vì cách viết code mà framework **Cocoa** của **Apple** quy định. Theo thời gian **MVC của Apple** dần lộ ra những khuyết điểm:
* **ViewController**  dễ dàng trở thành **Massive View Controller** do đảm nhận quá nhiều tác vụ như  business logic , view , animation ....
* **View** và **Controller** có mối liên hệ quá chặt chẽ dẫn đến khó khăn trong việc bảo trì và mở rộng.
* Việc tạo mock cho **Unit Test** rất khó khăn vì **Controller** phải thao tác với cả **View** và **Model**.
###### **MVVM** và **VIPER** được sử dụng để giải quyết các vấn đề trên . Tuy nhiên có thể thấy MVVM và VIPER đều là **multidirectional data flow** tức là dữ liệu sẽ được lưu trữ phân tán tại nhiều nơi trong ứng dụng, điều này thỉnh thoáng sẽ gây khó khăn trong việc debug củng như quản lý các tài nguyên sử dụng chung. Hôm nay mình xin giới thiệu về Redux một kiến trúc luồng dữ liệu theo một hướng - **unidirectional Data Flow**.
## Redux
![](https://images.viblo.asia/9848348f-9fa5-444e-9911-7d1137c35889.gif)

 ###### **Redux** là một kiến trúc **unidirectional Data Flow** được xây dựng dựa trên nền tảng tảng tư tưởng của kiến trúc [Flux](https://facebook.github.io/flux/) do Facebook giới thiệu mục tiêu là giúp tạo ra  một lớp quản lý **trạng thái**(State) của ứng dụng.  3 nguyên lý của **Redux** là:
* **Single source of truth** : State của toàn bộ ứng dụng được lưu trong 1 object duy nhất là **Store**.
* **State is read-only** : Để thay đổi state cách duy nhât là thông qua các **Action**( là một object mô tả những gì chúng ta muốn thực hiện ).
* **Changes are made with pure functions** : Để thay đổi trạng thái của ứng dụng bởi mỗi một action, chúng ta sử dung **Reducer**. Reducer là một pure function, việc sử dụng [pure function](https://en.wikipedia.org/wiki/Pure_function)  để đảm bảo tính **imutable** của dữ liệu.
#### Cách hoạt động của Redux :
![alt](https://image.ibb.co/fttrBT/1_Edi_FUfb_TNmk_Ix_FDNqokqg.png)
###### Cách hoạt đông của Redux như sau :
1. Khi có 1 event được dispatch từ **View**, sẽ tạo ra một **Action** mô tả về event đó.
2. **Action** sẽ được gửi đến **Reducer**  xử lý.
3. **Reducer** sẽ nhận **Action** và dưạ vào các mô tả của **Action** để tạo ra một **State** mới và lưu tại **Store**.
4. Các **ViewController**  đã được subcriber đến Store sẽ nhận được sự thay đổi và tiến hành update UI.
## Redux In Swift
###### Để dễ hiểu hơn chúng ta sẽ làm một demo nhỏ về Redux bằng Swift. Ứng dụng chỉ có 2 chức năng đơn giản là thêm và xóa các công việc. Đầu tiên để làm việc với Redux chúng ta phải cài đặt thư viện **ReSwift** .
> pod ''ReSwift"
###### Các bạn có thể xem demo và code tại đây: [Demo](https://github.com/pdn1905/ReduxTodo-Swift)

###### Trước tiên ta tạo một Model sau đó tạo 3 file **Action.swift, Reducer.swift, AppState.swift**  :
**Task.swift**
```swift
struct Task {
  var name: String
}
```
**AppState.swift**
```swift
import ReSwift

struct AppState: StateType {
  var tasks: [Task] = []

  init(tasks: [Task]) {
    self.tasks = tasks
  }
}
```
AppState chứa trạng thái và dữ liệu của ứng dụng. Để đảm bảo nguyên lý 2
 (State is read only)  thì State nên là một struct.

**Action.swift**
```swift
import ReSwift

struct AddTask: Action {
  var name: String
}

struct DeleteTask: Action {
  var index: Int
}
```
###### Định nghĩa 2 action của ứng dụng là AddTask và DeleteTask , với action AddTask thì ta truyền vào một tham số (được gọi là payload) name để mô tả về task cần thêm. Đối với  action DeleteTask thì truyền vào index của công viêc cần xóa trong list công việc.
**Reducer.swift**
```swift
import ReSwift

func appReducers(action: Action, state: AppState?) -> AppState {

  var state = state ?? AppState(tasks: []) // tạo ra một state mới từ state cũ chứ không thay đổi state cũ

  switch action {

  case let addTask as AddTask:
    let task = Task(name: addTask.name)
    state.tasks.insert(task, at: 0)

  case let deleteTask as DeleteTask:
    state.tasks.remove(at: deleteTask.index)

  default:
    return state

  }

  return state
}
```
###### Reducer sẽ dựa vào Action để trả về một State mới từ State hiện tại. Như đoạn code trên nếu là action AddTask thì sẽ insert một task mới với mô tả name được truyền vào, còn nếu là action DeleteTask thì sẽ delete đi task với index được mô tả trong action.

**AppDelegate.swift** ta khai báo 1 global **Store** của ứng dụng:
```swift
import ReSwift

let store = Store<AppState>(reducer: appReducers, state: AppState(tasks: []))
```
###### Nhiệm vụ của store  là lưu trữ state của ứng dụng và phản hồi  state mới tới các View  **subscribe** đến nó. Một ứng dụng chỉ có duy nhất một Store (nguyên lý 1 single source of truth) chứa tất các state cần thiết cho ứng dụng.

**ViewController.swift**
```swift
import UIKit
import ReSwift

class ViewController: UIViewController, StoreSubscriber {

  @IBOutlet weak var tableView: UITableView! {
    didSet {
      tableView.delegate = self
      tableView.dataSource = self
      tableView.register(type: TodoCell.self)
      tableView.estimatedRowHeight = 200
      tableView.rowHeight = UITableViewAutomaticDimension
    }
  }

  var tasks: [Task] = [] {
    didSet {
      self.tableView.reloadData()
    }
  }

  override func viewDidLoad() {
    super.viewDidLoad()
    store.subscribe(self) // subscribe đến store
  }

  @IBAction func onClickAdd(_ sender: Any) {
    showAddDialog() { (input:String?) in
      guard let taskName = input else {
        return
      }
      let addTaskAction = AddTask(name: taskName)
      store.dispatch(addTaskAction)
    }

  }

  func newState(state: AppState) {
    self.tasks = store.state.tasks // cập nhật tasks khi có sự thay đổi từ store
  }
}

extension ViewController: UITableViewDelegate, UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return tasks.count
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    guard let cell = tableView.dequeueReusableCell(type: TodoCell.self, indexPath: indexPath) else { fatalError() }
    cell.taskNameLabel.text = self.tasks[indexPath.item].name
    cell.deleteActionHandler = {
      let deleteAction = DeleteTask(index: indexPath.item)
      store.dispatch(deleteAction)
    }
    return cell
  }

  func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return UITableViewAutomaticDimension
  }
}
```
###### Tại viewDidLoad ta tiến hành subscribe đến Store để nhận được những thay đổi từ Store. Ở
@IBAction onClickAdd khi ta **dispatch** một action với payload là name thì action đó sẽ được gửi đến **Reducer**, reducer sẽ tiến hành insert vào task list hiện tại trong state 1 task mới với payload name từ action. Tương tự với action DeleteTask với payload là index của item cần xóa.
## Unit Tests
 ###### Việc viết **Unit Tests** ở Reducer vì không đụng chạm gì đến View nên trở nên khá dễ dàng.
```
import XCTest
import ReSwift

@testable import ReduxTodo

class ReduxTodoTests: XCTestCase {
  
  func testAddTask() {
    let store = Store<AppState>(reducer: appReducers,state: AppState(tasks: [])) // Khởi tạo store với empty tasks
    
    store.dispatch(AddTask(name: "Work"))
    
    store.dispatch(AddTask(name: "Eat"))
    
    XCTAssertEqual(store.state.tasks.count, 2)
  }
  
  func testDeleteTask() {
    let store = Store<AppState>(reducer: appReducers,state: AppState(tasks: [Task(name: "Sing")])) // Khởi tạo store với 1 task
    
    store.dispatch(DeleteTask(index: 0))
    
    XCTAssertEqual(store.state.tasks.isEmpty, true)
    
  }
  
}
```
## Wrap Up
###### Lợi ích của việc sử dụng Redux:
* Unidirectional data flow: dễ dàng cho việc debug và quản lý state change vì dữ liệu được xử lý theo 1 luồng xác định.
* Tách biệt các thành phần, vai trò trong ứng dụng.
* Khả năng mở rộng.
* Viết Unit Tests dễ dàng.
###### Trên đây là giới thiệu cơ bản nhất của mình về Redux trong iOS, để có thể áp dụng được Redux vào trong các project thì bạn cần phải tìm hiểu thêm một thành phần quan trọng nửa là **Middleware**.........