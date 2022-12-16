![](https://images.viblo.asia/63bf4ee9-1e3d-48a4-86df-ef7a4ecadd7d.png)

Để hiểu rõ hơn về hệ quản trị dữ liệu phi quan hệ (NoSQL) cũng như đi sâu vào tìm hiểu một dạng lưu trữ dữ liệu của NoSQL thì bài viết này của mình sẽ giới thiệu cụ thể về một hệ quản trị cơ sở dữ liệu có tên là MongoDB (có lẽ với nhiều bạn đã quá quen thuộc :smile:).
### Giới thiệu
MongoDB được sử dụng rất nhiều tại thời điểm hiện tại. MongoDB là một hệ quản trị cơ sở dữ liệu dạng Document được sử dụng để lưu trữ các dữ liệu lớn. MongoDB được đưa ra vào giữa những năm 2000. Đây là một trong những hệ quản trị cơ sở dữ liệu phi quan hệ.
### Đặc điểm
Trước tiên để hiểu rõ hơn về MongoDB chúng ta sẽ tìm hiểu xem MongoDB có những đặc điểm nào.
1. Mỗi cơ sở dữ liệu bao gồm nhiều collection, mỗi collection lại chứa nhiều Document. Mỗi Document có thể khác nhau về số lượng các trường dữ liệu. Kích thước và nội dung của mỗi Document đều có thể khác nhau.
2. Cấu trúc của Document phù hợp với việc các nhà phát triển xây dựng các class và object bằng các ngôn ngữ lập trình tương ứng. Các nhà phát triển sẽ thường phát biểu rằng cấu trúc của họ không có các hàng và các cột nhưng vẫn có một cấu trúc dữ liệu rõ ràng với các cặp key-value.
3. Nếu như các bạn đã biết trước về NoSQL (hoặc chưa biết thì có thể xem  [tại đây](https://viblo.asia/p/nosql-va-nhung-dieu-co-the-ban-da-biet-YWOZrwWNlQ0) :) ), các hàng (hay có thể là documents được gọi trong MongoDB) không cần phải định nghĩa schema. Thay vào đó, các trường có thể được tạo linh hoạt.
4. Mô hình dữ liệu có sẵn trong MongoDB cho phép bạn biểu diễn quan hệ phân cấp, lưu trữ các mảng, và các cấu trúc phức tạp dễ dàng hơn.

Khả năng mở rộng - MongoDB có tính mở rộng cao. Trên thực tế các công ty trên toàn thế giới đã xác định được các cụm với số node được chạy trên 100 nodes với khoảng hàng triệu document trong cơ sở dữ liệu.
### Ví dụ về MongoDB
Để có cái nhìn trực quan hơn với MongoDB chúng ta sẽ đi vào ví dụ sau.
Dưới đây là ví dụ về một Document trong MongoDB:

![](https://images.viblo.asia/3f25949b-44dc-447b-8794-82f3f1cb3fa0.png)

1. Trường  _id được thêm vào để định danh cho Document trong 1 tập các Document.
2. Nếu trong RDBMS lưu trữ dữ liệu của Order thì Order sẽ được lưu thành 1 bảng riêng biệt còn nếu sử dụng MongoDB thì nó sẽ được lưu trữ là 1 Document và được nhúng chính collection của nó.


### Thành phần chính trong kiến trúc của MongoDB
Dưới đây là một vài thuật ngữ phổ biến được sử dụng trong MongoDB:
1. _id: là trường bắt buộc phải có trong mỗi Document. Trường này biểu diễn các giá trị duy nhất cho từng Document. Vì nó là bắt buộc nên nếu chẳng may bạn có quên thì MongoDB sẽ tự động sinh ra cho bạn trường này :). 
2. collection: là một tập các Documents. Một collection tương đương với một bảng được tạo bởi bất kỳ một hệ quản trị cơ sở dữ liệu quan hệ nào có thể là Oracle hay MySQL. Một collection tồn tại trong cơ sở dữ liệu và nó không có bất kỳ một loại cấu trúc nào.
3. Cursor: là con trỏ trỏ tới tập kết quả của một tập truy vấn. Client có thể lặp qua một con trỏ để lấy kết quả của dữ liệu.
4. Database: là một container của các collection giống như là một cơ sở dữ liệu chứa các bảng trong RDBMS. Mỗi database có một bộ các file trên hệ thống file. Server của MongoDB có thể lưu trữ được nhiều database.
5. Document: là một bản ghi trong 1 collection của MongoDB tương ứng được gọi là 1 document. Document lần lượt bao gồm có tên trường và giá trị tương ứng.
6. Field: là một cặp key-value. 1 Document có thể không có trường nào hoặc có thể có nhiều trường. Các trường này tương tự như các cột trong RDBMS. ![](https://images.viblo.asia/35b337db-00a3-4b7d-90b3-528b5d159224.png)
7. JSON: được biết đến như là một ký hiệu đối tượng JavaScript. Đây là một dạng văn bản đơn giản, dễ đọc để thể hiện dữ liệu có cấu trúc. Hiện tại JSON được hỗ trợ trong nhiều ngôn ngữ lập trình.

### Tại sao lại sử dụng MongoDB?
Dưới đây sẽ là một vài lý do để bạn biết được tại sao MongoDB lại được sử dụng:
1. Hướng tài liệu: MongoDB là cơ sở dữ liệu phi quan hệ vì vậy dữ liệu của nó được lưu trữ dưới dạng document. Với dạng lưu trữ này giúp việc lưu trữ dữ liệu linh hoạt hơn và phù hợp hơn với các yêu cầu phát triển dữ liệu trong thực tế.
2. Truy vấn đặc biệt: MongoDB hỗ trợ bạn tìm kiếm dữ liệu theo trường, truy vấn theo miền, hoặc tìm kiếm các biểu thức thông thường. Các truy vấn được thực hiện để có thể trả về các trường cụ thể trong document.
3. Đánh chỉ mục (Index): Đánh chỉ mục để giúp việc tìm kiếm nhanh chóng hơn và trong MongoDB có thể đánh chỉ mục cho bất kỳ trường nào.
4. Bản sao (Replication): MongoDB luôn sẵn sàng cung cấp bộ các bản sao. Một bộ bản sao bao gồm hai hoặc nhiều thể hiện của MongoDB. Mỗi bộ bản sao có thể đóng vai trò là bản sao chính (bản sao thứ cấp) hoặc bản sao phụ (bản sao sơ cấp) bất cứ lúc nào. Bản sao thứ cấp là server chính tương tác với client để thực hiện việc đọc/ghi. Bản sao sơ cấp một bản sao dữ liệu của bản sao thứ cấp. Khi bản sao thứ cấp thất bại, bản sao thứ cấp tự động được chuyển qua bản sao sơ cấp để chuyển thành thứ cấp sau đó nó trở thành server thứ cấp.
5. Cân bằng tải: MongoDB sử dụng khái niệm sharding để chia cắt dữ liệu thành nhiều thể hiện của MongoDB. MongoDB có thể chạy trên nhiều server cân bằng tải, và hoặc sao chép dữ liệu để hệ thống luôn hoạt động ngay cả khi có lỗi phần cứng.

### Mô hình hóa dữ liệu trong MongoDB
Như giới thiệu thì chúng ta đã biết MongoDB có mô hình dữ liệu linh hoạt, khác với mô hình dữ liệu của các cơ sở dữ liệu quan hệ phải khai báo lược đồ quan hệ trước khi insert dữ liệu.

Khi xây dựng mô hình dữ liệu trong Mongo bạn cần chú ý những điều sau:
1. Ứng dụng cần những gì? Cần phải quan tâm đến yêu cầu của ứng dụng, dữ liệu và kiểu dữ liệu nào sẽ cần cho ứng dụng của bạn. Dựa trên các yếu tố đó để đảm bảo rằng cấu trúc Document của bạn đã được xây dựng phù hợp.
2. Các mẫu truy vấn dữ liệu của bạn là gì? Bạn cần phải xem xét các truy vấn dữ liệu của ứng dụng để cân nhắc sử dụng Index một cách hiệu quả.
3. Có thường xuyên phải `Insert, update, remove` dữ liệu không? Nếu có hãy xem xét lại phần đánh chỉ mục hoặc sử dụng sharding để có thể tối ưu việc sử dụng MongoDB trong ứng dụng của bạn.

Ngoài các nội dung trên nếu bạn còn muốn biết xem sự khác nhau giữa MongoDB và RDBMS thì có thể tham khảo bài viết trước của mình [tại đây](https://viblo.asia/p/nosql-va-nhung-dieu-co-the-ban-da-biet-YWOZrwWNlQ0).

Trên đây là một số tìm hiểu ban đầu của mình trong quá trình học MongoDB, hi vọng có thể giúp ích cho các bạn, mình rất mong có thể nhận được các trao đổi, góp ý tại bài viết này (bow).

Nguồn tham khảo: 

[What is MongoDB?](https://www.guru99.com/what-is-mongodb.html)

[Replica set](https://quantrimang.com/replica-set-trong-mongodb-157751)