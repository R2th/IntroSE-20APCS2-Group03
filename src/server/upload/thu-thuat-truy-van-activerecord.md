Phần yêu thích của tôi trong Rails rõ ràng là scope ActiveRecord. Tính thể hiện (expressiveness) và khả năng tái sử dụng (reusability) của nó thật tuyệt vời.

Dưới đây là một vài thủ thuật mà tôi thường sử dụng. Hãy cùng xem chi tiết các thử thuật này: 

# 1. Join query với điều kiện trên các bảng quan hệ
Giả sử chúng ta bảng `users` với một liên kết tới `profile`.

Nếu bạn cần truy vấn user nào có profile được xác thực, bạn có thể sẽ làm:
```Ruby
# app/models/user.rb 

scope :activated, ->{
  joins(:profile).where(profiles: { activated: true })
}
```

Dường như ở đây chúng ta có một cách tiếp cận sai lầm. Profile logic hiện tại đang bị xuất hiện trong model User. Điều này trái ngược với nguyên tắc đóng gói theo hướng đổi tượng. Bạn có nhận ra vấn đề này?

Hãy thử với cách này xem sao:

```Ruby
# app/models/profile.rb

scope :activated, ->{ where(activated: true) }
```

```Ruby
# app/models.user.rb

scope :activated, ->{ joins(:profile).merge(Profile.activated) }
```

Bằng cách này, chúng ta có thể đảm bảo rằng concerns và logic là tách biệt với nhau. 
# 2. Sử dụng các loại nested join khác nhau
Hãy cẩn thận với cách các bạn sử dụng joins trong ActiveRecord. 

Giả sử như trên chúng ta có như sau:

```Ruby
# app/models/user.rb

class User < ApplicationRecord
  has_one :profile
end

# app/models/profile.rb

class Profile < ApplicationRecord
  has_many :skills
end

# app/models/skill.rb

class Skill < ApplicationRecord
  ...
end
```

Mặc định nó sẽ sử dụng `INNER JOIN` tuy nhiên: 

```
User.joins(:profiles).merge(Profile.joins(:skills))
=> SELECT users.* FROM users 
   INNER JOIN profiles    ON profiles.user_id  = users.id
   LEFT OUTER JOIN skills ON skills.profile_id = profiles.id
```   
 
 Vì vậy bạn nên sử dụng:
 
 ```
User.joins(profiles: :skills)
=> SELECT users.* FROM users 
   INNER JOIN profiles ON profiles.user_id  = users.id
   INNER JOIN skills   ON skills.profile_id = profiles.id
```

# 3. Exist query
Giả sử bạn cần lấy ra `user` mà không `có post` nổi tiếng nào được liên kết và bạn hướng tới truy vấn **NOT EXISTS**. Bạn có thể viết nó một cách dễ dàng với các phương thức tiện lợi bên dưới.

```Ruby
# app/models/post.rb

class Post < ApplicationRecord
  scope :famous, ->{ where("view_count > ?", 1_000) }
end
```

```Ruby
# app/models/user.rb

class User < ApplicationRecord
  scope :without_famous_post, ->{
    where(_not_exists(Post.where("posts.user_id = users.id").famous))
  }
  
  class < self
    def _not_exists(scope)
      "NOT #{_exists(scope)}"
    end
    
    def _exists(scope)
      "EXISTS(#{scope.to_sql})"
    end
  end
end
```

Bạn có thể làm một mẫu tương tự với EXITS
# 4. Subqueries
Giả sử bạn cần lấy các bài `post` của một nhóm nhỏ `user`

Tôi đã thấy rất nhiều developer làm dụng `pluck` theo cách này

```Ruby
Post.where(user_id: User.created_last_month.pluck(:id))
```

Lỗ hổng ở đây là hai truy vấn SQL sẽ được chạy: một truy vấn tìm nạp các id của `user`, một truy vấn khác để lấy các `post` từ các user_ids này.

Bạn có thể đạt được kết quả tương tự với một truy vấn chứa truy vấn phụ (subquery):
```Ruby
  Post.where(user_id: User.created_last_month)
```

Việc này ActiveRecord có thể xử lí thay cho bạn
# 5. Trở lại vấn đề cơ bản
Đừng quên rằng truy vấn ActiveRecord có thể được nối thêm với .to_sql để tạo chuỗi SQL và bằng .explain để lấy chi tiết, ước tính phức tạp, v.v ...

Tuy nhiên có một số method của ActiveRecord không tương tắc vs to_sql ví dụ như: delete, delete_all ...
# 6. Booleans
Tôi đoán rằng rất nhiều bạn mong muốn khi sử dụng 
```Ruby
User.where.not(tall: true)
```

sẽ được generate thành 
```
=> SELECT users.* FROM users WHERE users.tall <> 't'  # đối với postgres version
```

Câu truy vấn trên sẽ trả về tất cả `user` có trường `tall` được set là `false`, nhưng không trả về các `user` có trường `tall` bị NULL. 

Để làm được điều đó chúng ta cần phải điều chỉnh lại một chút như sau:
```Ruby 
User.where("users.tall IS NOT TRUE")
```

Hoặc là
```Ruby
User.where(tall: [false, nil])
```

Cảm ơn các bạn đã theo dõi. Bài viết này được dịch từ [ActiveRecord query tricks](https://medium.com/rubyinside/active-records-queries-tricks-2546181a98dd)