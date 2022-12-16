# 1. Phân tích ảnh hưởng là gì?

Phân tích ảnh hưởng được định nghĩa là phân tích tác động của những thay đổi trong sản phẩm hoặc ứng dụng được triển khai. Nó cung cấp thông tin về các khu vực của hệ thống có thể bị ảnh hưởng do sự thay đổi trong một phần cụ thể hoặc tính năng của ứng dụng.

Tác động được phân tích dựa trên Yêu cầu, Thiết kế & Kiến trúc, ảnh hưởng đến Thử nghiệm và ảnh hưởng đến schedule.

Với việc kết hợp các tính năng mới vào ứng dụng hoặc sản phẩm, việc kiểm tra ảnh hưởng của các tính năng mới này hoặc thay đổi đối với hiệu suất của hệ thống là điều bắt buộc. Vì lý do này, Phân tích ảnh hưởng được thực hiện.

# 2. Tại sao phân tích tác động của thay đổi được thực hiện?

- Nó được thực hiện để hiểu kết quả có thể có của việc thực hiện thay đổi. Tạo ra quá nhiều chức năng cho một sản phẩm có thể làm giảm hiệu suất tổng thể của sản phẩm.
- Để xác định tất cả các tệp, tài liệu và mô hình có thể phải sửa đổi nếu một nhóm quyết định thực hiện thay đổi trong sản phẩm.
- Ước tính effort cần thiết đằng sau việc thực hiện thay đổi
- Để xác định nhiệm vụ cần thiết để thực hiện thay đổi
- Nó sẽ liệt kê các phụ thuộc vào một yếu tố cụ thể

# 3. Tài liệu phân tích ảnh hưởng là gì?

Tài liệu phân tích ảnh hưởng có thể được sử dụng như một danh sách kiểm tra. Nó được sử dụng để đánh giá yêu cầu thay đổi trước khi làm việc với chúng. Tài liệu Phân tích tác động sẽ cung cấp chi tiết như:

- Mô tả ngắn gọn về một vấn đề
- Giải thích hoặc chỉ ra một ví dụ về cách lỗi gây ra lỗi và / hoặc không hiệu quả
- Bao gồm một ước tính về độ phức tạp
- Bao gồm ước tính chi phí và thời gian để sửa chữa
- Chức năng được kiểm tra
- Liệt kê các trường hợp thử nghiệm mới được tạo để thay đổi
- Tài liệu tham khảo - Đề cập đến tài liệu tham khảo, thông số kỹ thuật, v.v.

**Tài liệu phân tích tác động bao gồm:**

- ID của yêu cầu thay đổi:
- Chức vụ:
- Miêu tả:
- Ngày chuẩn bị:
- Ước tính ưu tiên:
+ Lợi ích tương đối
+ Hình phạt tương đối
+ Chi phí tương đối
+ Rủi ro tương đối
- Tổng nỗ lực ước tính: bao nhiêu giờ?
- Nỗ lực bị mất ước tính: bao nhiêu giờ?
- Lịch trình dự kiến Tác động: bao nhiêu ngày?
- Chất lượng bị ảnh hưởng
- Yêu cầu khác bị ảnh hưởng:
- Các nhiệm vụ khác bị ảnh hưởng:
- Vấn đề tích hợp:

# 3. Làm thế nào để trình bày mức độ ảnh hưởng Phân tích tác động

Phân tích ảnh hưởng có thể được đánh dấu theo mã màu để thể hiện mức độ quan trọng của những thay đổi hoặc tác động của những thay đổi trên hệ thống. Mã màu có thể là bất cứ điều gì như được hiển thị dưới đây.

Đỏ - Ảnh hưởng tác động ở mức lớn

Màu vàng -  ảnh hưởng tác động ở mức vừa phải

Xanh - ảnh hưởng tác động ở mức yếu 

![](https://images.viblo.asia/3fb12bd3-e6b8-4b6b-9516-8e8e1afe3ef1.png)

Bảng trên giải thích tác động của những thay đổi được thực hiện

- Các tính năng được đánh dấu bằng màu đỏ biểu thị các tính năng chính được thay đổi, các tính năng có màu vàng là các tính năng ít bị ảnh hưởng bởi thay đổi và các tính năng có màu xanh lá cây là ít nhất.
- Các tính năng được đề cập theo chiều dọc giống với các tính năng được thay đổi trong khi các tính năng được đề cập theo chiều ngang được thực hiện có thể ảnh hưởng. Ví dụ: trong ví dụ trên, sự thay đổi trong tính năng 1 ảnh hưởng đến tính năng 3
- Đối với một dự án lớn hơn, nơi các tính năng và chức năng nhiều hơn thì bảng trên có thể không được sử dụng. Trong trường hợp như vậy, một cách tiếp cận khác được áp dụng, trong đó nhà phát triển ngay lập tức đánh dấu mức độ ảnh hưởng do những thay đổi trong các tính năng chính. Như được hiển thị bên dưới, nơi tác động của tính năng Chính được đánh dấu cho các tính năng phụ tương ứng.

# 4. Câu hỏi mẫu sẽ được giải quyết để thực hiện Phân tích tác động

- Các tác dụng phụ bất lợi hoặc rủi ro của việc thay đổi đề xuất là gì?
- Có công cụ nào được mua để thực hiện và kiểm tra sự thay đổi không?
- Nếu thay đổi được chấp nhận, sẽ mất bao nhiêu nỗ lực đã được đầu tư?
- Có thay đổi đề xuất ảnh hưởng xấu đến yêu cầu hiệu suất?
- Để xác minh thay đổi được đề xuất, đầu vào người dùng khác có được yêu cầu không?
- Liệu sự thay đổi có làm tăng giá thành sản phẩm?
- Liệu sự thay đổi được đề xuất là một cái gì đó mà nhân viên hiện tại có kiến thức và kỹ năng?
- Có phải sự thay đổi được đề xuất đặt ra bất kỳ nhu cầu không thể chấp nhận được đối với bất kỳ tài nguyên máy tính nào không?

# 5. Thực tiễn tốt nhất để Phân tích tác động của thay đổi

- Trước khi bắt đầu với Phân tích tác động, hãy đảm bảo yêu cầu thử nghiệm không chứa thông tin về các phần của dự án bị ảnh hưởng bởi các thay đổi
- Tiếp tục liên lạc giữa nhà phát triển và người thử nghiệm, không được bỏ lỡ bất kỳ thay đổi nào cần thực hiện trong sản phẩm cuối cùng
- Xác định nếu có bất kỳ thay đổi giao diện người dùng, xóa hoặc bổ sung được yêu cầu.
- Ước tính số lượng các trường hợp chấp nhận, hệ thống hoặc kiểm tra tích hợp sẽ được yêu cầu
- Xác định bất kỳ tác động nào của thay đổi được đề xuất đối với kế hoạch dự án khác, kế hoạch quản lý cấu hình hoặc kế hoạch đảm bảo chất lượng.

# 6. Tóm lược

Phân tích tác động sẽ đảm bảo phần nào của ứng dụng cần được thay đổi
Tác động đến hệ thống được phân tích về Yêu cầu, Thiết kế & Kiến trúc, tác động đến Kiểm tra, v.v.
Nó giúp phân tích mức độ kiểm tra hồi quy là cần thiết

Nguồn: https://www.guru99.com/impact-analysis-software-testing.html#1