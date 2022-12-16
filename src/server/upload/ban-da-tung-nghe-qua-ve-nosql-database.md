<div align="center">

# Lời mở đầu
            
</div>

- Chắc hẳn các bạn đã và đang theo học và làm việc trong lĩnh vực công nghệ thông tin sẽ không còn lạ lẫm gì với bộ môn "Cơ sở dữ liệu" nữa. Trong bộ môn này bạn được dạy về một số khái niệm như:

    - DB (Database): là một cơ sở dữ liệu; bao gồm các bảng, mỗi bảng lại bao gồm các trường (cột) và các bản ghi (hàng).
    - DBMS (Database Management System): là hệ quản trị cơ sở dữ liệu, là một phần mêm giúp quản lý cơ sở dữ liệu; bao gồm truy xuất, thao tác thêm/sửa/xóa dữ liệu, ...
    - SQL (Structure Query Language): là ngôn ngữ truy vấn có cấu trúc.

- Và ảnh bên dưới là top 15 những hệ quản trị cơ sở dữ liệu được sử dụng PHỔ BIẾN NHẤT trong tháng 5/2021 (các bạn chú ý là PHỔ BIẾN chứ không phải là TỐT nhé).

![](https://images.viblo.asia/b6bc4dc5-c514-402e-bbed-bcd4502b32ce.png)

<div align="center">

BXH của trang https://db-engines.com/en/ranking
            
</div>

Không khó để nhận ra những cái tên quen thuộc Oracle hay MySQL phải không nào, nếu bạn để ý thì ở cột Database Model chúng đều có "Relational", gọi là RDBMS hệ quản trị cơ sở dữ liệu quan hệ (tức là các bảng trong CSDL sẽ có quan hệ 1-1, 1-n, n-n với nhau). Thế dữ liệu mà không có quan hệ thì gọi là gì?
Câu trả lời là cơ sở dữ liệu phi quan hệ: NoSQL Database (với cái tên nổi bật trên BXH là MongoDB).

<div align="center">

# Nội dung
            
</div>

<div align="center">


## Bao lâu nay RDBMS vẫn dùng "ngon" mà?
            
</div>

- Đúng là RDBMS vẫn đang dùng "ngon", dễ thấy nhất là nó vẫn chiếm những vị trí top đầu trong bảng xếp hạng phía trên kia.
- Tuy nhiên "ngon" không đồng nghĩa với việc là nó hoàn hảo tuyệt đối, bên cạnh một số điểm mạnh như:
    - Tính ACID (Atomicity, Consistency, Isolation, Durability).
    - Tính đồng nhất và toàn vẹn dữ liệu (các bạn đã học môn Cơ sở dữ liệu chắc cũng trải qua không ít đau thương với "chuẩn hóa CSDL" rồi đúng không, và thường là dùng chuẩn 3NF)
    - Do khá lâu đời (197x) nên có cộng đồng người dùng đông đảo và có sẵn nhiều driver hỗ trợ cho các ngôn ngữ lập trình.

- Thì RDBMS cũng có một số khuyết điểm như:
    - Khi dữ liệu yêu cầu phải join nhiều bảng với nhau, performance sẽ bị giảm xuống.
    - Do những ràng buộc trong RDBMS mà việc thay đổi cấu trúc của CSDL có thể kéo theo rất nhiều thay đổi phức tạp.
    - Không thể thao tác với dữ liệu không có cấu trúc (un-structure).
    - Khi lượng dữ liệu lưu trữ lớn, yêu cầu phải mở rộng (scale ngang) ra nhiều máy chủ thì tương đối khó thực hiện.

<div align="center">


## Và NoSQL Database ra đời để giải quyết những khuyết điểm đó của RDBMS
            
</div>

- Ưu điểm:

    - Dữ liệu được lưu dưới dạng document, object, vì vậy performance khi truy vấn sẽ tốt hơn so với RDBMS.
    - Việc thay đổi cấu trúc của CSDL (thêm/xóa trường hoặc bảng) dễ dàng hơn
    - NoSQL có thể làm việc với dữ liệu dạng không có cấu trúc.
    - Vì không đặt nặng tính ACID (là ưu điểm của RDBMS) mà NoSQL Database có thể dễ dàng mở rộng ra nhiều máy chủ.

- Tuy nhiên, nhìn vào những ưu điểm trên thì bạn cũng có thể dễ dàng nhận ra khuyết điểm của NoSQL Database là:

    - Thiếu tính nhất quán về dữ liệu, dễ xảy ra trùng lặp, dư thừa dữ liệu
    - Việc quản lý dữ liệu hàng ngày và sưu lưu dữ liệu khá phức tạp (cái này thì mình google search thôi chứ cũng chưa có cơ hội dùng thử để biết nó có phức tạp thật không 😅😅😅)
    - ...

    => và bài toán lựa chọn sử dụng RDBMS hay NoSQL Database được đặt ra là bạn cần điều gì hơn, đánh đổi lấy tính toàn vẹn của dữ liệu hay là hiệu năng và khả năng mở rộng?

<div align="center">


## NoSQL Database được chia ra làm 4 loại
            
</div>

### 1. Key-value Database
- Giống như cái tên của mình thì dữ liệu được lưu dưới dạng các cặp key-value cực kỳ đơn giản, muốn tìm value thì tìm theo key.
- Nhờ sự đơn giản trong cấu trúc này mà tốc độ truy vấn nhanh và dễ dàng mở rộng CSDL.
- Ứng dụng: nhờ tốc độ truy vấn nhanh, nó được dùng để làm cache cho ứng dụng (tiêu biểu là Redis và MemCache).
- Những DBMS tiêu biểu:
    - [Redis](https://redis.io/) (top 7 BXH)
    - [MemCache](https://memcached.org/) (top 30 BXH)
    - [Riak](https://riak.com/) (top 69 BXH)
    
### 2. Document Database
- Các object được lưu trong CSDL dưới dạng document với format BSON/JSON/XML.
- Do dữ liệu không schema cứng như SQL nên có thể sửa đổi cấu trúc CSDL rất nhanh và đơn giản. Ngoài ra tốc độ truy vấn cũng nhanh và có thể thực hiện các câu truy vấn phức tạp, dễ dàng mở rộng.
- Ứng dụng: dùng làm database lưu trữ cho các ứng dụng prototype, bigData, E-commerce, CMS.
- Những DBMS tiêu biểu:
    - [MongoDB](https://www.mongodb.com/) (top 5)
    - [RavenDB](https://ravendb.net/) (top 87)

### 3. Column-Family Database
- Dữ liệu được lưu trong CSDL dưới dạng các cột chứ không phải hàng, mỗi hàng sẽ có một key/id riêng và các hàng trong một bảng không nhất thiết phải có số lượng cột giống nhau.
- Ứng dụng: sử dụng khi cần ghi lượng dữ liệu lớn, big data.
- Những DBMS tiêu biểu:
    - [Cassandra](https://cassandra.apache.org/) (top 11, được phát triển bởi Facebook)
    - [Apache HBase](https://hbase.apache.org/) (top 23)

### 4. Graph Database
- Dự liệu được lưu dưới dạng các node. Mỗi node có 1 label, 1 số thuộc tính như một bản ghi trong SQL. Các node này được kết nối với nhau bằng relationship và sử dụng các thuật toán duyệt đồ thị để truy vấn dữ liệu.
- Ứng dụng: khi cần truy vấn các mối quan hệ, ví dụ như trong các hệ thống: mạng nơ-ron, mạng xã hội, gợi ý sản phẩm (dựa trên lịch sử mua sắm), ...
- Những DBMS tiêu biểu:
    - [Neo4j](https://neo4j.com/) (top 19)
    - [OrientDB](https://orientdb.org/) (top 79)

<div align="center">

# Tổng kết
            
</div>

- Hi vọng với bài viết này, các bạn đã có thể nắm được một số khái niệm cơ bản, cũng như là những đặc điểm của cơ sở dữ liệu NoSQL so với cơ sở dữ liệu Sql mà chúng ta vẫn thường thấy và sử dụng. Tất nhiên trong phạm vi 1 bài viết như thế này thì không thể đưa ra quá nhiều thông tin cho các bạn được, mong các bạn thông cảm và có thể xem chi tiết trong các link mà mình đã đặt trong bài.
- Nếu bạn có bất cứ thắc mắc gì về nội dung bài viết, hãy comment xuống phía dưới để mình có thể hỗ trợ cho bạn hoặc có thể đặt câu hỏi liên quan đến công nghệ tại đây để được mọi người trong cộng đồng giải đáp giúp nhé.

<div align="center">

# Tài liệu tham khảo
            
</div>

- Viblo: https://viblo.asia/tags/nosql
- Tôi đi code dạo: https://toidicodedao.com/2015/09/24/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-1/
- Google: https://www.google.com/search?q=no+sql+là+gì&sxsrf=ALeKk00DVfyWfkr2TUzZx04GFETW2IHFXg%3A1621411160720&ei=WMWkYK-tK9fZhwPKwqAI&oq=no+sql+là+gì&gs_lcp=Cgdnd3Mtd2l6EAM6BwgAEEcQsANQiM0qWOrSKmCe2SpoA3ACeAGAAXaIAdIFkgEDNi4ymAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=gws-wiz&ved=0ahUKEwivuZOio9XwAhXX7GEKHUohCAEQ4dUDCA4&uact=5