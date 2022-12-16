Có khá nhiều cách để lưu trữ dữ liệu local trong iOS app. UserDefaults, Keychain và Core Data là những cách phổ biến để persist data (những dữ liệu vẫn tồn tại trong app dù đã quit app và có thể sử dụng cho lần khởi động app tiếp theo). Vậy làm sao để chúng ta quyết định xem cách lưu trữ nào là phù hợp trong từng trường hợp?
Chúng ta hãy cùng nhau tìm hiểu nhé!

## UserDefaults

Theo tài liệu của Apple, UserDefaults là:

> An interface to the user’s defaults database, where you store key-value pairs persistently across launches of your app.

Những loại dữ liệu nào có thể lưu trữ trong UserDefaults?

> A default object must be a property list—that is, an instance of (or for collections, a combination of instances of) NSData, NSString, NSNumber, NSDate, NSArray, or NSDictionary. If you want to store any other type of object, you should typically archive it to create an instance of NSData.

Trong tài liệu trên có nhắc đến "property list", các bạn có biết nó là gì không?

Chắc hẳn các bạn đã từng nhìn thấy file .plist phải không, plist chính là viết tắt của property list. Thông thường khi khởi tạo 1 project mới, nó sẽ có chứa 1 file Info.plist trong đó:

![](https://images.viblo.asia/47829d92-d394-4ead-a159-ff8b43442160.png)

Khi bạn lưu dữ liệu trong UserDefaults, dữ liệu của bạn sẽ được lưu thành 1 file .plist trong thư mục Library bên trong thư mục app. Chúng ta có thể xem thư mục Library như sau:

```
UserDefaults.standard.set("https://fluffy.es", forKey: "homepage")
UserDefaults.standard.set(false, forKey: "darkmode")

let library_path = NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true)[0]

print("library path is \(library_path)")
```

Build và Run app trên Simulator, sau đó mở Finder và ấn tổ hợp phím: command + shift + G, paste đường dẫn Library và click 'Go' để mở thư mục Library.

![](https://images.viblo.asia/a745f47a-1890-45ac-b1f2-25a30503eb85.png)

Bạn sẽ thấy 2 thư mục, 'Caches' và 'Preferences', file UserDefaults plist sẽ được lưu trong thư mục 'Preferences'.

![](https://images.viblo.asia/430c3452-204c-4015-b895-11c939f1adec.png)

Khi bạn mở .plist file, chúng ta sẽ thấy dữ liệu chúng ta đã được lưu và định dạng của chúng theo key mà chúng ta đã chỉ định:

![](https://images.viblo.asia/c92dc4d2-51e0-4109-936b-5a41e06d73d8.png)

Chúng ta chỉ có thể lưu dữ liệu với các định dạng sau ở trong UserDefaults: NSString, NSNumber, NSData, NSArray, NSDictionary hay NSData. Nếu chúng ta muốn lưu một custom object vào UserDefaults, chúng ta có thể sử dụng Codable và PropertyListEncoder để convert custom object sang NSData.

Trong tài liệu, Apple đã đề cập đến một vài trường hợp sử dụng ví dụ:

> For example, you can allow users to specify their preferred units of measurement or media playback speed. Apps store these preferences by assigning values to a set of parameters in a user’s defaults database.

Bạn có thể sử dụng UserDefaults để lưu thiết lập của users (VD: giá trị của UISwitch, Segmented Control hay Textfield đơn giản).

Bạn cũng có thể lưu những thông tin không nhạy cảm không yêu cầu tính bảo mật cao như giá trị điểm của trò chơi, bài hát đang phát hiện tại,... 

Tránh lưu trữ một số lượng lớn dữ liệu với 1 UserDefaults key, và cũng tránh lưu trữ ảnh (chuyển UIImage sang NSData) trong UserDefaults, vì UserDefaults không hiệu quả khi lưu trữ lượng lớn dữ liệu. Cách tốt hơn để thực hiện điều này là lưu trữ file ảnh (VD: avatar.png) vào thư mục Library của app, sau đó lưu đường dẫn đến hình ảnh (VD: AppFolder/Library/avatar.png) vào UserDefaults, và hiển thị hình ảnh bằng cách sử dụng UIImage(contentsOfFile: savedPath).

Lưu một lượng lớn dữ liệu vào trong UserDefaults có thể gây ảnh hưởng đáng kể đến hiệu suất của ứng dụng khi toàn bộ UserDefaults plist file được load vào memory khi bạn chạy app. Apple cũng đã đề cập đến vấn đề này:

> UserDefaults caches the information to avoid having to open the user’s defaults database each time you need a default value.

## Keychain

Phía trên, chúng ta đã cùng nhau tìm hiểu cơ chế lưu dữ liệu của UserDefaults vào file plist. Sử dụng những ứng dụng như iExplorer, người dùng có thể truy cập vào thư mục Library/Preferences và có thể đọc / chỉnh sửa giá trị của dữ liệu lưu trong UserDefaults plist một cách dễ dàng (VD: Thay đổi giá trị boolean của "boughtProVersion" từ false thành true, hoặc thay đổi số lượng coins). Đừng bao giờ lưu giá trị boolean để kiểm tra rằng user đã mua in-app purchase trong UserDefaults. User có thể thay đổi chúng một cách dễ dàng (không cần phải jailbreak) và sử dụng app của bạn miễn phí.

Nghiêm trọng hơn trạng thái in-app purchase, bạn không nên lưu mật khẩu người dùng / API Keys trong UserDefaults với lý do như trên. Dưới đây là tài liệu của Apple nói về Keychain:

> The keychain services API helps you solve this problem by giving your app a mechanism to store small bits of user data in an encrypted database called a keychain. When you securely remember the password for them, you free the user to choose a complicated one.

Hầu hết Keychain services API được cung cấp bởi Apple được viết bằng C và yêu cầu một số thiết lập để sử dụng. Để đơn giản hóa việc sử dụng Keychain, chúng ta có thể sử dụng một số thư viện ngoài về Keychain như Keychain Access.

Sử dụng thư viện Keychain Access, bạn có thể save / load password như sau:

```
// Save the user password into keychain
let keychain = Keychain(service: "com.yourcompany.yourappbundlename")
keychain["user_password"] = "correcthorsebatterystaple"

// Load the user password
let keychain = Keychain(service: "com.yourcompany.yourappbundlename")
let user_password = keychain["user_password"]
```

Trông thật đơn giản phải không nào! Thư viện Keychain Access đã thực hiện phần lớn việc thiết lập giúp chúng ta.

Bạn nên sử dụng Keychain để lưu trữ những thông tin nhạy cảm, cần tính bảo mật cao như password, keys, certificates,...

Dữ liệu được lưu trong Keychain có thể được truy cập bởi nhiều ứng dụng, miễn là dữ liệu được tạo từ các ứng dụng từ cùng một nhà phát triển. Đó là cách mà SSO (Secure sign on, đăng nhập ở 1 app và sau đó các app khác sẽ tự động đăng nhập) thực hiện trong ứng dụng iOS.

## Core Data

Core Data là một chủ đề lớn trong iOS, một số lập trình viên thích nó, một số thì không, tuy nhiên nó cung cấp nhiều tính năng về saving/loading/using data. Giới thiệu của Apple:

> Core Data is a framework that you use to manage the model layer objects in your application. It provides generalized and automated solutions to common tasks associated with object life cycle and object graph management, including persistence.

Tôi muốn nhấn mạnh rằng Core Data không phải là cơ sở dữ liệu cũng không bao gồm bảng các hàng và cột. Core Data là một framework để quản lý các quan hệ đối tượng và nó có thể lưu dữ liệu theo 4 định dạng:

- SQLite file
- XML file
- Binary file
- In-memory (RAM)

Một ví dụ về ánh xạ quan hệ đối tượng: Order class có thể có nhiều items (Item class), nghĩa là một Order có thể có nhiều items. "Order có nhiều items" là mối quan hệ giữa Order class và Item class.

![](https://images.viblo.asia/8697d680-f787-439c-9d39-557e541f63e9.png)

```
// context of the persistent container of core data (where data is saved)
let context = appDelegate.persistentContainer.viewContext

// create Item of Macbook Air and Mac Mini
let macbookAir = NSEntityDescription.insertNewObject(forEntityName: "Item", into: context) as! Item
macbookAir.name = "Macbook Air"
macbookAir.price = NSDecimalNumber(decimal: 1199.00)
        
let macMini = NSEntityDescription.insertNewObject(forEntityName: "Item", into: context) as! Item
macMini.name = "Mac Mini"
macMini.price = NSDecimalNumber(decimal: 799.00)


// create Order with items Macbook Air and Mac Mini
let order = NSEntityDescription.insertNewObject(forEntityName: "Order", into: context) as! Order
    
order.items = [macbookAir, macMini]

// save the order and its items , so it persist the next time the app is opened
do {
    try context.save()
} catch let error as NSError {
    print("Could not save. \(error), \(error.userInfo)")
}
```

Bên cạnh saving/loading đối tượng với những mối quan hệ, Core Data cũng cung cấp những hàm truy vấn giúp chúng ta có thể lọc dữ liệu mà chúng ta muốn load.

Để ví dụ, chúng ta có thể truy vấn những orders đã hết hạn bằng cách sử dụng NSPredicate trong Core Data:

```
let fetchRequest = NSFetchRequest<Person>(entityName: "Order")
// get overdue orders, ie. dueDate is earlier than current date
fetchRequest.predicate = NSPredicate(format: "dueDate < %@", Date())
do {
  overdueOrders = try managedContext.fetch(fetchRequest)
} catch let error as NSError {
  print("Could not fetch. \(error), \(error.userInfo)")
}
```

Core Data rất phù hợp khi bạn có một danh sách dài dữ liệu (ví dụ: danh sách việc cần làm, danh sách dấu trang, v.v.) để save / load. Đặc biệt nếu dữ liệu của bạn có một số mối quan hệ (ví dụ: Đặt hàng với nhiều mặt hàng), yêu cầu truy vấn / lọc tùy chỉnh (ví dụ: Lấy các mặt hàng dưới mức giá nhất định) hoặc yêu cầu chức năng sắp xếp (sắp xếp dữ liệu được truy xuất theo giá), Core Data có thể xử lý chúng cho bạn.

## Tổng kết

Đây là một hướng dẫn đơn giản giúp bạn trong việc chọn lựa phương pháp để lưu trữ dữ liệu.

Dữ liệu nhạy cảm như passwords, trạng thái in-app purchase (đã mua, chưa mua), số lượng coins,...? Lưu chúng với Keychain.

Dữ liệu tham chiếu có thể thể hiện trên Switch / Action Sheets / Segmented Control ? Lưu chúng với UserDefaults.

Số lượng nhỏ text/number/array data mà không nhạy cảm (VD: điểm cao, level, tên hiển thị) ? Lưu với UserDefaults.

Lượng lớn dữ liệu, hoặc có khả năng sẽ lớn, hoặc thường là list có khả năng để mở rộng (VD: to-do list, posts, comments) ? Lưu chúng với Core Data.

Dữ liệu có thể truy vấn/lọc thường xuyên? Chắc chắn là Core Data rồi.

Hy vọng bài viết trên sẽ hữu ích với bạn, bài viết được dịch từ: https://fluffy.es/persist-data/