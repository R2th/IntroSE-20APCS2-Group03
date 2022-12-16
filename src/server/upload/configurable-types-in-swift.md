Khi bắt đầu viết một class, struct hoặc một loại khác mới, chúng ta thường có một mục tiêu rất cụ thể hoặc hình dung về các trường hợp sử dụng. Chúng ta có thể cần một mô hình mới để thể hiện một số dữ liệu mà chúng ta đang làm việc, hoặc chúng ta có thể muốn gói gọn một đoạn logic được điều chỉnh cho một tính năng mới mà chúng ta xây dựng.
Tuy nhiên, theo thời gian, chúng ta thường thấy mình muốn sử dụng một phiên bản mới cho cùng 1 loại hoặc logic, nhưng cho một việc hoàn toàn khác. Chúng ta có thể muốn sử dụng lại một mô hình hiện có, nhưng xử lý nó theo một cách hơi khác - hoặc chúng ta có thể đang tìm cách hoàn thành một nhiệm vụ mà rất giống với một cái gì đó mà chúng ta đã giải quyết, nhưng với một loại kết quả khác.
Câu hỏi được đặt ra - làm thể tăng khả năng cấu hình.
## Initially specific
Ở đây, hoàn toàn không có gì sai với việc viết code cụ thể cho một trường hợp sử dụng duy nhất, để giải quyết trường hợp sử dụng thực tế theo cách đơn giản nhất có thể. Giả sử chúng ta đang làm việc trên một ứng dụng ghi chú và chúng tôi muốn thêm một tính năng cho phép người dùng nhập một tập các ghi chú bên ngoài từ một nhóm các tệp văn bản có trong một thư mục. Đối với phiên bản ban đầu của tính năng này, chúng tôi đã quyết định rằng chúng ta sẽ chỉ xử lý các ghi chú là plain text file hoặc được định dạng bằng Markdown - vì vậy chúng ta triển khai code chỉ với hai trường hợp sử dụng đó, như thế này :
```
struct NoteImporter {
    func importNotes(from folder: Folder) throws -> [Note] {
        // Iterate over all the files contained within the
        // folder, and only handle the ones that have an
        // extension matching what we're supporting for now:
        return try folder.files.compactMap { file in
            switch file.extension {
            case "txt":
                return try importPlainTextNote(from: file)
            case "md", "markdown":
                return try importMarkdownNote(from: file)
            default:
                return nil
            }
        }
    }
}
```
Với một chức năng ban đầu, code ở trên có vẻ đủ tốt. Tuy nhiên, vì chúng ta sẽ tiếp tục bổ sung extension cho ngày càng nhiều định dạng văn bản, chúng ta sẽ luôn cần quay lại và sửa đổi logic cốt lõi của NoteImporter ở trên. Điều này có vẻ không được linh hoạt lắm.
Lý tưởng nhất, chúng ta muốn NoteImporter chỉ cần lo lắng về nhiệm vụ sắp xếp nhập thực tế, thay vì bị ràng buộc với các định dạng tệp rất cụ thể - mặc khác, switch statement ở trên có khả năng cao vượt khỏi tầm kiểm soát. 
Để việc định dạng các file format khác sang một bên, điều tiếp theo mà chúng ta muốn là thêm phần hỗ trợ cho các ghi chú audio - đồng thời cho phép người dùng sử dụng cùng tính năng nhập để đưa các audio files hiện có của họ vào ứng dụng của chúng ta. Và sẽ thật tuyệt nếu người dùng cũng có thể nhập ảnh - và có lẽ các loại phương tiện truyền thông khác.
Với thiết lập hiện tại của chúng ta, mỗi loại nhập mới yêu cầu triển khai hoàn toàn mới - cung cấp cho chúng ta một nhóm các loại khác nhau, tất cả đều thực hiện các tác vụ rất giống nhau, sử dụng API rất giống nhau:
```
struct AudioImporter {
    func importAudio(from folder: Folder) throws -> [Audio] {
        ...
    }
}

struct PhotoImporter {
    func importPhotos(from folder: Folder) throws -> [Photo] {
        ...
    }
}
```
Mặc dù có các triển khai riêng biệt cho các trường hợp sử dụng khác nhau nhưng theo một số cách là một điều tốt - nó tách biệt mối quan tâm và cho phép chúng ta tối ưu hóa từng loại cho từng trường hợp sử dụng cụ thể. Tuy nhiên, không có bất kỳ loại trừu tượng chia sẻ hoặc API chung nào, chúng ta cũng bỏ lỡ rất nhiều lần sử dụng lại code - và chúng ta rất khó để viết shared API cho bất kỳ loại trình nhập file nào.\
## Time for some protocol-oriented programming?
Một ý tưởng ban đầu để giải quyết vấn đề đó có thể là sử dụng cách tiếp cận protocol-oriented - và tạo một protocol mà tất cả các loại importer khác nhau của chúng ta có thể tuân thủ:
```
protocol FileImporting {
    associatedtype Result
    func importFiles(from folder: Folder) throws -> [Result]
}
```
Sử dụng cách trên, chúng ta có thể để mỗi loại importer tách biệt, trong khi làm cho tất cả chúng tuân theo cùng một protocol - cung cấp cho chúng ta API chung và nhất quán, trong khi vẫn cho phép từng loại importer được thiết kế riêng cho từng trường hợp sử dụng:
```
extension AudioImporter: FileImporting { ... }
extension PhotoImporter: FileImporting { ... }
extension PlainTextImporter: FileImporting { ... }
extension MarkdownImporter: FileImporting { ... }
```
Protocol-oriented programming thực sự tuyệt vời, nhưng nó đi kèm với một vài nhược điểm khi được sử dụng trong các tình huống như thế này. Mặc dù hiện tại chúng tôi đã cải thiện tính nhất quán của code của chúng ta, nhưng cuối cùng chúng ta vẫn sẽ có rất nhiều sự trùng lặp - đặc biệt là xem xét rằng phần lớn logic của chúng ta (thực sự lặp lại qua các tệp và xử lý chúng) sẽ giống hệt nhau cho tất cả importer của chúng ta.
## Configurable types
Thay vì tạo ra một abstraction  với nhiều triển khai, hãy để cố gắng tạo một loại FileImporter duy nhất, mà chúng ta sẽ tạo cấu hình đủ để có thể sử dụng cho tất cả các trường hợp sử dụng hiện tại.
Vì cách mỗi file được xử lý là sự khác nhau duy nhất giữa các file importer khác nhau, hãy làm cho phần đó có thể định cấu hình - trong khi sử dụng cùng một cách thực hiện cho mọi thứ khác. Trong trường hợp này, chúng ta có thể làm điều đó bằng cách tạo một cấu trúc có chứa một từ điển các trình xử lý như là thuộc tính duy nhất của nó:

```
struct FileImporter<Result> {
    typealias FileType = String

    var handlers: [FileType : (File) throws -> Result]
}
```
Sau đó, chúng tôi sẽ triển khai một method importFiles duy nhất - chỉ chứa logic để import tất cả các file trong một thư mục và để xử lý từng file bằng bất kỳ trình xử lý nào được khớp dựa trên phần mở rộng file đó - như thế này:
```
extension FileImporter {
    func importFiles(from folder: Folder) throws -> [Result] {
        return try folder.files.compactMap { file in
            guard let handler = handlers[file.extension] else {
                return nil
            }

            return try handler(file)
        }
    }
}
```
Với những điều đã nêu ở trên, giờ đây chúng ta có một triển khai generic hơn nhiều, sau đó có thể được chuyên môn hóa để giải quyết các trường hợp sử dụng cụ thể. Nhưng chúng ta không muốn mỗi call site phải chỉ định thủ công tất cả các handler (điều đó sẽ nhanh chóng dẫn đến nhiều sự không nhất quán), vì vậy chúng ta sẽ thực hiện các handler được chia sẻ của mình trong các static factory methods. Bằng cách đó, chúng ta có thể tạo một factory method cho từng importer cụ thể - như cách này:
```
extension FileImporter where Result == Note {
    static func notes() -> FileImporter {
        return FileImporter(handlers: [
            "txt": importPlainTextNote,
            "text": importPlainTextNote,
            "md": importMarkdownNote,
            "markdown": importMarkdownNote
        ])
    }

    private static func importPlainTextNote(from file: File) throws -> Note {
        ...
    }

    private static func importMarkdownNote(from file: File) throws -> Note {
        ...
    }
}
```
Lưu ý, với cách bây giờ chúng ta có thể dễ dàng thêm hỗ trợ cho các định dạng file mới (mà không phải cập nhật logic FileImporter cốt lõi của chúng ta) và chúng ta cũng có thể thêm các private utility methods vào Note-bound extension - mà vẫn cho phép chúng ta cấu trúc code của mình trong một cách gọn gàng, mặc dù bây giờ nó tách rời hơn.
Tạo file importer instances vẫn dễ dàng như khi chúng ta sử dụng các loại dành riêng cho từng loại import - tất cả những gì chúng ta phải làm là gọi factory method cho loại model mà chúng ta muốn nhập:
```
let notesImporter = FileImporter.notes()
let audioImporter = FileImporter.audio()
let photoImporter = FileImporter.photos()
```
Bây giờ chúng ta có thể tạo các cấu hình khác nhau cùng loại, sử dụng các static function, là chúng ta cũng có thể dễ dàng thêm các tham số cụ thể cho từng trường hợp sử dụng. Chẳng hạn, chúng ta muốn thử nghiệm thêm hỗ trợ cho định dạng âm thanh OGG - giờ đây có thể được thực hiện mà không ảnh hưởng đến bất kỳ code import file nào khác của chúng ta, trong khi vẫn xây dựng ngay trên cùng chức năng FileImporter:
```
extension FileImporter where Result == Audio {
    static func audio(
        includeOggFiles: Bool = FeatureFlags.Audio.enableOggImports
    ) -> FileImporter {
        var handlers = [
            "mp3": importMp3Audio,
            "aac": importAacAudio
        ]

        if includeOggFiles {
            handlers["ogg"] = importOggAudio
        }

        return FileImporter(handlers: handlers)
    }
}
```
Bằng cách làm cho FileImporter của chúng ta configurable, giờ đây chúng ta đã đạt được rất nhiều tính linh hoạt, đồng thời giảm việc sao chép code - đó là một điều tốt! Nhưng có lẽ chúng ta có thể đưa mọi thứ đi xa hơn?
## To infinity, and beyond!
Mặc dù triển khai hiện tại của chúng ta đã có cấu hình khá hoàn hảo, nhưng nó buộc mỗi lần nhập phải hoàn toàn dựa trên các phần mở rộng của các import file - có thể không phải là điều chúng ta muốn trong mọi trường hợp.
Ví dụ: Chúng ta muốn hợp nhất một số cơ chế import hiện tại của chúng ta vào một tính năng duy nhất - để cho phép người dùng nhập các loại nội dung khác nhau trong một lần. Để làm điều đó, chúng tôi phải thực hiện một lần duyệt qua một thư mục và biến từng file tương thích được tìm thấy thành một thành viên của enum này:
```
enum FileImportResult {
    case note(Note)
    case audio(Audio)
    case photo(Photo)
}
```
Điều đó không dễ dàng thực hiện với thiết lập hiện tại của chúng ta, vì chúng ta chỉ có thể custom handler để sử dụng cho mỗi phần mở rộng file - chúng tôi chưa thể kiểm soát hoàn toàn việc xử lý file thực tế. Hãy khắc phục điều đó!
Thay vì hard-wiring FileImporter của chúng ta với một dictionary of handlers, thay vào đó, hãy thay thế làm cho nó configurable bằng một single handler mà mỗi file import đều phải thông qua:
```
struct FileImporter<Result> {
    typealias Handler = (File) throws -> Result?
    var handler: Handler
}
```
Sau đó, chúng ta có thể trang bị thêm version FileImporter mới ở trên, để vẫn có thể cấu hình được với một dictionary of handlers, bằng cách mở rộng nó với một trình khởi tạo phù hợp với phiên bản mà chúng ta có trước đây:
```
extension FileImporter {
    typealias FileType = String

    init(handlers: [FileType : Handler]) {
        handler = { file in
            try handlers[file.extension]?(file) ?? nil
        }
    }
}
```
Với sự thay đổi ở trên, phương thức importFiles của chúng ta giờ trở nên thực sự đơn giản - vì nó chỉ cần compactMap trên các file trong thư mục bằng cách sử dụng single handler mà nó chứa:
```
extension FileImporter {
    func importFiles(from folder: Folder) throws -> [Result] {
        return try folder.files.compactMap(handler)
    }
}
```
Bằng cách refactor FileImporter của chúng ta để sử dụng một hàm thay vì một tập hợp các option cụ thể, chúng ta ít nhiều đã giúp cho nó dễ dàng cấu hình hơn, ít nhất là trong các ràng buộc của việc duyệt qua tất cả các file trong một thư mục - vì giờ đây chúng ta có thể thực hiện kiểm soát hoàn toàn cách mỗi file sẽ được xử lý, nếu chúng ta muốn.
Giờ đây chúng ta có thể xây dựng trình nhập file kết hợp của mình - bằng cách cố gắng xử lý từng file bằng cách sử dụng từng trình nhập cơ bản, tất cả đều có độ phức tạp theo thời gian tuyến tính - như thế này:
```
extension FileImporter where Result == FileImportResult {
    static func combined() -> FileImporter {
        let importers = (
            notes: FileImporter<Note>.notes(),
            audio: FileImporter<Audio>.audio(),
            photos: FileImporter<Photo>.photos()
        )

        return FileImporter { file in
            try importers.notes.handler(file).map(Result.note) ??
                importers.audio.handler(file).map(Result.audio) ??
                importers.photos.handler(file).map(Result.photo)
        }
    }
}
```
Những gì chúng ta đã thực hiện trong bước cuối cùng này, là trích xuất một phần cốt lõi của file importer’s behavior của chúng ta vào một configurable function - trong khi vẫn cung cấp một mặc định tương thích ngược. Sự kết hợp đó thực sự mạnh mẽ, vì nó cho phép chúng ta dễ dàng thiết lập bất kỳ phiên bản FileImporter nào theo nhu cầu hiện tại của mình, trong khi vẫn xây dựng trên một tập hợp logic mặc định và cơ bản được chia sẻ.
## Conclusion
Việc kích hoạt một số loại được định cấu hình theo nhiều cách khác nhau có thể cho phép chúng tôi thực hiện các trường hợp sử dụng mới cho code mà chúng ta đã viết - mà không làm cho nó thực sự phức tạp hoặc khó bảo trì.
Mặc dù hard-coded implementation dành riêng cho một trường hợp sử dụng có thể sẽ luôn là giải pháp đơn giản nhất, tính linh hoạt bổ sung mà các configurable types mang lại cho chúng ta thường rất đáng lưu tâm - đặc biệt là khi chúng ta muốn xây dựng nhiều phần chức năng trên một nền tảng chia sẻ chung.
Nó cũng đáng để xem xét sử dụng một configurable type cho một số trường hợp sử dụng mà trước đây chúng ta có thể sử dụng một protocol - vì làm như vậy có thể dẫn đến một cấu trúc tổng thể đơn giản hơn và ít loại hơn để dễ dàng bảo trì. 

Mong bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/posts/configurable-types-in-swift