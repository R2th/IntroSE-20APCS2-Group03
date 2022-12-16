Xin chào mọi người, chắc hẳn mọi người khi bắt đầu làm hệ thống cho 1 tổ chức hay 1 đơn vị nào đó thì việc nhập các thông tin đã lưu trữ trước đó của họ vào database là vô cùng cần thiết, điển hình như là nhập thông tin từ excel vào hệ thống. Hôm nay mình xin chia sẻ cho mọi người cách import file từ excel vào database sử dụng Navicat. Bài này mình sử dụng Navicat 12. 

Việc cài đặt Navicat có rất nhiều cách có thể  "**active**" (ae chịu khó search google nha). Bài này mình xin bỏ qua phần cài đặt và "active". Mình vẫn khuyên anh em nếu có tài chính dư dả anh em cố gắng mua ủng hộ tác giả, có rất nhiều tiện ích hay khác trong navicat nha. Bài viết có thể còn nhiều sai sót hoặc mọi người có cách nào hay hơn mọi người comment đưa ra ý kiến giúp mình nha.

### 1. Kết nối MYSQL
- Đầu tiên ae mở Navicat lên nhấn vào mục Connection -> ở đây mình import vào MYSQL nên các hệ quản trị khác mọi người có thể chọn và làm tương tự
![](https://images.viblo.asia/32fcc0b9-6b2f-47b3-a439-812f829f9409.png)
- Khi nhấn vào sẽ có 1 số các thông số kết nối cơ bản như tên kết nối, host, port, username, password
![](https://images.viblo.asia/fed383d5-1abb-44bd-bdbb-ac223307386a.png)
### 2. Import file Excel
- Sau khi kết nối ta sẽ thấy các thông tin trong database của chúng ta -> Chọn đến bảng cần import -> Import Winzard. Tại đây mọi người có thể thấy ta có thể chọn rất nhiều loại file để import khác nhau như .db .json .csv .txt,..... Ở đây mình chọn file  Excel .xlsx rồi nhấn Next
![](https://images.viblo.asia/83303dd0-632d-42a1-bb81-393c7dd13d7d.png)
- Hộp thoại Import Wizard mở ra ta chọn File excel cần import ở đây mình có 1 file mẫu excel như sau lưu ý để thuận tiện cho việc import mình có đổi tiêu đề trong file excel tương ứng với tên cột trong database
![](https://images.viblo.asia/e7401ac2-22d6-429e-a943-b91b61b2a2e6.png)
- Tại đây 1 file excel có thể có nhiều sheet ta có thể chọn từng sheet để import hoặc chọn tất cả
![](https://images.viblo.asia/bac4e366-de59-4dc5-9452-b74f4930a6d1.png)
- Chọn bảng cần import đến
![](https://images.viblo.asia/5cf1c93b-d392-43f0-b68e-fd9de6395966.png)
- Khi ta thay tên tiêu đề cột ta giống với tiêu đề cột trong database Navicat sẽ tự động nhận tên cột nếu không trùng thì bắt buộc ta cần phải chọn cột đích tương ứng
![](https://images.viblo.asia/f5240f98-b5d2-4344-9f79-863e000c6a66.png)
- Hộp thoại hiện ra sẽ có rất nhiều lựa chọn kiểu import như thêm vào dữ liệu cũ, cập nhật nếu trùng, xóa tất cả đi import lại,.. . Ở đây mình chọn Append để thêm dữ liệu vào
![](https://images.viblo.asia/a0365eef-f843-43cc-859a-b525e3c1d7b5.png)
- Bước tiếp theo ta chỉ cần nhấn Start. Trạng thái import thành công hay lỗi đều được hiển thị rõ ràng
![](https://images.viblo.asia/323f104b-ac2b-4e95-83d1-010ddf15880e.png)

Ngoài ra navicat còn có rất nhiều tiện ích khác như kiểm tra tốc độ truy vấn, lập lịch tự động, phân quyền user vào database,..  

Hi vọng bài viết này có thể giúp được cho mọi người phần nào trong việc import dữ liệu :D :D