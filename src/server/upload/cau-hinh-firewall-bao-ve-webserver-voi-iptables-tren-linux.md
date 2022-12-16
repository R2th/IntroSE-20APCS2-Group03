# Vì sao cần một tường lửa cho Websever?
Chúng ta đang sống trong thời đại của cuộc cách mạng Internet kết nối toàn cầu. Mạng Internet đã mở ra những cơ hội vô cùng to lớn cho con người trong công cuộc hành trình tìm kiếm tri thức, nhưng đồng thời cũng phát sinh một vấn đề quan trọng hơn đó là đảm bảo sự an toàn của người sử dụng trên không gian mạng công khai đó. Trong vài năm trở lại đây xu hướng tấn công có chủ đích (APT) đang diễn biến hết sức phức tạp trên diện rộng. Đây là hình thức tấn công tinh vi và rất khó phát hiện do kẻ tấn công sử dụng các kỹ thuật mới để ẩn nấp và những cuộc tấn công này nhằm vào những người dùng hay các hệ thống quan trọng nhằm đánh cắp thông tin, phá hoại hệ thống và có thể xem là mối rủi ro nguy hiểm thường trực hiện nay trên Internet không chỉ ở Việt Nam và trên thế giới. Không nằm ngoài xu thế đó thì đây vẫn là xu hướng chính và cần tiếp tục được quan tâm và chú trọng trong năm 2019.

Giúp người đọc phần nào hình dung được nguyên lý hoạt động của một chương trình Firewall điển hình, cùng với những phương thức tấn công căn bản và cách ngăn chặn chúng. Người dùng có thể tự cài đặt Firewall này vào hệ thống Web-server của mình, từ đó phát triển lên một hệ thống tốt hơn và qui mô hơn.

# iptables là gì.
## iptables:
iptables là một tường lửa ứng dụng lọc gói dữ liệu rất mạnh, miễn phí và có sẵn trên Linux. iptables cho phép người quản trị Linux cấu hình cho phép/chặn luồng dữ liệu đi qua mạng. iptables có thể đọc, thay đổi, chuyển hướng hoặc hủy các gói tin đi tới/đi ra dựa trên các tables, chains và rules. Mỗi một table sẽ có nhiều chain chứa các rule khác nhau quyết định cách thức xử lý gói tin (dựa trên giao thức, địa chỉ nguồn, đích….).

iptables nằm ngoài nhân. iptables chịu trách nhiệm giao tiếp giữa người dùng và Netfilter để đẩy các luật của người dùng vào cho Netfiler xử lí. Netfilter tiến hành lọc các gói dữ liệu ở mức IP. Netfilter làm việc trực tiếp trong nhân, nhanh và không làm giảm tốc độ của hệ thống.

Để đi sâu vào cách thức hoạt động của iptables, ta cần phải hiểu rõ về các khái niệm như table, chain và rule được mô tả bên dưới.

### Các bảng trong iptables:

* Filter table

Filter là bảng được dùng nhiều nhất trong iptables. Bảng này dùng để quyết định xem có nên cho một gói tin tiếp tục đi tới đích hoặc chặn gói tin này lại (lọc gói tin). Đây là chức năng chính yếu nhất của iptables, nếu các lệnh không khai báo bảng đích thì mặc định sẽ là bảng Filter.
* NAT table

Bảng NAT được dùng để phiên dịch địa chỉ mạng, khi các gói tin đi vào bảng này, gói tin sẽ được kiểm tra xem có cần thay đổi và sẽ thay đổi địa chỉ nguồn, đích của gói tin như thế nào.

Bảng này được sử dụng khi có một gói tin từ một connection mới gởi đến hệ thống, các gói tin tiếp theo của connection này sẽ được áp rule và xử lý tương tự như gói tin đầu tiên mà không cần phải đi qua bảng NAT nữa.

