## Swift Closure

Khi mới làm quen với Swift, đôi khi ta gặp phải những đoạn code như dưới:

   ![](https://images.viblo.asia/60f801da-a685-4c26-b13a-9ad3f71027c7.png)

Và ..................

   ![](https://images.viblo.asia/be468431-633c-472d-b04e-65f9cc29e226.png)

Tuy nhiên ta không hiểu chúng là gì, và dùng như nào. Trong Swift, những đoạn code kiểu như trên được gọi là Closure, bài Note này sẽ đi sâu vào bới móc xem Closure là gì ;))
Trong Swift thì Closure là khái niệm khá quan trọng, ứng dụng nhiều cũng như là khó đọc cho người mới nếu chưa nắm được syntax của nó. Bài viết này sẽ nói về khái niệm Closure cũng như một vài ứng dụng của nó.
### Closure là?
> Closure là một block code, có thể tách ra để tái sử dụng. Hiểu đơn giản hơn thì Closure là function, nhưng khuyết danh. Ta có thể gán Closure vào biến và sử dụng như các kiểu value khác.

**Closures có thể là 1 trong 3 loại sau:**
* Global functions: là closures có tên và không “capture” các giá trị.
* Nested functions: là closures có tên và có thể “capture” các giá trị từ function chứa nó.
* Closure expressions: là closures không có tên được viết dưới dạng giản lược syntax và có thể “capture” các giá trị từ các bối cảnh xung quanh.

**2 loại đầu được gọi với cái tên khác là function. Và khi nhắc đến Closures, thường ta chỉ quan tâm đến trường hợp thứ 3, Closure expressions (từ giờ chỉ gọi tắt là Closure).**
## Closure Syntax

Ví dụ cụ thể về khai báo Closure:

```
import Foundation

// Declare a variable to hold a closure
var add: (Int, Int) -> Int

// Assign a closure to a variable
add = { (a: Int, b: Int) -> Int in
    return a + b
}

// Or combine like this
var sub = { (a: Int, b: Int) -> Int in
    return a - b
}

add(1, 2)
sub(1, 2)
```

Note: parameters trong Closure có thể là kiểu “in-out”, variadic, tuples, nhưng không thể có default value.
So với Function thì Closure đã được viết ra với mục đích ngắn gọn nhất có thể, và nó như sau:

```
// Declare a variable to hold a closure
var add: (Int, Int) -> Int

/** SHORTHAND SYNTAX **/

// Not need return keyword when only have single return statement
add = {(a: Int, b: Int) -> Int in
    a + b
}
add(1, 1)

// Remove return type and parameters type
// Because we already declare: var add: (Int, Int) -> Int
add = {(a, b) in
    a + b
}

add(9, 2)

// Remove parameters, Swift will refer parameters by number, start from 0:
add = {
    $0 + $1
}

add(99, 1)
```

## Ứng dụng của Closure:
**Closure như là parameter cho function, Trailing closure syntax**

Với function thì ta hoàn toàn có thể truyền vào cho function khác dưới dạng arguments, tuy nhiên trước khi truyền thì phải define function sẽ dùng làm argument:

![](https://images.viblo.asia/8dfb5642-91c2-4bf2-9e0c-386e6d157bf9.png)

Đối với Closure thì đơn giản hơn, ta có thể define closure inline:

![](https://images.viblo.asia/dfe32886-55cd-4f52-b9a8-efcbe6f3ee13.png)

> Note: {$0 + $1}: Swift cho phép refer đến mỗi parameter bằng format như bên, bắt đầu từ index 0.
Đối với những function có parameter cuối cùng là Closure, thì ta có thể viết lại function call dưới dạng Trailing Closure như sau:

![](https://images.viblo.asia/3dde1d73-c0db-4391-90f2-116669e43151.png)

Cách làm này phù hợp với những Closure dài, dùng như complete block/callback…Ví dụ về cách sử dụng callback/block khi request data từ server, ví dụ:
Khai báo func:

![](https://images.viblo.asia/b2094a02-50e0-437c-bda2-f7578d404617.png)

Gọi hàm:

![](https://images.viblo.asia/d01ea192-0ede-4656-8625-821c661765e3.png)

Thanks !!
Nguồn tham khảo : nhathm.com