Điều mà tôi thích nhất trong Ruby có lẽ là cách sử dụng ActiveRecord. Cách code và khả năng tái sử dụng của nó vô cùng mạnh mẽ.

Và dưới đây là 5 trick tôi thường sử dụng trong truy vấn

### 1) truy vấn với bảng được liên kết
Gỉa sử bạn có bảng `User` và nó được liên kết với bảng `Profile`
Bạn muốn truy xuất các `User` với điều kiện là `Profile` của nó được `activated`
```rb
# User model
scope :activated, ->{
  joins(:profile).where(profiles: { activated: true })
}
```
Với ví dụ bên trên chúng ta đã có thể trả ra kết quả đúng, đương nhiên có vẻ nó hơi trái với quy tắc tiếp cận của rails: logic của `Profile` đang bị liệt kê trong model `User`. Điều này đi ngược lại với quy tắc đóng gói của hướng đối tượng.
Chúng ta sẽ xem thử cách dưới đây:
```rb
# Profile model
scope :activated, ->{ where(activated: true) }
# User model
scope :activated, ->{ joins(:profile).merge(Profile.activated) }
```
Với cách thứ 2, chúng ta có thể vừa đảm bảo được kết quả và vừa đảm bảo được tính đóng gói riêng biệt.

### 2) join nhiều bảng lồng nhau
Chúng ta có một ví dụ nho nhỏ với 3 bảng `User`, `Profile`, `Skill`
với liên kết `User` has one `Profile` và `Profile` has many `Skill`
Bình thường chúng ta sẽ sử dụng `INNER JOIN` nhưng hãy xem thử trường hợp dưới đây
```rb
User.joins(:profiles).merge(Profile.joins(:skills))
=> SELECT users.* FROM users 
   INNER JOIN profiles    ON profiles.user_id  = users.id
   LEFT OUTER JOIN skills ON skills.profile_id = profiles.id
```
Như bạn đã thấy ở trên đối với `Profile` và `Skill` thì hiện tại không sử dụng `INNER JOIN` mà là `LEFT OUTER JOIN`
vậy chúng ta sẽ xử lý nó bằng cách dưới đây:
```rb
User.joins(profiles: :skills)
=> SELECT users.* FROM users 
   INNER JOIN profiles ON profiles.user_id  = users.id
   INNER JOIN skills   ON skills.profile_id = profiles.id
```
Vậy là chúng ta đã `INNER JOIN` 3 bảng thành công

### 3)NOT EXISTS
ngoài cách sử dụng `where.not` chúng ta có thể sử dụng `NOT EXISTS` để code đẹp hơn
```rb
# Post
scope :famous, ->{ where("view_count > ?", 1_000) }
# User
scope :without_famous_post, ->{
  where(_not_exists(Post.where("posts.user_id = users.id").famous))
}
def self._not_exists(scope)
  "NOT #{_exists(scope)}"
end
def self._exists(scope)
  "EXISTS(#{scope.to_sql})"
end
```

### 4)Subqueries
Chúng ta cần truy vấn các `Post` được viết bởi `User` thì chúng ta thường hay sử dụng lệnh dưới:
```rb
Post.where(user_id: User.created_last_month.pluck(:id))
```
Ở trong câu lệnh `SQL` trên chúng ta sẽ mất đến 2 truy vấn, 1 truy vấn lấy `ID` của `User` và một truy vấn lấy `Post`
Vậy thay vào đó chúng ta có thể viết chung cho 1 truy vấn như dưới đây:
```rb
Post.where(user_id: User.created_last_month)
```
Việc còn lại `ActiveRecord`sẽ sử lý cho bạn =))

### 5)to_sql and explain
ngoài cách sử dụng các câu lệnh hỗ trợ của `ActiveRecord` ra, chúng ta hoàn toàn có thể xem xét nó dưới dạng sql với lệnh `to_sql`
hoặc sử dụng `explain` để xem chi tiết về nó, dự toàn tính phức tập của truy vấn.

## Kết luận:
Trên đây là một số trick nho nhỏ sử dụng trong truy vấn sql, mong rằng sẽ giúp ích các bạn đôi chút

bài dịch gốc: [ActiveRecord’s queries tricks](https://medium.com/rubyinside/active-records-queries-tricks-2546181a98dd)