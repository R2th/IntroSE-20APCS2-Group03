# Master test plan là gì?

Có rất nhiều các công ty phần mềm mà QA nhận bản build từ lập trình viên và chỉ thực hiện kiểm thử ngẫu nhiên hệ thống để tìm ra lỗi. Có một vài trường hợp QA thực hiện các luồng kiểm thử mà không theo một chiến lược kiểm thử nào hoặc bất kì một kế hoạch kiểm thử nào.

Tất cả chúng ta đều đồng ý rằng một trong những mục tiêu chính của QA là tìm ra lỗi của phần mềm nhưng thực hiện kiểm thử ngẫu nhiên, không có sự chuẩn bị tốt là cách không hiệu quả trong quy trình làm việc.

Dự án kiểm thử bao gồm 4 giai đoạn
Lập kế hoạch
Chuẩn bị
Thực hiện
Đánh giá kết quả và báo cáo kết quả

Trong bài viết này, tôi sẽ tập trung vào giai đoạn lập kế hoạch, vì tôi tin rằng đây là giai đoạn quan trọng nhất. Bây giờ, chúng ta có thể bắt đầu với 2 câu hỏi lớn:
Chúng ta cần lập kế hoạch gì?
Chúng ta lập kế hoạch đó như thế nào?

Câu trả lời cho cả hai câu hỏi trên là Master Test Plan (còn gọi là kế hoạch kiểm thử phần mềm, Chiến lược kiểm thử phần mềm, ….). Kế hoạch kiểm thử vừa là tài liệu vừa là quy trình, bằng cách này vào cuối ngày khi xem 

# Như nào là một test plan tốt?

Mỗi công ty có những nhu cầu khác nhau và do đó mỗi công ty sẽ yêu cầu một mẫu master test plan khác nhau. Điều quan trọng phải hiểu rằng tài liệu này sẽ mô tả phạm vi công việc của nhóm kiểm thử đối với từng dự án cụ thể. Đây là tài liệu mà các bên liên quan (nhóm phát triển sản phẩm, quản lý dự án, …) nhìn vào sẽ biết được nhóm kiểm thử đang kiểm thử gì, phạm vi kiểm thử là như nào và các phương pháp kiểm thử trong dự án là những phương pháp nào.

Sau đây là các phần tôi thường thể hiện trong kế hoạch kiểm thử của mình (bạn có thể tham khảo và sửa đổi lại theo nhu cầu sử dụng của bạn)

# 1. Mục tiêu của quá trình kiểm thử

Ở đây hãy đề cập đến mục tiêu tổng thể mà bạn dự định đạt được với kiểm thử thủ công và kiểm thử tự động hóa.

Một số mục tiêu của dự án kiểm thử của bạn có thể là

Đảm bảo Ứng dụng được Kiểm tra phù hợp với các yêu cầu chức năng và phi chức năng
Đảm bảo AUT đáp ứng các thông số kỹ thuật chất lượng do khách hàng xác định
Lỗi / vấn đề được xác định và sửa chữa trước khi đi vào hoạt động

# 2. Phạm vi kiểm thử

Trước khi bắt đầu bất kỳ hoạt động kiểm thử nào, phạm vi của kiểm thử phải được biết. Bạn phải suy nghĩ kỹ về nó.

Các thành phần của hệ thống sẽ được kiểm tra (phần cứng, phần mềm, phần mềm trung gian, v.v.) được định nghĩa là "trong phạm vi"
Các thành phần của hệ thống sẽ không được kiểm tra cũng cần được xác định rõ ràng là "nằm ngoài phạm vi".
Xác định phạm vi của dự án kiểm thử của bạn là rất quan trọng đối với tất cả các bên liên quan. Một phạm vi chính xác giúp bạn cung cấp cho mọi người một niềm tin và thông tin chính xác về công việc kiểm thử bạn đang làm. Tất cả các thành viên dự án sẽ có một sự hiểu biết rõ ràng về những gì được kiểm thử và những gì không

Làm thế nào để bạn xác định phạm vi dự án của bạn?

Để xác định phạm vi, bạn phải dựa vào:

* Tài liệu yêu cầu của khách hàng
* Tài liệu đặc tả về sản phẩm
* Kĩ năng, kinh nghiệm của nhóm kiểm thử
Bây giờ nên xác định rõ ràng "trong phạm vi" và "ngoài phạm vi" của kiểm thử.
Ví dụ như: theo tài liệu yêu cầu phần mềm, dự án chỉ tập trung vào kiểm tra chức năng và giao diện của website (trong phạm vi kiểm thử)
Tất cả những kiểm tra phi chức năng (kiểm thử hiệu suất, kiểm thử chịu tải, kiểm thử bảo mật, …) sẽ không nằm trong phạm vi của dự án

# 3. Lập kế hoạch về môi trường kiểm thử
Môi trường kiểm thử là gì?
Một môi trường kiểm thử là một thiết lập của phần mềm và phần cứng mà nhóm kiểm thử sẽ thực hiện các trường hợp kiểm thử. Môi trường kiểm thử bao gồm môi trường người dùng thực tế, cũng như môi trường vật lý, chẳng hạn như máy chủ, môi trường chạy giao diện người dùng.

Dựa trên phạm vi kiểm thử và các cấu hình cần thiết, bạn cần tạo một danh sách tất cả các tài nguyên phần cứng và phần mềm bạn sẽ cần để hoàn thành các kiểm thử của mình.
Nếu bạn có kế hoạch sử dụng tự động hóa bất kỳ loại nào, bao gồm số lượng license phần mềm cũng như số lượng người dùng ảo bạn sẽ cần để tải và kiểm tra hiệu suất.

# 4. Chuẩn bị kiểm thử
Bây giờ bạn cần phải làm rõ ràng những gì bạn muốn kiểm thử và bạn cần hiểu mình phải chuẩn bị những gì để thực hiện kiểm thử.
Bạn nên liệt kê danh sách theo thứ tự ưu tiên như sau:
(1) Thực hiện kiểm thử những chức năng đã xong
(2) Thực hiện kiểm thử những chức năng đã được review/updated phù hợp với thay đổi của chức năng
(3) Thực hiện kiểm thử những chức năng được viết từ đầu
Đối với mỗi danh sách, ghi rõ thời gian bạn cần thực hiện kiểm thử trong bao lâu hoặc bạn cũng có thể thêm các thông tin/hỗ trợ từ các nhóm khác nếu cần

# 5. Lịch trình kiểm thử:
Hoạt động của chúng tôi thường được chia thành các giai đoạn và chu kỳ. Ví dụ, một dự án có thể có giai đoạn chuẩn bị, giai đoạn thực hiện bao gồm 3 đến 5 chu kỳ kiểm thử và giai đoạn / chu kỳ phát hành sản phẩm cuối cùng.
Đối với mỗi một chúng tôi nên cung cấp tại cho thuê các thông tin sau:
(a) Dòng thời gian dự kiến
(b) Tiêu chí xuất nhập cảnh
(c) Phạm vi và mục tiêu kiểm thử
(d) Kiểm tra tài nguyên (phần mềm con người, phần mềm và phần cứng)
và bất kỳ thông tin bổ sung nào liên quan đến chu kỳ cụ thể.

# 6. Người kiểm tra & lịch trình
Theo như khía cạnh dự án của bản lập kế hoạch, bạn nên liệt kê ra tất cả những người kiểm thử, ngày thực hiện kiểm thử cho dự án của bạn. Danh sách ngày nghỉ, ngày lễ, đào tạo và bất cứ hoạt động nào ảnh hưởng đến nguồn nhân lực sẵn có.
Nếu một phần nguồn nhân lực kiểm thử của bạn là nhân viên mới, bạn đảm bảo tính đến thời gian đào tạo và thời gian bắt kịp công việc khi họ bắt đầu.

# 7. Rủi ro
Giống như mọi dự án bạn nên liệt kê rủi ro bạn có thể gặp phải. Ví dụ về rủi ro là khó khăn trong việc tuyển dụng các nguồn lực, sự không ổn định của sản phẩm có thể làm trì hoãn lịch trình của bạn, tỷ lệ tiêu hao cao, v.v.
Mỗi rủi ro nên bao gồm các thông tin sau:
(a) Người chịu trách nhiệm về rủi ro
(b) Mức độ nghiêm trọng và khả năng xảy ra rủi ro
(c) Ngày thích hợp khi rủi ro có thể xảy ra
(d) Hậu quả của việc cụ thể hóa rủi ro
(e) Kế hoạch phòng ngừa và dự phòng

# 8. Tài liệu tham khảo & tài liệu đính kèm
Thêm liên kết đến bất kỳ tài liệu bổ sung và / hoặc thông tin tham khảo cho dự án.
Thêm một danh sách tất cả những người liên lạc cũng như các lĩnh vực trách nhiệm của họ.

Lời khuyên cuối cùng - Một số công ty chưa xây dựng lên bản lập kế hoạch toàn diện, các công ty khởi nghiệp đặc biệt và / hoặc các công ty làm việc theo quy trình phát triển ít cấu trúc hơn (ví dụ: Phát triển Agile).
Nếu bạn làm việc ở một trong những công ty này, điều đó có nghĩa là bạn có thể làm việc mà không có kế hoạch QA chiến lược, điều đó đơn giản có nghĩa là bạn cần nhào nặn nó để lập kế hoạch đáp ứng văn hóa và cách sống của công ty bạn.

Nguồn: https://qablog.practitest.com/master-test-plan-testing-strategic-side/