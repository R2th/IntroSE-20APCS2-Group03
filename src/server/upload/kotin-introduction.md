Kotlin là ngôn ngữ lập trình được yêu thích thứ hai trong cuộc khảo sát Stack OverFlow năm 2018. Vốn ban đầu được phát triển bởi JetBrains, nó hoàn toàn tương tác với Java và không có giới hạn. Do đó, ngôn ngữ có thể được sử dụng ở hầu hết mọi nơi mà Java được sử dụng ngày nay: để phát triển phía máy chủ, ứng dụng Android và hơn thế nữa.

Các nhà phát triển Android cũng đã sử dụng ngôn ngữ Kotlin được một thời gian và nhanh chóng yêu thích nó. Trong năm 2017, Google đã thông báo rằng, Kotlin sẽ là ngôn ngữ chính thức để phát triển Android. Chính nhờ vào việc Kotlin hoạt động tuyệt vời với tất cả các thư viện và framework Java hiện có mà vẫn có hiệu năng tốt.

Chúng ta cùng bắt đầu tìm hiểu về Kotlin thông qua các đoạn code đơn giản nhé.
# 1. Hello Word
Khi đi tìm hiểu với mỗi một ngôn ngữ chúng ta đều bắt đầu với Hello World
```
package org.kotlinlang.play         // 1

fun main() {                        // 2
    println("Hello, World!")          // 3
}
```
Chúng ta cùng đi tìm hiểu từng đoạn lệnh nhé
## 1.1 Package
Cũng giống như Java, Kotlin code thường được khai báo trong các packages. Packages trong Kotlin là optional, nếu bạn không chỉ rõ package trong file, thì file đó sẽ tự động đựoc chuyện tới package "default" và package này k có tên

Mặc định trong Kotlin có một số package sau sẽ được tự động import vào tất cả các file Kotlin
* kotlin.*
* kotlin.annotation.*
* kotlin.collections.*
* kotlin.comparisons.* (since 1.1)
* kotlin.io.*
* kotlin.ranges.*
* kotlin.sequences.*
* kotlin.text.*

vì thế nên bạn đừng quá ngạc nhiên nếu các bạn có thể sử dụng các class List, ArrayList mà ko cần import hay có thể sử dụng trực tiếp method ```println``` mà ko cần import package ```kotlin.io```

## 1.2 Main
Cũng giống như Java, phương thức chính để chạy ứng dụng với Kotlin cũng là main, tuy nhiên thì cách viết của Kotlin ngắn gọn hơn rất nhiều 
```
    // Java
    public static void main(String[] args) {
        System.out.println("Hello ");
    }
```
và 
```
    // Kotlin version < 1.3
    fun main(args: Array<String>) {
        println("Hello, World!")
    }
```
Và với với version 1.3 trở lên bạn có thể define method ```main``` mà ko cần truyền vào parameter nào
```
    // Kotlin version < 1.3
    fun main() {
        println("Hello, World!")
    }
```
Dấu ";" để kết thúc câu lệnh trong Java đã được xoá bỏ vì đố với Kolin xuống dòng là đủ.

## 1.3 Println
Như mình trao đổi ở trên phuơng thức ```println``` được cung cấp bới gói ```kotlin.io.*``` và các bạn có thể sử dụng để in ra màn hình console 1 message mà không cần phải import.

# 2. Classes and Inheritance
## 2.1 Classes 
Cũng giống như Java Class trong Kotlin cũng được khai báo với từ khóa ```class```
```
class Invoice { ... }
```

Khai báo lớp bao gồm class name, class header (chỉ định kiểu tham số  của nó, hàm tạo chính, v.v.) và thân lớp, được bao quanh bởi các dấu ngoặc nhọn. Cả header và thân lớp tùy chọn; nếu lớp không có body, có thể bỏ qua các dấu ngoặc nhọn.
```
class Empty
```

### 2.1.1 Constructors
Một class trong Kotlin có thể có 1 hàm tạo chính (**primary constructor**) và một hoặc nhiều hàm tạo phụ (**secondary constructor)**

