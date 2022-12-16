## Dẫn nhập

Chào các bạn, mình là Kiên. Cũng đã lâu rồi mình chưa làm video mới nào cho channel cả, nay mình muốn comeback với series **Backend Engineering - Intermediate level** (level middle). Trong series này, mình muốn truyền đạt lại những kiến thức cơ bản và có 1 chút nâng cao về backend engineering. 

Đây là những kiến thức background rất cần thiết đối với một software engineer nói chung, đặc biệt là những bạn làm backend nói riêng. 

Hi vọng series này sẽ giúp các bạn có được kiến thức nền tảng vững hơn, và thăng tiến hơn trong career path của mình.

Bài viết đầu tiên sẽ là về TCP và UDP, 2 khái niệm rất quen thuộc phải không nào? Nhưng bạn có biết nó là gì và ảnh hưởng ra sao tới hệ thống backend và công việc của tụi mình không? Cùng mình tìm hiểu trong bài viết này nhé.

## Tổng quan về mạng máy tính

Nhắc tới TCP và UDP, chúng ta trước hết phải nói tới internet và cách thức mà các máy tính giao tiếp với nhau.  Khi bạn dùng điện thoại hoặc máy tính duyệt web, thiết bị của bạn sẽ cần phải gửi thông tin yêu cầu tới máy chủ, sau đó máy chủ sẽ gửi tài nguyên tương ứng về cho bạn. 

Nhưng làm thế nào để 2 máy tính xa cách nhau hàng trăm thậm chí hàng ngàn, hàng chục ngàn cây số có thể truyền tải được thông tin cho nhau?

Rõ ràng thông tin sẽ được truyền qua đường mạng internet, cụ thể là từ mạng không dây wifi hoặc cáp mạng RJ45 tới router, sau đó được truyền đi bằng cáp quang hoặc cáp ADSL (mà giờ chắc không còn ai dùng nữa). 

Thời gian mà dữ liệu đi qua đường truyền internet để giao tiếp giữa 2 máy tính được gọi là Network Latency, hay còn gọi là độ trễ mạng, ta cùng xem hình sau:

![isp internet communication](https://images.viblo.asia/77ff3114-1c46-4b56-a5d9-6d6119592b69.png)

Hệ thống mạng máy tính bao gồm nhiều thành phần khác nhau như phần cứng, phần mềm, chip, mạch điện… Để triển khai phần mềm cho việc giao tiếp giữa các máy tính thông qua hệ thống này thì sẽ rất phức tạp. 

Để đơn giản hóa việc này, computer network model hay còn gọi là **mô hình mạng máy tính** ra đời. Có hai mô hình mạng máy tính là **Mô hình OSI và Mô hình TCP/IP.** Mô hình OSI có 7 layer trong khi mô hình TCP/IP có thể chia làm 4 hoặc 5.

![computer network model](https://images.viblo.asia/3b097569-cc67-46ba-a63e-6a404aafd128.png)

Trong cả 2 mô hình trên, thì TCP và UDP là 2 giao thức được sử dụng trong layer Transport.

![tcp and udp](https://images.viblo.asia/882124db-049b-443e-af93-37f48a11ef90.png)

Mình sẽ viết thêm 1 bài viết chi tiết hơn về chủ đề này sau. Giờ ta sẽ đi tới nhân vật chính của bài viết này.

## TCP/IP - Transmission Control Protocol

Đầu tiên chúng ta nói tới TCP  (**T**ransmission **C**ontrol **P**rotocol) - có nghĩa là giao thức điều khiển truyền nhận.

Khi bạn làm việc với TCP, bạn sẽ được đảm bảo rằng tất cả các byte được gửi sẽ giống hệt với các byte được nhận và chúng sẽ đến đầu bên kia theo cùng một thứ tự. TCP sẽ thực hiện việc chuyển lại những data bị mất, chống tắc nghẽn …

Để làm được những điều trên thì TCP có 1 quá trình gọi là **Three-way handshake** - có thể dịch là bắt tay 3 chiều, chức năng là để thiết lập kết nối.

### Three-way handshake

![three-way handshake](https://images.viblo.asia/8094cfab-e664-4730-ba80-d9338c4b052c.png)

Quá trình bắt tay này là quá trình trao đổi số thứ tự gói tin (Package sequence number) để client và server có thể thiết lập được 1 kết nối ổn định cho cả 2 phía. Những con số sequence number này sẽ được tạo ngẫu nhiên vì lý do bảo mật.

Threeway-handshake bao gồm 3 bước như cái tên của nó:

- **SYN**: Client chọn 1 con số ngẫu nhiên `x` và gửi 1 packet SYN (Synchronize Sequence Number), packet này có thể bao gồm thêm 1 vài flag hoặc option cho kết nối TCP tới server.
- **SYN ACK**: Server nhận SYN từ client và tăng `x` lên 1 đơn vị, sau đó chọn 1 số ngẫu nhiên `y` khác, gán thêm các tùy chọn cho TCP và gửi lại phản hồi cho client.
- **ACK**: Client sẽ tiếp tục tăng `x` và `y` lên 1 đơn vị, sau đó hoàn tất việc bắt tay bằng cách gửi đi tiếp gói ACK (Acknowledgement Sequence Number) cho server.

Mỗi chu kỳ từ khi client bắt đầu gửi request tới lúc nhận gói dữ liệu đầu tiên trả về (không bao gồm thời gian nhận đầy đủ dữ liệu) được gọi là 1 **Round-trip time** (**RTT**). 

Trong hình ví dụ phía trên, từ lúc bắt đầu tới lúc kết thúc roundtrip đầu tiên mất 28ms, round trip thứ 2 mất 84ms. Các round trip tiếp theo tùy số lượng dữ liệu mà kết nối vận chuyển sẽ được tăng thêm tương ứng.

Tương tự với quá trình three-way handshake, sau khi kết nối đã được thiết lập, 2 bên sẽ giao tiếp với nhau theo từng message để gửi dữ liệu cũng như xác nhận dữ liệu đã được vận chuyển thành công. Dữ liệu càng nhiều thì số lượng RTT càng cao.

Ví dụ, mình có dùng phần mềm wireshark để thử capture lại những message của TCP thì có kết quả như sau:

![wireshark test tcp](https://images.viblo.asia/c1982b1e-9a7b-4e53-ba4d-9c8006cf5fd6.png)


### Kiểm soát tắc nghẽn - Congestion control

Việc dữ liệu đi qua các layer mạng mà không được kiểm soát có thể dẫn đến sự *tắc nghẽn*. Điều này cũng giống như đường sá nếu không có phân làn, không có hệ thống biển báo và đèn báo ở giao lộ thì *tắc đường* kẹt xe là chuyện gần như không thể tránh khỏi. 

Tương tự, TCP cũng sẽ kiểm soát sự tắc nghẽn cho kết nối mà nó đã thành lập bằng three-way handshake. Cơ chế kiểm soát tắc nghẽn bao gồm nhân tố chính là congestion window - viết tắt là *CWND* (tạm hiểu: cửa sổ truyền nhận dữ liệu) và 3 giai đoạn trong khái niệm congestion policy.

Kích thước của CWND tỷ lệ thuận với kích thước dữ liệu được gửi đi trong 1 RTT, do đó 3 giai đoạn kiểm soát tắc nghẽn này chủ yếu xoay quanh việc điều chỉnh giá trị của CWND:

1. **Slow Start Phase** - Giai đoạn bắt đầu chậm: Từ lúc bắt đầu thì CWND sẽ được tăng theo cấp số mũ. ($cwnd^2, cwnd^3, cwnd^4....)$
2. **Congestion Avoidance Phase** -  Giai đoạn chống tắc nghẽn: Sau khi CWND đạt ngưỡng nhất định, nó sẽ tăng lên theo cấp số cộng: (+1, +2, +3…)
3. **Congestion Detection Phase** - Giai đoạn phát hiện tắc nghẽn: Nếu gặp tắc nghẽn, chẳng hạn như timeout thì tùy trường hợp sẽ điều chỉnh lại biến số cwnd và bắt đầu lại giai đoạn 1 hoặc 2.

![](https://images.viblo.asia/b85d6828-98ba-46ac-8426-27b665c01f23.png)

Chúng ta có thể coi kết nối TCP như kế hoạch cho 1 đoàn người đi qua  con đường có rất nhiều làn. Để an toàn nhất, lúc đầu người ta chỉ cho mở 1 làn chạy để dành đường chạy cho các phương tiện đi tuyến khác. 

Dần dà, nếu thấy đường không bị tắc nghẽn người ta sẽ cho mở dần thêm làn, và đến 1 giới hạn nào đó thì việc mở thêm làn sẽ chậm dần. Đây chính là 2 giai đoạn slow start và congestion avoidance.

Nếu mở quá nhiều làn dẫn đến việc tắc nghẽn, người ta sẽ phải hạn chế lại số làn chạy, như TCP sẽ giảm số làn còn 1 nửa, còn tốc độ mở thêm làn đường thì sẽ được quyết định tùy trường hợp. Đây chính là giai đoạn phát hiện tắc nghẽn - congestion detection phase.

### Cơ chế kiểm soát lỗi

TCP thực thi việc kiểm soát lỗi dựa trên những thứ sau đây:

- **Checksum**: Các segment của TCP đều chứa thông tin về checksum. Do đó, nếu nơi nhận thông tin kiểm tra dữ liệu không khớp với checksum, đầu nhận dữ liệu sẽ đánh dấu là segment này bị hỏng.
- **Acknowledgement**: Như việc phản hồi tin nhắn ACK ở three-way handshake, mỗi lần client gửi 1 segment đi thì server sẽ phản hồi bằng 1 lần ACK để xác định rằng segment đó đã đến nơi.
- **Re-transmission**: Cơ chế truyền tải lại. Việc gửi lại segment sẽ diễn ra trong 2 trường hợp:
    - Trường hợp time-out: Khi quá 1 khoảng thời gian quy định (được tính toán dựa trên RTT) mà không nhận được gói ACK từ server, thì client sẽ gửi lại segment đã bị timeout đó.
    - Sau khi nhận được tin ACK giống nhau liên tục: Khi 1 packet đã gửi đi nhưng client liên tục nhận được 3 message ACK thì gói này sẽ được gửi lại.
    
    ![TCP retransmission](https://images.viblo.asia/265d4c67-31cb-4309-b346-57aadf54178f.png)

    

### Ưu và nhược điểm

Tới đây thì chúng ta đã có thể rút ra được ưu và nhược điểm chính của TCP rồi đúng không?
Ưu điểm:

- Reliability - Tính đáng tin cậy, TCP đảm bảo rằng dữ liệu bạn gửi đi sẽ đến đích 1 cách thành công. Bên cạnh đó cũng đảm bảo thứ tự gói tin được vận chuyển.
- Cơ chế kiểm soát tắc nghẽn và kiểm soát lỗi: Kiểm soát dữ liệu trong quá trình vận chuyển, cũng như vận chuyển lại những gói tin bị lỗi.
- Có thể quản lý được connection. Bản chất TCP là 1 dạng giao thức stateful. Kết nối có thể được quản lý nhờ quá trình thành lập kết nối - three-way handshake, sau khi quá trình vận chuyển hoàn tất thì sẽ phát tín hiệu hoàn thành và đóng kết nối.

Nhược điểm:

- Tốn băng thông hơn bởi vì gói tin nặng hơn.
- Chậm hơn, đây là cái giá phải trả cho mấy ưu điểm phía trên:
    - Với TCP, đã phải mất ít nhất 2 round trip từ cái bắt tay, sau đó lại còn mất thêm 1 vài round trip nữa để gửi và nhận dữ liệu thì nó sẽ tốn thời gian hơn đúng không nào?
    Bên cạnh đó chúng ta phải tính thêm thời gian cho server để xử lý thông tin trước khi trả về nữa. Việc phản hồi chậm dĩ nhiên là điều không thể tránh khỏi.
    - Mình đã làm 1 thử nghiệm nhỏ, dùng lệnh ping để test thử latency tới 1 website là Viblo.asia, độ trễ là đâu đó hơn 45ms.

![](https://images.viblo.asia/a42fb3bc-1623-48ea-84b4-ba2f058b97b7.png)


Well, các bạn có thể thấy 1 roundtrip này mất tới xấp xỉ ~**45ms.** Khi mất hơn 2 lần RTT cho threeway-handshake, và nhiều lần nữa cho việc gửi và nhận dữ liệu thì thời gian phản hồi cho 1 request sẽ tăng đáng kể.
Mình dùng tiếp curl để test thời gian phản hồi, trung bình đâu đó **0.4s = 400ms =  ~9 lần RTT**. Rõ ràng thời gian phản hồi đã tăng lên rất nhiều.

![](https://images.viblo.asia/a58a07fb-4b48-4cb9-b793-0aeacc054e56.png)


Câu lệnh mà mình dùng để test:

```bash
curl -X GET -w "total time: %{time_total}\n" https://viblo.asia
```

Một cách trực quan hơn là bạn nhìn vào response time trên phần network của chrome inspector.

![](https://images.viblo.asia/ca38c03c-3800-4ef4-bf30-464fa84f0529.png)

Trên thực tế sẽ có biện pháp để giảm thiểu RTT cho TCP, là cách mà các ông lớn trong làng công nghệ sử dụng, nhưng nó sẽ không được đề cập ở đây.

## UDP - User Datagram Protocol

Để hiểu được rõ ràng cách hoạt động của UDP - User Datagram Protocol thì chúng ta cần tìm hiểu về **IP** - viết tắt của Internet Protocol. Giao thức này nằm ở layer network, bên dưới cả 2 nhân vật chính của bài viết này là TCP và UDP.

IP layer có nhiệm vụ chính là phân phối các datagram từ 1 máy tính tới 1 máy tính khác thông qua địa chỉ của chúng (chính là IP address). Có thể hiểu việc truyền dữ liệu qua IP giống như việc bạn gửi bưu phẩm qua đường bưu điện vậy. IP đóng gói những thông tin như địa chỉ người gửi, địa chỉ người nhận và các tham số khác rồi gửi đi, còn nội dung chính của gói tin thì được nằm trong bưu kiện, chính là payload.

 ![Một IP packet](https://images.viblo.asia/b9bc88c7-aee0-4ec0-a533-4a59dda64bd9.png)


IP không thông báo khi tin nhắn được gửi tới đích thành công, cũng không có phản hồi nào trong trường hợp gặp lỗi. Rõ ràng, IP không hề đáng tin cậy với các layer bên trên nó.

Do đó, việc kiểm tra lỗi và truyền tải lại những thông tin bị mất được quản lý bởi các layer cao hơn trong mô hình mạng. Giao thức TCP với cơ chế three-way handshake là 1 gương mặt đảm bảo được những điều này, đó là lý do tại sao TCP lại là giao thức đáng tin cậy.

Quay lại với UDP, UDP đóng gói lại gói tin theo cách của riêng nó, thêm vào 4 field mới là source port, destination port, kích thước của package và checksum. Trong 4 field trên, thì checksum và source port là những field tùy chọn, thực tế thì layer IP đã cung cấp sẵn checksum rồi.

![](https://images.viblo.asia/dbc92033-4810-4f5b-aa9d-b8da6c997a65.png)

Như mình đã nói, TCP hay UDP đều wrap lại IP cả, do đó chúng ta có thể so sánh header của 2 giao thức này cho nó trực quan:
![tcp vs udp header](https://images.viblo.asia/759efd95-b43f-4e89-9b44-fd86709f97ef.jpg)


### Ưu và nhược điểm của UDP

Ưu điểm:

- Nhanh và nhẹ: Vì không cần kiểm soát lỗi và mất nhiều round trip như TCP, nên UDP rất nhanh và nhẹ.
- Hỗ trợ broadcasting: Hỗ trợ gửi dữ liệu từ 1 máy chủ tới nhiều máy khác trong mạng
- Tốn ít resource hơn TCP

Nhược điểm:

- Không đáng tin cậy: Không đảm bảo dữ liệu sẽ được gửi tới đích.
- Không có cơ chế truyền tải lại, kiểm soát lỗi, chống tắc nghẽn, etc…

## UDP và TCP được ứng dụng như thế nào?

### Ứng dụng của TCP

Áp dụng cho những công việc không cần tốc độ quá nhanh, nhưng cần đảm bảo truyền nhận dữ liệu:

- Các giao thức truyền tải file: FTP
- Duyệt web: HTTP
- Giao thức trong việc nhận email: IMAP
- …

### Ứng dụng của UDP

Với ưu điểm là nhanh, nhẹ và hỗ trợ broadcast, UDP có thể được áp dụng cho những lĩnh vực như:

- Media streaming: Ví dụ như việc stream video, có lost vài khung hình cũng sẽ chấp nhận được, tuy nhiên đổi lại tốc độ load nhanh.
- Gaming: Tưởng tượng bạn chơi Liên Minh Huyền Thoại và cần upload liên tục những hành động như click chuột, bấm phím để di chuyển và tung chiêu, thì tần suất để gửi dữ liệu rất nhiều. Do đó UDP sẽ rất thích hợp.
- DNS Lookup
- …
## Bảng so sánh TCP và UDP
| **TCP**                                                | **UDP**                                                   |
|--------------------------------------------------------|-----------------------------------------------------------|
| Đáng tin cậy                                           | Không đáng tin cậy                                        |
| Chậm hơn do nhiều RTT hơn                              | Nhanh hơn                                                 |
| Header nặng hơn (20-60 bytes)                          | Header 8 bytes nhẹ hơn                                    |
| Không hỗ trợ Broadcast                                 | Hỗ trợ Broadcast và Multicast                             |
| Quản lý được connection dựa vào các gói SYN/ACK/PSH... | Connectionless                                            |
| Quản lý lỗi, chống tắc nghẽn                           | Không có                                                  |
| TCP là nền tảng của HTTP, HTTPs, FTP, SMTP and Telnet. | UDP là nền tảng của DNS, DHCP, TFTP, SNMP, RIP, and VoIP. |


## Tổng kết

Với bài viết này, mình hi vọng các bạn có được một cái nhìn rõ hơn về 2 giao thức kinh điển là TCP và UDP cũng như là ưu nhược điểm của 2 giao thức này.

Những thông tin mình nhắc tới trong bài viết này được mình tham khảo từ một số nguồn, đặc biệt là từ cuốn sách High Performance Browser Networking. Cuốn sách đã được publish free [tại đây](https://hpbn.co/), các bạn có thể tìm đọc nhé.

Tham khảo:

[https://www.geeksforgeeks.org/transport-layer-responsibilities/](https://www.geeksforgeeks.org/transport-layer-responsibilities/?ref=lbp)

Video mình đã làm từ bài viết này:
{@embed: https://youtu.be/Vw2F_SRnrmg}