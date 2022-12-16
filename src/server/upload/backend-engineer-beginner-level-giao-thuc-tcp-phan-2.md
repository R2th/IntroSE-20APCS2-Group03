### *Truyền thông tin trên kết nối Connection Based

![image.png](https://images.viblo.asia/e95bfa18-43a9-448d-9594-9dee1c415425.png)

Sau khi quá trình **Three-WayHandshake** tạo được **Connection** cho máy tính cá nhân và máy chủ với nhau thì bây giờ máy tính các nhân và  máy chủ có thể gửi các ****ACK-Segment Y**** cho nhau.

Theo ví dụ thì máy tình cá nhân sẽ gửi **Segment X** cho máy chủ. Sau khi nhận được máy chủ sẽ gửi **ACK-Segment X** đến máy tính cá nhân là đã nhận được thành công. Ngược lại thì khi máy tính cá nhân nhận được **Segment Y** từ máy chủ thì máy tính cá nhân cũng sẽ gửi **ACK-Segment Y** đến máy chủ để xác nhận nhận thành công.

### *Ưu điểm của TCP

Trông trường hợp 1 thời gian cố định mà máy tính gửi **Segment Z** mà không nhận được **ACK-Segment Z** từ máy chủ thì Segment đó sẽ được gửi lại và điều đó giúp **TCP** có được thêm **3 ưu điểm.**

* Cung cấp cơ chế báo nhận (**Acknowledgement**)
* Cơ chế đảm bảo tin cậy (**Guaranteed Delivery**)
* Phục hồi dữ liệu bị mất trên đường truyền (**Recovery**)

Trường hợp có nhiều Segment giống nhau gửi đến thì TCP sẽ lọc ra các Segment giống và **giữ lại một Segment duy nhất**. Các Segment sẽ được đánh số **SEQ # ID** giúp người nhận có thế biết được thứ tự của các Segment và sau đó kết hợp chúng lại với nhau tạo thành các **gói tin** theo thứ tự mà thiết bị gửi mong muốn.
Điều này làm TCP có thêm các ưu điểm: 
* Đảm bảo thứ tự của các gói tin (**Odered Package**)
* Ngoài ra TCP còn cung cấp các cơ chế kiểm tra để đảm bảo kiểm soát luồng (**Flow Control**) để không làm quá tải bên nhận.
* Ngoài ra còn kiểm soát tắc nghẽn (**Congestion Control**) để việc truyền dữ liệu không gây tắc nghẽn mạng
* Đồng thời TCP cũng hỗ trợ truyền dữ liệu kiểu (**Pipeline**) nghĩa là cùng 1 lúc gửi nhiều phân đoạn Segment và thông báo cùng 1 lúc nhận được nhiều phân đoạn Segment để tăng hiệu quả giao nhận.

### *Nhược điểm của TCP
* Gói tin package thường rất lớn vì phải chứa nhiều thông tin hơn để duy trì các ưu điểm của nó (**Larger Packger**).
* Vì gói tin lớn nên TCP sẽ tốn nhiều băng thông đường truyền (**More Bandwidth**), tốn thời gian để khởi tạo và duy trì kết nối **Connection** làm TCP chậm hơn nếu so sánh với **Giao thức UDP** (**Slower than UDP**)
* Do phải duy trì Connection nên TCP là **Giao thức có trạng thái** (**Stateful**) nghĩa là 1 trong 2 thiết bị mất kết nối thì chúng ta phải khởi động lại kết nối từ ban đầu.

### *Đóng kết nối 
![image.png](https://images.viblo.asia/fc82eed7-e35e-4d5e-86ec-1d69934d6f89.png)

Để đóng 1 kết nối Connection TCP thì chúng ta sẽ thực hiện 4 bước.
**STEP 1:** Máy tính cá nhân gửi 1 tin nhắn **FIN** đến máy chủ.

**STEP 2:** Máy chủ nhận tin nhắn và trả lời 1 tin nhắn **ACK** thông báo đã nhận được và đồng thời chuyển trạng thái **Connection** về trạng thái chờ đóng và gửi tin nhắn **FIN** đến máy tính cá nhân.

**STEP 3:** Máy tính cá nhân nhận được tin nhắn sau đó gửi 1 tin nhắn **ACK** trả lời đến máy chủ thông báo đã nhận.

**STEP 4:** Sau khi máy chủ nhận được tin nhắn **ACK** từ máy tính cá nhân thì kết nối **Connection được đóng lại.**

### *Các ứng dụng của TCP

Với rất nhiều ưu điểm của mình thì TCP được ứng dụng rất phổ biến trong một số ứng dụng hay giao thức được xây dựng trên nền tảng của TCP. Mình liệt kê 1 số giao thức và ứng dụng dựa trên TCP như sau: 

* **HTTP** đây là giao thức nền tảng cơ bản phổ biến được sử dụng trong các webside và mobile.
* **SSH** giúp chúng ta kết nối vào **Server**
* **FTP** giúp chúng ta truyền file và dowload file
* **Ứng dụng Telnet** sử dụng TCP để kết nối
* **SMTP** giúp chúng ta về các ứng dụng gửi nhận email
* **IMAP/POP** giúp chúng ta xây dựng các ứng dụng gửi nhận email

Đây là 2 bài viết mình giới thiệu về **Giao thức TCP** từ 1 lập trình viên Backend Engineer. Các bạn đọc và có câu hỏi hay bài viết thiều hay sai gì thì góp ý bằng comment để mình giải đáp và cập nhật kịp thời cho chính xác. Bài tiếp theo của mình sẽ là **Giao thức UDP**