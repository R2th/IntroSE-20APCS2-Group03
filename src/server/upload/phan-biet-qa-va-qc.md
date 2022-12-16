# 1. Bảng phân biệt giữa QA và QC

| So sánh | Quality Assurance | Quality Control |
| -------- | -------- | -------- |
| Khái niệm     | QA là một tập hợp các hoạt động để đảm bảo chất lượng trong quá trình phát triển sản phẩm.   |QC là một tập hợp các hoạt động nhằm đảm bảo chất lượng sản phẩm. Các hoạt động tập trung vào việc xác định các  lỗi sai trong các sản phẩm thực tế được sản xuất.  |
| Công việc     | QA nhằm mục đích ngăn ngừa các lỗi tập trung vào quá trình được sử dụng để tạo ra sản phẩm. Đó là một quá trình đảm bảo chất lượng chủ động.    |QC nhằm xác định (và sửa chữa) các lỗi trong sản phẩm. Do đó, kiểm soát chất lượng là một quá trình thụ động.  |
| Mục tiêu     | Mục tiêu của QA là cải thiện các quy trình phát triển và kiểm tra để các lỗi không phát sinh khi sản phẩm đang được phát triển.  |Mục tiêu của QC là xác định các lỗi sau khi sản phẩm được phát triển và trước khi bàn giao. |
| Cách làm    | Thiết lập hệ thống quản lý chất lượng tốt và đánh giá tính đầy đủ của hệ thống đó. Đánh giá chất lượng theo định kì đối với hoạt động của hệ thống.   | Tìm và loại bỏ các nguồn gây ra vấn đề chất lượng thông qua các công cụ và thiết bị để các yêu cầu của khách hàng và phải đáp ứng liên tục yêu cầu khách hàng |
| Đối tượng    | Phòng ngừa các vấn đề chất lượng thông qua các hoạt động có kế hoạch và có hệ thống bao gồm cả tài liệu. | Các hoạt động hoặc kỹ thuật được sử dụng để đạt được và duy trì chất lượng sản phẩm, quá trình và dịch vụ. |
| Trách nhiệm    | Mọi người trong nhóm tham gia phát triển sản phẩm chịu trách nhiệm đảm bảo chất lượng. | Việc kiểm tra chất lượng thường do một nhóm cụ thể chịu trách nhiệm kiểm tra sản phẩm về các lỗi. |
| Kĩ thuật thống kê   | Các công cụ & kỹ thuật thống kê có thể được áp dụng trong cả QA & QC. Khi chúng được áp dụng cho các quá trình (đầu vào của quá trình & các thông số hoạt động), chúng được gọi là Kiểm soát quá trình thống kê (SPC); & nó trở thành một phần của QA | Khi các công cụ & kỹ thuật thống kê được áp dụng cho thành phẩm (đầu ra của quá trình), chúng được gọi là Kiểm soát chất lượng thống kê (SQC) & nằm trong QC. |
| Công cụ    | QA là một công cụ quản lý | QC là một công cụ điều chỉnh |
| Định hướng    | QA là định hướng quy trình | QC là định hướng sản phẩm |
# 2. Học gì để trở thành QA và QC
## 2.1 Kiến thức chung:
* Kiến thức căn bản về máy tính, tin học văn phòng căn bản, cài đặt phần mềm, sử dụng internet.
* Kiến thức về lập trình: Căn bản SQL, HTML, CSS. Đây là 3 món tôi nghĩ rất cần thiết khi làm test, bạn không cần phải học sâu để viết code nhưng ít ra phải đọc hiểu được và có thể chỉnh sửa code đơn giản.
* Kiến thức tổng quan về test, bao gồm việc hiểu các định nghĩa cơ bản, các thuật ngữ, quy trình phát triển phần mềm, quy trình test. Bạn có thể học theo cuốn ISTQB Foundation hoặc tham khảo các mục gợi ý sau:
What is Software Testing? – Tìm hiểu phần này để biết được testing là gì? các định nghĩa, khái niệm căn bản về kiểm thử phần mềm.
Why is Software Testing Important? – Tại sao testing lại quan trọng và cần thiết? nếu không có tester thì sản phẩm sẽ ra sao?
Software Development life cycle: Vòng đời phát triển phần mềm, vị trí của testing trong các giai đoạn phát triển sản phẩm.
Software Test life cycle: Vòng đời của kiểm thử, thứ tự các công việc kiểm thử.
Defect Life Cycle: Vòng đởi của lỗi và trạng thái qua các giai đoạn.
Quality Assurance vs. Quality control, Verification vs Validation: Phân biêt sự giống nhau và khác nhau giữa một số khái niệm.
Software Testing Levels: Các mức độ trong kiểm thử, đi từ nhỏ nhất đến các mức độ cao nhất.
Software Testing types: Các loại testing thư Functional testing, Non-functional testing, Structural testing, Change related testing.
## 2.2 Kiến thức cần bổ sung:
### Manual Test:
Đây là danh sách các kiến thức bạn nên tìm hiểu sâu thêm nếu sẽ làm test theo hướng manual.

