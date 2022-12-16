**Giới thiệu**

Chúng ta sẽ thử làm sao để để sử dụng Kotlin Coroutines trong ứng dụng android -  một cách mới để quản lý background threads mà có thể đơn giản code với việc it gọi lại callbacks như truy cập database , network .....

**Dependencies**

```
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.0.0'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.0.0'
```

**Làm sao để khởi động coroutine**

Trong thư viện kotlinx.coroutines, bạn có thể bắt đầu tạo coroutine mới bằng cách sử dụng `launch` hoặc `async` .

Xét về khái niệm , async và launch thì gần giống nhau. Nó bắt đầu với coroutine riêng biệt đó là một light-weight thread mà làm việc đồng thời với coroutines khác. Sự khác biết là launch trả về một job và không mang tới 1 giá trị trả về nào, còn async trả về 1 Deferred - light-weight non-blocking mà sẽ đại diện một lời hứa rằng cung cấp 1 giá trị trả về. Bạn có thể sử dụng `.await()` trong defferred để có kết quả cuối cùng, Nhưng Defferred cũng là job, vì thế bạn có thể hủy nó nếu có thể.
Chú ý :  
- Nếu code bên trong launch xảy ra exception, nó được coi là ngoại lệ chưa xử lý trong thread làm crashes ứng dụng
- Việc không bắt  exception bên trong async được lưu trong Deferred và không truyền được đi đâu nữa và có thể bỏ qua và không bị crash

**Coroutine dispatcher**

Trong Android, chúng ta sử dụng 2 dispatchers:

uiDispatcher : xử lý trên Android main UI thread (cho parent coroutine)

bgDispatcher : xử lý trong background thread(child coroutines)

```
// dispatches execution into Android main thread
val uiDispatcher: CoroutineDispatcher = Dispatchers.Main
// represent a pool of shared threads as coroutine dispatcher
val bgDispatcher: CoroutineDispatcher = Dispatchers.I0
```

**Coroutine scope**

Để mở coroutine bạn cần cung cấp `CoroutineScope` hoặc sử dụng `GlobalScope`

Chú ý : Tránh sử dụng `GloblaScope`

```
// GlobalScope example
class MainFragment : Fragment() {
    fun loadData() = GlobalScope.launch {  ...  }
}
// CoroutineScope example
class MainFragment : Fragment() {

    val uiScope = CoroutineScope(Dispatchers.Main)

    fun loadData() = uiScope.launch {  ...  }
}
// Fragment implements CoroutineScope example
class MainFragment : Fragment(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main

    fun loadData() = launch {  ...  }
}
```

**lauch + async(execute task)**

Parent coroutine được mở với launch với Main dispatcher.

Child coroutine được mở với async với IO dispatcher.
Chú ý : 
- Parent coroutine luôn luôn chờ cho việc hoàn thành của tất cả con của nó
- Nếu không kiểm tra Exception xảy ra, ứng dụng sẽ bị crash.

Tránh sử dụng những async/await khi không cần thiết

```
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val task = async(bgDispatcher) { // background thread
        // your blocking call
    }
    val result = task.await()
    view.showData(result) // ui thread
}
```


**launch + withContext(execute task)**

Như những ví dụ trên chạy vẫn ổn, nhưng có 1 nhược điểm là chúng ta lãng phí tài nguyên khi mở  coroutine thứ 2 để làm background job. Chúng ta có thể tối ưu hóa code của chúng ta nếu chúng ta chỉ mở một coroutine và sử dụng withContext để chuyển qua coroutine context

Parent  coroutine được mở với launch với Main dispatcher

Background job được thực thi với withContext với IO dispatcher

```
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread
    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    view.showData(result) // ui thread
}
```

**launch + withContext(thực hiện 2 task tuần tự)**

Parent  coroutine được mở với launch với Main dispatcher

Background job được thực thi với withContext với IO dispatcher

Chú ý: 
- result1 và result2 thì xử lý  tuần tự
- Nếu không bắt exception , ứng dụng sẽ bị crash

