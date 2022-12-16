Mặc dù việc tạo toán tử tùy chỉnh từ các toán tử tích hợp của Combine trong tiện ích mở rộng `Publisher` là một kỹ thuật hữu ích (và nhanh chóng!) Để hài hòa một số hành vi phản ứng phổ biến, nhưng đôi khi cần cung cấp một số tùy chỉnh chuyên sâu hơn để đạt được mục tiêu.
Kết hợp cho phép chúng ta tuân thủ các giao thức 'Publisher', 'Subscription ' và 'Subscriber' để tạo một toán tử phù hợp và giành quyền kiểm soát luồng của chúng.
Mục đích  là tạo ra một single-valued publisher sẽ cung cấp một giá trị và hoàn thành ngay lập tức, hoặc không thành công

### Part 1: Creating a custom Publisher
Trước tiên, chúng ta cần mở rộng enum của Publishers là không gian tên cho các loại liên quan đến giao thức Publisher , trong đó  tạo cấu trúc AsSingle phù hợp với giao thức  Publisher  và có một yêu cầu nhận 'receive<S>(subscriber: S)' . Từ thời điểm đó, chúng ta sẽ giải quyết các vấn đề chung, cụ thể là loại Upstream là viết tắt của publisher và loại Downstream là subscriber.
    
```swift    
    extension Publishers {
    struct AsSingle<Upstream: Publisher>: Publisher {
        typealias Output = Upstream.Output
        typealias Failure = Upstream.Failure
        private let upstream: Upstream
        init(upstream: Upstream) {
            self.upstream = upstream
        }
        func receive<S>(subscriber: S) where S: Subscriber, Failure == S.Failure, Output == S.Input {
            subscriber.receive(subscription: Subscription(upstream: upstream, downstream: subscriber))
        }
    }
}
    
   ```
    
### Part 2: Creating a custom Subscription
    
   Khi publisher nhận được một subscriber, subscriber cần nhận được một subscription chứa một bản sao của đối tượng  AsSingleSink (một subscriber tùy chỉnh). Cá thể  chìm sẽ bị vô hiệu hóa bất cứ khi nào phương thức cancel() được kích hoạt khiến publisher ngừng phân phối các giá trị. 
    
  ```swift 
    extension Publishers.Single {
    class Subscription<Downstream: Subscriber>: Combine.Subscription where Upstream.Output == Downstream.Input, Upstream.Failure == Downstream.Failure {
        private var sink: AsSingleSink<Upstream, Downstream>?
        
        init(upstream: Upstream, downstream: Downstream) {
            sink = .init(upstream: upstream, downstream: downstream)
        }
        func request(_ demand: Subscribers.Demand) { }
        func cancel() {
            sink = nil
        }
    }
}
  ```
    
    
 ### Part 3: Creating a custom Subscriber
   Phần cuối cùng là tạo một subscriber để quản lý luồng của chúng  bằng ba phương pháp bắt buộc.
    
* receive(subscription: Subscription)
   
* receive(_ input: Upstream.Output) -> Subscribers.Demand
 
* receive(completion: Subscribers.Completion<Upstream.Failure>)
    
    
    Chúng ta sẽ chỉ yêu cầu một giá trị duy nhất cho upstream publisher bằng cách sử dụng "register.request (.max (1)"  Đầu vào đầu tiên sẽ được gửi đến downstream subscriber ngay sau đó là sự kiện 'finished' để chúng ta có thể khớp với hành vi mong muốn. Chúng ta cũng cần giữ một biến tùy chọn để kiểm tra xem chuỗi có trống hay không, nếu không, chúng ta cung cấp  ' FatError ' trong sự kiện hoàn thành.
    
    
 ```swift 
    
  class AsSingleSink<Upstream: Publisher, Downstream: Subscriber>: Subscriber where Upstream.Output == Downstream.Input, Downstream.Failure == Upstream.Failure {
    private var downstream: Downstream
    private var _element: Upstream.Output?
    init(upstream: Upstream, downstream: Downstream) { 
        self.downstream = downstream
        upstream.subscribe(self)
    }
    func receive(subscription: Subscription) {
        subscription.request(.max(1))
    }
    func receive(_ input: Upstream.Output) -> Subscribers.Demand {
        _element = input
        _ = downstream.receive(input)
        downstream.receive(completion: .finished)
        return .none
    }
    func receive(completion: Subscribers.Completion<Upstream.Failure>) {
        switch completion {
        case .failure(let err):
            downstream.receive(completion: .failure(err))
        case .finished:
            if _element == nil {
                fatalError("❌ Sequence doesn’t contain any elements.")
            }
        }
    }
}
    
   ```
    
   ### Creating the operator
    
   Phần cuối cùng là tạo phương thức  'asSingle' trong extension 'Publisher'  và chỉ cần trả về một cá thể 'AsSingle'.
    
  ```swift 
    extension Publisher {
    func asSingle() -> Publishers.AsSingle<Self> {
        return Publishers.AsSingle(upstream: self)
    }
}
   ```