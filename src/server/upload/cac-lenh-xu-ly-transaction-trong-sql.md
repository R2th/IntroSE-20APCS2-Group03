# Transaction trong SQL
**TRANSACTION trong SQL** là tiến trình thực hiện một nhóm các câu lệnh SQL. Các câu lệnh này được thực thi một cách tuần tự và độc lập. Một Transaction được thực hiện thành công khi tất cả câu lệnh đều thành công, khi đó tất cả các thay đổi dữ liệu được thực hiện trong Transaction được lưu vào cơ sở dữ liệu. Tuy nhiên, nếu chỉ một trong số đó thất bại thì toàn bộ tiến trình sẽ thất bại, đồng nghĩa với việc dữ liệu phải rollback về trạng thái ban đầu (dữ liệu được khôi phục về trạng thái trước khi thực hiện Transaction).

Điều này làm ta liên tưởng đến Git vậy. Khi ta thực hiện đến câu lệnh nào mà ta muốn lưu lại thay đổi ở đó ta sẽ tạo ra các điểm lưu trữ tại đó, nó giống với những commit trong Git cũng là lưu những bản sao mà lưu lại những thay đổi tại thời điểm đó mà ta muốn, mà không hề ảnh hưởng đến bản gốc. Nhưng ở Transaction thì lại khác là nếu bất kỳ một lệnh nào trong nhóm lệnh bị sai hay lỗi thì tất cả sẽ quay vể điểm lưu trữ  ban đầu trước khi mà ta thực hiện Transaction. Một điểm nữa giống nhau giữa 2 thằng này là nếu muốn quay trở lại điểm lưu trữ nào ta chỉ việc chạy câu lệnh quay lại. Để chứng minh cho điều này hãy cũng đi sau vào phân tích bên dưới.

# Xử lý trong Transaction
Trong SQL, có các lệnh sau được sử dụng để điều khiển Transaction: 
* COMMIT: để lưu các thay đổi.
* ROLLBACK: để quay trở lại trạng thái trước khi có thay đổi.
* SAVEPOINT: tạo các điểm (point) bên trong các nhóm Transaction để ROLLBACK, tức là để quay trở lại điểm trạng thái đó.
* SET TRANSACTION: đặt một tên cho một Transaction.
* Các lệnh điều khiển Transaction chỉ được sử dụng với các lệnh thao tác dữ liệu như INSERT, UPDATE và DELETE. Tuy nhiên chúng không thể được sử dụng trong lệnh CREATE TABLE hoặc DROP TABLE vì các hoạt động này được tự động xác định trong cơ sở dữ liệu.

# Lệnh COMMIT trong SQL
Transaction kết thúc với một trong hai câu lệnh COMMIT hoặc ROLLBACK.

Khi một Transaction hoàn chỉnh được hoàn thành thì lệnh **COMMIT** phải được gọi ra. Lệnh này sẽ giúp lưu những thay đổi tới cở sở dữ liệu

Cú pháp cơ bản của lệnh COMMIT như sau:
```
COMMIT;
```

Ví dụ: Giả sử bảng NHANVIEN có các bản ghi như sau:

```
 +----+----------+--------+-----------+----------+
 | ID | TEN      |NAMSINH | DIACHI    | LUONG    |
 +----+----------+--------+-----------+----------+
 |  1 | Thang    |  1996  | Haiphong  |  3000.00 |
 |  2 | Luan     |  1997  | Hanoi     |  1400.00 |
 |  3 | Nghia    |  1996  | Hanam     |  5000.00 |
 |  4 | Manh     |  1998  | Hue       |  7500.00 |
 |  5 | Duy      |  1990  | Hatinh    |  9500.00 |
 |  6 | Cao      |  1989  | HCM       |  1500.00 |
 |  7 | Long     |  1995  | Hanoi     |  1000.00 |
 +----+----------+-----+-----------+-------------+
```

Ví dụ sau sẽ xóa các bản ghi từ bảng mà có TEN = "Nghia" và sau đó COMMIT các thay đổi vào trong Database.

```
SQL> DELETE FROM NHANVIEN
 WHERE TEN = 'Nghia';
SQL> COMMIT;
```

Vì vậy, một hàng từ bảng sẽ bị xóa và câu lệnh SELECT sẽ cho kết quả sau.

