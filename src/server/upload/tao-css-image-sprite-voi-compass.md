CSS Image Sprite là phương pháp kết hợp nhiều hình ảnh thành một tệp hình ảnh để giảm yêu cầu HTTP và tối ưu hóa hiệu suất tải web. Có nhiều cách và công cụ tiện dụng để làm điều này, hoặc nếu không bạn cũng có thể làm điều đó theo truyền thống với Photoshop.

Nhưng, qua tất cả kinh nghiệm của tôi khi xử lý CSS Image Sprite, không có cách nào khác dễ dàng hơn nhiều so với sử dụng Sprite Function cho Compass. Vậy hãy xem qua cách nó hoạt động.
## Bắt đầu với Compass
Trước khi làm việc với mã Compass, chúng ta cần tạo dự án Compass để  xem nó. Vì vậy, mỗi khi có thay đổi trong dự án bao gồm hình ảnh và .scss, Compass sẽ biên dịch nó thành dạng thích hợp.

Mở Terminal hoặc Command Prompt (nếu bạn đang ở trên Windows) và chạy các lệnh sau.
```
compass create /path/to/project
cd /path/to/project
compass watch
```
## Kết hợp hình ảnh
Như chúng ta đã đề cập ở trên, bạn có thể sử dụng Photoshop để chỉnh sửa hình ảnh theo cách thủ công hoặc bạn cũng có thể sử dụng một số công cụ tiện dụng, chẳng hạn như SpriteBox. Compass tích hợp tính năng này trong Function.
Để kết nối các  icons trong Compass, chúng ta có thể sử dụng quy tắc @import và sau đó hướng nó đến các thư mục hình ảnh theo sau là phần mở rộng hình ảnh thông qua biểu định kiểu .scss, kiểu như: 
```
@import "browsers/*.png";
```
Sau khi lưu tệp, Compass sẽ kết hợp các hình ảnh đó và tạo các tệp hình ảnh mới, như sau.
![](https://images.viblo.asia/1837a32e-368e-47cc-9dd5-794a90df0c50.jpg)
## Định hướng hình ảnh
Hơn nữa, chúng ta cũng có thể thiết lập hướng sprite. Như bạn có thể thấy trong ảnh chụp màn hình ở trên, hình ảnh được sắp xếp theo chiều dọc  mặc định. Trong trường hợp chiều dọc không phù hợp với hoàn cảnh, chúng ta có thể điều hướng chúng theo chiều ngang hoặc đường chéo với biến sau $ <map> -layout: vertical; hoặc $ <map> -layout: horizontal; thay thế <map> bằng tên thư mục nơi bạn đã lưu hình ảnh.
  
###Horizontal
```
$browsers-layout:horizontal;
@import "browsers/*.png";
```
 ![](https://images.viblo.asia/b090825a-bc3d-464f-b328-bebf72eb2c37.jpg)
### Diagonal
``
$browsers-layout:vertical;
@import "browsers/*.png";
``
 ![](https://images.viblo.asia/6989d019-7a22-417e-8a66-97710ba8e820.jpg)
##Kết luận
Thực tế, có một vài chức năng hữu ích khác từ Compass để sử dụng cùng, nhưng đây là tất cả các chức năng cần thiết để tạo CSS Image Sprite bằng Compass. 
Bạn có thể truy cập vào trang chủ của [Compass](http://compass-style.org/) để tìm hiểu kĩ hơn các tính năng và cách sử dụng của nó