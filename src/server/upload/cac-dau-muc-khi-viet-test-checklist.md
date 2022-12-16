# 1. Giới thiệu về test checklist
## 1.1 Khái niệm
Test checklist là một danh sách kiểm thử nên được thực hiện trong một quy trình nhất định. Bao gồm những items được kiểm tra, danh sách các quy tắc, hoặc tiêu chuẩn cụ thể hoặc điều kiện dữ liệu để xác minh
## 1.2 Tại sao sử dụng test checklist
* Test checklist là danh sách cấp cao, vì vậy QA có thể tạo chi tiết trường hợp kiểm thử dựa vào test checklist
* Trước khi thực thi kiểm thử, QA cần tạo test checklist để đảm bảo rằng tất cả yêu cầu được bao phủ bởi test checklist
* Ngăn chặn việc thiếu quan điểm kiểm thử, ngăn ngừa bug
* Theo dõi quá trình kiểm thử dễ dàng

# 2. Hướng dẫn tạo test checklist
## 2.1 Tổ chức test checklist
Có nhiều cách để tổ chức test checklist phụ thuộc vào dự án. Cơ bản, chúng ta có thể tổ chức test checklist như sau:
* GUI
* Functional
* Non-functional
## 2.2 GUI checklist
* Kiểm tra giao diện chung: cỡ chữ, vị trí, màu sắc, menu, căn dòng
* Kiểm tra thành phần trên màn hình: logo, links, button, radio button, textbox, combobox, checkbox, list box (loại đối tượng, hiển thị mặc định, trường bắt buộc, có thể chỉnh sửa)
* Phương thức truy cập: tab key, shift tab keys, mouse hover, tooltip
## 2.3 Functional checklist
* Kiểm tra logic nghiệp vụ
* Kiểm tra trường hợp positive và negative
* Kiểm tra quyền vai trò
* Xác minh các trường dữ liệu
## 2.4 Checklist trong trường nhập vào
* Multi search input box, null value, 0 value, multi search value (multi space only, 1 word only, many words that matching/not matching), valid/invalid kí tự (alphabet, numeric, lower/upper case, full/half size, redundant space, ...)
* Email:
* Phần local part: khoảng cách ở đầu, kết thúc, số/chữ, chữ hoa/chữ thường, kí tự đặc biệt, độ dài lớn nhất 64 kí tự
* Phần domain part: kí tự tiếng anh (chữ hoa/chữ thường), kí tự đặc biệt, độ dài lớn nhất 255 kí tự
* Trường hợp đặc biệt: thiếu/thừa @, có “..” trong email, có “.” ở cuối phần local part, kết thúc email, SQL, HTML, null, unicode, half size, full size, …
* Số: số, null, kí tự, full size, half size, min, max, html, sql injection, có “.”, hoặc “.” ở sai vị trí (<> khối 3 số)
* Tiền tệ (số, chữ, có kí tự, kí tự tiền tệ, độ dài lớn nhất, độ dài bé nhất, ...)
* Số điện thoại: số, có kí tự () - + ở cấc vị trí đúng và không đúng
* Chuỗi: alphabet, số, full-size, half-size, min/max độ dài, html, kí tự đặc biệt, SQL injection, thừa khoảng trống, …
* Mật khẩu: alphabet, numeric, full/half size, lower/upper case, kí tự hợp lệ “.” “_” “@” min, max, kí tự đặc biệt, khoảng trống, masking pass
* Confirm mật khẩu: đúng và không đúng
## 2.5 Non - functional checklist
* Performance testing
* Usability testing
* Compatibility testing …

