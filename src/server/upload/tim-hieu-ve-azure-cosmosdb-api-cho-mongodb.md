Như các bạn đã biết - trong CosmosDB có 5 Core (SQL) cho các bạn lựa chọn để tương thích với  các yêu cầu của người dùng, bao gồm: <br>
- Core (SQL) <br>
- Azure Cosmos DB API for MongoDB<br>
- Cassandra<br>
- Azure Table<br>
- Gremlin (Graph)<br>

Ở bài trước mình đã có giới thiệu cách sử dụng cơ bản của Core (SQL) rồi, nên hôm nay chúng ta cùng tìm hiểu về Azure Cosmos DB API for MongoDB <br>
## Giới thiệu Azure Cosmos DB API cho MongoDB
Nói đến Azure Cosmos DB API cho MongoDB thì chắc chắn có thể hiểu rằng bản chất của cơ sở dữ liệu này chính là mongoDB.<br>
Đúng như vậy Azure Cosmos DB API cho MongoDB sẽ giúp bạn dễ dàng sử dụng Cosmos DB như thể nó chính là một cơ sở dữ liệu MongoDB. Từ đó bạn có thể tận dụng kiến thức, trải nghiệm MongoDB của mình và tiếp tục sử dụng các trình điều khiển, SDK và công cụ MongoDB yêu thích của mình bằng cách sử dụng API để kết nối với tài khoản MongoDB.
Azure CosmosDb API cho MongoDb có những lợi ích sau:
- Khả năng mở rộng tức thời
- Sharding tự động và minh bạch
- Tính khả dụng của Five 9: đảm bảo dữ liệu của bạn luôn sẵn sàng phục vụ bạn
- Hiệu quả về chi phí, chi tiết, khả năng mở rộng không giới hạn
- Triển khai không máy chủ (Serverless deployments): Với Serverless, bạn chỉ bị tính phí cho mỗi hoạt động và không phải trả tiền cho cơ sở dữ liệu khi bạn không sử dụng nó
- Free Tier: bạn sẽ nhận được 1000 RU / s đầu tiên và 25 GB dung lượng lưu trữ trong tài khoản của mình miễn phí vĩnh viễn, áp dụng ở cấp tài khoản
- Nâng cấp mất vài giây: việc thay đổi phiên bản trở nên đơn giản như bật một công tắc mà không có thời gian chết.
- Phân tích thời gian thực (HTAP) ở mọi quy mô: API cho MongoDB cung cấp khả năng chạy các truy vấn phân tích phức tạp cho các trường hợp sử dụng như thông tin kinh doanh dựa trên dữ liệu cơ sở dữ liệu của bạn trong thời gian thực mà không ảnh hưởng đến cơ sở dữ liệu của bạn.
## Sử dụng Azure Cosmos DB API cho MongoDB
### 1. Tạo Azure Cosmos DB API cho MongoDb với Portal 
Vào portal chọn Create CosmosDb, như hình bên dưới, từ đó ta có thể lựa chọn Azure CosmosDb API cho MongoDB.
![](https://images.viblo.asia/c423ce73-f4f8-4272-a5fa-24834a25ccd9.png)
Hoặc có thể chọn trực tiếp dịch vụ Azure CosmosDB API for MongoDB trên Azure - nếu vậy thì sẽ vào trực tiếp giao diện tạo luôn, không qua bước trung gian. 
![](https://images.viblo.asia/49489dba-19d2-42a4-a32a-7790598621c9.png)
Các bước tạo tiếp theo như những bài trước mình đã hướng dẫn - khá là dễ. <br>
Chúng ta cần nên chú ý ở phần Capacity mode:<br>
    - Nếu chọn Provisioned throughput: nghĩa là mình đang sử dụng Free Tier<br>
    - Nếu chọn Serverless thì bạn chỉ bị tính phí cho mỗi hoạt động và không phải trả tiền cho cơ sở dữ liệu khi bạn không sử dụng nó.<br>
![](https://images.viblo.asia/0ace4c02-5e71-4f06-8b58-d461cf11c44d.png)
Nên ở đây mình vào giao diện sau khi tạo xong luôn nha. 
![](https://images.viblo.asia/9d3c8479-929f-472c-9ec6-6fdb29912514.png)
### 2. Kết nối MongoDB với Azure CosmosDB
Trên giao diện của Azure thì chúng ta có 2 cách để lấy connect string trên Azure để kết nối MongoDb với Azure. 
- Cách 1: có thể sử dụng dạng quick start, tuy nhiên ở đây chỉ hỗ trợ 1 số nền tảng như hình bên dưới. 
![](https://images.viblo.asia/dca47e7d-692d-4cf0-9fa4-dac9f9b2527e.png)
Sau khi có được đoạn mã rồi, thì ta cứ thao tác và sử dụng thôi. 
- Cách 2: Chúng ta có thể thao tác theo tùy chỉnh của bản thân dựa trên các cung cấp từ Azure. Vào phần connection string, ta được đầy đủ thông tin như bên dưới. 
![](https://images.viblo.asia/a3c191e9-3cc7-4100-848a-6c140ecb6cb9.png)
- Định dạng chuỗi kết nối cơ bản với mongoDB: <br>
```mongodb: // username: password @ host: port / [database]? ssl = true```
1. username (bắt buộc): Tên tài khoản Cosmos.
2. password (bắt buộc): Mật khẩu tài khoản Cosmos.
3. host (bắt buộc): FQDN của tài khoản Cosmos.
4. port (bắt buộc): 10255.
5. database (tùy chọn): Cơ sở dữ liệu mà kết nối sử dụng. Nếu không có cơ sở dữ liệu nào được cung cấp, thì cơ sở dữ liệu mặc định là "test".
6. ssl = true (bắt buộc)
### 3. Sử dụng Studio 3T để kết nối với Azure CosmosDB
Chúng ta có thể sử dụng Studio 3T để kết nối với Azure CosmosDB thông qua việc sử dụng connect string trên Azure để kết nối DB trên Studio 3T. <br>
Từ đó, ở phần mềm Studio 3T chúng ta có thể thao tác thêm database, collection và document. <br>
Tương tự như vậy chúng ta cũng có thể kết nối với MongoDB Compass hay Robo 3T hoặc Node.js Mongoose. <br>



Link tham khảo: https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction