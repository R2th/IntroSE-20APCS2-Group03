## Introduce
Việc xử lý bất đồng bộ luôn là vấn đề khó gây đau đầu với các developer, ngay cả khi chúng ta có các công cụ tuyệt vời như Rx(Reactive Programming) để giúp chúng ta xử lí dễ  dàng hơn. Vậy có cách nào để chúng ta có thể viết mã đồng bộ và làm cho nó hoạt động không đồng bộ?

Trong project, thông thường ta giải quyết việc xử lí bất đồng bộ bằng RxJava, thực chất RxJava đã hết sức tuyệt vời,  để xử lý các công việc mất nhiều thời gian tính toán để phản ứng lại với UI
![](https://images.viblo.asia/f53feb8e-5d50-48b8-a260-9bd76c36352a.png)

Coroutines chỉ được giới thiệu như là một tính năng thử nghiệm của Kotlin 1.1 và họ cung cấp cho các developers khả năng viết ngắn gọn hơn, mã không đồng bộ. Ngay cả khi coroutines không phải là một khái niệm mới (chúng tồn tại trong nhiều ngôn ngữ khác), nó thực sự tuyệt vời khi chúng có sẵn trong Kotlin và trên Android.
Trong bài này, mình sẽ giới thiệu về coroutines nó là gì, nó như thế nào và cách hoạt động của chúng

## Kotlin Coroutines
Coroutines về cơ bản có thể hiểu nó như một "light-weight" thread, nhưng nó không phải là 1 thread, chúng chỉ hoạt động tương tự 1 thread :)). Một sự khác biệt quan trọng là sự giới hạn : Thread rất hạn chế vì ta biết đến Thread Pool, nó sẽ hạn chế số lượng Thread ở 1 thời điểm,còn coroutines thì gần như là hàng free, hàng nghìn coroutines có thể được bắt đầu cùng một lúc.
Chúng cho phép chạy một đoạn mã không đồng bộ theo cách tương tự như bạn thường chạy một mã đồng bộ. Điều này giúp loại bỏ việc phải đối phó với cú pháp phức tạp và dài dòng khi viết code bất đồng bộ, nó rất điển hình khi xử lý các ứng dụng trong mobile 

Coroutines trong Kotlin được triển khai ở mức thấp nhất có thể, cho phép các thư viện khác xây dựng dựa trên các API do ngôn ngữ cung cấp. Đồng thời, một cấu trúc ngôn ngữ coroutine cấp cao hơn,như async và await pattern, được cung cấp trong thư viện coroutine Kotlin.
	
## Blocking Vs Non-Blocking
**Trước khi tìm hiểu cách sử dụng coroutines, đầu tiên phải hiểu sự khác biệt giữa Blocking Vs Non-Blocking.**

* Blocking và Non-Blocking trong lập trình chủ yếu được đề cập khi muốn miêu tả về cách một chương trình thực hiện các dòng lệnh của nó. Chúng ta có thể hiểu một cách đơn giản, nếu chương trình được thực hiện theo mô hình Blocking có nghĩa là các dòng lệnh được thực hiện một cách tuần tự. Khi một dòng lệnh ở phía trước chưa được hoàn thành thì các dòng lệnh phía sau sẽ chưa được thực hiện và phải đợi khi mà thao tác phía trước hoàn tất, và nếu như các dòng lệnh trước là các thao tác cần nhiều thời gian xử lý như liên quan đến IO (input/output) hay mạng (networking) thì bản thân nó sẽ trở thành vật cản trở (blocker) cho các lệnh xử lý phía sau mặc dù theo logic thì có những việc ở phía sau ta có thể xử lý được luôn mà không cần phải đợi vì chúng không có liên quan gì đến nhau.
* Non-Blocking, các dòng lệnh không nhất thiết phải lúc nào cũng phải thực hiện một cách tuần tự (sequential) và đồng bộ (synchronous) với nhau. Ở mô hình này nếu như về mặt logic dòng lệnh phía sau không phụ thuộc vào kết quả của dòng lệnh phía trước, thì nó cũng có thể hoàn toàn được thực hiện ngay sau khi dòng lệnh phía trước được gọi mà không cần đợi cho tới khi kết quả được sinh ra. Những dòng lệnh phía trước miêu tả ở trên còn có thể gọi là được thực hiện theo cách không đồng bộ (Asynchronous), và đi theo mỗi dòng lệnh thường có một callback là đoạn mã sẽ được thực hiện ngay sau khi có kết quả trả về từ dòng lệnh không đồng bộ. Để thực hiện mô hình Non-Blocking, người ta có những cách để thực hiện khác nhau, nhưng về cơ bản vẫn dựa vào việc dùng nhiều Thread (luồng) khác nhau trong cùng một Process (tiến trình), hay thậm chí nhiều Process khác nhau (inter-process communication – IPC) để thực hiện

Ta cùng xem xét một ví dụ đơn giản
```java
launch { 
 delay(1000L) 
 println("World!") 
}
print("Hello,") 
Thread.sleep(2000L)
```

* Ví dụ trên là khá là simple, nhưng nó có một số đặc thù cơ bản: đầu tiên, ta đã dùng hai cách khác nhau để delay thời gian. Chúng ta có thể quen thuộc với (Thread.sleep ()) và một cái mà ta có thể đã nhìn thấy trong các toán tử của RxJava (delay ()). Thread.sleep() là một blocking, trong khi delay() là một lệnh non-blocking. Lần gọi đầu tiên sẽ làm cho toàn bộ thread ngủ, đóng băng thực hiện của nó cho đến khi chúng ta yêu cầu, trong khi delay() sẽ chỉ tạm dừng nó, cho phép phần còn lại của đoạn code hoạt động bình thường. 
 
* Giải thích kĩ hơn nữa: khi chúng ta khởi động thường trình này, nó sẽ chạy delay(), sẽ làm cho mã giữa khởi động và khung đóng dừng lại trong một giây, trong khi phần còn lại (lệnh println) sẽ được thực hiện để in ra dòng "Hello". Tiếp theo là Thread.sleep (), sẽ dừng việc thực thi trong 2 giây, chặn tất cả mọi thứ trong pipeline, có nghĩa là bộ đếm delay() cũng sẽ dừng. Khi thời gian này trôi qua, delay() sẽ khởi động lại và kết thúc, tại thời điểm đó chúng ta sẽ thấy kết quả cuối cùng in ra "World". Vì vậy chúng ta sẽ được kết quả là :
 `Hello, World`
 
Chi tiết thì nó sẽ chạy như này: 
```kotlin
start[delay(1s)] -> println(“World!”) will wait for its execution time
println(“Hello,”) -> this will be printed immediately
Thread.sleep(2s) -> everything will freeze for 2 seconds
finish[delay(1s)]
println(“World!”) -> will be printed when both Thread.sleep() and delay() are over
```
2 định nghĩa này rất quan trọng bởi coroutines được định nghĩa:

> Coroutines are computations that can be suspended without blocking a thread.

