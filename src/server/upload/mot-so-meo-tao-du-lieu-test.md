- Ai cũng biết rằng việc test là một quá trình tạo và tiêu hao một lượng lớn dữ liệu. Dữ liệu sử dụng cho việc test miêu tả các điều kiện ban đầu cho quá trình test và là biểu hiện cho việc tester tham gia vào quá trình phát triển phần mềm. 

- Dữ liệu test là một phần tối quan trọng cho phần lớn việc Functional Testing. Vậy thực sự dữ liệu test là gì? Tại sao nó lại được dùng? Có thể bạn thắc mắc 'Tạo ra test case đã đủ khó khăn rồi, sao lại còn quan tâm đến những việc như là dữ liệu test'. Mục đích của bài hướng dẫn này là giới thiệu cho bạn thế nào là Dữ liệu test, nó rất quan trọng và cần đưa ra những bài tập để rút ra nhưng mẹo sao cho việc tạo ra dữ liệu test nhanh nhất. Hãy bắt đầu nhé!

# Dữ liệu test là gì? Tại sao nó lại quan trọng?

- Dữ liệu test thực tế là đầu vào cho chương trình phần mềm. Nó thể hiện cho dữ liệu mà ảnh hưởng hoặc bị ảnh hương bởi việc thực thi các module trong chương trình. Một số dữ liệu có thể sử dụng cho các trường hợp test thông thường, ví dụ như xem đầu vào đầu ra của các hàm như thế nào và so sánh kết quả. 
- Một số khác lại được dùng cho những trường hợp bất thường ví dụ như là kiểm thử khả năng chịu đựng của chương trình với những đầu vào bất thường chưa từng có. Việc tạo dữ liệu test một cách nghèo nàn có thể dẫn đến việc chúng ta không thể test được hết tất cả các trường hợp và dẫn đến việc chương trình không có độ bền, chất lượng cao.

# Việc tạo dữ liệu test là gì ? Tại sao dữ liệu test cần phải tạo trước khi thực thi việc test ?

- Phụ thuộc vào từng môi trường test mà bạn cần phải tạo dữ liệu test khác nhau đối với trường hợp bạn sở hữu ít dữ liệu test hoặc ít nhất phải xác định một tập dữ liệu test phù hợp nhất cho test case của bạn đối với trường hợp bạn có rất nhiều dữ liệu test được tạo ra.

- Thông thường dữ liệu test được tạo sẽ đồng bộ với test case sử dụng cho tập dữ liệu test được tạo đó.

- Dữ liệu test có thể được tạo ra từ những cách sau:
    - Tạo thủ công.
    - Sao chép dữ liệu từ môi trường production sang môi trường testing
    - Sao chép dữ liệu test từ hệ thống các khách hàng trước
    - Các công cụ tạo dữ liệu test tự động.

- Thông thường dữ liệu mẫu sẽ được tạo ra trước khi bạn bắt đầu tiến hành test bởi vì việc quản lý dữ liệu test rất khó. Bởi vì việc tạo dữ liệu test trong nhiều môi trường test sẽ khiến bạn trải qua rất nhiều bước và tuỳ chỉnh môi trường, nhưng điều mà sẽ rất tốn thời gian. Hơn nữa nếu tạo dữ liệu test được hoàn thành khi mà bạn đang ở trong giai đoạn test thì khả năng cao bạn sẽ phải lùi deadline lại đó.

- Dưới đây là một vài kiểu test với một vài gợi ý về các dữ liệu test mà bạn cần.

# Dữ liệu test cho White Box Testing

- Trong White Box Tesing, dữ liệu test được tạo ra trực tiếp từ nhưng dòng code được test. Dữ liệu test có thể được chọn dựa vào những điều sau:

    - Dữ liệu test có thể được tạo ra dựa vào tất cả những nhánh mà code của chương trình viết ra, và những nhánh này phải được test ít nhất một lần.
    - Tất cả các luồng của chương trình phải được test ít nhất một lần, dữ liệu test sẽ được sinh ra để bao trùm các luồng này.
    - Negative API Testing:
      + Dữ liệu test có thể chứa các kiểu tham số không phù hợp dùng để gọi nhiều hàm khác nhau trong chương trình.
      + Dữ liệu test có thể chứa một tổ hợp các tham số không phù hợp dùng để gọi nhiều hàm khác nhau trong chương trình.

# Dữ liệu test cho việc test hiệu suất

- Performance Testing là một kiểu test mà được thực thi để kiểm tra xem tốc độ xử lý của hệ thống dưới một khối lượng công việc cụ thể. Mục đích của kiểu test này không phải để tìm bug, mà là để loại bỏ đi việc tắc nghẽn chương trình. 
- Một phạm trù quan trọng của test hiệu suất đó là tập dữ liệu được sử dụng phải là dữ liệu thật và đang chạy trong hệ thống, những dữ liệu trong môi trường production. 
- Có câu hỏi được đặt ra: 'Test với dữ liệu thật là rất tốt nhưng tôi lấy nó ở đâu ra ?' Câu trả lời rất đơn giản đó là khách hàng. Họ có thể cung cấp những dữ liệu mà họ có sẵn hoặc nếu như họ không có thì họ sẽ giúp bạn tạo ra những dữ liệu đó. 
- Trong trường hợp bạn đang ở quá trình maintainance, bạn có thể sao chép dữ liệu đó từ môi trường production sang môi trường test của bạn. 

