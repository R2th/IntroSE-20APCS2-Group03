## I. Giới thiệu:
- Là một package được Oracle tích hợp sẵn.
- UTL_FILE là package dùng để đọc ghi file hệ thống.
- Có thể truy cập file trong hệ thống được định nghĩa bằng phát biểu CREAT DIRECTORY.
![](https://images.viblo.asia/f5e3bd67-e4db-42e9-a967-ca344794a5e1.png)
- Đường dẫn file nên là đường dẫn file của Oracle.
- Xóa đường dẫn bằng phát biểu DROP DIRECTORY <directory_name>.
- Ví dụ:
```
    Create directory my_dir AS ‘temp/myfiles’
	Grant Read, Write on Directory my_dir to public.
```
## II. Một số hàm và thủ tục trong UTL_FILE package:
### 1. IS_OPEN
- Xác định nếu một file đã được mở.
- Dùng IS_OPEN để kiểm tra trạng thái file trước khi mở file.
- Sử dụng:
```
UTL_FILE.IS_OPEN (
   file  IN FILE_TYPE)
  RETURN BOOLEAN;
```
### 2. FOPEN
- Mở một file để đọc hoặc ghi dữ liệu.
```
UTL_FILE.FOPEN (
   location     IN VARCHAR2,
   filename     IN VARCHAR2,
   open_mode    IN VARCHAR2,
   max_linesize IN BINARY_INTEGER) –số kí tự tối đa trên mỗi dòng
  RETURN file_type;

Open_mode: r -- read text(get_line)
         w -- write text(put, put_line, new_line...)
         a -- append text(put, put_line, new_line...)
         rb -- read byte mode
         wb -- write byte mode
         ab -- append byte mode
```

### 3. FOPEN_NCHAR
- Mở một file unicode để đọc hoặc ghi dữ liệu
```
UTL_FILE.FOPEN_NCHAR (
   location     IN VARCHAR2,
   filename     IN VARCHAR2,
   open_mode    IN VARCHAR2,-- (r,w,a,rb,wb,ab).
   max_linesize IN BINARY_INTEGER) 
RETURN file_type;
```
### 4. FCLOSE
- Đóng 1 file 
```
UTL_FILE.FCLOSE (
   file IN OUT FILE_TYPE);
```
### 5. FCLOSE_ALL
- Đóng tất cả các file đang xử lí.
```
UTL_FILE.FCLOSE_ALL;
```
### 6. FCOPY
- Sao chép một phần của file đến một file mới.
```
UTL_FILE.FCOPY (
   location   IN VARCHAR2,--directory file muốn copy
   filename   IN VARCHAR2,--tên file muốn copy
   dest_dir   IN VARCHAR2,-- directory file đích
   dest_file  IN VARCHAR2,--tên file đích
   start_line IN PLS_INTEGER DEFAULT 1,
   end_line   IN PLS_INTEGER DEFAULT NULL);
```
### 7. FGETATTR
- Đọc và trả về những thuộc tính của file
```
UTL_FILE.FGETATTR(
   location    IN VARCHAR2, 
   filename    IN VARCHAR2, 
   exists      OUT BOOLEAN, --trả về true nếu file tồn tại
   file_length OUT NUMBER, --NULL nếu file không tt
   blocksize   OUT NUMBER); --NULL nếu file không tt
```
### 8. FGETPOS
- Lấy vị trí hiện tại trong file
```
UTL_FILE.FGETPOS (
   fileid IN file_type)-- directory
 RETURN PLS_INTEGER;
```
### 9. FREMOVE
- Xóa file(nếu có đủ quyền)
```
UTL_FILE.FREMOVE (
   location IN VARCHAR2,
   filename IN VARCHAR2);
```
### 10. FRENAME
- Đổi tên file đã tồn tại thành một tên mới
```
UTL_FILE.FRENAME (
   location  IN VARCHAR2,
   filename  IN VARCHAR2, 
   dest_dir  IN VARCHAR2,
   dest_file IN VARCHAR2,
   overwrite IN BOOLEAN DEFAULT FALSE);--ghi đè nếu file đã tồn tại. Mặc định: false
```
### 11. FSEEK
- Di chuyển(điều chỉnh) vị trí con trỏ chuột trong file
```
UTL_FILE.FSEEK (
   fid             IN utl_file.file_type,
   absolute_offset IN PL_INTEGER DEFAULT NULL,--vị trí muốn chuyển đến
   relative_offset IN PLS_INTEGER DEFAULT NULL);

+) relative_offset: số âm:dịch chuyển lùi
                    Số dương: dịch chuyển về phía trước
                    0: giữ nguyên vị trí hiện tại

```
### 12. PUT
- Ghi một chuỗi vào file đang mở
```
UTL_FILE.PUT (
   file      IN FILE_TYPE,
   buffer    IN VARCHAR2);
+)file: directory file, file phải đang mở
+)buffer: nội chung chuỗi muốn ghi
```
### 13. PUT_NCHAR
- Ghi một chuỗi Unicode vào file đang mở
```
UTL_FILE.PUT (
   file      IN FILE_TYPE,
   buffer    IN VARCHAR2);
```
### 14. PUT_LINE
- Ghi một dòng vào file và phụ thuộc vào số kí tự trong một dòng của hệ điều hành.
```
UTL_FILE.PUT_LINE (
   file      IN FILE_TYPE,
   buffer    IN VARCHAR2,
   autoflush IN BOOLEAN DEFAULT FALSE);
```
### 15. GET_LINE
- Đọc văn bản từ file
```
UTL_FILE.GET_LINE (
   file        IN  FILE_TYPE,
   buffer      OUT VARCHAR2,
   len         IN  PLS_INTEGER DEFAULT NULL);
+)file phải được mở với mode: ‘r’
+)buffer: chuỗi tạm để nhận dữ liệu từ file
+)len: số bytes đọc từ file
```
### 16. NEW_LINE
- Thêm một hoặc nhiều kí tự kết thúc dòng vào file
```
UTL_FILE.NEW_LINE (
   file     IN FILE_TYPE,
   lines    IN NATURAL := 1);
```
### 17. FFLUSH
- Viết tất cả dữ liệu trong bộ nhớ tạm vào file
```
UTL_FILE.FFLUSH (
   file  IN FILE_TYPE);
```
## III. Tiến trình sử dụng UTL_FILE:
![](https://images.viblo.asia/dfaac884-3beb-46a8-8476-c8a4449237c5.png)

a. Một số exception được định nghĩa sẵn trong UTL_FILE package, oracle 


|  Tên  | Mô tả |
| -------- | -------- |
| INVALID_PATH     | Vị trí file không tồn tại     | 
| INVALID_MODE     | Tham số trong hàm FOPEN không đúng     | 
| INVALID_FILEHANDLE | File đang xử lí không tồn tại |
| INVALID_OPERATION  | Không thể mở file hoặc hệ thống không phản hồi    | 
| READ_ERROR | Hệ thống xảy ra lỗi khi đọc file |
| WRITE_ERROR     |  Hệ thống xảy ra lỗi khi ghi file  | 
## IV. Demo:
### a. Tạo đường dẫn cho file cần đọc ghi:
![](https://images.viblo.asia/4ee18131-b227-4da7-b093-f45f9a833386.png)
- Kiểm tra xem đường dẫn có tên My_dir có được tạo bằng câu lệnh:
```
Select directory_name, directory_path
From all_directories
WHERE directory_name= 'MY_DIR';
```
=> KQ: ![](https://images.viblo.asia/76d9264c-e5eb-4df4-aefa-a92328ec0e81.png)
### b.  Khai báo package có tên RW_FILE dùng để đọc ghi file hệ thống:
```
CREATE OR REPLACE PACKAGE RW_FILE 
AS
  sp_readFile(myDir varchar2, fileName varchar2);
  sp_WriteFile(myDir varchar2, fileName varchar2, buffer varchar2);
END RW_FILE;
```
Package RW_FILE gồm 2 stored procedure sử dụng package UTL_FILE để đọc, ghi file hệ thống :

- sp_readFile: dùng để đọc file hệ thống.
- sp_WriteFile: dùng để ghi một chuỗi input vào file hệ thống.

###  c. Tạo thân của package RW_FILE:
```
CREATE OR REPLACE PACKAGE BODY RW_FILE 
AS
  PROCEDURE sp_readFile(myDir varchar2, fileName varchar2)
    AS
      f_file UTL_FILE.FILE_TYPE;
      buffer varchar2(200);
      lines PLS_INTEGER := 0;
    BEGIN
      IF NOT UTL_FILE.IS_OPEN(f_file) then
        f_file := UTL_FILE.FOPEN(myDir, fileName, 'R');
        BEGIN
          LOOP 
            UTL_FILE.GET_LINE(f_file, buffer);
            DBMS_OUTPUT.PUT_LINE(buffer);
          END LOOP;
          EXCEPTION 
            WHEN NO_DATA_FOUND THEN 
              DBMS_OUTPUT.PUT_LINE('END OF FILE');
            WHEN UTL_FILE.INVALID_FILEHANDLE THEN
              RAISE_APPLICATION_ERROR(-20001,'Invalid File.');
            WHEN UTL_FILE.READ_ERROR THEN
              RAISE_APPLICATION_ERROR (-20002, 'Unable to read to file');
        END;
        UTL_FILE.FCLOSE(f_file);
      END IF;
    END sp_readFile;
  PROCEDURE sp_WriteFile(myDir varchar2, fileName varchar2, buffer varchar2)
    AS
      f_file UTL_FILE.FILE_TYPE;
    BEGIN
       IF NOT UTL_FILE.IS_OPEN(f_file) then
        f_file := UTL_FILE.FOPEN(myDir, fileName, 'A');
        BEGIN 
            UTL_FILE.PUT(f_file, buffer);
            UTL_FILE.PUT(f_file, ',');
            DBMS_OUTPUT.PUT_LINE(buffer);
          EXCEPTION 
            WHEN NO_DATA_FOUND THEN 
              DBMS_OUTPUT.PUT_LINE('END OF FILE');
            WHEN UTL_FILE.INVALID_FILEHANDLE THEN
              RAISE_APPLICATION_ERROR(-20001,'Invalid File.');
            WHEN UTL_FILE.WRITE_ERROR THEN
              RAISE_APPLICATION_ERROR (-20002, 'Unable to write to file');
        END;
        UTL_FILE.FCLOSE(f_file);
      END IF;
    END sp_WriteFile;
END RW_FILE;
```
![](https://images.viblo.asia/3234fa70-6a21-42a3-8145-8a5fb0d2c148.png)
## V. Tài liệu tham khảo:
- (3): docs.oracle.com:  U TL_FILE