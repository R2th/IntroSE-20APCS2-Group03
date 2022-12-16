Lỗi phần mềm thuộc nhiều loại. Một lỗi là một lỗi không có vấn đề gì. Nhưng đôi khi, điều quan trọng là phải hiểu được bản chất, ý nghĩa của nó và nguyên nhân để xử lý nó tốt hơn.
Điều này giúp cho việc đối ứng nhanh hơn và quan trọng nhất, đối ứng thích hợp.
Trong bài viết này, chúng ta sẽ thảo luận về các loại lỗi phần mềm phổ biến và làm thế nào để xác định chúng trong quá trình kiểm thử với một số ví dụ và bài tập đơn giản.
Chúng ta hãy bắt đầu bằng việc xác định lỗi phần mềm và lỗi.

### Lỗi phần mềm và Bugs
Theo định nghĩa tại Wikipedia “Một lỗi là một sai lệch dựa vào độ chính xác hoặc tính đúng đắn” và ” Một lỗi phần mềm là một lỗi, lỗ hổng, thất bại, hoặc có lỗi trong một chương trình máy tính hoặc hệ thống đó là nguyên nhân nó tạo ra kết quả không chính xác hoặc không mong muốn, hoặc vận hành theo cách không được định hướng trước”.

Vì vậy, sau đây có thể đưa ra kết luận:

*  Lỗi là sự khác nhau của kết quả thực tế và kết quả mong đợi 

*  Lỗi là một loại của lỗi phần mềm

*  Lỗi có thể được giới thiệu như là kết quả của việc không hoàn thành hoặc  sai yêu cầu hoặc do vấn đề nhập dữ liệu của con người

Danh mục chung của lỗi phần mềm:

1) Lỗi chức năng

Chức năng là cách mà phần mềm vận hành có chủ đích. Phần mềm có một lỗi chức năng nếu một cái gì đó mà bạn mong muốn phần mềm làm là khó, rắc rối, khó hiểu, không khả thi.
Kiểm tra hình chụp này:

Dự kiện chức năng cho button “Cancel” là cửa sổ “Create new project” sẽ đóng và không có thay đổi gì được lưu (vd: không tạo ra project mới). Nếu button “Cancel” không thể nhấp vào được thì đó là lỗi chức năng.

2) Lỗi giao tiếp

Những lỗi xảy ra trong giao tiếp giữa phần mềm và người dùng cuối. Bất cứ điều gì mà người dùng cuối cần biết để sử dụng các phần mềm nên được làm sẵn có trên màn hình.
Vài ví dụ về lỗi giao tiếp – Không cung cấp bảng hướng dẫn trợ giúp/menu, các tính năng đó là một phần của việc phát hành nhưng không có tài liệu trong trình đơn trợ giúp, một button “Save” không nên xóa một tệp tin…

3) Lỗi thiếu lệnh

Điều này xảy ra xảy ra khi một lệnh dự kiến là thiếu. Xem ảnh chụp màn hình này:

Cửa sổ này cho phép người dùng tạo một project mới. Tuy nhiên, không có tùy chọn cho người sử dụng để thoát khỏi cửa sổ này mà không cần tạo project. Kể từ khi tùy chọn button “Cancel” không được cung cấp cho người sử dụng, đây là một lỗi thiếu lệnh.

4) Lỗi cú pháp

Lỗi cú pháp là những từ sai chính tả hay ngữ pháp câu không chính xác và rất rõ ràng trong khi kiểm thử thử giao diện phần mềm. Xin lưu ý rằng chúng tôi KHÔNG đề cập đến cú pháp lỗi trong code. Trình biên dịch sẽ cảnh báo các nhà phát triển về bất kỳ lỗi cú pháp xuất hiện trong code.
Lưu ý các từ sai chính tả “Cancel”:

Lưu ý ngữ pháp thông báo không chính xác:


5) Lỗi lỗi xử lý

