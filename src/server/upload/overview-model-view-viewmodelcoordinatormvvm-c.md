### Overview

Model-View-ViewModel + Coordinator là một biến thể của MVC với việc tích hợp view-model và một coordinator để quản lý view controller hierarchy.

### Model-View-ViewModel(MVVM)
![](https://images.viblo.asia/f6879046-be44-42a4-957e-633096a426c8.png)

MVVM ra đời đã giải quyết được 2 vấn đề lớn của MVC:

1.  Xây dựng một mối liên hệ trực tiếp giữa các views và models của một màn hình với nhau.
 
2.  Cung cấp 1 interface thể hiện trạng thái của view mà không phụ thuộc vào application framwork.
 

 Đầu tiên là giảm tải cho view controllers bằng việc dời việc observation và transformation những gì liên quan đến model ra khỏi view controller layer. Hai là, có 1 interface thể hiện các state của views để việc testing được dễ dàng và không phụ thuộc những thành phần khác của framework.
 
 
 
 Để thực hiện việc đồng bộ giữa view và view-model thông qua cách gọi binding. View Controller xây dựng những cái binding giữa những properties(ứng với từng view trên màn hình) của mình với view-model và những properties đó được view-model xử lý và hiển thị dữ liệu ra màn hình. 
 
 Lúc sơ khai thì MVVM chỉ được implement với cách giao tiếp *thủ công* truyền thống như là delegate, closure, KOV, notify, ... Thì sau đó, khi *reactive programming* nổi lên và trở thành xu thế thì MVVM cũng dần cập nhật theo với việc sử dụng bộ thư viện Rx(x) dành cho iOS.
 
###  Model-View-ViewModel + Coordinator(MVVM-C)
###  
![](https://images.viblo.asia/25afd3ad-7674-46a0-b527-863ef09adef7.png)
Một màn hình giao diện thông thường đều có 2 phần cơ bản đó là *data* và *navigator*. Về phần *data* thì MVVM đã đáp ứng được nhiệm vụ tách việc xử lý logic và hiển thị dữ liệu ra khỏi View Controller để giảm tải cho nó. Và để cho nhiệm vụ giảm tải được triệt để thì tách luôn phần *navigator*, thế là Coordinator component được tạo ra.

Coordinator mang trong mình 2 sứ mệnh là quản lý việc presentation các View Controller khác, và trung gian dữ liệu model giữa các màn hình, lưu ý là View-Model chỉ là xử lý data trong nội bộ màn hình, còn Coordinator mới truyền dữ liệu giữa các màn hình.

Coodinator nó là phần độc lập, không phụ thuộc vào bất kỳ thành phần kiến trúc nào, có thể áp dụng cho cả MVC và MVVM đều được.

Nếu không có coordinator, thì View Controller thường tự present các View Controller khác như là push chúng vào navigation stack, presenting modally,... Nếu có coodinator thì chỉ cần gọi các methods ở trong chính coordinator là được.

**.**