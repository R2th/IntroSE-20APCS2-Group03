### 1. Giới thiệu về AWS Direct Connect
### 
AWS Direct Connect cung cấp một đường truyền chuyên dụng, ổn định từ dịch vụ của bạn đến với mạng lưới của AWS.

Khi sử dụng AWS Direct Connect thì bạn đang bỏ qua nhà cung cấp dịch vụ Internet của bạn mà kết nối thẳng đến AWS với đường truyền trong khoảng 1 Gbps đến 10 Gbps.

AWS cũng cung cấp nhiều đường truyền 1 lúc tùy vào nhu cầu của bạn.

**1.1 AWS Direct Connect virtual interfaces**

Bạn phải tạo một trong các Virtual Interface sau để bắt đầu sử dụng kết nối AWS Direct Connect của mình.

**Private virtual interface**: Truy cập VPC của Amazon bằng địa chỉ IP private.

**Public virtual interface**: Truy cập các dịch vụ AWS từ dịch vụ của bạn. Cho phép các dịch vụ AWS hoặc khách hàng AWS truy cập các mạng công cộng của bạn qua Interface thay vì truy cập Internet.

**Transit virtual interface**: Truy cập một hoặc nhiều Amazon VPC Transit Gateways được liên kết với Direct Connect gateways. Bạn có thể sử dụng Transit virtual interface với kết nối AWS Direct Connect 1/2/5/10 Gbps. 

Tìm hiểu rõ hơn về Direct Connect gateway tại [Direct Connect gateways](https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways-intro.html)


### 2. Thiết kế hệ thống cơ bản sử dụng Direct Connect
### ![](https://images.viblo.asia/52e98aa9-d1b4-4c17-af1f-245a0075e43f.png)
Nguồn https://app.pluralsight.com/library/courses/aws-network-design-getting-started


Ví dụ như bạn có một EC2 ở trong một Private Subnet, mong muốn kết nối tới nó mà không cần thông qua Internet.

Đầu tiên cần xác định vị trí (Location) cho AWS Direct Connect tại danh sách này: https://aws.amazon.com/directconnect/features/#AWS_Direct_Connect_Locations

**Lưu ý**:  Bạn có thể truy cập vào bất kỳ AWS Region nào từ bất kỳ địa điểm nào của AWS Direct Connect ở danh sách bên trên (ngoại trừ Trung Quốc)

Bạn đặt Router của mình ở đây, cũng trong Location này, AWS có thiết bị gọi là Direct Connect Endpoint. Từ đấy bạn thiết lập một kết nối giữa Router và thiết bị này sử dụng 802.1q VLANs.

Sau đó bạn tạo một VPN tại VPC của mình, kết nối Private virtual interface trên VPC tới Direct Connect Endpoint. Vậy là kết nối giữa dịch vụ của bạn và AWS đã cơ bản được hình thành.

Nếu như Dịch vụ của bạn không được đặt trong AWS Direct Connect Location thì bạn có thể liên hệ với APN (AWS Partner Network) để kết nối hộ bạn.

Danh sách các APN tại Việt Nam: https://partners.amazonaws.com/search/partners/?loc=Vietnam

Khi sử dụng Direct Connect thì bạn cũng có thể truy cập đến những dịch vụ AWS khác như S3 mà không cần sử dụng Internet.

Để có thể làm được điều này, bạn tạo một Public Virtual Interface và dùng sơ đồ y như bên trên để có thể kết nối với S3 mà không cần thông qua Internet

### 3. Những trường hợp bạn nên sử dụng Direct Connect
### 
![](https://images.viblo.asia/dcc32047-d571-4938-9da4-b25f0c32d78d.png)
Nguồn:https://app.pluralsight.com/library/courses/aws-network-design-getting-started

**3.1  Khi bạn có nhu cầu truyền bộ dữ liệu lớn, từ AWS đến dịch vụ khác hoặc từ dịch vụ khác đến AWS**

Việc chuyển các tập dữ liệu lớn qua Internet có thể tốn thời gian và tốn kém.

Nếu bạn giống như hầu hết các doanh nghiệp, bạn đã mua đủ băng thông để đáp ứng nhu cầu web và email của mình, đồng thời chia sẻ kết nối Internet đó trên toàn bộ doanh nghiệp. 

Khi sử dụng đám mây, bạn có thể thấy rằng việc truyền các tập dữ liệu lớn có thể bị chậm bởi vì lưu lượng mạng quan trọng của doanh nghiệp bạn đang tranh giành băng thông với việc sử dụng Internet khác của bạn.

Để giảm lượng thời gian cần thiết để truyền dữ liệu, bạn có thể tăng băng thông cho nhà cung cấp dịch vụ Internet của mình, nhà cung cấp dịch vụ này thường yêu cầu gia hạn hợp đồng tốn kém và cam kết tối thiểu. 

Với AWS Direct Connect, bạn có thể chuyển dữ liệu quan trọng của doanh nghiệp mình trực tiếp từ trung tâm dữ liệu, văn phòng hoặc môi trường vị trí của bạn vào và từ AWS bỏ qua nhà cung cấp dịch vụ Internet của bạn và loại bỏ tắc nghẽn mạng. 

Hơn nữa, định giá thanh toán đơn giản của AWS Direct Connect và không có cam kết tối thiểu có nghĩa là bạn chỉ trả tiền cho các cổng mạng bạn sử dụng và dữ liệu bạn truyền qua kết nối, điều này có thể giảm đáng kể chi phí mạng của bạn

**3.2 Phản hồi dữ liệu Real-time với tốc độ cao, độ trễ nhỏ**

Các ứng dụng sử dụng thời gian thực cũng có thể được hưởng lợi từ việc sử dụng AWS Direct Connect.

**Ví dụ**: các ứng dụng sử dụng tiếng nói và video hoạt động tốt nhất khi độ trễ mạng không đổi. Độ trễ của mạng qua Internet có thể thay đổi do Internet liên tục thay đổi cách dữ liệu đi từ điểm A đến điểm B. 

Với AWS Direct Connect, bạn kiểm soát cách dữ liệu của mình được định tuyến, điều này có thể cung cấp trải nghiệm mạng nhất quán hơn qua các kết nối dựa trên Internet

**3.3  Tổ chức một hệ thống Hybrid (Kết hợp cả server của bạn và AWS) dùng để mở rộng dữ liệu của bạn lên môi trường Cloud.**

Direct Connect cung cấp một đường truyền an toàn, tin cậy từ hệ thống của bạn đến các tài nguyên, dịch vụ của AWS tận dụng mạng lưới AWS.

AWS Direct Connect có thể giúp bạn xây dựng các môi trường kết hợp đáp ứng các yêu cầu quy định yêu cầu sử dụng kết nối riêng. Môi trường kết hợp cho phép bạn kết hợp tính co giãn và lợi ích kinh tế của AWS với khả năng sử dụng cơ sở hạ tầng khác mà bạn đã sở hữu.

Nguồn:
https://app.pluralsight.com/library/courses/aws-network-design-getting-started

https://aws.amazon.com/directconnect/

https://aws.amazon.com/directconnect/features/