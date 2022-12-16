Cũng giống như phía central, Core Bluetooth cho ta quyền điều phối việc thực thi hầu hết các khía cạnh khi đóng vai trò peripheral. Chapter này cung cấp các guideline và best practice để khai thác quyền điều phối này một cách có trách nhiệm.

# Về vấn đề advertising
Advertise dữ liệu là một phần quan trọng khi thiết lập device thực thi vai trò peripheral. Phần bàn luận dưới đây sẽ giúp ta làm việc này một cách "chuẩn bài" hơn.

## Chú ý những giới hạn của Advertising Data
Ta advertise dữ liệu bằng việc truyền một dictionary vào hàm `startAdvertising(_:)` của `CBPeripheralManager`. Khi ta tạo dictionary, hãy nhớ là sẽ có những giới hạn về dữ liệu nào và bao nhiêu dữ liệu ta có thể advertise.

- Ta chỉ có thể advertise tên của device và UUIDs của các services mà ta muốn advertise. Do đó, khi tạo advertising dictionary, ta chỉ có thể chỉ định 2 key sau: `CBAdvertisementDataLocalNameKey` và `CBAdvertisementDataServiceUUIDsKey`. Nếu chỉ định thêm key khác thì ta sẽ gặp lỗi.

- Khi app chạy ở foreground, ta có tối đa 28 byte cho dữ liệu của cả hai key được support. Nếu ta sử dụng vượt quá 28 byte, thì riêng tên thiết bị sẽ được mở rộng thêm 10 byte. Các UUID mà vượt quá khối lượng cho phép được đặt vào một vùng đặt biệt gọi là "overflow". Các UUID trong vùng "overflow" chỉ có thể được discover khi thiết bị central chỉ định rõ UUID đó khi scan.

- Khi app chạy ở background, tên thiết bị sẽ không được advertise và tất cả các UUID đều được đặt trong vùng "overflow".

> Chú ý: Kích cỡ này chưa bao gồm 2 byte header. Định dạng chính xác của dữ liệu advertising và dữ liệu trả về được định nghĩa trong tài liệu Bluetooth 4.0 specification, Volume 3, Part C, Section 11.

Để có thể ổn định với cái giới hạn về kích cỡ như vậy, ta chỉ nên advertise các UUID cho các service chính mà thôi.

## Advertise chỉ khi cần thiết
Vì việc advertise sử dụng sóng điện từ (do đó sẽ ảnh hưởng đến pin), nên ta chỉ advertise khi ta muốn các thiết bị khác kết nối tới. 

Một khi đã kết nối thành công, các thiết bị đó có thể tìm kiếm và tương tác trực tiếp với dữ liệu của peripheral, mà không cần đến các gói tin advertise. Do đó, để giảm thiểu việc sử dụng sóng điện từ cũng như tăng performance và bảo vệ pin, ta nên dừng việc advertise khi nó không còn cần thiết nữa. 

Để dừng advertise, ta gọi hàm `stopAdvertising()` trong `CBPeripheralManager` như sau:
```
myPeripheralManager.stopAdvertising()
```

### Để người dùng quyết định khi nào advertise
Thường thì chỉ có người dùng mới biết được khi nào cần advertise. App không thể biết được xung quanh có thiết bị central nào không, nên việc app tự advertise các service trở nên vô nghĩa và tốn kém tài nguyên. Các tốt nhất để xử lý việc này là cung cấp trên giao diện người dùng một cách tương tác nào đó để người dùng quyết định việc bật tắt advertise.

# Cấu hình các characteristic
Khi tạo một mutable characteristic, ta sẽ thiết lập các thuộc tính, giá trị và quyền hạn cho nó. Những thiết lập này sẽ xác định cách mà central truy cập và tương tác với các giá trị của characteristic.
Mặc dù ta có thể cấu hình theo cách mà ta muốn, tuy nhiên phần dưới đây sẽ cung cấp một vài hướng dẫn thiết lập khi ta cần thực hiện một số task sau:
- Cho phép central subscribe characteristic.
- Bảo vệ các giá trị characteristic nhạy cảm khỏi những truy cập không hợp lệ (từ các central chưa được bắt cặp).

## Cấu hình characteristic để hỗ trợ sinh thông báo.
Khi một characteristic thường xuyên thay đổi giá trị, việc subscribe giá trị của characteristic là cần thiết và được khuyến khích là nên làm.
Để có thể cấu hình một characteristic có hỗ trợ subscription, ta thiết lập properties của characteristic với constant `CBCharacteristicProperties.notify`:
```
myCharacteristic = CBMutableCharacteristic(type: myCharacteristicUUID, properties: [.read, .notify], value: nil, permissions: .readable)
```
Trong ví dụ trên, giá trị của characteristic là readable, và cho phép subscribe bởi các central đã kết nối.

## Yêu cầu pair connection để truy cập các dữ liệu nhạy cảm.
Tùy vào từng trường hợp, ta có thể có một service nào đó chứa một hoặc nhiều các characteristic mà giá trị của nó cần được bảo mật. Ví dụ như thông tin mạng xã hội. Service này có thể có chứa các characteristic mà giá trị của nó là các thông tin cá nhân như first name, last name, email,... Thường thì khi như vậy ta sẽ muốn rằng chỉ những thiết bị được tin cậy mới có thể lấy được các thông tin này.

Ta có thể đảm bảo việc này bằng cách thiết lập properties và permissions như sau:
```
emailCharacteristic = CBMutableCharacteristic(type: emailCharacteristicUUID, properties: [.read, .notifyEncryptionRequired], value: nil, permissions: .readEncryptionRequired)
```
Trong ví dụ trên, characteristic được cấu hình để cho phép chỉ những thiết bị được tin cậy đọc và subscribe giá trị của nó. Khi kết nối thành công, central sẽ đọc và subscribe characteristic này nhưng chưa thành công ngay mà sẽ gọi tới Core Bluetooth để thực hiện việc bắt cặp giữa peripheral và central, từ đó tạo ra một kết nối bảo mật.

Ví dụ, nếu central và peripheral đều là các thiết bị iOS, cả hai thiết bị sẽ nhận được một alert để xác định thiết bị còn lại muốn bắt cặp. Alert bên central sẽ hiện một đoạn mã mà ta sẽ phải dùng để nhập vào text field trong alert của peripheral để hoàn thành quá trình bắt cặp.
Sau khi quá trình bắt cặp hoàn thành, peripheral sẽ xem central được bắt cặp như là một thiết bị được tin cậy và cho phép central này truy cập vào được các giá trị characteristic được mã hóa.

-----

Đây là phần cuối trong series iOS Bluetooth Guide, hy vọng những kiến thức trong phần này và trong cả series đã giúp ích cho bạn trong việc sử dụng Core Bluetooth. Chúc các bạn có một ngày làm việc vui vẻ.

-----
*Dịch và tham khảo từ [Core Bluetooth Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/CoreBluetoothconcepts/AboutCoreBluetooth/Introduction.html)*