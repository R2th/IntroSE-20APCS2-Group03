![image.png](https://images.viblo.asia/82d155a5-9b81-42cc-9b6e-e9fc5e979656.png)
* **Application layer**

Tầng ứng dụng là tầng gần với người sử dụng nhất. Nó cung cấp phương tiện cho người dùng truy nhập các thông tin và dữ liệu trên mạng thông qua chương trình ứng dụng. Tầng này là giao diện chính để người dùng tương tác với chương trình ứng dụng, và qua đó với mạng.

Một số ví dụ về các ứng dụng trong tầng này bao gồm Telnet, Giao thức truyền tập tin FTP và Giao thức truyền thư điện tử SMTP, HTTP, X.400 Mail remote...

* **Presentation layer**

Lớp trình diễn hoạt động như tầng dữ liệu trên mạng. lớp này trên máy tính truyền dữ liệu làm nhiệm vụ dịch dữ liệu được gửi từ tầng Application sang dạng Fomat chung. Và tại máy tính nhận, lớp này lại chuyển từ Fomat chung sang định dạng của tầng Application.

Lớp thể hiện thực hiện các chức năng sau:
Dịch các mã kí tự từ ASCII sang EBCDIC.
Chuyển đổi dữ liệu.
Nén dữ liệu để giảm lượng dữ liệu truyền trên mạng.
Mã hoá và giải mã dữ liệu để đảm bảo sự bảo mật trên mạng.

* **Session layer**


Nhiệm vụ của lớp này là thiết lập, duy trì và kết thúc giao tiếp với các thiết bị nhận

* **Transport layer**

Lớp này duy trì kiểm soát dòng chảy của dữ liệu và thực hiện kiểm tra lỗi và khôi phục dữ liệu giữa các thiết bị. Ví dụ phổ biến nhất của tầng giao vận là Transmission Control Protocol (TCP) và User Datagram Protocol (UDP).
* **Network layer**

Lớp này cung cấp địa chỉ logic mà router sẽ sử dụng để xác định đường đi đến đích.Trong hầu hết các trường hợp, địa chỉ logic ở đây có nghĩa là các địa chỉ IP (bao gồm nguồn & địa chỉ đích IP.


* **Datalink layer**

Lớp này đảm bảo việc biến đổi các tin dạng bit nhận được từ lớp dưới (vật lý) sang khung số liệu, thông báo cho hệ phát kết quả thu được sao cho các thông tin truyền lên cho tầng Network không có lỗi.


* **Physical layer**

Là tầng thứ nhất trong bảy tầng Mô hình OSI, tầng này chịu trách nhiệm ứng đối với các đòi hỏi về dịch vụ từ Datalink Layer.

Chức năng và dịch vụ chính mà tầng vật lý giải quyết là:

Thiết lập hoặc ngắt mạch kết nối điện (electrical connection) với một phương tiện truyền thông (transmission medium)

Tham gia vào quy trình mà trong đó các tài nguyên truyền thông được chia sẻ hiệu quả giữa nhiều người dùng. Chẳng hạn giải quyết tranh chấp tài nguyên (contention) và điều khiển lưu lượng

Điều biến (modulation), hoặc biến đổi giữa biểu diễn dữ liệu số (digital data) của các thiết bị người dùng và các tín hiệu tương ứng được truyền qua kênh truyền thông (communication channel)

Các bạn đọc kỹ phần này để sang phần phương thức hoạt động có thể dễ hiểu nhất.