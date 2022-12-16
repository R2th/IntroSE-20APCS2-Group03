## I/ NoSQL
### 1/ NoSQL(NoSQL Database) là gì?
- Trong nhiều thập kỷ, mô hình dữ liệu chiếm ưu thế về lượng sử dụng để phát triển ứng dụng là mô hình dữ liệu quan hệ được sử dụng trong các cơ sở dữ liệu quan hệ, ví dụ như Oracle, DB2, SQL Server, MySQL và PostgreSQL. Mãi cho đến cuối những năm 2000, các mô hình dữ liệu khác mới bắt đầu được đưa vào áp dụng và sử dụng nhiều hơn. Để phân biệt và phân loại các cơ sở dữ liệu và mô hình dữ liệu mới này, từ "NoSQL" đã được đặt ra. Thông thường, từ "NoSQL" được sử dụng tương đương với "phi quan hệ".
- NoSQL Database là cơ sở dữ liệu được xây dựng dành riêng cho mô hình dữ liệu và có sơ đồ linh hoạt để xây dựng các ứng dụng hiện đại, dữ liệu lớn và ứng dụng nền web thời gian thực. Cơ sở dữ liệu NoSQL được công nhận rộng rãi vì khả năng dễ phát triển, chức năng cũng như hiệu năng ở quy mô lớn. Các hệ thống NoSQL cũng đôi khi được gọi là "Not only SQL" (không chỉ là SQL) để nhấn mạnh rằng chúng có thể hỗ trợ các ngôn ngữ truy vấn dạng như SQL.

### 2/ Tại sao lại cần NoSQL?
- Sở dĩ người ta phát triển NoSQL xuất phát từ tính đơn giản trong thiết kế, mở rộng theo "chiều ngang" cho các cụm máy đơn giản hơn và kiểm soát tính khả dụng tốt hơn và hơn nữa yêu cầu cần những database có khả năng lưu trữ dữ liệu với lượng cực lớn, truy vấn dữ liệu với tốc độ cao mà không đòi hỏi quá nhiều về năng lực phần cứng cũng như tài nguyên hệ thống và tăng khả năng chịu lỗi.
- Cấu trúc dữ liệu được thiết kế cho các cơ sở dữ liệu NoSQL khác với cấu trúc dữ liệu được sử dụng mặc định trong các cơ sở dữ liệu quan hệ, khiến cho nó thao tác nhanh hơn trong NoSQL.
- Cơ sở dữ liệu NoSQL thích hợp với từng trường hợp cụ thể cho vấn đề mà nó phải giải quyết. Đôi khi cấu trúc dữ liệu thiết kế dưới dạng NoSQL được xem là "linh hoạt" hơn các bảng cơ sở dữ liệu kiểu quan hệ.

### 3/ Các loại NoSQL DB
- *Key-value stores:* là cơ sở dữ liệu NoSQL đơn giản nhất. Mỗi mục trong cơ sở dữ liệu được lưu trữ dưới dạng tên thuộc tính (hoặc 'khóa'), cùng với giá trị của nó. Ví dụ về Key-value stores là Riak, Berkeley DB, Amazon DynamoDB...

- *Column-oriented stores:* như Cassandra và HBase được tối ưu hóa cho các truy vấn trên các bộ dữ liệu lớn và lưu trữ các cột dữ liệu cùng nhau, thay vì các hàng.

- *Graph stores:* được sử dụng để lưu trữ thông tin về các mạng dữ liệu, chẳng hạn như các kết nối xã hội. Ví dụ Graph stores: Neo4J và Giraph...

- *Document Oriented databases:* ghép từng khóa với cấu trúc dữ liệu phức tạp được gọi là tài liệu. Tài liệu có thể chứa nhiều cặp khóa-giá trị khác nhau hoặc cặp khóa-mảng hoặc thậm chí các tài liệu lồng nhau. Ví dụ: MongoDB, OrientDB, RavenDB…

### 4/ So sánh giữa SQL và NoSQL
**a/ SQL:**
- Dữ liệu có cấu trúc và tổ chức
- Sử dụng ngôn ngữ SQL để truy vấn dữ liệu
- Dữ liệu và các mối quan hệ của nó được lưu trữ trong các bảng riêng biệt.
- Có tính chặt chẽ

