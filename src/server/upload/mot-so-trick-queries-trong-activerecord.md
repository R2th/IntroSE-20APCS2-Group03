## 1. Join query with condition on the associated table

Ví dụ bạn đang có bảng `users`, liên kết với `profile`
Nếu bạn muốn query user mà `profile` đang hoạt động:
```
# User model
scope :activated, ->{
  joins(:profile).where(profiles: { activated: true })
}
``` 

Tôi thấy đây là cách hiểu sai theo hướng tiếp cận: logic của `Profile` bây giờ lại nằm bên trong của `User model`. Việc này đi ngược lại với `Object Oriented encapsulation`

Tôi muốn gợi ý  cách viết như sau:

```
# Profile model
scope :activated, ->{ where(activated: true) }
# User model
scope :activated, ->{ joins(:profile).merge(Profile.activated) }
```

Với setup trên, bạn có thể tách riêng được phần `concern` và `logic`.

## 2. Different nested joins

Nên cẩn thận với cách dùng `joins` trong `ActiveRecord`, bạn có `User` có một `Profile`, và `Profile` có nhiều `Skills`:
Nêu theo mặc định, bạn sẽ sử dụng `INNER JOIN` như sau: 
 
 ```
 User.joins(:profiles).merge(Profile.joins(:skills))
=> SELECT users.* FROM users 
   INNER JOIN profiles    ON profiles.user_id  = users.id
   LEFT OUTER JOIN skills ON skills.profile_id = profiles.id
 ```
 
 Bạn có thể refactor lại như sau:
 ```
 # So you'd rather use:
User.joins(profiles: :skills)
=> SELECT users.* FROM users 
   INNER JOIN profiles ON profiles.user_id  = users.id
   INNER JOIN skills   ON skills.profile_id = profiles.id
```

`ActiveRecord` sẽ làm nốt phần việc của bạn (y)

## 3. Exist query
 Giả sử bạn cần lấy các `users` không có bài `posts` nổi tiếng nào được liên kết, bạn sẽ sử dụng `NOT EXITS` query. Bạn có thể viết nó đơn giản hơn theo concept sau: 
 ```
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

## 4. Subqueries

Ví dụ như bạn muốn tổng hợp các bài `posts` được viết bởi một số `users`. Tôi đã thấy một vài người lạm dụng `pluck` theo cách này:

```
Post.where(user_id: User.created_last_month.pluck(:id))
```

Sai sót ở đây là sẽ có 2 queries SQL được chạy ở đây là: một để `fetch` các `ids` của `users`, cái khác để lấy là các bài `post` từ mảng các `user_ids`
Bạn có thể hoàn thành với cùng một kết quả cũng với một `query` có chứa `subquery`:

```
Post.where(user_id: User.created_last_month)
```



## 5. Back to basics

Bạn đừng quên rằng, `ActiveRecord` queries có thể được nối với `.to_sql` để tạo ra câu lệnh `SQL string` và `.explain` để lấy chi tiết, ước tính phức tạp

## 6. Booleans

Tôi đoán rằng, bạn luôn kỳ vọng `User.where.not(tall: true)` để tạo ra `SELECT users.* FROM users WHERE users.tall <> 't'` (postgres version)
Nó sẽ return các `users` mà `tall` là `false` nhưng còn `tall` là `NULL` thì sao?
Bạn nên viết là :

```
User.where("users.tall IS NOT TRUE")
# hoac
User.where(tall: [false, nil])
```

## Summary
Trên đây là một số trick khi trong khi sử dụng `ActiveRecord`, hi vọng sẽ giúp ích được cho các lập trình viên Ruby on Rails
Link bài viết: https://medium.com/rubyinside/active-records-queries-tricks-2546181a98dd