# 1. MongoDB là gì?
![](https://images.viblo.asia/1c03b742-8268-428c-9da4-6a70e9b62dec.png)
Chúng ta đã quá quen thuộc với relational database kiểu bảng truyền thống với các cột cố định, bản ghi nào cũng có ngần đấy cột (dữ liệu của cột có thể là Null). Và việc này đôi khi là một trở ngại nếu chúng ta cần có một database linh động và mạnh mẽ hơn. Đó chính là lí do MongoDB ra đời. MongoDB là một hệ database dạng document, nó lưu trữ data dưới dạng các JSON document. 

Sự khác nhau giữa MongoDB với relational database như MySQL đó là lưu dữ liệu dạng **NoSQL**, tức là không có sự ràng buộc giữa các bảng.

Đây là một ví dụ về một JSON document (bản ghi) chứa thông tin về user:
![](https://images.viblo.asia/360f4ae1-8a14-45a4-bd7c-b7ded91ae73f.png)

Trong đó chúng ta có thể thấy được các thông tin đơn giản (như *firstname*, *lastname*) cùng những thông tin phức tạp (như *address*, phải lồng cả những dữ liệu con ở bên trong như *street*, *city*,... ) được thể hiện một cách rất đơn giản, hiệu quả và linh động - điều mà relational database kiểu bảng truyền thống sẽ không bao giờ làm được :)
# 2. Các khái niệm cơ bản
Thật ra nếu chúng ta đã biết sử dụng MySQL thì việc làm quen với MongoDB chỉ là chuyện nhỏ bởi vì chúng có những khái niệm tương đồng nhau. Để dễ hình dung và so sánh, mình sẽ tạo một bảng để match các khái niệm giữa 2 hệ CSDL này với nhau như dưới đây:

| MySQL | MongoDB |
| -------- | -------- |
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Table Join | Embedded Documents |
| Primary Key | Primary Key |

Chúng ta cần chú ý đến 2 khái niệm Collection và Document:
* **Collection** là một nhóm các dữ liệu thuộc cùng loại do người dùng qui định, sự khác nhau giữa collection với table trong RDBMS đó là collection không có ràng buộc, quan hệ với collection khác. Mỗi dữ liệu trong collection không cố định về số trường như row trong table.
* **Document** là một bản ghi lưu trữ dưới dạng json. Nó tương đương với row trong table của RDBMS nhưng dữ liệu trong document khá linh hoạt, nó không cố định có bao nhiêu trường, dữ liệu trong mỗi trường phải là cố định.

Dữ liệu trong Collection, Document rất linh hoạt, bạn thích insert gì vào cũng được, không cứ phải một kiểu cố định, số lượng field cố định.
Đây là một ví dụ về 1 *Collection* có tên là "Employees" chứa các *Document* về nhân viên của công ty. Mỗi *Document* chứa thông tin của một nhân viên.
![](https://images.viblo.asia/8b63975f-82a6-4fb1-8286-400446151a72.png)

# 3. Sử dụng MongoDB với Robo 3T
Robo 3T là một tool giúp chúng ta sử dụng MongoDB một cách đơn giản và hiệu quả hơn. Để tải phần mềm này, bạn truy cập vào trang web https://robomongo.org/download, có 2 phiên bản là Studio 3T (trả phí) và Robo 3T (free). Ở đây mình sẽ demo trên bản free. Vì với vai trò là QA Tester của dự án thì mình cũng chỉ có nhu cầu truy vấn và update data thôi nên bản free đáp ứng đủ nhu cầu của mình. Và quan trọng là nó FREE =)))

Sau khi cài đặt xong thì các bạn chọn tạo mới 1 connection để kết nối đến database của mình (localhost hoặc trên cloud)
![](https://images.viblo.asia/79e024c8-1d9d-45e2-ba6d-1cdecb7566c7.png)


Sau đó nhập vào thông tin của host
![](https://images.viblo.asia/1d8c6e84-6abd-4229-9802-943f754f2f39.png)

Click vào Test để kiểm tra kết nối
![](https://images.viblo.asia/b83e735f-f1cd-4ef0-858c-a23e94947129.png)

Sau khi bấm Save nó sẽ xuất hiện trên màn hình MongoDB Connections cho bạn chọn
![](https://images.viblo.asia/a194da9a-585a-4e32-ad9f-c6ed03a841e5.png)

Click vào connect để kết nối tới MongoDB. Kết nối thành công xong bạn sẽ thấy giao diện sử dụng của Robo 3T như sau.
Bên trái là danh sách các database
![](https://images.viblo.asia/6eb2a8b1-fbc7-4af0-82a6-cde926218249.png)

Để tạo 1 database các bạn chọn Create Database
![](https://images.viblo.asia/75c54a1d-a933-441c-84df-39800f1ca711.png)

Đặt tên cho database và chọn Create
![](https://images.viblo.asia/780702a1-868b-4c36-a6af-6c2ef7b36a49.png)

Sau khi tạo xong thì database của bạn sẽ xuất hiện ở khung bên trái
![](https://images.viblo.asia/5cb69b95-3592-4846-9351-19e724c894c8.png)

Tiếp theo chúng ta sẽ tạo một Collections mới (tương đương với việc tạo 1 Table)
![](https://images.viblo.asia/a357a0d5-ee3c-46c6-98c6-a7f668704cf6.png)

Đặt tên cho Collections
![](https://images.viblo.asia/59ba0ae6-9289-4ec6-9f04-48b1411bd764.png)

Tạo database và collections xong xuôi, cuối cùng là chúng ta tạo 1 document (tạo 1 bản ghi)
![](https://images.viblo.asia/1aa6b41e-0276-4cc3-b2fc-ba4e06c34fd2.png)

Document được lưu dưới dạng JSON nên chúng ta có thể thêm các trường như nào tuỳ ý, miễn là viết theo format của file JSON
![](https://images.viblo.asia/7d5fcddb-c3ca-495f-b0b3-4720d34c1b6e.png)

Truy vấn các Document trong 1 Collection bằng giao diện
![](https://images.viblo.asia/423c09fb-4e11-45d1-8558-7531bf1f1dce.png)

Hoặc bằng câu lệnh
![](https://images.viblo.asia/e0b46db4-1c25-4682-bd0a-bdafb421296e.png)

Việc update hay xoá bản ghi thi cũng tương tự, các bạn click chuột phải vào Document cần update/xoá và chọn Edit/Delete Document.

Vậy là xong! Trên đây chỉ là những câu lệnh CRUD căn bản thường dùng, các lệnh truy vấn phức tạp hơn các bạn có thể tham khảo trên trang chủ của MongoDB có hướng dẫn rất chi tiết và cụ thể.

References:
https://docs.mongodb.com/manual/core/databases-and-collections/
https://stackjava.com/mongodb/cai-dat-va-su-dung-robo-3t-robomongo-tren-windows.html