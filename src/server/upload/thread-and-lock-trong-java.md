Một ứng dụng đang chạy thường được tạo thành từ một `process` với không gian bộ nhớ riêng của nó. Một máy tính nói chung thường chạy đa nhiệm, tức nhiều *process* cùng lúc. Ví dụ, một ứng dụng xử lý văn bản (`Word`, `Excel`...) có thể chạy cùng lúc với một ứng dụng chơi nhạc (`Media Player`...). Hơn thế nữa, một *process* bao gồm nhiều `thread` chạy đồng thời. Khi bạn chạy một ứng dụng `Java`, một *JVM process* mới sẽ được khởi động.

Mỗi *Java process* có ít nhất một `thread` ứng dụng. Bên cạnh các `thread` của ứng dụng đang chạy, còn có các JVM `Internal thread` chạy cùng để xử lý thu gom rác (`Garbage collection`) hay tạo mã (`code generation`).

Trong bài viết này sẽ chỉ ra những thông tin, lý thuyết cơ bản nhất về `Thread` và `Lock` trong JVM, phần demo hay code có thể tham khảo thêm từ `Google`. Riêng các thông tin về cách tạo `Thread Dumps`, in ra `stack` của tất cả các `Thread` trong ứng dụng, dùng để phân tích lỗi và tối ưu ứng dụng cho ứng dụng và hiệu suất JVM, các bạn có thể xem thêm [cách dùng thread dumps](https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/using_threaddumps.html) .

## Threads
Một ứng dụng Java chứa một hay nhiều *Thread*. Toàn bộ JVM *process* bao gồm các *Java thread* và một vài *JVM internal thread*, ví dụ một hay nhiều *GC thread*, *code optimizer thread* và vài *finalizer thread*.

Từ hướng nhìn của phía *hệ điều hành*, *Java thread* chỉ giống như bất cứ *thread* ứng dụng nào. Việc `schedule` cho *thread* được xử lý bởi *hệ điều hành* và dựa vào độ ưu tiên của các *thread*.

Với *Java*, các *thread* được biểu diễn bởi các `thread object`. Mỗi *thread* cũng có một `stack` dùng để chứa dữ liệu khi chạy (còn gọi là `Runtime data`). *Thread stack* có một kích thước cụ thể, nếu một *thread* cố gắng để lưu nhiều hơn kích thước giới hạn, *thread* sẽ ném lỗi *StackOverFlow*.

Kích thước mặc định của *Stack* của *Thread* phụ thuộc vào môi trường hệ điều hành cài đặt, *IA32* , *X64*...từ **64KB** đến **1024KB**. Bạn có thể tùy chỉnh kích thước của *thread stack*

> `java -Xss:512k MyApplication`

Kích thước *default system stack* của *JVM Internal thread* là **256KB** trên tất cả *platform*.

## Locks
Khi các *thread* bên trong một *process* chia sẻ và thay đổi các dữ liệu chung, các hoạt động của chúng phải được đồng bộ hóa để tránh lỗi. Trong *java*, điều này có thể thực hiện thông qua từ khóa `synchronized`, hay `wait()` and `notify()`. 

Việc đồng bộ hóa (`synchronization`) được thực hiện bằng cách dùng các *khóa* gọi là `Lock`, mỗi trong số đó được liên kết đến một đối tượng bởi *JVM*. Đối với *Thread* làm việc trên một đối tượng, nó phải có quyền kiểm soát các *lock* liên kết đến nó, nó phải giữ *lock*. 

> Chỉ duy nhất một *thread* có thể giữ một lock tại một thời điểm. 

Nếu một *thread* khác cố gắng để giành lấy *lock* đang được giữ bởi một *thread* khác, nó phải chờ đến khi *lock* được giải phóng `released`. Khi điều này xảy ra, chúng ta gọi đó là **contention** (cạnh tranh).

Có 4 loại *lock* khác nhau:
1. **Fat locks**: là lock với một lịch sử `contention` (một vài *thread* đang cố giành giành *lock* một cách đồng thời), hay là *lock* đã được chờ (để thông báo).
2. **Think locks**: là *lock* không có bất kì `contention` nào.
3. **Recursive locks**: là *lock* đã được giữ bởi một *thread* nhiều lần mà chưa được `released`.
4. **Lazy locks**: là *lock* chưa được *released* khi một *critical section* được kết thúc (*Critical section*  là một đoạn *code*  mà có thể thực thi bởi 1 *Thread* tại 1 thời điểm). Một khi *lazy lock* được `acquired` bởi một *thread*, *thread* còn lại sẽ cố gắng `acquire` *lock* để đảm bảo rằng khóa đó được hoặc có thể được *released*.

### Spinning and Sleeping
`Spinning` xảy ra khi một *thread* muốn một `lock` cụ thể, liên tục kiểm tra lặp đi lặp lại xem nó có đang được giữ hay không, thay vì mang lại CPU time cho *thread* khác.

Ngoài ra, một *thread* cố để lấy một *lock* mà đang được giữ, chờ thông báo từ *lock* và đi vào trạng thái *sleep*. *Thread* sau đó sẽ chờ một cách thụ động để *lock* được *released*.

### Lock Chains
Môt vài *thread* có thể được gắng vào một chuỗi gọi là `lock chain`. Định nghĩa như sau:
1. Thread A và B tạo thành một *lock chain* nếu *thread* A giữ *lock* và *thread* B cố gắng giành nó. Nếu A không cố giữ *lock*, thì *lock chain* sẽ ở trạng thai "open".
2. Nếu A->B là một *lock chain*, và B->C cũng là một *lock chain*, khi đó A->B->C là một `complete` *lock chain*.
3. Nếu không có bất kì *thread* nào chờ *lock* được giữ bởi C, thì A->B->C là `complete và open` *lock chain*.

### Lock Chain Types
*JVM* phân tích các *thread* và hình thành các *lock chain*. Có 3 loại *lock chain*: Open, Deadlocked and Blocked lock chains.

1. **Open Chains**
*Open lock chain* đại diện cho một `straight dependency` (phụ thuộc thẳng), *thread* A chờ B và B đang chờ C, v.v... Nếu bạn có một chuỗi *lock chain* dài, ứng dụng sẽ gây lãng phí thời gian chờ *lock*. Bạn có thể muốn xem xét lại cách *lock* được sử dụng để đồng bộ hóa.

2. **Deadlock Chains**
`Deadlocked` hay `circular` *lock chain* bao gồm một chuỗi các i, trong đó *thread* đầu tiên trong chuỗi đang chờ *thread* cuối. Trong trường hợp đơn giản nhất, *thread* A đang chờ B trong khi B lại đang chờ A. `Deadlock` không bao giờ được giải quyết, và ứng dụng sẽ chờ vô hạn.

3. **Blocked Chains**
*Blocked lock chain* được tạo thành bởi một chuỗi *lock chain* có *thread* đầu là 1 phần của chuỗi *lock chain* khác, mà có thể là *open* hoặc *deadlocked chain*.
VD, nếu *Thread* A đang chờ *thread* B, *thread* B đang chờ A, và C cũng chờ *thread* A. khi đó A và B tạo thành một *deadlocked chain*, trong khi C và A tạo thành một *blocked lock chain*.


**Reference link**
https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/thread_basics.html