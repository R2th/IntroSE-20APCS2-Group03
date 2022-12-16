####  Bạn đã từng nghe đến UndoManager hoặc NSUndoManager trước đây? Nếu câu trả lời là,
* "***Có, tôi đã từng nghe đến***".  Ngon rồi, bạn là một trong số ít developers đã biết đến UndoManager.
* "***Tôi chưa từng nghe đến***".  Đừng lo, đây chính là bài viết dành cho bạn, nó sẽ chỉ cho bạn biết mọi thứ về UndoManager.

Tôi thấy rằng nhiều developers cần phải thực hiện những hành động undo/redo trong quá trình phát triển, thường thì nó được diễn ra trong các ứng dụng chỉnh sửa ảnh hoặc video.
Giả sử chúng ta đang phát triển một ứng dụng chỉnh sửa ảnh với chức năng Undo-Redo trong màn hình chỉnh sửa. Đảm bảo rẳng người dùng đã ứng dụng dụng cả ba filters trên ảnh hiện có:
1. Sepia effect filter
2. Radial blur effect filter
3. Dark light effect filter

Undo ở đây sẽ xoá filter “Dark light effect filter” cuối cùng được người dùng sử dụng.  Redo sẽ một lần nữa áp dụng lại filter cuối cùng bị xoá bởi Undo.

#### Undo-Redo được ứng dụng khi nào?
Bình thường thì khi developers không biết đến UndoManager, họ sẽ thường sử dụng array/stack. Việc thực hiện này sẽ dẫn đến có nhiều đoạn code với những điều kiện phức tạp và bị overload dữ liệu bởi vì chúng ta cần phải giữ lại bản sao của hình ảnh sau khi áp dụng bất kỳ filter nào vào.

Với UndoManager chúng ta có thể giải quyết những vấn đề này dễ dàng hơn.

#### Vậy UndoManager là gì?
UndoManager/NSUndoManager là các class cung cấp các thao tác Undo-Redo theo cách dễ dàng, đơn giản và hiệu quả hơn. NSUndoManager là được ứng dụng trong Objective-C, còn UndoManager của Swift là được triển khai từ NSUndoManager.

#### Để hiểu hơn về UndoManager, hãy xem ví dụ dưới đây:
Chúng ta có duy nhất một màn hình với một danh sách học sinh ở trong TableView và ba Buttons.
1. "Add button" sẽ thêm vào danh sách một sinh viên.
2. "Undo button" sẽ xoá sinh viên đã được thêm vào trước đó.
3. "Redo button" sẽ thêm sinh viên mà bị xoá trước đó bởi Undo.

