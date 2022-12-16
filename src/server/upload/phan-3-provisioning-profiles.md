# Phần 3: Provisioning Profiles

- Trong bài viết trước của series này, chúng ta đã cùng nhau tìm hiểu về certificate và private key cần thiết cho quá trình code signing. Tiếp tục trong series này là bài viết về **Provisioning Profiles** và **entitlements**. Có thể nói trong quá trình code iOS thì Provisioning Profiles được gọi là những gì đau đớn nhất của lập trình viên để có thể code sign. Trước khi đi vào chi tiết thì chúng ta cùng nhau tìm hiểu một số khái niệm liên quan đã nhé.
- Các khái niệm chúng ta sẽ tìm hiểu gồm có:

    1. Team ID
    2. Bundle ID
    3. App ID
    4. Device ID
    5. Entitlements

## I. Khái niệm cơ bản

### 1. Team ID
- Team ID chính là một định danh duy nhất cho một nhóm phát triển. Bạn có thể tìm thấy Team ID này trong trang thông tin dành cho nhà phát triển của Apple.
![](https://images.viblo.asia/ba5649d1-d2ca-4096-9f3b-edcf8eb452ba.png)

- Ngoài việc bạn phải truy cập vào account thì cũng có thể xem Team ID thông development or distribution certification trong keychain bằng command sau:

```
security find-identity -v -p codesigning
```
Các bạn thử đi nhé.

### 2. Bundle ID

- Mỗi một ứng dụng iOS yêu cầu một mã định danh duy nhất để có thể xác định ứng dụng mà không gặp phải sự bối rối hay mơ hồ nào. Mỗi ứng dụng iOS phải đặt số nhận dạng gói duy nhất trong tên miền ngược của công ty hoặc cá nhân (tuỳ vào loại account). ID  có thể được thiết lập trong khi tạo ứng dụng trong iTunes Connect cần được sử dụng trong tệp danh sách thuộc tính của ứng dụng iOS.

- Mỗi target trong ứng dụng iOS nên có một mã định danh duy nhất. Bạn có thể đã từng thấy ID có định dạng com.company_name.com hoặc một cái gì đó như thế này. Trong Xcode, chúng ta có thể thấy ID trong tab General của target.

![](https://images.viblo.asia/e23cfdf5-1aa4-4b86-88fc-27b4e9a5a904.png)

### 3. App ID

- Nói chung, App ID là sự kết hợp giữa Team ID và Bundle ID. Hiện nay mỗi một team có thể phát triển nhiều ứng dụng khác nhau với nhiều bundle ID khác nhau đồng nghĩa với việc có nhiều App ID khác nhau. App ID có thể được sử dụng để xác định một hoặc nhiều ứng dụng. Team ID được Apple cung cấp, trong khi chuỗi tìm kiếm Bundle ID được cung cấp bởi bạn để khớp với Bundle ID của một ứng dụng hoặc một Team ID cho một nhóm ứng dụng của bạn. 
- App ID có hai loại App ID duy nhất cho ứng dụng đơn và App ID Wildcard cho bộ ứng dụng. Bạn có thể đọc thêm về App ID trên tài liệu chính thức của Apple tại [đây](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/AppID.html).

### 4. Device ID

- Mỗi thiết bị iOS có một định danh duy nhất còn được gọi là UDID. Với UDID, mỗi thiết bị iOS có thể được tìm thấy duy nhất. Về cơ bản, UDID có số lượng dài 40 ký tự được tạo thành từ sự kết hợp giữa số và chữ. Giống như các thiết bị, mỗi trình giả lập cũng có UDID duy nhất. Chúng ta có thể tìm thấy UDID thiết bị bằng cách gắn thiết bị với Mac và kết nối iTunes. Có một hướng dẫn tuyệt vời ở đây để tìm hiểu thiết bị UDID bằng iTunes. Bạn có thể chỉ cần lấy UDID của tất cả các thiết bị bằng lệnh sau

```
instruments -s devices
```

- Bạn có thể thấy các thiết bị có tên, phiên bản iOS và UDID trong dấu ngoặc vuông. Nó trông giống như thế này

```
iPhone 6 Plus (11.2) [22B35E0D-C505-4713-8126-80D39A15B34C] (Simulator)
```

### 5. Entitlements (Entitlements and App Sandbox)

- Các ứng dụng iOS có thể tự mình làm mọi thứ, chúng ta phải nói rõ cho ứng dụng biết ứng dụng có thể làm gì hoặc không thể làm gì dưới dạng các quyền lợi. Ứng dụng có quyền làm một số điều mà chúng ta cần xác định trong **hộp cát ứng dụng**. Các hạn chế ứng dụng được quản lý bởi hộp cát. App Sandbox là cơ sở hạ tầng khác với cơ sở hạ tầng code sign, code sign chịu trách nhiệm chạy những gì bên trong hộp cát. Các quyền của ứng dụng được cấu hình để chỉ định tài nguyên nào của hệ thống mà ứng dụng được phép sử dụng và trong tình huống nào. 

- Quyền lợi cũng trao các khả năng và bảo mật của ứng dụng iOS. Các tài nguyên mà ứng dụng được phép sử dụng thường có một số giá trị mặc định nhưng chúng luôn bị vô hiệu hóa. Các nhà phát triển ứng dụng phải kích hoạt chúng một cách rõ ràng. Các giá trị quyền lợi thường được sử dụng là iCloud, APNS, Apple Pay và App Sandbox và nhiều hơn nữa.

- Chúng ta có thể kích hoạt các quyền trong tab capabilities của Xcode cho một target cụ thể. Bạn chỉ nên kích hoạt những quyền lợi mà bạn cần. Điều này ngăn chặn mã độc xâm nhập vào ứng dụng

![](https://images.viblo.asia/675f4605-a024-4cc9-9322-26117d93e762.png)

## II. Provisioning Profiles

- Vào lúc này, bạn phải tự hỏi tại sao chúng ta cần biết tất cả những điều trên để biết Provisioning profiles. Câu trả lời ngắn gọn là Provisioning profiles là sự kết hợp của tất cả những điều mà chúng ta đã thấy cho đến nay. Về cơ bản, nó bao gồm mọi thứ từ certificate, App ID, Device ID. Cấu hình cung cấp xác định quy tắc để chạy ứng dụng bên trong thiết bị. Vai trò của nó là xác nhận rằng
    1. Ứng dụng cụ thể có App ID
    2. Ứng dụng có App ID đó có thể chạy trên một số thiết bị có trong provisioning profiles. Provisioning profiles phát triển có danh sách các thiết bị được bao gồm.
    3. Ứng dụng chỉ nên có những quyền lợi được xác định trong provisioning profiles
    4. Ứng dụng chỉ có thể chạy dựa trên certificates được nhúng trong provisioning profiles.

## III. Creating Provisioning Profile

- Có rất nhiều provisioning profiles. Nó có App ID, UDID, quyền lợi và certificates. Chúng ta sẽ hiểu điều này tốt hơn khi chúng ta tạo provisioning profiles từ trang thông tin dành cho nhà phát triển của Apple. Provisioning profiles có thể dễ dàng được tạo:

![](https://images.viblo.asia/9a79d4e5-cf1b-4587-abe4-faf3b727f7f8.png)

- Lưu ý rằng, chúng ta đang tạo cho mục đích phát triển. Bước tiếp theo sẽ hỏi bạn ứng dụng nào bạn muốn tạo. Chúng ta cần chọn App ID
- Chúng ta đã cung cấp thông tin về ID ứng dụng. Trong bước tiếp theo, chúng ta cần chỉ định các thiết bị sẽ sử dụng nó.
- Bước cuối cùng chỉ việc download nó thôi
- Như đã đề cập trước đó, chúng ta đã cung cấp tất cả các chi tiết như App ID, certificates, Thiết bị và quyền lợi để tạo provisioning profile. Bây giờ bạn nên hiểu lý do tại sao chúng ta cần biết thêm về những điều này trước bên trên đã đề cập.

## IV. Inside Provisioning Profile
- Vị trí lưu
```
~/Library/MobileDevices/Provisioning Profiles
```
- Thông tin chi tiết có thể được xem bằng cách sử dụng command sau
```
cd ~/Library/MobileDevice/Provisioning\ Profiles/
security cms -D -i xxxxxxxx_your_pp_id.mobileprovision
```
- Sau khi thực hiện các command trên bạn có thể biết thêm một số thông tin 
```
App ID Name
Creation Date
Platform
Developer Certificates
Entitlements
Expiration Date
Provisioned Devices
Team Identifier
Team Name
Version
```

Bạn nào đọc tới đây tức là đã gần hết series này rồi, có lẽ trong bài viết sau mình sẽ đi chi tiết về việc sử dụng nó trong ứng dụng.
Cám ơn các bạn đã đọc, hãy cùng đợi bài viết sau nhé.