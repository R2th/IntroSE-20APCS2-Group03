## Amazon Aurora là gì?
Amazon Aurora (Aurora) là một cơ sở dữ liệu quan hệ được cung cấp bởi Amazon, được quản lý đầy đủ, tương thích với MySQL và PostgreSQL và được xây dựng cho cloud, kết hợp hiệu suất và tính khả dụng của các cơ sở dữ liệu thương mại cao cấp với tính đơn giản và hiệu quả về chi phí của các cơ sở dữ liệu mã nguồn mở. Tất cả mã nguồn, công cụ và các ứng dụng bạn dùng hôm nay với cơ sở dữ liệu MYSQL và PostgresSQL đều có thể được dùng với Aurora. 

Aurora nhanh gấp 5 lần cơ sở dữ liệu MySQL tiêu chuẩn và nhanh gấp 3 lần các cơ sở dữ liệu PostgreSQL chuẩn mà không cần yêu cầu thay đổi gì đến các ứng dụng có sẵn. Nó cung cấp tính bảo mật, tính khả dụng và độ tin cậy của các cơ sở dữ liệu cấp thương mại với chi phí 1/10. Aurora được quản lý đầy đủ bởi Amazon Relational Database Service (RDS), giúp tự động hóa các nhiệm vụ quản trị tốn nhiều thời gian như cung cấp phần cứng, thiết lập cơ sở dữ liệu, vá lỗi và sao lưu.

