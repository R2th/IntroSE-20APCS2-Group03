- Công việc quản lý bộ nhớ `memory management` thường trở nên phức tạp khi chúng ta thực hiện các tác vụ bất đồng bộ `asynchronous` vì chúng ta thường phải lưu giữ một số `object` nằm ngoài `scope` mà `object` được `define` trong khi vẫn phải đảm bảo được việc giải phóng `object` đó được thực hiện đúng quy trình.

- Mặc dù `Apple` đã giới thiệu `framework` `Combine` có thể tham chiếu `reference` đến các `object` cũng như hỗ trợ việc quản lý vòng đời của `object` đó một cách đơn giản hơn nhưng lại yêu cầu chúng ta triển khai các `asynchronous code base` của chúng ta dưới mô hình `pipeline` thay vì triển khai dưới dạng các `closure` lồng nhau. Tuy nhiên sử dụng mô hình này vẫn còn tiềm ẩn một số rủi ro mà chúng ta cần phải lưu ý đến, đó là công việc của chúng ta trong bài viết này:

## 1/ Quản lý vòng đời Subscription với Cancellable:

- `Apple` có `protocol` `Cancellable` giúp chúng ta công việc quản lý `subscription` sẽ tồn tại bao lâu cũng như khi nào nó được `active`(chúng ta thường làm việc thông qua `AnyCancellable`). Lý do mà hầu hết các `API` `subscription` của `Apple` đều `sink` và `return` một `AnyCancellable` khi được gọi đến là ngay khi `cancellable` được giải phóng `deallocated` (tự động hay thủ công) thì `subscription` của nó sẽ được tự động vô hiệu hóa.

- Lấy ví dụ như `Clock` giữ một `strong reference` đến một `instance` `AnyCancellable` và sẽ được gọi đến khi `sink` ở thời điểm `Timer` `publish` làm cho `subscription` được `active` chỉ cần `instance` `Clock` vẫn còn ở trong `memory`, trừ khi `cancellable` của nó đã được xóa bỏ thủ công.

```swift
class Clock: ObservableObject {
    @Published private(set) var time = Date().timeIntervalSince1970
    private var cancellable: AnyCancellable?

    func start() {
        cancellable = Timer.publish(
            every: 1,
            on: .main,
            in: .default
        )
        .autoconnect()
        .sink { date in
            self.time = date.timeIntervalSince1970
        }
    }

    func stop() {
        cancellable = nil
    }
}
```

- Cách triển khai trên có vẻ đã thực hiện tốt công việc quản lý `instance` `AnyCancellable` và `subscription` `Timer` nhưng thực sự thì nó còn tồn tại một lỗ hổng lớn về việc quản lý bộ nhớ `management memory`. Chúng ta đã giữ một `strong` `self` của `sink` `closure` do đó `cancellable` của chúng ta sẽ giữ cho `subscription` của nó tồn tại cho đến khi nó được giải phóng trong bộ nhớ. Chúng ta sẽ chấm dứt tình trạng `retain cycle` này ngắn gọn thôi.

## 2/ Tránh tình trạng sử dụng self gây memory leak:

- Ý tưởng đầu tiên chúng ta có thể nghĩ đến là sử dụng `assign` trong `Combine`. Chúng ta hoàn toàn có thể `assign` thằng đến `property` của `Clock` như sau:

```swift
class Clock: ObservableObject {
    ...

    func start() {
        cancellable = Timer.publish(
            every: 1,
            on: .main,
            in: .default
        )
        .autoconnect()
        .map(\.timeIntervalSince1970)
.assign(to: \.time, on: self)
    }

    ...
}
```

- Cách làm trên vẫn sẽ sử dụng `self` để giữ lại `object` vì `assign` vẫn sẽ giữ một `strong reference` đến từng `object` truyền đến. Dễ nhận thấy một cách làm quen thuộc đó là sử dụng `weak self` để giữ lại tham chiếu đến các `object` này, và ở đây là `instance` của `Clock` để tránh tình trạng `retain cycle`:

``` swift
class Clock: ObservableObject {
    ...

    func start() {
        cancellable = Timer.publish(
            every: 1,
            on: .main,
            in: .default
        )
        .autoconnect()
        .map(\.timeIntervalSince1970)
        .sink { [weak self] time in
    self?.time = time
}
    }

    ...
}
```

- Như vậy thì mỗi `instance` của `Clock` giờ có thể được `deallocated` mỗi khi nó không còn được tham chiếu đến bởi bất kì `object` nào , `AnyCancellable` cũng sẽ được `deallocated` và đó là cách mà mô hình `pipeline` trong `Combine` hoạt động.

## 3/ Assign trực tiếp value của output cho property của Published:

- Một cách làm khác chúng ta có thể làm để khắc phục việc `retain cycle` là việc kết nối thẳng với `published property`(trong iOS 14). Tuy nhiên khi sử dụng cách làm có vẻ tiện lợi này thì chúng ta sẽ không có cách nào để có thể `cancel` một `subscription` của `AnyCancellable`.

- Trong trường hợp `Clock` `type` dưới đây, chúng ta vẫn có thể sử dụng cách làm trên nếu chúng ta bỏ đi 2 `method` là `start` và `stop`. Chúng ta sẽ tự động hóa việc mỗi khi `clock` `start` thay vì phải `implement` `method`. Đây là những đánh đổi chúng ta phải chấp nhận khi đồng ý sử dụng phương thức này, sau đây sẽ là phần triển khai:

