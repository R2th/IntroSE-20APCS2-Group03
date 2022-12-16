- Được cho là một trong những đặc điểm mạnh mẽ và được sử dụng nhiều nhất của `Swift` cho chúng ta mở rộng và phát triển các `protocol` cũng như `function` mới. Chúng ta không chỉ điều chỉnh ngôn ngữ và các `library` cho phù hợp với các dự án khác nhau mà chúng ta còn có cơ hội để viết các extension có thể được sử dụng lại qua nhiều trường hợp và dự án sử dụng.
- Ở bài viết này chúng ta hãy cùng nghiên cứu về vấn đề này cũng như các nguyên tác để có thể ghi nhớ khái quát về `extension` để có thể sử dụng trong nhiều bối cảnh khác nhau.

## 1/ Generalizing through abstractions:
- Lấy ví dụ chúng ta sẽ cùng nghiên cứu trường hợp cần cải thiện performance, chúng ta viết các `function` cho phép chúng ta dễ dàng lưu trữ bài viết trên ổ cứng:

```swift
extension Article {
    func cacheOnDisk() throws {
        let folderURLs = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )

        let fileName = "Article-\(id).cache"
        let fileURL = folderURLs[0].appendingPathComponent(fileName)
        let data = try JSONEncoder().encode(self)
        try data.write(to: fileURL)
    }
}
```

- Việc mở rộng `type` cụ thể với `extension` trên có thể là cách tốt để giảm việc trùng lặp code vừa giúp thực hiện các tác vụ bình thường trên source code dễ dàng hơn. Tuy nhiên, một phần `extension` đôi khi cũng làm cho code trở nên ít linh hoạt và bị tách rời nhiều hơn. Trong trường hợp này khả năng cao chúng ta sẽ không chỉ lưu giữ `Article` mà còn lưu các `model` khác nữa. 

 - Chúng ta cùng nghiên cứu để cải thiện `extension` có thể tái sử dụng:
   + `Encode` từng value trong `JSON`, chúng ta cần bất kỳ `type` có thể sử dụng tuân thủ library `Encodable` `protocol`.
   + Chúng ta cũng cần tương thích `id` với các `type` cùng loại sao cho tính toán được tên tệp duy nhất.

- Để thực hiện hai yêu cầu trên chúng ta sử dụng `Encodable` và add một `generic type constraint` để chỉ định cache method của chúng ta có thể được gọi trên `Identifiable`, cung cấp cho chúng ta thuộc tính `id` chúng ta cần:

```swift
extension Encodable where Self: Identifiable {
    // We also take this opportunity to parameterize our JSON
    // encoder, to enable the users of our new API to pass in
    // a custom encoder, and to make our method's dependencies
    // more clear:
    func cacheOnDisk(using encoder: JSONEncoder = .init()) throws {
        let folderURLs = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )

        // Rather than hard-coding a specific type's name here,
        // we instead dynamically resolve a description of the
        // type that our method is currently being called on:
        let typeName = String(describing: Self.self)
        let fileName = "\(typeName)-\(id).cache"
        let fileURL = folderURLs[0].appendingPathComponent(fileName)
        let data = try encoder.encode(self)
        try data.write(to: fileURL)
    }
}
```

## 2/ Xác định đúng protocol:

- Chúng ta viết lại `extension` `Article`, lần này chúng ta dùng `Result` type để cho phép `result instance` có thể mang một array `Article` để có thể `combined` với một `instance` cùng loại:

```swift
extension Result where Success == [Article] {
    func combine(with other: Self) throws -> Self {
        try .success(get() + other.get())
    }
}
```

- Như `caching method` bên trên, không có yêu cầu nào từ đoạn code trên yêu cầu biết về `Article`. Trong trường hợp này, chúng ta cần `combine` 2 collection value thành một với `RangeReplaceableCollection`.

```swift
extension Result where Success: RangeReplaceableCollection {
    func combine(with other: Self) throws -> Self {
        try .success(get() + other.get())
    }
}
```

## 3/ Tránh conflic và type polutiton:

- Trong trường hợp chúng ta xây dựng một nơi lưu trữ cho các framework, cho phép các dự án khác nhau có thể lưu và tài các value bằng cách sử dụng `Container`. Chúng ta định nghĩa `DataConvertible` protocol để có thể tạo một vài system type như sau:

```swift
public protocol DataConvertible {
    var data: Data { get }
}

extension Data: DataConvertible {
    public var data: Data { self }
}

extension String: DataConvertible {
    public var data: Data { Data(utf8) }
}

extension UIImage: DataConvertible {
    public var data: Data { pngData()! }
}

public struct Container {
    public func write(_ value: DataConvertible) throws {
        let data = value.data
        ...
    }
}
```

-  Cách xử lý trên có thể hoạt động tốt với một dự án độc lập, nhưng nếu chúng ta định chia sẻ chức năng này cho nhiều dự án thì có lẽ các xủ lý này trở nên rắc rối, rườm rà.

