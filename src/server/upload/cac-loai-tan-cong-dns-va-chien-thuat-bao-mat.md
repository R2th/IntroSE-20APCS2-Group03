Tên miền máy chủ (Domain Name Server) là một khối xây dựng nổi bật của Internet. Nó được phát triển như một hệ thống để chuyển đổi tên theo thứ tự bảng chữ cái thành địa chỉ IP, cho phép người dùng truy cập các trang web và trao đổi e-mail. DNS được tổ chức thành một cơ sở hạ tầng dạng cây, nơi cấp đầu tiên chứa các miền cao nhất, chẳng hạn như .com và .org. Các nút cấp hai chứa các tên miền chung, truyền thống. 
DNS hoạt động tương tự như cơ sở dữ liệu, được hàng triệu hệ thống máy tính truy cập để xác định địa chỉ nào có nhiều khả năng giải quyết truy vấn của người dùng nhất.
Trong các cuộc tấn công DNS, tin tặc đôi khi sẽ nhắm mục tiêu vào các máy chủ chứa tên miền. Trong các trường hợp khác, những kẻ tấn công này sẽ cố gắng xác định các lỗ hổng trong chính hệ thống và khai thác chúng vì lợi ích của cá nhân.
## Các loại tấn công:
### Từ chối dịch vụ (DoS) 
Một cuộc tấn công trong đó kẻ tấn công làm cho máy tính trở nên vô dụng (không thể truy cập được) đối với người dùng bằng cách làm cho tài nguyên không khả dụng hoặc bằng cách làm ngập hệ thống với lưu lượng truy cập lớn.
### Từ chối dịch vụ phân tán (DDoS) 
Kẻ tấn công kiểm soát một lượng lớn máy tính (hàng trăm hoặc hàng nghìn) để phát tán phần mềm độc hại và làm ngập máy tính của nạn nhân với lưu lượng truy cập quá tải và không cần thiết. Cuối cùng, không thể khai thác sức mạnh để xử lý xử lý chuyên sâu, hệ thống sẽ quá tải và sập.
### Giả mạo DNS (còn được gọi là nhiễm độc bộ nhớ cache DNS) 
Kẻ tấn công sẽ  ngăn chặn lưu lượng truy cập khỏi các máy chủ DNS thực và chuyển hướng chúng đến một máy chủ khác mà người dùng không hề hay biết. Điều này có thể gây ra đánh cắp dữ liệu cá nhân của người dùng.
### Thông lượng nhanh ( Fast flux )
Kẻ tấn công thường sẽ giả mạo địa chỉ IP của mình trong khi thực hiện một cuộc tấn công. Fast flux là một kỹ thuật thay đổi liên tục dữ liệu dựa trên vị trí để che giấu nơi chính xác cuộc tấn công đến từ đâu. Điều này sẽ che giấu vị trí thực của kẻ tấn công, giúp hắn có thời gian cần thiết để khai thác cuộc tấn công. Thông lượng có thể là đơn hoặc kép hoặc bất kỳ biến thể nào khác.
### Các cuộc tấn công phản ánh ( Reflected attacks )
Những kẻ tấn công sẽ gửi hàng nghìn truy vấn trong khi giả mạo địa chỉ IP của chính chúng và sử dụng địa chỉ nguồn của nạn nhân. Khi những truy vấn này được trả lời, tất cả chúng sẽ được chuyển hướng đến chính nạn nhân.
### Khuếch đại phản xạ DoS 
Khi kích thước của câu trả lời lớn hơn đáng kể so với truy vấn, một thông lượng được kích hoạt, gây ra hiệu ứng khuếch đại. Điều này thường sử dụng cùng một phương pháp như Reflected attacks, nhưng cuộc tấn công này sẽ lấn át cơ sở hạ tầng hệ thống của người dùng hơn .
## Các biện pháp chống lại các cuộc tấn công DNS:
1. Sử dụng chữ ký số và chứng chỉ để xác thực nhằm bảo vệ dữ liệu cá nhân.
2. Cập nhật thường xuyên và sử dụng các phiên bản phần mềm mới nhất, chẳng hạn như BIND. BIND là một phần mềm mã nguồn mở giải quyết các truy vấn DNS cho người dùng. Nó được sử dụng rộng rãi bởi phần lớn các máy chủ DNS trên Internet.
3. Cài đặt các bản vá lỗi thích hợp và sửa các lỗi xuất hiện thường xuyên.
4. Sao chép dữ liệu trong một vài máy chủ khác, để nếu dữ liệu bị hỏng / mất ở một máy chủ, nó có thể được khôi phục từ những máy chủ khác. Điều này cũng có thể ngăn chặn lỗi một điểm.
5. Chặn các truy vấn thừa để ngăn giả mạo.
6. Giới hạn số lượng truy vấn có thể.