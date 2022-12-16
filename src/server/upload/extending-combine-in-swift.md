- `Combine` cho phép chúng ta có thể thiết lập các quá trình xử lý bất đồng bộ như các luồng xử lý riêng biệt mà trong đó từng luồng lại có các `operation` khác nhau. Các luồng xử lý riêng biệt có thể là `observed`, `transforned`, `conbined` bằng nhiều cách khác nhau và tất cả đều có thể được tiến hành xử lý với độ an toàn cao và được kiểm tra trong `compile time`.

- Việc xác thực `strong type` rất hữu dụng khi chúng ta tiến hành mở rộng các `func` trong `Combine` vì chúng ta có thể tạo các thay đổi tùy thuộc vào `out put` chúng ta cần.


### 1 / Inserting default arguments:
- Mặc dù `Combine` đã cung cấp cho chúng ta rất nhiều `operation transform` nhưng đôi khi chúng ta vẫn cần tùy chỉnh `API` để có thể sử dụng thuận tiện nhất trong quá trình phát triển. Một ví dụ điển hình là khi chúng chúng ta làm việc nhiều với `protocol` `Publisher` có `type` `Output` và `Failure` thì chúng ta cần biết chính xác loại `type` mà `publisher` yêu cầu:

- Operation `decode` được sử dụng để `transform` giá trị `Data` được `emit` khi `publisher` sử dụng `Decodeable`. Tuy nhiên `operation` này yêu cầu chúng ta phải luôn truyền vào `type` mà chúng ta cần `decode`. Chúng ta cần tạo một tùy chỉnh nhỏ ở đây để có thể tự động thêm vào cho chúng ta các giá trị cần thiết cho công việc decode như:

```swift
extension Publisher where Output == Data {
    func decode<T: Decodable>(
        as type: T.Type = T.self,
        using decoder: JSONDecoder = .init()
    ) -> Publishers.Decode<Self, T, JSONDecoder> {
        decode(type: type, decoder: decoder)
    }
}
```

- Một điểm cần lưu ý ở thay đổi `.init()` với `instance` `JSONDecoder` được sử dụng xuyên suốt app. Ví dụ như khi làm việc với web `API` mà chúng ta download json từ các `snake_case`, chúng ta muốn thay thay thế các `snakeCaseConverting` `instance` như các `decoder` `arguments`:

```swift
extension JSONDecoder {
    static let snakeCaseConverting: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return decoder
    }()
}

extension Publisher where Output == Data {
    func decode<T: Decodable>(
        as type: T.Type = T.self,
        using decoder: JSONDecoder = .snakeCaseConverting
    ) -> Publishers.Decode<Self, T, JSONDecoder> {
        decode(type: type, decoder: decoder)
    }
}
```

- Với thay đổi trên ở 2 `extension` giờ chúng ta có thể sử dụng `.decode()` để `decode` JSON mỗi khi `compiler` cho phép gợi ý `output type` mong muốn:

```swift
class ConfigModelController: ObservableObject {
    @Published private(set) var config: Config
    private let urlSession: URLSession
    
    ...

    func update() {
        // Here the compiler is able to infer which type that we’re
        // looking to decode our JSON into, based on the property
        // that we’re assigning our pipeline’s output to:
        urlSession.dataTaskPublisher(for: .config)
            .map(\.data)
            .decode()
            .replaceError(with: .default)
            .receive(on: DispatchQueue.main)
            .assign(to: &$config)
    }
}
```

- `Operation` `decode` của chúng ta thực sự hữu dụng khi chúng ta đã có thể tùy chỉnh hoàn toàn và đưa ra `type` mà chúng ta mong muốn cho `output`:

```swift
cancellable = URLSession.shared
    .dataTaskPublisher(for: .allItems)
    .map(\.data)
    .decode(as: NetworkResponse.self)
    .sink { completion in
        // Handle completion
        ...
    } receiveValue: { response in
        // Handle response
        ...
    }
```

### 2/ Data validation:

- Tiếp theo chúng ta sẽ tìm hiểu xem chúng ta có thể làm gì để mở rộng các `API` chuyên dụng cho công việc tiến hành `data validation`. Nếu chúng ta muốn mỗi `NetworkResponse` `instance` đã load đều chứa ít nhất 1 `Item`. Cho ta có thể thêm vào các `API` bằng cách sử dụng `tryMap` `operator` để xử lý `error` nếu có:

```swift
extension Publisher {
    func validate(
        using validator: @escaping (Output) throws -> Void
    ) -> Publishers.TryMap<Self, Output> {
        tryMap { output in
            try validator(output)
            return output
        }
    }
}
```

- Chúng ta cũng có thể thêm vào đoạn code trên một `operator` `validate` cho các luồng làm việc trong `Combine` trước đó và có thể xử lý phân loại `error` cho trường hợp `items` array rỗng như sau:

```swift
cancellable = URLSession.shared
    .dataTaskPublisher(for: .allItems)
    .map(\.data)
    .decode(as: NetworkResponse.self)
    .validate { response in
    guard !response.items.isEmpty else {
        throw NetworkResponse.Error.missingItems
    }
}
    .sink { completion in
        // Handle completion
        ...
    } receiveValue: { response in
        // Handle response
        ...
    }
```

- Một phương thức khác để `validate data` trong `swift` là `unwrapping optionals` thông qua `Combine` operator `compactMap` để có thể bỏ qua các giá trị `nil` thay vì ném ra `error` khi mà công việc xử lý không cần trả ra kết quả. Nhưng nếu chung ta muốn show ra các `error` trong các trường hợp chúng ta có thể custom nó như sau:

```swift
extension Publisher {
    func unwrap<T>(
        orThrow error: @escaping @autoclosure () -> Failure
    ) -> Publishers.TryMap<Self, T> where Output == Optional<T> {
        tryMap { output in
            switch output {
            case .some(let value):
                return value
            case nil:
                throw error()
            }
        }
    }
}
```

- Công dụng của `unwrap` operator là khi chúng ta đang load một collection `Item` khác từ `recentItems` và chúng ta chỉ cần `element` đầu tiên thì chúng ta làm như sau:

```swift
cancellable = URLSession.shared
    .dataTaskPublisher(for: .recentItems)
    .map(\.data)
    .decode(as: NetworkResponse.self)
    .map(\.items.first)
.unwrap(orThrow: NetworkResponse.Error.missingItems)
    .sink { completion in
        // Handle completion
        ...
    } receiveValue: { response in
        // Handle response
        ...
    }
```

### 3/ Result conversions:

- Cách phổ biến nhất để xử lý `output` từ `Combine` là sử dụng `sink` operator với 2 `closure`, 1 dùng để xử lý từng `output value` và cái còn lại để `completion event`.

- Tuy nhiên khi xử lý thành công `output` và xử lý `completion` riêng biệt đôi khi lại đem lại cho chúng ta bất tiện nhất định. Trong trường hợp này việc `emit` riêng một `Result` value lại là một cách tuyệt vời để chúng ta tiến hành tùy chỉnh các `operator`:

```swift
extension Publisher {
    func convertToResult() -> AnyPublisher<Result<Output, Failure>, Never> {
        self.map(Result.success)
            .catch { Just(.failure($0)) }
            .eraseToAnyPublisher()
    }
}
```

- Operatior mới `convertToResult` phát huy được thế mạng khi sử dụng `build` `viewmodel` cho `SwiftUI` view. Chúng ta bây giờ sẽ duyên từ các `item` đã load dược trước đó trong `ItemListViewModel` để sử dụng cho `operator` mới để có thể `switch` sang `Result` cho mỗi `operation` đang loading:

```swift
class ItemListViewModel: ObservableObject {
    @Published private(set) var items = [Item]()
    @Published private(set) var error: Error?

    private let urlSession: URLSession
    private var cancellable: AnyCancellable?

    ...

    func load() {
        cancellable = urlSession
            .dataTaskPublisher(for: .allItems)
            .map(\.data)
            .decode(as: NetworkResponse.self)
            .validate { response in
                guard !response.items.isEmpty else {
                    throw NetworkResponse.Error.missingItems
                }
            }
            .map(\.items)
            .convertToResult()
            .receive(on: DispatchQueue.main)
            .sink { [weak self] result in
                switch result {
                case .success(let items):
                    self?.items = items
                    self?.error = nil
                case .failure(let error):
                    self?.items = []
                    self?.error = error
                }
            }
    }
}
```

- Tiếp tục tìm hiểu sâu hơn chúng ta sẽ update lại `view model` bằng cách dùng `LoadableObject` protocol và `LoadingState` enum. Chúng ta bắt đầu add thêm các operator tùy chỉnh để `emit` `LoadingState` value thay vì dùng `Result`:

```swift
extension Publisher {
    func convertToLoadingState() -> AnyPublisher<LoadingState<Output>, Never> {
        self.map(LoadingState.loaded)
            .catch { Just(.failed($0)) }
            .eraseToAnyPublisher()
    }
}
```

- Thay đổi trên giúp chúng ta dễ dàng load và assign state cho viewmodel như sau:

```swift
class ItemListViewModel: LoadableObject {
    @Published private(set) var state = LoadingState<[Item]>.idle
    
    ...
    
    func load() {
    	guard !state.isLoading else {
            return
    	}
    
    	state = .loading
    
        urlSession
            .dataTaskPublisher(for: .allItems)
            .map(\.data)
            .decode(as: NetworkResponse.self)
            .validate { response in
                guard !response.items.isEmpty else {
                    throw NetworkResponse.Error.missingItems
                }
            }
            .map(\.items)
            .receive(on: DispatchQueue.main)
            .convertToLoadingState()
.assign(to: &$state)
    }
}
```

### 4/ Type-erased constant publishers:

- Thỉnh thoảng chúng ta muốn tạo một `publisher` chỉ `emit` duy nhất một `value` hoặc `error` bằng cách sử dụng `Just` hoặc `Fail`. Tuy nhiên khi sử dụng các `publisher` này chúng cũng phải tiến hành các operator kèm theo như `setFailureType` và `eraseToAnyPublisher`:

```swift
class SearchResultsLoader {
    private let urlSession: URLSession
    private let cache: Cache<String, [Item]>
    
    ...

    func searchForItems(
        matching query: String
    ) -> AnyPublisher<[Item], SearchError> {
        guard !query.isEmpty else {
            return Fail(error: SearchError.emptyQuery)
    .eraseToAnyPublisher()
        }

        if let cachedItems = cache.value(forKey: query) {
            return Just(cachedItems)
    .setFailureType(to: SearchError.self)
    .eraseToAnyPublisher()
        }

        return urlSession
            .dataTaskPublisher(for: .search(for: query))
            .map(\.data)
            .decode(as: NetworkResponse.self)
            .mapError(SearchError.requestFailed)
            .map(\.items)
            .handleEvents(receiveOutput: { [cache] items in
                cache.insert(items, forKey: query)
            })
            .eraseToAnyPublisher()
    }
}
```

- Tiếp đến chúng ta hãy thử mở rộng `AnyPublisher` với 2 `static` method, 1 cho việc tạo `type-erased` `Just` và một cho `Fail` publisher:

```swift
extension AnyPublisher {
    static func just(_ output: Output) -> Self {
        Just(output)
            .setFailureType(to: Failure.self)
            .eraseToAnyPublisher()
    }
    
    static func fail(with error: Failure) -> Self {
        Fail(error: error).eraseToAnyPublisher()
    }
}
```

- Bây giờ chúng ta đã có thể sử dụng `Swift` "dot syntax" để tạo `constant` publisher với một dòng code như sau:

```swift
class SearchResultsLoader {
    ...

    func searchForItems(
        matching query: String
    ) -> AnyPublisher<[Item], SearchError> {
        guard !query.isEmpty else {
            return .fail(with: SearchError.emptyQuery)
        }

        if let cachedItems = cache.value(forKey: query) {
            return .just(cachedItems)
        }

        ...
    }
}
```