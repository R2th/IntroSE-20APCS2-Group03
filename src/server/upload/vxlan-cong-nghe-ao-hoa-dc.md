Trong bài viết trước về CDN [Tản mạn CDN và một số công nghệ xoay quanh CDN](https://viblo.asia/p/tan-man-cdn-va-mot-so-cong-nghe-xoay-quanh-cdn-V3m5WWq75O7), tôi có đề cập đến `VxLAN` và mô hình `Leaf-Spine`.

Tôi thử tìm thì cũng chưa có bài tiếng Việt nào `deep deep` về chủ đề `VxLAN` nên tôi phịch luôn 1 bài về chủ đề này cho thông suốt luôn.

Nào bắt đầu nhé!

## VxLAN là gì?
`VLAN` thì chắc ai cũng biết rồi, chức năng của VLAN là `segmentation` và hiểu một cách đơn giản hơn nữa là mỗi frame nó dán thêm 1 cái nhãn (VLAN ID) vào để phân tách lưu lượng.

Vậy `VxLAN` có cái gì hay hơn nhỉ? Trước tiên thì xuất phát từ cái tên gọi trước nhé!

`VxLAN` - Virtual Extensible LAN, cái tên nói lên đặc điểm quan trọng nhất của `VxLAN` chính là mở rộng `VLAN`. Tuy nhiên, để đạt được mục đích mở rộng `VLAN` thì đằng sau nó là một bầu trời công nghệ mới (chi tiết sẽ ở phần dưới).

Vậy `VxLAN` ra đời với mục đích gì? 

Với xu thế phát triển mạnh mẽ của Cloud Computing, hạ tầng Data Center (DC) với `VLAN` gặp nhiều vấn đề bất cập bao gồm:
- Số lượng `VLAN` hạn chế (~4096 VLAN ID)
- Hạ tầng ảo hóa với số lượng VM (Virtual Machine) cực lớn, điều này yêu cầu số lượng `MAC entry` cũng cực lớn trên switch --> điều này khá khó khăn đối với hạ tầng switch truyền thống.
- Với hạ tầng `overlay` phức tạp và số lượng lớn VM thì lưu lượng mạng cũng cực lớn --> Với `VLAN` và `STP` (Spanning Tree Protocol) thì độ trễ là khá lớn. Điều này sẽ làm ảnh hưởng cực lớn đến hiệu năng của Cloud và một số nền tảng sẽ phát triển cùng Cloud trong tương lai (VD: IoT...)
- Sự linh hoạt của Cloud Platform yêu cầu một hạ tầng linh hoạt hơn để đáp ứng một số tính năng đặc trưng của Cloud và cũng là bước đệm để xây dựng phần mềm quản lý, tự động hóa các quy trình liên quan đến `Network` (VD: Live Migration...)

## Một số công nghệ tương tự như VxLAN
`VxLAN` là một trong những công nghệ ảo hóa DC được đề cập nhiều nhất hiện nay, tuy nhiên bên cạnh đó cũng có một số công nghệ tương tự như `VxLAN`. Vì một số lý do mà chúng ít được sử dụng hoặc sử dụng cho một số công nghệ đặc thù hơn.

Tôi sẽ không nêu ra lý do vì sao chúng ít được sử dụng, bạn đọc có thể tự tìm hiểu thêm nhé!
- NVGRE (Network Virtualization Using Generic Routing Encapsulation), các bạn có thể tham khảo tại đây [NVGRE](https://datatracker.ietf.org/doc/rfc7637/)
- STT (Stateless Transport Tunneling Protocol), các bạn có thể tham khảo tại đây [STT](https://datatracker.ietf.org/doc/draft-davie-stt/?include_text=1)

## Ưu điểm VxLAN
Vậy giờ cùng điểm qua một số ưu điểm của `VxLAN`, sau đó chúng ta sẽ đi từng phần một để xem `VxLAN` đã làm gì để đạt được ưu điểm đó nhé!
- Mở rộng khả năng phân chia mạng, theo đó `VxLAN` sử dụng 24bit cho `VxLAN ID` (với `VLAN` là 12 bit) --> Chúng ta có hơn 16 triệu `VxLAN ID`.
- Giảm độ trễ truyền tải gói tin trong miền `VxLAN`.
- Không sử dụng `STP` và cho phép `enable` ECMP (Equal-Cost MultiPath) --> Cho phép truyền tải gói tin trên nhiều `path`.
- Tăng tính linh hoạt cho mạng lưới đáp ứng cho sự linh hoạt của Cloud Platform.
- Mở ra khả năng tích hợp SDN (Software Defined Network) --> Cho phép xây dựng hạ tầng mạng ảo hóa linh hoạt nhất.

## Một số thuật ngữ
Bài viết đậm chất `network` nên sẽ có một số thuật ngữ sau:
- VNI (VxLAN Network Identifier) --> Tương tự như VLAN ID.
- VTEP (Virtual Tunnel EndPoint)
- EVPN (Ethernet Virtual Private Network)
- MP-BGP (MultiProtocol – Border Gateway Protocol)
- MPLS (MultiProtocol Label Switching)
- VRF (Virtual Routing Forwarding)

## Cấu trúc gói tin VxLAN
Đầu tiên, chúng ta lướt qua cấu trúc gói tin `VxLAN` xem nó có gì đặc biệt nhé!

<p align="center">
<img src="https://www.juniper.net/documentation/images/g043104.gif">
<br>
<em>VxLAN Packet Format (Source: Juniper)</em>
</p>

Trên đây là định dạng gói tin VxLAN, từ đây có thể thấy `VxLAN` gán thêm `VxLAN Header` và `UDP Header` vào gói tin. OK, giờ xem trong header có gì và mục đích là gì nhé!

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/105944573-29f1b780-6096-11eb-9905-752220f22f4b.png">
<br>
<em>VxLAN Deep Packet Format (Source: Không nhớ)</em>
</p>

Ở đây có 2 thứ đáng chú ý: (mấy cái VxLAN ID các thứ thì thôi khỏi trình bày nhé, VLAN nó cũng thế mà =)))
- Cái đầu tiên là `UDP Header`, cái này sẽ giúp tăng tốc độ truyền gói tin (UDP nhanh hơn TCP thì ai cũng biết rồi nhỉ....)
- Cái thứ hai là `SourcePort` `VxLAN Port` trong `UDP Header` --> Áp dụng thuật toán hash để chọn đường đi dựa vào cái này (**WOOOO NGHE QUEN THẶC.....**) --> Đây chính là ECMP (Equal-Cost MultiPath)

*Các bạn có thể xem thêm pcap của VxLAN tại* [chỗ này](https://www.cloudshark.org/captures/670aeb7bad79).

Giải thích `deep deep` hơn tí:
- Theo chuẩn IETF thì `VxLAN Port` mặc định sẽ là 4789.
- Ông Cisco thì đưa ra `VxLAN Port` cho giải pháp SDN ACI là 48879 (Cái này chỉ khi nào dùng ACI mới dùng port này còn chạy standalone thì vẫn là 4789)
- Về việc sử dụng hash để chọn đường đi đã sử dụng nhiều:
    - Trong `PortChannel` (gọi cho nó thân thiện dễ nhớ chứ thực ra tên công nghệ này là `Link Aggregation`) có thể hash theo các trường `SrcMac` `Src-Dst-Mac` `Src-IP` `Src-Dst-IP` để chọn link vật lý (Link Aggregation bạn đọc nào chưa biết thì tự tìm hiểu thêm nhé)
    - Trong `Bonding` thì bạn có thể thêm `xmit_hash_policy=layer3+4` trong file cấu hình để định nghĩa hash mode.
    - Trong `Routing`, ta có thể load-balance gói tin theo `per-packet` dựa vào `routing-table` hoặc `per-destination` dựa vào `route-cache`.

--> Và cuối cùng cái quan trọng nhất, `VxLAN` hash `SourcePort` trong `UDP Header` để chọn đường đi cho gói tin.

Điều này mang lại lợi ích gì?

Như ta biết thì trong mạng lưới, `routing` ở `Layer 3` sẽ chọn `best path` để truyền tải gói tin --> Có nghĩa là gói tin `per-flow` chỉ đi theo 1 đường duy nhất, điều này sẽ gây ra `bottleneck` và cần thời gian để tìm đường đi mới nếu đường đi cũ bị `down`.

Vậy ta có thể hiểu ECMP sẽ `bundle` nhiều link ở Layer 3 cho phép `load-balance` trên tất cả các link. Link ở đây có thể hiểu là 1 kết nối vật lý hoặc `link aggregation` nhóe =))

