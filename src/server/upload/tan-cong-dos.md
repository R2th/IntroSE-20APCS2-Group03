![](https://images.viblo.asia/89367cd2-6d3e-44d7-bc2c-aa39bd676d79.png)

# Giới thiệu
Tấn công DoS hay tấn công từ chối dịch vụ là điều không còn quá xa lạ với chúng ta ngày nay. Tấn công DoS nhằm mục đích không cho người dùng hợp pháp truy cập vào các dịch vụ như: ứng dụng web, email, network, hoặc làm cho chúng chậm nhất có thể. DoS là được viết tắt bởi [**D**enial **o**f **S**ervice](https://en.wikipedia.org/wiki/Denial-of-service_attack#History). Tấn công DoS thường thực hiện bằng cách cố gắng làm cạn kiệt tài nguyên server, từ đó server có thể bị dừng hoạt động hoặc xử lý chậm do đang thiếu tài nguyên.

Tấn công DoS không thể đánh cắp dữ liệu nhạy cảm trên server mà chỉ ngăn người dùng hợp pháp không thể sử dụng dịch vụ khi họ muốn. Kiểu tấn công này đang tấn công vào [**tính sẵn sàng của thông tin**](https://anninhmang.edu.vn/tam-giac-bao-mat-cia/) từ đó gây ra thiệt hại cho chủ sở hữu của hệ thống. Ngân hàng hay các sàn giao dịch là mục tiêu điển hình của tấn công DoS, khi dịch vụ bị ngừng hoạt động thì thiệt hại về kinh tế là điều dễ thấy nhất. Do đó, mặc dù tấn công DoS không thể đánh cắp dữ liệu nhạy cảm nhưng thiệt hại mà nó gây ra rất đáng khủng khiếp.

# Các loại tấn công
Ta hay nghe nói Tấn công DoS và tấn công DDoS, cả 2 điều là tấn công từ chối dịch vụ (Denial of Service). Nhưng chúng có điểm khác biệt như sau
* DoS: Tấn công được thực hiện bởi một máy, hay trong một vài tài liệu là trong cùng một LAN
* DDoS: Tấn công được thực hiện từ nhiều nguồn khác nhau, từ nhiều IP public khác nhau.

![](https://images.viblo.asia/2302e407-dc77-4a31-99c4-ffc716b96721.png)

Như ta thấy tấn công DoS được ngầm hiểu là loại tấn công thứ nhất.

# Các kỹ thuật tấn công điển hình
## Ping of Death

Ping là một công cụ mạng được sử dụng để kiểm tra mạng. Ping gửi các gói tin [ICMP](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol) để thực hiện kiểm tra mạng. Theo mặc định kích thước của gói tin ICMP là 56 byte đủ nhỏ để không ảnh hưởng tới hệ thống mạng và kích cỡ tối đa của gói tin là (65535 byte). Lợi dụng kích thước của gói tin có thể thay đổi được cách tấn công này gửi một gói tin với kích thước lớn nhất có thể. Khi gửi trên đường truyền mạng, nó sẽ được phân mảnh ra để phù hợp với đường truyền và gửi tới server. Việc gửi các gói tin lớn hơn kích thước mà server có thể xử lý dẫn đến việc reboot hoặc crash server.

## Smurf

Kỹ thuật tấn công này được gọi là giả mạo địa chỉ IP. Kiểu tấn công nay gửi một lượng lớn gói tin ICMP với **source IP** được thay thế bằng IP của nạn nhân tới [IP broadcast](https://en.wikipedia.org/wiki/Broadcast_address). Trong thiết kế của hầu hết các thiết bị mạng mặc định sẽ phản hồi bằng cách gửi gói tin hồi đáp đến source IP. Đây là một kiểu tấn công khuếch đại và rất hiệu quả trong quá khứ vì không yêu cầu nhiều tài nguyên của kẻ tấn công mà sử dụng tài nguyên của cửa người khác.

## Buffer overflow

Buffer hay bộ nhớ đệm là bộ nhớ RAM, dữ liệu, mã nguồn chương trình được nạp vào RAM và được CPU sử dụng khi cần thiết. Điều hiển nhiên là bộ nhớ này có hạn và được chia sẻ giữ [hệ điều hành](https://en.wikipedia.org/wiki/Operating_system)  và các [tiến trình](https://en.wikipedia.org/wiki/Process_(computing)). Vì vậy, cách thức tấn công này là cố gắng làm tràn bộ nhớ đệm để server sẽ bị crash. Ví dụ, gửi một email với độ dài lớn hơn 255 byte lớn hơn độ dài lưu trữ email trên server đã khai báo.

## Teardrop

Khi một gói tin gửi đi trên mạng, nếu nó lớn hơn băng thông của đường truyền mạng thì sẽ được phân mảnh sau đó được ghép lại ở phía thu. Phương thức tấn công này, thực hiện gửi nhiều packet lặp nhau để phía thu bị crash hoặc tốn tài nguyên khi thực hiện ghép lại các gói tin lặp nhau.

## SYN attack

Phương thức tấn công này lợi dụng đặc điểm của TCP/IP đó là quá trình [bắt tay 3 bước](https://www.geeksforgeeks.org/tcp-3-way-handshake-process/). Kẻ tấn công làm cạn tài nguyên của nạn nhân bằng cách làm lụt SYN message. Bộ nhớ lưu trữ SYN requests đầy rồi không thể mở thêm cho người dùng hợp pháp nữa. 

# Thử nghiệm tấn công
Trong thử nghiệm lần này, ta sẽ thử nghiệm với kỹ thuật tấn công Ping of Dead.
Mô hình thử nghiệm:
- Mục tiêu: Server CentOS 7, cấu hình: 1 vCPU, 1.7 GB RAM (Google Cloud)
- Máy tấn công: 3 server ubuntu 18.04, cấu hình: 1 vCPU, 1GB RAM (aws)

Thực hiện tấn công: Trên 3 máy ubuntu ta chạy lệnh với nhiều tiến trình con.

```bash
 ping x.x.x.x -s 65000
 ```
 
 ![](https://images.viblo.asia/dfb8fbfd-74c0-4747-9cc4-7e5c0eea90e2.png)

Quan sát mạng trên Google cloud

![](https://images.viblo.asia/0cce5a27-b725-44c3-9987-34b467b12f48.png)

Từ kết quả ta thấy rằng với số lượng request như trên không đủ làm sập server. Incoming packet chỉ tới có gần 15 MB và CPU chưa đến 15% phương pháp này không hiểu quả lắm với người có ít tài nguyên.