# Reflection trong Kotlin

## 1. Giới thiệu

Với các bạn chưa biết thì Reflection là kỹ thuật cho phép chúng ta kiểm tra, dung nạp và tương tác với các class, field và method tại thời điểm runtime. Chúng ta thậm chí có thể làm được điều này kể cả khi chúng ta không hề biết tí gì về chúng tại thời điểm compile.

Kỹ thuật này được hỗ trợ bởi JVM (Java Virtual Machine) nên có thể được sử dụng trên tất cả các ngôn ngữ chạy trên JVM.

## 2. Java Reflection

Java Reflection API (JRA) khả dụng và hoạt động ổn định với Kotlin. Đồng nghĩa với việc bao gồm cả **java.lang.Class** và tất cả mọi thứ nằm trong gói **java.lang.reflect**.

Nếu vì một lý do nào đó chúng ta muốn sử dụng các API của Java Reflection thì chúng ta có thể sử dụng nó như cách chúng ta làm với Java. Ví dụ như nếu muốn lấy danh sách các public method trong class Kotlin thì chúng ta sẽ làm như sau:

```java
MyClass::class.java.methods
```

Cụ thể khi viết như vậy có nghĩa như sau:

- **MyClass::class** sẽ cho chúng ta một lớp Kotlin đại diện cho lớp **MyClass**.

- **.java** sẽ cho chúng ta một lớp **java.lang.Class** tương ứng.

- **.methods** là lời gọi tới hàm truy cập **java.lang.Class.getMethods()**

Cho dù chúng ta có gọi hàm đó từ Java hay Kotlin hoặc lớp **MyClass** là lớp Java hay Kotlin thì cũng không có gì khác nhau. ĐIều này cũng đúng đối với cả lớp `data class` trong Kotlin:

```kotlin
data class ExampleDataClass(
  val name: String, var enabled: Boolean)
 
ExampleDataClass::class.java.methods.forEach(::println)
```

Trong đoạn code trên thì **ExampleDataClass::class.java.methods** trả về một **kotlin.Array<Method>** mà chúng ta có thể gọi **forEach()**

## Cải tiến trong KotlinReflection

Mặc dù trong Kotlin chúng ta có thể sử dụng API của Java Reflection nhưng các API này không thể khai thác triệt để thông tin từ các thành phần trong Kotlin, ví dụ như thay vì chỉ có **class** thì trong Kotlin còn có **data class**, **companion class**... . Ngoài ra thì việc sử dụng nó ít nhiều cũng mang lại cảm giác hơi khó chịu do nó không thuần Kotlin :v, do vậy nên Kotlin đã đưa ra một bộ API Reflection của riêng mình.

Để sử dụng Kotlin Reflection API (KRA) thì chúng ta sẽ phải sử dụng đến tham chiếu. Như ở phần trước thì chúng ta đã sử dụng **::class** để lấy tham chiếu đến định nghĩa của lớp. Ngoài ra thì chúng ta cũng sẽ có thể lấy được tham chiếu đến các phương thức và thuộc tính của lớp.

### Tham chiếu lớp trong Kotlin

KRA cho phép chúng ta truy cập vào tham chiếu của lớp. Điều này giúp chúng ta có thể "soi" được chi tiết toàn bộ thông tin một lớp Kotlin và Java.

Kotlin API dùng cho lớp chủ yếu xoay quanh lớp **kotlin.reflect.KClass**. Lớp này có thể được truy cập bằng cách sử dụng operator ***::*** từ tên lớp bất kỳ hoặc một instance của lớp đó, ví dụ: **String::class**. Ngoài ra thì nó còn có thể được truy cập từ bằng cách sử dụng hàm mở rộng **java.lang.Class.kotlin** nếu chúng ta có một instance của class Java ấy:

```kotlin
val listClass: KClass<List> = List::class
 
val name = "Baeldung"
val stringClass: KClass<String> = name::class
 
val someClass: Class<MyType>
val kotlinClass: KClass<MyType> = someClass.kotlin
```

Khi chúng ta đã có được object **KClass** thì giờ đây chúng ta đã có thể khai thác được các thông tin về lớp tương ứng. Một số thông tin mà chúng ta lấy được là thông tin chung mà cả trong Java cũng có định nghĩa nhưng cũng có một số thông tin riêng đặc thù của Kotlin.

Ví dụ như chúng ta có thể biết được là lớp đấy là lớp abstract hay lớp final. Ngoài ra thì chúng ta cũng có thể biết được là lớp đấy là data class hay companion class.

```kotlin
val stringClass = String::class
assertEquals("kotlin.String", stringClass.qualifiedName)
assertFalse(stringClass.isData)
assertFalse(stringClass.isCompanion)
assertFalse(stringClass.isAbstract)
assertTrue(stringClass.isFinal)
assertFalse(stringClass.isSealed)

```

Ngoài ra thì chúng ta cũng có thể di chuyển giữa các phân cấp lớp: trong Java thì chúng ta có thể di chuyển từ Class sang lớp cha của nó, interface và outerclass chứa nó nếu có. Ngoài những tính năng vừa kể thì Kotlin còn cung cấp cho chúng ta khả năng lấy được Companion Object của một lớp tùy ý và một instance Object từ một class object:

```kotlin
println(TestWithCompanion::class.companionObject)
println(TestWithCompanion::class.companionObjectInstance)
println(TestObject::class.objectInstance)
```

 Chúng ta cũng có thể tạo một instance của một lớp từ một tham chiếu lớp nữa, cái này khá tương đồng với Java:

```kotlin
val listClass = ArrayList::class
 
val list = listClass.createInstance()
assertTrue(list is ArrayList)
```

