Chào các bạn, tiếp nối loạt bài về kotlin, hôm nay chúng ta sẽ cùng tìm hiểm về class và tính kế thừa trong class
#  Class

Tương tự với *Java*, để tạo ra một class ta sử dụng từ khóa *class* để khai báo.

**Java**

```
public class Invoice {
}
```

**Kotlin**

```
class Invoice {

}
```

Ta thấy dòng code khai báo *class Invoice* trong *Kotlin* không xác định visibility *modifier*(access modifier) cho class, tuy nhiên trong *Kotlin* nếu ta không xác định *visibility modifier* cho class, thì mặc định sẽ là *public*.

Nếu một *class* không có body, không có bất kì một param nào ta có thể khai báo như sau, không cần dấu {}

`class Empty`

## Constructor

*Kotlin* có một *primary constructor* và có thể có một hoặc nhiều *secondary constructors*. Để xác định *primary constructor* ta khai báo như sau:

```
class Person constructor(firstName: String) {
}
```

Nếu như *primary constructor* không có bất kì một visibility modifier** hoặc *annotation* thì từ khóa *constructor* có thể bỏ:

```
class Person(firstName: String) {
}
```

Còn nếu có *visibility modifier* hoặc *annotation* thì từ khóa *constructor* sẽ cần phải có:

`class Customer public @Inject constructor(name: String) { ... }`

*Primary constructor* không chứa bất cứ dòng code nào, nếu muốn thực hiện các logic code ngay sau *primary constructor* có thể thực hiện bằng cách khởi tạo ra một *block {}* với từ khóa tiền tố *init* ở trước:

```
class Customer(name: String) {
    init {
        print("Customer's name is $name")
    }
}
```

**Chú ý**: Các param của *primary constructor* nếu khai báo *name: String*, nó chỉ được sử dụng trong các block init{...} và để khởi tạo các property trong body class , không thể sử dụng trong các function của class hoặc các instance của class đó:

```
class Customer(name: String) {
    val customerKey = name.toUpperCase()

    init {
        print("Customer's name is $name")
    }
}
```

Do đó để coi các param của *primary constructor* như một property trong class, ta thêm var hoặc val cho các param của *primary constructor*:

```
class Person(val firstName: String, val lastName: String, var age: Int) {
    // ...
}
```

**Secondary Constructors**

Trong một *class* chỉ có duy nhất một *primary constructor*, tuy nhiên có thể có nhiều *secondary constructor*. Để tạo *secondary constructor* ta khai báo như sau:

```
class Person {
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```

Nếu như class có *primary constructor* thì mỗi *secondary constructor* phải khởi tạo giá trị cho *primary constructor* bằng cách gọi *primary constructo*r một cách gián tiếp hoặc trực tiếp:

```
class Invoice(id: Int ) {

    constructor(id: Int, name: String) : this(id) {
        //this ở đây gọi trực tiếp đến primary constructor
        // và truyền giá trị id cho primary constructor
    }

    constructor(id: Int, name: String, version: Int) : this(id, name) {
        //this ở đây gọi trực tiếp secondary constructor 2 tham số
        // và được coi là gọi gián tiếp primary constructor qua secondary constructor 2 tham số đó
    }

}
```

Nếu như một class không tạo ra bất kì một *constructor* nào (*primary và secondary*) thì mặc định Kotlin sẽ tạo ra một *primary constructor* 0 param và visibility modifier là *public*, nếu ta không muốn ai sử dụng *constructor* đó (đồng nghĩa với việc không tạo ra bất kì một instance nào của class đó) thì ta thêm visibility modifier là private trước *primary constructor* không tham số:

```
class DontCreateMe private constructor () {
}
```

### **Tạo instance cho class**

**Java**

```
Invoice invoice = new Invoice();
Customer customer = new Customer("Joe Smith")
```

### Kotlin

```
val invoice = Invoice()

val customer = Customer("Joe Smith")
```

Việc tạo instance cho class giống như gọi một *function*.

**Lưu ý** là trong Kotlin không có từ khóa *new*.

Tạo instance cho *nested class* sẽ được trình bày trong phần **Nested Class**

# Kế thừa (Inheritance)