# 3. Ví dụ về test checklist cho trang web
## 3.1 Kiểm thử khả dụng
* Nội dung trang web không có lỗi chính tả và lỗi ngữ pháp
* Tất cả kích cỡ giống yêu cầu đặc tả
* Nội dung căn chỉnh
* Thông báo lỗi đúng ngữ pháp, chính tả, tương ứng với các trường
* Tool tip có với tất cả các trường
* Tất cả các trường được căn chỉnh
* Đủ khoảng cách giữa nhãn, cột, hàng, thông báo lỗi
* Tất cả nút có chuẩn và kích cỡ
* Link home ở tất cả các trang đơn
* Vô hiệu hóa trường màu nâu
* Kiểm tra broken links và ảnh
* Thông báo xác nhận hiển thị với thao tác sửa và xóa
* Kiểm tra kích cỡ khác nhau .Kiểm tra người dùng cuối có thể chạy hệ thống mà không thất vọng
* Kiểm tra tab hoạt động đúng
* Scroll bar xuất hiện khi có yêu cầu
* Không có thông báo lỗi khi submit, thông tin được điền bởi người dùng được giữ nguyên
* Tiêu đề hiển thị tại mỗi trang web
* Tất cả các trường (textbox, dropdown, radio button, ... ) và nút được truy cập bởi keyboard shortcuts và người dùng có thể thực hiện các thao tác bằng keyboard
* Kiểm tra xem dữ liệu dropdown không bị xóa do kích thước trường và kiểm tra xem dữ liệu được mã hóa hay quản lý thông qua quản trị viên.
## 3.2 Functional Testing
* Kiểm tra tất cả các trường bắt buộc được xác minh
* Kiểm tra kí hiệu * được hiển thị tại các trường bắt buộc
* Kiểm tra hệ thống không hiển thị lỗi cho trường không bắt buộc
* Kiểm tra năm nhuận
* Kiểm tra trường số không chấp nhận chữ và thông báo đúng hiển thị
* Kiểm tra số âm nếu cho phép nhập số
* Kiểm tra chia cho số 0 
* Kiểm tra độ dài lớn nhất tại mỗi trường để đảm bảo dữ liệu không bị xóa
* Kiểm tra thông báo pop up hiển thị khi dữ liệu đạt độ dài lớn nhất
* Kiểm tra thông báo xác nhận khi xóa và sửa
* Kiểm tra số lượng giá trị hiển thị đúng định dạng tiền tệ
* Kiểm tra tất cả trường input với kí tự đặc biệt
* Kiểm tra chức năng timeout
* Kiểm tra phân loại chức năng
* Kiểm tra chức năng của nút được kích hoạt
* Kiểm tra luật riêng tư 
* Kiểm tra bất cứ chức năng lỗi nào người dùng được quay lại trang báo lỗi
* Kiểm tra tài liệu tải lên được mở đúng cách
* Kiểm tra người dùng tải các tệp được tải lên
* Kiểm tra chức năng email của hệ thống
* Kiểm tra javascript hoạt động đúng với các trình duyệt khác nhau (IE, Chrome, Safari, Opera)
* Kiểm tra người dùng xóa cookie trong khi đang trên website
* Kiểm tra người dùng xóa sau khi rời khỏi website
* Kiểm tra tất cả dữ liệu trong combo/danh sách box được sắp xếp thứ tự
## 3.3 Kiểm tra tính tương thích
* Kiểm tra website tại các trình duyệt khác nhau (IE, Firefox, Chrome, Safari ...)
* Kiểm tra phiên bản html đang dùng có tương thích với phiên bản trình duyệt
* Kiểm tra ảnh hiển thị đúng với các trình duyệt khác nhau
* Kiểm tra cỡ chữ được sử dụng ở các trình duyệt khác nhau
* Kiểm tra tệp gif qua các trình duyệt khác nhau
* Công cụ hỗ trợ kiểm tra tính tương thích: spoon.net
## 3.4 Kiểm thử cơ sở dữ liệu
* Kiểm tra tên csdl, gắn với đặc tả
* Kiểm tra bảng, cột, loại cột và giá trị mặc định có tương ứng với đặc tả
* Kiểm tra cột cho phép null hay không
* Kiểm tra khóa chính và khóa ngoại cho mỗi bảng
* Kiểm tra thủ tục lưu
* Kiểm tra thủ tục lưu được cài đặt hay chưa
* Kiểm tra tên thủ tục lưu
* Kiểm tra tên tham số, loại, số tham số
* Kiểm tra tham số xem bắt buộc hay không
* Kiểm tra thủ tục lưu khi xóa một vài tham số
* Kiểm tra khi đầu ra rỗng, bản ghi rỗng bị ảnh hương
* Kiểm tra thủ tục lưu bằng câu lệnh SQL
* Kiểm tra thủ tục lưu lại giá trị
* Kiểm tra thủ tục lưu với giữ liệu mẫu
* Kiểm tra hành vi của các thẻ trong bảng
* Kiểm tra dữ liệu hoạt động đúng khi lưu và cơ sở dữ liệu sau khi submit mỗi trang
* Kiểm tra dữ liệu khi thao tác thêm, sửa, xóa được thực hiện
* Kiểm tra độ dài mỗi trường: độ dài trường trong backend và frontend cần giống nhau
* Kiểm tra tên cơ sở dữ liệu, tên nên là duy nhất
* Kiểm tra dữ liệu mã hóa trong cơ sở dữ liệu
* Kiểm tra kích thước dữ liệu, được kiểm thử thời gian phản hồi của mỗi câu truy vấn
* Kiểm tra dữ liệu hiển thị trên front-end có giống trên back-end
* Kiểm tra dữ liệu bằng việc chèn dữ liệu không hợp lệ vào csdl
* Kiểm tra xem hệ thống kích hoạt với db hay chưa
## 3.5 Kiểm tra bảo mật
* Kiểm tra trang web bao gồm dữ liệu quan trọng như mật khẩu, tài khoản thẻ, câu hỏi bảo mật được submit qua https
* Kiểm tra thông tin quan trọng hiển thị dưới dạng mã hóa
* Kiểm tra quy tắc mật khẩu được áp dụng trong trang xác thực như đăng ký, …
* Kiểm tra lỗi được hiển thị ở những thông tin quan trọng
* Kiểm tra xem người dùng đăng xuất từ hệ thống và phiên làm việc hết hạn, người dùng không thể điều khiển trang web
* Kiểm tra truy cập trang web bảo mật và không bảo mật qua link trực tiếp mà không đăng nhập
* Kiểm tra mã nguồn tùy chọn vô hiệu hóa và không truy cập được người dùng
* Kiểm tra tài khoản người dùng nếu người dùng nhập vào sai mật khẩu nhiều lần
* Kiểm tra cookies không lưu mật khẩu
* Kiểm tra bất cứ chức năng nào không hoạt động, hệ thống không nên hiển thị bất cứ thông tin máy chủ, dữ liệu, thay vào đó nó nên hiển thị trang báo lỗi tùy chỉnh
* Kiểm tra tấn công SQL injection
* Kiểm tra vai trò người dùng và quyền của họ, ví dụ người yêu cầu không nên vào được trang quản trị
* Kiểm tra thao tác quan trọng được lưu vào tệp lịch sử, thông tin được theo dõi
* Kiểm tra giá trị session ở dạng mã hóa tại địa chỉ bar
* Kiểm tra thông tin cookie được mã hóa đúng chuẩn 
* Kiểm tra ứng dụng với brute force attacks
## 3.6 Performance testing
* Xác định performance, tính ổn định, tính mở rộng của ứng dụng dưới điều kiện tải khác nhau
* Xác định kiến trúc hiện tại hỗ trợ ứng dụng với mức người dùng cao nhất
* Xác định kích cỡ kết cấu cung cấp mức performance cao nhất
* Xác định ứng dụng và thiết kế cổ trai
* Xác định xem phiên bản mới của phần mềm có ảnh hưởng xấu đến thời gian phản hòi
* Đánh giá sản phẩm và phần cứng để xác định xem có thể điều khiển mức độ tải

# Kết luận
Tạo testcase hay checklist thì mục đích cuối cùng vẫn là đảm bảo được chất lượng dự án. Vì vậy cần làm cẩn thận, đảm bảo bao quát được tất cả nghiệp vụ hệ thống. Bài viết này dựa trên các nguồn tài liệu tham khảo sau:
https://www.guru99.com/complete-web-application-testing-checklist.html
https://viblo.asia/p/danh-sach-kiem-trachecklist-su-dung-trong-qua-trinh-tao-testcase-XQZkxdpMkwA

Cảm ơn mọi người đã đọc bài viết.