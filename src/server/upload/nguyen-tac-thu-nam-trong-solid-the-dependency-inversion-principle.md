The Dependency Inversion Principle (DIP) nói rằng những hệ thống có tính mềm dẻo là khi source code dependency của nó chỉ trỏ tới các thành phần trừu tượng (abstraction), chứ không phải là các thành phần cụ thể (concretion).

Trong các ngôn ngữ static, chẳng hạn như Java, thì việc đấy có nghĩa là việc sử dụng các lệnh `use`, `import` hay `include` chỉ nên refer tới các source module bao gồm các interface, abstract class, hoặc các kiểu khai báo abstract khác. Đừng để để source code phải depend trên các thành phần concrete nào.

Người ta cũng áp dụng tương tự cho các ngôn ngữ dynamic như Ruby hay Python. Các dependency không nên trỏ tới các concrete module. Tuy nhiên, những ngôn ngữ dynamic sẽ hơi khó để xác định xem đâu là concrete module. Nhưng về cơ bản thì có thể hiểu đó là các module mà các hàm mà ta đang gọi tới được implement.

Thực ra thì bạn cũng có thể nhận thấy ngay là cái luật "lúc nào cũng phải trỏ đến những abstraction module" có vẻ không được thực tế cho lắm, bởi vì một hệ thống phần mềm buộc phải dựa trên rất nhiều các concrete module. Ví dụ, class `String` trong Java rõ ràng là concrete, và rất là dở hơi nếu chúng ta cố gắng bọc nó lại dưới một tầng abstraction nào đó. 

Có thể nói rằng class `String` là một module rất ổn định (stable). Những thay đổi tới class này là rất hiếm xảy ra và được kiểm soát rất chặt chẽ. Các lập trình viên và kiến trúc sư phần mềm chẳng bao giờ phải lo lắng về những thay đổi thường xuyên hay thất thường của class `String`.

Vì những lý do này, chúng ta nên bỏ qua các concrete module thuộc dạng background của hệ điều hành hay platform mà chúng ta đang phát triển khi áp dụng DIP. Chúng ta chấp nhận các concrete dependency đó vì ta thừa biết là nó chẳng bao giờ thay đổi cả.

Cái mà DIP muốn chúng ta chú ý ở đây là việc tránh tạo ra các dependency trỏ đến các thành phần concrete mà chúng ta *đang* code, *đang* phát triển bởi vì các thành phần này sẽ thường xuyên thay đổi.

# Stable Abstractions
Mỗi thay đổi tới một abstract interface chắc chắn sẽ tương ứng với một thay đổi tới phần implementation của nó. Nhưng điều ngược lại, những thay đổi từ phần implementation không phải lúc nào, hoặc có thể nói là thường thì, sẽ không cần phải đổi ở interface. Do đó có thể thấy rằng phần interface sẽ đỡ mong manh hơn phần implementation.

Những kiến trúc sư và người thiết kế phần mềm có năng lực tốt luôn cố gắng giảm thiểu sự mong manh của interface. Họ luôn cố gắng tìm cách để thêm tính năng vào phần implementation mà không gây thay đổi interface. Cái này người ta gọi là Software Design 101.

Điều này ngụ ý rằng các kiến trúc phần mềm ổn định là những kiến trúc mà sẽ luôn cố gắng tránh khỏi việc phải depend trên những thành phần concrete và luôn ưu tiên sử dụng các interface ổn định. Ta có thể thực hiện điều này bằng một số các coding practice cụ thể sau:

- **Không refer tới các concrete class dễ bị thay đổi**. Thay vào đó, refer tới các interface. Nguyên tắc này áp dụng trong tất cả các ngôn ngữ dù là static hay dynamic. Nó cũng đặt ra những hạn chế với việc tạo ra các object và chúng ta sẽ phải sử dụng tới *Abstract Factory*.
- **Không kế thừa từ các concrete class dễ bị thay đổi**. Thực ra thì đây là hệ quả của ý trước, nhưng nó cũng có một ý nghĩa đặc biệt khác. Trong những ngôn ngữ static, kế thừa là mối quan hệ mạnh và cứng rắn nhất trong tất cả các mối quan hệ giữa source code, do đó nó nên được lưu ý để sử dụng một cách cẩn thận. Trong các ngôn ngữ dynamic, kế thừa có ít vấn đề hơn, nhưng nó vẫn là một sự phụ thuộc, và cứ thận trọng thì vẫn tốt hơn.
- **Không override các concrete function**. Concrete function thường yêu cầu các source code dependency. Khi ta override những function này, ta không những không loại bỏ các dependency này mà còn kế thừa chúng. Để quản lý các dependency đó, bạn nên chuyển hàm thành abstract function và tạo nhiều implementation khác nhau.
- **Không bao giờ mention tên của bất cứ thứ gì có tính concrete và dễ bị thay đổi**. Cái này chỉ đơn giản là một cách nói khác của chính DIP. Để chúng ta lúc code thì có thể để ý vào những dấu hiệu như vậy.

