# I. DHCP Spoofing
## 1. Giới thiệu về DHCP Spoofing
DHCP spoofing là kỹ thuật giả mạo DHCP Server trong mạng LAN. Kẻ tấn công có thể cài đặt một phần mềm DHCP trên máy tính của mình và cấp phát địa chỉ IP cho máy nạn nhân với các thông số giả mạo như default gateway, DNS. Từ đó, máy tính nạn nhân sẽ bị chuyển hướng truy cập theo ý đồ của kẻ tấn công.

Máy nạn nhân sau khi nhận thông tin về địa chỉ IP từ DHCP Server giả tạo, khi truy cập một website, ví dụ của ngân hàng, facebook,….  có thể sẽ bị chuyển hướng truy cập tới Server do kẻ tấn công kiểm soát. Trên Server này, kẻ tấn công có thể tạo những website thật, nhằm đánh lừa nạn nhân nhập tài khoản, mật khẩu, từ đó đánh cắp những thông tin này.

Cuộc tấn công này sử dụng kỹ thuật giả mạo ARP, cũng được gọi là ARP cache poisoning hoặc ARP poison routing (APR), đó là một kỹ thuật tấn công mạng LAN đơn giản. APR giả mạo sẽ cho phép kẻ tấn công chặn các khung trên mạng LAN, sửa đổi lưu lượng truy cập, dừng lưu lượng truy cập hoặc chỉ đơn giản là nghe lén tất cả các thông tin đi qua đường truyền mạng. Điều này là có thể bởi vì tất cả các thông tin liên lạc trong mạng LAN bây giờ có thể đi qua interface của kẻ tấn công, và các gói tin trong cuộc giao tiếp này rất dễ bị nghe lén.
## 2. Cách thức tấn công
**Kịch bản:**

*  **Bước 1**: Máy tính của kẻ tấn công sẽ vét cạn toàn bộ Pool IP của máy DHCP Server bằng cách liên tục gửi các yêu cầu xin cấp phát IP (DHCP Discover) tới máy DHCP Server. Mỗi yêu cầu DHCP Discover này đều chứa địa chỉ MAC giả mạo nhằm đánh lừa DHCP Server rằng đó là lời yêu cầu từ các máy tính khác nhau. Vì Pool IP cấp phát trên DHCP Server là hữu hạn nên sau khi đã cấp phát hết IP, DHCP Server không thể phục vụ các yêu cầu xin IP từ máy Client.
*  **Bước 2:** Kẻ tấn công cài đặt phần mềm DHCP Server trên máy của mình và cấp phát thông số IP giả mạo, điều hướng truy cập nạn nhân đến các Server do hắn kiểm soát nhằm đánh lừa và đánh cắp thông tin.

