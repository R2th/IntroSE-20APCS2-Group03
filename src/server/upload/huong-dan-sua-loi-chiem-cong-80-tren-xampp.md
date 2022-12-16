Hầu hết đa số anh em khi lập trình với ngôn ngữ PHP đều quá quen thuộc với XAMPP - chương trình tạo web server được ứng dụng trên các hệ điều hành Linux, MacOS, Windows, Cross-platform, Solaris. cài đặt rất đơn giản chỉ cần tải về và chạy, tuy nhiên trong quá trình làm việc không ít bạn đã từng thấy thông báo lỗi cổng đã bị chiếm nên không thể bật được Apache

Hôm nay mình xin chia sẻ với mọi người một số nguyên nhân và cách khắc phục khi làm việc với xampp mình đã từng gặp và cách khắc phục, bài đầu tiên mình tham gia may fest nên có thể có nhiều sai sót anh em đọc có thể góp ý cho mình hoàn thiện hơn nữa nha :D :D 

### 1. Kiểm tra chương trình nào đang chiếm cổng 80
Đầu tiên để kiểm tra 1 cách đơn giản nhất xem cổng nào chiếm cổng 80 ta có thể mở xampp -> Netstat, tại đây ta có thể thấy được các tiến trình chiếm cổng 80 - phổ biến có thể kể đến như Skype, Microsoft SQL Server đối với các bạn hay lập trình C#, VB.NET, ASP.NET,  hoặc VMWare phần mềm tạo máy ảo, ...
![](https://images.viblo.asia/9c67834f-bbcd-4e0f-8e0b-fcbc66220d00.png)
### 2. Sửa lỗi liên quan đến Skype,IIS,VMWare
Skype phiên bản trước 2018 chỉ cần tắt ứng dụng skype đi, còn phiên bản sau 2019 phần này đã không bị ảnh hưởng nữa

Để khắc phục các lỗi liên quan đến các ứng dụng này chúng ta chỉ cần mở Task Manager (Phím tắt Ctr + Shift + esc)
![](https://images.viblo.asia/79e1bc06-96a4-42b8-83fe-b8c8885071bf.png)
Chuyển sang tab detail (1) tìm kiếm tiến trình ở mục (2) kiểm tra có khớp với tiến trình đang chiếm cổng 80 hay không -> End task
### 3. Trường hợp khác 
* B1: Mở start menu gõ RegEdit
* B2: gõ đường dẫn trỏ về HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\HTTP
* B3: Click đúp vào Start 
* ![](https://images.viblo.asia/849f8287-82e8-4583-9adf-f87d92cd8f72.png)
* B4: nhập giá trị là 4 -> Ok -> Khởi động lại máy
* ![](https://images.viblo.asia/32ef9885-e5bb-4726-8beb-b81123146ecc.png)
### 4. Đổi cổng
Khi bạn đã làm tất cả các bước trên mà vẫn không đổi được cổng hoặc một số chương trình có cổng 80 bạn muốn chạy đồng thời thì ta có 1 các nữa đó là đổi cổng cho Xampp
* B1: Mở xampp -> config -> apache (httpd.conf)
 ![](https://images.viblo.asia/236ea10a-94ab-4d53-bc73-7a61e84b6599.png)
* B2: Ctr H hoặc Ctr  F tìm tất cả cổng 80 đỏi thành cổng 8000 hoặc 8800
 ![](https://images.viblo.asia/dd408f72-a3c0-4ddf-bc44-d0de5224fafe.png)
* B3: Chọn config góc trên cùng bên phải -> Service and Port Settings -> Chuyển main port từ 80 -> 8000 hoặc 8800 khớp với cổng vừa đổi trong file 
![](https://images.viblo.asia/fc6bc9a1-1db0-4d35-b8d0-6d47f9845c31.png)
* B4: Khởi động lại apache

*Chúc các bạn thành công! hehe*