**b/ NoSQL:**
- Không sử dụng SQL
- Không khai báo ngôn ngữ truy vấn dữ liệu
- Không định nghĩa schema
- Có 1 số nhóm dạng: Key-Value store, Column Store, Document 	Database, Graph stores…
- Dữ liệu phi cấu trúc và không thể đoán trước
- Ưu tiên cho hiệu năng cao, tính sẵn sàng cao và khả năng mở rộng

****Qua so sánh thì NoSQL khắc phục khuyết điểm của SQL:***
- Dữ liệu trong NoSQL DB được lưu dưới dạng document, object. Truy vấn dễ dàng và nhanh hơn RDBMS.
- NoSQL có thể làm việc với dữ liệu dạng không có cấu trúc.
- Việc đổi cấu trúc dữ liệu (Thêm, xóa trường hoặc bảng) rất dễ dàng và nhanh gọn trong NoSQL.
- Vì không đặt nặng tính ACID của transactions và tính nhất quán của dữ liệu, NoSQL DB có hiệu suất nhanh và có thể mở rộng, chạy trên nhiều máy một cách dễ dàng.	

****Tuy nhiên thì NoSQL vẫn có hạn chế***
- Không có schema: Với NoSQL, trách nhiệm sẽ được chuyển từ cơ sở dữ liệu sang nhà phát triển ứng dụng. Ví dụ, nhà phát triển có thể áp đặt cấu trúc thông qua một hệ thống map đối tượng quan hệ hoặc ORM. Nhưng nếu bạn muốn lược đồ tự dữ liệu, NoSQL thường sẽ không hỗ trợ.
- Thiếu tính nhất quán: Dữ liệu được chèn vào cụm dù thế nào cũng sẽ khả dụng trên toàn bộ hệ thống, nhưng không thể biết chắc chắn khoảng thời gian nào.
- NoSQL lock-in: Hầu hết các hệ thống NoSQL đều tương tự về khái niệm, tuy nhiên, cách thực hiện lại rất khác nhau. Mỗi hệ thống sẽ có cơ chế truy vấn dữ liệu và quản lý riêng. Điều này có thể sẽ trở gây ra trở ngại nếu xảy ra các thay đổi hệ thống trong quá trình làm việc.
- Kỹ năng NoSQL: Một hạn chế khác đối với NoSQL là người sử dụng có thể sẽ thiếu các kỹ năng chuyên môn ở mức tương đối bởi hệ thống này còn khá mới và không phải ai cũng biết cách sử dụng thành thạo.

