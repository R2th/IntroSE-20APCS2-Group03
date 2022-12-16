## 1. Static testing là gì?
- Ngược lại với dymanic testing (kiểm thử động), kiểm thử động yêu cầu phải chạy phần mềm để test. Còn kiểm thử tĩnh là kĩ thuật kiểm tra các tài liệu (review) và tự động phân tích cú pháp (static analysis) của code hoặc các tài liệu của dự án mà không cần chạy chương trình.
- Cả 2 kĩ thuật của kiểm thử tĩnh đều thực hiện đánh giá code và các work product khác mà không cần thực hiện chạy code.
- Static analysis là quan trọng cho hệ thống đòi hỏi tiêu chí an toàn cao, ví dụ như các phần mềm về hàng không, y khoa...
- Những work product có thể được kiểm tra bởi kiểm thử tĩnh: <br>
    + Đặc tả yêu cầu: requirements, functional requirements, security requirements <br>
    + User stories, acceptance criteria (tiêu chí chấp nhận)<br>
    + Code <br>
    + Tài liệu thiết kế và kiến trúc...

- Review áp dụng cho bất kì work product mà người tham gia cần phải đọc và hiểu 
- Static analysis có thể được áp dụng hiệu quả cho bất kì work product nào có cấu trúc tiêu chuẩn (thông thường như code hoặc models), với mỗi work product mà có công cụ phân tích tĩnh phù hợp. 
Static analysis thậm chí có thể áp dụng với những tool đánh giá work product với ngôn ngữ tự nhiên giống như requirement (ví dụ như kiểm tra chính tả, cú pháp...)
<br>
## 2. Lợi ích của static testing
- Kĩ thuật kiểm thử tĩnh cung cấp rất nhiều lợi ích. Khi áp dụng sớm vào vòng đời phát triển phần mềm, kiểm thử tĩnh có khả năng xác định sớm những defect trước khi thực hiện  kiểm thử động (ví dụ các defect trong quá trình review tài liệu requirement, design...)
- Các defect được phát hiện sớm thì chi phí để remove sẽ rẻ hơn nhiều so với việc tìm thấy muộn trong vòng đời phát triển phần mềm, đặc biệt khi so với chi phí bỏ ra khi các defect được phát hiện sau khi phần mềm được deployed và được đưa vào sử dụng.
- Cụ thể các lợi ích của static testing bao gồm:<br>
    + Phát hiện và sửa lỗi hiệu quả hơn trước khi thực hiện kiểm thử động <br>
    + Ngăn chặn những defect trong thiết kế và code bằng cách phát hiện ra sự mâu thuẫn, mơ hồ, thiếu sót, không chính xác.<br>
    + Xác định những defect mà không dễ dàng phát hiện bởi kiểm thử động <br>
    + Tăng hiệu suất phát triển: ví dụ do thiết kế được cải tiến, code dễ bảo trì<br>
    + Giảm thời gian và chi phí phát triển<br>
    + Giảm thời gian và chi phí test

## 3. Sự khác nhau giữa static testing và dynamic testing
- Static testing và dymanic testing có cùng mục đích, như là cung cấp đánh giá về chất lượng của work product và xác định defect càng sớm càng tốt.
- Hai phương pháp này bổ trợ cho nhau vì tìm thấy các defect khác nhau.
- Điểm phân biệt chính là kiểm thử tĩnh tìm kiếm defect trong work product 1 cách trực tiếp còn kiểm thử động xác định các failures gây ra bởi defect khi chạy phần mềm.
- Một defect có thể tồn tại trong work product 1 thời gian dài mà không gây ra failure
- Kiểm thử tĩnh có thể tìm thấy defect mà tốn ít công sức hơn
- Một điểm khác nhau nữa là kiểm thử tĩnh có thể được sử dụng để nâng cao tính nhất quán và chất lượng bên trong của work product, trong khi kiểm thử động thông thường tập trung vào hành vi bên ngoài của sản phẩm.
- Khi so sánh với kiểm thử động, các loại defect đặc thù mà có thể tìm thấy và fix 1 cách dễ dàng và chi phí rẻ bao gồm:
    - Requirement defects (ví dụ: mâu thuẫn, dư thừa, không chính xác)
    - Design defects (thuật toán hoặc cấu trúc dữ liệu không hiệu quả)
    - Coding defects (các biến có giá trị không xác định, các biến được khai báo nhưng không sử dụng, code không thể truy cập, code trùng lặp)
    - Độ lệch so với tiêu chuẩn (ví dụ: thiếu tuân thủ các tiêu chuẩn code)
    - Thông số kĩ thuật giao diện không chính xác
    - Các lỗ hổng bảo mật (ví dụ: dễ tràn bộ nhớ đệm)
    - Các lỗ hổng hoặc không chính xác trong truy xuất nguồn gốc hoặc phạm vi bảo hiểm
