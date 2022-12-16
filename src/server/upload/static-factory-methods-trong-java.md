## 1. Tổng quan
Java constructors là cơ chế mặc định để các lớp được khởi tạo đầy đủ. Rốt cuộc, họ cung cấp tất cả cơ sở hạ tầng cần thiết để tiêm các phụ thuộc, theo cách thủ công hoặc tự động.

Mặc dù vậy, trong một số trường hợp sử dụng cụ thể, bạn nên sử dụng các phương pháp injecting dependencies để đạt được kết quả tương tự.

Trong hướng dẫn này, chúng ta sẽ nêu rõ những ưu và nhược điểm của việc sử dụng các static factory methods so với  Java constructors.

## 2. Ưu điểm của static factory methods
> “Consider static factory methods instead of constructors”

 Đây là những lý do chúng ta nên sử dụng cách tiếp cận này:
1.  Constructors không có tên có ý nghĩa, vì vậy chúng luôn bị giới hạn trong quy ước đặt tên tiêu chuẩn do ngôn ngữ áp đặt. Static factory methods có thể có tên có ý nghĩa, do đó truyền đạt rõ ràng những gì chúng làm
2.  Static factory methods có thể trả về cùng một kiểu triển khai (các) phương thức, một kiểu con và cả kiểu nguyên thủy, vì vậy chúng cung cấp nhiều kiểu trả về linh hoạt hơn
3.  Static factory methods có thể đóng gói tất cả logic, vì vậy chúng có thể được sử dụng để di chuyển logic bổ sung này ra khỏi Constructors
4.  Static factory methods có thể là phương pháp ổn định có kiểm soát, với mẫu Singleton là ví dụ rõ ràng nhất về tính năng này

## 3. Static Factory Methods trong JDK
Có rất nhiều ví dụ về các phương thức Static factory methods trong JDK cho thấy nhiều ưu điểm được nêu ở trên. Hãy cùng khám phá một số trong số chúng

### 3.1. The String Class
Muốn tạo một đối tượng String mới bằng phương thức Static factory methods, chúng ta có thể sử dụng một số cách triển khai sau của phương thức valueOf ():
```
String value1 = String.valueOf(1);
String value2 = String.valueOf(1.0L);
String value3 = String.valueOf(true);
String value4 = String.valueOf('a');
```

### 3.2. The Optional Class
Một ví dụ rõ ràng khác về các phương thức Static factory methods trong JDK là lớp Optional. Lớp này thực hiện một vài phương thức gốc có tên khá có ý nghĩa, bao gồm empty (), of () và ofNullable ():
```
Optional<String> value1 = Optional.empty();
Optional<String> value2 = Optional.of("Vible");
Optional<String> value3 = Optional.ofNullable(null);
```

### 3.3. The Collections Class
Đây là một lớp không thể khởi tạo mà chỉ có thể dùng static methods.
Dưới đây là một số ví dụ điển hình về các phương thức nhà máy của lớp:
```
Collection syncedCollection = Collections.synchronizedCollection(originalCollection);
Set syncedSet = Collections.synchronizedSet(new HashSet());
List<Integer> unmodifiableList = Collections.unmodifiableList(originalList);
Map<String, Integer> unmodifiableMap = Collections.unmodifiableMap(originalMap);

```

## 4. Tùy biến Static Factory Methods
Tất nhiên, chúng ta có thể triển khai các phương thức static factory methods riêng mình. Nhưng khi nào thì thực sự đáng làm như vậy, thay vì tạo các cá thể lớp thông qua constructors đơn giản?

Hãy xem một ví dụ đơn giản.

Hãy xem xét lớp người dùng này:
```
public class User {
    
    private final String name;
    private final String email;
    private final String country;
    
    public User(String name, String email, String country) {
        this.name = name;
        this.email = email;
        this.country = country;
    }
    
    // standard getters / toString
}
```
Trong trường hợp này, không có cảnh báo hiển thị nào để chỉ ra rằng phương pháp static factory methods có thể tốt hơn constructors.