**Primary Constructor**
Hàm tạo chính là một phần của header, nó đứng sau class name 
```
class Person constructor(firstName: String) { ... }
```
Nếu hàm tạo chính không có bất kì annotations nào thì từ khóa ```constructor``` có thể bị bỏ qua.
```
class Person(firstName: String) { ... }
```

Không giống như Java, hàm tạo chính không thể chứa bất kì đoạn code nào. Nếu bạn muốn thêm các đoạn code vào phần khởi tạo của class bạn có thể bắt đầu nó bằng từ khóa ```init``
```
class InitOrderDemo(name: String) {
    val firstProperty = "First property: $name".also(::println)
    
    init {
        println("First initializer block that prints ${name}")
    }
}
```
**Secondary Constructor**
Một class có thể khai báo secondary constructor bằng cách thêm từ khóa ```constructor``` như ví dụ dưới đây
```
class Person {
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```
Tuy nhiên một class nếu có secondary constructor thì mỗi secondary constructor cần delegate tới primary constructor, có thể trực tiếp hoặc gián tiếp thông qua các secondary constructor khác. Để delegate tới primary construcor hoặc secondary khác sử dụng từ khóa ```this```
```
class Person(val name: String) {
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```

### 2.1.2 Create instances of classes
Để khởi tạo một instance của một class, chúng ta gọi tới constructor của chúng như một function bình thường khác
```
val invoice = Invoice()

val customer = Customer("Joe Smith")
```
Lưu ý: Trong kotlin ko có từ khóa ```new```

### 2.1.3 Class Members
Classes có thể chứa

- Constructors and initializer blocks
- Functions
- Properties
- Nested and Inner Classes
- Object Declarations

## 2.2 Inheritance
Cũng gần giống Java, tất cả các lớp trong Kotlin đều có một supper class là ```Any```(Java là ```Object```), đó là supper class mặc định cho một class mà ko define supper class.
```
class Example // Implicitly inherits from Any
```
**Lưu ý**: ```Any``` không phải là ```java.lang.Object```, nó chỉ có 3 method duy nhất là ```equals()```, ```hashCode()``` và ```toString()```.

Để khai báo kế thừa trong java bạn khai báo thông qua từ khóa ```:``` ở header như sau
```
open class Base()

class Derived(p: Int) : Base()
```

Nếu class con ```Derived``` có primary constructor, thì class cha cần (bắt buôc) phải đựoc khởi tạo ngay tại đây, sử dụng tham số truyền vào của primary constructor như ví dụ dưới đây
```
open class Base(p: Int)

class Derived(p: Int) : Base(p)
```
```Base(p)``` cần được gọi ngay lập tức.

# 3. Variable
## 3.1 var & val
Class trong Kotlin có các thuộc tính, các thuộc tính này có thể đánh dấu là có thể thay đổi được với từ khoá ```var```, và không thể thay đổi được (chỉ đọc) với từ khoá ```val``` (giống như biến final trong Java.)
```
class Address {
    var name: String = ...
    var street: String = ...
    var city: String = ...
    var state: String? = ...
    var zip: String = ...
}
```

Để sử dụng một thuộc tính, chúng ta chỉ cần gọi nó theo tên của nó 
```
fun copyAddress(address: Address): Address {
    val result = Address() // there's no 'new' keyword in Kotlin
    result.name = address.name // accessors are called
    result.street = address.street
    // ...
    return result
}
```

## 3.2 Auto Inferred Type
Không giống như Java, Kotlin có suy luận kiểu cực kì mạnh mẽ. Mặc dù bạn hoàn toàn có kiểu khai báo rõ ràng loại biến nhưng thông thường khi làm việc với Kotlin ta thương để trình biên dịch thực hiện công việc bằng cách tự suy luận ra kiểu dữ liệu của nó. 
```
var a: String = "initial"  // 1
println(a)
val b: Int = 1             // 2
val c = 3                  // 3
```

1. Khai báo một biến có thể thay đổi và khởi tạo nó.
2. Khởi tạo một biến ```b``` không thể thay đổi và khởi tạo cho nó
3. Khai báo một biến không thể thay đổi và khởi tạo giá trị cho nó mà ko khai báo kiểu, compiler sẽ tự động suy luận kiểu cho nó thành ```Int```

## 3.3 Initialized variable
Đối với Java bạn hoàn toàn có thể khai báo 1 biến và sử dụng mặc dù biến đó chưa được khởi tạo. Tuy nhiên đối với Kotlin thì điều đó là không thể.
```
fun main() {
    var e: Int  // 1
    println(e)  // 2
}
```
Khi bạn chạy trương trình sẽ có thông báo lỗi ```Variable 'e' must be initialized.```

Bạn có thể thoải mái chọn lựa thời điểm sẽ khởi tạo biến đó, tuy nhiên nó nhất định phải được khởi tạo trước khi được sử dụng lần đầu tiên. Xem ví dụ dứoi đây
```
fun someCondition() = true 
fun main() {
    val d: Int  // 1
    if (someCondition()) {
        d = 1   // 2
    } else {
        d = 2   // 2
    }
    println(d) // 3
}
```

# 4. Null Safety
Đối với Java NullPointerExeption là một thảm hoạ, đối với Kotlin, để cố gắng loại bỏ ```NullPointerExeption```, các biến trong Kotlin không được phép gán bằng null. Nếu bạn muốn 1 biến có thể null hãy khai báo nó có thể null bằng cách thêm từ khoá ```?``` ở sau kiểu loại của biến đó 

![](https://images.viblo.asia/8c30ae5b-59a1-4e16-90e5-e2cc2a5846c0.png)

Như trên dòng 2, 4 và 9 thì IDE sẽ báo lỗi khi các bạn gán giá trị null cho một biến không thể null.

### Working with nulls
Trong một số trường hợp Kotlin cần xử lý với giá trị null, chẳng hạn như tương tác với Java code (Kotlin hoàn toàn tương thích 100% với Java) hoặc biểu diễn một giá trị null cụ thể. Kotlin vẫn cung cấp một cách check null như ví dụ dưới

```
fun describeString(maybeString: String?): String {              // 1
    if (maybeString != null && maybeString.length > 0) {        // 2
        return "String of length ${maybeString.length}"
    } else {
        return "Empty or null string"                           // 3
    }
}
```
Nhưng lưu ý là ```!= null``` chỉ có thể sử dụng với biến được đánh kiểu loại có thể null ```?``` còn nếu không thì nó luôn luôn trả về giá trị fale như hình dưới đây

![](https://images.viblo.asia/af2f04c1-daed-4347-ba84-a854f351366d.png)


# 5. Function
## 5.1 Default Parameter Values and Named Arguments
```
fun printMessage(message: String): Unit {                               // 1
    println(message)
}

fun printMessageWithPrefix(message: String, prefix: String = "Info") { // 2
    println("[$prefix] $message")
}

fun sum(x: Int, y: Int): Int {                                          // 3
    return x + y
}

fun multiply(x: Int, y: Int) = x * y                                    // 4

fun main() {
    printMessage("Hello")                                               // 5                    
    printMessageWithPrefix("Hello", "Log")                              // 6
    printMessageWithPrefix("Hello")                                     // 7
    printMessageWithPrefix(prefix = "Log", message = "Hello")           // 8
    println(sum(1, 2))                                                  // 9
}
```

Function trong Kotlin được khai báo sử dụng từ khoá ```fun``` và để sử dụng function các bạn cũng sử dụng lời gọi đến function name giống như trong java
### 5.1.1. Unit
Một ví dụ đơn giản nhận vào giá trị đầu vào là một ```String``` và đầu ra trả về một ```Unit``` - nghĩa là ko trả về giá trị gì cả nó tương đương với kiểu ```void``` trong ```Java``` hay đơn giản là viết ntn.
```
    fun printMesssage(message: String) {
        println(message)
    }
```

### 5.1.2. Optional parameter with default value
Đây là một phần mình đánh giá Kotlin mạnh hơn Java, Trong Java để có thể tạo ra method với có các giá trị mặc định đầu vào các bạn phải tạo rất nhiều method bằng cách sử dụng Overloading.
ví dụ như sau
```
    public void printMessageWithPrefix(String messsage, String prefix) {
        System.out.println("[" + prefix + "] " + messsage);
    }

