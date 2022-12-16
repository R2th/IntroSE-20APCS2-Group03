# 1. Incident là gì?

Khi thực thi test, sẽ có lúc bạn thấy kết quả thực tế khác với kết quả mong muốn. Khi kết quả thực tế khác với kết quả mong muốn thì được gọi là Incidents, bugs, defects, problems or issues.
Chúng ta cần phân biệt sự khác nhau giữa Incidents, bugs hay defects. Về cơ bản, một Incidents là bất kỳ tình huống nào mà hệ thống hoạt động bất thường, chúng ta để cập đến incidents như một defects hay bugs chỉ khi nguyên nhân gốc rễ là một problem trong item đã được test.

Các nguyên nhân khác của Incidents bao gồm cấu hình sai, hoặc do test environment, data test sai, kết quả mong muốn không hợp lý, lỗi của tester.

Incident được thành viên trong team ghi lại và report cho những người có thẩm quyền (team lead, manager,...) để cùng phân tích xử lý và tránh không để Incident tương tự xảy ra.

# 2. Log an Incidents
Khi nói về Incidents, ta cần hiểu rằng việc hệ thống hoạt động bất thường không hẳn chỉ là defect. Log Incidents giúp lưu giữ hồ sơ về những gì đã xảy ra, cũng như theo dõi quá trình khắc phục Incidents.
![](https://images.viblo.asia/5ec403eb-8705-45cd-9a64-8f9020340429.jpeg)
Incident logging hay defect report là các tài liệu ghi lại Incidents phổ biến nhất.Mọi Incident trong quá trình phát triển nên được ghi lại, báo cáo, theo dõi và quản lý. Đó là thông tin hữu ích cho hoạt động phát triển sau này cũng như loại bỏ defect sớm. Các Incident không được ghi lại sẽ không được theo dõi và bị lãng quên, dẫn đến sự cố có thể xảy ra lần nữa.

# 3. Incidents report
Sau khi log các Incidents xảy ra trong khi phát triển hoặc sau khi đã triển khai hệ thống, chúng ta cần báo cáo, theo dõi và quản lý chúng. Việc report Incident nghe có vẻ giống với report bug/defect. Tuy nhiên bug/defect được báo cáo dựa trên Specs còn Incidents đôi khi được báo cáo mà chẳng dựa trên tài liệu gì cả.

Vậy tại sao phải báo cáo Incidents? Có rất nhiều lợi ích khi báo cáo Incidents:

* Tiện cho việc theo dõi Incidents: Trong dự án thực tế, có rất nhiều bug/defect được tìm thấy. Nếu không có quy trình báo cáo, phân loại, quản lý chúng thì sẽ rất khó để theo dõi.
* Cung cấp thông tin chi tiết về Incidents cho các bên liên quan.
* Dựa vào các tài liệu báo cáo, có thể phân tích chất lượng hệ thống. Phân tích báo cáo trên một dự án hoặc giữa các dự án để cung cấp thông tin nhằm cải tiến quá trình phát triển và kiểm thử.
* Dev cần thông tin trong báo cáo để tìm và fix bug. Mặt khác, các báo cáo cũng cung cấp thông tin giúp team lead xem xét độ ưu tiên để phân bổ tài nguyên cho phù hợp. 
* Một số Incidents là lỗi do người dùng, tuy nhiên không ít trong số chúng bị lack khi test.
* Từ báo cáo, ta có được phần trăm phát hiện lỗi bằng cách so sánh bug/defect được báo cáo với những bug/defect tester phát hiện ra trong quá trình test. 
Dưới đây là công thức DDP tính toán phần trăm phát hiện lỗi:

![](https://images.viblo.asia/d1408b98-c2fd-4cce-81d7-06e7bb5faf97.jpg)

# 4. Làm thế nào để có Incidents report tốt
Như đã tìm hiểu ở trên, việc báo cáo Incident có rất nhiều lợi ích. Vậy một bản báo cáo Incident cần có những thông tin gì? 

Theo quan điểm cá nhân, tôi nghĩ một Incident report tốt cần có những thông tin cơ bản sau:

*  Incident này được phát hiện như thế nào? Khách hàng phát hiện, được phát hiện từ đội phát triển, hay được phát hiện bởi hệ thống thông báo tự động. 
*  Thời gian Incident làm ảnh hưởng đến hệ thống: Từ 1-3 tiếng, 3-12 tiếng, 12-24 tiếng,..có thể lên đến vài tuần hay vài tháng.
*  Tỷ lệ user bị ảnh hưởng: Dưới 10%, 50%,...
*  Ảnh hưởng đến hệ thống; Ảnh hưởng đến doanh thu của khách hàng; ảnh hưởng đến quan hệ hợp tác giữa công ty phát triển phần mềm với khách hàng; dữ liệu cần tích lũy trên hệ thống bị biết mất; lộ thông tin cá nhân của người dùng; những thông tin mật ngoài thông tin cá nhân bị rò rỉ như private key, IP address của SFTP,...
*  Nguyên nhân trực tiếp của Incident: Thiếu sót trong quá trình phân tích yêu cầu; vấn đề trong kiến trúc hệ thống; vấn đề trong thiết kế hệ thống; chất lượng code không được đảm bảo; thiết sót trong quá trình test; hiểu lầm trong giao tiếp; lỗi vận hành,...
*  Nội dung tóm tắt về Incident: phần này không nên viết dài quá, khoảng 100 từ là đủ.
*  Mức độ khẩn cấp của Incident: High; Normal; Low
*  Tác động của Incident: High; Normal; Low

Ở 2 tiêu chí Mức độ khẩn cấp của Incident và Tác động của Incident, mức độ High/Normal/Low được tổ chức tự quy định dựa trên các tiêu chí được liệt kê ở trên.
# 5. Công cụ quản lý Incidents
Cũng như bug/defect, Incident cũng cần công cụ quản lý. Báo cáo Incident trải qua một số giai đoạn từ nhận dạng ban đầu, ghi lại, phân tích, phân loại, sửa chữa, re-test và closed. Các công cụ quản lý giúp bạn dễ dàng theo dõi incident.

![](https://images.viblo.asia/72a7fed4-d704-49fd-9564-b9ead4879df2.jpg)

Các tool quản lý cung cấp một số tính năng:
* Lưu trữ thông tin về các thuộc tính của Incident (ví dụ: mức độ nghiêm trọng, mô tả,...).
* Lưu trữ tệp đính kèm (ví dụ: ảnh chụp màn hình). 
* Gán độ ưu tiên cho Incident. 
* Assign cho từng người (fix, re-test,...). 
* Lưu trạng thái của Incident(ví dụ: open, rejected, duplicate, deferred, ready for confirmation test, closed).
* Lưu lịch sử chỉnh sửa và danh tính người chỉnh sửa.
* Báo cáo số liệu thống kê về Incident(ví dụ: thời gian trung bình ở trạng thái open, số Incident với từng trạng thái,...). 

Những tool quản lý có thể sử dụng: Redmine, Jira, Mantis, Usersnap, Doorbell,...

Với đặc thù nghề nghiệp là "nằm vùng" tại nhiều dự án thì QA là đội ngũ đi đầu trong việc report Incident. Trên đây là một số chia sẻ của mình về Incident trong phát triển phẩn mềm. Thanks for reading ^^
> Nguồn dịch:

1. http://istqbexamcertification.com/what-is-an-incident-in-software-testing/
2. http://istqbexamcertification.com/what-is-incident-logging-or-how-to-log-an-incident-in-software-testing/
3. http://istqbexamcertification.com/what-are-incident-reports-in-software-testing/
4. http://istqbexamcertification.com/what-is-incident-management-tools/