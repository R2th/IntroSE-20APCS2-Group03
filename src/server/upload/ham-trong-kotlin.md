## Hàm trong Kotlin (1)

Chào mọi người, lại là mình đây. Đọc đến chương này chắc hẳn bạn đã tìm hiểu được cơ bản về Kotlin sau khi đã tham khảo các link mình đã gắn ở bài viết trước về Kotlin là gì, vì sao nó ra đời, tiếp đó một project nho nhỏ tạo API trong Kotlin sử dụng Spring, và một chút Expression trong Kotlin. 

Tiếp sau đây chúng ta sẽ đi sâu vào hơn một chút về sự khác biêt, hay nói hơn là `mới` trong `Kotlin Functions` có gì.

Chúng ta sẽ làm quen về các khái niệm như `Local Functions`, `Infix Functions`, `Anonymous Functions `,  `Inline Functions`, `Returns and Local Returns`, `Tail Recursion `, `Operator Overloading in Kotlin`, `Lambda Extensions in Kotlin`, `Invoking instances`, `Functional Constructs in Kotlin`. 

Nào bắt đầu cùng tìm hiểu thôi.

### 1. Local function
Đầu tiên, chúng ta cùng tìm hiểu lại một khái niệm quen thuộc : `Local function`

Có thể hiển đơn giản `local function` là function được khai báo bên trong một function khác (nested). Và dĩ nhiên, `Local function` không thể được sử dụng ở bên ngoài function định nghĩa nó và nó có thể sử dụng lại các biến của function chứa nó khai báo trước.

Vd:
```
fun printTime(time: Int? = null) {
//    printThree()
    fun printThree() { // 1
        println(3)
        if (time != null) println(time)
        println("===")
    }
    printThree() // 2
}
fun main(args: Array<String>) {
    printTime()
    printTime(4)
}

```
Chú ý một chút, dòng số 2 mình có comment lại gọi hàm `printThree()`, sở dĩ `local function` không thể được gọi trước khi khai báo. Nếu gọi trước chương trình sẽ báo lỗi.

### 2. Infix Functions
**Bringing our code closer to natural language** Câu nói mở đầu trong bài viết [Infix Functions in Kotlin](https://medium.com/makingtuenti/infix-functions-in-kotlin-2db3d3142dd2) làm tôi rất ấn tượng và tìm hiểu sâu về nó. Bài viết đi kèm ví dụ rất dễ hiểu.

Cụ thể tôi xin thể hiện lại bằng ví dụ của tôi:

```
class Amimal(var animal: String) {
    infix fun eat(food: String) {
        println("$animal eating  $food")
    }
}

val cat = Animal("cat")

cat.eat("fish") // print: cat eating fish
cat eat "fish"  // print: cat eating fish
```

Nhờ sử dụng `infix` giúp cho code gần gũi với ngôn ngữ tự nhiên hơn. Thật tuyệt đúng không ?

Lưu ý: Function có thể sử dụng `infix` khi:

1. Function là một thành phần của một class hoặc là một extension của class
2. Function chỉ có một param duy nhất
3. Function phải có `infix ở đầu function

`Mở rộng:`
Kotlin cung cấp các toán tử phạm vi khác nhau thường được gọi là `infix notaion`

Ví dụ được lấy tại trang chủ  [Kotllinlang.org](https://kotlinlang.org/docs/reference/functions.html)

```
1 shl 2 + 3 ~ 1 shl (2 + 3)
0 until n * 2 ! 0 until (n * 2)
xs union ys as Set<*> ~ xs union (ys as Set<*>)
a && b xor c ~ a && (b xor c)
a xor b in c ~ (a xor b) in c
```


```
class MyStringCollection {
    infix fun add(s: String) { /* ... */ }
    
    fun build() {
        this add "abc"   // Correct
        add("abc")       // Correct
        add "abc"        // Incorrect: the receiver must be specified
    }
}
```

### 3. Anonymous Functions

Anonymous function cũng là một cách để định nghĩa một function, khác ở chỗ, anomymous function thì không có tên. 
```
fun(x: Int, y: Int): Int = x + y
```
Các tham số và kiểu trả về giống như các hàm thông thường, ngoại trừ các kiểu tham số có thể được bỏ qua nếu chúng có thể được suy ra từ ngữ cảnh:
```
ints.filter(fun(item) = item > 0)
```
Ví dụ được tham khảo tại: https://kotlinlang.org/docs/reference/lambdas.html#lambda-expressions-and-anonymous-functions

### 4. Inline Functions
Để dễ hiểu hơn về inline function, chúng ta cùng theo dõi ví dụ sau:
```
inline  fun op(x: Int) {
    println("op")
}

inline fun operation(noinline op: () -> Unit) {
    println("before op")
    op()
    println("after op")
}

fun main(args: Array<String>) {
    operation { println("Operation main")}
    println("hello world")
}

```
Bật tính năng `show bytecode` trên ide Intelij, chọn `decompile` , ta sẽ thấy:
```
public final class InlineFunctionKt {
   public static final void op(int x) {
      String var2 = "op";
      System.out.println(var2);
   }

   public static final void operation(@NotNull Function0 op) {
      Intrinsics.checkParameterIsNotNull(op, "op");
      String var2 = "before op";
      System.out.println(var2);
      op.invoke();
      var2 = "after op";
      System.out.println(var2);
   }

   public static final void main(@NotNull String[] args) {
      Intrinsics.checkParameterIsNotNull(args, "args");
      Function0 op$iv = (Function0)null.INSTANCE;
      String var2 = "before op";
      System.out.println(var2);
      op$iv.invoke();
      var2 = "after op";
      System.out.println(var2);
      String var4 = "hello world";
      System.out.println(var4);
   }
}
```

Việc sử dụng inline function cũng có một số hạn chế. Đó là:
1. Một inline function không thể tự gọi lại chính nó một cách trực tiếp hoặc gọi gián tiếp thông qua một inline funciton khác.
2. Một public inline function được khai báo ở trong một class chỉ có thể truy cập vào các public function và public field của class đó
3. Số lượng dòng code sẽ tăng lên. Việc inline một function dài, phức tạp nhiều lần sẽ được compiler sinh ra code tương ứng.

Phần nhận xét này mình xin phép được lấy nguyên văn từ [ngohado/Kotlin-Docs](https://github.com/ngohado/Kotlin-Docs/wiki/Inline-function#gi%E1%BB%9Bi-thi%E1%BB%87u) do sau một hồi tìm kiếm và tìm hiểu mình thấy nên giữ nguyên của tác giả này về nhận xét.

Mình xin kết thúc phần 1 của chương  [Diving Deeper into functions](https://viblo.asia/p/fadvanced-kotlin-programming-diving-deeper-into-functions-ORNZq9BrZ0n)  ở đây, rất vui khi nhận được góp ý của mọi người. Chúng ta sẽ tiếp tục phần 2 của  [Diving Deeper into functions](https://viblo.asia/p/fadvanced-kotlin-programming-diving-deeper-into-functions-ORNZq9BrZ0n) tại [Diving Deeper into functions(2)](https://viblo.asia/p/diving-deeper-into-functions-2-gGJ59Wm9ZX2). Cảm ơn sự theo dõi của bạn :D.

`Tài liệu tham khảo`

https://www.bilibili.com/video/av11038904/?p=5

https://github.com/ngohado/Kotlin-Docs/wiki/Inline-function#gi%E1%BB%9Bi-thi%E1%BB%87u

google.com