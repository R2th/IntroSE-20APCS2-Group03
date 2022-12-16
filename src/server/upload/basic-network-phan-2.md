### I. ICMP (Internet Control Message Protocol) (Ping) & Traceroute
-	ICMP có thể hiểu nghĩa một cách đơn giản là một giao thức của gói Internet Protocol, hay được gọi là giao thức điều khiển truyền tin trên mạng
-	ICMP được dùng để thông báo các lỗi xảy ra trong quá trình truyền đi của các gói dữ liệu trên mạng. Hay dùng để thăm dò và quản lý quá trình hoạt động của mạng
-	Ping là viết tắt của Packet Internet Grouper. Mục đích khi người dùng sử dụng lệnh Ping là để kiểm tra xem một gói dữ liệu có thể đến được địa chỉ mà không có lỗi không
-	Ngoài ra còn sử dụng để đo độ trễ giữa hai thiết bị trên cùng một mạng hoặc dùng để kiểm tra lỗi mạng, nghĩa là xem 2 thiết bị trong 1 mạng nào đó kết nối và thông với nhau hay không

    ![image.png](https://images.viblo.asia/b66ceefe-9ea6-4c9f-8b3e-b028b3f77313.png)

-	Traceroute dùng để xác định đường đi từ nguồn tới đích của một gói Giao thức mạng Internet (IP - Internet Protocol). Traceroute tìm đường tới đích bằng cách gửi các thông báo Echo Request (yêu cầu báo hiệu lại) Internet Control Message Protocol (ICMP) tới từng đích. Sau mỗi lần gặp một đích, giá trị Time to Live (TTL), tức thời gian cần để gửi đi sẽ được tăng lên cho tới khi gặp đúng đích cần đến
-	Hiểu đơn giản là công cụ kiểm tra đường đi của gói dữ liệu và xem xét tình trạng của nó: đi qua các trạm nào, mất bao lâu, trạm nào bị nghẽn, ...
-	Trong thực tế gói dữ liệu càng qua nhiều trạm thì càng chậm, đồng thời rủi ro bị time out (mất kết nối) càng cao

    ![image.png](https://images.viblo.asia/4e75ec05-2f63-48d7-9898-0c00a581b301.png)
    
### II. Port Protocol
-	Port là giao thức bit 16 đứng đầu (chèn vào phần đầu header) của mỗi gói tin trong giao thức TCP, UDP hay còn gọi là cổng port, nơi quy định các tập dữ liệu riêng biệt. Port là một dạng thuật toán đã được định sẵn và mỗi máy tính cần phải có thì mới có thể nhận và gửi các gói tin đi được. Khi hoạt động Port cũng được quy đổi giống với số bit của bất kì một mã dữ liệu nào đó. Đơn giản thì đây giống như cánh cổng có quyền cho vào hay không với các dữ liệu muốn ra vào hệ thống máy tính của bạn.
-	Ví dụ, Server A chạy dịch vụ website, DNS và FTP server, có địa chỉ IP là 211.445.026.16. Máy tính nào khác muốn truy cập vào server A thì đến địa chỉ IP hoặc tên miền của máy chủ A. Nhưng cần phải biết Port để đi đúng đến đích đến website A chẳng hạn hay vì đi sai đến DNS hay FTP của A. Lúc này gói tin gửi đi có IP là 211.445.026.16 kèm địa chỉ Port là 80. Tương tự máy B muốn đến FTP của A thì lúc này địa chỉ IP vẫn thế những Port sẽ là 21. Máy C muốn truy cập DNS của A thì Port là 53, IP giống nhau. Trên thực tế, các ứng dụng thường ẩn Port để giảm sự phức tạp của giao thức TCP/IP
-	**Giúp chọn lọc tin**: Là một thuật toán mà các máy đều cần phải đăng ký để sử dụng, Port quy định chỉ những tập tin nào mới được phép đi vào máy, tương tự với các tập tin được phép xuất ra khỏi máy. Thao tác kiểm tra khớp cổng bit sẽ giúp bạn kiểm soát và chọn lọc được đâu là tập tin an toàn, đâu là tập đang có vấn đề, từ đó từ chối quyền truy cập
-	**Có khả năng bảo vệ xâm nhập có hại cho máy tính**: Từ tác dụng chọn lọc thì điều đương nhiên là Port có một khả năng để chống lại trước những xâm nhập vào máy bạn. Những phần mềm virus, tệp tin xấu, thông tin gây nhiễu sẽ bị loại bỏ ngay lập tức
-	**Những loại port phổ biến hiện nay**: 
    -	Port có tổng cộng là 65535 cổng, được chia làm 3 phần: Well Known Port (WKP) bao gồm các Port quy định từ 0 - 1023, quy định cho các ứng dụng như website (Port 80), FTP (Port 21), email (Port 25); Registered Port (RP) bao gồm các Port từ 1024 - 49151; Dynamic/Private Port (D/PP) bao gồm các Port từ 49152 - 65535. Theo quy định của IANA thì WKP và RP phải được đăng ký với IANA trước khi sử dụng
    -	**20 - TPC - File Transfer - FTP data**: cho phép upload và dowload dữ liệu từ server
    -	**21 - TPC - File Transfer - FTP control**: Khi có máy tính muốn kết nối với dịch vụ FTP của máy bạn, máy đó sẽ tự động phải thêm Port và tìm cách kết nối đến cổng 21 theo mặc định. Khi đầu bit khớp cổng 21 mở cho máy muốn tới FTP để đăng nhập và nối tới server của các bạn
    -	**22 - TPC /UDP - SSH Remote Login Protocol**: Nếu bạn chạy SSH Secure Shell, cổng 22 được yêu cầu cho người dùng SSH để kết nối tới người phục vụ của bạn.
    -	**23 - TPC – Telnet**: Trường hợp bạn chạy một người phục vụ Telnet, cổng này được yêu cầu cho người dùng Telnet kết nối tới người phục vụ của các bạn. Telnet có thể được sử dụng để kiểm tra công tác dịch vụ ở cả các cổng khác.
    -	**25 - TPC - Simple Mail Transfer Protocol (SMTP)**: khi có thư tới server SMTP của bạn, chúng sẽ cố gắng tiến vào server thông qua Cổng 25 theo mặc định. 38 - TPC - Route Access Protocol (RAP)
    -	**42 - TPC -Host Name Server – Microsoft WINS**
    -	**45 - TPC - Message Processing Module (receive)**
    -	**46 - TPC -Message Processing Module (send)**
    -	**50 - TPC - Remote Mail Checking Protocol (RMCP)**
    -	**66 - TPC - Oracle SQLNET**
    -	**80 - Hyper-Text Transfer Protocol (HTTP)**: khi có người dùng sử dụng địa chỉ IP hay tên miền của bạn, bộ duyệt sẽ giám sát địa chỉ IP trên cổng 80 theo mặc định dành cho website, đồng thời hỗ trợ HTML và các tệp website khác ví dụ như ASP – Active Server Pages
    -	**81** - Khi một người sử dụng nhập địa chỉ IP hay HostName của các bạn trong bộ duyệt, bộ duyệt sẽ quan sát địa chỉ IP trên cổng 80. Nếu Cổng thì bị tắc nghẽn, Cổng 81 được sử dụng như một Cổng xen kẽ cho một web hosting vietnam nào đó.
    -	**88 - TPC -Trivial File Transfer Protocol (TFTP)**
    -	**110 – TCP UDP - Post Office Protocol (POP) Version 3**: bạn chạy một máy, người dùng sẽ tiến hành truy cập theo đường POP3 (Nghi thức cơ quan bưu điện) hay IMAP4 (giao thức truy nhập Thông báo Internet) theo quy định. Trong đó thì POP3 đường tốt nhất để truy cập hòm thư.
    -	**119 – TCP UDP – Network News Transfer Protocol**: bạn chạy server về tin tức, những người dùng muốn kết nối tới các thông tin thì sẽ bắt buộc phải thông qua cổng 119 theo mặc định.
    -	**130 – TCP UDP – Cisco FNATIVE**
    -	**143 – TCP UDP – Internet Message Access Protocol (IMAP) Mail Server**: giao thức truy cập thông báo Internet ngày càng trở nên phổ biến hơn bao giờ hết và cho phép sử dụng từ xa. Vì thế, các thông báo đều được giữ ở server để dễ dàng truy cập trực tuyến, online, offline.
    -	**161 – TCP UDP – SNMP**

    ![image.png](https://images.viblo.asia/5ea7f005-1180-4abb-b093-452779496177.png)

### III. TCP/IP Model (Transmission Control Protocol/ Internet Protocol Model - Giao thức điều khiển truyền nhận/ Giao thức liên mạng)
-	Là một bộ giao thức trao đổi thông tin được sử dụng để truyền tải và kết nối các thiết bị trong mạng Internet. TCP/IP được phát triển để mạng được tin cậy hơn cùng với khả năng phục hồi tự động

    ![image.png](https://images.viblo.asia/b9fbcd04-347d-4235-afad-f9c173ba0d13.png)
    
-	Phân tích từ tên gọi, TCP/IP là sự kết hợp giữa 2 giao thức. Trong đó IP (Giao thức liên mạng) cho phép các gói tin được gửi đến đích đã định sẵn, bằng cách thêm các thông tin dẫn đường vào các gói tin để các gói tin được đến đúng đích đã định sẵn ban đầu. Và giao thức TCP (Giao thức truyền vận) đóng vai trò kiểm tra và đảm bảo sự an toàn cho mỗi gói tin khi đi qua mỗi trạm. Trong quá trình này, nếu giao thức TCP nhận thấy gói tin bị lỗi, một tín hiệu sẽ được truyền đi và yêu cầu hệ thống gửi lại một gói tin khác. Quá trình hoạt động này sẽ được làm rõ hơn ở chức năng của mỗi tầng trong mô hình TCP/IP
-	Một mô hình TCP/IP tiêu chuẩn bao gồm 4 lớp được chồng lên nhau, bắt đầu từ tầng thấp nhất là **Tầng vật lý (Physical) -> Tầng mạng (Network) -> Tầng giao vận (Transport) và cuối cùng là Tần Ứng dụng (Application)**
-	Một số ý kiến lại cho rằng mô hình TCP/IP là 5 tầng, tức các tầng 4 đến 2 đều được giữ nguyên, nhưng tầng Datalink sẽ được tách riêng và là tầng nằm trên so với tầng vật lý

    ![image.png](https://images.viblo.asia/ae01487d-2747-4e5c-91f5-578a805831a6.png)
    
-	**Tầng 4: Application**
    -	Đảm nhận vai trò giao tiếp dữ liệu giữa 2 máy khác nhau thông qua các dịch vụ mạng khác nhau (duyệt web, chat, gửi email, một số giao thức trao đổi dữ liệu: SMTP, SSH, FTP,...). Dữ liệu khi đến đây sẽ được định dạng theo kiểu Byte nối Byte, cùng với đó là các thông tin định tuyến giúp xác định đường đi đúng của một gói tin

    ![image.png](https://images.viblo.asia/2b5c2df4-cec2-46ad-bdde-dcaed433417c.png)
    
-	**Tầng 3: Transport**
    -	Chức năng chính của tầng 3 là xử lý vấn đề giao tiếp giữa các máy chủ trong cùng một mạng hoặc khác mạng được kết nối với nhau thông qua bộ định tuyến. Tại đây dữ liệu sẽ được phân đoạn, mỗi đoạn sẽ không bằng nhau nhưng kích thước phải nhỏ hơn 64KB. Cấu trúc đầy đủ của một Segment lúc này là Header chứa thông tin điều khiển và sau đó là dữ liệu
    -	Trong tầng này còn bao gồm 2 giao thức cốt lõi là TCP và UDP. Trong đó, TCP đảm bảo chất lượng gói tin nhưng tiêu tốn thời gian khá lâu để kiểm tra đầy đủ thông tin từ thứ tự dữ liệu cho đến việc kiểm soát vấn đề tắc nghẽn lưu lượng dữ liệu. Trái với điều đó, UDP cho thấy tốc độ truyền tải nhanh hơn nhưng lại không đảm bảo được chất lượng dữ liệu được gửi đi

    ![image.png](https://images.viblo.asia/4e87743a-39d5-4d4f-b8f0-ee92d5e2e61b.png)
    
-	**Tầng 2: Internet**
    -	Là một giao thức chịu trách nhiệm truyền tải dữ liệu một cách logic trong mạng. Các phân đoạn dữ liệu sẽ được đóng gói (Packets) với kích thước mỗi gói phù hợp với mạng chuyển mạch mà nó dùng để truyền dữ liệu. Lúc này, các gói tin được chèn thêm phần Header chứa thông tin của tầng mạng và tiếp tục được chuyển đến tầng tiếp theo. Các giao thức chính trong tầng là IP, ICMP và ARP

    ![image.png](https://images.viblo.asia/cf829788-4b99-458f-a8a8-64a6b9b03e40.png)
    
-	**Tầng 1: (Physical)**
    -	Chịu trách nhiệm truyền dữ liệu giữa hai thiết bị trong cùng một mạng. Tại đây, các gói dữ liệu được đóng vào khung (gọi là Frame) và được định tuyến đi đến đích đã được chỉ định ban đầu

### IV. VPN
-	Hay còn gọi là Virtual Private Network (mạng riêng ảo), cho phép người dùng thiết lập mạng riêng ảo với một mạng khác trên Internet. VPN có thể được sử dụng để truy cập các trang web bị hạn chế truy cập về mặt vị trí địa lý, bảo vệ hoạt động duyệt web của bạn khỏi “sự tò mò” trên mạng Wifi công cộng bằng cách thiết lập mạng riêng ảo cho bạn
-	Về cơ bản, VPN chuyển tiếp tất cả lưu lượng network traffic của bạn tới hệ thống – nơi có thể truy cập từ xa các tài nguyện mạng cục bộ và bypass việc kiểm duyệt Internet (Internet censorship). Hầu hết trên các hệ điều hành đều tích hợp hỗ trợ VPN

    ![image.png](https://images.viblo.asia/5762cb41-b7a8-48e1-af6d-3de693e383d6.png)

-	Lợi ích
    -	Truy cập Business Network trong khi đi du lịch : VPN thường được các du khách đi du lịch với mục đích kinh doanh (business traveler) sử dụng để truy cập mạng lưới kinh doanh của họ, bao gồm tất cả các nguồn tài nguyên mạng cục bộ. Các nguồn tài nguyên mạng cục bộ không được tiếp xúc trực tiếp với Internet để tang cường tính bảo mật
    -	Truy cập Home Network trong khi đi du lịch : Ngoài ra bạn có thể thiết lập một VPN của riêng mình để truy cập khi đi du lịch. Điều này sẽ cho phép bạn truy cập Windows Remote Desktop thông qua Internet, tức là bạn sẽ được phép truy cập vào máy tính cá nhân của mình thông qua Internet, chia sẻ các tập tin, làm việc trên dữ liệu máy tính ở nhà và thậm chí là chơi game trên máy tính đó
    -	Ẩn hoạt động duyệt web từ mạng cục bộ và ISP (nhà cung cấp internet) : Nếu đang sử dụng kết nối Wifi công cộng, và bạn duyệt web trên các trang web không phải HTTPS, khi đó các hoạt động của bạn sẽ được hiển thị với mọi người (nếu họ biết cách để xem hoạt động của bạn). Nếu muốn ẩn hoạt động duyệt web của mình để đảm bảo tính bảo mật, quyền riêng tư, bạn có thể kết nối với VPN. Mạng cục bộ sẽ chỉ nhìn thấy một kết nối VPN an toàn và duy nhất. Tất cả các traffic khác sẽ thông qua kết nối VPN. Và có thể sử dụng để bỏ qua việc giám sát của nhà cung cấp dịch vụ Internet (ISP) của bạn
    -	Truy cập các trang web bị chặn về mặt địa lý : Dù cho bạn là công dân sinh sống tại Hoa Kỳ, nhưng bạn đang đi du lịch tại một các quốc gia khác, không phải Hoa Kỳ và bạn muốn truy cập Netflix, Pandora hay Hulu thì điều này là không thể. Tuy nhiên nếu kết nối với một VPN đặt tại Hoa Kỳ thì việc truy cập Netflix, Pandora hay Hulu lại là hoàn toàn có thể
    -	Sử dụng VPN để bỏ qua kiểm duyệt Internet
    -	Tải các file : Nhiều người dùng sử dụng kết nối VPN để tải các file thông qua BitTorrent. Điều này thực sự hữu ích nếu bạn muốn tải toàn bộ Torrent hợp lệ – nếu ISP của bạn đang điều khiển BitTorrent và nó khá chậm, bạn có thể sử dụng BitTorrent trên VPN để được trải nghiệm tốc độ nhanh hơn

### V. Multiple hop VPN
-	Nói một cách đơn giản, VPN multi-hop thêm một lớp mã hóa bổ sung và một máy chủ bổ sung vào kết nối VPN thông thường của bạn bằng cách kết nối với nhau trong các chuỗi máy chủ hoặc hai máy chủ VPN. Mục đích là để tăng cường bảo mật và quyền riêng tư được cung cấp bởi kết nối VPN một máy chủ tiêu chuẩn

    ![image.png](https://images.viblo.asia/8908bf13-d772-49b8-8a93-890aae2b3c80.png)
    ![image.png](https://images.viblo.asia/36388b7b-abd8-4dd3-a63f-75badda9fc8a.png)
    
-	Độ trễ được tăng thêm bởi khoảng cách thêm mà dữ liệu của bạn phải di chuyển
-	Tốc độ bị giới hạn bởi bất kỳ máy chủ nào trong chuỗi có băng thông ít nhất có sẵn
-	Giải mã hai hoặc nhiều lớp mã hóa thay vì chỉ một lớp đòi hỏi khắt khe hơn trên phần cứng thiết bị của bạn

### VI. VPN Site-to-Site
-	Một cách hiểu khá đơn giản, 1 kết nối VPN kết nối 2 mạng nội bộ (mạng LAN - Local Area Network) với nhau thì được gọi là 1 kết nối VPN site to site. VPN site to site được sử dụng rộng rãi để kết nối các mạng nội bộ ở xa với nhau, trên một đường truyền an toàn và bảo mật. Một lý do khác khiến việc VPN site to site được sử dụng rộng rãi đó là việc tạo được một đường truyền VPN site to site khá đơn giản và dễ dàng vì nó dựa hoàn toàn trên internet
-	Tưởng tượng bạn có máy chủ đặt tại 2 Datacenter, bạn muốn các máy chủ ở 2 datacenter giao tiếp với nhau thông qua mạng nội bộ chứ không qua Internet, vì việc để những máy chủ cần bảo mật như database giao tiếp qua internet là không an toàn và bảo mật. Bạn có thể sử dụng 1 đường leased line cho bài toán này, nhưng việc sử dụng đường leased line phụ thuộc vào Datacenter nơi bạn đặt máy chủ và chi phí thì cũng kha khá. Thay vào đó, bạn có thể sử dụng 1 đường truyền VPN site to site để giải quyết bài toán. Thứ bạn cần là 2 thiết bị VPN gateway có IP Public đặt tại 2 Datacenter để tạo thành kết nối VPN, kết nối sẽ thông 2 mạng nội bộ của 2 DC với nhau, dữ liệu truyền trên đường truyền sẽ được mã hóa, nên sẽ an toàn và bảo mật hơn việc truyền trên Internet đơn thuần. Và các thiết bị VPN gateway thì cũng rất đa dạng: có thể là các server vật lý chạy phần mềm VPN, router, SW, các thiết bị gateway.... hỗ trợ VPN site to site
-	Một ứng dụng thực nữa của VPN site to site đó là việc kết nối mạng văn phòng của các trụ sở chi nhánh với nhau và với trụ sở chính để các chi nhánh có thể truy cập vào các tài nguyên dùng chung đặt tại trụ sở chính thông qua đường truyền an toàn, bảo mật thay vì internet, hay để các nhân viên tại các chi nhánh có thể trao đổi dữ liệu với nhau 1 cách dễ dàng

    ![image.png](https://images.viblo.asia/66d3cfe7-5f0b-4f86-9ca0-d0b1aee9e909.png)
    
-	Hiện nay việc chạy các ứng dụng trên các máy chủ ảo Cloud đã rất phổ biến. Cũng giống như việc đặt máy chủ vật lý tại nhiều Datacenter khác nhau, các doanh nghiệp có thể chạy dịch vụ trên các máy chủ ảo Cloud của nhiều các Cloud Provider khác nhau. Và từ mô hình đó cũng sẽ nảy sinh nhu cầu cần kết nối mạng nội bộ Cloud(VPC) của các Cloud Provider với nhau để trao đổi dữ liệu. VPN site to site cũng được áp dụng để giải quyết bài toán này

    ![image.png](https://images.viblo.asia/ef439f69-716a-4c55-8a47-6453a510a7a1.png)

### VII. Domain Name System (DNS)
-	Là một hệ thống chuyển đổi các tên miền website mà chúng ta đang sử dụng, ở dạng www.tenmien.com sang một địa chỉ IP dạng số tương ứng với tên miền đó và ngược lại
-	Thao tác này của DNS giúp liên kết các thiết bị mạng với nhau nhằm mục đích định vị và gán một địa chỉ cụ thể cho các thông tin trên internet

    ![image.png](https://images.viblo.asia/4d953c58-decc-42a1-8769-d9038ae587ec.png)
    
-	Tuy nhiên, địa chỉ IP vẫn được sử dụng như một nền tảng kết nối bởi các thiết bị mạng. Đó là nơi DNS làm việc phân giải tên domain thành địa chỉ IP để các thiết bị mạng giao tiếp với nhau. Đồng thời, bạn cũng có thể tải một website bằng cách nhập trực tiếp địa chỉ IP thay vì nhập tên domain của website đó

    ![image.png](https://images.viblo.asia/53b9c682-4e9c-438d-b3b4-941b0e30d598.png)
    
### VIII. Domain Name
-	Là tên của một website hoạt động trên internet, đóng vai trò là một địa chỉ vật lý. Nó giống như là địa chỉ nhà hay zip code để giúp các thiết bị định tuyến vệ tinh dẫn đường, một trình duyện cũng cần một tên miền để dẫn đường tới website của bạn
-	Thay vì phải nhập 1 đoạn IP khó nhớ, thì nhập một tên miền vẫn dễ nhớ hơn
### IX. Forward Proxy & Reverse Proxy
-	Reverse proxy là một loại proxy server trung gian giữa một máy chủ và các client gửi tới các yêu cầu. Nó kiểm soát yêu cầu của các client, nếu hợp lệ, sẽ luân chuyển đến các server thích ứng.
-	Trái ngược với một forward proxy, là một trung gian cho phép các client liên hệ với nó liên lạc với bất kỳ máy chủ ảo nào, reverse proxy là một trung gian cho các máy chủ liên hệ với nó được liên lạc bởi bất kỳ client nào. Ưu điểm lớn nhất của việc sử dụng reverse proxy là khả năng quản lý tập trung. Nó giúp kiếm soát mọi request do client gửi lên các server được bảo vệ

    ![image.png](https://images.viblo.asia/b954e20c-b9a0-456c-94f6-b0fd5e003cd2.png)
    ![image.png](https://images.viblo.asia/08d74271-1294-47c0-a140-38d737064178.png)
    
-	Sự khác biệt chính giữa cả 2 là Forward Proxy được sử dụng bởi client, như: browser, ... Trong khi Reverse proxy được sử dụng bởi máy chủ, như: web server, ...

    ![image.png](https://images.viblo.asia/332dd5cf-416a-4870-aace-a5f9a2626153.png)

-	**Công dụng của Reverse proxy**:
    -	**Bảo mật**: Bằng cách chặn các yêu cầu được gửi đến máy chủ phụ trợ của bạn, reverse proxy server sẽ bảo vệ danh tính của chúng ta và hoạt động như một biện pháp bảo vệ để chống lại các cuộc tấn công bảo mật. Với reverse proxy server thì một trang web hoặc một dịch vụ sẽ không bao giờ tiết lộ địa chỉ IP của các server gốc. Điều này làm cho những cuộc tấn công có thể khó thực hiện
    -	**Cân bằng tải**: Đối với một trang web phổ biến thì hàng ngày sẽ có hàng triệu người dùng truy cập và nó có thể không thể xử lý tất cả lưu lượng truy cập đến bằng một máy chủ duy nhất. Vì vậy, trang web nên được phân phối giữa một nhóm các máy chủ khác nhau và tất cả chúng đều xử lý các yêu cầu cho cùng một trang web. Trong trường hợp này, reverse proxy có thể cung cấp giải pháp cân bằng tải sẽ phân phối đồng đều lưu lượng đến giữa các máy chủ khác nhau để ngăn việc một số máy chủ có thể bị quá tải do chịu nhiều yêu cầu cùng lúc. Còn trong trường hợp một máy chủ bị lỗi hoàn toàn thì các máy chủ khác cũng có thể xử lý lưu lượng. Reverse proxy server ở trước các máy chủ phụ trợ của bạn và phân phối các yêu cầu của client trên một nhóm máy chủ theo cách tối đa hóa tốc độ và sử dụng dung lượng trong khi đảm bảo không có máy chủ nào bị quá tải
    -	**Tăng tốc độ trang web**: Reverse proxy server có thể nén dữ liệu gửi đến và gửi đi, cũng như lưu vào bộ nhớ cache các nội dung thường xuyên được yêu cầu, cả hai sẽ làm tăng tốc luồng lưu lượng giữa client và server. Ngoài ra nó cũng có thể thực hiện một số tác vụ bổ sung như mã hóa SSL để giảm tải các máy chủ web của bạn, do đó mà hiệu suất cũng được tăng lên
-	**Công dụng của Forward proxy**:
    -	Ngăn chặn truy cập một số trang web
    -	Giám sát hoạt động
    -	Chặn các truy cập không được phép đến máy chủ gốc
    -	Tăng trải ngiệm người dùng bằng cách lưu nội dung trang thường xuyên được yêu cầu vào bộ nhớ đệm
### X. Reverse Proxy & Load Balancer
-	Đầu tiên Load Balancer là gì? Load Balancer dịch sang tiếng Việt là “cân bằng tải”, nó được coi là một reverse proxy nhưng cao cấp hơn
-	Một kịch bản thường được thấy nhất chính là việc bạn có một web service, được phục vụ bởi N servers cho M requests đến từ người dùng. Load Balancing chính là việc làm thế nào để chia M requests đó cho N servers một cách "hợp lý" nhất
-	Việc chia tải đó thông thường sẽ được thực hiện thông qua một server nằm giữa, mà người ta hay gọi là proxy. Một số proxy middleware hay được biết đến, có thể kể đến Nginx, HAProxy (phần mềm) hay là F5 BigIP (phần cứng)

    ![image.png](https://images.viblo.asia/136caa39-c23f-42c6-95ce-bdabca90db3b.png)
    ![image.png](https://images.viblo.asia/32c76348-7d4c-47b6-a9d8-391261c0721b.png)

-	**Lợi ích khi có Load Balancing**:
    -	**Uptime**: Với Load Balancing, khi máy chủ gặp sự cố, lưu lượng truy cập sẽ được tự động chuyển đến máy chủ còn lại. Nhờ đó, trong hầu hết mọi trường hợp, sự cố bất ngờ có thể được phát hiện và xử lý kịp thời, không làm gián đoạn các truy cập của người dung
    -	**Datacenter linh hoạt**: Khả năng linh hoạt trong việc điều phối giữa các máy chủ cũng là một ưu điểm khác của Load Balancing. Tự động điều phối giữa các máy chủ cũ và mới để xử lý các yêu cầu dịch vụ mà không làm gián đoạn các hoạt động chung của hệ thống
    -	**Bảo mật cho Datacenter**: Bằng cách sử dụng Load Balancing, những yêu cầu từ người dùng sẽ được tiếp nhận và xử lý trước khi phân chia đến các máy chủ. Đồng thời, quá trình phản hồi cũng được thông qua Load Balancing, ngăn cản việc người dùng giao tiếp trực tiếp với máy chủ, ẩn đi thông tin và cấu trúc mạng nội bộ, từ đó chặn đứng những cuộc tấn công mạng hay truy cập trái phép…

    ![image.png](https://images.viblo.asia/886f2981-fc61-4931-833e-9bedd49fb809.png)
    
-	**Có 4 loại giao thức chính**:
    -	HTTP: dựa trên cơ chế HTTP chuẩn, HTTP Balancing đưa ra yêu cầu tác vụ. Load Balancer đặt X-Forwarded-For, X-Forwarded-Proto và tiêu đề X-Forwarded-Port cung cấp các thông tin backends về những yêu cầu ban đầu
    -	HTTPS: các chức năng tương tự HTTP Balancing. HTTPS Balancing được bổ sung mã hóa và nó được xử lý bằng 2 cách: passthrough SSL duy trì mã hóa tất cả con đường đến backend hoặc: chấm dứt SSL, đặt gánh nặng giải mã vào load balancer và gửi lưu lượng được mã hóa đến backend
    -	TCP: trong một số trường hợp khi ứng dụng không sử dụng giao thức HTTP hoặc HTTPS, TCP sẽ là một giải pháp để cân bằng lưu lượng. Cụ thể, khi có một lượng truy cập vào một cụm cơ sở dữ liệu, TCP sẽ giúp lan truyền lưu lượng trên tất cả các máy chủ
    -	UDP: trong thời gian gần đây, Load Balancer đã bổ sung thêm hỗ trợ cho cân bằng tải giao thức internet lõi như DNS và syslogd sử dụng UDP
-	**Health Checks**:
    -	Hiểu một cách đơn giản là việc kiểm tra tình trạng của một Backend Server. Bằng cách kết nối đến Backend Server dùng giao thức và cổng được định nghĩa bởi các quy tắc chuyển tiếp, nó đảm bảo rằng các máy chủ vẫn đang hoạt động ổn định
    -	Trong trường hợp máy chủ không hoạt động, Health Checks sẽ loại chúng ra khỏi vùng chứa. Điều này đồng nghĩa với việc các request sẽ không được chuyển tiếp đến máy chủ này nữa cho đến khi chúng vượt qua “bài kiểm tra” Health Checks sau
    -	Qua quá trình này, Load Balancing có thể chuyển tiếp trực tiếp lưu lượng đến các Backend Server đang thật sự hoạt động nhằm giải quyết mọi tác vụ của người dùng
   
    ![image.png](https://images.viblo.asia/ef8fd36f-b026-4ca3-bb35-361c9fe898f3.png)
    ![image.png](https://images.viblo.asia/92b11f36-2462-437e-a33a-ba561cbc4093.png)
    
    -	Tùy thuộc công nghệ Load Balancing mà các thuật toán khác nhau sẽ được sử dụng để định tình trạng của máy chủ có hoạt động hay không. Có các loại thuật toán thường thấy:
        -	**Round Robin**:
            -	Round Robin là thuật toán lựa chọn các Member (server) theo trình tự. Theo đó, Load Balancer sẽ bắt đầu đi từ Member (server) số 1 trong danh sách của nó ứng với yêu cầu đầu tiên. Tiếp đó, nó sẽ di chuyển dần xuống trong danh sách theo thứ tự và bắt đầu lại ở đầu trang khi đến Member (server) cuối cùng
            -	Nhược điểm: Khi có 2 yêu cầu liên tục từ phía người dùng sẽ có thể được gửi vào 2 server khác nhau. Điều này làm tốn thời gian tạo thêm kết nối với server thứ 2 trong khi đó server thứ nhất cũng có thể trả lời được thông tin mà người dùng đang cần. Để giải quyết điều này, round robin thường được cài đặt cùng với các phương pháp duy trì session như sử dụng cookie

        ![image.png](https://images.viblo.asia/06ec1da6-765d-478d-9c81-65e1afc195cb.png)
        
    - **Weighted Round Robin**:
        - Weight hay "Trọng số" có khả năng xử lý theo cấu hình của từng Member (server) đích. Mỗi server được đánh giá bằng một số nguyên (giá trị trọng số Weight – mặc định giá trị là 1). Một server có khả năng xử lý gấp đôi server khác sẽ được đánh số lớn hơn gấp đôi và nhận được số request gấp đôi từ Load Balancer. Tính năng này thường sẽ kết hợp với các thuật toán bên trên để tạo ra nhiều mục đích sử dụng cho Khách hàng
        - Nhược điểm: gây mất cân bằng tải động nếu như tải của các request liên tục thay đổi trong một khoảng thời gian rộng
        - Ví dụ: Server 1 có khả năng xử lý gấp 5 lần Server 2. Chúng ta sẽ đánh "Weight = 5" cho server 1 và "Weight = 1" cho server 2

        ![image.png](https://images.viblo.asia/a995ec0a-b142-48e2-9395-1b192ef00277.png)
        
    - Dynamic Round Robin:
        - Thuật toán DRR hoạt động gần giống với thuật toán WRR. Điểm khác biệt là trọng số ở đây dựa trên sự kiểm tra server một cách liên tục. Do đó trọng số liên tục thay đổi
        - Việc chọn server sẽ dựa trên rất nhiều khía cạnh trong việc phân tích hiệu năng của server trên thời gia thực. Ví dụ: số kết nối hiện đang có trên các server hoặc server trả lời nhanh nhất
        - Thuật toán này thường không được cài đặt trong các bộ cân bằng tài đơn giản. Nó thường được sử dụng trong các sản phẩm cân bằng tải của F5 Network

    - **Fastest**:
        - Đây là thuật toán dựa trên tính toán thời gian đáp ứng của mỗi server (response time). Thuật toán này sẽ chọn server nào có thời gian đáp ứng nhanh nhất. Thời gian đáp ứng được xác định bởi khoảng thời gian giữa thời điểm gửi một gói tin đến server và thời điểm nhận được gói tin trả lời
        - Việc gửi và nhận này sẽ được bộ cân bằng tải đảm nhiệm. Dựa trên thời gian đáp ứng, bộ cân bằng tải sẽ biết chuyển yêu cầu tiếp theo đến server nào
        - Thuật toán Fastest thường được dùng khi các server ở các vị trí địa lý khác nhau. Như vậy người dùng ở gần server nào thì thời gian đáp ứng của server đó sẽ nhanh nhất. Cuối cùng server đó sẽ được chọn để phục vụ

    - **Least Connections**:
        - Các request sẽ được chuyển vào server có ít kết nối (active connection) nhất trong hệ thống tại thời điểm hiện tại. Thuật toán này được coi như thuật toán động, vì nó phải đếm số kết nối đang hoạt động của server
        - Ví dụ: Chúng ta có 6 client request đến LB đang cân bằng tải cho 2 server bên dưới
        - Cả 6 client đều gửi request và chia đều cho 2 server
        - Giả sử client 1 và 3 ngắt kết nối trước khi client 6 gửi request, thì lúc này request của client 6 sẽ được chuyển đến server 1

        ![image.png](https://images.viblo.asia/6c2fc698-ce48-42b5-b981-9f070ec4735a.png)
        ![image.png](https://images.viblo.asia/2e97b682-9e1c-415c-b823-ebbd15c71a2f.png)

![image.png](https://images.viblo.asia/371afc0e-847a-4fab-8cb1-c4921b554d74.png)

Nguồn ảnh trên: Load Balancing ([coggle.it](https://coggle.it/diagram/Xl4x3uMesA_AU32e/t/load-balancing))

-	**Load Balancer dự phòng**
    -	Trong nhiều trường hợp, chỉ có một Load Balancer là điểm truy cập duy nhất. Chính vì vậy, chúng ta cần có một Load Balancer thứ hai. Nó sẽ được kết nối với Load Balancer ban đầu. Mục đích để mỗi Load Balancer đều có khả năng phát hiện lỗi và phục hồi
    -	Sẽ ra sao khi xảy ra trường hợp Load Balancer chính bị lỗi? Balancer thứ hai sẽ nhận trách nhiệm thay thế, do DNS di chuyển người dùng đến. Tuy nhiên, việc thay đổi DNS có thể mất nhiều thời gian trên internet. Và để chuyển đổi dự phòng được tự động, các quản trị viên sẽ cho phép linh hoạt địa chỉ IP Remapping. Chẳng hạn như trường hợp này là floating Ips
    -	IP Remapping giúp loại bỏ các vấn đề bộ nhớ đệm vốn có trong những thay đổi DNS. IP Remapping sẽ cung cấp một địa chỉ IP tĩnh. Địa chỉ IP này có thể được dễ dàng ánh xạ lại khi cần thiết. Tên miền có thể duy trì liên kết với các địa chỉ IP. Trong khi các địa chỉ IP của chính nó được di chuyển giữa các máy chủ

    ![image.png](https://images.viblo.asia/5558580d-a198-4443-ad1e-b748f7bee218.png)
    
### XI. Kết
Đây là những thông tin mình tìm hiểu được, nhiều lúc không sử dụng nên cứ chẳng nhớ gì cả, đành phải note lại, dẫu sao đọc để biết thêm kiến thức cũng vui :D