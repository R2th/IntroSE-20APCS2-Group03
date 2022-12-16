## Tổng quan về bộ nhớ Stack và Heap
Chắc hẳn bất cứ ai trong chúng ta đều đã từng nghe đến khái niệm về 2 loại bộ nhớ Stack và Heap khi tìm hiểu về cách các ngôn ngữ lập trình quản lý và phân phối bộ nhớ của máy tính. Một cách dễ hiểu thì Stack và Heap là **những vùng nhớ được tạo ra ở trên RAM để lưu trữ dữ liệu khi thực thi các chương trình máy tính.** Giữa Stack và Heap có một số điểm khác nhau cơ bản mà chúng ta có thể kể ra như sau <br>


| Stack | Heap | 
| -------- | -------- |
| Các vùng nhớ trong Stack sẽ được giải<br>phóng tự động khi không còn sử dụng | Các vùng nhớ trong Heap sẽ cần được<br>giải phóng một cách thủ công   |
|Hệ điều hành tự động phân phối các vùng<br>nhớ trong Stack theo cơ chế LIFO|Các vùng nhớ được phân phối theo<br>theo thứ tự ngẫu nhiê |
|Không thể bị phân mảnh|Rất dễ bị phân mảnh
Có kích thước cố định dựa theo OS|Kích thước có thể tăng giảm tuỳ nhu cầu
Tốc độ cấp phát và truy cập cao| Tốc độ cấp phát và truy cập chậm hơn
<br>Thực sự nếu để nói chi tiết về Stack và Heap thì có thể nói cả ngày vẫn không hết chuyện tuy nhiên đây không phải mục đích chính của bài viết này nên mình chỉ nêu ra một vài điểm cơ bản như trên, bạn nào có nhu cầu tìm hiểu kỹ hơn thì có thể ngó  [qua bài này trên StackOverflow nha](https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap)
## Value Type và Reference Type
Ở hầu hết các ngôn ngữ lập trình thì dữ liệu đều được chia làm 2 kiểu là **Value Type** (tham trị) và **Reference Type** (tham chiếu). Tất nhiên, Swift cũng không phải là ngoại lệ:<br>
* Struct, Int, Double,... là kiểu value type
* Class, Function, Closure là kiểu reference type

Điểm khác biệt lớn nhất ta cần nhớ giữa hai kiểu này đó là:
* Các biến Value Type lưu trực tiếp giá trị của biến trên vùng nhớ Stack
* Các biến Reference Type lưu địa chỉ của Instance được ra trong vùng nhớ Heap

Vì các biến Value Type lưu giá trị trên vùng nhớ Stack mà mọi hoạt động cấp phát cũng như giải phóng trên vùng nhớ này đều được tiến hành tự động bởi hệ điều hành nên chúng ta sẽ không nhắc đến nó trong nội dung bài này mà sẽ chỉ tập chung vào cách cơ chế ARC xử lý vùng nhớ đối với các biến Reference Type.

Đầu tiên, chúng ta hãy xem một ví dụ với đoạn code sau đây