**Kết luận:** Với `UDP Header`, `VxLAN` cải thiện đáng kể độ trễ của gói tin dựa vào đặc tính của UDP và `enable` ECMP cho phép cải thiện hiệu năng truyền tải gói tin ở Layer 3.

## Mô hình mạng cho VxLAN
Với công nghệ mạng mới như `VxLAN` thì mô hình mạng truyền thống không thể đáp ứng được yêu cầu về sự linh hoạt, khả năng mở rộng theo hàng ngang.

Và mô hình mạng mới ra đời là điều tất yếu, tên gọi của nó là `Clos Model` và tên quen thuộc là `Leaf-Spine`.

Thực ra gọi là mới thì cũng không đúng vì thực chất `Clos Model` được Charles Clos đề xuất từ năm 1952, tuy nhiên thời đó mạng mẽo còn chưa ra cái thể thống cống rãnh gì nên người ta chưa thể thẩm thấu hết được tinh túy của nó (chém gió đấy =))). Đến khi `VxLAN` ra đời kèm thêm sự phình to của mạng lưới thì người ta mới nhận thấy những tinh túy này.

<p align="center">
<img src="https://img-en.fs.com/community/wp-content/uploads/2016/03/spine-leaf-vs-3-tier-1024x378.png">
<br>
<em>Leaf-Spine and Traditional (Source: community.fs.com)</em>
</p>

