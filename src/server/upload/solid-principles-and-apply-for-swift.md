**S.O.L.I.D principles** là những nguyên lý nổi tiếng trong lập trình mà rất nhiều lập trình viên đều biết hoặc ít nhất một lần nghe về chúng, và được xem là 5 nguyên lý đầu tiên trong thiết kế. Chúng được Robert C.Martin (Uncle Bob) đưa ra trong "Part III Design Principles" của quyển sách "Clean Architechture - A Craftman's Guilde to Software Structure and Design".

* The Single Responsibility Principle
* The Open - Closed Principle
* The Liskov Subsititution Principle
* The Interface Segregation Principle
* The Dependency Inversion Principle

Những điều nói trong bài viết hoàn toàn gói gọn trong sự hiểu biết của tác giả, chỉ tham khảo cuốn sách của Bob và không có sự tham khảo, thu thập từ các nguồn khác trên Internet nên có thể chưa hoàn toàn chính xác và đầy đủ. Người đọc có thể cân nhắc đọc hoặc không, và nên phản hồi nếu có sai sót, và những đoạn mã ví dụ là sẽ sử dụng ngôn ngữ **Swift**.

## Overview
Đầu tiên, và cũng là ý quan trọng, đó là những nguyên lý **S.O.L.I.D** không phải là luật, **"no rules"**, nghĩa là việc chúng ta áp dụng hay không áp dụng nó vào trong code của mình thì cũng không ảnh hưởng đến hoạt động của ứng dụng của chúng ta. Nó chỉ giúp cho developer, những nhà phát triển ứng dụng, có thể viết code được sạch sẽ, dễ hiểu, dễ áp dụng nhiều nơi và dễ bảo trì hơn. Góp phần nâng cao chất lượng về mặt kiến trúc code.


## The Single Responsibility Principle (SRP)

> A module should be responsible to one, and only one, actor.

Hệ thống phần mềm được thay đổi để thoải mãn người dùng và các ông chủ, nhà đầu tư. 

Module ở đây có thể là một source file, tập hợp các functions hoặc các cấu trúc dự liệu.

Còn actor thì là những thành phần làm cho module bị thay đổi, đó có thể là những users, là những stakeholders hoặc gần gũi hơn là những vai trò, nhiệm vụ của module đó.

Xem ví dụ: 
```swift
class APIService {
	func requestServer() 
	func parseData()
	func saveToDatabase()
	//...
}

```

Chúng ta có một class có tên là *APIService* và nó có đến ba vai trò khác nhau, kết nối đến server để lấy dự liệu về, sau đó xử lý những dữ liệu có được và cuối cùng là lưu lại.  Đây là quá trình *request API* rất phổ biến nhưng nó lại vi phạm nguyên lý SRP vì làm quá nhiều nhiệm vụ khác nhau. 
Điển hỉnh như, nhiệm vụ request to server là một nhiệm vụ, parse data lại là một việc khác, rồi đến lưu dữ liệu là một lĩnh vực hoàn toàn không liên quan gì đến việc request server. Nếu có sự thay đổi về cách xử lý dữ liệu, hay cách lưu dữ liệu thì APIService class này sẽ phải bị thay đổi nhiều, có thể bị phình to và mất kiểm soát do ôm đồm quá nhiều việc.

Nên, cách tốt nhất là chúng ta sẽ tách nó ra thành các module nhỏ hơn, đảm nhiệm những công việc đơn giản hơn. Mà càng nhỏ, càng đơn giản thì càng dễ hiểu và bảo trì.
```swift
class APIService {

    var dataHandler = DataHandler()
    var databaseHandler = DatabaseHandler()

    func requestServer() {
         let response = Alamofire.request()
         let data  = dataHandler.parseData(response)
         databaseHandler.saveToDatabase(data)
         return data
    } 
}

class DataHandler {
    func parseData()
}

class DatabaseHandler {
    func saveToDatabase()
}

```


Một ví dụ khác cho function
```swift
func setVisibleTableView(_ isShow: Bool) {
    tableView.isHidden = !isShow
} 

```
Với function trên, nội dung của nó là hiển thị/ẩn một table view,  thoạt nhìn nó rất bình thường, không có vấn đề gì cả, và được sử dụng rất phổ biến. Nhưng nếu bàn sâu hơn về chức năng, thì một function này lại đảm nhiệm hai chức năng là  hiển thị hoặc ẩn table view, nên cách tốt nhất là chúng ta tạo ra hai function, một function làm nhiệm vụ hiển thị, một function làm nhiệm vụ ẩn đi là thoả mãn SRP.

