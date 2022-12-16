- Khi tham khảo các `topic` về `unit testing` hay `automated test` ta thường bắt gặp các thuật ngữ rất phổ biến như về `testable code` như `synchronous`, `predicable` hay luôn trả ra `output` giống nhau cho các `input` khác nhau. Tuy nhiên trong thực tế các đoạn code về `net working` mà chúng ta hay gặp lại đi ngược với các thuật ngữ chúng ta gặp trong các topic.

- Nguyên nhân khiến chúng ta gặp khó khăn khi test code `net working` là `net working` vốn dĩ là một công việc không đồng bộ và phụ thuộc nhiều vào các yếu tố bên ngoài như là `internet connection`, `server` , các loại hệ thống vận hành khác nhau. Các yếu tố trên đều ảnh hưởng trực tiếp đến việc `performing`, `loading` , `decoding` của `net work` `request`.

- Ở bài viết này chúng ta sẽ tập trung vào cách `test` các đoạn code `asynchronous` bằng cách sử dụng `API` `Foundation`:

### 1/ Verifying request generation logic:

- Khi bắt đầu triển khai một công việc `test` mới chúng ta nên bắt đầu ngược bằng cách kiểm tra độ chính xác của các `logic` cơ bản nhất trước khi chuyển sang `test` các `API`.

- Chúng ta sẽ cùng khơi tạo các `URLRequest` từ `Endpoint` với một số điều kiện kèm theo .Để việc test có tiêu chuẩn chung chúng ta cùng tạo `EndpointKind` mà không hề tùy chỉnh:

```swift
extension EndpointKinds {
    enum Stub: EndpointKind {
        static func prepare(_ request: inout URLRequest,
                            with data: Void) {
            // No-op
        }
    }
}
```

- Chúng ta đã có thể viết các `suite test` với đoạn `code` bên trên trong đó chúng ra sẽ cần xác minh chính xác xác `URLRequest` cho các `endpoint` cơ bản không cần `HTTP header`.

```swift
class EndpointTests: XCTestCase {
    func testBasicRequestGeneration() {
        let endpoint = Endpoint<EndpointKinds.Stub, String>(path: "path")
        let request = endpoint.makeRequest(with: ())
        XCTAssertEqual(request?.url, URL(string: "https://api.myapp.com/path"))
    }
}
```

- Chúng ta sẽ cần cải thiện thêm `test case` bên trên , chúng ta có thể nhận được kết quả sai vì cả trường hợp `URLRequest` chúng ta khởi tạo cũng như `URL` cho sẵn đều có thể bằng `nil`(đây là điều rất khó xảy ra nhưng khi viết `test case` chúng ta không nên bỏ sót bất kì trường hợp nào không chắc chắn).

- Tiếp theo chúng ta đang giả định rằng `host` sẽ luôn là `api.myapp.com`, điều này đi được lại với thực tế là các `app` hiện tại đều hỗ trợ chúng ta sử dụng nhiều `net working enviroment` như `staging` hay `production`, hơn thế nữa là các `app` còn có một vài `server` với các `host` có  `address` khác nhau.

- Chúng ta sẽ gặp vấn đề đầu tiên khi sử dụng `XCTUnwrap` để kiểm tra các `request` được khởi tạo không bằng `nil`. Chúng ta nên tạo `typealias` cho các `Endpoint` đặc biệt:

```swift
class EndpointTests: XCTestCase {
    typealias StubbedEndpoint = Endpoint<EndpointKinds.Stub, String>

    func testBasicRequestGeneration() throws {
        let endpoint = StubbedEndpoint(path: "path")
        let request = try XCTUnwrap(endpoint.makeRequest(with: ()))
        XCTAssertEqual(request.url, URL(string: "https://api.myapp.com/path"))
    }
}
```

- Để có thể kiểm soát chính xác `host` hoạt động thế nào chúng ta cùng sử dụng `URLHost` chuyên dụng để có thể bao bọc một chuỗi `String` đơn gian:

