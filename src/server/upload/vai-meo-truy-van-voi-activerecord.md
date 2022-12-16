Một trong những phần yêu thích của tôi trong Rails đó là ActiveRecord scopes. Tính biểu cảm và khả năng tái sử dụng của nó đơn giản là tuyệt vời.

Dưới đây là năm mẹo tôi thường dùng trong các dự án của mình.


-----

### 1) Join query với điều kiện trên bảng được liên kết
Giả sử chúng ta có bảng ***users***, với một ***profiles*** association.

Nếu muốn lấy tất cả ***user*** mà ***profiles*** đã được xác thực, bạn có thể sẽ làm như sau:
```
# User model
scope :activated, ->{
  joins(:profile).where(profiles: { activated: true })
}
```
Đây là một cách tiếp cận sai lầm: logic của ***Profile*** hiện đang bị rò rỉ bên trong ***User*** model. Điều này là trái với các quy tắc đóng gói hướng đối tượng.

Tôi sẽ đề nghị cách tiếp cận sau:
```
# Profile model
scope :activated, ->{ where(activated: true) }

# User model
scope :activated, ->{ joins(:profile).merge(Profile.activated) }
```
Với cách thiết lập này, chúng ta giữ logic của các model riêng biệt ra với nhau.
### 2) Sự khác nhau của nested joins
Hãy cẩn thận về cách bạn sử dụng ***joins*** trong ActiveRecord, giả sử ***User*** có một ***Profile*** và ***Profile*** có nhiều ***Skill***. Theo mặc định, nó sử dụng ***INNER JOIN*** nhưng…
```
User.joins(:profiles).merge(Profile.joins(:skills))
=> SELECT users.* FROM users 
   INNER JOIN profiles    ON profiles.user_id  = users.id
   LEFT OUTER JOIN skills ON skills.profile_id = profiles.id

# Bạn nên dùng như thế này:

User.joins(profiles: :skills)
=> SELECT users.* FROM users 
   INNER JOIN profiles ON profiles.user_id  = users.id
   INNER JOIN skills   ON skills.profile_id = profiles.id
```
### 3) Exist query
Giả sử bạn muốn lấy tất cả ***user*** mà không có bài ***post*** nổi tiếng nào (với posts associated với users) và bạn hướng tới truy vấn ***NOT EXISTS***. Chúng ta có thể viết nó một cách tao nhã với các phương thức tiện lợi như bên dưới.
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
Bạn có thể thực hiện tương tự với ***EXISTS***
### 4) Subqueries
Giả sử bạn cần lấy ra các bài ***post*** được viết bởi một nhóm nhỏ ***user***.

Tôi đã thấy những người lạm dụng ***pluck*** theo cách này.
```
Post.where(user_id: User.created_last_month.pluck(:id))
```
Lỗ hổng ở đây là hai truy vấn SQL sẽ được chạy: một truy vấn sẽ fetch các id của ***user***, một truy vấn khác để lấy các bài ***post*** từ các user_ids này.

Bạn có thể đạt được kết quả tương tự với một truy vấn chứa ***subquery***:
```
Post.where(user_id: User.created_last_month)
```
ActiveRecord sẽ xử lý nó cho chúng ta
### 5) Back to basics
Đừng quên truy vấn ActiveRecord có thể được nối thêm với ***.tosql*** để tạo chuỗi SQL và bằng ***.explain*** để lấy chi tiết, ước tính phức tạp, v.v ...
### 6) Booleans
Tôi đoán bạn sẽ nghĩ là `User.where.not(tall: true)` để tạo ra `SELECT users.* FROM users WHERE users.tall != TRUE`

Nó sẽ trả về ***users*** với tall được set là *false* nhưng lại không trả về với tall được set là *NULL*.

Bạn sẽ phải viết là: `User.where("users.tall IS NOT TRUE")` hoặc `User.where(tall: [false, nil])` để có được kết quả như mong đợi.

-----

Hy vọng bạn sẽ thích bài viết này và thấy nó bổ ích.