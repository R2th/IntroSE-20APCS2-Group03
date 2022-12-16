> Ra đời từ cách đây rất lâu nhưng điện thoại vẫn là phương tiện liên lạc hữu
> hiệu trong mọi lĩnh vực của chúng ta.
> Ngày nay, với sự phát triển mạnh mẽ của Internet, ra đời nhiều loại hình dịch
> vụ phục vụ cho việc liên lạc của con người. Trong đó VoIP là công nghệ mang tính
> cách mạng làm thay đổi thế giới điện thoại với chất lượng dịch vụ khá cao.
Vậy VoIP là gì ? và ứng dụng nó ra sao, mình sẽ cùng các bạn tìm hiểu công nghệ này ngay sau đây.
### I. TỔNG QUAN VỀ VOIP
#### **1. Giới thiệu chung về VOIP**

VoIP (viết tắt của Voice over Internet Protocol, nghĩa là Truyền giọng nói trên giao thức IP) là công nghệ truyền tiếng nói của con người (thoại) qua [mạng máy tính](https://vi.wikipedia.org/wiki/M%E1%BA%A1ng_m%C3%A1y_t%C3%ADnh) sử dụng bộ giao thức [TCP/IP](https://vi.wikipedia.org/wiki/TCP/IP). Nó sử dụng các gói dữ liệu IP (trên mạng LAN, WAN, Internet) với thông tin được truyền tải là mã hoá của âm thanh.

Công nghệ này bản chất là dựa trên [chuyển mạch gói](https://vi.wikipedia.org/wiki/Chuy%E1%BB%83n_m%E1%BA%A1ch_g%C3%B3i), nhằm thay thế công nghệ truyền thoại cũ dùng [chuyển mạch kênh](https://vi.wikipedia.org/wiki/Chuy%E1%BB%83n_m%E1%BA%A1ch_k%C3%AAnh). Nó nén (ghép) nhiều kênh thoại trên một đường truyền tín hiệu, và những tín hiệu này được truyền qua mạng Internet, vì thế có thể giảm giá thành.

VoIP cho phép tạo cuộc gọi dùng kết nối băng thông rộng thay vì dùng đường
dây điện thoại tương tự (analog). Nhiều dịch vụ VoIP có thể chỉ cho phép bạn gọi
người khác dùng cùng loại dịch vụ, tuy nhiên cũng có những dịch vụ cho phép gọi
những người khác dùng số điện thoại như số nội bộ, đường dài, di động, quốc tế.
Trong khi cũng có những dịch vụ chỉ làm việc qua máy tính, cũng có vài dịch vụ dùng
điện thoại truyền thống qua một bộ điều hợp (adaptor). Nguyên tắc hoạt động của VoIP bao gồm việc số hoá tín hiệu tiếng nói, thực hiện việc nén tín hiệu số, chia nhỏ các gói nếu cần và truyền gói tin này qua mạng, tới nơi nhận các gói tin này được ráp lại theo đúng thứ tự của bản tin, giải mã tín hiệu tương tự phục hồi lại tiếng nói ban đầu.

Để thực hiện việc này, điện thoại IP, thường được tích hợp sẵn các nghi thức báo hiệu chuẩn như SIP hay H.323, kết nối tới một tổng đài IP (IP PBX) của doanh nghiệp hay của nhà cung cấp dịch vụ. Điện thoại IP có thể là điện thoại thông thường (chỉ khác là thay vì nối với mạng điện thoại qua đường dây giao tiếp RJ11 thì điện thoại IP nối trực tiếp vào mạng LAN qua cáp Ethernet, giao tiếp RJ45) hoặc [phần mềm thoại](https://vi.wikipedia.org/w/index.php?title=Ph%E1%BA%A7n_m%E1%BB%81m_tho%E1%BA%A1i&action=edit&redlink=1) (soft-phone) cài trên máy tính.

#### **2. Ưu điểm của VoIP**

*  Một ưu điểm đầu tiên là gọi miễn phí nếu sử dụng cùng dịch vụ, cùng
 thiết bị VoIP hoặc cùng tổng đài IP ( hay còn gọi là gọi nội mạng). Hoặc
 nếu không thì giá thành cũng rẻ đáng kể so với sử dụng cách gọi truyền
 thống PSTN (Public Switched Telephone Network)
 Giải pháp VoIP cũng làm giảm đáng kể chi phí cho việc quản lý bảo trì
 hệ thống mạng thoại và dữ liệu.
*  Tích hợp mạng thoại, mạng số liệu và mạng báo hiệu: trong điện thoại
 IP, tín hiệu thoại, số liệu và ngay cả báo hiệu đều có cùng đi trên một
 mạng IP. Điều này sẽ giúp tiết kiệm chi phí khi đầu tư nhiều mạng riêng
 lẽ.
* Khả năng mở rộng: Các tổng đài điện thoại thường là những hệ thống
 kín, rất khó để thêm vào đó những tính năng thì các thiết bị trong mạng
 internet thường có khả năng thêm vào những tính năng mới.
* Trong một cuộc gọi người sử dụng có thể vừa nói chuyện vừa sử dụng
 các dịch vụ khác như truyền file, chia sẽ dữ liệu hay xem hình ảnh của
 người nói chuyện bên kia.
* Một lợi ích nữa là, việc sử dụng đồng thời cả điện thoại bàn thông
thường và điện thoại IP (có dây hoặc không dây) qua hệ thống mạng
LAN (Local Area Network) sẽ đảm bảo thông tin liên lạc của doanh
nghiệp không bị gián đoạn khi xảy ra sự cố.

#### **3. Nhược điểm của VoIP**

* Kỹ thuật phức tạp: để có được một dịch vụ thoại chấp nhận được, cần
thiết phải có một kỹ thuật nén tín hiệu phải đạt được các yêu cầu như: tỉ
số nén lớn, có khả năng suy đoán và tạo lại thông tin của các gói bị thất
lạc, tốc độ xử lý của các bộ codec (Coder and Decoder) phải đủ nhanh…
* Vấn đề bảo mật (Security): Mạng internet là một mạng có tính rộng
khắp và hỗn hợp. Trong đó có rất nhiều loại máy tính khác nhau và các
dịch vụ khác nhau cùng sử dụng chung một cơ sở hạ tầng. Do vậy không
có gì đảm bảo rằng những thông tin của người sử dụng được bảo mật an
toàn. 

#### **4. Các kiểu kết nối trong VoIP**
##### 4.1. Computer to Computer

* Với 1 kênh truyền Internet có sẵn, là 1 dịch vụ miễn phí được sử dụng
rộng rãi khắp nơi trên thế giới. Chỉ cần người gọi (caller) và người nhận
(receiver) sử dụng chung 1 VoIP service (Skype, Yahoo Messenger,…),
2 headphone + microphone, sound card . Cuộc hội thoại là không giới
hạn.
* Mô hình này áp dụng cho các công ty, tổ chức, cá nhân đáp ứng nhu cầu
liên lạc mà không cần tổng đài nội bộ.
![](https://images.viblo.asia/1db6f3d1-6631-4fd4-8fef-4e5bb9a5babb.png)
##### 4.2. Computer to Phone
* Là 1 dịch vụ có phí. Bạn phải trả tiền để có một account và một software
(VDC, Evoiz, Netnam,…). Với dịch vụ này một máy PC có kết nối tới
một máy điện thoại thông thường ở bất cứ đâu ( tuỳ thuộc phạm vi cho
phép trong danh sách các quốc gia mà nhà cung cấp cho phép). Người
gọi sẽ bị tính phí trên lưu lượng cuộc gọi và khấu trừ vào tài khoản hiện
có.
![](https://images.viblo.asia/fd662138-96a6-4a86-91e4-c9fee378876a.png)
##### 4.3. Phone to Phone
* Là một dịch vụ có phí. Bạn không cần kết nối Internet mà chỉ cần một
VoIP adapter kết nối với máy điện thoại. Lúc này máy điện thoại trở
thành một IP phone.
![](https://images.viblo.asia/e690d571-cc9d-494f-89ca-d701cb41034f.png)

#### **5. Các thành phần trong mạng VOIP**
Các thành phần cốt lõi của 1 mạng VoIP bao gồm: Gateway, VoIP Server, IP network, End User Equipments.
![](https://images.viblo.asia/a9ad0c14-69c7-43fe-bda1-ae7d350820d9.png)
* Gateway: là thành phần giúp chuyển đổi tín hiệu analog sang tín hiệu số
(và ngược lại).
* VoIP gateway : là các gateway có chức năng làm cầu nối giữa mạng
điện thoại thường ( PSTN ) và mạng VoIP.
* VoIP GSM Gateway: là các gateway có chức năng làm cầu nối cho các
mạng IP, GSM và cả mạng analog.
* VoIP server : là các máy chủ trung tâm có chức năng định tuyến và bảo
mật cho các cuộc gọi VoIP. Trong mạng H.323 chúng được gọi là
gatekeeper. Trong mạng SIP các server được gọi là SIP server.
* Thiết bị đầu cuối (End user equipments ): Softphone và máy tính cá
nhân (PC): bao gồm một headphone, một phần mềm và một kết nối
Internet. Các phần mềm miễn phí phổ biến như Skype, Ekiga,...
* Điện thoại truyền thông với IP adapter: để sử dụng dịch vụ VoIP thì máy
điện thoại thông dụng phải gắn với một IP adapter để có thể kết nối với
VoIP server. Adapter là một thiết bị có ít nhất một cổng RJ11 (để gắn
với điện thoại) , RJ45 (để gắn với đường truyền Internet hay PSTN) và
một cổng cắm nguồn.
* IP phone : là các điện thoại dùng riêng cho mạng VoIP. Các IP phone
không cần VoIP Adapter bởi chúng đã được tích hợp sẵn bên trong để
có thể kết nối trực tiếpvới các VoIP server.
### II. CÁCH THỨC HOẠT ĐỘNG CỦA VOIP
#### 1. VOIP hoạt động như thế nào?
Trong VoIP khi nói vào ống nghe hay microphone, giọng nói sẽ tạo ra tín hiệu
điện từ, đó là những tín hiệu analog. Tín hiệu analog được chuyển sang tín hiệu số
dùng thuật toán đặc biệt để chuyển đổi. Những thiết bị khác nhau có cách chuyển
đổi khác nhau như VoIP phone hay softphone, nếu dùng điện thoại analog thông
thường thì cần một Telephony Adapter (TA). Sau đó giọng nói được số hóa sẽ
được đóng vào gói tin và gởi trên mạng IP.

Các bước cơ bản để thực hiện một cuộc gọi trong VoIP:
* Xác định địa điểm cần gọi đến (mã quốc gia, mã tỉnh,…) và bấm số cần
gọi đến.
* Các kết nối giữa người gọi và người nhận sẽ được thiết lập.
* Khi nói vào ống nghe hay microphone, giọng nói sẽ tạo ra tín hiệu điện
từ, đó là những tín hiệu analog. Tín hiệu analog được chuyển sang tín
hiệu số dùng thuật toán đặc biệt để chuyển đổi. Sau đó giọng nói được
số hóa sẽ được đóng thành gói tin và gửi trên mạng IP. Trong suốt tiến
trình một giao thức như SIP hay H323 sẽ được dùng để điểu khiển
(control) cuộc gọi như là thiết lập, quay số, ngắt kết nối,… và RTP thì
được dùng cho tính năng đảm bảo độ tin cậy và duy trì chất lượng dịch
vụ trong quá trình truyền.
* Dữ liệu sẽ được truyền tải qua kết nối được thiết lập lúc đầu.
* Dữ liệu chứa âm thanh mà bạn nói sẽ được chuyển hóa trở lại thành âm
thanh mà người nghe hiểu được.
* Cuối cùng âm thanh bạn nói ra sẽ được phát ra bên phía người nhận.

Quá trình số hóa tín hiệu analog:

Biểu diễn tín hiệu analog thành dạng số (digital) là công việc khó khăn.
Vì bản thân dạng âm thanh như giọng nói con người ở dạng analog do đó phải
cần một số lượng lớn các giá trị digital để biểu diển biên độ (amplitude), tần số,
và pha (phase), chuyển đổi những giá trị đó thành dạng số nhị phân (0 & 1) là
rất khó khăn. Vì vậy, để thực hiện sự chuyển đổi này chúng ta cần phải dùng
đến thiết bị được gọi là codec (coder-decoder) hay là thiết bị mã hóa và giải
mã. Tín hiệu analog được đặt vào đầu vào của thiết bị này và được chuyển
thành các chuỗi số nhị phân ở đầu ra. Sau đó quá trình này thực hiện trở lại
bằng cách chuyển đổi chuỗi số nhị phân thành dạng analog ở đầu cuối.

Có 4 bước liên quan đến quá trình số hóa một tín hiệu analog:
1. Lấy mẫu (Sampling)
1. Lượng tử hóa (Quantization)
1. Mã hóa (Encoding)
1. Nén giọng nói (Voice Compression).

**Các kỹ thuật sử dụng trong quá trình số hóa:**

**Multiplexing**: Ghép kênh là qui trình chuyển một số tín hiệu đồng thời qua một phương tiện truyền dẫn.

**TDM** (Time Division Multiplexing): Ghép kênh phân chia theo thời gian. Phân phối khoảng thời gian xác định vào mỗi kênh, mỗi kênh chiếm đường truyền cao tốc trong suốt một khoảng thời gian theo định kì.

**FDM** (Frequency Division Multiplexing): Ghép kênh phân chia theo tần số. Mỗi kênh được phân phối theo một băng tần xác định, thông thường có bề rộng 4Khz cho dịch vụ thoại.

**PCM** (Pulse Code Modulation): Điều chế theo mã: là phương pháp thông dụng nhất chuyển đổi các tín hiệu analog sang dạng digital ( và ngược lại) để có thể vận chuyển qua một hệ thống truyền dẫn số hay các quá trình xử lý số.

### III. CÁC GIAO THỨC TRONG VOIP
#### 1. GIAO THỨC H.323
##### 1.1. Giới thiệu
Hệ thống giao tiếp dựa trên gói đa phương tiện, hay còn gọi là H.323. Là
một chuẩn quốc tế của VoIP được phát triển bởi Liên Minh Viễn Thông Quốc
Tế (ITU – International Telecommunicatinons Union). Đây là cấu trúc chặt
chẽ, phức tạp và phù hợp với việc thực thi các đặc tính thoại truyền thống.
H.323 thiết kế cho việc truyền audio, video và data qua mạng IP.
##### 1.2. Các giao thức của H.323
Khi làm việc với H.323, có thể nhận ra rằng nó không phải là một giao thức đơn mà là tập hợp của một nhóm giao thức. Các giao thức riêng được sử dụng trong mạng H.323 bao gồm:
* H.255 - báo hiệu cuộc gọi.
* H.245 - điều khiển đa phương tiện (thông số kênh âm thanh và
video).
* H.235 - bảo mật và chứng thực.
* Q.391 - sử dụng cho tín hiệu cuộc gọi.
* T.120 - chia sẻ dữ liệu.
* RTP - truyền tải đa phương tiện (truyền dòng âm thành và video).
##### 1.3. Các thành phần cơ bản của H.323
Các thành phần cơ bản trong hệ thống mạng H.323 được quy định như sau:
các đầu cuối, cổng kết nối, thiết bị điều khiển cổng kết nối (gatekeeper) và khối
điều khiển đa điểm MCU (Mutipoint Conference Unit).

Terminal thì thường là phần mềm hoặc phần cứng điện thoại VoIP. Một số chương trình có thể xem như các thiết bị terminal trong việc trao đổi giao thức.

Gateway là một thiết bị cho phép một thông tin giao tiếp hai chiều với các
thiết bị trong mạng viễn thông khác. Các mạng viễn thông khác thường là
PSTN. 

MCU là một thiết bị được dùng cho cuộc hội thoại nhiều người. Là nơi chịu trách nhiệm cho việc trộn các kênh âm thanh – video trong các cuộc hội thoại.

Terminal, gateway, các MCU được gọi chung là các thiết bị đầu cuối. Ngoài
các thiết bị đầu cuối trên, mạng H.323 có thêm một thành phần thứ 4 là
gatekeeper. Thiết bị gatekeeper đóng vai trò như một bộ điều khiển trung tâm trong mạng. Nhiệm vụ chính của gatekeeper là đăng ký thiết bị đầu cuối gọi vào. Tập hợp các thiết bị đầu cuối được quản lý cùng một gatekeeper gọi là một khu (Zone).
![](https://images.viblo.asia/93b4de11-5ce6-4972-9bc7-765136db7266.png)

##### 1.4. Phương thức hoạt động của H.323
Phần trên chúng ta đã tìm hiểu về H.323, bây giờ chúng ta sẽ tìm hiểu về
phương thức hoạt động của H.323, để xem H.323 hoạt động như thế nào?

Giả sử, một mạng sử dụng gatekeeper và các dòng dịch chuyển tín hiệu đi
thông qua gatekeeper (mô hình đã được định tuyến). Chúng ta có hai thiết bị đầu cuối (điện thoại IP) và một gatekeeper, các số điện thoại được gán cho các thiết bị tương ứng là 100 và 200. Một người với số điện thoại là 100 quay số 200. Những việc được diễn ra như sau:

* Thiết bị đầu cuối mà thiết lập cuộc gọi biết được số gọi là 200 nhưng
nó không biết địa chỉ IP liên quan đến số đó. Cùng thời điểm, từ khi
nó được đăng ký với gatekeeper, nó phải yêu cầu gatekeeper cấp
quyền để đặt cuộc gọi bằng cách gửi thông điệp ARQ (Admission
Request - thông điệp yêu cầu cấp IP) cho gatekeeper. ARQ sẽ chứa số được gọi (200) báo cáo cho gatekeeper rằng thiết bị đầu cuối cần có
số được phân giải thành địa chỉ IP.
* Gatekeeper sẽ kiểm tra dữ liệu của các thiết bị đầu cuối đã đăng ký
dù nó chứa số 200. Vậy thì gatekeeper sẽ kiểm tra nếu 100 được gọi
đến 200 thì gatekeeper sẽ gửi lại một câu trả lời – thông điệp ACF
(Admiss Confirm – thông điệp chứng thực) chứa địa chỉ IP của 200
và gửi ACF đến thiết bị cuối đang gọi. 
![](https://images.viblo.asia/82ab12d6-43d1-4ba8-ac84-dcee33f9d11b.png)
* Thiết bị đầu cuối 100 bây giờ sẽ mở một kênh tín hiệu cuộc gọi
(kênh TCP) đến địa chỉ được cung cấp bởi gatekeeper trong thông
điệp ACF. Thông điệp tín hiệu cuộc gọi được gửi qua TCP với giao
thức H.255, đã được nhúng vào Q.931 (kí hiệu là Q.931/H.255).
Thiết bị đầu cuối sẽ mở một kênh TCP tới gatekeeper và gửi thông
điệp Setup (cài đặt) Q.931/H.255, gatekeeper sẽ mở một kênh TCP
thứ hai đến thiết bị đầu cuối 200 và chuyển tiếp thông điệp cài đặt.
![](https://images.viblo.asia/d57d84ff-437a-4a29-8e9a-1e102ca55561.png)
* Thiết bị đầu cuối 200 đầu tiên sẽ trả lời Q.931/H.255 bằng thông
điệp Call Proceeding (cách tiến hành gọi) để cho biết nó đã bắt đầu
làm việc trên thiết lập cuộc gọi và gatekeeper sẽ chuyển tiếp thông
điệp đến thiết bị đầu cuối đang gọi (100). Sau đó 200 sẽ yêu cầu
gatekeeper quyền gọi (ARQ) và gatekeeper sẽ trả lời bằng thông điệp
ACF.
![](https://images.viblo.asia/ef4bd2b4-7d0b-41e2-9fad-0ec5e72bc1a3.png)
* Các điện thoại được gọi (200) bắt đầu đổ chuông và gửi lại tín hiệu
cho bên kia với thông điệp cảnh báo (Alerting).
* Bên được gọi (200) bắt máy và thiết bị đầu cuối có thể báo hiệu cuộc
gọi đã được chấp nhận. Việc này kết thúc bằng cách gửi thông điệp
Connect. Tại thời điểm này, các bên sẽ phải điều chỉnh giá trị cho
các kênh âm thanh và tùy chọn video. Giao thức H.245, sẽ được sử
dụng cho việc điều chỉnh này. 
![](https://images.viblo.asia/9d245d56-315b-430a-9894-62c60d7d6f7a.png)
* Thiết bị đầu cuối gọi đi mở một kênh TCP tới địa chỉ H.245 đã nhận
được trong thông điệp Connect và gatekeeper sẽ tạo một nữa kênh
báo hiệu H.245 thứ hai.
* Cuối cùng, hai thiết bị đầu cuối có thể bắt đầu gửi các dòng RTP và
hai bên sẽ nghe lẫn nhau. 
![](https://images.viblo.asia/3300cafc-52bf-4bc8-bcf8-f4fd5f0b3f0d.png)

#### 2. GIAO THỨC SIP (Giao thức Khởi tạo Phiên)
Trước đây khi đề cập đến VoIP, tiêu chuẩn quốc tế thường đề cập đến là H.323. Nhưng những năm gần đây thì giao thức SIP lại chiếm ưu thế và dần sẽ thay thế hẳn H.323, vì VoIP là một trong những dịch vụ sẽ rất phát triển trong tương lai.

Bây giờ chúng ta sẽ đi tìm hiểu cụ thể về giao thức này:
##### 2.1. Giới thiệu
**SIP** (Session Initiation Protocol) là giao thức báo hiệu điều khiển lớp ứng dụng được dùng để thiết lập, duy trì, kết thúc các phiên truyền thông đa phương tiện (multimedia). Các phiên multimedia bao gồm thoại Internet, hội nghị và các ứng dụng tương tự có liên quan đến các phương tiện truyền đạt (media) như âm thanh, hình ảnh và dữ liệu.

**SIP** sử dụng các bản tin mời (INVITE) để thiết lập các phiên và mang các thông tin mô tả mang phiên truyền dẫn. SIP hỗ trợ các phiên đơn bá (unicast) và quảng bá (mutilcast) tương ứng các cuộc gọi điểm tới điểm và các cuộc gọi đa điểm.

**SIP** là một giao thức dạng văn bản, rất công khai và linh hoạt. Được thiết kế tương thích tương thích với các giao thức khác như TCP, UDP, IP,…. để cung cấp một lĩnh vực rộng hơn cho dịch vụ VoIP.
##### 2.2. Các thành phần trong SIP
SIP gồm hai thành phần lớn là SIP client (là thiết bị hỗ trợ giao thức SIP) và
SIP server (là thiết bị trong mạng xử lý các bản tin SIP). Trong SIP có 5 thành phần quan trọng là:
* User Agents (UA): là các đầu cuối trong mạng SIP, nó đại diện cho
phía người sử dụng để khởi tạo một yêu cầu tới SIP server hoặc User
Agent server.
* Proxy server: làm nhiệm vụ chuyển tiếp các SIP request tới các nơi
khác trong mạng. Chức năng chính của nó là định tuyến cho các bản
tin đến đích. 
![](https://images.viblo.asia/b5b427c7-ceef-4801-8eeb-ba5fe1534f22.png)
* Redirect server: là user agent server nhận các bản tin request từ các
user agent client và trả về bản tin return để thông báo thiết bị là
chuyển hướng bản tin tới địa chỉ khác – tự liên lạc thông qua địa chỉ
trả về.
![](https://images.viblo.asia/1a99b0f3-bf17-44eb-8892-2e4d242a9e55.png)
* Registrar server: là server nhận bản tin SIP Register yêu cầu cập nhật
thông tin mà user agent cung cấp từ bản tin Register.
* Location Server: lưu lượng thông tin, trạng thái hiện tại của người
dùng trong mạng SIP.

##### 2.3. Các bản tin trong SIP
* INVITE: bắt đầu thiết lập cuộc gọi bằng cách gửi bản tin mời đầu
cuối khác tham gia
* ACK: bản tin này khẳng định máy trạm đã nhận được các bản tin trả
lời bản tin INVITE
* BYE: bắt đầu kết thúc cuội gọi
* CANCEL: hủy yêu cầu nằm trong hàng đợi
* REGISTER: thiết bị đầu cuối của SIP sử dụng bản tin này để đăng
ký với máy chủ đăng ký
* OPTION: sử dụng để xác định năng lực của máy chủ
* INFO: sử dụng để tải các thông tin như âm báo
* REQUEST: cho phép user agent và proxy có thể xác định người
dùng, khởi tạo, sữa đổi, hủy một phiên.
* RETURN: được gửi bởi user agent server hoặc SIP server để trả lời
cho một bản tin request trước đó. 
##### 2.4. Phương thức hoạt động
* Hoạt động của máy chủ ủy quyền (Proxy Server)
![](https://images.viblo.asia/c76c8976-169a-4780-935c-9484f8272a68.png)
Hoạt động của Proxy server được trình bày như trong hình: SIP Client
userA@yahoo.com gửi bản tin INVITE cho userB@hotmail.com để mời
tham gia cuộc gọi.
* Hoạt động của máy chủ chuyển đổi địa chỉ (Redirect Server).
![](https://images.viblo.asia/105cd9b1-25f6-4fa1-96aa-6571768ca4f0.png)
##### 2.5. Tính năng của SIP
* Thiết lập một phiên: SIP sử dụng bản tin INVITE để yêu cầu thiết
lập một phiên truyền thông.
* Đơn giản và có khả năng mở rộng: SIP có rất ít bản tin, không có
chức năng thừa nhưng SIP có thể sử dụng để thiết lập nhưng phiên
kết nối phức tạp như hội nghị… Các phần mềm của máy chủ ủy
quyền, máy chủ đăng ký, máy chủ chuyển đổi địa chỉ,…có thể chạy
trên các máy chủ khác nhau và việc cài đặt thêm máy chủ hoàn toàn
không ảnh hưởng đến máy chũ đã có.
* Hỗ trợ tối đa sự di động của đầu cuối: do máy chủ ủy quyền, máy
chủ đăng ký và máy chủ chuyển đổi địa chỉ hệ thống luôn nắm được
địa điểm chính xác của thuê bao. Ví dụ thuê bao với địa chỉ
ptit@vnpt.com.vn có thể nhận được cuộc gọi thoại hay thông điệp ở
bất cứ địa điểm nào qua bất cứ đầu cuối nào như máy tính để bàn,
máy xách tay, điện thoại SIP… Với SIP rất nhiều dịch vụ di động
mới được hỗ trợ.
* Định vị người sử dụng: những người sử dụng đầu cuối sẽ luôn di
động và địa chỉ IP của họ là không cố định, các đầu cuối có thể đăng
ký với một SIP server thông qua bản tin REGISTER, SIP server sẽ
lưu lại địa chỉ IP của đầu cuối đăng ký. Khi có một yêu cầu thiết lập
cuộc gọi tới SIP server, SIP server sẽ tìm địa chỉ của người được gọi
và forward bản tin INVITE tới người được gọi.
##### 2.6. Các giao thức của SIP
* UDP (User Datagram Protocol): là giao thức tầng vận chuyển không
có điều khiển tắc nghẽn. Nó được dùng để vận chuyển bản tin SIP vì
đơn giản và thích hợp với các ứng dụng thời gian thực.
* TCP (Transmission Control Protocol): là giao thức ở tầng vận
chuyển do có điều khiển tắc nghẽn, hơn nữa có thể vận chuyển nhiều
gói tin có kích thước bất kỳ.
* SDP (Session Description Protocol): được sử dụng để mô tả các
thông số media cho một cuộc gọi, các thông số này là các thông tin
về băng thông, các chuẩn hóa audio, video và một số thông tin khác.

> Trên đây mình vừa giới thiệu sơ qua cho các bạn VOIP là gì, ưu điểm và nhược điểm của VoIP. Cùng với đó mình cũng giới thiệu hai chuẩn giao thức dành cho VoIP đó chính là H.323 và SIP -  từ viết tắt của Session Initiation Protocol (Giao thức Khởi tạo Phiên). Mong rằng bài viết sẽ giúp các bạn dễ dàng hơn trong việc tìm hiểu về công nghệ VoIP.


Bài viết có tham khảo và sử dụng tài nguyên từ các nguồn:

https://vi.wikipedia.org/wiki/VoIP/

https://www.3cx.vn/voip-sip-webrtc/pbx-phone-system/

http://dulieu.tailieuhoctap.vn/books/cong-nghe-thong-tin/an-ninh-bao-mat/file_goc_779361.pdf