```swift
struct URLHost: RawRepresentable {
    var rawValue: String
}
```

- Lợi ích của việc sử dụng `URLHost` với các `type` riêng biệt là chúng ta có thể đóng gói các biến thể phổ biến bằng cách sử dụng các `property` tĩnh trong `enum` như cách tạo `property` cho `host` như `staging` và `production` cũng như `default` để tự động xử lý cho các trường hợp `app` chạy trong `DEBUG` `mode`:

```swift
extension URLHost {
    static var staging: Self {
        URLHost(rawValue: "staging.api.myapp.com")
    }

    static var production: Self {
        URLHost(rawValue: "api.myapp.com")
    }

    static var `default`: Self {
        #if DEBUG
        return staging
        #else
        return production
        #endif
    }
}
```

- Chúng ta cần `update` thêm `Endpoint` các `method` khởi tạo `URLRequest` bằng cách `enabling` `URLHost`L:

```swift
extension Endpoint {
    func makeRequest(with data: Kind.RequestData,
                     host: URLHost = .default) -> URLRequest? {
        var components = URLComponents()
        components.scheme = "https"
        components.host = host.rawValue
        components.path = "/" + path
        components.queryItems = queryItems.isEmpty ? nil : queryItems

        guard let url = components.url else {
            return nil
        }

        var request = URLRequest(url: url)
        Kind.prepare(&request, with: data)
        return request
    }
}
```

- Để tránh việc phải xử lý thủ công cho mỗi `URL` chúng ta sử dụng chúng ta cần cải thiện `URLHost` để sễ dàng khởi tạo các `URL` đặc biệt với các `path` như sau:

```swift
extension URLHost {
    func expectedURL(withPath path: String) throws -> URL {
        let url = URL(string: "https://" + rawValue + "/" + path)
        return try XCTUnwrap(url)
    }
}
```

- Đoạn `code` trên không chỉ giúp việc `test` của chúng ta trở nên chặt chẽ, chính xác cũng như linh động hơn. Chúng ta bây giờ hoàn toàn có thể tạo các `test case` dễ đọc và dễ kiểm thử hơn.

```swift
class EndpointTests: XCTestCase {
    typealias StubbedEndpoint = Endpoint<EndpointKinds.Stub, String>

    let host = URLHost(rawValue: "test")

    func testBasicRequestGeneration() throws {
        let endpoint = StubbedEndpoint(path: "path")
        let request = endpoint.makeRequest(with: (), host: host)

        try XCTAssertEqual(
            request?.url,
            host.expectedURL(withPath: "path")
        )
    }
}
```

- CHúng ta đã tốn kha khá `effort` để viết các tùy chỉnh cho các API để cải thiện cho `code base` chúng ta có thể mạnh mẽ cũng như linh hoạt hơn. Chúng ta có thể tạo thêm nhiều `test case` để kiểm tra các loại `Endpoint` một cách nhanh chóng.

```swiftclass EndpointTests: XCTestCase {
    ...

    func testGeneratingRequestWithQueryItems() throws {
        let endpoint = StubbedEndpoint(path: "path", queryItems: [
            URLQueryItem(name: "a", value: "1"),
            URLQueryItem(name: "b", value: "2")
        ])

        let request = endpoint.makeRequest(with: (), host: host)

        try XCTAssertEqual(
            request?.url,
            host.expectedURL(withPath: "path?a=1&b=2")
        )
    }
}
```

- Chúng ta nên tạo thêm một số `test case` kiêm tra các `endpoint` thực để đảm bảo `code test` hoạt động đúng. Trong trường hợp chúng ta gặp `endpoint` yêu cầu sử dụng `authentication` thì chúng ta sẽ cần thêm `header` `Authorization` khi khởi tạo `request`:

```swift
class EndpointTests: XCTestCase {
    ...

    func testAddingAccessTokenToPrivateEndpoint() throws {
        let endpoint = Endpoint.search(for: "query")
        let token = AccessToken(rawValue: "12345")
        let request = endpoint.makeRequest(with: token, host: host)

        try XCTAssertEqual(
            request?.url,
            host.expectedURL(withPath: "search?q=query")
        )

        XCTAssertEqual(request?.allHTTPHeaderFields, [
            "Authorization": "Bearer 12345"
        ])
    }
}
```

