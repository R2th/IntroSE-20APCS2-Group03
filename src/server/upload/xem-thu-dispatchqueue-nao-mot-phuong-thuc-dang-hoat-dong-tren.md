Class `DispatchQueue` có rất nhiều "hidden gems"(viên ngọc ẩn) thú vị và không có trên tài liệu. Chúng ta hãy xem làm thế nào chúng ta có thể sử dụng một trong những  gems này để có được `DispatchQueue` hiện tại của một phương thức - cũng như là một mẹo có thể được sử dụng để gửi và truy xuất thông tin từ một `DispatchQueue`.<br>

### Tại sao nó hữu ích?
Khi chúng ta có một phương thức cụ thể có thể được thực thi từ nhiều hàng đợi, việc xác định hàng đợi nào nó đang chạy có thể hữu ích. Hãy tưởng tượng rằng chúng ta có một đoạn code như thế này:

```
func doSomething() {
    queue.async { ... }
}
```

Nếu hàng đợi của chúng ta có mức độ ưu tiên thấp, không có gì đảm bảo rằng nó sẽ được thực thi ngay lập tức. Nếu `doSomething` đang chạy trong hàng đợi chính xác, chúng ta có thể phát hiện điều này và tránh lập lại code của mình. 
Ví dụ: chúng ta có thể sử dụng các thủ thuật từ bài viết này để ngăn chặn việc gọi `DispatchQueue.main.async` một cách không cần thiết khi chúng ta cần cập nhật một thành phần UI trong hàng đợi chính. Nếu chúng ta đã ở trong hàng đợi chính, chúng ta có thể trực tiếp thực thi đoạn code cập nhật giao diện người dùng đó.<br>

Chúng ta cũng có thể sử dụng thủ thuật này để thay đổi cách phương thức của chúng ta hoạt động tùy thuộc vào hàng đợi mà nó đang chạy. Các hàng đợi khác nhau có thể có các yêu cầu khác nhau - đặc biệt là các ưu tiên thấp hơn. Ví dụ,  một `thread` chạy ở `background` có độ ưu tiên thấp có thể vô hiệu hóa một số tính năng `logging` để làm cho nó chạy nhanh hơn.<br>

### Xác định xem một phương thức có đang chạy trên một DispatchQueue cụ thể không:

Kiểm tra xem một phương thức đang chạy trên một hàng đợi cụ thể có thể được thực hiện thông qua một viên ngọc ẩn: Các phương thức `getSpecific` và `setSpecific`. Hỗ trợ `DispatchQueues` giữ một từ điển thông tin người dùng hoạt động tương tự như UserDefaults, có thể được truy xuất trên toàn cầu mà không cần truy cập vào chính hàng đợi. chúng ta có thể sử dụng để "gắn thẻ" một hàng đợi và sau đó xác định xem một phương thức có đang chạy trên nó hay không bằng cách kiểm tra xem thẻ này có tồn tại trong hàng đợi hiện tại của phương thức không.<br>

Để thêm dữ liệu vào từ điển của `DispatchQueue`, hãy tạo một thể hiện của `DispatchSpecificKey`  khớp với loại mà chúng ta muốn lưu trữ và thêm vào hàng đợi bằng cách gọi `setSpecific`.<br>

Ví dụ: đây là cách chúng ta có thể thêm một chuỗi giá trị tùy ý vào hàng đợi:<br>
```
let queue = DispatchQueue(label: "SwiftRocks")

let specificKey = DispatchSpecificKey<String>()
let valueToStore = "myValue"

queue.setSpecific(key: specificKey, value: valueToStore)
```

```
func doSomething() {
    if DispatchQueue.getSpecific(key: specificKey) == specificValue {
        print("Running on a thread from the 'SwiftRocks' queue.")
    } else {
        print("Not running on a thread from the 'SwiftRocks' queue.")
    }
}

doSomething() // Not running on a thread from the 'SwiftRocks' queue.
queue.sync { doSomething() } // Running on a thread from the 'SwiftRocks' queue.

```
    
### Truyền thông tin đến một DispatchQueue
Lưu trữ nhiều giá trị có cùng loại sẽ khó hơn một chút nhưng có thể thực hiện được. Điều này thật dễ dàng trong phương thức `Objective-C` `dispatch_queue_set_specific` tương đương vì giá trị khóa có thể là bất cứ thứ gì, nhưng vì một số lý do, trong Swift, nó được kết nối với loại `DispatchSpecificKey` bất biến.<br>

Vì mọi thứ được xử lý bằng tham chiếu, chúng ta có thể lưu trữ nhiều giá trị giống nhau bằng cách tạo các phiên bản khác nhau của `DispatchSpecificKey`. Nhược điểm là chúng ta sẽ phải đảm bảo rằng các phương thức của chúng ta có thể truy cập các khóa.<br>

```
let recommendedNetworkTimeout = DispatchSpecificKey<Int>()
queue.setSpecific(key: recommendedNetworkTimeout, value: 30)

let recommendedRetryAmount = DispatchSpecificKey<Int>()
queue.setSpecific(key: recommendedRetryAmount, value: 3)

queue.sync {
    DispatchQueue.getSpecific(key: recommendedNetworkTimeout)
    DispatchQueue.getSpecific(key: recommendedRetryAmount)
}
```
    
Điều này rất hữu ích nếu chúng ta cần tạo một bộ "quy tắc" mà một phương thức nên tuân theo khác nhau tùy thuộc vào hàng đợi mà nó đang chạy. Ví dụ, như trong đoạn trích trước, hàng đợi nền có mức độ ưu tiên thấp hơn có thể có số lần thử lại mạng ngắn hơn so với người dùng phải đối mặt và như một ví dụ khác, chúng tôi có thể vô hiệu hóa các tính năng ghi nhật ký cho các hàng đợi có hiệu suất quan trọng:<br>
```
 public let loggingQueueKey = DispatchSpecificKey<Bool>()

extension DispatchQueue {
    public static var allowsLogging: Bool {
        return getSpecific(key: loggingQueueKey) ?? true
    }

    public func disableLogging() {
        setSpecific(key: loggingQueueKey, value: false)
    }

    public static func log(_ block: () -> Void) {
        guard Self.allowsLogging else {
            return
        }
        block()
    }
}

queue.disableLogging()

func reloadContent() {
    DispatchQueue.log { print("Reloading content") }
    viewModel.reload()
    DispatchQueue.log { print("Content reloaded") }
}

reloadContent() // Prints
queue.sync { reloadContent() } // Doesn't print
```

Sử dụng những mẹo này sẽ cho phép chúng ta có nhiều quyền kiểm soát hơn đối với code của mình, đưa ra các lựa chọn có lợi ích hiệu suất tùy thuộc vào ngữ cảnh của phương thức.<br>

reference: https://swiftrocks.com/discovering-which-dispatchqueue-a-method-is-running-on