## 1. VPC peering là gì ?
>  VPC peering là một cách để liên kết nhiều VPC với nhau
* VPC peering là một cách để liên kết hoặc kết nối hai VPC với nhau mà không cần sử dụng bất kỳ dịch vụ phi AWS bổ sung nào. Về cơ bản, nó cho phép giao tiếp trực tiếp giữa hai VPC độc lập. Một khi các VPC được kết nối với nhau bằng cách sử dụng VPC peering, các dịch vụ trong các VPC đó có thể giao tiếp bằng IP riêng từ VPC nguồn đến VPC đích và ngược lại. Các VPC peers có thể mở rộng trên các tài khoản AWS và thậm chí các region, mặc dù tính năng này còn có một số hạn chế.
* Khi VPC peering được sử dụng, dữ liệu giữa các VPC được mã hóa và nếu bạn đang sử dụng VPC peering qua các region khác nhau thì dữ liệu đó sẽ được truyền qua [AWS global backbone](https://techblog.comsoc.org/tag/aws/). Nhờ đó, quá trình truyền dữ liệu này sẽ tốt hơn nhiều nhờ có độ trễ thấp hơn và hiệu suất cao hơn so với sử dụng public internet.

![](https://images.viblo.asia/a2e6c844-94cc-4e8c-8fb9-b8a2908627c7.png)

## 2. Dùng VPC peering khi nào ?

* VPC theo thiết kế là một vùng mạng bị cô lập. Nếu bạn không thay đổi cấu hình, sẽ không có kết nối nào giữa các VPC. Trong hầu hết các trường hợp, tính năng này là tối ưu. Tuy nhiên, đôi khi bạn cũng muốn kết nối giữa nhiều VPC. Khi ấy, chúng ta có thể sử dụng  **internet gateway** để làm cho VPC có thể truy cập công khai theo cả hai hướng (both directions) hoặc sử dụng **NAT gateway** để chỉ truy cập ra ngoài (outbound). Bạn cũng có thể sử dụng các **virtual private networks** hoặc dịch vụ **Direct Connect**, cả hai cách này đều dùng để liên kết VPC với on premises network, bằng cách sử dụng kết nối ảo hoặc kết nối vật lý.
* Các VPC peers được sử dụng khi bạn muốn liên kết các VPC với nhau. Vì vậy, khi bạn muốn liên kết các VPC lại với nhau theo cách có khả năng mở rộng, hiệu suất cao, thì bạn sử dụng **VPC peering**. 

### ***Example:***

Giả sử có các dịch vụ chia sẻ đang chạy trong một VPC duy nhất và bạn muốn cho phép các VPC khác có thể truy cập được, dịch vụ đó có thể database, ID provider, hoặc các bespoke business system khác. Bạn cũng có thể muốn kết nối VPC của mình với nhà cung cấp dịch vụ hoặc hệ thống đối tác để truy cập ứng dụng mà họ cung cấp, hoặc bạn có thể muốn cấp cho họ quyền truy cập vào VPC của mình, ví dụ như có thể là security audit. 
* VPC peering connection tạo điều kiện cho quá trình truyền dữ liệu. Ví dụ nếu bạn có nhiều tài khoản AWS, bạn có thể peer các VPC trên các tài khoản đó để tạo mạng lưới chia sẻ tệp tin. Bạn cũng có thể sử dụng VPC peering connection để cho phép các VPC khác truy cập tài nguyên hiện có của một trong các VPC của mình.
* Bạn có thể thiết lập quan hệ peering giữa các VPC trên các AWS Regions khác nhau (còn được gọi là Inter-Region VPC Peering). Điều này cho phép các tài nguyên VPC bao gồm EC2 instances, Amazon RDS databases và Lambda functions chạy trong các  AWS Regions khác nhau có thể giao tiếp với nhau bằng địa chỉ private IP, mà không yêu cầu gateways, VPN connections hoặc các thiết bị mạng riêng biệt. Lưu lượng vẫn nằm trong vùng private IP. Tất cả lưu lượng liên vùng được mã hóa, luôn nằm trên global AWS backbone và không đi qua public internet, điều này giúp giảm các mối đe dọa liên quan đến common exploits và các cuộc tấn công DDoS. Inter-Region VPC Peering cung cấp một cách đơn giản và hiệu quả để chia sẻ tài nguyên giữa các region hoặc sao chép dữ liệu để dự phòng về mặt địa lý.

![](https://images.viblo.asia/b4e41e11-7a31-45b6-8767-a88a97269ec0.png)

## 3. Cách thức hoạt động
* VPC peering cho phép các VPC độc lập giao tiếp với nhau ở network level.
* Cách mà VPC peering hoạt động là nó sử dụng một đối tượng được gọi là peering connection. Đây thực chất là một network gateway object tương tự như internet gateway hoặc NAT gateway, nhưng được sử dụng để nối giữa hai VPC. Có một điều cần nhấn mạnh là VPC peering connection là một liên kết giữa hai VPC không hơn không kém.
* Hình bên dưới mô tả một liên kết giữa VPC A và VPC B, chỉ có một peering connection duy nhất kết nối 2 VPC đó với nhau. Peering connection kết nối hai VPC, nếu bạn muốn kết nối bổ sung để có nhiều VPC hơn thì bạn sẽ cần nhiều peering connection hơn.

![](https://images.viblo.asia/eee56dc8-802c-43be-9aed-ad607bd3aaaf.png)

Bạn không thể tạo một VPC peer giữa hai VPC có sự chồng chéo hoàn toàn hoặc một phần giữa các CIDR ranges

Một số lưu ý khi sử dụng VPC peering
+ CIDR ranges không thể bị chồng chéo
+ Các peers được sử dụng để kết nối hai VPC với nhau trong cùng một region của cùng một tài khoản, các region khác nhau của cùng một tài khoản, các tài khoản AWS khác nhau và thậm chí các region khác nhau trong các tài khoản AWS khác nhau 

## 4. Transitive Peering
* AWS không hỗ trợ một số cấu hình VPC Peering và một trong số đó là Transitive Peering.
* Giả sử rằng bạn có VPC-A được kết nối với VPC-B bằng cách sử dụng peering connection và bạn có một peering connection khác giữa VPC-A và VPC-C. Sẽ không có bất cứ peering connection nào trực tiếp giữa VPC-B và VPC-C. Mặc dù cả hai đều được kết nối với VPC-A, nhưng chúng không thể sử dụng VPC-A để liên lạc với nhau.

![](https://images.viblo.asia/0ba21708-584a-49ce-97ba-ebe59051f09e.png)

* Một full-mesh peering giữa 4 VPCs sẽ yêu cầu N*(N-1)/2 kết nối (links), trong đó N là số lượng VPC - trong trường hợp này là 6.  Tưởng tượng xem độ phức tạp của phương thức peering này nếu áp dụng lên 100 VPC sẽ cần quản lý, đó là chưa tính đến thời gian và các chi phí liên quan để triển khai một giải pháp như vậy. Khi ấy, **transitive routing** có thể áp dụng được bằng cách sử dụng phần mềm hoặc thiết bị của bên thứ ba (AWS khuyến nghị nên sử dụng từ nhà cung cấp phù hợp với điều hành cảm nhất). 

* Một transit VPC đơn giản hóa việc quản lý mạng và giảm thiểu số lượng kết nối giữa các VPC. Có hai loại cấu trúc liên kết (topologies) có thể được sử dụng trong AWS:

1. Cấu trúc đầu tiên là **Hub and Spoke**: 

    Tất cả các **VPC (spokes)** được kết nối với một **VPC trung tâm (hub)**. Tất cả các công việc định tuyến (routing) được thực hiện bởi VPC trung tâm. Lợi ích trước mắt là số lượng kết nối mạng giữa các VPC được giữ ở mức tối thiểu. Một nhược điểm có thể xảy ra là nó làm tăng độ trễ giữa hai spokes và điều này đôi khi có thể ảnh hưởng đến hiệu suất của ứng dụng (trong trường hợp này, giải pháp thay thế là sử dụng VPC Peering giữa hai VPC đó).

2. Cấu trúc thứ hai là **meshed network**. 

    Sẽ có một partial-mesh network trong đó một số VPC có kết nối mạng với một số VPC này, nhưng lại không kết nối được với một số VPC khác. Các kết nối mạng có thể được thực hiện bằng VPC Peering hoặc sử dụng phần mềm của bên thứ ba, phần mềm của bên thứ ba sẽ cho phép định tuyến bắc cầu. Đây là các thiết bị hỗ trợ các chức năng định tuyến. Chúng có thể chỉ đơn giản là các máy ảo Linux có thể thực hiện định tuyến hoặc cũng có thể là các thiết bị mạng từ các nhà cung cấp mạng nổi tiếng như Cisco, Juniper,...

    Lợi ích của việc sử dụng VPC Hub và Spoke bao gồm khả năng triển khai dịch địa chỉ mạng (NAT) giữa các VPC có dải CIDRs chồng chéo và thực hiện kiểm tra và lọc gói ở network-level. Đối với trường hợp của meshed network, vì không có VPC trung tâm, các VPN tunnels được thiết lập giữa các EC2 instances có khả năng hỗ trợ các VPN tunnels. Lợi ích của việc sử dụng meshed networks là nó cung cấp khả năng kết nói trực tiếp hai VPC, do đó có độ trễ thấp.

## References
https://a.aviatrix.com/learning/cloud-routing-networking/transitive-routing/