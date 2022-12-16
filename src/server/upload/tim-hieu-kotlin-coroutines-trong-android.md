# 1. Giới thiệu
Trong phần này chúng ta cùng nghiên cứu, sử dụng **Kotlin Coroutines** trong android. Đây sẽ là 1 cách mới để quản lý background thread, code sẽ đơn giản hơn do giảm thiểu được số lượng callbacks. 
Dưới đây là đoạn code về ý tưởng của `Coroutines` sẽ làm như thế nào

```kotlin
// Async callbacks
networkRequest { result ->
   databaseSave(result) { rows ->
     // Result saved
   }
}
```

```kotlin
// The same code with coroutines
val result = networkRequest()
databaseSave(result)
// Result saved
```

##### Sau bài này bạn sẽ học được:

* Cách viết Corountines và kết quả trả về
* Cách sử dụng suspend function để thực hiện code tuần tự
* Cách sử dụng `launch` và `runBlocking`
* Kỹ thuật chuyển đổi APIs đã có sang Corountines (sử dụng `suspendCoroutine`)
* Cách sử dụng Corountines với Architecture Components

### Điều kiện để hiểu bài này 

* Đã hiểu về Kotlin
* Đã có kinh nghiệm với `ViewModel`, `LiveData`, `Repository` và `Room`
* Hiểu được Main Thread, Background Thread và callbacks

# 2. Cài đặt
Bạn hãy gõ lệnh sau vào terminal để kéo code ví dụ về máy:

```
$ git clone https://github.com/googlecodelabs/kotlin-coroutines.git
```

>  kotlin-coroutines sẽ có 3 projects:
> 
>*  kotlin-coroutines-start — ví dụ đơn giản bắt đầu với Corountines
> * kotlin-coroutines-repository — Project cơ bản để convert coroutines
>*  kotlin-coroutines-end — Project này là đã hoàn thiện corountines 
>

Chú ý bạn phải bảo đảm rằng bạn đang sử dụng thư viện mới nhất của Coroutines:
Ví dụ bản mới nhất hiện tại là `1.1.0`

>implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.1.0'
>
>implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.1.0"
>
> Kotlin version: 1.3.11



# 3. Chạy ví dụ

Mở project `kotlin-coroutines-start` và chạy thử

