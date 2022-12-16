Những bài viết trước mình đã chia sẻ những kiến thức cơ bản về Database, MySQL, một số câu lệnh truy vấn cơ sở dữ liệu thường dùng mà các bạn có thể áp dụng vào công việc Tester, QA đang làm như:

**MySQL cơ bản**: https://link.sun-asterisk.vn/52e9yI

**Cơ sở dữ liệu là gì?MySQL- Một số câu lệnh truy vấn cơ sở dữ liệu thường dùng^^**: https://link.sun-asterisk.vn/zlywXS

**Câu lệnh SQL Join: Các loại Join trong SQL**: https://link.sun-asterisk.vn/Xriazf

Từ những kiến thức cơ bản này, bài ́này mình sẽ chia sẻ với các bạn về một số câu hỏi phỏng vấn liên quan đến SQL mà bạn nên biết, phần nào giúp các bạn có thêm kiến thức và tự tin hơn trong lúc đi phỏng vấn nhé

# 1. Một bảng có được 2 khóa chính không?

- Một bảng thì có một Khóa Chính và nhiều khóa phụ 

# 2. Khóa chính (Primary Key) trong Database là gì?  
- Khóa chính dùng để định danh Duy nhất mỗi record trong table của cơ sở dữ liệu. Dữ liệu (value) của field khóa chính phải có tính duy nhất. Và không chứa  các giá trị Null (rỗng)  

# 3. Khóa ngoại (Foreign Key) trong Database là gì? 
- Một FOREIGN KEY là một khóa được sử dụng để liên kết hai bảng với nhau.  Đôi khi, nó còn được gọi như là một khóa tham chiếu. Khóa ngoại của một  bảng (table) được xem như con trỏ trỏ tới khóa chính của table khác.  

# 4. Để liên kết nhiều bảng (table) với nhau trong SQL, thì dùng câu lệnh gì? 
- Sử dụng câu lệnh JOIN  
- Có các kiểu JOIN như sau: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL  JOIN
Refer link bài trước:  https://link.sun-asterisk.vn/Xriazf

# 5. Group by dùng để làm gì?  
- Mệnh đề GROUP BY trong SQL được sử dụng kết hợp với lệnh SELECT để sắp xếp dữ liệu đồng nhất vào trong các nhóm.  
- Trong SQL, mệnh đề GROUP BY theo sau mệnh đề WHERE trong một lệnh  SELECT và ở trước mệnh đề ORDER BY. 
- Cấu trúc ( bị hỏi mới nói, hoặc dùng để nhớ nếu phải làm ví dụ )  

```
SELECT cot1, cot2 

FROM ten_bang  

WHERE [ dieu_kien ] 

GROUP BY cot1, cot2  

ORDER BY cot1, cot2  
```

Refer link bài trước: https://link.sun-asterisk.vn/zlywXS

# 6. Khác nhau giữa WHERE và HAVING ?

- Where: Là câu lệnh điều kiện trả kết quả đối chiếu với từng dòng  Where đứng trѭớc group by  
+ Ví dụ: (đọc để hiểu thêm)  

```
select th.TEN_TRUONG_HOC, count(lh.MA_LOP_HOC) from LOP_HOC lh 

join TRUONG_HOC th on th.MA_TRUONG_HOC=lh.MA_TRUONG_HOC  join TINH_THANH tt on tt.MA_TINH_THANH=th.MA_TTHANH  

where lh.NAM_HOC=2017  

and lh.CAP_HOC=3 and tt.MA_TINH_THANH='38'  

group by th.TEN_TRUONG_HOC; 
``` 
- Having: Là câu lệnh điều kiện trả kết quả đối chiếu cho nhóm (Sum, AVG).  Mệnh đề HAVING được thêm vào SQL vì mệnh đề WHERE không áp dụng  được đối với các hàm tập hợp (như SUM, AVG). Nếu không có HAVING, ta  không thể nào kiểm tra được điều kiện với các hàm tập hợp.  
Having đứng sau group by  
+ Ví dụ:  (đọc để hiểu thêm)  

```
Select company, sum(amount)

From Sale

Group by company

Having  sum(amount)>10000
```

Refer link bài trước: https://link.sun-asterisk.vn/zlywXS

# 7. Hàm Count (*) ?

- Hàm COUNT(*) trả về số lượng các dòng được chọn ở trong bảng.  
- Cấu trúc: SELECT COUNT(tên_cột) FROM tên_bảng 
Ví dụ:  
- Câu lệnh sau sẽ trả về số lượng những người lớn hơn 20 tuổi: 

` SELECT COUNT(*) FROM Persons WHERE Age > 20  `

Refer link bài trước: https://link.sun-asterisk.vn/zlywXS

# 8. Phân biệt Inner join và Left join  ?

- INNER JOIN (Hoặc JOIN): trả về tất cả các dòng ở cả hai bảng khi chúng  tương ứng với nhau hay giá trị dùng để join hai bảng với nhau đều có ở cả hai  bảng
- LEFT JOIN trả về tất cả các dòng (rows) của bảng bên trái), ngay cả khi các  dòng đó không ứng với dòng nào ở bảng bên phải  

Refer link bài trước: https://link.sun-asterisk.vn/Xriazf

# 9. Một số câu truy vấn cơ bản 
## 9.1. Truy vấn hay cần tìm 1 dữ liệu trong DB? 

Nêu cú pháp trước, sau đó lấy ví dụ:

```
Select * from table_name where column_name=’value’;  

Select * from User where username = ‘Lan’;
```

Refer link bài trước: https://link.sun-asterisk.vn/52e9yI

## 9.2. Cần Thêm mới 1 dữ liệu trong DB? 
Nêu cú pháp trước, sau đó lấy ví dụ:

```
Insert into table_name (column_name1, column_name2) values (‘value1’,  “value2”); 

Insert into User (ho_ten, ngay_sinh) values (‘Lan Pham’, ‘04/05/1997)  
```

Refer link bài trước: https://link.sun-asterisk.vn/52e9yI

## 9.3. Cần sửa 1 dữ liệu trong DB?  
Nêu cú pháp trước, sau đó lấy ví dụ:

```
Update table_name set column_name= ‘giá trị mới’ where column_name= ‘giá  trị’; 

 Update User set ho_ten= ‘Lan Pham’ where ma_nguoi_dung=’L01’; 
 
```
 Refer link bài trước: https://link.sun-asterisk.vn/52e9yI
 
## 9.4. Cần xóa 1 dữ liệu trong DB? 
Nêu cú pháp trước, sau đó lấy ví dụ:

```
Delete from table_name where column_name=’values’; 

Delete from ho_ten= ‘Lan Pham’ where ma_nguoi dung=’L02’; 
```

 Refer link bài trước: https://link.sun-asterisk.vn/52e9yI

## 9.5. Cần đếm số lượng trong DB?  
Nêu cú pháp trước, sau đó lấy ví dụ:

```
Select count (*) from table_name;  

Select count (column_name) from table_name;  
```


# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn định hình một số câu hỏi phỏng vấn SQL mà có thể gặp lúc đi phỏng vấn. Hi vọng nó sẽ góp phần trở thành một hành trang nho nhỏ cho các bạn, giúp ích cho các bạn trong những lần phỏng vấn! 

Tài liệu tham khảo:https://www.w3schools.com/sql/sql_ref_keywords.asp