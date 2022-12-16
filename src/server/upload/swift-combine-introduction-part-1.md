Sự ra đời của Combine sẽ dẫn đến một sự thay đổi lớn trong hệ sinh thái phát triển ứng dụng vì Swift sẽ dần nắm lấy sức mạnh của reactive programming.

Nó cung cấp một cách native để xử lý các sự kiện không đồng bộ.

### Publishers and Subscribers.

Publisher đóng vai trò là nhà cung cấp giá trị vì nó sẽ cung cấp các yếu tố cho một hoặc nhiều subscriber.

Nó phải được gắn với subscriber thông qua phương thức receive(subscriber:)

Publishers giao tiếp với subscribers c thông qua một số methods:

- receive(subscription:)
- receive(_ input: Int) -> Subscribers.Demand
- receive(completion:)

Publishers cung cấp một luồng các yếu tố, sau khi được đăng ký, những người đăng ký phía dưới của họ có thể truy cập được.

Giao thức Publisher bao gồm hai loại chung liên quan, đó là Output và Lỗi tương ứng đại diện cho một loại để sản xuất và một loại lỗi. Ngược lại, subscriber nhận hai loại chung liên quan, Input và failure. Vì subscriber và publisher đồng phụ thuộc nên các loại liên kết của họ phải khớp nhau. Tuyên bố một publisher  là khá đơn giản.


```swift 

Publishers.Sequence<[Int], Never>(sequence: [1, 2, 3, 4])

   ```
   
   Điều này khai báo một Sequence publisher sử dụng loại enum 'Publishers' với cấu trúc Trình tự bên dưới.
   
   Nó cần có một hoặc nhiều người subscribers  phương thức nhận (Subscriber) để bắt đầu phân phối các phần tử.
  
  
  ```swift 
   
   let subscriber = Subscribers.Sink<Int, Never>(
                    receiveCompletion: { 
                       completion in
                      print(completion)
                  }) { value in
                      print(value)
                 }
Publishers
      .Sequence<[Int], Never>(sequence: [1, 2, 3, 4])
      .receive(subscriber: subscriber)
   
   
   ```
   
   Lớp Sink tạo ra subscriber và ngay lập tức yêu cầu số lượng giá trị không giới hạn, trước khi trả lại subscriber.
   Nó được khởi tạo bằng cách sử dụng cả hai lần đóng getCompletion và acceptValue, cung cấp một cách thuận tiện để xử lý các giá trị từ publisher, khi chúng đến và được thông báo sau khi hoàn tất. Loại đầu vào cụ thể được khai báo rõ ràng.
   
   ```swift 
   
// prints [1, 2, 3, 4]
// prints 1
// prints 2
// prints 3
// prints 4
// prints finished
     
   ```
   
   A Sequence publisher cũng có thể được khai báo theo cách đơn giản hơn bằng cách sử dụng built-in publisher tích hợp
   
   ```swift 
   
   [1, 2, 3, 4].publisher
     .sink(receiveCompletion: { completion in
         print(completion)
      }) { value in
         print(value)
      }
   
   ```
   
   
  ###  Subjects
  
 Subjects đóng vai trò là Subcriber và Publisher. Mặc dù một subject  có thể nhận các giá trị từ một upstream publisher, nó cũng có thể chuyển các giá trị này cho những downstream subscribers của nó.
   
 ```swift 
 let currentSubject = CurrentValueSubject(1)
 
   ```
   
   Một CurrentValueSubject sẽ giữ một giá trị ban đầu.
 
  ```swift 
  let passthroughSubject = PassthroughSubject()
  
   ```
   
   Một passthrough chuyển qua sẽ chỉ bắt đầu tạo ra các giá trị khi nó được đăng ký
   
   
   Đầu tiên, hãy khai báo một upstream publisher.
   
   ```swift 
   let publisher = [1, 2, 3, 4].publisher
   ```
   
   
   Sau đó, chuyển qua subject
   
   ```swift 
   let passthroughSubject = PassthroughSubject<Int, Never>()
   ```
   
   Chúng ta cần một cách để liên kết chúng với nhau vì Publisher chỉ có thể nhận được loại Đăng ký.
   
   AnySubscriber rất hữu ích vì nó cung cấp một init (s: Subject) bao bọc PassThroughSubject , do đó PassThroughSubject  có thể sử dụng được.
   
   ```swift 
  let anySubscriber = AnySubscriber(passthroughSubject)
let publisher = [1, 2, 3, 4].publisher
publisher.receive(subscriber: anySubscriber)
   ```
   
   Chúng ta đã khai báo một upstream publisher  và một downstream publisher, chúng ta có thể tiến xa hơn một chút. Như đã đề cập trước đó, vì subscriber cũng đóng vai trò là Publisher, chúng ta có thể sử dụng phương thức sink() trên PassThroughSubject để tạo ngay lập tức một downstream subscriber  khác sẽ được liên kết với subject đó.
   
   ```swift 
 let passthroughSubject = PassthroughSubject<Int, Never>()
let anySubscriber = AnySubscriber(passthroughSubject)
let newSubscriber = passthroughSubject
            .sink(receiveCompletion: { completion in
                 print(completion)
             }) { value in
                 print(value)
             }
let publisher = [1, 2, 3, 4].publisher
publisher.receive(subscriber: anySubscriber)
   ```
   
   Cá thể passthroughSubject hoạt động như một subscriber vì nó nhận các phần tử từ upstream publisher - cá thể publisher - đồng thời hoạt động như một publisher chuyển các phần tử đã nhận đến downstream subscriber - cá thể  newSubscriber . 
   
  CurrentValueSubject cho phép truy cập trực tiếp vào giá trị cơ bản của nó bằng cách sử dụng thuộc tính value  cũng như cung cấp cách chuyển một giá trị mới bằng phương thức gửi (**Output**).
   ```swift 
 let currentValueSubject = CurrentValueSubject<Int, Never>(1)
print(currentValueSubject.value)
// 1
currentValueSubject.send(2)
print(currentValueSubject.value)
// 2
currentValueSubject.send(completion: .finished)
currentValueSubject.send(10) // won’t be printed
print(currentValueSubject.value)
// prints 2
   ```
   
 Sau khi một subject - hoặc một subscriber - nhận được một sự kiện hoàn thành, nó sẽ không nhận được inputs nữa.