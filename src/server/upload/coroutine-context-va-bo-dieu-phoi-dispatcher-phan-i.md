## Coroutine Context và Dispatcher
Các coroutines luôn thực thi trong một số ngữ cảnh được biểu thị bằng một giá trị của kiểu CoroutineContext , được xác định trong thư viện chuẩn Kotlin.

Coroutine Context là một tập hợp các yếu tố khác nhau. Các yếu tố chính là Job của coroutine, mà chúng ta đã thấy trước đây, và dispatcher của nó, được đề cập trong phần này.

### Dispatchers và threads
Coroutine Context bao gồm một bộ điều phối coroutine (xem CoroutineDispatcher ) để xác định thread hoặc các thread mà coroutine tương ứng sử dụng để thực hiện. Bộ điều phối coroutine có thể giới hạn việc thực thi coroutine cho một luồng cụ thể, gửi nó đến một nhóm luồng hoặc để nó chạy không bị kiểm soát.

Tất cả các builder của coroutine như launch và async đều chấp nhận tham số CoroutineContext tùy chọn có thể được sử dụng để chỉ định rõ ràng dispatcher cho coroutine mới và các thành phần bối cảnh khác.

Hãy thử ví dụ sau:

```
launch { // context of the parent, main runBlocking coroutine
    println("main runBlocking      : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
    println("Unconfined            : I'm working in thread ${Thread.currentThread().name}")
}
launch(Dispatchers.Default) { // will get dispatched to DefaultDispatcher 
    println("Default               : I'm working in thread ${Thread.currentThread().name}")
}
launch(newSingleThreadContext("MyOwnThread")) { // will get its own new thread
    println("newSingleThreadContext: I'm working in thread ${Thread.currentThread().name}")
}
```

Nó tạo ra output sau (có thể theo thứ tự khác nhau):

```
Unconfined            : I'm working in thread main
Default               : I'm working in thread DefaultDispatcher-worker-1
newSingleThreadContext: I'm working in thread MyOwnThread
main runBlocking      : I'm working in thread main
```
Khi launch { ... }được sử dụng mà không có tham số, nó sẽ kế thừa context (và cả dispatcher) từ CoroutineScope mà nó được khởi chạy từ đó. Trong trường hợp này, nó kế thừa context của runBlockingcoroutine chính chạy trong luồng main.

*Dispatchers.Unconfined* là một dispatcher đặc biệt cũng xuất hiện để chạy trong luồng main, nhưng trên thực tế, đó là một cơ chế khác được giải thích sau.

Dispatcher mặc định được sử dụng khi coroutines được khởi chạy trong GlobalScope được đại diện bởi Dispatchers.Default và sử dụng một nhóm các luồng chung được chia sẻ, do đó launch(Dispatchers.Default) { ... } sử dụng cùng một dispatcher như GlobalScope.launch { ... }.

*newSingleThreadContext* tạo ra một luồng cho coroutine chạy. Một thread chuyên dụng là một tài nguyên rất tốn kém. Trong một ứng dụng thực, nó phải được phát hành, khi không còn cần thiết, hãy sử dụng hàm close hoặc lưu trữ nó trong một biến cấp cao nhất và tái sử dụng lại trong suốt ứng dụng.

### Unconfined so với confined dispatcher
Dispatchers.Unconfined bắt đầu một coroutine trong thread được gọi, nhưng chỉ cho đến điểm suspend đầu tiên. Sau khi đình chỉ, nó nối lại coroutine trong luồng được xác định đầy đủ bởi hàm suspend đã được gọi. Dispatcher không được kiểm soát phù hợp với các coroutines không tiêu tốn thời gian của CPU cũng như không cập nhật bất kỳ dữ liệu chia sẻ nào (như UI) bị giới hạn trong một luồng cụ thể.

Mặt khác, dispatcher được kế thừa từ CoroutineScope bên ngoài theo mặc định. Dispatcher mặc định cho coroutine runBlocking , đặc biệt, bị giới hạn trong luồng của invoker, do đó, việc kế thừa nó có tác dụng giới hạn thực thi đối với luồng này với việc lập lịch trình FIFO có thể dự đoán được.

```
launch(Dispatchers.Unconfined) { // not confined -- will work with main thread
    println("Unconfined      : I'm working in thread ${Thread.currentThread().name}")
    delay(500)
    println("Unconfined      : After delay in thread ${Thread.currentThread().name}")
}
launch { // context of the parent, main runBlocking coroutine
    println("main runBlocking: I'm working in thread ${Thread.currentThread().name}")
    delay(1000)
    println("main runBlocking: After delay in thread ${Thread.currentThread().name}")
}
```

Output:

```
Unconfined      : I'm working in thread main
main runBlocking: I'm working in thread main
Unconfined      : After delay in thread kotlinx.coroutines.DefaultExecutor
main runBlocking: After delay in thread main
```
Vì vậy, coroutine với context được kế thừa từ runBlocking {...} tiếp tục thực thi trong luồng main, trong khi cái không được xác nhận lại tiếp tục trong luồng thực thi mặc định mà hàm suspend đang sử dụng.

Dispatcher không được kiểm soát là một cơ chế tiên tiến có thể hữu ích trong một số trường hợp nhất định trong đó việc gửi một coroutine để thực hiện sau đó là không cần thiết hoặc tạo ra các tác dụng phụ không mong muốn, bởi vì một số thao tác trong coroutine phải được thực hiện ngay lập tức. Bộ điều phối không được kiểm soát không nên được sử dụng trong mã chung.

### Gỡ lỗi coroutines và thread
Coroutine có thể đình chỉ trên một luồng và tiếp tục trên một luồng khác. Ngay cả với một dispatcher một luồng, có thể khó có thể hiểu được coroutine đang làm gì, ở đâu và khi nào. Cách tiếp cận phổ biến để gỡ lỗi các ứng dụng với các luồng là in tên luồng trong tệp log trên mỗi câu lệnh log. Tính năng này được hỗ trợ phổ biến bởi các framework dành cho việc log. Khi sử dụng coroutines, chỉ riêng tên luồng không mang lại nhiều ngữ cảnh, do đó kotlinx.coroutines bao gồm các phương tiện gỡ lỗi để làm cho nó dễ dàng hơn.

Chạy đoạn mã sau với -Dkotlinx.coroutines.debug:

```
val a = async {
    log("I'm computing a piece of the answer")
    6
}
val b = async {
    log("I'm computing another piece of the answer")
    7
}
log("The answer is ${a.await() * b.await()}")
```

Có ba coroutines. Các coroutine chính (# 1) bên trong runBlocking và hai coroutine tính toán các giá trị hoãn lại a(# 2) và b(# 3). Tất cả chúng đều được thực thi trong ngữ cảnh runBlockingvà được giới hạn trong luồng chính. Output của mã này là:

```
[main @coroutine#2] I'm computing a piece of the answer
[main @coroutine#3] I'm computing another piece of the answer
[main @coroutine#1] The answer is 42
```

Các hàm log in tên của các thread trong ngoặc vuông, và bạn có thể thấy rằng nó là thread main với định danh của coroutine hiện đang thực hiện nối vào nó. Mã định danh này được gán liên tiếp cho tất cả các coroutine được tạo khi chế độ gỡ lỗi được bật.

> Chế độ gỡ lỗi cũng được bật khi JVM được chạy với tham số tùy chọn -ea . Bạn có thể đọc thêm về các phương tiện gỡ lỗi trong tài liệu của thuộc tính DEBUG_PROPERTY_NAME .

### Chuyển luồng giữa các thread
Chạy đoạn mã sau với -Dkotlinx.coroutines.debug (xem phần trên):

```
newSingleThreadContext("Ctx1").use { ctx1 ->
    newSingleThreadContext("Ctx2").use { ctx2 ->
        runBlocking(ctx1) {
            log("Started in ctx1")
            withContext(ctx2) {
                log("Working in ctx2")
            }
            log("Back to ctx1")
        }
    }
}
```

Nó cho thấy một số kỹ thuật mới. Một coroutine đang sử dụng runBlocking với một context được chỉ định rõ ràng và một cái khác đang sử dụng hàm withContext để thay đổi context của một coroutine trong khi vẫn ở trong cùng một coroutine, như bạn có thể thấy trong đầu ra bên dưới:

```
[Ctx1 @coroutine#1] Started in ctx1
[Ctx2 @coroutine#1] Working in ctx2
[Ctx1 @coroutine#1] Back to ctx1
```
Lưu ý rằng ví dụ này cũng sử dụng hàm *use* từ thư viện chuẩn Kotlin để giải phóng các luồng được tạo bằng newSingleThreadContext khi không còn cần thiết nữa.

### Job trong context
Job của coroutine là một phần trong context của nó và có thể được truy xuất từ nó bằng biểu thức *coroutineContext[Job]*:

```
println("My job is ${coroutineContext[Job]}")
```

Trong chế độ gỡ lỗi , nó xuất ra một cái gì đó như thế này:

```
My job is "coroutine#1":BlockingCoroutine{Active}@6d311334
```
Lưu ý rằng *isActive* trong CoroutineScope chỉ là một phím tắt thuận tiện cho biểu thức `coroutineContext[Job]?.isActive == true`.

Còn tiếp

Nguồn https://kotlinlang.org/docs/reference/coroutines/coroutine-context-and-dispatchers.html