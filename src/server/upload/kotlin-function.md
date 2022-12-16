chào các bạn, ở bài trước https://viblo.asia/p/undefined-Az45bgzLKxY chúng ta đã tìm hiểu và kotlin basic, bài hôm này chúng ta sẽ về funtion trong kotlin, mời các bạn theo dõi.
# 1. Định nghĩa Function
Function ở trong Kotlin được định nghĩa bằng từ khóa *fun*

### Java
```
public String doSomething(String matter) {

}
```

Kotlin

```
fun doSomething(matter: String): String {

}
```

+ Tên function: *doSomething*
+ Khai báo parameter truyền vào function: *<tên param> : <type param>*
+ Return type của function là String: *func <tên function>(): <return type> {//body}*

## Single-Expression Function
Nếu function với return type chỉ có một biểu thức (expression) thì định nghĩa function theo 2 cách dưới tương đương nhau: (*getInfo()* gọi là *Single-Expression Function*): 

```
fun getInfo() : String = "Hello world..."

fun getInfo2() : String {
    return "Hello world..."
}
```

## Function Scope

Có 3 loại function (dựa vào mức truy cập):

+ **Member function**: Là các function được khai báo ở trong class, object hoặc interface. Các function này được sử dụng thông qua các instance của class, object hoặc interface. Giống như việc sử dụng method trong Java.
+ **Local function**: Có thể hiểu rằng local function là các function được khai báo bên trong một function khác (nested). Local function không được sử dụng ở ngoài function định nghĩa nó. Ví dụ như trong printArea(), ta định nghĩa một function khác là calculateArea(), do đó ta gọi calculateArea() là local function:

```
fun printArea(width: Int, height: Int): Unit {
  fun calculateArea(width: Int, height: Int): Int = width * height
  val area = calculateArea(width, height)
  println("The area is $area")
}
```

**Lưu ý**: Local function có thể sử dụng các param và các biến khai báo trước nó trong function. Lưu ý các biến khai báo sau nó thì không thể sử dụng:

```
fun reformat(age: Int, somethingUnknown: String = "hello") {
        var birthMonth: Int = 8

        fun localRefomat() {
            birthMonth = 5

            //không sử dụng được variable birthYear
        }

        var birthYear: Int = 1995
    }
```
+ **Top-level function**: Có thể hiểu rằng đây là những function được khai báo ngoài tất cả như class, object, interface và được định nghĩa trong file Kotlin (.kt). Các method được truy cập thông qua tên của file vs kí hiệu “kt” (đối với Java), trong Kotlin các function này được gọi trực tiếp qua tên của function. Việc này rất hữu ích trong việc định nghĩa các các function hepler, util mà trong *Java* hay làm thông qua các method *static*:

```
//file name is DataManager.kt
fun isTokenExpired() : Boolean{
    var isExpired = false

    //......

    return isExpired
}
```

Gọi function Kotlin trong *Java*:

```
public class JavaMain {
    public static void main(String[] args) {
        //call top-level function in java
        DataManagerKt.isTokenExpired();
    }
}
```

# 2. Parameter

```
fun powerOf(number: Int, exponent: Int) {
    //...
}
```

Function *powerOf* có param *number* và *exponent* kiểu *Int*.

Khai báo param theo cú pháp:* <tên param> : <type param>*
    
#  3. Giá trị mặc định cho parameter
```
fun read(b: Array<Byte>, off: Int = 0, len: Int = b.size()) {
...
}
```

Mỗi param trong function có thể được gán giá trị mặc định hoặc không gán. Giá trị mặc định cho phép lúc truyền param cho function có thể bỏ qua các giá trị mặc định. Điều này giúp không phải viết quá nhiều *overload* function.

**Lưu ý:**

```
open class A {
    open fun foo(i: Int = 10) { ... }
}

class B : A() {
    override fun foo(i: Int) { ... }  // no default value allowed
}
```

Khi function *foo()* của *class A* đã khai báo giá trị mặc định cho param, thì khi *class B* kế thừa* class A* và *override* lại function *foo()* đó, thì giá trị mặc định của param ở function *foo() class A* được giữ lại và ở *class B* không được định nghĩa lại giá trị mặc định đó.

## Đặt tên cho đối truyền vào

Đầu tiên ta có function *reformat()* với các param, trong đó có 4 param có giá trị mặc định.

```
fun reformat(str: String,
             normalizeCase: Boolean = true,
             upperCaseFirstLetter: Boolean = true,
             divideByCamelHumps: Boolean = false,
             wordSeparator: Char = ' ') {
...
}
```

Có thể gọi function theo các cách:
+ Sử dụng các giá trị mặc định của param:

`reformat(str)`

+ Không sử dụng các giá trị mặc định của param:

`reformat(str, true, true, false, '_')`

+ Hoặc có thể đặt tên cho các đối truyền vào để dễ đọc hơn (tùy chọn). Lưu ý là tên được đặt sẽ phải giống với tên param của function đó:

`reformat(str, wordSeparator = '_')`

### Lưu ý:
+ Khi sử function của Kotlin trong *Java*, các *param* được khai báo giá trị mặc định sẽ không có tác dụng. Vì *Java* không thể bỏ qua các param có giá trị mặc định.
+ Khi sử dụng *method* của *Java* trong *Kotlin*, không thể sử dụng được chức năng đặt tên cho đối truyền vào.

# 4.	Unit-returning functions
```
fun printHello(name: String?): Unit {
    if (name != null)
        println("Hello ${name}")
    else
        println("Hi there!")
    // `return Unit` or `return` is optional
}
```

*Unit* ở đây có thể hiểu như là *Void* ở trong *Java* hoặc các ngôn ngữ khác. Việc khai báo return type là *Unit* là không bắt buộc. Ví dụ như:

```
fun printHello(name: String?) {
    ...
}
```

*Unit* cũng được sử dụng trong việc khai báo các **Higher-Order Function** ở phần sắp tới.

# 5.	Extension functions

Giống với *Swift*, *Kotlin* cho phép ta mở rộng class mà không phải kế thừa từ class khác. Ví dụ như ta muốn thêm function *swap()* cho class *MutableList<Int>*:
    
```
fun MutableList<Int>.swap(index1: Int, index2: Int) {
val tmp = this[index1] // 'this' corresponds to the list
this[index1] = this[index2]
this[index2] = tmp
}
```

Từ khóa *this* ở đây dùng để chỉ đến i*nstance MutableList<Int>* mà gọi function *swap()*
  
```
val l = mutableListOf(1, 2, 3)
l.swap(0, 2) // 'this' inside 'swap()' will hold the value of 'l'
```

Tuy nhiên nếu *extension* cho *MutableList<Int>* chúng ta chỉ sử dụng được với các *instance* của *MutableList<Int>*, chúng ta cũng có thể khởi tạo chung bằng cách sử dụng **Generic Function**:
  ```
  fun <T> MutableList<T>.swap(index1: Int, index2: Int) {
    val tmp = this[index1] // 'this' corresponds to the list
    this[index1] = this[index2]
    this[index2] = tmp
}
```
    
#     6.	Return nhiều giá trị (Mutiple return values)
Xem ví dụ dưới đây:

```
data class Result(val result: Int, val status: Status)
fun function(...): Result {
    // computations

    return Result(result, status)
}

// Now, to use this function:
val (result, status) = function(...)
```

Như ta thấy, function có thể trả về đồng thời 2 giá trị *result* và *status*. Bản chất của việc này là gói chúng vào một *data class* mà thôi và sử *Destructure* (trình bày phần tiếp theo) để gán chúng cho các biến. Nhìn đến đây ta có thể nghĩ đến sử dụng *Pair<L, R>.* Tuy nhiên việc sử dụng class với các tên có nghĩa giúp code dễ đọc hơn việc sử dụng *first* và *second* trong *Pair*.

## Destructuring Declarations
Xem ví dụ dưới đây:

```
data class Person(var name: String, var age: Int)

val (name, age) = Person("Hado", 22)

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22
```

Đoạn code trên sau khi được complie thực ra sẽ như thế này:

```
data class Person(var name: String, var age: Int)

val person = Person("Hado", 22)

val name = person.component1()
val age = person.component2()

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22
```

Ta có *data class* với *primary constructor* có 2 param *name* và *age*, class sẽ lần lượt tự động tạo ra các function *componentN (N: 1, 2, 3, …)* cho các param.
Lưu ý chỉ có các *param* trong *primary constructor* mới được tự động tạo ra *function component*. Nếu chúng ta khai báo thêm biến trong class và muốn sử dụng *Destructure* thì cần khởi tạo thêm các f*unction component* tương ứng với param đó. Ví dụ như:

```
data class Person(var name: String, var age: Int) {
    var province: String = "Ha Noi"

    operator fun component3(): String {
        return province
    }
}

val (name, age, province) = Person("Hado", 22)

println("Name: $name") //print: Name: Hado
println("Age: $age") //print: Age: 22
println("Province: $province") //print: Province: Ha Noi
```

Nếu như trong class *Person*, ta chỉ cần lấy 2 giá trị là *age* và *province*, đồng thời không muốn tạo ra biến name ta sử dụng dấu “_” để thay cho các biến không cần sử dụng:

```
val (_, age, province) = Person("Hado", 22)

println("Age: $age") //print: Age: 22
println("Province: $province") //print: Province: Ha Noi
```

# 7.	Generic functions
Giống như *Java*, *Kotlin* cho phép sử dụng *generic function* giúp cho việc giảm số lượng code, function có thể sử dụng với nhiều kiểu khác nhau Để định nghĩa *generic function*, ta sử dụng form sau:

```
fun <T> singletonList(item: T): List<T> {
    // ...
}

fun <T> T.basicToString() : String {  // extension function
    // ...
}
```

Để gọi function, cần xác định kiểu cho function:

`val l = singletonList<Int>(1)`

Ngoài ra, giống như Java, ta cũng có thể tạo generic function với kiểu được extends từ một kiểu khác:

```
fun <T : Comparable<T>> sort(list: List<T>) {
    // ...
}
```
Bây giờ, ta có thể gọi function với các biến có kiểu là *subclass* của *Comparable*:

```
sort(listOf(1, 2, 3)) // OK. Int is a subtype of Comparable<Int>
sort(listOf(HashMap<Int, String>())) // Error: HashMap<Int, String> is not a subtype of Comparable<HashMap<Int, String>>
```

# 8.	Infix notation


Xem ví dụ dưới đây:
```

class Fly(var currentPlace: String) {

    infix fun flyTo(nextPlace: String) {
        println("The plane fly from $currentPlace to $nextPlace")
    }

}

val plane1 = Fly("Ha Noi")

plane1 flyTo "Ho Chi Minh" //print: The plane fly from Ha Noi to Ho Chi Minh

plane1.flyTo("Ho Chi Minh") //print: The plane fly from Ha Noi to Ho Chi Minh
```

Nhờ sử dụng ký hiệu *infix* cho function *flyTo()*, ta có thể sự dụng tên function như trung tố liên kết giữa* instance class* và *param* truyền vào. Function có thể sử dụng *infix* notation (trung tố) khi:
+ Function là member của một class hoặc là extension của class
+ Function chỉ có một param duy nhất
+ Function được mark bằng *infix* ở đầu function

# 9.	Function với parameter không xác định

Tương tự trong *Java*, *Kotlin* cho phép một function không cần xác định số lượng *param* một cách cụ thể.

**Java**

```
public int add(int... array) {
    int s = 0;
    for (int i : array) {
        s += i;
    }
    return s;
}
```

**Kotlin**

```
fun add(vararg array: Int) : Int {
    var s = 0
    for (i in array) {
        s += i
    }
    return s
}
```

Ta sử dụng từ khóa vararg. Và cũng tương tự như Java, biến array được coi là một mảng.

**Lưu ý**: Chỉ có một param được đánh dấu là *vararg*. Nếu param không phải là param cuối cùng, khi gọi hàm, ta phải chỉ định rõ các param sau đó

```
fun multiPrint(prefix: String, vararg strings: String, suffix: String) {
    //.....
}
```

Sử dụng function *multiPrint()*:

`multiPrint("Start", "a", "b", "c", suffix = "End")`

# 10. Inline function
## Giới thiệu

Chúng ta đã biết khái niệm *high-order function*, việc sử dụng loại function này bộc lộ một số hạn chế lúc runtime: mỗi function là một object và nó giữ closure của nó. Bởi vậy, việc cấp phát bộ nhớ (cho cả function object, class) và các lời gọi ảo cho ra một chi phí lúc runtime. Tức là khi gọi các function này, một object sẽ được tạo ra để lưu trữ function và thêm vài function cần thiết cho class nữa. Việc này làm cho số function của project sẽ tăng lên nhanh chóng.

Việc này có thể được loại bỏ bằng cách *inline* các biểu thức *lambda*. Tức là code của function sẽ được thêm ngay ở nơi gọi function, tránh khởi tạo một *instance* để lưu function. VD: 

`lock(l) { foo() }`

Bây giờ, nếu function *lock* là một *inline* function, *compiler* sẽ sinh ra đoạn code sau ngay ở nơi gọi hàm *lock* thay vì tạo một function object:

```
  l.lock()
  try {
      foo()
  }
  finally {
      l.unlock()
  }
```
Để thấy được điều này, ta có thể *decompile* *Kotlin* code sang *Java* code bằng cách chọn *Tools* -> *Kotlin* -> *Show Kotlin bytecode*, sau đó chọn *Decompile* để xem. File sẽ được *decompile* ra file Java tương đương.

```
inline fun close(work:String, process: (String) -> Unit) {
      //tiền xử lý
      process(work)
      println("close")
  }
```
Từ khóa *inline* sẽ có ảnh hưởng đến cả các *lambda* bên trong được truyền cho function. Nghĩa là tất cả các function bây giờ sẽ được *inline* ở nơi gọi.

```
  //gọi inline function
  fun main(arg: Array<String>) {
      close("clean"){
          println("cleaning")
      }
  }

  //code Java tương đương
  public final void main(@NotNull String[] arg) {
      Intrinsics.checkParameterIsNotNull(arg, "arg");
      String work$iv = "clean";
      String var5 = "cleaning";
      System.out.println(var5);
      String var4 = "close";
      System.out.println(var4);
  }
```

Việc sử dụng *inline function* cũng có một số hạn chế. Đó là:
+ Một inline function không thể tự gọi lại chính nó một cách trực tiếp hoặc gọi gián tiếp thông qua một inline funciton khác.
+ Một public inline function được khai báo ở trong một class chỉ có thể truy cập vào các public function và public field của class đó
+ Số lượng dòng code sẽ tăng lên. Việc inline một function dài, phức tạp nhiều lần sẽ được compiler sinh ra code tương ứng.

Bởi vậy, lời khuyên ở đây là:

*Giữ các inline function ngắn gọn, chuyển các khối code lớn vào trong các non-inline function nếu cần.*

## noinline

Như ở trên đã đề cập, từ khóa *inline* có tác dụng với cả các *lambda* được truyền vào function. Bởi vậy, các *lambda* được truyền vào cũng sẽ là các* inline function*. Nếu không muốn điều này, chúng ta có thể sử dụng từ khóa *noinline* khi khai báo các *lambda* trong function

```
inline fun close(work:String,noinline process: (String) -> Unit) {
      //tiền xử lý
      process(work)
      println("close")
  }
```

Khi này, funciton *process* sẽ không được thêm vào code ở nơi gọi function mà sẽ khởi tạo một *instance* để chứa phần *noinline* đó.

```
 public final void main(@NotNull String[] arg) {
      Intrinsics.checkParameterIsNotNull(arg, "arg");
      String work$iv = "clean";
      Function1 process$iv = (Function1)null.INSTANCE;
      process$iv.invoke(work$iv);
      String var5 = "close";
      System.out.println(var5);
   }
```

Inline lambda chỉ có thể được gọi ở bên trong một *inline function* hoặc truyền vào *param* có kiểu *inline*. Với *noinline*, chúng ta có thể làm mọi thứ ta muốn: lưu như một biến, truyền vào param...

## Non-local return

Trong *Kotlin*, chúng ta có thể sử dụng return để thoát khỏi một *function* có tên hoặc một *anonymous function*. Điều đó có nghĩa là, để thoát khỏi một *lambda*, chúng ta phải sử dụng một *label* để làm điều này và nếu chỉ sử dụng *return*, *compiler* sẽ báo lỗi bởi bên trong *lambda*, ta không thể thoát ra khởi function bên ngoài nó

```
  fun foo() {
      ordinaryFunction {
          return // ERROR: can not make `foo` return here
      }
  }
```

Nhưng nếu *function lambda* được truyền vào là *inline function*, việc *return* là được cho phép:

```
 fun foo() {
      inlineFunction {
          return // OK: the lambda is inlined
      }
  }
```
Những *return* này (bên trong *lambda*, nhưng thoát ra function xung quanh) được gọi là *non-local return*. Chúng ta thường sử dụng việc *return* này bên trong vòng lặp:

```
fun hasZeros(ints: List<Int>): Boolean {
      ints.forEach {
          if (it == 0) return true // returns from hasZeros
      }
      return false
  }
```

Lưu ý rằng *inline function* bên trong function có thể gọi *lambda* được truyền vào function chứa nó như một param một cách gián tiếp trong một ngữ cảnh thực thi như là một local object hay function lồng. Trong những trường hợp đó, luồng điều khiển *non-local* là được cho phép. Để thể hiện điều đó, lambda param cần được đánh dấu bằng từ khóa *crossinline*:

```
 inline fun f(crossinline body: () -> Unit) {
      val f = object: Runnable {
          override fun run() = body()
      }
      // ...
  }
```

*break* và *continue* không được hỗ trợ trong inline lambda..

## Reified type parameter (Xác định cụ thể kiểu param)

Thỉnh thoảng chúng ta cần truy cập đến kiểu của tham số được truyền vào

```
 fun <T> TreeNode.findParentOfType(clazz: Class<T>): T? {
      var p = parent
      while (p != null && !clazz.isInstance(p)) {
          p = p.parent
      }
      @Suppress("UNCHECKED_CAST")
      return p as T?
  }
```

Ở đây, function đi qua toàn bộ cây và sử dụng *reflection* để kiểm tra một node có kiểu xác định hay không. Nếu viết như vậy, việc gọi vẫn hơi dài dòng:

`treeNode.findParentOfType(MyTreeNode::class.java)`

Những gì chúng ta thực sự muốn là chỉ cần truyền kiểu param vào function:

` treeNode.findParentOfType<MyTreeNode>()`

Để làm điều này, inline function hỗ trợ việc này bằng cách sử dụng từ khóa *reified*:

```
inline fun <reified T> TreeNode.findParentOfType(): T? {
      var p = parent
      while (p != null && p !is T) {
          p = p.parent
      }
      return p as T?
  }
```
Khi sử dụng *reified*, param đã có thể truy cập bên trong function và không cần sử dụng reflection nữa, các toán tử như *is*, *!is* hay *as* cũng đã hoạt động bình thường. Và từ đó, chúng ta có thể gọi function như đã đề cập ở trên:

`treeNode.findParentOfType<MyTreeNode>()`

Ngoài ra, ta vẫn có thể sử dụng *reflection* với *reified type parameter:*

```
inline fun <reified T> membersOf() = T::class.members

fun main(s: Array<String>) {
    println(membersOf<StringBuilder>().joinToString("\n"))
}
```

**Lưu ý**: function không phải là inline function không thể sử dụng reified type parameter.

## Inine property


Từ khóa *inline* có thể được sử dụng với các hàm *getter*, *setter* của các *property* mà không có backing field. Bạn có thể đánh dấu từng hàm *getter*, *setter*:

```
  val foo: Foo
      inline get() = Foo()

  var bar: Bar
      get() = ...
      inline set(v) { ... }
```

Bạn cũng có thể đánh dấu toàn bộ property bằng cách đánh dấu khi khai báo property:

```
inline var bar: Bar
      get() = ...
      set(v) { ... }
```

Ở vị trí gọi function, các hàm getter, setter này cũng sẽ được coi như các hàm inline function bình thường.

Trên đây là toàn bộ về function mình tìm hiểu dựa trên https://kotlinlang.org/docs/reference/functions.html. Hẹn gặp lại các bạn ở bài tới.