Phỏng vấn kỹ thuật là đáng sợ; ý nghĩ về việc phải viết code trên bảng trắng sẽ gây lo lắng.<br><br>
Trong suốt quá trình nghiên cứu và nhiều năm trong ngành, chúng tôi đã tổng hợp một số mẹo giúp bạn trong các thử thách viết code.<br><br>
Cho dù bạn là front-end hay back-end, biết những lời khuyên này và thực hành chúng trước cuộc phỏng vấn của bạn, sẽ đảm bảo bạn sẽ đặt chân tốt nhất về phía trước và hy vọng nhận được lời mời làm việc!<br><br>
Nếu bạn có bất cứ lời khuyên muốn bổ sung? Hãy để lại ý kiến phía dưới nhé :D

-----
### 1. Nói ra suy nghĩ của bạn
Giao tiếp là chìa khóa trong bất kỳ cuộc phỏng vấn nào nhưng trong các cuộc phỏng vấn kỹ thuật, bắt buộc bạn phải giải thích quá trình suy nghĩ của mình.<br><br>
Người phỏng vấn của bạn muốn bạn thành công, nhưng để giúp bạn và có khả năng cho bạn gợi ý, họ cần biết quá trình suy nghĩ của bạn.<br><br>
Nếu bạn cần một phút để suy nghĩ, hãy nói với người phỏng vấn của bạn! Không có gì xấu hổ khi nói "Tôi chỉ cần một phút để suy nghĩ".<br><br>
Và nếu bạn đang suy luận nội bộ giữa hai giải pháp, hãy nói ra. <br>Ví dụ: 
 *Nếu bạn đang cố gắng quyết định phương pháp tốt nhất để sắp xếp một mảng các số nguyên từ thấp nhất đến cao nhất*.<br>
