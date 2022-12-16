# 1.Giới thiệu
Xuất phát từ thực tế rằng : trong nhiều trường hợp chúng ta muốn lưu lại query để sau này có thể dùng lại nhiều lần.

Có thể là do câu query dài, khó hiểu với bạn nên khó nhớ, hay vì nó có quá nhiều tên bảng gần gần giống nhau mà thứ tự join thì cũng khiến nhức đầu .... 

Thế là ý tưởng ra đời của Stored procedure bắt nguồn từ điều này !

Cơ bản thì nó như thế này :
```
DELIMITER $$
 
CREATE PROCEDURE GetUsers()
BEGIN
    SELECT 
        userName,
        sex,
        address
    FROM
        users
    ORDER BY userName;    
END$$
DELIMITER ;
```

DELIMITER để thay đổi dấu phân cách giữa các statement trong Mysql, cái này bài sau mình sẽ nói rõ hơn !

# 2.Cách thức Stored procedure vận hành
Để có thể sử dụng lại, Mysql server sẽ cần phải lưu lại nó với một alias được chỉ định bởi người tạo. Tất cả những gì cần thao tác với nó sẽ chỉ cần thông qua alias này.

Khi lần đầu gọi tới Stored procedure:

Mysql sẽ tra cứu trong danh mục của database đó.

-> nếu có thì sẽ biên dịch đoạn code sql của nó.

-> đặt nó trong vùng nhớ cache Mysql

-> cuối cùng là thực thi nó.

Nếu trong cũng phiên kết nối DB mà gọi lại vào những lần sau thì Stored procedure sẽ được lấy luôn từ cache mà không cần phải biên dịch.

Stored procedure cho phép chúng ta truyền tham số cụ thể để tùy biến nội dung sql của mình. Giống như khai báo function vậy : getUser(id) chẳng hạn.

Một điều nữa là ta có thể gọi Stored procedure lồng nhau, tức là bên trong mã sql của Stored procedure này có thể gọi tới Stored procedure khác, module hóa nó.
# 3.Phân tích ưu nhược xem có nên
## 3.1. Ưu
- Lưu lượng truyền yêu cầu qua kết nối vô cùng tối giản.

Chúng ta vẫn biết là các ứng dụng kết nối với database qua connection, và tất nhiên là để Mysql thực thi thì bạn phải đưa cho nó toàn bộ sql source, mọi thứ hải chui qua cái kết nối kia mà chẳng mấy ai quan tâm xem nó giỏi chịu đựng đến đâu.

Còn khi dùng Stored procedure, mọi thứ gói gọn bằng việc đẩy đi alias và tham số nếu có.

Việc này sẽ làm connection sướng phát điên như cách mà bạn chat realtime sử dụng socket vậy (tất nhiên là socket ko giảm dữ liệu người dùng mà là dữ liệu của phương thức truyền tải =)) )

- Tận dụng giảm effort nếu bạn là bên cung cấp dịch vụ.


Nếu bạn là nhà cung cấp dịch vụ thì tất nhiên sẽ có những thao tác mà khách hàng chạy đi chạy lại nó, khác 1 vài trong số các đặc tính phân biệt như id hay area thì sao không sử dụng nhỉ ?
Có một ngày đẹp trời mà công ty của bạn cán mốc 1 triệu khách hàng thì sao ta, không may là do thiết kế luồng trước đấy mà cứ mỗi khi vào màn hình chính thì lại auto chạy vài 3 cái query ...

Do đó chúng ta có thể tạo Stored procedure, và mọi thứ trở nên nhẹ nhàng hơn nhiều, dù có thêm khách hàng mới thì cũng không cần phải viết lại code, việc quá tải cho connection cũng đỡ lo.

- Tạo ra cơ sở dữ liệu an toàn hơn.

Admin có thể chỉ định rõ quyền hạn xem ứng dụng nào có thể sử dụng tài nguyên dữ liệu thông qua Stored procedure.

Điều này được Mysql xác nhận qua tải khoản sử dụng. Một database sẽ có thể có nhiều tài khoản trên đó, nhưng tùy vào mục đích của các bên mà chúng ta có thể chỉ muốn sử dụng nó cho riêng tài khoản của mình. Khi đó, người hiểu nó sẽ áp dụng để tạo ra awesome còn ai chưa hiểu nó sẽ không được dùng (yaoming)

## 3.2. Nhược

- Nếu lạm dụng quá nhiều Stored procedure thì lượng bộ nhớ để lưu cache nó sẽ tăng lên đáng kể. Như vậy, ngay cả khi nó chưa die thì tốc độ cũng chai ỳ tùy vào mức độ, có thể chậm hơn cả việc không dùng.

- Lạm dụng quá nhiều đối số cho Stored procedure cũng khiến mọi thứ trở nên vô ích.

Ngoài việc code sql bên trong của bạn có thể sẽ rất phức tạp, ngay cả ở hiện tại và sau này còn tệ hơn nếu maintain thêm.

Mysql không được thiết kế tốt cho việc xử lí quá nhiều logic. Nó sẽ đẩy phần việc đó sang giai đoạn tiến trình ở CPU. Lúc này, hệ thống của bạn sẽ có thể treo ngoắc luôn chứ ko nói đến mỗi chức năng liên quan đến database đó nữa.

- Khi mã sql bên trong  Stored procedure gặp vấn đề, việc debug sẽ không mấy dễ.

Để đưa vào sử dụng  Stored procedure thì sql thường dài hoặc phức tạp, và như cách sử dụng thì ở ứng dụng ta chỉ gọi mỗi alias của nó là xong. Vậy nếu có nhiều bên sử dụng với param khác nhau thì sao nhỉ, bạn sẽ không log được final sql trong code của server đâu. Thế là dùng đầu mình để generate ra sql thôi =))

- Maintain có thể sẽ khá phức tạp.

 Stored procedure có thể ảnh hưởng lớn tới hệ thống nên một khi nó đã có vai trò nhất định rồi thì việc sửa đổi nó cần phải xem xét 1 cách kỹ lưỡng. Vừa phải phát triển, mở rộng hệ thống mà vừa đảm bảo duy trì được tính năng cũ.
 
#  Hết
Đọc xong bài này hi vọng mọi người sẽ có cái nhìn tổng quát về Stored procedure.
Tham kharo: https://www.mysqltutorial.org/