```
 +----+----------+--------+-----------+----------+
 | ID | TEN      |NAMSINH | DIACHI    | LUONG    |
 +----+----------+--------+-----------+----------+
 |  1 | Thang    |  1996  | Haiphong  |  3000.00 |
 |  2 | Luan     |  1997  | Hanoi     |  1400.00 |
 |  4 | Manh     |  1998  | Hue       |  7500.00 |
 |  5 | Duy      |  1990  | Hatinh    |  9500.00 |
 |  6 | Cao      |  1989  | HCM       |  1500.00 |
 |  7 | Long     |  1995  | Hanoi     |  1000.00 |
 +----+----------+-----+-----------+-------------+
```

# Lệnh ROLLBACK trong SQL

Lệnh **ROLLBACK** là lệnh điều khiển Transaction được sử dụng để trao trả Transaction về trạng thái trước khi có các thay đổi mà chưa được lưu tới Database. Lệnh ROLLBACK chỉ có thể được sử dụng để undo các Transaction trước khi xác nhận bằng lệnh Commit hay Rollback cuối cùng.

Cú pháp cơ bản của lệnh ROLLBACK như sau:
```
ROLLBACK;
```

Ví dụ: Giả sử bảng NHANVIEN có các bản ghi như sau:
```
 +----+----------+--------+-----------+----------+
 | ID | TEN      |NAMSINH | DIACHI    | LUONG    |
 +----+----------+--------+-----------+----------+
 |  1 | Thang    |  1996  | Haiphong  |  3000.00 |
 |  2 | Luan     |  1997  | Hanoi     |  1400.00 |
 |  3 | Nghia    |  1996  | Hanam     |  5000.00 |
 |  4 | Manh     |  1998  | Hue       |  7500.00 |
 |  5 | Duy      |  1990  | Hatinh    |  9500.00 |
 |  6 | Cao      |  1989  | HCM       |  1500.00 |
 |  7 | Long     |  1995  | Hanoi     |  1000.00 |
 +----+----------+-----+-----------+-------------+
```

 Bây giờ sử dụng lệnh ROLLBACK với lệnh xóa TEN = "Nghia", mà chưa được commit như sau:

```
SQL> DELETE FROM NHANVIEN
 WHERE TEN = 'Nghia';
SQL> ROLLBACK;
```

Trong kết quả thu được, hoạt động DELETE này không ảnh hưởng tới bảng vì đã ROLLBACK các thay đổi trong cơ sở dữ liệu, lệnh SELECT sẽ cho kết quả:

```
 +----+----------+--------+-----------+----------+
 | ID | TEN      |NAMSINH | DIACHI    | LUONG    |
 +----+----------+--------+-----------+----------+
 |  1 | Thang    |  1996  | Haiphong  |  3000.00 |
 |  2 | Luan     |  1997  | Hanoi     |  1400.00 |
 |  3 | Nghia    |  1996  | Hanam     |  5000.00 |
 |  4 | Manh     |  1998  | Hue       |  7500.00 |
 |  5 | Duy      |  1990  | Hatinh    |  9500.00 |
 |  6 | Cao      |  1989  | HCM       |  1500.00 |
 |  7 | Long     |  1995  | Hanoi     |  1000.00 |
 +----+----------+-----+-----------+-------------+
```

# Lệnh SAVEPOINT trong SQL

SAVEPOINT là một điểm trong một Transaction giúp bạn có thể lùi Transaction trở lại một điểm nhất định mà không cần lùi Transaction về trạng thái đầu trước khi có thay đổi đó. Giống như đã nói ở trên phần giới thiệu cái này khá giống với commit của Git.

Cú pháp cơ bản của lệnh SAVEPOINT như sau:

```
SAVEPOINT TEN_SAVEPOINT;
```

Lệnh này chỉ tạo ra SAVEPOINT trong các câu lệnh Transaction. Sau đó ROLLBACK cần được sử dụng để hoàn tác trở lại một SAVEPOINT như sau:

```
ROLLBACK TO TEN_SAVEPOINT;
```

Ví dụ: Bạn muốn xóa ba bản ghi khác nhau từ bảng NHANVIEN và muốn tạo SAVEPOINT trước mỗi lần xoá để có thể ROLLBACK trở lại SAVEPOINT bất kỳ lúc nào giúp trả lại dữ liệu thích hợp cho trạng thái ban đầu.

Giả sử bảng NHANVIEN có các bản ghi như sau:

```
 +----+----------+-----+-----------+----------+
 | ID | TEN      |TUOI | DIACHI    | LUONG    |
 +----+----------+-----+-----------+----------+
 |  1 | Thanh    |  32 | Haiphong  |  2000.00 |
 |  2 | Loan     |  25 | Hanoi     |  1500.00 |
 |  3 | Nga      |  23 | Hanam     |  2000.00 |
 |  4 | Manh     |  25 | Hue       |  6500.00 |
 |  5 | Huy      |  27 | Hatinh    |  8500.00 |
 |  6 | Cao      |  22 | HCM       |  4500.00 |
 |  7 | Lam      |  24 | Hanoi     | 10000.00 |
 +----+----------+-----+-----------+----------+
```

Dưới đây là một chuỗi các câu lệnh:

```
SQL> SAVEPOINT SP1;
Savepoint created.
SQL> DELETE FROM NHANVIEN WHERE ID=1;
1 row deleted.
SQL> SAVEPOINT SP2;
Savepoint created.
SQL> DELETE FROM NHANVIEN WHERE ID=2;
1 row deleted.
SQL> SAVEPOINT SP3;
Savepoint created.
SQL> DELETE FROM NHANVIEN WHERE ID=3;
1 row deleted.
```

Ở trên, có 3 hoạt động xóa dữ liệu diễn ra. Giả sử bạn thay đổi suy nghĩ và quyết định ROLLBACK về SAVEPOINT mà bạn đã xác định là SP2. Bởi vì SP2 được tạo sau hoạt động xóa đầu tiên, do đó hai hoạt động xóa cuối cùng được khôi phục lại.

```
SQL> ROLLBACK TO SP2;
Rollback complete.
```

Vì vậy chỉ có hoạt động xóa đầu tiên diễn ra sau khi bạn ROLLBACK về SP2.

```
 +----+----------+-----+-----------+----------+
 | ID | TEN      |TUOI | DIACHI    | LUONG    |
 +----+----------+-----+-----------+----------+
 |  2 | Loan     |  25 | Hanoi     |  1500.00 |
 |  3 | Nga      |  23 | Hanam     |  2000.00 |
 |  4 | Manh     |  25 | Hue       |  6500.00 |
 |  5 | Huy      |  27 | Hatinh    |  8500.00 |
 |  6 | Cao      |  22 | HCM       |  4500.00 |
 |  7 | Lam      |  24 | Hanoi     | 10000.00 |
 +----+----------+-----+-----------+----------+
```

# Lệnh RELEASE SAVEPOINT trong SQL

Lệnh SAVEPOINT RELEASE được sử dụng để loại bỏ một SAVEPOINT mà bạn đã tạo ra. Khi SAVEPOINT bị xóa, bạn không thể sử dụng lệnh ROLLBACK để hoàn tác các Transaction về SAVEPOINT đó nữa. Kiểu như trong Git mà xóa một commit nào đó mình không muốn dùng nữa vậy.

Cú pháp của SAVEPOINT RELEASE như sau:

```
RELEASE SAVEPOINT TEN_SAVEPOINT;
```

# Lệnh SET TRANSACTION trong SQL

SET TRANSACTION có thể được sử dụng để khởi tạo một Database Transaction. Lệnh này được sử dụng để chỉ định các đặc tính cho Transaction đó. Ví dụ, bạn có thể chỉ định một Transaction chỉ được đọc (read only) hoặc đọc viết (read write).

Cú pháp cơ bản của lệnh SET TRANSACTION trong SQL như sau:

```
SET TRANSACTION [ READ WRITE | READ ONLY ];
```

# Tổng kết 
* Lệnh **Commit** để lưu những thay đổi sau khi Transaction đã hoàn thành
* Lệnh **Rollback** là để quay lại những điểm SAVEPOINT hoặc là quay lại trạng thái trước khi TranSaction được thực hiện nếu có bất kỳ một lệnh bị lỗi.
* **SAVEPOINT** là tạo ra các điểm lưu trữ tại thời điểm nào đó.
* **RELEASE SAVEPOINT** là xóa **SAVEPOINT** mà ta không muốn giữ
* **SET TRANSACTION** là quy định các đặc tính cho Transaction đó được đọc (read only) hoặc đọc viết (read write)


-----



**Nguồn**: https://www.tutorialspoint.com/sql/sql-transactions.htm