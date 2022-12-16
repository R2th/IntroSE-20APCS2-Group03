Trong bài trước, mình đã tổng hợp lại các design pattern cơ bản nhất. Bài này sẽ tiếp tục với các creational pattern.

## I. Creational Pattern
### 1. Chức năng
- Khởi tạo object
- Cung cấp 1 cơ chế đơn giản, chính quy và có thể kiểm soát được việc khởi tạo object
- Đảm bảo tính bao đóng về các chi tiết trong việc class nào được khởi tạo và các instances này được khởi tạo ra sao
- Khuyến khích sử dụng interface để hạn chế coupling

### 2. Các pattern chính
- Factory Method
- Singleton
- Abstract Factory
- Prototype
- Builder

## II. Các Creational Pattern
### 1. Factory Method
#### Nguyên nhân sử dụng
Trong quá trình khởi tạo object, việc chọn kiểu đúng từ cây phân cấp của các class không phải lúc nào cũng xác định chính xác được. Việc này đôi khi phải phụ thuộc vào nhiều yếu tố như:
- Trạng thái mà ứng dụng đang chạy
- Cấu hình của ứng dụng
- Sự mở rộng các yêu cầu hay nâng cấp, cải tiến
- ...

Các yếu tố khác nhau sẽ yêu cầu khởi tạo các object phù hợp. Thông thường, mỗi client sẽ phải lựa chọn 1 class chính xác từ cây phân cấp để sử dụng dịch vụ.

