Load balancer nhận lưu lượng đến từ client và định tuyến các request đến các target đã được đăng ký của nó (chẳng hạn như các EC2 instances) trong một hoặc nhiều Availability Zones. Load balancer cũng theo dõi Health của các target đã đăng ký và đảm bảo rằng nó chỉ định tuyến request đến các mục tiêu khoẻ mạnh. Khi Load balancer phát hiện một target không khoẻ (unhealthy), nó sẽ dừng định tuyến lưu lượng đến target đó. Sau đó, nó tiếp tục định tuyến đến target đó khi phát hiện target đó khỏe mạnh trở lại.

Bạn cấu hình load balancer của mình để chấp nhận traffic đến bằng cách chỉ định một hoặc nhiều listener. Một listener là một process kiểm tra các request kết nối. Nó được cấu hình với một giao thức và số cổng cho các kết nối từ client đến Load balancer. Tương tự, nó được cấu hình với một giao thức và số cổng cho các kết nối từ load balancer đến các target.

Elastic Load Balancing của AWS hỗ trợ ba loại Load balancer:
* Application Load Balancers
* Network Load Balancers
* Classic Load Balancers

Có một sự khác nhau rõ ràng giữa các loại load balancer được thiết lập. Với Application load balancer và Network load balancer, bạn đăng ký các target bên trong target group và định tuyến traffic đến các target group. Với Classic Load Balancer, bạn đăng ký các instance với các load balancer.

## Availability Zones và Load Balancer Nodes

Khi bạn enable Availability Zone cho Load Balancer của mình, Elastic Load Balancing tạo một load balancer node bên trong Availability Zone. Nếu bạn đăng ký các target bên trong một Availability Zone nhưng không không enable Availability zone đó, các target được đăng ký đó sẽ không nhận được traffic. Load balancer của bạn sẽ hiệu quả nhất khi bạn đảm bảo được rằng mỗi Availability zone có ít nhất một target được đăng ký.

AWS khuyến khích việc kích hoạt nhiều Availability zone (với Application Load Balancer, việc kích hoạt nhiều Availability Zone là bắt buộc). Thiết lập này giúp đảm bảo rằng Load Balancer có thể tiếp tục định tuyến traffic. Nếu một Availability Zone trở nên không khả dụng hoặc không có target nào khoẻ mạnh, Load Balancer có thể định tuyến lưu lượng đến các mục tiêu khoẻ mạnh ở Availability Zone khác.

Sau khi bạn vô hiệu hóa Availability zone, các target trong Availability zone đó vẫn được đăng ký với Load Balancer. Tuy nhiên mặc dù được đăng ký, Load Balancer vẫn không định tuyến lưu lượng đến đó.

## Cross-Zone Load Balancing

Các node của Load balancer của bạn phân phối các request từ client đến các target đã đăng ký. Khi bật cross-zone load balancing, mỗi Load balancer node sẽ phân phối lưu lượng truy cập qua các target đã đăng ký trong tất cả các Availability Zone được bật. Khi Cross-Zone Load Balancing bị vô hiệu hóa, mỗi Load balancer node chỉ phân phối lưu lượng truy cập trên các mục tiêu đã đăng ký trong Availability Zone của nó.

Các sơ đồ sau đây cho thấy hiệu quả của Cross-Zone Load Balancing. Có hai Availability Zone được kích hoạt, với hai mục tiêu trong Availability Zone A và tám mục tiêu trong Availability Zone B. Khách hàng gửi yêu cầu và Amazon Route 53 đáp ứng từng yêu cầu với địa chỉ IP của một trong các Load balancer node. Điều này phân phối lưu lượng sao cho mỗi Load balancer node nhận được 50% lưu lượng từ các client. Mỗi Load balancer node phân phối phần lưu lượng của nó trên các target đã đăng ký trong phạm vi của nó.

Nếu bật Cross-Zone Load Balancing, mỗi trong số 10 target sẽ nhận được 10% lưu lượng. Điều này là do mỗi nút cân bằng tải có thể định tuyến 50% lưu lượng client của nó tới tất cả 10 mục tiêu.

Nếu bật cân bằng tải giữa các vùng, mỗi trong số 10 mục tiêu sẽ nhận được 10% lưu lượng. Điều này là do mỗi nút cân bằng tải có thể định tuyến 50% lưu lượng khách của nó tới tất cả 10 mục tiêu.