Lợi ích mà `Leaf-Spine` đem lại gồm:
- Khả năng mở rộng theo hàng ngang.
- `Multiple Path per Destination` cho phép áp dụng ECMP một cách hiệu quả.

Với mô hình triển khai thực tế thì không chỉ có LEAF và SPINE mà còn có thêm thành phần Border Gateway (BGW) chính là thành phần CORE như ở hình dưới.

<p align="center">
<img src="https://cdn.ttgtmedia.com/rms/dataCenter-Virtualization/sDC-CoreSpineLeaf-112513.png">
<br>
<em>LEAF-SPINE-BGW (Source: searchdatacenter.techtarget.com)</em>
</p>

Nhiệm vụ của BGW là giao tiếp với các phân vùng mạng khác.

OK, vậy từ đây ta có thể mường tượng ra `VxLAN Zone` bao gồm LEAF-SPINE-BGW.

## Cách thức triển khai VxLAN
Khi đề cập đến `VxLAN` người ta sẽ nhắc đến `overlay` và `underlay`.

`underlay` chính là hạ tầng `Leaf-Spine` tôi đã trình bày ở trên.

Vậy còn `overlay` là cái gì?  `overlay` chính là phần ảo hóa DC tôi muốn nói đến. Cùng nhìn qua topo đơn giản của nó nhé!

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/106016512-1ecc7500-60f2-11eb-91b9-1df4e0cdc866.png">
<br>
<em>VxLAN Overlay Simple Topo</em>
</p>

Mapping theo hình ta có:
- VTEP sẽ đặt trên tất cả các node LEAF, VTEP có nhiệm vụ `encapsulation and decapsulation` gói tin VxLAN. Nói 1 cách thô bỉ là nó convert gói tin thường thành gói tin VxLAN và ngược lại.
- Phần tử `P` ở trung tâm chính là SPINE, SPINE chỉ có mỗi một nhiệm vụ là điểm trung chuyển gói tin. Người ta ký hiệu là `P` bởi vì VxLAN vận dụng một phần công nghệ MPLS trong đó gồm các thành phần CE (Customer Edge), PE (Provider Edge), P (Provider) và thực chất ta có thể xem `VxLAN Zone` là một vùng MPLS.

Trên hình ta còn thấy `VxLAN Tunnel` nghĩa là giữa các LEAF sẽ tạo các tunnel với type là VxLAN ở mode point-to-point, trên thực tế khi gói tin đi trong `VxLAN Tunnel` nghĩa là nó vẫn đi theo thứ tự VTEP1-P-VTEP2.

Vậy ta có một số mô hình triển khai sau:
- Manual VxLAN: Cái kiểu triển khai này thì đủ chết vì chúng ta phải cấu hình từng cái `VxLAN Tunnel`, chỉ cần mô hình dùng vài chục con LEAF là cấu hình thấy bà cố nội luôn =))
- OVSDB-VxLAN: Loại này thì bắt buộc phải nhét thằng SDN Controller vào để quản lý (SDN tôi không đề cập ỏ bài này).
- EVPN-VxLAN: Đây chính là loại mà người ta thường sử dụng rất nhiều.

Điểm qua về cái EVPN này tí nào!

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/106018525-30168100-60f4-11eb-8757-738832841083.png">
<br>
<em>EVPN (Nguồn: tự chế)</em>
</p>