```swift
func showTableView() {
    tableView.isHidden = false
} 

func hideTableView() {
    tableView.isHidden = true
} 

```
Tất nhiên, như đã nói ở đầu bài, đây là những nguyên lý và việc áp dụng nó hay không cũng tuỳ thuộc vào chúng ta, và phụ thuộc vào tình huống cụ thể ở đó.


## The Open - Closed Principle(OCP)
> A software artifact should be open for extension but closed for modification

Những thành phần của một phần mềm có thể được mở rộng nhưng không được sửa đổi.

Điều này là một điều rất là cơ bản trong việc xây dựng kiến trúc phần mềm. Nếu một mở rộng đơn giản lại bắt buộc phải thay đổi nhiều thứ trong phần mềm đó thì rõ ràng người xây dựng lên phần mềm đó là chưa tốt.

Trong trường hợp của chúng ta, Swift-ers, nếu một class muốn mở rộng 1 tính năng lại dẫn đến các tính năng khác của class đó thay đổi theo thì điều đó là một điều đáng lo ngại.

Cùng xem 1 ví dụ: 
```swift
class PaymentManager {

    var method: PaymentMethod
    
    func performPayment() {
        switch method {
        case .cash:
        // some code for payment by cash
        
        case .debit: 
        // some code for payment by debit card
        }
    }
}

```

Chúng ta có 1 class quản lý việc thanh toán, và có chức năng thanh toán dựa theo những phương thức khác nhau. Tất cả đều rất ổn và bình thường. Nhưng, nếu chúng ta muốn thêm 1 phương thức thanh toán mới vào thì chúng ta phải thay đổi *performPayment* method, phải thêm code,  thêm xử lý vào trong nó, điều này sẽ làm vi phạm nguyên lý OCP vì chúng ta đang mở rộng *performPayment* method bằng cách chỉnh sửa trực tiếp nó. Và để giải quyết vấn đề này chúng ta áp dụng tính trừu tượng trong lập trình hướng đối tượng.

Kết quả:
```swift
protocol Payment {
    func makePayment()
}

class CashPayment: Payment {
    func makePayment() { } // make payment by Cash
}

class DebitPayment: Payment {
    func makePayment() { } // make payment by Debit card
}

class CreditPayment: Payment {
    func makePayment() { } // make payment by Credit card
}

```

Chúng ta tạo ra 1 lớp trừu tượng tên là *Payment*, nó chứa 1 phương thức trừu tượng *makePayment* mang trong mình ý nghĩa là sẽ tiến hành thực hiện việc thanh toán. Theo đó bất kỳ phương thức thanh toán nào thì đều chỉ cần theo *Payment* này và tiến hành theo cách riêng của nó. Sau này, khi có thêm những cách thanh toán khác thì chúng ta chỉ cần tạo ra class tương ứng và conform cái *Payment* là được, sẽ không làm ảnh hưởng những cái cũ.

Nguyên lý Open - Closed này là một trong những phần chủ yếu của kiến trúc hệ thống. Mục đích chính của nó là hệ thống dễ dàng mở rộng mà không cần phải có những sự thay đổi quá lớn


## The Liskov Subsititution Principle(LSP)
> Derived classes must be substitutable for their base classes.

Nghĩ nôm na thì là những child class (kế thừa, conform protocol) khi implement những tính năng của super class thì không nên làm thay đổi các hành vi của super class đó. 

Ví dụ:

Chúng ta có 1 protocol có tên là Vehicle
```swift
protocol Vehicle  {

	var tankCapacity: Float { set }
 	
	func setTankCapacity()
	func move()
}

```

Giả sử nó có 2 method là set giá trị dung tích bình chứa nhiên liệu và di chuyển.
Sau đó chúng ta tạo ra 2 class là Car và Bicycle và extend Vehicle protocol.
```swift
class Car: Vehicle {
    var tankCapacity: Float = 0.0
 	
	func setTankCapacity() {}
	func move() {}
}

class Bicycle: Vehicle {
    var tankCapacity: Float = 0.0
 	
	func setTankCapacity() {}
	func move() {}
}

```
Đối với *Car* class thì mọi thứ đều ổn, đều hợp lý. Nhưng đến *Bicycle* class thì lại xuất hiện một vấn đề là xe đạp thì không có bình nhiên liệu. Cho nên, khi mà chúng ta *set* một giá trị dung tích bình nhiên liệu bằng cách sử dụng hàm *setTankCapacity* thì nó sẽ không có ý nghĩa, chương trình vẫn chạy bình thường, không lỗi, nhưng về mặt ý nghĩa thì nó hoàn toàn là sai. Và sự việc đó là trái với LSP.

