# Chú thích? 
Chắc hẳn bạn đã bắt gặp nó rất nhiều trong project của các bạn. Chẳng hạn bạn dùng @JVMStatic, @JVMName... Chúng đã giúp ta xử lý một phần dữ liệu mà ta không cần phải quan tâm và giúp code trở nên ngắn gọn hơn.<br>
<img src="https://developerlife.com/assets/annotation-processing-hero.svg" alt="error">

Chú thích là phương tiện gắn siêu dữ liệu vào mã. Để khai báo một chú thích, hãy đặt công cụ `annotation` sửa đổi trước một lớp:
`annotation class Fancy`

Các thuộc tính bổ sung của chú thích có thể được chỉ định bằng cách chú thích lớp chú thích bằng các chú thích meta:

- @Target chỉ định các loại phần tử có thể có mà có thể được chú thích bằng chú thích (chẳng hạn như các lớp, hàm, thuộc tính và biểu thức);

- @Retention chỉ định liệu chú thích có được lưu trữ trong các tệp lớp đã biên dịch hay không và liệu chú thích có hiển thị thông qua phản chiếu trong thời gian chạy hay không (theo mặc định, cả hai đều true);

- @Repeatable cho phép sử dụng cùng một chú thích trên một phần tử nhiều lần;

- @MustBeDocumented chỉ định rằng chú thích là một phần của API công khai và phải được bao gồm trong lớp hoặc chữ ký phương thức được hiển thị trong tài liệu API đã tạo.

```Java
@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION,
        AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.EXPRESSION)
@Retention(AnnotationRetention.SOURCE)
@MustBeDocumented
annotation class Fancy
```

# Cách sử dụng annotations
```Java
@Fancy class Foo {
    @Fancy fun baz(@Fancy foo: Int): Int {
        return (@Fancy 1)
    }
}
```

Nếu bạn cần chú thích hàm tạo chính của một lớp, bạn cần thêm constructortừ khóa vào khai báo hàm tạo và thêm chú thích trước nó:

```Java
    class Foo @Inject constructor(dependency: MyDependency) { ... }
```

Bạn cũng có thể chú thích những người truy cập thuộc tính:

```Java
    class Foo {
    var x: MyDependency? = null
        @Inject set
}
```

## Constructor
Chú thích có thể có hàm tạo nhận tham số.

```Java
annotation class Special(val why: String)

@Special("example") class Foo {}
```

Các loại thông số được phép là:

- Các kiểu tương ứng với kiểu nguyên thủy của Java (Int, Long, v.v.)

- String

- Lớp ( Foo::class)

- Enums

- Các chú thích khác

- Mảng thuộc các loại được liệt kê ở trên

Các tham số chú thích không được có kiểu nullable, vì JVM không hỗ trợ lưu trữ null dưới dạng giá trị của thuộc tính chú thích.

Nếu một chú thích được sử dụng làm tham số của một chú thích khác, thì tên của chú thích đó không được bắt đầu bằng @ký tự:

```Java
annotation class ReplaceWith(val expression: String)

annotation class Deprecated(
        val message: String,
        val replaceWith: ReplaceWith = ReplaceWith(""))

@Deprecated("This function is deprecated, use === instead", ReplaceWith("this === other"))
```

Nếu bạn cần chỉ định một lớp làm đối số của chú thích, hãy sử dụng lớp Kotlin ( KClass ). Trình biên dịch Kotlin sẽ tự động chuyển đổi nó thành một lớp Java, để mã Java có thể truy cập các chú thích và đối số một cách bình thường.

```Java
import kotlin.reflect.KClass

annotation class Ann(val arg1: KClass<*>, val arg2: KClass<out Any>)

@Ann(String::class, Int::class) class MyClass
```

## Chú thích với Lambdas 
Chú thích cũng có thể được sử dụng trên lambdas. Chúng sẽ được áp dụng cho invoke()phương thức tạo phần thân của lambda , sử dụng chú thích để kiểm soát đồng thời.

```Java
annotation class Suspendable

val f = @Suspendable { Fiber.sleep(10) }
```

## Các mục tiêu trang web sử dụng chú thích
Khi bạn chú thích một thuộc tính hoặc một tham số phương thức khởi tạo chính, có nhiều phần tử Java được tạo từ phần tử Kotlin tương ứng và do đó nhiều vị trí có thể có cho chú thích trong mã bytecode của Java được tạo. Để chỉ định chính xác cách tạo chú thích, hãy sử dụng cú pháp sau:

```Java
class Example(@field:Ann val foo,    // annotate cho thuộc tính 
              @get:Ann val bar,      // annotate cho getter
              @param:Ann val quux)   // annotate cho tham số constructor
```

Cú pháp tương tự có thể được sử dụng để chú thích toàn bộ tệp. Để thực hiện việc này, hãy đặt chú thích có mục tiêu fileở cấp cao nhất của tệp, trước chỉ thị gói hoặc trước tất cả các lần nhập nếu tệp nằm trong gói mặc định:

```Java
@file:JvmName("Foo")

package org.jetbrains.demo
```

Nếu bạn có nhiều chú thích với cùng một mục tiêu, bạn có thể tránh lặp lại mục tiêu bằng cách thêm dấu ngoặc sau mục tiêu và đặt tất cả các chú thích bên trong dấu ngoặc:

```Java
class Example {
     @set:[Inject VisibleForTesting]
     var collaborator: Collaborator
}
```

Danh sách đầy đủ các mục tiêu trang web sử dụng được hỗ trợ là:

- file
- property (các chú thích với mục tiêu này không hiển thị với Java)
- field
- get (thuộc tính nhận)
- set (thuộc tính thiết lập)
- receiver (tham số bộ thu của một chức năng hoặc thuộc tính tiện ích mở rộng)
- param (tham số hàm tạo)
- setparam (tham số thiết lập thuộc tính)
- delegate (trường lưu trữ cá thể ủy quyền cho thuộc tính được ủy quyền)

Để chú thích tham số bộ thu của một hàm tiện ích mở rộng, hãy sử dụng cú pháp sau:

```Java
fun @receiver:Fancy String.myExtension() { ... }
```

Nếu bạn không chỉ định mục tiêu trang web sử dụng, mục tiêu được chọn theo @Targetchú thích của chú thích đang được sử dụng. Nếu có nhiều mục tiêu áp dụng, mục tiêu áp dụng đầu tiên từ danh sách sau sẽ được sử dụng:
- param
- property
- field

# Tổng kết
Vậy là mình đã nói qua cho các bạn cách để tạo annotations cũng như là sử dụng nó. Cảm ơn bạn đã đọc bài viết này, nếu có bất kỳ vấn đề, ghóp ý gì thì inbox dưới post này nha :) cảm ơn các bạn.
# Tài liệu tham khảo
https://kotlinlang.org/docs/annotations.html<br>
https://developerlife.com/2020/07/11/annotation-processing-kotlin-android/