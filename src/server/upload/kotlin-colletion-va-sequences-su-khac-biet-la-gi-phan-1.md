**Xin chào các bạn, hôm nay mình xin chia sẻ các bạn về collections và sequences trong kotlin . **

# PHẦN 1 : Lý thuyết Collections, Sequences khác biệt giữa chúng.👍👍👍
# 
Làm việc với các Collection là không thể tránh khỏi khi lập trình, là một Library phổ biến trong Kotlin cung cấp nhiều chức năng tiện ích tuyệt vời .
Có 2 kiểu làm việc với Collection dựa đó là eagerly — with Collections, và lazily — with Sequences.

# Chúng ta hãy đi vào chi tiết để hiểu rõ hơn 

![Screen Shot 2021-12-12 at 17.20.08.png](https://images.viblo.asia/2933af19-dc26-47a2-ae5c-440ad594c3af.png)

Nhìn vào hình ảnh chúng ta thấy được sự khác nhau giữa eagerly — with Collections và Lazy - with Sequences . Khác biệt đó là thời điểm mỗi lần chuyển đổi trên Collection được thực hiện.
# Lý thuyết

### 1: Eagerly - Collections : 

Nhìn vào hỉnh ảnh bên trên ta thấy .

Mỗi thao tác được thực hiện khi nó được gọi và kết quả của thao tác được **lưu trữ trong Collection mớ**i. Các phép biến đổi trên tập hợp là các hàm "**Nội tuyến**" (inline)  (Mình sẽ nói cái này sau nhé). Ví dụ: nhìn vào cách .map {it.copy(...) được triển khai, chúng ta có thể thấy rằng đó là một hàm nội tuyến (inline), tạo ra một ArrayList mới.

==> Hàm map là một hàm inline như sau

```kotlin
public inline fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R> {
  return mapTo(ArrayList<R>(collectionSizeOrDefault(10)), transform)
}
```
>  Nếu các bạn chưa biết Hàm nội tuyến (inline ) là gì ? 

Mình xin nói sơ qua về khái niệm của nó. Hoặc nếu bạn học C++ rồi thì chắc hẵn cũng biết bỏ inline vào đầu function thì nó chèn nguyên các thân hàm vào nơi được gọi đúng không.Về cơ bản Kotlin cũng vậy , inline thực chất là một annotation thông báo với trình biên dịch rằng khi biên dịch sang byte code cũng chèn nguyên thân hàm vào nơi nó được gọi chứ không thông qua overhead. Các bạn nên tìm đọc thêm để hiểu sâu hơn nhé.  

Mình ví dụ cho nó thực tế : 
```kotlin
fun hello() {
    print("My name is")
    thisInline()
    print("hello everyone")
}

inline fun thisInline() {
    print("HoangChung")
}
```

Decomplie ra nó kiểu như này :

```java 
public void hello() {
   System.out.print("My name is");
   System.out.print("HoangChung");
   System.out.print("hello everyone");
}
```
Có vẻ đi hơi xa, chúng ta quay lại nhé, Tiêu đề mình viết " **Eagerly - Collections** " mà chưa giải thích Eager là gì đúng không, mình xin giải thích đơn giản như này .

Eager evaluation có nghĩa là khi bạn gán một biểu thức cho một biến, biểu thức được thực thi để tính toán ngay lập tức và giá trị của Biến được đặt.Điều này mang đến sự tường mình cho deterministic behavior trong phần mềm mà chúng ta viết. Đây là điều mặc định trong hầu hết các ngôn ngữ lập trình như Java, Kotlin, hoặc là C.  ▶️▶️▶️

### 2: Lazily — with Sequences.

> Sequences là lazily evaluated . Vậy Lazy Sequences là gì ? 

Lazy evaluation chỉ thực thi biểu thức vào thời điểm cuối cùng trước khi Biến của nó được cần đến. Nếu bạn không bao giờ truy cập vào 1 biến bất kì, thì dòng code định nghĩa cho biến đó sẽ không bao giờ được chạy. Đây là điều mặc định cho các ngôn ngữ lập trình giống như Haskell, và rất nhiều các ngôn ngữ lập trình hàm khác (functional programming languages).

Bọn sequences này nó có 2 types operations: Đó là kiểu intermediate and terminal.
* 
* Intermediate là bọn kiểu như .map, .flatmap, .groupBy ....

* Terminal là kiểu như .toList , .first , .last , .count ...

Các bạn quan sát hình ảnh trên cùng 

Có nghĩa là khi một thao tác Terminal được gọi, các thao tác trung gian mới được kích hoạt trên từng phần tử . Các Intermediate trả về 1 sequences khác , còn terminal thì không. nó chỉ là thao tác với sequenes đó. 

Intermediate : Chúng không thực hiện luôn, mà được lưu trữ lại  (này có vẻ hơi khó hiểu đúng ko,chờ xíu mình giải thích)

Bọn Sequenes này chúng không tham chiếu tới các items của collection,Mà chúng được tạo dựa trên Iterator của collection và giữ tham chiếu đến tất cả các Intermediate cần được thực hiện.

Không giống như các phép biến đổi trên collection phần trên, các Intermediate trên Sequences không phải là các hàm nội tuyến (Inline ) - các hàm nội tuyến không thể được lưu được mà lý thuyết là Sequences cần lưu trữ lại các Intermediate. 

Nhìn vào ví dụ dưới đây để thấy rõ hơn :

```kotlin
public fun <T, R> Sequence<T>.map(transform: (T) -> R): Sequence<R>{      
   return TransformingSequence(this, transform)
}
```

```kotlin
internal class TransformingIndexedSequence<T, R> 
constructor(private val sequence: Sequence<T>, private val transformer: (Int, T) -> R) : Sequence<R> {
override fun iterator(): Iterator<R> = object : Iterator<R> {
   …
   override fun next(): R {
     return transformer(checkIndexOverflow(index++), iterator.next())
   }
   …
}
```
Chúng ta có thể thấy rằng  transform function is giữ  new instance của Sequence

Còn thằng Terminal thì nó cũng là 1 inline function, lặp cho tới khi đúng element thôi.

```kotlin
public inline fun <T> Sequence<T>.first(predicate: (T) -> Boolean): T {
   for (element in this) if (predicate(element)) return element
   throw NoSuchElementException(“Sequence contains no element matching the predicate.”)
}
```

# Kết luận : 
Trên đây là phần 1 về Collection và Sequences trong Kotlin nói riêng. Cảm ơn các bạn đã đọc, nếu các bạn ủng hộ mình sẽ ra tiếp phần 2 nói về khi nào cần dùng và áp dụng trong trường hợp nào và các ví dụ cơ bản. <3.