# HTTP là gì?
**HTTP** (**H**yper**T**ext **T**ransfer **P**rotocol - Giao thức truyền tải siêu văn bản) là một trong các giao thức chuẩn về mạng Internet, được dùng để **liên hệ thông tin** giữa Máy cung cấp dịch vụ (Web server) và Máy sử dụng dịch vụ (Web client), là giao thức Client/Server dùng cho World Wide Web – WWW

**HTTP** là một giao thức ứng dụng của **bộ giao thức TCP/IP** (các giao thức nền tảng cho Internet).
# Sơ đồ hoạt động của HTTP

![](https://images.viblo.asia/7da268f1-718b-465c-87df-700e766df185.png)
HTTP hoạt động dựa trên mô hình **Client – Server**. Trong mô hình này, các máy tính của người dùng sẽ đóng vai trò làm máy khách (Client). Sau một thao tác nào đó của người dùng, các máy khách sẽ gửi yêu cầu đến máy chủ (Server) và chờ đợi câu trả lời từ những máy chủ này.

**HTTP** là một **stateless protocol**. Hay nói cách khác, request hiện tại không biết những gì đã hoàn thành trong request trước đó.

HTTP cho phép tạo các yêu cầu gửi và nhận các kiểu dữ liệu, do đó cho phép xây dựng hệ thống độc lập với dữ liệu được truyển giao.

# Uniform Resource Locator (URL)
Một **URL** (*Uniform Resource Locator*) được sử dụng để xác định duy nhất một tài nguyên trên Web. Một URL có cấu trúc như sau:

`protocol://hostname:port/path-and-file-name`

Trong một **URL** có 4 thành phần:

* **Protocol**: giao thức tầng ứng dụng được sử dụng bởi client và server
* **Hostname**: tên DNS domain
* **Port**: Cổng TCP để server lắng nghe request từ client
* **Path-and-file-name**: Tên và vị trí của tài nguyên yêu cầu.

# Một số khái niệm liên quan

![](https://images.viblo.asia/1596a7ea-09cc-4a36-82ac-48768e0cb24f.png)
Như đã nói, **HTTP** là một giao thức ứng dụng của **bộ giao thức TCP/IP** (các giao thức nền tảng cho Internet).

**Bộ giao thức TCP/IP** là một bộ các giao thức truyền thông cài đặt **chồng giao thức** mà internet và hầu hết các mạng máy tính thương mại đang chạy trên đó. Bộ giao thức này được đặt tên theo hai giao thức chính của nó là **TCP** (*Transmission Control Protocol* - Giao thức điều khiển truyền vận) và **IP** (*Internet Protocol* - Giao thức Internet).

**Chú ý**: BỘ GIAO THỨC là định nghĩa của các giao thức còn **CHỒNG GIAO THỨC** là một hình thức xử lý bộ giao thức bằng phần mềm

Các giao thức được phân chia thành các tầng, Trong đó **TCP/IP** có 4 tầng
mỗi tầng lại sử dụng các giao thức ở tầng dưới để đạt đc mục đích của mình

### Layer 1. Network Access Layer
**Network Access Layer** xác định chi tiết về về cách thức dữ liệu được gửi qua mạng, bởi các thiết bị phần cứng trực tiếp giao tiếp với môi trường mạng, chẳng hạn như cáp đồng trục, cáp quang hay dây đồng xoắn đôi. Các giao thức bao gồm trong Network Access Layer là Ethernet, Token Ring, FDDI, X.25, Frame Relay ...vv

### Layer 2. Internet Layer
**Internet Layer** đóng gói dữ liệu vào các gói dữ liệu được biết đến dưới dạng các gói tin thông giao thức **Internet Protocol**, chứa địa chỉ nguồn và đích (địa chỉ logic hoặc địa chỉ IP) được sử dụng để chuyển tiếp các gói tin giữa các máy chủ và qua các mạng. 

### Layer 3. Transport Layer
Mục đích của **Transport Layer** là cho phép các thiết bị trên máy chủ nguồn và đích đến trao đổi dữ liệu. **Transport Layer** sẽ xác định mức độ service và trạng thái của kết nối được sử dụng khi vận chuyển dữ liệu.

Trong đó có giao thức chính trong lớp **Transport** là **TCP** (Transmission Control Protocol)

Sử dụng **TCP**, các ứng dụng trên các máy chủ được nối mạng có thể tạo các "kết nối" với nhau, mà qua đó chúng có thể trao đổi dữ liệu hoặc các gói tin. Giao thức này đảm bảo chuyển giao dữ liệu tới nơi nhận một cách đáng tin cậy và đúng thứ tự. 

### Layer 4. Application Layer
Các thực thể của lớp Application cung cấp các ứng dụng cho phép người dùng trao đổi dữ liệu ứng dụng qua mạng

Một số ứng dụng thường gặp của chồng giao thức TCP/IP: **FTP** (File Transfer Protocol), **DNS**

# Các thành phần chính của HTTP #
## HTTP - Requests
**HTTP Request Method**: Là phương thức để chỉ ra hành động mong muốn được thực hiện trên tài nguyên đã xác định.

Cấu trúc của một HTTP Request:

* Một **Request-line** = **Phương thức** + **URI–Request** + **Phiên bản HTTP** . Giao thức HTTP định nghĩa một tập các giao thức GET, POST, HEAD, PUT ... Client có thể sử dụng một trong các phương thức đó để gửi request lên server.

* Có thể có hoặc không các trường **header**
* Một dòng trống để đánh dấu sự kết thúc của các trường **Header**. 

    **Request Header Fields**: Các trường header cho phép client truyền thông tin bổ sung về yêu cầu, và về chính client, đến server. 
    Một số trường: Accept-Charset, Accept-Encoding, Accept-Language, Authorization, Expect, From, Host, …

* Tùy chọn một thông điệp


Khi request đến server, server thực hiện một trong 3 hành động sau:

Server phân tích request nhận được, maps yêu cầu với tập tin trong tập tài liệu của server, và trả lại tập tin yêu cầu cho client.

Server phân tích request nhận được, maps yêu cầu vào một chương trình trên server, thực thi chương trình và trả lại kết quả của chương trình đó.

Request từ client không thể đáp ứng, server trả lại thông báo lỗi.

![](https://images.viblo.asia/87ee0c1c-abac-4d08-973e-e8bae533cbf0.png)

**Giao thức HTTP** định nghĩa một tập các phương thức request, client có thể sử dụng một trong các phương thức này để tạo request tới HTTP server, dưới đây liệt kê một số phương thức phổ biến.

**1 số HTTP Request method thường dùng:**
![](https://images.viblo.asia/b986dced-c499-4051-8efb-5ea5d9b93c02.png)
# HTTP - Responses
Cấu trúc của một HTTP response:

* Một **Status-line** = **Phiên bản HTTP** + **Mã trạng thái** + **Trạng thái**
* Có thể có hoặc không có các trường header
* Một dòng trống để đánh dấu sự kết thúc của các trường header
* Tùy chọn một thông điệp

**Mã trạng thái**: Thông báo về kết quả khi nhận được yêu cầu và xử lí bên server cho client.

**Các kiểu mã trạng thái:**

1xx: Thông tin (100 -> 101) 

* VD: 100 (Continue), ….
    
2xx: Thành công (200 -> 206)

* VD: 200 (OK) , 201 (CREATED), …

3xx: Sự điều hướng lại (300 -> 307)

* VD: 305 (USE PROXY), …

4xx: Lỗi phía Client (400 -> 417)

* VD: 403 (FORBIDDEN), 404 (NOT FOUND), …

5xx: Lỗi phía Server (500 -> 505)

* VD: 500 (INTERNAL SERVER ERROR)


![](https://images.viblo.asia/8414d386-f4e5-4b9c-aded-d3b379dc7c20.png)

# KẾT

Trên là những kiến thức cơ bản về HTTP. Hiểu được các thông tin trên các request message hay các response message giúp bạn dễ dàng hơn trong quá trình phát triển web, hay tìm lỗi.