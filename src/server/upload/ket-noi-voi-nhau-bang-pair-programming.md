![](https://images.viblo.asia/884e7097-14d0-4a71-b80b-cd8a70efd13b.jpg)

Với chủ đề *“Reconnection - Tái kết nối”* của năm nay, mình đã suy nghĩ và quyết định bài đầu tiên trong 2 bài năm nay sẽ không có chứa nhiều code mà về 1 kỹ thuật trong 1 mô hình phát triển phần mềm kiểu Agile. Đây cũng là kĩ thuật yêu thích và thuần thục nhất của mình: Pair Programming. Và mình đủ tự tin tới độ có thể tự nhận là một chuyên gia Pair Programming luôn. Rất mong các bạn theo dõi và nếu có hứng thì áp dụng.

# Tổng quan eXtreme Programming

Trước tiên, chúng ta hãy nhắc qua nguồn gốc của Pair Programming là eXtreme Programming(XP) một chút. Để mô tả hết về XP thì mình nghĩ phải viết thêm 1 bài nữa để mô tả đầy đủ chứ với bài chuyên riêng về Pair Programming thì mình sợ sẽ hơi dài.

XP là một mô hình phát triển phần mềm có mục tiêu hướng đến các phần mềm chất lượng cao nhất và chất lượng kỹ sư tốt nhất cho 1 dự án/sản phẩm. Và đây cũng là mô hình phát triển cụ thể nhất hướng tới kỹ thuật và các áp dụng kỹ thuật ở trong Agile(Scrum thì hướng tới giao tiếp con người và quản lý hơn, Kanban thì đang dừng ở mức 1 kỹ thuật hơn là 1 cấp mô hình phát triển).

Nói thêm 1 chút thì so với các mô hình phát triển phần mềm truyền thống như waterfall hay spiral là cấp model, cấp framework như Scrum hay XP nhỏ hơn, linh hoạt hơn và có thể áp dụng cũng như lai được với nhau và với cấp model.

![](https://images.viblo.asia/d53e428f-5608-409f-96e1-2ac02c89fa8e.gif)

Theo Kent Beck, tác giả của cuốn "Extreme Programming Explained", định nghĩa 12 practice trong Extreme Programming gồm có:
- The Planning Game
- Small releases
- System Metaphor
- Simple design
- Testing
- Refactoring
- Pair programming
- Collective ownership
- Continuous integration
- 40-hour Week
- On-site customer
- Coding standards

Thôi, viết đến đây mình nghĩ mình sẽ phải viết bài thứ 2 trong MayFest năm nay là về XP giải thích cụ thể cũng như suy nghĩ của mình rồi =)))) 12 khái niệm kia giải thích chi tiết khá là khó, nhưng tựu trung lại thì đây là framework "cứng" nhất của Agile và cũng quá khó và đau đầu để thực hiện(dễ thấy nhất là On-site customer hay là 40-hour Week là điều khó áp dụng được trong thực tế. Đến Scrum thực tế áp dụng chuẩn còn khó thì XP gần như là 1 kiểu lý tưởng =))) ). Và mang cái tên Extreme(cực đoan) thì cũng có lý do của nó. Các phần kia quá khó, mất rất nhiều thời gian, sức lực, gây đau đầu cho người thực hiện tới mức cực đoan vô cùng. Vậy nên chắc chắn thực tế chúng ta cũng phải cherry-pick hoặc tìm alternative cho 1 số phương pháp để vấn đạt được mục tiêu của XP là "mục tiêu hướng đến các phần mềm chất lượng cao nhất và chất lượng kỹ sư tốt nhất cho 1 dự án/sản phẩm".

Và giờ chúng ta sẽ vào trọng tâm của bài viết
# Pair Programming là gì?
Pair Programming là 1 practice trong XP và được nâng thành rule:
>  All production code is pair programmed.

Pair Programming được thực hiện bởi 2 programmer làm việc trên cùng 1 máy tính. 1 người sẽ là người viết mã, người kia sẽ có nhiệm vụ quan sát, hướng dẫn và review code cho người viết mã.

