Trong phần 2 của loạt bài về Cancellation và Exceptions trong Coroutines, chúng ta đã biết được tầm quan trọng của việc hủy bỏ công việc khi không còn cần thiết nữa. Trên Android, bạn có thể sử dụng `CoroutineScope` do Jetpack cung cấp: `viewModelScope` hoặc `lifecycleScope` để hủy mọi công việc đang chạy khi scope của chúng hoàn thành - đó là khi `Activity / Fragment / Lifecycle` hoàn thành. Nếu bạn đang tạo `CoroutineScope` của riêng mình, hãy đảm bảo bạn gắn nó với Job và gọi cancel khi cần.

Tuy nhiên, có những trường hợp bạn muốn một thao tác hoàn tất ngay cả khi người dùng đã điều hướng khỏi màn hình. Do đó, bạn không muốn công việc bị hủy bỏ (ví dụ: ghi vào database hoặc thực hiện một network request nhất định tới server của bạn).

Hãy tiếp tục đọc để có một pattern để đạt được điều này!

## Coroutines hay WorkManager?
Coroutines sẽ chạy miễn là appication process của bạn còn hoạt động. Nếu bạn cần chạy các hoạt động có thể tồn tại lâu hơn process (ví dụ: gửi logs đến server của bạn), hãy sử dụng WorkManager trên Android. WorkManager là thư viện để sử dụng cho các hoạt động quan trọng dự kiến sẽ thực thi vào một thời điểm nào đó trong tương lai.

Sử dụng các coroutines cho các hoạt động hợp lệ trong quy trình hiện tại và có thể bị hủy nếu người dùng hủy ứng dụng (ví dụ: thực hiện một network request mà bạn muốn lưu vào bộ nhớ cache). Mô hình để kích hoạt các hoạt động này là gì?

`Các phương pháp hay nhất về Coroutines`
Vì mô hình này được xây dựng dựa trên các phương pháp hay nhất khác của coroutine; cùng tóm tắt lại chúng:
### 1. Inject Dispatchers into classes
Đừng hardcode chúng khi tạo các coroutine mới hoặc gọi withContext.

✅  Lợi ích: dễ dàng testing vì bạn có thể dễ dàng thay thế chúng cho cả bài unit và instrumentation tests.

### 2. Tầng ViewModel / Presenter nên tạo các coroutines
Nếu đó là hoạt động chỉ dành cho giao diện người dùng, thì UI layer có thể thực hiện điều đó. Nếu bạn cho rằng điều này không thể thực hiện được trong dự án của mình, có thể bạn đang không tuân theo best practice #1 (tức là sẽ khó hơn khi testing các ViewModels không inject `Dispatchers`; trong trường hợp đó, việc để lộ các suspend functions sẽ khiến điều đó có thể thực hiện được).

✅  Lợi ích: UI layer nên không bị gián đoạn và không trực tiếp trigger bất kỳ business logic nào. Thay vào đó, hãy chuyển trách nhiệm đó cho lớp ViewModel / Presenter. Testing UI layer yêu cầu các instrumentation tests trong Android cần một trình giả lập để chạy.

### 3. Các layer bên dưới layer ViewModel / Presenter nên hiển thị các suspend functions và Flows
Nếu bạn cần tạo coroutines, hãy sử dụng `coroutineScope` hoặc `supervisorScope`. Nếu bạn cần chúng theo một scope khác, đây là nội dung của bài viết này! Hãy đọc tiếp!

✅  Lợi ích: Người gọi (thường là lớp ViewModel) có thể control việc excution và vòng đời của công việc xảy ra trong các layer đó, có thể hủy bỏ khi cần thiết.

