# Coroutines là gì
Về cơ bản, coroutines là những thread nhẹ. Nó cho phép chúng ta viết mã bất đồng bộ.

## Làm cách nào để import Kotlin Coroutines trong Android?

Theo repo của Kotlin Coroutines Github, chúng ta cần import kotlinx-coroutines-core và kotlinx-coroutines-android (Thư viện này hỗ trợ cho luồng chính của Android giống như thư viện io.reactivex.rxjava2: rxandroid các ngoại lệ chưa được lưu có thể được ghi lại trước khi làm crash ứng dụng.). Hơn nữa, nếu bạn sử dụng RxJava trong dự án của mình, vui lòng thêm kotlinx-coroutines-rx2 để sử dụng coroutines với RxJava. Thư viện này giúp chuyển RxJava sang Coroutines.
Import chúng vào dự án của bạn bằng cách thêm code sau vào app/build.gradle.

```
implementation  'org.jetbrains.kotlinx: kotlinx-coroutines-core: 1.3.2'
implementation  'org.jetbrains.kotlinx: kotlinx-coroutines-android: 1.3.2'
implementation  "org.jetbrains.kotlinx: kotlinx-coroutines-rx2: 1.3.2"
```

và thêm phiên bản Kotlin mới nhất vào root / build.gradle của bạn.
```
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        jcenter()
        ...
    }
    ...
}
```

# Coroutines cơ bản
Đầu tiên, Coroutines về cơ bản trông giống như thế này:

```
CoroutineScope(Dispatchers.Main + Job()).launch {
  val user = fetchUser() // A suspending function running in the I/O thread.
  updateUser(user) // Updates UI in the main thread.
}

private suspend fun fetchUser(): User = withContext(Dispatchers.IO) {
  // Fetches the data from server and returns user data.
}
```

