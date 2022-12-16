![](https://images.viblo.asia/9fa318d9-3f3e-4e3d-be3f-1846199e4955.jpg)

MySQL có lẽ là cơ sở dữ liệu phổ biến nhất thế giới hiện tại và có lẽ trong nhiều năm tới. Rất nhiều người trong số chúng ta đã và đang làm việc với MySQL nhưng chưa thực sự tối đa hóa sức mạnh của cơ sở dữ liệu "quốc dân" này.

Trong phần đầu của series tối ưu hóa MySQL, mình sẽ giới thiệu về kiến trúc của MySQL, vì chỉ khi chúng ta nắm rõ "nội thất" bên trong chúng ta mới có thể dễ dàng "thâm nhập" phải không nào!!! Let's go.


# MySQL’s Logical Architecture

![](https://images.viblo.asia/3c19e367-9c5c-4b75-a35f-26c2039e3d0b.png)

Như bạn có thể thấy trên hình, kiến trúc logic của MySQL gồm 3 layers chính. 

+ Layer trên cùng chỉ ra các services mà MySQL cung cấp cho các hệ thống mạng client/server bao gồm xử lí kết nối, xác thực, bảo mật
+ Layer ở giữa, là trung tâm xử lí của MySQL bao gồm việc phân tích câu truy vấn, tối ưu hóa, caching và các hàm sẵn có trong MySQL
+ Layer dưới cùng bao gồm **storage engine**  chịu trách nhiệm cho với lưu trữ và lấy ra dữ liệu. Các storage engine phổ biến hiện nay của MySQL là InnoDB và MyISAM.

### Connection Management and Security

Mỗi client connection tới MySQL server sẽ có 1 thread cùng process với server process.

Khi client kết nối tới MySQL server, server sẽ cần xác thực họ thông qua username, password, host. Chúng ta có thể xác thực với server thông qua câu lệnh 
```mysql
mysql -u <USERNAME> -p <PASSWORD>
```

### Optimization and Execution

MySQL sẽ phân tích câu truy vấn thành để tạo ra 1 cây truy vấn sau đó sẽ áp dụng các cách tối ưu khác nhau.
Đây là một ví dụ về cây phân tích của MySQL.
![](https://images.viblo.asia/3f5b14b7-7c1b-483e-b56c-cfc3ccbebd1c.png)

Các cách MySQL sử dụng để tối ưu câu truy vấn có thể là viêt lại câu truy vấn, chọn index để sử dụng, xác định thứ tự thực hiện của câu truy vấn. Như vậy MySQL đã hợ trợ chúng ta trong việc tối ưu cách chạy câu truy vấn 1 phần. Để xem cách MySQL chúng ta có thể sử dụng từ khóa **EXPLAIN**.  Các optimizer không thực sự quan tâm **storage engine** mà bảng sử dụng. Nhưng với mỗi **storage engine** khác nhau sẽ ảnh hưởng khác nhau đến qúa trình tối ưu câu truy vấn. Ví dụ mỗi **storage engine** đều sẽ cung cấp các loại index riêng của chúng, k phải **storage engine** đều cung cấp B-Tree Index, Hash Index.

# Concurrency Control

Bất cứ khi nào, có hơn 1 câu query cần thay đổi cùng dữ liệu tại cùng thời điểm, vấn đề xử lí tương tranh sẽ diễn ra. MySQL sẽ xử lý vấn đề này ở 2 cấp độ là server và storage engine.

### Read/Write Locks

Đây là cách đơn giản nhất để xử lí tương tranh. Chỉ cho 1 client có khả năng write tại 1 thời điểm, nhưng client khác chỉ có quyền read. Nhưng việc lock như vậy sẽ dẫn tới những bất cập, vì có thể các client có thể tương tác với các record,các bảng khác nhau, nên thay vì lock toàn bộ resource, chúng ta có thể lock những dữ liệu nhất định. 2 cơ chế lock phổ biến nhất giải quyết vấn đề này là **Table locks** và **Row locks**. 

### Table locks

Khi client cần 1 sự thay đổi tới bảng (insert, update, delete), cả bảng sẽ bị lock lại. MyISAM sử dụng cơ chê locking này.

### Row locks
Khi client cần 1 sự thay đổi tới 1 bản ghi cụ thể chỉ bản ghi đấy mới bị lock lại. InnoDB sử dụng cơ chế locking này. 

# Transaction 

Đây là một khái niệm mà rất nhiều bạn hay đưa ra các ví dụ nhầm lẫn với locking.

Transaction trong MySQL là 1 tập các câu truy vấn, nhưng lại được coi như 1 đơn vị công việc . 1 transaction thành công khi tất cả các câu truy vấn của nó thành công, bất kì câu truy vấn nào thất bại đều dẫn tới transaction bị rollback. Transaction cũng cần đảm bảo tính chất ACID đó là: 

* Atomicity: 1 transaction đã được coi như là 1 đơn vị công việc nên không có những thứ như là thành công 1 phần, đã thành công là phải thành công hết. 
* Consistency: 1 transaction cần đảm bảo tính toàn vẹn của dữ liệu kể cả khi transaction thành công hay thất bại
* Isolcation: Kết quả của transaction chỉ được hiện ra khi transaction hoàn thành. 
* Durability: Một khi đã được commited, nhưng thay đổi của transactions sẽ là vình viễn.

# Storage engines
MySQL có 2 cơ chế lưu trữ phổ biến đó là InnoDB, MyISAM. Vậy tại sao 2 cơ chế này phổ biến. Vì đơn giản 2 cơ chế lưu trữ này đưa cho người dùng nhiều tính năng như đánh index, tối ưu truy vấn, ...
## InnoDB
### Overview
Là cơ chế lưu dữ liệu mặc định cho MySQL. Có 1 một lời khuyên rằng "*You should use InnoDB for your tables unless you have a compelling need to use a different engine*" để nói lên sự phổ biến và hữu dụng của cơ chế lưu trữ này.
InnoDB lưu trữ dữ liệu dưới dạng 1 series của một hay nhiều file và được biết đến với tên gọi **tablespace**. Từ phiên bản MySQL 4.1, InnoDB có thể lưu trữ mỗi bảng table và index trong các file riêng biệt. Nếu bạn tò mò về điều này thì bật terminal nên và gõ `cd var/lib/mysql` hoặc nơi bạn config để chưa dữ liệu sẽ hiện ra các file **.frm**,  **.ibd**. Đó là các file chứa dữ liệu chính của chúng ta. 

InnoDB sử dung cơ chế MVCC để đạt được tính đồng bộ cao, cách đánh index của InnoDB cũng khác với các cơ chế lưu trữ khác của MySQL. Mình sẽ trình bày vấn đề này chi tiết trong bài viết về index. 

## MyISAM
### Overview
Tương tự InnoDB, MyISAM cũng lưu trữ dữ liệu dưới các file như **.myd**,  **.myi**. Như mình đã trình bày thì MyISAM sử dụng cơ chế table locking. Đó là yếu điểm lớn nhất của cơ chế lưu trữ này. Nhưng MyISAm cũng có nhiều điểm nội bật như hỗ trợ full text index, khả năng nén, cơ chế repair. Các bạn có thể tìm hiểu thêm về các tính năng nổi bật này qua các doc của MyISAM

# Tổng kết 
Như vậy trong bài viết này, mình đã tổng hợp những kiến thức cơ bản về kiến trúc, những đặc điểm nổi bật, và các cơ chế lưu trữ của MySQL.
Hi vọng các bạn sẽ dành thời gian đọc các bài viết tiếp theo trong series này của mình.
Happy coding.


# Tham khảo 
http://shop.oreilly.com/product/0636920022343.do

# Updated
Mình đã hoàn thành xong phần 2 của series này. Rất mong được các bạn tiếp tục ủng hộ [Optimizing Schema and Data Types](https://viblo.asia/p/optimizing-schema-and-data-types-maGK7qjAlj2)