> "Tôi có hai ý tưởng trong đầu. Đầu tiên là giải pháp vũ lực, trong đó chúng ta sẽ so sánh từng số trong chỉ mục với hàng xóm của nó và nếu số nguyên bên phải có giá trị thấp hơn số nguyên bên trái, hãy trao đổi chúng.
> Nhưng điều này không tối ưu vì nó sẽ yêu cầu kiểm tra O(n^2) để đảm bảo mọi thứ được sắp xếp. Tôi biết sắp xếp hợp nhất (merge sort) là một thuật toán sắp xếp được tối ưu hóa hơn với thời gian chạy trường hợp xấu nhất là O (n log n), tuy nhiên tôi không chắc chắn làm thế nào để thực hiện nó."
> 
Nói to suy nghĩ của bạn sẽ cho phép người phỏng vấn hướng dẫn bạn và thường là cơ hội để thể hiện kiến thức của bạn về cấu trúc dữ liệu và thuật toán.
### 2. Đặt câu hỏi làm rõ
Trong hầu hết mọi trường hợp, câu hỏi mà bạn nhận được sẽ có một vài lỗ hổng trong đó. Người phỏng vấn sẽ không cung cấp cho bạn tất cả các thông tin trước vì họ muốn thấy bạn suy luận và kỹ năng giải quyết vấn đề. Do đó, điều quan trọng là phải suy nghĩ thông qua tất cả các thông tin chính bạn sẽ cần để giải quyết vấn đề và hỏi xem có điều gì không rõ ràng không.
### 3. Vũ lực sau đó tối ưu
Nếu bạn nhận được một câu hỏi và bạn không biết bắt đầu từ đâu. Đừng hoảng sợ !!! tất cả chúng ta đã có khoảnh khắc này!<br><br>
Đầu tiên, hãy nghĩ về thông tin bạn có. Những thông tin nào bạn cần để giải quyết vấn đề này?<br>
Thứ hai, bạn đang thiếu gì? Trong mẹo trước chúng tôi đã đề cập đến việc đặt câu hỏi làm rõ. Đây là một thực hành tuyệt vời nếu bạn bị mắc kẹt hoặc cần một chút thời gian.<br><br>
Phương pháp vũ lực sẽ là sắp xếp nổi bọt trong đó chúng ta so sánh mọi số nguyên với mọi số nguyên khác và hoán đổi nếu cần. Và mặc dù đây không phải là một giải pháp tối ưu hóa, việc đưa giải pháp vũ lực lên bảng trắng sẽ cho phép bạn tái cấu trúc thành thứ gì đó tối ưu hơn.<br>
Có thể loại bỏ một trong các vòng lặp for lồng nhau trong thuật toán sắp xếp của chúng ta không? Có lẽ chúng ta có thể tái cấu trúc để sử dụng thuật toán chia để trị như sắp xếp hợp nhất! <br><br>
> Một giải pháp vũ lực sẽ tốt hơn so với không có giải pháp.
### 4. Thành thật với câu trả lời
Chắc chắn sẽ đến một lúc khi bạn chỉ đơn giản là không biết câu trả lời cho một câu hỏi.<br><br>
Ví dụ: nếu bạn được hỏi "sự khác biệt giữa == và ===?" và bạn chỉ đơn giản là không có ý tưởng, chỉ cần nói với người phỏng vấn!<br>
Bạn có thể nói: "Tôi không chắc chắn nhưng nếu tôi phải đoán, tôi sẽ nói ..."<br><br>
Điều này cho thấy rằng bạn tự nhận thức và trung thực nhưng bạn vẫn sẵn sàng đoán. Nếu bạn giả vờ rằng bạn biết, điều này cho thấy bạn không phải là người trung thực và có khả năng bạn sẽ không nhận được lời mời làm việc.<br><br>
Ngoài ra, nếu bạn từng nhận được một câu hỏi mà bạn đã thấy giải pháp trong một cuộc phỏng vấn trước đây, hãy trung thực về nó. Người phỏng vấn của bạn sẽ có thể biết nếu bạn đang đọc lại một câu trả lời thuộc lòng, do vậy tốt nhất nên minh bạch. Thêm nữa, người phỏng vấn của bạn sẽ đánh giá cao sự trung thực của bạn.
### 5. Tự kiếm tra lại giải pháp
Khi bạn có một giải pháp, hãy dành mười phút để kiểm tra nó. Các trường hợp sử dụng rõ ràng là gì? Các trường hợp góc là gì? Bạn có thể sẽ tìm thấy lỗ hổng trong giải pháp của bạn và có thể quay lại và tinh chỉnh chúng.<br><br>
Nếu bạn thốt ra câu trả lời mà không kiểm tra nó, có lẽ bạn sẽ không nhận được lời mời làm việc. Ví dụ: nếu bạn được yêu cầu viết một thuật toán xác định xem có một vòng lặp (hoặc cạnh bị hỏng) trong cây nhị phân hay không, hãy nghĩ về các trường hợp sử dụng có thể.<br>
* Thuật toán của bạn có hoạt động nếu không có nút trong cây không?
* Nếu chỉ có một nút gốc thì sao? 
* Nếu không có cạnh / vòng bị hỏng thì sao? 
* Điều gì nếu cạnh bị hỏng nằm trên nút cuối cùng trong cây (phía dưới bên phải)?
* Nếu nó ở cấp độ đầu tiên thì sao?

Những câu hỏi này sẽ cho phép bạn tinh chỉnh giải pháp của bạn. Nó có thể giúp bạn xác định xem bạn có muốn sử dụng tìm kiếm theo chiều sâu so với tìm kiếm theo chiều rộng đầu tiên hay không.<br><br> Kiểm tra rất quan trọng! Vì vậy, đừng quên điều đó!<br><br>
Giữ năm lời khuyên này sẽ giúp làm dịu sự lo lắng của bạn về các cuộc phỏng vấn. Tập trung vào giải quyết vấn đề trong tầm tay khi giao tiếp rõ ràng. Bạn sẽ nhận được một lời mời làm việc ngay lập tức !<br>
Cảm ơn bạn đã đọc. Chúc bạn một ngày tốt lành :D !!
### Tài liệu tham khảo
https://dev.to/ladybug/five-tips-for-coding-interviews-2e11