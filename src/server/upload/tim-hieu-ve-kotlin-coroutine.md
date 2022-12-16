## 1. Coroutine là gì ?  
Về cơ bản thì coroutines là 1 thuật toán có khả năng dừng (suspend) và tiếp tục (resume) việc thực thi code nằm trong nó mà không làm cho thread bị block. Trong Android, nếu bạn chạy 1 hàm phức tạp nào đó trên main thread thì nó sẽ block UI cho đến khi hàm chạy xong.  
Block UI sẽ làm cho app rơi vào trạng thái ANR và khả năng lớn là user sẽ uninstall app của bạn. Ngược lại, suspend tỏ ra khá hiệu quả khi bạn không cần phải quan tâm đến context switch hay cần hiểu biết về OS, những thứ đó coroutines sẽ làm giúp bạn. Chúng ta có thể dễ dàng điều khiển việc suspend của coroutines thông qua suspension point (tạm dịch - điểm dừng). Trong Kotlin, suspension point được thể hiện thông qua lời gọi đến những hàm được đánh dấu bởi từ khóa suspend.  (Chi tiết hơn về suspend mình sẽ nói bên dưới)  
=>  Tổng quan : 

```javascript
Coroutine giống như light-weight thread. Nhưng nó không phải là thread.   
Nó giống thread ở chỗ là các coroutine có thể chạy song song, đợi nhau và trao đổi dữ liệu với nhau.   
Sự khác biệt lớn nhất so với thread là coroutine rất rẻ, gần như là hàng free, chúng ta có thể chạy hàng nghìn coroutine mà gần như không ảnh hưởng lớn đến performance.  
Một thread có thể chạy nhiều coroutine.
Coroutine không phải lúc nào cũng chạy trên background thread, chúng cũng có thể chạy trên main thread.
```

## 2. Blocking , non-Blocking và Suspend
**Blocking**  
Các bạn cùng quan sát ví dụ dưới đây nhé 
```javascript
fun functionA() { println("in ra A") }
fun functionB() { println("in ra B") }
fun main() {
       // chạy functionA và functionB
       functionA()
       functionB()
}
```

Sau khi chạy hàm main thì chuyện gì sẽ xảy ra. Main thread sẽ chạy xong hết functionA rồi mới chạy tiếp functionB. Các dòng lệnh, các hàm được thực hiện một cách tuần tự từ trên xuống dưới. Khi một dòng lệnh ở phía trước chưa được hoàn thành thì các dòng lệnh phía sau sẽ chưa được thực hiện và phải đợi khi mà thao tác phía trước hoàn tất. 
=> Đó là 1 khối blocking bình thường (chạy tuần tự)

Nếu như các dòng lệnh trước là các thao tác cần nhiều thời gian xử lý như liên quan đến IO (Input/Output) hay mạng (Networking) thì bản thân nó sẽ trở thành vật cản trở cho các lệnh xử lý phía sau mặc dù theo logic thì có những việc ở phía sau ta có thể xử lý được luôn mà không cần phải đợi vì chúng không có liên quan gì đến nhau.

Ví dụ như chúng ta cần get tất cả videos trong máy và get thông tin máy.  
```javascript
fun main() {
    getVideosFromInternet() // Giả sử hàm này chạy mất hết 2 phút
    getInfoCustomer() // phải đợi hàm getVideosFromInternet() chạy xong mới được chạy trong khi hàm này chẳng liên quan gì đến getVideos
    updateUiInfo()
}
```
Như vậy người dùng phải chờ ít nhất 2 phút sau thì mới hiển thị được info lên màn hình. (Thật sự như vậy là quá lâu, hiếm có người dùng nào kiên nhẫn đc như vậy mà ko gỡ app của bạn :< )

**Non-Blocking**  
Trái ngược lại cách chạy tuần tự trong khối Block, thì trong khối Non-Blocking các dòng lệnh không nhất thiết phải lúc nào cũng phải thực hiện một cách tuần tự (sequential) và đồng bộ (synchronous) với nhau.  
Các dòng lệnh phía sau được chạy ngay sau khi dòng lệnh phía trước được gọi mà không cần đợi cho tới khi dòng lệnh phía trước chạy xong.
Để thực hiện mô hình Non-Blocking, người ta có những cách để thực hiện khác nhau, nhưng về cơ bản vẫn dựa vào việc dùng nhiều Thread khác nhau trong cùng một Process (tiến trình), hay thậm chí nhiều Process khác nhau (inter-process communication – IPC) để thực hiện.
Vậy coroutine có thể chạy non-blocking. Non-blocking nhưng không cần phải dựa vào việc dùng nhiều thread. Một thread chạy nhiều coroutine cũng có thể chạy được mô hình non-blocking.  

