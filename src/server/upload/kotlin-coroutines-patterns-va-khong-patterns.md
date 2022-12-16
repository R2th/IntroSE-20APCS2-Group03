Coroutines- một tính năng rất mạnh của Kotlin, nhưng chưa được apply rộng rãi trong Android, và các developer cũng chưa hiểu nhiều về nó.  Bài này xin phép được giới thiệu một số điểm chú ý khi dùng coroutine.

**1. Gói async trong 1 coroutineScope hoặc sử dụng SupervisorJob đển handle exceptions**

❌ Nếu async block có thể throw exception, không nên tin tưởng vào try/catch  

```java
val job: Job = Job()
val scope = CoroutineScope(Dispatchers.Default + job)
// may throw Exception
fun doWork(): Deferred<String> = scope.async { ... }   // (1)
fun loadData() = scope.launch {
    try {
        doWork().await()                               // (2)
    } catch (e: Exception) { ... }
}
```

ở ví dụ trên, hàm doWork chạy một coroutine mới mà có thể throw một exception. Nếu ta cố gói doWork với try/catch, nó vẫn crash. Điều này xảy ra bởi vì bất kỳ một job'children fail sẽ lập tức dẫn đến parent job fail.

✅ Sử dụng một SupervisorJob

một child cancel hoặc fail sẽ không ảnh hưởng đến các child khác.

```java
val job = SupervisorJob()                               // (1)
val scope = CoroutineScope(Dispatchers.Default + job)
// may throw Exception
fun doWork(): Deferred<String> = scope.async { ... }
fun loadData() = scope.launch {
    try {
        doWork().await()
    } catch (e: Exception) { ... }
}
```

Note: nó sẽ chỉ work nếu bạn chạy async tường minh trên coroutine scope  với SupervisorJob. Vì vậy code phía dưới đây vẫn crash vì async chạy trên scope của parent coroutine.

```java
val job = SupervisorJob()                               
val scope = CoroutineScope(Dispatchers.Default + job)
fun loadData() = scope.launch {
    try {
        async {                                         // (1)
            // may throw Exception 
        }.await()
    } catch (e: Exception) { ... }
}
```

✅ Một cách khác để tránh crash, là wrap async trong coroutineScope. khi 1 exception xảy ra bên trong một async, nó sẽ cancel các coroutines được tạo trong scope, mà không ảnh hưởng đến các outer scope.

```java
val job = SupervisorJob()                               
val scope = CoroutineScope(Dispatchers.Default + job)
// may throw Exception
fun doWork(): Deferred<String> = coroutineScope {     // (1)
    async { ... }
}
fun loadData() = scope.launch {                       // (2)
    try {
        doWork().await()
    } catch (e: Exception) { ... }
}
```

**2. Nên sử dụng Main dispatcher cho root coroutine**

❌ nếu bạn cần một background work abd update UI trong root coroutine, không chạy nó với non-Main dispatcher.

```java
val scope = CoroutineScope(Dispatchers.Default)          // (1)
fun login() = scope.launch {
    withContext(Dispatcher.Main) { view.showLoading() }  // (2)  
    networkClient.login(...)
    withContext(Dispatcher.Main) { view.hideLoading() }  // (2)
}
```

Trong example ở trên, chung ta chạy một root coroutine sử dụng scope với Default dispatcher. Như vậy mỗi lần chúng ta sử dụng UI, chúng ta phải switch context.

✅ trong hầu hết trường hợp, nên tạo scope với Main dispatcher  với code đơn giản hơn và ít khai báo tường minh cho chuyển context.

```java
val scope = CoroutineScope(Dispatchers.Main)
fun login() = scope.launch {
    view.showLoading()    
    withContext(Dispatcher.IO) { networkClient.login(...) }
    view.hideLoading()
}
```

**3. Tránh sử dụng các async/wait không cần thiết**

❌ Nếu sử dụng async theo bởi một immediate await, bạn cần ngưng sử dụng nó.

```java
launch {
    val data = async(Dispatchers.Default) { /* code */ }.await()
}
```

✅ Nếu bạn muốn chuyển coroutine context và ngay lập tức suspend parent coroutine thì khuyên bạn nên dùng withContext.

```java
launch {
    val data = withContext(Dispatchers.Default) { /* code */ }
}
```

**4. Tránh cancel scope job**

❌ Nếu bạn cần cancel coroutine, đừng cancel scope job trước

```java
class WorkManager {
    val job = SupervisorJob()
    val scope = CoroutineScope(Dispatchers.Default + job)
    fun doWork1() {
        scope.launch { /* do work */ }
    }
    fun doWork2() {
        scope.launch { /* do work */ }
    }
    fun cancelAllWork() {
        job.cancel()
    }
}
fun main() {
    val workManager = WorkManager()
    workManager.doWork1()
    workManager.doWork2()
    workManager.cancelAllWork()
    workManager.doWork1() // (1)
}
```

Vấn đề của đoạn code ở trên là khi bạn cancel job, bạn đẩy nó vào trạng thái completed. Những coroutine đã chạy trên scope của completed job sẽ không được executed.

✅ khi muốn cancel tất cả coroutine của một scope nhất định, có thể dùng function cancelChildren. 

```java
class WorkManager {
    val job = SupervisorJob()
    val scope = CoroutineScope(Dispatchers.Default + job)
    fun doWork1(): Job = scope.launch { /* do work */ } // (2)
    fun doWork2(): Job = scope.launch { /* do work */ } // (2)
    fun cancelAllWork() {
        scope.coroutineContext.cancelChildren()         // (1)                             
    }
}

fun main() {
    val workManager = WorkManager()
    workManager.doWork1()
    workManager.doWork2()
    workManager.cancelAllWork()
    workManager.doWork1()
}
```

**5. không viết suspend function với một implicit dispatcher **
❌ không viết suspend function mà tin tưởng vào một coroutine dispatcher xác định

```java
suspend fun login(): Result {
    view.showLoading()
    val result = withContext(Dispatcher.IO) {  
        someBlockingCall() 
    }
    view.hideLoading()
    return result
}
```

Ở trên, function login là một suspend function sẽ crash nếu bạn execute nó từ một coroutine sử dụng non-Main dispatcher.

```java
launch(Dispatcher.Main) {     // (1) no crash
    val loginResult = login()
    ...
}
launch(Dispatcher.Default) {  // (2) cause crash
    val loginResult = login()
    ...
}
```

CalledFromWrongThreadException: Only the original thread that created a view hierarchy can touch its views.

✅ Thiết kế suspend function theo một cách để có thể executed từ bất kỳ coroutine dispatcher nào:

```java
suspend fun login(): Result = withContext(Dispatcher.Main) {
    view.showLoading()
    val result = withContext(Dispatcher.IO) {  
        someBlockingCall() 
    }
    view.hideLoading()
return result
}
```

Nguồn: https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e