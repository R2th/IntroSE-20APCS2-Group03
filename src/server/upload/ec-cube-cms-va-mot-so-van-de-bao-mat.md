# Giới thiệu về EC-Cube
Ra đời từ năm 2006, EC-CUBE hiện là platform thương mại điển tử mã nguồn mở số 1 tại thị trường Nhật Bản. EC-Cube ra đời vào năm 2006 và vẫn đang phát triển khá mạnh ở cả thị trường Nhật Bản và Việt Nam.

Là phần mềm miễn phí nhưng EC-CUBE có tất cả các chức năng cơ bản để "khai trương" ngay cho bạn một cửa hàng. Đối với các tính năng còn thiếu thì có thể bổ sung từ hơn 800 loại plugin trên store. Hơn nữa, nếu có kiến thức về lập trình thì có thể tuỳ chỉnh lại theo ý muốn. Một số ưu điểm của EC-Cube
- Bắt đầu với giá thành rẻ
- Có sẵn những chức năng thông thường
- Tự do tạo chức năng lẫn thiết kế

Một số tài nguyên EC-Cube:
- Trang chủ tiếng Nhật: https://www.ec-cube.net/
- Ec-Cube Việt hóa: https://ec-cube.vn/
- Github tiếng Nhật: https://github.com/EC-CUBE
- Github Việt hóa: https://github.com/eccubevn 

# Cài đặt EC-Cube
## Cài đặt qua windows xampp
- Cài đặt Xampp trên Windows
- Download source tiếng Nhật: https://github.com/EC-CUBE/ec-cube/releases
- Hoặc cài đặt tiếng Việt theo link Ec - Cube Việt hóa: - - https://ec-cube.vn/releases/ec-cube-vn-4.0.2.zip
Cài đặt các bước theo Step trong hướng dẫn
## Cài đặt qua Composer
- Download source tiếng Nhật: https://github.com/EC-CUBE/ec-cube/releases
- Hoặc Clone repo tiếng Việt: https://github.com/eccubevn/ec-cube-vn
- cd và thư mục ec-cube-vn
- Chạy: composer install
- Nếu gặp lỗi:  composer i --ignore-platform-reqs
## Kết quả cài đặt
### Web user

![](https://images.viblo.asia/c1894884-9773-40d3-968d-5fb13049cc76.png)

### Web admin

![](https://images.viblo.asia/abfc61a6-ae2d-46b3-9bb3-b26ffe23477a.png)

# Phân tích một số lỗ hổng bảo mật
## CVE-2020-5590 (Directory traversal)
### Chức năng bị lỗi
Lỗ hổng XSS xảy ra ở chức quản lý sản phẩm của admin. Việc không thực hiện kiểm tra tên file trước khi thực hiện thêm mới hoặc xóa file trên server dẫn đến việc kẻ tấn công có thể thực hiện xóa file tùy ý trên server. 
Chức năng bị lỗi là chức năng upload file ảnh trong danh mục quản lý sản phẩm
### Các phiên bản bị ảnh hưởng
- Các phiên bản EC-Cube <= 4.0.3 bị đều bị ảnh hưởng bởi lỗ hổng CVE-2020-5590
### Khai thác lỗi
**Admin**
1. Admin đăng nhập và tạo sản phẩm mới
2. Upload ảnh đại diện cho sản phẩm
3. Xóa một file ảnh đã được up lên trước đó
4. Thực hiện chặn bắt request bằng Burpsuite
5. Sửa tên file ảnh muốn xóa thành đường dẫn file bất kỳ trên server
6. Kẻ tấn công xóa thành công file bất kỳ trên server

![](https://images.viblo.asia/47bf4acb-ed6f-433d-83d6-f91e2d8e951e.png)


### Cách vá lỗ hổng
- Nhà phát triển fix lỗi bằng cách kiểm tra tên file trước khi thực hiện xóa: Tên file không được phép chứa các ký tự: `.` hay `/` và`/`.
- Code: `/src/Eccube/Form/Type/Admin/ProductType.php`

![](https://images.viblo.asia/d85704d2-81cb-405c-9536-f256e939b12b.png)

## CVE-2021-20717 (Stored XSS)
### Chức năng bị lỗi
Lỗ hổng XSS xảy ra ở chức năng generate mail template của admin. Khi không thực hiện lọc ký tự đầu vào nguy hiểm hoặc do không encoded dữ liệu đầu ra trước khi thực hiện tạo ra template mail. Vì vậy khi người dùng mua hàng và thực hiện nhập thông tin đơn hàng, thay vì chèn dữ liệu là thông tin khách hàng thông thường, kẻ tấn công lợi dụng để chèn các đoạn mã javascript độc hại
### Các phiên bản bị ảnh hưởng
- Các phiên bản EC-Cube từ 4.0.0 đến 4.0.5 đều bị ảnh hưởng bởi lỗ hổng CVE-2021-20717
### Khai thác lỗi
**Kẻ tấn công**
1. Tạo tài khoản và login
2. Mua hàng và thực hiện checkout
3. Nhập thông tin đơn hàng với các đoạn mã javascript độc hại:

![](https://images.viblo.asia/1571cca8-d2e2-4700-9958-aa302b7e709b.png)

**Admin**
1. Admin đăng nhập và xem danh sách đơn hàng
2. Chọn đơn hàng của khách hàng
3. Chọn email mới
4. Chọn template mail
5. Thực hiện xem trước nội dung mail
6. Javascript độc hại được thực thi

![](https://images.viblo.asia/5dd1fb16-8d8d-43e8-a7d7-24c1d2a66746.png)

### Cách vá lỗ hổng
- Nhà phát triển fix lỗi bằng cách bỏ thực hiện generate dữ liệu raw và template mail:

![](https://images.viblo.asia/019c25e4-88ee-4d7b-a0d4-96a472bfb616.png)

## CVE-2021-20778 (Broken Access Control)
### Chức năng bị lỗi
Việc thiết lập sai trong file .htaccess cho phép kẻ tấn công đọc các dữ liệu nhạy cảm trên server như file `.env` hay `web.config`.v.v. Kẻ tấn công không cần thực hiện bất kỳ thao tác xác thực nào mà vẫn có thể đọc dữ liệu trên.
### Các phiên bản bị ảnh hưởng
- Các phiên bản EC-Cube 4.0.6 bị ảnh hưởng bởi lỗ hổng CVE-2021-20778
### Khai thác lỗi
**Kẻ tấn công**
1. Kẻ tấn công truy cập vào đường dẫn chứa các file nhạy cảm
- **Web.config**: https://thiennv.com/eccube-406/web.config

![](https://images.viblo.asia/4c014387-f3a4-412c-80b5-82edeaf342c8.png)

- **.env**: https://thiennv.com/eccube-406/.env

![](https://images.viblo.asia/29401ff8-0ed0-4067-a847-9b2215ec08c6.png)


### Cách vá lỗ hổng
- Nhà phát triển fix lỗi bằng cách sửa file `.htaccess` theo hướng dẫn sau:

![](https://images.viblo.asia/1131c710-24ec-42c5-91e0-1e65d0974de5.png)

# References
- https://ec-cube.vn/product/index.html
- https://github.com/s-index/CVE-2021-20717
- https://www.ec-cube.net/info/weakness/20200609/weakness20200609_eccube4_diff.htm