***Tóm lại**, NoSQL database chỉ là một kiểu database có cách lưu trữ, truy vấn dữ liệu hoàn toàn khác so với RDBMS và SQL. Và NoSQL không thay thế được hoàn toàn RDBMS và SQL được. RDBMS vẫn sẽ giữ được chỗ đứng của mình. Một ứng dụng không chỉ sử dụng một database duy nhất, và có thể kết hợp cả SQL lẫn NoSQL.
![](https://images.viblo.asia/5aa32f7c-6c33-409a-a70a-f570bf08ccab.gif)

-----

## II/ MongoDB
### 1/ Định nghĩa MongoDB?
- MongoDB là một cơ sở dữ liệu tài liệu nguồn mở và cơ sở dữ liệu hàng đầu của NoSQL. MongoDB được viết bằng C++.
- MongoDB là một cơ sở dữ liệu đa nền tảng, định hướng tài liệu cung cấp, hiệu suất cao, tính sẵn sàng cao và khả năng mở rộng dễ dàng. MongoDB hoạt động trên khái niệm về collection và document. MongoDB lưu trữ dữ liệu dưới dạng JSON (trong MongoDB được gọi là dạng BSON vì nó lưu trữ dưới dạng binary từ 1 JSON document).

***Ví dụ***
sau đây cho thấy cấu trúc tài liệu của một trang blog, đơn giản là một cặp giá trị khóa được phân tách bằng dấu phẩy.
```
{
    _id: ObjectId(7df78ad8902c)
    title: 'MongoDB Overview', 
    description: 'MongoDB is no sql database',
    by: 'google',
    url: 'http://www.google.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100, 
    comments: [  
        {
        user:'user1',
        message: 'My first comment',
        dateCreated: new Date(2011,1,20,2,15),
        like: 0 
        },
        {
        user:'user2',
        message: 'My second comments',
        dateCreated: new Date(2011,1,25,7,45),
        like: 5
        }
    ]
}
```

_id là số thập lục phân có độ lớn 12 byte đảm bảo tính duy nhất của mọi tài liệu. Bạn có thể cung cấp _id trong khi chèn tài liệu. Nếu bạn không cung cấp thì MongoDB cung cấp một id duy nhất cho mọi tài liệu. Trong 12 byte thì 4 byte đầu tiên cho dấu thời gian hiện tại, 3 byte tiếp theo cho id máy, 2 byte tiếp theo cho id quá trình của máy chủ MongoDB và 3 byte còn lại là GIÁ TRỊ tăng dần đơn giản.

### 2/ Thuật ngữ RDBMS với MongoDB

| **RDBMS** | **MongoDB** |
| -------- | -------- |
| Database     | Database     | 
| Table     | Collection     |
| Tuple/Row     | Document     |
| Column     | Field     |
| Table Join     | Embedded Documents     |
| Primary Key     | Primary Key (Default key _id provided by mongodb itself)     |

### 3/ Kiểu dữ liệu trong MongoDB
** *MongoDB hỗ trợ khá nhiều kiểu dữ liệu.*
- **String**: Đây là kiểu sử dụng phổ biến nhất để lưu trữ dữ liệu. String trong MongoDB phải là UTF-8.
- **Integer**: Đây là kiểu dữ liệu được sử dụng để lưu các giá trị số. Integer có thể là 32 bit hay 64 bit phụ thuộc vào server của bạn.
- **Boolean**: Đây là kiểu dữ liệu được dùng để lưu giá trị boolean.
- **Double**: Được sử dụng để lưu trữ các giá trị dấu phẩy động.
- **Min/ Max keys**: Kiểu dữ liệu này được sử dụng để so sánh một giá trị với các phần tử BSON thấp nhất và cao nhất.
- **Arrays**: Được dùng để lưu các mảng hoặc danh sách hoặc nhiều giá trị trong một key.
- **Timestamp**: Dùng để để ghi lại khi một tài liệu đã được sửa đổi hoặc thêm vào.
- **Object**: Đây là kiểu dữ liệu được dùng cho embedded documents.
- **Null**: Dùng để lưu các giá trị là Null
- **Symbol**: Kiểu dữ liệu này được sử dụng giống như string; tuy nhiên, nó thường dành riêng cho các ngôn ngữ sử dụng một loại ký hiệu cụ thể.
- **Date**: Kiểu dữ liệu này được sử dụng để lưu trữ date và time hiện tại trong định dạng UNIX time. Bạn có thể chỉ định thời gian ngày của riêng mình bằng cách tạo đối tượng của Ngày và chuyển ngày, tháng, năm vào đó.
- **Object ID**: Kiểu dữ liệu này được sử dụng để lưu giữ ID của Document.
- **Binary data**: Kiểu dữ liệu này được	sử dụng để lưu giữ dữ liệu nhị phân.
- **Code**: Kiểu dữ liệu này được sử dụng để lưu trữ JavaScrip code vào trong Document.
- **Regular expression**: Được dùng để lưu trữ regular expression

### 4/ Tại sao nên sử dụng MongoDB?
Bởi vì MongoDB:
- Lưu trữ hướng tài liệu - dữ liệu được lưu trữ dưới dạng tài liệu kiểu JSON.
- Chỉ mục trên bất kỳ thuộc tính
- Nhân rộng và sẵn sàng cao. 
- Tự động bảo vệ.
- Truy vấn phong phú.
- Cập nhật nhanh tại chỗ.
- Hỗ trợ chuyên nghiệp bởi MongoDB
### 5/ Sử dụng MongoDB ở đâu?
Với những đặc điểm như trên thì MongoDB thường được sử dụng trong:
- Dữ liệu lớn.
- Quản lý và phân phối nội dung.
- Cơ sở hạ tầng di động và xã hội.
- Quản lý dữ liệu người dùng. 
- Trung tâm dữ liệu.

Qua bài viết này đã giúp chúng ta có thêm kiến thức mới về NoSQL và MongoDB, có thể giúp ích cho việc lập trình và sáng tạo của bạn :rofl::rofl: 

*Tài liệu tham khảo:

https://toidicodedao.com/2015/09/24/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-1/

https://tech.vccloud.vn/nosql-la-gi-20181013113252686.htm

https://aws.amazon.com/vi/nosql/

https://www.mongodb.com/nosql-explained

https://www.tutorialspoint.com/mongodb/index.htm