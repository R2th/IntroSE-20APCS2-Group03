![](https://images.viblo.asia/2022ffc0-6ecd-433d-8abb-7b50997dbe06.png)
<div align="center">(Nguồn: Making	Sense	of	NoSQL	A	guide	 for	managers	and	
the	rest	of	us	(Books))</div>

<br>

Top 10 DBMS theo thống kê mới nhất của [DB-ENGINES](https://db-engines.com/en/ranking)
![](https://images.viblo.asia/1c0e6413-8f57-4f4a-9b55-bee6c7182477.png)

![](https://images.viblo.asia/8c6c9424-2d85-452f-9260-bdd1e4cdaf36.png)

RDBMS (Relational Database Management System) đã quá quen thuộc với chúng ta. Vậy còn NoSQL? NoSQL là gì? Tại sao, càng ngày NoSQL càng phát triển và được ứng dụng rộng rãi hơn thay vì chỉ có RDBMS như trước đây? Nếu bạn cũng tò mò như mình thì cùng tìm hiểu nhé ;)

### 1. Why NoSQL

![](https://images.viblo.asia/9641d8ce-d41d-42fd-9d38-e9084c983587.png)

Trước NoSQL thì các lập trình viên DBMS cho rằng: RDBMS là "one size fits all", tạm hiểu là một tiêu chuẩn có thể phù hợp cho tất cả mọi thứ. Nhưng khi các vấn đề thực tế được "công nghệ hóa" ngày càng nhiều thì khẳng định này dần không còn chính xác nữa. Đó là lý do NoSQL ra đời. Hay nói cách khác, NoSQL là giải pháp thay thế, nhằm giải quyết các vấn đề mà RDBMS đang gặp phải.

>> Cơ sở dữ liệu NoSQL là cơ sở dữ liệu được xây dựng cho mô hình dữ liệu và có lược đồ linh hoạt để đáp ứng các yêu cầu được đưa ra trong việc xây dựng các ứng dụng hiện đại. Cơ sở dữ liệu NoSQL được công nhận rộng rãi vì khả năng dễ phát triển, chức năng cũng như hiệu năng ở quy mô lớn. Các Cơ sở dữ liệu này sử dụng mô hình dữ liệu đa dạng như document, graph, key-value,...

### 2. Vấn đề của RDBMS

Đầu tiên, phải khẳng định RDBMS có rất nhiều ưu điểm:

- Tính ACID (Atomicity, Consistency, Isolation, Durability) của một transaction được đảm bảo.
- Chuẩn 3 đảm bảo tính đồng nhất và toàn vẹn dữ liệu consistency).
- Có rất nhiều driver cho mọi ngôn ngữ: Java, C#, PHP...

RDBMS cũng là hệ quản trị truyền thống nên nó khá phổ biến và được biết đến rộng rãi bởi đa số lập trình viên.

Tuy nhiên, nó vẫn có những nhược điểm như:
- Nếu đúng chuẩn, hiệu năng có thể sẽ bị chậm nếu phải join nhiều bảng để lấy dữ liệu. Đó là lý do ta sử dụng “giảm chuẩn” để tăng hiệu suất cho RDBMS.
- Khó mở rộng hoặc thay đổi cấu trúc bảng: Việc thêm/xóa bảng hoặc thêm/xóa một field... có thể kéo theo vô số source code thay đổi.
- Không làm việc được với dữ liệu không có cấu trúc (un-structure).
- RDBMS được thiết kế để chạy trên một máy chủ. Khi muốn mở rộng, nó khó chạy trên nhiều máy (clustering).

**Ví dụ**: Khi bạn cần lưu ***hồ sơ - Profile*** của người dùng. Nếu là trước đây, thì có thể chỉ cần lưu 1 email, hoặc 1 số điện thoại. Nhưng khi đời sống phát triển, 1 người dùng có thể có tới vài số điện thoại, vài email thì việc truy vấn sẽ trở nên phức tạp.

Giả sử một người có 3 số điện thoại, 5 email và 2 địa chỉ, như vậy một câu Query SQL có thể sẽ cần truy vấn tới 3 x 5 x 2 = 30 bản ghi.

Và khi cơ sở dữ liệu càng "phìng to" hơn, việc truy vấn sẽ càng trở nên phức tạp và có thể làm giảm hiệu năng của hệ thống.

Chưa kể tới việc ngoài số điện thoại và email, chúng ta còn cần lưu các tài khoản xã hội của người dùng như facebook, twitter, github,... Khi đó, chúng ta cần phải thêm trường cho bảng.
Với RDBMS, mỗi trường hợp như vậy, bạn có thể sẽ làm ảnh hưởng tới rất nhiều các truy vấn hiện tại của hệ thống.

### 3. Lợi ích của NoSQL
Như mình đã nói ở trên, cơ sở dữ liệu NoQuery có khả năng mở rộng và mô hình dữ liệu của NoSQL giải quyết một số vấn đề mà mô hình quan hệ không giải quyết được. Cụ thể một số lợi ích của NoSQL là:

- **Lược đồ linh hoạt**: NoSQL có thể làm với dữ liệu dạng không có cấu trúc. Nhờ đó, sở dữ liệu NoSQL là lựa chọn lý tưởng cho dữ liệu không được tổ chức thành cấu trúc hoặc có cấu trúc chưa hoàn chỉnh.
- **Có khả năng co dãn (Elasticity):** Việc thay đổi cấu trúc dữ liệu (Thêm/xóa trường hoặc bảng) rất dễ dàng.
- **Hiệu năng cao**: Cơ sở dữ liệu NoSQL được tối ưu hóa theo mô hình dữ liệu (ví dụ như văn bản, khóa–giá trị và đồ thị) giúp truy vấn dễ dàng hơn so với cơ sở dữ liệu quan hệ RDBMS.
- **Có khả năng mở rộng**: Do không đặt nặng tính ACID của transactions và tính nhất quán của dữ liệu nên NoSQL DB có thể mở rộng, chạy trên nhiều máy một cách dễ dàng.

### 4. Các loại cơ sở dữ liệu NoSQL
#### 4.1. Document databases
```
person: {
    firstname: "Ha",
    lastname: "Tran",
    email: {
        personal: "hatran@gmail.com",
        work: "hatran@sun-asterisk.com",
    },
}
```
Đặc điểm:
- Các object được lưu trữ trong database dưới dạng 1 document.
-  Format: BSON/JSON/XML.
-  Các document được định danh bởi ID.
-  Cho phép đánh chỉ mục theo thuộc tính.

Ưu điểm:
- Có thể thêm/sửa thuộc tính, thay đổi đối tượng (tương đương thay đổi trường và bảng trong RDBMS) rất nhanh và đơn giản
- Có thể thực hiện các câu truy vấn phức tạp với hiệu năng cao

Nhược điểm: Mỗi database lại có một kiểu truy vấn riêng.

Ứng dụng: prototype, big data, e-commerce, CMS,...

DBMS tiêu biểu: MongoDB, RavenDB, CouchDB, TerraStone, OrientDB

#### 4.2. Graph stores

![](https://images.viblo.asia/1748aacf-5a35-4a4f-b551-71f52ceb360c.png)

Đặc điểm:
- Dữ liệu được lưu trữ trong database dưới dạng các node, kết nối với nhau tạo thành cấu trúc graph.
- Mỗi node sẽ có 1 label và một số properties - tương tự 1 row trong RDBMS.
- Các node được kết nối với nhau bằng các relationship.
- Truy vấn là các thuật toán duyệt đồ thị.

Ưu điểm:
- Truy vấn tìm kiếm nhanh và dễ dàng
- Neo4j là một database free, lại có một cộng đồng chia sẻ rất lớn.

Nhươc điểm: Phải duyệt nội bộ đồ thị, khi truy vấn. Không dễ để phân tán.

Ứng dụng: Các hệ thống mạng xã hội, mạng noron

DBMS tiêu biểu: Neo4j, InfiniteGraph, OrientDB, HYPERGRAPHDB

#### 4.3. Key-value stores
![](https://images.viblo.asia/77f01c61-ff5a-4015-be84-540f33d4f4cf.png)
Đặc điểm:
- Lưu trữ trong database dưới dạng các cặp key-value.
- Sử dụng key để tìm kiếm value.
- value có thể lưu bất kì giá trị nào.

Ưu điểm:
- Cấu trúc key-value đơn giản.
- Truy vấn nhanh
- Dễ dàng mở rộng

Nhược điểm: Không thể truy vấn ngược từ value đến key.

Ứng dụng: Lưu trữ cache, sessions, profiles,... cho các ứng dụng.

DBMS: Riak, Redis, MemCache, Project Voldemort, CouchBase
#### 4.4. Column-family stores
![](https://images.viblo.asia/2450e8da-033a-44ec-8f61-7d92bd363c71.png)
Đặc điểm:
- Dữ liệu được lưu trong database dưới dạng các cột, thay vì các hàng như trong RDBMS.
- Các cột (columns) được nhóm thành các "column-families".
- Các column-families lại được nhóm thành các "super-Columns".
- Có thể truy vấn tất cả các cột theo column-families hoặc super-columns
- Các dữ liệu tương tự nhau được nhóm lại để tăng hiệu năng truy vấn.

Ưu điểm: Dễ dàng mở rộng

Ứng dụng: một số dự án CMS và trong thương mại điện tử.

DBMS: Cassandra (Phát triển bởi Facebook), HyperTable, Apache HBase

### 5. Xu hướng trong tương lai?

NoSQL bỏ qua tính toàn vẹn của dữ liệu và ACID transaction của RDBMS để đổi lấy hiệu suất nhanh và khả năng mở rộng (scalability). Do đó, NoSQL được ứng dụng nhiều trong các dự án Big Data, các dự án Real-time,... với lượng dữ liệu khổng lồ hoặc không có cấu trúc cụ thể.
Đồng thời do vậy nên NoSQL sẽ không thể thay thế hoàn toàn RDBMS. Tuy nhiên, thay vì "one size fits all" như trước kia thì nay các dự án sẽ sử dụng không chỉ RDBMS hoặc NoSQL mà có thể là cả hai. Chính vì lẽ dó, việc trau dồi kiến thức SQL cũng như tìm hiểu thêm về NoSQL là vô cùng cần thiết với mọi lập trình viên.

Đây là một đề tài, nói như thế nào nhỉ, nó có vẻ hơi lạc lõng trong những chủ đề mình thường tìm hiểu (Thực ra mình cũng đã viết về chủ đề này trong một [bài viêt](https://viblo.asia/p/atlas-cach-giu-chan-hon-200-trieu-khach-hang-cua-baidu-djeZ1VzmlWz) lâu lắm rồi). Nhưng thực tế thì mình chưa thực hành nhiều với các dự án sử dụng NoSQL và mình cũng chỉ hiểu nôm na rằng cơ sở dữ liệu NoSQL là cơ sở dữ liệu "phi quan hệ" nên mình muốn tìm hiểu rõ hơn. Bài viết chỉ bao gồm lý thuyết nhưng mình hy vọng là nó vẫn có ích với bạn. Mình sẽ cố gắng để có những bài viết với ví dụ cụ thể và hữu ích hơn.

Cảm ơn bạn vì đã đọc. Hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo:

[NoSQL Databases Explained](https://www.mongodb.com/nosql-explained)

[Database Trend](https://www.slideshare.net/harisetiaji31/database-jaman-now)

NOSQL CÓ GÌ HAY HO – TỔNG QUAN VỀ NOSQL: Phần[ 1](https://toidicodedao.com/2015/09/24/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-1/) và [2](https://toidicodedao.com/2015/09/29/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-2/)

[NoSQL là gì?](https://aws.amazon.com/vi/nosql/)

Liên hệ với mình nếu bạn có thắc mắc hoặc đề xuất chủ đề cho mình tại đây nhé: [HaiHaChan](https://viblo.asia/u/HaiHaChan/contact)