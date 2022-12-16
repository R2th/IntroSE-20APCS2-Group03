## 1. Các câu lệnh trong MS SQL Server.

### a. Creat Table:
- Dùng để tạo bảng trong CSDL
- Cú pháp:
    
    `CREATE TABLE ten_bang(cot1 kieu_du_lieu,cot2 kieu_du_lieu,cot3 kieu_du_lieu,.....cotN kieu_du_lieu,PRIMARY KEY( mot hoac nhieu cot ));`

### b. Alter Table:
- Sửa đổi cấu trúc 1 bảng chú ý có thể gây xung đột giữa thông tin đang có trong bảng và thuộc tính mới sửa lại.
- Cú pháp: 

    `ALTER TABLE ten_bang {ADD|DROP|MODIFY} ten_cot {kieu_du_lieu};`

### c. Select:
- Dùng để chọn dữ liệu từ cơ sở dữ liệu.
- Cú pháp:
    - Cơ bản:
    
          `SELECT cot1, cot2....cotN
            FROM   ten_bang;`
        
    - Loại bỏ giá trị trùng lặp:
    
          `SELECT DISTINCT cot1, cot2....cotN
                FROM   ten_bang;`
        
    - Kết hợp mệnh đề điều kiện WHERE:
    
          `SELECT cot1, cot2....cotN
            FROM   ten_bang
            WHERE  DIEU_KIEN;`
    
    - Kết hợp mệnh đề IN:
    
           `SELECT cot1, cot2....cotN
            FROM   ten_bang
            WHERE  ten_cot IN (gtri-1, gtri-2,...gtri-N);`
    
    - Kết hợp mệnh đề BETWEEN:
    
            `SELECT cot1, cot2....cotN
    FROM   ten_bang
    WHERE  ten_cot BETWEEN gtri-1 AND gtri-2;`
    
    - Kết hợp mệnh đề LIKE:
    
            `SELECT cot1, cot2....cotN
            FROM   ten_bang
            WHERE  ten_cot LIKE { PATTERN };`
    
    - Kết hợp mệnh đề ORDER BY:
    
           `SELECT cot1, cot2....cotN
             FROM   ten_bang
             WHERE  DIEU_KIEN
             ORDER BY ten_cot {ASC|DESC};`
    
    - Kết hợp mệnh đề GROUP BY:
    
            `SELECT SUM(ten_cot)
            FROM   ten_bang
            WHERE  DIEU_KIEN
            GROUP BY ten_cot;`
    
    - Kết hợp mệnh đề COUNT:
    
            `SELECT COUNT(ten_cot)
            FROM   ten_bang
            WHERE  DIEU_KIEN;`
    
    - Kết hợp mệnh đề Having:
    
           `SELECT SUM(ten_cot)
            FROM   ten_bang
            WHERE  DIEU_KIEN
            GROUP BY ten_cot
            HAVING (dieu kien la ham so hoc);`
    
### d. Insert:

- Chèn thêm 1 bản ghi vào trong bảng
- Cú pháp: 

      `INSERT INTO ten_bang( cot1, cot2....cotN)
       VALUES ( giatri1, giatri2....giatriN);`
    
### e. Update:

- Sửa thông tin 1 bản ghi đã có trong bảng
- Cú pháp:  

      `UPDATE ten_bang
       SET cot1 = giatri1, cot2 = giatri2....cotN=giatriN
       [ WHERE  DIEU_KIEN ];`

### f. Delete:
- Xóa 1 bản ghi đã có trong bảng:
- Cú pháp:

     `DELETE FROM ten_bang
        WHERE  {DIEU_KIEN};`

###  g. Drop Table:
- Xóa 1 bảng trong CSDL
- Cú pháp: 

      `DROP TABLE ten_bang`

## 2. Ví dụ vào bài toán quản lý bán hàng trong cửa hàng:
### a. Giả định bài toán quản lí hàng hóa trong cửa hàng có các bảng chính sau:
- Bảng sản phẩm lưu các thông tin về sản phẩm, trong đó có id_loaihang liên kết với bảng loại hàng và id_hangsx liên kết với bảng hãng sản xuất:
  



