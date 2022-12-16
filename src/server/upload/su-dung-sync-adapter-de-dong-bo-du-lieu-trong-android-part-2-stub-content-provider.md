Sync Adapter Framework được thiết kế để hoạt động với dữ liệu của thiết bị được quản lý bởi Content Provider linh hoạt và bảo mật cao. Vì lý do này, Sync Adapter Framework hy vọng rằng một app sử dụng framework đã định nghĩa một Content Provider cho dữ liệu cục bộ của nó. Nếu Sync Adapter Framework cố gắng chạy bộ sync adapter của bạn và ứng dụng của bạn không có Content Provider, Sync Adapter của bạn sẽ gặp sự cố.
Nếu bạn đang phát triển một ứng dụng mới chuyển dữ liệu từ máy chủ sang thiết bị, bạn nên cân nhắc lưu trữ dữ liệu cục bộ trong một Content Provider. Bên cạnh tầm quan trọng của chúng đối với bộ Sync Adapter, Content Provider còn cung cấp nhiều lợi ích bảo mật và được thiết kế đặc biệt để xử lý lưu trữ dữ liệu trên hệ thống Android. 

Tuy nhiên, nếu bạn đã lưu trữ dữ liệu cục bộ dưới một biểu mẫu khác, bạn vẫn có thể sử dụng bộ Sync Adapter để xử lý truyền dữ liệu. Để đáp ứng yêu cầu Sync Adapter Framework cho Content Provider, hãy thêm Stub Content Provider vào ứng dụng của bạn. Một class implements ContentProvider class nhưng tất cả các phương thức bắt buộc của nó trả về null hoặc 0. Nếu bạn thêm Stub Content Provider, bạn có thể sử dụng Sync Adapter để chuyển dữ liệu từ bất kỳ cơ chế lưu trữ nào bạn chọn. Nếu bạn đã có Content Provider trong ứng dụng của mình, bạn không cần nhà Stub Content Provider

Thêm 1 Stub Content Provider

Để tạo một Stub Content Provider cho ứng dụng của bạn, hãy extends class ContentProvider và đưa ra các phương thức cần thiết của nó. Đoạn mã sau đây cho bạn biết cách tạo Stub Content Provider:

![](https://images.viblo.asia/bd50b89f-3df1-4ee1-8fdb-aae669a427f8.png)

Khai báo Provider trong file Manifest:
Sync Adapter Framework xác định rằng ứng dụng của bạn có Content Provider bằng cách kiểm tra xem ứng dụng của bạn đã khai báo nhà cung cấp trong tệp kê khai ứng dụng của ứng dụng hay chưa. Để khai báo Stub Content Provider trong file kê khai, hãy thêm phần tử có các thuộc tính sau:
* android:name="com.example.android.datasync.provider.StubProvider"

Chỉ định tên fully-qualified của class thực hiện nhà cung cấp nội dung gốc.

* android:authorities="com.example.android.datasync.provider"

Một URI xác định Stub Content Provider. Đặt giá trị này bằng pagekage name của ứng dụng và thêm vào chuỗi ".provider" được thêm vào. Mặc dù bạn đang khai báo Sub Content Provider của bạn cho hệ thống, nhưng không có gì đang cố gắng truy cập vào Content Provider đó.

* android:exported="false"

Xác định xem các ứng dụng khác có thể truy cập vào Content Provider hay không. Đối với các Stub Content Provider của bạn, hãy đặt giá trị thành false, vì không cần phải cho phép các ứng dụng khác xem Provider của bạn. Giá trị này không ảnh hưởng đến tương tác giữa Sync Adapter Framework và Content Provider.

* android:syncable="true"

Đặt flag cho biết Provider có thể sync. Nếu bạn đặt flag này thành true, bạn không phải call method setIsSyncable () trong code của bạn. Flag cho phép Sync Adapter Framework thực hiện truyền dữ liệu với Content Provider, nhưng việc chuyển chỉ xảy ra nếu bạn thực hiện chúng một cách rõ ràng

Đoạn mã sau đây cho bạn thêm phần tử <provider> vào tệp Manifest của ứng dụng:

![](https://images.viblo.asia/7c94725f-9cdb-4322-bb5a-ea5ca91edc7e.png)

Bây giờ bạn đã tạo các phụ thuộc theo yêu cầu của Sync Adapter Framework, bạn có thể tạo thành phần đóng gói mã truyền dữ liệu của bạn. Thành phần này được gọi là bộ Sync Adapter. Ở phần tiếp theo tôi sẽ hướng dẫn chi tiết cách thêm thành phần này vào ứng dụng của bạn.