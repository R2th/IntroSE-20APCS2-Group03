## 1. Mở Đầu
Các bảng trong cơ sở dữ liệu đóng vai trò là các đối tượng tổ chức và lưu trữ dữ
liệu. Như vậy, ta có thể quan sát được dữ liệu trong cơ sở dữ liệu bằng cách thực hiện
các truy vấn trên bảng dữ liệu. Ngoài ra, SQL còn cho phép chúng ta quan sát được dữ
liệu thông qua việc định nghĩa các khung nhìn.
## 2. Khung Nhìn
### 2.1 Khái Niệm
Một khung nhìn (`view`) có thể được xem như là một bảng “ảo” trong cơ sở dữ
liệu có nội dung được định nghĩa thông qua một truy vấn (câu lệnh `SELECT`). Như
vậy, một khung nhìn trông giống như một bảng với một tên khung nhìn và là một tập
bao gồm các dòng và các cột. Điểm khác biệt giữa khung nhìn và bảng là khung nhìn
không được xem là một cấu trúc lưu trữ dữ liệu tồn tại trong cơ sở dữ liệu. Thực chất
dữ liệu quan sát được trong khung nhìn được lấy từ các bảng thông qua câu lệnh truy
vấn dữ liệu.
### 2.2 Tạo Khung Nhìn
Câu lệnh `CREATE VIEW` được sử dụng để tạo ra khung nhìn và có cú pháp
như sau:
```
CREATE VIEW tên_khung_nhìn[(danh_sách_tên_cột)]
AS câu_lệnh_SELECT
```
Nếu trong câu lệnh `CREATE VIEW`, ta không chỉ định danh sách các tên cột
cho khung nhìn, tên các cột trong khung nhìn sẽ chính là tiêu đề các cột trong kết quả
của câu lệnh `SELECT`. Trong trường hợp tên các cột của khung nhìn đươc chỉ định,
chúng phải có cùng số lượng với số lượng cột trong kết quả của câu truy vấn.
Một số nguyên tắc khi tạo Khung Nhìn:
* Tên kh ung nhìn và tên cột trong khung nhìn, cũng giống như bảng, phải tuân
theo qui tắc định danh.
* Không thể qui định ràng buộc và tạo chỉ mục cho khung nhìn.
* Câu lệnh `SELECT` với mệnh đề  `COMPUTE ... BY` không đượ c sử dụng để
định nghĩa khung nhìn.
* Phải đặt tên cho các cột của khung nhìn trong các trường hợp sau đây:
    * Trong kết quả của câu lệnh `SELECT` có ít nhất một cột được sinh
ra bởi một biểu thức (tức là không phải là một tên cột trong bảng
cơ sở) và cột đó không được đặt tiêu đề.
    * Tồn tại hai cột trong kết quả của câu lệnh `SELECT` có cùng tiêu
đề cột.
ví dụ: Câu lệnh dưới đây tạo khung nhìn có tên `user_post` từ câu lệnh `SELECT` truy
vấn dữ liệu từ 2 bảng `users` và `micro_posts`
```
create view user_post as
select users.id as user_id, users.name as user_name, email, micro_posts.name as micro_post_name
from users inner join micro_posts on users.id = micro_posts.user_id;
```

select dữ liệu từ view user_post:
```
Select * from user_post
```

kết quả :

![](https://images.viblo.asia/b6b997ec-5aa1-4eef-a9f9-e9c0c02db441.png)
### 2.3 Cập Nhật, Bổ Sung, Xóa Thông Qua Khung Nhìn
Đối với một số khung nhìn, ta có thể tiến hành thực hiện các thao tác cập nhập,
bổ sung và xoá dữ liệu. Thực chất, những thao tác này sẽ được chuyển thành những
thao tác tương tự trên các bảng cơ sở và có tác động đến những bảng cơ sở.
Về mặt lý thuyết, để có thể thực hiện thao tác bổ sung, cập nhật và xoá, một
khung nhìn trước tiên phải thoả mãn các điều kiện sau đây:
* Trong câu lệnh `SELECT` định nghĩa khung nhìn không được sử dụng từ
khoá `DISTINCT`, `TOP`, `GROUP BY` và `UNION`.
* Các thành phần xuất hiện trong danh sách chọn của câu lệnh `SELECT` phải
là các cột trong các bảng cơ sở. Trong danh sách chọn không được chứa các
biểu thức tính toán, các hàm gộp.
Ngoài những điều kiện trên, các thao tác thay đổi đến dữ liệu thông qua khung
nhìn còn phải đảm bảo thoả mãn các ràng buộc trên các bảng cơ sở, tức là vẫn đảm bảo
tính toàn vẹn dữ liệu. Ví dụ dưới đây sẽ minh hoạ cho ta thấy việc thực hiện các thao
tác bổ sung, cập nhật và xoá dữ liệu thông qua khung nhìn.
Nếu trong danh sách chọn của câu lệnh `SELECT` có sự xuất hiện của biểu thức
tính toán đơn giản, thao tác bổ sung dữ liệu thông qua khung nhìn không thể thực hiện
được. Tuy nhiên, trong trường hợp này thao tác cập nhật và xoá dữ liệu vấn có thể có
khả năng thực hiện được (hiển nhiên không thể cập nhật dữ liệu đối với một cột có
được từ một biểu thức tính toán).
vd tạo khung nhìn `micropost1` từ câu lệnh `SELECT` dữ liệu từ bảng `microposts` với điều kiện `user_id = 1`
```
CREATE VIEW micropost1 AS
SELECT * from micro_posts WHERE user_id = 1;
```

![](https://images.viblo.asia/22f6643b-602e-4f0a-9cec-5534a5c174fa.png)

để cập nhập dữ liệu thông qua `VIEW` `micropost1` như sau:
```
UPDATE micropost1 set name = "ABC" where id = 2;
```

![](https://images.viblo.asia/fbf19dac-fde3-41ab-a97a-db702497a7db.png)
### 2.4. Sửa Khung Nhìn
Câu lệnh `ALTER VIEW` được sử dụng để định nghĩa lại khung nhìn hiện có
nhưng không làm thay đổi các quyền đã được cấp phát cho người sử dụng trước đó.
Câu lệnh này sử dụng tương tự như câu lệnh `CREATE VIEW` và có cú pháp như sau:
```
ALTER VIEW tên_khung_nhìn [(danh_sách_tên_cột)]
AS Câu_lệnh_SELECT
```
### 2.5. Xóa Khung Nhìn
Khi một khung nhìn không còn sử dụng, ta có thể xoá nó ra khỏi cơ sở dữ liệu
thông qua câu lệnh:
```
DROP VIEW tên_khung_nhìn
```