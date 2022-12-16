Tiếp nối phần 1, hôm nay ta sẽ tìm hiểu các phương thức tiếp theo nhé

### 9. Sắp xếp dữ liệu với *.order*

Phương thức này giúp ta sắp xếp các record theo một thứ tự tăng dần (ASC) hay giảm dần (DESC) theo một hay nhiều trường của model. Mặc định của phương thức này là sắp xếp tăng dần

> Sắp xếp các bài Post theo thứ tự tăng dần của trường **title**
```ruby
Post.order(:title)
# hoặc
Post.order("title")
```

> Một ví dụ thực tiễn, là chúng ta sẽ thường hiển thị các bài Post theo dạng "Bài viết mới nhất", tức là  bài nào tạo sau sẽ được hiển thị lên trước. Lúc này, ta sẽ sắp xếp giảm dần theo thời gian tạo (created_at)
```ruby
Post.order(created_at: :DESC)
# hoặc
Post.order("created_at DESC")
```

Bạn cũng có thể sắp xếp dữ liệu theo nhiều trường khác nhau. Mức độ ưu tiên sẽ dựa vào thứ tự từ trái sang phải (giảm dần)

> Sắp xếp các User tăng dần theo firstName. Nếu firstName trùng nhau, sẽ sắp xếp giảm dần theo lastName
```ruby
User.order(firstName: :ASC, lastName: :DESC)
# hoặc
User.order("firstName ASC, lastName DESC")
# hoặc
User.order("firstName ASC", "lastName DESC")
```

### 10. Chọn (Select) một trường nào đó với *.select* và *.pluck*

Với phương thức này, ta sẽ có thể lấy ra các bản ghi, nhưng chỉ lấy các trường được quy định, không lấy hết toàn bộ các trường

> Lấy ra firstName và lastName của các User
```ruby
### > SỬ DỤNG .select
User.select(:firstName, :lastName)
# ----------------------------
### > SỬ DỤNG .pluck
User.pluck(:firstName, :lastName)
```

Như vậy, ta có thể thấy, hai phương thức này có cấu trúc giống nhau. Tuy nhiên, có 2 điểm khác biệt chính ở đây là:   

> 1. Về kết quả trả về
- ***.select*** : sẽ trả về một  ActiveRecord Object
- ***.pluck*** : sẽ trả về một Array (mảng) 

Với tiêu chí này, ta thấy ***.pluck*** có hiệu suất tốt hơn khi phải thao tác với dữ liệu lớn. Ngoài ra, câu lệnh ***.pluck*** có thể được biểu diễn thông qua câu lệnh ***.select*** như sau:
```ruby
# Câu lệnh với .pluck
User.pluck(:firstName, :lastName)
# ----------------------------
# Tương đương với câu lệnh .select là:
User.select(:firstName, :lastName).map {|u| [u.firstName, u.lastName]}
```


> 2. Về việc ghi đè một trường bằng một phương thức
- ***.select***: chấp nhận ghi đè
- ***.pluck***: không chấp nhận ghi đè   

Để dễ hiểu, ta xét ví dụ sau
```ruby
# Ta định nghĩa phương thức email để ghi đè lên trường email của model User
class User < ApplicationRecord
    def email
        "My is email is #{super}"
    end
end
```
Bây giờ, ta dùng ***.select*** và ***.pluck*** để lấy trường email của model User và so sánh
```ruby
# Dùng .pluck
User.pluck(:email)
# => ["email_1@gmail.com", "email_2@gmail.com"]
# Dùng .select
User.select(:email).map {|u| u.email}
# => ["My email is email_1@gmail.com", "My email is email_2@gmail.com"]
```
Như vậy, phương thức ***.select*** đã chấp nhận ghi đè phương thức email nên khi trả về kết quả, đã có thêm "My email is" ở trước mỗi email

### 11. Kiểm tra dữ liệu đã tồn tại hay chưa với ***.exists?***

> Ví dụ thực tiễn với phương thức này, đó là khi xây dựng tính năng đăng nhập bằng email. Mỗi email chỉ sử dụng cho một tài khoản (user). Do đó, khi có một user muốn tạo mới một tài khoản nào đó, ta phải kiểm tra xem email của user đó đã tồn tại hay chưa. Giả sử email cần kiểm tra là "user_email@gmail.com", ta có thể dùng lệnh
```ruby
User.exists?(email: "user_email@gmail.com")
```

Phương thức này sẽ trả về ***true*** nếu dữ liệu đã tồn tại trong model. Ngược lại, trả về ***false***

Ta cũng có thể truyền 1 mảng các tham số cho phương thức này. Lúc này, phương thức trả về kết quả ***true*** nếu tìm thấy 1 trong các tham số. Nếu không tìm thấy bất kì tham số nào, sẽ trả về ***false***
```ruby
User.exists?(email: ["user_email@gmail.com", "user_2_email@gmail.com"])
```

### 13. Lấy dữ liệu khác nhau của một trường với *.distinct* hoặc *.uniq*

Hai phương thức này được sử dụng khi chúng ta muốn lọc ra các giá trị là duy nhất, không bị trùng lặp với nhau

> Lấy ra các firstName khác nhau trong bảng User
```ruby
User.select(:firstName).distinct
# hoặc
User.select(:firstName).uniq
```

Tuy nhiên, ta sẽ có 2 lưu ý ở đây:

- ***.distinct*** sẽ trả về là một ActiveRecord Object, còn ***.uniq*** sẽ trả về một Array
- Từ phiên bản Rails 5.1 trở đi, ***.uniq*** sẽ không còn được hỗ trợ

### 14. Tính tổng giá trị  với *.sum*

> Tính tổng số tuổi của các User hiện có
```ruby
sum_age = User.sum(:age)
```

### 15. Tính trung bình cộng các giá trị với *.average*
> Tính trung bình cộng số tuổi của các User
```ruby
avg_age = User.average(:age)
```

### 16. Lấy giá trị lớn nhất, nhỏ nhất với *.maximum* và *.minimum*
> Tính tuổi lớn nhất và nhỏ nhất của các User
```ruby
max_age = User.maximum(:age)
min_age = User.minimum(:age)
```

Ta sẽ tạm dừng phần 2 tại đây!!! :) Hẹn gặp lại ở phần 3!!! Thanks for reading!!!