Nhìn vào cái hình là ta có thể thấy EVPN chính là công nghệ lõi cho VxLAN rồi đấy nhỉ! Điểm qua một số chức năng của nó:
- Sử dụng BGP tìm kiếm các LEAF hàng xóm --> Tự động tạo `VxLAN Tunnel`
- Sử dụng BGP để tự động học route, quảng bá route.

--> EVPN sẽ quản lý cả `Control Plane` và `Data Plane` dựa vào BGP.

## Flow VxLAN
Tiếp theo, chúng ta cùng điểm qua flow của VxLAN tí xem nó như nào nhé!

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/106016135-bbdade00-60f1-11eb-87c2-dd83ab1c04de.png">
<br>
<em>VxLAN Flow</em>
</p>

Nhìn vào hình dễ hiểu thặc =))

VSI các bạn có thể hiểu nó chính là Gateway của của từng VxLAN nhé! Mà kỳ lạ nhể, thế quái nào VSI trên 2 con GW1 và GW2 lại giống nhau.

Đó chính là `Anycast Gateway`, nghĩa là GW đặt ngay trên node LEAF và tất cả server bên dưới LEAF sẽ trao đổi với GW này.

Từ đây ta có thể hình dung một cách siêu hình là **CẢ CÁI VXLAN ZONE CHỈ LÀ 1 CON SWITCH TO BỰ KẾT NỐI TOÀN BỘ DC, CHỈ CÓ 1 GW CHO MỖI VXLAN --> VÀ ẢO HÓA DC CHÍNH LÀ ĐÂY...**

## Multi-DC và Multi-Cloud
Như phần trên ta hình dung cả DC chỉ là 1 con switch không hơn không kém, vậy giờ kết nối nhiều con switch với nhau thì sao.

Nếu kết nối nhiều con switch với nhau nghĩa là ta đang kết nối nhiều DC với nhau và 1 VxLAN được trải dài trên nhiều DC đó `Amazing... Good job VxLAN` =))

<p align="center">
<img src="https://user-images.githubusercontent.com/44463004/106020256-255ceb80-60f6-11eb-9e2d-768f9d3a5802.png">
<br>
<em>Multi-DC (Source: HP)</em>
</p>

Nào cùng nhìn vào cái hình, ta thấy 2 con server ở 2 DC khác nhau nhưng lại cùng VxLAN và khi giao tiếp với nhau chúng giao tiếp như một miền Layer 2 với độ trễ như Layer 2.

Nghe tuyệt vời ha, đi từ DC này sang DC khác mà độ trễ xấp xỉ Layer2 luôn =)) Có thật đấy =))

Đó cũng là một tính năng tuyệt vời mà VxLAN đem lại.

Ở đây có một điểm đáng chú ý đó là `VxLAN DCI Tunnel` (DCI - DC Interconnect) cũng được `EVPN` tự động thiết lập, tuy nhiên cần thêm một bước `enable DCI` trên interface kết nối liên tổng trạm. Nghĩa là chúng ta phải chỉ cho con thiết bị Router biết là interface nào kết nối đi liên tổng trạm (thường thì liên tổng trạm phải sử dụng EBGP - External BGP, trong khi đó EVPN mặc định chỉ tự động tìm kiếm `neighbor` và tạo `VxLAN Tunnel` cho IBGP - Internal BGP).

Nào giờ các Cloud Operator hãy thử tưởng tượng, nếu 2 con server kia là 2 con `Compute` và chứa 2 con VM trên đó. Giờ chúng ta cần `Live Migration` giữa 2 con `Compute` này thì sao nhỉ? --> **Hoàn toàn khả thi** =))

Đây chính là tính linh hoạt mà VxLAN có thể cung cấp cho Cloud Platform.

Và với việc có thể xây dựng Cloud tại nhiều DC chúng ta cũng có thể xây dựng Multi-Cloud với sự kết nối giữa các cụm Cloud với nhau.

**KẾT BÀI:** Phát triển theo xu thế Cloud, VxLAN là một công nghệ mạng hay ho và là xu hướng phát triển tiếp theo cho mục tiêu ảo hóa DC. Còn 1 điều nữa tôi vẫn chưa đề cập đến chính là việc tích hợp SDN, tôi sẽ không nói tiếp phần này thì SDN là một biển trời công nghệ nữa. Bạn nào có hứng thú thì có thể tìm hiểu tiếp nhé! Với sự hiểu biết nông cạn của mình thì mình sẽ không nói tiếp về SDN đâu =))

Chắc chắn bài viết sẽ có rất nhiều sạn, bạn đọc vui lòng góp ý cho tôi nếu có sai sót nhé! **TRÂN TRỌNG CẢM ƠN**