![image.png](https://images.viblo.asia/0ef96a67-b57b-496e-a17a-f2400cb42746.png)

Việc lựa chọn như trên sẽ dẫn tới 1 số hạn chế:
- Tất cả các client object đều phải triển khai các tiêu chí lựa chọn class dẫn tới tăng tính coupling giữa client và service provider.
- Khi mà thay đổi các tiêu chí lựa chọn class thì tất cả các client object đều cần phải có các thay đổi tương ứng
- Bởi vì các tiêu chí lựa chọn class sẽ cần tất cả các yếu tố có thể ảnh hưởng tới quá trình lựa chọn class, việc triển khai ở phía client sẽ có thể có những sai sót trong các câu lệnh điều kiện
- Nếu các class trong cây phân cấp có các điều kiện khởi tạo khác nhau, việc triển khai ở phía client sẽ rất phức tạp
- Client cần biết tất cả các class và chức năng của các class trong cây phân cấp

Để giải quyết các yếu tố này, việc sử dụng Factory Method sẽ giúp bao đóng các chức năng cần thiết trong việc lựa chọn và khởi tạo object. Chức năng của method này là:
- Lựa chọn class thích hợp từ cây phân cấp dựa theo context của ứng dụng và các yếu tố ảnh hưởng khác
- Khởi tạo object tương ứng trả về với kiểu của lớp cha

![image.png](https://images.viblo.asia/d46382fa-2cd3-4ace-8092-cf5dba3930b5.png)

Cách làm này sẽ có các ưu điểm như:
- Client object sẽ sử dụng factory method để khởi tạo các instance tương ứng mà không cần xử lý với rất nhiều các tiêu chí lựa chọn
- Factory method khởi tạo các object khác nhau với các điều kiện khác nhau và client object sẽ không cần phải quan tâm tới các vấn đề phức tạp này
- Client object không cần phải biết tất cả các class trong cây phân cấp khi factory method đã làm phần việc đó và trả về object thích hợp

Có 2 hướng để triển khai Factory Method
- Triển khai 1 interface/ abstract class với factory method. Các class kế thừa từ đây sẽ tự triển khai logic khởi tạo object
- Triển khai một factory method mặc định. Các class con khác nhau nếu cần thiết sẽ tự override lại để triển khai logic riêng

#### Ví dụ
Ở đây, mình chọn một ví dụ đơn giản là Logger. Chương trình sẽ có 1 setting trong việc sử dụng file log hay console log. Tuỳ theo cấu hình này mà thực hiện việc ghi log. 

```java
public interface Logger {
    public void log(String message);
}
```

```java
public class FileLogger implements Logger{

    @Override
    public void log(String message) {
        System.out.println("Log message to log.txt");
        //file log logic
    }
}
```

```java
public class ConsoleLogger implements Logger{
    @Override
    public void log(String message) {
        System.out.println("log message to console");
        //log message logic
    }
}
```

The setting store in the properties file của ứng dụng

```properties
FileLogging = 0
```

Triển khai factory method

```java
public class LoggerFactory {
    
    public Logger createLogger() {
        if(isFileLoggingEnable()) {
            return new FileLogger();
        } else {
            return new ConsoleLogger();
        }
    }

    private boolean isFileLoggingEnable() {
        //check the FileLogging properties in application setting
    }
}
```



### 2. Singleton
#### Nguyên nhấn sử dụng
Đôi khi, có những class chúng ta cần 1 và chỉ 1 instance của nó trong suốt vòng đời của ứng dụng. Ví dụ, với object kết nối tới cơ sở dữ liệu của ứng dụng chỉ cần 1 và chỉ 1 để đảm bảo hiệu quả nhất. Do đó, Singleton pattern được sử dụng để đảm bảo rằng việc khởi tạo duy nhất 1 instance của class:
- Có quyền truy cập công khai tới đối tượng này để tất cả các object trong chương trình đều có thể sử dụng
- Ngăn không cho các object khác có thể khởi tạo singleton object

Do đó, để khởi tạo 1 Singleton class ta cần
- Một private constuctor để đảm bảo việc khởi tạo object này chỉ được thực hiện bởi chính class
- Một static public access:
    - public để tất cả object có thể truy cập
    - static đảm bảo rằng các object có thể sử dụng object này mà không cần khởi tạo

#### Ví dụ

```java
public class FileLogger implements Logger{

    private static FileLogger logger;
    
    private FileLogger() {
        
    }

    @Override
    public synchronized void log(String message) {
        System.out.println("Log message to log.txt");
        //file log logic
    }

    public static Logger getLogger(){
        if(logger == null) {
            logger = new FileLogger();
        }
        return logger;
    }
}
```
### 3. Abstract Factory
Tương tự Factory Pattern, Abstract Factory cũng có những đặc điểm như:
- Có một cây phân cấp class tạo bởi các class con với cùng 1 class cha
- Được dùng khi client muốn khởi tạo một object kiểu của class cha nhưng không biết (hoặc k cần biết) chính xác class con nào được khởi tạo.
- Che dấu các cơ chế bên trong trong việc khởi tạo object khỏi client

Tuy nhiên, với Abstract Factory, các khái niệm này sẽ có 1 chút nâng cấp. Abstract Factory cung cấp 1 interface để khởi tạo 1 họ các object. 

#### Nguyên nhân sử dụng
Abstract factory thường được sử dụng trong trường hợp client object muốn khởi tạo một trong một nhóm các class liên quan tới nhau mà không cần biết chính xác class nào cần khởi tạo. Việc sử dụng interface này giúp hạn chế việc lặp lại các interface trong khởi tạo instance. Các factory cụ thể sẽ triển khai từ interface này và khởi tạo các object theo logic của riêng mình. Client sẽ sử dụng các factory class này mà không cần quan tâm chính xác class nào sẽ được khởi tạo.

Việc sử dụng *abstract factory* thường có:
- Một họ hay một nhóm các class liên quan, phụ thuộc nhau
- Cần 1 nhóm các factory class triển khai interface mà abstract factory cung cấp.
    - Kiểm soát hay cung cấp truy cập tới 1 nhóm các class liên quan, phụ thuộc
    - Việc triển khai interface sẽ theo logic cụ thể của nhóm class mà nó kiểm soát

![image.png](https://images.viblo.asia/102688d1-d1bd-409a-9c32-21ffd37e0fc2.png)

#### Ví dụ
Abstract Factory thường được sử dụng cho các thư viện hay framework. Ví dụ dễ thấy nhất là về hệ thống JDBC driver. Mỗi driver sẽ chứa các class kế thừa các interface *Connection*, *Statement* và *ResultSet*. Một tập class của các driver khác nhau sẽ khởi tạo các class khác nhau. Tập class của Oracle JDBC driver hiển nhiên sẽ khác tập class chứa trong DB2 JDBC driver.
### 4. Prototype
#### Nguyên nhân sử dụng
- Khởi tạo 1 hoặc 1 loạt các object giống nhau hoặc chỉ khác nhau ở trạng thái 
- Khởi tạo từ đầu từng object sẽ tốn thời gian và cần nhiều quá trình

Cách sử dụng prototype pattern:
- Khởi tạo 1  object như một object mẫu
- Tạo các object khác thông qua copy object mẫu và thực hiện các thay đổi cần thiết

Thông thường trong java, các class đều kế thừa 1 hàm `clone()` từ `java.lang.Object`.

#### Shallow Copy và Deep Copy
|Shallow Copy | Deep Copy |
|---|---|
|Các thuộc tính nguyên thuỷ được giữ nguyên|Các thuộc tính nguyên thuỷ được giữ nguyên|
|Các object tầng trên cùng được sao chép| Các object tầng trên cùng được sao chép|
|Các object tầng dưới chỉ được sao chép con trỏ | Các object tầng dưới được sao chép|

#### Ví dụ
- Shallow Copy

```java
public class People implements Cloneable{
    private int age;
    private String name;
    private Car car;

    public People(int age, String name, Car car) {
        this.age = age;
        this.name = name;
        this.car = car;
    }

    @Override
    protected Object clone(){
        return new People(age, name, car);
    }
}

class Car {

    private String description;
    public Car(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
```

- Deep Copy
```java
public class People implements Cloneable{
    private int age;
    private String name;
    private Car car;

    public People(int age, String name, Car car) {
        this.age = age;
        this.name = name;
        this.car = car;
    }

    @Override
    protected Object clone(){
        return new People(age, name, new Car(car.getDescription());
    }
}

class Car {

    private String description;
    
    public Car(String description) {
        this.description = description;
    }


    public String getDescription() {
        return description;
    }
}
```

### 5. Builder
#### Nguyên nhân sử dụng
Thông thường, khi khởi tạo object, việc khởi tạo sẽ do hàm constructor của class thực hiện. Đối với các class mà việc khởi tạo đơn giản và giống nhau về quá trình khởi tạo. Tuy nhiên, hướng tiếp cận này sẽ gặp khó khăn nếu quá trình khởi tạo object phức tạp, cần nhiều bước do:
- quá trình khởi tạo gắn với object => tăng kích thước của class, giảm tính modular
- Nếu cần thêm hay thay đổi về logic triển khai => phải sửa lại các đoạn code có sẵn

Do đó, đối với các class mà việc khởi tạo phức tạp, người ta sẽ hướng tới việc tách các quá trình khởi tạo object ra khỏi class sang một class tách biệt là *builder*. Việc sử dụng builder pattern có một số ưu điểm sau:
- giảm kích thước của object
- nếu cần thêm hay sửa logic triển khai có thể sửa hoặc thêm builder
- quá trình khởi tạo sẽ độc lập các thành phần của object với nhau giúp tăng khả năng kiểm soát trong quá trình khởi tạo object

#### Mô hình chung
Mô hình đơn giản nhất cho kiểu thiết kế này là:

![image.png](https://images.viblo.asia/484a42ea-de62-40bf-8967-0beca8117dfa.png)

Khi đó quá trình khởi tạo 1 object sẽ thực hiện đơn theo các bước
- client khởi tạo object builder
- client khởi tạo các thành phần của object (`creatComponentX()`)
- client gọi tới `getObject()` để lấy object mong muốn

Tuy nhiên, hướng tiếp cận này vẫn có các hạn chế
- tất cả các client đều cần biết về logic khởi tạo object
- nếu logic khởi tạo thay đổi, tất cả các client sẽ phải thay đổi theo (coupling)

Do đó, một khái niệm mới được đưa ra để giải quyết vấn đề này là *Director*. Class này sẽ đảm nhận việc gọi tới các phương thức cần thiết để khởi tạo nên object. Các client khác nhau sẽ sử dụng Director để tạo object mong muốn và khi object đã khởi tạo xong chỉ cần gọi tới `getObject()` của builder class để lấy được object mình cần. Quá trình khởi tạo sẽ như sau

- client khởi tạo object builder mình cần
- client khởi tạo object director với builder đã tạo 
- client gọi tới hàm `build` của director
- Director dựa theo builder sẽ gọi tới các hàm khởi tạo các thành phần của object
- clietn gọi tới `getObject()` để lấy được object mong muốn sau khi quá trình khởi tạo kết thúc


#### Ví dụ
Ở đây mình sẽ demo với một ví dụ đơn giản, chỉ thể hiện chức năng của builder nhưng chưa thể hiện hết ưu nhược điểm của nó.

Đầu tiên là các class dữ liệu
- Họ các sản phẩm loại A
```java
public class ProductA {
    @Override
    public String toString() {
        return this.getClass().getSimpleName().toString();
    }
}
```
```java
public class ProductA1 extends ProductA{
}
```
```java
public class ProductA2 extends ProductA{
}
```

- Họ các sản phẩm loại B

```java
public class ProductB {
    @Override
    public String toString() {
        return this.getClass().getSimpleName().toString();
    }
}
```
```java
public class ProductB1 extends ProductB{
}
```
```java
public class ProductB2 extends ProductB{
}
```
- Class `menu` sử dụng các sản phẩm khác nhau cho mỗi menu

```java
public class Menu {
    private ProductA productA;
    private ProductB productB;
    //other components

    public Menu() {
    }

    public ProductA getProductA() {
        return productA;
    }

    public void setProductA(ProductA productA) {
        this.productA = productA;
    }

    public ProductB getProductB() {
        return productB;
    }

    public void setProductB(ProductB productB) {
        this.productB = productB;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "productA=" + productA +
                ", productB=" + productB +
                '}';
    }
}
```

Tiếp theo là các class builder
```java
public interface Builder {
    void addProductA();
    void addProductB();
    Menu getMenu();
    void generateData();
}
```
```java
public class MenuBuilderA implements Builder{
    private Menu menu = new Menu();

    @Override
    public void addProductA() {
        menu.setProductA(new ProductA1());
    }

    @Override
    public void addProductB() {
        menu.setProductB(new ProductB1());
    }
        @Override
    public void generateData() {
        //generate necessary data of the object
    }

    @Override
    public Menu getMenu() {
        return menu;
    }
}
```
```java
public class MenuBuilderB implements Builder{
    private Menu menu = new Menu();

    @Override
    public void addProductA() {
        menu.setProductA(new ProductA2());
    }

    @Override
    public void addProductB() {
        menu.setProductB(new ProductB2());
    }
        @Override
    public void generateData() {
        //generate necessary data of the object
    }

    @Override
    public Menu getMenu() {
        return menu;
    }
}
```

Đối với trường hợp không sử dụng *Direction*, mọi việc khởi tạo với builder sẽ do client đảm nhận, do đó, ta có thể test đơn giản như sau
```java
public class Test {
    public static void main(String[] args) {
        Menu menu;
        //client create concrete builder
        MenuBuilderA menuBuilderA = new MenuBuilderA();
        //client init object's components
        menuBuilderA.addProductA();
        menuBuilderA.addProductB();
         menuBuilderA.generateData();
        //client receive expected object
        menu = menuBuilderA.getMenu();
        System.out.println(menu);
    }
}
```

Trường hợp sử dụng *Director*, ta sẽ sử dụng thêm 1 class `Director` đảm nhận phần việc khởi tạo các thành phần của object

```java
public class Director {
    private final Builder builder;


    public Director(Builder builder) {
        this.builder = builder;
    }

    public void build() {
        builder.addProductA();
        builder.addProductB();
        builder.generateData();
    }
}
```

Khi đó, công việc của client sẽ là khởi tạo director với builder tương ứng và gọi tới `build()` mà không cần quá quan tâm đến cấu trúc, logic của builder. Ngoài ra, client có thể thay đổi object mong muốn bằng cách tạo mới một director mới thay vì phải thay đổi toàn bộ đoạn code khởi tạo các thành phần của object.

```java
public class Test {
    public static void main(String[] args) {
        Menu menu;
        //client create concrete builder
        MenuBuilderA menuBuilderA = new MenuBuilderA();
        //client init object's components
        Director director = new Director(menuBuilderA);
        director.build();
        //client receive expected object
        menu = menuBuilderA.getMenu();
        System.out.println(menu);
    }
}
```