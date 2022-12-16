## 1. Chiến lược kiểm tra (Test Strategy) là gì?
Test strategy được định nghĩa là một tập các phương pháp thử nghiệm để giúp đạt được mục tiêu của test plan. Nó là một phần nhỏ nằm trong test plan. Trong quá trình phát triển một dự án có thể có nhiều chiến lược thử nghiệm được thay thế nhau cho phù hợp với hoàn cảnh của dự án để đem lại hiệu quả làm việc cao nhất.
Với test plan về cơ bản nó liên quan đến phạm vi kiểm thử, các tính năng được kiểm thử, trong khi đó chiến lược test nó là cách để đạt được mục tiêu thử nghiệm được đề cập trong test plan, nó liên quan đến môi trường, phương pháp, công cụ, phân tích rủi ro và kế hoạch dự phòng 
## 2. Các nội dung chính trong tài liệu chiến lược test
### Bước # 1 - Scope và Tổng quan:

Tổng quan dự án cùng với thông tin về những người nên sử dụng tài liệu này. Ngoài ra, bao gồm các chi tiết như ai sẽ xem xét và phê duyệt tài liệu này. Xác định hoạt động và giai đoạn test được thực hiện với các mốc thời gian liên quan đến các mốc thời gian được xác định trong test plan.

### Bước # 2 - Phương pháp tiếp cận:

* Xác định quy trình kiểm tra
* mức độ kiểm tra
* vai trò và trách nhiệm của mọi thành viên trong nhóm
* Các loại kiểm thử : Đối với mọi loại thử nghiệm được xác định trong kế hoạch thử nghiệm ( Ví dụ:  đơn vị , tích hợp, hệ thống, hồi quy, cài đặt / gỡ cài đặt , khả năng sử dụng, tải, hiệu suất và kiểm tra bảo mật) mô tả lý do tại sao nên tiến hành cùng với các chi tiết như khi bắt đầu, người thực hiện, trách nhiệm
* Phương pháp thử nghiệm và chi tiết về chiến lược và công cụ tự động hóa nếu có.
* Trong thực hiện kiểm tra, có nhiều hoạt động khác nhau như thêm các khuyết điểm mới, xử lý lỗi, gán lỗi, kiểm tra lại, kiểm tra hồi quy và cuối cùng là kiểm tra đăng xuất. Bạn phải xác định các bước chính xác để được theo dõi cho từng hoạt động.
Ngoài ra, xác định thay đổi quá trình quản lý. Điều này bao gồm xác định gửi yêu cầu thay đổi, mẫu sẽ được sử dụng và xử lý để xử lý yêu cầu.

### Bước # 3 - Môi trường Test:

* Xác định số lượng môi trường và thiết lập các yêu cầu cần thiết cho từng môi trường : 
Ví dụ:  một môi trường kiểm tra cho nhóm kiểm tra chức năng và một môi trường khác cho nhóm UAT. Xác định số lượng người dùng được hỗ trợ trên từng môi trường, vai trò truy cập cho từng người dùng, yêu cầu phần mềm và phần cứng như hệ điều hành, bộ nhớ, dung lượng đĩa trống, số lượng hệ thống, Xác định các yêu cầu về dữ liệu kiểm thứ việc quan trọng không kém. Cung cấp hướng dẫn rõ ràng về cách tạo dữ liệu kiểm thử (tạo dữ liệu hoặc sử dụng dữ liệu giống với data thật bằng cách che giấu các trường để bảo mật).

* Xác định sao lưu dữ liệu thử nghiệm và chiến lược khôi phục. Cơ sở dữ liệu môi trường thử nghiệm có thể gặp vấn đề do các điều kiện chưa được xử lý trong code.Cần có chiến lược sao lưu cơ sở dữ liệu được xác định tránh sự cố mất toàn bộ dữ liệu do các vấn đề về code.Quá trình sao lưu và khôi phục sẽ xác định ai sẽ thực hiện sao lưu khi nào cần sao lưu, bao gồm những gì trong bản sao lưu khi khôi phục cơ sở dữ liệu, ai sẽ khôi phục nó và các bước che giấu dữ liệu sẽ được tuân theo nếu cơ sở dữ liệu được khôi phục.

### Bước # 4 - Công cụ kiểm tra:

* Xác định các tool quản lý và các công cụ tự động cần thiết để thực hiện kiểm thử : Đối với kiểm tra hiệu suất, kiểm thử tải và kiểm thủ bảo mật cần mô tả phương pháp thử nghiệm và các tool cần thiết để thực hiện thử nghiệm. 
* Chỉ ra một số nguồn mở cũng như tool thương mại cần thiệt và xác định có bao nhiêu người dùng được hỗ trợ trên đó và lên kế hoạch phù hợp.


### Bước # 5 - Kiểm soát phát hành:

* Kế hoạch release với lịch sử version sẽ đảm bảo việc thực hiện kiểm tra cho tất cả các sửa đổi trong bản phát hành đó.

### Bước # 6 - Phân tích rủi ro:

* Liệt kê tất cả các rủi ro mà bạn có thể ước tính
* Cung cấp một kế hoạch rõ ràng để giảm thiểu những rủi ro này và cũng là một kế hoạch dự phòng trong trường hợp nếu bạn thấy những rủi ro này trong thực tế.

### Bước # 7 - Đánh giá và phê duyệt:

* Khi tất cả các hoạt động này được xác định trong kế hoạch chiến lược thử nghiệm, nó cần được xem xét bởi quản lý dự án, nhóm kinh doanh, nhóm phát triển và nhóm quản trị hệ thống (hoặc quản lý môi trường).
* Tóm tắt các thay đổi đánh giá nên được theo dõi ở phần đầu của tài liệu cùng với tên, ngày và nhận xét của người phê duyệt. Ngoài ra, đó là một tài liệu sống có nghĩa là điều này cần được xem xét và cập nhật liên tục với các cải tiến quy trình thử nghiệm.

## Phần kết luận
Chiến lược thử nghiệm là sự phản ánh của toàn bộ hoạt động QA trong vòng đời kiểm thử phần mềm. Tham khảo tài liệu này theo thời gian trong quá trình thực hiện kiểm tra và theo kế hoạch cho đến khi phát hành phần mềm.

Khi dự án gần đến ngày phát hành, thật dễ dàng để cắt giảm các hoạt động thử nghiệm bằng cách bỏ qua những gì bạn đã xác định trong tài liệu chiến lược thử nghiệm. Nhưng nên thảo luận với nhóm của bạn xem có nên cắt giảm bất kỳ hoạt động cụ thể nào sẽ giúp phát hành mà không có bất kỳ rủi ro tiềm ẩn nào về các vấn đề lớn sau phát hành hay không.

Hầu hết các team trong dự án agile đã cắt giảm việc viết tài liệu chiến lược vì trọng tâm của nhóm là thực hiện kiểm tra thay vì tài liệu. Nhưng có một kế hoạch chiến lược thử nghiệm cơ bản luôn giúp lập kế hoạch rõ ràng và giảm thiểu rủi ro liên quan đến dự án. Các nhóm Agile có thể nắm bắt và ghi lại tất cả các hoạt động cấp cao để hoàn thành việc thực hiện kiểm tra đúng hạn mà không có bất kỳ vấn đề nào.

### Mẫu tài liệu Strategy
https://drive.google.com/uc?export=download&id=1q_bMaqb9M1DTboTDonIWhHll0LJL3mjB

Tài liệu tham khảo:
https://www.softwaretestinghelp.com/writing-test-strategy-document-template/
https://www.guru99.com/how-to-create-test-strategy-document.html