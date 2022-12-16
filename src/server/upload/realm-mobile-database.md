## I. Realm là gì?
Ngày nay, việc phát triển ứng dụng di động đang trở thành xu hướng và phổ biến khắp mọi nơi. 
Trong mỗi ứng dụng thì phần quan trọng không kém chính là Cơ sở dữ liệu. CSDL phổ biến nhất được sử dụng hiện nay trên hầu hết các thiết bị là SQLite bởi vì nó khá quen thuộc với đại đa số các lập trình viên do sử dụng câu truy vấn SQL.  Tuy nhiên, SQLite cũng có những mặt hạn chế nhất định như tốc độ truy vấn khá chậm khi mà dữ liệu phình to ra cũng như khi mà thực hiện phép JOIN.
Trên cơ sở đó, Realm Mobible Database ra đời với mục đích cung cấp cho lập trình viên một lựa chọn có thể thay thế cho SQLite hiện nay nhưng vẫn đảm bảo mọi chức năng cần thiết của một CSDL thông thường:
* Realm Moblie Database ( gọi tắt là RMD) là một NoSQL ( Not Only SQL). Nó hướng tới việc xây dựng một ứng dụng theo hướng Offline database first. Điều này có nghĩa là ứng dụng vẫn có thể hoạt động dù cho không có kết nối mạng, dữ liệu sẽ được lưu trực tiếp trên thiết bị, người dùng vẫn có thể tiến hành mọi việc một cách thuận lợi.
* RMD lưu trữ dữ liệu dưới dạng Object và nó cũng cung cấp các hàm và phương thức để có thể truy vấn dữ liệu mà không cần thông qua câu truy vấn SQL.
* Phần core của RMD được viết bằng C++ và là mã nguồn mở, người dùng có thể tùy chỉnh lại theo ý muốn cá nhân.
* Cross-flatform và  đã có phiên bản cho các ngôn ngữ sau: Swift, Java, Objective – C, Xamarin, React Native.
* Cung cấp miễn phí.
## II. Điểm mạnh của Realm Mobile Database
1. Dễ cài đặt và sử dụng
* RMD khá dễ cài đặt và sử dụng. Đối với IOS, chúng ta có thể sử dụng thư viện quản lý CocoaPods để cài đặt và sử dụng.
* Để sử dụng RMD, chúng ta chỉ cần tạo một class như bình thường, và kế thừa từ class “Object” của RMD.
2. Tốc độ truy vấn nhanh.
* RMD được tối ưu hóa để sử dụng bộ nhớ một cách ít nhất nhưng hiệu suất vẫn vượt trội so với các CSDL khác.
* Dưới đây là bảng so sánh tốc độ của Realm so với các CSDL khác.
```
// Using Realm in Swift

var mydog = Dog(); mydog.name = "Rex"; mydog.age = 9

let realm = RLMRealm.defaultRealm()

realm.beginWriteTransaction()

realm.addObject(mydog)

realm.commitWriteTransaction()

var results = Dog.objectsWhere("name contains 'Rex'")
```
Không giống như một số các database khác, bạn có thể sử dụng trực tiếp bên trong ứng ựng IOS của ban (hoặc là với những ứng dụng Android) để lưu và truy vấn dữ liệu cục bộ trên thiết bị, cho phép bạn xây dựng các ứng dụng nhanh hơn.
Chúng ta đã thấy nhiều thư viện cố gắng cung cấp các chức năng và tốc độ giống SQLite.Nhưng trái lại Realm nhanh hơn một số xử lý SQLite.

**Counts**
![](https://images.viblo.asia/b3e632b7-b555-4a7e-ae33-7fa0af021322.png)
**Queries**
![](https://images.viblo.asia/4a17a029-9898-4a79-ae3a-30fae69a1ca5.png)
**Insert**
![](https://images.viblo.asia/340a88e9-dc8e-4f21-92c4-894cb7356491.png)
Hiệu xuất của Realm đến từ việc nhiều năm phát triển trên một thiết kế lõi C++ được chỉnh sử để phù hợp với nhu cầu của nhiều thiết bị, nhờ áp dụng bit-packing, caching, vectorization và zero-copy architecture để nhận được lời ích tuyệt vời về việc sử dụng bộ nhớ và tốc độ. 
Nguồn bài viết: https://realm.io