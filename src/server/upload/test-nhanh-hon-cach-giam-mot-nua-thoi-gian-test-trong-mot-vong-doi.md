Nguồn: https://www.stickyminds.com/article/test-faster-how-we-cut-our-test-cycle-time-half

# Tóm lược:

Chỉ trong vòng một năm, một team test đã giảm được hơn 50% trong một vòng đời test. Họ đã phân tích, lập kế hoạch và hiệu suất làm việc - đầu tiên họ nhìn vào cách sử dụng thời gian của họ, và sau đó họ đặt câu hỏi liệu họ có thể giảm thời gian ở bất kỳ khu vực nào trong đó hay không. Một khi mà họ biết nơi nào hiệu quả hơn, họ có thể bắt đầu giải quyết những tắc nghẽn. Đây cũng là cách bạn có thể làm.

“Không có cách nào!”

Đây là phản ứng từ một team khi được hỏi liệu các bạn có thể đẩy nhanh tiến độ test hệ thống trong vòng một tuần hay không? 

Trong một dự án, chúng tôi thường có chu kỳ delivery trong vòng chín tháng, trong đó có 3 tháng dành cho test hệ thống, sau khi hoàn thành milestone, và sử dụng full effort mỗi ngày trong ba tháng đó. Chúng tôi đã từng làm việc cả đêm, cả cuối tuần vào những tuần cuối cùng. Ở các cuộc họp nơi mà tôi khám phá cùng với team.

Vì vậy, chúng tôi đã thực hiện một chiến thuật khác. Chúng tôi đã dành thời gian để hỏi thời gian đi đâu. Chúng tôi đã bắt đầu liệt kê tất cả những điều mình cần làm như một checklist trong vòng 12 tuần và chúng tôi đã kết thúc với một phương trình giả mô hình thời gian:

Thời gian thử nghiệm hệ thống = RC * (TC / TV + B * BHT) / PC
RC = Kiểm tra lại chu kỳ hoặc số lần kiểm tra lại do thay đổi ứng dụng
TC = Số lượng các trường hợp thử nghiệm được thực hiện trong mỗi chu kỳ
TV = Vận tốc thử nghiệm, hoặc trung bình, có bao nhiêu trường hợp thử nghiệm đã thực hiện trong một đơn vị thời gian
B = Số lượng bug được tìm thấy và được fix trong giai đoạn test
BHT = Thời gian xử lý lỗi hoặc số lượng effort xử lý từng lỗi (chuẩn đoán, ghi lại tài liệu, xác mình sửa lỗi…)
PC = Khả năng của con người, hoặc số lượng người test cùng với năng suất của họ

Bây giờ chúng ta đã có mô hình này như một cách để thể hiện thời gian một cách đơn giản hơn, chúng ta có thể hỏi những câu hỏi hữu hình hơn:

- Chúng ta có thể làm gì để giảm số lượng chu kỳ phải test lại?
- Có cần phải thực hiện tất cả các trường hợp cần phải test không?
- Làm thế nào chúng ta có thể tăng tốc độ thử nghiệm?
- Làm thế nào chúng ta có thể giảm số lượng lỗi chúng ta phải xử lý trong giai đoạn test?
- Có hiệu quả trong việc xử lý các lỗi hay không?
- Có thể tìm thêm người trợ giúp trong việc test hay không? Và làm thế nào để làm việc hiệu quả hơn?

Dành thời gian để phân tích vấn đề lớn, vấn đề cảm thấy khó có thể thực hiện thành những câu hỏi dễ thực hiện hơn để giúp chúng ta thấy thực sự có sự khác biệt.

Chúng tôi đã khởi động lại các cuộc họp bằng cách chỉ hỏi một trong những câu hỏi này, sau đó khám phá các cách để cải thiện chỉ một biến đó. Cuối cùng, sau một năm cải tiến, chúng tôi đã có thể giảm thời gian thử nghiệm hệ thống xuống còn năm tuần. Khi chúng tôi bắt đầu nói về nó, chúng tôi đã không nghĩ rằng chúng tôi có thể mất một ngày trong chu kỳ thử nghiệm mười hai tuần; chúng tôi đã kết thúc việc cắt giảm thời gian hơn một nửa.

# Giảm lỗi trong kiểm tra hệ thống

Chúng tôi đã bắt đầu xử lý số lượng lỗi chúng tôi tìm thấy trong quá trình system test, vì chúng tôi đã tìm và sửa nhiều lỗi, vì vậy có một cơ hội tốt để cải thiện. Nhưng quan trọng hơn, việc giảm lỗi rất quan trọng đối với mục tiêu chính là cung cấp phần mềm có chất lượng cao.

