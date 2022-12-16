## Collectional Pattern
Tiếp theo trong series sẽ là bài tổng hợp các collectional patterns. Chức năng chính, giống như tên gọi của nó, nhằm giúp xử lý với các thao tác trên tập hợp với các mục đích như:
- xử lý, thao tác trên các nhóm, tập hợp object
- kết hợp các class và object để khởi tạo một cấu trúc lớn hơn
- thiết kế tốt nhất cho một class mà các instance của nó sẽ không chứa các dữ liệu bị lặp
- cho phép định nghĩa các thao tác trên tập các object

Một số pattern cơ bản chúng ta sẽ xem xét trong bài này là
- Composite
- Iterator
- Flyweight
- Visitor

## Pattern
### 1. Composite
#### Giới thiệu chung
Composite pattern được sử dụng để cung cấp 1 interface cho cả các thành phần đơn và thành phần tổ hợp sao cho client có thể xem các thành phần này một cách thống nhất. Tức là client có thể xử lý thành phần tổ hợp và thành phần đơn lẻ như nhau.

#### Ví dụ
Ví dụ với file system của Unix. File system sẽ bao gồm 2 thành phần cơ bản là *file* và *thư mục* (directory). Trong đó, file có thể xem là thành phần đơn lẻ và thư mục là thành phần tổ hợp (chứa nhiều file và thư mục khác). Do đó, composite pattern sẽ phù hợp với trường hợp này.

Xét trường hợp đơn giản là việc lấy ra kích thước của `FileSystemComponent`:
- Đối với `FileComponent`, sẽ trả về kích thước của tệp tin 
- Đối với `DirComponent`, sẽ trả về tổn kích thước của các tệp tin và các thư mục có trong nó

Việc sử dụng *Composite* pattern trong trường hợp này giúp client có thể lấy được kích thước của một `FileSystemComponent` một cách thống nhất mà không cần biết chi tiết bên trong được thực hiện như thế nào.

