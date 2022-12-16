# Overview 
Java ban đầu được phát triển bới Sun Microsystem, khởi sướng bởi James Gosling và ra mắt vào năm 1995. Hiện nay, Java là ngôn ngữ lập trình phổ biến, được sử dụng cho nhiều sản phẩm công nghệ. Chúng ta có thể nêu ra một số đặc điểm nổi bật của Java như sau:
* Là ngôn ngữ lập trình bậc cao
* Là ngôn ngữ lập trình hướng đối tượng (Object oriented). Trong Java tất cả đều là đối tượng (Object)
* Không phụ thuộc vào nền tảng (Platform independent). Không giống như nhiều ngôn ngữ khác như C và C++, khi biên dịch chương trình Java nó sẽ không biên dịch vào nền tảng xác định trên máy mà biên dịch ra dạng byte code không phụ thuộc vào nền tảng. Byte code có thể chạy trên tất các thiết bị có cài đặt  JVM - Java Virtual Machine.
* Là một ngôn ngữ đa luống (Multithreaded). Người viết chương trình bằng Java có thể viết để chương trình chạy nhiều luồng đồng thời.
* Hiệu năng cao

# Basic Syntax
## Các thành phần cơ bản trong 1 chương trình Java

* Object - Đối tượng có các trạng thái và hành vi.
* Class - Như một cái khuôn để tạo lên Object, định nghĩa các trạng thái và hành vi của Object
* Methods - Là hành vi, class có nhiều hành vi. Ở các method là nơi xử lý logic và thao tác với dữ liệu.
* Instance variables - Object có một bộ các biến thực thể (instance variable) không trùng lặp. Giá trị được gán vào các biến thực thể tạo lên trạng thái của Object

## Chương trình đầu tiên
```java
public class MyFirstJavaProgram {

   /* This is my first java program.
    * This will print 'Hello World' as the output
    */

   public static void main(String []args) {
      System.out.println("Hello World"); // prints Hello World
   }
}
```

## Các nguyên tắc cú pháp cơ bản
* Phân biệt HOA thường. Trong java khi định nghĩa Hello và hello thì sẽ là khác nhau.
* Class name cần viết hoa chữ cái đầu tiên và mỗi từ trong tên cần được viết hoa chữ cái đầu tiên. VÍ dụ: MyFirstJavaProgram.class
* Method name viết thường chữ cái đầu tiên, còn những chữ cái đầu tiên của các từ ở sau thì viết HOA. Ví dụ: myFirstJavaMethod()
* Program File Name: Tên của file cần giống chính xác với tên class trong file đó. Ví dụ: class MyFirstJavaProgram thì tên file của nó cũng là MyFirstJavaProgram.java
* Tiền trình của chương trình Java bắt đầu từ hàm main(String []args), đây là một điều bắt buộc với mỗi chương trình Java.

## Định nghĩa trong Java (Java identifiers)
Tất cả các thành phần trong chương trình Java đều cần có tên. Như class, method, variable đó gọi là định nghĩa (Identifiers). Có một số nguyên tắc khi tạo định nghĩa như sau:
* Tất cả các định nghĩ đều phải bắt đầu bằng chữ cái, ký tự $ hoặc gạch dưới (\_), sau đó có thể gồm các ký tự khác.
* Định nghĩ không được trùng với các key word trong Java
* Sử dụng nguyên tắc case sensitive. Ví dụ: FirstJavaProgram.class, firstMethod()
* Ví dụ về định nghĩa hợp lệ:  doSomeThing(), abc, $123, \_abc
* Ví dụ về định nghĩa không hợp lệ: 123, if, -salary

## Biến trong Java (Java variables)
* Local variables
* Class variables (Static variables)
* Instance variables (Non-static variables)

## Mảng (Array)
Mảng (Array) là đối tượng lưu trữ nhiều các biến cùng một kiểu. Bản thân mảng là đối tượng trong heap

## Java Enums
Enums hạn chế một biến chỉ có một giá trong một một vài giá trị được định nghĩa trước. 
Example:
```java
class Phone {
    enum Type {SAMSUNG, APPLE};
    Type type;

    public class PhoneTest {
        public class void main(String []args) {
            Phone myPhone = new Phone();
            myPhone.type = Phone.Type.SAMSUNG;
            System.out.println("My phone type: " + myPhone.type);
        }
    }
}
```