```kotlin
launch { 
 delay(1000L) 
 println("World!") 
}
```
Đối với coroutines có thể `suspendable` mà không blocking mọi thứ khác, nó dùng có vẻ hơi cứng nhắc?, bởi chúng ta chỉ có thể ngăn chặn chúng tại các điểm cụ thể; và delay() là một trong số chúng. Những điểm này (có chức năng, sau khi tất cả) được gọi là chức năng đình chỉ, và được tạo ra bằng cách áp dụng công cụ sửa đổi đình chỉ để khai báo chính hàm đó:
```kotlin
suspend fun delay(
  time: Long, 
  unit: TimeUnit) {
    …
}
```
### Suspend function
Đặc trưng của Coroutines là suspend function: đó là function có thể dừng việc thực hiện khi chúng được gọi và làm cho nó tiếp tục khi nó đã chạy xong nhiệm vụ của riêng chúng. 
![](https://images.viblo.asia/ffab70de-d43d-4a13-99fa-5a98d0702e61.png)

Suspend function được đánh dấu bằng từ từ khóa'suspend`,**và chỉ có thể được gọi bên trong các suspend function khác hoặc bên trong một coroutine.** 

Điều này có nghĩa là bạn không thể gọi suspend function ở mọi nơi. Cần có một surrounding function để built coroutine và cung cấp context cần thiết cho việc này
### Coroutines Builder

Có một số cách để tạo ra coroutines:

[launch](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/launch.html) -Nó sẽ tạo ra một coroutine mới và trả về một tham chiếu đến nó như một đối tượng Job mà không có kết quả trả về. Nếu bạn có ý định chặn luồng hiện tại, thay vì khởi chạy, ta có thể sử dụng runBlocking thay thế.

[async](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/async.html) - Tạo ra một coroutine mới và trả về một tham chiếu đến nó như là một  Deferred có thể có kết quả. Nó thường được sử dụng cùng với .await() chờ đợi cho một kết quả mà không gây block thread, vì vậy ta cũng có thể cancel nó bằng .cancel()

[runBlocking](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/run-blocking.html) : Block thread hiện tại cho đến khi coroutine thực hiện.

## Coroutines in Android  
### Project setup
Coroutines không được mặc định trong Kotlin, mà vì vậy các bạn cần enable coroutines trước khi sử dụng với tấm nhãn experimental (thử nghiệm) và add dependencies cho chúng
```
kotlin {
    experimental {
        coroutines 'enable'
    }
}
dependencies {
    ...
    compile "org.jetbrains.kotlinx:kotlinx-coroutines-core:0.27.0"
}
```
### Example
Giả sử chúng ta muốn tạo một hàm đếm ngược, nó sẽ thay đổi giá trị trong TextView từ 10 xuống 1 và sau đó thay bằng “Done!” khi chúng ta đếm xong. Tại mỗi lần đếm ngược, ta sẽ chờ 1 giây. Để sử dụng coroutines, những gì chúng ta phải làm là sử dụng launch() và chèn hàm delay() vào một vòng lặp, rồi thay đổi text của TextView.
```
launch(UI) {
  for (i in 10 downTo 1) {
    hello.text = "Countdown $i…"
    delay(1000)
   }
  hello.text="Done!"
}
```

* Trong trường hợp ta muốn hủy 1 couroutine, chúng ta có thể làm như vậy bằng cách chỉ giữ một tham chiếu đến Job trả về bởi launch() (như chúng ta đã thấy khi giới thiệu launch() khai báo, hàm builder này thực sự trả về một đối tượng Job) và gọi phương thức cancel() trên đó.

```kotlin
val job = launch { … }
job.cancel()
```
* Refactor code
```kotlin
fun TextView.countdown() {
  for (i in 10 downTo 1) {
    text = "Countdown $i…"
    delay(1000)
  }
  text="Done!"
}
```
* Vì delay() là một suspending function, và các suspend function chỉ có thể được gọi từ bên trong các suspend function khác, ta đánh dấu phần extention countdown()là suspends. Nhược điểm của điều này có thể là chúng ta sẽ không thể gọi countdown() bất cứ khi nào chúng ta muốn, nhưng vì chúng ta cần suspend chạy.
```kotlin
suspend fun TextView.countdown() {
  for (i in 10 downTo 1) {
    text = "Countdown $i…"
    delay(1000)
  }
  text="Done!"
}
```
### Android Networking with Coroutines and Retrofit
Một ví dụ thực tiễn hơn là ta sử dụng Couroutines để lấy dữ liệu từ network bằng Retrofit thay vì sử dụng RxJava như thông thường.
Về cơ bản các bước thực hiện call API tương tự như so với khi ta sử dụng RxJava

Để call api sử dụng Coroutines bước đầu chúng ta phải hiểu [Deferrred](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-deferred/) là gì đã. Deferred là một non-blocking future có thể bị hủy bỏ nếu được request, về cơ bản nó đại diện cho một [Job](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/index.html) coroutine có chứa một giá trị cho công việc tương ứng. Sử dụng kiểu Deferred cho phép ta kết hợp các ý tưởng giống như một công việc, với việc bổ sung khả năng truy xuất thêm các trạng thái như thành công và thất bại của công việc, việc này là hợp lí khi ta gửi request api 

Nếu bạn đang sử dụng RxJava, rất có thể bạn đang sử dụng RxJava2CallAdapterFactory,rất ngon là couroutines cũng có 1 cái tương tự :))
* https://github.com/JakeWharton/retrofit2-kotlin-coroutines-adapter
1. Tạo instance adapter retrofit 
```kotlin
private fun makeService(okHttpClient: OkHttpClient): MyService {
    val retrofit = Retrofit.Builder()
            .baseUrl("some_api")
            .client(okHttpClient)
            .addCallAdapterFactory(CoroutineCallAdapterFactory())
            .build()
    return retrofit.create(MyService::class.java)
}
```

