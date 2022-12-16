# Bạn đã bao giờ ... ?
Dùng đến sql thì ai mà chẳng thuộc làu làu mấy cái lệnh kinh điển "thêm sửa xóa" . 

Ấy thế mà bước chân ra khỏi trường đi làm ấy mà, lôi chúng nó ra dùng đôi khi gượng tay phết đấy.

Lấy luôn bản thân mình làm ví dụ, tôi đã từng lôi dữ liệu ra chỉ để check xem nó có tồn tại hay không, và lựa chọn insert hoặc update nó. (tất nhiên là đoạn này lại nhét thêm transaction vào rồi)

Nghe có củ chuối không các bạn. Ai cho tôi 1 vé về ngày xưa để tẩy uế chỗ code của mình giờ =))

Đó chỉ là 1 trong các vấn đề mà mọi người có thể gặp phải, các vấn đề củ chuối nếu có xuất hiện trên đời thì thường các nhà phát triển đã hộ trợ sẵn rồi, chỉ là chúng ta có tìm được nó để dùng không thôi !

(Ở đây, mình đang đề cập đến sql nhé, còn dùng mấy cái function nhanh gọn lẹ của các framework tân tiến thì cũng ko hề gì, nhưng bản chất tầng dưới thì nó cũng sẽ xử lí bằng sql thôi, có khi lại chạy theo luồng bên trên thì kiếp này coi như bỏ, chọn nhầm người để yêu rồi !)

# INSERT mà không hẳn là INSERT
Cùng nhìn lại sự nhạt nhẽo trước, rồi đến với cảm giác Yomost nhé !
## Gọi là base action sql đi
### SELECT
```
SELECT select_list
FROM table_name;
```

### INSERT
```
INSERT INTO table_name(column1,column2,...)
VALUES (value1,value2,...);
```

### UPDATE
```
UPDATE table_name
SET column_1="byakuya", column_2="senbon zakura",...
WHERE conditions;
```
Đấy, gặp trường hợp như tôi mà không biết cái ngay dưới đây là xoay vòng với 3 cái lệnh này !

## INSERT ON DUPLICATE KEY UPDATE
Ý nghĩa : Nếu chưa có bản ghi tương ứng thì chèn vào, nếu có rồi thì update nó với dữ liệu mới. Ở đây tôi chẳng cần quan tâm gì hơn, lệnh này care hết logic cho tôi rồi. Nếu thực thi với nhiều bản ghi dữ liệu cũng không sao, không vòng for, không phải check từng cái, không cần transaction, cuối cùng là không đau đầu.

Thế thì cũng nên định nghĩa thêm khái niệm " bản ghi tương ứng " ở đây chứ nhỉ : nó là bản ghi đã tồn tại trong database mà có "UNIQUE index" hoặc "PRIMARY KEY" trùng với của bản ghi dữ liệu truyền vào. 

Cú pháp thì như sau :
```
INSERT INTO table_name (column_list)
VALUES (value_list)
ON DUPLICATE KEY UPDATE
   c1 = v1,
   c2 = v2,
   ...;
```
Chỗ này : 
```
 c1 = v1,
   c2 = v2,
   ...;
```
là tùy ý, update tùy ý về số column, giá trị như nào. Không cần khớp với đoạn INSERT ở đầu.

MySQL cũng trả về số affected-rows đối với lệnh nafy. Cụ thể :
```
Nếu rơi vào trường hợp thêm mới thì sẽ return về  1.
Nếu rơi vào trường hợp cập nhật bản ghi thì sẽ return về  2.
Còn nếu rơi vào trường hợp cập nhật với dữ liệu giống hệt bản ghi cũ thì sẽ return về  0, ý là "ông chả thay đổi cái gì sất mà cứ làm như đúng rồi.
```
## INSERT IGNORE
Khi insert nhiều rows cùng lúc thì sẽ có 3 khả năng xảy ra là *[Fail hết, Success hết, Fail 1 phần và success phần còn lại]*. Và bình thường thì sẽ chẳng có gì được thực thi nếu có bất kì lỗi nào phát sinh.

Tuy nhiên với lệnh này thì tư tưởng là bất chấp, cái nào đúng thì vẫn làm, cái nào sai thì bỏ qua. 
Cú pháp khác mỗi lệnh insert thông thường là có thêm IGNORE đằng sau.

Lưu ý : Khi bật Strict mode thì khi gặp bản ghi đã tồn tại nó vẫn sẽ được insert bằng cách truncate bản ghi đó trước (tạo điều kiện hợp lệ để insert). Tất nhiên là dữ liệu phải đúng với định dạng của các column nhé, cái này chỉ có trùng key, index thì áp dụng thôi !

*Tham khảo : https://www.mysqltutorial.org/ *