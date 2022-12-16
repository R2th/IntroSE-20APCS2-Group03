# I. Giới thiệu:

-----


**Chain of Responsibility** là một design pattern thuộc loại **Behavior**. Nó cho phép chúng ta xử lý sự kiện bằng  một hoặc nhiều Handler. Chain of Responsibility pattern bao gồm các thành phần chính:
![](https://images.viblo.asia/c06a77d7-6e3e-446f-90d4-4392dd332374.png)
- **Client**: là nơi sẽ gửi các event tới cho cho `Handler Protocol`. Các event có thể là một `struct`, `class`, hoặc các thuộc tính mang dữ liệu...
- **Handler Protocol**: Là `protocol` hoặc `Abstract class` được sử dụng để khai báo các thuộc tính và phương thức mà các **Concrete Handler** bắt buộc phải có để phục vụ cho việc xử lý các event. Các **Abstract Class**, **Base Class** hoặc **protocol** thường được sử dụng để khai báo Handler Protocol.
- **Concrete Handler**: Là những **instance** được sử dụng để **kế thừa** hoặc **implement** các thuộc tính và phương thức được khai báo trong **Handler Protocol** trước đó. Tại đây, các phương thức sẽ được viết các đoạn code logic chi tiết để tiếp nhận và xử lý các event được **client** gửi đến. Nếu trong trường hợp Concrete Handler không thể xử lý event được gửi tới thì nó sẽ chuyển sang Concrete Handler tiếp theo để xử lý.

# II. Cách thức hoạt động:

-----


**Chain of Responsibility** pattern hoạt động dựa vào việc chuyển đổi đối tượng tiếp nhận **event** thành các đối tượng độc lập là các **Handler**. Các **Handler** sẽ được link với nhau thành một chuỗi các **Handler liên tiếp** nhau. Khi một **request** (hoặc event) được gửi tới thì **request** đó sẽ được chuyển đi liên tiếp trong chuỗi **Handler** cho tới khi gặp một **Handler** có thể xử lý **request** đó. Mỗi **Handler** đều có quyền quyết định rằng nó sẽ **xử lý** Request hoặc **chuyển tiếp** Request đó sang Handler tiếp theo.

![](https://images.viblo.asia/455f0557-f0c0-4ce9-a60f-ad52ae97a979.png)

# III. Chain of Responsibility được xử dụng khi nào?

-----


- Khi muốn tách riêng  tượng gửi và tượng nhận yêu cầu.
- Khi có nhiều cách thức để xử lý cho cùng một yêu cầu được gửi tới.
- Khi không muốn xác định rõ ràng cách thức xử lý một sự kiện được gửi tới.
- Khi muốn đưa ra yêu cầu cho một trong nhiều đối tượng mà không chỉ định rõ ràng  tượng nào sẽ nhận và xử lý yêu cầu.

# IV. Chain of Responsibility trong iOS:

-----


**Chain of Responsibility** được sử dụng và áp dụng trong **UIKit framework** của iOS. Trong **UIKit**, **UIResponder** đóng vai trò là **Handler** được tạo và kết nối thành một chuỗi các **UIResponder** với nhau. Khi tiếp nhận được một sự kiện tương tác tới từ **UIView** thì **UIResponder** của UIView đó sẽ quyết định xử lý sự kiện hoặc tiếp tục **chuyển tiếp** sự kiện đó đi cho **Super View** của UIView đó tiếp nhận và xử lý sự kiện.

![](https://images.viblo.asia/961616fd-dc61-43dd-8dc0-4737be61574b.png)

Ngoài ra, **UIKit** cũng ứng dụng việc sử dụng Chain of Responsibility pattern trong việc xử lý các **Error** của mình. Khi một Error được gửi tới thì các Concrete Handler sẽ tiếp nhập và quyết định xử lý hoặc chuyển nó sang Concrete Handler tiếp theo để tiếp tục quá trình xử lý lỗi.

# V. Ví dụ:

-----


![](https://images.viblo.asia/c31b3f97-5ca7-4ef9-b2aa-f72953f48c3d.png)
## 1. Handler Interface:
- Được sử dụng để khai báo cấu trúc của một Handler. Handler Interface thông thường sẽ khai báo một phương thức để xử lý Request hoặc đôi lúc sẽ có thêm cả phương thức để gán giá trị cho Handler tiếp theo.
```swift
protocol Handler {
    func setNext(_ handler: Handler)
    func handle(_ request: Request)
}
```

## 2. Base Handler:
- Là class được tạo ra để khai báo các trường dữ liệu trỏ tới Handler tiếp theo trong chuỗi và implement các thao tác xử lý mặc định của Handler. Phía Client có thể tạo ra một chuỗi Handler bằng việc sử dụng Contructor hoặc các hàm Setter được viết trong class này.
```swift
class BaseHandler: Handler {
    var next: Handler?
    
    init(_ next: Handler?) {
        self.next = next
    }
    
    func setNext(_ handler: Handler?) {
        self.next = handler
    }
    
    func handle(_ request: Request) {
        
    }
}
```

## 3. Concrete Handler:
- Là các Handler được tạo ra từ việc kế thừa lại Base Handler. Các Concrete Handler sẽ implement cụ thể từng hành động riêng biệt. Mỗi Handler sẽ xử lý Request bằng một cách khác nhau. Concrete Handle sẽ quyết định chính nó sẽ xử lý Request hoặc chuyển Request đó sang cho Concrete Handle tiếp theo của chuỗi xử lý.
```swift
class ConcreteHandler: BaseHandler {
    override func handle(_ request: Request) {
        if canHandle {
            // Detail implement
        } else {
            next?.handle(request)
        }
    }
}
```

## 4. Client:
- Client là nơi khai báo chuỗi Handler và là nơi gửi Request. Request có thể gửi tới bất cứ phần tử nào trong chuỗi, không bắt buộc phải là phần tử đầu tiên.
```swift
class Client {
    
    func sendRequest() {
        let thirdHandler = ConcreteHandler(nil)
        let secondHandler = ConcreteHandler(thirdHandler)
        let firstHandler = ConcreteHandler(secondHandler)
        
        let request = Request()
        
        firstHandler.handle(request)
    }
}
```

# VI. Tài liệu tham khảo:

-----


- Design Pattern by Tutorials - Raywenderlich
- Chain of Responsibility by [refactoring.guru](https://refactoring.guru/design-patterns/chain-of-responsibility)