“Coroutines là những Thread nhẹ nhàng”, bạn đã đọc nó bao nhiêu lần rồi? Việc đó có nghĩa gì với bạn không? Chắc là không. Hãy tiếp tục đọc để tìm hiểu thêm về cách các corout thực sự được thực thi trên Android runtime, cách chúng liên quan đến các luồng và các vấn đề đồng thời không thể tránh khỏi khi sử dụng mô hình phân luồng của ngôn ngữ lập trình Java.
# Coroutines và threads
Coroutines nhằm mục đích đơn giản hóa mã thực thi bất đồng bộ. Khi nói về coroutines trên Android runtime, khối mã được truyền dưới dạng lambda cho một trình tạo coroutine cuối cùng sẽ được thực thi trên một thread cụ thể. Ví dụ, phép tính Fibonacci đơn giản này:
```
// Coroutine that calculates the 10th Fibonacci number in a background thread
someScope.launch(Dispatchers.Default) {
    val fibonacci10 = synchronousFibonacci(10)
    saveFibonacciInMemory(10, fibonacci10)
}
private fun synchronousFibonacci(n: Long): Long { /* ... */ }
```
The above async coroutine’s block of code
Khối mã của coroutine bất đồng bộ ở trên thực hiện tính toán fibonacci đồng bộ và lưu nó vào bộ nhớ, được gửi đi và lên lịch để thực thi trong thread pool được quản lý bởi thư viện coroutines, và nó được định cấu hình cho Dispatchers.Default. Code sẽ được thực thi trong một thread của thread pool vào một thời điểm nào đó trong tương lai tùy thuộc vào policies của nhóm luồng.
Lưu ý rằng mã ở trên thực thi trong một thread vì nó không tạm ngưng. Có thể một quy trình đăng ký được thực thi trong các luồng khác nhau nếu việc thực thi được chuyển đến một dispatcher khác hoặc nếu khối chứa mã có thể yield/suspend trong một trình điều phối sử dụng thread pool.
Tương tự, không có coroutines, bạn có thể thực thi logic ở trên bằng cách sử dụng các chuỗi theo cách thủ công như sau:

```
// Create a thread pool of 4 threads
val executorService = Executors.newFixedThreadPool(4)
// Schedule and execute this code in one of those threads
executorService.execute {
    val fibonacci10 = synchronousFibonacci(10)
    saveFibonacciInMemory(10, fibonacci10)
}
```
Mặc dù bạn có thể tự thực hiện công việc quản lý thread pool theo cách thủ công, nhưng coroutines là giải pháp được khuyến nghị cho lập trình bất đồng bộ trên Android do hỗ trợ hủy tích hợp, xử lý lỗi dễ dàng hơn, đồng thời có cấu trúc giúp giảm khả năng rò rỉ bộ nhớ và tích hợp với Các thư viện Jetpack.

# Under the hood
Điều gì xảy ra từ thời điểm bạn tạo một coroutine cho đến khi nó được thực thi trên một chuỗi? Khi bạn tạo một coroutine bằng cách sử dụng các trình coroutine builder tiêu chuẩn, bạn có thể chỉ định CoroutineDispatcher sẽ chạy nó trên đó; nếu không, Dispatchers.Default được sử dụng.
CoroutineDispatcher phụ trách điều hành việc thực thi một quy trình điều tra đến một chuỗi. Về cơ bản, khi một CoroutineDispatcher được sử dụng, nó sẽ chặn coroutine  sử dụng phương thức interceptContinuation để bọc Continuation trong một DispatchContinuation. Điều này có thể thực hiện được vì CoroutineDispatcher triển khai interface ContinuationInterceptor.

Trong trường hợp một Continuation cần được thực hiện trong một Dispatcher khác, phương thức DispatchContinuation’s resumeWith sẽ phụ trách việc gửi coroutine đến Dispatcher thích hợp!
Hơn nữa, một DispishedContinuation extend từ lớp trừu tượng DispatchedTask. Do đó, một DispishedContinuation có thể chạy trên một thread! Làm thế nào mà nó hay vậy? Khi một CoroutineDispatcher được chỉ định, coroutine được chuyển đổi thành DispishedTask được gửi đi để thực thi trên một thread dưới dạng Runnable!
Và bây giờ… Làm thế nào để phương thức điều phối được gọi khi bạn tạo một coroutine? Khi bạn tạo một coroutine bằng cách sử dụng các standard coroutine builders, bạn có thể chỉ định cách coroutine bắt đầu với tham số start của CoroutineStart. Ví dụ: bạn có thể định cấu hình để nó chỉ bắt đầu khi cần, với CoroutineStart.LAZY. Theo mặc định, CoroutineStart.DEFAULT được sử dụng để lập lịch trình coroutine  theo CoroutineDispatcher của nó.

