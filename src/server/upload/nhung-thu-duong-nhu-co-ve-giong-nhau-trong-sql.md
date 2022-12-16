##### Trong SQL có nhiều câu lệnh sẽ khiến bạn không khỏi tò mò rằng: "Vì sao người ta tạo ra chúng trong khi trước đó đã có những thứ tương tự rồi nhỉ ?". Nay mình lượm nhặt và tổng hợp lại vài thứ như vậy vừa để chia sẻ cũng như giữ làm chút của riêng =)).
## 1. TRUNCATE và DELETE các cậu có phải anh em?
- Hồi mới đi phỏng vấn mình có gặp 1 câu hỏi rất chí đó là "**Nếu người dùng xóa lịch sử giao dịch của họ em sẽ dùng TRUNCATE hay DELETE ?**" Vậy ta dùng gì đây nhỉ :).
- Trước tiên ta có cú pháp của TRUNCATE như sau:
```
TRUNCATE TABLE table_name
```
- còn DELETE là như này:
```
DELETE FROM table_name WHERE ...
```
- Nếu chỉ như này thì ta có thể thấy **TRUNCATE** đơn thuần chỉ là xóa dữ liệu trong bảng mà không làm thay đổi cấu trúc của bảng. Nếu như vậy tại sao chúng ta lại cần phải tạo ra nó trong khi ta cũng có thể lạm nhiệm vụ đấy với **DELETE** theo cú pháp sau ?.
```
DELETE FROM table_name
```
- Trong khi đó **DELETE** của chúng ta còn có thể **where** để xóa chính xác từng bản ghi còn **TRUNCATE** mong mỏi mãi cũng chả có **where** :D. Tuy vậy theo **Document** của SQL khi bạn dùng **TRUNCATE** trong **Transaction log** không có ghi lại những dòng xóa lịch sử mờ ám, còn đối với **DELETE** nhất cử nhất động của bạn đều được gi lại.
- Từ đây ta có thể suy được những sự giống và khác nhau của 2 câu lệnh này

| **TRUNCATE** |  **DELETE** |
| -------- |  -------- |
| Xóa dữ liệu nhưng không xóa cấu trúc    | Xóa dữ liệu nhưng không xóa cấu trúc|
| Xóa tất cả dòng dữ liệu trong bảng    | Xóa các dòng dữ liệu trong bảng     |
| Không sử dụng được **WHERE**    | Sử dụng được **WHERE**     |
| **KHÔNG** ghi lại các dòng xóa trong **transaction log**    | **CÓ** ghi lại các dòng xóa trong **transaction log**      |
* Tuy nhiên mọi người thường bảo dùng  **TRUNCATE** xóa nhanh hơn  **DELETE** là vì nó không có gì lại lịch sử action trong **tran log**. Trên thực tế điều này không chính xác, bản chất **TRUNCATE** làm việc nhanh hơn **DELETE** là vì cơ chết ghi **Log** của chúng khác nhau  Thằng **DELETE** nó ghi lại hầu như những gì nó xóa vì thế nếu 1 2 rows thì **Transaction log** dễ dàng chứa được nhưng nếu dữ liệu lên đến mức rất lớn thì dễ sảy ra việc bị tràn **log**. Trong khi đò **TRUNCATE** cũng là xóa nhưng thay vì xóa hẳn dữ liệu chúng chỉ hủy cấp phát các trang dữ liệu được dùng lưu trữ dữ liệu trong bảng và ghi lại chỉ các trang được hủy cấp phát trong transaction log. Dữ liệu vẫn tồn tại cho đến khi nó bị ghi đè hoặc **shrunk**
* Vậy đáp án của câu hỏi kia là dùng **DELETE** vì **TRUNCATE** đâu có where :D thật bất ngờ phải không.
## 2. HAVING với WHERE vấn đề muôn thủa
-  Nếu từng học môn SQL hay Hệ quản trị CSDL,.. hoặc bất kì một môn nào đó có liên quan đến SQL, thì bạn đã từng được nếm trải qua câu hỏi sự khác nhau giữa **HAVING** và **WHERE** rồi nhỉ :D. Đây là một câu hỏi **Key** mà làm nao lòng của chúng ta bất kể bạn có nghĩ mình nắm chắc như nào nhưng khi test thì kết quả vẫn sai :).
-  Ai cũng biết **WHERE** dùng để **filter** theo row còn **HAVING** dùng để **filter** theo **GROUP** nhớ là **Filter** nhé chứ không phải chọn đâu :D. Nhưng tại sao **Having** có thể thay thế được cho **Where** như ví dụ sau đây.
```
// lấy tất cả
(1) select * from tbl_user
```
![](https://images.viblo.asia/76248803-60ed-45b4-9cbb-317eb2c001a3.png)
* còn đây là 2 câu lệnh lọc sử và có cùng kết quả.
```
(2) select * from tbl_user where age > 22
(3) select * from tbl_user having age > 22
```
![](https://images.viblo.asia/9954254a-0ed7-4c5b-b0a5-c4607a79a348.png)
* Thực chất nếu bạn đẻ ý kỹ trong mysql và sqlserver việc bạn viết khôi lệnh **(1)** cũng đồng nghĩa bạn thực hiện khối lệnh sau.
```
(4) SELECT * FROM tbl_user GROUP BY `primary key` ORDER BY `primary key` ASC
```
* Như  vậy đồng nghĩa với việc những câu **Select** querry của bạn luôn luôn có **group by** vì thế nó luôn thực hiện được mệnh đề **Having**.
* Tương tự **Having** là câu lệnh điều kiện để dùng trong **Group by** bởi khi muốn dùng các **Hàm tổng hợp (AGGREGATE function)** được định nghĩa trên 1 tập hợp thì ta phải dùng đến **Group by**.
* Từ đây ta có thể thấy **Where** và **Having** đều làm được những thứ giống nhau. Nhưng **Having** thì có thể thay thế cho **Where**, còn **where** thì không bao giờ.

| Having | Where |
| -------- | -------- |
| Dùng để lọc các giá trị trong bảng|Dùng để lọc các giá trị trong bảng|
| Lọc theo nhóm (**Group**)     | Lọc theo hàng (**Row**)|
| Sử dụng sau mệnh đề **Form** | Sử dụng sau mệnh đề **Form** và trước **Having** |
| Nhóm kết quả lại rồi lọc | Lọc không cần nhóm kết quả |
* Có một lưu ý nhỏ như thế này nếu bạn sử dụng group by khác mặc định như **(4)** thì cách thức hoạt động có thể hình dung như sau:
1. **Group by** tạo bảng **ảo** với điều kiện Having
2. Thực hiện các hàm tổng hợp
3. trả về bảng kết quả
## 3. Kết luận.
* Trong thực tế bạn không cần nắm quá rõ **TRUNCATE** và **DELETE** bởi việc dùng **TRUNCATE** chỉ cho các bài toán đặc trưng hoặc sếp bạn muốn bạn làm thế :D.
* Còn việc **Having** và **Where** thực chất bạn dùng **where** và **sub querry** cũng có thể giải quyết được vấn đề nhưng nếu gặp các bài toán về thống kê, tính toán nhóm thì việc dùng **Having** rất có lợi và còn làm giảm số lượng câu querry của chương trình. :D.

-----

**Cảm ơn các bạn đã đọc bài viết này của tôi!.**