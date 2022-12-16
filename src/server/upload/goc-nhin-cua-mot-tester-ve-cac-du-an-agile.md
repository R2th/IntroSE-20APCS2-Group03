Agile là một triết lý tập trung vào việc liên tục cung cấp giá trị cho khách hàng từng bước và thường xuyên, dựa trên giao tiếp và phản hồi. Đây là hai thành phần quan trọng của một công thức Agile thành công và Tester đóng một vai trò quan trọng trong việc tạo ra các giá trị trong các dự án Agile trong suốt các công đoạn của vòng lặp (Iteration).

Agile không còn là một từ ngữ ồn ào hay là một vùng lặng lẽ không ai biết tới trong ngành phàn mềm nữa. Agile đã có những bước tiến nhảy vọt trong vài năm qua và đã trưởng thành một phương pháp được chấp nhận rộng rãi. Kiểm thử (testing) trong dự án Agile yêu cầu một sự dịch chuyển mô thức (paradigm shift) cho vai trò kiểm thử truyền thống. Nó đòi hỏi một sự thay đổi trong thái độ của kiểm thử viên (tester) từ một phương pháp tiếp cận theo định hướng ca kíp thành  một vai trò được tham gia sâu vào quy trình phát triển từ sơm. Cách tiếp cận Agile tập trung vào việc nhận được những điều đúng đắn  ngay từ đầu, làm giảm sự cần thiết phải có nhiều kiểm thử viên đảm bảo chất lượng (QA Tester) ở cuối quy trình để đạt được kết quả. Nhưng nói thì bao giờ cũng dễ hơn làm. Làm sao việc đó có thể xảy ra trong thực tế? Liệu nó thực sự xảy ra hay không?