    public void printMessageWithPrefix(String messsage) {
        printMessageWithPrefix(messsage, "Info");
    }
```
Còn đối với Kotlin bạn có thể gán cho parameter giá trị default bằng cách gán trực tiếp khi khai báo function như sau
```
fun printMessageWithPrefix(message: String, prefix: String = "Info") 
    println("[$prefix] $message")
}
```
và phuơng thức này bạn có thể gọi bằng cả hai cách 
```
printMessageWithPrefix("Hello", "Log")                              // 6
printMessageWithPrefix("Hello") 
```

### 5.1.3. A Function that returns an integer
```
fun sum(x: Int, y: Int): Int {                                          // 3
    return x + y
}
```

Cũng giống như trong Java các bạn có thể tạo 1 function có kiểu trả về là Int và viết đoạn code return như bình thường
Tuy nhiên khi một function chỉ trả về 1 biểu thức như trong đoạn đánh số 3, các bạn có thể viết như đoạn đánh số 4 mà mình sẽ đề cập dưới dây

### 5.1.4. Single-Expresion functions
Khi một hàm chỉ trả về một biểu thức, các dấu ngoặc nhọn có thể được bỏ qua và phần thân được chỉ định sau kí hiệu ```fun () = ``` như trong ví dụ đánh số 4
```
fun multiply(x: Int, y: Int) : Int = x * y 
```
Và như các bạn cũng biết thì Kotlin có trình suy luận kiểu vô cùng tuyệt vời, nên bạn có thể ko cần xác định kiểu trả về mà có thể viết trực tiếp như sau
```
fun multiply(x: Int, y: Int) = x * y 
```

## 5.4 Functions with vararg Parameters
Có một tính năng này của Kotlin mình hơi thấy dư dư tí nhưng mà cũng khá là hay
từ khoá ```vararg``` cho phép chúng ta đưa số lượng tham số không giới hạn vào một function chỉ cần chúng cách nhau bằng dấu ```,```
```
fun printAll(vararg messages: String) {                            // 1
    for (m in messages) println(m)
}
printAll("Hello", "Hallo", "Salut", "Hola", "你好")                 // 2

fun printAllWithPrefix(vararg messages: String, prefix: String) {  // 3
    for (m in messages) println(prefix + m)
}
printAllWithPrefix(
    "Hello", "Hallo", "Salut", "Hola", "你好",
    prefix = "Greeting: "                                          // 4
)

fun log(vararg entries: String) {
    printAll(*entries)                                             // 5
}
```

Để có thể biến 1 tham số thành ```vararg``` bạn chỉ cần đặt từ khoá đó trước tham số mà các bạn muốn ```vararg``` hoá.

**Lưu ý**: Một function chỉ có duy nhất 1 tham số ```vararg```, nếu nó không phải tham số cuối cùng thì các giá trị cho các tham số sau cần được truyền bằng cú pháp như trên.

Về ngữ nghĩa thì ```vararg``` có nghĩa là : Variable number of arguments (
Tại runtime, ```vararg``` thực chất là một mảng. 

# References

Trên đây là phần giới thiệu đầu tiên về Kotlin, 

Bài viết có tham khảo từ nguồn https://kotlinlang.org/

Rất cảm ơn các bạn đã chú ý theo dõi, các bạn hãy tiếp tục đón chờ bài tiếp theo của mình trong seri Kotlin cho người mới bắt đầu với chủ đề **Control Flow** trong bài tiếp theo vào tuần tới nhé. :flower: