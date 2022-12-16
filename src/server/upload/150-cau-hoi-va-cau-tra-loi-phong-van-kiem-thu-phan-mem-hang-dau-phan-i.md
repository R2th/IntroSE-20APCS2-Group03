# 1. Exploratory Testing là gì?

Exploratory Testing (Kiểm thử thăm dò ) là một cách cách tiếp cận kiểm thử phần mềm trong đó người kiểm thử ít nhất tham gia vào việc lập kế hoạch và nhiều hơn là việc thực hiện kiểm thử. Việc lập kế hoạch liên quan đến việc tạo ra một điều kiện kiểm thử, một tuyên bố ngắn về phạm vi của nỗ lực kiểm thử ngắn (1 đến 2 giờ), các mục tiêu và các phương pháp khả thi sẽ được sử dụng. Thiết kế kiểm thử và các hoạt động thực hiện kiểm thử được thực hiện song song kết hợp với các điều kiện kiểm thử, test case hoặc các kịch bản kiểm thử. Điều này không có nghĩa là các kỹ thuật kiểm thử khác sẽ không được sử dụng. 

*Ví dụ: kiểm thử viên có thể quyết định sử dụng phân tích giá trị biên nhưng sẽ suy nghĩ kỹ và kiểm tra các giá trị biên quan trọng nhất mà không nhất thiết phải ghi lại. Một số ghi chú sẽ được viết trong phiên kiểm thử thăm dò và báo cáo có thể được tạo sau đó.*

# 2. Use case là gì?

Use case là danh sách các tính năng tương tác giữa user (xác định role) và hệ thống. Để xác định và thực hiện các yêu cầu chức năng của ứng dụng từ đầu đến cuối .

# 3. Sự khác biệt giữa STLC (Vòng đời kiểm thử phần mềm) và SDLC (Vòng đời phát triển phần mềm) là gì?

SDLC liên quan đến việc phát triển / mã hóa phần mềm trong khi STLC liên quan đến việc xác nhận xử lý và xác minh phần mềm

# 4. Ma trận truy xuất nguồn gốc là gì?

Mối quan hệ giữa trường hợp kiểm thử và yêu cầu liên kết với nhau thông qua một tài liệu. Tài liệu này được gọi là ma trận truy xuất nguồn gốc.

# 5. Kiểm thử phân vùng tương đương là gì?

Kiểm thử phân vùng tương đương là một kỹ thuật kiểm thử phần mềm phân chia dữ liệu đầu vào của ứng dụng thành những vùng tương đương nhau. Tất cả các giá trị trong một vùng tương đương sẽ cho một kết quả đầu ra giống nhau. Bằng phương pháp kiểm tra này, sẽ giảm thời gian cần thiết để kiểm thử phần mềm.

# 6. Kiểm thử hộp trắng là gì ? liệt kê các loại kiểm thử hộp trắng?

Kiểm thử hộp trắng là kỹ thuật liên quan đến việc lựa chọn các trường hợp kiểm thử dựa trên phân tích cấu trúc bên trong (Phạm vi mã, phạm vi các nhánh, phạm vi đường dẫn, phạm vi điều kiện, v.v.) của một chức năng hoặc một hệ thống. Nó còn được gọi là kiểm thử dựa trên mã hoặc kiểm thử cấu trúc.

Các loại thử nghiệm hộp trắng là:

* Kiểm thử đường cơ bản - Đồ thị dòng
* Kiểm thử dựa trên luồng điều khiển

# 7. Trong kiểm thử hộp trắng, bạn cần xác minh điều gì?

Trong hộp trắng kiểm thử các bước sau đây được xác minh.

* Xác minh các lỗ hổng bảo mật trong code
* Xác minh các đường dẫn không đầy đủ hoặc bị hỏng trong code
* Xác nhận luồng hoạt động của cấu trúc theo các đặc điểm kỹ thuật mô tả trong tài liệu
* Xác nhận đầu ra dự kiến
* Xác minh tất cả các vòng lặp có điều kiện trong mã để kiểm tra chức năng hoàn chỉnh của ứng dụng
* Xác minh luồng hoạt động của code và kiểm tra theo mức tối đa là 100%

