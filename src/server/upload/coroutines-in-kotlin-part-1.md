# Concurrency is not parallelism
- Coroutine được quản lí ở mức user level bởi Kotlin Runtime, khác hẳn vs thread là dk quản lí bởi OS. 
- Khái niệm asynchronous hay non-blocking programing là tương đương nhau. Coroutines là 1 thư viện mới hỗ trợ chỉ riêng Kotlin dùng để lập trình bất đồng bộ 
- kotlinx.coroutines là thư viện cung cấp coroutines được phát triển bời JetBrains 
- Có 2 TH hay gặp để 1 thread bị blocked. 1 là thực hiện 1 công việc tính toán yêu cầu quá nhiều resource của CPU. 2 là thực hiện các công việc lấy dữ liệu IO. 
- Các thread bị blocked có nghĩa là nó không thể thực hiện các công việc khác nữa. 
- Có 2 loại thread cần phân biệt:


|User thread (Java thread)| Kernel thread  |
| -------- | -------- | 
| Được tạo bởi User     | Được tạo bởi OS     | 
| User thread sẽ dk cấp phát bộ nhớ và mapped đến 1 kernel thread nhất định      |OS sẽ biết dk số lượng kernel thread    | 
| Implement user thread khá đơn giản     |Phức tạp      | 
| Thời gian chuyển giữa context nhanh     | Mất nhiều thời gian chuyển context    | 
| Chuyển context không cần hỗ trợ của hardware   | Cần support của hardware    | 
| Nếu 1 user thread bị blocking thì toàn bộ process chứa thread đó cug sẽ bị block   | Nếu 1 kernel thread bị blocking thì các kernel thread khác vẫn thực hiện bình thường      | 

- Nếu máy có nhiều core, các core đó có thể thực hiện đồng thời => Parallelism. Còn nếu máy có 1 core thì lúc đó OS sẽ phải lập lịch cho các thread chạy đồng thời trên 1 core đó. Có nghĩa là mỗi thread sẽ có 1 time để thực hiện công việc riêng và CPU sẽ phải phân bổ tg và thay phiên liên tục cho các thread => Điều này làm ta có cảm tưởng như rằng các thead đang chạy song song (Parallelism) nhưng thật ra là nó đang chạy đồng thời (Concurrency)
- Thông thường để update lại data từ another thread vào Main thread thì ta sử dụng cơ chế callback. Nhưng vs Coroutine thì callback dk thay thể hoàn toàn bằng 2 khái niệm là suspend và resume 
- Các suspend function chỉ được gọi từ trong coroutine hoặc từ 1 suspend function khác 
## 1. Coroutines basics
* 	Không giống vs thread thông thường thì coroutine sẽ k cần gắn vs 1 thread cụ thể nào hay cũng k cần lên lịch chạy trong 1 khoảng tg nào đó giống như thread. Thay vào đó nó thực hiện theo cơ chế đa tác vụ. Tức là trên 1 thread có thể có nhiều coroutine và khi mà có 1 coroutine nào đó rơi vào trạng thái suspended  thì Kotlin RunTime sẽ ngay lập tức tim đến 1 coroutine trên thread hiện thời để thực hiện => Điều này rất có lợi vì coroutine là 1 thành phần lightweight. Chính vì thế nó sử dụng ít memory hơn nhiều so vs thread 
* 	Coroutine bắt buộc phải liên kết tới 1 coroutine scope để nó có thể tự giải phóng khi không còn dùng nữa, thay vì ta tự xử lí lifecycle của coroutine 
* 	Để tạo Coroutine thì class chứa nó phải implement CoroutineScope interface. Nhưng cách này có vẻ là k ổn vì nó vi phạm nguyên lí trong SOLID. Vì vậy để giải quyết vấn đề này ta sẽ tạo 1 instance CoroutineScope trong chính class đó.
* 	Example: 
```kotlin
fun main(){
   GlobalScope.launch{  // tạo new coroutines và launch nó trên background thread
       delay(1000) // là non-blocking function(suspending function), được dùng cho multi-    thread synchoronize
       println("A")
}
   println("B")
   Thread.sleep(2000) // là blocking function, được dùng trên 1 thread nhất định 
}

```
> ==> Kết quả: B \n A
* > Coroutines là light-weight thread. Nó được khởi chạy trong 1 vài context nhất định của CoroutineScope và chạy bởi Coroutines builder. Với ví dụ trên ta sử dụng GlobalScope có nghĩa là lifetime của coroutines sẽ là toàn bộ chương trình
* 	Ở ví dụ trên ta cug có thể thay thế GlobalScope.launch bởi thread{ }, nhưng khi gọi hàm delay sẽ báo lỗi vì hàm này chỉ có thể được gọi từ coroutines hoặc từ 1 suspending function khác
* 	Khi ta sử dụng đồng thời cả delay và sleep như trong ví dụ trên sẽ gây ra nhập nhằng và khó hiểu trong code. Để giải quyết vấn đề này thì có thể thay thế như sau: 
```kotlin
println("B")
runBlocking{
   delay(2000)
}

```
* Cách hay hơn là khai báo coroutines như là 1 biến:
```kotlin
val job = GlobalScope.launch{
	delay(2000)
	println("A")
}
println("B")
job.joint()

```
Cách trên hay nhưng có vấn đề ở chỗ là nếu biến job không được giải phóng thì coroutine sẽ vẫn chạy và trong trường hợp tạo quá nhiều coroutines thì sẽ dễ gây lỗi OFM. Vì vậy thay vì sử dụng GlobalScope.launch{} thì chỉ sử dụng launch{} để coroutine chỉ chạy trong 1 phạm vị cụ thể :
* Các hàm trong launch{} block phải là các suspending funciton. Các hàm này có access modifier là suspend 
* Glonal Coroutines khá giống vs deamon thread 
* runBlocking{} sẽ chạy  1 coroutine mới và block thread hiện tại cho đến khi thread này thực hiện xong mọi việc. Function này không nên dk gọi trong Coroutine. Nó dk thiết kế để làm cầu nối giữa regular blocking code vs các suspend method. Nó thường dk gọi trong hàm main() 

