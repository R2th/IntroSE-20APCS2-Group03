Bài tutorial này sẽ hướng dẫn các bạn setup một project cho phép sử dụng coroutine và một đoạn code nho nhỏ minh họa cách sử dụng nó.

Trong phiên bản 1.1 thì Kotlin đã giới thiệu coroutine, một cách thức mới để viết code bất đồng bộ, non-blocking (và nhiều hơn thế nữa). Trong bài tutorial này thì chúng ta sẽ đi qua các cách sử dụng coroutine cơ bản với sự trợ giúp của thư viện `kotlin.coroutine`, đây là thư viện tập hợp các lớp helpers và wrappers cho các thư viện Java hiện tại.

## Khởi tạo project

Trong bài tut mình sẽ sử dụng IntelliJ IDEA, một IDE khá thịnh hành của JetBrains - cũng chính là cha đẻ của Kotlin. Đây là một IDE yêu thích của mình, những ai muốn trải nghiệm thử thì có thể tải bản miễn phí là Community tại đây: https://www.jetbrains.com/idea/download/

### Với project sử dụng Gradle

Trong IntelliJ IDEA vào *File -> New -> Project*:

![](https://images.viblo.asia/cb71918a-8b2b-4107-8b06-c65982a7c9fb.png)

Sau khi tạo xong project mới thì chúng ta sẽ có một file `build.gradle` được cấu hình sẵn cho việc sử dụng Kotlin được tạo ra. Do chúng ta sẽ sử dụng coroutine nên hãy chắc chắn rằng nó được cấu hình cho Kotlin 1.1 hoặc cao hơn.

Do coroutine vẫn đang ở chế độ thử nghiệm trong Kotlin 1.1, 1.2 nên mặc định trình biên dịch sẽ đưa ra cảnh báo cho mỗi lần nó được sử dụng. Nếu chúng ta muốn sử dụng bản thử nghiệm này và loại bỏ cảnh báo thì sẽ phải thêm các dòng này vào `build.gralde`:  

```
apply plugin: 'kotlin'

kotlin {
    experimental {
        coroutines 'enables'
    }
}
```

Chúng ta sẽ sủ dụng `kotlin.coroutines` nên hãy nhớ cho nó vào `dependencies`, phiên bản mới nhất nhé:

```
dependencies {
    ...
    compile "org.jetbrains.kotlinx:kotlinx-coroutines-core:0.21"
}
```

Thư viện này được published trên Bintray JCenter nên chúng ta phải thêm nó vào `repositories`:

```
repositories {
    jcenter()
}
```

Và bây giờ chúng ta đã sẵn sàng để viết code ở `src/main/kotlin`

## My first coroutine

Chúng ta có thể coi coroutine như là một light-weight thread. Cũng tương tự như thread thông thường thì coroutine có thể chạy song song hoặc chờ và giao tiếp với nhau. Một khác biệt lớn của coroutine so với thread là chi phí về mặt performance của nó rất rẻ mạt: Chúng ta có thể tạo hàng nghìn coroutine nhưng tác động của nó lên performance là rất thấp. Mặt khác thì các thread thông thường có chi phí về mặt performance rất đắt đỏ ở khâu start và duy trì chúng. Một nghìn thread sẽ là một thách thức không hề nhỏ kể cả đối với chiếc máy tính đời mới nhất.

Để start một coroutine thì chúng ta sẽ dùng hàm `launch{}`

```kotlin
launch {
	...
}
```

Hàm này sẽ start một coroutine mới. Mặc định thì các coroutine sẽ chạy trên một thread pool được chia sẻ. Threads vẫn tồn tại trong các chương trình sử dụng coroutine. Nhưng do 1 thread có thể chạy được nhiều coroutine nên việc tạo nhiều thread giờ đây sẽ là không cần thiết.

Hãy cùng xem qua một đoạn code sử dụng `launch`:

```kotlin
import kotlinx.coroutines.experimental.*

fun main(args: Array<String>) {
    println("Start")

    // Start a coroutine
    launch {
        delay(1000)
        println("Hello")
    }

    Thread.sleep(2000) // wait for 2 seconds
    println("Stop")
}
```

Ở đây thì chúng ta sẽ start một coroutine. Coroutine này sẽ chờ 1 giây và in ra dòng `Hello`.

Hàm `delay` ở đây tương tự như  `Thread.sleep()` nhưng có ưu điểm sau: nó không block thread chạy nó mà chỉ tạm dừng coroutine gọi nó, thread được trả về pool trong khi coroutine vẫn đang chờ. Sau khi việc chờ đợi kết thúc thì coroutine sẽ được tiếp tục trên trên một thread đang rảnh trong pool.

Thread chính (là thread chạy hàm `main()`) sẽ phải chờ cho đến khi coroutine kết thúc, nếu không thì chương trình sẽ kết thúc trước khi dòng `Hello` được in ra. Không tin thì các bạn thử bỏ dòng `Thread.sleep(2000)`xem :D.

Nếu chúng ta sử dụng hàm `delay()` trực tiếp trong `main()` thì chúng ta sẽ gặp lỗi compile:

```
Suspend functions are only allowed to be called from a coroutine or another suspend function
```

Lý do gặp phải lỗi trên là do hàm đấy không được gọi trong coroutine. Chúng ta có thể sử dụng `delay` nếu chúng ta wrap nó vào trong `runBlocking {}` do làm vậy sẽ start một coroutine:

```kotlin
runBlocking {
  delay(2000)
}
```

Vậy là ban đầu chương trình sẽ in dòng `Start`, sau đấy sẽ chạy coroutine thông qua `launch {}`, tiếp đó là chạy thêm một coroutine nữa thông qua `runBlocking {}` và sẽ block main thread cho đến hết thời gian delay, cuối cùng là in ra dòng `Stop`. Trong lúc đó thì coroutine đầu tiên đã kết thúc và đã in ra dong `Hello` rồi. Các bạn thấy không, coroutine chẳng khác gì thread :).