# Dispatchers and thread pools

Bạn có thể thực thi các coroutine trong bất kỳ thread pools ứng dụng nào của mình bằng cách chuyển đổi chúng thành CoroutineDispatcher bằng cách sử dụng hàm mở rộng Executor.asCoroutineDispatcher (). Ngoài ra, bạn có thể sử dụng Dispatcher mặc định có trong thư viện coroutines.
Bạn có thể xem cách Dispatchers.Default được khởi tạo trong phương thức createDefaultDispatcher này. Theo mặc định, DefaultScheduler được sử dụng. Nếu bạn kiểm tra việc triển khai Dispatchers.IO, nó cũng sử dụng DefaultScheduler và cho phép tạo ít nhất 64 luồng theo yêu cầu. Dispatchers.Default và Dispatchers.IO được liên kết ngầm với nhau vì chúng sử dụng cùng một thread pool.

# Threads and withContext performance

Trong Android runtime, nếu có nhiều luồng được tạo hơn số lõi CPU có sẵn, việc chuyển đổi giữa các luồng sẽ tiêu tốn một số thời gian chạy. Context switches tổn hao không hề ít! Hệ điều hành cần lưu và khôi phục ngữ cảnh thực thi và CPU cần dành thời gian lập lịch các luồng thay vì chạy công việc ứng dụng thực tế. Ngoài ra, việc chuyển đổi ngữ cảnh có thể xảy ra nếu một luồng đang chạy mã bị block. Nếu đó là trường hợp của các thread, có bất kỳ tổn hao performance  nào khi sử dụng withContext với các Dispatcher khác nhau không?
May mắn thay, như bạn có thể tưởng tượng, thread pool quản lý tất cả sự phức tạp này cho chúng ta, cố gắng tối ưu hóa công việc được thực thi nhiều nhất có thể (đó là lý do tại sao thực thi công việc trên thread pool tốt hơn so với thực hiện trong thread theo cách thủ công). Coroutines cũng được hưởng lợi từ điều này vì chúng được lên lịch trong thread pool ! Trên hết, coroutines không chặn thread, thay vào đó họ tạm ngừng công việc của mình! Thậm chí còn hiệu quả hơn!
CoroutineScheduler, là thread pool được sử dụng trong việc triển khai ngôn ngữ lập trình Java theo mặc định, phân phối các coroutines được gửi tới các worker thread theo cách hiệu quả nhất. Vì Dispatchers.Default và Dispatchers.IO sử dụng cùng một thread pool nên việc chuyển đổi giữa chúng được tối ưu hóa để tránh chuyển đổi luồng bất cứ khi nào có thể. Thư viện coroutines có thể tối ưu hóa các lời gọi đó, ở trên cùng một Dispatcher và thread, một cách nhanh chóng.
Vì Dispatchers.Main thường là một thread khác trong các ứng dụng giao diện người dùng, việc chuyển đổi giữa Dispatchers.Default và Dispatchers.Main trong coroutines không đi kèm với chi phí hiệu suất lớn vì coroutine chỉ tạm dừng và được lên lịch được thực thi trong một luồng khác.

