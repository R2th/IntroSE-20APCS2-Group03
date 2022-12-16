1. Cloud computing<br>
Cloud computing được định nghĩa như sau: Cloud computing là điện toán đám mây, cung cấp tài nguyên IT theo yêu cầu thông qua Internet. Tức là bạn có thể sử dụng tất tần tật những tài nguyên như server, storage, memory ... được lưu trữ trong đám mây mà không cần phải thanh toán trước <br>
2. Cloud computing deployment models 
    1.     Cloud
        * Implement application hoàn toàn trên Cloud
        * Duy chuyển application đã có sẵn lên Cloud
        * Xây dựng cũng như thiết kế application mới hoàn toàn trên Cloud
    Ví dụ: Có thể hoàn toàn xây dựng mới 1 application bằng server ảo, data base, internet component trên Cloud.
    2.     On-premises
        * Sử dụng tool quản lý resource và tool ảo hóa để deploy resource.
        * Sử dụng kỹ thuật quản lý application và kỹ thuật ảo hóa để cải thiện việc sử dụng resource.
    3.     Hybrid
        Hybrid tạm coi là đứa con lai, kết hợp giữa Cloud và On-premises
        * Kết nối trực tiếp cơ sở hạ tầng của on-premises với tài nguyên của Cloud.
        * Tích hợp tài nguyên của Cloud với application truyền thống.
3.  EC2 <br>
Amazon Elastic Compute Cloud (Amazon EC2) là dịch vụ cung cấp khả năng điện toán có tính năng bảo mật và thay đổi kích thước trên đám mây. <br>
EC2 Instance type
    1.      General Purpose
        Loại phiên bản đa dụng, cung cấp những tài nguyên như computing, memory, network ở mức cân bằng. Có thể sử dụng trong nhiều trường hợp như application sever, game sever, data base quy mô vừa và nhỏ...
    2.     Compute Optimized
        Loại này thích hợp cho ứng dụng có thể nhận lợi ích từ bộ xử lý hiệu suất cao. <br>
        Phiên bản này đồng dạng với General Purpose là có thể sử dụng trong web server, application server, game server. Tuy nhiên, nó thích hợp cho những server chuyên về game, server application phụ trách tính toán cao, web server có hiệu năng cao, có khả năng xử lý đồng loạt.
    3.         Memory Optimized
        Phiên bản này được thiết kế để cung cấp hiệu suất nhanh cho các tải công việc cần xử lý các bộ dữ liệu trong bộ nhớ. Thích hợp trong việc xử lý database có hiệu suất cao, xử lý thời gian thực với lượng lớn data phi cấu trúc.
    4.     Accelerated Computing
        Phiên bản điện toán tăng tốc sử dụng các bộ tăng tốc phần cứng hay còn gọi là bộ đồng xử lý để thực hiện một số chức năng (như tính toán số dấu phẩy động, xử lý đồ họa hoặc so khớp mẫu dữ liệu) hiệu quả hơn so với phần mềm chạy trên nhiều CPU.
    5.     Storage Optimized
        Phiên bản bộ lưu trữ tối ưu được thiết kế cho các tải công việc yêu cầu quyền truy cập đọc và ghi tuần tự cao vào các bộ dữ liệu rất lớn trên bộ lưu trữ cục bộ. Các phiên bản này được tối ưu hóa để cung cấp hoạt động I/O trên phút (IOPS) ngẫu nhiên có độ trễ thấp hơn hàng nghìn lần cho các ứng dụng.
4. Tính phí EC2<br>
> Phần sau nha. Mà có thể phần sau mình sẽ viết tiếng Nhật. Cơ bản là mình hơi lười dịch sang tiếng Việt với mình cũng có ý định thi cái chứng chỉ này bằng tiếng Nhật (bow)