# Factory

Để đảm bảo là chúng ta tuân thủ đúng nguyên tắc này, việc tạo ra các concrete object cần có một bước xử lý đặc biệt. Sự thận trọng này cần được đảm bảo vì trong hầu hết các ngôn ngữ, việc tạo ra một đối tượng kiểu gì cũng sẽ cần đến dependency tới phần định nghĩa của object đó (nói dễ hiểu ra là để tạo object thì kiểu gì ông chẳng phải call hàm init từ class của nó, mà call hàm init đấy thì đã tạo ra dependency đến class của object đấy rồi).

Trong phần lớn các ngôn ngữ hướng đối tượng, như là Java, chúng ta cần sử dụng một Abstract Factory để quản lý các dependency không mong muốn này.

Sơ đồ dưới đây sẽ cho thấy cấu trúc. `Application` sử dụng `ConcreteImpl` thông qua `Service` interface. Tuy nhiên, `Application` phải bằng cách nào đó tạo ra được một instance của `ConcreteImpl` để mà dùng. Để xử lý vấn đề này mà không tạo ra dependency tới `ConcreteImpl`, `Application` gọi tới method `makeSvc` của `ServiceFactory` interface. Method này được implement bởi `ServiceFactoryImpl` class, kế thừa từ `ServiceFactory`. Phần implementation này khởi tạo `ConcreteImpl` và trả về dưới dạng một `Service`.

![](https://images.viblo.asia/f48da5ee-fd57-4c58-93ed-6f6002ccb7bd.png)

Đường cong ở hình trên được gọi là một ranh giới kiến trúc (architectual boundary). Nó chia tách phần abstract với phần concrete. Toàn bộ source code dependency vượt qua đường cong này chỉ trỏ về một hướng, đó là bên abstract.

Đường cong này chia hệ thống thành hai thành phần, một bên abstract và một bên concrete. Phần abstract bao gồm tất cả các high-level business rule của ứng dụng. Phần concrete bao gồm tất cả các detail implementation mà các business rule đó áp dụng.

Chú ý rằng luồng điều khiển vượt qua đường cong này theo hướng ngược lại của các dependency. Các dependency được đảo ngược so với luồng điều khiển, đó là lý do nguyên tắc này được gọi là Dependency Inversion.

# Concrete Components
Phần concrete trong sơ đồ ở phần trước bao gồm một dependency duy nhất tới thành phần concrete, vì thế nó vi phạm DIP. Tuy nhiên đây là một tình huống rất là bình thường. Việc vi phạm DIP không thể nào hoàn toàn xóa bỏ, nhưng nó có thể được gom vào một số ít các concrete component và giữ nó tách biệt khỏi phần còn lại của hệ thống.

Phần lớn các hệ thống sẽ bao gồm ít nhất một concrete component, thường được gọi là `main`, bởi vì nó chứa hàm `main`. Trong trường hợp minh họa trong sơ đồ, hàm `main` khởi tạo `ServiceFactoryImpl` và đặt instance này vào một biến global của `ServiceFactory`. Sau đó `Application` sẽ truy cập factory thông qua biến global này.

# Kết
Khi chúng ta đi tìm hiểu các nguyên tắc kiến trúc, DIP sẽ luôn xuất hiện hết lần này đến lần khác. Đây là một nguyên tắc tổ chức dễ nhận thấy nhất trong sơ đồ kiến trúc. Đường cong trong ví dụ sẽ trở thành architectual boundary trong những bài tiếp theo. Cái cách mà các dependency vượt qua đường cong này theo một hướng và tới phía các abstract entity, sẽ trở thành một quy tắc mới mà chúng ta gọi là Dependency Rule.


-----


*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*