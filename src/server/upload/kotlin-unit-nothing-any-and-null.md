## Unit 

`Unit` type trong Kotlin tương đương với void type trong Java.

Hoặc bạn cũng có thể xem nó là giá trị trả về của các statement không trả về giá trị nào (ví dụ như `println()`)

```
fun whatIsLove(){
  println("Baby don't hurt me!")
}
```

Trong Kotlin chúng ta sẽ có 2 cách để định nghĩa 1 function hoặc 1 method: Syntax tương tự Java hoặc dưới dạng biểu thức (expression)

Vì vậy chúng ta có thể dễ dàng rewrite lại bất kì statment nào không có giá trị trả về như 1 biểu thức trả về `Unit`.

Các biểu thức thì dễ dàng đọc hơn các statement trong trường hợp nó không quá dài, đối với 1 method dài dòng thì đây không phải 1 cách phù hợp. 

Trong thư viện chuẩn của Kotlin, Unit đơn giản được định nghĩa như 1 object, hoàn toàn kết thừa từ `Any` với 1 method overide cho `toString()`.

```
public object Unit {
    override fun toString() = "kotlin.Unit"
}
```

Object trong Kotlin là các `class` chỉ có 1 instance được tạo trong trình khởi tạo của static class. 

```
object JustAnObject {
    override fun toString(): String {
        return "JustAnObject"
    }
}
```

Nó được dịch ra như 1 class `JustAnObject` với 1 static method `INSTANCE` để lấy 1 singleton instance.

```
GETSTATIC com/ubertob/unitnothingany/JustAnObject.INSTANCE : Lcom/ubertob/unitnothingany/JustAnObject;
public final static Lcom/ubertob/unitnothingany/JustAnObject; INSTANCE
```

Khi làm việc với Java code, Kotlin compiler đủ thông minh để dịch bất kì kiểu trả về `void` nào thành `Unit`và tương tự như 1 kiểu fuction đặc biệt.

Ví dụ chúng ta có thể pass một java lambda  của kiểu `Consumer<Integer>` vào function mong muốn như một tham số của kiểu `(Int) -> Unit`.

```
//Java
public static Consumer<Integer> printNum = x -> System.out.println("Num " + x);
//Kotlin
fun callMe(block: (Int) -> Unit): Unit = (1..100).forEach(block)
fun main(){
    callMe { Lambdas.printNum } //it works fine
}
```

Lưu ý rằng trong Java chúng ta có một kiểu dữ liệu được gọi là `Void` nó chỉ liên quan gián tiếp với keyword `void` và không thể khởi tạo, vì vậy `null` chỉ trả về giá trị valid cho một function với kết quả của kiểu `Void`.

## Nothing

`Nothing` là 1 class (không phải là 1 object). Nó là subclass của các class khác, kể cả class final. Tuy nhiên chúng ta không thể khởi tạo 1 instance của nó vì constructor của nó là private.

```
public class Nothing private constructor()
```

Vậy chúng ta có thể đặt ra câu hỏi rằng 1 class không thể khởi tạo được instance thì có ý nghĩa gì. Thật ra nó rất hữu ích, chúng ta sẽ đề cập dưới đây.

Vì nó không thể truyền một giá trị kiểu `Nothing`, cho nên nó đại diện cho kết quả của một function không bao giờ return. Ví dụ, nó throw một exception hoặc có một vòng lặp vô hạn.

Trong Toán học và Lập trình chức năng, `Nothing` được gọi là Bottom Type và được biểu thị bằng ký hiệu ⊥.

Trong một chương trình máy tính, bất kỳ chức năng nào, bất kể loại trả về của nó, có thể không trả về giá trị, do lỗi hoặc tính toán vô hạn. Kotlin làm cho thuộc tính này rõ ràng với loại `Nothing`.

Bây giờ chúng ta sẽ xem một số trường hợp sử dụng của `Nothing`.

Đầu tiên là `TODO()` function mà bạn có thể sử dụng ở mọi nơi khi bạn không muốn chỉ định triển khai.

