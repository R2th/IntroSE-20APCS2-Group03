Mạng của bạn thỉnh thoảng bị chậm bất thường hay mất kết nối đột ngột, nguyên nhân có thể do một cuộc tấn công Denial-of-Service đang được tiến hành, hãy cùng tìm hiểu xem đó là gì? Cách khắc phục như thế nào?
## 1. Tấn công Denial-of-Service (DoS) là gì?
![DoS](https://images.viblo.asia/1db9ca91-71c1-4462-b937-0fa518a48143.png)

Denial-of-Service (DoS) là một cuộc tấn công nhằm tắt máy hoặc ngắt kết nối, khiến người dùng ngừng truy cập. Các cuộc tấn công DoS thường hoạt động bằng cách áp đảo hoặc làm quá tải mục tiêu với các request cho đến khi không thể xử lý, dẫn đến từ chối dịch vụ cho người dùng. Trong cả hai trường hợp, DoS đều tước quyền sử dụng dịch vụ hoặc tài nguyên hợp pháp của người dùng. Một cuộc tấn công DoS được đặc trưng bằng cách sử dụng một máy tính duy nhất để khởi động cuộc tấn công.

Nạn nhân của các cuộc tấn công DoS thường là email, website, tài khoản trực tuyến... ngoài ra còn có mạng, máy hoặc một chương trình. Mặc dù DoS khó để đánh cắp thông tin quan trọng, nhưng chúng có thể khiến nạn nhân phải mất rất nhiều thời gian và tiền bạc để giải quyết hậu quả. Bởi vì một cuộc tấn công DoS có thể dễ dàng được thực hiện từ bất kỳ đối tượng nào, việc tìm kiếm người chịu trách nhiệm rất khó khăn.

Có hai phương pháp tấn công DoS: Flooding attack hoặc crashing attack.

Tấn công flooding xảy ra khi hệ thống nhận quá lưu lượng truy cập tối đa, khiến hệ thống chạy chậm lại và cuối cùng dừng lại. Các hình thức tấn công flooding phổ biến bao gồm:
- **Buffer overflow attacks**  - Cuộc tấn công DoS phổ biến nhất. Buffer overflow có thể khiến máy tiêu tốn hết hard disk space, memory hoặc CPU time có sẵn. Hình thức này thường làm cho hành vi chậm chạp, gây ra sự cố hệ thống... dẫn đến từ chối dịch vụ.
- **ICMP flood**  - Lợi dụng các thiết bị mạng bị cấu hình sai. Trước tiên, gửi các gói tin giả mạo để ping mọi máy tính đang truy cập vào mạng mục tiêu, sau đó khuếch đại lưu lượng mạng. Cuộc tấn công này còn có tên khác là **smurf attack** hoặc **ping of death**.
- **SYN flood**  - Thường gọi là three-way handshake nhưng chỉ kết nối host và server. Server nhận được request để handshake, nhưng handshake không bao giờ hoàn thành. Tiếp tục cho đến khi tất cả các ports được mở đều bão hòa với các request và không còn chỗ cho người dùng hợp pháp.

Tấn công crashing khai thác các lỗ hổng hệ thống hoặc dịch vụ. Trong các cuộc tấn công này, tận dụng các lỗi trong mục tiêu sau đó khiến hệ thống bị sập hoặc tổn hại nghiêm trọng, do đó không thể truy cập hoặc tạm ngừng sử dụng nó.
## 2. Cách DoS attack hoạt động
Trọng tâm chính của một cuộc tấn công DoS là làm quá tải công suất của máy được nhắm mục tiêu, dẫn đến việc từ chối dịch vụ đối với các yêu cầu bổ sung.

Có nhiều điểm tương đồng giữa một cuộc tấn công DoS và các lỗi kết nối mạng không độc hại như: Sự cố kỹ thuật mạng, hệ thống bảo trì.. Tuy nhiên, các triệu chứng sau đây có thể chỉ ra một cuộc tấn công DoS:
- Hiệu suất mạng chậm một cách bất thường như tải tệp hoặc website chậm
- Không thể tải bất kỳ website nào
- Mất kết nối đột ngột giữa các thiết bị trên cùng một mạng

Cách tốt nhất để phát hiện và xác định một cuộc tấn công DoS sẽ là thông qua giám sát và phân tích lưu lượng mạng. Lưu lượng mạng có thể được giám sát thông qua tường lửa hoặc hệ thống phát hiện xâm nhập.

Một cuộc tấn công DoS ngăn người dùng truy cập dịch vụ bằng cách làm quá tải các tài nguyên vật lý hoặc kết nối mạng của họ. Cuộc tấn công về cơ bản làm ngập dịch vụ với rất nhiều lưu lượng hoặc dữ liệu mà không ai khác có thể sử dụng cho đến khi luồng độc hại được xử lý.

Một cách để làm quá tải tài nguyên vật lý của dịch vụ là gửi cho nó rất nhiều yêu cầu trong một thời gian ngắn đến mức nó chiếm hết hard disk space, memory hoặc CPU time có sẵn. Trong trường hợp cực đoan, điều này thậm chí có thể dẫn đến thiệt hại của các thành phần vật lý cho các tài nguyên này.

Tương tự, để phá vỡ các kết nối mạng của dịch vụ, một cuộc tấn công DoS có thể gửi input không hợp lệ, không đúng định dạng hoặc chỉ là một số lượng lớn yêu cầu kết nối đến nó. Trong khi những điều này đang được giải quyết, các yêu cầu kết nối từ người dùng hợp pháp không thể được hoàn thành. 

Đôi khi, một cuộc tấn công DoS khai thác lỗ hổng trong chương trình hoặc website để buộc sử dụng tài nguyên hoặc kết nối mạng không đúng cách, điều này cũng dẫn đến việc từ chối dịch vụ.

Một số phần mềm độc hại cũng bao gồm khả năng khởi chạy các cuộc tấn công DoS. Khi chúng lây nhiễm máy tính hoặc thiết bị, những mối đe dọa này có thể sử dụng tài nguyên của các máy bị nhiễm để thực hiện cuộc tấn công. Nếu nhiều máy bị nhiễm khởi chạy các cuộc tấn công vào cùng một mục tiêu, thì đó được gọi là cuộc tấn công Distributed-Denial-of-Service (DDoS).

Khối lượng dữ liệu được sử dụng trong một cuộc tấn công DoS hoặc DDoS có thể rất lớn, lên tới tốc độ vài gigabit mỗi giây. Botnet thường được sử dụng để thực hiện các cuộc tấn công DDoS, vì nhiều dịch vụ không có tài nguyên cần thiết để chống lại một cuộc tấn công từ hàng ngàn, thậm chí hàng trăm ngàn thiết bị bị nhiễm.

Không giống như virus hoặc malware, một cuộc tấn công DoS không phụ thuộc vào một chương trình để chạy. Thay vào đó, nó lợi dụng một lỗ hổng cố hữu trong cách các mạng máy tính giao tiếp.

Ví dụ: Giả sử bạn muốn truy cập một website thương mại điện tử để mua quà tặng. Máy tính của bạn gửi một gói thông tin nhỏ đến website. Gói này hoạt động như một lời chào, mang thông điệp "Hi, I’d like to visit you, please let me in". Khi server nhận được tin nhắn trên máy tính của bạn, nó sẽ gửi lại một tin nhắn ngắn, giống như "OK, are you real?". Máy tính của bạn phản hồi "Yes!" và kết nối được thiết lập. Máy tính của bạn và server tiếp tục liên lạc khi bạn nhấp vào liên kết, đặt hàng và thực hiện công việc khác.

Trong một cuộc tấn công DoS, một máy tính được trang bị để gửi không chỉ một lời giới thiệu vào một server, mà là hàng trăm hoặc hàng ngàn. Server không thể biết các lời giới thiệu là giả, gửi lại response, đợi tối đa một phút trong mỗi trường hợp để nghe response. Khi không nhận được response, server sẽ tắt kết nối và máy tính thực hiện cuộc tấn công lặp lại, gửi một loạt yêu cầu giả mạo mới.

Các cuộc tấn công DoS chủ yếu ảnh hưởng đến các tổ chức, các kết nối. Đối với người dùng, các cuộc tấn công cản trở truy cập dịch vụ, website.

Có nhiều nguyên nhân gây ra cuộc tấn công DoS, nhưng phần lớn vì lợi nhuận:
- Rất nhiều trường hợp các cuộc tấn công DoS được đưa ra vì lý do cá nhân. Các dịch vụ bị tấn công có thể bị chậm lại hoặc bị sập trong khoảng thời gian từ vài giờ đến vài ngày. Đối với nhiều doanh nghiệp gây gián đoạn kết nối, thậm chí tổn thất tài chính.
- Vì sự cạnh tranh của công ty hoặc chính trị.
## 3. Cách ngăn chặn DoS attack
Một quy tắc chung: Bạn càng sớm xác định được một cuộc tấn công đang diễn ra, bạn càng có thể nhanh chóng ngăn chặn thiệt hại. Dưới đây là một số điều bạn có thể làm.

**Phương pháp 1: Dùng các công cụ nhận biết các cuộc tấn công**

Các công ty thường sử dụng công nghệ hoặc dịch vụ chống DDoS để giúp tự vệ. Những thứ này có thể giúp bạn nhận ra giữa các đột biến hợp pháp bất thường trong lưu lượng mạng và một cuộc tấn công DDoS.

**Phương pháp 2: Liên hệ với nhà cung cấp dịch vụ Internet**

Nếu bạn thấy công ty của mình đang bị tấn công, bạn nên thông báo cho nhà cung cấp dịch vụ Internet của mình càng sớm càng tốt.

**Phương pháp 3: Black hole routing**

Các nhà cung cấp dịch vụ Internet có thể sử dụng black hole routing. Nó hướng lưu lượng truy cập quá mức vào một tuyến đường rỗng, còn được gọi là black hole. Điều này có thể giúp ngăn chặn website hoặc mạng mục tiêu bị sập. Cả lưu lượng hợp pháp và bất hợp pháp đều được định tuyến.

**Phương pháp 4: Cấu hình firewalls và routers**

Firewalls và routers nên được cấu hình để từ chối lưu lượng không có thật. Hãy cập nhật firewalls và routers với các bản vá bảo mật mới nhất.

**Phương pháp 5: Front-end hardware**

Front-end hardware được tích hợp vào mạng trước khi lưu lượng truy cập đến máy chủ có thể giúp phân tích và sàng lọc các gói dữ liệu. Ngoài ra cũng có thể giúp chặn dữ liệu đe dọa.

Nếu không có biện pháp phòng vệ đầy đủ, chỉ cần khởi động lại dịch vụ, nhưng có thể không có hiệu quả nếu cuộc tấn công chưa chấm dứt.
## 4. Phân biệt DDoS attack và DOS attack
![DoS and DDoS](https://images.viblo.asia/18d1061e-7c5a-4787-8fa5-e8f13601c44e.png)

Distributed-Denial-of-Service (DDoS) là một loại tấn công DoS xuất phát từ nhiều nguồn phân tán, chẳng hạn như tấn công DDoS botnet.

Các cuộc tấn công DoS thường khai thác các lỗ hổng bảo mật có trong thiết kế mạng, phần mềm và phần cứng. Các cuộc tấn công này đã trở nên ít phổ biến hơn vì các cuộc tấn công DDoS có khả năng đột phá lớn hơn và tương đối dễ dàng để tạo ra các công cụ có sẵn. Trong thực tế, hầu hết các cuộc tấn công DoS cũng có thể được chuyển thành các cuộc tấn công DDoS.

DoS sử dụng một kết nối duy nhất, trong khi một cuộc tấn công DDoS sử dụng nhiều nguồn lưu lượng tấn công, thường ở dạng botnet.

Các cuộc tấn công DDoS được coi là bước tiếp theo trong quá trình phát triển các cuộc tấn công DoS. Tội phạm mạng bắt đầu sử dụng các cuộc tấn công DDoS vào khoảng năm 2000. Đây là lý do tại sao các cuộc tấn công DDoS đã trở thành vũ khí được lựa chọn để phá vỡ các kết nối, server và website.

Các lỗ hổng bảo mật trong các thiết bị Internet-of-Things có thể dễ dàng khởi chạy các cuộc tấn công DDoS. 

Một cuộc tấn côn DDoS xảy ra khi nhiều máy đang hoạt động cùng nhau để tấn công một mục tiêu. Những kẻ tấn công DDoS thường tận dụng việc sử dụng botnet. Một nhóm các thiết bị kết nối internet bị tấn công để thực hiện các cuộc tấn công quy mô lớn. Kẻ tấn công lợi dụng các lỗ hổng bảo mật hoặc điểm yếu của thiết bị để kiểm soát nhiều thiết bị sử dụng phần mềm. Khi đã kiểm soát, kẻ tấn công có thể ra lệnh cho botnet của họ tiến hành DDoS trên mục tiêu. Trong trường hợp này, các thiết bị bị nhiễm cũng là nạn nhân của vụ tấn công.

DDoS cho phép gửi nhiều yêu cầu theo cấp số nhân đến mục tiêu, do đó tăng sức mạnh tấn công. Nó cũng làm tăng khó khăn của sự quy kết, vì nguồn gốc của cuộc tấn công khó xác định hơn. Ngược lại, một cuộc tấn công DoS thường sử dụng một máy tính và một địa chỉ IP duy nhất để tấn công mục tiêu của nó, giúp chống lại dễ dàng hơn.

DDoS cung cấp cho kẻ tấn công nhiều lợi thế:
- Tận dụng khối lượng máy lớn hơn để thực hiện một cuộc tấn công gây rối nghiêm trọng
- Vị trí của cuộc tấn công rất khó phát hiện do sự phân phối ngẫu nhiên của các hệ thống tấn công (thường là trên toàn thế giới)
- Việc tắt nhiều máy khó hơn một
- Nhóm tấn công thực sự rất khó xác định, vì chúng được ngụy trang đằng sau nhiều hệ thống

Các công nghệ bảo mật hiện đại đã phát triển các cơ chế để chống lại hầu hết các hình thức tấn công DoS, nhưng do các đặc điểm độc đáo của DDoS, nó vẫn được coi là mối đe dọa cao và là mối quan tâm cao hơn đối với các tổ chức.

Tham khảo:
- [What is a denial of service attack (DoS) ?](https://www.paloaltonetworks.com/cyberpedia/what-is-a-denial-of-service-attack-dos)
- [What is a Denial-of-Service (DoS) Attack?](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)
- [What are Denial of Service (DoS) attacks? DoS attacks explained](https://us.norton.com/internetsecurity-emerging-threats-dos-attacks-explained.html)
- [Denial of Service (DoS)](https://www.f-secure.com/v-descs/articles/denial-of-service.shtml)