- Vì chúng ta đã định nghĩa các `property` yêu cầu như `data` nên có thể nhiều khi nó sẽ trùng lặp với các định nghĩa khác. Điều đó cũng đúng với protocol có nhưng cái tên chung chung như `DataConvertible`. Trong khi tên của module có thể sử dụng `ModuleName.TypeName`, tên thuộc tính thì không thể sử dụng cách này.

- Có một giải pháp tốt cho vấn đề loại này là loại bỏ `protocol` và thay vào đó là thêm vào `type-specific` cho `Container`:

```swift
public struct Container {
    public func write(_ data: Data) throws {
        ...
    }

    public func write(_ string: String) throws {
        try write(Data(string.utf8))
    }

    public func write(_ image: UIImage) throws {
        guard let data = image.pngData() else {
            throw Error.failedToConvertImageToPNGData
        }

        try write(data)
    }
}
```

- Các tiếp cận trên hoạt động tốt với nhiều loại `type`- điều mà chúng ta mong muốn. Khó khăn xảy ra khi chúng ta muốn thêm nhiều tuỳ chọn cấu hình và tham số vào `API container`.
- Lấy ví dụ chúng ta muốn được cấp phép cho các `API` của `user` để chỉ định mức độ bền vững sử dụng khi sử dụng `value` nào đó.

```swift
public struct Container {
    public func write(_ data: Data,
                      persistence: Persistence = .permanent,
                      tags: [Tag] = []) throws {
        ...
    }

    public func write(_ string: String,
                      persistence: Persistence = .permanent,
                      tags: [Tag] = []) throws {
        let data = Data(string.utf8)

        try write(data,
            persistence: persistence,
            tags: tags
        )
    }

    public func write(_ image: UIImage,
                      persistence: Persistence = .permanent,
                      tags: [Tag] = []) throws {
        guard let data = image.pngData() else {
            throw Error.failedToConvertImageToPNGData
        }

        try write(data,
            persistence: persistence,
            tags: tags
        )
    }
}
```

- Vấn đề của chúng ta trước đây là `protocol` của chúng ta dễ gây ra xung đột với quy tắc đặt tên, để xử lý vấn đề này chúng ta sử dụng quy ước đặt tên dài dòng hơn một chút. Chúng ta hãy cũng thực hiện một chức năng cho `protocol` có thể tránh việc thay đổi khi chuyển đổi các `UIImage` thành `Data`:

```swift
public protocol ContainerDataConvertible {
    func asContainerData() throws -> Data
}

extension Data: ContainerDataConvertible {
    public func asContainerData() -> Data {
        self
    }
}

extension String: ContainerDataConvertible {
    public func asContainerData() -> Data {
        Data(utf8)
    }
}

extension UIImage: ContainerDataConvertible {
    public func asContainerData() throws -> Data {
        guard let data = pngData() else {
            throw Container.Error.failedToConvertImageToPNGData
        }

        return data
    }
}
```

- Với thay đổi trên `extension` của chúng ta sẽ tránh được việc gây lỗi khi được tái sử dụng trong các project khác nhau. Chúng ta cùng quay lại vấn đề `Container` có method `write` có thể handle bất kỳ `ContainerDataConvertible`:

```swift
public struct Container {
    public func write(
        _ value: ContainerDataConvertible,
        persistence: Persistence = .permanent,
        tags: [Tag] = []
    ) throws {
        let data = try value.asContainerData()
        ...
    }
}
```

- Vẫn có vấn đề cầ giải quyết, chúng ta cần định nghĩa thêm các `protocol` các `static` function để triển khai nó dễ hơn thay vì cứ thêm vào tất cả `instance`:

```swift
public protocol ContainerDataConvertible {
    static func makeContainerData(for value: Self) throws -> Data
}

extension Data: ContainerDataConvertible {
    public static func makeContainerData(for value: Data) -> Data {
        value
    }
}

extension String: ContainerDataConvertible {
    public static func makeContainerData(for value: String) -> Data {
        Data(value.utf8)
    }
}

extension UIImage: ContainerDataConvertible {
    public static func makeContainerData(for value: UIImage) throws -> Data {
        guard let data = value.pngData() else {
            throw Container.Error.failedToConvertImageToPNGData
        }

        return data
    }
}
```

- Đoạn code trên cho phép chúng ta thay đổi mỗi `write` function mà không cần thêm vào bất kì instance phức tạp nào, bây giờ chúng ta chỉ đơn giản gọi `makeContainerData` trực tiếp trên mỗi `value`:

```swift
public struct Container {
    public func write<T: ContainerDataConvertible>(
        _ value: T,
        persistence: Persistence = .permanent,
        tags: [Tag] = []
    ) throws {
        let data = try T.makeContainerData(for: value)
        ...
    }
}
```