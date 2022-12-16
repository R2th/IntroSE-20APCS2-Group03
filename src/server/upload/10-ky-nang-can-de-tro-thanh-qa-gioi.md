# 5 hard skills của một QA

### 1. Khả năng tự tìm tòi dựa trên kinh nghiệm
Quy trình kiểm thử phân mềm truyền thống làm cho mọi người hiểu lầm về vai trò của Testing và Tester. Mọi người vẫn đang nghĩ về QA như một công việc lặp đi lặp lại với những check box cố định, điều này thấy rõ trong kiểm tra tự động, các sản phẩm phần mềm được đưa ra với những ràng buộc, logic chặt chẽ, họ giả định các hành vi con người là hiếm khi xảy ra. Điều này dẫn đến một số bug nghiêm trọng  về hành vi vô tình bị bỏ qua. Đồng thời thiếu cải thiện chất lượng về mặt UI/ UX dựa trên hành vi sử dụng đa dạng của user.
Tóm lại, không có gì là chắc chắn, và là lựa chọn tốt nhất. Là một QA bạn luôn phải có sáng tạo, tò mò với sản phẩm của mình, và bạn sẽ có những điều đầy bất ngờ sẽ được mở ra.

*Testing treats users as a single, homogenous group but QA adopts different user personas in its process.*

## 2. Bên cạnh đội ngũ phát triển và thiết kế
Thử tưởng tượng một list dài các bug được báo cáo vào giai đoạn của sprint, nó giống như một sự trừng phạt dành cho team bằng cách làm nổi bật những lỗi. Thay vào đó bạn có thể để dev thấy lỗi ngay trong giai đoạn phát triển, điều này không đồng nghĩa với việc, bạn sẽ không log bug và report, nó vẫn là một công việc cần thiết, tuy nhiên để dev thấy những lỗi, họ có thể sẽ xử lý chúng ngay sau đó mà không mất quá nhiều thời gian. Điều này sẽ giúp ích rất nhiều vào việc cải thiện tốc độ của dự án.
Tương tự như thế với các file design, QA có thể nói lên các lo ngại của mình ngay ở giai đoạn đầu, nó sẽ giúp ích rất nhiều cho công việc của QA nói riêng và giải quyết được rất nhiều vấn đề của dự án nói chung ở giai đoạn sau, khi mà cả team không cần phải sửa chữa các lỗi nhỏ mà có thể sữa chữa ở giai đoạn đầu nếu được phát hiện.

*Testing is the last step in the development process, whereas QA runs throughout it.*

### 3. Avoid QA ping pong
"Avoid QA ping pong" theo nghĩa đen là những cú chuyền bóng qua lại, trong testing, nó có nghĩa là những lần assign ticket qua lại giữa QA và dev vì những lý do khác nhau. 
Developer: Không muốn chấp nhận bug từ QA hoặc không thể tái hiện lại bug, hoặc không đọc report một cách đúng đắn.
QA: Tạo ngay ticket ngay ở lần gặp bug đầu tiên.
Hãy chú ý kiểm tra lại bug, cover nhiều case nhất có thể trước khi tạo ticket và assign chúng cho dev.

*Testing is an audit report, QA is a supportive conversation.*

### 4. Ưu tiên lợi ích người dùng hàng đầu
Bạn sẽ tìm thấy nhiều lỗi trong quá trình kiểm thử, nó sẽ ảnh hưởng đến những nhóm khách hàng khác nhau. Như chúng ta đã biết, một sản phẩm release đến người dùng không phải là một sản phẩm hoàn toàn không có bug, mà là một sản phẩm vẫn còn bug, nó sẽ được cover ở một version khác, các bug này đã được phát hiện và đang được quản lý ở hệ thống quản lý bug của công ty với mức độ ảnh hưởng thấp. Để làm được điều này thì bug cần được phân loại priority, đó là mức độ nghiêm trọng của bug, các dev sẽ fix bug dựa vào độ nghiêm trọng để đảm bảo các bug có priority cao sẽ không còn tồn tại.

*Testing has no view on the impact or importance of a bug. QA prioritises legacy fixes into a list ordered to maximise the user-benefit.*

### 5. QA giỏi sẽ biết điều gì đang xảy ra trong sản phẩm
QA giỏi là người nắm vững tài liệu về dự án, họ luôn biết những cập nhật tài liệu của dự án để cover những trường hợp liên quan có thể xảy ra thông qua Test case/ Check list.  Họ cùng với team của mình sẽ cùng thảo luận để đảm bảo các vấn đề có thể không xảy ra khi sản phẩm được release.

*Testing has a narrow view of each system. QA views them as interconnected system.*


# 5 soft skills của một QA

### 1. Lấy quan điểm người dùng làm trung tâm
Bạn phải có sự đồng cảm với những đối tượng sẽ sử dụng sản phẩm của mình, cảm nhận hành vi của họ, hiểu về nhu cầu của họ, sau đó sử dụng hiểu biết này của mình để hỗ trợ team dự án. Nó cũng giúp bạn đánh độ ưu tiên của lỗi chính xác hơn, và ghi nhớ về sự đồng nhất của các tính năng tương tự trong sản phẩm.

### 2. Giao tiếp tốt
Các lỗi phải được truyền đạt trong bug report theo hướng xây dựng, đừng vội tự hào khi bạn tìm được bug, hãy suy nghĩ ở vị trí của design, PM hay dev, họ là những người rất nhạy cảm, hãy chú ý, bạn có thể làm tổn thương cảm xúc của dev đấy.

### 3. Tính chính xác, độ tập trung
QA có thể phải test đi test lại rất nhiều lần ở một màn hình, bạn phải đảm bảo mình có đủ sự tập trung để kiểm tra từng chi tiết trên bản design mình nhận được ở mỗi lần kiểm thử. Nếu bạn không có sự tập trung, không có tâm trí để làm việc này thì nó giống như việc bạn kiểm tra đi, kiểm tra lại trên cùng một giao diện hằng tuần.

### 4. Kỹ năng đối đầu
Bạn có kỹ năng dám đứng dậy để nêu lên quan điểm của về về những rủi ro ngay cả khi không có ai ủng hộ bạn? Bạn có kỹ năng chấp nhận khi những quan điểm của mình không được chấp nhận bởi các nhà business. 
Bạn có dam đối đầu với dev nếu chất lượng của sản phẩm không tốt hoặc đối đầu với PM khi tài liệu không tốt?

### 5. Học hỏi nhanh, thái độ sẵn sàng học hỏi
Công nghệ luôn thay đổi và bạn phải không ngừng học hỏi để có thể bắt nhịp với nó.



Refer link: https://medium.com/@fesja/10-skills-you-must-have-to-be-a-great-qa-40ee58232599