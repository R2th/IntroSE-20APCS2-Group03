### **1.Phụ thuộc(Dependency) là gì?**

Ví dụ dưới đây để giải thích dễ hiểu hơn về dependency:

Có 2 Class A và Class B và A sử dụng một số method (phương thức) của  B
   => Khi B thay đổi các method A sẽ ít hoặc nhiều bị thay đổi.
* Từ đó có thể dễ dàng thấy A phụ thuộc vào B và B là phụ thuộc của A. A có thể không hoạt động hoặc hoạt động sai,... khi B bị thay đổi.
* Sự việc sẽ càng nặng nề, tệ hại hơn khi A phụ thuộc vào quá nhiều thứ khác ngoài B như C, D, E,... hoặc B được sử dụng từ nhiều thứ khác ngoài A như A1, A2, A3,...
* Hoặc là khi A, A1, A2, A3,.... đều phụ thuộc vào B. Sau đó B cần thay đổi để đáp ứng nhu cầu của A, dẫn đến A1, A2, A3 đều bị ảnh hưởng.
* Điều này sẽ rất nghiêm trọng và có thể chúng ta sẽ không kiểm soát được khi quan hệ giữa chúng ở đây là n-n

Tại sao phụ thuộc là không tốt:
- Giảm khả năng tái sử dụng code
- Gây khó khăn cho test, viết unit test
- Giảm khả năng bảo trì khi mở rộng quy mô dự án

Vậy giải quyết vấn đề trên như thế nào, cách giải quyết làm sao để  A giảm mức ảnh hưởng khi B thay đổi. Chúng ta tìm hiểu về DI (Dependency Injection) bên dưới

### **2. DIP(Dependency inversion principle) nguyên lý cuối cùng trong S.O.L.I.D**

Nội dung nguyên lý: 
- Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
(High-level modules should not depend on low-level modules. Both should depend on abstractions.)
- Interface (abstraction) không nên phụ thuộc vào chi tiết, mà chi tiết nên phụ thuộc vào abstraction.
(Abstractions should not depend on details. Details should depend on abstractions.)

Dựa vào ví dụ giải thích nguyên lý:
- Tôi có 1 module cấp cao là **Ổ điện**
- Tôi có 1 module cấp thấp là **bóng đèn điện**
- Và 1 interface (abstraction) là **đui đèn tròn**

Để một chiếc bóng đèn có thể chiếu sáng, **đui đèn tròn** một đầu sẽ nối với **ổ điện**, đầu còn lại yêu cầu bóng đèn điện chỉ cần là **đuôi tròn** không cần quan tâm nó là loại bóng đèn sợi đốt hay đèn huỳnh quang, đèn halogen, đèn LED (implementation).
 
### **3. DI (Dependency Injection)** 
Điều đầu tiên Dependency Injection được xây dựng dựa trên khái niệm [Inversion of Control](https://en.wikipedia.org/wiki/Inversion_of_control). Điều này nói rằng, một lớp sẽ nhận được các phụ thuộc của nó từ bên ngoài thay phụ thuộc cứng . Dễ hiểu hơn là một lớp sẽ cấu hình các cách để có thể lấy được sự phụ thuộc của nó từ các lớp khác một cách linh động thay vì tự khởi tạo các phụ thuộc.

Tiếp theo, Dependency Injection là một kỹ thuật xử lý truyền các tham số(Dependency)  vào nơi cần sử dụng tại thời điểm **runtime** thay thế cách truyền vào tại thời điểm **compile time**. Quay lại mục 1, sử dụng DI chúng ta có thể giảm thiểu hoặc giữ nguyên source code của class A mỗi khi class B thay đổi để đảm bảo ứng dụng vẫn hoạt động như mong muốn.

Vậy, có các cách truyền sự phụ thuộc (DI) nào? Có một số cách như sau:

* Constructor injection: Truyền sự phụ thuộc qua constructor của class. Đây là cách thông dụng nhất

* Setter injection: Truyền sự phụ thuộc qua hàm setter được cấu hình sẵn trong class

* Interface injection: Đây là cách ít được sử dụng vì nó rườm rà. Class cần inject sẽ implement 1 interface. Interface này chứa 1 method setInject. Container sẽ injection dependency vào class cần inject thông qua việc gọi hàm setInject của interface đó


**Nhược điểm của DI là gì?**

* Khó debug
* Khá khó để học và hiểu khi mới bắt đầu
* Độ phức tạp của code cao hơn
.....

Bài viết có tham khảo từ :

https://medium.com/@harivigneshjayapalan/dagger-2-for-android-beginners-introduction-be6580cb3edb

https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/

https://martinfowler.com/articles/injection.html

https://www.tutorialsteacher.com/ioc/dependency-injection