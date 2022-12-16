# I. Định nghĩa
## 1. Exploratory testing là gì?
![](https://images.viblo.asia/d8867993-a769-4334-b676-f7bdda58d1d2.png)
Kiểm thử thăm dò là một hình thức kiểm thử phần mềm, trong đó việc thiết kế và thực hiện test sẽ được triển khai đồng thời. Vì vậy mà nó sẽ phụ thuộc vào kiến thức, khả năng của người thực hiện kiểm thử thay vì bộ Test case, checklist được tạo ra trước đó.
## 2. Đặc điểm
### a. Đặc điểm
![](https://images.viblo.asia/c29e0122-9255-46a2-9a9b-a4ba42cbb762.PNG)
Kiểm thử thăm dò khác so với các loại kiểm thử có kịch bản khác ( nó cần có khả năng tư duy, đào sâu và khám phá cao hơn)
 + Có thể xem kiểm thử có kịch bản (Scripted testing) như một đoàn tàu, nó sẽ chạy trên một đường ray có sẵn (Test case).
 + Với kiểm thử thăm dò, nó như một chiếc ô tô, cũng là từ điểm A đi đến B, nhưng sẽ không nhất định theo một cung đường, mà có thể chạy những đoạn đường khác nhau để đến đúng B.

Kiểm thử thăm dò được áp dụng phổ biến trong mô hình Agile, vì:
 +  Nó đem lại phản hồi nhanh chóng về hệ thống cho đội phát triển
 + Đề cao sự khác biệt trong quan điểm test của tất cả các vai trò, thành viên trong team dự án
 + Nâng cao sự khám phá, điều tra và hiểu biết sâu sắc hơn phần mềm đang kiểm thử.
###  b. Sự khác biệt giữa kiểm thử kịch bản và kiểm thử thăm dò

| Kiểm thử kịch bản (Scripted testing)| Kiểm thử thăm dò (Exploratory testing) | 
| -------- | -------- |
| Được thực hiện dựa trên tài liệu yêu cầu của dự án     | Được thực hiện dựa vào tài liệu yêu cầu của hệ thống và khám phá trong suốt quá trình kiểm thử     |
| Xác định các trường hợp kiểm thử trước (Test case)     | Test case sẽ được xác định trong suốt quá trình thực hiện test   |
| Xác nhận kiểm thử bởi tài liệu đặc tả | Phân tích, điều tra hệ thống, ứng dụng   |
| Nhấn mạnh vào việc dự đoán và đưa ra quyết định     | Nhấn mạnh khả năng thích ứng và học hỏi     |
| Đòi hỏi việc kiểm thử phải đã được xác nhận bởi các bước thực hiện     | Đòi hỏi phải có khám phá trong suốt quá trình thực hiện     |
| Là về kiểm thử có kiểm soát     | Luôn luôn cần phải cải tiến về cách thực hiện kiểm thử    |
| Quá trình thực hiện kiểm thử như khi bạn phát biểu - đã có sẵn một bài trình bày đã được chuẩn bị     | Nó giống như một cuộc trò chuyện một cách tự phát và chưa có kịch bản cố định    |
| Quá trình kiểm thử được kiểm soát trong các kịch bản có sẵn     | Quá trình kiểm thử được kiểm soát và thực hiện bởi tâm trí của tester|
# II. Ưu và nhược điểm
## 1. Ưu điểm
* Hữu ích khi các tài liệu đặc tả của dự án không có sẵn hoặc chỉ có một phần, khá sơ sài.
* Nó liên quan đến quá trình điều tra để tìm ra nhiều lỗi hơn so với thử nghiệm thông thường.
* Khám phá và tìm ra được những lỗi bị bỏ qua bởi các kỹ thuật kiểm tra khác (vì nó tiếp cận với hệ thống bằng cách đi sâu và phân tích vào phần nhỏ nhất của ứng dụng).
* Kết hợp nhiều nhất có thể các loại kiểm thử, bao gồm các tình huống, trường hợp khác nhau.
* Phản hồi nhanh chóng về hệ thống cho đội phát triển.
* Khuyến khích sự sáng tạo và trực giác của người kiểm thử
* Tạo ra những ý tưởng mới trong quá trình kiểm thử.
## 2. Hạn chế
* Vì các trường hợp kiểm thử được xuất phát và thực hiện ngẫu nhiên, nên khó có thể liệt kê đầy đủ case nào phải được thực hiện.
* Kết quả kiểm thử phụ thuộc nhiều vào kiến thức, kỹ năng và kinh nghiệm của tester.
* Có thể bỏ sót các trường hợp, nếu tester có ít kiến thức về hệ thống.
* Không phù hợp với các dự án thực hiện lâu dài.
# III. Áp dụng kiểm thử thăm dò vào dự án
## 1. Nên áp dụng kiểm thử thăm dò trong dự án như thế nào ?
* Trong giai đoạn đầu của dự án, khi mà có rất nhiều dự thay đổi của yêu cầu hoặc quá trình phát triển, việc sử dụng thử nghiệm thăm dò sẽ mang lại hiệu quả cao.
* Các developer cũng có thể áp dụng kiểm thử thăm dò vào unit testing, nó sẽ có hiệu quả tối ưu trong quá trình làm quen với hệ thống.
* Trong mô hình Agile, có có chu kỳ ngắn và thời gian để viết Testcase bị hạn chế.
* Thực hiện kiểm thử thăm dò giúp tiết kiệm thời gian, có các output đầu ra quan trọng từ các chu kỳ cũ, được áp dụng cho các scrum tiếp theo.
## 2. Các bước để áp dụng kiểm thử thăm dò
Kiểm thử thăm dò được thực hiện thông qua 5 bước, nó còn được gọi là phiên quản lý dựa trên thử nghiệm (SBTM cycle).
###  a. Phân loại bug
![](https://images.viblo.asia/1918fa3b-38bb-4581-be04-391422b90966.png) 

Phân loại các lỗi thường gặp trong các dự án trước đây

Phân tích nguyên nhân gốc rễ của vấn đề hoặc lỗi

Tìm ra những rủi ro và phát triển ý tưởng kiểm thử ứng dụng.
### b. Điều lệ kiểm thử (Test charter)
![](https://images.viblo.asia/efd70b36-4a5a-4ef3-b600-617539bc5cab.png)

Là một tuyên bố của các mục tiêu kiểm thử, có thể thử nghiệm các ý tưởng về làm thế nào để kiểm tra.

Điều lệ kiểm thử bao gồm: 
* Test cái gì 
* Test như thế nào
* Cần xem xét, chú ý cái gì trong quá trình test
* Những ý tưởng kiểm thử là điểm bắt đầu của kiểm thử thăm dò
* Điều lệ kiểm thử sẽ xác định người dùng cuối có thể sử dụng hệ thống hay không.
### c. Thời gian quy định
![](https://images.viblo.asia/511eb035-51c2-4ac2-bfd6-3fa9d26d2e97.png)

Thời gian cho một cặp tester làm việc cùng nhau không ít hơn 90 phút

Không nên có bất kỳ gián đoạn trong 90 phút làm việc đó.

Khung thời gian có thể được giãn ra hoặc giảm đi 45 phút.

Mỗi phiên làm việc nên được kiểm thử về trạng thái phản hồi của hệ thống và có chuẩn bị đầu ra một cách chính xác.
### d. Đánh giá kết quả
![](https://images.viblo.asia/1011e07f-a32f-4a2a-a240-308542213878.png)
 
Đánh giá các lỗi 

Rút ra bài học từ kiểm thử

Phân tích độ bao phủ
### e. Thảo luận kết quả
![](https://images.viblo.asia/c0086a0c-2b4f-4b79-8841-3da11629dad9.png)

Tổng hợp kết quả sau khi test

So sánh kết quả test với điều lệ (test charter)

Kiểm tra xem có cần phải kiểm thử bổ sung hay không ( đánh giá dựa vào lượng bug của hệ thống, một feature nào đó có thể có clustering bug).
### f. Ví dụ mẫu về một phiên làm việc mẫu
![](https://images.viblo.asia/13583546-49b7-467f-8817-36f004fdd1a9.png)
## 3. Phương pháp để thực hiện thử nghiệm thăm dò một cách hiệu quả.
![](https://images.viblo.asia/95d1ba04-def9-4a73-bb03-247efe765fc9.PNG)
#### Đoán lỗi: 
Dựa vào những kiến thức, kinh nghiệm từ các dự án đã từng làm và tổng quan về dự án, bạn có thể đưa ra dự đoán về một số tính năng của hệ thống có thể có lỗi.
* Trong dự án thực tế, có những function rất đơn giản và việc thêm effort để thăm dò nó là không cần thiết như login/logout/forgot password/ list danh sách hiển thị. Thay vào đó, chúng ta sẽ thăm dò vào các function chính của hệ thống nó có liên quan đến nhiều function khác. Ví dụ, với hệ thống quản lý khách hàng, chúng ta sẽ có các chức năng như add/edit/delete/ phân quyền cho account - đó là nơi chúng ta cần tập trung khám phá.
#### Tạo sơ đồ kiểm thử và các trường hợp sử dụng 
Nên tạo các sơ đồ về tương tác và mối liên quan giữa các chức năng trong hệ thống sẽ giúp cover được các case nhiều hơn. Và tạo các user case giúp hiểu được cách sử dụng sản phẩm từ góc độ người dùng cuối.
* Với các dự án, hầu như chúng ta sẽ có user story hoặc mindmap về sự liên kết giữa các tính năng, hãy tận dụng tài liệu ấy để  thăm dò các luồng chính và cũng giúp bạn phát hiện được những trường hợp kiểm thử khác luồng hiện tại.
#### Những lỗi trước đó
Nghiên cứu các lỗi đã từng xảy ra ở các bản build trước đó để có thể tập trung vào các tính năng có thể xảy ra các lỗi tương tự hoặc có nhiều lỗi hơn. 
* Với mỗi sprint làm việc, hãy chú ý đến các lỗi đã xảy ra, chúng ta sẽ có được kiến thức cho việc đoán lỗi ở các tính năng có thể sẽ có lỗi khi lên build mới. Có thể cần phải re-test lại vùng chức năng có quá nhiều lỗi trước đó hoặc những tính năng mới nhưng có xử lý liên quan, tương tự.
#### Xử lý lỗi
Kiểm thử thăm dò có thể thực hiện bằng cách kiểm thử với nhiều tình huống khác nhau, để có thể kiểm tra khả năng xử lý lỗi trong code tốt.
#### Thảo luận
Sự hiểu biết về hệ thống thông qua quá trình giao tiếp, thảo luận và xác nhận khi làm việc, các cuộc họp, Q&A,... sẽ rất hữu ích cho việc lập kế hoạch test.
* Kiểm thử thăm dò không cố định bởi một kịch bản có sẵn, mà nó sẽ có thể có nhiều và nhiều hơn những case mà trong quá trình test bạn sẽ phát hiện ra. Hãy thảo luận với các thành viên khác trong team để có thêm nhiều case mà họ sẽ cung cấp cho bạn, trên góc nhìn của họ. Điều đó thật sự có ý nghĩa cho cả team.
#### Câu hỏi và checklist
Việc đặt ra các câu hỏi như “what, why, how, where, when,...” có thể cung cấp manh mối trong quá trình kiểm thử thăm dò.
* Khi thực hiện test, hãy tự đặt ra trong đầu mình các câu hỏi “what, why, how, where, when,...” về tính năng đang test hoặc lúc detect defect. Nó sẽ giúp bạn đi sâu hơn và nhanh chóng tìm ra được root cause. 
* Với các hệ thống phức tạp một chút, hay đảm bảo rằng bạn có checklist về các features để chắc rằng mình đã không bỏ sót tính năng nào. Nên áp dụng cả new-test, re-test và nhất là regression testing.
## 4. Một số lưu ý khi kiểm thử thăm dò
#### Tập trung vào mục tiêu: 
Mục tiêu của kiểm thử thăm dò là bạn đóng vai trò như một người dùng cuối để chủ động tìm kiếm và xác định lỗi. 
* Ví dụ, hệ thống khi đưa vào sử dụng, những case abnormal quá chi tiết là không cần thiết, như kiểu bạn ít khi nhập tên quá 255 ký tự (phải có test nhé, không đi sâu thôi). Nhưng hãy đảm bảo bạn đã test cho tất cả các trường hợp login với các loại account (active/Inactive), role (admin/user/Accountant…) và check cả permission của các account trong hệ thống.
#### Không tạo kịch bản, nhưng cần lập kế hoạch kiểm thử: 
Lập kế hoạch giúp làm rõ các khía cạnh cụ thể của hệ thống mà bạn muốn kiểm tra, bao gồm các yêu cầu đặc biệt hoặc mong muốn của hệ thống.
#### Đừng cố kiểm tra quá nhiều 
Mục đích của kiểm thử thăm dò không phải là phạm vi đảm bảo chất lượng mà là tìm ra các khiếm khuyết mà không được phát hiện bởi các hình thức kiểm thử khác. Bản chất của nó là tập trung vào các bộ phận của hệ thống nằm ngoài các tương tác, sử dụng thông thường và ít có khả năng được kiểm thử kỹ càng.
#### Lưu giữ một bản ghi rõ ràng về những việc đã làm: 
Hãy ghi lại rõ ràng những task đã làm, vấn đề phát hiện ra trong một file tài liệu.
#### Xác định phạm vi (thời gian, quy trình)
Đảm bảo rằng quá trình test của bạn phải đáp ứng với thời gian và tiến độ của dự án. Cẩn thận bị cuốn sâu và tốn quá nhiều thời gian vào một chức năng nào đó, ảnh hưởng đến tiến độ chung. 

Hãy xác định timebox cụ thể cho từng chức năng và ghi nhớ nó.
#### Chọn các kỹ thuật thăm dò đáp ứng với nhu cầu của dự án
![](https://images.viblo.asia/c31f9633-6070-4e99-9c75-dab571b53c47.png)
Có các loại chính như: 
- Freestyle (adhoc testing)
- Dựa vào scenarios
- Dựa vào chiến lược (bảng quyết định, đồ thị nguyên nhân kết quả, đoán lỗi).

Cần phải có sự hiểu biết về các kỹ thuật sẽ sử dụng và chia sẻ nó với các bên liên quan trong dự án như product owner, developers. Xác định phạm vi (thời gian, quy trình).


-----


Tài liệu tham khảo
* http://tryqa.com/what-is-exploratory-testing-in-software-testing/
* https://www.guru99.com/exploratory-testing.html 
* https://medium.com/globant/how-to-manage-and-measure-exploratory-testing-using-session-based-test-management-f0f62bd8363e
* https://www.educba.com/what-is-exploratory-testing/