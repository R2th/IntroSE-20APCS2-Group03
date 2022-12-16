![](https://images.viblo.asia/68d9bea8-94d6-4c69-9207-ac9fa47cc2a3.png)

## Inline function là gì ?

Inline function có thể là một khái niệm xa lạ với lập trình viên Java, nhưng với những người đã làm việc nhiều với C++, đây lại là một khái niệm rất cơ bản.

Inline function có tên tiếng Việt là hàm nội tuyến, trong C++, khi bạn thêm từ khoá `inline` vào trước tên hàm, trình biên dịch sẽ hiểu rằng bất cứ nơi nào hàm được gọi, nó sẽ chèn nguyên thân hàm vào đó chứ không thông qua việc gọi overhead nữa.

![](https://images.viblo.asia/b97bf5d7-3f24-465c-8958-df6d37e0c477.jpg)

Kiểu như code ban đầu là thế này:

```Cpp:Raw
#include <iostream>
 
using namespace std;
 
inline void printSum(int a, int b) // Định nghĩa một hàm inline
{
    int sum = a + b;
 	cout << sum << endl;
}

int main()
{
 	printSum(5, 6); // Gọi như một hàm bình thường...
    return 0;
}
```

Và trình biên dịch sẽ hiểu như dưới đây:

```Cpp:Compiled
#include <iostream>
 
using namespace std;

int main()
{
    int sum = a + b;
 	cout << sum << endl;
    return 0;
}
```

## Inline function trong Kotlin

Trong Kotlin, từ khoá `inline` thực chất là một annotation thông báo với trình biên dịch rằng khi biên dịch sang byte code cũng chèn nguyên thân hàm vào nơi nó được gọi chứ không thông qua overhead. Tư tưởng hoàn toàn giống như của C++.

Giờ hãy thử với một ví dụ:

```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse()
    print("doSomething end")
}

fun doSomethingElse() {
    print("doSomethingElse")
}
```

Ở đây, chúng ta có 2 hàm:
* `doSomething()`
* `doSomethingElse()`

Cả 2 hàm này đều là những hàm thông thường, hàm `doSomething()` đang gọi đến hàm `doSomethingElse()`. Khi decompile code này về Java, chúng ta sẽ thấy như sau:
```Java
public void doSomething() {
   System.out.print("doSomething start");
   doSomethingElse();
   System.out.print("doSomething end");
}

public void doSomethingElse() {
   System.out.print("doSomethingElse");
}
```

Như ở trên, hàm `doSomething()` vẫn đang gọi đến hàm `doSomethingElse()` như thường.

Giờ hãy thử thêm từ khoá inline vào như dưới đây để xem có gì khác biệt.

```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse()
    print("doSomething end")
}

inline fun doSomethingElse() {
    print("doSomethingElse")
}
```

Khi decompile code, chúng ta thu được kết quả như sau:

```Java
public void doSomething() {
   System.out.print("doSomething start");
   System.out.print("doSomethingElse");
   System.out.print("doSomething end");
}
```

Ngạc nhiên chưa, toàn bộ thân hàm `doSomethingElse()` đã được copy vào trong hàm `doSomething()`. Và hàm `doSomething()` cũng không còn phải gọi đến hàm `doSomethingElse()` nữa.

Đó là bởi vì chúng ta đã sử dụng từ khoá `inline`.

## Ưu và nhược điểm của hàm inline ?

Ưu điểm:

* Không cần phải gọi overhead của hàm
* Tiết kiệm chi phí gọi hàm, thực hiện chương trình nhanh.

Nhược điểm:

* Tốn bộ nhớ Stack nếu hàm chứa các biến cục bộ.
*  Tăng kích thước của file class vì code dài ra.
*  Nếu dùng nhiều sẽ làm giảm tốc độ truy cập bộ nhớ đệm

## Hàm inline được sử dụng khi nào ?

Các trường hợp nên sử dụng hàm inline:

* Khi cần tối ưu hiệu suất, tăng tốc độ xử lý.
* Các hàm ngắn, được dùng rất nhiều lần.

Các trường hợp nên tránh sử dụng hàm inline:
* Khi code của hàm quá dài, chứa nhiều biến tạm, gọi đến quá nhiều nơi.
* Hàm khởi tạo.
* Hàm trừu tượng.

## Hiểu sâu hơn về inline

Có thể bạn đã biết về Higher-Order Function và Lambda trong Kotlin. Nếu chưa, hãy tìm hiểu qua về nó trước khi đọc phần này.

Giờ hãy thử một ví dụ với Higher-Order Function và Lambda như sau:
```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse {
        print("doSomethingElse")
    }
    print("doSomething end")
}

fun doSomethingElse(abc: () -> Unit) {
    abc() // Thực thi hàm abc được truyền vào như một tham số.
}
```
Giờ thử xem khi decompile nó sẽ ra cái gì ?
```Java
public void doSomething() {
    System.out.print("doSomething start");
    doSomethingElse(new Function() {
        @Override
        public void invoke() {
            System.out.print("doSomethingElse");
        }
    });
    System.out.print("doSomething end");
}

public void doSomethingElse(Function abc) {
    abc.invoke();
}
```
Ồ, thì ra nó tạo ra một instance mới của lớp `Function` và thực hiện phương thức `invoke()` của đối tượng đó. Điều này thật sự gây lãng phí tài nguyên không đáng có vì ta vốn chỉ cần thực hiện nội dung bên trong hàm `doSomethingElse()`.

Và giờ hãy thử sử dụng từ khoá `inline` với hàm `doSomethingElse()`:
```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse {
        print("doSomethingElse")
    }
    print("doSomething end")
}

inline fun doSomethingElse(abc: () -> Unit) {
    abc()
}
```

Một lần nữa, hãy xem khi decompile nó sẽ ra cái gì ?

```Java
public void doSomething() {
    System.out.print("doSomething start");
    System.out.print("doSomethingElse");
    System.out.print("doSomething end");
}
```

Như bạn thấy, nó chỉ còn thực hiện thân của hàm `doSomethingElse()`. Đó là lý do tại sao chúng ta cần đến từ khoá `inline` để giúp cải thiện hiệu năng của chương trình.

## Noinline là gì ?

Giả sử chúng ta có 2 lambda là abc và xyz như dưới đây:
```Kotlin
inline fun doSomethingElse(
    abc: () -> Unit,
    xyz: () -> Unit
) {
    abc()
    xyz()
}
```
Nhưng chúng ta không muốn inline cả 2 thằng abc và xyz, chúng ta chỉ muốn inline thằng abc thôi, còn thằng xyz dùng như bình thường, trong trường hợp này, chúng ta cần sử dụng từ khoá `noinline` phía trước xyz như dưới đây:
```Kotlin
inline fun doSomethingElse(
    abc: () -> Unit,
    noinline xyz: () -> Unit
) {
    abc()
    xyz()
}
```

Như vậy, chúng ta có thể dùng noinline để ngăn việc inline khi cần.

## Crossinline là gì ?

Để hiểu được `crossinline`, chúng ta cần phải hiểu "non-local return" là gì.

Hãy lấy một ví dụ để hiểu về non-local return trước nhé:
```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse {
        print("doSomethingElse")
        return // Hãy để ý chỗ này
    }
    print("doSomething end")
}

inline fun doSomethingElse(abc: () -> Unit) {
    abc()
}
```

Sau khi decompile code, chúng ta được:
```Java
public void doSomething() {
    System.out.print("doSomething start");
    System.out.print("doSomethingElse");
}
```

Ở đây chúng ta thấy rằng không hề có dòng `System.out.print("doSomething end")` vì chúng ta đã thêm `return` vào trong khối lambda rồi, nó cho phép non-local return và bỏ qua đoạn code phía dưới.

**Làm sao để ngăn việc này ?**

Chúng ta cần thêm từ khoá `crossinline`, sau đó nó sẽ không cho phép chúng ta đặt từ khoá `return` bên trong khối lambda như bên dưới nữa:

```Kotlin
fun doSomething() {
    print("doSomething start")
    doSomethingElse {
        print("doSomethingElse")
        // Không thể chèn return vào đây được
    }
    print("doSomething end")
}

inline fun doSomethingElse(crossinline abc: () -> Unit) {
    abc()
}
```

Đây là lý do tại sao `crossinline` có thể giúp chúng ta tránh được "non-local return".

## Tổng kết

Sau bài viết này tôi hy vọng các bạn đã nắm được ý nghĩa và cách dùng của các từ khoá `inline`, `noinline` và `crossinline` trong Kotlin. Hãy áp dụng nó thật tốt trong các project để tạo ra những phần mềm tuyệt vời nhé. :sunglasses:

Tham khảo: [MindOrks](https://blog.mindorks.com/understanding-inline-noinline-and-crossinline-in-kotlin)