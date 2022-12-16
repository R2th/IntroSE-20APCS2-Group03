# 1. Test hiệu năng là gì?
Hiệu năng web là một chủ đề rộng lớn và bạn sẽ tìm thấy không thiếu các mẹo và hướng dẫn kiểm tra hiệu suất trên khắp trang web. Trước khi bắt đầu điều chỉnh trang web hoặc ứng dụng của mình, trước tiên bạn phải tìm ra chỉ số nào quan trọng nhất đối với người dùng của bạn và thiết lập một số tiêu chuẩn.

Vậy test hiệu năng là gì?
Trong bối cảnh phát triển web, kiểm tra hiệu năng đòi hỏi phải sử dụng các công cụ phần mềm để mô phỏng cách một ứng dụng chạy trong các trường hợp cụ thể. Kiểm tra hiệu năng định lượng xem xét các chỉ số như thời gian phản hồi trong khi kiểm tra định tính quan tâm đến khả năng mở rộng, tính ổn định và khả năng tương tác.

Khi nghe đến từ "hiệu năng", hầu hết mọi người đều nghĩ ngay đến tốc độ, thời gian tải và thời gian phản hồi nhanh là hoàn toàn cần thiết, nhưng bạn phải nghĩ đến bức tranh lớn hơn, điều này đòi hỏi nhiều hơn là chỉ nhấp qua tất cả các liên kết của bạn để đảm bảo rằng chúng hoạt động. Nếu mọi thứ hoạt động hoàn hảo trong quá trình kiểm thử thì không có nghĩa là trường hợp đó sẽ xảy ra khi trang web của bạn tràn ngập lưu lượng truy cập.

# 2. Các lợi ích của kiểm tra hiệu năng là gì? 
Kiểm tra hiệu năng của trang web hoặc ứng dụng của bạn cho phép bạn xác định các vấn đề và cải thiện hiệu năng tổng thể, điều này có thể dẫn đến cải thiện trải nghiệm người dùng và tăng doanh thu. Có nhiều vấn đề phổ biến mà kiểm tra hiệu năng có thể phát hiện, chẳng hạn như tắc nghẽn. Sự gián đoạn trong dữ liệu, lưu lượng do dung lượng hạn chế được gọi là tắc nghẽn. Có thể xảy ra tắc nghẽn, ví dụ: nếu bạn có lưu lượng truy cập tăng đột biến mà máy chủ của bạn không được trang bị đủ để xử lý. Nếu bạn không kiểm tra, thì bạn sẽ phải tìm hiểu, điều tra nguyên nhân khá gian nan.

Tắc nghẽn chỉ là một trong nhiều vấn đề có thể xảy ra khi trang web của bạn không thể mở rộng. Khả năng mở rộng kém có thể làm tê liệt hiệu suất của ứng dụng, dẫn đến sự chậm trễ, lỗi và rò rỉ bộ nhớ. Bạn có thể phát hiện ra rằng các vấn đề về hiệu suất của ứng dụng là do giới hạn về CPU hoặc băng thông , vì vậy bạn sẽ cần phân bổ lại một số nguồn lực hoặc đầu tư vào cơ sở hạ tầng mạnh mẽ hơn.

Bất kỳ thông tin nào bạn có thể thu thập về khách truy cập, chẳng hạn như cách họ truy cập vào trang web của bạn, có thể giúp bạn xác định các cách cải thiện trải nghiệm người dùng vì bạn có các thông số để kiểm tra.

# 3. Các loại kiểm tra hiệu suất
Mặc dù các công cụ kiểm tra trang web rất hữu ích và có thể cung cấp cho bạn tổng quan nhanh về tốc độ và hiệu suất tổng thể của trang web, bạn vẫn nên tiến hành phân tích kỹ lưỡng hơn bằng cách sử dụng nhiều loại kiểm tra bao gồm:

Load tests: Xem xét khối lượng truy cập, thao tác tăng lên ảnh hưởng như thế nào đến thời gian phản hồi của ứng dụng. Ví dụ: bạn có thể sử dụng các công cụ kiểm tra tải để xem ứng dụng của bạn hoạt động như thế nào với một số lượng người dùng nhất định. Mục đích của kiểm tra tải là để đánh giá ứng dụng của bạn hoạt động trong điều kiện làm việc bình thường.

Stress tests: Còn được gọi là fatigue tests, stress tests tương tự như load tests, nhưng chúng xem xét cách một ứng dụng thực hiện bên ngoài ranh giới của điều kiện làm việc bình thường. Mục tiêu của stress test là xác định có bao nhiêu người dùng hoặc giao dịch đồng thời mà ứng dụng có thể xử lý. Trước khi nó gặp sự cố, Load test và stress tests có thể giúp bạn xác định các nút thắt cổ chai và quyết định cách sử dụng tốt nhất tài nguyên của mình để đáp ứng nhiều lưu lượng truy cập hơn.

