# Các loại ứng dụng di động
**Ứng dụng gốc (Native app)**: là ứng dụng được viết riêng cho 1 loại nền tảng như Android, IOS, Window Phone bằng các ngôn ngữ tương ứng của mỗi nền tảng đó. Chỉ chạy trên 1 hệ điều hành nhất định.
**Ứng dụng web (Web app)**: là ứng dụng chạy trên nền web, người dùng thiết bị di động sẽ dùng các trình duyệt , ví dụ như Safari, Chrome, Firefox truy cập vào web server để sử dụng. Chạy được trên tất cả các trình duyệt của mobile. *Ví dụ: m.facebook.com*
**Ứng dụng lai (Hybrid app)**: kết hợp giữa ứng dụng web và ứng dụng gốc. Có thể chạy offline lẫn online.
Ứng dụng gốc cần cài đặt nhưng ứng dụng web không cần cài đặt. Ứnng dụng gốc được cài từ các kho ứng dụng app (App store).
Test Mobile app: Gồm kiểm thử giao diện, chức năng, CSDL, tính tương thích, bảo mật, hiệu năng…
# Khó khăn khi kiểm thử ứng dụng Mobile
Các ứng dụng mobile được deploy trên nhiều dòng máy khác nhau. Các dòng máy thì có nhiều điểm khác biệt:
* Các hệ điều hành khác nhau: Android, IOS, Window Phone, Blackberry
* Ứng với mỗi hệ điều hành thì lại có từng phiên bản hệ điều hành khác nhau: IOS 9, IOS10, IOS11, Android 7, Android 8…
* Cùng 1 hệ điều hành thì có nhiều dòng điện thoại khác nhau như Sony, HTC, Samsung…
* Kích thước màn hình của điện thoại cũng khác nhau
* Cách hiển thị mặc định ở các dòng máy là khác nhau: bàn phím, cách show thông báo, date/time picker
* Thiết bị di động có bộ nhớ ít hơn để bàn.
* Thiết bị Mobile thì sử dụng wifi hoặc 2G, 3G, 4G nên mạng yếu
![](https://images.viblo.asia/e8405b79-7477-45ec-8150-0dcea0248a91.png)

# Khắc phục khó khăn 
* Trước giai đoạn test cần xác định sẽ tập trung test các dòng máy nào trước và chỉ tập trung kiểm thử trước các dòng máy đó.
* Nắm được thiết kế là thiết kế dành cho màn hình kích cỡ bao nhiêu.
* Kiểm thử được các lỗi thông dụng và thường xảy ra ở các dòng máy khác nhau.
* Kiểm thử được hết trên các phiên bản hệ điều hành phổ biến.

# Khi kiểm thử trên thiết bị di động, cần lưu ý:
**Usability testing**: ứng dụng di động dễ sử dụng, tạo sự thoải mái và hài lòng cho khách hàng.
**Compatible testing**: test trên nhiều thiết bị di động, trình duyệt, kích thước màn hình, các phiên bản hệ điều hành khác nhau.
**Interface testing**: test menu, button, bookmark, xoay ngang, dọc màn hình…
**Services testing**: test ứng dụng ở chế độ online và offline/ airplane mode
**Performance testing**: test khả năng thực thi cua ứngdụng bằng cách thay đổi từ 2G, 3G sang wifi, chia sẻ tài nguyên (CPU, bộ nhớ…), mực tiêu thụ pin
**Installation testing**:
* Test bằng cách cài đặt và gỡ bỏ ứng dụng.
* Đang cài đặt để dụng ứng dụng thì có tin nhắn ,cuộc gọi đến hoặc báo thức.
* Một số trường hợp cạnh tranh xung đột: nhận sms, gửi sms, nhận cuộc gọi, chia sẻ bluetooth - xoay màn hình, cảm Nng, gps -định vị toàn cầu - quay phim, chụp hình, alarm, pin yếu, cắm sạc.
**Kiểm thử nâng version**:
Khi ứng dụng có nhiều version và đang cài đặt ở version thấp hơn so với version mới nhất sẽ có thông báo nâng version Ứng dụng
Kiểm thử có xuất hiện thông báo không, cách test là sử dụng các version cũ hơn, khi Dev build lên một version mới nhất cần hiển thị thông báo có version mới.
Nhấp vào thông báo cài đặt thì phải đến được App store để download app về. Cài đặt xong phải kiểm tra xem có đúng là version mới nhất không.
**Kiểm thử tràn bộ nhớ**:
Ứng dụng mobile có hạn chế về bộ nhớ nên thường văng lỗi nếu sử dụng bộ nhớ quá nhiều
**Cách test lỗi về memory**:
* Scroll lên xuống ứng dụng nhiều, scroll nhanh
* Các chức năng load dữ liệu thì tạo dữ liệu khi load nhiều lên ví dụ tạo danh sách nhiều hình ảnh và hình ảnh có size lớn hơn một chút.
* Thực hiện nhiều chức năng cùng một lúc
* Đang load màn hình thì thực hiện touch vào menu hoặc trên màn hình
# Responsive
## Thiết kế Responsive/ xây dựng giao diện Responsive là gì?
Responsive là phong cách thiết kế web phù hợp trên tất cả các thiết bị, mọi độ phân giải màn hình.
Vì vậy khi test Responsive người tester phải test trên ít nhất các màn hình Iphone, Android, ipad, tablet, xoay ngang/dọc để xem bộ phân giải, tùy biến của trang web/ứng dụng có bị tràn layout không, có hoạt động được bình thường không.
## Tác dụng của Responsive đối với website?
* Website có thể truy cập dễ dàng bằng tất cả các thiết bị: đáp ứng được nhu cầu của người trong thời đại toàn dùng Smartphone và máy tính bảng để lướt web
* Không phải mất công thiết kế nhiều giao diện khác nhau cho mỗi thiết bị khác nhau.
* Trang web được thiết kế cụ thể hơn với từng loại màn hình