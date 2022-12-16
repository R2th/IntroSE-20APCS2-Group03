# 1. Cơ sở hạ tầng toàn cầu của AWS
Mình đã viết về cơ sở hạ tầng ở bài viết khái quát về AWS, xin các bạn vui lòng xem tại đây: https://viblo.asia/p/khai-quat-cac-khai-niem-cua-aws-oOVlYnkn58W#_iv-co-so-ha-tang-toan-cau-cua-aws-12

-----

# 2. Cơ bản về VPC
VPC là viết tắt của **V**irtual **P**rivate **C**loud. Định nghĩa một cách đơn giản thì nó là một khu vực AWS cá nhân thuộc quyền kiếm soát của bạn. Ở đó bạn có thể đặt các resource AWS (các instance EC2, database...). Bạn có **toàn quyền** kiểm soát việc những ai có thể truy cập các resource AWS mà bạn đặt bên trong VPC của mình.
<br>

Khi bạn tạo một tài khoản AWS thì một VPC đã được mặc định tạo sẵn cho bạn. Hãy vào AWS console xem thử dashboard của VPC sẽ có những gì:

![](https://images.viblo.asia/e9071d65-dea3-47a9-9c32-31b6e36364f7.png)

Các bạn có thể thấy chúng ta sẽ có list VPC và các thành phần khác gắn liền với nó như là: Subnet, Route Table, Internet Gateway, Network ACL... tất cả những thành phần đều được tạo cùng với VPC mặc định của bạn. Ở bài viết khái quát về AWS, mình đã có một phép so sánh với các trang Facebook để mô tả một cách đơn giản về VPC: https://viblo.asia/p/khai-quat-cac-khai-niem-cua-aws-oOVlYnkn58W#_1-vpc-7.
<br>

Giờ thì mình sẽ mở rộng sự mô tả đó hơn qua một sự so sánh khác. Không rõ các bạn có biết điều này không nhưng nếu nhà bạn có internet thì cũng đồng nghĩa với việc bạn đang có một mạng lưới cá nhân. Hãy nhìn vào các thành phần thường có ở một hệ thống thiết bị mạng gia đình:
![](https://images.viblo.asia/fbba1368-2c2b-4dd3-a3e2-f389fe3fb161.png)

- **Dây kết nối** (từ bên ngoài nhà vào trong nhà bạn): được nhà cung cấp mạng cung cấp, nó cho phép mạng lưới thiết bị mạng nhà bạn có thể kết nối tới Internet.
- **Modem**: là cửa ngõ giúp các thiết bị của bạn có thể kết nối với Internet
- **Router**: được kết nối trực tiếp với Modem, router có thể là loại có dây hoặc không dây. Router cho phép các thiết bị trong mạng lưới nhà bạn (laptop, smartphone
 v.v...) có thể kết nối với nhau hoặc kết nối với Internet thông qua Modem.

 Giờ hãy xem xét tình huống nếu một trong các thiết bị trong mạng lưới nhà bạn gặp trục trặc thì sẽ xảy ra vấn đề gì?
 ![](https://images.viblo.asia/e7c3f8f5-b9e7-40c1-884f-f09da9156259.png)
 
 - Ví dụ 1: Giả sử modem nhà bạn bị hỏng, liệu bạn có thể tiếp tục truy cập Internet không? Rất tiếc là không, bởi vì Modem là cửa ngõ tới Internet. Tuy nhiên các thiết bị còn lại trong nhà bạn vẫn có thể giao tiếp với nhau do chúng có sự liên kết với nhau qua Router.
 - Ví dụ 2: Modem hoạt động bình thường nhưng router bị hỏng. Lúc này thì các thiết bị kết nối với router sẽ không thể giao tiếp được với nhau nữa. Nghĩa là laptop, điện thoại v.v.. của bạn sẽ không thể giao tiếp với nhau được nữa vì chúng đều kết nối với router, cũng như chúng không thể kết nối với modem vì modem cũng kết nối với chúng thông qua router, do đó chúng cũng không thể kết nối tới Internet.

Vậy là có thể thấy, mỗi thiết bị đều đóng vại trò quan trọng trong mạng lưới nhà bạn. Nếu một trong số chúng không hoạt động thì bạn sẽ không thể truy cập Internet.
<br>

Giờ thì hãy xem xem dữ liệu sẽ  di chuyển trong mạng lưới thiết bị mạng như thế nào:
![](https://images.viblo.asia/65725249-763c-4d3d-a555-fcf33931bb2a.png)

- **Firewall**: Khi chúng ta muốn laptop hay điện thoại của mình có thể kết nối với Internet thì đầu tiên cần phải đi qua một thiết bị gọi là Firewall. Firewall được thiết kế để cấp cho chúng ta một lớp bảo mật nhằm ngăn chặn các sự giao tiếp hay truy cập ngoài ý muốn tới laptop/điện thoại của chúng ta. Khi chúng ta muốn thiết bị của mình có thể truy cập vào một website nào đó, về cơ bản chúng ta cần phải cho phép Port 80 có thể truy cập được qua Firewall.
- **Router**: giao tiếp khi tới Router sẽ được router quyết định xem chúng sẽ được giữ ở trong các thiết bị trong network hay đi tiếp tới modem.
- **Modem**: tại đây giao tiếp sẽ được chuyển tới Internet. Và khi trang web chúng ta muốn truy cập nhận được yêu cầu giao tiếp thì nó sẽ trả về những thông tin mà chúng ta yêu cầu và modem sẽ chuyển chúng qua Router
- **Router**: thông tin tại đây sẽ được chuyển tiếp tới Firewall.
- **Firewall**: giao thông tại đây sẽ được quyết định được tiếp tục hay bị chặn lại dựa vào những rule của Firewall

Và giờ hãy xem sơ đồ đơn giản của một VPC với các thành phần có chức năng tương tự như mạng lưới thiết bị mạng ở nhà bạn và nó cũng sẽ có sự di chuyển của dữ liệu tương tự:
![](https://images.viblo.asia/ef343ff2-b748-48b5-8bab-4c7b9b3e585d.png)

- **Internet Gateway** tương ứng với **Modem**
- **Route Table** tương ứng với **Router**
- **Network Access Control List** tương ứng với **Firewall**
- **EC2 Instance** tương ứng với **laptop, điện thoại v.v...**

-----

# 3. Internet Gateways (IGW)
Như mình đã viết ở phần trước thì các bạn có thể hình dung Internet Gateways tương ứng với chiếc Modem ở nhà bạn. Ngoài ra thì cũng có thể định nghĩa nó một cách đơn giản như sau:
> Một sự kết hợp giữa phần cứng và phần mềm cung cấp cho mạng lưới cá nhân của bạn một **con đường** tới thế giới bên ngoài (tức là Internet) VPC.

> Notes:
> - VPC mặc định của bạn đã có sẵn một **IGW** được gắn kèm.
> - Mỗi VPC chỉ có thể có cũng lúc 1 IGW.
> - Bạn không thể gỡ IGW khỏi một VPC nếu như VPC đó đang có AWS resource hoạt động.

-----

# 4. Route Tables (RTs)
Một mình IGW sẽ không thể giúp chúng ta truy cập được Internet, chúng ta còn cần đến Route Table nữa.
<br>

Chúng ta có định nghĩa chính thức về Route Table của AWS rất đơn giản như sau:
> Một route table sẽ có một **bộ các quy tắc** được gọi là **các route**. Chúng được dùng để quyết định các truy cập mạng sẽ được điều hướng đến đâu.

Có thể so sánh route table với cảnh sát giao thông. Khi dữ liệu di chuyển bên trong VPC của bạn, route table sẽ quyết định dữ liệu đó sẽ chỉ di chuyển bên trong VPC hay sẽ được điều hướng tới IGW, cũng giống như việc cảnh sát giao thông điều hướng di chuyển giao thông trong thành phố vậy. Và cũng như chúng ta có thể có nhiều cảnh sát điều hướng các tuyến đường khác nhau, trong một VPC chúng ta có thể có nhiều route table.

Hãy thử quan sát một route table của VPC mặc định trên dashboard:
![](https://images.viblo.asia/04f057cf-a89e-401e-80a6-12253a0a9871.png)

Ở tab routes, chúng ta có thể thấy 2 route. Route đầu tiên hiển thị địa chỉ IP của VPC mặc định ở cột destination và giá trị ở cột target là "local", điều này thể hiện rằng nếu địa chỉ IP của nơi đến nằm trong khoảng IP đó thì giao tiếp sẽ được giữ ở bên trong VPC. Route thứ 2 giá trị ở cột destination là 0.0.0.0/0, điều này có nghĩa là mọi giao tiếp nếu có địa chỉ IP nơi đến không nằm trong khoảng được định nghĩa ở các route khác thì sẽ được điều hướng tới nơi đến mặc định trong route này, đó chính là IGW.
<br>

Có một điểm cần chú ý là nếu một IGW không được gắn vào VPC và route trỏ đến IGW này thì khi có giao tiếp thỏa mãn điều kiện, nó vẫn sẽ được điều hướng tới IGW đó thay vì IGW đang được gắn trên VPC. Tuy nhiên giao tiếp này sẽ không tới được Internet:

![](https://images.viblo.asia/c405b254-bb03-4730-ab01-2544b030290d.png)

Vậy là chúng ta có thể thấy được, nếu chỉ đơn giản gắn hay tháo một IGW khỏi VPC thì sẽ không đảm bảo được việc kết nốt hay ngắt kết nối với Internet. Chúng ta cần phải có route tables với các route phù hợp điều hướng các giao tiếp tới IGW cần thiết.

> Notes:
> - VPC mặc định của bạn đã có sẵn một **Route Table** được gắn kèm.
> - Bạn không thể xóa route tables nếu đang có các subnet gắn với nó.

-----

# 5. Network Access Control List (NACLs)
Định nghĩa chính thức về NACL của AWS cũng khá là ngắn gọn:
> Một Network Access Control List (NACL) là một **lớp bảo mật tùy chọn** cho VPC của bạn, nó hoạt động như một **firewall** kiểm soát các giao tiếp ra vào của một hoặc nhiều **subnet**.

Tạm thời các bạn hãy lờ đi subnet là gì, chúng ta sẽ tìm hiểu nó ở phần kế tiếp. Giờ hãy xem thử dashboard NACL sau:
![](https://images.viblo.asia/a5695fa5-c1d4-476d-8a77-85ab98ee12b7.png)

Chúng ta có thể thấy các tab về rultes gồm Inbound rules và Outbound rules. Các bạn cần chú ý thiết kế của NACL là stateless, thế nên chúng ta phải tự định nghĩa từng rule cho phép giao tiếp đi vào hoặc ra khỏi subnet thông qua NACL. Cụ thể hơn là nó có thể cho phép hoặc chặn các giao tiếp giữa các subnet với nhau hoặc giữa subnet với Internet.
![](https://images.viblo.asia/01cd1060-23d7-4a90-9958-bfb3f8183c8b.png)

Để có thể cho phép hoặc không cho phép các giao tiếp ra hoặc vào subnet, chúng ta cần tạo ra các rule. Inbound rules sẽ kiểm soát các giao tiếp tới một subnet và Outbound rules sẽ kiểm soát các giao tiếp từ trong subnet ra ngoài:
![](https://images.viblo.asia/955e00b2-e497-4595-b562-843f7644e175.png)

Trước tiên hãy xem thử tab Inbound rules của một NACL ví dụ:
![](https://images.viblo.asia/a5695fa5-c1d4-476d-8a77-85ab98ee12b7.png)

Đây là một NACL được tạo mặc định kèm theo VPC mặc định. Nhìn vào rule đầu tiên, chúng ta có thế thấy số của nó, mọi rule mà chúng ta tạo hoặc chỉnh sửa đều sẽ phải có một con số gắn với nó, rule này cho phép tất cả các giao tiếp được phép đi vào subnet qua NACL. Rule thứ 2 không có số mà có biểu tượng hoa thị, là rule mặc định, nó sẽ được xét đến sau khi tất cả các rule khác đã được xét, rule này không cho phép bất kì một giao tiếp nào được đi vào subnet qua NACL.
<br>

Các rule trong NACL sẽ được áp dụng dựa theo số của nó, rule nào cố số nhỏ hơn sẽ được xét áp dụng trước. Nếu một rule đã được áp dụng thì tất cả các rule trùng với nó nhưng có số lớn hơn sẽ bị bỏ qua.
<br>

Để rõ ràng hơn, mình sẽ ví dụ như sau, giả sử mình edit rule 100 và đổi Type của nó thành SSH (khi này giao thức và port sẽ tự động đổi theo tương ứng):
![](https://images.viblo.asia/b9e3a872-6511-46e1-8907-7cfdb712e61c.png)

Khi này thì rule 100 sẽ được áp dụng đầu tiên và mọi giao tiếp SSH vào trong subnet đều sẽ được cho phép. Tiếp đó rule * sẽ được áp dụng, mọi giao tiếp vào trong subnet đều sẽ bị từ chối trừ các giao tiếp SSH (do rule 100 được ưu tiên hơn).
<br>

Ví dụ tiếp, mình sẽ thêm một rule mới giống hệt rule 100 có số 90, tuy nhiên nó sẽ là rule Deny:
![](https://images.viblo.asia/0241d2c5-7769-43bd-b095-f8bac1963711.png)

Lúc này thì mọi giao tiếp SSH vào trong subnet cũng đều sẽ bị từ chối do rule 90 sẽ được ưu tiên hơn rule 100.
<br>

Outbound rules cũng tương tự như vậy.
<br>

> Notes:
> - VPC mặc định của bạn sẽ có một NACL mặc định đi kèm với nó. NACL mặc định này sẽ cho phép mọi giao tiếp ra vào trong các subnet mặc định.
> - Bất kì một NACL tạo mới nào đều mặc định từ chối mọi giao tiếp đi qua nó.
> - Một subnet chỉ có thể cùng lúc gắn với một NACL.

-----

# 6. Subnets
Một subnet (viết ngắn gọn của subnetwork), là một khu vực nhỏ trong một network. Khi bạn tạo ra một VPC, nó sẽ trải dài toàn bộ các Availability Zone trong region. Sau khi tạo VPC, **bạn có thể thêm một hoặc nhiều subnet trong mỗi Availability Zone**. Mỗi subnet chỉ có thể **nằm hoàn toàn** bên trong một Availability Zone.
<br>

Hãy nhìn vào sơ đồ sau:
![](https://images.viblo.asia/8cf3cfc1-93a5-4d63-86d8-18e24b599e61.png)

Subnet chính là nơi mà chúng ta cấp các resource như instance EC2 hoặc RDS database. Ta cũng có thể thấy các Availability Zone được biểu thị bằng các nét đứt màu đò bao trọn vẹn lấy các subnet.
<br>

Để ý thì chúng ta có thể thấy các subnet có cái là private có cái là public. Vậy ý nghĩa của chúng là gì? Hãy xem hình sau:
![](https://images.viblo.asia/586d42ce-c8d6-4780-8657-f38aab952f4a.png)

Một subnet gọi là public khi nó có route tới Internet (minh họa bằng đường màu xanh). Private subnet thì không có route tới Internet hay nói rõ ràng hơn thì nó sẽ được gắn với một route table không có route tới IGW, tuy nhiên chúng vẫn có thể giao tiếp với các subnet khác (minh họa bằng đường màu đỏ).
<br>

Bất cứ resource AWS nào mà bạn muốn chạy (EC2, RDS v.v...) phải được đặt trong một subnet của VPC. Subnet đó phải nằm trong một Availability Zone. Bạn có thể (và nên) tận dụng nhiều Availability Zone để tạo ra nhiều bản sao trong kiên trúc của mình. Điều này sẽ giúp bạn có được một hệ thống có **tính khả dụng cao** và **khả năng chịu lỗi**. Mình cũng đã giải thích về vấn đề này tại bài viết khái quát về AWS: https://viblo.asia/p/khai-quat-cac-khai-niem-cua-aws-oOVlYnkn58W#_iv-co-so-ha-tang-toan-cau-cua-aws-12

> Notes:
> - VPC mặc định của bạn sẽ có một subnet được tạo mặc định cho mỗi Availability Zone trong region.
> - Subnet bắt buộc phải được gắn với một route table.


-----


*source: https://www.udemy.com/course/draft/2231112/learn/lecture/13742118#overview*