![](https://images.viblo.asia/9ed83f0e-b57f-4887-9c61-1e59c31fc3b9.png)

* Mangle Table

Bảng mangle dùng để điều chỉnh một số trường trong IP header như TTL (Time to Live), TOS (Type of Serivce) dùng để quản lý chất lượng dịch vụ (Quality of Serivce)… hoặc dùng để đánh dấu các gói tin để xử lý thêm trong các bảng khác.
* Raw Table

Theo mặc định, iptables sẽ lưu lại trạng thái kết nối của các gói tin, tính năng này cho phép iptables xem các gói tin rời rạc là một kết nối, một session chung để dễ dàng quản lý. Tính năng theo dõi này được sử dụng ngay từ khi gói tin được gởi tới hệ thống trong bảng raw.

Với bảng raw, ta có thể bật/tắt tính năng theo dõi này đối với một số gói tin nhất định, các gói tin được đánh dấu NOTRACK sẽ không được ghi lại trong bảng connection tracking nữa.
* Security Table

Bảng security dùng để đánh dấu policy của SELinux lên các gói tin, các dấu này sẽ ảnh hưởng đến cách thức xử lý của SELinux hoặc của các máy khác trong hệ thống có áp dụng SELinux. Bảng này có thể đánh dấu theo từng gói tin hoặc theo từng kết nối.

### Các chains trong iptables
| Table/Chain | Prerouting | Input | Forward | Output | Postrouting |
| -------- | -------- | -------- | -------- | -------- | -------- |
| Raw |  X    |   |   | X  |   |
| Mangle | X     | X  |X   |X   | X  |
| NAT (dNAT) | X     |   |   | X  |   |
| Filter |      | X  |  X | X  |   |
| Security |      | X  | X  |X   |   |
| NAT (sNAT|      | X  |   |   |  X |

*  INPUT

Chain này dùng để kiểm soát hành vi của những các kết nối tới máy chủ. Ví dụ một user cần kết nối SSH và máy chủ, iptables sẽ xét xem IP và port của user này có phù hợp với một rule trong chain INPUT hay ko.

* FORWARD

Chain này được dùng cho các kết nối chuyển tiếp sang một máy chủ khác (tương tự như router, thông tin gởi tới router sẽ được forward đi nơi khác). Ta chỉ cần định tuyến hoặc NAT một vài kết nối (cần phải forward dữ liệu) thì ta mới cần tới chain này.

* OUTPUT

Chain này sẽ xử lý các kết nối đi ra ngoài. Ví dụ như khi ta truy cập google.com, chain này sẽ kiểm tra xem có rules nào liên quan tới http, https và google.com hay không trước khi quyết định cho phép hoặc chặn kết nối.

* PREROUTING

Header của gói tin sẽ được chỉnh sửa tại đây trước khi việc routing được diễn ra.

* POSTROUTING

Header của gói tin sẽ được chỉnh sửa tại đây sau khi việc routing được diễn ra.

![](https://images.viblo.asia/7e30ecd3-ace2-4d0e-a6cf-77d65d472f89.jpg)

Mặc định thì các chain này sẽ không chứa bất kỳ một rule nào, tuy nhiên mỗi chain đều có một policy mặc định nằm ở cuối chain, policy này có thể là ACCEPT hoặc DROP, chỉ khi gói tin đã đi qua hết tất cả các rule ở trên thì gói tin mới gặp phải policy này.
Ngoài ra, thứ tự gói tin di chuyển giữa các chain sẽ có hơi khác tùy vào tình huống

# Cấu hình một tường lửa cơ bản cho tấn công HTTP DDOS

Một cuộc tấn công điển hình nhất thường gặp là DDOS, còn được gọi là tấn công phân tán từ chối dịch vụ qua lớp dịch vụ (Application layer Distributed Denial of Service). Các cuộc tấn công DDoS của lớp ứng dụng nhằm làm cạn kiệt tài nguyên của mục tiêu và phá vỡ quyền truy cập vào trang web hoặc dịch vụ của mục tiêu. Kẻ tấn công sử dụng một con bot với những yêu cầu phức tạp gửi lên server làm server cố gắng dùng nhiều tài nguyên để xử lý. Thông thường, nó có thể yêu cầu truy cập cơ sở dữ liệu hoặc một băng thông tải xuống lớn. Nếu mục tiêu nhận được vài triệu yêu cầu trong một thời gian ngắn, nó có thể nhanh chóng bị quá tải và bị chậm lại khi cố gắng xử lý, hoặc nặng hơn, bị khóa dịch vụ hoàn toàn.

Tấn công tràn HTTP sử dụng các yêu cầu HTTP với mục đích làm vỡ máy chủ, các yêu cầu có thể là GET, lấy dữ liệu hoặc POST, chỉnh sửa dữ liệu. Điển hình nhất là việc cố gắng gửi yêu cầu refresh trang, với lượng truy cập vài nghìn đến vài triệu máy, yêu cầu sẽ tăng lên theo cấp số nhân và việc server bị vỡ là điều không thể tránh khỏi.

![](https://images.viblo.asia/8a3905d5-1ecd-4e10-b7be-15184c09e281.png)

## Giảm thiểu tấn công
Thông thường, các máy chủ đơn giản, rẻ tiền sẽ cài đặt một công cụ kiểm tra xem lưu lượng đang truy cập có thực sự không phải đến từ một con bot, CAPTCHA, thường thì các yêu cầu sẽ được viết bằng Javascript xử lý trước khi gửi về server, điều này làm giảm nhẹ tính nghiêm trọng của cuộc tấn công.

Một giải pháp chống DDoS điển hình có 2 điểm cơ bản: phát hiện và đánh chặn. Một số cách cài đặt hiện đại tách hẳn phần phát hiện ra khỏi hệ thống phòng thủ và thực hiện nó trong môi trường offline bằng cách sử dụng thông tin từ việc thu thập.

Nói một cách khác, ta sẽ tập trung hơn cho việc trả lời câu hỏi: “Ai đang gửi hàng tá request trong 10 phút vừa rồi?” thay vì phân tích cặn kẽ từng packet.

Quy trình thực hiện cơ bản:

`wc kern.log | awk '{print $1}'`

Output của dòng lệnh trên là số request hệ thống đã nhận từ lúc cài đặt đến nay, ví dụ số đầu tiên in ra sẽ là 1997, để lệnh chạy trong 1 phút, ta nhận được số 2997.

Từ 2 output trong khoảng đầu và cuối, ta ước tính được số request trong một phút là 1000. Chạy lệnh sau:

`tail 'kern.log' -1000 | awk '{print $1}' | sort | uniq -c | sort -rn`

Lệnh tail sẽ lấy từ kern.log 1000 dòng “cuối cùng trong file” (là con số ta trừ ở trên), truyền qua cho awk để chỉ lọc ra phần IP, gom chúng lại bằng lệnh sort rồi uniq -c sẽ đếm số lần xuất hiện của từng IP (các dòng giống nhau sẽ cộng lại) , chuyền qua cho sort -n để sắp từ nhỏ đến lớn (lớn nhất cuối cùng) và sau cùng là tail -1 là sẽ lấy 01 dòng cuối trong sort -n ở trên (tức là cái IP truy cập nhiều nhất trong 1 phút qua).

Thật là dễ dàng, ta có một output ví dụ như sau:

`300 42.197.112.151`

300 là số lần gửi request chạm server, dãy IP phía sau là IP nguồn của request. Với một người bình thường, 300 request sẽ trở nên bất bình thường, và server của ta sẽ chặn được kịp thời.

## Thiết lập luật cho iptables
Về phía iptables, ta sẽ tiến hành cài đặt đơn giản các luật, cho iptables phân tích packet on-the-fly, nghĩa là tất cả packet sẽ được quét tại thời gian thực packet đi vào hệ thống.

Với mấu chốt là cổng 80 và 443 cho dịch vụ HTTP, ta sẽ thiết đặt luật cho iptables để nghe trên cổng đó.
Việc thiết lập luật sẽ sử dụng hashlimit của iptables. Hashlimit sử dụng các hàm băm để thể hiện kết quả của tỉ lệ giới hạn cho một nhóm các kết nối trong cùng một luật iptables. Việc phân nhóm có thể được thực hiện trên mỗi nhóm máy chủ hoặc trên mỗi cổng. Haslimit sẽ cho phép người dùng diễn đạt n gói mỗi chu kì thời gian.

Thiết lập các hashlimit cho luật, các hashlimit cơ bản để xác định lưu lượng vào có phải là một cuộc tấn công DDoS hay không.

* Chỉ cho phép 1 packet trên 1 giây, số lượng packet có thể lớn hơn, nhưng nếu để 1 thì chắc chắn sẽ chặn được rất nhiều.
* Thiết lập giới hạn burst ở mức 1000. Sử dụng logic “dùng hoặc mất” cho sự bùng nổ lưu lượng.

![](https://images.viblo.asia/89ce94cb-7a75-47c8-8b24-70d4c46e751f.png)

Ví dụ về câu lệnh sẽ được sử dụng: 

`--limit 50/sec --limit-burst 20`

Giả sử server sẽ nhận được 1 packet mỗi mili giây trong 1 giây, thì sẽ có 70 packet được nhận vào tối đa trong 1 giây. 20 packet đầu sẽ được chấp nhận và reset credit lại về 0. Cứ mỗi 20ms (1/50s) thì credit sẽ được làm đầy trở lại và packet được chấp nhận, và có thêm 50 packet nữa.

* Thiết lập thời gian tồn tại cho các giá trị băm, thường là 30s.
* Nhóm các địa chỉ nguồn theo độ dài tiền tố, từ đấy các mạng con cũng phải chịu quản lý của hashlimit, tránh việc kiểm tra thiếu gói tin.

## Thử một lập lệnh đơn giản nhất

### Cản ICMP (gói tin đi vào)

ICMP có 15 loại và mỗi loại có ít nhất một code khác nhau. Riêng ICMP loại 3 có đến 15 code khác nhau. Vậy, chúng ta nên chọn và giới hạn ICMP nào?

 Sự chọn lựa này mang tính cá nhân vì mỗi người có cách nhìn khác nhau về ICMP. Riêng tôi, ICMP 0, 3, 4, 8 và 11 nên được dùng, số còn lại không nên cho phép ra vào vì chúng mang những tính chất ảnh hưởng đến vấn đề bảo mật cho máy chủ. Sau khi đã chọn loại ICMP được dùng, ta sẽ tiến hành viết luật cho chúng
    
Đầu tiên phải cho iptables biết rằng các ICMP thuộc loại cho phép được đi vào hệ thống, dùng đoạn lập lệnh sau:
```
OK_ICMP="0 3 4 8 11"
for item in $OK_ICMP; do
$iptables -A INPUT -i $IF -s $NET -p icmp --icmp-type $item -j ACCEPT
$iptables -A OUTPUT -o $IF -s $IP -p icmp --icmp-type $item -j ACCEPT
```

Đoạn lặp trên thiết lập nhóm luật xử lý giao thức ICMP cho phép các loại ICMP trong biến $OK_ICMP. Thật ra nhóm luật trên chỉ mới giới hạn loại ICMP được dùng nhưng chưa có bất cứ cơ chế nào kiểm soát lượng lưu thông ICMP ra vào. Bởi vậy, muốn vững hơn thì nên đưa vào -m limit để tạo nên mức kiểm soát cụ thể:

```
$iptables -A INPUT -i $IF -s $NET -p icmp --icmp-type $item -m limit --limit 1/s --limit-burst 1 -j ACCEPT
$iptables -A OUTPUT -o $IF -s $IP -p icmp --icmp-type $item -m limit --limit 1/s --limit-burst 1 -j ACCEPT
```

`-m limit` trên áp đặt giá trị “rate” rất khắt khe: chỉ tiếp nhận một gói ICMP trong mỗi giây. Với giới hạn này, các cuộc dội ICMP (ICMP flood) gần như vô tác dụng. Để tiết kiệm tài nguyên hơn, ta có thể nâng “rate” lên ở mức 5/s hoặc 10/s nhưng đừng quá lâu.

### Cản ICMP một nửa 

Mức độ cản ở đây chỉ dừng lại ở mức độ cản không cho các gói ICMP khởi tạo và đi vào từ bên ngoài. Máy chủ có thể khởi tạo các gói ICMP (trong giới hạn các loại ICMP cho phép thuộc biến $OK_ICMP) và các máy bên ngoài chỉ có thể “trả lời” các gói ICMP máy chủ tạo ra. Chức năng -m state một lần nữa hữu dụng cho trường hợp này:
```
$iptables -A INPUT -i $IF -s $NET -p icmp --icmp-type $item -m state --state ESTABLISHED -m limit --limit 1/s --limit-burst 1 -j ACCEPT
$iptables -A OUTPUT -o $IF -s $IP -p icmp --icmp-type $item -m state --state NEW,ESTABLISHED -m limit --limit 1/s --limit-burst 1 -j ACCEPT
```

Ta có thể thấy gói tin đi vào xuyên qua chuỗi INPUT chỉ có thể được tiếp nhận ở tình trạng ESTABLISHED nhưng gói tin đi ra xuyên qua chuỗi OUTPUT thì có thể được tiếp nhận ở cả tình trạng NEW và ESTABLISHED. -m state hỗ trợ cho -m limit trong trường hợp này tạo nên các luật rất khắt khe cho ICMP. Có những quan điểm cho rằng quá khắt khe với ICMP không tiện dụng cho các hoạt động mạng, vì vậy, lựa chọn thắt chặt hay không là do quyết định của cá nhân người sử dụng.

```
$iptables -A INPUT -i $IF -s $NET -p icmp --icmp-type $item -m length 42:43 -m limit --limit 1/s --limit-burst 1 -j ACCEPT
$iptables -A OUTPUT -o $IF -s $IP -p icmp --icmp-type $item -m length 42:43 -m limit --limit 1/s --limit-burst 1 -j ACCEPT
```

Thông thường, ping gởi đi một gói dữ liệu nào đó để host được ping theo mặc định. Nếu firewall được ấn định như trên, chỉ có gói tin ICMP nào có chiều dài trong khoảng 42 đến 43 bytes thì mới tiếp nhận. Điều này có nghĩa, khi một ai đó thử ping theo mặc định trên MS-DOS prompt hoặc trên một Unix console chắc chắn sẽ không có kết quả vì không thoả mãn kích thước gói tin đã ấn định. Tính “mở một nửa” nằm ở kích thước cụ thể của gói tin. Chỉ có bạn biết kích thước gói tin là bao nhiêu để ping vào máy chủ thành công (đây chính là tính “mở”); đối với mọi người dùng khác họ sẽ không ping vào máy chủ thành công vì hầu hết họ dùng kích thước gói tin theo mặc định (đây chính là tính “đóng”).

Hãy thử thêm một block lệnh này vào iptables của bạn, đừng thắc mắc, mọi thứ vẫn ở trong tầm kiểm soát:
```
$iptables -N STEALTH_SCAN 
$iptables -A STEALTH_SCAN -j LOG --log-prefix "stealth_scan_attack: "
$iptables -A STEALTH_SCAN -j DROP
 
$iptables -A INPUT -p tcp --tcp-flags SYN,ACK SYN,ACK -m state --state NEW -j STEALTH_SCAN

$iptables -A INPUT -p tcp --tcp-flags SYN,FIN SYN,FIN -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags SYN,RST SYN,RST -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags FIN,RST FIN,RST -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags ACK,FIN FIN -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags ACK,PSH PSH -j STEALTH_SCAN
$iptables -A INPUT -p tcp --tcp-flags ACK,URG URG -j STEALTH_SCAN
```
# Kết quả thử nghiệm

Đầu tiên, máy tin tặc sẽ gửi tiến hành làm tràn ping với hàng loạt các gói tin được gửi qua. Bằng các sử dụng hping3, tin tặc chỉ cần một vài dòng lệnh là có thể làm cho hệ thống chúng ta bị dừng xử lý.

Sử dụng Wireshark trên máy nạn nhân, ta bắt được các packet DDoS tăng đột biến về tần số xuất hiện

![](https://images.viblo.asia/7a9f31c8-1cd7-427c-8c51-d0eb4e1379e9.png)

Tiến hành chạy iptables, tất cả packet được dọn dẹp sạch sẽ, đọc log:

![](https://images.viblo.asia/c8bc7921-9b37-49cd-9a8a-6afd98d05591.png)

# Nguồn tham khảo

[Blackhat Asia](https://www.blackhat.com/presentations/bh-asia-02/bh-asia-02-shah.pdf)

[Type off attack](https://www.rapid7.com/fundamentals/types-of-attacks/)