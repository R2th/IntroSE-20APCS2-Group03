# Null và NullPointerException là gì ?
Theo mặc định, Java gán giá trị null cho các biến tham chiếu đối tượng chưa được khởi tạo. Nói cách khác, khi bạn khai báo các biến tham chiếu và không khởi tạo chúng, java sẽ gán cho chúng một giá trị đặc biệt được gọi là null.
```
public class TestClass {
    String string1;
    String string2 = null;

    public static void main(String[] a){
        TestClass testClass = new TestClass();

        System.out.println(testClass.string1);    // Output: null
        System.out.println(testClass.string2);    // Output: null
    }
}
```

# Tại sao NullPointerException?
Khi bạn cố gắng truy cập trên một biến tham chiếu chưa khởi tạo, bạn sẽ nhận được một NullPointerException.

Trong Java, một chương trình có thể gán một biến tham chiếu cho một đối tượng trong thời gian chạy. Do đó, tại thời điểm biên dịch, không thể biết liệu một tham chiếu nào đó có bị rỗng hay không. Do đó, NullPointerExceptions là các ngoại lệ thời gian chạy và rất khó lường trước.

Ví dụ: bạn đang viết một UserService, có phương thức getUsers trả về Danh sách người dùng. User và Address được giới thiệu trông giống như bên dưới.
```
public class User {
    private String name;
    private String lastName;
    private Address address;
   
    ...
}


class Address {
    private String address;
    private String suburb;
    private String state;
    
    ...
}
```
Bây giờ, người tiêu dùng UserService muốn in trạng thái của Người dùng đầu tiên từ danh sách. Đối với điều đó, nó sẽ trích xuất các đối tượng lồng nhau.
```
List<User> users = service.getUsers();

// Possibility of NullPointerException
System.out.println("State is " + users.get(0).getAddress().getState());

```
Ở đây, bạn đã giới thiệu về NullPointerExceptions. Dưới đây là các khả năng:

1. Toàn bộ danh sách trống.
2. Người dùng đầu tiên từ danh sách là trống.
3. Địa chỉ Người dùng là trống.

Trong bất kỳ trường hợp nào, mã của bạn sẽ ném ra một NullPointerException. Có thể tránh ngoại lệ bằng cách thêm kiểm tra Null.

# Kiểm tra Null để tránh NullPointerException
Để tránh NullPointerExceptions, bạn cần thêm kiểm tra null trong mã của mình. Ví dụ: hãy tham khảo ví dụ đã sửa đổi bên dưới
```
if (users != null) {
    
    User user = users.get(0);
    if (user != null) {
        
        Address address = user.getAddress();
        if (address != null) {
        
            String state = address.getState();
            if (state != null) {
                System.out.println("State is " + state);
            }
        }
    }
}
```

Cuối cùng, chúng ta đã tránh được tất cả các NullPointerExceptions có thể xảy ra và mã hiện đã an toàn. Tuy nhiên, điều đó đã làm cho phương pháp trở nên xấu xí. Hơn nữa, hãy nghĩ về trường hợp có nhiều đối tượng lồng vào nhau như thế này.

# Optional là gì?
Java 8 đã giới thiệu một lớp Optional là một cách tốt hơn để tránh NullPointerExceptions. Bạn có thể sử dụng Optional để đóng gói các giá trị null tiềm năng và chuyển hoặc trả lại nó một cách an toàn mà không cần lo lắng về ngoại lệ.
Không có Optional, khi một chữ ký phương thức có kiểu trả về của đối tượng nhất định. Người dùng thường có xu hướng khẳng định sự tồn tại của đối tượng. Do đó, khả năng null thường bị bỏ qua.

```
// Cho biết khả năng có kết quả rỗng
Optional<List<User>> getUsers();

// Không cho biết khả năng có kết quả rỗng
List<User> getUsers();
```

Ngoài ra, Optional cải thiện tài liệu và có ý nghĩa hơn. Ví dụ: bạn đã thấy lớp User của chúng ta trong phần trên. Nó không chỉ ra rằng Address là trường tùy chọn và có thể để trống. Ví dụ, chúng ta sẽ thêm optional trong ví dụ và nó sẽ rõ ràng hơn.

```
public class User {
    private String name;
    private String lastName;
    private Optional<Address> address;
 
    ...
}
```

# Làm thế nào để sử dụng Optional?
Bây giờ, hãy xem cách bạn có thể sử dụng Optional để kiểm tra xem đối tượng được chứa có rỗng hay không và chúng ta có thể thực hiện những hành động nào trong cả hai trường hợp.

**Lấy giá trị**
Phương thức get chỉ đơn giản trả về đối tượng được đóng gói từ tùy chọn. Trong trường hợp này, không có kiểm tra null nào được thực hiện và tùy chọn trả về giá trị được chứa như hiện tại.
```
Optional<Address> optAddress = user.getAddress();
Address address = optAddress.get();
```

**Throw Exception**
Phương thức orElseThrow là phương pháp thuận tiện và an toàn hơn để sử dụng. Nó trả về giá trị đối tượng nếu đối tượng không phải là null. Tuy nhiên, nếu đối tượng là null, nó sẽ ném ra ngoại lệ được chỉ định.
```
Optional<Address> optAddress = user.getAddress();

Address address = optAddress.orElseThrow(UserNotFoundException::new)

```

**Lấy đối tượng không phải là Null, nếu không trả về mặc định**
Phương thức orElse là một phương thức tùy chọn thú vị hơn. Nó trả về giá trị được chứa nếu nó không phải là giá trị rỗng. Nếu không, nó trả về giá trị mặc định đã cho.
```
Address defaultAddress = new Address (....);
Optional<Address> optAddress = user.getAddress();

Address address = optAddress.orElse(defaultAddress);
```

**Kiểm tra xem nó không phải là Null**
IsPresent là một kiểm tra boolean đơn giản để xem liệu đối tượng được chứa có rỗng hay không.
```
Address address;
if(optAddress.isPresent){
    address = optAddress.get();
}
```

**Sử dụng nếu nó không phải là Null**
Phương thức ifPresent chuyển giá trị cho Consumer Function dưới dạng Lambda Expression.
```
Optional<Address> optAddress = user.getAddress();

optAddress.ifPresent(System.out::println);
```
# Tổng kết
Đây là phần Giới thiệu về Java 8 Optional. Tổng hợp dưới đây là những điểm bạn đã học được.

* NullPointerExceptions trong Java xảy ra trong thời gian chạy và không mong muốn.
* Kiểm tra rỗng tránh NullPointerExceptions. Tuy nhiên, mã trông xấu xí.
* Optional là một vùng chứa đối tượng được cung cấp bởi Java 8, nó đóng gói đối tượng được trả về bằng phương thức.
* Optional có các phương pháp để truy cập an toàn đối tượng được chứa. Do đó, tránh kiểm tra null và NullPointerExceptions.

Lợi ích của việc sử dụng Optional
* Tránh kiểm tra Null và NullPointerExceptions.
* Chỉ rõ hành vi của phương thức (phương thức trả về).
* Cải thiện tài liệu. Ví dụ: chỉ ra rõ ràng các trường tùy chọn trong một đối tượng.

Tài liệu tham khảo : https://www.amitph.com/avoid-nullpointerexception-using-java-8-optional/