Tạo và quản lý cơ sở dữ liệu cục bộ là thành phần cốt lõi của hầu hết các ứng dụng di động. Nhưng cho dù bạn sử dụng SQLite trực tiếp hay thông qua thư viện Room, các nhà phát triển Android đã yêu cầu một cách tốt hơn để kiểm tra và gỡ lỗi cơ sở dữ liệu trong ứng dụng đang chạy của họ.

Phiên bản mới nhất của Android Studio 4.1 (hiện có sẵn trong Canary) đi kèm với một công cụ mới có tên là `Database Inspector`, giúp bạn kiểm tra, truy vấn và sửa đổi cơ sở dữ liệu trong ứng dụng đang chạy của bạn.

 ![Database Inspector giúp bạn sửa đổi dữ liệu giống như chỉnh sửa bảng tính.](https://images.viblo.asia/635fff9a-b69f-4663-8531-d5d3dda23a84.gif)
 
 
Với `Database Inspector`, việc sửa đổi dữ liệu trong cơ sở dữ liệu của bạn không khó hơn nhiều so với chỉnh sửa bảng tính; nếu bạn đang sử dụng Room và quan sát kết quả truy vấn, những thay đổi sẽ được phản ánh ngay lập tức trong ứng dụng của bạn!

Trong bài này, tôi sẽ sử dụng `Database Inspector` với ứng dụng **Sun Flower** để kiểm tra một số trường hợp thay đổi. **Sun Flower** là một ứng dụng làm vườn minh họa các thực tiễn tốt nhất về phát triển Android với `Android Jetpack`. Tôi khuyến khích bạn clone repo và theo dõi khi bạn đọc bài viết này.

## Bắt đầu
Giao diện người dùng của ứng dụng **Sun Flower** bao gồm hai tab. Để thêm một số loại cây vào khu vườn của tôi, chúng ta hãy xem tab **Plant List**, danh sách các loại cây có sẵn cho khu vườn của tôi. Ở trên cùng bên phải, có một button filter. Khi tôi nhấn nút này, danh sách các loại cây sau sẽ được hiển thị:

![](https://images.viblo.asia/90cb264a-4136-4012-8f3e-ecbd0457264e.png)

Rõ ràng, button này lọc các cây dựa trên một số tiêu chí. Nhưng hãy tưởng tượng nếu tôi không quen thuộc với dự án này và tôi muốn tìm hiểu cách thức hoạt động của bộ lọc bằng cách sử dụng `Database Inspector`.

Để mở `Database Inspector` trong Android Studio, tôi cần chọn **View > Tool Windows > Database Inspector** từ thanh menu.

![](https://images.viblo.asia/37b55856-7e8e-45c8-8447-cfce27e89f00.gif)

`Database Inspector` hiển thị như sau:

![](https://images.viblo.asia/6e1c51e5-7c52-49bf-8a08-8150711d147f.png)

Tiếp theo, tôi chạy ứng dụng trên thiết bị chạy API 26 trở lên và sau đó chọn app process từ menu dropdown.

![](https://images.viblo.asia/f02abfbd-6cef-4b16-b6bd-542132e5352c.png)


Sau khi chọn app process tôi muốn kiểm tra, các lược đồ cơ sở dữ liệu sẽ xuất hiện trong bảng bên dưới. Để xem các bảng cơ sở dữ liệu của **Sun Flower**, tôi cần mở rộng lược đồ **…/databases/sunflower-db**

![](https://images.viblo.asia/a6d5de66-4905-4c91-bbeb-93eb639dd3bb.png)

Hãy quay lại ứng dụng và xem danh sách các cây được lọc. Danh sách này chứa Avocado, Grape, Orange và Tomato. Nếu tôi có thể sắp xếp bảng thực vật theo tên thực vật, thì thật khó để tìm thấy Avocado. Hãy để xem liệu `Database Inspector` có thể làm điều đó không!

Đầu tiên, tôi nhấp đúp vào bảng `plants` để hiển thị dữ liệu của nó. Dữ liệu được hiển thị với kích thước trang mặc định là 50, nhưng bạn có thể giảm số lượng để trang hiển thị danh sách ngắn hơn. Nhấp vào cột `name` để sắp xếp bảng `plants` theo tên của các loại cây. Đúng như dự đoán, Avocado không nằm xa danh sách và tôi tìm thấy nó ở hàng thứ hai của bảng.

## Truy vấn cơ sở dữ liệu của bạn

Nhìn vào mục nhập dữ liệu của Avocado, `growZoneNumber` rất có thể là tài sản mà ứng dụng sử dụng để lọc. Để xác minh điều đó, hãy chạy một truy vấn trên `growZoneNumber`, là 9 cho Avocado. Trên thực tế, truy vấn này đã tồn tại trong `PlantDao.kt` và tôi có thể chạy truy vấn trực tiếp từ các chú thích Room `@Query`. Mỗi chú thích `@Query` có một biểu tượng chạy nhỏ bên cạnh số dòng của nó.

Khi tôi nhấp vào biểu tượng chạy cho truy vấn của `getPlantsWithGrowZoneNumber()` và chọn cơ sở dữ liệu chính xác, một cửa sổ bật lên xuất hiện hỏi tôi giá trị cho: `growZoneNumber`.

![](https://images.viblo.asia/4b8bcdc4-18df-4183-a59f-1e6abedd45ca.jpg)

Tôi nhập giá trị 9 và click **Run** để xem kết quả truy vấn.

Ngoài ra, tôi có thể nhập truy vấn của riêng mình và chạy nó trong cửa sổ công cụ. Điều này cho tôi nhiều tự do hơn, vì tôi không bị giới hạn trong các truy vấn được xác định trong giao diện DAO. Để chạy truy vấn của riêng tôi, tôi bấm **Run SQL** và chọn cơ sở dữ liệu `plants` từ tab mới mở ở bên phải.

![](https://images.viblo.asia/309571f1-b607-4edf-8bb3-ff7923a1bac1.png)

Tiếp theo, tôi nhập câu lệnh truy vấn cạnh menu dropdown và nhấn **Run**
```php
Select * from plants where growZoneNumber=9
```

Kết quả ta nhận được chính xác những row giống với cách làm bên trên:

![](https://images.viblo.asia/691f8a4d-72d8-470e-8b5b-fcc153e56c69.gif)

## Chỉnh sửa và gỡ lỗi database của bạn
`Database Inspector` giúp gỡ lỗi ứng dụng của bạn một cách dễ dàng bằng cách cho phép bạn sửa đổi các giá trị trong cơ sở dữ liệu ứng dụng của bạn trong khi ứng dụng này chạy trên thiết bị.
Đầu tiên, tôi muốn kiểm tra giao diện người dùng ứng dụng cho các tên thực vật dài. Thay vì thay đổi nguồn dữ liệu và làm mới cơ sở dữ liệu bằng dữ liệu mới, tôi sẽ chỉnh sửa các giá trị trực tiếp trên cơ sở dữ liệu bằng `Database Inspector`.

![](https://images.viblo.asia/a442d799-6161-4af5-81ef-d95b3b9736f8.png)

Bây giờ ta có thể chỉnh sửa trực tiếp trên ô, ví dụ chỉnh sửa `Apple` thành `A really special type of Apple`. Kết quả ta được như dưới đây:

![](https://images.viblo.asia/7492203b-1b5c-42f2-8fcb-c2b6cc073df3.jpg)

Bây giờ hãy quay trở lại ứng dụng. Lưu ý rằng không cần làm gì, ứng dụng sẽ hiển thị dữ liệu cập nhật! Nếu ứng dụng của bạn sử dụng Room và quan sát kết quả truy vấn (sử dụng `LiveData` hoặc `Flowable`), bạn không cần kích hoạt truy vấn cơ sở dữ liệu để làm mới dữ liệu. Mặt khác, tùy thuộc vào cách ứng dụng của bạn kích hoạt truy vấn, bạn có thể cần phải khởi chạy lại ứng dụng hoặc chỉ cần điều hướng đến `activity` hoặc `fragment` liên quan một lần nữa. Để sử dụng toàn bộ tiềm năng của `Database Inspector`, đây có thể là một lý do hợp lý để di chuyển ứng dụng của bạn để sử dụng `LiveData` hoặc `Flowable`.

![](https://images.viblo.asia/90103378-9b85-4c24-855d-5bba8d0a9ff2.png)

Mỗi cây có một khoảng thời gian tưới khác nhau và tôi muốn xem điều gì sẽ xảy ra khi ngày tưới nước quá hạn. Để làm điều này, tôi cần thêm một số cây vào khu vườn của tôi; nhưng trước tiên, tôi chọn **Live updates** checkbox trong **`Database Inspector`**. Khi kiểm tra cập nhật trực tiếp, `Database Inspector` sẽ tự động hiển thị mọi thay đổi mà ứng dụng của bạn thực hiện đối với cơ sở dữ liệu của nó.

![](https://images.viblo.asia/5482eb2a-6913-4511-be03-569dbb6141b2.png)

Tôi quay trở lại tab **My Garden** và thêm một số loại cây như Avocado và Eggplant, nhưng trước tiên, tôi quay lại `Database Inspector` và nhấp đúp chuột vào `garden_plantings` để quan sát bảng. Lưu ý cách dữ liệu trong bảng `garden_plantings` được cập nhật tự động khi tôi thêm các loại cây mới.

![](https://images.viblo.asia/a9a200b7-6ad9-47f0-afce-d4c17d2ae246.gif)


Cả hai cây này có thời gian tưới 3 ngày. Tôi không thực sự muốn đợi 3 ngày để xem điều gì xảy ra nên tôi sẽ chỉnh sửa cơ sở dữ liệu và thay đổi `last_watering_day`. Một lần nữa tôi quay lại `Database Inspector` và nhấp đúp chuột vào `garden_plantings`. `last_watering_date` là cột cuối cùng của bảng. Tôi sẽ thay đổi giá trị của cả hai bản ghi thành một cái gì đó nhỏ hơn để phản ánh đôi khi trước ngày hôm nay.

![](https://images.viblo.asia/f808e307-6c1a-427a-8b70-b1c8181bbf2e.png)

Giao diện người dùng ứng dụng có vẻ tốt hiển thị ngày đáo hạn. Để phát triển trong tương lai, có thể chúng tôi có thể đề xuất thêm cảnh báo cho người dùng khi ngày tưới nước được thông qua.

## Nguồn tham khảo
[Database Inspector - Murat Yener](https://medium.com/androiddevelopers/database-inspector-9e91aa265316)