Để nối tiếp [bài trước](https://viblo.asia/p/cac-khai-niem-co-ban-ve-testing-cho-nguoi-bat-dau-Eb85oVJWl2G)  mình xin giới thiệu tiếp Quy trình Test, ở bài này chúng ta sẽ tìm hiểu các vấn đề sau:

**Các yếu tố bối cảnh ảnh hướng đến quá trình test**

**Các giai đoạn test**

**Truy xuất nguồn gốc giữa Test Basis and Test Work Products**

Mình xin đi vào chi tiết từng phần nhé

**4. Các yếu tố bối cảnh ảnh hướng đến quá trình test**

Các yếu tố bối cảnh ảnh hưởng đến quá trình test cho một tổ chức, bao gồm, nhưng không giới hạn ở:
- Mô hình vòng đời phát triển và phương pháp dự án đang sử dụng
+ Mức test và loại test đang được xem xét
+ Rủi ro sản phẩm và dự án
+ Lĩnh vực kinh doanh
- Các ràng buộc hoạt động, bao gồm nhưng không giới hạn ở:
+ Ngân sách và tài nguyên
+ Thời gian
+ Độ phức tạp
+ Yêu cầu hợp đồng và quy định
- Các chính sách và thực hành tổ chức
- Yêu cầu tiêu chuẩn trong nội bộ và bên ngoài

**5. Các giai đoạn test**

![](https://images.viblo.asia/2f387474-6c27-4741-acbd-57499f2841ef.png)


|  Giai đoạn test |  Định nghĩa |  Nhiệm vụ chính |
| -------- | -------- | -------- |
| **Test planning**| Là hoạt động xác định mục tiêu của việc test và chỉ rõ các hoạt động test để đạt được mục tiêu và trọng tâm. | Là xác định phạm vi, rủi ro và mục tiêu của testing. Phương pháp tiếp cận test ( kỹ thuật, các mục test, tỷ lệ bao phủ, xác định và giao tiếp giữa các đội tham gia vào test), các nguồn lực cần thiết. Lập lịch trình cho các giai đoạn sau. Xác định các tiêu chí kết thúc.|
| **Test monitoring and control** | Là hoạt động so sánh giữa tiến độ thực tế và kế hoạch, báo cáo trạng thái. Các hoạt động test được kiểm soát thực hiện và kiểm tra suốt cả dự án. Khách hàng test được cập nhật phù hợp với những hoạt động điều hành và kiểm soát.| Đo đạc và phân tích kết quả của hoạt động review và test. Theo dõi tiến độ, độ bao phủ test, tiêu chí kết thúc. Cung cấp thông tin của test cho khách hàng để lựa chọn, đánh giá. Đưa ra các hành động giải quyết và xử lý phù hợp|
|**Test analysis**|Phân tích và thiết kế test dựa vào các mục tiêu test để chuyển đổi thành các điều kiện test và test case.|Phân tích và đánh giá khả năng test và các đối tượng test. Phân tích các cơ sở cho test ( yêu cầu, các rủi ro, báo cáo phân tích rủi ro, kiến trúc, thiết kế, đặc tả giao diện). Sắp xếp thứ tự ưu tiên của các điều kiện test dựa vào phân tích các đặc tả yêu cầu, item, hiệu ứng và cấu trúc của phần mềm. Sắp xếp mức độ ưu tiên của các test case. 
|**Test design**|Thiết kế các trường hợp kiểm thử(xác định dữ liệu cần thiết để hỗ trợ các trường hợp kiểm thử), môi trường kiểm thử và cơ sở hạ tầng cần thiết.|Xác định các dữ liệu test để phục vụ cho test conditions and test cases, xác định môi trường test cần thiết lập và các yêu cầu về hạ tầng, công cụ.|
|**Test implementation**|Phát triển các quy trình kiểm tra. Tạo các bộ thử nghiệm từ các quy trình thử nghiệm. Xây dựng môi trường thử nghiệm và xác minh mọi thứ cần thiết đã được thiết lập chính xác. Chuẩn bị dữ liệu thử nghiệm và đảm bảo nó được tải đúng cách trong môi trường thử nghiệm.|Chuẩn hoá, xây dựng và sắp xếp ưu tiên test case ( bao gồm cả xác định test data). Xây dựng và ưu tiên các thủ tục test, tạo test data, chuẩn bị thủ tục và viết test scripts tự động test. Tạo ra bộ test suites từ thủ tục test cho việc chạy test hiệu quả. 
| **Test Execution**|Thực hiện test và chạy test là hoạt động  xây dựng các thủ tục test được chỉ rõ bằng việc kết hợp giữa các test case và các thông tin cần thiết khác cho việc thực hiện test, thiết lập môi trường test và chạy test.|Chạy các thủ tục test bằng tay hoặc tự động bằng tool. Báo cáo kết quả chạy test và các vấn đề phát hiện được, phiên bản được test, công cụ test và tài sản test. So sánh kết quả test thực tế và kết quả mong đợi. Báo cáo các lỗi được tìm thấy và phân tích chúng để tìm ra nguyên nhân( lỗi trong code, trong test data, trong tài liệu test hoặc sai ở cách thực hiện test). Test lại phạm vi ảnh hưởng để xác nhận các sửa lỗi là phù hợp ( re-test), kiểm tra những phần xung quanh không xảy ra lỗi nữa ( regression test).|
|**Test completion**|Đánh giá các tiêu chí kết thúc được thực hiện khi việc chạy test đã đạt được đến mục tiêu trong kế hoạch. Test completion diễn ra ở mỗi giai đoạn của dự án, khi hệ thống được phát hành hoặc khi dự án test hoàn thành, giai đoạn kết thúc, phát hành sản phẩm|Kiểm tra các kết quả test với các yêu cầu của khách hàng. Viết báo cáo test cho khách hàng. Bàn giao sản phẩm test cho khách hàng. Phân tích quá trình test để rút ra bài học kinh nghiệm cho dự án sau.|

**6. Truy xuất nguồn gốc giữa Test Basis and Test Work Products**

Để thực hiện việc giám sát và kiểm soát thử nghiệm hiệu quả, điều quan trọng là phải thiết lập và duy trì khả năng xác định nguồn gốc trong suốt quá trình thử nghiệm giữa mỗi phần tử của cơ sở thử nghiệm và các sản phẩm thử nghiệm khác nhau liên quan đến phần tử đó:
Hỗ trợ truy xuất nguồn gốc tốt:
- Phân tích tác động của những thay đổi vào dự án
- Làm thử nghiệm có thể kiểm tra được
- Xem các tiêu chí quản trị CNTT
- Nâng cao tính dễ hiểu của báo cáo tiến độ thử nghiệm và báo cáo tóm tắt thử nghiệm để bao gồm trạng thái của các yếu tố của cơ sở thử nghiệm (ví dụ: các yêu cầu đã vượt qua thử nghiệm, yêu cầu không đạt thử nghiệm và các yêu cầu có thử nghiệm đang chờ xử lý)
- Liên quan đến các khía cạnh kỹ thuật của thử nghiệm cho các bên liên quan theo các thuật ngữ mà họ có thể hiểu được
- Cung cấp thông tin để đánh giá chất lượng sản phẩm, khả năng xử lý và tiến độ dự án so với mục tiêu kinh doanh

Trên đây là một số tìm hiểu của mình về các giai đoạn test. Cám ơn các bạn đã theo dõi. :)