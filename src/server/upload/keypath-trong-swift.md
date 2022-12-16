Keypaths được thiết kế cho phép ta có thể trỏ tới các thuộc tính mà không cần thực sự gọi đến nó, ta sẽ giữ một reference tới thuộc tính chứ không trực tiếp đọc giá trị của nó. Keypath vẫn đang tiếp tục phát triển trong Swift, ta hãy tìm hiểu một vài cách sử dụng của nó trong bài viết sau.

## The basics
Key path cho phép ta có thể tham chiếu tới thuộc tính của bất kỳ instance nào như là một giá trị riêng biệt. Do đó, ta có thể sử dụng getter và setter của một thuộc tính mà không cần biết thuộc tính thực sự như thế nào.

Key path có 3 biến thể khác nhau:

- KeyPath: Cho phép truy xuất read-only access tới một thuộc tính.
- WritableKeyPath: Cho phép truy xuất read-write tới một thuộc tính.
- ReferenceWritableKeyPath: Chỉ có thể sử dụng với kiểu tham chiếu và cho phép truy xuất read-write tới bất kỳ thuộc tính có thể thay đổi nào.
## Functional shorthands
Giả sử ta xây dựng một ứng dụng cho phép người dùng đọc các bài viết từ web, ta tạo một model Article như sau:
```
struct Article {
    let id: UUID
    let source: URL
    let title: String
    let body: String
}
```
Khi làm việc với model dạng array như trên, thông thường ta sẽ cần trích lấy một phần dữ liệu từ model để tạo một array mới - ví dụ như trong ví dụ sau, ta sẽ thu thập tất cả ID và source từ mảng các article:
```
let articleIDs = articles.map { $0.id }
let articleSources = articles.map { $0.source }
```
Thay vì sử dụng closure như ở trên ta hoàn toàn có thể sử dụng key path để thay thế. 

Đầu tiên ta sẽ mở rộng Sequence bằng cách override hàm map để sử dụng key path thay vì closure:
```
extension Sequence {
    func map<T>(_ keyPath: KeyPath<Element, T>) -> [T] {
        return map { $0[keyPath: keyPath] }
    }
}
```
Ta có thể trích xuất dữ liệu từ bất kỳ một sequence nào rất dễ dàng, chẳng hạn với ví dụ trên ta sẽ có :
```
let articleIDs = articles.map(\.id)
let articleSources = articles.map(\.source)
```
Bạn tự hỏi đâu có gì khác biệt với closure đâu? Câu trả lời là key path sẽ thực sự hữu dụng đối với những expression phức tạp hơn chẳng hạn sort một sequence. Standard library cho phép ta có thể sort bất kỳ sequence nào có chứa sortable element, tuy nhiên với những element loại khác ta cần phải viết closure sorting riêng. Sử dụng key path ta có thể dễ dàng sort bất kỳ sequence nào. Ta sẽ mở rộng sequence như sau:
```
extension Sequence {
    func sorted<T: Comparable>(by keyPath: KeyPath<Element, T>) -> [Element] {
        return sorted { a, b in
            return a[keyPath: keyPath] < b[keyPath: keyPath]
        }
    }
}
```
Sử dụng hàm trên ta có thể sort bất kỳ sequence nào một cách nhanh chóng và dễ dàng bằng cách cung cấp key path mà ta muốn sort.
```
playlist.songs.sorted(by: \.name)
playlist.songs.sorted(by: \.dateAdded)
playlist.songs.sorted(by: \.ratings.worldWide)
```
# No instance required
Sức mạnh thực sự của key path ở chỗ chúng ta có thể tham chiếu tới một thuộc tình mà không cần bất kỳ một instance cụ thể nào. Giả sử ta đang làm một ứng dụng hiển thị danh sách các bài hát, ta sẽ sử dụng một  UITableViewCell như sau:
```
struct SongCellConfigurator {
    func configure(_ cell: UITableViewCell, for song: Song) {
        cell.textLabel?.text = song.name
        cell.detailTextLabel?.text = song.artistName
        cell.imageView?.image = song.albumArtwork
    }
}
```
BẠn thường sử dụng cách làm trên đúng không, ta hãy làm một cách tổng quát hơn bằng cách sử dụng generic CellConfigurator như sau:
```
struct CellConfigurator<Model> {
    let titleKeyPath: KeyPath<Model, String>
    let subtitleKeyPath: KeyPath<Model, String>
    let imageKeyPath: KeyPath<Model, UIImage?>

    func configure(_ cell: UITableViewCell, for model: Model) {
        cell.textLabel?.text = model[keyPath: titleKeyPath]
        cell.detailTextLabel?.text = model[keyPath: subtitleKeyPath]
        cell.imageView?.image = model[keyPath: imageKeyPath]
    }
}
```
Khi đó ta có thể sử dụng với nhiều model khác nhau bằng cách sử dụng key path:
```
let songCellConfigurator = CellConfigurator<Song>(
    titleKeyPath: \.name,
    subtitleKeyPath: \.artistName,
    imageKeyPath: \.albumArtwork
)

let playlistCellConfigurator = CellConfigurator<Playlist>(
    titleKeyPath: \.title,
    subtitleKeyPath: \.authorName,
    imageKeyPath: \.artwork
)
```
# Reference
Bài viết này tham khảo từ https://www.swiftbysundell.com/posts/the-power-of-key-paths-in-swift