Chào mọi người mình là `Tuntun`. Một năm qua là một năm khá bận rộn nhỉ. Ae đã thực hiện được bao nhiêu kế hoạch của mình rồi. Năm mới thực hiện những kế hoạch mới nhé. Chúc mọi người: `Xuân này hơn hẳn mấy xuân qua. Phúc lộc đưa nhau đến từng nhà. Vài lời cung chúc tân niên mới. Vạn sự an khang vạn sự lành`. Và luôn giữ ngọn lửa nghiên cứu những thứ mới mẻ nhé.

Sau một quãng dài không có cập nhật thêm bài nào mới mẻ nên hôm nay đầu năm mới mình và các bạn cùng nhau đi tìm hiểu về `module scanning network` nằm trong chuỗi bài của chương trình CEH. Mình cũng mới tìm hiểu về chương trình này nên có thể có nhiều sai sót, mong mn góp ý thêm.

![](https://images.viblo.asia/78c0515f-8bb4-4eae-9186-a30965434489.png)

# Scanning network
Trong bước đầu tiên của tiến trình tấn công các hacker thường tiến hành quét mạng mà chúng ta sẽ gọi bằng thuật ngữ scanning để kiểm tra các cổng đang mở hay những dịch vụ mà mục tiêu đang sử dụng. Bên cạnh đó scanning còn cho biết các thông tin quan trọng như hệ điều hành đang sử dụng hay hệ thống máy chủ mà trang web đang dùng là IIS, Apache …

Scanning bao gồm các thao tác để xác định các host (máy trạm) và những port (cổng) đang hoạt động hay những dịch vụ đang chạy trên hệ thống của mục tiêu cần tấn công và khai thác. Đây là một trong những bước quan trọng của tiến trình thu thập thông tin thông minh (intelligence gathering) mà các hacker sử dụng để lập sơ đồ của các tổ chức hay mạng mục tiêu. Trong tiến trình scanning những kẻ tấn công sẽ gởi các gói tin TCP/IP đến mục tiêu và phân tích các kết quả trả về nhằm xác định các thông tin giá trị mà họ quan tâm.

![](https://images.viblo.asia/30c58bdd-ad20-46c3-b416-581b51c3a1cb.png)

Cần phải chú ý là bước này attacker sẽ tương tác trực tiếp với máy mục tiêu nhằm có được các thông tin nhanh nhất, chính xác nhất về máy mục tiêu để chuẩn bị cho bước tấn công sau này. Bước ngày được thực hiện sau bước **Footprinting**.

# Các Kiểu Scanning
Có ba dạng scanning khác nhau đó là Port Scanning, Vulnerability Scanning và Network Scanning.
![](https://images.viblo.asia/15afbe01-aafe-44bc-88d2-94e9c8f2ee16.png)

**Port Scanning**: Kẻ tấn công sẽ gởi một loạt các thông điệp đến mục tiêu nhằm xác định các cổng đang mở, và thông qua các cổng này họ sẽ biết được có những dịch vụ nào đang chạy trên máy tính mục tiêu. Một trong các ứng dụng port scanning phổ biên là Nmap.

**Vulnerability Scanning**: Là quá trình quét lỗi nhằm xác định ra các lỗ hổng bảo mật hay những điểm yếu mà thường gọi là các điểm “nhạy cảm” của các ứng dụng hay máy chủ, máy trạm đê từ đó đưa ra các phương án tấn công thích hợp. Tiến trình quét lỗi có thể xác định được các bản cập nhật hệ thống bị thiếu, hay những lỗi hệ thống chưa được vá các chuyên gia bảo mật cũng thường tiến hành vulnerability scanning trong công tác bảo vệ hệ thống mạng của mình.

**Network Scanning**: Quá trình này dùng để xác định các máy đang hoạt động trên hệ thống mạng thường được các hacker, chuyên gia bảo mật hay những quản trị hệ thống thực hiện.

# Các kỹ thuật thực hiện
## Kiểm Tra Các Hệ Thống Đang Hoạt Động
Công việc đầu tiên cần phải thực hiện đó là phải nắm được mục tiêu có những dịch vụ nào đang hoạt động và mở ở những port nào. Biết địch biết ta trăm trận trăm thắng :). Để kiểm tra tình trạng hoạt động của hệ thống các hacker có thể sử dụng nhiều công cụ và những hình thức khác nhau để thu được kết qua mong muốn như ICMP Scanning hay Ping Sweep.

### Nmap tool
Công cụ được sử dụng nhiều nhất, phổ biết nhất và được bình chọn best of hacker tool là nmap. Đây là ứng dụng miễn phí có khả năng mạnh mẽ trong việc quét cổng, ping sweep, xác định dịch vụ, hệ điều hành. Nmap chạy được trên nền Windows hay Linux, Unix và có thể tiến hành quét cùng lúc nhiều máy tính. Nmap có thể tìm kiếm các cổng mở và những cổng được che dấu với các chức năng lọc. Ví dụ khi firewall chặn các ứng dụng quét cổng thông thường bằng cách ngắt những tín hiệu hồi đáp trong quá trình three-way handshake, hay ngăn
ngừa việc tiếp nhận tín hiệu trên nhiều cổng trong thời gian ngắn thì nmap vẫn có thể vượt qua bằng phương pháp half-path scan hay tiến hành quét các cổng với thời gian cách xa nhau.

Chính vì những khả năng mạnh mẽ trên mà Nmap từng được các hacker và chuyên gia bầu chọn là ứng dụng tấn công số 1 thế giới nhiều năm liền. Và những bộ phim có cảnh tấn công của hacker như Matrix Reloaded sử dụng Nmap để tìm ra máy chủ SSH bị lỗi hoặc The Bourne Ultimatum cũng sử dụng Nmap phiên bản GUI là Zenmap để minh họa tiến trình kiểm tra dịch vụ đang chạy SSH 3.9p1, Posfix smtpd, và một name server.

![](https://images.viblo.asia/8633c60f-b2ea-4cbb-9fc1-8bdd66872b79.png)

Sau đây là một phương pháp quét mạng với Nmap mà các bạn cần ghi nhớ:

- TCP connect : Hacker khởi tạo kết nối TCP đầy đủ với mục tiêu.
- XMAS tree scan : Kiểm tra các dịch vụ TCP bằng cách gởi các gói tin XMAS-tree (các gói tin được đặc cờ FIN, URG và PSH.
- SYN stealth scan : Còn được gọi là half-open scanning. Hacker hởi các gói tin SYN và nhận gói tin đáp ứng SYN-ACK từ server. Trong trường hợp này máy tính của hacker và server không thiết lập kết nối TCP đầy đủ nên được gọi là stealth.
- Null scan : Đây là phương pháp quét mạng nâng cao và có thể vượt qua cờ chế dò tìm của firewall. Null scan chỉ hoạt động trên các hệ thống Unix với tất cả các cờ được tắt.
- Windows scan : Tương tự như ACK scan và có thể phát hiển các cổng mở.
- ACK scan : Được dùng để dò tìm các quy tắt của firewall, dạng này chỉ hoạt động trên hệ thống UNIX.

Ngoài ra, Nmap còn có nhiều tùy chọn thích hợp với những nhu cầu quét cổng hay dò tìm dịch vụ khác nhau như trong danh sách sau :
![](https://images.viblo.asia/7fadb2d9-dee4-4e85-9ea5-7fc13b85837a.png)

Để hiểu các sử dụng nmap thì mình sẽ tìm hiểu ở số sau. Bạn có thể tìm hiểu tại: https://nmap.org/ hoặc command: `man nmap`. Tuy nhiên, có công cụ rồi, mình vẫn muốn tìm hiểu các thực hiện của từng option như thế nào khi tương tác với máy đích, như vậy mình mới hiểu rõ bản chất.

### ICMP Scanning
Hacker sẽ gửi các tín hiệu ICMP ECHO Request đến mục tiêu (host) và nếu một host đang tồn tại nghĩa là đang hoạt động thì sẽ phản hồi lại thông qua ICMP ECHO Reply như Hình 3.3.
![](https://images.viblo.asia/a0f0e9b3-cf19-4b32-ba83-d78d7b0dec2d.png)

Sử dụng nmap: `nmap -sP -v 192.168.168.5`

![](https://images.viblo.asia/b76f2e7a-8ba9-4c77-8a55-14bb0ffd9f0c.png)

Trong hình minh họa trên hacker từ máy 192.168.168.3 sẽ tiến hành ICMP Scanning bằng công cụ Nmap để gởi các tín hiệu ICMP ECHO Request thông qua tùy chọn –sP đến mục tiêu có địa chỉ 192.168.168.5 và các bạn có thể thất kết quả trả về cho biết mục tiêu có địa chỉ 192.168.168.5 đang hoạt động với các thông số phần cứng như địa chỉ MAC, nhà sản xuất.

Tuy nhiên, quá trình này có thể thất bại nếu như giao thức ICMP bị chặn bởi firewall, firewall sẽ chặn những ICMP từ bên ngoài tới hệ thống bên trong.

### Ping Sweep
Trong ví dụ trên chúng ta sử dụng ICMP Scanning để xác định tình trạng hoạt động của một máy trạm, nếu như các bạn muốn kiểm tra trên một dãy các địa chỉ IP thì Ping Sweep là giải pháp thích hợp thông qua hình thức gởi các tín hiệu ICMP ECHO Request đến nhiều máy tính cùng lúc như Hình 3.5 để nhận các kết quả trả về thích hợp.
![](https://images.viblo.asia/26f91692-8857-4b20-8acb-e7d99cdda6c7.png)

Ping sweep với nmap:
![](https://images.viblo.asia/2a38e36a-4285-44ca-b90f-91c4029d4bfb.png)

Chúng ta thấy kết quả trả về khá chi tiết với các máy tính có địa chỉ IP 192.168.168.1, 192.168.168.2, 192.168.168.4 và 192.168.168.6 đang hoạt động. Các công cụ Ping Sweep khác thường được sử dụng là Angry IP Scanner và
Solarwinds Engineer’s Toolset.


-----

Ở bài này mình đã tìm hiểu cơ bản về scanning network, ở phần tiếp theo sẽ đi chi tiết hơn đồng thời sẽ có những option nmap hay được sử dụng. Chúc mọi người ăn tết vui vẻ.