## Lưu trữ ảnh và video trong Core Data
Như chúng ta đã biết việc lưu trữ dữ liệu là một trong những quyết định quan trọng nhất khi thiết kế ứng dụng Swift. 
Apple cũng cấp cho chúng ta 4 tuỳ chọn lưu trữ dữ liệu đó là:
+ Core Data
+ Raw value
+ NSCoding compliant - object
+ URLCache

Tuy nhiên trong bài này chúng ta sẽ nói về core data để lưu trữ.
Như chúng ta đã biết Core Data là một framework, nó giống như UIKit cung cấp UIButtons, UILabels, UIViews. Core Data cung cấp các giải pháp để quản lý hệ cơ sở dữ liệu của app. ... Tuy nhiên, Core Data không phải là hệ cơ sở dữ liệu, nó chỉ là một framework hỗ trợ cho việc quản lý dữ liệu của bạn mà thôi. Khi bắt tay vào học lập trình IOS chắc hẳn các bạn đã được làm quen ngay với việc sử dụng core data để lưu trữ những dữ liệu cơ bản tuy nhiên với những dữ liệu như ảnh và video thì sao ? Chắc hẳn sẽ có người thấy khó khăn khi lưu chúng với core data. Bài này chúng ta sẽ đánh giá và đề xuất cách thức hợp lí để lưu trữ các loại định dạng này.

Chúng ta thử lưu trữ dữ liệu với 3 cách để thấy sự khác biệt
1. ImageBlobWithInternalStorage – stores images in SQLite table.
2. ImageBlobWithExternalStorage – utilizes Core Data external storage.
3. ImageWithFileSystemStorage – stores image in filesystem.

##  Lưu trữ ảnh, video vào Core Data SQLite Database
Đầu tiên khởi tạo Core Data entity với attribute 'blob'
![](https://images.viblo.asia/64820a57-16fe-4fe6-9a08-d62bd32b25db.png)

loại blob là NSData, do đó hình ảnh cần phải được chuyển đổi thành nhị phân, trước khi nó có thể được lưu. Mã chuyển đổi rất đơn giản:
```Swift
extension UIImage {
    
    var toData: Data? {
        return pngData()
    }
}
```

Truy cập trực tiếp vào Core Data không phải là 1 cách hay, vì vậy chúng tôi triển khai một lớp trừu tượng :
```Swift
class ImageDAO {
    private let container: NSPersistentContainer

    init(container: NSPersistentContainer) {
        self.container = container
    }

    private func saveContext() {
        try! container.viewContext.save()
    }
```

Tiếp theo, thêm các phương thức chèn và tìm nạp thực thể mới được tạo vào Core Data:

```Swift
func makeInternallyStoredImage(_ bitmap: UIImage) -> ImageBlobWithInternalStorage {
    let image = insert(ImageBlobWithInternalStorage.self, into: container.viewContext)
    image.blob = bitmap.toData() as NSData?
    saveContext()
    return image
}

func internallyStoredImage(by id: NSManagedObjectID) -> ImageBlobWithInternalStorage {
    return container.viewContext.object(with: id) as! ImageBlobWithInternalStorage
}
```

## Lưu trữ ảnh, video vào Core Data External Storage
Core Data có tính năng ít được biết đến hơn, cho phép lưu trữ ngoài cho BLOB. Nó sẽ lưu các đối tượng nhỏ vào cơ sở dữ liệu và các đối tượng lớn hơn vào hệ thống tệp. Cách bật nó: từ trình chỉnh sửa mô hình dữ liệu Xcode, chọn thuộc tính Dữ liệu nhị phân và đánh dấu cho phép lưu trữ ngoài:

![](https://images.viblo.asia/5c8a8914-8d9b-4329-9cbb-38cc99195412.png)

External Storage được đặt vật lý trong thư mục Hỗ trợ ứng dụng của ứng dụng, bên cạnh bảng SQLite:

![](https://images.viblo.asia/3e402cb2-fd27-4d8c-af82-106d32cfe4cd.png)
![](https://images.viblo.asia/82ee6fea-2fd9-4820-ae8a-9fcb6e2db4a1.png)

ImageBlobWithExternalStorage trông giống hệt như ImageBlobWithInternalalStorage. Sự khác biệt duy nhất là trong Cho phép lưu trữ bên ngoài Cài đặt lưu trữ bên ngoài cho thuộc tính blob. Mã được bỏ qua cho ngắn gọn và có thể được[ **tìm thấy ở đây**](https://github.com/V8tr/CoreDataImages-Article).

## Lưu trữ ảnh, video vào Core Data dùng Filesystem
Cách này chúng ta sẽ lưu trữ image identifier vào Core Data và ảnh vào trong file system. Đây là lược đồ thực thể mới. Thuộc tính định danh đóng vai trò là chìa khóa cho hình ảnh:

![](https://images.viblo.asia/46f5ab23-3c8e-4376-8f3d-de77a64ddd28.png)

ImageWithFileSystemStorage lưu và tải hình ảnh vào hệ thống tập tin:

```Swift
@objc(ImageWithFileSystemStorage)
public class ImageWithFileSystemStorage: NSManagedObject {

    // 1
    lazy var image: UIImage? = {
        if let id = id?.uuidString {
            return try? storage?.image(forKey: id)
        }
        return nil
    }()
    
    // 2
    var storage: ImageStorage?
    
    // 3
    override public func awakeFromInsert() {
        super.awakeFromInsert()
        id = UUID()
    }
    
    // 4
    override public func didSave() {
        super.didSave()
        
        if let image = image, let id = id?.uuidString {
            try? storage?.setImage(image, forKey: id)
        }
    }
}
```

Hãy cùng nhau thực hiện từng bước như sau:

1> Hình ảnh được lazy load bằng cách sử dụng id làm khóa.

2> ImageStorage lưu và tải hình ảnh vào đĩa. việc lấy ra cần 1 số phương thức sắp viết dưới đây

3> awakeFromInsert là một phương thức vòng đời, được gọi khi NSManagedObject ban đầu được tạo. Nó làm cho một nơi hoàn hảo để khởi tạo id, vì thuộc tính phải được đặt trước khi thực thể được truy cập lần đầu tiên.

4> didSave là một phương thức vòng đời khác, được gọi mỗi lần đối tượng được lưu. Ở đây chúng ta lưu trữ hình ảnh vào hệ thống tập tin.

Tiến hành mở rộng file ImageDAO
```Swift
func makeImageStoredInFileSystem(_ bitmap: UIImage) -> ImageWithFileSystemStorage {
   let image = insert(ImageWithFileSystemStorage.self, into: container.viewContext)
   image.storage = imageStorage
   image.image = bitmap
   saveContext()
   return image
}

func imageStoredInFileSystem(by id: NSManagedObjectID) -> ImageWithFileSystemStorage {
   let image = container.viewContext.object(with: id) as! ImageWithFileSystemStorage
   image.storage = imageStorage
   return image
}
```

## sử dụng
Để tiện cho việc sử dụng chúng ta viết 1 lớp quản lí để tiện cho việc lưu và lấy data

```Swift
final class ImageStorage {
    
    private let fileManager: FileManager

    init(name: String, fileManager: FileManager) throws {
        // In initializer we setup the path and create images directory.
    }
    
    func setImage(_ image: UIImage, forKey key: String) throws {
        guard let data = image.toData() else {
            throw Error.invalidImage
        }
        let filePath = makeFilePath(for: key)
        _ = fileManager.createFile(atPath: filePath, contents: data, attributes: nil)
    }
    
    func image(forKey key: String) throws -> UIImage {
        let filePath = makeFilePath(for: key)
        let data = try Data(contentsOf: URL(fileURLWithPath: filePath))
        guard let image = UIImage(data: data) else {
            throw Error.invalidImage
        }
        return image
    }
}
```

Có thể tham khảo việc sử dụng thông qua project demo sau
[https://github.com/V8tr/CoreDataImages-Article](https://github.com/V8tr/CoreDataImages-Article)

Trên đây là 3 cách để lưu trữ ảnh và video với core data. thực tế thì cả 3 cách này đều cho hiệu quả tương đương nhau nên việc sử dụng 1 trong 3 phương pháp đều đem lại kết quả như ý muốn.
### Tài liệu tham khảo:
https://www.vadimbulavin.com/how-to-save-images-and-videos-to-core-data-efficiently/