# I. Lời mởi đầu
Đúng như tiêu đề của nó, series bài viết này nhằm mục đích cung cấp cho các bạn fresher những khái niệm, kiến thức cơ bản nhất để bắt đầu với AWS.

Vì mới bắt đầu nên ai cũng sẽ ngại đọc dài, hay đọc các khái niệm phức tạp nên mình sẽ cố gắng chia nhỏ từng bài trong series để các bạn không ngợp với số lượng lớn khái niệm và cấu trúc phức tạp được đưa ra.

Nào cùng bắt đầu thôi! (len)

# II. AWS là gì?
`Amazon Web Services (AWS)` là nền tảng dịch vụ đám mây an toàn, mang đến khả năng tính toán, lưu trữ cơ sở dữ liệu, phân phối nội dung và các chức năng khác nhằm giúp các doanh nghiệp mở rộng và phát triển.

Trước đây muốn có một trang web hay một ứng dụng nào đó, các công ty đều phải có hệ thống server vật lý của riêng mình. Việc mua các thiết bị phần cứng đã tốn kém rồi, việc lắp đặt và cài cắm cho chúng hoạt động càng tốn thời gian hơn. Hơn nữa, việc vận hành vào bảo trì sẽ cần có nhân viên IT chuyên trách, khó khăn trong việc mở rộng khi lượng người dùng tăng cao, hay giảm xuống trong các giờ thấp điểm - Khả năng scale rất thấp. Túm lại là chi phí rất cao. Điện toán đám mây là giải pháp cho vấn đề này.

Vậy điện toán đám mây là gì?

Điện toán đám mây là việc cung cấp theo yêu cầu sức mạnh tính toán, lưu trữ cơ sở dữ liệu, ứng dụng và các tài nguyên CNTT khác thông qua một nền tảng dịch vụ đám mây qua internet với chính sách thanh toán theo mức sử dụng.

Để bắt đầu với AWS các bạn có thể đăng ký tại đây: [Đăng ký](https://aws.amazon.com/vi/?nc1=f_ls)

# III Cấu trúc cơ bản
Trong series ngắn này chúng ta sẽ chỉ tập trung tạo ra một server có cấu trúc với các thành phần services cơ bản nhất trên AWS như sơ đồ dưới đây:

![](https://images.viblo.asia/0edf2bf2-e4ec-4226-b2a1-7c5dfd903313.png)

**Trong đó**

## 1. Virtual Private Cloud (VPC)
`Amazon Virtual Private Cloud (Amazon VPC)` cho phép bạn tạo ra một Private Cloud ảo độc lập, nơi bạn có thể khởi chạy các tài nguyên AWS trong một mạng ảo do bạn xác định. Bạn có toàn quyền kiểm soát môi trường mạng ảo của mình, bao gồm lựa chọn dải địa chỉ IP, tạo các mạng con, cấu hình các bảng định tuyến và cổng kết nối mạng. Bạn có thể sử dụng cả IPv4 và IPv6 trên VPC để truy cập tài nguyên và ứng dụng một cách bảo mật và dễ dàng.

Chúng ta sẽ đi chi tiết về các thành phần và cách sử dụng chúng trong các phần sau.

Nếu các bạn muốn tìm hiểu trước có thể tham khảo trong link sau: 
[Liên kết VPC](https://aws.amazon.com/vi/vpc/?nc1=f_ls)

## 2. Elastic Load Balancing (ELB)
`Elastic Load Balancing` là dịch vụ tự động phân phối lưu lượng truy cập đến của ứng dụng cho nhiều mục tiêu, chẳng hạn các máy ảo Amazon EC2, container và địa chỉ IP. Elastic Load Balancing có thể xử lý các tải lưu lượng truy cập khác nhau của ứng dụng của bạn trên một Vùng (Region) sẵn sàng hoặc trên nhiều Vùng sẵn sàng khác nhau. Elastic Load Balancing cung cấp ba loại bộ cân bằng tải, tất cả đều có độ khả dụng cao, tự động điều chỉnh quy mô và khả năng bảo mật mạnh mẽ cần thiết để giúp cho ứng dụng của bạn có được dung sai cao.

[Liên kết ELB](https://aws.amazon.com/vi/elasticloadbalancing/?nc1=f_ls)

## 3. Elastic Compute Cloud (EC2)
`Elastic Compute Cloud` là dịch vụ cung cấp năng lực điện toán đám mây có khả năng thay đổi kích thước (size) linh hoạt. Với EC2, người dùng không cần dự trước khoản phí đầu tư cho phần cứng mà có thể ưu tiên tập trung vào phát triển và triển khai ứng dụng của mình trước. Có thể khởi động trước một số lượng server ảo cần thiết để bắt đầu thiết lập bảo mật, network, và quản lý bộ nhớ. EC2 cho phép mở rộng hoặc giảm cấu hình tuỳ theo sự thay đổi yêu cầu, nhu cầu với hệ thống nên không cần phải dự trước số lượng người dùng, lưu lượng sử dụng.

[Liên kết EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)

## 4. Relational Database Service (RDS)
Amazon Relational Database Service (Amazon RDS) giúp bạn dễ dàng thiết lập, vận hành và thay đổi quy mô cơ sở dữ liệu quan hệ trên đám mây. Dịch vụ này cung cấp dung lượng có thể thay đổi kích cỡ với mức chi phí hiệu quả trong khi tự động hóa các tác vụ quản trị mất nhiều thời gian chẳng hạn như cung cấp phần cứng, thiết lập cơ sở dữ liệu, vá lỗi và sao lưu. Dịch vụ này cho phép bạn tập trung vào các ứng dụng của mình nhằm giúp ứng dụng có hiệu suất, tính sẵn sàng, mức độ bảo mật cũng như khả năng tương thích cao như mong đợi.

Amazon RDS có sẵn trên một số loại phiên bản cơ sở dữ liệu – được tối ưu hóa về bộ nhớ, hiệu suất hoặc I/O – đồng thời cung cấp cho bạn sáu công cụ cơ sở dữ liệu quen thuộc để lựa chọn gồm có `Amazon Aurora`, `PostgreSQL`, `MySQL`, `MariaDB`, `Oracle` và `Microsoft SQL Server`. Trong đó `Amazon Aurora` là hệ quản trị cơ sở dữ liệu được Amazon tối ưu hoá cho cloud và tương thích với `MySQL`.

[Liên kết RDS](https://aws.amazon.com/vi/rds/?nc1=f_ls)

# Kết
Trong phần tổng quan này mình đã giới thiệu tới các bạn các dịch vụ và khái niệm cơ bản, quan trọng nhất khi làm việc với AWS.
Phần tiếp theo chúng ta sẽ đi sâu tìm hiểu nguyên lý hoạt động và cách cài đặt của từng thành phần này.