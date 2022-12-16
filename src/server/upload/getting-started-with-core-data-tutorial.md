Xin chào các bạn,
Bài viết hôm nay mình sẽ viết về CoreData trong iOS. CoreData hiểu đơn giản là một framework cung cấp các tính năng lưu trữ dữ liệu trong iOS. Mình sẽ đi từng bước xây dựng ứng dụng đơn giản để các bạn hình dung ra nó nhé.
Trong bài viết này mình sẽ đi theo các bước đơn giản nhất sau:
*  Tạo Model data sử dụng Xcode's model editor
* Tạo một record mới bằng CoreData
*  Lấy record đã tạo từ Core Data
*  Hiển thị dữ liệu đã lấy được lên tabbleview

# **Bắt đầu nào!!!**

## Tạo ứng dụng mới
Tạo một ứng dụng iOS  như mình đặt tên là HitList, nhớ là phải tick vào ô Use CoreData nhé
Tick vào đó để Xcode sẽ soạn sẵn cho mình 1 cái gọi là `NSPersistentContainer`  trong **AppDelegate.swift.**
`NSPersistentContainer` bao gồm  các đối tượng hỗ trợ việc  lưu và lấy các thông tin từ CoreData. Ngoài việc chứa và quản lý toàn bộ trạng thái dữ liệu, đối tượng này còn dùng để đại diện cho Data Model.
Sau khi project được tạo xong. Chúng ta tiến hành tạo TableView đơn giản.
Add một button Add để sử dụng cho việc thêm dữ liệu
Trong file ViewController.swift tạo 1 mảng String có tên là names như sau:
```
var names: [String] = []
```
Mảng này dùng để chứa các dữ liệu được hiển thị bởi tableview
Chúng ta xây dựng chức năng khi nhấn vào button Add thì sẽ thêm một đối tượng vào mảng names trên và hiển thị lên tableview. Vì chức năng này khá đơn giản nên các bạn tham khảo code cũng được nhé.
Sau khi làm xong ứng dụng sẽ kiểu như thế này:

Nhấn vào button Add trên navigation Bar sẽ show Dialog cho mình nhập như sau:
![](https://images.viblo.asia/aee5ae41-fd4c-4b7d-ad90-95054416e159.png)

Nhập name vào ấn Save sẽ được kết quả như sau:

![](https://images.viblo.asia/8eef0fc7-0904-4ba0-9de0-1bc8dd4f0660.png)

Tuy nhiên, chúng ta tắt hẳn app đi và mở lại, chuyện gì sẽ xảy ra ạ? Trên TableView sẽ không còn nhưng name ta vừa tạo nữa.
Đây là lý do vì sao chúng ta cần dùng CoreData =))

