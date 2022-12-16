## 1. iCloud Data Storage Services

Version hiện tại của iOS hỗ trợ 3 kiểu lưu trữ dựa trên iCloud:

- **iCloud Document Storage**: cho phép file và dữ liệu trên thiết bị của người dùng được lưu trữ trên iCloud. Khi đã lưu trữ lên iCloud, file dữ liệu sau đó có thể được truy xuất từ iCloud thông qua bất kì thiết bị hoặc nền tảng nào sử dụng tài khoản iCloud

- **iCloud Key-Value Data Storage**: là dịch vụ cho phép một số lượng nhỏ gói dữ liệu với định dạng key/value để lưu trữ trên cloud.Dịch vụ này nhằm cung cấp cách thức cho cùng một ứng dụng đồng bộ thông tin cấu hình hoặc trạng thái trong ứng dụng trên nhiều thiết bị. Ví dụ cùng một game cài đặt trên cả iPhone và iPad, có thể sử dụng iCloud key-value Storage để đồng bộ vị trí hiện tại của người chơi trong game, hay đồng bộ điểm số của người chơi, từ đó cho phép người dùng chuyển đổi qua các thiết bị khác nhau mà vẫn đồng bộ được trạng thái

- **CloudKit Data Storage**: cho phép ứng dụng truy cập vàl iCloud server của Apple và cung cấp một các thức đơn giản để lưu trữ, quản lý, truy cập dữ liệu và các kiểu tài nguyên khác (ví dụ như file binary kích thước lớn, video, ảnh) được tổ chức có cấu trúc. Dịch vụ này cho phép ngừoi dùng lưu trữ dữ liệu riêng tư và truy cập chúng trên nhiều thiết bị

## 2. Chuẩn bị cho một ứng dụng sử dụng dịch vụ lưu trữ iCloud

Để một ứng dụng có thể sử dụng dịch vụ iCloud cần bật tính năng hỗ trợ dịch vụ iCloud cho ứng dụng đó trên App ID. Ngoài ra cũng cần enable tính năng hỗ trợ iCloud trong settings entitlements. Cả 2 bước này ta đều có thể thực hiện ở màn hình Capabilities trong xCode.

Lập trình viên iOS nếu chưa phải thành viên trả phí của iOS Developer Program cần enrol trước khi có thể triển khai bất kì chức năng iCloud nào

## 3. Bật iCloud cho một ứng dụng
## 
Để bật tính năng iCloud cho một ứng dụng, mở project bằng xCode và chọn target là tên ứng dụng ở trên cùng trong project navigator panel. CHọn tab Capabilities và bật tính năng iCloud suppport, chọn một Development Team
![](https://images.viblo.asia/871650d8-9e1c-4fe4-8997-aca0976c4f03.png)

iCloud capabilities section cung cấp lựa chọn để bật dịch vụ Key-Value Storage, iCloud Document, CloudKit. Bật dịch vụ iCloud sẽ tự động thoeem iCloud entitlement vào AppID của ứng dụng, đồng thời tạo một file entitlements trong project chứa định danh iCloud container của app 

 

## 4.Review iCloud entitlements file: 

Khi một iCloud capabilities được enable trong ứng dụng bằng xCode, một file mới sẽ xuất hiện trong project với tên <tên ứng dụng>.entitlements. Bất kì ứng dụng nào muốn sử dụng tính năng iCloud bằng bất cứ cách nào cần có entitlements phù hợp với chức năng iCloud muốn sử dụng. Các entitlement được chứa trong file entitlement và được tích hợp vào ứng dụng khi biên dịch. 

## 5. Quản lý file sử dụng UIDocument

Sử dụn iCloud để lưu trữ file cần biết căn bản về lớp UIDocument.

UIDocument class được giới thiệu từ iOS 5 và là cơ chế được đề suất để làm việc với dịch vụ lưu trữ file và tài liệu trên iCloud

### 5.1 Sơ lược về lớp UIDocument

UIDocument class được thiết kế để cung cấp các phương thức đơn giản phục vụ cho việc tạo và quản lý tài liệu và nội dung. Ngoài ra UIDocument class cũng hỗ trợ đọc ghi dữ liệu bất đồng bộ sử dụng background queue, xử lý conflict trên file, tự động lưu tài liệu (automatic document saving)

### 5.2 Subclassing the UIDocument Class

UIDocument là một lớp trừu tượng nên không thể tạo instance trực tiếp. Thay vào đó phải tạo một subclass của UIDocument và override lại phương thức:

· contents(forType:)
## 6. Tổng kết
Trên đây là cái nhìn sơ lược về icloud được mình tổng hợp lại. Bài viết còn nhiều thiếu sót mong các bạn nhiệt tình góp ý. Cảm ơn đã chú ý theo dõi. Cám ơn và hẹn gặp lại.