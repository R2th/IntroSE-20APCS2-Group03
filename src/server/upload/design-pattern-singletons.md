![](https://images.viblo.asia/7619d9bb-2d04-478e-840e-3c57d484cf35.png)

###  Intent

Singleton là một mẫu thiết kế sáng tạo cho phép bạn đảm bảo rằng một lớp chỉ có một cá thể và cung cấp một điểm truy cập toàn cục cho cá thể này.

###  Problem

Singleton giải quyết hai vấn đề vào thời điểm đó:

1. **Đảm bảo rằng một lớp chỉ có một cá thể duy nhất**. Lý do phổ biến nhất cho việc này là để kiểm soát một số tài nguyên được chia sẻ, ví dụ, cơ sở dữ liệu.

   Hãy tưởng tượng rằng bạn đã tạo ra một đối tượng, và sau một thời gian, cố gắng tạo một đối tượng mới. Trong trường hợp này, bạn sẽ muốn nhận đối tượng cũ, thay vì tạo một thể hiện mới.
   
   Nó không thể được thực hiện với một hàm tạo thông thường vì mọi lời gọi hàm tạo luôn trả về một đối tượng mới theo thiết kế.
 
2. **Cung cấp điểm truy cập toàn cầu cho cá thể đó**. Nghe như một biến toàn cục, phải không? Nhưng bạn không thể tạo biến toàn cục chỉ đọc. Bất cứ ai có thể truy cập nó cũng có thể thay thế giá trị của nó.

   Có một khía cạnh khác của vấn đề này: bạn không muốn mã giải quyết vấn đề trước đó nằm rải rác khắp chương trình của bạn. Tốt hơn là nên có nó trong một lớp, đặc biệt nếu phần còn lại của mã của bạn đã phụ thuộc vào lớp đó.
  
  Lưu ý: Singleton giải quyết cả hai vấn đề này cùng một lúc. Nhưng ngày nay mô hình trở nên phổ biến đến nỗi mọi người gọi một cái gì đó là Singleton ngay cả khi nó giải quyết một trong những vấn đề này.
  
###   Solution

Tất cả triển khai singleton chia sẻ hai bước phổ biến:

* Đặt hàm khởi tạo là private.
* Tạo một phương thức tạo tĩnh sẽ hoạt động như một constructor. Phương thức này tạo một đối tượng bằng cách sử dụng hàm tạo riêng và lưu nó trong biến tĩnh hoặc trường. Tất cả các cuộc gọi sau đây để phương thức này trả về đối tượng được lưu trong bộ nhớ cache.

Singleton giữ instance production code - bên trong phương pháp khởi của một lớp Singleton. Bất kỳ mã máy khách nào có quyền truy cập vào lớp Singleton cũng được truy cập vào phương thức tạo của nó. Và điều đó mang lại cho chúng ta một điểm truy cập toàn cầu đối với cá thể Singleton.

### Real-World Analogy

**Ví dụ :**

The government là một ví dụ tuyệt vời về mẫu Singleton. Một quốc gia chỉ có thể có một chính phủ chính thức. Bất kể danh tính cá nhân của các cá nhân thành lập chính phủ, danh hiệu, "Chính phủ X" là một điểm truy cập toàn cầu xác định nhóm người phụ trách.

### Structure

![](https://images.viblo.asia/5b1fd2fd-97f9-407a-8e4c-1c8f25de09e5.png)

### Pseudocode

Trong ví dụ này, lớp kết nối cơ sở dữ liệu hoạt động như một Singleton. Lớp này không có một hàm tạo công khai, vì vậy cách duy nhất để lấy đối tượng của nó là gọi phương thức getInstance. Phương thức này lưu trữ đối tượng được tạo đầu tiên và trả về nó như là kết quả của tất cả các cuộc gọi tiếp theo.

Mẫu thiết kế đơn đảm bảo rằng chỉ một thể hiện của lớp của nó sẽ được tạo ra. Và nó cung cấp một điểm truy cập toàn cục cho cá thể này: phương thức getInstance tĩnh.

```
class Database is
    private field instance: Database

    static method getInstance() is
        if (this.instance == null) then
            acquireThreadLock() and then
                // Ensure that instance has not yet been
                // initialized by other thread while this
                // one has been waiting for the
                // lock release.
                if (this.instance == null) then
                    this.instance = new Database()
        return this.instance

    private constructor Database() is
        // Some initialization code, such as the actual
        // connection to a database server.
        // ...

    public method query(sql) is
        // All database queries of an app will go through
        // this methods. Therefore, you can place a
        // throttling or caching logic here.
        // ...

class Application is
    method main() is
        Database foo = Database.getInstance()
        foo.query("SELECT ...")
        // ...
        Database bar = Database.getInstance()
        bar.query("SELECT ...")
        // The variable "bar" will contain the same object
        // as the variable "foo".
```

### Applicability

**Khi chương trình cần có một cá thể của một lớp, có sẵn cho tất cả các máy khách. Ví dụ, một đối tượng cơ sở dữ liệu duy nhất, được chia sẻ bởi các phần khác nhau của chương trình.**

Singleton ẩn từ khách hàng tất cả các phương tiện tạo ra các đối tượng mới của lớp của nó, ngoại trừ phương pháp tạo đặc biệt. Phương thức này hoặc là tạo một đối tượng mới hoặc trả về đối tượng hiện có nếu nó đã được tạo trước đó.

**Khi bạn cần một điều khiển chặt chẽ hơn các biến toàn cục.**

Không giống như các biến toàn cục, Singleton đảm bảo rằng chỉ có một cá thể của một lớp. Không ai ngoại trừ Singleton, có thể thay thế bản sao được lưu trong bộ nhớ cache.

Hơn nữa, Singleton cho phép bạn dễ dàng thay đổi hạn chế này. Ví dụ, để cho phép bất kỳ số lượng cá thể nào, bạn sẽ chỉ cần thay đổi mã ở một nơi - bên trong phần thân getInstance ().

### How to Implement


1. Thêm vào lớp một trường tĩnh riêng sẽ giữ  the singleton instance.
2. Khai báo phương thức tạo tĩnh công khai sẽ được sử dụng để gọi cá thể đơn.
3. Thực hiện "lazy initialization" bên trong phương thức tạo. Nó sẽ tạo một cá thể mới trên cuộc gọi đầu tiên và đặt nó vào trường tĩnh. Phương thức này sẽ trả về cá thể đó trong tất cả các cuộc gọi tiếp theo.
4. Đặt hàm khởi tạo của lớp là private.
5. Trong client code thay thế tất cả các cuộc gọi hàm tạo trực tiếp bằng các cuộc gọi đến phương thức tạo tĩnh.

### Relations with Other Patterns

* Facade có thể được chuyển đổi thành Singleton vì hầu hết các đối tượng  facade  đơn là sufficient.

* Flyweight gần giống như Singleton trong trường hợp nó có thể giảm tất cả mọi thứ chỉ là flyweight object. Nhưng hãy nhớ, có hai điểm khác biệt cơ bản giữa các mẫu này:

1. Đối tượng Singleton có thể thay đổi được. Đối tượng flyweight là không thay đổi.
2. Chỉ nên có một cá thể Singleton, trong khi lớp Flyweight có thể có nhiều cá thể với một trạng thái bên trong khác nhau.

* Abstract Factory,, Builder và Prototype có thể được implemented như Singletons.

**Nguồn tham khảo**: https://refactoring.guru/design-patterns/singleton