![](https://images.viblo.asia/a27860c4-c740-4d7b-bf02-9d554a565533.png)

Nếu cross-zone load balancing bị vô hiệu hoá:
* Mỗi target trong hai target trong Availability Zone A nhận được 25% lưu lượng.
* Trong khi đó mỗi target trong tám target của Availability Zone B chỉ nhận được 6.25% lưu lượng.

Lý do của điều này là bởi mỗi Load balancer node có thể định tuyến 50% client traffic chỉ cho các target bên trong Availability Zone của nó.

![](https://images.viblo.asia/26a6cb23-6d61-4d04-9a6c-24d44963fd6d.png)

Với Application Load Balancers, cross-zone load balancing luôn luôn được kích hoạt.

Với Network Load Balancer, cross-zone load balancing được mặc định vô hiệu hoá. Sau khi bạn tạo ra một Network Load Balancer, bạn có thể kích hoạt hoặc vô hiệu ohas cross-zone load balancing bất kỳ lúc nào. 

Khi bạn tạo một Classic Load Balancer, mặc định cho cross-zone load balancing phụ thuộc vào bạn tạo load balancer như thế nào. Với API hoặc CLI, cross-zone load balancing mặc định bị vô hiệu hoá. Với AWS Management Console, tuỳ chọn kích hoạt cross-zone load balancing được lựa chọn một cách mặc định. Sau khi bạn tạo ra một Classic Load Balancer, bạn có thể kích hoạt hoặc vô hiệu hoá cross-zone load balancing bất kỳ lúc nào.

## Request Routing

Trước khi khách hàng gửi yêu cầu đến bộ cân bằng tải của bạn, nó sẽ giải quyết tên miền của bộ cân bằng tải bằng máy chủ Hệ thống tên miền (DNS). Mục nhập DNS được kiểm soát bởi Amazon, vì bộ cân bằng tải của bạn nằm trong miền amazonaws.com. Các máy chủ DNS của Amazon trả về một hoặc nhiều địa chỉ IP cho máy khách. Đây là các địa chỉ IP của các nút cân bằng tải cho bộ cân bằng tải của bạn. Với Cân bằng tải mạng, Cân bằng tải đàn hồi tạo giao diện mạng cho từng Vùng khả dụng mà bạn bật. Mỗi nút cân bằng tải trong Vùng sẵn có sử dụng giao diện mạng này để lấy địa chỉ IP tĩnh. Bạn có thể tùy ý liên kết một địa chỉ IP đàn hồi với mỗi giao diện mạng khi bạn tạo bộ cân bằng tải.

Khi lưu lượng truy cập vào ứng dụng của bạn thay đổi theo thời gian, Cân bằng tải đàn hồi sẽ cân bằng tỷ lệ cân bằng tải của bạn và cập nhật mục nhập DNS. Mục nhập DNS cũng chỉ định thời gian tồn tại (TTL) là 60 giây. Điều này giúp đảm bảo rằng các địa chỉ IP có thể được ánh xạ lại nhanh chóng để đáp ứng với việc thay đổi lưu lượng.

Máy khách xác định địa chỉ IP nào sẽ sử dụng để gửi yêu cầu đến bộ cân bằng tải. Nút cân bằng tải nhận được yêu cầu sẽ chọn một mục tiêu đã đăng ký lành mạnh và gửi yêu cầu đến mục tiêu bằng địa chỉ IP riêng của nó.

## Routing Algorithm

Với Bộ cân bằng tải ứng dụng, nút cân bằng tải nhận được yêu cầu sử dụng quy trình sau:

1. Đánh giá các quy tắc người nghe theo thứ tự ưu tiên để xác định quy tắc nào sẽ được áp dụng.
2. Chọn một mục tiêu từ nhóm mục tiêu cho hành động quy tắc, sử dụng thuật toán định tuyến được định cấu hình cho nhóm mục tiêu. Thuật toán định tuyến mặc định là vòng tròn. Định tuyến được thực hiện độc lập cho từng nhóm mục tiêu, ngay cả khi mục tiêu được đăng ký với nhiều nhóm mục tiêu.

Với **Bộ cân bằng tải mạng**, nút cân bằng tải nhận kết nối sử dụng quy trình sau:

1. Chọn một mục tiêu từ nhóm mục tiêu cho quy tắc mặc định bằng thuật toán băm dòng. Nó dựa trên thuật toán:

    * Giao thức
    * Địa chỉ IP nguồn và cổng nguồn
    * Địa chỉ IP đích và cổng đích
    * Số thứ tự TCP

2. Định tuyến mỗi kết nối TCP riêng lẻ đến một mục tiêu duy nhất cho vòng đời của kết nối. Các kết nối TCP từ máy khách có các cổng nguồn và số thứ tự khác nhau và có thể được định tuyến đến các mục tiêu khác nhau.

Với **Bộ cân bằng tải cổ điển**, nút cân bằng tải nhận được yêu cầu sẽ chọn một thể hiện đã đăng ký như sau:

Sử dụng thuật toán định tuyến vòng tròn cho người nghe TCP

Sử dụng thuật toán định tuyến yêu cầu ít xuất sắc nhất cho người nghe HTTP và HTTPS