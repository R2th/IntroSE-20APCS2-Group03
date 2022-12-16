Tiếp bài trước

### Scope builder
Ngoài những scope có sẵn được cung cấp bởi các builder khác nhau, có thể khai báo scope của riêng bạn bằng cách sử dụng *coroutineScope* . Nó tạo ra một scope và không hoàn thành cho đến khi tất cả child đã được launch hoàn thành.

*runBlocking* và *coroutineScope* có thể trông giống nhau vì cả hai đều chờ body của nó và tất cả các child của nó hoàn thành. Sự khác biệt chính giữa hai cách này là phương thức *runBlocking* chặn luồng hiện tại để chờ, trong khi *coroutineScope* chỉ tạm dừng, giải phóng luồng  cho các tác vụ khác. Do sự khác biệt đó, *runBlocking* là một phương thức thông thường và *coroutineScope* là một phương thức suspending.

Nó có thể được chứng minh bằng ví dụ sau:

```
import kotlinx.coroutines.*

fun main() = runBlocking { // this: CoroutineScope
    launch { 
        delay(200L)
        println("Task from runBlocking")
    }
    
    coroutineScope { // Creates a coroutine scope
        launch {
            delay(500L) 
            println("Task from nested launch")
        }
    
        delay(100L)
        println("Task from coroutine scope") // This line will be printed before the nested launch
    }
    
    println("Coroutine scope is over") // This line is not printed until the nested launch completes
}
```

Lưu ý rằng ngay sau message "Task from coroutine scope", trong khi chờ khởi chạy lồng nhau, "Task from runBlocking" được thực thi và in, mặc dù chưa hoàn thành *coroutineScope*.

### Refactor bằng cách tách hàm 
Hãy tách khối mã bên trong launch { ... } thành một hàm riêng biệt. Khi bạn thực hiện tách hàm trên mã này, bạn sẽ nhận được một hàm mới với dạng *suspend* . Đó là hàm suspend đầu tiên của bạn. Các hàm suspend có thể được sử dụng bên trong coroutines giống như các hàm thông thường, nhưng tính năng bổ sung của chúng là chúng có thể sử dụng các hàm suspend khác, như delay trong ví dụ này, để tạm dừng thực thi coroutine.

```
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch { doWorld() }
    println("Hello,")
}

// this is your first suspending function
suspend fun doWorld() {
    delay(1000L)
    println("World!")
}
```

Nhưng nếu hàm được tách có chứa builder của coroutine được gọi trong scope hiện tại thì sao? Trong trường hợp này, dạng suspend trên hàm được tách là không đủ. Biến *doWorld* thành một phương thức mở rộng trên CoroutineScope là một trong những giải pháp, nhưng nó có thể không phải lúc nào cũng có thể áp dụng được vì nó không làm cho API rõ ràng hơn. Giải pháp là tạo ra một CoroutineScope rõ ràng là một trường trong một class có chứa hàm mục tiêu hoặc một hàm ẩn khi lớp bên ngoài thực hiện CoroutineScope . Như một phương sách cuối cùng, CoroutineScope (coroutineContext) có thể được sử dụng, nhưng cách tiếp cận như vậy không an toàn về mặt cấu trúc vì bạn không còn kiểm soát phạm vi thực hiện của phương pháp này. Chỉ các API private mới có thể sử dụng builder này.

### Coroutines ARE light-weight
Chạy mã sau:

```
import kotlinx.coroutines.*

fun main() = runBlocking {
    repeat(100_000) { // launch a lot of coroutines
        launch {
            delay(1000L)
            print(".")
        }
    }
}
```

Nó launch 100 nghìn coroutines và sau một giây, mỗi coroutine in một dấu chấm. Bây giờ, hãy thử điều đó với thread. Chuyện gì sẽ xảy ra? (Rất có thể mã của bạn sẽ tạo ra một số lỗi hết bộ nhớ)

### Global Coroutines giống như daemon thread
Đoạn mã sau khởi chạy một coroutine trong GlobalScope in ra "I'm sleeping" hai lần một giây và sau đó quay trở lại từ hàm main sau một khoảng delay:

```
GlobalScope.launch {
    repeat(1000) { i ->
        println("I'm sleeping $i ...")
        delay(500L)
    }
}
delay(1300L) // just quit after delay
```

Bạn có thể chạy và thấy rằng nó in ba dòng và chấm dứt:

```
I'm sleeping 0 ...
I'm sleeping 1 ...
I'm sleeping 2 ...
```
 
Các coroutine khởi chạy trong GlobalScope không giữ cho process tồn tại. Chúng giống như daemon thread.

Nguồn https://kotlinlang.org/docs/reference/coroutines/basics.html