Khác với *Java*, mọi class đều ngầm hiểu là kế thừa từ lớp cha *Object*, còn ở trong *Kotlin* các class sẽ được hiểu là kế thừa từ lớp cha *Any*

`class Example // Implicitly inherits from Any`

Lưu ý ở đây *Any* không phải là *Object*, vì *Any* không có bất cứ một *function* nào khác ngoài các *function* là *equals(), hashCode() và toString()*.

Để thực hiện kế thừa ta khai báo tên class cha sau tên dấu *:*:

```
open class Base(p: Int)

class Derived(p: Int) : Base(p)
```

```
open class Base(p: Int) {
    constructor(p: Int, t: String) : this(p)
}

class Derived(p: Int) : Base(p, "Hello")
```

Ở đây class *Derived* kế thừa class *Base*. Class *Derived* có *primary constructor*, do đó khi thực hiện kế thừa phải khởi tạo giá trị cho các *param* của *primary constructor* hoặc* secondary constructor* class cha ngay sau tên class cha.

Nếu class thực hiện kế thừa (ví dụ như *Derived*) không có *primary constructor*, ta có thể thực hiện khởi tạo các giá trị param của *primary constructor* hoặc *secondary constructor* class cha qua các *secondary constructor* của class thực hiện kế thừa bằng từ khóa super:

```
class MyView : View {
    constructor(ctx: Context) : super(ctx)

    constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```

**Chú ý**: từ khóa *open* có nghĩa ngược lại với *final* trong Java. Thêm *open* khi khai báo class *Base* cho phép các class có thể kế thừa từ nó. Mặc định tất cả các class trong Kotlin đều là *final*.

## Overriding method

Tương tự với *Java* các class con trong *Kotlin* có thể *override* lại các *function* của class cha, với điều kiện *function* đó của class cha phải được khai báo với từ khóa open. Khác với Java khi *override* *method* ta có thể khồng cần annotation @Override, tuy nhiên trong Kotlin thì nhất định phải xác định nó bằng *annotation override*:

```
open class Base {
    open fun v() {}
    fun nv() {}
}
class Derived() : Base() {
    override fun v() {}
}
```

Lúc này *function fun()* trong class *Derived* tự động được hiểu là *open*, do đó nếu không muốn bất cứ class nào *override* lại function func() khi kế thừa class Derived. Ta đánh dấu nó với từ khóa *final*:

```
class Derived() : Base() {
    final override fun v() {}
}
```

## Overriding property

Các phần liên quan đến overriding property được trình bày [tại đây](https://viblo.asia/p/kotlin-property-field-Az45bxmqZxY#_7-overriding-property-ghi-de-cac-property-6)

## Overriding rule

Một vấn đề xuất hiện khi thực hiện đa thừa kế trong *Kotlin* đó là có những *property* hoặc *method* giống nhau giữa các *superclass* ví dụ như một class kế thừa cả *class A* và *interface B*:

```
open class A {
    open fun f() { print("A") }
    fun a() { print("a") }
}

interface B {
    fun f() { print("B") } // interface members are 'open' by default
    fun b() { print("b") }
}
```

Khi kế thừa cả A và B, để gọi đích thị đến *function f()* của class A hay interface B ta sử dụng super<Base> để xác định:
    
```
class C() : A(), B {
// The compiler requires f() to be overridden:
override fun f() {
    super<A>.f() // call to A.f()
    super<B>.f() // call to B.f()
}
}
```

# Abstract Classes


Class hoặc các thành phần của nó có thể được khai báo là *abstract*. Các thành phần được khai báo *abstract* trong một class *abstract* không cần phải khai báo *body*:

```
abstract class Base {
    abstract fun calculate()
}


class Invoice(id: Int) : Base() {
    override fun calculate() {

    }
}
```

Ta cũng có thể biến một open *function non-abtract* thành *abstract* bằng cách override lại nó:

```
open class Base {
    open fun f() {}
}

abstract class Derived : Base() {
    override abstract fun f()
}
```

Bài học về class và tính kế thừa trong class đến đấy là kết thúc, hẹn gặp lại các bạn ở bài tiếp theo trong loạt bài về kotlin