# 1. Endurance testing
- Kiểm thử độ  bền vững là việc kiểm tra xem phần mềm hoạt động như thế nào trong một khoảng thời gian dài. Nó còn được gọi là soak testing. Ví dụ: một hệ thống phần mềm có thể hoạt động chính xác như mong đợi khi được test trong vòng 1 giờ nhưng nếu cùng với hệ thống đó mà thực hiện test trong vòng 3 giờ sẽ xảy ra những vấn đề về rò rỉ bộ nhớ của hệ thống. Việc rò rỉ bộ nhớ có thể làm suy giảm hiệu năng của hệ thống hoặc khiến hệ thống ngừng hoạt động.
- Về cơ bản nó được sử dụng để kiểm tra rò rỉ bộ nhớ. Mục đích là để đảm bảo rằng thông lượng và thời gian phản hồi sau một thời gian dài hoạt động được duy trì tốt hoặc tốt hơn so với ban đầu.
# 2. Load testing
- Kiểm thử tải trọng để đánh giá hiệu năng hệ thống khi khối lượng công việc tăng lên. Kiểm tra tải được thực hiện để xác định hành vi của hệ thống trong cả điều kiện bình thường và ở điều kiện cao điểm. Nó giúp xác định khả năng hoạt động tối đa của một ứng dụng. Ví dụ: Nếu số lượng người dùng bị tăng thì sẽ tiêu tốn bao nhiêu CPU, bộ nhớ, thời gian đáp ứng băng thông và mạng là bao nhiêu?
- Load testing được sử dụng để xác định xem cơ sở hạ tầng được sử dụng để lưu trữ ứng dụng có đủ hay không
- Nó được sử dụng để tìm xem hiệu năng của ứng dụng có bền vững không khi nó ở mức cao nhất của tải người dùng
- Nó cho chúng ta biết có bao nhiêu người dùng có thể đồng thời sử dụng ứng dụng và quy mô của ứng dụng được yêu cầu về phần cứng, dung lượng mạng, v.v. để nhiều người dùng có thể truy cập ứng dụng
- Trong nhiều tổ chức, load testing được thực hiện vào cuối vòng đời phát triển phần mềm trong khi một số tổ chức hoàn toàn không thực hiện load testing. Trong trường hợp có vấn đề về hiệu suất trong ứng dụng, điều này có thể dẫn đến mất doanh thu cho khách hàng.
- Ví dụ về load testing:
1. Tải xuống một loạt các tệp lớn từ internet
2. Chạy nhiều ứng dụng trên một máy tính hoặc máy chủ
3. Ghi và đọc dữ liệu đến và từ một đĩa cứng liên tục
- Quá trình kiểm tra tải bao gồm các bước sau: 
1. Thiết lập môi trường test
2. Xác định tiêu chí hiệu suất
3. Lập kế hoạch kiểm thử
4. Tạo người dùng ảo
5. Tạo kịch bản
6. Chạy kịch bản
7. Theo dõi kịch bản
8. Phân tích kết quả test
- Ưu điểm của việc Load testing :
1. Các vấn đề liên quan đến hiệu suất và tắc nghẽn có thể được xác định trước khi đưa ứng dụng lên production 
2. Khả năng mở rộng của hệ thống được cải thiện về cơ sở dữ liệu, phần mềm, mạng, ...
3. Giảm thiểu rủi ro liên quan đến thời gian ngừng hoạt động của ứng dụng / hệ thống
4. Giảm chi phí khi gặp sự cố và sự hài lòng của khách hàng sẽ được tăng lên
- Nhược điểm của việc Load testing:
1. Người kiểm thử cần có kiến thức về các công cụ để thực hiện Load test và trong một số trường hợp phải có hiểu biết về các ngôn ngữ lập trình
2. Chi phí để thực hiện Load test khá tốn kém
# 3. Performance testing
- Kiểm thử hiệu năng là việc kiểm thử để xác định hệ thống thực hiện nhanh như thế nào với một khối lượng công việc cụ thể. Nó có thể phục vụ các mục đích khác nhau như nó có thể chứng minh rằng hệ thống đáp ứng các tiêu chí về hiệu suất. Nó có thể so sánh hai hệ thống để tìm ra hệ thống nào hoạt động tốt hơn. Hoặc nó có thể đo phần nào của hệ thống hoặc khối lượng công việc khiến hệ thống hoạt động kém.
- Tại sao cần thực hiện kiểm thử hiệu năng:
1. Nó giúp cải thiện trải nghiệm người dùng trên các trang web và ứng dụng web
2. Để phù hợp với nhu cầu hoạt động của doanh nghiệp
3. Xác định các vấn đề về hiệu suất và tìm ra hướng khắc phục
# 4. Compatibility testing
- Kiểm thử tương thích là một loại kiểm thử phần mềm được sử dụng để đảm bảo tính tương thích của hệ thống / ứng dụng / trang web được xây dựng với nhiều đối tượng khác nhau như trình duyệt web, nền tảng phần cứng, người dùng (trong trường hợp nếu đó là loại yêu cầu rất cụ thể, chẳng hạn như người dùng nói và chỉ có thể đọc một ngôn ngữ cụ thể), hệ điều hành, v.v. Loại kiểm thử này giúp tìm hiểu hệ thống hoạt động tốt như thế nào trong một môi trường cụ thể bao gồm phần cứng, mạng, hệ điều hành và phần mềm khác, v.v.
- Nó còn kiểm tra xem ứng dụng hoặc sản phẩm phần mềm được xây dựng có tương thích với phần cứng, hệ điều hành, cơ sở dữ liệu hoặc phần mềm hệ thống khác hay không.
# 5. Recovery testing
- Kiểm thử khôi phục được thực hiện để kiểm tra xem ứng dụng có thể khôi phục nhanh và tốt hơn như thế nào sau khi nó gặp phải bất kỳ sự cố hoặc lỗi phần cứng nào. 
- Ví dụ: 
1. Khi một ứng dụng đang nhận dữ liệu từ mạng, sau đó mình rút cáp kết nối. Sau một thời gian, cắm lại cáp và phân tích khả năng của ứng dụng có tiếp tục nhận dữ liệu từ điểm kết nối mạng đã biến mất hay không. 
2. Khởi động lại hệ thống trong khi trình duyệt có số phiên xác định và kiểm tra xem trình duyệt có thể khôi phục tất cả chúng hay không.
# 6. Internationalization testing and Localization testing
- Internationalization Testing là quá trình thiết kế một ứng dụng phần mềm để nó có thể thích nghi với các ngôn ngữ và khu vực khác nhau. Localization testing là quá trình sửa đổi một sản phẩm phần mềm theo từng địa phương (ngôn ngữ, lãnh thổ, trang mã vv).
- Một vài khía cạnh cần được kiểm tra khi thực hiện Internationalization testing and Localization testing: ngôn ngữ, giao diện người dùng, thời gian, định dạng tiền tệ và quy đổi tiền tệ, số điện thoại, định dạng mã địa chỉ và mã bưu điện...
# Kết luận
Trên đây là những chia sẻ về các loại kiểm thử phi chức năng (P3) mong có thể giúp ích cho mọi người

Nguồn: http://tryqa.com/what-is-non-functional-testing-testing-of-software-product-characteristics/