## What’s a Coroutine?
![](https://images.viblo.asia/31b79f98-6b73-425e-8abe-5de1f91aaa4e.gif)

Coroutine về cơ bản có thể hiểu nó như một "light-weight" thread, nhưng nó không phải là 1 thread, chúng chỉ hoạt động tương tự 1 thread. Một số có thể chạy song song, chờ đợi và giao tiếp với nhau như một thread thông thường. Sự khác biệt duy nhất giữa việc sử dụng coroutine và thread là chúng ta không cần phải lo lắng về vấn đề hiệu suất khi xử lý các hoạt động bất đồng đối với coroutine, còn đối với thread thì ngược lại.

Bài viết này sẽ xoay quanh 3 vấn đề chính:
* **Suspend Functions**
* **Coroutine Context (Scopes and Jobs)**
* **Coroutine Builders (Launch + Async)**

###  1. Suspend Functions: The meat of Coroutine Programming
```java
@UiThread
suspend fun someSlowMethod(): Int {
    delay(5000)
    return 1
}
```
Nếu **someSlowMethod()** là một hàm thông thường, nó sẽ block UI  thread. Tuy nhiên, bằng việc sử dụng  `suspend function`,  thay vì blocking cho tới khi function trả về result như một function bình thường, nó sẽ trì hoãn lại việc thực thi cho đến khi result sẵn sàng và nó sẽ tiếp tục lại sau khi kết thúc cùng với result. Trong lúc trì hoãn để đợi result, nó sẽ unblock thread mà nó đang chạy trên cho nên các function hoặc coroutines khác có thể chạy bình thường.

### 2. Coroutine Context – Scopes and Jobs
```java
val mJob = Job()
val uiScope = CoroutineScope(Dispatchers.Main + mJob)
```

**Job**: nắm giữ thông tin về lifecycle của coroutine

**Dispatcher**: Quyết định thread mà coroutine sẽ chạy trên đó.

Tất cả các coroutines đều chạy trong một scope. Một job có thể là 1 coroutine độc lập. Các coroutines được khởi tạo và thực hiện các công việc riêng biệt và cần được hủy bỏ khi không còn sử dụng. Chúng ta có thể hủy bỏ cách thủ công từng coroutine bằng gọi hàm `cancel()`. Ngoài ra, coroutines cung cấp một lớp có khả năng quản lý vòng đời của các coroutines: **CoroutineScope**

**Cancelling Jobs**
```java
override fun onDestroy() {
    super.onDestroy()
    uiScope.coroutineContext.cancel()
}
```

**Dispatchers.Main:** chạy trên main UI thread

**Dispatchers.IO:** chạy trên background thread của thread pool. Phù hợp với việc đọc ghi dữ liệu hoặc thực hiện network transaction.

**Dispatchers.Default:** chạy trên background thread của thread pool. Bị giới hạn bởi số nhân của CPU. Phù hợp với việc tính toán phức tạp.

**Dispatchers.Unconfined:** Chạy coroutines không giới hạn cho bất kỳ thread cụ thể. Unconfined coroutines bắt đầu trong thread hiện tại và tiếp tục trong bất kỳ thread nào được chuyển sang trong coroutine function.

### 3. Coroutine Builders – Running Suspend Functions from Regular Functions
* **launch**: start một coroutine a background và trả về 1 job. Phù hợp trong trường hợp không quan tâm kết quả trả về. Ví dụ: request thay đổi color hoặc tracking một số thông tin without return.
```
public fun CoroutineScope.launch(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> Unit
): Job {
...
}
```

* **async** - thực hiện một hoạt động không đồng bộ và trả về một deferred object có chứa giá trị trả về của coroutine. Và khi cần lấy giá trị này thì ta sử dụng `.await()` chờ đợi cho một kết quả mà không gây block thread, vì vậy ta cũng có thể cancel nó bằng `.cancel()`
```
public fun <T> CoroutineScope.async(
    context: CoroutineContext = EmptyCoroutineContext,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    block: suspend CoroutineScope.() -> T
): Deferred<T> {
...
}
```
Ví dụ về `launch` và `async`:

![](https://images.viblo.asia/ff37c496-7010-4ee7-8ff3-29d4cff8bc58.gif)
![](https://images.viblo.asia/07ff7ee2-7599-49df-8835-c65c40d7ec2b.gif)

Chúng ta thử run 2 ví dụ để hiểu rõ hơn về `launch` và `async`.

```java
class MainActivity : AppCompatActivity() {
    val mJob = Job()
    val uiScope = CoroutineScope(Dispatchers.Main + mJob)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        uiScope.launch{
            testLaunch()
            testAsync()
        }
    }
}
```
* **launch**
```java
suspend fun testLaunch() {
    var resultOne = "Hardstyle"
    var resultTwo = "Minions"
    Log.i("Launch", "Before")
    launch(Dispatchers.IO) {resultOne = function1() }
    launch(Dispatchers.IO) {resultTwo = function2() }
    Log.i("Launch", "After")
    val resultText = resultOne + resultTwo
    Log.i("Launch", resultText)
}
suspend fun function1(): String {
    delay(1000L)
    val message = "function1"
    Log.i("Launch", message)
    return message
}
suspend fun function2(): String {
    delay(100L)
    val message = "function2"
    Log.i("Launch", message)
    return message
}

----------------
Result
----------------

Launch: Before
Launch: After
Launch: HardstyleMinions //don't wait for results
Launch: function2   // 2 first
Launch: function1
```

**async**
```java
suspend fun testAsync() {
    Log.i("Async", "Before")
    val resultOne = Async(Dispatchers.IO) { function1() }
    val resultTwo = Async(Dispatchers.IO) { function2() }
    Log.i("Async", "After")
    val resultText = resultOne.await() + resultTwo.await()
    Log.i("Async", resultText)
}
suspend fun function1(): String {
    delay(1000L)
    val message = "function1"
    Log.i("Async", message)
    return message
}
suspend fun function2(): String {
    delay(100L)
    val message = "function2"
    Log.i("Async", message)
    return message
}

----------------
Result
----------------

Async: Before
Async: After
Async: function2 //2 first
Async: function1
Async: function1function2 //wait for results and block.
```

#### Reference: 
**[Coroutine Basics: Asynchronous Programming with Kotlin](https://www.ericdecanini.com/2019/05/06/coroutine-basics/)**