![](https://images.viblo.asia/e639ad1f-1db8-44d8-9b30-91d5c029b7d0.jpeg)

Tôi đã vạch ra các hoạt động bảo đảm chất lượng như ba giai đoạn trong dự án Agile. Tuy nhiên, không có quy tắc vàng nào cả và nó có thể linh hoạt tùy chỉnh theo từng dự án. Vai trò kiểm thử viên QA trong Agile không bị giới hạn một tập hợp các quy trình được xác định trước, cũng như phương pháp luận  sẽ chỉ ra vai trò dựa trên tình huống cụ thể.

**Tiền-Phân-đoạn (Pre-iteration):** Đây là lần yêu cầu được phân tích chi tiết bởi BA (Business Analyst – chuyên viên phân tích nghiệp vụ) và các tiêu chí chấp nhận (acceptance criteria) được viết ra cho mỗi một story (user story). Do QA là những người sử dụng của các yêu cầu này ngay từ đầu, họ cần phải xác minh (verify) những yêu cầu đó từ sớm và thường xuyên.

**Xác minh Story (Xác minh Yêu cầu):** Kiểm thử Agile thiên về việc đưa ra phản hồi sớm, không chỉ bằng cách kiểm tra các yêu cầu, mà còn là phải làm việc đó từ sớm. Các QA tester cần phải xem xét các yêu cầu / story từ sớm để làm sáng rõ ý nghĩa và tính khả-kiểm (testability). Việc này sẽ đảm bảo các yêu cầu luôn rõ ràng và có thể kiểm thử được (Tôi tin rằng rõ ràng trong Agile là không có nhiều khác biệt  trong bối cảnh so với một dự án thác nước điển hình).

Yêu cầu cần đủ nhỏ để có ý nghĩa trong bối cảnh xác định
Tiêu chí chấp nhận (acceptance criteria - những story thường được sử dụng cho các tiêu chí chấp nhận) không nên bị trùng lặp, chồng chéo từ những story khác nhau
Tuy nhiên, việc này có thể là rất khó khăn và chỉ có thể đạt được với sự giao tiếp chặt chẽ giữa các bên Đội Phát triển / Nhà phân tích nghiệp vụ/ Đảm bảo chất lượng.

**Khả năng kiểm thử (Testable):** Các khía cạnh có thể kiểm thử được của story phải được xem xét chi tiết để có thể kiểm thử được story đó. Những yếu tố này thường là:

Tìm kiếm các yêu cầu ẩn
Môi trường
Dữ liệu kiểm thử (test data)
Sự phụ thuộc vào các yêu cầu khác
Việc có được các chi tiết này sớm sẽ giúp câu chuyện được ưu tiên đúng đắn hơn trong backlog, và cho phép việc thực hiện story đó suôn sẻ hơn trong phân đoạn (iteration).

QA tester cũng tham gia cuộc họp lập kế hoạch cho phân đoạn để cung cấp quan điểm kiểm thử để nhóm có thể đưa ra được ước lượng phát triển. Tham gia trong việc lập kế hoạch phân đoạn đóng vai  trò quan trọng, khi  một số các yêu cầu tiềm ẩn thường được phát lộ bởi các QA Tester.

**Các hoạt động của QA trong vòng lặp**

Môt khi QA tester đã thấy thoải mái với  các tiêu chí chấp nhận của một story nào đó, họ có thể giúp nhóm định nghĩa các kiểm thử chấp nhận (acceptance tests) cho Story đó. Kiểm thử chấp nhận là các yêu cầu về phương diện kiểm thử cần được thực hiện để hiểu được những gì được trông đợi ở các yêu cầu phần mềm. Các kiểm thử chấp nhận này được sinh ra tự động và dùng để lái quá trình phát triển. Các kiểm thử chấp nhận không nên phủ hết tất tần tật các tình huống (case scenarios) do điều này có thể tạo ra những sự ngưng trệ không cần thiết và có thể tạo ra quá nhiều bộ kiểm thử tự động (automated test) tương tự nhau không cần thiết.

Mọi người thường không hiểu rằng kiểm thử chấp nhận trong các dự án Agile là khác nhau so với các dự án truyền thống. Không giống như các dự án truyền thống, nơi kiểm thử chấp nhận xảy ra ở phần cuối của vòng đời phần mềm, trong dự án Agile kiểm thử chấp nhận được thực hiện trước khi phần mềm được chuyển giao. Kiểm thử chấp nhận cũng có xu hướng được tự động hóa để họ có thể chạy như là kiểm thử hồi quy (regression test).

Kiểm thử tự động là rất quan trọng đối với bất kỳ dự án Agile nào. Các bản build thường xuyên yêu cầu các chu kỳ phản hồi ngắn, do đó kiểm thử hồi quy phải nhanh chóng và chính xác. Cần lưu ý rằng kiểm thử  tự động trong Agile là rất khác so với kiểm thử tự động truyền thống. Trong các dự án Agile, kiểm thử tự động được thực hiện bởi tất cả các cấp độ - lập trình viên, kiểm thử viên bảo đảm chất lượng(QA tester) và các nhà phân tích nghiệp vụ (BA). Sự tham gia của tất cả mọi người làm gia tăng tính xác đáng của các bài kiểm thử  và thường giúp xác định đúng các bài kiểm thử. Tuy nhiên, điều này không có nghĩa là tất cả mọi người phải viết mã kiểm thử.

Có một điều luôn luôn gây tranh cãi là “ai là người phụ trách việc kiểm thử tự động trong dự án Agile”. Đối với tôi, đó là một trách nhiệm hơn là một vai trò. Theo kinh nghiệm của tôi, kiểm thử tự động đạt được hiệu quả cao nhất khi các nhà phát triển và QA tester làm việc cùng với nhau.

**Sử dụng tự động hóa có mục đích**

Tự động hóa trong Agile là vấn đề dễ tranh cãi. Nhiều người cố gắng để tự động hóa tất cả mọi thứ và mắc vào cái bẫy của việc có một chu kỳ phản hồi dài. Tự động hóa có nghĩa là để cung cấp thông tin phản hồi sớm về những mã nguồn được tạo ra, và điều quan trọng là phải xác định những gì cần động hoá và những gì thì không.

Tất cả các kiểm thử tự động đều khiến ta mất một ít chi phí. Chi phí của tự động hóa nên được so sánh với chi phí không thực hiện việc đó. Các câu hỏi được đặt ra là: điều gì sẽ xảy ra nếu một bài kiểm thử không được tự động hóa? Sẽ mất gì và chi phí nào là phải bỏ ra để sửa chữa những thứ xung quanh mã nguồn mà chúng ta đang mất độ phủ kiểm thử (coverage)? Câu trả lời có thể sẽ không dễ dàng như là khi chúng ta đi tìm giá trị của một bài kiểm thử. Nó thường là một quyết định theo ngữ cảnh tùy thuộc vào kích cỡ của dự án và số người tham gia. Nói cách khác, một chu kỳ phản hồi dài hơn đồng nghĩa với việc phải có  nhiều người đóng góp nhiều thời gian hơn mới có được phản hồi tức thì.

Một hoạt động bảo đảm chất lượng điển hình trong phân đoạn là việc liên tục đo lường chất lượng của phần mềm. QA tester tham gia vào việc bàn giao các story cho các nhà phát triển. Điều này giúp họ hiểu được những yêu cầu kiểm thử của story để họ có thể triển khai được kĩ thuật Phát triển Định-hướng-Kiểm-thử (Test-Driven Development - TDD). Ngoài ra, việc bàn giao các kiểm thử chấp nhận  và giúp cho các lập trình viên hiểu các khía cạnh khả kiểm (testability) của story để tránh được các lỗi (defect) phổ biến. Những hoạt động này đòi hỏi một mức độ cao của giao tiếp giữa các lập trình viên và các chuyên viên phân tích nghiệp vụ để làm rõ yêu cầu và đảm bảo sản phẩm được xây dựng đúng đắn ngay từ đầu.

QA tester có thể giúp giải quyết các vấn đề trước hết bằng cách tích cực tham gia vào quy trình tổng thể. Họ thậm chí có thể cặp với các nhà phát triển làm việc trên một story  hoặc các kiểm thử cho story để thể hiểu rõ hơn về các yêu cầu. Điều bắt buộc là một story khi được chuyển giao, nó phải được kiểm thử đúng cách, trong một môi trường thích hợp. Một khi các QA Tester hài lòng với những story yêu cầu, họ ký tắt vào phần công việc đó, rồi và đưa nó vào các tiến trình kiểm thử tiếp theo.

Một điều quan trọng khác là phải  suy nghĩ vượt ra ngoài các yêu cầu bằng văn bản và thử nghiệm với các kiểm thử thăm dò (exploratory testing) để thực hiện kịch bản ‘ngoài lề’ và thực hiện các kiểm thử tiêu cực để đảm bảo chắc chắn phần mềm được viết ra là chất lượng. Kiểm thử thăm dò không phải là thực thi tất cả các kịch bản kiểm thử được xác định trước, nó là nghệ thuật thăm dò phần mềm ngoài các trường hợp kiểm thử (test case) và đồng thời giữ tập trung xung quanh các yêu cầu cụ thể.

Tôi đã cố gắng để đề cập hầu hết các khía cạnh của những hoạt động cơ bản của một QA Tester trong một dự án Agile. Tuy nhiên, vai trò không giới hạn bởi các hoạt động này và QA Tester nên tích cực hơn trong việc thể hiện một vai trò cộng tác khi có thể.

**Bài viết được dịch theo "A Tester's Perspective on Agile project", Pankaj Nakhat**

http://www.logigear.com/magazine/agile/a-tester%E2%80%99s-perspective-on-agile-projects/