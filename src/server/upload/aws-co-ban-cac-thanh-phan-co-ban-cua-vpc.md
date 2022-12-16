# 1.VPC
Khi ta sử dụng các dịch vụ của AWS ta sẽ chạy chúng dưới dạng các instance, cũng giống như các thiết bị mạng vật lý khác, các instance trong AWS giao tiếp với nhau thông qua mạng. Mỗi tài khoản AWS có thể tạo ra nhiều instance, vậy thì làm thế nào để các instance của các tài khoản AWS khác truy cập vào các instance của bạn và ngược lại, đó chính là nhờ VPC (Virtual Private Cloud), đây là một hệ thống mạng riêng ảo, nó giúp bạn tổ chức các tài nguyên AWS của bạn bằng cách cung cấp một hệ thống mạng riêng ảo mà tại đây, bạn có thể tùy chỉnh để các intance của bạn public ra ngoài internet hay chỉ được giao tiếp trong phạm vi nội bộ.
Mặc định khi mới tạo, VPC bị cô lập khỏi internet hay các VPC khác, tuy nhiên mình có thể cài đặt để VPC có thể truy cập tới internet hay các VPC khác. Một VPC chỉ thuộc một region.

![](https://images.viblo.asia/14b4ae84-94bc-46e4-881d-24b49e9aa605.png)

## 1.1 VPC CIDR block (classless inter domain routing)
Khi tạo VPC, ta phải tạo cho nó ít nhất một dãy địa chỉ IP, VPC sẽ tự động cấp phát cho các instance bên trong nó địa chỉ IP nằm trong dãy IP này. Một dãy địa chỉ IP có thể được biểu diễn bằng nhiều dạng, nhưng AWS sử dụng dạng khổi CIDR để biểu diễn dãy địa chỉ IP. Dãy địa chỉ IP trong CIDR có dạng như sau 172.16.32.0/20 (172.16.32.0 - 172.16.47.255). trong đó /20 thể hiện độ dài tiền tố hay số bit bị chiếm dụng bời tiền tố, do đó con số này càng nhỏ thì dãy IP này càng chứa nhiều địa chỉ IP. Trong VPC, độ dài tiền tố hợp lệ trong khoảng từ /16 đến /28 (/28 chỉ có 16 địa chỉ IP). Vậy làm sao từ CIDR block có thể biết được dãy IP là gì? ta có thể tham khảo cách tính tại [đây](https://medium.com/@arkadyt/calculating-cidr-block-range-in-your-head-in-9-seconds-f344f22ce34d) hoặc nếu lười có thể dùng máy tính cho nhanh tại [đây](https://mxtoolbox.com/subnetcalculator.aspx)

Mặc dù ta có thể tạo bất kỳ dãy ip nào cho VPC miễn là nó hợp lệ, tuy nhiên AWS khuyến cáo nên sử dụng IP range theo chuẩn [RFC 1918](https://netbeez.net/blog/rfc1918/)
để tránh xung đột với IP public
- 10.0.0.0–10.255.255.255 (10.0.0.0/8)
- 172.16.0.0–172.31.255.255 (172.16.0.0/12)
- 192.168.0.0–192.168.255.255 (192.168.0.0/16)

Lưu ý rằng một khi đã gắn dãy IP cho VPC thì sẽ không thay đổi được, vì thế ta nên lựa chọn cẩn thận trước khi tạo VPC.

## 1.2 Secondary CIDR Blocks
Ta có thêm một dãy IP phụ ngoài dãy chính sau khi tạo VPC, dãy IP này phải cùng range với dãy chính hoặc là một dãy IP public, nhưng không được chồng lấn với dãy chính. Ví dụ VPC có dãy IP chính là 172.16.0.0/16 (172.16.0.0 - 172.16.255.255) thì ta có thể thêm dãy phụ là 172.17.0.0/16 (172.17.0.0 - 172.17.255.255) nhưng không được sử dụng dãy 192.168.0.0/16 (192.168.0.0 - 192.168.255.255) vì không cùng dãy địa chỉ (192.168 và 172.16). Lưu ý rằng khi chọn 192.168.0.0/16 làm dãy IP chính cho VPC, vì đó là dãy IP tận cùng của dãy IP hợp lệ trong VPC nên bạn không thể chọn dãy IP phụ cho VPC theo chuẩn RFC 1918
## 1.3 IPv6 CIDR Blocks
Các dãy IP đã đề cập ở 1.1 và 1.2 là IPv4, bạn cũng có thể sử dụng IPv6 cho VPC, tuy nhiên không giống như IPv4, nếu sử dụng IPv6 thì AWS sẽ không cho phép bạn tự chọn dãy IP cho IPv6 mà thay vào đó, AWS sẽ tự cấp phát.
# 2.Subnet
Subnet là một logic container bên trong VPC nơi mà ta sẽ đặt các instance, có tác dụng cô lập một số instance khỏi các instance khác ngay trong chính VPC. Có thể hiểu rằng VPC là một căn nhà thì các subnet chính là các căn phòng bên trong ngôi nhà đó, mục đích để giúp ta có thể nhóm các instance lại theo mặt chức năng. Ví dụ: Trong một VPC có các server và database, các server sẽ được public ra ngoài internet thì ta sẽ đặt nó bên trong public subnet, còn các database không được phép public ra ngoài internet mà chỉ được truy cập bởi các server thì ta sẽ đặt nó trong private subnet. Khi tạo một AWS instance thì bắt buộc phải chọn subnet cho nó, một subnet có thể chứa nhiều instance và một instance chỉ thuộc một subnet và một khi đã gắn một instance vào một subnet thì ta không thể chuyển nó sang subnet khác, chỉ có thể xóa instance đó và tạo lại ở subnet khác. Còn public subnet và private subnet là gì mình sẽ giải thích ở phần sau.
## 2.1 Subnet CIDR Blocks
Giống như VPC, subnet cũng có dãy IP(CIDR Block) của riêng mình, dãy IP này phải là tập con của dãy IP của VPC, vd: VPC có dãy IP là 172.16.0.0/16 (172.16.0.0 - 172.16.255.255) thì ta có thể chọn CIDR block cho sunnet là 172.16.100.0/16 (172.16.0.0 - 172.16.255.255). Đối với mỗi subnet, AWS sẽ lấy 4 địa chỉ đầu và một địa chỉ cuối cùng của dãy IP trong subnet cho mục đích nào đó mình chưa biết :v , vì thế ta sẽ không thể dùng các địa chỉ này để assign cho các instance bên trong subnet đó. vd: subnet A có CIDR block là 172.16.100.0/16 (172.16.0.0 - 172.16.255.255) thì các địa chỉ sau sẽ không sử dụng được
- 172.16.100.0–172.16.100.3
- 172.16.100.255

Dãy IP của subnet không được chồng lấn với dãy IP của các subnet khác trong cùng một VPC, điều này có nghĩa khi thêm dãy IP vào subnet, nếu dùng dãy IP là dãy IP của VPC thì ta không thể thêm bất cứ subnet nào cho VPC đó nữa, một khi đã thêm dãy IP cho subnet thì ta không thể chỉnh sửa dãy IP đó được nữa, chỉ có thể xóa sau đó tạo lại, và xóa subnet đồng nghĩa với việc các instance bên trong nó cũng bị xóa theo. Vì thế hãy cân nhắc thật kỹ trước khi tạo subnet. VPC có thể có các dãy IP phụ như đã đề cập ở 1.2, subnet chỉ có một dãy IP duy nhất, ta có thể sử dụng dãy IP phụ của VPC làm dãy IP cho subnet.

## 2.2 Availability Zones
Một subnet nằm trong một Availability Zone, đây là một vị trí địa lý mà AWS xây dựng các cơ sở hạ tầng. Một Region sẽ có nhiều Availability Zones kết nối với nhau, tuy nhiên khi một zone bị sập thì các zone khác vẫn hoạt động bình thường mà không bị ảnh hưởng gì cả, vì thế để tối ưu khi thiết kế hệ thống, để tăng khả năng phục hồi cho các ứng dụng của mình thì nên tạo hai mạng con ở các Availability Zones khác nhau và sau đó trải rộng các instances của bạn trên các vùng đó.

![](https://images.viblo.asia/acb5bb2b-e829-469e-85c1-79458f81590e.png)


# 3.Internet Gateways & NAT Gateways
## 3.1 Internet gateways
Như đã đề cập ở mục 1, VPC bị cô lập khỏi internet, vậy thì làm sao các thành phần trong VPC như các instances có thể truy cập internet hay từ internet có thể truy cập vào các instances trong VPC?  đó chính là nhờ Internet Gateways. Nó cung cấp cho các instance khả năng nhận địa chỉ IP public, kết nối với Internet và nhận các requests từ Internet. Khi bạn tạo VPC, VPC không có Internet Gateway được liên kết với nó. Bạn phải tạo Internet Gateway và gắn nó với VPC theo cách thủ công.
## 3.2 NAT gateways
Vậy muốn instances muốn thực hiện thao tác như cài đặt các thư viện hay update version phần mềm, vì thể nó phải được truy cập được internet nhưng không cho phép từ internet truy cập vào thì làm sao? Chúng ta có thể sử dụng NAT gateways, khác với Internet Gateways cho phép các instance kết nối với Internet và nhận các requests từ Internet, NAT gateway chỉ cho phép instance truy xuất ra Internet public
# 4.Router & Route Tables
Trong một VPC để điều hướng các traffic ra và vào, AWS sử dụng một phần mềm gọi là *implied router*. Router này sẽ dựa theo các rule được định nghĩa trong trong route table để điều hướng các traffic bên trong VPC. Mặc định khi tạo VPC, AWS sẽ tạo sẵn một route table cho VPC gọi là *main route table* và một khi ta tạo một subnet trong VPC, subnet này sẽ tự động được gắn vào *main route table*, nếu không muốn sử dụng main route table cho subnet, ta có thể tạo một custom route table rồi gắn subnet vào đó. Một subnet phải được gắn vào một route table.

Một rule trong route table gọi là route, một route table có thể chứa một hoặc nhiều route. Các route xác định cách điều hướng các luồng traffic của các instance bên trong subnet được gắn với route table đó. Một route sẽ có hai giá trị sau:
- **Destination:** là một dãy IP, các instance có địa chỉ IP nằm trong khoảng này có thể truy cập đến điểm đến là giá trị của **target**.
- **Target:** là các tài nguyên network trong AWS như instance, internet gateway...

Một public subnet (tất cả các instance trong subnet đó có thể truy cập internet và ngược lại) là subnet được gắn vào route table có **Destination** là tập cha của dãy IP của subnet và **Target** là một internet gateway. Trong mỗi route table sẽ có một route mặc định với **Target** là local gọi là *local route*, route này giúp các instances trong cùng subnet có thể giao tiếp với nhau và có thể giao tiếp với các instance trong subnet khác trong cùng một VPC.
# 5.Kết
Ngoài các thành phần đã nêu ở trên, trong AWS còn có Security Group và Network Access Control Lists để phục vụ cho việc bảo mật cho VPC, tuy nhiên lý thuyết về hai thành phần này rất dài nên mình sẽ nói ở một bài viết khác, cám ơn các bạn đã theo dõi :D