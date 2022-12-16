## Load Balancer là gì?
Load balancer (LB) có thể được triển khai dưới dạng phần mềm hoặc phần cứng cho một thiết bị phân phối kết nối từ các client giữa một tập hợp các server. LB hoạt động như một **reverse-proxy** để đại diện cho máy chủ ứng dụng cho máy khách thông qua địa chỉ IP ảo (VIP). Công nghệ này được gọi là server load balancing (SLB). SLB được thiết kế cho các nhóm máy chủ ứng dụng trong một trang web hoặc mạng cục bộ (LAN).

![](https://images.viblo.asia/2e671798-ac8c-4f74-a1fa-83b43b379456.png)

LB được sử dụng để cung cấp tính khả dụng và khả năng mở rộng cho ứng dụng. LB hoạt động để hướng lưu lượng truy cập đến một nhóm các máy chủ có sẵn thông qua [load balancing algorithms](https://kemptechnologies.com/load-balancer/load-balancing-algorithms-techniques/).
LB sẽ kiểm tra tính khả dụng của từng máy chủ. Nếu quá trình kiểm tra tình trạng không thành công, LB sẽ đưa server của ứng dụng ra khỏi nhóm máy chủ có sẵn của nó. Khi server bình thường trở lại, health check sẽ xác nhận tính khả dụng của server và server được đưa trở lại nhóm khả dụng.

Vì bộ cân bằng tải đang ở giữa máy khách và máy chủ ứng dụng và quản lý kết nối, nó có khả năng thực hiện các chức năng khác. Bộ cân bằng tải có thể thực hiện chuyển đổi nội dung, cung cấp bảo mật dựa trên nội dung như web application firewalls (WAF) và các cải tiến xác thực như two factor authentication (2FA).
## Load Balancer support những gì?
LB được thiết kế để cung cấp cho ứng dụng tính khả dụng, khả năng mở rộng và bảo mật. Là một reverse-proxy, LB hoạt động đa chức năng để định hướng và kiểm soát lưu lượng giữa các client và server.
1. Tự động phát hiện lỗi máy chủ và chuyển hướng lưu lượng máy khách.
2. Cho phép bảo trì máy chủ mà không có bất kỳ tác động nào
3. Cung cấp khôi phục tự động cho các trang web sao lưu
4. Thêm và xóa các máy chủ ứng dụng mà không bị gián đoạn
5. Theo dõi và chặn nội dung độc hại
## Có những loại Load Balancer nào?
1. Network Server Load Balancers
2. Application Load Balancers
3. Global Server Load Balancing
4. Hardware vs Software vs Virtual Load Balancing
5. Elastic Load Balancers
## Load Balancing and SSL
Secure Sockets Layer (SSL) là công nghệ bảo mật tiêu chuẩn để thiết lập liên kết được mã hóa giữa máy chủ web và trình duyệt. Lưu lượng SSL thường được giải mã tại bộ cân bằng tải. Khi bộ cân bằng tải giải mã lưu lượng trước khi chuyển yêu cầu, nó được gọi là kết thúc SSL. Bộ cân bằng tải giúp các máy chủ web không phải sử dụng thêm các chu kỳ CPU cần thiết để giải mã. Điều này cải thiện hiệu suất ứng dụng.
## Load Balancing and Security
Cân bằng tải đóng một vai trò bảo mật quan trọng khi điện toán ngày càng chuyển sang cloud.Chức năng tắt tải của bộ cân bằng tải bảo vệ tổ chức chống lại các cuộc tấn công từ chối dịch vụ (DDoS) phân tán. Nó thực hiện điều này bằng cách chuyển lưu lượng tấn công từ máy chủ của công ty sang nhà cung cấp đám mây công cộng. Các cuộc tấn công DDoS đại diện cho một phần lớn tội phạm mạng khi số lượng và quy mô của chúng tiếp tục tăng lên. Bảo vệ phần cứng, chẳng hạn như tường lửa vành đai, có thể tốn kém và yêu cầu bảo trì đáng kể. Bộ cân bằng tải phần mềm với tính năng giảm tải trên đám mây cung cấp khả năng bảo vệ hiệu quả và tiết kiệm chi phí.

Chúng ta đã cùng tìm hiểu về load balancing. Hy vọng bài viết này có thể giúp mọi người hiểu thêm về LB và sự cần thiết của nó
Happy coding!

### Tài liệu tham khảo
https://avinetworks.com/what-is-load-balancing/
https://www.citrix.com/solutions/app-delivery-and-security/load-balancing/what-is-load-balancing.html
https://kemptechnologies.com/ap/what-is-load-balancing/