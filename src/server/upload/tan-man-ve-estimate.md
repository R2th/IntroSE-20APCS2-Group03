# Lời mở đầu
Chẳng phải nói chắc các bạn ai cũng thấy rằng, càng có nhiều kinh nghiệm, chúng ta lại càng thấy tầm quan trọng của việc Estimate với độ chính xác cao có vai trò lớn thế nào tới sự thành bại của một dự án.

Tuy nhiên bài viết này với đúng tính chất `"Tản mạn"` của nó, xin phép không trình bày sâu về các kĩ thuật, những con số cần trong quá trình estimate, mà đơn giản chỉ là tổng hợp những kinh nghiệm cá nhân, nhưng xương máu trong quá trình làm dự án của mình mà thôi.

Lý do mình viết bài này không phải chỉ để chia sẻ, mà còn là để tự nhắc nhở bản thân. Đôi khi "xương máu" thật đấy, nhưng không để ý phân tích kĩ càng và lưu lại thì sớm muộn cũng bị lãng phí.

# Những điều cần chú ý khi Estimate
## 1. Phải xác định rõ Mô hình phát triển phầm mềm
Tại sao lại phải xác định rõ mô hình phát triển phần mềm mình đang áp dụng?

Vì mô hình phần mềm bạn đang áp dụng sẽ quyết định rất lớn tới tỉ lệ thời gian và chi phí quản lý trong dự án.

Ví dụ thế này, dự án của bạn chưa có tài liệu đầy đủ, cứ thêm vào và thay đổi liên tục trong quá trình phát triển. Nhưng người ta cứ bảo bạn là dự án của bạn sẽ phải dùng mô hình Waterfall và bắt bạn phải estimate lên schedule thật chi tiết; thì xin chúc mừng.

Bạn sẽ cần sa số thời gian để điều chỉnh estimate, làm lại schedules mỗi khi spec có sự thay đổi lớn, thêm vào hay bớt đi...
Rồi cả khi lịch chuyển spec chậm hơi schedule implement của bạn nữa.

Đôi khi có thể bạn đúng, bạn có thể đấu tranh thật gay gắt để bảo vệ ý kiến của mình. Tuy nhiên đôi khi để làm việc cùng nhau, chúng ta không thể muốn làm gì cũng được. Ai sai ai đúng đôi khi không quan trọng bằng cách chúng ta hợp tác cùng nhau.

## 2. Đừng bao giờ hoàn toàn tin người đã có kinh nghiệm làm dự án tương tự
Kinh nghiệm là vốn quý, ai cũng công nhận. 

Trong Agile người ta coi trọng kinh nghiệm hơn là các công thức tính toán phức tạp.

Thực tế có thể bạn sẽ phải tiếp nhận một dự án do người có kinh nghiệm estimate từ trước, hoặc tất cả mù mờ và phức tạp tới độ bắt buộc phải có sự cố vấn của người đi trước.

Nhưng kinh nghiệm là của con người, mà mỗi người lại có năng lực, tính cách và phương pháp làm việc hoàn toàn khác nhau.
Người tự tin thái quá hay ưa danh hão sẽ estimate ít hơn thực tế, người tự ti lại đẩy lên hơi cao. Người bá quá thì hay quên mất rằng mình đang estimate cho người khác làm.

Đôi khi sự chênh lệch so với thực lực của team lớn tới nỗi bạn chẳng thể tưởng tượng nổi.
Bưởi vậy, nắm được tính cách, trình độ của người estimate là yếu tố tiên quyết để có được một bản estimate chuẩn hơn.
Bạn có thể nhân lên 1.5, 2, 3, 0.8, 0.5...vv

## 3. Dự án càng khó thì sự sai khác càng lớn
Đúng vậy, dự án càng khó thì sự sai khác giữa bản estimate và thực tế thực hiện sẽ càng lớn.

Thứ nhất: Là vì dự án khó sẽ tiềm tàng nhiều rủi ro, hơn nữa có nhiều kiến thức phải nghiên cứu hơn và thời gian nghiên cứu tìm hiểu sẽ nhiều hơn. Không phải ai cũng có đủ năng lực để implement được.

Thứ hai: Trong thực tế khi làm bài kiểm tra các bạn có thể thấy, bài càng khó thì số lượng người làm được càng ít hơn. 2 học sinh trung bình không thể giải được bài toán mà một học sinh giỏi có thể làm. Tuy nhiên trong thực tế, người ta hay phải thay một dev rank cao bằng 2 hay 3 dev thường và tin rằng vấn đề có thể được giải quyết. 

Nhưng đây là một sai lầm rất nghiêm trọng với dự án khó. Vì càng đông người thì effort quản lý lại càng tăng cao, khả năng mắc lỗi hay dính phốt càng nhiều hơn trong khi chưa chắc đã đảm bảo giải quyết được vấn đề thoả mãn yêu cầu của dự án và khách hàng.

Thế nên cần rất phũ phàng để quyết định đặt 2 hay 3 người đó chỉ bằng 0.5 hoặc 0.8 effort của một người theo tiêu chuẩn đề ra mà thôi.

## 4. Nên chú ý các dịp quan trọng
Chẳng kể đâu xa, ví như World Cup 2018 vừa rồi, sự lệch múi giờ giữa Việt Nam và Nga không quá nhiều nhưng mức ảnh hưởng tới hiệu suất làm việc đã thấy rõ. Trong suốt hơn một tháng của WC, ai dám nhận hiệu suất làm việc của mình vẫn giữ nguyên quả thực là hơi quá. Vì dù mình có không xem thì đồng nghiệp cũng xem, và hiệu suất làm việc của một người rõ ràng bị ảnh hưởng lớn bởi hiệu quả làm việc của các đồng nghiệp quanh mình.

Thử nghĩ xem nếu như lệch nhau tới 12 timezones thì ảnh hưởng sẽ lớn hơn rất nhiều.

Nếu số ngày nghỉ lễ nhiều và luân phiên cũng sẽ khiến người lao động khó bắt kịp với tiến độ bình thường sau khi nghỉ.

## 5. Đừng bao giờ kì vọng ngày làm việc 8 tiếng
Đúng là như thế, thực tế thì trong một dự án ngoài họp hành, trao đổi thảo luận, viết báo cáo...vv ra thì còn đủ thứ việc cá nhân như đọc báo, lướt web, đi WC, buồn vì chia tay hay nhớ thương người yêu...vv

Vậy nên với 1 ngày thì bạn chỉ nên kì vọng một người dành cho công việc được khoảng 5 tiếng, chuyên nghiệp hơn thì 6 tiếng, nếu không sẽ khá làm thảm.

Nói chung nếu mà tính 8 tiếng thì chỉ có là OT thôi.


# Kết
Tạm kết, trên đây là những điều mình nghĩ là khá quan trọng trong quá trình estimate mà các tài liệu ít nói tới.

Đa phần là kinh nghiệm cá nhân nên mình muốn nhớ và đồng thời cũng là chia sẻ với mọi người.

Rất mong có thêm những kinh nghiệm hay từ phía mọi người để bổ xung cho kiến thức của bản thân được hoàn thiện hơn (bye)