![](https://images.viblo.asia/e83ff5be-eb8f-4704-b692-51bc8001e6e6.gif)

Để cho ứng dụng của bạn phản ứng nhanh với các tương tác của người dùng. Khi chúng ta xây dựng giao diện người dùng, mục tiêu trên hết của chúng ta là có một giao diện đẹp, thân thiện với người dùng.
Hãy tưởng tượng một số người dùng, khi họ nhấn vào button và tải xuống một số tệp hoặc hình ảnh. Nhiệm vụ tải xuống không được chặn tương tác người dùng nếu không người dùng sẽ tắt ứng dụng hoặc đẩy sang trạng thái nền.
Mọi thứ trở nên phức tạp hơn khi ứng dụng của bạn cần thực hiện nhiều tác vụ hơn. Không có nhiều thời gian để thực hiện tác vụ nặng trên main thread và vẫn cung cấp giao diện người dùng đáp ứng.
## Bắt đầu nào
Theo thứ tự, tôi sẽ giải thích:
1. **Operation là gì?**
2. **Operation Queue**
3. **Operation Dependencies**
4. **KVO-Compliant Properties**

### Operation là gì?
Operation là một lớp trừu tượng đại diện cho đoạn mã code và dữ liệu được liên kết với một tác vụ duy nhất. Operation class là một lớp trừu tượng, bạn không sử dụng trực tiếp mà thay vào đó, subclass hoặc sử dụng một trong các subclass do hệ thống xác định ([NSInvocationOperation](https://developer.apple.com/documentation/foundation/nsinvocationoperation) hoặc [BlockOperation](https://developer.apple.com/documentation/foundation/blockoperation)) để thực hiện tác vụ thực tế.
Một operation object  là một đối tượng bắn một lần - nghĩa là, nó thực thi nhiệm vụ của nó một lần và không được sử dụng để thực hiện lại. Bạn thường thực hiện các hoạt động bằng cách thêm chúng vào hàng đợi hoạt động (một thể hiện của lớp OperationQueue). Hàng đợi  thực hiện trực tiếp các hoạt động của nó, bằng cách chạy chúng trên các luồng thứ cấp hoặc gián tiếp sử dụng thư viện libdispatch (còn được gọi là Grand Central Dispatch). Để biết thêm thông tin về cách hàng đợi thực thi các hoạt động, hãy xem [OperationQueue](https://developer.apple.com/documentation/foundation/operationqueue).
### Operation Queue
Một Operation Queue thực thi các [Operation](https://developer.apple.com/documentation/foundation/operation) objects được xếp hàng dựa trên mức độ ưu tiên của chúng. Sau khi được thêm vào Operation Queue, một Operation vẫn nằm trong hàng đợi cho đến khi nó báo cáo rằng nó đã kết thúc với nhiệm vụ của mình. Bạn không thể xóa trực tiếp một thao tác khỏi queue sau khi nó đã được thêm vào.
### Operation Dependencies
Dependencies là một cách thuận tiện để thực hiện các hoạt động theo một thứ tự cụ thể. Bạn có thể thêm và xóa các phụ thuộc cho một hoạt động bằng cách sử dụng addDependency (_ :) và removeDependency (_ :). Mặc định, một operation object có phụ thuộc không được coi là sẵn sàng cho đến khi tất cả các operation object phụ thuộc của nó đã thực hiện xong. Tuy nhiên, khi hoạt động phụ thuộc cuối cùng kết thúc, operation object sẽ sẵn sàng và có thể thực thi.
### KVO-Compliant Properties
Lớp NSOperation là key-value coding  (KVC) và key-value observing (KVO) cho một số thuộc tính của nó. Cần thiết, bạn có thể quan sát các thuộc tính này để kiểm soát các phần khác trong ứng dụng của mình. Để quan sát các thuộc tính, hãy sử dụng các thuộc tính sau đường dẫn chính:
*  isCancelling (read-only) - trả về transaction đã bị hủy?
```
open var isCancelled: Bool { get }
```

* isAsynyncous (read-only) - trả về true operation concurrenti?
```
@available(iOS 7.0, *)
open var isAsynchronous: Bool { get }
```

* isExecuting (read-only) — trả về true khi operation đang trong 1 progess
```
open var isExecuting: Bool { get }
```

* isFinished (read-only) — trả về true operation ở trạng thái hoàn thành
```
open var isFinished: Bool { get }
```

* isReady ( read-only) — trả về true khi operation ở trạng thái sẵn sàng
```
open var isReady: Bool { get }
```

* dependencies (read-only) — thêm một hoặc nhiều tác vụ phụ thuộc, nó liên quan đến nhau
```
open var dependencies: [Operation] { get }
```

* queuePriority -readable and writable - Xác định thứ tự các thao tác trong hàng đợi.
```
open var queuePriority: Operation.QueuePriority
```

![](https://images.viblo.asia/0f669fa4-6f9d-4123-8b5a-e597b7242463.png)

* completionBlock - readable and writable —  triggers the completion block

![](https://images.viblo.asia/5262d39c-eb32-46b4-9d18-964df4929f02.png)

## Subclassing Notes
Lớp Operation cung cấp logic cơ bản để theo dõi trạng thái thực thi của hoạt động. Làm thế nào bạn tạo lớp con của bạn phụ thuộc vào việc thao tác của bạn được thiết kế để thực hiện đồng thời hay không đồng thời.
Bây giờ, chúng ta sẽ tạo một lớp Operation, chịu trách nhiệm cho các tác vụ tải xuống. Bạn có thể thực hiện việc này dưới dạng chuỗi hoặc đồng thời nếu bạn muốn.

```
class DownloadOperation : Operation {
   private var task : URLSessionDownloadTask!
   enum OperationState : Int {
      case ready
      case executing
      case finished
   }
   private var state : OperationState = .ready {
      willSet {
         self.willChangeValue(forKey: “isExecuting”)
         self.willChangeValue(forKey: “isFinished”)
      }
      didSet {
         self.didChangeValue(forKey: “isExecuting”)
         self.didChangeValue(forKey: “isFinished”)
      }
   }
   override var isReady: Bool { return state == .ready }
   override var isExecuting: Bool { return state == .executing }
   override var isFinished: Bool { return state == .finished }
   init(session: URLSession, downloadTaskURL: URL, completionHandler: ((URL?, URLResponse?, Error?) -> Void)?) {
      super.init()
      task = session.downloadTask(with: downloadTaskURL,   completionHandler: { [weak self] (url, response, error) in
      if let completionHandler = completionHandler {
      completionHandler(url, response, error)
 }
      self?.state = .finished
 })
   }
   override func start() {
      if(isCancelled) {
         state = .finished
         return
      }
      print(“executing the task: \ (self.task.originalRequest?.url?.absoluteString ?? “”)”)
      self.task.resume()
      state = .executing
   }
   override func cancel() {
      super.cancel()
      self.task.cancel()
   }
}
```

Tác vụ Operation có ba trạng thái: ready, execution và finished và has overridden.
Và cuối cùng, chúng ta sẽ gọi lớp Operation và nó tải xuống một tệp từ web.

```
let firstUrl = URL(string:"https://via.placeholder.com/150/56a8c2")!
let secondUrl = URL(string:"https://via.placeholder.com/150/771796")!
let thirdUrl = URL(string:"https://via.placeholder.com/150/24f355")!
let queue = OperationQueue()
queue.maxConcurrentOperationCount = 3
queue.name = "Image Download queue"
let firstOperation = DownloadOperation(session: URLSession.shared, downloadTaskURL: firstUrl, completionHandler: { (localURL, response, error) in
   print("finished the task:  \(firstUrl.absoluteString)")
})
let secondOperation = DownloadOperation(session: URLSession.shared, downloadTaskURL: secondUrl, completionHandler: { (localURL, response, error) in
print("finished the task:  \(secondUrl.absoluteString)")
})
let thirdOperation = DownloadOperation(session: URLSession.shared, downloadTaskURL: thirdUrl, completionHandler: { (localURL, response, error) in
print("finished the task:  \(secondUrl.absoluteString)")
})
queue.addOperation(firstOperation)
queue.addOperation(secondOperation)
queue.addOperation(thirdOperation)
```

**Kết quả**

![](https://images.viblo.asia/50950f29-b810-4cf1-ae67-88cf70d8e984.gif)

Tất cả các tác vụ đều hoạt động đồng thời vì chúng ta tăng maxConcienOperationCount. Nếu bạn muốn thực hiện các tác vụ lần lượt,  bạn có thể đặt maxConcienOperationCount bằng 1.
Và kết quả mới sẽ như sau.

![](https://images.viblo.asia/700ca496-27ee-4965-84ad-df6b11630c8c.gif)


## Kết luận
Hy vọng bạn đã hiểu toàn bộ hướng dẫn. Operation Queue giải quyết nhiều vấn đề hơn mà bạn phải đối mặt.