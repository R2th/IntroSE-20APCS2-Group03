## 1. Giới thiệu
Ở camera iPhone khi chúng ta chọn chế độ PORTRAIT (chế độ chụp ảnh chân dung), thì phía sau khuôn mặt của chúng ta khi chụp ảnh sẽ được làm mờ (blur) đi như hình bên dưới:

![](https://images.viblo.asia/c55ea2c0-668e-46b3-9b3c-0fec6fc65a8c.png)

Vậy nếu chúng ta muốn sử dụng hiệu ứng làm mờ background phía sau khuôn mặt vào custom camera trong một ứng dụng iOS thì chúng ta phải làm như thế nào? Không may thay, mình chưa tìm ra được một cách nào dễ dàng để có được hiệu ứng này.

## 2. Cách giải quyết
Vậy để đạt được hiệu ứng blur background như chế độ PORTRAIT của native camera iPhone. Chúng ta phải làm như thế nào?

Đầu tiên, khi chúng ta chụp 1 bức ảnh. Chúng ta cũng đồng thời phải lấy được depth map của bức ảnh đó. Vậy depth map là gì? Phải làm sao để lấy được depth map? Chúng ta sẽ tìm hiểu ở phần ngay sau đây.
Sau khi có được 1 ảnh gốc và 1 ảnh depth map. Chúng ta sẽ kết hợp lại với nhau để được 1 bức ảnh có hiệu ứng làm mờ background tương tự chế độ PORTRAIT
Bức ảnh sau đây mô tả rõ hơn cách chúng ta sẽ thực hiện:

![](https://images.viblo.asia/304552dc-7d58-4e81-bfd7-b9a459f3c501.png)

### 2.1. Depth map là gì?
Depth map như là một bức ảnh. Tuy nhiên khác với bức ảnh bình thường cung cấp màu sắc, depth map lại cung cấp khoảng cách từ camera đến vật thể. Như bức ảnh trên chúng ta thấy, vật nằm càng gần camera thì có màu càng trắng, ngược lại càng xa camera thì càng tối.

### 2.2. Cách lấy depth map
Về cách chi tiết để lấy được depth map, chúng ta sẽ thực hiện ở mục 3 - demo. Tuy nhiên, để lấy được depth map chúng ta thực hiện dòng code sau đây. Khi auxiliaryDisparity = true thì disparityImage sẽ là 1 bức ảnh depth map
![](https://images.viblo.asia/4f72ddd2-cfd7-4ef2-92e4-0a845cb97743.png)

### 2.3. Kết hợp ảnh gốc và depth map
Mình tìm thấy bức ảnh này ở tài liệu được giới thiệu vào WWDC 2017 (image editing with depth) sẽ đính kèm link ở chương cuối:

![](https://images.viblo.asia/19158a2d-9855-4cd0-a5bd-df06df911458.png)

Như chúng ta thấy ở trên, chúng ta sẽ sử dụng filter tên là “CIDepthBlurEffect” để kết hợp 2 ảnh gốc và depth map lại với nhau. Cụ thể như dòng code bên dưới:
![](https://images.viblo.asia/c5c44c58-2188-4f27-a100-a848a3072815.png)

## 3. Thử nghiệm chương trình
Ảnh 1: Là ảnh gốc khi chụp bằng camera ở ứng dụng iOS
![](https://images.viblo.asia/82ae5883-a287-4b43-b072-3a82c3d36146.jpg)

Ảnh 2: Là ảnh nhận được sau khi kết hợp ảnh gốc và depth map
![](https://images.viblo.asia/88aec45c-7769-442e-b12a-296f75dfe585.jpg)

Đây là source code hoàn chỉnh, mọi người có thể tải về và chạy trên máy thật: https://github.com/kien-hoang/portrait_camera_effect

## References
- https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/capturing_photos_with_depth
- https://devstreaming-cdn.apple.com/videos/wwdc/2017/508wdyl5rm2jy9z8/508/508_image_editing_with_depth.pdf?dl=1
- https://stackoverflow.com/a/49308754