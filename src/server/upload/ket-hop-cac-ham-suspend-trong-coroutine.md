## Kết hợp các hàm suspend
Phần này bao gồm các cách tiếp cận khác nhau để kết hớp các hàm suspend.

### Mặc định là tuần tự
Giả sử rằng chúng ta có hai hàm suspend được định nghĩa ở đâu đó, thực hiện một số việc hữu ích như call api hoặc tính toán. Chúng ta chỉ giả vờ rằng chúng hữu ích, nhưng thực ra mỗi hàm chỉ delay trong một giây cho mục đích của ví dụ này:

```
suspend fun doSomethingUsefulOne(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```
Chúng ta phải làm gì nếu chúng ta cần gọi chúng một cách tuần tự - trước tiên *doSomethingUsefulOne* và sau đó là *doSomethingUsefulTwo* , và tính tổng kết quả của chúng? Trong thực tế, chúng ta làm điều này nếu chúng ta đợi kết quả của hàm thứ nhất để đưa ra quyết định về việc chúng ta cần gọi hàm thứ hai hay quyết định cách gọi hàm đó.

Chúng ta sử dụng một lệnh gọi tuần tự như bình thường, bởi vì mã trong coroutine, giống như trong mã thông thường, chạy tuần tự theo mặc định. Ví dụ sau đây chứng minh điều đó bằng cách đo tổng thời gian cần thiết để thực hiện cả hai hàm suspend:

```
val time = measureTimeMillis {
    val one = doSomethingUsefulOne()
    val two = doSomethingUsefulTwo()
    println("The answer is ${one + two}")
}
println("Completed in $time ms")
```

Output sẽ như này:

```
The answer is 42
Completed in 2017 ms
```
Ta thấy tổng thời gian chạy = tổng thời gian delay của 2 hàm (1000 + 1000)

### Chạy đồng thời sử dụng async
Điều gì xảy ra nếu không có sự phụ thuộc giữa các hàm *doSomethingUsefulOne* và *doSomethingUsefulTwo* và chúng ta muốn nhận được câu trả lời nhanh hơn, bằng cách thực hiện đồng thời ? Đây là nơi ta dùng đến *async*.

Về mặt khái niệm, *async* giống như *launch* . Nó khởi tạo một coroutine riêng biệt là một light-weight thread chạy đồng thời với tất cả các coroutine khác. Sự khác biệt là *launch* trả về một job và không mang theo bất kỳ giá trị kết quả, trong khi async trả về một *Deferred* - một light-weight non-blocking future, đại diện cho một lời hứa để cung cấp một kết quả sau đó. Bạn có thể sử dụng *.await()* trên một *Deferred* để có được kết quả cuối cùng của nó, nhưng *Deferred* cũng là một *Job*, vì vậy bạn có thể hủy nó nếu cần.

```
val time = measureTimeMillis {
    val one = async { doSomethingUsefulOne() }
    val two = async { doSomethingUsefulTwo() }
    println("The answer is ${one.await() + two.await()}")
}
println("Completed in $time ms")
```

Output là một cái gì đó như thế này:

```
The answer is 42
Completed in 1017 ms
```

Thời gian xử lý lần này nhanh gấp đôi, bởi vì hai coroutine thực hiện đồng thời.

### Async khởi chạy lazy
Async có thể được khởi chạy lazy bằng cách đặt tham số start của nó thành *CoroutineStart.LAZY* . Trong chế độ này nó chỉ bắt đầu coroutine khi kết quả của nó được yêu cầu bởi *await*, hoặc nếu nó hàm *start* của Job được gọi. Chạy ví dụ sau:

```
val time = measureTimeMillis {
    val one = async(start = CoroutineStart.LAZY) { doSomethingUsefulOne() }
    val two = async(start = CoroutineStart.LAZY) { doSomethingUsefulTwo() }
    // some computation
    one.start() // start the first one
    two.start() // start the second one
    println("The answer is ${one.await() + two.await()}")
}
println("Completed in $time ms")
```

Output sẽ như thế này:

```
The answer is 42
Completed in 1017 ms
```
Vậy là, ở đây hai coroutines được định nghĩa nhưng không được thực thi như trong ví dụ trước, nhưng quyền điều khiển được trao cho người lập trình khi nào sẽ bắt đầu thực hiện bằng cách gọi start . Chúng ta đầu tiên bắt đầu one, sau đó bắt đầu two, và sau đó chờ đợi các coroutines cá nhân kết thúc.

Lưu ý rằng nếu chúng ta chỉ gọi *await* trong *println* mà không gọi *start* trước đó trên các coroutine riêng lẻ, điều này sẽ dẫn đến việc chạy tuần tự, bởi vì *await* bắt đầu thực thi coroutine và chờ kết thúc, đó không phải là trường hợp sử dụng dự định cho lazy. Use-case của *async(start = CoroutineStart.LAZY)* là sự thay thế cho hàm lazy thông thường trong các trường hợp khi tính toán giá trị liên quan đến các hàm suspend.

