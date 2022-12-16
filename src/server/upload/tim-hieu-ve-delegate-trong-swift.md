Đối với các lập trình viên IOS , delegate là một khái niệm rất quen thuộc và được sử dụng rất nhiều trong các framework của Apple . Bài viết này mình sẽ chỉ ra bản chất và cách thức hoạt động của Delegate thông qua những ví dụ đơn giản nhất 
# Delegate là gì 
 Trong tài liệu chính thức của Apple , Delegate hay Delegation có định nghĩa như sau :
>  Delegation is a design pattern that enables a class or structure to hand off (or delegate) some of its responsibilities to an instance of another type. This design pattern is implemented by defining a protocol that encapsulates the delegated responsibilities, such that a conforming type (known as a delegate) is guaranteed to provide the functionality that has been delegated

<br>
 Có vẻ hơi kho hình dung nhưng mình xin tóm tắt lại như sau : Delegation là 1 design pattern được sử dụng để trao đổi các dữ liệu giữa các struct và class . Delegate được dịch ra có nghĩa là uỷ quyền . Từ đó sẽ giữa 2 class ( hoặc struct) sẽ có mối quan hệ thằng uỷ quyền và thằng bị uỷ quyền .
 <br>
 Để dễ hiểu hơn chúng ta sẽ thực hiện ví dụ sau :<br>
 Yêu cầu của đề bài là chúng ta có chuyển dữ liệu từ class Owner đến class Employee
 
```
protocol ExampleDelegate {
    func passData(data: String)
}

class Owner {
    var delegate : ExampleDelegate?
}

class Employee : ExampleDelegate {
    func passData(data: String) {
        print("data từ Owner là : \(data)")
    }
}

let owner = Owner()
let employee = Employee()
```

Đầu tiên chúng ta cần khởi tạo 1 protocol tên là ExampleDelegate có chứa 1 method passData có tham số là data . Sau khi  Owner class có 1 thuộc tính tên là delegate và có type thuộc ExampleDelegate. Sau đó ta tiếp tục tạo Employee class và cho nó tuân thử protocol trên . Và cuối cùng là  khởi tạo 2 instance từ 2 class trên .
<br>
Bạn có để ý rằng trong class Owner có 1 property là delegate có type là ExampleDelegate và instance "employee" cũng có type tương tự nên chúng ta có thể gán như sau 
```
owner.delegate = employee
```
Và điểu bất ngờ xảy ra ở đây là bạn có thể thực thi method passData từ class Owner  thông qua qua method passData bên trong class Employee .
```
owner.delegate?.passData(data: "make a report !")
// result : "data từ Owner là : make a report !"
```

Từ ví dụ trên chúng ta có thể tưởng tượng ra mối quan hệ giữa người uỷ quyền (owner) và người bị uỷ quyền (employee) . Own sẽ gửi các công việc cho employee của mình và employee có thể sử dụng data mà owner đã gửi ( lệnh print trong method passData).
# Áp dụng :
Nếu bạn từng sử dụng UICollectionview  thì bạn có thể thấy những đoạn code sau khá quen thuộc 

```
class ViewController: UIViewController,
                      UICollectionViewDelegate ,
                      UICollectionViewDataSource,{
  var collectionView : UICollectionView?
                                      
 override func viewDidLoad() {
  super.viewDidLoad()
        collectionView!.delegate = self
 }
}

func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        print("helo lo conca*")
}
```

Ở đây chúng ta có thể thấy 2 đối tượng người uỷ quyền là "collectionView" và người được uỷ quyền là "self" ( hay ViewController ). collectionView uỷ quyền thực thi method didSelectItemAt indexPath và người bị uỷ quyền (hay còn gọi là culi ) sẽ thực thi method đó