Testing Internet of things (IoT)
1.	IoT là gì
a.	Định nghĩa
-	Mạng lưới vạn vật kết nối Internet hoặc là Mạng lưới thiết bị kết nối Internet viết tắt là IoT (tiếng Anh: Internet of Things) 
-	Là một kịch bản trong đó các thiết bị được gắn các định danh và liên lạc, trao đổi thông tin với nhau mà không cần tương tác trực tiếp với con người
-	Phát triển dựa trên sự phát triển của công nghệ không dây, công nghệ cơ vi điện tử và internet.
b.	Đặc tính cơ bản
-	Tính kết nối liên thông(interconnectivity): với IoT, bất cứ điều gì cũng có thể kết nối với nhau thông qua mạng lưới thông tin và cơ sở hạ tầng liên lạc tổng thể.
-	Những dịch vụ liên quan đến “Things”: hệ thống IoT có khả năng cung cấp các dịch vụ liên quan đến “Things”
-	Tính không đồng nhất: Các thiết bị trong IoT là không đồng nhất vì nó có phần cứng khác nhau, và network khác nhau. Các thiết bị giữa các network có thể tương tác với nhau nhờ vào sự liên kết của các network.
-	Thay đổi linh hoạt: Status của các thiết bị tự động thay đổi, ví dụ, ngủ và thức dậy, kết nối hoặc bị ngắt, vị trí thiết bị đã thay đổi,và tốc độ đã thay đổi… Hơn nữa, số lượng thiết bị có thể tự động thay đổi.
-	Quy mô lớn: Sẽ có một số lượng rất lớn các thiết bị được quản lý và giao tiếp với nhau. Số lượng này lớn hơn nhiều so với số lượng máy tính kết nối Internet hiện nay. Số lượng các thông tin được truyền bởi thiết bị sẽ lớn hơn nhiều so với được truyền bởi con người.
c.	Yêu cầu với hệ thống IoT
-	Kết nối dựa trên sự nhận diện: Bởi các “ Things” kết nối dựa trên định danh của chúng.
-	Khả năng cộng tác: hệ thống IoT khả năng tương tác qua lại giữa các network và Things.
-	Khả năng tự quản của network: Bao gồm tự quản lý, tự cấu hình, tự khắc phục lỗi, tự tối ưu hóa và tự có cơ chế bảo vệ. Điều này cần thiết để network có thể thích ứng với các domains ứng dụng khác nhau, môi trường truyền thông khác nhau, và nhiều loại thiết bị khác nhau
-	Dịch vụ thoả thuận: dịch vụ này để có thể được cung cấp bằng cách thu thập, giao tiếp và xử lý tự động các dữ liệu giữa các “Things” dựa trên các quy tắc(rules) được thiết lập bởi người vận hành hoặc tùy chỉnh bởi các người dùng
-	Các Khả năng dựa vào vị trí(location-based capabilities): Thông tin liên lạc và các dịch vụ liên quan đến một cái gì đó sẽ phụ thuộc vào thông tin vị trí của Things và người sử dụng. Hệ thống IoT có thể biết và theo dõi vị trí một cách tự động. Các dịch vụ dựa trên vị trí có thể bị hạn chế bởi luật pháp hay quy định, và phải tuân thủ các yêu cầu an ninh.
-	Bảo mật: Trong IoT, nhiều “Things” được kết nối với nhau. Chình điều này làm tăng mối nguy trong bảo mật, chẳng hạn như bí mật thông tin bị tiết lộ, xác thực sai, hay dữ liệu bị thay đổi hay làm giả
-	Bảo vệ tính riêng tư: tất cả các “Things” đều có chủ sở hữu và người sử dụng của nó. Dữ liệu thu thập được từ các “Things” có thể chứa thông tin cá nhân liên quan chủ sở hữu hoặc người sử dụng nó. Các hệ thống IoT cần bảo vệ sự riêng tư trong quá trình truyền dữ liệu, tập hợp, lưu trữ, khai thác và xử lý. Bảo vệ sự riêng tư không nên thiết lập một rào cản đối với xác thực nguồn dữ liệu
-	Plug and play: các Things phải đáp ứng tiêu chuẩn plug-and-play một cách dễ dàng và tiện dụng.
-	Khả năng quản lý: hệ thống IoT cần phải hỗ trợ tính năng quản lý các “Things” để đảm bảo network hoạt động bình thường. Ứng dụng IoT thường làm việc tự động mà không cần sự tham gia người, nhưng toàn bộ quá trình hoạt động của chúng nên được quản lý bởi các bên liên quan.
d.	Ứng dụng của IoT
-	IoT có mặc ở hầu hết các lĩnh vực trong đời sống: 
o	Trong y tế: IoT sử dụng để theo dõi sức khỏe từ xa: huyết áp, nhịp tim, nhịp thở,…
o	Mua sắm online
o	Quản lý các thiết bị chiếu sáng công cộng, đèn giao thông, ….
o	…
2.	Công nghê IoT
-	Thẻ RFID [Mã tần số vô tuyến] và EPC [Mã sản phẩm điện tử]
-	NFC [Giao tiếp trường gần] được sử dụng để cho phép tương tác hai chiều giữa các thiết bị điện tử. Đây là cơ bản cho các điện thoại thông minh và chủ yếu được sử dụng để thực hiện các giao dịch thanh toán không tiếp xúc.
-	Bluetooth: Điều này được sử dụng khi các liên lạc tầm ngắn. Điều này chủ yếu được sử dụng trong công nghệ wearable (là một từ được dùng để gọi chung tất cả những phụ kiện có tích hợp bộ xử lý máy tính, công nghệ điện tử và nhiều tính năng hữu ích khác mà người ta có thể đeo trên người được).
-	Z-Wave: Đây là công nghệ RF công suất thấp. Này chủ yếu được sử dụng cho tự động hóa nhà, đèn kiểm soát vv.
-	WiFi: Đây là lựa chọn được sử dụng phổ biến nhất cho IoT. Khi sử dụng mạng LAN, điều này giúp chuyển các tệp, dữ liệu và tin nhắn một cách liền mạch.
3.	Testing IoT:
-	Lấy ví dụ về kiểm soát giao thông dựa trên IoT. Trong đó các thành phần như đèn chiếu sáng, đèn giao thông, các camera, các điểm chắn tàu ,… sẽ được điều chỉnh tự động thông qua hệ thống trung tâm. Từ đó các thông số, báo cáo sẽ được gửi trực tiếp về cho người phụ trách
-	Chúng ta mô tả việc kiểm thử hệ thống này:
o	Khả năng sử dụng: Ta cần đảm bảo khả năng sử dụng các thiết bị trong hệ thống. Các thiết bị có thể hiển thị không chỉ các thông báo mà còn đưa ra các lỗi , cảnh báo … Hệ thống có thể ghi lại các sự kiện: bao nhiêu đèn giao thông, đèn chiếu sáng, camera bị sự cố, ở đâu đang có sự cố giao thông, vi phạm luật giao thông, …
o	An ninh IoT: Vì các thiết bị được kết nối dữ liệu với nhau nên chúng ta cần kiểm tra xem dữ liệu được bảo vệ / mã hóa khi nhận được chuyển từ thiết bị này sang thiết bị khác. Do đây là một hệ thống quan trọng liên quan đến an ninh nên việc kiểm soát thông tin, kiểm soát chức năng cần được kiểm tra cẩn thận và liên tục. Bất cứ nơi nào, có một giao diện người dùng, chúng tôi cần phải đảm bảo có một mật khẩu bảo vệ trên đó.
o	Kết nối: Hệ thống phải luôn sẵn sàng và phải có kết nối liền mạch với các bên thiết bị. Khi hệ thống bị ngắt kết nối thì phải có một cảnh báo mà có thể nhắc nhở những người quản lý để họ có thể bắt đầu theo dõi, khắc phục các thiết bị có sự cố, hay tạm thời kiểm soát bằng tay hoặc hệ thống dự phòng . Mặt khác, phải có một cơ chế trong hệ thống có thể lưu trữ tất cả dữ liệu trong nó trong thời gian offline. Khi hệ thống trực tuyến, tất cả dữ liệu đó sẽ được truyền đi. Không được để mất dữ liệu trong bất kì tình huống nào
o	Hiệu năng: Khi có một hệ thống kiểm soát giao thông. Thường hệ thống đó phải đáp ứng với nhu cầu của 1 khu vực thậm chí của 1 đát nước có quy mô lớp gấp nhiều lần quy mô trong điều kiện kiểm thử. Chúng ta cần đảm bảo rằng: hệ thống hoạt động giống nhau mặc dù lượng dữ liệu lớn hơn được truyền đi. Chúng ta cũng nên kiểm tra các tiện ích giám sát để hiển thị việc sử dụng hệ thống: điện năng sử dụng, các thiết bị đang hoạt động hay sự cố
o	Khả năng tương thích
Vì có nhiều thiết bị, nhiều loại phần cứng, hệ điều hành, ứng dụng làm việc với nhau nên khả năng tương thích phải được kiểm thử một cách cẩn trọng.
o	Test mẫu
Như đã nói ở trên, khi ta thử nghiệm trên Lab sẽ có quy mô nhỏ hơn nhiều so với thực tế. Chúng ta cần thực hiện kiểm thử một số lượng quy mô nhất định trong phạm vi 1 khu vực để tiếp nhận các phản hồi. 
o	Kiểm thử quy định
Vì một hệ thống kiểm soát giao thông cần tuân thủ một số quy định riêng. Ta cần kiểm thử đảm bảo hệ thống đáp ứng tốt các quy định này
o	Kiểm thử nâng cấp
IoT là sự kết hợp của nhiều giao thức, thiết bị, hệ điều hành, phần mềm, phần cứng, lớp mạng, v.v.
Khi nâng cấp được thực hiện, có thể là cho hệ thống hoặc cho bất kỳ mục nào liên quan như đã nêu ở trên, cần thực hiện kiểm tra hồi quy triệt để / chiến lược nên được chấp nhận để khắc phục các vấn đề liên quan đến nâng cấp.
4.	Các công cụ Testing IoT
-	Phần mềm:
o	Wireshark: Đây là một ứng dụng mã nguồn mở được sử dụng để giám sát lưu lượng truy cập trong giao diện, địa chỉ máy chủ nguồn / đích, v.v.
o	Tcpdump: Thao tác này tương tự như của Wireshark ngoại trừ việc này không có GUI. Đây là tiện ích dựa trên dòng lệnh giúp người dùng hiển thị TCP / IP và các gói khác được truyền hoặc nhận qua mạng.
-	Phần cứng:
o	JTAG Dongle: Điều này tương tự như một trình gỡ lỗi trong các ứng dụng PC. Điều này giúp gỡ lỗi mã nền tảng mục tiêu và hiển thị từng bước biến.
o	Digital Storage Oscilloscope: Được sử dụng để kiểm tra các sự kiện khác nhau với tem thời gian, ổn định trong cung cấp điện, kiểm tra tính toàn vẹn tín hiệu.
o	Software Defined Radio: Điều này được sử dụng để mô phỏng máy thu và bộ phát cho một phạm vi lớn các cổng không dây.
5.	Tổng kết:
-	Cách tiếp cận thử nghiệm IoT có thể khác nhau dựa trên hệ thống / kiến trúc có liên quan. Những người kiểm thử nên tập trung nhiều hơn vào cách tiếp cận Test-As-A-User [TAAS] hơn là thử nghiệm dựa trên các yêu cầu.
-	Một trong những yêu cầu chính trong thử nghiệm IoT là kiểm thử tích hợp. IoT thành công nếu kế hoạch kiểm thử tích hợp là chính xác và đủ mạnh để bắt gặp lỗi trong hệ thống.
-	IOT thử nghiệm có thể là một công việc khó khăn / đầy thử thách nhưng, nó cũng rất thú vị cũng như cho nhóm thử nghiệm để chứng nhận một mạng lưới phức tạp của các thiết bị, giao thức, phần cứng, hệ điều hành, firmware vv