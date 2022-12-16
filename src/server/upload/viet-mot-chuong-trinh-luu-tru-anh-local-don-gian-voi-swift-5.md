# Giới thiệu
Việc lưu trữ ảnh và quản lý dưới local là một tác vụ hết sức quan trọng trong các ứng dụng có liên quan tới ảnh.
Việc lưu trữ này cho phép:
- Không phải tải lại ảnh nhiều lần đối với các ứng dụng sử dụng ảnh trên mạng.
- Lưu lại các ảnh trung gian thay vì duy trì trên bộ nhớ đối với các ứng dụng xử lý ảnh.

Mục đích của bài viết này là từng bước xây dựng một chương trình đơn giản cho phép xử lý 2 tác vụ sau:
- Lưu trữ ảnh trên local
- Tìm kiếm các ảnh đã lưu trữ trước đó


# Mô tả các phương thức và cấu trúc dữ liệu
Như đã đề cập ở mục trên, ứng dụng sẽ gồm 2 chức năng chính:
- Lưu trữ ảnh trên local (**store**)
- Tìm kiếm các ảnh đã lưu trữ trước đó (**retrieveImage**)

Ứng dụng cho phép lưu trữ và tìm kiếm ảnh theo 2 cơ chế:
- Sử dụng **UserDefaults**
- Sử dụng **File System**

Ta sẽ định nghĩa enum **StorageType** để phân biệt 2 phương thức này
```
enum StorageType {
    case userDefaults
    case fileSystem
}
```

Phương thức **store** cho phép người dùng lưu trữ ảnh trên local
```
private func store(image: UIImage, forKey key: String, withStorageType storageType: StorageType) {
    if let pngRepresentation = image.pngData() {
        switch storageType {
        case .fileSystem:
            // Save to disk
        case .userDefaults:
            // Save to user defaults
        }
    }
}
```
- **image**: ảnh đầu vào sẽ ở dạng **UIImage** và sẽ được chuyển về dạng binary để lưu trữ
- **key**: tên của ảnh để hỗ trợ cho việc tìm kiếm sau này
- **storageType**: phương thức lưu trữ (userDefaults | fileSystem)

Phương thức **retrieveImage** cho phép tìm kiếm các ảnh đã lưu trữ trước đó:
```
private func retrieveImage(forKey key: String, inStorageType storageType: StorageType) {
    switch storageType {
    case .fileSystem:
        // Retrieve image from disk
    case .userDefaults:
        // Retrieve image from user defaults
    }
}
```
- **key**: tên của ảnh cần tìm kiếm
- **storageType**: phương thức lưu trữ (userDefaults | fileSystem)


# Lưu trữ và tìm kiếm ảnh sử dụng UserDefaults
Việc lưu trữ và tìm kiếm ảnh với UserDefaults được thực hiện hết sức đơn giản
- Để lưu trữ ta cần chuyển UIImage sang Data và lưu trữ theo API của UserDefaults
```
private func store(image: UIImage, forKey key: String, withStorageType storageType: StorageType) {
    if let pngRepresentation = image.pngData() {
        switch storageType {
        case .fileSystem:
            // Save to disk
        case .userDefaults:
            UserDefaults.standard.set(pngRepresentation, forKey: key)
        }
    }
}
```

- Đới với việc tìm kiếm ta cần thức hiện theo trình tự ngược lại chuyển từ Data sang UIImage
```
private func retrieveImage(forKey key: String, inStorageType storageType: StorageType) {
    switch storageType {
    case .fileSystem:
        // Retrieve image from disk
    case .userDefaults:
        if let imageData = UserDefaults.standard.object(forKey: key) as? Data, 
            let image = UIImage(data: imageData) {
            
            return image
        }
    }
}
```

# Lưu trữ và tìm kiếm ảnh sử dụng File system
Đối với việc lưu trữ sử dụng File System, ta sẽ sử dụng **đường dẫn file** làm khóa lưu trữ và tìm kiếm.

Ta sẽ có một hàm tiện ích để chuyển đổi từ khóa sang "đường dẫn file"
```
private func filePath(forKey key: String) -> URL? {
    let fileManager = FileManager.default
    guard let documentURL = fileManager.urls(for: .documentDirectory,
                                            in: FileManager.SearchPathDomainMask.userDomainMask).first else { return nil }
    
    return documentURL.appendingPathComponent(key + ".png")
}
```

- Phương thức lưu trữ sẽ được thực thi như sau:
```
private func store(image: UIImage,
                    forKey key: String,
                    withStorageType storageType: StorageType) {
    if let pngRepresentation = image.pngData() {
        switch storageType {
        case .fileSystem:
            if let filePath = filePath(forKey: key) {
                do  {
                    try pngRepresentation.write(to: filePath,
                                                options: .atomic)
                } catch let err {
                    print("Saving file resulted in error: ", err)
                }
            }
        case .userDefaults:
            UserDefaults.standard.set(pngRepresentation,
                                        forKey: key)
        }
    }
}
```

- Phương thức tìm kiếm sẽ được thực thi như sau:
```
private func retrieveImage(forKey key: String,
                            inStorageType storageType: StorageType) -> UIImage? {
    switch storageType {
    case .fileSystem:
        if let filePath = self.filePath(forKey: key),
            let fileData = FileManager.default.contents(atPath: filePath.path),
            let image = UIImage(data: fileData) {
            return image
        }
    case .userDefaults:
        if let imageData = UserDefaults.standard.object(forKey: key) as? Data,
            let image = UIImage(data: imageData) {
            return image
        }
    }
    
    return nil
}
```

# Giao diện của chương trình.
Giờ ta sẽ tiến hành ghép các hàm xử lý đã xây dựng ở trên vào giao diện của chương trình.

Phần giao diện sẽ hoạt động như sau:
- Ta sẽ tải ảnh từ một URL do người dùng nhập vào
- Sau đó lưu ảnh đó dưới local
- Sau đó tải lại ảnh này dưới local và hiển thị lên UIImageView

![](https://images.viblo.asia/98664022-12ed-4630-8cb6-f6c25c53bea1.PNG)

Khi đó phần xử lý cho nút Save Image sẽ như sau:
```
@IBAction func onSaveTouch(_ sender: Any) {
    if let imageData = self.saveImage.image {
        DispatchQueue.global(qos: .background).async {
            self.store(image: imageData,
                       forKey: "test",
                       withStorageType: .userDefaults)
        }
    }
}
```

Phần xử lý cho nút Load Image sẽ như sau;
```
@IBAction func onLoadTouched(_ sender: Any) {
    DispatchQueue.global(qos: .background).async {

        if let tempImage = self.retrieveImage(forKey: "test", inStorageType: .userDefaults) {
            DispatchQueue.main.async {
                self.loadImage.image = tempImage
            }
        }
    }
}
```

# Nguồn tham khảo và chương trình demo
- Nguồn tham khảo: https://programmingwithswift.github.io/posts/save-images-locally-swift-5/?fbclid=IwAR0_u2m37vHDZM10jjoPFgBR1VFcN0DIrKYbnTHhQhGC1s2MmmTWVh0tJMg
- Chương trình demo: https://github.com/oLeThiVanAnh/R6_2019