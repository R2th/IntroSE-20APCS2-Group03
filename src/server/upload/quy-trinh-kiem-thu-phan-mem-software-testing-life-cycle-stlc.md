# 1. Định nghĩa quy trình kiểm thử phần mềm
Quy trình kiểm thử phần mềm xác định các giai đoạn/ pha trong kiểm thử phần mềm. Tuy nhiên, không có STLC tiêu chuẩn cố định nào trên thế giới, nhưng về cơ bản quy trình kiểm thử bao gồm những giai đoạn sau: <br><br>
![](https://images.viblo.asia/cd4fd90c-c60c-42bc-9104-c887e44a3afd.png)<br><br>
**1. Requirenment analysis** - Phân tích yêu cầu<br>
**2. Test planning** - Lập kế hoạch kiểm thử<br>
**3. Test case development** - Thiết kế kịch bản kiểm thử<br>
**4. Test environment set up** - Thiết lập môi trường kiểm thử<br>
**5. Test execution** - Thực hiện kiểm thử<br>
**6. Test cycle closure** - Đóng chu trình kiểm thử<br>
Các giai đoạn kiểm thử được thực hiện một cách tuần tự. Mỗi giai đoạn sẽ có những mục tiêu khác nhau, đầu vào và kết quả đầu ra khác nhau nhưng mục đích cuối cùng vẫn là đảm bảo chất lượng sản phẩm phần mềm tốt nhất. Sau đây, chúng ta sẽ tìm hiểu chi tiết thông tin về các hoạt động, ai là người thực hiện, đầu vào, đầu ra của từng giai đoạn trong quy trình kiểm thử phần mềm.
# 2. Phân tích quy trình kiểm thử phần mềm
## 2.1. Requirenment analysis - Phân tích yêu cầu
### Đầu vào
Đầu vào của giai đoạn phân tích yêu cầu bao gồm các tài liệu như: tài liệu đặc tả yêu cầu, tài liệu thiết kế hệ thống, tài liệu khách hàng yêu cầu về các tiêu chí chấp nhận của sản phẩm, bản prototype của khách hàng yêu cầu(nếu có),...<br>
### Hoạt động
* Phân tích yêu cầu là giai đoạn đầu tiên trong quy trình kiểm thử phần mềm.<br>
* QA team sẽ thực hiện đọc hiểu, nghiên cứu và phân tích cụ thể các yêu cầu trong tài liệu đặc tả của dự án hoặc tài liệu khách hàng. Qua hoạt động này, QA team sẽ nắm bắt được các yêu cầu mà dự án đưa ra bao gồm yêu cầu kiểm thử chức năng/ phi chức năng nào.<br>
* Ngoài ra, trong quá trình phân tích, nghiên cứu tài liệu, nếu có câu hỏi phát sinh hay đề xuất giải quyết, QA team sẽ đưa ra câu hỏi với các bên liên quan như BA( Business Analysis), PM( Project Manager), team leader, khách hàng để hiểu chính xác hơn về yêu cầu của sản phẩm. Những câu hỏi này sẽ được lưu trữ vào file Q&A( Question and Answer). Các câu hỏi nên được đưa ra dưới dạng Yes/No question hoặc các lựa chọn để tiết kiệm thời gian trả lời cũng như hỗ trợ đưa ra những gợi ý hay để xây dựng sản phẩm ngay từ đầu. Như vậy, đương nhiên là chúng ta không nên nêu ra những câu hỏi dạng là gì, như thế nào, tại sao,... Những câu hỏi như thế thường mất thời gian để giải thích và cũng khó có thể giải thích một cách chi tiết nhất có thể. Hơn nữa, đối với khách hàng không có sự hiểu biết về lĩnh vực phần mềm mà họ yêu cầu thì càng không thể trả lời những câu hỏi mang tính chuyên môn cao. Chính chúng ta sẽ là người hỗ trợ và đưa ra giải pháp thích hợp cho khách hàng lựa chọn.<br>
### Đầu ra
Đầu ra của giai đoạn phân tích yêu cầu bao gồm tài liệu chứa các câu hỏi và câu trả lời liên quan đến nghiệp vụ của hệ thống, tài liệu báo cáo tính khả thi, phân tích rủi ro của việc kiểm thử phần mềm.
## 2.2. Test planning - Lập kế hoạch kiểm thử
### Đầu vào
Đầu vào của giai đoạn lập kế hoạch kiểm thử là các tài liệu đặc tả đã được cập nhật thông qua các câu hỏi và trả lời được đưa ra trong giai đoạn phân tích yêu cầu, tài liệu báo cáo tính khả thi, phân tích rủi ro của việc kiểm thử phần mềm.
### Hoạt động
Dựa vào các tài liệu được cung cấp và cập nhật mới nhất, thông thường, test manager hoặc test leader sẽ là người lập kế hoạch kiểm thử cho cả QA team.
Lập kế hoạch kiểm thử nhằm xác định một số yếu tố quan trọng sau:<br>
* **Xác định phạm vi(Scope) dự án:** Dự án thực hiện trong thời gian bao lâu? Bao gồm những công việc gì cho từng khoảng thời gian xác định? Từ đó đưa ra lịch trình thực hiện cho từng công việc nhỏ sao cho phù hợp với toàn bộ đội dự án.
* **Xác định phương pháp tiếp cận**: Nói về cách tiếp cận để kiểm thử cho một đối tượng nào đó, thì phải dựa vào nhiều thứ, ví dụ như: Thời gian cho phép test có phù hợp với con số ước lượng, nhiều hay ít, yêu cầu chất lượng từ phía khách hàng thế nào? Cao, thấp hay khắc khe hay sao cũng được? Công nghệ / kỹ thuật sử dụng để phát triển ứng dụng này là gì? Lĩnh vực của hệ thống/sản phẩm đang được test (domain) là gì?...Từ đó, test manager có thể đưa ra những phương pháp và kế hoạch phù hợp nhất cho cả quá trình thực hiện dự án sao cho đúng với các tiêu chí chấp nhận của sản phẩm và kịp tiến độ với các mốc thời gian bàn giao, phát hành. 
* **Xác định các nguồn lực**<br>
Con người: Bao nhiêu người tham gia dự án, ai sẽ test phần nào, bao nhiêu tester tham gia?Tester và nhóm phát triển có kinh nghiệm về lĩnh vực này không?<br>
Thiết bị: số lượng server, version, máy tính, mobile  để thực hiện test là bao nhiêu.
* **Lên kế hoạch thiết kế công việc test:** Bản kế hoạch kiểm thử sẽ bao gồm các nội dung:<br>
Liệt kê các chức năng cần kiểm thử.<br>
Để thực hiện test chức năng này thì cần làm những công việc gì, trong thời gian bao lâu, cái nào thực hiện trước, cái nào thực hiện sau, ai là người thực hiện.<br>
Xác định điều kiện bắt đầu: xác định những điều kiện tối thiểu để bắt đầu hoạt động kiểm thử cho từng chức năng.<br>
Xác định điều kiện kết thúc : khi có những điều kiện nào thì sẽ kết thúc việc  kiểm thử.
### Đầu ra
Đầu ra của giai đoạn lập kế hoạch bao gồm các tài liệu như test plan, test estimation, test schedule.
## 2.3. Test case development - Thiết kế kịch bản kiểm thử
### Đầu vào
Đầu vào của giai đoạn thiết kế kịch bản kiểm thử là test plan, test estimation, test schedule, các tài liệu đặc tả đã được cập nhật.
### Hoạt động
* **Review tài liệu:** 
Đầu tiên, các kiểm thử viên cần review lại tất cả các tài liệu để xác định công việc cần làm, các công việc có khác gì so với dự án trước khách hàng đưa cho, chức năng nào cần test, chức năng nào không cần test lại nữa. Từ đó, vừa có thể tiết kiệm thời gian mà vẫn đưa ra được một kịch bản kiểm thử đầy đủ và hiệu quả.<br>
* **Viết test case/ check list:** 
Sau đó, tester bắt tay vào việc viết  test case chi tiết dựa vào kế hoạch đã đưa ra và vận dụng các kỹ thuật thiết kế kịch bản kiểm thử. Test case cần bao phủ được tất cả các trường hợp kiểm thử có thể xảy ra cũng như đáp ứng đầy đủ các tiêu chí của sản phẩm. Đồng thời tester cũng cần đánh giá mức độ ưu tiên cho từng test case.<br>
* **Chuẩn bị dữ liệu kiểm thử:** 
Cùng với việc tạo ra các test case chi tiết, đội kiểm thử cũng cần chuẩn bị trước các dữ liệu kiểm thử cho các trường hợp cần thiết như test data, test script. 
* **Review test case/ check list:** 
Sau khi hoàn thành, các thành viên trong đội kiểm thử hoặc test leader cũng cần review lại test case đã tạo để có thể bổ sung, hỗ trợ lẫn nhau nhằm tránh những sai sót trong thiết kế test case và rủi ro về sau.
### Đầu ra
Sau khi hoàn thành thiết kế kịch bản kiểm thử, đội kiểm thử sẽ có các tài liệu bao gồm: test design, test case, check list, test data, test automation script.
## 2.4. Test environment set up - Thiết lập môi trường kiểm thử
### Đầu vào
Đầu vào của giai đoạn cài đặt môi trường kiểm thử là test plan, smoke test case, test data.
### Hoạt động
* Việc cài đặt môi trường kiểm thử là giai đoạn cũng rất quan trọng trong vòng đời phát triển phần mềm. Môi trường kiểm thử sẽ được quyết định dựa trên những yêu cầu của khách hàng, hay đặc thù của sản phẩm ví dụ như server/ client/ network,...<br>
* Tester cần chuẩn bị một vài test case để kiểm tra xem môi trường cài đặt đã sẵn sàng cho việc kiểm thử hay chưa. Đây chính là việc thực thi các smoke test case.
### Đầu ra
Đầu ra của giai đoạn này là môi trường đã được cài đặt đúng theo yêu cầu, sẵn sàng cho việc kiểm thử và kết quả của smoke test case.
## 2.5. Test execution - Thực hiện kiểm thử
### Đầu vào
Tài liệu đầu vào của giai đoạn này là test plan, test design, test case, check list, test data, test automation script.
### Hoạt động
* Thực hiện các test case như thiết kế và mức độ ưu tiên đã đưa ra trên môi trường đã được cài đặt.
* So sánh với kết quả mong đợi sau báo cáo các bug xảy ra lên tool quản lý lỗi và theo dõi trạng thái của lỗi đến khi được sửa thành công.
* Thực hiện re-test  để verify các bug đã được fix và regression test khi có sự thay đổi liên quan.
* Trong quá trình thực hiện kiểm thử, kiểm thử viên cũng có thể hỗ trợ, đề xuất cho cả đội dự án để có giải pháp hợp lý và kết hợp công việc hiệu quả.
* Đo và phân tích tiến độ: kiểm thử viên cũng cần kiểm soát chặt chẽ tiến độ công việc của mình bằng cách so sánh tiến độ thực tế với kế hoạch, nếu chậm cần phải điều chỉnh sao cho kịp tiến độ dự án, nếu nhanh cũng cần điều chỉnh vì có thể test lead lên kế hoạch chưa sát với thực tế dự án. Từ đó có thể sửa chữa test plan cần điều chỉnh để phù hợp với tiến độ dự án đưa ra.
* Report thường xuyên cho PM và khách hàng về tình hình thực hiện dự án: Cung cấp thông tin trong quá trình kiểm thử đã làm được những chức năng nào, còn chức năng nào, hoàn thành được bao nhiều phần trăm công việc, báo cáo các trường hợp phát sinh sớm, tránh ảnh hưởng tiến độ công việc của cả ngày.
### Đầu ra
Đầu ra của giai đoạn này là test results( kết quả kiểm thử), defect reports( danh sách các lỗi tìm được).
## 2.6. Test cycle closure - Đóng chu trình kiểm thử
### Đầu vào
Đầu vào của giai đoạn đóng chu trình kiểm thử là bao gồm tất cả những tài liệu liên quan đã được tổng hợp, ghi chép và hoàn thiện đầy đủ trong suốt quy trình kiểm thử của dự án: tài liệu phân tích đặc tả yêu cầu, test plan, test results, defect reports, tài liệu Q&A,...
### Hoạt động
* Đây là giai đoạn cuối cùng trong quy trình kiểm thử phần mềm.<br>
* Ở giai đoạn này, QA team thực hiện tổng kết, báo cáo kết quả về việc thực thi test case, bao nhiêu case pass/ fail, bao nhiêu case đã được fix, mức độ nghiêm trọng của lỗi, bao nhiêu lỗi cao/ thấp, lỗi còn nhiều ở chức năng nào, dev nào nhiều lỗi. Chức năng nào đã hoàn thành test/ chưa hoàn thành test/ trễ tiến độ bàn giao.<br>
* Đánh giá các tiêu chí hoàn thành như phạm vi kiểm tra, chất lượng, chi phí, thời gian, mục tiêu kinh doanh quan trọng.
* Ngoài ra, giai đoạn này cũng thảo luận tất cả những điểm tốt, điểm chưa tốt và rút ra bài học kinh nghiệm cho những dự án sau, giúp cải thiện quy trình kiểm thử.

### Đầu ra
Đầu ra của giai đoạn này bao gồm các tài liệu: Test report, Test results( final)
# 3. Tổng quát
Như vậy, chúng ta đã tìm hiểu xong từng giai đoạn của quy trình kiểm thử phần mềm. Tóm lại, chúng ta cần ghi nhớ những thông tin chính sau đây: <br>


| Giai đoạn | Đầu vào | Hoạt động | Đầu ra  | Người thực hiện |
| -------- | -------- | -------- |  -------- | -------- |
| Requirenment analysis     | * Tài liệu đặc tả yêu cầu<br> * Tài liệu khách hàng<br> * Tài liệu thiết kế hệ thống| Nghiên cứu, phân tích yêu cầu dự án |   * Q&A document<br> * Tài liệu báo cáo tính khả thi, phân tích rủi ro của việc kiểm thử phần mềm  | QA team  | 
| Test planning | * Tài liệu đặc tả yêu cầu( đã được cập nhật)<br> * Tài liệu báo cáo tính khả thi, phân tích rủi ro của việc kiểm thử phần mềm | * Xác định phạm vi dự án<br> * Xác định phương pháp tiếp cận<br> * Xác định nguồn lực<br> * Lên kế hoạch thiết kế công việc test | * Test Plan<br> * Test Estimation<br> * Test Schedule | Test manager/ Test leader | 
| Test case development | * Tài liệu đặc tả yêu cầu( đã được cập nhật)<br> * Test plan<br> * Test estimation<br> * Test schedule | * Review tài liệu<br> * Viết test case/ check list<br> * Chuẩn bị dữ liệu kiểm thử<br> * Review test case/ check list  |   * Test design<br> * Test case/check list<br> * Test data<br> * Test automation script  | Tester  | 
| Test environment set up     | * Test plan<br> * Smoke test case<br> * Test data | * Thiết lập môi trường kiểm thử ( server/ client/ network,...)<br> * Kiểm tra môi trường kiểm thử bằng các smoke test case  |  * Môi trường kiểm thử<br> * Kết quả của smoke test case  | Tester | 
| Test execution  | Test plan<br> * Test design, test case, check list<br> * Test data<br> * Test automation script  | * Thực hiện kiểm thử phần mềm<br> * So sánh với kết quả mong đợi và báo cáo các bug xảy ra lên tool quản lý lỗi<br> * Thực hiện re-test  để verify các bug đã được fix và regression test khi có sự thay đổi liên quan<br> * Đo và phân tích tiến độ<br> * Điều chỉnh, sửa chữa tài liệu tiến độ dự án theo tình hình thực tế<br> * Report thường xuyên cho Project Manager và khách hàng về tình hình thực hiện dự án     |   * Test results<br> * Defect reports  | Tester  | 
| Test cycle closure     | * Tài liệu đặc tả yêu cầu<br> * Test plan<br> * Test results <br> * Defect reports<br> * Tài liệu Q&A     | * Tổng kết, báo cáo kết quả về việc thực thi test case<br> * Đánh giá các tiêu chí hoàn thành như phạm vi kiểm tra, chất lượng, chi phí, thời gian, mục tiêu kinh doanh quan trọng<br> * Thảo luận và rút ra bài học kinh nghiệm   |   * Test report<br> * Test results( final)  | QA team  | 


# 4. Tài liệu tham khảo 
* http://softwaretestingfundamentals.com/software-testing-life-cycle/
* https://www.softwaretestingclass.com/software-testing-life-cycle-stlc/
<br><br>
Hy vọng những thông tin, kiến thức mình tổng hợp được sẽ giúp ích mọi người trong quá trình học tập và làm việc. Chúc các bạn thành công!