![](https://images.viblo.asia/a8349c3e-462e-4241-97af-7d58dc605cd7.jpg)


**1. Load balancing là gì**

* Load balancer là một thiết bị hoạt động như một reverse proxy để phân phối lưu lượng truy cập mạng hoặc ứng dụng trên một số máy chủ. Load balancer được sử dụng để tăng khả năng sử dụng ứng dụng đồng thời và độ tin cậy của ứng dụng. Nhằm cải thiện hiệu suất tổng thể của ứng dụng bằng cách giảm gánh nặng trên máy chủ liên quan đến việc quản lý và duy trì các ứng dụng và phiên mạng, cũng như bằng cách thực hiện nhiệm vụ dành riêng cho ứng dụng.

* Load balancers thường được chia thành hai loại chính: Layer 4 và Layer 7.

* Layer 4 load balancer xử lý dữ liệu tìm thấy trong các giao thức tầng mạng và giao vận (IP, TCP, FTP, UDP).

* Layer 7 load balancer phân phối yêu cầu dựa trên dữ liệu tìm thấy trong tầng ứng dụng, lớp giao thức như HTTP.


**2. Sơ lược về L4 và L7 Load Balancing**

* Layer 4 load balancing hoạt động ở tầng trung gian với tầng giao vận của tin nhắn và không liên quan đến nội dung của các tin nhắn. Transmission Control Protocol (TCP) là các giao thức layer 4 cho giao thức truyền siêu văn bản (HTTP) lưu lượng truy cập trên Internet. Layer 4 load balancer chỉ đơn giản là chuyển tiếp gói dữ liệu mạng đến và đi từ máy chủ upstream mà không kiểm tra nội dung của các gói dữ liệu. Có thể đưa ra quyết định định tuyến giới hạn bằng kiểm tra vài gói đầu tiên trong dòng TCP.

* Layer 7 load balancing hoạt động ở các lớp ứng dụng cao cấp, xử lý trực tiếp với nội dung thực tế của mỗi thư. HTTP là giao thức chủ yếu của layer 7 cho việc điều phôi lưu lượng truy cập trang web trên Internet. Layer 7 load balancer điều phối lưu lượng theo một cách tinh vi hơn so với layer 4 load balancer, đặc biệt là áp dụng đối với TCP dựa trên lưu lượng truy cập chẳng hạn như HTTP. Một Layer 7 load balancer chấm dứt mạng lưới giao vận và đọc message bên trong. Nó có thể quyết định cân bằng tải dựa trên nội dung của thư (URL hoặc cookie, …). Sau đó tạo mới một kết nối TCP mới đến máy chủ upstream đã chọn (hoặc tái sử dụng nếu sẵn có bằng phương pháp HTTP keepalives) và tạo ra yêu cầu đến máy chủ.


**3. Sự khác biệt giữa NAT và DSR**

Hình ảnh sau đây minh hoạ sự khác biệt giữa NAT và DSR trong cân bằng tải:

![](https://images.viblo.asia/328065c6-a679-4ff7-863b-4ea0464097ae.png)

* Dễ dàng thấy rằng các client (192.0.2.1) kết nối đến tải cân bằng (LB) trên VIP (IP ảo) (192.0.2.253).

* Trong trường hợp NAT, các LB NAT kết nối thông qua máy chủ 1 hoặc máy chủ 2. Các máy chủ có LB là cổng mặc định, do đó các replies đi ra ngoài thông qua LB rồi quay lại client. IP-wise, client thấy 192.0.2.1:1024 -> 192.0.2.253:80, LB thấy 192.0.2.1:1024 -> 192.0.2.253:80 -> 10.0.0.10:80 và server thấy 192.0.2.1:1024 -> 10.0.0.10:80.

* Trong trường hợp DSR, LB không NAT kết nối trên IP layer nhưng chuyển tiếp gói tin đến máy chủ ảnh hưởng. Trong trường hợp này, client, LB và server thấy 192.0.2.1:1024 -> 192.0.2.253:80. Tất nhiên, các máy chủ cần phải chấp nhận lưu lượng truy cập cho VIP, nên được cấu hình trên một loopback interface (không phải trên một real interface). Bây giờ khi máy chủ replies, lưu lượng truy cập đi trực tiếp từ máy chủ thông qua các bộ định tuyến cho client và hoàn toàn bỏ qua LB.


**4. Các loại và cách hoạt động của thuật toán cân bằng tải**

Một số thuật toán tiêu chuẩn như sau:

**1. Random**

Phương pháp này phân phối tải trọng trên các máy chủ có sẵn một cách ngẫu nhên, chọn một máy chủ thông qua thế hệ số ngẫu nhiên và gửi kết nối hiện thời cho nó. Phương pháp này được sử dụng phổ biến và hữu dụng trên nhiều tải cân bằng, ngoại trừ trường hợp xuất hiện các server bị ngừng hoạt động (down).

**2. Round robin**

Round Robin chuyển mỗi yêu cầu kết nối mới tới server tiếp theo trong hệ thống, kết quả cuối cùng là phân phối kết nối đồng đều trên các server. Round Robin hoạt động tốt trong hầu hết cấu hình, nhưng có thể là tốt hơn nếu thiết bị bạn đang tải cân bằng không phải là đương trong về processing speed, connection speed, memory.

**3. Weighted round robin**

Với phương pháp này, số lượng kết nối tới mỗi máy nhận được qua thời gian là tương ứng với một trọng lượng tỷ lệ được xác định trên mỗi máy. Đây là một sự cải tiến trong Round Robin bởi vì bạn có thể nói “Máy #3 có thể xử lý 2 lần tải trọng của máy #1 và #2”, và cân bằng tải sẽ gửi hai yêu cầu đến máy #3 cho mỗi yêu cầu đến các máy khác.

**4. Least connections**

Với phương pháp này, Hệ thống chuyển một kết nối mới tới máy chủ mà có ít nhất số lượng kết nối nhất hiện thời. Ít kết nối nhất là phương pháp làm việc tốt nhất trong môi trường nơi mà các máy chủ hoặc các thiết bị khác mà bạn đang áp dụng cân bằng tải có khả năng tương tự nhau. Đây là một phương pháp cân bằng động tải, phân phối các kết nối dựa trên các khía cạnh khác nhau của thời gian thực máy chủ phân tích hiệu suất, chẳng hạn như số kết nối mỗi nút hoặc thời gian phản ứng nhanh nhất nút ở thời điểm hiện tại.

**5. Least response time**

Phương pháp này chọn máy chủ có ít số lượng kết nối hoạt động nhất và thời gian phản ứng trung bình ít nhất. Thời gian phản ứng cũng được gọi là Time to First Byte, hoặc TTFB là khoảng thời gian giữa gửi một gói dữ liệu yêu cầu đến một máy chủ và nhận gói tin trả lời đầu tiên trở lại. Phân phối giao vận dựa trên thời gian phản ứng nhanh nhất từ các máy chủ, điều này cho phép các máy chủ đáp ứng một cách nhanh chóng nhất các yêu cầu từ client.


**5.1 Các Aplication thường sử dụng để tạo Load Balancer trong Linux**

* Trong Linux, chúng ta có thể sử dụng máy chủ ảo Linux (LVS) như là một cân bằng tải, của nó cho phép tải cân bằng của các dịch vụ mạng như máy chủ web và thư bằng cách sử dụng Layer 4 Switching. Đây là cách cực kỳ nhanh chóng và cho phép các dịch vụ nhỏ có thể phục vụ 10s hoặc 100s của hàng ngàn đồng thời kết đồng thời.

* Ngoài ra, chúng ta có thể sử dụng HAProxy, Pound và Nginx hoạt động như một Layer 7 reverse proxy.

**6. Thực hành với LVS**

Trong thử nghiệm này, tôi đang sử dụng máy chủ ảo Linux (LVS) trên Ubuntu 12.04 để tạo một cân bằng tải của hai máy chủ thực sự (back end nodes, running Apache)


* Step 1: Cài đặt LVS:

* Step 2: Cài đặt TCP virtual service trên 192.168.1.75 port 80, Sử dụng round-robin algorithm. Thêm 2 nodes chạy trên apache 2.4

* Step 3: Xác nhận địa chỉ IP đã thêm vào

* Step 4: Truy cập qua CURL command line

* Step 5: Truy cập qua Web Browser 


Có thể thấy rằng server được chuyển đổi khi người dùng truy cập web page.

Tham khảo : Techzones.me