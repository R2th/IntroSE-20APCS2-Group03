# 1 Giới thiệu
Authentication (Xác thực) sẽ cho bạn biết về danh tính của người dùng, còn Authorization (Ủy quyền) sẽ quyết định họ có quyền làm gì. Trong Spring Security, ở một bên chúng ta có mục tiêu cho phép ủy quyền, cái gì cần được bảo vệ: Phương thức, Giao diện, và Các tài nguyên web. Và đồng thời, cách chúng được bảo vệ: qua các tầng ủy quyền, vai trò (role), và ACL.   
## 1.1 Mục tiêu cho phép ủy quyền
* Phương thức: Chúng ta cần bảo vệ các phương thức API khỏi những người không được phép truy cập. 
* Giao diện: Người dùng bình thường không nên thấy đường dẫn tới bảng quản lý của Admin, và những nội dung mà người dùng không được phép thấy.
* Các tài nguyên Web: Chúng ta có quyền cho phép hoặc từ chối các yêu cầu HTTP khác nhau dựa trên các URL và phương thức HTTP được liên kết. 

## 1.2 Các mô hình ủy quyền
* Ủy quyền dựa vào Xác thực (Authentication), Vai trò (Role), và Quyền (Permission): Đây là những mô hình dựa vào những cấp độ xác thực để cho phép, từ ẩn danh, đến được ghi nhớ (qua cookies,...) đến hoàn toàn xác thực. Điều khiển truy cập trên cơ sở vai trò (RBAC - Role-based access control) thường là mô hình ủy quyền mặc định của Spring Security. 
* Ủy quyền dựa vào ACL: ACL sẽ kiểm soát Domain Object dựa trên quyền truy cập của từng người dựa trên những Domain Object đó. Nói đơn giản là, tôi có quyền xem tin nhắn của tôi và không phải của bạn. 

