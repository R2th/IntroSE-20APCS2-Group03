- Mặc dù `Combine` đã tập trung vào `concept` các `publisher` sẽ `emit` ra các `sequence value` theo dòng thời gian cũng như đã cung cấp một số `API` thuận tiện và đầy đủ chức năng để người sử dụng không cần phải thiết lập tùy chỉnh cho các `publisher` từ đầu.

- Lấy ví dụ như khi chúng ta muốn `Combine` hỗ trợ chúng ta với các `API` có sẵn như `ImageProcessor` để xử lý theo `completion handle pattern` trong `closure` trong các hoạt động `asynchronously` khi tiến trình xử lý `image` hoàn tất hoặc thất bại:

```swift
struct ImageProcessor {
    func process(
        _ image: UIImage,
        then handler: @escaping (Result<UIImage, Error>) -> Void
    ) {
        // Process the image and call the handler when done
        ...
    }
}
```

- Thay vì việc viết lại `ImageProcessor` chúng ta có thể xử lý theo cách thức mới được giới thiệu trong `Combine`. Chúng ta không chỉ giữ được cách `implement` trên mà vẫn có thể sử dụng `Combine` để xử lý `completion handle` từng trường hợp ngay cả khi chúng ta thêm `code` mới:

## 1/ Future được giới thiệu:

- Chúng ta sẽ tập trung sử dụng `Future` `type` được biết đến trong `Future/Promise pattern`, 1 `pattern` rất phổ biến trong việc lập trình. `Combine` cung cấp cho chúng ta `closure` `promise` để chúng ta có thể nhận biết khi các `operation` `asynchronous` hoàn tất cũng như sẽ tự động `map` `Result` vào các event `Publisher`.

- Điều thực sự tiện lợi ở đây là trong trường hợp cụ thể bên trên với `completion handle closure` cũ sử dụng `Result` là `Input`, điều đó có nghĩa chúng ta có thể dụng `Future` với thiết lập đơn giản trong `func` `process` cũ như sau:


```swift
extension ImageProcessor {
    func process(_ image: UIImage) -> Future<UIImage, Error> {
        Future { promise in
            process(image, then: promise)
        }
    }
}
```

- Chúng ta chỉ đơn giản là sử dụng một `completion handle closure` chuyên dụng và tự chuyển kết quả thủ công vào `promise`:

```swift
extension ImageProcessor {
    func process(_ image: UIImage) -> Future<UIImage, Error> {
        Future { promise in
            process(image) { result in
    promise(result)
}
        }
    }
}
```

- Với `Future` chúng ta cần có một cách triển khai chặt chẽ các `closure API` cơ bản theo cách `reactive` trong `Combine` và `future` cũng chỉ đơn giản là `publisher`, tương đương với việc chúng ta có thể sử dụng cách sau:

```swift
processor.process(image)
    .replaceError(with: .errorIcon)
    .map { $0.withRenderingMode(.alwaysTemplate) }
    .receive(on: DispatchQueue.main)
    .assign(to: \.image, on: imageView)
    .store(in: &cancellables)
```

- Tuy nhiên thì `Future` trong `Combine` chỉ có thể `emit` một giá trị `result` duy nhất và sẽ lập tức hoàn thành và được giải phóng khi `promise` được gọi đến.

## 2/ Xử lý nhiều loại giá trị Output:

- Quay lại với `closure` `ImageProcessor`, nếu chúng ta sử dụng 2 `closure` ở đây, 1 cái theo dõi các `update` trong `progress` như `image` đang được `process` và 1 cái được gọi khi quá trình này kết thúc:

```swift
struct ImageProcessor {
    typealias CompletionRatio = Double
    typealias ProgressHandler = (CompletionRatio) -> Void
    typealias CompletionHandler = (Result<UIImage, Error>) -> Void

    func process(
        _ image: UIImage,
        onProgress: @escaping ProgressHandler,
        onComplete: @escaping CompletionHandler
    ) {
        // Process the image and call the progress handler to
        // report the operation's ongoing progress, and then
        // call the completion handler once the image has finished
        // processing, or if an error was encountered.
        ...
    }
}
```

