# Tổng quát:
* Theo như tài liệu chính thức về swift:

“Access control restricts access to parts of your code from code in other source files and modules. This feature enables you to hide the implementation details of your code, and to specify a preferred interface through which that code can be accessed and used.”
* Swift 5 có 5 access control. Chúng ta sẽ có open, public, internal, fileprivate và private. Các access control này đuợc xác định dựa trên việc sử dụng trong các module và các source file. Trong bài viết này, chúng ta sẽ tìm hiểu các access control này sẽ đuợc sử dụng ở đâu và như thế nào trong swift.

### 1. open (less restrictive)
* Bất cứ thứ gì đuợc khởi tạo với từ khoá open đều có thể đuợc truy cập từ trong hoặc ngoài module. Các entities với quyền access level là open sẽ đuợc truy cập từ bất cứ đâu trong project. Điều này có nghĩa các open variable có thể truy cập, open function có thể override và open class có thể subclass từ bên trong hoặc từ bên ngoài module khi chúng ta import module đó.
* Ví dụ điển hiền ở đây là sử dụng UITableViewCell class của UIKit framework, chúng ta có thể kế thừa bất kì class nào duới dạng là UITableViewCell khi import UIKit. Nếu chúng ta xem definition của “UITableViewCell”, chúng ta sẽ thấy class UITableViewCell đuợc khởi tạo với access control là open. Đó là lý do mỗi khi chúng ta sử dụng UITableViewCell đều phải khai báo import UIKit.
```
@available(iOS 2.0, *)
open class UITableViewCell : UIView, NSCoding, UIGestureRecognizerDelegate { }
```

### 2. public (restrictive than open)
* Cũng như open, các thực thể public cũng có thể truy cập trong hoặc ngoài module. Nhưng đây lầ điều khác biệt giữa open và public.

```
public class can’t be subclassed and public method can’t be overridden outside of the defined module.
Must have to subclass or override within the module where they defined.
```
* Hãy cùng xem ví dụ bên duới:

```
//module 1
open class X{}
open func bar(){}
public class Y{}
public func foo(){}
//module 2
class A: X{} // success
override func bar(){} // success
class B: Y{} //error
override func foo(){} // error
```
### 3. internal ( module-level access control)
* “internal”  cho phép sử dụng entities có bất kì đâu trong module, Internal là access control mặc định khi khởi tạo một entities. Bên trong một module nếu chúng ta không khai báo access control thì mặc định sẽ là internal. Với access control internal, ta có thể truy cập entities từ bất cứ đâu bên trong module.

### 4. fileprivate( file-level access control)
* Với entities là fileprivate, chúng ta chỉ có thể truy cập nó từ trong cùng một swift file. Trong swift file đó có thể sẽ có các class hoặc các structures. với access control này, chúng ta sẽ không thể truy cập các entities từ bên ngoài file swift đó.

```
//**  ViewController.swift **//
class ViewController: UIViewController {
    override func viewDidLoad() {
    super.viewDidLoad()
    let a = A()
    a.x()
    a.z() //error
    let b = B()
    b.Y() // error
  }
}
class A {
fileprivate func x(){
    print("Inside ViewController file")
  }
}

//**  SecondViewController.swift **//
class B{
fileprivate func Y(){
    print("Outside ViewController file")
  }
}
extension A{
    fileprivate func Z(){
    print("Outside ViewController file, extension of A")
  }
}
```

### 5. private( class-level access control)
* Đây là một loại access control đuợc sử dụng nhiều nhất nhằm mục đích hạn chế truy cập. Với loại access này, chúng ta chỉ có thể truy cập entities từ trong class hoặc struct bao gồm extension, còn nếu bên ngoài  class hoặc struct,extension chúng ta sẽ không thể truy cập đuợc.

```
// **  ViewController.swift **//
class ViewController: UIViewController {
    override func viewDidLoad() {
    super.viewDidLoad()
    x()
    let a = A()
    a.Y() // error
  }
}
extension ViewController{
    private func x(){
    print("Inside x")
  }
}
class A {
    private func Y(){
    print("Inside Y")
  }
}
```

### Sau đây là bảng tóm tắt các Access control:
![](https://images.viblo.asia/06819849-328a-4853-8f47-59115ffbb486.png)

Reference: https://medium.com/@arifulislam14/access-control-in-swift-98ad5901a358