# Dữ liệu test cho việc test bảo mật
- Security Testing là một quá trình kiểm định xem một hệ thống thông tin có bảo vệ dữ liệu trước các mối đe doạ không lường trước. Tập dữ liễu cần phải được tạo dựa theo những phạm trù về bảo mật phần mềm như sau:

    - Confidentiality(Bảo mật): Tất cả các dữ liệu của khách hàng phải được bảo mật một cách nghiêm ngặt và không được chia sẻ ra bên ngoài. Với một ví dụ đơn giản, nếu một ứng dụng sử dụng SSL, bạn có thể tạo ra một tập dữ liệu để kiểm định xem việc mã hoá đã được làm đúng cách.
    - Integrity(Toàn vẹn): Xác định rằng dữ liệu cung cấp cho hệ thống phải là chính xác. Để tạo ra dữ liệu test phù hợp, bạn có thể dựa vào bản thiết kế, code, database hoặc cấu trúc thư mục của phần mềm.
    - Authentication (Xác thực): Đại diện cho quá trình tạo nên một danh tính cho người dùng. Dữ liệu test có thể tạo ra dựa vào sự kết hợp của tên tài khoản và mật khẩu và mục đích là để kiểm tra xem chỉ có người dùng đã được xác thực mới có thể sử dụng được hệ thống phần mềm.
    - Authorization (Uỷ quyền): Nói lên được những thứ mà người dùng cụ thể nào đó có thể làm trong hệ thống. Dữ liệu test có thể chứa tổ hợp của người dùng, chức vụ, và thao tác mà người dùng đó được cho phép để thực hiện trong một hoạt động cụ thể nào đó.

# Dữ liệu test cho Black Box Testing

- Trong Black Box Testing, tester không thể thấy được đoạn code mà họ test. Vậy thì test case có thể có dữ liệu test dựa vào các phạm vi như sau:

    - Không có dữ liệu: Kiểm tra hệ thống phản hồi khi không có dữ liệu đưa vào.
    - Dữ liệu hợp lệ: Kiểm tra hệ thống phản hồi khi có dữ liệu hợp lệ đưa vào.
    - Dữ liệu không hợp lệ: Kiểm tra hệ thống phản hồi khi có dữ liệu không hợp lệ đưa vào.
    - Định dạng dữ liệu không hợp lệ: Kiểm tra hệ thống phản hồi khi có dữ liệu có định dạng không hợp lệ đưa vào.
    - Tập dữ liệu có điều kiện ở cận biên: Dữ liệu test thoả mãn các điều kiện cận biên của giá trị.
    - Tập dữ liệu được phân vùng bằng nhau: Dữ liệu test thoả mãn tất cả các phân vùng.
    - Tập dữ liệu quyết đinh: Dữ liệu test thoả mãn quyết định chiến lược test.
    - Tập dữ liệu về thay đổi trạng thái: Dữ liệu test thoả mãn chiến lược thay đổi trạng thái.
    - Tập dữ liệu use-case: Dữ liệu test đồng bộ với use-case.

# Tạo dữ liệu test tự động

- Để tạo ra một tập dữ liệu, bạn có thể sử dụng một số công cụ để tạo dữ liệu test. Bên dưới là một số công cụ bạn có thể sử dụng.

- "GSApps" có thể sử dụng cho những dữ liệu thông minh trong hầu hết những database và các file text. Nó có thể cho phép người sử dụng:

    - Hoàn thành test ứng dụng bằng cách đưa vào database những dữ liệu có nghĩa.
    - Tạo ra dữ liệu mang tính công nghiệp có thể dùng cho việc trình diễn.
    - Bảo vệ dữ liệu bằng cách nhân bản những dữ liệu có sẵn và làm sao giá trị những dữ liệu đó.
    - Tăng tốc quá trình phát triển bằng việc đơn giản hoá công đoạn test và công đoạn làm bản mẫu.

- "DTM" cũng là một công cụ cho phép tùy chỉnh, tạo ra dữ liệu , các bảng cho mục đích test database.
- "Datatect" là một cụ tạo dữ liệu SQL tạo ra bởi Banner Software, tạo ra một tập các dữ liệu test thật bằng file ASCII hoặc trực tiếp tạo dữ liệu cho RDBMS trong đó là Oracle, Sybase, SQL Server và Informi.

- Nói tóm tắt lại, một tập dữ liệu test hoàn chỉnh và chính xác cho phép bạn tìm ra đúng lỗi sai của chức năng. Việc lựa chọn dữ liệu phải được đánh giá liên tục trong mỗi công đoạn phát triển phần mềm. 

# Tham Khảo
https://www.guru99.com/software-testing-test-data.html