Theo trang chủ của XP, Pair Programming được thực hiện tốt nhất với 2 người ngồi side by side với bàn phím và chuột để trước mặt. 2 người thực hiện pair programming sẽ cùng tập trung vào code đang viết. Nếu như Agile và Scrum chú trọng vào giao tiếp thì Pair Programming sẽ nâng việc đó lên 1 level khác vì đây là tình huống cần phải có kĩ năng giao tiếp rất cao. Nếu làm đúng thì chúng ta sẽ có 1 buổi pair hòa bình còn nếu không thì sau buổi pair sẽ là cuộc chiến vô cùng dài kì 🤣🤣

Thật vậy thì Pair Programming sai thường do rất nhiều cách thực hiện sai như người navigator chỉ đứng chỉ đạo suốt quá trình, người driver ngồi code suốt. Điều này sẽ dẫn đến việc chúng ta có 1 người chỉ đạo giỏi và 1 người bảo đâu làm đấy giỏi không có lợi về lâu dài. Tiếp đó navigator có lúc mang ý muốn đơn giản nhưng chỉ đạo không rõ ràng dẫn tới vấn đề luẩn quẩn không giải quyết được trong suốt thời gian dài. Hoặc cả ngày ngồi pair programming với nhau thì hiệu quả cao thật, nhưng xong cũng không còn sức để làm việc khác. Và các yếu tố họp hành nơi công sở cũng khá cản trở tới việc pair programming.

Như đã nói ở trên, pair programming cũng là phương pháp extreme và có 1 giải pháp thay thế là review code. Có điều đây không phải là giải pháp thay thế hoàn toàn với việc chưa có giải pháp xử lý được chuyển hóa ra dạng code.

Vậy áp dụng pair programming như thế nào?
# Quy tắc áp dụng Pair Programming của bản thân mình
Kể từ khi được chỉ dạy kĩ thuật này bởi 1 kỹ sư người Nhật lớn tuổi nhiều kinh nghiệm và áp dụng với các anh em bạn bè khác nhau, mình cũng đúc kết và đưa ra quy tắc sau. Hiện tại các đồng nghiệp hiện tại của mình đang cùng mình áp dụng và hiện khá hiệu quả ở bước đầu. Quy tắc của mình như sau:

- Tất cả code đều sẽ viết bởi 1 người và sẽ được review bởi toàn team sau khi hoàn thành task.
- Chỉ áp dụng pair programming với các tình huống bản thân người làm task không tự xử lý được vấn đề/task HOẶC deadline.
- Buổi pair programming sẽ diễn ra trong vòng 2 tiếng. Sau 2 tiếng thì 2 bên sẽ note lại các vấn đề đang dang dở trên các tool quản lý task như backlog, redmine, jira,.... và tạm nghỉ.
- Trong vòng 2 tiếng pair programming, mỗi người sẽ code 25 phút, nghỉ 5 phút và sau đó đổi phiên.
- Trong trường hợp người driver chưa hiểu ý của người navigator thì người navigator có quyền ngắt và đổi phiên
- Trong trường hợp người navigator bí, driver sẽ phải ngồi giải thích phần code đang viết cho người navigator. Người navigator sẽ duy trì độ tập trung của mình vào code bằng cách đọc và đưa ra câu hỏi cho người driver.
- Bất kể trình độ hay vị trí/chức danh gì, khi vào code thì 2 bên phải tôn trọng lẫn nhau cũng như tinh thần sẵn lòng cùng vào code. Sẽ không có chuyện chỉ 1 người đứng nói còn 1 người phải làm từ đầu đến cuối.
- Chú ý ngôn từ và diễn đạt khi pair programming. (Cái này rất khó và mình đã phải dùng Rubber-Duck Debug với gấu bông để tự luyện tập vài lần.)

# Cách thức thực hiện pair programming
Well, với điều kiện bình thường cùng làm ở công ty gặp nhau trực tiếp thì chúng ta thực hiện như bình thường.

Còn với điều kiện dịch bệnh thì dùng VSCode Liveshare chế độ edit để xử lý code, còn share screen để xem kết quả chạy code với mình là cách đang tối ưu nhất để pair programming online.
# Lời kết
Người ta nói rằng khi chưa tiếp xúc với pair programming, người ta thường ngại và sợ, nhưng tiếp xúc rồi thì nghiện. Các bạn hãy thử áp dụng hợp lý xem thế nào.

Chúc các bạn cải thiện được hiệu quả công việc cũng như việc giao tiếp trong quá trình làm việc.
# Tham khảo
- https://www.amazon.co.jp/Extreme-Programming-Explained-Embrace-Change/dp/0321278658
- http://www.extremeprogramming.org/