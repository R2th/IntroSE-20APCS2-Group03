- Trong bất kỳ database nào, sự yếu kém trong việc quản lý các thao tác với dữ liệu thường dẫn tới các vấn đề về xung đột và hiệu năng trong hệ thống có nhiều users. Khi số lượng users thao tác với dữ liệu ngày một tăng, việc quản lý thao tác dữ liệu hiệu sao cho quả là vô cùng quan trọng.
- Trong bài viết này, mình sẽ giới thiệu tới các bạn những phương pháp mà SQL sử dụng để đảm bảo tính toàn vẹn dữ liệu cho mỗi transaction và cách ứng dụng quản lý các transaction hiệu quả
# Transaction Basic
- 1 transaction là 1 tập các câu lệnh thực thi tới CSDL, các câu lệnh được thực thi 1 cách tuần tự,  nếu có bất kỳ lệnh nào bị lỗi, transaction sẽ dừng lại và roll back DB tất cả các câu lệnh đã thực thi, trả lại DB như lúc start transaction.
- Transaction có 4 tính chất (ACID):
    - **Atomicity** (Tính nguyên tử): 1 transaction phải như 1 đơn vị công việc, hoặc tất cả các thay đổi dữ liệu được thực thi, hoặc không thay đổi nào được thực hiện.
    - **Consistency** (Tính nhất quán): Khi đã hoàn thành, 1 transaction phải để tất cả dữ liệu ở trạng thái nhất quán. Trong CSDL quan hệ, rất cả các rules phải được áp dụng cho các thay đổi của transaction tạo ra để giữ cho tất cả dữ liệu toàn vẹn. Tất cả cấu trúc dữ liệu, như indexs phải đúng khi kết thúc transaction.
    - **Isolation** (Tính độc lập): Các sự thay đổi của các transactions khác nhau phải độc lập với nhau. 1 transaction chỉ được lấy dữ liệu ở trạng thái trước hoặc sau khi dữ liệu này bị 1 transaction khác thay đổi chứ không phải ở 1 trạng thái trung gian.
    - **Durability** (Tính bền vững): Sau khi 1 transaction thực hiện thành công, các thay đổi của nó sẽ trở thành chính thức và bền vững, khộng bị roll back.
   
  ![](https://images.viblo.asia/b6489696-c4a7-4cff-a76b-05b9fd15fe33.png)

 # Locking và Row Versioning
 - Locking và Row Versioning là các cơ chế được SQL sử dụng để đảm bảo tính toàn vẹn của các transaction và duy trì tính nhất quán của CSDL khi nhiều người cùng lúc thao tác trên dữ liệu.
     - **Locking**: Mỗi transaction yêu cầu các loại khóa khác nhau trên resource như: row lock, page lock hay table lock, ... tùy theo transaction phụ thuộc vào gì. Lock ngăn các transaction khác không cho chúng thay đổi dữ liệu. Các transaction sẽ giải phóng Lock khi nó không còn phụ thuộc vào các tài nguyên bị Lock nữa. Khi này các transaction khác mới có thể truy cập những tài nguyên này,
     - **Row versioning**: Khi 1 tài nguyên bị Lock, các transaction khác sẽ không thể thao tác được với tài nguyên này mà phải đợi đến khi transaction đang giữ tài nguyên giải phóng Lock mới có thể truy cập. Điều này sẽ dẫn đến việc các transaction phải đợi nhau quá lâu dẫn tới giảm đáng kể hiệu năng của hệ thống. Row versioning lưu trữ các versions của tài nguyên đang bị lock, các transaction khác nếu chỉ yêu cầu đọc các tài nguyên này sẽ được trả về version phù hợp mà không cần phải đợi đến khi tài nguyên được giải phóng Lock. Điều này sẽ giúp giảm đáng kể khả năng nhiều transaction phải đợi nhau để sử dụng tài nguyên, 
 ## Các loại Lock
 - Có 3 loại Lock chính đó là: Share lock, exclusive lock và update lock
     - **Share Lock**:  hay còn gọi là read-only lock (khóa chỉ đọc) là lock mà một transaction chiếm hữu khi muốn đọc 1 dữ liệu. Giao dịch giữ Share lock được phép đọc dữ liệu, nhưng không được phép ghi. Nhiều transaction có thể đồng thời giữ Share lock trên cùng 1 đơn vị dữ liệu
     - **Exclusive Lock**:  hay còn gọi là write lock là lock mà một transaction chiếm hữu khi muốn đọc + ghi  dữ liệu. Tại 1 thời điểm chỉ có tối đa 1 transaction được quyền giữ Exclusive lock trên 1 đơn dữ liệu.Không thể thiết lập Share lock trên đơn vị dữ liệu đang có Exclusive lock.
     - **Update lock**: Khóa dự định ghi. Update lock sử dụng khi đọc dữ liệu với dự định ghi trở lại trên dữ liệu này. Update lock là chế độ khoá trung gian giữa Share lock và Exclusive lock. Khi thực hiện thao tác ghi lên dữ liệu thì bắt buộc Update lock phải tự động chuyển thành Exclusive lock. Transaction giữ Update lock được phép GHI + ĐỌC dữ liệu. Tại 1 thời điểm chỉ có tối đa 1 transaction được quyền giữ Update lock trên 1 đơn dữ liệu. Có thể thiết lập Share lock trên đơn vị dữ liệu đang có Update lock
# Quản lý truy cập dữ liệu đồng thời
## Các tác động có thể gây ra khi truy cập đồng thời
-  Người dùng thao tác dữ liệu có thể gây ảnh hưởng tới những người khác đang thao tác đồng thời trên dữ liệu này. Nếu hệ thống không kiểm soát tốt, người dùng có thể gặp 1 số tác động sau:
    -  **Lost update**:  Trường hợp này xảy ra khi 2 hoặc nhiều transaction cùng update 1 row từ giá trị ban đầu của nó, Update cuối cùng sẽ ghi đè các update bởi các transaction khác dẫn đến mất dữ liệu.
    -  **Uncommitted dependency (dirty read)**: Tác động này xảy ra khi 1 transaction A đọc 1 row khi nó đang được update bởi 1 transaction B khác và chưa được commit. Transaction A sẽ đọc dữ liệu vẫn chưa được commit. Ví dụ 1 người A trong tài khoản có 3 triệu và đang thực hiện 1 giao dịch để nạp vào 2 triệu cho tài khoản. Transaction đã chạy update xong tài khoản lên 5 triệu nhưng vẫn còn 1 số thao tác chưa chạy tới và dữ liệu này vẫn chưa được commit. 1 người B khác dùng chung tài khoản thực hiện kiểm tra số dư, và kết quả trả về là 5 triệu. Giao dịch của người A xảy ra sự cố và báo lỗi, dữ liệu được roll back về 3 triệu. Như vậy người B đang nhận được dữ liệu sai. 
    - **Inconsistent analysis (nonrepeatable read)**: Trường hợp này xảy ra khi 1 transaction A đọc 1 đơn vị dữ liệu nhiều lần và kết quả khác nhau giữa các lần do giữa thời gian đọc của các lân đó, dữ liệu bị 1 transaction khác commit thay đổi. 
    - **Phantom reads**: xảy ra khi 2 queries giống hệt nhau được thực hiện nhưng list rows kết quả trả về lại khác nhau. Ví dụ, có 2 transaction được thực thi cùng lúc. Hai câu lệnh SELECT trong transaction đầu tiên có thể trả về các kết quả khác nhau vì câu lệnh INSERT trong transaction thứ hai thay đổi dữ liệu được sử dụng bởi cả hai.
    ```
    --Transaction 1  
    BEGIN TRAN;  
    SELECT ID FROM dbo.employee  
    WHERE ID > 5 and ID < 10;  
    --The INSERT statement from the second transaction occurs here.  
    SELECT ID FROM dbo.employee  
    WHERE ID > 5 and ID < 10;  
    COMMIT;  
    ```
     ```
    --Transaction 2  
    BEGIN TRAN;  
    INSERT INTO dbo.employee  
      (Id, Name) VALUES(6 ,'New');  
    COMMIT;
    ```
  
  ## Các kiểu quản lý truy cập đồng thời
- Có 2 loại thiết lập quản lý truy cập đồng thời
    - **Pessimistic** concurrency control: Với thiết lập này, khi 1 transaction thực hiện lock 1 tài nguyên để thao tác, các transaction khác sẽ không thể truy cập được tài nguyên này mà phải chờ tới khi khóa được giải phóng. Nó được gọi là *pessimistic control* bởi nó được sử dụng chủ yếu cho các trường hợp môi trường có sự tranh chấp dữ liệu cao, trong đó việc bảo vệ dữ liệu bằng Lock hiệu quả hơn việc roll back dữ liệu nếu xảy ra xung đột đồng thời
    - **Optimistic concurrency control**: Ở thiết lập này, transaction không được lock dữ liệu khi đọc. Khi 1 transaction update dữ liệu, hệ thống sẽ kiểm tra xem có transaction nào khác thay đổi dữ liệu này cùng lúc hay không, nếu có sẽ raise error và roll back dữ liệu. Thiết lập này sử dụng chủ yếu trong môi trường có sự tranh chấp dữ liệu thấp. 
# Isolation Levels
- Isolation levels là các mức cô lập dữ liệu. Mỗi transaction được chỉ định  1 isolation level để chỉ định mức độ mà nó phải được cách ly khỏi các sự sửa đổi dữ liệu được thực hiện bởi các transaction khác.  
- Các Isolation levels kiểm soát :
    - Lock có được sử dụng khi dữ liệu được đọc hay không và loại Lock được sử dụng.
    - Read lock tồn tại bao lâu?
    - Liệu 1 thao tác đọc tham chiếu đến các hàng có thể được sửa bởi 1 transaction khác hay không?
 - Mức độ cô lập dữ liệu thấp giúp tăng khả năng xử lý đồng thời từ đó hiệu suất cũng tăng theo nhưng nó sẽ làm tăng nguy cơ xảy ra các tác động xấu đã nêu ở phần trước.
 - Tùy từng hoàn cảnh, môi trường và yêu cầu của ứng dụng, ta chọn lựa các mức cô lập dữ liệu phù hợp nhất.
 - SQL cung cấp các mức isolation levels sau xếp theo thứ tự tăng dần của mức độ cô lập của dữ liệu: Read Uncommitted, Read Commited, Repeatable Read,  Serializable, Snapshot
- Để test từng mức cô lập, mình tạo 1 DB với bảng book có cấu trúc như sau:
- 
![](https://images.viblo.asia/746a6142-1702-44a3-b1ea-f503cca3c169.png)

## Read uncommitted
- Đây là mức cô lập thấp nhất. Khi transaction thực hiện ở mức này, các truy vấn vẫn có thể truy nhập vào các bản ghi đang được cập nhật bởi một transaction khác và nhận được dữ liệu tại thời điểm đó mặc dù dữ liệu đó chưa được commit (uncommited data). Điều này sẽ dẫn đến có thể xảy ra *Dirty read*
- Trong bảng book mình có 1 bản ghi với id = 2 như sau:

![](https://images.viblo.asia/cb4dc502-14b0-4732-bef4-6f28270ad204.png)

- Mình mở 2 tab thao tác với DB đại diện cho 2 người cùng truy cập DB đồng thời. 
- Ở tab 1 chạy đoạn lệnh sau:
```
START TRANSACTION;
UPDATE book SET name = 'Toriko changed' WHERE id=2;
DO SLEEP(10);
ROLLBACK;
```
- Sang Tab 2 thực hiện :
```
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SELECT * FROM book WHERE id=2;
```
- Bạn sẽ thấy kết quả Tab 2 trả về có name là `Toriko changed` bởi vì nó được đọc khi transaction ở tab 1 đã update bản ghi này. Tuy nhiên sau đó thì transaction ở tab 1 bị rollback và giá trị name của trường này quay về giá trị ban đầu. Vậy  dữ liệu ở tab 2 nhận được là sai vì dữ liệu này chưa được commit. Trường hợp này chính là  *Dirty read*
##  Read commited
- Đây là mức isolation mặc định của SQL Server Database Engine, nếu bạn không đặt gì cả thì transaction sẽ hoạt động ở mức này. Transaction sẽ không đọc được dữ liệu đang được cập nhật mà phải đợi đến khi việc cập nhật thực hiện xong. Vì thế nó tránh được *dirty read*, tuy nhiên việc read commited chỉ áp dụng cho lệnh update mà không áp dụng cho lệnh insert hoặc delete, vì thế có thể xảy ra *phantom read*
- Để dễ hiểu, bạn cũng mở 2 tab như trên, tab thứ nhất chạy đoạn lệnh sau :
```
START TRANSACTION;
UPDATE book SET name = 'Changed';
DO SLEEP(10);
COMMIT;
SELECT * FROM book;
```
- Nhanh tay chuyển sang tab 2 và chạy
```
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
INSERT INTO book VALUES(100, "Tamao", "Hiep", 1);
```
- Kết quả thu được ở tab 1

![](https://images.viblo.asia/4784cda9-d568-4d01-87f2-e3a3b95cc2f1.png)

- Đáng lẽ tất cả bản ghi đều phải được cập nhật, tuy nhiên ở đây xuất hiện bản ghi mới do thực hiện insert ở tab 2 trong khi transaction ở tab 1 chưa kết thúc. Hiện tượng này chính là *phantom read*
## Repeatable read
- Nếu bạn sử dụng innoDB engine, thì đây mức isolation mặc định.
- Mức isolation này hoạt động như mức *read commited* nhưng nâng thêm một nấc nữa bằng cách ngăn không cho transaction ghi vào dữ liệu đang được đọc bởi một transaction khác cho đến khi transaction khác đó hoàn tất
- Trở lại với 2 tab
- Tab 1 chạy 
```
START TRANSACTION;
SELECT * FROM book;
DO SLEEP(20);
SELECT * FROM book;
COMMIT;
```
-Tab 2 chạy
```
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
UPDATE book SET name="Test change" WHERE id=2;
SELECT * FROM book;
```
- Khi thực hiện code ở hai cửa sổ liên tiếp nhau, hai lệnh select ở cửa sổ 1 cho cùng kết quả và cửa sổ 2 phải đợi đến khi cửa sổ 1 hoàn tất mới được thực hiện
- Mức isolation này đảm bảo các lệnh đọc trong cùng một transaction cho cùng kết quả, nói cách khác dữ liệu đang được đọc sẽ được bảo vệ khỏi cập nhật bởi các transaction khác. Tuy nhiên nó cũng không bảo vệ được dữ liệu khỏi insert hoặc delete. Nếu bạn thay câu lệnh Update ở tab 2 thành Insert, 2 câu lệnh Select ở tab 1 sẽ cho kết quả khác nhau
## Serializable
- Đây là mức cô lập cao nhất, các transactions hoàn toàn tách biệt với nhau, SQL đặt read + write lock trên dữ liệu cho tới khi transaction kết thúc. Vì thế hiện tượng *phantom read* sẽ không còn ở mức này.
- Chạy đoạn lệnh sau trên tab 1:
```
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT * FROM book
DO SLEEP(20);
SELECT * FROM book;
COMMIT
```
- Tab 2 chạy 
```
INSERT INTO book VALUES(200, "Kichi", "Hiep", 1);
```
- Kết quả sẽ giống nhau ở cả 2 câu lệnh Select trong tab 1 vì tab 2 phải đợi tới khi tab 1 chạy xong mới thực thi được.
## Snapshot
- Mức độ này chỉ có thể sử dụng khi row versioning được bật. 
- Mức độ này cũng đảm bảo độ cô lập tương đương với Serializable, nhưng nó hơi khác ở phương thức hoạt động. Khi transaction đang select các bản ghi, nó không khóa các bản ghi này lại mà tạo một bản sao (snapshot) và select trên đó. Vì vậy các transaction khác insert/update lên các bản ghi đó không gây ảnh hưởng đến transaction ban đầu. Tác dụng của nó là giảm blocking giữa các transaction mà vẫn đảm bảo tính toàn vẹn dữ liệu. Tuy nhiên cái giá kèm theo là cần thêm bộ nhớ để lưu bản sao của các bản ghi, và phần bộ nhớ này là cần cho mỗi transaction do đó có thể tăng lên rất lớn
## Phạm vi các tác động do truy cập đồng thời đối với mỗi isolation level

| Isolation level | Dirty read | Nonrepeatable read | Phantom |
| -------- | -------- | -------- |  -------- | 
| Read uncommitted     | yes     | yes     | yes |
| Read committed     | no     | yes     | yes |
| Repeatable read     | no     | no     | yes |
| Serializable     | no     | no     | no |
| Snapshot     | no     | no     | no |

# Tài liệu tham khảo
- https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver15#Lock_Engine
- http://www.sqlviet.com/blog/cac-mc-isolation-level#more-3919