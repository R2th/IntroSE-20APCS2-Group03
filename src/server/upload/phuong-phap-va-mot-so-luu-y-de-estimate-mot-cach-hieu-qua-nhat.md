Hiện nay, những mô hình quản lý mới như: Scrum, Agile...v.v đang ngày càng được ứng dụng rộng rãi trong việc phát triển phần mềm. Mục đích chung của các mô hình này đều hướng đến việc tạo ra sản phẩm tốt, bàn giao cho khách hàng đúng deadline. Tuy nhiên, trong quá trình phát triển, cũng có rất nhiều yếu tố ảnh hưởng đến chất lượng công việc. Một trong số đó là việc estimate thời gian? Estimate thời gian hợp lý, đảm bảo tiến độ dự án luôn là bài toán đau đầu với những nhà quản lý.

### Dưới đây là 4 bước sử dụng để estimate cho dự án

**Bước 1. Phân bổ thời gian dành cho việc estimate**
Nếu bạn thực sự muốn đội của mình có thể đưa ra estimate chính xác nhất, cố gắng đừng bắt đầu câu chuyện bằng những câu kiểu như “tôi cần bạn hoàn thành toàn bộ các đầu việc này trước thời điểm X”.

Đưa ra thời điểm cần hoàn thành trước, rồi mới yêu cầu anh em estimate sẽ khiến cho việc estimate không còn đúng với lẽ tự nhiên. Kéo theo kết quả estimate sẽ không gần với thực tế.

Khi anh em dev bị giới hạn thời điểm deadline và liên tục bị giục hoàn thành việc estimate, mọi người sẽ khó có thể nhìn nhận các yếu tố phức tạp của bài toán để estimate, và sẽ estimate theo kiểu cố gắng làm hài lòng người quản lý là chính.

Do vậy, tốt hơn hơn là cho phép cả team một khoảng thời gian, tùy vào khối lượng của project để nhìn nhận được các vấn đề phức tạp tiềm ẩn và không đề cập tới hạn deadline của các tính năng trước khi estimate.

Việc này để để sau khi estimate xong, để quyết định xem có nên xóa một phải chức năng phức tạp quá hay không.

**Bước 2. Chia nhỏ công việc thành các công việc con**
Thông thường vào thời điểm bắt đầu dự án, bạn không có đủ thông tin chi tiết về tính năng phải làm. Do vậy, số ngày mà bạn estimate được thường không phản ánh đúng số ngày thực tế.

Tuy nhiên, nếu bạn chia nhỏ công việc cần estimate thành những công việc nhỏ hơn, bạn sẽ có khả năng nhìn thấy được cụ thể những bước cần phải. Do vậy, bạn sẽ estimate được chính xác hơn.

"Khi bạn còn chưa biết được cụ thể bạn sẽ làm những gì, bạn sẽ không thể biết khi nào bạn sẽ hoàn thành nó" –Joel Spolsky, Stack Overflow CEO
Nguyên tắc ở đây là bạn cứ tiếp tục chia nhỏ task cho đến khi thời gian estimate hoàn thành mỗi task nhỏ là từ 8-10h.

**Bước 3. Phân loại task**
Sau khi chia nhỏ công việc thành những công việc nhỏ hơn, bạn cần lùi lại một chút để nhìn được tổng thể những công việc sẽ phải làm. Bạn sẽ để ý thấy được có vô vàn những việc bạn có thể bắt tay vào làm luôn, một vài việc vẫn còn lờ mờ, và một vài việc vẫn có nhiều điều bí ẩn như là vùng tối phía bên kia của mặt trăng.

Cụ thể hơn, chúng ta có 3 loại công việc sau:

*Task đã rõ những việc phải làm (Known Tasks)*

Đây là những task mà bạn đã biết rõ input, output và cụ thể các bước cần phải làm để có được output. Do vậy thời gian estimate để hoàn thành công việc này là xác định.

*Task mới chỉ rõ một phần những việc phải làm (Partially Known Tasks)*

Đây là loại task mà bạn mới chỉ nắm được input, output và nắm được sơ bộ cách làm. Tuy nhiên bạn ước lượng sẽ mất chừng 15-30 phút để tìm hiểu thêm hoặc cần thêm sự trợ giúp từ những người đã gặp vấn đề tương tự để có thể hoàn thành được task.

*Task không xác định (Unknown Tasks)*

Thường những task này sẽ cần bạn dành khoảng vài giờ tới cả ngày để hiểu công nghệ mà bạn sẽ định sử dụng để hoàn thành task.

