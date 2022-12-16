# What is a Test Scenario?
Kịch bản kiểm thử - Test Scenario bao gồm tất cả các chức năng có thể được kiểm thử. Test Scenario cũng được gọi là Test Condition hoặc Test Possibility. Là một tester, bạn có thể đặt mình vào vị trí của người dùng cuối và tìm ra các tình huống trong thực tế và các trường hợp có thể xảy ra của ứng dụng đang được kiểm thử.

Scenario Testing  là một biến thể của Kiểm thử phần mềm trong đó Kịch bản được sử dụng để kiểm thử. Các kịch bản giúp dễ dàng kiểm thử các hệ thống phức tạp.
![](https://images.viblo.asia/7ec7260e-39d1-491c-807e-91c87e3842f5.jpg)

### Tại sao phải tạo Test Scenario
Test Scenario rất hữu ích khi Tester không thể thực hiện kiểm tra toàn diện phần mềm do hạn chế về thời gian. Các kịch bản thử nghiệm cho phép họ kiểm tra chức năng của phần mềm trên các khía cạnh quan trọng nhất trong thời gian tương đối ít hơn.
Và do vậy Test Scenario được tạo ra vì những lý do sau đây:
- Tạo các kịch bản kiểm thử đảm bảo hoàn thành Test Coverage
- Kịch bản kiểm thử có thể được thông qua bởi các bên liên quan khác nhau như Nhà phân tích nghiệp vụ (BA), Developers, Khách hàng để đảm bảo ứng dụng được kiểm thử kỹ lưỡng và đảm bảo rằng phần mềm đang hoạt động tốt.
- Kịch bản kiểm thử như một công cụ nhanh chóng để xác định effort kiểm thử, dựa theo đó tạo ra đề xuất cho khách hàng hoặc tổ chức về nguồn lực lao động.
- Kịch bản kiểm thử giúp xác định các giao dịch đầu cuối quan trọng nhất hoặc xác định việc sử dụng các ứng dụng phần mềm trong thực tế.
- Để nghiên cứu chức năng đầu cuối, Kịch bản kiểm thử là rất quan trọng.

Tuy nhiên với một vài dự án chúng ta không thể tạo Test Scenario:
- Ứng dụng đang kiểm thử rất phức tạp, không ổn định hoặc dự án đang rơi vào một thời gian khủng hoảng.
- Các dự án tuân theo Phương pháp Agile như Scrum, Kanban có thể không tạo Kịch bản kiểm thử.
- Kịch bản kiểm thử có thể không được tạo khi sửa lỗi mới hoặc khi thực hiện kiểm thử hồi quy. Trong các trường hợp như vậy, Kịch bản kiểm thử phải được lưu lại nhiều trong các chu kỳ kiểm thử trước đó. Điều này đặc biệt đúng với các dự án bảo trì.

# Sự khác nhau giữa Test Scenario và Test Case?

Test Case tiếp tục đi sâu hơn vào chi tiết của test scenario. Test Case được ví như những đơn vị nhỏ nhất của từng test project, như các tế bào của một cơ thể sống. 

### Khái niệm
- Test Cases: cung cấp thông tin chi tiết cái phải test, các bước thực hiện và dự kiến kết quả. Test Scenarios lại cung cấp một dòng thông tin về những gì cần phải kiểm tra.

### Ưu nhược điểm của mỗi loại
***1. Ưu điểm và lợi ích***

*Test Cases:*

- Có thể tái sử dụng lại nhiều lần trong tương lai.
- Về mặt thời gian thì việc tạo test case rất hữu ích trong việc report lỗi. Tester chỉ cần cung cấp tài liệu tham khảo của test case ID mà không cần đề cập chi tiết.
- Tài liệu này sẽ thực sự quan trọng cho những tester mới ra trường chưa có kinh nghiệm trong việc testing hệ thống 

*Test Scenarios:*

-Tiết kiệm thời gian và tích cực tạo ra ý tưởng mới, nó được ưa chuộng bởi thế hệ mới của cộng đồng kiểm thử phần mềm.
- Việc sửa đổi và bổ sung thì đơn giản hơn và không giao cụ thể cho một người.
- Đối với một dự án lớn, nơi mà một group chỉ biết các module cụ thể thì việc sử dụng Test Scenario sẽ mang lại một cơ hội để mọi người có thể dễ dàng thảo luận và đưa ra những sáng kiến khi nhìn vào những module khác.
- Test Scenario có thể đạt được độ che phủ tốt nhất bằng cách chi nhỏ các ứng dụng mặt khác nó cũng làm giảm mức độ lặp lại của sản phẩm.

***2. Nhược điểm:***

*Test Cases:*

- Tốn thời gian và tiền bạc vì nó đòi hỏi nhiều nguồn nhân lực để có thể hiểu chi tiết về những thứ phải kiểm thử và làm cách nào để có thể kiểm thử.

*Test Scenarios:*

- Nếu Test Scenario được tạo ra bởi một người cụ thể thì những người sử dụng lại sẽ không thể hiểu hết được chính xác ý tưởng của người trước, nó sẽ cần thêm các buổi thảo luận nhóm do đó sẽ tốn thêm nhiều effort để làm rõ các kịch bản trước đó.

### Vậy nên sử dụng Test Case hay Test Scenario

Test Case được ví như những đơn vị nhỏ nhất của từng test project, như các tế bào của một cơ thể sống. Điều quan trọng khi thiết lập 1 test case:
- Ít step nhất có thể và chắc chắn rằng chỉ có 1 bước verify cần thực hiện.
- Expected result phải được miêu tả 1 cách rõ ràng. Một ví dụ cho việc mô tả không rõ ràng như sau: "test pass khi user login thành công". Thành công như thế nào? điều gì chứng tỏ login thành công? App hay web sẽ redirect user tới screen nào? Điều gì xác định là user đã được login? Tất cả phải được nêu một cách RÕ RÀNG NHẤT CÓ THỂ. Điều này là tối quan trọng nếu bạn muốn test case có thể được automate.
- Pre-condition phải được miêu tả rõ ràng. Những features nào phải hoạt động trước khi test case có thể chạy? Tester phải làm gì trước khi bắt đầu test case? Test case nào cần phải pass trước khi có thể chạy test case hiện tại?

Trong khi đó Test Scenario đi sâu hơn vào chi tiết của từng feature. Test Scenario mô tả cái cần test, lưu ý là cái cần test. Ở đây có thể ví dụ một test scenario điển hình như: Test chức năng Login
- Kiểm tra nội dung các text trên trang đăng nhập có đúng theo design hay không
- Kiểm tra trường Username
- Kiểm tra trường Password
- Kiểm tra Login button có hoạt động đúng như design hay không

Khi dự án không có nhiều thời gian, Test Scenario sẽ là một lựa chọn tối ưu cho dự án. Và nó cũng vẫn đạt được hiệu quả cao như việc tạo Test Case.

# Cách tạo Kịch bản kiểm thử
Là người Tester, bạn có thể làm theo năm bước sau để tạo Test Scenario :
- Bước 1: Đọc các Tài liệu yêu cầu như BRS, SRS, FRS của Hệ thống đang kiểm thử (System Under Test - SUT). Bạn cũng có thể tham khảo các uses cases, sách, hướng dẫn…của ứng dụng sẽ được kiểm thử.
- Bước 2: Đối với mỗi yêu cầu, hãy tìm ra các hành động và mục tiêu có thể của người dùng. Xác định các khía cạnh yêu cầu kỹ thuật. Xác định các tình huống có thể xảy ra về lạm dụng hệ thống và đánh giá người dùng với suy nghĩ của hacker.
- Bước 3: Sau khi đọc Tài liệu yêu cầu và thực hiện Phân tích, hãy liệt kê các kịch bản kiểm thử để xác minh từng tính năng của phần mềm.
- Bước 4: Khi đã liệt kê tất cả các kịch bản kiểm thử có thể, Ma trận truy xuất nguồn gốc được tạo để xác minh rằng mọi yêu cầu đều có kịch bản kiểm thử tương ứng
- Bước 5: Các kịch bản được tạo ra được xem xét bởi người giám sát và các bên liên quan trong dự án.

Ví dụ một Test Scenario cho một trang web ngân hàng
Kịch bản kiểm thử 1: Kiểm thử chức năng đăng nhập và xác thực của màn hình loggin
Kịch bản kiểm thử 2: Kiểm thử chức năng chuyển tiền có thể được thực hiện đúng trong trường hợp số dư người dùng có số dư nhỏ hơn số tiền chuyển.
Kịch bản kiểm thử 3: Kiểm thử chức năng chuyển tiền có thể được thực hiện đúng trong trường hợp số dư người dùng có số dư bằng hơn số tiền chuyển
Kịch bản kiểm thử 4: Kiểm thử chức năng chuyển tiền có thể được thực hiện đúng trong trường hợp số dư người dùng có số dư lớn hơn số tiền chuyển
Kịch bản kiểm thử 5: Kiểm thử chức năng sao kê tài khoản có thể được xem được hay không
Kịch bản kiểm thử 6: Kiểm thử chức năng tiền gửi cố định / tiền gửi định kỳ có thể được tạo

### Lưu ý:
- Mỗi kịch bản kiểm thử phải được gắn với tối thiểu một yêu cầu trong dự án.
- Trước khi tạo kịch bản kiểm thử xác minh nhiều yêu cầu cùng một lúc, hãy đảm bảo đã có kịch bản kiểm thử cho mỗi yêu cầu riêng lẻ.
- Tránh tạo các kịch bản kiểm thử quá phức tạp, nhiều yêu cầu kéo theo.
- Số lượng kịch bản có thể lớn và tốn kém để bao phủ tất cả. Dựa trên những ưu tiên của khách hàng, chỉ chạy các kịch bản kiểm thử được chọn.

***Refer link:** 

https://www.guru99.com/test-scenario.html

https://www.guru99.com/test-case-vs-test-scenario.html