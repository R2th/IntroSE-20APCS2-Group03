![](https://images.viblo.asia/0b2a5865-7f4d-4b27-b029-8cc6ccc80858.PNG)
 
Hầu hết mọi người nghĩ rằng QA và QC là giống nhau và có thể hoán đổi cho nhau, nhưng điều này là không đúng. Cả hai đều liên kết chặt chẽ và đôi khi rất khó để xác định được sự khác biệt. Sự thật là cả hai đều có liên quan với nhau nhưng khác nhau về nguồn gốc. QA và QC đều là một phần của Quản lý Chất lượng tuy nhiên QA tập trung vào việc ngăn ngừa khiếm khuyết trong khi QC tập trung vào xác định khuyết điểm.

![](https://images.viblo.asia/d5f3c4d7-289b-49ee-910e-7047af129206.PNG)

# QA (Quality Assurance)
     Là người chịu trách nhiệm đảm bảo chất lượng sản phẩm thông qua việc đưa ra quy trình làm việc cho các bên liên quan.

### Nhiệm vụ chủ yếu của QA là gì?
* Đề xuất, đưa ra quy trình phát triển (development process) sản phẩm phù hợp với yêu cầu cụ thể của từng dự án. Các quy trình này có thể được phát triển dựa trên V-model hay Agile (đa số là Scrum hoặc Lean Development) hay thông qua việc áp dụng những quy trình quản lý sẵn có như ISO hay CMMI.
* Đưa ra những tài liệu, biểu mẫu, hướng dẫn để đảm bảo chất lượng của sản phẩm cho tất cả các bộ phận trong nhóm phát triển sản phẩm.
* Kiểm tra, audit việc thực thi quy trình của các bộ phận trong nhóm làm sản phẩm có đúng quy trình QA đã đề ra không.
* Nhắc nhở đội ngũ phát triển sản phẩm việc tuân thủ theo quy trình làm việc đã đưa ra.
* Điều chỉnh, thay đổi quy trình phù hợp với từng sản phẩm mà các team đang thực hiện.
* Một số công ty sử dụng “QA” thay vì QC nên nhiều người nhầm lẫn QA với QC (Quality Control). Vì vậy, trên thị trường lao động xuất hiện một số vai trò như PQA (Process Quality Assurance – thực hiện công việc về quy trình) và SQA (Software Quality Assurance – thực hiện công việc kiểm thử). Trong đó, SQA đóng vai trò như một QC thực thụ, đảm nhiệm việc kiểm thử sản phẩm đang phát triển. Còn PQA mới là người chịu trách nhiệm về việc đưa ra các quy trình làm việc trước khi bắt đầu một dự án.

![](https://images.viblo.asia/87c5a303-6ff3-401e-b486-d8bec78940c2.PNG)
 
### Kỹ năng cần thiết cho QA là gì?
* Hiểu sâu về kiến trúc hệ thống của phần mềm vì công việc của QA rộng hơn QC.
* Khả năng tổ chức, tư duy logic và có hệ thống.
* Kỹ năng phân tích, làm việc dựa trên số liệu tốt.
* Kiến thức rộng về các lĩnh vực của phần mềm mà các team đang thực hiện.
* Kỹ năng giao tiếp trong nội bộ team và các team khác để khai thác thông tin về sản phẩm, dự án và ứng dụng nó vào việc xây dựng hệ thống quy trình.
* Hiểu rõ về các chứng chỉ CMMI, ISO… trong phần mềm để xây dựng các quy trình chuẩn cho các team.

![](https://images.viblo.asia/c3b2cf19-53e8-42df-b9c6-1f65e85f2c60.PNG)

# QC (Quality Control) 
    Là kỹ sư quản lý chất lượng. Đây là những người trực tiếp làm kiểm tra cho các sản phẩm thực tế từng công đoạn của sản xuất.

### Nhiệm vụ của các QC chủ yếu là gì?
* Tìm hiểu hệ thống, phân tích tài liệu mô tả về hệ thống và thiết kế test case,và thực hiện việc test phần mềm trước khi giao cho khách hàng.
* Lên kế hoạch kiểm thử (thường do QC Leader thực hiện)
* Viết Script cho automation test (nếu có áp dụng kiểm thử tự động).
* Sử dụng các test tool để tạo và thực hiện các test case/script chi tiết.
* Phối hợp với nhóm lập trình trong việc fix bug và báo cáo chi tiết cho Project Manager hoặc các bên liên quan khác tuỳ dự án.

Khác với PQA, nhu cầu tuyển dụng QC hay SQA rất nhiều trong mọi công ty phần mềm vì kiểm thử là khâu rất quan trọng trong quy trình phát triển sản phẩm. QC và PQA sẽ tương tác với nhau như sau:
* PQA đưa ra quy trình làm việc cho team phát triển sản phẩm, trong đó có khâu Testing, quy định QC kiểm thử sản phẩm ở giai đoạn nào, sử dụng công cụ gì, tiêu chuẩn nào là sản phẩm đạt yêu cầu.
* QC thực thi quy trình mà PQA đề ra.
* PQA giám sát, theo dõi và kiểm tra QC có thực hiện đúng quy trình không, sau đó chỉnh sửa cho phù hợp với tiến độ, hiện trạng dự án.
* QC báo cáo kết quả test cho QC Lead/QC Manager, PQA báo cáo kết quả thực thi quy trình phát triển sản phẩm cho Project Manager.

![](https://images.viblo.asia/033f47b7-f984-44af-9479-c43b9dde3d0c.PNG)

### Những kỹ năng cần thiết để làm QC là gì?
* Kỹ năng code (nếu bạn làm Automation)
* QC phải có kiến thức tốt về mọi chức năng, khía cạnh của sản phẩm để review được các yêu cầu của requirement.
* Người làm QC cần cẩn thận, kỹ tính vì công việc này đòi hỏi sự chính xác cao độ và chú ý đến mọi khía cạnh có thể có vấn đề của sản phẩm.
* Kỹ năng giao tiếp tốt vì QC phải làm việc với rất nhiều thành viên khác trong team và nhất là công việc truyền đạt ý kiến, phản hồi của mình với Developer, Project Manager.

# Bảng so sánh giữa Kỹ sư Đảm bảo chất lượng và Kỹ sư kiểm soát chất lượng
![](https://images.viblo.asia/56547de2-b20c-43f2-bc1d-bc1948551f02.PNG)



Như vậy QA và QC là hai lĩnh vực nghề nghiệp có liên quan nhưng hoàn toàn tách biệt, QA bao quát tổng thể hệ thống chất lượng, liên quan đến toàn bộ và sâu rộng đến các phòng ban trong tổ chức. Còn QC cụ thể hơn, nó kiểm tra chất lượng cụ thể của sản phẩm hoàn thiện hay công đoạn, QC thuộc kiểm soát của QA.


Link tham khảo: https://www.softwaretestinghelp.com/quality-assurance-vs-quality-control/
                http://www.sam.edu.vn/qa-va-qc-giong-va-khac-nhau-nhu-the-nao