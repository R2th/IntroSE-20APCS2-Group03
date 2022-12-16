# Mở đầu
`Singleton` là một mẫu thiết kế phần mềm (`software design pattern`) đảm bảo rằng một lớp (`class`) chỉ có một thể hiện (`instance`) và một điểm truy cập toàn cục đến nó được cung cấp bởi chính `class` đó.

`Singleton Pattern` đảm bảo rằng chỉ có một `instance` sẽ được tạo và nó sẽ hoạt động như một `access point` duy nhất, do đó đảm bảo được an toàn cho luồng. Sau đây là cách chung để tạo một lớp `Singleton` trong Java.

```php
public class Singleton {
 
    private static Singleton instance = null;
 
    private Singleton(){
    }
 
    private synchronized static void createInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
    }
 
    public static Singleton getInstance() {
        if (instance == null) createInstance();
        return instance;
    }

}
```

Từ khóa `synchronized` đảm bảo rằng không có sự can thiệp của luồng khi tạo cá thể.
Tương đương với mã Kotlin của mã trên được đưa ra dưới đây:
```php
object Singleton
```
Chỉ cần ngắn gọn như vậy là ta đã tạo được một `class singleton` trong Kotlin.

# Triển khai `singleton object` trong Kotlin
* Trong Kotlin, đại diện của một lớp `Singleton` chỉ yêu cầu duy nhất từ khóa `object`. Do đó, một lớp `Singleton` trong Kotlin có thể được định nghĩa mà không cần sử dụng `class`.
* Một lớp `object` có thể chứa thuộc tính, hàm và phương thức `init`.
* Phương thức khởi tạo `constructor` là KHÔNG được phép.
* Một `singleton object` có thể được định nghĩa bên trong một `class`, tuy nhiên nó không thể được định nghĩa bên trong một `inner class`.
* Một `singleton object` không thể được khởi tạo theo cách mà một `class` được khởi tạo.
* Một `singleton object` được khởi tạo khi nó được sử dụng lần đầu tiên.

Hãy xem ví dụ về triển khai `singleton object` trong Kotlin dưới đây:
```php
object Singleton

fun main(args: Array<String>) {
    print(Singleton.javaClass)
}

// Following is printed in the console.
// class Singleton
```

`javaClass` được tạo ra tự động bởi `singleton class` và in tên tương đương với tên `java class`.

Hãy thêm một hàm và thuộc tính vào lớp `singleton object` như sau:

```php
object Singleton
{

    init {
        println("Singleton class invoked.")
    }
    var name = "Kotlin Objects"
    fun printName()
    {
        println(name)
    }

}

fun main(args: Array<String>) {
    Singleton.printName()
    Singleton.name = "KK"

    var a = A()
}

class A {

    init {
        println("Class init method. Singleton name property : ${Singleton.name}")
        Singleton.printName()
    }
}

//Following is printed in the console.
//Singleton class invoked.
//Kotlin Objects
//Class init method. Singleton name property : KK
//KK
```
Trong đoạn code trên, những thay đổi trong lớp đối tượng được phản ánh khi `class A` được khởi tạo.

Khởi tạo đối tượng tương tự như khởi tạo `lazy` cho các thuộc tính trong Kotlin. Trong đoạn code dưới đây, `objectr` không được khởi tạo vì nó chưa được sử dụng.
```php
class A {

    object Singleton
    {

        init {
            println("Singleton class invoked.")
        }
        var name = "Kotlin Objects"
        fun printName()
        {
            println(name)
        }

    }

    init {
        println("Class init method. Singleton name property")
    }
}

//Console:
//Class init method
```

# Kotlin Object Expressions
Các đối tượng trong Kotlin có thể được sử dụng như các biến `variable` của lớp. Một đối tượng có thể mở rộng một lớp, thực hiện một `interface`.
```php
fun main(args: Array<String>) {
    var a = A()
    Singleton.printName()
}

open class A {

    open fun printName() {
        print("This is class A")
    }

    init {
        println("Class init method.")
    }
}

object Singleton : A() {

    init {
        println("Singleton class invoked.")
    }

    var name = "Kotlin Objects"
    override fun printName() {
        println(name)
    }
}

//Console Output:
//Class init method.
//Class init method.
//Singleton class invoked.
//Kotlin Objects
```

# Kotlin Companion Object
* Kotlin không có từ khóa `static`. Vậy làm thế nào để chúng ta thiết lập các biến và phương thức `static`?
* `companion object` là câu trả lời. Nó tương đương với các đối tượng `static` trong Java.
* Một `companion object` dùng chung cho tất cả các thể hiện của các lớp. Nó cũng có thể truy cập tất cả các thành viên của lớp, bao gồm cả các `private constructor`.
* Một `companion object` được khởi tạo khi lớp được khởi tạo.
* Một `companion object` KHÔNG THỂ được khai báo bên ngoài lớp.
```php
fun main(args: Array<String>) {

    var a = A.name
    A.name = "Kotlin Tutorials"
    A.printName() //prints Kotlin Tutorials
}

class A {

    companion object Singleton
    {

        init {
            println("Singleton class invoked.")
        }
        var name = "Kotlin Objects"
        fun printName()
        {
            println(name)
        }

    }

    init {
        println("Class init method.")
    }
}
```

## Nguồn tham khảo
[JournalDev - Kotlin Singleton, Kotlin Companion Object](https://www.journaldev.com/18662/kotlin-singleton-companion-object)