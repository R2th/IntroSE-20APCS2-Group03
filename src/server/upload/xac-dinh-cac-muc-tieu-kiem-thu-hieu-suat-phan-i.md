# MỤC TIÊU
* Tìm hiểu cách xác định và nắm bắt các mục tiêu kiểm thử hiệu suất.
* Tìm hiểu cách nắm bắt hoặc ước tính các mục tiêu sử dụng tài nguyên và các ngưỡng.
* Tìm hiểu cách nắm bắt hoặc ước tính ngân sách hoặc phân bổ tài nguyên.
* Tìm hiểu cách xem xét và cập nhật các loại mục tiêu kiểm thử hiệu suất khác nhau và truyền đạt thông tin đã được cập nhật cho nhóm trong suốt quas trình dự án diễn ra ngay khi có thêm thông tin mới.

# TỔNG QUAN
Chìa khóa để xác định các mục tiêu của một quá trình kiểm thử hiệu xuất là phải xác định được các vấn đề thay đổi, các rủi ro ẩn giấu và các cơ hội để phát triển. Một cách để xác định và ghi lại các mục tiêu kiểm thử hiệu suất chỉ đơn giản là hỏi từng thành viên trong nhóm dự án về giá trị mà bạn có thể thêm hoặc các rủi ro bạn có thể giảm thiểu cho họ trong khi bạn đang tiến hành kiểm thử hiệu suất tại một thời điểm cụ thể trong dự án hoặc ngay sau khi hoàn thành một cột mốc cụ thể. Các mục tiêu này có thể bao gồm việc cung cấp dữ liệu về sử dụng tài nguyên dưới tải, tạo ra các tải cụ thể để hỗ trợ điều chỉnh máy chủ ứng dụng, hoặc cung cấp một báo cáo về số đối tượng được yêu cầu bởi mỗi trang Web.

Mặc dù điều đó là có giá trị nhất để sớm bắt đầu thu thập các mục tiêu kiểm thử hiệu suất trong vòng đời của dự án, nhưng nó cũng rất quan trọng để định kỳ xem lại các mục tiêu này và hỏi các thành viên trong nhóm nếu họ muốn thêm vào bất kỳ mục tiêu mới nào.

* Hãy ghi nhớ những cân nhắc cấp cao sau đây khi xác định mục tiêu kiểm tra hiệu suất:
* Các mục tiêu kiểm thử hiệu suất thể hiện điểm khởi đầu của các hoạt động xác thực và xác minh hiệu suất.
* Các mục tiêu kiểm thử hiệu suất bắt đầu với các điểm đề mục kinh doanh: khối lượng doanh nghiệp, tăng trưởng trong tương lai, v...v... Với thông tin này, bạn có thể nêu rõ được các mục tiêu công nghệ phù hợp cho các điểm đề mục.
* Các mục tiêu kiểm thử hiệu suất sẽ có sự tương quan với nhu cầu kinh doanh và do đó phải thể hiện được các kịch bản kinh doanh thực tế liên quan đến khách hàng thực tế.
* Sau khi bạn đã xác định các mục tiêu ưu tiên cao, bạn có thể điều chỉnh các mục tiêu để phù hợp với công nghệ.

# CÁCH SỬ DỤNG CHƯƠNG NÀY
Sử dụng chương này để hiểu cách thiết lập các mục tiêu kiểm thử hiệu suất theo cách cộng tác để cung cấp giá trị lớn nhất cho dự án. Để khai thác tối đa chương này:

* Sử dụng phần “Thuật ngữ” để hiểu một số thuật ngữ phổ biến liên quan đến mục tiêu kiểm thử hiệu suất để bạn có thể biết được chính xác các cụm từ này trong các ngữ cảnh dự án của bạn.
* Sử dụng phần “Phương pháp tiếp cận để xác định các mục tiêu kiểm thử hiệu suất” để có cái nhìn tổng quan về phương pháp tiếp cận và hướng dẫn tham khảo nhanh cho bạn và dự án của bạn.
* Sử dụng các phần còn lại để hiểu rõ hơn về việc xác định và nắm bắt các mục tiêu kiểm thử hiệu suất, thu thập hoặc ước tính các mục tiêu sử dụng tài nguyên và các ngưỡng và nắm bắt hoặc ước tính ngân sách hoặc phân bổ tài nguyên
* Sử dụng phần “Nghiên cứu điển hình” để xem qua các ví dụ thực tế về xác định các mục tiêu kiểm thử hiệu suất.