### 2/ Using integration tests:

- Chúng ta hiện đang sử dụng `URLSession` `API` trong `Foundation` kết hợp với một vài `operator` của `Combine` để xây dựng core `net working` code:

```swift
extension URLSession {
    func publisher<K, R>(
        for endpoint: Endpoint<K, R>,
        using requestData: K.RequestData,
        decoder: JSONDecoder = .init()
    ) -> AnyPublisher<R, Error> {
        guard let request = endpoint.makeRequest(with: requestData) else {
            return Fail(
                error: InvalidEndpointError(endpoint: endpoint)
            ).eraseToAnyPublisher()
        }

        return dataTaskPublisher(for: request)
            .map(\.data)
            .decode(type: NetworkResponse<R>.self, decoder: decoder)
            .map(\.result)
            .eraseToAnyPublisher()
    }
}
```

- Kết quả `successfully` của đoạn `code` trên không phải là kết quả chúng ta nên quá quan tâm vì chúng ta sử dụng một loạt các `API` của hệ thống đã được tùy chỉnh, kiểm soát theo một số cách thức đặc biệt khiến các kết quả `test` đạt được thường bị thu hẹp và dễ đoán biết.

- `Protocol` là một phương pháp cải tiện kết quả `test` không chỉ trong trường hợp trên mà còn cho nhiều trường hợp khác mà chúng ta không phải tham gia tùy chỉnh, kiểm soát các `API`. Đây là một phương pháp hữu dụng và phổ biến nên ở bài viết này chúng ta sẽ cùng ưu tiên cho cách thức khác:

- Trong `Swift` ta thấy `URLSession` sử dụng `URLProtcol` để tiến hành các tác vụ `network`, hệ thống `Apple` đã cung cấp cũng như hỗ trợ hoàn chỉnh để chúng ta có thể tùy chỉnh bằng việc sử dụng các `class`. Điều đó có nghĩa là chúng ta có thể tự tùy biến một hệ thống `HTTP Net working stack` mà không phải sửa đổi các `operator Combine` tùy biến trước đó.

- Nhược điểm của `URLProtcol` từ quan điểm cá nhân tôi là nó chủ yếu dựa vào các `static method` đồng nghĩa chúng ta sẽ phải `implement` các `mock` của chúng ta riêng biệt. Cách khắc phục tạm thời là sử dụng thêm protocol `MockURLResponser` để cho phép chúng ta tạo các `mock server` trả về `Data` hoặc `Error` cần thiết:

```swift
protocol MockURLResponder {
    static func respond(to request: URLRequest) throws -> Data
}
```

- Điều tiếp theo chúng ta cần triển khai là tùy chỉnh thêm `URLProtcol` với việc `override` các `method` như sau:

```swift
class MockURLProtocol<Responder: MockURLResponder>: URLProtocol {
    override class func canInit(with request: URLRequest) -> Bool {
        true
    }

    override class func canonicalRequest(for request: URLRequest) -> URLRequest {
        request
    }

    override func startLoading() {
        guard let client = client else { return }

        do {
            // Here we try to get data from our responder type, and
            // we then send that data, as well as a HTTP response,
            // to our client. If any of those operations fail,
            // we send an error instead:
            let data = try Responder.respond(to: request)
            let response = try XCTUnwrap(HTTPURLResponse(
                url: XCTUnwrap(request.url),
                statusCode: 200,
                httpVersion: "HTTP/1.1",
                headerFields: nil
            ))

            client.urlProtocol(self,
                didReceive: response,
                cacheStoragePolicy: .notAllowed
            )
            client.urlProtocol(self, didLoad: data)
        } catch {
            client.urlProtocol(self, didFailWithError: error)
        }

        client.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {
        // Required method, implement as a no-op.
    }
}
```

