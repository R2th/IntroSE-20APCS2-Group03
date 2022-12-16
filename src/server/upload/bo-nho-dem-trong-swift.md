# Bộ nhớ đệm trong swift
Việc làm tăng performance luôn là một vấn đề trong lập trình ứng dụng di động. Việc làm tăng performance giúp cho ứng dụng nhanh hơn và tránh những lỗi tiềm tàng có thể gặp phải. Có rất nhiều bài viết về vấn đề này như điều chỉnh giao diện người dùng để tăng cảm giác hay cải thiện tốc độ thực thi tuyệt đối của các hoạt động hay thuật toán của nó. Về bản chất của vấn đề này đều hướng tới việc quản lý dữ liệu đơn giản hơn. Một hướng rất phổ biến hay được sử dụng để quản lí đó là sử dụng bộ nhớ đệm - Cache. Nay chúng ta sẽ đi tìm hiểu và viết ra nó.

## Cache - Một thành phần của hệ thống.

Cache là một trọng những yêu cầu ban đầu có vẻ đơn giản hơn nhiều so với thực tế bởi Cache phải lưu trữ các giá trị một cách hiệu quả và cần xem khi nào nên bỏ nó ra khi quá hạn sử dụng để luôn giữ cho bộ nhớ nhẹ hơn để việc thực thi được tốt. Tại sao chúng tôi nói nó đơn giản hơn nhiều so với thực tế bởi vì Apple đã cung cấp một lớp NSCache giúp giải quyết vấn đề đó. Việc của chúng t là gọi nó ra và sử dụng. Tuy nhiên NSCache là một lớp Objective-C trên các nền tảng riêng của Apple, nó có nghĩa là nó chỉ có thể lưu trữ các thể hiện của lớp và chỉ tương thích với các khoá dựa trên NSObject.

```Swift
// To be able to use strings as caching keys, we have to use
// NSString here, since NSCache is only compatible with keys
// that are subclasses of NSObject:
let cache = NSCache<NSString, MyClass>()
```

Bằng cách viết trình bao bọc quanh NSCache chúng ta có thể tạo ra API bộ nhớ cache cho Swift một cách linh hoạt.

## Khai báo và triển khai
Đầu tiên chúng ta khai báo lớp Cache và làm cho nó có thể đáp ứng với mọi loại `Hashable` key và mọi loại `Value`.
sau đó cung cấp cho nó một thuộc tính NSCache, sẽ lưu trữ các thể hiện Entry được khóa bằng loại WrappingKey như sau

```Swift
final class Cache<Key: Hashable, Value> {
    private let wrapped = NSCache<WrappedKey, Entry>()
}
```

vì nó là Hashable nên cần khai báo các phương thức hash và isEquali để xác định các giá trị và key thêm vào có trùng nhau hay không.
```Swift
private extension Cache {
    final class WrappedKey: NSObject {
        let key: Key

        init(_ key: Key) { self.key = key }

        override var hash: Int { return key.hashValue }

        override func isEqual(_ object: Any?) -> Bool {
            guard let value = object as? WrappedKey else {
                return false
            }

            return value.key == key
        }
    }
}
```

Chúng ta làm cho nó lưu trữ một thể hiện gía trị

```Swift
private extension Cache {
    final class Entry {
        let value: Value

        init(value: Value) {
            self.value = value
        }
    }
}
```

tiến hành thêm các hàm thêm sửa xoá giá trị cơ bản cho `Cache` của chúng ta

```Swift
final class Cache<Key: Hashable, Value> {
    private let wrapped = NSCache<WrappedKey, Entry>()

    func insert(_ value: Value, forKey key: Key) {
        let entry = Entry(value: value)
        wrapped.setObject(entry, forKey: WrappedKey(key))
    }

    func value(forKey key: Key) -> Value? {
        let entry = wrapped.object(forKey: WrappedKey(key))
        return entry?.value
    }

    func removeValue(forKey key: Key) {
        wrapped.removeObject(forKey: WrappedKey(key))
    }
}
```

Thêm phương thức truy suất giá trị `Subscripting`

```Swift
extension Cache {
    subscript(key: Key) -> Value? {
        get { return value(forKey: key) }
        set {
            guard let value = newValue else {
                // If nil was assigned using our subscript,
                // then we remove any value for that key:
                removeValue(forKey: key)
                return
            }

            insert(value, forKey: key)
        }
    }
}
```

## Tránh truy xuất giá trị cũ
Để giảm thiểu vấn đề đó là giới hạn thời gian tồn tại của các mục trong bộ đệm bằng cách xóa chúng sau một khoảng thời gian nhất định. Để làm điều đó, chúng ta sẽ xử lí bằng cách thêm một thuộc expirationDate vào class Entry, để có thể theo dõi thời gian còn lại cho mỗi mục:

```Swift
final class Entry {
    let value: Value
    let expirationDate: Date

    init(value: Value, expirationDate: Date) {
        self.value = value
        self.expirationDate = expirationDate
    }
}
```

tuy nhiên để xử lí vấn đề xem 1 giá trị truyền vào có còn hiệu lực hay không chúng ta sẽ thêm trường entryLifetime vào hàm khởi tạo để kiểm tra.

```Swift
final class Cache<Key: Hashable, Value> {
    private let wrapped = NSCache<WrappedKey, Entry>()
    private let dateProvider: () -> Date
    private let entryLifetime: TimeInterval

    init(dateProvider: @escaping () -> Date = Date.init,
         entryLifetime: TimeInterval = 12 * 60 * 60) {
        self.dateProvider = dateProvider
        self.entryLifetime = entryLifetime
    }
    
    ...
}
```