Cho đến thời điểm này, chúng tôi đã không ghi lại nguyên nhân gốc của các lỗi được tìm thấy trong system test, vì vậy chúng tôi phải sử dụng một số phán đoán và hợp tác với nhóm phát triển. Chúng tôi đọc qua một mẫu các lỗi được tìm thấy trong chu kỳ kiểm tra trước đó và tìm kiếm bất cứ mẫu nào. Chúng tôi đã tìm thấy một số lỗi mã hóa đơn giản và một số rò rỉ bộ nhớ (đó là một ứng dụng C++).

Chúng tôi đã đầu tư một chút thời gian để đảm bảo chúng tôi đã tận dụng tối đa các đánh giá code của mình để giúp giảm số lượng code lỗi. Chúng tôi đã thực hiện training review code, theo dõi hoạt động review code, và báo cáo kết quả đánh giá mã cho nhóm. Chúng tôi cũng bắt đầu sử dụng một số công cụ được thiết kế để phát hiện rò rỉ bộ nhớ. Hai cải tiến này đã bắt đầu loại bỏ được effort cần thiết để xử lý các lỗi trong quá trình test hệ thống.

Cuối cùng chúng tôi đã bắt đầu ghi lại nguyên nhân gốc rễ của lỗi và phân tích thường xuyên để tìm các cơ hội khác để cải thiện.

# Cải thiện thời gian xử lý lỗi

Khi nhìn lại danh sách các lỗi, đội dev thường cảm thấy rất bối rối khi thấy rằng một nửa các lỗi được QA log lên đã được Close mà không sửa. Hai trong số các yếu tố đóng góp lớn nhất là các bạn develop không thể sao chép lỗi và lỗi đó là một bản sao chép đã tồn tại trên hệ thống.

Điều này đòi hỏi một thay đổi đơn giản: Chúng tôi đã đào tạo một team test để tìm kiếm hệ thống theo dõi lỗi trước khi tạo ra một lỗi mới. Nếu họ tìm thấy một lỗi tương tự, thì họ sẽ xem xét sửa đổi báo cáo lỗi ban đầu với dữ liệu được cập nhật hoặc tham khảo ý kiến của đội develop được gán cho lỗi đó.

Đối với các lỗi không thể nhân đôi, chúng tôi đã thử một thí nghiệm. Thay vì một người kiểm tra viết một lỗi và tiếp tục, người tester sẽ giữ một “bug huddle” để tái hiện lại lỗi đó cho đội development. Lỗi này thường xảy ra vào cuối ngày. Tester sau đó sẽ viết lại báo cáo lỗi sau khi thảo luận cùng với tester. Điều này làm cho bản fix lỗi sẽ nhanh hơn nhiều, như đội Development thường nói: “Ah, tôi đã nhìn thấy những gì đã xảy ra rồi”. Điều này làm giảm bất kỳ sự mơ hồ nào trong quá trình tái hiện lỗi.

Sau những cải tiến này, chúng tôi nhận thấy hơn 80% các lỗi được report đã thực sự được close mà không bị tái hiện lại hay bị lỗi ở các vùng khác.

# Tăng tốc độ test
Tăng phạm vi tự động test dường như là hướng rõ ràng để tăng tốc độ test và tự động hóa thực sự có ích. Nhưng cũng có những thứ khác mà chúng tôi tìm thấy sẽ cải thiện tốc độ.

Chúng tôi xây dựng các công cụ để giúp tự động điền kết quả test sau khi cài đặt, vì vậy tester đã cài bản dựng với dữ liệu kiểm tra cần thiết đã có, khi họ đến làm việc vào buổi sáng. 

Chúng tôi cũng đã tạo ra một danh sách lỗi được fix theo mong muốn của người dùng và nâng mức độ ưu tiên của các lỗi này. Các lỗi mong muốn nhất là những lỗi đã chặn quá trình test mà đã hoàn thành, vì vậy chúng tôi đã gắn mức độ ưu tiên khi log bug để develop fix theo nó giúp cho quá trình test của tester được thuận lợi khi mà có những bug làm pending lại nhiều số lượng testcase trong một chức năng nào đó. Điều này làm giảm thời gian chờ đợi của đội test.


# Giảm số lượng testcase

Từ ý tưởng giảm số lượng testcase đã gây tranh cãi cho chúng tôi khi bắt đầu nghĩ về nó. Nhưng nếu chúng tôi nghĩ đó là việc test dựa trên rủi ro, nơi chúng tôi đặt nhiều nhất effort cho quá trình test vào các vùng có rủi ro lớn nhất, thì chúng tôi đã bắt đầu đạt được tiến bộ.


Chúng tôi đã đánh giá mỗi bộ testcase theo hai chiều: xác suất các testcase đó sẽ tìm thấy bug hoặc fault và mức độ nghiêm trọng của hậu quả đối với khách hàng nếu có lỗi trong khu vực đó của sản phẩm. Độ ưu tiên được xếp hạng từ cao đến trung bình hoặc thấp và chúng tôi đã sử dụng biểu đồ để xác định phương pháp của mình:

![](https://images.viblo.asia/0f3841c2-b31c-42ee-a95b-d60254d52680.png)


Chúng tôi đã review và phân tích vấn đề này với nhóm development, yêu cầu họ cho các vùng mà họ cho là rủi ro nhất. Họ có thể đặt tên cho một số khu vực ngay lập tức và họ cũng đã thực hiện một số nghiên cứu trong nhật ký thay đổi cho những dòng code có sửa lỗi thường xuyên.

Chúng tôi đã review dữ liệu này với nhóm quản lý sản phẩm để đánh giá tác động của khách hàng đối với mức độ nghiêm trọng. Tương tự như vậy, họ có một số lo ngại ngay lập tức và cũng đã thực hiện phân tích tiếp theo dựa trên phân tích sử dụng.

Các bộ testcase có mức độ ưu tiên P1 là mức ưu tiên cao nhất trong phép thử nghiệm của chúng tôi. Chúng tôi đảm bảo kiểm tra những độ ưu tiên gắn P1 này sớm và thường là sớm trong chu kỳ và sau đó một lần nữa, đảm bảo không có hồi quy trong chu kỳ.

Các bộ testcase có độ ưu tiên thấp hơn chúng tôi gắn là P2, và đối với những bộ này, chúng tôi đã mất thêm một chút độ trễ trong thử nghiệm hồi quy cho đến cuối chu kỳ. Đối với các bộ testcase P3, chúng tôi đã kiểm tra chúng một cách chi tiết và cắt bớt các bộ testcase đó, sử dụng lấy mẫu và chỉ thực hiện chúng một lần trong test hệ thống.

# Tìm thêm người

Tôi đã lưu sự cải thiện này lần cuối bởi vì đó là điều đầu tiên mà nhóm yêu cầu: một đội lớn hơn. Tôi đã e ngại về việc yêu cầu một ngân sách lớn hơn lúc đầu; Nhưng, sau khi thực hiện một số cải tiến ở trên và cho thấy sự tiến bộ của họ, các nhà lãnh đạo của chúng tôi đã hỏi chúng tôi có thể làm gì khác.

Thực hiện những cải tiến mạnh mẽ cần có sự đầu tư đúng lúc trong team của bạn. Chúng tôi đã có thể yêu cầu nhiều người hơn và cho thấy những cải tiến cụ thể mà chúng tôi đang mong đợi với khoản đầu tư mới.

Chúng tôi đã kết thúc việc tìm kiếm một đối tác nước ngoài để giúp đỡ rất nhiều thử nghiệm hồi quy. Điều này đã cho nhóm hiện tại có thêm thời gian để cải thiện hơn nữa.

Trước khi tham gia với đối tác nước ngoài, chúng tôi đã nhận được một chút giúp đỡ bằng cách lôi kéo những người khác trong tổ chức giúp đỡ trong quá trình test. Các nhà quản lý sản phẩm, hỗ trợ khách hàng và các nhóm tài liệu kỹ thuật đã thực sự đầu tư vào việc giúp tạo ra một sản phẩm tốt hơn và họ tình nguyện dành thời gian để giúp cải tiến quá trình test.

Chúng tôi cũng đã thực hiện một số bài kiểm tra trên mạng, trong đó chúng tôi đã tập hợp cả nhóm trong một ngày để kiểm tra các khu vực khác nhau của sản phẩm. Đội develop và quản lý đã tham gia và mọi người đã thử nghiệm trong một ngày. Chúng tôi đã trao giải thưởng cho người tìm ra lỗi thú vị nhất và lỗi nghiêm trọng nhất. Các cuộc ùn tắc thử nghiệm rất vui và là một sự kiện xây dựng hoạt động của nhóm tốt.

# Kết luận
Cuối cùng, chúng tôi đã giảm thời gian test từ mười hai tuần xuống còn năm tuần. Đó không phải là dễ dàng hay đơn giản, nhưng một khi chúng ta tạo ra phương trình đó để biểu thị thời gian và bắt đầu có những xung đột ở mỗi biến, cuối cùng chúng ta đã giải quyết thành công các thách thức của mình.

Vì dự án này, tôi đã sử dụng kỹ thuật này nhiều lần để tăng tốc chu kỳ kiểm tra. Các đội thực sự thích quá trình chia nhỏ thời gian thành các biến số cụ thể và tìm cơ hội để cải thiện ngay lập tức.
Còn bạn, làm thế nào nhóm của bạn có thể kiểm tra nhanh hơn?