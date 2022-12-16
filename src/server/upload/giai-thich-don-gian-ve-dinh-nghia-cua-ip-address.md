Dịch từ bài viết [IPアドレスとは？をわかりやすく解説します] , link bài viết gốc:  https://www.kagoya.jp/howto/network/ipaddress/ 

IP address được định nghĩa là số hiệu mà một thiết bị kết nối với internet sở hữu. IP address được sử dụng nhằm đảm bảo không có sự nhầm lẫn đối tượng giao tiếp trong quá trình trao đổi thông tin trên network. IP address được phân thành nhiều loại và có những quy tắc riêng mà tôi xin được trình bày rõ hơn tiếp sau đây.

![](https://images.viblo.asia/96f21bcb-d67d-49ee-9e77-934d8d0ac6ba.png)
# 1.Kiến thức cơ bản về IP address
IP address đảm đương nhiệm vụ như địa chỉ trên internet của Máy tính hay smartphone v.v, dùng để phân biệt các thiết bị này trên Network.

Tiếp theo đây, tôi sẽ giới thiệu IP address được cấu tạo từ những chữ số như thế nào và quy tắc của các con số ấy.
## 1.1Phần Netwwork và phần Host
IP address là 1 dãy các chữ số, hiện nay, phiên bản được sử dụng phổ biến nhất là IPv4. Trong phiên bản này, IP address được cấu tạo gồm 32 bit nhị phân, nhưng do cách viết này khá khó hiểu, mỗi 8 bit sẽ được biểu diễn dưới dạng số thập phân từ 0 đến 255 và ngăn cách nhau bởi dấu “.” (dot). 

Ví dụ về cách biểu diễn IP address dưới dạng thập phân:

10101100.00010000.11111110.00000001

Sẽ biểu diễn dưới dạng       

172 .    16  .    254  .   1

Cụ thể hơn, IP address được cầu thành bởi phần Network và phần Host như hình dưới đây. Ranh giới phân cách giữa bộ phận Network và Host sẽ khác nhau tùy thuộc vào IP Address.

![](https://images.viblo.asia/15c470a2-ce03-436d-b4a4-78bf668b2780.png)

Phần Network dùng để phân biệt IP address thuộc Network nào.

Phần Host dùng để chỉ IP address thuộc host nào (máy tính nào) trong Network đó.

## 1.2Class-full address
Ở trên, tôi đã trình bày ranh giới phân cách giữa bộ phận Network và Host sẽ khác nhau tùy thuộc vào IP address. Có 2 phương pháp để phân tách 2 bộ phận này, đó là Class-full address và Class-less address.

Trong Class-full address, class được chia thành 5 loại từ A đến E, tuy nhiên, thông thường, ta sử dụng các class từ A đến C. (Tham khảo hình bên dưới)

Trong Class-less address, chỉ cần nhìn vào bit hoặc chữ số thập phân đầu dãy là có thể phân biệt được class. Khi phân biệt được class, từ đó ta có thể biết được ranh giới giữa bộ phận network và host.

Ví dụ, với class A, bộ phận Network sẽ chiếm 8 bit, phần Host chiếm 24 bit. Như vậy, ta chỉ có tổng cộng 124 network nhưng mỗi network có thể kết nối được với khoảng 17 triệu host.

Trong class C, bộ phận Network sẽ chiếm 24 bit, phần Host là 8 bit. Số lượng Network có thể sử dụng lên tới 2.09 triệu network. Tuy nhiên, mỗi network chỉ có khả năng kết nối được 254 host.


| Class| Dãy bit đầu | Phạm vi address |Số lượng host khả dụng|
| Class A | 0 | 0.0.0.0. ~　127.255.255.255.|16777214|
| Class B | 10 | 128.0.0.0. ~　191.255.255.255.|65534|
| Class AC| 110 | 192.0.0.0. ~　223.255.255.255.|254|
## 1.3Class-less address
Cùng với việc đưa IP address vào sử dụng, người ta đã nhận ra sự lãng phí trong việc phân phối chúng. Hiện tại, số gọi là Sub-net mask đã trở nên phổ biến. 
Sub-net mask là số dùng để biểu diễn sự phân cách giữa 2 bộ phận network và host. 

Đối với class-less address, bằng việc thay đổi sub-net mask, 1 class có thể được chia thành nhiều segment để sử dụng address.

Nhờ vào sub-net mask, ranh giới giữa phần network và host trở nên linh động hơn, có thể được tự do quyết định.

Như những gì tôi đã nói, dưới mắt nhìn của chúng ta, IP address được biểu diễn dưới dạng số thập phân, tuy nhiên, thực tế, nó là 1 dãy số nhị phân.

Khi xem xét IP address và sub-net mask biểu diễn dưới dạng nhị phân, ta thấy:

- Phần được biểu diễn bằng các số 1 của sub-net mask => Phần Network của IP address.

- Phần được biểu diễn bằng các số 0 của sub-net mask => Phần Host của IP address.

# 2.Mối liên hệ với Domain
Nhờ vào IP address, việc truyền nhận tin giữa các host có thể được thực hiện. Tuy nhiên, IP address là 1 chuỗi gồm các chữ số đơn thuần nên sẽ rất khó nhớ và khó dùng.

Domain xuất hiện nhằm giải quyết vấn đề đó. Domain là tên được đặt sao cho người dùng dễ nhớ. 

Trường hợp Domain và IP address không được liên kết với nhau, sẽ phát sinh tình trạng link chết, mail không thể được truyền nhận v.v. Nói cách khác, IP address và domain cần được liên kết với nhau.

Việc liên kết giữa 2 thành phần này sẽ do server có tên DNS server đảm nhận. DNS còn có thể được gọi là Database phân tán.
## 2.1Phân loại IP address
Tiếp theo, tôi sẽ trình bày về phân loại IP address dựa theo mục đích sử dụng. Mục đích sử dụng của IP address gồm 2 loại như sau:

- Loại kết nối với Internet (Global IP address)

- Loại không kết nối với Internet (Private IP address)

Đặc trưng của mỗi loại được trình bày dưới đây.
###  Global IP address
Global IP address là IP address kết nối với Internet. Chi tiết hơn, Global IP address được chia thành IP address động và IP address tình (IP address cố định). Tiếp theo, tôi sẽ nói rõ hơn về 2 loại này.

**- IP address động:**
IP address biến động sẽ được phân loại là IP address động. Ví dụ thường gặp của loại IP address này là trường hợp kết nối với Internet Service Provider (ISP) tại mạng gia đình.

Khi kết nối với ISP lần đầu, bạn cũng không cần phải thực hiện thiết lập đặc biệt nào. Đó là bởi khi thiết bị nối với dây cáp LAN để kết nối Internet, ISP sẽ tự động cấp cho thiết bị global IP address.

Nói cách khác, ISP sẽ tự động tìm và nhận diện thiết bị. Bởi bậy, nếu sau 1 thời gian ngắt kết nối, thiết bị kết nối lại với Internet thì IP address thay đổi.

**- IP address tĩnh:**
Ngược lại với IP address động và IP address tĩnh. Đúng như ngữ nghĩa mặt chữ, IP address tĩnh là IP address không thay đổi. Bạn có hình dung IP address tĩnh được sử dụng trong trường hợp nào không? Trường hợp không mong muốn IP address thay đổi mỗi lần kết nối, IP address tĩnh sẽ được ứng dụng.

Ví dụ: Public server của Homepage, Mail server dùng để gửi và nhận mail

Những trường hợp này có liên quan đến DNS server mà tôi đã trình bày ở trên. DNS server là Data base kết nối với Domain name với IP address.

Nếu IP address của Mail server và Web server thường xuyên biến đổi, DNS server sẽ không thể thao tác được.

Tóm lại, để người dùng có thể access các server này bằng Domain name thì IP address tương ứng của các server phải cố định. Tuy nhiên, không phải toàn bộ các Web server và Mail server đều dùng IP address tĩnh. Bằng công nghệ, ta có thể giải quyết được vấn đề này.

### Private IP address:
Tiếp theo tôi sẽ nói về loại IP address không kết nối với Internet, còn gọi là Private IP address. 

Tôi sẽ lấy ví dụ minh họa là network sử dụng để kết nối các thiết bị gia đình, độc lập với Internet.

Cụ thể hơn, hãy tưởng tượng vùng ngoài của Broadband Rooter là Internet, còn vùng trong là network độc lập của hộ gia đình.

Khi ấy, IP address được cấp cho các máy tính trong Network nội bộ của gia đình là Private IP address.

Private IP address không thể trực tiếp giao tiếp với Global IP address.

Khi ấy, ta cần có 1 chức năng gọi là NAT (Network Address Translation) của Broad band Rooter. Chức năng này làm nhiệm vụ chuyển Private IP address thành Global IP address. 

Trường hợp máy khách của LAN nội bộ công ty kết nối với Internet, cũng cần phải chuyển đổi Private IP address thành Global IP address.

# 3.Làm thế nào để xác minh IP address của bản thân?
## 3.1Global IP address:
Bạn có thể dễ dàng biết được Global Address của mình chỉ bằng việc vào trang Web sau: https://www.cman.jp/network/support/go_access.cgi
## 3.2Private IP address:
Tôi sẽ nói về cách xác minh IP address trong network gia đình, ví dụ với trường hợp bạn đang sử dụng máy tính Windows.

Thao tác sẽ được thực hiện trên Màn hình command prompt. Mở Command prompt bằng cách click Start -> Accessories-> Command prompt.

Nhập “ipconfig” vào màn hình command prompt, ấn Enter. Thông tin liên quan đến Network sẽ được hiển thị, hãy tìm vị trí chưa thông tin IPv4. Đây chính là Private IP address của máy tính đang sử dụng.

 (giản lược mục Các cơ quan, tổ chức quản lý IP address)
#  4.Tổng kết.
Các bạn thấy thế nào? Chắc hẳn bạn đã hiểu thêm về IP address và cảm thấy sự IP address là một thứ rất gần gũi với chúng ta đúng không nào. Bằng việc tĩnh lũy dần nhiều kỹ thuật, các dịch vụ cơ bản của Internet được tạo thành. Trong số đó, một trong những kỹ thuật quan trọng nhất chính là IP address. Mong rằng bài viết này giúp các bạn hiểu được vai trò, tác cụng của nhân tố quan trọng này.