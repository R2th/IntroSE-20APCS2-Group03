Testing được chia thành 2 loại:
* Kiểm thử chức năng
* Kiểm thử phi chức năng
## Kiểm thử chức năng là gì?
Kiểm thử chức năng, như tên cho thấy, là xác nhận tất cả các chức năng của hệ thống. Nó đánh giá ứng dụng và xác nhận liệu ứng dụng có đang hoạt động theo yêu cầu hay không.

### Các loại Kiểm thử chức năng bao gồm:
- Kiểm thử đơn vị (Unit Testing)
- Kiểm thử khói (Smoke Testing - check nhanh xem hệ thống có khởi động được hay không)
- Kiểm thử độ tỉnh táo (Sanity Testing - check nhanh xem sau khi sửa đổi thì function có hoạt động như mong muốn hay không)
- Kiểm thử giao diện (Interface Testing)
- Kiểm thử tích hợp (Integration Testing)
- Kiểm thử hệ thống (Systems Testing)
- Kiểm thử hồi quy (Regression Testing)
- Kiểm thử chấp nhận (Acceptance testing)

## Kiểm thử phi chức năng là gì?
Như tên mô tả, loại kiểm thử này tập trung vào các khía cạnh phi chức năng của ứng dụng. Vậy những khía cạnh phi chức năng là những gì? Hay tôi nên nói những tính năng mà không liên quan đến các chức năng của ứng dụng là gì? Vâng, chúng là đây:
- Ứng dụng làm việc trong điều kiện bình thường như thế nào?
- Ứng dụng hành xử như thế nào khi quá nhiều người dùng đăng nhập đồng thời?
- Ứng dụng có thể chịu được tải lớn không?
- Ứng dụng bảo mật tới mức nào?
- Ứng dụng có thể phục hồi từ bất kì sự cố nào hay không?
- Ứng dụng có thể hành xử đồng nhất trong nhiều môi trường hay OS khác nhau không?
- Đưa ứng dụng lên hệ thống khác nhau có dễ dàng không?
- Tài liệu/Hướng dẫn sử dụng được cung cấp kèm ứng dụng có dễ hiểu hay không?

Danh sách trên đây có thể vẫn còn nhiều nữa. Nhưng vấn đề ở đây là, các tính năng này có góp phần vào chất lượng của ứng dụng hay không? Câu trả lời là CÓ. Những tính năng này quan trọng không kém các chức năng chính. Hãy tưởng tượng ứng dụng mà đáp ứng tất cả các yêu cầu sử dụng một cách hoàn hảo, nhưng một số người dùng nghịch ngợm có thể dễ dàng chọc ngoáy và lấy ra được dữ liệu nhập vào bởi người dùng khác, hoặc ứng dụng chết khi tải lên bất kì file nào lớn hơn 5GB. Nếu vậy, bạn có thể nói rằng các ứng dụng có chất lượng tốt được không? Dĩ nhiên là Không.

***Vì vậy mới sinh ra các kỹ thuật kiểm thử phi chức năng. Bây giờ chúng ta hãy cùng khám phá những kỹ thuật này từng cái một.***

### 1. Kiểm thử hiệu suất: Ước lượng hiệu suất tổng thể của hệ thống. Các yếu tố chính như sau:
- Xác nhận rằng hệ thống đáp ứng được thời gian phản hồi mong đợi.
- Đánh giá các thành phần chính của ứng dụng đáp ứng được thời gian phản hồi mong muốn.
- Có thể được thực hiện như một phần của Kiểm thử tích hợp.
- Có thể được thực hiện như một phần của Kiểm thử hệ thống.

### 2. Kiểm thử tải lượng: Đánh giá xem liệu hiệu suất của hệ thống có được như mong đợi trong điều kiện bình thường và điều kiện thử nghiệm hay không. Những điểm mấu chốt là:
- Xác nhận rằng hệ thống hoạt động như thiết kế khi người dùng đồng thời truy cập ứng dụng và nhận được thời gian phản hồi mong đợi.
- Thử nghiệm này được lặp đi lặp lại với nhiều người dùng để ghi lại thời gian phản hồi và thông lượng.
- Tại thời điểm kiểm thử, cơ sở dữ liệu nên là thực hoặc mô phỏng thực tế.
- Thử nghiệm này cần được tiến hành trên một máy chủ chuyên dụng mô phỏng môi trường thực tế.

### 3. Kiểm thử áp lực: Đánh giá xem liệu hiệu suất của hệ thống có được như mong đợi sử dụng hết tài nguyên hay không. Những điểm mấu chốt là:
- Thử nghiệm trên bộ nhớ thấp hoặc không gian đĩa thấp trên máy khách hoặc máy chủ để bộc lộ những lỗi mà không thể được tìm thấy dưới điều kiện bình thường.
- Nhiều người sử dụng thực hiện các giao dịch như nhau trên cùng một dữ liệu.
- Nhiều máy khách cùng kết nối với các máy chủ có lượng workload khác nhau.
- Giảm Thời gian chờ để xử lí trước khi phản hồi xuống bằng 0 để buộc các máy chủ phải chịu áp lực cao nhất.

