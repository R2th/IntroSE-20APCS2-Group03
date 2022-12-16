Đây là  vấn đề mình gặp trong quá trình làm việc, viết vào đây vừa để note lại cho bản thân, vừa chia sẻ với mọi người.
Có 1 bảng 
users(id, name),  10tr bản ghi
profiles (id, userId, name) 10tr bản ghi.

Yêu cầu đặt ra là lấy tất cả thông tin users, profile của nhưng user có id < 10.

```
select *
from users u join profiles p on u.id = p.userId
where u.id < 10;
```
Ai nhìn cũng bảo dễ, viết là xong ngay, nhưng khi phân tích lại câu query thì thấy có vấn đề về performance. 
Như câu query trên, hệ thống sẽ thực hiện join trước (10tr vs 10tr) rồi thự hiện where để loại bỏ. 
Với dữ liệu nhỏ thì ok, dữ liệu hớn thì sẽ bị chậm.

**Giải pháp:** Sử dụng where để loại bỏ trước, rồi sau đó mới join. 
Dùng where để chỉ lây 10 bản ghi của user rồi join 10tr bản ghi của profiles thì sẽ nhanh hơn.

Ban đầu mình nghĩ hướng này, nhưng sql cú pháp sẽ không cho phép.

```
select *
from users u where u.id < 10 join profiles;
```
Theo như cú pháp sau where 
```
FOR, GROUP, HAVING, INTO, LIMIT, LOCK, ORDER, PROCEDURE, UNION or WINDOW expected, got 'join'
```

Để xử lý vấn đề này chúng ta có thể tạo bảng phụ, lưu kết quả where .

```
with temp_users as (select * from users u where id < 10)
select *
from temp_users tu
         join profiles p
where tu.id = p.userId;
```

Hoặc

```
select *
from (select * from users u where u.id < 10) as tu
         join profiles p on tu.id = p.userId
```

Nếu cần trao đổi, mọi người hãy comment bên dưới.