## Java keyword
Những keyword được liệt kê dưới đây không được sử dụng trong các định nghĩa của Java

|abstract|	assert|	boolean	|break|
| -------- | -------- | -------- | -------- |
|byte|	case|	catch|	char|
|class|	const|	continue|	default|
|do	|double	|else|	enum|
|extends|	final	|finally	|float|
|for|	goto|	if|	implements|
|import|	instanceof	|int	|interface
long|	native|	new|	package|
|private|	protected|	public	|return|
|short	|static	|strictfp	|super
|switch|	synchronized|	this	|throw
|throws|	transient	|try	|void
|volatile	|while		|

## Comment
Java hỗ trợ comment 1 dòng và comment nhiều dòng
Tất cả nội dung trong commet sẽ được trình biên dịch bỏ qua
Example:
```java
public class MyFirstJavaProgram {

   /* This is my first java program.
    * This will print 'Hello World' as the output
    * This is an example of multi-line comments.
    */

   public static void main(String []args) {
      // This is an example of single line comment
      /* This is also an example of single line comment. */
      System.out.println("Hello World");
   }
}
```

## Class và object
* Đối tượng (Object) - Object thì có các trạng thái, thuộc tính và hành vi. Ví dụ trong thực tế như: Đối tượng con người sẽ có thuộc tính tên, tuổi, địa chỉ, trạng thái như tình trạng hôn nhân và các hành vi như lao động, nghỉ nghơi.
* Lớp (Class) - Một lớp như một bản vẽ, bản thiết kế mô tả các thuộc tính, trạng thái và hành vi và đối tượng sẽ có.

### Object
Chúng ta có  thể thấy trong thực tế có rất nhiều các đối tượng. Như máy tính, ô tô, con chó, con mèo, con người. Các đối tượng thì đều có các thuộc tính, trạng thái và các hành vi.
Khi so sánh phần mềm máy tính với thực tế thì thấy chúng nhiều điểm tương đồng. Đối tượng trong phần mềm máy tính cũng có các thuộc tính, trạng thái và hành vi. Đối tượng của phần mềm có các trạng thái được lưu trong các trường và hành vi được thể hiện qua các phương thức. Trong phần mềm thì các phương thức sẽ xử lý và tính toán trên chính các trường của đối tượng và giao tiếp với các đối tượng khác. Để định nghĩa được các trường và phương thức của đối tượng thì cần lớp (class).

### Class 
Class là bản thiết kế khi tạo ra các đối tượng. Ví dụ về 1 class:
```
public class Student {
    String name;
    int age;
    String address
    String schoolName;
    
    void learn() {
    }
    
    void eat() {
    }
    
    void sleep() {
    }
}
```

Trong class có thể chứa các kiểu biến sau:
* Local variables: Biến này được định nghĩa trong các phương thức, hàm khởi tạo hay các khối code. Biến này sẽ được khởi tạo trong phương thức và sẽ được hủy khi phương thức hoàn thành.
* Instance variables: Biến này ở trong class nhưng ở ngoài các phương thức. Những biến này được khởi tạo khi đối tượng được khởi tạo và có thể được truy cập bởi các phương thức, hàm khởi tạo. Biến này sẽ được hủy khi đối tượng chứa nó bị hủy.
* Class variable: Biến này được định nghĩa ở lớp, ngoài các phương thức, với từ khóa static ở phía trước. Biến này tồn tại cùng với lớp.

#### Constructors (Hàm khởi tạo)
Constructors là một khái niệm quan trọng của class. Nó phải trùng tên với class. Khi một đối tượng của class được tạo ra, constructors sẽ khởi tạo các trạng thái ban đầu của đối tượng đó. Một class có thể có nhiều constructor. Nếu bạn không viết constructor trong class thì sẽ chạy constructor mặc định. Ví dụ về constructor:
```
public class Student {
    String name;
    int age;
    String address
    String schoolName;
    
    public Student() {
        this.name = "Hung";
        this.age = 20;
        this.address = "Hanoi";
        this.schoolName = "uet";
    }
    
    public Student(String name, int age, String address, String schoolName) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.schoolName = schoolName;
    }
```

### Tạo một đối tượng và thao tác vs đối tượng đó
```
public class Main {
    public static void main(String[] args) {
        Student student1 = new Student();
        Student student2 = new Student("Kien", 21, "Hai Duong", "HUS");
        student1.name = "Linh";
        student2.learn();
    }
}
```