![](https://images.viblo.asia/a012207b-ba92-4e90-bec0-c62c94b36ec8.png)

Aurora có một hệ thống lưu trữ tự phân loại, phân tán, tự phục hồi, tự động mở rộng lên đến 64TB trên mỗi cơ sở dữ liệu. Aurora cung cấp hiệu suất và tính khả dụng cao với 15 bản sao chế độ đọc độ trễ thấp, phục hồi theo thời gian, sao lưu liên tục tới Amazon S3 và sao chép trên ba vùng khả dụng.

Aurora là một phần của dịch vụ quản lý cơ sở dữ liệu của Amazon là Amazon Relational Database Service (Amazon RDS). Amazon RDS là  một dịch vụ web cung cấp khả năng dễ dàng cài đặt, sử dụng và mở rộng một cơ sở dữ liệu quan hệ trên cloud.

Hệ thống quản lý Aurora bao gồm toàn bộ các cụm (cluster) của các máy chủ cơ sở dữ liệu, được đồng bộ thông qua  việc nhân bản thay vì là từng instance cơ sở dữ liệu riêng lẻ. Khả năng chia cắt, sao chép và phân bố vùng lưu trữ tự động làm cho nó thực sự đơn giản và hiệu quả khi cài đặt, vận hành và mở rộng các cơ sở dữ liệu MySQL và PostgreSQL lớn nhất của bạn.

Bạn có thể chuyển dữ liệu từ MySQL Amazon RDS và  PostgreSQL Amazon RDS vào Aurora bằng cách tạo và sao lưu các snapshots, hay bằng cách cài đặt một cách sao chép nào đó. Bạn có thể sử dụng các công cụ migration để chuyển dữ liệu ứng dụng từ MySQL Amazon RDS và  PostgreSQL Amazon RDS qua Aurora rất đơn giản chỉ với vài thao tác bấm nút. 

Truy cập vào RDS Management Console để tạo ra cơ sở dữ liệu Aurora đầu tiên của bạn và bắt đầu di chuyển các cơ sở dữ liệu MySQL và PostgreSQL của bạn.

## Tính năng Amazon Aurora
### Hiệu năng cao và khả năng mở rộng
Amazon Aurora cung cấp 5X thông lượng của tiêu chuẩn MySQL và 3X thông lượng của PostgreSQL tiêu chuẩn chạy trên cùng một phần cứng. Hiệu suất này ngang bằng các cơ sở dữ liệu thương mại, với chi phí 1/10. Để tăng cường khả năng đọc và hiệu suất, bạn có thể thêm lên đến 15 bản sao chế độ đọc độ trễ thấp trong ba vùng khả dụng. Amazon Aurora tự động tăng dung lượng khi cần thiết, tối đa 64TB trên mỗi cơ sở dữ liệu.

32 vCPUs và bộ nhớ 244GB là cấu hình tối đa bạn có thể được cấp phát cho instance DB của bạn. Yêu cầu thay đổi có thể được thực hiện ngay lập tức nếu bạn muốn. 

![](https://images.viblo.asia/a76ed7e6-d34f-4251-be46-51c359e1e40e.png)

### Tính khả dụng và độ bền cao
Amazon Aurora cung cấp khả năng khả dụng lớn hơn 99,99%. Nó có kho chứa lỗi và tự phục hồi được tạo ra cho cloud sao chép 6 bản sao dữ liệu của bạn qua 3 vùng khả dụng. Aurora liên tục sao lưu dữ liệu của bạn lên Amazon S3 và khôi phục lại từ những thất bại trong việc lưu trữ vật lý; ví dụ failover thường mất ít hơn 30 giây.

Amazon Aurora cung cấp nhiều mức độ bảo mật cho cơ sở dữ liệu của bạn. Chúng bao gồm cách ly mạng bằng cách sử dụng Amazon VPC và mã hóa dữ liệu khi chuyển tiếp bằng SSL(AES-256). Cơ sở dữ liệu sẽ được mã hoá bằng cách dùng các khoá được quản lý thông qua dịch vụ quản lý key của Amazon (AWS Key Management Service - KMS)

Để mã hoá một cơ sở dữ liệu có sẵn, bạn cần tạo một DB instance mới và chuyển dữ liệu từ cơ sở dữ liệu cũ vào. 

Để đảm bảo độ bền, Aurora chia cơ sở dữ liệu của bạn thành từng phần 10GB và lưu vào lần lượt nhiều đĩa. Mỗi phần được sao chép trong 6 nơi, thuộc 3 khu vực phù hợp. Khi dữ liệu được tạo từ Aurora, nó sẽ được được gửi đến 6 node lưu trữ một cách song song. Aurora được thiết kế để chịu đựng khả năng bị mất các node lưu trữ mà không làm ảnh hưởng đến dữ liệu. Ngoài ra,  Aurora tự phục hồi, tất cả các khối và đĩa dữ liệu được quét để tìm lỗi và sẽ được tự động sửa ngay tức thì.

### Tương thích MySQL và PostgreSQL

Công cụ cơ sở dữ liệu Amazon Aurora hoàn toàn tương thích với các cơ sở dữ liệu mã nguồn mở MySQL và PostgreSQ, thường xuyên cập nhật các tính năng tương thích với các phiên bản mới. Điều này có nghĩa là bạn có thể dễ dàng di chuyển cơ sở dữ liệu MySQL hoặc PostgreSQL đến Aurora bằng các công cụ migration chuẩn MySQL hoặc PostgreSQL hoặc snapshots.

Aurora nhanh gấp 5 lần so với MySQL. Thử nghiệm với SysBench trên instance r3.8xlarge chỉ ra rằng: Amazon Aurora thực hiện 500,000 SELECTs/sec và 100,000 updates/sec, nhanh hơn 5 lần so với MySQL cùng chạy trên phần cứng tương tự.

Bạn có thể sử dụng `Fast Insert` để nâng cao hiệu suất khi insert song song. Fast insert là một cách tăng hiệu năng bằng cách insert song song được sắp xếp bởi khoá primay key, nó sử dụng các câu truy vấn ‘LOAD DATA’ và ‘INSERT INTO … SELECT …’. Nó cache vị trí của con trỏ trong quá trình duyệt index khi đang thực hiện câu truy vấn, điều đó giúp bỏ bớt quá trình duyệt lại index không cần thiết.

### Quản lý hoàn toàn

Amazon Aurora được quản lý đầy đủ bởi Amazon Relational Database Service (RDS). Bạn không còn cần phải lo lắng về các tác vụ quản lý cơ sở dữ liệu như cung cấp phần cứng, vá lỗi phần mềm, thiết lập, cấu hình hoặc sao lưu. Aurora tự động và liên tục giám sát và sao lưu cơ sở dữ liệu của bạn lên Amazon S3, cho phép khôi phục từng điểm một. Bạn có thể theo dõi hiệu suất của cơ sở dữ liệu bằng cách sử dụng Amazon CloudWatch, Enhanced Monitoring, or Performance Insights, một công cụ dễ sử dụng giúp bạn nhanh chóng phát hiện các vấn đề về hiệu suất.