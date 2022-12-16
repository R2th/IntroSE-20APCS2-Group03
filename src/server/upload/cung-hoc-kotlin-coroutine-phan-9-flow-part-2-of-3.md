# 1. Toán tử trong Flow
Nếu bạn chưa biết `Flow` là gì, bạn có thể tham khảo phần 1 của bài viết này [tại đây](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-2-bWrZnx695xw). Bài viết này, mình sẽ tập trung khai thác sức mạnh thật sự của `Flow`, đó là các toán tử (operators). Thời điểm viết bài này, mình đang sử dụng `kotlin coroutine version 1.3.3`. Vậy các bạn cần update tối thiểu đến version này để đảm bảo có đầy đủ các toán tử trong bài viết này.

## Toán tử `take()`
Sử dụng toán tử `take()` nếu bạn muốn nguồn thu lấy một lượng giới hạn các phần tử được phát ra từ nguồn phát. Ví dụ:
```kotlin
fun numbers(): Flow<Int> = flow {
    try {
        emit(1)
        emit(2)
        println("This line will not execute")
        emit(3)
    } catch (e: CancellationException) {
        println("exception")
    } finally {
        println("close resource here")
    }
}

fun main() = runBlocking {
    numbers()
        .take(2) // take only the first two
        .collect { value -> println(value) }
}
```

Output:
```
1
2
exception
close resource here
```
Đoạn code trên mình chỉ lấy 2 phần tử từ nguồn phát bằng hàm `take(2)` nên sau khi nguồn phát `emit` được 2 phần tử đầu, nó lập tức `throw CancellationException`. Vì vậy câu `This line will not execute` và phần tử `3` không được in ra. Mặc dù vậy, code trong khối `finally` vẫn được thực thi, tính năng này rất cần thiết khi bạn muốn close resource.
## Toán tử `transform()`
Toán tử này được dùng để biến đổi giá trị được phát ra từ nguồn phát trước khi `emit` cho nguồn thu nhận nó. Ngoài công dụng chính là để biến đổi phần tử, nó còn có các công dụng khác như nguồn thu có thể bỏ qua (skip) các giá trị mà nó không muốn nhận từ nguồn phát hoặc chúng ta có thể `emit` một giá trị nhiều hơn một lần (có nghĩa là phát 10 giá trị nhưng nhận có thể tới 20 giá trị). Ví dụ dưới đây mình có một nguồn phát có nhiệm vụ phát ra data từ số `1` đến số `9` và mong muốn của mình là nguồn thu bỏ qua các giá trị lẻ, và đối với giá trị chẵn thì biến đổi chúng thành các lũy thừa bậc 2, bậc 3 của chính nó. 
```kotlin
fun main() = runBlocking {
    (1..9).asFlow() // a flow of requests
        .transform { value ->
            if (value % 2 == 0) { // Emit only even values, but twice
                emit(value * value)
                emit(value * value * value)
            } // Do nothing if odd
        }
        .collect { response -> println(response) }
}
```
Output:
```
4
8
16
64
36
216
64
512
```
Vậy với 4 giá trị chẵn (`2`, `4`, `6`, `8`), mỗi giá trị chẵn mình `emit` 2 lần nên nguồn thu sẽ nhận được tới 8 giá trị như output.
## Toán tử `map()`
```kotlin
/**
 * Returns a flow containing the results of applying the given [transformer] function to each value of the original flow.
 */
@FlowPreview
public fun <T, R> Flow<T>.map(transformer: suspend (value: T) -> R): Flow<R> = transform { value -> emit(transformer(value)) }
```
Đoạn code toán tử `map` được trích dẫn từ thư viện `Kotlin Coroutine`. Nhìn code trên cũng có thể thấy được toán tử `map` có quan hệ với toán tử `transform`. Vậy công dụng chính của nó cũng là để biến đổi phần tử nhận được như toán tử `transform` nhưng khác ở chỗ: toán tử `transform` cho phép ta skip phần tử hoặc `emit` một phần tử nhiều lần còn toán tử `map` thì không thể skip hay emit multiple times. Với mỗi phần tử nhận được từ nguồn phát, nguồn thu sẽ xử lý biến đổi và `emit` một và chỉ một giá trị cho nguồn thu (tức là phát 1 thì thu 1, phát 10 thì thu 10).

