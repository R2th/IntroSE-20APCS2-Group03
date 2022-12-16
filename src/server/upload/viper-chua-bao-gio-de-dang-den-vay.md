# Giới thiệu
Trong lập trình iOS thì có rất nhiều các kiến trúc (architectures) để chọn trước khi build 1 app như MVC, MVVM, MVP, View State, VIPER và nhiều nữa. Tháng này mình xin phép trình bày về 1 kiến trúc đó là VIPER và đồng thời sẽ tiến hành demo luôn với sample app là TodoList
# VIPER là gì?
Thứ nhất VIPER bao gồm: VIEW - INTERACTOR - PRESENTER - ENTITY - ROUTING
VIPER được chia ra làm năm phần và mỗi phần đều có một vai trò và chức năng riêng:
- VIEW: hiển thị giao diện dựa trên presenter, nó cũng đồng thời tiếp nhận input và truyền tới Presenter
- INTERACTOR: Nó sẽ làm việc với Presenter và Entity. Khi được thông báo thay đổi ở View từ Presenter, Interactor liên hệ để nhận thông tin từ Entity và trả lời cho Presenter và Presenter sẽ thông báo cho View để thay đổi hiện thị người dùng
- PRESENTER: Nó sẽ fetch data từ interactor và handle logic data sẽ hiển thị như thế nào ở trên view. Nó cũng chuyển tiếp từ input của người dùng từ view và fetch/update data từ interactor
- Entity: Các đối tượng model được sư dụng bởi interactor. Interactor sẽ fetch entity từ một đối tượng lưu trữ riêng biệt.
- Routing: Làm những việc về navigation logic được yêu cầu bởi presenter.
Dưới đây là mô hình quan hệ của các đối tượng trong mô hình VIPER
![](https://images.viblo.asia/b95dd037-32b7-416a-8904-0d36c49e5f38.png)
# Building ứng dụng Todo List sử dụng VIPER
Ứng dụng này sẽ có các phần như sau:
- Entity sẽ có TodoItem và TodoStore. TodoItem là class basic đại diện cho Todo item, TodoStore là DataStore gồm một mảng các TodoItem.
- TodoListScreen: sẽ hiển thị list TodoItem trong UITableView tới người dùng và cung cấp tính năng cho user như là add thêm 1 TodoItem, xoá TodoIteme và navigate tới TodoEmail Screen
- TodoDetailScreen: Hiển thị content của một TodoItem, cung cấp tính năng cho người dùng để xoá và edit TodoItem. Nó navigates back lại TodoListScreen
## Entity
### TodoItem Entity
Nó sẽ cung cấp 2 properties, title String và content String
```
import Foundation

class TodoItem {
    
    var title: String
    var content: String
    
    init(title: String, content: String) {
        self.title = title
        self.content = content
    }
}
```
### TodoStore

```
class TodoStore {
    
    private init() {}
    public static let shared = TodoStore()
    
    public private(set) var todos: [TodoItem] = [
        TodoItem(title: "Focus", content: "Decide on what you want to focus in your life"),
        TodoItem(title: "Value", content: "Decide on what values are meaningful in your life"),
        TodoItem(title: "Action", content: "Decide on what you should do to achieve empowering life")
    ]
    
    func addTodo(_ todo: TodoItem) {
        todos.append(todo)
    }
    
    func removeTodo(_ todo: TodoItem) {
        if let index = todos.firstIndex(where: { $0 === todo }) {
            todos.remove(at: index)
        }
    }
    
}
```
## TodoList Screen
### TodoList Protocols
Chúng ta sẽ sử dụng protocol cho mỗi thành phần trong TodoList Screen
```
import UIKit

protocol TodoListViewProtocol: class {
    
    var presenter: TodoListPresenterProtocol? { get set }
    
    // PRESENTER -> VIEW
    func showTodos(_ todos: [TodoItem])
    func showErrorMessage(_ message: String)
}

protocol TodoListPresenterProtocol: class {
    
    var view: TodoListViewProtocol? { get set }
    var interactor: TodoListInteractorInputProtocol? { get set }
    var router: TodoListRouterProtocol? { get set }
    
    // VIEW -> PRESENTER
    func viewWillAppear()
    func showTodoDetail(_ Todo: TodoItem)
    func addTodo(_ todo: TodoItem)
    func removeTodo(_ todo: TodoItem)
}

protocol TodoListInteractorInputProtocol: class {
    
    var presenter: TodoListInteractorOutputProtocol? { get set }
    
    // PRESENTER -> INTERACTOR
    func retrieveTodos()
    func saveTodo(_ todo: TodoItem)
    func deleteTodo(_ todo: TodoItem)
}

protocol TodoListInteractorOutputProtocol: class {
    
    // INTERACTOR -> PRESENTER
    func didAddTodo(_ todo: TodoItem)
    func didRemoveTodo(_ todo: TodoItem)
    func didRetrieveTodos(_ todos: [TodoItem])
    func onError(message: String)
}

protocol TodoListRouterProtocol: class {
    
    static func createTodoListModule() -> UIViewController
    
    // PRESENTER -> ROUTER
    func presentToDoDetailScreen(from view: TodoListViewProtocol, for todo: TodoItem)
}
```
### Implement TodoListViewProtocol
Tiếp theo chúng ta sẽ tạo một TodoListViewController subclass UITableViewController và implement TodoListViewProtocol. TodoListViewController sẽ chịu trách nhiệm hiển thị user interface được bởi presenter.
```
import UIKit

class TodoListViewController: UITableViewController {
    
    var presenter: TodoListPresenterProtocol?
    var todos: [TodoItem] = [] {
        didSet {
            tableView.reloadData()
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        presenter?.viewWillAppear()
    }

    
    private func setupView() {
        tableView.tableFooterView = UIView()
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return todos.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        let todo = todos[indexPath.row]
        cell.textLabel?.text = todo.title
        cell.detailTextLabel?.text = todo.content
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let todo = todos[indexPath.row]
        presenter?.showTodoDetail(todo)
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let todoItem = todos[indexPath.row]
            presenter?.removeTodo(todoItem)
        }
    }
    
    @IBAction func addTapped(_ sender: Any) {
        let alertController = UIAlertController(title: "Add Todo Item", message: "Enter title and content", preferredStyle: .alert)
        alertController.addTextField(configurationHandler: nil)
        alertController.addTextField(configurationHandler: nil)
        alertController.addAction(UIAlertAction(title: "Confirm", style: .default, handler: { [weak self](_) in
            let titleText = alertController.textFields![0].text ?? ""
            let contentText = alertController.textFields![1].text ?? ""
            guard !titleText.isEmpty else { return }
            let todoItem = TodoItem(title: titleText, content: contentText)
            self?.presenter?.addTodo(todoItem)
        }))
        
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        present(alertController, animated: true, completion: nil)
    }
    
}

extension TodoListViewController: TodoListViewProtocol {
    
    func showTodos(_ todos: [TodoItem]) {
        self.todos = todos
    }
    
    func showErrorMessage(_ message: String) {
        let alertController = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alertController, animated: true, completion: nil)
    }
    
}
```
### Implement TodoListPresenterProtocol
```
import UIKit

class TodoListPresenter: TodoListPresenterProtocol {
    
    weak var view: TodoListViewProtocol?
    var interactor: TodoListInteractorInputProtocol?
    var router: TodoListRouterProtocol?
    
    func showTodoDetail(_ Todo: TodoItem) {
        guard let view = view else { return }
        router?.presentToDoDetailScreen(from: view, for: Todo)
    }
    
    func addTodo(_ todo: TodoItem) {
        interactor?.saveTodo(todo)
    }
    
    func viewWillAppear() {
        interactor?.retrieveTodos()
    }
    
    func removeTodo(_ todo: TodoItem) {
        interactor?.deleteTodo(todo)
    }
    
}

extension TodoListPresenter: TodoListInteractorOutputProtocol {
    
    func didAddTodo(_ todo: TodoItem) {
        interactor?.retrieveTodos()
    }
    
    func didRetrieveTodos(_ todos: [TodoItem]) {
        view?.showTodos(todos)
    }
    
    func onError(message: String) {
        view?.showErrorMessage(message)
    }
    
    func didRemoveTodo(_ todo: TodoItem) {
        interactor?.retrieveTodos()
    }
}
```
### Implement TodoListInteractorProtocol
TodoListInteractor implements TodoListInteractorInputProtocol. Ở đây nó đóng vai trò là đầu vào(input) tới entity. Sẽ có thêm một số method như retrieveTodos, saveTodo và deleteTodo
```

import Foundation

class TodoListInteractor: TodoListInteractorInputProtocol {
    
    weak var presenter: TodoListInteractorOutputProtocol?
    var todoStore = TodoStore.shared
    var todos: [TodoItem] {
        return todoStore.todos
    }
    
    func retrieveTodos() {
        presenter?.didRetrieveTodos(todos)
    }
    
    func saveTodo(_ todo: TodoItem) {
        todoStore.addTodo(todo)
        presenter?.didAddTodo(todo)
    }
    
    func deleteTodo(_ todo: TodoItem) {
        todoStore.removeTodo(todo)
        presenter?.didRemoveTodo(todo)
    }
    
}
```
### Implement TodoListRouterProtocol
Ở đây với cái thằng Route sẽ có chức năng là đảm nhiệm cho các hành động thay đổi qua lại giữa các màn hình và đựơc yêu cầu từ presenter
```
import UIKit

class TodoListRouter: TodoListRouterProtocol {
    
    static var storyboard: UIStoryboard {
        return UIStoryboard(name: "Main", bundle: Bundle.main)
    }
    
    static func createTodoListModule() -> UIViewController {
        let navController = storyboard.instantiateViewController(withIdentifier: "TodoListNavigation") as! UINavigationController
        guard let todoListViewController = navController.topViewController as? TodoListViewController else { fatalError("Invalid View Controller") }
        let presenter: TodoListPresenterProtocol & TodoListInteractorOutputProtocol = TodoListPresenter()
        let interactor: TodoListInteractorInputProtocol = TodoListInteractor()
        let router = TodoListRouter()
        
        todoListViewController.presenter = presenter
        presenter.view = todoListViewController
        presenter.interactor = interactor
        presenter.router = router
        interactor.presenter = presenter
        
        return navController
    }

    
    func presentToDoDetailScreen(from view: TodoListViewProtocol, for todo: TodoItem) {
        
        let todoDetailVC = TodoDetailRouter.createTodoDetailRouterModule(with: todo)
        
        guard let viewVC = view as? UIViewController else {
            fatalError("Invalid View Protocol type")
        }
        
        viewVC.navigationController?.pushViewController(todoDetailVC, animated: true)
    }
    
}

``` 
## Building TodoDetailScreen
Cũng tương tự như TodoListScreen thì chúng ta cũng tạo các class như thế.
### TodoDetailModule Protocols
```
import UIKit

protocol TodoDetailViewProtocol: class {
    
    var presenter: TodoDetailPresenterProtocol? { get set }
    
    // PRESENTER -> VIEW
    func showToDo(_ todo: TodoItem)
}

protocol TodoDetailPresenterProtocol: class {
    
    var view: TodoDetailViewProtocol? { get set }
    var interactor: TodoDetailInteractorInputProtocol? { get set }
    var router: TodoDetailRouterProtocol? { get set }
    
    // VIEW -> PRESENTER
    func viewDidLoad()
    func editTodo(title: String, content: String)
    func deleteTodo()
}

protocol TodoDetailInteractorInputProtocol: class {
    
    var presenter: TodoDetailInteractorOutputProtocol? { get set }
    var todoItem: TodoItem? { get set }
    
    // PRESENTER -> INTERACTOR
    func deleteTodo()
    func editTodo(title: String, content: String)
}

protocol TodoDetailInteractorOutputProtocol: class {
    
    // INTERACTOR -> PRESENTER
    func didDeleteTodo()
    func didEditTodo(_ todo: TodoItem) 
}

protocol TodoDetailRouterProtocol: class {
    
    static func createTodoDetailRouterModule(with todo: TodoItem) -> UIViewController
    
    // PRESENTER -> ROUTER
    func navigateBackToListViewController(from view: TodoDetailViewProtocol)
    
}
```
### Implement TodoDetailViewProtocol
```
import UIKit

class TodoDetailViewController: UIViewController {
    
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var contentLabel: UILabel!
    
    var presenter: TodoDetailPresenterProtocol?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        presenter?.viewDidLoad()
    }
    
    @IBAction func deleteTapped(_ sender: Any) {
        presenter?.deleteTodo()
    }
    
    @IBAction func editTapped(_ sender: Any) {
        let alertController = UIAlertController(title: "Edit Todo Item", message: "Enter title and content", preferredStyle: .alert)
        
        alertController.addTextField { $0.text = self.titleLabel.text }
        alertController.addTextField { $0.text = self.contentLabel.text }
        alertController.addAction(UIAlertAction(title: "Confirm", style: .default, handler: { [weak self](_) in
            let titleText = alertController.textFields![0].text ?? ""
            let contentText = alertController.textFields![1].text ?? ""
            guard !titleText.isEmpty else { return }
            self?.presenter?.editTodo(title: titleText, content: contentText)
        }))
        
        alertController.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        present(alertController, animated: true, completion: nil)

    }
    
}

extension TodoDetailViewController: TodoDetailViewProtocol {
    
    func showToDo(_ todo: TodoItem) {
        titleLabel.text = todo.title
        contentLabel.text = todo.content
    }
    
}
```
### Implement TodoDetailPresenterProtocol
```
import UIKit

class TodoDetailPresenter: TodoDetailPresenterProtocol {

    weak var view: TodoDetailViewProtocol?
    var router: TodoDetailRouterProtocol?
    var interactor: TodoDetailInteractorInputProtocol?
    
    
    func viewDidLoad() {
        if let todoItem = interactor?.todoItem {
            view?.showToDo(todoItem)
        }
    }
    
    func editTodo(title: String, content: String) {
        interactor?.editTodo(title: title, content: content)
    }
    
    func deleteTodo() {
        interactor?.deleteTodo()
    }
    
}

extension TodoDetailPresenter: TodoDetailInteractorOutputProtocol {
    
    func didDeleteTodo() {
        if let view = view {
            router?.navigateBackToListViewController(from: view)
        }
    }
    
    func didEditTodo(_ todo: TodoItem) {
        view?.showToDo(todo)
    }
    
}
```
### Implement TodoDetailInteractorProtocol
```
import Foundation

class TodoDetailInteractor: TodoDetailInteractorInputProtocol {
    
    weak var presenter: TodoDetailInteractorOutputProtocol?
    var todoStore = TodoStore.shared
    var todoItem: TodoItem?
    
    func deleteTodo() {
        guard let todoItem = todoItem else { return }
        todoStore.removeTodo(todoItem)
        presenter?.didDeleteTodo()
    }
    
    func editTodo(title: String, content: String) {
        guard let todoItem = todoItem else { return }
        todoItem.title = title
        todoItem.content = content
        presenter?.didEditTodo(todoItem)
    }
    
}
```
### Implement TodoDetailRouterProtocol
```
import UIKit

class TodoDetailRouter: TodoDetailRouterProtocol {
    
    func navigateBackToListViewController(from view: TodoDetailViewProtocol) {
        guard let viewVC = view as? UIViewController else {
            fatalError("Invalid view protocol type")
        }
        viewVC.navigationController?.popViewController(animated: true)
    }
    
    static func createTodoDetailRouterModule(with todo: TodoItem) -> UIViewController {
        
        guard let todoDetailVC = storyboard.instantiateViewController(withIdentifier: "TodoDetailViewController") as? TodoDetailViewController else {
            fatalError("Invalid view controller type")
        }
        
        let presenter: TodoDetailPresenter & TodoDetailInteractorOutputProtocol = TodoDetailPresenter()
        todoDetailVC.presenter = presenter
        presenter.view = todoDetailVC
        let interactor: TodoDetailInteractorInputProtocol = TodoDetailInteractor()
        interactor.todoItem = todo
        interactor.presenter = presenter
        presenter.interactor = interactor
        let router: TodoDetailRouterProtocol = TodoDetailRouter()
        presenter.router = router
        
        return todoDetailVC
    }
    
    static var storyboard: UIStoryboard {
        return UIStoryboard(name: "Main", bundle: Bundle.main)
    }
    
}
```
Và cuối cùng ta setup trong AppDelegate khá đơn giản và điều hướng, ngay sau khi applicationDidFinishLaunching ta sẽ invoke tới TodoListViewController
```
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        let todoListView = TodoListRouter.createTodoListModule()
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = todoListView
        window?.makeKeyAndVisible()
        
        return true
    }

}
```

# Tổng Kết
Trước tiên mình cảm ơn các bạn đã theo dõi tới đây. Sau khi trải nghiệm mô hình này thì mình có rút ra ưu nhược điểm của mô hình này như sau: 
* Ưu điểm: Phù hợp dự án với quy mô lớn, dễ dàng phát triển các chức năng mới cũng như bảo trì sau này. Dễ dàng viết rõ và đầy đủ testcase.
* Nhược điểm: Có quá nhiều đoạn code soạn sẵn chúng ta sẽ cần phải viết cho mỗi protocol

# Tham khảo 
1. https://medium.com/swift2go/building-todo-list-ios-app-with-viper-architecture-bc954ea371bb
2. https://developer.apple.com/