## Giới thiệu
Transaction là một đơn vị công việc. Transaction được xem là thành công khi và chỉ khi tất cả thao tác sửa đổi dữ liệu trong một giao dịch được thực hiện và được lưu trong cơ sở dữ liệu vĩnh viễn (dữ liệu đã được commit). Nếu Transaction được quay lui (rollback) hoặc hủy bỏ, khi đó nó có nghĩa là Transaction đã gặp các lỗi và không thực hiện bất kỳ thay đổi nào trong nội dung của cơ sở dữ liệu. Do đó, Transaction có thể được triển khai hoặc rollback.
## Nhu cầu sử dụng
Có rất nhiều trường hợp người dùng cần phải thực hiện nhiều thay đổi dữ liệu trong nhiều bảng cơ sở dữ liệu trong cùng một xử lý. Trong nhiều trường hợp, dữ liệu sẽ không phù hợp để thực thi các lệnh riêng lẻ. Giả sử nếu câu lệnh đầu tiên thực hiện chính xác nhưng các câu lệnh khác thất bại thì dữ liệu vẫn còn ở trạng thái không chính xác.
Ví dụ kinh điển là kịch bản chuyển tiền trong hệ thống ngân hàng.  Đầu tiên, người dùng phải tăng số dư tài khoản đích và sau đó giảm số dư của tài khoản nguồn. Người dùng phải xem xét xem các giao dịch có được triển khai không và có cùng những thay đổi được thực hiện cho tài khoản nguồn và tài khoản đích. Lúc này chúng ta cần sử dụng Transaction, để chắc chắn rằng tất cả xử lý đều phải thực hiện thành công, nếu có lỗi thì sẽ thực hiện rollback lại dữ liệu trước khi thực hiện giao dịch.

### Định nghĩa Transaction: 
Một đơn vị công việc hợp lý phải thể hiện bốn thuộc tính để đủ điều kiện là một transaction:
1.  **Tính nguyên tử**: Nếu transaction có nhiều phép tính thì tất cả phải được thực hiện. Nếu bất kỳ phép tính nào trong nhóm thất bại thì nó nên được rollback (trở lại trạng thái trước khi transaction bắt đầu)
2.  **Tính nhất quán**: Chuỗi các phép tính phải nhất quán
3.  **Cô lập**: Những phép tính được thực hiện phải được phân lập từ những phép tính khác trên cùng một máy chủ hoặc trên cùng một cơ sở dữ liệu.
4.  **Độ bền**: Những phép tính được thực hiện trên cơ sở dữ liệu phải được lưu lại và lưu trữ trong cơ sở dữ liệu vĩnh viễn (commit data)

### Thực hiện transaction
SQL Server hỗ trợ các giao tác trong một số chế độ:
* Tự động thực hiện giao tác : Mỗi câu lệnh đơn được thực hiện và tự động commit ngay sau khi nó hoàn thành. Ở chế độ này, người ta không cần phải viết bất kỳ câu lệnh cụ thể nào để bắt đầu và kết thúc các transaction. Mỗi câu lệnh được xem là 1 transaction, đây là chế độ mặc định cho SQL Server Database Engine.
* Các transaction rõ ràng : Mọi transaction bắt đầu một cách rõ ràng với câu lệnh BEGIN TRANSACTION và kết thúc với giao tác ROLLBACK hoặc COMMIT.
* Các transaction ẩn : Một transaction mới sẽ tự động bắt đầu khi transaction trước đó hoàn thành và mọi transaction được hoàn thành một cách rõ ràng bằng cách sử dụng câu lệnh ROLLBACK hoặc COMMIT.

## Lệnh kiểm soát transaction
### 1. BEGIN TRANSACTION
Câu lệnh BEGIN TRANSACTION đánh dấu điểm bắt đầu của một transaction. Cú pháp:
```sql
BEGIN { TRAN | TRANSACTION }
    [ { transaction_name | @tran_name_variable }
      [ WITH MARK [ 'description' ] ]
    ]
;
```
Trong đó:

