# 1. CoroutineScope
Hãy tưởng tượng, khi bạn chạy 10 coroutine để thực thi 10 task trong 1 activity nào đó. Khi Activity đó bị destroy, các result của các task trên không còn cần thiết nữa. Làm thế nào để stop 10 coroutine kia để tránh memory leaks. Tất nhiên, bạn có thể stop thủ công từng coroutine bằng hàm `cancel()`, nhưng Kotlin Coroutines cung cấp một thằng có khả năng quản lý vòng đời của cả 10 coroutine kia: `CoroutineScope`

Ta có thể khai báo 1 coroutine scope bằng cách khởi tạo 1 instance của class `CoroutineScope(context: CoroutineContext)`. Biến context được truyền vào `CoroutineScope` được sử dụng làm `coroutine context` cho toàn bộ coroutine được launch trong cùng scope đó. 

![](https://images.viblo.asia/811d1f74-18a8-4701-bafc-69bcd395d016.PNG)

Như đoạn code trên, mình launch 3 coroutine trong cùng 1 scope sử dụng context gồm `Dispatchers.IO`. Vậy cả 3 coroutine trên đều chạy với `Dispatchers.IO`. 

Chúng ta cũng có thể khởi tạo 1 scope bằng các factory function như `MainScope()`. `MainScope` mặc định sử dụng `Dispatchers.Main` nên chúng ta không cần khai báo context cho scope này nữa.

![](https://images.viblo.asia/479a9cd0-4552-42fe-8441-e3b61485da48.PNG)

Tất cả coroutine builder mà trong các bài trước mình đã giới thiệu như `launch { }` hay `async { }` đều là những extension function của lớp `CoroutineScope`. Chính vì vậy bạn không thể gọi các hàm `launch { }` và `async { }` bên ngoài một `CoroutineScope` được. Riêng `runBlocking { }` thì không phải là extension function của `CoroutineScope` mà nó nhận `CoroutineScope` như một tham số truyền vào nên nó thể được gọi ngoài `CoroutineScope`. Bản thân `runBlocking { }` nhờ nhận `CoroutineScope` như 1 param nên nó tạo ra 1 scope để có thể chạy được các coroutine bên trong đó. Vậy hãy ghi nhớ, không thể launch 1 coroutine nếu nó không có scope. Hay nói cách khác, ngoài vùng `CoroutineScope` thì không thể launch coroutine nào cả.

![](https://images.viblo.asia/ebe89a8f-9dad-4de2-b81a-6ef5bc00c3cb.PNG)

![](https://images.viblo.asia/af284074-694c-4fa6-857e-7c07a5ebee1f.PNG)

![](https://images.viblo.asia/76c9bbac-3b87-47e8-b805-9116afa76ce5.PNG)

![](https://images.viblo.asia/6f8c35fd-ce39-41ae-9bdd-dd8ade171f12.PNG)

![](https://images.viblo.asia/fb6dbb00-2546-41bd-8688-c150ead08bdf.PNG)

Ngoài các cách trên, có một cách nữa để tạo ra 1 scope để có thể launch các coroutine. Đó là kế thừa lớp `CoroutineScope` và bạn sẽ cần phải `override` lại biến `coroutineContext`.

![](https://images.viblo.asia/997e52a6-ec7e-4b23-925b-af44a2544cce.PNG)

Hoặc tự custom một scope cho riêng mình và dùng nó để chạy các coroutine.

![](https://images.viblo.asia/b78b448e-0263-4ae0-866f-f3e01f616fca.PNG)

# 2. Các đặc điểm của Coroutine Scope
`CoroutineScope` có các đặc điểm sau cần phải ghi nhớ và cẩn thận khi làm việc với Coroutine

* Khi một coroutine A được phóng trong `CoroutineScope` của một coroutine B khác thì A là con của B. Coroutine con sẽ sử dụng scope và context của coroutine cha. Nếu coroutine con đó được khai báo trong 1 scope riêng với context riêng thì nó sẽ ưu tiên sử dụng scope đó thay vì của cha nó.

* Một coroutine cha luôn chờ đợi để tất cả các coroutine con của nó chạy xong hoàn thành nhiệm vụ. Ví dụ:
```kotlin
fun main() = runBlocking { // scope 1
    launch {       // coroutine 1
        delay(200L)
        println("Task from runBlocking")   // line code 1
    }

    coroutineScope { // coroutine 2   // scope 2
        launch {   // coroutine 3
            delay(500L)
            println("Task from nested launch") // line code 2
        }

        delay(100L)
        println("Task from coroutine scope") // line code 3
    }

    println("Coroutine scope is over") // line code 4
}
```

Output:
```
Task from coroutine scope
Task from runBlocking
Task from nested launch
Coroutine scope is over
```
Nay chúng ta đã biết thêm một coroutine builder nữa là `coroutineScope { }`. Nó cũng chạy tuần tự như `runBlocking { }` vậy, chỉ khác là nó là một suspend function nên chỉ có thể tạo ra bên trong một suspend function khác hoặc trong một coroutine scope.

![](https://images.viblo.asia/5d38e888-85e4-4d0b-a79b-0a1f98685586.PNG)

Giải thích, đầu tiên các code bên trong `runBlocking` được chạy tuần tự từ trên xuống. Khi nó launch coroutine 1, trong coroutine 1 có delay 200ms nhưng `runBlocking` sẽ không chờ mà chạy xuống để launch tiếp coroutine 2. Trong coroutine 2 lại launch 1 coroutine con gọi là coroutine 3. Nhưng ở cả coroutine 2 và 3 đều có delay. Đáng lẽ `runBlocking` phải chạy xuống dòng code cuối để print ra line code 4, nhưng không, nó được in ra cuối cùng. Bởi vì trong cùng 1 scope do `runBlocking` tạo ra (scope 1) thì bản thân nó phải chờ tất cả các đứa con của nó (coroutine 1,2 và 3) chạy xong rồi nó mới chạy code của nó. Vậy nên, line code 3 bị delay ít nhất là 100ms nên được print ra trước, kế tiếp print line code 1 và line code 2.

* Khi coroutine cha bị hủy, tất cả các con của nó cũng bị hủy theo
```kotlin
fun main() = runBlocking<Unit> {
    val request = launch {
        launch {
            delay(100)
            println("job2: I am a child of the request coroutine")   // line code 1
            delay(1000)
            println("job2: I will not execute this line if my parent request is cancelled") // line code 2
        }
    }
    delay(500)
    request.cancel() // cancel processing of the request
    delay(1000)
    println("main: Who has survived request cancellation?") // line code 3
}
```
Output:
```
job2: I am a child of the request coroutine
main: Who has survived request cancellation?
```

Giải thích: sau 100ms delay thì line code 1 được print ra, rồi phải đợi 1000ms nữa line code 2 mới được print. Trong khi đó, sau 500ms đầu tiên thì coroutine cha đã bị cancel nên nó sẽ cancel toàn bộ các coroutine con của nó. Vì vậy line code 2 sẽ mãi mãi không được print.

# 3. GlobalScope
GlobalScope là một CoroutineScope. Nó có gì đặc biệt?. Ta sẽ thử launch một coroutine con sử dụng scope riêng là GlobalScope trong một coroutine cha.
```kotlin
fun main() = runBlocking<Unit> {
    val request = launch {
        // it spawns two other jobs, one with GlobalScope
        GlobalScope.launch {
            println("job1: GlobalScope and execute independently!")
            delay(1000)
            println("job1: I am not affected by cancellation")  // line code 1 này vẫn được in ra mặc dù bị delay 1000ms
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
}
```
Output:
```
job1: GlobalScope and execute independently!
job2: I am a child of the request coroutine
job1: I am not affected by cancellation
main: Who has survived request cancellation?
```
Chúng ta đã biết khi cancel coroutine cha thì tất cả coroutine con bị cancel. Tuy nhiên nếu coroutine con đó có scope là `GlobalScope` thì nó sẽ không bị cancel khi coroutine cha bị hủy. Vì vậy, line code 1 vẫn được print mặc dù bị delay tới 1000ms.

# 4. Sử dụng Coroutine Scope để quản lý lifecycle của application
Như mình đã đặt vấn đề ở đầu bài viết, tất cả các coroutine phải được hủy bỏ khi `Activity`, `Fragment`, `ViewModel` bị hủy để tránh memory leaks. Vì vậy chúng ta nên sử dụng Coroutine Scope để quản lý vòng đời của `Activity`, `Fragment`, `ViewModel`. Cụ thể:
Khi activity bị destroy thì cancel coroutine scope bằng hàm `cancel()`
```kotlin
class Activity : CoroutineScope by CoroutineScope(Dispatchers.Default) {
   fun destroy() {
       cancel() // Extension on CoroutineScope
   }
   fun doSomething() {
       // launch ten coroutines for a demo, each working for a different time
       repeat(10) { i ->
           launch {
               delay((i + 1) * 200L) // variable delay 200ms, 400ms, ... etc
               println("Coroutine $i is done")
           }
       }
   }
}
```

Khi viewmodel bị clear thì cancel coroutine scope
```kotlin
class MyViewModel constructor(private val apiService : ApiService) : ViewModel(), CoroutineScope {  
 
  private val job = Job()
 
  override val coroutineContext: CoroutineContext get() = job + Dispatchers.Main
 
  fun executeCalls() {
     launch(context = coroutineContext) {
          val firstRequestDeferred = async {
               apiService.request1()
          }
          val secondRequestDeffered = async {
               apiService.request2()
          }
          handleResponse(firstRequestDeferred,await(),secondRequestDeffered.await())
     }  
  }
 
  override fun onCleared(){
      job.cancel()
  }
}
```
# 5. viewModelScope
Khi bạn thêm dependency dưới đây vào dự án thì trong mỗi `ViewModel` đều có sẵn một scope là `viewModelScope` sử dụng `Dispatchers.Main`. Khi `viewmodel` bị clear thì `viewModelScope` sẽ tự động cancel tất cả coroutine mà không cần mình xử lý.
```kotlin
implementation "androidx.lifecycle.lifecycle-viewmodel-ktx$lifecycle_version"
```

![](https://images.viblo.asia/8e85f28b-3162-4564-97a0-4fd2ce91cc0e.PNG)

# Kết luận
Kết thúc phần 6, hy vọng bạn đã hiểu về Coroutine Scope. Bài viết tới mình sẽ giới thiệu về việc handle Exception trong coroutine. Cảm ơn các bạn đã theo dõi bài viết này. Hy vọng các bạn sẽ tiếp tục theo dõi những phần tiếp theo 😄

Nguồn tham khảo: 

https://kotlinlang.org/docs/reference/coroutines/coroutine-context-and-dispatchers.html#coroutine-scope


Đọc lại những phần trước:

[Cùng học Kotlin Coroutine, phần 1: Giới thiệu Kotlin Coroutine và kỹ thuật lập trình bất đồng bộ](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)

[Cùng học Kotlin Coroutine, phần 2: Build first coroutine with Kotlin](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-2-build-first-coroutine-with-kotlin-Do7544Ee5M6)
    
[Cùng học Kotlin Coroutine, phần 3: Coroutine Context và Dispatcher](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-3-coroutine-context-va-dispatcher-Qbq5QkDzZD8)
    
[Cùng học Kotlin Coroutine, phần 4: Job, Join, Cancellation and Timeouts](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-4-job-join-cancellation-and-timeouts-Do75463QZM6)

[Cùng học Kotlin Coroutine, phần 5: Async & Await](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-5-async-await-naQZRxGm5vx)

Đọc tiếp phần 7: [Cùng học Kotlin Coroutine, phần 7: Xử lý Exception trong Coroutine, Supervision Job & Supervision Scope](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-7-xu-ly-exception-trong-coroutine-supervision-job-supervision-scope-naQZRDaG5vx)