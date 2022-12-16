Chào mọi người, tiếp theo series về nmap mình sẽ giới thiệu về các phương pháp quét port và kết thúc series này. Ở phần này, mình sẽ chia làm 3 phần chính để mọi người dễ theo dõi, bao gồm:
* Các phương pháp quét cổng đơn giản
* Các phương pháp quét cổng nâng cao
* Quét service, OS và cách sử dụng NSE (nmap script engine)
* Tăng hiệu suất quét và lưu đầu ra kết quả quét 
## 1. Các phương pháp quét cổng đơn giản
### 1.1. Các trạng thái của cổng
Thường thì khi quét cổng, các bạn sẽ nhận được trạng thái của cổng như mở hoặc đóng, ở đây mình liệt kê ra 6 trạng thái cổng mà bạn có thể sẽ nhận được trong quá trình quét:
- **Open**: cho biết rằng cổng đang được mở và lắng nghe
- **Closed**: cho biết rằng cổng không lắng nghe, mặc dù cổng có thể truy cập được. Bằng cách truy cập, điều đó có nghĩa là nó có thể tiếp cận và không bị chặn bởi tường lửa và các chương trình khác.
- **Filtered**: Có nghĩa là nmap không thể xác định được cổng đang đóng hay mở vì không thể truy cập được. Điều này xảy ra thường là do tường lửa chặn các gói đến nên không xác định được.
- **Unfilterd**: Có nghĩa là nmap không thể xác định được cổng mở hay đóng mặc dù có thể truy cập được. Trạng thái này phát hiện khi sử dụng ACK scan -sA.
- **Open|Filtered**: Nmap không thể xác định được cổng mở hay bị lọc.
- **Closed|Filtered**: Nmap không thể xác định được cổng đóng hay bị lọc.
### 1.2. TCP Flag
Các phương pháp quét cổng TCP của nmap dựa vào việc thay đổi các flag trong các gói tin, vì vậy trước khi đi vào vấn đề chính, chúng ta sẽ tìm hiểu qua về các flag trong gói TCP. Dưới đây là cấu trúc TCP header, 24bytes đầu tiên của TCP segment.
![](https://images.viblo.asia/0cd762cf-b96a-4bc2-829c-3ede085f04bb.png)
Có 6 loại Flag như sau:
- **URG**: Urgent flag (Cờ khẩn cấp): Cờ này được bật, TCP segment mang cờ này sẽ được xử lý ngay lập tức mà không cần phải đợi các TCP segment khác đến.
- **ACK**: Acknowlegedment flag (Cờ xác nhận), nó xác nhận việc đã nhận 1 TCP segment.
- **PSH**: Push flag (Cờ đẩy), yêu cầu TCP chuyển dữ liệu đến ứng dụng ngay lập tức
- **RST**: Reset flag (Cờ reset), dùng để đặt lại một kết nối, cờ này có thể được gửi bởi tường lửa để phá vỡ kết nối. 
- **SYN**: Synchronize flag (Cờ đồng bộ), sử dụng để đồng bộ trong quá trình bắt tay 3 bước và đồng bộ hóa số thứ tự với máy chủ khác.
- **FIN**: Finish flag, sử dụng để báo rằng người gửi không còn dữ liệu để gửi.

### 1.3. TCP Connect Scan, TCP SYN Scan, UDP Scan
* **TCP Connect Scan**

Cơ chế hoạt động theo quá trình bắt tay 3 bước, có thể xem lại quá trình ở phần trên. Tuy nhiên vì không cần duy trì kết nối, sau khi xác định được cổng mở, gửi gói ACK/RST để hủy kết nối. Điều quan trọng là nếu bạn không phải là privileged user, đây là cách khả thi nhất để quét cổng. Nếu 1 cổng đóng nó sẽ phản hồi gói SYN bằng 1 gói với ACK/RST.
![](https://images.viblo.asia/f1eb416b-fe3b-4e1d-ba87-83437503fbf9.png)

**Usage**: `nmap -sT TARGETS `

*Note:* Sử dụng -R để quét 100 cổng sử dụng nhiều nhất thay vì mặc định 1000 cổng, -r để quét các cổng theo thứ tự nhất quán thay vì ngẫu nhiên.
* **TCP SYN Scan**

Với cách này, Unprivileged user bị giới hạn trong việc quét cổng. Với cách này, không cần phải hoàn thành quá trình bắt tay 3 bước. Sau khi nhận được gói phản hồi SYN/ACK cho thấy cổng mở, ta gửi gói RST để hủy quá trình, điều này giảm khả năng bị ghi lại trong quá trình quét. Nếu cổng đóng, ta nhận lại gói RST/ACK như quá trình bắt tay.
![](https://images.viblo.asia/af744c72-8adb-4757-9582-397a70813d80.png)

**Usage**: `nmap -sS TARGETS`

* **UDP Scan**

Giống như quá trình UDP ping để discovery host ở phần trước. Nếu 1 port mở, ta nhận không nhận lại 1 phản hồi nào cả. Tuy nhiên nếu port đóng, ta nhận lại 1 ICMP type 3, code 3.

**Usage**: `nmap -sU TARGETS` 

***Note**:* Sử dụng -F để quét nhanh hơn, 100 cổng phổ biến

## 2. Các phương pháp quét cổng nâng cao
### 2.1. TCP Null Scan, FIN Scan, Xmas Scan

- **NULL Scan**

Cách này gửi gói TCP với tất cả các cờ được tắt, nếu cổng mở hoặc bị tường lửa chặn, ta sẽ không thể nhận được phản hồi, tuy nhiên nếu cổng đóng, ta nhận được phản hồi RST/ACK. Vì vậy, nó không thể chỉ ra chắc chắn là các cổng này đang mở, vì có thể bị chặn bởi firewall.

Yêu cầu prilvilleged user - Usage sudo nmap -sN TARGETS
- **FIN Scan**

Cách này gửi gói TCP với cờ FIN được đặt, sẽ không nhận được phản hồi nào nếu cổng đang mở hoặc do tường lửa chặn. Tuy nhiên nếu cổng đóng, ta nhận được phản hồi RST/ACK từ đó có thể suy ra được cổng đang mở hay bị chặn.

Yêu cầu prilvilleged user - **Usage**:` sudo nmap -sF TARGETS`
- **Xmas Scan**

Cách này gửi các gói với cờ FIN, PSH, URG được đặt. Tương tự, ta nhận được các phản hồi nếu cổng mở đóng như 2 cách trên.

Yêu cầu prilvilleged user -Usage: `sudo nmap -sX TARGETS`

***Note***: 3 cách quét này có thể hiệu quả với stateless firewall, vì tường lửa này sẽ kiểm tra để lọc xem cờ SYN có được bật hay không. Nhưng với statefull firewall sẽ chặn hết tất cả các gói này.

### 2.2. TCP ACK Scan, Window, and Custom Scan

- **TCP ACK Scan**

Như chúng ta đã biết, gói ACK được gửi để xác nhận rằng đã nhận được một gói khác trước đó, vì vậy việc gửi gói ACK không cho biết cổng mở hoặc đóng![](https://images.viblo.asia/22b84ab1-9860-4114-920a-b5a1784dee0f.png)

**Usage**: `nmap -sA TARGETS`

Sử dụng cách này cho ta xác định được quy tắc tường lửa nếu có tường lửa được thiết lập. Ví dụ, nếu gửi gói đến và tường lửa không chặn, ta nhận được gói với cờ ACK được bật, tuy nhiên, nếu tường lửa chặn 1 số cổng, ta có thể dựa vào đây để nhận biết. Xem 2 ví dụ trước và sau khi thiết lập tường lửa ở dưới để hiểu rõ.
![](https://images.viblo.asia/2884fa51-97bb-4a68-8f38-03213300100d.png)

***<div align="center">Trước khi có firewall</div>***

![](https://images.viblo.asia/c6f437bd-5b45-4041-8f8b-884b8f8dfceb.png)

***<div align="center">Sau khi setup firewall</div>***
Như vậy dựa vào kết quả ta có thể xác định được rằng tường lửa bỏ qua việc chặn gói tin đến 3 cổng này.

* **Window Scan**

Tương tự với cách trên, dùng để xác định các quy tắc tường lửa, tuy nhiên trong 1 số hệ thống cụ thể ta có thể xác định được port có mở hay không.
![](https://images.viblo.asia/307610ec-4bf2-4fbf-87e7-0811453695f6.png)

Xem 2 kết quả dưới đây để thấy sự khác biệt khi có hay không tường lửa
![](https://images.viblo.asia/1fdcf771-0f6b-43e2-907d-39116c6f628a.png)

***<div align="center">Trước khi có firewall</div>***

![](https://images.viblo.asia/059c1bcc-54cb-4d1e-ad47-493f8ea3512e.png)


***<div align="center">Sau khi setup firewall</div>***

* **Custom Scan**

Cách quét này cho chúng ta thiết lập một cách thoải mái các cờ để tùy chỉnh cho từng trường hợp.

**Usage**: `nmap --scanflags CUSTOM_FLAGS TARGETS` 
- **CUSTOM_FLAG** = URG, RST, SYN, ACK, FIN, PSH

*E.g.: nmap --scanflags URGRSTACK TARGETS*

### 2.3. Spoofing and Decoys
* **Spoofing**

Cách quét này giả mạo địa chỉ IP hay cả địa chỉ MAC để tránh bị phát hiện. Cơ chế hoạt động được miêu tả như hình dưới.
![](https://images.viblo.asia/8f403c21-1496-43d0-a23f-5c4d1bc42ef0.png)

Kết quả được gửi về Spoofed_IP nên để nắm bắt được chính xác kết quả, máy tấn công cần theo dõi lưu lượng mạng để phân tích các phản hồi.

**Usage**: `nmap -e NET_INTERFACE -Pn -S SPOOFED_IP TARGET`
* *-e*: Giao diện mạng dùng để nắm bắt gói tin phản hồi
* *-Pn*: Tắt chế độ ping
* *SPOOFEDIP*: IP máy cần giả mạo

Ngoài ra nếu ở trên cùng một mạng con với mục tiêu, có thể sử dụng spoofing MAC bằng --spoof-mac SPOOFED_MAC.
* **Decoys (Mồi câu)**

Cách này sử dụng nhiều địa chỉ IP giả để đánh lừa mục tiêu

![](https://images.viblo.asia/9a41e815-ebbd-4f2e-9712-557cb0a1ee15.png)

**Usage**: `nmap -D IP1,IP2,ME TARGET`

Trong đó IP1, IP2 là IP muốn thêm vào để đánh lừa, ME ám chỉ IP của địa chỉ bạn, ngoài ra có thể thêm RND để tạo địa chỉ IP ngẫu nhiên.

### 2.4 Idle/Zombie Scan

Cách này còn được gọi là quét máy chủ không hoạt động. Nếu sử dụng  spoofing hoặc decoys, chúng ta cần đảm bảo attacker có thể dám sát được các lưu lượng mạng, điều này thường rất khó để thực hiện. Vì vậy còn 1 cách quét khác đó là sử dụng Zombie host.

Quá trình này gồm có 3 bước như sau:

**B1:** Gửi gói SYN/ACK đến máy chủ không hoạt động để ghi lại IP ID của máy này

**B2:** Gửi gói SYN đến máy đích, với IP của Idle host

**B3:** Kích hoạt lại Idle host để so sánh IP ID lúc này với trước đó

Ta giải thích quá trình bằng cách hình bên dưới:

![](https://images.viblo.asia/24de2288-eb85-4469-b794-d56a341969a7.png)
Sau bước này ta ghi lại được IP ID của idle host
Sau đó gửi gói SYN tới máy tấn công, 3 kịch bản sau sẽ xảy ra:
 
1.  Cổng bị đóng, do đó idle host nhận 1 gói RST, điều này không làm idle host hoạt động nên IP ID được giữ nguyên![](https://images.viblo.asia/ba378393-1f42-467c-b648-7c225c52c8cd.png)

2. Cổng mở, idle host nhận được 1 gói SYN/ACK và phản hồi bằng 1 gói RST do đó IP ID của máy được tăng lên.
![](https://images.viblo.asia/ba378393-1f42-467c-b648-7c225c52c8cd.png)

3. Trong trường hợp thứ 3, bị tường lửa chặn, việc này dẫn đến kết quả giống với cổng đóng, vì ta không nhận được phản hồi nào, do đó IP ID không tăng lên.

Bước cuối cùng là ta gửi 1 gói SYN/ACK tới idle host, điều này làm tăng IP ID lên 1. Dựa vào kết quả so sánh IP ID, nếu được tăng 1 so với ban đầu, ta thấy cổng đóng hoặc bị chặn, nếu tăng 2, thì cổng đang mở.

***Note***: Cần tìm đúng 1 máy chủ không hoạt động, nếu nó đang bận, việc này sẽ không chính xác.

**Usage**:` nmap -sI ZOMBIE_IP TARGET_IP`

Thêm thông tin chi tiết từ kết quả quét:
* --reason : Đưa ra lý do vì sao có kết quả như vậy
* -v, -vv: Đưa ra chi tiết quét
* -d, -dd: Chế độ debugging

## 3.  Quét service, OS và cách sử dụng NSE (Nmap Script Engine)

### 3.1. Service Detection
Sử dụng để khám phá chi tiết các dịch vụ đang chạy trên cổng, điều này cho phép ta tìm kiếm các lỗ hổng dựa trên phiên bản dịch vụ đang được sử dụng. Có thể thay đổi cường độ quét bằng việc sử dụng` --version-intensity <level 0-9>`, sử dụng `--version-light` với mức 2 hoặc` --version-all` với mức 9.

Quá trình quét này bắt buộc phải sử dụng cơ chế bắt tay 3 bước để chạy được. Vì vậy các kiểu quét như SYN sẽ không thể sử dụng đi kèm.
Cần Prilvilleged user để sử dụng kiểu quét này.

**Usage**: `nmap -sV --version-light TARGET`
### 3.2. OS Detection and Traceroute
- OS Detection: Để phát hiện hệ điều hành đang chạy, ta thêm tùy chọn -O và trong câu lệnh
- Traceroute: Để tìm ra các host ở giữa mình và mục tiêu, có thể thêm tùy chọn --traceroute vào
### 3.3. Nmap Scripting Engine (NSE)
Các đoạn scripts được chứa tại /usr/share/nmap/scripts
Để sử dụng nhóm các scripts, ta sử dụng --script = "script category"
Ta có các loại script như sau:
- **auth**: Các script liên quan đến xác thực (authentication)
- **broadcast**: Khám phá host bằng gửi tin broadcast
- **brute**: Thực hiện brute-force đăng nhập
- **default**: Các đoạn script mặc định, có thể dùng nhanh bằng -sC
- **discovery**: Truy vấn thông tin có thể truy cập, chẳng hạn như database hoặc DNS names
- **dos**: Phát hiện các máy chủ dễ dàng bị DoS
- **exploit**: Cố gắng khai thác các lỗ hổng
- **external**: Kiểm tra bằng cách sử dụng dịch vụ của bên thứ ba
- **fuzzer**: Tấn công fuzzer
- **intrusive**: Các tập lệnh xâm nhập chẳng hạn như brute-force hoặc exploitation
- **malware**: Quét cho backdoors
- **safe**: Các lệnh an toàn, không làm hỏng mục tiêu
- **version**: Truy xuất phiên bản của dịch vụ
- **vuln**: Kiểm tra lỗ hổng hoặc khai thái chúng

Có thể chỉ định tập lệnh sử dụng bằng cách sử dụng` --script "SCRIPT_NAME"`
Ex: `--script "ftp*"`, sẽ sữ dụng tất cả script có dạng ftp---

**- Tham số khi sử dụng scripts:**

Một số script yêu cầu tham số đi kèm để có thể chạy, khi đó ta sử dụng dòng lệnh sau:
`--script-args <script_name>.<script_arg>`
Để biết thêm thông tin về các scripts: Sử dụng: `nmap --script-help <script_name>`

## 4. Tăng hiệu năng quét và lưu đầu ra kết quả quét 
### 4.1 Tăng hiệu năng của quá trình quét
**- Chỉ định các cổng được quét**

- **port list**: -p22,23,24 để quét các cổng chỉ định
- **port range**: -p1-1000 để chỉ định phạm vi quét cổng
- **full port**: -p- để quét tất cả các cổng (2^16-1)
- **100 most ports**: -F
- **X most ports**: --top-ports X (với X là số port phổ biến) 
- 
**- Cài đặt tốc độ quét**

Có 6 mốc quét, lần lượt là: paranoid (0), sneaky (1), polite (2), normal (3), aggressive (4),  insane (5)
Tốc độ càng thấp thì độ an toàn càng cao, mức bình thường sẽ là mức 3, trong các cuộc thi CTF người ta thường sử dụng mức 4, tuy nhiên trong thực tế thì mức 1 sẽ được sử dụng để tăng khả năng tàng hình, tránh bị phát hiện.

**Usage**:  `nmap -T<0-5> `

**- Cài đặt tốc độ gửi gói**

Có thể thiết lập số gói tin gửi mỗi giây bằng cách sử dụng` --min-rate <number>` hoặc` --max-rate <number>`, tương ứng với số gói gửi ít nhất mỗi phút và nhiều nhất mỗi phút.

**- Chạy song song các đầu dò**

Thay vì quét 1 mục tiêu hay 1 cổng 1 lần, ta có thể cài đặt số lượng đầu dò chạy song song để tăng tốc độ quét.
`--min-parallelism <numprobes> hoặc --max-parallelism <numprobes>`

### 4.2 Xử lý đầu ra kết quả quét

Có 3 kiểu lưu định dạng chính trong nmap lần lượt là **Normal**, **Grepable** và **XML**
Sử dụng:` -oN, -oG, -oX` để lưu, ngoài ra có thể sử dụng -oA để lưu cả 3 định dạng . Có thể kết hợp với câu lệnh **grep** để truy tìm kết quả và xử lý nhanh hơn tùy vào trường hợp.