```swift
class Clock: ObservableObject {
    @Published private(set) var time = Date().timeIntervalSince1970

    init() {
        Timer.publish(
            every: 1,
            on: .main,
            in: .default
        )
        .autoconnect()
        .map(\.timeIntervalSince1970)
        .assign(to: &$time)
    }
}
```

- Điều tiện lợi ở đây là `Combine` sẽ tự động quản lý `subscription` cho chúng ta dựa trên vòng đời của `property` `time` nghĩa là chúng ta vẫn sẽ tránh được các `reference cycle` trong khi không phải tốn công viết code để xử lý.

## 4/ Sử dụng weak property:

- Chúng ta sẽ tìm hiểu một ví dụ phức tạp hơn với việc `implement` `ModelLoader` thực hiện công việc `decode` qua `Decodeable` từ `URL` bằng cách dùng `cancellable`. Các `loader` của chúng ta sẽ tự động `cancel` bất kì `data` đang `loading` trước đó khi một `trigger` mới được thực hiện cũng như bất kì `AnyCancellable` nào trước đó sẽ được `deallocated` khi `value` của `property` được thay thế:

```swift
class ModelLoader<Model: Decodable>: ObservableObject {
    enum State {
        case idle
        case loading
        case loaded(Model)
        case failed(Error)
    }

    @Published private(set) var state = State.idle

    private let url: URL
    private let session: URLSession
    private let decoder: JSONDecoder
    private var cancellable: AnyCancellable?

    ...

    func load() {
        state = .loading

        cancellable = session
            .dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .map(State.loaded)
            .catch { error in
                Just(.failed(error))
            }
            .receive(on: DispatchQueue.main)
            .sink { [weak self] state in
    self?.state = state
}
    }
}
```

- Nếu như chúng ta vẫn muốn tránh việc phải sử dụng thủ công `self` đễ giữ `reference` mỗi khi chúng ta sử dụng `pattern` trên thì chúng ta cần sử dụng thêm `extension` của `Publisher` như việc `add` thêm `weak` cho phương thức `assign` chúng ta đang sử dụng:

```swift
extension Publisher where Failure == Never {
    func weakAssign<T: AnyObject>(
        to keyPath: ReferenceWritableKeyPath<T, Output>,
        on object: T
    ) -> AnyCancellable {
        sink { [weak object] value in
            object?[keyPath: keyPath] = value
        }
    }
}
```

- Bây giờ thì chúng ta đã có `weakAssign` mỗi khi chúng ta `assign` các `output` của `publisher` cho `property` của `object` đang sử dụng `weak self` như sau:

```swift
class ModelLoader<Model: Decodable>: ObservableObject {
    ...

    func load() {
        state = .loading

        cancellable = session
            .dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .map(State.loaded)
            .catch { error in
                Just(.failed(error))
            }
            .receive(on: DispatchQueue.main)
            .weakAssign(to: \.state, on: self)
    }
}
```

## 5/ Sử dụng store object thay vì self:

- Trong trường hợp chúng ta muốn mở rộng `ModelLoader` bằng việc sử dụng `Database` để tự động việc `store` mỗi `model` được `load` bằng việc `wrap` các `model` này với `generic` là `Stored`. Để cho phép việc `access` vào `database` `instance` này với phương thức quen thuộc `flatMap` chúng ta một lần nữa sử dụng `weak reference` như sau:

```swift
class ModelLoader<Model: Decodable>: ObservableObject {
    enum State {
        case idle
        case loading
        case loaded(Stored<Model>)
        case failed(Error)
    }

    ...
    private let database: Database
    ...

    func load() {
        state = .loading

        cancellable = session
            .dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .flatMap {
    [weak self] model -> AnyPublisher<Stored<Model>, Error> in
    
    guard let database = self?.database else {
        return Empty(completeImmediately: true)
            .eraseToAnyPublisher()
    }
    
    return database.store(model)
}
            .map(State.loaded)
            .catch { error in
                Just(.failed(error))
            }
            .receive(on: DispatchQueue.main)
            .weakAssign(to: \.state, on: self)
    }
}
```

- Việc sử dụng các phương thức như `map` hay `flatMap` thì chúng ta đôi khi sẽ phải sử dụng `guard` để đảm bảo cho các `output` được hợp lệ. Việc chúng ta sử dụng `Empty` ở trên đông nghĩa chúng ta sẽ phải thêm kha khá code cho công việc này:

- Để cải thiện vấn đề này chúng ta sẽ lưu trực tiếp `database property` này trực tiếp thay vì sử dụng `self` như sau:

```swift
class ModelLoader<Model: Decodable>: ObservableObject {
    ...

    func load() {
        state = .loading

        cancellable = session
            .dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .flatMap { [database] model in
    database.store(model)
}
            .map(State.loaded)
            .catch { error in
                Just(.failed(error))
            }
            .receive(on: DispatchQueue.main)
            .weakAssign(to: \.state, on: self)
    }
}
```

- Có một điểm cộng nữa là chúng ta thậm chí có thể truyền trực tiếp `method` `Database` bằng việc sử dụng `flatMap` vì nó hoàn toàn phù hợp với bối cảnh này:

```swift
class ModelLoader<Model: Decodable>: ObservableObject {
    ...

    func load() {
        state = .loading

        cancellable = session
            .dataTaskPublisher(for: url)
            .map(\.data)
            .decode(type: Model.self, decoder: decoder)
            .flatMap(database.store)
            .map(State.loaded)
            .catch { error in
                Just(.failed(error))
            }
            .receive(on: DispatchQueue.main)
            .weakAssign(to: \.state, on: self)
    }
}
```