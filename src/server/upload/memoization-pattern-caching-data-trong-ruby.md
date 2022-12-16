# Giới thiệu
Memoization là một kỹ thuật bạn sử dụng để tăng tốc độ cho các phương thức truy cập của mình. Bằng cách lưu trữ lại kết quả của các method thực hiện tốn thời gian, các method thực hiện chỉ một lần. Từ đó tránh việc lặp lại quá trình tính toán hoặc thực hiện của method => thế là nó nhanh hơn rồi.

# 1. Dùng biến instance
## 1.1 Đặt vấn đề
Một học sinh có nhiều môn học, một môn học thì có một cột điểm của môn học đó. Và chúng ta có 1 phương thức `total_score` dùng để tính tổng số điểm học sinh đạt được. 

=> Ta có model sau:
``` Ruby
class Student < ActiveRecord::Base
  has_many :subjects
  
  def total_score 
    self.subjects.inject(0) {|sum, subject| sum += subject.score}
  end
end
```
Phương thức `total_score` sẽ được gọi lại nhiều lần. Mỗi lần gọi thì nó thực hiện 1 câu truy vấn lấy ra tất cả các subject của student sau đó tính tổng điểm mà student đó đạt được. Và việc gọi nhiều lần thì các công việc trên được lặp đi lặp lại.

Vậy để giải quyết vấn đề này thì mình sẽ làm gì?
## 1.2 Cách giải quyết
Bạn sẽ thấy cách này cực kỳ quen thuộc, có thể thấy nhiều trong khi làm việc với Ruby:
``` Ruby
class Student < ActiveRecord::Base
  has_many :subjects
  
  def total_score 
    @total_score ||= self.subjects.inject(0) {|sum, subject| sum += subject.score}
  end
end
```

Sau khi ta chỉnh code 1 chút ntnay. Thì

* Khi chúng ta gọi `total_score` lần đầu: Thì nó thực hiện 1 câu truy vấn lấy ra tất cả các subject của student sau đó tính tổng điểm mà student đó đạt được và gán nó cho biến instance `@total_score`. 
* Khi chúng ta gọi `total_score` lần thứ 2: Thì nó ko cần thực hiện câu truy vấn và tính toán nào nữa mà nó trả về luôn biến `@total_score`. 

## 1.3 Trường hợp mutil-line
Có nhiều trường hợp, việc sử dụng ||= ko chỉ thực hiện đơn giản bằng 1 dòng code. mà cần thực hiện xử lý những logic phức tạp nên số dòng code sẽ nhiều hơn. Thì xử lý ntnao?
Đơn giản là đưa vào một block. 
Có nhiều cách để làm điều này. sau đây là 1 trong số đó:
``` Ruby
class User < ActiveRecord::Base
  def main_address
    @main_address ||= begin
      maybe_main_address = home_address if prefers_home_address?
      maybe_main_address = work_address unless maybe_main_address
      maybe_main_address = addresses.first unless maybe_main_address
    end
  end
end
```

## 1.4 Trường hợp `nil` và `false`
Dùng `||=` chưa hẵn lúc nào cũng đã đúng. Ví dụ như khi `nil` hoặc `false` thì biểu thức đằng sau vẫn được thực hiện lại cho tới khi có kết quả trả về khác nil hoặc khắc false. Dẫn đến code của chúng ta vẫn được lặp đi lặp lại. 

Vậy để giải quyết vấn đề này. chúng ta cần phân biệt trươngf hợp nào đã đc thực hiện rồi và trường hợp nào chưa bằng cách check xem biến instance của mình đã được defined hay chưa. bằng cách sử dụng hàm "defined?"
### 1.4.1 VD trường hợp trả về false
``` Ruby
def has_comment?
  return @has_comment if defined?(@has_comment)
  @has_comment = self.comments.size > 0
end
```

### 1.4.2 VD trường hợp trả về nil
```Ruby
def comments
  return @comments if defined?(@comments)
  @comments = self.comments
end
```

# 2.  Dùng method `memoize`
Vấn đề với `memoization` này là chúng ta làm phức tạp phương thức thực hiện với caching logic. Memorization phải áp dụng tốt nhất một cách minh bạch. 

Từ Rails 2.2 có một cách để thực hiện memoization minh bạch, rõ ràng là sử dụng method `memoize` kế thừa từ `ActiveSupport::Memoizable`.
``` Ruby
class User < ActiveRecord::Base
  extend ActiveSupport::Memoizable

 class Student < ActiveRecord::Base
  has_many :subjects
  
  def total_score 
    self.subjects.inject(0) {|sum, subject| sum += subject.score}
  end
  memoize :total_score
end
```
* Phương thức `memoize` sẽ giúp chúng ta tự động cache kết quả của phương thức. Vậy chúng ta không cần thay đổi việc thực hiện của phương thức nữa mà khi cần ta chỉ việc khai báo những memoization cho phương thức đó.

* Các vấn đề lớn khác với caching với biến instance là nó không tiện lợi cho việc cache đối với kết quả khác nhau phụ thuộc vào đầu vào khác nhau. Giờ chúng ta định nghĩa một phương thức mới total_spent.

``` Ruby
class User < ActiveRecord::Base
  extend ActiveSupport::Memoizable

 class Student < ActiveRecord::Base
  has_many :subjects
  
  def total_score 
    self.subjects.inject(0) {|sum, subject| sum += subject.score}
  end

  def semester_total_score semester
    self.subjects.where(semester).inject(0) {|sum, subject| sum += subject.score}
  end
  memoize :total_score
end
```
Việc cache kết quả `semester_total_score` rất bật tiện bằng cách sử dụng biến instance vì kết quả của `semester_total_score` sẽ khác nhau phụ thuộc vào biến đầu vào `semester`. Nhưng memoize có thể làm việc rất hoàn hảo là memoization cho các phương thức mà không cần các đối số, nó sẽ cache các kết quả khác nhau phục thuộc các đầu vào.


### Note:
Bạn có thể sử dụng Gem để được hổ trợ tới tận răng. đó là gem [Memoist](https://github.com/matthewrudy/memoist)
# Tài liệu tham khảo
https://rails-bestpractices.com/posts/2010/11/22/use-memoization/
https://www.justinweiss.com/articles/4-simple-memoization-patterns-in-ruby-and-one-gem/