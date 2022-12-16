### Toán tử giới hạn kích thước
Các toán tử trung gian kích thước giới hạn như *take* hủy việc thực hiện của flow khi đạt tới giới hạn tương ứng. Việc hủy bỏ trong coroutines luôn được thực hiện bằng cách đưa ra một ngoại lệ, để tất cả các chức năng quản lý tài nguyên (như try { ... } finally { ... }) hoạt động bình thường trong trường hợp hủy bỏ:

```
fun numbers(): Flow<Int> = flow {
    try {                          
        emit(1)
        emit(2) 
        println("This line will not execute")
        emit(3)    
    } finally {
        println("Finally in numbers")
    }
}

fun main() = runBlocking<Unit> {
    numbers() 
        .take(2) // take only the first two
        .collect { value -> println(value) }
}      
```

Output của mã này cho thấy rõ ràng rằng việc thực thi phần thân của flow { ... } trong hàm numbers() đã dừng lại sau khi phát ra số thứ hai:

```
1
2
Finally in numbers
```
## Các toán tử flow đầu cuối
Các toán tử đầu cuối trên các luồng là các hàm suspending sẽ khởi chạy một bộ sưu tập luồng. Các toán tử thu thập là một trong những cái cơ bản nhất, nhưng có những toán tử đầu cuối khác, có thể làm cho nó dễ dàng hơn:

- Chuyển đổi sang các bộ sưu tập khác nhau như *toList* và *toSet* .
- Các toán tử để nhận giá trị đầu tiên (toán tử *first*) và để đảm bảo rằng một luồng phát ra một giá trị duy nhất (*single*).
- Giảm luồng đến một giá trị bằng *reduce* và *fold* .
Ví dụ:

```
val sum = (1..5).asFlow()
    .map { it * it } // squares of numbers from 1 to 5                           
    .reduce { a, b -> a + b } // sum them (terminal operator)
println(sum)
```

In một số duy nhất:

`55`

## Các luồng là tuần tự
Mỗi tập hợp riêng lẻ của một luồng được thực hiện tuần tự trừ khi sử dụng các toán tử đặc biệt hoạt động trên nhiều luồng. Các collection hoạt động trực tiếp trong quy trình đăng ký gọi một toán tử đầu cuối. Không có process mới nào được khởi chạy theo mặc định. Mỗi giá trị phát ra được xử lý bởi tất cả các toán tử trung gian từ thượng nguồn đến hạ lưu và sau đó được chuyển đến toán tử đầu cuối sau đó.

Xem ví dụ sau để lọc các số nguyên chẵn và ánh xạ chúng thành chuỗi:

```
(1..5).asFlow()
    .filter {
        println("Filter $it")
        it % 2 == 0              
    }              
    .map { 
        println("Map $it")
        "string $it"
    }.collect { 
        println("Collect $it")
    }    
```

Output:

```
Filter 1
Filter 2
Map 2
Collect string 2
Filter 3
Filter 4
Map 4
Collect string 4
Filter 5
```

## Context của dòng chảy
Việc thu thập một luồng luôn xảy ra trong context của process gọi đến. Ví dụ: nếu có một luồng *simple*, thì mã sau sẽ chạy trong context do tác giả của mã này chỉ định, bất kể chi tiết triển khai của luồng *simple*:

```
withContext(context) {
    simple().collect { value ->
        println(value) // run in the specified context 
    }
}
```
Thuộc tính này của một luồng được gọi là bảo toàn context.

Vì vậy, theo mặc định, mã trong trình tạo flow { ... } chạy trong context được cung cấp bởi collector của luồng tương ứng. Ví dụ: hãy xem xét việc triển khai một hàm simple in luồng mà nó được gọi và phát ra ba số:

```
fun simple(): Flow<Int> = flow {
    log("Started simple flow")
    for (i in 1..3) {
        emit(i)
    }
}  

fun main() = runBlocking<Unit> {
    simple().collect { value -> log("Collected $value") } 
}            
```

Chạy mã này tạo ra:

```
[main @coroutine#1] Started simple flow
[main @coroutine#1] Collected 1
[main @coroutine#1] Collected 2
[main @coroutine#1] Collected 3
```

Vì simple().collect được gọi từ main thread, nên phần thân của luồng simple cũng được gọi trong main thread. Đây là mặc định hoàn hảo cho mã chạy nhanh hoặc không đồng bộ không quan tâm đến ngữ cảnh thực thi và không chặn người gọi.

### Phát sai withContext
Tuy nhiên, những đoạn code tiêu tốn CPU chạy lâu có thể cần được thực thi trong context của Dispatchers. Mã mặc định và cập nhật giao diện người dùng có thể cần được thực thi trong context của Dispatchers.Main . Thông thường, withContext được sử dụng để thay đổi context trong mã bằng cách sử dụng Kotlin coroutines, nhưng mã trong trình tạo flow { ... } phải tôn trọng thuộc tính bảo toàn context và không được phép phát ra từ một context khác.

Hãy thử chạy mã sau:

```
fun simple(): Flow<Int> = flow {
    // The WRONG way to change context for CPU-consuming code in flow builder
    kotlinx.coroutines.withContext(Dispatchers.Default) {
        for (i in 1..3) {
            Thread.sleep(100) // pretend we are computing it in CPU-consuming way
            emit(i) // emit next value
        }
    }
}

fun main() = runBlocking<Unit> {
    simple().collect { value -> println(value) } 
}         
```

Mã này tạo ra ngoại lệ sau:

```
Exception in thread "main" java.lang.IllegalStateException: Flow invariant is violated:
        Flow was collected in [CoroutineId(1), "coroutine#1":BlockingCoroutine{Active}@5511c7f8, BlockingEventLoop@2eac3323],
        but emission happened in [CoroutineId(1), "coroutine#1":DispatchedCoroutine{Active}@2dae0000, Dispatchers.Default].
        Please refer to 'flow' documentation or use 'flowOn' instead
    at ...
```

### Toán tử flowOn
Ngoại lệ đề cập đến hàm flowOn sẽ được sử dụng để thay đổi context phát ra luồng. Cách chính xác để thay đổi context của luồng được hiển thị trong ví dụ bên dưới, ví dụ này cũng in tên của các luồng tương ứng để hiển thị cách tất cả hoạt động:

```
fun simple(): Flow<Int> = flow {
    for (i in 1..3) {
        Thread.sleep(100) // pretend we are computing it in CPU-consuming way
        log("Emitting $i")
        emit(i) // emit next value
    }
}.flowOn(Dispatchers.Default) // RIGHT way to change context for CPU-consuming code in flow builder

fun main() = runBlocking<Unit> {
    simple().collect { value ->
        log("Collected $value") 
    } 
}            
```

Lưu ý cách flow { ... } hoạt động trong background thread, trong khi thu thập diễn ra trong main thread:

Một điều khác cần quan sát ở đây là toán tử flowOn đã thay đổi bản chất tuần tự mặc định của luồng. Bây giờ việc thu thập xảy ra trong một coroutine ("coroutine # 1") và phát xạ xảy ra trong một coroutine khác ("coroutine # 2") đang chạy trong một thread khác đồng thời với thread thu thập. Toán tử flowOn tạo coroutine khác cho một upstream flow khi nó phải thay đổi CoroutineDispatcher trong context của nó.

Nguồn https://kotlinlang.org/docs/reference/coroutines/flow.html#size-limiting-operators (còn tiếp)