![image.png](https://images.viblo.asia/4d0de926-7fe8-468d-8b97-91397be86a75.png)

Ví dụ trong mô hình này, client muốn lấy ra kích thước của component chỉ cần gọi tới `FileSystemComponetObject.getComponentSize()` mà không cần quan tâm nó thuộc kiểu component nào. Tuy nhiên thiết kế trên vẫn có một số nhược điểm như
- Client phải tự kiểm tra kiểu dữ liệu của object
- Client bắt buộc phải ép sang đúng kiểu của lớp con mới có thể sử dụng được các chức năng riêng

Thông thường, khi chúng ta làm việc với hệ thống thư mục, chúng ta sẽ không cần trực tiếp làm việc này. Ví dụ đơn giản với hàm `cd` để di chuyển tới thư mục, đây là chức năng của `DirComponent` mà không có trong `FileComponent`. Khi ta gọi tới `cd ${fileName}` sẽ trả về một exception

![image.png](https://images.viblo.asia/ba65c6ff-7f11-4e43-9f96-c3c034484223.png)

Có thể thấy, việc gọi tới bất cứ hàm nào thì việc kiểm tra hàm đó có hỗ trợ với kiểu mà chúng ta muốn dùng sẽ không do client lo mà do `ServiceProvider` mà ở đây là hệ điều hành xử lý. Việc tách biệt trách nhiệm của client ra giúp cho quá trình sử dụng thuận tiện hơn và hạn chế coupling. Để đáp ứng điều này, người ta hướng tới một mô hình thứ 2

![image.png](https://images.viblo.asia/afbcc460-6cf7-49eb-96ad-c99000d54817.png)

Khi này, client có thể gọi tới các hàm chức năng riêng mà không cần ép kiểu của object trả về. Các hàm riêng sẽ được mặc định trả ra một `exception` và các lớp con nếu sử dụng sẽ override lại các hàm này.

```java
public abstract class FileSystemComponent {
    public abstract int getComponentSize();

    public void addComponent(FileSystemComponent fc) {
        throw new IllegalComponentStateException(
                "Method not supported"
        );
    }

    public FileSystemComponent getComponent(int location) {
        throw new IllegalComponentStateException(
                "Method not supported"
        );
    }
}
```

Lớp con không có các chức năng riêng sẽ kế thừa toàn bộ từ lớp cha và các hàm không được hỗ trợ vẫn sẽ trả về exception
```java
public class FileComponent extends FileSystemComponent{
    @Override
    public int getComponentSize() {
        return 0;//return component size
    }
}
```

Các lớp con nếu muốn triển khai các chức năng của riêng mình sẽ tự ghi đè lại các hàm này để có thể gọi tới
```java
public class DirComponent extends FileSystemComponent{
    @Override
    public int getComponentSize() {
        //return component size
    }

    @Override
    public void addComponent(FileSystemComponent fc) {
        //add component logic
    }

    @Override
    public FileSystemComponent getComponent(int location) {
        //return the component at the location
    }
}
```

Hướng tiếp cận này có các ưu nhược điểm khá rõ ràng
|Ưu điểm|Nhược điểm|
|---|---|
|Tách biệt trách nhiệm kiểm tra việc hỗ trợ của các chức năng khỏi phía client|Lớp cha cần có tất cả các chức năng mặc định và các chức năng riêng của từng lớp con|

### 2. Iterator
#### Giới thiệu chung
*Iterator* là mẫu thiết kế cho phép client có thể truy cập tới nội dung của một *container* một cách tuần tự mà không cần biết nội dung thể hiện bên trong nó. *Container* có thể hiểu đơn giản là một tập dữ liệu hay objects. Object ở đây cũng có thể là một collection.

#### Internal vs External Iterator

| Internal | External |
|---|---|
|phương thức truy cập tới object bên trong collection sẽ gắn với bản thân collection|chức năng của iterator sẽ tách biệt khỏi collection trên một object là *iterator*.|
|Chỉ có 1 iterator với 1 collection tại 1 thời điểm| Có thể có vô số các iterator trên 1 collection tại 1 thời điểm|
|Collection phải tự duy trì và lưu trữ trạng thái của 1 iterator|Trạng thái của iterator sẽ được tách biệt khỏi collection|

Trong Java mặc định sẽ hỗ trợ một interface `Iterator<E>` (E là generic type)


|function prototype|kiểu trả về|mô tả|
|---|---|---|
|forEachRemaining(Consumer<? super E> action)|void|Thực hiện *action* đối với tất cả cả đối tượng còn lại trong iterator đến khi đi hết các đối tượng hoặc action trả về exception|
|hasNext()|boolean|Trả về đúng nếu vẫn còn đối tượng trong iterator|
|next()|E|Trả về đối tượng tiếp theo trong iterator|
|remove()|void|xoá đối tượng cuối cùng được trả về khỏi tập đang xét|


#### Ví dụ
Dữ liệu trong các ví dụ mình đều dùng file txt đơn giản dưới 
```txt
1,test1,hello
2,test2,the quick fox jump over the lazy dog
3,test3,merry Christmas
```
**Internal Iterator**
```java
public class User {

    private String name;
    private String description;
    private String message;


    public User(String name, String description, String message) {
        this.name = name;
        this.description = description;
        this.message = message;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
```
Đây là model class 


```java
public class AllUser {
    private Vector data;
    Enumeration ec;
    User nextUser;

    public AllUser() {
        init();
        ec = data.elements();
    }

    private void init() {
        data = new Vector();
        File f = new File("data.txt");
        try {
            InputStream is = new FileInputStream(f);
            Scanner sc = new Scanner(is);
            while(sc.hasNextLine()) {
                String line = sc.nextLine();
                StringTokenizer tokenizer = new StringTokenizer(line, ",");
                data.add(new User(tokenizer.nextToken(), tokenizer.nextToken(), tokenizer.nextToken()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public boolean hasNext(){
        boolean match = false;
        nextUser = null;
        while(ec.hasMoreElements()){
            User temp = (User) ec.nextElement();
            nextUser = temp;
            break;
        }
        return nextUser != null;
    }

    public Object next() {
        if(nextUser != null) {
            return nextUser;
        } else {
            throw new NoSuchElementException();
        }
    }

    public void remove() {

    }
}
```
Iterator class vừa đóng vai trò là collection lưu trữ giữ liệu vừa là iterator cho phép client truy xuất dữ liệu.

```java
public class TestInternalIterator {
    public static void main(String[] args) {
        AllUser allUser = new AllUser();

        while(allUser.hasNext()) {
            System.out.println(allUser.next().toString());
        }

    }
}
```
Test class để kiểm tra hoạt động của iterator `AllUser`.

Trong ví dụ trên, có thể thấy client (hàm test) chỉ cần khởi tạo iterator và dữ liệu của nó, kiểm tra còn phần từ nào không và gọi tới phần tử tiếp theo. Không cần biết những thứ bên trong như các phần tử được lưu trữ ra sao, dưới dạng nào và các thông tin chi tiết khác.

**External Iterator**
```java
public class User {

    private String name;
    private String description;
    private String message;


    public User(String name, String description, String message) {
        this.name = name;
        this.description = description;
        this.message = message;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getMessage() {
        return message;
    }
}
```
model class

```java
public class AllUser {
    private Vector data;
    Enumeration ec;
    User nextUser;

    public AllUser() {
        init();
        ec = data.elements();
    }

    private void init() {
        data = new Vector();
        File f = new File("data.txt");
        try {
            InputStream is = new FileInputStream(f);
            Scanner sc = new Scanner(is);
            while(sc.hasNextLine()) {
                String line = sc.nextLine();
                StringTokenizer tokenizer = new StringTokenizer(line, ",");
                data.add(new User(tokenizer.nextToken(), tokenizer.nextToken(), tokenizer.nextToken()));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public Enumeration getAllUsers() {
        return data.elements();
    }

    public Iterator getFilteredUser(boolean isEven) {
        return new FilteredUser(this, isEven);
    }
}
```
collection class 

```java
public class FilteredUser implements Iterator {

    private Vector vector;
    AllUser allUser;
    boolean isEven;
    Enumeration enumeration;
    User nextUser;

    public FilteredUser(AllUser allUser, boolean isEven) {
        this.allUser = allUser;
        this.isEven = isEven;
        enumeration = allUser.getAllUsers();
    }

    @Override
    public boolean hasNext() {
        boolean matchFound = false;
        while(enumeration.hasMoreElements()) {
            User temp = (User) enumeration.nextElement();
            if(Integer.parseInt(temp.getName()) % 2 == (isEven ? 0 : 1)) {
                matchFound = true;
                nextUser = temp;
                break;
            }
        }
        return matchFound;
    }

    @Override
    public Object next() {
        if(nextUser == null) {
            throw new NoSuchElementException();
        } else {
            return nextUser;
        }
    }

    @Override
    public void remove() {
    }
}
```
iterator class

```java
public class TestInternalIterator {
    public static void main(String[] args) {
        AllUser allUser = new AllUser();
        Iterator it = allUser.getFilteredUser(true);
        while (it.hasNext()){
            System.out.println(it.next());
        }
    }
}
```
test class

### 3. Flyweight
#### Giới thiệu chung
Thông tin của một object thường có 1 trong 2 hoặc cả 2 dạng thông tin:
- intrinsic: Các thông tin độc lập với context của object. Tức là các thông tin này không phụ thuộc vào trạng thái của object. Những thông tin này thường cố định và giống nhau giữa các object. Ví dụ, với các object employee, các thông tin như tên công ty, địa chỉ công ty,... sẽ giống nhau giữa các object
- extrinsic: Các thông tin phụ thuộc và thay đổi theo context của object. Các thông tin này của các object khác nhau sẽ khác nhau. Ví dụ như tên, ngày tháng năm sinh,.. của employee.

Đối với các thông tin dạng *intrinsic*, nếu tất cả các object đều lưu các thông tin này sẽ dẫn tới việc dư thừa không cần thiết. Do đó, Flyweight pattern được đưa ra với ý tưởng là các thông tin này sẽ lưu trong các *Flyweight object* và các object khác sẽ chia sẻ cùng một Flyweight object này.

#### Các yêu cầu của flyweight
- mỗi một dạng flyweight chỉ có một object tương ứng và chia sẻ với 1 nhóm các object thích hợp
- client object không nên có quyền tạo trực tiếp các flyweight object
- client object nên có một cách nào đó để đọc dữ liệu của flyweight object nếu cần

#### Cách xây dựng 
- Flyweight class nên chỉ có private constructor để ngăn việc client object có thể khởi tạo các object này
- Vì một flyweight class được khuyến khích chỉ nên có 1 instance nên thường được sử dụng với *Singleton* pattern.

#### Ví dụ
Đầu tiên, giả sử chúng ta có một class card visit như sau

```java
public class VCard {
    private String name;
    private String title;
    private String company;
    private String address;
    private String city;
    private String state;
    private String zip;
    
    public void print() {
        
    }
}
```
có thể thấy, trong các thuộc tính của của class này thì các thuộc tính intrinsic sẽ bao gồm:
- company
- address
- city
- state
- zip

Do đó, ta có thể sử dụng Flyweight pattern tại đây.

**Hướng thứ nhất**

Ở cách này, ta sẽ thể hiện các thông tin extrinsic trong object và các thông tin intrinsic trong một object Flyweight. 

Đầu tiên là một interface mà Flyweight sẽ triển khai

```java
public interface FlyweightInterface {
    public String getCompany();
    public String getAddress();
    public String getCity();
    public String getState();
    public String getZip();
}
```

Tiếp theo, chúng ta sẽ thiết kế 1 sigleton `FlyweigthtFactory` để khởi tạo các singleton Flyweight object tương ứng với từng bộ phận khác nhau.
- `Flyweight` class sẽ triển khai là inner class của `FlyweightFactory`
- `Flyweight` class sẽ chỉ có private constructor để ngăn các object bên ngoài có thể khởi tạo instance của nó
- `FlyweightFactory` là outer class của `Flyweight` nên vẫn có thể khởi tạo instance của `Flyweight`
- Chức năng của `FlyweightFactory`:
    - Duy trì một HashMap các instance của từng class Flyweight
    - Khi client request 1 flyweight:
        - Nếu instance đã có trong HashMap sẽ trả về instance đó
        - Nếu chưa có instance tương ứng, sẽ khởi tạo mới 1 instance tương ứng, thêm vào HashMap và trả về instance này cho client
    - Vì `FlyweightFactory` sử dụng Singleton pattern nên các object của `Flyweight` cũng sẽ là duy nhất

```java
public class FlyweightFactory {
    //store the instance of division flyweight that has been created
    private HashMap<String, FlyweightInterface> listFlyweight;
    //2 statements below implement singleton pattern to flyweightFactory
    private static FlyweightFactory factory = new FlyweightFactory();
    private FlyweightFactory() {
        listFlyweight = new HashMap();
    }

    public synchronized FlyweightInterface getFlyweight(String divisionName) {
        if(listFlyweight.get(divisionName) != null) {
            return listFlyweight.get(divisionName);
        } else {
            FlyweightInterface fw = new Flyweight(divisionName);
            listFlyweight.put(divisionName, fw);
            return fw;
        }
    }


    //inner singleton Flyweight class that only allow FlyweightFactory and itself create instance
    class Flyweight implements FlyweightInterface {

        private String company;
        private String address;
        private String city;
        private String state;
        private String zip;

        private void setValue(String company, String address, String city, String state, String zip) {
            this.company = company;
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
        }

        //predefine data for each division
        private Flyweight(String division) {
            switch (division.toLowerCase()) {
                case "north":
                    setValue("CompanyX", "address 1", "city 1", "street 1", "10000");
                    break;
                case "south":
                    setValue("CompanyX", "address 2", "city 2", "street 2", "20000");
                    break;
                case "east":
                    setValue("CompanyX", "address 3", "city 3", "street 3", "30000");
                    break;
                case "west":
                    setValue("CompanyX", "address 4", "city 4", "street 4", "40000");
                    break;
            }
        }

        @Override
        public String getCompany() {
            return null;
        }

        @Override
        public String getAddress() {
            return null;
        }

        @Override
        public String getCity() {
            return null;
        }

        @Override
        public String getState() {
            return null;
        }

        @Override
        public String getZip() {
            return null;
        }
    }
}
```

Khi đó, `VCard` class sẽ chỉ lưu thông tin extrinsic và một `Flyweight` object tương ứng

```java
public class VCard {
    private String name;
    private String title;
    private FlyweightInterface companyDetail;

    public VCard(String name, String title, FlyweightInterface companyDetail) {
        this.name = name;
        this.title = title;
        this.companyDetail = companyDetail;
    }
    
    

    public void print() {
        System.out.println("name: " + name);
        System.out.println("title: " + title);
        System.out.println("Company: " + companyDetail.getCompany());
        System.out.println("City: " + companyDetail.getCity());
        System.out.println("State: " + companyDetail.getState());
        System.out.println("Address: " + companyDetail.getAddress());
        System.out.println("Zip: " + companyDetail.getZip());
    }
}
```

**Phương hướng 2**

Tương tự cách 1, chỉ có điều, việc lưu trữ các thuộc tính extrinsic sẽ nằm trong hàm gọi thay vì thể hiện dưới dạng object. 
- Thay đổi hàm `print()`
    - chuyển hàm `print()` sang `Flyweight` class
    - Thêm các tham số là các thuộc tính extrinsic 

```java
public void print(String name, String title)
```
- Thay đổi logic để hàm print in ra các thông tin cần thiết

Với phương hướng tiếp cận này, chỉ cần khởi tạo 4 `Flyweight` object. Không cần khởi tạo các client object cho các thông tin extrinsic do chúng ta có thể truyền trực tiếp chúng qua các tham số. Nếu yêu cầu chỉ là hiển thị thông tin như đối với VCard và thông tin riêng ít thì khá phù hợp. Tuy nhiên, cách này sẽ hạn chế sự tuỳ biến đối với các client object nếu yêu cầu về các thao tác khác, truyền thông tin qua tham số thay vì lưu trong object đôi khi cũng dẫn tới sự bất tiện.

### 4. Visitor
#### Giới thiệu chung
*Visitor* là mẫu thiết kế với mục đích định nghĩa 1 thao tác trên object trong một tập các object không cùng loại thuộc cùng một cây phân cấp mà không làm thay đổi bất cứ class của object nào thuộc tập hợp đó. Để làm được như thế, ta sẽ định nghĩa các thao tác độc lập trên các object trên 1 class *Visitor*. Với mỗi thao tác mới, chỉ cần định nghĩa thêm 1 visitor mới mà không cần thay đổi các class của object. 

Thông thường, người ta sẽ định nghĩa một *Interface* cho các visitor khác kế thừa và triển khai logic. 

```java
public interface VisitorInterface {
    void visit(ClassA classA);
    void visit(ClassB classB);
}
```

Các class visitor sẽ kế thừa từ đây và triển khai logic của mình đối với từng class được xét. Để sử dụng visitor thường sẽ có 2 hướng
- client tự gọi tới hàm visit và object tương ứng.
- Các object thuộc cây phân cấp sẽ có 1 hàm `accept(VisitorInterface visitor)` cho phép gọi tới hàm visit của visitor với tham số là chính class đó (*this*).

Khi thêm 1 thao tác mới trên tập các object, ta chỉ đơn giản thêm 1 visitor kế thừa từ `VisitorInterface` là xong.

Khi tập các object có thêm 1 kiểu mới, `VisitorInterface` và các class kế thừa từ nó sẽ phải định nghĩa thêm một hàm visit với kiểu tương ứng.

#### Ví dụ
Ở đây mình lấy ví dụ với một tập các `Order` :
- `OverseaOrder`: tổng tiền bằng giá + giá vận chuyển
- `CaliforniaOrder`: tổng tiền = giá + 10% thuế
- `NonCaliforniaOrder`: tổng tiền = tổng giá

```java
public interface Order {
    void accept(OrderVisitor visitor);
}
```
Order class
```java
public class CaliforniaOrder implements Order{
    private double totalAmount;

    public CaliforniaOrder(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public void accept(OrderVisitor visitor) {
        visitor.visit(this);
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public double getAdditionalTax() {
        return totalAmount * 0.1;
    }
}
```
CaliforniaOrder class
```java
public class NonCaliforniaOrder implements Order{

    private double totalAmount;

    public NonCaliforniaOrder(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public void accept(OrderVisitor visitor) {
        visitor.visit(this);
    }

    public double getTotalAmount() {
        return totalAmount;
    }

}
```
NonCaliforniaOrder class
```java
public class OverseaOrder implements Order{

    private double totalAmount;
    private int distance;

    public OverseaOrder(double totalAmount, int distance) {
        this.totalAmount = totalAmount;
        this.distance = distance;
    }

    @Override
    public void accept(OrderVisitor visitor) {
        visitor.visit(this);
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public double getAdditionalSH() {
        return distance * 0.05;
    }
}
```
OverseaOrder

Bây giờ để định nghĩa các thao tác trên tập các order, mình sẽ định nghĩa một interface cho các vistor

```java
public interface OrderVisitor {
    void visit(OverseaOrder overseaOrder);
    void visit(NonCaliforniaOrder nonCaliforniaOrder);
    void visit(CaliforniaOrder californiaOrder);
}
```

Khi cần một thao tác nào đó trên tập các order, chỉ cần định nghĩa 1 visitor kế thừa từ interface này. Ví dụ, mình muốn tính tổng giá trị các order trong tập hợp, mình sẽ định nghĩa 1 visitor để tính tổng như sau

```java
public class SumAmountVisitor implements OrderVisitor{
    private double totalAmount = 0;

    public SumAmountVisitor() {
    }

    @Override
    public void visit(OverseaOrder overseaOrder) {
        System.out.println("calculate on " + overseaOrder.getClass().getSimpleName().toString());
        totalAmount += overseaOrder.getTotalAmount() + overseaOrder.getAdditionalSH();
    }

    @Override
    public void visit(NonCaliforniaOrder nonCaliforniaOrder) {
        System.out.println("calculate on " + nonCaliforniaOrder.getClass().getSimpleName().toString());
        totalAmount += nonCaliforniaOrder.getTotalAmount();
    }

    @Override
    public void visit(CaliforniaOrder californiaOrder) {
        System.out.println("calculate on " + californiaOrder.getClass().getSimpleName().toString());
        totalAmount += californiaOrder.getTotalAmount() + californiaOrder.getAdditionalTax();
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
```

Có thể test hoạt động của class này với 1 chương trình đơn giản

```java
public class OrderManager {
    public static void main(String[] args) {
        List<Order> orderList = new ArrayList<>();
        orderList.add(new CaliforniaOrder(100));
        orderList.add(new CaliforniaOrder(200));
        orderList.add(new OverseaOrder(50, 2000));
        orderList.add(new NonCaliforniaOrder(350));

        SumAmountVisitor sumAmountVisitor = new SumAmountVisitor();
        for(Order order: orderList) {
            order.accept(sumAmountVisitor);
        }
        System.out.println(sumAmountVisitor.getTotalAmount());
    }
}
```

Khi muốn thêm một thao tác khác, chỉ cần khai báo thêm 1 visitor khác mà không cần thay đổi gì đối với các object trong tập đã cho.

```java
public class MaxAmountVisitor implements OrderVisitor{
    private double maxAmount = 0;


    @Override
    public void visit(OverseaOrder overseaOrder) {
        maxAmount = Math.max(maxAmount, overseaOrder.getTotalAmount()+ overseaOrder.getAdditionalSH());
    }

    @Override
    public void visit(NonCaliforniaOrder nonCaliforniaOrder) {
        maxAmount = Math.max(maxAmount, nonCaliforniaOrder.getTotalAmount());
    }

    @Override
    public void visit(CaliforniaOrder californiaOrder) {
        maxAmount = Math.max(maxAmount, californiaOrder.getTotalAmount() + californiaOrder.getAdditionalTax());
    }

    public double getMaxAmount() {
        return maxAmount;
    }
}
```