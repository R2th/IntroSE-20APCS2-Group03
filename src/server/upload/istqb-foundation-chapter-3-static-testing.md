## 1. Static testing
### 1.1 Static testing- Kiểm thử tĩnh là gì?
![](https://images.viblo.asia/00dcd5b3-3bcd-4d9a-b190-43cd6c0c3222.jpg)

**STATIC TESTING** là một kỹ thuật kiểm thử phần mềm mà chúng ta có thể kiểm tra các khiếm khuyết trong phần mềm mà không cần thực thi nó. Trái với nó là Dynamic testing - Kiểm thử động kiểm tra ứng dụng khi mã được chạy.

### 1.2 Benifits of static testing

![](https://images.viblo.asia/dded7931-1750-4334-b64d-7c2599d164ea.jpg)

- Phát hiện và sửa chữa lỗi hiệu quả hơn và trước khi thực hiện kiểm thử động
- Xác định những lỗi không dễ tìm thấy bằng kiểm thử động. 
- Ngăn ngừa các lỗi trong thiết kế hoặc code bằng cách phát hiện ra sự mâu thuẫn, mơ hồ, thiếu sót, không chính xác và dư thừa trong các yêu cầu.
- Tăng năng suất phát triển (ví dụ: do thiết kế được cải tiến nên dễ bảo trì code hơn)
- Giảm chi phí và thời gian phát triển
- Giảm chi phí và thời gian kiểm thử 
- Giảm tổng chi phí chất lượng trong suốt vòng đời của phần mềm, do ít lỗi hơn 
trong vòng đời hoặc sau khi đưa vào hoạt động
- Cải thiện giao tiếp giữa các thành viên trong nhóm trong quá trình tham gia
đánh giá

## 2. Differences between Static and Dynamic Testing
![](https://images.viblo.asia/17818460-3008-4838-9eaa-94cd2b68c268.png)


**So sánh với dynamic testing, static testing có thể:**
- Cung cấp đánh giá về chất lượng của sản phẩm công việc
- Xác định các lỗi càng sớm càng tốt
- Trực tiếp tìm ra các lỗi trong sản phẩm thay vì xác định các hư hỏng do lỗi gây ra khi
phần mềm được chạy.
- Tìm ra lỗi với ít công sức hơn
- Được sử dụng để cải thiện tính nhất quán và chất lượng nội bộ của sản phẩm công việc

**Typical defects** 

- Các lỗi về yêu cầu (ví dụ: mâu thuẫn, mơ hồ, thiếu sót, không chính xác, dư thừa)
- Các lỗi về thiết kế (ví dụ: các thuật toán hoặc cấu trúc cơ sở dữ liệu không hiệu quả, khớp nối cao, tính liên kết thấp)
- Lỗi mã hóa (ví dụ: các biến có giá trị không xác định, các biến được khai báo nhưng không bao giờ được sử dụng, mã không thể truy cập, mã trùng lặp)
- Sai lệch so với các tiêu chuẩn (ví dụ, thiếu tuân thủ các tiêu chuẩn mã hóa)
- Thông số kỹ thuật giao diện không chính xác (ví dụ: các đơn vị đo lường khác nhau được hệ thống gọi đến sử dụng khác so với hệ thống được gọi)
- Các lỗ hổng bảo mật (ví dụ: dễ bị tràn bộ đệm)
- Khoảng trống hoặc sự không chính xác trong khả năng xác định nguồn gốc hoặc phạm vi bảo hiểm của cơ sở thử nghiệm (ví dụ, thiếu các thử nghiệm để đạt được tiêu chuẩn chấp nhận )
- Các lỗi về khả năng bảo trì (ví dụ, mô đun hóa không đúng, khả năng tái sử dụng kém của các thành phần, mã khó phân tích và sửa đổi nếu không đưa ra các lỗi mới)

| Static Testing | Dynamic Testing | 
| -------- | -------- | -------- |
| Kiểm thử được thực hiện mà khôngcần chạy chương trình     | Kiểm thử được thực hiện bằng cách chạy chương trình     | 


## 3. Review process
![](https://images.viblo.asia/122a0400-c633-479f-91d8-f6e34fbb9ff9.png)<br>
*Review process*

### 3.1 Planning
- Xác định phạm vi, bao gồm mục đích của việc xem xét, những tài liệu hoặc phần của
tài liệu để xem xét và các đặc điểm chất lượng được đánh giá
- Ước tính công sức và khung thời gian
- Xác định các đặc điểm đánh giá như loại đánh giá với các vai trò, hoạt động và danh sách kiểm tra
- Lựa chọn những người tham gia đánh giá và phân bổ vai trò
- Xác định các tiêu chí đầu vào và ra cho các loại đánh giá chính thức hơn (ví dụ: thanh tra)
- Kiểm tra xem các tiêu chí đầu vào có được đáp ứng không (đối với các loại đánh giá chính thức hơn)
### 3.2 Initiate review

- Phân bổ sản phẩm công việc và các tài liệu khác, chẳng hạn như vấn đề biểu mẫu báo cáo lỗi, danh sách kiểm tra và các sản phẩm công việc liên quan
- Giải thích phạm vi, mục tiêu, quy trình, vai trò và sản phẩm công việc cho những người tham gia
- Trả lời bất kỳ câu hỏi nào mà người tham gia có thể có về đánh giá
### 3.3  Individual review- Đánh giá cá nhân
- Đánh giá toàn bộ hoặc một phần sản phẩm làm việc
- Ghi nhận các khiếm khuyết tiềm ẩn, đưa ra gợi ý  và đặt câu hỏi
### 3.4 Issue communication and analysis- Vấn đề giao tiếp và phân tích
- Truyền đạt các khiếm khuyết tiềm ẩn đã xác định (ví dụ, trong một cuộc họp đánh giá)
- Phân tích các khiếm khuyết tiềm ẩn, chỉ định quyền sở hữu và tình trạng cho chúng
- Đánh giá và ghi lại các đặc tính chất lượng
- Đánh giá các phát hiện xem xét so với các tiêu chí đầu ra để đưa ra quyết định xem xét (từ chối;  những thay đổi chính cần thiết; hay chấp nhận, có thể với những thay đổi nhỏ)
### 3.5 Sửa chữa và báo cáo
- Tạo báo cáo lỗi cho những phát hiện cần thay đổi
- Sửa chữa các lỗi được tìm thấy trong sản phẩm công việc được đánh giá
- Thông báo các khiếm khuyết cho người hoặc nhóm thích hợp (khi được tìm thấy trong một sản phẩm công việc liên quan đến sản phẩm công việc được đánh giá)
- Ghi lại tình trạng cập nhật của lỗi (trong các đánh giá chính thức), có khả năng bao gồm cả sự chấp nhận của người khởi tạo bình luận
- Thu thập số liệu (cho các loại đánh giá chính thức hơn)
- Kiểm tra xem các tiêu chí đầu ra có được đáp ứng hay không (đối với các loại đánh giá chính thức hơn)
- Chấp nhận sản phẩm làm việc khi đạt tiêu chuẩn đầu ra
## 4. Review types and Review techniques
![](https://images.viblo.asia/4a4bbe67-cd03-46aa-9971-c026e63c7fb1.jpeg)<br>
*Review types and Review techniques*

| Tiêu chí | Informal review| Walk through | Technical review| Inspection  |
| -------- | -------- | -------- |-------- | -------- |
| Mục đích     | Phát hiện các lỗi tiềm ẩn     | - Tìm ra các lỗi, cải tiến sản phẩm phần mềm<br>- Xem xét các triển khai thay thế<br>- Đánh giá sự phù hợp với các tiêu chuẩn và thông số kỹ thuật     |- Đánh giá chất lượng <br> - Phát hiện các lỗi tiềm ẩn     | - Phát hiện các lỗi tiềm ẩn<br>- Đánh giá chất lượng <br>- Xây dựng niềm tin trong sản phẩm công việc<br> - Ngăn ngừa các khiếm khuyết tương tự trong tương lai thông qua việc học hỏi tác giả và phân tích nguyên nhân gốc rễ     |
| Người đứng đầu    | Không có     | Tác giả     |- Lý tưởg được thực  hiện bởi người điều hành<br> - Có thể thực hiện bởi review leader     | Người điều hành      |
| Kỹ thuật review   | - Ad-hoc<br> - Ít hoặc không có hướng dẫn cụ thể <br>-  Dựa vào kỹ năng của người review    | - Scenario/ Dry run/ Demo<br>- Có thể tạo nhật ký lỗi tiềm ẩn và báo cáo đánh giá<br>- Có thể thay đổi trong thực tế từ gần chính thức đến  chính thức     |- Role-based/ Perspective-based<br> - Review dựa trên sự khác nhau giữa quan điểm của các bên liên quan    | Checklist-based:<br>- Bộ câu hỏi tiêu chuẩn  <br>- Ngăn chặn các lỗi đã xảy ra trong quá khứ   |
| Quy trình    | - Không có quy trình<br>- Không có tài liệu( sử dụng checklist sẽ được xem xét nếu cần)<br>- Thường áp dụng trong mô hình Agile     | Theo quy trình nhưng: Review cá nhân và báo cáo review được xem xét nếu cần     | Theo quy trình: nhưng review meeting và quản lý, checklist được xem xét nếu cần    | Theo quy trình chính thức<br> - Xác định cụ thể vai trò, quy tắc<br>- Sử dụng checklist<br> - Xác định tiêu chí đầu vào và đầu ra<br>- Thu thập dữ liệu và rút ra bài học     |

## 5. Success factors for review
### 5.1 Process
- Mỗi cuộc đánh giá đều có các mục tiêu rõ ràng, được xác định trong quá trình lập kế hoạch đánh giá và được sử dụng làm tiêu chí đầu ra có thể đo lường được
- Các loại đánh giá được áp dụng phù hợp để đạt được các mục tiêu và phù hợp với
loại và cấp độ của sản phẩm phần mềm và những người tham gia
- Bất kỳ kỹ thuật đánh giá nào được sử dụng, chẳng hạn nhưchecklist-based, role- based, đều phù hợp để xác định lỗi hiệu quả trong sản phẩm làm việc cần được xem xét
- Bất kỳ danh sách kiểm tra nào được sử dụng đều giải quyết các rủi ro chính và được cập nhật
- Các tài liệu lớn được viết và xem xét theo từng phần nhỏ để kiểm soát chất lượng được thực hiện bằng cách cung cấp cho tác giả phản hồi sớm và thường xuyên về các khiếm khuyết
- Người tham gia có đủ thời gian để chuẩn bị
- Đánh giá được lên lịch trình với thông báo đầy đủ
- Hỗ trợ quản lý quy trình review (ví dụ: bằng cách kết hợp thời gian thích hợp để xem xét
các hoạt động trong lịch trình dự án)
### 5.2 People
- Những người phù hợp có liên quan để đáp ứng các mục tiêu đánh giá, ví dụ, những người có
bộ kỹ năng hoặc quan điểm, người mà có thể sử dụng tài liệu làm đầu vào cho công việc
- Tester được coi là người đánh giá có giá trị đóng góp vào việc đánh giá và tìm hiểu về
sản phẩm công việc, cho phép họ chuẩn bị các bộ kiểm tra hiệu quả và sớm hơn
- Người tham gia dành thời gian thích hợp và chú ý đến từng chi tiết
- Các bài đánh giá được tiến hành theo từng phần nhỏ để người đánh giá không bị mất tập trung trong quá trình đánh giá cá nhân và / hoặc cuộc họp đánh giá
- Những lỗi phát hiện được ghi nhận, đánh giá cao và xử lý một cách khách quan
- Cuộc họp được quản lý tốt để những người tham gia coi đây là cách sử dụng thời gian có giá trị của họ
- Việc xem xét được tiến hành trong bầu không khí tin cậy; kết quả sẽ không được sử dụng cho
đánh giá của những người tham gia
- Người tham gia tránh ngôn ngữ cơ thể và các hành vi có thể biểu hiện sự buồn chán, bực tức hoặc đối đầu với những người tham gia khác
- Đào tạo đầy đủ được cung cấp, đặc biệt là đối với các loại đánh giá chính thức hơn như kiểm tra văn hóa học hỏi và cải tiến quy trình được thúc đẩy