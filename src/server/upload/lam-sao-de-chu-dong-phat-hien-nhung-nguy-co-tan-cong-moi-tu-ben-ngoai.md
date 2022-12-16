Hàng ngày, theo thống kê từ các tổ chức uy tín như checkpoint, fireeye, kaspersky… có đến hàng triệu cuộc tấn công mới trên internet vào các hệ thống công nghệ thông tin.

Nguồn digitalattackmap:<br>
https://www.digitalattackmap.com/#anim=1&color=0&country=ALL&list=0&time=18763&view=map

Nguồn fireeye:<br>
https://www.fireeye.com/cyber-map/threat-map.html

Vậy phải làm sao để hệ thống security của doanh nghiệp có thể cập nhật được tri thức từ các cuộc tấn công mới như vậy? Từ đó có thể phát hiện sớm các nguồn tấn công này ngay từ khi chúng mới kết nối đến hệ thống của chúng ta.<br>

Cách tiếp cận mà mình nghĩ nhiều doanh nghiệp đang sử dụng:<br>
-	Phụ thuộc vào update của phía vendors: Sẽ có một số khó khăn cho doanh nghiệp như phần mềm security hết license thì không update được; Phần mềm đặt trong mạng nội bộ nên không kết nối ra ngoài internet để update được; không rõ vendors update những gì.
-	Chờ đợi cảnh báo C&C từ phía các tổ chức bảo mật uy tín trong nước để update phần mềm security hoặc chặn nguồn tấn công trên firewall. Luồng này mình thấy không hiệu quả và thông thường chỉ nhận một vài mã hash APT vào Việt Nam.
-	Tích hợp một số nguồn phổ biến để check như virustotal.com. Các nguồn này sẽ có giới hạn số lần check free/ngày và không thể check số lượng lớn.<br>

Thông thường các thông tin về nguy cơ tấn công vào hệ thống như vậy có khái niệm chung là IoC (Indicators of Compromise). Một IoC là một nguồn/dấu hiệu tấn công đã được xác minh là độc hại và chia sẻ trên internet. Một IoC có thể thuộc một số dạng sau:<br>
-	Md5: mã hash md5 của file độc hại.
-	Sha1/sha256: mã hash sha1/sha256 của file độc hại.
-	Domain: Domain độc hại của hacker.
-	IP: Địa chỉ IP của hacker.
-	URL: link được sử dụng để tấn công của hacker.

Vấn đề key points trong update IoC cho một tổ chức:<br>
-	 Dữ liệu IoCs càng nhiều càng có lợi cho tổ chức.
-	IoC update càng sớm thì tổ chức sẽ càng có thông tin sớm để phòng vệ và tốt nhất là nên realtime.

Thực tế thì doanh nghiệp của mình đang làm việc cũng từng gặp vấn đề về việc update tri thức các cuộc tấn công từ bên ngoài. Nếu như Việt Nam mình có một nguồn dữ liệu tập trung về các IoC này và chia sẻ cho các doanh nghiệp Việt Nam để phòng vệ thì tốt biết bao. Mình đã thử hỏi luồng TI (Threat Intelligence) của một số bên nhưng thường thì câu trả lời là họ không cung cấp dịch vụ tương tự.

Nếu không ai làm thì mình làm thôi.

Thế nên mình quyết định tự xây dựng hệ thống IoC Database cho GHTK (nơi mình đang làm việc). Link: https://ioc.ghtk.vn/

![](https://images.viblo.asia/5cbf84a3-3215-4563-b208-4664e2e1e8ec.PNG)

Thông tin IoC rải rác trên internet thì rất nhiều. Bây giờ vấn đề là ngồi thu thập và tổng hợp lại thông tin. Bên mình sử dụng nhiều nguồn IoC được public như: inquest, AlienVault, Sucicata…và tạo ra nhiều các job để chạy update tự động từ các nguồn này. Một phần trong số những IoC này cũng đến từ các chuyên gia bảo mật của GHTK trong quá trình phân tích mã độc và các cuộc tấn công vào hệ thống bên mình.

Một số thông số nổi bật của hệ thống này:
-	Tổng IoC hiện có: Hơn 51 triệu IoCs.
-	Update realtime 24/7.
-	Có thể tích hợp và query không giới hạn với các hệ thống bên mình.
-	Mỗi ngày có thêm khoảng 8000 IoCs mới được thêm mới.

Các bạn có thể search thử xem nha :D

![](https://images.viblo.asia/2407f5d6-447b-456e-8975-90b28552a038.PNG)

Bên mình sẵn sàng chia sẻ miễn phí nguồn dữ liệu IoC Database này cho các tổ chức,  doanh nghiệp có nhu cầu và có thể hợp tác với các bên/chuyên gia để cùng xây dựng hệ thống này. Nếu bạn mong muốn sử dụng nguồn dữ liệu IoC Database này thì có thể gửi email cho mình đến địa chỉ security@ghtk.co.

Nói đến đây thì có thể nhiều bạn sẽ thắc mắc các use-cases sử dụng khi có IoC Database này. Mình sẽ chia sẻ thêm một use-case mà mình nghĩ là cơ bản và dễ hiểu để mọi người hiểu hơn. Trên thực tế, nếu bạn làm trong lĩnh vực bảo mật thì bạn sẽ thấy nó có rất nhiều ứng dụng.

![](https://images.viblo.asia/2f48896c-9c13-4496-abd2-6ccb7d09f6da.PNG)

Luồng hoạt động của hệ thống có thể hiểu như sau:
-	Các máy tính của tổ chức sẽ đi ra internet qua một proxy để kiểm soát truy cập. Bên mình dùng squid.
-	Trong quá trình truy vấn DNS và ra internet qua proxy, các thông tin về domain và IP mà user truy cập sẽ được ghi log lại trên hệ thống.

![](https://images.viblo.asia/d89c1adb-3030-409e-bb88-e84d1ed8a287.PNG)

-	Mình sử dụng tiến trình filebeat để monitor file logs này và đẩy về hệ thống xử lý logs tập trung bên mình. Hệ thống đó là Graylog.
-	Trên Graylog mình cài đặt thêm plugin Geo-Location Processor để phân tích các Domain ra địa chỉ IP.
-	Mình đẩy các dữ liệu IoC dạng domain hoặc IP vào một lookup table trên Graylog để tiện cho việc viết rule tìm kiếm.
-	Việc còn lại viết rule mapping: nếu domain/IP người dùng đang truy vấn có trong danh sách IoC thì khả năng cao là máy tính đó có vấn đề và cần được kiểm tra. Mỗi lần trigger rule này thì Graylog sẽ bắn alert về telegram để cho mình dễ theo dõi.

Nói tóm lại, hệ thống IoC database sẽ giúp mình giám sát người dùng xem có kết nối lạ ra ngoài internet hay không thông qua logs của proxy.

Đây là ví dụ về alert trên telegram từ Graylog bắn ra cho bên mình:

![](https://images.viblo.asia/8f21acb7-9d2f-4ba5-b10b-09043d3c8945.PNG)

Đây là link thông tin phishing của domain này từ @malwrhunterteam: https://twitter.com/malwrhunterteam/status/1456160627441893376

Và điều quan trọng nhất là tất cả các thành phần trong use-case mình nói ở trên đều free. Nếu bạn là doanh nghiệp quy mô vừa và nhỏ, chưa tự chủ được về security thì có thể tham khảo để triển khai.<br>