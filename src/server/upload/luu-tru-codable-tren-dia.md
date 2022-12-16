Hầu hết các ứng dụng của chúng ta sử dụng REST client. Trong quá trình phát triển loại ứng dụng này, chúng ta có thể sẽ muốn giữ cho nó hoạt động ngay cả khi ứng dụng ở trong trạng thái offline. Trong trường hợp này, chúng ta phải lưu trữ dữ liệu cục bộ trên thiết bị để có thể đọc được mà không cần tới kết nối internet.

Apple cung cấp CoreData framework, đây là cách tốt nhất để lưu trữ dữ liệu ứng dụng của bạn cục bộ. Nó có rất nhiều tính năng tốt giúp bạn phát triển nhanh ứng dụng. Tuy nhiên, thật khó để sử dụng nó như một bộ đệm đơn giản. Hầu hết thời gian, chúng ta chỉ cần hiển thị dữ liệu được lưu trong bộ nhớ cache mà không cần bất kỳ thao tác bổ sung nào. Theo mình, tất cả những gì chúng ta cần là lưu trữ trên đĩa thuần túy. Trong bài này chúng ta sẽ thảo luận về cách mà ta có thể dễ dàng thực hiện lưu trữ trên đĩa đơn giản cho các cấu trúc Codable.

Hãy bắt đầu với việc xác định một vài giao thức cho logic lưu trữ của chúng ta. Mình muốn tách riêng quyền truy cập vào các phần có thể ghi và có thể đọc được của bộ lưu trữ và đây là nơi chúng ta có thể sử dụng tính năng cấu thành giao thức của ngôn ngữ Swift.

```
import Foundation

typealias Handler<T> = (Result<T, Error>) -> Void

protocol ReadableStorage {
    func fetchValue(for key: String) throws -> Data
    func fetchValue(for key: String, handler: @escaping Handler<Data>)
}

protocol WritableStorage {
    func save(value: Data, for key: String) throws
    func save(value: Data, for key: String, handler: @escaping Handler<Data>)
}

typealias Storage = ReadableStorage & WritableStorage
```

Ở đây chúng ta có hai protocol mô tả các hoạt động đọc và viết trên *storage*. Các giao thức cũng cung cấp một phiên bản không đồng bộ để đọc và viết các hành động với *completion handlers*. Chúng ta cũng tạo ra *typealias Storage*, một thành phần của hai protocol. Bây giờ chúng ta có thể bắt đầu làm việc trên lớp *DiskStorage*.

```
enum StorageError: Error {
    case notFound
    case cantWrite(Error)
}

class DiskStorage {
    private let queue: DispatchQueue
    private let fileManager: FileManager
    private let path: URL

    init(
        path: URL,
        queue: DispatchQueue = .init(label: "DiskCache.Queue"),
        fileManager: FileManager = FileManager.default
    ) {
        self.path = path
        self.queue = queue
        self.fileManager = fileManager
    }
}
```

Trước hết, hãy để mô tả một số biến cho storage, DispatchQueue cho công việc không đồng bộ và FileManager, mà chúng ta sẽ sử dụng để điều hướng qua file system.

```
extension DiskStorage: WritableStorage {
    func save(value: Data, for key: String) throws {
        let url = path.appendingPathComponent(key)
        do {
            try self.createFolders(in: url)
            try value.write(to: url, options: .atomic)
        } catch {
            throw StorageError.cantWrite(error)
        }
    }

    func save(value: Data, for key: String, handler: @escaping Handler<Data>) {
        queue.async {
            do {
                try self.save(value: value, for: key)
                handler(.success(value))
            } catch {
                handler(.failure(error))
            }
        }
    }
}

extension DiskStorage {
    private func createFolders(in url: URL) throws {
        let folderUrl = url.deletingLastPathComponent()
        if !fileManager.fileExists(atPath: folderUrl.path) {
            try fileManager.createDirectory(
                at: folderUrl,
                withIntermediateDirectories: true,
                attributes: nil
            )
        }
    }
}
```

Bước tiếp theo là implement phần ghi trong bộ lưu trữ của chúng ta. Có một chút khó khăn vì key là một đường dẫn đến dữ liệu của chúng ta trên file system. Đó là lý do tại sao chúng ta cần nối thêm key vào đường dẫn gốc của mình và tạo URL mới để lưu trữ dữ liệu. URL mới có thể chứa các thư mục con, đó là lý do tại sao chúng ta tạo hàm createdFolders để tạo các thư mục cần thiết theo đường dẫn.

```
extension DiskStorage: ReadableStorage {
    func fetchValue(for key: String) throws -> Data {
        let url = path.appendingPathComponent(key)
        guard let data = fileManager.contents(atPath: url.path) else {
            throw StorageError.notFound
        }
        return data
    }

    func fetchValue(for key: String, handler: @escaping Handler<Data>) {
        queue.async {
            handler(Result { try self.fetchValue(for: key) })
        }
    }
}
```

Tiếp theo là tới phần giao thức đọc, nơi chúng ta triển khai tìm nạp dữ liệu cho một key đã qua. Một lần nữa, chúng ta sử dụng key làm đường dẫn đến dữ liệu trên đĩa. Bước tiếp theo là implement một adapter cho class DiskStorage, class này sẽ xử lý mã hóa / giải mã JSON.

```
class CodableStorage {
    private let storage: DiskStorage
    private let decoder: JSONDecoder
    private let encoder: JSONEncoder

    init(
        storage: DiskStorage,
        decoder: JSONDecoder = .init(),
        encoder: JSONEncoder = .init()
    ) {
        self.storage = storage
        self.decoder = decoder
        self.encoder = encoder
    }

    func fetch<T: Decodable>(for key: String) throws -> T {
        let data = try storage.fetchValue(for: key)
        return try decoder.decode(T.self, from: data)
    }

    func save<T: Encodable>(_ value: T, for key: String) throws {
        let data = try encoder.encode(value)
        try storage.save(value: data, for: key)
    }
}
```

Class CodableStorage wrap lớp DiskStorage của chúng ta để thêm phần logic giải mã và mã hóa JSON. Nó sử dụng các ràng buộc chung để hiểu cách giải mã và mã hóa dữ liệu. Đã đến lúc sử dụng CodableStorage của chúng ta trong ví dụ thực tế.

```
struct Timeline: Codable {
    let tweets: [String]
}

let path = URL(fileURLWithPath: NSTemporaryDirectory())
let disk = DiskStorage(path: path)
let storage = CodableStorage(storage: disk)

let timeline = Timeline(tweets: ["Hello", "World", "!!!"])
try storage.save(timeline, for: "timeline")
let cached: Timeline = try storage.fetch(for: "timeline")
```

Trong đoạn code ở trên, bạn có thể thấy việc sử dụng class CodableStorage. Chúng ta tạo đối tượng DiskCache sử dụng một thư mục tạm thời để lưu trữ dữ liệu. Timeline là một cấu trúc mã hóa đơn giản đại diện cho một chuỗi các chuỗi mà chúng ta lưu trữ trong CodableStorage.

### Kết luận
Hôm nay chúng ta đã thảo luận cách đơn giản để lưu trữ các cấu trúc Codable mà chúng ta có thể lấy được qua REST API. Đôi khi, chúng ta không cần các tính năng phức tạp của CoreData cho bộ đệm JSON đơn giản  và chỉ cần lưu trữ trên đĩa là đủ.

Tham khảo: https://mecid.github.io/2019/05/22/storing-codable-structs-on-the-disk/?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter