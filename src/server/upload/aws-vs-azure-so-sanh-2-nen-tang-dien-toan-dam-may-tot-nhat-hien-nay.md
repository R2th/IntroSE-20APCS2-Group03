![](https://images.viblo.asia/b92248be-7faa-4852-b615-a9a3d00404db.jpg)

Với việc các nền tảng cloud đang lên ngôi và được ứng dụng mạnh, đã và đang nhiều công ty cung cấp cloud công bố rằng mình là số 1 trong lĩnh vực này. Tuy nhiên thì hiện tại có 2 cloud đang được sử dụng rộng rãi trên thế giới là Azure của Microsoft và AWS của Amazon. Vì vậy, trong các trường hợp cần đưa sản phẩm lên cloud, câu hỏi đặt ra là Azure hay AWS? Đó cũng là lý do chúng ta sẽ so sánh 2 nền tảng này tại đây.

Ở đây, các khía cạnh được đưa ra so sánh bao gồm:
1. Các chức năng tổng quan
2. Giá
3. Khả năng tính toán
4. Dịch vụ lưu trữ
5. Cơ sở dữ liệu
6. Các dịch vụ networking
7. Hỗ trợ cho Container và Orchestration
8. Tính sử dụng rộng rãi
9. Điểm đánh giá cuối
# AWS vs Azure: Các chức năng tổng quan

|  | AWS | Azure |
| -------- | -------- | -------- |
| Năm ra mắt     | 2006     | 2010     |
| Tính mở mã nguồn | Mở nhiều với cộng đồng open-source | Đóng nhiều với cộng đồng open-source|
| Hybrid Cloud | Đang xây dựng | Lựa chọn tốt ở trong thị trường Hybrid Cloud |
| Giấy phép sử dụng| Khá linh hoạt| Đang cố gắng đuổi kịp AWS| 
|Tích hợp với họ hàng Linux| Hỗ trợ tốt cho Linux | Đang xây dựng |
# Giá
Cả dịch vụ đều offer theo mô hình dùng tới đâu trả tới đó. AWS thì thu theo giờ, trong khi Azure thu theo phút. Khi bạn cần theo 1 thời gian ngắn thì Azure sẽ là sự lựa chọn tốt hơn, nhưng tới các giai đoạn phát triển sản phẩm về sau thì AWS sẽ cho 1 sự giảm về chi phí nhiều hơn.

![](https://images.viblo.asia/39cb186b-346c-48d6-84c6-a5a71195cb66.png)

# Các dịch vụ tính toán
Điểm so sánh tiếp theo là về các dịch vụ tính toán. Dịch vụ tính toán hay ở đây nói tắt tính toán là một trong những dịch vụ cốt lõi khi nói đến Điện toán đám mây, điều này có thể hiểu được khi chúng ta có từ điện tính trong thuật ngữ Điện toán đám mây.
Với số lượng lớn dữ liệu được tạo ra trong những ngày này, luôn có nhu cầu xử lý nhanh hơn. Dịch vụ điện toán đảm bảo bạn có thể sinh ra các thể hiện trong vài phút và mở rộng các thể hiện ngay lập tức nếu cần. AWS và Azure đều có các dịch vụ phục vụ cho những nhu cầu này.

![](https://images.viblo.asia/2e26a68a-45e7-41e3-8e54-eb543c0ae107.png)

Phe AWS có EC2, Elastic Beanstalk, AWS Lambda, ECS và rất nhiều thứ khác. Azure cũng có trong tay các đối trọng là Azure Virtual Machine, App Service, Azure Functions, Container service, ... Như vậy chúng ta có thể 1 độ cạnh tranh rất cao, bên nào có gì thì bên kia cũng có cái tương tự.

Nhưng mà, nếu kết hợp với yếu tố 2 ở trên 1 chút, **các dịch vụ của Azure lại có khả năng khiến cho người sử dụng phải ăn mỳ tôm cả tháng nếu kích thước sử dụng tăng lên**. Với 1 instance ảo 256GB RAM và 64vPCU, AWS chỉ đánh $3.20/giờ, trong khi Azure đánh $6.76/giờ(hơn gấp đôi AWS).
# Dịch vụ lưu trữ
![](https://images.viblo.asia/f5fff2a8-2f5f-475a-97f4-4006aa5aad47.png)

AWS có AWS S3, EBS và Glacier còn Azure Storage Services có Blob Storage, Disk Storage và Standard Archive.

AWS S3 đảm bảo tính sẵn sàng cao và sao chép tự động giữa các phần. Khi nói đến lưu trữ tạm thời trong AWS, nó sẽ bắt đầu hoạt động mỗi khi instance bắt đầu và dừng. Khi chấm dứt, nó cung cấp lưu trữ khối tương tự như đĩa cứng và có thể được gắn vào bất kỳ phiên bản EC2 nào hoặc được giữ riêng.

Với Azure, nó sử dụng lưu trữ tạm thời và các page blob cho VM. Azure có tùy chọn Block Storage làm đối trọng với S3 trong AWS. Ngoài ra, Azure cũng cung cấp hai loại trong kho lưu trữ của họ, lưu trữ hot và cold.

Vì vậy, về Dịch vụ lưu trữ, chúng ta so sánh tiếp khi xét về Dịch vụ cơ sở dữ liệu ngay dưới đây.
# Dịch vụ cơ sở dữ liệu
Dữ liệu ngày nay được sinh ra dưới đủ mọi loại định dạng, nên cơ sở dữ liệu lưu trữ data cũng cần được tiến hoá. Và cũng như những yếu tố trên, AWS và Azure đều có các dịch vụ hỗ trợ các dữ liệu cả mang tính cấu trúc lẫn phi cấu trúc.

![](https://images.viblo.asia/9d7a24a0-b76e-4319-a5be-3a01d7ce4c4b.png)

Nếu độ ổn định là cái bạn đang tìm kiếm thì AWS có Amazon RDS và Azure có Azure SQL Server Database. Amazon RDS hỗ trợ nhiều công cụ cơ sở dữ liệu khác nhau như MariaDB, Amazon Aurora, MySQL, Microsoft SQL, PostgreSQL và Oracle trong khi nói đến Azure, SQL Server Database chỉ dựa trên SQL như tên cho thấy.

So sánh về giao diện, Azure thân thiện với người dùng hơn, trong khi đó AWS cung cấp tốt hơn các hoạt động với instance. Mỗi bên đều có 1 đặc điểm riêng. Về khả năng tiến xa của các công cụ này, chúng đều khá hỗ trợ đối với việc phân tích thống kê và Big Data. AWS có EMR trong khi Azure có HD Insights cho cùng mục đích. Azure cũng cung cấp Cortana Intelligence Suite đi kèm với Hadoop, Spark, Storm và HBase.

Về mặt môi trường thuật lợi, AWS là môi trường thuận lợi hơn cho Big Data. Điều này cần thêm dẫn chứng ở mục tiếp theo về các dịch vụ Networking.
# Các dịch vụ Networking
Amazon Virtual Private Cloud (VPC) cho phép tạo các mạng độc lập dưới 1 chiếc ô Cloud. Điều này cho phép người dùng tạo mạng con,  bảng route, dải địa chỉ IP riêng và cổng mạng.

Microsoft Azure Virtual Network là đối trọng của VPC, cho phép bạn thực hiện tất cả những gì VPC làm. Cả hai nhà cung cấp đều có giải pháp để mở rộng trung tâm dữ liệu tại chỗ vào các tùy chọn đám mây và tường lửa.
# Hỗ trợ Container và Orchestration
AWS hỗ trợ tốt hơn cho Big Data. Nó có đủ các dịch vụ hỗ trợ IoT, phát triển ứng dụng điện thoại hay thậm chí là tạo 1 môi trường điện toán tuỳ thuộc nhu cầu. Hỗ trợ tốt cho Docker.

Ở mặt này, Microsoft bằng và thậm chí có 1 bước hơn. Đó là đưa ra Hadoop để hỗ trợ Azure HDInsight. Azure tích hợp Windows Server 2016 giúp cho việc sử dụng được Docker container, kể cả các loại Windows container và Hyper-V container.

Tất cả platform thì dù là container của Docker hay AWS thì đều chiến được hết.
# Tính sử dụng rộng rãi
Ở đây xét về mặt hỗ trợ cho các cơ quan chính phủ. AWS hợp tác với rất nhiều cơ quan chính phủ trên toàn thế giới. Họ cũng cung cấp các tính năng bảo mật tốt và phù hợp cho từng đối tượng cụ thể, điều cực kì quan trọng khi xử lý dữ liệu nhạy cảm.

Còn Azure đang có 50 đối tác loại trên, trong đó có ITAR, DISA, HIPAA, CJIS, FIPS. Với vấn đề bảo mật và an toàn thông tin thì cạnh tranh sát nách AWS.
# Chấm điểm
Và sau 1 hồi so sánh thì thật khó để có thể chọn ra 1 người chiến thắng trong trận đấu này. Azure có thế mạnh về Hybrid Cloud và tích hợp các công cụ của Microsoft, trong khi AWS lại linh hoạt và nhiều tính năng hơn. Cuối cùng thì vẫn phải phụ thuộc vào yêu cầu sản phẩm và công ty bạn.
# Nhận xét cá nhân
Thực ra với việc phần lớn các hệ thống ngày nay đều core Unix thì với cá nhân mình vẫn chọn AWS hơn. Tuy vậy các động thái gần đây của Microsoft cho thấy họ chú trọng vào nền tảng và đầu tư mã nguồn mở nên Azure sau sẽ có những tiến bộ nhất định và cùng kéo AWS lên. 2 cái này giống như chính trị của 1 số nước như Anh, Mỹ: tồn tại 2 ông là chính, luôn đối đầu nhau nhưng không thể sống thiếu nhau, vì nếu thiếu nhau các đối thủ ít tính cạnh tranh hơn sẽ vùng lên(trong cloud hiện có GCP của Google hay các loại Cloud bên TQ. Xét về phổ biến thì AWS và Azure đang đứng đầu). Nên đánh giá cá nhân thì Microsoft hiện là Trâu chậm uống nước hơi đục và còn tiến được(không như mình là không có nước mà uống :cry:)
# Tham khảo
https://medium.com/edureka/aws-vs-azure-1a882339f127