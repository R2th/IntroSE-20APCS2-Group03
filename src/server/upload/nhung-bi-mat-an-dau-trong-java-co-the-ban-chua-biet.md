Là một developer, có thể bạn sử dụng ngôn ngữ lập trình Java nhiều năm nhưng, không hẳn đã biết những bí mật ẩn dấu của Java về annotations, initialization, comments, và enum interfaces.

## 1. Thực thi Annotation Implementation
Kể từ Java 5 (JDK 1.5), các annotation trở thành một phần không thể thiếu của các ứng dụng và các framework Java. Trong phần lớn các trường hợp, các annotation được áp dụng cho các cấu trúc ngôn ngữ như class, field, method, v.v, nhưng có một trường hợp khác mà annotaion có thể áp dụng là tính thực thi interface. Xét ví dụ như sau:
```
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
    String name();
}
```

Thông thường, chúng ta sử dụng annotation Test bên trên cho method như sau:
```
public class MyTestFixure {
    @Test
    public void givenFooWhenBarThenBaz() {
        // ...
    }
}
```
Còn cách tạo và thực thi Interface mà ta vẫn làm hàng ngày như sau.
Tạo một interface mới.
```
public interface TestInstance {
    public String getName();
}
```
và thực thi interface trên.
```
public class FooTestInstance implements TestInstance {
    @Override
    public String getName() {
        return "Foo";
    }
}
TestInstance myTest = new FooTestInstance();
```
Đó là việc thường ngày một Java developer vẫn làm.
Sau đây là ẩn dấu của Java, đó là ta có thể thực thi annotation Test ở trên.
```
public class FooTest implements Test {
    @Override
    public String name() {
        return "Foo";
    }
    @Override
    public Class<? extends Annotation> annotationType() {
        return Test.class;
    }
}
```
Như trên thì dù annotation và interface của ta gần như giống hệt nhau với sự trùng lặp rất đáng chú ý, dường như không có cách gì để hợp nhất hai cấu trúc ấy. Thật may mắn, ngoại hình đôi khi chỉ là lừa dối và Thực thi annotation chính là kĩ thuật để hợp nhất hai cấu trúc ấy.
Lưu ý: *Chúng ta phải ghi đè method `annotationType()` và trả về kiểu của annotation (ở đây là Test class)*.

## 2. Instance Initialization
Trong Java, cũng giống như hầu hết các ngôn ngữ lập trình hướng đối tượng khác, các đối tượng có thể được tạo (gán giá trị) bởi các hàm tạo (constructor). Tuy nhiên khi chúng ta tạo các method tĩnh cho việc khởi tạo các object, đơn giản là chúng ta gói (bọc) một lệnh gọi đến hàm tạo của một object để khởi tạo nó. Ví dụ:
```
public class Foo {
   private final String name;
   private Foo(String name) {
       this.name = name;
   }
   public static Foo withName(String name) {
       return new Foo(name);
   }
}
Foo foo = Foo.withName("Bar");
```
Therefore, when we wish to initialize an object, we consolidate the initialization logic into the constructor of the object. For example, we set the name field of the Foo class within its parameterized constructor. While it may appear to be a sound assumption that all of the initialization logic is found in the constructor or set of constructors for a class, this is not the case in Java. Instead, we can also use instance initialization to execute code when an object is created:

Do đó, khi chúng ta muốn khởi tạo một đối tượng, chúng ta hợp nhất logic khởi tạo vào hàm tạo của đối tượng. Ví dụ, chúng ta đặt trường tên của lớp Foo trong hàm tạo được tham số hóa của nó. Mặc dù có vẻ như là một giả định hợp lý rằng tất cả logic khởi tạo được tìm thấy trong hàm tạo hoặc tập hợp các hàm tạo cho một lớp, nhưng đây không phải là trường hợp trong Java. Thay vào đó, chúng ta cũng có thể sử dụng khởi tạo cá thể để thực thi mã khi một đối tượng được tạo.
```
public class Foo {
    {
        System.out.println("Foo:instance 1");
    }
    public Foo() {
        System.out.println("Foo:constructor");
    }
}
```

