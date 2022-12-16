# Tấn công từ chối dịch vụ - DDOS là gì?
![](https://images.viblo.asia/57df40da-269d-440c-9ad4-ff4af8e258c3.jpg)
Theo Wikipedia: 
> Một cuộc tấn công từ chối dịch vụ (**tấn công DoS - viết tắt của Denial of Service**) hay tấn công từ chối dịch vụ phân tán (**tấn công DDoS - viết tắt của Distributed Denial of Service**) là một nỗ lực làm cho những người dùng không thể sử dụng tài nguyên của một máy tính.  Có thể động cơ, mục tiêu của tấn công từ chối dịch vụ có thể khác nhau, nhưng nói chung nó gồm có sự phối hợp, sự cố gắng ác ý của một người hay nhiều người để một trang, hay hệ thống mạng không thể sử dụng, làm gián đoạn, hoặc làm cho hệ thống đó chậm đi một cách đáng kể với người dùng bình thường, bằng cách làm quá tải tài nguyên của hệ thống.

Một phương thức tấn công phổ biến kéo theo sự bão hoà máy mục tiêu với các yêu cầu liên lạc bên ngoài, đến mức nó không thể đáp ứng giao thông hợp pháp, hoặc đáp ứng quá chậm. Trong điều kiện chung, các cuộc tấn công DoS được bổ sung bởi ép máy mục tiêu khởi động lại hoặc tiêu thụ hết tài nguyên của nó đến mức nó không cung cấp dịch vụ, hoặc làm tắc nghẽn liên lạc giữa người sử dụng và nạn nhân.

# Các phương thức tấn công
![](https://images.viblo.asia/6e5e4dd7-af38-4466-b1d1-4bd121a3edcf.jpg)

### Tấn công vào băng thông mạng
Tin tặc sử dụng chiến thuật cơ bản, ai là người nhiều tài nguyên hơn sẽ thắng. Không những băng thông mạng của nạn nhân bị quá tải mà còn ảnh hưởng đến các mạng lân cận.
### Tấn công vào giao thức
Internet hoạt động nhờ vào các giao thức, đơn giản là cách thức chuyển một đối tượng từ điểm A đến điểm B trên mạng. Kiểm tấn công này bao gồm Ping of Death, SYN Flood, sửa đổi gói tinvà các dạng khác.
### Tấn công vào lớp ứng dụng
Các ứng dụng máy chủ web (Windows IIS, Apache, …) là đối tượng thường xuyên bị tấn công. Xu hướng mới của tin tặc hướng tới là các nền tảng ứng dụng WordPress, Joomla…
1. **Tấn công HTTP Flood Tin** tặc sử dụng request GET/POST làm quá tải khả năng phản hồi của máy chủ web. Đây là dạng tấn công vào băng thông, không cần có những gói tin xấu, kĩ thuật giả mạo hoặc các kỹ thuật phản xạ để khuếch tán và tăng dung lượng của cuộc tấn công. Cách tấn công này thông qua HTTP và HTTPS rất dễ dàng thực hiện, giá thành rẻ với hàng nghìn request tạo ra trong một giây.
2. **Tấn công từ chối dịch vụ lợi dung giao thức SSDP** (Simple Service Discovery Protocol) Simple Service Discovery Protocol (SSDP) thường được sử dụng cho các thiết bị Plug & Play (UPnP). Bắt đầu từ năm 2014, tin tặc đã lợi dụng giao thức thức này tấn công từ chối dịch vụ. Đây là mũi tấn công khá mới nhằm vào các cổng SSDP (1900) và cổng đích 7 (echo). Báo cáo mới nhất cho thấy tấn công SSDP có khả năng khuếch đại tấn công lên tới 30 lần.
3. **Tấn công vào giao thức UDP** (Datagram Protocol ) Tấn công từ chối dịch vụ vào giao thức UDP sẽ khiến tắc nghẽn nhiều cổng trên máy chủ web của bạn bằng các gói tin. Nó buộc máy chủ phản hồi liên tục dẫn đến cạn kiệt tài nguyên. UDP là một giao thức vô hướng, có nghĩa là nó không thẩm định địa chỉ IP nguồn. Tấn công UDP thường đi liền với tấn công từ chối dịch vụ phản xạ phân tán.
4. **Tấn công lợi dụng các máy chủ DNS**  (Domain Name Server) Lợi dụng các máy chủ DNS trên khắp thế giới đánh sập máy chủ web của bạn với lưu lượng DNS phản hồi. Máy chủ sẽ không thể phản hồi lại được với các lưu lượng hợp lệ từ người dùng.

# Cách nhận biết một cuộc tấn công đang diễn ra
Không phải tất cả các sự gián đoạn của dịch vụ là kết quả của một cuộc tấn công từ chối dịch vụ. Có thể có các vấn đề kỹ thuật với một mạng luwois cụ thể hoặc người quản trị hệ thống thực hiện bảo trì. Tuy nhiên các triệu chứng sau đây có thể chỉ ra một cuộc tấn công DOS hoặc DDOS từ các hệ thống website hay các website:
1. Thực trạng cho thấy mạng của bạn hay hệ thống bị chậm một cách bất thường (mở file hay truy cập vào website)
2. Một trang cụ thể nào đó của website không thể truy cập được.
3. Không thể truy cập vào bất kỳ trang website nào
4. Gia tăng đáng kể lượng thư rác mà bạn nhận được trong tài khoản.

> DDoS có nhiều dạng, nhiều biến thể tấn công nhưng tựu chung có một mục đích: làm cho người dùng hệ thống không thể sử dụng được dịch vụ của hệ thống. DDoS có hai dạng chính:
> 1. Làm ngập băng thông khiến cho người dùng không thể truy cập dịch vụ. Làm cho dịch vụ hoàn toàn tê liệt vì hết tài nguyên khiến cho người dùng không thể truy cập dịch vụ.
> 2. Chống đỡ hai dạng trên đều đòi hỏi gia tăng tài nguyên (băng thông, CPU, diskspace, memory). Tài nguyên càng phát tán rộng ra nhiều network càng tốt.

# Phương thức phòng chống
### Sử dụng phương pháp - định tuyến hố đen
Đây là một giải pháp được đa số quản trị viên mạng thực hiện để phòng tránh các cuộc tấn công Dos/DDos. Bạn cần tạo một tuyến đường lỗ đen để chuyển cá traffic vào đó. Nhằm tránh tình trạng quá tải trên hệ thống. Khi website gặp phải một cuộc tấn công từ chối dịch vụ, nhà cung cấp dịch vụ internet có thể đưa tất cả lưu lượng truy cập quá tải từ website vào lỗ đen để tự bảo vệ mình.
### Giới hạn truy cập
Việc giới hạn số lượng yêu cầu trong khả năng máy chủ có thể chấp nhận trong một khoảng thời gian nhất định là cách tốt nhất để giảm thiểu hậu quả Dos/DDos gây ra.Việc giới hạn gửi yêu cầu sẽ làm chậm quá trình tấn công của tin tặc. Tuy nhiên, nếu chỉ sử dụng một phương pháp này thì các hacker vẫn có thể khiến bạn gặp rắc rối với các kiểu DDos phức tạp.
### Tường lửa ứng dụng web (Web Application Firewall)
Sử dụng tường lửa ứng dụng web (WAF) là một biện pháp giảm thiểu các cuộc tấn công DDos tầng 7. Theo đó, WAF sẽ lọc các yêu cầu truy cập dựa vào một quy tắc nhất định. Từ đó giúp máy chủ tránh khỏi một số lượng truy cập độc hại.
### Anycast Network Diffusion
Phương pháp này giúp máy chủ tránh khỏi tình trạng quá tải. Anycast cũng giống như chuyển nước từ một con sông lớn sang các kênh nhỏ hơn. Cách thức xử lý này cho phép chuyển lượng traffic Dos/DDos đến các điểm có thể quản lý được.