- Chúng ta cần `URLSession` sử dụng các `mock protocol` hơn là sử dụng hệ thống `HTTP` mặc định. Để thực hiện điều đó chúng ta chỉ cần cho `URLSession` sử dụng `MockURLProtocol` nhưng đừng quên khai báo khởi tạo cho chính `URLProtcol`:

```swift
extension URLSession {
    convenience init<T: MockURLResponder>(mockResponder: T.Type) {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [MockURLProtocol<T>.self]
        self.init(configuration: config)
        URLProtocol.registerClass(MockURLProtocol<T>.self)
    }

```

- Với những đoạn `code` trên chúng ta giờ đã có thể cố định `MockURLResponder` `protocol`, để ví dụ chúng ta  sẽ tham khảo việc `encode` `item` sau:

```swift
extension Item {
    enum MockDataURLResponder: MockURLResponder {
        static let item = Item(title: "Title", description: "Description")

        static func respond(to request: URLRequest) throws -> Data {
            let response = NetworkResponse(result: item)
            return try JSONEncoder().encode(response)
        }
    }
}
```

- Chúng ta nên cân nhắc việc sử dụng chế đố `synchronous` mà `Combine` giới thiệu với việc sử dụng `XCtTest` để xây dựng các logic `synchronous` hơn là sử dụng `Grand Central Dispatch semaphore`:

```swift
extension XCTestCase {
    func awaitCompletion<T: Publisher>(
        of publisher: T,
        timeout: TimeInterval = 10
    ) throws -> [T.Output] {
        // An expectation lets us await the result of an asynchronous
        // operation in a synchronous manner:
        let expectation = self.expectation(
            description: "Awaiting publisher completion"
        )

        var completion: Subscribers.Completion<T.Failure>?
        var output = [T.Output]()

        let cancellable = publisher.sink {
            completion = $0
            expectation.fulfill()
        } receiveValue: {
            output.append($0)
        }

        // Our test execution will stop at this point until our
        // expectation has been fulfilled, or until the given timeout
        // interval has elapsed:
        waitForExpectations(timeout: timeout)

        switch completion {
        case .failure(let error):
            throw error
        case .finished:
            return output
        case nil:
            // If we enter this code path, then our test has
            // already been marked as failing, since our
            // expectation was never fullfilled.
            cancellable.cancel()
            return []
        }
    }
}
```

- Giống công việc `test` `Endpoint` của hệ thống chúng ta đã sử dụng nhiều `effort` để xây dựng các công cụ hữu hiệu để có thể triển khai việc `test` với các dòng code ngắn gọn mạch lạc hơn. Chúng ta sẽ cùng tiến hành `test` công việc `successfully load` cũng như `decode` của `request`:

```swift
class NetworkIntegrationTests: XCTestCase {
    func testSuccessfullyPerformingRequest() throws {
        let session = URLSession(mockResponder: Item.MockDataURLResponder.self)
        let accessToken = AccessToken(rawValue: "12345")

        let publisher = session.publisher(for: .latestItem, using: accessToken)
        let result = try awaitCompletion(of: publisher)

        XCTAssertEqual(result, [Item.MockDataURLResponder.item])
    }
}
```

- YEAHH!!!, Điều cuối cùng chúng ta cần quan tâm là chúng ta có thể xác nhận lại các phương thức `networking` hoạt động đúng mong đợi khi xảy ra các lỗi:

```swift
enum MockErrorURLResponder: MockURLResponder {
    static func respond(to request: URLRequest) throws -> Data {
        throw URLError(.badServerResponse)
    }
}

class NetworkIntegrationTests: XCTestCase {
    ...

    func testFailingWhenEncounteringError() throws {
        let session = URLSession(mockResponder: MockErrorURLResponder.self)
        let accessToken = AccessToken(rawValue: "12345")

        let publisher = session.publisher(for: .latestItem, using: accessToken)
        XCTAssertThrowsError(try awaitCompletion(of: publisher))
    }
}
```