## 3. Khởi tạo cùng khai báo biến
Trong Java khi bạn muốn khai báo một List với 3 phần tử thì bạn thường làm như sau, phải không nào.
```
List<Integer> myInts = new ArrayList<>();
myInts.add(1);
myInts.add(2);
myInts.add(3);
```
Nhiều ngôn ngữ lập trình có cơ chế hỗ trợ việc khai báo biến và khởi tạo giá trị ban đầu đồng thời cho kiểu dữ liệu List, Map. Với ngôn ngữ Java kể từ Java 8 trở về trước thì không có cơ chế nào như vậy nhưng từ Java 9 thì ta có thể làm điều đó.
```
List<Integer> myInts = new ArrayList<>() {{add(1); add(2); add(3);}};
```
Khá thuận tiện và hữu ích phải không nào. Với dữ liệu kiểu Map ta cũng có thể làm tương tự.
```
Map<String, Integer> myMap = new HashMap<>() {{
    put("Foo", 10);
    put("Bar", 15);
}};
```

## 4. Chạy cả Comments
Nghe có vẻ "sốc" đúng không ạ. Code đã comment mà còn thực thi được thì quả thật là tai họa. Vâng, đúng là code đã comment vẫn có thể chạy được nếu ta ap dụng thủ thuật sau.
```
public static void main(String args[]) {
    int value = 5;
    // value = 8;
    System.out.println(value);
}
```
Kết quả in ra console sẽ là 5, không có gì cần bàn cãi.
Giờ ta sẽ xử lý một để kết quả in ra console là 8.
```
public static void main(String args[]) {
    int value = 5;
    // \u000dvalue = 8;
    System.out.println(value);
}
```
Bạn đã thử chưa? Kết quả đúng là 8. Vậy điều gì đã xảy ra? Đúng là dòng code đã comment được chạy như code thông thường.
Lý do là vì chuỗi Unicode `\u000d` là kí tự xuống dòng về đầu dòng trong trình biên dịch Java. Thực tế sau khi biên dịch thì code được hiểu như sau.
```
public static void main(String args[]) {
    int value = 5;
    // 
value = 8;
    System.out.println(value);
}
```
Vậy bức màn bí mật đã được vén.

## 5. Enum thực thi Interface
Một trong những hạn chế của enums so với class trong ngôn ngữ Java là enums không thể mở rộng (extends) từ class hay enums nào. Nghĩa là ta không thể thực hiện được như dưới.
```
public class Speaker {
    public void speak() {
        System.out.println("Hi");
    }
}
public enum Person extends Speaker {
    JOE("Joseph"),
    JIM("James");
    private final String name;
    private Person(String name) {
        this.name = name;
    }
}
Person.JOE.speak();
```

Tuy nhiên, ta có thể cho enums thực thi interface và mô tả cho các abstract method của nó như sau.
```
public interface Speaker {
    public void speak();
}
public enum Person implements Speaker {
    JOE("Joseph"),
    JIM("James");
    private final String name;
    private Person(String name) {
        this.name = name;
    }
    @Override
    public void speak() {
        System.out.println("Hi");
    }
}
Person.JOE.speak();
```
Giờ chúng ta có thể sử dụng một thể hiện của đối tượng Person ở bất cứ đâu đối tượng Speaker được yêu cầu. Hơn nữa, chúng ta cũng có thể cung cấp việc triển khai cá phương thức abstract của interface trên cơ sở mỗi hằng số, gọi là phương pháp constant-specific.
```
public interface Speaker {
    public void speak();
}
public enum Person implements Speaker {
    JOE("Joseph") {
        public void speak() { System.out.println("Hi, my name is Joseph"); }
    },
    JIM("James"){
        public void speak() { System.out.println("Hey, what's up?"); }
    };
    private final String name;
    private Person(String name) {
        this.name = name;
    }
    @Override
    public void speak() {
        System.out.println("Hi");
    }
}
Person.JOE.speak();
```

Trên đây là một số "bí mật" được ẩn dấu trong ngôn ngữ Java. Một số tính năng không có nguy hại gì, ta có thể sử dụng ở những thời điểm thích hợp. Riêng tính năng Code comment có thể thực thi thì cần lưu ý, nếu dùng sai sẽ gây hậu quả nghiêm trọng cho ứng dụng. Nó còn có thể được xem như là một lỗi của ngôn ngữ Java.

## Tài liệu tham khảo
* [dzone- 5 hidden secrets in Java](https://dzone.com/articles/5-hidden-secrets-in-java)