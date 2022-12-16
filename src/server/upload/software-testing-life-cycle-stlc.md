# 1. Vòng đời kiểm thử phần mềm là gì?
Vòng đời kiểm thử phần mềm (Software testing life cycle - STLC) là quy trình kiểm thử được thực hiện theo hệ thống và có kế hoạch rõ ràng. Trong quá trình kiểm thử, rất nhiều giai đoạn khác nhau được thực hiện một cách tuần tự. Mỗi giai đoạn đều có đầu vào và đầu ra khác nhau nhưng đều hướng tới mục tiêu cuối đảm bảo chất lượng sản phẩm. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về các giai đoạn cũng như hoạt động trong một vòng đời kiểm thử phần mềm.

 ![](https://images.viblo.asia/b368874f-6e08-4881-9182-a11571a17eb4.png)

Dưới đây là các giai đoạn điển hình trong kiểm thử phần mềm:
* Requirenment analysis - phân tích yêu cầu
* Test planning - lập kế hoạch kiểm thử
* Test case development - thiết kế kịch bản kiểm thử
* Test environment set up - thiết lập môi trường kiểm thử
* Test execution - Thực hiện kiểm thử
* Test cycle closure - Đóng chu trình kiểm thử

# 2. Các giai đoạn trong vòng đời kiểm thử phần mềm
## 2.1 Requirenment analysis - phân tích yêu cầu
Phân tích yêu cầu là giai đoạn đầu tiên trong vòng đời kiểm thử phần mềm. Ở giai đoạn này, QA team cần theo sát, nghiên cứu và phân tích từng yêu cầu trong các tài liệu đặc tả thiết kế dự án. Các yêu cầu được miêu tả trong tài liệu có thể là yêu cầu về chức năng hoặc phi chức năng như kiểm thử hiệu xuất, bảo mật...Trong quá trình nghiên cứu và phân tích, nếu có câu hỏi phát sinh, QA team sẽ đưa ra câu hỏi với các bên liên quan như Chuyên viên phân tích kinh doanh, Kiến trúc hệ thống, Khách hàng, Trưởng phòng kỹ thuật / Trưởng nhóm… để hiểu rõ hơn về yêu cầu chi tiết của phần mềm. Câu hỏi được lưu trữ vào một file Q&A (question and answer) và thường được đưa ra dưới dạng Yes/No question hoặc các câu hỏi lựa chọn đáp án nhằm giúp khách hàng tiết kiệm thời gian trả lời câu hỏi. Giai đoạn phân tích yêu cầu rất quan trọng trong quá trình kiểm thử bởi nó giúp ngăn chặn các bug sảy ra trong giai đoạn sớm, tiết kiệm thời gian và ngân sách.

Đầu vào của giai đoạn phân tích yêu cầu bao gồm tài liệu như tài liệu đặc tả yêu cầu, tài liệu thiết kế hệ thống, tài liệu về các tiêu chí chấp nhận sản phẩm...Đầu ra của giai đoạn phân tích yêu cầu bao gồm tài liệu chứa các câu hỏi và câu trả lời liên quan, tài liệu báo cáo tính khả thi của việc kiểm thử phần mềm.

## 2.2 Test planning - lập kế hoạch kiểm thử
Bước thứ 2 trong vòng đời kiểm thử phần mềm là lập kế hoạch kiểm thử. Thông thường, test manager hoặc test leader sẽ là người tạo test plan. Mục tiêu của bước lập kế hoạch kiểm thử là xác định được các hoạt động, nguồn lực, phạm vi, tiêu chí chấp nhận của sản phẩm và các mốc thời gian bàn giao. Ngoài ra, phân tích chiến lược kiểm thử, các rủi ro có thể gặp phải cũng là những hoạt động quan trọng trong giai đoạn này.

Đầu vào của giai đoạn lập kế hoạch kiểm thử là các tài liệu đặc tả đã được cập nhật, tài liệu báo cáo tính khả thi của việc kiểm thử. Đầu ra của giai đoạn này gồm các tài liệu như test plan, test estimation, test schedule.

## 2.3 Test case development - thiết kế kịch bản kiểm thử
Giai đoạn thiết kế kịch bản kiểm thử diễn ra sau khi đã hoàn thành việc lập kế hoạch. Trong giai đoạn này, người kiểm thử viên bắt tay vào việc viết ra các test case (trường hợp kiểm thử, các kịch bản kiểm thử) chi tiết dựa vào việc vận dụng các test design technique (kỹ thuật thiết kế kịch bản kiểm thử). Test case được chia nhỏ ra theo các điều kiện miêu tả trong tài liệu đặc tả dự án nhằm mục đích bao phủ được tất cả các trường hợp kiểm thử có thể sảy ra. Cùng với việc tạo ra các test case chi tiết, đội kiểm thử cũng cần chuẩn bị trước các dữ liệu kiểm thử cho các trường hợp cần thiết. Sau khi hoàn thành, test case cần được kiểm tra lại bởi thành viên khác trong đội kiểm thử hoặc test leader nhằm tránh những sai sót trong tập hợp test case.

Đầu vào của giai đoạn này bao gồm tài liệu đặc tả dự án đã được cập nhật, các tài liệu đánh giá tính khả thi của việc kiểm thử tự động (nếu có). Đầu ra của giai đoạn này bao gồm test design (bản thiết kế kịch bản test), test case (kịch bản test chi tiết), test automation script (kịch bản test tự động).

## 2.4 Test environment set up - thiết lập môi trường kiểm thử
Thiết lập môi trường kiểm thử là một phần quan trọng của vòng đời phát triển phần mềm. Về cơ bản, môi trường kiểm thử được quyết định dựa trên những điều kiện kiểm thử phần mềm. (Ví dụ server, client, network...). Đây là hoạt động độc lập và có thể được bắt đầu song song với giai đoạn thiết kế kịch bản kiểm thử. Kiểm thử viên cần chuẩn bị một vài test case để kiểm tra xem môi trường cài đặt đã sẵn sàng cho việc kiểm thử hay chưa.

Đầu vào của giai đoạn này là test plan, smoke test case, test data. Đầu ra của giai đoạn này là môi trường đã được cài đặt và sẵn sàng cho việc kiểm thử, các kết quả của smoke test case.

## 2.5 Test execution - Thực hiện kiểm thử
Giai đoạn thực hiện kiểm thử diễn ra sau khi đã hoàn thành giai đoạn viết test case và môi trường kiểm thử đã sẵn sàng. Trong giai đoạn này, người kiểm thử viên thực hiện kiểm thử phần mềm, đánh giá kết quả test, báo cáo các lỗi của phần mềm. Sau khi lập trình viên sửa lỗi xong, kiểm thử viên thực hiện test lại các trường hợp lỗi và theo dõi trạng thái của lỗi đến khi được sửa thành công.

Đầu vào của giai đoạn này là tài liệu test plan, test case, test data. Đầu ra của giai đoạn này là danh sách lỗi, báo cáo thực hiện các trường hợp kiểm thử.

## 2.6 Test cycle closure - Đóng chu trình kiểm thử
Đây là giai đoạn cuối cùng trong vòng đời kiểm thử phần mềm. Ở giai đoạn này, đội kiểm thử viên họp bàn nhằm thực hiện tổng kết, báo cáo kết quả và đánh giá các tiêu chí hoàn thành như phạm vi kiểm tra, chất lượng, chi phí, thời gian, mục tiêu kinh doanh quan trọng. Ngoài ra, test cycle closure cũng bao gồm hoạt động thảo luận tất cả những điểm tốt, điểm chưa tốt và rút ra bài học kinh nghiệm cho những dự án sau, giúp cải thiện quy trình kiểm thử. Cùng với đó, kịch bản kiểm thử và lỗi sẽ được phân loại và đánh giá mức độ nghiêm trọng. Sau khi hoàn thành những hoạt động trên, báo cáo đóng quy trình kiểm thử và các số liệu kiểm thử sẽ được chuẩn bị dựa trên các thông số trên.

### Tài liệu tham khảo
* https://www.softwaretestingclass.com/software-testing-life-cycle-stlc/
* https://www.softwaretestinghelp.com/what-is-software-testing-life-cycle-stlc/