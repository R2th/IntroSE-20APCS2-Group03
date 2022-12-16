* Trong lập trình chắc hẳn bạn đã đang hoặc sắp làm việc với dữ liệu ảnh :D Nhưng cách lưu ảnh như nào cho hợp lý thì vẫn là những vấn đề mới mẻ và khó nhằn cho những bạn mới làm việc với dữ liệu. Bài viết này mình đưa ra các cách xây dựng dữ liệu sử dụng và truy vấn với hình ảnh đơn giản.
* Có 2 kiểu lưu trữ ảnh riêng biệt đó là 1 ảnh được phục vụ cho một bảng và nhiều bảng.

### Một ảnh chỉ dùng cho một bảng
Việc một ảnh chỉ dùng cho 1 bảng là việc phổ biến và thường xuyên với những hình ảnh riêng viết và đặc trưng như: logo, banner,... Những hình ảnh này được sử dụng nhiều nhưng số lượng lại rất ít và cần tốc độ lấy nhanh.
![](https://images.viblo.asia/35c20abf-3b18-424b-a4dc-15906befc62e.JPG)

Ví dụ trên đây đơn giản là avata của người dùng.
Câu lệnh lấy ảnh chỉ đơn giản như sau :
``` sql
SELECT * FROM avata WHERE user_id = ?
```
* Ưu điểm : dễ sử dụng, thao tác nhanh chóng,...
* Nhược điểm : Bạn chỉ có thể sử dụng 1 ảnh với 1 user.
### Một ảnh chỉ dùng cho nhiều bảng
Có rất nhiều cách để thiết kế và sử dụng cho vấn đề này, ở đây mình đưa ra các cách thiết kế mà mình cho là lựa chọn tốt nhất đối với mọi người.

#### 1. Cách truyền thống
Thiết dữ liệu theo dạng sau.
![](https://images.viblo.asia/22bf6ec7-192e-4337-ae97-a3183a765ada.JPG)
Sql query:

``` sql
# Lấy avata của user có name là 'Tuan'
select * from image where user_id = (select users.id from users where users.name = 'Tuan') and product_id is null
# Đó là cách lấy thông thường của chúng ta. Nhưng cũng có thể viết ngắn gọn hơn bằng cách dùng join
SELECT image.* FROM image	JOIN users on users.id = user_id where users.name = 'Tuan'
#Tương tự ta có thể dùng cho products
```
Kết quả.
![](https://images.viblo.asia/4170bddf-2b91-4eb5-91b8-dbc7efc5fc01.JPG)
* Ưu điểm : Cũng rất dễ dàng xử lý và thao tác.
* Nhược điểm : Nhìn cũng đoán ra được Cách lưu ảnh kiểu này nếu chỉ có 1 2 bảng thì không sao, nhưng nếu có nhiều hoặc rất nhiều bảng dùng đến bảng image thì nó thật sự khủng khiếp khi ta liên tiếp phải thêm các trường **(table)id**.

###### Từ đây chung ta sáng tạo ra một kiểu sau.
#### 2. Cách cải tiến từ truyền thống
Thiết dữ liệu theo dạng sau.
![](https://images.viblo.asia/23945add-dd34-4e20-9daa-f4ce967e577c.JPG)

- Chúng ta có thể nhận thấy thay vì thêm nhiều **(table)_id** thì ta chỉ cần 1 **relation_id** và type để thể hiện nó là hình ảnh của bảng nào.

Sql query:
``` sql
-- Thử join bảng image và users vào xem kết quả thu được ra sao nhé :D
SELECT * FROM images JOIN users ON users.id = relation_id
-- Còn đây là cách chúng ta thao tác để lấy ảnh của người dùng sử dùng type =))
SELECT images.* FROM images
join users on users.id = relation_id
WHERE relation_id = 2 and type = 'user'
```
Kết quả

![](https://images.viblo.asia/f40a068d-1657-4ba2-8296-e2e2e63fd9cf.JPG)
![](https://images.viblo.asia/551fbaf3-8ceb-4635-b586-95677ee1accb.JPG)

* Ưu điểm: Việc sử dụng cách thiết kế này giúp những nhà phát triển có thể dễ dàng mở rộng hệ thống, ngoài ra việc tạo các type giúp cho bạn linh động trong cách thực hiện hành vi của hệ thống.
* Nhược điểm: Như bạn thấy đó ở cách 1 bạn có thể sử dụng hình ảnh từ **users** hoặc **products**. Nhưng đến cách 2 đây lại là nhược điểm năng nề nhất, việc sử dụng kiểu type này đã đã góp phần bắt buộc bạn nếu muốn 1 hình ảnh sử dụng trong nhiều bảng thì cũng đồng nghĩa bạn sẽ phải tạo ra thật nhiều row tương ứng.

###### Từ đây những nhà phát triển tài năng lại sáng tạo ra một cách nữa các bạn có thể tham khảo nhé :D.
#### 3. Liệu những cách sau đây có là giải pháp thực thụ
1. Cổ điểm theo phong cách mở rộng :D
![](https://images.viblo.asia/47f156ce-d503-4ce2-846d-e34dfe41febf.JPG)

- Với việc thêm 1 bảng trung gian **using_images** dễ dàng thấy đây là sự mở rộng của Cách 1 nhưng thay vì phải chỉnh sửa bảng (**alter**) **images** thì ta chỉ cần thêm cột vào bảng trung gian.

2. Cải tiến mở rộng

![](https://images.viblo.asia/b6241b08-810e-46ba-9f05-e9289af511b1.JPG)
Khi bạn sử dụng cách này việc sử dụng using_type có thể giúp bạn tạo nhiều type khác nhau từ những bảng ban đầu. VD:

| id | name |
| -------- | -------- |
| 1 | user |
| 2 | product |
| 3 | user, product |

#### Kết luận.
- Việc bạn sử dụng những phương pháp để lưu trữ ảnh hay file nào thực chất nó không phải là bắt buộc phải làm như nào đối với mọi ứng dụng. Nhưng khi bạn thiết kế một cách thông minh và phù hợp với bài toán được đặt ra thì khi làm việc hết sức tiện lợi và nhanh chóng.
- Ở bài viết trên mình không dám chắc những thiết kế của mình là hoàn toàn tối ưu và hay. Nhưng có một điều là nếu bạn là newbie và chưa có nhiều kinh nghiệm thì cách này sẽ giúp các bạn dễ hiểu hơn về hình thức lưu trữ ảnh cũng như luyện cách truy vấn thật tốt.

Cảm ơn các bạn đã đọc bài viết của mình :D. Mọi ý kiến đóng góp xin vui lòng bình luận bên dưới, mình sẽ tiếp thu và chỉnh sửa nếu có gì sai sót. thank you!