`nguồn phát -> toán tử map biến đổi giá trị -> nguồn thu`

```kotlin
fun main() = runBlocking {
    (1..3).asFlow()
        .map { it * it } // squares of numbers from 1 to 5
        .collect { println(it) }
}
```
Output:
```
1
4
9
```
Ví dụ code trên mình phát ra 3 giá trị, nguồn thu sẽ nhận được đúng 3 giá trị sau khi được biến đổi từ toán tử `map`
## Toán tử `filter()`
Toán tử này giúp chúng ta filter lọc ra các giá trị thỏa mãn điều kiện và bỏ qua các giá trị không thỏa mãn điều kiện từ nguồn phát. Ví dụ mình muốn lọc ra các giá trị chẵn:
```kotlin
fun main() = runBlocking {
    (1..5).asFlow()
        .filter {
            println("Filter $it")
            it % 2 == 0
        }.collect {
            println("Collect $it")
        }
}
```
Output:
```
Filter 1
Filter 2
Collect 2
Filter 3
Filter 4
Collect 4
Filter 5
```
Dựa vào output chúng ta có thể thấy có 5 phần tử từ `flow` chạy vào hàm `filter` nhưng chỉ có 2 phần tử được `collect` là `2` và `4`.

Ở đây chúng ta thấy công dụng lọc này giống với công dụng của hàm `transform`. Đúng vậy, hàm `filter` thực chất cũng sử dụng hàm `transform` nên hàm `transform` cũng có thể lọc phần tử y hệt hàm `filter`.
```kotlin
/**
 * Returns a flow containing only values of the original flow that matches the given [predicate].
 */
public inline fun <T> Flow<T>.filter(crossinline predicate: suspend (T) -> Boolean): Flow<T> = transform { value ->
    if (predicate(value)) return@transform emit(value)
}
```
## Toán tử `onEach()`
Toán tử này dùng khi ta muốn thực hiện một action gì đó trước khi value từ `flow` được `emit`.
```kotlin
/**
 * Returns a flow which performs the given [action] on each value of the original flow.
 */
public fun <T> Flow<T>.onEach(action: suspend (T) -> Unit): Flow<T> = transform { value ->
    action(value)
    return@transform emit(value)
}
```
Ví dụ mình muốn mỗi phần tử bị `delay` `3s` trước khi được `emit` ra.
```kotlin
fun main() = runBlocking {
    val nums = (1..3).asFlow().onEach { delay(3000) } // numbers 1..3 every 300 ms
    val startTime = System.currentTimeMillis()
    nums.collect { value ->
            println("$value at ${System.currentTimeMillis() - startTime} ms from start")
        }
}
```
Output:
```
1 at 3006 ms from start
2 at 6008 ms from start
3 at 9009 ms from start
```
Dựa vào output có thể thấy mỗi phần tử bị `delay` `3s` trước khi được `emit` ra.
## Toán tử `reduce()`
Hàm `reduce` cực hữu ích khi chúng ta cần tính tổng cộng dồn tất cả giá trị được phát ra từ nguồn phát. Ví dụ: 
```kotlin
fun main() = runBlocking {
    val sum = (1..3).asFlow()
        .map { it * it } // squares of numbers from 1 to 5
        .reduce { a, b -> a + b } // sum them
    println(sum)
}
```
Output:
```
14
```
Đoạn code trên mình phát 3 giá trị là `1`, `2`, `3`. Sau đó qua hàm `map` để bình phương giá trị đó lên thành `1`, `4`, `9`. Sau đó hàm `reduce` sẽ cộng dồn 3 giá trị này lại `1 + 4 + 9 = 14` và mình in cái tổng này ra như output.