# 2 Khi nào cần dùng tới ACL
Thông thường, Spring Security sẽ dùng mặc định RBAC. 
![](https://images.viblo.asia/924e9823-8f80-4534-91d9-235c8e1eb81f.png)

RBAC sẽ giải quyết vấn đề như "Liệu User1 có quyền được chỉnh sửa Tin Nhắn nói chung không?", nhưng vấn đề sẽ nổi lên khi vấn đề riêng tư cần phải đảm bảo, người dùng cần có khả năng truy cập vào tin nhắn này nhưng không được truy cập vào tin nhắn kia. ACL có thể giải quyết vấn đề đó và trả lời câu hỏi "Liệu User1 có quyền chỉnh sửa Tin Nhắn 123 không?". Để hiệu quả, chúng ta có thể sử dụng cả RBAC lẫn ACL, đầu tiên, cho phép một nhóm các user, và dùng ACL để cho phép hoặc từ chối một user trong nhóm đó. Ví dụ, một user có vai trò Admin có thể Đọc (READ) và Chỉnh sửa (WRITE) tất cả các Tin Nhắn, nhưng người dùng bình thường chỉ có quyền đọc tin nhắn và không có quyền chỉnh sửa. Trong khi đó người dùng có quyền Moderator có quyền chỉnh sửa Tin nhắn. 

![](https://images.viblo.asia/b720822f-aa43-45cc-9460-bb63f766e78c.PNG)

# 3 ACL
## 3.1 ACL Database
![](https://images.viblo.asia/c1210b20-abb5-42ec-bb33-6a77fe13637d.PNG)
Bản chất của ACL là: {Subject} có thể {Action} tới {Object}. Để sử dụng Spring Security ACL, chúng ta cần tạo 4 bảng. 
* Bảng *ACL_CLASS* chứa thông tin Domain Object. Ví dụ: com.maurofokker.security.acl.model.Possession
* Bảng *ACL_SID* chứa thông tin người dùng hoặc một nhóm người dùng. 
* Bảng *ACL_OBJECT_IDENTITY* sẽ chứa thông tin của từng Domain Object một. 
* Bảng *ACL_ENTRY* sẽ lưu từng quyền tương ứng với từng SID đối với một Object Identity. 

## 3.2 Trường hợp ví dụ
Để dễ tưởng tượng hơn, trong trường hợp này, chúng ta sẽ có 2 user(user1, user2) và một ROLE_ADMIN. Nên bảng *acl_sid* sẽ trông như thế này: 
```
INSERT INTO acl_sid (id, principal, sid) VALUES
(1, 1, 'user1@mail.com'),
(2, 1, 'user2@mail.com'),
(3, 0, 'ROLE_ADMIN');
```
![](https://images.viblo.asia/c4b58946-9572-4b15-b594-c3c64be7785e.PNG)
Bảng *acl_sid* sẽ thể hiện Actor, nó có thể là một user, hay một nhóm user. Spring Security sẽ check giá trị principal, principal = 1 là một user, princial = 0 là một nhóm user mà mình tùy chỉnh ủy quyền, có thể là Vai trò (Role), hay Quyền (Permission), hay là một nhóm user (User Group). 

Vì trong hoàn cảnh này, chúng ta sẽ áp dụng phân quyền với Possession, nên chúng ta phải khai báo nó trong bảng *acl_class* :
```
INSERT INTO acl_class (id, class) VALUES 
(1, 'com.maurofokker.security.acl.model.Possession');
```
Chúng ta sẽ có 3 Possession: 
* User1 Possession: User1 là người tạo, sẽ sở hữu quyền Admin. 
* User2 Possession: User2 là người tạo, sẽ sở hữu quyền Admin. 
* Common Possession: User1 là người tạo, có quyền Admin. User1 cho User2 quyền Đọc (READ), nhưng không cho quyền chỉnh sửa. 
```
-- Tạo thông tin Possession
INSERT INTO Possession (id, name, owner_id) VALUES
(1, 'User1 Possession', 1),
(2, 'Common Possesion', 1),
(3, 'User2 Possession', 2);

-- Tạo thông tinh của từng Possession
INSERT INTO acl_object_identity (id, object_id_class, object_id_identity, parent_object, owner_sid, entries_inheriting) VALUES
(1, 1, 1, NULL, 1, 1), -- User1 Possession object identity
(2, 1, 2, NULL, 1, 1), -- Common Possession object identity
(3, 1, 3, NULL, 2, 1); -- User2 Possession object identity

-- Cấp các quyền cho từng Possession
INSERT INTO acl_entry (id, acl_object_identity, ace_order, sid, mask, granting, audit_success, audit_failure) VALUES
(1, 1, 0, 1, 16, 1, 0, 0), -- user1@mail.com has Admin permission for User1 Possession 
(2, 2, 0, 1, 16, 1, 0, 0), -- user1@mail.com has Admin permission for Common Possession (1)
(3, 2, 1, 2, 1, 1, 0, 0),  -- user2@mail.com has Read permission for Common Possession  (2)
(4, 3, 0, 2, 16, 1, 0, 0); -- user2@mail.com has Admin permission for User2 Possession 
```

Ở đây, từng hàng trong *acl_entry* sẽ được gọi là ACE. Từng ACE bao gồm thông tin một SID, một OID, một quyền, và cho phép hoặc không. Một danh sách các ACE sẽ tạo thành ACL của một OID. Trong câu lệnh (1): 
```
INSERT INTO acl_entry (id, acl_object_identity, ace_order, sid, mask, granting, audit_success, audit_failure) VALUES
(2, 2, 0, 1, 16, 1, 0, 0), -- user1@mail.com has Admin permission for Common Possession (1)
```
OID số 2 là chỉ tới Common Possession được nối với bảng *acl_object_identity*. Đây là ACE đầu tiên trong ACL của OID. SID là user 1 được nối với bảng *acl_sid*. Quyền số 16 tương ứng với quyền ADMIN. Trong BasePermission class của Spring Security có sẵn 5 quyền mặc định. Spring Security có thể hỗ trợ tới 32 quyền tất cả: 5 quyền mặc định và 27 quyền tự chỉnh. 
| Quyền | Số | Ghi chú |
| -------- | -------- | -------- |
| READ     | 1     |      |
| WRITE     | 2     |      |
| CREATE    | 4     |      |
| DELETE    | 8     |      |
| ADMINISTRATION    | 16     | Cho phép principal có quyền điều chỉnh toàn bộ ACL của Object      |
Vậy nên trong câu lệnh số (2): 
```
INSERT INTO acl_entry (id, acl_object_identity, ace_order, sid, mask, granting, audit_success, audit_failure) VALUES
(3, 2, 1, 2, 1, 1, 0, 0),  -- user2@mail.com has Read permission for Common Possession  (2)
```
OID vẫn là Common Possession, ACE thứ 2 của ACL, SID được gán cho user2. Quyền số 1 tương ứng với quyền Đọc (READ). 
Gộp lại chúng ta sẽ có ACL của Common Possession, user1 có quyền Admin, user 2 chỉ có quyền Đọc.

## 3.3 Minh họa
### Đăng nhập với tư cách User1
![User1 có thể truy cập tới User1 Possession](https://images.viblo.asia/16ae3e9f-dbed-4874-bbd6-538cf8b273a2.PNG)
User1 có thể truy cập tới User1 Possession.
![](https://images.viblo.asia/d2bdc42a-0418-48b2-aadb-ad054212eb57.PNG)
User1 có thể truy cạp tới Common Possesion.
![](https://images.viblo.asia/9916eeb1-195f-4877-abab-e64b11e1a30b.PNG)
User1 không thể tìm được User2 Possesion.

# 4 Cấu hình project: 
Source Code cho minh họa trên ở [Github](https://github.com/npthao1312/spring-security-acl-demo). Mình sử dụng MySQL, nên các bạn nhớ vào cài lại cấu hình MySQL theo đúng cấu hình MySQL máy bạn ở file 
```
src/main/resources/application.properties
```

# 5 References
* Willie Wheeler and Joshua White. 2013. Spring in Practice (1st. ed.). Manning Publications Co., USA.
* baeldung, Introduction to Spring Security ACL, <https://www.baeldung.com/spring-security-acl>