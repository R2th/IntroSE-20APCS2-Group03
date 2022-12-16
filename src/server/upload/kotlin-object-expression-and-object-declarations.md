Chào mọi người, quay trở lại seri kotlin, trong bài viết này chúng ta sẽ cùng tìm hiểu hai khái niệm khá hay trong kotlin là Object Expression và Object Declarations, chúng thường được sử dụng khá phổ biến và trở nên hữu ích trong các trường hợp.
Hãy cùng đi vào tìm hiểu thông qua khái niệm và ví dụ cụ thể đi kèm.
### I. Context
Đôi khi, trong một số trường hợp, bạn cần tạo một object có sự sửa đổi nhỏ của một số class mà không cần khai báo rõ ràng một subclass mới cho nó.

Kotlin giúp chúng ta xử lý trường hợp này với Object Expression and Object Declarations.
### I. Object Expression 
Đầu tiên là Object Expression (biểu thức đối tượng), thực ra đây là khái niệm quen thuộc với các lập trình viên java, nó tương đương với khái niệm Anonymous class trong java,
Anonymous class được định nghĩa là biểu thức và không có tên.

Object Expression được sử dụng để khởi tạo các object có thể kế thừa từ một số class hoặc triển khai một Interface

```
Ex: val serviceConnection = object: ServiceConnection {
   	override fun onServiceDisconnected(name: ComponentName?) { }
   	override fun onServiceConnected(name: ComponentName?, service: IBinder?) {} 
}
```

Chúng ta cũng có thể tạo một Instance của abstract class.

```
Ex:	abstract class AB {
   abstract fun ab()
}
val a = object: AB() {
   override fun ab() {
   }
}
``` 

Nếu một supertype có một constructor, các tham số thích hợp của constructor phải được chuyển cho nó.

Nhiều supertype có thể được chỉ định dưới dạng được phân tách bằng dấu phẩy.

```
Ex:	open class A(x: Int) {
  	public open val y: Int = x
}
interface B { /*...*/ }
val ab: A = object : A(1), B {
override val y = 15
}
```

Trong trường hợp chúng ta chỉ cần dùng để tạo một object, không cần supertypes.

```
Ex:	fun foo() {
   val adHoc = object {
       var x: Int = 0
       var y: Int = 0 }
   print(adHoc.x + adHoc.y) 	
}
```

**Nơi sử dụng anonymous object:**

Các anonymous object chỉ có thể được sử dụng như là type trong khai báo local và private.

Nếu bạn sử dụng một anonymous object làm kiểu trả về của một function/public property, thì type thực tế của function/property đó sẽ là supertype được khai báo của anonymous object hoặc sẽ là Any nếu không khai báo bất kỳ supertype nào. 

Các member được thêm vào anonymous object sẽ không thể truy cập được.

```
Ex:	class C {
   // Private function, so the return type is the anonymous object type
   private fun foo() = object {
       val x: String = "x"
   }
   // Public function, so the return type is Any
   fun publicFoo() = object {
       val x: String = "x"
   }
   fun bar() {
       val x1 = foo().x        // Works
       val x2 = publicFoo().x  // ERROR: Unresolved reference 'x'
   }
}
```
### II. Object Declarations 
Tiếp theo sẽ là anh bạn Object Declarations (khai báo đối tượng), được sử dụng khá phổ biến không kém Object Expression.

Khác với Object Expression, Object Declarations luôn có tên theo sau từ khóa object. Cũng giống như một khai báo biến.

Một Object Declarations không phải là một expression, và không thể dùng để gán.

```
Ex:	object Test {
  	private var a: Int = 0
   	var b: Int = 1
   	fun makeMe12(): Int {
       	       a = 12
       	       return a }
}
	fun main() {
   val result: Int
   result = Test.makeMe12()       // To refer to the object, we use its name directly
   println("b = ${Test.b}") 		// b = 1
   println("result = $result") 	// result = 12
}
```

Các objects như vậy cũng có thể có supertypes. 

```
Ex:	object DefaultListener : MouseAdapter() {
  	override fun mouseClicked(e: MouseEvent) { ... }
override fun mouseEntered(e: MouseEvent) { ... }
}
```

**Note**: Object Declarations không được là local (tức là bị lồng trực tiếp bên trong một function) nhưng chúng có thể được lồng vào các object declarations khác hoặc các non-inner classes.
### III. Conclusion
Như vậy chúng ta đã tìm hiểu được Object Expression và Object Declarations trong kotlin, thông qua khái niệm và các ví dụ cụ thể, biết được các trường hợp và các lưu ý khi sử dụng. 
 
Hy vọng các bạn có thể sử dụng được trong các tình huống thực tế của dự án.

Cảm ơn các bạn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết tiếp theo. 

Refer: https://kotlinlang.org/docs/object-declarations.html#object-declarations