Mổ xẻ ra xem toán tử `reduce` có gì trong đó. 
```kotlin
/**
 * Accumulates value starting with the first element and applying [operation] to current accumulator value and each element.
 * Throws [UnsupportedOperationException] if flow was empty.
 */
@FlowPreview
public suspend fun <S, T : S> Flow<T>.reduce(operation: suspend (accumulator: S, value: T) -> S): S
```
Đầu tiên dễ thấy hàm `reduce` không trả về `Flow` nên chúng ta không cần `collect`. Nó chỉ trả về đúng 1 giá trị sau khi cộng dồn tất cả giá trị từ nguồn phát. Chúng ta sẽ chạy thử 1 đoạn code nữa để xem cách nó hoạt động thế nào:
```kotlin
fun main() = runBlocking {
    val sum = listOf("a", "b", "c", "d", "e").asFlow()
        .reduce { a, b ->
            println("Tổng đã tích lũy: $a")
            println("Giá trị mới: $b")
            a + b }
    println("Kết quả = $sum")
}
```
Output:
```
Tổng đã tích lũy: a
Giá trị mới: b
Tổng đã tích lũy: ab
Giá trị mới: c
Tổng đã tích lũy: abc
Giá trị mới: d
Tổng đã tích lũy: abcd
Giá trị mới: e
Kết quả = abcde
```
Mình đã in ra 2 param `a` và `b` trong biểu thức lambda của hàm `reduce`. Nhìn vào output: dễ dàng thấy `a` chính là tổng tất cả giá trị đã tích lũy tính đến thời điểm nhận giá trị mới là `b`. Và nó tiếp tục cộng `b` vào và chạy tiếp cho đến khi hết giá trị.
## Toán tử `fold()`
Toán tử này khá giống toán tử reduce(). Nó cũng có chức năng chính là tính tổng, tuy nhiên nó khác ở chỗ hàm reduce tính tổng từ con số 0 còn hàm fold tính tổng từ một giá trị được cho trước.
```kotlin
fun main() = runBlocking {
    val sum = (1..3).asFlow()
        .fold(initial = 10) { a, b -> // mình cho giá trị khởi tạo ban đầu là 10
            println("Tổng đã tích lũy: $a đồng")
            println("Giá trị mới: $b đồng")
            a + b } // sum them (terminal operator)
    println("Kết quả = $sum đồng")
}
```
Output:
```
Tổng đã tích lũy: 10 đồng
Giá trị mới: 1 đồng
Tổng đã tích lũy: 11 đồng
Giá trị mới: 2 đồng
Tổng đã tích lũy: 13 đồng
Giá trị mới: 3 đồng
Kết quả = 16 đồng
```
Vậy cái tổng này ban đầu đã được mình cho `10 đồng` rồi, bây giờ nó tính cộng dồn thêm `1 đồng`, `2 đồng` và `3 đồng` nữa thì kết quả cuối cùng được `16 đồng (10 + 1 + 2 + 3)`
## Toán tử `toList()`, `toSet()`
Toán tử này giúp chúng ta convert một `flow` thành một `ArrayList` hoặc `LinkedHashSet`
```kotlin
fun main() = runBlocking {
    val list: List<String> = listOf("a", "b", "c", "d", "e").asFlow().toList()
    val set: Set<Int> = (1..5).asFlow().toSet()
    println("${list.javaClass} $list")
    println("${set.javaClass} $set")
}
```
Output:
```
class java.util.ArrayList [a, b, c, d, e]
class java.util.LinkedHashSet [1, 2, 3, 4, 5]
```
## Toán tử `first()`
Toán tử này giúp chúng ta get ra phần tử đầu tiên trong `flow`
```kotlin
fun main() = runBlocking {
    val a: Int = listOf(1, 3, 5, 7, 2, 6, 8, 4).asFlow().first()
    println(a)
}
```
Output:
```
1
```
Nếu chúng ta muốn lấy ra phần tử đầu tiên trong flow thỏa mãn một điều kiện nào đó. Hãy thử hàm `first { }`. Ví dụ chúng ta muốn get ra số chẵn đầu tiên trong `flow`:
```kotlin
fun main() = runBlocking {
    val a: Int = listOf(1, 3, 5, 7, 2, 6, 8, 4).asFlow().first { it % 2 == 0 } // in ra số chẵn đầu tiên
    println(a)
}
```
Output:
```
2
```
Cả hàm `first()` và `first { }` đều `throw NoSuchElementException` nếu nó không get được phần tử nào (ví dụ trường hợp `flow` không có phần tử nào hoặc trong `flow` không có phần tử nào thỏa mãn điều kiện)
## Toán tử `single()`, `singleOrNull()`
Toán tử single để check chắc chắn rằng nguồn `flow` chỉ có một phần tử và nó sẽ return giá trị đó. Trường hợp `flow` có nhiều hay ít hơn 1 phần tử đều bị `throw Exception`.
```kotlin
fun main() = runBlocking {
    val a: Int = listOf(10).asFlow().single() // trả về 10
    listOf(1, 2).asFlow().single() // throw IllegalStateException vì có nhiều hơn 1 phần tử
    listOf<Int>().asFlow().single() // throw IllegalStateException vì có ít hơn 1 phần tử
    println(a) // in ra 10
}
```
Để tránh bị `throw Exception` chúng ta có thể sử dụng toán tử `singleOrNull()`. Toán tử này sẽ trả về `null` nếu `flow` không có phần tử nào. Trường hợp `flow` có nhiều hơn một phần tử nó vẫn `throw Exception` như thường :D
```kotlin
fun main() = runBlocking {
    val a: Int? = listOf(10).asFlow().singleOrNull() // trả về 10
    val b: Int? = listOf<Int>().asFlow().singleOrNull() // trả về null vì có ít hơn 1 phần tử
    listOf(1, 2).asFlow().singleOrNull() throw Exception vì có nhiều hơn 1 phần tử
    println(a.toString()) // in ra 10
    println(b.toString()) // in ra null
}
```
## Toán tử `zip()`
Toán tử này dùng để `zip` 2 `flow` lại (giống như hàm zip trong `Sequence` hay `List`). Có nghĩa là nó sẽ lấy 1 phần tử bên `flowA` và 1 phần tử bên `flowB` để kết hợp lại tạo ra một phần tử mới.
```kotlin
fun main() = runBlocking<Unit> {
    val nums = (1..3).asFlow() // numbers 1..3
    val strs = flowOf("one", "two", "three") // strings
    nums.zip(strs) { a, b -> "$a -> $b" } // compose a single string
        .collect { println(it) } // collect and print
}
```
Output:
```
1 -> one
2 -> two
3 -> three
```
Như vậy nó đã lấy `1` của `flow nums` kết hợp với `one` của `flow strs` để cho ra phần tử `1 -> one`. Tương tự cho ra `2 -> two`, `3 -> three`
## Toán tử `combine()`
Toán tử `combine` cũng tương tự như toán tử `zip`. Có nghĩa là nó cũng sẽ lấy 1 phần tử bên `flowA` và 1 phần tử bên `flowB` để kết hợp lại tạo ra một phần tử mới. Nhưng có 1 sự khác nhau giữa `combine` và `zip`. Mình sẽ dùng 2 đoạn code để demo `zip` và demo `combine` để dễ dàng phân biệt.
### Sử dụng `zip`
```kotlin
val nums = (1..3).asFlow().onEach { delay(300) } // numbers 1..3 every 300 ms
val strs = flowOf("one", "two", "three").onEach { delay(400) } // strings every 400 ms
val startTime = System.currentTimeMillis() // remember the start time 
nums.zip(strs) { a, b -> "$a -> $b" } // compose a single string with "zip"
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```
Output:
```
1 -> one at 466 ms from start
2 -> two at 866 ms from start
3 -> three at 1266 ms from start
```
Toán tử `onEach` đã được mình giới thiệu ở phần trên của bài viết này. 

