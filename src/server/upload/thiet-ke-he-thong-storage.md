![](https://images.viblo.asia/0ed8a8e9-bcf3-47f8-88ff-381a1e0c62fe.png)
Storage là một phần quan trọng của các website ngày nay. Trong bài viết này, mình sẽ giới thiệu về các khái niệm cơ bản, các loại storage phổ biến nhất.
# 1.Khái niệm
### 1.1 RAID
Cấp độ chuẩn **RAID** bao gồm một bộ cấu hình cơ bản sử dụng các kĩ thuật striping, mirroring hoặc parity để tạo ra các nơi lưu trữ đáng tin cậy từ nhiều ổ đĩa HDD hoặc SSD. Một hệ thống RAID bao gồm hai hoặc nhiều drivers làm việc song song. Các cấp độ RAID chính là 0, 1, 5, 6, 10.
* **RAID 0**- striping, dữ liệu được chia thành các blocks và được ghi trên tất cả drivers trong mảng.

![](https://images.viblo.asia/53cf9d00-aadd-4777-891f-50fcb1135ea5.png)


* **RAID 1**- mirroing: ít nhất 2 drivers chứa dữ liệu giống nhau. Nếu một driver lỗi, các drivers khác vẫn hoạt động. 

![](https://images.viblo.asia/e46ae8aa-216f-4a75-b0f6-c603d0b3184c.png)

* **RAID 5** - striping theo cặp yêu cầu sử dụng ít nhất 3 drivers, striping dữ liệu trên nhiều ổ đĩa như RAID 0, nhưng cũng có cặp được phân tán trên các drivers. Nếu 1 driver bị lỗi, dữ liệu được ghép mảnh với nhau sử dụng các thông tin được ghép cặp lưu trữ được lưu trữ trên các drivers khác

![](https://images.viblo.asia/837a9712-ba99-4896-bc64-e2de982603cd.png)

* **RAID 6** - striping với 2 lần ghép đôi. RAID6 giống với RAID5, nhưng các dữ liệu ghép đôi được ghi tới 2 drivers. Điều đó có nghĩa là, chuẩn này yêu cầu ít nhất 4 drivers và có thể chịu được 2 ổ chết đồng thời. 

![](https://images.viblo.asia/45e7c968-8c3a-469f-9d42-decd497d1d2e.png)

* **RAID 10** - kết hợp mirroring và striping. Nó bao gồm ít nhất 4 drivers và kết hợp lợi ích của RAID 0 và RAID 1 trong một hệ thống đơn. Nó cung cấp khả năng bảo mật bằng việc mirroring tất cả dữ liệu trên drivers thứ hai trong khi striping trên các bộ drivers để tăng tốc độ truyền dữ liệu. Điều đó có nghĩa là RAID10 có thể cung cấp tốc độ của RAID0.

![](https://images.viblo.asia/3e3bda60-f1ca-4cf1-9b0f-60406fcbf31b.png)

* So sánh :

![](https://images.viblo.asia/b660b9d5-607b-4133-80fd-b73b95e82d52.png)

### 1.2 Volume

Volume là là một lượng lưu trữ cố định trên ổ đĩa. Khái niệm volume  thường được dùng như một từ đồng nghĩa với storage, nhưng chúng có thể có 1 ổ đĩa chứa nhiều hơn 1 volume, hoặc 1 volume trải trên nhiều ổ đĩa.

 **Volume tĩnh** : Một volume tĩnh là một volume đơn giản và dễ sử dụng, nó sẽ bao phủ toàn không gian có sẵn trên đĩa. Một volume tính không có storage pool do đó không để hỗ trợ các tính năng nâng cao như snapshot hoặc Qtier.
 
**Volume mỏng** : Nó phải được tạo bên trong 1 storage pool, được chỉ định vùng nhớ trong storage pool cũng như dữ liệu được ghi vào volume. Chỉ có kích cỡ của dữ liệu trong volume được sử dụng từ không gian pool.

**Volume dày** : Nó chỉ ra tổng kích cỡ của volume khi tạo. Không quan trọng bao nhiêu dữ liệu được lưu trữ, tổng kích cỡ sẽ luôn được sử dụng trong pool. 

# 2. Các loại storage khác nhau
### 2.1 File Storage
![](https://images.viblo.asia/010bb6ba-21c0-48a9-a733-4334a728d365.png)

File storage là một giải pháp lưu trữ dữ liệu dưới dạng các files và đại diện nó tới người dùng cuối như là kiến trúc thư mục theo tầng. Lợi ích chính đó là việc cung cấp một giải pháp thân thiện người dùng và lấy lại files. Để xác định vị trí trong file storage chúng ta cần đường dẫn đầy đủ của file. Ví dụ `/home/images/beach.jpeg`. 

File storage là kiểu lưu trữ lâu đời nhất và phổ biến nhất cho hệ thống DAS và NAS.

### 2.2 Block Storage

Block storage phân dữ liệu thành các khối (block) và lưu chúng như là các mảnh riêng biệt. Mỗi khối đều có định dang duy nhất. Như vậy một phần dữ liệu có thể lưu trữ trong môi trường Linux và phần khác có thể lưu trữ trên môi trường Windows. 

Block storage thường được cấu hình để nới lỏng sự phụ thuộc môi trường của người dùng và phân chúng ra làm nhiều phần có thể giúp việc lấy dữ liệu tốt hơn. Bất cứ khi nào dữ liệu được yêu cầu, phần mềm storage dữ tập hợp phần khối dữ liệu và gửi chúng cho người dùng. 

Block storage thường được triển khai trong môi trường SAN.

### 2.3 Object Storage
![](https://images.viblo.asia/2cf6d2cc-971a-4126-a578-d41de55ec552.png)

Object storage là một trong những hệ thống storage gần đây nhất. Nó được tạo ra ở trong ngành công nghiệp điện toán đám mây với yêu cầu lưu trữ một lượng lớn dữ liệu phi cấu trúc. Nó là cấu trúc trong đó các files được chia thành các mảnh và được trải ra trên phần cứng. Trong object storage , dữ liệu được chia thành các đơn vị nhỏ gọi là objecst thay vì lưu trữ như là các files hoặc là block trên server.

Object Storage hoạt động như là một đơn vị mô-đun. Mỗi trong số chúng là một kho tự quản lý bao gồm:
1. Dữ liệu: ảnh, video, dữ liệu backup của website
2. Một định danh duy nhất, cho phép object được tìm thấy trong một hệ thống phân toán
3. Metadata mô tả dữ liệu : tác giả, quyền, ngày tháng dữ liệu được tạo. 

Để lấy dữ liệu, hệ thống storage sử dụng metadata và định danh, điều này cho phép việc tải hơn và cho phép quản trị viên áp dụng các điều khoản khác nhau để tìm kiếm. 

Object storage yêu cầu một HTTP API đơn giản. Object storage mang lại sự hiệu quả về mặt chi phí. Bạn chỉ chi trả những gì bạn sử dụng. Nó có thể scale một cách dễ dàng, và là một sự lựa chọn tuyệt vời cho các hệ thống lưu trữ đám mây công cộng. Đó là hệ thống storage phù hợp với các loại dữ liệu động. 

# 3. Cách lựa chọn storage
Ý tưởng chung của việc lưu trữ metadata trong một cơ sở dữ liệu quan hệ hoặc hệ thống key-value phân tán như Dynamo (key-value) hoặc Cassandra (column oriented). Bởi vì NoSQL không hỗ trợ các tính chất ACID, nó ưu tiên khả năng mở rộng và hiệu năng của toàn bộ hệ thống, chúng ta cần kết hợp để hỗ trợ các tính chất ACID trong logic của dịch vụ của chúng ta nếu chúng ta chọn NoSQL.

Để lưu trữ các nội dung như ảnh, videos, text, chúng ta cần phải chọn đúng storage dựa trên yêu cầu của chúng ta. 

**Dịch vụ chia sẻ anh như Instagram**

* Lưu trữ các ảnh trong một hệ thống file storage phân tán như HDFS hoặc S3 (object storage)
* Lưu trữ dữ liệu và người dùng, những ảnh họ tải lên, và người mà họ theo dõi trong RDBMS, nhưng điều này rất khó để mở rộng. Do đó chúng ta có thể làm như sau:
 1. Lưu trữ schema trong hệ thống key-value phân tán để lấy lợi ích từ NoSQL. Tất cả metadata liên quan đến các ảnh có thể nằm trong 1 bảng với key là photoid, giá trị là một object bao gồm photoLocation, UserLocation, CreationTimestamp
 2. Lưu trữ mối quan hệ giữa người dùng và ảnh để biết ai sở hữu ảnh nào, và danh sách người dùng theo dõi. Cho cả 2 loại bảng đó, chúng ta có thể sử dụng  kiểu lưu trữ column-oriented như Cassandra. 

**Dịch vụ rút ngắn URL như TinyURL**
Vì chúng ta dự đoán lưu trữ hàng tỷ hàng và chúng ta không cần sử dụng mối quan hệ giữa các đối tượng - một data store NoSQL như DynamoDB (key-value), Cassandra (column-oriented) hoặc Riak (key-value) là lựa chọn tốt hơn.

# 4. Kết luận 
Trong bài viết này, mình đã giới thiệu về các storage, và cách chúng được lưu trữ. Hi vọng các bạn có thể lựa chọn kiểu storage phù hợp cho mình. Make your choice !!!!!

**Tham khảo** : https://medium.com/must-know-computer-science/system-desing-storage-d8ef4a8d952c