Spike test: Spike test là một loại stress tests cụ thể được sử dụng để mô phỏng hiệu suất ứng dụng khi khối lượng công việc tăng nhanh và lặp lại.

Endurance tests: Còn được gọi là soak test, endurance tests đo hiệu suất ứng dụng trong một khoảng thời gian dài. Endurance tests có thể giúp bạn xác định rò rỉ bộ nhớ và các rủi ro tương tự đôi khi xảy ra.

Scalability tests: Scalability tests đánh giá mức độ ứng dụng của bạn phản ứng khi khối lượng công việc tăng lên. Không giống như spike tests, Scalability tests liên quan đến việc tăng dần khối lượng công việc trong khi theo dõi các tác động đến hiệu suất. Bạn cũng có thể thấy rằng việc sử dụng tài nguyên của bạn dao động trong khi khối lượng công việc vẫn giữ nguyên.

Volume tests: Còn được gọi là flood tests, volume tests tập trung cụ thể vào cách ứng dụng của bạn hoạt động trong khi xử lý một khối lượng lớn dữ liệu.

# 4. Chỉ số hiệu năng web nào quan trọng? 
Cải thiện hiệu năng trang web của bạn bắt đầu bằng việc thực hiện một số phép đo. Các phép đo đề cập đến các điểm dữ liệu cụ thể, chẳng hạn như số giây cần để xử lý một yêu cầu. Chỉ số là những gì thực sự đang được đo lường. Dưới đây là một số chỉ số liên quan đến kiểm tra hiệu suất:

Response time: Khoảng thời gian giữa một yêu cầu cụ thể và một phản hồi tương ứng. Thời gian phản hồi có thể thay đổi đáng kể đối với các hành động khác nhau trong các điều kiện khác nhau.

Average load time: Thời gian phản hồi trung bình cho tất cả các yêu cầu cung cấp thông tin chi tiết tốt về trải nghiệm người dùng tổng thể.

Peak response time: Thời gian phản hồi lâu nhất. Nếu phản hồi cao nhất của bạn lâu hơn nhiều so với thời gian tải trung bình, thì có thể bạn đã gặp sự cố.

Wait time: Đôi khi được gọi là độ trễ trung bình, thời gian chờ đề cập đến lượng thời gian mà một yêu cầu dành ra trong một hàng đợi trước khi nó được xử lý. Phân biệt giữa thời gian chờ và thời gian phản hồi là rất quan trọng vì chúng phụ thuộc vào các yếu tố khác nhau.

Requests per second: Số lượng yêu cầu được xử lý mỗi giây.

Memory utilization: Lượng bộ nhớ cần thiết để xử lý một yêu cầu.

CPU utilization: Lượng thời gian cần thiết để CPU xử lý các yêu cầu.

Error rate: Tỷ lệ lỗi so với yêu cầu.

Transactions passed / failed: Tương tự như tỉ lệ lỗi, nhưng nó có tính đến các yếu tố khác khiến yêu cầu không thành công.

Concurrent users: Còn được gọi là load size, người dùng đồng thời có nghĩa là số lượng người dùng đang hoạt động.

Throughput: thường được đo bằng kilobytes mỗi giây, thông lượng đề cập đến lượng băng thông được sử dụng trong quá trình kiểm tra hiệu suất. Vì đây là chỉ số tốt nhất về dung lượng trang web, nên đặt mục tiêu thông lượng là bước đầu tiên tốt để cải thiện dung lượng trang web của bạn.

# 5. Các công cụ kiểm tra hiệu suất dành cho nhà phát triển web 
Bước đầu tiên để kiểm tra là chọn các công cụ phù hợp. Có nhiều công cụ miễn phí và cao cấp để kiểm tra ứng dụng của bạn, nhưng đây chỉ là một số công cụ:

**Công cụ KeyCDN**

KeyCDN Tools là một bộ công cụ kiểm tra web miễn phí được cung cấp công khai. Kiểm tra tốc độ trang cung cấp cho bạn bảng phân tích đầy đủ về cách trang web của bạn hoạt động và bạn có thể kiểm tra tốc độ tải trang của mình từ 10 các địa điểm khác nhau.

**Google Lighthouse**

Google Lighthouse là một công cụ mã nguồn mở và miễn phí, là một phần của dòng Google Chrome DevTools. Khi một URL được cung cấp cho Lighthouse, nó sẽ chạy một số lần kiểm tra và trả lại báo cáo kèm theo lời khuyên để cải thiện.

## Tài liệu tham khảo:

https://www.keycdn.com/blog/performance-testing