Create a Test Plan: Các thành phần cần có trong một test plan cơ bản, cách viết test plan.
Design Test case: Cách tạo và viết một testcase thông dụng.
Test Design Techniques: Các kỹ thuật thiết kế testcase, giúp cho testcase hiệu quả và tối ưu hơn.
Test reporting, Daily status reports – cách viết report để báo cáo kết quả test của mình.
Defect management: Finding defects, Logging defects, Tracking and managing defects – Học cách report & quản lý một bug cũng như sử dụng tools tracking thông dụng như Jira, Mantis, Bugzilla, Application Lifecycle Management (ALM).
Mobile application testing (iOS, Android, Windows Phone): Cách cài đặt và test ứng dụng mobile, cách giả lập thiết bị điện thoại trên máy tính.
Windows, Website testing & Tools support: Cách test một ứng dụng desktop, một trang web và giả lập các trình duyệt khác nhau trên máy tính.
Risk based testing process and implementation: Đánh giá rủi ro trong kiểm thử, đây là phần nâng cao nhưng cũng nên tìm hiểu qua.
Coding: SQL, HTML, CSS.
### Automation Test:
Học thêm về lập trình: Java, C# (.Net) là hai ngôn ngữ căn bản mà những người làm automation hay sử dụng, ngoài ra có các ngôn ngữ khác dùng để hỗ trợ như AutoIT, Python.
Học về các Automation Tool/Framework phổ biến như: Ranorex, Selenium, Appium, TestComplete.
Các Tools khác như: Jmeter, SoapUI.

## 2.3 Kĩ năng cần có của QA:
* Hiểu sâu về kiến trúc hệ thống của phần mềm vì công việc của QA rộng hơn QC.
* Khả năng tổ chức, tư duy logic và có hệ thống.
* Kỹ năng phân tích, làm việc dựa trên số liệu tốt.
* Kiến thức rộng về các lĩnh vực của phần mềm mà các team đang thực hiện.
* Kỹ năng giao tiếp trong nội bộ team và các team khác để khai thác thông tin về sản phẩm, dự án và ứng dụng nó vào việc xây dựng hệ thống quy trình.
* Hiểu rõ về các chứng chỉ CMMI, ISO… trong phần mềm để xây dựng các quy trình chuẩn cho các team.

## 2.3 Kĩ năng cần có của QC: 
* Kỹ năng code

QC phải có kiến thức tốt về mọi chức năng, khía cạnh của sản phẩm. Như vậy mới review được các yêu cầu của requirement.

* Kỹ năng giám sát

QC đóng vai trò rất quan trọng trong công tác sản xuất phần mềm vì họ sẽ là người trực tiếp kiểm tra từng giai đoạn của quá trình sản xuất. Bạn phải phát hiện ra những điểm chưa hoàn thiện, các lỗi trên sản phẩm để đưa ra sản phẩm cuối cùng hoàn thiện nhất. Bộ phận QC phải đảm bảo sản phẩm phải được kiểm soát 100% tại tất cả các công đoạn.

Do vậy, nếu bạn có kỹ năng giám sát tốt thì mới có thể nhanh chóng phát hiện các lỗi kỹ thuật trong quá trình được giao. Một nhân viên QC nếu không có kỹ năng giám sát tốt sẽ dễ bỏ qua lỗi, gây ảnh hưởng nghiêm trọng đến chất lượng sản phẩm.

* Kỹ năng giao tiếp

Vì QC phải làm việc với rất nhiều thành viên khác trong team và nhất là công việc truyền đạt ý kiến, phản hồi của mình với Developer, Project Manager.

* Kỹ năng quản lý

Đây là một kỹ năng cần thiết cho tất cả các ngành nghề, không riêng gì nghề QC. Kỹ năng quản lý được thể ở việc quản lý các nhân viên bên dưới và cả quản lý bản thân.

Một người quản lý giỏi phải biết được năng lực của cấp dưới, phân phối nhân viên làm các công việc phù hợp với thế mạnh của họ, đôn đốc nhân viên hoàn thành công việc đúng tiến độ. Nếu bạn có kỹ năng quản lý tốt thì bạn có thể hoàn thành đúng hạn khối lượng công việc được giao và tăng tính gắn kết trong nhóm.

Về mặt quản lý bản thân, nếu bạn quản lý tốt quỹ thời gian, đưa ra quy trình làm việc cụ thể, rõ ràng thì bạn sẽ phát huy được hết năng lực của mình.
# Tổng kết
QA và QC là 2 lĩnh vực nghề nghiệp có liên quan nhưng hoàn toàn tách biệt. QA bao quát tổng thể hệ thống chất lượng, liên quan đến toàn bộ và sâu rộng đến các phòng ban trong tổ chức. Còn QC cụ thể hơn, nó kiểm tra chất lượng cụ thể của sản phẩm hoàn thiện hay các công đoạn trong sản xuất.
Tài liệu tham khảo:
https://www.diffen.com/difference/Quality_Assurance_vs_Quality_Control#:~:text=QC%20is%20a%20set%20of,in%20the%20actual%20products%20produced.&text=QA%20aims%20to%20prevent%20defects,used%20to%20make%20the%20product.&text=Quality%20control%2C%20therefore%2C%20is%20a%20reactive%20process.
https://itviec.com/blog/qc-la-gi-qa-la-gi/