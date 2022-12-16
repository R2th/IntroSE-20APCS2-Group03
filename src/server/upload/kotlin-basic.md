Chào các bạn, ở bài trước https://viblo.asia/p/android-java-hay-kotlin-3P0lPzM4Kox chúng ta đã có cái nhìn tổng quát về kotlin và để nối tiếp cho loạt bài về kotlin hôm nay mình và các bạn sẽ tìm hiểu về kotlin basic.Ở bài này mình tìm hiểu dựa trên khung sường ở https://kotlinlang.org/docs/reference/basic-types.html  

# 1.Val và var
Trong Java chúng ta khai báo biến như sau :
 ```
 String s;
  s = "hello";

  final String u = "hi"; //khai báo một constant
```

Với Kotlin, chúng ta có từ khóa var để khai báo biến và val để khai báo một constant, cú pháp sẽ là:

```
var s: String
  s = "hello"

  val v: String = "hi" //khai báo một constant, bắt buộc phải khởi tạo khi khai báo

  var u = "hey" //Có thể không xác định kiểu cho biến mà để tự compiler xác định
```

Note:

 - Kotlin không yêu cầu dấu ; sau mỗi statement nữa
 - Cơ chế giúp Kotlin tự xác định kiểu của biến gọi là Type inference, ngoài tự suy ra kiểu biến, cơ chế này còn sử dụng trong single-expression function (sẽ nói sau), làm cho boilerplate code giảm đi rất nhiều

# 2. Kiểu dữ liệu

Everything trong Kotlin đều là đối tượng, không còn dữ liệu kiểu nguyên thủy (primitive type) nữa. Điều này giúp cho mọi biến đều sử dụng được generic, gọi được các function, property hoặc có thể gán được bằng null

Tiếp theo, chúng ta sẽ nói về các kiểu dữ liệu trong Kotlin:
- numbers
- characters
- booleans
- strings
- arrays

# A. Numbers
- Size 
 Độ dài bit của từng kiểu được thể hiện trong bảng sau:

|Type  | Bit width | 
| -------- | -------- |
| Double | 64 |  
| Float     | 32     | 
| Long     | 54     | 
| Int     | 32     | 
| Short     | 16     | 
| Byte     | 8     | 

Note: character không được coi là kiểu số trong Kotlin

Từ Kotlin 1.1, khi sử dụng một số có nhiều chữ số, ta có thể sử dụng dấu gạch ngang để code dễ đọc hơn

```
val million = 1_000_000
val billion = 1_000_000_000L
```

- Representation (Biểu diễn number)
Trong Java, number được lưu trữ một cách vật lý như kiểu dữ liệu nguyên thủy của JVM trừ khi chúng ta cần biến đó có thể gán được bằng null (VD: Int?) hoặc có thể sử dụng với generic. Trong trường hợp đó, number sẽ được boxing - tức là tự wrap kiểu nguyên thủy đó để nó trở thành kiểu Object.
Note: khi boxing, định danh của number không nhất thiết được giữ lại

 ```
 val a: Int = 10000
  print(a === a) // Prints 'true'
  val boxedA: Int? = a
  val anotherBoxedA: Int? = a
  print(boxedA === anotherBoxedA) // !!!Prints 'false'!!!
```

Với toán tử *===*, *boxedA* và anotherBoxedA bằng nhau khi và chỉ khi 2 biến này trỏ đến cùng 1 đối tượng. Trong trường hợp này, khi gán giá trị *10000* cho biến *a*. *10000* sẽ được boxing thành kiểu *Int*. Bởi vậy, theo như suy luận bình thường, biến *boxedA* và *anotherBoxedA* được gán bằng a sẽ bằng nhau vì cùng trỏ tới cùng một object là *a*. Tuy nhiên, với các giá trị từ 0 -> 127 (2^7 - 1), các đối tượng này sẽ được lưu trong cùng một vùng nhớ. Với các giá trị lớn hơn mốc 127 này, vì boxing, các định danh sẽ không được giữ, tức là 2 biến *boxedA* và *anotherBoxed*A sẽ trỏ đến 2 vùng nhớ khác nhau. Bởi vậy, *boxedA ==== anotherBoxedA* trả về *false*

  ```
val a: Int = 127
  print(a === a) // Prints 'true'
  val boxedA: Int? = a
  val anotherBoxedA: Int? = a
  print(boxedA === anotherBoxedA) // !!!Prints 'true'!!!
```
Mặt khác, nó giữ lại sự bằng nhau
 ```
 val a: Int = 10000
  print(a == a) // Prints 'true'
  val boxedA: Int? = a
  val anotherBoxedA: Int? = a
  print(boxedA == anotherBoxedA) // Prints 'true'
```
Toán tử *==* trả về true nếu 2 biến không *null* và có giá trị bằng nhau

