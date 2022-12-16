Chào các bạn, hôm nay mình xin chia sẻ về cách import và export database của hệ quản trị cơ sở dữ liệu Oracle.
## 1. Tổng quan về import và export oracle database
- Để thực hiện việc import cũng như export bạn đều phải chạy command từ thư mục `C:\{oracle_dir}\product\11.2.0\dbhome_1\BIN`
- Các thao tác với user hoặc truy vấn đều thực hiện trên SQL Plus, 1 application để bạn có thể truy vấn cơ sở dữ liệu Oracle.
- 
![SQL Plus](https://images.viblo.asia/fb929f48-8f74-4c5a-9641-fba8e7c5aafb.png)
## 2. Export database
Mở CMD và CD vào thư mục bin của Oracle.
```
cd C:\{oracle_dir}\product\11.2.0\dbhome_1\BIN
```
** Lưu ý: {oracle_dir} chính là đường dẫn mà bạn đã chọn khi cài đặt.

Chạy lệnh sau để export:
```
EXP test/admin@orcl FILE=dba.dmp FULL=y 
```

 `orcl` chính là SERVICE NAME hoặc SID của Oracle, bình thường mặc định khi cài đặt sẽ là `orcl`.
- Export 1 schema: 
```
EXP test/admin owner=test file=D:/file_dir/exp_test.dmp
```
Bên cạnh lệnh `exp` còn có lệnh `expdp`,  tuy nhiên thì để chạy lệnh `expdp` bạn cần phải chỉ ra `DIRECTORY` là gì và `DUMPFILE` cần chạy là gì:

Mở SQL Plus và login bằng user default lúc cài đặt: 
![Login SQL Plus](https://images.viblo.asia/d9f80401-c8e6-4d89-914f-a379b1f3b177.png)

```
-- Tạo directory để export file ra
CREATE DIRECTORY BACKUP_DIR AS 'D:/backup';
-- Gán quyền cho thư mục đó để đọc và ghi:
GRANT read,write on DIRECTORY BACKUP_DIR to test;
-- Chạy lệnh export trên thư mục bin của oracle:
EXPDP test/admin DIRECTORY=BACKUP_DIR DUMPFILE=file_export.dmp REMAP_SCHEMA=test:test LOGFILE=export.log
```
Như vậy các bạn đã có thể export database chỉ với vài lệnh đơn giản :))

Tiếp theo mình sẽ hướng dẫn import database.
## 3. Import database
### 3.1 Import file dump từ lệnh exp
* Tạo 1 user mới
```
-- User: test
-- Password: admin
create user test identified by admin;
```
* Gán quyền cho user đó:
```
grant connect, create session, imp_full_database to test;
```
Về bản chất thì việc tạo user mới chính là tạo 1 SCHEMA rỗng, trong ví dụ trên bạn vừa tạo ra SCHEMA có tên là `test`.
Và sau đó mở CMD và CD vào thư mục bin của Oracle:
```
cd C:\{oracle_dir}\product\11.2.0\dbhome_1\BIN
``` 
Chạy lệnh import:
```
IMP test/admin@orcl FILE=D:/backup/file_export.dmp log=<filename>.log FULL=y
```
Bạn cũng có thể import vào theo SCHEMA bằng cách thêm `FROMUSER` và `TOUSER`  và bỏ option `FULL`:
```
IMP test/admin@orcl FROMUSER=TEST TOUSER=TEST FILE=D:/backup/file_export.dmp log=<filename>.log
```

### 3.2 Import file dump từ lệnh expdp

* Chạy lệnh import:
```
IMPDP test/admin DIRECTORY=BACKUP_DIR DUMPFILE=file_export.dmp LOGFILE=import.log FULL=y;
```

## 4. Tổng kết
Như vậy mình đã hướng dẫn cơ bản các bước để import và export oracle database, bài viết dựa trên kinh nghiệm cá nhân và các tài liệu tham khảo, nếu có sai sót chỗ nào thì các bạn comment để hỏi đáp nhé :)
Thanks you for reading!
### Tài liệu tham khảo
1. https://o7planning.org/vi/10295/import-va-export-co-so-du-lieu-oracle#a105731
2. https://stackoverflow.com/questions/6463614/how-to-import-an-oracle-database-from-dmp-file-and-log-file