**Suspend function**  
Hình ảnh bên dưới mô ta quy trình thực thi 2 function là functionA và functionB trong khối Block

![](https://images.viblo.asia/f04c3995-4841-4dfb-854d-4f4f4b741572.png)  
Hình ảnh biểu diễn một thread đang chạy 2 function là functionA và functionB. Chúng ta có thể thấy thread đó phải chạy xong function A rồi mới đến functionB. Đây là cách chạy phổ biến của normal function mà chúng ta vẫn hay code.  
Hình ảnh mô tả khi sử dụng suspend   
![](https://images.viblo.asia/4fe5c381-1d96-4121-bdbc-3130b6a9d6eb.png)  
Suspend function cho phép ta làm được điều vi diệu hơn. Đó là suspend function có khả năng ngừng hay gián đoạn việc thực thi một tát (trạng thái ngừng là trạng thái suspend) và có thể tiếp tục thực thi lại khi cần thiết. Như hình ảnh bên trên : functionA bị gián đoạn để functionB chạy và sau khi functionB chạy xong thì function A tiếp tục chạy tiếp.
Một vài lưu ý với suspend function:  
Suspend function được đánh dấu bằng từ từ khóa suspend. 
```javascript
suspend fun sayHello() {
    delay(1000L)
    println("Hello!")
}
```  

Chỉ có thể được gọi suspend function bên trong một suspend function khác hoặc bên trong một coroutine.  
Ví dụ hàm delay trong đoạn code trên là một suspend function và chỉ được gọi trong hàm suspend function khác là hàm sayHello. Nếu ta xóa từ khóa suspend trong hàm sayHello thì hàm sayHello sẽ không còn là suspend function nữa mà chỉ là một function bình thường. Khi đó hàm delay sẽ bị lỗi compile như sau:  
```javascript
Error: Kotlin: Suspend functions are only allowed to be called from a coroutine or another suspend function
```
##  3. CoroutineContext và Dispatcher
Mỗi coroutine trong Kotlin đều có một context được thể hiện bằng một instance của interface CoroutineContext. Context này là một tập các element cấu hình cho coroutine.
Các loại element trong coroutine context gồm:  
Job: nắm giữ thông tin về lifecycle của coroutine  

Dispatcher: Quyết định thread nào mà coroutine sẽ chạy trên đó. Có các loại dispatcher sau:  

- Dispatchers.Main: chạy trên main UI thread

- Dispatchers.IO: chạy trên background thread của thread pool. Thường được dùng khi Read, write files, Database, Networking

- Dispatchers.Default: chạy trên background thread của thread pool. Thường được dùng khi sorting a list, parse Json, DiffUtils

newSingleThreadContext("name_thread"): chạy trên một thread do mình đặt tên

newFixedThreadPoolContext(3, "name_thread"): sử dụng 3 threads trong shared background thread pool

Job và Dispatcher là 2 element chính trong CoroutineContext. Ngoài ra còn một số element khác như:

CoroutineName("name"): đặt tên cho coroutine  

NonCancellable: không thể cancel kể cả khi đã gọi method cancel coroutine  

Các element này sẽ được mình giải thích rõ hơn qua code example trong các mục bên dưới.  

![](https://images.viblo.asia/7c955532-70aa-4df3-9a07-b204317bff3b.png)

Toán thử plus (+) để thêm các element vào coroutineContext  
Sử dụng toán tử cộng để set nhiều loại element cho coroutine context như sau:
```javascript
// set context khi sử dụng runBlocking { } để start coroutine
runBlocking(Dispatchers.IO + Job()) {
}

// hoặc set context khi sử dụng launch { } để start coroutine
GlobalScope.launch(newSingleThreadContext("demo_thread") + CoroutineName("demo_2") + NonCancellable) {
}
```

Note :  
Nếu không set coroutine context cho coroutine thì default nó sẽ nhận Dispatchers.Default làm dispatcher và tạo ra một Job() để quản lý coroutine  
```javascript
GlobalScope.launch {
        // tương đương với GlobalScope.launch (Dispatchers.Default + Job()) { }
}
```

## 4. Các element và các hàm trong Coroutine 
**Job**   
Job nắm giữ thông tin về lifecycle của coroutine. Mỗi khi launch một coroutine sẽ trả về một đối tượng Job này  
```javascript
val job = GlobalScope.launch { // launch a new coroutine and keep a reference to its Job
       delay(5000L)
       println("World!")
   }
```
**Join()**   
Đợi cho Coroutine chạy xong mới chạy tiếp 
   ```javascript
 fun main() = runBlocking {
   val job = GlobalScope.launch { // launch a new coroutine and keep a reference to its Job
       delay(5000L)
       println("World!")
   }
   println("Hello,")
   job.join() // wait until child coroutine completes
   println("Kotlin")
}
```
  
 output :   
  ```javascript
22:07:20 I/System.out: Hello
22:07:25 I/System.out: World
22:07:25 I/System.out: Kotlin
```

**Hàm Cancel()**  
Huỷ bỏ một Coroutine 
```javascript
Để dừng và hủy bỏ một coroutine đang chạy. Ta có thể dùng method cancel() của biến Job  
fun main() = runBlocking {
    val job = launch {
        repeat(1000) { i ->
            println("I'm sleeping $i ...")
            delay(500L)
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancel() // cancels the job
    println("main: Now I can quit.")    
}
```

output : 
```javascript
I'm sleeping 0 …
I'm sleeping 1 …
I'm sleeping 2 …
main: I'm tired of waiting!
main: Now I can quit.
```

## 5. Async và Await  
Các bạn cùng xem ví dụ này nhé
```javascript
fun main() = runBlocking {
    val int: Deferred<Int> = async { printInt() }
    val str: Deferred<String> = async { return@async "Sun" }
    val unit: Deferred<Unit> = async { }

    println("Int = ${int.await()}")
    println("String = ${str.await()}")
}

fun printInt(): Int {
    return 10
}
```
Trong đoạn code trên bạn sẽ thấy sự xuất hiện của 3 đối tượng là async, deffered và await
- async { } nó cũng như runBlocking { } hay launch { } vì nó cũng được để launch 1 coroutine. Điểm khác biệt là khi sử dụng async để launch 1 coroutine thì coroutine đó cho phép bạn return về 1 giá trị kiểu Int, String, Unit, ... kiểu gì cũng được còn 2 thằng kia thì luôn return kiểu Job mà thằng Job này chỉ có thể quản lý lifecycle của coroutine chứ không mang được giá trị kết quả gì (Job does not carry any resulting value).
- Deferred<T>: để ý khi bạn return về kiểu Int trong khối block của coroutine thì kết quả trả về của async là kiểu Deferred<Int>, return kiểu String thì trả về kiểu Deferred<String>, không return gì cả thì nó sẽ trả về kiểu Deferred<Unit>. Deferred nó cũng giống Job vậy, nó cũng có thể quản lý lifecycle của coroutine nhưng ngon hơn thằng Job ở chỗ nó mang theo được giá trị kết quả trả về của coroutine. Và khi cần get giá trị này ra thì ta sử dụng hàm await().
- await(): như đã giải thích ở trên, await() là một member function của Deferred dùng để get giá trị kết quả trả về. Ví dụ biến kiểu Deferred<Int> thì gọi hàm await() sẽ trả về giá trị kiểu Int.

## 6. CoroutineScope  
   CoroutineScope một trong những phần rất quan trọng của Coruotine     
  Một số đặc điểm bạn cần chú ý khi làm việc với thằng này nhé  
 Khi một coroutine A được phóng trong CoroutineScope của một coroutine B khác thì A là con của B. Coroutine con sẽ sử dụng scope và context của coroutine cha. Nếu coroutine con đó được khai báo trong 1 scope riêng với context riêng thì nó sẽ ưu tiên sử dụng scope đó thay vì của cha nó.

Một coroutine cha luôn chờ đợi để tất cả các coroutine con của nó chạy xong hoàn thành nhiệm vụ. Ví dụ:
```javascript
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
output : 
```javascript
Task from coroutine scope
Task from runBlocking
Task from nested launch
Coroutine scope is over
```
**GlobalScope**  
    GlobalScope là một CoroutineScope. Nó có gì đặc biệt?. Ta sẽ thử launch một coroutine con sử dụng scope riêng là GlobalScope trong một coroutine cha.
```javascript
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
    
output : 
```javascript
job1: GlobalScope and execute independently!
job2: I am a child of the request coroutine
job1: I am not affected by cancellation
main: Who has survived request cancellati
```
    
Chúng ta đã biết khi cancel coroutine cha thì tất cả coroutine con bị cancel. Tuy nhiên nếu coroutine con đó có scope là GlobalScope thì nó sẽ không bị cancel khi coroutine cha bị hủy. Vì vậy, line code 1 vẫn được print mặc dù bị delay tới 1000ms.