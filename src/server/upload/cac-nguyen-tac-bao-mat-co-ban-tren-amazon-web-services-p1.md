# Lời mở đầu 
Từ lưu trữ dữ liệu, chia sẻ file, truy cập từ xa, đến sao lưu từ xa – điện toán đám mây là một nhân tố quan trọng trong CNTT hiện đại. Ngày càng nhiều công ty chuyển dịch từ Dedicated server sang Cloud server và Amazon Web Services (AWS) vẫn luôn là một lựa chọn hàng đầu cho giải pháp này . 

Tuy nhiên việc bảo mật không đúng cách đem lại nhiều rủi ro cho doanh nghiệp. Rất nhiều công ty vừa và nhỏ đã "ngậm trái đắng" khi hệ thống Cloud bị tấn công và nhận con số khổng lồ trong hóa đơn. Trong quá tình pentest cloud , đã rất nhiều lần mình và đồng nghiệp thấy access key vứt bừa bãi trên Github hay S3 có thể truy cập và sử dụng công khai. Đó là nguyên nhân mình viết bài chia sẻ này. Mình sẽ cố gắng tổng hợp ngắn gọn nhất, ít hoa lá cành nhất để chúng ta có thể cùng nhau nắm được nội dung. 

![](https://images.viblo.asia/b6792537-eb00-4c90-a324-0289d574d596.jpg)

# Audit AWS - Higher Standard

**1. Root account**
- Đăng ký tài khoản root AWS bằng email Công ty 
- Không sử dụng tài khoản root cho hoạt động bình thường (normal operation)
- Không tạo access keys cho tài khoản root
- Chỉ để  người có kinh nghiệm làm việc với AWS quản lý tài khoản admin (Với nhiều công ty lớn, AWS Certified Security – Specialty là chứng chỉ bắt buộc cho người sở hữu tài khoản admin) 

**2. Developer account**

- Xác định Developer Roles trong Project (Administrator, Developer, Deployer, Read-only Supervisor..)
- Tạo một nhóm IAM với **đặc quyền tối thiểu** cho mỗi Developer Role (Không cấp thừa tài nguyên)
- Đối với mỗi Developer, tạo một IAM user cho Developer đó trong IAM group
- Xóa users, keys và credentials khi họ đã hoàn thành công việc
- Chỉ cung cấp cho IAM group những đặc quyền tối thiểu đủ để họ làm việc. 
- Khuyến cáo rằng ngoại trừ Administrator Role, các vai trò khác không được phép truy cập dịch vụ IAM.
- Nên tạo nhóm và gán người dùng vào nhóm đó, thay vì đặt quyền truy cập cho từng người dùng.

**3. No sharing**

- Không bao giờ chia sẻ bất kỳ keys hoặc passwords  nào với người khác.
- Nếu ai đó (ví dụ: khách hàng) cần có quyền truy cập vào một số dịch vụ cụ thể, hãy tạo IAM user cho người đó.
- Nếu một ứng dụng hoặc IAM user từ AWS khác hoặc người dùng từ Active Directory của bạn cần truy cập vào một số dịch vụ cụ thể, hãy tạo IAM role cho trường hợp đó

**4. Use MFA**
- Enable MFA cho tất cả các tài khoản Console 

**5. Restrict access using policy**
-  Mặc đinh từ chối tất cả quyền truy cập ngoại trừ một nhóm Resources và AWS Products cụ thể
- Chỉ cho phép truy cập từ dải IP được chỉ định ( dải IP công cty hoặc dải IP khách hàng)
- Chỉ cho phép truy cập từ người dùng sử dụng MFA ( Tất cả người dùng không sử dụng MFA cho tài khoản của họ mặc định bị từ chối)
- Chỉ cho phép truy cập vào các tài nguyên đã được gắn thẻ (Các tài nguyên bắt buộc phải được gắn thẻ cụ thể, tránh gây nhầm lẫn và tạo hiệu quả trong quá trình điều tra xử lý sự cổ)
- Chỉ cho phép truy cập trong một khoảng thời gian nhất định
- Chỉ cho phép người dùng khởi chạy một loại instance cụ thể 


**6. IAM Password policty**

Đặt chính sách password cho tất cả các IAM users trong account của bạn
- Ít nhất 8 ký tự
- Ít nhất 1 chữ hoa, chữ thường, số và ký hiệu
- Thời gian hết hạn mật khẩu tối đa 30 ngày 
-  Không sử dụng lặp lại mật khẩu (tối thiểu 3 lần trước đó )

**7. Track user action**
- Bật AWS Config để ghi lại (record) các cấu hình tài nguyên

- Bật CloudTrail trên all regions để theo dõi hành động của người dùng

**8. Create billing alarm**

- Sử dụng CloudWatch để thiết lập cảnh báo thanh toán khi mức sử dụng của bạn vượt quá ngưỡng cụ thể

(Việc sử dụng CloudWatch có thể sẽ tiêu tốn một chút ít tiền của bạn. Nhưng nó sẽ là rất rất nhỏ với số tiền mà bạn sẽ mất nếu Hacker kiểm soát được Cloud của bạn)

**9. Secure Logging and Monitoring Service**

- Không cho phép người dùng không phải quản trị viên (non-admin user) sửa đổi  Monitoring Services (CloudWatch, CloudTrail, Config) - Trong trường hợp xâm nhập, Hacker sẽ tìm mọi cách tắt các dịch vụ này để tránh truy vết và xuất hiện cảnh báo bảo mật. 

- Không cho phép người dùng không phải quản trị viên sửa đổi vị trí  storage & output location (S3 buckets) cho các dịch vụ giám sát. 

**10. Sandard AMI**

- Khi khởi chạy một Instance Machine mới, phải sử dụng  AMI tiêu chuẩn mặc định do AWS cung cấp.

- Bất kỳ Image nào khác phải được kiểm tra và phê duyệt bởi chuyên gia bảo mật (IT / TQA) trước khi triển khai trong môi trường Production.

(Các images bên thứ 3 luôn tồn tại các lỗ hổng bảo mật và thời gian khắc phục các vấn đề bảo mật cũng lâu hơn so với các AMI tiêu chuẩn)

**12. Limit network access**

- Giới hạn truy cập vào Instance bằng cách sử dụng Security Group và Network ACL để chỉ cho phép lưu lượng truy cập cho các cổng và dải IP nhất định

Trong trường hợp cụ thể, có thể cấu hình Security Group : 

- Cho phép RDP (port 3389) gửi đến từ dải IP của khách hàng
- Cho phép SSH (port 22) gửi đến từ dải IP của khách hàng
- Từ chối tất cả các inbound traffics khác (all other inbound traffics)

(Việc sử dụng 0.0.0.0/0 cho các dịch vụ "nhạy cảm"  luôn là vấn đề đau đầu trong các dự án. Đã rất nhiều lần mình chứng kiến cơn thịnh nộ của khách hàng liên quan đến việc này. Tin mình đi, bạn sẽ không muốn trải qua điều này đâu ^^.!)

**13.Use HTTPS and SSL/TLS**

Nên sử dụng HTTPS và TLS / SSL khi kết nối với các dịch vụ đám mây (EC2, RDS, S3, DynamoDB...) qua Internet

Nó là giải pháp thay thế cho phương pháp truyền thông tin văn bản dạng plain text, văn bản loại này khi truyền trên internet sẽ không được mã hóa, nên việc áp dụng mã hóa vào sẽ khiến cho các bên thứ 3 không xâm nhập được bào thông tin của bạn, không đánh cắp hay chỉnh sửa được các thông tin đó.
Hầu hết mọi người đều quen thuộc với các chứng chỉ SSL/TLS, đang được dùng bởi các website lớn và các webmaster nghiêm túc trong việc bảo vệ các giao dịch người dùng.

**14.Encrypt RDS**

- Đối với RDS database instance quan trọng, bạn nên bật mã hóa phía máy chủ RDS (RDS server side encryption)

**15.Backup RDS**

- Sử dụng RDS snapshot hoặc automated backup (sao lưu tự động) để sao lưu RDS databases quan trọng

# Tâm Sự 
Trong thời gian mình còn làm công việc xử lý sự cố. Đã nhiều lần phải trở dậy giữa đêm để đi khắc phục hậu quả do đội dự án gây ra. Có lần Hacker đã chiếm được quyền cao nhất và sử dụng 200 Instances của khách hàng cho việc đào Coin. Số tiền AWS báo về lúc đó đủ cho người gây ra hậu quả phải bán nhà đi để bồi thường. Nhìn khuôn mặt tái nhợt khi ấy, có lẽ nếu quay ngược lại thời gian - cậu ấy đã chẳng dám xem thường Security đến thế.