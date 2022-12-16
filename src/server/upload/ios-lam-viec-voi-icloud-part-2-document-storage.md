Ở phần trước, chúng ta đã nói về iCloud và một trong những căn bản của nó là **Key-Value Storage**
Ở phần này, chúng ta sẽ tìm hiểu về **Document Storage**, cũng là một fundamental của iCloud.

Documents được lưu trữ trên iCloud server. Nên, chúng ta có thể truy cập vào nó từ nhiều device khác nhau mà không cần đồng bộ hay chuyển tệp một cách rõ ràng, và việc lưu trữ document cũng có các lớp bảo mật, khi điện thoại bị mất, dữ liệu của bạn cũng không mất, nó vẫn tồn tại trên iCloud server.

Chúng ta sẽ tìm hiểu về các mục sau:

* iCloud storing mechanism
* Working with documents
* Initial setup
* Adding/Updating new documents
* Deleting document

### 1. iCloud storing mechanism
Documents được lưu trữ trên iCloud server, và có thể phân phát đến tất cả các thiết bị. Và giống Key-Value, nó cũng được lưu dưới đĩa local trước khi làm việc. Nghĩa là ló cũng không không chuyển một cách trực tiếp lên server, mà phải được lưu dưới local xong sẽ chuyển lên lên iCloud Server nếu khả dụng.

Bất cứ khi nào documents được update trên một thiết bị, nó cũng sẽ được push lên iCloud bằng local daemon. Có sử dụng file coordinator để xử lý conflicts. File coordinator hoạt động giữa ứng dụng và local daemon.

![](https://images.viblo.asia/e14b0742-16af-47c7-849a-1d67c4a042ee.png)

### 2. Working with documents

Nếu iCloud khả dụng và ứng dụng đã cấu hình thành công thì ứng dụng sẽ có thể truy cập vào các directory tự định nghĩa. Local daemon sẽ cập nhật các thay đổi đến directory này. Cách tốt nhất để làm việc với documents là tạo ra những subclass của UIDocument class.

### 3. Initial setup

Turn ON iCloud ở capabilities tab trong Xcode và chọn iCloud Documents và 1 vài cấu hình khác.

![](https://images.viblo.asia/3e6d08dd-a242-4458-896c-870f742ac7ed.png)


Như đã nói ở trên, nếu iCloud available, ứng dụng sẽ truy cập tới các documents ở trong 1 special directory. đây cũng là nơi mà daemon sẽ lấy dữ liệu và push lên iCloud server. Nếu ứng dụng không truy cập được directory này thì đồng nghĩa iCloud không khả dụng với ứng dụng này. Và nó được accessed thông qua URLForUbiquityContainerIdentifier API
```
 let url = FileManager.default.url(forUbiquityContainerIdentifier: String?)
```

Nếu **url** này bằng nil thì nghĩa là không làm việc với iCLoud được. 
**Identifier** này nếu truyền nào thì phải truyền container indentifier, nếu truyền nil thì lấy mặc định.

### 4. Adding/Updating new documents

```
        let doc = UIDocument(fileURL: URL(fileURLWithPath: "document path"))
        doc.fileModificationDate = Date()
        doc.save(to: doc.fileURL, for: UIDocumentSaveOperation.forCreating) { success in
            if success {
                print("Saved")
            }
        }
```

**UIDocumentSaveOperation** có 2 loại. Loại 1 **forCreating** là tạo mới 1 version cho file, loại thứ 2 **forOverwriting** tạo ghi đè lên version hiện tại của file.

Adding và updating dùng chung 1 đoạn code, nếu chưa có document tại đường dẫn đó thì là adding, nếu có rồi thì là updating
Khi adding thì item được thêm vào bộ nhớ local. Còn khi updating 1 document đã có, thì document đó sẽ được update.

### 5. Deleting document
Như đã nói ở mục 1, file coordinator làm nhiệm vụ kết nối giữa ứng dụng và local deamon. Nên khi làm việc với documents thì dùng thêm file coordinator để đảm bảo đồng bộ giữa ứng dụng và local daemon.
```
        let doc = UIDocument(fileURL: URL(fileURLWithPath: "document path"))
        let fileCoordinator = NSFileCoordinator()
        let _ = fileCoordinator.coordinate(writingItemAt: doc.fileURL, options: NSFileCoordinator.WritingOptions.forDeleting, error: nil) { url in
            do {
                try FileManager.default.removeItem(at: url)
                print("Deleted")
            } catch (let error) {
                print("\(error.localizedDescription)")
            }
        }
        
```

Nội dung bài được sưu tầm trên mạng. [Link](https://itechroof.wordpress.com/2016/04/14/icloud-document-storage-part-1-iii/)