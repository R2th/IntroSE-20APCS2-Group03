Trước khi tìm hiểu về Protocol Testing, hãy hiểu:

## Protocol là gì?
Khi máy tính giao tiếp với nhau, có một bộ quy tắc và điều kiện chung mà mỗi máy tính phải tuân theo. Nói cách khác, các Protocol xác định cách dữ liệu được truyền giữa các thiết bị máy tính và Networks.
## Protocol Testing
Protocol Testing là một phương pháp Test các Protocol truyền thông trong các lĩnh vực Switching, Wireless, VoIP, Routing, v.v. Mục tiêu chính của Protocol Testing là kiểm tra cấu trúc của packets được gửi qua network bằng các công cụ test. Routers và switches được sử dụng trong quá trình test để tạo thành các bộ phận của thiết bị và sản phẩm được kiểm thử.
## Routed và Routing Protocols
Protocols được phân thành hai loại routed protocols và routing protocols
* **Routed protocols** : Routed protocols có thể được sử dụng để gửi dữ liệu người dùng từ mạng này sang mạng khác. Nó mang lưu lượng truy cập của người dùng như e-mail, lưu lượng truy cập web, truyền tệp, v.v. Các giao thức được định tuyến là IP, IPX và AppleTalk.

* **Routing protocols** : Routing protocols là giao thức mạng xác định các tuyến đường cho các bộ định tuyến. Nó chỉ được sử dụng giữa các bộ định tuyến. Ví dụ: RIP, IGRP, EIGRP, v.v.

Nói một cách dễ hiểu, một router giống như một chiếc xe buýt được sử dụng để vận chuyển trong khi các routing protocol là các tín hiệu trên đường.

Dựa trên loại giao tiếp, các protocol khác nhau sẽ được sử dụng. Các công ty như CISCO, JUNIPER, ALCATEL sản xuất các thiết bị mạng như routers, modems, wireless, v.v. sử dụng các protocols khác nhau để giao tiếp, chẳng hạn như Cisco sử dụng EIGRP, OSPF, v.v. Protocol testing không gì khác ngoài việc kiểm tra xem EIGRP (Enhanced Interior Gateway Routing Protocol) hoặc OSPF (Open Shortest Path First) hoặc bất kỳ Protocol nào khác đang hoạt động theo tiêu chuẩn tương ứng hay không.

## Các loại Protocol máy tính

