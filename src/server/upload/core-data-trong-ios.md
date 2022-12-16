Xin chào các bạn, bài viết hôm nay mình sẽ viết về Core data trong iOS, mình viết những cái cơ bản nhất mà những bạn mới bắt đầu học iOS cũng nắm được cơ bản. Chúng ta nghĩ đến sử dụng core data khi mà muốn lưu dữ liệu vào local máy, mà không cần phải call API. Mình bắt đầu vào demo luôn nhé.

Đầu tiên, tạo 1 project mới đặt tên là CoreDataDemo, core data được tích hợp sẵn trong iOS nên khi bạn tạo project mới có option có sử dụng Core data hay không, mình chọn có nhé:
![](https://images.viblo.asia/2d193c9c-9e0a-4e81-a6a1-5630c036bc3d.png)

Sau khi tạo project xong thì XCode tạo sẵn cho chúng ta file CoreDataDemo.xcdatamodelId, là nơi mà chúng ta có thể tạo các Entities và thêm Attribute vào cho chúng. Ở dưới cùng bên trái chúng ta ấn chọn Add Entity và đặt tên cho nó. Sau đó chúng ta click vào Entity vừa được tạo, và chọn Add Atribute.
Và ở AppDelegate có sẵn 2 thành phần là biến persistentContainer và hàm saveContext() hỗ trợ việc lưu và lấy các thông tin từ core data, ở mỗi hàm đều có comment giải thích chi tiết.

Bây giờ mình mở file CoreDataDemo.xcdatamodelId lên và tạo Entity có tên là User, và có 2 attribute là name và age như sau:
![](https://images.viblo.asia/4c295dd1-3719-4e3d-b389-c3d49fc97ea8.png)

Khi sử dụng core data thì chúng ta có thể xem được Entity tường minh dưới dạng table, và mối quan hệ giữa các Entity nữa:
![](https://images.viblo.asia/b52cb618-c91a-48a2-b035-22df7609f24b.png)

Bây giờ mình tạo 1 tableview để hiển thị list user chúng ta lưu ở core data, và 1 button Add để thêm user vào trong core data:
![](https://images.viblo.asia/ba3e1d42-0f08-442d-9828-120eaf6674aa.png)

Tạo mảng data để show lên tableview:
```
var users: [NSManagedObject] = []
```

NSManagedObject đại diện cho một object được lưu trong core data, bạn cần phải sử dụng nó để tạo, sửa, lưu và xoá từ core data của mình. Tiếp theo, mình thêm các hàm data source của table view như sau:
```
extension ViewController: UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return users.count
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let user = users[indexPath.row]
    guard let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as? TableViewCell else { return UITableViewCell()}
    let name = (user.value(forKey: "name") as? String) ?? ""
    let age = (user.value(forKey: "age") as? Int) ?? 0
    let text = "\(name)\n\(age)"
    cell.userInfoLabel?.text = text
    return cell
  }
}
```

Tiếp theo mình viết code để add user vào core data như sau:
```
@IBAction func addUser(_ sender: Any) {
        guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
        
        // 1.
        let managedContext = appDelegate.persistentContainer.viewContext
        
        // 2.
        let entity = NSEntityDescription.entity(forEntityName: "User", in: managedContext)!
        let user = NSManagedObject(entity: entity, insertInto: managedContext)
        
        // 3.
        age += 1
        user.setValue("test name", forKey: "name")
        user.setValue(age, forKey: "age")
        
        // 4
        do {
          try managedContext.save()
            users.append(user)
            tableview.reloadData()
        } catch let error as NSError {
          print("Could not save. \(error), \(error.userInfo)")
        }
    }
```

Mình giải thích nhé:
1. Trước khi bạn có thể lưu hoặc lấy bất kì thứ gì từ CoreData, bạn cần phải lấy ra NSManagedObjectContext, cái này XCode đã tạo sẵn ở AppDelegate lúc mình tạo app rồi đó. 
2. Tạo một managed object mới và insert nó vào managed object context. NSManagedObject đại diện cho entity, một NSEntityDescription là một phần liên kết với định nghĩa entity từ Data Model với một instance của NSManagedObject khi runtime.
3. Set các attribute cho data model.
4. Commit những thay đổi của mình với user và save vào bộ nhớ bằng cách gọi phương thức save. Chú ý rằng save có throw error cho lên phải sử dụng try catch. Cuối cùng thì thêm một object vào mảng users để hiện thị lên tableview.

Bây giờ, khi run ứng dụng lên thì bạn đã có thể add được data user vào core data rồi:
![](https://images.viblo.asia/a884e175-37db-4008-9d07-149a015eaab0.gif)

Khi bạn run lại ứng dụng, cần phải show lại list user đã lưu vừa nãy lên tabview, chúng ta sẽ viết đoạn code để get data ra như sau:
```
override func viewWillAppear(_ animated: Bool) {
      super.viewWillAppear(animated)
      
      //1
      guard let appDelegate = UIApplication.shared.delegate as? AppDelegate else { return }
      let managedContext = appDelegate.persistentContainer.viewContext
      
      //2
      let fetchRequest = NSFetchRequest<NSManagedObject>(entityName: "User")
      
      //3
      do {
        users = try managedContext.fetch(fetchRequest)
        tableview.reloadData()
      } catch let error as NSError {
        print("Could not fetch. \(error), \(error.userInfo)")
      }
    }
```
Mình giải thích nhé:
1. Trước khi làm mọi thứ cần phải gọi đối tượng NSManagedObjectContext như đã nói ở trên.
2. NSFetchRequest là một class đảm nhiệm việc fetching từ CoreData. Fetch request rất hữu dụng và linh hoạt. Bạn có thể sử dụng fetch request để fetch tập hợp các object ( như kiểu bạn hãy lấy tất cả các employee trong company...) Không chỉ lấy tất cả mà chúng ta có thể dựa vào NSEntityDescription để lọc nhiều điều kiện khác nhau cho việc trả về kết quả.
3. Bạn xử lý fetch request của mình bằng fetch() để trả về mảng đối tượng theo điều kiện của request, reload lại tableview.

Run lại app bạn sẽ thấy data được show lên như sau:
![](https://images.viblo.asia/eaa1299a-5859-4bc3-81aa-bf74ef04a6dd.png)

Bài viết của mình tới đây là hết, cảm ơn các bạn đã đọc bài viết của mình ^^.
Link tài liệu: https://www.raywenderlich.com/7569-getting-started-with-core-data-tutorial