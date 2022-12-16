# 1. Mở đầu
Sau khi hoàn thành giai đoạn kiểm thử, kết quả có vẻ khả quan, không có issue nào nghiêm trọng xảy ra. Bạn đã quản lý dự án rất tốt và tự hào rằng dự án thành công tốt đẹp. Tuy nhiên manager của bạn không nghĩ thế, họ cần evidence để chứng minh rằng bạn đã quản lý tốt dự án!

![](https://images.viblo.asia/e10c4ba9-4a6a-4fa6-8127-bf90de63e7cb.jpg)

Nếu không có evidence có nghĩa là bạn không chứng tỏ bạn đã quản lý dự án tốt như nào. Do đó cần phải có quá trình Software Quality Assurance (SQA). 


![](https://images.viblo.asia/6f2588c5-450f-4f73-9489-7c81ded6f48e.jpg)

Nội dung tiếp theo sẽ trả lời cho 3 câu hỏi sau:
1. What: Test Manager review và audit là gì?
2. Why: Tại sau lại cần SQA trong Test Management process?
3. How: Thực hiện SQA như thế nào?

![](https://images.viblo.asia/5550e5be-8a5c-4c6a-b845-c192f69c56bc.png)

# 2. Test Management Reviews & Audit là gì?
**Management Reviews:** Management Reviews còn được gọi là Software Quality Assurance (SQA) quan tâm nhiều hơn vào software process so với software products. SQA là một tập hợp các hoạt động được thiết kế để đảm bảo project manager follow quy trình chuẩn đã được vạch sẵn từ trước. Nói cách khác, SQA đảm bảo Test Manager "doing the right things in the right way".

**Audit:** Audit là việc kiểm tra các kết quả công việc và thông tin liên quan để đánh giá xem liệu quy trình chuẩn có được tuân theo hay không.

# 3. Tại sao chúng ta cần SQA trong quá trình quản lý thử nghiệm?
Để hiểu điều này, hãy xem xét kịch bản sau đây:

Trong dự án Guru99 Bank, xử lý các giai đoạn thử nghiệm khác nhau như sau:

![](https://images.viblo.asia/ecddd4e8-7031-4622-9e62-efdfe9586e5b.png)

Là người quản lý kiểm tra, bạn là người phụ trách các hoạt động này. Tuy nhiên, bạn đang ở vị trí cao nhất trong nhóm dự án. Ai sẽ xem xét nhiệm vụ của bạn và kiểm tra các hoạt động quản lý dự án được thực hiện theo tiêu chuẩn cao nhất?

Vâng, nhân viên viên SQA là người đánh giá và kiểm tra các hoạt động quản lý dự án được thực thi theo tiêu chuẩn cao nhất có thể . Chỉ thông qua kết quả của tổng quan này, ban quản lý có thể đánh giá chất lượng của việc xử lý dự án của bạn.

Đây là lý do tại sao chúng tôi cần quản lý đánh giá hoặc SQA trong quá trình quản lý thử nghiệm.

SQA bao gồm các lợi ích sau:

![](https://images.viblo.asia/f636bd40-93e2-4d1c-ae4c-9481343a06b8.png)

Vậy cần làm thế nào để thực hiện việc đảm bảo chất lượng?

![](https://images.viblo.asia/4cd0811f-c9ed-4f67-b908-1da21f141a93.png)

**Bước 1) Xây dựng kế hoạch SQA**
Hoạt động kiểm tra cần Kế hoạch kiểm tra Tương tự như vậy hoạt động SQA cũng cần một kế hoạch được gọi là kế hoạch SQA.

Mục tiêu của kế hoạch SQA là xây dựng quy trình và quy trình lập kế hoạch để đảm bảo sản phẩm được sản xuất hoặc dịch vụ do tổ chức cung cấp có chất lượng vượt trội.

Trong quá trình lập kế hoạch dự án, Test Manager thực hiện một kế hoạch SQA trong đó việc đánh giá SQA được lên lịch định kỳ.

Trong Kế hoạch SQA, trình quản lý kiểm tra cần làm những công việc sau:

![](https://images.viblo.asia/7ef56185-1280-4366-a240-b8ea1c5f68cf.png)

**Bước 1.1) Xác định vai trò và trách nhiệm của nhóm SQA**
Trong một nhóm dự án, mỗi thành viên phải có trách nhiệm về chất lượng công việc của mình. Mỗi người phải đảm bảo công việc của họ đáp ứng các tiêu chí QA.

Nhóm SQA là nhóm người đóng vai trò chính trong dự án. Không có QA, sẽ không có doanh nghiệp nào chạy thành công. Do đó, Giám đốc kiểm tra phải làm rõ trách nhiệm của mỗi thành viên SQA trong kế hoạch SQA như sau:

Rà soát và đánh giá chất lượng các hoạt động của dự án để đáp ứng các tiêu chí QA
Phối hợp với ban quản lý và các nhóm dự án để đánh giá các yêu cầu và tham gia vào các cuộc họp đánh giá và tình trạng dự án.
Thiết kế theo dõi và thu thập số liệu để theo dõi chất lượng dự án.
Đo lường chất lượng sản phẩm; đảm bảo sản phẩm đáp ứng được kỳ vọng của khách hàng.
Ví dụ, trong Kế hoạch SQA của dự án Guru99 Bank, bạn có thể tạo danh sách thành viên của nhóm SQA như sau



| No | Member | Roles |Responsibility|
| -------- | -------- | -------- | -------- |
| 1 | Peter | SQA Leader |Develop and document quality standard and process for all management process Manage software quality assurance activities for the project |
| 2 | James | SQA auditor |Perform SQA tasks, report to SQA leader the result of SQA review.|
| 3 | Bean | SQA auditor |Perform SQA tasks, report to SQA leader the result of SQA review.|

**Bước 1.2) Danh sách các sản phẩm công việc mà kiểm toán viên SQA sẽ xem xét và kiểm toán**
Trình quản lý thử nghiệm nên

Liệt kê tất cả các sản phẩm công việc của từng quy trình quản lý thử nghiệm
Xác định cơ sở hoặc thiết bị nào mà kiểm toán viên SQA có thể truy cập để thực hiện các nhiệm vụ SQA như đánh giá quá trình và kiểm toán.
Ví dụ, đối với dự án Guru99 Bank, bạn có thể liệt kê ra các sản phẩm công việc của từng Quy trình quản lý thử nghiệm và xác định quyền cho các thành viên SQA truy cập vào các sản phẩm công việc này theo bảng sau



| Column 1 | Column 2 | Column 3 | Column 3 | Column 3 | Column 3 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1    | Risk analysis     | Risk Management document     | Server path   | Read     | All SQA team members     |
| 2    | Estimation     | Estimation and Metrics report    | ...     | Read     | Peter     |
| 3    | Planning     | Test Planning document     | ...     | Read     | All SQA team members     |
| 4    | Organization     | Human resource plan, training plan     | ...     | Read     | All SQA team members     |
| 5    | Monitoring and Control     | Collected metrics of project effort     | ...    | Read     | Bean     |
| 6    | Issue Management     | Issue management report     | ...    | Read     | James     |
| 7    | Issue Management     | Test Report document     | ...    | Read    | All SQA team members     |

**Bước 1.3) Tạo lịch biểu để thực hiện các tác vụ SQA**
Trong bước này, Trình quản lý kiểm tra phải mô tả các nhiệm vụ được thực hiện bởi kiểm toán viên SQA với sự nhấn mạnh đặc biệt về các hoạt động SQA cũng như sản phẩm công việc cho từng công việc. 

Test Manager cũng tạo ra lịch trình cho các tác vụ SQA đó. Thông thường, lịch trình SQA được thúc đẩy bởi lịch trình phát triển dự án. Do đó, một nhiệm vụ SQA được thực hiện trong mối quan hệ với những hoạt động phát triển phần mềm đang diễn ra.

Trong kế hoạch SQA, Trình quản lý kiểm tra sẽ lập lịch đánh giá quản lý. Ví dụ

| Date | SQA Tasks | Personal in charge | Description | Output |
| -------- | -------- | -------- | -------- | -------- |
| 30-Oct-2014     | Evaluate project planning, tracking and oversight processes     | James     |-       Estimation, Master Schedule and Project Plan Review     | SQA planning report, SQA review minute    |
| 15-Dec-2014    | Review requirement analysis   | James    | -       Review the software requirement development    | Process audit report    |
| 30-Mar-2015     | Review and Evaluate Test Design     | James    | -       Review the Test Design document     | SQA report, SQA review minute    |
| 30-Mar-2015     | Review release    | Bean    | -       Process Audit: Final Release    | SQA process audit report  |
| 2-Apr-2015     | Review Project closing     | Bean     | -       External review after final delivery to customer     | SQA process audit report    |

**Bước 2) Xác định các tiêu chuẩn / phương pháp luận**
Để xem xét các hoạt động Quản lý theo quy trình tiêu chuẩn, bạn nên thực hiện các bước sau

Xác định các chính sách và quy trình nhằm ngăn ngừa các lỗi xảy ra trong quá trình quản lý
Ghi lại các chính sách & thủ tục
Thông báo và đào tạo nhân viên sử dụng nó

![](https://images.viblo.asia/ef8bc527-c674-43b5-a8d9-ddc4713f88e8.png)

**Bước 3) Xem lại quy trình**
Xem lại các hoạt động của dự án để xác minh sự tuân thủ quy trình quản lý được xác định. Trong đánh giá quản lý, các thành viên SQA phải thực hiện 5 đánh giá SQA như sau

![](https://images.viblo.asia/554a8aa6-88aa-4a52-b2db-44e988238d2f.png)

Thời gian xem xét cho SQA phụ thuộc vào mô hình vòng đời phát triển của dự án. Trong trường hợp của dự án Guru99 Bank, lịch biểu xem xét phải tuân theo

![](https://images.viblo.asia/34d270e1-73cb-4d7c-a402-bc12edc0930e.png)

Trong mỗi giai đoạn SQA, các thành viên SQA cung cấp tư vấn và xem xét các kế hoạch dự án, sản phẩm công việc và các thủ tục liên quan đến việc tuân thủ chính sách tổ chức và quy trình chuẩn được xác định.

Trong Kiểm toán, các thành viên SQA nên sử dụng danh sách kiểm tra đánh giá SQA

**Sau khi bạn đi qua 3 bước thực hiện đảm bảo phần mềm, bạn có kết quả của Kiểm tra quản lý đánh giá & kiểm toán. Đây là bằng chứng cho thấy các bên liên quan của bạn về chất lượng quản lý của bạn.**

![](https://images.viblo.asia/8461987e-8326-4759-864e-891ec90d4479.jpg)

# 4. Một số lưu ý để triển khai SQA hiệu quả

**Cải tiến liên tục:** Tất cả các quy trình tiêu chuẩn trong SQA phải được cải thiện thường xuyên và được đưa ra chính thức để người khác có thể theo dõi. Quá trình này cần được chứng nhận bởi các tổ chức phổ biến như ISO, CMMI…

**Tài liệu:** Tất cả các chính sách và phương pháp QA, được xác định bởi nhóm QA, phải được ghi lại để đào tạo và sử dụng lại cho các dự án trong tương lai.

**Kinh nghiệm:** Chọn các thành viên là nhân viên SQA dày dặn kinh nghiệm

**Sử dụng công cụ :** Sử dụng công cụ như công cụ theo dõi, công cụ quản lý cho quy trình SQA để làm giảm nỗ lực SQA và chi phí dự án.

**Số liệu:** Phát triển và tạo chỉ số để theo dõi chất lượng phần mềm ở trạng thái hiện tại của nó, cũng như so sánh cải tiến với các phiên bản trước, sẽ giúp tăng giá trị và độ trưởng thành của quá trình kiểm thử

**Trách nhiệm:** Quy trình SQA không phải là nhiệm vụ của thành viên SQA, mà là nhiệm vụ của mọi người . Mọi người trong nhóm chịu trách nhiệm về chất lượng sản phẩm, không chỉ là người kiểm tra hoặc người quản lý.

Nguồn: https://www.guru99.com/software-quality-assurance-test-audit-review-makes-your-life-easy.html