- Trước hết chúng ta cần thêm vào `ProgressEvent` `enum` để chỉ định `type` cho `Output` khi `Publisher` được chúng ta khởi tạo:

```swift
extension ImageProcessor {
    enum ProgressEvent {
        case updated(completionRatio: CompletionRatio)
        case completed(UIImage)
    }
}
```

- Mong muốn ban đầu là làm sao để `update` các `Combine API` bằng việc sử dụng `Future` nhưng nay chúng ta sẽ sử dụng `promise` `closure` nhiều lần để thông báo các `update` trong các `completed events`:

```swift
extension ImageProcessor {
    func process(_ image: UIImage) -> Future<ProgressEvent, Error> {
        Future { promise in
            process(image,
                onProgress: { ratio in
                    promise(.success(
    .updated(completionRatio: ratio)
))
                },
                onComplete: { result in
                    promise(result.map(ProgressEvent.completed))
                }
            )
        }
    }
}
```

- Tuy nhiên cách triển khai trên vẫn chưa hoạt động đúng như mong muốn vì chúng ta chỉ nhận được mỗi kết quả đầu tiên được `update` trước khi tiến trình trên hoàn thành.

## 3/ Sử dụng Subject để gửi value:

- Chúng ta có thể gửi nhiều `value` như chúng ta đã làm bên trên bằng cách sử dụng 2 `subject` chính được giới thiệu trong `Combine` `PassthroughSubject` hoặc `CurrentValueSubject`. Chúng ta sẽ sử dụng `PassthroughSubject` để có thể truyền `value` cho từng `subscriber` mà không giữ lại `value` nào.

- Chúng ta có thể sử dụng `subject` để `update` `ImageProcessing` có thể hoạt động tốt cho cả việc theo dõi `progress` cũng như `completed event`.

```swift
extension ImageProcessor {
    func process(_ image: UIImage) -> AnyPublisher<ProgressEvent, Error> {
        // First, we create our subject:
        let subject = PassthroughSubject<ProgressEvent, Error>()

        // Then, we call our closure-based API, and whenever it
        // sends us a new event, then we'll pass that along to
        // our subject. Finally, when our operation was finished,
        // then we'll send a competion event to our subject:
        process(image,
            onProgress: { ratio in
                subject.send(.updated(completionRatio: ratio))
            },
            onComplete: { result in
                switch result {
                case .success(let image):
                    subject.send(.completed(image))
                    subject.send(completion: .finished)
                case .failure(let error):
                    subject.send(completion: .failure(error))
                }
            }
        )
        
        // To avoid returning a mutable object, we convert our
        // subject into a type-erased publisher before returning it:
        return subject.eraseToAnyPublisher()
    }
}
```

- Công việc còn lại của chúng ta phải `update` việc sử dụng `func` trên trước khi `ProgressEvent` được xử lý thay vì dùng `instance` `UIImage` như sau:

```swift
processor.process(image)
    .replaceError(with: .completed(.errorIcon))
    .receive(on: DispatchQueue.main)
    .sink { event in
        switch event {
        case .updated(let completionRatio):
            progressView.completionRatio = completionRatio
        case .completed(let image):
            imageView.image = image.withRenderingMode(
                .alwaysTemplate
            )
        }
    }
    .store(in: &cancellables)
```

- Hãy lưu ý khi sử dụng `PassthroughSubject` là mỗi `subscriber` sẽ chỉ nhận `value` khi `subscription` đã được `active`

- Việc chuyển đổi giữa các `subject` thực sự rất đơn giản khi chúng ta dùng `CurrentValueSubject` với các `value` hiện tại mà chúng ta cần theo dõi:

```swift
extension ImageProcessor {
    func process(_ image: UIImage) -> AnyPublisher<ProgressEvent, Error> {
        let subject = CurrentValueSubject<ProgressEvent, Error>(
    .updated(completionRatio: 0)
)

        ...

        return subject.eraseToAnyPublisher()
    }
}
```