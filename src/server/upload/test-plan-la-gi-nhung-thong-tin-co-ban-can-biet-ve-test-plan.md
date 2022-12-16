# 1.TEST PLAN 
## 1.1 Test Plan là gì?
**Test plan** là một tài liệu mô tả mục tiêu,phạm vi, phương pháp tiếp cận và tập trung vào sự lỗ lực kiểm thử phần mềm. Quá trình chuẩn bị Test Plan là một cách hữu ích để suy nghĩ tới những nỗ lực cần thiết để xác nhận khả năng chấp nhận một sản phẩm phần mềm.

**Cấu trúc chung** của một test plan thường bao gồm các thông tin:

- Tên project
- Danh sách các module cần test
-  Ngày bắt đầu , ngày kết thúc
-  Danh sách các test case 
-  Nhân sự tham gia 
-  Tài nguyên sử dụng
-  Kế hoạch thực hiện

## 1.2. Tại sao phải viết test plan?

- Để định hướng suy nghĩ
- Là phương tiện giao tiếp của nhóm test với đội dự án và là công cụ giao việc trong nhóm test
- Hỗ trợ quản lý và điều chỉnh khi có thay đổi

## 1.3. Các loại test plan

**1.3.1. Master test plan**: 

Một kế hoạch kiểm thử level cao duy nhất cho một dự án/sản phẩm kết hợp tất cả các kế hoạch kiểm thử khác.

**1.3.2. Testing Level Specific Test Plans**: 

Các kế hoạch cho mỗi mức thử nghiệm:

- Unit Test Plan:

    **Unit Testing** (kiểm thử đơn vị) là một mức kiểm thử phần mềm với mục đích để xác nhận từng unit của phần mềm được phát triển đúng như được thiết kế. Unit testing là mức test nhỏ nhất trong bất kỳ phần mềm nào. các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method) đều có thể được xem là Unit. Nó thường có một hoặc vài đầu vào nhưng đầu ra là duy nhất.

    **Unit testing** được thực hiện bởi lập trình viên và là white box testing. Được thực hiện càng sớm càng tốt trong giai đoạn viết code và xuyên suốt quá trình phát triển phần mềm.

    **Mục đích:** 

    Tăng sự đảm bảo khi có sự thay đổi mã

    Code dễ sử dụng, dễ hiểu có thể tái sử dụng 

    Chi phí sửa chữa thấp hơn các giai đoạn sau

    Dễ dàng sửa lỗi hơn

- Integration Test Plan:

    **Integration Testing** ( kiểm thử tích hợp) là thực hiện kiểm thử tích hợp 1 nhóm mô đun riêng lẻ với nhau. Một hệ thống phần mềm bao gồm nhiều module được code bởi nhiều người khác nhau. Tích hợp kiểm thử tập trung vào việc truyền dữ liệu giữa các module với nhau. 

    **Kiểm thử tích hợp** được thực hiện để phát hiện các lỗi về giao diện hoặc trong tương tác giữa các thành phần hoặc hệ thống tích hợp.

    **Kiểm thử tích hợp thành phần**: kiểm tra sự tương tác giữa các thành phần với điều kiện các thành phần đã pass ở phần kiểm thử thành phần trước đó.

    **Kiểm thử tích hợp hệ thống**: kiểm tra sự tương tác giữa các hệ thống con khác nhau và các hệ thống này đã pass ở lần kiểm thử trước đó.

    Được thực hiện bởi developer, một test team chuyên biệt hay một nhóm chuyên developer/kiểm thử viên tích hợp bao gồm cả kiểm thử phi chức năng và được thực hiện sau Unit Testing và trước System Testing.

    **Mục đích:**
Mục đích để tìm ra lỗi trong quá trình tích hợp các thành phần, các modul lại với nhau 

- System Test Plan:

    **System testing** (kiểm thử hệ thống) là thực hiện kiểm thử một hệ thống đã được tích hợp hoàn chỉnh để đảm bảo nó hoạt  động đúng yêu cầu.

    **Kiểm thử hệ thống** là kiểm thử hộp đen và được tập trung vào chức năng của hệ thống. Kiểm tra các chức năng và giao diện, các hành vi của hệ thống một cách hoàn chỉnh đáp ứng đúng với yêu cầu. 

    **Mục đích:**
Mục đích của giai đoạn này là để đánh giá sự hoạt động của hệ thống có đúng theo như tài liệu đặc tả và được thực hiện bởi các tester.

- Acceptance Test Plan:

    **Kiểm thử chấp nhận** chính thức liên quan đến yêu cầu và quy trình kinh doanh để xác định liệu hệ thống có đáp ứng tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc tổ chức được ủy quyền khác xác định có chấp nhận hệ thống hay không.

    **Kiểm thử chấp nhận** là mức thứ 4 được thực hiện sau khi hoàn thành kiểm thử hệ thống và trước khi đưa sản phẩm vào sử dụng chính thức. Với mục đích đảm bảo phần mềm đáp ứng đúng yêu cầu của khách hàng. Sản phẩm nhận được sự chấp nhận từ khách hàng/ người dùng cuối.

    Kiểm thử chấp nhận được chia thành 2 mức khác nhau:

    **Kiểm thử alpha**: được thực hiện tại nơi phát triển phần mềm bởi những người trong tổ chức nhưng không tham gia phát triển phần mềm.

    **Kiểm thử beta**: được thực hiện tại bởi khách hàng/ người dùng cuối tại địa điểm của người dùng cuối.
    
    **Mục đích:** Để đánh giá hệ thống tuân thủ đúng với yêu cầu của khách hàng và có thể chấp nhận hay không chấp nhận để bàn giao sản phẩm 
    


**1.3.3. Testing Type Specific Test Plans:**

- Kế hoạch Kiểm thử Hiệu năng
- Kế hoạch Kiểm thử bảo mật 
# 2. Mục tiêu cần đạt được
**Xác định được các yêu cầu sau:** 

- Tăng hiệu quả làm việc nhóm
- Xác định loại test
- Xác định chiến lược test
- Chỉ rõ trách nhiệm
- Xác định deadline
- Thời điểm dừng test
- Cập nhật liên tục

# 3. Template của Test Plan 

**Template của Test plan** Format và nội dung của Test plan khác nhau tùy thuộc vào các quy trình, tiêu chuẩn và các công cụ quản lý kiểm tra đang được thực hiện. Tuy nhiên, định dạng sau, dựa trên tiêu chuẩn IEEE cho tài liệu kiểm thử phần mềm, cung cấp một bản tóm tắt về Test plan

**3.1. Định danh Test Plan:** 

Cung cấp một mẫu duy nhất cho tài liệu. (Tuân theo Hệ thống Quản lý Cấu hình nếu bạn có.)

**3.2. Giới thiệu**:

- Cung cấp tổng quan về kế hoạch kiểm tra.
- Chỉ định các mục tiêu / mục đích.
- Chỉ định bất kỳ hạn chế.

**3.3. Tài liệu tham khảo**:

Liệt kê các tài liệu có liên quan, có liên kết tới chúng nếu có, bao gồm những điều sau:

- Kế hoạch Dự án
- Kế hoạch Quản lý Cấu hình

**3.4. Các mục Kiểm thử**

Liệt kê các mục kiểm tra (phần mềm/sản phẩm) và các phiên bản của chúng.

**3.5. Các tính năng cần được kiểm tra:**

- Liệt kê các tính năng của phần mềm/sản phẩm cần kiểm thử
- Cung cấp tài liệu tham khảo cho Requirements và/hoặc Thông số kỹ thuật thiết kế của các tính năng cần được kiểm tra

**3.6. Các tính năng không được kiểm tra**:

- Liệt kê các tính năng của phần mềm/sản phẩm sẽ không được kiểm tra.
- Chỉ định lý do các tính năng này sẽ không được kiểm tra.

**3.7. Tiếp cận**:

Đề cập đến cách tiếp cận tổng thể để thử nghiệm.
Chỉ định mức kiểm tra (nếu đó là kế hoạch kiểm tra chính), các loại thử nghiệm, và các phương pháp thử (Kiểm thử manual/ tự động, kiểm thử hộ trắng/đen/xám)