và tiến hành cập nhật lại các phương thức truy xuất dữ liệu

```Swift
func insert(_ value: Value, forKey key: Key) {
    let date = dateProvider().addingTimeInterval(entryLifetime)
    let entry = Entry(value: value, expirationDate: date)
    wrapped.setObject(entry, forKey: WrappedKey(key))
}

func value(forKey key: Key) -> Value? {
    guard let entry = wrapped.object(forKey: WrappedKey(key)) else {
        return nil
    }

    guard dateProvider() < entry.expirationDate else {
        // Discard values that have expired
        removeValue(forKey: key)
        return nil
    }

    return entry.value
}
```

## Bộ nhớ đệm liên tục

Bộ nhớ đệm thường sau khi ứng dụng tắt đi sẽ bị xoá liền lập tức nhưng sẽ có nhiều trường hợp giá trị sẽ được ghi trên đĩa để lưu sử dụng sau này. 
Chính vì thế chúng ta sẽ custom lại và truyền như một tham số để có thể cache các gí trị trên đĩa hay không một cách tự do. chúng ta sẽ cập nhật Entry để lưu trữ cái Key mà nó được liên kết, để cả hai có thể duy trì trực tiếp từng mục và để có thể xóa các khóa không sử dụng:
```Swift
final class Entry {
    let key: Key
    let value: Value
    let expirationDate: Date

    init(key: Key, value: Value, expirationDate: Date) {
        self.key = key
        self.value = value
        self.expirationDate = expirationDate
    }
}
```

Tiếp theo, chúng ta sẽ cần một cách để theo dõi những khóa mà bộ đệm của chứa các mục nhập, vì NSCache không tiết lộ thông tin đó. Vì vậy, chúng ta sẽ thêm một loại KeyTracker, sẽ trở thành đại biểu của cơ sở của NSCache, để được thông báo mỗi khi mục nhập bị xóa:

```Swift
private extension Cache {
    final class KeyTracker: NSObject, NSCacheDelegate {
        var keys = Set<Key>()

        func cache(_ cache: NSCache<AnyObject, AnyObject>,
                   willEvictObject object: Any) {
            guard let entry = object as? Entry else {
                return
            }

            keys.remove(entry.key)
        }
    }
}
```
Chúng ta sẽ thiết lập KeyTracker trong khi khởi tạo Cache và chúng ta cũng sẽ đặt số lượng mục nhập tối đa, điều này sẽ giúp chúng ta tránh ghi quá nhiều dữ liệu vào đĩa:
```Swift
final class Cache<Key: Hashable, Value> {
    private let wrapped = NSCache<WrappedKey, Entry>()
    private let dateProvider: () -> Date
    private let entryLifetime: TimeInterval
    private let keyTracker = KeyTracker()

    init(dateProvider: @escaping () -> Date = Date.init,
         entryLifetime: TimeInterval = 12 * 60 * 60,
         maximumEntryCount: Int = 50) {
        self.dateProvider = dateProvider
        self.entryLifetime = entryLifetime
        wrapped.countLimit = maximumEntryCount
        wrapped.delegate = keyTracker
    }
    
    ...
}
```
Tiến hành sửa lại 1 chút trong phước thức insert
```Swift
func insert(_ value: Value, forKey key: Key) {
    ...
    keyTracker.keys.insert(key)
}
```

Áp dụng Codable cho các mục có khóa và giá trị có thể mã hóa và viết lại các phương thức insert cho entry, như sau:
```Swift
extension Cache: Codable where Key: Codable, Value: Codable {
    convenience init(from decoder: Decoder) throws {
        self.init()

        let container = try decoder.singleValueContainer()
        let entries = try container.decode([Entry].self)
        entries.forEach(insert)
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(keyTracker.keys.compactMap(entry))
    }
}

private extension Cache {
    func entry(forKey key: Key) -> Entry? {
        guard let entry = wrapped.object(forKey: WrappedKey(key)) else {
            return nil
        }

        guard dateProvider() < entry.expirationDate else {
            removeValue(forKey: key)
            return nil
        }

        return entry
    }

    func insert(_ entry: Entry) {
        wrapped.setObject(entry, forKey: WrappedKey(entry.key))
        keyTracker.keys.insert(entry.key)
    }
}
```

Giờ đây chúng ta có thể lưu bất kỳ khóa nào chứa Codable và giá trị vào đĩa - bằng cách mã hóa nó vào Data, sau đó ghi dữ liệu đó vào một tệp trong thư mục bộ nhớ đệm dành riêng cho ứng dụng của chúng ta, như sau:
```Swift
extension Cache where Key: Codable, Value: Codable {
    func saveToDisk(
        withName name: String,
        using fileManager: FileManager = .default
    ) throws {
        let folderURLs = fileManager.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )

        let fileURL = folderURLs[0].appendingPathComponent(name + ".cache")
        let data = try JSONEncoder().encode(self)
        try data.write(to: fileURL)
    }
}
```
Chỉ cần như thế, chúng ta đã xây dựng một bộ nhớ cache rất năng động đó là hoàn toàn tương thích với Swift - với sự hỗ trợ cho huỷ bỏ hiệu lực theo thời gian, lưu vào đĩa, và một giới hạn về số lượng các mục nó chứa - tất cả bằng cách tận dụng các API hệ thống như NSCache và Codable để tránh phải phát minh lại bánh xe.

**Tài liệu tham khảo: https://www.swiftbysundell.com/articles/caching-in-swift/**