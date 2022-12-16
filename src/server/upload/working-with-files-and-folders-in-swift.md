Đọc và ghi files và folders là một trong những task mà hầu hết mọi ứng dụng đều cần thực hiện tại một số thời điểm. Mặc dù nhiều ứng dụng ngày nay, đặc biệt là trên iOS, có thể không cung cấp cho người dùng quyền truy cập minh bạch để mở, lưu và cập nhật tài liệu theo ý họ - bất cứ khi nào chúng ta xử lý một số dạng dữ liệu long-term data persistence hoặc một bundled resource, chúng ta luôn phải tương tác với file system theo cách này hay cách khác.
Vì vậy, trong bài viết này, chúng ta hãy xem xét kỹ hơn các cách khác nhau để sử dụng file system-related APIs mà Swift cung cấp - cả trên nền tảng của Apple và trên các nền tảng như Linux - và một số điều cần lưu ý khi làm việc với các API đó.
## URLs, locations, and data
Về cơ bản, có hai Foundation types đặc biệt quan trọng khi đọc và ghi file trong Swift - `URL` và `Data`. Giống như khi thực hiện các network calls, URL được sử dụng để trỏ đến các vị trí khác nhau trên disk, sau đó chúng ta có thể đọc dữ liệu nhị phân từ đó hoặc ghi dữ liệu mới vào.
Ví dụ: ở đây, chúng ta đang truy xuất một file path được truyền làm đối số cho Swift command line tool, sau đó chúng ta chuyển thành một file system URL để tải dữ liệu của file đó:
```
// This lets us easily access any command line argument passed
// into our program as "-path":
guard let path = UserDefaults.standard.string(forKey: "path") else {
    throw Error.noPathGiven
}

let url = URL(fileURLWithPath: path)

do {
    let data = try Data(contentsOf: url)
    ...
} catch {
    throw Error.failedToLoadData
}
```
Một điều thường cần lưu ý khi làm việc với các đường dẫn dựa trên chuỗi là có một số ký tự nhất định phải được diễn giải theo những cách cụ thể, chẳng hạn như ký tự dấu ngã (~), thường được sử dụng để chỉ home directory của người dùng hiện tại.
Mặc dù đó không phải là thứ mà chúng ta thường phải xử lý thủ công khi xử lý với command line tool input (vì terminal shell có xu hướng tự động mở rộng các ký hiệu như vậy), trong các ngữ cảnh khác, chúng ta có thể tranh thủ sự trợ giúp của Objective-C "anh em họ" của loại `String`, `NSString` , để giúp chúng ta mở rộng bất kỳ ký tự dấu ngã nào được tìm thấy trong một chuỗi nhất định vào đường dẫn thư mục chính đầy đủ của người dùng:
```
var path = resolvePath()
path = (path as NSString).expandingTildeInPath
```
## Bundles and modules
Trên nền tảng của Apple, các ứng dụng được phân phối dưới dạng `bundles`, có nghĩa là để truy cập các file nội bộ mà chúng ta - đã bao gồm (hoặc được bundled) trong ứng dụng của riêng mình, trước tiên chúng ta cần giải quyết các URL thực của chúng bằng cách tìm kiếm chúng trong app main bundle của chúng ta.
main bundle đó có thể được truy cập bằng `Bundle.main`, cho phép chúng ta truy xuất bất kỳ resource file nào được bao gồm trong main app target của chúng ta, chẳng hạn như bundled JSON file, như sau:
```
struct ContentLoader {
    enum Error: Swift.Error {
        case fileNotFound(name: String)
        case fileDecodingFailed(name: String, Swift.Error)
    }

    func loadBundledContent(fromFileNamed name: String) throws -> Content {
        guard let url = Bundle.main.url(
            forResource: name,
            withExtension: "json"
        ) else {
            throw Error.fileNotFound(name: name)
        }

        do {
            let data = try Data(contentsOf: url)
            let decoder = JSONDecoder()
            return try decoder.decode(Content.self, from: data)
        } catch {
            throw Error.fileDecodingFailed(name: name, error)
        }
    }
    
    ...
}
```
Mặc dù thoạt đầu có vẻ như `Bundle.main` là bundle duy nhất mà chúng ta cần làm việc, nhưng điều đó thường không đúng như vậy. Ví dụ: giả sử bây giờ chúng ta muốn viết một unit test để xác minh `ContentLoader` ở trên bằng cách để nó load file cụ thể được bundled trong test bundle của chúng ta:
```
class ContentLoaderTests: XCTestCase {
    func testLoadingContentFromBundledFile() throws {
        let loader = ContentLoader()
        let content = try loader.loadBundledContent(fromFileNamed: "testContent")
        XCTAssertEqual(content.title, "This is a test")
    }
    
    ...
}
```
Khi chạy đoạn test ở trên, chúng ta sẽ gặp phải lỗi, điều này ban đầu có vẻ hơi lạ (giả sử rằng chúng ta bundled một file  có tên `testContent.json` trong test target của mình). Vấn đề là unit testing suite của chúng ta có bundle riêng, tách biệt với `Bundle.main` và vì `ContentLoader` của chúng ta hiện luôn sử dụng `main` bundle, nên sẽ không tìm thấy test file của chúng ta.
Vì vậy, để có thể thực hiện test trên, trước tiên chúng ta cần thêm một chút [parameter-based dependency injection](https://www.swiftbysundell.com/articles/different-flavors-of-dependency-injection-in-swift/#parameter-based) để cho phép `ContentLoader` load file từ bất kỳ `Bundle` nào (trong khi vẫn giữ `main` làm mặc định):
```
struct ContentLoader {
    ...

    func loadBundledContent(fromFileNamed name: String,
                            in bundle: Bundle = .main) throws -> Content {
        guard let url = bundle.url(
            forResource: name,
            withExtension: "json"
        ) else {
            throw Error.fileNotFound(name: name)
        }

        ...
    }
    
    ...
}
```
Với những điều trên, giờ đây chúng ta có thể giải quyết đúng bundle trong các unit test của mình - bằng cách yêu cầu hệ thống cung cấp bundle có chứa test class hiện tại của chúng ta - sau đó chúng ta sẽ đưa vào khi gọi phương thức `loadBundledContent`:
```
class ContentLoaderTests: XCTestCase {
    func testLoadingContentFromBundledFile() throws {
        let loader = ContentLoader()
        let bundle = Bundle(for: Self.self)

        let content = try loader.loadBundledContent(
            fromFileNamed: "testContent",
            in: bundle
        )

        XCTAssertEqual(content.title, "This is a test")
    }
    
    ...
}
```
Cùng những dòng đó, khi sử dụng khả năng mới của Swift Package Manager (kể từ Swift 5.3) cho phép chúng ta embed bundled resources vào trong một Swift package, chúng ta cũng không thể giả định rằng `Bundle.main` sẽ chứa tất cả các resources của ứng dụng - vì bất kỳ tfile bundled trong một Swift package  sẽ có thể truy cập được thông qua thuộc tính `module` mới, thuộc tính này đề cập đến module’s bundle hiện tại, thay vì bundle cho chính ứng dụng.
Vì vậy, nói chung, bất cứ khi nào chúng ta thiết kế một API sử dụng `Bundle` để load local resource, thông thường bạn nên cho phép đưa vào bất kỳ `Bundle` instance nào, thay vì mã hóa logic của chúng tôi để luôn sử dụng `main`.
## Storing files within system-defined folders
Cho đến nay, chúng ta đã khám phá nhiều cách khác nhau để đọc file, từ bất kỳ vị trí file system nào thông qua command line tool (chạy trên macOS hoặc Linux) hoặc từ một file bundled trong một ứng dụng. Nhưng bây giờ, hãy cùng xem cách chúng ta có thể write file - theo cách vừa có thể dự đoán được, vừa tương thích với tighter sandboxing rules hơn được tìm thấy trên các nền tảng như iOS.
Trên thực tế, việc ghi dữ liệu nhị phân vào đĩa dễ dàng như gọi phương thức `write (to :)` trên bất kỳ giá trị `Data` nào, nhưng câu hỏi đặt ra là làm thế nào để giải quyết URL nào sẽ ghi vào - đặc biệt nếu chúng ta muốn ghi file vào system-defined folder , chẳng hạn như `Library` hoặc `Documents`.
Câu trả lời là sử dụng API `FileManager` của Foundation, cho phép chúng ta resolve URLs cho system folders theo cách đa nền tảng. Ví dụ: đây là cách chúng ta có thể encode và ghi bất kỳ giá trị có thể mã hóa nào vào file trong `Documents` foilder của người dùng hiện tại:
```
struct FileIOController {
    func write<T: Encodable>(
        _ value: T,
        toDocumentNamed documentName: String,
        encodedUsing encoder: JSONEncoder = .init()
    ) throws {
        let folderURL = try FileManager.default.url(
            for: .documentDirectory,
            in: .userDomainMask,
            appropriateFor: nil,
            create: false
        )

        let fileURL = folderURL.appendingPathComponent(documentName)
        let data = try encoder.encode(value)
        try data.write(to: fileURL)
    }
    
    ...
}
```
Tương tự, chúng ta cũng có thể sử dụng API `FileManager` ở trên để giải quyết các system folders khác - ví dụ: folder mà hệ thống cho là thích hợp nhất để sử dụng cho disk-based caching:
```
let cacheFolderURL = try FileManager.default.url(
    for: .cachesDirectory,
    in: .userDomainMask,
    appropriateFor: nil,
    create: false
)
```
Tuy nhiên, nếu tất cả những gì chúng ta đang tìm là URL cho một folder tạm thời, chúng ta có thể sử dụng hàm `NSTemporaryDirectory` đơn giản hơn nhiều - hàm trả về một URL cho một system folder có thể được sử dụng để lưu trữ dữ liệu mà chúng ta chỉ muốn tồn tại trong thời gian ngắn:
```
let temporaryFolderURL = URL(fileURLWithPath: NSTemporaryDirectory())
```
Lợi ích của việc sử dụng các API ở trên, thay vì hard-coding các đường dẫn thư mục cụ thể trong code, chúng ta cho phép hệ thống quyết định thư mục nào phù hợp nhất cho nhiệm vụ hiện tại.
## Managing custom folders
Mặc dù lưu trữ tệp trực tiếp trong các folders được hệ thống quản lý có các trường hợp sử dụng của nó, nhưng rất có thể thay vào đó, chúng ta muốn đóng gói file của mình trong một folder của riêng mình - đặc biệt khi ghi file vào shared system folders (chẳng hạn như `Documents` hoặc `Library`) trên macOS, có thể gây ra xung đột với các ứng dụng khác hoặc dữ liệu người dùng nếu chúng tôi không cẩn thận.
Đây là một lĩnh vực khác mà `FileManager` thực sự hữu ích, vì nó cung cấp một số API cho phép chúng ta tạo, sửa đổi và xóa các custom folders. Ví dụ: đây là cách chúng ta có thể sửa đổi `FileIOController` của mình từ trước đến nay dùng để lưu trữ các files của nó trong nested `MyAppFiles` folder, thay vì trực tiếp trong `Documents` folder:
```
struct FileIOController {
    var manager = FileManager.default

    func write<T: Encodable>(
        _ object: T,
        toDocumentNamed documentName: String,
        encodedUsing encoder: JSONEncoder = .init()
    ) throws {
        let rootFolderURL = try manager.url(
            for: .documentDirectory,
            in: .userDomainMask,
            appropriateFor: nil,
            create: false
        )

        let nestedFolderURL = rootFolderURL.appendingPathComponent("MyAppFiles")

        try manager.createDirectory(
            at: nestedFolderURL,
            withIntermediateDirectories: false,
            attributes: nil
        )

        let fileURL = nestedFolderURL.appendingPathComponent(documentName)
        let data = try encoder.encode(object)
        try data.write(to: fileURL)
    }
    
    ...
}
```
Tuy nhiên, đoạn code trên có một vấn đề khá lớn và đó là chúng ta hiện đang cố gắng tạo nested folder mỗi khi phương thức `write` của chúng ta được gọi - điều này sẽ gây ra lỗi nếu thư mục đó đã tồn tại.
Mặc dù chúng tôi có thể chỉ cần đặt trước lệnh gọi `createDirectory` bằng `try?`, thay vì `try`, để khắc phục sự cố đó - làm như vậy cũng sẽ chặn mọi lỗi hợp pháp có thể xảy ra khi chúng ta thực sự muốn tạo thư mục đó, điều này sẽ không lý tưởng. Vì vậy, thay vào đó, chúng ta hãy sử dụng một API `FileManager` khác, `fileExists`, cũng có thể được sử dụng để kiểm tra xem thư mục có tồn tại ở một đường dẫn nhất định hay không:
```
if !manager.fileExists(atPath: nestedFolderURL.relativePath) {
    try manager.createDirectory(
        at: nestedFolderURL,
        withIntermediateDirectories: false,
        attributes: nil
    )
}
```
Lưu ý cách chúng ta đang sử dụng `relativePath` property để convert `nestedFolderURL` ở trên của chúng ta thành một string-based path, thay vì sử dụng `absoluteString`, thường được sử dụng khi làm việc với các URL trỏ đến một vị trí trên internet. Đó là bởi vì `absoluteString` sẽ mang lại một chuỗi URL có tiền tố là `file://` Scheme, đây không phải là điều chúng ta muốn khi chuyển file URL đến một API chấp nhận một file path.
Cũng cần lưu ý rằng cách tiếp cận ở trên chỉ thực sự an toàn trong các single-threaded contexts hoặc khi chương trình của chúng ta hoàn toàn kiểm soát các thư mục mà nó tạo ra, vì nếu không thì có nguy cơ thư mục được đề cập có thể được tạo ở giữa kiểm tra `fileExists` của chúng ta và khi tạo `createDirectory`. Một cách để xử lý các tình huống như vậy là luôn cố gắng tạo thư mục và sau đó bỏ qua mọi lỗi kết quả chỉ khi lỗi đó khớp với lỗi được đưa ra khi một thư mục đã tồn tại - như thế này:
```
do {
    try manager.createDirectory(
        at: nestedFolderURL,
        withIntermediateDirectories: false,
        attributes: nil
    )
} catch CocoaError.fileWriteFileExists {
    // Folder already existed
} catch {
    throw error
}
```
## Conclusion
Swift, và cụ thể hơn là Foundation, cung cấp một bộ file system API khá toàn diện cho phép chúng ta thực hiện một số lượng lớn hoạt động trên tất cả các nền tảng của Apple - và nhiều trong số chúng cũng hoàn toàn tương thích với Linux. Mặc dù bài viết này không nhằm mục đích đề cập đến từng API đơn lẻ (sau cùng thì đó là tài liệu chính thức của Apple), mình hy vọng rằng nó đã cung cấp một cái nhìn tổng quan ngắn gọn về các API chính khác nhau liên quan đến việc làm việc với file và các folders trong Swift.

Mong bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/working-with-files-and-folders-in-swift/