**3.8. Tiêu chí Pass/Fail**:

Chỉ định các tiêu chí sẽ được sử dụng để xác định xem mỗi mục kiểm tra (phần mềm / sản phẩm) đã vượt qua hay không.

**3.9. Tiêu chí trì hoãn  và yêu cầu tiếp tục:**

- Chỉ định các tiêu chí sẽ được sử dụng để tạm ngừng hoạt động thử nghiệm.
- Chỉ định các hoạt động thử nghiệm phải được làm lại khi thử nghiệm được tiếp tục.

**3.10. Kết quả đã lên plan:**

Liệt kê các kết quả đã lên plan và các liên kết tới chúng nếu có, bao gồm:

- Test Plan
- Test Cases
- Test Scripts
- Defect/Enhancement Logs
- Test Reports

**3.11. Môi trường kiểm thử:**

- Chỉ định các thuộc tính của môi trường kiểm tra: phần cứng, phần mềm, mạng, vv

- Liệt kê bất kỳ công cụ kiểm tra hoặc các công cụ liên quan.

**3.12. Ước tính:**

Cung cấp một bản tóm tắt các ước tính kiểm thử (chi phí hoặc nỗ lực) và/hoặc cung cấp liên kết tới dự toán chi tiết.

**3.13. Lịch trình**:

Cung cấp bản tóm tắt lịch trình, chỉ định các cột mốc kiểm tra quan trọng, và / hoặc cung cấp liên kết đến lịch biểu chi tiết.

**3.14. nguồn lực và đào tạo nếu cần :**

- Chỉ định nhu cầu nhân sự theo vai trò và các kỹ năng cần thiết.
- Xác định đào tạo là cần thiết để cung cấp những kỹ năng đó, nếu chưa có.

**3.15. Trách nhiệm**:

Liệt kê trách nhiệm của mỗi nhóm/vai trò/cá nhân.

**3.16. Rủi ro**:

- Liệt kê những rủi ro đã được xác định.
- Chỉ rõ kế hoạch giảm nhẹ và kế hoạch dự phòng cho mỗi rủi ro.

**3.17. Giả định và vấn đề liên quan:**

-Liệt kê các giả định đã được đưa ra trong quá trình chuẩn bị kế hoạch này.
- Liệt kê các vấn đề liên quan 

**3.18. Phê duyệt**:

- Chỉ định tên và vai trò của tất cả những người phải phê duyệt kế hoạch.
- Cung cấp không gian chữ ký và ngày tháng. (Nếu tài liệu được in)

**Lưu ý:**

- Lập kế hoạch xúc tích. Tránh sự thừa và dư thừa. Nếu bạn nghĩ rằng bạn không cần một phần đã được đề cập trong mẫu ở trên, hãy tiếp tục và xóa phần đó trong kế hoạch kiểm tra của bạn.

- Hãy cụ thể. Ví dụ: khi bạn chỉ định một hệ điều hành như một thuộc tính của một môi trường thử nghiệm, cũng đề cập đến Hệ điều hành Phiên bản / Phiên bản, không chỉ tên của Hệ điều hành.

- Hãy sử dụng danh sách và bảng nếu có thể. Tránh các đoạn văn dài.

- Có kế hoạch kiểm tra xem xét một số lần trước khi cơ sở nó hoặc gửi nó để phê duyệt. Chất lượng của kế hoạch kiểm tra của bạn nói lên số lượng về chất lượng của bài kiểm tra mà bạn hoặc nhóm của bạn sẽ thực hiện.

- Cập nhật kế hoạch khi cần thiết. Một tài liệu đã lỗi thời và không sử dụng bị lỗi và tệ hơn là không có tài liệu ở nơi đầu tiên.

# Kết Luận
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về Test Plan. Mong rằng các bạn có thể hiểu và áp dụng linh hoạt vào công việc của mình một cách phù hợp, đặc biệt là những bạn mới bắt đầu theo học Tester(QA).Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học, tìm hiểu một cách tốt nhất!

Tài liệu tham khảo: http://softwaretestingfundamentals.com/test-plan/