Điều gì sẽ xảy ra nếu chúng ta muốn tất cả các object User nhận được giá trị mặc định cho trường country?

Nếu chúng ta khởi tạo trường với giá trị mặc định, chúng ta cũng sẽ phải cấu trúc constructors, do đó làm cho thiết kế trở nên không linh hoạt.

Thay vào đó, chúng ta có thể sử dụng phương thức static factory methods:
```
public static User createWithDefaultCountry(String name, String email) {
    return new User(name, email, "VN");
}
```

Đây là cách chúng ta nhận được object User với giá trị mặc định được gán cho trường country:
```
User user = User.createWithDefaultCountry("son", "son@domain.com");
```

## 5. Đưa logic ra khỏi Constructors
Lớp User của chúng ta có thể nhanh chóng biến thành một thiết kế sai sót nếu chúng ta quyết định triển khai các tính năng yêu cầu bổ sung thêm logic cho hàm tạo (chuông báo động sẽ tắt vào lúc này).

Giả sử rằng chúng ta muốn cung cấp cho lớp khả năng ghi lại thời gian mà mọi đối tượng User được tạo.

Nếu chúng ta chỉ đặt logic này vào constructors, chúng ta sẽ phá vỡ Single Responsibility Principle. Chúng ta sẽ kết thúc với một phương thức khởi tạo nguyên khối làm được nhiều thứ hơn là khởi tạo các trường.

Chúng tôi có thể giữ cho thiết kế của mình sạch sẽ bằng phương pháp static factory method:
```
public class User {
    
    private static final Logger LOGGER = Logger.getLogger(User.class.getName());
    private final String name;
    private final String email;
    private final String country;
    
    // standard constructors / getters
    
    public static User createWithLoggedInstantiationTime(
      String name, String email, String country) {
        LOGGER.log(Level.INFO, "Creating User instance at : {0}", LocalTime.now());
        return new User(name, email, country);
    }
}
```

Đây là cách chúng tôi tạo phiên bản User của mình:
```
User user = User.createWithLoggedInstantiationTime("Son", "son@domain.com", "VN");
```

## 6. Khởi tạo có kiểm soát
Như được hiển thị ở trên, chúng ta có thể đóng gói các khối logic thành các static factory methods trước khi trả về các đối tượng User đã được khởi tạo đầy đủ.

Ví dụ, giả sử chúng ta muốn đặt lớp User của chúng ta là một Singleton. Chúng ta có thể đạt được điều này bằng cách triển khai phương pháp nhà máy tĩnh được điều khiển bởi phiên bản:
```
public class User {
    
    private static volatile User instance = null;
    
    // other fields / standard constructors / getters
    
    public static User getSingletonInstance(String name, String email, String country) {
        if (instance == null) {
            synchronized (User.class) {
                if (instance == null) {
                    instance = new User(name, email, country);
                }
            }
        }
        return instance;
    }
}
```

Như mong đợi, việc lấy một đối tượng Người dùng bằng phương thức này trông rất giống với các ví dụ trước:
```
User user = User.getSingletonInstance("Son", "son@domain.com", "VN");
```

## 7. Kết luận
Trong bài viết này, chúng ta đã khám phá một số trường hợp sử dụng trong đó các static factory methods có thể là một lựa chọn thay thế tốt hơn cho việc sử dụng constructors Java thuần túy.

Với nhiều refactoring patterns khác, chúng ta nên sử dụng static factory methods một cách thận trọng và chỉ khi nó đáng để đánh đổi giữa việc tạo ra các thiết kế linh hoạt và sạch sẽ hơn và chi phí phải thực hiện các phương pháp bổ sung.

Tài liệu tham khảo: https://www.baeldung.com/java-constructors-vs-static-factory-methods#overview