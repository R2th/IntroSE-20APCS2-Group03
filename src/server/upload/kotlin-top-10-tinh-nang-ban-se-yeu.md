Chúng ta rất dễ rơi vào tình yêu với Kotlin khi chúng ta muốn thử học nó. Tôi sẽ chia sẻ về 10 tính năng tôi cho là tốt nhất của Kotlin.
## Null safety
Kotlin là ngôn ngữ null safety.
```
class Owner {
  
  var adress: String = ""
  var telephone: String = ""
  var email: String? = null
}
```
adress và telephone không phải là null - một lỗi xảy ra lúc biên dịch nếu bạn muốn đặt giá trị của chúng là null

![](https://images.viblo.asia/20eb7f05-5238-4ca1-9048-3f7fc3abad44.png)

Bạn cần explicity rằng một biến là nulable để có thể gán null cho nó. Điều này được thể hiện thông qua `?` được chèn ngay sau kiểu(xem ví dụ về biến email ở trên).
```
var a: String = "abc"
a = null // compilation error

var b: String? = "abc"
b = null // ok

val y: String = null // Does not compile.
```
Code của bạn có thể fail tại complie-time bất cứ khi nào một NPE - 1 trong những Exception phổ biến nhất trong Java, được ném vào run-time
```
val x: String? = "Hi"
x.length // Does not compile.
```
Để giả quyết lỗi biên dịch của x.length bạn có thể sử dụng if-statement:
```
if (x != null) {
  x.length // Compiles! Not idiomatic just to get length!
}
```
Một cách tốt hơn là thông qua "safe calls in Kotlin" trả về giá trị của biến x nếu x không phải là null, nếu không sẽ trả về null.
```
x?.length

/*
You can tell to compiler that you know the variable cannot be null 
at run-time via non-null operator "!!"
*/
val len = x!!.length // Will throw if null.
```
## Data Class
Khi bạn tạo ra những class không làm gì ngoài việc chứa data. Những class này được Kotlin thể hiện bằng data `class`. Ví dụ bạn tạo lớp khách hàng chứa dữ liệu về id, name, email của khách hàng
Trong Java:
```
public class Customer {

    private int id;
    private String name;
    private String email;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```
Trong Kotlin:
```
data class Customer(val id: Int, val name: String, val email: String)
```
Trình biên dịch của Kotlin sẽ làm tất cả những điều trên cho bạn:
* generate functions: `hasCode()`, `equals()`, `toString()`
* Thêm `copy()` function: Đôi khi bạn cần phải sao chép một đối tượng sang một đối tượng mới với các giá trị khác nhau của biến
    ```
    val customerSouhrada = Customer(id = 2001, name = "Vaclav Souhrada", email = "vsouhrada@email.com")
    val updatedCstSouhrada = customerSouhrada.copy(email = "vaclav_souhrada@email.com")
    ```
* [ComponentN() functions](https://kotlinlang.org/docs/reference/multi-declarations.html)
## Extension Functions
Kotlin cho phép chúng ta mở rộng chức năng của các lớp hiện có mà không cần thừa kế từ chúng.
```
fun String.capitalize(): String {
  return this.toUpperCase()
}
```
Hàm capitalize() là một hàm mở rộng của class String. Bêm trong hàm này, bạn truy cập đối tượng mà nó được gọi bằng cách sử dụng từ khóa `this`.
```
fun String.hello() {
  println("Hello, $this!")
}

fun String.and(input: String): String {
  return "${this} $input"
}
```
Extensions không sửa đổi các lớp mà nó mở rộng và được giải quyết tĩnh.
```
fun main(args: Array<String>) {
  println("vaclav souhrada".capitalize()) // prints VACLAV SOUHRADA

  "Vaclav".hello() // prints 'Hello, Vaclav!'

   var testString = "This is a string".and("This is another")
   println(testString) // prints 'This is a string This is another'
}
```
Nhờ extensions mà các function clean hơn nhiều. Chúng ra ko cần các lớp `xxUtils.(.java)` nữa.
Chuyển đổi sang JSON có thể là một ví dụ cho việc sử dụng các hàm mở rộng.
Hãy minh họa nó trên một ví dụ rất đơn giản để bổ sung chức năng mở rộng cho tất cả “đối tượng” trong Kotlin. (kotlin.Any và java.lang.Object là các kiểu khác nhau, nhưng trong run-time, chúng được biểu diễn với cùng lớp java.lang.Object).
```
val gson = Gson()
// ...
fun Any.toJSON(): String {
  return gson.toJson(this)
}
// ...

// Now if we want to convert it to JSON we can just simple call ourObject.toJSON()
val customer = Customer(id = 2001, name = "Vaclav Souhrada", email = "vsouhrada@email.com")
val json = customer.toJSON()
```
## Smart Cast
Đây là một trong những tính năng yêu thích của mình.
Bao lâu tthì bạn catsted các đối tượng một lần? Bạn thường phát hiện ra sau bao lâu thì nó thực sự bị dư thừa?
Ví dụ nếu bạn muốn kiểm tra Object là một thể hiện của java.lang.String, để in ra length của chuỗi text bạn cần phải kiểm tra kiểu đầu tiên và sau đó đưa đối tượng vào String trước khi truy cập vào phương thức cụ thể từ đối tượng String.

![](https://images.viblo.asia/ede92411-f2b0-4281-813b-49aa391be5d1.png)

Trình biên dịch của Kotlin thật sự thông minh khi nói đến việc truyền. Nó sẽ xử lý tất cả các redundant casts cho bạn.
Toán tử `instanceof` của Java trong Kotlin được gọi là `is`. Bạn có thể thấy trong ví dụ mà trong Kotlin bạn không cần phải cast đối tượng bên trong câu lệnh nếu bạn kiểm tra nó với toán tử `is`. 
Biểu thức đại diện cho một ví dụ khác của smart casts:

![](https://images.viblo.asia/c638a5fe-3400-412f-955c-d4db5a0a248f.png)

Tập hợp smart cast cùng với biểu thức làm cho code có thể readble:

![](https://images.viblo.asia/a8815539-fa93-4263-ba7a-8abcf6b14863.png)

Trong ví dụ trên bạn có thể xem cách thể hiện trong Java nhưng trong Kotlin bạn có thể tóm tắt nó trong mã này

![](https://images.viblo.asia/e2d2f07d-3c8c-483a-b1fe-efc15dc29a97.png)

## Singleton(Object)
Một tính năng khác đó là sự đớn giản của việc xác định `singleton`. Xem xét ví dụ sau về cách singleton có thể được tạo ra trong Java.
```
public class SingletonInJava {

    private static SingletonInJava INSTANCE;

    public static SingletonInJava getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new SingletonInJava();
        }

        return INSTANCE;
    }   
}
```
Kotlin có một cách để xác định singleton một cách rất thông minh. Bạn có thể sử dụng từ khóa có phép bạn xác định một đối tượng chỉ tồn tại dưới dạng một single instance.
```
object SingletonInKotlin {

}

// And we can call
SingletonInKotlin.doSomething()
```
## Functional Programming
Sự kết hợp giữa biểu thức lambda và thư viện Kotlin giúp chúng ta dễ dàng hơn khi làm việc với các collections
```
val numbers = arrayListOf(10 ,5 , -9, 9, 11, 5, -6)
val nonNegative = numbers.filter { it >= 0}

println(nonNegative) // [10, 5, 9, 11, 5]
```
hoặc 
```
// Sum of all elements: 25
println(numbers.foldRight(0, { a, b -> a + b }))

//20 10 -18 18 22 10 -12
numbers.forEach { println("${it * 2} ") }

val kindOfNumbers: Iterable<String> = numbers.filter { it < 0 }
       .map { "$it is negative" }

println(kindOfNumbers) // [-9 is negative, -6 is negative]
```

## Type Inference
Trong Kotlin, bạn không cần phải chỉ định kiểu của từng biến một cách rõ ràng:
```
val name = "Vaclav"
val age = 31

// Only need Iterable interface
val list: Iterable<Double> = arrayListOf(1.0, 0.0, 3.1415, 2.718) 
// Type is ArrayList
val arrayList = arrayListOf("Kotlin", "Scala", "Groovy") 
```
## DEFAULT ARGUMENTS
Trong Java, bạn thường duplicate code để xác định các biến khác nhau của một phuơng thức hoặc một hàm khởi tạo:
```
public class OperatorInfoInJava {

    private final String uuid;
    private final String name;
    private final Boolean hasAccess;
    private final Boolean isAdmin;
    private final String notes;

    public OperatorInfoInJava(String uuid, String name, Boolean hasAccess, 
                              Boolean isAdmin, String notes) {
        this.uuid = uuid;
        this.name = name;
        this.hasAccess = hasAccess;
        this.isAdmin = isAdmin;
        this.notes = notes;
    }

    public OperatorInfoInJava(String uuid, String name) {
        this(uuid, name, true, false, "");
    }

    public OperatorInfoInJava(String name, Boolean hasAccess) {
        this(UUID.randomUUID().toString(), name, hasAccess, false, "");
    }
```
Khi chuyển sang Kotlin bạn có thể đơn giản loại bỏ tất cả chúng khi sử dụng default arguments.
```
class OperatorInfoInKotlin(val uuid: String = UUID.randomUUID().toString(),
   val name: String,
   val hasAccess: Boolean = true,
   val isAdmin: Boolean = false,
   val notes: String = "") {}
```
## Named Arguments
Các default arguments trở nên mạnh mẽ hơn khi kết hợp với các đối số được đặt tên. 
Quay lại với Java.
```
new OperatorInfoInJava("Vaclav", false, false, "blabla");
```
Dựa trên mã Java trên bạn sẽ không biết giá trị nào được đặt mà không biết OperatorInfoInJava class. 
## Collections
Trong Kotlin, bạn có các higher-order functions, lambda expressions, operator overloading, lazy evaluation và nhiều phuơng thức hữu ích khác làm việc với collection.
Các functions mở rộng và có nhiều phần mở rộng hữ ích để làm việc với các bộ sưu tập.
```
public double getAverageAge(@NotNull List<Employee> employees) {
  int ageSum = 0;
  int count= 0;

  for (Employee employee : employees) {
    if ("Pilsen".equals(employee.getCity()) {
      ageSum += employee.getAge();
      count++;
    }
  }

  if (count == 0) return 0

  return ageSum / count;
}
```
Bạn có thể filter và giữ tất cả employees đến từ Pilsencity như sau:
```
fun getAverageAge(val employees: List<Employee>): Double {
  return employees.filter{ it.city == City.PILSEN }.map{ it.age }.average()
}
```
# Kết luận
Trên đây ta đã lướt qua một vài tính năng thú vị của Kotlin. Cảm ơn các bạn đã theo dõi.
References: https://www.emanprague.com/en/blog/kotlin-top-10-features-youll-love/