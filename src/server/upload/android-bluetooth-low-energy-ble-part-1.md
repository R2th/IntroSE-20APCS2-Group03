Chào các bạn, hiện tại mình đang làm một dự án liên quan đến BLE (Bluetooth Low Energy). Mình tìm trên mạng thì thấy khá nhiều tài liệu liên quan đến Bluetooth Classic, còn tài liệu về BLE thì còn hạn chế hơn rất nhiều. Nhưng mình lại để ý rằng các ứng dụng phục vụ kết nối với thiết bị thì hiện tại sử dụng BLE là một giải pháp kết nối là khá thông dụng. Vậy nên hôm nay mình sẽ chia sẻ một chút kiến thức cơ bản liên quan đến chủ đề này. Đâu đấy sẽ giúp các bạn có thể Overview qua về hướng tiếp cận, để từ đó dễ dàng investigate và triển khai theo yêu cầu.

Bài của mình liên bao gồm những phần chính sau:
1. Giới thiệu về BLE 
2. Find BLE Device
3. Connection and Disconnect BLE Device
4. Transfer BLE Data

Let’s start

**1. Giới thiệu về BLE**

Đặt vấn đề, trong hầu hết các trường hợp, các nhà thiết kế thiết bị có thể đeo, ngoại vi, cũng như tất cả các mặt hàng khác cần mở rộng chức năng của chúng với điện thoại thông minh. Đều cần tìm một giải pháp để kết nối, điều khiển và chia sẻ dữ liệu. Và Bluetooth Classic và BLE chính là giải pháp. 
Trong phạm trù bài chia sẻ hôm nay mình chỉ tập trung vào nền tảng Android.
Như các bạn đã biết, Bluetooth Classic cho phép thiết bị trao đổi dữ liệu không dây với các thiết bị Bluetooth khác. Khung ứng dụng cung cấp quyền truy cập vào chức năng Bluetooth thông qua API Bluetooth. Các API này cho phép các ứng dụng kết nối với các thiết bị Bluetooth khác, cho phép các tính năng không dây điểm-điểm và đa điểm.

Android version 4.3 (API 18) and above BLE ra đời.  BLE được thiết kế để tiêu thụ điện năng thấp hơn đáng kể. Điều này cho phép các ứng dụng giao tiếp với các thiết bị BLE có yêu cầu năng lượng nghiêm ngặt hơn.
Cụ thể: Các trường hợp sử dụng phổ biến bao gồm:
- Truyền một lượng nhỏ dữ liệu giữa các thiết bị lân cận.
- Tương tác với các cảm biến tiệm cận để cung cấp cho người dùng trải nghiệm tùy chỉnh dựa trên vị trí hiện tại của họ.

**2. Find BLE Device**

Đây là bước đầu tiên trước khi sử dụng các tính năng Bluetooth Classic hoặc BLE. Các bạn cần đảm bảo rằng tất cả các quyền và tính năng cần thiết đều được áp dụng và cho phép.

**Permission**:
- android.permission.BLUETOOTH – các tính năng Bluetooth classic và BLE cơ bản
- android.permission.BLUETOOTH_ADMIN – các thao tác BC và BLE nâng cao như bật/tắt module _ Bluetooth, discovery device, ….
- android.permission.ACCESS_COARSE_LOCATION – cần thiết để quét BLE trên Android 5.0 (API 21) trở lên. Lưu ý: Đây là Runtime Permission từ API 23.


Mình có đọc thêm chú ý về một quyền mà mình thấy hay được khai báo khi xử lý vs BLE. Các bạn chú ý cũng cần đảm bảo rằng điện thoại hay Tablet có bộ điều hợp Bluetooth tích hợp. Nếu muốn không khả dụng cho các thiết bị không có Bluetooth, chúng tôi chỉ cần thêm khai báo:


    <uses-feature android:name="android.hardware.bluetooth"/>

Tuy nhiên, theo Document mình tìm hiểu, không bắt buộc nếu khai báo quyền Bluetooth và đặt phiên bản Android 5 trở lên.

[![image](https://www.linkpicture.com/q/Screen-Shot-2022-11-29-at-23.35.40.png)](https://www.linkpicture.com/view.php?img=LPic63863678b30021760866839)

Để tìm các thiết bị BLE, bạn sử dụng **startScan()** và **stopScan()**. Phương thức này lấy **leScanCallback** làm tham số. Bạn phải triển khai lệnh gọi lại này vì đó là cách trả về kết quả quét. 
Chú ý đến việc optimize khi thực thi, ví dụ stopScan() khi đã tìm thấy device mà các bạn muốn hoặc đặt một interval time scan nhất định …

[![image](https://www.linkpicture.com/q/Screen-Shot-2022-11-29-at-23.35.53.png)](https://www.linkpicture.com/view.php?img=LPic63863678b30021760866839)

Bạn cũng có thể cân nhắc đến mode khi Scan trong trường hợp xuống Background và lên ForceGround tương ứng để optimize năng lượng của thiết bị.

[![image](https://www.linkpicture.com/q/Screen-Shot-2022-11-29-at-23.36.03.png)](https://www.linkpicture.com/view.php?img=LPic63863678b30021760866839)

Ở biết tiếp theo mình sẽ tiếp tục với việc Connection, Disconnect BLE Device và Transfer BLE Data của BLE. 

Hẹn các bạn trong bài viết sắp tới.