Muốn làm đúng với nguyên lý LS trong trường hợp muốn conform 1 protocol thì chúng ta chỉ cần nhớ đến 1 yêu cầu đó là, class chỉ conform những protocol phù hợp với chính class đó, không nên conform những thứ dư thừa.

Vậy, chúng ta giải quyết bào toán trên bằng cách tạo ra những protocol nhỏ hơn, cụ thể hơn với từng loại xe cộ.
```swift
protocol Vehicle  {
	func move()
}

protocol Motor {
	var cylinderCapacity: Float { set }
	func setCylinderCapacity()
}

protocol MotorizedVehicle: Motor,  Vehicle {

}

protocol RudimentaryVehicle: Vehicle {

}

//conform
class Car: MotorizedVehicle {
    var cylinderCapacity: Float = 0.0
    func setCylinderCapacity()
    func move()
}

class Bicycle: RudimentaryVehicle {
    func move()
}

```
Car sẽ conform MotorizedVehicle protocol, như một thể hiện của xe có động cơ. Và Bicycle sẽ conform RudimentaryVehicle protocol, như một thể hiện của xe thô sơ. Mọi thứ đã trở nên rõ ràng, dễ hiểu và có nghĩa.



## The Interface Segregation Principle(ISP)
> Clients should not be forced to depend upon interfaces that they do not use

Hiểu một cách đơn giản, những class con không cần thiết phải quan tâm đến những thứ nó không cần sử dụng từ cha của nó. Dùng cái gì thì kế thừa/conform cái đó, không ôm hết những thứ không liên quan về mình.

Nguyên lý này nó cũng tương tự như nguyên lý Liskov subsititution, chỉ khác ở cách diễn đạt ý nghĩa.

Một ví dụ:

Chúng ta có 1 màn hình hiển thị danh sách vé xe. Theo đó sẽ có 2 danh sách là những vé chưa sử dụng  và những vé đã sử dụng. Chúng ta tạo 1 protocol cho màn hình này

```swift
protocol TicketProtocol {
	var tickets: [Ticket]? { set get }
	
	func fetchNotUsedTickets()
	func fetchUsedTickets()
    
	func notUsedTicket(at index: Int) -> Ticket?
	func usedTicket(at index: Int) -> Ticket?
} 

class TicketViewModel: TicketProtocol {
    //...
}

```
Nếu xét trên phạm vi 1 màn hình thì đoạn code này bình thường, không có gì đáng nói. Những nếu chúng ta chia màn hình này thành 2 màn hình con và vẫn sử dụng protocol này thì lại không tốt, không tốt ở đây là về mặt ý nghĩa, về nhiệm vụ chứ về mặt code thì nó vẫn chạy bình thường. Điều này rất nhiều người mắc phải vì nghĩ rằng, mình chỉ cần conform 1 protocol nào đó có chứa những method mà mình cần, còn lại không quan tâm đến những tính năng khác của nó. 
```swift
class NotUsedViewModel: TicketProtocol {
    //...
}

class UsedViewModel: TicketProtocol {
    //...
}
```
Lúc này, chúng ta cần phải tách TicketProtocol ra thành những protocol nhỏ hơn, đáp ứng đủ các yêu cầu của hai màn hình con, không thừa, không thiếu.
```swift
protocol TicketProtocol {
	var tickets: [Ticket]? { set get }
}

protocol NotUsedTicketProtocol {
	func fetchNotUsedTickets()
    func notUsedTicket(at index: Int) -> Ticket?
}

protocol UsedTicketProtocol {
    func fetchUsedTickets()
    func usedTicket(at index: Int) -> Ticket?
}

//conform 
class NotUsedViewModel: NotUsedTicketProtocol {
	var tickets: [Ticket]?
 
	func fetchNotUsedTickets() { }
    func notUsedTicket(at index: Int) -> Ticket? { }
}

class UsedViewModel: UsedTicketProtocol {
	var tickets: [Ticket]?
	func fetchUsedTickets() { }
    func usedTicket(at index: Int) -> Ticket? { }
}
```
Còn có 1 loại thứ hai đó là việc cung cấp dữ liệu dư thừa, không cần thiết  cho một method.
Chúng ta có 1 class User được định nghĩa như sau:
```swift
class User {
	var id = 0
    var nickName = “”
    var fullName = “”
    var email = “”
    var age = 0
    var address: String?
}
```

và 1 method cập nhật các thông tin của User đó:
```swift
func updateUserProfile(_ user: User) {

}
```

