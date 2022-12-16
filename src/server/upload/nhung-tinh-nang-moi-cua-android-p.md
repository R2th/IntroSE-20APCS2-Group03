### Định vị trong nhà với Wi-Fi RTT

Android P thêm hỗ trợ nền tảng cho giao thức Wi-Fi IEEE 802.11mc — còn được gọi là Wi-Fi Round-Trip-Time (RTT) —cho phép bạn tận dụng lợi thế của việc định vị trong nhà trong ứng dụng của bạn.

Trên các thiết bị Android P có hỗ trợ phần cứng, ứng dụng của bạn có thể sử dụng các API RTT mới để đo khoảng cách tới các Điểm truy cập Wi-Fi có khả năng RTT (AP) gần đó. Thiết bị phải bật vị trí và bật tính năng quét Wi-Fi (trong Cài đặt> Vị trí) và ứng dụng của bạn phải có quyền ACCESS_FINE_LOCATION. Thiết bị không cần kết nối với AP để sử dụng RTT. Để duy trì sự riêng tư, chỉ có điện thoại mới có thể xác định khoảng cách với AP; các AP không có thông tin này.

Nếu thiết bị của bạn đo khoảng cách đến 3 hoặc nhiều AP, bạn có thể sử dụng thuật toán đa cấp để ước tính vị trí thiết bị phù hợp nhất với các phép đo đó. Kết quả thường chính xác trong vòng từ 1 đến 2 mét.

Với độ chính xác này, bạn có thể xây dựng trải nghiệm mới như điều hướng trong tòa nhà, dịch vụ dựa trên vị trí như điều khiển bằng giọng nói rõ ràng (ví dụ: "Bật đèn này") và thông tin dựa trên vị trí (chẳng hạn như "Có ưu đãi đặc biệt cho sản phẩm này? ").

### Hỗ trợ hiển thị "tai thỏ"

Android P cung cấp hỗ trợ cho các màn hình được khoét bỏ đi cho máy ảnh và loa. 
Class DisplayCutout mới cho phép bạn tìm ra vị trí và hình dạng của các khu vực không hoạt động mà nội dung không được hiển thị. 
Để xác định sự tồn tại và vị trí của các vùng cắt bỏ này, ta có thể sử dụng phương thức getDisplayCutout ().

Thuộc tính bố cục cửa sổ mới, layoutInDisplayCutoutMode, cho phép ứng dụng của bạn bố trí nội dung của nó xung quanh các đoạn cắt của thiết bị. Bạn có thể đặt thuộc tính này thành một trong các giá trị sau:

```
LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT
LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER
```
![](https://images.viblo.asia/893ed5b7-2a02-4781-bc02-2e0f5ca758a0.png)


Bạn có thể mô phỏng một màn hình "tai thỏ" trên bất kỳ thiết bị hoặc trình giả lập nào chạy Android P như sau:

Bật tùy chọn nhà phát triển.
Trong màn hình Tùy chọn dành cho nhà phát triển, hãy cuộn xuống phần **Drawing** và chọn **Simulate a display with a cutout**
Chọn kích thước của cutout.

### Hỗ trợ nhiều camera 

Giờ đây, bạn có thể truy cập đồng thời từ hai hoặc nhiều máy ảnh vật lý trên thiết bị chạy Android P. 
API cũng cho phép bạn gọi luồng máy ảnh hợp lý hoặc hợp nhất tự động chuyển đổi giữa hai hoặc nhiều máy ảnh.

Các cải tiến khác trong máy ảnh bao gồm các tham số phiên mới giúp giảm sự chậm trễ trong quá trình chụp ban đầu và chia sẻ Surface cho phép client xử lý các trường hợp sử dụng khác nhau mà không cần dừng và bắt đầu lại camera. 

Android P cũng cho phép hỗ trợ các camera USB / UVC bên ngoài trên các thiết bị hỗ trợ.

### ImageDecoder cho bitmap và drawables
Android P giới thiệu ImageDecoder để cung cấp cách tiếp cận hiện đại hơn để decode hình ảnh

ImageDecoder cho phép bạn tạo một Drawable hoặc một Bitmap từ một bộ đệm byte, một tập tin, hoặc một URI. 
Để giải mã một hình ảnh, trước tiên hãy gọi createSource () với nguồn của hình ảnh được mã hóa. Sau đó, gọi decodeBitmap () hoặc decodeDrawable () bằng cách truyền đối tượng ImageDecoder.Source để tạo một Bitmap hoặc một Drawable.

Nếu hình ảnh được mã hóa là một GIF động hoặc WebP, decodeDrawable () trả về một Drawable là một thể hiện của lớp AnimatedImageDrawable.

Có nhiều phương pháp khác nhau mà bạn có thể sử dụng để set thuộc tính hình ảnh. Bao gồm các:

Để chia tỷ lệ hình ảnh được giải mã thành kích thước chính xác, hãy gọi setResize () với kích thước mục tiêu.
Bạn cũng có thể chia tỷ lệ hình ảnh bằng cách sử dụng sample size. Chuyển kích thước mẫu trực tiếp tới setResize () hoặc gọi hàm getSampledSize () để biết ImageDecoder nào có thể lấy mẫu hiệu quả nhất.
Để cắt một hình ảnh trong phạm vi của hình ảnh được chia tỷ lệ, hãy gọi setCrop ().
Để tạo một Bitmap mutable hãy gọi setMutable (true).

ImageDecoder cũng cho phép bạn thêm các hiệu ứng tùy chỉnh và phức tạp vào một hình ảnh như các góc tròn hoặc mặt nạ vòng tròn. 
Sử dụng setPostProcessor () với một thể hiện của lớp PostProcessor để thực hiện bất kỳ lệnh vẽ nào bạn muốn.
Khi bạn xử lý một AnimatedImageDrawable, các hiệu ứng sẽ được áp dụng cho tất cả các khung hình.

### Animation
Android P giới thiệu một lớp AnimatedImageDrawable mới để vẽ và hiển thị các hình ảnh động GIF và WebP. 
AnimatedImageDrawable hoạt động tương tự như AnimatedVectorDrawable trong đó RenderThread điều khiển hình ảnh động của AnimatedImageDrawable. RenderThread cũng sử dụng worker thread để decode, để decode không can thiệp vào RenderThread. 
Điều này cho phép ứng dụng của bạn có một hình ảnh động mà không cần quản lý cập nhật hoặc can thiệp vào UI Thread của ứng dụng.

Một AnimagedImageDrawable có thể được giải mã bằng ImageDecoder mới. Đoạn mã sau đây cho thấy cách sử dụng ImageDecoder để giải mã AnimatedImageDrawable của bạn:

```
Drawable d = ImageDecoder.decodeDrawable (...);
if (d instanceof AnimatedImageDrawable) {
    ((AnimatedImageDrawable) d) .start ();
}
```