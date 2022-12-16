Định nghĩa hoàn thành gợi ý các tiêu chuẩn dừng test của việc chuyển giao (bàn giao) ứng dụng hoặc các điều kiện khi người kiểm thử có thể đánh dấu các yêu cầu của khách hàng được hoàn thành. Có nhiều cấp độ kiểm thử khác nhau được kết hợp trong định nghĩa được thực hiện trong phát triển phần mềm Agile. Danh sách sau đây cho ví dụ về các cấp độ thử nghiệm khác nhau.
# 1. Unit testing (Kiểm thử đơn vị)
1. Kiểm thử đơn vị được bao phủ 100% và được xem xét
2. Độ phức tạp của mã chu kỳ và phân tích mã bằng các công cụ như SONAR
3. Lỗi ở trạng thái 'chấp nhận được' đối với chủ sở hữu sản phẩm (PO)
4. Mã kiểm tra đơn vị được xem xét, đánh giá
5. Tất cả các case unit test phải được thực hiện kiểm tra
6. Tất cả case unit test được kiểm tra tự động
7. Đặc điểm hiệu suất nằm trong giới hạn đã thỏa thuận
# 2. Integration testing (Kiểm thử tích hợp)
1. Các lỗi tìm được phải được tính và báo cáo cho leader
2. Không tìm thấy các case phải thực hiện test hồi quy lớn
3. Tất cả các case test hồi quy được kiểm tra tự động và đăng ký vào SVN.
4. Tiêu chí chấp nhận được thử nghiệm cho cả việc kiểm thử tích cực (input valid data) và tiêu cực (input invalid data) dựa trên các thông số đã thống nhất
5. Rủi ro chất lượng được xác định và chấp nhận được
# 3. System testing (Kiểm thử hệ thống)
1. Tất cả các kịch bản trong một bản phát hành đều được kiểm thử từ đầu đến cuối
2. Tất cả các case người dùng phải được bao phủ, nếu có
3. Kiểm thử trên môi trường Staging hoặc Product được hoàn thành
4. Thực hiện kiểm thử hiệu suất
5. Rủi ro chất lượng được bao phủ và đóng, nếu có.
6. Các lỗi trong trạng thái chấp nhận được đối với các chủ sở hữu sản phẩm (PO)
7. Kiểm thử hồi quy được thực hiện tự động và đăng ký
8. Kiểm tra kỹ UI (giao diện người dùng) đúng với yêu cầu của khách hàng
# 4. User Story (Yêu cầu người dùng)
Định nghĩa cho việc hoàn thành các yêu cầu người dùng có thể được xác định theo các tiêu chí sau:
1. Nhiệm vụ coding hoàn thành
2. Hoàn thành việc xem xét code
3. Kiểm thử thăm dò được hoàn thành
4. Kiểm thử hồi quy được xem xét và pass
5. Kiểm thử đơn vị được viết và pass
6. Tiến hành code đã đánh giá
7. Cập nhật yêu cầu thiết kế kỹ thuật 
8. Lỗi ở trạng thái có thể chấp nhận đối với chủ sở hữu sản phẩm (PO)
9. Yêu cầu người dùng được chấp nhận bởi chủ sở hữu sản phẩm (PO)
# 5. Feature (Tính năng)
Các định nghĩa về hoàn thành các tính năng , bao gồm các tiêu chí sau đây:
1. Tất cả những yêu cầu người dùng liên quan đến yêu cầu cha phải được thực hiện
2. Các khoản nợ kỹ thuật được thanh toán đầy đủ, không có sai lệch lớn
3. Code được hoàn thành
4. Các case unit test được viết và thông qua cho tất cả code và bao phủ được
5. Các lỗi ở trạng thái chấp nhận bởi chủ sở hữu sản phẩm (PO)
# 6. Iteration (Lặp lại)
Các định nghĩa về thực hiện cho các lần lặp có thể bao gồm những điều sau đây:
1. Chạy kiểm thử hồi quy và được thông qua
2. Thực hiện smoke test / automation test, nếu có
3. Hoàn thành bản demo/ đánh giá
4. Hoàn thành cải tiến 
5. Tài liệu được phê duyệt và lưu trữ
# 7. Release (phát hành)
Các định nghĩa về hoàn thành cho một lần release có thể bao gồm các tiêu chí sau:
1. Coverage ( độ bao phủ): phạm vi của độ bao phủ được xác định bởi nội dung mới hoặc thay đổi đối với bản phát hành và mức độ phức tạp, quy mô và rủi ro liên quan của nó
2. Quality (chất lượng): Số lượng lỗi được tìm thấy mỗi ngày hoặc giao dịch được gọi là cường độ lỗi và số lượng lỗi so với yêu cầu người dùng được gọi là mật độ lỗi. Cả hai tham số nên được duy trì trong giới hạn cho phép. Hậu quả của những giới hạn này có thể làm tăng rủi ro tồn dư có thể được hiểu và chấp nhận đầy đủ
3. Time: thời gian phát hành đi / không đi quyết định kinh doanh theo ngày bàn giao được đặt trước có thể được đánh giá.
4. Cost (chi phí): Lợi tức đầu tư tích cực được tính toán chi phí phát triển và bảo trì của sản phẩm có thể thấp hơn đáng kể so với tổng doanh thu dự kiến của sản phẩm. Các lỗi sau khi sản phẩm được phát hành có thể mang lại lợi tức đầu tư thấp hơn.
# Kết luận
Bài viết trên đây là những chia sẻ về định nghĩa việc hoàn thành với các cấp độ kiểm thử trong phần mềm Agile mà mình tìm hiểu được mong có thể giúp ích cho mọi người.

Nguồn tham khảo: http://tryqa.com/what-is-definition-of-done-test-levels-in-agile-software/