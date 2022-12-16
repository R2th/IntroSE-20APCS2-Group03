**Singleton pattern**, **Delegation pattern**, hay **Builder pattern**....  Anh em thấy những cụm từ trên có quen thuộc không?

Đây chính là các tên của các design pattern. Design Pattern là cụm từ phổ biến trong lĩnh vực công nghệ thông tin, ở đâu chúng ta cũng có thể thấy nói về nó. Trong quá trình làm việc  có thể chúng ta dùng rồi nhưng chúng ta không để ý đến.. Tuy nhiên sẽ có bạn vẫn sẽ mông lung chưa rõ nó là gì và tại sao lại quan trọng và phổ biến như thế. Trong bài hôm nay mình sẽ đi vào giới thiệu về design pattern cơ bản và sau đó đi đến giới thiêụ một design pattern cũng khá là phổ biến trong lập trình đó là **Command Pattern** để những anh em chưa hiểu về nó có cái nhìn trực quan hơn.

Các nội dung chính trong bài:
+ Design Pattern.
+ Command Pattern.
+ Cách sử dụng Command Pattern.
+ Ứng dụng của Command trong lập trình IOS - Có thể bạn chưa biết.

## **Design pattern**
> Design patterns là các giải pháp đã được tối ưu hóa, được tái sử dụng cho các vấn đề lập trình mà chúng ta gặp phải hàng ngày. Nó là một khuôn mẫu đã được suy nghĩ, giải quyết trong tình huống cụ thể rồi. ... Design patterns có thể thực hiện được ở phần lớn các ngôn ngữ lập trình.

Nhìn định nghĩa có thể hiểu rằng, trong những vấn đề cụ thể mà bạn có gặp phải sẽ có thể có nhiều cách giải quyết tuy nhiên độ tối ưu của mỗi cách là khác nhau, Design pattern sinh ra để giải quyết vấn đề 1 cách tối ưu nhất, cung cấp các giải pháp trong lập trình ngoài ra giúp thiết kế của chúng ta linh hoạt, dễ dàng thay đổi và bảo trì hơn.

**Phân loại Design Pattern:**
Bao gồm 3 loại: 
+ Creational Patterns (nhóm khởi tạo): Nó cung cấp một giải pháp để tạo ra các object và che giấu được logic của việc tạo ra nó, thay vì tạo ra object một cách trực tiếp.
+ Structural Patterns (nhóm cấu trúc): Nó dùng để thiết lập, định nghĩa quan hệ giữa các đối tượng.
+ Behavioral Patterns (nhóm hành vi): Nhóm này dùng trong thực hiện các hành vi của đối tượng.

##  **Command Pattern**

Command Pattern là một trong 23 design pattern Gang of Four nổi tiếng. Command pattern thuộc nhóm các pattern hành vi:
Đóng gói tất cả thông tin cần thiết vào 1 đối tượng để thực hiện hành động hay kích hoạt một sự kiện thực hiện sau đó. Các thông tin có thể bao gồm tên phương thức, các biến và giá trị cần thiết...hay đơn giản hơn đó là nó cho phép chuyển yêu cầu thành đối tượng độc lập, có thể được sử dụng để tham số hóa các đối tượng với các yêu cầu khác nhau như log, queue (undo/redo), transtraction.

Dưới đây là các thành phần cần có của 1 command pattern.

