Rất nhiều lần bạn gặp một vấn đề nào đó khi sử dụng website và liên hệ với bộ phận support kỹ thuật, họ lại chỉ trả lời một cách đơn giản rằng bạn hãy thử lại tính năng đó trên trình duyệt (browser) khác và quả thực khi làm thể thì issue kia đã biến mất. Vậy nên đề tài hôm nay sẽ thảo luận về Cross browser testing. 

Cross browser testing (Kiểm thử trình duyệt chéo)là gì?
![](https://images.viblo.asia/be93748b-7c9d-4a33-adf7-611f02af05fb.png)
- Kiểm tra trình duyệt chéo chỉ đơn giản là kiểm tra trang web hoặc ứng dụng của bạn trong nhiều trình duyệt và đảm bảo rằng nó hoạt động nhất quán và chính xác mà không có bất kỳ vấn đề nào xảy ra.

-  Điều này áp dụng cho cả ứng dụng web và website .

-  Các loại ứng dụng nào cần kiểm thử trình duyệt chéo? - Ứng dụng cho khách hàng (nôm na là ứng dụng có rất nhiều users) sử dụng là ưu tiên số 1 rồi

Rõ ràng ý tưởng tốt nhất là kiểm tra ứng dụng để kiểm tra khả năng tương thích trình duyệt vì không thể đoán biết hoặc kiểm soát trình duyệt / nền tảng / phiên bản nào mà người dùng cuối sẽ sử dụng.
Mặt khác, nếu tất cả các máy tính bên trong công ty sử dụng các máy tính Windows 8 có trình duyệt Chrome thì không cần phải tìm kiếm hoặc kiểm tra bất kỳ trình duyệt nào khác nữa .
Tại sao kiểm tra trình duyệt chéo được thực hiện?
Để biết những trình duyệt nào làm chức năng chạy sai để có thể sửa chữa nó.
Để nâng cao hiệu quả và khả năng sử dụng cho người dùng để sản phẩm được kinh doanh tốt nhất.

Nhưng cụ thể mục đích của thử nghiệm trình duyệt chéo là gì? - 

Đó là các tính năng trên website hoặc ứng dụng của bạn trong các trình duyệt khác nhau - hoạt động có giống hoặc có khác nhau nhiều hay không? trình duyệt này có tốt hơn trình duyệt kia không, v.v.

Các chức năng và hoạt động của nó có chính xác hay không?

Ai thực hiện loại thử nghiệm này và những kết quả này có liên quan đến ai?

Bạn đang nghĩ, "Có cả triệu trình duyệt, phiên bản và nền tảng để lựa chọn? Nào là Chrome, Firefox, Safari, IE, Cốc Cốc, Mobile web, Window, Linus, MacOS... vân vân mây mây" - Điều này là trách nhiệm của người kiểm tra, Khách hàng, nhóm phân tích kinh doanh và các nhóm tiếp thị có vai trò quan trọng. Ngoài ra, các công ty thu thập số liệu thống kê sử dụng / lưu lượng truy cập để thu hẹp các trình duyệt, môi trường và thiết bị chủ yếu được sử dụng.

Toàn bộ nhóm dự án nên có sự quan tâm, đầu tư thời gian, tiền bạc và cơ sở hạ tầng đầu tư để hỗ trợ nỗ lực này.

Nhóm QA có thể tham gia vào quá trình này hoặc có thể là nhóm thiết kế, những người quan tâm đến việc biết ứng dụng hoạt động như thế nào trong nhiều trình duyệt.
Cho dù nó được thực hiện bởi QA hay bất kỳ nhóm nào khác - kết quả được giải thích bởi các nhóm thiết kế và phát triển và các thay đổi có liên quan được thực hiện thì Kiểm tra tương thích trình duyệt được thực hiện như thế nào?


Điều đầu tiên đầu tiên là nó được thực hiện bằng tay hoặc sử dụng tool nào đó?

Việc kiểm thử chắc chắn có thể được thực hiện bằng nhiều máy, nhiều hệ điều hành, nhiều trình duyệt, và rõ ràng, điều này dẫn đến nhiều vấn đề, đòi hỏi đầu tư và nhiều thách thức khác nhau.

Vì vậy, có rất nhiều công cụ có sẵn trên thị trường để làm cho điều này dễ dàng hơn.
 
Thị trường có cung cấp một VPN (Virtual Private machine) sử dụng mà bạn có thể kết nối với các máy từ xa và kiểm tra công việc và hiển thị của JAVA, AJAX, HTML, Flash và các trang khác của bạn. Hầu hết trong số này là an toàn, nhưng vì bạn đang gửi thông tin của bạn cho bên thứ ba, nên có một phân tích nhất định theo quyết định.
Ảnh chụp màn hình được cung cấp cho các trang và liên kết được gửi về cách chúng xuất hiện trong nhiều trình duyệt và tất nhiên chỉ là trang tĩnh.
Nhiều trình duyệt được đồng bộ hóa liên quan đến các thao tác được thực hiện trên một trình duyệt và kết quả được trình bày một cách mạch lạc.
Hiển thị bản trình bày của trang ở nhiều độ phân giải màn hình khác nhau
Khi gặp phải sự cố, video hoặc ảnh chụp màn hình được ghi lại để truyền tải sự cố để có thể phân tích thêm.
Hỗ trợ thường có sẵn cho cả ứng dụng web và thiết bị di động
Các trang riêng yêu cầu xác thực được truy cập cũng có thể được kiểm tra
trên local, trong một mạng riêng /tường lửa cũng có thể được kiểm thử


- Để tóm tắt “cách” để kiểm thử trình duyệt chéo:
 1. Thống kê lưu lượng truy cập giúp xác định trình duyệt nào cần kiểm tra.

 2. Một phân tích chi tiết nên được thực hiện trên bản AUT (Ứng dụng đang thử nghiệm) để xác định những phần nào của ứng dụng hoặc nếu tất cả đều phải trải qua thử nghiệm. Vậy khuyến khích rằng tất cả tính năng được thử nghiệm trên nhiều trình duyệt, nhưng một lần nữa chi phí và thời gian phải được xem xét.Chiến lược tốt nhất là thực hiện thử nghiệm 100% trên một trình duyệt trên mỗi nền tảng và  chỉ kiểm tra chức năng quan trọng / được sử dụng rộng rãi nhất.

 3. Sau khi quyết định “Cái gì” để kiểm tra và “Ở đâu (trình duyệt)” được đưa ra - các quyết định về cơ sở hạ tầng phải được thực hiện - chúng ta có tool hay thực hiện thủ công?  một lần nữa, chi phí phải được xem xét. Tính khả thi, rủi ro, mối quan tâm về bảo mật, con người tham gia, thời gian, tiêu chuẩn chấp nhận, vấn đề / lỗi / lịch trình sửa lỗi / lỗi - là một vài điều cần phải giải quyết.

 4. Thực hiện thử nghiệm, các trường hợp kiểm thử chức năng thường xuyên có thể được sử dụng khi xác nhận hiệu quả của hệ thống. Đối với các trường hợp kiểm tra và hiển thị không cần thiết.

 5. Báo cáo kết quả cho nhóm thiết kế, nếu họ không tham gia vào quá trình thử nghiệm. 

Khi nào là thời điểm tốt nhất để thử nghiệm trình duyệt chéo?

Bất kỳ thử nghiệm nào cũng thu được những lợi ích tốt nhất khi nó được thực hiện sớm. Do đó, khuyến nghị là nên bắt đầu với nó ngay sau khi thiết kế trang có sẵn.

Nhưng nó cũng có thể được thực hiện khi trang web được tích hợp đầy đủ và chức năng.

Nếu bạn đã bỏ lỡ việc thực hiện kiểm tra trình duyệt chéo trong giai đoạn thiết kế, phát triển và QA, nó vẫn có thể được thực hiện trong khi ứng dụng đang trong quá trình sản xuất. Tuy nhiên, thời điểm này là tốn kém nhất và cực kỳ nguy hiểm.

Thử nghiệm tương thích trình duyệt được thực hiện ở đâu?

Thông thường, câu trả lời cho câu hỏi này sẽ là một trong các môi trường Dev / QA / Production. 

Một vài điểm cần lưu ý, kết luận:

Cross browser không nên nhầm lẫn với thử nghiệm Cross-Platform , ứng dụng này đang thử nghiệm ứng dụng của bạn trong nhiều môi trường đích như Windows, Linux, Mac, v.v. Mặc dù đôi khi cả hai phải tích hợp với nhau vì một số phiên bản trình duyệt cũ hơn có thể chỉ tương thích với các phiên bản cũ hơn của nền tảng.

Link tham khảo: https://www.softwaretestinghelp.com/how-is-cross-browser-testing-performed/