### I. Lý do bạn cần thực hiện record một kịch bản từ ứng dụng di động lên Jmeter.

Nếu bạn biết cách sử dụng selenium cơ bản bằng việc thực hiện các record thì sử dụng jmeter để record cũng thật dễ dàng. Jmeter không những hỗ trợ bạn record một kịch bản hoàn chỉnh trên web hay postman mà nó còn giúp bạn có một kịch bản hoàn chỉnh trên ứng dụng điện thoại. 

- Ngoài cách thực hiện nhập bằng tay giá trị API đầu vào đầu ra, đường link thì bạn có thể cho jmeter tự động record những bước đó qua thao tác bằng tay.
- Giảm thời gian nhập API so sánh đối chiếu, sửa, và nghiên cứu lý do tại sao mà nó không chạy được. Chỉ cần record và lấy ra những record bạn cần là ổn.
- Từ những kịch bản đó ta có thể check luôn performace của ứng dụng việc gọi API là tối ổn hay có vấn đề.

### II. Các bước thực hiện record kịch bản từ ứng dụng di động lên Jmeter.

Thực hiện record trên từ Android và IOS lên Jmeter.

**Bước 1: Thực hiện khởi tạo kịch bản để record trên Jmeter.**

1. Mở Jmeter -> click Templates icon trên thanh công cụ --> Tại " Select Template" chọn Recording --> Click vào [Create] button --> Tại pop-up " Fill your parameter" tiếp tục click [Create] button --> Hiển thị màn hình jmeter tại đó click vào tab " HTTP(S) Test script recorder" --> click [Start] button 
==> tại bước này ta sẽ lấy được file ApacheJmetertemporaryRootCA.crt ( file này có hạn là 7 ngày) 

Nhìn hình dưới đây để rõ phần mô tả :

![](https://images.viblo.asia/5db187c9-9286-41b1-9d66-b209c8a18fd3.PNG)

*Cách mở function record trên Jmeter*

![](https://images.viblo.asia/ca1c1f1a-b39f-4166-ab59-59760b452d95.PNG)

*Lựa chọn kịch bản để recording trên Jmeter*

![](https://images.viblo.asia/42c2cb31-1cc5-4036-84cd-2800574bb27b.PNG)

*Sau khi set up thành công trên Jmeter*


**Bước 2: Gửi file ApacheJmetertemporaryRootCA.crt vào điện thoại test**


( Bước này có thể gửi qua email hay bluetooth)
 

**Bước 3: Khởi động file ApacheJmetertemporaryRootCA.crt**
 
 * Với Android chỉ cần click vào file tải về và vào setting --> chọn vào chứng thực --> check xem đã tồn tại file ấy chưa là done
 *  Với IOS do security của nó bảo mật cao hơn nên ta sau khi tải về --> kích vào đổi tên --> Vào cài đặt --> Cài đặt chung --> Quản lý Cấu hình và thiết bị --> chọn đúng file đó và click vào xác thực -> Done 
 
 
 **Bước 4: Cài đặt proxy cho di động.**
 
 
 * Cần lấy IP từ máy tính :
 
 Nếu là máy win chỉ cần vào 
 
 Command Prompt gõ  lệnh : ipconfig
 
 Nếu là máy ubuntu tương tự ta gõ lệnh: ifconfig
 
 ![](https://images.viblo.asia/e2ca5ec6-c856-4db9-a314-fac646c44b6d.PNG)

*Set mạng proxy trên điện thoại*

Vào wifi : chọn mạng đang thu --> Chọn proxy là " Thủ công" --> Nhập tên máy chủ có IP trùng với IP của IPv4  Address từ máy tính 

Cổng trùng với Port của Jmeter 

![](https://images.viblo.asia/351914ab-2403-407f-9083-17271d87cf6c.PNG)

*Lấy số port từ Jmeter*

**Bước 5: Bắt đầu thực hiện record**


Vẫn tại trên tab HTTP(S) Test scriptt recorder --> Click [Start] button 

Mở ứng dụng ta cần record và thực hiện tao tác

Toàn bộ kết quả sẽ được lưu vào "Recording Controller" tab

Sau đó chỉ việc lọc ra và chọn những API hay bước nào ta thực hiện cần test một số API dư thừa có thể bỏ đi.

### III. Một số chú ý khi test những ứng dụng có đường link là https.

Test một số app mà có ứng dụng https không hề đơn giản vì nó đã được cấp ssl và một số chính sách bảo mật của app mà việc record dù đúng quy trình nhưng cũng không thể ra được một bản ghi. Tìm đủ mọi cách mà không hiểu tại sao nhưng cái đấy chỉ xảy ra khi nó đã lên product thôi nhá và nhất là những ứng dụng trên IOS còn lại khi test trên staging chúng ta còn nhiều lý do khác.

1. Ngoài lý do không thể làm gì vì chính sách bảo mật của product, tại bản staging chúng ta cũng không thể làm gì đấy còn là lỗi của dev bên ta trong phần xử lý SSL certificate hãy nhờ dev check lại phần này nhá.


2.  Một số trường hợp khác là hệ thống phải sử dụng qua vpn cũng là một dạng khác của proxy.

Ví dụ kinh điển như sau : Một hệ thống chỉ có thể sử dụng được khi bạn bật vpn của công ty --> sau đó bạn mở mạng thường nhà bạn rồi tắt proxy xong dùng Jmeter chạy thì tất nhiên là nó không record được rồi vì nó bị vi phạm điều kiện sử dụng mạng vpn. Nhưng khi bạn lại mở vpn sử dụng sau đó thì là bạn lại tắt proxy đi rồi thì record lại bị ảnh hưởng là không thể record được vì proxy giờ là đang mở nhưng chuyển dải mạng khác không cùng IP. ==> Với vấn đề này hãy cầu cứu mà xin được cấp IP đang sử dụng vào server cho phép nhá.

3. Cách xử lý sẽ áp dụng với một số https bạn có thể tham khảo.

Check log của Jmeter tại biển báo cảnh báo ở góc màn hình bên phải màu vàng. Nếu log có hiển thị hình ảnh dưới đây: 

![](https://images.viblo.asia/06fd135a-a718-496b-bdec-2f0f811ce0f4.PNG)


*Check có lỗi SSL certificate*
 
Cách fix là : Tại HTTP(S) Test script recorder tab --> HTTPS Domains : Nhập url mà bạn đang test vào -> chạy lại ( sẽ có thể record được)   ==> lưu ý là cái này có thể khác phục 1 số trường hợp chứ không phải hoàn toàn.