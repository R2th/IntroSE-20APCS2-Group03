# Scope là gì ?
Scope đơn giản là class method bên trong model , nó luôn luôn trả về một [Active Record Association](https://guides.rubyonrails.org/association_basics.html).<br> 
Ví dụ trong ứng dụng của bạn: Bạn có một database về Car và bạn muốn trả về tất cả các Car có màu đỏ. Chúng ta có thể viết một scope hoặc một class method như sau: 
1. Cả hai scope và class method tạo ra một filter đơn giản trả về tất cả các xe hơi màu đỏ . Trong controller , chúng ta có thể dễ dàng truy vấn tất cả các xe hơi màu đỏ bằng một trong hai cách:
```
#app/models/car.rb

scope :red, -> {where(color: "red")}

def self.red
  where(color: "red")
end

```
Và ở trong Controller 
```
#app/controllers/cars_controller.rb
def index
  @shirts = Car.red 
end
```

2.  Nếu bạn muốn truyền một đối số vào trong scope hoặc class method thì có thể sửa lại trong model như sau:
```
#app/models/car.rb

scope :colored, -> (color) {where(color: color)}

def self.colored(color)
    where(color: color)
end
```
Cả hai scope và class method đều nhận đối số truyền vào và trả về tất cả các xe theo màu của đối số.
Vậy thì sự khác nhau giữa scope và class method là gì ? Chúng ta cùng sang phần tiếp theo và tìm hiểu nhé.

# Sự khác biệt giữa scope và class method
## Scope gọi liên tiếp được
 Cùng xem xét một ví dụ sau. Người dùng có thể lọc Car bằng trạng thái, sắp xếp chúng theo thứ tự cập nhật. Đơn giản với các scope như sau:

```
class Car < ActiveRecord::Base
  scope :by_status, -> status {where status: status }
  scope :recent, -> {order "posts.updated_at DESC"}
end
```

Và chúng ta có thể gọi chúng một cách thoải mái như sau:
```
Post.by_status(""published"").recent
# SELECT "cars".* FROM "cars" WHERE "cars"."status" = 'published'
# ORDER BY cars.updated_at DESC
 ```
hoặc thông qua params
```
Post.by_status(params[:status]).recent
# SELECT "cars".* FROM "cars" WHERE "cars"."status" = 'published'
# ORDER BY cars.updated_at DESC
```
Bây giờ, chúng ta sẽ mô phỏng lại ví dụ trên thông qua class method, đề từ đó có sự so sánh với scope như sau:
```
class Car < ActiveRecord::Base
  class << self
    def by_status status
      where status: status
    end

    def recent
      order "cars.updated_at DESC"
    end
  end
end
```
Cùng xem vấn đề xảy ra của chúng ta là gì khi sử dụng với status là nil hoặc blank?
```
Car.by_status(nil).recent
 SELECT "cars".* FROM "cars" WHERE "cars"."status" IS NULL
   ORDER BY cars.updated_at DESC

Post.by_status('').recent
#SELECT "cars".* FROM "cars" WHERE "cars"."status" = ''
  ORDER BY cars.updated_at DESC
```
Có vẻ ổn, nhưng tôi nghĩ rằng không cho phép việc query dữ liệu với 2 điều kiện trên. Chúng ta thay đổi scope đã định nghĩa bên trên một chút như sau:
```
  scope :by_status, -> status {where status: status if status.present?}
 ```
Thử lại với scope:
```
Post.by_status(nil).recent
# SELECT "cars".* FROM "cars" ORDER BY cars.updated_at DESC

Post.by_status('').recent
# SELECT "cars".* FROM "cars" ORDER BY cars.updated_at DESC
```
Tuyệt vời, mọi thứ vẫn hoạt động tốt. Bây giờ thay đổi class method và thử lại xem sao:
```
class Car < ActiveRecord::Base
  class << self
    def by_status status
      where status: status if status.present?
    end
  end
end
```
Kết quả
```
Post.by_status("").recent
NoMethodError: undefined method `recent' for nil:NilClass
```
Có sự khác nhau ở đây. Scope thì luôn luôn trả về một ActiveRecord Relation, trong khi class method thì không hoạt động. Và để class method hoạt động được, chúng ta thay đổi một chút như sau:
```
  class << self
    def by_status status
      if status.present?
        where status: status
      else
        all
      end
    end
  end
 ```
 Lời khuyên ở đây là: đừng bao giờ trả kết quả về nil với class method nếu không thì bạn đang phá với các điều kiện bao hàm bởi scope, luôn luôn trả về một relation.
 
# Kết luận
Như chúng ta thấy rõ ràng viết bằng scope có nhiều ưu điểm hơn cách viết bằng class method. Tuy nhiên chúng ta không nên quá lạm dụng nó. Quan trọng nhất là sử dụng với đúng mục đích và yêu cầu của công việc.
Thông thường thì nên sử dụng scope khi những logic đơn giản như where/order và sử dụng class method cho những logic phức tạp.
Trên đây là một vài điểm nhỏ khác nhau giữa scope và class methods trong rails, tùy thuộc vào mục đích mà các bạn có thể sử dụng scope hoặc class method.

# Tài liệu tham khảo
https://medium.com/le-wagon/what-are-named-scopes-and-how-to-use-them-rails-5-5a0444d8b759<br> 
https://viblo.asia/p/scope-va-class-method-trong-ruby-on-rails-rEBRAKALG8Zj