Ta lấy dữ liệu từ máy chủ trong background thread và sau đó cập nhật giao diện người dùng trong main thread.
## Suspending functions
Có một functions đặc biệt gọi là Suspending function trong Corlinines của Kotlin, chúng ta có thể khai báo functions bằng từ khóa suspend. Các Suspending function có thể tạm dừng việc thực thi một coroutine, có nghĩa là nó sẽ đợi cho đến khi các  Suspending function hoạt động trở lại. Vì bài đăng này là dành cho khái niệm cơ bản của Coroutines, chúng tôi sẽ thảo luận chi tiết hơn về các chức năng treo trong bài khác.
Hãy để quay trở lại đoạn code ở trên, nó có thể được chia thành bốn phần:
![](https://miro.medium.com/max/2552/1*8AyDbZh5VnQ1QrEmqxEr6A.png)

## CoroutineScope
> Định nghĩa một phạm vi cho các coroutines mới. Mỗi trình xây dựng coroutine là một phần mở rộng trên CoroutineScope và kế thừa coroutineContext của nó để tự động truyền cả các yếu tố bối cảnh và hủy bỏ.

Tất cả các coroutine chạy bên trong một CoroutineScope và nó cần một CoroutineContext (tôi sẽ nói về nó sau) như một tham số. Có một số phạm vi chúng tôi có thể sử dụng:

1.  CoroutineScope

Tạo phạm vi với CoroutineContext tùy chỉnh. Ví dụ, để xác định luồng, công việc mẹ và xử lý ngoại lệ theo nhu cầu của chúng ta.
    
```
    CoroutineScope(Dispatchers.Main + job + exceptionHandler).launch {
    ...
    }
```


2.  MainScope

Tạo phạm vi chính cho các thành phần UI. Nó đang chạy trên luồng chính với Trình giám sát (), có nghĩa là sự thất bại của một trong những công việc con của nó đã giành được ảnh hưởng đến những người khác.

3.  Toàn cầu

Đây là một phạm vi mà không ràng buộc với bất kỳ công việc nào. Nó được sử dụng để khởi chạy các coroutines cấp cao nhất đang hoạt động trên toàn bộ thời gian ứng dụng và không bị hủy sớm.

##  CoroutineContext
Coroutine luôn thực thi trong một số ngữ cảnh được biểu thị bằng một giá trị của loại CoroutineContext. CoroutineContext là một tập hợp các phần tử, để xác định chính sách luồng, xử lý ngoại lệ, kiểm soát thời gian tồn tại của coroutine, v.v. Chúng ta có thể sử dụng toán tử cộng để kết hợp các yếu tố của CoroutineContext.
Có ba bối cảnh Coroutine quan trọng nhất - Công văn, CoroutineExceptionHandler và Job.

1. Dispatchers

    Xác định chủ đề nào chạy coroutine. Một coroutine có thể chuyển đổi bộ điều phối bất cứ lúc nào với withContext ().

* Dispatchers.Default:
Sử dụng một shared background pool của thread. Theo mặc định, số lượng thread tối đa được sử dụng bởi Dispatchers này bằng với số lõi CPU, nhưng ít nhất là hai.
* Dispatchers.IO:
Chia sẻ các chủ đề với Dispatchers.Default, nhưng số lượng các chủ đề bị giới hạn bởi kotlinx.coroutines.io.
* Dispatchers.Main:
Tương đương với main thread của Android.
* Dispatchers.Unconfined:
Coroutine dispatcher không giới hạn bất kỳ thread cụ thể nào. Coroutine thực thi trong luồng hiện tại trước và cho phép coroutine tiếp tục trong bất kỳ luồng nào được sử dụng bởi suspending function tương ứng.

```
CoroutineScope(Dispatchers.Unconfined).launch {
    // Writes code here running on Main thread.
    
    delay(1_000)
    // Writes code here running on `kotlinx.coroutines.DefaultExecutor`.
    
    withContext(Dispatchers.IO) { ... }
    // Writes code running on I/O thread.
    
    withContext(Dispatchers.Main) { ... }
    // Writes code running on Main thread.
}
```
2. CoroutineExceptionHandler
> Thông thường, các  uncaught exceptions chỉ có thể là kết quả của các coroutines được tạo bằng launch builder. Một coroutine được tạo bằng async luôn bắt tất cả các ngoại lệ của nó và thể hiện chúng trong resulting Deferred object.

Ví dụ 1: Không thể bắt IOException () với bên ngoài try-catch.
Ta không thể bọc toàn bộ CoroutineScope bằng try-catch, ứng dụng sẽ vẫn bị crash.

```
try {
  CoroutineScope(Dispatchers.Main).launch {
    doSomething()
  }
} catch (e: IOException) {
  // Cannot catch IOException() here.
  Log.d("demo", "try-catch: $e")
}

private suspend fun doSomething() {
  delay(1_000)
  throw IOException()
}
```

Ví dụ 2: Bắt IOException () với CoroutineExceptionHandler.
Nếu ngoại lệ không phải là CancellingException (), ví dụ, IOException (), thì nó sẽ được truyền tới CoroutineExceptionHandler.
```
// Handles coroutine exception here.
val handler = CoroutineExceptionHandler { _, throwable ->
  Log.d("demo", "handler: $throwable") // Prints "handler: java.io.IOException"
}

CoroutineScope(Dispatchers.Main + handler).launch {
  doSomething()
}

private suspend fun doSomething() {
  delay(1_000)
  throw IOException()
}
```
Ví dụ 3: CancellingException () bị bỏ qua.
Nếu ngoại lệ là CancellingException thì nó sẽ bị bỏ qua (Bởi vì đó là cơ chế để hủy bỏ coroutine đang chạy, và ngoại lệ này sẽ không được truyền tới CoroutineExceptionHandler.)
```
// Handles coroutine exception here.
val handler = CoroutineExceptionHandler { _, throwable ->
  // Won't print the log because the exception is "CancellationException()".
  Log.d("demo", "handler: $throwable")
}

CoroutineScope(Dispatchers.Main + handler).launch {
  doSomething()
}

private suspend fun doSomething() {
  delay(1_000)
  throw CancellationException()
}
```
Ví dụ 4: Sử dụng invokeOnCompletion để lấy tất cả thông tin ngoại lệ.
CancellingException () sẽ không được truyền tới CoroutineExceptionHandler. Nếu muốn in một số thông tin sau khi ngoại lệ xảy ra,  ta có thể sử dụng invokeOnCompletion .
```

val job = CoroutineScope(Dispatchers.Main).launch {
  doSomething()
}

job.invokeOnCompletion {
    val error = it ?: return@invokeOnCompletion
    // Prints "invokeOnCompletion: java.util.concurrent.CancellationException".
    Log.d("demo", "invokeOnCompletion: $error")
  }
}

private suspend fun doSomething() {
  delay(1_000)
  throw CancellationException()
}
```

3. Job

    Kiểm soát lifetime  của coroutine. Một Job có các trạng thái sau:
    Chúng ta chỉ cần sử dụng Job.isActive để biết trạng thái hiện tại của Job.
    ![](https://miro.medium.com/max/488/1*5oab4JxadVgI1FMMD7ibow.png)
    
    Và đây là luồng trạng thái thay đổi:
     ![](https://miro.medium.com/max/746/1*CCJhELlnsO0j1TifWIO6_A.png)
    
- Một Job đang hoạt động trong khi coroutine đang làm việc.
- Job lỗi với exception làm cho nó bị hủy bỏ. Một job có thể bị hủy bất cứ lúc nào với chức năng hủy buộc nó chuyển sang trạng thái hủy ngay lập tức.
- Job sẽ bị hủy khi hoàn thành việc thực hiện công việc của mình.
- Job cha sẽ trong trạng thái hoàn thành hoặc hủy bỏ để chờ tất cả các Job con của nó hoàn thành trước khi nó hoàn thành. Lưu ý rằng trạng thái hoàn thành là hoàn toàn nội bộ của Job. Đối với bên ngoài, một Job hoàn thành vẫn đang hoạt động, trong khi bên trong nó đang chờ đợi Job con của nó.


(3.1) Phân cấp cha - con
Sau khi nhận ra các trạng thái, chúng ta cần biết hệ thống phân cấp cha-con hoạt động như thế nào.Nếu ta viết code như thế này:

```
val parentJob = Job()
val childJob1 = CoroutineScope(parentJob).launch {
    val childJob2 = launch { ... }
    val childJob3 = launch { ... }
}
```

Thì hệ thống phân cấp cha-con sẽ như thế này:
 ![](https://miro.medium.com/max/730/1*JwutKNB7q0ZcfRY7DrLAkA.png)
 
Chúng ta có thể thay đổi Job cha như thế này:

```
val parentJob1 = Job()
val parentJob2 = Job()
val childJob1 = CoroutineScope(parentJob1).launch {
    val childJob2 = launch { ... }
    val childJob3 = launch(parentJob2) { ... }
}
```

Thì hệ thống phân cấp cha-con sẽ như thế này:
 ![](https://miro.medium.com/max/814/1*JkghVnSySlGpzeFI_EUZ1g.png)

Dựa vào kiến thức ở trên, có nhiều khái niệm quan trọng mà chúng ta cần biết cho một Job.
Hủy bỏ Job cha dẫn đến hủy bỏ ngay lập tức của tất cả các Job con của nó.

```
val parentJob = Job()
CoroutineScope(Dispatchers.Main + parentJob).launch {
    val childJob = launch {
        delay(5_000)
        
        // This function won't be executed because its parentJob is 
        // already cancelled after 1 sec. 
        canNOTBeExcecuted()
    }
    launch {
        delay(1_000)
        parentJob.cancel() // Cancels parent job after 1 sec.
    }
}
```

Thất bại hoặc hủy bỏ một Job con có ngoại lệ khác với CancellingException ngay lập tức hủy bỏ Job cha của nó và những Job con khác. Nhưng nếu ngoại lệ là CancellingException, các Job khác không thuộc Job bị hủy sẽ không bị ảnh hưởng.

Nếu chúng ta ném CancellingException, chỉ có Job theo childJob1 sẽ bị hủy.

```
val parentJob = Job()
CoroutineScope(Dispatchers.Main + parentJob).launch {
  val childJob1 = launch {
    val childOfChildJob1 = launch {
      delay(2_000)
      // This function won't be executed since childJob1 is cancelled.
      canNOTBeExecuted()
    }
    delay(1_000)
    
    // Cancel childJob1.
    cancel()
  }

  val childJob2 = launch {
    delay(2_000)
    canDoSomethinghHere()
  }

  delay(3_000)
  canDoSomethinghHere()
}
```

Nếu ta ném IOException vào một trong những Job con, tất cả các công việc liên quan sẽ bị hủy:

```
val parentJob = Job()
val handler = CoroutineExceptionHandler { _, throwable ->
  Log.d("demo", "handler: $throwable") // Prints "handler: java.io.IOException"
}

CoroutineScope(Dispatchers.Main + parentJob + handler).launch {
  val childJob1 = launch {
    delay(1_000)
    // Throws any exception "other than CancellationException" after 1 sec.
    throw IOException() 
  }

  val childJob2 = launch {
    delay(2_000)
    // The other child job: this function won't be executed.
    canNOTBExecuted()
  }

  delay(3_000)
  // Parent job: this function won't be executed.
  canNOTBExecuted()
}
```

CancChildren (): Job cha có thể hủy bỏ Job con của mình (bao gồm tất cả con cái của chúng theo cách đệ quy) mà không hủy bỏ chính nó. Lưu ý nếu một Job bị hủy, nó không thể được sử dụng như một công việc mẹ để chạy lại coroutine.

Nếu sử dụng Job.cancel(), Job cha sẽ bắt đầu bị hủy. Và sau khi tất cả các Job con bị hủy bỏ, trạng thái Job cha sẽ thành hủy bỏ.

```
val parentJob = Job()
val childJob = CoroutineScope(Dispatchers.Main + parentJob).launch {
  delay(1_000)
  
  // This function won't be executed because its parent is cancelled.
  canNOTBeExecuted()
}

parentJob.cancel()

// Prints "JobImpl{Cancelling}@199d143", parent job status becomes "cancelling".
// And will be "cancelled" after all the child job is cancelled.
Log.d("demo", "$parentJob")
```

Thay vào đó, nếu chúng ta sử dụng Job.cancelChildren(), job cha sẽ vẫn ở trạng thái đang hoạt động. Và chúng ta vẫn có thể sử dụng nó để chạy các coroutines khác.

```
val parentJob = Job()
val childJob = CoroutineScope(Dispatchers.Main + parentJob).launch {
  delay(1_000)
  
  // This function won't be executed because its parent job is cancelled.
  canNOTBeExecuted()
}

// Only children are cancelled, the parent job won't be cancelled.
parentJob.cancelChildren()

// Prints "JobImpl{Active}@199d143", parent job is still active.
Log.d("demo", "$parentJob")

val childJob2 = CoroutineScope(Dispatchers.Main + parentJob).launch {
  delay(1_000)
  
  // Since the parent job is still active, we could use it to run child job 2.
  canDoSomethingHere()
}
```

(3.2) SupervisorJob v.s. Job

Con của một SupervisorJob có thể thất bại độc lập với nhau.
Như  đã nói trước đây, nếu ta sử dụng một Job đơn giản làm Job cha, tất cả Job con sẽ bị hủy nếu một trong những Job con không thành công:

```
val parentJob = Job()
val handler = CoroutineExceptionHandler { _, _ -> }
val scope = CoroutineScope(Dispatchers.Default + parentJob + handler)
val childJob1 = scope.launch {
    delay(1_000)
    // ChildJob1 fails with the IOException().
    throw IOException()
}

val childJob2 = scope.launch {
    delay(2_000)
    // This line won't be executed due to childJob1 failure.
    canNOTBeExecuted()
}
```

Nếu chúng ta sử dụng một SupervisorJob làm job cha, thì sự thất bại của một Job con sẽ không ảnh hưởng đến các Job con khác:

```
val parentJob = SupervisorJob()
val handler = CoroutineExceptionHandler { _, _ -> }
val scope = CoroutineScope(Dispatchers.Default + parentJob + handler)
val childJob1 = scope.launch {
    delay(1_000)
    // ChildJob1 fails with the IOException().
    throw IOException()
}

val childJob2 = scope.launch {
    delay(2_000)
    // Since we use SupervisorJob() as parent job, the failure of
    // childJob1 won't affect other child jobs. This function will be 
    // executed.
    canDoSomethinghHere()
}
```

##  Coroutines Builder

- Launch :
Khởi chạy một coroutine mới mà không chặn luồng hiện tại và trả về một tham chiếu đến coroutine như một Job.
- Async and await:
Async coroutine builder được định nghĩa là một phần mở rộng trên CoroutineScope. Nó tạo ra một coroutine và trả về kết quả của nó như là một triển khai của Deferred, đây là một tương lai không thể hủy bỏ - đó là một Job có kết quả.

Async được sử dụng với await: Đợi giá trị này hoàn thành mà không chặn thread và tiếp tục khi deferred tính toán hoàn tất, trả về giá trị kết quả hoặc ném ngoại lệ tương ứng nếu deferred bị hủy.

Đoạn code sau đây cho thấy một lệnh gọi tuần tự của hai hàm treo. Ta thực hiện một số nhiệm vụ tốn thời gian 1 giây trong cả fetchDataFromServerOne () và fetchDataFromServerTwo (). Và sau đó gọi chúng trong launch builder. Chúng tôi sẽ thấy thời gian cuối cùng sẽ là tổng thời gian: 2 giây.

```
override fun onCreate(savedInstanceState: Bundle?) {
  ...

  val scope = MainScope()
  scope.launch {
    val time = measureTimeMillis {
      val one = fetchDataFromServerOne()
      val two = fetchDataFromServerTwo()
      Log.d("demo", "The sum is ${one + two}")
    }
    Log.d("demo", "Completed in $time ms")
  }
}

private suspend fun fetchDataFromServerOne(): Int {
  Log.d("demo", "fetchDataFromServerOne()")
  delay(1_000)
  return 1
}
  
private suspend fun fetchDataFromServerTwo(): Int {
  Log.d("demo", "fetchDataFromServerTwo()")
  delay(1_000)
  return 2
}
```

```
2019-12-09 00:00:34.547 D/demo: fetchDataFromServerOne()
2019-12-09 00:00:35.553 D/demo: fetchDataFromServerTwo()
2019-12-09 00:00:36.555 D/demo: The sum is 3
2019-12-09 00:00:36.555 D/demo: Completed in 2008 ms
```

Chi phí thời gian là tổng thời gian trễ của hai hàm treo. Nó sẽ tạm dừng cho đến khi fetchDataFromServerOne () kết thúc, sau đó thực thi fetchDataFromServerTwo ().
Điều gì xảy ra nếu chúng ta muốn chạy đồng thời cả hai chức năng để giảm chi phí thời gian? Async đến để giúp đỡ! Async khá giống như launch. Nó chạy một coroutine khác hoạt động đồng thời với tất cả các coroutine khác và trả về Deferred có giá trị trả về là một Job .

```
public interface Deferred<out T> : Job {
  public suspend fun await(): T
  ...
}
```

Chúng ta có thể gọi await () trên một Deferred để lấy kết quả. Ví dụ:

```
override fun onCreate(savedInstanceState: Bundle?) {
  ...
  
  val scope = MainScope()
  scope.launch {
    val time = measureTimeMillis {
      val one = async { fetchDataFromServerOne() }
      val two = async { fetchDataFromServerTwo() }
      Log.d("demo", "The sum is ${one.await() + two.await()}")
    }
    
    // Function one and two will run asynchrously,
    // so the time cost will be around 1 sec only. 
    Log.d("demo", "Completed in $time ms")
  }
}

private suspend fun fetchDataFromServerOne(): Int {
  Log.d("demo", "fetchDataFromServerOne()")
  delay(1_000)
  return 1
}

private suspend fun fetchDataFromServerTwo(): Int {
  Log.d("demo", "fetchDataFromServerTwo()")
  Thread.sleep(1_000)
  return 2
}
```

```
2019-12-08 23:52:01.714 D/demo: fetchDataFromServerOne()
2019-12-08 23:52:01.718 D/demo: fetchDataFromServerTwo()
2019-12-08 23:52:02.722 D/demo: The sum is 3
2019-12-08 23:52:02.722 D/demo: Completed in 1133 ms
```

Nguồn : https://medium.com/swlh/kotlin-coroutines-in-android-basics-9904c98d4714