Ở đây mình có 2 `flow` là `nums` và `strs`. Flow `nums` delay `300ms` trước khi emit phần tử, flow `strs` delay `400ms` trước khi emit phần tử. Rõ ràng flow `nums` sẽ emit các phần tử ra sớm hơn flow `strs` nhưng hàm `zip` đã chờ đến khi `strs` emit ra phần tử rồi mới tiến hành kết hợp chúng lại. Vì vậy mà các giá trị sau khi kết hợp được in ra lần lượt sau `400ms` `800ms` `1200ms`
### Sử dụng `combine`
```kotlin
val nums = (1..3).asFlow().onEach { delay(300) } // numbers 1..3 every 300 ms
val strs = flowOf("one", "two", "three").onEach { delay(400) } // strings every 400 ms          
val startTime = System.currentTimeMillis() // remember the start time 
nums.combine(strs) { a, b -> "$a -> $b" } // compose a single string with "combine"
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```
Output:
```
1 -> one at 472 ms from start
2 -> one at 669 ms from start
2 -> two at 872 ms from start
3 -> two at 970 ms from start
3 -> three at 1273 ms from start
```
Nhìn vào output có thể thấy: `1 -> one at 472 ms from start` được in ra sau `400ms`. Vậy `combine` cũng đợi flow `nums` và `strs` emit phần tử đầu tiên xong rồi kết hợp chúng lại. Đến đây vẫn giống hàm `zip` :D. Tuy nhiên ta thấy dòng thứ 2 `2 -> one at 669 ms from start` được in ra sau `600ms`, có nghĩa là ngay sau khi `nums` emit phần tử thứ 2, lúc này `strs` chưa emit phần tử thứ 2 nhưng hàm `combine` đã kết hợp phần tử thứ 2 của `nums` và phần tử thứ nhất của `strs` để cho ra `2 -> one`. Đây chính là sự khác nhau giữa `combine` và `zip`.
## Toán tử `flatMapConcat()`, `flatMapMerge()`, `flatMapLatest()`
Công dụng của các toán tử `flatMap` này đều dùng để xử lý bài toán sau: Giả sử chúng ta có rất nhiều flow là `flowA`, `flowB`, `flowC`, `flowD`,.... `flowA` emit data sang cho `flowB`, `flowB` nhận và tiếp tục xử lý data đó rồi emit nó sang `flowC`, cứ như vậy cho đến flow cuối cùng. 3 toán tử này đều là `flatMap` nên đều được dùng trong bài toán trên, mình sẽ so sánh sự khác nhau của nó bằng 3 đoạn code. Ví dụ chung mình đưa ra cho cả 3 toán tử là: Có một `flowA` sẽ emit 3 giá trị là `số 1, số 2 và số 3` sang cho 1 `flowB` khác, trước khi nó emit nó bị `delay` `100ms`. Với mỗi giá trị mà `flowB` nhận được từ `flowA`, `flowB` sẽ xử lý và emit ra 2 giá trị `First` và `Second` và có `delay` `500ms` giữa 2 lần emit.
### flatMapConcat
```kotlin
fun requestFlow(i: Int): Flow<String> = flow { // Đây là flowB
    emit("$i: First") 
    delay(500) // wait 500 ms
    emit("$i: Second")    
}

fun main() = runBlocking<Unit> { 
    val startTime = System.currentTimeMillis() // remember the start time 
    // Dưới đây là flowA
    (1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
        .flatMapConcat { requestFlow(it) }                                                                           
        .collect { value -> // collect and print 
            println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
        } 
}
```
Output:
```
1: First at 121 ms from start
1: Second at 622 ms from start
2: First at 727 ms from start
2: Second at 1227 ms from start
3: First at 1328 ms from start
3: Second at 1829 ms from start
```
Nhìn vào các mốc thời gian `100ms` (do delay 100ms trong `flowA`), `600ms` (do delay 500ms tiếp theo trong `flowB`), `700ms` (delay 100ms tiếp theo), `1200ms` (delay 500ms tiếp theo), `1300ms` (delay 100ms tiếp theo), `1800ms` (delay 500ms tiếp theo). Vậy toán tử này sẽ chờ đợi đến khi `flowB` hoàn thành cả 2 emit rồi mới bắt đầu `collect` data tiếp theo từ `flowA`.
### flatMapMerge
```kotlin
fun requestFlow(i: Int): Flow<String> = flow { // Đây là flowB
    emit("$i: First") 
    delay(500) // wait 500 ms
    emit("$i: Second")    
}

fun main() = runBlocking<Unit> { 
    val startTime = System.currentTimeMillis() // remember the start time 
    // Dưới đây là flowA
    (1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
        .flatMapMerge { requestFlow(it) }                                                                           
        .collect { value -> // collect and print 
            println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
        } 
}
```
Output:
```
1: First at 136 ms from start
2: First at 231 ms from start
3: First at 333 ms from start
1: Second at 639 ms from start // 500ms sau kể từ khi phần tử first được emit
2: Second at 732 ms from start // 500ms sau kể từ khi phần tử first được emit
3: Second at 833 ms from start // 500ms sau kể từ khi phần tử first được emit
```
Dựa vào các mốc thời gian trong output. Dễ thấy toán tử này `collect` tất cả các luồng đến và hợp nhất các giá trị của chúng thành một luồng duy nhất để các giá trị được phát ra càng sớm càng tốt. Toán từ này nó không đợi `flowB` emit xong phần tử `Second` như `flatMapConcat` mà nó tiếp tục `collect` tiếp từ `flowA`. Vậy nên `300ms` đầu tiên, cả 3 phần tử `First` được in ra trước. `delay` thêm `500ms` sau thì các toán tử `Second` mới được in ra.
### flatMapLatest
```kotlin
fun requestFlow(i: Int): Flow<String> = flow { // Đây là flowB
    emit("$i: First") 
    delay(500) // wait 500 ms
    emit("$i: Second")    
}

fun main() = runBlocking<Unit> { 
    val startTime = System.currentTimeMillis() // remember the start time 
     // Dưới đây là flowA
    (1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
        .flatMapLatest { requestFlow(it) }                                                                           
        .collect { value -> // collect and print 
            println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
        } 
}
```
Output:
```
1: First at 142 ms from start
2: First at 322 ms from start
3: First at 425 ms from start
3: Second at 931 ms from start
```
`flatMapLatest` đã hủy tất cả code trong khối của nó `flowB` khi nó gặp `delay` trong `flowB` và tiếp tục `collect` data từ `flowA`. Như vậy sau khi `flowA` emit ra `số 1`, `số 1` sẽ vào tới `flowB` gặp `delay` và `flowA` đang rất nóng vội để emit tiếp phần tử thứ 2 nên `flowB` sẽ bị hủy ngay tại đó. `flowA` tiếp tục emit tiếp `số 2`, `số 2` lại vào tới `flowB` gặp `delay` nên `flowB` bị hủy ngay tại đó. `flowA` tiếp tục emit tiếp `số 3` cũng là phần tử cuối cùng, nó lại vào tới `flowB` gặp `delay` nhưng nó không bị hủy vì `flowA` đã emit ra phần tử cuối cùng rồi, ko thể emit thêm được nữa. 

