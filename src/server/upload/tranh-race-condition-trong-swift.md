Một race condition xảy ra khi  thứ tự hoàn thành dự kiến của các chuỗi hoạt động không thể đoán trước được, khiến logic của chương trình kết thúc ở trạng thái không xác định. Ví dụ: chúng ta có thể cập nhật giao diện người dùng trước khi nội dung của nó được tải hoàn toàn hoặc vô tình hiển thị màn hình chỉ dành cho người dùng đã đăng nhập trước khi người dùng đăng nhập hoàn toàn.
Race conditions có thể xuất hiện ngẫu nhiên và có thể phức tạp để debug. Trong bài viết này, chúng ta hãy xem xét một kịch bản chung có thể gây ra race condition, cách có thể để tránh chúng - và cách chúng ta có thể làm cho code của chúng ta mạnh mẽ hơn và có thể dự đoán được trong quá trình này.
## An unpredictable race
Hãy bắt đầu bằng cách xem xét một ví dụ, trong đó chúng ta đang xây dựng một AccessTokenService để cho phép chúng ta dễ dàng truy xuất access token để thực hiện một số form yêu cầu mạng được xác thực. Service của chúng ta được khởi tạo với một AccessTokenLoader, thực hiện mạng thực tế, trong khi bản thân dịch vụ hoạt động như top-level API và làm việc với những thứ như caching và token validation - như sau:
```
class AccessTokenService {
    typealias Handler = (Result<AccessToken>) -> Void

    private let loader: AccessTokenLoader
    private var token: AccessToken?

    init(loader: AccessTokenLoader) {
        self.loader = loader
    }

    func retrieveToken(then handler: @escaping Handler) {
        // If we have a cached token that is still valid, simply
        // return that directly as the result.
        if let token = token, token.isValid {
            return handler(.value(token))
        }

        loader.load { [weak self] result in
            // Cache the loaded token, then pass the result
            // along to the given handler.
            self?.token = result.value
            handler(result)
        }
    }
}
```
Lớp trên có thể trông rất đơn giản, nếu được sử dụng độc lập. Tuy nhiên, nếu chúng ta xem xét kỹ hơn về triển khai của chúng ta, chúng ta có thể thấy rằng nếu phương thức retrieveToken được gọi hai lần - và cuộc gọi thứ hai xảy ra trước khi bộ nạp đã tải xong - chúng tôi sẽ thực sự nạp hai mã access token. Đối với một số máy chủ xác thực, đó có thể là một vấn đề lớn, vì thường chỉ có một mã access token hợp lệ tại bất kỳ thời điểm nào - khiến cho chúng ta rất có khả năng sẽ kết thúc với race condition khi yêu cầu thứ hai kết thúc vô hiệu hóa kết quả của cái đầu tiên.
## Enqueueing pending handlers
Vậy làm thế nào chúng ta có thể ngăn chặn race condition xảy ra? Điều đầu tiên chúng ta có thể làm là đảm bảo rằng không có yêu cầu trùng lặp nào được thực hiện song song, và thay thế enqueue bất kỳ trình xử lý nào được truyền vào hàm retrieveToken trong khi loader đang bận tải.
Để thực hiện điều đó, chúng ta sẽ bắt đầu bằng cách thêm mảng pendingHandlers vào access token service của chúng ta - và mỗi lần retrieveTokens được gọi, chúng ta sẽ thêm trình xử lý truyền vào mảng đó. Sau đó, chúng ta sẽ đảm bảo chỉ thực hiện một yêu cầu duy nhất tại bất kỳ thời điểm nào bằng cách kiểm tra xem mảng của chúng ta chỉ chứa một phần tử duy nhất - và thay vì gọi trình xử lý hiện tại trực tiếp sau khi loader hoàn tất, chúng tôi sẽ gọi một phương thức riêng mới có tên *handle*:
```
class AccessTokenService {
    typealias Handler = (Result<AccessToken>) -> Void

    private let loader: AccessTokenLoader
    private var token: AccessToken?
    // We'll keep track of all enqueued, pending handlers using
    // a simple array.
    private var pendingHandlers = [Handler]()

    func retrieveToken(then handler: @escaping Handler) {
        if let token = token, token.isValid {
            return handler(.value(token))
        }

        pendingHandlers.append(handler)

        // We'll only start loading if the current handler is
        // alone in the array after being inserted.
        guard pendingHandlers.count == 1 else {
            return
        }

        loader.load { [weak self] result in
            self?.handle(result)
        }
    }
}
```
Lý do chúng ta thay đổi một phương thức xử lý mới, thay vì chỉ đơn giản như ví dụ đầu tiên là vì có thể sau này chương trình chúng ta sẽ yêu cầu logic phức tạp hơn và nhiều tham chiếu hơn. Thay vì phải sử dụng  g*uard let* cổ điển để biến weak reference của *self* thành strong reference, chúng ta chỉ cần gọi *handle*, điều này sẽ cho phép chúng ta truy cập tất cả các tính chất của chúng ta giống như chúng ta thường làm.
Trong implementation của *handle*, chúng ta sẽ lưu lại bộ nhớ cache đã nạp và thông báo cho mỗi pending handler rằng kết quả đã được tải - như sau:
```
private extension AccessTokenService {
    func handle(_ result: Result<AccessToken>) {
        token = result.value

        let handlers = pendingHandlers
        pendingHandlers = []
        handlers.forEach { $0(result) }
    }
}
```
Bây giờ chúng ta có thể đảm bảo rằng ngay cả khi retrieveToken được gọi nhiều lần theo thứ tự, chỉ một mã token kết thúc được tải - và tất cả các handler sẽ được thông báo theo đúng thứ tự
Enqueuing asynchronous completion handlers như chúng ta làm ở trên, có thể tốn thời gian để tránh các race conditions với một single source of state, nhưng chúng ta vẫn có một vấn đề lớn mà chúng ta cần phải giải quyết - thread safety.
## Thread safety
Điều kiện có thể dẫn đến race conditions thường là multi-threading, đặc biệt là vì phần lớn mã mà chúng ta viết khi xây dựng ứng dụng sẽ không thread-safe. Vì UIKit chỉ chạy trên luồng chính, nên có ý nghĩa đối với phần lớn logic của chúng ta hoạt động gần với view layer để đưa ra giả định rằng nó sẽ chỉ được gọi từ luồng chính - nhưng ngay khi chúng ta đi sâu vào logic cốt lõi của chúng ta , giả định đó có thể không còn đúng nữa.

Miễn là mã của chúng ta đang thực thi trong cùng một luồng, chúng ta có thể dựa vào dữ liệu mà chúng ta đọc và viết từ các thuộc tính của đối tượng của chúng ta. Tuy nhiên, ngay sau khi chúng ta sử dụng multi-threaded đồng thời, hai threads có thể kết thúc đọc hoặc ghi vào cùng một thuộc tính tại cùng một thời điểm - kết quả là một trong các dữ liệu của threads trở nên lỗi thời ngay lập tức.

Ví dụ, khi AccessTokenService của chúng ta từ trước được sử dụng trong single thread, cơ chế chúng ta đặt vào để xử lý các race conditions bằng enqueuing pending completion handlers - nhưng nếu nhiềuthread kết thúc bằng việc sử dụng cùng một  access token service , chúng tôi có thể nhanh chóng kết thúc ở trạng thái không xác định, khi mảng pendingHandlers của chúng tôi bị thay đổi đồng thời từ nhiều thread. Một lần nữa, chúng ta lại gây ra một race condition.
Trong nhiều cách để xử lý các race conditions dựa trên multi-threading, có một cách khá đơn giản để làm như vậy trên nền tảng của Apple là sử dụng sức mạnh của Grand Central Dispatch - cho phép chúng ta xử lý các thread bằng cách sử dụng các queue-based abstractions .

Hãy quay trở lại AccessTokenService của chúng ta, và làm cho nó an toàn chỉ bằng cách sử dụng *DispatchQueue* chuyên dụng để đồng bộ hóa trạng thái bên trong của nó. Chúng ta sẽ bắt đầu bằng cách chấp nhậninjected queue trong khởi tạo dịch vụ của chúng ta (để tạo điều kiện thử nghiệm), hoặc tạo một cái mới, sau đó - khi phương thức *retrieveToken*  của chúng ta được gọi - chúng ta sẽ gửi một closure không đồng bộ lên hàng đợi của chúng ta thực sự thực hiện việc truy xuất token, như sau:
```
class AccessTokenService {
    typealias Handler = (Result<AccessToken>) -> Void

    private let loader: AccessTokenLoader
    private let queue: DispatchQueue
    private var token: AccessToken?
    private var pendingHandlers = [Handler]()

    init(loader: AccessTokenLoader,
         queue: DispatchQueue = .init(label: "AccessToken")) {
        self.loader = loader
        self.queue = queue
    }

    func retrieveToken(then handler: @escaping Handler) {
        queue.async { [weak self] in
            self?.performRetrieval(with: handler)
        }
    }
}
```
Cũng giống như trước đây, chúng ta chỉ cần gọi một private method bên trong asynchronous closure của chúng ta, thay vì phải thêm nhiều self references. Trong phương thức *performRetrieval* mới của chúng ta, chúng ta sẽ chạy chính xác cùng một logic như trước đây - với sự bổ sung mà bây giờ chúng ta gộp các handler trong một asynchronous queue dispatch - để đảm bảo thread  an toàn hoàn toàn:
```
private extension AccessTokenService {
    func performRetrieval(with handler: @escaping Handler) {
        if let token = token, token.isValid {
            return handler(.value(token))
        }

        pendingHandlers.append(handler)

        guard pendingHandlers.count == 1 else {
            return
        }

        loader.load { [weak self] result in
            // Whenever we are mutating our class' internal
            // state, we always dispatch onto our queue. That
            // way, we can be sure that no concurrent mutations
            // will occur.
            self?.queue.async {
                self?.handle(result)
            }
        }
    }
}
```
Với code ở trên, bây giờ chúng ta có thể sử dụng AccessTokenService của chúng ta từ bất kỳ thread nào, và vẫn chắc chắn rằng logic của chúng ta sẽ vẫn có thể dự đoán được và tất cả các trình xử lý sẽ được gọi theo thứ tự đúng .
Mặc dù không có cách nào để tránh hoàn toàn các race conditions, sử dụng các kỹ thuật như queuing và  Grand Central Dispatch có thể cho phép chúng ta viết code có thể dự đoán được nhiều hơn và ít bị lỗi hơn. Bất cứ khi nào chúng ta viết một dạng code không đồng bộ nào đó, chung ta phải suy nghĩ về cách code sẽ hoạt động khi được gọi đồng thời, và đặt các cơ chế tại chỗ để đảm bảo tất cả các hoạt động được thực hiện (và hoàn thành) theo thứ tự có thể dự đoán được. 
Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/posts/avoiding-race-conditions-in-swift