```
val uiScope = CoroutineScope(Dispatchers.Main)

fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val result1 = withContext(bgDispatcher) { // background thread
        // your blocking call
    }

    val result2 = withContext(bgDispatcher) { // background thread
        // your blocking call
    }
    
    val result = result1 + result2
    
    view.showData(result) // ui thread
}
```

**launch + withContext(thực hiện 2 task song song)**

Parent  coroutine được mở với launch với Main dispatcher

Background job được thực thi với withContext với IO dispatcher
- result1 và result2 thì xử lý  song song
- Nếu không bắt exception , ứng dụng sẽ bị crash

Bạn có thể đọc thêm : [ràng buộc việc gọi không đồng bộ với coroutineScope hoặc sử dụng SpervisorJob để xử lý exception](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e)

```
val uiScope = CoroutineScope(Dispatchers.Main)

fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val task1 = async(bgDispatcher) { // background thread
        // your blocking call
    }

    val task2 = async(bgDispatcher) { // background thread
        // your blocking call
    }

    val result = task1.await() + task2.await()

    view.showData(result) // ui thread
}
```

**Thực hiện coroutine với timeout**

Nếu bạn muốn thiết lập timeout cho coroutine job, ràng buộc suspended function với `withTimeoutOrNull`, hàm sẽ trả về null trong trường hợp timeout

```
val uiScope = CoroutineScope(Dispatchers.Main)
fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val task = async(bgDispatcher) { // background thread
        // your blocking call
    }

    // suspend until task is finished or return null in 2 sec
    val result = withTimeoutOrNull(2000) { task.await() }

    view.showData(result) // ui thread
}
```


**Làm sao để hủy 1 coroutine**

**Job**

Chức năng loadData trả về Job object mà có thể hủy được. Khi Parent coroutine bị hủy, tất cả con của nó sẽ bị hủy theo đệ quy

Nếu stopPresenting được gọi trong khi dataProvider.loadData vẫn còn trong tiến trình. view.showData sẽ không bao giờ được gọi.

```
val uiScope = CoroutineScope(Dispatchers.Main)
var job: Job? = null

fun startPresenting() {
    job = loadData()
}

fun stopPresenting() {
    job?.cancel()
}


fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }

    view.showData(result) // ui thread
}
```

**Parent job**

Một cách khác để hủy coroutine là tạo supervisorJob object và chỉ định nó trong hàm phạm vi scope. 

Chú ý : Nếu bạn hủy parent job, bạn cần tạo một đối tượng job mới để bắt đầu các coroutine mới. Đó là lý do tại sao chúng ta sử dụng cancelChildren.Bạn có thể xem thêm ở [link](https://proandroiddev.com/kotlin-coroutines-patterns-anti-patterns-f9d12984c68e) này

```
var job = SupervisorJob()
val uiScope = CoroutineScope(Dispatchers.Main + job)

fun startPresenting() {
    loadData()
}

fun stopPresenting() {
    scope.coroutineContext.cancelChildren()
}

fun loadData() = uiScope.launch {
    view.showLoading() // ui thread

    val result = withContext(bgDispatcher) { // background thread
        // your blocking call
    }

    view.showData(result) // ui thread
}
```

**lifecycle aware coroutine scope**

Với việc release của android architecture components, chúng ta có thể  tạo lifecycle có thể tự hủy khi Activity#onDestroy  xảy ra.

```
class MainScope : CoroutineScope, LifecycleObserver {

    private val job = SupervisorJob()
    override val coroutineContext: CoroutineContext
        get() = job + Dispatchers.Main

    @OnLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    fun destroy() = coroutineContext.cancelChildren()
}

// usage

class MainFragment : Fragment() {
    private val uiScope = MainScope()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(mainScope)
    }

    private fun loadData() = uiScope.launch {
        val result = withContext(bgDispatcher) {
            // your blocking call
        }
    }
}
```

**Làm sao để xử lý Exception với coroutines**

   **a) try-catch block**

Parent  coroutine được mở với launch với Main dispatcher

Background job được thực thi với withContext với IO dispatcher

