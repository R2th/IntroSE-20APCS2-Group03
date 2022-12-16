# Lời nói đầu
Tình hình là gần đây mình đang phải làm báo cáo trên trường về các lỗ hổng bảo mật thường gặp trên các website, rồi còn phải demo khai thác các lỗ hổng này nữa chứ. Và trong quá trình tìm hiểu về các lỗ hổng website này, mình đã phát hiện ra rất nhiều công cụ hữu ích cho phép chúng ta scan các website một cách tự động để phát hiện lỗi thay vì phải test bằng cơm :).

Và thế là bài viết này xuất hiện với mục đích duy nhất là chia sẻ thông tin về một số công cụ mà mình biết. Chú ý là trong bài viết này mình sẽ chỉ nói qua về các tính năng và ưu nhược điểm của mỗi công cụ chứ không hướng dẫn chi tiết cách sử dụng, bạn nào cảm thấy hứng thú với tool nào thì có thể google cách dùng chi tiết nhé.

Lan man chém gió thế là đủ rồi, chúng ta hãy cùng đến với công cụ đầu tiên mà mình muốn giới thiệu đến các bạn nào (Lưu ý thứ tự xuất hiện của các công cụ chỉ là ngẫu nhiên chứ không liên quan gì đến độ phổ biến hay chất lượng của chúng đâu nhé)

# 1. VEGA
Vega là một phần mềm scan lỗ hổng website trên nền Java hỗ trợ Windows, Linux và OS X. Công cụ miễn phí và mã nguồn mở này cho phép bạn tìm và sửa lỗi chèn SQL, XSS và rò rỉ thông tin nhạy cảm.

Các tính năng & ưu điểm:
*	Crawl và quét lỗ hổng tự động
*	Proxy trung gian
*	Hỗ trợ module API JavaScript
*	Chia sẻ cơ sở dữ liệu
*	Phân tích nội dung

Nhược điểm:
*	Không có tiếng Việt
*	Không thể sử dụng online.
*	Giao diện GUI tương đối thân thiện tuy nhiên yêu cầu người dùng cần có một chút kiến thức về bảo mật để sử dụng hiệu quả (chả biết cái này nên xếp vào ưu hay nhược điểm cho hợp lý nữa :))

