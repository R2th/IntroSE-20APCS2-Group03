**Race Conditions** là lỗi thường hay gặp trong lập trình Concurrency. Swift 4 giới thiệu "Exclusive Access to Memory" bao gồm các luật để tránh việc một vùng nhớ bị truy xuất cùng một lúc bởi nhiều thread khác nhau. Chẳng hạn các tham số "inout" thể hiện rằng tham số này sẽ được thay đổi giá trị ngay bên trong method

`func changeMe(_ x : inout MyObject, andChange y : inout MyObject)`

Nhưng nếu chúng ta đưa vào cùng một biến và thay đổi nó cùng một lúc thì thế nào?

`changeMe(&myObject, andChange:&myObject) `

Swift 4 đã cải tiến để ngăn chặn điều này ngay trong quá trình biên dịch. Tuy nhiên, ví dụ trên là trường hợp đơn giản và tương đối dễ dàng để phát hiện. Trên thực tế, các vấn đề khi truy xuất bộ nhớ, đặc biệt trong lập trình concurrency sẽ rất khó để tìm ra.

# Race Conditions
**Race condition** là khi có nhiều thread cùng truy xuất và sửa một đoạn dữ liệu cùng một lúc. Dữ liệu cần phải được đồng bộ để loại bỏ race condition. Đồng bộ dữ liệu có nghĩa ta sẽ "khoá" (lock) để sao cho chỉ có duy nhất một thread được phép truy cập đoạn code đó (còn được gọi là mutex hay mutual exclusion). Trong iOS ta có thể sử dụng lớp **NSLock** để làm việc này. Tuy nhiên, theo dõi trạng thái của lock đã được khoá hoặc mở có thể sẽ gây ra khó khăn.

# Grand Central Dispatch
Thay vì sử dụng lock, ta có thể sử dụng **Grand Central Dispatch (GCD)** - API Concurrency của Apple để tối ưu hiệu suất cũng như tính an toàn. Chúng ta không cần phải quan tâm đến lock nữa, chúng đã được thực thi bên trong các method mà GCD cung cấp.

```
DispatchQueue.global(qos: .background).async  //concurrent queue, shared by system
{
    //do long running work in the background here
    //...
     
    DispatchQueue.main.async //serial queue
    {
        //Update the UI - show the results back on the main thread
    }
}
```

Hãy cố gắng sử dụng GCD như là lựa chọn hàng đầu khi thiết kế app có khả năng concurency. 

Các kiểm tra tính an toàn ở runtime của Swift không thể được thực hiện qua nhiều thread ở GCD bởi nó sẽ gây ảnh hưởng lớn tới hiệu suất chương trình. Giải pháp là sử dụng công cụ Thread Sanitizer khi làm việc với đa luồng. Mở Thread Sanitizer trong XCode bằng cách: Product > Scheme > Edit Scheme > Diagnostics, và chọn Thread Sanitizer.

# The Main Thread Checker
Cần nhấn mạnh rằng, hư hỏng dữ liệu (data corrumtion) có thể xuất hiện nếu ta không cập nhật UI trêm main thread.Ví dụ với delegateQueue của NSURLSession, khi được set là nil, mặc định sẽ được gọi ở background thread. Nếu ta cập nhật UI hoặc ghi dữ liệu trong block này, có thể sẽ xảy ra race condition. Cách khắc phục là thực hiện cập nhật UI trong DispatchQueue.main.async {} hoặc gán OperationQueue.main cho delegate queue.) 

XCode có công cụ Main Thread Checker (Product > Scheme > Edit Scheme > Diagnostics > Runtime API Checking > Main Thread Checker). Nếu code không được động bộ, XCode sẽ cảnh báo trong mục Runtime Issues.

Để đảm bảo an toàn, bất cứ callback hoặc completion handler nào cần được ghi chú rõ chúng được gọi trên main thread hay không. 
# A Real-World Example
Hãy cùng xem xét một ví dụ thực tế.

```
class Transaction
{
    //...
}
 
class Transactions
{
    private var lastTransaction : Transaction?
     
    func addTransaction(_ source : Transaction)
    {
        //...
        lastTransaction = source
    }
}
 
//First thread
transactions.addTransaction(transaction)
         
//Second thread
transactions.addTransaction(transaction)
```
Ở đây có 2 thread cùng truy cập một vùng dữ liệu cùng lúc nhưng lại không có đồng bộ dữ liệu. Thread Sanitizer sẽ giúp chúng ta phát hiện các trường hợp tưng tự như vậy. Để đồng bộ dữ liệu ta sẽ gắn dữ liệu với một serial dispatch queue.

```
class Transactions
{
    private var lastTransaction : Transaction?
    private var queue = DispatchQueue(label: "com.myCompany.myApp.bankQueue")
     
    func addTransaction(_ source : Transaction)
    {
        queue.async
        {
            //...
            self.lastTransaction = source
        }
    }
}
```
Dữ liệu sẽ được đồng bộ trong block ".async".
# Structs
Trong khi stored properties sẽ được đồng bộ trong class, thì việc thay đổi properties trong struct sẽ ảnh hưởng tới toàn bộ struct đó. Swift 4 đã có thêm phương thức để bảo vệ các method mà làm thay đổi struct. 

Hãy xét ví dụ minh hoạ cho hiện tượng "Swift access race" dưới đây.

```
struct Transaction
{
    private var id : UInt32
    private var timestamp : Double
    //...
             
    mutating func begin()
    {
        id = arc4random_uniform(101) // 0 - 100
        //...
    }
             
    mutating func finish()
    {
        //...
        timestamp = NSDate().timeIntervalSince1970
    }
}
```
Cả 2 method begin() và finish() đều thay đổi stored property. Giả sử, thread 1 gọi **begin()** và thread 2 gọi **finish()**. Thậm chí nếu **begin()** chỉ thay đổi id và **finish()** thì chỉ thay đổi timestamp, ta vẫn có access race ở đây. Giải pháp đó là thay struct bằng class khi lập trình concurrency. Nếu thực sự cần thiết phải sử dụng struct vì lý do nào đó, ta có thể tạo một class Bank để chứa Transaction struct như ví dụ sau:

```
class Bank
{
    private var currentTransaction : Transaction?
    private var queue : DispatchQueue = DispatchQueue(label: "com.myCompany.myApp.bankQueue")
    func doTransaction()
    {
        queue.sync
        {
                currentTransaction?.begin()
                //...
        }
    }
}
```
# Access Control
Sẽ là vô ích nếu sử dụng tất cả các phương thức bảo vệ như ở trên trong khi ta lại bộc lộ một mutating object hoặc **UnsafeMutablePointer**, bởi bất cứ ai sử dụng class của bạn đều có thể làm bất cứ điều gì với dữ liệu mà không có sự bảo vệ của GCD. Thiết kế interface và đóng gói dữ liệu là rất quan trọng đặc biệt trong lập trình concurrency để đảm bảo dữ liệu dùng chung được bảo vệ.

Chú ý đảm bảo rằng các biến đồng bộ được đánh dấu là private chứ không phải là open hay public. Không chỉ các biến có thể xảy ra hư hỏng dữ liệu (data corruption) mà điều này còn có thể xảy ra đối với các file. Khi 
sử dụng **FileManager Foundation** class, là một thread-safe class, ta cần check các cờ kết quả trước khi tiếp tục làm bất cứ việc gì khác.

# Kết luận
Trong bài viết này, chúng ta đã tìm hiểu cách thức để tìm ra cũng như phòng tránh race condition. Hy vọng sẽ giúp các bạn lập trình concurrency hiệu quả hơn với Swift 4

# Nguồn
Bài viết này được dịch từ https://code.tutsplus.com/articles/secure-coding-in-swift-4-with-concurrency--cms-29917