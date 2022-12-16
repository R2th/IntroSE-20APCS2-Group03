Một trong những ưu điểm chính của Codable API của Swift là cách trình biên dịch có thể tự động tổng hợp nhiều cách triển khai encoding và decoding khác nhau khi sử dụng nó. Trong nhiều trường hợp, tất cả những gì chúng ta phải làm để cho phép một kiểu Swift được tuần tự hóa thành các định dạng như JSON, ta chỉ cần đánh dấu nó là `Codable` và trình biên dịch sẽ lo phần còn lại.
Chúng ta hãy xem cách tổng hợp tự động đó hoạt động cụ thể như thế nào đối với enums và cách một phần của hệ thống đã được nâng cấp trong Swift 5.5.
## Raw representable enums
Enums thường có hai biến thể - những biến thể được hỗ trợ bởi các raw values (chẳng hạn như `Int` hoặc `String`) và những biến thể chứa các associated values. Kể từ khi giới thiệu Codable trong Swift 4.0, các enums thuộc loại cũ đã luôn hỗ trợ tổng hợp trình biên dịch.
Vì vậy, chẳng hạn, giả sử rằng chúng ta đang làm việc trên một ứng dụng bao gồm enum được hỗ trợ bởi `String` sau đây, tuân theo `Codable`:
```
enum MediaType: String, Codable {
    case article
    case podcast
    case video
}
```
Vì trình biên dịch có thể tự động tổng hợp tất cả các code cần thiết để encode và decode các enum với các raw values, chúng ta thường không phải viết thêm bất kỳ mã nào ngoài mã đó - có nghĩa là giờ đây chúng ta có thể tự do sử dụng enum trên trong các `Codable` types khác, như thế này:
```
struct Item: Codable {
    var title: String
    var url: URL
    var mediaType: MediaType
}
```
Nếu bây giờ chúng ta encode một instance của `Item` type ở trên thành JSON, thì chúng ta sẽ nhận được output sau (vì các giá trị `MediaType` sẽ tự động được encode và decode bằng cách sử dụng các raw `String` values hỗ trợ chúng):
{
    "title": "Swift by Sundell",
    "url": "https://swiftbysundell.com/podcast",
    "mediaType": "podcast"
}
Nhưng điều gì sẽ xảy ra nếu thay vào đó chúng ta muốn encode hoặc decode một enum hỗ trợ các associated values? Chúng ta hãy xem xét điều đó tiếp theo.
## Associated values
Trước Swift 5.5, nếu chúng ta muốn tạo một enum chứa các associated values phù hợp với `Codable`, thì chúng ta phải viết tất cả mã đó theo cách thủ công. Tuy nhiên, điều đó không còn xảy ra nữa, vì trình biên dịch đã nhận được bản nâng cấp khiến nó có khả năng tự động tổng hợp mã tuần tự hóa cho các enum như vậy.
Ví dụ: enum `Video` sau đây hiện có thể được tạo `Codable` mà không yêu cầu bất kỳ mã tùy chỉnh nào từ phía chúng ta:
```
enum Video: Codable {
    case youTube(id: String)
    case vimeo(id: String)
    case hosted(url: URL)
}
```
Để xem loại ở trên trông như thế nào khi được encode, hãy tạo một instance của `VideoCollection` lưu trữ một mảng các giá trị `Video`:
```
struct VideoCollection: Codable {
    var name: String
    var videos: [Video]
}

let collection = VideoCollection(
    name: "Conference talks",
    videos: [
    .youTube(id: "ujOc3a7Hav0"),
    .vimeo(id: "234961067")
]
)
```
Nếu sau đó chúng ta mã hóa giá trị tập hợp ở trên thành JSON, thì chúng ta sẽ nhận được kết quả sau:
```
{
    "name": "Conference talks",
    "videos": [
        {
            "youTube": {
    "id": "ujOc3a7Hav0"
}
        },
        {
            "vimeo": {
    "id": "234961067"
}
        }
    ]
}
```
Vì vậy, theo mặc định, khi chúng ta để trình biên dịch tự động tổng hợp Codable cho một enum có các associated values, thì tên các trường hợp của chúng ta và nhãn cho các associated values trong chúng sẽ được sử dụng khi tính định dạng tuần tự hóa của loại đó.
## Key customization
Giống như khi làm việc với struct và class, chúng ta có thể tùy chỉnh keys nào sẽ được sử dụng khi encode hoặc decode enum’s cases và associated values và thậm chí chúng ta có thể sử dụng khả năng đó để bỏ qua hoàn toàn một số trường hợp nhất định.
Ví dụ: giả sử chúng ta muốn mở rộng `Video` enum của mình để thêm hỗ trợ cho các local videos, nhưng không có cách nào hợp lý để chúng ta sắp xếp tuần tự dữ liệu cho các video đó.
Mặc dù chúng ta luôn có thể tạo một loại hoàn toàn riêng biệt để trình bày những video như vậy, nhưng chúng tôi cũng có thể sử dụng enum `CodingKeys` lồng nhau để yêu cầu trình biên dịch bỏ qua `local` case khi tạo triển khai `Video` type’s `Codable`. Như sau:
```
enum Video: Codable {
    case youTube(id: String)
    case vimeo(id: String)
    case hosted(url: URL)
    case local(LocalVideo)
}

extension Video {
    enum CodingKeys: String, CodingKey {
        case youTube
        case vimeo
        case hosted = "custom"
    }
}
```
Nếu cần, chúng ta thậm chí có thể tùy chỉnh key nào được sử dụng cho các associated values trong một trường hợp cụ thể. Ví dụ: đây là cách chúng ta có thể tuyên bố rằng chúng ta muốn giá trị `id` của `YouTube` case được serialized dưới dạng `youTubeID`:
```
extension Video {
    enum YouTubeCodingKeys: String, CodingKey {
        case id = "youTubeID"
    }
}
```
Enum `YouTubeCodingKeys` ở trên phù hợp với `YouTube` case theo tên, vì vậy nếu chúng ta cũng muốn tùy chỉnh `vimeo` case, thì chúng ta có thể thêm một enum `VimeoCodingKeys` cho trường hợp đó.
## Conclusion
Mặc dù tính năng tổng hợp tự động của Codable có những giới hạn của nó (đặc biệt khi làm việc với các định dạng được tuần tự hóa khác rất nhiều so với cách chúng tôi muốn tổ chức dữ liệu trong các loại Swift của mình), nó vô cùng tiện lợi - và thường đặc biệt hữu ích khi làm việc với các giá trị được lưu trữ local , chẳng hạn như khi lưu các giá trị vào bộ nhớ đệm trên đĩa hoặc khi đọc các bundled configuration files.
Bất chấp điều đó, thực tế là các enums với các associated values hiện có thể tham gia auto-synthesis party chắc chắn là một điều tốt về tính nhất quán và sẽ chứng tỏ là khá hữu ích trong nhiều code bases khác nhau - bao gồm cả code bases của riêng tôi.

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/articles/codable-synthesis-for-swift-enums/