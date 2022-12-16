# Kiểm thử ứng dụng trên thiết bị di động 
Ngày nay - ứng dụng di động đang ngày càng phát triển và Kiểm thử ứng dụng trên điện thoại đang hot hơn bao giờ hết .
Vậy kiểm thử trên thiết bị di động sẽ chú ý test những case nào ? Chúng ta sẽ test những gì và kiểm thử ứng dụng như thế nào ? 
Bài viết này sẽ chia sẽ những checklist quan trọng khi test trên điện thoại di động 

![](https://images.viblo.asia/51ec08ba-fd53-435a-a5d5-01787dbe974e.jpeg)

## I. Cài đặt và định hình ứng dụng khi Test trên thiết bị di động 

1) Dự án của bạn Client yêu cầu kiểm thử trên thiết bị di động/ tablet nào ( SamSung S5, Iphone5, Iphone 4...) , hỗ trợ trên những hệ điều hành nào ( Android 4.2,4.3 ...IOS6, IOS7,IOS8...), Kích thước màn hình hỗ trợ (4.0 inch, 4.5 inch ...) từ đó dùng chương trình giả lập và dùng cả thiết bị thực để thực hiện việc kiểm thử

2) Ứng dụng bạn đang kiểm thử lưu trữ ở đâu - hình thức lưu trữ ( Thẻ nhớ - bộ nhớ điện thoại)
Điều gì xảy ra khi ta xóa thư mục lưu trữ của ứng dụng

3) Ứng dụng cùng hoạt động trên nhiều thiết bị khác nhau ,việc đồng bộ sẽ như thế nào

4) Tải ứng dụng ở đâu - kiểm thử các trường họp đầy bộ nhớ hoặc gián đoạn trong quá trình tải app

5) Kiểm thử quá trình cài đặt, gỡ bỏ ứng dụng , cài đặt lại và sẽ như thế nào nếu quá trính đó bị gián đoạn

6) Kiểm thử quá trình update app , sẽ như thế nào nếu không update version mới

![](https://images.viblo.asia/6ec7c7c3-a058-459b-8e47-77e9d1bacbe5.jpg)

## II. Test giao diện ứng dụng trên thiết bị di động 

Tương tự như Kiểm thử Website hay ứng dụng trên desktop , Kiểm thử giao diện trên di động vẫn chú trọng vào các điểm sau:
1) Màu nền, màu chữ,kiểu chữ (hoa thường, font chữ...) có khóp với Design , trường họp không có design, có thể kiểm tra xem màu nền có phù họp - có bị trùng với màu chữ gây khó đọc hoặc rối mắt người dùng không

2) Font size, size của các textbox, button và canh trái , phải, giữa ...ở chế độ bình thường , chiều dọc , xoay theo chiều ngang ...

3) Border các textbox, button... có smooth

4) Text, tootip của warning message, nội dung trang hiển thị ...

5) Các hiệu ứng scroll, chuyển trang có smooth

6) Dữ liệu hiện tại có được lưu khi đóng cửa sổ hay không?

7) Kiểm tra vị trí focus có được đặt ngay field đầu tiên hay control đầu tiên khi load màn hình hay không? . Ngọai trừ có trường hợp yêu cầu set vị trí focus cụ thể

8) Kiểm tra giao diện khi người dùng thực hiện các hiệu ứng cảm ứng như swipe, touch ,tap on , zoom, pinch, multi-touch, shake and orientation.

9) Bàn phím nhập liệu có hoạt động tốt và không gây lỗi khi tiến hành input dữ liệu trên tất cả các màn hình

## III. Test chức năng cho ứng dụng di động

1) Đảm bảo các chức năng có trong thiết kế hoạt động tốt
2) Test những chức năng ngoài luồng
3) Test các chức năng khi mất kết nối mạng, kết nối mạng wifi, kết nối chậm, kết nối 3G,2G,4G..., chế độ máy bay ...
4) Click , swipe , otuch , scroll ...nhanh có gây ra lỗi
5) Sự chuyển hướng từ các liên kết trong ứng dụng hoặc các Social link ( g+,facebook...)
6) Thời gian của ứng dụng, trên Phone hay server ,Khi thay đổi cài đặt trong điện thoại ( ngày tháng , ngôn ngữ...), ứng dụng hoạt động ra sao
7) Get dữ liệu từ server khi ở chế độ background running,khóa màn hình hay listen
8) Kiểm tra sự đồng bộ dữ liệu khi đăng nhập ở nhiều thiết bị ( desktop, tablet, mobile)
9) Test camera nếu có trong ứng dụng, ( chụp ảnh, lưu trữ ...)
10) Nội dung, hình ảnh có hiển thị tốt khi chia sẻ trên G+,facebook ..., điện thoại có cài ứng ụng facebook, G+ ...và không cài các ứng dụng đó
11) Notification từ ứng dụng như update, nhắc nhở ...
13) Kiểm thử cho các trường họp bị gián đoạn khi sử dụng app như : Cuộc gọi , tin nhắn, Pin yếu, hoặc các tường họp đang mở nhạc,
14) Chú ý kiểm thử cho các trường họp System Crash / Force Close