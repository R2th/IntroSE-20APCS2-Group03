Parallelism và Concurrency là 2 thuật ngữ thường bị nhầm lẫn với nhau. Bài viết này sẽ giúp các bạn phân biệt rõ hơn 2 khái niệm này, đồng thời giới thiệu các cơ chế trong Swift để giúp cấu trúc code theo hướng Concurrency



# Synchronous (Đồng bộ) vs Asynchronous (Bất đồng bộ)
Xử lý đồng bộ và xử lý bất đồng bộ có điểm gì khác nhau? Giả sử ta có một chuỗi các tác vụ. Khi xử lý các tác vụ này một cách đồng bộ, có nghĩa là ta sẽ xử lý tác vụ đầu tiên, kết thúc nó trước khi bắt đầu xử lý tác vụ tiếp theo. Cách thức hoạt động này giống như hàng đợi FIFO (First In, First Out). 
Trong ngôn ngữ lập trình, điều này có nghĩa là các câu lệnh được thực hiện tuần tự như sau:
![](https://images.viblo.asia/96f92bc8-f453-49fd-8dc2-d1fe6e2f347b.jpeg)
```
func method1() {
  statement1()
  statement2()
  statement3()
  statement4()
}
```
> Như vậy, về bản chất, xử lý đồng bộ là tại một thời điểm chỉ thực hiện một tác vụ và kết thúc nó trước khi thực hiện một tác vụ khác.
> 
Trong khi đó, xử lý bất đồng bộ là thực hiện cùng lúc nhiều tác vụ. Chẳng hạn ta xử lý tác vụ 1, dừng lại thực hiện tác vụ 2, khi tác vụ 2 kết thúc lại quay trở lại hoàn thành tác vụ 1.
![](https://images.viblo.asia/e60ef238-3206-4722-8ef0-1aff5b1a9039.png)
```
func method2() {
  statement1 {
    callback1()
  }
  statement2
}
```
# Concurrency (Tương tranh) vs Parallelism (Song song)
Đôi khi, các thuật ngữ concurrency và parallelism được sử dụng lẫn lộn với nhau. Hãy cùng xem xét ví dụ sau để có thể hiểu được sự khác nhau của hai phương thức lập trình này.
Giả sử, ta có một vài cái hộp ở vị trí A và muốn chuyển chúng tới vị trí B. Công việc này được thực hiện bởi một số công nhân. Trong xử lý đồng bộ, ta chỉ có thể sử dụng một người công nhân để thực hiện. Người này sẽ chỉ mang 1 hộp tại một thời điểm.
![](https://images.viblo.asia/ccb56238-1c37-42df-93f9-9c4829fe28c6.png)
Nếu có từ 2 công nhân trở lên thực hiện việc này thì sao? Đó sẽ là xử lý song song (parallelism), và hiển nhiên công việc sẽ được thực hiện nhanh hơn so với khi chỉ sử dụng một người công nhân.

Parallelism (song song) là thực hiện nhiều người thực hiện công việc cùng một lúc. 
![](https://images.viblo.asia/088c6fcb-c376-4347-9df0-17b60097e962.png)
Đối với concurrency (lập trình tương tranh), hướng thực hiện sẽ là chia quãng đường từ A đến B thành nhiều bước nhỏ. Người công nhân sẽ mang hộp đến điểm C nằm trên đoạn đường từ A đến B, đặt hộp xuống và sau đó quay lại A lấy hộp khác. Ở đây ta đã xử lý công việc theo hướng bất động bộ. 
![](https://images.viblo.asia/77f5c44b-c5ce-4af2-8dec-da0c737d773e.png)
Khi có nhiều công nhân thực hiện việc này, ta gọi đó là parallelism.
![](https://images.viblo.asia/55d981b9-2251-419b-887c-5493254459ff.png)
Vậy, điểm khác nhau giữa concurrency và parallelism đó là: Parrallelism là thực hiện công việc cùng một lúc, trong khi đó concurrency là có nhiều lựa chọn để thực hiện công việc cùng lúc (do công việc đã được chia thành nhiều bước nhỏ). Concurrency không nhất thiết phải là Parallelism nhưng nó có thể trở thành Parallelism.

# Cơ chế thực hiện Concurrency
Mỗi hệ điều hành khác nhau cung cấp những công cụ khác nhau để thực hiện concurrency. Trong iOS, ta có các công cụ như Process, Thread và Dispatch Queue.
## Process
App của bạn chính là một Process. Nó bao gồm mọi thứ giúp app có thể hoạt động bao gồm: bộ nhớ stack, heap và các nguồn tài nguyên khác.
Cho dù iOS là hệ điều hành đa nhiệm, nó lại không hỗ trợ việc có nhiều process cho một app. Đối với macOS thì lại khác một chút. Ta có thể sử dụng lớp Process để sinh ra các process con. Các process con này độc lập với process cha. Đoạn code để tạo và thực thi process trong macOS
```
let task = Process()
task.launchPath = "/bin/sh" //executable you want to run
task.arguments = arguments //here is the information you want to pass
task.terminationHandler = {
  // do here something in case the process terminates
}

task.launch()
```
## Thread
Một Thread cũng có thể coi là một lightweight process. Điểm khác biệt, đó các các thread chia sẻ bộ nhớ chung với process cha. Điều này dẫn đến việc lỗi có thể xảy ra khi 2 thread thay đổi cùng một ô nhớ một lúc. Thread là một tài nguyên giới hạn trên iOS ( hoặc bất kỳ hệ thống POSIX nào). Nó giới hạn 64 thread cho một process tại một thời điểm. Ta có thể tạo và thực thi thread như sau:
```
class CustomThread: Thread {
  override func main() {
    do_something
  }
}

let customThread = CustomThread()
customThread.start()
```
## Dispatch Queues
Vì mỗi app chỉ có 1 process và 64 thread tối đa, Apple cung cấp một api để thực hiện concurrency đơn giản, tối ưu hiệu suất đó chính là Dispatch Queue. Ta có thể đưa tác vụ vào một dispatch queue. Có nhiều loại dispatch queue khác nhau. Đầu tiên đó là Serial Queue. Ở loại này, các tác vụ sẽ được xử lý đúng theo trình tự chúng được thêm vào queue. Loại khác đó là Concurrent Queue, Ở đây các tác vụ sẽ được thực hiện concurrent. Bạn sẽ không phải đau đầu khi sử dụng thread, chỉ cần tạo các block công việc và đưa vào các queue khác nhau, hệ điều hành sẽ thực hiện các nhiệm vụ còn lại.
## Operation Queues
Operation Queue là api dựa trên GCD. Ta sẽ tạo các operation, các opeartion này sẽ được đẩy vào queue và được thực thi theo trình tự. Có các loại queue khác nhau: main queue thự thi trên main thread và các custom queue không được thực thi trên main thread.
```
let operationQueue: OperationQueue = OperationQueue()
operationQueue.addOperations([operation1], waitUntilFinished: false)
```
Ta có thể tạo một operation bằng block hoặc tạo lớp con. Trong trường hợp tạo bằng lớp con, hãy gọi finish nếu không, operation sẽ không bao giờ kết thúc.
```
class CustomOperation: Operation {
    override func main() {
        guard isCancelled == false else {
            finish(true)
            return
        }
        
        // Do something
        
        finish(true)
    }
}
```
Một tính năng rất hay của operation đó là ta có để sử dụng dependency. Chẳng hạn, operation A phụ thuộc vào operation B khi đó B sẽ không bao giờ được thực thi trước A.

# Tài liệu tham khảo
Nội dung bài viết này được dịch một phần từ https://medium.com/flawless-app-stories/basics-of-parallel-programming-with-swift-93fee8425287