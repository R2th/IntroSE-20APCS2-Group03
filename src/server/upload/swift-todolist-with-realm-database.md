Mình sẽ làm một ứng dụng nhỏ có tên gọi là ToDoList, hiển thị danh sách công việc ( chưa hoàn thành, đã hoàn thành).

## Bước 1: Tạo project và inport Thư viện Realm.
- Tạo project ToDoList
![](https://images.viblo.asia/453bcee2-e0d7-4d04-a1e5-4cd4c1204260.png)
- Add thư viện Realm(mình dùng cocoapods cho nó phổ thông)
 mở terminal cd vào project
```
pod init
```
```
pod install
```

mở Podfile và thêm lệnh sau
```
pod 'RealmSwift'
```
sau đó
```
pod install
```

## Bước 2: Tạo model.
```
class ToDoItem: Object {
    dynamic var name = ""
    dynamic var finished = false
    
    convenience init(name: String) {
        self.init()
        self.name = name
    }
}
```
Model ToDoItem có 2 trường dữ liệu , **name** là tên của công việc, và **finished** để xác định công việc đó đã hoàn thành hay chưa.


## Bước 3: Tạo ViewController.

class **RealmToDoViewController** hiển thị danh sách các task đã hoàn thành và chưa hoàn thành, ở đây có thể xóa, chuyển  đổi qua lại giữa task đã hoàn thành và chưa hoàn thành.
```
class RealmToDoViewController: UIViewController {
    
    var tableView = UITableView()
    var items = [Results<ToDoItem>]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        tableView.frame = self.view.safeAreaLayoutGuide.layoutFrame
        self.view.addSubview(tableView)
        setupNavigationBar()
        // data append
        var todos: Results<ToDoItem> {
            get {
                let predicate = NSPredicate(format: "finished == false", argumentArray: nil)
                let realm = try! Realm()
                return realm.objects(ToDoItem.self).filter(predicate)
            }
        }
        
        var finished: Results<ToDoItem> {
            get {
                let predicate = NSPredicate(format: "finished == true", argumentArray: nil)
                let realm = try! Realm()
                return realm.objects(ToDoItem.self).filter(predicate)
            }
        }
        items.append(todos)
        items.append(finished)
        
    }
    
    fileprivate func setupNavigationBar() {
        navigationItem.title = "ToDoList"
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .add,
                                                            target: self,
                                                            action: #selector(addButtonAction))
    }
    
    @objc fileprivate func addButtonAction() {
        let AddToDoVC = AddToDoViewController()
        AddToDoVC.doneActionCallBack = {[weak self] text in
            guard let text = text else {
                return
            }
            
            if text.utf16.count > 0 {
                let newToDoItem = ToDoItem()
                newToDoItem.name = text
                
                let realm = try! Realm()
                try! realm.write {
                    realm.add(newToDoItem)
                }
                self?.tableView.reloadData()
            }
        }
        let nav = UINavigationController(rootViewController: AddToDoVC)
        present(nav, animated: true, completion: nil)
        
    }
}

extension RealmToDoViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        var todoItem: ToDoItem
        todoItem = items[indexPath.section][indexPath.row]
        let realm = try! Realm()
        try! realm.write {
            todoItem.finished = !todoItem.finished
        }
        
        tableView.reloadData()
    }
    
    func tableView(_ tableView: UITableView, editActionsForRowAt indexPath: IndexPath) -> [UITableViewRowAction]? {
        
        //Add action to delete our item
        let delete = UITableViewRowAction(style: .destructive, title: "Delete") { (action, index) in
            let realm = try! Realm()
            try! realm.write {
                realm.delete(self.items[indexPath.section][index.row])
            }
            tableView.deleteRows(at: [index], with: .fade)
        }
        delete.backgroundColor = UIColor.red
        
        let finish = UITableViewRowAction(style: .normal, title: "Change") { (action, index) in
            var todoItem: ToDoItem
            todoItem = self.items[indexPath.section][indexPath.row]
            let realm = try! Realm()
            try! realm.write {
                todoItem.finished = !todoItem.finished
            }
            self.tableView.reloadData()
        }
        
        finish.backgroundColor = UIColor(red: 24/255, green: 116/255, blue: 205/255, alpha: 1)
        
        return [finish, delete]
    }
}

extension RealmToDoViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return items.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items[section].count
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch section {
        case 0:
            if items[section].isEmpty {
                return nil
            }
            return "To-Do"
        default:
            if items[section].isEmpty {
                return nil
            }
            return "Finished"
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        switch indexPath.section {
        case 0:
            let todoItem = items[indexPath.section][indexPath.row]
            let attributedText = NSMutableAttributedString(string: todoItem.name)
            attributedText.addAttribute(NSAttributedStringKey.strikethroughStyle, value: 0, range: NSMakeRange(0, attributedText.length))
            cell.textLabel?.attributedText = attributedText
            
        default:
            let todoItem = items[indexPath.section][indexPath.row]
            let attributedText = NSMutableAttributedString(string: todoItem.name)
            attributedText.addAttribute(NSAttributedStringKey.strikethroughStyle, value: 1, range: NSMakeRange(0, attributedText.length))
            cell.textLabel?.attributedText = attributedText
        }
        return cell
    }
}
```

class **AddToDoViewController** add Task mới vào danh sách các task.
```
class AddToDoViewController: UIViewController {

    var textField: UITextField?
    var doneActionCallBack: ((String?) -> Void)?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor.white
        setupTextField()
        setupNavigationBar()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        textField?.becomeFirstResponder()
    }
    
    func setupTextField() {
        textField = UITextField(frame: .zero)
        textField?.placeholder = "to do something!"
        textField?.delegate = self
        view.addSubview(textField!)
    }
    
    func setupNavigationBar() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .done,
                                                            target: self,
                                                            action: #selector(AddToDoViewController.doneAction))
        
        navigationItem.leftBarButtonItem = UIBarButtonItem(barButtonSystemItem: .cancel,
                                                            target: self,
                                                            action: #selector(AddToDoViewController.cancelAction))
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        textField?.contentVerticalAlignment = .center
        textField?.frame = CGRect(x: 12, y: 150, width: self.view.frame.size.width - 24, height: 40)
    }
    
    func doneAction() {
        doneActionCallBack?(textField?.text)
        dismiss(animated: true, completion: nil)
    }
    
    func cancelAction() {
        dismiss(animated: true, completion: nil)
    }
}

extension AddToDoViewController: UITextFieldDelegate {
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        doneAction()
        textField.resignFirstResponder()
        return true
    }

}
```

![](https://images.viblo.asia/543dd81a-8b65-4c64-bc0d-ef18d89b0942.gif)


chi tiết tham khảo tại(swift 4).[Link](https://github.com/NguyenPhongEngineer/ToDoList)