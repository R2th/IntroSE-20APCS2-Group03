Lập trình bất đồng bộ không phải là điều mới mẻ, và có thể nói là gần như không thể thiếu trong các ứng dụng ngày nay. Có nhiều cách tiếp cận vấn đề này và trong Kotlin, có lẽ ngày nay ta hay dùng Rx, tuy nhiên Kotlin đã cung cấp một cách rất linh hoạt ở cấp độ ngôn ngữ và giao hầu hết các chức năng cho các thư viện, phù hợp với triết lý của Kotlin, đó là Coroutines.

### Coroutines và Rx
Hiện nay, chúng ta hay dùng Rx cho các tác vụ bất đồng bộ, vậy nên sẽ có nhiều người khi mới bắt đầu tìm hiểu về Coroutines sẽ thường tự hỏi rằng: "Rx và Coroutines khác nhau như thế nào? Liệu Coroutines có thể thay thế hoàn toàn Rx?". Và với nhiều người hẳn cũng sẽ bối rối khi đứng trước lựa chọn: Rx hay Coroutines khi bắt đầu 1 dự án mới.

Về định nghĩa, Coroutines là "lightweight threads", chúng là những tác vụ mà các thread có thể xử lý, hay nói 1 cách khác, nhiệm vụ chính của Coroutines là xử lý tác vụ bất đồng bộ. Trong khi đó, Rx là "một thư viện để compose các tác vụ bất đồng bộ và event-based bằng cách sử dụng các chuỗi Observable". Từ đó, ta thấy việc xử lý bất đồng bộ chỉ là 1 trong những ứng dụng của Rx, mục đích chính của nó là giúp chương trình của bạn xử lý theo mô hình lập trình Reactive.

Từ định nghĩa đó, ta thấy rằng Coroutines và Rx làm 2 nhiệm vụ hoàn toàn khác nhau, vì vậy nên sẽ thật khập khiễng khi so sánh chúng với nhau, dù vậy ta vẫn có thể so sánh ở khía cạnh giống nhau của nó: Xử lý bất đồng bộ.

## Cơ bản về Coroutine 
Phần này bao gồm các khái niệm Coroutine cơ bản.

### Coroutine đầu tiên của bạn 
Hãy thử  mã sau:
```
import kotlinx.coroutines.*

fun main() {
    GlobalScope.launch { // launch a new coroutine in background and continue
        delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
        println("World!") // print after delay
    }
    println("Hello,") // main thread continues while coroutine is delayed
    Thread.sleep(2000L) // block main thread for 2 seconds to keep JVM alive
}
```

Bạn sẽ thấy kết quả sau:

`Hello, World!`
 
Về cơ bản, Coroutines là "lightweight threads". Chúng được khởi tạo bởi builder của Coroutine trong bối cảnh của một số CoroutineScope . Ở đây chúng ta đang dùng một Coroutine mới trong GlobalScope , có nghĩa là thời gian tồn tại của Coroutine mới chỉ bị giới hạn bởi thời gian tồn tại của toàn bộ ứng dụng.

Bạn có thể đạt được kết quả tương tự thay thế `GlobalScope.launch{ ... }` bằng `thread{ ... }` và `delay(...)` bằng `Thread.sleep(...)`.

Nếu bạn bắt đầu bằng cách thay thế GlobalScope.launch bằng thread , trình biên dịch sẽ tạo ra lỗi sau:

 `Error: Kotlin: Suspend functions are only allowed to be called from a coroutine or another suspend function`
Đó là bởi vì delay là một hàm suspending đặc biệt không chặn luồng, nhưng tạm ngưng Coroutine và nó chỉ có thể được sử dụng từ Coroutine.

Giờ thử với Rx xem sao nhé
```
addDisposable(Single.just("World!")
                .delay(1, TimeUnit.SECONDS)
                .subscribeOn(scheduler.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe { i -> println(i) }
                )
println("Hello,")
```
Hơi dài và nhiều việc hơn nhỉ ^_^

### Kết nối thế giới chặn và không chặn 
Ví dụ đầu tiên trộn hàm không chặn `delay(...)` và hàm chặn `Thread.sleep(...)` trong cùng một mã. Rất dễ để mất dấu vết của cái nào đang chặn và cái nào không. Hãy chỉ rõ về việc chặn sử dụng trình xây dựng Coroutine runBlocking :

```
import kotlinx.coroutines.*

fun main() { 
    GlobalScope.launch { // launch a new coroutine in background and continue
        delay(1000L)
        println("World!")
    }
    println("Hello,") // main thread continues here immediately
    runBlocking {     // but this expression blocks the main thread
        delay(2000L)  // ... while we delay for 2 seconds to keep JVM alive
    } 
}
```

Kết quả là như nhau, nhưng mã này chỉ sử dụng hàm không chặn `delay()`. Main thread gọi các khối runBlocking cho đến khi Coroutine bên trong runBlocking hoàn tất.

Ví dụ này cũng có thể được viết lại theo cách thành ngữ hơn, sử dụng runBlocking để bọc hàm main:

```
import kotlinx.coroutines.*

fun main() = runBlocking<Unit> { // start main coroutine
    GlobalScope.launch { // launch a new coroutine in background and continue
        delay(1000L)
        println("World!")
    }
    println("Hello,") // main coroutine continues here immediately
    delay(2000L)      // delaying for 2 seconds to keep JVM alive
}
```

Ở đây `runBlocking<Unit> { ... }` hoạt động như một bộ chuyển đổi được sử dụng để bắt đầu coroutine chính cấp cao nhất. Chúng ta chỉ định rõ ràng loại trả về Unit của nó, bởi vì một hàm main được xây dựng tốt trong Kotlin phải trả về Unit .

Đây cũng là một cách để viết các bài Unit Test cho các hàm suspending:

```
class MyTest {
    @Test
    fun testMySuspendingFunction() = runBlocking<Unit> {
        // here we can use suspending functions using any assertion style that we like
    }
}
```

### Chờ một tác vụ 
Trì hoãn một thời gian trong khi một Coroutine khác đang hoạt động không phải là một cách tiếp cận tốt. Chúng ta hãy chờ đợi một cách rõ ràng (theo cách không chặn) cho đến khi công việc dưới background mà chúng ta đã khởi chạy hoàn tất:

```
val job = GlobalScope.launch { // launch a new coroutine and keep a reference to its Job
    delay(1000L)
    println("World!")
}
println("Hello,")
job.join() // wait until child coroutine completes
```

Bây giờ kết quả vẫn như vậy, nhưng mã của Coroutine chính không bị bó buộc với thời gian của công việc dưới background theo bất kỳ cách nào. Tốt hơn nhiều.

### Cấu trúc đồng thời 
Vẫn còn một cái gì đó được mong muốn cho việc sử dụng thực tế của Coroutines. Khi chúng ta sử dụng GlobalScope.launch , chúng ta tạo ra một Coroutine cấp cao nhất. Mặc dù lightweight, nó vẫn tiêu tốn một số tài nguyên bộ nhớ trong khi chạy. Nếu chúng ta quên giữ một tham chiếu đến Coroutine mới ra mắt, nó vẫn chạy. Điều gì sẽ xảy ra nếu mã trong Coroutine bị treo (ví dụ: chúng ta delay quá lâu), nếu chúng ta tạo quá nhiều Coroutine và hết bộ nhớ thì sao? Phải giữ thủ công các tham chiếu cho tất cả các Coroutines đã khởi chạy và join chúng sẽ dễ bị lỗi.

Có một giải pháp tốt hơn. Chúng ta có thể sử dụng Cấu trúc đồng thời trong mã của chúng ta. Thay vì khởi chạy Coroutines trong GlobalScope , giống như chúng ta thường làm với các thread (thread luôn là global), chúng ta có thể khởi chạy Coroutines trong phạm vi cụ thể của hoạt động chúng ta đang thực hiện.

Trong ví dụ của chúng ta, chúng ta có hàm main được biến thành Coroutine bằng cách sử dụng `runBlocking`. Mỗi một builder của Coroutine, bao gồm runBlocking , thêm một thể hiện của CoroutineScope vào phạm vi của khối mã của nó. Chúng ta có thể khởi chạy Coroutines trong phạm vi này mà không cần phải join chúng một cách rõ ràng, bởi vì một Coroutine bên ngoài ( runBlocking trong ví dụ của chúng ta) không hoàn thành cho đến khi tất cả các coroutine được launch trong phạm vi của nó. Vì vậy, chúng ta có thể làm cho ví dụ của chúng ta đơn giản hơn:

```
import kotlinx.coroutines.*

fun main() = runBlocking { // this: CoroutineScope
    launch { // launch a new coroutine in the scope of runBlocking
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}
```

Còn tiếp...
Nguồn https://kotlinlang.org/docs/reference/coroutines/basics.html