![](https://images.viblo.asia/17cbac6c-74e1-4b32-819f-ccc181179458.png)


**TCP / IP** - Protocol điều khiển truyền dẫn / Protocol Internet, **UDP / ICMP** - Protocols dữ liệu người dùng / Protocol thông báo điều khiển Internet, **POP3 / SMTP** - Protocol bưu điện / Protocol truyền thư đơn giản, **HTTP** - Protocol truyền siêu văn bản, **FTP** - Protocols truyền tệp

## Các loại network Protocol khác nhau (L2 và L3)
Mô hình OSI có tổng cộng 7 layers giao tiếp mạng, trong đó  layer 2 và layer 3 là rất quan trọng.

Layer 2: Là layer liên kết dữ liệu. Địa chỉ Mac, Ethernet, Token Ring và Frame Relay là tất cả các ví dụ về layer liên kết Dữ liệu.
Layer 2: Là layer mạng xác định đường dẫn tốt nhất hiện có trong mạng để giao tiếp. Địa chỉ IP là một ví dụ của layer 3.

## Cách thực hiện Protocol Testing
* Để Protocol Testing, bạn cần trình giả lập (simulator) và phân tích Protocol 
* Bộ phân tích Protocol đảm bảo giải mã thích hợp cùng với phân tích cuộc gọi và phiên làm việc. Trong khi trình giả lập thực hiện giả lập các thực thể khác nhau của phần tử mạng
* Thông thường, Protocol Testing được thực hiện bởi DUT (thiết bị được kiểm thử) đối với các thiết bị khác như switches routers và định cấu hình Protocol trong đó
* Sau đó kiểm tra cấu trúc Packet của các Packet được gửi bởi các thiết bị
* Nó kiểm tra khả năng mở rộng, hiệu suất, thuật toán Protocol, v.v. của thiết bị bằng cách sử dụng các công cụ như lxNetworks, Scapy và Wireshark

## Các loại test được sử dụng cho Protocol Testing
Protocol Testing bao gồm functionality, performance, protocol stack, khả năng tương tác, v.v. Trong quá trình Protocol Testing về cơ bản, ba yếu tố kiểm thử được thực hiện.

* Tính đúng đắn : Chúng ta có nhận được gói X như chúng ta mong đợi không
* Độ trễ : Một gói tin mất bao lâu để vận chuyển trong hệ thống
* Băng thông : Chúng ta có thể gửi bao nhiêu gói tin mỗi giây

Protocol Testing có thể được tách biệt thành hai loại. Stress và Reliability Tests và Functional Tests. Stress và Reliability Tests bao gồm  Load Testing, Stress Testing, Performance Testing , vv Trong khi Functional Tests bao gồm negative testing, conformance testing, interoperability testing, v.v

## Các Test Cases dùng cho Protocol Testing của thiết bị mạng

![](https://images.viblo.asia/653eb1dd-81fe-42da-b22d-272a8b9db18c.png)

Đây là trường hợp thử nghiệm mẫu cho routers


## Các công cụ dùng cho Protocol Testing
Hãy thảo luận về các công cụ test quan trọng nhất được sử dụng để xác minh các Protocol

### Scapy để tạo Packet 
Scapy là một chương trình thao tác Packet tương tác mạnh mẽ. Nó cho phép bạn

* Tạo Packet tin
* Giải mã các Packet trên mạng
* Chụp các Packet và phân tích chúng
* Đưa các Packet vào network

Vì vậy, về cơ bản, scapy chủ yếu làm hai việc: nhận câu trả lời và gửi Packet. Bạn xác định các Packet, nó sẽ gửi chúng, nhận câu trả lời, so khớp các yêu cầu với câu trả lời và trả về danh sách các cặp Packet và danh sách các Packet chưa khớp.

Nó cũng có thể xử lý những thứ khác cũng như trace-routing, unit tests,  tấn công hoặc khám phá network, phát triển Protocol mới, thăm dò, v.v.

Scapy cho phép viết một tập lệnh Python, thực hiện một tác vụ như gửi và nhận Packet hoặc đánh hơi Packet. Ví dụ, scapy có thể đánh hơi data packet bằng cách sử dụng tập lệnh Python. Lệnh mở getdit được nhập trong trình chỉnh sửa

![](https://images.viblo.asia/1596ec6a-ca68-4053-a07e-bdfa3caf5167.png)


Nó sẽ đánh hơi 10 Packet và ngay sau khi nó đánh hơi được 10 Packet, nó sẽ in ra bản tóm tắt. Scapy cũng như một mảng lệnh để gửi và nhận Packet cùng một lúc

## Công cụ Wireshark để phân tích
Công cụ được sử dụng để thực hiện protocol testing - Wireshark. Nó cho phép nắm bắt các Packet trong thời gian thực và hiển thị chúng ở dạng con người có thể đọc được. Nó cho phép bạn tìm hiểu sâu về lưu lượng network và kiểm tra các Packet riêng lẻ bằng cách sử dụng mã màu và bộ lọc.

Wireshark nắm bắt các Packet giúp xác định khi nào phiên được thiết lập, thời điểm bắt đầu truyền dữ liệu chính xác và lượng dữ liệu được gửi mỗi lần, v.v.

Wireshark có một tập hợp các tính năng phong phú bao gồm

* Kiểm tra kỹ lưỡng hàng trăm protocol, nhiều protocol được thêm vào mọi lúc
* Chụp trực tiếp và phân tích ngoại tuyến
* Phân tích VoIP phong phú
* Trình duyệt đóng gói ba ngăn tiêu chuẩn
* Chạy trên nhiều nền tảng như Windows, Linux, OSX, v.v.
* Dữ liệu mạng đã chụp có thể được duyệt qua GUI
* Giải mã hỗ trợ nhiềuprotocol như IPsec, ISAKMP, SSL / TLS
* Dữ liệu trực tiếp có thể được đọc từ Ethernet, ATM, Bluetooth, USB, mã thông báo, v.v.
* Đầu ra có thể được xuất sang CSV, XML, văn bản thuần túy, v.v.

## TTCN

TCCN là một ngôn ngữ test tiêu chuẩn để xác định Test Scenario và việc triển khai chúng để thực hiện protocol testing. TCCN test suite chứa nhiều test cases được viết bằng ngôn ngữ lập trình TTCN và nó được sử dụng để thực hiện  testing reactive systems or behavioral testing.

Ví dụ: một máy bán cà phê cung cấp cà phê cho bạn khi bạn cho vào một đồng đô la nhưng không phản hồi nếu bạn đưa bất kỳ một tờ tiền nào nhỏ hơn một đồng đô la. Để lập trình các máy như vậy, ngôn ngữ TCCN3 được sử dụng. Để làm cho máy pha cà phê phản hồi khi đưa đồng xu vào, chúng ta phải viết thành phần TCCN-3 hoạt động như một máy pha cà phê. Nó cho phép chúng ta chạy thử nghiệm của mình trước khi máy pha cà phê thực sự có sẵn dưới dạng sản phẩm. Sau khi hoàn tất, chúng ta sẽ kết nối bộ thử nghiệm TCCN3 với thiết bị bên ngoài.

![](https://images.viblo.asia/c395be0b-1979-4751-bf07-3d2a3b1df87e.png)

Hệ thống kiểm tra phát ra tín hiệu (đồng đô la) và nhận phản hồi (cà phê). Bộ điều hợp tín hiệu thu nhận các tín hiệu từ hệ thống thử nghiệm và chuyển chúng đến hệ thống đang thử nghiệm. Bộ điều hợp phản hồi chờ các phản hồi của hệ thống đang được thử nghiệm và chuyển chúng đến hệ thống thử nghiệm.

TCCN3 có thể được sử dụng trong các lĩnh vực khác nhau như

* Truyền thông di động (LTE, WiMAX, 3G, v.v.)
* Công nghệ băng thông rộng (ATM, DSL)
* Nền tảng phần mềm trung gian (Dịch vụ web, CORBA, v.v.)
* Internet protocol(SIP, IMS, IPv6)
* Smart Cards
* Automotive (AutoSAR, MOST, CAN)

Trong TCCN, chúng ta có thể xác định

* Test Suites
* Test Cases
* Test Steps
* Khai báo các biến
* Khai báo bộ hẹn giờ
* Tạo PDU, v.v.

TCCN có thể được tích hợp với các loại hệ thống của các ngôn ngữ khác như ASN.1, XML, C / C ++. Ngôn ngữ cốt lõi của TCCN3 tồn tại ở định dạng văn bản ngoài các định dạng khác như bảng, đồ họa và bản trình bày.

> Bài viết được dịch lại từ nguồn: https://www.guru99.com/protocol-testing.html