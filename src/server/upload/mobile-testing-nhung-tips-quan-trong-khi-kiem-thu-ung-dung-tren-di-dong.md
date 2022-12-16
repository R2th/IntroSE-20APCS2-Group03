Ngày nay, ứng dụng di động đang phát triển rất mạnh mẽ và kiểm thử ứng dụng trên di động đang hot hơn bao giờ hết.

Vậy kiểm thử trên thiết bị di động sẽ cần được chú ý test những case nào? Sẽ test những gì và kiểm thử ứng dụng như thế nào?
![](https://images.viblo.asia/3d59ee64-a158-4b6d-ac5a-565e4d03cd8e.jpg)

Tuy nhiên, trước khi bắt đầu test bất kì 1 ứng dụng trên mobile nào (như là tool chat, mạng xã hội, các loại game, ứng dụng thương mại), có 1 vài điều mà chúng ta - những người thực hiện test ứng dụng mobile nên làm để test hiệu quả.
## I. 5 điều cần nhớ khi bắt đầu tiến hành test ứng dụng mobile
1. Phân tích các ứng dụng tương tự/tương đồng

Cố gắng phân tích 1 vài ứng dụng khác tương tự như ứng dụng của bạn. Ví dụ, nếu bạn phải test bất kì 1 ứng dụng chia sẻ phương tiện nào đó trên Mobile chỉ với việc tìm kiếm cho vài ứng dụng chia sẻ phương tiện khác và quan sát những đặc điểm của ứng dụng đó.

2. Giữ emulator của bạn ở trạng thái sẵn sàng để test

Đôi khi bị mất thời gian để thực hiện bất kì yêu cầu nào đó, ví dụ như yêu cầu tải 1 file phương tiện nào đó, hay load 1 trang trên thiết bị. Trong trường hợp này, để tiết kiệm thời gian, có lẽ bạn sẽ phải cố gắng thử tiến hành test với emulator của bạn, để thời gian được sử dụng tối đa, và giảm thiểu tổng số thời gian cho việc test.

3. Phân tích thiết bị liên quan tới các vấn đề

Khi được trang bị, phân tích xem đâu là thiết bị có liên quan tới các vấn đề được biết đến. Việc này giúp bạn hiểu được đâu là vấn đề liên quan tới thiết bị và đâu là vấn đề do ứng dụng của bạn sau khi thực hiện test.

4. Sử dụng emulator nhưng không tin tưởng hoàn toàn vào emulator

Khi thực hiện test, có lẽ bạn cần emulator giúp nhưng hãy note lại rằng toàn bộ việc test sẽ không thể được mô tả trong emulator. Hơn nữa, trong emulator thời gian phản hồi nhanh hơn, vì vậy có thể xảy ra trường hợp là bạn sẽ sót vài vấn đề về mạng yếu trên thiết bị.

5. Định nghĩa tiêu chí về performance

Tiêu chí dành cho bất kì performance ứng dụng mobile nào đó, đây là 1 trong những mối quan tâm quan trọng hàng đầu. Chắc chắn rằng bạn đang có một vài tham số performance để bạn sẽ tiến hành test ứng dụng mobile chống lại nó. Bộ nhớ/ghi nhớ là 1 trong những khó khăn cho performance các thiết bị mobile và hành vi trong ứng dụng của bạn theo các điều kiện này là một thứ thú vị để xem.

Và dưới đây là những check list quan trọng khi test ứng dụng trên di động.

## II.  Cài đặt và định hình ứng dụng khi test 
1.  Dự án yêu cầu kiểm thử trên:
 + Thiết bị di động/tablet nào (SamSung J7, Iphone5, IphoneX...).
 + Hỗ trợ trên những hệ điều hành nào (Android 4.3, 4.3,..., IOS6, 7, 8,...)
 + Kích thước màn hình hỗ trợ (4.0 inch, 4.5 inch...)
 Từ đó dùng chương trình giả lập và dùng cả thiết bị thực để thực hiện việc kiểm thử.
2. Ứng dụng đang kiểm thử được lưu trữ ở đâu - hình thức lưu trữ (thẻ nhớ - bộ nhớ điện thoại).
Điều gì sẽ xảy ra khi xóa thự mục lưu trữ của ứng dụng.
3. Ứng dụng cùng hoạt động trên nhiều thiết bị khác nhau, việc đồng bộ sẽ như thế nào
4. Tải ứng dụng ở đâu - kiểm thử các trường hợp đầy bộ nhớ hoặc gián đoạn trong quá trình tải app.
5. Kiểm thử quá trình cài đặt, gỡ bỏ ứng dụng, cài đặt lại và sẽ như thế nào nếu quá trình đó bị gián đoạn.
6. Kiểm thử quá trình update app, sẽ như thế nào nếu không update version mới
## III. Test giao diện ứng dụng trên di động
Tương tự như kiểm thử website hay ứng dụng trên desktop, kiểm thử giao diện trên di động vẫn chú trọng vào các điểm sau:
1. Màu nền, màu chữ, kiểu chữ (hoa thường, font chữ...) có khớp với design, trường hợp không có design, có thể kiểm tra xem màu nền có phù hợp, có bị trùng với màu chữ gây khó đọc hoặc rối mắt người dùng không.
2. Font size, size của các textbox, button, và canh trái, phải, giữa... ở chế độ bình thường, chiều dọc, xoay theo chiều ngang...
3. Border các textbox, button... có smooth.
4. Text, tooltip của warning message, nội dung trang hiển thị...
5. Các hiệu ứng scrool, chuyển trang có smooth.
6. Dữ liệu hiện tại có được lưu khi đóng cửa sổ hay không?
7. Kiểm tra vị trí focus có được đặt ngay field đầu tiên hay control đầu tiên khi load màn hình hay không? Ngoại trừ trường hợp yêu cầu set vị trí focus cụ thể.
8. Kiểm tra giao diện khi người dùng thực hiện các hiệu ứng cảm ứng như swipe, touch, tap on, zoom, pinch, multi-touch, shake and orientation.
9. Bàn phím nhập liệu có hoạt động tốt và không gây lỗi khi tiến hành input dữ liệu trên tất cả các màn hình.
## IV. Test chức năng cho ứng dụng di động
1. Đảm bảo các chức năng có trong đặc tả yêu cầu hoạt động tốt.
2. Test những chức năng ngoài luồng
3. Test các chức năng khi mất kết nối mạng, kết nối wifi, kết nối chậm, kết nối 2G, 3G, 4G,.., chế độ máy bay.
4. Click, swipe. touch, scroll nhanh có gây ra lỗi.
5. Sự chuyển hướng từ các liên kết trong ứng dụng hoặc các Social link (G+, facebook...).
6. Thời gian của ứng dụng, trên phone hay server, khi thay đổi cài đặt trong điện thoại (ngày tháng, ngôn ngữ...) ứng dụng sẽ hoạt động ra sao.
7. Get dữ liệu từ server khi ở chế độ background running, khóa màn hình hay listen.
8. Kiểm tra sự động bộ dữ liệu khi đăng nhập nhiều thiết bị (desktop, tablet, moblie, web).
9. Test camera nếu có trong ứng dụng (chụp ảnh, lưu trữ...).
10. Nội dung, hình ảnh có hiển thị tốt khi chia sẻ trên G+, facebook..., điện thoại có cài ứng dụng facebook, G+ ... và không cài các ứng dụng đó.
11. Notification từ ứng dụng như update, nhắc nhở...
12. Kiểm thử các trường hợp bị gián đoạn khi sử dụng app như: cuộc gọi, tin nhắn, pin yếu, hoặc các trường hợp đang mở nhạc.
13. Chú ý kiểm thử cho các trường hợp System Crash/Force Close.

Trên đây là những góp nhặt và rút ra kinh nghiệm từ bản thân trong quá trình làm việc và kiểm thử ứng dụng trên thiết bị di động.

Hy vọng với những tips nhỏ mà mình chia sẻ, phần nào có thể giúp các bạn đang là kiểm thử viên hoặc đang tìm hiểu về test ứng dụng trên mobile có thể định hình được việc kiểm thử ứng dụng trên di động như thế nào và chú ý thêm một vài trường hợp để dự án hoạt động tốt hơn  :)