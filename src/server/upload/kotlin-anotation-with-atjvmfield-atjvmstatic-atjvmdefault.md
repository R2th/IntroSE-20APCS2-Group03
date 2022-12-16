### I. Giới thiệu
Chào các bạn, annotation là một từ khóa không còn xa lạ, tuy nhiên nó thường được chúng ta sử dụng mà ít khi hiểu rõ nó là gì, vì vậy trong bài viết này chúng ta sẽ cùng tìm hiểu anotation trong Kotlin, thông qua ba loại chính là `@JvmField`, `@JvmStatic` và `@JvmDefault`, đây là ba loại phổ biến thường được sử dụng, ngoài ra cũng còn nhiều loại annotation khác mà các bạn cũng có thể tìm hiểu được tương tự sau khi đã hiểu một số loại cơ bản. Cùng bắt đầu thôi nào !
### II.  Khái niệm annotation
Để hiểu được các loại annotation trong kotlin là gì, chúng ta sẽ đi sơ vào khái niệm:  `Annotation` được hiểu đơn giản là các class được khai báo với từ khóa annotation ở trước từ khóa class, đi kèm với mỗi class này sẽ có một annotation `@Target` với argument là một hoặc nhiều hằng số enum có kiểu là `AnnotationTarget` (class này định nghĩa một danh sách enum để chúng ta sử dụng), target của từng annotation class sẽ dựa vào các hằng số enum này. 

Ngoài ra, với mỗi khai báo class annotation, ngoài annotation đi kèm là `@Target` ra, thì có thể có thêm một số annotation khác như là `@Retention`, `@MustBeDocumented` ...., các annotation đi kèm này có cùng bản chất của một annotation class, chúng có cách khai báo tương tự và được Kotlint JVM định nghĩa mục đích sử dụng riêng cho từng annotation và các bạn có thể hiểu một cách dễ dàng vì đã được Kotlint comment một cách chi tiết.  

Với các class annotation đã được định nghĩa này, các bạn có thể sử dụng để annotate(chú thích) đi kèm với các thành phần như là field, funtion, class... để ràng buộc, cũng như nghĩa định nghĩa lên các thành phần được annotate annotation với các mục đích sử dụng của annotation đó.

Ex:  Dưới đây là một ví dụ khai báo một annotation với mục đích sử dụng đã được Kotlin JVM define với comment chi tiết
```
/**
 * Suppresses errors about variance conflict
 */
@Target(TYPE)
@Retention(SOURCE)
@MustBeDocumented
public annotation class UnsafeVariance
```

