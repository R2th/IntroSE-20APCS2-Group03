### Children của một coroutine
Khi một coroutine được launch trong CoroutineScope của một coroutine khác, nó thừa kế context của coroutine đó thông qua CoroutineScope.coroutineContext và Job của coroutine mới trở thành một child của job của coroutine cha. Khi coroutine cha bị hủy, tất cả các con của nó cũng bị hủy theo cách đệ quy.

Tuy nhiên, khi GlobalScope được sử dụng để khởi động một coroutine, không có coroutine cha nào cho job của coroutine mới. Do đó, nó không bị ràng buộc với phạm vi mà nó được đưa ra và hoạt động độc lập.

```
// launch a coroutine to process some kind of incoming request
val request = launch {
    // it spawns two other jobs, one with GlobalScope
    GlobalScope.launch {
        println("job1: I run in GlobalScope and execute independently!")
        delay(1000)
        println("job1: I am not affected by cancellation of the request")
    }
    // and the other inherits the parent context
    launch {
        delay(100)
        println("job2: I am a child of the request coroutine")
        delay(1000)
        println("job2: I will not execute this line if my parent request is cancelled")
    }
}
delay(500)
request.cancel() // cancel processing of the request
delay(1000) // delay a second to see what happens
println("main: Who has survived request cancellation?")
```

Output của mã này là:

```
job1: I run in GlobalScope and execute independently!
job2: I am a child of the request coroutine
job1: I am not affected by cancellation of the request
main: Who has survived request cancellation?
```

### Trách nhiệm của coroutine cha
Một coroutine cha luôn chờ đợi để hoàn thành tất cả các con của nó. Một coroutine cha không phải theo dõi rõ ràng tất cả những con của nó và nó không phải sử dụng *Job.join* để đợi chúng ở cuối:

```
// launch a coroutine to process some kind of incoming request
val request = launch {
    repeat(3) { i -> // launch a few children jobs
        launch  {
            delay((i + 1) * 200L) // variable delay 200ms, 400ms, 600ms
            println("Coroutine $i is done")
        }
    }
    println("request: I'm done and I don't explicitly join my children that are still active")
}
request.join() // wait for completion of the request, including all its children
println("Now processing of the request is complete")
```

Kết quả sẽ là:

```
request: I'm done and I don't explicitly join my children that are still active
Coroutine 0 is done
Coroutine 1 is done
Coroutine 2 is done
Now processing of the request is complete
```

### Đặt tên coroutines để gỡ lỗi
Id được gán tự động là tốt khi coroutines log thường xuyên và bạn chỉ cần quan tâm tương quan các log đến từ cùng một coroutine. Tuy nhiên, khi một coroutine được gắn với việc xử lý một yêu cầu cụ thể hoặc thực hiện một số tác vụ nền cụ thể, tốt hơn là đặt tên rõ ràng cho mục đích gỡ lỗi. CoroutineName phục vụ cùng mục đích với tên luồng. Nó được bao gồm trong tên luồng đang thực thi coroutine này khi chế độ gỡ lỗi được bật.

Ví dụ sau đây thể hiện khái niệm này:

```
log("Started main coroutine")
// run two background value computations
val v1 = async(CoroutineName("v1coroutine")) {
    delay(500)
    log("Computing v1")
    252
}
val v2 = async(CoroutineName("v2coroutine")) {
    delay(1000)
    log("Computing v2")
    6
}
log("The answer for v1 / v2 = ${v1.await() / v2.await()}")
```

Đầu ra mà nó tạo ra với -Dkotlinx.coroutines.debugtùy chọn JVM tương tự như:

[main @main#1] Started main coroutine
[main @v1coroutine#2] Computing v1
[main @v2coroutine#3] Computing v2
[main @main#1] The answer for v1 / v2 = 42

### Kết hợp các yếu tố bối cảnh
Đôi khi chúng ta cần xác định nhiều yếu tố cho context của coroutine. Chúng ta có thể sử dụng toán tử + cho điều đó. Ví dụ: chúng ta có thể khởi chạy một coroutine với một dispatcher được chỉ định rõ ràng và một tên được chỉ định rõ ràng cùng một lúc:

```
launch(Dispatchers.Default + CoroutineName("test")) {
    println("I'm working in thread ${Thread.currentThread().name}")
}
```

Output của mã này với -Dkotlinx.coroutines.debug là:

```
I'm working in thread DefaultDispatcher-worker-1 @test#2
```

### Phạm vi coroutine
Chúng ta hãy đặt kiến thức của chúng ta về context, child và job cùng nhau. Giả sử rằng ứng dụng của chúng ta có một đối tượng có vòng đời, nhưng đối tượng đó không phải là coroutine. Ví dụ: chúng ta đang viết một ứng dụng Android và khởi chạy nhiều coroutine khác nhau trong context của Activity của Android để thực hiện các hoạt động bất đồng bộ để tìm nạp và cập nhật dữ liệu, làm animation, v.v. Tất cả các coroutine này phải bị hủy khi Activity bị hủy để tránh bộ nhớ rò rỉ. Tất nhiên, chúng ta có thể điều khiển các context và job một cách thủ công để trói buộc các vòng đời của Activity và các coroutines của nó, nhưng kotlinx.coroutines cung cấp một sự trừu tượng hóa gói gọn rằng: CoroutineScope . Bạn đã quen thuộc với phạm vi coroutine vì tất cả các trình tạo coroutine được khai báo là phần mở rộng trên nó.

Chúng ta quản lý vòng đời của các coroutines của chúng ta bằng cách tạo ra một instance của CoroutineScope gắn liền với vòng đời Activity của chúng ta. Một instance của CoroutineScope có thể được tạo bởi các hàm Factory *CoroutineScope()* hoặc *MainScope()* . Cái trước tạo ra một phạm vi mục đích chung, trong khi cái sau tạo ra một phạm vi cho các ứng dụng UI và sử dụng Dispatchers. Chính là dispatcher mặc định:

```
class Activity {
    private val mainScope = MainScope()
    
    fun destroy() {
        mainScope.cancel()
    }
    // to be continued ...
```

Bây giờ, chúng ta có thể khởi chạy coroutines trong phạm vi Activity này bằng cách sử dụng định nghĩa scope. Đối với bản demo, chúng ta khởi chạy mười coroutines trì hoãn trong một thời gian khác nhau:

```
// class Activity continues
    fun doSomething() {
        // launch ten coroutines for a demo, each working for a different time
        repeat(10) { i ->
            mainScope.launch {
                delay((i + 1) * 200L) // variable delay 200ms, 400ms, ... etc
                println("Coroutine $i is done")
            }
        }
    }
} // class Activity ends
```

Trong hàm *main* của chúng ta, chúng ta tạo ra activity là instance của Activity, gọi hàm *doSomething* của chúng ta và hủy activity sau 500ms. Điều này hủy bỏ tất cả các coroutines đã được đưa ra từ doSomething. Chúng ta có thể thấy điều đó bởi vì sau khi phá hủy hoạt động, không còn thông báo nào được in nữa, ngay cả khi chúng ta chờ đợi lâu hơn một chút.

```
val activity = Activity()
activity.doSomething() // run test function
println("Launched coroutines")
delay(500L) // delay for half a second
println("Destroying activity!")
activity.destroy() // cancels all coroutines
delay(1000) // visually confirm that they don't work
```

Output của ví dụ này là:

```
Launched coroutines
Coroutine 0 is done
Coroutine 1 is done
Destroying activity!
```

Như bạn có thể thấy, chỉ có hai coroutines đầu tiên in một thông điệp và những cái khác đang bị hủy bỏ bởi một invocation duy nhất job.cancel() trong Activity.destroy().

Lưu ý rằng Android có hỗ trợ của bên thứ nhất cho phạm vi coroutine trong tất cả các thực thể có vòng đời. Xem tài liệu tương ứng .

### Dữ liệu thread cục bộ
Đôi khi thật thuận tiện khi có khả năng truyền một số dữ liệu luồng cục bộ đến hoặc giữa các coroutines. Tuy nhiên, vì chúng không bị ràng buộc với bất kỳ thread cụ thể nào, điều này có thể sẽ dẫn đến boilerplate nếu được thực hiện thủ công.

Đối với ThreadLocal, chức năng mở rộng asContextElement có mặt để giải cứu. Nó tạo ra một yếu tố bối cảnh bổ sung để giữ giá trị của cái đã cho ThreadLocal và khôi phục nó mỗi khi coroutine chuyển ngữ cảnh của nó.

Thật dễ dàng để chứng minh điều đó bằng hành động:

```
threadLocal.set("main")
println("Pre-main, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
val job = launch(Dispatchers.Default + threadLocal.asContextElement(value = "launch")) {
    println("Launch start, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
    yield()
    println("After yield, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
}
job.join()
println("Post-main, current thread: ${Thread.currentThread()}, thread local value: '${threadLocal.get()}'")
```

Trong ví dụ này, chúng ta khởi chạy một coroutine mới trong nhóm luồng nền bằng cách sử dụng Dispatchers.Default , do đó, nó hoạt động trên một luồng khác với nhóm luồng, nhưng nó vẫn có giá trị của biến cục bộ luồng mà chúng tôi đã chỉ định sử dụng *threadLocal.asContextElement(value = "launch")*, bất kể luồng nào coroutine được thực hiện trên. Do đó, output (có gỡ lỗi ) là:

```
Pre-main, current thread: Thread[main @coroutine#1,5,main], thread local value: 'main'
Launch start, current thread: Thread[DefaultDispatcher-worker-1 @coroutine#2,5,main], thread local value: 'launch'
After yield, current thread: Thread[DefaultDispatcher-worker-2 @coroutine#2,5,main], thread local value: 'launch'
Post-main, current thread: Thread[main @coroutine#1,5,main], thread local value: 'main'
```

Thật dễ dàng để quên thiết lập các yếu tố bối cảnh tương ứng. Biến luồng cục bộ được truy cập từ coroutine sau đó có thể có giá trị không mong muốn, nếu luồng chạy coroutine là khác nhau. Để tránh những tình huống như vậy, nên sử dụng phương thức *ensurePresent*.

ThreadLocal có thể được sử dụng với bất kỳ nguồn nguyên thủy nào do kotlinx.coroutines cung cấp. Mặc dù vậy, nó có một giới hạn chính: khi một luồng cục bộ bị thay đổi, một giá trị mới không được truyền đến người gọi coroutine (vì một phần tử ngữ cảnh không thể theo dõi tất cả các ThreadLocaltruy cập đối tượng) và giá trị cập nhật bị mất trong lần đình chỉ tiếp theo. Sử dụng *withContext* để cập nhật giá trị của luồng cục bộ trong coroutine, xem *asContextElement* để biết thêm chi tiết.

Ngoài ra, một giá trị có thể được lưu trữ trong một hộp có thể thay đổi như `class Counter(var i: Int)`, lần lượt, được lưu trữ trong một biến luồng cục bộ. Tuy nhiên, trong trường hợp này, bạn hoàn toàn chịu trách nhiệm đồng bộ hóa các sửa đổi có khả năng đồng thời với biến trong hộp có thể thay đổi này.

Nguồn https://kotlinlang.org/docs/reference/coroutines/coroutine-context-and-dispatchers.html#children-of-a-coroutine