Bài viết được tham khảo từ nguồn:
https://www.stickyminds.com/article/5-ways-optimize-tests-continuous-integration

**Tóm lược:
Nhiều nhóm có các bộ test suites tự động không được bao gồm trong chương trình tích hợp liên tục. Có thể các bộ test mất quá nhiều thời gian để thực thi, hoặc chúng không đủ tin cậy để đưa ra kết quả chính xác. Dưới đây là cách đánh giá các bộ thử nghiệm của bạn về mặt giá trị gia tăng và thời gian thực hiện, cùng với năm chiến lược đã được chứng minh để tối ưu hóa các bộ sản phẩm đó cho CI.**

"Kiểm tra sớm, kiểm tra thường xuyên." Bạn hãy ghi nhớ lấy điều này vì nó thuộc 7 nguyên tắc trong testing. Nếu các trong quá trình test bạn tìm thấy một vấn đề ngay sau khi vấn đề đó được implement, nó sẽ dễ dàng để sửa chữa hơn. Đây là một trong những nguyên tắc làm cho việc tích hợp liên tục là một chiến lược rất mạnh mẽ.

Có các nhóm có nhiều thử nghiệm tự động nhưng không sử dụng các thử nghiệm đó như một phần của chương trình tích hợp liên tục. Thường có nhiều lý do tại sao nhóm nghiên cứu nghĩ rằng nó không thể sử dụng các bộ testcase này với sự tích hợp liên tục. Có thể quá trình test đã mất quá nhiều thời gian để thực thi, hoặc chúng không đủ tin cậy để cung cấp kết quả chính xác và sẽ đưa con người đến giải thích kết quả.

Khi đánh giá những tập hợp testcase này, hãy bắt đầu với một bài tập đơn giản. Đầu tiên, vẽ hai trục trên bảng trắng. Trục dọc hiển thị giá trị của các phép thử và trục hoành cho biết thời gian cần để thực thi bộ test suite đó.

Sau đó tôi viết tên của mỗi bộ testcase trên một lưu ý và đặt chúng vào vị trí thích hợp trên bảng đó. Biểu đồ dưới đây cho thấy một ví dụ, cho biết mỗi bộ testcase đo lường như thế nào.

