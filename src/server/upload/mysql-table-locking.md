Chào các bạn, hôm nay mình sẽ giới thiệu với các bạn về **Table Locking**  trong **MySQL**. Trong bài viết này tôi sẽ giúp các bạn hiểu về **Table Locking**, cách sử dụng **Table Locking** trong  **MySQL**, nào chúng ta cùng bắt đầu nhé.

### Table Locking là gì? 
**Lock** là một flag được liên kết với một table, **MySQL** cho phép một client session có thể nhận được một table lock một cách rõ ràng nhằm mục đích ngăn không cho các session khác truy cập thao tác dữ liệu vào cùng một bảng trong 1 thời gian cụ thể.

Một client session chỉ có thể lấy hoặc giải phóng các table lock cho chính nó. Tương tự thì một client session không thể giải phóng table lock cho các client session khác.

![](https://images.viblo.asia/289e7084-90c3-4690-9d16-00c4ea30fe04.png)

Để hiểu hơn về phần khái niệm ở trên chúng ta sẽ đi làm một vài ví dụ nhé. Đầu tiên tôi sẽ tạo một bảng có lên là ```messages``` để thực hành với các câu lệnh table lock.
```
CREATE TABLE messages ( 
    id INT NOT NULL AUTO_INCREMENT, 
    message VARCHAR(100) NOT NULL, 
    PRIMARY KEY (id) 
);
```

### Câu lệnh LOCK TABLES 

Dưới đây là câu lệnh để thực hiện khóa một bảng :
```
LOCK TABLES table_name [READ | WRITE]
```

Trong cú pháp này, ta chỉ định tên của bảng muốn khóa sau từ khóa ```LOCK TABLES```. Ngoài ra, chúng ta còn có thể chỉ định loại khóa là ```READ``` hoặc ```WRITE```

MySQL cho phép ta khóa nhiều bảng bằng cách chỉ định danh sách các bảng được phân tách bằng dấu phẩy với cú pháp như sau:
```
LOCK TABLES table_name1 [READ | WRITE], 
            table_name2 [READ | WRITE],
             ... ;
```

### UNLOCK TABLESCâu lệnh MySQL

Để mở khóa cho một bảng, bạn sử dụng câu lệnh sau:

```
UNLOCK TABLES;
```
### READ Locks

**READ Lock** có các tính năng sau:

* **READ Lock** cho một bảng có thể  được sử dụng lại bởi nhiều session đồng thời. Ngoài ra, các session khác có thể đọc dữ liệu từ bảng mà không cần lấy khóa.
* Session hiện tại thực hiện ```READ Lock``` chỉ có thể đọc dữ liệu từ bảng nhưng không thể ghi, các session khác không thể ghi dữ liệu vào bảng cho đến khi ```READ Lock```  được giải phóng. Các hoạt động ghi từ một session sẽ được đưa vào trạng thái chờ cho đến khi ``` READ Lock``` được giải phóng.
* Nếu session kết thúc bình thường hoặc bất thường, MySQL sẽ giải phóng tất cả các khóa một cách ngầm định. Tính năng này cũng có liên quan đến ```WRITE Lock```.

Chúng ta cùng xem cách hoạt động của ```READ Lock``` trong  trường hợp sau:

Trong session đầu tiên:
Trước tiên hãy kết nối với cơ sở dữ liệu và sử dụng hàm CONNECTION_ID() để lấy id kết nối hiện tại như sau:
```
SELECT CONNECTION_ID();
``` 
Hàm này sẽ trả về id kết nối của session hiện tại của bạn. 

![](https://images.viblo.asia/b2d92fa9-efe5-49cb-b569-95c3f3f6cc42.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)

Sau đó, hãy thêm bản ghi vào bảng ```messages```.
```
INSERT INTO messages(message) 
VALUES('Hello');
```
Thực hiện truy vấn dữ liệu với bảng ```messages```
```
SELECT * FROM messages;
```
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f18.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)


Bây giờ, hãy thử khóa bảng bằng cách sử dụng câu lệnh ```LOCK TABLE``` 

```
LOCK TABLE messages READ;
```
Tiếp theo hãy thêm một bản ghi vào bảng ```messages```

```
INSERT INTO messages(message) 
VALUES('Hi');
```
MySQL đã phát hành lỗi sau
```
Error Code: 1099. Table 'messages' was locked with a READ lock and can't be updated.
```
Vì vậy, một khi sử dụng ```HEAD Lock``` chúng ta sẽ không thể ghi thêm dữ liệu vào bảng kể cả là trong cùng 1 session.

Hãy thử kiểm tra ``` HEAD Lock``` từ một session khác.

Đầu tiên hãy tạo một session khác kết nối với databases của bạn và kiểm tra id kết nối:
```
SELECT CONNECTION_ID();
```
![](https://images.viblo.asia/58109e2c-e5b4-4ef4-9258-698eb0cdbab8.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)

Tiếp theo, truy vấn dữ liệu từ bảng ```messages```:
```
SELECT * FROM messages;
```
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f18.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)

Sau đó, hãy thêm bản ghi vào bảng ```messages```:
```
INSERT INTO messages(message) 
VALUES('Bye');
```
Đây là đầu ra:

![](https://images.viblo.asia/128bf693-a991-4723-931a-1337b10bc170.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)

Thao tác thêm bản ghi từ session có ```CONNECTION_ID = 11``` đang ở trạng thái chờ vì hiện tại session đầu tiên đang thực hiện ```HEAD Lock``` trên bảng ```messages``` và nó vẫn chưa được giải phóng.

Bây giờ hãy chuyển sang session đầu tiên và thực hiện câu lệnh ```SHOW PROCESSLIST```
```
SHOW PROCESSLIST;
```
![](https://images.viblo.asia/968fbda6-ec1c-4ab6-bf3c-4169eba6df94.png)
![](https://images.viblo.asia/33ec450d-f614-4726-9631-afe104ea9f1.png)

Các bạn có thể thấy thông tin chi tiết về thao tác thêm bản ghi ở session đang ở trong hàng chờ.

Như đã nói phía trên muốn thao tác này được thực hiện bạn cần phải giải phóng session đầu tiên bằng cách sử dụng lệnh ```UNLOCK TABLES```. Sau khi chúng ta giải phong ```READ Lock``` của session đầu tiên, câu lệnh ```INSERT``` hoạt động từ phiên thứ sẽ được thực thi.

Bây giờ các bạn có thể kiểm tra dữ liệu của bảng ```messages``` để xem câu lệnh ```INSERT``` từ session thứ hai có thực sự đã được thực thi.
```
SELECT * FROM messages;
```
![](https://images.viblo.asia/2cbe5b2e-539f-47ea-a211-6bbab9f3143e.png)
![](https://images.viblo.asia/2cbe5b2e-539f-47ea-a211-6bbab9f31243e.png)

### Write Locks

**WRITE lock** có các tính năng sau:

* Chỉ có session hiện tại đang locking mới có thể đọc và ghi dữ liệu từ bảng
* Các session khác không thể đọc và ghi dữ liệu vào bảng cho đến khi ```WRITE lock``` được giải phóng.

Hãy cùng làm một vài ví dụ để xem cách thức hoạt động của ```WRITE lock```.

Đầu tiên hãy thực hiện câu lệnh ```WRITE lock``` ở session đầu tiên.
```
LOCK TABLE messages WRITE;
```
Sau đó, hãy thêm một bản ghi vào bảng ```messages```
```
INSERT INTO messages(message) 
VALUES('Good Moring');
```
Kiểm tra dữ liệu trong bảng ```messages```.
```
SELECT * FROM messages;
```
![](https://images.viblo.asia/6392d3bf-6fe3-4615-8613-dd2148890e2e.png)
![](https://images.viblo.asia/6392d3bf-6fe3-4615-8613-dd2148s890e2e.png)

Như vậy sau khi thực hiện khóa bảng với từ khóa ```WRITE lock``` thì ta vẫn có thể thao tác với dữ liệu trên bảng này từ session đã locking bảng.

Bây giờ hãy thử đọc và ghi dữ liệu từ session thứ hai.
```
INSERT INTO messages(message) 
VALUES('Good Night');

SELECT * FROM messages;
```
Lúc này MySQL đặt các hoạt động này vào trạng thái chờ. Bạn có thể kiểm tra nó bằng cách sử dụng lệnh ```SHOW PROCESSLIST``` ở session đầu tiên.
```
SHOW PROCESSLIST;
```
![](https://images.viblo.asia/9e948071-aab7-473b-ae0e-d458379fc523.png)
![](https://images.viblo.asia/9e948071-aab7-473b-ae0e-d458379fcs523.png)

Muốn các lệnh trên được thực hiện các bạn cần giải phóng khóa ở session đầu tiên.

```
UNLOCK TABLES;
```

Để kiểm tra xem các lệnh chở ở session thứ hai có được thực hiện thật không hãy truy vấn lại dữ liệu ở bảng ```messages```.
```
SELECT * FROM messages;
```

![](https://images.viblo.asia/48f5399a-65be-4c96-892e-b58ac74fe217.png)
![](https://images.viblo.asia/48f5399a-65be-4c96-892e-b58ac74fe217S.png)

Vậy là câu lệnh insert ở session đã được thực hiện.

### Kết luận

Như vậy trong bài viết này mình đã giới thiệu đến các bạn về khái niệm **Table Locking** trong **MySQL**, và cách đống mở khóa với hai loại khóa **READ lock** và **WRITE lock** khi thao tác giữa các session khác nhau. Hi vọng thông qua bài viết này các bạn sẽ hiểu hơn về **Table Locking** để có thể áp dụng để giải quyết các bài toàn trong công việc. Cảm ơn vì đã đọc!

### Nguồn tham khảo

1. https://www.mysqltutorial.org/
2. https://dev.mysql.com/doc/refman/8.0/en/lock-tables.html
3. https://riptutorial.com/mysql/topic/5233/mysql-lock-table