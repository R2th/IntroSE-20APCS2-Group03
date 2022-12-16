# So sánh Java với Kotlin

[Kotlin](https://viblo.asia/p/tu-java-den-kotlin-khi-cu-phap-khong-con-la-noi-lo-WAyK8kJ95xX) - Một ngôn ngữ ra đời với việc thừa kế những sự tốt đẹp của Java và giải quyết những vấn đề mà Java gặp phải.
Điều đầu tiên cũng như là nội dung chính mà trong bài viết này tôi muốn đề cập đến đó là syntax. Kotlin syntax ở một góc nhìn nào đó rất giống Java, nhưng cũng rất khác. Số dòng code của Kotlin giảm đến 40% so với Java theo như quảng cáo với cùng một mục đích. Kotlin ngắn gọn và rõ ràng hơn.

>[ Bài viết](https://viblo.asia/p/tu-java-den-kotlin-khi-cu-phap-khong-con-la-noi-lo-WAyK8kJ95xX) lấy dữ liệu tham khảo từ Github: [https://github.com/fabiomsr/from-java-to-kotlin](https://github.com/fabiomsr/from-java-to-kotlin)

##   1. Basic
### Print
Java
```
System.out.print("Hello, World!");
System.out.println("Hello, World!");
```

Kotlin
```
print("Hello, World!")
println("Hello, World!")
```

### Variables I
Java
```
final int x;
final int y = 1;
```

Kotlin
```
val x: Int
val y = 1
```

### Variables II
Java
```
int w;
int z = 2;
z = 3;
w = 1;
```

Kotlin
```
var w: Int
var z = 2
z = 3
w = 1 
```

### Null I
Java
```
final String name = null;

String lastName;
lastName = null
```

Kotlin
```
val name: String? = null

var lastName: String?
lastName = null

var firstName: String
firstName = null // Compilation error!!
```

### Null II
Java
```
if(text != null){
  int length = text.length();
}
```

Kotlin
```
val length = text?.length

val length = text!!.length
```

### Strings I
Java
```
String name = "John";
String lastName = "Smith";
String text = "My name is: " + name + " " + lastName;
String otherText = "My name is: " + name.substring(2);
```

Kotlin
```
val name = "John"
val lastName = "Smith"
val text = "My name is: $name $lastName"
val otherText = "My name is: ${name.substring(2)}"
```

### Strings II
Java
```
String text = "First Line\n" +
              "Second Line\n" +
              "Third Line";
```

Kotlin
```
val text = """
        |First Line
        |Second Line
        |Third Line
""".trimMargin()
```

### Ternary Operator
Java
```
String text = x > 5 ? "x > 5" : "x <= 5";
```

Kotlin
```
val text = if (x > 5)
              "x > 5"
            else "x <= 5"
```


## 2. Functions
### Basic Function
Java
```
public void hello() {
  System.out.print("Hello, World!");
}
```

Kotlin
```
fun hello() {
    println("Hello, World!")
}
```

### Arguments
Java
```
public void hello(String name){
  System.out.print("Hello, " + name + "!");
}
```

Kotlin
```
fun hello(name: String) {
    println("Hello, $name!")
}
```

### Default Values
Java
```
public void hello(String name) {
  if (name == null) {
    name = "World";
  }

  System.out.print("Hello, " + name + "!");
}
```

Kotlin
```
fun hello(name: String = "World") {
    println("Hello, $name!")
}
```

### Return
Java
```
public boolean hasItems() {
  return true;
}
```

Kotlin
```
fun hasItems() : Boolean {
    return true
}
```

### Single-Expression
Java
```
public double cube(double x) {
  return x * x * x;
}
```

Kotlin
```
fun cube(x: Double) : Double = x * x * x
```

## 3. Classes
### Constructor Call
Java
```
final File file = new File("file.txt");
```

Kotlin
```
val file = File("file.txt")
```

### Class
Java
```
public final class User {}
```

Kotlin
```
class User
```

### Open Class
Java 
```
public class User {} 
```

Kotlin
```
open class User
```

### Final Attributes
Java 
```
final class User {
     private final String name;

     public User(String name) {
         this.name = name;
     }

     public String getName() {
         return name;
     }
 }
```

Kotlin
```
class User(val name: String)
```

### Primary Constructor
Java 
```
final class User {
     private String name;

     public User(String name) {
         this.name = name;
     }

     public String getName() {
         return name;
     }

     public void setName(String name) {
         this.name = name;
     }
 }
```

Kotlin
```
class User(var name: String)
```

### Optional Arguments in Constructors
Java 
```
final class User {
     private String name;
     private String lastName;

     public User(String name) {
         this(name, "");
     }

     public User(String name, String lastName) {
         this.name = name;
         this.lastName = lastName;
     }

     // And Getters & Setters
 }
```

Kotlin
```
class User(var name: String, var lastName: String = "")
```

### Properties
Java 
```
public class Document {
    private String id = "00x";

     public String getId() {
         return id;
     }

     public void setId(String id) {
         if(id != null && !id.isEmpty()) {
             this.id = id;
         }
     }
 }
```

Kotlin
```
class Document{
    var id : String = "00x"
        set(value) {
            if(value.isNotEmpty())  field = value
        }
}
```

Mong rằng qua [bài này](https://viblo.asia/p/tu-java-den-kotlin-khi-cu-phap-khong-con-la-noi-lo-WAyK8kJ95xX) các bạn có cái nhìn tổng quát nhất về Kotlin, về sự linh hoạt, tiện lợi và những đặc điểm ưu việt mà nó mang lại.
Cảm ơn các bạn đã quan tâm!

Xem thêm: [Xây dựng Blockchain đơn giản chưa tới 40 dòng code](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-40-lines-of-code-RQqKLzm4l7z)