| ID| Ten_san_pham | Gia_ban | ID_loihang | ID_hangsx | 
| -------- | -------- | -------- | -------- | -------- | 
| 1| Xà phòng lifebouy tinh chất sữa     | 13.000     | 1    | 1     |
| 2| Xà phòng lifebuoy Hương Khổ qua     | 13.000    | 1     | 1  |
| 3|Xà phòng lifebuoy bảo vệ vượt trội     | 16.000     | 1     | 1    |
| 4| Sữa tắm trắng da Thebol     | 5.000     | 2| 2    |
| 5| Khăn ướt em bé Baby Care     | 5.000     | 4   | 4   |
| 6| Sữa tắm dưỡng ẩm Double Rich     | 5.000    | 3     | 3     |
| 7| Bông ráy tai Lovely     | 5.000    | 5    | 5 |
| 8| Sữa tắm trắng da Double Rich    | 5.000     | 2    |4     |
| 9| Sữa tắm trắng da Hazeline     | 6.000     | 2   | 6    |
| 10| Sữa tắm trắng da Gervenn     | 6.000     | 2     | 7     |

- Bảng Loại hàng chứa thông tin về loại hàng:


| ID_loaihang|Ten_loai_hang|
| -------- | -------- | -------- |
| 1    | Xà phòng |
| 2     |Sữa tắm trắng|
| 3     |Khăn ướt em bé   |
| 4     | Sữa tắm dưỡng ẩm   |
| 5     | Bông ráy tai    |

- Bảng Hãng sản xuất chứa thông tin về hãng sản xuất:



|ID_hangsx| Tên hãng sản xuất |
| -------- | -------- | -------- |
| 1    | lifebuoy    |
| 2    | Thebol    |
| 3     | Baby Care  |
| 4     | Double Rich  |
| 5     | Lovely    |
| 6     | Hazeline    |
| 7    | Gervenn  |



### b. Thực hiện:
- Tạo lần lượt các bảng trong CSDL:
- bảng sản phẩm:
```
CREATE TABLE sanpham(
ID int IDENTITY(1,1) PRIMARY KEY,
TenSanPham nvarchar (255) NOT NULL,
Gia int,
ID_Loaihang int,
ID_Hangsx int,
);
```

-> Kết quả:
![](https://images.viblo.asia/15c3492e-1130-47e5-9365-dcb475139095.png)

- Bảng loại hàng:
```
CREATE TABLE Loai_hang(
ID int IDENTITY(1,1) PRIMARY KEY,
TenLoaiHang nvarchar (255) NOT NULL,
);
```

-> Kết quả:
![](https://images.viblo.asia/bc8da5de-ca96-44e3-94cd-88e2a287c5ed.png)

- Bảng hãng sản xuất:
```
CREATE TABLE Hang_san_xuat(
ID int IDENTITY(1,1) PRIMARY KEY,
TenHangSanXuat nvarchar (255) NOT NULL,
);
```
-> Kết quả: 
![](https://images.viblo.asia/798e9b3d-ff7f-4de3-b252-843cb8b9e0a1.png)

- Thực hiện thêm các thông tin vào trong bảng CSDL:
- Bảng Hãng sản xuất:
    - Thêm thông tin vào bảng Hãng sản xuất:
   
   `INSERT INTO [dbo].[Hang_san_xuat]
           ([TenHangSanXuat])
     VALUES
           ('lifebuoy')`
           
     - Thực hiện tương tự câu lệnh với các hãng khác ta được kết quả:
     ![](https://images.viblo.asia/dd264c7f-fd6f-4725-b823-34e577801edc.png)
     
- Bảng Loại hàng:
    - Thực hiện câu lệnh tương tự với bảng Tên hãng sản xuất ta được kết quả:
    
    ![](https://images.viblo.asia/553a72e2-f73d-41be-8cc7-3bd73bd83e4c.png)
    
    - Bảng Sản phẩm:
        - Tên sản phẩm đầu tiên ( Thêm N trước chuỗi cần gõ Tiếng Việt có dấu ):
       
       `INSERT INTO sanpham2 ([TenSanPham],[Gia],[ID_Loaihang],[ID_Hangsx])
     VALUES  (N'Xà phòng lifebuoy tinh chất sữa',13000,1,1)`
     
         - Kết quả:
         ![](https://images.viblo.asia/f4f5084c-7fee-46d4-a7ab-0aa5383e5acc.png)
         
         
     - Thực hiện tương tự với các sản phẩm khác có kết quả:
     ![](https://images.viblo.asia/08d2a7e9-c51d-41db-83d5-5d9b4523f1bb.png)
     
     
     << Còn nữa sẽ làm tiếp vào "Các Câu Lệnh Trong MS SQL Server Và Ví Dụ Vào Bài Toán QUẢN LÝ HÀNG HÓA Trong Cửa Hàng (P2)"