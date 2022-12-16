## **N + 1 query ?**

Câu chuyện xảy ra khi chúng ta, những coder viết code chưa khéo, sinh ra nhiều truy vấn vào cơ sở dữ liệu làm giảm performance của hệ thống. Khi đồng nghiệp đọc code thường thì sẽ bình luận ngay: fix N + 1
## **Ví dụ về N + 1**

Giả sử ta có một cơ sở dữ liệu, trong đó table post có khóa ngoại user_id, nói theo kiểu mã giả là một post thuộc về một user

**Thực hiện truy vấn vào cơ sở dữ liệu và lấy tất cả User kèm theo các Post của User đó:**

```Ruby
User.all.each do |user|
  user.posts
end
```
**Các câu lệnh SQL sinh ra như sau**
```Ruby
 User Load (0.2ms)  SELECT "users".* FROM "users"
  
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" = ?  [["user_id", 1]]
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" = ?  [["user_id", 2]]
  Post Load (0.1ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" = ?  [["user_id", 3]]
```
Đối với những hệ thống có số lượng bản ghi lớn (cỡ như phải trả về 1000 user thì chúng ta phải thực hiện 1001 truy vấn) hoặc có database với độ trễ cao (thời gian thực thi truy vấn cao) thì ắt hẳn sẽ làm giảm performance của hệ thống.
  
## **Cách khắc phục**

*Sử dụng joins hoặc select in *

Tối ưu câu lệnh SQL ngay và luôn.
 
 ```Ruby 
User Load (0.2ms)  SELECT "users".* FROM "users"
Post Load (0.4ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" IN (1, 2, 3)
```
**Chúng ta cần 2 truy vấn:**

Truy vấn đầu tiên để load toàn bộ user
Truy vấn thứ 2 để load các post tương ứng với những users đó.

**với  joins  hai bảng được kết hợp với nhau nên luôn có đầy đủ thông tin các trường của mỗi bảng còn select in thì không**
## **joins hoặc select in () trong Rails**
* Sử dụng cách nào để khử N + 1 query thì mỗi framework sẽ có cách khái quát và trình bày riêng, nhưng bản chất thì vẫn là xoay quanh sử dụng select in() hay joins.

* Đã là framework thì đâu có chuyện gõ truy vấn như select from ..., trừ những truy vấn phức tạp quá mới cần tạo select ... thuần rồi exec command.

**Phần này, ta sẽ tìm hiểu giới thiệu với Rails framework, trong Rails có 3 cách khử N + 1 như sau:**

### **preload:**
**Sử dụng select in**
```Ruby
User.preload(:posts)
  User Load (0.3ms)  SELECT "users".* FROM "users"
  Post Load (1.0ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" IN (1, 2, 3, 4, 5, 6, 7, 8, 9)
  ```
###   **Eagerload:**
  **Sử dụng joins**
  ```Ruby
  User.eager_load(:posts)
  SQL (0.7ms)  SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."created_at" AS t0_r2, "users"."updated_at" AS t0_r3, "users"."post_id" AS t0_r4, "posts"."id" AS t1_r0, "posts"."title" AS t1_r1, "posts"."created_at" AS t1_r2, "posts"."updated_at" AS t1_r3, "posts"."user_id" AS t1_r4 FROM "users" LEFT OUTER JOIN "posts" ON "posts"."user_id" = "users"."id"
 => #<ActiveRecord::Relation [#<User id: 1, name: "David", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 1>, #<User id: 2, name: "Gate", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 2>, #<User id: 3, name: "Jack", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 2>, #<User id: 4, name: "David", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 1>, #<User id: 5, name: "Gate", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 2>, #<User id: 6, name: "Jack", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 2>, #<User id: 7, name: "David", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 1>, #<User id: 8, name: "Gate", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 2>, #<User id: 9, name: "Jack", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 2>]> 
 ```
### **Inludes**
**Mặc định thì dùng select in nhưng nếu cần thiết có thể chuyển sang joins**
 * select in
 ```Ruby
 User.includes(:posts)
  User Load (0.3ms)  SELECT "users".* FROM "users"
  Post Load (0.4ms)  SELECT "posts".* FROM "posts" WHERE "posts"."user_id" IN (1, 2, 3, 4, 5, 6, 7, 8, 9)
  ```
  * joins
  ```Ruby
  User.includes(:posts).references(:posts)
  SQL (0.7ms)  SELECT "users"."id" AS t0_r0, "users"."name" AS t0_r1, "users"."created_at" AS t0_r2, "users"."updated_at" AS t0_r3, "users"."post_id" AS t0_r4, "posts"."id" AS t1_r0, "posts"."title" AS t1_r1, "posts"."created_at" AS t1_r2, "posts"."updated_at" AS t1_r3, "posts"."user_id" AS t1_r4 FROM "users" LEFT OUTER JOIN "posts" ON "posts"."user_id" = "users"."id"
 => #<ActiveRecord::Relation [#<User id: 1, name: "David", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 1>, #<User id: 2, name: "Gate", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 2>, #<User id: 3, name: "Jack", created_at: "2018-04-24 11:42:42", updated_at: "2018-04-24 11:42:42", post_id: 2>, #<User id: 4, name: "David", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 1>, #<User id: 5, name: "Gate", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 2>, #<User id: 6, name: "Jack", created_at: "2018-04-24 12:44:37", updated_at: "2018-04-24 12:44:37", post_id: 2>, #<User id: 7, name: "David", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 1>, #<User id: 8, name: "Gate", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 2>, #<User id: 9, name: "Jack", created_at: "2018-04-24 12:44:39", updated_at: "2018-04-24 12:44:39", post_id: 2>]>
 ```
 Hy vọng bài viết giúp ích các bạn