- Là lập trình viên, chúng ta thường làm việc trên các ứng dụng và hệ thống bao gồm nhiều thành phần được kết nối nhiều cách khác nhau.  Đặc biệt là khi sử dụng  ngôn ngữ lập trình có tính chặt chẽ cao như `Swift` thì khó tìm ra cách model phần `data` vừa thỏa mãn trình biên dịch  vừa có `codebase` dễ đọc.

- Chúng ta hãy xem xét một trường hợp bao gồm việc mô hình hóa nhiều tùy chỉnh của cùng một `model data` và  vài kỹ thuật , phương pháp khác nhau cho phép chúng ta xử lý `data`  một cách an toàn.

## 1/ Mixed structures:

- Giả sử rằng chúng ta đang làm việc trên một ứng dụng nấu ăn bao gồm cả video và công thức nấu ăn dưới dạng văn bản và `content` chúng ta được trả về từ `web service` dưới dạng `JSON` như sau:

```Swift
{
    "items": [
        {
            "type": "video",
            "title": "Making perfect toast",
            "imageURL": "https://image-cdn.com/toast.png",
            "url": "https://videoservice.com/toast.mp4",
            "duration": "00:12:09",
            "resolution": "720p"
        },
        {
            "type": "recipe",
            "title": "Tasty burritos",
            "imageURL": "https://image-cdn.com/burritos.png",
            "text": "Here's how to make the best burritos...",
            "ingredients": [
                "Tortillas",
                "Salsa",
                ...
            ]
        }
    ]
}
```

- Cấu trúc  `JSON` như bên trên là cực kỳ phổ biến  nhưng việc tạo các `struct`  phù hợp với nó có thể khá khó khăn. Chúng ta nhận được một `array` các `item` gồm công thức nấu ăn và video. Chúng ta sẽ cần viết `model` mà chúng ta có thể `decode` đồng thời cả hai tùy chỉnh đó.

- Một cách để làm điều đó là tạo ra một `enum` `ItemType` bao gồm các trường hợp cho hai tùy chỉnh của chúng ta cũng như một `model data`  hợp nhất có chứa tất cả các thuộc tính mà chúng ta  gặp phải và đóng gói `ItemCollection`:

```Swift
enum ItemType: String, Decodable {
    case video
    case recipe
}

struct Item: Decodable {
    let type: ItemType
    var title: String
    var imageURL: URL
    var text: String?
    var url: URL?
    var duration: String?
    var resolution: String?
    var ingredients: [String]?
}

struct ItemCollection : Decodable {
    var items: [Item]
}
```

- Cách tiếp cận trên cho phép chúng ta `decode`  `JSON` nhưng nó vẫn chưa tối ưu  vì chúng ta buộc phải triển khai phần lớn các thuộc tính  dưới dạng tùy chỉnh chẳng hạn như `VideoPlayer` này:

```Swift
class VideoPlayer {
    ...

    func playVideoItem(_ item: Item) {
        // We can't establish a compile-time guarantee that the
        // item passed to this method will, in fact, be a video.
        guard let url = item.url else {
            assertionFailure("Video item doesn't have a URL: \(item)")
            return
        }

        startPlayback(from: url)
    }
}
```

## 2/ Complete polymorphism:

- Chúng ta  cố gắng `model data` một tập hợp dữ liệu thành nhiều kiểu khác nhau. Chúng ta có thể tạo một `protocol` `Item` chứa tất cả các thuộc tính được chia sẻ giữa hai biến thể cũng như hai `type` riêng biệt:

```Swift
protocol Item: Decodable {
    var type: ItemType { get }
    var title: String { get }
    var imageURL: URL { get }
}

struct Video: Item {
    var type: ItemType { .video }
    var title: String
    var imageURL: URL
    var url: URL
    var duration: String
    var resolution: String
}

struct Recipe: Item {
    var type: ItemType { .recipe }
    var title: String
    var imageURL: URL
    var text: String
    var ingredients: [String]
}
```


- Chúng ta cũng muốn sửa đổi trình bao bọc `ItemCollection ` của chúng ta để bao gồm các `array` riêng cho từng `type` trong hai `type`  vì nếu không làm thế chúng ta sẽ phải liên tục nhập các giá trị  cho `Video` hoặc `Recipe` :

```Swift
struct ItemCollection : Decodable {
    var videos: [Video]
    var recipes: [Recipe]
}
```

- Để có thể sử dụng lại các implement `Item` và `ItemCollection ` từ trước đồng thời đổi tên chúng để phù hợp với mục đích mới :

```Swift
private extension ItemCollection  {
    struct Encoded: Decodable {
        var items: [EncodedItem]
    }

    struct EncodedItem: Decodable {
        let type: ItemType
        var title: String
        var imageURL: URL
        var text: String?
        var url: URL?
        var duration: String?
        var resolution: String?
        var ingredients: [String]?
    }
}
```

- Chúng ta  đã sẵn sàng để  `Decodable` nhưng vì chúng ta sẽ cần phải thêm một vài tùy chọn khi thực hiện điều đó:

```Swift
extension ItemCollection  {
    struct MissingEncodedValue: Error {
        var name: String
        ...
    }

    private func unwrap<T>(_ value: T?, name: String) throws -> T {
        guard let value = value else {
            throw MissingEncodedValue(name: name)
        }

        return value
    }
}
```


- Bây giờ hãy viết `decode ` thực tế. Chúng ta sẽ bắt đầu bằng cách `decode` một phiên bản của . Chúng ta sẽ chuyển đổi các mục của `ItemCollection` thành  `Video` và `Recipe` như sau:

```Swift
extension ItemCollection  {
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let collection = try container.decode(Encoded.self)

        for item in collection.items {
            switch item.type {
            case .video:
                try videos.append(Video(
                    type: item.type,
                    title: item.title,
                    imageURL: item.imageURL,
                    url: unwrap(item.url, name: "url"),
                    duration: unwrap(item.duration, name: "duration"),
                    resolution: unwrap(item.resolution, name: "resolution")
                ))
            case .recipe:
                try recipes.append(Recipe(
                    type: item.type,
                    title: item.title,
                    imageURL: item.imageURL,
                    text: unwrap(item.text, name: "text"),
                    ingredients: unwrap(item.ingredients, name: "ingredients")
                ))
            }
        }
    }
}
```

- Thay vì coi các `instance` là các cách triển khai khai riêng biệt có `protocol` hãy coi chúng là các `instance`  của cùng một `model`. Điều đó  sẽ có tác động khá lớn đến công đoạn cuối của chúng ta cấu trúc mô hình.

- Hãy đổi tên `protocol` `Item` trước đó thành `ItemVariant` và bỏ thuộc tính `type` của nó:

```Swift
protocol ItemVariant: Decodable {
    var title: String { get }
    var imageURL: URL { get }
}
```


- Chúng ta mô hình hóa loại `item` thực tế của chúng ta dưới dạng `enum` như sau:

```Swift
enum Item {
    case video(Video)
    case recipe(Recipe)
}
```

- Chúng ta có thể đơn giản hóa rất nhiều việc triển khai `decode`  diễn ra hoàn toàn trong chính loại `Item` mới  và chỉ cần kiểm tra từng giá trị loại của mục `JSON`để quyết định loại `decode` nào:

```Swift
extension Item: Decodable {
    struct InvalidTypeError: Error {
        var type: String
        ...
    }

    private `enum `CodingKeys: CodingKey {
        case type
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let type = try container.decode(String.self, forKey: .type)

        switch type {
        case "video":
            self = .video(try Video(from: decoder))
        case "recipe":
            self = .recipe(try Recipe(from: decoder))
        default:
            throw InvalidTypeError(type: type)
        }
    }
}
```


- Do việc triển khai `Item` của chúng ta  chịu trách nhiệm `decode` các `instance` của chính nó và giờ  chúng ta có thể  `ItemCollection `  được trả lại trở lại đơn giản là   `array` các giá trị `Item` cho phép  dựa vào triển khai mặc định của `Decodable`:

```Swift
struct itemCollection : Decodable {
    var items: [Item]
}
```


- Lợi ích là c chúng ta tiếp tục sử dụng các mô hình chuyên dụng đồng thời giữ cho `decode` của chúng ta đơn giản và thứ tự `item` tổng thể được giữ nguyên nhưng đi kèm với nhược điểm là yêu cầu  giải nén từng `item` trước khi sử dụng:

```Swift
extension ItemCollection  {
    func allTitles() -> [String] {
        items.map { item in
            switch item {
            case .video(let video):
                return video.title
            case .recipe(let recipe):
                return recipe.title
            }
        }
    }
}
```

- Mặc dù chúng ta sẽ phải tiếp tục viết `code` như trên bất cứ khi nào chúng ta cần truy cập `data` cụ thể cho công thức nấu ăn hoặc `Video`.  Chúng ta có thể làm để cung cấp  quyền truy cập trực tiếp vào bất kỳ thuộc tính  được xác định trong `protocol` `ItemVariant` và  sử dụng tính năng tra cứu `subscription` của `Swift`.

- Việc thêm thuộc tính `@dynamicMemberLookup` vào khai báo `item` chính của chúng ta:

```Swift
@dynamicMemberLookup
enum Item {
    case video(Video)
    case recipe(Recipe)
}
```

- Từ `Swift 5.1` chúng ta có  thêm cách hỗ trợ cho các `subscription` theo cách hoàn toàn an toàn và dễ dàng như sau:

```Swift
extension Item {
    subscript<T>(dynamicMember keyPath: KeyPath<ItemVariant, T>) -> T {
        switch self {
        case .video(let video):
            return video[keyPath: keyPath]
        case .recipe(let recipe):
            return recipe[keyPath: keyPath]
        }
    }
}
```


- Bây giờ chúng ta có thể truy cập bất kỳ thuộc tính nào được chia sẻ giữa `Video` và `Recipe` (thông qua `protocol` `ItemVariant `) như thể thuộc tính đó được xác định trong chính loại `Item` . Chúng ta có thể chuyển đổi phương thức `allTitle` thành như sau :

```Swift
extension ItemCollection  {
    func allTitles() -> [String] {
        items.map(\.title)
    }
}
```