```
public inline fun TODO(): Nothing = throw NotImplementedError()
```

Nó có thể thay thế bất kỳ kiểu trả về nào vì nó là subclass của tất cả các class.

```
fun determineWinner(): Player = TODO() 
//It compiles because Nothing is a subclass of Player
```

Lưu ý rằng trong Java bạn không thể viết một hàm tương tự như trên.

```
static Void todo(){
  throw new RuntimeException("Not Implemented");
}
String myMethod(){   
    return todo(); //it doesnt' compile because Void is not a String
}
```

Ví dụ thứ hai được đại diện cho tất cả các empty collection:

```
fun findAllPlayers(): List<Player> = emptyList()
```

Làm thế nào `EmptyList` của thư viện Kotlin có thể là `List<Player>`?

```
public fun <T> emptyList(): List<T> = EmptyList 
// Generic function using type inference
object EmptyList : List<Nothing> ... // Ultimate covariancefun readUser(id: UserId): User? = …
```

Bạn có thể thấy, nó hoạt động được nhờ kiểu `Nothing`. Tương tự, chúng ta cũng có `emptyMap()`, `emptySet()`, v.v.

Ví dụ thứ ba có thể ít điển hình hơn của hai ví dụ trước, nhưng nó khá hữu ích.

Giả sử bạn có một function có thể fail. Ví dụ, đọc một user từ cơ sở dữ liệu.

Một lựa chọn đơn giản và hợp lý có thể trả về null khi không thể tìm thấy user. 

```
fun readUser(id: UserId): User? = …
```

Đôi khi chúng ta cần thêm thông tin về những gì chính xác đã xảy ra (kết nối bị lỗi, bảng không tồn tại ecc.) Và để cho người thực hiện quyết định cách xử lý lỗi.

Ở đây Nothing có thể giải quyết được vấn đề! Một giải pháp tuyệt vời là cung cấp callback trong trường hợp có lỗi thì trả về Nothing .

```
inline fun readUser(id: UserId, onError: (DbError) -> Nothing): User = …
```

Bạn hãy xem một ví dụ đầy đủ dưới đây để hiểu nó hoạt động như thế nào:

```
fun createUserPage(id: UserId): HtmlPage {
    val user = readUser(id) { err ->
        when (err) {
            is InvalidStatement -> 
return@createUserPage throw Exception(err.parseError)
            is UserNotFound -> 
return@createUserPage HtmlPage("No such user!")
        }
    }
    return HtmlPage("User ${user.name}") //happy case
}
```

Như bạn có thể thấy cả việc throw Exception và trả lại non-local đều là kiểu `Nothing`.

Để có thể trả về non-local từ lambda, bạn cần inline function gọi, `readUser` trong trường hợp này.

Đơn giản để có một private constructor nhưng làm thế nào `Nothing` có thể là lớp con của các class khác? 

Đó là nhờ vào compiler magic, trong ByteCode `Nothing` được dịch là `Void`, trong khi `Unit` được dịch là `void`.

```
//Kotlin
fun neverReturn(): Nothing {
    throw Exception("never!")
}
//ByteCode
public final static neverReturn()Ljava/lang/Void;
```

Cuối cùng, để thấy và nhớ được được sự khác biệt giữa `Nothing` và  `Unit`:

```
fun fooOne(): Unit { while (true) {} }
fun fooZero(): Nothing { while (true) {} }
// both ok
fun barOne(): Unit { println("hi")}
fun barZero(): Nothing { println("hi") }  //error
// barZero not compiling
```

Lưu ý rằng `Nothing` là 1 subtype của `Unit`, đó là lý do compile đầu tiên nhưng không phải cuối cùng.

## Any
`Any` trong Kotlin là trên top của hệ thống phân cấp. Tất cả các kiểu khác xuống từ `Any`.

> The root of the Kotlin class hierarchy. Every Kotlin class has [Any] as a superclass.

Nó hoạt động như Java Object, nhưng gọn hơn nhiều:

```
public open class Any {
    public open operator fun equals(other: Any?): Boolean
    public open fun hashCode(): Int
    public open fun toString(): String
}
```


