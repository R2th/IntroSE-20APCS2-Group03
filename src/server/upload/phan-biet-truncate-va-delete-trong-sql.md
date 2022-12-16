1.  `DELETE`
* Cú pháp: `DELETE FROM table_name WHERE condition;`
* Hoặc nếu muốn xóa cả bảng thì chúng ta có cú pháp: `DELETE FROM table_name;`
* Khi chạy lệnh `DELETE` thì SQL sẽ log lại từng dòng đã xóa vào `transaction log`, vì thế nên khi bạn tạo 1 record mới, giá trị của `id` sẽ không bắt đầu từ `1` mà sẽ có giá trị `n+1` với `n` là giá trị của record cuối cùng được tạo.
* Ví dụ:
* ![](https://images.viblo.asia/611032cd-c9e4-4f09-bb42-eb0f29d226e1.png)
Chạy lệnh `DELETE from products where productCode = 'S10_1678';`
![](https://images.viblo.asia/226a70ff-a8d9-4fa3-95ff-63ac19430019.png)
* `select * from products where productCode = 'S10_1678';`
![](https://images.viblo.asia/8203b64f-cead-4e54-a63d-a82d0b799ec6.png)
* Vậy là giá trị `productCode` = 'S10_1678' đã bị xóa khỏi DB;
* Tiếp đến là ví dụ về xóa cả bảng với `DELETE`
* `delete from products;`
![](https://images.viblo.asia/14d849b1-789a-4be8-a7a1-64f256b844c4.png) 
* Và bây giờ bảng đã trống trơn
![](https://images.viblo.asia/8203b64f-cead-4e54-a63d-a82d0b799ec6.png)
2. `TRUNCATE`
* Cú pháp: `TRUNCATE TABLE table_name;`
* Đối với `TRUNCATE` chúng ta chỉ có thể dùng cho bảng chứ không thể dùng cho từng record.
* Khi chạy lệnh `TRUNCATE` thì SQL sẽ xóa hết dữ liệu của bảng và reset `transaction log`, vì thế khi tạo 1 record mới, giá trị cua `id` sẽ bắt đầu từ `1`, đây cũng chính là khác biệt lớn nhất của `DELETE` và `TRUNCATE`.
* Ví dụ
* Chúng ta sẽ chạy lệnh `TRUNCATE table products` với bảng ví dụ ở trên
![](https://images.viblo.asia/d8fe9c4e-c864-4b40-8ed0-5efc1be78a35.png)
* Như các bạn có thể thấy bản chất câu lệnh `DELETE` là xóa từng row khi có 109 rows đã bị tác động còn `TRUNCATE` đơn giản là xóa cả 1 dữ liệu của 1 bảng không kể số lượng dòng khi có 0 rows đã bị tác động.
3. 1 vài điều lưu ý
  *  `TRUNCATE` không thể chạy được khi bảng bạn định xóa có `foreign_key` (nếu bảng đó có `foreign_key` trỏ đến chính nó thì bạn có thể xóa bình thường)
  *  Dữ liệu bị xóa bởi `DELETE` có thể `restored` được còn `TRUNCATE` thì không.
  *  Tùy vào từng trường hợp thì bạn sẽ dùng `DELETE` hoặc `TRUNCATE`, `TRUNCATE` sẽ luôn nhanh hơn vì nó tiêu tốn ít bộ nhớ hơn, các bạn có thể cân nhắc điều này khi cần xóa 1 bảng lớn vs nhiều record.