# Vấn đề concurrency trong coroutines
Coroutines làm cho lập trình bất đồng bộ dễ dàng hơn do cách lập lịch trình đơn giản hoạt động trên các luồng khác nhau. Mặt khác, sự đơn giản này có thể là con dao hai lưỡi: vì các coroutines chạy trên mô hình phân luồng của ngôn ngữ lập trình Java, chúng không thể đơn giản thoát khỏi các vấn đề đồng thời mà mô hình phân luồng mắc phải. Vì vậy, bạn phải chú ý để tránh điều này.
Trong những năm qua, các phương pháp hay như tính bất biến đã giảm thiểu một số vấn đề liên quan đến luồng mà bạn có thể gặp phải. Tuy nhiên, có một số trường hợp không thể tránh khỏi tính bất biến. Cốt lõi của mọi vấn đề concurrency là quản lý state ! Đặc biệt, truy cập trạng thái có thể thay đổi trong môi trường đa luồng.
Thứ tự các thực thi trong một ứng dụng đa luồng là không thể đoán trước. Ngoài việc tối ưu hóa trình biên dịch có thể sắp xếp lại các hoạt động, các luồng không được đảm bảo chạy theo một thứ tự cụ thể và việc chuyển đổi ngữ cảnh có thể xảy ra bất cứ lúc nào. Nếu các biện pháp phòng ngừa cần thiết không được thực hiện khi truy cập trạng thái có thể thay đổi, các luồng có thể thấy dữ liệu cũ, mất bản cập nhật...

Ứng dụng sử dụng coroutines về bản chất là một ứng dụng đa luồng. Các class sử dụng coroutines và chứa trạng thái có thể thay đổi phải thực hiện các biện pháp phòng ngừa để có thể dự đoán được, tức là đảm bảo mã được thực thi trong coroutines thấy phiên bản cập nhật mới nhất của dữ liệu. Bằng cách này, các thread khác nhau sẽ không ảnh hưởng đến nhau. Các vấn đề về đồng thời có thể dẫn đến các lỗi rất nhỏ rất khó gỡ lỗi trong ứng dụng của bạn, thậm chí cả heisenbugs!
Những loại class này không phải là hiếm. Có thể class cần giữ thông tin của người dùng đã đăng nhập trong bộ nhớ hoặc lưu vào bộ nhớ cache một số giá trị khi ứng dụng còn hoạt động. Các vấn đề về đồng thời vẫn có thể xảy ra trong coroutines nếu bạn không cẩn thận! Một hàm suspend sử dụng withContext (defaultDispatcher) không được đảm bảo luôn được thực thi trong cùng một luồng!
Giả sử chúng ta có một class lưu trữ các giao dịch do người dùng thực hiện. Nếu bộ nhớ đệm không được truy cập đúng cách, chẳng hạn như ví dụ bên dưới, các lỗi đồng thời có thể xảy ra:

```

class TransactionsRepository(
  private val defaultDispatcher: CoroutineDispatcher = Dispatchers.Default
) {

  private val transactionsCache = mutableMapOf<User, List<Transaction>()

  private suspend fun addTransaction(user: User, transaction: Transaction) =
    // CAREFUL! Access to the cache is not protected.
    // Concurrency bugs can happen: threads can see stale data
    // and race conditions may occur.
    withContext(defaultDispatcher) {
      if (transactionsCache.contains(user)) {
        val oldList = transactionsCache[user]
        val newList = oldList!!.toMutableList()
        newList.add(transaction)
        transactionsCache.put(user, newList)
      } else {
        transactionsCache.put(user, listOf(transaction))
      }
    }
}
```

# Protecting mutable state

Làm thế nào để bảo vệ trạng thái có thể thay đổi, hoặc tìm một chính sách đồng bộ hóa tốt, hoàn toàn phụ thuộc vào bản chất của dữ liệu và các hoạt động liên quan. Phần này nói về việc nâng cao nhận thức về các vấn đề đồng thời mà bạn có thể đối mặt thay vì liệt kê tất cả các cách và API khác nhau để bảo vệ trạng thái có thể thay đổi. Tuy nhiên, đây là một số mẹo và API bạn có thể bắt đầu để làm cho các biến có thể thay đổi của bạn an toàn theo chuỗi.
# Đóng gói
Trạng thái có thể thay đổi nên được đóng gói và sở hữu bởi một class. Class này tập trung quyền truy cập vào trạng thái và sẽ bảo vệ việc đọc và ghi bằng chính sách đồng bộ hóa phù hợp hơn với trường hợp sử dụng.
# Giới hạn luồng
Một giải pháp có thể là hạn chế quyền truy cập đọc / ghi đối với một luồng. Việc truy cập vào trạng thái có thể thay đổi có thể được thực hiện theo cách của producer/consumer bằng cách sử dụng queue.

