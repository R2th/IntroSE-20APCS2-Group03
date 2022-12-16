### Nguyên Lý DRY: Don't Repeat Yourself
* Don't Repeat Yourself hay DRY là một nguyên lý cơ bản nhất của lập trình được đưa ra nhằm mục đích hạn chế tối thiểu việc viết các đoạn code lặp đi lặp lại nhiều lần chỉ để thực hiện các công việc giống nhau trong ứng dụng.

* Nguyên lý này được nhắc tới lần đầu trong cuốn sách The Pragmatic Programmer viết bởi Andy Hunt và Dave Thomas. Dennis Ritchie (tác giả của The C Programming Language) cũng tham gia vào việc cùng soạn thảo cuốn sách này.

* Nguyên lý DRY là thứ mà tất cả chúng ta có thể hiểu về cơ bản là chất lượng “code tốt”. Có thể một nửa lịch sử của kỹ thuật máy tính đã đi vào hỗ trợ nguyên tắc này, nhưng nó vẫn phải thực hành và sử dụng nó một cách hiệu quả.

### Giải pháp trong Rails: Extract into Modules
Đầu tiên mình xin giới thiệu với các bạn 1 giải pháp rất hay dùng trong Rails đó là tách ra thành các module.

Ruby modules được thiết kế để tập trung các đoạn code logic của các lớp và việc sử dụng chúng có thể là cách đơn giản nhất để xử lý đoạn code của bạn. Một module cơ bản giống như một lớp trong Ruby, ngoại trừ việc nó không thể khởi tạo được, và nó sẽ được đưa vào bên trong các lớp hoặc module khác. Khi một lớp include một module thông qua tên module  thì tất cả các methods trên module trở thành các instance methods trên class đó. Chúng ta cũng có thể biến các method trong module thành các class method bằng các `extend ModuleName`.

Cùng đi vào ví dụ cụ thể nhé!

```
class Car < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    
    def turn new_direction
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        self.speed = speed + 10
    end
end

class Bicycle < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    
    def turn new_direction
        self.direction = new_direction
    end
    def brake
        self.speed = 0
    end
    def accelerate
        self.speed = speed + 10
    end
end
```
Ở đây chúng ta có 2 lớp Car và Bicycle có các method giống hệt nhau. Rõ ràng là đoạn code này không DRY. Chúng ta sẽ xử lý bằng cách tách nó ra thành module rồi include vào trong 2 class trên.
```
# lib/drivable.rb
module Drivable
    def turn new_direction
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        self.speed = speed + 10
    end
end

class Car < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    include Drivable
end

class Bicycle < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    include Drivable
end
```
Đoạn code trên vẫn chưa DRY do vẫn còn phần validation bị trùng lặp. Giải pháp là sử dụng ActiveSupport::Concern, vì nó cung cấp một method tên là included và method này sẽ chạy khi module được include vào trong class. Bây giờ chúng ta sẽ đưa phần validation vào trong method included:
```
# lib/drivable.rb
module Drivable
    extend ActiveSupport::Concern
    included do
        validates :direction, presence: true
        validates :speed, presence: true
    end
    
    def turn new_direction
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        self.speed = speed + 10
    end
end

class Car < ActiveRecord::Base
    include Drivable
end

class Bicycle < ActiveRecord::Base
    include Drivable
end
```
Đoạn code đã được clear. Nhưng có trường hợp khi bài toán thay đổi: bạn thêm tốc độ tối đa, một ô tô không thể tăng tốc quá 100km/h và một xe đạp không thể chạy nhanh hơn 20km/h. Ô tô và xe đạp cũng tăng tốc với tốc độ khác nhau, ô tô là 10km/h còn xe đạp là 1 km/h. Ban đầu đoạn code chưa DRY:
```
class Car < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    
    def turn new_direction
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        # Cars accelerate quickly, and can go 100mph (in Los Angeles).
        self.speed = [speed + 10, 100].min
    end
end

class Bicycle < ActiveRecord::Base
    validates :direction, presence: true
    validates :speed, presence: true
    
    def turn(new_direction)
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        # Bikes accelerate slower, and can only go 20mph
        self.speed = [speed + 1, 20].min
    end
end
```
Sự khác biệt giữa 2 lớp bây giờ là tốc độ tăng tốc và tốc độ tối đa. Để thực hiện các method này theo 1 khuôn mẫu thì chúng ta vẫn tách nó ra thành 1 module và thay các giá trị đó bằng các methods trợ giúp:
```
# lib/drivable.rb
module Drivable
    extend ActiveSupport::Concern
    
    included
        validates :direction, presence: true
        validates :speed, presence: true
    end
    
    def turn new_direction
        self.direction = new_direction
    end
    
    def brake
        self.speed = 0
    end
    
    def accelerate
        self.speed = [speed + acceleration, top_speed].min
    end
end

class Car < ActiveRecord::Base
    include Drivable
    
    def top_speed
        100
    end

    def acceleration
        10
    end
end

class Bicycle < ActiveRecord::Base
    include Drivable

    def top_speed
        20
    end

    def acceleration
        1
    end
end
```
Phần này mình xin kết thúc ở đây. Thanks for watching!

Tài liệu tham khảo: cuốn Rails AntiPatterns: Best Practice Ruby on Rails Refactoring by Chad Pytel