## Let's run a lot of them

Bây giờ thì mình sẽ chứng minh cho các bạn thấy là coroutines thật sự rất "rẻ" so với thread khi nói về chi phí performance. Hay là thử start một triệu thứ mỗi cái xem thế nào nhể? Chúng ta sẽ bắt đầu với thread trước:

```kotlin
val c = AtomicInteger()

for (i in 1..1_000_000)
    thread(start = true) {
        c.addAndGet(i)
    }

println(c.get())
```

Đoạn code này sẽ chạy 1.000.000 thread và mỗi thread sẽ cộng thêm giá trị vào biến c. Con máy cùi mía của mình ở công ty chạy phải mất hơn phút mới in ra kết quả :v.

Và đây là đoạn code thử nghiệm với coroutines:

```kotlin
val c = AtomicInteger()

for (i in 1..1_000_000)
    launch {
        c.addAndGet(i)
    }

println(c.get())
```

Đoạn code này trên máy mình chỉ chạy trong chưa đầy vài giây, nhưng mỗi lần chạy nó lại in ra một số khác nhau. Lý do là bởi một số coroutine chưa kết thúc trước khi hàm `main()` in ra kết quả. Hãy cùng sửa nó nào.

Chúng ta có thể sử dụng một số cách thức đồng bộ áp dụng cho thread (ví dụ như `CountDownLatch`). Tuy nhiên chúng ta sẽ giải quyết nó theo cách khác an toàn hơn.

## Async: trả về một giá trị trong coroutine

Có một cách khác để start một coroutine là sử dụng hàm `async{}`. Nó tương tự như `launch{}` nhưng sẽ trả về một instance của `Deffered<T>`, instance này sẽ có hàm `await()` trả về kết quả của coroutine.

