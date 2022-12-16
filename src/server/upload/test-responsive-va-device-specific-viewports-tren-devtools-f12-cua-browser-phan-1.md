Device Mode được cập nhật (kể từ Chrome 49) là một phần không thể thiếu của DevTools trên thiết bị di động đầu tiên và mở rộng DevTools bar chính. Tìm hiểu cách sử dụng các điều khiển của nó để mô phỏng một loạt các thiết bị hoặc responsive đầy đủ.

- Kiểm tra khả năng phản hồi của trang web của bạn bằng trình giả lập màn hình của Device Mode.
- Lưu các cài đặt trước tùy chỉnh để bạn có thể dễ dàng truy cập chúng sau này.
- Device mode không phải là sự thay thế cho testing thiết bị thực. Hãy nhận biết những hạn chế của nó.

## Sử dụng các điều khiển viewport

![](https://images.viblo.asia/b802ebd7-17c9-411c-8ad9-561f54a75269.png)

Điều khiển Viewport cho phép bạn test trang web của mình trên nhiều thiết bị khác nhau, cũng như responsive đầy đủ. Có hai chế độ:
- Responsive : Làm cho Viewport tự do thay đổi kích thước thông qua handle lớn ở hai bên.
- Specific Device (Thiết bị cụ thể) : Khóa Viewport với kích thước khung nhìn chính xác của một thiết bị cụ thể và mô phỏng các đặc điểm nhất định của thiết bị.

### Responsive mode

![](https://images.viblo.asia/1479cb51-acb8-404c-b7a9-e08f04405421.png)

Chúng tôi khuyên bạn nên sử dụng Responsive Mode làm chế độ làm việc mặc định. Sử dụng nó trong quá trình phát triển hoạt động của trang web và ứng dụng của bạn và thường xuyên thay đổi kích thước viewport để tạo ra một thiết kế responsive tự do thích nghi với các loại thiết bị thậm chí chưa biết và trong tương lai.

Để tận dụng tối đa Responsive Mode, hãy bật Media Queries Bar.

#### Tùy chỉnh kích thước viewport 

Either drag the big resize handles on the viewport or click into the values in the menu bar for finer grained control.
Kéo các tay cầm thay đổi kích thước lớn trên khung nhìn hoặc nhấp vào các giá trị trong thanh menu để kiểm soát chi tiết hơn.

### Device-specific mode

Sử dụng Device-specific mode khi bạn sắp kết thúc quá trình phát triển và muốn hoàn thiện trang web của mình trông như thế nào trên các điện thoại di động cụ thể (ví dụ: một iPhone hoặc Nexus nhất định).

#### Built-in device presets (Các mode device được cài sẵn)

![](https://images.viblo.asia/f910040b-7136-48dc-a88a-eb8d3ebfa468.png)

Các device phổ biến nhất ở thời điểm hiện nay được cài sẵn trong danh sách device. Sau khi chọn một device, mỗi cài đặt device như vậy sẽ tự động định cấu hình mô phỏng các đặc điểm nhất định của thiết bị:
- Đặt chuỗi "User Agent (Tác nhân người dùng)" (UA) chính xác.
- Đặt độ phân giải của device và DPI (tỷ lệ pixel của device).
- Giả lập các touch event (nếu có).
- Mô phỏng thanh cuộn di động và meta viewport.
- Tự động hóa tăng giảm kích thước văn bản cho các trang mà không có viewport được xác định.

#### Thêm cài đặt device tùy chỉnh

Device Mode cung cấp một loạt các thiết bị để mô phỏng.  Bạn có thể thêm một thiết bị tùy chỉnh nếu bạn tìm thấy một edge-case device hoặc thiết bị thích hợp mà chưa được bảo đảm.

Để thêm một thiết bị tùy chỉnh:
1. Chuyển đến DevTools Settings.

![](https://images.viblo.asia/25c73e6c-c7e2-485f-82f0-5a99f386b35b.png)

2. Click vào Devices tab.

![](https://images.viblo.asia/65ec1f9d-87bb-4ff2-923d-396650a8bd56.png)

Tại đây bạn có thể chọn thêm các device mà tool hỗ trợ sẵn của tool.

![](https://images.viblo.asia/22e9bcce-bc99-4a04-813b-d34084600cf9.png)

3. Click vào Add custom device để add thêm device mà bạn cần test nhưng chưa có trong list hỗ trợ sẵn của tool.

![](https://images.viblo.asia/5abb4c80-96db-435c-b9b2-11ae53a29768.png)

4. Nhập các thông số của deivce mà bạn muốn add thêm (device name, width, height, device pixel ratio, và user agent string).

![](https://images.viblo.asia/362fca6b-c19d-441b-af9c-e2229f029cbb.png)

6. Click Add.
Device tùy chỉnh của bạn hiện có trong menu Thiết bị dropdown.

#### Trạng thái device và định hướng

![](https://images.viblo.asia/f05d0bcf-810b-4f3c-899f-987fe1903919.png)

Khi mô phỏng một thiết bị cụ thể, thanh công cụ Device Mode hiển thị một điều khiển bổ sung chủ yếu phục vụ như một cách để chuyển hướng giữa ngang (landscape) và dọc (portrait).
Trên các thiết bị được chọn, điều khiển không chỉ chuyển hướng. Đối với các thiết bị được hỗ trợ như Nexus 5X, bạn sẽ có một danh sách thả xuống cho phép bạn mô phỏng một số trạng thái thiết bị nhất định, như:
- UI trình duyệt mặc định
- Với thanh điều hướng Chrome
- Với bàn phím mở

![](https://images.viblo.asia/022d9515-aa59-4f45-b1e9-7792b55d4396.png)

#### Zoom to fit (Thu phóng cho vừa)
Đôi khi, bạn sẽ muốn kiểm tra một thiết bị có độ phân giải lớn hơn không gian có sẵn thực tế trong cửa sổ trình duyệt của bạn. Trong những trường hợp này, tùy chọn Zoom to Fit sẽ có ích:
- Fit to Window sẽ tự động đặt mức thu phóng phù hợp với không gian có sẵn tối đa.
- Tỷ lệ phần trăm rõ ràng là hữu ích nếu bạn muốn kiểm tra DPI trên hình ảnh, ví dụ.

![](https://images.viblo.asia/021bafa3-b3e0-4a68-bebe-3f7867d9f27b.png)

### Optional controls (touch, media queries, DPR, ...)
Điều khiển tùy chọn có thể được thay đổi hoặc kích hoạt bằng cách nhấp vào ba dấu chấm nhỏ ở bên phải của thanh công cụ thiết bị. Các tùy chọn hiện tại bao gồm
- User agent type (Loại tác nhân người dùng) (Emulates UA và touch events)
- Tỷ lệ pixel của thiết bị
- Media Queries (Truy vấn Media)
- Rulers
- Configure Network (Cấu hình mạng) (UA, Network Throttling (Điều chỉnh mạng))

![](https://images.viblo.asia/17573047-e8b4-4faa-abd2-3c40cc100487.png)

Đọc để tìm hiểu thêm về các tùy chọn cụ thể.

##### Device pixel ratio (DPR)
Nếu bạn muốn mô phỏng thiết bị Retina từ máy không phải Retina hoặc ngược lại, hãy điều chỉnh tỷ lệ pixel của Thiết bị. Tỷ lệ pixel thiết bị (DPR) là tỷ lệ giữa các pixel logic và pixel vật lý. Các thiết bị có màn hình Retina, chẳng hạn như Nexus 6P, có mật độ điểm ảnh cao hơn các thiết bị tiêu chuẩn, có thể ảnh hưởng đến độ sắc nét và kích thước của nội dung hình ảnh.
Some examples of "Device Pixel Ratio" (DPR) sensitivity on the web are:

Một số ví dụ về độ nhạy của "Tỷ lệ pixel của thiết bị" (DPR) trên web :
- CSS media queries (Các truy vấn phương tiện CSS) như: @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) { ... }  (*min-resolution độ phân giải tối thiểu)
- CSS image-set rules (Quy tắc thiết lập hình ảnh CSS.)
- Các thuộc tính srcset trên hình ảnh
- Thuộc tính window.devicePixelRatio.
Nếu bạn có màn hình Retina nguyên gốc, bạn sẽ nhận thấy rằng các tài sản "Dots Per Inch" (DPI) trông có vẻ pixel thấp trong khi các tài sản DPI cao hơn rất sắc nét. Để mô phỏng hiệu ứng này trên màn hình tiêu chuẩn, đặt DPR thành 2 và chia tỷ lệ khung nhìn bằng cách phóng to. Một tài sản 2x sẽ luôn trông sắc nét, trong khi một tài sản 1x sẽ trông như pixel.

##### Media queries
Truy vấn phương tiện là một phần thiết yếu của thiết kế web responsive. Để xem trình kiểm tra truy vấn phương tiện, nhấp vào Show Media queries trong menu ba chấm. DevTools phát hiện các truy vấn phương tiện trong biểu định kiểu của bạn và hiển thị chúng dưới dạng các thanh màu trong thước kẻ trên cùng.

![](https://images.viblo.asia/dc78dbae-323f-425f-96af-253f6b97bd59.png)

Media queries được mã hóa màu như sau:
|  Màu sắc |   |
| -------- | -------- |
| Blue | Truy vấn nhắm mục tiêu chiều rộng tối đa.     |
|Green | Truy vấn nhắm mục tiêu độ rộng trong một phạm vi.|
|Orange|Truy vấn nhắm mục tiêu chiều rộng tối thiểu.|

**Nhanh chóng xem trước một truy vấn phương tiện**

Click a media query bar to adjust the viewport size and preview styles for the targeted screen sizes.
Nhấp vào thanh truy vấn phương tiện để điều chỉnh kích thước chế độ xem và kiểu xem trước cho kích thước màn hình được nhắm mục tiêu.

**View associated CSS**

Bấm chuột phải vào một thanh để xem nơi truy vấn phương tiện được xác định trong CSS và chuyển đến định nghĩa trong mã nguồn.

![](https://images.viblo.asia/9475d3ab-bdf5-4233-aed8-d87b072dccbc.png)

#### Rulers

Chuyển đổi tùy chọn này để hiển thị các thước đo dựa trên pixel bên cạnh viewport.

![](https://images.viblo.asia/ab4385eb-9752-4628-a088-da094af42818.png)

#### Configure network (UA, network throttling)

Chọn tùy chọn này sẽ mở Network Conditions drawer,nơi bạn có thể thay đổi các hành vi mạng sau:
- Disk Cache: Vô hiệu hóa Disk Cache ngăn các trang và tài sản của chúng không được lưu bởi trình duyệt trong khi DevTools đang mở.

![](https://images.viblo.asia/195db8aa-e6a6-4efa-b471-9079f42fa443.png)

- Network Throttling: Mô phỏng các kết nối mạng chậm.

![](https://images.viblo.asia/fb243c9e-7f37-480a-9db0-c44921b295d0.png)
![](https://images.viblo.asia/44af868b-b6ab-4c8e-abd1-adb2a2d97bb5.png)

- User Agent: Cho phép bạn đặt ghi đè chuỗi UA (Tác nhân người dùng) cụ thể.

### Limitations

Device Mode có một vài giới hạn như sau :
- **Device hardware** : Hành vi của GPU và CPU không được mô phỏng.
- **Browser UI**
     + System displays : chẳng hạn như thanh địa chỉ, không được mô phỏng.
     + Native displays : chẳng hạn như các phần tử <select>, không được mô phỏng như một danh sách phương thức.
     + Một số cải tiến, chẳng hạn như đầu vào mở bàn phím, có thể khác với hành vi thực tế của thiết bị.
- **Chức năng trình duyệt**
  + WebGL hoạt động trong trình giả lập, nhưng không được hỗ trợ trên các thiết bị iOS 7.
  + MathML không được hỗ trợ trong Chrome nhưng được hỗ trợ trên các thiết bị iOS 7.
  + HLS playback (HTTP Live Streaming cho video) không được hỗ trợ trong khi mô phỏng, nhưng được hỗ trợ nguyên bản trên Android Chrome và iOS.
  + Lỗi thu phóng định hướng iOS 5 không được mô phỏng.
  + Thuộc tính CSS chiều cao dòng hoạt động trong trình giả lập, nhưng không được hỗ trợ trong Opera Mini.
  + Các giới hạn quy tắc CSS, chẳng hạn như các giới hạn trong Internet Explorer, không được mô phỏng.
- **AppCache**
     + Trình giả lập không ghi đè lên tệp kê khai UA cho AppCache hoặc xem các yêu cầu nguồn.

Mặc dù có những hạn chế này, Chế độ thiết bị đủ mạnh cho hầu hết các tác vụ. Khi bạn cần test trên thiết bị thực, bạn có thể sử dụng [Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging) để có cái nhìn sâu sắc hơn. 

### Nguồn tham khảo : 
https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports