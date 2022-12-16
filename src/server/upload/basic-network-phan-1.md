### I. Mở đầu
Mình đang học một chút về network nên tiện tay thì làm một bài viết tổng hợp những thông tin về mạng

### II. Network
-	Một network bao gồm 2 hoặc nhiều máy tính được liên kết với nhau để chia sẻ tài nguyên, trao đổi tệp hoặc giao tiếp. Được liên kết thông qua dây cáp, dây điện thoài, sóng radio, vệ tinh, tia hồng ngoại, ...
-	Gồm 2 mạng phổ biến là:
    - Local Area Network (LAN)
    - Wide Area Network (WAN)
-	Ngoài ra còn có: Metropolitan Area Networks (MAN), Wireless LAN (WLAN), Wireless WAN (WWAN), ...



| Tiêu chí | Mạng LAN | Mạng MAN | Mạng WAN |
| -------- | -------- | -------- |-------- |
| **Tên đầy đủ**     | Local Area Network     | Metropolitan Area Network     |Wide Area Network |
| **Phạm vi chia sẻ kết nối**     | Phạm vi nhỏ - trong một căn phòng, văn phòng, khuôn viên     | Pham vi chia sẻ lên tới 50 km     |Phạm vi chia sẻ không bị giới hạn |
| **Tốc độ truyền dữ liệu**     | 10 đến 100 Mbps     | lớn hơn mạng LAN và nhỏ hơn mạng WAN     | 256Kbps đến 2Mbps|
| **Băng thông**     | Lớn     | Trung bình     |Thấp |
| **Cấu trúc liên kết**     | Đường truyền và vòng cấu trúc     | Cấu trúc DQDB     |ATM, Frame Replay, Sonnet |
| **Quản trị mạng**     | Đơn giản     | Phức tạp     |Phức tạp |
| **Chi phí**     | Thấp     | Cao     |Cực cao |

### II. Local Area Network (LAN)
-	Được hiểu là sự kết hợp của nhiều thiết bị được kết nối lại với nhau trong một hệ thống mạng tại một khu vực nhất định (Công ty, trường học, nhà ở,...). Việc ghép nối các thiết bị trong cùng một hệ thống cho phép các thiết bị này trao đổi dữ liệu với nhau một cách nhanh chóng và dễ dàng (chia sẻ tập tin, hình ảnh, máy in, …)
-	Mạng LAN cũng được chia thành hai loại mà mạng LAN lớn và mạng LAN nhỏ. Đối với mạng LAN nhỏ nhất thì chỉ sử dụng để kết nối hai máy tính với nhau. Ngược lại, mạng LAN lớn nhất có thể kết nối hàng nghìn máy tính. Mạng LAN thường được sử dụng để chia sẻ tài nguyên, chẳng hạn như lưu trữ dữ liệu và máy in
-	Có băng thông lớn, chạy được các ứng dụng trực tuyến được kết nối thông qua mạng như các cuộc hội thảo, chiếu phim… Phạm vi kết nối có giới hạn tương đối nhỏ nhưng chi phí thấp và cách thức quản trị mạng đơn giản

    ![image.png](https://images.viblo.asia/a4d2df5f-35ca-4d09-9bcc-e5a413015274.png)

### III. Metropolitan area network( MAN)
-	Vietsub là mạng đô thị
-	Được kết nối từ nhiều mạng LAN với nhau thông qua dây cáp, các phương tiện truyền dẫn,... Phạm vi kết nối là trong một khu vực rộng như trong một thành phố
-	Đối tượng chủ yếu sử dụng mô hình mạng MAN đó là các tổ chức, doanh nghiệp có nhiều chi nhánh hoặc nhiều bộ phận kết nối với nhau. Mục đích của việc sử dụng mạng MAN cho doanh nghiệp là vì mô hình mạng này sẽ giúp cung cấp cho doanh nghiệp rất nhiều loại hình dịch vụ giá trị gia tăng cùng lúc trên một đường truyền kết nối về voice-data-video. Hơn hết dịch vụ này cũng cho phép triển khai các ứng dụng chuyên nghiệp một cách dễ dàng
-	Đặc điểm chính của mạng Man là băng thông trung bình nhưng phạm vi kết nối lại tương đối lớn. Chính vì vậy mà chi phí lắp đặt cao hơn mạng LAN. Đồng thời cách thức quản trị mạng phức tạp hơn

    ![image.png](https://images.viblo.asia/2655530f-af02-41cb-92e7-dc32cbf878e2.png)

### IV. Wide Area Network (WAN)
-	Là sự kết hợp giữa mạng LAN và mạng MAN nối lại với nhau thông qua vệ tinh, cáp quang hoặc cáp dây điện. Mạng diện rộng này vừa có thể kết nối thành mạng riêng vừa có thể tạo ra những kết nối rộng lớn, bao phủ cả một quốc gia hoặc trên toàn cầu
-	Giao thức sử dụng chủ yếu trong mạng WAN là giao thức TCP/IP. Đường truyền kết nối của mạng WAN có bằng thông thay đổi theo từng vị trí lắp đặt. Ví dụ như lắp đặt ở một khu vực riêng hoặc trong một quốc gia thì băng thông của đường truyền thay đổi rất lớn từ 56Kbps đến T1 với 1.544 Mbps hay E1 với 2.048 Mbps,….và đến Giga bít-Gbps là các đường trục nối các quốc gia hay châu lục
-	Nếu như băng thông của mạng LAN là cao nhất thì băng thông của mạng WAN lại thấp nhất nên kết nối rất yếu. Khả năng truyền tín hiệu kết nối rất rộng và không bị giới hạn. Ngực lại chi phí lắp đặt cao và cách thức quản trị mạng phức tạp

    ![image.png](https://images.viblo.asia/e66c9944-2c9d-4eb9-b3c2-731a4337c748.png)

### V. Wireless and Cable
-	Mạng Wireless là phương pháp mà các gia đình, mạng viễn thông và doanh nghiệp sử dụng tín hiệu truyền dẫn để kết nối 2 hay nhiều điểm với nhau bằng sóng vô tuyến, phương pháp này có nhiều ưu điểm so với cáp truyền thống nó tránh được quá trình tốn dây cáp vào tòa nhà hoặc kết nối giữa các vị trí thiết bị khác nhau. Mạng Wireless thường được triển khai và quản lý bằng cách sử dụng liên lạc vô tuyến. Việc triển khai này diễn ra ở cấp độ vật lý (physical level) của cấu trúc mạng mô hình OSI
-	Cable (Cáp) là phần cứng mạng được sử dụng để kết nối một thiết bị mạng với các thiết bị khác hoặc kết nối hai hoặc nhiều máy tính để chia sẻ máy in, máy quét,.. Dây cáp mạng là dây dẫn dạng xoắn làm từ kim loại hay hợp kim (chủ yếu là cáp đồng và cáp quang), bao bọc bên ngoài là một lớp vỏ bọc cách điện

    ![image.png](https://images.viblo.asia/1f698edc-edbd-42ef-9351-77fdf3f8994b.png)
    ![image.png](https://images.viblo.asia/7ec3d89e-1a63-4b2f-adc2-4952853c1898.png)
    
### VI. Route
-	Là phương thức mà Router hay thiết bị mạng dùng để chuyển các gói tin đến địa chỉ đích
-	Quá trình Routing dựa vào bảng định tuyến (Routing Table)
-	Có thể cấu hình thủ công hoặc sử dụng giao thức định tuyến động để tạo ra và tự động cập nhật các thông tin định tuyến
-	Luồng đi: Khi gửi một gói dữ liệu từ 1 máy tính sang máy tính khác
    - Đầu tiên: xác định gửi đến cùng 1 LAN hay phải đến Router để định tuyến đến LAN đích
    - Nếu gói dữ liệu được gửi đến máy có mạng LAN khác, nó sẽ gửi đến Router, Router sẽ xác định tuyến khả thi để chuyển dữ liệu. Quá trình này được lặp đi lặp lại
-	Các Router sẽ chia sẻ thông tin định tuyến với nhau để quản lý lưu lượng và tránh các kết nối chậm
-	Được chia làm 2 phương thức chính là Static Routing và Dynamic Routing

    ![image.png](https://images.viblo.asia/93ce5e0b-fc10-43b8-9789-0809c2927e87.png)

-	Routing Protocol: là ngôn ngữ để 1 Router trao đổi với một Router khác, để chia sẻ thông tin định tuyến về khả năng được đến mạng đích cũng như trạng thái của mạng

### VII. IP Address (Internet Protocol)
-	MAC chính là ID của card mạng trong máy tính để phân biệt các card mạng khác trong một máy tính
-	Mỗi máy tính có nhiều card mạng, mỗi card mạng tương ứng 1 địa chỉ MAC và không thể thay đổi được
-	Vì vậy mà địa chỉ Mac hay còn được gọi là địa chỉ phần cứng hoặc địa chỉ thực

    ![image.png](https://images.viblo.asia/e4218d34-b086-4f43-ad18-dca756efdf3b.png)

-	Sự khác nhau giữa địa chỉ Mac và địa chỉ IP là địa chỉ Mac không thể thay đổi được, còn IP thì có thể
-	Không chỉ máy tính, địa chỉ MAC còn có trên các thiết bị khác như router phát sóng wifi, smartphone, ...
-	Gồm 6 octets, mỗi octets 8 bits, được biểu diễn bằng 6 cặp chữ số hoặc ký tự khác nhau và được ngăn cách bằng dấu hai chấm. Ví dụ như: 00:1B:44:11:3A:B7
-	Địa chỉ MAC gồm có 3 loại: Unicast, Broadcast và Multicast

    ![image.png](https://images.viblo.asia/6c162266-1727-4f38-9196-2a9a0043dbaa.png)
    
-	Unicast:
    -	Là khái niệm thông tin truyền định hướng, chỉ sự trao đổi thông tin trong đó thông tin được gửi từ một điểm này đến một điểm kia
    - Trong mô hình Unicast thì một host sẽ nhận tất cả các dữ liệu truyền từ một host khác
    - Là địa chỉ phổ biến mà chúng ta hay dùng đặt cho máy tính, inerface router, ... Gói tin gửi đi từ một nguồn là nhận chỉ một đích

    ![image.png](https://images.viblo.asia/eed6c210-6ff7-4be6-82e6-a5f235f9ac88.png)
    
-	Broadcast:
    -	Là khái niệm chỉ chế độ trao đổi thông tin được gửi từ một điểm này tới tất cả các điểm khá trong cùng một mạng. Trong mô hình, tất cả các host sẽ nhận được các dữ liệu truyền từ một host khác

    ![image.png](https://images.viblo.asia/b7243bc4-4923-423b-b6c9-7b284ee600ba.png)
    
-	Multicast:
    -	Là được gửi từ một điểm tới một tập hợp các điểm khác. Tức là một nguồn và nhiều đích (nhiều đích không có nghĩa là tất cả)

    ![image.png](https://images.viblo.asia/330c5604-ffbb-4206-a428-cec1ec919118.png)
    
### IX. NAT (Network Address Translation)
-	Giúp địa chỉ mạng cục bộ (Private) truy cập được đến mạng công cộng (Internet). Vị trí để thực hiện kỹ thuật NAT là router biên, nơi kết nối 2 loại mạng này
-	NAT có nhiệm vụ truyền gói tin từ lớp mạng này sang lớp mạng khác trong cùng một hệ thống. NAT sẽ thực hiện thay đổi địa chỉ IP bên trong gói tin. Sau đó chuyển đi qua router và các thiết bị mạng
-	Trong giai đoạn gói tin được truyền từ mạng internet (public) quay trở lại NAT, NAT sẽ thực hiện nhiệm vụ thay đổi địa chỉ đích đến thành địa chỉ IP bên trong hệ thống mạng cục bộ và chuyển đi
-	NAT có thể đóng vai trò như là bức tường lửa. Nó giúp người dùng bảo mật được thông tin IP máy tính. Cụ thể, nếu máy tính gặp sự cố khi đang kết nối internet thì địa chỉ IP public (đã cấu hình trước đó) sẽ được hiển thị thay thế cho IP mạng cục bộ

![image.png](https://images.viblo.asia/86697083-1672-469c-b827-9ca16b64ffda.png)

-	NAT có 4 loại thuật ngữ: Địa chỉ inside local, inside global, outside local và outside global
    -	Inside local address: Địa chỉ IP được gán cho một host của mạng trong. Đây là địa chỉ được cấu hình như là một tham số của hệ điều hành trong máy tính hoặc được gán một cách tự động thông qua các giao thức như DHCP. Địa chỉ này không phải là những địa chỉ IP hợp lệ được cấp bởi NIC (Network Information Center) hoặc nhà cung cấp dịch vụ Internet
    -	Inside global address: Đây là địa chỉ IP đã được đăng ký tại NIC hoặc một nhà cung cấp dịch vụ trung gian. Địa chỉ này đại diện cho một hay nhiều địa chỉ IP inside local trong việc giao tiếp với mạng bên ngoài
    -	Outside local: Đây là địa chỉ IP của một thiết bị nằm ở mạng bên ngoài. Các thiết bị thuộc mạng bên trong sẽ tìm thấy thiết bị thuộc mạng bên ngoài thông qua địa chỉ IP này. Địa chỉ outside local không nhất thiết phải được đăng ký với NIC. Nó hoàn toàn có thể là một địa chỉ Private
    -	Outside global: Đây là địa chỉ IP được đặt cho một thiết bị nằm ở mạng bên ngoài. Địa chỉ này là một IP hợp lệ trên mạng internet
    -	Ví dụ:
        -	Các gói tin bắt nguồn từ phần mạng “inside” sẽ có địa chỉ source IP là địa chỉ kiểu “inside local” và destination IP là “ouside local” khi nó còn ở trong phần mạng “inside”. Cũng gói tin đó, khi được chuyển ra mạng “outside” source IP address sẽ được chuyển thành “inside global address” và địa destination IP của gói tin sẽ là “outside global address”
        -	Ngược lại, khi một gói tin bắt nguồn từ một mạng “outside”, khi nó còn đang ở mạng “outside” đó, địa chỉ source IP của nó sẽ là “outside global address”, địa chỉ destination IP sẽ là “inside global address”. Cũng gói tin đó khi được chuyển vào mạng “inside”, địa chỉ source sẽ là “outside local address” và địa chỉ destination của gói tin sẽ là “inside local address”

    ![image.png](https://images.viblo.asia/9d583332-2053-4140-ae81-cf96a88c602f.png)
    
-	Ví dụ:
    -	Host A sử dụng 1 địa chỉ private “192.168.2.23” và Host B sử dụng 1 địa chỉ public "192.31.7.130”. Khi A gửi 1 package đến B, package sẽ được truyền qua router và router thực hiện quá trình NAT
    -	NAT sẽ thay thế địa chỉ nguồn private ip address (192.168.2.23) thành một public IP address (203.10.5.23) và forwards the packet
    -	Với địa chỉ này packet sẽ được định tuyến trên internet tới destination address (192.31.7.130)
    -	Khi host B gửi gói tin hồi đáp tới host A, destination address của gói tin sẽ là 203.10.5.23. gói tin này đi qua router và sẽ được NAT thành địa chỉ 192.168.2.23

    ![image.png](https://images.viblo.asia/15fa069d-7387-40d9-923e-85fcd41b8686.png)

### X. Source và Destination
-	Source IP là địa chỉ của máy gửi, địa chỉ này có thể được đặt bởi người dùng hay cấp phát động qua giao thức DHCP
-	DHCP(Dynamic Host Configuration Protocol) nói một cách đơn giản là có nhiệm vụ quản lý nhanh, tự động và tập trung việc phân phối địa chỉ IP bên trong 1 mạng. Ngoài ra còn giúp đưa thông tin đến các thiết bị hợp lý hơn cũng như việc cấu hình subnet mask hay cổng mặc định
-	Destination IP là địa chỉ đích sẽ tới
-	Ví dụ: 
    -	Khi gửi package 1 từ Host A tới Host B thì ip của Host A sẽ là source IP, còn IP host B là destination IP
    -	Ngược lại, khi gửi từ Host B sang A thì ip B là source còn ip A là destination

     ![image.png](https://images.viblo.asia/15fa069d-7387-40d9-923e-85fcd41b8686.png)
     
### XI. Kết
Thấy bài viết này cũng khá dài rồi nên phần 2 [ở đây](https://viblo.asia/p/basic-network-phan-2-ByEZkjNoKQ0)