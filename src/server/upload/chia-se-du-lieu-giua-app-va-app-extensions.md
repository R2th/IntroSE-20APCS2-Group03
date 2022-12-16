Đây là bài dịch từ trang [medium.com](https://medium.com/), mời các bạn xem bài gốc tại đây: https://medium.com/macoclock/data-sharing-between-app-and-app-extensions-4ffd95bf87e0
Trước khi bắt đầu, chúng ta cần biết cách **App Extension** hoạt động như thế nào. 

Một **App Extension** là một **App**, được tạo ra từ phần mở rộng và nằm trong một **Containing App**. **Containing App** chính là ứng dụng của chúng ta. Để chạy các **App Extension**, Apple đã cài đặt sẵn các ứng dụng, các ứng dụng này được gọi là **Host App** (ví dụ: ứng dụng *Messages* sẽ sử dụng *Sticker Pack Extension*)

![Hình ảnh từ developer.apple.com](https://images.viblo.asia/cbb3807f-97ac-4ab3-ae5f-5fb38e484d83.png)

Thư mục cấu trúc của **Containing App** (ứng dụng mà chúng ta đang tạo) sẽ như ảnh sau:

![Hình ảnh từ developer.apple.com](https://images.viblo.asia/4b35cd45-a1da-4410-bb36-1e84e0f61448.png)

Một ứng dụng không thể truy cập dữ liệu nằm ngoài thư mục của ứng dụng đó, vì các chính sách và lý do bảo mật. Nhưng để hỗ trợ cho **App Extension**, Apple đã cung cấp một cơ chể để chia sẻ tài nguyên được gọi là **App Group**

![Hình ảnh từ developer.apple.com](https://images.viblo.asia/892c5bac-1b79-4c0d-9de7-fc7da9d1aa23.png)

**App Group** chỉ hoạt động khi chúng ta cho phép nó hoạt động trong **Containing App** và **App Extension**, bằng cách cấu hình trên *App Developer Portal*.
#### Tạo App Group
Chọn *App or App Extension* => *signing & capabilities* => Bấm vào nút +

![](https://images.viblo.asia/191a1f35-719f-460e-a346-b2ee5849bc74.png)

Thêm **App Group**, trông nó sẽ như ảnh dưới đây:

![](https://images.viblo.asia/01fecca3-3647-4469-8c11-56954b34f5e9.png)

Bấm vào nút +, bạn sẽ thấy một màn hình nhập tên group như sau:

![](https://images.viblo.asia/06038bd5-b188-4365-bd4d-750788aabb6b.png)

Chúng ta vừa hoàn thành việc tạo ra một **App Group** mới. Để tiếp tục, hãy chắc chắn **Containing App** và **App Extension** có cùng App Group giống nhau.
#### Chia sẻ dữ liệu
**User Defaults**, chúng ta có thể khởi tạo **User Defaults** với một *suiteName*, trong đó *suiteName* chính là App Group chúng ta vừa tạo ở bước trên.
```
let sharedDefault = UserDefaults(suiteName: "APP_GROUP_IDENTIFIER")!

// Write Data: 
 sharedDefault.set("mySharableData", forKey: "keyForMySharableData")
 
//Read Data:
 let mySharableData = sharedDefault.object(forKey: "keyForMySharableData")
```
#### Ghi/đọc/chia sẻ tập tin 
Sử dụng *containerURLForSecurityApplicationGroupIdentifier*, đây là đường dẫn dẫn tới dữ liệu được chia sẻ. Chúng ta có thể ghi và đọc các tập tin cần chia sẻ trong thư mục với đường dẫn này.
```
func sharedDirectoryURL() -> URL {
  let fileManager = NSFileManager.defaultManager()
  return fileManager.
          containerURLForSecurityApplicationGroupIdentifier
          ("APP_GROUP_IDENTIFIER")! 
}
```
#### Chia sẻ thông qua Core Data
Để chia sẻ dữ liệu qua Core Data, chúng ta cần thay đổi đường dẫn thư mục lưu trữ thành đường dẫn group chia sẻ, trong quá trình tạo *persistentStoreCoordinator* như sau:
```
//sharedDirectoryURL is defined above
try persistentStoreCoordinator.addPersistentStore(
              ofType: NSBinaryStoreType,
              configurationName: nil,
              at: sharedDirectoryURL().appendingPathComponent("<>"),
              options: nil
            )
```
#### Chia sẻ bộ nhớ đệm của NSURLSession
Chúng ta chỉ cần thiết lập *sharedContainerIdentifier* là App Group được tạo ra ở bước 1.
```
et configuration = URLSessionConfiguration.background(
      withIdentifier: "session identifier"
 )
 configuration.sharedContainerIdentifier = "APP_GROUP_IDENTIFIER"
 let mySharedSession = URLSession(configuration: configuration)
```

Các bạn có thể tham khảo thêm thông tin ở đây:
https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1
https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionOverview.html
https://developer.apple.com/videos/play/wwdc2015/224/