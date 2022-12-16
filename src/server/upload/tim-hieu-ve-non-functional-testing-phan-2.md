# 1. Compliance testing 
- Compliance testing là một loại kiểm thử phi chức năng. Kiểm thử tương thích về cơ bản là việc kiểm tra ứng dụng hoặc sản phẩm được xây dựng với môi trường máy tính. Nó kiểm tra xem ứng dụng hoặc sản phẩm phần mềm được xây dựng có tương thích với phần cứng, hệ điều hành, cơ sở dữ liệu hoặc phần mềm hệ thống khác hay không.
- Compliance testing liên quan đến các tiêu chuẩn IT được theo dõi bởi công ty và đó là việc kiểm thử để tìm ra những sai lệch so với các tiêu chuẩn quy định của công ty. Nó xác định cái mà chúng ta đang thực hiện và đáp ứng các tiêu chuẩn được xác định.
- Chúng ta nên cẩn thận trong khi thực hiện kiểm thử này xem có bất kỳ hạn chế nào trong việc thực hiện tiêu chuẩn trong dự án của mình không và cần phải phân tích để cải thiện các tiêu chuẩn.
# 2. Security testing
- Kiểm thử bảo mật về cơ bản là để kiểm tra xem ứng dụng hoặc sản phẩm có được bảo mật hay không. Bất cứ ai cũng có thể hack hệ thống hoặc đăng nhập ứng dụng mà không cần sự cho phép. Nó kiểm tra xem ứng dụng có dễ bị tấn công hay không, nếu có ai hack hệ thống hoặc đăng nhập vào ứng dụng mà không có sự cho phép. Security Testing là có thể coi là một trong những kiểm thử quan trọng nhất đối với một ứng dụng.
- Security testing được thực hiện để kiểm tra xem có bất kỳ rò rỉ thông tin nào hay không bằng cách mã hóa ứng dụng hoặc sử dụng nhiều phần mềm và phần cứng và tường lửa, v.v.
- Các phương pháp thực hiện kiểm thử bảo mật:
1.  Tiger Box: được thực hiện trên một máy tính xách tay trong đó có một bộ sưu tập của các hệ điều hành và các công cụ hack. Thử nghiệm này giúp kiểm tra sự thâm nhập và kiểm tra bảo mật để tiến hành đánh giá các lỗ hổng và các cuộc tấn công.
2.  Black Box: Tester được ủy quyền để làm thử nghiệm trên tất cả mọi thứ về các cấu trúc liên kết mạng lưới và công nghệ.
3.  Grey Box: là sự kết hợp của mô hình black box và white box
- Ví dụ về kịch bản kiểm thử mẫu để kiểm thử bảo mật:
1. Mật khẩu phải ở trong định dạng mã hóa
2. Ứng dụng hoặc hệ thống không nên cho phép người dùng không hợp lệ
3. Kiểm tra thời gian cookie và session cho ứng dụng
4. Đối với các trang web tài chính, nút Back của Browser lại không nên được hoạt động.
# 3. Scalability testing
- Đây là việc kiểm thử một ứng dụng phần mềm để đo khả năng mở rộng theo bất kỳ khả năng phi chức năng nào của nó như hỗ trợ load, số lượng giao dịch, khối lượng dữ liệu.
- Scalability testing kiểm tra khả năng của một hệ thống, mạng hoặc một quá trình để tiếp tục hoạt động tốt khi nó được thay đổi kích thước hoặc khối lượng để đáp ứng nhu cầu ngày càng tăng.
- Ví dụ: Một trang web thương mại điện tử có thể xử lý đơn hàng cho tối đa 100 người dùng cùng một lúc nhưng kiểm tra khả năng mở rộng có thể được thực hiện để kiểm tra xem liệu nó có thể xử lý tải cao hơn trong mùa mua sắm cao điểm hay không.
# 4. Volume testing
- Kiểm tra khối lượng đề cập đến việc kiểm tra một ứng dụng phần mềm hoặc sản phẩm với một lượng dữ liệu nhất định. Ví dụ: nếu chúng ta muốn kiểm tra khối lượng ứng dụng của mình với kích thước cơ sở dữ liệu cụ thể, chúng ta cần mở rộng cơ sở dữ liệu của mình đến kích thước đó và sau đó kiểm tra hiệu suất của ứng dụng trên nó.
- Mục đích của kiểm tra khối lượng là xác định hiệu năng hệ thống với việc tăng khối lượng dữ liệu trong cơ sở dữ liệu.
- Lợi ích khi sử dụng Volume Testing:
1. Cách xác định các vấn đề về tải, bạn có thể tiết kiệm rất nhiều tiền cái mà sẽ được chi vào việc bảo trì ứng dụng.
2. Nó giúp ích trong việc khởi đầu nhanh hơn các kế hoạch mở rộng khả năng
3. Giúp xác định sớm các vấn đề trọng yếu
4. Nó đảm bảo rằng hệ thống của bạn bây giờ có khả năng sử dụng trên thế giới thực
# 5. Stress testing
- Stress testing liên quan đến việc kiểm tra vượt quá khả năng hoạt động bình thường của phần mềm. Nó là một hình thức kiểm thử được sử dụng để xác định tính ổn định của một hệ thống nhất định. Mục đích của việc kiểm thử này là để đảm bảo phần mềm không bị sập trong điều kiện không đủ tài nguyên tính toán (như bộ nhớ hoặc dung lượng ổ đĩa).
- Hầu hết các hệ thống được phát triển cho điều kiện hoạt động bình thường, do đó, nếu điều kiện hoạt động trở nên bất thường ví dụ: nếu nhiều người dùng đồng thời truy cập trang web vượt quá giới hạn tối đa nhưng hệ thống của bạn đã trải qua stress testing thì lỗi sẽ không đáng kể ngay cả trong điều kiện bất thường.
- Mặc dù stress testing là quan trọng nhưng hầu hết các dự án không thực hiện stress testing cho đến khi kết thúc vòng đời phát triển phần mềm (SDLC) có thể gây hậu quả nghiêm trọng nếu có vấn đề về hiệu năng trong ứng dụng. 
- Mục đích của việc Stress testing:
1. Stress testing cố gắng phá vỡ hệ thống đang được kiểm tra bằng cách áp đảo các tài nguyên của nó.
2. Mục đích chính của  Stress testing là đảm bảo rằng hệ thống bị lỗi và phục hồi dễ dàng, chất lượng này còn được gọi là khả năng phục hồi.
3. Stress testing cũng có thể được sử dụng để khám phá các vấn đề sai sót dữ liệu, các vấn đề phần cứng.
- Các loại kỹ thuật Stress testing: 
1. Distributed Stress Testing
2. Transactional Stress Testing
3. Application Stress Testing
4. Exploratory Stress Testing
5. Systematic Stress Testing
# 6. Documentation testing
- Các loại tài liệu bao gồm testcase, test incident report, test log, test plan, test procedure, test report. Việc kiểm tra tất cả các tài liệu được đề cập ở trên được gọi là kiểm tra tài liệu.
- Tài liệu là bất kỳ thông tin bằng văn bản hoặc hình ảnh mô tả, xác định, chỉ định, báo cáo, hoặc xác nhận các hoạt động, yêu cầu, thủ tục, hoặc kết quả. Tài liệu cũng quan trọng đối với một sản phẩm thành công như chính sản phẩm đó. Nếu tài liệu kém, không tồn tại hoặc sai, nó phản ánh về chất lượng của sản phẩm và nhà cung cấp.
- Đây là một trong những phương pháp hiệu quả nhất để thực hiện kiểm thử. Nếu tài liệu không đúng sẽ có những vấn đề lớn và tốn kém. Các tài liệu có thể được kiểm tra theo một số cách khác nhau cho nhiều mức độ phức tạp khác nhau. Chúng bao gồm từ việc chạy các tài liệu thông qua một thiết bị kiểm tra chính tả và ngữ pháp, đến việc xem xét thủ công tài liệu để loại bỏ bất kỳ sự mơ hồ hoặc không nhất quán nào.
- Kiểm tra tài liệu có thể bắt đầu ngay từ đầu của quy trình phần mềm và do đó tiết kiệm được chi phí, vì càng sớm phát hiện ra lỗi chi phí sửa chữa sẽ ít hơn.
# Kết luận
Trên đây là những chia sẻ về các loại kiểm thử phi chức năng (P2) mong có thể giúp ích cho mọi người

Nguồn: http://tryqa.com/what-is-non-functional-testing-testing-of-software-product-characteristics/