# 8. Kiểm thử hộp đen là gì? Các kỹ thuật kiểm thử hộp đen?

Kiểm thử hộp đen là phương pháp kiểm thử phần mềm được sử dụng để kiểm tra phần mềm mà không cần biết cấu trúc bên trong của chức năng hoặc chương trình. Kiểm thử này thường được thực hiện để kiểm tra chức năng của một ứng dụng.

Các kỹ thuật kiểm thử hộp đen là:

* Phân vùng tương đương
* Phân tích giá trị biên
* Kiểm thử dựa vào đồ thị
* Sử dụng bảng quyết định

# 9. Sự khác biệt giữa kiểm thử tĩnh và kiểm thử động là gì?

Kiểm tra tĩnh: Trong phương pháp Kiểm thử tĩnh, mã lệnh không được thực thi,  mà chủ yếu kiểm tra tính đúng đắn của code (mã lệnh), thuật toán hay tài liệu.

Kiểm thử động: Để thực hiện kiểm thử này, mã lệnh được yêu cầu phải ở dạng thực thi.

# 10. Xác minh (verification) và xác thực(validation) là gì?

Xác minh là quá trình đánh giá phần mềm ở giai đoạn phát triển. Nó giúp bạn quyết định xem ứng dụng có thỏa mãn các yêu cầu đã chỉ định hay không.

Xác thực là quá trình đánh giá phần mềm nằm sau quá trình phát triển phần mềm, để kiểm tra xem phần mềm có đáp ứng các yêu cầu của khách hàng hay không.

# 11. Các cấp độ kiểm thử phần mềm là gì?

Có bốn cấp độ :

* Unit Test - Kiểm tra mức đơn vị
* Integration Test - Kiểm tra tích hợp
* System Test - Kiểm tra mức hệ thống
* Acceptance test - Kiểm tra chấp nhận

# 12. Kiểm thử tích hợp là gì?

Kiểm thử tích hợp là một cấp độ kiểm thử của quy trình kiểm thử phần mềm, trong đó các đơn vị riêng lẻ của một ứng dụng được kết hợp để kiểm tra. Nó thường được thực hiện sau khi kiểm thử đơn vị và kiểm thử chức năng.

# 13. Test Plans bao gồm những gì?

Test design,  scope, test strategies, approach là những chi tiết của tài liệu Test Plans

* Định danh trường hợp kiểm thử
* Phạm vi
* Các tính năng cần kiểm thử
* Các tính năng không kiểm thử được
* Chiến lược kiểm thử & phương pháp kiểm thử
* Sản phẩm kiểm thử
* Trách nhiệm
* Nhân sự và đào tạo
* Rủi ro và tình huống bất ngờ

# 14. Sự khác biệt giữa UAT (Kiểm thử chấp nhận người dùng) và kiểm thử hệ thống là gì?

Kiểm thử hệ thống: là việc tìm ra các lỗi khi hệ thống đã đồng bộ các chức năng hoạt động; nó còn được gọi là kiểm thử đầu cuối. Trong loại kiểm thử này, ứng dụng được kiểm thử từ đầu đến cuối.

UAT: Kiểm thử chấp nhận người dùng (UAT) liên quan đến việc chạy một sản phẩm thông qua một loạt các kiểm thử cụ thể xác định xem sản phẩm đó có đáp ứng nhu cầu của người dùng hay không.

# 15. Sử khác nhau giữa Data Driven Testing và Retesting là gì ?

Retesting: Đây là một quá trình kiểm tra các lỗi được nhóm phát triển xử lý để xác minh rằng chúng đã được sửa.

 Data Driven Testing (DDT) : Trong quy trình kiểm tra theo hướng dữ liệu, ứng dụng được kiểm tra với nhiều dữ liệu khác nhau. Ứng dụng này được kiểm thử với một bộ giá trị khác nhau.

# 16. Các bước thực hiện kiểm thử là gì?

* Ghi lại: Ghi lại nhật ký về việc xử lý các sự cố đã xảy ra
* Báo cáo: Báo cáo các vấn đề cho người quản lý cấp cao hơn
* Kiểm soát: Xác định quy trình quản lý .

# 17. Sự khác biệt giữa các test scenarios, test cases, và test script là gì?

Sự khác biệt giữa test scenarios, test cases, và test script là: 

Test Scenarios: Kịch bản kiểm thử là bất kỳ chức năng nào có thể được kiểm thử. Nó cũng được gọi là Điều kiện kiểm thử hoặc Khả năng kiểm thử.

Test cases: Đây là một tài liệu có chứa các bước phải được thực hiện, kết quả mong muốn; nó đã được lên kế hoạch trước đó

Test Script: được viết bằng ngôn ngữ lập trình và là một chương trình ngắn được sử dụng để kiểm tra một phần chức năng của hệ thống phần mềm. Nói cách khác, đó là một tập hợp các bước cần được thực hiện thủ công.

# 18. Khiếm khuyết tiềm ẩn ( Latent defect) là gì?

Khiếm khuyết tiềm ẩn: là một khiếm khuyết đang tồn tại trong hệ thống, không gây ra bất kỳ lỗi nào vì các điều kiện cần thiết chưa bao giờ được đáp ứng

# 19. Hai tham số hữu ích để biết chất lượng thực hiện kiểm thử là gì?

Để biết chất lượng thực hiện kiểm thử, chúng ta có thể sử dụng hai tham số

* Defect reject ratio (Khiếm khuyết tỷ lệ từ chối)
* Defect leakage ratio (Khiếm khuyết tỷ lệ rò rỉ)

![](https://images.viblo.asia/bfa606b9-6362-4ead-9edc-b2df875f9336.png)
# 20. Chức năng của công cụ kiểm thử phần mềm "phantom" là gì ?

Phantom là một phần mềm miễn phí và được sử dụng cho ngôn ngữ kịch bản tự động - GUI của Windows. Nó cho phép chúng ta kiểm soát các cửa sổ và chức năng tự động. Nó có thể mô phỏng bất kỳ sự kết hợp nào của các tổ hợp phím và nhấp chuột cũng như menu, danh sách và nhiều hơn nữa.

# 21. Sản phẩm của kiểm thử (Test Deliverables) là gì?

Test Deliverables là một bộ tài liệu, công cụ và các thành phần khác phải được phát triển và duy trì để hỗ trợ kiểm thử.

Có các phân bố kiểm thử khác nhau ở mỗi giai đoạn trong vòng đời phát triển phần mềm

* Trước khi kiểm thử
* Trong quá trình kiểm thử
* Sau khi kiểm thử

# 22. Mutation testing là gì?

Mutation testing là một kỹ thuật để xác định xem một tập hợp dữ liệu kiểm thử hoặc trường hợp kiểm thử có hữu ích hay không bằng cách cố ý đưa ra các thay đổi mã khác nhau (lỗi) và kiểm tra lại dữ liệu / kiểm tra ban đầu để xác định xem có lỗi không.  Mutation testing dùng để kiểm tra hiệu năng và độ chính xác của chương trình test.

# 23. Những điều bạn nên lưu ý trước khi chọn công cụ kiểm thử tự động cho AUT là gì?

* Tính khả thi kỹ thuật
* Mức độ phức tạp
* Ứng dụng có ổn định không
* Dữ liệu kiểm thử
* Kích thước ứng dụng
* Khả năng sử dụng lại các tập lệnh tự động
* Môi trường có thể áp dụng 

# 24. Bạn sẽ tiến hành Phân tích rủi ro như thế nào?

Để phân tích rủi ro, các bước sau đây cần được thực hiện

* Tìm trọng tâm của rủi ro
* Lập thông tin về rủi ro
* Thay đổi thuộc tính rủi ro
* Triển khai các tài nguyên của rủi ro đó
* Lập cơ sở dữ liệu về rủi ro

#  25. Có các loại gỡ lỗi nào?

* Brute force debugging
* Quay lui
* Loại bỏ nguyên nhân
* Phân nhỏ chương trình
* Phân tích cây bị lỗi

# 26.  Fault masking explain là gì? 

Khi đang có sự hiện diện của một khiếm khuyết ẩn. Vào thời điểm đó, sự hiện diện của một khiếm khuyết khác trong hệ thống được gọi là Fault masking explain.


# 27. Test Plan là gì? Thông tin cần được đề cập trong Test Plan là gì?

Test Plan có thể được định nghĩa là một tài liệu mô tả phạm vi, cách tiếp cận, tài nguyên và lịch trình của các hoạt động kiểm thử.

Một Test Plan sẽ bao gồm:

* Chiến lược kiểm thử (Test Objective)
* Mục tiêu kiểm thử (Test Strategy)
*  Tiêu chuẩn dừng test (Exit/Suspension Criteria)
* Hoạch định nguồn lực (Resource Planning)
* Sản phẩm kiểm thử (Test Deliverables)

# 28. Làm thế nào bạn có thể loại bỏ rủi ro trong dự án?

Một số bước đơn giản nhưng rất quan trọng có thể làm giảm rủi ro trong dự án của bạn.

* Điều tra các tài liệu đặc tả kỹ thuật
* Có các cuộc thảo luận về dự án với tất cả các bên bao gồm cả nhà phát triển
* Đóng vai là một người dùng thực sự sử dụng một lượt trang web

# 29. Rủi ro phổ biến dẫn đến thất bại của dự án là gì?

Rủi ro phổ biến dẫn đến thất bại của dự án là: 

* Không có đủ nguồn nhân lực
* Môi trường kiểm thử có thể không được thiết lập đúng
* Ngân sách hạn chế
* Giới hạn thời gian
# 30. Trên cơ sở nào bạn có thể  ước tính cho dự án của bạn?

Để ước tính dự án, bạn phải xem xét các điểm sau

* Chia toàn bộ dự án thành các task nhỏ nhất
* Phân bổ từng nhiệm vụ cho các thành viên trong nhóm
* Ước tính nỗ lực cần thiết để hoàn thành mỗi nhiệm vụ
* Xác thực dự toán
# 31. Cách bạn phân chia công việc (Task) cho các thành viên (Member) trong nhóm là gì?


| Task | Member  |
| -------- | -------- | 
| Phân tích đặc tả yêu cầu phần mềm    | Tất cả các thành viên    |
| Tạo đặc tả phần mềm |Kiểm thử viên / Phân tích kiểm thử viên (Test Analyst) | 
| Xây dựng môi trường kiểm thử | Quản trị viên  |
| Thực hiện kiểm thử | Kiểm thử viên , quản trị viên |
| Báo cáo lỗi | Kiểm thử viên  |


# 32. Loại kiểm thử là gì và các loại kiểm thử thường được sử dụng là gì?

Để có kết quả kiểm thử dự kiến, một quy trình chuẩn được tuân theo hoạt động đó gọi là Loại thử nghiệm.

Các loại thử nghiệm thường được sử dụng là

* Kiểm thử đơn vị: Kiểm tra mã nhỏ nhất của ứng dụng
* Kiểm thử API: Kiểm tra API được tạo cho ứng dụng
* Kiểm thử tích hợp: Các mô-đun phần mềm riêng lẻ được kết hợp và kiểm tra
* Kiểm thử hệ thống: Kiểm tra toàn bộ hệ thống
* Cài đặt / UnInstall tests: Kiểm tra được thực hiện từ quan điểm của khách hàng .
* Kiểm thử Agile: Kiểm tra thông qua kỹ thuật Agile

# 33. Trong khi giám sát dự án, tất cả những điều bạn phải xem xét là gì?

Những điều phải được xem xét là

* Dự án của bạn có đúng tiến độ không
* Bạn có quá ngân sách không
* Bạn đang làm việc hướng tới cùng một mục tiêu 
* Bạn có đủ tài nguyên không
* Có bất kỳ dấu hiệu cảnh báo về vấn đề sắp xảy ra
* Có áp lực nào từ ban quản lý để hoàn thành dự án sớm hơn không

# 34. Những lỗi phổ biến điều mà tạo ra vấn đề là gì?

* Kết hợp các nguồn lực với các dự án sai
* Quản lý kiểm tra thiếu kỹ năng
* Không nghe lời khuyên từ người khác
* Lập kế hoạch kém
* Đánh giá thấp
* Bỏ qua những vấn đề nhỏ
* Không theo quy trình

# 35. Báo cáo kiểm thử điển hình chứa những gì? Lợi ích của báo cáo kiểm thử là gì?

Một báo cáo kiểm thử chứa những điều sau đây:

* Thông tin dự án
* Mục tiêu kiểm thử
* Tóm tắt kiểm thử
* Khiếm khuyết

Lợi ích của báo cáo thử nghiệm là:

* Báo cáo hiện trạng của dự án và chất lượng sản phẩm
* Nếu được yêu cầu, các bên liên quan và khách hàng có thể có hành động khắc phục
* Tài liệu cuối cùng giúp quyết định xem sản phẩm đã sẵn sàng để phát hành chưa

# 36. Đánh giá quản lý kiểm tra là gì và tại sao nó quan trọng?

Đánh giá quản lý cũng được gọi là Đảm bảo chất lượng phần mềm hoặc SQA. SQA tập trung nhiều vào quy trình phần mềm hơn là sản phẩm. Nó là một tập hợp các hoạt động được thiết kế để đảm bảo rằng người quản lý dự án tuân theo quy trình chuẩn. SQA giúp người quản lý kiểm tra dự án theo các tiêu chuẩn đã đặt.

# 37. Thực tiễn tốt nhất để đảm bảo chất lượng phần mềm là gì?

Thực tiễn tốt nhất để triển khai SQA hiệu quả là

* Cải tiến liên tục
* Tài liệu
* Công cụ sử dụng
* Số liệu
* Trách nhiệm của các thành viên trong nhóm
* Kiểm thử viên giàu kinh nghiệm

# 38. Khi nào RTM (Ma trận truy xuất yêu cầu ) được chuẩn bị?

RTM được chuẩn bị trước khi thiết kế test case. Yêu cầu phải được truy xuất nguyên từ các hoạt động đánh giá.

# 39. Sự khác biệt giữa Ma trận kiểm thử và Ma trận truy xuất là gì?

Ma trận kiểm thử: Ma trận kiểm thử được sử dụng để nắm bắt chất lượng thực tế, nỗ lực, kế hoạch, tài nguyên và thời gian cần thiết của tất cả các giai đoạn thử nghiệm phần mềm

Ma trận truy xuất: Ánh xạ giữa các trường hợp kiểm thử và yêu cầu của khách hàng được gọi là Ma trận truy xuất nguồn gốc.

# 40. Trong kiểm thử thủ công, stubs và drivers là gì?

Cả stubs và drivers  đều là một phần của kiểm thử gia tăng. Trong kiểm thử gia tăng, có hai cách tiếp cận là tiếp cận từ dưới lên và từ trên xuống. Drivers được sử dụng trong kiểm thử từ dưới lên, còn stubs được sử dụng cho cách tiếp cận từ trên xuống. Để kiểm tra mô-đun chính, stubs được sử dụng, đó là một đoạn mã giả hoặc chương trình.

# Tài liệu tham khảo 

https://www.guru99.com/software-testing-interview-questions.html