Sau khi scan website bằng VEGA, bạn sẽ nhận được một bảng kết quả phân loại và liệt kê chi tiết các hổng đang tồn tại như ở hình dưới đây.![](https://images.viblo.asia/a0289ed6-9d94-4afb-8618-8aa9c4e8623c.png)

# 2. CyStack Scan
CyStack Scan là công cụ quét lỗ hổng website, web server miễn phí được phát triển bởi CyStack. Hệ thống được tích hợp những công nghệ mới nhất về Plugins & Web fuzzing. Giúp cho việc kiểm tra bảo mật website và server trở nên dễ dàng. Phần mềm hoạt động hoàn toàn online và miễn phí.
Ưu điểm:
* Quét lỗ hổng bảo mật cho website và cả server
*	Sử dụng chung công nghệ với phần mềm premium của CyStack
*	Cơ sở dữ liệu được cập nhật thường xuyên giúp bảo vệ website khỏi  những rủi ro mới nhất
*	Hoạt động online, không cần cài đặt (truy cập https://scan.cystack.net để sử dụng)
*	Dễ sử dụng

Nhược điểm:
* Bản miễn phí giới hạn số lượt quét mỗi ngày
* Tool Free lại còn chạy online nên tốc độ scan khá chậm, có thể lên tới vài giờ đồng hồ

# 3. IBM Security App Scan Standard 
Một trong những phần mềm scan lỗ hổng website được tin dùng nhất trên thế giới - IBM Security AppScan, được phát hành bởi IBM – tập đoàn về máy tính có tuổi đời lớn nhất thế giới. Security AppScan có 2 phiên bản: Standard (dành cho doanh nghiệp vừa và nhỏ) & Enterprise (dành cho các tập đoàn lớn).![](https://images.viblo.asia/d2025d0a-d5d3-4fc6-a649-5719ec9a6d38.png)

Các chức năng chính:
*	Cung cấp kiến thức về bảo mật ứng dụng web
*	Scan ứng dụng web & mobile app để tìm lỗ hổng
*	Test Whitebox và blackbox
*	Đề xuất phương án khắc phục
*	Xuất báo cáo riêng theo đặc trưng từng ngành

Ưu điểm:
*	Dùng thử miễn phí
*	Giao diện tối giản, trình bày khoa học
*	Cung cấp kiến thức cần thiết cho người dùng (miễn phí)
*	Phát hiện được nhiều loại lỗ hổng khác nhau như: Cross-site scripting, SQL Injection, Command Injection, Path Traversal, etc.
*	Hỗ trợ 24/7

Nhược điểm:
*	Thủ tục download và sử dụng phần mềm tương đối phức tạp và tốn thời gian, do luật liên bang về xuất khẩu phần mềm ngặt nghèo của Mỹ.
*	Không hỗ trợ tiếng Việt. Dù dịch vụ khách hàng của IBM phục vụ 24/7 nhưng rào cản ngôn ngữ vẫn gây trở ngại phần nào cho người dùng Việt.
*	Chỉ hỗ trợ HĐH Windows.
*	Giá cao. Khởi điểm từ 11,000 USD/năm đối với bản Standard và 33,400 USD/năm đối với phiên bản Enterprise.

# 4. Burp Suite
Burp Suite là một công cụ được phát triển bởi công ty PortSwigger Ltd và được phân phối thành hai phiên bản Free và Professional. Đây là một công cụ được tích hợp nhiều tính năng nhằm kiểm tra tính bảo mật của web application. Công cụ này thâm nhập trong toàn bộ quá trình kiểm thử để xác định các lỗ hổng và khai thác chúng.
Burp Suite giúp người dùng kiểm tra và đánh giá các tiêu chí bảo mật của web như: Tiến hành kiểm tra cơ chế xác thực, kiểm tra các vấn đề về phiên bản người dùng, liệt kê và đánh giá các tham số đầu vào của trang web.

Lí do nên sử dụng Burp Suite: 
*	**Miễn phí** – phiên bản miễn phí của Burp Suite vẫn cho phép bạn sử dụng hầu hết các chức năng cơ bản như proxy server, web spider, intruder và repeater.
*	**Tiện lợi** – Burp Suite tính hợp sẵn rất nhiều công cụ với nhiều mục đích khác nhau cho bạn sử dụng giúp bạn không cần phải chạy quá nhiều ứng dụng cùng 1 lúc vì Burp Suite đã có thể làm tất cả rồi
*	**Cài đặt dễ dàng** - Để có thể chạy được nhiều ứng dụng Burpsuite người dùng chỉ cần cài một môi trường java sau đó click đúp vào file chạy là có thể sử dụng được.

Nhược điểm:
*	Tính năng Scan lỗ hổng web chỉ có ở phiên bản Pro
*	Cần có kiến thức chuyên môn về bảo mật để có thể sử dụng

# 5. Acunetix WVS
Acunetix WVS (Web Vulnerability Scanner) là chương trình tự động kiểm tra các ứng dụng Web để tìm kiếm lỗ hổng bảo mật như SQL Injection, hay CrossSite Scripting… Acunetix WVS quét lỗi cho ứng dụng Web dựa trên một cơ sở dữ liệu rộng lớn được cập nhật thường xuyên. Hỗ trợ tự động kiểm tra các mỗi nguy hiểm nhạy cảm khác của những website có thể truy cập bằng trình duyệt, hay những ứng dụng được xây dựng trên các kỹ thuật tiên tiến như AJAX.

Acunetix WVS cung cấp cho ta một dãy các công cụ như : Web Scanner, Site Crawer, Target Finder, Subdonmain Scanner…

Lí do nên lựa chọn sử dụng Acunetix:
*	Acunetix WVS là một công cụ quét lỗi cho ứng dụng Web dựa trên một cơ sở dữ liệu rộng lớn được cập nhật thường xuyên, với các thuật toán heuristic đáp ứng được các cơ chế hoạt động phức tạp của môi trường Web. 
*	 Acunetix WVS có thể tự động kiểm tra các lỗ hổng thông dụng và các lỗ hổng nhạy cảm khác của website, để thực hiện được điều này Acunetix WVS tiến hành scan theo quy trình như sau:
     *	Crawling toàn bộ website gồm tất cả các liên kết trên site và cả trong tập tin robots.txt sau đó hiển thị toàn bộ cấu trúc này một cách chi tiết.
     *	Sau khi tiến hành warling và khám phá trình trạng của ứng dụng web, Acunetix WVS tự động phát động các đợt tấn công đã được lập trình sẵn dựa trên các lỗ hổng, giống như khi website bị 1 hacker tấn công thực sự, phân tích các trang và những vị trí có thể nhập liệu cùng với các sự kết hợp khác nhau của dữ liệu đầu vào có thể làm cho website hiển thị những thông tin nhạy cảm.
       * Sau khi tìm ra các lỗ hổng, Acunetix WVS thông báo trên các “Alerts Node”, mỗi alert gồm các thông tin về lỗi cũng như các mối nguy hiểm có thể gặp phải và kèm theo các khuyến nghị về cách thức khắc phục.
        *	Sau khi tiến hành hoàn tất, Acunetix sẽ lưu thành request, với mức độ bảo mật website được đánh giá từ low, medium, high.

Nhược điểm:
* Trong quá trình quét rất tốn RAM và bộ nhớ.
* Khi quét trang web lớn tốn nhiều thời gian, chưa hỗ trợ chức năng tạm dừng, phải chờ đến khi quét xong.
* Là công cụ có phí, không công bố mã nguồn.
* Khó để có thể nghiên cứu sâu, tận dụng nhưng module có sẵn của nó để hỗ trợ cho việc xây dựng một công cụ của bản thân.

Dưới đây là giao diện kết quả khi scan website bằng acunetix, các bạn có thể xem qua ![](https://images.viblo.asia/1eac494a-8b40-4829-b6f6-0be6faf954f7.png)

# Tổng kết
Trên đây là một số công cụ mà mình đã tìm hiểu được trong quá trình làm báo cáo ở trường, tất nhiên là không có công cụ nào hoàn hảo cả, mỗi công cụ đều có những điểm mạnh và điểm yếu riêng của mình. Tuỳ vào điều kiện và mục đích sử dụng các bạn có thể lựa chọn cho mình một trong số công cụ trên (hoặc là tool khác cũng được, tool trên mạng thì nhiều không đếm xuể) để kiểm tra các lỗ hổng trên website.

Mong là qua bài viết của của mình các bạn đã có đủ những thông tin cần thiết để lựa chọn cho mình một công cụ kiểm thử phù hợp. Hẹn gặp lại các bạn trong những bài viết tiếp theo