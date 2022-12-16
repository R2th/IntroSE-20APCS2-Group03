### Azure Cosmos DB là gì?
Azure Cosmos DB bắt đầu với tên gọi Dự án Florence Florence năm 2010 để giải quyết các điểm đau của nhà phát triển phải đối mặt với các ứng dụng quy mô lớn trong Microsoft. Quan sát rằng những thách thức trong việc xây dựng các ứng dụng phân tán trên toàn cầu không phải là vấn đề duy nhất đối với Microsoft, năm 2015 microsoft đã tạo ra thế hệ đầu tiên của công nghệ này cho các nhà phát triển Azure dưới dạng Azure DocumentDB. Kể từ đó đã thêm dần các tính năng mới và giới thiệu các khả năng mới quan trọng. Azure Cosmos DB là kết quả của quá trình đó.<br>
Azure Cosmos DB, một dịch vụ lữu trữ & quản lý database hỗ trợ nhiều data model (multi-model) & có khả năng scale ở phạm vi toàn cầu, giúp bạn nhanh chóng xây dựng được một giải pháp database trên cloud với tính ổn định cao. Dịch vụ này cung cấp các tính năng truy vấn SQL phong phú và quen thuộc với độ trễ đồng nhất thấp trong dữ liệu JSON ít sơ đồ. 
### Các ưu điểm của Azure Cosmos DB
**- Khả năng sao chép dữ liệu quy mô toàn cầu**<br>
Cosmos DB cho phép bạn xây dựng các ứng dụng có độ phản hồi và tính khả dụng cao trên toàn thế giới. Cosmos DB sao chép dữ liệu của bạn một cách liên tục bất kể người dùng của bạn có ở đâu đi nữa, vì vậy người dùng của bạn có thể tương tác được với bản sao của dữ liệu gần nhất với họ.<br>
Cosmos DB cũng cho phép bạn thêm vào hoặc xóa đi bất kỳ khu vực Azure nào khỏi tài khoản Cosmos của bạn chỉ bằng một cú click chuột vô cùng đơn giản. Cosmos DB sẽ sao chép liền mạch dữ liệu của bạn đến tất cả các khu vực được liên kết với tài khoản Cosmos<br>
**- Đảm bảo độ trễ thấp**<br>
Với khả năng sao chép dữ liệu quy mô toàn cầu như vậy, ứng dụng kết nối tới Azure Cosmos DB sẽ có độ trễ rất thấp với 99% các thao tác với dữ liệu được đảm bảo ở mức dưới 10 ms cho đọc và 15 ms cho ghi.<br>
**- Luôn luôn khả dụng**<br>
Nhờ tích hợp sâu với cơ sở hạ tầng Azure và transparent multi-master replication (sao chép đa chủ), tính khả dụng của Cosmos DB lên tới 99,999%. Cosmos DB cung cấp giải pháp “chống sụp đổ” dựa trên cơ chế chuyển đổi dự phòng (failover) cho hệ thống database lưu trữ trên đây khi xảy ra các sự cố. Cosmos DB có khả năng xử lý tự động theo thứ tự ưu tiên.<br>
**- Khả năng mở rộng linh hoạt**<br>
Cosmos DB cung cấp khả năng mở rộng vô cùng linh hoạt cho cả việc ghi và đọc của bạn trên toàn thế giới. Bạn có thể scale up linh hoạt từ hàng ngàn đến hàng trăm triệu request/giây. Khả năng này giúp bạn đối phó với các đột biến bất ngờ trong workload của bạn mà không cần phải over-provision.<br>
**- 5 cấp độ đảm bảo tính nhất quán của dữ liệu**<br>
Một trong những bài toán cần phải giải quyết khi thực hiện replicate dữ liệu đó là đảm bảo tính nhất quán của dữ liệu. 5 cấp độ là: Strong, Bounded Staleness, Session, Consistent Prefix, Eventual.<br><br>
![](https://images.viblo.asia/3f939c7b-6c62-4746-bf44-8f1b199fb568.png)

**- Dịch vụ cơ sở dữ liệu Cosmos DB đã được thử nghiệm thực tế**<br>
Cosmos DB đã được nhiều sản phẩm của Microsoft sử dụng cho các ứng dụng quan trọng ở quy mô toàn cầu, bao gồm Skype, Xbox, Office 365, Azure và nhiều sản phẩm khác. <br>
**- Tiết kiệm rõ rệt**<br>
Bởi Cosmos DB là một dịch vụ đã được quản lý hoàn toàn nên bạn sẽ không cần phải quản lý và vận hành các trung tâm dữ liệu vô cùng phức tạp cho phần mềm cơ sơ dữ liệu của mình, cũng như không phải trả bất kỳ khoản phí nào cho license hay các dịch vụ hỗ trợ khác.<br>
**- Các giải pháp được lợi từ Azure Cosmos DB**<br>
Chờ vào tính khả dụng cao, độ trễ thấp và khả năng điều chỉnh tính nhất quán mà Cosmos DB đem lại nên bất kỳ ứng dụng web, mobile, ... nào cần xử lý một lượng dữ liệu khổng lồ, cùng với khả năng đọc và ghi ở quy mô toàn cầu với thời gian phản hồi ngắn sẽ đều được lợi từ Cosmos DB.<br>
**- Phát triển ứng dụng trên Cosmos DB bằng các API Open Source Software phổ biến**<br>
Cosmos DB triển khai API cho Cassandra, MongoDB, Gremlin và Azure Table Storage. Bằng cách hỗ trợ các giao thức dây thường được sử dụng cho các API NoSQL<br>
### Tạo tài khoản Azure Cosmos BD bằng Azure portal
Ở phần này sẽ hướng dẫn cách tạo Azure Cosmos DB SQL API,  database, container và items.<br>
**Tạo Azure Cosmos DB.**<br>
Nếu bạn chưa có tài khoản Azure thì hãy tạo một tài khoản Azure trước khi bắt đầu.<br>
- Vào Azure Portal (https://portal.azure.com/) sẽ có giao diện như dưới đây.<br>
![](https://images.viblo.asia/35a1852a-9eab-492d-8d22-349ea0761ecf.png)<br>
Sau đó chọn Azure Cosmos DB<br><br>
*Trường hợp không có Azure Comos DB sẵn như hình, có thể vào "More services" và tìm kiếm Azure Cosmos DB.<br>
![](https://images.viblo.asia/b758cf2d-cdab-4ac9-bf1d-f03cdb3d59d9.png)<br>
- Giao diện trong Azure Comos DB<br>
![](https://images.viblo.asia/2fa53f9e-f332-43ed-9199-6bc2801720e3.png)<br><br>
- Click +ADD và điền vào những thông tin cơ bản.<br>
![](https://images.viblo.asia/45d89ca3-3272-48f7-8b80-b0bc3a5e3ed0.png)<br>
- Trong quá trình tạo, chúng ta cần điền các thông tin đầy đủ trong bảng sau: <br><br>
![](https://images.viblo.asia/1b9560d1-1c1d-47ac-aa8a-0999879b442a.png)<br>
- Chọn Review + Create
![](https://images.viblo.asia/ef6fa412-a150-4748-8339-de3bcbffe25d.png)<br>
- Tiếp tục chọn Create, đợi vài phút để tài khoản được tạo. Và đợi page hiển thị **Your deployment is complete.**<br><br>
![](https://images.viblo.asia/1664a3c8-7bd5-4945-a1a5-03a7cb956ec8.png)<br>
Hình này còn đang ở quá trình tạo -> sau khi chạy xong thì  **Deyployment is in progress <-> Your deployment is complete.**<br>
- Bây giờ bạn có thể vào tài khoản Azure Cosmos DB thực hiện các thao tác cần thiết như : add Database, add container, add dữ liệu vào DB đã tạo, query Data...<br><br>
![](https://images.viblo.asia/f3fe1a08-e2d4-4571-a3a2-2b32840d21fa.png)

<br>Bài viết mình hôm nay hướng dẫn đến đây là kết thúc - Sẽ có các nội dung tiếp nối ở các bài tiếp theo, mong nhận được sự góp ý từ mọi người.<br>
Xin chân thành cám ơn!<br><br>
Nguồn tham khảo :<br>
https://docs.microsoft.com/en-us/azure/cosmos-db/create-cosmosdb-resources-portal<br>
https://azure.soft365.vn/azure-cosmos-db-dich-vu-co-so-du-lieu-voi-nhung-tinh-nang-doc-nhat/