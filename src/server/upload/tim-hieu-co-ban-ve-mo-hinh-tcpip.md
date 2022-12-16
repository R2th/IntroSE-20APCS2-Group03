Chúng ta đang sống trong thời đại cách mạng công nghiệp và Internet là thứ không thể thiếu. Đố mọi người sống 1 ngày mà không lên mạng đó:smile:. Như mình là mình không làm được đâu (ham chơi game):sweat:. Vậy mọi người có hiểu rõ cách thức hoạt động của Internet ra sao không? TCP/ IP chính là một phương thức truyền dẫn được sử dụng khá phổ biến đối với Internet ngày nay. Nhưng TCP/ IP có mô hình ra sao? Chức năng của mỗi tầng trong mô hình TCP/IP là gì? Bài viết này mình sẽ giới thiệu cơ bản về TCP/IP:grin:
## 1. Mô hình TCP/IP
**TCP/IP** là tên viết tắt của cụm từ **Transmission Control Protocol/Internet Protocol**, là một tập hợp các giao thức (protocol) trao đổi thông tin được sử dụng để truyền tải và kết nối các thiết bị trong mạng Internet.
Cụ thể hơn, TCP/IP chỉ rõ cho chúng ta cách thức đóng gói thông tin (còn được gọi là gói tin ), được gửi và nhận bởi các máy tính có kết nối với nhau. (Dễ hiểu phải không ạ:upside_down_face:)

