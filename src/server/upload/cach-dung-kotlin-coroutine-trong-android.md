# Cách để khởi chạy một coroutine

Với việc dùng thư viện [kotlinx.coroutines](https://github.com/Kotlin/kotlinx.coroutines) thì các bạn có thể chạy một coroutine mới bằng cách sử dụng hàm [launch](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/launch.html) hoặc [async](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/async.html).

Về mặt khái niệm thì `async` gần giống như `launch`. Nó khởi chạy một coroutine riêng biệt như là một light-weight thread mà chạy đồng thời với các coroutine khác. Điểm khác biệt ở đây là `launch` trả về một [Job](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-job/index.html) và không có mang bất kỳ giá trị nào, trong khi đó thì `async` trả về một [Defered](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-deferred/index.html) là một light-weight non-blocking future mà đại diện cho một lời hứa sẽ cung cấp kết quả sau. Bạn có thể dùng `.await()` với giá trị `defered` để nhận kết quả thực sự. `Defered` cũng là một `Job` nên bạn có thể cancel nó khi cần thiết.

`launch`
```kotlin
public actual fun launch(
    context: CoroutineContext = DefaultDispatcher,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    parent: Job? = null,
    block: suspend CoroutineScope.() -> Unit
): Job {
    val newContext = newCoroutineContext(context, parent)
    val coroutine = if (start.isLazy)
        LazyStandaloneCoroutine(newContext, block) else
        StandaloneCoroutine(newContext, active = true)
    coroutine.start(start, coroutine, block)
    return coroutine
}
```

`async`
```kotlin
public actual fun <T> async(
    context: CoroutineContext = DefaultDispatcher,
    start: CoroutineStart = CoroutineStart.DEFAULT,
    parent: Job? = null,
    block: suspend CoroutineScope.() -> T
): Deferred<T> {
    val newContext = newCoroutineContext(context, parent)
    val coroutine = if (start.isLazy)
        LazyDeferredCoroutine(newContext, block) else
        DeferredCoroutine<T>(newContext, active = true)
    coroutine.start(start, coroutine, block)
    return coroutine
}
```

Khi khởi chạy coroutine mà không có context thì mặc định nó sẽ dùng context `DefaultDispatcher` và theo định nghĩa trong doc thì đó là `CommonPool`

```kotlin
public actual val DefaultDispatcher: CoroutineDispatcher = CommonPool
```

Nên các khai báo sau là tương đương
```kotlin
    launch {} and launch(CommonPool) {}
    async {} and async(CommonPool) {}
```

Khi xảy ra `exception`:
- trong `launch` thì nó sẽ được coi như là một exception chưa được bắt trong luồng xử lý của ứng dụng và có thể gây crash. 
-  trong `async` sẽ được lưu trữ trong kết quả là `Defered` và không truyền đi đâu nữa, nó sẽ bị ngầm bỏ qua nếu không được xử lý.

## Coroutine Context

Trong Android chúng ta thường sử dụng hai context sau:

- `uiContext (hay UI)`: xử lý code trên Android main UI thread (cho coroutine cha).
- `bgContext (hay CommonPool)`: xử lý code trên background thread (cho coroutine con).

```kotlin
    // android ui main thread
    val uiContext: CoroutineContext = UI

    // common pool of shared thread
    val bgContext: CoroutineContext = CommonPool
```

Trong các ví dụ tiếp theo chúng ta sẽ sử dụng [CommonPool](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-common-pool/index.html) cho `bgContext`, nó có giới hạn số thread có thể chạy song song theo giá trị `Runtime.getRuntime.availableProcessors()-1`. Nên nếu một công việc được đặt lịch, nhưng tất cả luồng đang được sử sụng thì nó sẽ vào hàng đợi.

## launch + async (thực hiện task)

Coroutine cha khởi chạy qua `launch` với `UI` context.

Coroutine con khởi chạy qua `async` với `CommonPool` context.

Note: Nếu có exception trong launch thì app sẽ crash.

```kotlin
    fun loadData() = launch(UI) { 
        view.showLoading() // ui thread
        val task = async(CommonPool) { 
            dataProvider.loadData()  // non ui thread
        }
        val result = task.await() // suspend until finished
        view.showData(result) // ui thread
    }
```

## launch + withContext (thực hiện task)

Ví dụ trên chạy khá ổn, tuy nhiên chúng ta lại lãng phí tài nguyên khi khởi chạy thêm một coroutine thứ hai để thực hiện background job. Chúng ta có thể tối ưu đoạn này bằng cách chỉ khởi chạy một coroutine và sử dùng `withContext` để có thể chuyển coroutine context.

Coroutine cha được khởi chạy qua `launch` với `UI` context.

Background job được thực hiện qua `withContext` với `CommonPool` context.

Note: Nếu có exception trong launch thì app sẽ crash.

```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread
        
        // non ui thread, suspend util finished
        val result = withContext(CommonPool) { dataProvider.loadData() }
        
        view.showData(result) // ui thread
    }
 ```

## launch + withContext (thực hiện 2 task lần lượt)

Coroutine cha khởi chạy qua `launch` với `UI` context

Background job được thực hiện qua `withContext` với `CommonPool` context.

Note: `result1` và `result2` được thực hiện lần lượt.

Note: Nếu có exception trong launch thì app sẽ crash.

```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread

        // non ui thread, suspend util finished
        val result1 = withContext(CommonPool) { dataProvider.loadData() }

        // non ui thread, suspend util finished
        val result2 = withContext(CommonPool) { dataProvider.loadData() }
        
        val result = result1 + result2

        view.showData(result) // ui thread
    }
```

## launch + async + async (thực hiện 2 task song song)

Coroutine cha khởi chạy qua `launch` với `UI` context

Coroutine con khởi chạy qua `async` với `CommonPool` context.

Note: `task1` và `task2` được thực hiện song song.

Note: Nếu có exception trong launch thì app sẽ crash.

```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread

        val task1 = async(CommonPool) { dataProvider.loadData() }
        val task2 = async(CommonPool) { dataProvider.loadData() }

        // non ui thread, suspend util finished
        val result = task1.await() + task2.await()

        view.showData(result) // ui thread
    }
```

# Cách khởi chạy một coroutine với timeout

Nếu bạn muốn đặt một timeout cho một coroutine job, đóng gói suspended fun với `withTimeoutNull` sẽ return null khi timeout.
```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread

        val task = async(CommonPool) { dataProvider.loadData() }

        // non ui thread, suspend util task is finished or return null in 2 sec
        val result = withTimeoutOrNull(2, TimeUnit.SECONDS) { task.await()}

        view.showData(result) // ui thread
    }
```

# Cách để cancel một coroutine

## job

Hàm `loadData` return một object [Job](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.experimental/-job/index.html)  mà có thể bị cancel. Khi coroutine cha bị cancel thì tất cả các coroutine con của nó cũng sẽ bị cancel.

Nếu `stopPresenting()` được gọi trong khi `dataProvider.loadData()` đang được thực hiện, thì hàm `view.showData()` sẽ không bao giờ được gọi nữa.

```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread

        val task = async(CommonPool) { dataProvider.loadData() }

        // non ui thread, suspend util finished
        val result = task.await()

        view.showData(result) // ui thread
    }
    
    var job: Job? = null
    
    fun startPresenting() { job = loadData() }
    
    fun stopPresenting() { job?.cancel() }
```


## parent job

Một cách khác để cancel coroutine là tạo ra object `Job` và truyền nó vào khi khởi tạo coroutine như là parent job.

Note: Nếu bạn cancel parent job, bạn cần phải tạo object Job mới để có thể khởi chạy các coroutine mới.

```kotlin
    val job: Job = Job()

    fun stopPResenting() { job.cancel() }
    
    fun loadData() = launch(UI + job) { 
        ...
    }
```

## lifecycle aware job

Với sự ra đời của [Android Architecture Components](https://developer.android.com/topic/libraries/architecture/lifecycle) chúng ta có thể tạo lifecycle aware job mà tự động cancel khi Activity#onDestroy được gọi.

```kotlin
    fun loadData() = launch(UI + job) {
        
    }

    /**
     * Lifecycle aware [Job] is automatically cancelled when 
     * [Activity#onDestroy] event occurs
     */
    class AndroidJob(lifecycle: Lifecycle) : Job by Job(), LifecycleObserver {
        init {
            lifecycle.addObserver(this)
        }

        @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
        fun destroy() = cancel()
    }
```

# Xử lý exception với coroutine

## try-catch

Coroutine cha được khởi chạy thông qua `launch` với `UI` context

Coroutine con được khởi chạy thông qua `async` với `CommonPool` context

Giả sử `dataProvider.loadData()` sẽ tạo ra exception. Khi đó, bạn có thể dùng khối `try-catch` để bắt `exception` và xử lý.

Note: Có thể bạn sẽ thắc mắc rằng mình đã nói **exception trong async không bị bắn ra ngoài thì làm sao mà phải** `try-catch` nhỉ? Thực sự thì exception trong async không bị bắn ra ngoài **cho đến khi bạn thực hiện lời gọi** `task.await()`.

```kotlin
    fun loadData() = launch(UI) {
        view.showLoading() // ui thread
        try {
            // non ui thread
            val task = async(CommonPool) { dataProvider.loadData() }
            val result: Result = task.await() // suspend until finished
            view.showData(result) // ui thread
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
```

Đế tránh phải dùng class logic, bạn có thể xử lý exception trong `dataProvider.loadData()` và cho nó trả về class Result như sau

```kotlin
sealed class Result()
class Success : Result()
class Error : Result()

    fun loadData() = launch(UI) {
        view.showLoading() // ui thread

        // non ui thread
        val task = async(CommonPool) { dataProvider.loadData() }
        val result: Result = task.await() // suspend until finished

        when (result) {
            is Success -> view.showData(result.success) // ui thread
            is Error -> result.error.printStackTrace()
        }
    }
```

## async + async

`Async` khác với `launch` ở chỗ, nếu có` exception` trong `launch` mà không được handle thì app sẽ crash, còn `async` thì không. Exception sẽ được lưu trữ ở `Defered` là kết quả trả về của async. `Defered` cũng là một `Job` nhưng có mang giá trị trả về, còn `Job` thì không mang giá trị. Nếu `exception` trong async không được xử lý thì nó sẽ ngầm bị bỏ qua.

```kotlin
    fun loadData() = async(UI) {
        view.showLoading() // ui thread
        // non ui thread
        val task = async(CommonPool) { dataProvider.loadData() }
        val result: Result = task.await() // suspend until finished
        view.showData(result) // ui thread
    }
```

Trong trường hợp trên thì `exception` sẽ được lưu trong Job. Để có thể lấy chúng ra bạn có thể dùng hàm `invokeCompletion()`

```kotlin
    var job: Job? = null
    
    fun startPresenting() {
        job = loadData()
        job?.invokeCompletion { it: Throwable? ->
            it?.printStackTrace() // (1) not contain CancellationException in case job was cancelled
            // or
            job?.getCancellationException()?.printStackTrace() // (2) ob was cancelled
        }
    }
```

## launch + coroutine exception handler

Một cách khác để các bạn có thể xử lý exception xảy ra trong `launch` là tạo một exceptionHandler và thêm nó vào param khi khởi chạy coroutine.

```kotlin
    val exceptionHandler: CoroutineContext = CoroutineExceptionHandler { _, throwable -> throwable.printStackTrace() }

    fun loadData() = launch(UI + exceptionHandler) {
        view.showLoading() // ui thread
        // non ui thread
        val task = async(CommonPool) { dataProvider.loadData() }
        val result: Result = task.await() // suspend until finished
        view.showData(result) // ui thread
    }
```

# Cách để log Coroutine thread

Để có thể hiểu coroutine đang làm gì, bạn có thể sử dụng `Thread.currentThread().name` để log lại thread name 

```kotlin
    fun loadData() = launch(UI + exceptionHandler) {
        view.showLoading() // ui thread
        log(Thread.currentThread().name)
        // non ui thread
        val task = async(CommonPool) {
            dataProvider.loadData()
            log(Thread.currentThread().name)
        }
        og(Thread.currentThread().name)
        val result: Result = task.await() // suspend until finished
        view.showData(result) // ui thread
    }
```

**Bài đến đây là hết rồi, hẹn gặp lại các bạn ở các bài tiếp theo ( ^ _ ^ ).**

# Nguồn và tham khảo

**Android Coroutine Recipes**

https://proandroiddev.com/android-coroutine-recipes-33467a4302e9

**kotlinx.coroutines**

https://github.com/Kotlin/kotlinx.coroutines