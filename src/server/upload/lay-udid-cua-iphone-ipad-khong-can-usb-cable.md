Trong quá trình phát triển ứng dụng, sau khi bạn hoàn thiện sản phẩm hay từng phần trong kế hoạch phát triển, đội QA rất muốn được Test những tính năng đã hoàn thiện trên thiết bị thật. Một trong những việc cần làm của iOS developer là thêm UDID thiết bị Test của QA đó vào danh sách thiết bị testing.

**Vấn đề:**

1. Khoảng cách xa
2. Không ngồi cùng team
3. Dù đảm bảo 2 cái trên thì Cable không tương thích cũng nhức nhối và tốn thời gian, thậm chí là kinh tế phết (Thiết bị của Apple khá mắc) :D 

Vì thế anh em có thể thử cách làm mà mình vẫn thường làm như dưới đây để khắc phục tình vấn đề nhé.

### 1. UDID là gì?

Nó đơn giản là tổ hợp ký tự định danh duy nhất của thiết bị gồm 1 chuỗi 40 ký tự, hay có thể gọi nó là Device ID giống như của Android.
Bạn có thể lấy UDID bằng lệnh sau:

`instruments -s devices`

Tuy nhiên việc cần làm bạn phải kết nối thiết bị với Macbook và iTunes thì mới lấy được bằng lệnh này. (:sad)

### 2. Thao tác lấy UDID dễ dàng

**Bước 1:** Truy cập vào trang  https://get.udid.io/ qua Safari của thiết bị


**Bước 2:** Click vào nút Tap to Find UDID.

![](https://images.viblo.asia/54585479-26a5-4b1d-b1c5-79aa73385a52.jpg)


**Bước 3:**

Có một thông báo cấp quyền bạn chọn **Cho phép (Allow).**

![](https://images.viblo.asia/450ab22e-f6a2-46a0-bbd7-25dc7fff09e2.jpg)


**Bước 4:** Tiếp theo có một thông báo "Tải về hoàn thành" bạn cần cài đặt nó (Hình ảnh dưới đây)

Nhấn vào Đóng (Close). Tiếp theo, mở Cài đặt (Setting) trên thiết bị của bạn và sau đó nhấn vào tùy chọn Đã tải về hồ sơ (Profile Downloaded).

![](https://images.viblo.asia/461828af-4749-4af2-97b3-5947ac776f98.jpg)


**Bước 5:**
Bây giờ đến quá trình cài đặt phần profile.

>> Cài đặt (Install) ở trên cùng bên phải. Nhập mật khẩu thiết bị của bạn . Quay lại màn Cài đặt (Install) rồi nhấp lại lần nữa.
>> 

![](https://images.viblo.asia/1dae1077-f793-453b-91b4-ff10a94aa191.jpg)


**Bước 6:** Sau khi hoàn thành xong, nó sẽ link bạn tới trang web ban đầu, lúc này thông số bạn cần lấy đã hiển thị trên màn hình. Chỉ việc copy và paste vào mục Add Device của Apple thôi. 

* Note: Nên lưu lại ở đâu đó kín đáo sau này dùng lại đỡ mất công. :D 

![](https://images.viblo.asia/4e62035a-18eb-4545-8b50-d3c0a76374cd.jpg)


**Bước 7:** Xóa hồ sơ sau quá trình hoàn thành 

![](https://images.viblo.asia/4ebb58d4-cc13-4edc-95e7-5ddfbdd8141e.jpg)


Bạn đã lấy được UDID của thiết bị rồi hãy quay trở lại phần Settings và xóa hồ sơ đó đi (Hình ảnh dưới).  Theo mình đây là việc làm cần thiết để bảo mật cho thiết bị của bạn mặc dù có thể thiết bị này bạn rất ít khi sử dụng và nó chỉ có những app test cho công việc mà thôi. 



### 3. Tổng kết

Trên đây là cách làm đơn giản và hữu ích cho anh em iOS developer có thể giúp team QA test sản phẩm đơn giản hơn hay thêm thiết bị test của mình vào mà không tốn nhiều công sức.
Bài viết có dài 1 chút nhưng thực hiện quen tay rồi thì làm nó rất nhanh thôi.

Mong rằng ai đó sẽ tìm thấy sự hữu ích qua bài viết này. Happy Coding Now.