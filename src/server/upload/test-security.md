![](https://images.viblo.asia/9a5dc43c-4338-4a62-9364-48323b6acff7.jpg)

### Test Security

***Security Testing*** là việc tìm kiếm tất cả cá lỗ hổng có thể và điểm yếu của hệ thống mà có thể dẫn đến mất thông tin trong tay nhân viên hoặc người ngoài của tổ chức. Security Testing rất quan trọng trong ngành công nghiệp CNTT để bảo vệ dữ liệu của tất cả các phương tiện.

**1. Test Security là cần test cái gì?**

Cần chú ý đến các đối tượng và hoạt động Test sau:

(1). Phân quyền (các vai trò và danh sách quyền tương ứng): chú ý vai trò của từng đối tượng sử dụng và các quyền cùng việc phân quyền phải chính xác, nếu không việc thông tin bị lộ một cách không phù hợp là khó tránh khỏi. Thông thường các ứng dụng luôn có 1 function cho việc Phân quyền nên việc Test bảo mật ở đây là test function của module Phân quyền và đảm bảo danh sách quyền đi kèm từng vai trò và danh sách vai trò là đủ và chính xác.

(2). Độ an toàn của mạng (Network Scanning): thường sử dụng một tool quét tự động các cổng truy cập để đảm bảo tất cả các host trong mạng lưới có được đảm bảo an toàn trong mạng nội bộ và không bị truy cập bất hợp pháp từ một mạng ngoài không.
Tool quét thường dùng cho trường hợp này là NMap.

(3) Rà soát các lỗ hổng tiềm ẩn (Vulnerability Scanning): Tool quét mạng có thể phát hiện ra các lỗ hổng bảo mật đã có và tồn tại trong mạng hoặc ứng dụng, còn kiểu test này là phát hiện ra các lỗ hổng bảo mật tiềm ẩn (chưa có ở thời điểm hiện tại nhưng có thể xảy ra trong tương lai).

(4). Phát hiện các khả năng ăn trộm/bẻ gãy mật khẩu (Password Cracking)

(5). Phát hiện lỗ hổng bảo mật từ các bản ghi log (Firewall log, IDS log, Server log, ...) => cùng là phát hiện lỗ hổng bảo mật tiềm ẩn hoặc đã có (tương tự phần 2, và 3 nhưng phương thức thực hiện là khác nhau. Kiểu 2) và 3) là dùng tool quét tự động và phân tích dựa trên kết quả đã qua sàng lọc của các tool quét tự động. Còn phương thức 5) này dựa trên các bản ghi log của hệ thống).

(6). Kiểm tra tính toàn vẹn của hệ thống File (File Integrity Checkers): sự không đồng nhất về kiểu dữ liệu file trong 1 ứng dụng hay hệ thống có thể tạo kẽ hở để hacker thâm nhập vào. Rất nhiều virus khai thác qua kẽ hở này đã chứng minh điều đó.

(7). Dò tìm và phát hiện virus (virus director)

(8). War Dialling: là 1 thuật ngữ chỉ 1 hình thức lỗ hổng bảo mật mà hacker có thể khai thác qua modem mạng khiến gây ra hậu quả lớn. Các modem mạng nặc danh xuất hiện trong hệ thống mạng cung cấp 1 phương tiện vượt qua được tất cả các phương thức bảo mật. Có một số phần mềm cho phép hacker và người quản trị mạng gọi được đến một số lượng lớn số điện thoại mà 1 modem có trong nó (ví dụ: 1 máy tính với 4 modem có thể gọi ra được 10.000 số điện thoại trong ngày, việc thất thoát dữ liệu là rất lớn).

.....
Ngoài ra còn có một số phương thức khác nữa nhưng không quen thuộc lắm nên mình không list ra đây.

**2. Chọn phương thức nào và test ra sao?**

Để Test bảo mật được trọn vẹn thì nhiều thứ phải làm lắm (bạn xem list ở phần 1 nhe). Mà thời gian của các dự án thường không cho phép và chi phí cho nó cũng không rẻ! Do đó, khi thực hiện test cũng nên cân nhắc lựa chọn một số phương thức phù hợp với mục tiêu của khách hàng và mục tiêu dự án cần có.

Theo mình, để test được Security, bạn phải có kiến thức về Security: Kiến thức an toàn thông tin và an toàn dữ liệu (=> Test phân quyền), Thất thoát dữ liệu và khả năng bị Mất dữ liệu (các lỗ hổng bảo mật), Khả năng bị phá hoại (bị khai thác lỗ hổng bảo mật và phá hoại hệ thống thay vì ăn trộm dữ liệu), ....

Tài liệu tham khảo: Kiến thức này mình được ghi chép trong thời gian học test nên không có link trang tham khảo. Các bạn thông cảm nhé (bow)