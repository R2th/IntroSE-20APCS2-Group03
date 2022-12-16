## 1. Lời mở đầu:
**Dependency Injection** (DI) là một kỹ thuật quan trọng giúp cho code của bạn dễ test hơn trong quá trình kiểm thử. Thay vì các **objects** tự tạo những **dependencies** hoặc truy cập objects dưới dạng **singletons**, **DI** cho phép mọi thứ mà object cần để thực thi công việc của nó nên được truyền từ bên ngoài. Điều này vừa giúp dễ dàng bao quát các **dependencies** mà object có, và cũng giúp việc kiểm tra đơn giản hơn rất nhiều. Trong bài viết này, ta sẽ tập trung vào việc sử dụng kỹ thuật **DI** với **storyboards**, nên để hiểu hơn về kỹ thuật **DI** thì bạn có thể tham khảo tài liệu sau:

https://viblo.asia/p/dependency-injection-QpmlewqNKrd  

## 2. Thực hiện Dependency Injection:
Trước đây, chúng ta thường viết code như sau:
```
// A view controller that we want to present with some data.
class DetailViewController: UIViewController {
    var selectedUser: User?
    // ...
}

// Root view controller that wants to create, configure, and present an DetailViewController
class MainViewController {
    // ...
    
    func show(user: User) {
        // attempt to load detailViewController from the storyboard
        guard let vc = storyboard?.instantiateViewController(withIdentifier: "DetailViewController") as? DetailViewController else {
            fatalError("Failed to load DetailViewController from storyboard.")
        }
        
        // configure its only property
        vc.selectedUser = user
        
        // display it
        navigationController?.pushViewController(vc, animated: true)
}
```

Việc xuất hiện Optionals ở đây là điều không tránh khỏi bởi vì ta phải để storyboard xử lý quá trình khởi tạo view controller, kéo theo nhiều sự phức tạp hơn - ta có thể vô tình set giá trị **selectedUser** = nil  hoặc ta có thể quên không set giá trị cho nó, và ta cần unwrap nó khi cần.

Tuy nhiên, kể từ version iOS 13.0 trở lên, ta sẽ có thêm một solution mới: một method cho **UIStoryboard** là ***instantiateViewController(identifier:creator:)*** , cho phép ta xác định được cách khởi tạo và config view controller của mình.

Trong **DetailViewController**,  ta có thể viết lại như sau:
```
class DetailViewController: UIViewController {
    var selectedUser: User
    
   init?(coder: NSCoder, selectedUser: User) {
       self.selectedUser = selectedUser
       super.init(coder: coder)
   }
   
   required init?(coder: NSCoder) {
       fatalError("You must create this view controller with a user.")
   }
   
   // ...
}
```

Như ta thấy ở trên thì biến **selectedUser** không còn là biến optional, và có hai hàm khởi tạo: hàm đầu tiên với một tham số kiểu **NSCoder** và một tham số kiểu **User**, còn hàm thứ hai chỉ với một tham số kiểu **NSCoder**. Hàm thứ hai sử dụng ***fatalError()*** như là một cách để thông báo rằng khởi tạo **DetailViewController** mà không có giá trị **user** thì app của bạn sẽ bị crash.

Hàm ***show()*** trong **MainViewController** sẽ được viết lại như sau:
```
func show(user: User) {
    guard let vc = storyboard?.instantiateViewController(identifier: "DetailViewController", creator: { coder in
        return DetailViewController(coder: coder, selectedUser: user)
    }) else {
        fatalError("Failed to load DetailViewController from storyboard.")
    }

    navigationController?.pushViewController(vc, animated: true)
}
```

Giải thích qua về hàm ***instantiateViewController(identifier:creator:)*** 
- **Identifier**: là một chuỗi string duy nhất định danh view controller trong storyboard.
- **creator**: là một block chứa code khởi tạo view controller với đối tượng **coder** được cung cấp kèm theo bất kỳ thông tin nào bạn muốn (ví dụ ở đây là thông tin của user). Block này sẽ trả về một view controller mới với những tham số đi kèm như **coder** và **user**.
- **coder**: là một object chứa dữ liệu của storyboard để sử dụng khi config view controller. Nếu ta trả về nil từ block trên, hàm sẽ tạo ra một view controller sử dụng hàm mặc định ***init(coder:)*** .

## 3. Tài liệu tham khảo:
https://www.hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards