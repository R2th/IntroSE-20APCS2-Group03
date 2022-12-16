Hôm nay chúng ta cùng tìm hiểu làm thế nào để tải remote một hình ảnh vào một UIImageView đồng bộ bằng URLSessionDownloadTask và Combine framework trong Swift.
### Một ví dụ download đơn giản

Tải resource từ một URL có vẻ như một việc đơn giản, nhưng nó thực sự dễ dàng? Vâng, nó phụ thuộc. Nếu bạn cần phải [tải về và phân tích một tệp JSON](https://theswiftdev.com/2018/01/29/how-to-parse-json-in-swift-using-codable-protocol/) mà chỉ là một vài KB, sau đó bạn có thể  phương pháp dataTaskPublisher mới trên đối tượng [URLSession từ  Combine  framework](https://theswiftdev.com/2019/08/15/urlsession-and-the-combine-framework/).

### Bad Practices

Có một số phương pháp tiếp cận nhanh chóng và ko được clean cho lắm mà bạn có thể sử dụng để có được một số dữ liệu nhỏ hơn từ internet. Vấn đề với các phương pháp này là bạn phải đối phó với rất nhiều hreads và queues. May mắn thay sử dụng Dispatch framework  sẽ giúp rất nhiều, vì vậy bạn có thể blocking functions của bạn sang loại hình non-blocking. 🚧
```
let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1")!

// Synchronous download using Data & String
do {
    // get the content as String synchronously
    let content = try String(contentsOf: url)
    print(content)

    // get the content of the url as Data synchronously
    let data = try Data(contentsOf: url)
}
catch {
    print(error.localizedDescription)
}


// Turning sync to async
DispatchQueue.global().async { [weak self] in
    //this is happening on a background thread
    do {
        let content = try String(contentsOf: url)
        DispatchQueue.main.async {
            //this is happening on the main thread
            print(content)
        }
    }
    catch {
        print(error.localizedDescription)
    }
}
```

Apple đã thực hiện một lưu ý quan trọng về [tài liệu dữ liệu](https://developer.apple.com/documentation/foundation/nsdata/1547245-datawithcontentsofurl) chính thức của họ, mà bạn không nên sử dụng các phương pháp này để tải về URL phi tập tin, nhưng vẫn còn những người đang giảng dạy / sử dụng những thông lệ xấu, nhưng tại sao? 😥

> Don't use this synchronous method to request network-based URLs.

```
// The best approach without using Combine
URLSession.shared.dataTask(with: url) { data, response, error in
    // do your stuff here...
    DispatchQueue.main.async {
        // do something on the main queue
    }
}.resume()
```

Nó cũng đáng kể nếu bạn cần phải sử dụng một phương pháp HTTP khác nhau (trừ GET), gửi tiêu đề đặc biệt (thông tin, chấp nhận chính sách, vv) hoặc cung cấp dữ liệu dư thừa trong cơ thể, bạn cần phải xây dựng một đối tượng URLRequest đầu tiên. Bạn chỉ có thể gửi những yêu cầu tùy chỉnh bằng cách sử dụng API URLSession.
> on Apple platforms you are not allowed to use the unsecure HTTP protocol anymore. If you want to reach a URL without the secure layer (HTTPS) you have to disable [App Transport Security](https://developer.apple.com/security/).


### Downloading images using Combine
Phiên bản đầu tiên của Combine vận chuyển với một phương pháp  dataTaskPublisher  cho lớp URLSession. Chờ đợi, nơi là những người khác? Không tải nhiệm vụ xuất bản? Chúng ta nên làm gì bây giờ? 🤔

#### How to write a custom Publisher?

Bây giờ chúng ta hãy bắt đầu tạo DownloadTaskPublisher của chúng ta. Nếu bạn chỉ huy + nhấp chuột vào phương pháp dataTaskPublisher trong Xcode, bạn có thể thấy giao diện tương ứng. Ngoài ra còn có một struct DataTaskPublisher, ngay bên dưới. Dựa trên mẫu mà chúng ta có thể tạo ra phần mở rộng của chúng ta. Có hai biến thể của cùng một phương pháp nhiệm vụ dữ liệu, chúng tôi sẽ tái tạo hành vi này. Một điều khác chúng ta cần là một struct DownloadTaskPublisher, tôi sẽ chỉ cho bạn mã Swift đầu tiên, sau đó chúng tôi sẽ thảo luận về các chi tiết thực hiện.
```
extension URLSession {

    public func downloadTaskPublisher(for url: URL) -> URLSession.DownloadTaskPublisher {
        self.downloadTaskPublisher(for: .init(url: url))
    }

    public func downloadTaskPublisher(for request: URLRequest) -> URLSession.DownloadTaskPublisher {
        .init(request: request, session: self)
    }

    public struct DownloadTaskPublisher: Publisher {

        public typealias Output = (url: URL, response: URLResponse)
        public typealias Failure = URLError

        public let request: URLRequest
        public let session: URLSession

        public init(request: URLRequest, session: URLSession) {
            self.request = request
            self.session = session
        }

        public func receive<S>(subscriber: S) where S: Subscriber,
            DownloadTaskPublisher.Failure == S.Failure,
            DownloadTaskPublisher.Output == S.Input
        {
            let subscription = DownloadTaskSubscription(subscriber: subscriber, session: self.session, request: self.request)
            subscriber.receive(subscription: subscription)
        }
    }
}
```

Publisher có thể gửi một Output hoặc nhắn một Failure message đính kèm subscriber. Bạn phải tạo một typealias mới đối với từng loại, vì cả hai đều là những trở ngại chung được xác định trên tầng giao thức. Tiếp theo, chúng tôi sẽ lưu trữ phiên và yêu cầu các đối tượng để sử dụng sau. Phần cuối cùng của sự phù hợp giao thức là bạn phải thực hiện  **receive<S>(subscriber: S)** generic method. Phương pháp này có trách nhiệm gắn một subscriber mới thông qua một đối tượng subscription.
    
####  How to make a custom Subscription?
```
extension URLSession {

    final class DownloadTaskSubscription<SubscriberType: Subscriber>: Subscription where
        SubscriberType.Input == (url: URL, response: URLResponse),
        SubscriberType.Failure == URLError
    {
        private var subscriber: SubscriberType?
        private weak var session: URLSession!
        private var request: URLRequest!
        private var task: URLSessionDownloadTask!

        init(subscriber: SubscriberType, session: URLSession, request: URLRequest) {
            self.subscriber = subscriber
            self.session = session
            self.request = request
        }

        func request(_ demand: Subscribers.Demand) {
            guard demand > 0 else {
                return
            }
            self.task = self.session.downloadTask(with: request) { [weak self] url, response, error in
                if let error = error as? URLError {
                    self?.subscriber?.receive(completion: .failure(error))
                    return
                }
                guard let response = response else {
                    self?.subscriber?.receive(completion: .failure(URLError(.badServerResponse)))
                    return
                }
                guard let url = url else {
                    self?.subscriber?.receive(completion: .failure(URLError(.badURL)))
                    return
                }
                do {
                    let cacheDir = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
                    let fileUrl = cacheDir.appendingPathComponent((UUID().uuidString))
                    try FileManager.default.moveItem(atPath: url.path, toPath: fileUrl.path)
                    _ = self?.subscriber?.receive((url: fileUrl, response: response))
                    self?.subscriber?.receive(completion: .finished)
                }
                catch {
                    self?.subscriber?.receive(completion: .failure(URLError(.cannotCreateFile)))
                }
            }
            self.task.resume()
        }

        func cancel() {
            self.task.cancel()
        }
    }
}
```
    
    
   Một Subscriber có một đầu vào và một loại Failure. Một Subscriber chỉ có thể đăng ký vào một nhà xuất bản với các loại tương tự. Của Publisher Output & loại Failure phải giống hệt với các loại đăng ký đầu vào và Failure. Lần này chúng tôi không thể đi với một associatedType, nhưng chúng ta phải tạo ra một giá trị chung mà có một cản trở đối với các yêu cầu này bằng cách sử dụng một mệnh đề where. Lý do đằng sau này là chúng ta không biết những gì loại Subscriber sẽ đăng ký vào đăng ký này. Nó có thể là một lớp A hoặc B, ai biết được ... 🤷♂️
    
 Chúng ta phải vượt qua một vài thuộc tính trong phương pháp init, lưu trữ chúng như là các biến dụ (hãy cẩn thận với các lớp học, bạn nên sử dụng yếu nếu có). Cuối cùng chúng tôi thực hiện các phương thức yêu cầu giá trị, bằng cách tôn trọng chính sách theo yêu cầu. Nhu cầu chỉ là một số. Nó cho chúng ta biết bao nhiêu giá trị chúng ta có thể gửi lại cho các thuê bao tối đa. Trong trường hợp của chúng tôi, chúng tôi sẽ có giá trị tối đa 1, vì vậy nếu nhu cầu là lớn hơn không, chúng tôi đang tốt để đi. Bạn có thể gửi tin nhắn cho thuê bao bằng cách gọi khác nhau nhận được phương pháp trên đó.

 Bạn phải tự gửi sự kiện kết thúc với .finished hoặc (T) giá trị .failure. Ngoài ra chúng tôi phải di chuyển các tập tin tạm thời được tải về trước khi trở về khối hoàn thành nếu không chúng tôi hoàn toàn sẽ mất nó. Lần này tôi sẽ chỉ cần di chuyển các tập tin vào thư mục ứng dụng bộ nhớ cache. Là một hủy miễn phí là một cách tuyệt vời để kết thúc hoạt động pin thoát. Bạn chỉ cần thực hiện một phương pháp hủy () tùy chỉnh. Trong trường hợp của chúng tôi, chúng ta có thể gọi phương thức tương tự trên URLSessionDownloadTask cơ bản.

#### How to create a custom Subscriber?

    final class DownloadTaskSubscriber: Subscriber {
    typealias Input = (url: URL, response: URLResponse)
    typealias Failure = URLError

    var subscription: Subscription?

    func receive(subscription: Subscription) {
        self.subscription = subscription
        self.subscription?.request(.unlimited)
    }

    func receive(_ input: Input) -> Subscribers.Demand {
        print("Subscriber value \(input.url)")
        return .unlimited
    }

    func receive(completion: Subscribers.Completion<Failure>) {
        print("Subscriber completion \(completion)")
        self.subscription?.cancel()
        self.subscription = nil
    }
}
    
    
Các subscriber trên chỉ đơn giản là sẽ in ra các giá trị đến. Chúng ta phải hết sức cẩn thận với quản lý bộ nhớ. Các subscriber nhận được sẽ được lưu trữ như một thuộc tính mạnh mẽ, nhưng khi nhà xuất bản gửi một sự kiện hoàn thành chúng ta nên hủy bỏ đăng ký và loại bỏ các tài liệu tham khảo.

Dưới đây là một số sample code cho tất cả các loại Combine subscriber viết bằng Swift 5.1:
    
```
class ViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!

    static let url = URL(string: "https://images.unsplash.com/photo-1554773228-1f38662139db")!

    static var defaultValue: (url: URL, response: URLResponse) = {
        let fallbackUrl = URL(fileURLWithPath: "fallback-image-path")
        let fallbackResponse = URLResponse(url: fallbackUrl, mimeType: "foo", expectedContentLength: 1, textEncodingName: "bar")
        return (url: fallbackUrl, response: fallbackResponse)
    }()

    @Published var value: (url: URL, response: URLResponse) = ViewController.defaultValue
    let subject = PassthroughSubject<(url: URL, response: URLResponse), URLError>()
    let subscriber = DownloadTaskSubscriber()

    var sinkOperation: AnyCancellable?

    var assignOperation: AnyCancellable?
    var assignSinkOperation: AnyCancellable?

    var subjectOperation: AnyCancellable?
    var subjectSinkOperation: AnyCancellable?

    override func viewDidLoad() {
        super.viewDidLoad()

        self.sinkExample()
        self.assignExample()
        self.subjectExample()
        self.subscriberExample()
    }

    func sinkExample() {
        self.sinkOperation = URLSession.shared
            .downloadTaskPublisher(for: ViewController.url)
            .sink(receiveCompletion: { completion in
                print("Sink completion: \(completion)")
            }) { value in
                print("Sink value: \(value.url)")
            }
    }

    func assignExample() {
        self.assignSinkOperation = self.$value.sink { value in
            print("Assign value: \(value.url)")
        }

        self.assignOperation = URLSession.shared
            .downloadTaskPublisher(for: ViewController.url)
            .replaceError(with: ViewController.defaultValue)
            .assign(to: \.value, on: self)
    }

    func subjectExample() {
        self.subjectSinkOperation = self.subject.sink(receiveCompletion: { completion in
            print("Subject completion: \(completion)")
        }) { value in
            print("Subject value: \(value.url)")
        }

        self.subjectOperation = URLSession.shared
            .downloadTaskPublisher(for: ViewController.url)
            .subscribe(self.subject)
    }

    func subscriberExample() {
        URLSession.shared
            .downloadTaskPublisher(for: ViewController.url)
            .subscribe(DownloadTaskSubscriber())
    }
}
```

```
class ViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!

    var operation: AnyCancellable?

    override func viewDidLoad() {
        super.viewDidLoad()

        let url = URL(string: "https://images.unsplash.com/photo-1554773228-1f38662139db")!

        self.operation = URLSession.shared
            .downloadTaskPublisher(for: url)
            .map { UIImage(contentsOfFile: $0.url.path)! }
            .replaceError(with: UIImage(named: "fallback"))
            .receive(on: DispatchQueue.main)
            .assign(to: \.image, on: self.imageView)
    }
}
```
    
    
Cám ơn các bạn đã quan tâm tới bài viết, bài viết này được dịch theo[ bài viết cùng tên của tác giả Tibor Bödecs.](https://theswiftdev.com/how-to-download-files-with-urlsession-using-combine-publishers-and-subscribers/)