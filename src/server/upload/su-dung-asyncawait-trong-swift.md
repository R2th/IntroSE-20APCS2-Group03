- Cơ chế mới xử lý mới `async/await` đã được giới thiệu ở `Swift 5.5` tại WWDC 2021 tho thấy sự tập trung và ưu tiên trong việc phát triển cơ chế `concurency` của `Apple`. Mặc dù sẽ mất nhiều thời gian nữa đê `async/await` có thể trở nên phổ biến và dùng nhiều trong công việc phát triển app nhưng rõ ràng ta đã thấy sự thu hẹp đáng kể về khoảng cách cũng như thân thiện hơn với các `developer` trong việc xử lý `concurency`.

## 1/  Thế nào là `async/await` ?

- Chúng ta sẽ mất khá nhiều thời gian nếu đi chi tiết trong việc định nghĩa `async/await` nhưng để ngắn gọn thì chúng ta có thể hiểu là nó cho phép chúng ta đánh dấu `function` bất đồng bộ trong `code` với từ khóa `async` và yêu cầ chúng ta từ khóa `await` để gọi các `function` đó. Hệ thống sẽ tự động tổ chức cho chúng ta công việc như đợi chờ thực hiện công việc gì đó khi các `function` này hoàn thành mà không cần nhét vào trong `block` để xử lý như trước.

- Lấy ví dụ như ở `struct` `DocumentLoader` có `func` được đánh dấu `async`, `func` này sử dụng `API` `URLSession` để tiến hành xử lý công việc `call network` bất đồng bộ với từ khóa `await` để `download` `data` từ `URL` được cho:

```swift
struct DocumentLoader {
    var urlSession = URLSession.shared
    var decoder = JSONDecoder()

    func loadDocument(withID id: Document.ID) async throws -> Document {
        let url = urlForForLoadingDocument(withID: id)
        let (data, _) = try await urlSession.data(from: url)
        return try decoder.decode(Document.self, from: data)
    }

    ...
}
```

- Với từ khóa `async` đặt trong các `function` thì khi gọi các `funtion` bất đồng bộ khác thì ta cần thêm từ khóa `await` để các tiến trình xử lý trong `function` đó được xếp thứ tự hoàn thành theo thứ các `await` được triển khai mà không cần sợ có các `block` được xử lý ở thời điểm mà chúng ta không xác định rõ.

## 2/ Gọi `async function` từ các `synchorous context`:

- Một câu hỏi được đặt ra là làm sao để chúng ta có thể gọi `function` được đánh dấu `async` từ các `context` mà bản thân nó hoạt không hoạt động bất đồng bộ. Nếu chúng ta muốn sử dụng `DocumentLoader` bên trên với `UIKit` thì chúng ta cần đưa `function` `loadDocument` vào trong một `Task` như sau để tiến hành xử lý bất đồng bộ:

```swift
class DocumentViewController: UIViewController {
    private let documentID: Document.ID
    private let loader: DocumentLoader
    
    ...

    private func loadDocument() {
        Task {
            do {
                let document = try await loader.loadDocument(withID: documentID)
                display(document)
            } catch {
                display(error)
            }
        }
    }

    private func display(_ document: Document) {
        ...
    }

    private func display(_ error: Error) {
        ...
    }
}
```

- Chúng ta đã sử dụng cơ chế mặc định `do / try / catch` trong cơ chế `error handling` để tiến hành xử lý các công việc bất đồng bộ nhưng chúng ta không cần quan tâm đến nhưng thứ như `weak self` để tránh việc `retain cycle`. Thậm chí chúng ta không cần phải tự xử lý tiến hành cập nhật `UI` ở trên `main queue`.

## 3/ Cài tiến `API` bất đồng bộ sẵn có với `async/await`:

- Chúng ta sẽ cùng tìm hiểu một cách thức khác để cải tiến cơ chế xử lý hoạt động bất đồng bộ bằng cách thêm vào `async/await` pattern. Chúng ta sẽ cùng triển khai một `CommentLoader` để load các `comment` với việc sử dụng `complietion handler`:

```swift
struct CommentLoader {
    ...

    func loadCommentsForDocument(
        withID id: Document.ID,
        then handler: @escaping (Result<[Comment], Error>) -> Void
    ) {
        ...
    }
}
```

- Nhìn như có vẻ chúng ta sẽ cần thêm `async/await` nhưng trong trường hợp này thì không nhé. Chúng ta sẽ tiến hành xử lý trong `extention` của `CommentLoader` với `function` `loadCommentsForDocument` sử dụng `function` mới `withCheckedThrowingContinuation` để có thể `wrap` và gọi `function` sẵn có với từ khóa `async` như sau:

```swift
extension CommentLoader {
    func loadCommentsForDocument(
        withID id: Document.ID
    ) async throws -> [Comment] {
        try await withCheckedThrowingContinuation { continuation in
            loadCommentsForDocument(withID: id) { result in
                switch result {
                case .success(let comments):
                    continuation.resume(returning: comments)
                case .failure(let error):
                    continuation.resume(throwing: error)
                }
            }
        }
    }
}	
```

- Với cách triển khai trên giờ chúng ta có thể dễ dàng gọi `method` `loadCommentsForDocument` sử dụng từ khóa `await` như khi gọi các `API` bất đồng bộ khác. Và sau đây là cách chúng ta `update` `DocumentLoader` một cách tự động với các `comment` được `fetch` về mỗi khi `document` được load:

```swift
struct DocumentLoader {
    var commentLoader: CommentLoader
    var urlSession = URLSession.shared
    var decoder = JSONDecoder()

    func loadDocument(withID id: Document.ID) async throws -> Document {
        let url = urlForForLoadingDocument(withID: id)
        let (data, _) = try await urlSession.data(from: url)
        var document = try decoder.decode(Document.self, from: data)
        document.comments = try await commentLoader.loadCommentsForDocument(
    withID: id
)
        return document
    }
}
```

## 4/ Sử dụng single output của Publisher trong Combine:

- Chúng ta cùng xem xét khả năng xử lý `async/await` mạnh mẽ của `Combine`. Với cơ chế gửi đi `value` trong `stream` thì tất cả công việc chúng ta là đợi chờ một `result` được trả về từ luồng xử lý của `Combine`. Tiếp tục sử dụng `technique` chúng ta đã triển khai trước  đó với việv mở rộng `protocol` Publisher với `method` `singleResult` sẽ trả về chúng ta giá trị đầu tiên và duy nhất được `emit` bởi Publisher. Chúng ta vẫn sẽ sử dụng `closure` để xử lý cơ chế `retain` giải phóng `instance` `AnyCancellable` khi mà các công việc xử lý dữ liệu đã xong.

```swift
extension Publishers {
    struct MissingOutputError: Error {}
}

extension Publisher {
    func singleResult() async throws -> Output {
        var cancellable: AnyCancellable?
        var didReceiveValue = false

        return try await withCheckedThrowingContinuation { continuation in
            cancellable = sink(
                receiveCompletion: { completion in
                    switch completion {
                    case .failure(let error):
                        continuation.resume(throwing: error)
                    case .finished:
                        if !didReceiveValue {
                            continuation.resume(
                                throwing: Publishers.MissingOutputError()
                            )
                        }
                    }
                },
                receiveValue: { value in
                    guard !didReceiveValue else { return }

                    didReceiveValue = true
                    cancellable?.cancel()
                    continuation.resume(returning: value)
                }
            )
        }
    }
}
```

- Đến đây thì chúng ta sẽ dễ nhận ra sự tiện lợi và hiệu quả của việc xử dụng `API` `Combine` để xử lý cơ chế `async/await` như thế nào so với việc sử dụng `closure` như cách làm phổ thông:

```swift
struct CommentLoader {
    ...

    func loadCommentsForDocument(
        withID id: Document.ID
    ) -> AnyPublisher<[Comment], Error> {
        ...    
    }
}

...

let comments = try await loader
    .loadCommentsForDocument(withID: documentID)
    .singleResult()
```