![](https://images.viblo.asia/653e97ca-c80d-415e-9547-7395a3309c32.png)

- Mô hình TCP/IP tiêu chuẩn bao gồm 4 tầng được chồng lên nhau là:

    - Tầng 1: Tầng vật lý (Network Access - dịch có vẻ k đúng nhưng nó chính là tầng vật lý nhé:slightly_smiling_face:)
    - Tầng 2: Tầng mạng (Internet)
    - Tầng 3: Tầng giao vận (Transport)
    - Tầng 4: Tầng ứng dụng (Application).

Vậy chức năng của các tầng này như thế nào? Chúng ta cùng tìm hiểu tiếp nhé!
## 2. Mô hình phân tầng trong TCP/IP
### Tầng ứng dụng (Application)
Nhìn tên gọi của nó chúng ta cũng biết nó có nhiệm vụ gì rồi phải không ạ:slightly_smiling_face:. 
- Nó cung cấp giao tiếp đến người dùng.
- Cung cấp các ứng dụng cho phép người dùng trao đổi dữ liệu ứng dụng thông qua các dịch vụ mạng khác nhau (như duyệt web, chat, gửi email,...).
- Dữ liệu khi đến đây sẽ được định dạng theo kiểu byte nối byte, cùng với đó là các thông tin định tuyến giúp xác định đường đi đúng của một gói tin.

**Một số giao thức trao đổi dữ liệu**
* ***FTP (File Transfer Protocol):*** giao thức chạy trên nền TCP cho phép truyền các file ASCII hoặc nhị phân theo 2 chiều.
* ***TFTP (Trival File Transfer Protocol)*** : giao thức truyền file chạy trên nền UDP.
* ***SMTP ( Simple Mail Transfer Protocol)*** : giao thức dùng để phân phối thư điện tử.
* ***Telnet*** : cho phép truy nhập từ xa để cấu hình thiết bị.
* ***SNMP (Simple Network Managerment Protocol)*** : Là ứng dụng chạy trên nền UDP , cho phép quản lý và giám sát các thiết bị mạng từ xa.
* ***Domain Name System ( DNS)*** : Là giao thức phân giải tên miền, được sử dụng trong hỗ trợ truy nhập Internet.
### Tầng giao vận (Transport)
- Chịu trách nhiệm duy trì liên lạc đầu cuối trên toàn mạng.
- Tầng này có 2 giao thức chính là ***TCP ( Transmisson Control Protocol)*** và ***UDP ( User Datagram Protocol )***

    - ***TCP*** sẽ đảm bảo chất lượng truyền gửi gói tin, nhưng tốn khá nhiều thời gian để kiểm tra đầy đủ thông tin từ thứ tự dữ liệu cho đến việc kiểm soát vấn đề tắc nghẽn lưu lượng dữ liệu.
    - Trái với TCP, ***UDP*** có thấy tốc độ truyền tải nhanh hơn nhưng lại không đảm bảo được chất lượng dữ liệu được gửi đi (tức là nó không quan tâm dữ liệu có đến được đích hay không).
   
   Mình sẽ nói kỹ 2 thằng này hơn ở bài sau nhé:wink:
   
### Tầng mạng (Internet)
- Xử lý quá trình truyền gói tin trên mạng.
- *Định tuyến:* tìm tuyến đường qua các nút trung gian để gửi dữ liệu từ nguồn tới đích.
- *Chuyển tiếp*: chuyển tiếp gói tin từ cổng nguồn tới cổng đích theo tuyến đường.
- *Định địa chỉ* : định danh cho các nút mạng.
- *Đóng gói dữ liệu*: nhận dữ liệu từ giao thức ở trên, chèn thêm phần Header chứa thông tin của tầng mạng và tiếp tục được chuyển đến tầng tiếp theo.
- *Đảm bảo chất lượng dịch vụ(QoS)*: đảm bảo các thông số phù hợp của đường truyền theo từng dịch vụ.
>  **QoS (Quality of Service)** là tập hợp các kĩ thuật cho phép cấp phát các tài nguyên một cách thích hợp cho các loại dữ liệu khác nhau, từ đó có thể đảm bảo chất lượng dịch vụ mạng cho các loại dữ liệu này .
- Các giao thức của tầng này bao gồm: **IP** ([Internet Protocol](https://en.wikipedia.org/wiki/Internet_Protocol) - giao thức được sử dụng rộng rãi trong mọi hệ thống mạng trên phạm vi toàn thế giới), **ICMP** ([Internet Control Message Protocol](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)), **IGMP** ([Internet Group Message Protocol](https://en.wikipedia.org/wiki/Internet_Group_Management_Protocol)).

### Tầng vật lý (Network Access)
- Nó là sự kết hợp của tầng Data Link và Physical trong mô hình [OSI](https://en.wikipedia.org/wiki/OSI_model) (Mô hình này các bạn tìm hiểu thêm nhé. Bản chất nó cũng tương tự như TCP/IP)
- Là tầng thấp nhất trong mô hình TCP/IP.
- Chịu trách nhiệm truyền dữ liệu giữa các thiết bị trong cùng một mạng. Tại đây, các gói dữ liệu được đóng vào khung (Frame) và được định tuyến đi đến đích được chỉ định ban đầu.

## 3. Cách thức hoạt động của TCP/IP
![](https://images.viblo.asia/d1649da3-07df-43eb-8466-3f9257efcc3a.jpg)

Khi truyền dữ liệu , quá trình tiến hành từ tầng trên xuống tầng dưới, qua mỗi tầng dữ liệu được thêm vào thông tin điều khiển gọi là Header. Khi nhận dữ liệu thì quá trình xảy ra ngược lại, dữ liệu được truyền từ tầng dưới lên và qua mỗi tầng thì phần header tương ứng sẽ được lấy đi và khi đến tầng trên cùng thì dữ liệu không còn phần header nữa.
- Ở đây, **IP** có vai trò quan trọng, nó cho phép các gói tin được gửi đến đích đã định sẵn, bằng cách thêm các thông tin dẫn đường (chính là Header) vào các gói tin để các gói tin được đến đúng đích đã định sẵn ban đầu.
- Giao thức **TCP** đóng vai trò kiểm tra và đảm bảo sự an toàn cho mỗi gói tin khi đi qua mỗi trạm. Trong quá trình này, nếu giao thức TCP nhận thấy gói tin bị lỗi, một tín hiệu sẽ được truyền đi và yêu cầu hệ thống gửi lại một gói tin khác.

![](https://images.viblo.asia/a6f03a23-db41-4fe0-840a-c9c04ce49dbb.jpg)
Hình trên là cấu trúc dữ liệu qua các tầng. Trong hình mọi người sẽ thấy ở mỗi tầng khác nhau dữ liệu được truyền vào là khác nhau
* Tầng ứng dụng: dữ liệu là các luồng được gọi là stream. 
* Tầng giao vận: đơn vị dữ liệu mà TCP gửi xuống gọi là TCP segment. 
* Tầng mạng: dữ liệu mà IP gửi xuống tầng dưới gọi là IP Datagram 
* Tầng liên kết: dữ liệu được truyền đi gọi là frame.

## 4. Ưu điểm của mô hình TCP/IP
- Không chịu sự kiểm soát của bất kỳ tổ chức nào => chúng ta có thể tự do trong việc sử dụng:grin:
- Có khả năng tương thích cao với tất cả các hệ điều hành, phần cứng máy tính và mạng => hoạt động hiệu quả với nhiều hệ thống khác nhau.
- Có khả năng mở rộng cao, có thể định tuyến => có thể xác định được đường dẫn hiệu quả nhất.

Trên đây là giới thiệu tổng quan về mô hình TPC/IP mà mình tìm hiểu được thông qua sách vở giảng dạy trên lớp của mình:sweat_smile:. Hi vọng giờ các bạn có thể hiểu cách thức hoạt động của Internet ra sao. 

Để hiểu kỹ hơn về 2 giao thức TCP và UDP ở tầng transport mọi người có thể xem [tại đây](https://viblo.asia/p/giao-thuc-tcp-va-udp-jvEla11xlkw) vì đây cũng là 2 giao thức quan trọng trong mô hình này.

Thanks for reading:sparkling_heart: