### **Khái Niệm**
Trong lập trình hướng đối tượng, **command design pattern** là *behaviroal*,  mục đích dùng để gói lại tất cả các thông tin cũng như action trên các logic khác nhau, bao gồm như tên biến tên function và parameter của function.
Command design pattern có 4 điều khoản được liên kết với nhau: *command, receiver, invoker, client*

1. **Command**: A command được biết về việc nhận và thực thi các method của việc nhận. Giá trị các biến của phương thức nhận được lưu trong các command.
2. **Receiver**: The receiver là object để thực thi những phương thức và cũng được store trong command thông qua command object bởi aggregation(cái này sẽ giải thích sau), receiver được thực hiện khi execute() method trong command được gọi.
3. **Invoker**: The invoker object được biết là thực hiện execute() như thế nào, nó được xem như một người kế toán để thực thi các command và chỉ biết về các command interface(interface thế nào thì các bạn đọc thêm nhé, hoặc cần mình sẽ giải thích sau nè).
4. **Client**: The client là quyết định sẽ thực thi tại điểm nào, command nào và pass command object đến invoker object.


-----


Tóm gọn lại thì nếu không dùng command design pattern là khi một button mà có nhiều action kiểu như hình.
![](https://images.viblo.asia/fcf991fb-559e-44d1-a80f-878b6f02dd70.png)
![](https://images.viblo.asia/6dc1afda-16b6-40e0-91ee-2708b6cd871b.png)
=> việc mỗi button sẽ có một class để xử lý logic khiến việc code trở nên khó bảo trì về sau do đó command design pattern ra đời.


-----


### **Giải pháp được đùng:**
![](https://images.viblo.asia/16e50fc1-7b6e-43bb-bb11-f87760be1a21.png)
![](https://images.viblo.asia/7f47bd93-c76d-46d6-b7c5-3de9cbec8c24.png)
![](https://images.viblo.asia/0f11e52b-7e7b-4c22-ae40-7544d2dd7f5d.png)
 => thay vì mỗi button sẽ có một class chúng ta sẽ có một command để wrapper nó lại.
 

-----


 **Code ví dụ mình sẽ dùng ngôn ngữ Golang:**
 ban click vào nhé: https://gitlab.com/shop-system2/go-libs/-/blob/master/design-pattern/behavioral/command.go
 
 để biết thêm: https://en.wikipedia.org/wiki/Command_pattern
                         https://refactoring.guru/design-patterns/command

-----