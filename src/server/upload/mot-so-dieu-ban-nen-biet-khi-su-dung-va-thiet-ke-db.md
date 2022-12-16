# I/ Lời mở đầu
Làm nghề lập trình chắc chắn ai cũng từng làm việc với **Database**. Đặc biệt là **Back-end** những người làm việc và tương tác trực tiếp với **Database**.

Nhưng vẫn có những điều về Database ta không biết đến hoặc có những điều ta đang dùng nhưng không biết tại sao ta lại dùng như vậy.

Bài viết này sẽ giúp bạn sử dụng **Database** một cách tốt hơn đặc biệt là MySQL

# II/ Database là gì
Database hay còn gọi là hệ thống cơ sở dữ liệu có cấu trúc, được lưu trữ trên một thiết bị như băng, đĩa, usb, ổ cứng,… được duy trì dưới dạng tệp tin trong hệ điều hành máy tính hay trong hệ quản trị cơ sở dữ liệu. Chúng ta thường bắt gặp thuật ngữ này khi làm việc với máy tính và phần mềm, dữ liệu với nhiều ưu điểm và nhược điểm khác nhau. Hệ thống Database rất quan trọng trong công tác làm việc với dữ liệu, nếu không có Database lưu trữ thì các thao tác với dữ liệu cũng không thể thực hiện được.
# III/ Một số điều nên biết khi sử dụng Database(DB)
### 1) Chỉ được sử dụng chữ thường, số, gạch chân
Đây là điều đơn giản nhất khi sử dụng và thiết kế DB mà chúng ta vẫn đang thực hiện. 

Đó là không được sử dụng dấu chấm ".", dấu cách " ", "dấu gạch ngang "-" khi đặt tên DB, tên bảng, tên cột nhưng có bao giờ bạn hỏi tại sao lại như vậy. Đây là lý do:
- Dấu chấm "." dùng cho các object đã được xác định như `database.schema.table.column` nên khi dùng "." để đặt tên rất dễ khiến nhầm lẫn khi query DB.
- Dấu cách " " thì sẽ khiến khi query ta thừa thêm dấu ngoặc kép khi query select column như này `select "user name" from events`. Đặc biệt trong hiện nay có rất nhiều framework ra đời giúp ta query cũng dễ dàng hơn nhưng bạn có để ý nếu ta đặt tên column có dấu cách và dùng framework để query thì sẽ có lỗi, VD với Rails:

Câu **where** trong rails bình thường:
```
User.where(user_name: "a")
```
Nhưng nếu bạn đặt tên cột là `user name` thì nó sẽ thành 
```
User.where(user name: "a") =>#Lỗi
```
Vậy là ta không thể dùng được cách viết query gọn của rails mà mình sẽ vẫn phải viết hẳn cấu query như trong MySQL nên ta thường dùng dấu "_" để thay thế dấu cách

- Còn việc không dùng chữ in hoa để tránh phải ghi nhớ ký tự hoa và ký tự thường của tên db, tên bang, tên cột khi query

### 2) Chúng ta nên có một cột Primary Key là Integer

Đây chính là nói về việc sử dụng chức năng `đánh số nguyên tăng dần tự động` của MySQL cho cột **id**. Việc này sẽ giúp cho những dữ liệu trong bảng sẽ không bị trùng lặp và là duy nhất một cách dễ dàng hơn (UUID).

Dù cho ta có thể dùng UUID với nhiều cách khác nữa nhưng việc để cột **id** là integer giúp query dễ dàng hơn rất nhiều.

Đặc biệt khi có những dữ liệu trùng lặp khi import dữ liệu cũng có thể giúp ta dễ dàng xóa đi dữ liệu thừa đó vì có **id** duy nhất

```
delete from my_table
where id in (select ...) as duplicated_ids
```

### 3) Luôn sử dụng UTC làm timezone

Việc sử dụng UTC timezone giúp ta tránh được rất nhiều lỗi khi sử dụng.

Ta có thể dễ dàng chuyển đổi dữ liệu UTC sang timezone hiện tại trên server dễ dàng

### 4) Tránh sử dụng DISTINCT
DISTINCT giúp chúng ta lấy dữ liệu không trùng lặp khi query nhưng đồng thời nó cũng khiến cho tất cả câu query của bạn chậm đi.

Việc nhận kết quả trùng lặp rất dễ xảy ra đặc biệt khi bạn query join giữa các bảng với nhau hoặc trong DB có những dữ liệu giống nhau. 

Bạn có thể dùng rất nhiều cách để có thể lấy được các dữ liệu mà không trùng lặp như sử dụng các hàm có sẵn của framework để xử lý kết quả của câu query mình nhận được.

Ta nên tránh sử dụng DISTINST nhiều nhất có thể


## Tham khảo
Các bạn có thể tìm hiểu và tham khảo thêm ở đây: https://www.periscopedata.com/blog/better-sql-schema