Chú ý: Bạn có thể sử dụng try-catch để bắt exceptions và xử lý chúng

```
private fun loadData( ) =  GlobalScope.launch(uiDispatcher){
    view.showLoading( ) // ui tread
    try {
        // non ui thread, suspend until finished
        val result =  withContext(bgDispatcher) { dataProvider.loadData()}
        view.showData(result) //ui thread
    } catch(e: Exception){
        e.printStackTrace()
    }
}
```

Để tránh try-catch trong lớp hiện hành của bạn , tốt hơn là xử lý exception bên trong dataProvider.loadData và  trả về `Result` class chung.

```
data class Result<out T>(val success: T? = null, val error: Throwable? = null)
private fun loadData() =  launch(uiContext) {
    view.showLoading() // ui thread
    val task =  async(bgContext) { dataProvider.loadData("Task") }
    val result : Result<String> = task.await() // suspend
    
    if(result.success != null) {
        view.showData(result.success) // ui Thread
    } else if(result.error != null) {
        result.error.printStackTrace()
    }
}
```

   **b) async parent**

Parent coroutine được mở với asnc với Main dispatcher

Chú ý : Để phớt lờ bất kì exception nào, mở parent coroutine với async 

 ```
private fun loadData( ) = GlobalScope.async(uiDispatcher) { 
         view.showLoading( )  // ui thread
         
         // non ui thread, suspend untill finished
         val result = withContext(bgDispatcher) { dataProvider.loadData() }
         
         view.showData(result)
 } 
```

Trong trường hợp này, Exception sẽ được lưu ở trong  **Job** object. Để lấy nó, Bạn có thể sử dụng invokeOnCompletion.

```
var job:  Job? = null
fun startPresenting( ) {
    job =  loadData( )
    job?.invokeOnCompletion { it: Throwable? ->
        it?.printStackTrace( ) // (1)
        //or
        job?.getCompletionException( )?.printStackTrace( ) //(2)
        
        // different between (1) and (2) is that (1) will not contain CancellationException 
        // in case if job was cancelled
        
    }
}
```

 **c) launch + coroutine exception handler**

Parent coroutine được mở với launch với Main dispatcher

Background job được thực thi với withContext với IO dispatcher

Chú ý : Bạn có thể thêm `CoroutineExceptionHandler` để parent coroutine bắt exception và xử lý chúng.

```
val exceptionHandler: CoroutineContext =  CoroutineExceptionHandler {  _ ,  throwable  ->
    view.showData(throwable.message)
    job = Job( ) // exception handler cancels job
}

private fun loadData( ) = GlobalScope.async(uiDispatcher + exceptionHandler) {
    view.showLoading( )
    // non ui thread , suspend untill finished
    val result = withContext(bgDispatcher) { dataProvider.loadData( ) }
    view.showData(result)  // ui thread, not called if exception occur
}
```

**Log coroutine thread**

Để hiểu coroutine trình diễn công việc hiện tại, ban có thể bật debugging facilities `System.setProperty` và log thread name : `Thread.currentThread().name`
```
System.setProperty( "kotlin.coroutines.debug", if(BuildConfig.DEBUG) "on" else "off")

launch(UI) {
    log("Data loading started")
    
    val task1 = async{ log("A")}
    val task2 = async{ log("B")}
    
    val result = task1.await() + task2.await()
}

fun log(msg: String) {
    Log.d(TAG,"[${Thread.currentThread().name}] $msg")
}
```

Bài này mình đã đọc qua hy vọng nó có thể hữu ích cho các bạn. Nếu có gì sai xót các bạn có thể để lại comment phía dưới để mình cải thiện hơn ạ :heart_eyes::heart_eyes::heart_eyes: . Hẹn gặp lại các bạn ở bài kế tiếp ạ. 
Tài liệu tham khảo : 
- https://codelabs.developers.google.com/codelabs/kotlin-coroutines/index.html#0
- https://proandroiddev.com/android-coroutine-recipes-33467a4302e9

Source mình tham khảo được : 
- https://github.com/dmytrodanylyk/coroutine-recipes
- https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md