### Các hàm kiểu Async
Chúng ta có thể định nghĩa các hàm kiểu *async* gọi *doSomethingUsefulOne* và *doSomethingUsefulTwo* không đồng bộ bằng cách sử dụng trình tạo coroutine async với tham chiếu GlobalScope rõ ràng . Chúng ta đặt tên các hàm như vậy với hậu tố  "…Async" để làm nổi bật thực tế là chúng chỉ bắt đầu tính toán không đồng bộ và người ta cần sử dụng giá trị hoãn lại kết quả để có kết quả.

```
// The result type of somethingUsefulOneAsync is Deferred<Int>
fun somethingUsefulOneAsync() = GlobalScope.async {
    doSomethingUsefulOne()
}

// The result type of somethingUsefulTwoAsync is Deferred<Int>
fun somethingUsefulTwoAsync() = GlobalScope.async {
    doSomethingUsefulTwo()
}
```
Lưu ý rằng các hàm xxxAsync này không phải là hàm suspend. Chúng có thể được sử dụng từ bất cứ đâu. Tuy nhiên, việc sử dụng chúng luôn bao hàm việc thực thi không đồng bộ (ở đây có nghĩa là đồng thời ) thực thi hành động của chúng với mã gọi.

Ví dụ sau đây cho thấy việc sử dụng chúng bên ngoài coroutine:
```
// note that we don't have `runBlocking` to the right of `main` in this example
fun main() {
    val time = measureTimeMillis {
        // we can initiate async actions outside of a coroutine
        val one = somethingUsefulOneAsync()
        val two = somethingUsefulTwoAsync()
        // but waiting for a result must involve either suspending or blocking.
        // here we use `runBlocking { ... }` to block the main thread while waiting for the result
        runBlocking {
            println("The answer is ${one.await() + two.await()}")
        }
    }
    println("Completed in $time ms")
}
```
Kết quả
```
The answer is 42
Completed in 1117 ms
```
> Kiểu lập trình này với các hàm async được cung cấp ở đây chỉ để minh họa, bởi vì nó là kiểu phổ biến trong các ngôn ngữ lập trình khác. Sử dụng phong cách này với các coroutines Kotlin không được khuyến khích vì những lý do được giải thích dưới đây.

Xem xét những gì xảy ra nếu giữa `val one = somethingUsefulOneAsync()`  và `one.await()` có một số dòng code với lỗi logic trong mã và chương trình ném ra một ngoại lệ và thao tác được thực hiện bởi chương trình hủy bỏ. Thông thường, một trình xử lý lỗi global có thể bắt ngoại lệ này, ghi nhật ký và báo cáo lỗi cho các developer, nhưng chương trình có thể tiếp tục thực hiện các hoạt động khác. Nhưng ở đây, chúng ta có hàm *somethingUsefulOneAsync* vẫn đang chạy dưới background, mặc dù thao tác khởi tạo nó đã bị hủy bỏ. Vấn đề này không xảy ra với xử lý đồng thời được cấu trúc tốt, như được hiển thị trong phần bên dưới.

### Cấu trúc đồng thời với async
Chúng ta hãy đem ví dụ ở phần **Chạy đồng thời sử dụng async** và extract một hàm mà thực hiện đồng thời *doSomethingUsefulOne* và *doSomethingUsefulTwo* và trả về tổng của kết quả của họ. Vì trình xây dựng async coroutine được định nghĩa là một phần mở rộng trên CoroutineScope , chúng ta cần có nó trong phạm vi và đó là những gì mà hàm coroutineScope cung cấp:

```
suspend fun concurrentSum(): Int = coroutineScope {
    val one = async { doSomethingUsefulOne() }
    val two = async { doSomethingUsefulTwo() }
    one.await() + two.await()
}
```
Theo cách này, nếu có lỗi xảy ra bên trong mã của hàm *concurrentSum* và nó ném ra một ngoại lệ, tất cả các coroutine được launch trong phạm vi của nó sẽ bị hủy.

```
val time = measureTimeMillis {
    println("The answer is ${concurrentSum()}")
}
println("Completed in $time ms")
```

Chúng ta vẫn thực hiện đồng thời cả hai hoạt động, hiển nhiên từ đầu ra của hàm main sẽ là:

```
The answer is 42
Completed in 1017 ms
```

Việc hủy bỏ luôn được truyền thông qua hệ thống phân cấp coroutines:
```
import kotlinx.coroutines.*

fun main() = runBlocking<Unit> {
    try {
        failedConcurrentSum()
    } catch(e: ArithmeticException) {
        println("Computation failed with ArithmeticException")
    }
}

suspend fun failedConcurrentSum(): Int = coroutineScope {
    val one = async<Int> { 
        try {
            delay(Long.MAX_VALUE) // Emulates very long computation
            42
        } finally {
            println("First child was cancelled")
        }
    }
    val two = async<Int> { 
        println("Second child throws an exception")
        throw ArithmeticException()
    }
    one.await() + two.await()
}
```

Lưu ý cách cả *async* và parent đang await của nó bị hủy bỏ  khi một trong những async thất bại (cụ thể là *two*):

```
Second child throws an exception
First child was cancelled
Computation failed with ArithmeticException
```

Nguồn https://kotlinlang.org/docs/reference/coroutines/composing-suspending-functions.html