Chính hàm `delay` là nguyên nhân khiến cho `flowB` bị hủy. Vậy nên khi chúng ta bỏ hàm `delay` đi thì `flowB` sẽ không thể bị hủy.
```kotlin
fun requestFlow(i: Int): Flow<String> = flow { // Đây là flowB
    emit("$i: First")  // đã xóa hàm delay(500)
    emit("$i: Second")    
}

fun main() = runBlocking<Unit> { 
    val startTime = System.currentTimeMillis() // remember the start time 
     // Dưới đây là flowA
    (1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
        .flatMapLatest { requestFlow(it) }                                                                           
        .collect { value -> // collect and print 
            println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
        } 
}
```
```
1: First at 180 ms from start
1: Second at 180 ms from start
2: First at 281 ms from start
2: Second at 281 ms from start
3: First at 382 ms from start
3: Second at 382 ms from start
```
Chúng ta thấy cả 6 dòng được in ra, không dòng nào bị hủy.
# Kết luận
Hy vọng qua bài viết này, các bạn đã nắm được các toán tử cơ bản về `Flow`. Trong phần tiếp theo, mình sẽ giới thiệu context và xử lý exception trong `Flow`. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo. :D

Nguồn tham khảo:

https://kotlinlang.org/docs/reference/coroutines/flow.html

