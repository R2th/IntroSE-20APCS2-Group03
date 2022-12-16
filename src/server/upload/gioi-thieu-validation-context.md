## 1. Đặt vấn đề
Khi tiến hành validate trong dự án, chắc hẳn mọi người đã từng gặp những trường hợp mà mình `chỉ áp dụng validate chỉ cho trường hợp cụ thể ` nào đó rồi đúng ko nhỉ. 

Ví dụ như:  Chức năng migrate data User từ file csv

Ta muốn validate thêm format của của field date_of_birth (mình tạm đặt tên validate đó là `format_dob`) khi migrate data tránh trường hợp date_of_birth bị sai format, vì data import dưới dạng csv  có thể bị sai. 

Còn khi ta thao tác tạo User từ form trên hệ thống thì chúng ta sử dụng các thư viện datetime rồi và nó cũng khá là mạnh nên ko cần validate này.

## 2. Giải quyết
Có thể cách giải quyết nhanh nhất mà bạn dùng có phải là:
``` Ruby
class User < ActiveRecord::Base
  attr_accessor: :is_migrating
  
  validate :format_dob, if: Proc.new{|u| u.is_migrating?}
end
```

``` Ruby
class MigrateData::ImportUsersService
  def initialize **args
    #do something
  end
  
  def import
    #do something
    # Note: Ở đây mình chỉ ví dụ phần xử lý đoạn lưu giữ liệu 1 user từ file csv thôi nhé
    @user = # Get data from file
    
    @user.is_migarting = true
    @user.save
 
    #do something
  end
end
```

Hoặc có thể gọn hơn chút nữa như thế này
``` Ruby
class User < ActiveRecord::Base
  attr_accessor: :is_migrating
  
  validate :format_dob, if: {is_migrating?}
end
```

Với 2 cách trên nó vẫn sẽ họat động tuy nhiên mình muốn giới thiệu đến các bạn cách khác có thể rút gọn hơn và ko cần sử dụng đến `attr_accessor` nữa. Đó là sử dụng `Validate context` như sau:

``` Ruby
class User < ActiveRecord::Base
  validate :format_dob, on: :is_migrating
end
```

``` Ruby
class MigrateData::ImportUsersService
  def initialize **args
    #do something
  end
  
  def import
    #do something
    # Note: Ở đây mình chỉ ví dụ phần xử lý đoạn lưu giữ liệu 1 user từ file csv thôi nhé
    user = # Get data from file
    
    user.save(context: :is_migrating)
 
    #do something
  end
end
```

`Note:` Nếu chỉ muốn kiểm tra validate mà mà không lưu các đối tượng bạn có thể sử dụng:
``` Ruby
user = # Get data from file
user.valid?(:is_migrating)
```

## 3. Chú ý
Điểm yếu của việc sử dụng context validate là chỉ NÊN áp dụng cho trường hợp cụ thể ví dụ như:
+ Validate cho trường hợp migrate
+ Validate cho từng role riêng biệt: user, admin...

Bởi vì mỗi lần validate nó chỉ thực hiện 1 context `on` mà thôi ví dụ:
``` Ruby
class User < ActiveRecord::Base
  validate :format_dob, on: :is_migrating
  validate :validate_something, on: :create
end
```
Ở đây ta có 2 validate context `format_dob` và `validate_something`.

Thì khi bạn chạy `user.valid?(:is_migrating)` hoặc `user.save(context: is_migrating)` thì validate `validate_something` sẽ không hoạt động. 

Mốn 2 validate context `format_dob` và `validate_something` cùng hoạt động chúng ta xử lý như sau:
``` Ruby
@user.valid?(:is_migrating) && @user.valid?(:create)
```

`Note:` Như các bạn thấy, nếu mà 2 context trở lên thì code của chúng ta bắt đầu nhìn rối rối lại rồi đúng ko nào

## 4. Kết luận
Trên đây mình trình bày sơ lượt về cách sử dụng validate context. Hi vọng nó giúp ích được cho các bạn. 

Cảm ơn mn đã theo dõi !