![](https://images.viblo.asia/abbaa49d-a84a-432d-be2f-70f509321360.png)

Trong đó:

+ **Command** : là một interface hoặc abstract class, chứa một phương thức trừu tượng thực thi (execute) một hành động (operation). Request sẽ được đóng gói dưới dạng Command.
+ **ConcreteCommand** : là các implementation của Command. Định nghĩa một sự gắn kết giữa một đối tượng Receiver và một hành động. Thực thi execute() bằng việc gọi operation đang hoãn trên Receiver. Mỗi một ConcreteCommand sẽ phục vụ cho một case request riêng.
+ **Client** : tiếp nhận request từ phía người dùng, đóng gói request thành ConcreteCommand thích hợp và thiết lập receiver của nó.
+ **Invoker** : tiếp nhận ConcreteCommand từ Client và gọi execute() của ConcreteCommand để thực thi request.
+ **Receiver** : đây là thành phần thực sự xử lý business logic cho case request. Trong phương thức execute() của ConcreteCommand chúng ta sẽ gọi method thích hợp trong Receiver.


Dưới đây là sequence diagram của command pattern.
![](https://images.viblo.asia/a9ea70d4-d224-413e-8a54-db887c331554.png)


Client và Invoker sẽ thực hiện việc tiếp nhận request. Còn việc thực thi request sẽ do Command, ConcreteCommand và Receiver đảm nhận.

## **Cách sử dụng Command Pattern**

Để hiểu cách sử dụng nó chúng ta sẽ thông qua 1 ví dụ như sau:
Cùng khởi tạo playground để demo cách sử dụng:
Chúng ta có một đối tượng Light có 2 phương thức là  switchOn và switchOff: 
Đây đóng vai trò là 1 **class request**
``` swift
class Light {
    func switchOn() {
        print("light on")
    }
    
    func switchOff() {
        print("light off")
    }
}
```

Như đã mô tả ở phần trên thì Command pattern cần có 5 thành phần vì vậy chúng ta sẽ từng bước xây dựng nó.
Chúng ta xây dựng 1 interface tên là **Command** không trực tiếp tắt bật đèn mà chỉ ra lệnh cho light on or off.

```swift
protocol Command {
    func execute()
}
```

sau đó chúng ta sẽ khởi tạo 2 class CommandOff và CommandOn implement Command:
2 class này chính là **ConcreteCommand**

```swift
class CommandOff: Command {
    func execute() {
        Light().switchOff()
    }
}


class CommandOn: Command {
    func execute() {
        Light().switchOn()
    }
}
```

Tiếp theo tiến hành đóng gói các command này vào trong 1 bộ điều khiển gọi là Remote Control:
class này đóng vai trò là **invoker**

``` swift
class RemoteControl {
    private var command: Command?
    
    func setCommand(command: Command) {
        self.command = command
    }
    
    func run() {
        command?.execute()
    }
}
```

Vậy thì với RemoteControll chúng ta có thể truyền các command khác nhau vào để thực hiện các chức năng riêng biệt khác nhau. Re quest được đóng giói dưới dạng object đúng như trong tư tưởng của pattern.
 
 Chúng ta tạo 1 **client**  để thực thi và xem kết quả:
``` Swift
let remote = RemoteControl()
let commandOff = CommandOff()
remote.setCommand(command: commandOff)
remote.run()
```

và kết quả là: `light off`

Từ ví dụ trên chắc ae cũng có thể hiểu được cơ bản cách thức để xây dựng và sử dụng của một command pattern.

Command pattern khá hữu dụng nhưng ta nên sử dụng những khi:
* Khi cần tham số hóa các đối tượng theo một hành động thực hiện.
* Khi cần tạo và thực thi các yêu cầu vào các thời điểm khác nhau.
* Khi cần hỗ trợ tính năng undo, log , callback hoặc transaction.

## **Ứng dụng của Command trong lập trình IOS - có thể bạn chưa biết**
 Việc thiết kế hay custom các component theo yêu cầu của khách hàng là việc làm khá thường xuyên với các anh em lập trình nói chung và ios nói riêng. Hãy tưởng tượng khi tạo ra một UIButton đẹp lung linh và muốn đưa nó ra toàn thể ae sử dụng về sau và ứng dụng trong nhiều mảng khác nhau tuy nhiên vấn đề là bạn chưa biết nó sẽ sử dụng cho những mục đích khác nhau nào.
 
Các bạn có thể nghĩ đến trường hợp **inheritance** - tạo các sub class cho button mà bạn đã tạo ra để từ đó xử lí cho mỗi trường hợp khác nhau nhưng với 1 ứng dụng phức tạp việc tạo ra  quá nhiều sub class cho 1 component cũng là 1 cái gi đó khá là không ổn đúng không ạ.

Chúng ta có thể xử lí vấn đề theo hướng command - đóng gói ý tưởng, những action cần làm khi button được ấn hoặc menu item được chọn. Tức là gom code để xử lý việc ấn button hoặc chọn menu trong object riêng. Những action này chính là những commands của Command pattern.

Hiểu đơn giản hơn đó là lưu object command với mỗi button sau đó định nghĩa command cho mọi button phải làm.