```
class User{
    var age = 1
    init(age: Int){
        self.age = age
    }
}
var user1: User
user1 = User(age: 21)
var user2 = User(age: 25)
user2 = user1
```
Khi chạy đoạn code này, đầu tiên máy tính sẽ tạo cho chúng ta một biến user1 để trống![](https://images.viblo.asia/f21915ce-de27-4d56-9597-6a97ca5f8267.png)

Sau đó khi chúng ta khởi tạo một đối tượng từ class User và gán vào biến user1, Swift sẽ tạo ra một Instance bên trong bộ nhớ Heap và lấy địa chỉ của Instance này bỏ vào trong biến user1 đã được tạo sẵn từ trước.
![](https://images.viblo.asia/b54f7b82-a33b-4cd5-94ef-27f7c768262e.png)

Quy trình này diễn ra tương tự đối với biến user2![](https://images.viblo.asia/6f184e1b-7c12-4cd4-8154-af4425aea13c.png)

Và khi chúng ta thực hiện gán user2 = user1 thì mọi chuyện sẽ diễn ra như sau![](https://images.viblo.asia/e47ab946-9ee6-4d52-9402-32beed639c81.png)

Ta có thể thấy địa chị được lưu trong biến user2 đã được thay đổi thành địa chỉ đang được lưu trong biến user1. Bây giờ, bất cứ thay đổi gì được thực hiện từ một trong hai biến đều sẽ dẫn đến thay đổi của Instance bên trong Heap.

Một câu hỏi được đặt ra là chuyện gì sẽ xảy ra đối với Instance có địa chỉ 0x60 kia bên trong Heap. Đây chính là lúc mà ARC thể hiện vai trò của mình.
## Automatic Reference Counting

Trước khi tìm hiểu xem ARC là gì, chúng ta hãy xem qua một số khái niệm được sử dụng![](https://images.viblo.asia/0ff198d2-0fd9-4e05-a613-1e554fd64cc0.png)
Mỗi mũi tên được gọi là một Strong Reference và số lượng mũi tên trỏ vào một Instance được gọi là Reference Counting. Như data model được vẽ ở trên, chúng ta có thể thấy có một Instance đang có Reference Counting = 2 mà Instance còn lại có Reference Counting = 0. Đây là lúc mà ARC hành động. Cơ chế hoạt động của ARC có thể hiểu một cách đơn giản như sau

> Nếu một instance không có còn strong reference nào hay được hiểu là reference counting = 0 thì cơ chế ARC sẽ xóa và giải phóng bộ nhớ cho instance đó trong Heap

<br>Rất tiện phải không nào, thay vì phải xoá các Instance một cách thủ công bằng cách dòng lệnh để giải phóng bộ nhớ thì Swift đã tự động hoá việc đó cho chúng ta với cơ chế ARC. Tuy nhiên nó không có nghĩa là chúng ta có thể lập trình một cách vô tư mà không cần quan tâm đến vấn đề  bộ nhớ, vẫn có những trường hợp chúng ta cần phải động tay động chân một chút để ARC có thể giải phóng các Instance. Hãy xem ví dụ dưới đây
```
class Person {
    let name: String
    init(name: String) {
        self.name = name
    }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let name: String
    init(name: String) {
        self.name = name
    }
    var owner: Person?
    deinit { print("Apartment \(name) is being deinitialized") }
}

var person: Person? = Person(name: "Tien dep trai")
var apartment: Apartment? = Apartment(name: "Vinhome Riveside")

person?.apartment = apartment
apartment?.owner = person
```
Các bạn có nhận ra đoạn code này gặp vấn đề gì không, có lẽ là nhiều bạn thấy nó hoàn toàn bình thường đúng không. Mình cũng thấy nó bình thường nhưng chúng ta hãy cùng ngó qua Data model mà nó tạo ra để xem có thực sự như vậy không nhé.![](https://images.viblo.asia/ddce2359-9ae7-4708-8611-61fa2ff5f463.png)

Dễ dàng nhận thấy điểm đặc biệt ở đây là 2 Instance bên trong Heap đang tự tham chiếu đến nhau, nhưng mà như vậy thì có vấn đề gì ? Chúng ta hãy thử giải phóng 2 Instance này bằng cách đặt 2 biến **person** và **apartment** bằng **nil** xem chuyện gì sẽ xảy ra nhé.

![](https://images.viblo.asia/0a384422-989c-4411-90de-5a48f41a7da5.png)

Hai tham chiếu từ 2 biến **person** và **apartment** đến Instance bên trong Heap đã biến mất, nhưng mà 2 Instance này vẫn giữ tham chiếu đến nhau khiến cho Reference Counting của cả 2 không thể bằng 0. Chúng ta lại không thể can thiệp đến các Instance bêng trong Heap để xoá bỏ các tham chiếu này. Điều này làm cho ARC không thể giải phóng 2 Instance này và chúng sẽ tồn tại mãi ở đó. Trường hợp này được gọi **Strong Reference Cycle** và hiện tượng mà nó gây ra được gọi là **Memory Leak**
## Memory Leak
HIểu một cách đơn giản, memory leak là tình huống xảy ra khi chúng ta muốn huỷ 1 Instance nhưng trên thực tế Instance đó vẫn tồn tại bên trong bộ nhớ Heap. Để giải quyết vấn đề này, Swift cung cấp cho chúng ta 1 cơ chế gọi là **Weak Reference**.

Cách sử dụng **Weak Reference** cũng rất đơn giản, chúng ta chỉ cần xác định xem đâu là đoạn code gây ra hiện tượng **Strong Reference Cycle** và đặt keyword **weak** vào đó là xong. Ví dụ như với đoạn code bên trên ta có thể đặt weak vào trước biến **owner** trong class **Person**

```
class Apartment {
    let name: String
    init(name: String) {
        self.name = name
    }
    weak var owner: Person?
    deinit { print("Apartment \(name) is being deinitialized") }
}
```

Lúc này data model ta đã vẽ ở trên sẽ trở thành như hình dưới
![](https://images.viblo.asia/dfaac247-315b-4bff-b5f8-5adb88787bee.png)
Có thể nhận thấy Reference Counting của Instance Person lúc này đã = 0 và có thể được giải phóng bởi ARC. Sau khi Instance Person được giải phóng thì Reference Counting của Instance Apartment cũng sẽ về 0 và sẽ bị huỷ bởi ARC. Như vậy tình trạng Memory Leak đã được giải quyết một cách dễ dàng.

Ngoài cách sử dụng **Weak Reference**, Swift còn cung cấp cho chúng ta một giải pháp khác để giải quyết vấn đề này là sử dụng **Unowned Reference**. Tuy nhiên mình sẽ không đề cập đến cách này ở đây, bạn nào có hứng thú có thể xem qua bài viết [này](https://viblo.asia/p/hieu-ro-hon-ve-weak-va-unowned-trong-swift-yMnKMY6rK7P) trên Viblo để hiểu rõ hơn nhé.
## Memory Management trong Closure
Closure cũng là kiểu Reference Type giống như Class, vì vậy nếu bên trong class có một property là closure mà bên trong closure đó lại gọi đến một property của class thì sẽ lại xảy ra tình trạng Memory Leak. Hãy xem qua ví dụ dưới đây để hình dung rõ hơn
```
class Fibonacci{
    var value: Int
    init(value: Int) {
        self.value = value
    }
    lazy var fibonacci: () -> Int = {
        var a = 0
        var b = 1
        
        for _ in 0..<self.value{
            let temp = a
            a = b
            b = temp + a
        }
        return a
    }
    deinit {
        print("\(value) was deinitialized")
    }
}
var fi: Fibonacci? = Fibonacci(value: 7)
fi?.fibonacci()
```
Để mô tả đoạn code này, ta có thể vẽ data model như sau![](https://images.viblo.asia/8327822e-0ef3-4037-b975-525f96987622.png)

Dĩ nhiên trong trường hợp này thì chúng ta không thể sử dụng weak/unowned như ví dụ trước để giải quyết vấn đề được mà phải sử dụng **closure capture list**. Capture list sẽ quy định luật để lấy giá trị của property trong closure. Cách sử dụng thì cũng rất đơn giản, ta chỉ cần thêm syntax **[ weak self ] in** ở phần body của closure như sau
```
lazy var fibonacci: () -> Int = {  [ weak self ] in      

        var a = 0
        var b = 1
    
        // lúc này self có thể nil, nên phải check optional
        
        guard let max = self?.value else {
            fatalError() // return luôn không cần return type
        }
        
        for _ in 0..<max{
            let temp = a
            a = b
            b = temp + a
        }
        return a
    }
```
Như vậy là vấn đề đã được giải quyết, các bạn có thể tự vẽ lại data model để có thể hiểu rõ hơn nhé.
## Tổng kết
Trên đây là những hiểu biết của mình về cách mà Swift quản lý bộ nhớ của chương trình, mong là nó có thể giúp các bạn có một cái nhìn rõ ràng hơn về ARC hay Memory Leak. Nội dung bài viết được tham khảo từ [Swift Basic](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) và [Kipalog](https://kipalog.com/posts/Quan-ly-bo-nho-trong-Swift). Hẹn gặp lại các bạn trong những bài viết tiếp theo.