> **Phần 6 - Quality Assurance and Quality Control**
>  Nội dung bài viết được tham khảo từ [Software Testing Help](http://www.softwaretestinghelp.com/quality-assurance-vs-quality-control/) 
 
### Quality Assurance (QA)
Quality (Chất lượng) là gì?
Là khi đáp ứng được yêu cầu, nguyện vọng và nhu cầu của khách hàng. Giúp khách hàng tránh được việc thiếu (tính năng) hay khiếm khuyết của phần mềm. Có những tiêu chuẩn cần phải tuân theo để đáp ứng các yêu cầu của khách hàng.

Assurance (Bảo đảm) là gì?
“Đảm bảo” nghĩa là đưa ra một tuyên bố tích cực trên một sản phẩm nhằm nhấn mạnh sự tự tin về kết quả. Nó đưa ra một bảo rằng sản phẩm sẽ làm việc ổn định như mong đợi hoặc yêu cầu.

Quality Assurance (Đảm bảo chất lượng) là gì?
“Đảm bảo chất lượng” tập trung vào việc ngăn ngừa khiếm khuyết, đảm bảo rằng các tiếp cận, kỹ thuật, phương pháp và quy trình được thiết kế cho các dự án được thực hiện một cách chính xác. Các hoạt động đảm bảo chất lượng theo dõi và xác minh rằng các quá trình quản lý và phát triền phần mềm được tuân thủ và có hiệu lực.

**Một QA sẽ làm các công việc như:**
- Đề xuất, đưa ra quy trình phát triển (development process) sản phẩm phù hợp với yêu cầu cụ thể của từng dự án. Các quy trình này có thể được phát triển dựa trên V-model hay Agile hay thông qua việc áp dụng những quy trình quản lý sẵn có như ISO hay CMMI.
- Tạo ra những tài liệu, biểu mẫu, hướng dẫn để đảm bảo chất lượng của sản phẩm cho tất cả các bộ phận trong nhóm phát triển sản phẩm.
- Kiểm tra, đánh giá việc thực thi quy trình của các bộ phận trong nhóm làm sản phẩm có đúng quy trình QA đã đề ra không giúp bảo đảm chất lượng sản phẩm đầu cuối.
- Đánh giá nội bộ hệ thống quản lý chất lượng của công ty, tìm ra những phương án tối ưu nhất để xây dựng một hệ thống sản xuất chuẩn mực.
- Thực hiện việc đo đạc và phân tích số liệu để đánh giá chất lượng sản phẩm.
- Tham gia các hoạt động bảo trì, cải tiến quy trình sản xuất.
- Thu nhận và theo dõi các ý kiến phản hồi khách hàng.
- Thực hiện việc huấn luyện cho các bộ phận liên quan về việc áp dụng hệ thống, tiêu chuẩn và quy trình cũng như những thay đổi của hệ thống và quy trình cho phù hợp với yêu cầu thực tế.

**Những kỹ năng cần thiết cho QA là gì?**
- Hiểu sâu về kiến trúc hệ thống của phần mềm vì công việc của QA rộng hơn QC.
- Khả năng tổ chức, tư duy logic và có hệ thống.
- Kỹ năng phân tích, làm việc dựa trên số liệu tốt.
- Kiến thức rộng về các lĩnh vực của phần mềm mà các team đang thực hiện.
- Kỹ năng giao tiếp trong nội bộ team và các team khác để khai thác thông tin về sản phẩm, dự án và ứng dụng nó vào việc xây dựng hệ thống quy trình.
- Hiểu rõ về các chứng chỉ CMMI, ISO… trong phần mềm để xây dựng các quy trình chuẩn cho các team.

Một số công ty sử dụng “QA” thay vì QC nên nhiều người nhầm lẫn QA với QC (Quality Control). Vì vậy, trên thị trường lao động xuất hiện một số vai trò như PQA (Process Quality Assurance – thực hiện công việc về quy trình) và SQA (Software Quality Assurance – thực hiện công việc kiểm thử). Trong đó, SQA đóng vai trò như một QC thực thụ, đảm nhiệm việc kiểm thử sản phẩm đang phát triển. Còn PQA mới là người chịu trách nhiệm về việc đưa ra các quy trình làm việc trước khi bắt đầu một dự án.

### Quality Control (QC)
Control (Kiểm soát) là gì?
Kiểm soát là kiểm tra hoặc xác minh kết quả thực tế bằng cách so sánh nó với các tiêu chuẩn.

Quality Control (Kiểm soát chất lượng) là gì?
Kiểm soát chất lượng tập trung vào việc xác định lỗi. QC đảm bảo rằng các cách tiếp cận, kỹ thuật, phương pháp và quy trình được thiết kế trong dự án được sử dụng một cách chính xác. Các hoạt động QC bao gồm giám sát và xác minh rằng phần mềm đáp ứng được các tiêu chuẩn chất lượng.

Kiểm soát chất lượng là một quá trình sử dụng thử phần mềm và phát hiện khiếm khuyết. Kiểm soát chất lượng được thực hiện sau đảm bảo chất lượng.

Có 2 vị trí QC thông thường là manual QC (không đòi hỏi kỹ năng lập trình) và automation QC (đòi hỏi kỹ năng lập trình).

**Như vậy QC sẽ là người chịu trách nhiệm thực hiện công việc kiểm tra chất lượng phần mềm và sẽ làm các công việc như:**
- Kiểm tra cho các sản phẩm thực tế trong từng công đoạn của giai đoạn phát triển bằng cách tìm hiểu hệ thống, phân tích tài liệu mô tả về hệ thống và thiết kế test case, và thực hiện việc test phần mềm trước khi giao cho khách hàng.
- Lập kế hoạch kiểm thử, đánh giá sản phẩm một cách tốt và tối ưu nhất.
- Viết Script cho automation test (nếu có áp dụng kiểm thử tự động).
- Lập các báo cáo trong quá trình kiểm thử, thông tin chi tiết đến các bên liên quan khác.
- Lập các báo cáo cách khắc phục và phòng ngừa trong quá trình phát triển.
- Quản lý, phân tích, theo dõi và báo cáo kết quả kiểm thử.
- Thông tin với bên khách hàng về tình hình chất lượng sản phẩm, so sánh với những yêu cầu mà khách hàng đặt ra, làm sao đảm bảo về mặt chất lượng.

**Những kỹ năng cần thiết để làm QC là gì?**
- Kỹ năng code (nếu làm Automation)
- QC phải có kiến thức chuyên sâu về mọi chức năng, khía cạnh của sản phẩm để review được các yêu cầu của requirement.
- Người làm QC cần cẩn thận, kỹ tính vì công việc này đòi hỏi sự chính xác cao độ và chú ý đến mọi khía cạnh có thể có vấn đề của sản phẩm.
- QC cần phải có ý thức, trách nhiệm cao vì đây chính là bộ phận quan trọng để một sản phẩm đạt chất lượng tốt giao đến khách hàng
- QC cần có khả năng giao tiếp tốt vì QC phải làm việc với rất nhiều thành viên khác trong team và nhất là công việc truyền đạt ý kiến, phản hồi của mình với Developer, Project Manager.

### Sự khác biệt giữa QA và QC
Rất nhiều người nhầm lẫn giữa công việc của QC và QA, do cả 2 lĩnh vực này đều cùng làm quản lý về chất lượng, tuy nhiên tính chất về công việc, mô tả công việc của 2 lĩnh vực này là hoàn toàn khác nhau. Tuy vào cơ cấu của các bộ phận của những công ty khác nhau mà QC và QA có thể gộp chung hay tác riêng. Tại những quy mô hệ thống chuẩn mực, hầu hết 2 lĩnh vực này đều được tách riêng với những công việc hoàn toàn khác nhau.

![](https://images.viblo.asia/b8a2948a-ea64-4070-bbd6-6fd658387cd5.png)
| QA - Đảm bảo chất lượng | QC - Kiểm soát chất lượng |
| -------- | -------- |
| Là một quy trình được cân nhắc cẩn trọng nhằm cung cấp sự đảm bảo rằng phần mềm sẽ vượt qua được những yêu cầu về chất lượng.     | Kiểm soát chất lượng là quy trình kiểm tra sự hoàn thành của các yêu cầu về chất lượng phần mềm.     |
| Mục tiêu của QA là ngăn ngừa khiếm khuyết.     | Mục tiêu của QC là xác định và cải thiện các khiếm khuyết.     |
| QA là kỹ thuật quản lý chất lượng.     | QC là phương pháp để xác minh chất lượng.     |
| QA không liên quan đến thực hiện chương trình.     | QC luôn luôn liên quan đến việc thực hiện chương trình.     |
| Tất cả các thành viên trong nhóm có trách nhiệm bảo đảm chất lượng.     | Testing team chịu trách nhiệm cho QC.     |
| Verification / xác minh là ví dụ cho QA.   | Validation / xác nhận là ví dụ cho QC.   |
| QA có nghĩa là lên kế hoạch để thực hiện một quy trình.     | QC có nghĩa là hành động để thực hiện quy trình trong kế hoạch.     |
| QA đảm bảo rằng bạn đang làm đúng điều phải làm.     | QC đảm bảo kết quả của những gì bạn đã làm là những gì bạn mong đợi.     |
| QA định nghĩa những chuẩn mực và phương pháp cần phải tuân theo để đáp ứng được các yêu cầu của khách hàng.     | QC đảm bảo rằng những chuẩn mực và phương pháp đã được tuân thủ trong quá trình phát triển phần mềm.     |
| QA là quy trình để tạo ra phần mềm.     | QC là quá trình để xác minh phần mềm.     |
| QA chịu trách nhiệm cho toàn bộ quy trình phát triển phần mềm.     | QC chịu trách nhiệm cho chu kỳ kiểm tra phần mềm.     |

### Lời Kết

Như vậy QA và QC là hai lĩnh vực nghề nghiệp có liên quan nhưng tính chất công việc hoàn toàn tách biệt, QA bao quát các quá trình tổng thể hệ thống chất lượng trong tổ chức, công ty, còn QC là bộ phận cụ thể kiểm tra về mặt chất lượng và hoàn thiện của sản phẩm và QA và QC sẽ tương tác với nhau như sau:
- QA đưa ra quy trình làm việc cho team phát triển sản phẩm, trong đó có khâu Testing, quy định QC kiểm thử sản phẩm ở giai đoạn nào, sử dụng công cụ gì, tiêu chuẩn nào là sản phẩm đạt yêu cầu.
- QC thực thi quy trình mà QA đề ra.
- QA giám sát, theo dõi và kiểm tra QC có thực hiện đúng quy trình không, sau đó chỉnh sửa cho phù hợp với tiến độ, hiện trạng dự án.
- QC báo cáo kết quả test cho QC Lead/QC Manager, QA báo cáo kết quả thực thi quy trình phát triển sản phẩm cho Project Manager.

Tuy nhiên tùy theo từng Công ty và sản phẩm đang phát triển mà hai vị trí QA/QC sẽ có những nhiệm vụ “giao” với nhau hoặc cả hai đều là một.

###
**Những phần trước cùng chủ đề "Make a Different in Software Testing Basics":**

>* Phần 1 - **[Functional Testing and Non-Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-1-djeZ1awQZWz)**
>* Phần 2 - **[Re-testing and Regression testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-2-1Je5EMg15nL)**
>* Phần 3 - **[Boundary value analysis and Equivalence partitioning](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-3-4P856XvRZY3)**
>* Phần 4 - **[Verification and Validation](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-4-oOVlYdXvZ8W)**
>* Phần 5 - **[Test Case and Test Scenario](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-5-6J3Zg2xEKmB)**