Đọc lại những phần trước:

[Cùng học Kotlin Coroutine, phần 1: Giới thiệu Kotlin Coroutine và kỹ thuật lập trình bất đồng bộ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)

[Cùng học Kotlin Coroutine, phần 2: Build first coroutine with Kotlin](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6)
    
[Cùng học Kotlin Coroutine, phần 3: Coroutine Context và Dispatcher](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8)
    
[Cùng học Kotlin Coroutine, phần 4: Job, Join, Cancellation and Timeouts](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)

[Cùng học Kotlin Coroutine, phần 5: Async & Await](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-5-async-await-naQZRxGm5vx)

[Cùng học Kotlin Coroutine, phần 6: Coroutine Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-6-coroutine-scope-aWj536n8l6m)

[Cùng học Kotlin Coroutine, phần 7: Xử lý Exception trong Coroutine, Supervision Job & Supervision Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-7-xu-ly-exception-trong-coroutine-supervision-job-supervision-scope-naQZRDaG5vx)

[Cùng học Kotlin Coroutine, phần 8: Flow (part 1 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-8-flow-part-1-of-3-bWrZnx695xw)

Đọc tiếp phần 10: [Cùng học Kotlin Coroutine, phần 10: Flow (part 3 of 3)](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-10-flow-part-3-of-3-aWj53G4o56m)