Khi viết một server application mà nó connect đến Database bạn thường xuyên gặp phải đối phó connection pools.
Ở bài viết này mình sẽ đi sâu vào vấn đề connection pools.

###  Quá nhiều connections

Server applications có chung một số yêu cầu là đáp ứng được request độc lập từ nhiều client.
Một cách thuần túy khi  viết một server application khi sử dụng Database sẽ tạo mới một connection đến Database cho mỗi request.
Rất tiếc là cách tiếp cận đó không thể đáp ứng việc scale bởi vì tại một thời điểm bạn chỉ có thể mở một lượng giới hạn connection nếu không hệ thống sẽ bị treo.
Việc close connection thì không rẻ đối với cả applications và cả Database.<br/>
Tin tốt là bạn hoàn toàn có thử giải quyết vấn đề đó bằng cách sửa code của bạn.
Nhưng vấn đề là khi nhiều người cùng tham gia code một application thì sao? Đó là lý do các patterns  về connection pools ra đời.


### Connection pools hoạt động như thế nào?

Một nguyên tắc cơ bản là một App sẽ implements một connection pool open  n connections đến Database.
Và có một cơ chế để đánh dấu connections là "available" hay "in use".
Khi gọi `connect()` thì một connection sẽ được lấy ra khỏi pool ( nó được đánh dấu là "in use" và trả về 1 connection cho lời gọi).
Khi `close()` thì nó sẽ được put lại pool (chứ không thực sự đóng lại).

### Ngăn chặn connections leaking

Connection pools thì triển khai một config là giới hạn max connection có thể mở tại 1 thời điểm.
Leak connection sẽ làm cho lời gọi `connect()` bị treo mãi mãi ( vì connection pools sẽ từ chối mở 1 connection mới và nó sẽ chờ đợi một connection "available").
Để ngăn leak hãy đảm bảo rằng code của bạn gọi `close()` khi không sử dụng. 

### Kết luận 
Quản lý connection là một phần quan trọng của server-side application. 
Ở các kiến trúc phức tạp, connection pools cho phép bạn nghĩ về quản lý connection một cách dễ dàng hơn.