2.Khai báo interface API
```kotlin
interface RetrofitService {
    @GET("some_endpoint")
    fun getData(): Deferred<List<MyData>>
}
```
Ta có thể nhận thấy thay vì Observable<T>, với coroutines sẽ return về Deferred. Deferred chỉ đơn giản là trả về một đối tượng của loại đặc biệt, thường được sử dụng với await để tạm dừng để chờ đợi cho nó thực hiện xong mà không gây block main Thread. Khi trước đây ta dùng RxJava nó sẽ trả về 1 Observable trông như thế này
```kotlin
override fun getData(): Observable<List<MyData>> {
    return myService.getData()
        .map { result ->
            result.map { myDataMapper.mapFromRemote(it) }
        }
}
```
Khi dùng RxJava, ta gọi myService để lấy dữ liệu, tiếp theo là map lớp dữ liệu từ kết quả lâý được sang model để hiển thị lên UI. Điều này thay đổi một chút khi ta chuyển sang thực hiện coroutines .Function getData() sẽ là 1  suspends functions. Bởi vì khi ta gọi sẽ thực hiện getData() một hành động dài ta có thể pause, resume mà không gây block thread
```kotlin
override suspend fun getData(): List<MyData> {
    val result = myService.getData()
}
```
Với coroutines những gì ta cần làm là sử dụng hàm await() để đợi kết quả của yêu cầu của chúng ta và sau đó tiếp tục với thân hàm của chúng ta sau khi nhận được một giá trị:
```kotlin
override suspend fun getData(): List<MyData> {
    val result = myService.getData().await()
    return result.map { myDataMapper.mapFromRemote(it) }
}
```
    
```kotlin
myJob = CoroutineScope(Dispatchers.IO).launch {
    val result = repo.getData()
    withContext(Dispatchers.Main) {
        //do something with result
    }
}
```

Vậy làm sao để dừng việc request api,như đã nói ở trên ta chỉ cần gọi .cancel()
```kotlin
private var myJob: Job? = null
override fun onDestroy() {
    myJob?.cancel()
    super.onDestroy()
}
```
## Reference
> https://kotlinlang.org/docs/reference/coroutines-overview.html
> 
> https://github.com/Kotlin/kotlinx.coroutines/blob/master/coroutines-guide.md
> 
> https://open.nytimes.com/writing-asynchronous-code-for-android-introducing-coroutines-20dda14a39ea
> 
> https://android.jlelse.eu/kotlin-coroutines-and-retrofit-e0702d0b8e8f