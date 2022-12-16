![](https://images.viblo.asia/3ade2621-b121-4406-8150-370a1d4d4e5f.jpg)


Bài viết sau đây giới thiệu sơ lược về mã QR
# 1. Quick Response code (Mã QR) là gì?
QR là từ viết tắt của Quick Response (Tạm dịch “Mã phản hồi nhanh”). Đây là một mã ma trận hay được gọi là mã vạch hai chiều, dùng để cung cấp quyền truy cập thông tin một cách đơn giản, có thể được đọc bởi máy đọc mã vạch hay smartphone. Mã QR gồm những module màu đen được xắp xếp theo một quy luật nhất định trong một ô vuông có nền trắng. Sự tổ hợp những module này có thể cung cấp một lượng lớn thông tin mã hóa cho dữ liệu như: Các liên kết, văn bản…

Mã QR được xây dựng từ năm 1994 bởi công ty Denso Wave (Nhật Bản) nhằm mục đích giải mã ma trận với tốc độ cao. Ban đầu, mã QR được dùng chủ yếu vào việc quản lý kiểm kê và chỉ phổ biến tại Nhật Bản. Tuy nhiên, ngày nay, chúng được dùng ở mọi lĩnh vực và lan rộng ra nhiều quốc gia trên thế giới.

Điểm khác nhau giữa mã QR và mã vạch truyền thống là lượng dữ liệu chúng nắm giữ:
- Mã vạch truyền thống có các đường vạch thẳng dài, một chiều và chỉ có thể lưu tối đa 20 ký tự.
- Mã QR hai chiều, có thể lưu hàng ngàn ký tự, bởi vì chúng có thể mang thông tin theo cả chiều dọc và chiều ngang. Chứa lượng thông tin lớn và dễ sử dụng sẽ chiếm ưu thế lớn khi áp dụng vào thực tiễn.
- Mã QR được phát triển để có thể đọc nhanh hơn, tiết kiệm thời gian và không gian so với các loại mã vạch truyền thống. Chúng có thế dễ dàng được đọc bởi smartphone, có rất nhiều ứng dụng hỗ trợ quét mã QR trong cửa hàng ứng dụng.

**Phân loại:**
- Mã QR tĩnh: Đây là loại phổ biến nhất. Chúng thường được hiển thị trong các tài liệu quảng cáo, trên truyền hình, trên báo và tạp chí. Người tạo mã có thể theo dõi thông tin về số lần mã được quét và hành động liên quan đến mã được thực hiện, cùng với thời gian quét và hệ điều hành của các thiết bị đã quét mã...
- Mã QR động (Mã QR duy nhất) mang nhiều chức năng hơn. Chủ sở hữu có thể chỉnh sửa mã bất cứ lúc nào và có những mã khác nhau cho từng đối tượng hướng đến. Các mã này có thể theo dõi thông tin cụ thể hơn, bao gồm tên máy quét, địa chỉ email, số lần quét mã...
# 2. Phương pháp tạo mã QR
**Dữ liệu kỹ thuật**
- Tiêu chuẩn: Các tiêu chuẩn quy chuẩn cho hệ thống ký hiệu mã QR được đặt tên là JIS X 0510 (Nhật Bản) hoặc ISO/IEC 18004 (Tiêu chuẩn quốc tế ISO).
- Dung lượng dữ liệu: Một mã QR có thể chứa tới 7089 ký tự số, 4296 ký tự chữ và số, 2953 byte hoặc 1817 ký tự Kanji.
- Bộ ký tự: Ban đầu, JIS-8/Shift-JIS là bộ ký tự mặc định, tiêu chuẩn ISO/IEC 18004 năm 2006 định nghĩa Latin-1 là bộ ký tự mặc định. Các ứng dụng di động thường sử dụng UTF-8 làm mặc định, vì vậy, tùy thuộc vào trình đọc mã vạch mà lựa chọn bộ ký tự nào được sử dụng.
- Sửa lỗi: Mã QR cung cấp sửa lỗi tích hợp dựa trên thuật toán Reed-Solomon. Các mức được hỗ trợ là Low, Medium, Quartile, High. Tùy thuộc vào mức độ sửa lỗi, có thể khôi phục từ 7% (Low) đến 30% (High) của các thông tin không thể đọc được trong từ mã QR.
- Mã QR hỗ trợ "Structured Append". Tối đã 16 mã QR có thể được liên kết với nhau. Nếu một máy quét hoặc bộ giải mã hỗ trợ tính năng này, nó sẽ trả về nội dung dữ liệu được nối theo đúng thứ tự.
- Chất lượng in mã QR: Để có thể đọc mã QR hiệu quả nhất thì không nên in chúng nhỏ hơn 5 pixel.

So với giới hạn 20 ký tự của mã vạch truyền thống, mã QR có thể chứa hàng nghìn ký tự dữ liệu. Do đó, mã QR có thể được sử dụng để chia sẻ nội dung đa phương tiện. Mã QR cũng có thể hướng điện thoại để thực hiện một số hành động nhất định (Ví dụ: Một chương trình ca nhạc có thể cung cấp mã QR không chỉ gửi thông tin về thời gian, địa điểm, ca sĩ, mà còn có thể nhúng thông tin về ngày, giờ và địa điểm của các chương trình sắp tới vào lịch điện thoại).

Dữ liệu có thể được dịch thành mã QR thông qua trình tạo mã QR. Người dùng nhập dữ liệu họ muốn mã QR hiển thị và trình tạo biến nó thành biểu tượng. Hiện tại có rất nhiều ứng dụng để tạo mã QR hoàn toàn miễn phí , có thể dễ dàng được tìm thấy trên Google
# 3. Cấu trúc mã QR
Mã QR có cấu tạo hình vuông, bên trong gồm các ô caro đen trắng đen xen nhau. Các ô vuông nhỏ này không hề được sắp xếp ngẫu nhiên như chúng ta thấy. Sự lộn xộn đó đều tuân theo một cấu trúc nhất định.
![](https://images.viblo.asia/16be9909-ee34-4daa-9a8d-e052dd9ee4d6.png)
- Finder pattern: Biểu thị hướng khi in mã QR.
- Aglignment pattern: Đây là phần bổ sung giúp máy quét mã QR dễ dàng hơn khi mã có kích thước lớn.
- Timing pattern: Những dòng này có chức năng giúp máy quét xác định chính xác độ lớn của dữ liệu.
- Version information: Quy định phiên bản mà mã QR đang sử dụng trong 40 phiên bản mã QR có hiện nay.
- Format information: Chứa thông tin về mẫu data mask và khả năng chịu lỗi của mã, giúp cho việc quét mã được dễ dàng.
- Data: Đây là phần chứa dữ liệu thực tế.
- Quiet zone: Đây là vạch phân cách giúp cho các thiết bị quét phân biệt được mã QR với môi trường ngoài mã.
# 4. Ứng dụng của mã QR
- Lưu trữ URL: Điện thoại chỉ việc đọc mã QR để lấy URL, sau đó tự động mở trình duyệt.
- Sử dụng tại các bến xe bus, xe lửa, tàu điện ngầm: Người dùng khi quét mã QR của bến xe sẽ biết thông tin về các chuyến xe.
- Sử dụng tại các viện bảo tàng: Người dùng chỉ cần quét mã QR đặt cạnh vật trưng bày là biết được thông tin chi tiết về đồ vật đó.
- Sử dụng để mua hàng ở bất kỳ đâu: Người sử dụng khi đi tàu, xe bus… nếu thấy thích mặt hàng đang quảng cáo trên đó có thể đặt mua ngay lập tức thông qua mã QR.
- Sử dụng tại siêu thị: Các thông tin như nhà cung cấp, nơi sản xuất, hạn dùng, hướng dẫn sử dụng, thành phần của các mặt hàng... cũng có thể được cung cấp bởi mã QR.
- Sử dụng tại các buổi hội thảo, thuyết trình, sự kiện: Người tham gia có thể sử dụng mã QR thay cho Business Card của mình.
- Sử dụng tại các chương trình nhạc hội, live show, bar, club: Để xác định tên, ca sỹ, ban nhạc, tác giả... của tiết mục trình chiếu.
- Sử dụng tại nhà hàng, khách sạn, tiệm coffee: Để biết được công thức và cách chế biến món ăn, thức uống...
- Sử dụng với đồ vật cá nhân (Xe, quần áo… ) : Cung cấp thông tin chi tiết về món hàng, xuất xứ, giá cả.

     ...
          
**Mã QR ngày càng ứng dụng rộng rãi do chúng có nhiều ưu điểm nổi trội hơn so mã vạch truyền thống**:
- Dung lượng cao: Lưu trữ nhiều dữ liệu hơn, cho phép lưu trữ nội dung thực và không chỉ các ID hoặc tham chiếu.
- Yêu cầu ít không gian hơn: Cùng một dữ liệu thì diện tích bề mặt để lưu trữ nhỏ hơn nhiều.
- Khả năng phục hồi: Ngay cả khi bị hư hại một phần thì chúng vẫn có cơ hội được đọc.
- Có thể đọc được từ bất kỳ hướng nào: Quét chúng từ mọi góc độ, người đọc không cần phải căn chỉnh theo hướng của mã.
- Structured Append: Dữ liệu có thể được chia thành nhiều mã khi quét có thể được kết hợp để tái tạo lại nội dung gốc.