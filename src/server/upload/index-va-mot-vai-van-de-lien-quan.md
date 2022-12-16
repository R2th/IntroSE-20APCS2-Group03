Thử hình dung bạn sẽ được giao một nhiệm vụ phải tối ưu một vài hệ thống mà chưa biết phải bắt đầu từ đâu, 
thì dưới đây là một vài bước có thể giúp ích được cho bạn có thể cải thiện được tốc độ hệ thống.
Một vài ý tưởng đến lúc đầu có thể là 
- chưa sử dụng indexes
- không tận dụng được i/o striping
- thiếu bộ nhớ vật lý
- kêt nối mạng bị chậm
- locks. deadlocks 
- Trả về các trường không cần thiết
- câu truy vấn chưa được tối ưu
# Tối ưu câu truy vấn
- không nên sử dụng hàm đối với các trường đánh index
- không nên sử dụng các toán tử đối với các trường đánh index
- sử dụng đúng thứ tự các trường đã được đánh index 
Chúng ta cùng xem lại một số ví dụ không nên sử dụng sau:
```
SELECT *
  FROM users
 WHERE UPPER (user_name) = UPPER ('USER_NAME');
 ```
 
 ```
SELECT *
  FROM users
 WHERE id + 1 = 2;
 ```
 thay vì id + 1 = 2, việc này sql sẽ không sử dụng được index mà chỉ thực hiện select bình thường
 
 Không nên sử dụng sử dụng toán tử not like, not in, <> với trường đánh index, partition:
 ```
SELECT *
  FROM users
 WHERE user_name NOT LIKE 'USER_NAME%';
 
SELECT *
  FROM users
 WHERE user_name NOT IN ('USER_NAME1', 'USER_NAME2', 'USER_NAME3');
 
SELECT *
  FROM users
 WHERE user_name <> 'USER_NAME1';
 ```
 
ở ví dụ tiếp theo là 1 lưu ý về like
```
SELECT *
  FROM users
 WHERE user_name LIKE '%USER_NAME';
 ```
 việc sử dụng like %.... sẽ làm mất đi tác dụng của việc đánh index, mà thay vào đó từ tìm kiếm là abc% thì việc đánh index sẽ có hiệu quả hơn.
 
# Từ khóa In, exists
Bạn dùng in, exists khi nào ?
Khi cần chúng ta sử dụng 2 toán tử trên trong câu truy vấn, tốc độ có thể khác nhau là rất lớn, cùng mình xem vào ví dụ dưới đây:
In: -> giải quyết dữ liệu bảng thứ 2 khi thực hiện câu lệnh `SELECT DISTINCT y FROM t2`;  vấn đề đặt ra là bảng dữ liệu T2 lớn thì thời gian thực hiện câu lệnh tương đối chậm.
```
SELECT *
  FROM t1
 WHERE x IN (SELECT y
               FROM t2);
--Dien giai (tuong duong voi cau lenh sau)
SELECT *
  FROM t1,
       (SELECT DISTINCT y
                   FROM t2) t2
 WHERE t1.x = t2.y;
 ```

Lệnh Exists: -> Câu lệnh này quét dữ liệu full bảng T1, trường hợp bảng T2 đánh index theo trường y thì tốc độ truy vấn dữ liệu bảng T2 tương đối nhanh
```
for x in ( select * from t1 )
loop
   if ( exists ( select null from t2 where y = x.x ))
   then
       OUTPUT THE RECORD
   end if
end loop;
```

Từ khóa Count
chúng ta cùng xem xét một ví dụ dưới đây
```
SELECT count(id)
FROM (`user`)
WHERE `level` <= 4
AND `unit` IN ('123456', '234567', '345678') 
ORDER BY `sharetolevel` DESC, `id` DESC

SELECT *
FROM (`user`)
WHERE `level` <= 4
AND `unit` IN ('123456', '234567', '345678') 
ORDER BY `sharetolevel` DESC, `id` DESC
```
Trên đây là một ví dụ điển hình cho việc phân trang thường gặp, bắt đầu từ việc count số lượng bản ghi, tiến hành lấy limit
thông thường, sẽ có thư viện hỗ trợ việc này nên không mấy khi chúng ta quan tâm, chỉ đến khi page của chúng ta chậm mới phải ngồi dò lại là tại sao
Ở ví dụ trên mình có 2 lưu ý nhỏ: 
- ở câu count mình sẽ ko order by gì cả `ORDER BY `sharetolevel` DESC, `id` DESC` -> bỏ (tốc độ có thể cải thiện đáng kể)
- khi sử dụng select ko chỉ đánh vào where mà còn phải đánh cả vào các trường mình order by
Một từ khóa mà có thể hữu ích đối với tất cả mỗi chúng ta là `explain`
Khi nào câu query của chúng ta cảm thấy chậm thì dùng nó để thiết lập lại các index

Một lưu ý nhỏ nữa là nếu một số framework bạn đang dùng không có chức năng ghi log sql thì bạn cũng có thể tiến hành setup ghi log ra file như sau
```
SET global log_output = 'FILE';
SET global general_log_file='/Applications/MAMP/logs/mysql_general.log';
SET global general_log = 1;
```
Việc này là rất quan trọng, bạn hoàn toàn phải kiểm soát được câu truy vấn nào hay được sử dụng, sử dụng ở đâu, đánh index thế nào cho hợp lý, đánh rồi mà tốc độ vẫn chưa cải thiện là sao, blabla
Trên đây là một vài lưu ý nhỏ cho các bạn khi thiết kế ứng dụng của mình. Một máy chủ lớn không phải là giải pháp hay, 1 website đẹp, hay, hữu ích nhưng có thể người dùng sẽ ko hứng thú nếu tốc độ của nó quá chậm
Trên đây là một số lưu ý nhỏ khi các bạn thực hiện tối ưu hóa hệ thống hay thiết kế một hệ thống mới. Hi vọng nó mang lại hữu ích đối với tất cả các bạn :D