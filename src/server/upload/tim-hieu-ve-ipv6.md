# 1) Những hạn chế của IPv4 và sự ra đời của IPv6:
Giao thức tầng mạng trong bộ giao thức TCP/IP hiện tại đang là IPv4 (Internetworking protocol verision 4). IPv4 được thiết kế khá tốt và đã tiến triển từ lúc khởi đầu vào những năm 1970 cho đến nay. Tuy nhiên, IPv4 có những nhược điểm khiến cho nó không đồng bộ với sự phát triển nhanh của Internet, gồm những vấn đề sau:
+ IPv4 có 2 level cấu trúc địa chỉ (netid và hostid) phân nhóm vào 5 lớp (A, B, C, D và E). Sự sử dụng những ô địa chỉ là không hiệu quả. Ví dụ như khi có một tổ chức được cấp cho 1 địa chỉ lớp A, 16 triệu địa chỉ từ ô địa chỉ được phân phối duy nhất cho tổ chức sử dụng. Nếu 1 tổ chức được cấp cho 1 địa chỉ lớp C, mặt khác chỉ có 256 địa chỉ được phân phối cho tổ chức đó. Cũng vậy, nhiều triệu địa chỉ bị lãng phí trong nhóm D và E. Phương thức phân địa chỉ này đã dùng hết những ô địa chỉ của IPv4, và mau  chóng  sẽ không còn địa chỉ nào còn khả dụng để cấp cho bất kỳ một hệ thống mới nào muốn kết nối vào Internet. Mặc dù sách lược subnet và supernet đã giảm bớt những vấn đề về địa chỉ, nhưng subnet và suprnet đã làm cho đường truyền trở lên khó khăn hơn.
+ Internet  phải thích nghi được với sự chuyển giao audio và video thời gian thực. Loại chuyển giao này yêu cầu những sách lược trì hoãn ít nhất và sự đặt trước của tài nguyên không được cung cấp trong thiết kế.
+ Internet phải thích nghi được với sự mã hoá và sự chứng nhận của dữ liệu cho một số ứng dụng. Không một sự mã hoá và sự chứng nhận nào được cung cấp trong IPv4.
Để khắc phục thiếu sót trên IPv6 được biết đến như là IPng (Internet working Protocol, next generation), được đề xướng và nay là một chuẩn.
# 2) Kiến trúc của IPv6:
- IPv6 sử dụng 128 bit địa chỉ trong khi IPv4 chỉ sử dụng 32 bit; nghĩa là IPv6 có tới 2^128 địa chỉ khác nhau. Đây là một con số rất lớn. Các nhà nghiên cứu chỉ ra rằng chúng ta sẽ không bao giờ sử dụng hết địa chỉ IPv6.

  ![](https://images.viblo.asia/e26cb74f-758d-4311-a351-ffe00558e925.jpg)

- Chúng ta sẽ so sánh về header của IPv4 và IPv6:
![](https://images.viblo.asia/fa994998-6e95-4482-ae4c-6e14061a5533.jpg)

Ở hình trên chúng ta thấy cấu trúc header của IPv6 đã được rút gọn hơn so với IPv4. Cụ thể:
- Version: Chiều dài 4bit định nghĩa số phiên bản của IP. Với IPv6 giá trị là 6.
- Traffic Class: Gồm 8bit thực hiện chức năng tương tự trường Type of Service của IPv4. Trường này được sử dụng để biểu diễn mức độ ưu tiên của gói tin, mỗi điểm kết nối IPv6 có thể đánh dấu gói tin với từng loại dữ liệu, ví dụ gói tin nên được truyền với tốc độ nhanh hay thông thường.
- Flow Label: Đây là trường mới trên IPv6 với chiều dài 20bit. Trường này được sử dụng để chỉ định gói tin thuộc một dòng (Flow) nhất định giữa nguồn và đích, yêu cầu bộ định tuyến IPv6 phải có cách xử lý đặc biệt. Bằng cách sử dụng trường này, nơi gửi gói tin có thể xác định một chuỗi các gói tin, ví dụ gói tin của dịch vụ thoại VoIP thành một dòng và yêu cầu chất lượng cụ thể cho dòng đó. Khi một router xác định dòng lưu lượng lần đầu, nó sẽ nhớ dòng lưu lượng đó, cũng như các xử lý đặc biệt ứng với lưu lượng này, và khi các lưu lượng khác thuộc dòng này đến, nó sẽ xử lý nhanh hơn là xử lý từng packet.
- Payload Length: Chiều dài 16bit, tương tự như trường Total Length của IPv4, xác định tổng kích thước của gói tin IPv6 bao gồm cả phần mào đầu mở rộng (không chứa header).
- Next Header: Gồm 8 bít, thay thế trường Protocol. Trường này chỉ định đến mào đầu mở rộng đầu tiên của gói tin IPv6, đặt sau mào đầu cơ bản hoặc chỉ định tới thủ tục lớp trên như TCP, UDP, ICMPv6 khi trong gói tin IPv6 không có mào đầu mở rộng.
- Hop Limit: Gồm 8 bít, được sử dụng để giới hạn số hop mà packet đi qua, được sử dụng để tránh cho packet được định tuyến vòng vòng trong mạng. Trường này giống như trường TTL (Time-To-Live) của IPv4.
- Source Address: Gồm 128 bít, xác định địa chỉ nguồn của gói tin.
- Destination Address: Gồm 128 bít, xác định địa chỉ đích của gói tin.
# 3) Các quy tắc biểu diễn:

![](https://images.viblo.asia/b2c88166-592d-4182-817b-0ebaff1a02e0.jpg)

- Địa chỉ IPv6 có chiều dài 128bit, được ngăn thành 8 phần, mỗi phần có chiều dài 16bit và được ngăn bởi dấu ":".
- Như ta thấy địa chỉ IPv6 là rất dài, và khi có nhiều chữ số 0 trong địa chỉ, ta có thể rút gọn lại (như ở ví dụ trên).
- Ta có thể sử dụng ký hiệu "::" để chỉ một chuỗi các số 0 liên tiếp nhau. Tuy nhiên, ký hiệu "::" chỉ được sử dụng một lần trong một địa chỉ. Do địa chỉ IP có độ dài cố định, ta có thể tính được số các bit 0 mà ký hiệu đó biểu diễn. Ký hiệu này có thể áp dụng ở đầu hay cuối địa chỉ. Cách viết này đặc biệt có lợi khi biểu diễn các địa chỉ multicast, loopback hay các địa chỉ chưa chỉ định.
# 4) Các loại địa chỉ IPv6:
Có 3 loại địa chỉ IPv6:
- Unicast Address
- Multicast Address
- Anycast Address

## a) Unicast Address: 
Một địa chỉ unicast xác định duy nhất 1 interface của 1 node IPv6. Một gói tin có đích đến là 1 địa chỉ unicast thì gói tin đó sẽ được chuyển đến 1 interface duy nhất có địa chỉ đó. Có các loại địa chỉ sau thuộc Unicast:

**- Global Unicast Address:** Là địa chỉ IPv6 toàn cầu (tương tự như địa chỉ public của IPv4). Phạm vi định vị của GUA là toàn hệ thống IPv6 trên thế giới. 
   + 3 bit đầu luôn có giá trị là 001 (Prefix=2000::/3)
    + Global Routing Prefix: gồm 45 bit. Là địa chỉ được cung cấp cho công ty, cơ quan, tập đoàn hay một tổ chức nào đó khi đăng ký địa chỉ IPv6 public. 
    + Subnet ID: Gồm 16 bit, là địa chỉ do các tổ chức tự cấp. 
    + Interface ID: Gồm 54 bit, là địa chỉ của các interface trong subnet.
    ![](https://images.viblo.asia/2debf8e2-2bc1-4aee-8ec2-44875308bbdd.png)

**- Link-local Address:** Là địa chỉ được sử dụng cho những node trên 1 link duy nhất. Tự động cấu hình, tìm kiếm neighbor. Router không được chuyển tiếp gói tín có địa chỉ nguồn hoặc đích là link-local ra khỏi phạm vi liên kết. Bao gồm các địa chỉ dùng cho các host trong cùng 1 link và quy trình xác định các node (Neighbor Discovery Process), qua đó các node trong cùng link cũng có thể liên lạc với nhau. Phạm vi sử dụng của LLA là trong cùng 1 link (do đó có thể trùng nhau ở link khác). Khi dùng HĐH Windows, LLA được cấp tự động như sau:
    
   - 64 bit đầu có giá trị FE80 là giá trị cố định (Prefix=FE80::/64) 
    - Interface ID: gồm 64 bit kết hợp cùng địa chỉ MAC. Ví dụ: FE80::1CEF:01BC:FE01:1101
![](https://images.viblo.asia/7373f9cf-8345-47d4-a2c0-a9702717f8e5.png)

**- Site Local Address:** Được sử dụng trong hệ thống nội bộ (Intranet) tương tự các địa chỉ Private IPv4 (10.X.X.X, 172.16.X.X, 192.168.X.X). Phạm vi sử dụng Site-Local Addresses là trong cùng Site.
   
   - 1111 1110 11: 10 bit đầu là giá trị cố định (Prefix=FEC0/10) 
    - Subnet ID: gồm 54 bit dùng để xác định các subnet trong cùng site. 
    - Interface ID: Gồm 64 bit là địa chỉ của các interface trong subnet. Lưu ý: Hai dạng địa chỉ Unicast (LLA và SLA) vừa trình bày trên được gọi chung là các địa chỉ unicast nội bộ (Local Use Unicast Address). Với cấu trúc như thế thì các Local Use Unicast Address có thể bị trùng lặp (trong các Link khác hoặc Site khác). Do vậy khi sử dụng các Local Use Unicast Address có 1 thông số định vị được thêm vào là Additional Identifier gọi là Zone ID.
![](https://images.viblo.asia/6ef2c34b-1f9c-46ea-8fa7-ca250d9e14c1.gif)

**- Unique-Local Addresses:** Đối với các tổ chức có nhiều Site, Prefix của SLA có thể bị trùng lặp. Có thể thay thế SLA bằng ULA (RFC 4193), ULA là địa chỉ duy nhất của một Host trong hệ thống có nhiều Site với cấu trúc:
   - 1111 110: 7 bit đầu là giá trị cố định FC00/7. L=0: Local. → Prefix = FC00/8. 
    - Global ID: Địa chỉ site. Có thể gán thêm tuỳ ý. 
    - Subnet ID: Địa chỉ subnet trong site.
![](https://images.viblo.asia/6e0d6b4c-9ba7-4ff0-9f29-c1c8d45d3293.png)

## b) Multicast Address:
- Trong địa chỉ IPv6 không còn tồn tại khái niệm địa chỉ Broadcast. Mọi chức năng của địa chỉ Broadcast trong IPv4 được đảm nhiệm thay thế bởi địa chỉ IPv6 Multicast. 
- Địa chỉ Multicast giống địa chỉ Broadcast ở chỗ điểm đích của gói tin là một nhóm các máy trong một mạng, song không phải tất cả các máy. Trong khi Broadcast gửi trực tiếp tới mọi host trong một subnet thì Multicast chỉ gửi trực tiếp cho một nhóm xác định các host, các host này lại có thể thuộc các subnet khác nhau. 
- Host có thể lựa chọn có tham gia vào một nhóm Multicast cụ thể nào đó hay không (thường được thực hiện với thủ tục quản lý nhóm internet - Internet Group Management Protocol), trong khi đó với Broadcast, mọi host là thành viên của nhóm Broadcast bất kể nó có muốn hay không.
![](https://images.viblo.asia/09c19e7b-47de-43d7-9281-3f50f17a2b0b.jpg)
    - Multicast Address được định nghĩa với prefix là FF::/8.
    - Từ FF00:: đến FF0F:: là địa chỉ dành riêng được quy định bởi IANA để sử dụng cho mục đích Multicast.
    - Octet thứ hai chỉ ra flag và scope của địa chỉ multicast.
        - Flag xác định thời gian sống của địa chỉ. Có 2 giá trị của flag:
        >             Flag = 0: Địa chỉ multicast vĩnh viễn.
        >             Flag = 1: Địa chỉ multicast tạm thời.
        - Scope chỉ ra phạm vi hoạt động của địa chỉ. Có 7 giá trị của scope:
        >             Scope = 1: Interface-local.
        >             Scope = 2: Link-local.
        >             Scope = 3: Subnet-local.
        >             Scope = 4: Admin-local.
        >             Scope = 5: Site-local.
        >             Scope = 8: Organization.
        >             Scope = E: Link-local.
- Một số địa chỉ Multicast thường gặp:
    - FF02::1 -> All-nodes (link-local scope)
    - FF02::2 -> All-routers (link-local scope)
    - FF02::5 -> All SPF routers
    - FF02::6 -> All DR and BDR routers
    - FF02::9 -> All RIPng routers
    - FF02::A -> All EIGRP routers
    - FF02::1:2 -> All DHCP relay agents and servers
    - FF05::1:3 -> All DHCP servers (site-local scope)

## c) Anycast Address:
- Địa chỉ Anycast được gán cho một nhóm các giao diện (thông thường là những nodes khác nhau), và những gói tin có địa chỉ này sẽ được chuyển đổi giao diện gần nhất có địa chỉ này. Khái niệm gần nhất ở đây dựa vào khoảng cách gần nhất xác định qua giao thức định tuyến sử dụng. Thay vì gửi 1 gói tin đến 1 server nào đó, nó gửi gói tin đến địa chỉ chung mà sẽ được nhận ra bởi tất cả các loại server trong loại nào đó, và nó tin vào hệ thống định tuyến để đưa gói tin đến các server gần nhất này. 
- Trong giao thức IPv6, địa chỉ anycast không có cấu trúc đặc biệt. Các địa chỉ Anycast nằm trong một phần không gian của địa chỉ unicast. Do đó, về mặt cấu trúc địa chỉ Anycast không thể phân biệt với địa chỉ Unicast. Khi những địa chỉ Unicast được gán nhiều hơn cho một giao diện nó trở thành địa chỉ Anycast. Đối với những node được gán địa chỉ này phải được cấu hình với ý nghĩa của địa chỉ anycast. Trong cấu trúc của bất kỳ một địa chỉ anycast đều có một phần tiền tố P dài nhất để xác định phạm vi (vùng) mà địa chỉ anycast đó gán cho các giao diện. Theo cấu trúc này, tiền tố P cho phép thực hiện các qui tắc định tuyến đối với địa chỉ anycast như sau: 
    - Đối với phần phía trong của mạng (vùng): Các giao diện được gần các địa chỉ anycast phải khai báo trong bảng định tuyến trên router của hệ thống đó là những mục riêng biệt với nhau. 
    - Đối với giao tiếp bên ngoài mạng: khai báo trên router chỉ gồm một mục là phần tiền tố P (có thể hiểu phần tiền tố này định danh cho một subnet của mạng trong). Chú ý: Trong trường hợp phần tiền tố P của địa chỉ anycast là một tập các giá trị 0. Khi đó các giao diện được gán địa chỉ anycast này không nằm trong một vùng ("vùng" ở đây được hiểu là vùng logic). Do vậy phải khai báo trên các bảng định tuyến như đối với dạng địa chỉ Global Unicast (nghĩa là phải khai báo riêng rẽ từng giao diện). Qua cơ chế định tuyến đối với dạng địa chỉ Anycast mô tả ở trên ta thấy mục đích thiết kế của loại địa chỉ Anycast để hỗ trợ nhưng tổ chức mà cấu trúc mạng của nó được chia theo cấu trúc phân cấp. Trong đó địa chỉ anycast được gán cho các router - mà các router này được chia thành các vùng hay các "đoạn". Khi một gói tin đến router cấp cao nhất trong hệ thống nó sẽ được chuyển đến đồng thời các router trong một "đoạn”. 
    - Sử dụng địa chỉ anycast có những hạn chế như sau: 
        - Một địa chỉ anycast không được sử dụng làm địa chỉ nguồn của một gói tin IPv6. 
        - Một địa chỉ anycast không được phép gán cho một host IPv6 do vậy nó chỉ được gán cho một router IPv6. Có một loại địa chỉ anycast đặc biệt được sử dụng để định danh cho một subnet. Cấu trúc của loại địa chỉ này như sau:
![](https://images.viblo.asia/83c43f58-75ec-4788-bc93-f4dfaf7bef11.gif)

Phần subnet prefix trong cấu trúc địa chỉ này xác định một liên kết cụ thể. Tính chất của loại địa chỉ anycast giống với địa chỉ unicast link-local gán cho các giao diện trong đó phân định danh giao diện được đặt là 0. Loại địa chỉ này được sử dụng cho những node cần giao tiếp đồng thời với một tập các router trên mạng. Ví dụ người dùng di động có nhu cầu đồng thời cũng một lúc giao tiếp với các máy cố định và với các máy trong mạng di động.
## d) Địa chỉ IPv6 đặc biệt:
- 0:0:0:0:0:0:0:0: Được gọi là địa chỉ không xác định. Địa chỉ này không thật sự được gán cho một giao diện nào. Một host khi khởi tạo có thể sử dụng địa chỉ này như là địa chỉ nguồn của nó trước khi nó biết được địa chỉ thật của nó. Một địa chỉ không xác định không bao giờ có thể đóng vai trò là địa chỉ đích trong ghi tin IPv6 hay trong phần header của quá trình định tuyến.
- 0:0:0:0:0:0:0:1: Được gọi là địa chỉ loopback. Một nodes có thể sử dùng địa chỉ này để gửi một gói tin IPv6 cho chính nó. Địa chỉ loopback không bao giờ được sử dụng như địa chỉ nguồn của bất kỳ ghi tin IPv6 nào để gửi ra ngoài nodes. Một gói tin với địa chỉ loopback là địa chỉ đích sẽ không bao giờ có thể ra khỏi node đó.

Ở các bài viết sau, chúng ta sẽ đi sâu về các phương pháp triển khai IPv6 và triển khai IPv6 trên nền tảng IPv4 có sẵn.