## 2. 	Cancellation and timeouts
#### 2.1. Cancelling coroutines execution
* Có thể cancell coroutines khi nó đang thực hiện bằng cách gọi cancell() method của đối tượng Job (được trả về khi gọi launch{} block)
#### 2.2. Cancellation is cooperative 
* Tất cả các suspending function trong coroutines đều có thể cancellable. Nó kiểm tra cancellation của coroutines và trả về CancellationException khi coroutines được cancelled. 
* Tuy nhiên nếu coroutine đó đang làm công việc tính toán hoặc k check cancellation thì nó sẽ không thể cancelled. 
* Để có thể cancell 1 function đang tính toán ta phải check isActive()
#### 2.1. Closing resources with finally
* Vì khi gọi cancell các suspending funciton thì nó sẽ bắn ra CancellationException vì thế ta có thể override lại cách xử lí default bằng cách sử dụng khối try{} và finally{}	

## 3. Channels 
![](https://images.viblo.asia/e66edda7-7cdb-4e9b-bb7e-57745f7e9554.png)
* 	Channel được hiểu như là 1 pipe giữa 2 coroutine vs nhau, làm nhiệm vụ truyền data giữa 2 coroutine vs nhau. 
* Khi Channel k còn chứa bất cứ phần tử nào cần xử lí thì phải close Channel bởi nếu không close sẽ gây khiến các Coroutine vẫn tiếp tục đợi event từ Channel và cứ giữ ở trạng thái suspended 
* Để truyền 1 single value giữa các coroutines ta sử dụng Deferred value. Còn Channel dùng để truyền 1 luồng các dữ liệu 
#### 3.1. Channel basics
* Channel được hiểu rất giống như là BlockingQueue. Chỉ có điểm khác biệt là thay vì sử dụng blocking opreation thì Channel sử dụng suspending funciton. 
* Các loại channel buffers:
1.	**Rendezvous (UnBuffered)**: Là default channel buffer type. Tức là channel này sẽ k có Buffer => Coroutine sẽ bị suspended cho đến khi cả received coroutine và sending coroutine cùng sẵn sàng để truyền dữ liệu
2.	**Conflated**: Tạo Channel có buffer có size cố định là 1. Nếu trường hợp th producer cung cấp nhanh hơn khả năng mà th receiver có thể tiêu thụ thì thằng producer sẽ overwrite last item trong buffer. Trong TH này thì th producer sẽ không suspending khi gửi các item. Còn th receiver chỉ suspend khi mà k có item nào available trên channel 
3.	**Buffered**:  Tạo Channel có buffer size có thể thay đổi. Buffer này được tạo bởi Array. Thằng producer sẽ suspend sending item khi mà buffer size bị full. Còn thằng receiver sẽ suspend khi mà channel k có item nào 
4. **Unlimited**: Buffer lúc này được tạo trên cơ chế LinkedList. Điều này có thể dẫn tới TH OutOfMemory khi mà thằng receiver tiêu thụ quá chậm còn thằng producer cung cấp quá nhanh khiến bộ nhớ đệm quá tải

#### *3.2 Closing and iteration over channels*
* Không giống như queue thì Channel có thể được đóng lại để không nhận thêm bất cứ phần tử nào. Bên nhận nên sử dụng for loop để thực hiện lấy các element trong channel 
* Để đóng lại channel, không nhận thêm element nào nữa thì sử dụng close() method

#### *3.3 Building channel producers*
* Trong lập trình concurrency thông thường thì mô hình produces-consumer pattern được sử dụng khá là thông dụng. Ta có thể make abstract cho producer vào trong 1 function lấy channel làm tham số. 
* **Tất cả các function tạo ra coroutine đều là extension function của CoroutineScope.** Vì thế k nên để 1 coroutine nào đó tồn tại trong cả ứng dụng 

## 4. Composing suspending functions
* 	Thông thường ta thường muốn thực hiện các câu lệnh theo thứ tự, các câu lệnh trước sẽ làm tiền đề (đầu vào) cho các câu lệnh sau. Nhưng với các TH ta không cần mối quan hệ nào giữa câu lệnh trước và sau, hay là muốn nó thực hiện nhanh hơn thì ta sẽ sử dụng cơ chế thực hiện bất đồng bộ **(asynchronization)**
* Kotlin coroutines hỗ trợ lập trình bất đồng bộ thông qua các syntax rất đơn giản. Ta có thể sử dụng **async{} hoặc launch{}**. Về cơ bản thì 2 th này hoạt động giống nhau. Nó đều start 1 coroutine mới và chạy động thời vs các coroutine khác. Điểm khác biệt là **launch{}** trả về 1 Job object và nó k mang bất cứ dữ liệu nào. Trong khi **async{}**  trả về 1 Deferred value (light-weight non-blocking future) - có nghĩa là nó sẽ đảm bảo trả về kết quả trong future. Có thể sử dụng **await()** cho **Deferred** value để lấy giá trị cuối cùng của nó. Hơn nữa Deferred value cug là 1 Job. Chính vì vậy ta cug có thể cancell nó.

#### *4.1 Lazily started async*
* Ta cũng có thể start async job theo cách lazy. Nó cũng khá giống **lazy property** trong kotlin. Chỉ khi nào gọi **await() hoặc start()** thì **job trong async{}** mới được thực hiện. Để làm được điều này ta cần truyền thêm tham số vào **async(start = CoroutineStart.LAZY){}**

##### ★	Notes: 
➔	Coroutine context được kế thừa từ CoroutineScope, hơn nữa context của các element có thể được chỉ định cụ thể bởi context. Mỗi context sẽ có 1 dispatcher để gửi data. Mặc định thì dispatcher của Coroutine là Dispatcher.Default .<br>
➔	Thông thường thì coroutine sẽ ngay lập tức thực hiện, nhưng ta cũng có thể delay việc thực hiện các job bằng 1 trong 2 cách tường minh hoặc k tường minh thông qua 2 method start() hoặc join() <br>
➔	Sau khi thực hiện async() method thì nó sẽ trả về 1 đối tượng Deferred có khiểu tham số truyền vào là giá trị trả về của job được yêu cầu thực hiện 

## 5. Coroutine context and Dispatchers
* Coroutine luôn luôn phải được thực hiện trong 1 context cụ thể nào đó. 
* Mỗi Coroutine context đều phải chứa 1 dispatcher nào đó để xác định thread hoặc những threads nào phù hợp vs các job cần thực hiện 
* Dispatcher dùng để chỉ định thread mà coroutine sẽ đk execute trên đó 
* Với Dispatcher.IO thì sẽ có 1 số lượng max threads nhất định được sử dụng 
* Có 4 loại dispatcher trong coroutine là :
* ➔	**Dispatcher.Default**: <br>
■	Các dispatcher builder như launch{}, async{}... sử dụng Default dispatcher <br>
■	Dispatcher lấy các thread từ shared pool của JVM. Mặc định số thread tối đa được sử dụng bởi Dispatcher sẽ = vs số core của máy. Nhưng ít nhất thì nó có thể tạo ra gấp đôi số lượng này <br>
■	Thực hiện các task vụ chuyên sâu về tính toán cho CPU <br>
■	Bất cứ task vụ nào chạy dài, mất nh tg trên main thread thì nên sử dụng Dispatcher.Default 
* ➔	**Main**: <br>
■	Nên sử dụng khi lấy lại data response từ các Dispatcher khác <br>
■	Dispatcher.Main có thể được sử dụng trực tiếp hoặc thông qua MainScope factory <br>
■	Thường thì main dispatcher sẽ là single-threaded <br>
■	Nếu truy cập vào dispatcher hiện tại không có thì sinh ra IllegalStateException<br>
■	Tùy theo từng platform mà Dispatcher.Main có thể là Dispatcher.Default <br>
* ➔	**Unconfined**: <br>
■ Thích hợp vs các công việc k liên quan đến tính toán, tiêu thụ tài nguyên CPU cũng như k liên quan đến hoạt động update UI<br>
■	Không bị giới hạn trong bất cứ 1 thread cụ thể nào
* ➔	**IO**: <br>
■	Được sử dụng trong các trường hợp dùng cho Network hoặc Disk<br>
■	Được thiết kế để giảm tải blocking IO<br>
■	Dispatcher IO lấy các thread trong shared thread pool, các thread này có thể start và shutdown theo yêu cầu<br> 
■	Số lượng thread được sử dụng bởi Dispatcher IO bị giới hạn bởi system <br>
■	Mặc định thì số lượng thread bị giới hạn là 64 hoặc là bằng số lượng core của máy <br>
■	Dispatcher IO sử dụng chung shared thread vs Dispatcher Default <br>

* Interface CoroutineContext chứa 2 interface con là Element và Key. Trong đó interface Element implement CoroutineContext và chứa 1 property là abstract val Key
* Coroutine context là immutable, nhưng ta vẫn có thể add element vào context 

## 6. Element 
* Element cũng là 1 interface kế thừa từ coroutine context và nó là singleton 
* Các Element trong cùng 1 context mà có key giống nhau sẽ được loại bỏ
* Trong trường hợp context k chứa bất kì element nào thì có thể sử dụng EmptyCoroutineContext 
* Các interface kế thừa từ Element hay dùng: <br>
1.**ContinuationInterceptor** : Được gọi cho mục đích tiếp tục thực hiện, quản lí việc execution của các thread cơ bản <br>
2.**Job**: Được hiểu như là 1 model life-cycle hay 1 task sẽ được coroutine thực hiện<br>
3.**CoroutineExceptionHandler**<br>
4.**CoroutineName**: Được sử dụng cho mục đích debugging<br>
* Element coroutine context là 1 singleton context 

## 7. Job
* Thường thì Job instance sẽ được trả về khi thực hiện launch{} block (Coroutine builder)
* Mặc định nếu 1 Job nào đó bị lỗi thì ngay lập tức parent cũng sẽ bị lỗi và cancell tất cả các job con còn lại trong parent. Nhưng ta cũng có thể customize lại cơ chế này thông qua SupervisorJob 
* Các Job chạy độc lập vs nhau và không trả về bất kì result nào. Để trả vể result thì sử dụng Deferred value thông qua async{} block
* Các state của Job :

* | **State**                        | [isActive] | [isCompleted] | [isCancelled] |
* | -------------------------------- | ---------- | ------------- | ------------- |
* | _New_ (optional initial state)   | `false`    | `false`       | `false`       |
* | _Active_ (default initial state) | `true`     | `false`       | `false`       |
* | _Completing_ (transient state)   | `true`     | `false`       | `false`       |
* | _Cancelling_ (transient state)   | `false`    | `false`       | `true`        |
* | _Cancelled_ (final state)        | `false`    | `true`        | `true`        |
* | _Completed_ (final state)        | `false`    | `true`        | `false`       |
* Thông thường các Job khi được khởi tạo sẽ tự động dk start luôn => ở trạng thái active. Tuy nhiên nếu muốn start 1 cách manually thì có thể truyền start param vào coroutine Builder và gọi start() hoặc join()  để active Job 
* Khi 1 Job bị failure thì nó sẽ rơi vào trạng thái cancelling.
* Job là 1 model lifecycle và có thể bị cancell ở bất cứ thời điểm nào bằng cách gọi cancell() method => bắt buộc Job phải chuyển sang trạng thái cancelling ngay lập tức và sau đó chuyển sang trạng thái cancelled khi thực hiện xong

## 8. Tài liệu tham khảo
[Kotlin coroutines ](https://kotlinlang.org/docs/reference/coroutines-overview.html)