![](https://images.viblo.asia/9731aeb8-b4e7-452a-97fd-04fb98d62a57.png)

**Cách tấn công**

* Client gửi yêu cầu DHCP đến DHCP Server để nhận cấu hình IP

![](https://images.viblo.asia/15f9fd0e-3431-4688-b480-8ba8a934e120.png)

PC Client đang gửi gói tin DHCP Discover tới tất cả các máy tính trong mạng. Yêu cầu này là một gói tin quảng bá đến tất cả các host trên mạng LAN. Nhưng chỉ có DHCP Server mới biết yêu cầu này có nghĩa là gì và trong tình huống bình thường thì máy DHCP Server REAL sẽ trả lời yêu cầu đó.

DHCP Server sau đó sẽ trả lời Client với các gói tin DHCP Offer chứa địa chỉ IP, subnet mask và default gateway.

Kẻ tấn công sẽ tạo ra một DHCP Server giả và sẽ trả lời lại cho Client gói DHCP Offer trước DHCP Server thật. Với hành động này, hacker có thể lấy được các thông tin và định hướng đường đi cho các thông tin đó. Sau đó, hacker sẽ chuyển thông tin đến đích mà Client muốn hoặc đích mà hacker muốn, mà Client không biết rằng thông tin liên lạc của mình là luôn luôn đi qua Attacker PC và bị nghe lén.

* DHCP Spoofing – cấu hình sai địa chỉ IP của Client

![](https://images.viblo.asia/50b30e45-229b-4f75-b19d-7333544718cd.png)

Thiết bị giả mạo DHCP (kẻ tấn công) nằm trong mạng LAN. Hacker có khả năng trả lời các yêu cầu của gói DHCP Discover của Client trước khi yêu cầu của họ có thể tiếp cận với DHCP Server thực. Server hợp pháp cũng có thể trả lời, nhưng nếu thiết bị giả mạo nằm trên cùng một phân đoạn với Client, câu trả lời của Hacker sẽ đến trước. DHCP Offer của hacker sẽ cung cấp địa chỉ IP, default gateway và DNS server.

* DHCP Spoofing – Tất cả dữ liệu sẽ đi qua PC của hacker đến đích

Trong trường hợp này, PC của hacker đóng vai trò là một gateway. Các thông tin từ Client được chuyển đi sẽ đi qua PC của hacker trước khi đến với đích mà nó mong muốn. Việc này được gọi là một cuộc tấn công trung gian, và nó có thể hoàn toàn không bị phát hiện khi hacker chặn luồng dữ liệu qua mạng nhưng không ngăn chặn lưu lượng mạng.

* **Demo tấn công DHCP Spoofing**

https://www.youtube.com/watch?v=YJAglnMegMQ

# II. DHCP Flooding
## 1. Giới thiệu về DHCP Flooding

Là kỹ thuật tấn công nhằm khiến DHCP Server bị ngập bởi các yêu cầu cấp phát địa chỉ từ các Client giả mạo. Kẻ tấn công sử dụng DHCP Flooding để làm cho máy chủ thật quá tải trong việc xử lý các gói tin giả mà không thể đáp ứng đủ nhanh, hay hoàn toàn không còn khả năng đáp ứng yêu cầu từ máy người dùng. Tại đây, kẻ tấn công có thể lựa chọn việc chiếm toàn bộ dải IP hay chỉ đưa ra số lượng gói tin yêu cầu cấp phát IP đủ nhiều để server trở nên chậm chạp hơn server giả. 

Sau khi đã thực hiện thành công quá trình Flooding và khiến nạn nhân kết nối đến máy chủ giả mà kẻ tấn công tạo ra, hắn có thể sử dụng nhiều công cụ khác nhau để bắt được gói tin từ nạn nhân và tiến hành phân tích chúng. 
 ### a. DHCP DoS attack sử dụng Yersinia trong Kali Linux
 
 **Giới thiệu về Yersinia**
 
Yersinia là công cụ Network được sử dụng để tấn công, khai thác các lỗ hổng trên hệ thống mạng trên hệ điều hành Linux. Nó lợi dụng 1 số điểm yếu trong các giao thức mạng khác nhau để tấn công và khai thác các lỗ hổng của các giao thức Layer 2.

Yersinia thường được sử dụng để tấn công vào các thiết bị lớp 2 như Switch, DHCP server, Spanning Tree…

Hiện tại Yersinia hỗ trợ các tấn công vào các giao thức layer 2 sau:
* Dynamic Host Configuration Protocol (DHCP)
* Spanning Tree Protocol (STP)
* Cisco Discovery Protocol (CDP)
* Dynamic Trunking Protocol (DTP)
* Hot Standby Router Protocol (HSRP)
* IEEE 802.1Q
* IEEE 802.1X
* Inter-Switch Link Protocol (ISL)
* VLAN Trunking Protocol (VTP)

**Cách thức tấn công** 

Có thể sử dụng Yersinia dưới dạng CLI hoặc GUI để thực hiện các cuộc tấn công vào layer 2.

**Mô hình:**
* Máy ảo Kali Linux
* Window Server 2012R2 thuộc subnet 10.123.10.0/24
* Máy Client

![](https://images.viblo.asia/1177841e-bee6-4eec-9f67-cd6a76079eba.png)

**Mô tả:** 
* Kẻ tấn công tham gia vào hệ thống mạng_cùng VLAN với DHCP Server. 
* Kẻ tấn công liên tục gửi tới DHCP Server các gói tin yêu cầu xin cấp địa chỉ IP với các địa chỉ MAC nguồn không có thực (gói Discover) bằng việc thực hiện 1 chương trình.
* Khi dải IP có sẵn trên DHCP Server cạn kiệt vì bị nó thuê hết, dẫn tới việc DHCP Server không còn địa chỉ IP nào để cấp cho các DHCP Client hợp pháp thuê, khiến dịch vụ bị ngưng trệ, các máy trạm khác không thể truy nhập vào hệ thống mạng để truyền thông với các máy tính trong mạng.


Trường hợp tấn công này chỉ làm cho các máy tính đăng nhập vào hệ thống mạng (sau khi bị tấn công) không thể sử dụng dịch vụ DHCP, dẫn đến không vào được hệ thống mạng. Còn các máy trạm khác đã đăng nhập trước đó vẫn hoạt động bình thường.

Đây là kiểu tấn công từ chối dịch vụ DHCP dễ dàng nhất mà kẻ tấn công có thể thực hiện. Kẻ tấn công chỉ cần rất ít thời gian và băng thông là có thể thực hiện được cuộc tấn công này.