Bất kỳ lỗi nào xảy ra khi người dùng đang tương tác với các phần mềm cần phải được xử lý một cách rõ ràng và có ý nghĩa. Nếu không, nó được gọi là một lỗi Xử lý lỗi.
Nhìn vào bức ảnh này. Thông báo lỗi đưa ra không chỉ ra cái thực sự gây ra lỗi là gì. Đó là do nó thiếu trường bắt buộc, lỗi đang lưu, lỗi tải trang hoặc lỗi hệ thống. Do đó, đây là một lỗi lỗi xử lý

Khi có thể, các bước tiếp theo sẽ được liệt kê cho người sử dụng để làm theo.
Nếu phần mềm có xác thực những trường bắt buộc cần phải được nhập trước khi lưu thông tin trên một form, các thông báo xác thực phải rõ ràng và chỉ ra những hành động cần thiết cho người dùng.
Đây là một ví dụ khác:


6) Lỗi tính toán

Những lỗi này xảy ra do các lý do sau đây:

Logic không tốt
Công thức tính toán không chính xác
Kiểu dữ liệu không phù hợp
Lỗi lập trình
Các vấn đề gọi chức năng...
Năm 1999, NASA bị mất tàu vũ trụ thăm dò khí hậu sao hỏa bởi vì một trong những nhà thầu phụ NASA sử dụng đã sử dụng đơn vị Anh hay cho hệ thống số liệu dự định, đó là nguyên nhân làm cho hệ thống đẩy của tàu vụ trụ làm việc không chính xác. Do lỗi này, tàu vũ trụ bị rơi gần như ngay lập tức khi nó đến sao Hỏa.

7) Lỗi dòng điều khiển
Việc kiểm soát flow của một phần mềm mô tả những gì nó sẽ làm gì tiếp theo và dựa trên điều kiện gì.
Ví dụ, hãy xem xét một hệ thống mà người dùng phải điền vào một mẫu đơn và có các tùy chọn để sử dụng được: Save, Save và Close, và Cancel. Nếu người dùng nhấp vào button “Save and Close”, thông tin người dùng trong form được lưu và đóng form lại. Nếu nhấp vào button “Save and Close” mà không đóng form, thì đó là lỗi dòng điều khiển.

Bước tiếp theo

Báo cáo một lỗi tức thì là cần thiết. Để có kết quả tốt nhất, báo cáo ngay lập tức.
Bao gồm các mô tả, độ ưu tiên, mức độ nghiêm trọng, các trigger và các bước để tái tạo kịch bản, ảnh chụp màn hình (nếu có) trong báo cáo lỗi.

### Kết luận
Xác định khuyết tật, phân loại, báo cáo và cuối cùng loại bỏ là tất cả các phần của các hoạt động kiểm soát chất lượng.
Nhưng, Phòng bệnh tốt hơn chữa bệnh. Điểm mấu chốt của đảm bảo chất lượng phần mềm là thiết lập và giám sát các quy trình kiểm tra ở từng giai đoạn của chu trình phát triển vòng đời phần mềm.
Mục đích là để phát hiện lỗi càng sớm càng tốt. Điều này là do các chi phí để tìm và sửa chữa sai sót tăng lên đáng kể so với tiến độ phát triển phần mềm. Do đó việc xác định lỗi sớm là điều cần thiết.
Sửa một lỗi là rẻ nhất trong giai đoạn phân tích yêu cầu, càng ngày càng đắt với từng giai đoạn và là đắt nhất trong giai đoạn bảo trì sau phát hành.
Là kỹ sư QA, chúng ta có thể có hoặc có thể không trực tiếp tham gia vào định nghĩa các yêu cầu . Chúng ta cũng có thể có một chút hoặc không kiểm soát trực tiếp vào chất lượng của các yêu cầu.
Do đó, điều quan trọng là chúng ta có thể xác định, tìm kiếm và báo cáo bất kỳ lỗi nào mà chúng ta đi qua trong giai đoạn thử nghiệm.