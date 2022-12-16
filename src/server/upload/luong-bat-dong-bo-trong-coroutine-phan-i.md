Hàm suspend trả về một giá trị duy nhất 1 cách bất đồng bộ, nhưng làm cách nào chúng ta có thể trả về nhiều giá trị được tính toán bất đồng bộ? Đây là nơi Kotlin Flows đi vào.
(Lưu ý: Trong bài này, "luồng" mang nghĩa là flow)

## Biểu diễn nhiều giá trị
Nhiều giá trị có thể được biểu diễn trong Kotlin bằng cách sử dụng các Collection . Ví dụ: chúng ta có thể có một hàm *simple* trả về List gồm ba số và sau đó in tất cả chúng bằng *forEach* :

```
fun simple(): List<Int> = listOf(1, 2, 3)
 
fun main() {
    simple().forEach { value -> println(value) } 
}
```
Mã này xuất ra:

```
1
2
3
```

### Trình tự
Nếu chúng ta đang tính toán các con số với một số code block CPU (mỗi lần tính toán mất 100ms), thì chúng ta có thể biểu diễn các con số bằng cách sử dụng *Sequence* :

```
fun simple(): Sequence<Int> = sequence { // sequence builder
    for (i in 1..3) {
        Thread.sleep(100) // pretend we are computing it
        yield(i) // yield next value
    }
}

fun main() {
    simple().forEach { value -> println(value) } 
}
```

Mã này xuất ra các số giống như trên, nhưng nó đợi 100ms trước khi in từng số.

### Đình chỉ các chức năng
Tuy nhiên, các tính toán này chặn luồng chính đang chạy mã. Khi các giá trị này được chạy bằng mã bất đồng bộ, chúng ta có thể đánh dấu hàm simple là *suspend* để nó có thể thực hiện công việc của mình mà không bị chặn và trả về kết quả dưới dạng danh sách:

```
suspend fun simple(): List<Int> {
    delay(1000) // pretend we are doing something asynchronous here
    return listOf(1, 2, 3)
}

fun main() = runBlocking<Unit> {
    simple().forEach { value -> println(value) } 
}
```

Mã này in các số sau khi chờ một giây.

### Luồng
Sử dụng List<Int>kiểu kết quả, có nghĩa là chúng ta chỉ có thể trả về tất cả các giá trị cùng một lúc. Để biểu thị luồng giá trị đang được tính toán không đồng bộ, chúng ta có thể sử dụng một kiểu Flow<Int> giống như chúng ta sẽ sử dụng kiểu Sequence<Int> cho các giá trị được tính toán đồng bộ:

```
fun simple(): Flow<Int> = flow { // flow builder
    for (i in 1..3) {
        delay(100) // pretend we are doing something useful here
        emit(i) // emit next value
    }
}

fun main() = runBlocking<Unit> {
    // Launch a concurrent coroutine to check if the main thread is blocked
    launch {
        for (k in 1..3) {
            println("I'm not blocked $k")
            delay(100)
        }
    }
    // Collect the flow
    simple().collect { value -> println(value) } 
}
```

Mã này đợi 100ms trước khi in từng số mà không chặn luồng chính. Điều này được xác minh bằng cách in "I'm not blocked" cứ sau 100 mili giây từ một coroutine được đăng ký riêng biệt đang chạy trong thread main:

```
I'm not blocked 1
1
I'm not blocked 2
2
I'm not blocked 3
3
```
Lưu ý những khác biệt sau trong mã với Flow từ các ví dụ trước đó:

- Một hàm xây dựng cho kiểu Flow được gọi là luồng .
- Mã bên trong khối flow { ... } có thể tạm dừng.
- Hàm simple không còn được đánh dấu bằng suspend.
- Các giá trị được phát ra từ luồng sử dụng hàm *emit* .
- Các giá trị được thu thập từ luồng sử dụng hàm *collect*.
Chúng ta có thể thay thế delay bằng Thread.sleep trong body của flow { ... } của hàm simple và thấy rằng main thread bị chặn trong trường hợp này.

## Flows are cold
Flow là các luồng lạnh tương tự như chuỗi - mã bên trong trình tạo flow không chạy cho đến khi flow được collect. Điều này trở nên rõ ràng trong ví dụ sau:

     
```
fun simple(): Flow<Int> = flow { 
    println("Flow started")
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    println("Calling simple function...")
    val flow = simple()
    println("Calling collect...")
    flow.collect { value -> println(value) } 
    println("Calling collect again...")
    flow.collect { value -> println(value) } 
}
```

Output:

```
Calling simple function...
Calling collect...
Flow started
1
2
3
Calling collect again...
Flow started
1
2
3
```
Đây là lý do chính khiến hàm simple (trả về một luồng) không được đánh dấu với suspend. Tự nó, simple() khi đươcj gọi sẽ return nhanh chóng và không phải chờ đợi bất cứ điều gì. Flow bắt đầu mỗi khi được thu thập, đó là lý do tại sao chúng ta thấy "Flow started" khi chúng ta gọi lại *collect*.

## Cơ bản về hủy luồng
Flow tuân thủ việc hủy bỏ của các coroutine. Như thường lệ, việc thu thập Flow có thể bị hủy bỏ khi Flow bị đình chỉ trong hàm suspend mà có thể hủy bỏ (như *delay* ). Ví dụ sau cho thấy cách flow bị hủy khi hết thời gian chờ khi chạy trong khối *withTimeoutOrNull* và ngừng thực thi mã của nó:

```
fun simple(): Flow<Int> = flow { 
    for (i in 1..3) {
        delay(100)          
        println("Emitting $i")
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    withTimeoutOrNull(250) { // Timeout after 250ms 
        simple().collect { value -> println(value) } 
    }
    println("Done")
}
```

Lưu ý rằng chỉ có hai số được emit bởi luồng trong hàm simple, tạo ra kết quả sau:

```
Emitting 1
1
Emitting 2
2
Done
```
Xem phần [Kiểm tra hủy luồng](https://kotlinlang.org/docs/reference/coroutines/flow.html#flow-cancellation-checks) để biết thêm chi tiết.

## Flow builder
Trình tạo flow { ... } từ các ví dụ trước là cơ bản nhất. Có những builder khác để khai báo các luồng dễ dàng hơn:

Trình tạo *flowOf* xác định luồng phát ra một tập giá trị cố định.
Các collection và chuỗi khác nhau có thể được chuyển đổi thành các luồng bằng các hàm mở rộng *.asFlow()*.
Vì vậy, ví dụ in các số từ 1 đến 3 từ một flow có thể được viết là:

```
// Convert an integer range to a flow
(1..3).asFlow().collect { value -> println(value) }
```

## Các toán tử trung gian của luồng
Các luồng có thể được chuyển đổi bằng các toán tử, giống như bạn làm với các tập hợp và chuỗi. Các toán tử trung gian được áp dụng cho một upstream flow và trả lại một downstream flow. Các toán tử này lạnh, giống như các flow vậy. Một cuộc gọi đến một toán tử như vậy không phải là một hàm suspend. Nó hoạt động nhanh chóng, trả lại định nghĩa của một luồng chuyển đổi mới.

Các toán tử cơ bản có tên quen thuộc như *map* và *filter* . Sự khác biệt quan trọng đối với các chuỗi là các khối mã bên trong các toán tử này có thể gọi các hàm suspend.

Ví dụ: một luồng yêu cầu đến có thể được ánh xạ tới kết quả bằng toán tử *map*, ngay cả khi thực hiện một yêu cầu là một hoạt động lâu dài được thực hiện bởi hàm suspend:

```
suspend fun performRequest(request: Int): String {
    delay(1000) // imitate long-running asynchronous work
    return "response $request"
}

fun main() = runBlocking<Unit> {
    (1..3).asFlow() // a flow of requests
        .map { request -> performRequest(request) }
        .collect { response -> println(response) }
}
```

Nó tạo ra ba dòng sau, mỗi dòng xuất hiện sau mỗi giây:

```
response 1
response 2
response 3
```
    
### Toán tử transform
Trong số các toán tử biến đổi luồng, toán tử tổng quát nhất được gọi là *transform*. Nó có thể được sử dụng để bắt chước các phép biến đổi đơn giản như map và filter, cũng như thực hiện các phép biến đổi phức tạp hơn. Sử dụng toán tử transform, chúng ta có thể phát ra các giá trị tùy ý một số lần tùy ý.

Ví dụ: bằng cách sử dụng transform chúng ta có thể phát ra một chuỗi trước khi thực hiện một yêu cầu không đồng bộ dài hạn và theo sau nó với một phản hồi:

```
(1..3).asFlow() // a flow of requests
    .transform { request ->
        emit("Making request $request") 
        emit(performRequest(request)) 
    }
    .collect { response -> println(response) }
```

Đầu ra của mã này là:

```
Making request 1
response 1
Making request 2
response 2
Making request 3
response 3
```

Nguồn https://kotlinlang.org/docs/reference/coroutines/flow.html
(Còn tiếp)