Giờ chúng ta sẽ tạo lại một triệu coroutine một lần nữa, lưu lại đối tượng `Deffered`.   Biến `c` sẽ không cần thiết nữa bởi chúng ta có thể return trực tiếp giá trị từ coroutine:

```kotlin
val deferred = (1..1_000_000).map { n ->
    async {
        n
    }
}
```

Sau khi mọi thứ đã bắt đầu thì chúng ta chỉ việc thu thập kết quả:

```kotlin
val sum = deferred.sumBy { it.await() }
```

Ở đây thì chúng ta đang gom toàn bộ các coroutine và chờ giá trị return của chúng, sau đó thì tất cả các kết quả được cộng lại với nhau bởi hàm `sumBy()`. Ý tưởng là vậy nhưng khi kiểm tra chúng ta sẽ thấy trình biên dịch báo lỗi như sau:

```
Suspend functions are only allowed to be called from a coroutine or another suspend function
```

Lý do là bởi `await()` không thể được gọi từ bên ngoài coroutine bởi nó sẽ cần được suspend cho đến khi việc tính toán xong xuôi. Và chỉ có coroutine mới có thể suspend theo kiểu non-blocking. Do vậy nên chúng ta sẽ bỏ nó vào một coroutine:

```kotlin
runBlocking {
    val sum = deferred.sumBy { it.await() }
    println("Sum: $sum")
}
```

 Và giờ thì chúng ta đã có kết quả chính xác là `1784293664`, đây là kết quả có được sau khi tất cả cấc coroutine đã hoàn thành.

Để kiểm tra xem các coroutine liệu có thực sự chạy song song hay không thì chúng ta có thể thêm 1 giây `delay()` cho mỗi `async()`. Nếu chúng chạy tuần tự thi chương trình sẽ in ra kết quả sau 1.000.000 giây =)) (hơn 11,5 ngày):

```kotlin
val deferred = (1..1_000_000).map { n ->
    async {
        delay(1000)
        n
    }
}
```

Chạy lại đoạn code mới thì con máy cùi mía của mình mất khoảng hơn 10 giây tẹo. Vậy là rõ rồi nhé :D

### Suspending functions

Giả sử chúng ta muốn tách đoạn code trong hàm async thành một hàm riêng `workload` như sau:

```kotlin
fun workload(n: Int): Int {
    delay(1000)
    return n
}
```

Thì đập vào mắt chúng ta lại là hình bóng thân thuộc:

```
Suspend functions are only allowed to be called from a coroutine or another suspend function
```

Hãy cùng tìm hiểu chút xem chuyện gì đang xảy ra. Ưu điểm lớn nhất của coroutines là chúng có thể ***suspend*** mà không block thread chạy nó. Trình biên dịch sẽ phải sinh ra đoạn code đặc biệt để có thể làm được điều này. Do vậy nên chúng ta sẽ phải đánh dấu hàm có thể suspend cho trình biên dịch biết được. Ở đây chúng ta sẽ sử dụng modifier `suspend`:

```kotlin
suspend fun workload(n: Int): Int {
    delay(1000)
    return n
}
```

Và đây là đoạn code `async` của chúng ta:

```kotlin
async {
    workload(n)
}
```

Mình xin lưu ý lại là hàm `workload()` có thể được gọi từ coroutine (hoặc từ một hàm suspend nào đấy) nhưng không thể được gọi từ bên ngoài coroutine. Hàm `delay()` và `await()` mà chúng ta dùng tự bản thân chúng đã được khai báo là `suspend` nên chúng ta bắt buộc sẽ phải bỏ chúng vào trong `runBlocking()`, `launch()` hoặc `async()`.

Mình hi vọng bây giờ các bạn đã có cái nhìn rõ ràng hơn về coroutine trong Kotlin. Hẹn gặp lại các bạn trong những bài viết khác về Kotlin ;D.



Nguồn tham khảo: https://kotlinlang.org/docs/tutorials/coroutines-basic-jvm.html