Thoạt nhìn thì mọi thứ đều ổn, không có gì để bàn. Nhưng, xét theo ý nghĩa logic thì chúng ta đang truyền những dữ liệu dư thừa, và sai ý nghĩa. Hàm updateUserProfile này nó hiểu là khi gọi nó thì chúng ta muốn cập nhật dữ liệu của cả 1 User, nhưng User này thì nó có những giá trị sẽ không được thay đổi, ví dụ như là id, id là bất biến, hay thậm chí có nhiều trường hợp email cũng là không được phép đổi. Như vậy nó thể hiện được 1 điều là chúng ta *lười*, hay thậm chí tệ hơn là không kiểm soát được việc mình muốn làm. 

Vậy, để giải quyết vấn đề này thì chúng ta nên tạo ra 1 đối tượng mới, chứa những thông tin có thể cập nhật được của User, ví dụ:
```swift
protocol UpdateProfileInfo {
	var fullName: String?
    var age: Int?
    var address: String?
}

class User:  UpdateProfileInfo {
	//...
}

//Update user profile
func updateUserProfile(_ info: UpdateProfileInfo) {

}
```

Lúc này đây, mọi thứ xem như rõ ràng, và chúng ta không phải băn khoăn về việc sẽ cập nhật những gì mỗi khi User muốn cập nhật thông tin của User

## The Dependency Inversion Principle(DIP)
> Depend on abstractions, not on concretions
> 
> A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
> 
> B. Abstractions should not depend on details. Details should depend on abstractions.

Định nghĩa đã rất rõ ràng, không cần nói gì thêm

Một ví dụ:
```swift
class SavingHandler {

    func save(at path: String) {
        LocalFileHandler.shared.save(at: path)
    } 
}


class LocalFileHandler {
    static let shared = LocalFileHandler()

    func save(at path: String) {
        //perform save local data
    }
}

```
Chúng ta có 2 class là SavingHandler(high -level )và LocalFileHandler(low level), level theo DIP, đơn giản là save() method của SavingHandler phụ thuộc vào save() method của LocalFileHandler. 

LocalFileHandler có thể được reuse ở khắp mọi nơi trong cùng 1 project hoặc ở trong project khác. Nhưng SavingHandler thì không dễ dàng như vậy, nếu thiếu LocalFileHandler thì nó sẽ không làm được *save*, những nơi nào có nó thì bắt buộc LocalFileHandler cũng phải xuất hiện. Điều này chính là *mục A* của nguyên lý DI này.

Như vậy chúng ta sẽ giải quyết nó bằng cách tạo 1 protocol độc lập chứa 1 method là save(), làm nhiệm vụ save dữ liệu.
```swift
protocol Storage {
    func save(at path: String)
}
```
Nó chỉ chứa 1 method này để lưu dữ liệu, còn cụ thể lưu như thế nào thì những child class của nó sẽ làm việc.
Sau đó, ta tạo tiếp 1 class làm nhiệm vụ quản lý việc lưu dữ liệu
```swift
class SavingManager {

    static let shared = SavingManager()

    func save(_ path: String, _ storage: Storage) {
        storage.save(at: path)
    } 
}
```
Class này cũng như làm 1 lớp môi giới thôi, nó không trực tiếp thực hiện việc lưu, lưu là những *Storage* class sẽ lưu. Ví dụ như FileSystemManager class này:
```swift
class FileSystemSaving: Storage {
    func save(at path: String) {
        // saving...
    }
}
```

Giờ muốn lưu gì thì chỉ cần gọi manage thôi
```swift
func saveLocalData(_ path: String) {

	let fileSystemSaving = FileSystemSaving()
    
	SavingManager.shared.save(path, fileSystemSaving)
}
```

## Conclusion
Những nguyên lý ở trên được coi là The first five principles are principles of design patterns of object-oriented programming. 

Và thực tế cho thế là nó xoay quanh 1 kỹ thuật là sử dụng interface (called protocol in Swift).

Chúng được áp dụng rất nhiều, và thành thạo chúng cũng là một lợi thế đối với những người muốn viết code trở nên sạch sẽ, dễ dử dụng và cải tiến, bảo trì. 

Tuy nhiên, công nghệ hiện nay phát triển rất nhanh và mới lạ, nên càng làm nhiều, càng nhiều kinh nghiệm thì chúng ta nhận ra không phải cứ chăm chăm áp dụng triệt để cả 5 nguyên lý trên là code sẽ sạch đẹp, có khi nó còn phản tác dụng.

Nói gì thì nói đó cũng chỉ là những nguyên lý, áp dụng hay không cũng chẳng sao vì mục tiêu cao nhất của chúng ta vẫn là tạo sản phẩm chạy tốt, khách hàng ủng hộ yêu thích là đã thành công. 

Hiểu được lúc nào nên vận dụng, lúc nào không mới là cách sử dụng tốt nhất.

.