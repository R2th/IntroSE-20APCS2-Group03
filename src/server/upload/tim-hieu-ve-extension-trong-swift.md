### Introduction

Chắc hẳn với các bạn đã từng làm quen với Objective-C thì Category thật sự rất tuyệt, và quả thật extensions trong Swift cũng như vậy, nó cho bạn cơ hội để thêm các func vào một type nào đó. Điều này không chỉ cho các type của bạn mà còn cho các type mà bạn không có quyền truy cập vào source code.

![](https://images.viblo.asia/8548c335-8f31-4e2d-b2d6-9a6b17074df9.jpg)

**Chúng ta cùng tìm hiểu về Extensions nhé!**

### How do extensions work?

Chúng ta cùng xem ví dụ dưới đây: 

```Swift
extension Int {
    
    func calculateDouble() -> Int {
        return 2 * self
    }
    
}
 
var someInt = 3
 
print(someInt.calculateDouble())   // 6
```

Trong ví dụ này, chúng ta đã tạo một extensions cho type Int, vì vậy với type Int value bây giờ ta có một hàm khác có sẵn trả về giá trị gấp đôi. Ngoài ra ta cũng có thể thay đổi giá trị của chính biến đó thông qua sử dụng keyword **mutating**

```Swift
extension Int {
    
    mutating func double() {
        self = self * 2
    }
    
}
 
var someInt = 3
 
someInt.double()
 
print(someInt) //6
```

Bạn cũng có thể tạo extensions cho class như sau:

```Swift
class TestClass {
    
    var i = 3
    
}
 
extension TestClass {
    
    func demoFunction() {
        print("i is equal to \(i)")
    }
    
    var demoComputedValue: Int {
        get {
            return 10
        }
        set {
            print("\(newValue)")
        }
    }
    
}
 
let test = TestClass()
test.demoFunction() //i is equal to 3
print(test.demoComputedValue) //10
test.demoComputedValue = 20 //20
```

Trong ví dụ chúng ta đã khai báo một function và một computed property. Nó có thể khai báo một stored property hoặc override function.

Hơn nữa, extensions được phép confirm protocol. Sau đó extensions implement tất cả function của protocol nếu classs không làm thế.

```Swift
class TestClass {
    
    var i = 3
    
}
 
protocol TestProtocol {
    
    func protocolFunction()
    
}
 
extension TestClass: TestProtocol {
   
    func protocolFunction() {
        print("protocol function")
    }
 
}
```

Như bạn có thể thấy định nghĩa extension khá đơn giản, bây giờ chúng ta sẽ thảo luận khi nào và làm thể nào để sử dung các extension nhé.

### When use extensions work?

* Sử dụng extensions cho type mà bạn không thể truy cập được source code.
* Sử dụng extensions cho type của bạn trong trường hợp bạn share code giữa vài project, trường hợp này đây là cách mà bạn có thể thêm tính năng cụ thể bằng cách sử dụng extensions.
* Ngoài ra việc sử dụng extensions cũng giúp cho cấu trúc code rõ ràng hơn, dễ đọc hiểu hơn.

### Example

Chúng ta cùng tham khảo ví dụng về tạo extensions cho tableview dưới đây:

```Swift
import UIKit
 
class TableViewController: UITableViewController {
    
    private let dataSource = DataSource()
    
    override func viewDidLoad() {
       
        dataSource.movies = ["Terminator","Back To The Future","The Dark Knight"]
        tableView.dataSource = dataSource
 
    }
}
```

```Swift
import UIKit
 
class DataSource: NSObject, UITableViewDataSource {
    
    var movies = [String]()
    
    //MARK: - UITableViewDataSource
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return movies.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cellIdentifier")!
        
        cell.textLabel?.text = movies[indexPath.row]
        
        return cell
    }
    
}
```

Chúng ta cũng có thể viết sử dụng extensions như sau:

```Swift
class TableViewController: UITableViewController {
 
    fileprivate var movies = [String]()
    
    override func viewDidLoad() {
        movies = ["Terminator","Back To The Future","The Dark Knight"]
        
        tableView.reloadData()
    }
    
}
 
extension TableViewController {
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return movies.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cellIdentifier")!
        
        cell.textLabel?.text = movies[indexPath.row]
        
        return cell
    }
    
}
```

Có thể thấy việc sử dụng extensions giúp cho source code trở nên rõ ràng hơn và dễ sử dụng hơn.

### Conclusion

Extensions là một tính năng hết sức thú vị và thực sự hữu dụng khi chúng ta có thể dễ dàng thêm các tính năng vào type mà thậm chí chúng ta không có quyền truy cập source code.
Có thể nói extensions đã giúp source code chúng ta viết trở nên rõ ràng hơn, tiện dụng và tránh lặp lại code hơn.

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_
[http://www.thomashanning.com/swift-extensions/)