### . Kiểm thử quy mô: Ước lượng các hành vi của các phần mềm khi khối lượng lớn dữ liệu có liên quan. Những điểm mấu chốt là:
- Áp dụng một lượng lớn dữ liệu và kiểm tra giới hạn nơi các phần mềm bị lỗi.
- Kích thước cơ sở dữ liệu tối đa được tạo ra và nhiều truy vấn của khách hàng vào cơ sở dữ liệu hoặc tạo báo cáo lớn hơn.
- Ví dụ: Nếu ứng dụng đang xử lý cơ sở dữ liệu để tạo ra một báo cáo, một bài kiểm thử quy mô sẽ thường là sử dụng một tập kết quả lớn và kiểm tra báo cáo được in một cách chính xác hay không.

### 5. Kiểm thử tính khả dụng: Xem xét tính dễ sử dụng cho người dùng. Những điểm mấu chốt là:
- Đầu ra có chính xác và có ý nghĩa cũng như giống với dự kiến của công việc hay không?
- Các lỗi có được chẩn đoán chính xác hay không?
- GUI có chính xác và nhất quán với tiêu chuẩn đề ra hay không?
- Ứng dụng có dễ sử dụng hay không?

### 6. Kiểm thử giao diện người dùng: Đánh giá GUI. Những điểm mấu chốt là:
- GUI nên cung cấp sự giúp đỡ và chỉ dẫn để làm cho phần mềm dễ sử dụng.
- Thiết kế có nhất quán không?
- Dữ liệu được truyền dẫn chính xác từ trang này sang trang khác không?
- GUI không nên làm phiền người dùng hoặc khó hiểu.

### 7. Kiểm thử tính tương thích: Đánh giá xem ứng dụng có tương thích với phần cứng/phần mềm khác mà có cấu hình tối thiểu hoặc tối đa hay không. Những điểm mấu chốt là:
- Thử nghiệm với mỗi phần cứng với cấu hình tối thiểu và tối đa.
- Thử nghiệm với các trình duyệt khác nhau.
- Các testcase giống với quá trình thử nghiệm chức năng.
- Trong trường hợp số lượng phần cứng và phần mềm quá nhiều, chúng ta có thể sử dụng kỹ thuật OATS để xác định các trường hợp thử nghiệm có vùng phủ sóng tối đa.

### 8. Kiểm thử phục hồi: Đánh giá xem ứng dụng có tắt một cách chính xác trong trường hợp có sự cố và dữ liệu có được phục hồi một cách thích hợp sau bất kỳ sự cố phần cứng hay phần mềm nào không. Các thử nghiệm có thể nhiều hơn những gợi ý dưới đây:
- Ngắt điện ở máy khách trong khi ứng dụng đang làm việc.
- Con trỏ và khóa trong cơ sở dữ liệu không hợp lệ.
- Tiến trình Cơ sở dữ liệu bị hủy bỏ hoặc chấm dứt trước khi hoàn thành.
- Con trỏ, các trường và giá trị của Cơ sở dữ liệu bị phá hoại thủ công và trực tiếp từ server.
- Ngắt kết nối dây mạng, tắt bật các router và máy chủ mạng.

### 9. Kiểm tra tính ổn định: Đánh giá và xác nhận rằng phần mềm được cài đặt và tháo gỡ một cách chính xác. Những điểm mấu chốt là:
- Xác nhận rằng các thành phần hệ thống được cài đặt đúng trên phần cứng được chỉ định.
- Xác nhận có thể điều hướng trên máy tính mới, cập nhật các bản cài đặt hiện có và các phiên bản cũ.
- Xác nhận rằng nếu thiếu không gian đĩa thì cũng không xảy ra hành vi khó chấp nhận.

### 10. Kiểm tra tài liệu: Đánh giá các tài liệu và hướng dẫn sử dụng.
- Xác nhận rằng các tài liệu được tuyên bố có sẵn trong sản phẩm.
- Xác nhận tất cả những gì hướng dẫn sử dụng, hướng dẫn cài đặt, file ghi chú, thay đổi cập nhật và trợ giúp trực tuyến đều sẵn sàng.

### Kết luận:
Kiểm thử phi chức năng là khía cạnh rất quan trọng của việc đảm bảo chất lượng và giống như Kiểm thử chức năng, Kiểm thử phi chức năng cũng đòi hỏi chiến lược và lập kế hoạch. Chúng ta có thể bao gồm thông tin chi tiết về Kiểm thử phi chức năng trong kế hoạch kiểm thử hoặc có thể viết ra một chiến lược riêng biệt và lên kế hoạch cho nó. Trong cả hai trường hợp, mục tiêu là để có thể bao quát được tất cả các khía cạnh phi chức năng của phần mềm.