## Tạo Data Model
Xcode đã tự động tạo cho mình 1 file  Data Model có tên là HitList.xcdatamodelId.
![](https://images.viblo.asia/c5c6428c-dded-4985-af5f-847071d5dc73.png)
Mở Hitlist.xcdatamodel lên bạn sẽ thấy Data Model editor.

![](https://images.viblo.asia/b5ac8679-a358-441b-8a92-89b997286791.png)

Chọn Add Entity ở phía dưới bên trái. Double-click vào new entity và đặt tên là Person như sau:

![](https://images.viblo.asia/0c3e988e-7e48-46fc-9d1b-68ffc3d4953f.png)

Có một số khái niệm chúng ta cần phải hiểu như sau:

*  **entity**: Được định nghĩa như 1 class trong CoreData. Ví dụ đơn giản giống như `Emplyee` hay `Company`. Trong cơ sở dữ liệu quan hệ, một entity tưởng ứng với 1 bảng.
*  **attribute**:  Là một phần thông tin được đính kèm theo 1 entity nhất đinh. Ví dụ như một `Employee` có các thuộc tính là `name` `position` `salary`..... Trong cơ sở dữ liệu quan hệ, một attribute tương ứng với 1 trường trong bảng.
*  **relationship** là liên kết giữa các **entity**. Trong CoreData relationship giữa 2 entity có thể là one-one, one-many. Ví dụ như là 1 Company thì có nhiều Employee.

Bây giờ thì chúng ta đã hiểu attribute là gì rồi phải không? Bước tiếp theo sẽ tạo attribute cho entity `Person` nhé.
Vẫn là ở trên HitList.xcdatamodelId, chọn `Person` và click vào dấu cộng bên dưới **Attribute**, đặt tên là name, kiểu dữ liệu là String như hình dưới
![](https://images.viblo.asia/d6cb6245-6d59-4ac0-bbe9-86edda7516a3.png)

## Lưu dữ liệu trong CoreData

Mở ViewController.swift, import  Core Data module bên dưới UIKit như sau

```
import CoreData
```

Việc import này cần thiết cho việc bắt đầu sử dụng Core Data API trong code của bạn.
Tiếp theo thay mảng `names` trên thành như sau:

`var people: [NSManagedObject] = []`

`NSManagedObject` đại diện cho một object được lưu trong CoreData, bạn cần phải sử dụng nó để tạo, sửa, lưu và xoá từ CoreData của mình. 
Tiếp theo, mình cần sửa đổi data source của table view đã thêm từ trước như sau:
```
extension ViewController: UITableViewDataSource {
  func tableView(_ tableView: UITableView,
                 numberOfRowsInSection section: Int) -> Int {
    return people.count
  }

  func tableView(_ tableView: UITableView,
                 cellForRowAt indexPath: IndexPath)
                 -> UITableViewCell {

    let person = people[indexPath.row]
    let cell =
      tableView.dequeueReusableCell(withIdentifier: "Cell",
                                    for: indexPath)
    cell.textLabel?.text =
      person.value(forKeyPath: "name") as? String
    return cell
  }
}
```

Vì `NSManagedObject` không biết thuộc tính `name` được định nghĩa trong DataModel, do đó mình truy cập  giá trị  của `name` từ `NSManagedObject` bằng cách trực tiếp như sau:

```
cell.textLabel?.text =
  person.value(forKeyPath: "name") as? String

```
 
 Cách mà CoreData cung cấp để đọc giá trị dựa vào **key-value coding**
 Tiếp theo, tìm đến hàm `addName(_:)` và thay thế `save` `UIAlerAction` như sau:
 
 ```
 let saveAction = UIAlertAction(title: "Save", style: .default) {
  [unowned self] action in
  
  guard let textField = alert.textFields?.first,
    let nameToSave = textField.text else {
      return
  }
  
  self.save(name: nameToSave)
  self.tableView.reloadData()
}
```

Đoạn code này lấy giá trị text được nhập từ text field và truyền vào hàm save. Sau đây mình sẽ taọ thêm hàm save như sau:

```
func save(name: String) {
  
  guard let appDelegate =
    UIApplication.shared.delegate as? AppDelegate else {
    return
  }
  
  // 1
  let managedContext =
    appDelegate.persistentContainer.viewContext
  
  // 2
  let entity =
    NSEntityDescription.entity(forEntityName: "Person",
                               in: managedContext)!
  
  let person = NSManagedObject(entity: entity,
                               insertInto: managedContext)
  
  // 3
  person.setValue(name, forKeyPath: "name")
  
  // 4
  do {
    try managedContext.save()
    people.append(person)
  } catch let error as NSError {
    print("Could not save. \(error), \(error.userInfo)")
  }
}

```
Mình sẽ giải thích cách hoạt động của hàm này:
1. Trước khi bạn có thể lưu hoặc lấy bất kì thứ gì từ CoreData, bạn cần phải lấy ra `NSManagedObjectContext`.
Về việc lưu đối tượng vào CoreData phải qua 2 bước bắt buộc: Thứ nhất là inset đối tượng vào đối tượng quản lý, nếu cảm thấy Ok rồi thì phải commit những thay đổi của mình với đối tượng quản lý để lưu vào bộ nhớ.
 Xcode đã tự taọ cho mình đối tượng quản lý rồi. Nhớ bước đâu mình phải check Use Core Data đấy nhé.
 
 2. Tạo một đối tượng quản lý và insert vào managed object context. Bạn có thể làm việc này bằng phương thức `entity(forEntityName:in:).` 
 Bạn đang tự hỏi không biết `NSEntityDescription` là gì? Chúng ta đã biết `NSManagedObject` để đại diện cho **entity**. **entity description** là một phần liên kết với định nghĩa thực thể từ Data Model với một thể hiện của NSManagedObject khi runtime.
 
 3. Thêm giá trị name vào đối tượng person bằng key-value coding.
 4. Bạn commit những thay đổi của mình với person và save vào bộ nhớ bằng cách gọi phương thức `save`. Chú ý rằng `save` có throw error cho lên phải sử dụng `try` `catch` . Cuối cùng thì thêm một object vào mảng people để hiện thị lên tableview.

## Lấy dữ liệu từ CoreData
Để lấy dữ liệu từ Core Data, bạn có thể fetch nó bằng cách như sau.
Mở **ViewController.swift** và viết vào hàm viewDidLoad() như sau:
```
override func viewWillAppear(_ animated: Bool) {
  super.viewWillAppear(animated)
  
  //1
  guard let appDelegate =
    UIApplication.shared.delegate as? AppDelegate else {
      return
  }
  
  let managedContext =
    appDelegate.persistentContainer.viewContext
  
  //2
  let fetchRequest =
    NSFetchRequest<NSManagedObject>(entityName: "Person")
  
  //3
  do {
    people = try managedContext.fetch(fetchRequest)
  } catch let error as NSError {
    print("Could not fetch. \(error), \(error.userInfo)")
  }
}

```

Từng bước 1 như sau:
1. Trước khi làm mọi thứ cần phải gọi đối tượng `NSManagedObjectContext` như đã nói ở trên.
2. `NSFetchRequest` là một class đảm nhiệm việc fetching từ CoreData. Fetch request rất hữu dụng và linh hoạt. Bạn có thể sử dụng fetch request để fetch tập hợp các object ( như kiểu bạn hãy lấy tất cả các employee trong company...)
Không chỉ lấy tất cả mà chúng ta có thể dựa vào `NSEntityDescription` để lọc nhiều điều kiện khác nhau cho việc trả về kết quả. 

3. Bạn xử lý fetch request của mình bằng `fetch(_:)` để trả về mảng đối tượng theo điều kiện của request.
Build và run app để thấy toàn bộ chức năng.

Vậy là mình đã hướng dẫn xong những điều cơ bản nhất để làm quen với Core Data. Core Data còn rất nhiều cái hay ho mà từ đây các bạn có thể tìm hiểu. Cảm ơn các bạn đã đọc bài của mình =))

## Tài liệu tham khảo
https://www.raywenderlich.com/7569-getting-started-with-core-data-tutorial

Link Github: https://github.com/oHaThiHoan/IOSExample/tree/master/HitList