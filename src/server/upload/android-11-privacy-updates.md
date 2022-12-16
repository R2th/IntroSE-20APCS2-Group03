## 1. Tìm hiểu khái quát về Scoped Storage (Bộ nhớ phạm vi)

   Scoped Storage được ra mắt từ những ngày đầu thử nhiệm trên Android 10. Nó được sinh ra để hạn chế 
quyền truy cập bộ nhớ (READ_EXTERNAL_STORAGE) từ những nhà phát triển.
Sự thay đổi này ban đầu dự kiến áp dụng cho các thiết bị từ Android 10 trở lên , nhưng do sự phản đối từ
các nhà phát triển, nên Scoped Storage chỉ được áp dụng cho các ứng dụng Target API 29 (Android 10). Nhưng đến Android
11 thì Scoped Storage đã được áp dụng lại và chưa có kế hoạch thay đổi từ Google.

![](https://images.viblo.asia/ec5e4764-8c08-4182-bc18-00b80e4a5f74.png)

   Những ứng dụng triển khai Scoped Storage chỉ có thể truy cập vào Directory của ứng dụng hay các file mà ứng dụng tạo ra.
   Bạn sẽ bị hạn chế quyền truy cập với bộ nhớ hệ thống , nhưng với các file trong thư mục ứng dụng của bạn thì có thể truy cập và sửa đổi 
   mà không cần quyền.
   
###    Tại sao cần áp dụng Scoped Storage ?

   Thay vì các nhà phát triển có thể xin cấp quyền truy cập data system dễ dàng thì Scoped Storage cung cấp những hạn chế 
   nhất định khiến dữ liệu không thể dễ dàng được truy cập. Các nhà phát triển sẽ dùng các storage APIS để truy cập vào những thư mục 
   cần thiết.
   
## 2. Android 11 Privacy Updates

### 1. Storage

   App target API 29 vẫn có thể request quyền  `requestLegacyExternalStorage = true` , nhưng khi app target Android 11 , hệ thống sẽ bỏ qua 
   quyền này . Lúc này ứng dụng của bạn phải thực thi Scoped Storage và `migrate app data` tới các thư mục tương thích với Scoped Storage.
   
*Chú ý : Ứng dụng targets API 30 không thể truy cập các thư mục qua `File Path` , mà sẽ qua `Uri`*
    
**Media file access**

   Android 11 cung cấp một số phương thức để xin quyền User giúp truy cập và quản lí Media File dễ dàng hơn .
   
   `createWriteRequest()`
   
   Cho phép ứng dụng có quyền truy cập ghi vào các nhóm media file nhất định
   
  `createFavoriteRequest()`
  
  Di chuyển thư mục vào danh sách yêu thích của thiết bị
   
   `createTrashRequest()`
   
   Di chuyển thư mục vào device'trash , thư mục sẽ bị xóa vĩnh viễn sau 1 khoảng thời gian nhất định.
   Tuy nhiên ta có thể remove chúng khỏi trash
   
   `createDeleteRequest()`
   
   Xóa vĩnh viễn thư mục 
   
  Syntax sample :
 ```Kotlin
val uriList: List<Uri> = "List of content URIs"
 val editPendingIntent = MediaStore.createWriteRequest(contentResolver,
    uriList)
startIntentSenderForResult(editPendingIntent.intentSender, REQUEST_CODE,
null, 0, 0, 0)
```
   
  **Access to data from other apps**
  
  Các ứng dụng target API 30 không thể truy cập vào đường dẫn thư mục của các ứng dụng khác . Kể cả khi các ứng dụng đó target API 27 hoặc thấp 
  hơn.
  
 **Access to directories**
 
 Bạn không còn dùng action `ACTION_OPEN_DOCUMENT_TREE` để truy cập vào các thư mục sau :
 - Thư mục gốc của internal storage
 - Thư mục gốc của từng thẻ SD mà nhà cung cấp cho là đáng tin cậy
 - Thư mục Download

### 2. Permission

 **One-time permission**
 
 Từ Android 11 trở đi , khi ứng dụng yêu cầu xin quyền liên quan tới location, microphone, or camera. Dialog xin quyền sẽ hiển thị thêm option
 `Only this time` để chấp nhận quyền sử dụng 1 lần 
 
 ![](https://images.viblo.asia/ae2a3475-2d4f-4eaf-9130-361479928fad.png)

**Auto-reset permissions from unused apps**

Từ Android 11 trở lên , hệ thống bảo vệ dữ liệu người dùng sẽ tự động reset lại những quyền mà trước đó đã được cấp khi ứng dụng không được
sử dụng trong vài tháng.

**Permission dialog visibility**

Từ Android 11 trở đi , khi người dùng click "Deny" trong dialog xin quyền **nhiều hơn một lần** trong suốt thời gian ứng dụng được cài đặt , hành động
này sẽ được ngầm hiểu là "Don't ask again" và dialog sẽ không hiển thị những lần tiếp theo nữa.

### 3. Phone numbers

Android 11 đã thay đổi những quyền liên quan tới phone , những quyền được sử dụng để truy cập số điện thoại
Từ Android 11 trở đi , để truy cập quyền Phone Number , ứng dụng phải xin quyền `READ_PHONE_NUMBERS` thay vì quyền `READ_PHONE_STATE`

- Phương thức `getLine1Number()` xuất hiện ở cả 2 class **TelephonyManager** và **TelecomManager**
- Phương thức getMsisdn() không được hỗ trợ ở class **TelephonyManager**