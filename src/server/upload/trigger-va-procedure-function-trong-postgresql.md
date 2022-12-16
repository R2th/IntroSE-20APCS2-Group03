# Đặt vấn đề cho việc tại sao phải sử dụng trigger và function trong PostgreSQL?
### Nguyên nhân
- Dự án sử dụng source cũ và xây dựng 1 con mới, tuy nhiên database lại vẫn giữ nguyên. Có những trường content được tạo ra bởi nhiều batch, nhiều backend khác nhau (update chung 1 bảng trong cơ sở dữ liệu). 
- Hệ thống tracking dữ liệu và lọc ra dựa theo keyword cần biết được các bài viết có thay đổi ( tiêu đề, nội dung, từ khóa v...v...) hay không để cập nhập hoặc notification đến user.
- Không can thiệp bằng SQL đến cơ sở dữ liệu của khách hàng mà cần tạo migration để có thể rollback hoặc deploy.
### Hướng giải quyết
**Cách 1 - Thay đổi source code**
- Thay đổi source code cũ và hệ thống mới, cập nhập trước khi update đến bảng liên quan sẽ xử lý keyword cần tracking.

*Cách thức này có lợi khi không động vào cơ sở dữ liệu của khách hàng, tuy nhiên việc thay đổi source code cũ của khách hàng cũng tiềm ẩn nguy cơ rất lớn.*

**Cách 2 - Tạo trigger và function trong database**
- Mỗi thay đổi từ bất cứ đâu đều mục đích cuối cùng là cập nhập bảng dữ liệu trong database do đó nếu tạo trigger xử lý trong database theo dõi sự thay đổi của các trường cần thiết là đơn giản nhất.
- Ưu điểm và thuận lợi khi sử dụng Trigger:
    - Tự động: Trigger sẽ tự động được gọi ngay khi có sự thay đổi trên bảng dữ liệu ( trước hoặc sau )
    - Trigger có thể thực hiện các cascade khi việc thi hành có ảnh hưởng đến những bảng liên quan.
    - Trigger ít bị hạn chế hơn so với các ràng buộc giá trị - tức là có thể tham chiếu đén những cột của những bảng dữ liệu khác.
- Khi trigger được kích hoạt bởi 1 lệnh Transact-SQL insert để thêm một dữ liệu mới vào bảng ABC thì dữ liệu mới này sẽ được lưu vào một bảng tạm có cấu trúc cùng với bảng ABC. Khi kết thúc trigger này thì bộ dữ liệu mới thật sự lưu xuống database.
- Tính an toàn cao do các dữ liệu bị xóa sẽ được chuyển tạm vào cacsc bản tạm deleted tương ứng.
- Đặc tính:
    - Cho phép truyền các tham số đầu vào và chấp nhận các giá trị chứa trong các tham số hoặc trả về các trạng thái giá trị để gọi những thủ tục hoặc thực hiện các xử lý theo lô.
    - Các lệnh gọi thủ tục thực thi có thể chứa các câu lệnh SQL khác thực hiện xử lý trong database.

### Cách tạo trigger trên PostgreSQL:
Trước hết, cần tạo 1 function có tên **update_timestamp**

Định nghĩa thân hàm phải là một định nghĩa DECLARE-BEGIN-END. Trong đó, mỗi khai báo (declaration) và mỗi dòng lệnh (statement) kết thúc bằng dấu chấm phẩy.

Trong trường hợp phức tạp, định nghĩa gốc này có thể có nhiều lốc con DECLARE-BEGIN-END, khi đó mỗi zone con này kết thúc bằng END và dấu chấm phẩy theo sau.

Chú ý không nên nhầm lẫn : BEGIN/END của PL/pgSQL nhằm nhóm các lệnh vào một lốc. Còn BEGIN/END của SQL nhằm khởi đầu và kết thúc một giao dịch (transaction).
```
CREATE OR REPLACE FUNCTION public.update_timestamp()
  RETURNS trigger AS
$BODY$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$BODY$
  LANGUAGE plpgsql;
```
Lệnh EXECUTE cho phép thực thi câu truy vấn SQL động định nghĩa bằng một chu

Cấu trúc của trigger được tạo trong PostgreSQL là:
```
CREATE [ CONSTRAINT ] TRIGGER name { BEFORE | AFTER | INSTEAD OF } { event [ OR ... ] }
    ON table_name
    [ FROM referenced_table_name ]
    [ NOT DEFERRABLE | [ DEFERRABLE ] { INITIALLY IMMEDIATE | INITIALLY DEFERRED } ]
    [ FOR [ EACH ] { ROW | STATEMENT } ]
    [ WHEN ( condition ) ]
    EXECUTE PROCEDURE function_name ( arguments )
```
Ví dụ: 
Sau khi tạo function thì sẽ tạo trigger sử dụng function đó để xử lý
```
CREATE TRIGGER trigger_upd_timestamp_last_updated_tbl_books
  BEFORE UPDATE
  ON public.tbl_books
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_timestamp();
```
Các parameter trong trigger:

| Name  | Giới thiệu|
| -------- | -------- |
| name     | Tên của trigger đó, mỗi một trigger trên cùng 1 bảng cần 1 tên khác nhau|
| BEFORE  AFTER INSTEAD OF | Xác định xem hàm được gọi trước hay vì sự kiện được thực thi trước. Có thể kích hoạt trigger đó sau khi được gọi |
| event |  Một trong các sự kiện: INSERT, UPDATE, DELETE hoặc TRUNCATE thì sẽ gọi đến trigger đó |
| **DEFERRABLE NOT** or **DEFERRABLE** or **INITIALLY IMMEDIATE** or **INITIALLY DEFERRED** | Khoảng thời gian gọi đến trigger đó |
| **FOR EACH ROW** or **FOR EACH STATEMENT** | Chỉ định mặc định cho việc kích hoạt 1 lần hay khi mỗi hàng thay đổi thì sẽ kích hoạt |