So sánh với `java.lang.Object` có 11 phương thức, trong đó năm phương thức là về đồng bộ hóa (`wait`, `notify`, `notifyAll`).

Đây rõ ràng là một ví dụ về những lợi thế của việc đến sau, nó có vẻ là một ý tưởng tốt vào thời điểm đó, nhưng bây giờ việc có các synchronization primitives trên bất kỳ đối tượng nào bây giờ dường như không cần thiết.

Nhìn vào code cho `Any`, chúng ta cũng có thể thấy đó là một trong số ít các class trong stdlib của Kotlin open, có nghĩa là chúng ta có thể kế thừa trực tiếp từ nó. Điều này là cần thiết bởi vì mọi lớp Kotlin tự động kế thừa từ `Any`, ngay cả khi bạn không viết nó một cách rõ ràng.

```
class MyClass: Any() {
    fun bye(): String = "bye bye"
}
```

Ở cấp JVM, kiểu `Any` không tồn tại và nó được biên dịch thành` Java.lang.Object`

Ví dụ:

```
fun whatIcanDoWithAny(obj: Any){
    obj.toString()
}
```

Sau khi complie chúng ta sẽ có đoạn bytecode này:

```
public final static whatIcanDoWithAny(**Ljava/lang/Object**;)V
    // annotable parameter count: 1 (visible)
    // annotable parameter count: 1 (invisible)
    @Lorg/jetbrains/annotations/NotNull;() // invisible, parameter 0
   L0
    ALOAD 0
    LDC "obj"
    INVOKESTATIC kotlin/jvm/internal/Intrinsics.checkParameterIsNotNull (Ljava/lang/Object;Ljava/lang/String;)V
   L1
    LINENUMBER 5 L1
    ALOAD 0
    INVOKEVIRTUAL java/lang/Object.toString ()Ljava/lang/String;
    POP
```

## null
Nhân vật chính của bài đăng này không phải là một kiểu nhưng nó duy nhất bởi vì nó không có kiểu. Nếu bạn muốn, bạn có thể xem xét `null` là ngược của `Nothing`. Một giá trị mà không có kiểu, trong khi Nothing là một kiểu không thể được instantiated.

Trong Kotlin, `null` có thể hình thành các kiểu union đặc biệt với bất kỳ kiểu nào, làm cho chúng "nullable" và biểu thị chúng với dấu chấm hỏi.

Vì vậy, `String?` là union của kiểu chuỗi cộng với `null`.

Bằng cách này, Kotlin với sự giúp đỡ smart casts và các operators đặc biệt làm cho dễ dàng để xử lý `null` một cách an toàn.

Điều đặt biệt ở đây bài gì?

`Unit?` cho phép bạn trả về một statement hoặc null.

`Nothing?` đặc biệt hơn vì nó là cách duy nhất để buộc một function có null là kết quả duy nhất có thể. 

`Any?` quan trọng bởi vì nó là tương đương với Java Object. Trong Java, bạn có thể dễ dàng trả về `null`. 

Ngoài ra khi khai báo một lớp chung `MyClass<T>` ràng buộc của `T` là `Any?`, như trong Java. Nếu bạn muốn hạn chế lớp chung của bạn để không nullable loại, bạn phải nêu rõ nó: `MyClass < T: Any>`

Một cách khác để thấy ở null là syntax sugar cho các Optional/Maybe type, đó là đại diện cho một giá trị hoặc thiếu.
    
Hãy viết lại `map` và `flatMap` như các extension functions cho bất kỳ nullable trong Kotlin.

```    
fun <A:Any, B:Any> A?.map(f: (A) -> B): B? = when(this) {
    null -> null
    else -> f(this)
}
fun <A:Any, B:Any> A?.flatMap(f: (A) -> B?): B? = when(this) {
    null -> null
    else -> f(this)
}
```
## Tham khảo
 1. https://proandroiddev.com/kotlin-pearls-7-unit-nothing-any-and-null-cbbbbca86c2d