## Các hoạt động không nên được cancel trong Coroutines
Hãy tưởng tượng chúng ta có một ViewModel và một Repository trong ứng dụng của mình với logic sau:
```
class MyViewModel(private val repo: Repository) : ViewModel() {
  fun callRepo() {
    viewModelScope.launch {
      repo.doWork()
    }
  }
}
class Repository(private val ioDispatcher: CoroutineDispatcher) {
  suspend fun doWork() {
    withContext(ioDispatcher) {
      doSomeOtherWork()
      veryImportantOperation() // Điều này không nên bị cancel
    }
  }
}
```
Chúng tôi không muốn veryImportantOperation() được kiểm soát bởi viewModelScope vì nó có thể bị hủy bất cứ lúc nào. Chúng tôi muốn thao tác đó tồn tại lâu hơn viewModelScope. Làm thế nào chúng ta có thể đạt được điều đó?

Để thực hiện việc này, **hãy tạo scope của riêng bạn trong lớp Application và gọi các hoạt động đó trong coroutines bắt đầu bởi nó**. Scope đó nên được inject vào các lớp cần nó.

Lợi ích của việc tạo `CoroutineScope` của riêng bạn so với các giải pháp khác mà chúng ta sẽ thấy ở phần sau (như `GlobalScope`) là bạn có thể định cấu hình nó theo ý muốn. Bạn có cần một `CoroutineExceptionHandler` không? Bạn có thread pool của riêng mình mà bạn sử dụng với tư cách là `Dispatcher` không? Đặt tất cả cấu hình phổ biến đó ở đó trong `CoroutineContext` của nó!

Bạn có thể gọi nó là `applicationScope` và nó phải chứa `SupervisorJob() `để các lỗi trong coroutines không lan truyền trong hệ thống phân cấp (như đã thấy trong phần 3 của loạt bài này):
```
class MyApplication : Application() {
  // Không cần phải hủy scope này vì nó sẽ bị chia nhỏ theo process
  val applicationScope = CoroutineScope(SupervisorJob() + otherConfig)
}
```

Chúng ta không cần phải hủy scope này vì chúng ta muốn nó vẫn hoạt động miễn là application process còn hoạt động, vì vậy chúng ta không có tham chiếu đến `SupervisorJob`. Chúng ta có thể sử dụng scope này để chạy các coroutine cần thời gian tồn tại lâu hơn scope gọi có thể cung cấp trong ứng dụng của chúng ta.

> Đối với các hoạt động không nên bị cancel, hãy gọi chúng từ coroutine được tạo bởi application CoroutineScope


**Bất cứ khi nào bạn tạo một instance Repository mới, hãy pass vào applicationScope mà chúng ta đã tạo ở trên**. Đối với tests, hãy xem phần testing bên dưới.

### Sử dụng coroutine builder nào?
Tùy thuộc vào hành vi của `veryImportantOperation`, bạn cần bắt đầu một coroutine mới bằng cách sử dụng `launch` hoặc `async`:

* Nếu nó cần trả về một kết quả, hãy sử dụng **async** và gọi **await** để đợi nó kết thúc.
* Nếu không, hãy sử dụng **launch** và đợi nó kết thúc với **join**. Lưu ý rằng như đã giải thích trong phần 3 của loạt bài này, bạn phải xử lý thủ công các ngoại lệ bên trong `launch block`.


Đây là cách bạn trigger coroutine bằng cách sử dụng `launch`:
```
class Repository (
  private val externalScope: CoroutineScope,
  private val ioDispatcher: CoroutineDispatcher
) {
  suspend fun doWork() {
    withContext (ioDispatcher) {
      doSomeOtherWork ()
     externalScope.launch {
        // nếu điều này có thể ném ra một ngoại lệ, hãy bọc bên trong try / catch
        // hoặc dựa vào một CoroutineExceptionHandler được cài đặt
        // trong externalScope của CoroutineScope
        veryImportantOperation ()
     }.join()
    }
  }
}
```
hoặc sử dụng async:
class Repository (
  private val externalScope: CoroutineScope,
  private val ioDispatcher: CoroutineDispatcher
) {
  suspend fun doWork(): Any {// Sử dụng một loại cụ thể trong Kết quả
    withContext (ioDispatcher) {
      doSomeOtherWork ()
      return externalScope.async {
        // Các ngoại lệ được hiển thị khi gọi await, chúng sẽ
        // được truyền trong chương trình coroutine gọi doWork.
        // Coi chừng! Chúng sẽ bị bỏ qua nếu context gọi cancel.
        veryImportantOperation ()
      }.await()
    }
  }
}
Trong mọi trường hợp, code ViewModel không thay đổi và với điều trên, ngay cả khi `viewModelScope` bị destroyed, công việc sử dụng `externalScope` sẽ tiếp tục chạy. Hơn nữa, `doWork()` sẽ không return cho đến khi veryImportantOperation () hoàn tất như với bất kỳ cuộc gọi suspend nào khác.

### Điều gì về một cái gì đó đơn giản hơn?
Một pattern khác có thể phục vụ một số trường hợp sử dụng (và có lẽ đó là giải pháp đầu tiên mà mọi người nghĩ ra) là wrapping `veryImportantOperation` trong context của `externalScope` bằng cách sử dụng `withContext` như sau:
```
class Repository(
  private val externalScope: CoroutineScope,
  private val ioDispatcher: CoroutineDispatcher
) {
  suspend fun doWork() {
    withContext (ioDispatcher) {
      doSomeOtherWork ()
      withContext (externalScope.coroutineContext) {
        veryImportantOperation ()
      }
    }
  }
}
```
Tuy nhiên, cách tiếp cận này có một số lưu ý mà bạn nên biết:
* Nếu coroutine gọi doWork bị cancel trong khi `veryImportantOperation` đang được thực thi, nó sẽ tiếp tục thực thi cho đến điểm cancellation tiếp theo, không phải sau khi veryImportantOperation thực thi xong.
* `CoroutineExceptionHandlers` không hoạt động như bạn mong đợi khi context được sử dụng trong `withContext` vì ngoại lệ sẽ re-thrown.


## Testing
Vì chúng ta sẽ cần inject cho cả Dispatchers và CoroutineScope, bạn nên inject gì trong những trường hợp đó?

