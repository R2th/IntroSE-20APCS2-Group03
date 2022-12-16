1. Overloading functions

    Đầu tiên ta sẽ tạo ra một overloaded function có thể lấy nhiều nhất là 6 và ít nhất là 2 tham số. Trường hợp dùng java thì với yêu cầu này chúng tôi phải tạo ra đến 6 phương thức khác nhau lặp đi lặp lại mà không hay cho lắm. Với Kotlin, ta được biết đến cái gọi là "default values ", cái mà sẽ tự động xử lý vấn đề này cho chúng ta. Ví dụ:
```
fun createStudent(name: String,
                  course: String,
                  age: Int = 0,
                  address: String = "",
                  email: String = "",
                  linkedIn: String = ""): Student = 
Student(name, course, age, address, email, linkedIn)
```

Các method mà ta có thể gọi được:

```
createStudent(“name”,”Course”), 
createStudent(“name”,”Course”,22), createStudent(“name”,”Course”,address=”Address”, email=”test@example.com”),
...
```

Nếu ta chỉ muốn chọn các tham số trong khi gọi functions cái không được order, chúng ta có pass các tham số như các tham số đã được đặt tên, cái mà cho phép Kotlin tự động suy luận ra đúng cái tham số cho chúng ta. Lưu ý rằng, xác định tên cho một đối số cụ thể sẽ dẫn đến việc ta phải xác định tên cho tất cả các đối số sau đó để tránh nhầm lẫn.

*Chú ý:* Khi gọi các phương thức từ file java, *overloading* này sẽ không làm việc ngoài box. Chúng ta chú thích cho các method với các chú thích cụ thể *@JvmOverloads*, cái mà sẽ tạo ra các methods *overloaded* trong java cho chúng ta. Bạn cũng có thể kiểm tra bytecode được dịch ngược để xem những gì mà tất cả các methods đã tạo ra cho chúng ta khi sử dụng *@JvmOverloads*

![](https://images.viblo.asia/eb8ca624-0926-4a2c-867c-38f0494aaca2.png)

2. Static Utility classes

Ta có nhưng thứ rất phổ biến đó là *static Utility classes*. Các phương thức thông thường, cái mà không được cụ thể trong bất kì một *android class* đặc biệt nào kết thúc trong *static Utility class* để có thể được truy cập một cách thuận tiện. Với Kotlin, chúng ta có những thứ được biết đến như là *top-level functions* và *top-level properties*. Thay vì tạo ra các lớp vô nghĩa bao bọc các phương thức này, ta có thể chỉ đơn giản thiết lập các phương thức trực tiếp bên ngoài lớp cha của chúng ta. Như vậy, phương thức có khả năng được truy cập vào từ bất cứ đâu trong *package* của mình.

```
package com.dagger.kotlin

import java.util.*

//Since the function's body contains a single expression, we need not use curly braces here
fun createRandomNumber() = Random().nextInt()

//This works for properties as well
val MY_API_KEY : String = "API_KEY"

data class Student(){
  ...
}
```

3. Extension functions

Cuối cùng nhưng không phải ít nhất, đó chinhs là *extension functions!*. Chúng ta hãy nghĩ đến rất nhiều những trường hợp cơ bản như: *Toast* sẽ không được đẹp nếu chúng ta có cái gì đó như thế này:

```
“I’m a long toast”.longToast(context)
```

Ta có thể viết lại như sau:

```
Toast.makeText(context,”I’m a long toast”,Toast.LENGTH_LONG).show()
```

Với Kotlin, điều này là hoàn toàn được, nhờ các *Extension Functions* tuyệt vời mà có thể được gọi bởi các đối tượng của một lớp cụ thể, mà không được định nghĩa trong lớp đó. Làm thế nào chúng ta có thể làm điều này? Vâng, khá dễ dàng!

```
package kotlindemo

import android.content.Context
import android.widget.Toast

fun Any.shortToast(ctx: Context) = Toast.makeText(ctx, this.toString(), Toast.LENGTH_SHORT).show()

```

hãy nhìn vào các thành phần liên quan ở đây:

*Any.shortToast() :* Ở đây, Bất kỳ là *Receiver Type*, là loại mà *extension funnction* được định nghĩa. Trong Kotlin, Any là *anologus* đến Object class trong Java, *Any.shortToast ()* có nghĩa là phương pháp *shortToast* của tôi có thể được gọi trên mọi đối tượng có sẵn.

*this.toString() :* *this* ở đây là *Receiver Object*, i.e. một *instance* của *Receiver Type*. Vì vậy, khi viết một cái gì đó như thế này:

```
4.shortToast(context)
```

thì *Receiver Type* ở đây là Int, trong khi đối tượng Receiver là 4.

Tuy nhiên, trước khi bạn tiếp tục và chấp nhận điều này như là phép thuật Voodoo, chúng ta cần phải nhận ra rằng phía dưới hood, đây là mã Plain Java chạy trên điện thoại của chúng ta. Nó là một bài thực hành tốt, làm thế nào để việc làm này chính xác. Xem xét *Java Bytecode* được biên dịch, ta có thể thấy rằng một lớp Java mới có tên *ExtensionFuncKt.java* được tạo ra có một static method.

![](https://images.viblo.asia/98ebe43c-c80a-4edb-b3a7-2a96d21d16ee.png)

Method này cũng có trong một *Receiver* và một *Context* và hiển thị *Toast* phù hợp.
Cảm ơn các bạn đã chú ý, bài viết dựa theo [Leveraging the power of functions in Kotlin](https://medium.com/coding-blocks/leveraging-the-power-of-functions-in-kotlin-de5fd9db065a)