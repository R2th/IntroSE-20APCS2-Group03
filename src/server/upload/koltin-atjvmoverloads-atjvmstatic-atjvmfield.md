# @JvmOverloads 
```
class MyCustomerView constructor(
   context: Context,
   attrs: AttributeSet? = null,
   defStyleRes: Int = 0) : View(context, attrs, defStyleRes)
```

Phía trên là đoạn code tạo ra 1 view custom trong Android. Khá quen thuộc phải không.

Các bạn sẽ không gặp vấn đề gì khi build. Tuy nhiên, điều không may lại xảy ra lúc runtime:

```
Caused by: android.view.InflateException: Binary XML file line #10: Error inflating class com.myapplication.customview.MyCutomerView
```

Lỗi này là sao nhỉ ? Nguyên nhân chính ở đoạn : View(context, attrs, defStyleRes) 

Các bạn có nhớ khi tạo 1 class customer view với java, chúng ta phải viết 4 đến 5 cái constructor khác nhau hay không? Trong đó, số lượng param trong các constructor đó là khác nhau.

Đó chính là nguyên nhân xảy ra lỗi này. Do chúng ta đang thiếu các fun constructor cần thiết cho class View.


-> @JvmOverLoads sẽ giải quyết vấn đề này. 

Một trường hợp tương tự như sau:
```
data class MyObject( val param1: String, val param2: String = "default string")
```

Với kotlin, chúng ta hoàn toàn có thể tạo ra 1 instance của MyObject chỉ với param1 như sau:
```
val obj1 = MyObject("param1")
```
param2 sẽ được tạo với default value.

Nhưng nếu ta khởi tạo đối tượng trên trong java như sau thì sẽ lỗi:
```
MyObject obj = new MyObject("param1");
```
Chúng ta phải truyền tường minh mọi tham số của constructor, kể cả những tham số đã có mặc định.

Để giải quyết vấn đề này, chỉ cần sửa lại như sau:
```
data class MyObject @JvmOverloads constructor( val param1: String, val param2: String = "default string")
```

Đây chính là mô tả về công dụng của @JvmOverloads:
```
 Instructs the Kotlin compiler to generate overloads for this function that substitute default parameter values.
 
 If a method has N parameters and M of which have default values, M overloads are generated: the first one
 takes N-1 parameters (all but the last one that takes a default value), the second takes N-2 parameters, and so on.
```

Khá tường minh phải không. Đơn giản là nó sẽ giúp tạo ra số function (hay constructor) tương ứng với số param có giá trị default.

# @JvmStatic
Nhìn thôi là có thể biết được công dụng của annotation này là tạo cho function hay property ở dạng static.

Thực tế nếu chỉ code thuần kotlin, ta cũng sẽ hiếm khi sử dụng anno này do đã có 1 loại định nghĩa static có vẻ thông dụng hơn đó là Top-level function.

Tuy nhiên, sự khác biệt sẽ nằm ở **companion object**.

```
class A {
companion object {
        fun funNotStatic() {

        }

        @JvmStatic fun funStatic() {

        }
    }
}
```

Thông thường, nếu cần gọi các fun trên từ 1 class kotlin khác, ta chỉ cần 
```
A.funNotStatic() hoặc
A.funStatic()
```

Tuy nhiên, nếu muốn gọi chúng từ 1 class java thì sao? Lúc này @JvmStatic sẽ có vai trò của nó.
```
A.Companion.funNotStatic();
funStatic();
```

Ta có thể thấy, nhờ có @JvmStatic, funStatic() được gọi trực tiếp mà k cần thông qua các tên class chứa nó. Ngược lại với funNotStatic, ta phải tường minh **A.Companion**

# @JvmField
```
data class Test constructor(val x1: String)
```

Để lấy đc gía trị x1, ta làm như sau:

Trong kotlin:
```
val test = Test("")
        test.x1
```

Trong java:
```
Test test = new Test("");
        test.getX1();
```

java sẽ k truy cập trực tiếp biến mà phải qua getter, setter.

Bây giờ, ta sẽ thêm @JvmField như sau:
```
data class Test constructor(@JvmField val x1: String)
```

> Instructs the Kotlin compiler not to generate getters/setters for this property and expose it as a field.
> 

Anno này sẽ hủy bỏ các getter, setter của biến, thay vào đó có thể cho phép truy cập trục tiếp.
Vì vậy trong đoạn code java trên, ta hoàn toàn có thể viết test.x1 tương tự như kotlin.