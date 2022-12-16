(* Trong bài viết này mình chỉ nêu quan điểm và những thứ mình đã từng làm với việc phân quyền trên thực tế, chỉ mang tính tham khảo cho mọi người. Nếu có bất kỳ ý kiến góp ý nào hãy bình luận ở dưới để chúng ta cùng thảo luận thêm.)

Phân quyền công việc mang đầy tính năng nề đối với dev nhưng lại đầy sáng tạo cho người dùng. Như bạn biết khi phần mềm được dựng lên là có vô vàn rắc rối xoay quanh quyền hạn người sử dụng. Vì thế lập trình viên đã tạo ra một thứ mang tên phân quyền để tránh tình trạng mọi người đều là vua trong chương trình đó đơn giản với việc "Bạn được quyền làm việc đó hay không?".
### 1. Phân quyền là gì?
Tưởng tượng đơn giản như này nhé. 

- Bạn là sếp bạn có toàn quyền với nhân viên của mình
- Bạn là trưởng phòng bạn chỉ có quyền với nhân viên trong phòng của mình
- Bạn là trưởng nhóm dự án bạn chỉ có quyền với các thành viên trong nhóm
- Và Nhóm < Phòng < công ty.
- Như vậy bạn có thể thấy trong công ty này có 3 loại quyền hạn và chúng ta cần phân quyền theo nó

### 2. Bạn thường dùng loại phân quyền như thế nào?
- Câu hỏi này mình đặt ra ban đầu là "Có các loại phân quyền nào?" nhưng thật sự việc phân quyền này rất ít được public do nó mang tính chất riêng tư của những dự án. Nên nếu bạn search thì chủ yếu sẽ chỉ tìm được cách tạo tài khoản sử dụng cho user trong các HQTCSDL.
- Ở bài viết này mình sẽ nói về việc phân quyền bằng nhóm quyền (Group) Và đưa ra 1 số cách dựng CSDL (db).

### 3. Phân quyền theo group là gì và làm như thế nào ?
- Phân quyền theo group là cách gọi chung của mình cho việc bạn nhóm nhiều thành viên trong 1 tổ chức có cùng một quyền hạn thực thi công việc. Lúc đó ta có thể nhóm họ vào 1 group để dễ dàng trao quyền hạn.
- Như vậy từ cách phân quyền theo group này ta có thể sử dụng với "3 nấc" khác nhau.

Ví dụ đơn giản về 3 cách này nhé :D

#### 1. Phân quyền theo cấp bậc
- Loại hình này chúng ta thường thiết kế db đơn giản như sau

