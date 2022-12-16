# Giới thiệu
Xin chào mọi người, hôm nay mình sẽ giới thiệu tới các bạn cách deploy một dự án laravel lên 000webhost chi tiết từng bước. Những kĩ năng này không quá khó nhưng nếu bạn mới tìm hiểu thì chắc chắn sẽ gặp những khó khăn nhất định. 

Ngày còn là sinh viên, mình có một bài tập lớn về laravel. Mọi chuyện diễn ra rất bình thường cho tới khi nộp bài tập cho thầy để chấm, thầy hỏi: "Em chưa đưa project lên host à?". Lúc đó mình mới cuống cuồng tìm hiểu cách deploy project lên host. Trong thời gian đó mình gặp khá nhiều khó khăn.

Bài viết này hướng dẫn các bạn deploy dự án và tránh những khó khăn mà mình đã gặp phải. Còn vì sao mình lại chọn 000webhost, vì nó miễn phí, đối với sinh viên mì gói qua ngày được dùng cái gì đó miễn phí là cả niềm một hạnh phúc :laughing::laughing:. Bắt đầu thôi nào:

# Tải lên mã nguồn
Trước khi có thể tải source code lên, bạn phải đăng kí tài khoản của 000webhost, sau đó đăng nhập vào và tạo website của bạn. Hai bước này khá đơn giản nên mình không trình bày ở đây, các bạn có thể tham khảo tại trang chủ của 000webhost.

Cách tốt nhất để tải source code lên là nén nó lại, sau đó tải file nén lên host rồi giải nén nó ra.
## 1. Đi tới thư mục gốc dự án
![Root folder](https://images.viblo.asia/e1db993d-ed8a-426b-a5d3-c6eb6dcbf11a.png)
## 2. Chọn tất cả các tệp và thư mục (ngoại trừ node_modules) và nén dưới dạng ZIP
![Zip file](https://images.viblo.asia/b6ff042b-99a3-435f-91ea-d4662799ae03.png)

## 3. Sau khi nén hãy đảm bảo rằng bạn có tập nén như sau
![File zipped](https://images.viblo.asia/35bacf0f-49f9-4119-b664-41de27f7786f.png)

## 4. Đi đến File Manager và upload tập vừa nén lên
![Upload file](https://images.viblo.asia/3d0fec83-a51e-4dee-be59-d2eccfd89159.png)

## 5. Sau khi upload thành công, bạn hãy giải nén nó
![](https://images.viblo.asia/96da70cf-d483-461c-bc78-266a49c818a6.png)

Nếu quá trình giải nén không thành công, 000webhost báo lỗi, hãy thử sử dụng unzipper để giải nén source code (Lỗi này mình đã gặp phải và mất khá nhiều thời gian để giải quyết). Chi tiết cách sử dụng xem tại: https://github.com/ndeet/unzipper

Đợi quá trình giải nén thành công là bạn đã tải source code thành công rồi đấy.


# Thiết lập môi trường
Ở các bước làm trước bạn đã tải thành công source code lên, tuy nhiên vẫn cần phải cấu hình thêm một vài bước để dự án có thể chạy được:
## 1. Di chuyển các tệp, thư mục đến vị trí thích hợp
Mặc định khi upload source lên, cấu trúc thư mục của 000webhost sẽ là:
```
Thư mục gốc / public_html / Tên file đã upload / Các file đã giải nén
```
Để dự án có thể hoạt động, bạn cần di chuyển tất cả các tệp , thư mục đã giải nén mang ra thư mục gốc của 000webhost (Root)
![Move files](https://images.viblo.asia/07fdd8e8-21e3-4a2a-ac2a-8e226130f3f1.png)

Sau khi di chuyển cấu trúc thư mục sẽ là:

```
Thư mục gốc / Các file đã giải nén
```

![Move files](https://images.viblo.asia/2d107bed-e398-4a8d-a5f0-0e43d2823ed9.png)

## 2. Cấu hình đường dẫn thư mục public

Mặc định 000webhost sử dụng public_html làm thư mục công khai, còn laravel sử dụng thư mục public làm thư mục công khai. Vì vậy chúng ta phải cấu hình lại cho đúng:
* Xóa bỏ thư mục **/public_html** mặc định của 000webhost
* Đổi tên thư mục **public** của laravel bạn đã upload lên thành **public_html**
* Đi tới **/app/Providers/AppServiceProvider.php** thêm đoạn mã sau vào phương thức **register()**:
```
$this->app->bind('path.public', function()
{
        return base_path('public_html');
});
```
![Edit AppServiceProvider](https://images.viblo.asia/58881561-15bc-4d1f-854f-97bccedc7b00.png)

## 3. Cấu hình môi trường trên host

* Mở file **.env** lên và copy **APP_KEY** (chỉ lấy phần sau chữ base64:)
* Mở file **/config/app.php** và cập nhật dòng "key" như ảnh:

![Update key](https://images.viblo.asia/27e367ff-03d9-43dc-ac56-ae4c4955b899.png)
* Nếu dự án của bạn có cơ sở dữ liệu, bạn cần config chúng ở file **.env** và file **/config/database.php**
* Xóa toàn bộ cache cũ: xóa toàn bộ file trong **/bootstrap/cache** (ngoại trừ **.gitignore**)

Đến đây bạn đã upload thành công dự án của mình lên 000webhost, vào trang web của bạn và hưởng thụ thành quả nào :sunglasses:.
# Tổng kết
Trong bài viết này mình đã hướng dẫn các bạn deploy một dự án laravel lên 000webhost, hướng dẫn chi tiết kèm hình ảnh minh họa rõ ràng giúp cho các bạn dù mới tìm hiểu cũng có thể dễ dàng thực hiện được.

Trong quá trình thực hiện nếu các bạn gặp lỗi, các bạn vui lòng để lại bình luận dưới đây để mọi người thảo luận tìm cách giải quyết nhé. Nếu thấy bài viết hay, có ích thì đừng ngần ngại để lại 1 upvote cho tác giả nhé. Nghiện mà, sao phải ngại :sweat_smile:.

**Tham khảo:** https://www.000webhost.com/