### 1. Giới thiệu
Trong công nghệ phần mềm, Design Pattern mô tả việc xây dựng giải pháp cho những vấn để phổ biến nhất trong thiết kế phần mềm. Nó đại diện cho các best practices được phát triển trong một thời gian dài thông qua thử nghiệm và lỗi bởi các developer có kinh nghiệm.<br>
Trong bài viêt này, chúng ta sẽ tìm hiểu về creational design patterns và các loại của chúng. Chúng ta cũng sẽ xem một vài ví dụ và cùng bàn luận về các điều kiện mà các design pattern đó phù hợp để thiết kế vào.<br>
### 2. Creational Design Patterns
Creational Design Patterns có liên quan đến việc cách khởi tạo các object. Chúng giảm độ phức tạp và bất ổn khi tạo các objects trong 1 cách thức kiểm soát.<br>
Toán tử mới thường được coi là có hại vì nó phân tán các đối tượng trên toàn ứng dụng.  Theo thời gian, việc thay đổi triển khai có thể trở nên khó khăn vì các lớp trở nên gắn kết chặt chẽ.<br>
Creational Design Patterns giải quyết vấn đề này bằng cách tách riêng hoàn toàn client khỏi quá trình khởi tạo thực tế<br>
Trong bài này, chúng ta cùng bàn về 4 loại Creational Design Patterns:
* Singleton – Đảm bảo rằng chỉ có duy nhất 1 instance của object tồn tại suốt ứng dụng.
* Factory Method – Tạo các đối tượng của một số classes liên quan mà không chỉ định chính xác đối tượng được tạo.
* Abstract Factory – Tạo ra các đối tượng phụ thuộc liên quan giống nhau.
* Builder – Xây dựng các đối tượng phức tạp bằng cách sử dụng phương pháp từng bước.
### 3. Singleton Design Pattern
Mẫu thiết kết Singleton nhằm mục đích kiểm tra việc khởi tạo các đối tượng của class cụ thể bằng cách đảm bảo rằng chỉ có một íntatnce của object tồn tại trong Máy ảo Java.<br>
Một Singleton class cũng cung cấp một điểm global access duy nhất cho đối tượng để mỗi lần gọi tiếp theo đến điểm truy cập chỉ trả về đối tượng cụ thể đó.
#### Ví dụ về Singleton Pattern
Mặc dù mẫu Singleton được giới thiệu bởi [GoF](http://wiki.c2.com/?GangOfFour), việc triển khai ban đầu được biết là có vấn đề trong các kịch bản về multithreaded.<br>
Vì vậy, ở đây, chúng ta sẽ theo một cách tiếp cận tối ưu hơn, sử dụng static inner class:<br>
```
public class Singleton  {    
    private Singleton() {}
     
    private static class SingletonHolder {    
        public static final Singleton instance = new Singleton();
    }
 
    public static Singleton getInstance() {    
        return SingletonHolder.instance;    
    }
}
```
Ở đây, chúng ta đã tạo ra một static inner class nắm giữ instance của một Singleton class. Nó sẽ chỉ tạo duy nhất 1 instance khi ta gọi hàm getInstance() chứ không phải khi outer class được load.<br>
Đây là một cách tiếp cận được sử dụng rộng rãi cho một Singleton class vì nó không yêu cầu đồng bộ hóa, là thread safe, thực thi lazy initialization và tương đối ít bản mẫu.<br>
Ngoài ra, lưu ý rằng hàm khởi tạo (constructor) có access modifier là private.  Đây là một yêu cầu để tạo Singleton vì khi một public constructor có nghĩa là bất kỳ ai cũng có thể truy cập nó và bắt đầu tạo các instance mới.<br>
#### Khi nào sử dụng mẫu thiết kế Singleton 
* Đối với các resources khá đắt để tạo (như các đối tượng kết nối cơ sở dữ liệu).
* Đó là một  good practice để giữ tất cả các logger như Singletons làm tăng hiệu suất.
* Các classes cung cấp quyền truy cập vào cài đặt cấu hình cho ứng dụng.
* Các classes có chứa reesource được truy cập trong chế độ chia sẻ.
### 4. Factory Method Design Pattern
Đây là một trong những mẫu thiết kế được sử dụng phổ biến nhất. Theo [GoF](http://wiki.c2.com/?GangOfFour), mẫu thiết kế này định nghĩa 1 inteface để tạo các objects, nhưng để các class con quyết định loại class nào được tạo ra.<br>
Mẫu thiết kế này ủy thác trách nhiệm khởi tạo một class từ client đến một class cụ thể bằng cách tạo một loại hàm tạo ảo.<br>
Để đạt được điều này, chúng ta dựa vào một factory cung cấp cho ta các đối tượng, ẩn các chi tiết của phần implementation.  Các objects được tạo được truy cập bằng một inteface chung.<br>
#### Ví dụ
Trong ví dụ này, chúng tôi sẽ tạo 1 interface là Polygon sẽ được implements bởi một số class cụ thể.  Một PolygonFactory sẽ được sử dụng để tìm, lấy các đối tượng thuộc loại này:<br>
![](https://images.viblo.asia/175502ed-69d9-4b2f-9bfa-37aa337ffeb6.png)
Hãy tạo Polygon interface:<br>
```
public interface Polygon {
    String getType();
}
```
Tiếp theo, hãy cùng tạo các class con như `Square`, `Triangle`, ... Những class này sẽ implement `Polygon` và trả về đối tượng kiểu `Polygon`.<br>
Bây giờ, hãy tạo 1 factory lấy số cạnh làm argument và trả về các implementation tương ứng:
```
public class PolygonFactory {
    public Polygon getPolygon(int numberOfSides) {
        if (numberOfSides == 3) {
            return new Triangle();
        }
        if (numberOfSides == 4) {
            return new Square();
        }
        if (numberOfSides == 5) {
            return new Pentagon();
        }
        if (numberOfSides == 7) {
            return new Heptagon();
        }
        else if (numberOfSides == 8) {
            return new Octagon();
        }
        return null;
    }
}
```
Lưu ý cách client có thể dựa vào factory này để cung cấp cho chúng ta một Polygon thích hợp mà không phải khởi tạo đối tượng trực tiếp.
#### Khi nào sử dụng mẫu thiết kế Factory Method
* Khi việc implementation một interface hoặc một abstract class dự kiến sẽ thay đổi thường xuyên.
* Khi implementation hiện tại không thể dễ dàng thích ứng với thay đổi mới.
* Khi quá trình khởi tạo tương đối đơn giản và hàm tạo chỉ yêu cầu một số tham số.
### 5. Abstract Factory Design Pattern
Trong phần trên, chúng ta đã thấy cách sử dụng mẫu thiết kế Factory Method để tạo các đối tượng liên quan đến một họ các đối tượng.<br>
Ngược lại, Mẫu thiết kế Abstract Factory được sử dụng để tạo các họ của các đối tượng liên quan hoặc phụ thuộc.  Đôi khi nó còn được gọi là một factory của các factories.<br>
Có thể hình dung hoạt động của mẫu thiết kế này thông qua ảnh sau:
![](https://images.viblo.asia/6983bdde-1c02-450b-ab7d-53f4542aa51f.jpg)
Tìm hiểu rõ hơn về cách implementation các bạn có thể tham khảo thêm hướng dẫn chi tiết về [Abstract Factory](https://www.baeldung.com/java-abstract-factory-pattern)
### 6. Builder Design Pattern
Mẫu thiết kế này tập trung vào sự trừu tượng và rất tốt khi xử lý các đối tượng phức tạp, tuy nhiên, thiết kế hơi phức tạp.<br>
Ví dụ này chỉ có một class, BankAccount chứa trình xây dựng dưới dạng static inner class:
```
public class BankAccount {
     
    private String name;
    private String accountNumber;
    private String email;
    private boolean newsletter;
 
    // constructors/getters
     
    public static class BankAccountBuilder {
        // builder code
    }
}
```
Lưu ý rằng tất cả các access modifiers trên các fields được khai báo là private vì chúng ta không muốn các đối tượng bên ngoài truy cập trực tiếp vào chúng.<br>
Hàm khởi tạo (constructor) cũng là private để chỉ Builder giao cho cho lớp này mới có thể truy cập nó.  Tất cả các thuộc tính được thiết lập trong hàm tạo được trích xuất từ builder mà chúng ta cung cấp làm argument.<br>
Chúng ta định nghĩa `BankAccountBuilder` trong một static inner class:
```
public static class BankAccountBuilder {
     
    private String name;
    private String accountNumber;
    private String email;
    private boolean newsletter;
     
    public BankAccountBuilder(String name, String accountNumber) {
        this.name = name;
        this.accountNumber = accountNumber;
    }
 
    public BankAccountBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
 
    public BankAccountBuilder wantNewsletter(boolean newsletter) {
        this.newsletter = newsletter;
        return this;
    }
     
    public BankAccount build() {
        return new BankAccount(this);
    }
}
```
Lưu ý rằng chúng ta đã khai báo cùng một tập các trường mà class bên ngoài chứa.  Bất kỳ trường bắt buộc nào cũng được yêu cầu làm đối số cho hàm tạo của lớp bên trong trong khi các trường tùy chọn còn lại có thể được chỉ định bằng cách sử dụng các phương thức setter.<br>
Việc implementation này cũng hỗ trợ cách tiếp cận thiết kế trôi chảy bằng cách có các phương thức setter trả về builder object.<br>
Cuối cùng, phương thức xây dựng gọi hàm tạo riêng của lớp bên ngoài và truyền chính nó làm đối số.  BankAccount được trả lại sẽ được khởi tạo với các tham số do BankAccountBuilder đặt.<br>
Hãy cùng xem ví dụ đơn giản về cách sử dụng mẫu thiết kế này:
```
BankAccount newAccount = new BankAccount
  .BankAccountBuilder("Jon", "22738022275")
  .withEmail("jon@example.com")
  .wantNewsletter(true)
  .build();
```
#### Khi nào sử dụng mẫu thiết kế Builder
* Khi xử lý liên quan đến việc tạo một đối tượng là vô cùng phức tạp, với rất nhiều tham số bắt buộc và tùy chọn
* Khi sự gia tăng số lượng tham số của hàm tạo dẫn đến một danh sách lớn các hàm tạo
* Khi client muốn các biểu diễn khác nhau cho đối tượng được xây dựng
### 7. Kết luận
Trong bài viết này, chúng ta đã tìm hiểu về các mẫu thiết kế sáng tạo trong Java.  Chúng ta cũng đã thảo luận về bốn loại khác nhau của chúng: Singleton, Factory Method, Abstract Factory và Builder Pattern, ưu điểm, ví dụ của chúng và khi nào chúng ta nên sử dụng chúng.
### Tài liệu tham khảo
[Introduction to Creational Design Patterns](https://www.baeldung.com/creational-design-patterns)