![](https://images.viblo.asia/690c6a96-a5e7-4b1d-8cd8-8aadbfed64a1.png)

- Khi đó dữ liệu bạn dùng sẽ có dạng như thế này.

![](https://images.viblo.asia/c1331442-a6bf-47ce-b86d-1c3376aba99a.JPG)

- role ở đây là 1, 2, 3 tức là có 3 mức quyền hạn và lớn nhất hay bé nhất còn tùy thuộc vào quy định của mỗi công ty. Ví dụ

![](https://images.viblo.asia/9f1288d3-1321-4ff5-b232-034953f48dfb.JPG)

##### - Ưu điểm
Việc sử dụng kiểu phân quyền này dễ dàng cho những người mới bắt đầu. Những nhóm quyền được lập lên nhanh chóng có thể sử dụng luôn, Và việc phải check cũng tương đối là đơn giản, bạn chỉ cần 1 cần 
````
select count(*) from tbl_... where id = ? and role = ?
hoặc
select role from tbl_... where id = ?
````
Rất dễ dàng để sử dụng đúng không. :D
##### - Nhược điểm
Bạn biết đó việc sử dụng dữ liệu như này tồn tại 1 số nhược điểm rất lớn sau
- Rất khó có thể mở rộng dự án
- Trong thực tế không phải lúc nào cũng có 3 role. Nó có thể phát sinh nhiều role kì dị. Ví dụ: **Thư ký giám đốc ngoài quyền đuổi việc ra còn lại nó sẽ có quyền của giám đốc** vậy trường hợp này thuộc role 1 hay 2 ?.
- Rất khó để phân quyền chi tiết.

#### 2. Phân quyền theo chức năng
![](https://images.viblo.asia/eb3223f9-6be7-46bb-a521-3aa1da110910.JPG)

Loại phân quyền này được sử dụng rất nhiều trong thực tế. Nó rất hiệu quả và dễ thao tác đối với người cấp quyền.

Ta thiết kế db đơn giản trong ví dụ này như sau:
![](https://images.viblo.asia/cea2a0c3-13fd-4d83-a1c4-117b8cd6ce26.JPG)
Nhưng để Demo mình sẽ tóm gọn 2 bảng **tbl_action** và **tbl_per_action** thành bảng **tbl_per_detail** để dễ thao tác. Và ta có một Database như sau.
![](https://images.viblo.asia/c20c2d07-881e-42d1-b4e0-d115970fb174.JPG)

Chi tiết của việc thiết kế DB như sau:

* **tbl_user**: bảng lưu người dùng bao gồm các thuộc tính như ID, Name,.... Bảng không có khóa ngoại.
* **tbl_permision**: bảng chứa nhóm quyền hạn. bao gồm các thuộc tính, ID nhóm quyền hạn, tên nhóm quyền hạn.
* **tbl_permision_detail**: là bảng sẽ chứa những quyền hạn cụ thể dành cho nhóm quyền hạn. Trường **action_name** không cần thiết bạn có thể bỏ. Trường **action_code** là để khi lập trình mình định nghĩa một thao tác nhất định trong bằng code này ví dụ quyền sửa thì code nó là **EDIT** chẳng hạn.
* **tbl_per_relationship**: là bảng lưu mối liên hệ giữa người dùng và nhóm quyền hạn. Mục đích của bảng này không phải là để một người dùng có nhiều nhóm quyền mà để không phải truy vấn lại bảng user chứa thông tin nhạy cảm như username và password. Bạn cũng có thể **bỏ qua** bảng này và liên hệ trực tiếp giữa bảng user và permision luôn, nhưng mình khuyên bạn nên sử dụng thêm bảng này vì có nhiều trường hợp **user có nhiều quyền hạn**.

**1. Kiểm tra dữ liệu trong các bảng**

- **tbl_user**

![](https://images.viblo.asia/63f512f3-d7c4-4c0d-a4cf-abd80928ef0b.JPG)

- **tbl_permision**

![](https://images.viblo.asia/c8333976-4232-43c3-969e-b475d7c0457f.JPG)

- **tbl_per_detail**

![](https://images.viblo.asia/687ddf8d-d84a-4fa7-8f3c-b1bef50848c6.JPG)

- **tbl_user_per**

![](https://images.viblo.asia/8a1dbf23-27f9-4586-a4f7-928423f40974.JPG)

**2. Làm một số ví dụ**

- Kiểm tra quyền của người dùng ví dụ: Hãy kiểm tra quyền của user có id là 1:

``` sql
DECLARE @result NVARCHAR(1000)
SET @result = N'Những quyền hiện tại của user ('

select @result = @result + name_user + ') là: ' from tbl_user where id_user = 1
select @result = @result + action_name + ', ' from tbl_user as u
	join tbl_user_per as up on u.id_user = up.id_user
	join tbl_permision as p on up.id_per = p.id_per
	join tbl_per_detail as pd on p.id_per = pd.id_per
	where u.id_user = 1 and up.licensed = 1 and pd.check_action = 1
select @result = substring(@result, 0, len(@result))

print @result
```
- kết quả


![](https://images.viblo.asia/1f8b488f-ba65-4e04-b345-2fd12b9d0fda.JPG)

- Kiểm tra xem user 2 có quyền xóa bài viết không ?


``` SQL
DECLARE @result bit
select @result = check_action from tbl_user as u
	join tbl_user_per as up on u.id_user = up.id_user
	join tbl_permision as p on up.id_per = p.id_per
	join tbl_per_detail as pd on p.id_per = pd.id_per
	where u.id_user = 2 and up.licensed = 1 and action_code = 'DELETE'

begin
	if @result = 1
		print N'Bạn CÓ quyền xóa post'
	else
		print N'Bạn KHÔNG có quyền xóa post'
end
```
- kết quả

![](https://images.viblo.asia/31425239-b4dd-46ff-8550-f837f027b2fe.JPG)

- Đó là một số ví dụ đơn giản tron tình huống này khi sử dụng phân quyền theo nhóm (group)

**3. Kết luận**
##### - Ưu điểm
- Việc phân quyền này như mình có nêu ngay từ ban đầu rất dễ thao tác đối với những admin khi họ muốn chuyển nhóm quyền hoặc thỏa sức sáng tạo trong việc tạo ra những quyền mới từ những quyền ban đầu. Ví dụ như người dùng vừa có thể **EDIT** và **DELETE**,....
- Ngoài ra việc thực hiện những câu querry cũng rất dễ dàng cho những lập trình viên.
##### - Nhược điểm
- Vấn đề sử dụng quyền hành động rất dễ khi chúng ta làm việc trên 1 group, nhưng nếu trong chương trình của bạn có nhiều group và phân cấp nhiều tầng thì nó lại là một vấn đề nan giải khác, khi bạn không chỉ phải check quyền hành động mà bạn còn phải check xem quyền hành động này của người dùng có thể áp dùng được trong group khác hay không?..
#### 3. Phân quyền theo *Hành động* của các *nhóm Group* theo những *cấp bậc* khác nhau
- Đây là loại phân quyền lằng ngằng nhất nhưng lại là quan trọng nhất, bởi các lý do sau đây:
- Các tổ chức sử dụng phần mềm để thực hiện thao tác của họ đều có phân cấp rõ ràng
- Trong những tổ chức có những người nắm full quyền của nhiều nhóm
- Có những thành viên thuộc nhiều nhóm
- Có những thành viên tuy chỉ là nhân viên nhưng lại có quyền của các sếp (thư ký)
- Chính vì có nhiều trường hợp như vậy những lập trình viên sinh ra được rất nhiều case trong code.

Giải quyết vấn đề này bạn có thể tìm hiểu cách thự hiện phân quyền trong odoo.
- Phân quyền theo model: Có nghĩ là người dùng được thao tác thực hiện với những bảng dữ liệu nào
       
> Ví dụ: Admin có thể thực hiện với thao tác với bảng user của họ
- phân quyền theo raw: Người dùng được thực hiện việc thao tác với các raw được chỉ định


> Ví dụ: Leader A chỉ có thể thực hiện thao tác với những thành viên của mình trong bảng user
- phân quyền theo column: Người dùng sẽ được quyền thao tac với nhưng column đó

> Ví dụ: Chỉ giám đốc mới có thể đuổi việc nhân viên, ở đây ta sẽ có 1 column tên là is_working để biết việc nhân viên đó còn đi làm hay không :D

### 4. Kết luận
- Việc bạn sử dụng cách nào hay thứ tự ra sao tưởng rằng không quan trọng nhưng nếu nhìn xa hơn trong việc mở rộng cũng như update phần mềm thì đó có thể là cực hình cho người sau.
- Nếu bạn được quyền tham gia vào thiết kế database (thường là review và góp ý) thì hãy xem xét đến các vấn đề về việc những trường hợp phát sinh đề phòng những người tạo ra DB thiếu sót.

Loại phân quyền thứ 3 có rất nhiều kiểu biến hóa trong từng phần mềm của từng công ty, Và mình sẽ cố gắng tìm hiểu thêm để viết một bài nói về kiểu này ngoài ra mình cũng sẽ cố gắng viết 1 bài nói về kiểu phân quyền của odoo. Thực chất nó cũng gần giống kiểu phân quyền trong group thôi :D.
Cảm ơn các bạn đã đọc bài viết của mình. Văn phong hơi lủng củng nên mong các bạn thông cảm!.