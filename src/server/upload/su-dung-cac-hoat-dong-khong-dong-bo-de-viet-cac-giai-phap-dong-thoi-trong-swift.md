> Các hoạt động không đồng bộ cho phép thực thi các tác vụ chạy dài mà không phải chặn luồng gọi cho đến khi thực hiện hoàn tất. Nó là một cách tuyệt vời, đặc biệt là kết hợp với việc tạo ra dependencies ở giữa các hoạt động.



Trước tiên nếu bạn mới tìm hiểu về vấn đề này, thì bạn hãy đọc bài của mình ["Operations và OperationQueues trong Swift"](https://viblo.asia/p/operations-va-operationqueues-trong-swift-E375zdodZGW). Và các bạn hãy đọc qua về sự khác biệt giữa [Asynchronous và Synchronous](https://viblo.asia/p/grand-central-dispatch-gcd-va-ung-dung-Do7544re5M6). Giờ mình bắt đầu đi sâu vào bài viết nhé :smile:

### 1. Tạo một hoạt động không đồng bộ

Để tạo một hoạt động không đồng bộ thì đều bắt đầu bằng việc tạo một lớp con tùy chỉnh và ghi đè lên thuộc tính `isAsynchronous`.

```
class AsyncOperation: Operation {
    override var isAsynchronous: Bool {
        return true
    }

    override func main() {
        /// Use a dispatch after to mimic the scenario of a long-running task.
        DispatchQueue.global().asyncAfter(deadline: DispatchTime.now() + DispatchTimeInterval.seconds(1), execute: {
            print("Executing")
        })
    }
}
```

Điều này vẫn chưa đủ để làm cho tác vụ không đồng bộ vì tác vụ vẫn vào trạng thái hoàn thành trực tiếp sau khi câu lệnh in được thực thi. Điều này được thể hiện bằng cách thực thi đoạn mã sau:

```
let operation = AsyncOperation()
queue.addOperations([operation], waitUntilFinished: true)
print("Operations finished")

// Prints:
// Operations finished
// Executing
```

Nói cách khác, tác vụ đã được đánh dấu là đã hoàn thành trong khi tác vụ không đồng bộ vẫn đang thực hiện, điều này có thể dẫn đến hành vi không mong muốn. Chúng ta cần bắt đầu tự quản lý trạng thái để hoạt động làm việc không đồng bộ.

### 2. Quản lý trạng thái của một hoạt động không đồng bộ

Để quản lý trạng thái một cách chính xác, chúng ta cần ghi đè các thuộc tính `isFinished` và `isExecuting` với sự hỗ trợ đa luồng và KVO. Điều này trông sẽ như sau cho thuộc tính `isExecuting`:

```
private var _isExecuting: Bool = false
override private(set) var isExecuting: Bool {
    get {
        return lockQueue.sync { () -> Bool in
            return _isExecuting
        }
    }
    set {
        willChangeValue(forKey: "isExecuting")
        lockQueue.sync(flags: [.barrier]) {
            _isExecuting = newValue
        }
        didChangeValue(forKey: "isExecuting")
    }
}
```

Chúng ta theo dõi trạng thái thực thi trong một private property mà chúng ta chỉ truy cập đồng bộ. Ta cần sử dụng hàng đợi khóa để truy cập write và read an toàn theo luồng, sử dụng `willChangeValue(forKey:)` và `didChangeValue(forKey:)`để thêm hỗ trợ KVO để đảm bảo rằng `OperationQueue` được cập nhật chính xác.

Ta cũng cần ghi đè phương thức `start () `trong đó chúng ta cập nhật trạng thái. Điều quan trọng cần lưu ý là bạn không bao giờ gọi `super.start ()` trong phương thức này vì chúng ta hiện đang tự xử lý trạng thái.

Cuối cùng, chúng ta đã thêm một phương thức `finish ()` cho phép chúng ta đặt trạng thái thành kết thúc sau khi tác vụ async hoàn thành.

Hợp tất cả lại với nhau, chúng ta sẽ có một lớp con trông như thế này:

```
class AsyncOperation: Operation {
    private let lockQueue = DispatchQueue(label: "com.swiftlee.asyncoperation", attributes: .concurrent)

    override var isAsynchronous: Bool {
        return true
    }

    private var _isExecuting: Bool = false
    override private(set) var isExecuting: Bool {
        get {
            return lockQueue.sync { () -> Bool in
                return _isExecuting
            }
        }
        set {
            willChangeValue(forKey: "isExecuting")
            lockQueue.sync(flags: [.barrier]) {
                _isExecuting = newValue
            }
            didChangeValue(forKey: "isExecuting")
        }
    }

    private var _isFinished: Bool = false
    override private(set) var isFinished: Bool {
        get {
            return lockQueue.sync { () -> Bool in
                return _isFinished
            }
        }
        set {
            willChangeValue(forKey: "isFinished")
            lockQueue.sync(flags: [.barrier]) {
                _isFinished = newValue
            }
            didChangeValue(forKey: "isFinished")
        }
    }

    override func start() {
        print("Starting")
        isFinished = false
        isExecuting = true
        main()
    }

    override func main() {
        /// Use a dispatch after to mimic the scenario of a long-running task.
        DispatchQueue.global().asyncAfter(deadline: DispatchTime.now() + DispatchTimeInterval.seconds(1), execute: {
            print("Executing")
            self.finish()
        })
    }

    func finish() {
        isExecuting = false
        isFinished = true
    }
}
```

Để đảm bảo nhiệm vụ của chúng ta thực sự hoạt động, ta sẽ thực hiện cùng một đoạn mã như trước:
```
let operation = AsyncOperation()
queue.addOperations([operation], waitUntilFinished: true)
print("Operations finished")

// Prints:
// Starting
// Executing
// Operations finished
```

Điều này thật tuyệt vời và chính xác những gì chúng ta muốn! Điều duy nhất còn thiếu là cancel.

### 3. Thêm sự hỗ trợ để Cancel 

Vì một hoạt động có thể hủy bỏ bất cứ lúc nào, chúng ta cần tính đến điều này khi chúng ta bắt đầu thực hiện. Thậm chí nó có thể là một hoạt động đã bị hủy trước khi nhiệm vụ bắt đầu.

Chúng ta có thể làm điều này bằng cách thêm một bộ bảo vệ bên trong phương thức `start ()`:

```
override func start() {
    print("Starting")
    guard !isCancelled else { return }

    isFinished = false
    isExecuting = true
    main()
}
```

Mặc dù thuộc tính `isFinished` và `isExecuting` chứa giá trị chính xác tại thời điểm này, chúng ta vẫn cần cập nhật chúng theo tài liệu:

> Cụ thể, bạn phải thay đổi giá trị được trả về khi kết thúc thành YES  và giá trị được trả về bằng cách thực hiện thành NO. Bạn phải thực hiện những thay đổi này ngay cả khi thao tác đã bị hủy trước khi bắt đầu thực thi.

Do đó, chúng ta gọi phương thức `finish ()` từ phương thức `start ()` bên trong bộ bảo vệ làm cho phương thức cuối cùng của chúng ta trông như sau:

```
override func start() {
    print("Starting")
    guard !isCancelled else {
        finish()
        return
    }

    isFinished = false
    isExecuting = true
    main()
}
```

### 4. Sử dụng các tác vụ không đồng bộ 

Sau khi tạo một lớp con cho các tác vụ chạy dài, đó là thời gian để hưởng những lợi ích từ nó. Lớp hoạt động không đồng bộ cuối cùng trông như sau:
```
class AsyncOperation: Operation {
    private let lockQueue = DispatchQueue(label: "com.swiftlee.asyncoperation", attributes: .concurrent)

    override var isAsynchronous: Bool {
        return true
    }

    private var _isExecuting: Bool = false
    override private(set) var isExecuting: Bool {
        get {
            return lockQueue.sync { () -> Bool in
                return _isExecuting
            }
        }
        set {
            willChangeValue(forKey: "isExecuting")
            lockQueue.sync(flags: [.barrier]) {
                _isExecuting = newValue
            }
            didChangeValue(forKey: "isExecuting")
        }
    }

    private var _isFinished: Bool = false
    override private(set) var isFinished: Bool {
        get {
            return lockQueue.sync { () -> Bool in
                return _isFinished
            }
        }
        set {
            willChangeValue(forKey: "isFinished")
            lockQueue.sync(flags: [.barrier]) {
                _isFinished = newValue
            }
            didChangeValue(forKey: "isFinished")
        }
    }

    override func start() {
        print("Starting")
        guard !isCancelled else {
            finish()
            return
        }

        isFinished = false
        isExecuting = true
        main()
    }

    override func main() {
        fatalError("Subclasses must implement `execute` without overriding super.")
    }

    func finish() {
        isExecuting = false
        isFinished = true
    }
}
```

Chúng ta đang gây ra một lỗi nghiêm trọng khi `main()` phương thức thực thi bởi một lớp con.

Một ví dụ có thể là bạn sẽ tải lên một tệp có `FileUploadOperation`:

```
final class FileUploadOperation: AsyncOperation {

    private let fileURL: URL
    private let targetUploadURL: URL
    private var uploadTask: URLSessionTask?

    init(fileURL: URL, targetUploadURL: URL) {
        self.fileURL = fileURL
        self.targetUploadURL = targetUploadURL
    }

    override func main() {
        uploadTask = URLSession.shared.uploadTask(with: URLRequest(url: targetUploadURL), fromFile: fileURL) { (data, response, error) in
            // Handle the response
            // ...
            // Call finish
            self.finish()
        }
    }

    override func cancel() {
        uploadTask?.cancel()
        super.cancel()
    }
}
```

Lưu ý rằng chúng ta đang lưu tác vụ dữ liệu để chúng ta có thể hủy nó nếu cần.

Và còn rất nhiều thứ nữa. Điều tuyệt vời là bạn có thể xâu chuỗi các hoạt động này lại với nhau như trong bài viết của mình tại [đây](https://viblo.asia/p/operations-va-operationqueues-trong-swift-E375zdodZGW) 

### 5. Kết luận 

Vậy là chúng ta đã tạo ra các hoạt động không đồng bộ mà bạn có thể sử dụng chúng trực tiếp trong các dự án của mình. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng được vào project

Cảm ơn các bạn đã theo dõi bài viết. 😃