- Explicity conversion (Chuyển đổi kiểu tường minh)
Trong Java, khi muốn convert một biến có kiểu dữ liệu nhỏ hơn sang kiểu lớn hơn, ta chỉ cần gán biến đó cho một biến khác với kiểu dữ liệu ta muốn convert

```
 byte b = 1;
 int a = b; // OK
```

Với Kotlin, việc này là không thể bởi: Kotlin không hỗ trợ việc mở rộng size của một số như trong Java.
```
val b: Byte = 1
val i: Int = b //compiler báo lỗi: type mismatch
```

Để làm việc này, ta bắt buộc phải dùng các function được hỗ trợ bởi Kotlin như:
+ toByte(): Byte
+ toShort(): Short
+ toInt(): Int
+ toLong(): Long
+ toFloat(): Float
+ toDouble(): Double
+ toChar(): Char

```
val b: Byte = 1
val i: Int = b.toInt() //ngon
```

- Toán tử
Với Kotlin, các toán tử là một function member của các lớp, chúng ta có thể sử dụng các toán tử này như một function hoặc gọi chúng như một toán tử trung tố(infix) và overload các toán tử này. Các toán tử thao tác về bit bao gồm:
+ shl(bits) – signed shift left (Java's <<)
+ shr(bits) – signed shift right (Java's >>)
+ ushr(bits) – unsigned shift right (Java's >>>)
+ and(bits) – bitwise and
+ or(bits) – bitwise or
+ xor(bits) – bitwise xor
+ inv() – bitwise inversion

```
val x = (1 shl 2) and 0x000FF000
val y = 1.shl(2).and(0x000FF000)
```

# B. Characters
Lớp đại diện cho character trong Kotlin là *Char*. Để biểu diễn một ký tự, ta dùng dấu nháy đơn

```
val c: Char = 'a'
val d: Char = 4 //compiler sẽ báo lỗi
```
Note: *Char* không được coi là số trong Kotlin. Bởi vậy, việc gán như trên sẽ không thành công
#  C. Boolean

Lớp đại diện cho kiểu Boolean trong Kotlin là Boolean. Boolean có 2 giá trị là true và false. Các toán tử được hỗ trợ cho Boolean là:
+ || - phép tuyển
+ && - phép hội
+ ! - phủ định

# D. String
Đại diện cho string trong Kotlin là lớp *String*. String là kiểu immutable. Thành phần của string là các character, có thể truy cập bằng cách dùng *[]*
+ Java
 ```
String s = "hello";
s.charAt(0); // 'h'
```

+ Kotlin
```
var s: String = "hello"
s[0] // 'h'
```

-  String Literals   
 Kotlin có 2 loại literal:
  + Double quote: để xuống dòng hoặc tab thì sử dụng các ký tự đặc biệt: \n, \t...
    ```
    val s1 = "hello\n"
    ```
  + Triple quote: chúng ta sẽ tạo được một raw string, có thể bao gồm cả một dòng mới
  ```
val text = """
 for (c in "foo") {
      print(c)
  }
 """
```

+ String template
 Kotlin cho phép truyền biến vào string bằng cách sử dụng từ khóa ${}
 
 Java
  ```
  int result = 3;
  String s = "Kết quả là " + result;
```
Kotlin
 ```
val s3 = "abc"
val str = "$s3.length is ${s3.length}" // "abc.length is 3"
```

# E. Arrays
Lớp đại diện cho mảng trong Kotlin là *Array*. Việc truy cập vào các phần tử sử dụng *get*, *set* hoặc *[],* *size* là một thuộc tính của lớp *Array*.
 + Khởi tạo : 
 ```
Để tạo mảng, ta sử dụng function arrayOf hoặc hàm tạo
 val a: Array<Int> = arrayOf(1,2,3,4) // [1,2,3,4]
 var a1: Array<Int> = Array(3, { it ->
        it * 3
  }) //[0,3,6,9]
```
+ Bất biến
*Array* trong Kotlin là một đại lượng bất biến. Bởi vậy, không thể gán một *Array<String> *cho một *Array<Any> *(Mọi lớp trong Kotlin đều extends từ đối tượng *Any*) Java
 ```
 String a1[] = new String [3];
 Object a[] = a1; //ngon
```
```
var a2: Array<String> = arrayOf(1,2,3)
var a3: Array<Any> = a2 //compiler sẽ báo lỗi
```
    
   # 3. Null safety
    
   Kotlin cung cấp cả 2 kiểu là non-null và nullable(như trong Java). Từ bây giờ, exception chỉ có thể null trong trường hợp
   + Tự throw NullPointerException()
   + Sử dụng toán tử !! (sẽ được nói sau)
   + Java code gây ra
   + 1 trường hợp chưa hiểu

Mặc định, kiểu của biến là *non-null*. Để khai báo một biến kiểu nullable, ta sử dụng *?*
 ```
var e: String? = null
```
Với một biến non-null, việc gán null sẽ là không thể
```
var e: String = null //compiler báo lỗi
```

Khi kiểu biến là non null, việc gọi đến các biến, function hoàn toàn safe. Ngược lại, nếu truy cập đến một biến có kiểu nullable, NPE vẫn có thể xảy ra -> unsafe call

+ Safe call : Sử dụng dấu ? để safe call

```
e?.length
```
Đặc biệt, cơ chế safe call có thể gọi theo chain:
```
var user :User? = User("framgia", 22)
var length = user?.name?.length
```
Trong trường hợp này, nếu user null hoặc name null, giá trị trả về cho length là null. Nếu tất cả không null, length khi này mới có giá trị.

Để thực hiện việc gì chỉ với các giá trị khác null, ta có thể sử dụng toán tử *?*. và các hàm *apply, let...*

```
 val listWithNulls: List<String?> = listOf("A", null)
 for (item in listWithNulls) {
      item?.let { println(it) } // chỉ thực hiện với các giá trị khác null
 }
```
+ **Toán tử elvis ?:**
Bình thường, để gán giá trị cho một biến, ta làm như thế này: 
```
var b: String? = "hello"
val l: Int = if (b != null) b.length else -1
```
Với toán tử elvis, ta có thể làm như thế này
```
val l = b?.length ?: -1
```

Ngoài ra, vì *throw* và *return* là biểu thức trong Kotlin, ta có thể làm như thế này:
```
fun foo(node: Node): String? {
      val parent = node.getParent() ?: return null
      val name = node.getName() ?: throw IllegalArgumentException("name expected")
      // ...
 }
```
**+ Toán tử !!**

```
val l = b!!.length
```
Với !!, nếu b không null, l = b.length. Nếu b null, NPE sẽ được throw

-> * Với Kotlin, NPE xuất hiện nếu nó được yêu cầu một cách tường minh chứ không thể xuất hiện nếu bạn không mong muốn*

 # 4. Toán tử so sánh
 Trong Kotlin, có 2 loại đẳng thức:
 + Referential equality: 2 references trỏ tớ cùng một object
 + Structural equality: function equals

**Referential equality**

 Toán tử *===* và khác là !==. *a === b* khi và chỉ khi a và b cùng trỏ đến cùng một *object*
 
**Structural equality**

Toán tử == và khác !=. Theo quy ước, khi gọi a == b, compiler sẽ tự động translate thành

```
 a?equals(b) ?: (b===null)
```
Tức là nếu a không null, sẽ gọi function equals để kiểm tra với b, nếu a null, thì sẽ kiểm tra b có trỏ tới null không

Note: Lưu ý: khi sử dụng a==null, mặc định compiler sẽ tự động chuyển thành a===null

# 5. Check kiểu và casting

**Kiểm tra kiểu biến**
Với Java, ta sử dụng từ khóa instanceOf. Với Kotlin, để kiểm tra kiểu biến trong Kotlin, ta sử dụng is và !is Java

```
if (s instanceOf String){

 }
```

Kotlin

```
if (s is String){

}
```

**Casting**

Sử dụng toán tử *as*

```
val t: String =  y as String
```

**Unsafe cast**

Trong Java, nếu việc *cast* không thành công, sẽ có một *exception* có thể được throw: *ClassCastException*. Đối tượng có kiểu nullable không thể cast thành đối tượng *non-null*. Nếu *y = null* trong trường hợp trên, sẽ có *exception* được bắn ra. Để cast được, Kotlin cung cấp như sau :

```
val t:String? = null as String?
```
**Safe cast**

Để tránh việc exception được bắn ra, Kotlin cung cấp *as?*

```
val s4: String? = s5 as? String
```

s4 sẽ có giá trị của s5 nếu s5 không null, ngược lại, s4 = null.

**Smart casting**


Trong một số trường hợp, chúng ta không phải cast một cách tường minh vì compiler sẽ track việc check kiểu bằng is và sẽ tự động cast nếu cần:
```
if (s is String) {
    print(s.length) // x được tự động cast thành kiểu String
  }

  if (s !is String) return
  print(s.length) // x được tự động cast thành kiểu String

  if (s !is String || s.length == 0) return // x được tự động cast thành kiểu String
```

# 6. Cấu trúc điều khiển
**a. Cấu trúc if**
Trong Kotlin, if là một biểu thức. Bởi vậy, Kotlin không còn toán tử 3 yếu tố Java

```
int a = result? 1 :0;
```

Kotlin

 ```
var a: Int = if (result) 1 else 0

 var r: Int = if (result) {
      print("ok")
      1
  } else {
      print("fail")
      0
  }
```
Nếu là khối lệnh, giá trị ở cuối khối lệnh là giá trị trả về. Khi gán giá trị, nhánh else bắt buộc phải có

**b. Cấu trúc when:**
```
when (x) {
      1 -> print("x == 1")
      2 -> print("x == 2")
      else -> {
          print("x chả bằng 1 cũng méo bằng 2")
      }
  }
```

Note: *else* là bắt buộc , trừ khi compiler có thể chứng minh được tất cả cá trường hợp đã được cover. Có thể sử dụng *when* để thay thế việc sử dụng *if else if*
+ Nếu việc xử lý của 1 số trường hợp giống nhau:

```
when (x) {
    0, 1 -> print("x == 0 or x == 1")
    else -> print("ngược lại")
  }
```
+ Hoặc kiểu dữ liệu

```
var result1 = when (s) {
    is String -> s.startsWith("prefix")
    else -> false
}
```
+ Có thể sử dụng when để gán giá trị
 ```
var l: Int = when (s) {
    "hello" -> 0
    "hi" -> 1
    else -> 2
  }
```
+ Điều kiện có thể sử dụng để kiểm tra trong khoảng
```
 val validNumbers = arrayOf(11, 13, 17, 19)
 when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
 }
```
**c. Cấu trúc for**
Vòng lặp for có thể sử dụng để duyệt bất kỳ thứ gì cung cấp một *iterator*. VD:

 Có một member hoặc extension function tên là iterator(), kiểu trả về là Iterator
  + Có một member hoặc extension function next()
   +  Có một member hoặc extension function hasNext trả về kiểu Boolean Tất cả 3 function này đều cần được đánh dấu là operator

```
class DateRange(start: Int, val end: Int) {
      var current = start

      operator fun iterator(): Iterator<Int>{
          return object : Iterator<Int>{
              override fun next(): Int {
                  val result = current
                  current++
                  return result
              }

              override fun hasNext(): Boolean {
                  return current <= end
              }
          }
      }
  }

  //for
  for (i in DateRange(1, 10)) {
      print(i) //1..10
  }
```

Một vòng lặp for đối với một array sẽ được compile thành một vòng lặp index mà không cần tạo một iterator object:

```
//Kotlin
  var array: Array<Int> = arrayOf(1,2,5,6,7)
  for (i in array) {
    // do something
  }

  //Decompile code
  Object[] elements$iv = new Integer[]{Integer.valueOf(1), Integer.valueOf(2), Integer.valueOf(5),Integer.valueOf(6), Integer.valueOf(7)};
  Integer[] array = elements$iv;

  for(int var4 = 0; var4 < array.length; ++var4) {
     int i = array[var4].intValue();
  }
```

Nếu bạn muốn duyệt qua một array hoặc một list bằng các chỉ số, bạn có thể làm như sau:
```
  val array = arrayOf(1,3,2,6,8)
  for (i in array.indices) {
      print(array[i]) //13268
  }
```
Lưu ý rằng việc duyệt qua một phạm vi (iteration through a range) được compile thanh một cách thực thi tối ưu mà không phải cần thêm object nào được tạo ra

Ngoài ra, bạn có thể sử dụng function withIndex trong thư viện chuẩn:

```
val array = arrayOf(1,3,2,6,8)
  for (pair in array.withIndex()) {
      println("element at ${pair.index} is ${pair.value}")
  }

  //result
  //element at 0 is 1
  //element at 1 is 3
  //element at 2 is 2
  //element at 3 is 6
  //element at 4 is 8
```

Một số so sánh
+ Vòng lặp xuôi

Java
```
for (int i = 1; i <= 11 ; i++) {
    //...
}
```
Kotlin
```
for (i in 1..11){

}
```
+ Vòng lặp bước 2

Java
```
for (int i = 1; i <= 11 ; i+=2) {
    //...
 }
```
Kotlin
```
for (i in 1..11 step 2){

}
```
+ Vòng lặp lùi

Java
```
for (int i = 10; i>=0;i--) {
    //...
  }
```
Kotlin
```
for (i in 11 downTo 1){

  }
```
+ Vòng lặp từng giá trị
Java
```
for (String s : arrayList) {
    //...
  }
```
Kotlin
```
for (item: Int in ints){

  }
```

**d. Cấu trúc while**
Tương tự như Java nên mình sẽ không giới thiệu lại

**e. break, continue và return**
Chức năng của từng từ khóa mặc định như sau:
+*return*: thoát khỏi function gần nhất
+ *break*: thoát khỏi vòng lặp gần nhất
+ *continue*: tiếp tục bước tiếp theo của vòng lặp gần nhất

Label với break và continue

Để chỉ định break và continue đến một expression nào đó, sử dụng label: @label

```
loop@ for (i in 1..100) {
    for (j in 1..100) {
      if (j > 2) break@loop
    }
  }
```
Mặc định, nếu không có label *@loop* ,*break* sẽ thoát ra khỏi vòng lặp gần nhất, vòng lặp j. Với label *@loop*, *break@loop* sẽ thoát ra cả 2 vòng lặp. Tương tự như vậy, *continue* cũng có thể dung label để đi đến bước tiếp theo của vòng lặp

Label với return

```
fun foo(){
    var ints:Array<Int> = arrayOf(1,3,5,6)

    ints.forEach lit@ {
      if (it == 0) return @lit
      print(it)
    }
  }
```

Với trường hợp trên, câu lệnh return sẽ chỉ thoát ra khỏi function forEach, và sẽ làm tiếp các công việc phía sau. Nếu không có label, return sẽ thoát ra khỏi function foo(). Ta có thể đặt label hoặc sử dụng implicit label được định nghĩa dựa theo tên function

# 7. Khởi tạo một lớp
Trong Java, để khởi tạo một class, ta sử dụng từ khóa new, với Kotlin. Function tạo được gọi như một function bình thường

```
 var user: User = User("framgia", 22)
 
```


# 8. Biểu thức This

Để truy cập đến this từ phạm vi bên ngoài (một class hoặc extension function), chúng ta sử dụng this@label với @label là chỉ định đến phạm vi this mong muốn

```
class A { // implicit label @A
      inner class B { // implicit label @B
          fun Int.foo() { // implicit label @foo
              val a = this@A // trỏ đến lớp A
              val b = this@B // trỏ đến lớp B

              val c = this // trỏ đến param (một số Int) của function foo() bởi foo() là một extension function
              val c1 = this@foo // trỏ đến param (một số Int) của function foo() bởi foo() là một extension function

              val funLit = lambda@ fun String.() {
                  val d = this // trỏ đến param (một String) của function funLit()
              }


                val funLit2 = { s: String ->
                  // trỏ đến param (một số Int) của function foo() bởi foo() là một extension function
                  val d1 = this
              }
          }
      }
  }
```

Vừa rồi là tất cả các kiến thức basic theo í hiểu của mình. Nếu thấy chỗ nào chưa đúng xin vui lòng để lại comment góp í.Xin chân thành cảm ơn
còn ở i tiêp theo mình sẽ giới thiệu với các bạn về *Function* trong kotlin,hen gặp lại các bạn vào bài sau