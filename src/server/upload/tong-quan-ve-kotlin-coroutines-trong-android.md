# Giới thiệu
Coroutines xây dựng dựa trên các chức năng thông thường bằng cách thêm hai hoạt động mới (ngoài việc invoke/call và return):
* suspend - tạm dừng việc thực thi coroutine hiện tại, lưu tất cả các biến cục bộ. Luồng hiện tại có thể tiếp tục công việc của nó, trong khi mã tạm ngừng chạy trên một luồng khác.
* resume  - tiếp tục suspended coroutine từ nơi nó đã bị tạm dừng khi kết quả đã sẵn sàng.

Các hoạt động này phối hợp với nhau để thay thế các callbacks.
Chức năng này được thêm vào bằng cách đánh dấu một chức năng với từ khóa "tạm ngưng". Bạn chỉ có thể gọi các chức năng tạm ngưng từ các chức năng tạm ngưng khác hoặc bằng cách sử dụng trình tạo quy trình đăng ký để bắt đầu một quy trình đăng ký mới.

# Structured concurrency
Kotlin đã giới thiệu structured concurrency - sự kết hợp của các tính năng ngôn ngữ và các phương pháp hay nhất, khi được tuân theo, sẽ giúp bạn theo dõi tất cả công việc đang chạy trong coroutines. Trên Android, chúng ta sử dụng nó cho 3 việc:

* Hủy bỏ công việc khi không còn cần thiết.
* Theo dõi công việc trong khi nó đang chạy.
* Lỗi tín hiệu khi một chương trình điều tra không thành công.

Đảm bảo đồng thời có cấu trúc:
* Khi một phạm vi hủy bỏ, tất cả các đăng quang của nó sẽ hủy bỏ.
* Khi một hàm tạm dừng trả về, tất cả công việc của nó đã được thực hiện xong.
* Khi một quy trình đăng ký bị lỗi, người gọi hoặc phạm vi của nó sẽ được thông báo.

Coroutines phải chạy trong CoroutineScope, được sử dụng để theo dõi tất cả các coroutines và nó có thể hủy bỏ tất cả các coroutines bắt đầu trong đó. Khi một Scope hủy bỏ, tất cả các Coroutine của nó sẽ hủy bỏ. Các coroutines mới được khởi chạy bởi coroutines của bạn sẽ có cùng phạm vi.

Trong Android, việc liên kết CoroutineScope với màn hình người dùng (thường bằng cách khởi động các coroutines trong ViewModel) là rất hợp lý. Khi người dùng rời khỏi màn hình - CoroutineScope liên quan có thể hủy bỏ tất cả công việc.

Các Coroutine được hủy bỏ bằng cách đưa ra một CancellationException khi coroutine  bị tạm dừng. Nếu bạn sử dụng CancelException trong một trình xử lý cấp thấp hoặc không bao giờ tạm ngừng, coroutine  sẽ kéo dài ở trạng thái semi-canceled.

# CoroutineScope
Bắt đầu một chương trình đăng quang yêu cầu một CoroutineScope lấy CoroutineContext làm tham số cho phương thức khởi tạo của nó. Phần sau được cấu tạo bởi các yếu tố:
* Job - kiểm soát vòng đời của Coroutine.
* CoroutineDispatcher (mặc định là Dispatchers.Default) - điều phối hoạt động tới luồng thích hợp.
* CoroutineName (tùy chọn, mặc định là "coroutine") - tên của coroutine, hữu ích cho việc gỡ lỗi.
* CoroutineExceptionHandler (tùy chọn) - xử lý các trường hợp ngoại lệ chưa có.

Khi tạo một CoroutineContext, các phần tử có thể được kết hợp với toán tử “+”:
```
val myContext: CoroutineContext = Job() + Dispatchers.Main
val myScope = CoroutineScope(myContext + CoroutineName("my name"))
```

# Job
Có thể sử dụng Job hoặc SupervisorJob. Job hủy bỏ tất cả những Job con của mình nếu một trong số chúng không thành công. SupervisorJob - thì không, vì vậy bạn thường nên sử dụng SupervisorJob cho phạm vi cấp cao nhất.
Một công việc có thể trải qua các trạng thái: New, Active, Completing, Completed, Cancelling and Cancelled. Chúng ta không có quyền truy cập vào các trạng thái, nhưng chúng tôi có thể truy cập các thuộc tính sau: isActive, isCancelling và isCompleted.
Nếu Coroutine đang Active, coroutine failure hoặc gọi job.cancel () sẽ thay đổi trạng thái của công việc thành Cancelling (isActive = false, isCancell = true). Sau khi tất cả Job con đã hoàn thành công việc của mình, Coroutine sẽ chuyển sang trạng thái Cancelled và isCompleted = true.

# CoroutineDispatcher
Được sử dụng để chỉ định nơi coroutine sẽ chạy.

![](https://images.viblo.asia/dd9df210-3bda-4d3e-8144-fa749e176829.png)

> Cũng có Dispatchers.Unconfined, một Dispatcher start coroutine trong Thread đang gọi, nhưng sau khi suspension point resumes trong bất kỳ Thread nào được sử dụng bởi suspending function tương ứng. Lưu ý rằng đó là một cơ chế nâng cao có thể hữu ích trong một số trường hợp , nhưng như đã nêu trong các tài liệu chính thức, nó không nên được sử dụng trong general code. Xin chân thành cảm ơn Denis Tufanov đã chỉ ra điều này

# Existing scopes
* Trong ViewModels, bạn có thể sử dụng thuộc tính mở rộng viewModelScope để bắt đầu các Coroutine. Nó sử dụng CoroutineContext với SupervisorJob và Dispatchers.Main. Khi ViewModel bị xóa, nó thực thi phương thức clear trước khi gọi onCleared. Trong clear method của ViewModel hủy Job của viewModelScope.
* Đối với LiveData - KTX liveData có thể được sử dụng để gọi hàm tạm ngưng và trả về kết quả của nó dưới dạng đối tượng LiveData:
* Ngoài ra còn có các Scope nhận biết vòng đời: lifeecycle.coroutineScope và lifeecycleOwner.lifecycleScope. Chúng có sẵn từ Lifecycle hoặc từ LifecycleOwner (Activity hoặc Fragment), nhưng việc sử dụng chúng không được khuyến khích
Các dependencies  cho các scope ở trên là:

```
androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.0-alpha07
androidx.lifecycle:lifecycle-livedata-ktx:2.3.0-alpha07
androidx.lifecycle:lifecycle-runtime-ktx:2.3.0-alpha07
```

Để thực thi với các hoạt động không nên hủy bỏ, GlobalScope có thể được sử dụng, nhưng một giải pháp thay thế tốt hơn sẽ là tạo một custom scope trong Application class và đưa nó vào class cần nó. Điều này có lợi thế là cung cấp cho bạn khả năng sử dụng CoroutineExceptionHandler hoặc thay thế CoroutineDispatcher để testing.

Thí dụ:
```
class MyApplication : Application() {
   val myAppScope = CoroutineScope(SupervisorJob() + otherConfig)
}
```

Lưu ý rằng SupervisorJob được sử dụng để ngăn exceptions của Job con hủy bỏ Job anh chị em của nó và không cần hủy scope: nó sẽ được chia nhỏ theo quy trình.
Bạn có thể sử dụng phạm vi này bên trong các coroutines khác theo cách sau:
```
suspend fun someUseCaseFunction() {
   myAppScope.launch { veryImportantOperation() }.join(
   // or
   myAppScope.async { veryImportantOperation() }.await()
}
```

# Tạo các coroutine mới
Khi bạn có CoroutineContext, bạn có thể sử dụng các phương thức launch () hoặc async () để bắt đầu một coroutine mới
* launch () - bắt đầu một coroutine mới "fire and forget" - điều đó có nghĩa là quy trình này sẽ không trả lại kết quả cho người gọi.
* async () - bắt đầu một coroutine mới và nó cho phép bạn trả về một kết quả với một hàm tạm ngưng được gọi là await ().

Vì một hàm thông thường không thể gọi hàm tạm dừng await () - thường thì nên start coroutine bằng launch().
Mỗi coroutine bạn tạo:
* trả về một Công việc có thể được sử dụng để quản lý vòng đời của nó.
* kế thừa CoroutineContext từ cha của nó (một quy trình khác hoặc CoroutineScope) và ghi đè các context parameters nếu bạn chỉ định bất kỳ.
Lưu ý: mối quan hệ cha-con giữa Scope và coroutines được tạo bằng cách sử dụng các đối tượng Job.
Nói chung, bạn nên bắt đầu các coroutines trong main thread bằng cách sử dụng Dispatchers.Main, để nếu bạn không thực hiện một tác vụ lâu dài - kết quả sẽ có sẵn trong khung tiếp theo cho người dùng.

# Chuyển đổi dispatchers
Bên trong một quy trình đăng ký, bạn có thể chuyển đổi chúng bất kỳ lúc nào bằng cách sử dụng withContext ():
```
suspend fun get(url: String) =
   /* perform some work on Dispatchers.Main */
   withContext(Dispatchers.IO) { /* some work on Dispatchers.IO */ }
   /* perform some more work on Dispatchers.Main */
```
Quy trình đăng ký sẽ tạm dừng, cho phép luồng chính thực hiện công việc khác và tiếp tục để tiếp tục thực hiện sau khi khối bên trong withContext () trả về.
Một số lệnh gọi tới withContext () với cùng một trình điều phối được tối ưu hóa để duy trì trên cùng một chuỗi. Việc chuyển từ Dispatchers.IO sang Dispatchers.Default cũng được tối ưu hóa để ngăn chuyển đổi luồng nếu có thể.

# Công việc đồng thời
Để thực hiện công việc đồng thời, bạn có thể sử dụng coroutineScope () hoặc supervisorScope ().
Chúng xử lý các trường hợp ngoại lệ theo cách khác nhau và coroutineScope () sẽ hủy bất cứ khi nào bất kỳ phần tử con nào của nó không thành công và supervisorScope () sẽ không hủy các phần tử con khác khi một trong số chúng không thành công.
Trình xây dựng coroutineScope () sẽ tự tạm ngưng cho đến khi tất cả các quy trình khởi động bên trong nó hoàn tất (hoặc một trong số chúng không thành công bằng cách ném một ngoại lệ):

```
suspend fun fetchTwoDocs() {
   val list: List<Document> = coroutineScope {
      val doc1: Deferred<Document> = async { fetchDoc(1) }
      val doc2: Deferred<Document> = async { fetchDoc(2) }
      launch { fetchDoc(3) } // use launch if no result is needed
      
      return@coroutineScope listOf(doc1.await(), doc2.await())
   }
}
```

Lưu ý: tất cả các coroutines trong ví dụ trên đều có cùng một CoroutineScope: một hàm được sử dụng để bắt đầu coroutine ban đầu được gọi là hàm fetchTwoDocs.
Bạn có thể sử dụng await () với coroutineScope khi bạn muốn thực hiện hai việc đồng thời và sử dụng kết quả kết hợp sau khi cả hai hoàn thành.
Đối với các công việc được tạo bằng khởi chạy (), bạn có thể gọi job.join () để tạm dừng quy trình điều tra cho đến khi công việc hoàn thành.

# Yêu cầu một lần và các mẫu đồng thời
Thông thường, giải pháp tốt nhất và đơn giản nhất chỉ là vô hiệu hóa giao diện người dùng (nút) được sử dụng để kích hoạt yêu cầu.
Ngoài ra, để xử lý yêu cầu một lần được gọi nhiều lần (ví dụ: nhấp đúp vào các nút), có ba mẫu đồng thời:
Hủy bỏ công việc trước đó trước khi bắt đầu làm việc khác.
Xếp hàng đợi công việc tiếp theo và đợi các yêu cầu trước đó hoàn thành trước khi bắt đầu một công việc khác.
Tham gia công việc trước đó nếu đã có một yêu cầu đang chạy, chỉ cần trả lại yêu cầu đó thay vì bắt đầu một yêu cầu khác.
Có thể tìm thấy hai lớp thực thi các mẫu đồng thời ở trên.

# Xử lý ngoại lệ
Nếu một quy trình đăng ký (bao gồm cả những quy trình bắt đầu trong các quy trình đăng ký khác) không tự xử lý các ngoại lệ bằng mệnh đề try-catch, thì ngoại lệ sẽ không được ném lại: nó được “truyền bá lên hệ thống phân cấp công việc” và có thể được xử lý bởi một CoroutineExceptionHandler .
CoroutineExceptionHandler phải được thêm vào phạm vi hoặc chương trình điều tra cấp cao nhất để bắt các ngoại lệ.
```
val exceptionHandler = CoroutineExceptionHandler {
   coroutineContext, exception -> /* handle exception */ 
}
val topLevelScope = CoroutineScope(Job() + exceptionHandler)
// or
topLevelScope.launch(exceptionHandler) { … }
```

Nếu chương trình điều tra không xử lý ngoại lệ với một lần thử bắt và không có CoroutineExceptionHandler - trình xử lý ngoại lệ không cần thiết của chuỗi sẽ được gọi! Một thử nghiệm xung quanh một quy trình cấp cao nhất sẽ không bắt được những trường hợp ngoại lệ này.
Sử dụng try-catch nếu bạn muốn thử lại thao tác hoặc thực hiện các hành động khác trước khi Quy trình hoàn tất (trong trường hợp này, ngoại lệ không được phổ biến trong hệ thống phân cấp công việc).
Sử dụng CoroutineExceptionHandler cho logic sẽ xảy ra sau khi hoàn tất quy trình đăng ký.
Các ngoại lệ chưa xuất hiện trong cả khởi chạy () và async () ngay lập tức được truyền lên hệ thống phân cấp công việc.
coroutineScope () ném lại các ngoại lệ của các coroutines con bị lỗi của nó thay vì tuyên truyền chúng lên hệ thống phân cấp công việc. Điều này cho phép bạn xử lý các trường hợp ngoại lệ của các quy trình không thành công với try-catch.
supervisorScope () cài đặt một phạm vi con độc lập mới với SupervisorJob là công việc của phạm vi mới. Phạm vi mới này không tuyên truyền các ngoại lệ của nó và phải tự xử lý các ngoại lệ.
Coroutines được bắt đầu trực tiếp từ supervisorScope () là coroutines cấp cao nhất. Bởi vì điều này - bạn có thể sử dụng CoroutineExceptionHandler trong đó.
Các quy trình đăng ký cấp cao nhất, bao gồm các đăng ký trong supervisorScope (), hoạt động khác với các quy trình đăng ký con khi chúng được bắt đầu với khởi chạy () hoặc async () và hành vi của chúng phụ thuộc vào quy trình đăng ký được sử dụng để khởi động chúng:
Nếu chương trình đăng quang cấp cao nhất đã được bắt đầu là chương trình khởi chạy (), thì ngoại lệ có thể được xử lý bởi một CoroutineExceptionHandler.
Nếu chương trình đăng quang cấp cao nhất được bắt đầu bằng async (), thì ngoại lệ được gói gọn trong kiểu trả về Trì hoãn và được ném lại khi .await () được gọi trên nó.

# Cancelation
Bạn có thể sử dụng phương thức hủy bỏ () của Công việc hoặc CoroutineScope để hủy công việc.
Hủy phạm vi cũng hủy các con của nó. Việc hủy bỏ một đứa trẻ không ảnh hưởng đến các anh chị em khác.
Coroutines bị hủy bằng cách ném ra một ngoại lệ hủy bỏ. Điều này có thể được sử dụng để xử lý việc hủy bỏ. Khi hủy, bạn có thể cung cấp phiên bản của riêng bạn về nó làm tham số để hủy () để cung cấp thông tin chi tiết về lý do hủy.
Sau khi bạn hủy phạm vi, bạn sẽ không thể khởi chạy các quy trình điều tra mới trong phạm vi đã hủy.

# Making coroutines cancelable
Việc hủy bỏ phải hợp tác: mã đang chạy sẽ không tự dừng lại.
Các hàm tạm ngưng từ kotlinx.coroutines (ví dụ: withContext ()) có thể hủy được, đối với các hàm khác - bạn có thể kiểm tra thủ công xem quy trình đăng quang đã bị hủy hay chưa theo các cách sau:
job.isActive - điều này cho phép bạn thực hiện các hành động khác khi hủy nhưng yêu cầu câu lệnh if.
job.ensureActive () - ném một ngoại lệ hủy bỏ ngay lập tức.
CoroutineScope.yield () - có thể được sử dụng công việc nặng CPU, có thể làm cạn nhóm luồng hoặc nếu bạn muốn cho phép luồng thực hiện công việc khác mà không cần phải thêm nhiều luồng vào nhóm. Hoạt động đầu tiên được thực hiện bởi lợi nhuận sẽ kiểm tra xem đã hoàn thành và ném ra một ngoại lệ hủy bỏ nếu công việc không hoạt động (isActive = false).
Một vị trí tốt cho hàm yi () hoặc ensureActive () có thể là nơi bắt đầu mỗi chu kỳ của một vòng lặp nhiều công việc.

# Sự khác biệt giữa Job Và Deferred
Đối với Công việc - việc gọi job.cancel () và job.join () sau sẽ tạm dừng quy trình đăng ký hiện tại cho đến khi công việc hoàn thành.
Đối với Deferred - gọi deferred.cancel () và sau đó deferred.await () ném JobCancellationException.
Việc gọi hủy bỏ () sau khi job.join () hoặc deferred.await () không có tác dụng.

# Xử lý các tác dụng phụ
Hai lựa chọn:
Kiểm tra! IsActive.
Vì CancelException được ném ra, bạn có thể bọc mã trong một lần thử bắt và đặt mã dọn dẹp vào khối cuối cùng.
Lưu ý: sau khi hủy, quy trình đăng ký ở trạng thái Đã hủy và không thể tạm ngừng nữa. Nếu bạn cần tạm ngưng - hãy sử dụng withContext (NonCancellable) {…} để dọn dẹp nếu cần. Chỉ sử dụng NonCancellable để tạm ngừng mã xóa.

# Thực hành tốt nhất
1. Mọi chức năng tạm ngưng phải an toàn chính.
2. Luôn đưa Dispatchers vào các lớp. Nó làm cho việc kiểm tra dễ dàng hơn vì bạn có thể thay thế chúng trong các bài kiểm tra đơn vị và thiết bị.
3. Lớp ViewModel / Presenter sẽ tạo các coroutines. Lớp giao diện người dùng phải “câm” và không kích hoạt bất kỳ logic nghiệp vụ nào.
4. Các lớp bên dưới lớp ViewModel / Presenter nên hiển thị các chức năng và Luồng tạm ngưng. Sử dụng coroutineScope hoặc supervisorScope nếu bạn cần tạo thêm các coroutines. Người gọi (thường là ViewModel) sẽ có thể kiểm soát việc thực thi, vòng đời và hủy bỏ.
5. Thích sử dụng phạm vi tùy chỉnh, được tạo trong lớp Ứng dụng, trên GlobalScope hoặc lifeecycleScope. Họ yêu cầu bạn tiêm một CoroutineContex tùy chỉnh để kiểm soát vòng đời của các coroutines. lifeecycleScope cũng yêu cầu bạn nhập ProcessLifecycleOwner.get () và sử dụng giả mạo trong các thử nghiệm.

# Kiểm tra Coroutines: những thử nghiệm không tạo ra coroutines mới
Điều này thường xảy ra khi kiểm tra chức năng tạm ngưng.
Một tùy chọn là sử dụng runBlocking () - một phương thức bắt đầu một quy trình đăng ký và chặn luồng nơi nó đang được gọi cho đến khi khối mã trong quy trình đăng ký kết thúc:
```
fun someTest = runBlocking {
   someSuspendingFunction()
   // assert something happened
}
```
Bạn cũng có thể sử dụng runBlockingTest () - sự khác biệt so với runBlocking () là nó bỏ qua các lệnh gọi đến delay () (nếu bạn có bất kỳ lệnh nào trong đoạn mã đang kiểm tra), làm cho các bài kiểm tra chạy nhanh hơn.
Ngoài ra, runBlockingTest () sẽ ném lại ngoại lệ đầu tiên không cần thiết, nếu có bất kỳ lỗi nào hoặc UncompletedCoroutinesError nếu bất kỳ tác vụ đang chờ xử lý nào vẫn hoạt động khi quá trình kiểm tra hoàn thành.

# Testing Coroutines: tests that create new coroutines
Điều này thường xảy ra đối với lớp ViewModel, nơi hầu hết các coroutines được tạo.
Đầu tiên, đưa một điều phối viên vào lớp tạo quy trình đăng ký và trong quá trình kiểm tra - thay thế nó bằng một TestCoroutineDispatcher và sử dụng runBlockingTest ():
```
val testDispatcher = TestCoroutineDispatcher()
fun `test buttonClicked`() = testDispatcher.runBlockingTest {
   val viewModel = ViewModel(testDispatcher)
   viewModel.onButtonClicked()
   // assert something happened
}
```
Bất kỳ quy trình đăng ký nào đang chạy trên bộ điều phối sẽ được thực thi đồng bộ. Nếu hàm onButtonClicked làm điều gì đó khác trước khi bắt đầu quy trình đăng ký, bạn có thể sử dụng testDispatcher.pauseDispatcher () và testDispatcher.resumeDispatcher () để kiểm tra chúng:
```
val testDispatcher = TestCoroutineDispatcher()
fun `test buttonClicked`() = testDispatcher.runBlockingTest {
   val viewModel = ViewModel(testDispatcher)
   testDispatcher.pauseDispatcher()
   viewModel.onButtonClicked()
   // assert something else happened
   testDispatcher.resumeDispatcher()
   // assert something happened
}
```
Thư viện kotlinx.coroutines.test cũng có TestCoroutineScope, bạn có thể sử dụng để thay thế một CoroutineScope được đưa vào một số lớp.

Nguồn ở đây chứ đâu : https://medium.com/swlh/kotlin-coroutines-in-android-summary-1ed3048f11c3