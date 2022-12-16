# Primary Key
Trước khi nhắc đến Surrogate Key và Natural Key, chúng ta cần ôn lại khái niệm về Primary Key

Primary Key (Khoá chính) được dùng để định danh mỗi một record (bản ghi) trong bảng (table) của CSDL
Khoá chính còn được sử dụng để thiết lập các mối quan hệ (1-n) hoặc có thể gọi là ràng buộc tham chiếu giữa 2 bảng với nhau trong
 
Một số yêu cầu khi khởi tạo khoá chính:
- Giá trị của khoá chính trong mỗi bản ghi phải là duy nhất và không được chứa giá trị Null
- Một bảng chỉ nên có 1 khoá chính, khoá chính có thể được tạo ra từ 1 hoặc nhiều field khác nhau của 1 bảng

Surrogate Key và Natural Key là các cách chọn khoá chính mà chúng ta sẽ đề cập dưới đây.
# Surrogate Key 
## Khái niệm 
- Là loại khoá không có ý nghĩa trong ngữ cảnh nghiệp vụ (no real **contextual/business meaning**) . Tạm hiểu là không có liên hệ nào với dữ liệu mà hoàn toàn chỉ được dùng để làm định danh cho bản ghi
- Surrogate Key thường ở dạng Numeric, được sử dụng phổ biến nhất là giá trị số nguyên tăng tuần tự được cung cấp bởi các RDBMS (hệ quản trị CSDL quan hệ như MySQL, MS Acess, Oracle, ...)
- Trong một vài trường hợp, Surrogate Key có thể bao gồm giá trị date/time ở thời điểm tạo bản ghi hoặc tổ hợp chuỗi số và chữ ngẫu nhiên 
## Ví dụ


|RoomID| BuildingCode | RoomNo | Capacity |
|--------| -------- | -------- | -------- |
|1| BA  | 302     | 163     |
|2|BB|311|111
|3|BA|357|175

Trường RoomID được chọn làm khoá, và là Surrogate Key. Mỗi bản ghi được thêm vào, hệ thống sẽ tự tinh ra RoomID tương ứng bằng số lượng bản ghi có sẵn + 1

## Ưu điểm và hạn chế
**Ưu điểm của Surrogate Key**
- Surrogate Key không liên quan đến nghiệp vụ của bạn (tức thuần tuý sử dụng vì lý do kỹ thuật) nên rất dễ cho quá trình Maintain hệ thống 
- Nếu hầu hết các bảng trong CSDL đều sử dụng Surrogate Key sẽ giảm thiểu được tương đối số lượng mã nguồn cần sử dụng (bạn sẽ thấy rõ điều này khi chúng ta phân tích Natural Key trong trường hợp nó là Composite Keys)
- Surrogate Key thường do hệ quản trị sinh ra theo 1 quy luật xác định, do đó luôn đảm bảo các giá trị sinh ra không bị trùng lặp cũng như bị giới hạn về mặt quy tắc sinh

**Hạn chế của Surrogate Key**
- Bất lợi lớn nhất của Surrogate Key cũng xuất phát từ việc nó không có ý nghĩa, gây khó hiểu cho người dùng cuối (non-IT) khi làm việc với nó
- Gặp khó khăn trong việc sao chép dữ liệu. Ví dụ khi bạn muốn tạo ra 1 database mới nhưng sao chép dữ liệu từ database cũ. Hãy đảm bảo các auto-generated key được sinh ra không bị thay đổi, vì nếu các key đó làm Forein Key cho 1 bảng khác, dữ liệu khi đó sẽ sai.
# Natural Key
## Khái niệm
- Là loại khoá sử dụng chính một hoặc kết hợp nhiều thuộc tính có sẵn của đối tượng lưu trữ trong CSDL để làm khoá
- Do đó, Natural Key có ý nghĩa trong ngữ cảnh nghiệp vụ (Phân biệt với Surrogate Key)
- Natural có thể là 1 thuộc tính nhưng đôi khi là những Composite Keys (Tạm dịch là khoá phức hợp, tức là ta cần 2 hoặc nhiều giá trị trong 1 row để xác định chúng). Xem ví dụ để hiểu hơn về trường hơp này
## Ví dụ
**Ví dụ 1**
|StudentID| StudentName | DateOfBirth |
|--------| -------- | -------- | 
|B16DCAT075| Bùi Xuân Huy  | 5/7/1998     | 
|B16DCAT096|Nguyễn Thành Long|11/11/1998|
|B16DCAT077|Hoàng Quốc Khánh|13/3/1998|

StudentID là thuộc tính có sẵn của đối tượng. StudentID của các sinh viên khác nhau sẽ luôn khác nhau, do đó sử dụng StudentID làm khoá. Đây là một Natural Key

**Ví dụ 2**
| BuildingCode | RoomNo | Capacity |
|--------| -------- | -------- | -------- |
| BA  | 302     | 163     |
|BB|311|111
|BA|357|175
Quay lại ví dụ về Room. Lần này ta không thêm trường RoomID làm khoá. 2 Building khác nhau có thể đánh số phòng giống nhau nhưng chắc chắn không có 2 Room trong cùng Building đánh số giống nhau. Do đó, ta cần 2 giá trị BuildingCode + RoomNo để xác định một bản ghi. Tổ hợp khoá BuildingCode + RoomNo ở đây là một Natural Key và là Composite Keys 

## Ưu điểm và hạn chế
**Ưu điểm của Natural Key**
- Lợi thế của Natural Key là chúng đã tồn tại sẵn trong dữ liệu, ta không cần tạo thêm một giá trị mới cho Database Schema của mình, qua đó tiết kiệm bộ nhớ được cấp phát
- Do Natural Key có ý nghĩa nghiệp vụ, cho nên người dùng cuối (non-IT) dễ hiểu và sử dụng chúng

**Hạn chế của Natural Key**
- Do Natural Key gắn chặt với nghiệp vụ của bạn, cho nên khi có bất kì sự thay đổi nào về Business Rules, việc maintain hệ thống diễn ra rất phức tạp, bạn sẽ phải thay đổi giá trị khoá ở nhiều nơi
- Natural Key trong nhiều trường hợp thường rất dài và cồng kềnh (có thể cần 2-3 giá trị hoặc nhiều hơn)
- Việc truy vấn dữ liệu dạng text thường chậm hơn so với truy xuất dữ liệu Numeric (Surrogate Key)

# Vậy khoá nào tốt hơn ??? :thinking:
Thực tế, đây là một chủ đề gây ra nhiều tranh cãi. Mỗi loại khoá đều có ưu, nhược điểm của mình. Do đó, việc lựa chọn loại khoá nào phụ thuộc vào đặc điểm của hệ thống, quan điểm của mỗi người thiết kế cũng như đặc tính của CSDL.

VÍ dụ trong trường hợp CSDL lưu thông tinh sinh viên, ta có 1 trường mã sinh viên  (thoả mã điều kiện không có 2 sinh viên chung 1 mã). Ta hoàn toàn có thể sử dụng luôn thuộc tính đó làm khoá chính (Natural Key) thay vì tạo thêm 1 trường id tự tăng làm khối dữ liệu của chúng ta phình lên.

Tuy nhiên, trong trường hợp, ta cần Composite Keys phức tạp, việc thêm một trường id (Surrogate Key) đem lại nhiều lợi ích về mặt hiệu năng.