# Đừng phát minh lại bánh xe
Trong Android runtime, có những cấu trúc dữ liệu an toàn theo chuỗi mà bạn có thể sử dụng để bảo vệ các biến có thể thay đổi của mình. Ví dụ, đối với trường hợp của một bộ đếm đơn giản, bạn có thể sử dụng AtomicInteger. Hoặc, để bảo vệ map  của đoạn mã trên, bạn có thể sử dụng ConcurrentHashMap là một synchronized collection,thread-safe giúp tối ưu hóa thông lượng đọc và ghi vào map.
Lưu ý rằng các cấu trúc dữ liệu thread-safe không bảo vệ khỏi các vấn đề ordering của caller, chúng chỉ đảm bảo quyền truy cập bộ nhớ là nguyên tử. Chúng giúp tránh sử dụng khóa khi logic không quá phức tạp. Ví dụ: chúng không thể được sử dụng trong ví dụ transactionCache được hiển thị ở trên vì thứ tự hoạt động và logic giữa chúng cần bảo vệ luồng và truy cập.
Ngoài ra, dữ liệu trong các cấu trúc dữ liệu an toàn theo luồng này cần phải không thay đổi hoặc được bảo vệ để ngăn chặn các điều kiện chạy đua khi sửa đổi các đối tượng đã được lưu trữ trong đó.
# Giải pháp tùy chỉnh
Nếu bạn có các hành động phức hợp cần được đồng bộ hóa, các biến @Volatile hoặc cấu trúc dữ liệu an toàn theo chuỗi sẽ không giúp ích được gì! Và có thể là chú thích @Synchronized tích hợp không đủ chi tiết để làm cho trường hợp sử dụng của bạn hiệu quả.
Trong những trường hợp đó, bạn có thể cần tạo cơ chế đồng bộ hóa của riêng mình bằng cách sử dụng các tiện ích đồng thời như chốt, semaphores hoặc rào cản. Những lần khác, bạn có thể bảo vệ vô điều kiện quyền truy cập đa luồng vào mã bằng cách sử dụng khóa hoặc mutexes.
Một Mutex trong Kotlin có khóa và mở khóa chức năng tạm ngưng để bảo vệ thủ công các phần của mã coroutines của bạn. Thuận tiện, chức năng mở rộng Mutex.withLock giúp bạn sử dụng dễ dàng hơn:

```
class TransactionsRepository(
  private val defaultDispatcher: CoroutineDispatcher = Dispatchers.Default
) {

  // Mutex protecting the cache mutable state
  private val cacheMutex = Mutex()
  private val transactionsCache = mutableMapOf<User, List<Transaction>()

  private suspend fun addTransaction(user: User, transaction: Transaction) =
    withContext(defaultDispatcher) {
      // Mutex makes the read&write cache operation thread safe
      cacheMutex.withLock {
        if (transactionsCache.contains(user)) {
          val oldList = transactionsCache[user]
          val newList = oldList!!.toMutableList()
          newList.add(transaction)
          transactionsCache.put(user, newList)
        } else {
          transactionsCache.put(user, listOf(transaction))
        }
      }
    }
}
```
Vì một quy trình sử dụng Mutex sẽ tạm ngừng thực thi cho đến khi nó có thể tiếp tục, nó hiệu quả hơn nhiều so với một khóa ngôn ngữ lập trình Java chặn luồng. Hãy cẩn thận về việc sử dụng các lớp đồng bộ hóa ngôn ngữ lập trình Java trong coroutines vì điều đó có thể chặn luồng trong đó coroutine đang được thực thi và tạo ra các vấn đề về liveness.
Khối mã được chuyển đến trình tạo chương trình đăng quang kết thúc thực thi trên một hoặc nhiều luồng. Và như vậy, coroutines chạy trên mô hình phân luồng thời gian chạy Android với tất cả các ràng buộc của nó. Với coroutines, vẫn có thể viết sai mã đa luồng dễ bị sai. Vì vậy, hãy chú ý đến quyền truy cập vào trạng thái có thể thay đổi được chia sẻ trong mã của bạn!

Nguồn đây chứ đâu : https://medium.com/androiddevelopers/bridging-the-gap-between-coroutines-jvm-threads-and-concurrency-problems-864e563bd7c