![](https://i.imgur.com/z31dltG.png?1)

# 4. Coroutines trong Kotlin
Trong Android, mọi thao tác đều phải tránh làm chậm trong Main Thread. Vì Main Thread là luồng để xử lý giao diện. Muốn giao diện được mượn mà thì phải bảo đảm Main Thread được thông thoáng để cho Android 16ms sẽ cập nhật giao diện 1 lần (tức là 60 frame trên 1 giây). 

Nhưng thực tế có rất nhiều task xử lý mất nhiều thời gian hơn 16ms ví dụ như: Đọc ghi file, đọc ghi database,  kéo data từ server về, ... . Vì thế, nếu như xử lý quá nhiều trong Main Thread này sẽ làm cho app bị đơ (không ấn được gì) và nếu đơ quá lâu sẽ hiển thị diaglog `Application Not Responding`

#### Callback pattern 

Để xử lý task tốn nhiều thời gian mà không ảnh hưởng đến Main Thread thì đa số Dev đều dùng CallBack Pattern. Bằng cách này thì những task nào tốn nhiều thời gian sẽ được chạy dưới background thread. Khi task chạy xong thì sẽ được gọi lại và trả kết quả trong Main Thread.

Ví dụ điển hình sau:

```kotlin
// Slow request with callbacks
@UiThread
fun makeNetworkRequest() {
    // The slow network request runs on another thread
    slowFetch { result ->
        // When the result is ready, this callback will get the result
        show(result)
    }
    // makeNetworkRequest() exits after calling slowFetch without waiting for the result
}
```

#### Sử dụng coroutines đề loại bỏ callbacks

Callbacks pattern là mẫu rất tốt. Tuy nhiên vẫn còn 1 vài hạn chế. Code sẽ rất nặng nếu sử dụng nhiều callback và sẽ trở nên khó đọc, khó debug. 

Kotlin coroutines sẽ giúp bạn chuyển cấu trúc code CallBack thành code tuần tự (code nối tiếp nhau). Cấu trúc code tuần tự giúp dễ đọc hơn và với 1 vài ngôn ngữ lập trình cho phép sử dụng Exceptions.

Và tất nhiên, 2 cách code trên đều có chung 1 kết quả giống nhau.

Keyword `suspend` trong Kotlin để đánh dấu function hay function type chuyển thành Coroutines. Khi Coroutines được gọi (bằng `suspend`) thì sẽ thay vào đó là function sẽ được chờ cho đến khi có kết quả trả về như 1 function bình thường. 

Các bạn xem ví dụ sau:

```kotlin
// Slow request with coroutines
@UiThread
suspend fun makeNetworkRequest() {
    // slowFetch is another suspend function so instead of 
    // blocking the main thread  makeNetworkRequest will `suspend` until the result is 
    // ready
    val result = slowFetch()
    // continue to execute after the result is ready
    show(result)
}

suspend fun slowFetch(): SlowResult { ... }
```

Cũng như Callback pattern, `makeNetworkRequest` phải được `return` trong Main Thread vì đã có `@UiThread`. Và tất nhiên thông thường function này không thể bị chặn bởi `slowFetch`. Keyword `suspend` ở đâu là điều kỳ diệu.

> Chú ý: `suspend` không có nghĩa là được chạy trên thread được gọi. Suspend function có thể được > chạy dưới background thread hoặc main thread.

So sánh giữa Callback pattern và Coroutines thì code của Coroutines ngắn gọn và dễ đọc hơn, mặc dù có cùng chung kết quả như nhau. Và nếu như muốn thêm nhiều task chạy nữa thì sẽ không cần tạo nhiều callback nữa. Mà chỉ cần viết tiếp dòng dưới là xong.

Ví dụ sau  bạn sẽ thấy rõ:

```kotlin
// Request data from network and save it to database with coroutines

// Because of the @WorkerThread, this function cannot be called on the
// main thread without causing an error.
@WorkerThread
suspend fun makeNetworkRequest() {
    // slowFetch and anotherFetch are suspend functions
    val slow = slowFetch()
    val another = anotherFetch()
    // save is a regular function and will block this thread
    database.save(slow, another)
}

suspend fun slowFetch(): SlowResult { ... }
suspend fun anotherFetch(): AnotherResult { ... }
```

# 5.  Điều khiển UI với coroutines

Mở project `kotlin-coroutines-start` bằng Android Studio

#### Thêm code coroutines vào MainViewModel

Mở `MainViewModel.kt` và tìm TODO như sau:

```
// TODO: Add viewModelJob and uiScope here
```

Thay vào đó code sau:
```
private val viewModelJob = Job()

private val uiScope = CoroutineScope(Dispatchers.Main + viewModelJob)
```

Trong Kotlin, tất cả coroutines đều được chạy trong `CoroutineScope`.  1 scope điều khiển thời gian sống của coroutines thông qua job của nó. Khi nào bạn cancel job của scope thì nó cũng sẽ cancel tất cả coroutines bắt đầu bằng Scope đó. Trong Android, bạn có thể sử dụng scope để cancel tất cả coroutines đang chạy.

Scope cũng cho bạn định nghĩa mặc định 1 `dispatcher`. 1 Dispatcher sẽ điều khiển thread mà coroutines chạy. 
`uiScope` sẽ bắt đầu coroutines trong `Dispatchers.Main`, tức là sẽ được chạy trong Main Thread Andorid. 

#### Huỷ Scope khi ViewModel bị cleared 

Trong `MainViewModel.kt` tìm :

```
// TODO: Add onCleared() here to cancel viewModelJob
```

Thay vào đó đoạn code sau:

```kotlin
override fun onCleared() {
    super.onCleared()
    viewModelJob.cancel()
}
```

`onCleared` sẽ được gọi khi `ViewModel` không còn được sử dụng nữa và sẽ huỷ đi. Điều này xảy ra khi user điều hướng Activity hay Fragment.

Khi `viewModelJob` bị huỷ thì tất cả coroutine của `uiScope` cũng sẽ bị huỷ. Điều này là rất quan trọng để tránh bị memory leak và huỷ bỏ những task không còn cần thiết.

> Chú ý: Bạn phải truyền `Job` vào `CoroutineScope` để huỷ tất cả coroutine bên trong. Nếu không thì Scope sẽ vẫn chạy cho đến khi app bị tắt.

#### Đổi Threads sang coroutines

Trong `MainViewModel.kt` tìm :
```kotlin 
/**
* Wait one second then display a snackbar.
*/
fun onMainViewClicked() {
   // TODO: Replace with coroutine implementation
   BACKGROUND.submit {
       Thread.sleep(1_000)
       // use postValue since we're in a background thread
       _snackBar.postValue("Hello, from threads!")
   }
}
```

Và thay thế code đó với coroutine, bạn sẽ được kết quả tương tự

```kotlin
/**
* Wait one second then display a snackbar.
*/
fun onMainViewClicked() {
   // launch a coroutine in uiScope
   uiScope.launch {
       // suspend this coroutine for one second
       delay(1_000)
       // resume in the main dispatcher
       // _snackbar.value can be called directly from main thread
       _snackBar.value = "Hello, from coroutines!"
   }
}
```

# 6. Chuyển đổi callback API sang coroutines
Trong phần này bạn sẽ biết được cách chuyển đổi cấu trúc callback API sáng coroutines

Để bắt đầu, bạn hãy mở project `kotlin-coroutines-repository` bằng Android Studio.

Trong project này sử dụng `Architecture Components` và kế thừa 1 phần project trước để sử dụng cho Network và Local Database. Khi màn hình chính được click thì sẽ lấy tiêu đề (`Title`) từ Network, sau đó lưu vào database, cuối cùng là hiển thị tiêu đề lên màn hình. 

Trong project `kotlin-coroutines-repository` gồm:
1. `MainDatabase` là class database sử dụng Room để lưu và đọc `Title`.
2. `MainNetwork` đóng vai trò là 1 network API để lấy Title mới về. MainNetwork sử dụng 1 fake Network để lấy Title mới về (được định nghĩa trong `FakeNetworkLibrary.kt`). FakeNetworkLibrary sẽ tạo lỗi random.
3. `TitleRepository` đóng vai trò là 1 API để gọi lấy hoặc làm mới dữ liệu từ Network hay Database.
4. `MainViewModelTest` là lớp test cho `MainViewModel`.

#### Cùng xem lại những callback API đã có

Mở ` MainNetwork.kt` để xem `fetchNewWelcome()`

```kotlin 
// MainNetwork.kt

fun fetchNewWelcome(): FakeNetworkCall<String>
```

Mở `TitleRepository.kt` để xem `fetchNewWelcome` hoạt động như thế nào cho cấu trúc CallBack pattern.

`fetchNewWelcome` này sẽ trả về 1 `FakeNetworkCall` để đăng ký listener cho mỗi lần request. Mỗi lần gọi `fetchNewWelcome` sẽ bắt đầu chạy 1 request trên 1 thread khác và trả kết quả trong `addOnResultListener`. 

```kotlin
// TitleRepository.kt

fun refreshTitle(/* ... */) {
   val call = network.fetchNewWelcome()
   call.addOnResultListener { result ->
       // callback called when network request completes or errors
       when (result) {
           is FakeNetworkSuccess<String> -> {
               // process successful result
           }
           is FakeNetworkError -> {
               // process network error
           }
       }
   }
}
```

#### Chuyển callback API đã có thành `suspend function`

Trong phần trên `refreshTitle` đang là CallBack Pattern. Giờ chúng ta sẽ tìm hiểu cách chuyển `refreshTitle` viết dưới dạng coroutines.

Trong Kotlin đã cung cấp hàm `suspendCoroutine` để dùng cho việc đổi CallBack API sang `suspend function`.

Bạn hãy xem ví dụ các bước để chuyển sang coroutines dưới đây:

```kotlin
// Example of suspendCoroutine

/**
 * A class that passes strings to callbacks
 */
class Call {
  fun addCallback(callback: (String) -> Unit)
}

/**
 * Exposes callback based API as a suspend function so it can be used in coroutines.
 */
suspend fun convertToSuspend(call: Call): String {
   // 1: suspendCoroutine and will immediately *suspend* 
   // the coroutine. It can be only *resumed* by the
   // continuation object passed to the block.
   return suspendCoroutine { continuation ->
       // 2: pass a block to suspendCoroutine to register callbacks

       // 3: add a callback to wait for the result
       call.addCallback { value ->
           // 4: use continuation.resume to *resume* the coroutine
           // with the value. The value passed to resume will be
           // the result of suspendCoroutine.
           continuation.resume(value)
       }
   }
}

```

Và dưới đây là ví dụ mẫu để gọi hàm chuyển 

```kotlin
// Example of using convertToSuspend to use a callback API in coroutines

suspend fun exampleUsage() {
    val call = makeLongRunningCall()
    convertToSuspend(call) // suspends until the long running call completes
}
```

Trong đó: 

`continuation` trong `suspendCoroutine` cung cấp 2 function là : `resume` và `resumeWithException`. Gọi 1 trong 2 cái này thì `suspendCoroutine` sẽ được chạy tiếp ngay lập tức.


> ##### Với mẫu chuyển đổi trên ta sẽ tiến hành chuyển `FakeNetworkCall` sang dạng coroutines 


Kéo xuống dưới cùng trong file `TitleRepository.kt` sẽ thấy:

```kotlin
/**
* Suspend function to use callback-based [FakeNetworkCall] in coroutines
*
* @return network result after completion
* @throws Throwable original exception from library if network request fails
*/
// TODO: Implement FakeNetworkCall<T>.await() here
```
Thay vào đó là đoạn code sau: 

```kotlin
suspend fun <T> FakeNetworkCall<T>.await(): T {
   return suspendCoroutine { continuation ->
       addOnResultListener { result ->
           when (result) {
               is FakeNetworkSuccess<T> -> continuation.resume(result.data)
               is FakeNetworkError -> continuation.resumeWithException(result.error)
           }
       }
   }
}
```

> Chú ý: Nếu bạn gặp lỗi báo đỏ này thì kệ nhé `unsupported cannot use release coroutines with api version less than 1.3`
> 

Function này sử dụng `suspendCoroutine` để chuyển CallBack API sang dạnh suspend function. Gọi `wait` sẽ lập tức đình chỉ function cho đến khi Network trả kết quả về. 

Cấu trúc sử dụng sẽ như sau:
```kotlin
// Example usage of await

suspend fun exampleAwaitUsage() {
   try {
       val call = network.fetchNewWelcome()
       // suspend until fetchNewWelcome returns a result or throws an error
       val result = call.await()
       // resume will cause await to return the network result
   } catch (error: FakeNetworkException) {
       // resumeWithException will cause await to throw the error
   }
}
```

Từ khóa `suspend` báo cho Kotlin rằng đây là coroutine. 

#  7. Sử dụng coroutine trên Worker Thread

#### Xem lại cấu trúc callback trong refreshTitle
Mở `TitleRepository.kt` :
```kotlin
/ TitleRepository.kt

fun refreshTitle(onStateChanged: TitleStateListener) {
   // 1: Communicate the network request is starting
   onStateChanged(Loading)
   val call = network.fetchNewWelcome()
   // 2: Register a callback to get notified when the network result completes or errors
   call.addOnResultListener { result ->
       when (result) {
           is FakeNetworkSuccess<String> -> {
               // 3: Save the new title on a background thread
               BACKGROUND.submit {
                   // run insertTitle on a background thread
                   titleDao.insertTitle(Title(result.data))
               }
               // 4: Tell the caller the request is successful
               onStateChanged(Success)
           }
           is FakeNetworkError -> {
               // 5: tell the caller the request errored 
              onStateChanged(
                  Error(TitleRefreshError(result.error)))
           }
       }
   }
}
```

Mở `MainViewModel.kt` để xem API điều khiển API như thế nào:
```kotlin
// MainViewModel.kt
fun refreshTitle() {
   // pass a state listener as a lambda to refreshTitle
   repository.refreshTitle { state ->
       when (state) {
           is Loading -> _spinner.postValue(true)
           is Success -> _spinner.postValue(false)
           is Error -> {
               _spinner.postValue(false)
               _snackBar.postValue(state.error.message)
           }
       }
   }
}
```

#### Thay thế Callback Pattern thành Coroutines trong TitleRepository
Mở `TitleRepository.kt` và thay thế `refreshTitle` như dưới đây:

```kotlin
// TitleRepository.kt

suspend fun refreshTitle() {
   withContext(Dispatchers.IO) {
       try {
           val result = network.fetchNewWelcome().await()
           titleDao.insertTitle(Title(result))
       } catch (error: FakeNetworkException) {
           throw TitleRefreshError(error)
       }
   }
}

// delete class RefreshState and typealias TitleStateListener
```

Function `withContext` để đảm bảo rằng chạy lệnh insert vào database sẽ được thực hiện trong background thread (`Dispatchers.IO` luồng riêng để xử lý IO ). Vì nếu gọi `insertTitle` trong main thread bằng coroutines thì sẽ gây hiện tượng ứng dụng bị đơ hay lag trong quá trình ghi vào database.

#### Sử dụng `suspend` function trong MainViewModel

Mở `MainViewModel.kt` và thay thế `refreshTitle` như sau:
```kotlin
// MainViewModel.kt

fun refreshTitle() {
   uiScope.launch {
       try {
           _spinner.value = true
           repository.refreshTitle()
       } catch (error: TitleRefreshError) {
           _snackBar.value = error.message
       } finally {
           _spinner.value = false
       }
   }
}
```

Ok giờ bạn hãy chạy thử code coroutines để xem kết quả.


# 8. Sử dụng Coroutines với WorkManager

Có rất nhiều cách để xử lý task trong background. Trong phần này tôi sẽ trình bày sử dụng WorkManager với Coroutines. Hiện WorkManager đang là bản thử nghiệm.


> Muốn tìm hiểu rõ hơn về WorkManager thì hãy vào đọc [WorkManager](https://codelabs.developers.google.com/codelabs/android-workmanager/#0)

Cấu trúc sử dụng như sau:

```kotlin
class MyWorker: Worker() {

   /**
    * Do our actual processing for the worker.
    *
    * WorkManager will call this method from a background thread. It may be called even
    * after our app has been terminated by the operating system, in which case [WorkManager] will
    * start just enough to run this [Worker].
    */
   override fun doWork(): Result {
       // block and return Result
   }
}
```

ở đây function `dowork()` được gọi trong background thread.

#### Cách sử dụng

Mở `RefreshMainDataWork.kt` và kế thừa class từ `Worker`. Bạn sẽ thực thi luồng lấy lấy dữ liệu từ network vào trong `dowork()` này.
Mở `RefreshMainDataWork.kt`
```kotlin
// RefreshMainDataWork.kt

/**
* Refresh the title from the network using [TitleRepository]
*/
// TODO: Implement refreshTitle using coroutines and runBlocking
@WorkerThread
private fun refreshTitle(): Result = Result.SUCCESS
```
và thay thế đoạn code này vào
```kotlin
// RefreshMainDataWork.kt

@WorkerThread
fun refreshTitle(): Result {
   return runBlocking {
       val database = getDatabase(applicationContext)
       val repository = TitleRepository(MainNetworkImpl, database.titleDao)

       try {
           repository.refreshTitle()
           Result.SUCCESS // return value for runBlocking
       } catch(error: TitleRefreshError) {
           Result.FAILURE // return value for runBlocking
       }
   }
}
```

OK vậy là đã xong. 



## Tham khảo
https://codelabs.developers.google.com/codelabs/kotlin-coroutines/index.html