Việc xây dựng phần mềm hiếm khi là việc xây dựng những thứ bạn đã biết cách nó hoạt động như thế nào. Thông thường bạn sẽ cần phải tìm những công cụ, nền tảng API khác khau để giải quyết các bài toán. Do vậy, thời gian dành cho việc tìm hiểu hay nghiên cứu là yếu tố quan trọng cần phải được tính vào estimate.

Sau khi phân loại task, bạn cần cố gắng đặt mục tiêu tìm hiểu thêm về project để cố gắng chuyển task Partially Known Tasks và Unknown Tasks về loại Known Tasks

**Bước 4. Estimate lại**
Tới bước này, tất cả các task của bạn đã được chuyển thành Known Task, bạn đã có thêm nhiều thông tin cụ thể hơn cho công đoạn implement. Do vậy, kéo theo là kết quả estimate sẽ chính xác hơn.
Hãy quan sát biểu đồ sau để thấy được sự liên hệ giữa thời gian estimate và mức độ rõ ràng của các yêu cầu cũng như các giải pháp để thực hiện các yêu cầu.
![](https://images.viblo.asia/b09cd40f-617a-455e-a224-d210788634fc.jpg)
Một ưu điểm của bước này là bạn có cơ hội xem lại các yêu cầu, có cái nhìn tổng quan hơn. Và sẽ có thể phát hiện ra những vấn đề mà ở các bước trước bạn chưa kịp nhìn ra. Một điểm chú ý ở đây là, mỗi khi bạn có thêm thông tin gì mới về project, bạn nên estimate lại để có con số chính xác nhất.

### Hãy chú ý 4 thứ sau trong khi bạn đang estimate project

**Điều 1. Lưu ý những câu có từ "Chỉ" - "Just"**
Có một lệ bất thành văn là thường những task có nhiệm vụ "Chỉ" làm một tính năng nào đó:

Task này chỉ nhỏ như con muỗi ấy mà!
Chắc chỉ mất 5 phút để fix lỗi thôi
Chắc task này không chiếm quá 15 phút đâu.
Những task này ban đầu nhìn có vẻ tốn ít thời gian, nhưng té ra lại thường là loại task tốn kém nhất. Những loại task như thế này hay là nguyên nhân khiến team trễ deadline.

Nguyên nhân chính khiến những loại task này chiếm nhiều thời gian hơn mong đợi là chúng thường xuất hiện từ các cuộc họp standup hàng ngày hoặc qua những cuộc trò chuyện giữa mọi người. Khi dev không có đủ thời gian để xem xét độ phức tạp của task, họ sẽ đánh giá thấp độ phức tạp và dẫn đến estimate sai.

**Điều 2. Người nào làm, người đó estimate**
Người được giao nhiệm vụ làm task thường là người hiểu rõ hoặc có động lực để hiểu rõ nhất công việc phải làm. Người này sẽ có khả năng nhìn thấy những chi tiết lặt vặt mà cũng không kém phần quan trọng của công việc. Đây là những yếu tố quan trọng để có được estimate chính xác nhất.

**Điều 3. Đừng bỏ qua những task lặt vặt**
Thường trong quá trình thực hiện project, bạn sẽ nhận được mộ lô những task lặt vặt kiểu như:

Checkbug
Fixbug
Review code
Build App
Deploy App
Nhìn qua thì những việc này không tốn thời gian lắm. Tuy nhiên luôn có vấn đề nào đó xảy ra. Và bạn sẽ khó mà lường trước được độ phức tạp. Hơn nữa, ngay cả khi không có vấn đề, khi bạn cộng gộp thời gian lại, bạn sẽ có được con số không hề nhỏ.

**Điều 4. Xem xét tới một vài khả năng gây ra việc delay bất thình lình**
Một thành viên nào đó đột nhiên bị ốm, hoặc có kỳ nghỉ mát, hoặc có một vài ngày nghỉ bắt buộc, hoặc một vài bug khủng xuất hiện vào những lúc không ngờ tới. Bạn cố gắng dựa vào kinh nghiệm đã làm của mình, để xem xét đưa những yếu tố này vào kết quả estimate của mình.

Chú ý ở đây là trong quá trình làm project, bạn cố gắng để ý tới các sự kiện không mong đợi, khả năng xuất hiện của bug theo thời gian để có thể có những chú ý cho những lần estimate tiếp theo

### Kết luận

Đối với việc estimate, tìm ra các kết quả chính xác thường rất khó.
Vấn đề ở việc estimate lại không có liên quan gì tới estimate. Nó liên quan tới việc bạn cần phải có một hiểu biết rõ-ràng và nắm được chính-xác các bước để giải quyết các vấn đề.