Có một cách khác nữa là chúng ta có thể lấy được thông tin về toàn bộ các hàm khởi tạo và gọi cụ thể một hàm khởi tạo tùy ý nào đó. Cái này mình sẽ nói chi tiết hơn ở phần tham chiếu phương thức.

Cũng gần như tương tự thì chúng ta có thể truy cập vào toàn bộ phương thức, thuộc tính, phương thức mở rộng và các thành phần khác của lớp:

```kotlin
val bigDecimalClass = BigDecimal::class
 
println(bigDecimalClass.constructors)
println(bigDecimalClass.functions)
println(bigDecimalClass.memberProperties)
println(bigDecimalClass.memberExtensionFunctions)
```

### Tham chiếu phương thức trong Kotlin

Ngoài việc có thể tương tác với lớp thì chúng ta cũng có thể tương tác với phương thức và các thuộc tính. Cụ thể thì với thuộc tính sẽ bao gồm cả các thuộc tính được định nghĩa với **val** hoặc **var**, phương thức lớp thông thường và top-level.

Cũng tương tự như với lớp thì chúng ta có thể lấy được tham chiếu đến phương thức hoặc thuộc tính thông qua toán tử **::**. Điều này giống hệt Java 8 khi chúng ta muốn lấy tham chiếu của phương thức và cách dùng cũng tương tự. Tuy nhiên thì trong Kotlin thì tham chiếu phương thức này còn có thể được sử dụng để lấy được nhiều thông tin reflection hơn về mục tiêu.

Khi chúng ta đã có tham chiếu của phương thức thì chúng ta có thể gọi nó một cách gián tiếp như đang gọi trực tiếp vậy. Cái này được gọi là Callable Reference:

```kotlin
val str = "Hello"
val lengthMethod = str::length
         
assertEquals(5, lengthMethod())

```

Như đã nói ở trên thì chúng ta có thể lấy được nhiều thông tin hơn về phương thức như với lớp. Thông tin này ngoài các thông tin cơ bản mà JRA có thể cung cấp cộng với một số thông tin liên quan đến các khái niệm mới trong Kotlin như phương thức đo có phải là một **operator** hoặc nó là **inline** không:

```kotlin
val byteInputStream = String::byteInputStream
assertEquals("byteInputStream", byteInputStream.name)
assertFalse(byteInputStream.isSuspend)
assertFalse(byteInputStream.isExternal)
assertTrue(byteInputStream.isInline)
assertFalse(byteInputStream.isOperator)
```

Hơn nữa thì chúng ta có thể lấy được thông tin về input và output của phương thức thông qua reference của nó. Thông tin này bao gồm về kiểu dữ liệu trả về và đối số truyền vào, bao gồm cả các thông tin liên quan đến các khái niệm mới trong Kotlin như là tính nullability và optionally

```kotlin
val str = "Hello"
val method = str::byteInputStream
 
assertEquals(
  ByteArrayInputStream::class.starProjectedType, 
  method.returnType)
assertFalse(method.returnType.isMarkedNullable)
 
assertEquals(1, method.parameters.size)
assertTrue(method.parameters[0].isOptional)
assertFalse(method.parameters[0].isVararg)
assertEquals(
  Charset::class.starProjectedType, 
  method.parameters[0].type)
```

### Tham chiếu thuộc tính trong Kotlin

Ngoài các thông tin cơ bản như trong Java mà chúng ta có thể lấy được từ tham chiếu thuộc tính thì chúng ta cũng có thể kiểm tra được là thuộc tính đấy có phải là constant, late init hoặc mutable:

```kotlin
lateinit var mutableProperty: String
val mProperty = this::mutableProperty
assertEquals("mutableProperty", mProperty.name)
assertTrue(mProperty.isLateinit)
assertFalse(mProperty.isConst)
assertTrue(mProperty is KMutableProperty<*>)
```

Có một điều lưu ý là định nghĩa thuộc tính trong Kotlin còn có thể áp dụng cho cả code không phải được viết bằng Kotlin. Trong trường hợp này thì thuộc tính là các trường tuân theo convention của JavaBean liên quan đến hàm getter và setter.

Định nghĩa property có thể áp dụng cho toàn bộ các lớp trong thư viện chuẩn của Java. Ví dụ như lớp **Throwable** có thuộc tính **Throwable.message** do tồn tại phương thức **getMessage()**.

Chúng ta có thể truy cập vào thuộc tính thông qua các tham chiếu phương thức được public là phương thức **getter** và **setter**. Hàm **setter** chỉ tồn tại nếu chúng ta làm việc với **KMutableProperty** - là thuộc tính được khai báo là **var**, trong khi đó thì sẽ luôn tồn tại phương thức **getter**.

Ngoài ra thì cũng có cách khác để lấy được tham chiếu phương thức là dùng hàm **get()** và **set()**.  Giá trị của **getter** và **setter** thực chất là tham chiếu phương thức, vì thế nên chúng ta có thể dử dụng nó như một tham chiếu phương thức bình thường khác:

```kotlin
val prop = this::mutableProperty
 
assertEquals(
  String::class.starProjectedType, 
  prop.getter.returnType)
 
prop.set("Hello")
assertEquals("Hello", prop.get())
 
prop.setter("World")
assertEquals("World", prop.getter())

```

## Tổng kết

Bài viết này chỉ mang đến cho các bạn cái nhìn tổng quan về những gì các bạn có thể làm được với reflection trong Kotlin, bao gồm cách tương ác và sự khác biệt về khả năng reflection khi so sánh với Java. Các ví dụ các bạn có thể xem tại [đây](https://github.com/eugenp/tutorials/tree/master/core-kotlin)



#### Nguồn: http://www.baeldung.com/kotlin-reflection#