- Ngoài ra, hầu hết các loại maintainability defects chỉ có thể tìm thấy bởi kiểm thử tĩnh.
## 4. Quy trình review
- Review có thể theo tiêu chuẩn (formal review) hoặc không theo tiêu chuẩn (informal review). Informal reviews đặc trưng bởi không tuân theon một quy trình chuẩn và không có tài liệu đầu ra tiêu chuẩn.
- Formal reviews đặc trưng thành phần tham gia, kết quả ghi chép lại của buổi review và các tài liệu ghi lại để đánh giá.
- Hình thức của quá trình review liên quan đến nhân tố như quy trình phát triển phần mềm, độ phức tạp của work product được review...
- Trọng tâm của review phụ thuộc vào các mục tiêu được thống nhất của việc review (ví dụ như tìm bug, tạo sự hiểu biết chung, đưa ra kiến thức cho người tham gia như tester/new member...
### Quy trình review work product
- Planning (Lên kế hoạch):
    - Xác định phạm vi, bao gồm mục đích của review, tài liệu hoặc một phần tài liệu nào được thực hiện review, và đặc điểm chất lượng nào cần được đánh giá.
    - ước lượng nguồn lực và thời gian
    - Xác định đặc điểm review như loại review tương ứng với vai trò, hoạt động và checklist
    - Lựa chọn những người tham gia vào quá trình review và phân bổ vai trò
    - Xác định tiêu chí đầu vào đầu ra cho mỗi loại review khác nhau
    - Kiểm tra các tiêu chí đầu vào cần thiết (cho những loại review tiêu chuẩn)
- Initiate review (Khởi tạo review):
    - Phân bổ work product và các phương tiện cần thiết như biểu mẫu log issue, các checklist và các tài liệu liên quan đến work product cần được review
    - Giải thích giới hạn, mục đích, quy trình, vai trò và các work product cho người tham gia review
    - Giải đáp bất kì câu hỏi nào mà người tham gia review đưa ra về việc review
- Individual review
    - Thực hiện review tất cả các phần của work product
    - Ghi chú lại những defect tiềm ẩn, những đề xuất và các câu hỏi liên quan đến work product trong quá trình review
- Issue communication và analysis
    - Truyền đạt những defect tiềm ẩn đã được xác định
    - Phân tích các defect tiềm ẩn và giao quyền sở hữu và trạng thái cho chúng
    - Đánh giá và ghi chép lại những đặc tính chất lượng
    - Đánh giá những gì buổi review đem lại so với tiêu chuẩn đầu ra để tạo quyết định cho buổi review (ví dụ: reject, có sự thay đổi lớn cần phải làm, có thể chấp nhận với sự thay đổi nhỏ)
- Fixing và reporting:
    - Tạo báo cáo defect cho những yêu cầu cần thay đổi
    - Fix những defect được tìm thấy trong sản phẩm review
    - Ghi nhận lại việc thay đổi trạng thái của defect (chỉ có trong formal review), có thể bao gồm cả sự đồng ý của người tạo comment
    - Thu thập số liệu (chỉ có trong formal review)
    - Kiểm tra tiêu chí đầu ra đạt được hay chưa (chỉ có trong formal review)
    - Chấp nhận những work product khi tiêu chí đầu ra đã đạt được

## 5. Tài liệu tham khảo
- Giáo trình ISTQB Foundation 2018 (tham khảo chương 3): https://www.istqb.org/downloads/send/51-ctfl2018/208-ctfl-2018-syllabus.html