- **Transaction_name** : chỉ ra tên được gán cho transaction. Cần thực hiện theo những quy tắc đặt tên và giới hạn tên dài không quá 32 ký tự.
- **@tran_name_variable** : chỉ ra tên của một biến do người dùng định nghĩa. Biến có thể được khai báo là kiểu dữ liệu char , varchar , nchar , hoặc nvarchar . Nếu có nhiều hơn 32 ký tự được truyền vào biến, khi đó chỉ có 32 ký tự được sử dụng và các ký tự còn lại sẽ bị cắt bớt.
- **WITH MARK [ 'description']** : chỉ ra transaction được đánh dấu trong log, cùng mô tả cho định nghĩa đánh dấu này.

Ví dụ về khai báo transaction sử dụng biến tên định nghĩa một transaction sẽ xóa một hồ sơ ứng viên có JobCandidateID là 13
```sql
USE AdventureWorks;
GO
DECLARE @TranName VARCHAR(30);
SELECT @TranName = 'FirstTransaction';
BEGIN TRANSACTION @TranName;
DELETE FROM HumanResources.JobCandidate WHERE JobCandidateID = 13;
```
### 2. COMMIT TRANSACTION
Câu lệnh COMMIT TRANSACTION này đánh dấu sự kết thúc của một transaction thành công. Nếu @@TRANCOUNT = 1, khi đó, COMMIT TRANSACTION thực hiện tất cả thay đổi dữ liệu được thực hiện trên cơ sở dữ liệu và trở thành một phần vĩnh viễn của cơ sở dữ liệu. Hơn nữa, nó giải phóng các nguồn lực do transaction nắm giữ và giảm xuống @@TRANCOUNT = 0
Mỗi lệnh commit transaction sẽ giảm @@TRANCOUNT xuống 1 đơn vị: @@TRANCOUNT = @@TRANCOUNT - 1
Cú pháp:
```sql
COMMIT { TRAN | TRANSACTION } [ transaction_name | @tran_name_variable] ];
```
Trong đó:

- **Transaction_name** : chỉ ra tên được gán cho transaction đã khai báo ở BEGIN TRANSACTION trước đó.
- **@tran_name_variable** : chỉ ra tên của một biến do người dùng định nghĩa.
Ví dụ cho thấy cách thực hiện một giao tác trong bảng HumanResources.JobCandidate của cơ sở dữ liệu AdventureWorks (Có sẵn trong CSDL khi cài đặt SQL Server) định nghĩa một transaction sẽ xóa một hồ sơ ứng viên có JobCandidateID là 11:
```sql
BEGIN TRANSACTION;
GO
DELETE FROM HumanResources.JobCandidate WHERE JobCandidateID = 11;
GO	
COMMIT TRANSACTION;
GO
```

### 3. COMMIT WORK
Câu lệnh COMMIT WORK đánh dấu sự kết thúc của transaction. Sau đây là cú pháp:
```sql
COMMIT [ WORK ] [ ; ]
```
COMMIT TRANSACTION và COMMIT WORK là giống hệt nhau, ngoại trừ một thực tế là COMMIT TRANSACTION chấp nhận tên giao tác do người dùng định nghĩa, còn COMMIT WORK thì không.
### 4. ROLLBACK TRANSACTION
Rollback transaction được sử dụng để xóa tất cả các sửa đổi dữ liệu được thực hiện từ khi bắt đầu giao dịch hoặc tới điểm đã lưu. Nó còn giải phóng các nguồn lực do giao tác nắm giữ.
Cú pháp:
```sql
ROLLBACK { TRAN | TRANSACTION }
     [ transaction_name | @tran_name_variable
     | savepoint_name | @savepoint_variable ]
[ ; ]
```
Trong đó:

- **savepoint_name** : chỉ ra savepoint_name từ câu lệnh SAVE TRANSACTION . Sử dụng savepoint_name chỉ khi một lần quay lui có điều kiện ảnh hưởng đến một phần của transaction.
- **@savepoint_variable** : chỉ ra tên của một biến điểm đã lưu. Biến có thể được khai báo là kiểu dữ liệu char , varchar , nchar , hoặc nvarchar.

Ví dụ:
1. Giả định rằng một cơ sở dữ liệu có tên Sterling đã được tạo ra. Bảng có tên là ValueTable được tạo ra trong cơ sở dữ liệu này:
```sql
USE Sterling;
GO
CREATE TABLE ValueTable ([value] char)
GO
```
2. Tạo ra một transaction chèn 2 bản ghi vào ValueTable. Sau đó thực hiện rollback và một lần nữa chèn một bản ghi vào ValueTable. Khi câu lệnh SELECT được sử dụng để truy vấn
bảng, bạn sẽ thấy rằng chỉ có một bản ghi duy nhất có giá trị C được hiển thị. Điều này là do các phép tính INSERT trước đó đã được quay lui hoặc hủy bỏ.
```sql
BEGIN TRANSACTION
INSERT INTO ValueTable VALUES('A');
INSERT INTO ValueTable VALUES('B');
GO
ROLLBACK TRANSACTION
INSERT INTO ValueTable VALUES('C');
SELECT [value] FROM ValueTable;
```

### 5. ROLLBACK WORK
Câu lệnh này rollback một transaction do người dùng quy định tới điểm bắt đầu transaction. Sau đây là cú pháp:
```sql
ROLLBACK [ WORK ] [ ; ]
```
Từ khóa WORK là tùy chọn và ít được sử dụng.

### 6. SAVE TRANSACTION
Câu lệnh SAVE TRANSACTION thiết lập một điểm đã lưu trong một transaction. Sau đây là cú pháp cho câu lệnh SAVE TRANSACTION.
```sql
SAVE { TRAN | TRANSACTION } { savepoint_name | @savepoint_variable }
[ ; ]
```
Ví dụ:
```sql
CREATE PROCEDURE SaveTranExample
    @InputCandidateID INT
AS	
    DECLARE @TranCounter INT;
    SET @TranCounter = @@TRANCOUNT;
    IF @TranCounter > 0
        SAVE TRANSACTION ProcedureSave;
    ELSE
        BEGIN TRANSACTION;
        DELETE HumanResources.JobCandidate
WHERE JobCandidateID = @InputCandidateID;
        IF @TranCounter = 0
        COMMIT TRANSACTION;
IF @TranCounter = 1
        ROLLBACK TRANSACTION ProcedureSave;
GO
```
Thực hiện lưu transaction có tên ProcedureSave trong thủ tục SaveTranExample, và điểm lưu trữ này sẽ được sử dụng để rollback lại nếu tồn tại một transaction được bắt đầu trước khi thủ tục được thực hiện. 

## @@TRANCOUNT
Function @@TRANCOUNT trả về một số câu lệnh BEGIN TRANSACTION xảy ra trong kết nối hiện tại. Cứ mỗi begin transaction sẽ làm tăng @@TRANCOUNT lên 1 đơn vị, hay nói cách khác nó trả về số lượng transaction hiện có.
Ví dụ minh họa cho hoạt động của @@TRANCOUNT
![](https://images.viblo.asia/eba6c992-ea72-4e93-8b6a-411d79db85c4.png)
Ví dụ: hiển thị số lần câu lệnh BEGIN TRAN và COMMIT thực hiện trong kết nối hiện tại.
```sql
PRINT @@TRANCOUNT
BEGIN TRAN
    PRINT @@TRANCOUNT
    BEGIN TRAN
        PRINT @@TRANCOUNT
    COMMIT
    PRINT @@TRANCOUNT
COMMIT
PRINT @@TRANCOUNT
```
Kết quả thu được:
![](https://images.viblo.asia/6fd1dd8a-f556-454e-aa21-78560d613a30.png)