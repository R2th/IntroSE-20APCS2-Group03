## Introduciton
Flow là một API mới của Kotlin Coroutine, với việc tập trung vào luồng dữ liệu cái phát ra các giá trị một cách tuần tự - Mục đích là tạo ra sự hỗ trợ ngược lại một cách dễ dàng và nhận được những công việc đúng.

Sau khi phát hành [kotlinx.coroutines 1.3.2](https://github.com/Kotlin/kotlinx.coroutines/releases/tag/1.3.2), có rất nhiều sự cường điệu đã được tạo ra đối với Kotlin Flow API. Đến giờ, trong bài viết này chúng ta sẽ bước đầu tiếp cận để có những cái nhìn tổng quan về Kotlin Flow API.
Vì Kotlin Flow là mới, cũng như chúng ta là những người mới nên bài viết sẽ tập trung vào việc chia sẻ kinh nghiệp một cách tốt nhất.

## Why we need Kotlin Flow
Một thứu mà tất cả những người lập trình viên lo lắng đó là mỗi khi chúng ta cần làm việc với các cấu trúc xử lý song song. Giả sử chúng ta đăng kí tới một reactive stream và giữ tham chiếu tới một đối tượng Subcription cái cần được quản lý một các cẩn thận nếu không chúng ta sẽ phải đối mặt với nguy cơ rò rỉ(leak) nó.

Giờ đây, với Kotlin Flow API công việc này gần như không phải là một sự lo lắng đối với những nhà phát triển. Bởi vì không tồn tại khái niệm đăng kí đối với những API này cũng như nó hoàn toàn rõ ràng cho quá trình hủy bỏ. Nó là quan trọng cho chúng ta nhằm hiểu rằng Flow API được xây dựng ở tầng cao nhất của quá trình gián đoạn(suspension) và nhẹ của coroutines cái rất khó bị leak.

Do đó, Flow API giống như Java8 Stream nhưng nó có những khác biệt lớn, chúng ta không cần lo lắng về việc leak nó, phù hợp với các hoạt động bất đồng bộ, quản lý ngược, và phù hợp với các luồng(streams) có hạn hoặc vô hạn.

## Flows
Để thể hiện một flow stream cái đang được tính toán bất đồng bộ, chúng ta có thể sử dụng một [flow builder](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/flow.html) giống như chúng ta sử dụng một [sequence builder](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/index.html) cho quá trình xử lý tuần tự.

```
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.delay
fun myFlow() = flow {  // 1
    emit("Ahsen") // 2
    emit("Saeed")
    delay(100)  // 3
    emit("Done")
}
fun main() = runBlocking<Unit> {
    myFlow().collect {  // 4
        println(it)
    }
}
```

Điều gì xảy ra đối với đoạn mã nguồn bên trên.

1. Một builder function để tạo flow.
2. Dữ liệu được phát ra từ flow sử dụng phương thức [emit](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow-collector/emit.html).
3. Chúng ta không cần đánh dấu function với từ khóa **suspend** bởi vì mã nguồn bên trong flow builder có thể được gián đoạn.
4. Các giá trị được thu thập bằng cách sử dụng phương thức [collect](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/collect.html).

Một điều chúng ta cần chỉ ra trong ví dụ bên trên đó là mã nguồn bên trong khối **flow{}** sẽ không được thực hiện trừ khi một ai đó gọi tới phương thức **collect** trên nó. Đó là bởi vì flow cũng tương tự như lazy trong xử lý tuần tự chúng chỉ thực thi khối khi một ai đó thực sự cần tới nó.

Như vậy, phương thức collect là hoạt động cuối cùng cái khởi động một tập hợp của flow trong phạm vi nhận được. Phương thức collect là cái cơ bản nhất, nhưng vẫn có những hoạt động khác xảy ra sau đó, cái chúng ta sẽ xem xét ở phần tiếp theo.

## Intermediate & teminal operator
Như đã đọc ở phần bên trên các hoạt động cuối cùng có sức mạnh khởi chạy quá trình phát ra dữ liệu của flow builder. Thực tế, có hai loại hoạt động sẵn có bên trong flow đó là intermediate(ở giữa) và terminal(sau cuối). Bạn có thể đọc thêm về các phương thức intermediate và terminal ở link này.

**Note**: Hoạt động chỉ giống như là một sự bổ sung cho Flow type.

Có rất nhiều phương thức được thêm vào trong flow type như map, filter, zip,.... Nếu bạn cần xem về tất cả các phương thức hãy kiểm tra trong link bên dưới:

https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/

## Writing a custom flow operator
Có sẵn rất nhiều các phương thức được thêm vào Flow type nhưng nếu bạn cần viết một phương thức cho riêng mình, bạn có thể triển khai giống như sau:

```
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.runBlocking
fun <T> Flow<T>.uppercase(): Flow<String> {
    return flow {
        collect {
            val value = it.toString().toUpperCase()
            emit(value)
        }
    }
}
val flowC = flowOf("ahsen", "saeed").uppercase()
fun main() = runBlocking<Unit> {
   flowC.collect {
       println(it)
   }
}
```

Bằng việc sử dụng phương thức **uppercase** chúng ta có thể thay đổi các chuỗi của mình thành chữ hoa và tất cả các chuỗi mới được thu thập thông qua lời gọi tới phương thức collect.

## Different types of flow builders
Flow builder cái mà chúng ta nhìn thấy trong phần flows là cái cơ bản nhất. Có các builders khác nhằm dễ dàng cho việc định nghĩa các flows trong kotlin.

* Cố định một thiết lập của các giá trị
```
val flowA = flowOf(1, 2, 3)
```

* Sự đa dạng của các collections và sequences có thể được chuyển đổi dễ dàng đối với Flow. Ví dụ:
```
val flowC = (1..5).asFlow()
```

## Concurrent flow using a buffer
Như đã đề cập lúc đầu hoạt động của flow là các giá trị được phát ra một các tuần tự. Nó có nghĩa là như thế nào?

Giả sử nếu bạn có một nguồn phát(emitter) và một nguồn thu(collector) cái đơn giản phát ra và thu thập các giá trị phù hợp. Mặc định, cả nguồn phát và nguồn thu chia sẻ cùng một phạm vi do đó toàn bộ hoạt động được thực thi trong một coroutine độc lập.

Để tăng cường khả năng xử lý và tách rời nguồn phát(emitter) và nguồn thu(collector) - chạy emitter trong một coroutine riêng và collector trong một coroutine riêng, như vậy chúng có thể được thực thi song song. Đối với điều này,c húng ta có thể sử dụng phương thức **buffer** trên các flows cái thực hiện mã nguồn của mình một cách song song và nhận lại quá trình thực thi mới tốc độ mong đợi.

Bạn có thể xem thêm bài viết của **Roman Alizarov** về quá trình xử lý song song với coroutines khi làm việc với flow. Xem ở [link này](https://medium.com/@elizarov/kotlin-flows-and-coroutines-256260fb3bdb).

## Flow Cancellation
Đến đây, nếu bạn nhớ rằng ở đầu bài viết, chúng ta có đề cập tới quá trình hủy flow là rõ ràng, mình bạch. Nhưng như thường lệ, giống coroutines, một flow có thể bị hủy trong một suspending function.

```
fun main() = runBlocking {
    val job = launch {
        flow.collect {
            println("Got item -> $it")
        }
    }
    delay(400)
    job.cancel()
    println("Done")
}
val flow = flow {
    for (i in 1..10) {
        delay(100)
        emit(i)
    }
}
//  Output
Got item -> 1
Got item -> 2
Got item -> 3
Done
```

## Another way to apply concurrency with flowOn operator
Một cách thức khác nhằm thay đổi quá trình phát ra dữ liệu của flow là sử dụng phương thức [**flowOn**](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/flow-on.html). Nó đơn giản tạo ra một coroutine khác cho flow ban đầu. Hãy xem ví dụ sau để hiểu hơn về những gì chúng ta đang đề cập.

```
import kotlinx.coroutines.delay
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.runBlocking
import kotlin.coroutines.coroutineContext
val flowA = flow {
   println("Emitting coroutine -> $coroutineContext")  
   emit("Ahsen")
   emit("Saeed")
   delay(100)
   emit("Done")
}.flowOn(Dispatchers.IO) // The above stream will run in io dispatcher
fun main() = runBlocking {
    flowA.collect {
       println("Collecting coroutine -> $coroutineContext and value $it")
    }
}
```

Chú ý tới **flow{}** hoạt động trong **coroutine#2** và quá trình phát ra dữ liệu ở **coroutine#1** cái đang được thực thi trên một luồng song song với coroutine thu thập(collecting coroutine).

**Note**: Các phương thức **buffer** và **flowOn** là những thứ khác nhau. **buffer** thực sự được chạy trong một coroutine khác nhưng không bao giờ đòi hỏi một dispatcher bạn muốn mã nguồn của mình được thực thi ở đó, trong khi **flowOn** lại đòi hỏi một cái dispatcher cụ thể cho nó.

## When to user Channels and Kotlin Flow APIs.
**Channels** sẽ được sử dụng cho hot streams, bên trong một số phương thức của Flow, quá trình giao tiếp giữa các coroutines, và lắng nghe dữ liệu từ các sockets. Trong khi Flow API sẽ được sử dụng chủ yếu để xử lý các stream bất đồng bộ cho dữ liệu.

## Third-party library integration
Bản phát hành hiện tại **room persistence 2.2.0** đã thêm vào sự hỗ trợ cho kotlin flow API. Chúng ta có thể trả về **Flow&lt;T&gt;** trong các phương thức của [DAO](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=2ahUKEwjiiNePiKzlAhUrAWMBHQ6bAbgQFjAAegQIABAB&url=https%3A%2F%2Fdeveloper.android.com%2Freference%2Fandroid%2Farch%2Fpersistence%2Froom%2FDao&usg=AOvVaw1GknK-H4v7f5jKbP7yrgfZ).
Bài viết này được viết dựa trên những thay đổi của thư viện room persistence 2.2.0 do đó các bạn có thể xem thêm chi tiết ở link bên dưới:

**[Exploring Android Room Persistence 2.2.0 Library Changes](https://www.mdeditor.tw/jump/aHR0cHM6Ly9haHNlbnNhZWVkLmNvbS9hbmRyb2lkLXJvb20tcGVyc2lzdGVuY2UtbGlicmFyeS1jaGFuZ2VzLw==)**.

## Source
https://www.mdeditor.tw/pl/ppJx

## Reference

* https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/

* [**Kotlin Flows and Coroutines**](https://medium.com/@elizarov/kotlin-flows-and-coroutines-256260fb3bdb)

* [ **Exploring Android Room Persistence 2.2.0 library changes**](https://ahsensaeed.com/android-room-persistence-library-changes/).

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))