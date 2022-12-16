### Bài viết sẽ giới thiệu chi tiết cách xây dựng ứng dụng quét Barcode/ QRCode từ camera của thiết bị phone
### Bước 1: Tạo Scanner class
Tạo một class có tên là **Scanner** kế thừa NSObject và import AVFoundation.
![](https://images.viblo.asia/b893425c-ee15-4077-ba94-2f8eb5d86130.png)
### Bước 2: Thêm các thuộc tính cho Scanner class
Chúng ta cần thêm 1 số thuộc tính sẽ được sử dụng sau.
![](https://images.viblo.asia/e168c2aa-2706-40ca-ae93-9186942aed63.png)
### Bước 3: Tạo AVCaptureSession
AVCaptureSession là gì? Có thể hiểu đơn giản đây là một đối tượng dùng để quản lý hoạt động chụp và điều phối luồng dữ liệu từ các thiết bị đầu vào để thu được kết quả đầu ra.
Như vậy, bước đầu tiên chúng ta se thực hiện việc lấy dữ liệu từ thiết bị đầu vào.
Trong class **Scanner**, tạo một private function là **createCaptureSession** và nó sẽ return về một đối tượng **createCaptureSession** như sau:
![](https://images.viblo.asia/b6f7acce-a05d-4c02-87cb-4ef6ceb8fe34.png)
Tiếp theo tạo một biến **captureSession**, biến này là một instance của AVCaptureSession.
Sau đó tạo một biến **captureDevice** để làm đầu vào cho captureSession sau này.
Code được viết như sau:
![](https://images.viblo.asia/a73d7ed1-7c3f-40d0-9bbc-80b061821c99.png)
### Bước 5: Tạo và thêm input, output
Đầu tiên cần phải tạo khối **try catch**, vì AVCaptureDeviceInput có thể tạo ra exception.
![](https://images.viblo.asia/f92cfe4d-bd90-4f0b-8b4c-3ff5ace6f804.png)
Bây giờ chúng ta sẽ thêm input và output cho biến **captureSession**. Để làm điều này cần tạo 2 biến mới, biến thứ nhất gọi là **deviceInput**, biến thứ 2 là **metaDataOutput**. 
**deviceInput** sẽ sử dụng biến **captureDevice** đã khởi tạo ở bước 3 để làm đầu vào cho việc khởi tạo AVCaptureDeviceInput.
**metaDataOutput** là một instance mới của AVCatpureMetadataOutput.
![](https://images.viblo.asia/1b785553-f5aa-4f9e-b7da-7dab2b727499.png)
Tiếp theo chúng ta sẽ thêm chúng vào captureSession như một input và output.
Trước khi thêm input hoặc output cho biến captureSession thì cần phải kiểm tra xem có thể thêm được vào hay không. Nếu không thì trả về nil bởi vì nhất định phải sử dụng được cả input và output mới được.
Chúng ta sẽ thêm input sau đó mới thêm output. Khi thêm output thì chúng ta cần viết thêm 1 đoạn code nữa để lấy dữ liệu từ Barcodes và QRCode mà đã được scan.
**deviceInput** sẽ được thêm vào **captureSession** trong **do** như sau:
![](https://images.viblo.asia/a4ed1772-0105-440e-94de-8eab8a4afe7c.png)
Thêm output cũng làm tương tự. Tuy nhiên cần thêm một chút xử lý. Đầu tiên là ép kiểu viewController về AVCaptureMetadataOutputObjectsDelegate để có thể sử dụng nó như một delegate. Delegate này để chúng ta sử dụng khi nhận được thông tin từ Barcodes hoặc QRCodes mà đã scan.
Sau khi ép kiểu xong thì set nó giống như một delegate cho **metaDataOutput**. Thêm nữa,tạo thêm phương thức metaObjectTypes để định dạng những loại type mà có thể scan được.
Code được viết như sau:
![](https://images.viblo.asia/72475826-b83e-425a-b923-124f7fffedd9.png)
Vậy là đã xong hàm **createCaptureSession**, tổng hợp lại code cả hàm như sau:
![](https://images.viblo.asia/4426e5af-87d6-4c92-8f92-5ffb0d8521b2.png)
### Bước 6: Taọ metaObjectTypes
Ở bước trước chúng ta sử dụng metaObjectTypes như chưa tạo. Tạo function này cũng rất nhanh thôi, chúng ta trả về một mảng Barcodes và QRCode có thể scan là được, cụ thể như sau:
![](https://images.viblo.asia/f4be68ae-d26e-40b7-9498-df916402011e.png)
### Bước 7: Tạo preview Layer
Preview layer là layer để hiển thị video stream từ camera.
Cách setup khá là đơn giản. Tham số cần truyền vào là một view và một biến captureSession, sau đó hàm sẽ trả lại một AVCaptureVideoPreviewLayer.
Code được viết như sau:
![](https://images.viblo.asia/c8aeb3da-19ba-4a09-a232-067083724609.png)
### Bước 8: Tạo hàm khởi tạo cho class Scanner
Hàm init được tạo với 3 tham số truyền vào là viewController, view và phương thức handle ( để xử lý sau khi nhận kết quả đầu ra)
Vì **viewController** sẽ được sử dụng như một **AVCaptureMetadataOutputObjectsDelegate** nên cần phải kế thừa AVCaptureMetadataOutputObjectsDelegate.
**view** sẽ được dùng để hiện thị preview Layer (như đã tạo ở bước 7)
**codeOutputHandler** là một hàm để chuyển giá trị nhận được từ Barcode hoặc QRCode đã được scan.
Đầu tiên thì viết hàm init như sau:
![](https://images.viblo.asia/275fa559-c7a4-4e91-be54-efa99b92ee17.png)
Sau **super.init()** cần phải khởi tạo **captureSession**. Khởi tạo preview Layer sau đó add và view giống như 1 sub layer như sau:
![](https://images.viblo.asia/024d4dfc-dc9f-4662-b9cf-0f9caa42bb16.png)
Tổng hợp lại, hàm init được viết như sau:
![](https://images.viblo.asia/a15be77b-882b-4bb7-9f8f-cb467199cffa.png)
### Bước 9: Tạo hàm start và stop capture session
2 hàm này gọi **startRunning** và **stopRunning** của đối tượng **captureSesion** đã tạo từ bước trước. Trước khi gọi hàm này cần phải chắc chắn **captureSession** không bị nil mới thực hiện được.
Code được viết như sau:
![](https://images.viblo.asia/d5fd5fc0-1d23-46f0-9ec4-45b210555310.png)
### Bước 10: Khởi tạo Scanner và implement delegate method
Bước này chúng ta sẽ khởi tạo Scanner và thực hiện phương thức delegate trong viewController. Cũng phải tạo một function tên là **handleCode** dùng để làm tham số cho codeOutputHandler khi init Scanner như sau:
![](https://images.viblo.asia/d6cfda2e-adee-4cec-8a31-fb1562f34360.png)
Tiếp theo, chúng ta tạo một instance của Scanner như sau:
![](https://images.viblo.asia/12ae3c54-4fb6-4c04-9707-ecc9c37295d3.png)
Trong đó, **viewController** chính là controller đang gọi tới **scanner**, **view** là vùng muốn hiển thị preview Layer, còn **codeOutputHandler** chính là hàm **handleCode** vừa tạo
Như đã nói ở trên, viewController được sử dụng như một AVCaptureMetadataOuputObjectsDelegate, do đó cần phải kế thừa AVCaptureMetadataOuputObjectsDelegate, chú ý cần import AVFoundation
![](https://images.viblo.asia/b14ab212-f2ce-4a5b-8ddd-049303a8b655.png)
Implement phương thức metadataOutput, đây là phương thức sẽ nhận dữ liệu trả về sau khi scan xong.
![](https://images.viblo.asia/537fdabc-d359-4034-9106-3e263f975b1a.png)
Vì các phương thức khởi tạo đều viết trong lớp Scanner, do đó không thể sử lý trực tiếp trong controller.Vì vậy cần phải tạo một delegate trong Scanner để gọi nó.
![](https://images.viblo.asia/6c87e836-a871-4bf4-abd2-7ad76345e7cb.png)
Quay laị viewController, thực hiện gọi hàm này trong metadataOutput:
![](https://images.viblo.asia/d0cb1154-2390-4cd4-9fe3-80b1544d3fe2.png)
### Bước 11: Implement scannerDelegate
Trong function **scannerDelegate** sẽ thực hiện stop session. Để tránh việc gọi codeOutputHandler nhiều lần thì sau khi trả về kết quả scan chúng ta sẽ thực hiện stop session luôn. Hàm stop chúng ta đã viết ở trên, chính là hàm **self.requestCaptureStopRunning()**.
Sau khi stop thành công, từ **metadataObjects** trả về, ta sẽ lấy được value như sau:
![](https://images.viblo.asia/29897a2d-4a21-4ef6-8bdd-fa5929d86717.png)
Giá trị string trả về sẽ là đầu vào cho hàm **codeOutputHandler**.
Tổng hợp lại đoạn code trong **scannerDelegate** như sau:
![](https://images.viblo.asia/f08ad317-4a04-489f-b7ce-75f16dec863d.png)
Vậy là chúng ta đã hoàn thành xong các bước để scan Barcode hoặc QRCode.

### Tài liệu tham khảo
Mình đã đính kèm source mẫu trong link bên dưới các bạn có thể tham khảo. 
https://github.com/oHaThiHoan/IOSExample.git

Còn đây là tài liệu: 
https://medium.com/programming-with-swift/how-to-read-a-barcode-or-qrcode-with-swift-programming-with-swift-10d4315141d2










.