![](https://images.viblo.asia/219a3abf-498c-4aa7-bffb-eaf748ae9e62.gif)

> #### Student.swift
```
//
//  Student.swift
//  HSUndoRedoTutorial1
//
//  Created by Hitendra on 18/04/19.
//  Copyright © 2019 Hitendra iDev. All rights reserved.
//
import Foundation

struct Student {
  var name: String
  var studyInClass: String
  
  static let allStudents : [Student] = [
    Student(name: "Hitendra Solanki", studyInClass: "9th standard"),
    Student(name: "Yajaira Coplan", studyInClass: "7th standard"),
    Student(name: "Loyd Stage", studyInClass: "8th standard"),
    Student(name: "Jan Hester", studyInClass: "1st standard"),
    Student(name: "Vennie Loranger", studyInClass: "9th standard"),
    Student(name: "Brady Sartor", studyInClass: "7th standard"),
    Student(name: "Jasmin Mcgillis", studyInClass: "8th standard"),
    Student(name: "Octavia Martens", studyInClass: "1st standard"),
    Student(name: "Latosha Bingaman", studyInClass: "9th standard"),
    Student(name: "Scarlet Noto", studyInClass: "7th standard"),
  ]
}
```
Chúng ta có hai properties là 'name' và 'studyInClass' là kiểu String. Chúng ta có thêm một static constant property là 'allStudents' - nơi chứa những sinh viên được xác định trước. Có thể coi 'allStudents' như một cơ sở dữ liệu nhỏ của ứng dụng, được truy cập thông qua 'Student.allStudents'.

> #### StudentTableViewCell.swift

```
//
//  StudentTableViewCell.swift
//  HSUndoRedoTutorial1
//
//  Created by Hitendra on 18/04/19.
//  Copyright © 2019 Hitendra iDev. All rights reserved.
//
import UIKit

class StudentTableViewCell: UITableViewCell {
  var student: Student! {
    didSet {
      self.textLabel?.text = self.student.name
      self.detailTextLabel?.text = self.student.studyInClass
    }
  }
}
```
StudentTableViewCell là một custom cell đơn giản để thể hiển student cell trong danh sách. Class này có một data property là 'student', được sử dụng để update lại cell UI.

> #### StudentsListViewController.swift
```
//
//  StudentsListViewController.swift
//  HSUndoRedoTutorial1
//
//  Created by Hitendra on 18/04/19.
//  Copyright © 2019 Hitendra iDev. All rights reserved.
//
import UIKit

class StudentsListViewController: UIViewController {
  
  //IBOutlets:-
  @IBOutlet weak var btnAdd: UIBarButtonItem!
  @IBOutlet weak var btnUndo: UIBarButtonItem!
  @IBOutlet weak var btnRedo: UIBarButtonItem!
  
  @IBOutlet weak var tableview: UITableView!
  
  //iVars:-
  
  //list of students visible in tableview screen appear
  var students: [Student] = [
    Student.allStudents[0]
  ]
  
  //ViewController LifeCycle
  override func viewDidLoad() {
    super.viewDidLoad()
    self.enableDisbaleActionsButtons()
  }
}

//Extension 1
//MARK:- IBActions + Enable/Disable UI buttons
extension StudentsListViewController {
  @IBAction func btnAddNewStudentDidTap(_ sender: UIBarButtonItem) {
    let index = self.students.count
    self.addNewStudent(at: index) //add student in array and update table
    self.addNewStudentUndoActionRegister(at: index) //register for Undo action
    
    self.enableDisbaleActionsButtons()
  }
  
  @IBAction func btnUndoDidTap(_ sender: UIBarButtonItem) {
    self.undoManager?.undo()
    self.enableDisbaleActionsButtons()
  }
  
  @IBAction func btnRedoDidTap(_ sender: UIBarButtonItem) {
    self.undoManager?.redo()
    self.enableDisbaleActionsButtons()
  }
  
  func enableDisbaleActionsButtons(){
    self.btnAdd.isEnabled = Student.allStudents.count > self.students.count
    self.btnUndo.isEnabled = self.undoManager?.canUndo ?? false
    self.btnRedo.isEnabled = self.undoManager?.canRedo ?? false
  }
}

//Extension 2
//MARK:- Add/Remove Student : Data Actions
//       Data Change Actions + UI Updates
extension StudentsListViewController {
  func addNewStudent(at index: Int){
    let newStudent = Student.allStudents[index]
    self.students.append(newStudent)
    self.tableview.reloadData()
  }
  
  func removeNewStudent(at index: Int) {
    self.students.remove(at: index)
    self.tableview.reloadData()
  }
}

//Extension 3
//MARK:- Add/Remove Student : Undo/Redo Actions
//       Register inverse Actions that automatically performs
extension StudentsListViewController {
  func addNewStudentUndoActionRegister(at index: Int){
    self.undoManager?.registerUndo(withTarget: self, handler: { (selfTarget) in
      selfTarget.removeNewStudent(at: index)
      selfTarget.removeNewStudentUndoActionRegister(at: index)
    })
  }
  
  func removeNewStudentUndoActionRegister(at index: Int){
    self.undoManager?.registerUndo(withTarget: self, handler: { (selfTarget) in
      selfTarget.addNewStudent(at: index)
      selfTarget.addNewStudentUndoActionRegister(at: index)
    })
  }
}

//Extension 4
//MARK:- UITableViewDelegate + UITableViewDataSource
extension StudentsListViewController: UITableViewDelegate, UITableViewDataSource {
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return self.students.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "StudentTableViewCell") as! StudentTableViewCell
    cell.student = self.students[indexPath.row]
    return cell
  }
}
```

#### StudentsListViewController.swift — Extension đầu tiên từ dòng 34
* Extension này sẽ chỉ handle những hành động của user.
* `btnAddNewStudentDidTap(_:)` sẽ thêm một student vào trong danh sách và đăng ký hành động nghịch đảo của nó cho Undo.
* `btnUndoDidTap(_ :)` sẽ thực hiện hành động Undo.
* `btnRedoDidTap(_ :)` sẽ thực hiện hành động Redo.
* `enableDisbaleActionsButtons()` sẽ enable hoặc disable UI của các Button. Ví dụ "Add button" sẽ bị disable khi trong danh sách có đủ 10 sinh viên, vì trong database hiện tại chỉ có 10 sinh viên được xác định.

#### StudentsListViewController.swift — Extension thứ 2 từ dòng 62
* Extension này sẽ thêm một sinh viên vào danh sách và xoá một sinh viên từ danh sách tại một index xác định.

#### StudentsListViewController.swift — Extension thứ 3 từ dòng 78
* Extension này đăng ký hành động Undo-Redo của chúng ta.
Tất cả mọi thứ phụ thuộc vào index khi hành động hiện tại được thực hiện.

> Bạn cần phải hiểu rõ hai điểm quan trọng sau:
> - Undo: Hành động nghịch đảo được thực hiện.
> - Redo: Hành động nghịch đảo của nghịch đảo được thực hiện hay gọi là Undo của Undo.

* Khi bạn thực hiện bất cứ hành động nào, bạn cần phải đăng ký tới Undo Action, sử dụng method `registerUndo(withTarget:,handler:)` trong thể hiện của class `UndoManager`. Mỗi ViewController đều có một thể hiện undoManager là mặc định.

* Trong các methods trên của chúng ta, có thể sử dụng undoManager mặc định của ViewController để đăng ký tới Undo-Redo ở dòng 83 và 90.

* `addNewStudentUndoActionRegister(at:)` được dùng để đăng ký Undo của hành động `addNewStudent(at:)`,  nó sẽ xoá student cuối cùng được add trong quá trình Undo.

* `removeNewStudentUndoActionRegister` được sử dụng để đăng ký Undo của hành động `removeNewStudent(at:)`, Nó là Redo của quá trình `addNewStudent(at:)`, Undo của Undo là Redo.

#### StudentsListViewController.swift — Extension thứ 4 từ dòng 97
* Extension này xử lý các methods liên quan đến TableView. Ở đây chúng ta chỉ sử dụng 2 phương thức thiết yếu để làm giảm sự phức tạp.

Download full source code tại: [Github](https://github.com/hitendradeveloper/Simple-Undo-Redo-Example/tree/master)

> Bài viết được dịch từ bài chia sẻ [UndoManager in Swift 5 with example](https://medium.com/@hitendrahckr/undomanager-in-swift-5-with-simple-example-8c791e231b87?fbclid=IwAR2HS7NKGZJfXFLuz1OAtRyJ9ukfY8b32GMre-MhjRXr0Ml00IPmOwVbuLw) của tác giả [Hitendra Solanki](https://medium.com/@hitendrahckr)