![](https://images.viblo.asia/8596908e-61e9-4e8d-9cb9-aa6646ee7778.png)

Khi chúng ta nói về giá trị của bộ testcase đó, hãy dựa trên ý kiến chủ quan của nhóm, vì vậy hãy giữ cho các lựa chọn khá đơn giản: Không có Giá trị, Giá trị vừa phải, Giá trị cao và Giá trị rất cao. Hãy dựa trên ý kiến này về độ tin cậy của bộ testcase, hoặc khả năng trong quá trình test để cung cấp kết quả chính xác mỗi khi chúng được thực thi và mức độ tin cậy của quá trình test cho nhóm về chất lượng của hệ thống.

Ví dụ, một số bộ testcase là cần phải có khi đưa ra quyết định, nhưng kết quả có một chút không ổn định và đôi khi chúng không có lý do rõ ràng, một người phải thực hiện lại các kiểm tra không thành công đó bằng cách thủ công. Chúng ta vẫn có thể gọi bộ testcase này có giá trị cao, nhưng nếu nó chạy chính xác mọi lúc, chúng ta sẽ gọi nó là Giá trị rất cao.

Ở phía bên kia của đồng xu, đôi khi có một bộ testcase được thực thi vì nó là một phần của checklist, nhưng không ai thực sự biết kết quả có ý nghĩa gì. Có lẽ tác giả gốc đã rời khỏi nhóm và không ai có quyền sở hữu bộ testcase đó. Hãy đặt bộ testcase đó trong danh mục Không có giá trị.

Trục ngang dễ xác định hơn: Chỉ đơn giản là số phút cần thực hiện bộ đó.

Bây giờ bạn đã đánh giá từng bộ test suite, đã đến lúc phải suy nghĩ về việc cải thiện các suite của bạn bằng cách làm cho chúng trở nên có giá trị hơn (di chuyển trong biểu đồ) hoặc bằng cách giúp chúng thực thi nhanh hơn (di chuyển sang trái).

Để tích hợp liên tục, hãy hướng mục tiêu các bộ test thành bốn loại:

### 1. Kiểm tra với giá trị rất cao thực hiện trong mười phút hoặc ít hơn

 Các thử nghiệm này có thể chạy với mọi bản build. Chúng được sử dụng để chấp nhận bản buid để thử nghiệm thêm; nhóm nghiên cứu nên xem xét việc xây dựng không thành công cho đến khi các thử nghiệm này pass. Đội dev sẽ không muốn chờ đợi hơn mười phút để có được kết quả build.
 
### 2. Các thử nghiệm có Giá trị cao hoặc tốt hơn thực hiện trong một giờ trở xuống
Bộ test này có thể chạy liên tục. Ví dụ: bạn có thể định cấu hình các testcase này để thực thi mỗi giờ và bắt đầu lại ngay khi chúng hoàn tất. Nếu chưa có bản dựng mới, bạn có thể đợi cho đến khi bản dựng tiếp theo hoàn tất.

### 3. Các thử nghiệm có Giá trị cao hoặc tốt hơn mất hơn một giờ để thực thi
Bộ testcase này có thể chạy hàng ngày - hoặc thường là hàng đêm để các kết quả có sẵn khi ngày làm việc bắt đầu cho nhóm của bạn.

### 4. Kiểm tra với giá trị vừa phải
Bộ test này có thể chạy một lần mỗi tuần hoặc một lần cho mỗi chu kỳ phát hành.
Lưu ý rằng không bao gồm các bài test Không có giá trị. Những điều này cần được cải thiện để tăng thêm giá trị hoặc chỉ bị loại bỏ khỏi quá trình test của bạn. Việc giữ các bộ test không thêm giá trị sẽ không có ý nghĩa.

Hãy chọn ranh giới thời gian là mười phút và một giờ dựa trên đầu vào từ các nhóm dev. Họ muốn nhận phản hồi nhanh. Bạn có thể tưởng tượng đội dev đang chờ kết quả xây dựng hoàn tất thành công trước khi đi ăn trưa. Thời hạn của bạn có thể thay đổi dựa trên thực tế của bạn; đây chỉ là một khuôn khổ để hiển thị quá trình suy nghĩ đằng sau việc chọn các thử nghiệm chạy với bản dựng so với hàng giờ.

Một lợi ích rất lớn cho việc thực hiện bộ test này thường xuyên là bạn có thể có rất ít thay đổi mã giữa chạy thử thành công và chạy thử nghiệm không thành công, làm cho nó dễ dàng hơn để cô lập sự thay đổi đã làm cho thử nghiệm thất bại.

Có một số chiến lược hữu ích cho việc tối ưu hóa các thử nghiệm hiện có cho các bộ tích hợp liên tục. Dưới đây là năm cách đã được chứng minh.

# 1. Tạo các bộ test suites nhỏ nhưng có giá trị

Chọn bộ test là rất quan trọng nhất và kéo chúng vào một bộ nhỏ hơn chạy nhanh hơn. Đây thường là bọ test rất thô, nhưng chúng cần thiết để đủ điều kiện cho hệ thống hoặc ứng dụng của bạn để có thể test thêm. Nếu các thử nghiệm này faild, sẽ không có ý nghĩa để tiếp tục.

Một điểm khởi đầu tốt là tạo một bộ test suite mới và thực hiện thao tác quan trọng nhất trên thực thể đó. Ví dụ: nếu đó là ứng dụng ghi chú, thử nghiệm sẽ là tạo ghi chú, thêm văn bản, đóng ứng dụng, sau đó mở lại và xác minh rằng văn bản đã được lưu. Nếu ứng dụng ghi chú của bạn không thể lưu ghi chú, không có nhiều việc sử dụng trong việc tiếp tục các thử nghiệm khác nó không có ý nghĩa để tiếp tục.

Gọi những bộ test acceptance tests hoặc bulid các bài test xác minh. Nếu bạn đã có những bộ này, thật tuyệt vời; chỉ cần đảm bảo chúng thực thi nhanh chóng.

# 2. Refactor thiết lập kiểm tra

Quá trình test thường có một thiết lập, sau đó thực hiện xác minh. Đối với ví dụ ghi chú, để xác minh rằng ứng dụng mở ra với văn bản trước đó, trước tiên bạn phải thiết lập thử nghiệm với văn bản. Kiểm tra cách kiểm tra của bạn đang thực hiện thiết lập thử nghiệm và xem liệu có cách nào tốt hơn không.

Ví dụ, một nhóm đã có một bộ kiểm thử dựa trên giao diện người dùng mất nhiều thời gian để thực thi và có nhiều lỗi sai do các vấn đề thời gian và các chỉnh sửa giao diện người dùng nhỏ. Chúng tôi đã tái cấu trúc bộ test đó để thực hiện thiết lập thử nghiệm thông qua các lệnh API và thực hiện xác minh thông qua giao diện người dùng. Bộ ttestcase này được cập nhật có cùng phạm vi chức năng, nhưng nó thực hiện nhanh hơn 70% và có khoảng một nửa số lỗi sai do các thay đổi giao diện người dùng gây ra.

# 3. Hãy thông minh với thời gian chờ đợi của bạn

Chúng tôi đã làm tất cả: thử nghiệm không ổn định vì không có phản hồi kịp thời hoặc tài nguyên vẫn đang tải, vì vậy chúng tôi đưa ra câu lệnh về "sleep". Chúng tôi dự định là giải pháp tạm thời, nhưng đó là một năm trước đây.

Hãy tìm những câu lệnh ngủ đáng sợ đó và xem liệu bạn có thể thay thế chúng bằng câu lệnh chờ thông minh hơn để hoàn thành khi sự kiện xảy ra, thay vì một khoảng thời gian đã định.

# 4. Kiểm tra kích hoạt tự động

Bạn có thể có một số bộ testcase thường được khởi xướng bởi một người trong giai đoạn thử nghiệm của một dự án. Thông thường, nó chỉ mất một kịch bản shell nhỏ để có thể bao gồm các thử nghiệm này trong bộ tích hợp liên tục.

Kiểm tra bảo mật và hiệu suất là 2 ví dụ về các loại kiểm tra có thể được thực hiện bởi một chuyên gia không thuộc nhóm thử nghiệm tiêu chuẩn, vì vậy các thử nghiệm đó có thể không được định cấu hình để thực thi tự động. Lợi ích khác của việc chạy các kiểm tra này thường xuyên là các vấn đề được tìm thấy thường khó sửa chữa, do đó, nếu vấn đề được xác định sớm hơn, nhóm có nhiều thời gian hơn để fix nó. Các xét nghiệm này thường được phân loại là rất có giá trị, nhưng chúng mất hơn một giờ để thực thi, vì vậy chúng thường được thực hiện hàng ngày.

# 5. Chạy thử nghiệm song song

Các máy ảo và các dịch vụ điện toán đám mây kết hợp với các công cụ giúp tự động thiết lập môi trường và triển khai mã của bạn khiến cho việc chạy thử nghiệm song song trở nên hợp lý hơn nhiều. Kiểm tra các bộ thử nghiệm mất một thời gian để thực thi và tìm kiếm cơ hội để chạy các thử nghiệm đó song song.

Mỗi một đội, chúng ta nên có một bộ thử nghiệm rất quan trọng có chứa năm trăm trường hợp thử nghiệm. Bộ testcase này mất vài giờ để chạy, vì vậy chúng ta đã không thực hiện nó thường xuyên. Đó là một bộ testcase rất rộng, chạm vào nhiều tính năng khác nhau. Chúng ta có thể chia bộ testcase đó thành khoảng một chục dãy khác nhau có thể chạy song song, vì vậy chúng ta có thể chạy thử nghiệm thường xuyên hơn (hàng đêm thay vì hàng tuần) và chúng ta có thể nói nhanh hơn bở vì nó được sắp xếp theo tính năng.

Cải thiện giá trị của các bộ testcase và thời gian thực hiện chúng có thể giúp bạn tối ưu hóa các bộ testcase hiện tại để phù hợp với chương trình tích hợp liên tục.