Để rõ hơn chúng ta sẽ cùng đi vào cụ thể các annotation bên dưới để tìm hiểu.
### III.  `@JvmField`
Đầu tiên là `@JvmField`: 
```
@Target(AnnotationTarget.FIELD) 
annotation class JvmField
```
- Annotation này được định nghĩa đơn giản như sau, nếu bạn cần expose một Kotlin property như một field trong Java, thì hãy chú thích nó với annotation `@JvmField` (để phân biệt được Kotlin property và Java field các bạn có thể tìm hiểu qua bài viết này [Property-In-Kotlin-Part-1](https://viblo.asia/p/property-in-kotlin-part-1-gDVK2pvjlLj))
- Nó sẽ hướng dẫn Kotlin compiler(trình biên dịch Kotlin) không tạo getters / setters cho thuộc tính kotlin và hiển thị nó dưới dạng một field
- Với yêu cầu sử dụng phải là property có backing field không phải private, modifiers không phải là open, override hoặc const và cũng không được là một delegated property.

Ex:   
```
class User(id: String) {
   @JvmField val ID = id
}
// Java: ID can be used 
class JavaClient {
   public String getID(User user) {
       return user.ID;
   }
}
```

**Expose static field:** Chúng ta cũng có thể exposed static field bằng một trong các cách dưới đây:

- `@JvmField` annotation
- lateinit modifier
- const modifier 

Ex: 
```
open class Expose {
   lateinit var a: String
   companion object{
       lateinit var a : String
       const val b: String ="b"
       var c = "c"
       @JvmField var d = "d"
   }
} 

// Java 
class OBA extends Expose {
   public void abc(){
       System.out.println(super.a = "aaa");
       System.out.println(Expose.a = "a");
       System.out.println(Expose.b);
       System.out.println(Expose.d);
   }
}
output: 
 //  aaa 
 //  a
 //  b
 //  d 
```

### IV.  `@JvmStatic`
Tiếp theo chúng ta sẽ đến với annotation `@JvmStatic` 
```
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY, AnnotationTarget.PROPERTY_GETTER, AnnotationTarget.PROPERTY_SETTER)
annotation class JvmStatic
```
Annotation `@JvmStatic` được định nghĩa như sau:
- Chỉ định rằng, một static method bổ sung cần được generated từ thành phần được chú thích này nếu nó là một function.
- Nếu thành phần này là một property,  các method static getter/setter sẽ được tạo.

Ex:  
```
companion object {
   @JvmStatic
   fun callStatic() {}
   fun callNonStatic() {}
}
// Now, callStatic() is static in Java, while callNonStatic() is not:
C.callStatic(); // works fine
C.callNonStatic(); // error: not a static method
C.Companion.callStatic(); // instance method remains
C.Companion.callNonStatic(); // the only way it works
```

Ex 2: Same for named objects 

```
object Obj {
   @JvmStatic fun callStatic() {}
   fun callNonStatic() {}
}
// In Java:
Obj.callStatic(); // works fine
Obj.callNonStatic(); // error
Obj.INSTANCE.callNonStatic(); // works, a call through the singleton instance
Obj.INSTANCE.callStatic(); // works too
```

Annotation `@JvmStatic` cũng có thể được áp dụng trên một property của một đối tượng hoặc một companion object, làm cho các phương thức getter và setter của nó trở thành static members trong đối tượng đó hoặc class chứa companion object.

### V. `@JvmDefault`
Và cuối cùng là `@JvmDefault`:  
```
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.PROPERTY)
annotation class JvmDefault  
```

- `@JvmDefault`  chỉ available kể từ Kotlint 1.3 nhưng rất tiếc là hiện tại đã bị loại trừ, tuy nhiên mình sẽ vẫn giới thiệu qua annotation này để các bạn nào đang sử dụng hiểu thêm về nó.
- Bắt đầu từ JDK 1.8, các Interface trong Java có thể chứa các phương thức default. Bạn có thể khai báo một non-abstract member của Kotlin interface làm mặc định cho các lớp Java triển khai nó.
- Để sử dụng nó, chúng ta chỉ cần config trong file build.gradle:

```
android {
	kotlinOptions {
        freeCompilerArgs = ['-Xjvm-default=compatibility']
        jvmTarget = '1.8'
    }
}
```

Ex: 
```
interface Call {
   @JvmDefault
   fun move() = println("walking") 
   fun speak(): Unit
} 
// move() is default implementing method is available
 for Java classes implementing the interface.
class UseCall : Call {
   override fun speak() {
       println("I'm walking")
   }
// default implementation move()
}

// In Java 
class IMP implements Call{
   @Override
   public void speak() {
       System.out.println("I'm Swimming");
   }
       IMP imp = new IMP();
       imp.move(); // walking 
       imp.speak(); // I'm Swimming 
   }
}
```
### VI. Tổng kết
- Như vậy, thông qua một số annotation chính như `@JvmField` `@JvmStatic` `@JvmDefault`... và các ví dụ đi kèm, chúng ta đã tìm hiểu được annotation trong Kotlin là gì, cách khai báo như thế nào, sử dụng ra sao, từ đó giúp các bạn không còn mơ hồ khi sử dụng chúng. 
- Qua bài viết này mình hy vọng hữu ích với các bạn và có thể áp dụng vào trong dự án của mỗi người. 
- Cảm ơn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết tiếp theo.
- Bài viết có tham khảo https://kotlinlang.org