# THUẬT NGỮ

| Thuật ngữ/ Khái niệm | Miêu tả | 
| -------- | -------- |
| Performance-testing objectives - các mục tiêu kiểm thử hiệu suất    | Các mục tiêu kiểm thử hiệu suất dựa vào các dữ liệu được thu thập được thông qua quá trình kiểm thử hiệu suất được dự đoán là có giá trị trong việc xác định hoặc cải thiện chất lượng của sản phẩm. Tuy nhiên, các mục tiêu này không nhất thiết phải có sô lượng nhiều hoặc liên quan trực tiếp đến yêu cầu về hiệu suất, mục tiêu hoặc đặc tả chất lượng dịch vụ (QoS) đã nêu.     | 
| Performance objectives - Các mục tiêu hiệu suất | Các mục tiêu hiệu suất thường được qui định theo số lần phản hồi, thông lượng (giao dịch trên mỗi giây) và các cấp độ sử dụng tài nguyên và thường tập trung vào các chỉ số có thể liên quan trực tiếp đến sự hài lòng của người dùng.|
|Performance targets - Các mục đích hiệu suất | Các mục đích hiệu suất là giá trị mong muốn chính xác cho các chỉ số, nó được xác định cho dự án của bạn theo một nhóm điều kiện cụ thể, thường được qui định theo số lần phản hồi, thông lượng và mức sử dụng tài nguyên. Mức sử dụng tài nguyên bao gồm dung lượng của bộ xử lý, bộ nhớ, đầu vào / đầu ra đĩavà đầu vào/đầu ra mạng mà ứng dụng của bạn tiêu thụ. Các mục đích hiệu suất thường tương đương với các mục tiêu của dự án. |
| Performance thresholds - Các ngưỡng hiệu suất | Các ngưỡng hiệu suất là các giá trị có thể chấp nhận được tối đa cho các số liệu được xác định cho dự án của bạn, thường được qui định theo số lần phản hồi, thông lượng (giao dịch trên mỗi giây) và mức sử dụng tài nguyên. Mức sử dụng tài nguyên bao gồm dung lượng của bộ xử lý, bộ nhớ, đầu vào / đầu ra đĩavà đầu vào/đầu ra mạng mà ứng dụng của bạn tiêu thụ. Các ngưỡng hiệu suất thường tương đương với các yêu cầu. |
| Performance budgets - Ngân sách hiệu suất | Ngân sách hiệu suất (đôi khi được gọi là phân bổ hiệu suất) là những ràng buộc được đặt lên các nhân viên phát triển về mức tiêu thụ tài nguyên cho phép đối với thành phần của họ. |

# PHƯƠNG PHÁP ĐỂ XÁC ĐỊNH CÁC MỤC TIÊU KIỂM THỬ HIỆU SUẤT

Việc xác định các mục tiêu kiểm thử hiệu suất có thể nghĩ đến các hoạt động sau:

* Xác định mục tiêu của kiểm thử hiệu suất.
* Nắm bắt hoặc ước tính các mục tiêu sử dụng tài nguyên và các ngưỡng.
* Nắm bắt hoặc ước tính ngân sách hoặc phân bổ tài nguyên.
* Xác định số liệu.
* Truyền đạt kết quả.
* Nhận thức được việc thay đổi mục tiêu, mục đích và ngân sách.

Các hoạt động này đã được thảo luận chi tiết trong các phần sau.

# XÁC ĐỊNH MỤC TIÊU CỦA KIỂM THỬ HIỆU SUẤT
Các phương pháp được mô tả trong chương này đã đợợc chứng minh hiệu quả trong các dự án kiểm thử hiệu suất. Cho dù bạn áp dụng những phương pháp này chính xác như đã nêu hoặc ráp chúng một cách phù hợp với dự án cụ thể của bạn và môi trường làm việc là không quan trọng, điều quan trọng là phải nhớ rằng các mục tiêu là cố tình tiếp cận; có nghĩa là, chúng là công cụ giúp đảm bảo rằng kiểm thử hiệu suất mang lại giá trị lớn cho nhóm - đặc biệt là các kiến trúc sư, nhà phát triển và quản trị viên - càng sớm càng tốt trong vòng đời của dự án.

## Xác định mục tiêu tổng thể
Nhiệm vụ đầu tiên là xác định các mục tiêu tổng thể cho một bài kiểm thử hiệệu suất. Một số mục tiêu chung bao gồm:

* Xác định xem ứng dụng có tuân thủ các hợp đồng, quy định và thỏa thuận mức dịch vụ (SLA) hay không.
* Phát hiện tắc nghẽn để được điều chỉnh.
* Hỗ trợ nhóm phát triển trong việc xác định các đặc tính hiệu suất cho các tùy chọn cấu hình khác nhau.
* Cung cấp dữ liệu đầu vào cho các nỗ lực lập kế hoạch và khả năng mở rộng.
* Xác định xem ứng dụng đã sẵn sàng để triển khai sang sản xuất hay chưa

## Xem lại kế hoạch dự án
Xem xét kế hoạch dự án với từng cá nhân trong nhóm hoặc các nhóm nhỏ. Hãy nhớ rằng một kế hoạch dự án không phải ở dạng tài liệu; ví dụ, nó có thể là một phác thảo bảng trắng, một loạt các thông điệp email, hoặc một ý tưởng mơ hồ trong tâm trí của các thành viên khác nhau trong nhóm. Vấn đề là cho dù kế hoạch dự án có thể không chính thức thế nào đi nữa, thì mỗi dự án đều có một số loại kế hoạch cơ bản. Trong khi xem xét hoặc trích xuất kế hoạch, bất cứ khi nào bạn gặp phải thứ gì đó giống như điểm xác định, vòng lặp hoặc mốc quan trọng, bạn nên đặt câu hỏi như:

* Chức năng, kiến trúc và / hoặc phần cứng nào sẽ thay đổi giữa lần lặp cuối cùng và lần lặp này?
* Có ngân sách hoặc ngưỡng hiệu suất liên quan đến điều thay đổi đó không? Nếu có, thì chúng là gì? Tôi có thể kiểm tra chúng cho bạn không? Hậu quả nếu ngân sách hoặc ngưỡng không được đáp ứng là gì?
* Có khả năng bị yêu cầu điều chỉnh do kết quả của sự thay đổi này không? Có bất kỳ số liệu nào tôi có thể thu thập để giúp bạn điều chỉnh không?
* Thay đổi này có thể tác động đến các khu vực khác mà chúng tôi đã thử nghiệm / thu thập số liệu trước đây không? Nếu có thì đấy là khu vực nào? Tôi có thể chạy thử nghiệm nào hoặc tôi có thể thu thập số liệu nào để giúp xác định xem mọi thứ có hoạt động như mong đợi không?
* Những rủi ro hoặc mối quan tâm đáng kể nào liên quan đến những thay đổi này? Hậu quả sẽ là gì nếu các thay đổi không hoạt động?

## Xem lại cấu trúc
Xem lại cả kiến trúc vật lý và logic với từng cá nhân trong nhóm hoặc các nhóm nhỏ. Một lần nữa, hãy nhớ rằng thông tin này có thể chưa được ghi chép, nhưng một số người sẽ ít nhất có một mô hình khái niệm trong tâm trí - hoặc nếu họ không có, nó có lẽ sẽ là có giá trị để tìm ra điều đó. Khi bạn xem lại hoặc trích xuất kiến trúc, hãy đặt câu hỏi như:

* Bạn đã bao giờ làm điều này hay sử dụng trước đây chưa?
* Làm cách nào chúng tôi có thể xác định xem điều này có đang hoạt động trong các thông số có thể chấp nhận được sớm trong quy trình không? Có thử nghiệm hoặc xác thực kiến trúc nào mà chúng tôi có thể sử dụng để kiểm tra một số giả định của chúng tôi không?
* Điều này có khả năng cần điều chỉnh không? Tôi có thể chạy thử nghiệm nào hoặc tôi có thể thu thập số liệu nào để hỗ trợ trong việc đưa ra quyết định này?

## Hỏi các thành viên trong nhóm
Hỏi các thành viên nhóm cá nhân về (các) mối quan tâm lớn nhấất của họ liên quan đến hiệu suất cho dự án và cách bạn có thể phát hiện những vấn đề này càng sớm càng tốt. Bạn có thể cần phải thiết lập niềm tin với các thành viên trong nhóm trước khi bạn nhận được câu trả lời tốt nhất. Hãy trấn an nhóm một cách riêng rẽ và tập thể rằng bạn đang thu hút thông tin này để bạn có thể hỗ trợ họ tốt hơn trong việc xây dựng một sản phẩm chất lượng cao.

*To be continued...*

Nguồn: https://docs.microsoft.com/en-us/previous-versions/msp-n-p/bb924364(v%3dpandp.10)