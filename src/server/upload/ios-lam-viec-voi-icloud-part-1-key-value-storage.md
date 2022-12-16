# I. Giới thiệu iCloud
iCloud là một dịch vụ miễn phí giúp cho người dùng có thể truy nhập các nội dung cá nhân trong tất cả các thiết bị của họ(iPhone, iPad, Macbook,...) một cách tự động và có tính bảo mật bằng Apple ID.


Hiện nay làm việc với iCloud thì Apple hỗ trợ ba dịch vụ: key-value storage, document storage và CloudKit. Mỗi dịch vụ có phạm vi và chức năng riêng, tuỳ vào tình huống cụ thể của ứng dụng mà chúng ta sử dụng chúng một cách phù hợp.

Tương ứng với ba loại dịch vụ trên thì có bốn loại APIs cụ thể sau: 
* **Key-Value storage:** lưu trữ những dữ liệu nhỏ; tham chiếu, cấu hình hoặc trạng thái của ứng dụng.
* **Document storage:** lưu thông tin các file dữ liệu, bản vẽ, các trạng thái ứng dụng phức tạp.
* **Core Data storage:** lưu các thông tin của các class kiểu Core Data dưới app lên server, dùng thông qua iCloud document storage và dùng chung iCloud APIs.
* **CloudKit storage:** quản lý các cấu trúc dữ liệu trên iCloud và chia sẻ dữ liệu với các user khác

Trong đó Key-Value và Document là  Fundamentals của iCloud

# II. Key-Value Storage
Lưu trữ những giá trị trên iCloud cho app preferences, app configuration, hoặc app state. **Key-Value storage** tương tự như dữ liệu User Defaults dưới local, chỉ khác một điều là những dữ liệu này có thể được truy cập trên tất cả các thiết bị khác nhau với điều kiện đang đăng nhập cùng một tài khoản iCloud. Khi một thiết bị thay đổi một giá trị bất kỳ, thì những thiết bị khác có thể thấy và update nó.
![](https://images.viblo.asia/2bead763-48e6-4b4f-b414-07417314a49a.png)iCloud key-value storage access

Giống như một đối tượng **UserDefaults**, sử dụng iCloud key-value storage để lưu các giá trị kiểu như: NSNumber, NSString, NSDate, NSData, NSArray và NSDictionary. 
Chúng ta làm việc thông qua **NSUbiquitousKeyValueStore** class, nó cung cấp các methods để làm việc với key-value storage.

**1. Cấu hình trong Target**


Trước khi sử dụng được Key-Value Storage, ứng dụng phải có entitlement thích hợp và được cấu hình trong Xcode

![](https://images.viblo.asia/eb2749f1-6d86-460a-8a23-75cb3af947c3.png)

**2. Lắng nghe sự thay đổi khi khởi động ứng dụng**
Chúng ta lắng nghe sự thay đổi data trên iCloud lúc khởi động xong app.

application: didFinishLaunchingWithOptions: trong AppDelegate

* Objective-C:
```
    //Listen changes
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector (storeDidChange:)
                                                 name:NSUbiquitousKeyValueStoreDidChangeExternallyNotification
                                               object:[NSUbiquitousKeyValueStore defaultStore]];
    [[NSUbiquitousKeyValueStore defaultStore] synchronize];
```
* Swift 3:
```
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(didChangeData),
                                               name: NSUbiquitousKeyValueStore.didChangeExternallyNotification,
                                               object: NSUbiquitousKeyValueStore.default())
        NSUbiquitousKeyValueStore.default().synchronize()
```

Giải thích: Đăng kí lắng nghe notification kiểu **externally** có tên là:
**NSUbiquitousKeyValueStoreDidChangeExternallyNotification**(Objective-C) hoặc
**NSUbiquitousKeyValueStore.didChangeExternallyNotification** (Swift 3)
Để chắc chắn lấy được dữ liệu mới nhất( keys và values) thì gọi thêm **synchronize** method.

**3. Sync một dữ liệu lên key-value store**
```
     // Objective-C
        NSUbiquitousKeyValueStore *ukvs = [NSUbiquitousKeyValueStore defaultStore];
        [ukvs setData: customData forKey: CustomKey];
        [ukvs synchronize];
    
    //Swift
        let ukvs = NSUbiquitousKeyValueStore.default()
        ukvs.set(customData, forKey: CustomKey)
        ukvs.synchronize()
```
    
Khi một device muốn ghi một giá trị lên key-value storage, iCloud sẽ check xem hiện tại có gì mới từ key-value storage của các thiết bị khác hay là không. 

Nếu không có thay đổi gì mới, thì NSUbiquitousKeyValueStore sẽ ghi những giá trị đang chờ đó từ local lên trên server. 

Nếu mà có thay đổi thì sẽ không tiến hành ghi từ local lên server mà nó sẽ generate 1 didChangeExternallyNotification notification để bắt buộc ứng dụng phải update những giá trị từ server trước đã. 

**4. Giới hạn dữ liệu**

Tổng dung lượng của key-value storage là 1MB, chứa nhiều nhất là 1024 keys và giới hạn mỗi value cho mỗi key là 1MB. Nghĩa là nếu bạn có 1KB cho dữ liệu mỗi key thì bạn có thể lưu được 1000 keys, tương tự, nếu bạn có 1 value 1MB thì bạn chỉ lưu được 1 key.

Độ dài mỗi key là 64 bytes UTF-8 encoding.

Khi mà ứng dụng của bạn vượt quá dung lượng giới hạn đó, thì iCloud key-value sẽ post một notification có tên là NSUbiquitousKeyValueStoreQuotaViolationChange  để báo cho mình biết.

Chú ý, nếu bạn muốn lưu một NSData lên key-value storage thì phải chú ý đến vấn đề giới hạn dung lượng dữ liệu này. 

**5. Những tình huống tránh dùng key-value storage**

Những ứng dụng khi lên Store thì nên có key-value storage, nhưng có một vài loại dữ liệu không thích hợp cho nó như là thông tin trạng thái của current page, current selection.
Tránh việc dùng key-value storage cho những dữ liệu cần thiết đến hành vi của app khi offline, thay vào đó hãy lưu chúng trực tiếp vào user default database.