![](https://images.viblo.asia/7a3363e4-c9e7-42e4-ba03-657f7cc7d9f4.png)

🔖 Chú giải: [TestCoroutineDispatcher](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-test/kotlinx.coroutines.test/-test-coroutine-dispatcher/index.html), [MainCoroutineRule](https://github.com/android/plaid/blob/master/test_shared/src/main/java/io/plaidapp/test/shared/MainCoroutineRule.kt), [TestCoroutineScope](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-test/kotlinx.coroutines.test/-test-coroutine-scope/), [AsyncTask.THREAD_POOL_EXECUTOR.asCoroutineDispatcher ()](https://github.com/google/iosched/blob/adssched/mobile/src/androidTest/java/com/google/samples/apps/iosched/tests/di/TestCoroutinesModule.kt#L36)

## Giải pháp thay thế
Có những cách khác để thực hiện hành vi này với Coroutines. Tuy nhiên, những giải pháp đó không thể được áp dụng một cách có hệ thống trong mọi trường hợp sử dụng. Hãy xem một số lựa chọn thay thế và tại sao / khi nào bạn nên / không nên sử dụng chúng.

### ❌ GlobalScope
Có nhiều lý do khiến bạn không nên sử dụng `GlobalScope`:
* **Thúc đẩy các giá trị hard-coding**. Nó có thể bị hấp dẫn đối với hardcode `Dispatchers` nếu bạn sử dụng `GlobalScope` ngay lập tức. Đó là một bad practice!
* **Nó làm cho việc testing rất khó khăn**. Vì code của bạn sẽ được thực thi trong một scope không được kiểm soát, bạn sẽ không thể quản lý việc thực thi công việc do nó bắt đầu.
* **Bạn không thể có một CoroutineContext chung cho tất cả các coroutines** được tích hợp vào scope như chúng ta đã làm với `applicationScope`. Thay vào đó, bạn phải chuyển một `CoroutineContext` chung cho tất cả các coroutines do GlobalScope bắt đầu.


**Khuyến nghị: Không sử dụng nó trực tiếp.**

### ❌  ProcessLifecycleOwner scope trong Android
Trong Android, có một `applicationScope` trong thư viện `androidx.lifecycle:lifecycle-process`, được truy cập bằng `ProcessLifecycleOwner.get ().lifecycleScope`.

Trong trường hợp này, bạn sẽ inject `LifecycleOwner` thay vì `CoroutineScope` như chúng ta đã làm trước đây. Trong Production, bạn sẽ pass `ProcessLifecycleOwner.get()` và trong các unit tests, bạn có thể tạo `LifecycleOwner` giả bằng cách sử dụng `LifecycleRegistry`.

Lưu ý rằng `CoroutineContext` mặc định của scope này sử dụng `Dispatchers.Main.immediate`  có thể không được mong muốn cho backgroud work. Như với `GlobalScope`, bạn phải chuyển một `CoroutineContext` chung cho tất cả các coroutines do `GlobalScope` bắt đầu.

Vì tất cả những điều trên, giải pháp thay thế này đòi hỏi nhiều công việc hơn là chỉ tạo một `CoroutineScope` trong lớp Application. Ngoài ra, cá nhân tôi không thích có các lớp liên quan đến vòng đời của Android trong các layers bên dưới ViewModel / Presenter vì các layer này phải là nền tảng bất khả tri.

**Khuyến nghị: Không sử dụng nó trực tiếp.**

### ⚠️ Tuyên bố từ chối trách nhiệm
Nếu hóa ra `CoroutineContext` của `applicationScope` của bạn khớp với `GlobalScope` hoặc `ProcessLifecycleOwner.get().LifeecycleScope`, bạn có thể chỉ định trực tiếp chúng như sau:
```
class MyApplication: Application () {
  val applicationScope = GlobalScope
}
```
Bạn vẫn nhận được tất cả các lợi ích nêu trên và bạn có thể dễ dàng thay đổi nếu cần trong tương lai.

### ❌ ✅  Sử dụng NonCancellable
Như đã thấy trong phần 2 của loạt bài này, bạn có thể sử dụng `withContext (NonCancellable)` để có thể gọi các hàm suspend trong một coroutine đã bị hủy. Chúng ta đã đề xuất sử dụng nó để thực hiện cleanup code có thể suspend. Tuy nhiên, bạn không nên lạm dụng nó.

Làm điều này là rất rủi ro vì bạn mất quyền kiểm soát việc thực hiện coroutine. Đúng là nó tạo ra mã ngắn gọn hơn và dễ đọc hơn nhưng những vấn đề mà điều này có thể gây ra trong tương lai là không thể đoán trước.
Ví dụ về cách sử dụng của nó:
```
class Repository(
  private val ioDispatcher: CoroutineDispatcher
) {
  suspend fun doWork() {
    withContext (ioDispatcher) {
      doSomeOtherWork ()
      withContext (NonCancellable) {
        veryImportantOperation ()
      }
    }
  }
}
```
Dù rất hấp dẫn nhưng bạn có thể không phải lúc nào cũng biết điều gì đằng sau `veryImportantOperation()`: có thể đó là một thư viện bên ngoài, có thể việc triển khai nằm sau một interface,… Những vấn đề nào có thể xảy ra?

* Bạn sẽ không thể dừng các hoạt động đó trong các tests.
* Vòng lặp vô tận sử dụng `delay` sẽ không thể hủy được nữa.
* Việc thu thập một `Flow` bên trong nó làm cho Flow non-cancellable từ bên ngoài.

…

Những vấn đề này có thể dẫn đến các lỗi tinh vi và rất khó debug bugs.

**Khuyến nghị: CHỈ sử dụng nó để suspending cleanup code**

Bất cứ khi nào bạn cần một số công việc để chạy ngoài current scope của nó, chúng tôi khuyên bạn nên tạo scope tùy chỉnh trong lớp `Application` của bạn và chạy các coroutine trong đó. Tránh sử dụng scope `GlobalScope`, `ProcessLifecycleOwner` và `NonCancellable` cho loại công việc này.